import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {Router, Route, LinkTo} from '@nti/web-routing';

import View from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Root extends React.Component {

	render () {
		return (
			<div>
				<LinkTo.Path to="/">courses</LinkTo.Path> | <LinkTo.Path to="/purchased/">purchased</LinkTo.Path> | <LinkTo.Path to="/redeem/">redeem</LinkTo.Path>
				<View/>
			</div>
		);
	}
}

const TestRouter = Router.for([
	Route({path: '/', component: Root, name: 'root'})
], null, 'root');

ReactDOM.render(
	React.createElement(TestRouter, {basename: '/'}),
	document.getElementById('content')
);
