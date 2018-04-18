import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Presentation} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';


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
		const {course} = this.props;

		const {
			IsAdmin: isAdmin,
			IsEnrolled: enrolled,
			Instructors
		} = course;

		const status = checkStatus (course.getStartDate(), course.getEndDate());
		let statusClass = status;
		if (enrolled) {
			statusClass = status + ' right';
		}


		const instructors = Instructors ? Instructors.map(instructor => instructor.Name).join(', ') : '';

		return (
			<LinkTo.Object object={course}>
				<div className="course-panel">
					<figure className="flex-item">
						<Presentation.Asset contentPackage={course} propName="src" type="landing">
							<img />
						</Presentation.Asset>
					</figure>
					<div className="info-course flex-item">
						<span>{course.ProviderUniqueID}</span>
						<div className="course-title">{course.Title}</div>
						<p>{instructors}</p>
					</div>
					{isAdmin && (
						<div className="stamp flex-item"><span className="admin">Administering</span></div>)}
					{enrolled && !isAdmin && (
						<div className="stamp"><span className="enroll">ENROLLED</span></div>)}
					{status === 'start' && !isAdmin && (
						<div className="stamp flex-item">
							<span className={statusClass}>Starts <DateTime date={course.getStartDate()} format="ll"/></span>
						</div>)}
					{status === 'finish' && !isAdmin && (
						<div className="stamp flex-item">
							<span className={statusClass}>Finished <DateTime date={course.getEndDate()} format="ll"/></span>
						</div>)}
				</div>
			</LinkTo.Object>
		);
	}
}

function checkStatus (startDate, endDate) {
	let status = '';
	const currentTime = Date.now();
	const startTime = startDate && startDate.getTime();
	const endTime = endDate && endDate.getTime();

	if (currentTime < startTime) {
		status = 'start';
	}

	if (startTime <= endTime && endTime < currentTime && !!endTime) {
		status = 'finish';
	}

	return status;
}
