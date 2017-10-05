import React, {Component} from 'react';
import PopularMenu from'./poplular-menu/PopularMenu';
import TagMenu from './tag-menu/TagMenu';
import PropType from 'prop-types';

class MenuBar extends Component{
	render(){
		let self = this;
		return(
			<div className="side-bar-left">
				<PopularMenu data={self.props.data.popularCourses}/>
				<TagMenu data={self.props.data.tag}/>
			</div>
		);
	}
}

MenuBar.PropTypes = {
	data: PropType.shape({
		popularCourses: PropType.array,
		tag: PropType.array
	})
};

export default MenuBar;
