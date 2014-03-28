/*
	Interfaz que define lo basico de una textura:
		- La posicion de la esquina superior izquierda.
		- El tamaño de la textura como rectangulo.
		- Un metodo para renderizarla
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/14
*/
function TextureInterface(){
	this.position={x:0,y:0};
	this.size={width:0,height:0};
	this.render=function(context){};
}