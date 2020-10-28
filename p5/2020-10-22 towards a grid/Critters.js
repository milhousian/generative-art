function Critter(position){
	this.natural_color = round(random(0,359));
	this.natural_saturation = round(random(0,100));
	this.displayed_color = 0;
	this.am_alive = 1;
	this.health = 50;
	this.food = 2;
	this.towards_natural = 0.3;
	this.towards_neighbors = 0.1;
	this.size = 1;
	this.age = 0;
	this.ready_to_expand = 0;
	this.width_percentage = random();
	this.rows_occupied=[position]; // this will track what rows it is in
	this.my_lowest_row = 0;
	this.my_highest_row = 0;
	this.prev_neighbor = 0;
	this.next_neighbor = 0;
	this.prev_neighbor_location = 0;
	this.next_neighbor_location = 0;

// using what you know about yourself, look up who is next to you
	this.updateNeighborInfo = function(){
		this.my_lowest_row = min(this.rows_occupied);
		this.my_highest_row = max(this.rows_occupied);
		if (this.my_lowest_row == 0){
			this.prev_neighbor_location = number_rows -1;
		} else {
			this.prev_neighbor_location = this.my_lowest_row -1;
		}
		if (this.my_highest_row == number_rows -1){
			this.next_neighbor_location = 0;
		} else {
			this.next_neighbor_location = this.my_highest_row + 1;
		}
		this.prev_neighbor = rowOccupants[this.prev_neighbor_location];
		this.next_neighbor = rowOccupants[this.next_neighbor_location];
	}

// works: it is grabbing the neighbor colors correctly
// this is v3a1, which does a fancy calc
// TODO because it's grabbing the current colors, it's instant to one side and on the other it's the last frame drawn, which is... weird. It's a weird behavior

	this.updateColors = function(){
		// print("attempting a color update with ", this.prev_neighbor, this.next_neighbor)
		let temp_prev_neighbor_color = critterArray[this.prev_neighbor_location].displayed_color;
		let temp_next_neighbor_color = critterArray[this.next_neighbor_location].displayed_color;
		// let old_color = this.displayed_color;
		let color_to_change_to = 0;
		let desired_change = 0; // this is the actual distance plus direction
		let desired_distance = 0; // this is just the distance
		// big reason is that for calculating costs, a negative move would put food back
		// we could just abs() it every time but that seems excessive

		let change_towards_true = fancyCalc(this.displayed_color, this.natural_color);
		let change_towards_prev = fancyCalc(this.displayed_color, temp_prev_neighbor_color);
		let change_towards_next = fancyCalc(this.displayed_color, temp_next_neighbor_color);

		// multiply each of those changes by how much the critter wants to move in those directions
		change_towards_true = round(change_towards_true * this.towards_natural);
		change_towards_prev = round(change_towards_prev * this.towards_neighbors);
		change_towards_next = round(change_towards_next * this.towards_neighbors);
		// TODO I'm dividing this down because it could on its own exceed 180
		desired_change = (change_towards_true + change_towards_next + change_towards_prev);
		print("color check: me: ", this.displayed_color, " natural is ", this.natural_color, " neighbor colors are ", temp_prev_neighbor_color, temp_next_neighbor_color, " thus calculated deltas as ", change_towards_true, change_towards_prev, change_towards_next, " and a change of ", desired_change);

		if(desired_change>180){
			print("hey derek desired change is larger than 180: ", desired_distance);
		}
		desired_distance = abs(desired_change);
		color_to_change_to = round(this.displayed_color + desired_change);
		if (color_to_change_to < 0){
			color_to_change_to = 360+color_to_change_to;
		} else if (color_to_change_to > 360){
			color_to_change_to = color_to_change_to%360;
		}

		if (desired_distance > 0 && (desired_distance * food_cost_to_move) < this.food){   // only change if it has enough energy to get there
			this.food = this.food - (desired_distance * food_cost_to_move);
			this.displayed_color = color_to_change_to;
			print("moved to ", this.displayed_color);
 			// print("someone moved! from ", old_color, " to ", this.displayed_color);
		} else if (desired_change > 0){
			// print("wanted to move ", desired_change, " but food was ", this.food);
		}
	}




	this.timePasses = function(){
		this.age++;
		let death = random(0,1000);
		if (death < death_rate_as_chance_in_thousand){
			this.die();
		}
	}

	this.die = function(){
		this.am_alive = 0;
		this.displayed_color = 0;
		this.size = 0;
		print("death");
	}

	this.eatDinner = function(){
		let cost = (this.size**2) * food_cost_basic;
		this.food = this.food - cost;
		round(this.food);
		if(((this.size+1)**2*food_cost_basic )< this.food ){
			this.ready_to_expand = 1;
		}
		if (this.food < 0){
			this.die();
		}
		if (this.food > 400){
			this.food = 100; // socialism!!
		}

// TODO it'd be nice if too much food went to one's neighbors

		if(((this.size+1)**2*food_cost_basic )< this.food ){
			this.ready_to_expand = 1;
		}
	}

	this.checkForExpansionReady = function(){
// currently done in dinner eating

	}


}
