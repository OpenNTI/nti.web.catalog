import React from 'react';
import {getService} from 'nti-web-client';
import {Searchable, contextual} from 'nti-web-search';
import PropTypes from 'prop-types';

import {Catalog as CatalogStore} from './stores';
import Catalog from './Catalog';

@contextual('catalog')
export default class CatalogView extends React.Component {

	static propTypes ={
		collection: PropTypes.object
	}

	state = {}

	async componentWillReceiveProps (nextProps) {
		console.log('received props');
		const {collection:newCollection} = nextProps;
		const {collection:oldCollection} = this.props;

		if (newCollection !== oldCollection) {
			this.state.store.load(newCollection);
		}

	}

	async componentDidMount () {
		const service = await getService();
		const store = new CatalogStore(service);

		store.load(this.props.collection);

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
