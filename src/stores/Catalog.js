import EventEmitter from 'events';

import {getLink} from 'nti-lib-interfaces';

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
		let popular = [];
		try{
			popular = await this.service.get (getLink(links, 'popular'));
		} catch (e) {
			popular = [];
		}

		const parse = x => this.service.getObject(x);
		this.courses = await Promise.all( courses.map(parse) );
		this.popular = await Promise.all( popular.Items.map(parse) );

		this.emit (CHANGE, {type: 'courses'});
		this.emit (CHANGE, {type: 'popular'});
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
