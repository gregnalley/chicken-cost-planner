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


    eggsProduced:
      0,


    eggsSold:
      0,


    revenue:
      0,


    storageCapacity:
      config.startingFarm.eggStorageCapacity,


    truckCapacity:
      config.transportation.starterTruckCapacity,


    lastTruckPickup:
      0,


    transactions:
      [],


    milestones:
      [],


    hensLost:
      0

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

  const eggRate =
    config.eggs.secondsPerEggPerHen;


  /*
    Advance real minutes
  */

  state.minute++;


  /*
    Convert to game days

    10 real minutes = 1 game day
  */

  state.gameDay =
    Math.floor(
      state.minute /
      10
    ) + 1;



  /*
    Egg production

    Example:

    3 hens
    60 seconds per egg

    = 3 eggs per minute

  */


  const eggsThisMinute =
    state.hens *
    (60 / eggRate);



  state.eggs +=
    eggsThisMinute;


  state.eggsProduced +=
    eggsThisMinute;



  /*
    Storage limit
  */


  if(
    state.eggs >
    state.storageCapacity
  ){

    state.eggs =
      state.storageCapacity;

  }



  /*
    Truck pickup

    Every cycle seconds

  */


  const truckCycleMinutes =
    config.transportation
      .starterTruckCycleSeconds /
      60;



  if(
    state.minute -
    state.lastTruckPickup
    >=
    truckCycleMinutes
  ){

    this.pickupEggs(
      state
    );


    state.lastTruckPickup =
      state.minute;

  }


},


  pickupEggs:

function(
  state
){

  const amount =
    Math.min(
      state.eggs,
      state.truckCapacity
    );


  if(
    amount <= 0
  ){

    return;

  }


  state.eggs -=
    amount;


  const value =
    config.eggs.startingValue;


  const revenue =
    amount *
    value;


  state.cash +=
    revenue;


  state.eggsSold +=
    amount;


  state.revenue +=
    revenue;


  this.record(
    state,
    "Truck Pickup",
    revenue
  );


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


    console.log(
  "SIMULATION FINAL STATE",
  state
);

   return {

  ...state,


  finalCash:
    state.cash,


  day:
    state.gameDay,


  coopCapacity:
    config.chicken.startingHenCapacity,


  eggValue:
    config.eggs.startingValue,


  totalEggsProduced:
    state.eggsProduced,


  totalEggsSold:
    state.eggsSold,


  totalRevenue:
    state.revenue,


  totalFeedCost:
    0,


  storedEggs:
    state.eggs,


  protection:
    config.predators.startingProtection,


  truckCapacity:
    state.truckCapacity,


  hensLost:
    state.hensLost

};

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