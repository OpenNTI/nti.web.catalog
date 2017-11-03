import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './components/carousel/Carousel';
import GridCard from './components/grid-card/GridCard';
import MenuBar from './components/menu-bar/MenuBar';

export default class Catalog extends React.Component {
	static propTypes = {
		popular: PropTypes.array,
		courses: PropTypes.array,
		carousel: PropTypes.array
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
		let contentClass = 'content-catalog no-sidebar';
		if (this.props.popular && this.props.popular.length !== 0) {
			contentClass = 'content-catalog ';
		}
		return (
			<div>
				<div className="catalog">
					<section className="carousel">
						<Carousel data={this.props.carousel}/>
					</section>
					<section className={contentClass}>
						<MenuBar popular={this.props.popular} tag={this.state.menuData.tag}/>
						<GridCard data={this.props.courses}/>
					</section>
				</div>
			</div>
		);
	}
}
