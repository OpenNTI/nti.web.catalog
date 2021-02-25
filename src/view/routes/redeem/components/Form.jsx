import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { getService } from '@nti/web-client';
import { scoped } from '@nti/lib-locale';
import { Form, Text, Loading } from '@nti/web-commons';
import { Router } from '@nti/web-routing';

import { RouteContexts } from '../../../Constants';
import Content from '../../../components/Content';

import Styles from './Form.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.routes.redeem.component.Form', {
	header: 'Redeem a Course',
	details: 'Please provide a redemption code below to redeem your course.',
	errorMessage: 'Could not redeem course code',
	placeholder: 'Enter your redemption code',
	submit: 'Redeem',
});

CatalogRedeemForm.propTypes = {
	code: PropTypes.string,
	markDirty: PropTypes.func,
};
export default function CatalogRedeemForm({ code: defaultValue, markDirty }) {
	const router = Router.useRouter();
	const [redeeming, setRedeeming] = React.useState(false);

	const onSubmit = async ({ json }) => {
		setRedeeming(true);

		try {
			const service = await getService();
			const invitations = service.getCollection(
				'Invitations',
				'Invitations'
			);

			const result = await invitations.postToLink(
				'accept-course-invitations',
				json
			);

			markDirty?.();

			router?.routeTo?.object?.(
				{
					redeemed: true,
					isCourseCatalogEntry: true,
					getID: () => result.CatalogEntryNTIID,
				},
				RouteContexts.Redeem
			);
		} catch (e) {
			throw new Error(e.message);
		} finally {
			setRedeeming(false);
		}
	};

	return (
		<Content className={cx('redeem-form-container')}>
			<Text.Base as="h3">{t('header')}</Text.Base>
			<Text.Base as="p">{t('details')}</Text.Base>
			{redeeming && <Loading.Spinner />}
			<Form
				className={cx('redeem-form', { redeeming })}
				onSubmit={onSubmit}
			>
				<div className={cx('form-content')}>
					<Form.Input.Text
						className={cx('redeem-input')}
						name="invitation_codes"
						required
						placeholder={t('placeholder')}
						defaultValue={defaultValue}
						autoFocus
					/>
					<Form.SubmitButton className={cx('redeem-submit')}>
						{t('submit')}
					</Form.SubmitButton>
				</div>
			</Form>
		</Content>
	);
}
