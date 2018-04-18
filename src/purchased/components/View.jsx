import React from 'react';
import PropTypes from 'prop-types';
import {searchable, contextual} from '@nti/web-search';
import {Loading, EmptyState} from '@nti/web-commons';

import * as Constants from '../../Constants';
import  GridCard from '../../grid-card/components/GridCard';
import Search from '../../search/components';
import Store from '../Store';

const store = new Store();
const propMap = {
	purchased: 'purchased',
	searchTerm: 'searchTerm',
	searchItems: 'searchItems',
	loading: 'loading',
	error: 'error'
};

export default
@contextual('Courses')
@searchable(store, propMap)
class Category extends React.Component {
	static propTypes = {
		purchased: PropTypes.object,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.object,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func,
		location: PropTypes.object
	}


	componentDidMount () {
		store.load(Constants.PURCHASED);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname && this.props.location.pathname !== this.props.match.url) {
			store.load(Constants.PURCHASED);
		}
	}

	render () {
		const {loading} = this.props;

		if (this.props.searchItems && this.props.searchTerm) {
			const isPurchased = true;
			return (
				<div className="course-catalog">
					<section className="">
						<Search term={this.props.searchTerm} courses={this.props.searchItems} loading={this.props.loading} isSearchPurchased={isPurchased}/>
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
		if (this.props.purchased.Items && this.props.purchased.Items.length === 0) {
			return this.renderEmptyState();
		}
		return (
			<div className="course-catalog">
				<section className="content-catalog no-sidebar">
					<GridCard category={this.props.purchased} type={Constants.PURCHASED}/>
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
