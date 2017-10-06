//Map GUI elements to classes representing tracks and sample players
const BPM = 102;
var trackCollection = new SessionTrackCollection(BPM);
var trackElements = document.querySelectorAll('.track')
trackElements.forEach(function(trackElement) {
	//add track to collection
	var trackId = trackElement.getAttribute("id");
	track = new SessionTrack(trackId);
	trackCollection.addTrack(trackId, track);
	//add players to track
	var playerElements = trackElement.querySelectorAll('.player');
	playerElements.forEach(function(playerElement) {
		var playerId = playerElement.getAttribute("id")
		var url = playerElement.getAttribute("url")
		track.addPlayer(playerId, url);
		playerElement.addEventListener('click', function() {
			if ( playerElement.classList.contains("playing")
				|| playerElement.classList.contains("queued")) {
				trackCollection.stop(trackId, playerId);
			} 
			else {
				trackCollection.play(trackId, playerId);
			}
		})
	});

}); 


