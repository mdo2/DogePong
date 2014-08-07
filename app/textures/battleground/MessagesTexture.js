/*
	Textura para el gestor de mensajes al usuario
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function MessagesTexture(id,options){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var c=DogePongGlobals.prototype.context;
	
	this.setSize(300,100);
	this.color_inicio="red";
	this.color_fin="yellow";
	this.text="";
	this.text_color="white";
	this.text_size=20;
	this.border_color="black";
	this.radius=10;
	
	//Aplicamos las opciones pasadas como parametro
	for(x in options)
		if("undefined"!=typeof this[x])
			this[x]=options[x];
	
	//Metodos	
		this.setText=function(t){
			this.text=t;
			this.fireOnChangeEvent();
		};
	//Override
	this.renderTexture=function(){
		if(this.text){
			x_max=this.getSize().width/2;
			
			// Gestion de lineas del texto
			var lineas=[];
			var men=this.text+"";
			var len_max=0;
			while(men!=""){
				var nc=Math.round(x_max/this.text_size);
				nc=nc>men.length?men.length:nc;
				lineas.push({size:nc*this.text_size,text:men.slice(0,nc)});
				men=men.slice(nc);
				if(nc>len_max)
					len_max=nc;
			}
			
			var size={width:(len_max*this.text_size)+this.text_size,height:(lineas.length*this.text_size)+this.text_size};
			var pos={x:((this.getSize().width/2)+this.getPosition().x)-(size.width/2),y:((this.getSize().height/2)+this.getPosition().y)-(size.height/2)};
			var rad=that.radius;
			console.log(pos);
			c.save();
				c.translate(pos.x,pos.y);
				var blur=5;
				var offset=0;
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
					c.font = "bold "+(this.text_size)+"px Comic Sans MS";
					c.textAlign="center";
					c.textBaseline="middle";
					c.fillStyle=that.text_color;
					c.translate(size.width/2 ,0);
					for(var cont=0;cont<lineas.length;cont++){
						var ln=lineas[cont];
						c.translate(0 ,this.text_size);
						c.fillText(ln.text,0,0);
					}
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
		}
		return true;
	};
}