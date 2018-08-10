/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import {Card} from '@nti/web-course';
import { mount } from 'enzyme';

import CatalogCard from '../Card';

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
		MimeType: 'application/vnd.nextthought.courses.coursecataloglegacyentry',
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
		getEndDate: () => new Date(),
		getAuthorLine: () => ''
	};

	test('Renders Course Card', () => {
		const wrapper = mount(<ContextProvider><CatalogCard course={course} /></ContextProvider>);
		expect(wrapper.find(Card).first()).toBeTruthy();
	});
});
