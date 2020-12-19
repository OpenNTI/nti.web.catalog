/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '@testing-library/react';

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

	const getCmp = () => {
		const ref = React.createRef();
		return {
			ref,
			...render(
				<ContextProvider>
					<Carousel
						ref={ref}
						data={data}
						carouselSelected={index}
						selectCarousel={selectCarousel}
					/>
				</ContextProvider>
			)};
	};

	test('Test click next carousel', async () => {
		const {container} = getCmp();

		const nextButton = container.querySelector('.icon-chevronup-25');

		fireEvent.click(nextButton);

		return waitFor(() =>
			expect(selectCarousel).toHaveBeenCalled());
	});

	test('Test click pre carousel', async () => {
		const {container} = getCmp();

		const preButton = container.querySelector('.icon-chevrondown-25');

		fireEvent.click(preButton);

		return waitFor(() =>
			expect(selectCarousel).toHaveBeenCalled());
	});

	test('Test change carousel selected index when click next', async () => {
		const {container} = getCmp();

		expect(container.querySelector('.course-id').textContent).toEqual('ITEM1');
		fireEvent.click(container.querySelector('.icon-chevronup-25'));

		return waitFor(() => {
			const [item2, item1] = container.querySelectorAll('.course-id');
			expect(item1.textContent).toEqual('ITEM1');
			expect(item2.textContent).toEqual('ITEM2');
		});
	});

	test('Test change carousel selected index when click previous', async () => {
		const {container} = getCmp();

		expect(container.querySelector('.course-id').textContent).toEqual('ITEM1');
		fireEvent.click(container.querySelector('.icon-chevrondown-25'));

		return waitFor(() => {
			const [item3, item1] = container.querySelectorAll('.course-id');
			expect(item1.textContent).toEqual('ITEM1');
			expect(item3.textContent).toEqual('ITEM3');
		});
	});
});
