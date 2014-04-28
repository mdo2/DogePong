/*
  Clase que define la barra de un jugador
*/
function MainMenu(id,url,context,controller){
	var that=this;

	//Propiedades
		//Textures
		var background_texture=new MainMenuTexture(id,context);
		background_texture.img.src=url;
		
		//Zonas
		var zones=[];
		var top_zone=new MenuZoneTexture("top_menu_zone",context);
		top_zone.setSize(800,50);
		zones.push(top_zone);
		var title_zone=new MenuZoneTexture("title_menu_zone",context);
		title_zone.setSize(800,150);
		title_zone.move(0,50);
		zones.push(title_zone);
		var center_zone=new MenuZoneTexture("center_menu_zone",context);
		center_zone.setSize(800,250);
		center_zone.move(0,200);
		zones.push(center_zone);
		var bottom_zone=new MenuZoneTexture("bottom_menu_zone",context);
		bottom_zone.setSize(800,50);
		bottom_zone.move(0,350);
		zones.push(bottom_zone);
		
		var menu_items={};
		
		for(var cont=0;cont<zones.length;cont++)
			if(zones[cont]){
				background_texture.addSon(zones[cont]);
				menu_items[zones[cont].id]=[];
			}
		
		//MenuItems		
		this.addMenuItem=function(obj,zone){
			if(obj && "function"==typeof obj.renderTexture && menu_items[zone] && "number"==typeof obj.menu_state){
				menu_items[zone].push(obj);
				return true;
			}
			console.error("Error adding the menu item to menu zone.");
			return false;
		};
		var boton=new Button("boton",context,controller);
		boton.setSize(300,70);
		boton.setPosition(250,170);
		boton.addListener(function(){console.log("Me han hecho Click!!");});
		this.addMenuItem(boton.getTexture(),"center_menu_zone");
		
		//Other
		//Estados del Menu
		/*
			0 => Menu principal
		*/
		var state=0;

	//Metodos
	this.setState=function(menuState){
		state=menuState;
	};
	
	function addMenuItems(obj){
		var items=menu_items[obj.id];
		for(var cont=0;cont<items.length;cont++)
			if(items[cont] && items[cont].menu_state==state)
				obj.addSon(items[cont]);
	};
	function resetMenuItems(){
		for(var cont=0;cont<zones.length;cont++)
			if(zones[cont]){
				zones[cont].removeAllSons();
				addMenuItems(zones[cont]);
			}
	}
	
	
	this.renderMenu=function(){
		resetMenuItems();
		if(background_texture.img_loaded)
			background_texture.render();
		else
			background_texture.img.onload=function(){background_texture.render();};
	};
}