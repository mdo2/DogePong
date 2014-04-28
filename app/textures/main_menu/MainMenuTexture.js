/*
	Textura para el menu principal del juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function MainMenuTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	this.background_color="silver";
	this.setSize(800,400);
	this.img=new Image();
	this.img_loaded=false;
	this.img.onload=function(){that.img_loaded=true;};
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		context.fillStyle=that.background_color;
		context.fillRect(position.x,position.y,size.width,size.height);
		context.drawImage(that.img,225,25);
		return true;
	};
}