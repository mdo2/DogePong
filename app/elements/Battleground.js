/*
	Clase que define el campo de juego
*/
function Battleground(context){
	
	//Propiedades
	var background;
	var left_bar_zone;
	var right_bar_zone;
	var center_zone;
	
	//Inicializacion de las zonas
	background=new BackgroundTexture("background",context);
	left_bar_zone=new BarZoneTexture("left_bar_zone",context);
	background.addSon(left_bar_zone);
	right_bar_zone=new BarZoneTexture("right_bar_zone",context);
	right_bar_zone.move(765,0);
	background.addSon(right_bar_zone);
	center_zone=new CenterZoneTexture("center_zone",context);
	background.addSon(center_zone);
	
	//Metodos
	this.addPlayerBar=function(pb,t){
		if(pb && t && "string"==typeof t){
			pb.setParentTexture(t=='left'?left_bar_zone:right_bar_zone);
		}
		return false;
	};
	this.setDogeBall=function(db){
		if(db){
			return db.setDogeBallZone(center_zone);
		}
		return false;
	};
	this.renderBattleground=function(){
		background.render();
	};
}