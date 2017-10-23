import EventEmitter from 'events';

const CHANGE = 'change';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super ();

		const {href} = service.getCollection ('Courses', 'Catalog');

		this.service = service;
		this.href = href;
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
