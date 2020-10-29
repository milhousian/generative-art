// starting from scratch using rows

// let's declare some globals!
// they get declared first, so we can head into setup
var height = 400;
var width = 400;
var target_framerate = 10;
var number_rows = 40;
var row_height = 0; // we'll calculate this in a second in setup()
var rowOccupants = []; // array with number of rows, with the position of occupying critter
var critterArray = [];
var uniqueRowOccupants = [];
var global_food_to_allocate = 3 * number_rows; // how much do you want each row to get to munch
var food_available_to_distribute = 0;
var food_cost_basic = 1; // blergh
var food_cost_to_move = 1; // how much "food" does it cost to move one RGB unit
var edge_detection_visibility = 0; // flip to 1 for Cynthia-friendly mode
var edge_border_color = 180; // grey scale 0 for black, 255 for white...
var death_rate_as_chance_in_thousand = 10;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  // colorMode(RGB);
  colorMode(HSB); // HSB color mode defaults to 360, 100, 100
  background(255, 100, 100);
  row_height = height / number_rows;
  createCritters();
  createRows();
}

function draw() {
  background(180, 0, 0);
  drawRows();
  determineFoodAvailable(); // unimplemented
  ageCritters(); // can kill off cells
  allocateFood();
  dinnerTime(); // can kill off cells
  fillEmptyCellsWithExpansionThenNew();
  catalogUniqueRowOccupants(); // the order in which cells die and are catalogued matters a lot
  everybodyChangeColors(); // dependent on that catalog
  // print("frame complete");
  // debugger;   // uncomment to debug per-frame
}

/* we're going to iterate through each row and fill it with the color
	of the critter occupying that row  using push/pop/translate so
	the relative drawing position moves */

// ah, drawRows. Good old trusty drawRows. Remember when this was the troublesome function? those were the days.
function drawRows() {
  for (var i = 0; i < number_rows; i++) {
    rectMode(CENTER);
    let centerx = width / 2;
    let centery = row_height / 2;
    let rect_width = width;
    let rect_height = row_height;
    push();
    translate(0, i * row_height);
    if (edge_detection_visibility == 1) {
      // check if we want edges
      strokeWeight(10);
      stroke(edge_border_color);
    } else {
      noStroke();
    }

    // go grab the color of the critter that lives in this spot in the rowOccupants
    // print("went to see who lives at ", i, "and found ", rowOccupants[i], " which is ", critterArray[rowOccupants[i]]);

    // fill(critterArray[rowOccupants[i]].displayed_color, critterArray[rowOccupants[i]].natural_saturation, critterArray[rowOccupants[i]].luminosity);
    fill(
      critterArray[rowOccupants[i]].displayed_color,
      critterArray[rowOccupants[i]].natural_saturation,
      80
    );
    // take only one color if you want to just run on grayscale
    // 	fill(critterArray[rowOccupants[i]].displayed_color);

    if (edge_detection_visibility == 1) {
      // check if we're varying width
      let tempWidthPercent = critterArray[rowOccupants[i]].width_percentage;
      rect(centerx, centery, rect_width * tempWidthPercent, rect_height);
    } else {
      rect(centerx, centery, rect_width, rect_height);
    }
    pop();
  }
}

function determineFoodAvailable() {
  // this is where we could look at what the colors and whatever are and make a calculation
  food_available_to_distribute += global_food_to_allocate; // set this to zero after
}

// then let's go through all the critters and tell them time marches on
function ageCritters() {
  critterArray.forEach(critter => {
    if (critter.am_alive === 1) {
      critter.timePasses();
    }
  })
}

// note that this doesn't check if they're alive or not, because who cares
function allocateFood() {
  // first, take the global allowance and divide it
  let food_per_row = food_available_to_distribute / number_rows;
  // a couple ways we could do this -- I'm going to go with this very simple goldfish tank style one
  for (var i = 0; i < number_rows; i++) {
    critterArray[rowOccupants[i]].food += food_per_row;
    food_available_to_distribute = 0; // set this to zero
  }
}

function dinnerTime() {
  uniqueRowOccupants.forEach((occupant) => {
    if (critterArray[occupant].am_alive == 1) {
      critterArray[occupant].eatDinner();
      // print("called out to eat dinner");
    }
  });
}

// go through and see where there are vacancies
function catalogEmptyCells() {
  let emptyCells = [];
  for (var i = 0; i < number_rows; i++) {
    if (critterArray[rowOccupants[i]].am_alive == 0) {
      // append that location to the array of empty cell locations
      emptyCells.push(i);
    }
  }
  // if they're all dead, let's just throw it into debugger
  if (emptyCells.length == number_rows) {
    debugger;
  }
  return emptyCells;
}

function fillEmptyCellsWithExpansionThenNew() {
  // we have an array of empty cell locations. for each of these, is the previous or next cell ready?

  // NLT: I moved this inside here, I don't think this needs to be a global variable since it's only used here
  // and this way you don't need to clear it each time
  let emptyCellLocations = catalogEmptyCells();

  emptyCellLocations.forEach((current_vacancy_row, i) => {
    // NLT: why are these -1?
    let prev_row = -1;
    let next_row = -1;
    // define where to look for the next/previous neighbors
    // making sure we're not first or last, which would cause an out of bounds error
    if (current_vacancy_row !== 0 && current_vacancy_row !== number_rows - 1) {
      // check the previous to see if it's ready_to_expand
      prev_row = current_vacancy_row - 1;
      next_row = current_vacancy_row + 1;
    } else if (current_vacancy_row === 0) {
      prev_row = number_rows - 1;
      next_row = current_vacancy_row + 1;
    } else if (current_vacancy_row === number_rows - 1) {
      prev_row = current_vacancy_row - 1;
      next_row = 0;
    }

    // those defined we can now move to attempting a fill from them
    if (
      critterArray[rowOccupants[prev_row]].am_alive === 1 &&
      critterArray[rowOccupants[prev_row]].ready_to_expand === 1
    ) {
      fillEmptyCellFromNeighbor(emptyCellLocations[i], rowOccupants[prev_row]);
    } else if (
      critterArray[rowOccupants[next_row]].am_alive === 1 &&
      critterArray[rowOccupants[next_row]].ready_to_expand === 1
    ) {
      fillEmptyCellFromNeighbor(emptyCellLocations[i], rowOccupants[next_row]);
    } else {
      fillEmptyCellWithNew(emptyCellLocations[i]);
    }
  });
}

// certainly no bugs in this function nosireeeeee
function fillEmptyCellFromNeighbor(cellToFill, neighborCritterID) {
  // let tempCellToFill = cellToFill;
  // NLT: I don't see a need for the above variable (tell me I'm wrong!) so I think it's just obscuring stuff
  let parentCritter = neighborCritterID;
  critterArray[parentCritter].size++; // tell the creature it's bigger
  critterArray[parentCritter].rows_occupied.push(cellToFill); // hopefully, add this to positions
  rowOccupants[cellToFill] = parentCritter;
  // print(
  //   "expanded from neighbor to fill ",
  //   tempCellToFill,
  //   " parent was ",
  //   parentCritter
  // );
}

function fillEmptyCellWithNew(cellToFill) {
  // let tempCellToFill = cellToFill;
  // NLT: same as above
  let tempCritter = new Critter(cellToFill); // generate a new Critter
  critterArray.push(tempCritter); // add it to the critter array
  rowOccupants[cellToFill] = critterArray.length - 1; // go to the rowOccupant where we know there's a vacancy, put the id of the new one in
  // print("new organism created ");
}

function fancyCalc(hue_one, hue_two) {
  // SO!
  // what we know is because hue #360 = hue #0, it's like a circle
  // you can't ever be more than 180 away from another point
  // so we're going to do some awful awful math

  let delta = hue_one - hue_two;
  let abs_delta = abs(delta);
  let calcd_true_distance;

  if (abs_delta >= 180) {
    // 		print("abs delta was greater than 180")
    // if it's a negative difference
    if (delta < 0) {
      calcd_true_distance = 180 - (abs_delta % 180);
      // 			print ("twas negative ", abs_delta%180);
    } else {
      calcd_true_distance = 180 - (abs_delta % 180);
      // 			print ("twas positive ");
    }
  } else {
    // 		print("abs delta was less than 180");
    calcd_true_distance = delta;
  }
  // 	print("did a calc after being passed ", hue_one, hue_two, " and retd ", calcd_true_distance);
  return calcd_true_distance;
  // 	print("cur of ", this.now_hue, "prev of ", prev_hue, " move of ", calc1);
}

function everybodyChangeColors() {
  uniqueRowOccupants.forEach((occupant) => {
    critterArray[occupant].updateNeighborInfo();
    critterArray[occupant].updateColors();
  });
}

function catalogUniqueRowOccupants() {
  uniqueRowOccupants = rowOccupants;

  // // so! what we're creating here is an Array
  // // it will consist of the place in critter array of the current row occupants
  // uniqueRowOccupants = []; // empty it out before each run through
  // let otherApproach = rowOccupants.filter(function (el, i, arr){
  // 	return arr.indexOf(el) === i;
  // });
  // uniqueRowOccupants = otherApproach;
}

function createCritters() {
  // critterArray = [];
  //NLT: this function is only ever called once, and the array is already defined as an empty array so the above is... redundant?
  for (var i = 0; i < number_rows; i++) {
    let newCritter = new Critter(i);
    critterArray.push(newCritter);
  }
}

function createRows() {
  for (var i = 0; i < number_rows; i++) {
    console.log("this was called");
    rowOccupants[i] = i; // each row starts out with the number of the critter occupying it
  }
}

// function fillEmptyCellsWithNewOnly(){
// 	for(var i = 0; i < emptyCellLocations.length; i++){
// 		print("trying to fill some cells with new");
// 		fillEmptyCellWithNew(emptyCellLocations[i]);
// 		}
// }