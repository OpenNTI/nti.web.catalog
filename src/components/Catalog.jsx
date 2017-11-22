import React from 'react';
import PropTypes from 'prop-types';
import {EmptyState, Loading} from 'nti-web-commons';

import * as Constants from '../Constants';

import Carousel from './carousel/Carousel';
import GridCard from './grid-card/GridCard';
import Search from './search/Search';

export default class Catalog extends React.Component {
	static propTypes = {
		categories: PropTypes.array,
		category: PropTypes.object,
		courses: PropTypes.array,
		carousel: PropTypes.array,
		search: PropTypes.object,
		loading: PropTypes.bool
	}


	render () {
		if(this.props.loading) {
			return (
				<div>
					<div className="course-catalog">
						<Loading.Mask />
					</div>
				</div>
			);
		}
		// return empty if no data
		// I see Andrew suggest !courses || courses.length === 0
		// However when the first render, the courses undefined, it will show empty component
		// I think it not good, so I using below logic.
		const empty = this.props.courses && this.props.courses.length === 0;
		if (empty) {
			return (
				<div>
					<div className="course-catalog">
						<EmptyState
							header="You don't have any courses yet..."
							subHeader=""
						/>
					</div>
				</div>
			);
		}

		const search = this.props.search && this.props.search.searching ? true : false;
		// let type = this.props.category && this.props.category.show ? Constants.CATEGORY : Constants.CATEGORIES;

		if(this.props.category && this.props.category.show) {
			return(
				<div className="course-catalog">
					<section className="carousel">
						<GridCard category={this.props.category} type={Constants.CATEGORY}/>
					</section>

				</div>
			);
		}
		return (
			<div>
				<div className="course-catalog">
					{!search && (
						<section className="carousel">
							<Carousel data={this.props.carousel}/>
						</section>
					)}
					{search && (
						<section className="search">
							<Search data={this.props.search}/>
						</section>
					)}
					{!search && (
						<section className="content-catalog no-sidebar">
							<GridCard categories={this.props.categories} type={Constants.CATEGORIES}/>
						</section>
					)}
				</div>
			</div>
		);
	}
}
