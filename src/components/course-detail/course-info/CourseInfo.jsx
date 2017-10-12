import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CourseInfo extends Component {
	static propTypes = {
		info: PropTypes.shape ({
			title: PropTypes.string,
			status: PropTypes.string,
			detail: PropTypes.string
		})
	}

	render () {
		return (
			<div>
				<div className="status-course">
					<p className="title">{this.props.info.title}</p>
					<p className="status">{this.props.info.status}</p>
				</div>
				<div className="detail-course">
					<p>{this.props.info.detail}</p>
				</div>
				<div className="add-course"><a>Add Archived Course</a></div>
			</div>
		);
	}
}
