import React from 'react';
import PropTypes from 'prop-types';

CarouselItem.propTypes = {
	backgroundUrl: PropTypes.string,
	backgroundWidth: PropTypes.string,
	backgroundHeight: PropTypes.string,
	detailImage: PropTypes.string,
	detailImageWidth: PropTypes.string,
	detailImageHeight: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	startDate: PropTypes.instanceOf(Date),
	learnerNumber: PropTypes.number,
	spotLeft: PropTypes.number
};

export default function CarouselItem (props) {
	return (
		<div className="carousel-block" style={{'backgroundImage': 'url(' + props.backgroundUrl + ')', width: props.backgroundWidth, height: props.backgroundHeight}}>
			<div className="content-carousel">
				<h3 className="title-carousel">{props.title}</h3>
				<p className="detail-txt">{props.description}</p>
				<div className="statistic">
					<ul>
						<li>
							<p className="date">Starts { _dateFormat(new Date(props.startDate)) }</p>
						</li>
						<li>
							<p className="visiter">• &nbsp;&nbsp;&nbsp;{props.learnerNumber} Learners</p>
						</li>
						<li>
							<p className="spot">{props.spotLeft} Spots Left</p>
						</li>
					</ul>
				</div><img alt="carousel" src={props.detailImage} className="img-content"/>
			</div>
		</div>
	);
}

function _monthFormat (date) {
	const d = new Date (date);

	if(!d || d === 'Invalid Date') {
		return '';
	}

	let month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';

	return month[d.getMonth()];
}

function _dateFormat (date) {
	let d = new Date(date);
	if(!d || d === 'Invalid Date') {
		return '';
	}
	return _monthFormat(d) + ' ' + date.getDate();
}
