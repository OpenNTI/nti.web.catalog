import React from 'react';
import PropTypes from 'prop-types';
import {EmptyState, Loading} from 'nti-web-commons';

import Carousel from './carousel/Carousel';
import GridCard from './grid-card/GridCard';
import MenuBar from './menu-bar/MenuBar';
import Search from './search/Search';

export default class Catalog extends React.Component {
	static propTypes = {
		popular: PropTypes.array,
		courses: PropTypes.array,
		carousel: PropTypes.array,
		search: PropTypes.object,
		loading: PropTypes.bool
	}

	constructor (props) {
		super (props);

		this.state = {
			menuData: {
				tag: [
					{
						title: 'Free Courses',
						id: 'Free Courses'
					},
					{
						title: 'Physics',
						id: 'Physics'
					},
					{
						title: 'Computer Science',
						id: 'Computer Science'
					},
					{
						title: 'Health',
						id: 'Health'
					},
					{
						title: 'Economics',
						id: 'Economics'
					},
					{
						title: 'Free Courses',
						id: 'Free Courses'
					}
				]
			}
		};
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


		let sideBarClass = 'content-catalog no-sidebar';
		if (this.props.popular && this.props.popular.length !== 0) {
			sideBarClass = 'content-catalog ';
		}
		const search = this.props.search && this.props.search.searching ? true : false;

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
						<section className={sideBarClass}>
							<MenuBar popular={this.props.popular} tag={this.state.menuData.tag}/>
							<GridCard data={this.props.courses}/>
						</section>
					)}
				</div>
			</div>
		);
	}
}
