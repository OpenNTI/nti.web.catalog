import { Router, Route } from '@nti/web-routing';

import { RouteContexts } from '../../Constants';

import View from './View';

export default Router.for([
	Route({
		path: '/',
		exact: true,
		component: View,
	}),

	Route({
		path: ['/item/:entryId', '/tag/:category/item/:entryId'],
		exact: true,
		component: View,
		getRouteFor: obj => {
			if ((obj?.isCourseCatalogEntry || obj?.isCourse) && obj.getID?.()) {
				return `./item/${obj.getID()}`;
			}
		},
		isDisabled: (baseRoute, props) => props?.suppressDetails,
	}),

	Route({
		path: '/tag/:category',
		component: View,
		getRouteFor: (obj, context) => {
			const category = obj?.Name ?? obj?.tag;

			if (
				(category && context === RouteContexts.CategoryPreview) ||
				context === RouteContexts.CategoryPill
			) {
				if (category === '.') {
					return '/tag/%2E/';
				}

				return `/tag/${encodeURIComponent(category)}/`;
			}
		},
	}),

	//Redirect older routes to the newer ones. These routes have to be maintained, since clients may be relying on them
	Route({
		path: [
			'/nti-course-catalog-entry/:entryId',
			'/:category/nti-course-catalog-entry/:entryId',
			'/:category',
		],
		getRedirect: ({ category, entryId }) => {
			const tagPart = category ? `/tag/${category}` : '';
			const entryPart = entryId ? `/item/${entryId}` : '';

			return `${tagPart}${entryPart}`;
		},
	}),
]);
