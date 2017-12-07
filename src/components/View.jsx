import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Courses from './courses';
import Purchased from './purchased';
import Redeem from './redeem';

export default Router.for([
	Route({path: '/redeem/:code?', component: Redeem}),
	Route({path: '/purchased', component: Purchased}),
	Route({path: '/', component: Courses})
]);
