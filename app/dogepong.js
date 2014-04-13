/* 
	Script principal del juego
	
	
	Author: Francisco Javier Arribas Fernández
	Last update: 2014/03/28
*/
// function GoDogePong()
// {
	//Parametros de inicializacion
	var canvas_id="dogepong_canvas";	
	
	//Juego
	var canvas = document.getElementById(canvas_id);
	var context = canvas.getContext("2d");
	
	var background=new BackgroundTexture("bg",context,{background_color:"blue"});
	background.render();
	
	var barra1=new PlayerBarTexture("barra1",context);
	background.addSon(barra1);
	
	var barra2=new PlayerBarTexture("barra2",context,{
		text_color:"yellow",
		text:"SUCH PONG!!",
		orientation:"right"
	});
	barra2.move(300,100);
	background.addSon(barra2);
// }
// GoDogePong();