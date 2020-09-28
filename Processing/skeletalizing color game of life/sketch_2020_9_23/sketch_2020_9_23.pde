

public void settings() {
  size(800, 800);
  
}

void setup() {
  background(255); // we start with a white background
  frameRate(60);
  
// boy do I spend a lot of time here  
// https://processing.org/tutorials/color/
  colorMode(HSB, 360, 100, 100);
  
  // as part of setup, let's uhhhh... create some organisms
  createOrganisms();
}

// ========================
// ITS GLOBAL VARIABLE TIME
// ==== don't act like you're not excited ===
// hey let's do some global variables, that's what cool kids do
int number_rows = 80;

// TODO: I don't get why this works when it's a thing like this
// why is this 12 when it's calculated as 800/8 which should be 100? WTF
// int row_height = height)/number_rows;

// it works when it's hard coded
int row_height = 10;

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

  // ??? why can't I do the Organism prevOrganism... thing 
  // ??? and then access prevOrganism outside the if loop?
  // ??? do I have to establish one and then set it to the... ? to get that to work?

    // we're going to grab previous one
    // this can be out of bounds if it's the first one, so we fudge
    // TODO: wrapping around would be cool as hell

    if (i==0){
      Organism prevOrganism = _organismArray[i];
      prev_hue = prevOrganism.cur_hue;
    }
    // I should figure out how to do an if else loop in javascript
    
    if (i>0){
      Organism prevOrganism = _organismArray[i-1];
      prev_hue = prevOrganism.cur_hue;
    }
    
    // then we're going to pull the next one in the array    
    // this can be out of bounds if it's the last one, so
    if (i==_organismArray.length){
      Organism nextOrganism = _organismArray[0];
      next_hue = nextOrganism.cur_hue;
    }
    // I should figure out how to do an if else loop in javascript
    
    if (i<_organismArray.length-1){
      Organism nextOrganism = _organismArray[i+1];
      next_hue = nextOrganism.cur_hue;
    }

  // Organism, draw thyself!
   thisOrganism.drawRect(i);
   
     // hand the organism the other organism's hues to do a calculation
     thisOrganism.calculateNewhue(prev_hue, next_hue);

     // and then we call it to update
     // which is where I'm putting things I'm working out
    thisOrganism.updateMe();
  }
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
  int true_hue; // the hue of the organism as expressed
  int cur_hue; // what it is right now
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

  true_hue = int(random(0,360));
  // I'll note that if I try to use noise there, it seemingly goes all blue-greens
  cur_hue = true_hue;
  cur_bright = random(0,255);
  cur_sat = 255;
  is_energetic = true;


  current_color = color(cur_hue, cur_sat, cur_bright);
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
void calculateNewhue(int prev_hue, int next_hue){
  // average those three numbers

    cur_hue = ((prev_hue + next_hue)*2 + (6*true_hue))/10;
    
    // just keeping an eye on things  
    // println(prev_hue, " ", next_hue, " ", true_hue, " ", cur_hue);

    // here's a thing you could do
    // okay, let's get fancy and increase saturation and brightness if those colors are within x of each other
    
    //int threshold = 40;
    //float how_crazy = 0.1;
    //if ( (abs(prev_hue-cur_hue))<threshold){
    //  cur_bright = cur_bright + how_crazy;
    //  cur_sat = cur_sat + how_crazy;
    //}
}


// and here's where we can screw around with incrementing things
void updateMe(){
  // if it's too energetic, set it on the path back
  if (cur_bright > 254){
    is_energetic = false;
  }
  
  // but if it's too tired, set it to energetic
  if (cur_bright < 1){
    is_energetic = true;
  }
  
  if (is_energetic == true) {
    cur_bright += (noise(cur_hue) * 2);
  }
  
  if (is_energetic == false) {
    cur_bright = cur_bright -1;
  }
  
    
  // if we don't set the orgcolor to the new values it'll stick with the old
  current_color = color(cur_hue, cur_sat, cur_bright);

}

}  
