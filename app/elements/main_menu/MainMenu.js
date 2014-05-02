/*
  Clase que define el menu principal
*/
function MainMenu(id){
	var that=this;

	//Propiedades
		//Textures
		var background_texture=new MainMenuTexture(id);
		
		//MenuItems	
			//Botones
			this.boton_local=new Button("boton_local",{
				text:"Jugar en local"
			});
			this.boton_local.setSize(180,50);
			this.boton_local.setPosition(25,210);
			// this.boton_local.addListener(function(){});
			background_texture.addSon(this.boton_local.getTexture());
			
			this.boton_red=new Button("boton_red",{
				text:"Jugar en red"
			});
			this.boton_red.setSize(180,50);
			this.boton_red.setPosition(595,210);
			// this.boton_red.addListener(function(){});
			background_texture.addSon(this.boton_red.getTexture());
			
			//Title
			var doge_text=new TextTexture("menu_title_doge",{
				text:"DOGE",
				gradient:true
			});
			doge_text.setSize(200,100);
			doge_text.move(40,0);
			background_texture.addSon(doge_text);
			
			var pong_text=new TextTexture("menu_title_pong",{
				text:"PONG",
				gradient:true
			});
			pong_text.setSize(200,100);
			pong_text.move(560,0);
			background_texture.addSon(pong_text);

	//Metodos
		
	this.renderMenu=function(){
		that.boton_local.init();
		that.boton_red.init();
		background_texture.render();
	};
	this.clearMenu=function(){
		that.boton_local.reset();
		that.boton_red.reset();
	};
}