import React from 'react';
import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { Hooks, Loading, EmptyState } from '@nti/web-commons';

import { BatchSize } from '../../../Constants';
import Category from '../../../components/category';
import PageError from '../../../components/PageError';

const t = scoped(
	'nti-catalog.view.routes.purchased.components.PurchasedItems',
	{
		empty: "You don't have any courses yet...",
	}
);

const { useResolver } = Hooks;
const { isPending, isResolved, isErrored } = useResolver;

export default function PurchasedItems() {
	const resolver = useResolver(async () => {
		const service = await getService();
		const purchasedHref = service?.getCollection('Purchased', 'Catalog')
			?.href;

		const purchased = await service.getBatch(purchasedHref, {
			batchSize: BatchSize,
			batchStart: 0,
		});

		return purchased;
	}, []);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const purchased = isResolved(resolver) ? resolver : null;
	const empty = purchased && purchased.Items.length === 0;

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			{error && <PageError error={error} />}
			{purchased && !empty && (
				<Category category={purchased} header={false} />
			)}
			{purchased && empty && <EmptyState header={t('empty')} />}
		</Loading.Placeholder>
	);
}
