/*
  Clase que define la barra de un jugador
*/
function PlayerBar(id,type,context){
	var that=this;

	//Propiedades
	var texture=new PlayerBarTexture(id,context,{
		text_color:(type=="left"?"red":"blue"),
		text:(type=="left"?"Wow Doge!!":"Such Pong!!"),
		orientation:(type=="left"?"left":"right")
	});
	if(type=="right")
		texture.move(765,125);

	//Metodos
	function checkType(v,t){
		if(t==typeof v)
			return true;
		console.error("The var type given is not the required. Required: "+t+"  Given: "+typeof v);
		return false;
	}
	this.setParentTexture=function(pt){
		if(pt && "function"==typeof pt.addSon)
			return pt.addSon(texture);
		return false;
	}

	//Getters y Setters
	//Text color
	this.setTextColor=function(tc){
		if(checkType(tc,"string")){
			texture.text_color=tc;
			texture.fireOnChangeEvent();
		}
		else
			return false;
	};
	this.getTextColor=function(){
		return texture.text_color;
	};

	//Text
	this.setText=function(t){
		if(checkType(t,"string")){
			texture.text=t;
			texture.fireOnChangeEvent();
		}
		else
			return false;
	};
	this.getText=function(){
		return texture.text;
	};

	//Orientation
	this.setOrientation=function(o){
		if(checkType(o,"string")){
			texture.orientation=o;
			texture.fireOnChangeEvent();
		}
		else
			return false;
	};
	this.getOrientation=function(){
		return texture.orientation;
	};
}