import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from 'nti-web-commons';
import {getService} from 'nti-web-client';
import {getLink} from 'nti-lib-interfaces';

const errorMessage = {
	message :{
		title: 'Message: ',
		desc: ' Message cannot be empty.'
	},
	email :{
		title: 'Email:',
		desc: ' Invalid email address.'
	}
};

export default class Contact extends React.Component {
	static propTypes = {
		showContact: PropTypes.bool,
		cancel: PropTypes.func
	}

	constructor (props) {
		super(props);

		this.state = {
			email: global.$AppConfig.username,
			message: '',
			loading: false,
			error: false
		};
	}

	changeEmail =(e) =>{
		this.setState ({email: e.target.value});
	}

	changeFeedback =(e) =>{
		this.setState ({message: e.target.value});
	}

	contactUsBodyForMessage (data) {
		let body = data.email || '[NO EMAIL SUPPLIED]';

		body += (' wrote: ' + data.message);
		return {body: body};
	}

	async sendFeed (body) {
		const service = await getService();
		const {Links: links} = await service.getAppUser();
		const link = getLink(links, 'send-feedback');
		try {
			await service.post(link, body);

			this.setState({loading: false, error:false, message:''});
			this.props.cancel();
		}
		catch (reason) {
			this.setState({loading: false, error:false});
		}
	}

	checkValidation () {
		if (!this.state.email || this.state.email === '' || this.state.email === undefined) {
			this.setState({error: true, errorMessage: errorMessage.email});
			return false;
		}

		if (!this.state.message || this.state.message === '' || this.state.message === undefined) {
			this.setState({error: true, errorMessage: errorMessage.message});
			return false;
		}

		return true;

	}

	submitContact = () => {
		if (!this.checkValidation()) {
			return;
		}
		this.setState({loading: true});
		const body = this.contactUsBodyForMessage(this.state);
		this.sendFeed(body);
	}

	cancel = () => {
		this.setState ({loading: false, error:false, message:''});
		this.props.cancel();
	}


	render () {
		if (!this.props.showContact) {
			return null;
		}
		return (
			<div className="contact-us">
				<div className="body">
					<p className="title">Contact Us...</p>
					<p className="info">Please use the form below to share your comments, report an issue,
						or suggest new features. If you need help or have a question about the features,
						please take a look at the
						<a className="link" target="blank" href="http://help.nextthought.com"> NextThought Help Site</a>
						. We may already have content there to help you.
					</p>
					{this.state.error && (
						<div className="error-message">
							<span className="err-field">{this.state.errorMessage.title}</span>
							<span className="err-desc">{this.state.errorMessage.desc}</span>
						</div>
					)}
					<div className="content">
						<input className="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>
						<textarea className="message" placeholder="Your message..." rows="7" value={this.state.message}
							onChange={this.changeFeedback}/>
					</div>
				</div>
				<div className="footer">
					<button className="submit-btn" onClick={this.submitContact} disabled={this.state.loading}>Submit</button>
					<button className="cancel-btn" onClick={this.cancel}>Cancel</button>
				</div>
				{this.state.loading && (
					<div>
						<Loading.Mask/>
					</div>
				)}
			</div>
		);
	}
}
