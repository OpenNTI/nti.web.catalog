import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { searchable, contextual } from '@nti/web-search';
import { Loading, EmptyState, Errors } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import * as Constants from '../../Constants';
import GridCard from '../../grid-card/components/GridCard';
import Search from '../../search/components';
import Store from '../Store';

const store = new Store();

const PURCHASED_TEXT = {
	empty: "You don't have any courses yet...",
	search: 'Courses',
};

const t = scoped('catalog.purchased.components.View', PURCHASED_TEXT);

class PurchasedView extends React.Component {
	static propTypes = {
		purchased: PropTypes.object,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.object,
		loading: PropTypes.bool,
		match: PropTypes.object,
		renderData: PropTypes.func,
		location: PropTypes.object,
		error: PropTypes.any,
	};

	componentDidMount() {
		store.load(Constants.PURCHASED);
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.location.pathname !== this.props.location.pathname &&
			this.props.location.pathname !== this.props.match.url
		) {
			store.load(Constants.PURCHASED);
		}
	}

	render() {
		const { loading } = this.props;

		if (this.props.searchItems && this.props.searchTerm) {
			const isPurchased = true;
			return (
				<div className="course-catalog">
					<section className="">
						<Search
							term={this.props.searchTerm}
							courses={this.props.searchItems}
							loading={this.props.loading}
							isSearchPurchased={isPurchased}
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
		if (this.props.error) {
			return (
				<div className="course-catalog">
					<div className="content-catalog error">
						<Errors.Message error={this.props.error} />
					</div>
				</div>
			);
		}

		if (!this.props.purchased) {
			return null;
		}
		if (
			this.props.purchased.Items &&
			this.props.purchased.Items.length === 0
		) {
			return this.renderEmptyState();
		}

		return (
			<div className="course-catalog">
				<section className="content-catalog no-sidebar">
					<GridCard
						category={this.props.purchased}
						type={Constants.PURCHASED}
					/>
				</section>
			</div>
		);
	}

	renderEmptyState() {
		const header = t('empty');

		return <EmptyState header={header} />;
	}
}

export default decorate(PurchasedView, [
	contextual(t('search')),
	searchable(store, {
		purchased: 'purchased',
		searchTerm: 'searchTerm',
		searchItems: 'searchItems',
		loading: 'loading',
		error: 'error',
	}),
]);
