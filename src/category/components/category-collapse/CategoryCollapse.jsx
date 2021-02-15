import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Text } from '@nti/web-commons';

import * as Utils from '../../../utils';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		categories: PropTypes.array,
		link: PropTypes.string,
	};
	render() {
		if (!this.props.categories) {
			return null;
		}

		return (
			<div>
				<div className="categories-block-title">Top Categories</div>
				<ul className="course-card">
					{this.props.categories.map((course, index) => {
						const categoryClassName =
							'categories-block ' +
							Utils.getGradientClass(course.Name);
						return (
							<li key={index} className={categoryClassName}>
								<LinkTo.Object
									object={course}
									className="category-link"
									context="catalog.categories"
								>
									<Text
										className="category-collapse"
										limitLines={2}
										overflow={Text.Overflow.Ellipsis}
									>
										{course.Name === '.nti_other'
											? 'OTHERS'
											: course.Name}
									</Text>
								</LinkTo.Object>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
