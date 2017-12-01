import React, { Component } from "react";
import SamplePlayer from "components/SamplePlayer";
import Tone from "tone";

export default class Track extends Component {
	constructor(props) {
		super(props);
		this.index = props.index;
		this.state = {
			currentPlayerIndex: null, // player currently playing
			queuedToPlayIndex: null, // player queued to start at next measure
			queuedToStopIndex: null // player queued to start at next measure
		};

		// Initialise the sample players that make up this track
		this.players = new Tone.Players();
		props.samples.forEach(
			function(element, index) {
				this.players.add(index, "./sounds/" + element);
				var player = this.players.get(index);
				player.loop = false;
			}.bind(this)
		);
		if (props.effectsNode != null) {
			this.players.connect(props.effectsNode);
		} else {
			this.players.toMaster();
		}
	}

	/**
	queue the indexed player to begin playing at the start of the next measure.
	queue the current player to stop playing at that time.
	**/
	play(index) {
		this.setState({
			queuedToPlayIndex: index,
			queuedToStopIndex: this.state.currentPlayerIndex
		});
		this.props.activateTrack(this.index);
		this.queueUpdateOnNextMeasure();

		if (Tone.Transport.state !== "started") {
			Tone.Transport.start();
		}
	}

	/**
	stop the current player at the start of the next measure
	**/
	stopCurrentPlayer() {
		this.setState({
			queuedToStopIndex: this.state.currentPlayerIndex
		});
		this.queueUpdateOnNextMeasure();
	}

	/**
	update the sample players based on the queued actions,
	at the start of the next measure.
	**/
	queueUpdateOnNextMeasure() {
		if (this.updateQueued) {
			return;
		}
		Tone.Transport.scheduleOnce(
			function(time) {
				//stop player queued to stop
				var player;
				if (this.state.queuedToStopIndex !== null) {
					player = this.players.get(this.state.queuedToStopIndex);
					player.stop(time);
					if (this.loop) {
						this.loop.stop();
						this.loop = null;
					}
				}
				//start player queued to start
				if (this.state.queuedToPlayIndex !== null) {
					player = this.players.get(this.state.queuedToPlayIndex);
					player.start(time);
					//loop the player according to its length in measures
					var playerDuration = Tone.Time(
						player.buffer.duration
					).toNotation();
					this.loop = new Tone.Loop(function(time) {
						player.start(time);
					}, playerDuration).start();
				}
				//if we're stopping this track
				if (
					this.state.queuedToStopIndex !== null &&
					this.state.queuedToPlayIndex === null
				) {
					this.props.deactivateTrack(this.index);
				}
				//if no active tracks then stop the transport
				if (this.props.getNumActiveTracks() === 0) {
					Tone.Transport.cancel();
					Tone.Transport.stop(time);
				}
				this.setState({
					currentPlayerIndex: this.state.queuedToPlayIndex,
					queuedToPlayIndex: null,
					queuedToStopIndex: null
				});
				this.updateQueued = false;
			}.bind(this),
			"@1m" //the start of the next measure
		);
		this.updateQueued = true;
	}

	render() {
		const samplePlayers = this.props.samples.map((sampleName, index) => {
			var playing = index === this.state.currentPlayerIndex;
			var queued =
				index === this.state.queuedToPlayIndex ||
				index === this.state.queuedToStopIndex;

			var onClick;
			if (queued) {
				onClick = null;
			} else if (playing) {
				onClick = () => {
					this.stopCurrentPlayer();
				};
			} else {
				onClick = () => {
					this.play(index);
				};
			}
			return (
				<SamplePlayer
					key={index}
					trackIndex={this.index}
					playing={playing}
					queued={queued}
					onClick={onClick}
				/>
			);
		});

		return (
			<div className="flex-container-column center track">
				{samplePlayers}
			</div>
		);
	}
}
