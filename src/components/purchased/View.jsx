import React from 'react';
import PropTypes from 'prop-types';
import {searchable} from 'nti-web-search';
import {Loading, EmptyState} from 'nti-web-commons';

import * as Constants from '../../Constants';
import  GridCard from '../grid-card/GridCard';

import Store from './Store';
const store = new Store();
const propMap = {
	purchased: 'purchased',
	searchTerm: 'searchTerm',
	loading: 'loading',
	hasNextPage: 'hasNextPage',
	loadingNextPage: 'loadingNextPage',
	error: 'error'
};

@searchable(store, propMap)
export default class Category extends React.Component {
	static propTypes = {
		purchased: PropTypes.array,
		searchTerm: PropTypes.string,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func
	}


	componentDidMount () {
		store.load(Constants.PURCHASED);
	}

	render () {
		const {loading} = this.props;

		return (
			<div >
				{loading && (
					<div className="course-catalog">
						<div className="loading-mask"><Loading.Mask /></div>
					</div>
				)}
				{!loading && this.renderItems()}
			</div>
		);
	}

	renderItems () {
		if (!this.props.purchased) {
			return null;
		}
		if (this.props.purchased || this.props.purchased.length === 0) {
			return this.renderEmptyState();
		}
		console.log(this.props);
		return (
			<section className="content-catalog no-sidebar">
				<GridCard courses={this.props.purchased} type={Constants.PURCHASED}/>
			</section>
		);
	}

	renderEmptyState () {
		const header = 'You don\'t have any courses yet...';

		return (
			<EmptyState header={header} />
		);
	}
}
