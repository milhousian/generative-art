float xstart, xnoise, ynoise;

void setup(){    
  size(300,300);
  smooth();
  background(255);
  xstart = random(10);
  xnoise = xstart;
  ynoise = random(10);
  
  for (int y = 0; y<=height; y+=2){
    ynoise +=0.1;
    xnoise = xstart;
    for (int x = 0; x <= width; x+=2){
      xnoise +=0.1;
      drawPoint(x,y,noise(xnoise,ynoise));
      }
  }
}

void drawPoint(float x, float y, float noiseFactor){
  pushMatrix(); //store previous drawing position
  translate(x,y); // move the drawing position by the x and y values passed
  rotate(noiseFactor*radians(360)); // rotates by the amount specified, here, noise
  stroke(0, 40); // 
  line(0,0,40,0); // draw a 20px line
  popMatrix(); // restore previous drawing position
}
