/*
	Script principal del juego
	
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/04/28
*/
// function DogePong()
// {
	//Parametros de inicializacion
	var globals=DogePongGlobals;
	
	var canvas_id="dogepong_canvas";
	var global_refresh_time=25;
	globals.prototype.refresh_time=global_refresh_time;
	
	//Juego
	var canvas = document.getElementById(canvas_id);
	globals.prototype.canvas=canvas;
	var context = canvas.getContext("2d");
	globals.prototype.context=context;
	
	var global_controller=new GlobalController(canvas);
	globals.prototype.global_controller=global_controller;
	
	var app_menu=new AppMenu();
	app_menu.init();
	app_menu.start();
	globals.prototype.app_menu=app_menu;
	
	globals.prototype.battleground=new Battleground();
	
// }
// DogePong();