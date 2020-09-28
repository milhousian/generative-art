function setup() {
  createCanvas(480,120);
  x = width/2;
}

function draw() {
	background(204);
	if (mouseX > x){
		x += 0.5;
		offset = -10;
	}
	if (mouseX < x){
		x -= 0.5;
		offset = 10;
	}
	// draw arrow depending on offset
	
	line(x, 0, x, height);
	line(mouseX, mouseY, mouseX + offset, mouseY -10);
	line(mouseX, mouseY, mouseX + offset, mouseY +10);
	line(mouseX, mouseY, mouseX + offset*3, mouseY);
}