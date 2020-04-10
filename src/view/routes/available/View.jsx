import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {Layouts} from '@nti/web-commons';
import {searchable, contextual} from '@nti/web-search';

import Search from '../../components/search';
import {BatchSize} from '../../Constants';

import Desktop from './sizes/Desktop';
import Mobile from './sizes/Mobile';

const {Responsive} = Layouts;

async function loadSearchResults (filter) {
	const service = await getService();
	const catalog = service.getCollection('Courses', 'Catalog');

	const searchItems = await service.getBatch(catalog.href, {batchSize: BatchSize, batchStart: 0, filter});

	return searchItems;
}

CatalogAvailable.propTypes = {
	searchTerm: PropTypes.string
};
function CatalogAvailable ({searchTerm, ...otherProps}) {
	if (searchTerm) {
		return (<Search searchTerm={searchTerm} loadResults={loadSearchResults} />);
	}

	return (
		<>
			<Responsive.Item query={Responsive.not(Responsive.isDesktop)} component={Mobile} {...otherProps} />
			<Responsive.Item query={Responsive.isDesktop} component={Desktop} {...otherProps} />
		</>
	);
}

export default contextual('Catalog')(searchable(null, null)(CatalogAvailable));