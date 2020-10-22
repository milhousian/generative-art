function Org(){
   // set initial values for things
    
	this.true_hue = int(random(0,360));
// 	this.true_green = int(random(0,255));
// 	this.true_blue = int(random(0,255));
	this.now_sat = 0;
	this.now_bright = 0;
	this.now_hue = round(random(0,360)); // initially, we start with its self
	this.compromise = round(random(0.1,1),2); // how willing is this org to move towards neighbors
	this.adherence = round(random(0.9,1),2); // how much does it want to stay towards its true hue
	this.neighbor_distance = 0;
	this.true_self_drift = 0;
//	this.width_percent = random(0.5,1);
	this.width_percent = 1;
	this.age = 0;
	this.alive = 1;
	this.lifespan = random(100, 1000);


	
	this.timePasses = function(){
		this.age = this.age + 1;
		
		if (this.age > this.lifespan){
			this.alive = 0;
			print("shit, I died");
			this.now_sat = 0;
			this.now_bright = 0;
		} 
	}
	

	
	this.updateYourSatBright = function(){

// TODO, this section is awful

// METHOD ONE: bright is how close it is to true self, sat is is close to neighbors
// 2020-10-21 this currently doesn't work
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
		this.now_bright = map(this.age, 0, 1000, 0, 100) + (this.now_bright + map(this.neighbor_distance, 0, 180, 5, 100))/2;
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

	// basic assumption check: did that get set
	// print("deltas should be zeros", delta_now_prev, delta_now_next, delta_now_true);
// 	print("updating a color using current ", this.now_hue, "prev ", prev_hue, "next ", next_hue);


	// METHOD ONE: bring them in towards the current hue
	// TODO, bug -- this is very blue-green-y, again
	//  
	// 	var delta_now_prev = 0;
	// 	var delta_now_next = 0;
	// 	var delta_now_true = 0;
	// 	
	// 	// calculate the distances
	// 	delta_now_prev = fancyCalc(this.now_hue, prev_hue);
	// 	delta_now_next = fancyCalc(this.now_hue, next_hue);
	// 	delta_now_true = fancyCalc(this.now_hue, this.true_hue); 
	// 
	// 	var foo = 0;
	// 	var old_hue=this.now_hue;
	// 	foo = this.now_hue;
	// 	foo = foo + (this.compromise*random(0,1)*delta_now_prev); // move it towards the prev
	// 	foo = foo + (this.compromise*random(0,1)*delta_now_next); // move it towards the next
	// 	foo = foo + (this.adherence *random(0,1)*delta_now_true);
	// 	foo = round(foo);
	


	// 	first, how far do we move towards the neighbors?
	// 	
	// 	foo = this.now_hue + (this.compromise * random(0,1) * (delta_now_prev+delta_now_next));
	// 	then, we move towards its true self
	// 	TODO: this version duplicates a calc above
	// 	delta_now_true = fancyCalc(this.now_hue, this.true_hue);
	// 	foo = foo + 0.75 * delta_now_true;



	// METHOD THE SECOND: CALCULATE DIFF FROM TRUE
	// TODO 2020-10-21: why did I want to use the true version?
	var delta_true_prev = 0;
	var delta_true_next = 0;
	var delta_now_true = 0; // I'm keeping this var name the same because I'm lazy
	delta_true_prev = fancyCalc(this.true_hue, prev_hue);
	delta_true_next = fancyCalc(this.true_hue, next_hue);
	// there's a bug here, TODO Derek what's the bug
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
// 	if (this.neighbor_distance < 30){
// 		this.true_hue = this.true_hue + round(((delta_true_prev + delta_true_next)/10),0);
// 		print("moved a true hue");
// 		this.now_hue = round((random(0,360)));
// 	}
	
	// CONTROVERSY STIR SOME SHIT updateYourColors
	// if there is no change to your hue, potentially mutate
	// which maybe should be a function
// 	if ( foo<10 || this.now_sat < 50 || this.now_bright < 50 ) {
// 		foo = foo + round(random(-8,8));
// 		print("stirred it up");
// 	}


	// check and see if the move(s) have taken the hue over 360 or under 0
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


	this.drawSelf = function(iteration){

	// wokay the thing about rect modes
	// CORNER = first two are upper left x,y, next are width and height
	// CORNERS = first two are one corner, third fourth are opposite corner 
	// CENTER = first two are the center point, third fourth are width height


// == Attempt to use CENTER ==
// This is the Cynthia edge-detection mode
		rectMode(CENTER);
		let centerx = (width/2);
		let centery = (row_height/2);
		let rect_width = width*this.width_percent;
		let rect_height = row_height;		
		push();
		translate(0, (iteration*row_height));
// 		strokeWeight(10);
// 		stroke(0,0,50);
		noStroke();
		fill(this.now_hue, this.now_sat, this.now_bright);
		rect(centerx, centery, rect_width, rect_height);
		pop();
	}

}