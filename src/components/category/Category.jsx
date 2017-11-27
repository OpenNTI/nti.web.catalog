import React from 'react';
import PropTypes from 'prop-types';
import {getService} from 'nti-web-client';

import CourseCard from '../grid-card/card/Card';
import * as Actions from '../../Actions';

export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		link :PropTypes.string
	}

	async componentDidMount () {
		const service = await getService();
		const parse = x => service.getObject (x);
		const courses = await Promise.all (this.props.category.Items.map (parse));

		this.setState({courses :courses});
	}

	viewCategory = () =>{
		const link = this.props.link + '/' + this.props.category.Name;
		Actions.viewCategory(link);
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const courses = category.courses.slice(0, 4) || [];
		const title = this.props.category.Name === '.nti_other' ? 'Others' : this.props.category.Name;
		return (
			<div>
				<div className="title-viewAll">
					<div className="title-category">{title}</div>
					<div className="view-all">
						<a onClick={this.viewCategory}>View All</a>
						<span className="icon-chevronup-25"/>
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
