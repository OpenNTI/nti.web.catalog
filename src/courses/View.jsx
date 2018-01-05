import {Router, Route} from 'nti-web-routing';// eslint-disable-line

import Categories from './categories/components';
import Category from './category-detail/components';

export default Router.for([
	Route({
		path: '/:id',
		component: Category,
		getRouteFor: (obj, context) => {
			if (obj.Name && context === 'catalog.categories') {
				if (obj.Name === '.') {
					return '/%2E';
				}

				return `/${encodeURIComponent(obj.Name)}`;
			}

			else if (obj.action === 'back' && context === 'catalog') {
				return '/';
			}

			return null;
		}
	}),
	Route({path: '/', component: Categories, name: 'catalog.courses'}),
]);
