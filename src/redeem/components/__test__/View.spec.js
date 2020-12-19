/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Redeem from '../View';

const mockService = () => ({
	getCollection: (o) => {
		return Promise.resolve({
			Links: [{rel: 'accept-course-invitations'}]
		});
	},
	post: (link, code) => {
		if (code.invitation_codes === 'Success') {
			return Promise.resolve(
				{
					CatalogEntryNTIID: 'tag:nextthought.com,2011-10:NTI-CourseInfo-Alpha_NTI_1010',
					getDefaultAssetRoot: () => {
					}
				}
			);
		}
		else if (code.invitation_codes === 'Enrolled') {
			return Promise.reject({
				message: 'You are already enrolled in this course.'
			});
		}
		else {
			return Promise.reject({
				message: 'Invalid invitation code.'
			});
		}
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

describe('Redeem', () => {
	const errorMessage = {
		empty: 'Could not redeem course code',
		invalid: 'Invalid invitation code.',
		enrolled: 'You are already enrolled in this course.'
	};

	const match = {params: {}};

	const getCmp = () => {
		const ref = React.createRef();
		return {
			ref,
			...render(<Redeem ref={ref} match={match}/>)
		};
	};

	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test redeem with empty code', async () => {
		const {ref, container, findByText} = getCmp();
		ref.current.setState({codeValue: ''});
		fireEvent.click(container.querySelector('button'));
		await findByText(errorMessage.empty);
		expect(container.querySelector('.error-redeem p').textContent).toEqual(errorMessage.empty);
	});

	test('Test redeem with invalid code', async () => {
		const {container, ref} = getCmp();
		ref.current.setState({codeValue: 'Invalid'});
		fireEvent.click(container.querySelector('button'));

		return waitFor(() =>
			expect(ref.current.state.errorMessage).toEqual(errorMessage.invalid));
	});

	test('Test redeem with enrolled code', async () => {
		const {ref, container} = getCmp();
		ref.current.setState({codeValue: 'Enrolled'});
		fireEvent.click(container.querySelector('button'));

		return waitFor(() =>
			expect(ref.current.state.errorMessage).toEqual(errorMessage.enrolled));
	});

	test('Test redeem success', async () => {
		const {ref, container} = getCmp();
		ref.current.setState({codeValue: 'Success'});
		fireEvent.click(container.querySelector('button'));

		return waitFor(() =>
			expect(ref.current.state.error).toEqual(false));
	});

	test('Test redeem loading', async () => {
		const {ref, container} = getCmp();
		ref.current.setState({codeValue: 'Success'});
		expect(ref.current.state.loading).toEqual(false);
		fireEvent.click(container.querySelector('button'));
		expect(ref.current.state.loading).toEqual(true);

		return waitFor(() => {
			expect(ref.current.state.loading).toEqual(false);
		});
	});
});
