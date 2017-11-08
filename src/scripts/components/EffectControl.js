import React from "react";
import "EffectControl.css";
import Slider from "rc-slider/lib/Slider";
import "rc-slider/assets/index.css";


export default class EffectControl extends React.Component {
	//styles need to be inlined here as this is the only way to style rc-slider
	render() {
		var color;
		switch (this.props.effectName) {
			case "gain":
				color = "#A6BE00";
				break;
			case "distortion":
				color = "#3DC300";
				break;
			case "delay":
				color = "#25FFA8";
				break;
			case "reverb":
				color = "#1AFF2F";
				break;
			default:
				color = "white";
				break;

		}
		return (
			<div className="EffectControl">
				<Slider
					min={0}
					max={1}
					step={0.01}
					defaultValue={this.props.value}
					railStyle={{
						backgroundColor: "#A9A9A9",
						height: "12px",
						borderRadius: "10px"
					}}
					trackStyle={{
						backgroundColor: color,
						height: "12px",
						borderRadius: "10px"
					}}
					handleStyle={{
						height: "20px",
						width: "20px",
						border: "solid 1px black"
					}}
					onChange={event => {
						this.props.onChange(event);
					}}
				/>{" "}
			</div>
		);
	}
}
