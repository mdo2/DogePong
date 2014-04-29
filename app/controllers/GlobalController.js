/*
	Esta es la clase que controla todos los eventos del usuario y permite añadirse a los demás elementos
*/
function GlobalController(source){
	//Se espera que el source sea el elemento canvas
	var that=this;
	
	//Propiedades
	//Lista global de listeners
	var events_list=["keydown","keyup","keypress","mousedown","mousemove","mouseover","mouseup","click"];
	var listeners={};
	
	//Metodos
	//Nos registramos en el source
	function fireEvent(ev){
		var type=ev.type;
		for(var cont=0;cont<listeners[type].length;cont++){
			var handler=listeners[type][cont];
			if("function"==typeof handler)
				handler(ev);
		}
	};
	
	for(var cont=0;cont<events_list.length;cont++){
		var event=events_list[cont];
		listeners[event]=[];
		source.addEventListener(event,fireEvent);
	}
	
	this.addEventListener=function(type,handler){
		var list=listeners[type];
		if(list){
			list.push(handler);
			return true;
		}
		console.error("Error adding event handler of type "+type+". Global Controller do not fire that type of event");
		return false;
	};
	
	this.removeEventListener=function(type,handler){
		var list=listeners[type];
		if(list){
			var index=lista.indexOf(handler);
			if(index>=0)
				return delete list[index];
			console.error("Error removing event handler of type "+type+". The handler given was not on the event list given.");
			return false;
		}
		console.error("Error removing event handler of type "+type+". Global Controller do not fire that type of event");
		return false;
	};
}