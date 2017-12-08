import React from 'react';
import PropTypes from 'prop-types';

import Category from '../../category/components/Category';
import CategoryDetail from '../../category/category-detail/components/CategoryDetail';
import CategoryCollapse from '../../category/components/category-collapse/CategoryCollapse';
import * as Constants from '../../Constants';

import CourseCard from './card/Card';


export default class GridCard extends React.Component {
	static propTypes = {
		courses: PropTypes.array,
		category: PropTypes.object,
		type: PropTypes.string,
		other: PropTypes.bool,
		link: PropTypes.string,
		search: PropTypes.string
	}

	render () {

		if (this.props.type === Constants.CATEGORIES) {
			const link = this.props.link;
			const categories = convertItems(this.props.courses);
			return (
				<div className="content-right">
					<ul>
						{categories.expanseItems.map((category, index) => {
							return (
								<li key={index} className="category-block">
									<Category
										category={category}
										key={index}
										link={link}
									/>
								</li>
							);

						})}
					</ul>
					<div>
						<CategoryCollapse categories={categories.collapseItems} link={link}/>
					</div>
					{categories.otherItems && categories.otherItems.ItemCount >= 4 && (
						<ul>
							<li className="category-block">
								<Category
									category={categories.otherItems}
									link={link}
								/>
							</li>
						</ul>
					)}
				</div>
			);
		}
		else if (this.props.type === Constants.CATEGORY) {
			return (
				<div>
					<CategoryDetail category={this.props.category} other={this.props.other} link={this.props.link}/>
				</div>
			);
		}

		else if(this.props.type === Constants.SEARCH) {
			const courses = {
				Items: this.props.courses,
				Total: this.props.courses.length
			};
			return (
				<div>
					<CategoryDetail category={courses} search={this.props.search}/>
				</div>
			);
		}

		else if (this.props.type === Constants.PURCHASED) {
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

function convertItems (items) {
	let result = {
		collapseItems: [],
		expanseItems: []
	};

	let otherItems = null;

	items.map(item => {
		if (item.ItemCount < 4 && item.Name !== '.nti_other') {
			result.collapseItems.push(item);

		}
		else {
			if (item.Name === '.nti_other') {
				otherItems = item;
			}
			else {
				result.expanseItems.push(item);
			}
		}
	});

	if (otherItems) {
		result.otherItems = otherItems;
	}

	return result;
}
