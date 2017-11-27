import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';

import * as Actions from '../../../Actions';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		categories: PropTypes.array,
		link: PropTypes.string
	}

	viewCategory = (name) => () =>{
		const link = this.props.link + '/' + name;
		Actions.viewCategory(link);
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
							<li key={index} className="categories-block" onClick={this.viewCategory(course.Name)}>
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
