import EventEmitter from 'events';

import AppDispatcher from 'nti-lib-dispatcher';
import {getLink} from 'nti-lib-interfaces';

import * as Constants from '../Constants';



const CHANGE = 'change';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super ();

		const {href} = service.getCollection ('Courses', 'Catalog');

		this.service = service;
		this.href = href;
		AppDispatcher.register ((payload) => {
			const action = payload.action;
			switch (action.type) {
			case Constants.VIEW_ALL_COURSES:
				this.search = {
					searching: false
				};
				this.emit (CHANGE, {type: 'search'});
				break;
			}
		});
	}


	async load () {
		const {Items: courses, Links: links} = await this.service.get (this.href);
		const {Items: popular} = await this.service.get (getLink (links, 'popular'));
		const {Items: carousel} = await this.service.get (getLink (links, 'Featured'));

		const parse = x => this.service.getObject (x);
		this.courses = await Promise.all (courses.map (parse));
		this.popular = await Promise.all (popular.map (parse));
		this.carousel = await Promise.all (carousel.map (parse));
		this.search = {
			searching: false
		};

		this.emit (CHANGE, {type: 'courses'});
		this.emit (CHANGE, {type: 'popular'});
		this.emit (CHANGE, {type: 'carousel'});
		this.emit (CHANGE, {type: 'search'});
	}


	get (key) {
		return this[key];
	}

	updateSearchTerm (term) {
		this.search = {
			searching: true,
			term: term,
			courses: this.courses
		};
		this.emit ('change', {type: 'search'});
	}

	addChangeListener (fn) {
		this.addListener (CHANGE, fn);
	}

	removeChangeListener (fn) {
		this.removeListener (CHANGE, fn);
	}
}
