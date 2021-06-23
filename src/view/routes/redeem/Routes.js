import { Router, Route } from '@nti/web-routing';

import View from './View';

export default Router.for([
	Route({
		path: ['/:code/item/:entryId', '/item/:entryId', '/:code?'],
		component: View,
		getRouteFor: (obj, context) => {
			if ((obj?.isCourseCatalogEntry || obj?.isCourse) && obj.getID) {
				const search = obj.redeemed ? '?redeem=1' : '';
				return `/item/${obj.getID()}${search}`;
			}
		},
	}),
]);
