"use strict";


(function(global){


const BCPChickenGame =
  global.BCPChickenGame ||
  {};



const config =
  global.BCPChickenGameEconomyConfig;



if(!config){

  console.error(
    "Chicken Economy Simulator V3: Config missing."
  );

  return;

}



const simulator = {


  createState:

  function(){

    return {

      minute:
        0,


      gameDay:
        1,


      cash:
        config.startingFarm.cash,


      hens:
        config.startingFarm.hens,


      eggs:
        0,


      storageCapacity:
        config.startingFarm.eggStorageCapacity,


      coopCapacity:
        config.chicken.startingHenCapacity,


      truckCapacity:
        config.transportation.starterTruckCapacity,


      totalEggsProduced:
        0,


      totalEggsSold:
        0,


      totalRevenue:
        0,


      transactions:
        [],


      milestones:
        []

    };

  },



  record:

  function(
    state,
    action,
    amount
  ){

    state.transactions.push({

      minute:
        state.minute,


      action:
        action,


      amount:
        amount

    });

  },



  tick:

  function(
    state
  ){

    state.minute++;


    if(
      state.minute %
      14400 === 0
    ){

      state.gameDay++;

    }


  },



  runSimulation:

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

    }


    return state;

  },



  runAll:

  function(){

    return {

      expansion:
        this.runSimulation(30),


      production:
        this.runSimulation(30),


      balanced:
        this.runSimulation(30),


      earlyHenLoss:
        this.runSimulation(30)

    };

  }



};



BCPChickenGame.economySimulatorV3 =
  simulator;



console.log(
  "Chicken Economy Simulator V3 Loaded"
);



})(window);