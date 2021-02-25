import { Router, Route } from '@nti/web-routing';

import View from './View';

export default Router.for([
	Route({ path: '/nti-course-catalog-entry/:entryId', component: View }),
	Route({
		path: '/:code/nti-course-catalog-entry/:entryId',
		component: View,
	}),
	Route({ path: '/:code?', component: View }),
]);
