import {getService} from 'nti-web-client';

import SearchablePagedStore from '../common/SearchbalePageStore';
import * as Constants from '../Constants';

export default class CategoryStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		const service = await getService();
		const {href : href } = service.getCollection('Purchased', 'Catalog');
		const {Items: searchItems} = await service.getBatch(href, {batchSize: Constants.BATCH_SIZE, batchStart: 0, filter: term});

		return searchItems;
	}

	async loadPurchased () {
		const service = await getService();
		const {href : href } = service.getCollection('Purchased', 'Catalog');
		let purchased;
		try {
			purchased = await service.getBatch(href, {batchSize: Constants.BATCH_SIZE, batchStart: 0});
		}
		catch (e) {
			return [];
		}
		return purchased.Items;
	}
}
