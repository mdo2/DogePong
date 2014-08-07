/*
	Clase encargada del movimiento de la PlayerBar de un jugador.
*/
function PlayerBarWorker(texture,zone,controller){
	var that=this;
	
	//Propiedades
	var refresh=DogePongGlobals.prototype.refresh_time;
	
	var speed=5;
	var dir=1;
	var move_interval_id=0;
	
	var x=texture.getPosition().x;
	var y_min=zone.getPosition().y+1;
	var y_max=zone.getPosition().y+zone.getSize().height-1;
	
	var size=texture.getSize();
	
	//Metodos
		//Funcion de movimiento
		function movePlayerBar(){
			var position=texture.getPosition();
			var y1=position.y;
			var y2=position.y+size.height;
			var y1_aux=(dir!=1?y1+speed:y1-speed);
			var y2_aux=(dir!=1?y2+speed:y2-speed);
			
			//Comprobamos que la bola no rebasaria los limites verticales
			if(y1_aux<y_min || y2_aux>y_max){
				y1_aux=(y1_aux<y_min)?y_min:y_max-size.height;
				stopMove(dir);
			}
			texture.move(x,y1_aux);
			texture.fireOnChangeEvent();
		};
		function isMoving(){
			return move_interval_id!=0;
		};
		
		//Controller
		function startMove(d){
			dir=d;
			if(!isMoving() && (texture.getPosition().y!=y_min || dir==2) && (texture.getPosition().y+size.height!=y_max || dir==1))
				move_interval_id=setInterval(movePlayerBar,refresh);
		};
		function stopMove(d){
			if(isMoving() && dir==d){
				clearInterval(move_interval_id);
				move_interval_id=0;
			}
		}
		
		this.reset=function(){
			stopMove(dir);
		};
		
		controller.addEventListener("startMove",startMove);
		controller.addEventListener("stopMove",stopMove);
		
}