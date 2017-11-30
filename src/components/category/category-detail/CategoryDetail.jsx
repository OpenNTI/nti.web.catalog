import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from 'nti-web-routing';
import {Presentation, Loading} from 'nti-web-commons';
import {getService} from 'nti-web-client';
import {URL} from 'nti-commons';

import CourseCard from '../../grid-card/card/Card';
import * as Constants from '../../../Constants';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		other: PropTypes.bool,
		link: PropTypes.string
	}

	async getCourses (link) {
		const currentItems = this.state.courses.length || 0;
		const categoryLink = URL.appendQueryParams(link, {batchStart: currentItems, batchSize: Constants.BATCH_SIZE});

		const service = await getService();
		const items = await service.get(categoryLink);


		const parse = x => service.getObject (x);
		const courses = await Promise.all (items.Items.map (parse));

		const oldItems = this.state.courses;

		this.setState({courses: oldItems.concat(courses), loading:false});
		if(this.props.category.Total === this.state.courses.length) {
			this.setState({noMore: true});
		}
	}

	loadMore = () =>{
		this.setState({loading:true});
		let link = this.props.link || this.props.category.link;
		link = link + '/' + this.props.category.Name;
		this.getCourses(link);
	}

	async componentDidMount () {
		window.scrollTo(0, 0);
		this.service = await getService();
		const parse = x => this.service.getObject (x);
		const items = this.props.category.Items || [];
		const title = this.props.category.Name || '';
		let courses = await Promise.all (items.map (parse));
		if (this.props.other) {
			courses = courses.slice(0, Constants.BATCH_SIZE);
		}
		this.setState({courses :courses, title: title});
		if(this.props.category.Total === courses.length) {
			this.setState({noMore: true});
		}
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const backgroundStyle = {'backgroundSize': 'cover', 'height': '300px'};
		const link = {action: 'back'};
		return (
			<div>
				{!this.props.other && (
					<div className="categories-banner">
						<Presentation.AssetBackground type="background" contentPackage={this.props.category} style={backgroundStyle}>
							<div className="category-text-wrapper">

								<div className="categories-back">
									<LinkTo.Object object={link} context="catalog">
										<a className="icon-chevron-left"/>
										<a className="back-btn">Back</a>
									</LinkTo.Object>
								</div>
								<p className="categories-title">{category.title === '.nti_other' ? 'Others' : category.title}</p>
							</div>
						</Presentation.AssetBackground>
					</div>
				)}
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

				{!category.noMore  && (
					<div className="categories-more">
						{category.loading && (
							<div className="category-loading">
								<Loading.Mask/>
							</div>
						)}
						<a onClick={this.loadMore}>View More</a>
					</div>
				)}
			</div>
		);
	}
}
