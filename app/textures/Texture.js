/*
	Clase base que define lo basico de una textura
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/
function Texture(id){
	if("string"!=typeof id || !id){
		console.error("Error creating the Texture object with id '"+id+"'. Incorrect id.");
		return undefined;
	}
	this.id=id;
	
	//Gestion de posicion y tamaño
	var position={x:0,y:0};
	this.move=function(x,y){
		if("number"==typeof x && "number"==typeof y){
			position.x=x;
			position.y=y;
			this.need_repaint=true;
			//this.fireOnChangeEvent();
			return this.getPosition();
		}
		console.error("Can not move the texture to x:"+x+", y:"+y+" because this coordinates are not correct.");
		return false;
	};
	this.getPosition=function(){
		return {x:position.x,y:position.y};
	};
	var size={width:0,height:0};
	this.setSize=function(w,h){
		if("number"==typeof w && "number"==typeof h){
			size.width=w;
			size.height=h;
			this.need_repaint=true;
			//this.fireOnChangeEvent();
			return this.getSize();
		}
		console.error("Can not set the texture size to width:"+w+", height:"+h+" because this proportions are not correct.");
		return false;
	};
	this.getSize=function(){
		return {width:size.width,height:size.height};
	};
	
	//Gestion de eventos relacionada con el repintado
	var changeListeners=[];
	this.addChangeListener=function(obj){
		if("function"==typeof obj.onSonChange){
			changeListeners.push(obj);
			return true;
		}
		console.error("Error adding the object given to the listener list. This object do not implement the method 'onSonChange'.");
		return false;
	};
	this.removeChangeListener=function(obj){
		var index=changeListeners.indexOf(obj);
		if(index>=0)
			return delete changeListeners[index];
		console.error("Error removing the object given from the changeListeners list. This object does not exists in the list.");
		return false;
	};
	this.fireOnChangeEvent=function(){
		for(var cont=0;cont<changeListeners.length;cont++)
			if(changeListeners[cont] && "function"==typeof changeListeners[cont].onSonChange)
				changeListeners[cont].onSonChange(this);
	};
	this.onSonChange=function(obj){
		this.render();
	};
	
	//Gestion de renderizado
	this.need_repaint=true;
	this.render=function(){
		var flag=false;
		flag=this.renderTexture();
		for(var cont in sons){
			if("function"==typeof sons[cont].render)
				flag=sons[cont].render();
		}
		this.need_repaint=false;
		return flag;
	};
	this.renderTexture=function(){return true;};
	
	//Gestion de hijos
	var sons=[];
	// this.getSons=function(){
		// var a=[];
		// for(var cont in sons)
			// a[cont]=sons[cont];
		// return a;
	// };
	this.addSon=function(obj){
		if("string"==typeof obj.id && obj.id){
			sons[obj.id]=obj;
			sons[obj.id].addChangeListener(this);
			return true;
		}
		console.error("Can not add the texture son to '"+this.id+"' because the object given has not a correct id");
		return false;
	};
	this.removeSon=function(id){
		if("string"==typeof id && id){
			return delete sons[id];
		}
		console.error("Can not remove the son texture of '"+this.id+"' because the id given is not correct or the texture do not exist");
		return false;
	};
	this.removeAllSons=function(){
		for(x in sons)
			if(sons[x])
				delete sons[x];
		sons=[];
	};
}