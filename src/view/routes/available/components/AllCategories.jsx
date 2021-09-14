import React from 'react';

import { getService } from '@nti/web-client';
import { Hooks, Loading, Layouts, Text } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import { url } from '@nti/lib-commons';

import { NTIOtherCategory, BatchSize } from '../../../Constants';
import Carousel from '../../../components/carousel';
import Categories from '../../../components/categories';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const { Responsive } = Layouts;
const { useResolver } = Hooks;
const { isPending, isResolved, isErrored } = useResolver;

const BottomMenu = styled(Text.Base).attrs({ as: 'section' })`
	display: block;
	text-align: center;
	padding-bottom: 1rem;
`;

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

		const suggestedTags = catalog.hasLink('SuggestedTags')
			? catalog.fetchLink('SuggestedTags')
			: { Items: [] };

		const [featured, tags] = await Promise.all([
			loadFeatured(catalog, service),
			suggestedTags,
		]);

		if (tags.Items.length === 0) {
			const otherBucket = await service.getBatch(
				url.join(byTag, NTIOtherCategory),
				{ batchSize: BatchSize, batchStart: 0 }
			);

			return { featured, other: otherBucket, onlyOther: true };
		} else {
			const others = await service.getBatch(
				url.join(byTag, NTIOtherCategory),
				{ batchSize: 4, batchStart: 0 }
			);
			const otherTag = {
				tag: NTIOtherCategory,
				count: others.Total,
				Items: others.Items,
			};

			return {
				featured,
				Items:
					others.Total > 0 ? [...tags.Items, otherTag] : tags.Items,
				onlyOther: false,
			};
		}
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
			{Responsive.isMobileContext() && (
				<BottomMenu>
					<div>
						<LinkTo.Name name="catalog.redeem">
							Redeem a Course
						</LinkTo.Name>
					</div>
					<LinkTo.Name name="contact-us">Contact us</LinkTo.Name>
				</BottomMenu>
			)}
		</Loading.Placeholder>
	);
}
