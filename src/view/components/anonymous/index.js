import { Router, Route } from '@nti/web-routing';

import { AnonymousPage as Page } from './Page';

export const AnonymousPage = Router.for([
	Route({
		path: '/',
		component: Page,
	}),
]);
