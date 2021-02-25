import React from 'react';
import PropTypes from 'prop-types';

import CatalogEntry from '../../catalog-entry/Page';
import AllCategories from '../components/AllCategories';
import Category from '../components/Category';
import SearchWrapper from '../components/SearchWrapper';

CatalogAvailableMobile.propTypes = {
	category: PropTypes.string,
	entryId: PropTypes.string,
};
export default function CatalogAvailableMobile({
	category,
	entryId,
	...otherProps
}) {
	if (entryId) {
		return <CatalogEntry entryId={entryId} />;
	}

	return (
		<SearchWrapper>
			{category ? (
				<Category category={category} {...otherProps} />
			) : (
				<AllCategories {...otherProps} />
			)}
		</SearchWrapper>
	);
}
