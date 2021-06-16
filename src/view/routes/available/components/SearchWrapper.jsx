import React from 'react';
import PropTypes from 'prop-types';

import { getService } from '@nti/web-client';
import { searchable, contextual } from '@nti/web-search';
import { Layouts } from '@nti/web-commons';

import Search from '../../../components/search';
import { BatchSize } from '../../../Constants';

const { Slot } = Layouts;

async function loadSearchResults(filter) {
	const service = await getService();
	const catalog = service.getCollection('Courses', 'Catalog');

	const searchItems = await service.getBatch(catalog.href, {
		batchSize: BatchSize,
		batchStart: 0,
		filter,
	});

	return searchItems;
}

CatalogAvailableSearch.propTypes = {
	searchTerm: PropTypes.string,
	children: PropTypes.any,
};
function CatalogAvailableSearch({ searchTerm, children }) {
	if (searchTerm) {
		return (
			<>
				<Search
					searchTerm={searchTerm}
					loadResults={loadSearchResults}
				/>
				<Slot slot="modal" children={children} />
			</>
		);
	}

	return children;
}

export default contextual('Catalog')(
	searchable(null, null)(CatalogAvailableSearch)
);
