import {scoped} from '@nti/lib-locale';

const t = scoped('nti-catalog.view.component.category.Name', {
	'.nti-other': 'Others'
});

export function getName (category) {
	debugger;
	const name = category.Name ?? category;

	return t.isMissing(name) ? name : t(name);
}