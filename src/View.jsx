import {Router, Route} from 'nti-web-routing';

import Courses from './courses';
import Purchased from './purchased/components';
import Redeem from './redeem/components';

export default Router.for([
	Route({path: '/redeem/:code?', component: Redeem}),
	Route({path: '/purchased', component: Purchased}),
	Route({path: '/', component: Courses})
]);
