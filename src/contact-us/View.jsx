import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from 'nti-web-commons';

export default class Contact extends React.Component {
	static propTypes = {
		showContact: PropTypes.bool,
		cancel: PropTypes.func
	}

	constructor (props) {
		super(props);

		this.state = {
			email: global.$AppConfig.username,
			feedback: '',
			loading: false
		};
	}

	changeEmail =(e) =>{
		this.setState ({email: e.target.value});
	}

	changeFeedback =(e) =>{
		this.setState ({feedback: e.target.value});
	}

	submitContact = () => {
		this.props.cancel();
	}

	componentDidMount () {
		this.setState ({loading: false});
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
					<div className="content">
						<input className="email" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>
						<textarea className="message" placeholder="Your message..." rows="7" value={this.state.feedback}
							onChange={this.changeFeedback}/>
					</div>
				</div>
				<div className="footer">
					<button className="submit-btn" onClick={this.submitContact} disabled={this.state.loading}>Submit</button>
					<button className="cancel-btn" onClick={this.props.cancel}>Cancel</button>
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
