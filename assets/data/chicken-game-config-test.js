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
  sellValue:
    1
},


storage:

{

  startingLevel:
    1,


  startingCapacity:
    250,


  upgrades:

  [

    {

      level:
        2,

      cost:
        300,

      capacity:
        750

    },


    {

      level:
        3,

      cost:
        1000,

      capacity:
        2000

    },


    {

      level:
        4,

      cost:
        3000,

      capacity:
        5000

    }

  ]

},


  coop:

{

  startingLevel:
    1,


  startingCapacity:
    10,


  upgrades:

  [

    {

      level:
        2,

      cost:
        250,

      capacity:
        25

    },


    {

      level:
        3,

      cost:
        1000,

      capacity:
        50

    },


    {

      level:
        4,

      cost:
        5000,

      capacity:
        100

    }

  ]

},


  time:

  {

    tickMilliseconds:
      417

  }


};


global.BCPChickenGameConfig =
  BCPChickenGame.config;


})(window);