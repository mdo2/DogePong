/*
  Clase que define la barra de un jugador
*/
function MainMenu(id,url,context,controller){
	var that=this;

	//Propiedades
		//Textures
		var background_texture=new MainMenuTexture(id,context);
		background_texture.img.src=url;
		
		//MenuItems	
			//Botones
			var boton_local=new Button("boton_local",context,controller,{
				text:"Jugar en local"
			});
			boton_local.setSize(180,50);
			boton_local.setPosition(25,210);
			boton_local.addListener(function(){});
			background_texture.addSon(boton_local.getTexture());
			
			var boton_red=new Button("boton_red",context,controller,{
				text:"Jugar en red"
			});
			boton_red.setSize(180,50);
			boton_red.setPosition(595,210);
			boton_red.addListener(function(){});
			background_texture.addSon(boton_red.getTexture());
			
			//Title
			var title=new TextTexture("menu_title",context,{
				text:"DOGE                 PONG",
				text_color:"black"
			});
			title.menu_state=0;
			title.setSize(800,100);
			title.move(0,50);
			background_texture.addSon(title);

	//Metodos
		
	this.renderMenu=function(){
		if(background_texture.img_loaded)
			background_texture.render();
		else
			background_texture.img.onload=function(){background_texture.render();};
	};
}