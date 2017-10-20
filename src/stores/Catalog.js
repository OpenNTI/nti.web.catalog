import EventEmitter from 'events';
// import AppDispatcher from 'nti-lib-dispatcher';
// import * as Constants from '../Constants';

const CHANGE = 'change';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super ();

		const {href} = service.getCollection ('Courses', 'Catalog');

		this.service = service;
		this.href = href;

		// listeners dispatch
		// AppDispatcher.register ((payload) => {
		// 	const action = payload.action;
		// 	switch (action.type) {
		// 	case Constants.TEST:
		// 		console.log ('dispatch received action here a a nha');
		// 		this.popular = action.data;
		// 		this.emit (CHANGE, {type: 'popular'});
		// 		break;
		// 	}
		// });
	}


	async load () {
		const {Items: courses, Links: links} = await this.service.get (this.href);
		const {Items: popular} = await this.service.get (links[0].href);

		this.courses = courses;
		this.popular = popular;

		this.emit (CHANGE, {type: 'courses'}, {type: 'popular'});
	}


	get (key) {
		return this[key];
	}


	addChangeListener (fn) {
		this.addListener (CHANGE, fn);
	}

	removeChangeListener (fn) {
		this.removeListener (CHANGE, fn);
	}
}
