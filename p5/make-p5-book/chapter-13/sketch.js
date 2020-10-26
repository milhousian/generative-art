var capture;

function setup(){
 	createCanvas(480,240);
	capture = createCapture();
//	capture.hide();
}

function draw(){
	var aspectRatio = capture.height/capture.width;
	var h = width * aspectRatio;
	image(capture, 0, 0, width, h);
	filter(INVERT);
}
	