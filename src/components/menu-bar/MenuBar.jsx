import React from 'react';
import PropTypes from 'prop-types';

import PopularMenu from './poplular-menu/PopularMenu';
import TagMenu from './tag-menu/TagMenu';

MenuBar.propTypes = {
	data: PropTypes.shape ({
		popular: PropTypes.array,
		tag: PropTypes.array
	}),
};

export default function MenuBar (data) {
	return (
		<div className="side-bar-left">
			<PopularMenu data={data.popular}/>
			<TagMenu data={data.tag}/>
		</div>
	);
}
