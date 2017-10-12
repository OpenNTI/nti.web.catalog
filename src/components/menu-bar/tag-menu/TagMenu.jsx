import React, {Component} from 'react';
import PropType from 'prop-types';

class TagMenu extends Component {
	constructor(props) {
		super(props);
		this.selectTag = this.selectTag.bind(this);
	}

	selectTag = (title) => () => {
		alert('you click on tag: ' + title);
	}

	render() {
		let self = this;

		//if no data return null
		if (!self.props.data) {
			return null;
		}

		//map data to list
		let listItem = [];

		for (let i = 0; i < self.props.data.length; i++) {
			let row = (<li key={i}>
				<a onClick={self.selectTag(self.props.data[i].title)}>{self.props.data[i].title}</a>
			</li>);
			listItem.push(row);

			// up to 5 rows
			if (i === 4) {
				break;
			}
		}
		return (
			<div className="item tag-block">
				<p className="title-sidebar">BROWSE BY TAG</p>
				<ul>
					{listItem}
				</ul>
			</div>
		);
	}
}

TagMenu.PropTypes = {
	data: PropType.array
};

export default TagMenu;
