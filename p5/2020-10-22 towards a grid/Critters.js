function Critter(){
	this.natural_color = round(random(0,255));
	this.displayed_color = this.natural_color/8;
	this.am_alive = 1;
	this.health = 50;
	this.food = 1;
	this.towards_natural = 0;  // not implemented
	this.towards_neighbors = 0; // not implemented
	this.size = 1;
	this.age = 0;
	this.ready_to_expand = 0;
	this.width_percentage = random();

	this.timePasses = function(){
		this.age++;
		let death = random(0,10);
		if (death<2){
			this.die();
			print("died of random");
			debugger;
		}
	}

// TODO I don't think this is working quite right
	this.die = function(){
		this.am_alive = 0;
		this.displayed_color = 0;
		this.size = 0;
	}

	this.eatDinner = function(){
		this.food = this.food - (this.size^2 * food_cost_basic);
		if (this.food<0){
			this.die();
			print("oof starved to death");
		}
		if(((this.size+1)*food_cost_basic )< this.food ){
			this.ready_to_expand = 1;
		}
	}

// this depends on it being passed the position *in critter array* of the neighbors
	this.updateColors = function(prev_neighbor, next_neighbor){
// 		print("was passed", prev_neighbor, next_neighbor)
		let temp_prev_neighbor = prev_neighbor;
		let temp_next_neighbor = next_neighbor;
		let temp_prev_neighbor_color = critterArray[temp_prev_neighbor].displayed_color;
		let temp_next_neighbor_color = critterArray[temp_next_neighbor].displayed_color;
		let temp_color_holder = 0;
//
// 		print("I think their colors are ", temp_prev_neighbor_color, temp_next_neighbor_color);
		temp_color_holder = round((this.displayed_color + this.natural_color + temp_prev_neighbor_color + temp_next_neighbor_color)/4)
		let desired_change = abs(temp_color_holder-this.displayed_color); // how far is the distance
		if ((desired_change * food_cost_to_move) < this.food){   // only change if it has enough energy to get there
			this.food = this.food - (desired_change  * food_cost_to_move);
			this.displayed_color = temp_color_holder;
 			print("someone moved!");
		}
	}

	this.checkForExpansionReady = function(){
// currently done in dinner eating
// 		conservative initially, has to able to survive next frame at new size w/o food
// 		if((this.size*food_cost_basic )< this.food ){
// 			this.ready_to_expand = 1;
// 			print("ready to go");
// 		}
	}


}
