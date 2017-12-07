import React from 'react';
import PropTypes from 'prop-types';
import {Presentation, DateTime} from 'nti-web-commons';
import {encodeForURI} from 'nti-lib-ntiids';


CarouselItem.propTypes = {
	data: PropTypes.object
};

export default function CarouselItem (props) {
	let description =  props.data.RichDescription || props.data.description;
	let title = props.data.title;
	const descriptionLimit = 150;
	const titleLimit = 55;
	const backgroundStyle = {'backgroundSize': 'cover'};
	description = description.slice(0, descriptionLimit) + (description.length > descriptionLimit ? '...' : '');
	title = title.slice(0, titleLimit) + (title.length > titleLimit ? '...' : '');

	return (
		<div>
			<a href={`./object/${encodeForURI(props.data.NTIID)}`}>
				<Presentation.AssetBackground type="background" contentPackage={props.data} style={backgroundStyle}>
					<div className="carousel-block">
						<div className="content-carousel">
							<div className="carousel_left">
								<h3 className="title-carousel">{title}</h3>
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
