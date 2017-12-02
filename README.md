# Grid Sampler

A grid sampler with controllable effects, built using React.js, the Web Audio API and [Tone.js](https://github.com/Tonejs), and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Tested in Chrome and Firefox. Try it out [here](https://marcusmathioudakis.github.io/grid-sampler/).

## Implementation details

- Tone.js (https://github.com/Tonejs) is used to achieve bar-synchronised timing (it uses the Web Audio API clock which is much more precise than javascript's own), as well as for the sampler audio effects. Specifically with regards to timing, using the Tone.js Transport guarantees playback of a given sample starts and stops at bar boundaries - for details on this see [here](https://github.com/Tonejs/Tone.js/wiki/Transport) and [here](https://github.com/Tonejs/Tone.js/wiki/TransportTime).

- In order to guarantee a smooth 4/4 measure (as is desirable for this session view), beyond the bar-aligned playback it is necessary that all samples used by the developer have the same bpm, that they have a precise length of 1,2 or 4 bars (with respect to that bpm), and that this matches the BPM set in `App.js`.

- As a sample can be started at any bar-aligned point with regards to the other samples, as well as stopped at any bar-aligned point within itself, the samples used need to be constructed in such a way that all these cases sound 'smooth' (i.e.no rhythmic or melodic dissonance).


## Known issues (to be fixed soon):

- Currently untested in safari as don't have access to an apple device atm. 
- Broken in Microsoft Edge: WEBAUDIO17014: Decoding error: The stream provided is corrupt or unsupported.
- On some mobile devices although UI behaves as expected audio playback stutters heavily, often stopping completely.
- very low test coverage (see below).


## Testing

Using Jest with Enzyme for tests. To run test suite, execute "npm test" in the top level directory. At the moment test coverage is very low, in particular there are only shallow rendering tests, and only for those components not directly using Tone.js. Difficult to test (even shallow test) any component that uses Tone.js - this is because Tone.js uses Web Audio API methods that are not defined in jsdom, so when the tests are run using jsdom calling these methods throws an exception. Can mock the Web Audio API using "web-audio-mock-api", however this seems to still be missing some necessary methods. Thus for better test coverage, need to investigate running Jest with an environment implementing the Web Audio API, or most probably switch to another test runner that actually runs tests in the browser such as Mocha.



