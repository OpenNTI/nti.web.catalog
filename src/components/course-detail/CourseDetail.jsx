import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Video from './video/Video';
import CourseInfo from './course-info/CourseInfo';

class CourseDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let self = this;
		return (
			<div id="course-detail" className="course-popup-detail">
				<div id="openModal" className="modalDialog">
					<div className="popup-container">
						<div className="dialog-top"><span className="sub-title">{this.props.course.id}</span>
							<h3>{this.props.course.title}</h3>
							<span className="close-dialog" onClick={self.props.close}/>
						</div>
						<div className="content-dialog">
							<div className="content-dialog-left">
								<Video videoUrl={this.props.course.videoUrl}/>
								<div className="description">
									<p>{this.props.course.description}</p>
								</div>
							</div>
							<div className="content-dialog-right">
								<CourseInfo info={this.props.course.courseInfo}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CourseDetail.propTypes = {
	close: PropTypes.func,
	course: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		videoUrl: PropTypes.string,
		description: PropTypes.string,
		courseInfo: PropTypes.shape({
			title: PropTypes.string,
			status: PropTypes.string,
			detail: PropTypes.string
		})
	})

};

export default CourseDetail;
