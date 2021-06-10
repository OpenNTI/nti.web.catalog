import React from 'react';
import PropTypes from 'prop-types';

import { Router } from '@nti/web-routing';

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
	const router = Router.useRouter();
	const onClose = () => router.routeTo.path(router.baseroute);

	return (
		<SearchWrapper>
			{category ? (
				<Category category={category} {...otherProps} />
			) : (
				<AllCategories {...otherProps} />
			)}
			{entryId && <CatalogEntry entryId={entryId} onClose={onClose} />}
		</SearchWrapper>
	);
}
