import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GridCard from '../grid-card/GridCard';
import * as Actions from '../../Actions';

export default class Search extends React.Component {
	static propTypes = {
		data: PropTypes.object
	}

	viewAllCourse = () => {
		Actions.viewAllCourses ();
	}

	render () {
		let term = '""';
		let courses = [];
		if (this.props.data && this.props.data.term) {
			term = '"' + this.props.data.term + '"';
			if (this.props.data.courses) {
				courses = filterCourse(this.props.data.courses, this.props.data.term);
			}
		}
		return (
			<div>
				<div className="search-block">
					<div className="search-result">
						<a className="icon-chevron-left"/>
						<a onClick={this.viewAllCourse}>View all courses</a>
						<p>Result for {term}</p>
					</div>
				</div>		
				<div className="content-catalog no-sidebar">
					<GridCard data={courses}/>
				</div>
			</div>

		);

	}
}

function filterCourse (courses, term) {
	let results = _.filter (courses,(item) => {
		const title = item.title.toUpperCase();
		term = term.toUpperCase();
		return title.indexOf (term) > -1;
	});
	return results;
}
