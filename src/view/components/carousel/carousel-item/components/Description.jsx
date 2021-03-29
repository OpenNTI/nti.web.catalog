import { Text } from '@nti/web-commons';

export const Description = styled(Text.Base).attrs({
	as: 'div',
	className: 'detail-txt',
	limitLines: 4,
})`
	opacity: 0.7;
	color: #fff;
	font-size: 16px;
	font-style: italic;
	line-height: 22px;
	margin-top: 10px;

	& > p:first-of-type {
		margin-top: 0;
	}
`;
