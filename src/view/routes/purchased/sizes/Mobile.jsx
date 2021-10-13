import PropTypes from 'prop-types';

import PurchasedItems from '../components/PurchasedItems';
import SearchWrapper from '../components/SearchWrapper';

PurchasedMobile.propTypes = {
	entityId: PropTypes.string,
};
export default function PurchasedMobile({ entityId }) {
	return (
		<SearchWrapper>
			<PurchasedItems />
		</SearchWrapper>
	);
}
