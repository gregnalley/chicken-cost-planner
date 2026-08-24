"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.createState =
function(){


  return {


    money:
      BCPChickenGame.config
        .startingFarm
        .money,


    eggs:
      BCPChickenGame.config
        .startingFarm
        .eggs,

    eggStorage:
      BCPChickenGame.config
        .eggs
        .storageCapacity,   


    chickens:

    [

      {

        id:
          "hen-001",

        breed:
          "starter",

        health:
          100

      },


      {

        id:
          "hen-002",

        breed:
          "starter",

        health:
          100

      },


      {

        id:
          "hen-003",

        breed:
          "starter",

        health:
          100

      }


    ],


    buildings:

    [

      {

        id:
          "starter-coop",

        type:
          "coop",

        level:
          1,

        capacity:
          BCPChickenGame.config
            .coop
            .startingCapacity

      }


    ],


    time:

    {

      day:
        1,


      minute:
        0

    }


  };


};



})(window);