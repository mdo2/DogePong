/*
	Textura para el centro del campo de juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function CenterZoneTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	this.move(35,0);
	this.setSize(730,400);
	this.background_color="silver";
	
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
		context.restore();
		return true;
	};
}