size(500, 500);
background(255);
strokeWeight(.5);
smooth();

// where do you start drawing
int centX = 250;
int centY = 250;

float x, y;

// okay let's go through this 100 times
for (int i = 0; i < 100; i++){
  float lastx = -999;
  float lasty = -999;

  // how much noise? 
  
  // this determines the wobble of the spirals
  float radiusNoise = random(10);
  //float radiusNoise = noise(i);
  
  // what does this... what
  float radius = 10;


  // stroke sets the color you use
  // using three values means it's red, green, blue
  stroke(20, 50, random(70,80));

  int startangle = int(random(360));
  int endangle = 1440 + int(random(1440));
  int anglestep = 5 + int(random(3));
  
 // as long as the current angle is less than the end angle...
  for (float ang = startangle; ang <= endangle; ang += anglestep){
    // incrementing radius noise
    // when this is very low, it stays spiral like
    radiusNoise += 0.05;
    
    // this determines how quickly it spirals out
    radius += 0.5;
    
    // okay so interestingly this is using noise already and then amplifying it a lot
    // so this is taking the pseudo-random radiusNoise, the seed of which is amplified each tome
    float thisRadius = radius + (noise(radiusNoise) * 200) - 100;
    float rad = radians(ang);
    
    // so as we loop through, we set each point by the center point
    x = centX + (thisRadius * cos(rad));
    y = centY + (thisRadius * sin(rad));
    
    // if we've been through this loop at least once, draw a line
    // from where the last one ended to the new point
    if (lastx > -999){
      line(x, y, lastx, lasty);
    }
    // then set the last coordinate values
    lastx = x;
    lasty = y;
  }
}
