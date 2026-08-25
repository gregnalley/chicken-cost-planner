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





    /*
      Sell eggs automatically
    */


    const income =
      state.eggs *
      config.eggs.sellValue;



    state.money +=
      income;



    state.eggs =
      0;



  },





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

      if(
  state.minute === 10
){

  this.recordTransaction(
    state,
    "Test Event",
    25
  );

}

    }



    return state;


  }



};



console.log(
  "Chicken Economy Simulator V2 Loaded"
);



})(window);