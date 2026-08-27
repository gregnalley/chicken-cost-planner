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

     dayPhase:
      "day",


    dayPhaseProgress:
      0, 


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

    feedAmount:
      config.feed.startingAmount,


    feedPurchased:
      0,


    feedCost:
      0,

    feedConsumptionMultiplier:
      1,  


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
      0,

    predatorFeedLossTriggered:
      false,


    predatorFeedLost:
      0,

    lastPredatorCheckSecond:
  0,


predatorWarnings:
  0,


predatorFeedLossEvents:
  0,


predatorFeedLost:
  0,
  
landUnlocked:
  false,


landUnlockSecond:
  null,


eastPasture:

{
  unlocked:
    false,

  barnA:
  {
    repaired:
      false,

    use:
      null,

    level:
      0
  },

  barnB:
  {
    repaired:
      false,

    use:
      null,

    level:
      0
  },

  transportDepot:
  {
    repaired:
      false,

    level:
      0
  },

  cropPlot:
  {
    unlocked:
      false,

    level:
      0
  }
},



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



consumeFeed:

function(
  state
){

  const poundsPerHenPerGameDay =
    config.feed
      .poundsPerHenPerGameDay;


  const secondsPerGameDay =
    config.time
      .realMinutesPerGameDay *
    60;


  /*
    Feed consumption per second.

    Example:

    3 hens
    × 0.25 lb per game day
    ÷ 600 seconds

    = 0.00125 lb per second.
  */

  const feedUsedThisSecond =
  (
    state.hens *
    poundsPerHenPerGameDay *
    (
      state.feedConsumptionMultiplier ??
      1
    )
  ) /
  secondsPerGameDay;


  state.feedAmount -=
    feedUsedThisSecond;


  if(
    state.feedAmount <
    0
  ){

    state.feedAmount =
      0;

  }

},



purchaseFeed:

function(
  state
){

  const basicFeed =
    config.feed
      .purchaseOptions
      .find(
        function(
          option
        ){

          return (
            option.id ===
            "basic-feed-bag"
          );

        }
      );


  if(
    !basicFeed
  ){

    return false;

  }


  if(
    state.cash <
    basicFeed.cost
  ){

    return false;

  }


  state.cash -=
    basicFeed.cost;


  state.feedAmount +=
    basicFeed.pounds;


  state.feedPurchased +=
    basicFeed.pounds;


  state.feedCost +=
    basicFeed.cost;


  this.record(
    state,
    "Bought Feed",
    basicFeed.cost
  );


  return true;

},



manageFeed:

function(
  state
){

  /*
    Keep a basic reserve.

    For now, the simulator
    buys one 50-lb bag
    whenever feed falls
    below 25 lb.
  */

  const reserveThreshold =
    25;


  if(
    state.feedAmount >
    reserveThreshold
  ){

    return;

  }


  this.purchaseFeed(
    state
  );

},



processEarlyPredatorEvent:

function(
  state
){

  const predatorConfig =
    config.feed
      .predatorFeedLoss;


  if(
    !predatorConfig ||
    predatorConfig.enabled !== true
  ){

    return;

  }


  /*
    Only trigger once.
  */

  if(
    state.predatorFeedLossTriggered
  ){

    return;

  }


  /*
    First-pass timing:

    Trigger halfway through
    the 30-minute test.

    Later this can become
    randomized within a safe
    early-game window.
  */

  const triggerSecond =
    15 *
    60;


  if(
    state.elapsedSeconds <
    triggerSecond
  ){

    return;

  }


  const feedLost =
    Math.min(
      predatorConfig.poundsLost,
      state.feedAmount
    );


  state.feedAmount -=
    feedLost;


  state.predatorFeedLost +=
    feedLost;


  state.predatorFeedLossTriggered =
    true;


  this.record(
    state,
    "Predator Scattered Feed",
    feedLost
  );

},


getPredatorRisk:

function(
  state
){

  const predatorConfig =
    config.feed
      .predatorFeedLoss;


  if(
    !predatorConfig ||
    predatorConfig.enabled !== true
  ){

    return 0;

  }


  const riskByPhase =
    predatorConfig.riskByPhase ||
    {};


  return (
    Number(
      riskByPhase[
        state.dayPhase
      ]
    ) ||
    0
  );

},


processPredatorCheck:

function(
  state
){

  const predatorConfig =
    config.feed
      .predatorFeedLoss;


  if(
    !predatorConfig ||
    predatorConfig.enabled !== true
  ){

    return;

  }


  const checkIntervalSeconds =
    predatorConfig
      .checkIntervalSeconds;


  if(
    state.elapsedSeconds -
    state.lastPredatorCheckSecond
    <
    checkIntervalSeconds
  ){

    return;

  }


  state.lastPredatorCheckSecond =
    state.elapsedSeconds;


  const risk =
    this.getPredatorRisk(
      state
    );


  /*
    No encounter this check.
  */

  if(
    Math.random() >= risk
  ){

    return;

  }


  /*
    An encounter occurred.

    Early-game severity model:

    70% warning only
    30% minor feed loss

    No hen loss.
  */

  /*
  Game Day 1 is the predator
  introduction period.

  Predator encounters may
  happen, but they can only
  generate warnings.

  This teaches the player that
  predator pressure exists
  before actual losses begin.
*/

if(
  state.gameDay <=
  1
){

  state.predatorWarnings +=
    1;


  this.record(
    state,
    "Predator Warning",
    0
  );


  return;

}



/*
  Beginning on Game Day 2,
  encounters can become minor
  loss events.

  Most encounters still remain
  warnings.
*/

const severityRoll =
  Math.random();


if(
  severityRoll <
  0.70
){

  state.predatorWarnings +=
    1;


  this.record(
    state,
    "Predator Warning",
    0
  );


  return;

}


  const feedLost =
    Math.min(
      predatorConfig.poundsLost,
      state.feedAmount
    );


  state.feedAmount -=
    feedLost;


  state.predatorFeedLost +=
    feedLost;


  state.predatorFeedLossEvents +=
    1;


  this.record(
    state,
    "Predator Feed Loss",
    feedLost
  );

},



updateDayNightCycle:

function(
  state
){

  const secondsPerGameDay =
    config.time
      .realMinutesPerGameDay *
    60;


  /*
    Position within the current
    10-minute game day.

    0.00 = start of day
    1.00 = end of day
  */

  const secondsIntoDay =
    state.elapsedSeconds %
    secondsPerGameDay;


  const progress =
    secondsIntoDay /
    secondsPerGameDay;


  state.dayPhaseProgress =
    progress;



  /*
    First-pass day/night cycle.

    60% daylight
    10% dusk
    20% night
    10% dawn

    With a 10-minute game day:

    Day:
      0:00 - 6:00

    Dusk:
      6:00 - 7:00

    Night:
      7:00 - 9:00

    Dawn:
      9:00 - 10:00
  */


  if(
    progress <
    0.60
  ){

    state.dayPhase =
      "day";

  }

  else if(
    progress <
    0.70
  ){

    state.dayPhase =
      "dusk";

  }

  else if(
    progress <
    0.90
  ){

    state.dayPhase =
      "night";

  }

  else
  {

    state.dayPhase =
      "dawn";

  }

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



    this.updateDayNightCycle(
      state
    );

    /*
  Feed consumption
*/

this.consumeFeed(
  state
);



  /*
    Egg production.

  /*
  Egg production requires feed.

  If feed reaches zero,
  hens stop producing eggs
  until feed is available again.

  No hen loss.
  No permanent penalty.
*/

if(
  state.feedAmount >
  0
){

  state.eggProductionAccumulator +=
    state.hens /
    eggRate;



  const wholeEggsProduced =
    Math.floor(
      state.eggProductionAccumulator
    );


  if(
    wholeEggsProduced >
    0
  ){

    state.eggProductionAccumulator -=
      wholeEggsProduced;


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




runEastPastureGrowthStrategy:

function(
  state
){

  /*
    ==================================================
    EAST PASTURE — CONTINUED GROWTH TEST
    ==================================================

    Phase 1:
    Follow the validated aggressive
    Expansion path until East Pasture
    is purchased.

    Phase 2:
    Continue investing in the original
    farm before developing the new barns.

    Test sequence:

    1. Upgrade coop from 25 to 50.
    2. Buy Production Level 3.
    3. Upgrade truck from 250 to 500.
    4. Grow flock to 40 hens.
    5. Repair Barn A.
    6. Convert Barn A to Farm Store.
    7. Stop spending.

    This is a stress test, not a claim
    that this is the "correct" way to play.
  */


  /*
    PHASE 1

    Reach East Pasture using the
    validated Expansion strategy.
  */

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    this.runExpansionStrategy(
      state
    );

    return;

  }



  /*
    PHASE 2 — STEP 1

    Upgrade the original coop
    from 25 to the next available
    capacity level.
  */

  if(
    state.coopCapacity <
    50
  ){

    this.upgradeCoop(
      state
    );

    return;

  }



  /*
    STEP 2

    Purchase Production Level 3.

    Levels 1 and 2 were already
    purchased before East Pasture.
  */

  if(
    state.nestingUpgradeIndex <
    3
  ){

    this.upgradeProduction(
      state
    );

    return;

  }



  /*
    STEP 3

    Upgrade transportation from
    the 250-capacity truck to the
    next available truck.
  */

  if(
    state.truckCapacity <
    500
  ){

    this.upgradeTruck(
      state
    );

    return;

  }



  /*
    STEP 4

    Grow the original flock to
    40 hens.

    We stop short of the full
    50-hen coop capacity for this
    first Phase 2 stress test.
  */

  if(
    state.hens <
    40
  ){

    this.buyHen(
      state
    );

    return;

  }



  /*
    STEP 5

    Repair East Pasture Barn A.
  */

  if(
    state.eastPasture
      .barnA
      .repaired !== true
  ){

    this.repairEastPastureBarnA(
      state
    );

    return;

  }



  /*
    STEP 6

    Convert Barn A into a
    Level 1 Farm Store.
  */

  if(
    state.eastPasture
      .barnA
      .use === null
  ){

    this.convertBarnAToFarmStore(
      state
    );

    return;

  }



  /*
    Stop spending here.

    We want to measure what this
    upgraded Phase 2 farm produces
    at 40, 50 and 60 minutes.
  */

},




unlockEastPastureCropPlot:

function(
  state
){

  /*
    East Pasture must already
    be owned.
  */

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    return false;

  }


  /*
    Plot can only be unlocked
    once at this stage.
  */

  if(
    state.eastPasture
      .cropPlot
      .unlocked === true
  ){

    return false;

  }


  /*
    First-pass Phase 2
    test price.

    Not final.
  */

  const unlockCost =
    2500;


  if(
    state.cash <
    unlockCost
  ){

    return false;

  }


  state.cash -=
    unlockCost;


  state.eastPasture
    .cropPlot
    .unlocked =
      true;


  state.eastPasture
    .cropPlot
    .level =
      1;


  /*
    TEMPORARY CROP EFFECT

    Level 1 crop production
    supplies approximately
    20% of the flock's feed
    requirement.

    Commercial feed consumption
    therefore becomes 80% of
    normal.

    Later this will be replaced
    by actual planting, growth,
    harvest and supplementation.
  */

  state.feedConsumptionMultiplier =
    0.80;


  this.record(
    state,
    "Unlocked East Pasture Crop Plot",
    unlockCost
  );


  return true;

},



repairEastPastureBarnA:

function(
  state
){

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    return false;

  }


  if(
    state.eastPasture
      .barnA
      .repaired
  ){

    return false;

  }


  /*
    First-pass Phase 2
    test price.

    Not final.
  */

  const repairCost =
    5000;


  if(
    state.cash <
    repairCost
  ){

    return false;

  }


  state.cash -=
    repairCost;


  state.eastPasture
    .barnA
    .repaired =
      true;


  this.record(
    state,
    "Repaired East Pasture Barn A",
    repairCost
  );


  return true;

},



convertBarnAToFarmStore:

function(
  state
){

  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    return false;

  }


  if(
    state.eastPasture
      .barnA
      .repaired !== true
  ){

    return false;

  }


  if(
    state.eastPasture
      .barnA
      .use !== null
  ){

    return false;

  }


  /*
    First-pass conversion price.
  */

  const conversionCost =
    3000;


  if(
    state.cash <
    conversionCost
  ){

    return false;

  }


  state.cash -=
    conversionCost;


  state.eastPasture
    .barnA
    .use =
      "farm-store";


  state.eastPasture
    .barnA
    .level =
      1;


  /*
    First-pass Farm Store effect:

    Increase current egg value
    by 25%.

    We can later replace this
    with a separate direct-sale
    system rather than simply
    multiplying all eggs.
  */

  state.eggValue *=
    1.25;


  this.record(
    state,
    "Converted Barn A to Farm Store",
    conversionCost
  );


  return true;

},



unlockEastPastureCropPlot:

function(
  state
){

  /*
    ==================================================
    EAST PASTURE — CROP PLOT UNLOCK
    ==================================================

    First-pass Phase 2 economy test.

    The player must already own
    East Pasture before the crop
    plot can be cleared and prepared.
  */


  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    return false;

  }


  /*
    The first crop plot can only
    be unlocked once.
  */

  if(
    state.eastPasture
      .cropPlot
      .unlocked === true
  ){

    return false;

  }


  /*
    Temporary test price.

    This gives the player a smaller
    East Pasture project before the
    more expensive barn projects.
  */

  const unlockCost =
    2500;


  if(
    state.cash <
    unlockCost
  ){

    return false;

  }


  state.cash -=
    unlockCost;


  state.eastPasture
    .cropPlot
    .unlocked =
      true;


  state.eastPasture
    .cropPlot
    .level =
      1;


  /*
    TEMPORARY CROP BENEFIT

    For this economy test only,
    the Level 1 crop plot supplies
    approximately 20% of the flock's
    feed requirements.

    The future game will replace
    this with actual crops, planting,
    growth, harvesting and feed
    supplementation.
  */

  state.feedConsumptionMultiplier =
    0.80;


  this.record(
    state,
    "Unlocked East Pasture Crop Plot",
    unlockCost
  );


  return true;

},



purchaseFirstExpansion:

function(
  state
){

  /*
    East Pasture can only
    be purchased once.
  */

  if(
    state.landUnlocked
  ){

    return false;

  }


  const expansion =
    config.land
      .firstExpansion;


  if(
    !expansion
  ){

    return false;

  }


  if(
    state.cash <
    expansion.cost
  ){

    return false;

  }


  state.cash -=
    expansion.cost;


  state.landUnlocked =
    true;

  state.eastPasture.unlocked =
    true;


  state.landUnlockSecond =
    state.elapsedSeconds;


  /*
    The HTML test page already
    looks for milestones that
    begin with:

    LAND UNLOCKED:
  */

  state.milestones.push({

    second:
      state.elapsedSeconds,


    time:
      this.formatTime(
        state.elapsedSeconds
      ),


    label:
      "LAND UNLOCKED: " +
      expansion.name,


    cash:
      Number(
        state.cash.toFixed(2)
      ),


    hens:
      state.hens

  });


  this.record(
    state,
    "Purchased Land",
    expansion.cost
  );


  return true;

},


runEastPastureStrategy:

function(
  state
){

  /*
    First-pass Phase 2
    aggressive strategy.

    The starter Expansion strategy
    gets us to East Pasture.

    Once land is purchased:

    1. Save $5,000 and repair Barn A.
    2. Save $3,000 and convert it
       to a Level 1 Farm Store.
    3. Stop spending for now.

    This lets us measure what
    one Phase-2 income investment
    does to the 40/50/60 minute
    economy.
  */


  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    this.runExpansionStrategy(
      state
    );

    return;

  }


  if(
    state.eastPasture
      .barnA
      .repaired !== true
  ){

    this.repairEastPastureBarnA(
      state
    );

    return;

  }


  if(
    state.eastPasture
      .barnA
      .use === null
  ){

    this.convertBarnAToFarmStore(
      state
    );

    return;

  }


  /*
    Stop here for this test.

    Do not add more Phase-2
    purchases yet.
  */

},



runEastPastureCropStrategy:

function(
  state
){

  /*
    ==================================================
    EAST PASTURE — CROP-FIRST TEST STRATEGY
    ==================================================

    Phase 1:
    Follow the validated aggressive
    Expansion path until East Pasture
    is purchased.

    Phase 2:
    Unlock the first crop plot before
    investing in barns or the depot.

    After that, stop spending so we can
    isolate the economic effect of the
    crop plot.
  */


  if(
    !state.eastPasture ||
    state.eastPasture.unlocked !== true
  ){

    this.runExpansionStrategy(
      state
    );

    return;

  }


  if(
    state.eastPasture
      .cropPlot
      .unlocked !== true
  ){

    this.unlockEastPastureCropPlot(
      state
    );

    return;

  }


  /*
    Stop spending after the crop
    plot unlock for this test.
  */

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


    case "eastPasture":

      this.runEastPastureStrategy(
        state
      );

      break;  


     case "eastPastureCrop":

       this.runEastPastureCropStrategy(
         state
      );

      break; 


     case "eastPastureGrowth":

       this.runEastPastureGrowthStrategy(
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
    ==================================================
    EXPANSION FOCUS — PHASE 2
    ==================================================

    Early objective:

    1. Fill the starter coop.
    2. Buy the first coop expansion.
    3. Stop spending.
    4. Save aggressively for East Pasture.

    This gives us a clean test of
    whether the current economy can
    approach the $3,000 land target
    by the end of Game Day 3.
  */



  /*
    If East Pasture is already
    unlocked, this phase is done.
  */

  if(
    state.landUnlocked
  ){

    return;

  }



  /*
    STEP 1

    Fill the starter coop
    to 10 hens.
  */

  if(
    state.coopCapacity <=
      config.chicken.startingHenCapacity &&
    state.hens <
      config.chicken.startingHenCapacity
  ){

    this.buyHen(
      state
    );

    return;

  }



  /*
    STEP 2

    Once the starter coop is full,
    buy the first coop expansion.
  */

  if(
    state.coopCapacity <=
      config.chicken.startingHenCapacity
  ){

    this.upgradeCoop(
      state
    );

    return;

  }



/*
  STEP 3

  The first coop expansion
  is complete.

  Buy the first production
  upgrade now so the stronger
  production rate helps finance
  the expanded flock.
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


  /*
    Cannot afford it yet.

    Save until the production
    upgrade can be purchased.
  */

  return;

}


/*
  STEP 4

  Increase egg value before
  expanding the flock farther.

  This lets the stronger egg
  price help finance the
  remaining hens and later
  infrastructure.
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


  /*
    Save until the first
    egg-value upgrade is
    affordable.
  */

  return;

}



/*
  STEP 5

  Continue flock growth to
  15 hens.

  At this point the starter
  truck is beginning to become
  a meaningful bottleneck.
*/

if(
  state.hens <
  15
){

  if(
    this.buyHen(
      state
    )
  ){

    return;

  }


  return;

}



/*
  STEP 6

  Upgrade transportation before
  continuing the final push
  toward 20 hens.

  This should reduce the long
  starter-truck bottleneck we
  observed between roughly
  14 and 19 minutes.
*/

if(
  state.truckCapacity <=
  config.transportation
    .starterTruckCapacity
){

  if(
    this.upgradeTruck(
      state
    )
  ){

    return;

  }


  /*
    Save until the truck
    upgrade is affordable.
  */

  return;

}



/*
  STEP 7

  With improved transportation,
  continue expanding the flock
  to 20 hens.
*/

if(
  state.hens <
  20
){

  if(
    this.buyHen(
      state
    )
  ){

    return;

  }


  return;

}



/*
  STEP 8

  With 20 hens and the upgraded
  truck in place, purchase the
  second production upgrade.
*/

if(
  state.nestingUpgradeIndex <
  2
){

  if(
    this.upgradeProduction(
      state
    )
  ){

    return;

  }


  /*
    Save until Production
    Level 2 is affordable.
  */

  return;

}



/*
  STEP 9

  Early expansion infrastructure
  is complete.

  Save aggressively for
  East Pasture.
*/

this.purchaseFirstExpansion(
  state
);


},




runProductionStrategy:

function(
  state
){

  /*
    ==================================================
    PRODUCTION FOCUS — PHASE 2
    ==================================================

    Philosophy:

    This player prefers making
    each hen more productive
    before aggressively growing
    the flock.

    Progression:

    4 hens
      ↓
    Production Upgrade 1
      ↓
    Egg Value Upgrade 1
      ↓
    5 hens
      ↓
    Production Upgrade 2
      ↓
    Egg Value Upgrade 2
      ↓
    6 hens
      ↓
    Production Upgrade 3
      ↓
    Egg Value Upgrade 3

    Later we will add truck,
    storage, feed, automation,
    and land decisions.
  */



  /*
    STEP 1

    Establish a small
    four-hen flock.
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
    STEP 2

    First production upgrade.
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

    /*
      If we cannot afford it yet,
      save for it rather than
      buying something else.
    */

    return;

  }



  /*
    STEP 3

    First egg-value upgrade.
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

    return;

  }



  /*
    STEP 4

    Add one more hen after
    establishing the first
    production/value upgrades.
  */

  if(
    state.hens <
    5
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 5

    Second production upgrade.
  */

  if(
    state.nestingUpgradeIndex <
    2
  ){

    if(
      this.upgradeProduction(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 6

    Second egg-value upgrade.
  */

  if(
    state.eggValueUpgradeIndex <
    2
  ){

    if(
      this.upgradeEggValue(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 7

    Add a sixth hen.
  */

  if(
    state.hens <
    6
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 8

    Third production upgrade.
  */

  if(
    state.nestingUpgradeIndex <
    3
  ){

    if(
      this.upgradeProduction(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 9

    Third egg-value upgrade.
  */

  if(
    state.eggValueUpgradeIndex <
    3
  ){

    if(
      this.upgradeEggValue(
        state
      )
    ){

      return;

    }

    return;

  }


},


runBalancedStrategy:

function(
  state
){

  /*
    ==================================================
    BALANCED PLAYER — PHASE 2
    ==================================================

    Philosophy:

    Grow the flock steadily,
    but invest in production
    and egg value along the way.

    Progression:

    4 hens
      ↓
    Production Upgrade 1
      ↓
    5 hens
      ↓
    Egg Value Upgrade 1
      ↓
    6 hens
      ↓
    Production Upgrade 2
      ↓
    7 hens

    Later this strategy will
    also mix in storage,
    transportation,
    feed,
    protection,
    and land.
  */



  /*
    STEP 1

    Reach four hens.
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

    return;

  }



  /*
    STEP 2

    First production upgrade.
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

    return;

  }



  /*
    STEP 3

    Reach five hens.
  */

  if(
    state.hens <
    5
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 4

    First egg-value upgrade.
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

    return;

  }



  /*
    STEP 5

    Reach six hens.
  */

  if(
    state.hens <
    6
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 6

    Second production upgrade.
  */

  if(
    state.nestingUpgradeIndex <
    2
  ){

    if(
      this.upgradeProduction(
        state
      )
    ){

      return;

    }

    return;

  }



  /*
    STEP 7

    Reach seven hens.
  */

  if(
    state.hens <
    7
  ){

    if(
      this.buyHen(
        state
      )
    ){

      return;

    }

    return;

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


    this.processPredatorCheck(
      state
    );


    this.manageFeed(
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
      state.feedCost,

    feedAmount:
      state.feedAmount,


    feedPurchased:
      state.feedPurchased, 
 

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




})(window);