let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let started = false;

let level = 0;

let arr = [...document.querySelectorAll(".btn")];

let title = document.querySelector("h1");

let body = document.querySelector("body");

let startButton = document.querySelector(".start-btn");

let restartButton = document.querySelector(".restart-btn");

document.addEventListener('keydown', function(e){

	if (started == false){

		title.innerHTML = `Level ${level}`;

		started = true;

		nextSequence();

	}

});


arr.map(elem => elem.addEventListener('click', function() {

		userClickedPattern.push(this.id);
		
		animation(this.id);

		sound(this.id);

		checkAnswer(userClickedPattern.length-1);

})); 

startButton.addEventListener('click', function(){

	if (started == false){

		title.innerHTML = `Level ${level}`;

		started = true;

		nextSequence();

	}
});

function locationreload() {
        location.reload();
          
}


const nextSequence = () => {

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	userClickedPattern = [];

	level++;

	title.innerHTML = `Level ${level}`; 

	animation(randomChosenColour);

	sound(randomChosenColour);

}  

function checkAnswer(currentLevel){

	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		if (userClickedPattern.length == gamePattern.length){
			setTimeout(function(){
				nextSequence();
			}, 1000);
		}
	} 
	else {
		sound("wrong");
			body.classList.add("game-over");
			title.innerHTML = 'Game Over, Press any key to Restart';
			setTimeout(function(){
				body.classList.remove("game-over");
			}, 100);
		startOver();
	}

}

const animation = (randomChosenColour) => {

	let button = document.querySelector(`#${randomChosenColour}`);

	button.classList.add("pressed");

	setTimeout(function(){
		button.classList.remove("pressed");
	}, 50);
}

const sound = (btnpressed) => {

	switch(btnpressed) {
		case "yellow":
			let audio1 = new Audio('yellow.mp3');
			audio1.play();
			break;
		case "blue":
			let audio2 = new Audio('blue.mp3');
			audio2.play();
			break;
		case "green":
			let audio3 = new Audio('green.mp3');
			audio3.play();
			break;
		case "red":
			let audio4 = new Audio('red.mp3');
			audio4.play();
			break;
		case "wrong":
			let audio5 = new Audio('wrong.mp3');
			audio5.play();
			break;
	}

}

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}