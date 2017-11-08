import EventEmitter from 'events';

import AppDispatcher from 'nti-lib-dispatcher';
import {getLink} from 'nti-lib-interfaces';

import * as Constants from '../Constants';


const CHANGE = 'change';

export default class CatalogStore extends EventEmitter {
	constructor (service) {
		super ();

		this.service = service;

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


	async load (collection) {
		if (!collection) {
			return;
		}
		const {Items: courses,} = collection;
		const links = collection.Links;
		const parse = x => this.service.getObject (x);
		this.courses = await Promise.all (courses.map (parse));
		let popular = {Items: []};
		let carousel = {Items: []};
		try {
			popular = await this.service.get (getLink (links, 'popular'));
		}
		catch (e) {
			popular = {Items: []};
		}
		try {
			carousel = await this.service.get (getLink (links, 'Featured'));
		}
		catch (e) {
			carousel = {Items: []};
		}
		this.popular = await Promise.all (popular.Items.map (parse));
		this.carousel = await Promise.all (carousel.Items.map (parse));
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
