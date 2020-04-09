import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {getService} from '@nti/web-client';
import {Loading, Errors, Text} from '@nti/web-commons';

import {BatchSize} from '../../Constants';
import Content from '../Content';
import ItemList from '../item-list';

import Styles from './View.css';
import Header from './Header';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.category.View', {
	viewMore: 'View More'
});

const hasNextBatch = batch => batch && batch.hasLink('batch-next') && batch.Items?.length >= BatchSize;

Category.propTypes = {
	category: PropTypes.object,
	noHeader: PropTypes.bool
};
export default function Category ({category}) {
	const [batches, setBatches] = React.useState([category]);
	const [loadingMore, setLoadingMore] = React.useState(false);
	const [loadMoreError, setLoadMoreError] = React.useState(null);

	const lastBatch = batches[batches.length - 1];
	const loadMore = hasNextBatch(lastBatch) && (async () => {
		try {
			setLoadingMore(true);

			const service = await getService();
			const nextBatch = await service.getBatch(lastBatch.getLink('batch-next'));

			setBatches([...batches, nextBatch]);
		} catch (e) {
			setLoadMoreError(e);
		} finally {
			setLoadingMore(false);
		}
	});

	const items = batches.reduce((acc, batch) => {
		return [...acc, ...batch.Items];
	}, []);

	return (
		<>
			<Header category={category} />
			<Content className={cx('category-view')}>
				<ItemList items={items} />
				{loadMore && (
					<div className={cx('category-more')}>
						{loadingMore && (<Loading.Spinner />)}
						{!loadingMore && loadMoreError && (<Errors.Message error={loadMoreError} />)}
						{!loadingMore && !loadMoreError && (
							<Text.Base as="a" className={cx('view-more')} onClick={loadMore}>
								{t('viewMore')}
							</Text.Base>
						)}
					</div>
				)}
			</Content>
		</>
	);
}