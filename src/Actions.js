import AppDispatcher from './Dispatcher';
import * as Constants from './Constants';

export function testAction () {
	const data = [
	];

	AppDispatcher.handleAction ({
		actionType: Constants.TEST,
		data: data
	});
}
