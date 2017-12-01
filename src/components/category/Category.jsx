import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from 'nti-web-routing';

import CourseCard from '../grid-card/card/Card';

export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		link :PropTypes.string
	}

	render () {
		const category = this.props.category;

		if (!category) {
			return null;
		}

		const courses = category.Items.slice(0, 4) || [];
		const title = this.props.category.Name === '.nti_other' ? 'Others' : this.props.category.Name;
		return (
			<div>
				<div className="title-view-all">
					<div className="title-category">{title}</div>
					<div className="view-all">
						<LinkTo.Object object={this.props.category} context="catalog.categories">
							<a>View All</a>
							<span className="icon-chevronup-25"/>
						</LinkTo.Object>
					</div>
				</div>
				<div>
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
