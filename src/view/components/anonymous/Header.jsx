import { LinkTo } from '@nti/web-routing';
import { Input as Search } from '@nti/web-search';
import { scoped } from '@nti/lib-locale';

const t = scoped('catalog.anonymous.header', {
	login: 'Log In',
	signup: 'Sign Up',
});

const Container = styled('header')`
	display: flex;
	justify-content: space-between;
	max-width: 1024px;
	margin: 0 auto;
	align-items: center;
	padding: 16px 0;
`;

const Nav = styled('nav')`
	display: flex;
	gap: 0.5em;
`;

/**
 * @param {Object} props
 * @param {Object} props.paths - A mapping of { name: path } to be rendered as navigation, e.g. { signup: '/signup' }
 * @returns {JSX.Element}
 */
export function Header({ paths }) {
	return (
		<Container>
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
		</Container>
	);
}
