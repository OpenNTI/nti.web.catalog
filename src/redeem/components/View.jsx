import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from 'nti-web-commons';
import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';
import {encodeForURI} from 'nti-lib-ntiids';
import {getHistory} from 'nti-web-routing';

export default class Redeem extends React.Component {
	static propTypes = {
		inviteLink: PropTypes.string,
		redeemCollection: PropTypes.object,
		service: PropTypes.object,
		match: PropTypes.object
	};

	constructor (props) {
		super (props);

		const initialCode = props.match.params.code;

		this.state = {
			error: false,
			errorMessage: 'Could not redeem course code',
			codeValue: initialCode || '',
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

	async redeem (link, param) {
		try {
			const service = await getService();
			const result = await service.post(link, param);

			const history = getHistory();
			const detailLink = `./object/${encodeForURI(result.CatalogEntryNTIID)}` + '?redeem=1';
			history.replace(detailLink);
			this.setState({codeValue: '', loading: false});
		}
		catch (reason) {
			const err = reason.message || 'Error with the code.';
			this.setState({error: true, errorMessage: err, loading: false, inputErrClass: 'error-input-redeem'});

		}
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
		this.setState ({loading: true});

		const link = getLink(this.state.links, 'accept-course-invitations');
		this.redeem(link, redeemCode);
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
