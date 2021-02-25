import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import CarouselItem from '../carousel-item/components/CarouselItem';

const transitionTimeout = 1000;

export default class Carousel extends React.Component {
	static propTypes = {
		data: PropTypes.array,
		carouselSelected: PropTypes.number,
		selectCarousel: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: this.props.carouselSelected,
			transitionStyle: 'next',
			slideLock: false,
		};
	}

	unlockSlide() {
		setTimeout(() => {
			this.setState({
				slideLock: false,
			});
		}, transitionTimeout);
	}

	nextSlide = () => {
		const {
			props: { data, selectCarousel },
			state: { slideLock, selectedIndex },
		} = this;

		if (slideLock) {
			return;
		}

		const nextIndex =
			selectedIndex < data.length - 1 ? selectedIndex + 1 : 0;

		selectCarousel(nextIndex);

		this.setState(
			{
				selectedIndex: nextIndex,
				transitionStyle: 'next',
				slideLock: true,
			},
			() => {
				this.unlockSlide();
			}
		);
	};

	preSlide = () => {
		const {
			props: { data, selectCarousel },
			state: { slideLock, selectedIndex },
		} = this;

		if (slideLock) {
			return;
		}

		const preIndex =
			selectedIndex > 0 ? selectedIndex - 1 : data.length - 1;

		selectCarousel(preIndex);

		this.setState(
			{
				selectedIndex: preIndex,
				transitionStyle: 'previous',
				slideLock: true,
			},
			() => {
				this.unlockSlide();
			}
		);
	};

	render() {
		const {
			props: { data },
			state: { selectedIndex, transitionStyle },
		} = this;

		if (!data || data.length === 0) {
			return null;
		}

		return (
			<div className="carousel-content--image">
				<TransitionGroup>
					<CSSTransition
						key={selectedIndex}
						classNames={'animation--' + transitionStyle}
						timeout={transitionTimeout}
						unmountOnExit
					>
						<CarouselItem data={data[selectedIndex]} />
					</CSSTransition>
				</TransitionGroup>
				<button
					className="icon-chevronup-25"
					onClick={this.nextSlide}
				/>
				<button
					className="icon-chevrondown-25"
					onClick={this.preSlide}
				/>
			</div>
		);
	}
}
