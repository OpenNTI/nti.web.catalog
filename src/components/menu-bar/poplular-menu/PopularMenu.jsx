import React from 'react';
import PropTypes from 'prop-types';
import {encodeForURI} from 'nti-lib-ntiids';

export default class PopularMenu extends React.Component {
	static propTypes = {
		data: PropTypes.array
	}

	openLink = (title) => () => {
		alert ('you click on course ha ha: ' + title);
	}

	render () {
		//if no data return null
		if (!this.props.data || this.props.data.length === 0) {
			return null;
		}

		const courses = this.props.data.slice(0,5);

		return (
			<div className="item popular-block">
				<p className="title-sidebar">POPULAR COURSES</p>
				<ol>
					{courses.map ((item, index) => {
						return (
							<li key={index}>
								<span>{index + 1}</span>
								<a href={`./object/${encodeForURI(item.NTIID)}`}>{item.title}</a>
							</li>
						);
					})}
				</ol>
			</div>
		);
	}
}
