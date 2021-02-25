import React from 'react';
import PropTypes from 'prop-types';

import CatalogEntry from '../../catalog-entry/Modal';
import AllCategories from '../components/AllCategories';
import Category from '../components/Category';
import SearchWrapper from '../components/SearchWrapper';

CatalogAvailableDesktop.propTypes = {
	category: PropTypes.string,
	entryId: PropTypes.string,
};
export default function CatalogAvailableDesktop({
	category,
	entryId,
	...otherProps
}) {
	return (
		<SearchWrapper>
			{category ? (
				<Category category={category} {...otherProps} />
			) : (
				<AllCategories {...otherProps} />
			)}
			{entryId && <CatalogEntry entryId={entryId} />}
		</SearchWrapper>
	);
}
