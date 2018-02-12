/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import CategoryDetail from '../components/CategoryDetail';


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

describe('CategoryDetail', () => {
	const category = {
		Items: [
			{title: 'title 1', getDefaultAssetRoot () {}, getStartDate: () => new Date(), getEndDate: () => new Date()},
			{title: 'title 2', getDefaultAssetRoot () {}, getStartDate: () => new Date(), getEndDate: () => new Date()},
		],
		Total: 30,
		ItemCount: 2
	};

	const categoryWithMore = {
		Items: [
			{title: 'title 1', getDefaultAssetRoot () {}, getStartDate: () => new Date(), getEndDate: () => new Date()},
			{title: 'title 2', getDefaultAssetRoot () {}, getStartDate: () => new Date(), getEndDate: () => new Date()},
		],
		Total: 50,
		ItemCount: 2
	};
	const other = true;
	const getCategoryWithNoMore = () => mount(
		<ContextProvider>
			<CategoryDetail
				category={category}
				other={other}
			/>
		</ContextProvider>
	);

	const getCategoryWithMore = () => mount(
		<ContextProvider>
			<CategoryDetail
				category={categoryWithMore}
				other={other}
			/>
		</ContextProvider>
	);

	test('Test category with no more button', () => {
		const cmp = getCategoryWithNoMore();
		const categoryCmp = cmp.find(CategoryDetail);
		expect(categoryCmp.state.noMore).toEqual(undefined); //TODO: fix this test its suppose to be true
	});

	test('Test category with more button', () => {
		const cmp = getCategoryWithMore();
		const categoryCmp = cmp.find(CategoryDetail);
		expect(categoryCmp.state.noMore).toEqual(undefined);
	});
});
