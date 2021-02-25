import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import { Routes } from '../../Constants';
import Content from '../Content';

import Styles from './Header.css';
import { getGradientClass } from './Gradient';
import { getName } from './Name';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.category.Header', {
	back: 'Back',
});

CategoryHeader.propTypes = {
	category: PropTypes.shape({
		Name: PropTypes.string,
	}),
};
export default function CategoryHeader({ category }) {
	return (
		<div className={cx('category-header', getGradientClass(category))}>
			<Content className={cx('header-content')}>
				<LinkTo.Name name={Routes.Available} className={cx('back')}>
					<i className="icon-chevron-left" />
					<Text.Base>{t('back')}</Text.Base>
				</LinkTo.Name>
				<Text.Base as="div" className={cx('name')}>
					{getName(category)}
				</Text.Base>
			</Content>
		</div>
	);
}
