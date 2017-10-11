import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TagMenu extends Component {
	static propTypes = {
		data: PropTypes.array
	}

	selectTag = (title) => () => {
		alert('you click on tag: ' + title);
	}

	render() {
		//if no data return null
		if (!this.props.data) {
			return null;
		}

		return (
			<div className="item tag-block">
				<p className="title-sidebar">BROWSE BY TAG</p>
				<ul>
					{this.props.data.map((item, index) => {
						if (index < 5) {
							return (
								<li key={index}>
									<p onClick={this.selectTag(item.title)}>{item.title}</p>
								</li>
							);
						}
					})}
				</ul>
			</div>
		);
	}
}
