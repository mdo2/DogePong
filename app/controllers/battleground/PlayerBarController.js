/*
	Clase que controla los eventos para el movimiento de las barras de jugador
	
	Se configura para recibir los eventos de manera local(teclas) o bien atraves de un socket(mensajes)
*/
function PlayerBarController(type){
	that=this;
	
	//Propiedades
	var source=DogePongGlobals.prototype.global_controller;
	
	var texture;
	
	var listeners={
		"startMove":[],
		"stopMove":[]
	};
	var keys={
		"up":[87,80],
		"down":[65,76]
	};
	var local=type.indexOf("local")>=0;
	var player=parseInt(type.split(":")[1]);
	var remote=type.indexOf("socket")>=0;
	
	var touch_id=-1;
	var touch_y=-1;
	
	//Metodos
	this.setTexture=function (txt){
		texture=txt;
		texture.addChangeListener(this);
	}
	
	//Configuracion si el controlador es local
	if(local){
		source.addEventListener("keydown",processEvent);
		source.addEventListener("keyup",processEvent);
		source.addEventListener("touchstart",registerTouchId);
		source.addEventListener("touchend",unsetTouchId);
		source.addEventListener("touchmove",processEvent);
	}
	//Configuracion si el controlador es remoto
	else if(remote){
		
	}	
	
	function processEvent(ev){
		if(local){
			var code=ev.keyCode;
			var lista=[];
			var dir;
			//Teclas
			if(code==(player==1?87:80) || code==(player==1?65:76)){
				dir=(code==87||code==80?1:2);
				lista=(ev.type=="keydown"?listeners.startMove:listeners.stopMove);
			}
			//Táctil
			else if(ev.changedTouches){
				var event;
				for(var cont=0;cont<ev.changedTouches.length;cont++)
					if(ev.changedTouches[cont].identifier==touch_id)
						event=ev.changedTouches[cont];
				if(event){			
					if(event.target==DogePongGlobals.prototype.canvas){
						var point=(texture.getPosition().y+(texture.getSize().height/2));
						dir=(event.offsetY<point?1:2);
						if(event.offsetY<=point-10 || event.offsetY>=point+10)
							lista=listeners.startMove;
						else{
							lista=listeners.stopMove;
						}
						touch_y=event.offsetY;
					}
					else
						unsetTouchId(ev);
				}
			}
			for(var cont=0;cont<lista.length;cont++){
				var listener=lista[cont];
				if("function"==typeof listener)
					listener(dir);
			}
		}
		else if(remote){
			
		}
	};
	
	this.addEventListener=function(type,handler){
		listeners[type].push(handler);
	};
	
	//Funciones para funcionalidad táctil
	function registerTouchId(ev){
		if(ev.target==DogePongGlobals.prototype.canvas){
			var minX=texture.getPosition().x;
			var maxX=texture.getPosition().x+texture.getSize().width;
			var minY=texture.getPosition().y;
			var maxY=texture.getPosition().y+texture.getSize().height;
			if((ev.offsetX<=maxX && ev.offsetX>=minX) && (ev.offsetY<=maxY && ev.offsetY>=minY)){
				touch_id=ev.changedTouches[0].identifier;
			}
		}
	}
	function unsetTouchId(ev){
		if(ev.changedTouches[0].identifier==touch_id){
			touch_id=-1;
			var lista=listeners.stopMove;
			var dir=(ev.offsetY<touch_y?1:2);
			for(var cont=0;cont<lista.length;cont++){
				var listener=lista[cont];
				if("function"==typeof listener)
					listener(dir);
			}
		}
	}
	
	this.onSonChange=function (texture){
		var point=(texture.getPosition().y+(texture.getSize().height/2));
		if(touch_y>=0 && (touch_y>=point-10 && touch_y<=point+10)){
			var lista=listeners.stopMove;
			var dir=(touch_y<point?1:2);
			for(var cont=0;cont<lista.length;cont++){
				var listener=lista[cont];
				if("function"==typeof listener)
					listener(dir);
			}
			touch_y=-1;
		}
	};
}