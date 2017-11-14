import React from 'react';
import PropTypes from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';
import {DateTime, Presentation} from 'nti-web-commons';

export default class CourseCard extends React.Component {
	static propTypes = {
		courseId: PropTypes.string,
		courseTitle: PropTypes.string,
		enroll: PropTypes.object,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		ntiid: PropTypes.string,
		course: PropTypes.object,
		instructors: PropTypes.array
	}

	render () {
		const enroll = this.props.enroll && this.props.enroll.Items && this.props.enroll.Items.OpenEnrollment &&
			this.props.enroll.Items.OpenEnrollment.enrolled;

		const status = checkStatus (this.props.startDate, this.props.endDate);
		let statusClass = status;
		if (enroll) {
			statusClass = status + ' right';
		}

		let instructors = '';
		if(this.props.instructors && this.props.instructors.length !== 0){
			this.props.instructors.map((instructor, i) => {
				if (i !== 0) {
					instructors = instructors + ', ';
				}
				if (instructor.Name) {
					instructors = instructors + instructor.Name;
				}
			});
		}
		return (
			<a href={`./object/${encodeForURI(this.props.ntiid)}`}>
				<div className="course-panel">
					<figure>
						<Presentation.Asset contentPackage={this.props.course} propName="src" type="landing">
							<img />
						</Presentation.Asset>
					</figure>
					<div className="info-course"><span>{this.props.courseId}</span>
						<h3>{this.props.courseTitle}</h3>
						<p>{instructors}</p>
					</div>
					{enroll && (
						<div className="stamp"><span className="enroll">ENROLLED</span></div>)}
					{status === 'start' && (
						<div className="stamp">
							<span className={statusClass}>Starts <DateTime date={this.props.startDate} format="ll"/></span>
						</div>)}
					{status === 'finish' && (
						<div className="stamp">
							<span className={statusClass}>Finished <DateTime date={this.props.endDate} format="ll"/></span>
						</div>)}
				</div>
			</a>
		);
	}
}

function checkStatus (startDate, endDate) {
	let status = '';
	const currentTime = new Date ().getTime ();
	const startTime = new Date (startDate).getTime ();
	const endTime = new Date (endDate).getTime ();
	if (currentTime < startTime) {
		status = 'start';
	}
	if (startTime <= endTime && endTime < currentTime && endTime !== 0) {
		status = 'finish';

	}
	return status;
}
