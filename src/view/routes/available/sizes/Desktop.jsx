import PropTypes from 'prop-types';

import { Router } from '@nti/web-routing';

import CatalogEntryModal from '../../catalog-entry/Modal';
import AllCategories from '../components/AllCategories';
import Category from '../components/Category';
import SearchWrapper from '../components/SearchWrapper';

CatalogAvailableDesktop.propTypes = {
	category: PropTypes.string,
	entryId: PropTypes.string,
	suppressDetails: PropTypes.bool,
};
export default function CatalogAvailableDesktop({
	category,
	entryId,
	suppressDetails,
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
			{entryId && !suppressDetails && (
				<CatalogEntryModal
					slot="modal"
					category={category}
					entryId={entryId}
					onClose={onClose}
				/>
			)}
		</SearchWrapper>
	);
}
