import React from 'react';
import PropType from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';
import {DateTime} from 'nti-web-commons';

export default class CourseCard extends React.Component {
	static propTypes = {
		imgUrl: PropType.string,
		courseId: PropType.string,
		courseTitle: PropType.string,
		author: PropType.string,
		enroll: PropType.object,
		startDate: PropType.string,
		endDate: PropType.string,
		ntiid: PropType.string
	}

	showDetail = () => {
		const detailLink = `./object/${encodeForURI (this.props.ntiid)}`;
		window.open (detailLink, '_self');
	}

	render () {
		const enroll = this.props.enroll && this.props.enroll.OpenEnrollment &&
			this.props.enroll.StoreEnrollment && this.props.enroll.FiveMinuteEnrollment &&
			this.props.enroll.OpenEnrollment.enrolled;

		const status = checkStatus (this.props.startDate, this.props.endDate);
		let statusClass = status;
		if (enroll) {
			statusClass = status + ' right';
		}

		return (
			<div className="course-panel" onClick={this.showDetail}>
				<figure>
					<img alt="course" src={this.props.imgUrl}/>
				</figure>
				<div className="info-course"><span>{this.props.courseId}</span>
					<h3>{this.props.courseTitle}</h3>
					<a>{this.props.author}</a>
				</div>
				{enroll && (
					<div className="stamp"><a className="enroll">ENROLLED</a></div>)}
				{status === 'start' && (
					<div className="stamp">
						<a className={statusClass}>Starts <DateTime date={this.props.startDate} format="ll"/></a>
					</div>)}
				{status === 'finish' && (
					<div className="stamp">
						<a className={statusClass}>Finish <DateTime date={this.props.endDate} format="ll"/></a>
					</div>)}
			</div>
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
