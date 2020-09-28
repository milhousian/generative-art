size(1000,1000);
background(255);
strokeWeight(3);
smooth();

float radius = 10;
int centX = 500;
int centY = 500;

// stroke(0,30);
// noFill();

// ellipse(centX, centY, radius*2, radius*2);

float x, y;
float lastx = -999;
float lasty = -999;
float startingangle = 0;
float startingblue = 0;
float currentblue = startingblue;
float linecount = 255;

// let's define the outerloop;

for (float outerloop = 0; outerloop <= linecount; outerloop +=1){
  // reset our variables
  x = 0;
  y = 0;
  radius = 10;
    
  stroke(currentblue, currentblue, currentblue, 75);
  for (float ang = startingangle; ang <= 1440; ang +=3){
    radius +=  0.5;
    float rad = radians(ang);
    x = centX + (radius * cos(rad)) + 40 * noise(ang);
    y = centY + (radius * sin(rad)) + 40 * noise(ang);
    //x = centX + (radius * cos(rad)) ;
    //y = centY + (radius * sin(rad)) ;
    point(x,y);
  }
  // increment the starting angle
  startingangle += (360/linecount);
  // make the blue darker
  currentblue = currentblue + (255/linecount);
}
