//import com.hamoid.*;
//VideoExport videoExport;

public void settings() {
  size(800, 800);
  
}

void setup() {
  background(255); // we start with a white background
  frameRate(20);
  
  // set up video export
   //videoExport = new VideoExport(this);
   //videoExport.startMovie();  
  
// boy do I spend a lot of time here  
// https://processing.org/tutorials/color/
//  colorMode(HSB, 360, 100, 100);
  
  // as part of setup, let's uhhhh... create some organisms
  createOrganisms();
}

// ========================
// ITS GLOBAL VARIABLE TIME
// ==== don't act like you're not excited ===
// hey let's do some global variables, that's what cool kids do
int number_rows = 100;

// TODO: I don't get why this works when it's a thing like this
// why is this 12 when it's calculated as 800/8 which should be 100? WTF
// int row_height = height)/number_rows;

// it works when it's hard coded
int row_height = 8;

// define an empty array of Organisms
Organism[] _organismArray = {};


// main draw loop!
// this is the main loop and we loop through this until we break
void draw() {

  // while the loop counter is less than the number of items in the array, do this and iterate
  // and this loop is run once per frame
  for ( int i = 0; i < _organismArray.length; i ++){
    // we're establishing a temporary loop variable of organisms, called thisOrganism
    // each time through, it pulls out the one at the marker in the iteration loop
    Organism thisOrganism = _organismArray[i];
    
// -- IN WHICH I GET AHEAD OF MY ABILITY --    
// we're going to grab its neighbors so we can pick their hues
// NOW! If I could just figure out how to iterate through the array that'd be a way to do this
    int prev_hue, next_hue;
    prev_hue = 0;
    next_hue = 0;

  int prev_red = 0;
  int next_red = 0;
  int prev_green =0;
  int next_green = 0;
  int prev_blue = 0;
  int next_blue = 0;


    // we're going to grab previous one
    // this can be out of bounds if it's the first one, so we fudge
    // TODO: wrapping around would be cool as hell

    if (i==0){
//      prev_hue = thisOrganism.cur_hue;
      prev_red = thisOrganism.cur_red;
      prev_green = thisOrganism.cur_green;
      prev_blue = thisOrganism.cur_blue;
    } else {
      Organism prevOrganism = _organismArray[i-1];
//      prev_hue = prevOrganism.cur_hue;
      prev_red = prevOrganism.cur_red;
      prev_green = prevOrganism.cur_green;
      prev_blue = prevOrganism.cur_blue;
    }
    
    // then we're going to pull the next one in the array    
    // this can be out of bounds if it's the last one, so
    if (i==_organismArray.length){
      Organism nextOrganism = thisOrganism;
      next_red = nextOrganism.cur_red;
      next_green = nextOrganism.cur_green;
      next_blue = nextOrganism.cur_blue;
    } else {
      Organism nextOrganism = _organismArray[i+1];
      next_red = nextOrganism.cur_red;
      next_green = nextOrganism.cur_green;
      next_blue = nextOrganism.cur_blue;
    }

  // Organism, draw thyself!
   thisOrganism.drawRect(i);
   
     // hand the organism the other organism's hues to do a calculation
     
     thisOrganism.cur_red = thisOrganism.calculateNewcolor(thisOrganism.cur_red, prev_red, next_red);
     thisOrganism.cur_green = thisOrganism.calculateNewcolor(thisOrganism.cur_green, prev_green, next_green);
     thisOrganism.cur_blue = thisOrganism.calculateNewcolor(thisOrganism.cur_blue, prev_blue, next_blue);

     // and then we call it to update
     // which is where I'm putting things I'm working out
    thisOrganism.updateMe();    
  }
    // uncomment this if we're saving video
   //videoExport.saveFrame();
}


void createOrganisms(){  

  // okay, so let's iterate through this loop
  // we'll need to create one organism per row

    for ( int i = 0; i < number_rows; i += 1){

      // for each loop through, temporary organism variable and drop a new organism into it
      Organism thisOrganism = new Organism();
    
      // then add it to the array of organisms
      _organismArray = (Organism[])append(_organismArray, thisOrganism);
  }
}


class Organism {

  // how would you define yourself, as a series of variables?
  int true_red;
  int true_green;
  int true_blue;
  int cur_red; // what it is right now
  int cur_green;
  int cur_blue;
  float cur_bright; // the amount of energy the organism has, used for luminosity
  float cur_sat; // the number of turns the organism has, used for saturation (?)
//   float size; // it would be good to use this to track how large it has gotten  
//   float x, y;
  
  color current_color;
  
  // I was going to use these for tracking whether they're on the up or downswing
  // meh
  boolean is_energetic;

  
  // let's define the starting values for an organism
  Organism(){

  true_blue = int(random(0,255));
  true_red = int(random(0,255));
  true_green = int(random(0,255));
  cur_blue = true_blue;
  cur_red = true_red;
  cur_green = true_green;

  // I'll note that if I try to use noise there, it seemingly goes all blue-greens
  //cur_hue = true_hue;
  //cur_bright = random(0,100);
  //cur_sat = 100;
  is_energetic = true;


  current_color = color(cur_red, cur_green, cur_blue);
  }
  

// drawRect takes the current iteration number and uses that to figure out where we are
// then we draw a rectangle of the color of the organism

void drawRect(int iteration){
    int startx, starty;
    int targetx, targety;
    startx = 0;
    starty = 0 + (iteration * row_height);
    targetx = width;
    targety = (starty + row_height);
    noStroke();
    fill(current_color);
    rect(startx, starty, targetx, targety);

}

// okay so let's do a function that sets the color according to the three values passed it
public int calculateNewcolor(int true_color, int prev_color, int next_color){
  // average those three numbers

    int new_color;
    new_color = ((prev_color + next_color)*2 + (4*true_color)) / 8;
    return new_color;
}


// and here's where we can screw around with incrementing things
void updateMe(){
//
    
  // if we don't set the orgcolor to the new values it'll stick with the old
  current_color = color(cur_red, cur_green, cur_blue);

}

}  
