import { LinkTo } from '@nti/web-routing';
import { Input as Search } from '@nti/web-search';
import { getConfig } from '@nti/web-client';

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

export function Header(props) {
	const basePath = getConfig('basepath');
	return (
		<Container>
			<Search />
			<Nav>
				<LinkTo.Path to={basePath}>Sign In</LinkTo.Path>
				<LinkTo.Path to={basePath}>Create Account</LinkTo.Path>
			</Nav>
		</Container>
	);
}
