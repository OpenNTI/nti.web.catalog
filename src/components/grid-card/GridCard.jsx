import React from 'react';
import PropTypes from 'prop-types';

import Category from '../category/Category';
import CategoryDetail from '../category/category-detail/CategoryDetail';
import * as Constants from '../../Constants';

import CourseCard from './card/Card';


export default class GridCard extends React.Component {
	static propTypes = {
		courses: PropTypes.array,
		category: PropTypes.object,
		type: PropTypes.string,
		link: PropTypes.string
	}

	render () {

		if (this.props.type === Constants.CATEGORIES) {
			const link = this.props.link;
			return (
				<div className="content-right">
					<ul>
						{this.props.courses.map((category, index) => {
							if (category.Name !== '.nti_other') {
								return (
									<li key={index} className="category-block">
										<Category
											category={category}
											key={index}
											link={link}
										/>
									</li>
								);
							}

						})}
					</ul>
				</div>
			);
		}
		else if (this.props.type === Constants.CATEGORY) {
			return (
				<div>
					<CategoryDetail category={this.props.category}/>
				</div>
			);
		}

		else if (this.props.type === Constants.PURCHASED || this.props.type === Constants.SEARCH) {
			return (
				<div className="content-right">
					<ul className="course-card">
						{this.props.courses.map ((course, index) => {
							return (
								<li key={index} className="course-block">
									<CourseCard
										course={course}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}

		return null;

	}
}
