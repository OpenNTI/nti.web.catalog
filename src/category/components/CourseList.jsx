import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from '../../grid-card/components/card/Card';

CoursesList.propTypes = {
	courses: PropTypes.array,
};

export default function CoursesList(props) {
	return (
		<div>
			<ul className="course-card">
				{props.courses.map((course, index) => {
					return (
						<li key={index} className="course-block expanse-block">
							<CourseCard course={course} key={index} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
