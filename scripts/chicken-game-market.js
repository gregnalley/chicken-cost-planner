"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.market = {


  sellEggs:

  function(state, amount){


    if(
      state.eggs <= 0
    ){

      return {

        success:false,

        message:
          "No eggs available."

      };

    }



    const sellAmount =
      Math.min(
        amount,
        state.eggs
      );



    const eggValue =
      BCPChickenGame.config
       .eggs
       .sellValue;



    const revenue =
      sellAmount *
      eggValue;



    state.eggs -=
      sellAmount;


    state.money +=
      revenue;



    return {

      success:true,

      eggsSold:
        sellAmount,

      revenue:
        revenue

    };


  }



};



})(window);