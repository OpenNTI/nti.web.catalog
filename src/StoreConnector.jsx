import React from 'react';
import PropTypes from 'prop-types';
import Connector from 'nti-lib-store-connector';

const propMap = {
	tags: 'tags',
	popular: 'popular',
	items: 'items'
};

StoreConnector.propTypes = {
	children: PropTypes.element,
	store: PropTypes.object
};
export default function StoreConnector ({store, children}) {
	return (
		<Connector _store={store} _propMap={propMap} store={store}>
			{children}
		</Connector>
	);
}
