/* eslint-env jest */
import React from 'react';
import {shallow} from 'enzyme';

import GridCard from '../components/grid-card/GridCard';

describe('GridCard', () => {
	const data = [];
	test('no data for grid card', () => {
		const wrapper = shallow(<GridCard data={data} />);
		expect(wrapper.find('data').length === 0);
	});
});
