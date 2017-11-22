import React from 'react';
import PropTypes from 'prop-types';

import Category from './category/Category';

export default class GridCard extends React.Component {
	static propTypes = {
		data: PropTypes.array
	}

	render () {
		// return null if no data
		if (!this.props.data) {
			return null;
		}

		return (
			<div className="content-right">
				<ul className="category">
					<li className="category-block">
						<Category
							category={this.props.data}
						/>
					</li>
					<li className="category-block">
						<Category
							category={this.props.data}
						/>
					</li>
				</ul>
			</div>
		);
	}
}
