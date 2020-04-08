import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import {NTIOtherCategory} from '../../Constants';
import Content from '../Content';
import Preview from '../category/Preview';
import Pill from '../category/Pill';

import Styles from './View.css';

const cx = classnames.bind(Styles);

function getCategoryParts (categories) {
	return categories.reduce((acc, category) => {
		if (category.Name === NTIOtherCategory) {
			acc.other = category;
		} else if (category.ItemCount < 4) {
			acc.collapsed.push(category);
		} else {
			acc.expanded.push(category);
		}

		return acc;
	}, {collapsed: [], expanded: [], other: null});
}

Categories.propTypes = {
	categories: PropTypes.array
};
export default function Categories ({categories}) {
	const {collapsed, expanded, other} = getCategoryParts(categories);

	return (
		<Content className={cx('catalog-categories')}>
			<ul className={cx('expanded')}>
				{expanded.map((category, index) => {
					return (
						<li key={index}>
							<Preview category={category} />
						</li>
					);
				})}
			</ul>
			<ul className={cx('collapsed')}>
				{collapsed.map((category, index) => {
					return (
						<li key={index}>
							<Pill category={category} />
						</li>
					);
				})}
			</ul>
			{other && (
				<Preview category={other} />
			)}
		</Content>
	);
}