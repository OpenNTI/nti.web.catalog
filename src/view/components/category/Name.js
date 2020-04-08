import {scoped} from '@nti/lib-locale';

const t = scoped('nti-catalog.view.component.category.Name', {
	'.nti_other': 'Others'
});

export function getName (category) {
	const name = category.Name ?? category;

	return t.isMissing(name) ? name : t(name);
}