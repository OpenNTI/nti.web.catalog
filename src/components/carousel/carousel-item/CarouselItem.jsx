import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarouselItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// id: this.props.id,
			backgroundUrl: this.props.backgroundUrl,
			backgroundWidth: this.props.backgroundWidth,
			backgroundHeight: this.props.backgroundHeight,
			detailImage: this.props.detailImage,
			detailImageWidth: this.props.detailImageWidth,
			detailImageHeight: this.props.detailImageHeight,
			title: this.props.title,
			description: this.props.description,
			startDate: this.props.startDate,
			learnerNumber: this.props.learnerNumber, spotLeft: this.props.spotLeft
		};

		this._monthFormat = this._monthFormat.bind(this);
		this._dateFormat = this._dateFormat.bind(this);
	}

	_monthFormat(date) {
		let d = new Date(date);
		if(!d || d === 'Invalid Date') {
			return "";
		}

		let month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

		return month[d.getMonth()];
	}

	_dateFormat(date) {
		let d = new Date(date);
		if(!d || d === 'Invalid Date') {
			return "";
		}
		return this._monthFormat(d) + " " + date.getDate();
	}

	render() {
		let self = this;
		let style = {"backgroundImage": 'url(' + self.state.backgroundUrl + ')', width: self.state.backgroundWidth, height: self.state.backgroundHeight};
		let startDate = self._dateFormat(new Date(self.state.startDate));

		return (
			<div className="carousel-block" style={style}>
				<div className="content-carousel">
					<h3 className="title-carousel">{self.state.title}</h3>
					<p className="detail-txt">{self.state.description}</p>
					<div className="statistic">
						<ul>
							<li>
								<p className="date">Starts {startDate}</p>
							</li>
							<li>
								<p className="visiter">• &nbsp;&nbsp;&nbsp;{self.state.learnerNumber} Learners</p>
							</li>
							<li className="hidden">
								<p className="spot">{self.state.spotLeft} Spots Left</p>
							</li>
						</ul>
					</div><img alt="carousel" src={self.state.detailImage} className="img-content"/>
				</div>
			</div>
		);
	}
}
// <div className={className} key={self.state.id}>
//   <div style={style}>
//    <span>{self.state.title}</span>
//    <span>{self.state.description}</span>
//   </div>
// </div>

CarouselItem.propTypes = {
	// id: PropTypes.string,
	backgroundUrl: PropTypes.string,
	backgroundWidth: PropTypes.string,
	backgroundHeight: PropTypes.string,
	detailImage: PropTypes.string,
	detailImageWidth: PropTypes.string,
	detailImageHeight: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	startDate: PropTypes.string,
	learnerNumber: PropTypes.number,
	spotLeft: PropTypes.number
};
export default CarouselItem;
