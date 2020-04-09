import React from 'react';
import PropTypes from 'prop-types';

import AllCategories from '../components/AllCategories';
import Category from '../components/Category';

CatalogAvailableDesktop.propTypes = {
	category: PropTypes.string,
	entryId: PropTypes.string
};
export default function CatalogAvailableDesktop ({category, entryId, ...otherProps}) {
	return (
		<>
			{
				category ?
					(<Category category={category} {...otherProps} />) :
					(<AllCategories {...otherProps} />)
			}
		</>
	);
}