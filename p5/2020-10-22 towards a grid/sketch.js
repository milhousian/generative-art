// starting from scratch using rows

// let's declare some globals!
// they get declared first, so we can head into setup
var height = 800;
var width = 800;
var target_framerate = 10;
var number_rows = 200;
var row_height = 0; // we'll calculate this in a second in setup()
var rowOccupants = []; // array with number of rows, with the position of occupying critter
var critterArray = [];
var emptyCellLocations = [];
var liveRowOccupants = [];
var uniqLiveRowOccupants = [];
var global_food_to_allocate = 2 * number_rows; // how much do you want each row to get to munch
var food_cost_basic = 2; // blergh
var food_cost_to_move = 1; // how much "food" does it cost to move one RGB unit
var edge_detection_visibility = 0; // flip to 1 for Cynthia-friendly mode
var edge_border_color = 180; // grey scale 0 for black, 255 for white...

function setup() {
	createCanvas(800,800);
	frameRate(30);
	// colorMode(RGB);
	colorMode(HSB); // HSB color mode defaults to 360, 100, 100
	background(255,100,100);
	row_height = (height/number_rows);
	createCritters();
	createRows();
}


function draw() {
	background(255);
	drawRows();
	determineFoodAvailable(); // unimplemented
	ageCritters(); // can kill off cells
	allocateFood();
	dinnerTime(); // can kill off cells
	catalogEmptyCells();
	fillEmptyCellsWithExpansionThenNew();
	catalogLiveRowOccupants(); // the order in which cells die and are catalogued matters a lot
	everybodyChangeColors(); // dependent on that catalog
	print("frame complete");
	// debugger;   // uncomment to debug per-frame
}

// this one's always dicey
function everybodyChangeColors(){
	let next_location;
	let prev_location;
	let current_row_position = 0;
	let current_critter_location_in_critter_array = 0;
	// liveRowOccupants = a list of rows where there is a live critter

	// for every value in the live critter locations, grab what's in the previous and next positions
	// TODO this is incomplete

	for(var i = 0; i < liveRowOccupants.length; i++){
		current_row_position = liveRowOccupants[i];
		if(current_row_position == 0) {  // if there won't be a previous occupant, improvise
			next_location = current_row_position + 1;
			prev_location = number_rows -1;
		} else if (i== (liveRowOccupants.length-1)) { // if there won't be a next one....
			next_location = 0;
			prev_location = current_row_position - 1;
		} else {
			next_location = current_row_position + 1;
			prev_location = current_row_position - 1;
		}

		current_critter_location_in_critter_array = rowOccupants[liveRowOccupants[i]];
		// call that position in the critter array to update its colors
		// passing in the location of the previous and next
// 		print("I was looking at ", i, " in livecritter locations, which is ", liveRowOccupants[i], " which is org ", rowOccupants[liveRowOccupants[i]], " which is ", critterArray[rowOccupants[liveRowOccupants[i]]])
		critterArray[current_critter_location_in_critter_array].updateColors(prev_location, next_location);
	}
}

function dinnerTime(){
	// everybody, eat...
	// TODO: this currently will call a multi-cell critter at each of its locations
	// TODO: I might need an array of live critters locations in the critter array aaaaand...
	// TODO: or a multi-dimensional array
	for(var i = 0; i < critterArray.length; i++){
		if (critterArray[i].am_alive=1){
			critterArray[i].eatDinner();
		}
	}
}

function determineFoodAvailable(){
	// this is where we could look at what the colors and whatever are and make a calculation
}


// note that this doesn't check if they're alive or not, because who cares
function allocateFood(){
	// first, take the global allowance and divide it
	let food_per_row = global_food_to_allocate/number_rows;
	// a couple ways we could do this -- I'm going to go with this very simple goldfish tank style one
	for(var i = 0; i < number_rows; i++){
		critterArray[rowOccupants[i]].food = critterArray[rowOccupants[i]].food + food_per_row;
	}
}


// figure out what to do with those empty cells
// TODO, something weird is happening here

function fillEmptyCellsWithNewOnly(){
	for(var i = 0; i < emptyCellLocations.length; i++){
		print("trying to fill some cells with new");
		fillEmptyCellWithNew(emptyCellLocations[i]);
		}
}

function fillEmptyCellsWithExpansionOnly(){
// we have an array of empty cell locations. for each of these, is the previous or next cell ready?
for(var i = 0; i < emptyCellLocations.length; i++){
		let current_vacancy_row = emptyCellLocations[i];
		let prev_row = -1;
		let next_row = -1;
		// define where to look for the next/previous neighbors
		// making sure we're not first or last, which would cause an out of bounds error
		if (current_vacancy_row != 0 && current_vacancy_row != (number_rows-1)){
			// check the previous to see if it's ready_to_expand
			prev_row = current_vacancy_row -1;
			next_row = current_vacancy_row +1;
		} else if (current_vacancy_row == 0) {
			prev_row = number_rows-1;
			next_row = current_vacancy_row +1;
		} else if (current_vacancy_row == (number_rows-1)) {
			prev_row = current_vacancy_row -1;
			next_row = 0;
		}

		// those defined we can now move to attempting a fill from them
		if (critterArray[rowOccupants[prev_row]].am_alive == 1 && critterArray[rowOccupants[prev_row]].ready_to_expand == 1){
			fillEmptyCellFromNeighbor(emptyCellLocations[i], critterArray[rowOccupants[prev_row]]);
			print("filled ", emptyCellLocations[i], " from previous ");
		} else if (critterArray[rowOccupants[next_row]].am_alive == 1 && critterArray[rowOccupants[next_row]].ready_to_expand == 1){
			fillEmptyCellFromNeighbor(emptyCellLocations[i], critterArray[rowOccupants[next_row]]);
			print("filled ", emptyCellLocations[i], " from next ");
		}
}
}


function fillEmptyCellsWithExpansionThenNew(){
	// we have an array of empty cell locations. for each of these, is the previous or next cell ready?

		for(var i = 0; i < emptyCellLocations.length; i++){
				let current_vacancy_row = emptyCellLocations[i];
				let prev_row = -1;
				let next_row = -1;
				// define where to look for the next/previous neighbors
				// making sure we're not first or last, which would cause an out of bounds error
				if (current_vacancy_row != 0 && current_vacancy_row != (number_rows-1)){
					// check the previous to see if it's ready_to_expand
					prev_row = current_vacancy_row -1;
					next_row = current_vacancy_row +1;
				} else if (current_vacancy_row == 0) {
					prev_row = number_rows-1;
					next_row = current_vacancy_row +1;
				} else if (current_vacancy_row == (number_rows-1)) {
					prev_row = current_vacancy_row -1;
					next_row = 0;
				}

				// those defined we can now move to attempting a fill from them
				if (critterArray[rowOccupants[prev_row]].am_alive == 1 && critterArray[rowOccupants[prev_row]].ready_to_expand == 1){
					fillEmptyCellFromNeighbor(emptyCellLocations[i], rowOccupants[prev_row]);
					print("filled ", emptyCellLocations[i], " from previous ");
				} else if (critterArray[rowOccupants[next_row]].am_alive == 1 && critterArray[rowOccupants[next_row]].ready_to_expand == 1){
					fillEmptyCellFromNeighbor(emptyCellLocations[i], rowOccupants[next_row]);
					print("filled ", emptyCellLocations[i], " from next ");
				} else {
					fillEmptyCellWithNew(emptyCellLocations[i]);
					print("couldn't fill from previous or next, generating new");
				}
		}
}

function fillEmptyCellFromNeighbor(cellToFill, neighborCritterID){
	// print("filling from neighbor, got passed ", cellToFill, neighborFrom);
	let tempCellToFill = cellToFill;
	let parentCritter = neighborCritterID;
	critterArray[neighborCritterID].size = critterArray[neighborCritterID].size++; // tell the creature it's bigger
	rowOccupants[tempCellToFill] = rowOccupants[neighborCritterID];
}

function fillEmptyCellWithNew (cellToFill){
	let tempCellToFill = cellToFill;
	let tempCritter = new Critter(); // generate a new Critter
	critterArray.push(tempCritter); // add it to the critter array
	rowOccupants[tempCellToFill] = critterArray.length-1; // go to the rowOccupant where we know there's a vacancy, put the id of the new one in
}



function catalogLiveRowOccupants(){

	// we need a list of the live critter locations so we can reference neighbors
	// so we go through the rows and check each one to see if its occupant is alive
	// TODO note this approach will lead to a multi-space critter being listed repeatedly
	liveRowOccupants = []; // empty it out before each run through
	uniqLiveRowOccupants = [];
	for(var i = 0; i < number_rows; i++){
		if(critterArray[rowOccupants[i]].am_alive == 1) {    //if it's alive, push where we found it
			liveRowOccupants.push(i);
		}
	// uniqLiveRowOccupants = [...new Set(liveRowOccupants)];
	// print("live row occupants = ", liveRowOccupants);
	// print("unique row occupants = ", uniqLiveRowOccupants);
	}

}

// go through and see where there are vacancies
function catalogEmptyCells(){
	emptyCellLocations = []; // gotta empty it out before we run each time
	for(var i = 0; i < number_rows; i +=1){
		if(critterArray[rowOccupants[i]].am_alive == 0){
			// append that location to the array of empty cell locations
			emptyCellLocations.push(i);
		}
	}
	// if they're all dead, let's just throw it into debugger
	if(emptyCellLocations.length == number_rows){
		debugger;
	}

}


// then let's go through all the critters and tell them time marches on
function ageCritters(){
	for(var i = 0; i < critterArray.length; i++){
		if(critterArray[i].am_alive == 1){
			critterArray[i].timePasses();
		}
	}
}

/* we're going to iterate through each row and fill it with the color
	of the critter occupying that row  using push/pop/translate so
	the relative drawing position moves */


function drawRows(){
	for(var i = 0; i < number_rows; i +=1){
		rectMode(CENTER);
		let centerx = (width/2);
		let centery = (row_height/2);
		let rect_width = width;
		let rect_height = row_height;
		push();
		translate(0, (i*row_height));
		if(edge_detection_visibility == 1){    // check if we want edges
			strokeWeight(10);
			stroke(edge_border_color);
		} else {
			noStroke();
		}

		// go grab the color of the critter that lives in this spot in the rowOccupants
		// print("went to see who lives at ", i, "and found ", rowOccupants[i], " which is ", critterArray[rowOccupants[i]]);

		fill(critterArray[rowOccupants[i]].displayed_color, 75, 75);

		// take only one color if you want to just run on grayscale
		// 	fill(critterArray[rowOccupants[i]].displayed_color);

		if(edge_detection_visibility == 1){    // check if we're varying width
			let tempWidthPercent = critterArray[rowOccupants[i]].width_percentage;
			rect(centerx, centery, rect_width*tempWidthPercent, rect_height);
		} else {
			rect(centerx, centery, rect_width, rect_height);
		}
		pop();
		}
}




function createCritters(){
	// ??? WHYYYYYYYYY
	// why does this sometimes appear to not be blank?
	// why when iterating through it and printing it out does it seem like it's not being
	// added to one-by-one?
	critterArray = [];
	// print("creating crittesrs, this should be blank: ", critterArray);
    for(var i = 0; i < number_rows; i +=1){
		let newCritter = new Critter();
		critterArray.push(newCritter);
		// print("there should now be one more in ", critterArray);
		}
	// print("created this array", critterArray);

// WHY DOES DOING IT THIS WAY SOMETIMES CREATE A BLANK ENTRY WTFFFFFFFF
// TODO: ask
// 	print("creating crittesrs, this should be blank: ", critterArray);
//     for(var i = 0; i < number_rows; i +=1){
// 		critterArray[i] = new Critter(); // we'll need one critter per row to start
// 		print("there should now be one more in ", critterArray);
// 		}
// 	print("created this array", critterArray);
// }



}





function createRows(){
	for(var i = 0; i < number_rows; i +=1){
		rowOccupants[i] = i; // each row starts out with the number of the critter occupying it
		}
}
