import { useState } from 'react';
import PropTypes from 'prop-types';

import { Layouts } from '@nti/web-commons';

import Carousel from './components/Carousel';
import MobileCarousel from './carousel-mobile/Carousel';

const { Responsive } = Layouts;

CatalogCarousel.propTypes = {
	featured: PropTypes.array,
};
export default function CatalogCarousel({ featured }) {
	const [selectCarousel, setSelectCarousel] = useState(0);

	if (!featured?.length) {
		return null;
	}

	return (
		<section className="carousel">
			<div className="carousel-wrapper">
				<Responsive.Item
					query={Responsive.isDesktop}
					component={Carousel}
					data={featured}
					carouselSelected={selectCarousel}
					selectCarousel={setSelectCarousel}
				/>
				<Responsive.Item
					query={Responsive.isTablet}
					component={MobileCarousel}
					data={featured}
				/>
				<Responsive.Item
					query={Responsive.isMobile}
					component={MobileCarousel}
					data={featured}
				/>
			</div>
		</section>
	);
}
