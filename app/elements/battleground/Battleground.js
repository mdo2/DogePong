/*
	Clase que define el campo de juego
*/
function Battleground(context,refresh){
	var that=this;
	
	//Propiedades
	var background;
	var left_bar_zone;
	var right_bar_zone;
	var center_zone;
	
	this.barra1;
	this.barra2;
	this.dogeball;
	
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
	
	//Creamos barras
	this.barra1=new PlayerBar("barra1","left",context,refresh);	
	this.barra2=new PlayerBar("barra2","right",context,refresh);
	this.addPlayerBar(this.barra1,"left");
	this.addPlayerBar(this.barra2,"right");
	
	//Creamos la bola
	this.dogeball=new DogeBall("dogeball","imgs/doge_disk49.png",context,refresh);
	this.setDogeBall(this.dogeball);
	
	this.renderBattleground=function(){		
		background.render();
	};
}