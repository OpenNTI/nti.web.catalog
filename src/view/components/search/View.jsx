import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { ContextIndicator } from '@nti/web-search';
import { Loading, EmptyState } from '@nti/web-commons';

import Category from '../category';
import PageError from '../PageError';

import Styles from './View.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.search.View', {
	empty: 'No courses found. Please refine your search.',
	back: 'View All Courses'
});

const getItemCount = results => results.FilteredTotalItemCount ?? results.Total;

CatalogSearch.propTypes = {
	searchTerm: PropTypes.string,
	loadResults: PropTypes.func.isRequired,
};
export default function CatalogSearch({ searchTerm, loadResults }) {
	const [results, setResults] = React.useState(null);

	React.useEffect(() => {
		setResults(null);

		if (!searchTerm) {
			return;
		}

		const buffer = setTimeout(async () => {
			try {
				const newResults = await loadResults(searchTerm);

				setResults(newResults);
			} catch (e) {
				setResults(e);
			}
		}, 300);

		return () => {
			clearTimeout(buffer);
		};
	}, [searchTerm, loadResults]);

	if (!searchTerm) {
		return null;
	}

	const error = results instanceof Error ? results : null;
	const empty = results && getItemCount(results) === 0;

	return (
		<div className={cx('catalog-search')}>
			<ContextIndicator
				className={cx('context-indicator')}
				backLabel={t('back')}
			/>
			<Loading.Placeholder
				loading={searchTerm && !results}
				fallback={<Loading.Spinner.Large />}
			>
				{error && <PageError error={error} />}
				{!error && empty && (
					<EmptyState header={t('empty')} />
				)}
				{!error && !empty && results && (
					<Category category={results} header={false} />
				)}
			</Loading.Placeholder>
		</div>
	);
}
