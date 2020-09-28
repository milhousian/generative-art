

public void settings() {
  size(800, 800);
  
}

void setup() {
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
void draw() {

  // while the loop counter is less than the number of items in the array, do this and iterate
  // and this loop is run once per frame
  for ( int i = 0; i < _organismArray.length; i ++){
    // we're establishing a temporary loop variable of organisms, called thisOrganism
    // each time through, it pulls out the one at the marker in the iteration loop
    Organism thisOrganism = _organismArray[i];

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
 
    // and then we call it to update
    thisOrganism.updateMe();
  }
}



void createOrganisms(){  

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
  float size; // it would be good to use this to track how large it has gotten
  // how do we randomize something on creation of the object?
  
  float x, y;
  color current_color;
  boolean is_energetic;
  boolean is_aging;
  boolean is_whuffling;
  

  // let's define the starting values for an organism
  Organism(){
  x = 0;
  y = 0;
  energy = random(0,255);
  age = 0;
  true_hue = 0;
  
  is_energetic = true;
  is_aging = true;
  is_whuffling = true;
  
  current_color = color(energy, age, true_hue);
  }
  
void drawMe(){

//  noStroke();
//  fill(orgcolor);

//// AHA CHECK OUT THIS WEAK-ASS BULLSHIT HARDCODING
//  rect(x, y, 800, y + row_height);
}



// okay so each time through the cycle, what happens to the organism?
void updateMe(){
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
  
  println(is_energetic, " ", energy);
    
    
  // if we don't set the orgcolor to the new values it'll stick with the old
  current_color = color(energy, age, true_hue);


}

}  
