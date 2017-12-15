/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Redeem from '../components/View';

const mockService = () => ({
	getCollection: (o) => Promise.resolve(o)
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
	};

	const match = {params:{}};

	const getCmp = () => mount(
		<Redeem match={match}/>
	);

	beforeEach(onBefore);
	afterEach(onAfter);

	test('Test redeem with empty code', () => {
		const cmp = getCmp();
		cmp.setState({codeValue:''});
		cmp.find('button').simulate('click');
		expect(cmp.find('.error-redeem p').first().text()).toEqual(errorMessage.empty);
	});
});
