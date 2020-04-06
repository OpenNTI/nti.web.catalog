import {Router, Route} from '@nti/web-routing';

import {Routes} from './Constants';
import Frame from './Frame';
import Available from './available';
import Purchased from './purchased';
import Redeem from './redeem';

export default Router.for([
	Route({path: '/redeem/:code?', component: Redeem, name: Routes.Redeem}),
	Route({path: '/purchased', component: Purchased, name: Routes.Purchased}),
	Route({path: '/', component: Available, name: Routes.Available})
], {frame: Frame});