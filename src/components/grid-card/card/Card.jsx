import React, {Component} from 'react';
import PropType from 'prop-types';

import CourseDetail from '../../course-detail/CourseDetail';

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
		detail: 'Archived courses are out of session but all course content will remain available including the lectures, course materials, quizzes, and discussions.',
	}
};

class CourseCard extends Component {
	constructor(props) {
		super(props);

		this.showDetail = this.showDetail.bind(this);
		this.closeDetail = this.closeDetail.bind(this);

		this.state = {
			showDialog: false,
			courseData: courseData,
		};
	}

	showDetail = (title) => () => {
		this.setState({showDialog: true});
	}

	closeDetail = () => () => {
		this.setState({showDialog: false});
	}

	render() {
		let self = this;

		//set status style
		let statusDOM = '';
		if (self.props.status) {
			statusDOM =
				<div className="stamp"><a className={self.props.status.type}>{self.props.status.title}</a></div>;
		}

		//set course detail dialog
		let detailDOM = '';
		if (self.state.showDialog) {
			detailDOM = (<CourseDetail
				course={self.state.courseData}
				close={self.closeDetail(this)}
			/>);
		}

		return (
			<div className="course-block">
				<figure>
					<img alt="course" src={self.props.imgUrl} onClick={self.showDetail(self.props.courseTitle)}/>
				</figure>
				<div className="info-course"><span>{self.props.courseId}</span>
					<h3>{self.props.courseTitle}</h3>
					<a href="#">{self.props.author}</a>
				</div>
				{statusDOM}
				{detailDOM}
			</div>
		);
	}
}

CourseCard.PropTypes = {
	imgUrl: PropType.string,
	courseId: PropType.string,
	courseTitle: PropType.string,
	author: PropType.string,
	status: PropType.shape({
		type: PropType.string,
		title: PropType.string
	})
};

export default CourseCard;
