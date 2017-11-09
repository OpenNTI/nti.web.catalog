import React from 'react';
import PropTypes from 'prop-types';

export default class Redeem extends React.Component {
	static propTypes = {
		inviteLink: PropTypes.string
	};

	constructor (props) {
		super (props);
		this.state = {
			error: false,
			errorMessage: 'Could not redeem course code',
			codeValue: null,
			loading: false,
			success: false
		};
	}

	handleChange = (e) => {
		this.setState ({codeValue: e.target.value, error: false});
	}

	redeemCourse = () => {
		const url = this.props.inviteLink;
		const redeemCode = {'invitation_codes': this.state.codeValue};

		let me = this;
		this.setState({loading: true});

		this.__submitJSON (redeemCode, url, 'POST')
			.then (function (results) {
				me.setState ({loading: false, success:true});
				setTimeout(() => {
					me.setState({ success:false});
				}, 3000);
				return results;
			})
			.catch (function (reason) {
				const res = JSON.parse(reason.responseText);
				const err = res.message || 'Error with the code.';
				me.setState ({error: true, errorMessage: err, loading:false});
				// return Promise.reject (reason);
			});


	}

	__buildXHR (url, method, success, failure) {
		var xhr = new XMLHttpRequest ();
		xhr.open (method || 'POST', url, true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					success (xhr.responseText);
				} else {
					failure ({
						status: xhr.status,
						responseText: xhr.responseText
					});
				}
			}
		};

		xhr.setRequestHeader ('X-Requested-With', 'XMLHttpRequest');

		return xhr;
	}

	__submitJSON (values, url, method) {
		var me = this;

		return new Promise (function (fulfill, reject) {
			var xhr = me.__buildXHR (url, method, fulfill, reject);

			xhr.setRequestHeader ('Content-Type', 'application/json');
			xhr.send (JSON.stringify (values));
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
						<input type="text" name="txtredeem" placeholder="Enter your redemption code"
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
