"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.feeding = {


  /*
    Return the current feed-storage
    capacity from the player's
    building state.
  */

  getFeedStorageCapacity:

  function(
    state
  ){


    const storage =
      state.buildings
        .find(
          function(building){

            return (
              building.type ===
              "feed-storage"
            );

          }
        );


    if(
      !storage
    ){

      return 0;

    }


    return storage.capacity;


  },



  /*
    Consume feed continuously
    according to real elapsed time.

    Current validated rate:

    0.75 lb per hen
    per game day.

    One game day currently lasts
    10 real minutes.
  */

  consumeFeed:

  function(
    state,
    elapsedSeconds
  ){


    if(
      !state ||
      elapsedSeconds <= 0
    ){

      return;

    }



    const chickenCount =
      state.chickens.length;


    if(
      chickenCount <= 0
    ){

      return;

    }



    const poundsPerHenPerGameDay =
      BCPChickenGame.config
        .feed
        .poundsPerHenPerGameDay;


    const secondsPerGameDay =
      BCPChickenGame.config
        .time
        .realMinutesPerGameDay *
      60;



    /*
      Total flock feed requirement
      for the elapsed real time.
    */

    const totalFeedRequirement =
      (
        chickenCount *
        poundsPerHenPerGameDay *
        elapsedSeconds
      ) /
      secondsPerGameDay;



    /*
      If harvested supplemental feed
      exists, it may cover up to 25%
      of the flock's requirement.

      Crops themselves are not yet
      part of the playable starter
      game, but this keeps the feeding
      system compatible with the
      validated Phase 2 model.
    */

    let supplementalFeedUsed =
      0;


    if(
      state.supplementalFeedAmount >
      0
    ){

      const supplementalRequirement =
        totalFeedRequirement *
        0.25;


      supplementalFeedUsed =
        Math.min(
          supplementalRequirement,
          state.supplementalFeedAmount
        );


      state.supplementalFeedAmount -=
        supplementalFeedUsed;

    }



    const commercialFeedUsed =
      Math.max(
        0,
        totalFeedRequirement -
        supplementalFeedUsed
      );


    state.feed -=
      commercialFeedUsed;



    if(
      state.feed <
      0
    ){

      state.feed =
        0;

    }


    if(
      state.supplementalFeedAmount <
      0
    ){

      state.supplementalFeedAmount =
        0;

    }


  }



};



})(window);