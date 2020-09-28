var x = 60;
var y = 440;
var radius = 45;
var bodyHeight = 180;
var neckHeight = 40;

var easing = 0.04;


function setup() {
	createCanvas(360, 480);
	strokeWeight(2);
	ellipseMode(RADIUS);
}

function draw() {

	var neckY = -1 * (bodyHeight + neckHeight + radius);
	
	background(204);
	
	translate(mouseX, y); // move all to mousex, y
	
	if (mouseIsPressed){
		scale(1.0);
	} else {
		scale(0.6);
	}

// body
noStroke();
fill(102);
ellipse(0, -33, 33, 33);
fill(0);
rect(-45, -bodyHeight, 90, bodyHeight - 33);

// neck
stroke(102);
line(12, -bodyHeight, 12, neckY);

// hair
push();
translate(12, neckY);
var angle = -PI/30.0;
for (var i = 0; i < 30; i++){
	line(80,0,0,0);
	rotate(angle);
}
pop();

// head
noStroke();
fill(0);
ellipse(12, neckY, radius, radius);
fill(255);
ellipse(24, neckY-6, 14,14);
fill(0);
ellipse(24, neckY-6,3,3);




}