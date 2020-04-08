import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Content.css';

const cx = classnames.bind(Styles);

Content.propTypes = {
	className: PropTypes.string
};
export default function Content ({className, ...otherProps}) {
	return (
		<section className={cx(className, 'catalog-content')} {...otherProps} />
	);
}