import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';

CatalogRedeemMobile.propTypes = {
	code: PropTypes.string,
	entryId: PropTypes.string
};
export default function CatalogRedeemMobile ({code, entryId}) {
	return (
		<Form code={code} />
	);
}