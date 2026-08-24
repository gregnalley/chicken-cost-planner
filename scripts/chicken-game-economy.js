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


  },



coopClick:

function(state){


  state.eggs += 1;


}



};


})(window);