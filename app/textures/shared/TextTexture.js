/*
	Textura para mostrar un texto en algun lugar
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function TextTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	this.background_color="transparent";
	// this.setSize(800,400);	
	this.text="Texto";
	this.text_color="white";
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var pos=that.getPosition();
		var size=that.getSize();
		var rad=that.radius;
		var c=context;
		c.save();
		//Texto
			c.translate(size.width/2 ,size.height/2);
			c.font = "bold "+(size.height/2)+"px Comic Sans MS";
			c.textAlign="center";
			c.textBaseline="middle";
			
			var fill_grad=c.createLinearGradient(0,size.height/-2,0,size.height/2);
			fill_grad.addColorStop(0,"yellow");
			fill_grad.addColorStop(1,"red");
			c.fillStyle=fill_grad;
			// c.fillStyle=that.text_color;
			c.fillText(that.text,0,0);
		c.restore();
		return true;
	};
}