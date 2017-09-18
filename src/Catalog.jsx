import React from 'react';
import PropTypes from 'prop-types';

Catalog.propTypes = {
	items: PropTypes.array
};
export default function Catalog ({items}) {
	return (
		<div>
			{!items && (<span>Loading</span>)}
			{items && (<span>Total Courses: {items.length}</span>)}
		</div>
	);
}
