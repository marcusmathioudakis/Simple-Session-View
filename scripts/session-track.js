/**
class representing a track made up of a collection of samplers.
**/
class SessionTrack {

	constructor(trackId){
		this.trackId = trackId;
		// stores the sample players that make up this track
		this.players = new Tone.Players();
		//Id of player currently playing
		this.currentPlayerId = null;
		//Id of player that is queued to start at next measure
		this.nextPlayerId = null;

		//Effects
		this.gain = Tone.context.createGain();
		this.gain.gain.value = 0.7;
		this.distortion = new Tone.Distortion(0.0);
		this.delay = new Tone.FeedbackDelay("8n", 0);
		this.reverb = new Tone.JCReverb(0);

		this.distortion.connect(this.delay);
		this.delay.connect(this.reverb);
		this.reverb.connect(this.gain);
		this.gain.toMaster();
	}

	/**
	add a new sample player to this track, loading in the sample from the url
	**/
	addPlayer(playerId, url) {
		this.players.add(playerId, url);
		var player = this.players.get(playerId);	
		player.loop = true;
		player.connect(this.distortion);
	}

	setEffectValue(effectName, value){
		if(effectName == "gain") {
			this.gain.gain.value = value;
		}
		else if(effectName == "distortion") {
			this.distortion.distortion = value;
		}
		else if (effectName == "delay") {
			this.delay.feedback.value = value;
			this.delay.delayTime.value = "8n"; 
		}
		else if (effectName == "reverb") {
			this.reverb.roomSize.value = value;
		}
	}

	/**
	queue the player with id playerId to begin playing at the start of next measure, 
	and stop the current sample player at that time. Update the GUI to reflect this.
	**/
	play(playerId) {
		if (this.currentPlayerId == null) {
			this.currentPlayerId = playerId;
		}
		//dequeue any other players that are queued to play
		var trackElement = document.querySelector("#" + this.trackId);
		trackElement.querySelectorAll(".queued").forEach(function(queuedPlayerElement) {
			queuedPlayerElement.classList.remove("queued");
		});
		//queue this player to play next
		var nextPlayerButton = document.querySelector("#" + playerId);
		nextPlayerButton.className += " queued";
		// if there are no queued players, then schedule the callback for changing players
		// at the start of the next measure
		var track = this;
		if (this.nextPlayerId == null) {
			Tone.Transport.scheduleOnce(function(time) {
				//stop the currently playing player
				var currentPlayerId = track.currentPlayerId;
				var currentPlayer = track.players.get(currentPlayerId);
				currentPlayer.stop();
				var currentPlayerButton = document.querySelector("#" + currentPlayerId);
				currentPlayerButton.classList.remove("playing");
				//start the queued player
				var nextPlayerId = track.nextPlayerId; 
				var nextPlayer = track.players.get(nextPlayerId);
				var nextPlayerButton = document.querySelector("#" + nextPlayerId);
				nextPlayer.start();
				if (LOG_DATA){
					console.log("player " + playerId + " started at: " + Tone.context.currentTime);
				}
				nextPlayerButton.classList.remove("queued");
				nextPlayerButton.className += " playing";
				//update the track
				track.currentPlayerId = nextPlayerId;
				track.nextPlayerId = null;
				// this schedules the callback to be invoked at the start of the next measure
			}, "@1m")
		}
		this.nextPlayerId = playerId;
	}

	/**
	stop the player with id playerId at the start of the next measure. 
	stopTransport is used to determine whether we should also stop 
	the transport.
	**/
	stop(playerId, stopTransport = false) {
		//queue this player to stop
		var button = document.querySelector("#" + playerId);
		button.className += " queued";
		var track = this;
		Tone.Transport.scheduleOnce(function(time) {
			// stop the sample player
			var player = track.players.get(playerId);
			player.stop();	
			// update the button
			var button = document.querySelector("#" + playerId);
			button.classList.remove("playing");
			button.classList.remove("queued");
			
			if (stopTransport) { 
				Tone.Transport.stop();
				if (LOG_DATA){
					console.log("Transport stopped at: " + Tone.context.currentTime);
				}
			}
		}, "@1m") 

	}
}