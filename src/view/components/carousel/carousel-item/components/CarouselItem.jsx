import React from 'react';
import PropTypes from 'prop-types';

import { DateTime } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import { rawContent } from '@nti/lib-commons';

import { CarouselSlide } from './CarouselSlide';
import { CarouselSlideBackground } from './CarouselSlideBackground';
import { CourseImage } from './CourseImage';
import { Description } from './Description';
import { Details } from './Details';
import { List, ListItem } from './List';
import { Pill } from './Pill';
import { Title } from './Title';

const CarouselItem = React.forwardRef((props, ref) => {
	const { title } = props.data;
	const description = props.data.RichDescription || props.data.description;
	return (
		<LinkTo.Object object={props.data} ref={ref}>
			<CarouselSlideBackground contentPackage={props.data}>
				<CarouselSlide>
					<Details>
						<Title>{title}</Title>
						<Description {...rawContent(description)} />

						<List>
							<ListItem>
								<Pill className="course-id">
									{props.data.ProviderUniqueID}
								</Pill>
							</ListItem>
							<ListItem>
								<Pill className="course-start-date">
									Starts{' '}
									<DateTime
										date={props.data.getStartDate?.()}
									/>
								</Pill>
							</ListItem>
						</List>
					</Details>
					<CourseImage contentPackage={props.data} />
				</CarouselSlide>
			</CarouselSlideBackground>
		</LinkTo.Object>
	);
});

CarouselItem.propTypes = {
	data: PropTypes.object,
};

export default CarouselItem;
