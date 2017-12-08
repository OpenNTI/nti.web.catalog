import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {Router, Route, LinkTo} from 'nti-web-routing';

import View from '../../src';

import 'nti-style-common/all.scss';
import 'nti-web-commons/lib/index.css';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Root extends React.Component {

	render () {
		return (
			<div>
				<LinkTo.Path to="/widget/">courses</LinkTo.Path> | <LinkTo.Path to="/widget/purchased/">purchased</LinkTo.Path> | <LinkTo.Path to="/widget/redeem/">redeem</LinkTo.Path>
				<View/>
			</div>
		);
	}
}

const TestRouter = Router.for([
	Route({path: '/widget', component: Root, name: 'root'})
], null, 'root');

ReactDOM.render(
	React.createElement(TestRouter, {basename: '/widget'}),
	document.getElementById('content')
);
