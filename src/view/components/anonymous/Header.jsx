import { LinkTo } from '@nti/web-routing';
import { Input as Search } from '@nti/web-search';
import { scoped } from '@nti/lib-locale';
import { Theme, Layouts } from '@nti/web-commons';

const { Responsive } = Layouts;

const t = scoped('catalog.anonymous.header', {
	login: 'Log In',
	signup: 'Sign Up',
});

const Container = styled('header')`
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
	display: flex;
	justify-content: flex-end;
	max-width: 1024px;
	min-height: 70px;
	margin: 0 auto;
	align-items: center;
	padding: 8px 0;

	&:not(.mobile) > *:not(:first-child) {
		margin-left: 1rem;
	}

	&.mobile {
		min-height: 45px;
		align-items: center;
		padding: 8px;
		flex-direction: row-reverse;
		justify-content: space-between;
	}
`;

const Nav = styled('nav')`
	display: flex;
	gap: 0.5em;
	font-size: 14px;
	align-items: center;

	&.mobile {
		&::before {
			font-family: 'icomoon';
			content: '<';
			color: var(--primary-blue);
			font-size: 1.5em;
			vertical-align: middle;
			text-transform: none;
		}

		[href] {
			color: var(--primary-blue);
		}

		:nth-child(n + 2) {
			/* hide everything but the first link */
			display: none;
		}
	}
`;

const HomeLink = styled(LinkTo.Path)`
	margin-right: auto;
`;

const Logo = styled(Theme.Asset).attrs({ name: 'logo' })`
	max-height: 48px;
`;

/**
 * @param {Object} props
 * @param {Object} props.paths - A mapping of { name: path } to be rendered as navigation, e.g. { signup: '/signup' }
 * @returns {JSX.Element}
 */
export function Header({ paths }) {
	const isMobile = Responsive.isMobile();
	return (
		<Theme.Scope scope="login">
			<Container>
				<Content mobile={isMobile}>
					{!isMobile && (
						<HomeLink to={paths.login}>
							<Logo />
						</HomeLink>
					)}
					<Search />
					{paths && (
						<Nav mobile={isMobile}>
							{Object.entries(paths).map(([key, path]) => (
								<LinkTo.Path key={key} to={path}>
									{t(key)}
								</LinkTo.Path>
							))}
						</Nav>
					)}
				</Content>
			</Container>
		</Theme.Scope>
	);
}
