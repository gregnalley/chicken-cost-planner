"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.createState =

function(){


  return {


    /*
      Core farm economy
    */

    money:
      BCPChickenGame.config
        .startingFarm
        .cash,


    eggs:
      0,


    feed:
      BCPChickenGame.config
        .feed
        .startingAmount,


    supplementalFeedAmount:
      0,



    /*
      Egg-production state
    */

    eggRate:
      BCPChickenGame.config
        .eggs
        .secondsPerEggPerHen,


    eggValue:
      BCPChickenGame.config
        .eggs
        .startingValue,


    eggProductionAccumulator:
      0,


    nestingUpgradeIndex:
      0,


    eggValueUpgradeIndex:
      0,



    /*
      Feed tracking
    */

    feedPurchased:
      0,


    feedCost:
      0,



    /*
      Transportation
    */

    truckCapacity:
      BCPChickenGame.config
        .transportation
        .starterTruckCapacity,


    lastTruckPickupSecond:
      0,



    /*
      Chickens

      Keep the existing individual
      chicken structure for now.

      We will revisit flock scaling
      later if the real game begins
      handling very large numbers
      of hens.
    */

    chickens:

  Array.from(
    {
      length:
        BCPChickenGame.config
          .startingFarm
          .hens
    },

    function(
      unused,
      index
    ){

      return {

        id:
          "hen-" +
          String(
            index + 1
          )
          .padStart(
            3,
            "0"
          ),

        breed:
          "starter",

        health:
          100

      };

    }
  ),



    /*
      Starter-property buildings
    */

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
            .chicken
            .startingHenCapacity

      },


      {

        id:
          "starter-storage",

        type:
          "egg-storage",

        level:
          1,

        capacity:
          BCPChickenGame.config
            .startingFarm
            .eggStorageCapacity

      },


      {

        id:
          "starter-feed-storage",

        type:
          "feed-storage",

        level:
          1,

        /*
          Existing test-game value.

          This has not yet been moved
          into chicken-game-config.js.
        */

        capacity:
          250

      }

    ],



    /*
      Real elapsed game time

      This will be used by the rebuilt
      engine for production, feed,
      transportation, crops and other
      timed systems.
    */

    elapsedSeconds:
      0,



    /*
      Displayed game clock

      The existing test game starts
      immediately before 6:00 AM.

      We are preserving that behavior
      for now.
    */


          milestones:
      [],


    hensLost:
      0,


    predatorFeedLossTriggered:
      false,


    predatorFeedLost:
      0,


    lastPredatorCheckSecond:
      0,


    predatorWarnings:
      0,


    predatorFeedLossEvents:
      0,


    landUnlocked:
      false,


    landUnlockSecond:
      null,


    eastPasture:

    {

      unlocked:
        false,


      barnA:

      {

        repaired:
          false,

        use:
          null,

        level:
          0

      },


      barnB:

      {

        repaired:
          false,

        use:
          null,

        level:
          0

      },


      transportDepot:

      {

        repaired:
          false,

        level:
          0

      },


      cropPlot:

      {

        unlocked:
          false,

        level:
          0,

        plantedCrop:
          null,

        plantedSecond:
          null,

        harvestSecond:
          null,

        harvestReady:
          false

      }

    },

    time:

    {

      day:
        1,


      hour:
        5,


      minute:
        0

    },


    dayPhase:
      "night"


  };


};



})(window);