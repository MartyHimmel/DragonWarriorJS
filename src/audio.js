import map from './map.js';

export default {
	current_music: '',
	sound_effect: '',

	// used for background music
	play_map_music: function() {
		if (this.current_music === "") {
			this.current_music = new Audio('assets/music/dw1' + map.background_music + '.mp3');
			this.current_music.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			this.current_music.play();
		} else {

		}
	},

	stop_music: function() {
		if (this.current_music !== "") {
			this.current_music.pause();
			this.current_music = "";
		}
	},

	// used for sound effects
	play_sound: function(effect) {
		if (this.sound_effect === "") {
			this.sound_effect = new Audio('assets/sounds/dw1' + effect + '.mp3');
			this.sound_effect.play();
		} else {
			if (this.sound_effect.currentTime > 0.5) {
				this.sound_effect.currentTime = 0;
			}
			this.sound_effect.play();
		}
	},

	stop_sound: function() {
		if (this.current_music !== "") {
			this.sound_effect.pause();
			this.sound_effect = "";
		}
	}
};
