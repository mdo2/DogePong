/*
	Textura para la barra de los jugadores
	
	Implements: TextureInterface
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/

function PlayerBarTexture(opciones){
	//Implementamos la interfaz de textura
	var texture_interface=new TextureInterface();
	for(x in texture_interface)
		this[x]=texture_interface[x];
	var that=this;
	
	//Propiedades
	this.position={x:100,y:100};
	this.size={width:30,height:150};
	this.line_color="black";
	this.text_color="red";
	this.text="WOW DOGE!!";
	this.orientation="left";
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	this.render=function(context){
		//Rectangulo
			context.beginPath();
			
			//Linea horizontal superior
			context.moveTo(that.position.x,that.position.y+0.5);
			context.lineTo(that.position.x+that.size.width,that.position.y+0.5);
			//Linea horizontal inferior
			context.moveTo(that.position.x,that.position.y+that.size.height-0.5);
			context.lineTo(that.position.x+that.size.width,that.position.y+that.size.height-0.5);
			//Linea vertical izquierda
			context.moveTo(that.position.x+0.5,that.position.y);
			context.lineTo(that.position.x+0.5,that.position.y+that.size.height);
			//Linea vertical derecha
			context.moveTo(that.position.x+that.size.width-0.5,that.position.y);
			context.lineTo(that.position.x+that.size.width-0.5,that.position.y+that.size.height);
			
			context.strokeStyle = that.line_color;
			context.stroke();
		//Texto
			context.translate(that.position.x+that.size.width/2 ,that.position.y+that.size.height/2);
			context.rotate((that.orientation=="right"?-1:1)*Math.PI /2);
			context.font = "bold "+(that.size.width-10)+"px comic-sans";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillStyle=that.text_color;
			context.fillText(that.text,0,0);
			context.resetTransform();
	}
}