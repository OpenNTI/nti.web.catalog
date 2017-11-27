import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		categories: PropTypes.array
	}

	render () {
		if (!this.props.categories) {
			return null;
		}
		const backgroundStyle = {'backgroundSize': 'cover', 'height' :'80px'};
		return (
			<div>
				<ul className="course-card">
					{this.props.categories.map ((course, index) => {
						return (
							<li key={index} className="categories-block">
								<Presentation.AssetBackground type="background" contentPackage={course} style={backgroundStyle}>
									<div
										className="category-collapse">{course.Name === '.nti_other' ? 'Other' : course.Name}</div>
								</Presentation.AssetBackground>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
