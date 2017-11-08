import React from "react";
import EffectControl from "components/EffectControl";

export default function EffectControlGrid(props) {
	const effectNames = props.effectChains[0].getEffectNames();

	const effectControlsGrid = props.effectChains.map(
		(effectChain, trackIndex) => {
			const effectControls = effectNames.map(
				(effectName, effectIndex) => (
					<div
						className={
							"grid-tile " + effectName + " track" + trackIndex
						}
						key={effectIndex}
					>
						<EffectControl
							effectName={effectName}
							value={effectName === "gain" ? 0.5 : 0}
							trackIndex={trackIndex}
							onChange={value => {
								props.effectChains[trackIndex].setEffectValue(
									effectName,
									value
								);
							}}
						/>
					</div>
				)
			);
			return (
				<div className="flex-container-column center" key={trackIndex}>
					{effectControls}
				</div>
			);
		}
	);

	return (
		<div className="flex-container-row center-contents section EffectControlGrid">
			{effectControlsGrid}
		</div>
	);
}
