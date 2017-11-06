import React from 'react';
import PropTypes from 'prop-types';

Video.propTypes = {
	videoUrl: PropTypes.string
};

export default function Video (props) {
	return (
		<div className="course-catalog-course-video video">
			<iframe src={props.videoUrl} frameBorder="0" allowFullScreen=""/>
		</div>
	);
}
