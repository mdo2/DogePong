/*
  Clase que define el gestor de mensajes al usuario
*/
function Messages(id){
	var that=this;

	//Propiedades
	var texture=new MessagesTexture(id);
	
	var zone;
	
		//Controller
		var controller;
		
		//Worker
		var worker;

	//Metodos
	function checkType(v,t){
		if(t==typeof v)
			return true;
		console.error("The var type given is not the required. Required: "+t+"  Given: "+typeof v);
		return false;
	}
	this.setParentTexture=function(pt){
		if(pt && "function"==typeof pt.addSon){
			zone=pt;
			texture.setSize(zone.getSize().width,zone.getSize().height);
			texture.move(zone.getPosition().x,zone.getPosition().y);
			return pt.addSon(texture);
		}
		return false;
	}
	
	this.printMessage=function(text,delay,callback){
		texture.setText(text);
		delay="number"!=typeof delay?2000:delay;
		setTimeout(function(){
			texture.setText("");
			if(callback)
				callback();
		},delay);
	};
	
	this.reset=function(){
		
	};
	
}