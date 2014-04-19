/*
	Textura para la bola del Dogepong
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function DogeBallTexture(id,context,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades (Ocupando 30x30)
	this.setSize(50,50);
	this.img=new Image();
	// this.img.onload=function(){that.render();};
	var radians=0;
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	this.setRadians=function(rd){
		if("number"==typeof rd && rd>=0 && rd<=Math.PI*2){
			radians=rd;
			that.renderTexture();
			return true;
		}
		console.error("Error setting the new radians "+rd+" to texture. The range is [0,2PI]");
		return false;
	};
	this.getRadians=function(){
		return radians;
	};
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		context.save();
		context.translate(position.x+24.5,position.y+24.5);
		context.rotate(radians);
		//Arco
			context.beginPath();
			context.arc(0,0,(size.width-1)/2,0,2*Math.PI,false);
			context.moveTo(-25,0);
			context.strokeStyle="black";
			context.lineWidth=2;
			context.stroke();
		//Imagen
			context.drawImage(this.img,-24.5,-24.5);
		context.restore();
		return true;
	};
}