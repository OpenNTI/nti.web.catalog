import React from 'react';
import PropTypes from 'prop-types';
import GridCard from '../grid-card/GridCard';

import * as Actions from '../../Actions';

export default class Search extends React.Component {
	static propTypes = {
		data: PropTypes.object
	}

	viewAllCourse = () => {
		Actions.viewAllCourses();
	}

	render () {
		let term = '""';
		if(this.props.data && this.props.data.term){
			term = '"' + this.props.data.term + '"';
		}

		let courses = [];
		if(this.props.data && this.props.data.courses){
			courses = this.props.data.courses;
		}

		return (
			<div>
				<div className="search-result">
					<a className="icon-chevron-left" onClick={this.viewAllCourse}>View all courses</a>
					<p>Result for {term}</p>
				</div>
				<div className="content-catalog no-sidebar">
					<GridCard data={courses}/>
				</div>
			</div>

		);

	}
}
