/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import Card from '../Card';

class ContextProvider extends React.Component {
	static propTypes = {
		children: PropTypes.any
	}

	static childContextTypes = {
		router: PropTypes.object
	}


	getChildContext () {
		return {
			router: {
				history: {
					createHref: x => x,
					push: () => {},
					replace: () => {}
				}
			}
		};
	}

	render () {
		return React.Children.only(this.props.children);
	}
}

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
		],
		getStartDate: () => new Date(),
		getEndDate: () => new Date()
	};

	test('Test card title', () => {
		const wrapper = mount(<ContextProvider><Card course={course} /></ContextProvider>);
		expect(wrapper.find('.course-title').first().text()).toEqual('Test Title');
	});

	test('Test card provider unique ID', () => {
		const wrapper = mount(<ContextProvider><Card course={course} /></ContextProvider>);
		expect(wrapper.find('.info-course span').first().text()).toEqual('ID HERE');
	});

	test('Test card instructors', () => {
		const wrapper = mount(<ContextProvider><Card course={course} /></ContextProvider>);
		expect(wrapper.find('.info-course p').first().text()).toEqual('Instructors 1, Instructors 2');
	});

	test('Test card status is admin', () => {
		course.IsAdmin = true;
		const wrapper = mount(<ContextProvider><Card course={course} /></ContextProvider>);
		expect(wrapper.find('.admin').first().text()).toEqual('Administering');
	});

	test('Test card status is enrolled', () => {
		course.IsEnrolled = true;
		course.IsAdmin = false;
		const wrapper = mount(<ContextProvider><Card course={course} /></ContextProvider>);
		expect(wrapper.find('.enroll').first().text()).toEqual('ENROLLED');
	});
});
