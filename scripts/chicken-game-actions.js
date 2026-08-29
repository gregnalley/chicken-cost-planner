"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.actions = {


  buyChicken:

  function(state){


    const cost =
      BCPChickenGame.config
        .chicken
        .purchaseCost;



    if(
      state.money < cost
    ){

      return {

        success:false,

        message:
          "Not enough money."

      };

    }



    const coop =
      state.buildings
        .find(
          function(building){

            return (
              building.type === "coop"
            );

          }
        );



    if(
      state.chickens.length >=
      coop.capacity
    ){

      return {

        success:false,

        message:
          "Coop is full."

      };

    }



    state.money -=
      cost;



    const chickenNumber =
      state.chickens.length + 1;



    state.chickens.push(

      {

        id:
          "hen-" +
          String(
            chickenNumber
          )
          .padStart(
            3,
            "0"
          ),


        breed:
          "starter",


        health:
          100

      }

    );



    return {

      success:true,

      message:
        "New hen purchased!"

    };


  },



  upgradeCoop:

  function(state){


    const coop =
      state.buildings
        .find(
          function(building){

            return (
              building.type === "coop"
            );

          }
        );



    if(!coop){

      return {

        success:false,

        message:
          "No coop found."

      };

    }



    const nextUpgrade =
      BCPChickenGame.config
        .coop
        .upgrades
        .find(
          function(upgrade){

            return (
              upgrade.level ===
              coop.level + 1
            );

          }
        );



    if(!nextUpgrade){

      return {

        success:false,

        message:
          "No more upgrades available."

      };

    }



    if(
      state.money <
      nextUpgrade.cost
    ){

      return {

        success:false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      nextUpgrade.cost;



    coop.level =
      nextUpgrade.level;



    coop.capacity =
      nextUpgrade.capacity;



    return {

      success:true,

      message:
        "Coop upgraded!"

     }

    },


  upgradeStorage:

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

      return {

        success:false,

        message:
          "No egg storage found."

      };

    }



    const nextUpgrade =
      BCPChickenGame.config
        .storage
        .upgrades
        .find(
          function(upgrade){

            return (
              upgrade.level ===
              storage.level + 1
            );

          }
        );



    if(!nextUpgrade){

      return {

        success:false,

        message:
          "No more storage upgrades available."

      };

    }



    if(
      state.money <
      nextUpgrade.cost
    ){

      return {

        success:false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      nextUpgrade.cost;



    storage.level =
      nextUpgrade.level;



    storage.capacity =
      nextUpgrade.capacity;



        return {

      success:true,

      message:
        "Egg storage upgraded!"

    };


  },



  buyFeed:

  function(
    state,
    optionId
  ){


    const purchaseOption =
      BCPChickenGame.config
        .feed
        .purchaseOptions
        .find(
          function(option){

            return (
              option.id ===
              optionId
            );

          }
        );



    if(
      !purchaseOption
    ){

      return {

        success:
          false,

        message:
          "Feed option not found."

      };

    }



    const feedStorage =
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
      !feedStorage
    ){

      return {

        success:
          false,

        message:
          "No feed storage found."

      };

    }



    if(
      state.money <
      purchaseOption.cost
    ){

      return {

        success:
          false,

        message:
          "Not enough money."

      };

    }



    const availableSpace =
      feedStorage.capacity -
      state.feed;



    if(
      availableSpace <
      purchaseOption.pounds
    ){

      return {

        success:
          false,

        message:
          "Not enough feed storage space."

      };

    }



    state.money -=
      purchaseOption.cost;


    state.feed +=
      purchaseOption.pounds;


    state.feedPurchased +=
      purchaseOption.pounds;


    state.feedCost +=
      purchaseOption.cost;



    return {

      success:
        true,

      poundsPurchased:
        purchaseOption.pounds,

      cost:
        purchaseOption.cost,

      message:
        purchaseOption.label +
        " purchased."

    };


  },


    upgradeProduction:

  function(
    state
  ){


    const upgrade =
      BCPChickenGame.config
        .productionUpgrades
        .nestingBoxes[
          state.nestingUpgradeIndex
        ];



    if(
      !upgrade
    ){

      return {

        success:
          false,

        message:
          "No more production upgrades available."

      };

    }



    if(
      state.money <
      upgrade.cost
    ){

      return {

        success:
          false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      upgrade.cost;



    /*
      A production multiplier
      makes each hen produce
      eggs faster.

      Example:

      8 seconds per egg
      ÷ 1.5
      = 5.33 seconds per egg.
    */

    state.eggRate /=
      upgrade.multiplier;



    state.nestingUpgradeIndex +=
      1;



    return {

      success:
        true,

      level:
        upgrade.level,

      name:
        upgrade.name,

      cost:
        upgrade.cost,

      multiplier:
        upgrade.multiplier,

      eggRate:
        state.eggRate,

      message:
        upgrade.name +
        " purchased."

    };


  },


    upgradeEggValue:

  function(
    state
  ){


    const upgrade =
      BCPChickenGame.config
        .eggValueUpgrades[
          state.eggValueUpgradeIndex
        ];



    if(
      !upgrade
    ){

      return {

        success:
          false,

        message:
          "No more egg-value upgrades available."

      };

    }



    if(
      state.money <
      upgrade.cost
    ){

      return {

        success:
          false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      upgrade.cost;


    state.eggValue =
      upgrade.eggValue;


    state.eggValueUpgradeIndex +=
      1;



    return {

      success:
        true,

      level:
        upgrade.level,

      name:
        upgrade.name,

      cost:
        upgrade.cost,

      eggValue:
        state.eggValue,

      message:
        upgrade.name +
        " purchased."

    };


  },



    upgradeTruck:

  function(
    state
  ){


    const nextUpgrade =
      BCPChickenGame.config
        .transportation
        .upgrades
        .find(
          function(
            upgrade
          ){

            return (
              upgrade.capacity >
              state.truckCapacity
            );

          }
        );



    if(
      !nextUpgrade
    ){

      return {

        success:
          false,

        message:
          "No more truck upgrades available."

      };

    }



    if(
      state.money <
      nextUpgrade.cost
    ){

      return {

        success:
          false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      nextUpgrade.cost;


    state.truckCapacity =
      nextUpgrade.capacity;



    return {

      success:
        true,

      level:
        nextUpgrade.level,

      cost:
        nextUpgrade.cost,

      capacity:
        nextUpgrade.capacity,

      message:
        "Truck upgraded to " +
        nextUpgrade.capacity +
        " egg capacity."

    };


  },



    purchaseFirstExpansion:

  function(
    state
  ){


    /*
      East Pasture can only
      be purchased once.
    */

    if(
      state.landUnlocked
    ){

      return {

        success:
          false,

        message:
          "East Pasture is already owned."

      };

    }



    const expansion =
      BCPChickenGame.config
        .land
        .firstExpansion;



    if(
      !expansion
    ){

      return {

        success:
          false,

        message:
          "Land expansion is unavailable."

      };

    }



    if(
      state.money <
      expansion.cost
    ){

      return {

        success:
          false,

        message:
          "Not enough money."

      };

    }



    state.money -=
      expansion.cost;


    state.landUnlocked =
      true;


    state.eastPasture.unlocked =
      true;


    state.landUnlockSecond =
      state.elapsedSeconds;



    /*
      Preserve the milestone
      concept from the validated
      simulator.

      The playable game can later
      display this through the UI.
    */

    state.milestones.push({

      second:
        state.elapsedSeconds,


      label:
        "LAND UNLOCKED: " +
        expansion.name,


      money:
        Number(
          state.money.toFixed(2)
        ),


      hens:
        state.chickens.length

    });



    return {

      success:
        true,

      name:
        expansion.name,

      cost:
        expansion.cost,

      message:
        expansion.name +
        " purchased!"

    };


  },



  unlockEastPastureCropPlot:

function(
  state
){

  /*
    East Pasture must already
    be owned.
  */

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    return {
      success:
        false,

      message:
        "East Pasture is not unlocked."
    };

  }


  /*
    Crop Plot can only be
    unlocked once.
  */

  if(
    state.eastPasture
      .cropPlot
      .unlocked === true
  ){

    return {
      success:
        false,

      message:
        "East Pasture Crop Plot is already unlocked."
    };

  }


  const unlockCost =
    BCPChickenGame.config
      .crops
      .eastPastureCropPlot
      .unlockCost;


  /*
    Player must be able
    to afford the plot.
  */

  if(
    state.money <
    unlockCost
  ){

    return {
      success:
        false,

      message:
        "Not enough money to unlock the East Pasture Crop Plot."
    };

  }


  state.money -=
    unlockCost;


  state.eastPasture
    .cropPlot
    .unlocked =
      true;


  state.eastPasture
    .cropPlot
    .level =
      1;


  return {

    success:
      true,

    cost:
      unlockCost,

    level:
      state.eastPasture
        .cropPlot
        .level,

    message:
      "East Pasture Crop Plot unlocked."

  }

},


plantCrop:

function(
  state,
  cropId
){

  /*
    East Pasture and the Crop Plot
    must already be unlocked.
  */

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true ||
    state.eastPasture
      .cropPlot
      .unlocked !== true
  ){

    return {

      success:
        false,

      message:
        "East Pasture Crop Plot is not unlocked."

    };

  }


  const plot =
    state.eastPasture
      .cropPlot;


  /*
    Only one crop can occupy
    the plot at a time.
  */

  if(
    plot.plantedCrop !== null
  ){

    return {

      success:
        false,

      message:
        "A crop is already planted."

    };

  }


  /*
    Find the selected crop in
    the game configuration.
  */

  const crop =
    BCPChickenGame.config
      .crops
      .definitions[
        cropId
      ];


  if(
    !crop
  ){

    return {

      success:
        false,

      message:
        "Crop not found."

    };

  }


  /*
    Player must be able to
    afford the planting cost.
  */

  if(
    state.money <
    crop.plantingCost
  ){

    return {

      success:
        false,

      message:
        "Not enough money to plant " +
        crop.name +
        "."

    };

  }


  state.money -=
    crop.plantingCost;


  plot.plantedCrop =
    crop.id;


  plot.plantedSecond =
    state.elapsedSeconds;


  plot.harvestSecond =
    state.elapsedSeconds +
    crop.growthSeconds;


  plot.harvestReady =
    false;


  return {

    success:
      true,

    cropId:
      crop.id,

    cropName:
      crop.name,

    cost:
      crop.plantingCost,

    plantedSecond:
      plot.plantedSecond,

    harvestSecond:
      plot.harvestSecond,

    message:
      "Planted " +
      crop.name +
      "."

  };

},



};



})(window);