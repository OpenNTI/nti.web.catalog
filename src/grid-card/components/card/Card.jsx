import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Presentation, Layouts} from 'nti-web-commons';
import {encodeForURI} from 'nti-lib-ntiids';

const {Responsive} = Layouts;

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
		const isMobile = Responsive.isMobile();
		const enrolled = this.props.course.IsEnrolled;

		const status = checkStatus (this.props.course.StartDate, this.props.course.EndDate);
		let statusClass = status;
		if (enrolled) {
			statusClass = status + ' right';
		}

		const isAdmin = this.props.course.IsAdmin;

		const instructors = this.props.course.Instructors ? this.props.course.Instructors.map(instructor => {
			return instructor.Name;
		}).join(', ') : '';

		const href = `uri:${this.props.course.href}`;
		let courseLink = `./object/${encodeURIComponent(href)}`;

		if (isMobile) {
			courseLink = `./course/${encodeForURI(this.props.course.CourseNTIID)}/info`;
		}
		return (
			<a href={courseLink}>
				<div className="course-panel">
					<figure className="flex-item">
						<Presentation.Asset contentPackage={this.props.course} propName="src" type="landing">
							<img />
						</Presentation.Asset>
					</figure>
					<div className="info-course flex-item">
						<span>{this.props.course.ProviderUniqueID}</span>
						<div className="course-title">{this.props.course.Title}</div>
						<p>{instructors}</p>
					</div>
					{isAdmin && (
						<div className="stamp flex-item"><span className="admin">Administering</span></div>)}
					{enrolled && !isAdmin && (
						<div className="stamp"><span className="enroll">ENROLLED</span></div>)}
					{status === 'start' && !isAdmin && (
						<div className="stamp flex-item">
							<span className={statusClass}>Starts <DateTime date={this.props.course.StartDate} format="ll"/></span>
						</div>)}
					{status === 'finish' && !isAdmin && (
						<div className="stamp flex-item">
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
