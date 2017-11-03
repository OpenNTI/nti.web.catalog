import React from 'react';
import PropTypes from 'prop-types';
import {Presentation, DateTime} from 'nti-web-commons';


CarouselItem.propTypes = {
	data: PropTypes.object
};

export default function CarouselItem (props) {
	return(
		<div>
			<Presentation.AssetBackground type="background" contentPackage={props.data}>
				<div className="carousel-block">
					<div className="content-carousel">
						<h3 className="title-carousel">{props.data.title}</h3>
						<p className="detail-txt">{props.data.description}</p>
						<div className="statistic">
							<ul>
								<li>
									<p className="date">Starts <DateTime date={props.data.StartDate}/></p>
								</li>
							</ul>
						</div>
						<Presentation.Asset contentPackage={props.data} propName="src" type="landing">
							<img className="img-content" />
						</Presentation.Asset>
					</div>
				</div>
			</Presentation.AssetBackground>
		</div>
	);
}
