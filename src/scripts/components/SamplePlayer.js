import React from "react";
import "SamplePlayer.css";

export default function SamplePlayer(props) {
	return (
		<div className="SamplePlayer">
			<div
				className={
					"button grid-tile player track" +
					props.trackIndex +
					(props.playing ? " playing" : "") +
					(props.queued ? " queued" : "")
				}
				onClick={props.onClick}
			>
				<i className="icon" />
			</div>
		</div>
	);
}
