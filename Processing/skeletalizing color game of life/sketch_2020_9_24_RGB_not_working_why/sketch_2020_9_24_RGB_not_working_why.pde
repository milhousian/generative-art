import com.hamoid.*;
VideoExport videoExport;

public void settings() {
  size(800, 800);
  
}

void setup() {
  background(255); // we start with a white background
  frameRate(20);
  
  // -- UNCOMMENT TO SAVE VIDEO
  // set up video export
   //videoExport = new VideoExport(this);
   //videoExport.startMovie();  
    
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
Organism[] _organismArray = {}; //<>//


// main draw loop!
// this is the main loop and we loop through this until we break
void draw() {
      // while the loop counter is less than the number of items in the array, do this and iterate
      // and this loop is run once per frame
    
      for ( int i = 0; i < number_rows; i ++){
        // we're establishing a temporary loop variable of organisms, called thisOrganism
        // each time through, it pulls out the one at the marker in the iteration loop
        Organism thisOrganism = _organismArray[i];
         
        // Organism, draw thyself!
       thisOrganism.drawRect(i);
              
        int next_org_number = 0;
        int prev_org_number = 0;
        
        // we're going to grab its neighbors so we can pick their colors using these temp values
    
        int prev_red = 0;
        int next_red = 0;
        int prev_green =0;
        int next_green = 0;
        int prev_blue = 0;
        int next_blue = 0;
      
        // define where in the index to go to grab things
        // the previous one first
        if (i==0){
          prev_org_number = (_organismArray.length - 1);
        } else {
          prev_org_number = i-1;
        }

        // then the opposite
       
        if (i==(_organismArray.length -1)){
          next_org_number = 0;
        } else {
          next_org_number = i+1;
        }
  
        Organism nextOrganism = _organismArray[next_org_number];
        Organism prevOrganism = _organismArray[prev_org_number];
        prev_red = prevOrganism.cur_red;
        prev_green = prevOrganism.cur_green;
        prev_blue = prevOrganism.cur_blue;
        next_red = nextOrganism.cur_red;
        next_green = nextOrganism.cur_green;
        next_blue = nextOrganism.cur_blue;
      
       // now figure out what your new RGB values are going to be
       thisOrganism.cur_red = thisOrganism.calculateNewcolor(thisOrganism.true_red, prev_red, next_red);
       thisOrganism.cur_green = thisOrganism.calculateNewcolor(thisOrganism.true_green, prev_green, next_green);
       thisOrganism.cur_blue = thisOrganism.calculateNewcolor(thisOrganism.true_blue, prev_blue, next_blue);
       thisOrganism.current_color = color(thisOrganism.cur_red, thisOrganism.cur_green, thisOrganism.cur_blue);
      // and then we call it to update
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
  //float cur_bright; // the amount of energy the organism has, used for luminosity
  //float cur_sat; // the number of turns the organism has, used for saturation (?)
  //   float size; // it would be good to use this to track how large it has gotten  
  //   float x, y;
  
  color current_color;
  
  
  // let's define the starting values for an organism
  Organism(){

  true_blue = int(random(0,255));
  true_red = int(random(0,255));
  true_green = int(random(0,255));
  cur_blue = true_blue;
  cur_red = true_red;
  cur_green = true_green;

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
    int new_color;
 
    // doing a very basic thing here
    //int weight_new = 4;
    //int weight_true = 2;
    //int divisor = (weight_new + weight_true);
    //new_color = ((prev_color + next_color) * weight_new) + (true_color * weight_true) / divisor;
    new_color = ((prev_color + next_color)*2 + (4*true_color)) / 8;
    //println("calculating ", "true ", true_color, " previous ", prev_color, " next ", next_color, "new", new_color);
    return new_color;
}


// and here's where we can screw around with incrementing things
void updateMe(){
//
    
  // if we don't set the orgcolor to the new values it'll stick with the old
  current_color = color(cur_red, cur_green, cur_blue);
  //println("cur red ", cur_red, "cur_green ", cur_green, "cur_blue ", cur_blue);
}

}  
