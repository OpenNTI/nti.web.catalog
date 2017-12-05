import {String} from 'nti-commons';

import * as Constants from './Constants';

export function getGradientClass (name) {
	const gradient = Constants.GRADIENT_GLASSES;
	const hash = String.hash(name);
	const index = Math.abs(hash) % gradient.length;
	return gradient[index];
}
