import React, {Component} from 'react';
import CourseCard from '../card/Card';
import PropTypes from 'prop-types';

class GridCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let self = this;
		let gridDOM = [];
		for (let i = 0; i < self.props.data.length; i++) {
			let girdTemp = [];

			//get 3 item and put it in 1 row
			for (let j = 0; j < 3; j++) {
				if (i + j < self.props.data.length) {
					let item = (<CourseCard
						imgUrl={self.props.data[i + j].imgUrl}
						courseTitle={self.props.data[i + j].courseTitle}
						courseId={self.props.data[i + j].courseId}
						author={self.props.data[i + j].author}
						status={self.props.data[i + j].status}
						key={self.props.data[i + j].courseId}
					/>);
					girdTemp.push(item);
				}
			}

			gridDOM.push(<div className="course-card" key={i}>
				{girdTemp}
			</div>);
			i += 2;
		}

		return (
			<div className="content-right">
				{gridDOM}
			</div>
		);
	}
}
GridCard.PropTypes = {
	data: PropTypes.array
};
export default GridCard;
