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
		const enrollmentOptions = this.props.course.getEnrollmentOptions();
		const enrolled = enrollmentOptions && enrollmentOptions.Items && enrollmentOptions.Items.OpenEnrollment &&
			enrollmentOptions.Items.OpenEnrollment.enrolled;

		const status = checkStatus (this.props.course.StartDate, this.props.course.EndDate);
		let statusClass = status;
		if (enrolled) {
			statusClass = status + ' right';
		}

		const instructors = this.props.course.Instructors ? this.props.course.Instructors.map(instructor => {
			return instructor.Name;
		}).join(', ') : '';

		return (
			<a href={`./object/${encodeForURI(this.props.course.NTIID)}`}>
				<div className="course-panel">
					<figure>
						<Presentation.Asset contentPackage={this.props.course} propName="src" type="landing">
							<img />
						</Presentation.Asset>
					</figure>
					<div className="info-course">
						<span>{this.props.course.ProviderUniqueID}</span>
						<div className="course-title">{this.props.course.Title}</div>
						<p>{instructors}</p>
					</div>
					{enrolled && (
						<div className="stamp"><span className="enroll">ENROLLED</span></div>)}
					{status === 'start' && (
						<div className="stamp">
							<span className={statusClass}>Starts <DateTime date={this.props.course.StartDate} format="ll"/></span>
						</div>)}
					{status === 'finish' && (
						<div className="stamp">
							<span className={statusClass}>Finished <DateTime date={this.props.course.EndDate} format="ll"/></span>
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
