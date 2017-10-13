# Simple Session View

This project consists of a session view based on the one at ableton.learning.com, with the addition of controllable effects for each track (and different samples - all of these apart from the first drum and melody samples are my own).
Samples stop and start on bar boundaries. So if play or stop is clicked, that action will occur at the start of the next bar, where the bar length is determined by the BPM value set in the constructor of the SessionTrackCollection class (for details on this and the SessionTrack class see the in-code comments).
Tone.js (https://github.com/Tonejs) is used to achieve bar-synchronised timing (it uses the Web Audio API clock which is much more precise than javascript's own), as well as for the sampler audio effects. Specifically with regards to timing, using the Tone.js Transport guarantees playback of a given sample starts and stops at bar boundaries - for details on this see https://github.com/Tonejs/Tone.js/wiki/Transport and https://github.com/Tonejs/Tone.js/wiki/TransportTime.



Other assumptions:

– In order to guarantee a smooth 4/4 measure (as is desirable for this session view), beyond the bar-aligned playback it is necessary that all samples used by the developer have the same bpm, and that they have a precise length of 1,2 or 4 bars (with respect to that bpm). 

– As a sample can be started at any bar-aligned point with regards to the other samples, as well as stopped at any bar-aligned point within itself, the samples used need to be constructed in such a way that all these cases sound 'smooth' (i.e.no rhythmic or melodic dissonance).



Improvements: 

As this was a timed task, in the interest of speed various corners were cut. Below are the key future improvements to the code.

– The html for the sample player grid as well as for the effects grid include tons of code repetition. While having this code written out facilitated faster development, it would be much better practice (and a more scalable approach) to either generate the html in javascript, or better yet to have an html file containing the basic code (e.g. for a single sample player) and then concatenate many instances of that in javascript.

– Widgetisation: ideally the architecture should be refactored so that the sample player is a reusable widget.

– I was unable to find a pure JavaScript knob/dial that worked well on smaller screens. Thus I opted for a jquery knob, the major down side of this being that the user has to load the whole of jquery just to use the dials...In the future will most probably write my own pure javascript dial.

– The page functions on chrome, firefox, and their respective mobile browsers. It does not work on microsoft edge (this needs to be fixed), and other browsers remain to be tested.

- Javascript minification.

– Better reverb.

- Audio is stuttery on some mobile devices.