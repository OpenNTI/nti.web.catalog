import React from 'react';
import PropTypes from 'prop-types';

import { Router } from '@nti/web-routing';

import CatalogEntry from '../../catalog-entry/Modal';
import AllCategories from '../components/AllCategories';
import Category from '../components/Category';
import SearchWrapper from '../components/SearchWrapper';
import { RouteContexts } from '../../../Constants';

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
		const router = Router.useRouter();
		const onClose = () =>
			category
				? router.routeTo.object(
						{ tag: category },
						RouteContexts.CategoryPill
				  )
				: router.routeTo.path(router.baseroute);
		return <CatalogEntry entryId={entryId} onClose={onClose} />;
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
