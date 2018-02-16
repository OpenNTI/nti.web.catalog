import React from 'react';
import PropTypes from 'prop-types';
import {getService} from 'nti-web-client';

import Category from '../../category/components/Category';
import CategoryDetail from '../../category/category-detail/components/CategoryDetail';
import CategoryCollapse from '../../category/components/category-collapse/CategoryCollapse';
import * as Constants from '../../Constants';

export default class GridCard extends React.Component {
	static propTypes = {
		courses: PropTypes.array,
		category: PropTypes.object,
		type: PropTypes.string,
		other: PropTypes.bool,
		link: PropTypes.string,
		search: PropTypes.string,
		isSearchPurchased: PropTypes.bool
	}

	componentDidMount () {
		this.resolveLinks();
	}

	componentWillUnmount () {
		this.unmounted = true;
		this.setState = () => {};
	}

	async resolveLinks () {
		const service = await getService();
		if (this.unmounted) {
			return;
		}

		const coursesLink = service.getCollection('Courses', 'Catalog');
		const purchasedLink = service.getCollection('Purchased', 'Catalog');
		this.setState({coursesLink, purchasedLink});
	}

	render () {
		if (!this.state) {
			return null;
		}

		const {coursesLink, purchasedLink} = this.state;

		if (this.props.type === Constants.CATEGORIES) {
			const link = this.props.link;
			const categories = convertItems(this.props.courses);
			return (
				<div className="content-right">
					<ul>
						{categories.expanseItems.map((category, index) => {
							return (
								<li key={index} className="category-block">
									<Category
										category={category}
										key={index}
										link={link}
									/>
								</li>
							);

						})}
					</ul>
					<div>
						<CategoryCollapse categories={categories.collapseItems} link={link}/>
					</div>
					{categories.otherItems && categories.otherItems.ItemCount >= 4 && (
						<ul>
							<li className="category-block">
								<Category
									category={categories.otherItems}
									link={link}
								/>
							</li>
						</ul>
					)}
				</div>
			);
		}
		else if (this.props.type === Constants.CATEGORY) {
			return (
				<div>
					<CategoryDetail category={this.props.category} other={this.props.other} link={this.props.link}/>
				</div>
			);
		}

		else if (this.props.type === Constants.SEARCH) {
			const link = this.props.isSearchPurchased ? purchasedLink.href : coursesLink.href;
			return (
				<div>
					<CategoryDetail category={this.props.category} search={this.props.search} link={link}/>
				</div>
			);
		}

		else if (this.props.type === Constants.PURCHASED) {
			const purchased = true;
			return (
				<div>
					<CategoryDetail category={this.props.category} purchased={purchased} link={purchasedLink.href}/>
				</div>
			);
		}

		return null;

	}
}

function convertItems (items) {
	let result = {
		collapseItems: [],
		expanseItems: []
	};

	let otherItems = null;

	items.map(item => {
		if (item.ItemCount < 4 && item.Name !== '.nti_other') {
			result.collapseItems.push(item);

		}
		else {
			if (item.Name === '.nti_other') {
				otherItems = item;
			}
			else {
				result.expanseItems.push(item);
			}
		}
	});

	if (otherItems) {
		result.otherItems = otherItems;
	}

	return result;
}
