var inquirer = require('inquirer');
var Game = require('./Game.js');

var game = new Game();

function initHangman() {
	game.startNewGame();
	promptAndProcessInput();
}

function promptAndProcessInput () {
	inquirer.prompt([{
		type: 'input',
		name: 'userGuess',
		message: 'Enter guess (letter a-z or number 0-9):',
		validate: function(value) {
			var validInputs = /[a-z]|[0-9]/i;
			if(value.length == 1 && validInput.test(value))
				return true;

			return 'Please enter a valid guess";'
		}
	}]).then(function(answer) {
		var userGuess = answer.userGuess.toUpperCase();

		if(game.lettersUsed.indexOf(userGuess) === -1) {
			game.lettersUsed.push(userGuess);

			var correct = game.word.checkLetterInput(userGuess);

			if(correct) {
				game.printResults("You guessed a correct letter");
			} else {
				game.livesRemaining--;
				game.printResults("You guessed a wrong letter");
			}
		} else {
			game.printResults("You already used that letter");
		}

		var userWon = game.word.getDisplayWord() === game.word.getTargetWord();

		if(userWon) {
			game.wins++;
			endCurrentGame('You won');
		} else if(game.livesRemaining > 0) {
			promptAndProcessInput();
		} else {
			game.losses++;
			endCurrentGame("You lost");
		}


	});
}

// application go!
initHangman();