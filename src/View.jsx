import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Courses from './courses/index';
import Purchased from './purchased/components/index';
import Redeem from './redeem/components/index';

export default Router.for([
	Route({path: '/redeem', component: Redeem}),
	Route({path: '/purchased', component: Purchased}),
	Route({path: '/', component: Courses})
]);
