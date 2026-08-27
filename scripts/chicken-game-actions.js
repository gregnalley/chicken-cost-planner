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


  }


};



})(window);