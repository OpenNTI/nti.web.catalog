import React from 'react';
import PropType from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';

export default class CourseCard extends React.Component {
	static propTypes = {
		imgUrl: PropType.string,
		courseId: PropType.string,
		courseTitle: PropType.string,
		author: PropType.string,
		status: PropType.shape ({
			OpenEnrollment: PropType.object
		}),
		ntiid: PropType.string
	}

	showDetail = () => {
		const detailLink = `./object/${encodeForURI (this.props.ntiid)}`;
		window.open (detailLink, '_self');
	}

	render () {
		const status = this.props.status && this.props.status.OpenEnrollment &&
			this.props.status.OpenEnrollment.IsEnrolled;

		return (
			<div className="course-panel" onClick={this.showDetail}>
				<figure>
					<img alt="course" src={this.props.imgUrl}/>
				</figure>
				<div className="info-course"><span>{this.props.courseId}</span>
					<h3>{this.props.courseTitle}</h3>
					<a>{this.props.author}</a>
				</div>
				{status && (
					<div className="stamp"><a className="enroll">ENROLLED</a></div>)}
			</div>
		);
	}
}
