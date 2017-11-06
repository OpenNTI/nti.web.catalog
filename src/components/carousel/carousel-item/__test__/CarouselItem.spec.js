/* eslint-env jest */
import React from 'react';
import {shallow} from 'enzyme';

import CarouselItem from '../CarouselItem';

describe('Carousel', () => {
	const data = {
		title:'Title'
	};
	test('Course title is string', () => {
		const wrapper = shallow(<CarouselItem data={data} />);
		expect(wrapper.find('data').title === 'Title');
	});
});
