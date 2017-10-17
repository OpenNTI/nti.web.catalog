import React, {Component} from 'react';
import PropType from 'prop-types';

import {encodeForURI} from 'nti-lib-ntiids';
// import CourseDetail from '../../course-detail/CourseDetail';

const courseData = {
	id: 'DSA / ISE 5013',
	title: 'Fundamentals of Engineering Statistical Analysis',
	description: 'Human Physiology is the study of normal biological function from atoms to molecules, ' +
	'to cells to tissues, and to organs and organ systems. It is the integration of each of these elements ' +
	'that allows for the human body to function as a whole to accomplish particular tasks. In this course, ' +
	'we will focus on how the human body works through the activities of interconnected organ systems. ' +
	'We will begin by reviewing fundamental concepts from related fields of study including Chemistry, ' +
	'Molecular Biology, and Cell Biology. We will then build upon those concepts as we explore each of the ' +
	'organ systems, their interconnectivity and the effects that specific perturbations will have on those ' +
	'to cells to tissues, and to organs and organ systems. It is the integration of each of these elements ' +
	'that allows for the human body to function as a whole to accomplish particular tasks. In this course, ' +
	'we will focus on how the human body works through the activities of interconnected organ systems. ' +
	'We will begin by reviewing fundamental concepts from related fields of study including Chemistry, ' +
	'Molecular Biology, and Cell Biology. We will then build upon those concepts as we explore each of the ' +
	'organ systems, their interconnectivity and the effects that specific perturbations will have on those ' +
	'organ systems and',
	videoUrl: 'https://www.youtube.com/embed/3wi9jEss-PA',
	courseInfo: {
		title: 'This Course is Archived.',
		status: 'Free',
		detail: 'Archived courses are out of session but all course content will remain available ' +
		'including the lectures, course materials, quizzes, and discussions.',
	}
};

export default class CourseCard extends Component {
	static propTypes = {
		imgUrl: PropType.string,
		courseId: PropType.string,
		courseTitle: PropType.string,
		author: PropType.string,
		status: PropType.shape ({
			type: PropType.string,
			title: PropType.string
		}),
		ntiid: PropType.string
	}

	constructor (props) {
		super (props);

		this.state = {
			showDialog: false,
			courseData: courseData,
		};
	}

	showDetail = (title) => () => {
		this.setState ({showDialog: true});
	}

	closeDetail = () => () => {
		this.setState ({showDialog: false});
	}

	render () {
		return (
			<div className="course-block">
				<a href={`./object/${encodeForURI(this.props.ntiid)}`}>
					<figure>
						<img alt="course" src={this.props.imgUrl}/>
					</figure>
				</a>
				<div className="info-course"><span>{this.props.courseId}</span>
					<h3>{this.props.courseTitle}</h3>
					<a href="#">{this.props.author}</a>
				</div>
				{this.props.status && (
					<div className="stamp"><a className={this.props.status.type}>{this.props.status.title}</a></div>)}
			</div>
		);
	}
}

// {this.state.showDialog && (
// 	<CourseDetail course={this.state.courseData} close={this.closeDetail (this)}
// 	/>)}
