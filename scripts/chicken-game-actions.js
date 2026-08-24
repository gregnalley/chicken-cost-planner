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

    };


  }



};



})(window);