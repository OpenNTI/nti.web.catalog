import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from 'nti-web-routing';
import {Loading} from 'nti-web-commons';
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
		const {Items: items} = await service.get(categoryLink);

		const oldItems = this.state.courses;

		this.setState({courses: oldItems.concat(items), loading:false});
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

	componentDidMount () {
		window.scrollTo(0, 0);
		this.setState({courses :this.props.category.Items, title: this.props.category.Name});
		if(this.props.category.Total < Constants.BATCH_SIZE) {
			this.setState({noMore: true});
		}
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const link = {action: 'back'};
		return (
			<div>
				{!this.props.other && (
					<div className="categories-banner red">
						<div className="category-text-wrapper">
							<div className="categories-back">
								<LinkTo.Object object={link} context="catalog">
									<a className="icon-chevron-left"/>
									<a className="back-btn">Back</a>
								</LinkTo.Object>
							</div>
							<p className="categories-title">{category.title === '.nti_other' ? 'Others' : category.title}</p>
						</div>
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
