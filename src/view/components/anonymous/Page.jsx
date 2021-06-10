import React from 'react';

import Catalog from '../../index.js';

import { Header } from './Header';

/**
 * Renders the Catalog view for unauthenticated users
 *
 * @param {Object} props
 * @param {Object} props.paths - A mapping of { name: path } to be rendered as navigation, e.g. { signup: '/signup' }
 * @returns {JSX.Element}
 */
export function AnonymousPage({ paths, ...props }) {
	return (
		<div>
			<Header paths={paths} />
			<Catalog {...props} />
		</div>
	);
}
