import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CourseCard from './card/Card';

export default class GridCard extends Component {
	static propTypes = {
		data: PropTypes.array
	}

	render () {
		// return null if no data
		if (!this.props.data) {
			return null;
		}

		//get 3 courses for each row
		const listCourse = chunk (this.props.data, 3);

		return (
			<div className="content-right">
				{listCourse.map ((item, index) => {
					return (
						<div className="course-card" key={index}>
							{item.map ((course, courseIndex) => {
								return (
									<CourseCard
										imgUrl="http://sv1.upsieutoc.com/2017/10/03/course1.png"
										courseTitle={course.title}
										courseId={course.ProviderDisplayName}
										author={course.Creator}
										status={course.status}
										key={courseIndex}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

function chunk (arr, n) {
	return arr.slice (0, (arr.length + n - 1) / n | 0).map (function (c, i) {
		return arr.slice (n * i, n * i + n);
	});
}
