/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Carousel from '../components/Carousel';

describe('Carousel', () => {
	const selectCarousel = jest.fn();
	const index = 0;
	const data = [
		{
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
			getDefaultAssetRoot: ()=>{}
		},
		{
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
			getDefaultAssetRoot: ()=>{}
		},
		{
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
			getDefaultAssetRoot: ()=>{}
		}
	];

	const getCmp = () => mount(
		<Carousel
			data={data}
			carouselSelected={index}
			selectCarousel={selectCarousel}
		/>
	);

	test('Test click next carousel', (done) => {
		const cmp = getCmp();

		const nextButton = cmp.find('.icon-chevronup-25').first();

		nextButton.simulate('click');

		const verifyCalled = () => {
			expect(selectCarousel).toHaveBeenCalled();

			done();
		};
		verifyCalled();
	});

	test('Test click pre carousel', (done) => {
		const cmp = getCmp();

		const preButton = cmp.find('.icon-chevrondown-25').first();

		preButton.simulate('click');

		const verifyCalled = () => {
			expect(selectCarousel).toHaveBeenCalled();

			done();
		};

		verifyCalled();
	});

	test('Test change carousel selected index when click next', () => {
		const cmp = getCmp();
		expect(cmp.state().selectedIndex).toEqual(0);
		cmp.find('.icon-chevronup-25').simulate('click');
		expect(cmp.state().selectedIndex).toEqual(1);
	});

	test('Test change carousel selected index when click previous', () => {
		const cmp = getCmp();
		expect(cmp.state().selectedIndex).toEqual(0);
		cmp.find('.icon-chevrondown-25').simulate('click');
		expect(cmp.state().selectedIndex).toEqual(data.length - 1);
	});
});
