import React from 'react';
import PropTypes from 'prop-types';
import { Hooks, Loading } from '@nti/web-commons';

import PageError from '../../components/PageError';

const { useResolver } = Hooks;
const { isPending, isErrored, isResolved } = useResolver;

CatalogEntry.propTypes = {
	catalog: PropTypes.any,
};
export default function CatalogEntry({ catalog: resolver }) {
	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const entry = isResolved(resolver) ? resolver : null;

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			{error && <PageError error={error} />}
			{entry && <div>{entry.title}</div>}
		</Loading.Placeholder>
	);
}
