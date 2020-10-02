function Org(){
   // set initial values for things
    
	this.true_hue = int(random(0,360));
// 	this.true_green = int(random(0,255));
// 	this.true_blue = int(random(0,255));
	this.now_sat = 0;
	this.now_bright = 0;
	this.now_hue = round(random(0,360)); // initially, we start with its self
	this.compromise = round(random(0.5,1),2); // how willing is this org to move towards neighbors
	this.adherence = round(random(0.5,1),2); // how much does it want to stay towards its true hue
	this.neighbor_distance = 999;
	this.true_self_drift = 999;
	
	
	this.updateYourSatBright = function(){

// METHOD ONE: bright is how close it is to true self, sat is is close to neighbors
// 		this.now_bright = (this.now_bright + map(this.true_self_drift, 0, 360, 5, 100))/2;
// 		print("mapped ", this.true_self_drift, " to ", this.now_bright);
// 		this.now_sat = (this.now_sat + map(this.neighbor_distance, 0, 360, 5, 100))/2;
// 		print("mapped ", this.neighbor_distance, " to ", this.now_sat);
// 		debugger;

// METHOD TWO: bright is neighbors, sat is true self
// 		this.now_bright = (this.now_bright + map(this.neighbor_distance, 0, 360, 5, 100))/2;
// 		this.now_sat = (this.now_sat  + map(this.true_self_drift, 0, 360, 5, 100))/2;
// 		debugger;

// METHOD THREE: reward for being close to target colors!!
// on top of bright is neighbors, sat is true self
		this.now_bright = (this.now_bright + map(this.neighbor_distance, 0, 180, 5, 100))/2;
		this.now_sat = (this.now_sat + map(this.true_self_drift, 180, 0, 5, 100))/2;
		if (this.now_hue > 340 || this.now_hue < 20){
			this.now_sat = this.now_sat + round(random(10,20));
			this.now_bright = this.now_bright + round(random(10,20));
 			
		}
		this.now_sat = round(this.now_sat);
		this.now_bright = round(this.now_bright);
// 		debugger;

	}



	this.updateYourColors = function(prev_hue, next_hue){	
// 		print("calling to calc starting at", this.now_hue, "and passing in", this.true_hue, " ", prev_hue, " ", next_hue);
// 		this.now_hue = calcthatcolordrift(this.true_hue, prev_hue, next_hue);
// 		print("and now it is ", this.now_hue);


	// basic assumption check: did that get set
	// print("deltas should be zeros", delta_now_prev, delta_now_next, delta_now_true);
// 	print("updating a color using current ", this.now_hue, "prev ", prev_hue, "next ", next_hue);


	// METHOD ONE: USE THE CURRENT HUE to do this
	// 
	// 	var delta_now_prev = 0;
	// 	var delta_now_next = 0;
	// 	var delta_now_true = 0;
	// 	calculate the distance between each of the targets and the current hue
	// 	each calculation will return a positive or negative value for how far it is from current
	// 	that part works
	// 	delta_now_prev = fancyCalc(this.now_hue, prev_hue);
	// 	delta_now_next = fancyCalc(this.now_hue, next_hue);
	// 	delta_now_true = fancyCalc(this.now_hue, this.true_hue);
	// 		print("deltas were", delta_now_prev, delta_now_next, delta_now_true);
	// 
	// 
	//  	
	//  	var foo = 0;
	// 	now how far towards each of those do we want to go?
	// 	I think let's start with halving the sum of the total move
	// 		foo = round(this.now_hue + .05*(delta_now_prev + delta_now_next + delta_now_true));
	// 
	// 	that was vbring. let's dance
	// 	first, how far do we move towards the neighbors?
	// 	
	// 	foo = this.now_hue + (this.compromise * random(0,1) * (delta_now_prev+delta_now_next));
	// 	then, we move towards its true self
	// 	TODO: this version duplicates a calc above
	// 	delta_now_true = fancyCalc(this.now_hue, this.true_hue);
	// 	foo = foo + 0.75 * delta_now_true;


	// METHOD THE SECOND: CALCULATE DIFF FROM TRUE
	// calculate the distance between each of the targets and what the org wants to be	
	// each calculation will return a positive or negative value for how far it is from current
	// that part works
	var delta_true_prev = 0;
	var delta_true_next = 0;
	var delta_now_true = 0; // I'm keeping this var name the same because I'm lazy
	delta_true_prev = fancyCalc(this.true_hue, prev_hue);
	delta_true_next = fancyCalc(this.true_hue, next_hue);
	// there's a bug here, 
	delta_now_true = fancyCalc(this.now_hue, this.true_hue); // a nod to current position
// 	print("deltas were", delta_true_prev, delta_true_next, delta_now_true);

	// while we've got the neighbor distance...
	this.true_self_drift = abs(round(delta_now_true));
	this.neighbor_distance = abs(round(delta_true_prev + delta_true_next));

	var foo = 0;
	var old_hue = this.now_hue;
	foo = this.now_hue; // I'm going to take this real slow
	foo = foo + (this.compromise*random(0,1)*delta_true_prev); // move it towards the prev
	foo = foo + (this.compromise*random(0,1)*delta_true_next); // move it towards the next
	foo = foo + (this.adherence *random(0,1)*delta_now_true);
	foo = round(foo);



	// CONTROVERSY - drift towards what you think your neighbors are
	// this is not a political statement
	// If you're within 30 points of your neighbor, move the true hue!!!
	// and then, to be a jerk, force its current hue to be random
	if (this.neighbor_distance < 30){
		this.true_hue = this.true_hue + round(((delta_true_prev + delta_true_next)/10),0);
		print("moved a true hue");
		this.now_hue = round((random(0,360)));
	}
	
	// CONTROVERSY STIR SOME SHIT updateYourColors
	// if there is no change to your hue, potentially mutate
	// which maybe should be a function
	if ( foo<10 || this.now_sat < 50 || this.now_bright < 50 ) {
		foo = foo + round(random(-8,8));
		print("stirred it up");
	}


	// now we're going to check and see if the move(s) have taken the hue over 360 or under 0
	// and wrap it around if so	
// 	debugger;
//  	print("var foo is ", foo);
 	if (foo <0 ){
 		this.now_hue = 360-foo;
 	}
 	if (foo > 360){
 		this.now_hue = foo%360;
 	}
// 	print("setting now to", this.now_hue);


	


	}





// TODO? this could be pulled out and into a thing
// seems to work
	this.drawSelf = function(iteration){
		let startx
		let starty;
		let targetx
		let targety;
		startx = 0;
		starty = 0 + (iteration * row_height);
		targetx = width;
		targety = (starty + row_height);
		noStroke();
		fill(this.now_hue, this.now_sat, this.now_bright);
		rect(startx, starty, targetx, targety);
	}

}