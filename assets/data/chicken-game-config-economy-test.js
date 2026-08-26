"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame ||
  {};



BCPChickenGame.economyConfig = {


  version:
    "0.3.0-economy-test",



  /*
    Starting farm
  */

  startingFarm:

  {

    cash:
      25,


    hens:
      3,


    eggStorageCapacity:
      250

  },



  /*
    Chicken production

    Game balance values,
    not real-world values.

  */

  chicken:

  {

    purchaseCost:
      50,


    startingHenCapacity:
      10

  },



  eggs:

  {

    secondsPerEggPerHen:
      20,


    startingValue:
      1

  },



  /*
  Production upgrades

  First-pass V3 balance values.
*/

productionUpgrades:

{

  nestingBoxes:

  [

    {

      level:
        1,

      name:
        "Basic Nesting Boxes",

      cost:
        75,

      multiplier:
        1.5

    },


    {

      level:
        2,

      name:
        "Improved Nesting Boxes",

      cost:
        250,

      multiplier:
        1.35

    },


    {

      level:
        3,

      name:
        "Premium Nesting System",

      cost:
        750,

      multiplier:
        1.25

    }

  ]

},



/*
  Egg-value upgrades

  Also first-pass V3 values.
*/

eggValueUpgrades:

[

  {

    level:
      1,

    name:
      "Farm Fresh Branding",

    cost:
      150,

    eggValue:
      1.25

  },


  {

    level:
      2,

    name:
      "Premium Egg Market",

    cost:
      500,

    eggValue:
      1.50

  },


  {

    level:
      3,

    name:
      "Specialty Egg Contracts",

    cost:
      1500,

    eggValue:
      2.00

  }

],



feed:

{

  startingAmount:
    100,


  poundsPerHenPerGameDay:
    0.25,


  purchaseOptions:

  [

    {

      id:
        "basic-feed-bag",

      label:
        "Basic Feed Bag",

      pounds:
        50,

      cost:
        15

    },


    {

      id:
        "bulk-feed",

      label:
        "Bulk Feed",

      pounds:
        250,

      cost:
        65

    }

  ],


  predatorFeedLoss:

  {

    enabled:
      false,

    poundsLost:
      10

  }

},


  /*
    Storage system
  */

  storage:

  {

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



  /*
    Coop upgrades
  */

  coop:

  {

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



  /*
    Truck system

  */

  transportation:

  {

    starterTruckCapacity:
      100,


    starterTruckCycleSeconds:
      45,


    upgrades:

    [

      {

        level:
          2,

        cost:
          500,

        capacity:
          250

      },


      {

        level:
          3,

        cost:
          1500,

        capacity:
          500

      }


    ]

  },



  /*
    Land expansion

  */

  land:

  {

    firstExpansion:

    {

      name:
        "East Pasture",


      cost:
        3000,


      targetUnlockMinutes:
        30

    }

  },



  /*
    Time conversion

  */

  time:

  {

    realMinutesPerGameDay:
      10

  },



  /*
    Predator system

  */

  predators:

  {

    startingProtection:
      0,


    henLossMinute:
      20,


    henLossAmount:
      1

  },



  /*
    Feed placeholder

    Added now so the
    simulator has room
    to grow.

  */

  feed:

  {

    enabled:
      false,


    costPerHenPerDay:
      0

  }



};



global.BCPChickenGameEconomyConfig =
  BCPChickenGame.economyConfig;


global.BCPChickenGameConfig =
  BCPChickenGame.economyConfig;


BCPChickenGame.config =
  BCPChickenGame.economyConfig;



})(window);