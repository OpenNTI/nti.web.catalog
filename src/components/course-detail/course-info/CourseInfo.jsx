import React from 'react';
import PropTypes from 'prop-types';

CourseInfo.propTypes = {
	info: PropTypes.shape ({
		title: PropTypes.string,
		status: PropTypes.string,
		detail: PropTypes.string
	})
};

export default function CourseInfo (course) {
	return (
		<div>
			<div className="status-course">
				<p className="title">{course.info.title}</p>
				<p className="status">{course.info.status}</p>
			</div>
			<div className="detail-course">
				<p>{course.info.detail}</p>
			</div>
			<div className="add-course"><a>Add Archived Course</a></div>
		</div>
	);
}
