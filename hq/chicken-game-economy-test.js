"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.economy = {


  getEggStorageCapacity:

  function(state){


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



    if(!storage){

      return 0;

    }


    return storage.capacity;


  },



  produceEggs:

  function(state){


    const chickens =
      state.chickens.length;



    const storageCapacity =
      BCPChickenGame.economy
        .getEggStorageCapacity(
          state
        );



    const availableSpace =
      storageCapacity -
      state.eggs;



    const eggsProduced =
      Math.min(
        chickens,
        availableSpace
      );



    if(
      eggsProduced > 0
    ){

      state.eggs +=
        eggsProduced;

    }


  },



  coopClick:

  function(state){


    const storageCapacity =
      BCPChickenGame.economy
        .getEggStorageCapacity(
          state
        );



    const availableSpace =
      storageCapacity -
      state.eggs;



    if(
      availableSpace > 0
    ){

      state.eggs += 1;

    }


  }



};



})(window);