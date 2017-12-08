import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';

import SearchablePagedStore from '../../common/SearchbalePageStore';
import * as Constants from '../../Constants';

const INITIAL_LOAD_CACHE = Symbol('Initial Load Cache');

export default class CourseListStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		const service = await getService();
		const collection = service.getCollection('Courses', 'Catalog');
		const {Items: searchItems} = await service.getBatch(collection.href, {batchSize: Constants.BATCH_SIZE, batchStart: 0, filter: term});

		return searchItems;
	}


	async loadInitial () {
		const service = await getService();
		const {Links: links} = service.getCollection('Courses', 'Catalog');

		let categories = {Items: []};
		let carousel = {Items: []};

		try {
			categories = await service.get (getLink (links, 'ByTag'));
			categories.link = getLink(links, 'ByTag');
		}
		catch (e) {
			categories = {Items: []};
		}
		try {
			carousel = await service.get (getLink (links, 'Featured'));
		}
		catch (e) {
			carousel = {Items: []};
		}

		this[INITIAL_LOAD_CACHE] = categories;

		return {categories: categories, carousel: carousel};
	}
}
