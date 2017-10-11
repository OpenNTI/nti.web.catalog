import React from 'react';
import PopularMenu from './poplular-menu/PopularMenu';
import TagMenu from './tag-menu/TagMenu';
import RedeemBar from './redeem-bar/RedeemBar.jsx';
import PropTypes from 'prop-types';

MenuBar.propTypes = {
	data: PropTypes.shape({
		popular: PropTypes.array,
		tag: PropTypes.array
	}),
};

export default function MenuBar(data) {
	return (
		<div className="side-bar-left">
			<PopularMenu data={data.popular}/>
			<TagMenu data={data.tag}/>
			<RedeemBar/>
		</div>
	);
}
