import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { URL as UrlUtils } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { LinkTo } from '@nti/web-routing';
import { Text, Monitor, Hooks, Loading, Errors } from '@nti/web-commons';

import { RouteContexts } from '../../Constants';
import ItemList from '../item-list';

import Styles from './Preview.css';
import { getName } from './Name';

const {OnScreen} = Monitor;
const {useResolver, useMobileValue} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.category.Preview', {
	viewAll: 'View All',
});

CategoryPreview.propTypes = {
	className: PropTypes.string,
	category: PropTypes.shape({
		tag: PropTypes.string,
		Items: PropTypes.array
	}).isRequired,
};
export default function CategoryPreview({ className, category }) {
	const pageSize = useMobileValue(3, 4);

	const [onScreen, setOnScreen] = React.useState(false);
	const onScreenChange = React.useCallback((changed) => setOnScreen(changed || onScreen), [onScreen]);

	const resolver = useResolver(async () => {
		if (!onScreen) { return null; }

		if (category.Items) { return category.Items.slice(0, pageSize); }

		const service = await getService();
		const catalog = service.getCollection('Courses', 'Catalog');

		const resp = await service.getBatch(
			UrlUtils.join(catalog.getLink('ByTag'), category.tag),
			{batchSize: pageSize, batchStart: 0}
		);

		return resp.Items;
	}, [onScreen, category]);

	const error = isErrored(resolver) ? resolver : null;
	const items = isResolved(resolver) ? resolver : null;
	const loading = items === null || isPending(resolver);


	return (
		<OnScreen className={cx('category-preview', className)} onChange={onScreenChange}>
			<div className={cx('header')}>
				<Text.Base as="div" className={cx('title')}>
					{getName(category)}
				</Text.Base>
				<LinkTo.Object
					className={cx('view-all')}
					object={category}
					context={RouteContexts.CategoryPreview}
				>
					<Text.Base>{t('viewAll')}</Text.Base>
					<i className="icon-chevronup-25" />
				</LinkTo.Object>
			</div>
			<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
				{error && (<Errors.Message error={error} />)}
				{items && (<ItemList className={cx('preview-item-list')} items={items} />)}
			</Loading.Placeholder>
		</OnScreen>
	);
}
