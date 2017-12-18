/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import CategoryDetail from '../components/CategoryDetail';

describe('CategoryDetail', () => {
	const category = {
		Items: [{title: 'title 1', getDefaultAssetRoot: () =>{}}, {title: 'title 2', getDefaultAssetRoot: () => {}}],
		Total: 30,
		ItemCount: 2
	};

	const categoryWithMore = {
		Items: [{title: 'title 1', getDefaultAssetRoot: () =>{}}, {title: 'title 2', getDefaultAssetRoot: () => {}}],
		Total: 50,
		ItemCount: 2
	};
	const other = true;
	const getCategoryWithNoMore = () => mount(
		<CategoryDetail
			category={category}
			other={other}
		/>
	);

	const getCategoryWithMore = () => mount(
		<CategoryDetail
			category={categoryWithMore}
			other={other}
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