import { getService } from '@nti/web-client';
import { decodeFromURI } from '@nti/lib-ntiids';

export default async function getCatalogEntry(entryId) {
	const service = await getService();

	//Payment Complete
	//Starts with uri:

	const ntiid = decodeFromURI(entryId);
	const catalogEntry = await service.getObject(ntiid);

	return catalogEntry;
}
