import React from 'react';
import PropTypes from 'prop-types';

import CourseCard from '../card/Card';

export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object
	}


	render () {

		const courses = this.props.category.slice(0,4) || [];
		return (
			<div>
				<div className="">
					<div className="">Music</div>
					<div className="">View all</div>
				</div>
				<div className="">
					<ul className="course-card">
						{courses.map ((course, index) => {
							return (
								<li key={index} className="course-block">
									<CourseCard
										course={course}
										key={index}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
