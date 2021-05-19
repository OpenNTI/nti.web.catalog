import React from 'react';
import PropTypes from 'prop-types';

import { Prompt, Hooks } from '@nti/web-commons';

import View from './View';
import getCatalogEntry from './get-catalog-entry';

const { useResolver } = Hooks;
// const {isResolved} = useResolver;

const Container = styled('div').attrs(({ onDismiss, ...other }) => ({
	...other,
}))`
	background: white;
	min-height: 400px;
	min-width: 400px;
`;

CatalogEntryModal.propTypes = {
	entryId: PropTypes.string,
};
export default function CatalogEntryModal({ entryId }) {
	const resolver = useResolver(() => getCatalogEntry(entryId), [entryId]);
	// const catalog = isResolved(resolver) ? resolver : null;

	return (
		<Prompt.Dialog>
			<Container>
				<View catalogEntry={resolver} />
			</Container>
		</Prompt.Dialog>
	);
}
