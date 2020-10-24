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


	this.timePasses = function(){
		this.age++;
		let death = 10;
		if (death<this.age){
			this.die();
		}
	}
	
	this.die = function(){
		this.am_alive = 0;
		this.displayed_color = 0;
		this.size = 0;	
	}
		
	
}