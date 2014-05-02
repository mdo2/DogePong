/*
	Clase que define un boton básico
*/
function Button(id,options){
	var that=this;
	
	//Propiedades
	var controller=DogePongGlobals.prototype.global_controller;
	
	var texture=new ButtonTexture(id,options);
	
	var listeners=[];
		
	//Metodos
	function onClick(ev){
		var pos=texture.getPosition();
		var size=texture.getSize();
		if((ev.offsetX>=pos.x && ev.offsetX<=pos.x+size.width) && (ev.offsetY>=pos.y && ev.offsetY<=pos.y+size.height)){
			if(ev.type=="click" || ev.type=="touchend"){				
				texture.setState(0);
				//Ejecutamos los listeners
				for(var cont=0;cont<listeners.length;cont++)
					if("function"==typeof listeners[cont])
						listeners[cont](ev);
			}
			else if(ev.type=="mousemove" && !texture.getState())
				texture.setState(2);
			else if(ev.type=="mousedown" || ev.type=="touchstart")
				texture.setState(1);
			else if(ev.type=="mouseup")
				texture.setState(2);
		}
		else{
			if(ev.type=="mouseup" || ev.type=="touchend" || (ev.type=="mousemove" && texture.getState()!=1))
				texture.setState(0);
		}
	}
	this.init=function(){
		controller.addEventListener("click",onClick);
		controller.addEventListener("mousedown",onClick);
		controller.addEventListener("mouseup",onClick);
		controller.addEventListener("mousemove",onClick);
		controller.addEventListener("touchstart",onClick);
		controller.addEventListener("touchmove",onClick);
		controller.addEventListener("touchend",onClick);
	};
	this.reset=function(){
		controller.removeEventListener("click",onClick);
		controller.removeEventListener("mousedown",onClick);
		controller.removeEventListener("mouseup",onClick);
		controller.removeEventListener("mousemove",onClick);
		controller.removeEventListener("touchstart",onClick);
		controller.removeEventListener("touchmove",onClick);
		controller.removeEventListener("touchend",onClick);
	};
		
	this.addListener=function(handler){
		if("function"==typeof handler)
			return listeners.push(handler);
		console.error("Error adding the handler to botton '"+id+"' listeners list.");
		return false;
	};
	this.removeListeners=function(){
		listeners=[];
	};
	
	//Getters y Setters
	this.getTexture=function(){
		return texture;
	};
	this.setMenuState=function(state){
		if("number"==typeof state){
			texture.menu_state=state;
			return true;
		}
		console.error("Error setting the menu state to the button with id '"+id+"'.");
		return false;
	};
	
	this.setSize=function(width,height){
		if("number"==typeof width && "number"==typeof height){
			return texture.setSize(width,height);
		}
		console.error("Error setting the size of button '"+id+"'");
		return false;
	};
	this.setPosition=function(x,y){
		if("number"==typeof x && "number"==typeof y){
			return texture.move(x,y);
		}
		console.error("Error setting the size of button '"+id+"'");
		return false;
	};
	this.setBorderColor=function(text){
		if("string"==typeof text){
			texture.border_color=text;
			return true;
		}
		console.error("Error setting the border color to the button with id '"+id+"'.");
		return false;
	};
	this.setRadius=function(rad){
		if("number"==typeof rad){
			texture.radius=rad;
			return true;
		}
		console.error("Error setting the border radius to the button with id '"+id+"'.");
		return false;
	};
	this.setStartColor=function(text){
		if("string"==typeof text){
			texture.color_inicio=text;
			return true;
		}
		console.error("Error setting the start color to the button with id '"+id+"'.");
		return false;
	};
	this.setEndColor=function(text){
		if("string"==typeof text){
			texture.color_fin=text;
			return true;
		}
		console.error("Error setting the end color to the button with id '"+id+"'.");
		return false;
	};
	this.setText=function(text){
		if("string"==typeof text){
			texture.text=text;
			return true;
		}
		console.error("Error setting the text to the button with id '"+id+"'.");
		return false;
	};
	this.setTextColor=function(text){
		if("string"==typeof text){
			texture.text_color=text;
			return true;
		}
		console.error("Error setting the text color to the button with id '"+id+"'.");
		return false;
	};
}