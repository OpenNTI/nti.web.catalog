import './Card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@nti/web-course';

export default class CourseCard extends React.Component {
	static propTypes = {
		course: PropTypes.object.isRequired,
	};

	render() {
		const { course } = this.props;

		return <Card course={course} collapseToList />;
	}
}
