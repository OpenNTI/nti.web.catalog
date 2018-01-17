import {Router, Route} from 'nti-web-routing';

import Courses from './courses';
import Purchased from './purchased/components';
import Redeem from './redeem/components';
import Contact from './contact-us/View';

export default Router.for([
	Route({path: '/redeem/:code?', component: Redeem, name: 'catalog.redeem'}),
	Route({path: '/contact', component: Contact, name: 'catalog.contact'}),
	Route({path: '/purchased', component: Purchased}),
	Route({path: '/', component: Courses})
]);
