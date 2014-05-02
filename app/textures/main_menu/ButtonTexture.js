/*
	Textura para un botón del menu del juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function ButtonTexture(id,options){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	
	this.setSize(300,100);
	this.color_inicio="red";
	this.color_fin="yellow";
	this.text="Botón de prueba";
	this.text_color="white";
	this.border_color="black";
	this.radius=10;
	this.back=false;
	var state=0;
	
	this.menu_state=0;
	
	//Aplicamos las opciones pasadas como parametro
	for(x in options)
		if("undefined"!=typeof this[x])
			this[x]=options[x];
	
	//Metodos	
	
	this.setState=function(new_state){
		if("number"==typeof new_state && new_state!=state){
			state=new_state;
			// that.renderTexture();
			that.fireOnChangeEvent();
		}
	};
	this.getState=function(){
		return state;
	};
	
	//Override
	this.renderTexture=function(){
		var pos=that.getPosition();
		var size=that.getSize();
		var rad=that.radius;
		var c=context;
		c.save();
			c.translate(pos.x,pos.y);
			var blur=state?(state==1?1:8):5;
			var offset=state==1?0.25:0;
			var fill_grad=c.createLinearGradient(0,0,0,size.height);
			fill_grad.addColorStop(offset,that.color_inicio);
			fill_grad.addColorStop(1,that.color_fin);
			c.fillStyle=fill_grad;
			c.miterLimit=1;
			//Esquinas
			c.beginPath();
				//Top-Left
				c.arc(rad+0.5,rad+0.5,rad,Math.PI,Math.PI*1.5);
				//Top-Right
				c.arc(size.width-rad-0.5,rad+0.5,rad,Math.PI*1.5,2*Math.PI);
				//Bottom-Right
				c.arc(size.width-rad-0.5,size.height-rad-0.5,rad,0,Math.PI/2);
				//Bottom-Left
				c.arc(rad+0.5,size.height-rad-0.5,rad,Math.PI/2,Math.PI);
				//Finiquito
				// c.lineTo(0.5,rad);
				
				c.shadowOffsetX = 0;
				c.shadowOffsetY = 0;
				c.shadowBlur = blur;
				c.shadowColor = "black";
			c.fill();
			//Texto o Símbolo de back
			c.fillStyle=that.text_color;
			c.shadowBlur = blur/2;
			if(!that.back){
				c.translate(size.width/2 ,size.height/2);
				c.font = "bold "+(size.height/2)+"px Comic Sans MS";
				c.textAlign="center";
				c.textBaseline="middle";
				c.fillStyle=that.text_color;
				c.fillText(that.text,0,0);
			}
			else{
				//Triangulo
				c.beginPath();
				c.moveTo(size.width*0.15,size.height*0.5);
				c.lineTo(size.width*0.4,size.height*0.15);
				
				c.lineTo(size.width*0.4,size.height*0.4);
				c.lineTo(size.width*0.8,size.height*0.4);
				c.lineTo(size.width*0.8,size.height*0.6);
				c.lineTo(size.width*0.4,size.height*0.6);
				
				c.lineTo(size.width*0.4,size.height*0.85);
				c.fill();
			}
			
		c.restore();
		return true;
	};
}