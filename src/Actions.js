import AppDispatcher from 'nti-lib-dispatcher';

import * as Constants from './Constants';

const testLink = '/dataserver2/users/admin@nextthought.com/Catalog/Courses/@@ByTag';

export function viewAllCourses () {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_ALL_COURSES,
	});
}

export function viewCategory (categoryName) {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_CATEGORY,
		link: testLink + '/' + categoryName
	});
}

export function backToCategories () {
	AppDispatcher.handleViewAction ({
		type: Constants.BACK_TO_CATEGORIES,
	});
}
