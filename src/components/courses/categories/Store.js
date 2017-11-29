import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';

import SearchablePagedStore from '../../common/SearchbalePageStore';

const INITIAL_LOAD_CACHE = Symbol('Initial Load Cache');

export default class CourseListStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		if (term.length < 3) {
			return {items: []};
		}

		const service = await getService();
		const link = service.getUserSearchURL(term);

		const batch = await service.getBatch(link);

		delete this[INITIAL_LOAD_CACHE];

		return SearchablePagedStore.convertBatch(batch);
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
