import React from 'react';
import PropTypes from 'prop-types';
import {searchable} from 'nti-web-search';
import {Loading, EmptyState} from 'nti-web-commons';

import * as Constants from '../../Constants';
import  GridCard from '../grid-card/GridCard';
import Search from '../search';

import Store from './Store';
const store = new Store();
const propMap = {
	purchased: 'purchased',
	searchTerm: 'searchTerm',
	searchItems: 'searchItems',
	loading: 'loading',
	error: 'error'
};

@searchable(store, propMap)
export default class Category extends React.Component {
	static propTypes = {
		purchased: PropTypes.array,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.array,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func
	}


	componentDidMount () {
		store.load(Constants.PURCHASED);
	}

	render () {
		const {loading} = this.props;

		if (this.props.searchItems && this.props.searchTerm) {
			return (
				<div className="course-catalog">
					<section className="">
						<Search term={this.props.searchTerm} courses={this.props.searchItems} loading={this.props.loading}/>
					</section>
				</div>

			);
		}

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
		if (this.props.purchased && this.props.purchased.length === 0) {
			return this.renderEmptyState();
		}
		return (
			<div className="course-catalog">
				<section className="content-catalog no-sidebar">
					<GridCard courses={this.props.purchased} type={Constants.PURCHASED}/>
				</section>
			</div>
		);
	}

	renderEmptyState () {
		const header = 'You don\'t have any courses yet...';

		return (
			<EmptyState header={header} />
		);
	}
}
