import classnames from 'classnames/bind';

import { String as StringUtils } from '@nti/lib-commons';

import Styles from './Gradient.css';

const cx = classnames.bind(Styles);

export const Names = [
	'orange',
	'yellow',
	'green',
	'blue',
	'dark-blue',
	'purple',
	'pink',
	'red',
	'black',
	'grey',
];
export const Classes = Names.reduce((acc, name) => {
	return { ...acc, [name]: cx(name, 'category-gradient') };
}, {});

export function getGradientClass(category) {
	const name = category.Name ?? category.tag ?? category;
	const hash = StringUtils.hash(name);
	const index = Math.abs(hash) % Names.length;

	return Classes[Names[index]];
}
