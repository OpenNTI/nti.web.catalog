import React, {Component} from 'react';
import PropType from 'prop-types';

import CourseDetail from '../../course-detail/CourseDetail';

class CourseCard extends Component {
	constructor(props) {
		super(props);

		this.showDetail = this.showDetail.bind(this);
		this.closeDetail = this.closeDetail.bind(this);

		this.state = {
			showDialog: false
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
				course={self.props.courseTitle}
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
