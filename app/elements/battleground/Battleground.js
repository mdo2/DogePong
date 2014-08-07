/*
	Clase que define el campo de juego
*/
function Battleground(){
	var that=this;
	
	//Propiedades
	var background;
	var left_bar_zone;
	var right_bar_zone;
	var center_zone;
	var score_bar;
	
	this.barra1;
	this.barra2;
	this.dogeball;
	this.messages;
	
	var img=new Image();
	img.src="imgs/doge_disk49.png";
	DogePongGlobals.prototype.dogeball_img=img;
	
	var global_controller=DogePongGlobals.prototype.global_controller;
	
	
	//Inicializacion de las zonas
	background=new BackgroundTexture("background");
	left_bar_zone=new BarZoneTexture("left_bar_zone");
	background.addSon(left_bar_zone);
	right_bar_zone=new BarZoneTexture("right_bar_zone");
	right_bar_zone.move(765,50);
	background.addSon(right_bar_zone);
	center_zone=new CenterZoneTexture("center_zone");
	background.addSon(center_zone);
	score_bar=new ScoreBar("score_bar");
	score_bar.setParentTexture(background);
	
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
	this.barra1=new PlayerBar("barra1","left");	
	this.barra2=new PlayerBar("barra2","right");
	this.addPlayerBar(this.barra1,"left");
	this.addPlayerBar(this.barra2,"right");
	
	//Creamos la bola
	this.dogeball=new DogeBall("dogeball");
	this.setDogeBall(this.dogeball);
	
	//Inicializamos el gestor de mensajes
	this.messages= new Messages("game_messages");
	this.messages.setParentTexture(center_zone);
	
	//Funcion para renderizar el campo de juego
	this.renderBattleground=function(){
		//Renderizamos texturas
		background.render();
		
		//Iniciamos la barra marcador y su botón de salir
		score_bar.back_button.init();
		score_bar.back_button.addListener(this.exitGame);
	};
	
	//Funcion para dar comienzo a un nuevo juego
	this.startGame=function(){
		score_bar.init();
		
		//Asignamos controladores a las barras
		that.barra1.setController(new PlayerBarController("local:1"));
		that.barra2.setController(new PlayerBarController("local:2"));
		
		// this.dogeball.startMoving();
	};
	this.exitGame=function(){
		score_bar.back_button.reset();
		that.dogeball.reset();
		that.barra1.reset();
		that.barra2.reset();
		DogePongGlobals.prototype.app_menu.renderMenu("main_menu");
	};
	
	this.onBallCollision=function(t,y){
		var barra=t==1?this.barra1:this.barra2;
		var y_min=barra.getPosition().y;
		var y_max=y_min+barra.getSize().height;
		
		//GOL
		if(y<y_min || y>y_max){
			var score=parseInt(score_bar.getScore(t==1?2:1));
			score_bar.setScore(score+1,t==1?2:1);
		}
	};
	this.dogeball.addCollisionListener(this);
}