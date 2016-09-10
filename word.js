var Letter = require("./Letter.js");

var regEx = /[a-z]|[0-9]/i;

function Word (target) {
	this.target = target;
	this.letterArray = target.toUpperCase().split('');
	this.displayWord = this.generateDisplayWord();

	this.generateDisplayWord = function() {
		var displayWordArray = [];
		for (var i = 0; i < this.target.length; i++) {
			if(regEx.test(this.target[i]) )
				displayWordArray.push(new Letter(this.target[i].toUpperCase()));
			else
				displayWordArray.push(this.target[i]);
		}

		return displayWordArray;
	}

	this.checkLetterInput = function(letter) {
		var isCorrect = false;

		for (var index in this.displayWord) {
			if(letter.toUpperCase() === this.displayWord[index]) {
				this.displayWordArray[index].guessed = true;
				isCorrect = true;
			}
		}
		return isCorrect;
	}

	this.getTargetWord = function() {
		return this.displayWordArray.join('');
	}

	this.getDisplayWord = function () {
		var display = '';

		for (var index in this.displayWordArray) {
			if(regEx.test(this.displayWordArray[index])) {
				display += this.displayWordArray[index].getCharacter();
			} else {
				display += this.displayWordArray[index];
			}			
		}
		return display;
		// make Letter returns same type
		// encapsulate letter more, so it always returns the same type

	}
}

module.exports = Word;