import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Loading, EmptyState } from '@nti/web-commons';
import { ContextIndicator } from '@nti/web-search';
import { scoped } from '@nti/lib-locale';

import GridCard from '../../grid-card/components/GridCard';
import * as Constants from '../../Constants';

Search.propTypes = {
	term: PropTypes.string,
	courses: PropTypes.object,
	loading: PropTypes.bool,
	isSearchPurchased: PropTypes.bool,
};

const SEARCH_TEXT = {
	empty: 'No courses found. Please refine your search.',
	back: 'View All Courses',
};

const t = scoped('catalog.search.components.View', SEARCH_TEXT);

export default function Search(props) {
	const { courses, loading, term, isSearchPurchased } = props;
	const count =
		courses.FilteredTotalItemCount != null
			? courses.FilteredTotalItemCount
			: courses.Total;

	return (
		<div>
			<div className="search-result">
				<ContextIndicator
					className="context-indicator"
					backLabel={t('back')}
				/>
			</div>
			{loading && (
				<div className="search-loading">
					<Loading.Mask />
				</div>
			)}
			{!loading && count === 0 && (
				<div className="content-catalog no-sidebar">
					<EmptyState header={t('empty')} />
				</div>
			)}
			{!loading && count > 0 && (
				<div className="content-catalog no-sidebar">
					<GridCard
						category={courses}
						type={Constants.SEARCH}
						search={term}
						isSearchPurchased={isSearchPurchased}
					/>
				</div>
			)}
		</div>
	);
}
