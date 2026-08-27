"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.config = {


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
  */

  chicken:

  {

    purchaseCost:
      50,


    startingHenCapacity:
      10

  },



  /*
    Egg production and value
  */

  eggs:

  {

    secondsPerEggPerHen:
      8,


    startingValue:
      1

  },



  /*
    Production upgrades
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



  /*
    Feed system
  */

  feed:

  {

    startingAmount:
      100,


    poundsPerHenPerGameDay:
      0.75,


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
        true,


      poundsLost:
        10,


      checkIntervalSeconds:
        60,


      riskByPhase:

      {

        day:
          0.02,


        dusk:
          0.08,


        night:
          0.18,


        dawn:
          0.06

      }

    }

  },



  /*
    Egg storage
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
          150,

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
    Transportation
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

    10 real minutes =
    one full game day.
  */

  time:

  {

    realMinutesPerGameDay:
      10,

    tickMilliseconds:
      417  

  },



  /*
    Predator system

    These are the existing
    validated simulator values.

    We will revisit predator
    severity when that system
    is transferred into the game.
  */

  predators:

  {

    startingProtection:
      0,


    henLossMinute:
      20,


    henLossAmount:
      1

  }


};


})(window);