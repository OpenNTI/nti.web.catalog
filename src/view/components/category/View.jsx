import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { Loading, Errors, Text } from '@nti/web-commons';

import { BatchSize } from '../../Constants';
import Content from '../Content';
import ItemList from '../item-list';

import Styles from './View.css';
import Header from './Header';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.category.View', {
	viewMore: 'View More',
});

const NEXT_STATE = (state, action) => ({
	...state,
	...action,
});

const hasNextBatch = batch =>
	batch && batch.hasLink('batch-next') && batch.Items?.length >= BatchSize;

Category.propTypes = {
	category: PropTypes.object,
	categoryName: PropTypes.bool,
	header: PropTypes.bool,
};
export default function Category({ category, categoryName, header = true }) {
	const [{ batches, loading, error }, setState] = useReducer(NEXT_STATE, {
		batches: [category],
		error: null,
		loading: false,
	});

	const lastBatch = batches[batches.length - 1];
	const loadMore =
		hasNextBatch(lastBatch) &&
		(async () => {
			try {
				setState({ loading: true });

				const service = await getService();
				const nextBatch = await service.getBatch(
					lastBatch.getLink('batch-next')
				);

				setState({ batches: [...batches, nextBatch] });
			} catch (er) {
				setState({ error: er });
			} finally {
				setState({ loading: false });
			}
		});

	const items = batches.reduce((acc, batch) => {
		return [...acc, ...batch.Items];
	}, []);

	return (
		<>
			{header && <Header category={category} />}
			<Content className={cx('category-view')}>
				<ItemList items={items} categoryName={categoryName} />
				{loadMore && (
					<div className={cx('category-more')}>
						{loading && <Loading.Spinner />}
						{!loading && error && <Errors.Message error={error} />}
						{!loading && !error && (
							<Text.Base
								as="a"
								className={cx('view-more')}
								onClick={loadMore}
							>
								{t('viewMore')}
							</Text.Base>
						)}
					</div>
				)}
			</Content>
		</>
	);
}
