import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';
import {URL} from 'nti-commons';

import SearchablePagedStore from '../../common/SearchbalePageStore';
import * as Constants from '../../Constants';

export default class CategoryStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		const service = await getService();
		const collection = service.getCollection('Courses', 'Catalog');
		const searchItems = await service.getBatch(collection.href, {batchSize: Constants.BATCH_SIZE, batchStart: 0, filter: term});

		return searchItems;
	}

	async loadCategory (id) {
		const service = await getService();
		const {Links: links} = service.getCollection('Courses', 'Catalog');
		let category = {};

		try {
			const link = getLink (links, 'ByTag') + '/' + id;
			const categoryLink = URL.appendQueryParams(link, {batchStart: 0, batchSize: Constants.BATCH_SIZE});
			category = await this.parseRaw(await service.get(categoryLink));
			category.link = getLink (links, 'ByTag');
		}
		catch (e) {
			category = {};
		}

		return category;
	}
}
