/*
	Clase que define los parametros globales del juego que pueden ser accedidos desde cualquier parte
*/
function DogePongGlobals()
{
	
	
	
}
//El elemento canvas del juego
DogePongGlobals.prototype.canvas;
//El elemento context para renderizar
DogePongGlobals.prototype.context;

//El objeto global controller
DogePongGlobals.prototype.global_controller;

DogePongGlobals.prototype.refresh_time;

//Diversos objetos compartidos por varias clases y que por rendimiento es mejor compartirlos
	//La imagen del menu principal
	DogePongGlobals.prototype.background_menu_img;
	
	//La imagen de la DogeBall
	DogePongGlobals.prototype.dogeball_img;