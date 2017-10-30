import React from 'react';
import PropTypes from 'prop-types';

export default class TagMenu extends React.Component {
	static propTypes = {
		data: PropTypes.array
	}

	selectTag = (title) => () => {
		alert ('you click on tag: ' + title);
	}

	render () {
		//if no data return null
		if (!this.props.data && this.props.data.length === 0) {
			return null;
		}

		const tags = this.props.data.slice (0, 5);

		return (
			<div className="item tag-block">
				<p className="title-sidebar">BROWSE BY TAG</p>
				<ul>
					{tags.map ((item, index) => {
						return (
							<li key={index}>
								<a onClick={this.selectTag (item.title)}>{item.title}</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
