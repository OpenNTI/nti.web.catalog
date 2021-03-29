import React from 'react';

import { Presentation } from '@nti/web-commons';

const Background = props => (
	<Presentation.AssetBackground type="background" {...props} />
);

export const CarouselSlideBackground = styled(Background)`
	background-size: cover;
	background-color: rgba(0, 0, 0, 0.25);
	background-blend-mode: overlay;
	backdrop-filter: blur(20px);
`;
