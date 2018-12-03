import React from 'react';
import PropTypes from 'prop-types';
import {Presentation, DateTime} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';
import {rawContent} from '@nti/lib-commons';


CarouselItem.propTypes = {
	data: PropTypes.object
};

export default function CarouselItem (props) {
	const description =  props.data.RichDescription || props.data.description;
	const title = props.data.title;
	const backgroundStyle = {'backgroundSize': 'cover'};
	return (
		<div>
			<LinkTo.Object object={props.data}>
				<Presentation.AssetBackground type="background" contentPackage={props.data} style={backgroundStyle}>
					<div className="carousel-block">
						<div className="content-carousel">
							<div className="carousel_left">
								<h3 className="title-carousel">{title}</h3>
								<p className="detail-txt" {...rawContent(description)} />
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
			</LinkTo.Object>
		</div>
	);
}
