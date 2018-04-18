import React from 'react';
import PropTypes from 'prop-types';
import {Presentation, DateTime} from '@nti/web-commons';
import {encodeForURI} from '@nti/lib-ntiids';


CarouselItem.propTypes = {
	data: PropTypes.object
};

export default function CarouselItem (props) {
	const description =  props.data.RichDescription || props.data.description;
	const title = props.data.title;
	const backgroundStyle = {'backgroundSize': 'cover'};
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
											<p className="course-id">{props.data.ProviderUniqueID}</p>
										</li>
										<li>
											<p className="course-start-date">Starts <DateTime date={props.data.StartDate}/></p>
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
