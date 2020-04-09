/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import Carousel from '../components/Carousel';

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

describe('Carousel', () => {
	const selectCarousel = jest.fn();
	const index = 0;
	const data = [
		{
			ProviderUniqueID: 'ITEM1',
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
			getDefaultAssetRoot: ()=>{}
		},
		{
			ProviderUniqueID: 'ITEM2',
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1011',
			getDefaultAssetRoot: ()=>{}
		},
		{
			ProviderUniqueID: 'ITEM3',
			NTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1012',
			getDefaultAssetRoot: ()=>{}
		}
	];

	const getCmp = () => mount(
		<ContextProvider>
			<Carousel
				data={data}
				carouselSelected={index}
				selectCarousel={selectCarousel}
			/>
		</ContextProvider>
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

		expect(cmp.find('.course-id').first().text()).toEqual('ITEM1');
		cmp.find('.icon-chevronup-25').simulate('click');

		cmp.update();

		expect(cmp.find('.course-id').first().text()).toEqual('ITEM2');
		expect(cmp.find('.course-id').at(1).text()).toEqual('ITEM1');
	});

	test('Test change carousel selected index when click previous', () => {
		const cmp = getCmp();

		expect(cmp.find('.course-id').first().text()).toEqual('ITEM1');
		cmp.find('.icon-chevrondown-25').simulate('click');

		cmp.update();

		expect(cmp.find('.course-id').first().text()).toEqual('ITEM3');
		expect(cmp.find('.course-id').at(1).text()).toEqual('ITEM1');
	});
});
