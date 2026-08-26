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

    eggRate:
      config.eggs.secondsPerEggPerHen,


    eggValue:
      config.eggs.startingValue,
      
    nestingUpgradeIndex:
      0,


    eggValueUpgradeIndex:
      0, 

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
  state.eggRate;


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


upgradeProduction:

function(
  state
){

  const upgrade =
    config.productionUpgrades
      .nestingBoxes[
        state.nestingUpgradeIndex
      ];


  if(
    !upgrade
  ){

    return false;

  }


  if(
    state.cash <
    upgrade.cost
  ){

    return false;

  }


  state.cash -=
    upgrade.cost;


  /*
    A 1.5 multiplier means
    the hen produces eggs
    1.5 times faster.

    60 sec / 1.5 =
    40 sec per egg.
  */

  state.eggRate /=
    upgrade.multiplier;


  state.nestingUpgradeIndex +=
    1;


 console.log(
  "PRODUCTION UPGRADE PURCHASED",
  this.formatTime(
    state.elapsedSeconds
  ),
  "cash:",
  state.cash,
  "hens:",
  state.hens,
  "eggRate:",
  state.eggRate
);   


  this.record(
    state,
    "Production Upgrade",
    upgrade.cost
  );


  return true;

},



upgradeEggValue:

function(
  state
){

  const upgrade =
    config.eggValueUpgrades[
      state.eggValueUpgradeIndex
    ];


  if(
    !upgrade
  ){

    return false;

  }


  if(
    state.cash <
    upgrade.cost
  ){

    return false;

  }


  state.cash -=
    upgrade.cost;


  state.eggValue =
    upgrade.eggValue;


  state.eggValueUpgradeIndex +=
    1;


  this.record(
    state,
    "Egg Value Upgrade",
    upgrade.cost
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
    state.eggValue;


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
    Step 1:
    Establish a four-hen flock.
  */

  if(
    state.hens <
    4
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
    Step 2:
    Buy the first production
    upgrade as soon as it
    becomes affordable.
  */

  if(
    state.nestingUpgradeIndex <
    1
  ){

    if(
      this.upgradeProduction(
        state
      )
    ){

      return;

    }

  }



  /*
    Step 3:
    After production has been
    improved, work toward the
    first egg-value upgrade.
  */

  if(
    state.eggValueUpgradeIndex <
    1
  ){

    if(
      this.upgradeEggValue(
        state
      )
    ){

      return;

    }

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
      state.eggValue,


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