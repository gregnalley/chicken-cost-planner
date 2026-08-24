"use strict";

/*
  ==================================================
  Chicken Farm Empire
  Economy Simulator

  Version:
  0.1.0

  Purpose:
  Test game-balance values without running the
  graphical game.

  Reads:
  window.BCPChickenGameConfig

  Simulates:
  - Egg production
  - Egg storage
  - Egg sales
  - Feed expenses
  - Hen purchases
  - Coop upgrades
  - Production upgrades
  - Egg-value upgrades
  - Transportation upgrades
  - Predator protection
  - Land expansion
  - Optional early hen loss

  This file is DEVELOPMENT ONLY.
  ==================================================
*/


(function initializeChickenGameEconomySimulator(
  global
) {

  const config =
    global.BCPChickenGameConfig;

  if (!config) {

    console.error(
      "Chicken Game Simulator: " +
      "BCPChickenGameConfig was not found."
    );

    return;

  }


  /*
    ==================================================
    Helpers
    ==================================================
  */


  function formatTime(
    seconds
  ) {

    const minutes =
      Math.floor(
        seconds / 60
      );

    const remainingSeconds =
      Math.floor(
        seconds % 60
      );

    return (
      String(minutes)
        .padStart(2, "0") +
      ":" +
      String(remainingSeconds)
        .padStart(2, "0")
    );

  }


  function calculateHenCost(
    state
  ) {

    const startingHens =
      config.startingFarm.hens;

    const exponent =
      Math.max(
        0,
        state.hens -
        startingHens
      );

    return (
      config.hens.baseCost *
      Math.pow(
        config.hens.costGrowthMultiplier,
        exponent
      )
    );

  }


  function calculateEggsPerSecond(
    state
  ) {

    const baseRatePerHen =
      1 /
      config.eggs.secondsPerEggPerHen;

    return (
      state.hens *
      baseRatePerHen *
      state.productionMultiplier
    );

  }


  function calculateFeedCostPerSecond(
    state
  ) {

    if (
      state.hens <
      config.feed.introduceAtHenCount
    ) {

      return 0;

    }

    const costPerMinute =
      state.hens *
      config.feed.costPerHenPerMinute *
      state.feedCostMultiplier;

    return (
      costPerMinute / 60
    );

  }


  function recordMilestone(
    state,
    label
  ) {

    state.milestones.push({

      second:
        state.elapsedSeconds,

      time:
        formatTime(
          state.elapsedSeconds
        ),

      label:
        label,

      cash:
        Number(
          state.cash.toFixed(2)
        ),

      hens:
        state.hens

    });

  }


  /*
    ==================================================
    Initial State
    ==================================================
  */


  function createInitialState(
    strategyName
  ) {

    return {

      strategy:
        strategyName,

      elapsedSeconds:
        0,

      cash:
        config.startingFarm.cash,

      hens:
        config.startingFarm.hens,

      coopCapacity:
        config.startingFarm.coopCapacity,

      storedEggs:
        0,

      storageCapacity:
        config.startingFarm
          .eggStorageCapacity,

      eggValue:
        config.eggs.startingValue,

      productionMultiplier:
        config.eggs
          .startingProductionMultiplier,

      feedCostMultiplier:
        1,

      truckCapacity:
        config.transportation
          .starterTruckCapacity,

      truckCycleSeconds:
        config.transportation
          .starterTruckCycleSeconds,

      truckTimer:
        0,

      automaticDriver:
        false,

      manualSellingEnabled:
        true,

      coopExpansionIndex:
        0,

      nestingUpgradeIndex:
        0,

      eggValueUpgradeIndex:
        0,

      storageUpgradeIndex:
        0,

      transportationUpgradeIndex:
        0,

      feedUpgradeIndex:
        0,

      protection:
        config.predators
          .startingProtection,

      predatorUpgradeLatch:
        false,

      predatorUpgradeHardwareCloth:
        false,

      firstLossUsed:
        false,

      hensLost:
        0,

      firstReplacementDiscountUsed:
        false,

      landUnlocked:
        false,

      totalEggsProduced:
        0,

      totalEggsSold:
        0,

      totalRevenue:
        0,

      totalFeedCost:
        0,

      milestones: []

    };

  }


  /*
    ==================================================
    Production Tick
    ==================================================
  */


  function runProductionTick(
    state,
    deltaSeconds
  ) {

    const eggsProduced =
      calculateEggsPerSecond(
        state
      ) *
      deltaSeconds;

    const availableStorage =
      Math.max(
        0,
        state.storageCapacity -
        state.storedEggs
      );

    const eggsAccepted =
      Math.min(
        eggsProduced,
        availableStorage
      );

    state.storedEggs +=
      eggsAccepted;

    state.totalEggsProduced +=
      eggsAccepted;


    const feedExpense =
      calculateFeedCostPerSecond(
        state
      ) *
      deltaSeconds;

    state.cash -=
      feedExpense;

    state.totalFeedCost +=
      feedExpense;

    if (
      state.cash < 0
    ) {

      state.cash =
        0;

    }

  }


  /*
    ==================================================
    Egg Selling
    ==================================================
  */


  function sellEggs(
    state
  ) {

    if (
      state.storedEggs <= 0
    ) {

      return;

    }

    const eggsSold =
      Math.min(
        state.storedEggs,
        state.truckCapacity
      );

    const revenue =
      eggsSold *
      state.eggValue;

    state.storedEggs -=
      eggsSold;

    state.cash +=
      revenue;

    state.totalEggsSold +=
      eggsSold;

    state.totalRevenue +=
      revenue;

  }


  function processTransportation(
    state,
    deltaSeconds
  ) {

    state.truckTimer +=
      deltaSeconds;

    if (
      state.truckTimer <
      state.truckCycleSeconds
    ) {

      return;

    }

    state.truckTimer =
      0;

    /*
      During simulation we assume the player manually
      sells when needed until automation is purchased.

      Once the driver is hired, selling happens
      automatically every transport cycle.
    */

    if (
      state.automaticDriver ||
      state.manualSellingEnabled
    ) {

      sellEggs(
        state
      );

    }

  }


  /*
    ==================================================
    Purchase Helpers
    ==================================================
  */


  function canAfford(
    state,
    cost
  ) {

    return (
      state.cash >=
      cost
    );

  }


  function spend(
    state,
    cost
  ) {

    state.cash -=
      cost;

  }


  function buyHen(
    state
  ) {

    if (
      state.hens >=
      state.coopCapacity
    ) {

      return false;

    }

    const cost =
      calculateHenCost(
        state
      );

    if (
      !canAfford(
        state,
        cost
      )
    ) {

      return false;

    }

    spend(
      state,
      cost
    );

    state.hens +=
      1;

    recordMilestone(
      state,
      "Purchased Hen #" +
      state.hens
    );

    return true;

  }


  function buyCoopExpansion(
    state
  ) {

    const upgrade =
      config.coop.expansions[
        state.coopExpansionIndex
      ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.coopCapacity =
      upgrade.capacity;

    state.coopExpansionIndex +=
      1;

    recordMilestone(
      state,
      "Coop Capacity → " +
      upgrade.capacity
    );

    return true;

  }


  function buyNestingUpgrade(
    state
  ) {

    const upgrade =
      config.productionUpgrades
        .nestingBoxes[
          state.nestingUpgradeIndex
        ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.productionMultiplier *=
      upgrade.multiplier;

    state.nestingUpgradeIndex +=
      1;

    recordMilestone(
      state,
      "Nesting Upgrade " +
      state.nestingUpgradeIndex
    );

    return true;

  }


  function buyEggValueUpgrade(
    state
  ) {

    const upgrade =
      config.eggValueUpgrades[
        state.eggValueUpgradeIndex
      ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.eggValue =
      upgrade.eggValue;

    state.eggValueUpgradeIndex +=
      1;

    recordMilestone(
      state,
      "Egg Value → $" +
      upgrade.eggValue.toFixed(2)
    );

    return true;

  }


  function hireDriver(
    state
  ) {

    if (
      state.automaticDriver
    ) {

      return false;

    }

    const cost =
      config.transportation
        .automaticDriverCost;

    if (
      !canAfford(
        state,
        cost
      )
    ) {

      return false;

    }

    spend(
      state,
      cost
    );

    state.automaticDriver =
      true;

    recordMilestone(
      state,
      "Automatic Driver Hired"
    );

    return true;

  }


  function buyStorageUpgrade(
    state
  ) {

    const upgrade =
      config.storage.upgrades[
        state.storageUpgradeIndex
      ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.storageCapacity =
      upgrade.capacity;

    state.storageUpgradeIndex +=
      1;

    recordMilestone(
      state,
      "Egg Storage → " +
      upgrade.capacity
    );

    return true;

  }


  function buyTransportationUpgrade(
    state
  ) {

    const upgrade =
      config.transportationUpgrades[
        state.transportationUpgradeIndex
      ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.truckCapacity =
      upgrade.capacity;

    state.truckCycleSeconds =
      upgrade.cycleSeconds;

    state.transportationUpgradeIndex +=
      1;

    recordMilestone(
      state,
      "Truck Capacity → " +
      upgrade.capacity
    );

    return true;

  }


  function buyFeedUpgrade(
    state
  ) {

    const upgrade =
      config.feed
        .efficiencyUpgrades[
          state.feedUpgradeIndex
        ];

    if (!upgrade) {

      return false;

    }

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.feedCostMultiplier *=
      upgrade.costMultiplier;

    state.feedUpgradeIndex +=
      1;

    recordMilestone(
      state,
      "Feed Efficiency Upgrade"
    );

    return true;

  }


  function buyBetterLatch(
    state
  ) {

    if (
      state.predatorUpgradeLatch
    ) {

      return false;

    }

    const upgrade =
      config.predators
        .protectionUpgrades
        .betterLatch;

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.protection +=
      upgrade.protectionBonus;

    state.predatorUpgradeLatch =
      true;

    recordMilestone(
      state,
      "Better Coop Latch"
    );

    return true;

  }


  function buyHardwareCloth(
    state
  ) {

    if (
      state.predatorUpgradeHardwareCloth
    ) {

      return false;

    }

    const upgrade =
      config.predators
        .protectionUpgrades
        .hardwareCloth;

    if (
      !canAfford(
        state,
        upgrade.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      upgrade.cost
    );

    state.protection +=
      upgrade.protectionBonus;

    state.predatorUpgradeHardwareCloth =
      true;

    recordMilestone(
      state,
      "Hardware Cloth Protection"
    );

    return true;

  }


  function buyLandExpansion(
    state
  ) {

    if (
      state.landUnlocked
    ) {

      return false;

    }

    const expansion =
      config.land.firstExpansion;

    if (
      !canAfford(
        state,
        expansion.cost
      )
    ) {

      return false;

    }

    spend(
      state,
      expansion.cost
    );

    state.landUnlocked =
      true;

    recordMilestone(
      state,
      "LAND UNLOCKED: " +
      expansion.name
    );

    return true;

  }


  /*
    ==================================================
    First Hen Loss Test Event
    ==================================================
  */


  function applyFirstHenLoss(
    state
  ) {

    if (
      state.firstLossUsed ||
      state.hens <= 1
    ) {

      return;

    }

    state.firstLossUsed =
      true;

    state.hens -=
      1;

    state.hensLost +=
      1;

    recordMilestone(
      state,
      "Predator Event: Hen Lost"
    );

  }


  function replaceFirstLostHen(
    state
  ) {

    if (
      !state.firstLossUsed ||
      state.firstReplacementDiscountUsed
    ) {

      return false;

    }

    if (
      state.hens >=
      state.coopCapacity
    ) {

      return false;

    }

    const normalCost =
      calculateHenCost(
        state
      );

    const discountedCost =
      normalCost *
      config.firstLossRecovery
        .replacementCostMultiplier;

    if (
      !canAfford(
        state,
        discountedCost
      )
    ) {

      return false;

    }

    spend(
      state,
      discountedCost
    );

    state.hens +=
      1;

    state.firstReplacementDiscountUsed =
      true;

    recordMilestone(
      state,
      "First-Loss Hen Replaced at 25% Discount"
    );

    return true;

  }


  /*
    ==================================================
    Player Strategies
    ==================================================
  */


  function runExpansionStrategy(
  state
) {

  /*
    ==================================================
    Expansion Strategy

    Goal:
    Build a modest early production engine,
    then stop unnecessary spending and save
    aggressively for East Pasture.

    Target:
    Reach East Pasture near the end of the
    first 30-minute session.
    ==================================================
  */


  /*
    First production upgrade is the opening
    tutorial purchase.
  */

  if (
    state.nestingUpgradeIndex === 0
  ) {

    if (
      buyNestingUpgrade(
        state
      )
    ) {

      return;

    }

  }


  /*
    Grow the starter flock only to 10 hens.

    We deliberately stop here rather than
    continuing to fill every available coop
    slot.
  */

  if (
    state.hens <
    10
  ) {

    /*
      Expand the coop only when the current
      capacity prevents us from reaching
      the 10-hen target.
    */

    if (
      state.hens >=
      state.coopCapacity
    ) {

      if (
        buyCoopExpansion(
          state
        )
      ) {

        return;

      }

    }


    if (
      buyHen(
        state
      )
    ) {

      return;

    }

  }


  /*
    Hire the automatic driver early.

    This removes manual selling and allows
    the farm to continue earning while the
    player saves for land.
  */

  if (
    !state.automaticDriver
  ) {

    if (
      hireDriver(
        state
      )
    ) {

      return;

    }

  }


  /*
    Purchase the first egg-value upgrade.

    This is a relatively inexpensive way
    to improve the income engine before
    entering the saving phase.
  */

  if (
    state.eggValueUpgradeIndex === 0
  ) {

    if (
      buyEggValueUpgrade(
        state
      )
    ) {

      return;

    }

  }


  /*
    Ensure enough storage exists so eggs
    are not constantly lost while saving.

    Only the first storage upgrade is used
    by this strategy before East Pasture.
  */

  if (
    state.storageUpgradeIndex === 0
  ) {

    if (
      buyStorageUpgrade(
        state
      )
    ) {

      return;

    }

  }

    /*
    Purchase the first transportation upgrade.

    By this stage egg production is beginning
    to exceed the starter pickup's ability to
    move eggs efficiently.

    One truck upgrade reduces that bottleneck
    before the strategy begins saving for land.
  */

    if (
    state.transportationUpgradeIndex === 0
  ) {

    if (
      buyTransportationUpgrade(
        state
      )
    ) {

      return;

    }

  }


  /*
    Once the basic income engine exists,
    stop buying hens, production upgrades,
    protection, trucks, and additional
    coop expansions.

    Save every available dollar for the
    first land expansion.
  */

  if (
    !state.landUnlocked
  ) {

    buyLandExpansion(
      state
    );

    return;

  }

}


  function runProductionStrategy(
    state
  ) {

    if (
      state.nestingUpgradeIndex <
      2
    ) {

      if (
        buyNestingUpgrade(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.hens <
      state.coopCapacity
    ) {

      if (
        buyHen(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.hens >=
      state.coopCapacity
    ) {

      if (
        buyCoopExpansion(
          state
        )
      ) {

        return;

      }

    }


    if (
      !state.automaticDriver
    ) {

      if (
        hireDriver(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.eggValueUpgradeIndex <
      2
    ) {

      if (
        buyEggValueUpgrade(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.transportationUpgradeIndex <
      1
    ) {

      if (
        buyTransportationUpgrade(
          state
        )
      ) {

        return;

      }

    }


    buyLandExpansion(
      state
    );

  }


  function runBalancedStrategy(
    state
  ) {

    if (
      state.nestingUpgradeIndex === 0
    ) {

      if (
        buyNestingUpgrade(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.hens <
      Math.min(
        state.coopCapacity,
        10
      )
    ) {

      if (
        buyHen(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.hens >=
      state.coopCapacity
    ) {

      if (
        buyCoopExpansion(
          state
        )
      ) {

        return;

      }

    }


    if (
      !state.automaticDriver
    ) {

      if (
        hireDriver(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.eggValueUpgradeIndex === 0
    ) {

      if (
        buyEggValueUpgrade(
          state
        )
      ) {

        return;

      }

    }


    if (
      !state.predatorUpgradeLatch
    ) {

      if (
        buyBetterLatch(
          state
        )
      ) {

        return;

      }

    }


    if (
      state.storageUpgradeIndex === 0
    ) {

      if (
        buyStorageUpgrade(
          state
        )
      ) {

        return;

      }

    }


    if (
      !state.predatorUpgradeHardwareCloth
    ) {

      if (
        buyHardwareCloth(
          state
        )
      ) {

        return;

      }

    }


    buyLandExpansion(
      state
    );

  }


  /*
    ==================================================
    Simulation Runner
    ==================================================
  */


  function simulate(
    strategy,
    options = {}
  ) {

    const state =
      createInitialState(
        strategy
      );

    const durationSeconds =
      (
        options.durationMinutes ||
        config.firstSession
          .durationMinutes
      ) *
      60;

    const tickSeconds =
      options.tickSeconds ||
      1;

    const henLossSecond =
      Number.isFinite(
        options.henLossSecond
      )
        ? options.henLossSecond
        : null;


    recordMilestone(
      state,
      "Simulation Started"
    );


    while (
      state.elapsedSeconds <
      durationSeconds
    ) {

      state.elapsedSeconds +=
        tickSeconds;


      runProductionTick(
        state,
        tickSeconds
      );


      processTransportation(
        state,
        tickSeconds
      );


      if (
        henLossSecond !== null &&
        !state.firstLossUsed &&
        state.elapsedSeconds >=
          henLossSecond
      ) {

        applyFirstHenLoss(
          state
        );

      }


      if (
        state.firstLossUsed &&
        !state.firstReplacementDiscountUsed
      ) {

        replaceFirstLostHen(
          state
        );

      }


      switch (
        strategy
      ) {

        case "expansion":

          runExpansionStrategy(
            state
          );

          break;


        case "production":

          runProductionStrategy(
            state
          );

          break;


        case "balanced":

        default:

          runBalancedStrategy(
            state
          );

          break;

      }

    }


    return state;

  }


  /*
    ==================================================
    Public API
    ==================================================
  */


  global.BCPChickenGameSimulator = {

    simulate:
      simulate,

    runAll:
      function () {

        return {

          expansion:
            simulate(
              "expansion"
            ),

          production:
            simulate(
              "production"
            ),

          balanced:
            simulate(
              "balanced"
            ),

          earlyHenLoss:
            simulate(
              "balanced",
              {

                /*
                  Simulated early permanent hen loss
                  around minute 20.

                  This is NOT yet the actual predator
                  probability system.
                */

                henLossSecond:
                  20 * 60

              }
            )

        };

      }

  };


})(
  window
);