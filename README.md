# Simple Session View


This project consists of a session view based on the one at ableton.learning.com, with the addition of controllable effects for each track (and different samples - all of these apart from the first drum and melody samples are my own).

Samples stop and start on bar boundaries. So if play or stop is clicked, that action will occur at the start of the next bar, where the bar length is determined by the BPM value set in the constructor of the SessionTrackCollection class (for details on this and the SessionTrack class see the in-code comments).

Tone.js (https://github.com/Tonejs) is used to achieve bar-synchronised timing (it uses the Web Audio API clock which is much more precise than javascript's own), as well as for the sampler audio effects. Specifically with regards to timing, using the Tone.js Transport guarantees playback of a given sample starts and stops at bar boundaries. However with regards to an individual sample looping at a bar boundary, this is achieved by looping the sample in its entirety and assuming that its length is an integer multiple of the bar length for the specified BPM. For .wav audio files this approach works fine; however it turns out that when using other formats such as .ogg files, the playback duration of a given sample can be variable (see https://forestmist.org/blog/web-audio-api-loops-and-formats for details on this). This means that when using ogg files with my existing solution due to slight variability in the exact duration of loops the different samples fall out of sync with each other. 

Unfortunately I realised this after I had already implemented my solution working with wavs; had I realised this earlier I would have designed my solution to actually calculate the bar length of each sample, and then loop it according to that bar length using Tone.Transport (specifically using Tone.Loop), without relying on a precise playback duration. However as when I discovered this I was already in excess of the 10 hour limit prescribed for completing this task, I have submitted my solution with wav files, with the massive downside that this means about 50mbs of data need to be downloaded every time the page is loaded. This is a valuable lesson for future sample based work with the Web Audio API, as this is only my second time using it (the first being the demo app I submitted previously).



Other assumptions:

– In order to guarantee a 4/4 measure (as is desirable for this session view), beyond the bar-aligned playback it is necessary that all samples used by the developer have the same bpm, and that they have a precise length of 1,2 or 4 bars (with respect to that bpm). 

– As a sample can be started at any bar-aligned point with regards to the other samples, as well as stopped at any bar-aligned point within itself, the samples used need to be constructed in such a way that all these cases sound 'smooth' (i.e.no rhythmic or melodic dissonance).



Improvements: 

As this was a timed task, in the interest of speed various corners were cut. Below are the key future improvements to the code.

– The html for the sample player grid as well as for the effects grid include tons of code repetition. While having this code written out facilitated faster development, it would be much better practice (and a more scalable approach) to either generate the html in javascript, or better yet to have an html file containing the basic code (e.g. for a single sample player) and then concatenate many instances of that in javascript.

– Widgetisation: ideally the architecture should be refactored so that the sample player is a reusable widget.

– Better reverb.

– I was unable to find a pure JavaScript knob/dial that worked well on smaller screens. Thus I opted for a jquery knob, the major down side of this being that the user has to load the whole of jquery just to use the dials...In the future will most probably write my own pure javascript dial.

– It is possible to click a play button before it's sample has been loaded. To fix this, a 'loading' UI element needs to be added to the page until everything is loaded and ready to render, as is the case with ableton.learning.com's session view.

– The page functions on chrome, firefox, and their respective mobile browsers (although as mentioned the current use of wav files would prohibit loading the page using mobile data due to the 49mbs of audio the page downloads). It does not work on microsoft edge (this needs to be fixed), and other browsers remain to be tested.

– Horrendous page loading time: As mentioned the biggest improvement is changing the solution so that it does not rely on the exact playback duration of a sample, thus allowing the use of ogg files. This will reduce the audio data that needs to be downloaded from 49mb to 1.7mb, thus drastically improving page load time.