import React, { Component } from "react";
import "App.css";
import Loader from "components/Loader";
import TrackGrid from "components/TrackGrid";
import EffectControlGrid from "components/EffectControlGrid";
import EffectsChain from "EffectsChain";
import Tone from "tone";

const samples = [
  ["bass1.ogg", "bass2.ogg", "bass3.ogg", "bass4.ogg"],
  ["rhythm1.ogg", "rhythm2.ogg", "rhythm3.ogg", "rhythm4.ogg"],
  ["pad1.ogg", "pad2.ogg", "pad3.ogg", "pad4.ogg"],
  ["lead1.ogg", "lead2.ogg", "lead3.ogg", "lead4.ogg"]
];
const effectChains = samples.map(() => new EffectsChain());
const BPM = 135;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    // once all audio buffers loaded display the app
    Tone.Buffer.on("load", () => {
      this.setState({ loaded: true });
    });
  }

  render() {
    return (
      <div className="flex-container-column App">
        <div className={this.state.loaded ? "hidden" : ""}>
          <Loader />
        </div>
        <div className={!this.state.loaded ? "hidden" : ""}>
          <TrackGrid samples={samples} effectChains={effectChains} bpm={BPM} />
          <EffectControlGrid effectChains={effectChains} />
        </div>
      </div>
    );
  }
}
