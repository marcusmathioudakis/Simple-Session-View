import Tone from "tone";

export default class EffectsChain {
	constructor() {
		this.effects = ["gain", "delay", "reverb"];
		this.gain = Tone.context.createGain();
		this.gain.gain.value = 0.7;
		this.delay = new Tone.FeedbackDelay("8n", 0);
		this.reverb = new Tone.JCReverb(0);
		this.delay.connect(this.reverb);
		this.reverb.connect(this.gain);
		this.gain.toMaster();
	}

	getEffectNames() {
		return this.effects;
	}

	setEffectValue(effectName, value) {
		if (effectName === "gain") {
			this.gain.gain.value = value;
		} else if (effectName === "delay") {
			this.delay.feedback.value = value;
			this.delay.delayTime.value = "8n";
		} else if (effectName === "reverb") {
			this.reverb.roomSize.value = value;
		}
	}

	/**
	returns an audio node that can be used to 
	connect an audio source to this effects chain
	**/
	getAudioNode() {
		return this.delay;
	}
}
