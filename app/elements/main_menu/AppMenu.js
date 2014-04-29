/*
	Clase que controla las transiciones de menu y es capaz de hacer
	accesibles los elementos de los menus a los demas componentes de la aplicación
*/
function AppMenu(){
	var that=this;
	
	//Propiedades
	
	this.menu=new MainMenu("main_menu","imgs/doge_disk350.png",context,global_controller);
	this.menu.renderMenu();
	
	//Métodos
}