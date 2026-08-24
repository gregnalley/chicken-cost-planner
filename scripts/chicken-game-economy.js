"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;


BCPChickenGame.economy = {


  produceEggs:

  function(state){


    const chickens =
      state.chickens.length;


    state.eggs += chickens;


  }


};


})(window);