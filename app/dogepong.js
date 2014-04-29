/*
	Script principal del juego
	
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/04/28
*/
// function GoDogePong()
// {
	//Parametros de inicializacion
	var canvas_id="dogepong_canvas";
	var global_refresh_time=25;
	
	//Juego
	var canvas = document.getElementById(canvas_id);
	var context = canvas.getContext("2d");
	
	var global_controller=new GlobalController(canvas);
	
	var app_menu=new AppMenu();
	
	var bg=new Battleground(context,global_refresh_time);
	// bg.barra1.setController(new PlayerBarController("local:1",global_controller));
	// bg.barra2.setController(new PlayerBarController("local:2",global_controller));
	
// }
// GoDogePong();