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

    coopCapacity:
      config.chicken.startingHenCapacity,  


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


formatTime:

function(
  seconds
){

  const minutes =
    Math.floor(
      seconds /
      60
    );


  const remainingSeconds =
    Math.floor(
      seconds %
      60
    );


  return (
    String(minutes)
      .padStart(
        2,
        "0"
      ) +
    ":" +
    String(remainingSeconds)
      .padStart(
        2,
        "0"
      )
  );

},



  record:

function(
  state,
  action,
  amount
){

  state.transactions.push({

    elapsedSeconds:
      state.elapsedSeconds,


    minute:
      state.minute,


    time:
      this.formatTime(
        state.elapsedSeconds
      ),


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


upgradeCoop:

function(
  state
){

  const upgrades =
    config.coop
      .upgrades;


  const nextUpgrade =
    upgrades.find(
      function(
        upgrade
      ){

        return (
          upgrade.capacity >
          state.coopCapacity
        );

      }
    );


  if(
    !nextUpgrade
  ){

    return false;

  }


  if(
    state.cash <
    nextUpgrade.cost
  ){

    return false;

  }


  state.cash -=
    nextUpgrade.cost;


  state.coopCapacity =
    nextUpgrade.capacity;


  this.record(
    state,
    "Upgraded Coop",
    nextUpgrade.cost
  );


  return true;

},


upgradeStorage:

function(
  state
){

  const nextUpgrade =
    config.storage.upgrades.find(
      function(
        upgrade
      ){

        return (
          upgrade.capacity >
          state.storageCapacity
        );

      }
    );


  if(
    !nextUpgrade
  ){

    return false;

  }


  if(
    state.cash <
    nextUpgrade.cost
  ){

    return false;

  }


  state.cash -=
    nextUpgrade.cost;


  state.storageCapacity =
    nextUpgrade.capacity;


  this.record(
    state,
    "Upgraded Storage",
    nextUpgrade.cost
  );


  return true;

},


upgradeTruck:

function(
  state
){

  const nextUpgrade =
    config.transportation
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

    return false;

  }


  if(
    state.cash <
    nextUpgrade.cost
  ){

    return false;

  }


  state.cash -=
    nextUpgrade.cost;


  state.truckCapacity =
    nextUpgrade.capacity;


  this.record(
    state,
    "Upgraded Truck",
    nextUpgrade.cost
  );


  return true;

},


runHenBuyingStrategy:

function(
  state
){

  /*
    If there is room in the coop,
    keep buying hens whenever
    enough cash is available.
  */

  if(
    state.hens <
    state.coopCapacity
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

  }


  /*
    If the coop is full,
    stop buying hens and
    save until the next
    coop upgrade is affordable.
  */

  if(
    state.hens >=
    state.coopCapacity
  ){

    if(
      this.upgradeCoop(
        state
      )
    ){

      return;

    }

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


runStrategy:

function(
  state,
  strategy
){

  switch(
    strategy
  ){

    case "expansion":

      this.runExpansionStrategy(
        state
      );

      break;


    case "production":

      this.runProductionStrategy(
        state
      );

      break;


    case "balanced":

      this.runBalancedStrategy(
        state
      );

      break;


    case "earlyHenLoss":

      this.runBalancedStrategy(
        state
      );

      break;


    default:

      this.runBalancedStrategy(
        state
      );

      break;

  }

},


runExpansionStrategy:

function(
  state
){

  /*
    Expansion player:

    Grow flock aggressively
    until the starter coop
    becomes the bottleneck.

    Coop upgrading already
    exists and will happen
    when capacity is reached.
  */

  this.runHenBuyingStrategy(
    state
  );

},


runProductionStrategy:

function(
  state
){

  /*
    Production Focus

    Build a modest flock first,
    then preserve cash for
    production infrastructure.

    Later we will add true
    egg-production and egg-value
    upgrades here.
  */


  if(
    state.hens <
    4
  ){

    this.buyHen(
      state
    );

    return;

  }


  /*
    Upgrade storage once
    affordable.
  */

  if(
    this.upgradeStorage(
      state
    )
  ){

    return;

  }


  /*
    Then upgrade transportation
    once affordable.
  */

  if(
    this.upgradeTruck(
      state
    )
  ){

    return;

  }

},


runBalancedStrategy:

function(
  state
){

  /*
    Balanced player:

    Moderate flock growth.

    For this first strategy
    test, stop at 7 hens.

    Later this strategy will
    mix coop, truck, storage,
    protection, and land.
  */

  if(
    state.hens <
    7
  ){

    this.buyHen(
      state
    );

  }

},



  runSimulation:

function(
  minutes,
  strategy
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


    this.runStrategy(
      state,
      strategy
    );

  }


  return {

    ...state,


    finalCash:
      state.cash,


    day:
      state.gameDay,


    coopCapacity:
      state.coopCapacity,


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
      this.runSimulation(
        30,
        "expansion"
      ),


    production:
      this.runSimulation(
        30,
        "production"
      ),


    balanced:
      this.runSimulation(
        30,
        "balanced"
      ),


    earlyHenLoss:
      this.runSimulation(
        30,
        "earlyHenLoss"
      )

  };

}



};



BCPChickenGame.economySimulatorV3 =
  simulator;



console.log(
  "Chicken Economy Simulator V3 Loaded"
);



})(window);