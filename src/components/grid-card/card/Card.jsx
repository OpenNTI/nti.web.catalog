import React from 'react';
import PropType from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';

CourseCard.propTypes = {
	imgUrl: PropType.string,
	courseId: PropType.string,
	courseTitle: PropType.string,
	author: PropType.string,
	status: PropType.shape ({
		OpenEnrollment: PropType.object
	}),
	ntiid: PropType.string
};

export default function CourseCard (data) {
	const status = data.status && data.status.OpenEnrollment &&
		data.status.OpenEnrollment.IsEnrolled;

	return (
		<div className="course-block">
			<a href={`./object/${encodeForURI(data.ntiid)}`}>
				<figure>
					<img alt="course" src={data.imgUrl}/>
				</figure>
			</a>
			<div className="info-course"><span>{data.courseId}</span>
				<h3>{data.courseTitle}</h3>
				<a href="#">{data.author}</a>
			</div>
			{status && (
				<div className="stamp"><a className="enroll">ENROLLED</a></div>)}
		</div>
	);
}
