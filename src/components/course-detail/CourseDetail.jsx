import React from 'react';
import PropTypes from 'prop-types';

import Video from './video/Video';
import CourseInfo from './course-info/CourseInfo';

CourseDetail.propTypes = {
	course: PropTypes.object,
	close: PropTypes.func
};

export default function CourseDetail (props) {
	return (
		<div id="course-detail" className="course-popup-detail">
			<div id="openModal" className="modalDialog">
				<div className="popup-container">
					<div className="dialog-top"><span className="sub-title">{props.course.id}</span>
						<h3>{props.course.title}</h3>
						<span className="close-dialog" onClick={props.close}/>
					</div>
					<div className="content-dialog">
						<div className="content-dialog-left">
							<Video videoUrl={props.course.videoUrl}/>
							<div className="description">
								<p>{props.course.description}</p>
							</div>
						</div>
						<div className="content-dialog-right">
							<CourseInfo info={props.course.courseInfo}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
