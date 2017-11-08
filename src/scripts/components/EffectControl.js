import React from "react";
import "EffectControl.css";

export default class EffectControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		props.onChange(props.value);
	}

	render() {
		return (
			<div className="EffectControl track">
				<input
					className="slider track"
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={this.state.value}
					onChange={event => {
						var newValue = event.target.value;
						console.log("new value:" + newValue);
						this.setState({
							value: newValue
						});
						this.props.onChange(newValue);
					}}
				/>
			</div>
		);
	}
}
