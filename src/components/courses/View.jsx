import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Categories from './categories';
import Category from './category-detail';

export default Router.for([
	Route({
		path: '/:id',
		component: Category,
		getRouteFor: (obj, context) => {
			if (obj.Name) {
				return `/${(obj.Name)}`;
			}

			return null;
		}
	}),
	Route({path: '/', component: Categories, name: 'catalog.courses'}),
]);
