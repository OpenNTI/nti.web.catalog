import React from 'react';

import Catalog from '../../index.js';

import { Header } from './Header';

export function AnonymousPage(props) {
	return (
		<div>
			<Header />
			<Catalog {...props} />
		</div>
	);
}
