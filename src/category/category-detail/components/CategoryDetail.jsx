import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';
import {Loading} from '@nti/web-commons';
import {getService} from '@nti/web-client';

import CourseCard from '../../../grid-card/components/card/Card';
import * as Constants from '../../../Constants';
import * as Utils from '../../../utils';

export default class CategoryDetail extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		other: PropTypes.bool,
		link: PropTypes.string,
		search: PropTypes.string,
		purchased: PropTypes.bool,
		isSearchPurchased: PropTypes.bool
	}

	async getCourses (link) {
		const currentItems = this.state.courses.length || 0;
		const service = await getService();
		let items = {Items: []};

		if(this.props.search) {
			items = await service.getBatch(link, {batchSize: Constants.BATCH_SIZE, batchStart: currentItems, filter: this.props.search});
		}

		else {
			items = await service.getBatch(link, {batchSize: Constants.BATCH_SIZE, batchStart: currentItems,});
		}

		const oldItems = this.state.courses;

		this.setState({courses: oldItems.concat(items.Items), loading: false});
		if (items.Total === this.state.courses.length || items.Total <= Constants.BATCH_SIZE) {
			this.setState({noMore: true});
		}
	}

	loadMore = () => {
		this.setState({loading: true});
		let link = this.props.link || this.props.category.link;
		if (this.props.category.Name) {
			link = link + '/' + this.props.category.Name;
		}
		this.getCourses(link);
	}

	componentDidMount () {
		this.setState({courses :this.props.category.Items, title: this.props.category.Name});

		const {category} = this.props;
		const count = category.FilteredTotalItemCount != null ? category.FilteredTotalItemCount : category.Total;

		if(count <= Constants.BATCH_SIZE || !category.hasLink('batch-next')) {
			this.setState({noMore: true});
		}
	}

	render () {
		const category = this.state;

		if (!category) {
			return null;
		}

		const link = {action: 'back'};
		const categoryClassName = 'categories-banner ' + Utils.getGradientClass(category.title);
		const banner = !this.props.purchased && !this.props.other && !this.props.search;
		return (
			<div>
				{banner && (
					<div className={categoryClassName}>
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
								<li key={index} className="course-block category-detail">
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
