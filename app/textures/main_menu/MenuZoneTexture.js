/*
	Textura para una zona del menu del juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function MenuZoneTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	this.background_color="silver";
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		// context.fillStyle=that.background_color;
		// context.fillRect(position.x,position.y,size.width,size.height);
		return true;
	};
}