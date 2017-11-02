import React from 'react';
import PropTypes from 'prop-types';
import {DateTime} from 'nti-web-commons';


CarouselItem.propTypes = {
	backgroundUrl: PropTypes.string,
	detailImage: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	startDate: PropTypes.instanceOf(Date),
};

export default function CarouselItem (props) {
	return (
		<div className="carousel-block" style={{'backgroundImage': 'url(' + props.backgroundUrl + ')'}}>
			<div className="content-carousel">
				<h3 className="title-carousel">{props.title}</h3>
				<p className="detail-txt">{props.description}</p>
				<div className="statistic">
					<ul>
						<li>
							<p className="date">Starts <DateTime date={props.startDate}/></p>
						</li>
					</ul>
				</div><img alt="carousel" src={props.detailImage} className="img-content"/>
			</div>
		</div>
	);
}
