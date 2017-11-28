import {getService} from 'nti-web-client';

import BasicStore from '../BasicStore';
import * as Constant from '../../Constants';

export default class SearchablePagedStore extends BasicStore {
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

		this._searchTerm = null;

		this._categories = {};
		this._carousel = {};
		this._purchased = [];
		this._category = {};
		this._loading = false;
		this._error = null;
	}


	get error () {
		return this._error;
	}

	get searchTerm () {
		return this._searchTerm;
	}

	get categories () {
		return this._categories;
	}

	get carousel () {
		return this._carousel;
	}
	get purchased () {
		return this._purchased;
	}
	get category () {
		return this._category;
	}
	get loading () {
		return this._loading;
	}

	async load (type, id) {
		this._loading = true;
		this.emitChange('loading');

		try {
			if (type === Constant.CATEGORIES) {
				const categories = await this.loadInitial();
				this._categories = categories.categories;
				this._carousel = categories.carousel;
				this.emitChange('categories');
				this.emitChange('carousel');
			}
			else if (type === Constant.CATEGORY) {
				const category = await this.loadCategory(id);
				this._category = category;
				this.emitChange('category');
			}
			else if (type === Constant.PURCHASED) {
				const purchased = await this.loadPurchased();
				this._purchased = purchased;
				this.emitChange('purchased');
			}

		} catch (e) {
			this._error = e;
			this.emitChange('error');
		} finally {
			this._loading = false;
			this.emitChange('loading');
		}
	}

	updateSearchTerm (term) {
		this._loading = true;
		this._searchTerm = term;
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
