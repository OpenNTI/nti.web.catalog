import React from 'react';
import PropTypes from 'prop-types';
import {getService} from 'nti-web-client';

import GridCard from '../grid-card/GridCard';
import * as Actions from '../../Actions';
import * as Constants from '../../Constants';

export default class Search extends React.Component {
	static propTypes = {
		data: PropTypes.object
	}

	viewAllCourse = () => {
		Actions.viewAllCourses();
	}

	async componentDidMount () {
		window.scrollTo(0, 0);
		if(this.props.data.courses && this.props.data.courses.Items){
			const service = await getService();
			const parse = x => service.getObject (x);
			const items = this.props.data.courses.Items || [];
			const courses = await Promise.all (items.map (parse));

			this.setState({courses :courses});
		}
		else {
			this.setState({courses:this.props.data.courses});
		}

	}

	render () {
		const search = this.state;
		if(!search){
			return null;
		}

		let term = '""';
		let courses = [];
		if (this.props.data && this.props.data.term) {
			term = '"' + this.props.data.term + '"';
			if (search.courses) {
				courses = filterCourse(search.courses, this.props.data.term);
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
					<GridCard courses={courses} type ={Constants.SEARCH}/>
				</div>
			</div>

		);

	}
}

function filterCourse (courses, term) {
	return courses.filter(item => {
		const title = item.title ? item.title.toUpperCase() : '';
		const id = item.ProviderUniqueID ? item.ProviderUniqueID.toUpperCase() : '';
		term = term.toUpperCase();

		const instructors = item.Instructors ? item.Instructors.map(instructor => {
			return instructor.Name;
		}).join(', ').toUpperCase() : '';


		if (instructors.indexOf(term) > -1) {
			return true;
		}

		if (title.indexOf(term) > -1) {
			return true;
		}

		return id.indexOf(term) > -1;
	});
}
