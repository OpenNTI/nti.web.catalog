import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import CarouselItem from './carousel-item/CarouselItem';

export default class Carousel extends Component {
	static propTypes = {
		data: PropTypes.array,
		selectedIndex: PropTypes.number,
		slideshowDelay: PropTypes.number,
		slideshowDirection: PropTypes.string,
		transitionStatus: PropTypes.string,
		transformDuring: PropTypes.number,
		carouselItems: PropTypes.array
	};

	constructor (props) {
		super (props);

		const {
			selectedIndex = 0,
			slideshowDelay = 10000,
			slideshowDirection = 'next',
			transitionStatus = 'free',
			transformDuring = 1000
		} = props;

		this.state = {
			data: this.props.data || [],
			selectedIndex: selectedIndex,
			slideshowDelay: slideshowDelay, // in milisecond
			slideshowDirection: slideshowDirection, // next, previous
			transitionStatus: transitionStatus, // free, lock
			transformDuring: transformDuring, // milisecond
			carouselItems: []
		};
	}

	componentWillMount () {
		let carouselItems = this.state.data.map(function (item, index) {
			return (
				<CarouselItem
					key={item.id}
					backgroundUrl={item.background.url}
					backgroundWidth={item.background.width}
					backgroundHeight={item.background.height}
					detailImage={item.displayImage.url}
					detailImageWidth={item.displayImage.width}
					detailImageHeight={item.displayImage.height}
					title={(item.title.length < 60) ? item.title : item.title.substr(0,60) + ' ...'}
					description={(item.description.length < 90) ? item.description : item.description.substr(0,90) + ' ...'}
					startDate={item.startDate} learnerNumber={item.learnersNumber} spotLeft={item.spotsLeft}
				/>
			);
		});

		this.setState({
			carouselItems: carouselItems
		}, function () {
			if(this.state.slideshowDelay) {
				this.intervalID = setInterval(this._showSlides, this.state.slideshowDelay);
			}
		});
	}

	componentWillUnmount () {
		clearInterval(this.intervalID);
	}

	_nextSlide = () => {
		if(this.state.transitionStatus === 'lock') {
			return;
		}
		let nextIndex = (this.state.selectedIndex < this.state.data.length - 1) ? this.state.selectedIndex + 1 : 0;
		this.setState({
			slideshowDirection: 'next',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, function () {
			this._unclockTransitionStatusAfterTransform();
		});

	}

	_previousSlide = () => {
		if(this.state.transitionStatus === 'lock') {
			return;
		}
		let nextIndex = (this.state.selectedIndex > 0) ? this.state.selectedIndex - 1 : this.state.data.length - 1;
		this.setState({
			slideshowDirection: 'previous',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, function () {
			this._unclockTransitionStatusAfterTransform();
		});
	}

	_showSlides = () => {
		this._nextSlide();
	}

	_unclockTransitionStatusAfterTransform = () => {
		setTimeout(() => {
			this.setState({
				transitionStatus: 'free'
			});
		}, this.state.transformDuring);
	}

	onclickRight = () => {
		this._nextSlide();
	}

	onclickLeft = () => {
		this._previousSlide();
	}

	render () {
		return (
			<div className="carousel-content--image">
				<ReactCSSTransitionGroup
					transitionName={'animation--' + this.state.slideshowDirection}
					transitionEnterTimeout={this.state.transformDuring}
					transitionLeaveTimeout={this.state.transformDuring}>
					{this.state.carouselItems[this.state.selectedIndex]}
				</ReactCSSTransitionGroup>
				<button className="arrow-left" onClick={this.onclickLeft} />
				<button className="arrow-right" onClick={this.onclickRight} />
			</div>
		);
	}
}
