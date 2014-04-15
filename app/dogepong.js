/*
	Script principal del juego
	
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/
// function GoDogePong()
// {
	//Parametros de inicializacion
	var canvas_id="dogepong_canvas";
	var global_refresh_time=25;
	
	//Juego
	var canvas = document.getElementById(canvas_id);
	var context = canvas.getContext("2d");
	
	var bg=new Battleground(context);
	
	var barra1=new PlayerBar("barra1","left",context);	
	var barra2=new PlayerBar("barra2","right",context);
	bg.addPlayerBar(barra1,"left");
	bg.addPlayerBar(barra2,"right");
	
	var dogeball=new DogeBall("dogeball","imgs/doge_disk49.png",context,global_refresh_time);
	bg.setDogeBall(dogeball);
// }
// GoDogePong();