import React, {Component} from 'react';
import PropType from 'prop-types';

class CourseCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let self = this;
		let statusDOM = '';
		if (self.props.status) {
			statusDOM = <div className="stamp"><a className={self.props.status.type}>{self.props.status.title}</a></div>;
		}

		return (
			<div className="course-block">
				<figure><img alt="course" src={self.props.imgUrl}/></figure>
				<div className="info-course"><span>{self.props.courseId}</span>
					<h3>{self.props.courseTitle}</h3>
					<a href="#">{self.props.author}</a>
				</div>
				{statusDOM}
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
