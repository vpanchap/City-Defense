/// To do. Migrate to Quintus for collision detection and such.

// Globals
{
	var citydefense = {};
	citydefense.keyspressed = [];
	citydefense.asteroid = {
		speed: 5,
		x: 0,
		y: 0,
		directionX: 1,
		directionY: 1
	}
	citydefense.score = 0;
	
	var KEY = {
		UpArrow: 38,
		DownArrow: 40
		// Space to pause the game
	}
}

$(function(){
	// Run gameloop every 30 milliseconds
	citydefense.timer = setInterval(gameloop, 30);

	// Capture keys pressed
	$(document).keydown(function(keypressed){
		citydefense.keyspressed[keypressed.which] = true;
	});
	$(document).keyup(function(keyreleased){
		citydefense.keyspressed[keyreleased.which] = false;
	});

})

function gameloop(){
	movetrampoline();
	moveasteroid();
}

function movetrampoline(){
	if(citydefense.keyspressed[KEY.UpArrow] === true)
	{
		var top = parseInt($("#trampoline").css("top"), 10);
		$("#trampoline").css("top", top-5);
	}
	if(citydefense.keyspressed[KEY.DownArrow] === true)
	{
		var top = parseInt($("#trampoline").css("top"), 10);
		$("#trampoline").css("top", top+5);
	}
}

function moveasteroid(){
	// Locals
	var spaceheight = parseInt($("#space").height());
	var spacewidth = parseInt($("#space").width());
	var asteroid = citydefense.asteroid;


	// Bounce off the edges of space
	{
		if(asteroid.y + asteroid.speed * asteroid.directionY < 0 )		// At any point of time the asteroid is where it started on Y axis plus distance traveled on Y axis since it started moving
		{
			asteroid.directionY = 1;
		}
		if(asteroid.y + asteroid.speed * asteroid.directionY > spaceheight )
		{
			asteroid.directionY = -1;
		}
		if(asteroid.x + asteroid.speed * asteroid.directionX < 0 )
		{
			asteroid.directionX = 1;
		}
		if(asteroid.x + asteroid.speed * asteroid.directionX > spacewidth )
		{
			asteroid.directionX = -1;
		}
	}

	// Bounce off the trampoline
	{
		var trampoline = {};
		trampoline.top = parseInt($("#trampoline").css("top"));
		trampoline.right = parseInt($("#trampoline").css("left")) + parseInt($("#trampoline").css("width"));
		trampoline.verticalcoverage = parseInt($("#trampoline").css("top")) + parseInt($("#trampoline").css("height"));

		if( (asteroid.x + asteroid.speed * asteroid.directionX) > trampoline.right )
		{
			if ( 	( (asteroid.y + asteroid.speed * asteroid.directionY) < trampoline.verticalcoverage )
					&&
					( (asteroid.y + asteroid.speed * asteroid.directionY) > trampoline.top)
				)
			{
				asteroid.directionX = -1;
				citydefense.score++;
				$("#score").html(citydefense.score);
			}
		}
	}

	asteroid.x += asteroid.speed * asteroid.directionX;
	asteroid.y += asteroid.speed * asteroid.directionY;

	$("#asteroid").css({
		"top" : asteroid.y,
		"left" : asteroid.x
	});
}