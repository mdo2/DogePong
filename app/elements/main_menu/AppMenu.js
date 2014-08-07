/*
	Clase que controla las transiciones de menu y es capaz de hacer
	accesibles los elementos de los menus a los demas componentes de la aplicación
*/
function AppMenu(){
	var that=this;
	
	//Propiedades
		//Recursos globales
		var img=new Image();
		img_loaded=false;
		img.src="imgs/doge_disk350.png";
		img.onload=function(){img_loaded=true;};
		DogePongGlobals.prototype.background_menu_img=img;
	
		//Menus
		var menus={};
		
		menus["main_menu"]=new MainMenu("main_menu");
		
		//Juego en local
		menus["main_menu"].boton_local.addListener(function(){
			menus["controls_menu"].setPlayers("local","local");
			that.renderMenu("controls_menu");
		});
		
		menus["controls_menu"]=new ControlsMenu("controls_menu");
		menus["controls_menu"].back_button.addListener(function(){that.renderMenu("main_menu");});
		menus["controls_menu"].onAnimationEnds=function(){
			DogePongGlobals.prototype.battleground.renderBattleground();
			DogePongGlobals.prototype.battleground.startGame();
		};
		
		
		var actual_menu=menus["main_menu"];
		
	//Métodos
		this.init=function(){
			
		};
		this.reset=function(){
			
		};
		
		this.start=function(){
			if(img_loaded)
				menus.main_menu.renderMenu();
			else
				img.onload=function(){menus.main_menu.renderMenu();actual_menu=menus.main_menu;};
		};
		
		this.renderMenu=function(menu_id){
			if("string"==typeof menu_id && menus[menu_id]){
				if(menus[menu_id]!=actual_menu)
				{
					actual_menu.clearMenu();
					actual_menu=menus[menu_id];
					actual_menu.renderMenu();
				}
				return true;
			}
			console.error("Error changing the menu. The menu id provided does not exist: '"+menu_id+"'");
			return false;
		};
}