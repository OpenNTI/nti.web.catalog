import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Text, EmptyState, Layouts } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import { NTIOtherCategory } from '../../Constants';
import Content from '../Content';
import Grid from '../Grid';
import Preview from '../category/Preview';
import Pill from '../category/Pill';

import Styles from './View.css';

const PillGrid = Layouts.grid('48%', '2%');

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.categories', {
	topCategories: 'Top Categories',
	empty: 'There are no courses available.',
});


const TagPillOnlyHosts = /epiccharterschools/;
const getPillsOnly = () => {
	const origin = global.location?.origin;

	return origin?.match(TagPillOnlyHosts);
};

function getCategoryParts(categories) {
	const pillsOnly = getPillsOnly();

	return categories.reduce((acc, category) => {
		if (category.Name === NTIOtherCategory || category.tag === NTIOtherCategory) {
			acc.other = category;
		} else if (category.count < 4 || pillsOnly) {
			acc.collapsed.push(category);
		} else {
			acc.expanded.push(category);
		}

		return acc;
	}, {collapsed: [], expanded: [], other: null});
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

	const { collapsed, expanded, other } = React.useMemo(() => getCategoryParts(categories), [categories]);

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
				<Grid>
					{(columns) => (
						<Text.Base as="div" className={cx('categories-header', {full: columns >= 4})}>
							{t('topCategories')}
						</Text.Base>
					)}
				</Grid>
			)}
			{collapsed.length > 0 && (
				<Grid className={cx('collapsed')}>
					{(columns) => {
						const pills = collapsed.map((category, index) => {
							return (
								<li key={index}>
									<Pill category={category} />
								</li>
							);
						});

						if (columns > 1) { return pills; }

						return (<PillGrid colWidth="48%" gap="2%" className={cx('pill-grid')}>{pills}</PillGrid>);
					}}
				</Grid>
			)}
			{other && <Preview category={other} />}
		</Content>
	);
}
