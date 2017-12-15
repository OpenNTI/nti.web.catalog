/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';

import Redeem from '../components/View';

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
					getDefaultAssetRoot: ()=>{}
				}
			);
		}
		else if (code.invitation_codes === 'Enrolled') {
			return Promise.reject({
				message: "You are already enrolled in this course."
			});
		}
		else {
			return Promise.reject({
				message: "Invalid invitation code."
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

	const getCmp = () => mount(
		<Redeem match={match}/>
	);

	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test redeem with empty code', () => {
		const cmp = getCmp();
		cmp.setState({codeValue: ''});
		cmp.find('button').simulate('click');
		expect(cmp.find('.error-redeem p').first().text()).toEqual(errorMessage.empty);
	});

	test('Test redeem with invalid code', async () => {
		const cmp = getCmp();
		cmp.setState({codeValue: 'Invalid'});
		cmp.find('button').simulate('click');
		await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});

		expect(cmp.state().errorMessage).toEqual(errorMessage.invalid);
	});

	test('Test redeem with enrolled code', async () => {
		const cmp = getCmp();
		cmp.setState({codeValue: 'Enrolled'});
		cmp.find('button').simulate('click');
		await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});

		expect(cmp.state().errorMessage).toEqual(errorMessage.enrolled);
	});

	test('Test redeem success', async () => {
		const cmp = getCmp();
		cmp.setState({codeValue: 'Success'});
		cmp.find('button').simulate('click');
		await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 300);
		});

		expect(cmp.state().error).toEqual(false);
	});

	test('Test redeem loading', async () => {
		const cmp = getCmp();
		cmp.setState({codeValue: 'Success'});
		cmp.find('button').simulate('click');
		expect(cmp.state().loading).toEqual(true);
		await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 300);
		});

		expect(cmp.state().loading).toEqual(false);
	});
});
