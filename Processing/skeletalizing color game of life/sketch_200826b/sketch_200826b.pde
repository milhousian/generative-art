// is there an overarching CA class? who knows

public void settings() {
  size(800, 800);
  
}

void setup() {
  background(255); // we start with a white background
  Board thisBoard = new Board();                 // Initialize CA
  frameRate(30);
  colorMode(HSB);
}

void draw() {
  thisBoard.display();          // Draw the board
  board.generate();
  board.first_organism.age++;
  board.first_organism.energy++;
  
  if (board.finished()) {   // If we're done, clear the screen, pick a new ruleset and restart
    delay++;
    if (delay > 30) {
      background(255);
      board.randomize();
      board.restart();
      delay = 0;
    }
  }
}



class Organism {
  float energy; // the amount of energy the organism has, used for luminosity
  float age; // the number of turns the organism has, used for saturation (?)
  float org_color; // the hue of the organism as expressed
  float size; // it would be good to use this to track how large it has gotten
  // how do we randomize something on creation of the object?

  Organism(){
  energy = 0;
  age = 0;
  org_color = random(0,255);
  }
   
}

class Board {
  int[] organisms; // an array of organisms? is this how that works?
  int generation; // how many turns has the board been going?

  Organism first_organism = new Organism();

  void display(){
    // temp, just draw the thing as green
    fill(first_organism.org_color, first_organism.age, first_organism.energy);
    rect(0,0,800,800);
  }
    

  void randomize(){
    }

  void generate(){
  }

  void restart(){
  }

  boolean finished() {
  return false;
  }

}  
