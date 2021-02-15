import './CategoryDetail.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Loading } from '@nti/web-commons';
import { getService } from '@nti/web-client';

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
		isSearchPurchased: PropTypes.bool,
	};

	state = {};

	loadMore = async () => {
		const {
			props: { category },
			state: { courses: coursesFromState = [], batch = category },
		} = this;

		if (!batch || !batch.hasLink || !batch.hasLink('batch-next')) {
			return;
		}

		let error,
			next = batch,
			courses = coursesFromState;

		this.setState({
			loading: true,
			error,
		});

		try {
			next = await getService().then(service =>
				service.getBatch(batch.getLink('batch-next'))
			);

			courses = [...courses, ...next.Items];
		} catch (e) {
			error = e;
		}

		this.setState({
			loading: false,
			error,
			batch: next,
			courses,
		});
	};

	hasMore() {
		const {
			props: { category = {} },
			state: { batch = category, courses = [] },
		} = this;

		const { Total: total, FilteredTotalItemCount: count = total } = batch;

		return (
			count > Constants.BATCH_SIZE &&
			count > courses.length &&
			batch.hasLink &&
			batch.hasLink('batch-next')
		);
	}

	componentDidMount() {
		const { category: { Items: courses, Name: title } = {} } = this.props;

		this.setState({
			courses,
			title,
		});
	}

	render() {
		const { title, courses, loading, error } = this.state;

		if (!courses && !error) {
			return null;
		}

		const link = { action: 'back' };
		const categoryClassName =
			'categories-banner ' + Utils.getGradientClass(title);
		const banner =
			!this.props.purchased && !this.props.other && !this.props.search;
		return (
			<div>
				{banner && (
					<div className={categoryClassName}>
						<div className="category-text-wrapper">
							<div className="categories-back">
								<LinkTo.Object object={link} context="catalog">
									<span className="icon-chevron-left" />
									<span className="back-btn">Back</span>
								</LinkTo.Object>
							</div>
							<p className="categories-title">
								{title === '.nti_other' ? 'Others' : title}
							</p>
						</div>
					</div>
				)}
				<div className="content-catalog no-sidebar">
					<ul className="course-card">
						{courses.map((course, index) => {
							return (
								<li
									key={index}
									className="course-block category-detail"
								>
									<CourseCard course={course} key={index} />
								</li>
							);
						})}
					</ul>
				</div>

				{this.hasMore() && (
					<div className="categories-more">
						{loading && (
							<div className="category-loading">
								<Loading.Mask />
							</div>
						)}
						<a onClick={this.loadMore}>View More</a>
					</div>
				)}
			</div>
		);
	}
}
