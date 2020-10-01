function Org(){
   // set initial values for things
    
// 	this.size = 1; //they start out as 1
	this.true_red = int(random(0,255));
	this.true_green = int(random(0,255));
	this.true_blue = int(random(0,255));
	this.now_red = 0;
	this.now_green = 0;
	this.now_blue = 0;
	this.now_red = this.true_red;
	this.now_green = this.true_green;
	this.now_blue = this.true_blue;


	this.updateYourColors = function(prev_red, prev_green, prev_blue, next_red, next_green, next_blue){	
// 		print("calling to calc starting at", this.now_red, "and passing in", this.true_red, " ", prev_red, " ", next_red);
		this.now_red = calcthatcolordrift(this.true_red, prev_red, next_red);
// 		print("and now it is ", this.now_red);
// 		debugger;
		this.now_green = calcthatcolordrift(this.true_green, prev_green, next_green);
		this.now_blue = calcthatcolordrift(this.true_blue, prev_blue, next_blue);
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
		fill(this.now_red, this.now_green, this.now_blue);
		rect(startx, starty, targetx, targety);
	}

}