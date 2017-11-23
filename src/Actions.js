import AppDispatcher from 'nti-lib-dispatcher';

import * as Constants from './Constants';

const numItems = 8;

export function viewAllCourses () {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_ALL_COURSES,
	});
}

export function viewCategory (link) {
	const categoryLink = link + '?batchStart=0&batchSize=' + numItems;
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_CATEGORY,
		link: categoryLink
	});
}

export function backToCategories () {
	AppDispatcher.handleViewAction ({
		type: Constants.BACK_TO_CATEGORIES,
	});
}
