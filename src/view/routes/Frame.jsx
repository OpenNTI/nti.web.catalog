import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Navigation} from '@nti/web-commons';
import {Router} from '@nti/web-routing';
import {scoped} from '@nti/lib-locale';

import {Routes} from '../Constants';

import Styles from './Frame.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-catalog.view.Frame', {
	tabs: {
		available: 'Courses',
		purchased: 'History',
		redeem: 'Redeem'
	}
});

const trimTrailingSlash = route => route.replace(/\/$/, '');

function isActiveRoute (route, pathname, baseroute) {
	if (trimTrailingSlash(route) === trimTrailingSlash(baseroute)) { return trimTrailingSlash(route) === trimTrailingSlash(pathname); }

	return pathname.indexOf(route) === 0;
}

CatalogFrame.propTypes = {
	children: PropTypes.any
};
export default function CatalogFrame ({children}) {
	const router = Router.useRouter();
	const baseroute = router?.baseroute;
	const pathname = router?.route?.location?.pathname;
	const child = React.Children.only(children);


	const availableRoute = router.getRouteFor(Routes.Available);
	const purchasedRoute = router.getRouteFor(Routes.Purchased);
	const redeemRoute = router.getRouteFor(Routes.Redeem);

	return (
		<>
			<Navigation.Tabs>
				<Navigation.Tabs.Tab
					route={availableRoute}
					label={t('tabs.available')}
					active={isActiveRoute(availableRoute, pathname, baseroute)}
				/>
				<Navigation.Tabs.Tab
					route={purchasedRoute}
					label={t('tabs.purchased')}
					active={isActiveRoute(purchasedRoute, pathname, baseroute)}
				/>
				<Navigation.Tabs.Tab
					route={redeemRoute}
					label={t('tabs.redeem')}
					active={isActiveRoute(redeemRoute, pathname, baseroute)}
				/>
			</Navigation.Tabs>
			<div className={cx('catalog-frame')}>
				{child}
			</div>
		</>
	);
}