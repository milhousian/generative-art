function setup() {
  createCanvas(800,800);
  background(255,255,255)
  frameRate();
// so the source of that whole can't calculate this value
// was that you can't do that until setup is called, so you just put them here


	row_height = (height/number_rows);
	createOrgs();
}

// uh is this going to work?
var array_o_orgs = [];
var array_of_blues = [];
var array_of_reds = [];
var array_of_greens = [];
var foo = 1;

// jeez, okay, so technically the globals get declared first?
var number_rows = 10;
var row_height = 0; // we're just going to calculate this in a second

function draw() {

// I just randomly wanted to print out the first object
// 	if (foo=1){
// 		print (array_o_orgs[0]);
// 		foo++;
// 		}
		
	// every frame, grab all the reds and blues
	// wow, this works
	// is there a better way to do this?
	for(var x = 0; x < array_o_orgs.length; x++){
		array_of_reds[x] = array_o_orgs[x].now_red;
		array_of_greens[x] = array_o_orgs[x].now_green;
		array_of_blues[x] = array_o_orgs[x].now_blue;
	}

	// then, for each organism
	for (var i = 0; i < array_o_orgs.length; i++){
		let tempOrg = array_o_orgs[i];

		// draw thyself
		tempOrg.drawSelf(i);
		// then let's  update your colors
		var temp_next_red =0;
		var temp_next_green=0;
		var temp_next_blue=0;
		var temp_prev_red=0.0;
		var temp_prev_green=0;
		var temp_prev_blue=0;
		var y = array_o_orgs.length;
		var z = 0;
	
		
		// OKAY AND THIS IS WHERE I AM STUCK
		// the array looks fine, it's stocked
// 		print(typeof array_of_reds[0]);
// 		print("prev red is a ", typeof temp_prev_red);
		
		 if (i==0){
			temp_prev_red = array_of_reds[y-1];
			temp_prev_green = array_of_greens[y-1];
			temp_prev_blues = array_of_blues[y-1];
		} else {
			temp_prev_red = array_of_reds[i-1].now_red;
			temp_prev_green = array_o_orgs[(i-1)].now_green;
			temp_prev_red = array_o_orgs[(i-1)].now_green;
		}
	
		// if it's the last one, we want it to go get the first ones
		if (i==(y-1)){
// 			print("we're going to go grab...", array_of_reds[0].now_red)
// 			print(array_of_reds);
// 			temp_next_red = array_of_reds[z].now_red;
// 			temp_next_green = array_of_greens[z].now_green;
// 			temp_next_red = array_of_blues[z].now_green;
			temp_next_red = 128;
			temp_next_green =128;
			temp_next_blue = 128;
		} else {
			temp_next_red = array_of_reds[i+1];
			temp_next_green = array_of_greens[i+1];
			temp_next_blue = array_of_blues[i+1];

		}
		// now that those are all populated...
		print("red is currently", tempOrg.now_red, "calling to update your colors, with", temp_prev_red, temp_next_red);
		tempOrg.updateYourColors(temp_prev_red, temp_prev_green, temp_prev_blue, temp_next_red, temp_next_green, temp_next_blue);
	  	
	  }
}

// this is the "uncomment this one to just see if it's working outside the draw loop"
// function draw() {
// 	if (mouseIsPressed)	{
// 	fill(0);
// 	} else {
// 		fill(255);
// 	}
// 	ellipse(mouseX, mouseY, 80,80);
// 	
// }



function createOrgs(){  

	// works
  // okay, so let's iterate through this loop
  // we'll need to create one organism per row

    for(var i =0; i < number_rows; i +=1){
		array_o_orgs[i] = new Org();
		}

}



function calcthatcolordrift(truecolor, precolor, nextcolor){
	let varcolor = 0;
	varcolor = int(((truecolor*4)+(precolor)+(nextcolor))/6)
	print(truecolor, precolor, nextcolor, varcolor);
// method two: the derek smoothbrain
// this one will just calculate the change
// 	let varcolor = 0;
// 	let firstdelta = 0;
// 	let seconddelta = 0;
// 	firstdelta = 180%(truecolor - precolor);
// 	secondelta = 180%(truecolor - nextcolor);
// 	varcolor = firstdelta + seconddelta;
	return varcolor;
}