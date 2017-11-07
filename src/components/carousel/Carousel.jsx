import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

import CarouselItem from './carousel-item/CarouselItem';

const slideShowDelay = 10000;
const transitionEnterTimeout = 1000;
const transitionLeaveTimeout = 1000;
export default class Carousel extends React.Component {

	static propTypes = {
		data: PropTypes.array,
	};

	constructor (props) {
		super (props);

		this.state = {
			selectedIndex: 0,
			transitionStyle: 'next',
			slideLock: false
		};
	}

	componentWillReceiveProps () {
		if (this.props.data) {
			this.intervalID = setInterval (this.nextSlide, slideShowDelay);
		}
	}

	componentWillUnmount () {
		clearInterval(this.intervalID);
	}

	unlockSlide () {
		setTimeout(() => {
			this.setState({
				slideLock: false
			});
		}, transitionEnterTimeout);
	}

	nextSlide = () => {
		if (this.state.slideLock) {
			return;
		}
		const nextIndex = (this.state.selectedIndex < this.props.data.length - 1) ? this.state.selectedIndex + 1 : 0;
		this.setState ({selectedIndex: nextIndex, transitionStyle: 'next', slideLock: true}, () => {
			this.unlockSlide ();
		});

	}

	preSlide = () => {
		if (this.state.slideLock) {
			return;
		}
		const preIndex = (this.state.selectedIndex > 0) ? this.state.selectedIndex - 1 : this.props.data.length - 1;
		this.setState ({selectedIndex: preIndex, transitionStyle: 'previous', slideLock: true}, () => {
			this.unlockSlide ();
		});
	}

	render () {
		if (!this.props.data || this.props.data.length === 0) {
			return null;
		}

		const carouselItemList = this.props.data.map (function (item, index) {
			return (
				<CarouselItem data={item} key={index}/>
			);
		});
		return (
			<div className="carousel-content--image">
				<CSSTransitionGroup
					transitionName={'animation--' + this.state.transitionStyle}
					transitionEnterTimeout={transitionEnterTimeout}
					transitionLeaveTimeout={transitionLeaveTimeout}>
					{carouselItemList[this.state.selectedIndex]}
				</CSSTransitionGroup>
				<button className="icon-chevronup-25" onClick={this.nextSlide}/>
				<button className="icon-chevrondown-25" onClick={this.preSlide}/>
			</div>
		);
	}
}
