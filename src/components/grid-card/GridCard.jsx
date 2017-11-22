import React from 'react';
import PropTypes from 'prop-types';

import Category from '../category/Category';
import CategoryDetail from '../category/category-detail/CategoryDetail';
import * as Constants from '../../Constants';

export default class GridCard extends React.Component {
	static propTypes = {
		categories: PropTypes.array,
		category: PropTypes.object,
		type: PropTypes.string
	}

	render () {

		if (this.props.type === Constants.CATEGORIES) {
			let categories = [], otherTag = {}, emptyTag = [];
			this.props.categories.map(category => {
				if (category.Items.length === 0) {
					emptyTag.push(category);
				}
				else if (category.Name === '.nti_other') {
					otherTag = category;
				}
				else {
					categories.push(category);
				}
			});

			categories.push(otherTag);
			categories = categories.concat(emptyTag);

			return (
				<div className="content-right">
					<ul>
						{categories.map ((category, index) => {
							return (
								<li key={index} className="category-block">
									<Category
										category={category}
										key={index}
									/>
								</li>
							);
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

		return null;

	}
}
