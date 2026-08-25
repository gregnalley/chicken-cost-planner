"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame;



BCPChickenGame.economySimulatorV2 = {


    recordTransaction:

function(
  state,
  action,
  amount
){

  state.transactions.push({

    minute:
      state.minute,

    day:
      state.day,

    action:
      action,

    amount:
      amount

  });

},


  buyHen:

function(
  state
){

  const cost =
    BCPChickenGame.config
      .chicken
      .purchaseCost;


  if(
    state.money >= cost &&
    state.chickens < state.coopCapacity
  ){

    state.money -= cost;


    state.chickens += 1;


    this.recordTransaction(
      state,
      "Bought Hen",
      cost
    );


    return true;

  }


  return false;

},


  upgradeCoop:

function(
  state
){

  const config =
    BCPChickenGame.config;


  const currentCapacity =
    state.coopCapacity;


  const upgrade =
    config.coop.upgrades.find(
      function(item){

        return (
          item.capacity >
          currentCapacity
        );

      }
    );


  if(
    !upgrade
  ){

    return false;

  }



  if(
    state.money >= upgrade.cost
  ){

    state.money -=
      upgrade.cost;


    state.coopCapacity =
      upgrade.capacity;



    this.recordTransaction(
      state,
      "Upgraded Coop",
      upgrade.cost
    );


    return true;

  }


  return false;


},

  sellEggs:

function(
  state,
  amount
){

  const config =
    BCPChickenGame.config;


  const eggsToSell =
    Math.min(
      amount,
      state.eggs
    );


  if(
    eggsToSell <= 0
  ){

    return false;

  }


  state.eggs -=
    eggsToSell;


  const income =
    eggsToSell *
    config.eggs.sellValue;


  state.money +=
    income;


  this.recordTransaction(
    state,
    "Sold Eggs",
    income
  );


  return true;

},


  balancedStrategy:

function(
  state
){

    /*
  Sell eggs every hour
*/

if(
  state.eggs >= 25 &&
  (
    state.minute % 10 === 0 ||
    state.eggs >= state.eggCapacity * 0.75
  )
){

  this.sellEggs(
    state,
    25
  );

}

  /*
    Buy chickens while space exists
  */

  if(
    state.chickens <
    state.coopCapacity
  ){

    this.buyHen(
      state
    );

    return;

  }



  /*
    Coop is full.
    Try upgrading.
  */


  if(
    this.upgradeCoop(
      state
    )
  ){

    return;

  }


},

  createState:

  function(){


    const config =
      BCPChickenGame.config;


    return {


      day:
        1,


      minute:
        0,


      money:
        config.startingFarm.money,


      eggs:
        config.startingFarm.eggs,

      eggCapacity:
        config.storage.startingCapacity,


      chickens:
        config.startingFarm.chickens,


      coopCapacity:
        config.coop.startingCapacity,


      eggStorage:
        config.storage.startingCapacity,


      milestones:
        [],

      transactions:
        [] 

    };


  },





  tick:

  function(
    state
  ){


    const config =
      BCPChickenGame.config;



    /*
      Advance time
    */


    state.minute += 1;



    if(
      state.minute >= 1440
    ){

      state.minute = 0;

      state.day += 1;

    }





    /*
      Produce eggs

      1 egg per chicken
      per game minute
    */


    const eggsProduced =
  state.chickens *
  config.chicken.eggsPerMinute;


state.eggs +=
  eggsProduced;



if(
  state.eggs >
  state.eggCapacity
){

  state.eggs =
    state.eggCapacity;

}



    /*
      Prevent storage overflow
    */


    if(
      state.eggs >
      state.eggStorage
    ){

      state.eggs =
        state.eggStorage;

    }

  },



    /*
      Sell eggs automatically
    */


   





  simulate:

  function(
    minutes
  ){


    const state =
      this.createState();



    for(
      let i = 0;
      i < minutes;
      i++
    ){

      this.tick(
        state
      );

      this.balancedStrategy(
        state
      );

    }



    return state;


  }



};



console.log(
  "Chicken Economy Simulator V2 Loaded"
);



})(window);