import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from 'nti-web-routing';



export default class CategoryDetail extends React.Component {
	static propTypes = {
		categories: PropTypes.array,
		link: PropTypes.string
	}
	render () {
		if (!this.props.categories) {
			return null;
		}

		return (
			<div>
				<ul className="course-card">
					{this.props.categories.map ((course, index) => {
						return (

							<li key={index} className="categories-block red">
								<LinkTo.Object object={course} context="catalog.categories">
									<span className="category-collapse">{course.Name === '.nti_other' ? 'Others' : course.Name}</span>
								</LinkTo.Object>

							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
