/*
	Textura para el fondo del juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function BackgroundTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	this.setSize(500,500);
	this.background_color="black";
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		//Rectangulo
			context.fillStyle=that.background_color;
			context.fillRect(position.x,position.y,size.width,size.height);
		return true;
	}
}