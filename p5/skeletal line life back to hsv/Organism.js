function Org(){
   // set initial values for things
    
	this.true_hue = int(random(0,360));
// 	this.true_green = int(random(0,255));
// 	this.true_blue = int(random(0,255));
	this.now_sat = 75;
	this.now_bright = 75;
	this.now_hue = 0;
	this.now_hue = this.true_hue;
	this.compromise = round(random(0,1)); // how willing is this org to move towards neighbors
	this.adherence = random(0,1)+0.25; // how much does it want to stay towards its true hue



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
	delta_now_true = fancyCalc(this.now_hue, this.true_hue); // a nod to current position
	// 	print("deltas were", delta_now_prev, delta_now_next, delta_now_true);

	var foo = 0;
	foo = this.now_hue; // I'm going to take this real slow
	foo = foo + (this.compromise*random(0,1)*delta_true_prev); // move it towards the prev
	foo = foo + (this.compromise*random(0,1)*delta_true_next); // move it towards the next
	foo = foo + (this.adherence * delta_now_true);
	
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
		fill(this.now_hue, this.now_sat, this.now_bright, 1);
		rect(startx, starty, targetx, targety);
	}

}