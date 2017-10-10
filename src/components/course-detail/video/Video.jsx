import React, {Component} from 'react';

class Video extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let self = this;
		return (
			<div className="video">
				<iframe src={self.props.videoUrl} frameBorder="0" allowFullScreen=""/>
			</div>
		);
	}
}

export default Video;
