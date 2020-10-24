function Critter(){
	this.natural_color = int(random(0,255));
	this.displayed_color = int(random(0,255));
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
		let death = random(0,20);
		if (death<1){
			this.die();
		}
	}
	
	this.die = function(){
		this.am_alive = 0;
		this.displayed_color = 0;
		this.size = 0;	
	}
		
	this.checkForExpansionReady = function(){
		// conservative initially, has to able to survive next frame at new size w/o food
		if((this.size*food_cost_basic )< this.food ){
			this.ready_to_expand = 1;
			print("someone is ready to go");
		}
	
	}
	
	
}