import {getService} from '@nti/web-client';
import {Stores} from '@nti/lib-store';

import * as Constant from '../Constants';


export default class SearchablePagedStore extends Stores.SimpleStore {
	static convertBatch (batch) {
		const nextLink = batch.getLink('batch-next');
		const loadNext = !nextLink ?
			null :
			async () => {
				const service = await getService();
				const nextBatch = await service.getBatch(nextLink);

				return SearchablePagedStore.convertBatch(nextBatch);
			};

		return {
			items: batch.Items,
			loadNext
		};
	}

	constructor () {
		super();

		this.set('searchTerm', null);
		this.set('searchItems', null);
		this.set('categories', {});
		this.set('carousel', {});
		this.set('purchased', null);
		this.set('category', {});
		this.set('loading', null);
		this.set('error', null);
		this.set('carouselIndex', 0);
		this.set('selectCarousel', (index) =>{
			this.set('carouselIndex', index);
		});
	}

	async load (type, id) {
		this.set('loading', true);
		this.emitChange('loading');

		if (this.get('searchTerm')) {
			const searchItems = await this.loadSearchTerm(this.get('searchTerm'));
			this.set('searchItems', searchItems);
			this.set('loading', false);
			this.emitChange('searchItems','loading');
			return;
		}

		try {
			//FIXME: These should be moved to the individual subclasses. Let each Subclass handle their own type.
			if (type === Constant.CATEGORIES) {
				const categories = await this.loadInitial();
				this.set('categories', categories.categories);
				this.set('carousel', categories.carousel);
				this.emitChange('categories', 'carousel');
			}
			else if (type === Constant.CATEGORY) {
				const category = await this.loadCategory(id);
				this.set('category', category);
				this.emitChange('category');
			}
			else if (type === Constant.PURCHASED) {
				const purchased = await this.loadPurchased();
				this.set('purchased', purchased);
				this.emitChange('purchased');
			}

		} catch (e) {
			this.set('error', e);
			this.emitChange('error');
		} finally {
			this.set('loading', false);
			this.emitChange('loading');
		}
	}

	updateSearchTerm (term) {
		this.set('loading', true);
		this.set('searchTerm', term);
		this.emitChange('loading', 'searchTerm');

		clearTimeout(this.doSearchTimeout);

		if (!term) {
			this.load();
		} else {
			this.doSearchTimeout = setTimeout(() => {
				this.load();
			}, 300);
		}
	}


	async parseRaw (data) {
		const service = await getService();

		if (data.MimeType) {
			return service.getObject(data);
		}

		if (data.Items) {
			data.Items = await Promise.all(data.Items.map(o => this.parseRaw(o)));
		}

		return data;
	}


	/**
	 * Return the items and loadNext function for a given search term
	 * @override
	 * @param  {String} term term to search on
	 * @return {Object}      with the items and loadNext function
	 */
	loadSearchTerm (term) {}

	/**
	 * Return the items and loadNext function for a given search term
	 * @override
	 * @return {Object}      with the items and loadNext function
	 */
	loadInitial () {}
}