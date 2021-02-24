/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';

import CarouselItem from '../components/CarouselItem';

describe('Carousel', () => {
	const ntiid = 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010';
	const title = 'Preview Skeleton Test Course';
	const richDescription = 'RichDescription';
	const description = 'description';
	const data = {
		NTIID: ntiid,
		title: title,
		RichDescription: richDescription,
	};

	const dataTemp = {
		NTIID: ntiid,
		title: title,
		description: description
	};

	test('Course title is string', () => {
		const {container} = render(<CarouselItem data={data} />);
		expect(container.querySelector('.title-carousel').textContent).toEqual(title);
	});

	test('Course description when RichDescription define', () => {
		const {container} = render(<CarouselItem data={data} />);
		expect(container.querySelector('.detail-txt').textContent).toEqual(richDescription);
	});

	test('Course description when RichDescription undefined', () => {
		const {container} = render(<CarouselItem data={dataTemp} />);
		expect(container.querySelector('.detail-txt').textContent).toEqual(description);
	});
});
