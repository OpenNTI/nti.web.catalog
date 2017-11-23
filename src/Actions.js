import AppDispatcher from 'nti-lib-dispatcher';

import * as Constants from './Constants';


export function viewAllCourses () {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_ALL_COURSES,
	});
}

export function viewCategory (link) {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_CATEGORY,
		link: link
	});
}

export function backToCategories () {
	AppDispatcher.handleViewAction ({
		type: Constants.BACK_TO_CATEGORIES,
	});
}
