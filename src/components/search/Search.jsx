import React from 'react';
import PropTypes from 'prop-types';

import * as Actions from '../../Actions';

export default class Search extends React.Component {
	static propTypes = {
		data: PropTypes.object
	}

	viewAllCourse = () => {
		Actions.viewAllCourses();
	}

	render () {
		if (this.props.data && this.props.data.term) {
			let term = '"' + this.props.data.term + '"';
			return (
				<div className="search-result">
					<a className="icon-chevron-left" onClick={this.viewAllCourse}>View all courses</a>
					<p>Result for {term}</p>
				</div>
			);
		}

		return null;
	}
}
