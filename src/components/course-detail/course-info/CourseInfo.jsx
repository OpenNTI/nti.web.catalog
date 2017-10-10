import React, {Component} from 'react';

class CourseInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let self = this;
		return (
			<div>
				<div className="status-course">
					<p className="title">{self.props.info.title}</p>
					<p className="status">{self.props.info.status}</p>
				</div>
				<div className="detail-course">
					<p>{self.props.info.detail}</p>
				</div>
				<div className="add-course"><a>Add Archived Course</a></div>
			</div>
		);
	}
}

export default CourseInfo;
