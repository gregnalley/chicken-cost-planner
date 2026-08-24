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


  }



};



})(window);