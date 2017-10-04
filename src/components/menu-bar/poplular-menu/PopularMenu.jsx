import React, {Component} from 'react';
import PropType from 'prop-types';

class PopularMenu extends Component {
	constructor(props) {
		super(props);
		this.openLink = this.openLink.bind(this);
	}

	openLink = (title) => () => {
		alert('you click on course: ' + title);
	}

	render() {
		let self = this;

		//if no data return null
		if (!self.props.data) {
			return null;
		}

		//map data to list
		let itemList = [];
		for (let i = 0; i < self.props.data.length; i++) {
			let rowData = (<li key={i}><span>{i + 1}</span>
				<p onClick={self.openLink(self.props.data[i].title)}>{self.props.data[i].title}</p>
			</li>);
			itemList.push(rowData);

			// up to 5 rows
			if (i === 4) {
				break;
			}
		}

		return (
			<div className="item popular-block">
				<p className="title-sidebar">POPULAR COURSES</p>
				<ol>
					{itemList}
				</ol>
			</div>
		);
	}
}

PopularMenu.PropTypes = {
	data: PropType.array
};

export default PopularMenu;
