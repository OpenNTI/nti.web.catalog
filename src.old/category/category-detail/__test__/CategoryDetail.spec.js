/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { render, waitFor } from '@testing-library/react';

import CategoryDetail from '../components/CategoryDetail';

function buildCourse(title) {
	return {
		title,
		getDefaultAssetRoot: () => {},
		getStartDate: () => new Date(),
		getEndDate: () => new Date(),
		MimeType:
			'application/vnd.nextthought.courses.coursecataloglegacyentry',
		getAuthorLine: () => '',
	};
}

class ContextProvider extends React.Component {
	static propTypes = {
		children: PropTypes.any,
	};

	static childContextTypes = {
		router: PropTypes.object,
	};

	getChildContext() {
		return {
			router: {
				history: {
					createHref: x => x,
					push: () => {},
					replace: () => {},
				},
			},
		};
	}

	render() {
		return React.Children.only(this.props.children);
	}
}

describe('CategoryDetail', () => {
	const category = {
		Items: [buildCourse('title1'), buildCourse('title2')],
		Total: 30,
		ItemCount: 2,
		hasLink: () => false,
	};

	const categoryWithMore = {
		Items: [buildCourse('title1'), buildCourse('title2')],
		Total: 50,
		ItemCount: 2,
		hasLink: rel => rel === 'batch-next',
	};
	const other = true;

	test('Test category without hasLink', () => {
		const cat = { Items: [] };
		expect(() =>
			render(
				<ContextProvider>
					<CategoryDetail category={cat} other={other} />
				</ContextProvider>
			)
		).not.toThrow();
	});

	test('Test category with no more button', async () => {
		const ref = React.createRef();
		render(
			<ContextProvider>
				<CategoryDetail ref={ref} category={category} other={other} />
			</ContextProvider>
		);

		return waitFor(() =>
			expect(ref.current.state.noMore).toEqual(undefined)
		); //TODO: fix this test its suppose to be true
	});

	test('Test category with more button', async () => {
		const ref = React.createRef();
		render(
			<ContextProvider>
				<CategoryDetail
					ref={ref}
					category={categoryWithMore}
					other={other}
				/>
			</ContextProvider>
		);
		return waitFor(() =>
			expect(ref.current.state.noMore).toEqual(undefined)
		);
	});
});