import {getService} from '@nti/web-client';

import SearchablePagedStore from '../common/SearchablePageStore';
import * as Constants from '../Constants';

export default class CategoryStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		const service = await getService();
		const {href : href } = service.getCollection('Purchased', 'Catalog');
		const searchItems = await service.getBatch(href, {batchSize: Constants.BATCH_SIZE, batchStart: 0, filter: term});

		return searchItems;
	}

	async loadPurchased () {
		const service = await getService();
		const {href : href } = service.getCollection('Purchased', 'Catalog');
		try {
			const purchased = await service.getBatch(href, {batchSize: Constants.BATCH_SIZE, batchStart: 0});
			return purchased;
		}
		catch (e) {
			return null;
		}
	}
}
