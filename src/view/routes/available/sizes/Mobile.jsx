import React from 'react';
import PropTypes from 'prop-types';

// import AllCategories from '../components/AllCategories';
// import Category from '../components/Category';

CatalogAvailableMobile.propTypes = {
	categoryId: PropTypes.string,
	entryId: PropTypes.string
};
export default function CatalogAvailableMobile ({categoryId, entryId, ...otherProps}) {
	return (
		<div>
			Catalog Available Mobile
		</div>
	);
}