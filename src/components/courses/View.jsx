import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Categories from './categories';
import Category from './category-detail';

export default Router.for([
	Route({
		path: '/:id',
		component: Category,
		getRouteFor: (obj, context) => {
			if (obj.Name) {
				if (obj.Name === '.') {
					return '/%2E';
				}

				return `/${(encodeURIComponent(obj.Name).replace('(', '%28').replace(')','%29'))}`;
			}

			else if (obj.action === 'back' && context === 'catalog') {
				return '/';
			}

			return null;
		}
	}),
	Route({path: '/', component: Categories, name: 'catalog.courses'}),
]);
