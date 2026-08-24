"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.shopActions = {



purchaseHen:

function(state){


  const item =
    BCPChickenGame.shop
      .items
      .hen;



  if(
    state.money < item.cost
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
    item.cost;



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
      "Hen purchased."

  };


}



};



})(window);