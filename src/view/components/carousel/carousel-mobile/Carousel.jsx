import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

export default class Carousel extends React.Component {

	static propTypes = {
		data: PropTypes.array,
	};

	render () {
		const items = this.props.data;

		if (!items) {
			return null;
		}

		return (
			<div className="carousel-mobile-block">
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