"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.economy = {


  /*
    Return the current egg-storage
    capacity from the player's
    building state.
  */

  getEggStorageCapacity:

  function(
    state
  ){


    const storage =
      state.buildings
        .find(
          function(building){

            return (
              building.type ===
              "egg-storage"
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
    Produce eggs according to
    elapsed REAL time.

    This replaces the old system
    where every engine tick created
    one egg per chicken.

    Current validated starting rate:

    1 egg per hen every 8 real seconds.

    Production upgrades will later
    modify state.eggRate.
  */

  produceEggs:

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



    /*
      Chickens require feed
      in order to produce eggs.

      Feed itself will be consumed
      continuously by the rebuilt
      feeding module.
    */

    if(
      state.feed <= 0
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



    const eggRate =
      state.eggRate;


    if(
      !eggRate ||
      eggRate <= 0
    ){

      return;

    }



    /*
      Each hen contributes fractional
      egg progress according to the
      amount of real time that passed.

      Example:

      3 hens
      8 seconds per egg
      1 real second elapsed

      3 / 8 =
      0.375 egg progress.
    */

    state.eggProductionAccumulator +=
      (
        chickenCount *
        elapsedSeconds
      ) /
      eggRate;



    /*
      Only whole eggs can enter
      storage.
    */

    const wholeEggsProduced =
      Math.floor(
        state.eggProductionAccumulator
      );


    if(
      wholeEggsProduced <= 0
    ){

      return;

    }



    /*
      Remove completed egg progress
      from the accumulator even if
      storage cannot accept every egg.

      Eggs produced while storage is
      full are therefore lost rather
      than being held invisibly in the
      accumulator.
    */

    state.eggProductionAccumulator -=
      wholeEggsProduced;



    const storageCapacity =
      BCPChickenGame.economy
        .getEggStorageCapacity(
          state
        );


    const availableSpace =
      Math.max(
        0,
        storageCapacity -
        state.eggs
      );


    const eggsAccepted =
      Math.min(
        wholeEggsProduced,
        availableSpace
      );


    if(
      eggsAccepted > 0
    ){

      state.eggs +=
        eggsAccepted;

    }


  }


};



})(window);