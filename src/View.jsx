import React from 'react';
import {getService} from 'nti-web-client';

import {Catalog as CatalogStore} from './stores';
import Catalog from './Catalog';
import StoreConnector from './StoreConnector';

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
			<StoreConnector store={store} >
				<Catalog />
			</StoreConnector>
		);
	}
}
