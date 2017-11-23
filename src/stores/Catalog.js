import EventEmitter from 'events';

import AppDispatcher from 'nti-lib-dispatcher';
import {getLink} from 'nti-lib-interfaces';

import * as Constants from '../Constants';


const CHANGE = 'change';
let categoryLink = '';

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
				this.category = {
					show :false,
					link: categoryLink
				};
				this.emit (CHANGE, {type: 'search'});
				this.emit (CHANGE, {type: 'category'});
				break;

			case Constants.VIEW_CATEGORY:
				this.service.get(action.link).then(items =>{
					this.category = {
						show :true,
						data: items
					};
					this.emit(CHANGE, {type: 'category'});
				});

				break;

			case Constants.BACK_TO_CATEGORIES:
				this.category = {
					show :false,
					link: categoryLink
				};
				this.emit(CHANGE, {type: 'category'});
				break;
			}
		});
	}


	async load (collection) {
		if (!collection) {
			return;
		}
		this.loading = true;
		this.emit (CHANGE, {type: 'loading'});

		const {Items: courses,} = collection;
		const links = collection.Links;
		const parse = x => this.service.getObject (x);
		this.courses = await Promise.all (courses.map (parse));

		let carousel = {Items: []};
		try {
			carousel = await this.service.get (getLink (links, 'Featured'));
		}
		catch (e) {
			carousel = {Items: []};
		}

		let categories = {Items: []};

		try {
			categories = await this.service.get (getLink (links, 'ByTag'));
		}
		catch (e) {
			categories = {Items: []};
		}


		this.carousel = await Promise.all(carousel.Items.map(parse));
		this.categories = categories.Items;
		this.search = {
			searching: false
		};
		this.category = {
			show :false,
			link: getLink(links, 'ByTag')
		};
		categoryLink = getLink(links, 'ByTag');

		this.purchased = false;
		if (collection.Title === 'Purchased') {
			this.purchased = true;
		}

		this.emit (CHANGE, {type: 'courses'});
		this.emit (CHANGE, {type: 'carousel'});
		this.emit (CHANGE, {type: 'purchased'});
		this.emit (CHANGE, {type: 'categories'});
		this.emit (CHANGE, {type: 'category'});
		this.emit (CHANGE, {type: 'search'});
		this.loading = false;
		this.emit (CHANGE, {type: 'loading'});
	}


	get (key) {
		return this[key];
	}

	updateSearchTerm (term) {
		const courses = this.category.show ? this.category.data : this.courses;
		this.search = {
			searching: true,
			term: term,
			courses: courses
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
