"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.market = {


  /*
    Manually sell a required
    batch of eggs.

    Early-game selling is manual.

    If the player chooses to sell
    25 eggs, at least 25 eggs must
    be available.

    Later transportation and
    managers can introduce separate
    automatic selling behavior.
  */

  sellEggs:

  function(
    state,
    amount
  ){


    if(
      !state
    ){

      return {

        success:
          false,

        message:
          "Game state unavailable."

      };

    }



    if(
      !Number.isFinite(
        amount
      ) ||
      amount <= 0
    ){

      return {

        success:
          false,

        message:
          "Invalid egg-sale amount."

      };

    }



    if(
      state.eggs <
      amount
    ){

      return {

        success:
          false,

        message:
          "Not enough eggs. " +
          amount +
          " eggs are required."

      };

    }



    const eggValue =
      state.eggValue;



    const revenue =
      amount *
      eggValue;



    state.eggs -=
      amount;


    state.money +=
      revenue;



    return {

      success:
        true,

      eggsSold:
        amount,

      revenue:
        revenue,

      message:
        "Sold " +
        amount +
        " eggs for $" +
        revenue.toFixed(2) +
        "."

    };


  }



};



})(window);