import React, {Component} from 'react';
// import Video from './video/Video';

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
						<div className="dialog-top"><span className="sub-title">DSA / ISE 5013</span>
							<h3>Fundamentals of Engineering Statistical Analysis </h3>
							<span className="close-popup" onClick={self.props.close}>X</span>
						</div>
						<div className="content-dialog">
							<div className="content-dialog-left">
								<div className="video">
									<iframe src="https://www.youtube.com/embed/3wi9jEss-PA" frameBorder="0" allowFullScreen=""/>
								</div>
								<div className="description">
									<p>Human Physiology is the study of normal biological function from atoms to
										molecules, to cells to tissues, and to organs and organ systems. It is the
										integration of each of these elements that allows for the human body to function
										as a whole to accomplish particular tasks. In this course, we will focus on how
										the human body works through the activities of interconnected organ systems. We
										will begin by reviewing fundamental concepts from related fields of study
										including Chemistry, Molecular Biology, and Cell Biology. We will then build
										upon those concepts as we explore each of the organ systems, their
										interconnectivity and the effects that specific perturbations will have on those
										organ systems and</p>
								</div>
							</div>
							<div className="content-dialog-right">
								<div className="status-course">
									<p className="title">This Course is Archived.</p>
									<p className="status">Free</p>
								</div>
								<div className="detail-course">
									<p>Archived courses are out of session but all course content will remain available
										including the lectures, course materials, quizzes, and discussions. </p>
								</div>
								<div className="add-course"><a>Add Archived Course</a></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CourseDetail;
