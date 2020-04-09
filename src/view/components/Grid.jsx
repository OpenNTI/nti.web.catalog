import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Grid.css';

const cx = classnames.bind(Styles);

CatalogGrid.propTypes = {
	className: PropTypes.string,
	as: PropTypes.any,
	allowTwoColumns: PropTypes.bool
};
export default function CatalogGrid ({className, as: tag, allowTwoColumns, ...otherProps}) {
	const Cmp = tag || 'div';

	return (
		<Cmp className={cx('catalog-grid', className, {'allow-two-columns': allowTwoColumns})} {...otherProps} />
	);
}