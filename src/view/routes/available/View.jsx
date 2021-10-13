
import { Layouts } from '@nti/web-commons';

import Desktop from './sizes/Desktop';
import Mobile from './sizes/Mobile';

const { Responsive } = Layouts;

export default function CatalogAvailable(props) {
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
