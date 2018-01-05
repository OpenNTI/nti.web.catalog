import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';
import {encodeForURI} from 'nti-lib-ntiids';

const courseWidth = 325;

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
		if (nextIndex > 120 && index < 2) {
			index += 1;
		}

		if (index === 1) {
			const middle = (window.innerWidth - courseWidth) / 2;
			return middle > 0 ? courseWidth - middle + 20 : courseWidth - 20; //20 is total padding left & right
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
							<a href={`./course/${encodeForURI(course.CourseNTIID)}/info`}>
								<Presentation.Asset contentPackage={course} propName="src" type="landing">
									<img className="image-content"/>
								</Presentation.Asset>
							</a>
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
