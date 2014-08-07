/*
	Clase que define la Dogeball
*/
function DogeBall(id){
	var that=this;
	
	//Propiedades
	var refresh=DogePongGlobals.prototype.refresh_time;
		
		//Texture
		var dogeball_texture=new DogeBallTexture(id);
		var ball_zone;
		
		//Rolling
		var roll_sense="left";
		var roll_interval_id=0;
		var roll_coe=5;
		
		//Moving
		var moving_worker;
	
	//Metodos
		
		//Ball Zone
		this.setDogeBallZone=function(dbz){
			if(dbz && "function"==typeof dbz.addSon){
				dogeball_texture.move(
					(dbz.getPosition().x+(dbz.getSize().width/2))-dogeball_texture.getSize().width/2,
					(dbz.getPosition().y+(dbz.getSize().height/2))-dogeball_texture.getSize().height/2-25
				);
				ball_zone=dbz;
				moving_worker=new DogeBallWorker(dogeball_texture,ball_zone);
				return dbz.addSon(dogeball_texture);				
			}
			console.error("Error setting the DogeBallZone to the object given. The object must be a texture.");
			return false;
		}
		
		this.reset=function(){
			that.stopRolling();
			that.stopMoving();
			setTimeout(function(){
				dogeball_texture.move(
					(ball_zone.getPosition().x+(ball_zone.getSize().width/2))-dogeball_texture.getSize().width/2,
					(ball_zone.getPosition().y+(ball_zone.getSize().height/2))-dogeball_texture.getSize().height/2-25
				);
			},refresh);
		};
		
		//Rolling
		this.setRollSense=function(sense){
			if("string"==typeof sense && ["left","right"].indexOf(sense)>=0){
				roll_sense=sense;
				return true;
			}
			console.error("Error changing the sense of dogeball roll. Incorrect sense given.");
			return false;
		};
		this.rollTheBall=function(){
			if(!that.isRolling()){
				roll_interval_id=setInterval(function(){
					var radians=dogeball_texture.getRadians();
					var aux=Math.PI/180;
					if(roll_sense=="left"){
						if((radians-aux*roll_coe)<0)
							dogeball_texture.setRadians((Math.PI*2)+(radians-aux*roll_coe));
						else
							dogeball_texture.setRadians(radians-aux*roll_coe);
					}
					else{
						if((radians+aux*roll_coe)>Math.PI*2)
							dogeball_texture.setRadians((radians+aux*roll_coe)-Math.PI*2);
						else
							dogeball_texture.setRadians(radians+aux*roll_coe);
					}
				},refresh);
			}
		};
		this.stopRolling=function(){
			if(that.isRolling()){
				clearInterval(roll_interval_id);
				roll_interval_id=0;
			}
		};
		this.isRolling=function(){
			return roll_interval_id!=0;
		};
		this.setRollSpeed=function(speed){
			if("number"==typeof speed && speed>0 && speed<=30){
				roll_coe=speed;
				return true;
			}
			console.error("Error setting the rolling speed. The speed is a number from 1 to 30. '"+speed+"' given.");
			return false;
		};
		this.addRollSpeed=function(speed_add){
			if("number"==typeof speed_add && roll_coe+speed_add<=30){
				roll_coe+=speed_add;
				return true;
			}
			return false;
		};
		this.getRollingSpeed=function(){
			return roll_coe;
		};

		//Moving
		
		this.startMoving=function(){
			if(!moving_worker.isMoving()){
				moving_worker.move_interval_id=setInterval(moving_worker.moveDogeBall,refresh);
			}
		};
		this.stopMoving=function(){
			if(moving_worker.isMoving()){
				clearInterval(moving_worker.move_interval_id);
				moving_worker.move_interval_id=0;
			}
		};
		this.setMovingDirection=function(dir){
			if("number"==typeof dir && dir>0 && dir<5){
				moving_worker.direction=dir;
				return true;
			}
			console.error("Error setting DogeBall moving direction. Possible directions are 1,2,3,4. '"+dir+"' given.");
			return false;
		};
		this.setMovingSpeed=function(speed){
			if("number"==typeof speed && speed>0 && speed<=30){
				moving_worker.speed=speed;
				return true;
			}
			console.error("Error setting the moving speed. The speed is a number from 1 to 30. '"+speed+"' given.");
			return false;
		};
		this.addMovingSpeed=function(speed_add){
			if("number"==typeof speed_add && moving_worker.speed+speed_add<=30){
				moving_worker.speed+=speed_add;
				return true;
			}
			return false;
		};
		this.addCollisionListener=function(obj){
			if(obj && "function"==typeof obj.onBallCollision){
				moving_worker.listeners.push(obj);
				return true;
			}
			console.error("Error adding the object given to BallCollisionListeners list. The object must implements a onBallCollision method.");
			return false;
		};
		this.removeCollisionListener=function(obj){
			var index=moving_worker.listeners.indexOf(obj);
			if(obj && index>=0)
				return delete moving_worker.listeners[index];
			console.error("Error removing the object given from BallCollisionListeners list. The object does not exist in this list.");
			return false;
		};
}