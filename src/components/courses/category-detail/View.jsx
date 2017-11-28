import React from 'react';
import PropTypes from 'prop-types';
import {searchable} from 'nti-web-search';
import {Loading} from 'nti-web-commons';

import * as Constants from '../../../Constants';
import GridCard from '../../grid-card/GridCard';

import Store from './Store';
const store = new Store();
const propMap = {
	category: 'category',
	searchTerm: 'searchTerm',
	loading: 'loading',
	hasNextPage: 'hasNextPage',
	loadingNextPage: 'loadingNextPage',
	error: 'error'
};

@searchable(store, propMap)
export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		searchTerm: PropTypes.string,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func
	}


	componentDidMount () {
		const id = this.props.match && this.props.match.params && this.props.match.params.id ?
			this.props.match.params.id : '';
		store.load(Constants.CATEGORY, id);
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
		if (!this.props.category) {
			return null;
		}
		console.log(this.props);
		return (
			<div className="course-catalog">
				<section className="">
					<GridCard category={this.props.category} type={Constants.CATEGORY}/>
				</section>
			</div>

		);
	}
}
