import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from './card/Card';

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
						let enroll = {};
						try {
							enroll = course.getEnrollmentOptions ();
						} catch (e) {
							enroll = {};
						}
						return (
							<li key={index} className="course-block">
								<CourseCard
									course={course}
									courseTitle={course.Title}
									courseId={course.ProviderUniqueID}
									instructors={course.Instructors}
									enroll={enroll}
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
