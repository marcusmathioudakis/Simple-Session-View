import React, { Component } from "react";
import Track from "components/Track";
import Tone from "tone";

export default class TrackGrid extends Component {
  constructor(props) {
    super(props);
    Tone.Transport.bpm.value = props.bpm;
    //stores Ids of tracks that are playing
    this.activeTrackIds = new Set();
    this.activateTrack = this.activateTrack.bind(this);
    this.deactivateTrack = this.deactivateTrack.bind(this);
  }

  activateTrack(trackId) {
    this.activeTrackIds.add(trackId);
  }

  deactivateTrack(trackId) {
    this.activeTrackIds.delete(trackId);
    return this.activeTrackIds.size;
  }

  render() {
    const tracks = this.props.samples.map((trackSamples, index) => (
      <Track
        key={index}
        index={index}
        samples={trackSamples}
        effectsNode={this.props.effectChains[index].getAudioNode()}
        onPlay={id => {
          this.activateTrack(id);
        }}
        onStop={id => {
          return this.deactivateTrack(id);
        }}
      />
    ));

    return (
      <div
        id="player-grid"
        className="flex-container-row center-contents section"
      >
        {tracks}
      </div>
    );
  }
}