import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';

import SearchablePagedStore from '../../common/SearchbalePageStore';
import * as Constants from '../../../Constants';

export default class CategoryStore extends SearchablePagedStore {


	async loadCategory (id) {
		const service = await getService();
		const {Links: links} = service.getCollection('Courses', 'Catalog');
		let category = {};

		try {
			const categoryLink = getLink (links, 'ByTag') + '/' + id + '?batchStart=0&batchSize=' + Constants.BATCH_SIZE;
			console.log(categoryLink);
			category = await service.get (categoryLink);
			category.link = getLink (links, 'ByTag');
		}
		catch (e) {
			category = {};
		}

		return category;
	}
}
