/* eslint-env jest */
import React from 'react';
import {shallow} from 'enzyme';

import CarouselItem from '../components/CarouselItem';

describe('Carousel', () => {
	const data = {
		NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
		title: 'Preview Skeleton Test Course',
		description:'description'
	};
	test('Course title is string', () => {
		const wrapper = shallow(<CarouselItem data={data} />);
		expect(wrapper.find('data').title === 'Title');
	});
});
