import React from 'react';
import PropTypes from 'prop-types';
import {Presentation, DateTime} from 'nti-web-commons';


CarouselItem.propTypes = {
	data: PropTypes.object
};

export default function CarouselItem (props) {
	let description =  props.data.description;
	const count = 130;
	const backgroundStyle = {'backgroundSize': 'cover'};
	description = description.slice(0, count) + (description.length > count ? '...' : '');

	return (
		<div>
			<a >
				<Presentation.AssetBackground type="background" contentPackage={props.data} style={backgroundStyle}>
					<div className="carousel-block">
						<div className="content-carousel">
							<div className="carousel_left">
								<h3 className="title-carousel">{props.data.title}</h3>
								<p className="detail-txt">{description}</p>
								<div className="statistic">
									<ul>
										<li>
											<p className="date">Starts <DateTime date={props.data.StartDate}/></p>
										</li>
									</ul>
								</div>
								<Presentation.Asset contentPackage={props.data} propName="src" type="landing">
									<img className="img-content"/>
								</Presentation.Asset>
							</div>
						</div>
					</div>
				</Presentation.AssetBackground>
			</a>
		</div>
	);
}
