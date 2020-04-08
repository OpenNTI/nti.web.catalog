import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {Layouts, Text} from '@nti/web-commons';

import ItemList from '../item-list';

import Styles from './Preview.css';
import {getName} from './Name';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.category.Preview', {
	viewAll: 'View All'
});

const {Responsive} = Layouts;

CategoryPreview.propTypes = {
	className: PropTypes.string,
	category: PropTypes.shape({
		Name: PropTypes.string,
		Items: PropTypes.array
	}).isRequired
};
export default function CategoryPreview ({className, category}) {
	const {Items: items} = category;

	if (!items) { return null; }

	return (
		<div className={cx('category-preview', className)}>
			<div className={cx('header')}>
				<Text.Base as="div" className={cx('title')}>
					{getName(category)}
				</Text.Base>
				<LinkTo.Object className={cx('view-all')} object={category} context="category.preview">
					<Text.Base>{t('viewAll')}</Text.Base>
					<i className="icon-chevronup-25" />
				</LinkTo.Object>
			</div>
			<Responsive.Item query={Responsive.isMobile} component={ItemList} items={items.slice(0, 3)} />
			<Responsive.Item query={Responsive.not(Responsive.isMobile)} component={ItemList} items={items.slice(0, 4)} />
		</div>
	);
}