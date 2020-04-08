import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Card} from '@nti/web-course';

import Grid from '../Grid';

import Styles from './View.css';

const cx = classnames.bind(Styles);

CatalogItemList.propTypes = {
	className: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			getID: PropTypes.func
		})
	)
};
export default function CatalogItemList ({className, items}) {
	return (
		<Grid as="ul" className={cx('catalog-item-list', className)}>
			{(items || []).map((item) => {
				return (
					<li key={item.getID()}>
						<Card course={item} collapsedToList />
					</li>
				);
			})}
		</Grid>
	);
}