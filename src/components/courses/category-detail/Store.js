import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';

import SearchablePagedStore from '../../common/SearchbalePageStore';
import * as Constants from '../../../Constants';

export default class CategoryStore extends SearchablePagedStore {
	async loadSearchTerm (term, category) {
		const link = category ? category.link + '/' + category.Name : '';
		const service = await getService();
		let searchItems = [];
		try {
			const {Items: items} = await service.get (link);
			searchItems = SearchablePagedStore.fillerItems(items, term);
		}
		catch (e) {
			searchItems = [];
		}
		return searchItems;
	}

	async loadCategory (id) {
		const service = await getService();
		const {Links: links} = service.getCollection('Courses', 'Catalog');
		let category = {};

		try {
			const categoryLink = getLink (links, 'ByTag') + '/' + id + '?batchStart=0&batchSize=' + Constants.BATCH_SIZE;
			category = await service.get (categoryLink);
			category.link = getLink (links, 'ByTag');
		}
		catch (e) {
			category = {};
		}

		return category;
	}
}
