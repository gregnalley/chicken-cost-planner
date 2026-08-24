"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;


BCPChickenGame.config = {


  version:
    "0.1.0",


  startingFarm:

  {

    money:
      25,


    eggs:
      0,


    chickens:
      3

  },


  chicken:

  {

    purchaseCost:
      50,


    eggsPerMinute:
      1

  },

  eggs:
{
  sellValue: 1,
  storageCapacity: 250
},


  coop:

  {

    startingLevel:
      1,


    startingCapacity:
      10

  },


  time:

  {

    tickMilliseconds:
      1000

  }


};


})(window);