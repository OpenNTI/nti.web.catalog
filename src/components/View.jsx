import React from 'react';
import {getService} from 'nti-web-client';
import {Searchable, contextual} from 'nti-web-search';
import PropTypes from 'prop-types';
import {Loading} from 'nti-web-commons';

import {Catalog as CatalogStore} from '../stores';

import Catalog from './Catalog';
import Redeem from './redeem/Redeem';

@contextual('catalog')
export default class CatalogView extends React.Component {

	static propTypes ={
		collection: PropTypes.object,
		redeem: PropTypes.bool,
		redeemCollection: PropTypes.object,
		loading: PropTypes.bool
	}

	state = {}

	async componentWillReceiveProps (nextProps) {
		const {collection:newCollection} = nextProps;
		const {collection:oldCollection} = this.props;

		if (newCollection !== oldCollection && newCollection) {
			this.state.store.load(newCollection);
		}

	}

	async componentDidMount () {
		const service = await getService();
		const store = new CatalogStore(service);
		if (this.props.collection) {
			store.load (this.props.collection);
		}

		this.setState({store});
	}


	render () {
		const {store} = this.state;

		if (!store) { return null; }

		if(this.props.loading) {
			return (
				<div>
					<div className="course-catalog">
						<Loading.Mask />
					</div>
				</div>
			);
		}

		if (this.props.redeem) {
			return (<Redeem redeemCollection={this.props.redeemCollection}/>);
		}

		return (
			<Searchable searchable-store={store}
				searchable-propMap={{popular: 'popular',courses: 'courses',carousel: 'carousel',search: 'search', loading: 'loading'}} >
				<Catalog />
			</Searchable>
		);
	}
}
