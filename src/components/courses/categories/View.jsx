import React from 'react';
import PropTypes from 'prop-types';
import {searchable} from 'nti-web-search';
import {Loading, EmptyState} from 'nti-web-commons';

import * as Constant from '../../../Constants';
import Carousel from '../../carousel/Carousel';
import GridCard from '../../grid-card/GridCard';

import Store from './Store';

const store = new Store();
const propMap = {
	categories: 'categories',
	carousel: 'carousel',
	searchTerm: 'searchTerm',
	loading: 'loading',
	hasNextPage: 'hasNextPage',
	loadingNextPage: 'loadingNextPage',
	error: 'error'
};

@searchable(store, propMap)
export default class Categories extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		categories: PropTypes.object,
		carousel: PropTypes.object,
		searchTerm: PropTypes.string,
		loading: PropTypes.bool,
		renderData: PropTypes.func
	}


	componentDidMount () {
		store.load(Constant.CATEGORIES);
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
		const categories = this.props.categories && this.props.categories.Items ? this.props.categories.Items : [];
		const carousel = this.props.carousel && this.props.carousel.Items ? this.props.carousel.Items : [];

		if (!categories || categories.length === 0) {
			return this.renderEmptyState();
		}

		const onlyOther = categories.length === 1 && categories[0].Name === '.nti_other';
		return (
			<div className="course-catalog">
				<section className="carousel">
					<Carousel data={carousel}/>
				</section>
				{onlyOther && (
					<div className="course-catalog">
						<section className="">
							<GridCard category={categories[0]} type={Constant.CATEGORY} other={onlyOther} link={this.props.categories.link}/>
						</section>
					</div>
				)}
				{!onlyOther && (
					<section className="content-catalog no-sidebar">
						<GridCard courses={categories} type={Constant.CATEGORIES}/>
					</section>
				)}
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
