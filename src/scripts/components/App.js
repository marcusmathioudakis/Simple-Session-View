import React, { Component } from "react";
import "App.css";
import Loader from "components/Loader";
import TrackGrid from "components/TrackGrid";
import EffectControlGrid from "components/EffectControlGrid";
import EffectsChain from "EffectsChain";
import Tone from "tone";

const samples = [
  ["drums1.ogg", "drums2.ogg", "drums3.ogg", "drums4.ogg"],
  ["bass1.ogg", "bass2.ogg", "bass3.ogg", "bass4.ogg"],
  ["chords1.ogg", "chords2.ogg", "chords3.ogg", "chords4.ogg"],
  ["melody1.ogg", "melody2.ogg", "melody3.ogg", "melody4.ogg"]
];
const effectChains = samples.map(() => new EffectsChain());
const BPM = 102;

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
      <div id="main-container" className="flex-container-column App">
        <div>
          <div className={this.state.loaded ? "hidden" : ""}>
            <Loader />
          </div>
          <div className={!this.state.loaded ? "hidden" : ""}>
            <TrackGrid
              samples={samples}
              effectChains={effectChains}
              bpm={BPM}
            />
            <EffectControlGrid effectChains={effectChains} />
          </div>
        </div>
      </div>
    );
  }
}
