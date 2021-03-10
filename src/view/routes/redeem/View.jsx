import React from 'react';

import { Layouts } from '@nti/web-commons';

import Desktop from './sizes/Desktop';
import Mobile from './sizes/Mobile';

const { Responsive } = Layouts;

export default function CatalogRedeem(props) {
	return (
		<>
			<Responsive.Item
				query={Responsive.not(Responsive.isDesktop)}
				component={Mobile}
				{...props}
			/>
			<Responsive.Item
				query={Responsive.isDesktop}
				component={Desktop}
				{...props}
			/>
		</>
	);
}
