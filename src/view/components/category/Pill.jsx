import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { LinkTo } from '@nti/web-routing';
import { Text } from '@nti/web-commons';

import { RouteContexts } from '../../Constants';

import Styles from './Pill.css';
import { getGradientClass } from './Gradient';
import { getName } from './Name';

const cx = classnames.bind(Styles);

CategoryPill.propTypes = {
	category: PropTypes.object,
	className: PropTypes.string,
};
export default function CategoryPill({ category, className }) {
	return (
		<LinkTo.Object
			object={category}
			context={RouteContexts.CategoryPill}
			className={cx(
				'category-pill',
				className,
				getGradientClass(category)
			)}
		>
			<Text.Base limitLines={2}>{getName(category)}</Text.Base>
		</LinkTo.Object>
	);
}
