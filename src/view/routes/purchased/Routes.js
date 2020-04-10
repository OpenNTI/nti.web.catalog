import {Router, Route} from '@nti/web-routing';

import View from './View';

export default Router.for([
	Route({path: '/:entryId', component: View}),
	Route({path: '/', component: View})
]);