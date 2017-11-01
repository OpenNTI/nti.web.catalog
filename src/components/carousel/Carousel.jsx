import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

import CarouselItem from './carousel-item/CarouselItem';

export default class Carousel extends React.Component {
	static defaultProps = {
		data : [],
		selectedIndex : 0,
		slideshowDelay : 10000,
		slideshowDirection : 'next',
		transitionStatus : 'free',
		transformDuring : 1000,
		carouselItems: []
	}

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

		this.state = {...this.props};
	}

	componentWillMount () {
		const carouselItems = this.state.data.map(function (item, index) {
			return (
				<CarouselItem
					key={item.id}
					backgroundUrl={item.background.url}
					detailImage={item.displayImage.url}
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
				this.intervalID = setInterval(this._nextSlide, this.state.slideshowDelay);
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
		const nextIndex = (this.state.selectedIndex < this.state.data.length - 1) ? this.state.selectedIndex + 1 : 0;
		this.setState({
			slideshowDirection: 'next',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, () => {
			this._unclockTransitionStatusAfterTransform();
		});

	}

	_previousSlide = () => {
		if(this.state.transitionStatus === 'lock') {
			return;
		}
		const nextIndex = (this.state.selectedIndex > 0) ? this.state.selectedIndex - 1 : this.state.data.length - 1;
		this.setState({
			slideshowDirection: 'previous',
			transitionStatus: 'lock',
			selectedIndex: nextIndex
		}, () => {
			this._unclockTransitionStatusAfterTransform();
		});
	}

	_unclockTransitionStatusAfterTransform = () => {
		setTimeout(() => {
			this.setState({
				transitionStatus: 'free'
			});
		}, this.state.transformDuring);
	}

	render () {
		return (
			<div className="carousel-content--image">
				<CSSTransitionGroup
					transitionName={'animation--' + this.state.slideshowDirection}
					transitionEnterTimeout={this.state.transformDuring}
					transitionLeaveTimeout={this.state.transformDuring}>
					{this.state.carouselItems[this.state.selectedIndex]}
				</CSSTransitionGroup>
				<button className="icon-chevronup-25" onClick={this._previousSlide} />
				<button className="icon-chevrondown-25" onClick={this._nextSlide} />
			</div>
		);
	}
}
