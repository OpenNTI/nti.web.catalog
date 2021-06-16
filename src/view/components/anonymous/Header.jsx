import { LinkTo } from '@nti/web-routing';
import { Input as Search } from '@nti/web-search';
import { scoped } from '@nti/lib-locale';
import { Theme } from '@nti/web-commons';

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

	> *:not(:first-child) {
		margin-left: 1rem;
	}
`;

const Nav = styled('nav')`
	display: flex;
	gap: 0.5em;
	font-size: 14px;
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
	return (
		<Theme.Scope scope="login">
			<Container>
				<Content>
					<HomeLink to={paths.login}>
						<Logo />
					</HomeLink>
					<Search />
					{paths && (
						<Nav>
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
