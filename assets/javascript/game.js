var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
               "p","q","r","s","t","u","v","w","x","y","z"];

Array.prototype.contains = function(event) { 
	for (var i in this) {
		if (this[i] == event) return true;
	}
	return false;
}

function computerLetter() {
	    var letter = letters[Math.floor(Math.random() * letters.length)]; 
    	console.log(letter);
    	return letter; //letters[Math.floor(Math.random() * letters.length)];
}

var psychicGame = {
	//# of times the user has guessed the letter correctly
	wins : 0,
	//# of times the user has failed to guess the letter correctly after exhausting all guesses
	losses : 0, 
	//# of guesses left. This will update
	guessesLeft : 9, 
	// Your Guesses so far: # of times the user has failed to guess the letter correctly after exhausting all guesses
	guesses : [], 
    letter : computerLetter(),
    toHTML : function() {
		var html = "<p>Wins: " + 
			this.wins + 
			"</p>" +
			"<p>Losses: " + 
			this.losses + 
			"</p>" +
			"<p>Guesses Left: " + 
			this.guessesLeft + 
			"</p>" +
			 "<p>Your Guesses so far: " + 
			 this.guesses +
			"</p>";
			console.log(this.guesses);
		return html;
    },
    initGame : function() {
    	this.guessesLeft = 9;
		this.guesses = [];
		this.letter = computerLetter();
		document.querySelector('#game').innerHTML = this.toHTML();
    },
    win : function(userLetter) {
    	this.wins ++;
    	var msg = "YOU WIN - \nYou pressed correct letter: "+userLetter; 
    	alert(msg);
    	this.initGame();
    },
    wrongGuess : function(userLetter) {
    	if(this.guesses.contains(userLetter) == false) {
    		this.guessesLeft--;
			this.guesses.push(userLetter);
			document.querySelector('#game').innerHTML = this.toHTML();
			if(this.guessesLeft == 0) {
			    this.losses++;
			    var msg = "No more guesses LEFT! \nCorrect Letter : "+this.letter; 
    			alert(msg);
    			this.initGame();	
			}
		} else {
			var msg = "Duplicate Letter : "+userLetter; 
			alert(msg);
		}
    }
}

// When the user presses the key it records the keypress
document.onkeyup = function(event2) {
	var userLetter = String.fromCharCode(event.keyCode).toLowerCase();
    if(letters.contains(userLetter) == true) {
		if(psychicGame.letter == userLetter) {
			psychicGame.win(userLetter);
		} else {
			psychicGame.wrongGuess(userLetter);
		}
	} else {
		alert("Please press a key for a letter in alphabet");

	}
	
}