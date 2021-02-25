import React from 'react';
import { getService } from '@nti/web-client';
import { Hooks, Loading } from '@nti/web-commons';
import { URL as UrlUtils } from '@nti/lib-commons';

import { NTIOtherCategory, BatchSize } from '../../../Constants';
import Carousel from '../../../components/carousel';
import Categories from '../../../components/categories';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const { useResolver } = Hooks;
const { isPending, isResolved, isErrored } = useResolver;

async function loadFeatured(catalog, service) {
	try {
		const featured = await service.getBatch(catalog.getLink('Featured'));

		return featured.Items;
	} catch (e) {
		return [];
	}
}

export default function AllCategories() {
	const resolver = useResolver(async () => {
		const service = await getService();
		const catalog = service.getCollection('Courses', 'Catalog');
		const byTag = catalog.getLink('ByTag');

		const [featured, tags] = await Promise.all([
			loadFeatured(catalog, service),
			catalog.fetchLink('SuggestedTags'),
		]);

		if (tags.Items.length === 1 && tags.Items[0].tag === NTIOtherCategory) {
			const otherBucket = await service.getBatch(
				UrlUtils.join(byTag, NTIOtherCategory),
				{ batchSize: BatchSize, batchStart: 0 }
			);

			return { featured, other: otherBucket, onlyOther: true };
		}

		return { featured, Items: tags.Items, onlyOther: false };
	}, []);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const categories = !error && isResolved(resolver) ? resolver : null;

	const items = categories?.Items;
	const featured = categories?.featured;
	const other = categories?.other;

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			{error && <PageError error={error} />}
			{featured && <Carousel featured={featured} />}
			{other && <Category category={other} header={false} />}
			{items && !other && <Categories categories={items} />}
		</Loading.Placeholder>
	);
}
