/*
	Textura para la barra de arriba del marcador del campo de juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function ScoreBarTexture(id,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	
	this.move(0,0);
	this.setSize(800,50);
	this.background_color="whitesmoke";
	this.border_color="black";
	this.score_1="0";
	this.score_2="0";
	this.player_1_name="Jugador 1";
	this.player_2_name="Jugador 2";
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		context.save();
		//Rectangulo
			context.fillStyle=that.background_color;
			context.fillRect(position.x,position.y,size.width,size.height);
		//Borde Inferior
			context.strokeStyle=that.border_color;
			//Linea gorda
				context.lineWidth=2;
				context.beginPath();
				context.moveTo(0,size.height-1.5);
				context.lineTo(size.width,size.height-1.5);
				context.stroke();
			//Linea fina
				context.lineWidth=1;
				context.beginPath();
				context.moveTo(0,size.height-5.5);
				context.lineTo(size.width,size.height-5.5);
				context.stroke();
		//Marcador 1
			//Cuadrado
				context.beginPath();
				context.moveTo((size.width/2)-56.5,0);
				context.lineTo((size.width/2)-56.5,30.5);
				context.lineTo((size.width/2)-26.5,30.5);
				context.lineTo((size.width/2)-26.5,0);
				context.stroke();
			//Nombre
				context.font = "bold 20px Comic Sans MS";
				context.textAlign="right";
				context.textBaseline="middle";
				context.fillStyle="red";
				context.fillText(that.player_1_name,(size.width/2)-65,14);
		//Marcador 2
			//Cuadrado
				context.beginPath();
				context.moveTo((size.width/2)+56.5,0);
				context.lineTo((size.width/2)+56.5,30.5);
				context.lineTo((size.width/2)+26.5,30.5);
				context.lineTo((size.width/2)+26.5,0);
				context.stroke();
			//Nombre
				context.font = "bold 20px Comic Sans MS";
				context.textAlign="left";
				context.textBaseline="middle";
				context.fillStyle="blue";
				context.fillText(that.player_2_name,(size.width/2)+65,14);		
		//Numeros
			context.font = "bold 20px Comic Sans MS";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillStyle="black";
			context.fillText(that.score_1,(size.width/2)-41,14);
			context.fillText(that.score_2,(size.width/2)+41,14);
		context.restore();
		return true;
	};
	
	this.setScore=function(score,t){
		if(t==1)
			this.score_1=score+"";
		else if(t==2)
			this.score_2=score+"";
	};
	this.setPlayerName=function(name,t){
		if(t==1)
			this.player_1_name=name;
		else if(t==2)
			this.player_2_name=name;
	};
}