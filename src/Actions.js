import AppDispatcher from 'nti-lib-dispatcher';

import * as Constants from './Constants';

export function viewAllCourses () {
	AppDispatcher.handleViewAction ({
		type: Constants.VIEW_ALL_COURSES,
	});
}
