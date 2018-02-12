/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';

import GridCard from '../components/GridCard';
import * as Constants from '../../Constants';

const mockService = () => ({
	getCollection: () => {
		return Promise.resolve({
			Links: [{rel: 'accept-course-invitations'}]
		});
	}
});

const onBefore = () => {
	global.$AppConfig = {
		...(global.$AppConfig || {}),
		nodeService: mockService(),
	};
};

const onAfter = () => {
	//unmock getService()
	const {$AppConfig} = global;
	delete $AppConfig.nodeInterface;
	delete $AppConfig.nodeService;
};

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

describe('GridCard', () => {
	const purchasedCourses = [
		{
			Items: [
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
			],
			ItemCount:3
		}
	];

	beforeEach(onBefore);
	afterEach(onAfter);

	const getCmpWithCategory = () => mount(
		<ContextProvider>
			<GridCard
				courses={purchasedCourses}
				type={Constants.CATEGORIES}
			/>
		</ContextProvider>
	);
	test('Test grid card with category have over 4 courses, count courses',  async () => {
		const cmp = getCmpWithCategory();

		await new Promise(t => setTimeout(t, 100));

		cmp.update();
		expect(cmp.find('ul li').length).toEqual(1);});
});
