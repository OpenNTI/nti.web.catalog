import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import CarouselItem from './carousel-item/CarouselItem';

const data = [
	{
		id: 1,
		background: {
			url: 'http://www.menucool.com/slider/ninja-slider/img/abc.jpg',
			width: '100%',
			height: '100%'
		},
		displayImage: {
			url: 'http://www.menucool.com/slider/ninja-slider/img/abc.jpg',
			width: '100%',
			height: '100%'
		},
		title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
		description: 'This course provides fundamental concepts in probability and statistical inference',
		startDate: new Date(),
		learnersNumber: 4321,
		spotsLeft: 20
	},
	{
		id: 2,
		background: {
			url: 'https://www.w3schools.com/css/trolltunga.jpg',
			width: '100%',
			height: '100%'
		},
		displayImage: {
			url: 'https://www.w3schools.com/css/trolltunga.jpg',
			width: '100%',
			height: '100%'
		},
		title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
		description: 'This course provides fundamental concepts in probability and statistical inference',
		startDate: new Date(),
		learnersNumber: 4321,
		spotsLeft: 50
	},
	{
		id: 3,
		background: {
			url: 'https://pbs.twimg.com/media/DGH9R3GXgAAQhGU.jpg',
			width: '100%',
			height: '100%'
		},
		displayImage: {
			url: 'https://pbs.twimg.com/media/DGH9R3GXgAAQhGU.jpg',
			width: '100%',
			height: '100%'
		},
		title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
		description: 'This course provides fundamental concepts in probability and statistical inference',
		startDate: new Date(),
		learnersNumber: 2048,
		spotsLeft: 15
	},
	{
		id: 4,
		background: {
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-04BiWEVASGYSPWssT0Y7eTtA0AQjxap_l-mcAS5Wem9sb2z',
			width: '100%',
			height: '100%'
		},
		displayImage: {
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-04BiWEVASGYSPWssT0Y7eTtA0AQjxap_l-mcAS5Wem9sb2z',
			width: '100%',
			height: '100%'
		},
		title: 'FUNDAMENTALS OF ENGINEERING STATISTICAL ANALYSIS',
		description: 'This course provides fundamental concepts in probability and statistical inference',
		startDate: new Date(),
		learnersNumber: 1024,
		spotsLeft: 9
	}
];

class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data,
			selectedIndex: this.props.selectedIndex || 0,
			slideshowDelay: this.props.slideshowDelay || 0, // in milisecond
			slideshowDirection: this.props.slideshowDirection || 'next', // next, previous
			transitionStatus: this.props.transitionStatus || 'free', // free, lock
			transformDuring: this.props.transformDuring || 1.5,
			carouselItems: []
		};

		this._nextSlide = this._nextSlide.bind(this);
		this._previousSlide = this._previousSlide.bind(this);
		this._showSlides = this._showSlides.bind(this);
		this._unclockTransitionStatusAfterTransform = this._unclockTransitionStatusAfterTransform.bind(this);
		this.onclickRight = this.onclickRight.bind(this);
		this.onclickLeft = this.onclickLeft.bind(this);
	}

	componentWillMount() {
		let carouselItems = this.state.data.map(function (item, index) {
			return (
				// <div key={item.id}>
				// 	<ReactCSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				// 		<CarouselItem
				// 			key={item.id}
				// 			backgroundUrl={item.background.url}
				// 			backgroundWidth={item.background.width}
				// 			backgroundHeight={item.background.height}
				// 			detailImage={item.displayImage.url}
				// 			detailImageWidth={item.displayImage.width}
				// 			detailImageHeight={item.displayImage.height}
				// 			title={item.title} description={item.description}
				// 			startDate={item.startDate} learnerNumber={item.learnersNumber} spotLeft={item.spotsLeft}
				// 		/>
				// 	</ReactCSSTransitionGroup>
				// </div>
				<CarouselItem
					key={item.id}
					backgroundUrl={item.background.url}
					backgroundWidth={item.background.width}
					backgroundHeight={item.background.height}
					detailImage={item.displayImage.url}
					detailImageWidth={item.displayImage.width}
					detailImageHeight={item.displayImage.height}
					title={item.title} description={item.description}
					startDate={item.startDate} learnerNumber={item.learnersNumber} spotLeft={item.spotsLeft}
				/>
			);
		});
		this.setState({
			carouselItems: carouselItems
		}, function() {
			if(this.state.slideshowDelay) {
				this.intervalID = setInterval(this._showSlides, this.state.slideshowDelay);
			}
		});
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	_nextSlide() {
		if(this.state.transitionStatus === 'lock') {
			return;
		}
		let nextIndex = (this.state.selectedIndex < data.length - 1) ? this.state.selectedIndex + 1 : 0;
		this.setState({
			slideshowDirection: 'next',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, function() {
			this._unclockTransitionStatusAfterTransform();
		});

	}

	_previousSlide() {
		if(this.state.transitionStatus === 'lock') {
			return;
		}
		let nextIndex = (this.state.selectedIndex > 0) ? this.state.selectedIndex - 1 : data.length - 1;
		this.setState({
			slideshowDirection: 'previous',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, function() {
			this._unclockTransitionStatusAfterTransform();
		});
	}

	_showSlides() {
		this._nextSlide();
	}

	_unclockTransitionStatusAfterTransform() {
		let self = this;
		setTimeout(function() {
			self.setState({
				transitionStatus: 'free'
			});
		}, self.state.transformDuring * 1000);
	}

	onclickRight() {
		this._nextSlide();
	}

	onclickLeft() {
		this._previousSlide();
	}

	render() {
		let self = this;
		let currentItem = this.state.carouselItems[this.state.selectedIndex];

		return (
			<div className='carousel-content--image'>
				<ReactCSSTransitionGroup
					transitionName={'animation--' + this.state.slideshowDirection}>
					{currentItem}
				</ReactCSSTransitionGroup>
				<button className="arrow-left" onClick={self.onclickLeft} />
				<button className="arrow-right" onClick={self.onclickRight} />
			</div>
		);
	}
}

Carousel.propTypes = {
	data: PropTypes.array,
	selectedIndex: PropTypes.number,
	slideshowDelay: PropTypes.number,
	slideshowDirection: PropTypes.string,
	transitionStatus: PropTypes.string,
	transformDuring: PropTypes.number,
	carouselItems: PropTypes.array
};

// <ReactCSSTransitionGroup
// 	transitionName='animation--next'>
// 	{currentItem}
// </ReactCSSTransitionGroup>

export default Carousel;
