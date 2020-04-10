import React from 'react';
import PropTypes from 'prop-types';

import PurchasedItems from '../components/PurchasedItems';
import SearchWrapper from '../components/SearchWrapper';

PurchasedDesktop.propTypes = {
	entityId: PropTypes.string
};
export default function PurchasedDesktop ({entityId}) {
	return (
		<SearchWrapper>
			<PurchasedItems />
		</SearchWrapper>
	);
}