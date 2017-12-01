import {getService} from 'nti-web-client';

import SearchablePagedStore from '../common/SearchbalePageStore';
import * as Constants from '../../Constants';

export default class CategoryStore extends SearchablePagedStore {
	async loadSearchTerm (term) {
		const service = await getService();
		const collection = service.getCollection('Courses', 'Catalog');
		const {Items: searchItems} = await service.getBatch(collection.href, {batchSize: Constants.BATCH_SIZE, batchStart: 0, filter: term});

		return searchItems;
	}

	async loadPurchased () {
		const service = await getService();
		const {href : href } = service.getCollection('Purchased', 'Catalog');
		let purchased = {Items :[]};
		try {
			purchased = await service.get (href);
		}
		catch (e) {
			purchased = {Items :[]};
		}
		return purchased.Items;
	}
}
