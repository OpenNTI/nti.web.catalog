import React from 'react';
import PropTypes from 'prop-types';
import {Loading, EmptyState} from 'nti-web-commons';
import {ContextIndicator} from 'nti-web-search';

import GridCard from '../../grid-card/components/GridCard';
import * as Constants from '../../Constants';

Search.propTypes = {
	term: PropTypes.string,
	courses: PropTypes.array,
	loading: PropTypes.bool
};

export default function Search (props) {
	const noResult = 'No courses found. Please refine your search.';
	return (
		<div>
			<div className="search-result">
				<ContextIndicator className="context-indicator" backLabel="View All Courses"/>
			</div>
			{props.loading && (
				<div className="search-loading">
					<Loading.Mask/>
				</div>
			)}
			{!props.loading && props.courses.length === 0 && (
				<div className="content-catalog no-sidebar">
					<EmptyState header= {noResult}/>
				</div>
			)}
			{!props.loading && props.courses.length > 0 && (
				<div className="content-catalog no-sidebar">
					<GridCard courses={props.courses} type={Constants.SEARCH}/>
				</div>
			)}
		</div>

	);
}
