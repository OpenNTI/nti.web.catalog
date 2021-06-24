import React from 'react';
import PropTypes from 'prop-types';

import CatalogEntryModal from '../../catalog-entry/Modal';
import AllCategories from '../components/AllCategories';
import Category from '../components/Category';
import SearchWrapper from '../components/SearchWrapper';

CatalogAvailableMobile.propTypes = {
	category: PropTypes.string,
	entryId: PropTypes.string,
	suppressDetails: PropTypes.bool,
};
export default function CatalogAvailableMobile({
	category,
	entryId,
	suppressDetails,
	...otherProps
}) {
	if (entryId && !suppressDetails) {
		return <CatalogEntryModal entryId={entryId} category={category} />;
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
