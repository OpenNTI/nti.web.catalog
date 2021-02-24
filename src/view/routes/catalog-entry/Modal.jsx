import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Prompt, Hooks} from '@nti/web-commons';

import Styles from './Modal';
import View from './View';
import getCatalogEntry from './get-catalog-entry';

const {useResolver} = Hooks;
// const {isResolved} = useResolver;

const cx = classnames.bind(Styles);

CatalogEntryModal.propTypes = {
	entryId: PropTypes.string
};
export default function CatalogEntryModal ({entryId}) {
	const resolver = useResolver(() => getCatalogEntry(entryId), [entryId]);
	// const catalog = isResolved(resolver) ? resolver : null;

	return (
		<Prompt.Dialog>
			<div className={cx('catalog-entry-modal')}>
				<div className={cx('header')}>

				</div>
				<View catalogEntry={resolver} />
				<div className={cx('footer')}>

				</div>
			</div>
		</Prompt.Dialog>
	);
}
