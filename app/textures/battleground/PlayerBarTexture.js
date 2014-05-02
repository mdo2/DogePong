/*
	Textura para la barra de los jugadores
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function PlayerBarTexture(id,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	
	this.move(5,125);
	this.setSize(30,150);
	this.line_color="black";
	this.text_color="red";
	this.text="WOW DOGE!!";
	this.orientation="left";
	
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
			context.beginPath();
			
			//Linea horizontal superior
			context.moveTo(position.x,position.y+0.5);
			context.lineTo(position.x+size.width,position.y+0.5);
			//Linea horizontal inferior
			context.moveTo(position.x,position.y+size.height-0.5);
			context.lineTo(position.x+size.width,position.y+size.height-0.5);
			//Linea vertical izquierda
			context.moveTo(position.x+0.5,position.y);
			context.lineTo(position.x+0.5,position.y+size.height);
			//Linea vertical derecha
			context.moveTo(position.x+size.width-0.5,position.y);
			context.lineTo(position.x+size.width-0.5,position.y+size.height);
			
			context.strokeStyle = that.line_color;
			context.stroke();
			//Relleno del rectangulo
			context.fillStyle="white";
			context.fillRect(position.x+1,position.y+1,size.width-2,size.height-2);
		//Texto
			context.translate(position.x+size.width/2 ,position.y+size.height/2);
			context.rotate((that.orientation=="right"?-1:1)*Math.PI /2);
			context.font = "bold "+(size.width/1.7)+"px Comic Sans MS";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillStyle=that.text_color;
			context.fillText(that.text,0,0);
		context.restore();
		return true;
	};
}