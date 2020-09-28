// set a bunch of varialbes
float _angnoise, _radiusnoise;
float _xnoise, _ynoise;
float Pi = 3.14159;
float _angle = -Pi/2;
float _radius = 100;
float _strokeCol = 254; // initially we set the stroke color to very dark
int _strokeChange = -1;


void setup(){
  size(800, 800);
  smooth();
  frameRate(30);
  background(255);
  noFill();

  
  _angnoise = random(10);
  _radiusnoise = random(10);
  _xnoise = random(10);
  _ynoise = random(10);
}

void draw(){
  
  // make the length of the connecting lines change by varying the radius with a value as it rotates
  _radiusnoise += 0.0005;
  _radius = (noise(_radiusnoise)*550)+1;
  
  // allow the angle to increase or decrease
  _angnoise += 0.005; // 0.005 in the original
  _angle += (noise(_angnoise)* 6) - 3;   // originally (noise(_angnoise)* 6) - 3
  if (_angle > 360){_angle -=360;}
  if (_angle < 0){_angle +=360;}
  
  // wobbles the center of the circle a little by using noise to move it it +/- pixels in both dimensions
  _xnoise +=0.01;   // originally +0.01
  _ynoise +=0.01;   // originally +0.01
  float centerX = width/2 + (noise(_xnoise)* 100)-50;       // originally width/2 + (noise(_xnoise)* 100)-50;
  float centerY = height/2 + (noise(_ynoise) * 100) -50;    // originally height/2 + (noise(_xnoise)* 100)-50;
  
  float rad = radians(_angle);
  float x1 = centerX + (_radius * cos(rad));
  float y1 = centerY + (_radius * sin(rad));
  
  
  float opprad = rad + Pi;
  float x2 = centerX + (_radius * cos(opprad));
  float y2 = centerY + (_radius * sin(opprad));

  // set the stroke color by adding stroke change to it
  _strokeCol += _strokeChange;
  // if it got to 255, set the increment to negative so the color value goes down
  // if it got under 0, set it so it'll increment up
  if (_strokeCol > 254){_strokeChange = -1;}  
  if (_strokeCol < 0){_strokeChange = 1;}
  
  // then the next time through, stroke color is set to stroke change, which is 1, 
  // as a result doesn't trigger either condition, and 
  // each time through stroke color is set to stroke change of 1
  
  // so the stroke command takes a number, if it's a float it's a value between white and black, and then a number for alpa)
  stroke(_strokeCol, 60);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}
