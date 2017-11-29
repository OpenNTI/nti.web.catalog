import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from 'nti-web-commons';
import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';
import {encodeForURI} from 'nti-lib-ntiids';

export default class Redeem extends React.Component {
	static propTypes = {
		inviteLink: PropTypes.string,
		redeemCollection: PropTypes.object,
		service: PropTypes.object
	};

	constructor (props) {
		super (props);
		this.state = {
			error: false,
			errorMessage: 'Could not redeem course code',
			codeValue: '',
			loading: false,
			success: false,
			inputErrClass: ''
		};
	}

	async componentDidMount () {
		const service = await getService();
		const links = service.getCollection('Invitations', 'Invitations');
		this.setState({links: links});
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
		const redeemCode = {'invitation_codes': this.state.codeValue};

		let me = this;
		this.setState ({loading: true});

		const link = getLink(this.state.links, 'accept-course-invitations');
		getService().then(service => {
			service.post(link, redeemCode)
				.then(function (results) {
					me.setState({loading: false, success: true});
					setTimeout(() => {
						me.setState({success: false, codeValue:''});
					}, 3000);

					//open course detail and go ro course page
					const detailLink = `./object/${encodeForURI (results.CatalogEntryNTIID)}` + '?redeem=1';
					window.open (detailLink, '_self');
				})
				.catch(function (reason) {
					const err = reason.message || 'Error with the code.';
					me.setState({error: true, errorMessage: err, loading: false, inputErrClass: 'error-input-redeem'});
					// return Promise.reject (reason);
				});
		});
	}

	render () {
		const redeem = this.state;

		if (!redeem) {
			return null;
		}
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
							value={this.state.codeValue} onChange={this.handleChange}/>
						<button onClick={this.redeemCourse}>Redeem</button>
					</div>
					{this.state.loading && (
						<div className="loading-redeem">
							<Loading.Mask/>
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
