/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import GridCard from '../components/GridCard';
import * as Constants from '../../Constants';

describe('GridCard', () => {
	const purchasedCourses = [
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
	const getCmpWithPuchased = () => mount(
		<GridCard
			courses={purchasedCourses}
			type={Constants.PURCHASED}
		/>
	);
	test('Test grid card with purchased tag, count courses', () => {
		const cmp = getCmpWithPuchased();
		expect(cmp.find('li').length).toEqual(purchasedCourses.length);
	});
});
