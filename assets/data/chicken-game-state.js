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
        
        
    feed:
      100,   


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
      "starter-storage",

    type:
      "egg-storage",

    level:
      1,

    capacity:
      BCPChickenGame.config
        .storage
        .startingCapacity

  },


  {

    id:
      "starter-feed-storage",

    type:
      "feed-storage",

    level:
      1,

    capacity:
      250

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