"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.engine = {


  state:
    null,


  start:

  function(){


    this.state =
      BCPChickenGame
        .createState();


    console.log(
      "Chicken Farm Empire Started"
    );


    console.log(
      this.state
    );


  }


};



})(window);