import React from 'react';
import PropTypes from 'prop-types';
// import {getService} from 'nti-web-client';

import CourseCard from '../card/Card';

export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object
	}

	// async componentDidMount () {
	// 	const service = await getService();
	// 	const parse = x => service.getObject (x);
	// 	const courses = await Promise.all (this.props.category.Items.map (parse));

	// 	this.setState({courses :courses});
	// }

	render () {
		// const category = this.state;
		// if (!category) {
		// 	return null;
		// }

		const courses = this.props.category.slice(0,4) || [];
		return (
			<div>
				<div className="category-header">
					<div className="category-title">Music</div>
					<div className="category-view-all">View all</div>
				</div>
				<div className="category-content">
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
