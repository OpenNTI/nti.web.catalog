import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {ContextIndicator} from '@nti/web-search';
import {Loading} from '@nti/web-commons';

import Category from '../category';
import PageError from '../PageError';

import Styles from './View.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.components.search.View', {
	back: 'View All Courses'
});


CatalogSearch.propTypes = {
	searchTerm: PropTypes.string,
	loadResults: PropTypes.func.isRequired
};
export default function CatalogSearch ({searchTerm, loadResults}) {
	const [results, setResults] = React.useState(null);

	React.useEffect(() => {
		setResults(null);

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

	if (!searchTerm) { return null; }

	const error = results instanceof Error ? results : null;

	return (
		<div className={cx('catalog-search')}>
			<ContextIndicator className={cx('context-indicator')} backLabel={t('back')} />
			<Loading.Placeholder loading={searchTerm && !results} fallback={<Loading.Spinner.Large />}>
				{error && (<PageError error={error} />)}
				{!error && results && (<Category category={results} noHeader />)}
			</Loading.Placeholder>
		</div>
	);
}