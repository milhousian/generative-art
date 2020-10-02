
// hey let's declare some globals because why nottttttt
var array_of_orgs = [];
// var array_of_blues = [];
var array_of_hues = [];
// var array_of_greens = [];
var array_of_true_hues = [];

// jeez, okay, so technically the globals get declahue first?
var number_rows = 40;
var row_height = 0; // we're just going to calculate this in a second in setup()


function setup() {
	createCanvas(800,800);
	frameRate(20);
	// HSB color mode defaults to 360, 100, 100
	colorMode(HSB);
	background(255,0,0);
		
	// note that colorMode is by default RGB, 0-255
	// 	colorMode(RGB);
	// so the source of that whole can't calculate this value
	// was that you can't do that until setup is called, so you just put them here

	row_height = (height/number_rows);
	createOrgs();
}



function draw() {
	// every frame, grab all the hues greens and blues
	// wow, this works
	for(var x = 0; x < array_of_orgs.length; x++){
		array_of_hues[x] = array_of_orgs[x].now_hue;
		array_of_true_hues[x] = array_of_orgs[x].true_hue;	
	}


	// DEBUGGING SECTION
	// uncomment this to get a running average of the hue values
// 	var cur_total = 0;
// 	for(var n = 0; n < array_of_hues.length; n++){
// 		cur_total += array_of_hues[n];
// 	}
// 	var cur_avg = cur_total / array_of_hues.length;
// 	
// 	var true_total = 0;
// 	for(var n = 0; n < array_of_true_hues.length; n++){
// 		true_total += array_of_true_hues[n];
// 	}
// 	var true_avg = true_total / array_of_true_hues.length;
// 	
// 	print("current hue average is ", cur_avg, " true hue avg is ", true_avg);	

	// more random debugging stuff
	// 			print(array_of_hues);
	// 		print(array_of_orgs);
	// 		debugger;

	// then, for each organism, let's do some stuff
	
	for (var i = 0; i < array_of_orgs.length; i++){
		let tempOrg = array_of_orgs[i];

		// draw thyself
		tempOrg.drawSelf(i);
		// then let's update your colors
		var temp_next_hue =0;
		var temp_prev_hue=0;
		var y = array_of_orgs.length;
	
		// grab the previous colors
		// if it's the first one, go grab it from the last one
		 if (i===0){
			temp_prev_hue = array_of_hues[y-1];
		} else {
			temp_prev_hue = array_of_hues[i-1];
		}

		// grab the next colors	
		// if it's the last one, we want it to go get the first ones
		if (i===(y-1)){
// 			print(array_of_hues[0], typeof array_of_hues[0]);
			temp_next_hue = array_of_hues[0];
		} else {
			temp_next_hue = array_of_hues[i+1];
		}
		// now that those are all populated...
//  		print("hue is currently", tempOrg.now_hue, "calling to update your colors, with", temp_prev_hue, temp_next_hue);

		// so my intent here is to call the object, pass it a bunch of info, and then let it calculate it out
		tempOrg.updateYourColors(temp_prev_hue, temp_next_hue);
		tempOrg.updateYourSatBright();
	  }
// 		print(array_of_orgs[4]);
//  		debugger;
}



function createOrgs(){  
    for(var i =0; i < number_rows; i +=1){
		array_of_orgs[i] = new Org();
		}
}


function fancyCalc(hue_one, hue_two){
// SO!
// what we know is because hue #360 = hue #0, it's like a circle
// you can't ever be more than 180 away from another point
// so we're going to do some awful awful math

	var delta = 0;
	var abs_delta = 0;
	var	calcd_true_distance = 0;

	delta = hue_one - hue_two;
	abs_delta = abs(delta);


	if (abs_delta >=180){
// 		print("abs delta was greater than 180")
		// if it's a negative difference
		if (delta < 0){
			calcd_true_distance = 180 - (abs_delta%180);	
// 			print ("twas negative ", abs_delta%180);			
		} else {
			calcd_true_distance = (180 - (abs_delta%180));
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

