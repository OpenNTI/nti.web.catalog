
import { Hooks } from '@nti/web-commons';

import View from './View';
import getCatalogEntry from './get-catalog-entry';

const { useResolver } = Hooks;

export default function CatalogEntryPage({ entryId }) {
	const catalogEntry = useResolver(() => getCatalogEntry(entryId), [entryId]);
	return <View catalogEntry={catalogEntry} />;
}
