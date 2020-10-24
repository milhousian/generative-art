function Critter(){
	this.natural_color = round(random(0,255));
	this.displayed_color = 0;
	this.am_alive = 1;
	this.health = 50;
	this.food = 1;
	this.towards_natural = 0;
	this.towards_neighbors = 0;
	this.size = 1;
	this.age = 0;
	this.ready_to_expand = 0;
	this.width_percentage = random();

	this.timePasses = function(){
		this.age++;
		let death = random(0,2000);
		if (death<1){
			this.die();
		}
	}
	
	this.die = function(){
		this.am_alive = 0;
		this.displayed_color = 0;
		this.size = 0;	
	}
	

// this depends on it being passed the position *in critter array* of the neighbors
	this.updateColors = function(prev_neighbor, next_neighbor){
		let temp_prev_neighbor = prev_neighbor;
		let temp_next_neighbor = next_neighbor;
		let temp_prev_neighbor_color = critterArray[temp_prev_neighbor].displayed_color;
		let temp_next_neighbor_color = critterArray[temp_next_neighbor].displayed_color;
		let temp_color_holder = 0;
// 		print("was passed", temp_prev_neighbor, temp_next_neighbor)
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
		// conservative initially, has to able to survive next frame at new size w/o food
		if((this.size*food_cost_basic )< this.food ){
			this.ready_to_expand = 1;
			print("ready to go");
		}
	}
	
	
}