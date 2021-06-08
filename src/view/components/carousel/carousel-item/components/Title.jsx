import { Text } from '@nti/web-commons';

export const Title = styled(Text.Base).attrs({
	as: 'h3',
	className: 'title-carousel',
	limitLines: 2,
})`
	color: #fff;
	margin-top: 10px;
	margin-bottom: 15px;
	font-size: 28px;
	font-family: var(--legacy-header-font-family);
	line-height: 34px;
	text-transform: uppercase;
`;
