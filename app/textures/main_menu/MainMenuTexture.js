/*
	Textura para el menu principal del juego
	
	Extends: Texture
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/

function MainMenuTexture(id,opciones){
	//Extendemos de la clase Texture
	var texture=new Texture(id);
	if("undefined"==typeof texture)
		return undefined;
	for(var x in texture)
		this[x]=texture[x];
	var that=this;
	
	//Propiedades
	var context=DogePongGlobals.prototype.context;
	var img=DogePongGlobals.prototype.background_menu_img;

	this.background_color="#e2e2e2";
	this.setSize(800,400);
	this.img=img;
	
	//Aplicamos las opciones pasadas como parametro
	for(x in opciones)
		if("undefined"!=typeof this[x])
			this[x]=opciones[x];
	
	//Override
	this.renderTexture=function(){
		var position=that.getPosition();
		var size=that.getSize();
		
		//Backgroundvar 
		fill_grad=context.createLinearGradient(0,0,0,size.height);
		fill_grad.addColorStop(0,"#f2f2f2");
		fill_grad.addColorStop(1,that.background_color);
		context.fillStyle=fill_grad;
		// context.fillStyle=that.background_color;
		context.fillRect(position.x,position.y,size.width,size.height);
		context.drawImage(that.img,225,25);
		return true;
	};
}