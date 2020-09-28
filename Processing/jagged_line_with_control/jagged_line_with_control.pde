size(500,100);
background(255);
strokeWeight(5);
smooth();

stroke(0,40);
line(20,50,480,50);

stroke(20,50,70);
float randx = random(width);
float randy = random(height);

float xstep = 10;
float ystep = 10;
float lastx = 20;
float lasty = 50;


// int step = 10;
float y = 50;
int borderx=20;
int bordery=10;

int border = 20;

for (int x = 20; x<=480; x+=xstep){
  ystep = random(20) - 10; // rnage -10 to 10
  y += ystep;
  line (x,y,lastx, lasty);
  lastx = x;
  lasty = y;
}
