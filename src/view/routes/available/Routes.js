import {Router, Route} from '@nti/web-routing';

import {RouteContexts} from '../../Constants';

import View from './View';

export default Router.for([
	Route({
		path: ['/', '/nti-course-catalog-entry/*'],
		component: View,
		exact: true
	}),
	Route({
		path: '/:category/',
		component: View,
		getRouteFor: (obj, context) => {
			if (obj.Name && context === RouteContexts.CategoryPreview || context === RouteContexts.CategoryPill) {
				if (obj.Name === '.') {
					return '/%2E/';
				}

				return `/${encodeURIComponent(obj.Name)}/`;
			}
		}
	})
]);
