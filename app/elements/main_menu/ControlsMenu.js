/*
  Clase que define el menu que muestra los controles a los jugadores antes de empezar a jugar
*/
function ControlsMenu(id){
	var that=this;

	//Propiedades
	var refresh=DogePongGlobals.prototype.refresh_time;
	
		//Textures
		var background_texture=new MainMenuTexture(id);
		
		//MenuItems	
			
			//Botones
			this.boton_jugar=new Button("boton_jugar",{
				text:"¡¡A jugar!!"
			});
			this.boton_jugar.setSize(150,50);
			this.boton_jugar.setPosition(325,300);
			// background_texture.addSon(this.boton_jugar.getTexture());
			
			//Boton volver
			this.back_button=new Button("back_button",{
				back:true,
				color_inicio:"#FF8D00",
				color_fin:"#FF8D00",
				text_color:"whitesmoke"
			});
			this.back_button.setSize(40,30);
			this.back_button.setPosition(20,350);
			// this.back_button.addListener(function(){});
			// background_texture.addSon(this.back_button.getTexture());
						
			//Title
			var doge_text=new TextTexture("menu_title_doge",{
				text:"DOGE",
				gradient:true
			});
			doge_text.setSize(200,100);
			doge_text.move(40,0);
			background_texture.addSon(doge_text);
			
			var pong_text=new TextTexture("menu_title_pong",{
				text:"PONG",
				gradient:true
			});
			pong_text.setSize(200,100);
			pong_text.move(560,0);
			background_texture.addSon(pong_text);

	//Metodos
		//Cuadros de controles
		this.setPlayers=function(player1,player2){
			//Jugador 1
			if(player1=="local"){
				var controls_texture1=new ControlsTexture("controls1");
				controls_texture1.move(40,150);
				background_texture.addSon(controls_texture1);
			}
			//Jugador 2
			if(player2=="local"){
				var controls_texture2=new ControlsTexture("controls2",{
					dir:"right",
					keys:["P","L"]
				});
				controls_texture2.move(610,150);
				background_texture.addSon(controls_texture2);
			}		
		};
	
	this.startGame=function(){
		that.clearMenu();
		background_texture.removeSon("boton_jugar");
		background_texture.removeSon("back_button");
		that.animateDoge();
	};
	this.boton_jugar.addListener(this.startGame);
	this.animateDoge=function(){
		var size=350;
		var radians=0;
		var aux=Math.PI/180;
		var coe=75;
		var roll_coe=360/coe;
		var reduction_coe=300/coe;
		var animate_doge_interval=setInterval(function(){
			size=size-reduction_coe;
			radians=radians+aux*roll_coe;
			background_texture.setDoge(radians,size);
			background_texture.render();
			if(size<=50){
				clearInterval(animate_doge_interval);
				if(that.onAnimationEnds)
					that.onAnimationEnds();
			}
		},refresh);
	};
	this.onAnimationEnds;
	
	this.renderMenu=function(){
		background_texture.addSon(this.back_button.getTexture());
		background_texture.addSon(this.boton_jugar.getTexture());
		this.boton_jugar.init();
		this.back_button.init();
		background_texture.setDoge(0,350);
		background_texture.render();
	};
	
	this.clearMenu=function(){
		this.boton_jugar.reset();
		this.back_button.reset();
	};
}