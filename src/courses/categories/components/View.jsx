import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@nti/lib-commons';
import { searchable, contextual } from '@nti/web-search';
import { Loading, EmptyState, Layouts } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import { Contact } from '@nti/web-help';

import * as Constant from '../../../Constants';
import Carousel from '../../../carousel/components/Carousel';
import CarouselMobile from '../../../carousel/carousel-mobile/Carousel';
import GridCard from '../../../grid-card/components/GridCard';
import Search from '../../../search/components';
import Store from '../Store';

const { Responsive } = Layouts;
const store = new Store(); //FIXME: I would prefer if the store could be constructed on first use/mount... instead of statically.

class Categories extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		categories: PropTypes.object,
		carousel: PropTypes.object,
		searchTerm: PropTypes.string,
		searchItems: PropTypes.object,
		loading: PropTypes.bool,
		renderData: PropTypes.func,
		selectCarousel: PropTypes.func,
		carouselIndex: PropTypes.number,
	};

	constructor(props) {
		super(props);

		this.state = {
			showContact: false,
		};
	}

	componentDidMount() {
		store.load(Constant.CATEGORIES);
	}

	showContact = () => {
		Contact.show();
	};

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
		const categories =
			this.props.categories && this.props.categories.Items
				? this.props.categories.Items
				: [];
		const carousel =
			this.props.carousel && this.props.carousel.Items
				? this.props.carousel.Items
				: [];

		if (!categories || categories.length === 0) {
			return this.renderEmptyState();
		}

		const onlyOther =
			categories.length === 1 && categories[0].Name === '.nti_other';
		return (
			<div className="course-catalog">
				<section className="carousel">
					<div className="carousel-wrapper">
						<Responsive.Item
							query={Responsive.isMobile}
							component={CarouselMobile}
							data={carousel}
						/>
						<Responsive.Item
							query={Responsive.isTablet}
							component={CarouselMobile}
							data={carousel}
						/>
						<Responsive.Item
							query={Responsive.isDesktop}
							component={Carousel}
							data={carousel}
							carouselSelected={this.props.carouselIndex}
							selectCarousel={this.props.selectCarousel}
						/>
					</div>
				</section>
				{onlyOther && (
					<div className="course-catalog">
						<section className="">
							<GridCard
								category={categories[0]}
								type={Constant.CATEGORY}
								other={onlyOther}
								link={this.props.categories.link}
							/>
						</section>
					</div>
				)}
				{!onlyOther && (
					<section className="content-catalog no-sidebar">
						<GridCard
							courses={categories}
							type={Constant.CATEGORIES}
						/>
					</section>
				)}
				{Responsive.isMobileContext() && (
					<section className="bottom-menu">
						<div>
							<LinkTo.Name name="catalog.redeem">
								Redeem a Course
							</LinkTo.Name>
						</div>
						<LinkTo.Name name="contact-us">Contact us</LinkTo.Name>
					</section>
				)}
			</div>
		);
	}

	renderEmptyState() {
		const header = 'There are no courses available.';

		return <EmptyState header={header} />;
	}
}

export default decorate(Categories, [
	contextual('Catalog'),
	searchable(store, {
		categories: 'categories',
		carousel: 'carousel',
		searchItems: 'searchItems',
		searchTerm: 'searchTerm',
		loading: 'loading',
		hasNextPage: 'hasNextPage',
		loadingNextPage: 'loadingNextPage',
		selectCarousel: 'selectCarousel',
		carouselIndex: 'carouselIndex',
		error: 'error',
	}),
]);
