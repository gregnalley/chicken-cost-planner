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

    elapsedSeconds:
      0,


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


    lastTruckPickupSecond:
      0,


    eggProductionAccumulator:
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
    config.eggs
      .secondsPerEggPerHen;


  /*
    Advance real time.

    One simulator tick =
    one real second.
  */

  state.elapsedSeconds +=
    1;



  /*
    Keep minute available
    for reports and later
    strategy decisions.
  */

  state.minute =
    Math.floor(
      state.elapsedSeconds /
      60
    );



  /*
    Convert real time
    into game days.

    10 real minutes =
    1 game day.
  */

  const secondsPerGameDay =
    config.time
      .realMinutesPerGameDay *
    60;


  state.gameDay =
    Math.floor(
      state.elapsedSeconds /
      secondsPerGameDay
    ) + 1;



  /*
    Egg production.

    Each hen contributes a
    fraction of an egg every
    second.

    Example:

    3 hens
    60 seconds per egg

    3 / 60 =
    0.05 egg progress
    per second.
  */

  state.eggProductionAccumulator +=
    state.hens /
    eggRate;



  /*
    Only create whole eggs.
  */

  const wholeEggsProduced =
    Math.floor(
      state.eggProductionAccumulator
    );


  if(
    wholeEggsProduced > 0
  ){

    state.eggProductionAccumulator -=
      wholeEggsProduced;



    /*
      Respect storage capacity.
    */

    const availableStorage =
      Math.max(
        0,
        state.storageCapacity -
        state.eggs
      );


    const eggsAccepted =
      Math.min(
        wholeEggsProduced,
        availableStorage
      );


    state.eggs +=
      eggsAccepted;


    state.eggsProduced +=
      eggsAccepted;

  }



  /*
    Truck pickup.

    The starter truck really
    arrives every 45 seconds.
  */

  const truckCycleSeconds =
    config.transportation
      .starterTruckCycleSeconds;


  if(
    state.elapsedSeconds -
    state.lastTruckPickupSecond
    >=
    truckCycleSeconds
  ){

    this.pickupEggs(
      state
    );


    state.lastTruckPickupSecond =
      state.elapsedSeconds;

  }


},


buyHen:

function(
  state
){

  const henCost =
    config.chicken
      .purchaseCost;


  /*
    Cannot afford another hen.
  */

  if(
    state.cash <
    henCost
  ){

    return false;

  }


  /*
    Coop is full.
  */

  if(
    state.hens >=
    state.coopCapacity
  ){

    return false;

  }


  state.cash -=
    henCost;


  state.hens +=
    1;


  this.record(
    state,
    "Bought Hen",
    henCost
  );


  return true;

},


runHenBuyingStrategy:

function(
  state
){

  /*
    For this test phase,
    buy a hen whenever:

    1. There is room in the coop.
    2. We have enough cash.

    No coop upgrades yet.
    No storage upgrades yet.
    No truck upgrades yet.
    No land purchase yet.

    This deliberately isolates
    flock growth.
  */


  if(
    state.hens <
      state.coopCapacity &&
    state.cash >=
      config.chicken.purchaseCost
  ){

    this.buyHen(
      state
    );

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



    const totalSeconds =
  minutes *
  60;


for(
  let i = 0;
  i < totalSeconds;
  i++
){

  this.tick(
    state
  );


  this.runHenBuyingStrategy(
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