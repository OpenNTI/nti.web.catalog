import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {Hooks, Loading} from '@nti/web-commons';
import {URL as UrlUtils} from '@nti/lib-commons';

import {BatchSize} from '../../../Constants';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const {useResolver} = Hooks;
const {isPending, isResolved, isErrored} = useResolver;

CategoryPage.propTypes = {
	category: PropTypes.string.isRequired
};
export default function CategoryPage ({category: categoryName}) {
	const resolver = useResolver(async () => {
		const service = await getService();
		const catalog = service.getCollection('Courses', 'Catalog');

		const byTag = catalog.getLink('ByTag');
		const categoryLink = UrlUtils.join(byTag, categoryName);

		const category = await service.getBatch(categoryLink, {batchSize: BatchSize, batchStart: 0});

		return category;
	}, [categoryName]);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const category = !error && isResolved(resolver) ? resolver : null;

	return (
		<Loading.Placeholder loading={loading} fallback={<Loading.Spinner.Large />}>
			{error && (<PageError error={error} />)}
			{category && (<Category category={category} />)}
		</Loading.Placeholder>
	);
}