/*
  Clase que define la barra de marcador
*/
function ScoreBar(id){
	var that=this;

	//Propiedades
	var texture=new ScoreBarTexture(id);
	
	var zone;

	//Boton volver
		this.back_button=new Button("back_button",{
			back:true,
			color_inicio:"#FF8D00",
			color_fin:"#FF8D00",
			text_color:"whitesmoke"
		});
		this.back_button.setSize(40,25);
		this.back_button.setPosition(20,10);
		// this.back_button.addListener(function(){});
		texture.addSon(this.back_button.getTexture());
	
	//Metodos
	function checkType(v,t){
		if(t==typeof v)
			return true;
		console.error("The var type given is not the required. Required: "+t+"  Given: "+typeof v);
		return false;
	}
	this.setParentTexture=function(pt){
		if(pt && "function"==typeof pt.addSon){
			zone=pt;
			return pt.addSon(texture);
		}
		return false;
	}
	
	this.init=function(){
		this.setScore(0,1);
		this.setScore(0,2);
	};
	
		//Getters y Setters

			//PlayerName
			this.setPlayerName=function(pn,t){
				if(checkType(pn,"string")){
					texture.setPlayerName(pn,t);
					texture.fireOnChangeEvent();
				}
				else
					return false;
			};
			this.getPlayerName=function(t){
				if(t==1)
					return texture.player_1_name;
				else if(t==2)
					return texture.player_2_name;
			};

			//Score
			this.setScore=function(score,t){
				if(checkType(score,"number")){
					texture.setScore(score,t);
					texture.fireOnChangeEvent();
				}
				else
					return false;
			};
			this.getScore=function(t){
				if(t==1)
					return texture.score_1;
				else if(t==2)
					return texture.score_2;
			};
}