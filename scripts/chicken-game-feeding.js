"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.feeding = {


  consumeDailyFeed:

  function(state){


    if(
      state.lastFedDay ===
      state.time.day
    ){

      return {

        success:false,

        message:
          "Chickens already fed today."

      };

    }



    const chickenCount =
      state.chickens.length;



    const feedPerChicken =
      0.25;



    const feedNeeded =
      chickenCount *
      feedPerChicken;



    if(
      state.feed <
      feedNeeded
    ){

      state.lastFedDay =
        state.time.day;


      return {

        success:false,

        message:
          "Not enough feed."

      };

    }



    state.feed -=
      feedNeeded;



    state.lastFedDay =
      state.time.day;



    return {

      success:true,

      amount:
        feedNeeded,

      message:
        "Chickens fed."

    };


  }



};



})(window);