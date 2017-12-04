import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Categories from './categories';
import Category from './category-detail';

export default Router.for([
	Route({
		path: '/:id',
		component: Category,
		getRouteFor: (obj, context) => {
			if (obj.Name) {
				const url = decodeURIComponent(obj.Name);
				return `/${(url)}`;
			}

			else if(obj.action === 'back' && context === 'catalog') {
				return '/';
			}

			return null;
		}
	}),
	Route({path: '/', component: Categories, name: 'catalog.courses'}),
]);