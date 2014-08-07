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
		
		//Id del timeout actual
		var timeout_id=0;

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
		timeout_id=setTimeout(function(){
			texture.setText("");
			timeout_id=0;
			if(callback)
				callback(timeout_id);
		},delay);
	};
	
	this.reset=function(){
		if(timeout_id){
			texture.setText("");
			clearTimeout(timeout_id);
			timeout_id=0;
		}
	};
	
}