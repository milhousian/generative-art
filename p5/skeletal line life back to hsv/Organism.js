function Org(){
   // set initial values for things
    
	this.true_hue = int(random(0,360));
// 	this.true_green = int(random(0,255));
// 	this.true_blue = int(random(0,255));
	this.now_sat = 50;
	this.now_bright = 50;
	this.now_hue = 0;
	this.now_hue = this.true_hue;



	this.updateYourColors = function(prev_hue, next_hue){	
// 		print("calling to calc starting at", this.now_hue, "and passing in", this.true_hue, " ", prev_hue, " ", next_hue);
// 		this.now_hue = calcthatcolordrift(this.true_hue, prev_hue, next_hue);
// 		print("and now it is ", this.now_hue);

	var delta_now_prev = 0;
	var delta_now_next = 0;
	var delta_now_true = 0;
	// basic assumption check: did that get set
	// print("deltas should be zeros", delta_now_prev, delta_now_next, delta_now_true);
	print("updating a color using current ", this.now_hue, "prev ", prev_hue, "next ", next_hue);
	
	delta_now_prev = fancyCalc(this.now_hue, prev_hue);
	delta_now_next = fancyCalc(this.now_hue, next_hue);
	delta_now_true = fancyCalc(this.now_hue, this.true_hue);
	print("deltas were", delta_now_prev, delta_now_next, delta_now_true);
 	debugger;
 	var foo = this.now_hue + delta_now_prev + delta_now_next + delta_now_true;
 	print("var foo is ", foo);
 	if (foo <0 ){
 		this.now_hue = 360-foo;
 	}
 	if (foo > 360){
 		this.now_hue = foo%360;
 	}
	print("setting now to", this.now_hue);

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