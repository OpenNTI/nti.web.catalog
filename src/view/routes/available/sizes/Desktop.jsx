import React from 'react';
import PropTypes from 'prop-types';

import AllCategories from '../components/AllCategories';
import Category from '../components/Category';

CatalogAvailableDesktop.propTypes = {
	categoryId: PropTypes.string,
	entryId: PropTypes.string
};
export default function CatalogAvailableDesktop ({categoryId, entryId, ...otherProps}) {
	return (
		<>
			{
				categoryId ?
					(<Category categoryId={categoryId} {...otherProps} />) :
					(<AllCategories {...otherProps} />)
			}
		</>
	);
}