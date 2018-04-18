import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';
import {Layouts} from '@nti/web-commons';

import CoursesList from './CourseList';

const {Responsive} = Layouts;
export default class Category extends React.Component {
	static propTypes = {
		category: PropTypes.object,
		link :PropTypes.string
	}

	render () {
		const category = this.props.category;

		if (!category) {
			return null;
		}

		const courses = category.Items.slice(0, 4) || [];
		const coursesMobile = category.Items.slice(0, 3) || [];
		const title = this.props.category.Name === '.nti_other' ? 'Others' : this.props.category.Name;
		return (
			<div>
				<div className="title-view-all">
					<div className="title-category">{title}</div>
					<div className="view-all">
						<LinkTo.Object object={this.props.category} context="catalog.categories">
							<a>View All</a>
							<span className="icon-chevronup-25"/>
						</LinkTo.Object>
					</div>
				</div>
				<div>
					<Responsive.Item query={Responsive.isMobile} component={CoursesList}  courses={coursesMobile}/>
					<Responsive.Item query={Responsive.isDesktop} component={CoursesList} courses={courses}/>
					<Responsive.Item query={Responsive.isTablet} component={CoursesList} courses={courses}/>
				</div>
			</div>
		);
	}
}
