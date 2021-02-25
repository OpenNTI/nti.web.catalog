import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Text, EmptyState } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { NTIOtherCategory } from '../../Constants';
import Content from '../Content';
import Grid from '../Grid';
import Preview from '../category/Preview';
import Pill from '../category/Pill';

import Styles from './View.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.categories', {
	topCategories: 'Top Categories',
	empty: 'There are no courses available.',
});

function getCategoryParts(categories) {
	return categories.reduce(
		(acc, category) => {
			if (category.Name === NTIOtherCategory) {
				acc.other = category;
			} else if (category.ItemCount < 4) {
				acc.collapsed.push(category);
			} else {
				acc.expanded.push(category);
			}

			return acc;
		},
		{ collapsed: [], expanded: [], other: null }
	);
}

Categories.propTypes = {
	categories: PropTypes.array,
};
export default function Categories({ categories }) {
	if (!categories || !categories.length) {
		return (
			<Content className={cx('catalog-categories')}>
				<EmptyState header={t('empty')} />
			</Content>
		);
	}

	const { collapsed, expanded, other } = getCategoryParts(categories);

	return (
		<Content className={cx('catalog-categories')}>
			{expanded.length > 0 && (
				<ul className={cx('expanded')}>
					{expanded.map((category, index) => {
						return (
							<li key={index}>
								<Preview category={category} />
							</li>
						);
					})}
				</ul>
			)}
			{collapsed.length > 0 && (
				<Text.Base as="div" className={cx('categories-header')}>
					{t('topCategories')}
				</Text.Base>
			)}
			{collapsed.length > 0 && (
				<Grid as="ul" className={cx('collapsed')} allowTwoColumns>
					{collapsed.map((category, index) => {
						return (
							<li key={index}>
								<Pill category={category} />
							</li>
						);
					})}
				</Grid>
			)}
			{other && <Preview category={other} />}
		</Content>
	);
}
