/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Card from '../Card';

describe('Card', () => {
	let course = {
		NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
		getDefaultAssetRoot: ()=>{},
		Title: 'Test Title',
		ProviderUniqueID: 'ID HERE',
		Instructors: [
			{
				Name: 'Instructors 1'
			},
			{
				Name: 'Instructors 2'
			}
		]
	};

	test('Test card title', () => {
		const wrapper = shallow(<Card course={course} />);
		expect(wrapper.find('.course-title').first().text()).toEqual('Test Title');
	});

	test('Test card provider unique ID', () => {
		const wrapper = shallow(<Card course={course} />);
		expect(wrapper.find('.info-course span').first().text()).toEqual('ID HERE');
	});

	test('Test card instructors', () => {
		const wrapper = shallow(<Card course={course} />);
		expect(wrapper.find('.info-course p').first().text()).toEqual('Instructors 1, Instructors 2');
	});

	test('Test card status is admin', () => {
		course.IsAdmin = true;
		const wrapper = shallow(<Card course={course} />);
		expect(wrapper.find('.admin').first().text()).toEqual('Administering');
	});

	test('Test card status is enrolled', () => {
		course.IsEnrolled = true;
		course.IsAdmin = false;
		const wrapper = shallow(<Card course={course} />);
		expect(wrapper.find('.enroll').first().text()).toEqual('ENROLLED');
	});
});
