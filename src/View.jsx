import React from 'react';
import {getService} from 'nti-web-client';
import {Searchable} from 'nti-web-search';

import {Catalog as CatalogStore} from './stores';
import Catalog from './Catalog';

export default class CatalogView extends React.Component {

	state = {}

	async componentDidMount () {
		const service = await getService();
		const store = new CatalogStore(service);

		store.load();

		this.setState({store});
	}


	render () {
		const {store} = this.state;

		if (!store) { return null; }

		return (
			<Searchable searchable-store={store}
				searchable-propMap={{popular: 'popular',courses: 'courses',carousel: 'carousel',search: 'search'}} >
				<Catalog />
			</Searchable>
		);
	}
}
