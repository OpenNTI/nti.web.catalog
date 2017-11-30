import {getService} from 'nti-web-client';

import SearchablePagedStore from '../common/SearchbalePageStore';

export default class CategoryStore extends SearchablePagedStore {


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
