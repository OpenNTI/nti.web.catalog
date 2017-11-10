import React from 'react';
import PropTypes from 'prop-types';

export default class Redeem extends React.Component {
	static propTypes = {
		inviteLink: PropTypes.string,
		service: PropTypes.object
	};

	constructor (props) {
		super (props);
		this.state = {
			error: false,
			errorMessage: 'Could not redeem course code',
			codeValue: null,
			loading: false,
			success: false,
			inputErrClass: ''
		};
	}

	handleChange = (e) => {
		this.setState ({codeValue: e.target.value, error: false, inputErrClass: ''});
	}

	redeemCourse = () => {
		if (!this.state.codeValue || this.state.codeValue === '') {
			this.setState ({
				error: true,
				errorMessage: 'Could not redeem course code',
				inputErrClass: 'error-input-redeem'
			});
			return;
		}
		const url = this.props.inviteLink;
		const redeemCode = {'invitation_codes': this.state.codeValue};

		let me = this;
		this.setState ({loading: true});

		this.props.service.post(url, redeemCode)
			.then(function (results) {
				me.setState({loading: false, success: true});
				setTimeout(() => {
					me.setState({success: false});
				}, 3000);
				return results;
			})
			.catch(function (reason) {
				const res = JSON.parse(reason.responseText) || {};
				const err = res.message || 'Error with the code.';
				me.setState({error: true, errorMessage: err, loading: false, inputErrClass: 'error-input-redeem'});
				// return Promise.reject (reason);
			});
	}

	render () {
		return (
			<div className="course-catalog">
				{this.state.success && (
					<div className="success-redeem">
						<p>You have been enrolled.</p>
						<span className="close-alert"/>
					</div>
				)}
				<div className="redeem-class">
					<div className="redeem-txt">
						<h3>Redeem a Course</h3>
						<p>Please provide a redemption code below to redeem your course.</p>
					</div>
					<div className="input-redeem">
						<input type="text" className={this.state.inputErrClass} name="txtredeem" placeholder="Enter your redemption code"
							onChange={this.handleChange}/>
						<button onClick={this.redeemCourse}>Redeem</button>
					</div>
					{this.state.loading && (
						<div className="loading-redeem">
							<p>loading...</p>
						</div>
					)}
					{this.state.error && (
						<div className="error-redeem">
							<p>{this.state.errorMessage}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}
