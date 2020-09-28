size(500,100);
background(255);
strokeWeight(5);
smooth();

stroke(0,30);
line(20,50,480,50);
stroke(20,50,70);

float randx = random(width);
float randy = random(height);

float xstep = 10;
float ystep = 10;


int step = 1;
float lastx = -999;
float lasty = -999;
float ynoise = random(10);
float y;

// draw a line starting at 20, every 10 units, set a y point
// so is this drawing line after line after line?
// i think it is, it doesn't seem to be doing the 'set a bunch of things then stroke'
for (int x = 20; x<=480; x+=step){
  y = 10 + noise(ynoise) * 80;
  if (lastx > -999){
    line(x,y, lastx, lasty);
  }
  lastx = x;
  lasty = y;
  ynoise += 0.1;
}
