import { Router, Route } from '@nti/web-routing';

import { RouteContexts } from '../../Constants';

import View from './View';

export default Router.for([
	Route({
		path: ['/', '/nti-course-catalog-entry/:entryId'],
		component: View,
		getRouteFor: obj => {
			if ((obj?.isCourseCatalogEntry || obj?.isCourse) && obj.getID?.()) {
				return `./nti-course-catalog-entry/${obj.getID()}`;
			}
		},
		exact: true,
	}),
	Route({
		path: '/:category/',
		component: View,
		getRouteFor: (obj, context) => {
			const category = obj.Name ?? obj.tag;
			if (
				(category && context === RouteContexts.CategoryPreview) ||
				context === RouteContexts.CategoryPill
			) {
				if (category === '.') {
					return '/%2E/';
				}

				return `/${encodeURIComponent(category)}/`;
			}
		},
	}),
]);
