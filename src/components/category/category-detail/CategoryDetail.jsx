import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';
import {getService} from 'nti-web-client';

import * as Actions from '../../../Actions';
import CourseCard from '../../grid-card/card/Card';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		category: PropTypes.object
	}

	backToCategories = () =>{
		Actions.backToCategories();
	}

	async componentDidMount () {
		window.scrollTo(0, 0);
		const service = await getService();
		const parse = x => service.getObject (x);
		const items = this.props.category.data.Items[0].Items || [];
		const courses = await Promise.all (items.map (parse));

		this.setState({courses :courses});
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const backgroundStyle = {'backgroundSize': 'cover', 'height': '300px;'};
		return (
			<div>
				<div className="categories-banner">
					<Presentation.AssetBackground type="background" contentPackage={this.props.category} style={backgroundStyle}>
						<div className="categories-back" onClick={this.backToCategories}>
							<a className="icon-chevron-left"/>
							<a>Back</a>
						</div>
						<p className="categories-title">Title</p>
					</Presentation.AssetBackground>
				</div>
				<div className="content-catalog no-sidebar">
					<ul className="course-card">
						{category.courses.map ((course, index) => {
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
