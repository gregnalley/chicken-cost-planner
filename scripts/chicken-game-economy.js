"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;


BCPChickenGame.economy = {


  produceEggs:

  function(state){


    const chickens =
      state.chickens.length;


    const availableSpace =
  BCPChickenGame.config
    .eggs
    .storageCapacity
    -
    state.eggs;


const eggsProduced =
  Math.min(
    chickens,
    availableSpace
  );


state.eggs +=
  eggsProduced;


  },



coopClick:

function(state){


  const availableSpace =
  BCPChickenGame.config
    .eggs
    .storageCapacity
    -
    state.eggs;


if(
  availableSpace > 0
){

  state.eggs += 1;

}


}



};


})(window);