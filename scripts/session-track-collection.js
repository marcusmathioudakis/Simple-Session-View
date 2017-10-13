/**
class representing a collection of tracks, each of which is made up of a collection of sample players. 
Uses Tone.Transport in Tone.js to achieve grid aligned sample playback between tracks.
**/
class SessionTrackCollection {

	constructor(bpm) {
		// bpm value is used by the Transport  
		// to infer playback rate in terms of beats per minute
		// Tone.Transport.stop(1);
		Tone.Transport.bpm.value = bpm; 
		//stores the tracks that make up the session view
		this.tracks = new Map();
		//stores Ids of tracks that are playing
		this.activeTrackIds = new Set();
	}

	addTrack(id, track) {
		this.tracks.set(id, track);
	}

	play(trackId, playerId) {
		var track = this.tracks.get(trackId);
		this.activeTrackIds.add(trackId);
		track.play(playerId);
	}

	stop(trackId, playerId) {
		var track = this.tracks.get(trackId);
		this.activeTrackIds.delete(trackId);
		var stopTransport = false;
		// if we are stopping the last track then 
		// stop the transport.
		if (this.activeTrackIds.size == 0) {
			stopTransport = true;
		}
		track.stop(playerId, stopTransport);
	}

	setEffectValueForTrack(effectName, trackId, value) {
		var track = this.tracks.get(trackId);
		track.setEffectValue(effectName, value);
	}

}