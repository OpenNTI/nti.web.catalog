import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Navigation } from '@nti/web-commons';
import { Router } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';

import { Routes } from '../Constants';

import Styles from './Frame.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.Frame', {
	tabs: {
		available: 'Courses',
		purchased: 'History',
		redeem: 'Redeem',
	},
});

const trimTrailingSlash = route => route.replace(/\/$/, '');

function isActiveRoute(route, pathname, baseroute) {
	if (trimTrailingSlash(route) === trimTrailingSlash(baseroute)) {
		return trimTrailingSlash(route) === trimTrailingSlash(pathname);
	}

	return pathname.indexOf(route) === 0;
}

CatalogFrame.propTypes = {
	children: PropTypes.any,
	suppressDetails: PropTypes.bool,
};
export default function CatalogFrame({ children, suppressDetails }) {
	const router = Router.useRouter();
	const baseroute = router?.baseroute;
	const pathname = global.location?.pathname;
	const child = React.cloneElement(React.Children.only(children), {
		suppressDetails,
	});

	const availableRoute = router.getRouteFor(Routes.Available);
	const purchasedRoute = router.getRouteFor(Routes.Purchased);
	const redeemRoute = router.getRouteFor(Routes.Redeem);

	const purchasedActive = isActiveRoute(purchasedRoute, pathname, baseroute);
	const redeemActive = isActiveRoute(redeemRoute, pathname, baseroute);
	const availableActive = !purchasedActive && !redeemActive;

	return (
		<>
			<Navigation.Tabs>
				<Navigation.Tabs.Tab
					route={availableRoute}
					label={t('tabs.available')}
					active={availableActive}
				/>
				<Navigation.Tabs.Tab
					route={purchasedRoute}
					label={t('tabs.purchased')}
					active={purchasedActive}
				/>
				<Navigation.Tabs.Tab
					route={redeemRoute}
					label={t('tabs.redeem')}
					active={redeemActive}
				/>
			</Navigation.Tabs>
			<div className={cx('catalog-frame', 'course-catalog')}>{child}</div>
		</>
	);
}
