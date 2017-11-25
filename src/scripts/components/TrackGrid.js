import React, { Component } from "react";
import Track from "components/Track";
import Tone from "tone";

export default class TrackGrid extends Component {
  constructor(props) {
    super(props);
    Tone.Transport.bpm.value = props.bpm;
    Tone.Transport.latencyHint = ".06";
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
  }

  render() {
    const tracks = this.props.samples.map((trackSamples, index) => (
      <Track
        key={index}
        index={index}
        samples={trackSamples}
        effectsNode={this.props.effectChains[index].getAudioNode()}
        activateTrack={id => {
          this.activateTrack(id);
        }}
        deactivateTrack={id => {
          this.deactivateTrack(id);
        }}
        getNumActiveTracks={() => {
          return this.activeTrackIds.size;
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
