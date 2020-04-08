import React from 'react';
import {getService} from '@nti/web-client';
import {Hooks, Loading} from '@nti/web-commons';
import {URL as UrlUtils} from '@nti/lib-commons';

import {NTIOtherCategory, BatchSize} from '../../../Constants';
import Categories from '../../../components/categories';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const {useResolver} = Hooks;
const {isPending, isResolved, isErrored} = useResolver;

const TagPillOnlyHosts = /epiccharterschools/;
const getBucketSize = () => {
	const origin = global.location?.origin;

	return origin?.match(TagPillOnlyHosts) ? 10000 : 4;
};

const parseRaw = async (raw, service) => {
	if (raw.MimeType) {
		return service.getObject(raw);
	}

	if (raw.Items) {
		raw.Items = await Promise.all(raw.Items.map(item => parseRaw(item, service)));
	}

	return raw;
};

export default function AllCategories () {
	const resolver = useResolver(async () => {
		const service = await getService();
		const catalog = service.getCollection('Courses', 'Catalog');
		const byTag = catalog.getLink('ByTag');

		const bucketsRaw = await service.get(UrlUtils.appendQueryParams(byTag, {bucketSize: getBucketSize()}));
		const buckets = await parseRaw(bucketsRaw, service);

		if (buckets.Items.length === 1 && buckets.Items[0].Name === NTIOtherCategory) {
			const otherBucket = await service.getBatch(UrlUtils.join(byTag, NTIOtherCategory), {batchSize: BatchSize, batchStart: 0});
			return {Items: [otherBucket], onlyOther: true};
		}

		return buckets;
	}, []);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const categories = !error && isResolved(resolver) ? resolver : null;

	const items = categories?.Items;
	const onlyOther = categories?.onlyOther;

	return (
		<Loading.Placeholder loading={loading} fallback={<Loading.Spinner.Large />}>
			{error && (<PageError error={error} />)}
			{items && !onlyOther && (<Categories categories={items} />)}
			{items && onlyOther && (<Category category={items[0]} noHeader />)}
		</Loading.Placeholder>
	);
}