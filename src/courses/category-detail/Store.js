import {getService} from '@nti/web-client';
import {getLink} from '@nti/lib-interfaces';
// import {URL} from '@nti/lib-commons';

import SearchablePagedStore from '../../common/SearchablePageStore';
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
			const link = getLink(links, 'ByTag') + '/' + id;
			category = await service.getBatch(link, {batchStart: 0, batchSize: Constants.BATCH_SIZE});
		}
		catch (e) {
			category = {};
		}

		return category;
	}
}
