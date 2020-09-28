import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class sketch_2020_9_5_2300h extends PApplet {



public void settings() {
  size(800, 800);
  
}

public void setup() {
  background(255); // we start with a white background
  frameRate(30);
//  colorMode(HSB);
  
  // as part of setup, let's uhhhh... create some organisms
  createOrganisms();
}

// ========================
// ITS GLOBAL VARIABLE TIME
// ==== don't act like you're not excited ===
// hey let's do some global variables, that's what cool kids do
int number_rows = 20;

// why is this 12 when it's calculated as 800/8 which should be 100? WTF
// int row_height = height)/number_rows;


// let's hard code this
// it works when it's hard coded
int row_height = 40;



// define an empty array of Organisms
Organism[] _organismArray = {};


// main draw loop!
// this is the main loop and we loop through this until we break
public void draw() {

  // while the loop counter is less than the number of items in the array, do this and iterate
  // and this loop is run once per frame
  for ( int i = 0; i < _organismArray.length; i ++){
    // we're establishing a temporary loop variable of organisms, called thisOrganism
    // each time through, it pulls out the one at the marker in the iteration loop
    Organism thisOrganism = _organismArray[i];
    
// -- IN WHICH I GET AHEAD OF MY ABILITY --    
// hey it's comment everything out theater!
// what I wanted to do here was to also pull the previous and the last one in so I could pull stuff out of 'em
    // now for a tricky thing we're going to grab previous one
    // this can be out of bounds if it's the first one, so
    float prev_hue, next_hue;
    prev_hue = 0;
    next_hue = 0;
    if (i==0){
      Organism prevOrganism = _organismArray[i];
      prev_hue = prevOrganism.current_hue;
    }
    // I should figure out how to do an if else loop in javascript
    
    if (i>0){
      Organism prevOrganism = _organismArray[i-1];
      prev_hue = prevOrganism.current_hue;
    }
    
    // then we're going to pull the next one in the array    
    // this can be out of bounds if it's the last one, so
    if (i==_organismArray.length){
      Organism nextOrganism = _organismArray[0];
      next_hue = nextOrganism.current_hue;
    }
    // I should figure out how to do an if else loop in javascript
    
    if (i<_organismArray.length-1){
      Organism nextOrganism = _organismArray[i+1];
      next_hue = nextOrganism.current_hue;
    }


    // okay so right now this is where the heavy lifting is being done
    // todo make that not the case
    //  move downwards, filling each "row" with the color of that organism
    int startx, starty;
    int targetx, targety;
    startx = 0;
    starty = 0 + (i * row_height);
    targetx = width;
    targety = (starty + row_height);

    noStroke();
    fill(thisOrganism.current_color);
    rect(startx, starty, targetx, targety);
 
     // and then we call on it to set its current color to the blend
     // this seems to be crashing for some reason
     // float prev_hue = prevOrganism.current_hue;
     // thisOrganism.calculateNewcolor(prevOrganism.current_hue, nextOrganism.current_hue);

     // here's the wimpy hard coded version
     thisOrganism.calculateNewcolor(prev_hue, next_hue);

 
    // and then we call it to update
    thisOrganism.updateMe();
  }
}



public void createOrganisms(){  

  // okay, so let's iterate through this loop
  // we'll need to create one organism per row

    for ( int i = 0; i < number_rows; i += 1){
    
      // for each loop through, temporary organism variable and drop a new organism into it
      Organism thisOrganism = new Organism();
    
      // hey then draw it
      thisOrganism.drawMe();
    
      // then add it to the array of organisms
      _organismArray = (Organism[])append(_organismArray, thisOrganism);
  }
}


class Organism {
  float energy; // the amount of energy the organism has, used for luminosity
  float age; // the number of turns the organism has, used for saturation (?)
  float true_hue; // the hue of the organism as expressed
  float current_hue; // what it is right now
  float size; // it would be good to use this to track how large it has gotten
  
  float x, y;
  int current_color;
  boolean is_energetic;
  boolean is_aging;
  boolean is_whuffling;
  

  // let's define the starting values for an organism
  Organism(){
  x = 0;
  y = 0;
  energy = random(0,255);
  age = 0;
  true_hue = random(0,255);
  current_hue = true_hue;
  
  is_energetic = true;
  is_aging = true;
  is_whuffling = true;
  
  current_color = color(energy, age, current_hue);
  }
  
public void drawMe(){

//  noStroke();
//  fill(orgcolor);

//// AHA CHECK OUT THIS WEAK-ASS BULLSHIT HARDCODING
//  rect(x, y, 800, y + row_height);
}

// okay so let's do a function that sets the color according to the three values passed it
public void calculateNewcolor(float prev_hue, float next_hue){
  // average those three numbers

    current_hue = ((prev_hue + next_hue + true_hue)/3);
    
    // just keeping an eye on things  
    println(prev_hue, " ", next_hue, " ", true_hue, " ", current_hue);
}

// okay so each time through the cycle, what happens to the organism?
public void updateMe(){
  // if it's too energetic, set it on the path back
  if (energy > 254){
    is_energetic = false;
  }
  
  // but if it's too tired, set it to energetic
  if (energy < 1){
    is_energetic = true;
  }
  
  if (is_energetic == true) {
//     energy += (noise(energy) * 10);
    energy++;
  }
  
  if (is_energetic == false) {
    energy = energy -1;
  }
  
  // println(is_energetic, " ", energy);
    
    
  // if we don't set the orgcolor to the new values it'll stick with the old
  current_color = color(energy, age, true_hue);


}

}  
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "sketch_2020_9_5_2300h" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
