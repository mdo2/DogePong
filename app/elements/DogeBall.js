/*
	Clase que define la Dogeball
*/
function DogeBall(id,url,context){
	var that=this;
	
	//Propiedades
	var dogeball_texture=new DogeBallTexture(id,context);
	dogeball_texture.img.src=url;
	var roll_sense="left";
	var roll_interval_id=0;
	
	//Metodos
	this.setDogeBallZone=function(dbz){
		if(dbz && "function"==typeof dbz.addSon)
			return dbz.addSon(dogeball_texture);
		console.error("Error setting the DogeBallZone to the object given. The object must be a texture.");
		return false;
	}
	this.setRollSense=function(sense){
		if("string"==typeof sense && ["left","right"].indexOf(sense)>=0){
			roll_sense=sense;
			return true;
		}
		console.error("Error changing the sense of dogeball roll. Incorrect sense given.");
		return false;
	};
	this.rollTheBall=function(){
		if(roll_interval_id==0){
			roll_interval_id=setInterval(function(){
				var radians=dogeball_texture.getRadians();
				var aux=Math.PI/180;
				var coe=5;
				if(roll_sense=="left"){
					if((radians-aux*coe)<0)
						dogeball_texture.setRadians((Math.PI*2)+(radians-aux*coe));
					else
						dogeball_texture.setRadians(radians-aux*coe);
				}
				else{
					if((radians+aux*coe)>Math.PI*2)
						dogeball_texture.setRadians((radians+aux*coe)-Math.PI*2);
					else
						dogeball_texture.setRadians(radians+aux*coe);
				}
			},16);
		}
	};
	this.stopRolling=function(){
		if(roll_interval_id!=0){
			clearInterval(roll_interval_id);
			roll_interval_id=0;
		}
	};
}