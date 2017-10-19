import AppDispatcher from 'nti-lib-dispatcher';

import * as Constants from './Constants';

export function testAction () {
	const data = [
		{title: 'course 1 test'},
		{title: 'test course 2'}
	];

	AppDispatcher.handleViewAction ({
		type: Constants.TEST,
		data: data
	});
}
