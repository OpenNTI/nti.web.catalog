/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import CategoryDetail from '../components/CategoryDetail';

describe('CategoryDetail', () => {
	const category = {
		Items: [{title: 'title 1'}, {title: 'title 2'}],
		Total: 30,
		ItemCount: 2
	};

	const categoryWithMore = {
		Items: [{title: 'title 1'}, {title: 'title 2'}],
		Total: 50,
		ItemCount: 2
	};

	const getCategoryWithNoMore = () => mount(
		<CategoryDetail
			category={category}
			other={true}
		/>
	);

	const getCategoryWithMore = () => mount(
		<CategoryDetail
			category={categoryWithMore}
			other={true}
		/>
	);

	test('Test category with no more button', () => {
		const cmp = getCategoryWithNoMore();
		expect(cmp.state().noMore).toEqual(true);
	});

	test('Test category with more button', () => {
		const cmp = getCategoryWithMore();
		expect(cmp.state().noMore).toEqual(undefined);
	});
});
