import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';

CatalogRedeemDesktop.propTypes = {
	code: PropTypes.string,
	entryId: PropTypes.string
};
export default function CatalogRedeemDesktop ({code, entryId}) {
	return (
		<Form code={code} />
	);
}