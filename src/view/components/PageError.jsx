import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Errors } from '@nti/web-commons';

import Styles from './PageError.css';

const cx = classnames.bind(Styles);

PageError.propTypes = {
	className: PropTypes.string,
};
export default function PageError({ className, ...otherProps }) {
	return (
		<Errors.Message
			className={cx('catalog-page-error', className)}
			{...otherProps}
		/>
	);
}
