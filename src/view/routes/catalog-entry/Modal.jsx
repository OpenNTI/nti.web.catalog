import React from 'react';

import { scoped } from '@nti/lib-locale';
import { StandardUI, Prompt, Hooks } from '@nti/web-commons';

import View from './View';
import getCatalogEntry from './get-catalog-entry';

const t = scoped('catalog.entry', {
	title: 'Course Info',
});

const { useResolver } = Hooks;

const Identifier = styled.div`
	font-size: 10px;
	color: var(--tertiary-grey);
	font-weight: 400;
`;

const CourseTitle = styled.div`
	color: var(--tertiary-grey);
`;

/**
 * Provides the content for the modal's title bar
 *
 * @param {Object} props
 * @param {Object} props.catalogEntry The CatalogEntry model from which to derive the header content
 * @param {string} props.catalogEntry.title
 * @param {string} props.catalogEntry.ProviderUniqueID
 * @returns {JSX.Element}
 */
function Title({ catalogEntry: { title, ProviderUniqueID: courseId } = {} }) {
	return (
		<StandardUI.Box pb="sm">
			<Identifier>{courseId}</Identifier>
			<CourseTitle>{title ?? t('title')}</CourseTitle>
		</StandardUI.Box>
	);
}

/**
 * @param {Object} props
 * @param {string} props.entryId The ID of the catalog entry to display
 * @param {() => void} props.onClose Invoked to close the modal
 * @returns {JSX.Element}
 */
export default function CatalogEntryModal({ entryId, onClose }) {
	const resolver = useResolver(() => getCatalogEntry(entryId), [entryId]);

	// waiting on isResolved only to avoid jarring dom re-layout; not strictly necessary
	return !useResolver.isResolved(resolver) ? null : (
		<Prompt.Dialog>
			<Prompt.BaseWindow
				title={<Title catalogEntry={resolver} />}
				doClose={onClose}
			>
				<View catalogEntry={resolver} />
			</Prompt.BaseWindow>
		</Prompt.Dialog>
	);
}
