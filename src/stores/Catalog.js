import EventEmitter from 'events';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super();

		const {href} = service.getCollection('AllCourses', 'Courses');

		this.service = service;
		this.href = href;
	}


	async load () {
		const {Items:items} = await this.service.get(this.href);

		this.items = items;
		this.emit('change', {type: 'items'});
	}


	get (key) {
		return this[key];
	}


	addChangeListener (fn) {
		this.addListener('change', fn);
	}

	removeChangeListener (fn) {
		this.removeListener('change', fn);
	}
}
