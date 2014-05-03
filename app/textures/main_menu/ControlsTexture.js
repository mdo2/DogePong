/*
	Textura para el cuadro de controles de un jugador
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/05/02
*/

function ControlsTexture(id,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	
	this.fill_color="rgba(255,255,255,0.6)";
	this.border_color="#9e9e9e";
	this.title_color="#9e9e9e";
	this.keys_color="#9e9e9e";
	this.keys=["W","A"];
	this.dir="left";
	this.frame_radius=6;
	this.setSize(150,150);
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var pos=that.getPosition();
		var size=that.getSize();
		var c=context;
		c.save();
		c.translate(pos.x,pos.y);
		
		//Cuadro
			//Esquinas
			c.beginPath();
				//Top-Left
				c.arc(that.frame_radius+0.5,that.frame_radius+0.5,that.frame_radius,Math.PI,Math.PI*1.5);
				//Top-Right
				c.arc(size.width-that.frame_radius-0.5,that.frame_radius+0.5,that.frame_radius,Math.PI*1.5,2*Math.PI);
				//Bottom-Right
				c.arc(size.width-that.frame_radius-0.5,size.height-that.frame_radius-0.5,that.frame_radius,0,Math.PI/2);
				//Bottom-Left
				c.arc(that.frame_radius+0.5,size.height-that.frame_radius-0.5,that.frame_radius,Math.PI/2,Math.PI);
				//Finiquito
				c.lineTo(0.5,that.frame_radius);
				
				c.strokeStyle=that.border_color;
				c.fillStyle=that.fill_color;
				c.lineWidth=3;
			c.stroke();
			c.fill();
		//Título
			var offset_text=that.dir=="left"?size.width-85:5;
			var title_text=that.dir=="left"?"Player 1":"Player 2";
			var begin_arrow=that.dir=="left"?5:size.width-5;
			var middle_arrow=begin_arrow+(that.dir=="left"?10:-10);
			var end_arrow=middle_arrow+(that.dir=="left"?20:-20);
			//Texto
			c.font = "bold "+(20)+"px Comic Sans MS";
			c.textBaseline="middle";
			c.fillStyle=that.title_color;
			c.fillText(title_text,offset_text,-20);
			
			//Flecha
			//Triangulo
			c.beginPath();
			c.moveTo(begin_arrow,-20);
			c.lineTo(middle_arrow,-30);
			
			c.lineTo(middle_arrow,-24);
			c.lineTo(end_arrow,-24);
			c.lineTo(end_arrow,-16);
			c.lineTo(middle_arrow,-16);
			
			c.lineTo(middle_arrow,-10);
			c.fill();
		//Controles
			//Flechas
				//Arriba
				c.beginPath();
				c.moveTo(20,10);
				c.lineTo(30,18);
				
				c.lineTo(24,18);
				c.lineTo(24,28);
				c.lineTo(16,28);
				c.lineTo(16,18);
				
				c.lineTo(10,18);
				c.fill();
				c.fillText(that.keys[0],40,18);
				
				//Abajo
				c.beginPath();
				c.moveTo(size.width/2+20,28);
				c.lineTo(size.width/2+30,20);
				
				c.lineTo(size.width/2+24,20);
				c.lineTo(size.width/2+24,10);
				c.lineTo(size.width/2+16,10);
				c.lineTo(size.width/2+16,20);
				
				c.lineTo(size.width/2+10,20);
				c.fill();
				c.fillText(that.keys[1],size.width/2+40,18);
			//Control táctil
				c.fillText("Also, you can",5,50);
				c.fillText("drag the bar",5,75);
				c.fillText("with your",5,100);
				c.fillText("finger.",5,125);
			
		c.restore();
		return true;
	};
}