import React from 'react';

export default class Redeem extends React.Component {
	render () {
		return (
			<div className="redeem-class">
				<div className="redeem-txt">
					<h3>Redeem a Course</h3>
					<p>Please provide a redemption code below to redeem your course.</p>
				</div>
				<div className="input-redeem">
					<input type="text" name="txtredeem" placeholder="xxxx - xxxx - xxxx - xxxx" />
					<button>Redeem</button>
				</div>	
			</div>
		);
	}
}
