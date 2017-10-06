import React, {Component} from 'react';

class CourseDetail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let self = this;
		return(
			<div id="course-detail" className="course-popup-detail">
				<div id="openModal" className="modalDialog">
					<div className="cd-popup-container">
						<div className="popup-header">
							<div className="course-id">DSA / ISE 5013</div>
							<div className="course-title">Fundamentals of Engineering Statistical Analysis</div>
							<span className="close-popup" onClick={self.props.close}>X</span>
						</div>
						<div className="popup-content">
							cdcdc
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CourseDetail;
