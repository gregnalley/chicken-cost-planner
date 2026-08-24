"use strict";

/*
  ==================================================
  Chicken Farm Empire
  Game Balance Configuration

  Version:
  0.1.0

  Purpose:
  Central source of truth for tunable game values.

  IMPORTANT:
  Game engines and simulation tools should read values
  from this file rather than hard-coding economy numbers.

  Working values are expected to change during balancing.
  ==================================================
*/


window.BCPChickenGameConfig = {


  /*
    ==================================================
    Metadata
    ==================================================
  */

  metadata: {

    version:
      "0.1.0",

    workingTitle:
      "Chicken Farm Empire",

    balanceStatus:
      "prototype"

  },


  /*
    ==================================================
    Starting Farm
    ==================================================
  */

  startingFarm: {

    cash:
      25,

    hens:
      3,

    coopCapacity:
      5,

    eggStorageCapacity:
      250,

    predatorProtection:
      0.20

  },


  /*
    ==================================================
    Egg Production
    ==================================================
  */

  eggs: {

    startingValue:
      1.00,

    secondsPerEggPerHen:
      4.75,

    /*
      Target:

      Three starting hens should produce enough visible
      activity to make the opening feel alive without
      overwhelming storage or transportation.
    */

    startingProductionMultiplier:
      1.00

  },


  /*
    ==================================================
    Hen Purchasing
    ==================================================
  */

  hens: {

    baseCost:
      15,

    costGrowthMultiplier:
      1.15,

    /*
      The starting flock is excluded from the cost-growth
      exponent.

      Example formula:

      baseCost *
      costGrowthMultiplier ^
      (hensOwned - startingHenCount)
    */

    firstLossReplacementCostMultiplier:
      0.75,

    firstLossDiscountUses:
      1

  },


  /*
    ==================================================
    Starter Transportation
    ==================================================
  */

  transportation: {

    starterTruckCapacity:
      100,

    starterTruckCycleSeconds:
      45,

    automaticDriverCost:
      175,

    /*
      Transportation should not dominate the opening
      tutorial.

      Egg storage provides a buffer while the truck is
      away.
    */

    automaticDriverUnlocked:
      false

  },


  /*
    ==================================================
    Coop
    ==================================================
  */

  coop: {

    startingCapacity:
      5,

    expansions: [

      {

        level:
          1,

        cost:
          50,

        capacity:
          10

      },

      {

        level:
          2,

        cost:
          250,

        capacity:
          20

      },

      {

        level:
          3,

        cost:
          1250,

        capacity:
          40

      }

    ]

  },


  /*
    ==================================================
    Egg Production Upgrades
    ==================================================
  */

  productionUpgrades: {

    nestingBoxes: [

      {

        level:
          1,

        cost:
          25,

        multiplier:
          1.25

      },

      {

        level:
          2,

        cost:
          75,

        multiplier:
          1.25

      },

      {

        level:
          3,

        cost:
          225,

        multiplier:
          1.25

      },

      {

        level:
          4,

        cost:
          675,

        multiplier:
          1.25

      },

      {

        level:
          5,

        cost:
          2025,

        multiplier:
          1.25

      }

    ]

  },


  /*
    ==================================================
    Egg Value Progression
    ==================================================
  */

  eggValueUpgrades: [

    {

      id:
        "better-customers",

      cost:
        150,

      eggValue:
        1.25

    },

    {

      id:
        "farm-fresh-branding",

      cost:
        500,

      eggValue:
        1.60

    },

    {

      id:
        "premium-eggs",

      cost:
        1500,

      eggValue:
        2.10

    },

    {

      id:
        "local-market",

      cost:
        5000,

      eggValue:
        2.75

    },

    {

      id:
        "specialty-eggs",

      cost:
        15000,

      eggValue:
        3.75

    }

  ],


  /*
    ==================================================
    Land Expansion
    ==================================================
  */

  land: {

    firstExpansion: {

      id:
        "east-pasture",

      name:
        "East Pasture",

      cost:
        3000,

      /*
        Primary balance target:

        Expansion-focused player should be capable of
        reaching this within the first 30 real minutes.

        Minor early setbacks should not make this goal
        feel unreachable.
      */

      targetUnlockMinutes:
        30

    }

  },


  /*
    ==================================================
    Game Time
    ==================================================
  */

  time: {

    realMinutesPerGameDay:
      10,

    startingGameHour:
      14,

    dawnHour:
      6,

    noonHour:
      12,

    sunsetHour:
      19,

    midnightHour:
      0

  },


  /*
    ==================================================
    Predator System
    ==================================================
  */

  predators: {

    startingProtection:
      0.20,

    /*
      Early encounters teach the system.

      The first two predator encounters cannot cause
      permanent hen loss.
    */

    protectedIntroEncounters:
      2,

    startingPressure:
      0.08,

    pressureIncreasePerUnprotectedNight:
      0.03,

    maximumPressure:
      0.75,

    firstPermanentLossMinimumEncounter:
      3,

    firstLossReplacementCostMultiplier:
      0.75,

    protectionUpgrades: {

      betterLatch: {

        cost:
          400,

        protectionBonus:
          0.15

      },

      hardwareCloth: {

        cost:
          1000,

        protectionBonus:
          0.25

      }

    }

  },


  /*
    ==================================================
    Beginner Guidance
    ==================================================
  */

  guidance: {

    defaultMode:
      "full",

    modes: [

      "full",

      "standard",

      "minimal"

    ],

    showUpgradeHelpers:
      true,

    showLandProgressHelpers:
      true,

    showPredatorTutorials:
      true,

    showCriticalAlerts:
      true

  },


  /*
    ==================================================
    First Session Targets
    ==================================================
  */

  firstSession: {

    durationMinutes:
      30,

    targetFirstUpgradeSeconds:
      30,

    targetAutomationMinutes:
      7,

    targetFirstPredatorMinutes:
      10,

    targetLandExpansionMinutes:
      30

  },

    /*
    ==================================================
    Egg Storage
    ==================================================
  */

  storage: {

    startingCapacity:
      250,

    upgrades: [

      {

        id:
          "expanded-egg-room",

        name:
          "Expanded Egg Room",

        cost:
          150,

        capacity:
          750

      },

      {

        id:
          "egg-shed",

        name:
          "Egg Shed",

        cost:
          600,

        capacity:
          2500

      },

      {

        id:
          "cold-storage",

        name:
          "Cold Storage",

        cost:
          2500,

        capacity:
          10000

      }

    ]

  },


  /*
    ==================================================
    Transportation Upgrades
    ==================================================
  */

  transportationUpgrades: [

    {

      id:
        "pickup-capacity-1",

      name:
        "Larger Pickup Load",

      cost:
        750,

      capacity:
        250,

      cycleSeconds:
        45

    },

    {

      id:
        "delivery-van",

      name:
        "Delivery Van",

      cost:
        2500,

      capacity:
        750,

      cycleSeconds:
        40

    },

    {

      id:
        "box-truck",

      name:
        "Box Truck",

      cost:
        7500,

      capacity:
        2500,

      cycleSeconds:
        35

    }

  ],


  /*
    ==================================================
    Feed Economy
    ==================================================
  */

  feed: {

    /*
      Feed cost is intentionally small during the
      opening tutorial.

      It should introduce operating expenses without
      overwhelming the player's early progress.
    */

    costPerHenPerMinute:
      0.03,

    introduceAtHenCount:
      10,

    efficiencyUpgrades: [

      {

        id:
          "better-feed-efficiency-1",

        name:
          "Better Feed Efficiency",

        cost:
          500,

        costMultiplier:
          0.90

      },

      {

        id:
          "better-feed-efficiency-2",

        name:
          "Improved Feed Program",

        cost:
          2000,

        costMultiplier:
          0.85

      }

    ]

  },


  /*
    ==================================================
    Land Expansion Progress Helpers
    ==================================================
  */

  landProgress: {

    /*
      Controls when the game begins visually hinting
      that a land expansion is getting close.
    */

    faintGlowThreshold:
      0.50,

    helperIconThreshold:
      0.75,

    strongGlowThreshold:
      0.90,

    availableThreshold:
      1.00

  },


  /*
    ==================================================
    First-Loss Recovery
    ==================================================
  */

  firstLossRecovery: {

    enabled:
      true,

    replacementCostMultiplier:
      0.75,

    maximumUses:
      1,

    helperMessage:
      true

  },

};