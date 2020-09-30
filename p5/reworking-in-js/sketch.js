
// hey let's declare some globals because why nottttttt
var array_of_orgs = [];
var array_of_blues = [];
var array_of_reds = [];
var array_of_greens = [];

// jeez, okay, so technically the globals get declared first?
var number_rows = 80;
var row_height = 0; // we're just going to calculate this in a second in setup()


function setup() {
	createCanvas(800,800);
	background(255,255,255)
	frameRate(4);
	// note that colorMode is by default RGB, 0-255, which we're using here
	// so the source of that whole can't calculate this value
	// was that you can't do that until setup is called, so you just put them here

	row_height = (height/number_rows);
	createOrgs();
}



function draw() {
		
	// every frame, grab all the reds greens and blues
	// wow, this works
	for(var x = 0; x < array_of_orgs.length; x++){
		array_of_reds[x] = array_of_orgs[x].now_red;
		array_of_greens[x] = array_of_orgs[x].now_green;
		array_of_blues[x] = array_of_orgs[x].now_blue;
		
		// let's just... check that everything is kosher here
		// !!! everything is not kosher
		// Average for reds is consistently ~120, when you'd expect it'd be higher
// 		var total = 0;
// 		for(var n = 0; n < array_of_reds.length; n++){
// 			total += array_of_reds[n];
// 		}
// 		var avg = total / array_of_reds.length;
// 		print("current red average is ", avg);
		
		// check on the green average
		// maybe I should consolidate these into some kind of... thing...
// 		var total = 0;
// 		for(var n = 0; n < array_of_greens.length; n++){
// 			total += array_of_greens[n];
// 		}
// 		var avg = total / array_of_greens.length;
// 		print("current green average is ", avg);
		
	}

	// then, for each organism
	for (var i = 0; i < array_of_orgs.length; i++){
		let tempOrg = array_of_orgs[i];

		// draw thyself
		tempOrg.drawSelf(i);
		// then let's update your colors
		var temp_next_red =0;
		var temp_next_green=0;
		var temp_next_blue=0;
		var temp_prev_red=0;
		var temp_prev_green=0;
		var temp_prev_blue=0;
		var y = array_of_orgs.length;
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
			temp_prev_green = array_of_orgs[(i-1)].now_green;
			temp_prev_red = array_of_orgs[(i-1)].now_green;
		}
	
		// if it's the last one, we want it to go get the first ones
		if (i==(y-1)){
		// TODO THIS DID NOT WORK
		// ??? why can't I call this as array[0] ???
// 			print("we're going to go grab...", array_of_reds[0].now_red)
// 			print(array_of_reds);
			temp_next_red = array_of_reds[z].now_red;
			temp_next_green = array_of_greens[z].now_green;
			temp_next_red = array_of_blues[z].now_green;
// 			temp_next_red = 128;
// 			temp_next_green =128;
// 			temp_next_blue = 128;
		} else {
			temp_next_red = array_of_reds[i+1];
			temp_next_green = array_of_greens[i+1];
			temp_next_blue = array_of_blues[i+1];

		}
		// now that those are all populated...
 		print("red is currently", tempOrg.now_red, "calling to update your colors, with", temp_prev_red, temp_next_red);

		// so my intent here is to call the object, pass it a bunch of info, and then let it calculate it out
		tempOrg.updateYourColors(temp_prev_red, temp_prev_green, temp_prev_blue, temp_next_red, temp_next_green, temp_next_blue);
	  	
	  }
}



function createOrgs(){  
    for(var i =0; i < number_rows; i +=1){
		array_of_orgs[i] = new Org();
		}
}



function calcthatcolordrift(truecolor, precolor, nextcolor){
	let varcolor = 0;
	varcolor = int((precolor + nextcolor)*2 + (truecolor * 6))/10	
//	varcolor = (int(((truecolor*4)+(precolor*3)+(nextcolor*3))/10))+(int(random(-20,20)));
// 	print(truecolor, precolor, nextcolor, varcolor);


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