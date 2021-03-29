import React from 'react';

import { Presentation } from '@nti/web-commons';

const Background = props => (
	<Presentation.AssetBackground type="background" {...props} />
);

export const CarouselSlideBackground = styled(Background)`
	background-size: cover;
`;
