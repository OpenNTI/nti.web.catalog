import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './components/carousel/Carousel';
import GridCard from './components/grid-card/GridCard';
import MenuBar from './components/menu-bar/MenuBar';
import Search from './components/search/Search';

export default class Catalog extends React.Component {
	static propTypes = {
		popular: PropTypes.array,
		courses: PropTypes.array,
		carousel: PropTypes.array,
		search: PropTypes.object
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
