import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { searchable, contextual } from '@nti/web-search';
import { Loading } from '@nti/web-commons';

import * as Constants from '../../../Constants';
import GridCard from '../../../grid-card/components/GridCard';
import Search from '../../../search/components';
import Store from '../Store';

const store = new Store();

class CategoryDetailView extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.object,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func,
		location: PropTypes.object,
		id: PropTypes.string,
	};

	componentDidMount() {
		const id =
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
				? this.props.match.params.id
				: '';

		if (id === 'item') {
			return;
		}
		store.load(Constants.CATEGORY, id);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.id !== this.props.id) {
			store.load(Constants.CATEGORY, this.props.id);
		}
	}

	render() {
		const { loading } = this.props;
		if (this.props.searchItems && this.props.searchTerm) {
			return (
				<div className="course-catalog">
					<section className="">
						<Search
							term={this.props.searchTerm}
							courses={this.props.searchItems}
							loading={this.props.loading}
						/>
					</section>
				</div>
			);
		}

		return (
			<div>
				{loading && (
					<div className="course-catalog">
						<div className="loading-mask">
							<Loading.Mask />
						</div>
					</div>
				)}
				{!loading && this.renderItems()}
			</div>
		);
	}

	renderItems() {
		if (!this.props.category) {
			return null;
		}
		return (
			<div className="course-catalog">
				<section className="">
					<GridCard
						category={this.props.category}
						type={Constants.CATEGORY}
					/>
				</section>
			</div>
		);
	}
}

export default decorate(CategoryDetailView, [
	contextual('Catalog'),
	searchable(store, {
		category: 'category',
		searchItems: 'searchItems',
		searchTerm: 'searchTerm',
		loading: 'loading',
		error: 'error',
	}),
]);