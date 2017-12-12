/* eslint-env jest */
import React from 'react';
import {shallow} from 'enzyme';

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
		const wrapper = shallow(<CarouselItem data={data} />);
		expect(wrapper.find('.title-carousel').first().text()).toEqual(title);
	});

	test('Course description when RichDescription define', () => {
		const wrapper = shallow(<CarouselItem data={data} />);
		expect(wrapper.find('.detail-txt').first().text()).toEqual(richDescription);
	});

	test('Course description when RichDescription undefined', () => {
		const wrapper = shallow(<CarouselItem data={dataTemp} />);
		expect(wrapper.find('.detail-txt').first().text()).toEqual(description);
	});
});
