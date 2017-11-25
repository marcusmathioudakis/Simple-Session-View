# Grid Sampler
A grid sampler with controllable effects, built using React.js, the Web Audio API and [Tone.js](https://github.com/Tonejs), and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Try it out [here](https://marcusmathioudakis.github.io/grid-sampler/).

## Implementation details

- Tone.js (https://github.com/Tonejs) is used to achieve bar-synchronised timing (it uses the Web Audio API clock which is much more precise than javascript's own), as well as for the sampler audio effects. Specifically with regards to timing, using the Tone.js Transport guarantees playback of a given sample starts and stops at bar boundaries - for details on this see [here](https://github.com/Tonejs/Tone.js/wiki/Transport) and [here](https://github.com/Tonejs/Tone.js/wiki/TransportTime).

- In order to guarantee a smooth 4/4 measure (as is desirable for this session view), beyond the bar-aligned playback it is necessary that all samples used by the developer have the same bpm, that they have a precise length of 1,2 or 4 bars (with respect to that bpm), and that this matches the BPM set in `App.js`.

- As a sample can be started at any bar-aligned point with regards to the other samples, as well as stopped at any bar-aligned point within itself, the samples used need to be constructed in such a way that all these cases sound 'smooth' (i.e.no rhythmic or melodic dissonance).

## Samples used

drum loops used are free samples from looperman.com, all other samples are my own.

## Known issues (to be fixed soon):

- On some mobile devices audio playback stutters heavily, often stopping completely (also doesn't load on iphones). 
- Untested on browsers beyond chrome and firefox (doesn't work on microsoft edge).

