import EventEmitter from 'events';

import AppDispatcher from '../Dispatcher';
import * as Constants from '../Constants';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super ();

		const {href} = service.getCollection ('Courses', 'Catalog');

		this.service = service;
		this.href = href;

		AppDispatcher.register ((payload) => {
			const action = payload.action;
			switch (action.actionType) {
			case Constants.TEST:
				console.log ('dispatch received action here');
			}
		});
	}


	async load () {
		const {Items: courses, Links: links} = await this.service.get (this.href);
		const {Items: popular} = await this.service.get (links[0].href);

		this.courses = courses;
		this.popular = popular;

		this.emit ('change', {type: 'courses'}, {type: 'popular'});
	}


	get (key) {
		return this[key];
	}


	addChangeListener (fn) {
		this.addListener ('change', fn);
	}

	removeChangeListener (fn) {
		this.removeListener ('change', fn);
	}
}
