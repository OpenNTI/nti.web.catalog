import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';

export default class PopularMenu extends Component {
	static propTypes = {
		data: PropTypes.array
	}

	openLink = (title) => () => {
		alert ('you click on course ha ha: ' + title);
	}

	render () {
		//if no data return null
		if (!this.props.data) {
			return null;
		}

		return (
			<div className="item popular-block">
				<p className="title-sidebar">POPULAR COURSES</p>
				<ol>
					{this.props.data.map ((item, index) => {
						if (index < 5) {
							return (
								<li key={index}>
									<span>{index + 1}</span>
									<a href={`./object/${encodeForURI(item.NTIID)}`}>{item.title}</a>
								</li>
							);
						}
					})}
				</ol>
			</div>
		);
	}
}
