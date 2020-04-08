import {Router, Route} from '@nti/web-routing';

import View from './View';

export default Router.for([
	Route({path: '/nti-course-catalog-entry/:entryId?', component: View}),
	Route({path: '/:categoryId/nti-course-catalog-entry/:entryId?', component: View}),
	Route({path: '/:categoryId/', component: View}),
	Route({path: '/', component: View})
]);