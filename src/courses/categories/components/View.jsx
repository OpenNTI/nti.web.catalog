import React from 'react';
import PropTypes from 'prop-types';
import {searchable, contextual} from 'nti-web-search';
import {Loading, EmptyState} from 'nti-web-commons';

import * as Constant from '../../../Constants';
import Carousel from '../../../carousel/components/Carousel';
import GridCard from '../../../grid-card/components/GridCard';
import Search from '../../../search/components/index';
import Store from '../Store';

const store = new Store();
const propMap = {
	categories: 'categories',
	carousel: 'carousel',
	searchItems: 'searchItems',
	searchTerm: 'searchTerm',
	loading: 'loading',
	hasNextPage: 'hasNextPage',
	loadingNextPage: 'loadingNextPage',
	selectCarousel: 'selectCarousel',
	carouselIndex: 'carouselIndex',
	error: 'error'
};

@contextual('Catalog')
@searchable(store, propMap)
export default class Categories extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		categories: PropTypes.object,
		carousel: PropTypes.object,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.array,
		loading: PropTypes.bool,
		renderData: PropTypes.func,
		selectCarousel: PropTypes.func,
		carouselIndex: PropTypes.number
	}


	componentDidMount () {
		store.load(Constant.CATEGORIES);
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
		const categories = this.props.categories && this.props.categories.Items ? this.props.categories.Items : [];
		const carousel = this.props.carousel && this.props.carousel.Items ? this.props.carousel.Items : [];

		if (!categories || categories.length === 0) {
			return this.renderEmptyState();
		}

		const onlyOther = categories.length === 1 && categories[0].Name === '.nti_other';
		return (
			<div className="course-catalog">
				<section className="carousel">
					<Carousel data={carousel} carouselSelected={this.props.carouselIndex} selectCarousel={this.props.selectCarousel}/>
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
