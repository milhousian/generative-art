size(500, 300);
background(255);
strokeWeight(5);
smooth();

float radius = 100;
int centX = 250;
int centY = 150;

stroke(0,30);
noFill();
// draw a circle in gray
ellipse(centX, centY, radius*2, radius*2);

stroke(20,50,70);
float x, y;

// these are unused in the loop so I'm not sure why they're here
//float lastx = -999;
//float lasty = -999;

// hey guess what it's important that it be multiplication
for (float ang = 0; ang <= 360; ang +=5){
  float rad = radians(ang);
  x = centX + (radius * cos(rad));
  y = centY + (radius * sin(rad));
  point(x,y);
}
