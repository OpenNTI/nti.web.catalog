import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import Carousel from './components/carousel/Carousel';
import GridCard from './components/grid-card/GridCard';
import MenuBar from './components/menu-bar/MenuBar';


class Catalog extends Component {
	constructor (props) {
		super (props);

		this.state = {
			menuData: {
				popularCourses: [
					{
						title: 'Law and Jusice',
						id: 1
					},
					{
						title: 'Chemistry of Beer',
						id: 2
					},
					{
						title: 'Gateway to College Learning',
						id: 3
					},
					{
						title: 'Physical Geology for Scien …',
						id: 4
					},
					{
						title: 'Data Analyitcs',
						id: 5
					},
					{
						title: 'Data Analyitcs',
						id: 5
					}
				],
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
			courses: [
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course1.png',
					courseTitle: 'INTRODUCTION TO WATER',
					courseId: 'STATS 3201',
					author: 'R. DOUGLAS ELMORE, PHD',
					status: {
						type: 'start',
						title: 'STARTS NOV. 23'
					}
				},
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course2.png',
					courseTitle: 'HUMAN PHYSIOLOGY',
					courseId: 'BIOL 2124',
					author: 'R. DOUGLAS ELMORE, PHD',
					status: {
						type: 'enroll',
						title: 'ENROLLED'
					}
				},
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course3.png',
					courseTitle: 'ELEMANTARY BUSINESS STATISTICS',
					courseId: 'ECON 2843',
					author: 'R. DOUGLAS ELMORE, PHD',
					status: {
						type: 'finish',
						title: 'FINISHED 2017'
					}
				},
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course4.jpg',
					courseTitle: 'Gateway to College Learning',
					courseId: 'UCOL 1002',
					author: 'LILEAN MILLER, M.ED.',
					status: {
						type: 'enroll',
						title: 'ENROLLED'
					}
				},
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course5.png',
					courseTitle: 'GARY ENGLAND’S TORNADO ALLEY',
					courseId: 'SS 001',
					author: 'R. DOUGLAS ELMORE, PHD'
				},
				{
					imgUrl: 'http://sv1.upsieutoc.com/2017/10/03/course5.png',
					courseTitle: 'GARY ENGLAND’S TORNADO ALLEY',
					courseId: 'SS 002',
					author: 'R. DOUGLAS ELMORE, PHD'
				}
			]
		};
	}

	render () {
		let self = this;
		return (
			<div>
				<div>
					<section className="carousel">
						<Carousel/>
					</section>
					<section className="content-catalog">
						<MenuBar popular={self.state.menuData.popularCourses} tag={self.state.menuData.tag}/>
						<GridCard data={self.state.courses}/>
					</section>
				</div>
			</div>
		);
	}
}

// Catalog.propTypes = {
// };

export default Catalog;
