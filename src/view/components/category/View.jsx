import { scoped } from '@nti/lib-locale';
import { Loading, Errors, Text } from '@nti/web-commons';
import { useReducerState } from '@nti/web-core';

import _Content from '../Content';
import ItemList from '../item-list';

import Header from './Header';

const t = scoped('nti-catalog.view.components.category.View', {
	viewMore: 'View More',
});

const Content = styled(_Content)`
	padding-top: var(--catalog-gap);
`;

const More = styled.div`
	text-align: center;
	margin: var(--catalog-gap, 18px) auto;
`;

const MoreLink = styled.a`
	display: block;
	background: var(--primary-blue);
	border-radius: 100px;
	cursor: pointer;
	color: white;
	font-size: 14px;
	font-weight: 600;
	line-height: 19px;
	text-align: center;
	padding: 6px 0 8px;
`;

/**
 * @param {object} props
 * @param {import('@nti/lib-interfaces').Batch} props.category
 * @param {string} props.categoryName
 * @param {boolean} props.header
 * @returns {JSX.Element}
 */
export default function Category({ category, categoryName, header = true }) {
	const [{ batches, loading, error }, setState] = useReducerState({
		batches: [category],
		error: null,
		loading: false,
	});

	const lastBatch = batches[batches.length - 1];
	const loadMore =
		lastBatch.hasMore &&
		(async () => {
			try {
				setState({ loading: true });

				const nextBatch = await lastBatch.next();

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
			<Content className="category-view">
				<ItemList items={items} categoryName={categoryName} />
				{loadMore && (
					<More className="category-more">
						{loading && <Loading.Spinner />}
						{!loading && error && <Errors.Message error={error} />}
						{!loading && !error && (
							<Text.Base
								as={MoreLink}
								className="view-more"
								onClick={loadMore}
							>
								{t('viewMore')}
							</Text.Base>
						)}
					</More>
				)}
			</Content>
		</>
	);
}
