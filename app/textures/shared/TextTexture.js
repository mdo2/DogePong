/*
	Textura para mostrar un texto en algun lugar
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/05/02
*/

function TextTexture(id,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	
	this.background_color="transparent";
	// this.setSize(800,400);	
	this.text="Texto";
	this.text_color="white";
	this.start_color="yellow";
	this.end_color="red";
	this.gradient=false;
	
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
			//Fondo
			if(that.background_color!="transparent"){
				c.fillStyle=that.background_color;
				c.fillRect(pos.x,pos.y,size.width,size.height);
			}
			
			//Texto
			c.translate(pos.x+size.width/2 ,pos.y+size.height/2);
			c.font = "bold "+(size.height/1.5)+"px Comic Sans MS";
			c.textAlign="center";
			c.textBaseline="middle";
			if(that.gradient){
				var fill_grad=c.createLinearGradient(0,size.height/-2,0,size.height/2);
				fill_grad.addColorStop(0,that.start_color);
				fill_grad.addColorStop(1,that.end_color);
			}
			c.fillStyle=that.gradient?fill_grad:that.text_color;
			c.fillText(that.text,0,0);
		c.restore();
		return true;
	};
}