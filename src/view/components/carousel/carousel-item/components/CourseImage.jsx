import React from 'react';

import { Presentation } from '@nti/web-commons';

const Image = styled('img').attrs({ className: 'img-content' })`
	object-fit: cover;
	width: 100%;
	height: auto;
	flex: 0 1 50%;
	overflow: hidden;
	max-width: 361px;
	max-height: 220px;
	margin: 0 10px;
`;

export const CourseImage = ({ contentPackage }) => (
	<Presentation.Asset
		contentPackage={contentPackage}
		propName="src"
		type="landing"
	>
		<Image />
	</Presentation.Asset>
);
