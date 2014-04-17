/*
	Clase que controla los eventos para el movimiento de las barras de jugador
	
	Se configura para recibir los eventos de manera local(teclas) o bien atraves de un socket(mensajes)
*/
function PlayerBarController(type,source){
	that=this;
	
	//Propiedades
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
	
	//Metodos
	//Configuracion si el controlador es local
	if(local){
		source.addEventListener("keydown",processEvent);
		source.addEventListener("keyup",processEvent);
	}
	//Configuracion si el controlador es remoto
	else if(remote){
		
	}	
	
	function processEvent(ev){
		if(local){
			var code=ev.keyCode;
			if(code==(player==1?87:80) || code==(player==1?65:76)){
				var dir=(code==87||code==80?1:2);
				var lista=(ev.type=="keydown"?listeners.startMove:listeners.stopMove);
				for(var cont=0;cont<lista.length;cont++){
					var listener=lista[cont];
					if("function"==typeof listener)
						listener(dir);
				}
			}
		}
		else if(remote){
			
		}
	};
	
	this.addEventListener=function(type,handler){
		listeners[type].push(handler);
	};
}