import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Prompt, Hooks } from '@nti/web-commons';

import View from './View';
import getCatalogEntry from './get-catalog-entry';

const t = scoped('catalog.entry', {
	title: 'Course Info',
});

const { useResolver } = Hooks;

const Container = styled(Prompt.BaseWindow)`
	min-width: 400px;
	min-height: 400px;
`;

CatalogEntryModal.propTypes = {
	entryId: PropTypes.string,
};
export default function CatalogEntryModal({ entryId }) {
	const resolver = useResolver(() => getCatalogEntry(entryId), [entryId]);
	// const catalog = isResolved(resolver) ? resolver : null;

	return (
		<Prompt.Dialog>
			<Container
				title={t('title')}
				// doClose={closePrompt}
				buttons={[]}
			>
				<View catalogEntry={resolver} />
			</Container>
		</Prompt.Dialog>
	);
}
