/*
	Clase encargada del movimiento de la DogeBall.
	Produce los eventos de choque y demás.
*/
function DogeBallWorker(texture,zone){
	var that=this;
	
	//Propiedades
	this.listeners=[];
	this.speed=5;
	this.direction=1;
	this.move_interval_id=0;
	
	var x_min=zone.getPosition().x+0.5;
	var x_max=zone.getPosition().x+zone.getSize().width;
	var y_min=zone.getPosition().y+1;
	var y_max=zone.getPosition().y+zone.getSize().height;
	
	var size=texture.getSize();
	
	//Metodos
		//Funcion de movimiento
		this.moveDogeBall=function(){
			var position=texture.getPosition();
			var dir=that.direction;
			var speed=that.speed;
			var x1=position.x;
			var y1=position.y;
			var x2=position.x+size.width;
			var y2=position.y+size.height;
			var x1_aux=(dir<3?x1+speed:x1-speed);
			var y1_aux=((dir==2 || dir==3)?y1+speed:y1-speed);
			var x2_aux=(dir<3?x2+speed:x2-speed);
			var y2_aux=((dir==2 || dir==3)?y2+speed:y2-speed);
			
			//Comprobamos que la bola no rebasaria los limites horizontales
			if(x1_aux<x_min || x2_aux>x_max){
				if(x1_aux<x_min){
					x1_aux=(speed-(x1-x_min))+x_min;
					that.direction=(dir==3?2:1);
				}
				else{
					x1_aux=(x_max-(speed-(x_max-x2)))-size.width;
					that.direction=(dir==1?4:3);
				}
				fireOnBallCollision();
			}
			//Comprobamos que la bola no rebasaria los limites verticales
			if(y1_aux<y_min || y2_aux>y_max){
				if(y1_aux<y_min){
					y1_aux=(speed-(y1-y_min))+y_min;
					that.direction=(dir==1?2:3);
				}
				else{
					y1_aux=(y_max-(speed-(y_max-y2)))-size.height;
					that.direction=(dir==2?1:4);
				}
			}
			texture.move(x1_aux,y1_aux);
			texture.fireOnChangeEvent();
		};
		this.isMoving=function(){
			return that.move_interval_id!=0;
		};
		
	function fireOnBallCollision(){
		for(var cont=0;cont<that.listeners.length;cont++)
			that.listeners[cont].onBallCollision(that.direction<3?1:2,texture.getPosition().y+(texture.getSize().height/2));
	}
}