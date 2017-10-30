import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './components/carousel/Carousel';
import GridCard from './components/grid-card/GridCard';
import MenuBar from './components/menu-bar/MenuBar';

export default class Catalog extends React.Component {
	static propTypes = {
		popular: PropTypes.array,
		courses: PropTypes.array
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
			},
			carousel: [
				{
					id: 1,
					background: {
						url: 'http://www.menucool.com/slider/ninja-slider/img/abc.jpg',
					},
					displayImage: {
						url: 'http://www.menucool.com/slider/ninja-slider/img/abc.jpg',
					},
					title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
					description: 'This course provides fundamental concepts in probability and statistical inference',
					startDate: new Date (),
					learnersNumber: 4321,
					spotsLeft: 20
				},
				{
					id: 2,
					background: {
						url: 'https://www.w3schools.com/css/trolltunga.jpg',
					},
					displayImage: {
						url: 'https://www.w3schools.com/css/trolltunga.jpg',
					},
					title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
					description: 'This course provides fundamental concepts in probability and statistical inference',
					startDate: new Date (),
					learnersNumber: 4321,
					spotsLeft: 50
				},
				{
					id: 3,
					background: {
						url: 'https://pbs.twimg.com/media/DGH9R3GXgAAQhGU.jpg',
					},
					displayImage: {
						url: 'https://pbs.twimg.com/media/DGH9R3GXgAAQhGU.jpg',
					},
					title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
					description: 'This course provides fundamental concepts in probability and statistical inference',
					startDate: new Date (),
					learnersNumber: 2048,
					spotsLeft: 15
				},
				{
					id: 4,
					background: {
						url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-04BiWEVASGYSPWssT0Y7eTtA0AQjxap_l-mcAS5Wem9sb2z',
					},
					displayImage: {
						url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-04BiWEVASGYSPWssT0Y7eTtA0AQjxap_l-mcAS5Wem9sb2z',
					},
					title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
					description: 'This course provides fundamental concepts in probability and statistical inference',
					startDate: new Date (),
					learnersNumber: 1024,
					spotsLeft: 9
				}
			]
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
						<Carousel data={this.state.carousel}/>
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
