import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';
import {LinkTo} from 'nti-web-routing';

const courseWidth = window.innerWidth * 0.8;

export default class Carousel extends React.Component {

	static propTypes = {
		data: PropTypes.array,
	};

	attachRef = el => this.el = el

	scrollCarousel = (e) => {
		e.persist();
		const currentPos = e.currentTarget.scrollLeft;
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => {
			this.timeout = null;
			const swipePosition = this.getSwipePosition(currentPos);
			this.el.scrollLeft = swipePosition;
		}, 300);
	}

	getSwipePosition (pos) {
		let index = parseInt((pos / courseWidth), 10);
		const nextIndex = parseInt((pos % courseWidth), 10);
		if (nextIndex > (courseWidth * 0.25) && index < 2) { // if over 1/4 next item, auto swap next item
			index += 1;
		}

		if (index === 1) {
			const ratio = courseWidth > 400 ? 0.96 : 0.98;
			const middle = (window.innerWidth - courseWidth) / 2;
			return (courseWidth * ratio) - middle;
		}

		return (index * courseWidth) + (index * 10);
	}

	render () {
		const items = this.props.data;

		if (!items) {
			return null;
		}

		return (
			<div className="carousel-mobile-block" onScroll={this.scrollCarousel} ref={this.attachRef}>
				{items.map((course, index) =>{
					const instructors = course.Instructors ? course.Instructors.map(instructor => {
						return instructor.Name;
					}).join(', ') : '';
					return(
						<div key={index} className="feature-course">
							<LinkTo.Object object={course}>
								<Presentation.Asset contentPackage={course} propName="src" type="landing">
									<img className="image-content"/>
								</Presentation.Asset>
							</LinkTo.Object>
							<div className="course-id">{course.ProviderUniqueID}</div>
							<div className="course-title">{course.Title}</div>
							<div className="course-instructor">{instructors}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
