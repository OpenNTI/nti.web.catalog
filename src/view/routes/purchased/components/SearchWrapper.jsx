import React from 'react';
import PropTypes from 'prop-types';
import { getService } from '@nti/web-client';
import { searchable, contextual } from '@nti/web-search';

import Search from '../../../components/search';
import { BatchSize } from '../../../Constants';

async function loadSearchResults(filter) {
	const service = await getService();
	const catalog = service.getCollection('Purchased', 'Catalog');

	const searchItems = await service.getBatch(catalog.href, {
		batchSize: BatchSize,
		batchStart: 0,
		filter,
	});

	return searchItems;
}

CatalogPurchasedSearch.propTypes = {
	searchTerm: PropTypes.string,
	children: PropTypes.any,
};
function CatalogPurchasedSearch({ searchTerm, children }) {
	if (searchTerm) {
		return (
			<Search searchTerm={searchTerm} loadResults={loadSearchResults} />
		);
	}

	return children;
}

export default contextual('Courses')(
	searchable(null, null)(CatalogPurchasedSearch)
);
