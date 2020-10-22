var gray = [];

function setup(){
 	createCanvas(480,240);
	for (var i=0; i < width; i++){
// 	gray[i] = random(0,255);
	gray[i] = map(noise((i/50)), 0, 1, 0, 255);
	}
}

function draw(){
	background(204);
	for (var i = 0; i < gray.length; i++){
		stroke(gray[i]);
		line(i, 0, i, height);	
	
	}
	
}
	