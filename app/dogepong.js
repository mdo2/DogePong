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
	
	var barra1=new PlayerBarTexture();
	barra1.render(context);
	
	var barra2=new PlayerBarTexture({
		text_color:"blue",
		position:{x:300,y:100},
		text:"SUCH PONG!!",
		orientation:"right"
	});
	barra2.render(context);
// }
// GoDogePong();