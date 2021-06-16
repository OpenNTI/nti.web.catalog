import { Router, Route } from '@nti/web-routing';

import { RouteContexts } from '../../Constants';

import View from './View';

const getCategoryPart = category =>
	category === '.' ? '%2E' : encodeURIComponent(category);

export default Router.for([
	Route({
		path: [
			'/tag/:category/item/:entryId',
			'/tag/:category',
			'/item/:entryId',
			'/',
		],
		component: View,
		getRouteFor: (obj, context) => {
			if ((obj?.isCourseCatalogEntry || obj?.isCourse) && obj.getID) {
				const search = obj.redeem ? '?redeem=1' : '';
				const itemRoute = `/item/${obj.getID()}${search}`;

				return context
					? `/tag/${getCategoryPart(context)}${itemRoute}`
					: itemRoute;
			}

			const category = obj?.Name ?? obj?.tag;

			if (
				(category && context === RouteContexts.CategoryPreview) ||
				context === RouteContexts.CategoryPill
			) {
				return `/tag/${getCategoryPart(category)}/`;
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
		getRedirect: ({ category, entryId, ...otherProps }) => {
			if (category === 'item' || category === 'tag') {
				return null;
			}

			const tagPart = category ? `/tag/${category}` : '';
			const entryPart = entryId ? `/item/${entryId}` : '';

			return `${tagPart}${entryPart}`;
		},
	}),
]);
