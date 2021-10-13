import PropTypes from 'prop-types';

import { Hooks, Layouts, Loading, Presentation } from '@nti/web-commons';
import { Info, Enrollment } from '@nti/web-course';

import PageError from '../../components/PageError';

const { Responsive } = Layouts;
const { useResolver } = Hooks;
const { isPending, isErrored, isResolved } = useResolver;

const LayoutDesktop = styled(Presentation.AssetBackground)`
	display: grid;
	grid-template-columns: 642px 310px;
	gap: 15px;
	padding: 15px;
	background-size: cover;
`;

const LayoutMobile = Presentation.AssetBackground;

const Layout = props => {
	const Cmp = Responsive.isMobile() ? LayoutMobile : LayoutDesktop;
	return <Cmp {...props} />;
};

CatalogEntry.propTypes = {
	catalogEntry: PropTypes.any,
};
export default function CatalogEntry({ catalogEntry: resolver }) {
	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const entry = isResolved(resolver) ? resolver : null;

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			{error && <PageError error={error} />}
			{entry && (
				<Layout contentPackage={entry} type="background">
					<Info.Inline catalogEntry={entry} />
					<Enrollment.Options catalogEntry={entry} />
				</Layout>
			)}
		</Loading.Placeholder>
	);
}
