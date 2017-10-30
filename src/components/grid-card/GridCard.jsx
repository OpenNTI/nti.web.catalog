import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from './card/Card';

const imagesUrl = [
	'http://sv1.upsieutoc.com/2017/10/03/course1.png',
	'http://sv1.upsieutoc.com/2017/10/03/course2.png',
	'http://sv1.upsieutoc.com/2017/10/03/course3.png',
	'http://sv1.upsieutoc.com/2017/10/03/course4.jpg',
	'http://sv1.upsieutoc.com/2017/10/03/course5.png'
];

export default class GridCard extends React.Component {
	static propTypes = {
		data: PropTypes.array
	}

	render () {
		// return null if no data
		if (!this.props.data) {
			return null;
		}

		return (
			<div className="content-right">
				<ul className="course-card">
					{this.props.data.map ((course, index) => {
						return (
							<li key={index} className="course-block">
								<CourseCard
									imgUrl={imagesUrl[(index + 1) % 5]}
									courseTitle={course.title}
									courseId={course.ProviderDisplayName}
									author={course.Creator}
									enroll={course.EnrollmentOptions.Items}
									ntiid={course.NTIID}
									startDate={course.StartDate}
									endDate={course.EndDate}
									key={index}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
