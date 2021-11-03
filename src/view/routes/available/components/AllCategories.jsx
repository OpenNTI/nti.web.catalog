import { Suspense } from 'react';

import { Loading, Layouts, Text } from '@nti/web-commons';
import { ErrorBoundary, useAsyncValue, useService } from '@nti/web-core';
import { LinkTo } from '@nti/web-routing';

import { NTIOtherCategory, BatchSize } from '../../../Constants';
import Carousel from '../../../components/carousel';
import Categories from '../../../components/categories';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const { Responsive } = Layouts;

const BottomMenu = styled(Text.Base).attrs({ as: 'section' })`
	display: block;
	text-align: center;
	padding-bottom: 1rem;
`;

export default function AllCategories() {
	return (
		<ErrorBoundary fallback={<PageError />}>
			<>
				<Suspense fallback={<Loading.Spinner.Large />}>
					<Content />
				</Suspense>
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
			</>
		</ErrorBoundary>
	);
}

function Content() {
	const { featured, items, other } = useCatalog();
	return (
		<>
			<Carousel featured={featured} />
			{other ? (
				<Category category={other} header={false} />
			) : (
				<Categories categories={items} />
			)}
		</>
	);
}

function useCatalog() {
	const service = useService();
	const catalog = service.getCollection('Courses', 'Catalog');

	return useAsyncValue(`anonymous - ${catalog.href}`, async () => {
		const byTag = `ByTag/${NTIOtherCategory}`;

		const [featured, tags] = await Promise.all([
			loadFeatured(catalog),
			loadSuggestedTags(catalog),
		]);

		if (!tags?.Items?.length) {
			const other = await catalog.fetchLink({
				rel: byTag,
				mode: 'batch',
				params: { batchSize: BatchSize, batchStart: 0 },
			});

			return {
				featured,
				other: !other.total ? null : other,
			};
		}

		const others = await catalog.fetchLink({
			rel: byTag,
			mode: 'batch',
			params: { batchSize: 4, batchStart: 0 },
		});

		const otherTag = {
			tag: NTIOtherCategory,
			count: others.total,
			Items: others.Items,
		};

		return {
			featured,
			items: others.Total > 0 ? [...tags.Items, otherTag] : tags.Items,
		};
	});
}

async function loadFeatured(catalog) {
	try {
		return (await catalog.fetchLink({ rel: 'Featured', mode: 'batch' }))
			.Items;
	} catch {
		return [];
	}
}

async function loadSuggestedTags(catalog) {
	try {
		return await catalog.fetchLink({ mode: 'raw', rel: 'SuggestedTags' });
	} catch {
		return { Items: [] };
	}
}
