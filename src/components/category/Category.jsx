import React from 'react';
import PropTypes from 'prop-types';
import {getService} from 'nti-web-client';

import CourseCard from '../grid-card/card/Card';
import * as Actions from '../../Actions';

export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object
	}

	async componentDidMount () {
		const service = await getService();
		const parse = x => service.getObject (x);
		const courses = await Promise.all (this.props.category.Items.map (parse));

		this.setState({courses :courses});
	}

	viewCategory = () =>{
		Actions.viewCategory(this.props.category.Name);
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const courses = category.courses.slice(0, 4) || [];
		const title = this.props.category.Name === '.nti_other' ? 'Other' : this.props.category.Name;
		return (
			<div>
				<div className="">
					<div className="">{title}</div>
					<div className="">
						<a onClick={this.viewCategory}>View All</a>
						<a className="icon-chevron-right"/>
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