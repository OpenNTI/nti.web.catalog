import React from 'react';
import PropTypes from 'prop-types';
import {Presentation} from 'nti-web-commons';
import {getService} from 'nti-web-client';

import * as Actions from '../../../Actions';
import CourseCard from '../../grid-card/card/Card';

const numItems = 8;
export default class CategoryDetail extends React.Component {
	static propTypes = {
		category: PropTypes.object
	}

	backToCategories = () =>{
		Actions.backToCategories();
	}

	async converEntry (item) {
		const parse = x => this.service.getObject (x);
		const courses = await Promise.all (item.map (parse));
		const oldItems = this.state.courses;
		this.setState({courses: oldItems.concat(courses)});
		if(this.props.category.data.Total === this.state.courses.length) {
			this.setState({noMore: true});
		}
	}

	loadMore = () =>{
		const currentItems = this.state.courses.length;
		let link = this.props.category.data.href.split('?')[0];
		link = link + '?batchStart=' + currentItems + '&batchSize=' + numItems;
		this.service.get(link).then(item =>{
			this.converEntry(item.Items);
		});
	}

	async componentDidMount () {
		window.scrollTo(0, 0);
		this.service = await getService();
		const parse = x => this.service.getObject (x);
		const items = this.props.category.data.Items || [];
		const title = this.props.category.data.Name || '';
		const courses = await Promise.all (items.map (parse));
		this.setState({courses :courses, title: title});
		if(this.props.category.data.Total === courses.length) {
			this.setState({noMore: true});
		}
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const backgroundStyle = {'backgroundSize': 'cover', 'height': '300px'};
		return (
			<div>
				<div className="categories-banner">
					<Presentation.AssetBackground type="background" contentPackage={this.props.category} style={backgroundStyle}>
						<div className="category-text-wrapper">
							<div className="categories-back" onClick={this.backToCategories}>
								<a className="icon-chevron-left"/>
								<a className="back-btn">Back</a>
							</div>
							<p className="categories-title">{category.title === '.nti_other' ? 'Others' : category.title}</p>
						</div>
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
				{!category.noMore && (
					<div className="categories-more">
						<a onClick={this.loadMore}>View More</a>
					</div>
				)}
			</div>
		);
	}
}
