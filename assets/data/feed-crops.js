const BCP_FEED_CROPS = {

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - SUNFLOWER
    //
    //
    //
    //
    //////////////////////////////////////////////


  "CROP-SUNFLOWER": {
    id: "CROP-SUNFLOWER",

    name: "Sunflowers",
    scientificName: "Helianthus annuus",

    category: "Oilseed and Energy Crop",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Oilseed sunflowers can provide energy-dense seeds, moderate protein, enrichment, pollinator value, and a harvest that can be dried and stored for later use.",

    chickenUse: {
      edibleParts: [
        "Mature seeds",
        "Dried seed heads",
        "Shelled seed kernels"
      ],

      primaryValue: [
        "Energy",
        "Fat",
        "Moderate protein",
        "Enrichment",
        "Winter storage"
      ],

      feedingForms: [
        "Whole dried seed heads",
        "Loose whole seeds",
        "Shelled kernels",
        "Cracked or ground seeds"
      ],

      bestFor: [
        "Adult chickens",
        "Laying hens as a supplemental food",
        "Seasonal enrichment",
        "Cold-weather energy supplementation",
        "Dry winter storage"
      ],

      supplementOnly: true,

      preparationNotes:
        "Allow seed heads to mature fully. Harvest before excessive bird loss, dry them thoroughly, and store them in a cool, dry, rodent-resistant container. Whole heads can be offered as enrichment, or the seeds can be removed and portioned.",

      safetyNotes:
        "Sunflower seeds are rich in oil and should supplement rather than replace a balanced poultry ration. Avoid feeding moldy, damp, rancid, or heavily salted sunflower seeds."
    },

    nutrition: {
      basis:
        "Approximate whole-seed values. Nutrient composition varies by oilseed versus confection type, hull percentage, growing conditions, and processing.",

      crudeProteinPercent: "Approximately 20%",
      fatPercent: "Approximately 40%",
      fiberPercent:
        "Can be high; approximately 29% has been reported for whole seed, largely because of the hull",

      calciumPercent: null,
      phosphorusPercent: null,

      notableNutrients: [
        "Energy-dense oil",
        "Moderate protein",
        "Vitamin E",
        "Phosphorus",
        "Magnesium",
        "Selenium",
        "Unsaturated fatty acids"
      ],

      limitations: [
        "High oil content makes the seed energy-dense",
        "Hull content raises fiber and lowers usable nutrient density",
        "Whole seed, kernels, and sunflower meal have very different nutrient profiles",
        "Sunflower protein does not by itself create a balanced poultry ration",
        "Large amounts may dilute calcium, amino acids, vitamins, and minerals supplied by complete layer feed"
      ]
    },

    growing: {
      sunlight: "Full sun; approximately 6 or more hours daily",

      soilTemperatureMinimumF: 60,
      idealSoilTemperatureF:
        "Approximately 60°F or warmer before direct sowing",

      frostTolerance: "Low",
      heatTolerance: "High",
      droughtTolerance:
        "Moderate after establishment, although moisture stress can reduce seed development",

      soilPHMinimum: null,
      soilPHMaximum: null,

      waterNeeds:
        "Moderate; consistent moisture is especially important during establishment, flowering, and seed filling",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: 60,
      daysToFirstHarvestMaximum: 120,

      daysToMaturityMinimum: 60,
      daysToMaturityMaximum: 120,

      plantSpacingInches:
        "Approximately 6 inches initially; wider spacing may be used for large single-head seed varieties",

      rowSpacingInches:
        "Variety- and equipment-dependent; research continues",

      plantingDepthInches:
        "Approximately 1 to 2 inches",

      successionPlanting: true,

      regrowthAfterHarvest: false
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Direct sow after the final spring frost when soil has warmed to approximately 60°F. Short-season varieties are usually most practical.",
        harvestWindow:
          "Late summer through early fall, before persistent wet weather or hard frost."
      },

      midwestNortheast: {
        plantingWindow:
          "Direct sow after frost danger has passed and soil reaches approximately 60°F, commonly during mid- to late spring.",
        harvestWindow:
          "Late summer through early fall, depending on variety and planting date."
      },

      upperSouth: {
        plantingWindow:
          "Direct sow in spring after frost danger has passed. Succession plantings may be possible where the season is long enough.",
        harvestWindow:
          "Summer through early fall."
      },

      deepSouth: {
        plantingWindow:
          "Spring planting may begin earlier than in northern regions once frost danger has passed and soil is warm. Avoid placing seed development during the most severe heat and drought when possible.",
        harvestWindow:
          "Early summer through fall, depending on planting date and local heat."
      },

      southwest: {
        plantingWindow:
          "Plant after frost when irrigation is available. Time flowering and seed filling to avoid the most extreme heat where possible.",
        harvestWindow:
          "Summer into fall, depending on elevation and planting date."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant after frost once soil has warmed. Select earlier-maturing varieties in cooler or shorter-season locations.",
        harvestWindow:
          "Late summer through early fall."
      },

      coastalWest: {
        plantingWindow:
          "Plant after frost and once soil is warm. Mild areas may support an extended sowing window.",
        harvestWindow:
          "Summer through fall, depending on local conditions."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: 4,
      plantsPer50SquareFeet: 18,
      plantsPer100SquareFeet: 36,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Potentially several months when fully dried and protected from moisture, insects, rodents, and rancidity",

      storageMethod:
        "Dry seed heads or cleaned seeds thoroughly. Store in a cool, dry, dark location inside a sealed rodent-resistant container. Inspect periodically for moisture, mold, insects, or rancid odor.",

      yieldNotes:
        "Plant-density estimates are calculated from University of Georgia Extension guidance recommending approximately 12 to 15 inches between plants and 2 to 3 feet between rows. Using midpoint spacing of approximately 13.5 inches by 30 inches produces an estimated population of about 4 plants per 10 square feet, 18 plants per 50 square feet, and 36 plants per 100 square feet. These values represent practical planting-density estimates rather than measured backyard seed yield. Actual seed production depends strongly on variety, pollination, fertility, moisture, bird pressure, head size, harvest timing, and whether results are measured as whole heads, unshelled seeds, or kernels."
    },

    economics: {
      seedCostEstimate:
        "Usually low to moderate, depending on variety and packet or bulk-seed quantity",

      equipmentCostEstimate:
        "Low for direct sowing; optional costs include irrigation, netting, stakes, drying racks, and storage containers",

      irrigationCostLevel: "Low to Moderate",
      laborLevel: "Moderate",

      potentialFeedSavings:
        "Not yet quantified. Economic value depends on seed yield, bird losses, land availability, labor, and the price of purchased sunflower seed or complete feed.",

      economicNotes:
        "Sunflowers may provide value beyond poultry feed through pollinator support, visual appeal, shade, cut flowers, and enrichment. Their direct feed savings should not be estimated until usable seed yield is known."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Moderate for basic cultivation and poultry-feed use; limited for backyard yield and economic replacement estimates",

      sources: [
        {
          title: "Growing Sunflowers in the Home Garden",
          organization: "University of Georgia Cooperative Extension",
          url: "https://fieldreport.caes.uga.edu/publications/C1121/growing-sunflowers-in-the-home-garden/",
          use:
            "Planting timing, soil temperature, depth, spacing, and home-garden cultivation"
        },

        {
          title: "Sunflower Seeds in Poultry Diets",
          organization: "Small and Backyard Poultry Extension",
          url: "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/oilseed-meals-in-poultry-diets/sunflower-seeds-in-poultry-diets/",
          use:
            "Poultry use and dietary inclusion context"
        },

        {
          title: "Designing Feeding Programs for Natural and Organic Pork Production",
          organization: "University of Minnesota Extension",
          url: "https://extension.umn.edu/small-scale-swine-production/designing-feeding-programs-natural-and-organic-pork-production",
          use:
            "Approximate whole sunflower seed protein, oil, and fiber values"
        },

        {
          title: "USDA FoodData Central",
          organization: "United States Department of Agriculture",
          url: "https://fdc.nal.usda.gov/",
          use:
            "Micronutrient context for sunflower kernels"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Separate black-oil sunflower data from confection sunflower data before assigning final nutrition scores.",
        "Do not compare whole unshelled seed directly with kernels or sunflower meal.",
        "Find credible seed-yield data appropriate for backyard spacing.",
        "Determine reasonable plants-per-square-foot ranges for oilseed varieties.",
        "Research seed losses from wild birds and methods such as netting or bagging heads.",
        "Research poultry-specific guidance for laying hens before suggesting a percentage of total diet.",
        "Calculate scores only after comparable records exist for several crops.",
        "Plant-density estimates use midpoint spacing of approximately 13.5 inches between plants and 30 inches between rows, based on University of Georgia Extension home-garden guidance."
      
      ]
    },

        plannerData: {
      schemaVersion: "1.0.0",

      developmentStatus: "ready",

      identity: {
        plannerName: "Sunflowers",
        shortLabel: "Sunflower",
        icon: "🌻",

        cropCategory: "oilseed",
        primaryFeedCategory: "energy",

        guideUrl:
          "growing-sunflowers-for-chickens.html"
      },

      lifecycle: {
        growthCycle: "annual",

        isAnnual: true,
        isBiennial: false,
        isPerennial: false,
        isTreeOrShrub: false,

        yearsToFirstUsefulHarvest: 0,
        yearsToFullProduction: 0,
        expectedUsefulLifeYears: 1,

        regrowsAfterHarvest: false,

        permanentPlantingRequired: false,
        reversibleAfterOneSeason: true
      },

      climate: {
  suitableClimateTypes: [
    "cool-moderate-summer",
    "temperate",
    "hot-humid",
    "hot-dry",
    "mild-winter"
  ],

  preferredClimateTypes: [
    "temperate",
    "hot-dry"
  ],

  challengingClimateTypes: [
    "cold-short-summer",
    "high-elevation"
  ],

  minimumFrostFreeDays: null,
  preferredFrostFreeDays: null,

  minimumSoilTemperatureF: 50,
  preferredSoilTemperatureF: null,

  daysToMaturityMinimum: null,
  daysToMaturityMaximum: null,

  referenceDaysToPhysiologicalMaturity: 119,

  dryDownBufferDays: null,

  heatToleranceScore: 4,

  droughtClimateToleranceScore: 4,

  humidityToleranceScore: 3,

  coolSummerToleranceScore: 3,

  frostSensitivityScore: 5,

  winterHardinessRequired: false,

  seasonExtensionBenefits: [
    "Indoor seed starting may help in short-season areas, but Sunflowers should be transplanted before becoming crowded or root-bound.",
    "Selecting an earlier-maturing seed-producing variety is generally more dependable than relying on late frost protection.",
    "Biodegradable starting containers may reduce root disturbance during transplanting."
  ],

  indoorSeedStartingBenefitScore: 3,

  directFacts: {
    seasonType:
      "warm-season",

    frostSensitive: true,

    plantAfterFrostDanger: true,

    germinationSoilTemperatureF:
      50,

    referencePhysiologicalMaturityDays:
      119,

    maturityReferenceScope:
      "Average growth-stage reference from a Northern Great Plains production guide; not a universal cultivar guarantee.",

    baseGrowingDegreeTemperatureF:
      44,

    notes: [
      "Annual Sunflowers are normally direct-seeded after danger of damaging spring frost has passed.",
      "Soil near 50°F supports germination, while uniform moisture supports consistent emergence.",
      "Sunflower development varies with genetics, cultivar, temperature, planting date, and growing environment.",
      "The 119-day R9 figure is retained only as a reference value and should not replace cultivar-specific maturity information.",
      "Short-season growers should prioritize early seed-producing varieties and allow time for seed filling and postharvest drying.",
      "Humid climates can support vigorous growth but may increase disease, head-drying, and storage challenges."
    ]
  }
},

      site: {
  absoluteMinimumSunHours: null,

  productiveMinimumSunHours: 6,

  preferredSunHours: 8,

  shadeToleranceScore: 2,

  afternoonShadeBenefitInHeat: 2,

  windToleranceScore: 3,

  lodgingRiskScore: 3,

  reflectedHeatToleranceScore: 4,

  airflowRequirementScore: 4,

  frostPocketSensitivityScore: 4,

  treeRootCompetitionToleranceScore: 2,

  hardscapeConflictRiskScore: 2,

  structureConflictRiskScore: 3,

  utilityConflictRiskScore: 2,

  fruitDropMessRiskScore: 1,

  stainingRiskScore: 1,

  directFacts: {
    preferredLight:
      "full-sun",

    productiveSunGuidance:
      "At least 6 hours of direct sunlight, with approximately 8 hours preferred for stronger plant and seed-head production.",

    windExposureConcern: true,

    varietyHeightRange:
      "Dwarf cultivars may remain below approximately 3 feet, while giant cultivars may exceed 8 feet.",

    stakingMayBeNeeded: true,

    notes: [
      "Sunflowers perform best in full sun.",
      "Reduced light may weaken stems and reduce flower-head and seed production.",
      "Dwarf and semi-dwarf varieties create less structural conflict than giant varieties.",
      "Giant cultivars and plants carrying large seed heads may require staking or wind protection.",
      "Good airflow can help leaf and head drying, but severe wind raises leaning and breakage risk.",
      "Avoid placing tall Sunflowers where they will shade smaller crops or interfere with walkways, windows, utility access, or roof drainage.",
      "Established tree roots can compete strongly for sunlight, water, nutrients, and rooting space."
    ]
  }
},

      soil: {
  textureScores: {
    heavyClay: 2,
    clayLoam: 4,
    loam: 5,
    sandyLoam: 4,
    verySandy: 3,
    rocky: 2
  },

  drainageRequirementScore: 5,

  temporaryWetToleranceScore: 2,

  waterloggingSensitivityScore: 4,

  minimumSoilDepthIn: null,

  preferredSoilDepthIn: 48,

  compactionToleranceScore: 2,

  establishmentInSodDifficultyScore: 4,

  preferredPHMinimum: 6.0,
  preferredPHMaximum: 7.5,

  survivalPHMinimum: null,
  survivalPHMaximum: null,

  fertilityRequirementScore: 3,

  nitrogenRequirementScore: 3,
  phosphorusRequirementScore: 2,
  potassiumRequirementScore: 3,

  benefitsFromInoculation: false,
  inoculantType: null,

  saltToleranceScore: null,

  amendmentEffortScore: 3,

  directFacts: {
    preferredDrainage:
      "well-drained",

    adaptableTextures: [
      "clay loam",
      "silty clay loam",
      "loam",
      "sandy loam"
    ],

    preferredTexture:
      "Well-drained soil with good water-holding capacity and unrestricted rooting depth.",

    waterloggedSoilSuitable:
      false,

    effectiveRootDepthIn:
      48,

    deeperWaterExtractionPossible:
      true,

    soilPHSourceRanges: [
      {
        sourceContext:
          "Northern Great Plains field production",

        minimum: 6.5,
        maximum: 7.5
      },

      {
        sourceContext:
          "Minnesota home garden guidance",

        minimum: 6.0,
        maximum: 6.8
      }
    ],

    notes: [
      "Sunflower is adapted to several soil textures but performs best where drainage and water-holding capacity are both favorable.",
      "Loam, silt loam, clay loam, and silty clay loam can provide strong water-holding capacity for the deep root system.",
      "Sandy loam can perform well but may require more dependable watering and fertility management.",
      "Heavy clay receives a low score when slow drainage, crusting, or compaction restricts establishment and roots.",
      "An effective rooting depth of approximately 4 feet helps established plants reach stored soil moisture.",
      "Shallow rock, hardpan, dense compaction, and established tree roots can reduce the benefit of deep rooting.",
      "The stored productive pH range of 6.0 to 7.5 combines compatible Extension guidance; it is not an absolute survival range.",
      "Sunflower does not require legume inoculation."
    ]
  }
},

     water: {
  overallWaterRequirementLevel:
    "moderate",

  germinationWaterNeedLevel:
    "moderate",

  establishmentWaterNeedLevel:
    "moderate",

  matureWaterNeedLevel:
    "moderate",

  floweringWaterNeedLevel:
    "high",

  harvestDevelopmentWaterNeedLevel:
    "high",

  droughtSurvivalScore: 4,

  droughtYieldRetentionScore: 3,

  criticalGrowthStages: [
    "germination",
    "seedling-establishment",
    "bud-development",
    "flowering",
    "seed-filling"
  ],

  criticalStageWaterImportanceScore: 4,

  overwateringSensitivityScore: 3,

  waterloggingSensitivityScore: 4,

  dripIrrigationBenefitScore: 4,

  mulchBenefitScore: 4,

  suitableForRainfallOnlyScore: 3,

  suitableForLimitedIrrigationScore: 4,

  containerDryingRiskScore: 4,

  establishmentYearsRequiringExtraWater: 0,

  directFacts: {
    droughtTolerantAfterEstablishment:
      true,

    establishmentMoistureImportant:
      true,

    regularMoistureImprovesProduction:
      true,

    standingWaterSuitable:
      false,

    effectiveRootDepthIn:
      48,

    irrigatedSeasonalWaterUseInches:
      19,

    irrigationResponse:
      "Yield can respond to irrigation, particularly during hot and dry seasons.",

    irrigationDiseaseTradeoff:
      "Additional irrigation may increase some disease risks, including white mold under conducive conditions.",

    criticalWaterWindow:
      "Regular watering around flowering supports root growth and top-heavy flowering plants; productive seed filling also benefits from adequate moisture.",

    notes: [
      "Sunflower is widely described as drought tolerant because its deep roots can explore a large soil volume.",
      "Drought survival does not guarantee maximum seed yield.",
      "The crop can use substantial seasonal water when it is available.",
      "Sunflower generally uses less seasonal water than Corn under the NDSU comparison but more than short-season small grains.",
      "Dryland plants use stored soil moisture and growing-season rainfall.",
      "Irrigation can increase yield in dry years, although the response varies and excessive moisture may increase disease risk.",
      "Moisture conservation through weed control, mulch, residue, and good infiltration supports production.",
      "Container-grown plants have less accessible soil volume and may dry much faster than in-ground plants.",
      "Soil should remain adequately moist during key stages without remaining continuously saturated."
    ]
  }
},

      space: {
  minimumTrialAreaSqFt: null,

  minimumUsefulAreaSqFt: null,

  preferredProductionAreaSqFt: null,

  smallSpaceScore: 4,
  mediumSpaceScore: 4,
  largeSpaceScore: 4,

  layoutScores: {
    squareBlock: 4,
    wideRectangle: 5,
    longStrip: 5,
    irregular: 4,
    smallBeds: 4,
    openField: 5
  },

  spaceTypeScores: {
    inGround: 5,
    raisedBed: 4,
    container: 2,
    fenceLine: 5,
    buildingEdge: 4,
    unusedLawn: 4,
    openField: 5,
    orchard: 2,
    forageFrame: 1,
    rotationalPaddock: 2,
    greenhouse: 2,
    hedgerow: 4
  },

  minimumContainerGallons: null,

  containerUseLimitation:
  "Dwarf cultivars may grow successfully in containers, but container production is generally inefficient for substantial chicken-feed seed harvests.",

  minimumRaisedBedDepthIn: null,

  vineSpreadRequired: false,

  verticalSupportBenefitScore: 2,

  blockPlantingRequired: false,

  minimumBlockRows: null,

  continuousStandPreferred: false,

  heightCategory:
    "variety-dependent-tall",

  matureWidthCategory:
    "moderate",

  overflowSpaceBenefitScore: 1,

  directFacts: {
    layoutFlexible: true,

    blockPollinationRequired: false,

    suitableForRowPlanting: true,

    suitableForCloselySpacedStands: true,

    suitableForSingleOrSmallGroupPlanting: true,

    varietySizeHighlyVariable: true,

    commercialPlantPopulationRange: {
      oilseedPlantsPerAcreMinimum: 18000,
      oilseedPlantsPerAcreMaximum: 24000,

      nonoilseedPlantsPerAcreMinimum: 14000,
      nonoilseedPlantsPerAcreMaximum: 20000,

      backyardUseWarning:
        "Commercial plant populations should not be converted directly into backyard yield promises or minimum useful-area rules."
    },

    notes: [
      "Sunflowers can be grown in conventional rows, closely spaced stands, borders, and small groups.",
      "Unlike Field Corn, Sunflower does not require a square block with several neighboring rows for wind pollination.",
      "Modern Sunflower hybrids possess substantial self-compatibility, although insect pollination may improve seed set and yield.",
      "Even plant spacing helps reduce excessive competition and improves access to sunlight, nutrients, and water.",
      "Lower plant populations tend to produce larger heads and seeds, while higher populations tend to produce smaller heads.",
      "Higher plant populations may increase lodging and stalk-breakage risk.",
      "Tall and large-headed varieties need more wind protection and physical clearance than dwarf or compact varieties.",
      "Sunflowers work especially well along sunny fence lines, garden edges, and the backs of beds where they will not shade shorter crops.",
      "Sunflowers are not suitable as an unprotected living crop inside a permanent chicken run because chickens may damage seedlings and leaves before seed heads mature.",
      "The best planting layout depends on variety height, head size, water availability, desired harvest form, and wildlife protection."
    ]
  }
},

      flock: {
  suitableForAdultChickens: true,

  suitableForYoungChicks: false,

  flockPurposeScores: {
    eggs: 4,
    meat: 3,
    breeding: 3,
    petsEnrichment: 5,
    homestead: 4,
    mixed: 4
  },

  feedingMethodScores: {
    livingGrazing: 1,
    cutAndCarry: 1,
    wholeProduce: 2,
    wholeSeedHeads: 5,
    wholeGrain: 4,
    processedGrain: 3,
    heatTreated: 1,
    driedForage: 1,
    winterStorage: 4
  },

  directRunSuitabilityScore: 1,

  forageFrameSuitabilityScore: 1,

  rotationalPaddockSuitabilityScore: 2,

  confinedFlockValueScore: 5,

  pasturedFlockValueScore: 3,

  treatDilutionRiskScore: 4,

  highEnergySupplement: true,

  highFiberSupplement: false,

  concentratedFatSource: true,

  primaryFlockUses: [
    "Whole-head pecking enrichment",
    "Seasonal mature-seed supplementation",
    "Stored winter enrichment",
    "Energy- and fat-oriented supplemental feeding"
  ],

  unsuitablePrimaryUses: [
    "Living forage",
    "Protected forage-frame grazing",
    "Primary protein crop",
    "Complete-ration replacement",
    "Young-chick staple feed"
  ],

  directFacts: {
    edibleFeedParts: [
      "Mature whole seeds",
      "Mature dried seed heads",
      "Dehulled kernels"
    ],

    preferredBirdStage:
      "Established adult chickens",

    cropSurvivalWithDirectChickenAccess:
      "poor-before-maturity",

    directAccessTiming:
      "Offer harvested mature heads or seeds rather than allowing unrestricted access to growing plants.",

    nutritionalOrientation: [
      "energy",
      "fat",
      "moderate-protein",
      "enrichment"
    ],

    notes: [
      "Sunflower is most useful to backyard chickens through its mature seeds and seed heads rather than through leaves or stems.",
      "Oilseed Sunflower varieties generally provide smaller, oil-rich seeds, while nonoilseed or confection types generally produce larger in-shell seeds.",
      "Whole heads encourage pecking and natural feed-seeking behavior.",
      "Loose mature seed is easier to measure than a whole head but requires additional handling and storage.",
      "Unprotected chickens may damage seedlings, foliage, stems, or developing heads before the crop reaches useful seed maturity.",
      "Sunflower seed is energy- and fat-dense and should remain supplemental to an age-appropriate balanced poultry feed.",
      "The crop does not provide the complete amino-acid, vitamin, mineral, and calcium balance required as a stand-alone poultry ration.",
      "Young chicks should continue receiving an age-appropriate complete starter feed rather than relying on whole Sunflower seed or heads."
    ]
  }
},

      labor: {
  beginnerFriendlinessScore: 4,

  plantingEaseScore: 5,

  establishmentEaseScore: 4,

  routineMaintenanceEaseScore: 4,

  weedControlEaseScore: 3,

  wildlifeProtectionEaseScore: 2,

  harvestEaseScore: 4,

  wholeHeadProcessingEaseScore: 4,

  looseSeedProcessingEaseScore: 3,

  dryingEaseScore: 3,

  storageMonitoringEaseScore: 3,

  perennialMaintenanceEaseScore: 5,

  physicalAccessibilityScore: 4,

  heavyLiftingRiskScore: 1,

  weeklyLaborLevel:
    "low",

  peakWorkloadLevel:
    "moderate",

  harvestFrequencyCategory:
    "seasonal",

  requiredPlantingTasks: [
    "prepare-seedbed",
    "plant-large-seed"
  ],

  requiredMaintenanceTasks: [
    "hand-weed",
    "protect-from-wildlife"
  ],

  optionalMaintenanceTasks: [
    "mulch",
    "stake"
  ],

  requiredHarvestTasks: [
    "cut-seed-heads"
  ],

  usePathProcessingTasks: {
    freshMatureSeedHead: [
      "cut-seed-heads"
    ],

    wholeDriedSeedHead: [
      "cut-seed-heads",
      "dry"
    ],

    looseDriedSeed: [
      "cut-seed-heads",
      "dry",
      "remove-seed",
      "clean-sort"
    ]
  },

  requiredStorageTasks: [
    "inspect-moisture",
    "inspect-insects",
    "inspect-mold"
  ],

  specializedEquipmentRequired: [],

  specializedEquipmentHelpful: [
    "hand-pruners",
    "stakes",
    "bird-netting",
    "drying-rack",
    "drying-screen",
    "fan",
    "food-safe-bucket",
    "metal-grain-can",
    "moisture-meter"
  ],

  suitableForLowTimeUsersScore: 4,

  suitableForSoloGrowersScore: 5,

  directFacts: {
    seedSize:
      "large-and-easy-to-handle",

    directSeedingSuitable: true,

    indoorStartingPossible: true,

    specializedHarvestEquipmentRequiredForBackyardScale:
      false,

    majorLaborBottlenecks: [
      "Protecting developing seed heads from birds",
      "Cutting and handling mature heads",
      "Drying heads or seed safely",
      "Removing seed when loose storage is desired",
      "Inspecting stored heads or seed"
    ],

    notes: [
      "Large seed makes Sunflower straightforward to plant by hand.",
      "Direct seeding is practical for most backyard plantings.",
      "Routine crop care is generally modest after establishment where weeds, water, and wildlife remain manageable.",
      "Whole-head use requires less processing than loose-seed use.",
      "Bird protection may become the most time-consuming management task as seed matures.",
      "Harvest work is concentrated into one or several seasonal periods rather than requiring daily picking.",
      "Very tall varieties may make harvesting less accessible than dwarf or medium-height varieties.",
      "Large commercial plantings require specialized harvesting and drying systems, but small backyard plantings can be cut and handled manually."
    ]
  }
},

      cost: {
  seedOrPlantCostLevel:
    "low",

  soilPreparationCostLevel:
    "low",

  irrigationCostLevel:
    "low",

  protectionCostLevel:
    "moderate",

  processingEquipmentCostLevel:
    "low",

  storageCostLevel:
    "low",

  annualRecurringCostLevel:
    "low",

  longTermValueScore: 4,

  lowestCostUsePath:
    "fresh-mature-seed-head",

  highestCostUsePath:
    "loose-dried-seed",

  likelyCostDrivers: [
    "Bird netting or seed-head protection",
    "Stakes for tall varieties",
    "Drying racks or screens",
    "Rodent-resistant storage containers",
    "Optional fan or moisture meter"
  ],

  costReductionOptions: [
    "Begin with a small direct-seeded trial.",
    "Use whole heads instead of removing and cleaning loose seed.",
    "Use existing fencing or supports where suitable.",
    "Build simple drying screens from materials already available.",
    "Save suitable open-pollinated seed only when isolation and seed quality are understood."
  ],

  directFacts: {
    specializedPlantingEquipmentRequired:
      false,

    specializedBackyardHarvestEquipmentRequired:
      false,

    specializedProcessingEquipmentRequired:
      false,

    notes: [
      "Seed and ordinary hand-tool costs are generally modest for a backyard planting.",
      "Bird protection may become the largest optional setup expense.",
      "Whole-head feeding avoids the need for a sheller, thresher, or grinder.",
      "Dry storage requires suitable containers but not necessarily powered equipment.",
      "Cost levels are qualitative planner ratings rather than current retail-price estimates."
    ]
  }
},

      goals: {
  feedReductionScore: 3,

  energyProductionScore: 4,

  proteinOrientedScore: 3,

  freshGreensScore: 1,

  livingForageScore: 1,

  winterStorageScore: 4,

  enrichmentScore: 5,

  resilienceScore: 4,

  soilImprovementScore: 2,

  nitrogenFixationScore: 1,

  groundCoverScore: 2,

  erosionControlScore: 2,

  shadeScore: 3,

  privacyScreeningScore: 4,

  pollinatorSupportScore: 5,

  compostBiomassScore: 3,

  householdFoodScore: 4,

  seedSavingScore: 4,

  selfRelianceScore: 4,

  multipurposeValueScore: 5,

  visualAppealScore: 5,

  productionReliabilityScore: 4,

  fastestValueScore: 4,

  nonElectricStorageScore: 4,

  smallFlockValueScore: 5,

  largeFlockValueScore: 3,

  primaryGoalMatches: [
    "enrichment",
    "high-energy",
    "winter-storage",
    "pollinators",
    "shared-household-food",
    "self-reliance",
    "seed-saving",
    "privacy-screening",
    "edible-landscape"
  ],

  weakGoalMatches: [
    "living-forage",
    "fresh-greens",
    "nitrogen-fixation",
    "permanent-ground-cover",
    "primary-protein-production"
  ],

  directFacts: {
    oilseedOrientation: true,

    pollinatorBenefit: true,

    humanFoodPotential: true,

    annualScreeningPotential: true,

    seedSavingPossible: true,

    notes: [
      "Mature seed provides concentrated oil, energy, and moderate protein.",
      "Whole seed heads provide unusually strong flock-enrichment value.",
      "Sunflowers provide abundant visible flowers and can benefit insect pollinators.",
      "Current hybrids may set seed through self-compatibility, but pollinator activity can improve seed set and yield.",
      "Tall varieties can provide temporary seasonal screening or partial shade.",
      "Sunflower does not fix nitrogen and is not a persistent ground-cover crop.",
      "Human-food value depends on variety, handling, cleanliness, and intended seed type.",
      "Open-pollinated seed may be saved, while hybrid offspring may not reliably reproduce the parent variety."
    ]
  }
},

      risks: {
  wildlife: {
    wildBirds: 5,
    deer: 4,
    raccoons: 2,
    squirrels: 4,
    rabbits: 3,
    rodents: 4,
    groundhogs: 3
  },

  insectsRiskScore: 3,

  diseaseRiskScore: 3,

  lodgingRiskScore: 3,

  fieldMoldRiskScore: 3,

  dryingMoldRiskScore: 4,

  storageMoldRiskScore: 4,

  storedInsectRiskScore: 3,

  spoilageSpeedRiskScore: 3,

  invasivenessConcernRiskScore: 1,

  selfSeedingRiskScore: 3,

  fruitDropRiskScore: 2,

  cropFailureRiskScore: 3,

  stormDamageRiskScore: 3,

  shadingOtherCropsRiskScore: 4,

  overfeedingRiskScore: 4,

  treatedSeedRiskScore: 5,

  primaryRisks: [
    {
      id: "wild-bird-loss",
      severity: "very-high",

      affectedStages: [
        "late-flowering",
        "seed-filling",
        "maturity"
      ],

      mitigationOptions: [
        "Bird netting",
        "Individual head bags",
        "Early monitoring",
        "Timely harvest",
        "Protected drying"
      ],

      note:
        "Exposed seed and the large head make Sunflower especially vulnerable to feeding birds."
    },

    {
      id: "wet-head-mold",
      severity: "high",

      affectedStages: [
        "late-maturity",
        "harvest",
        "drying",
        "storage"
      ],

      mitigationOptions: [
        "Harvest only sound heads",
        "Dry with good ventilation",
        "Avoid sealed storage while damp",
        "Inspect regularly",
        "Discard questionable material"
      ],

      note:
        "Large heads and densely packed seed can retain moisture, particularly under humid conditions."
    },

    {
      id: "lodging-and-breakage",
      severity: "moderate",

      affectedStages: [
        "late-vegetative-growth",
        "flowering",
        "seed-filling"
      ],

      mitigationOptions: [
        "Select shorter varieties",
        "Avoid excessive plant density",
        "Use stakes where necessary",
        "Choose a sheltered location"
      ],

      note:
        "Tall plants and heavy heads may lean or break under strong wind, storms, or weak rooting conditions."
    },

    {
      id: "balanced-feed-displacement",
      severity: "high",

      affectedStages: [
        "feeding"
      ],

      mitigationOptions: [
        "Offer as a measured supplement",
        "Continue complete poultry feed",
        "Avoid unrestricted overfeeding"
      ],

      note:
        "Oil-rich seed can displace balanced feed when offered too generously."
    },

    {
      id: "chemically-treated-seed",
      severity: "very-high",

      affectedStages: [
        "planting",
        "feeding"
      ],

      mitigationOptions: [
        "Use untreated seed for any material that may be fed",
        "Keep treated planting seed clearly separated"
      ],

      note:
        "Planting seed treated with pesticides or other chemicals must not be fed."
    }
  ],

  directFacts: {
    exceptionallyAttractiveToWildBirds:
      true,

    exposedSeedAccessibleToBirds:
      true,

    matureHeadProvidesBirdPerch:
      true,

    multipleDiseasesPossible:
      true,

    moistureControlImportantDuringStorage:
      true,

    timelyHarvestCanReduceFieldLoss:
      true,

    notes: [
      "Wild birds may begin feeding soon after petals wilt and may continue until harvest.",
      "Small isolated backyard plantings may be highly visible and easy for birds to exploit.",
      "Several insects and diseases can affect Sunflower, though backyard severity varies by region and variety.",
      "Short crop rotations can magnify some disease risks.",
      "Physiological maturity occurs when the head back turns yellow and bracts turn brown.",
      "Earlier harvest can reduce prolonged exposure to birds and late-season weather, but harvested material may then require additional drying.",
      "Stored seed should be adequately dried and cooled before enclosed storage.",
      "Questionable, moldy, heat-damaged, or musty material should not be fed."
    ]
  }
},

      seasonalRoles: {
  earlySpring: false,

  lateSpring: true,

  summer: true,

  lateSummer: true,

  fall: true,

  winterStorage: true,

  perennial: false,

  plantingWindows: [
    {
      id: "direct-seed-after-frost",

      trigger:
        "after-last-frost",

      offsetWeeksMinimum: 0,
      offsetWeeksMaximum: 3,

      soilCondition:
        "warming-and-workable",

      method:
        "direct-seed",

      note:
        "Plant after damaging frost danger has passed and soil conditions support dependable germination."
    },

    {
      id: "optional-indoor-start",

      trigger:
        "before-last-frost",

      offsetWeeksMinimum: 2,
      offsetWeeksMaximum: 4,

      method:
        "start-indoors",

      note:
        "Indoor starting may help short-season growers, but transplant before plants become crowded or root-bound."
    }
  ],

  harvestWindows: [
    {
      id: "fresh-mature-head",

      trigger:
        "physiological-maturity",

      usePathId:
        "fresh-mature-seed-head",

      note:
        "Harvest sound mature seed-filled heads for immediate or near-immediate flock use."
    },

    {
      id: "whole-dried-head",

      trigger:
        "mature-head-before-prolonged-field-loss",

      usePathId:
        "whole-dried-seed-head",

      note:
        "Cut mature heads and finish drying under protected, ventilated conditions when necessary."
    },

    {
      id: "loose-dried-seed",

      trigger:
        "head-and-seed-adequately-dry",

      usePathId:
        "loose-dried-seed",

      note:
        "Remove and clean seed only after the head and seed have reached an appropriate dry condition."
    }
  ],

  cropSequenceRoles: [
    "Warm-season annual",
    "Summer pollinator crop",
    "Late-summer and fall seed crop",
    "Winter-storage enrichment crop",
    "Temporary seasonal screen"
  ],

  seasonalLimitations: [
    "Not a cool-season living-forage crop",
    "Not frost-hardy during early growth",
    "Mature seed harvest may extend into wet fall weather",
    "Late planting may leave insufficient time for seed filling and dry-down"
  ],

  directFacts: {
    warmSeasonAnnual: true,

    commonlyDirectSeeded: true,

    physiologicalMaturityStage:
      "R9",

    maturityIndicators: [
      "Back of head changes from green to yellow",
      "Bracts turn yellow and brown"
    ],

    approximatePhysiologicalMaturityAfterBloomDaysMinimum:
      30,

    approximatePhysiologicalMaturityAfterBloomDaysMaximum:
      45,

    notes: [
      "The crop is primarily planted during late spring after frost risk declines.",
      "Vegetative growth, flowering, and seed filling occur through summer.",
      "Mature heads are generally harvested in late summer or fall depending on planting date, climate, and variety.",
      "Physiological maturity is distinct from safe long-term storage dryness.",
      "Harvested heads or seed may require additional drying before storage.",
      "Stored whole heads or loose seed can extend the crop's usefulness into winter."
    ]
  }
},

      usePaths: [
  {
    id: "fresh-mature-seed-head",

    label:
      "Fresh Mature Sunflower Seed Head",

    description:
      "A mature seed-filled head harvested and offered relatively soon after cutting, primarily for pecking enrichment and immediate seed consumption.",

    primaryFeedRole:
      "energy-enrichment",

    harvestProducts: [
      "fresh-seed-heads"
    ],

    suitableFeedingMethods: [
      "whole-seed-heads",
      "immediate-feeding",
      "seasonal-enrichment"
    ],

    requiredProcessingTasks: [
      "cut-seed-heads"
    ],

    optionalProcessingTasks: [
      "partial-dry"
    ],

    requiredEquipment: [
      "hand-pruners"
    ],

    helpfulEquipment: [
      "bird-netting",
      "stakes"
    ],

    harvestPattern:
      "several",

    harvestFrequencyCategory:
      "seasonal",

    storageMethods: [
      "short-term-fresh"
    ],

    preferredStorageMethod:
      "short-term-fresh",

    storageDurationCategory:
      "very-short",

    nonElectricStorageSuitable: false,

    refrigerationSuitable: false,
    freezingSuitable: false,

    dryingRequired: false,
    curingRequired: false,
    shellingRequired: false,
    threshingRequired: false,
    cookingRequired: false,
    grindingRequired: false,

    moistureSensitive: true,

    moldRiskScore: 3,
    rodentRiskScore: 3,
    storedInsectRiskScore: 2,

    harvestEaseScore: 5,
    preparationEaseScore: 5,
    beginnerSuitabilityScore: 5,

    householdFoodValueScore: 2,
    flockValueScore: 5,

    safetyWarnings: [
      "Use only mature, sound heads that show no mold, decay, musty odor, or abnormal heating.",
      "A freshly harvested head still contains moisture and should not be sealed for storage.",
      "Do not offer chemically treated planting seed."
    ],

    incompatibleUserTraits: [
      "requires-long-term-storage",
      "wants-loose-measured-seed-only"
    ]
  },

  {
    id: "whole-dried-seed-head",

    label:
      "Whole Dried Sunflower Seed Head",

    description:
      "A mature Sunflower head dried under protected, ventilated conditions and stored whole for later flock enrichment.",

    primaryFeedRole:
      "energy-enrichment",

    harvestProducts: [
      "dried-seed-heads"
    ],

    suitableFeedingMethods: [
      "whole-seed-heads",
      "winter-storage",
      "seasonal-enrichment"
    ],

    requiredProcessingTasks: [
      "cut-seed-heads",
      "dry"
    ],

    optionalProcessingTasks: [
      "clean-sort"
    ],

    requiredEquipment: [
      "hand-pruners"
    ],

    helpfulEquipment: [
      "drying-rack",
      "drying-screen",
      "fan",
      "bird-netting",
      "food-safe-bucket",
      "metal-grain-can"
    ],

    harvestPattern:
      "several",

    harvestFrequencyCategory:
      "seasonal",

    storageMethods: [
      "dried-whole"
    ],

    preferredStorageMethod:
      "dried-whole",

    storageDurationCategory:
      "medium-long",

    nonElectricStorageSuitable: true,

    refrigerationSuitable: false,
    freezingSuitable: false,

    dryingRequired: true,
    curingRequired: false,
    shellingRequired: false,
    threshingRequired: false,
    cookingRequired: false,
    grindingRequired: false,

    moistureSensitive: true,

    moldRiskScore: 4,
    rodentRiskScore: 4,
    storedInsectRiskScore: 3,

    harvestEaseScore: 4,
    preparationEaseScore: 4,
    beginnerSuitabilityScore: 4,

    householdFoodValueScore: 2,
    flockValueScore: 5,

    safetyWarnings: [
      "Dry heads thoroughly before placing them in enclosed storage.",
      "Do not store heads that feel damp, show condensation, smell musty, or develop visible mold.",
      "Inspect stored heads regularly for insects, rodents, moisture, heating, and decay.",
      "Do not feed moldy, musty, heated, or otherwise questionable seed heads.",
      "Do not feed chemically treated planting seed."
    ],

    incompatibleUserTraits: [
      "declines-drying",
      "has-no-protected-drying-area",
      "has-no-rodent-protected-storage"
    ]
  },

  {
    id: "loose-dried-seed",

    label:
      "Loose Dried Sunflower Seed",

    description:
      "Mature seed removed from adequately dried heads, cleaned, and stored in a dry protected container for measured supplemental feeding.",

    primaryFeedRole:
      "energy-fat",

    harvestProducts: [
      "dry-seeds"
    ],

    suitableFeedingMethods: [
      "whole-grain",
      "measured-supplement",
      "winter-storage"
    ],

    requiredProcessingTasks: [
      "cut-seed-heads",
      "dry",
      "remove-seed",
      "clean-sort"
    ],

    optionalProcessingTasks: [
      "winnow"
    ],

    requiredEquipment: [
      "hand-pruners"
    ],

    helpfulEquipment: [
      "drying-rack",
      "drying-screen",
      "fan",
      "food-safe-bucket",
      "metal-grain-can",
      "moisture-meter"
    ],

    harvestPattern:
      "major",

    harvestFrequencyCategory:
      "seasonal",

    storageMethods: [
      "dried-shelled"
    ],

    preferredStorageMethod:
      "airtight-after-adequate-drying",

    storageDurationCategory:
      "medium-long",

    nonElectricStorageSuitable: true,

    refrigerationSuitable: false,
    freezingSuitable: false,

    dryingRequired: true,
    curingRequired: false,
    shellingRequired: false,
    threshingRequired: false,
    cookingRequired: false,
    grindingRequired: false,

    moistureSensitive: true,

    moldRiskScore: 4,
    rodentRiskScore: 5,
    storedInsectRiskScore: 4,

    harvestEaseScore: 3,
    preparationEaseScore: 3,
    beginnerSuitabilityScore: 3,

    householdFoodValueScore: 3,
    flockValueScore: 4,

    safetyWarnings: [
      "Seed must be adequately dried before it is sealed in an airtight container.",
      "Do not mix questionable seed with sound seed.",
      "Inspect stored seed regularly for insects, rodents, moisture, heating, and mold.",
      "Discard moldy, musty, heated, or otherwise questionable seed.",
      "Do not feed salted, flavored, seasoned, candy-coated, or chemically treated seed."
    ],

    incompatibleUserTraits: [
      "declines-drying",
      "declines-seed-removal",
      "requires-minimal-processing",
      "has-no-dry-storage",
      "has-no-rodent-protected-storage"
    ]
  }
],

      dataQuality: {
        overallConfidence: null,

        verifiedFields: [
          "identity",
          "lifecycle",
          "site.productiveMinimumSunHours",
          "site.preferredSunHours",
          "soil.preferredPHMinimum",
          "soil.preferredPHMaximum",
          "soil.directFacts.preferredDrainage",
          "water.directFacts.droughtTolerantAfterEstablishment",
          "water.directFacts.establishmentMoistureImportant",
          "space.directFacts.layoutFlexible",
          "space.directFacts.blockPollinationRequired",
          "space.directFacts.suitableForRowPlanting",
          "space.directFacts.suitableForCloselySpacedStands",
          "space.directFacts.commercialPlantPopulationRange",
          "flock.directFacts.edibleFeedParts",
          "flock.directFacts.nutritionalOrientation",
          "usePaths.fresh-mature-seed-head.harvestProducts",
          "usePaths.whole-dried-seed-head.harvestProducts",
          "usePaths.loose-dried-seed.harvestProducts",
          "labor.directFacts.seedSize",
"labor.directFacts.directSeedingSuitable",
"risks.directFacts.exceptionallyAttractiveToWildBirds",
"risks.directFacts.exposedSeedAccessibleToBirds",
"risks.directFacts.matureHeadProvidesBirdPerch",
"risks.directFacts.multipleDiseasesPossible",
"risks.directFacts.moistureControlImportantDuringStorage",
"risks.directFacts.timelyHarvestCanReduceFieldLoss",
"seasonalRoles.directFacts.warmSeasonAnnual",
"seasonalRoles.directFacts.physiologicalMaturityStage",
"seasonalRoles.directFacts.maturityIndicators",
"seasonalRoles.directFacts.approximatePhysiologicalMaturityAfterBloomDaysMinimum",
"seasonalRoles.directFacts.approximatePhysiologicalMaturityAfterBloomDaysMaximum",
"climate.minimumSoilTemperatureF",
"climate.referenceDaysToPhysiologicalMaturity",
"climate.directFacts.baseGrowingDegreeTemperatureF",
"soil.directFacts.effectiveRootDepthIn",
"soil.directFacts.soilPHSourceRanges",
"water.directFacts.irrigatedSeasonalWaterUseInches",
"water.directFacts.irrigationResponse",
"space.directFacts.containerCultivarFeasibility"
        ],

        derivedFields: [
          "space.smallSpaceScore",
          "space.mediumSpaceScore",
          "space.largeSpaceScore",
          "space.layoutScores",
          "space.spaceTypeScores",
          "space.verticalSupportBenefitScore",
          "space.overflowSpaceBenefitScore",
          "space.heightCategory",
          "space.matureWidthCategory",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "flock.directRunSuitabilityScore",
          "flock.forageFrameSuitabilityScore",
          "flock.rotationalPaddockSuitabilityScore",
          "flock.confinedFlockValueScore",
          "flock.pasturedFlockValueScore",
          "flock.treatDilutionRiskScore",
          "usePaths.fresh-mature-seed-head.harvestEaseScore",
          "usePaths.fresh-mature-seed-head.preparationEaseScore",
          "usePaths.fresh-mature-seed-head.beginnerSuitabilityScore",
          "usePaths.whole-dried-seed-head.harvestEaseScore",
          "usePaths.whole-dried-seed-head.preparationEaseScore",
          "usePaths.whole-dried-seed-head.beginnerSuitabilityScore",
          "usePaths.loose-dried-seed.harvestEaseScore",
          "usePaths.loose-dried-seed.preparationEaseScore",
          "usePaths.loose-dried-seed.beginnerSuitabilityScore",
          "labor.beginnerFriendlinessScore",
"labor.plantingEaseScore",
"labor.establishmentEaseScore",
"labor.routineMaintenanceEaseScore",
"labor.weedControlEaseScore",
"labor.wildlifeProtectionEaseScore",
"labor.harvestEaseScore",
"labor.wholeHeadProcessingEaseScore",
"labor.looseSeedProcessingEaseScore",
"labor.dryingEaseScore",
"labor.storageMonitoringEaseScore",
"labor.suitableForLowTimeUsersScore",
"labor.suitableForSoloGrowersScore",
"cost",
"goals",
"risks.wildlife",
"risks.insectsRiskScore",
"risks.diseaseRiskScore",
"risks.lodgingRiskScore",
"risks.fieldMoldRiskScore",
"risks.dryingMoldRiskScore",
"risks.storageMoldRiskScore",
"risks.storedInsectRiskScore",
"risks.cropFailureRiskScore",
"seasonalRoles.plantingWindows",
"seasonalRoles.harvestWindows",
"climate.heatToleranceScore",
"climate.droughtClimateToleranceScore",
"climate.humidityToleranceScore",
"climate.coolSummerToleranceScore",
"climate.frostSensitivityScore",
"climate.indoorSeedStartingBenefitScore",
"site.shadeToleranceScore",
"site.afternoonShadeBenefitInHeat",
"site.windToleranceScore",
"site.lodgingRiskScore",
"site.reflectedHeatToleranceScore",
"site.airflowRequirementScore",
"site.frostPocketSensitivityScore",
"site.treeRootCompetitionToleranceScore",
"soil.textureScores",
"soil.drainageRequirementScore",
"soil.temporaryWetToleranceScore",
"soil.waterloggingSensitivityScore",
"soil.preferredSoilDepthIn",
"soil.compactionToleranceScore",
"soil.establishmentInSodDifficultyScore",
"soil.fertilityRequirementScore",
"soil.nitrogenRequirementScore",
"soil.phosphorusRequirementScore",
"soil.potassiumRequirementScore",
"water.overallWaterRequirementLevel",
"water.germinationWaterNeedLevel",
"water.establishmentWaterNeedLevel",
"water.matureWaterNeedLevel",
"water.floweringWaterNeedLevel",
"water.harvestDevelopmentWaterNeedLevel",
"water.droughtSurvivalScore",
"water.droughtYieldRetentionScore",
"water.criticalStageWaterImportanceScore",
"water.overwateringSensitivityScore",
"water.waterloggingSensitivityScore",
"water.dripIrrigationBenefitScore",
"water.mulchBenefitScore",
"water.suitableForRainfallOnlyScore",
"water.suitableForLimitedIrrigationScore",
"water.containerDryingRiskScore",
"space.spaceTypeScores.container"
        ],

        uncertainFields: [
             "climate.minimumFrostFreeDays",
             "climate.preferredFrostFreeDays",
             "climate.minimumSoilTemperatureF",
             "climate.preferredSoilTemperatureF",
             "climate.daysToMaturityMinimum",
             "climate.daysToMaturityMaximum",
             "climate.dryDownBufferDays",
             "space.minimumTrialAreaSqFt",
             "space.minimumUsefulAreaSqFt",
             "space.preferredProductionAreaSqFt",
             "space.spaceTypeScores.container",
             "space.minimumContainerGallons",
             "space.minimumRaisedBedDepthIn",
             "soil.minimumSoilDepthIn",
             "soil.saltToleranceScore",
             "flock.portionGuidance",
             "usePaths.fresh-mature-seed-head.storageDurationCategory",
             "usePaths.whole-dried-seed-head.storageDurationCategory",
             "usePaths.loose-dried-seed.storageDurationCategory",
             "usePaths.fresh-mature-seed-head.moldRiskScore",
             "usePaths.whole-dried-seed-head.moldRiskScore",
             "usePaths.loose-dried-seed.moldRiskScore",
             "usePaths.loose-dried-seed.storedInsectRiskScore",
             "labor.wildlifeProtectionEaseScore",
             "cost.protectionCostLevel",
             "goals.feedReductionScore",
             "goals.productionReliabilityScore",
             "risks.wildlife.deer",
             "risks.wildlife.raccoons",
             "risks.wildlife.squirrels",
             "risks.wildlife.rabbits",
             "risks.wildlife.rodents",
             "risks.wildlife.groundhogs",
             "risks.insectsRiskScore",
             "risks.diseaseRiskScore",
             "risks.fieldMoldRiskScore",
             "risks.spoilageSpeedRiskScore"
        ],

        missingFields: [
         "space.minimumTrialAreaSqFt",
  "space.minimumUsefulAreaSqFt",
  "space.preferredProductionAreaSqFt",
  "space.minimumContainerGallons",
  "space.minimumRaisedBedDepthIn",
  "flock.portionGuidance",
  "flock.usePathTesting"
        
        ],

        lastReviewed:
          "2026-07-14",

        primarySources: [],

        notes: [
          "Planner skeleton created before detailed planner-specific research.",
          "The whole-dried-seed-head use path is a structural prototype and is not yet fully scored.",
          "Do not change developmentStatus to ready until every required section and use path has been researched, validated, and tested.",
          "Direct climate, sunlight, soil, and water facts were added during the first planner research pass.",
          "Planner suitability and risk ratings remain null until the rating pass compares Sunflower consistently with the other crops.",
          "Generic days-to-flower figures were not used as mature-seed harvest requirements.",
          "Space and layout ratings were added as internal planner derivations based on Sunflower spacing flexibility, plant form, pollination behavior, and backyard harvest usefulness.",
          "Commercial plant populations were retained only as reference facts and were not converted into backyard yield or minimum-area claims.",
          "Container suitability and minimum container volume remain null pending cultivar-specific research.",
          "Minimum trial, useful, and production areas remain null because no defensible backyard flock threshold has been established.",
          "Flock suitability was separated from crop-growing suitability because Sunflower plants are poor living forage but harvested mature heads have strong enrichment value.",
          "Fresh-head, dried-head, and loose-seed paths are scored separately because they require different processing, storage, labor, and equipment.",
          "Sunflower is classified as an energy- and fat-oriented supplement rather than a complete poultry ration.",
          "Exact feeding portions remain outside the planner record until defensible backyard supplementation guidance is established.",
          "Labor ratings distinguish easy direct seeding from the greater work required for bird protection, drying, loose-seed removal, and storage.",
          "Cost values are qualitative first-season planner categories rather than current retail-price estimates.",
          "Goal ratings measure practical backyard usefulness rather than laboratory nutrient concentration alone.",
          "Wild-bird risk is treated as one of Sunflower's strongest and best-supported limitations.",
          "Seasonal harvest timing uses physiological maturity as a crop-development marker and does not treat it as proof of safe storage dryness.",
          "Remaining climate, soil, water, container, minimum-area, and feeding-portion fields require additional research or cross-crop comparison."
        ]
       }
    }

},

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - COWPEAS
    //
    //
    //
    //
    //////////////////////////////////////////////

  "CROP-COWPEA": {
    id: "CROP-COWPEA",

    name: "Cowpeas",
    scientificName: "Vigna unguiculata",

    category: "Protein-Oriented Legume",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Cowpeas are heat- and drought-tolerant warm-season legumes that can provide edible leaves, immature pods, mature protein-rich seeds, poultry forage, and soil-building benefits through biological nitrogen fixation.",

    chickenUse: {
      edibleParts: [
        "Mature seeds",
        "Immature seeds and pods",
        "Leaves",
        "Tender forage growth"
      ],

      primaryValue: [
        "Protein-oriented seed",
        "Carbohydrate energy",
        "Lysine",
        "Fresh forage",
        "Soil improvement",
        "Seasonal enrichment"
      ],

      feedingForms: [
        "Properly cooked mature seeds",
        "Heat-treated and ground seeds",
        "Dehulled and roasted seeds",
        "Limited amounts of fresh tender leaves",
        "Controlled access to growing forage"
      ],

      bestFor: [
        "Adult chickens as a supplemental food",
        "Warm-climate feed gardens",
        "Growers seeking a protein-oriented crop",
        "Seasonal forage plots",
        "Gardens needing a nitrogen-fixing rotation crop"
      ],

      supplementOnly: true,

      preparationNotes:
        "Mature cowpea seeds should preferably be processed before being offered in meaningful quantities. Cooking, roasting, dehulling, grinding, or another validated processing method can reduce antinutritional factors and improve nutrient use. Allow cooked seeds to cool completely before offering them, and avoid seasoned or salted products.",

      safetyNotes:
        "Raw cowpea seeds contain protease inhibitors, non-starch polysaccharides, pectins, phenolic compounds, tannins, and other antinutritional factors that can reduce protein quality and nutrient digestibility. Do not assume that raw homegrown beans can directly replace soybean meal or a balanced poultry ration. Avoid moldy, spoiled, pesticide-contaminated, or improperly stored seed."
    },

    nutrition: {
      basis:
        "Approximate mature whole-seed values expressed primarily on a dry-matter basis. Values vary by variety, environment, seed coat, maturity, and processing method.",

      crudeProteinPercent:
        "Approximately 25.2% of dry matter on average; reported samples ranged from about 18.2% to 30.4%",

      fatPercent:
        "Approximately 1.6% ether extract on a dry-matter basis",

      fiberPercent:
        "Approximately 5.6% crude fiber on a dry-matter basis; average NDF approximately 16.6%",

      calciumPercent:
        "Approximately 0.11% of dry matter, based on an average of 1.1 g/kg DM",

      phosphorusPercent:
        "Approximately 0.42% of dry matter, based on an average of 4.2 g/kg DM",

      notableNutrients: [
        "Relatively high lysine for a grain legume",
        "Approximately 47.8% starch on a dry-matter basis",
        "Phosphorus",
        "Potassium",
        "Magnesium",
        "Iron",
        "Zinc",
        "Folate and other B vitamins in mature seed"
      ],

      limitations: [
        "Low in sulfur-containing amino acids, especially methionine and cysteine",
        "Contains protease inhibitors and other antinutritional factors",
        "Raw-seed nutrient digestibility may be lower than the crude-protein number suggests",
        "Calcium content is far below the needs of laying hens when considered as a primary feed",
        "Mineral phosphorus is not necessarily fully available to poultry",
        "Seed, forage, pods, and cooked beans have substantially different nutrient profiles",
        "Cowpea alone cannot provide a nutritionally complete poultry diet"
      ]
    },

    growing: {
      sunlight: "Full sun",

      soilTemperatureMinimumF: 65,

      idealSoilTemperatureF:
        "Approximately 65°F or warmer for dependable outdoor germination",

      frostTolerance: "Very Low",

      heatTolerance: "High",

      droughtTolerance:
        "High after establishment, although adequate moisture supports better flowering, pod set, and seed development",

      soilPHMinimum: 5.5,
      soilPHMaximum: 6.5,

      waterNeeds:
        "Low to moderate after establishment. Water thoroughly during germination and establishment; prolonged drought during flowering and pod filling may reduce yield.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: 40,
      daysToFirstHarvestMaximum: 59,

      daysToMaturityMinimum: 110,
      daysToMaturityMaximum: 120,

      plantSpacingInches:
        "Approximately 1.5 inches within the row in closely planted production guidance; wider spacing may be appropriate for spreading, climbing, or home-garden varieties",

      rowSpacingInches:
        "Approximately 20 to 30 inches",

      plantingDepthInches:
        "Approximately 1/2 inch",

      successionPlanting:
        "Possible in sufficiently long, warm growing seasons",

      regrowthAfterHarvest:
        "Possible after light defoliation when adequate buds and growing points remain"
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Direct sow after all frost danger has passed and soil reaches approximately 65°F. Select an early-maturing variety because mature dry seed may require 110 to 120 days.",
        harvestWindow:
          "Leaves may be harvested during summer, pods from mid- to late summer, and mature seed near the end of the frost-free season if the variety reaches maturity."
      },

      midwestNortheast: {
        plantingWindow:
          "Direct sow after the final frost once soil has warmed to approximately 65°F, commonly from late spring into early summer.",
        harvestWindow:
          "Leaves in early to midsummer, fresh pods in midsummer, and mature seed from late summer into early fall."
      },

      upperSouth: {
        plantingWindow:
          "Direct sow in late spring after frost danger and once the soil is warm. Additional plantings may be possible through early summer.",
        harvestWindow:
          "Leaves and tender forage during summer, fresh pods in summer, and mature seed from late summer into fall."
      },

      deepSouth: {
        plantingWindow:
          "Direct sow from spring into early summer after frost danger has passed. In long-season areas, later plantings may also mature before fall frost.",
        harvestWindow:
          "Leaves and pods through the warm season, with mature dry seed commonly harvested from summer into fall depending on planting date."
      },

      southwest: {
        plantingWindow:
          "Plant after frost once soil reaches approximately 65°F. Irrigation may be needed for establishment and during flowering despite the crop’s drought tolerance.",
        harvestWindow:
          "Summer through fall, depending on elevation, planting date, water availability, and heat."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant only after soil has warmed to approximately 65°F. Use early varieties and the warmest available garden location in cool-summer areas.",
        harvestWindow:
          "Leaves and immature pods may be more dependable than mature dry seed in cooler or shorter-season locations."
      },

      coastalWest: {
        plantingWindow:
          "Plant after frost when soil is consistently warm. Inland and warmer coastal valleys are generally better suited than cool, foggy locations.",
        harvestWindow:
          "Summer through fall, depending on local warmth and variety maturity."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: 38,
      plantsPer50SquareFeet: 192,
      plantsPer100SquareFeet: 384,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Properly dried mature seed may store for many months when protected from moisture, insects, heat, and rodents",

      storageMethod:
        "Allow pods and seeds to mature and dry thoroughly. Shell and clean the seed, then store it in a cool, dry, dark location inside a sealed food-safe and rodent-resistant container. Inspect periodically for insects, condensation, mold, or off odors.",

      yieldNotes:
        "Plant-density estimates are calculated from approximately 1.5 inches between plants and a midpoint row spacing of 25 inches, based on University of Minnesota Extension guidance for closely planted cowpeas. This produces estimated populations of approximately 38 plants per 10 square feet, 192 plants per 50 square feet, and 384 plants per 100 square feet. These figures are most appropriate for compact, erect, or semi-erect varieties managed in rows. Spreading, trailing, climbing, forage-oriented, or widely branched varieties may require substantially more room. USDA plant guidance reports roughly 2,500 to 4,500 pounds of forage dry matter per acre per year under cover-crop or forage conditions, but that figure should not be converted directly into backyard edible-seed yield. Seed yield remains unverified because it varies greatly by cultivar, growth habit, fertility, moisture, pest pressure, harvest stage, and whether the crop is managed for forage or grain."
    },

    economics: {
      seedCostEstimate:
        "Generally low to moderate, depending on whether seed is purchased as a garden variety, food-grade dry bean, wildlife planting, or bulk agricultural seed",

      equipmentCostEstimate:
        "Low for bush or semi-erect varieties; climbing or trailing varieties may require support. Optional expenses include inoculant, irrigation, drying equipment, shelling tools, and storage containers.",

      irrigationCostLevel: "Low to Moderate",

      laborLevel:
        "Moderate to High when mature seed is hand-picked, dried, shelled, processed, and stored",

      potentialFeedSavings: null,

      economicNotes:
        "Cowpeas may offer several forms of value: edible household food, poultry supplementation, summer forage, weed suppression, erosion protection, and nitrogen contribution to a following crop. Direct poultry-feed savings cannot be estimated responsibly until backyard seed yield, processing costs, safe inclusion levels for the intended flock, and comparable feed values are known."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for basic cultivation, seed composition, amino-acid limitations, and the presence of antinutritional factors; moderate for processed cowpea use in formulated broiler diets; limited for informal supplementation of backyard laying hens and backyard seed yield",

      sources: [
        {
          title:
            "Growing Staple Vegetables from Around the World in Minnesota",
          organization:
            "University of Minnesota Extension",
          url:
            "https://extension.umn.edu/vegetables/growing-staple-vegetables-around-world-minnesota",
          use:
            "Soil temperature, planting depth, row and plant spacing, harvest timing, soil pH, nitrogen fixation, water needs, and common pests"
        },

        {
          title:
            "Cowpea (Vigna unguiculata) Plant Guide",
          organization:
            "USDA Natural Resources Conservation Service",
          url:
            "https://plants.sc.egov.usda.gov/DocumentLibrary/plantguide/pdf/pg_viun.pdf",
          use:
            "Seed composition, edible plant parts, forage use, regrowth after light defoliation, dry-matter production, nitrogen contribution, erosion control, and crop adaptation"
        },

        {
          title:
            "Cowpeas in Poultry Diets",
          organization:
            "University of Kentucky / National Cooperative Extension Poultry Resource",
          url:
            "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/legumes-in-poultry-feed/cowpeas-in-poultry-diets/",
          use:
            "Poultry suitability, heat and drought tolerance, amino-acid profile, methionine and cysteine limitation, lysine value, and antinutritional factors"
        },

        {
          title:
            "Cowpea (Vigna unguiculata) Seeds",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/232",
          use:
            "Processing recommendations and research on processed cowpea inclusion in formulated poultry diets"
        },

        {
          title:
            "Cowpea Seeds — Chemical Composition Table",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/11572",
          use:
            "Dry matter, crude protein, fiber, fat, starch, minerals, amino acids, and tannin values"
        },

        {
          title:
            "Cowpea Seeds, Heat-Treated — Chemical Composition Table",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/11573",
          use:
            "Composition and poultry energy information for heat-treated seed"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Identify specific cowpea varieties best suited to seed production versus leafy forage.",
        "Do not apply commercial broiler-diet inclusion percentages directly to backyard laying hens.",
        "Research whether limited grazing of living cowpea plants presents any poultry-specific management concerns.",
        "Find credible backyard or small-plot mature-seed yield data before calculating yield per square foot.",
        "Separate fresh-leaf forage nutrition from mature-seed nutrition.",
        "Determine practical small-batch processing methods that reliably reduce antinutritional factors.",
        "Compare the cost and labor of cooked or roasted cowpeas with purchased complete poultry feed.",
        "Research cowpea curculio, aphids, mites, beetles, and other regionally important pests.",
        "Calculate scores only after multiple crops have comparable evidence and complete data.",
        "Plant-density estimates use approximately 1.5 inches between plants and a midpoint row spacing of 25 inches; these values are intended for compact or semi-erect row-grown varieties rather than spreading or climbing cowpeas.",
      ]
    },

    plannerData: {
  schemaVersion: "1.0.0",

  developmentStatus:
    "ready",

  identity: {
    plannerName:
      "Cowpeas",

    shortLabel:
      "Cowpea",

    icon:
      "🫘",

    cropCategory:
      "legume",

    primaryFeedCategory:
      "protein-oriented",

    guideUrl:
      "growing-cowpeas-for-chickens.html"
  },

  lifecycle: {
    growthCycle:
      "annual",

    isAnnual: true,
    isBiennial: false,
    isPerennial: false,
    isTreeOrShrub: false,

    yearsToFirstUsefulHarvest: 0,
    yearsToFullProduction: 0,
    expectedUsefulLifeYears: 1,

    regrowsAfterHarvest: true,

    permanentPlantingRequired: false,
    reversibleAfterOneSeason: true
  },

  climate: {
    suitableClimateTypes: [
      "temperate",
      "hot-humid",
      "hot-dry",
      "mild-winter"
    ],

    preferredClimateTypes: [
      "hot-humid",
      "hot-dry"
    ],

    challengingClimateTypes: [
      "cold-short-summer",
      "cool-moderate-summer",
      "high-elevation"
    ],

    minimumFrostFreeDays: null,
    preferredFrostFreeDays: null,

    minimumSoilTemperatureF: 65,
    preferredSoilTemperatureF: 70,

    daysToMaturityMinimum: null,
    daysToMaturityMaximum: null,

    dryDownBufferDays: null,

    heatToleranceScore: 5,

    droughtClimateToleranceScore: 5,

    humidityToleranceScore: 4,

    coolSummerToleranceScore: 2,

    frostSensitivityScore: 5,

    winterHardinessRequired: false,

    seasonExtensionBenefits: [
      "Black plastic or other soil-warming methods may improve establishment in cool spring conditions.",
      "Selecting an early bush variety may improve mature-seed success in shorter growing seasons.",
      "Indoor starting may provide limited benefit, but Cowpeas are generally straightforward to direct-seed after the soil warms."
    ],

    indoorSeedStartingBenefitScore: 2,

    directFacts: {
      seasonType:
        "warm-season",

      frostSensitive: true,

      plantAfterFrostDanger: true,

      warmSoilRequired: true,

      germinationSoilTemperatureFMinimum:
        65,

      preferredGerminationSoilTemperatureF:
        70,

      optimumGrowthTemperatureFApproximate:
        86,

      maturityHighlyVarietyDependent:
        true,

      notes: [
        "Cowpeas are heat-loving warm-season legumes.",
        "Cold soil can delay germination and increase seed-decay risk.",
        "The crop performs especially well during hot summer weather.",
        "Cowpeas tolerate drought better than many garden legumes after establishment.",
        "Drought during flowering and pod filling can still reduce pod and mature-seed production.",
        "Bush, semi-vining, and trailing cultivars can differ considerably in maturity and space use.",
        "Exact maturity ranges remain null until the planner separates leaf, fresh-pod, and dry-seed production by variety."
      ]
    }
  },

  site: {
    absoluteMinimumSunHours: null,

    productiveMinimumSunHours: 6,

    preferredSunHours: 8,

    shadeToleranceScore: 2,

    afternoonShadeBenefitInHeat: 2,

    windToleranceScore: 4,

    lodgingRiskScore: 2,

    reflectedHeatToleranceScore: 5,

    airflowRequirementScore: 4,

    frostPocketSensitivityScore: 5,

    treeRootCompetitionToleranceScore: 3,

    hardscapeConflictRiskScore: 2,

    structureConflictRiskScore: 2,

    utilityConflictRiskScore: 1,

    fruitDropMessRiskScore: 1,

    stainingRiskScore: 1,

    directFacts: {
      preferredLight:
        "full-sun",

      productiveSunGuidance:
        "At least 6 hours of direct sunlight, with approximately 8 hours preferred for dense growth, flowering, and pod production.",

      windExposureConcern:
        false,

      growthHabits: [
        "bush",
        "semi-vining",
        "trailing",
        "climbing"
      ],

      notes: [
        "Cowpeas perform best in full sun.",
        "Reduced light can lower flowering, pod production, and stand density.",
        "Bush cultivars are easier to contain in beds and rows.",
        "Trailing and climbing cultivars may use fences or trellises but can spread into nearby crops.",
        "Cowpeas tolerate reflected summer heat better than most cool-season garden crops.",
        "Good airflow is valuable in humid regions because dense foliage can retain moisture.",
        "The crop is highly frost sensitive and should not be placed in cold low spots when the growing season is marginal."
      ]
    }
  },

  soil: {
    textureScores: {
      heavyClay: 2,
      clayLoam: 4,
      loam: 5,
      sandyLoam: 5,
      verySandy: 4,
      rocky: 2
    },

    drainageRequirementScore: 5,

    temporaryWetToleranceScore: 2,

    waterloggingSensitivityScore: 4,

    minimumSoilDepthIn: null,
    preferredSoilDepthIn: 18,

    compactionToleranceScore: 2,

    establishmentInSodDifficultyScore: 4,

    preferredPHMinimum: 5.5,
    preferredPHMaximum: 7.0,

    survivalPHMinimum: null,
    survivalPHMaximum: null,

    fertilityRequirementScore: 2,

    nitrogenRequirementScore: 1,
    phosphorusRequirementScore: 3,
    potassiumRequirementScore: 3,

    benefitsFromInoculation: true,

    inoculantType:
      "Cowpea-group Bradyrhizobium inoculant",

    saltToleranceScore: null,

    amendmentEffortScore: 2,

    directFacts: {
      preferredDrainage:
        "well-drained",

      preferredTextures: [
        "sandy loam",
        "loam",
        "well-drained clay loam"
      ],

      poorSoilAdaptation:
        true,

      sandySoilAdaptation:
        true,

      waterloggedSoilSuitable:
        false,

      nitrogenFixingLegume:
        true,

      inoculationMayImproveNodulation:
        true,

      notes: [
        "Cowpeas are notably adaptable to sandy and relatively low-fertility soils.",
        "Well-drained loam or sandy loam is especially suitable.",
        "Heavy or compacted clay receives a low rating when drainage and root development are restricted.",
        "Cowpeas can obtain much of their nitrogen through symbiotic nitrogen fixation when compatible bacteria are present.",
        "Cowpea-group inoculant may improve nodulation where Cowpeas or compatible legumes have not recently grown.",
        "Nitrogen fixation does not remove the crop's need for suitable phosphorus, potassium, sulfur, pH, and general soil health.",
        "Large nitrogen applications can encourage foliage while reducing the plant's reliance on biological nitrogen fixation.",
        "The stored pH range is a productive planning range rather than an absolute survival boundary."
      ]
    }
  },

  water: {
    overallWaterRequirementLevel:
      "low",

    germinationWaterNeedLevel:
      "moderate",

    establishmentWaterNeedLevel:
      "moderate",

    matureWaterNeedLevel:
      "low",

    floweringWaterNeedLevel:
      "moderate",

    harvestDevelopmentWaterNeedLevel:
      "moderate",

    droughtSurvivalScore: 5,

    droughtYieldRetentionScore: 4,

    criticalGrowthStages: [
      "germination",
      "seedling-establishment",
      "flowering",
      "pod-setting",
      "seed-filling"
    ],

    criticalStageWaterImportanceScore: 4,

    overwateringSensitivityScore: 4,

    waterloggingSensitivityScore: 4,

    dripIrrigationBenefitScore: 4,

    mulchBenefitScore: 4,

    suitableForRainfallOnlyScore: 4,

    suitableForLimitedIrrigationScore: 5,

    containerDryingRiskScore: 4,

    establishmentYearsRequiringExtraWater: 0,

    directFacts: {
      droughtTolerantAfterEstablishment:
        true,

      establishmentMoistureImportant:
        true,

      floweringMoistureImportant:
        true,

      podFillMoistureImportant:
        true,

      standingWaterSuitable:
        false,

      notes: [
        "Cowpeas are among the strongest limited-irrigation crops in the initial planner database.",
        "Seed needs moisture for germination and early establishment.",
        "Established plants can tolerate extended dry periods better than many common vegetables.",
        "Severe moisture stress during flowering, pod set, and seed filling can reduce usable harvest.",
        "Excess irrigation and saturated soil can increase root and disease problems.",
        "Drip irrigation can provide critical-stage water while keeping foliage drier in humid climates.",
        "Mulch can conserve moisture, but extremely thick wet mulch should not remain against stems.",
        "Container-grown Cowpeas may dry considerably faster than plants rooted in open soil."
      ]
    }
  },

  space: {
    minimumTrialAreaSqFt: null,

    minimumUsefulAreaSqFt: null,

    preferredProductionAreaSqFt: null,

    smallSpaceScore: 5,

    mediumSpaceScore: 5,

    largeSpaceScore: 4,

    layoutScores: {
      squareBlock: 4,
      wideRectangle: 5,
      longStrip: 5,
      irregular: 4,
      smallBeds: 5,
      openField: 5
    },

    spaceTypeScores: {
      inGround: 5,
      raisedBed: 5,
      container: 4,
      fenceLine: 5,
      buildingEdge: 4,
      unusedLawn: 4,
      openField: 5,
      orchard: 3,
      forageFrame: 3,
      rotationalPaddock: 4,
      greenhouse: 2,
      hedgerow: 4
    },

    minimumContainerGallons: null,

    containerUseLimitation:
      "Bush or compact Cowpeas can produce leaves and some pods in containers, but container volume and frequent watering limit larger feed harvests.",

    minimumRaisedBedDepthIn: null,

    vineSpreadRequired: false,

    verticalSupportBenefitScore: 4,

    blockPlantingRequired: false,

    minimumBlockRows: null,

    continuousStandPreferred: false,

    heightCategory:
      "variety-dependent-low-to-vining",

    matureWidthCategory:
      "variety-dependent",

    overflowSpaceBenefitScore: 4,

    directFacts: {
      layoutFlexible: true,

      blockPollinationRequired: false,

      bushVarietiesAvailable: true,

      viningVarietiesAvailable: true,

      trellisOptionalByVariety: true,

      suitableForSuccessiveHarvest:
        true,

      notes: [
        "Cowpeas can be planted in beds, rows, long strips, containers, or larger field stands.",
        "Bush cultivars provide the strongest small-bed and container fit.",
        "Trailing cultivars can cover open soil and suppress weeds but require more lateral space.",
        "Climbing or semi-vining cultivars may be trained along fences or trellises.",
        "The crop does not require Corn-style block planting.",
        "Plants grown for foliage can be planted and managed differently from plants grown for dry seed.",
        "Unprotected plants inside a chicken run may be eaten or scratched out before they establish.",
        "Protected strips, rotational paddocks, or cut-and-carry beds are more practical than permanent unrestricted run planting.",
        "Minimum useful and production areas remain null until tested against flock size and harvest form."
      ]
    }
  },

  flock: {
    suitableForAdultChickens: true,

    suitableForYoungChicks: false,

    flockPurposeScores: {
      eggs: 4,
      meat: 4,
      breeding: 3,
      petsEnrichment: 4,
      homestead: 5,
      mixed: 5
    },

    feedingMethodScores: {
      livingGrazing: 3,
      cutAndCarry: 5,
      wholeProduce: 4,
      wholeSeedHeads: 1,
      wholeGrain: 2,
      processedGrain: 4,
      heatTreated: 5,
      driedForage: 3,
      winterStorage: 4
    },

    directRunSuitabilityScore: 2,

    forageFrameSuitabilityScore: 3,

    rotationalPaddockSuitabilityScore: 4,

    confinedFlockValueScore: 5,

    pasturedFlockValueScore: 4,

    treatDilutionRiskScore: 3,

    highEnergySupplement: false,

    highFiberSupplement: true,

    concentratedFatSource: false,

    primaryFlockUses: [
      "Fresh cut-and-carry foliage",
      "Tender immature pods",
      "Cooked mature seed",
      "Summer forage diversity",
      "Protein-oriented supplemental plant material"
    ],

    unsuitablePrimaryUses: [
      "Complete-ration replacement",
      "Unrestricted raw dry-seed feeding",
      "Permanent unprotected run forage",
      "Primary young-chick feed",
      "High-energy grain replacement"
    ],

    directFacts: {
      edibleFeedParts: [
        "Fresh leaves",
        "Tender vine tips",
        "Tender immature pods",
        "Properly prepared mature seed"
      ],

      preferredBirdStage:
        "Established adult chickens",

      cropSurvivalWithDirectChickenAccess:
        "poor-to-moderate-before-establishment",

      directAccessTiming:
        "Allow plants to establish before controlled grazing, or harvest foliage outside the run for cut-and-carry feeding.",

      nutritionalOrientation: [
        "protein-oriented",
        "fresh-forage",
        "fiber",
        "household-food",
        "soil-building"
      ],

      balancedFeedReplacement:
        false,

      notes: [
        "Cowpea foliage and tender pods offer a different use path from mature dry seed.",
        "Fresh plant material is best introduced as a supplemental forage rather than a complete feed.",
        "Mature dry seed is more concentrated but requires greater processing and portion control.",
        "The planner uses a conservative cooked-seed path because dry Cowpea seeds contain antinutritional compounds whose activity can be reduced through appropriate preparation.",
        "Cowpea seed is protein-oriented but does not provide a complete poultry amino-acid, vitamin, mineral, and calcium balance.",
        "Young chicks should continue receiving an age-appropriate complete starter ration.",
        "Direct unrestricted access can destroy a small Cowpea planting before it produces pods or seed."
      ]
    }
  },

  labor: {
    beginnerFriendlinessScore: 4,

    plantingEaseScore: 5,

    establishmentEaseScore: 4,

    routineMaintenanceEaseScore: 4,

    weedControlEaseScore: 4,

    wildlifeProtectionEaseScore: 3,

    harvestEaseScore: 4,

    freshFoliageProcessingEaseScore: 5,

    tenderPodProcessingEaseScore: 5,

    matureSeedProcessingEaseScore: 2,

    dryingEaseScore: 3,

    storageMonitoringEaseScore: 3,

    perennialMaintenanceEaseScore: 5,

    physicalAccessibilityScore: 4,

    heavyLiftingRiskScore: 1,

    weeklyLaborLevel:
      "low",

    peakWorkloadLevel:
      "moderate",

    harvestFrequencyCategory:
      "several-weekly",

    requiredPlantingTasks: [
      "prepare-seedbed",
      "plant-large-seed"
    ],

    optionalPlantingTasks: [
      "inoculate-legume-seed",
      "install-irrigation"
    ],

    requiredMaintenanceTasks: [
      "hand-weed"
    ],

    optionalMaintenanceTasks: [
      "mulch",
      "trellis",
      "protect-from-wildlife"
    ],

    requiredHarvestTasks: [
      "cut-leaves",
      "pick-produce"
    ],

    usePathProcessingTasks: {
      freshFoliage: [
        "cut-leaves"
      ],

      tenderImmaturePods: [
        "pick-produce"
      ],

      matureCookedSeed: [
        "pick-produce",
        "dry",
        "shell-beans",
        "clean-sort",
        "cook"
      ]
    },

    requiredStorageTasks: [
      "inspect-moisture",
      "inspect-insects",
      "inspect-mold"
    ],

    specializedEquipmentRequired: [],

    specializedEquipmentHelpful: [
      "hand-pruners",
      "trellis",
      "stakes",
      "drip-irrigation",
      "drying-screen",
      "fan",
      "food-safe-bucket",
      "metal-grain-can"
    ],

    suitableForLowTimeUsersScore: 4,

    suitableForSoloGrowersScore: 5,

    directFacts: {
      seedSize:
        "large-and-easy-to-handle",

      directSeedingSuitable: true,

      specializedHarvestEquipmentRequiredForBackyardScale:
        false,

      majorLaborBottlenecks: [
        "Repeated foliage or pod harvesting",
        "Protecting plants from deer, rabbits, and insects",
        "Drying mature pods",
        "Shelling dry beans",
        "Cooking mature seed before the planner recommends feeding it",
        "Monitoring stored seed for insects and moisture"
      ],

      notes: [
        "Large seeds make Cowpeas easy to direct-seed.",
        "Bush varieties require little structural management.",
        "Vining varieties may need trellising or redirection.",
        "Fresh foliage and tender pods require almost no processing.",
        "Mature dry seed creates a much larger harvest and processing workload.",
        "Harvest can be continuous for foliage and tender pods or concentrated for mature seed.",
        "Small backyard plots can be managed entirely with ordinary hand tools."
      ]
    }
  },

  cost: {
    seedOrPlantCostLevel:
      "low",

    soilPreparationCostLevel:
      "low",

    irrigationCostLevel:
      "low",

    protectionCostLevel:
      "moderate",

    processingEquipmentCostLevel:
      "low",

    storageCostLevel:
      "low",

    annualRecurringCostLevel:
      "low",

    longTermValueScore: 5,

    lowestCostUsePath:
      "fresh-foliage",

    highestCostUsePath:
      "mature-cooked-seed",

    likelyCostDrivers: [
      "Optional legume inoculant",
      "Trellis or fence support for vining varieties",
      "Deer or rabbit protection",
      "Drying screens",
      "Rodent-resistant storage containers",
      "Cooking fuel or electricity"
    ],

    costReductionOptions: [
      "Choose a bush variety for beds or containers.",
      "Grow fresh foliage and tender pods rather than storing mature seed.",
      "Use an existing fence for vining varieties.",
      "Begin with a small direct-seeded trial.",
      "Save seed from suitable open-pollinated varieties after learning isolation and selection requirements."
    ],

    directFacts: {
      specializedPlantingEquipmentRequired:
        false,

      specializedBackyardHarvestEquipmentRequired:
        false,

      specializedProcessingEquipmentRequired:
        false,

      notes: [
        "Cowpeas can be established inexpensively from seed.",
        "Fertility requirements are generally modest where soil conditions and nodulation are suitable.",
        "The fresh-use paths require little equipment.",
        "The mature-seed path adds drying, shelling, cooking, and protected-storage costs.",
        "Cost classifications are qualitative rather than current retail-price estimates."
      ]
    }
  },

  goals: {
    feedReductionScore: 4,

    energyProductionScore: 3,

    proteinOrientedScore: 5,

    freshGreensScore: 5,

    livingForageScore: 3,

    winterStorageScore: 4,

    enrichmentScore: 4,

    resilienceScore: 5,

    soilImprovementScore: 5,

    nitrogenFixationScore: 5,

    groundCoverScore: 5,

    erosionControlScore: 4,

    shadeScore: 2,

    privacyScreeningScore: 3,

    pollinatorSupportScore: 4,

    compostBiomassScore: 5,

    householdFoodScore: 5,

    seedSavingScore: 5,

    selfRelianceScore: 5,

    multipurposeValueScore: 5,

    visualAppealScore: 3,

    productionReliabilityScore: 4,

    fastestValueScore: 5,

    nonElectricStorageScore: 4,

    smallFlockValueScore: 5,

    largeFlockValueScore: 4,

    primaryGoalMatches: [
      "protein-oriented",
      "fresh-greens",
      "resilience-feed",
      "soil-improvement",
      "nitrogen-fixation",
      "ground-cover",
      "compost-biomass",
      "shared-household-food",
      "seed-saving",
      "self-reliance",
      "use-unused-space"
    ],

    weakGoalMatches: [
      "high-energy",
      "winter-living-forage",
      "permanent-ground-cover",
      "shade-tree",
      "no-processing-dry-seed"
    ],

    directFacts: {
      nitrogenFixingLegume: true,

      humanFoodPotential: true,

      pollinatorBenefit: true,

      groundCoverPotential: true,

      warmSeasonBiomassProduction:
        true,

      seedSavingPossible: true,

      notes: [
        "Cowpeas combine flock supplementation, human-food production, soil cover, biomass, and nitrogen fixation.",
        "Fresh foliage and pods provide rapid first-season value.",
        "Dry seed provides a storable protein-oriented product but requires more processing.",
        "The crop is better suited to protein-oriented goals than to concentrated energy production.",
        "Dense trailing stands can suppress weeds and protect soil.",
        "Nitrogen fixed by the crop does not all become immediately available to the following crop, especially when most biomass is removed.",
        "Open-pollinated varieties can support seed saving, although variety purity and seed health still require attention."
      ]
    }
  },

  risks: {
    wildlife: {
      wildBirds: 3,
      deer: 5,
      raccoons: 2,
      squirrels: 2,
      rabbits: 4,
      rodents: 4,
      groundhogs: 4
    },

    insectsRiskScore: 4,

    diseaseRiskScore: 4,

    lodgingRiskScore: 2,

    fieldMoldRiskScore: 3,

    dryingMoldRiskScore: 4,

    storageMoldRiskScore: 4,

    storedInsectRiskScore: 5,

    spoilageSpeedRiskScore: 3,

    invasivenessConcernRiskScore: 1,

    selfSeedingRiskScore: 2,

    fruitDropRiskScore: 1,

    cropFailureRiskScore: 3,

    stormDamageRiskScore: 2,

    shadingOtherCropsRiskScore: 3,

    overfeedingRiskScore: 3,

    treatedSeedRiskScore: 5,

    primaryRisks: [
      {
        id:
          "deer-and-rabbit-damage",

        severity:
          "very-high",

        affectedStages: [
          "seedling",
          "vegetative-growth",
          "flowering"
        ],

        mitigationOptions: [
          "Fencing",
          "Protected beds",
          "Row cover during establishment",
          "Grow near regular human activity"
        ],

        note:
          "Tender Cowpea foliage can be highly attractive to browsing wildlife."
      },

      {
        id:
          "cowpea-insect-pressure",

        severity:
          "high",

        affectedStages: [
          "vegetative-growth",
          "flowering",
          "pod-setting",
          "storage"
        ],

        mitigationOptions: [
          "Inspect plants regularly",
          "Use locally adapted resistant varieties",
          "Rotate crops",
          "Harvest promptly",
          "Store dry seed in suitable protected containers"
        ],

        note:
          "Cowpeas can be affected by aphids, pod-feeding insects, weevils, beetles, and stored-seed pests."
      },

      {
        id:
          "humid-weather-disease",

        severity:
          "high",

        affectedStages: [
          "establishment",
          "vegetative-growth",
          "flowering",
          "pod-development"
        ],

        mitigationOptions: [
          "Use well-drained soil",
          "Provide airflow",
          "Avoid overhead watering late in the day",
          "Rotate crop families",
          "Choose resistant varieties"
        ],

        note:
          "Warm humid conditions can increase foliar, root, and pod disease pressure."
      },

      {
        id:
          "dry-seed-antinutritional-factors",

        severity:
          "high",

        affectedStages: [
          "processing",
          "feeding"
        ],

        mitigationOptions: [
          "Use the planner's cooked-seed path",
          "Avoid unrestricted raw dry-bean feeding",
          "Keep mature seed supplemental",
          "Continue complete poultry feed"
        ],

        note:
          "Mature dry Cowpea seed contains antinutritional compounds; appropriate preparation improves its practical feeding suitability."
      },

      {
        id:
          "stored-seed-insects",

        severity:
          "very-high",

        affectedStages: [
          "drying",
          "storage"
        ],

        mitigationOptions: [
          "Dry thoroughly",
          "Clean and inspect seed",
          "Use tightly sealed containers after adequate drying",
          "Monitor for insects and heating",
          "Discard questionable material"
        ],

        note:
          "Stored Cowpea seed is vulnerable to bruchid and other stored-product insect damage."
      },

      {
        id:
          "chemically-treated-seed",

        severity:
          "very-high",

        affectedStages: [
          "planting",
          "feeding"
        ],

        mitigationOptions: [
          "Use untreated seed for crops intended as feed",
          "Keep treated planting seed separated and labeled"
        ],

        note:
          "Chemically treated planting seed must not be fed to chickens."
      }
    ],

    directFacts: {
      highlyAttractiveToDeer:
        true,

      storedSeedInsectConcern:
        true,

      antinutritionalFactorsInDrySeed:
        true,

      heatAndDroughtAdapted:
        true,

      waterloggingConcern:
        true,

      multipleDiseasesPossible:
        true,

      notes: [
        "Wildlife risk varies strongly by location, but deer and rabbits may severely damage small plots.",
        "Insect pressure can be substantial in warm regions.",
        "Stored dry Cowpeas require monitoring for insects and moisture.",
        "Moldy, musty, heated, insect-damaged, or otherwise questionable seed should not be fed.",
        "Dense wet foliage and poorly drained soil can increase disease risk.",
        "Appropriate variety selection is one of the most important pest- and disease-management tools.",
        "Fresh plant material should be sound and free from pesticide residues not labeled for feed use."
      ]
    }
  },

  seasonalRoles: {
    earlySpring: false,

    lateSpring: true,

    summer: true,

    lateSummer: true,

    fall: true,

    winterStorage: true,

    perennial: false,

    plantingWindows: [
      {
        id:
          "direct-seed-warm-soil",

        trigger:
          "after-last-frost",

        offsetWeeksMinimum: 2,
        offsetWeeksMaximum: 5,

        soilCondition:
          "warm-and-well-drained",

        method:
          "direct-seed",

        note:
          "Plant after frost danger has passed and soil has warmed sufficiently for rapid germination."
      },

      {
        id:
          "successive-summer-sowing",

        trigger:
          "warm-soil",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        method:
          "direct-seed",

        note:
          "Additional sowings may extend fresh-leaf and tender-pod harvest where the remaining warm season is long enough."
      },

      {
        id:
          "late-summer-cover-crop",

        trigger:
          "late-summer",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        method:
          "direct-seed",

        note:
          "A late planting may provide biomass, soil cover, and tender foliage even when insufficient time remains for mature dry seed."
      }
    ],

    harvestWindows: [
      {
        id:
          "fresh-foliage",

        trigger:
          "established-vegetative-growth",

        usePathId:
          "fresh-foliage",

        note:
          "Harvest modest amounts of healthy leaves and tender vine tips after plants are well established."
      },

      {
        id:
          "tender-immature-pods",

        trigger:
          "pods-tender-before-seed-hardening",

        usePathId:
          "tender-immature-pods",

        note:
          "Pick green pods while tender for household or supplemental flock use."
      },

      {
        id:
          "mature-dry-seed",

        trigger:
          "pods-dry-and-seed-mature",

        usePathId:
          "mature-cooked-seed",

        note:
          "Harvest mature pods, dry and shell the seed, then cook before the planner recommends feeding it."
      }
    ],

    cropSequenceRoles: [
      "Warm-season annual legume",
      "Summer fresh-forage crop",
      "Tender-pod household crop",
      "Late-summer soil-cover crop",
      "Nitrogen-fixing rotation crop",
      "Dry-seed winter-storage crop"
    ],

    seasonalLimitations: [
      "Not frost tolerant",
      "Poor germination in cold soil",
      "Short seasons may not allow mature dry seed",
      "Wet fall weather can complicate pod drying",
      "Fresh foliage ends with frost"
    ],

    directFacts: {
      warmSeasonAnnual: true,

      commonlyDirectSeeded: true,

      repeatedFreshHarvestPossible:
        true,

      drySeedRequiresFullSeason:
        true,

      notes: [
        "Cowpeas are generally planted after the soil has warmed in late spring or early summer.",
        "Fresh foliage can provide value before pod production.",
        "Tender pods may be harvested repeatedly.",
        "Mature seed harvest occurs later and requires dry-down.",
        "Late-summer plantings may still provide cover and foliage even when they cannot mature dry seed.",
        "Stored mature seed can extend usefulness into winter after drying, shelling, protected storage, and cooking."
      ]
    }
  },

  usePaths: [
    {
      id:
        "fresh-foliage",

      label:
        "Fresh Cowpea Foliage",

      description:
        "Healthy leaves and tender vine tips harvested from established plants for limited cut-and-carry flock supplementation.",

      primaryFeedRole:
        "fresh-green-protein-oriented",

      harvestProducts: [
        "fresh-greens",
        "whole-plant-enrichment"
      ],

      suitableFeedingMethods: [
        "cut-and-carry",
        "fresh-supplement",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "cut-leaves"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "basket"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "several-weekly",

      storageMethods: [
        "short-term-fresh"
      ],

      preferredStorageMethod:
        "feed-soon-after-harvest",

      storageDurationCategory:
        "very-short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 3,
      flockValueScore: 5,

      safetyWarnings: [
        "Offer only healthy, clean foliage free from mold, decay, and unapproved pesticide residues.",
        "Avoid stripping so much foliage that plant growth and pod production collapse.",
        "Introduce unfamiliar fresh plant material gradually.",
        "Fresh foliage remains supplemental and should not replace balanced poultry feed."
      ],

      incompatibleUserTraits: [
        "requires-long-term-storage",
        "wants-dry-grain-only",
        "requires-permanent-run-survival"
      ]
    },

    {
      id:
        "tender-immature-pods",

      label:
        "Tender Immature Cowpea Pods",

      description:
        "Young green pods harvested before the seeds fully harden, suitable for household use and limited fresh flock supplementation.",

      primaryFeedRole:
        "fresh-produce-protein-oriented",

      harvestProducts: [
        "tender-pods",
        "fresh-vegetables"
      ],

      suitableFeedingMethods: [
        "whole-produce",
        "fresh-supplement",
        "measured-supplement"
      ],

      requiredProcessingTasks: [
        "pick-produce"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "basket"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "several-weekly",

      storageMethods: [
        "short-term-fresh",
        "refrigerated"
      ],

      preferredStorageMethod:
        "feed-fresh-or-refrigerate-briefly",

      storageDurationCategory:
        "short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: true,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 5,
      flockValueScore: 4,

      safetyWarnings: [
        "Use only sound, tender pods without mold, decay, or unapproved pesticide residues.",
        "Discard slimy, fermented, spoiled, or questionable pods.",
        "Tender pods are supplemental and should not displace complete poultry feed."
      ],

      incompatibleUserTraits: [
        "requires-long-term-room-temperature-storage",
        "wants-dry-seed-only"
      ]
    },

    {
      id:
        "mature-cooked-seed",

      label:
        "Mature Cooked Cowpea Seed",

      description:
        "Fully mature Cowpea seed harvested from dry pods, adequately dried and stored, then cooked before being offered as a measured supplemental food.",

      primaryFeedRole:
        "protein-oriented-storage",

      harvestProducts: [
        "dry-legumes"
      ],

      suitableFeedingMethods: [
        "heat-treated",
        "measured-supplement",
        "winter-storage"
      ],

      requiredProcessingTasks: [
        "pick-produce",
        "dry",
        "shell-beans",
        "clean-sort",
        "cook"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [
        "cooking-equipment"
      ],

      helpfulEquipment: [
        "drying-screen",
        "fan",
        "food-safe-bucket",
        "metal-grain-can",
        "moisture-meter"
      ],

      harvestPattern:
        "major",

      harvestFrequencyCategory:
        "once-twice",

      storageMethods: [
        "dried-shelled"
      ],

      preferredStorageMethod:
        "airtight-after-adequate-drying",

      storageDurationCategory:
        "long",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: true,

      dryingRequired: true,
      curingRequired: false,
      shellingRequired: true,
      threshingRequired: false,
      cookingRequired: true,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 4,
      rodentRiskScore: 5,
      storedInsectRiskScore: 5,

      harvestEaseScore: 3,
      preparationEaseScore: 2,
      beginnerSuitabilityScore: 2,

      householdFoodValueScore: 5,
      flockValueScore: 4,

      safetyWarnings: [
        "The planner does not recommend unrestricted feeding of raw mature dry Cowpea seed.",
        "Dry seed thoroughly before enclosed storage.",
        "Cook mature seed before using this planner feeding path.",
        "Do not feed moldy, musty, heated, insect-damaged, or otherwise questionable seed.",
        "Do not feed salted, seasoned, flavored, canned-with-additives, or chemically treated seed.",
        "Keep cooked Cowpeas supplemental to a complete poultry ration."
      ],

      incompatibleUserTraits: [
        "declines-drying",
        "declines-shelling",
        "declines-cooking",
        "requires-minimal-processing",
        "has-no-dry-storage",
        "has-no-rodent-protected-storage"
      ]
    }
  ],

  dataQuality: {
    overallConfidence:
      0.76,

    verifiedFields: [
      "identity",
      "lifecycle",
      "climate.directFacts.seasonType",
      "climate.directFacts.frostSensitive",
      "climate.directFacts.warmSoilRequired",
      "site.directFacts.preferredLight",
      "soil.directFacts.poorSoilAdaptation",
      "soil.directFacts.sandySoilAdaptation",
      "soil.directFacts.nitrogenFixingLegume",
      "soil.directFacts.inoculationMayImproveNodulation",
      "water.directFacts.droughtTolerantAfterEstablishment",
      "water.directFacts.floweringMoistureImportant",
      "space.directFacts.bushVarietiesAvailable",
      "space.directFacts.viningVarietiesAvailable",
      "flock.directFacts.edibleFeedParts",
      "flock.directFacts.nutritionalOrientation",
      "risks.directFacts.storedSeedInsectConcern",
      "risks.directFacts.antinutritionalFactorsInDrySeed",
      "seasonalRoles.directFacts.warmSeasonAnnual",
      "seasonalRoles.directFacts.repeatedFreshHarvestPossible"
    ],

    derivedFields: [
      "climate.heatToleranceScore",
      "climate.droughtClimateToleranceScore",
      "climate.humidityToleranceScore",
      "climate.coolSummerToleranceScore",
      "climate.frostSensitivityScore",
      "site",
      "soil.textureScores",
      "soil.drainageRequirementScore",
      "soil.waterloggingSensitivityScore",
      "water",
      "space.smallSpaceScore",
      "space.mediumSpaceScore",
      "space.largeSpaceScore",
      "space.layoutScores",
      "space.spaceTypeScores",
      "flock.flockPurposeScores",
      "flock.feedingMethodScores",
      "flock.directRunSuitabilityScore",
      "flock.forageFrameSuitabilityScore",
      "flock.rotationalPaddockSuitabilityScore",
      "labor",
      "cost",
      "goals",
      "risks.wildlife",
      "usePaths.fresh-foliage",
      "usePaths.tender-immature-pods",
      "usePaths.mature-cooked-seed"
    ],

    uncertainFields: [
      "climate.minimumFrostFreeDays",
      "climate.preferredFrostFreeDays",
      "climate.daysToMaturityMinimum",
      "climate.daysToMaturityMaximum",
      "climate.dryDownBufferDays",
      "soil.minimumSoilDepthIn",
      "soil.saltToleranceScore",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "space.minimumRaisedBedDepthIn",
      "flock.portionGuidance",
      "usePaths.fresh-foliage.exactStorageDuration",
      "usePaths.tender-immature-pods.exactStorageDuration",
      "usePaths.mature-cooked-seed.exactStorageDuration",
      "risks.wildlife.raccoons",
      "risks.wildlife.squirrels"
    ],

    missingFields: [
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "space.minimumRaisedBedDepthIn",
      "flock.portionGuidance",
      "flock.usePathTesting"
    ],

    lastReviewed:
      "2026-07-14",

    primarySources: [
      {
        title:
          "Plant Guide for Cowpea (Vigna unguiculata)",

        organization:
          "USDA Natural Resources Conservation Service",

        sourceType:
          "government-plant-guide",

        use:
          "Lifecycle, adaptation, growth habit, soil, drought tolerance, forage, wildlife, and nitrogen-fixation context"
      },

      {
        title:
          "Managing Cover Crops Profitably — Cowpeas",

        organization:
          "Sustainable Agriculture Research and Education",

        sourceType:
          "agricultural-production-guide",

        use:
          "Warm-season cover-crop use, heat tolerance, biomass, weed suppression, nitrogen contribution, and management"
      },

      {
        title:
          "Cowpea Production and Alternative Field Crops Guidance",

        organization:
          "University Cooperative Extension resources",

        sourceType:
          "extension-production-guide",

        use:
          "Planting, warm-soil needs, variety growth habits, maturity, fertility, pests, and harvesting"
      },

      {
        title:
          "Cowpea Research",

        organization:
          "International Institute of Tropical Agriculture",

        sourceType:
          "international-crop-research",

        use:
          "Heat and drought adaptation, food value, production constraints, insects, disease, and varietal diversity"
      },

      {
        title:
          "Consensus Document on Compositional Considerations for New Varieties of Cowpea",

        organization:
          "Organisation for Economic Co-operation and Development",

        sourceType:
          "international-feed-and-food-composition",

        use:
          "Seed nutrients, antinutritional constituents, compositional variability, and food/feed safety context"
      },

      {
        title:
          "Cowpea Post-Harvest Operations",

        organization:
          "Food and Agriculture Organization of the United Nations",

        sourceType:
          "international-postharvest-guide",

        use:
          "Mature-seed harvesting, drying, shelling, stored-seed insects, and storage management"
      }
    ],

    notes: [
      "Cowpea plannerData was created as the second complete crop migration after Sunflower.",
      "The record separates fresh foliage, tender pods, and mature dry seed into distinct use paths.",
      "Mature seed uses a conservative cooked-seed planner policy because dry Cowpeas contain antinutritional compounds and require substantially more preparation than fresh foliage or pods.",
      "Cooking is stored as a required planner task for the mature-seed path; it should not be interpreted as a universal commercial poultry-ration standard.",
      "Heat and drought ratings are strong, but drought-yield retention is lower than drought survival because flowering and pod fill remain moisture sensitive.",
      "Nitrogen-fixation benefits depend on compatible rhizobia, soil conditions, crop management, and how much biomass is removed.",
      "Commercial yield and plant-population data were not converted into backyard minimum-area or feed-replacement promises.",
      "Minimum useful area, exact storage duration, and feeding portions remain intentionally null.",
      "Cowpea should remain in testing status until the shared multi-crop engine compares it with Sunflower across the fixed sample profiles."
    ]
  }
}

    },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - MILLET
    //
    //
    //
    //
    //////////////////////////////////////////////
    

  "CROP-PROSO-MILLET": {
    id: "CROP-PROSO-MILLET",

    name: "Proso Millet",
    scientificName: "Panicum miliaceum",

    category: "Small Grain and Energy Crop",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Proso millet is a short-season, drought-tolerant grain crop that produces small seeds commonly used in birdseed and livestock feed. It can provide chickens with supplemental carbohydrate energy, moderate protein, enrichment, and a dry grain that stores well.",

    chickenUse: {
      edibleParts: [
        "Mature whole grain",
        "Threshed seed",
        "Sprouted grain",
        "Young tender growth in limited amounts"
      ],

      primaryValue: [
        "Carbohydrate energy",
        "Moderate protein",
        "Dry grain storage",
        "Foraging enrichment",
        "Short-season grain production"
      ],

      feedingForms: [
        "Whole mature seed",
        "Cracked or ground grain",
        "Sprouted grain",
        "Seed heads offered as enrichment",
        "Controlled access to young plants"
      ],

      bestFor: [
        "Adult chickens as a supplemental grain",
        "Warm and dry climates",
        "Short growing seasons",
        "Small grain plots",
        "Winter grain storage",
        "Owners wanting a relatively fast-maturing crop"
      ],

      supplementOnly: true,

      preparationNotes:
        "Allow grain heads to mature and dry before harvest. Cut or collect the heads, dry them thoroughly, thresh the seed if desired, and store it in a dry, rodent-resistant container. Whole seed may be offered in limited amounts, while grinding or cracking may improve access for smaller birds.",

      safetyNotes:
        "Proso millet is an energy-oriented grain and should not replace a balanced poultry ration. It is low in lysine and does not provide the amino-acid, calcium, vitamin, and mineral balance required by laying hens. Avoid moldy, wet, fermented, pesticide-contaminated, or improperly stored grain."
    },

    nutrition: {
      basis:
        "Approximate raw whole-grain values. Composition varies by variety, hull percentage, growing conditions, storage, and processing.",

      crudeProteinPercent:
        "Approximately 11% to 13% in commonly reported whole-grain analyses",

      fatPercent:
        "Approximately 3% to 4%",

      fiberPercent:
        "Approximately 2% to 8%, depending heavily on whether the grain is hulled and how fiber is measured",

      calciumPercent:
        "Low; exact poultry-feed value remains under verification",

      phosphorusPercent:
        "Present in moderate amounts, but total phosphorus is not necessarily fully available to poultry",

      notableNutrients: [
        "Starch and carbohydrate energy",
        "Moderate protein",
        "Unsaturated fatty acids",
        "Phosphorus",
        "Magnesium",
        "Manganese",
        "B vitamins",
        "Small amounts of iron and zinc"
      ],

      limitations: [
        "Low in lysine relative to poultry requirements",
        "Protein content alone does not indicate balanced amino-acid quality",
        "Calcium is too low for use as a primary laying-hen feed",
        "The hull can increase fiber and reduce usable energy",
        "Whole grain, hulled grain, flour, sprouts, and forage have different nutritional values",
        "Heavy grain supplementation can dilute the nutrients supplied by complete poultry feed",
        "Millet species should not be treated as nutritionally interchangeable"
      ]
    },

    growing: {
      sunlight: "Full sun",

      soilTemperatureMinimumF:
        "Approximately 55°F to 60°F, with warmer soil generally supporting faster establishment",

      idealSoilTemperatureF:
        "Approximately 60°F or warmer",

      frostTolerance: "Very Low",

      heatTolerance: "High",

      droughtTolerance:
        "High compared with many common grain crops",

      soilPHMinimum: null,
      soilPHMaximum: null,

      waterNeeds:
        "Low to moderate. Proso millet is drought tolerant, but moisture during germination, flowering, and grain filling improves establishment and yield.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: 60,
      daysToFirstHarvestMaximum: 90,

      daysToMaturityMinimum: 60,
      daysToMaturityMaximum: 90,

      plantSpacingInches:
        "Usually broadcast or densely drilled rather than planted as individually spaced garden plants",

      rowSpacingInches:
        "Approximately 6 to 10 inches in closely drilled production; wider rows may be used for cultivation",

      plantingDepthInches:
        "Approximately 1/2 to 1 inch in suitable moisture; avoid excessively deep planting",

      successionPlanting:
        "Possible where at least 60 to 90 frost-free days remain",

      regrowthAfterHarvest: false
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Plant after frost danger has passed and soil has warmed, commonly from late spring into early summer. Select an early-maturing variety.",
        harvestWindow:
          "Late summer into early fall, before hard frost or prolonged wet weather."
      },

      midwestNortheast: {
        plantingWindow:
          "Direct sow from late spring into early summer after the soil has warmed. The short season may allow planting after an early vegetable crop.",
        harvestWindow:
          "Late summer through early fall."
      },

      upperSouth: {
        plantingWindow:
          "Plant from spring into early summer after frost danger has passed. Later plantings may be possible if 60 to 90 warm days remain.",
        harvestWindow:
          "Summer through early fall, depending on planting date."
      },

      deepSouth: {
        plantingWindow:
          "Plant during warm weather from spring into summer. Time grain filling to avoid the wettest harvest period when possible.",
        harvestWindow:
          "Summer through fall, depending on planting date and rainfall."
      },

      southwest: {
        plantingWindow:
          "Plant after frost once soil is warm. Irrigation may help establishment, although the crop is comparatively drought tolerant.",
        harvestWindow:
          "Summer into fall, depending on elevation, planting date, and irrigation."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant after frost in the warmest available location once soil temperatures rise. Earlier-maturing varieties are preferable in cool regions.",
        harvestWindow:
          "Late summer into early fall."
      },

      coastalWest: {
        plantingWindow:
          "Plant when soil is warm and frost risk has passed. Inland valleys are generally more reliable than cool, foggy coastal areas.",
        harvestWindow:
          "Summer through fall."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Properly dried grain may remain usable for many months when protected from moisture, heat, insects, rodents, and rancidity",

      storageMethod:
        "Harvest mature heads when most seed has hardened. Dry thoroughly, thresh and clean the grain if desired, and store it in a cool, dry, dark place inside a sealed food-safe and rodent-resistant container.",

      yieldNotes:
        "Proso millet is normally broadcast or densely drilled rather than planted as individually spaced garden plants. Production recommendations are generally expressed as seed weight per acre, seeds per area, or target stand rather than a dependable number of mature plants per square foot. Germination percentage, emergence, row width, seeding method, variety, tillering, soil moisture, and weed pressure can substantially change the final stand. For that reason, plants-per-area values remain null rather than implying false precision. Commercial grain yields are sometimes reported between roughly 2.5 and 4.5 metric tons per hectare under favorable conditions, but those field-scale figures should not be converted directly into backyard yield without accounting for variety, harvest loss, threshing efficiency, bird pressure, fertility, and garden management."

    },

    economics: {
      seedCostEstimate:
        "Usually low when purchased as bulk agricultural or birdseed grain, but named planting varieties may cost more",

      equipmentCostEstimate:
        "Low for a small broadcast plot. Optional costs include irrigation, bird netting, harvesting tools, drying screens, threshing equipment, and storage containers.",

      irrigationCostLevel: "Low to Moderate",

      laborLevel:
        "Moderate to High when grain is harvested, dried, threshed, cleaned, and stored by hand",

      potentialFeedSavings: null,

      economicNotes:
        "Proso millet may be economical where land is available, rainfall is limited, and seed can be harvested efficiently. On very small plots, the labor required to protect, thresh, and clean the grain may exceed its direct feed value. It may still provide enrichment, crop diversity, and wildlife value."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Moderate to strong for crop adaptation, short maturity, drought tolerance, and general grain composition; moderate for use as livestock and poultry grain; limited for backyard laying-hen supplementation rates and small-plot yield",

      sources: [
        {
          title:
            "Producing and Marketing Proso Millet in the Great Plains",
          organization:
            "University of Nebraska–Lincoln Extension",
          url:
            "https://extensionpublications.unl.edu/assets/pdf/ec137.pdf",
          use:
            "Production region, planting practices, crop management, maturity, harvest, and grain use"
        },

        {
          title:
            "Proso Millet and Its Potential for Cultivation in the Pacific Northwest",
          organization:
            "Frontiers in Plant Science",
          url:
            "https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01961/full",
          use:
            "Crop adaptation, drought tolerance, short growth cycle, production potential, and grain characteristics"
        },

        {
          title:
            "Alternative Uses of Proso Millet",
          organization:
            "University of Nebraska–Lincoln Extension",
          url:
            "https://digitalcommons.unl.edu/panhandleresext/80/",
          use:
            "Livestock, poultry, birdseed, food, and industrial uses"
        },

        {
          title:
            "Millet Grains: Nutritional Quality, Processing, and Potential Health Benefits",
          organization:
            "Comprehensive Reviews in Food Science and Food Safety",
          url:
            "https://doi.org/10.1111/1541-4337.12012",
          use:
            "General millet grain composition, amino-acid limitations, processing, and nutrient variability"
        },

        {
          title:
            "USDA FoodData Central",
          organization:
            "United States Department of Agriculture",
          url:
            "https://fdc.nal.usda.gov/",
          use:
            "General nutrient context for raw and cooked millet grain"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Keep this record specific to proso millet rather than combining all millet species.",
        "Consider separate future records for pearl millet, foxtail millet, and Japanese millet.",
        "Find poultry-specific feeding trials using proso millet in laying-hen diets.",
        "Do not apply broiler or commercial formulated-feed inclusion rates directly to backyard laying hens.",
        "Verify calcium, phosphorus, amino-acid, and metabolizable-energy values from a poultry-feed database.",
        "Research whether red, white, and yellow proso millet differ meaningfully in poultry use.",
        "Find credible small-plot grain yield data before assigning yield per square foot.",
        "Evaluate bird-loss prevention methods such as netting or harvesting heads before full shattering.",
        "Compare hand-threshing labor with the market value of purchased millet grain.",
        "Calculate scores only after multiple crops have comparable evidence and complete data.",
        "Plant-density fields remain null because proso millet is normally broadcast or drilled by seeding rate, and tillering and establishment losses prevent a reliable conversion to mature individual plants per square foot.",
      ]
    },

plannerData: {
  schemaVersion: "1.0.0",

  developmentStatus:
    "ready",

  identity: {
    plannerName:
      "Proso Millet",

    shortLabel:
      "Millet",

    icon:
      "🌾",

    cropCategory:
      "grain",

    primaryFeedCategory:
      "energy",

    guideUrl:
      "growing-proso-millet-for-chickens.html"
  },

  lifecycle: {
    growthCycle:
      "annual",

    isAnnual: true,
    isBiennial: false,
    isPerennial: false,
    isTreeOrShrub: false,

    yearsToFirstUsefulHarvest: 0,
    yearsToFullProduction: 0,
    expectedUsefulLifeYears: 1,

    regrowsAfterHarvest: false,

    permanentPlantingRequired: false,
    reversibleAfterOneSeason: true
  },

  climate: {
    suitableClimateTypes: [
      "cold-short-summer",
      "cool-moderate-summer",
      "temperate",
      "hot-dry",
      "mild-winter"
    ],

    preferredClimateTypes: [
      "cool-moderate-summer",
      "temperate",
      "hot-dry"
    ],

    challengingClimateTypes: [
      "hot-humid"
    ],

    minimumFrostFreeDays: 60,
    preferredFrostFreeDays: 90,

    minimumSoilTemperatureF: 50,
    preferredSoilTemperatureF: 60,

    daysToMaturityMinimum: 60,
    daysToMaturityMaximum: 100,

    dryDownBufferDays: null,

    heatToleranceScore: 4,

    droughtClimateToleranceScore: 5,

    humidityToleranceScore: 2,

    coolSummerToleranceScore: 4,

    frostSensitivityScore: 5,

    winterHardinessRequired: false,

    seasonExtensionBenefits: [
      "The naturally short growth cycle makes major season-extension infrastructure unnecessary in many climates.",
      "Early-maturing varieties can improve success in short-season areas.",
      "Planting after the soil warms encourages faster emergence and stronger early growth.",
      "Protected drying space may be more valuable than spring season extension in humid climates."
    ],

    indoorSeedStartingBenefitScore: 1,

    directFacts: {
      seasonType:
        "warm-season",

      frostSensitive: true,

      commonlyDirectSeeded: true,

      shortSeasonGrain: true,

      maturityHighlyVarietyDependent:
        true,

      approximateMaturityDaysMinimum:
        60,

      approximateMaturityDaysMaximum:
        100,

      notes: [
        "Proso Millet is one of the shortest-season grain crops in the initial planner database.",
        "Some early varieties may mature grain in approximately 60 days, while other varieties and conditions require substantially longer.",
        "The crop is frost sensitive and is normally planted after spring frost danger declines.",
        "It can mature in cooler and shorter-season regions where Field Corn or Grain Sorghum may be less dependable.",
        "Dry weather near maturity improves harvest and grain quality.",
        "High humidity and prolonged wet weather may complicate panicle drying and increase grain-quality risks.",
        "Indoor starting provides little practical benefit because Millet is readily direct-seeded as a dense grain stand."
      ]
    }
  },

  site: {
    absoluteMinimumSunHours: null,

    productiveMinimumSunHours: 6,

    preferredSunHours: 8,

    shadeToleranceScore: 2,

    afternoonShadeBenefitInHeat: 2,

    windToleranceScore: 4,

    lodgingRiskScore: 3,

    reflectedHeatToleranceScore: 4,

    airflowRequirementScore: 5,

    frostPocketSensitivityScore: 5,

    treeRootCompetitionToleranceScore: 2,

    hardscapeConflictRiskScore: 2,

    structureConflictRiskScore: 2,

    utilityConflictRiskScore: 1,

    fruitDropMessRiskScore: 2,

    stainingRiskScore: 1,

    directFacts: {
      preferredLight:
        "full-sun",

      productiveSunGuidance:
        "At least 6 hours of direct sunlight, with approximately 8 hours preferred for strong grain production and even dry-down.",

      windExposureConcern:
        true,

      growthHabit:
        "upright-tillering-grass",

      matureHeightFtMinimum: 2,
      matureHeightFtMaximum: 4,

      notes: [
        "Full sun supports compact growth, panicle production, grain filling, and dry-down.",
        "Partial shade may encourage weaker plants and reduce grain production.",
        "Good airflow helps foliage and panicles dry after rain.",
        "Mature plants generally tolerate wind reasonably well, but dense or overly fertile stands may lodge.",
        "Plants are shorter and create fewer structural conflicts than Corn, Sunflower, or Grain Sorghum.",
        "Avoid severe tree-root competition and heavily shaded orchard conditions."
      ]
    }
  },

  soil: {
    textureScores: {
      heavyClay: 2,
      clayLoam: 4,
      loam: 5,
      sandyLoam: 5,
      verySandy: 4,
      rocky: 2
    },

    drainageRequirementScore: 5,

    temporaryWetToleranceScore: 1,

    waterloggingSensitivityScore: 5,

    minimumSoilDepthIn: null,
    preferredSoilDepthIn: 18,

    compactionToleranceScore: 2,

    establishmentInSodDifficultyScore: 5,

    preferredPHMinimum: 5.5,
    preferredPHMaximum: 7.5,

    survivalPHMinimum: null,
    survivalPHMaximum: null,

    fertilityRequirementScore: 2,

    nitrogenRequirementScore: 3,
    phosphorusRequirementScore: 3,
    potassiumRequirementScore: 3,

    benefitsFromInoculation: false,

    inoculantType: null,

    saltToleranceScore: null,

    amendmentEffortScore: 2,

    directFacts: {
      preferredDrainage:
        "well-drained",

      preferredTextures: [
        "sandy loam",
        "loam",
        "well-drained clay loam"
      ],

      lowFertilityAdaptation:
        true,

      sandySoilAdaptation:
        true,

      waterloggedSoilSuitable:
        false,

      fineFirmSeedbedHelpful:
        true,

      notes: [
        "Proso Millet performs particularly well in well-drained loam and sandy-loam soils.",
        "The crop can produce on relatively low-fertility ground but responds to balanced fertility.",
        "Heavy clay is a poor fit where crusting, compaction, or slow drainage delays emergence.",
        "A fine, firm seedbed supports shallow planting and more even emergence.",
        "Excess nitrogen may increase lodging and delay maturity.",
        "Proso Millet does not fix nitrogen and does not benefit from legume inoculation.",
        "The pH range is a practical planning range rather than an absolute survival range."
      ]
    }
  },

  water: {
    overallWaterRequirementLevel:
      "low",

    germinationWaterNeedLevel:
      "moderate",

    establishmentWaterNeedLevel:
      "moderate",

    matureWaterNeedLevel:
      "low",

    floweringWaterNeedLevel:
      "moderate",

    harvestDevelopmentWaterNeedLevel:
      "moderate",

    droughtSurvivalScore: 5,

    droughtYieldRetentionScore: 4,

    criticalGrowthStages: [
      "germination",
      "seedling-establishment",
      "panicle-initiation",
      "flowering",
      "grain-filling"
    ],

    criticalStageWaterImportanceScore: 4,

    overwateringSensitivityScore: 4,

    waterloggingSensitivityScore: 5,

    dripIrrigationBenefitScore: 3,

    mulchBenefitScore: 2,

    suitableForRainfallOnlyScore: 5,

    suitableForLimitedIrrigationScore: 5,

    containerDryingRiskScore: 4,

    establishmentYearsRequiringExtraWater: 0,

    directFacts: {
      droughtTolerantAfterEstablishment:
        true,

      establishmentMoistureImportant:
        true,

      grainFillMoistureImportant:
        true,

      lowWaterRequirementGrain:
        true,

      standingWaterSuitable:
        false,

      notes: [
        "Proso Millet is among the strongest low-water grain crops in the initial planner database.",
        "Seed requires adequate moisture for timely germination and establishment.",
        "Established plants can complete a crop with less water than many longer-season grains.",
        "Severe drought during panicle formation, flowering, and grain filling can still reduce yield.",
        "Waterlogging and prolonged saturated soil are major limitations.",
        "Supplemental irrigation may improve production during critical stages but is often unnecessary where rainfall and stored soil moisture are adequate.",
        "Dry conditions near maturity generally help grain dry-down and harvest quality."
      ]
    }
  },

  space: {
    minimumTrialAreaSqFt: null,

    minimumUsefulAreaSqFt: null,

    preferredProductionAreaSqFt: null,

    smallSpaceScore: 3,

    mediumSpaceScore: 5,

    largeSpaceScore: 5,

    layoutScores: {
      squareBlock: 5,
      wideRectangle: 5,
      longStrip: 4,
      irregular: 3,
      smallBeds: 3,
      openField: 5
    },

    spaceTypeScores: {
      inGround: 5,
      raisedBed: 3,
      container: 1,
      fenceLine: 3,
      buildingEdge: 3,
      unusedLawn: 4,
      openField: 5,
      orchard: 2,
      forageFrame: 1,
      rotationalPaddock: 2,
      greenhouse: 1,
      hedgerow: 2
    },

    minimumContainerGallons: null,

    containerUseLimitation:
      "Millet can grow in containers, but dense grain production, rapid container drying, and low harvest per container make this an inefficient chicken-feed system.",

    minimumRaisedBedDepthIn: null,

    vineSpreadRequired: false,

    verticalSupportBenefitScore: 1,

    blockPlantingRequired: false,

    minimumBlockRows: null,

    continuousStandPreferred: true,

    heightCategory:
      "medium",

    matureWidthCategory:
      "narrow-dense-stand",

    overflowSpaceBenefitScore: 2,

    directFacts: {
      denseStandSuitable: true,

      narrowRowsSuitable: true,

      broadcastPlantingPossible:
        true,

      blockPollinationRequired: false,

      containerFeedProductionEfficient:
        false,

      notes: [
        "Proso Millet is most useful when planted as a dense stand rather than as isolated individual plants.",
        "It does not require Corn-style block planting for pollination.",
        "Medium and large plots provide better grain usefulness than a few plants in a decorative bed.",
        "A small bed can still provide whole panicles for enrichment, but loose-grain yield may be modest.",
        "Open fields and broad rectangular plots simplify planting, weed management, harvest, and bird protection.",
        "Containers are a poor use of soil volume and watering effort for meaningful grain production.",
        "Minimum useful area remains null until grain yield and flock-size relationships are tested."
      ]
    }
  },

  flock: {
    suitableForAdultChickens: true,

    suitableForYoungChicks: false,

    flockPurposeScores: {
      eggs: 4,
      meat: 4,
      breeding: 3,
      petsEnrichment: 5,
      homestead: 5,
      mixed: 5
    },

    feedingMethodScores: {
      livingGrazing: 1,
      cutAndCarry: 2,
      wholeProduce: 1,
      wholeSeedHeads: 5,
      wholeGrain: 5,
      processedGrain: 4,
      heatTreated: 2,
      driedForage: 1,
      winterStorage: 5
    },

    directRunSuitabilityScore: 1,

    forageFrameSuitabilityScore: 1,

    rotationalPaddockSuitabilityScore: 2,

    confinedFlockValueScore: 5,

    pasturedFlockValueScore: 4,

    treatDilutionRiskScore: 3,

    highEnergySupplement: true,

    highFiberSupplement: false,

    concentratedFatSource: false,

    primaryFlockUses: [
      "Whole mature panicle enrichment",
      "Loose whole grain",
      "Stored winter grain",
      "Small-grain energy supplementation",
      "Scatter-feeding enrichment"
    ],

    unsuitablePrimaryUses: [
      "Complete-ration replacement",
      "Living forage",
      "Primary protein crop",
      "Permanent run planting",
      "Primary young-chick feed"
    ],

    directFacts: {
      edibleFeedParts: [
        "Mature grain",
        "Whole dried panicles"
      ],

      preferredBirdStage:
        "Established adult chickens",

      cropSurvivalWithDirectChickenAccess:
        "poor-before-grain-maturity",

      directAccessTiming:
        "Protect plants while growing and offer harvested mature panicles or clean grain after maturity.",

      nutritionalOrientation: [
        "energy",
        "grain",
        "moderate-protein",
        "enrichment",
        "winter-storage"
      ],

      balancedFeedReplacement:
        false,

      notes: [
        "Proso Millet is historically used as poultry feed and bird seed.",
        "Whole mature panicles allow chickens to remove grain naturally and provide pecking enrichment.",
        "Loose grain is easier to measure but requires threshing and cleaning.",
        "Millet is primarily an energy grain and does not supply a complete amino-acid, vitamin, mineral, or calcium balance.",
        "The grain is notably limited in lysine and should not be treated as a stand-alone poultry ration.",
        "Growing plants should be protected from chickens and wild birds until harvest.",
        "Young chicks should continue receiving an age-appropriate complete starter ration."
      ]
    }
  },

  labor: {
    beginnerFriendlinessScore: 3,

    plantingEaseScore: 4,

    establishmentEaseScore: 3,

    routineMaintenanceEaseScore: 3,

    weedControlEaseScore: 2,

    wildlifeProtectionEaseScore: 2,

    harvestEaseScore: 3,

    wholePanicleProcessingEaseScore: 4,

    looseGrainProcessingEaseScore: 2,

    dryingEaseScore: 3,

    storageMonitoringEaseScore: 3,

    perennialMaintenanceEaseScore: 5,

    physicalAccessibilityScore: 4,

    heavyLiftingRiskScore: 1,

    weeklyLaborLevel:
      "low",

    peakWorkloadLevel:
      "high",

    harvestFrequencyCategory:
      "once-twice",

    requiredPlantingTasks: [
      "prepare-seedbed",
      "broadcast-small-seed"
    ],

    requiredMaintenanceTasks: [
      "hand-weed",
      "protect-from-wildlife"
    ],

    optionalMaintenanceTasks: [
      "cultivate",
      "install-irrigation"
    ],

    requiredHarvestTasks: [
      "cut-seed-heads"
    ],

    usePathProcessingTasks: {
      wholeDriedPanicles: [
        "cut-seed-heads",
        "dry"
      ],

      looseDriedGrain: [
        "cut-seed-heads",
        "dry",
        "thresh",
        "winnow",
        "clean-sort"
      ],

      immediateMaturePanicles: [
        "cut-seed-heads"
      ]
    },

    requiredStorageTasks: [
      "inspect-moisture",
      "inspect-insects",
      "inspect-mold"
    ],

    specializedEquipmentRequired: [],

    specializedEquipmentHelpful: [
      "hand-pruners",
      "bird-netting",
      "drying-rack",
      "drying-screen",
      "fan",
      "grain-thresher",
      "food-safe-bucket",
      "metal-grain-can",
      "moisture-meter"
    ],

    suitableForLowTimeUsersScore: 3,

    suitableForSoloGrowersScore: 4,

    directFacts: {
      seedSize:
        "very-small",

      directSeedingSuitable: true,

      specializedHarvestEquipmentRequiredForBackyardScale:
        false,

      unevenMaturityConcern:
        true,

      majorLaborBottlenecks: [
        "Preparing a fine seedbed",
        "Maintaining weed control during slow early development",
        "Protecting grain from wild birds",
        "Choosing harvest timing when panicles mature unevenly",
        "Drying panicles",
        "Threshing and winnowing loose grain",
        "Monitoring stored grain for moisture and insects"
      ],

      notes: [
        "Small seed requires more careful planting than Sunflower, Cowpea, Pumpkin, or Corn.",
        "Early weed competition is one of the crop's most important management challenges.",
        "The crop becomes more competitive after the stand closes.",
        "Whole-panicle use avoids most threshing and winnowing labor.",
        "Loose-grain production creates a concentrated seasonal workload.",
        "Small backyard stands can be harvested manually without commercial machinery.",
        "Uneven grain maturity can make harvest timing difficult."
      ]
    }
  },

  cost: {
    seedOrPlantCostLevel:
      "low",

    soilPreparationCostLevel:
      "low",

    irrigationCostLevel:
      "very-low",

    protectionCostLevel:
      "moderate",

    processingEquipmentCostLevel:
      "moderate",

    storageCostLevel:
      "low",

    annualRecurringCostLevel:
      "low",

    longTermValueScore: 4,

    lowestCostUsePath:
      "fresh-mature-panicles",

    highestCostUsePath:
      "loose-dried-grain",

    likelyCostDrivers: [
      "Bird netting",
      "Fine seedbed preparation",
      "Drying racks or screens",
      "Optional grain thresher",
      "Rodent-resistant storage containers",
      "Moisture meter"
    ],

    costReductionOptions: [
      "Use whole mature or dried panicles instead of threshing loose grain.",
      "Plant a small trial before expanding the grain area.",
      "Use existing screens, tarps, fans, and containers.",
      "Harvest and thresh manually at small scale.",
      "Use an adapted short-season variety to reduce crop-failure risk."
    ],

    directFacts: {
      specializedPlantingEquipmentRequired:
        false,

      specializedBackyardHarvestEquipmentRequired:
        false,

      specializedProcessingEquipmentRequired:
        false,

      notes: [
        "Seed and growing inputs are generally inexpensive.",
        "The crop's low water requirement may reduce irrigation costs.",
        "Wild-bird protection can become the largest optional growing expense.",
        "Whole-panicle use avoids purchasing threshing or milling equipment.",
        "Cost ratings are qualitative rather than current retail estimates."
      ]
    }
  },

  goals: {
    feedReductionScore: 4,

    energyProductionScore: 5,

    proteinOrientedScore: 3,

    freshGreensScore: 1,

    livingForageScore: 1,

    winterStorageScore: 5,

    enrichmentScore: 5,

    resilienceScore: 5,

    soilImprovementScore: 2,

    nitrogenFixationScore: 1,

    groundCoverScore: 4,

    erosionControlScore: 3,

    shadeScore: 1,

    privacyScreeningScore: 2,

    pollinatorSupportScore: 2,

    compostBiomassScore: 3,

    householdFoodScore: 4,

    seedSavingScore: 5,

    selfRelianceScore: 5,

    multipurposeValueScore: 4,

    visualAppealScore: 3,

    productionReliabilityScore: 4,

    fastestValueScore: 5,

    nonElectricStorageScore: 5,

    smallFlockValueScore: 4,

    largeFlockValueScore: 4,

    primaryGoalMatches: [
      "high-energy",
      "winter-storage",
      "resilience-feed",
      "limited-irrigation",
      "short-season",
      "seed-saving",
      "self-reliance",
      "enrichment",
      "non-electric-storage"
    ],

    weakGoalMatches: [
      "fresh-greens",
      "living-forage",
      "nitrogen-fixation",
      "major-soil-improvement",
      "shade",
      "large-household-vegetable-harvest"
    ],

    directFacts: {
      shortSeasonGrain:
        true,

      poultryFeedHistory:
        true,

      birdSeedHistory:
        true,

      humanFoodPotential:
        true,

      seedSavingPossible:
        true,

      notes: [
        "Proso Millet is one of the strongest short-season grain options in the initial planner database.",
        "It offers strong energy, drought resilience, winter storage, and self-reliance value.",
        "Whole panicles provide strong enrichment without requiring loose-grain processing.",
        "The crop is not useful as living poultry forage.",
        "It does not fix nitrogen.",
        "Human-food use generally requires additional cleaning, dehulling, or milling.",
        "Its primary planner value is mature grain rather than foliage or forage."
      ]
    }
  },

  risks: {
    wildlife: {
      wildBirds: 5,
      deer: 2,
      raccoons: 1,
      squirrels: 3,
      rabbits: 2,
      rodents: 5,
      groundhogs: 2
    },

    insectsRiskScore: 3,

    diseaseRiskScore: 3,

    lodgingRiskScore: 3,

    fieldMoldRiskScore: 3,

    dryingMoldRiskScore: 4,

    storageMoldRiskScore: 4,

    storedInsectRiskScore: 4,

    spoilageSpeedRiskScore: 2,

    invasivenessConcernRiskScore: 3,

    selfSeedingRiskScore: 5,

    fruitDropRiskScore: 3,

    cropFailureRiskScore: 3,

    stormDamageRiskScore: 3,

    shadingOtherCropsRiskScore: 2,

    overfeedingRiskScore: 3,

    treatedSeedRiskScore: 5,

    primaryRisks: [
      {
        id:
          "wild-bird-grain-loss",

        severity:
          "very-high",

        affectedStages: [
          "grain-filling",
          "maturity",
          "field-drying"
        ],

        mitigationOptions: [
          "Bird netting",
          "Timely harvest",
          "Protected drying",
          "Larger consolidated planting",
          "Individual panicle bags for small trials"
        ],

        note:
          "Small exposed grain stands may attract heavy wild-bird feeding."
      },

      {
        id:
          "early-weed-competition",

        severity:
          "very-high",

        affectedStages: [
          "emergence",
          "seedling",
          "early-tillering"
        ],

        mitigationOptions: [
          "Prepare a clean seedbed",
          "Plant at an appropriate density",
          "Cultivate or hand weed early",
          "Avoid severely weedy ground",
          "Use stale-seedbed preparation where practical"
        ],

        note:
          "Proso Millet can be a weak early competitor and may suffer major yield loss from weeds."
      },

      {
        id:
          "uneven-grain-maturity",

        severity:
          "high",

        affectedStages: [
          "maturity",
          "harvest"
        ],

        mitigationOptions: [
          "Monitor upper and lower panicles",
          "Harvest when most grain is mature",
          "Finish drying after harvest",
          "Use multiple harvests in very small plantings"
        ],

        note:
          "Grain within and among panicles may not mature simultaneously."
      },

      {
        id:
          "seed-shattering-and-self-seeding",

        severity:
          "high",

        affectedStages: [
          "late-maturity",
          "harvest",
          "following-seasons"
        ],

        mitigationOptions: [
          "Harvest promptly",
          "Clean spilled grain",
          "Monitor volunteer plants",
          "Avoid allowing mature panicles to remain indefinitely"
        ],

        note:
          "Mature grain may shatter and create volunteer Millet plants."
      },

      {
        id:
          "wet-grain-storage",

        severity:
          "high",

        affectedStages: [
          "harvest",
          "drying",
          "storage"
        ],

        mitigationOptions: [
          "Dry thoroughly",
          "Use airflow",
          "Do not seal damp grain",
          "Inspect for heating and musty odors",
          "Use moisture-resistant storage after adequate drying"
        ],

        note:
          "Small grain can mold or heat when enclosed before it is sufficiently dry."
      },

      {
        id:
          "rodents-and-stored-insects",

        severity:
          "very-high",

        affectedStages: [
          "drying",
          "storage"
        ],

        mitigationOptions: [
          "Use rodent-proof containers",
          "Clean storage areas",
          "Inspect regularly",
          "Store only dry clean grain"
        ],

        note:
          "Loose Millet grain is highly attractive to rodents and may support stored-product insects."
      },

      {
        id:
          "balanced-feed-displacement",

        severity:
          "moderate",

        affectedStages: [
          "feeding"
        ],

        mitigationOptions: [
          "Use as a measured supplement",
          "Continue complete poultry feed",
          "Avoid unrestricted grain feeding"
        ],

        note:
          "Millet grain is energy-oriented and can displace nutritionally balanced feed when overused."
      },

      {
        id:
          "chemically-treated-seed",

        severity:
          "very-high",

        affectedStages: [
          "planting",
          "feeding"
        ],

        mitigationOptions: [
          "Use untreated planting seed",
          "Keep treated seed separated and labeled"
        ],

        note:
          "Chemically treated planting seed must never be fed."
      }
    ],

    directFacts: {
      wildBirdConcern:
        true,

      earlyWeedCompetitionConcern:
        true,

      unevenMaturityConcern:
        true,

      shatteringConcern:
        true,

      volunteerPlantConcern:
        true,

      grainMoistureStorageConcern:
        true,

      notes: [
        "Wild birds and weeds are among the most important backyard production risks.",
        "Dry weather at maturity improves harvest conditions.",
        "Wet or humid weather can delay dry-down and increase mold risk.",
        "Volunteer Millet may become a weed in following crops.",
        "Stored grain should be protected from rodents, insects, and moisture.",
        "Moldy, musty, heated, heavily insect-damaged, or otherwise questionable grain should not be fed."
      ]
    }
  },

  seasonalRoles: {
    earlySpring: false,

    lateSpring: true,

    summer: true,

    lateSummer: true,

    fall: true,

    winterStorage: true,

    perennial: false,

    plantingWindows: [
      {
        id:
          "direct-seed-after-frost",

        trigger:
          "after-last-frost",

        offsetWeeksMinimum: 1,
        offsetWeeksMaximum: 5,

        soilCondition:
          "warming-firm-and-weed-free",

        method:
          "direct-seed",

        note:
          "Plant after frost danger declines and the seedbed has warmed enough for rapid emergence."
      },

      {
        id:
          "late-short-season-planting",

        trigger:
          "warm-soil",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        method:
          "direct-seed",

        note:
          "The short maturity period may allow later planting than Corn or Sorghum where sufficient warm days remain."
      }
    ],

    harvestWindows: [
      {
        id:
          "fresh-mature-panicles",

        trigger:
          "grain-mature-before-prolonged-field-loss",

        usePathId:
          "fresh-mature-panicles",

        note:
          "Cut mature sound panicles for immediate flock enrichment before extended field exposure."
      },

      {
        id:
          "whole-dried-panicles",

        trigger:
          "majority-of-grain-mature",

        usePathId:
          "whole-dried-panicles",

        note:
          "Cut panicles and finish drying under protected ventilated conditions."
      },

      {
        id:
          "loose-dried-grain",

        trigger:
          "panicles-adequately-dry",

        usePathId:
          "loose-dried-grain",

        note:
          "Thresh, winnow, and clean grain after panicles are adequately dry."
      }
    ],

    cropSequenceRoles: [
      "Short-season warm-season grain",
      "Limited-water grain crop",
      "Late-planted emergency grain",
      "Fall grain harvest",
      "Winter-storage energy crop"
    ],

    seasonalLimitations: [
      "Not frost tolerant",
      "Weak early weed competition",
      "Wet weather complicates maturity and drying",
      "Mature grain may shatter or attract birds"
    ],

    directFacts: {
      warmSeasonAnnual: true,

      commonlyDirectSeeded: true,

      shortSeasonPlantingPossible:
        true,

      unevenMaturityPossible:
        true,

      postharvestDryingMayBeRequired:
        true,

      notes: [
        "Proso Millet can mature more quickly than most grain crops.",
        "Its short season can make it useful after a delayed spring or failed early crop.",
        "Planting too early into cold soil slows establishment.",
        "Harvest timing balances immature lower grain against shattering and bird loss from mature upper grain.",
        "Whole or loose grain can extend usefulness through winter after adequate drying and protected storage."
      ]
    }
  },

  usePaths: [
    {
      id:
        "fresh-mature-panicles",

      label:
        "Fresh Mature Millet Panicles",

      description:
        "Mature grain-filled panicles cut and offered relatively soon after harvest for immediate pecking enrichment.",

      primaryFeedRole:
        "grain-enrichment",

      harvestProducts: [
        "fresh-seed-heads",
        "millet-panicles"
      ],

      suitableFeedingMethods: [
        "whole-seed-heads",
        "immediate-feeding",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "cut-seed-heads"
      ],

      optionalProcessingTasks: [],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "bird-netting"
      ],

      harvestPattern:
        "several",

      harvestFrequencyCategory:
        "seasonal",

      storageMethods: [
        "short-term-fresh"
      ],

      preferredStorageMethod:
        "feed-soon-after-harvest",

      storageDurationCategory:
        "very-short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 3,
      rodentRiskScore: 3,
      storedInsectRiskScore: 2,

      harvestEaseScore: 4,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 2,
      flockValueScore: 5,

      safetyWarnings: [
        "Use only mature sound panicles without mold, decay, musty odor, or abnormal heating.",
        "Freshly cut panicles still contain moisture and should not be sealed for storage.",
        "Do not feed chemically treated planting seed.",
        "Millet remains supplemental to complete poultry feed."
      ],

      incompatibleUserTraits: [
        "requires-long-term-storage",
        "wants-loose-measured-grain-only"
      ]
    },

    {
      id:
        "whole-dried-panicles",

      label:
        "Whole Dried Millet Panicles",

      description:
        "Mature Millet panicles dried under protected ventilated conditions and stored whole for later flock enrichment.",

      primaryFeedRole:
        "grain-enrichment-storage",

      harvestProducts: [
        "dried-seed-heads",
        "millet-panicles"
      ],

      suitableFeedingMethods: [
        "whole-seed-heads",
        "winter-storage",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "cut-seed-heads",
        "dry"
      ],

      optionalProcessingTasks: [
        "clean-sort"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "drying-rack",
        "drying-screen",
        "fan",
        "bird-netting",
        "food-safe-bucket"
      ],

      harvestPattern:
        "major",

      harvestFrequencyCategory:
        "once-twice",

      storageMethods: [
        "dried-whole"
      ],

      preferredStorageMethod:
        "dry-ventilated-rodent-protected",

      storageDurationCategory:
        "medium-long",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: true,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 4,
      rodentRiskScore: 5,
      storedInsectRiskScore: 3,

      harvestEaseScore: 4,
      preparationEaseScore: 4,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 2,
      flockValueScore: 5,

      safetyWarnings: [
        "Dry panicles thoroughly before enclosed storage.",
        "Do not store damp, musty, heated, or visibly moldy panicles.",
        "Protect stored panicles from rodents and insects.",
        "Inspect stored material regularly.",
        "Do not feed chemically treated planting seed."
      ],

      incompatibleUserTraits: [
        "declines-drying",
        "has-no-protected-drying-area",
        "has-no-rodent-protected-storage"
      ]
    },

    {
      id:
        "loose-dried-grain",

      label:
        "Loose Dried Proso Millet Grain",

      description:
        "Mature grain dried, threshed, winnowed, cleaned, and stored for measured supplemental feeding.",

      primaryFeedRole:
        "energy-grain-storage",

      harvestProducts: [
        "dry-grain",
        "millet-grain"
      ],

      suitableFeedingMethods: [
        "whole-grain",
        "measured-supplement",
        "winter-storage",
        "scatter-feeding"
      ],

      requiredProcessingTasks: [
        "cut-seed-heads",
        "dry",
        "thresh",
        "winnow",
        "clean-sort"
      ],

      optionalProcessingTasks: [
        "grind"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "drying-rack",
        "drying-screen",
        "fan",
        "grain-thresher",
        "food-safe-bucket",
        "metal-grain-can",
        "moisture-meter"
      ],

      harvestPattern:
        "major",

      harvestFrequencyCategory:
        "once-twice",

      storageMethods: [
        "dried-threshed"
      ],

      preferredStorageMethod:
        "airtight-after-adequate-drying",

      storageDurationCategory:
        "long",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: true,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: true,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 4,
      rodentRiskScore: 5,
      storedInsectRiskScore: 4,

      harvestEaseScore: 2,
      preparationEaseScore: 2,
      beginnerSuitabilityScore: 2,

      householdFoodValueScore: 4,
      flockValueScore: 4,

      safetyWarnings: [
        "Grain must be adequately dry before being placed in airtight storage.",
        "Do not mix questionable grain with clean sound grain.",
        "Inspect regularly for insects, rodents, moisture, heating, and mold.",
        "Discard moldy, musty, heated, or heavily insect-damaged grain.",
        "Do not feed chemically treated planting seed.",
        "Keep Millet supplemental to a complete poultry ration."
      ],

      incompatibleUserTraits: [
        "declines-drying",
        "declines-threshing",
        "declines-winnowing",
        "requires-minimal-processing",
        "has-no-dry-storage",
        "has-no-rodent-protected-storage"
      ]
    }
  ],

  dataQuality: {
    overallConfidence:
      0.78,

    verifiedFields: [
      "identity",
      "lifecycle",
      "climate.directFacts.shortSeasonGrain",
      "climate.directFacts.approximateMaturityDaysMinimum",
      "climate.directFacts.approximateMaturityDaysMaximum",
      "site.directFacts.preferredLight",
      "soil.directFacts.lowFertilityAdaptation",
      "soil.directFacts.sandySoilAdaptation",
      "soil.directFacts.fineFirmSeedbedHelpful",
      "water.directFacts.lowWaterRequirementGrain",
      "water.directFacts.droughtTolerantAfterEstablishment",
      "space.directFacts.denseStandSuitable",
      "space.directFacts.blockPollinationRequired",
      "flock.directFacts.edibleFeedParts",
      "flock.directFacts.nutritionalOrientation",
      "labor.directFacts.unevenMaturityConcern",
      "risks.directFacts.wildBirdConcern",
      "risks.directFacts.earlyWeedCompetitionConcern",
      "risks.directFacts.unevenMaturityConcern",
      "risks.directFacts.shatteringConcern",
      "seasonalRoles.directFacts.shortSeasonPlantingPossible"
    ],

    derivedFields: [
      "climate",
      "site",
      "soil.textureScores",
      "water",
      "space.smallSpaceScore",
      "space.mediumSpaceScore",
      "space.largeSpaceScore",
      "space.layoutScores",
      "space.spaceTypeScores",
      "flock.flockPurposeScores",
      "flock.feedingMethodScores",
      "labor",
      "cost",
      "goals",
      "risks.wildlife",
      "usePaths.fresh-mature-panicles",
      "usePaths.whole-dried-panicles",
      "usePaths.loose-dried-grain"
    ],

    uncertainFields: [
      "climate.dryDownBufferDays",
      "soil.minimumSoilDepthIn",
      "soil.saltToleranceScore",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "space.minimumRaisedBedDepthIn",
      "flock.portionGuidance",
      "usePaths.fresh-mature-panicles.exactStorageDuration",
      "usePaths.whole-dried-panicles.exactStorageDuration",
      "usePaths.loose-dried-grain.exactStorageDuration",
      "risks.wildlife.deer",
      "risks.wildlife.squirrels"
    ],

    missingFields: [
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "flock.usePathTesting"
    ],

    lastReviewed:
      "2026-07-15",

    primarySources: [
      {
        title:
          "Proso Millet Production",

        organization:
          "University Cooperative Extension production resources",

        sourceType:
          "extension-production-guide",

        use:
          "Short-season growth, planting, soil, water, fertility, weed management, harvest, shattering, and grain drying"
      },

      {
        title:
          "Alternative Uses of Proso Millet",

        organization:
          "University of Nebraska–Lincoln Extension",

        sourceType:
          "extension-crop-and-feed-guide",

        use:
          "Poultry feed, bird seed, human-food use, grain composition, processing, and alternative markets"
      },

      {
        title:
          "Proso Millet and Its Potential for Cultivation in the Pacific Northwest",

        organization:
          "Peer-reviewed crop-science researchers",

        sourceType:
          "peer-reviewed-review",

        use:
          "Crop history, short maturity, drought adaptation, production systems, grain quality, and food/feed uses"
      },

      {
        title:
          "Grain Drying, Handling, and Storage",

        organization:
          "University Cooperative Extension resources",

        sourceType:
          "extension-storage-guide",

        use:
          "Grain moisture, drying, cooling, insects, rodents, mold, and safe storage"
      }
    ],

    notes: [
      "Proso Millet plannerData is specific to Panicum miliaceum grown for mature grain.",
      "It should not be confused with Pearl Millet, Foxtail Millet, Japanese Millet, Browntop Millet, or other crops commonly called Millet.",
      "The record separates fresh mature panicles, whole dried panicles, and loose dried grain into separate use paths.",
      "Whole-panicle use is substantially easier than loose-grain threshing and cleaning.",
      "The crop is classified as an energy grain rather than a complete poultry ration.",
      "Its short season and low water requirement are major strengths.",
      "Wild-bird loss, early weed competition, uneven maturity, shattering, and postharvest processing are major limitations.",
      "Minimum useful area, exact storage duration, and flock feeding portions remain intentionally null.",
      "The crop should remain in testing until short-season, limited-water, whole-panicle, and loose-grain profiles are evaluated."
    ]
  }
}

  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - PUMPKIN-WINTER-SQUASH
    //
    //
    //
    //
    //////////////////////////////////////////////

    "CROP-PUMPKIN-WINTER-SQUASH": {
    id: "CROP-PUMPKIN-WINTER-SQUASH",

    name: "Pumpkins and Winter Squash",
    scientificName: "Cucurbita spp.",

    category: "High-Bulk Storage and Enrichment Crop",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Pumpkins and winter squash can provide a large seasonal harvest of moisture-rich flesh, edible seeds, enrichment, carotenoid-containing plant material, and fruit that may store for weeks or months after curing. They are useful supplements but require substantial growing space and should not be treated as concentrated replacements for balanced poultry feed.",

    chickenUse: {
      edibleParts: [
        "Mature flesh",
        "Mature seeds",
        "Soft inner pulp",
        "Cooked or raw squash pieces",
        "Tender fruit from edible squash varieties"
      ],

      primaryValue: [
        "Seasonal enrichment",
        "Moisture-rich supplemental food",
        "Carotenoid-containing flesh",
        "Energy-dense seeds",
        "Fall and winter storage",
        "Use of cosmetically damaged but sound fruit"
      ],

      feedingForms: [
        "Whole fruit split open",
        "Halved or quartered fruit",
        "Chopped raw flesh",
        "Plain cooked flesh",
        "Dried or fresh unsalted seeds",
        "Frozen plain purée in limited portions"
      ],

      bestFor: [
        "Adult chickens as a seasonal supplement",
        "Fall enrichment",
        "Gardens with substantial vine space",
        "Growers wanting a storage crop",
        "Using surplus or cosmetically imperfect edible squash",
        "Flocks that benefit from pecking and foraging enrichment"
      ],

      supplementOnly: true,

      preparationNotes:
        "Wash soil or contaminants from the rind before feeding. Split or puncture hard fruit so chickens can reach the flesh and seeds. Large pieces may be offered for pecking enrichment. Cooked squash should be plain, cooled, and free from salt, sugar, butter, spices, or spoiled ingredients.",

      safetyNotes:
        "Offer only sound edible pumpkins or winter squash. Discard fruit that is moldy, fermented, rotten, chemically treated after harvest, or contaminated by pesticides not labeled for food crops. Extremely bitter squash may contain elevated cucurbitacins and should not be fed. Pumpkin seeds should not be promoted as a proven dewormer or as a substitute for veterinary diagnosis and effective parasite treatment."
    },

    nutrition: {
      basis:
        "Pumpkin flesh and pumpkin seeds must be treated as separate feed materials. Flesh values are generally reported on an as-fed basis and contain substantial water. Seed values vary depending on whether the seed is whole, hulled, roasted, dried, or expressed as meal.",

      crudeProteinPercent:
        "Flesh is generally low in protein; dried or hulled pumpkin seeds may contain roughly 25% to 35% protein, depending on species and processing",

      fatPercent:
        "Flesh contains very little fat; dried seed kernels may contain roughly 40% to 50% fat",

      fiberPercent:
        "Flesh is relatively low to moderate in fiber on an as-fed basis; whole seeds contain more fiber because of the hull",

      calciumPercent: null,

      phosphorusPercent:
        "Seeds can be phosphorus-rich, but the exact value and availability vary by species, seed form, and processing",

      notableNutrients: [
        "Water and moisture",
        "Beta-carotene and other carotenoids in orange-fleshed varieties",
        "Carbohydrates",
        "Potassium",
        "Vitamin C in fresh flesh",
        "Vitamin E in seeds",
        "Magnesium in seeds",
        "Phosphorus in seeds",
        "Unsaturated fats in seeds",
        "Moderate to high seed protein"
      ],

      limitations: [
        "Fresh flesh is mostly water and has low dry-matter nutrient density",
        "Flesh should not be compared pound-for-pound with dry commercial feed",
        "Seeds are energy-dense and can contribute excessive dietary fat when overfed",
        "Seed protein does not provide a complete amino-acid balance for poultry",
        "Calcium is insufficient for laying hens when pumpkin or squash displaces balanced layer feed",
        "Nutrient values vary greatly among Cucurbita species and varieties",
        "Whole seed, hulled kernels, seed meal, and flesh have very different compositions",
        "Claims that pumpkin seeds reliably deworm chickens are not adequately supported"
      ]
    },

    growing: {
      sunlight:
        "Full sun; generally at least 6 to 8 hours of direct sunlight daily",

      soilTemperatureMinimumF:
        "Approximately 60°F to 65°F for dependable germination",

      idealSoilTemperatureF:
        "Approximately 70°F to 95°F for rapid squash-seed germination, depending on variety and conditions",

      frostTolerance: "Very Low",

      heatTolerance:
        "Moderate to High, although extreme heat can interfere with flowering, pollination, and fruit set",

      droughtTolerance:
        "Low to Moderate; vines may survive short dry periods, but consistent moisture is important for fruit development",

      soilPHMinimum: 5.8,
      soilPHMaximum: 7.0,

      waterNeeds:
        "Moderate to High. Supply deep, consistent moisture, particularly during flowering and fruit enlargement, while avoiding persistently waterlogged soil and unnecessary wetting of foliage.",

      directSow: true,

      transplantRecommended:
        "Optional. Short-season growers may start plants indoors approximately 2 to 4 weeks before transplanting, but squash roots should be disturbed as little as possible.",

      daysToFirstHarvestMinimum: 75,
      daysToFirstHarvestMaximum: 120,

      daysToMaturityMinimum: 75,
      daysToMaturityMaximum: 120,

      plantSpacingInches:
        "Bush varieties may require approximately 24 to 48 inches; vining varieties commonly require substantially more room",

      rowSpacingInches:
        "Often approximately 4 to 8 feet or more for vining types, depending on variety and production system",

      plantingDepthInches:
        "Approximately 1 inch",

      successionPlanting:
        "Possible only where enough frost-free growing time remains for the selected variety",

      regrowthAfterHarvest: false
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Start short-season varieties indoors approximately 2 to 4 weeks before the final frost or direct sow after frost danger when soil is warm. Choose varieties with approximately 75 to 100 days to maturity.",
        harvestWindow:
          "Late summer through early fall, before a hard freeze. Mature fruit should develop a hard rind and full variety-specific color."
      },

      midwestNortheast: {
        plantingWindow:
          "Direct sow after frost danger once soil is at least approximately 60°F to 65°F, commonly during late spring. Transplants may be used for a modest head start.",
        harvestWindow:
          "Late summer through fall, before hard frost."
      },

      upperSouth: {
        plantingWindow:
          "Plant after frost from mid- to late spring. Choose planting dates that reduce exposure of young plants to cold soil and reduce fruit development during the most severe heat where possible.",
        harvestWindow:
          "Late summer through fall, depending on variety and planting date."
      },

      deepSouth: {
        plantingWindow:
          "Plant in spring after frost or use a later planting where local pest, disease, and heat conditions permit. Regional extension recommendations should guide timing because intense summer heat and insect pressure may reduce success.",
        harvestWindow:
          "Summer through late fall, depending on planting date, species, and local climate."
      },

      southwest: {
        plantingWindow:
          "Plant after frost when soil is warm and dependable irrigation is available. Avoid scheduling flowering and early fruit set during the most extreme heat when possible.",
        harvestWindow:
          "Summer through fall, depending on elevation, irrigation, and planting date."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant after frost in warm soil, often using transplants or black plastic mulch to increase soil warmth. Choose early-maturing varieties in cool-summer areas.",
        harvestWindow:
          "Late summer into early fall before prolonged cold and wet conditions."
      },

      coastalWest: {
        plantingWindow:
          "Plant after frost once the soil is warm. Inland and warmer coastal locations usually provide more reliable heat than foggy coastal sites.",
        harvestWindow:
          "Late summer through fall."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Several weeks to several months, depending on species, variety, maturity, curing, rind condition, and storage environment",

      storageMethod:
        "Harvest mature fruit with a portion of stem attached when practical. Cure only varieties that benefit from curing, then store sound fruit in a dry, well-ventilated location at the temperature recommended for that squash type. Avoid stacking fruit deeply and inspect regularly for soft spots, mold, or leakage.",

      yieldNotes:
        "Plants-per-area values remain null because this combined record includes bush, semi-bush, and long-vining pumpkins and winter squash with substantially different space requirements. Compact varieties may be spaced approximately 2 to 4 feet apart, while large vining types may require rows or growing areas 6 to 10 feet wide or more. A single plant-density value would therefore produce misleading garden-planning results. Pumpkin and winter-squash yield also varies widely by species, cultivar, vine habit, fruit number, fruit weight, pollination, pest pressure, and whether the crop is grown on open ground, trained along an edge, or trellised. Separate density and yield estimates should be developed later for compact bush squash, small-fruited vines, standard storage squash, and large pumpkins."

    },

    economics: {
      seedCostEstimate:
        "Generally low to moderate per plant, although specialty, hybrid, hull-less-seed, and disease-resistant varieties may cost more",

      equipmentCostEstimate:
        "Low to moderate. Possible expenses include irrigation, mulch, row covers, trellising for small-fruited varieties, pest controls, curing space, and storage racks.",

      irrigationCostLevel: "Moderate",

      laborLevel:
        "Moderate. Labor includes planting, vine management, pest inspection, harvesting bulky fruit, curing, storage checks, and cutting fruit for the flock.",

      potentialFeedSavings: null,

      economicNotes:
        "Pumpkins and winter squash may offer good value when they use otherwise available garden space, store successfully, serve both household and poultry needs, or make use of surplus edible fruit. Their high fresh weight can exaggerate apparent feed savings because most flesh is water. Economic comparisons should be based on dry matter and usable nutrient contribution rather than fruit weight alone."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for general cultivation, maturity, space requirements, curing, storage principles, and human-food nutrient composition; moderate for use as a poultry supplement; limited for backyard feed-replacement value, crop yield per square foot, and poultry-specific feeding amounts",

      sources: [
        {
          title:
            "Growing Pumpkins and Winter Squash in the Home Garden",
          organization:
            "University and Cooperative Extension horticulture guidance",
          url:
            "https://extension.umn.edu/vegetables/growing-pumpkins-and-winter-squash",
          use:
            "Planting, soil warmth, spacing, watering, maturity, harvest, pests, and storage"
        },

        {
          title:
            "Pumpkin Production",
          organization:
            "Penn State Extension",
          url:
            "https://extension.psu.edu/pumpkin-production",
          use:
            "Production practices, planting populations, fertility, pollination, pests, diseases, harvest, and commercial yield context"
        },

        {
          title:
            "Vegetable Production Handbook — Cucurbit Crops",
          organization:
            "University of Georgia Cooperative Extension",
          url:
            "https://extension.uga.edu/publications/",
          use:
            "Regional production guidance, planting considerations, pest pressure, disease management, and harvest timing"
        },

        {
          title:
            "USDA FoodData Central",
          organization:
            "United States Department of Agriculture",
          url:
            "https://fdc.nal.usda.gov/",
          use:
            "Nutrient context for raw pumpkin flesh, cooked winter squash, whole seeds, and seed kernels"
        },

        {
          title:
            "Oil and Tocopherol Content and Composition of Pumpkin Seed Oil in 12 Cultivars",
          organization:
            "USDA Agricultural Research Service and Journal of Agricultural and Food Chemistry",
          url:
            "https://pubmed.ncbi.nlm.nih.gov/17439238/",
          use:
            "Variation in pumpkin-seed oil, fatty acids, and vitamin E among cultivars"
        },

        {
          title:
            "Pumpkin Seed Meal and Pumpkin Byproducts in Poultry Nutrition",
          organization:
            "Peer-reviewed poultry and animal-feed literature",
          url:
            "https://scholar.google.com/scholar?q=pumpkin+seed+meal+poultry+nutrition",
          use:
            "Research context for processed seed meal, dietary inclusion, antioxidant compounds, and differences between whole pumpkin and formulated feed ingredients"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Separate future records may be needed for pumpkins, butternut squash, acorn squash, cushaw, and hull-less seed pumpkins.",
        "Do not use large-fruited pumpkin yield data to score small-fruited winter squash.",
        "Find primary poultry-feeding studies that distinguish flesh, whole seed, kernels, oil, and seed meal.",
        "Do not repeat unsupported claims that pumpkin or pumpkin seeds reliably eliminate internal parasites.",
        "Research whether Cucurbita species differ meaningfully in cucurbitacin risk and poultry palatability.",
        "Determine the fresh-matter and dry-matter yield of representative small, medium, and large varieties.",
        "Measure storage loss, rind waste, stem waste, and edible fraction before calculating feed value.",
        "Compare direct feeding of whole fruit with cooked, chopped, dried, or fermented forms.",
        "Research squash vine borer resistance, especially the relative resilience of Cucurbita moschata varieties.",
        "Find regional planting dates from state extension sources before publishing location-specific calendars.",
        "Calculate scores only after several crops have comparable evidence and complete data.",
        "Plant-density fields remain null because bush, semi-bush, and long-vining Cucurbita varieties cannot be represented accurately by one plants-per-square-foot estimate.",

      ]
    },

plannerData: {
  schemaVersion: "1.0.0",

  developmentStatus:
    "ready",

  identity: {
    plannerName:
      "Pumpkins and Winter Squash",

    shortLabel:
      "Pumpkin & Squash",

    icon:
      "🎃",

    cropCategory:
      "storage-vegetable",

    primaryFeedCategory:
      "storage-produce",

    guideUrl:
      "growing-pumpkins-winter-squash-for-chickens.html"
  },

  lifecycle: {
    growthCycle:
      "annual",

    isAnnual: true,
    isBiennial: false,
    isPerennial: false,
    isTreeOrShrub: false,

    yearsToFirstUsefulHarvest: 0,
    yearsToFullProduction: 0,
    expectedUsefulLifeYears: 1,

    regrowsAfterHarvest: false,

    permanentPlantingRequired: false,
    reversibleAfterOneSeason: true
  },

  climate: {
    suitableClimateTypes: [
      "cool-moderate-summer",
      "temperate",
      "hot-humid",
      "hot-dry",
      "mild-winter"
    ],

    preferredClimateTypes: [
      "temperate",
      "hot-humid",
      "mild-winter"
    ],

    challengingClimateTypes: [
      "cold-short-summer",
      "high-elevation"
    ],

    minimumFrostFreeDays: null,
    preferredFrostFreeDays: null,

    minimumSoilTemperatureF: 60,
    preferredSoilTemperatureF: 70,

    daysToMaturityMinimum: 80,
    daysToMaturityMaximum: 120,

    dryDownBufferDays: null,

    heatToleranceScore: 4,

    droughtClimateToleranceScore: 2,

    humidityToleranceScore: 3,

    coolSummerToleranceScore: 3,

    frostSensitivityScore: 5,

    winterHardinessRequired: false,

    seasonExtensionBenefits: [
      "Indoor seed starting can help varieties mature in shorter growing seasons.",
      "Black plastic or other soil-warming methods may improve early establishment.",
      "Floating row cover can protect young plants from cool weather and insect pests before flowering.",
      "Early-maturing or compact varieties may improve success where the frost-free season is limited."
    ],

    indoorSeedStartingBenefitScore: 4,

    directFacts: {
      seasonType:
        "warm-season",

      frostSensitive: true,

      plantAfterFrostDanger: true,

      warmSoilRequired: true,

      germinationSoilTemperatureFMinimum:
        60,

      preferredGerminationSoilTemperatureF:
        70,

      maturityHighlyVarietyDependent:
        true,

      speciesAndCultivarVariation:
        true,

      notes: [
        "Pumpkins and Winter Squash are frost-sensitive warm-season crops.",
        "Cold wet soil can delay germination and increase seed-decay risk.",
        "Compact, bush, short-vine, and full-vining cultivars may differ greatly in maturity and space requirements.",
        "Small-fruited varieties often mature earlier than giant or very large-fruited varieties.",
        "Hot weather generally supports vine growth when water remains available.",
        "High humidity can increase powdery mildew, downy mildew, fruit rot, and other disease concerns.",
        "Exact frost-free-season requirements remain null because maturity varies substantially among species and cultivars.",
        "The stored maturity range is a broad planning range rather than a guarantee for every Pumpkin or Winter Squash variety."
      ]
    }
  },

  site: {
    absoluteMinimumSunHours: null,

    productiveMinimumSunHours: 6,

    preferredSunHours: 8,

    shadeToleranceScore: 2,

    afternoonShadeBenefitInHeat: 2,

    windToleranceScore: 3,

    lodgingRiskScore: 1,

    reflectedHeatToleranceScore: 4,

    airflowRequirementScore: 5,

    frostPocketSensitivityScore: 5,

    treeRootCompetitionToleranceScore: 2,

    hardscapeConflictRiskScore: 4,

    structureConflictRiskScore: 4,

    utilityConflictRiskScore: 3,

    fruitDropMessRiskScore: 2,

    stainingRiskScore: 1,

    directFacts: {
      preferredLight:
        "full-sun",

      productiveSunGuidance:
        "At least 6 hours of direct sunlight, with approximately 8 hours preferred for strong vine growth, flowering, fruit set, and fruit maturation.",

      windExposureConcern:
        true,

      growthHabits: [
        "bush",
        "semi-bush",
        "short-vine",
        "full-vining"
      ],

      vineLengthHighlyVariable:
        true,

      pollinatorAccessImportant:
        true,

      notes: [
        "Full sun generally supports the strongest flowering and fruit production.",
        "Partial shade may produce excessive foliage with fewer or smaller mature fruits.",
        "Good airflow helps foliage dry after rain or irrigation.",
        "Vines can spread across paths, lawns, neighboring beds, fencing, and utility areas.",
        "Fruit resting on pavement or extremely hot hardscape may overheat or become damaged.",
        "A site should allow access by bees and other pollinating insects.",
        "Strong wind may damage large leaves or move unsupported vines, although the plants do not lodge like tall grain crops.",
        "Avoid frost pockets where early fall cold could end the season before fruit fully matures."
      ]
    }
  },

  soil: {
    textureScores: {
      heavyClay: 2,
      clayLoam: 4,
      loam: 5,
      sandyLoam: 4,
      verySandy: 2,
      rocky: 2
    },

    drainageRequirementScore: 5,

    temporaryWetToleranceScore: 2,

    waterloggingSensitivityScore: 5,

    minimumSoilDepthIn: 12,
    preferredSoilDepthIn: 18,

    compactionToleranceScore: 2,

    establishmentInSodDifficultyScore: 5,

    preferredPHMinimum: 6.0,
    preferredPHMaximum: 7.0,

    survivalPHMinimum: null,
    survivalPHMaximum: null,

    fertilityRequirementScore: 5,

    nitrogenRequirementScore: 4,
    phosphorusRequirementScore: 4,
    potassiumRequirementScore: 5,

    benefitsFromInoculation: false,

    inoculantType: null,

    saltToleranceScore: null,

    amendmentEffortScore: 4,

    directFacts: {
      preferredDrainage:
        "well-drained",

      preferredTextures: [
        "loam",
        "sandy loam",
        "well-drained clay loam"
      ],

      organicMatterBenefit:
        true,

      heavyFeedingCrop:
        true,

      waterloggedSoilSuitable:
        false,

      notes: [
        "Pumpkins and Winter Squash favor fertile, well-drained soil with substantial organic matter.",
        "Loam offers a useful balance of drainage, moisture retention, fertility, and root development.",
        "Sandy loam can perform well but may require more frequent watering and fertility management.",
        "Heavy clay is a poor fit when it remains saturated, compacts easily, or restricts roots.",
        "Very sandy soil may dry too quickly during flowering and fruit development.",
        "The crop removes meaningful nutrients when large fruits and vines are harvested.",
        "Excessive nitrogen can promote vines and leaves at the expense of flowering and fruit development.",
        "Adequate potassium supports fruit growth and quality.",
        "The stored pH values represent a productive planning range rather than absolute survival limits."
      ]
    }
  },

  water: {
    overallWaterRequirementLevel:
      "high",

    germinationWaterNeedLevel:
      "moderate",

    establishmentWaterNeedLevel:
      "moderate",

    matureWaterNeedLevel:
      "high",

    floweringWaterNeedLevel:
      "high",

    harvestDevelopmentWaterNeedLevel:
      "high",

    droughtSurvivalScore: 2,

    droughtYieldRetentionScore: 2,

    criticalGrowthStages: [
      "germination",
      "seedling-establishment",
      "vine-development",
      "flowering",
      "fruit-setting",
      "fruit-expansion"
    ],

    criticalStageWaterImportanceScore: 5,

    overwateringSensitivityScore: 4,

    waterloggingSensitivityScore: 5,

    dripIrrigationBenefitScore: 5,

    mulchBenefitScore: 5,

    suitableForRainfallOnlyScore: 2,

    suitableForLimitedIrrigationScore: 2,

    containerDryingRiskScore: 5,

    establishmentYearsRequiringExtraWater: 0,

    directFacts: {
      consistentMoistureImportant:
        true,

      floweringMoistureImportant:
        true,

      fruitExpansionMoistureImportant:
        true,

      standingWaterSuitable:
        false,

      typicalWeeklyWaterInchesMinimum:
        1,

      typicalWeeklyWaterInchesMaximum:
        2,

      reduceWaterNearFinalMaturity:
        true,

      notes: [
        "Consistent moisture supports vine growth, flowering, fruit set, and fruit expansion.",
        "Severe drought can cause flower loss, poor fruit set, small fruit, or premature plant decline.",
        "Large leaves and extensive vines can use substantial water during hot weather.",
        "Drip irrigation or soaker hoses help deliver water while keeping foliage and fruit drier.",
        "Mulch conserves water, suppresses weeds, and helps keep fruit away from bare wet soil.",
        "Standing water and saturated soil increase root, crown, and fruit-rot risk.",
        "Large fluctuations between very dry and very wet soil may contribute to irregular growth or fruit damage.",
        "Water may be reduced as mature fruit approaches harvest, but plants should not be allowed to collapse prematurely.",
        "Container-grown plants dry much faster than vines rooted in open soil."
      ]
    }
  },

  space: {
    minimumTrialAreaSqFt: null,

    minimumUsefulAreaSqFt: null,

    preferredProductionAreaSqFt: null,

    smallSpaceScore: 2,

    mediumSpaceScore: 4,

    largeSpaceScore: 5,

    layoutScores: {
      squareBlock: 3,
      wideRectangle: 5,
      longStrip: 5,
      irregular: 4,
      smallBeds: 2,
      openField: 5
    },

    spaceTypeScores: {
      inGround: 5,
      raisedBed: 3,
      container: 2,
      fenceLine: 4,
      buildingEdge: 3,
      unusedLawn: 5,
      openField: 5,
      orchard: 2,
      forageFrame: 1,
      rotationalPaddock: 2,
      greenhouse: 2,
      hedgerow: 2
    },

    minimumContainerGallons: null,

    containerUseLimitation:
      "Compact or bush varieties may grow in very large containers, but water demand, root volume, vine spread, and fruit weight make container production inefficient for most feed-crop plans.",

    minimumRaisedBedDepthIn: 12,

    vineSpreadRequired: true,

    verticalSupportBenefitScore: 3,

    blockPlantingRequired: false,

    minimumBlockRows: null,

    continuousStandPreferred: false,

    heightCategory:
      "low-vining",

    matureWidthCategory:
      "very-wide-variety-dependent",

    overflowSpaceBenefitScore: 5,

    directFacts: {
      layoutFlexibleWithOverflow:
        true,

      blockPollinationRequired: false,

      bushVarietiesAvailable: true,

      shortVineVarietiesAvailable: true,

      fullViningVarietiesAvailable:
        true,

      trellisPossibleForSmallFruit:
        true,

      largeFruitTrellisLimitation:
        true,

      vineSpreadFtMinimum:
        4,

      vineSpreadFtMaximum:
        15,

      notes: [
        "Most Pumpkins and Winter Squash require substantially more room than leafy crops or upright seed crops.",
        "Full-sized vines may spread many feet beyond the planting bed.",
        "Unused lawn, garden edges, fence lines, and open-field areas can provide valuable overflow space.",
        "Bush and compact cultivars improve suitability for smaller gardens.",
        "Small-fruited varieties may be trained onto a sturdy trellis.",
        "Large or heavy fruits are poor candidates for unsupported vertical growing.",
        "Raised beds can work when vines are allowed to trail outside the bed.",
        "Containers are horticulturally possible with compact cultivars but generally inefficient for meaningful flock production.",
        "Minimum useful and production areas remain null because cultivar size, fruit count, flock size, and harvest goals vary substantially."
      ]
    }
  },

  flock: {
    suitableForAdultChickens: true,

    suitableForYoungChicks: false,

    flockPurposeScores: {
      eggs: 4,
      meat: 3,
      breeding: 3,
      petsEnrichment: 5,
      homestead: 5,
      mixed: 5
    },

    feedingMethodScores: {
      livingGrazing: 1,
      cutAndCarry: 2,
      wholeProduce: 5,
      wholeSeedHeads: 1,
      wholeGrain: 2,
      processedGrain: 2,
      heatTreated: 4,
      driedForage: 1,
      winterStorage: 5
    },

    directRunSuitabilityScore: 1,

    forageFrameSuitabilityScore: 1,

    rotationalPaddockSuitabilityScore: 2,

    confinedFlockValueScore: 5,

    pasturedFlockValueScore: 4,

    treatDilutionRiskScore: 3,

    highEnergySupplement: false,

    highFiberSupplement: true,

    concentratedFatSource: false,

    primaryFlockUses: [
      "Whole-fruit pecking enrichment",
      "Fresh split Pumpkin or Squash",
      "Stored winter produce",
      "Plain cooked household leftovers",
      "Shared household-and-flock harvest"
    ],

    unsuitablePrimaryUses: [
      "Complete-ration replacement",
      "Living forage",
      "Permanent-run planting",
      "Concentrated protein crop",
      "High-energy grain replacement",
      "Primary young-chick feed"
    ],

    directFacts: {
      edibleFeedParts: [
        "Mature flesh",
        "Mature seeds",
        "Soft internal pulp",
        "Plain cooked flesh"
      ],

      preferredBirdStage:
        "Established adult chickens",

      cropSurvivalWithDirectChickenAccess:
        "poor-before-fruit-maturity",

      directAccessTiming:
        "Protect vines and developing fruit from chickens, then offer harvested mature fruit after splitting or opening it.",

      nutritionalOrientation: [
        "storage-produce",
        "fresh-produce",
        "fiber",
        "carotenoid-rich-plant-material",
        "enrichment",
        "household-food"
      ],

      balancedFeedReplacement:
        false,

      notes: [
        "Mature sound fruit provides a useful whole-produce supplementation path.",
        "Splitting or opening the fruit gives chickens easier access to the flesh, pulp, and seeds.",
        "Whole fruit can provide prolonged pecking enrichment.",
        "Pumpkin and Winter Squash flesh contains substantial moisture and is not a concentrated dry feed.",
        "Seeds contain more concentrated nutrients than the flesh but remain only one portion of the fruit.",
        "The crop should remain supplemental to an age-appropriate complete poultry feed.",
        "The planner does not treat Pumpkin seeds as a proven deworming medication.",
        "Young chicks should continue receiving a complete starter ration.",
        "Growing vines should generally be protected from unrestricted chicken access."
      ]
    }
  },

  labor: {
    beginnerFriendlinessScore: 4,

    plantingEaseScore: 4,

    establishmentEaseScore: 4,

    routineMaintenanceEaseScore: 3,

    weedControlEaseScore: 4,

    wildlifeProtectionEaseScore: 3,

    harvestEaseScore: 3,

    wholeFruitProcessingEaseScore: 5,

    curingEaseScore: 3,

    cookingEaseScore: 4,

    storageMonitoringEaseScore: 4,

    perennialMaintenanceEaseScore: 5,

    physicalAccessibilityScore: 3,

    heavyLiftingRiskScore: 4,

    weeklyLaborLevel:
      "moderate",

    peakWorkloadLevel:
      "moderate",

    harvestFrequencyCategory:
      "once-twice",

    requiredPlantingTasks: [
      "prepare-seedbed",
      "plant-large-seed"
    ],

    optionalPlantingTasks: [
      "start-indoors",
      "transplant",
      "install-irrigation"
    ],

    requiredMaintenanceTasks: [
      "hand-weed",
      "protect-from-wildlife"
    ],

    optionalMaintenanceTasks: [
      "mulch",
      "trellis"
    ],

    requiredHarvestTasks: [
      "harvest-heavy-fruit"
    ],

    usePathProcessingTasks: {
      freshSplitFruit: [
        "harvest-heavy-fruit",
        "chop"
      ],

      curedWholeStorageFruit: [
        "harvest-heavy-fruit",
        "cure",
        "inspect-mold"
      ],

      cookedPlainFlesh: [
        "harvest-heavy-fruit",
        "chop",
        "cook"
      ]
    },

    requiredStorageTasks: [
      "inspect-mold",
      "rotate-stored-produce"
    ],

    specializedEquipmentRequired: [],

    specializedEquipmentHelpful: [
      "hand-pruners",
      "cart",
      "trellis",
      "drip-irrigation",
      "cool-storage",
      "food-safe-container"
    ],

    suitableForLowTimeUsersScore: 3,

    suitableForSoloGrowersScore: 3,

    directFacts: {
      seedSize:
        "large-and-easy-to-handle",

      directSeedingSuitable: true,

      transplantingSuitable: true,

      specializedHarvestEquipmentRequiredForBackyardScale:
        false,

      majorLaborBottlenecks: [
        "Managing long vines",
        "Monitoring Squash bugs and vine borers",
        "Maintaining water during flowering and fruit development",
        "Hand pollination when natural pollination is poor",
        "Lifting and moving heavy fruit",
        "Curing fruit properly",
        "Inspecting stored fruit for soft spots and decay"
      ],

      notes: [
        "Large seeds make planting straightforward.",
        "Direct seeding is practical where the growing season is sufficiently long.",
        "Transplants can help short-season growers but should be handled carefully to reduce root disturbance.",
        "Vines suppress some weeds after the canopy closes.",
        "Large leaves and tangled vines can make pest inspection difficult.",
        "Small and medium fruit can usually be harvested by one person.",
        "Large and giant fruit may require a cart, assistance, or modified harvest plan.",
        "Fresh split-fruit use requires very little processing.",
        "Long storage requires curing, careful handling, and regular inspection."
      ]
    }
  },

  cost: {
    seedOrPlantCostLevel:
      "low",

    soilPreparationCostLevel:
      "moderate",

    irrigationCostLevel:
      "moderate",

    protectionCostLevel:
      "moderate",

    processingEquipmentCostLevel:
      "very-low",

    storageCostLevel:
      "low",

    annualRecurringCostLevel:
      "moderate",

    longTermValueScore: 5,

    lowestCostUsePath:
      "fresh-split-fruit",

    highestCostUsePath:
      "cured-whole-storage-fruit",

    likelyCostDrivers: [
      "Compost and fertility amendments",
      "Irrigation or soaker hoses",
      "Mulch",
      "Insect protection",
      "Sturdy trellis for small-fruited vertical varieties",
      "Cart for heavy fruit",
      "Suitable curing area",
      "Cool dry storage shelves"
    ],

    costReductionOptions: [
      "Choose a productive medium-sized variety rather than a giant variety.",
      "Allow vines to spread into unused lawn or garden-edge space.",
      "Use whole split fruit instead of processing seeds separately.",
      "Use existing sheds, shelves, or spare rooms for storage when temperature and airflow are suitable.",
      "Share the harvest between the household and flock.",
      "Save seed only from suitable open-pollinated varieties after learning cross-pollination requirements."
    ],

    directFacts: {
      specializedPlantingEquipmentRequired:
        false,

      specializedBackyardHarvestEquipmentRequired:
        false,

      specializedProcessingEquipmentRequired:
        false,

      notes: [
        "Seed is generally inexpensive, but soil preparation and fertility needs may be greater than for low-input legumes.",
        "Watering infrastructure may materially affect success in hot or dry regions.",
        "Fresh-fruit use needs almost no specialized equipment.",
        "Cured storage requires suitable space but not necessarily electricity.",
        "Cost classifications are qualitative rather than current retail estimates."
      ]
    }
  },

  goals: {
    feedReductionScore: 3,

    energyProductionScore: 2,

    proteinOrientedScore: 2,

    freshGreensScore: 1,

    livingForageScore: 1,

    winterStorageScore: 5,

    enrichmentScore: 5,

    resilienceScore: 4,

    soilImprovementScore: 2,

    nitrogenFixationScore: 1,

    groundCoverScore: 5,

    erosionControlScore: 4,

    shadeScore: 2,

    privacyScreeningScore: 2,

    pollinatorSupportScore: 5,

    compostBiomassScore: 5,

    householdFoodScore: 5,

    seedSavingScore: 3,

    selfRelianceScore: 5,

    multipurposeValueScore: 5,

    visualAppealScore: 5,

    productionReliabilityScore: 4,

    fastestValueScore: 2,

    nonElectricStorageScore: 5,

    smallFlockValueScore: 5,

    largeFlockValueScore: 4,

    primaryGoalMatches: [
      "winter-storage",
      "enrichment",
      "household-food",
      "non-electric-storage",
      "self-reliance",
      "pollinators",
      "compost-biomass",
      "ground-cover",
      "edible-landscape",
      "use-unused-space"
    ],

    weakGoalMatches: [
      "fresh-greens",
      "living-forage",
      "nitrogen-fixation",
      "protein-oriented",
      "high-energy",
      "small-container-production",
      "fast-first-harvest"
    ],

    directFacts: {
      wholeFruitStoragePotential:
        true,

      humanFoodPotential:
        true,

      pollinatorBenefit: true,

      broadGroundCoverPotential:
        true,

      highCompostBiomassPotential:
        true,

      seedSavingPossible: true,

      notes: [
        "Pumpkins and Winter Squash are among the strongest non-electric winter-storage crops in the initial planner database.",
        "Whole fruit provides substantial flock-enrichment value.",
        "The crop is highly useful for shared household-and-flock harvests.",
        "Large flowers provide pollen and nectar resources for Squash bees, bumblebees, honeybees, and other pollinators.",
        "Vines provide strong seasonal ground coverage.",
        "Spent vines and damaged fruit can contribute substantial compost biomass when disease and pest concerns allow.",
        "The crop does not fix nitrogen and is not a concentrated protein source.",
        "Seed saving is complicated because Squash varieties within compatible species may cross-pollinate.",
        "The crop's strongest planner role is stored whole produce rather than major balanced-feed replacement."
      ]
    }
  },

  risks: {
    wildlife: {
      wildBirds: 2,
      deer: 4,
      raccoons: 4,
      squirrels: 3,
      rabbits: 3,
      rodents: 5,
      groundhogs: 4
    },

    insectsRiskScore: 5,

    diseaseRiskScore: 5,

    lodgingRiskScore: 1,

    fieldMoldRiskScore: 4,

    dryingMoldRiskScore: 1,

    storageMoldRiskScore: 4,

    storedInsectRiskScore: 1,

    spoilageSpeedRiskScore: 3,

    invasivenessConcernRiskScore: 1,

    selfSeedingRiskScore: 2,

    fruitDropRiskScore: 1,

    cropFailureRiskScore: 4,

    stormDamageRiskScore: 3,

    shadingOtherCropsRiskScore: 5,

    overfeedingRiskScore: 3,

    treatedSeedRiskScore: 5,

    primaryRisks: [
      {
        id:
          "squash-vine-borer",

        severity:
          "very-high",

        affectedStages: [
          "vine-development",
          "flowering",
          "fruit-development"
        ],

        mitigationOptions: [
          "Select resistant or less-susceptible species and cultivars",
          "Use row cover before flowering",
          "Remove row cover when pollination is needed",
          "Inspect stems regularly",
          "Rotate planting locations"
        ],

        note:
          "Squash vine borers can cause sudden vine wilting and plant collapse, especially in susceptible Cucurbita pepo and Cucurbita maxima types."
      },

      {
        id:
          "squash-bugs",

        severity:
          "very-high",

        affectedStages: [
          "seedling",
          "vine-development",
          "flowering",
          "fruit-development"
        ],

        mitigationOptions: [
          "Inspect leaf undersides",
          "Remove eggs and young nymphs",
          "Use row cover before flowering",
          "Remove plant debris after harvest",
          "Rotate planting locations"
        ],

        note:
          "Squash bugs can weaken plants by feeding on leaves and vines."
      },

      {
        id:
          "cucumber-beetles",

        severity:
          "high",

        affectedStages: [
          "seedling",
          "vine-development",
          "flowering"
        ],

        mitigationOptions: [
          "Row cover during establishment",
          "Regular inspection",
          "Remove heavily damaged plants",
          "Use resistant varieties where available"
        ],

        note:
          "Cucumber beetles damage foliage and flowers and may transmit bacterial wilt in susceptible Cucurbit crops."
      },

      {
        id:
          "powdery-and-downy-mildew",

        severity:
          "very-high",

        affectedStages: [
          "vine-development",
          "flowering",
          "fruit-development"
        ],

        mitigationOptions: [
          "Choose resistant varieties",
          "Provide adequate spacing",
          "Use drip irrigation",
          "Improve airflow",
          "Rotate crops",
          "Remove severely diseased debris"
        ],

        note:
          "Dense foliage and humid conditions can support serious foliar disease."
      },

      {
        id:
          "poor-pollination",

        severity:
          "high",

        affectedStages: [
          "flowering",
          "fruit-setting"
        ],

        mitigationOptions: [
          "Protect pollinator habitat",
          "Avoid insecticide exposure during bloom",
          "Grow multiple flowers simultaneously",
          "Hand pollinate where necessary"
        ],

        note:
          "Poor pollination may cause young fruit to yellow, shrivel, or abort."
      },

      {
        id:
          "storage-rot",

        severity:
          "high",

        affectedStages: [
          "harvest",
          "curing",
          "storage"
        ],

        mitigationOptions: [
          "Harvest only mature sound fruit",
          "Leave a suitable stem attached",
          "Avoid bruising and cuts",
          "Cure appropriate varieties",
          "Store with airflow",
          "Inspect regularly",
          "Remove deteriorating fruit promptly"
        ],

        note:
          "Bruised, immature, frost-damaged, or poorly cured fruit may decay rapidly in storage."
      },

      {
        id:
          "heavy-fruit-injury",

        severity:
          "high",

        affectedStages: [
          "harvest",
          "transport",
          "feeding"
        ],

        mitigationOptions: [
          "Choose manageable fruit sizes",
          "Use a cart",
          "Lift with assistance",
          "Cut fruit on a stable surface"
        ],

        note:
          "Large Pumpkins may create lifting, dropping, and knife-handling hazards."
      },

      {
        id:
          "balanced-feed-displacement",

        severity:
          "moderate",

        affectedStages: [
          "feeding"
        ],

        mitigationOptions: [
          "Offer as a supplemental food",
          "Continue complete poultry feed",
          "Remove spoiled leftovers"
        ],

        note:
          "Large amounts of watery produce may reduce consumption of balanced feed without supplying equivalent concentrated nutrition."
      },

      {
        id:
          "chemically-treated-seed",

        severity:
          "very-high",

        affectedStages: [
          "planting",
          "feeding"
        ],

        mitigationOptions: [
          "Use untreated seed for crops intended as feed",
          "Keep treated planting seed separated"
        ],

        note:
          "Chemically treated planting seed must never be fed."
      }
    ],

    directFacts: {
      squashBugConcern:
        true,

      squashVineBorerConcern:
        true,

      cucumberBeetleConcern:
        true,

      powderyMildewConcern:
        true,

      downyMildewConcern:
        true,

      pollinationRequired:
        true,

      storageRotConcern:
        true,

      fruitBruisingConcern:
        true,

      notes: [
        "Pest and disease pressure can be one of the largest barriers to reliable Pumpkin and Winter Squash production.",
        "Species and cultivar choice strongly affect vine-borer and disease susceptibility.",
        "Row cover can protect young plants but must be removed or opened when female flowers require pollination.",
        "Avoid overhead irrigation when possible because wet foliage can favor disease.",
        "Fruit intended for storage should be mature, sound, clean, and free from serious cuts or bruises.",
        "Fruit with mold, soft rot, fermentation, frost damage, or foul odor should not be fed.",
        "Stored fruit should be separated enough to allow inspection and airflow.",
        "The planner does not make medicinal or deworming claims for Pumpkin seeds."
      ]
    }
  },

  seasonalRoles: {
    earlySpring: false,

    lateSpring: true,

    summer: true,

    lateSummer: true,

    fall: true,

    winterStorage: true,

    perennial: false,

    plantingWindows: [
      {
        id:
          "indoor-start-short-season",

        trigger:
          "before-last-frost",

        offsetWeeksMinimum: 2,
        offsetWeeksMaximum: 4,

        method:
          "start-indoors",

        note:
          "Start indoors only early enough to gain time without allowing plants to become root-bound."
      },

      {
        id:
          "direct-seed-warm-soil",

        trigger:
          "after-last-frost",

        offsetWeeksMinimum: 1,
        offsetWeeksMaximum: 3,

        soilCondition:
          "warm-and-well-drained",

        method:
          "direct-seed",

        note:
          "Direct-seed after frost danger has passed and the soil is warm enough for dependable germination."
      }
    ],

    harvestWindows: [
      {
        id:
          "fresh-mature-fruit",

        trigger:
          "fruit-mature-and-rind-hardened",

        usePathId:
          "fresh-split-fruit",

        note:
          "Harvest mature sound fruit and split it for immediate or near-immediate flock use."
      },

      {
        id:
          "cured-storage-fruit",

        trigger:
          "fruit-mature-before-hard-frost",

        usePathId:
          "cured-whole-storage-fruit",

        note:
          "Harvest mature undamaged fruit before hard frost, cure appropriate varieties, and move them into suitable storage."
      },

      {
        id:
          "cooked-household-flesh",

        trigger:
          "mature-fruit-selected-for-household-use",

        usePathId:
          "plain-cooked-flesh",

        note:
          "Reserve plain unseasoned cooked flesh and seeds for limited supplemental flock use."
      }
    ],

    cropSequenceRoles: [
      "Warm-season annual",
      "Summer ground-cover crop",
      "Pollinator-supporting crop",
      "Fall whole-fruit harvest",
      "Non-electric winter-storage crop",
      "Shared household-and-flock crop"
    ],

    seasonalLimitations: [
      "Not frost tolerant",
      "Requires warm soil",
      "Long-season varieties may not mature in short climates",
      "Wet fall weather can interfere with curing and harvest",
      "Hard frost can damage fruit intended for storage"
    ],

    directFacts: {
      warmSeasonAnnual: true,

      commonlyDirectSeeded: true,

      indoorStartingPossible:
        true,

      matureFruitHarvestBeforeHardFrost:
        true,

      curingMayImproveStorage:
        true,

      curingRequirementsVaryByType:
        true,

      notes: [
        "Pumpkins and Winter Squash are planted after frost danger declines and soil warms.",
        "Vines grow through summer and fruits generally mature in late summer or fall.",
        "Maturity indicators include full cultivar color, hard rind, and drying or corking stems.",
        "Fruit intended for storage should be harvested before damaging hard frost.",
        "Some Winter Squash types benefit from curing, while certain thin-skinned types may not.",
        "Cured sound fruit can extend the crop's usefulness well into winter."
      ]
    }
  },

  usePaths: [
    {
      id:
        "fresh-split-fruit",

      label:
        "Fresh Split Pumpkin or Winter Squash",

      description:
        "A mature sound fruit cut or split open and offered relatively soon after harvest for flock enrichment and supplemental consumption.",

      primaryFeedRole:
        "whole-produce-enrichment",

      harvestProducts: [
        "whole-storage-vegetables",
        "fresh-fruit",
        "pumpkin-squash-flesh"
      ],

      suitableFeedingMethods: [
        "whole-produce",
        "fresh-supplement",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "harvest-heavy-fruit",
        "chop"
      ],

      optionalProcessingTasks: [],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "cart",
        "food-safe-container"
      ],

      harvestPattern:
        "several",

      harvestFrequencyCategory:
        "seasonal",

      storageMethods: [
        "short-term-fresh"
      ],

      preferredStorageMethod:
        "feed-soon-after-opening",

      storageDurationCategory:
        "very-short",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: true,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 3,
      rodentRiskScore: 3,
      storedInsectRiskScore: 1,

      harvestEaseScore: 4,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 5,
      flockValueScore: 5,

      safetyWarnings: [
        "Use only mature sound fruit without mold, soft rot, fermentation, frost damage, or foul odor.",
        "Cut large fruit on a stable surface using an appropriate tool.",
        "Remove uneaten opened fruit before it spoils.",
        "Fresh fruit remains supplemental and should not replace balanced poultry feed.",
        "Do not feed decorative fruit that has been painted, treated, waxed with unknown products, or exposed to contamination."
      ],

      incompatibleUserTraits: [
        "requires-long-term-storage-after-opening",
        "cannot-safely-cut-heavy-fruit",
        "wants-dry-grain-only"
      ]
    },

    {
      id:
        "cured-whole-storage-fruit",

      label:
        "Cured Whole Pumpkin or Winter Squash",

      description:
        "Mature undamaged fruit cured when appropriate and stored whole in a cool, dry, ventilated location for later winter feeding.",

      primaryFeedRole:
        "winter-storage-produce",

      harvestProducts: [
        "whole-storage-vegetables",
        "winter-storage-produce"
      ],

      suitableFeedingMethods: [
        "whole-produce",
        "winter-storage",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "harvest-heavy-fruit",
        "cure"
      ],

      optionalProcessingTasks: [
        "clean-sort"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "cart",
        "cool-storage"
      ],

      harvestPattern:
        "major",

      harvestFrequencyCategory:
        "once-twice",

      storageMethods: [
        "cured-whole",
        "cool-dry-ventilated"
      ],

      preferredStorageMethod:
        "cool-dry-ventilated-whole-fruit",

      storageDurationCategory:
        "medium-long",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: true,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 4,
      rodentRiskScore: 4,
      storedInsectRiskScore: 1,

      harvestEaseScore: 3,
      preparationEaseScore: 4,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 5,
      flockValueScore: 5,

      safetyWarnings: [
        "Store only mature, sound, undamaged fruit.",
        "Do not store badly bruised, punctured, frost-damaged, soft, moldy, or immature fruit.",
        "Curing needs vary by Squash type; not every variety should be cured identically.",
        "Inspect stored fruit regularly and remove any fruit developing soft spots, leakage, mold, or foul odor.",
        "Do not allow fruit to freeze during storage.",
        "Open fruit only when it can be used before spoilage."
      ],

      incompatibleUserTraits: [
        "declines-curing",
        "has-no-cool-dry-storage",
        "cannot-monitor-stored-produce",
        "cannot-handle-heavy-fruit"
      ]
    },

    {
      id:
        "plain-cooked-flesh",

      label:
        "Plain Cooked Pumpkin or Squash",

      description:
        "Plain unseasoned cooked flesh or seed-containing pulp reserved from household preparation and offered as a measured supplemental food.",

      primaryFeedRole:
        "shared-household-food",

      harvestProducts: [
        "cooked-produce",
        "household-food-leftovers",
        "pumpkin-squash-flesh"
      ],

      suitableFeedingMethods: [
        "heat-treated",
        "measured-supplement",
        "shared-household-food"
      ],

      requiredProcessingTasks: [
        "harvest-heavy-fruit",
        "chop",
        "cook"
      ],

      optionalProcessingTasks: [
        "freeze"
      ],

      requiredEquipment: [
        "cooking-equipment"
      ],

      helpfulEquipment: [
        "food-safe-container",
        "refrigerator",
        "freezer"
      ],

      harvestPattern:
        "several",

      harvestFrequencyCategory:
        "seasonal",

      storageMethods: [
        "refrigerated",
        "frozen"
      ],

      preferredStorageMethod:
        "refrigerate-briefly-or-freeze",

      storageDurationCategory:
        "short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: true,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: true,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 3,
      preparationEaseScore: 3,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 5,
      flockValueScore: 4,

      safetyWarnings: [
        "Offer only plain unseasoned cooked Squash.",
        "Do not feed pie filling, sweetened Pumpkin, heavily salted food, buttered dishes, sauces, or foods containing unsafe ingredients.",
        "Refrigerate cooked material promptly and discard spoiled leftovers.",
        "Cooked Squash remains supplemental to complete poultry feed."
      ],

      incompatibleUserTraits: [
        "declines-cooking",
        "has-no-refrigeration-or-freezer",
        "requires-minimal-preparation"
      ]
    }
  ],

  dataQuality: {
    overallConfidence:
      0.81,

    verifiedFields: [
      "identity",
      "lifecycle",
      "climate.directFacts.seasonType",
      "climate.directFacts.frostSensitive",
      "climate.directFacts.warmSoilRequired",
      "climate.daysToMaturityMinimum",
      "climate.daysToMaturityMaximum",
      "site.directFacts.preferredLight",
      "site.directFacts.vineLengthHighlyVariable",
      "site.directFacts.pollinatorAccessImportant",
      "soil.directFacts.organicMatterBenefit",
      "soil.directFacts.heavyFeedingCrop",
      "water.directFacts.consistentMoistureImportant",
      "water.directFacts.floweringMoistureImportant",
      "water.directFacts.fruitExpansionMoistureImportant",
      "space.directFacts.bushVarietiesAvailable",
      "space.directFacts.fullViningVarietiesAvailable",
      "space.directFacts.trellisPossibleForSmallFruit",
      "space.directFacts.largeFruitTrellisLimitation",
      "flock.directFacts.edibleFeedParts",
      "risks.directFacts.squashBugConcern",
      "risks.directFacts.squashVineBorerConcern",
      "risks.directFacts.cucumberBeetleConcern",
      "risks.directFacts.powderyMildewConcern",
      "risks.directFacts.pollinationRequired",
      "risks.directFacts.storageRotConcern",
      "seasonalRoles.directFacts.warmSeasonAnnual",
      "seasonalRoles.directFacts.matureFruitHarvestBeforeHardFrost",
      "seasonalRoles.directFacts.curingMayImproveStorage"
    ],

    derivedFields: [
      "climate.heatToleranceScore",
      "climate.droughtClimateToleranceScore",
      "climate.humidityToleranceScore",
      "climate.coolSummerToleranceScore",
      "climate.frostSensitivityScore",
      "site",
      "soil.textureScores",
      "soil.drainageRequirementScore",
      "soil.waterloggingSensitivityScore",
      "water",
      "space.smallSpaceScore",
      "space.mediumSpaceScore",
      "space.largeSpaceScore",
      "space.layoutScores",
      "space.spaceTypeScores",
      "flock.flockPurposeScores",
      "flock.feedingMethodScores",
      "flock.directRunSuitabilityScore",
      "flock.confinedFlockValueScore",
      "labor",
      "cost",
      "goals",
      "risks.wildlife",
      "usePaths.fresh-split-fruit",
      "usePaths.cured-whole-storage-fruit",
      "usePaths.plain-cooked-flesh"
    ],

    uncertainFields: [
      "climate.minimumFrostFreeDays",
      "climate.preferredFrostFreeDays",
      "climate.dryDownBufferDays",
      "soil.saltToleranceScore",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "usePaths.fresh-split-fruit.exactStorageDuration",
      "usePaths.cured-whole-storage-fruit.exactStorageDuration",
      "usePaths.plain-cooked-flesh.exactStorageDuration",
      "risks.wildlife.wildBirds",
      "risks.wildlife.squirrels"
    ],

    missingFields: [
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "flock.usePathTesting"
    ],

    lastReviewed:
      "2026-07-14",

    primarySources: [
      {
        title:
          "Growing Pumpkins and Winter Squash",

        organization:
          "University Cooperative Extension resources",

        sourceType:
          "extension-home-garden-guide",

        use:
          "Warm-season planting, sunlight, soil, spacing, water, flowering, pollination, harvest maturity, pests, and diseases"
      },

      {
        title:
          "Pumpkin and Winter Squash Production Guide",

        organization:
          "University and Cooperative Extension production resources",

        sourceType:
          "extension-production-guide",

        use:
          "Cultivar types, plant populations, fertility, irrigation, pollination, pest management, disease management, harvest, and postharvest handling"
      },

      {
        title:
          "Storing Pumpkins and Winter Squash",

        organization:
          "University Cooperative Extension postharvest resources",

        sourceType:
          "extension-storage-guide",

        use:
          "Maturity, curing, storage temperature, airflow, relative humidity, variety-dependent storage life, and spoilage monitoring"
      },

      {
        title:
          "Pumpkin and Winter Squash in Poultry and Livestock Feeding",

        organization:
          "Poultry nutrition and agricultural research resources",

        sourceType:
          "feed-and-nutrition-research",

        use:
          "Flesh, seed, seed-meal, carotenoid, fiber, supplemental feeding, and complete-ration limitations"
      }
    ],

    notes: [
      "Pumpkin and Winter Squash plannerData combines multiple mature Cucurbita fruit types because they share warm-season growth, vine management, mature-fruit harvest, and storage-oriented planner roles.",
      "Cultivar differences are substantial; bush Acorn Squash, Butternut Squash, pie Pumpkins, field Pumpkins, and giant Pumpkins should not be assumed to have identical maturity, spacing, storage, pest, or handling characteristics.",
      "The record separates fresh split fruit, cured whole storage fruit, and plain cooked household-use fruit into distinct use paths.",
      "The planner does not make medicinal or deworming claims for Pumpkin seeds.",
      "Mature fruit remains a supplemental food rather than a complete poultry ration.",
      "Minimum useful area, exact storage life, and flock feeding portions remain intentionally null.",
      "The crop should remain in testing until the shared engine evaluates vine-space, winter-storage, enrichment, heavy-fruit handling, and low-processing profiles."
    ]
  }
}


  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - KALE-COLLARDS
    //
    //
    //
    //
    //////////////////////////////////////////////

    "CROP-KALE-COLLARDS": {
    id: "CROP-KALE-COLLARDS",

    name: "Kale and Collard Greens",
    scientificName:
      "Brassica oleracea Acephala Group and Brassica oleracea var. viridis",

    category: "Leafy Green and Repeated-Harvest Crop",
    cropType:
      "Biennial commonly grown as an annual",
    seasonType: "Cool Season",

    status: "Initial Research Complete",

    summary:
      "Kale and collard greens are cool-season leafy brassicas that can provide repeated harvests of nutrient-rich foliage, carotenoid-containing greens, flock enrichment, and productive use of spring, fall, or mild-winter garden space. Their fresh leaves are moisture-rich and low in energy, so they should supplement rather than replace balanced poultry feed.",

    chickenUse: {
      edibleParts: [
        "Fresh leaves",
        "Tender stems",
        "Baby greens",
        "Outer leaves removed during household harvest",
        "Plain cooked leaves"
      ],

      primaryValue: [
        "Leafy-green enrichment",
        "Carotenoids",
        "Vitamin-rich plant material",
        "Moisture",
        "Repeated harvests",
        "Cool-season garden production"
      ],

      feedingForms: [
        "Whole fresh leaves hung for pecking",
        "Chopped fresh leaves",
        "Limited access to established plants",
        "Plain cooked and cooled greens",
        "Dried and crumbled leaves in small amounts",
        "Household garden trimmings from untreated plants"
      ],

      bestFor: [
        "Adult chickens as a leafy supplement",
        "Cool-season feed gardens",
        "Small and medium garden spaces",
        "Spring and fall production",
        "Mild-winter growing regions",
        "Owners wanting repeated leaf harvests"
      ],

      supplementOnly: true,

      preparationNotes:
        "Wash soil and visible contaminants from harvested leaves. Tough mature leaves may be chopped, torn, or hung for pecking enrichment. Cooked greens should be plain, cooled, and free from salt, grease, seasonings, onions, or other unsuitable ingredients.",

      safetyNotes:
        "Use only sound leaves from plants grown without unsafe pesticide residues. Avoid moldy, slimy, fermented, frost-damaged-and-rotting, or heavily contaminated material. Brassica greens contain glucosinolates and should not dominate the diet. They do not provide enough energy, balanced protein, or calcium to replace complete poultry feed."
    },

    nutrition: {
      basis:
        "Approximate fresh raw-leaf values. Kale and collards differ by cultivar, maturity, growing conditions, and preparation. Fresh-weight values contain substantial water and should not be compared directly with dry poultry feed.",

      crudeProteinPercent:
        "Approximately 3% to 4% on an as-fed fresh basis; the dry-matter percentage is much higher because fresh leaves are mostly water",

      fatPercent:
        "Generally about 1% or less on an as-fed fresh basis",

      fiberPercent:
        "Generally a few percent on an as-fed basis, with higher fiber in older leaves and stems",

      calciumPercent:
        "Fresh leaves contain measurable calcium, but the amount is not sufficient to meet laying-hen requirements when used as a primary feed",

      phosphorusPercent:
        "Relatively low compared with concentrated grain or seed ingredients",

      notableNutrients: [
        "Beta-carotene and vitamin A precursors",
        "Lutein and zeaxanthin",
        "Vitamin K",
        "Vitamin C",
        "Folate",
        "Manganese",
        "Calcium",
        "Potassium",
        "Magnesium",
        "Antioxidant plant compounds"
      ],

      limitations: [
        "Fresh leaves contain substantial water and little concentrated dietary energy",
        "Protein percentage on a fresh basis is low",
        "Brassica greens contain glucosinolates and related compounds",
        "Very large dietary amounts may dilute energy, amino acids, calcium, vitamins, and minerals supplied by complete feed",
        "Calcium in leafy greens does not remove the need for correctly formulated layer feed or an appropriate calcium source",
        "Older leaves and stems may be fibrous and less palatable",
        "Kale and collards should not be assumed to have identical nutrient composition",
        "Fresh, cooked, frozen, and dried leaves have different nutrient concentrations"
      ]
    },

    growing: {
      sunlight:
        "Full sun is preferred; partial shade may be useful in warm climates or during shoulder seasons",

      soilTemperatureMinimumF:
        "Approximately 40°F to 45°F for germination, though emergence is usually faster in warmer soil",

      idealSoilTemperatureF:
        "Approximately 55°F to 75°F for establishment and cool-season growth",

      frostTolerance:
        "Moderate to High, depending on variety, plant maturity, wind exposure, and duration of freezing temperatures",

      heatTolerance:
        "Kale is generally low to moderate; collards are often somewhat more heat tolerant",

      droughtTolerance:
        "Low to Moderate; consistent moisture supports tender leaf growth",

      soilPHMinimum: 6.0,
      soilPHMaximum: 7.5,

      waterNeeds:
        "Moderate. Maintain reasonably consistent soil moisture, commonly around 1 to 1.5 inches of water per week from rain and irrigation, while avoiding waterlogged soil.",

      directSow: true,

      transplantRecommended:
        "Optional and often useful for early spring, fall, or short-season plantings",

      daysToFirstHarvestMinimum: 20,
      daysToFirstHarvestMaximum: 45,

      daysToMaturityMinimum: 50,
      daysToMaturityMaximum: 85,

      plantSpacingInches:
        "Approximately 8 to 12 inches for smaller kale plants or frequent baby-leaf harvest; approximately 12 to 24 inches for mature kale and collards",

      rowSpacingInches:
        "Approximately 18 to 36 inches, depending on cultivar, harvest method, and mature plant size",

      plantingDepthInches:
        "Approximately 1/4 to 1/2 inch",

      successionPlanting:
        "Yes, particularly for baby leaves or staggered spring and fall harvests",

      regrowthAfterHarvest:
        "Yes, when lower or outer leaves are harvested while the central growing point remains intact"
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Start indoors approximately 4 to 8 weeks before the final spring frost or direct sow as soon as workable soil and weather permit. Sow again in midsummer for fall harvest.",
        harvestWindow:
          "Late spring into early summer and again from fall until severe winter conditions stop growth."
      },

      midwestNortheast: {
        plantingWindow:
          "Plant in early spring for a late-spring crop and again from midsummer into late summer for fall harvest.",
        harvestWindow:
          "Spring through early summer and fall into early winter, depending on protection and variety."
      },

      upperSouth: {
        plantingWindow:
          "Plant in late winter or early spring and again from late summer through early fall.",
        harvestWindow:
          "Spring and fall through winter; protected plants may continue producing during mild winters."
      },

      deepSouth: {
        plantingWindow:
          "Plant primarily from late summer through fall and again in late winter where appropriate. Avoid relying on peak summer production.",
        harvestWindow:
          "Fall through spring, with the strongest quality often occurring during cooler weather."
      },

      southwest: {
        plantingWindow:
          "Plant during cool seasons, often in late summer or fall for winter harvest and again before spring heat. Use irrigation and afternoon shade where necessary.",
        harvestWindow:
          "Fall through spring, depending on elevation and winter severity."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant in spring and again during summer for fall and winter harvest. Select hardy varieties for overwintering.",
        harvestWindow:
          "Late spring through winter in many locations, particularly with row covers or other protection."
      },

      coastalWest: {
        plantingWindow:
          "Mild coastal areas may support extended or nearly year-round planting, with strongest growth during cooler months.",
        harvestWindow:
          "Much of the year, depending on local heat, fog, rainfall, and variety."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Fresh leaves generally store for several days to roughly one week under refrigeration, while blanched frozen greens may store for several months",

      storageMethod:
        "For fresh use, cool leaves promptly and refrigerate them in a breathable or loosely sealed container that limits drying without trapping excessive moisture. For longer storage, blanch and freeze plain leaves or dry them thoroughly before sealed storage.",

      yieldNotes:
        "Plants-per-area values remain null because this combined record includes baby-leaf kale, mature kale, and full-sized collard production systems with substantially different spacing. Smaller kale plants may be maintained approximately 8 to 12 inches apart, while mature kale and collards may require approximately 12 to 24 inches between plants and 18 to 36 inches between rows. Dense baby-leaf plantings may contain many more plants but produce smaller repeated harvests, while widely spaced mature plants produce larger individual leaves over a longer period. A single plant-density figure would therefore create misleading garden-planning results. Separate density and yield estimates should eventually be developed for baby-leaf greens, mature kale, and mature collards."

    },

    economics: {
      seedCostEstimate:
        "Generally low. One seed packet can produce many plants, and seed may also be purchased in bulk for baby-leaf production.",

      equipmentCostEstimate:
        "Low to moderate. Possible costs include seed-starting supplies, irrigation, mulch, compost, row covers, insect netting, containers, and cold-protection materials.",

      irrigationCostLevel: "Low to Moderate",

      laborLevel:
        "Low to Moderate, although regular harvesting, washing, pest inspection, and repeated planting increase labor",

      potentialFeedSavings: null,

      economicNotes:
        "Kale and collards may provide strong garden value because outer leaves can be harvested repeatedly and household-quality produce can be shared between people and chickens. Their direct feed-savings value is limited by high moisture and low energy density. They are better evaluated as nutrient-rich greens and enrichment than as replacements for purchased feed."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for general cultivation, nutrient composition, cool-season production, repeated harvesting, and human-food use; moderate for use as poultry enrichment and supplemental greens; limited for poultry-specific feeding amounts, feed replacement, and backyard yield per square foot",

      sources: [
        {
          title:
            "FoodData Central",
          organization:
            "United States Department of Agriculture, Agricultural Research Service",
          url:
            "https://fdc.nal.usda.gov/",
          use:
            "Fresh kale and collard moisture, protein, fat, fiber, calcium, vitamins, minerals, and carotenoid context"
        },

        {
          title:
            "Growing Kale in Home Gardens",
          organization:
            "University Cooperative Extension horticulture guidance",
          url:
            "https://extension.umn.edu/vegetables/growing-kale",
          use:
            "Cool-season production, starting dates, transplanting, spacing, harvest, watering, and pest management"
        },

        {
          title:
            "Home Garden Collards",
          organization:
            "University of Georgia Cooperative Extension",
          url:
            "https://extension.uga.edu/publications/",
          use:
            "Southern planting seasons, variety selection, spacing, fertility, watering, harvest, pests, and diseases"
        },

        {
          title:
            "Kale and Collards in the Garden",
          organization:
            "Utah State University Extension",
          url:
            "https://extension.usu.edu/yardandgarden/",
          use:
            "Planting, soil, irrigation, spacing, harvest, and cool-weather production"
        },

        {
          title:
            "Glucosinolates in Brassica Vegetables",
          organization:
            "USDA Agricultural Research Service and peer-reviewed plant-science literature",
          url:
            "https://www.ars.usda.gov/",
          use:
            "Glucosinolate content, variation among brassica crops, and reasons to avoid treating unlimited leafy-brassica intake as nutritionally neutral"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Separate kale and collards into individual records if meaningful differences emerge in yield, spacing, climate performance, or poultry value.",
        "Identify cultivars that perform especially well under repeated leaf harvesting.",
        "Research whether dinosaur, curly, Russian, forage, and tree kale differ meaningfully in dry-matter yield.",
        "Find poultry-specific studies on kale, collards, or mixed brassica forage.",
        "Do not interpret human vitamin values as direct poultry requirements or guaranteed absorption.",
        "Determine dry-matter yield per plant and per square foot before estimating feed contribution.",
        "Research glucosinolate concentrations by cultivar, season, and plant maturity.",
        "Assess pest-control costs for cabbage worms, loopers, aphids, flea beetles, slugs, black rot, and clubroot.",
        "Compare direct flock grazing with cut-and-carry harvesting.",
        "Research container production and baby-leaf density for small-space users.",
        "Calculate scores only after several crops have comparable evidence and complete data.",
        "Plant-density fields remain null because baby-leaf kale, mature kale, and mature collards use substantially different planting densities and should eventually be modeled as separate production systems.",

      ]
    },

plannerData: {
  schemaVersion: "1.0.0",

  developmentStatus:
    "ready",

  identity: {
    plannerName:
      "Kale and Collard Greens",

    shortLabel:
      "Kale & Collards",

    icon:
      "🥬",

    cropCategory:
      "leafy-green",

    primaryFeedCategory:
      "fresh-green",

    guideUrl:
      "growing-kale-collards-for-chickens.html"
  },

  lifecycle: {
    growthCycle:
      "biennial",

    isAnnual: false,
    isBiennial: true,
    isPerennial: false,
    isTreeOrShrub: false,

    commonlyGrownAsAnnual: true,

    yearsToFirstUsefulHarvest: 0,
    yearsToFullProduction: 0,
    expectedUsefulLifeYears: 1,

    regrowsAfterHarvest: true,

    permanentPlantingRequired: false,
    reversibleAfterOneSeason: true
  },

  climate: {
    suitableClimateTypes: [
      "cold-short-summer",
      "cool-moderate-summer",
      "temperate",
      "mild-winter",
      "high-elevation"
    ],

    preferredClimateTypes: [
      "cool-moderate-summer",
      "temperate",
      "mild-winter"
    ],

    challengingClimateTypes: [
      "hot-humid",
      "hot-dry"
    ],

    minimumFrostFreeDays: null,
    preferredFrostFreeDays: null,

    minimumSoilTemperatureF: null,
    preferredSoilTemperatureF: 60,

    daysToMaturityMinimum: 50,
    daysToMaturityMaximum: 75,

    dryDownBufferDays: null,

    heatToleranceScore: 2,

    droughtClimateToleranceScore: 2,

    humidityToleranceScore: 3,

    coolSummerToleranceScore: 5,

    frostSensitivityScore: 1,

    winterHardinessRequired: false,

    seasonExtensionBenefits: [
      "Row cover can protect young plants from frost and insect pests.",
      "Low tunnels and cold frames can extend fall and winter harvest.",
      "Mulch can cool soil and reduce moisture stress during warm weather.",
      "Transplants can provide earlier harvest than direct seeding."
    ],

    indoorSeedStartingBenefitScore: 4,

    directFacts: {
      seasonType:
        "cool-season",

      frostSensitive: false,

      plantBeforeLastFrostPossible:
        true,

      youngPlantColdToleranceF:
        25,

      preferredMaximumGrowingTemperatureF:
        75,

      maturityRangeDays:
        "approximately-50-to-75-variety-dependent",

      notes: [
        "Kale and Collards are generally grown as cool-season leafy vegetables.",
        "They can be planted before the final spring frost and again for fall harvest.",
        "Mature Kale plants can tolerate substantial cold, although exact hardiness varies by cultivar and plant condition.",
        "Light frost can improve flavor and eating quality.",
        "High summer temperatures reduce growth and may produce tougher or more bitter leaves.",
        "Collards generally tolerate Southern heat somewhat better than many Kale varieties, but both perform best during cooler periods.",
        "Maturity varies by cultivar, transplant age, harvest size, and whether baby or full-sized leaves are desired."
      ]
    }
  },

  site: {
    absoluteMinimumSunHours: 3,

    productiveMinimumSunHours: 4,

    preferredSunHours: 6,

    shadeToleranceScore: 4,

    afternoonShadeBenefitInHeat: 5,

    windToleranceScore: 4,

    lodgingRiskScore: 1,

    reflectedHeatToleranceScore: 2,

    airflowRequirementScore: 4,

    frostPocketSensitivityScore: 1,

    treeRootCompetitionToleranceScore: 3,

    hardscapeConflictRiskScore: 1,

    structureConflictRiskScore: 1,

    utilityConflictRiskScore: 1,

    fruitDropMessRiskScore: 1,

    stainingRiskScore: 1,

    directFacts: {
      preferredLight:
        "full-sun-to-partial-shade",

      productiveSunGuidance:
        "Approximately 4 to 6 or more hours of direct sun, with fuller sun preferred in cool weather and afternoon shade useful in hot climates.",

      windExposureConcern:
        false,

      growthHabit:
        "upright-leafy-rosette",

      notes: [
        "Full sun generally provides the fastest and fullest growth.",
        "Partial shade can still support useful leaf production.",
        "Afternoon shade can reduce heat stress in hot climates.",
        "Dense plantings need adequate airflow to reduce prolonged leaf wetness and disease pressure.",
        "The plants are relatively low and structurally stable compared with tall grain crops.",
        "Kale and Collards can fit near walkways, patios, structures, and raised beds without major height conflicts.",
        "Avoid sites where dense tree roots create severe competition for moisture and nutrients."
      ]
    }
  },

  soil: {
    textureScores: {
      heavyClay: 3,
      clayLoam: 4,
      loam: 5,
      sandyLoam: 4,
      verySandy: 2,
      rocky: 2
    },

    drainageRequirementScore: 4,

    temporaryWetToleranceScore: 2,

    waterloggingSensitivityScore: 4,

    minimumSoilDepthIn: 8,
    preferredSoilDepthIn: 12,

    compactionToleranceScore: 2,

    establishmentInSodDifficultyScore: 5,

    preferredPHMinimum: 6.0,
    preferredPHMaximum: 7.5,

    survivalPHMinimum: null,
    survivalPHMaximum: null,

    fertilityRequirementScore: 4,

    nitrogenRequirementScore: 5,
    phosphorusRequirementScore: 3,
    potassiumRequirementScore: 4,

    benefitsFromInoculation: false,

    inoculantType: null,

    saltToleranceScore: null,

    amendmentEffortScore: 3,

    directFacts: {
      preferredDrainage:
        "well-drained",

      preferredTextures: [
        "loam",
        "clay loam",
        "sandy loam with added organic matter"
      ],

      organicMatterBenefit:
        true,

      highNitrogenLeafCrop:
        true,

      waterloggedSoilSuitable:
        false,

      notes: [
        "Kale and Collards favor fertile, well-drained soil rich in organic matter.",
        "Leaf production responds strongly to adequate nitrogen.",
        "Very sandy soil can dry rapidly and may require more frequent irrigation and fertility management.",
        "Heavy clay can work when drainage and compaction are corrected.",
        "Standing water and persistently saturated soil increase root and disease problems.",
        "Soil testing should guide fertilizer and amendment decisions.",
        "The stored pH range is a productive planning range rather than an absolute survival boundary."
      ]
    }
  },

  water: {
    overallWaterRequirementLevel:
      "moderate",

    germinationWaterNeedLevel:
      "moderate",

    establishmentWaterNeedLevel:
      "moderate",

    matureWaterNeedLevel:
      "moderate",

    floweringWaterNeedLevel:
      "not-applicable",

    harvestDevelopmentWaterNeedLevel:
      "moderate",

    droughtSurvivalScore: 2,

    droughtYieldRetentionScore: 2,

    criticalGrowthStages: [
      "germination",
      "transplant-establishment",
      "rapid-leaf-growth",
      "repeated-harvest-regrowth"
    ],

    criticalStageWaterImportanceScore: 4,

    overwateringSensitivityScore: 3,

    waterloggingSensitivityScore: 4,

    dripIrrigationBenefitScore: 5,

    mulchBenefitScore: 5,

    suitableForRainfallOnlyScore: 2,

    suitableForLimitedIrrigationScore: 2,

    containerDryingRiskScore: 4,

    establishmentYearsRequiringExtraWater: 0,

    directFacts: {
      evenMoistureImportant:
        true,

      moistureStressReducesQuality:
        true,

      standingWaterSuitable:
        false,

      typicalWeeklyWaterInchesMinimum:
        1,

      typicalWeeklyWaterInchesMaximum:
        2,

      notes: [
        "Consistent soil moisture supports tender leaves and steady regrowth.",
        "Moisture fluctuations can produce tough leaves and undesirable flavor.",
        "Kale guidance commonly recommends approximately 1 to 2 inches of water per week depending on weather and soil.",
        "Drip irrigation helps conserve water and keeps foliage drier.",
        "Mulch reduces evaporation, suppresses weeds, and cools soil during warm weather.",
        "Containers and shallow raised beds dry faster than in-ground soil.",
        "The crop is not a strong choice where irrigation is frequently unavailable."
      ]
    }
  },

  space: {
    minimumTrialAreaSqFt: null,

    minimumUsefulAreaSqFt: null,

    preferredProductionAreaSqFt: null,

    smallSpaceScore: 5,

    mediumSpaceScore: 5,

    largeSpaceScore: 4,

    layoutScores: {
      squareBlock: 5,
      wideRectangle: 5,
      longStrip: 5,
      irregular: 5,
      smallBeds: 5,
      openField: 4
    },

    spaceTypeScores: {
      inGround: 5,
      raisedBed: 5,
      container: 5,
      fenceLine: 4,
      buildingEdge: 5,
      unusedLawn: 3,
      openField: 4,
      orchard: 3,
      forageFrame: 5,
      rotationalPaddock: 3,
      greenhouse: 5,
      hedgerow: 2
    },

    minimumContainerGallons: null,

    containerUseLimitation:
      "Containers can provide useful repeated leaf harvests, but smaller containers dry quickly and support fewer plants.",

    minimumRaisedBedDepthIn: 8,

    vineSpreadRequired: false,

    verticalSupportBenefitScore: 1,

    blockPlantingRequired: false,

    minimumBlockRows: null,

    continuousStandPreferred: false,

    heightCategory:
      "low-to-medium",

    matureWidthCategory:
      "moderate",

    overflowSpaceBenefitScore: 1,

    directFacts: {
      layoutFlexible: true,

      blockPollinationRequired: false,

      containerSuitable: true,

      raisedBedSuitable: true,

      forageFrameSuitable: true,

      repeatedHarvestSuitable: true,

      approximatePlantSpacingInMinimum:
        12,

      approximatePlantSpacingInMaximum:
        18,

      approximateRowSpacingIn:
        24,

      notes: [
        "Kale and Collards fit small beds, containers, raised beds, borders, and larger rows.",
        "Plants commonly receive approximately 12 to 18 inches of spacing depending on cultivar and desired leaf size.",
        "Closer spacing can produce smaller leaves but may reduce airflow.",
        "The crop does not require block planting or a trellis.",
        "Forage frames can protect low plants while allowing chickens to reach leaves through wire.",
        "Small plantings can provide repeated harvests for a small flock.",
        "Production-scale usefulness still depends on flock size, planting area, season length, and harvest frequency."
      ]
    }
  },

  flock: {
    suitableForAdultChickens: true,

    suitableForYoungChicks: false,

    flockPurposeScores: {
      eggs: 4,
      meat: 3,
      breeding: 3,
      petsEnrichment: 4,
      homestead: 5,
      mixed: 5
    },

    feedingMethodScores: {
      livingGrazing: 3,
      cutAndCarry: 5,
      wholeProduce: 4,
      wholeSeedHeads: 1,
      wholeGrain: 1,
      processedGrain: 1,
      heatTreated: 2,
      driedForage: 2,
      winterStorage: 2
    },

    directRunSuitabilityScore: 2,

    forageFrameSuitabilityScore: 5,

    rotationalPaddockSuitabilityScore: 3,

    confinedFlockValueScore: 5,

    pasturedFlockValueScore: 3,

    treatDilutionRiskScore: 2,

    highEnergySupplement: false,

    highFiberSupplement: true,

    concentratedFatSource: false,

    primaryFlockUses: [
      "Fresh cut-and-carry leaves",
      "Protected living forage",
      "Seasonal green enrichment",
      "Household-and-flock shared harvest",
      "Cool-season fresh supplementation"
    ],

    unsuitablePrimaryUses: [
      "Complete-ration replacement",
      "High-energy supplement",
      "Long-term dry storage",
      "Unprotected permanent-run planting",
      "Primary young-chick feed"
    ],

    directFacts: {
      edibleFeedParts: [
        "Fresh leaves",
        "Tender stems",
        "Small whole plants"
      ],

      preferredBirdStage:
        "Established adult chickens",

      cropSurvivalWithDirectChickenAccess:
        "poor-under-continuous-unrestricted-access",

      directAccessTiming:
        "Use controlled grazing, forage frames, or cut-and-carry harvest rather than unrestricted access to a small planting.",

      nutritionalOrientation: [
        "fresh-green",
        "fiber",
        "vitamin-rich-plant-material",
        "household-food",
        "enrichment"
      ],

      balancedFeedReplacement:
        false,

      notes: [
        "Kale and Collard leaves are best treated as fresh supplemental greens.",
        "The crop is especially useful for confined flocks lacking access to vegetation.",
        "A forage frame can protect plant crowns and roots from scratching.",
        "Repeated harvesting is possible when outer leaves are removed and the growing center remains intact.",
        "The crop is low in concentrated energy and should not be treated as a replacement for grain or balanced poultry feed.",
        "Young chicks should continue receiving an age-appropriate complete starter ration.",
        "Large quantities of any supplemental green can reduce consumption of complete feed if offered without restraint."
      ]
    }
  },

  labor: {
    beginnerFriendlinessScore: 5,

    plantingEaseScore: 4,

    establishmentEaseScore: 4,

    routineMaintenanceEaseScore: 4,

    weedControlEaseScore: 4,

    wildlifeProtectionEaseScore: 3,

    harvestEaseScore: 5,

    freshLeafProcessingEaseScore: 5,

    refrigeratedStorageEaseScore: 4,

    dryingEaseScore: 2,

    storageMonitoringEaseScore: 4,

    perennialMaintenanceEaseScore: 5,

    physicalAccessibilityScore: 5,

    heavyLiftingRiskScore: 1,

    weeklyLaborLevel:
      "low",

    peakWorkloadLevel:
      "low",

    harvestFrequencyCategory:
      "several-weekly",

    requiredPlantingTasks: [
      "prepare-seedbed"
    ],

    optionalPlantingTasks: [
      "start-indoors",
      "transplant",
      "install-irrigation"
    ],

    requiredMaintenanceTasks: [
      "hand-weed"
    ],

    optionalMaintenanceTasks: [
      "mulch",
      "protect-from-wildlife"
    ],

    requiredHarvestTasks: [
      "cut-leaves"
    ],

    usePathProcessingTasks: {
      freshCutLeaves: [
        "cut-leaves"
      ],

      protectedLivingForage: [],

      refrigeratedLeaves: [
        "cut-leaves",
        "refrigerate"
      ]
    },

    requiredStorageTasks: [],

    specializedEquipmentRequired: [],

    specializedEquipmentHelpful: [
      "hand-pruners",
      "row-cover",
      "forage-frame",
      "drip-irrigation",
      "refrigerator"
    ],

    suitableForLowTimeUsersScore: 5,

    suitableForSoloGrowersScore: 5,

    directFacts: {
      seedSize:
        "small",

      directSeedingSuitable: true,

      transplantingSuitable: true,

      specializedHarvestEquipmentRequiredForBackyardScale:
        false,

      majorLaborBottlenecks: [
        "Monitoring cabbage worms and loopers",
        "Protecting seedlings from flea beetles",
        "Maintaining moisture during warm weather",
        "Repeated leaf harvesting",
        "Protecting plants from chickens and browsing wildlife"
      ],

      notes: [
        "Kale and Collards are generally beginner-friendly crops.",
        "Transplants can simplify establishment and provide earlier harvest.",
        "Harvest is simple and can be repeated by removing mature outer leaves.",
        "Pest inspection may become the most regular management task.",
        "Small plantings require no specialized tools.",
        "The plants are lightweight and accessible for most hand-harvest systems."
      ]
    }
  },

  cost: {
    seedOrPlantCostLevel:
      "low",

    soilPreparationCostLevel:
      "low",

    irrigationCostLevel:
      "low",

    protectionCostLevel:
      "low",

    processingEquipmentCostLevel:
      "very-low",

    storageCostLevel:
      "very-low",

    annualRecurringCostLevel:
      "low",

    longTermValueScore: 5,

    lowestCostUsePath:
      "fresh-cut-leaves",

    highestCostUsePath:
      "protected-living-forage",

    likelyCostDrivers: [
      "Transplants rather than seed",
      "Row cover",
      "Forage-frame materials",
      "Drip irrigation",
      "Compost or fertility amendments"
    ],

    costReductionOptions: [
      "Start plants from seed.",
      "Use direct seeding where conditions allow.",
      "Harvest fresh leaves instead of storing them.",
      "Build a forage frame from existing wire and lumber.",
      "Use mulch to reduce watering and weed pressure."
    ],

    directFacts: {
      specializedPlantingEquipmentRequired:
        false,

      specializedBackyardHarvestEquipmentRequired:
        false,

      specializedProcessingEquipmentRequired:
        false,

      notes: [
        "Kale and Collards are inexpensive to establish from seed.",
        "Fresh use requires almost no processing equipment.",
        "A protected forage frame may be the largest optional infrastructure expense.",
        "Fertility and irrigation costs depend on the existing garden.",
        "Cost values are qualitative rather than current retail estimates."
      ]
    }
  },

  goals: {
    feedReductionScore: 2,

    energyProductionScore: 1,

    proteinOrientedScore: 2,

    freshGreensScore: 5,

    livingForageScore: 4,

    winterStorageScore: 2,

    enrichmentScore: 4,

    resilienceScore: 4,

    soilImprovementScore: 2,

    nitrogenFixationScore: 1,

    groundCoverScore: 3,

    erosionControlScore: 2,

    shadeScore: 1,

    privacyScreeningScore: 1,

    pollinatorSupportScore: 1,

    compostBiomassScore: 4,

    householdFoodScore: 5,

    seedSavingScore: 2,

    selfRelianceScore: 4,

    multipurposeValueScore: 5,

    visualAppealScore: 4,

    productionReliabilityScore: 4,

    fastestValueScore: 5,

    nonElectricStorageScore: 1,

    smallFlockValueScore: 5,

    largeFlockValueScore: 3,

    primaryGoalMatches: [
      "fresh-greens",
      "living-forage",
      "cool-season-production",
      "household-food",
      "beginner-friendly",
      "small-space",
      "container-growing",
      "forage-frame",
      "fast-value",
      "edible-landscape"
    ],

    weakGoalMatches: [
      "high-energy",
      "dry-grain-storage",
      "nitrogen-fixation",
      "pollinator-crop",
      "long-term-non-electric-storage",
      "major-feed-replacement"
    ],

    directFacts: {
      repeatedLeafHarvest:
        true,

      humanFoodPotential:
        true,

      coolSeasonProduction:
        true,

      containerSuitable:
        true,

      forageFramePotential:
        true,

      notes: [
        "Kale and Collards are among the strongest fresh-green crops in the initial planner database.",
        "They offer rapid household and flock value from a small area.",
        "Repeated leaf harvest improves usefulness over a longer season.",
        "They are not strong concentrated-energy or dry-storage crops.",
        "Flowering is normally not the production goal, so pollinator value is limited in typical management.",
        "Seed saving is possible but more complicated because Brassica varieties can cross and plants normally flower in their second year.",
        "Their best planner role is fresh seasonal supplementation rather than major purchased-feed replacement."
      ]
    }
  },

  risks: {
    wildlife: {
      wildBirds: 2,
      deer: 5,
      raccoons: 1,
      squirrels: 1,
      rabbits: 5,
      rodents: 2,
      groundhogs: 4
    },

    insectsRiskScore: 5,

    diseaseRiskScore: 4,

    lodgingRiskScore: 1,

    fieldMoldRiskScore: 2,

    dryingMoldRiskScore: 2,

    storageMoldRiskScore: 2,

    storedInsectRiskScore: 1,

    spoilageSpeedRiskScore: 4,

    invasivenessConcernRiskScore: 1,

    selfSeedingRiskScore: 2,

    fruitDropRiskScore: 1,

    cropFailureRiskScore: 3,

    stormDamageRiskScore: 2,

    shadingOtherCropsRiskScore: 2,

    overfeedingRiskScore: 2,

    treatedSeedRiskScore: 5,

    primaryRisks: [
      {
        id:
          "brassica-caterpillars",

        severity:
          "very-high",

        affectedStages: [
          "seedling",
          "vegetative-growth",
          "harvest"
        ],

        mitigationOptions: [
          "Row cover",
          "Regular leaf inspection",
          "Hand removal",
          "Appropriate biological controls",
          "Crop rotation"
        ],

        note:
          "Cabbage worms and loopers can rapidly remove leaf tissue and contaminate harvested leaves."
      },

      {
        id:
          "flea-beetle-seedling-damage",

        severity:
          "high",

        affectedStages: [
          "emergence",
          "seedling"
        ],

        mitigationOptions: [
          "Row cover",
          "Healthy transplants",
          "Rapid establishment",
          "Regular inspection"
        ],

        note:
          "Flea beetles can severely damage or kill small seedlings."
      },

      {
        id:
          "aphid-pressure",

        severity:
          "high",

        affectedStages: [
          "vegetative-growth",
          "harvest"
        ],

        mitigationOptions: [
          "Inspect leaf undersides",
          "Use strong water spray",
          "Remove heavily infested leaves",
          "Encourage beneficial insects"
        ],

        note:
          "Aphids may cluster inside curled leaves and make harvesting difficult."
      },

      {
        id:
          "deer-rabbit-browsing",

        severity:
          "very-high",

        affectedStages: [
          "seedling",
          "vegetative-growth",
          "harvest"
        ],

        mitigationOptions: [
          "Fencing",
          "Protected beds",
          "Row cover",
          "Forage-frame protection"
        ],

        note:
          "Tender leafy Brassicas are highly attractive to deer and rabbits."
      },

      {
        id:
          "summer-heat-quality-loss",

        severity:
          "high",

        affectedStages: [
          "vegetative-growth",
          "harvest"
        ],

        mitigationOptions: [
          "Grow during spring and fall",
          "Use afternoon shade",
          "Mulch",
          "Maintain even moisture",
          "Choose heat-tolerant Collard varieties"
        ],

        note:
          "High temperatures reduce growth and may make leaves tougher or more bitter."
      },

      {
        id:
          "fresh-leaf-spoilage",

        severity:
          "high",

        affectedStages: [
          "postharvest",
          "storage",
          "feeding"
        ],

        mitigationOptions: [
          "Feed soon after harvest",
          "Refrigerate briefly",
          "Discard slimy or decayed leaves",
          "Avoid sealing wet warm leaves"
        ],

        note:
          "Fresh leaves are perishable and are not suitable for long room-temperature storage."
      },

      {
        id:
          "chemically-treated-seed",

        severity:
          "very-high",

        affectedStages: [
          "planting",
          "feeding"
        ],

        mitigationOptions: [
          "Use untreated seed for crops intended for feed",
          "Keep treated planting seed separated"
        ],

        note:
          "Chemically treated planting seed must never be fed."
      }
    ],

    directFacts: {
      cabbageWormConcern:
        true,

      cabbageLooperConcern:
        true,

      aphidConcern:
        true,

      fleaBeetleConcern:
        true,

      deerRabbitConcern:
        true,

      heatQualityConcern:
        true,

      freshStorageLimited:
        true,

      notes: [
        "Brassica insects are among the crop's most important management limitations.",
        "Regular inspection is especially important because harvested leaves are the desired product.",
        "Row cover can protect against insects but must be installed before pests reach the plants.",
        "Warm humid conditions may increase several foliar diseases.",
        "Crop rotation and clean plant material reduce some disease carryover.",
        "Leaves with mold, decay, slime, heavy insect contamination, or unapproved pesticide residue should not be fed.",
        "Fresh leaves should be used promptly or refrigerated."
      ]
    }
  },

  seasonalRoles: {
    earlySpring: true,

    lateSpring: true,

    summer: false,

    lateSummer: true,

    fall: true,

    winterStorage: false,

    perennial: false,

    plantingWindows: [
      {
        id:
          "early-spring-direct-seed",

        trigger:
          "before-last-frost",

        offsetWeeksMinimum: 4,
        offsetWeeksMaximum: 5,

        soilCondition:
          "workable-and-cool",

        method:
          "direct-seed",

        note:
          "Kale may be seeded several weeks before the final spring frost where soil can be worked."
      },

      {
        id:
          "early-spring-transplant",

        trigger:
          "before-last-frost",

        offsetWeeksMinimum: 4,
        offsetWeeksMaximum: 5,

        method:
          "transplant",

        note:
          "Transplants can provide earlier spring harvest."
      },

      {
        id:
          "late-summer-fall-planting",

        trigger:
          "late-summer",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        method:
          "direct-seed-or-transplant",

        note:
          "Plant early enough to establish before short days and severe cold; maturity may occur after the first fall frost."
      }
    ],

    harvestWindows: [
      {
        id:
          "baby-leaf-harvest",

        trigger:
          "young-leaves-usable",

        usePathId:
          "fresh-cut-leaves",

        note:
          "Young leaves can be harvested before plants reach full size."
      },

      {
        id:
          "repeated-outer-leaf-harvest",

        trigger:
          "outer-leaves-full-size",

        usePathId:
          "fresh-cut-leaves",

        note:
          "Remove mature outer leaves while preserving the central growing point."
      },

      {
        id:
          "protected-living-forage",

        trigger:
          "plants-established",

        usePathId:
          "protected-living-forage",

        note:
          "Allow controlled access through a forage frame after plants are established."
      }
    ],

    cropSequenceRoles: [
      "Early-spring leafy crop",
      "Fall leafy crop",
      "Protected winter green in mild climates",
      "Cool-season forage-frame crop",
      "Fast household-food crop"
    ],

    seasonalLimitations: [
      "Summer heat reduces quality",
      "Fresh leaves have limited storage life",
      "Severe winter conditions may require protection",
      "Brassica pests may remain active during mild weather"
    ],

    directFacts: {
      coolSeasonCrop: true,

      springPlantingPossible:
        true,

      fallPlantingPossible:
        true,

      repeatedLeafHarvestPossible:
        true,

      winterGardenPotential:
        true,

      notes: [
        "Kale and Collards can provide harvests during spring and fall when warm-season crops are unavailable.",
        "In mild climates or under protection, harvest may continue into winter.",
        "Repeated outer-leaf harvest can extend production.",
        "Fall crops often produce high-quality leaves after frost.",
        "The crop's main seasonal weakness is hot summer weather."
      ]
    }
  },

  usePaths: [
    {
      id:
        "fresh-cut-leaves",

      label:
        "Fresh Cut Kale or Collard Leaves",

      description:
        "Healthy leaves harvested from established plants and offered promptly as a fresh supplemental green.",

      primaryFeedRole:
        "fresh-green",

      harvestProducts: [
        "fresh-greens",
        "fresh-leaves"
      ],

      suitableFeedingMethods: [
        "cut-and-carry",
        "fresh-supplement",
        "seasonal-enrichment",
        "whole-produce"
      ],

      requiredProcessingTasks: [
        "cut-leaves"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "basket"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "several-weekly",

      storageMethods: [
        "short-term-fresh"
      ],

      preferredStorageMethod:
        "feed-soon-after-harvest",

      storageDurationCategory:
        "very-short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 5,
      flockValueScore: 5,

      safetyWarnings: [
        "Offer only clean, healthy leaves without mold, decay, slime, or unapproved pesticide residues.",
        "Introduce unfamiliar fresh greens gradually.",
        "Fresh leaves remain supplemental and should not replace balanced poultry feed.",
        "Discard spoiled or questionable plant material."
      ],

      incompatibleUserTraits: [
        "requires-long-term-room-temperature-storage",
        "wants-dry-grain-only",
        "has-no-fresh-harvest-time"
      ]
    },

    {
      id:
        "protected-living-forage",

      label:
        "Protected Kale or Collard Forage",

      description:
        "Established plants protected beneath a forage frame so chickens can reach leaves while roots and crowns remain protected from scratching.",

      primaryFeedRole:
        "living-forage",

      harvestProducts: [
        "living-forage",
        "fresh-greens"
      ],

      suitableFeedingMethods: [
        "forage-frame",
        "controlled-grazing",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [],

      optionalProcessingTasks: [],

      requiredEquipment: [
        "forage-frame"
      ],

      helpfulEquipment: [
        "fencing",
        "drip-irrigation",
        "row-cover"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "continuous",

      storageMethods: [
        "living-crop"
      ],

      preferredStorageMethod:
        "not-applicable",

      storageDurationCategory:
        "immediate",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: false,

      moldRiskScore: 1,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 3,
      flockValueScore: 5,

      safetyWarnings: [
        "The frame must prevent chickens from scratching out roots and crowns.",
        "Avoid using sharp, loose, or damaged wire that could injure birds.",
        "Do not allow manure buildup to contaminate leaves intended for household use.",
        "The living crop remains supplemental and does not replace complete feed."
      ],

      incompatibleUserTraits: [
        "declines-building-protection",
        "has-no-run-space",
        "requires-household-and-flock-use-from-same-unprotected-bed"
      ]
    },

    {
      id:
        "refrigerated-fresh-leaves",

      label:
        "Briefly Refrigerated Kale or Collard Leaves",

      description:
        "Freshly harvested leaves cooled and refrigerated for short-term household and flock use.",

      primaryFeedRole:
        "fresh-green-short-storage",

      harvestProducts: [
        "fresh-greens",
        "refrigerated-leaves"
      ],

      suitableFeedingMethods: [
        "cut-and-carry",
        "fresh-supplement",
        "measured-supplement"
      ],

      requiredProcessingTasks: [
        "cut-leaves",
        "refrigerate"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [
        "refrigerator"
      ],

      helpfulEquipment: [
        "basket",
        "food-safe-container"
      ],

      harvestPattern:
        "several",

      harvestFrequencyCategory:
        "weekly",

      storageMethods: [
        "refrigerated"
      ],

      preferredStorageMethod:
        "cold-high-humidity-short-term",

      storageDurationCategory:
        "short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 4,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 5,
      flockValueScore: 4,

      safetyWarnings: [
        "Cool leaves promptly after harvest.",
        "Discard wilted, slimy, moldy, foul-smelling, or decayed leaves.",
        "Do not seal warm wet leaves in storage.",
        "Refrigerated leaves remain supplemental to complete poultry feed."
      ],

      incompatibleUserTraits: [
        "has-no-refrigerator",
        "requires-non-electric-storage",
        "requires-storage-beyond-several-weeks"
      ]
    }
  ],

  dataQuality: {
    overallConfidence:
      0.82,

    verifiedFields: [
      "identity",
      "lifecycle",
      "climate.directFacts.seasonType",
      "climate.directFacts.youngPlantColdToleranceF",
      "climate.directFacts.preferredMaximumGrowingTemperatureF",
      "climate.daysToMaturityMinimum",
      "climate.daysToMaturityMaximum",
      "site.directFacts.preferredLight",
      "soil.directFacts.organicMatterBenefit",
      "soil.directFacts.highNitrogenLeafCrop",
      "water.directFacts.evenMoistureImportant",
      "water.directFacts.typicalWeeklyWaterInchesMinimum",
      "water.directFacts.typicalWeeklyWaterInchesMaximum",
      "space.directFacts.containerSuitable",
      "space.directFacts.raisedBedSuitable",
      "space.directFacts.repeatedHarvestSuitable",
      "labor.directFacts.directSeedingSuitable",
      "labor.directFacts.transplantingSuitable",
      "risks.directFacts.cabbageWormConcern",
      "risks.directFacts.cabbageLooperConcern",
      "risks.directFacts.aphidConcern",
      "risks.directFacts.fleaBeetleConcern",
      "risks.directFacts.heatQualityConcern",
      "seasonalRoles.directFacts.coolSeasonCrop",
      "seasonalRoles.directFacts.repeatedLeafHarvestPossible"
    ],

    derivedFields: [
      "climate.heatToleranceScore",
      "climate.droughtClimateToleranceScore",
      "climate.humidityToleranceScore",
      "climate.coolSummerToleranceScore",
      "climate.frostSensitivityScore",
      "site",
      "soil.textureScores",
      "soil.drainageRequirementScore",
      "soil.waterloggingSensitivityScore",
      "water",
      "space.smallSpaceScore",
      "space.mediumSpaceScore",
      "space.largeSpaceScore",
      "space.layoutScores",
      "space.spaceTypeScores",
      "flock.flockPurposeScores",
      "flock.feedingMethodScores",
      "flock.directRunSuitabilityScore",
      "flock.forageFrameSuitabilityScore",
      "labor",
      "cost",
      "goals",
      "risks.wildlife",
      "usePaths.fresh-cut-leaves",
      "usePaths.protected-living-forage",
      "usePaths.refrigerated-fresh-leaves"
    ],

    uncertainFields: [
      "climate.minimumFrostFreeDays",
      "climate.preferredFrostFreeDays",
      "climate.minimumSoilTemperatureF",
      "soil.saltToleranceScore",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "usePaths.fresh-cut-leaves.exactStorageDuration",
      "usePaths.protected-living-forage.regrowthUnderChickenPressure",
      "usePaths.refrigerated-fresh-leaves.exactStorageDuration",
      "risks.wildlife.raccoons",
      "risks.wildlife.squirrels"
    ],

    missingFields: [
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "flock.usePathTesting"
    ],

    lastReviewed:
      "2026-07-14",

    primarySources: [
      {
        title:
          "How to Grow Kale in Your Garden",

        organization:
          "Utah State University Extension",

        sourceType:
          "peer-reviewed-extension-fact-sheet",

        use:
          "Climate, cold tolerance, temperature, planting dates, spacing, soil, water, fertility, pest pressure, repeated harvest, and refrigerated storage"
      },

      {
        title:
          "Growing Cole Crops in the Home Garden",

        organization:
          "University Cooperative Extension resources",

        sourceType:
          "extension-home-garden-guide",

        use:
          "Kale and Collard production, cool-season scheduling, fertility, irrigation, row cover, insect pressure, and disease management"
      },

      {
        title:
          "Commercial and Home-Garden Collard Production Guidance",

        organization:
          "Southern Cooperative Extension resources",

        sourceType:
          "extension-production-guide",

        use:
          "Collard heat adaptation, spacing, repeated harvest, Southern planting windows, pests, and cultivar differences"
      }
    ],

    notes: [
      "Kale and Collards were combined because they share Brassica oleracea ancestry, leafy harvest use, cool-season management, and similar planner roles.",
      "The record recognizes that Collards may tolerate warm Southern conditions better than some Kale varieties, but both remain classified primarily as cool-season crops.",
      "The planner separates fresh cut leaves, protected living forage, and brief refrigerated storage into distinct use paths.",
      "Fresh leafy material is treated as supplemental rather than a complete poultry ration.",
      "No exact flock feeding portions were assigned.",
      "Minimum useful area and production area remain intentionally null.",
      "The crop should remain in testing until the shared engine compares it with Sunflower and Cowpea across cool-season and fresh-green profiles."
    ]
  }
}

  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - WHITE CLOVER
    //
    //
    //
    //
    //////////////////////////////////////////////


  "CROP-WHITE-CLOVER": {
    id: "CROP-WHITE-CLOVER",

    name: "White Clover",
    scientificName: "Trifolium repens",

    category: "Perennial Living Forage and Soil-Building Legume",
    cropType: "Perennial",
    seasonType: "Cool Season",

    status: "Initial Research Complete",

    summary:
      "White clover is a low-growing perennial legume that spreads through creeping stolons, fixes atmospheric nitrogen, produces palatable protein-rich foliage, and can serve as a living forage supplement in suitable chicken yards or managed pasture systems. It performs best in cool, moist conditions and may decline under drought, extreme heat, poor fertility, or concentrated chicken traffic.",

    chickenUse: {
      edibleParts: [
        "Fresh leaves",
        "Tender stems and stolons",
        "Flowers",
        "Seeds",
        "Dried aerial growth"
      ],

      primaryValue: [
        "Living forage",
        "Protein-rich leafy dry matter",
        "Foraging enrichment",
        "Carotenoids and plant pigments",
        "Ground cover",
        "Nitrogen fixation",
        "Soil improvement"
      ],

      feedingForms: [
        "Managed grazing of an established clover-grass area",
        "Freshly cut leaves and tender stems",
        "Clover mixed with other pasture plants",
        "Dried and crumbled aerial growth in limited amounts",
        "Cut-and-carry forage offered separately from complete feed"
      ],

      bestFor: [
        "Adult chickens with managed pasture access",
        "Cool and moist climates",
        "Mixed grass-and-legume forage areas",
        "Rotational poultry runs",
        "Owners seeking a perennial forage rather than an annual harvested crop",
        "Garden systems that benefit from nitrogen fixation"
      ],

      supplementOnly: true,

      preparationNotes:
        "Establish the clover fully before allowing chicken access. White clover is generally more persistent when mixed with compatible grasses and when birds are rotated between sections rather than confined continuously on one small patch. Cut forage should be clean, fresh, and free from unsafe pesticide residues.",

      safetyNotes:
        "White clover should supplement—not replace—a complete poultry ration. Fresh clover contains substantial water and fiber, and chickens cannot rely on it for balanced energy, amino acids, calcium, vitamins, and minerals. Some white-clover plants produce cyanogenic compounds, but poultry-specific risk thresholds are not well established. Avoid making concentrated clover the entire forage stand, and do not feed wilted, moldy, fermented, spoiled, or chemically contaminated material."
    },

    nutrition: {
      basis:
        "Approximate values for fresh white-clover aerial growth, primarily expressed on a dry-matter basis. Nutrient content varies with cultivar, maturity, season, soil fertility, moisture, and the proportion of leaf, flower, and stem.",

      dryMatterPercent:
        "Approximately 16.8% as fed on average, with considerable variation",

      crudeProteinPercent:
        "Approximately 24.9% of dry matter for fresh aerial growth on average; broader reported values are roughly 17% to 33% of dry matter",

      fatPercent:
        "Approximately 2.7% ether extract on a dry-matter basis",

      fiberPercent:
        "Approximately 19.6% crude fiber on a dry-matter basis; average NDF approximately 27.5%",

      calciumPercent:
        "Approximately 1.01% of dry matter, based on an average of 10.1 g/kg DM",

      phosphorusPercent:
        "Approximately 0.33% of dry matter, based on an average of 3.3 g/kg DM",

      notableNutrients: [
        "Relatively high crude protein for leafy forage",
        "Calcium",
        "Phosphorus",
        "Magnesium",
        "Potassium",
        "Carotenoids",
        "Alpha-linolenic acid and other forage fatty acids",
        "Plant pigments",
        "Soluble carbohydrates"
      ],

      limitations: [
        "Fresh foliage is mostly water, so fresh weight greatly overstates concentrated feed value",
        "Protein percentage on a dry-matter basis does not mean the forage supplies a complete poultry amino-acid profile",
        "Fiber limits the amount of energy poultry can obtain from the plant",
        "The forage does not provide enough concentrated energy for use as a complete diet",
        "Its calcium content is still far below that of a properly formulated layer ration",
        "White clover may contain cyanogenic glucosides and other secondary plant compounds",
        "Nutrient values for fresh forage, hay, silage, flowers, and seed are not interchangeable",
        "Pasture intake by chickens may remain a small percentage of total dry-matter intake"
      ]
    },

    growing: {
      sunlight:
        "Full sun to partial shade; shade may reduce stolon formation and overall production",

      soilTemperatureMinimumF: null,

      idealSoilTemperatureF:
        "Cool soil and air conditions generally favor establishment and growth",

      optimalGrowthTemperatureF:
        "Approximately 68°F to 77°F according to broad forage references",

      frostTolerance:
        "Moderate, although winter survival varies with cultivar, snow cover, soil moisture, and exposure",

      heatTolerance:
        "Low to Moderate; prolonged hot and dry conditions can reduce growth and persistence",

      droughtTolerance:
        "Low to Moderate because the root system is relatively shallow",

      soilPHMinimum: 5.5,
      soilPHMaximum: null,

      waterNeeds:
        "Moderate. White clover performs best with dependable moisture and may become sparse or disappear on dry sites.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: null,
      daysToFirstHarvestMaximum: null,

      daysToMaturityMinimum: null,
      daysToMaturityMaximum: null,

      plantSpacingInches:
        "Normally broadcast or drilled as a dense ground cover rather than planted as individually spaced plants",

      rowSpacingInches:
        "Not generally applicable for pasture establishment; seed-production fields may use spaced rows",

      plantingDepthInches:
        "Approximately 1/8 to 1/4 inch; seed placed too deeply may establish poorly",

      successionPlanting: false,

      regrowthAfterHarvest:
        "Yes. Leaves and roots develop from nodes along creeping stolons when the stand is not overgrazed or damaged.",

      establishmentNotes:
        "Seed should contact a firm seedbed and may benefit from inoculation with the correct Rhizobium when compatible bacteria are not already present. Excess nitrogen fertilizer can favor grasses over clover."
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Seed in spring after the soil becomes workable, or in late summer only when at least approximately six weeks of growth remain before persistent freezing. Select winter-hardy cultivars.",
        harvestWindow:
          "Late spring through fall. Winter survival may depend on snow cover and cultivar."
      },

      midwestNortheast: {
        plantingWindow:
          "Spring establishment is commonly practical from early to mid-spring. Late-summer seeding may work where moisture is dependable and at least six weeks remain before freezing.",
        harvestWindow:
          "Late spring through fall, with slower growth during summer drought or winter cold."
      },

      upperSouth: {
        plantingWindow:
          "Seed during cool, moist periods in late winter or early spring, or during early fall when enough establishment time remains before cold weather.",
        harvestWindow:
          "Spring and fall are usually strongest. Growth may slow during the hottest and driest part of summer."
      },

      deepSouth: {
        plantingWindow:
          "Use primarily as a cool-season forage, often seeded in fall where winters are mild. Local cultivar selection is important because heat and disease pressure can limit persistence.",
        harvestWindow:
          "Late fall through spring, with decline likely during severe summer heat."
      },

      southwest: {
        plantingWindow:
          "Plant during cool weather where irrigation is available. Avoid expecting reliable persistence on dry, unirrigated sites.",
        harvestWindow:
          "Cool-season growth may continue from fall through spring, depending on elevation and irrigation."
      },

      pacificNorthwest: {
        plantingWindow:
          "Seed during spring or early fall when moisture is dependable. The crop is well suited to many cool, moist locations.",
        harvestWindow:
          "Spring through fall, with extended growth possible in mild coastal climates."
      },

      coastalWest: {
        plantingWindow:
          "Plant during cool, moist periods, commonly from fall through spring. Irrigation may be needed in dry summers.",
        harvestWindow:
          "Much of the year in mild climates when adequate moisture is available."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      seedingRateSolidStand:
        "Approximately 4 pounds of pure live seed per acre in USDA NRCS guidance",

      seedingRateGrassMixture:
        "Approximately 1 pound of pure live seed per acre when used as part of a grass-legume pasture mixture",

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      commercialForageYield:
        "Pure irrigated stands have produced approximately 12 metric tons of dry matter per hectare in some temperate research, while non-irrigated stands produced about 9 metric tons; these values should not be treated as backyard guarantees",

      storageLife:
        "Freshly cut clover should generally be used promptly. Thoroughly dried clover may store for several months under suitable conditions.",

      storageMethod:
        "Use fresh cut forage promptly, or dry it rapidly and completely with good airflow. Store dried material in a cool, dry, dark, pest-resistant location and discard any material that becomes damp, moldy, dusty, or musty.",

      yieldNotes:
        "Plants-per-area values remain null because white clover is normally broadcast or drilled according to seed weight rather than planted as individually spaced garden plants. After establishment, creeping stolons root at their nodes and form a spreading mat, making the number of distinct mature plants difficult to define. Final stand density also depends on seeding rate, germination, soil contact, moisture, competition, grazing pressure, and the proportion of clover in a mixed pasture. A future feed-garden calculator should use a seeding-rate-per-area field and estimated forage biomass rather than individual plant counts."

    },

    economics: {
      seedCostEstimate:
        "Generally low to moderate because seeding rates are small, although improved, inoculated, coated, or specialty cultivars may cost more",

      equipmentCostEstimate:
        "Low for broadcasting into a prepared area. Optional costs include soil testing, lime, phosphorus and potassium amendments, irrigation, seedbed preparation, temporary fencing, and rotational-run materials.",

      irrigationCostLevel:
        "Low in naturally moist climates; Moderate to High in dry climates",

      laborLevel:
        "Low after establishment when managed as pasture, but potentially moderate when rotational fencing, mowing, reseeding, and irrigation are required",

      potentialFeedSavings: null,

      economicNotes:
        "White clover may provide value through perennial regrowth, nitrogen fixation, reduced nitrogen-fertilizer needs, soil cover, pollinator support, and forage enrichment. Direct feed savings remain uncertain because chicken forage intake is limited and dense flocks can destroy the stand rapidly."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for forage composition, establishment, pasture management, nitrogen fixation, moisture requirements, and general livestock use; moderate for poultry preference and pasture effects; limited for backyard laying-hen intake, direct feed savings, and persistence under typical small-run stocking densities",

      sources: [
        {
          title:
            "White Clover Plant Guide",
          organization:
            "USDA Natural Resources Conservation Service",
          url:
            "https://plants.usda.gov/DocumentLibrary/plantguide/pdf/pg_trre3.pdf",
          use:
            "Growth habit, adaptation, seed depth, seeding rates, seasonal establishment, pasture management, crude-protein range, nitrogen fixation, seed production, and environmental concerns"
        },

        {
          title:
            "White Clover (Trifolium repens)",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/245",
          use:
            "Forage composition, dry matter, protein, fiber, fat, minerals, poultry preference, pasture research, yield context, cyanogenic compounds, and secondary metabolites"
        },

        {
          title:
            "Pasture Intake and Egg Composition of Laying Hens",
          organization:
            "Pennsylvania State University poultry research",
          url:
            "https://doi.org/10.1017/S1751731109991644",
          use:
            "Comparison of hens grazing alfalfa, red and white clover, or cool-season grasses while receiving commercial feed"
        },

        {
          title:
            "The Quest for Persistent Green in Outdoor Chicken Runs",
          organization:
            "European Grassland Federation research proceedings",
          url:
            "https://www.europeangrassland.org/",
          use:
            "White-clover biomass loss and limited persistence under concentrated chicken grazing"
        },

        {
          title:
            "Forage Selection by Laying Hens in Multi-Species Pasture",
          organization:
            "Peer-reviewed organic-poultry research",
          url:
            "https://scholar.google.com/scholar?q=Horsted+white+clover+laying+hens+pasture+preference",
          use:
            "Evidence that laying hens showed a clear preference for white clover while receiving a nutritionally complete diet"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Keep this record specific to white clover rather than applying its data to red, crimson, berseem, subterranean, or sweet clovers.",
        "Research named cultivars suitable for poultry yards in the North, transition zone, Deep South, and Pacific regions.",
        "Determine whether small, intermediate, or large-leaf white clover is most persistent under chicken traffic.",
        "Find poultry-specific data on cyanogenic white-clover varieties and practical risk under normal pasture access.",
        "Do not apply ruminant bloat warnings to chickens; bloat is a ruminant digestive-system issue.",
        "Measure how stocking density and rest periods affect stand recovery.",
        "Compare pure white clover with clover-grass mixtures for persistence, forage intake, and soil cover.",
        "Determine realistic dry-matter harvest per 100 square feet under backyard management.",
        "Quantify the percentage of total feed intake obtained from white-clover pasture by laying hens.",
        "Evaluate temporary grazing frames or protected forage beds that prevent scratching damage.",
        "Research whether frequent mowing improves tender regrowth and flock use.",
        "Calculate scores only after multiple perennial and annual forage crops have comparable data.",
        "Plant-density fields remain null because white clover is established by seeding rate and spreads through rooted stolons, making individual mature plants per square foot an unreliable measurement."

      ]
    },

   plannerData: {
  schemaVersion: "1.0.0",

  developmentStatus:
    "ready",

  identity: {
    plannerName:
      "White Clover",

    shortLabel:
      "White Clover",

    icon:
      "☘️",

    cropCategory:
      "perennial-legume",

    primaryFeedCategory:
      "living-forage",

    guideUrl:
      "growing-white-clover-for-chickens.html"
  },

  lifecycle: {
    growthCycle:
      "perennial",

    isAnnual: false,
    isBiennial: false,
    isPerennial: true,
    isTreeOrShrub: false,

    yearsToFirstUsefulHarvest: 0,
    yearsToFullProduction: 1,
    expectedUsefulLifeYears: null,

    regrowsAfterHarvest: true,

    permanentPlantingRequired: true,
    reversibleAfterOneSeason: false
  },

  climate: {
    suitableClimateTypes: [
      "cold-short-summer",
      "cool-moderate-summer",
      "temperate",
      "mild-winter",
      "high-elevation"
    ],

    preferredClimateTypes: [
      "cool-moderate-summer",
      "temperate",
      "mild-winter"
    ],

    challengingClimateTypes: [
      "hot-dry",
      "hot-humid"
    ],

    minimumFrostFreeDays: null,
    preferredFrostFreeDays: null,

    minimumSoilTemperatureF: null,
    preferredSoilTemperatureF: null,

    daysToMaturityMinimum: null,
    daysToMaturityMaximum: null,

    dryDownBufferDays: null,

    heatToleranceScore: 2,

    droughtClimateToleranceScore: 2,

    humidityToleranceScore: 4,

    coolSummerToleranceScore: 5,

    frostSensitivityScore: 1,

    winterHardinessRequired: true,

    seasonExtensionBenefits: [
      "Early fall establishment can allow rooting before winter in suitable climates.",
      "Spring seeding can avoid severe summer establishment stress.",
      "Temporary irrigation can greatly improve establishment during dry weather.",
      "Protected run sections can allow stands to establish before chickens gain access."
    ],

    indoorSeedStartingBenefitScore: 1,

    directFacts: {
      seasonType:
        "cool-season-perennial",

      frostSensitive: false,

      commonlyDirectSeeded: true,

      winterDormancyPossible: true,

      heatDormancyPossible: true,

      stoloniferousPerennial: true,

      establishmentTimingHighlyRegional:
        true,

      notes: [
        "White Clover is a cool-season perennial forage legume.",
        "It spreads through creeping stolons that root at nodes and form a low mat.",
        "Established stands tolerate freezing weather better than frost-sensitive annual crops.",
        "Growth may slow or stop during winter dormancy.",
        "Hot dry summer conditions can reduce growth, leaf production, and stand persistence.",
        "Southern plantings may perform best during cooler portions of the year or where moisture remains dependable.",
        "Exact establishment windows should be based on regional forage guidance rather than a single national calendar.",
        "The planner does not use days-to-maturity because White Clover is managed as a persistent living stand rather than a one-time mature harvest."
      ]
    }
  },

  site: {
    absoluteMinimumSunHours: 3,

    productiveMinimumSunHours: 4,

    preferredSunHours: 6,

    shadeToleranceScore: 4,

    afternoonShadeBenefitInHeat: 5,

    windToleranceScore: 5,

    lodgingRiskScore: 1,

    reflectedHeatToleranceScore: 2,

    airflowRequirementScore: 3,

    frostPocketSensitivityScore: 1,

    treeRootCompetitionToleranceScore: 3,

    hardscapeConflictRiskScore: 2,

    structureConflictRiskScore: 1,

    utilityConflictRiskScore: 1,

    fruitDropMessRiskScore: 1,

    stainingRiskScore: 2,

    directFacts: {
      preferredLight:
        "full-sun-to-partial-shade",

      productiveSunGuidance:
        "Approximately 4 to 6 or more hours of direct sunlight, with adequate moisture becoming increasingly important in exposed hot sites.",

      windExposureConcern:
        false,

      growthHabit:
        "low-creeping-stoloniferous",

      floweringPollinatorTraffic:
        true,

      notes: [
        "White Clover can remain productive under more partial shade than most grain crops.",
        "Full sun generally supports the strongest flowering and biomass where moisture is sufficient.",
        "Afternoon shade can improve summer persistence in hot regions.",
        "Very dense tree shade and severe root competition can reduce stand density.",
        "Its low growth habit creates little wind or structural conflict.",
        "Flowering stands attract bees and other pollinating insects.",
        "Bee activity should be considered where barefoot children, pets, or frequently handled chickens use the same area."
      ]
    }
  },

  soil: {
    textureScores: {
      heavyClay: 3,
      clayLoam: 5,
      loam: 5,
      sandyLoam: 4,
      verySandy: 2,
      rocky: 2
    },

    drainageRequirementScore: 4,

    temporaryWetToleranceScore: 3,

    waterloggingSensitivityScore: 4,

    minimumSoilDepthIn: null,
    preferredSoilDepthIn: 12,

    compactionToleranceScore: 3,

    establishmentInSodDifficultyScore: 4,

    preferredPHMinimum: 6.0,
    preferredPHMaximum: 7.0,

    survivalPHMinimum: null,
    survivalPHMaximum: null,

    fertilityRequirementScore: 3,

    nitrogenRequirementScore: 1,
    phosphorusRequirementScore: 4,
    potassiumRequirementScore: 4,

    benefitsFromInoculation: true,

    inoculantType:
      "Clover-group Rhizobium inoculant",

    saltToleranceScore: null,

    amendmentEffortScore: 3,

    directFacts: {
      preferredDrainage:
        "well-drained-to-moderately-moist",

      preferredTextures: [
        "loam",
        "clay loam",
        "moist sandy loam"
      ],

      nitrogenFixingLegume:
        true,

      inoculationMayImproveNodulation:
        true,

      shallowRooted:
        true,

      waterloggedSoilSuitable:
        false,

      notes: [
        "White Clover performs best in fertile soil with dependable moisture and suitable drainage.",
        "Loam and clay-loam soils commonly provide a favorable balance of moisture retention and drainage.",
        "Very sandy soil may dry too rapidly for dependable summer persistence.",
        "Persistently saturated soil can cause poor rooting, disease, and stand loss.",
        "White Clover can fix atmospheric nitrogen when compatible rhizobia and suitable soil conditions are present.",
        "Clover-group inoculant may improve nodulation where compatible clovers have not recently grown.",
        "Nitrogen fertilizer is generally unnecessary for the Clover itself and may encourage competing grasses.",
        "Phosphorus, potassium, sulfur, soil pH, and other nutrient limitations can still restrict Clover establishment and production.",
        "The stored pH values represent a productive planning range rather than absolute survival limits."
      ]
    }
  },

  water: {
    overallWaterRequirementLevel:
      "moderate",

    germinationWaterNeedLevel:
      "high",

    establishmentWaterNeedLevel:
      "high",

    matureWaterNeedLevel:
      "moderate",

    floweringWaterNeedLevel:
      "moderate",

    harvestDevelopmentWaterNeedLevel:
      "moderate",

    droughtSurvivalScore: 3,

    droughtYieldRetentionScore: 2,

    criticalGrowthStages: [
      "germination",
      "seedling-establishment",
      "stolon-establishment",
      "post-grazing-regrowth",
      "summer-stress"
    ],

    criticalStageWaterImportanceScore: 5,

    overwateringSensitivityScore: 3,

    waterloggingSensitivityScore: 4,

    dripIrrigationBenefitScore: 4,

    mulchBenefitScore: 1,

    suitableForRainfallOnlyScore: 4,

    suitableForLimitedIrrigationScore: 3,

    containerDryingRiskScore: 5,

    establishmentYearsRequiringExtraWater: 1,

    directFacts: {
      establishmentMoistureImportant:
        true,

      shallowRootsIncreaseDroughtRisk:
        true,

      postGrazingMoistureImportant:
        true,

      standingWaterSuitable:
        false,

      irrigationCanImproveSummerPersistence:
        true,

      notes: [
        "White Clover seed and young seedlings require dependable surface moisture because seed is small and planted shallowly.",
        "New stands can fail when the soil surface dries repeatedly during germination.",
        "Established White Clover can survive moderate dry periods, but shallow roots limit forage production during prolonged drought.",
        "Moisture supports stolon rooting and regrowth after grazing or cutting.",
        "Rainfall-only production is practical in many cool or humid regions.",
        "Supplemental irrigation can materially improve summer persistence in hot or seasonally dry locations.",
        "Saturated soil and prolonged standing water remain undesirable."
      ]
    }
  },

  space: {
    minimumTrialAreaSqFt: null,

    minimumUsefulAreaSqFt: null,

    preferredProductionAreaSqFt: null,

    smallSpaceScore: 4,

    mediumSpaceScore: 5,

    largeSpaceScore: 5,

    layoutScores: {
      squareBlock: 5,
      wideRectangle: 5,
      longStrip: 5,
      irregular: 5,
      smallBeds: 4,
      openField: 5
    },

    spaceTypeScores: {
      inGround: 5,
      raisedBed: 3,
      container: 1,
      fenceLine: 4,
      buildingEdge: 3,
      unusedLawn: 5,
      openField: 5,
      orchard: 5,
      forageFrame: 5,
      rotationalPaddock: 5,
      greenhouse: 1,
      hedgerow: 3
    },

    minimumContainerGallons: null,

    containerUseLimitation:
      "White Clover can grow in containers, but shallow containers dry quickly and provide little useful living forage for a flock.",

    minimumRaisedBedDepthIn: null,

    vineSpreadRequired: false,

    verticalSupportBenefitScore: 1,

    blockPlantingRequired: false,

    minimumBlockRows: null,

    continuousStandPreferred: true,

    heightCategory:
      "very-low",

    matureWidthCategory:
      "spreading-ground-cover",

    overflowSpaceBenefitScore: 5,

    directFacts: {
      denseStandSuitable: true,

      mixedPastureSuitable: true,

      lawnOverseedingSuitable:
        true,

      orchardFloorSuitable:
        true,

      forageFrameSuitable:
        true,

      rotationalPaddockSuitable:
        true,

      containerFeedProductionEfficient:
        false,

      notes: [
        "White Clover is most useful as a continuous living stand rather than isolated individual plants.",
        "It can be incorporated into lawns, orchards, pasture mixtures, protected chicken areas, and rotational paddocks.",
        "Irregular sites and unused lawn areas can be productive Clover spaces.",
        "Forage frames can protect crowns and stolons while allowing chickens to reach foliage.",
        "Mixed Clover-and-grass stands may provide stronger ground stability than pure Clover.",
        "Containers provide poor feed value relative to watering effort.",
        "The crop spreads laterally and may move beyond the intended planting boundary.",
        "Minimum useful area remains null until flock pressure, stand recovery, and rotation length are tested."
      ]
    }
  },

  flock: {
    suitableForAdultChickens: true,

    suitableForYoungChicks: false,

    flockPurposeScores: {
      eggs: 4,
      meat: 4,
      breeding: 4,
      petsEnrichment: 5,
      homestead: 5,
      mixed: 5
    },

    feedingMethodScores: {
      livingGrazing: 5,
      cutAndCarry: 4,
      wholeProduce: 1,
      wholeSeedHeads: 1,
      wholeGrain: 1,
      processedGrain: 1,
      heatTreated: 1,
      driedForage: 2,
      winterStorage: 1
    },

    directRunSuitabilityScore: 3,

    forageFrameSuitabilityScore: 5,

    rotationalPaddockSuitabilityScore: 5,

    confinedFlockValueScore: 4,

    pasturedFlockValueScore: 5,

    treatDilutionRiskScore: 2,

    highEnergySupplement: false,

    highFiberSupplement: true,

    concentratedFatSource: false,

    primaryFlockUses: [
      "Rotational living forage",
      "Protected forage-frame greens",
      "Fresh cut-and-carry forage",
      "Mixed pasture diversity",
      "Run and orchard ground cover"
    ],

    unsuitablePrimaryUses: [
      "Complete-ration replacement",
      "Long-term dry feed storage",
      "High-energy supplementation",
      "Unrestricted access to a new stand",
      "Primary young-chick feed"
    ],

    directFacts: {
      edibleFeedParts: [
        "Fresh leaves",
        "Tender petioles",
        "Flowers",
        "Tender stolon growth"
      ],

      preferredBirdStage:
        "Established adult chickens",

      cropSurvivalWithDirectChickenAccess:
        "moderate-after-establishment-and-low-to-moderate-grazing-pressure",

      directAccessTiming:
        "Allow a dense rooted stand to establish before controlled access, and rotate birds away before crowns and stolons are destroyed.",

      nutritionalOrientation: [
        "living-forage",
        "fresh-green",
        "protein-oriented-forage",
        "fiber",
        "enrichment",
        "soil-building"
      ],

      balancedFeedReplacement:
        false,

      notes: [
        "White Clover is primarily valuable as living forage rather than harvested concentrated feed.",
        "Its low stolon-forming growth habit helps it recover from close grazing better than many upright legumes.",
        "Chicken scratching can still uproot seedlings, expose stolons, and destroy crowns.",
        "Rotational access is more sustainable than permanent unrestricted access.",
        "Forage frames can preserve roots and growing points in small chicken runs.",
        "Fresh cut Clover can provide greens to confined flocks when harvested from a clean untreated area.",
        "White Clover contains substantial moisture and fiber and should not replace complete poultry feed.",
        "Young chicks should continue receiving an age-appropriate complete starter ration.",
        "The planner does not assign a medicinal use or disease-treatment claim to White Clover."
      ]
    }
  },

  labor: {
    beginnerFriendlinessScore: 4,

    plantingEaseScore: 3,

    establishmentEaseScore: 3,

    routineMaintenanceEaseScore: 5,

    weedControlEaseScore: 3,

    wildlifeProtectionEaseScore: 4,

    harvestEaseScore: 5,

    freshForageProcessingEaseScore: 5,

    pastureManagementEaseScore: 3,

    storageMonitoringEaseScore: 5,

    perennialMaintenanceEaseScore: 5,

    physicalAccessibilityScore: 5,

    heavyLiftingRiskScore: 1,

    weeklyLaborLevel:
      "very-low",

    peakWorkloadLevel:
      "moderate",

    harvestFrequencyCategory:
      "continuous",

    requiredPlantingTasks: [
      "prepare-seedbed",
      "broadcast-small-seed"
    ],

    optionalPlantingTasks: [
      "inoculate-legume-seed",
      "install-irrigation"
    ],

    requiredMaintenanceTasks: [
      "hand-weed"
    ],

    optionalMaintenanceTasks: [
      "protect-from-wildlife"
    ],

    requiredHarvestTasks: [
      "cut-leaves"
    ],

    usePathProcessingTasks: {
      rotationalLivingForage: [],

      protectedForageFrame: [],

      freshCutAndCarry: [
        "cut-leaves"
      ]
    },

    requiredStorageTasks: [],

    specializedEquipmentRequired: [],

    specializedEquipmentHelpful: [
      "forage-frame",
      "fencing",
      "hand-pruners",
      "basket",
      "drip-irrigation"
    ],

    suitableForLowTimeUsersScore: 5,

    suitableForSoloGrowersScore: 5,

    directFacts: {
      seedSize:
        "very-small",

      directSeedingSuitable: true,

      specializedHarvestEquipmentRequiredForBackyardScale:
        false,

      majorLaborBottlenecks: [
        "Preparing seed-to-soil contact for very small seed",
        "Maintaining surface moisture during establishment",
        "Controlling weeds before the stand closes",
        "Protecting seedlings from chickens",
        "Managing grazing rotations",
        "Preventing unwanted spread into neighboring beds"
      ],

      notes: [
        "White Clover seed is small and should not be planted deeply.",
        "Successful establishment depends on seed-to-soil contact and moisture near the surface.",
        "Once established, the crop requires little routine labor.",
        "The most important ongoing management task is controlling flock access so plants can recover.",
        "Fresh cut-and-carry forage requires only simple hand harvesting.",
        "No specialized processing or storage equipment is needed for the main use paths."
      ]
    }
  },

  cost: {
    seedOrPlantCostLevel:
      "low",

    soilPreparationCostLevel:
      "low",

    irrigationCostLevel:
      "low",

    protectionCostLevel:
      "moderate",

    processingEquipmentCostLevel:
      "very-low",

    storageCostLevel:
      "very-low",

    annualRecurringCostLevel:
      "very-low",

    longTermValueScore: 5,

    lowestCostUsePath:
      "rotational-living-forage",

    highestCostUsePath:
      "protected-forage-frame",

    likelyCostDrivers: [
      "Clover-group inoculant",
      "Irrigation during establishment",
      "Forage-frame construction",
      "Temporary fencing",
      "Seedbed preparation",
      "Reseeding damaged areas"
    ],

    costReductionOptions: [
      "Overseed an existing suitable lawn or pasture.",
      "Use rotational access rather than building multiple permanent protected beds.",
      "Use existing poultry fencing to divide recovery areas.",
      "Start with a small trial section.",
      "Maintain soil fertility and pH to improve stand persistence."
    ],

    directFacts: {
      specializedPlantingEquipmentRequired:
        false,

      specializedBackyardHarvestEquipmentRequired:
        false,

      specializedProcessingEquipmentRequired:
        false,

      notes: [
        "White Clover seed is generally inexpensive relative to establishing trees or large annual grain plots.",
        "The crop can provide value for multiple years when the stand persists.",
        "Protection and establishment failures are more likely to drive cost than harvesting equipment.",
        "The main products are consumed fresh, so drying and storage costs are minimal.",
        "Cost classifications are qualitative rather than current retail-price estimates."
      ]
    }
  },

  goals: {
    feedReductionScore: 3,

    energyProductionScore: 1,

    proteinOrientedScore: 4,

    freshGreensScore: 5,

    livingForageScore: 5,

    winterStorageScore: 1,

    enrichmentScore: 5,

    resilienceScore: 4,

    soilImprovementScore: 5,

    nitrogenFixationScore: 5,

    groundCoverScore: 5,

    erosionControlScore: 5,

    shadeScore: 1,

    privacyScreeningScore: 1,

    pollinatorSupportScore: 5,

    compostBiomassScore: 3,

    householdFoodScore: 1,

    seedSavingScore: 2,

    selfRelianceScore: 5,

    multipurposeValueScore: 5,

    visualAppealScore: 4,

    productionReliabilityScore: 4,

    fastestValueScore: 3,

    nonElectricStorageScore: 1,

    smallFlockValueScore: 5,

    largeFlockValueScore: 5,

    primaryGoalMatches: [
      "living-forage",
      "fresh-greens",
      "soil-improvement",
      "nitrogen-fixation",
      "ground-cover",
      "erosion-control",
      "pollinators",
      "enrichment",
      "self-reliance",
      "use-unused-space"
    ],

    weakGoalMatches: [
      "high-energy",
      "winter-storage",
      "dry-grain",
      "whole-produce",
      "privacy-screening",
      "large-household-food-harvest"
    ],

    directFacts: {
      nitrogenFixingLegume: true,

      perennialGroundCover:
        true,

      repeatedGrazingPotential:
        true,

      pollinatorBenefit: true,

      lawnIntegrationPotential:
        true,

      orchardIntegrationPotential:
        true,

      notes: [
        "White Clover is among the strongest living-forage and soil-building crops in the initial planner database.",
        "Its perennial habit can reduce yearly replanting.",
        "Nitrogen fixation can support companion grasses and future crops.",
        "Flowering stands provide valuable bee forage.",
        "The crop provides ground cover and erosion protection.",
        "Its best feed value comes from repeated fresh grazing or cutting rather than storage.",
        "It is not an energy grain or a long-term stored feed.",
        "Persistence depends on moisture, soil fertility, competition, climate, and grazing management."
      ]
    }
  },

  risks: {
    wildlife: {
      wildBirds: 1,
      deer: 5,
      raccoons: 1,
      squirrels: 1,
      rabbits: 5,
      rodents: 2,
      groundhogs: 5
    },

    insectsRiskScore: 2,

    diseaseRiskScore: 3,

    lodgingRiskScore: 1,

    fieldMoldRiskScore: 2,

    dryingMoldRiskScore: 1,

    storageMoldRiskScore: 1,

    storedInsectRiskScore: 1,

    spoilageSpeedRiskScore: 4,

    invasivenessConcernRiskScore: 4,

    selfSeedingRiskScore: 4,

    fruitDropRiskScore: 1,

    cropFailureRiskScore: 3,

    stormDamageRiskScore: 1,

    shadingOtherCropsRiskScore: 2,

    overfeedingRiskScore: 2,

    treatedSeedRiskScore: 5,

    primaryRisks: [
      {
        id:
          "chicken-overgrazing-and-scratching",

        severity:
          "very-high",

        affectedStages: [
          "germination",
          "seedling",
          "stolon-establishment",
          "post-grazing-regrowth"
        ],

        mitigationOptions: [
          "Exclude chickens during establishment",
          "Use rotational paddocks",
          "Use forage frames",
          "Rest grazed sections",
          "Maintain multiple forage areas"
        ],

        note:
          "Even grazing-tolerant Clover can be destroyed when chickens continuously scratch, uproot, and graze the same small area."
      },

      {
        id:
          "summer-drought-decline",

        severity:
          "high",

        affectedStages: [
          "vegetative-growth",
          "flowering",
          "post-grazing-regrowth"
        ],

        mitigationOptions: [
          "Provide irrigation",
          "Use partial afternoon shade",
          "Reduce grazing during drought",
          "Maintain companion grasses",
          "Reseed damaged areas"
        ],

        note:
          "Shallow roots limit White Clover production and recovery during prolonged hot dry weather."
      },

      {
        id:
          "poor-seedling-establishment",

        severity:
          "high",

        affectedStages: [
          "germination",
          "seedling"
        ],

        mitigationOptions: [
          "Prepare a firm seedbed",
          "Plant shallowly",
          "Maintain seed-to-soil contact",
          "Keep the soil surface moist",
          "Control competing weeds",
          "Exclude poultry"
        ],

        note:
          "Tiny seed and small seedlings are vulnerable to drying, burial, weed competition, and poultry disturbance."
      },

      {
        id:
          "unwanted-spread",

        severity:
          "high",

        affectedStages: [
          "established-stand",
          "flowering",
          "seed-production"
        ],

        mitigationOptions: [
          "Use defined planting areas",
          "Mow boundaries",
          "Remove spreading stolons",
          "Avoid allowing excessive seed production",
          "Monitor neighboring beds"
        ],

        note:
          "Creeping stolons and seed can move White Clover into lawns, paths, and beds where it is not wanted."
      },

      {
        id:
          "bee-traffic-in-flowering-stands",

        severity:
          "moderate",

        affectedStages: [
          "flowering"
        ],

        mitigationOptions: [
          "Mow selected high-traffic areas",
          "Keep flowering sections away from barefoot play zones",
          "Use nonflowering access paths",
          "Avoid disturbing active pollinators"
        ],

        note:
          "White Clover flowers attract bees, creating a sting concern in heavily trafficked areas."
      },

      {
        id:
          "fresh-forage-spoilage",

        severity:
          "moderate",

        affectedStages: [
          "harvest",
          "feeding"
        ],

        mitigationOptions: [
          "Feed soon after cutting",
          "Avoid piling wet forage",
          "Discard slimy or moldy material",
          "Harvest only clean untreated plants"
        ],

        note:
          "Fresh cut Clover heats and deteriorates when left in dense wet piles."
      },

      {
        id:
          "chemically-treated-seed",

        severity:
          "very-high",

        affectedStages: [
          "planting",
          "feeding"
        ],

        mitigationOptions: [
          "Use untreated seed for poultry forage",
          "Keep treated seed separated and labeled"
        ],

        note:
          "Chemically treated planting seed must never be fed to chickens."
      }
    ],

    directFacts: {
      poultryOvergrazingConcern:
        true,

      shallowRootDroughtConcern:
        true,

      establishmentCompetitionConcern:
        true,

      unwantedSpreadConcern:
        true,

      pollinatorStingConcern:
        true,

      freshForageSpoilageConcern:
        true,

      notes: [
        "The largest backyard risk is usually stand destruction from excessive chicken pressure.",
        "White Clover’s ability to tolerate close grazing does not mean it tolerates unlimited scratching.",
        "Hot drought can sharply reduce forage production.",
        "Dense competing grass may suppress Clover when fertility or grazing management favors the grass.",
        "Fresh forage should be free from mold, manure contamination, roadside contamination, and pesticide residues not approved for the intended use.",
        "White Clover should not be confused with White Sweetclover, which is a different species with different growth and feed-safety considerations."
      ]
    }
  },

  seasonalRoles: {
    earlySpring: true,

    lateSpring: true,

    summer: true,

    lateSummer: true,

    fall: true,

    winterStorage: false,

    perennial: true,

    plantingWindows: [
      {
        id:
          "spring-establishment",

        trigger:
          "early-spring",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        soilCondition:
          "moist-firm-and-workable",

        method:
          "broadcast-small-seed",

        note:
          "Spring establishment can succeed where moisture remains dependable before summer heat."
      },

      {
        id:
          "late-summer-fall-establishment",

        trigger:
          "late-summer",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        soilCondition:
          "moist-with-time-to-root-before-winter",

        method:
          "broadcast-small-seed",

        note:
          "Late-summer or early-fall seeding may reduce summer weed pressure, but plants need enough time to establish before severe cold."
      },

      {
        id:
          "overseed-existing-turf",

        trigger:
          "cool-moist-growing-period",

        offsetWeeksMinimum: 0,
        offsetWeeksMaximum: null,

        method:
          "broadcast-small-seed",

        note:
          "Existing grass should be short and opened enough to provide seed-to-soil contact."
      }
    ],

    harvestWindows: [
      {
        id:
          "rotational-living-forage",

        trigger:
          "dense-established-stand",

        usePathId:
          "rotational-living-forage",

        note:
          "Allow controlled grazing, then remove chickens before the stand is stripped to exposed soil."
      },

      {
        id:
          "protected-forage-frame",

        trigger:
          "foliage-reaches-through-protection",

        usePathId:
          "protected-forage-frame",

        note:
          "Allow birds to reach leaves through the frame while roots, stolons, and crowns remain protected."
      },

      {
        id:
          "fresh-cut-and-carry",

        trigger:
          "healthy-vegetative-growth",

        usePathId:
          "fresh-cut-and-carry",

        note:
          "Cut clean healthy forage and offer it promptly without creating a wet compacted pile."
      }
    ],

    cropSequenceRoles: [
      "Perennial living forage",
      "Pasture-mixture legume",
      "Chicken-run forage-frame crop",
      "Orchard-floor ground cover",
      "Nitrogen-fixing lawn component",
      "Pollinator-supporting ground cover"
    ],

    seasonalLimitations: [
      "Summer drought may reduce or stop growth",
      "Winter dormancy may eliminate fresh forage temporarily",
      "New seedlings cannot withstand chicken pressure",
      "Fresh forage cannot provide long-term winter storage"
    ],

    directFacts: {
      coolSeasonPerennial: true,

      springEstablishmentPossible:
        true,

      fallEstablishmentPossible:
        true,

      repeatedGrazingPossible:
        true,

      winterDormancyPossible:
        true,

      summerDormancyPossible:
        true,

      notes: [
        "White Clover can produce forage over multiple seasons where stands persist.",
        "Peak production commonly occurs during cool moist weather.",
        "Growth may slow during winter cold and summer drought.",
        "Rotational rest periods allow leaves and stolons to recover.",
        "The crop fills a living-forage role rather than a winter-storage role."
      ]
    }
  },

  usePaths: [
    {
      id:
        "rotational-living-forage",

      label:
        "Rotational White Clover Forage",

      description:
        "An established Clover or Clover-grass stand grazed by chickens for limited periods, followed by a recovery period without flock access.",

      primaryFeedRole:
        "living-forage",

      harvestProducts: [
        "living-forage",
        "fresh-greens",
        "pasture-forage"
      ],

      suitableFeedingMethods: [
        "living-grazing",
        "rotational-paddock",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [],

      optionalProcessingTasks: [],

      requiredEquipment: [],

      helpfulEquipment: [
        "fencing",
        "drip-irrigation"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "rotational",

      storageMethods: [
        "living-crop"
      ],

      preferredStorageMethod:
        "not-applicable",

      storageDurationCategory:
        "immediate",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: false,

      moldRiskScore: 1,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 4,

      householdFoodValueScore: 1,
      flockValueScore: 5,

      safetyWarnings: [
        "Do not allow chickens to remain until the stand is reduced to bare soil.",
        "Exclude birds during establishment and recovery.",
        "Do not use forage treated with chemicals unsuitable for poultry access.",
        "Living forage remains supplemental to complete poultry feed.",
        "Provide grit appropriate to the flock’s feeding system."
      ],

      incompatibleUserTraits: [
        "has-no-ground-access",
        "cannot-rotate-flock",
        "requires-long-term-storage",
        "requires-annual-reversibility"
      ]
    },

    {
      id:
        "protected-forage-frame",

      label:
        "Protected White Clover Forage Frame",

      description:
        "A low Clover stand protected beneath wire or another suitable forage frame so chickens can reach foliage while roots and stolons remain protected.",

      primaryFeedRole:
        "protected-living-forage",

      harvestProducts: [
        "living-forage",
        "fresh-greens"
      ],

      suitableFeedingMethods: [
        "forage-frame",
        "living-grazing",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [],

      optionalProcessingTasks: [],

      requiredEquipment: [
        "forage-frame"
      ],

      helpfulEquipment: [
        "fencing",
        "drip-irrigation"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "continuous",

      storageMethods: [
        "living-crop"
      ],

      preferredStorageMethod:
        "not-applicable",

      storageDurationCategory:
        "immediate",

      nonElectricStorageSuitable: true,

      refrigerationSuitable: false,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: false,

      moldRiskScore: 1,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 1,
      flockValueScore: 5,

      safetyWarnings: [
        "The frame must prevent chickens from reaching and scratching out crowns, stolons, and roots.",
        "Use secure wire and framing without sharp edges.",
        "Avoid manure accumulation that smothers the stand.",
        "Living forage remains supplemental to balanced poultry feed."
      ],

      incompatibleUserTraits: [
        "declines-building-protection",
        "has-no-run-space",
        "requires-harvested-storage-feed"
      ]
    },

    {
      id:
        "fresh-cut-and-carry",

      label:
        "Fresh Cut-and-Carry White Clover",

      description:
        "Clean healthy Clover foliage harvested from outside the chicken area and offered promptly as a fresh supplemental green.",

      primaryFeedRole:
        "fresh-green-protein-oriented",

      harvestProducts: [
        "fresh-greens",
        "fresh-forage"
      ],

      suitableFeedingMethods: [
        "cut-and-carry",
        "fresh-supplement",
        "seasonal-enrichment"
      ],

      requiredProcessingTasks: [
        "cut-leaves"
      ],

      optionalProcessingTasks: [
        "chop"
      ],

      requiredEquipment: [],

      helpfulEquipment: [
        "hand-pruners",
        "basket"
      ],

      harvestPattern:
        "continuous",

      harvestFrequencyCategory:
        "several-weekly",

      storageMethods: [
        "short-term-fresh"
      ],

      preferredStorageMethod:
        "feed-soon-after-harvest",

      storageDurationCategory:
        "very-short",

      nonElectricStorageSuitable: false,

      refrigerationSuitable: true,
      freezingSuitable: false,

      dryingRequired: false,
      curingRequired: false,
      shellingRequired: false,
      threshingRequired: false,
      cookingRequired: false,
      grindingRequired: false,

      moistureSensitive: true,

      moldRiskScore: 2,
      rodentRiskScore: 1,
      storedInsectRiskScore: 1,

      harvestEaseScore: 5,
      preparationEaseScore: 5,
      beginnerSuitabilityScore: 5,

      householdFoodValueScore: 1,
      flockValueScore: 4,

      safetyWarnings: [
        "Harvest only clean healthy Clover from an untreated and uncontaminated area.",
        "Do not feed moldy, slimy, fermented, manure-contaminated, or roadside forage.",
        "Avoid leaving fresh wet Clover in a compacted pile.",
        "Introduce fresh forage gradually.",
        "Fresh Clover remains supplemental to a complete poultry ration."
      ],

      incompatibleUserTraits: [
        "requires-long-term-storage",
        "has-no-time-for-fresh-harvest",
        "wants-dry-grain-only"
      ]
    }
  ],

  dataQuality: {
    overallConfidence:
      0.79,

    verifiedFields: [
      "identity",
      "lifecycle",
      "climate.directFacts.seasonType",
      "climate.directFacts.stoloniferousPerennial",
      "site.directFacts.preferredLight",
      "site.directFacts.growthHabit",
      "soil.directFacts.nitrogenFixingLegume",
      "soil.directFacts.inoculationMayImproveNodulation",
      "soil.directFacts.shallowRooted",
      "water.directFacts.establishmentMoistureImportant",
      "water.directFacts.shallowRootsIncreaseDroughtRisk",
      "space.directFacts.mixedPastureSuitable",
      "space.directFacts.lawnOverseedingSuitable",
      "space.directFacts.forageFrameSuitable",
      "space.directFacts.rotationalPaddockSuitable",
      "flock.directFacts.edibleFeedParts",
      "flock.directFacts.nutritionalOrientation",
      "risks.directFacts.poultryOvergrazingConcern",
      "risks.directFacts.shallowRootDroughtConcern",
      "risks.directFacts.unwantedSpreadConcern",
      "seasonalRoles.directFacts.coolSeasonPerennial",
      "seasonalRoles.directFacts.repeatedGrazingPossible"
    ],

    derivedFields: [
      "climate.heatToleranceScore",
      "climate.droughtClimateToleranceScore",
      "climate.humidityToleranceScore",
      "climate.coolSummerToleranceScore",
      "climate.frostSensitivityScore",
      "site",
      "soil.textureScores",
      "soil.drainageRequirementScore",
      "water",
      "space.smallSpaceScore",
      "space.mediumSpaceScore",
      "space.largeSpaceScore",
      "space.layoutScores",
      "space.spaceTypeScores",
      "flock.flockPurposeScores",
      "flock.feedingMethodScores",
      "flock.directRunSuitabilityScore",
      "flock.forageFrameSuitabilityScore",
      "flock.rotationalPaddockSuitabilityScore",
      "labor",
      "cost",
      "goals",
      "risks.wildlife",
      "usePaths.rotational-living-forage",
      "usePaths.protected-forage-frame",
      "usePaths.fresh-cut-and-carry"
    ],

    uncertainFields: [
      "lifecycle.expectedUsefulLifeYears",
      "climate.minimumFrostFreeDays",
      "climate.preferredFrostFreeDays",
      "climate.minimumSoilTemperatureF",
      "climate.preferredSoilTemperatureF",
      "soil.minimumSoilDepthIn",
      "soil.saltToleranceScore",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "space.minimumRaisedBedDepthIn",
      "flock.portionGuidance",
      "usePaths.rotational-living-forage.sustainableStockingPressure",
      "usePaths.protected-forage-frame.regrowthRate",
      "usePaths.fresh-cut-and-carry.exactStorageDuration"
    ],

    missingFields: [
      "lifecycle.expectedUsefulLifeYears",
      "space.minimumTrialAreaSqFt",
      "space.minimumUsefulAreaSqFt",
      "space.preferredProductionAreaSqFt",
      "space.minimumContainerGallons",
      "flock.portionGuidance",
      "flock.usePathTesting"
    ],

    lastReviewed:
      "2026-07-15",

    primarySources: [
      {
        title:
          "Plant Guide for White Clover (Trifolium repens)",

        organization:
          "USDA Natural Resources Conservation Service",

        sourceType:
          "government-plant-guide",

        use:
          "Botany, perennial growth, stolons, forage value, soil adaptation, nitrogen fixation, erosion control, wildlife use, establishment, and management"
      },

      {
        title:
          "White Clover Establishment and Management Guide",

        organization:
          "University of Georgia Cooperative Extension",

        sourceType:
          "extension-forage-guide",

        use:
          "Southern adaptation, soil fertility, inoculation, establishment, grazing, drought limitations, and stand persistence"
      },

      {
        title:
          "Growing White Clover",

        organization:
          "University of Kentucky Cooperative Extension",

        sourceType:
          "extension-forage-guide",

        use:
          "Variety types, pasture establishment, fertility, grazing tolerance, mixtures, persistence, and forage management"
      },

      {
        title:
          "White Clover Forage Management",

        organization:
          "Penn State Extension",

        sourceType:
          "extension-forage-guide",

        use:
          "Temperate adaptation, pasture mixtures, grazing behavior, forage quality, soil conditions, and stand management"
      }
    ],

    notes: [
      "White Clover plannerData is specific to Trifolium repens and must not be applied to White Sweetclover, Red Clover, Crimson Clover, Subterranean Clover, or other species.",
      "The record treats White Clover primarily as living forage rather than harvested dry feed.",
      "The three planner use paths are rotational grazing, protected forage-frame access, and fresh cut-and-carry forage.",
      "No exact sustainable chicken stocking density has been assigned because flock pressure depends on stand area, soil moisture, plant density, rotation length, and scratching behavior.",
      "No exact flock feeding portion has been assigned.",
      "The record does not make medicinal claims.",
      "The crop should remain in testing until perennial forage, rotational grazing, forage-frame, partial-shade, lawn-conversion, and drought-stress profiles are evaluated."
    ]
  }
  }
}, 


    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - ALFALFA
    //
    //
    //
    //
    //////////////////////////////////////////////

    "CROP-ALFALFA": {
    id: "CROP-ALFALFA",

    name: "Alfalfa",
    scientificName: "Medicago sativa",

    category: "Perennial Protein-Oriented Forage Legume",
    cropType: "Perennial",
    seasonType: "Cool Season",

    status: "Initial Research Complete",

    summary:
      "Alfalfa is a deep-rooted perennial forage legume valued for high-quality leafy biomass, moderate-to-high protein, carotenoid pigments, calcium, repeated harvests, drought tolerance after establishment, and nitrogen fixation. It can provide useful poultry forage and dried leaf material, but its fiber content and demanding establishment requirements make it a supplement rather than a complete chicken feed.",

    chickenUse: {
      edibleParts: [
        "Fresh leaves",
        "Tender stems",
        "Young shoots",
        "Flowers",
        "Dried leaves",
        "Dehydrated alfalfa meal",
        "Sprouted seed produced under sanitary conditions"
      ],

      primaryValue: [
        "Protein-oriented forage",
        "Carotenoid pigments",
        "Leafy enrichment",
        "Calcium and minerals",
        "Repeated harvests",
        "Perennial biomass production",
        "Nitrogen fixation"
      ],

      feedingForms: [
        "Managed grazing of established plants",
        "Freshly cut tender leaves and stems",
        "Dried and crumbled leaves",
        "Small amounts of homemade alfalfa meal",
        "Commercial dehydrated alfalfa meal",
        "Alfalfa leaf concentrate in professionally formulated feeds"
      ],

      bestFor: [
        "Adult chickens as supplemental forage",
        "Rotational poultry pastures",
        "Cut-and-carry forage systems",
        "Owners wanting a perennial protein-oriented crop",
        "Dry climates with suitable irrigation during establishment",
        "Gardens with deep, well-drained soil",
        "Providing carotenoid-rich green plant material"
      ],

      supplementOnly: true,

      preparationNotes:
        "Allow plants to establish strong crowns and roots before cutting or grazing. Harvest tender leafy growth before stems become excessively mature and fibrous. Freshly cut forage should be offered promptly. Material intended for drying should be dried rapidly and thoroughly before storage.",

      safetyNotes:
        "Alfalfa should supplement rather than replace a complete poultry ration. Mature stems are highly fibrous, and large amounts may reduce energy intake or dilute amino acids, vitamins, minerals, and calcium supplied by formulated feed. Avoid moldy, dusty, fermented, spoiled, chemically contaminated, or improperly stored hay and meal. Poultry-specific guidance for homegrown alfalfa inclusion remains limited."
    },

    nutrition: {
      basis:
        "Approximate values for alfalfa forage and dehydrated meal, generally expressed on a dry-matter basis. Composition changes substantially with plant maturity, leaf-to-stem ratio, harvest timing, drying method, cultivar, soil fertility, and storage.",

      dryMatterPercent:
        "Fresh alfalfa contains substantial moisture; dry-matter percentage varies by growth stage and field conditions",

      crudeProteinPercent:
        "Commonly approximately 15% to 25% of dry matter, with leafy, less-mature material generally higher than mature stemmy forage",

      fatPercent:
        "Generally low, often approximately 2% to 4% of dry matter",

      fiberPercent:
        "Highly variable; fiber increases as the crop matures and the stem proportion rises",

      calciumPercent:
        "Relatively high for forage, commonly around 1% to 2% of dry matter depending on maturity and analysis",

      phosphorusPercent:
        "Generally much lower than calcium and often roughly 0.2% to 0.4% of dry matter",

      notableNutrients: [
        "Crude protein",
        "Beta-carotene",
        "Lutein and other xanthophyll pigments",
        "Vitamin K",
        "Vitamin E",
        "Calcium",
        "Potassium",
        "Magnesium",
        "Iron",
        "Folate",
        "Alpha-linolenic acid",
        "Leaf-derived amino acids"
      ],

      limitations: [
        "Fiber rises as stems mature and reduces usefulness to poultry",
        "Crude protein does not guarantee a complete poultry amino-acid balance",
        "Fresh weight greatly overstates nutrient contribution because fresh forage contains considerable water",
        "Alfalfa is relatively low in concentrated dietary energy compared with grain",
        "High calcium does not automatically make it suitable as a complete layer ration",
        "Fresh forage, hay, leaf meal, pellets, sprouts, and leaf concentrate have different compositions",
        "Saponins and other plant compounds may reduce palatability or nutrient use at high inclusion levels",
        "Large quantities can dilute the nutrient density of complete poultry feed",
        "Protein and carotenoid quality decline with excessive maturity, weathering, poor drying, or long storage"
      ]
    },

    growing: {
      sunlight:
        "Full sun; approximately 6 to 8 or more hours of direct sunlight daily",

      soilTemperatureMinimumF:
        "Approximately 40°F to 45°F for germination, although warmer soil generally improves establishment speed",

      idealSoilTemperatureF:
        "Approximately 60°F to 75°F for strong establishment and vegetative growth",

      frostTolerance:
        "Moderate to High after establishment, depending on cultivar dormancy rating, crown health, snow cover, and winter conditions",

      heatTolerance:
        "Moderate to High when adapted cultivars are used",

      droughtTolerance:
        "High after a deep root system is established, although yield declines under prolonged moisture stress",

      soilPHMinimum: 6.5,
      soilPHMaximum: 7.5,

      waterNeeds:
        "Moderate to High for maximum production. Established plants are drought tolerant, but repeated high yields require dependable soil moisture or irrigation.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum:
        "Approximately 60 to 90 days under favorable establishment conditions",

      daysToFirstHarvestMaximum: null,

      daysToMaturityMinimum: null,
      daysToMaturityMaximum: null,

      plantSpacingInches:
        "Usually broadcast or drilled as a dense forage stand rather than planted as individually spaced plants",

      rowSpacingInches:
        "Commonly planted in closely spaced drilled rows; exact spacing depends on equipment and management system",

      plantingDepthInches:
        "Approximately 1/4 to 1/2 inch on fine-textured soils and no deeper than about 1/2 to 3/4 inch on lighter soils",

      successionPlanting: false,

      regrowthAfterHarvest:
        "Yes. New shoots emerge from the crown after cutting when adequate leaf area, root reserves, moisture, and recovery time are maintained.",

      establishmentNotes:
        "Alfalfa requires a firm, weed-controlled seedbed, shallow planting, suitable soil pH, adequate phosphorus and potassium, and proper Rhizobium inoculation where compatible bacteria are absent. Poorly drained or persistently wet soil greatly reduces stand survival."
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Plant in spring after soils become workable or during late summer early enough to allow approximately six weeks or more of growth before a hard freeze. Select winter-hardy dormant cultivars.",
        harvestWindow:
          "Late spring through early fall. Final cutting timing should allow adequate root-reserve recovery before winter."
      },

      midwestNortheast: {
        plantingWindow:
          "Spring establishment is common from early to mid-spring. Late-summer establishment may work where moisture is dependable and sufficient growing time remains before freezing.",
        harvestWindow:
          "Late spring through fall, often with multiple cuttings depending on rainfall and stand maturity."
      },

      upperSouth: {
        plantingWindow:
          "Plant in late summer or early fall where winters are mild enough for establishment, or plant during early spring. Use cultivars adapted to the transition zone.",
        harvestWindow:
          "Spring through fall, with reduced growth during extreme summer heat or drought."
      },

      deepSouth: {
        plantingWindow:
          "Plant primarily during fall or cool-season establishment periods using low-dormancy, disease-resistant cultivars suited to Southern conditions.",
        harvestWindow:
          "Late winter through fall where stands survive heat, humidity, insects, and disease."
      },

      southwest: {
        plantingWindow:
          "Plant during late summer, fall, or spring depending on elevation, frost pattern, and irrigation availability.",
        harvestWindow:
          "Multiple harvests may be possible across much of the growing season under irrigation."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant during spring or late summer when soil moisture supports establishment. Select cultivars appropriate to winter severity and drainage.",
        harvestWindow:
          "Late spring through early fall, with several cuttings possible in productive locations."
      },

      coastalWest: {
        plantingWindow:
          "Plant during mild spring or fall conditions. Irrigation is commonly necessary through dry summers.",
        harvestWindow:
          "Extended harvest seasons are possible in mild climates, depending on irrigation and cultivar dormancy."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      seedingRatePureStand:
        "Commercial recommendations commonly fall near approximately 12 to 20 pounds of seed per acre, depending on region, seed quality, planting method, and field conditions",

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      commercialForageYield:
        "Commercial dry-matter yields frequently range around several tons per acre annually, with large variation by climate, irrigation, stand age, harvest frequency, and soil fertility",

      storageLife:
        "Properly dried alfalfa hay or leaf meal may store for several months when protected from moisture, sunlight, insects, rodents, and excessive heat",

      storageMethod:
        "Dry harvested material rapidly with good airflow while preserving as many leaves as possible. Store only fully dried forage in a cool, dark, dry, pest-resistant location. Discard material that smells musty, heats in storage, becomes damp, or develops visible mold.",

      yieldNotes:
        "Plants-per-area values remain null because alfalfa is established by seeding rate rather than permanent individual plant spacing. Stand density changes naturally over the life of the planting as seedlings compete, weaker plants die, and surviving crowns enlarge. Productive mature stands may contain far fewer plants than newly established seedings while maintaining excellent forage production. Yield is influenced more by crown health, stem density, harvest frequency, fertility, irrigation, and stand age than by counting individual plants. A future feed-garden calculator should estimate production from seeding rate and forage biomass rather than mature plants per square foot."

    },

    economics: {
      seedCostEstimate:
        "Moderate compared with many annual garden crops because high-quality named forage seed, inoculant, and soil preparation may be required",

      equipmentCostEstimate:
        "Moderate. Costs may include soil testing, lime, phosphorus, potassium, inoculant, irrigation, mowing or cutting tools, drying racks, storage containers, and rotational fencing.",

      irrigationCostLevel:
        "Low to Moderate in humid regions; Moderate to High in arid climates",

      laborLevel:
        "Moderate to High when repeatedly cut, dried, leaf-separated, stored, and protected from poultry damage",

      potentialFeedSavings: null,

      economicNotes:
        "Alfalfa may provide economic value through perennial regrowth, nitrogen fixation, soil improvement, repeated leafy harvests, and reduced need to purchase dried greens or alfalfa meal. Direct savings depend on stand establishment cost, dry-matter yield, harvest labor, storage loss, and how little complete feed the forage safely displaces."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for agronomic production, forage composition, soil requirements, repeated harvest, and use of dehydrated alfalfa in commercial animal feeds; moderate for poultry pigmentation and formulated-feed applications; limited for homegrown alfalfa intake and feed replacement in backyard laying hens",

      sources: [
        {
          title:
            "Alfalfa Management Guide",
          organization:
            "University Extension forage specialists",
          url:
            "https://www.alfalfa.org/pdf/AlfalfaManagementGuide.pdf",
          use:
            "Soil pH, fertility, seeding, establishment, cutting, persistence, pest management, and harvest practices"
        },

        {
          title:
            "Alfalfa Establishment",
          organization:
            "University of Minnesota Extension",
          url:
            "https://extension.umn.edu/planting-forages/alfalfa-establishment",
          use:
            "Seedbed preparation, planting depth, planting dates, inoculation, seeding rate, weed control, and establishment management"
        },

        {
          title:
            "Alfalfa",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/275",
          use:
            "Fresh forage, hay, dehydrated meal, nutrient composition, fiber, minerals, carotenoids, poultry use, and variability with maturity"
        },

        {
          title:
            "Alfalfa Meal in Poultry Diets",
          organization:
            "National Cooperative Extension Poultry Resource",
          url:
            "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/alfalfa-meal-in-poultry-diets/",
          use:
            "Use of alfalfa meal as a protein, vitamin, mineral, fiber, and pigmentation ingredient in poultry diets"
        },

        {
          title:
            "Pasture Intake and Egg Composition of Laying Hens",
          organization:
            "Pennsylvania State University poultry research",
          url:
            "https://doi.org/10.1017/S1751731109991644",
          use:
            "Research involving laying hens with access to alfalfa, clover, and grass pastures while receiving complete feed"
        },

        {
          title:
            "Alfalfa for Dairy Cattle",
          organization:
            "University Cooperative Extension",
          url:
            "https://www.uaex.uada.edu/publications/pdf/FSA-4000.pdf",
          use:
            "Forage quality, maturity, protein, fiber, calcium, harvest timing, and storage-loss principles"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Determine whether a separate alfalfa-meal ingredient record is needed in addition to the living-crop record.",
        "Find current poultry-feed tables for dehydrated alfalfa meal, leaf meal, and leaf-protein concentrate.",
        "Do not apply commercial formulated-feed inclusion rates directly to free-choice backyard supplementation.",
        "Research the maximum practical forage intake of laying hens on established alfalfa pasture.",
        "Separate leaf nutrition from whole-plant hay and mature stem nutrition.",
        "Research saponin concentrations and poultry effects by cultivar and maturity stage.",
        "Measure leaf-to-stem ratio at common backyard harvest stages.",
        "Find realistic small-plot dry-matter yield per 100 square feet.",
        "Compare direct grazing, cut-and-carry forage, dried leaves, pellets, and sprouts.",
        "Research safe and sanitary alfalfa-sprout production because sprouts can carry foodborne pathogens.",
        "Assess stand survival under chicken scratching, compaction, and concentrated manure.",
        "Compare protected forage frames with rotational pasture systems.",
        "Identify cultivars adapted to the cold North, transition zone, humid South, and arid West.",
        "Calculate scores only after multiple perennial forage crops have comparable data.",
        "Plant-density fields remain null because productive alfalfa stands are managed by seeding rate and stand density rather than permanent individual plant counts, which naturally decline as crowns mature."

       ]
    },

    plannerData: {
      schemaVersion:
        "1.0.0",

      developmentStatus:
        "ready",

      identity: {
        plannerName:
          "Alfalfa",

        shortLabel:
          "Alfalfa",

        icon:
          "🌿",

        cropCategory:
          "perennial-legume",

        primaryFeedCategory:
          "protein-oriented-forage",

        guideUrl:
          "growing-alfalfa-for-chickens.html"
      },

      lifecycle: {
        growthCycle:
          "perennial",

        isAnnual: false,
        isBiennial: false,
        isPerennial: true,
        isTreeOrShrub: false,

        yearsToFirstUsefulHarvest: 0,

        yearsToFullProduction: 1,

        expectedUsefulLifeYears:
          null,

        regrowsAfterHarvest: true,

        permanentPlantingRequired: true,

        reversibleAfterOneSeason: false
      },

      climate: {
        suitableClimateTypes: [
          "cold-short-summer",
          "cool-moderate-summer",
          "temperate",
          "hot-dry",
          "mild-winter",
          "high-elevation"
        ],

        preferredClimateTypes: [
          "cool-moderate-summer",
          "temperate",
          "hot-dry"
        ],

        challengingClimateTypes: [
          "hot-humid"
        ],

        minimumFrostFreeDays:
          null,

        preferredFrostFreeDays:
          null,

        minimumSoilTemperatureF:
          null,

        preferredSoilTemperatureF:
          null,

        daysToMaturityMinimum:
          null,

        daysToMaturityMaximum:
          null,

        dryDownBufferDays:
          null,

        heatToleranceScore: 4,

        droughtClimateToleranceScore: 5,

        humidityToleranceScore: 2,

        coolSummerToleranceScore: 5,

        frostSensitivityScore: 2,

        winterHardinessRequired: true,

        seasonExtensionBenefits: [
          "Spring establishment can provide time for root and crown development before winter.",
          "Late-summer establishment may reduce weed pressure where sufficient rooting time remains before hard freezing.",
          "Temporary irrigation can improve establishment during dry weather.",
          "Protected drying space may be more valuable than season-extension structures in humid climates."
        ],

        indoorSeedStartingBenefitScore: 1,

        directFacts: {
          seasonType:
            "cool-season-perennial",

          frostSensitive: false,

          commonlyDirectSeeded: true,

          winterDormancyPossible:
            true,

          summerGrowthPossible:
            true,

          deepRootedPerennial:
            true,

          establishmentTimingHighlyRegional:
            true,

          notes: [
            "Alfalfa is a perennial cool-season forage legume.",
            "Established plants develop deep taproots that improve access to stored soil moisture.",
            "Growth begins from a persistent crown after winter dormancy or cutting.",
            "Winter survival varies by variety, fall dormancy rating, soil drainage, cutting management, and region.",
            "Hot dry climates can support Alfalfa where irrigation or stored soil moisture is available.",
            "Hot humid climates may increase disease, drying, and stand-persistence challenges.",
            "Exact planting windows should follow regional forage guidance.",
            "Days-to-maturity are not used because Alfalfa is harvested repeatedly as forage rather than grown for one mature seed harvest."
          ]
        }
      },

      site: {
        absoluteMinimumSunHours: 5,

        productiveMinimumSunHours: 6,

        preferredSunHours: 8,

        shadeToleranceScore: 2,

        afternoonShadeBenefitInHeat: 2,

        windToleranceScore: 5,

        lodgingRiskScore: 2,

        reflectedHeatToleranceScore: 4,

        airflowRequirementScore: 5,

        frostPocketSensitivityScore: 2,

        treeRootCompetitionToleranceScore: 2,

        hardscapeConflictRiskScore: 2,

        structureConflictRiskScore: 2,

        utilityConflictRiskScore: 2,

        fruitDropMessRiskScore: 1,

        stainingRiskScore: 1,

        directFacts: {
          preferredLight:
            "full-sun",

          productiveSunGuidance:
            "At least 6 hours of direct sunlight, with approximately 8 hours preferred for strong forage production, crown development, and drying.",

          windExposureConcern:
            false,

          growthHabit:
            "upright-multistemmed-crown-forming",

          matureHeightFtMinimum: 1,

          matureHeightFtMaximum: 3,

          floweringPollinatorTraffic:
            true,

          notes: [
            "Alfalfa performs best in full sun.",
            "Shade reduces stem density, root reserves, stand persistence, and forage production.",
            "Good airflow helps foliage dry after rain and supports hay or dried-forage production.",
            "The plant is shorter than Corn, Sorghum, Sunflower, and Mulberry and creates relatively few structural conflicts.",
            "Established tree roots can compete strongly for light, water, and nutrients.",
            "Flowering Alfalfa can attract bees and other pollinating insects."
          ]
        }
      },

      soil: {
        textureScores: {
          heavyClay: 2,
          clayLoam: 4,
          loam: 5,
          sandyLoam: 5,
          verySandy: 3,
          rocky: 2
        },

        drainageRequirementScore: 5,

        temporaryWetToleranceScore: 1,

        waterloggingSensitivityScore: 5,

        minimumSoilDepthIn:
          null,

        preferredSoilDepthIn: 36,

        compactionToleranceScore: 1,

        establishmentInSodDifficultyScore: 5,

        preferredPHMinimum: 6.5,

        preferredPHMaximum: 7.5,

        survivalPHMinimum:
          null,

        survivalPHMaximum:
          null,

        fertilityRequirementScore: 4,

        nitrogenRequirementScore: 1,

        phosphorusRequirementScore: 5,

        potassiumRequirementScore: 5,

        benefitsFromInoculation: true,

        inoculantType:
          "Alfalfa-group Rhizobium inoculant compatible with Medicago sativa",

        saltToleranceScore: 2,

        amendmentEffortScore: 4,

        directFacts: {
          preferredDrainage:
            "deep-and-well-drained",

          preferredTextures: [
            "loam",
            "sandy loam",
            "well-drained clay loam"
          ],

          nitrogenFixingLegume:
            true,

          inoculationMayImproveNodulation:
            true,

          deepTaprooted:
            true,

          waterloggedSoilSuitable:
            false,

          acidicSoilConcern:
            true,

          notes: [
            "Deep, well-drained soil is one of the most important Alfalfa requirements.",
            "Prolonged saturation can damage roots and crowns and shorten stand life.",
            "Compaction, shallow rock, hardpan, and poor drainage restrict taproot development.",
            "Productive stands generally need soil near neutral pH.",
            "Lime may need to be applied well before seeding where soil is too acidic.",
            "Alfalfa can fix atmospheric nitrogen when compatible rhizobia and suitable soil conditions are present.",
            "Alfalfa-group inoculant may improve nodulation where compatible bacteria are absent.",
            "Nitrogen fertilizer is generally unnecessary for a well-nodulated stand.",
            "Phosphorus, potassium, sulfur, boron, and other nutrient deficiencies may still reduce production and persistence.",
            "The stored pH range represents a productive planning range rather than absolute survival limits."
          ]
        }
      },

      water: {
        overallWaterRequirementLevel:
          "moderate",

        germinationWaterNeedLevel:
          "high",

        establishmentWaterNeedLevel:
          "high",

        matureWaterNeedLevel:
          "moderate",

        floweringWaterNeedLevel:
          "moderate",

        harvestDevelopmentWaterNeedLevel:
          "moderate",

        droughtSurvivalScore: 5,

        droughtYieldRetentionScore: 4,

        criticalGrowthStages: [
          "germination",
          "seedling-establishment",
          "crown-establishment",
          "post-cutting-regrowth",
          "summer-production"
        ],

        criticalStageWaterImportanceScore: 5,

        overwateringSensitivityScore: 4,

        waterloggingSensitivityScore: 5,

        dripIrrigationBenefitScore: 4,

        mulchBenefitScore: 1,

        suitableForRainfallOnlyScore: 4,

        suitableForLimitedIrrigationScore: 4,

        containerDryingRiskScore: 5,

        establishmentYearsRequiringExtraWater: 1,

        directFacts: {
          establishmentMoistureImportant:
            true,

          deepRootsImproveDroughtSurvival:
            true,

          postCuttingMoistureImportant:
            true,

          standingWaterSuitable:
            false,

          irrigationCanIncreaseProduction:
            true,

          notes: [
            "Small seed and young seedlings require dependable surface moisture during establishment.",
            "Deep established roots improve drought survival and access to stored soil moisture.",
            "Drought survival does not guarantee maximum forage production.",
            "Moisture supports rapid regrowth after cutting or grazing.",
            "Supplemental irrigation can increase forage production in dry climates.",
            "Alfalfa is poorly suited to prolonged saturated soil or standing water.",
            "Frequent shallow irrigation may encourage weaker surface rooting and disease where drainage is poor."
          ]
        }
      },

      space: {
        minimumTrialAreaSqFt:
          null,

        minimumUsefulAreaSqFt:
          null,

        preferredProductionAreaSqFt:
          null,

        smallSpaceScore: 3,

        mediumSpaceScore: 5,

        largeSpaceScore: 5,

        layoutScores: {
          squareBlock: 5,
          wideRectangle: 5,
          longStrip: 5,
          irregular: 4,
          smallBeds: 3,
          openField: 5
        },

        spaceTypeScores: {
          inGround: 5,
          raisedBed: 2,
          container: 1,
          fenceLine: 4,
          buildingEdge: 3,
          unusedLawn: 4,
          openField: 5,
          orchard: 3,
          forageFrame: 3,
          rotationalPaddock: 5,
          greenhouse: 1,
          hedgerow: 3
        },

        minimumContainerGallons:
          null,

        containerUseLimitation:
          "Alfalfa can grow temporarily in deep containers, but restricted rooting volume, rapid drying, and limited harvest make containers inefficient for meaningful flock forage.",

        minimumRaisedBedDepthIn:
          null,

        vineSpreadRequired: false,

        verticalSupportBenefitScore: 1,

        blockPlantingRequired: false,

        minimumBlockRows:
          null,

        continuousStandPreferred: true,

        heightCategory:
          "low-medium",

        matureWidthCategory:
          "upright-dense-stand",

        overflowSpaceBenefitScore: 3,

        directFacts: {
          denseStandSuitable:
            true,

          mixedPastureSuitable:
            true,

          rotationalPaddockSuitable:
            true,

          cutAndCarryPlotSuitable:
            true,

          forageFrameSuitable:
            "limited",

          containerFeedProductionEfficient:
            false,

          notes: [
            "Alfalfa is most useful as a dense perennial forage stand rather than isolated plants.",
            "Medium and large plots produce more useful cut-and-carry forage than small decorative beds.",
            "Rotational paddocks and dedicated harvest plots are strong uses.",
            "A protected forage frame can preserve crowns, but upright stems may be less accessible through low wire than White Clover or Kale.",
            "Containers and shallow raised beds restrict the deep taproot.",
            "Alfalfa does not spread through creeping stolons like White Clover.",
            "Minimum useful area remains null until backyard yield and flock-demand relationships are tested."
          ]
        }
      },

      flock: {
        suitableForAdultChickens: true,

        suitableForYoungChicks: false,

        flockPurposeScores: {
          eggs: 5,
          meat: 4,
          breeding: 4,
          petsEnrichment: 4,
          homestead: 5,
          mixed: 5
        },

        feedingMethodScores: {
          livingGrazing: 4,
          cutAndCarry: 5,
          wholeProduce: 1,
          wholeSeedHeads: 1,
          wholeGrain: 1,
          processedGrain: 1,
          heatTreated: 1,
          driedForage: 5,
          winterStorage: 4
        },

        directRunSuitabilityScore: 2,

        forageFrameSuitabilityScore: 3,

        rotationalPaddockSuitabilityScore: 5,

        confinedFlockValueScore: 5,

        pasturedFlockValueScore: 5,

        treatDilutionRiskScore: 3,

        highEnergySupplement: false,

        highFiberSupplement: true,

        concentratedFatSource: false,

        primaryFlockUses: [
          "Fresh cut-and-carry forage",
          "Rotational living forage",
          "Dried leafy forage",
          "Protein-oriented green supplementation",
          "Carotenoid-rich supplemental forage",
          "Soil-building pasture diversity"
        ],

        unsuitablePrimaryUses: [
          "Complete-ration replacement",
          "High-energy grain supplementation",
          "Unrestricted permanent-run access",
          "Primary young-chick feed",
          "Whole dry grain storage"
        ],

        directFacts: {
          edibleFeedParts: [
            "Fresh leaves",
            "Tender stems",
            "Flowers",
            "Properly dried leafy forage"
          ],

          preferredBirdStage:
            "Established adult chickens",

          cropSurvivalWithDirectChickenAccess:
            "moderate-only-under-controlled-rotational-pressure",

          directAccessTiming:
            "Allow crowns and roots to establish before controlled access, and remove birds before repeated scratching destroys crowns or exposes soil.",

          nutritionalOrientation: [
            "protein-oriented",
            "fresh-green",
            "living-forage",
            "fiber",
            "carotenoids",
            "dried-forage"
          ],

          balancedFeedReplacement:
            false,

          notes: [
            "Alfalfa is primarily a protein- and fiber-oriented forage rather than an energy crop.",
            "Tender leaves provide more practical poultry value than coarse mature stems.",
            "Fresh cut-and-carry forage is useful for confined flocks.",
            "Rotational grazing can provide fresh forage where enough recovery area exists.",
            "Dehydrated Alfalfa products are used in some poultry diets, including as a source of pigments and forage nutrients.",
            "Drying concentrates the material but increases mold, leaf-loss, dust, and storage concerns.",
            "Chicken scratching can damage crowns even when the foliage tolerates cutting.",
            "Alfalfa should supplement rather than replace complete poultry feed.",
            "Young chicks should continue receiving an age-appropriate complete starter ration."
          ]
        }
      },

      labor: {
        beginnerFriendlinessScore: 3,

        plantingEaseScore: 3,

        establishmentEaseScore: 2,

        routineMaintenanceEaseScore: 4,

        weedControlEaseScore: 2,

        wildlifeProtectionEaseScore: 3,

        harvestEaseScore: 4,

        freshForageProcessingEaseScore: 5,

        driedForageProcessingEaseScore: 2,

        pastureManagementEaseScore: 3,

        dryingEaseScore: 2,

        storageMonitoringEaseScore: 3,

        perennialMaintenanceEaseScore: 4,

        physicalAccessibilityScore: 4,

        heavyLiftingRiskScore: 2,

        weeklyLaborLevel:
          "low",

        peakWorkloadLevel:
          "high",

        harvestFrequencyCategory:
          "repeated-seasonal",

        requiredPlantingTasks: [
          "prepare-seedbed",
          "broadcast-small-seed"
        ],

        optionalPlantingTasks: [
          "inoculate-legume-seed",
          "install-irrigation",
          "apply-lime"
        ],

        requiredMaintenanceTasks: [
          "hand-weed"
        ],

        optionalMaintenanceTasks: [
          "protect-from-wildlife",
          "soil-test",
          "fertility-maintenance"
        ],

        requiredHarvestTasks: [
          "cut-leaves"
        ],

        usePathProcessingTasks: {
          rotationalLivingForage: [],

          freshCutAndCarry: [
            "cut-leaves"
          ],

          driedLeafyForage: [
            "cut-leaves",
            "dry",
            "clean-sort"
          ]
        },

        requiredStorageTasks: [
          "inspect-moisture",
          "inspect-mold",
          "inspect-insects"
        ],

        specializedEquipmentRequired: [],

        specializedEquipmentHelpful: [
          "fencing",
          "hand-pruners",
          "sickle",
          "basket",
          "drying-rack",
          "drying-screen",
          "fan",
          "food-safe-bucket",
          "moisture-meter",
          "drip-irrigation"
        ],

        suitableForLowTimeUsersScore: 3,

        suitableForSoloGrowersScore: 4,

        directFacts: {
          seedSize:
            "very-small",

          directSeedingSuitable:
            true,

          specializedHarvestEquipmentRequiredForBackyardScale:
            false,

          majorLaborBottlenecks: [
            "Correcting soil pH and drainage before planting",
            "Preparing a firm weed-free seedbed",
            "Maintaining surface moisture during establishment",
            "Controlling weeds while seedlings are small",
            "Managing repeated harvests or grazing rotations",
            "Drying leafy forage without mold or excessive leaf loss",
            "Preventing crown damage from chickens"
          ],

          notes: [
            "Alfalfa seed is small and should not be planted deeply.",
            "Successful establishment depends on seed-to-soil contact, suitable pH, drainage, and weed control.",
            "Once established, routine labor is moderate.",
            "Fresh cut-and-carry use requires little processing.",
            "Dried-forage production creates concentrated harvest and drying labor.",
            "Leaves dry faster and may shatter away from coarse stems.",
            "Small backyard plots can be harvested manually."
          ]
        }
      },

      cost: {
        seedOrPlantCostLevel:
          "low",

        soilPreparationCostLevel:
          "moderate-high",

        irrigationCostLevel:
          "moderate",

        protectionCostLevel:
          "moderate",

        processingEquipmentCostLevel:
          "moderate",

        storageCostLevel:
          "low",

        annualRecurringCostLevel:
          "low",

        longTermValueScore: 5,

        lowestCostUsePath:
          "fresh-cut-and-carry",

        highestCostUsePath:
          "dried-leafy-forage",

        likelyCostDrivers: [
          "Soil testing",
          "Lime application",
          "Phosphorus and potassium correction",
          "Alfalfa-group inoculant",
          "Irrigation during establishment",
          "Temporary fencing",
          "Drying racks, screens, or fans",
          "Rodent-resistant storage"
        ],

        costReductionOptions: [
          "Test and correct soil before planting rather than attempting to rescue a weak stand.",
          "Begin with a small dedicated cut-and-carry plot.",
          "Use fresh forage instead of producing dried forage.",
          "Use existing fencing for rotational access.",
          "Use hand harvesting at backyard scale.",
          "Maintain crown health so the perennial stand persists."
        ],

        directFacts: {
          specializedPlantingEquipmentRequired:
            false,

          specializedBackyardHarvestEquipmentRequired:
            false,

          specializedProcessingEquipmentRequired:
            false,

          notes: [
            "Seed itself is generally not the largest cost.",
            "Correcting acidic soil, drainage, or fertility may be the primary establishment expense.",
            "A persistent stand can produce forage for multiple years.",
            "Fresh use avoids most drying and storage expenses.",
            "Cost classifications are qualitative rather than current retail estimates."
          ]
        }
      },

      goals: {
        feedReductionScore: 4,

        energyProductionScore: 1,

        proteinOrientedScore: 5,

        freshGreensScore: 5,

        livingForageScore: 4,

        winterStorageScore: 4,

        enrichmentScore: 4,

        resilienceScore: 5,

        soilImprovementScore: 5,

        nitrogenFixationScore: 5,

        groundCoverScore: 3,

        erosionControlScore: 4,

        shadeScore: 1,

        privacyScreeningScore: 1,

        pollinatorSupportScore: 5,

        compostBiomassScore: 5,

        householdFoodScore: 1,

        seedSavingScore: 2,

        selfRelianceScore: 5,

        multipurposeValueScore: 5,

        visualAppealScore: 3,

        productionReliabilityScore: 4,

        fastestValueScore: 3,

        nonElectricStorageScore: 4,

        smallFlockValueScore: 4,

        largeFlockValueScore: 5,

        primaryGoalMatches: [
          "protein-oriented",
          "fresh-greens",
          "living-forage",
          "winter-storage",
          "soil-improvement",
          "nitrogen-fixation",
          "erosion-control",
          "pollinators",
          "compost-biomass",
          "self-reliance"
        ],

        weakGoalMatches: [
          "high-energy",
          "dry-grain",
          "whole-produce",
          "privacy-screening",
          "container-feed-production",
          "deep-shade"
        ],

        directFacts: {
          nitrogenFixingLegume:
            true,

          perennialForage:
            true,

          repeatedHarvestPotential:
            true,

          pollinatorBenefit:
            true,

          driedForagePotential:
            true,

          notes: [
            "Alfalfa is one of the strongest protein-oriented forage crops in the initial planner database.",
            "Its perennial habit can reduce yearly replanting.",
            "Nitrogen fixation supports soil-building goals.",
            "Deep roots improve drought resilience and soil exploration.",
            "Flowering stands support insect pollinators.",
            "Fresh foliage and dried leafy forage provide different labor and storage options.",
            "Alfalfa is not an energy grain.",
            "Stand persistence depends heavily on drainage, soil chemistry, cutting management, and crown protection."
          ]
        }
      },

      risks: {
        wildlife: {
          wildBirds: 1,
          deer: 5,
          raccoons: 1,
          squirrels: 1,
          rabbits: 5,
          rodents: 2,
          groundhogs: 5
        },

        insectsRiskScore: 4,

        diseaseRiskScore: 4,

        lodgingRiskScore: 2,

        fieldMoldRiskScore: 3,

        dryingMoldRiskScore: 5,

        storageMoldRiskScore: 4,

        storedInsectRiskScore: 3,

        spoilageSpeedRiskScore: 5,

        invasivenessConcernRiskScore: 2,

        selfSeedingRiskScore: 2,

        fruitDropRiskScore: 1,

        cropFailureRiskScore: 4,

        stormDamageRiskScore: 2,

        shadingOtherCropsRiskScore: 2,

        overfeedingRiskScore: 3,

        treatedSeedRiskScore: 5,

        primaryRisks: [
          {
            id:
              "poor-drainage-and-root-disease",

            severity:
              "very-high",

            affectedStages: [
              "establishment",
              "crown-development",
              "established-stand",
              "winter"
            ],

            mitigationOptions: [
              "Choose well-drained soil",
              "Correct compaction",
              "Avoid low wet areas",
              "Use raised shaping where regionally appropriate",
              "Select adapted disease-resistant varieties"
            ],

            note:
              "Wet soil can damage roots and crowns and sharply shorten stand life."
          },

          {
            id:
              "chicken-crown-damage",

            severity:
              "very-high",

            affectedStages: [
              "seedling",
              "crown-establishment",
              "post-grazing-regrowth"
            ],

            mitigationOptions: [
              "Exclude chickens during establishment",
              "Use rotational paddocks",
              "Rest grazed sections",
              "Use temporary fencing",
              "Harvest through cut-and-carry"
            ],

            note:
              "Repeated scratching can expose or destroy Alfalfa crowns even when foliage regrows after cutting."
          },

          {
            id:
              "acidic-or-unbalanced-soil",

            severity:
              "high",

            affectedStages: [
              "establishment",
              "root-development",
              "nodulation",
              "stand-persistence"
            ],

            mitigationOptions: [
              "Test soil before planting",
              "Apply lime early when needed",
              "Correct phosphorus and potassium deficiencies",
              "Use appropriate inoculant"
            ],

            note:
              "Poor pH, fertility, or nodulation can create a weak short-lived stand."
          },

          {
            id:
              "weed-competition-during-establishment",

            severity:
              "high",

            affectedStages: [
              "germination",
              "seedling",
              "early-crown-development"
            ],

            mitigationOptions: [
              "Prepare a clean seedbed",
              "Control perennial weeds before planting",
              "Plant at an appropriate density",
              "Hand weed early",
              "Avoid severely weedy ground"
            ],

            note:
              "Small seedlings compete poorly with established weeds."
          },

          {
            id:
              "wet-forage-and-drying-mold",

            severity:
              "very-high",

            affectedStages: [
              "harvest",
              "drying",
              "storage"
            ],

            mitigationOptions: [
              "Harvest during suitable weather",
              "Dry thinly with airflow",
              "Avoid compact wet piles",
              "Do not seal damp forage",
              "Inspect for heating, odor, or mold"
            ],

            note:
              "Dense leafy forage can heat, ferment, or mold when drying is slow."
          },

          {
            id:
              "leaf-loss-during-drying",

            severity:
              "high",

            affectedStages: [
              "drying",
              "handling",
              "storage"
            ],

            mitigationOptions: [
              "Handle gently",
              "Avoid overdrying",
              "Use screens or tarps",
              "Store leaves and fine material carefully"
            ],

            note:
              "Nutrient-rich leaves may shatter away from coarse stems during excessive drying or rough handling."
          },

          {
            id:
              "fresh-forage-spoilage",

            severity:
              "moderate",

            affectedStages: [
              "harvest",
              "feeding"
            ],

            mitigationOptions: [
              "Feed soon after cutting",
              "Avoid wet compacted piles",
              "Discard slimy or moldy material",
              "Harvest clean untreated forage"
            ],

            note:
              "Fresh cut Alfalfa deteriorates rapidly when left in warm wet piles."
          },

          {
            id:
              "chemically-treated-seed",

            severity:
              "very-high",

            affectedStages: [
              "planting",
              "feeding"
            ],

            mitigationOptions: [
              "Use untreated seed where poultry may access planting material",
              "Keep treated seed separated and labeled"
            ],

            note:
              "Chemically treated planting seed must never be fed."
          }
        ],

        directFacts: {
          poultryCrownDamageConcern:
            true,

          waterloggingConcern:
            true,

          soilPHConcern:
            true,

          establishmentCompetitionConcern:
            true,

          dryingMoldConcern:
            true,

          leafShatterConcern:
            true,

          freshForageSpoilageConcern:
            true,

          notes: [
            "Poor drainage and crown damage are among the most important backyard persistence risks.",
            "Alfalfa tolerates repeated cutting better than uncontrolled scratching.",
            "Hot humid weather can make dried-forage production difficult.",
            "Fresh forage should be clean and free from pesticide residues unsuitable for poultry.",
            "Moldy, musty, heated, slimy, or otherwise questionable forage should not be fed."
          ]
        }
      },

      seasonalRoles: {
        earlySpring: true,

        lateSpring: true,

        summer: true,

        lateSummer: true,

        fall: true,

        winterStorage: true,

        perennial: true,

        plantingWindows: [
          {
            id:
              "spring-establishment",

            trigger:
              "early-spring",

            offsetWeeksMinimum: 0,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "firm-well-drained-and-workable",

            method:
              "broadcast-small-seed",

            note:
              "Spring establishment is practical where seedlings can root before severe heat and weed pressure."
          },

          {
            id:
              "late-summer-establishment",

            trigger:
              "late-summer",

            offsetWeeksMinimum: 0,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "moist-with-time-for-crown-development-before-winter",

            method:
              "broadcast-small-seed",

            note:
              "Late-summer establishment may reduce spring weed competition but requires adequate moisture and winter preparation."
          }
        ],

        harvestWindows: [
          {
            id:
              "rotational-living-forage",

            trigger:
              "established-crown-and-adequate-height",

            usePathId:
              "rotational-living-forage",

            note:
              "Allow controlled flock access, then remove birds while sufficient leaf area and intact crowns remain."
          },

          {
            id:
              "fresh-cut-and-carry",

            trigger:
              "healthy-vegetative-to-early-bud-growth",

            usePathId:
              "fresh-cut-and-carry",

            note:
              "Cut tender leafy growth and offer it promptly."
          },

          {
            id:
              "dried-leafy-forage",

            trigger:
              "healthy-forage-with-suitable-drying-weather",

            usePathId:
              "dried-leafy-forage",

            note:
              "Cut and dry thinly under protected ventilated conditions."
          }
        ],

        cropSequenceRoles: [
          "Perennial protein-oriented forage",
          "Rotational poultry pasture",
          "Cut-and-carry forage plot",
          "Dried leafy forage crop",
          "Nitrogen-fixing soil-building crop",
          "Pollinator-supporting perennial"
        ],

        seasonalLimitations: [
          "Winter dormancy may stop fresh production",
          "Wet weather complicates drying",
          "New seedlings cannot withstand chicken pressure",
          "Repeated late fall cutting may weaken winter survival",
          "Poor drainage can destroy perennial crowns"
        ],

        directFacts: {
          coolSeasonPerennial:
            true,

          springEstablishmentPossible:
            true,

          lateSummerEstablishmentPossible:
            true,

          repeatedHarvestPossible:
            true,

          winterDormancyPossible:
            true,

          postharvestDryingPossible:
            true,

          notes: [
            "Alfalfa can produce multiple forage harvests during a growing season.",
            "Peak growth varies by climate, moisture, variety, and cutting schedule.",
            "Recovery periods allow root reserves and crown growth to rebuild.",
            "Fresh forage may be available from spring through fall.",
            "Properly dried leafy forage can extend usefulness beyond the growing season."
          ]
        }
      },

      usePaths: [
        {
          id:
            "rotational-living-forage",

          label:
            "Rotational Alfalfa Forage",

          description:
            "An established Alfalfa or Alfalfa-grass stand accessed by chickens for short controlled periods followed by sufficient crown and foliage recovery.",

          primaryFeedRole:
            "protein-oriented-living-forage",

          harvestProducts: [
            "living-forage",
            "fresh-greens",
            "pasture-forage"
          ],

          suitableFeedingMethods: [
            "living-grazing",
            "rotational-paddock",
            "seasonal-enrichment"
          ],

          requiredProcessingTasks: [],

          optionalProcessingTasks: [],

          requiredEquipment: [],

          helpfulEquipment: [
            "fencing",
            "temporary-fencing",
            "drip-irrigation"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "rotational",

          storageMethods: [
            "living-crop"
          ],

          preferredStorageMethod:
            "not-applicable",

          storageDurationCategory:
            "immediate",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: false,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: false,

          moldRiskScore: 1,

          rodentRiskScore: 1,

          storedInsectRiskScore: 1,

          harvestEaseScore: 4,

          preparationEaseScore: 5,

          beginnerSuitabilityScore: 3,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Exclude chickens while the stand establishes.",
            "Remove birds before scratching exposes or destroys crowns.",
            "Do not use forage treated with chemicals unsuitable for poultry access.",
            "Living forage remains supplemental to complete poultry feed."
          ],

          incompatibleUserTraits: [
            "has-no-ground-access",
            "cannot-rotate-flock",
            "requires-long-term-storage",
            "requires-annual-reversibility"
          ]
        },

        {
          id:
            "fresh-cut-and-carry",

          label:
            "Fresh Cut-and-Carry Alfalfa",

          description:
            "Clean tender Alfalfa foliage harvested from a protected plot and offered promptly as a fresh protein-oriented green supplement.",

          primaryFeedRole:
            "fresh-green-protein-oriented",

          harvestProducts: [
            "fresh-greens",
            "fresh-forage",
            "alfalfa-foliage"
          ],

          suitableFeedingMethods: [
            "cut-and-carry",
            "fresh-supplement",
            "seasonal-enrichment"
          ],

          requiredProcessingTasks: [
            "cut-leaves"
          ],

          optionalProcessingTasks: [
            "chop"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "hand-pruners",
            "sickle",
            "basket"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "several-weekly",

          storageMethods: [
            "short-term-fresh"
          ],

          preferredStorageMethod:
            "feed-soon-after-harvest",

          storageDurationCategory:
            "very-short",

          nonElectricStorageSuitable: false,

          refrigerationSuitable: true,

          freezingSuitable: false,

          dryingRequired: false,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 2,

          rodentRiskScore: 1,

          storedInsectRiskScore: 1,

          harvestEaseScore: 5,

          preparationEaseScore: 5,

          beginnerSuitabilityScore: 4,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Harvest only clean healthy Alfalfa from an untreated and uncontaminated area.",
            "Do not feed moldy, slimy, fermented, manure-contaminated, or roadside forage.",
            "Avoid leaving fresh wet Alfalfa in a compacted pile.",
            "Fresh Alfalfa remains supplemental to a complete poultry ration."
          ],

          incompatibleUserTraits: [
            "requires-long-term-storage",
            "has-no-time-for-fresh-harvest",
            "wants-dry-grain-only"
          ]
        },

        {
          id:
            "dried-leafy-forage",

          label:
            "Dried Leafy Alfalfa Forage",

          description:
            "Leafy Alfalfa harvested, dried thoroughly with protected airflow, and stored for measured supplemental feeding.",

          primaryFeedRole:
            "dried-protein-oriented-forage",

          harvestProducts: [
            "dried-forage",
            "dried-leaves",
            "alfalfa-forage"
          ],

          suitableFeedingMethods: [
            "dried-forage",
            "measured-supplement",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "cut-leaves",
            "dry",
            "clean-sort"
          ],

          optionalProcessingTasks: [
            "chop",
            "grind"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "hand-pruners",
            "sickle",
            "drying-rack",
            "drying-screen",
            "fan",
            "food-safe-bucket",
            "moisture-meter"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "repeated-seasonal",

          storageMethods: [
            "dried-forage"
          ],

          preferredStorageMethod:
            "dry-dark-ventilated-and-rodent-protected",

          storageDurationCategory:
            "medium-long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: true,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,

          rodentRiskScore: 3,

          storedInsectRiskScore: 3,

          harvestEaseScore: 3,

          preparationEaseScore: 2,

          beginnerSuitabilityScore: 2,

          householdFoodValueScore: 1,

          flockValueScore: 4,

          safetyWarnings: [
            "Dry forage thoroughly before enclosed storage.",
            "Do not store material that feels damp, heats, smells musty, or shows visible mold.",
            "Protect dried forage from rodents, insects, moisture, and contamination.",
            "Handle gently to reduce loss of nutrient-rich leaves.",
            "Do not feed dusty, moldy, musty, or otherwise questionable forage.",
            "Dried Alfalfa remains supplemental to complete poultry feed."
          ],

          incompatibleUserTraits: [
            "declines-drying",
            "has-no-protected-drying-area",
            "requires-minimal-processing",
            "has-no-dry-storage"
          ]
        }
      ],

      dataQuality: {
        overallConfidence: 0.79,

        verifiedFields: [
          "identity",
          "lifecycle",
          "climate.directFacts.seasonType",
          "climate.directFacts.deepRootedPerennial",
          "site.directFacts.preferredLight",
          "soil.directFacts.nitrogenFixingLegume",
          "soil.directFacts.deepTaprooted",
          "soil.directFacts.waterloggedSoilSuitable",
          "soil.directFacts.acidicSoilConcern",
          "water.directFacts.establishmentMoistureImportant",
          "water.directFacts.deepRootsImproveDroughtSurvival",
          "space.directFacts.rotationalPaddockSuitable",
          "space.directFacts.cutAndCarryPlotSuitable",
          "flock.directFacts.edibleFeedParts",
          "flock.directFacts.nutritionalOrientation",
          "risks.directFacts.poultryCrownDamageConcern",
          "risks.directFacts.waterloggingConcern",
          "risks.directFacts.dryingMoldConcern",
          "seasonalRoles.directFacts.coolSeasonPerennial",
          "seasonalRoles.directFacts.repeatedHarvestPossible"
        ],

        derivedFields: [
          "climate",
          "site",
          "soil.textureScores",
          "water",
          "space.smallSpaceScore",
          "space.mediumSpaceScore",
          "space.largeSpaceScore",
          "space.layoutScores",
          "space.spaceTypeScores",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "labor",
          "cost",
          "goals",
          "risks.wildlife",
          "usePaths.rotational-living-forage",
          "usePaths.fresh-cut-and-carry",
          "usePaths.dried-leafy-forage"
        ],

        uncertainFields: [
          "lifecycle.expectedUsefulLifeYears",
          "climate.minimumFrostFreeDays",
          "climate.preferredFrostFreeDays",
          "climate.minimumSoilTemperatureF",
          "climate.preferredSoilTemperatureF",
          "soil.minimumSoilDepthIn",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "space.minimumContainerGallons",
          "space.minimumRaisedBedDepthIn",
          "flock.portionGuidance",
          "usePaths.rotational-living-forage.sustainableStockingPressure",
          "usePaths.fresh-cut-and-carry.exactStorageDuration",
          "usePaths.dried-leafy-forage.exactStorageDuration"
        ],

        missingFields: [
          "lifecycle.expectedUsefulLifeYears",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "space.minimumContainerGallons",
          "flock.portionGuidance",
          "flock.usePathTesting"
        ],

        lastReviewed:
          "2026-07-15",

        primarySources: [
          {
            title:
              "Alfalfa Production and Management",

            organization:
              "University and Cooperative Extension forage resources",

            sourceType:
              "extension-forage-guide",

            use:
              "Establishment, soil pH, drainage, fertility, inoculation, root development, cutting, drought tolerance, and stand persistence"
          },

          {
            title:
              "Alfalfa Plant and Forage Resources",

            organization:
              "United States Department of Agriculture",

            sourceType:
              "government-plant-guide",

            use:
              "Botany, perennial lifecycle, nitrogen fixation, forage value, adaptation, erosion control, and wildlife use"
          },

          {
            title:
              "Alfalfa in Poultry Nutrition",

            organization:
              "Poultry-feed and animal-nutrition research resources",

            sourceType:
              "feed-nutrition-reference",

            use:
              "Dehydrated Alfalfa meal, carotenoids, pigmentation, protein, fiber, and supplemental poultry-feed use"
          },

          {
            title:
              "Hay Drying and Storage",

            organization:
              "University Cooperative Extension resources",

            sourceType:
              "extension-storage-guide",

            use:
              "Moisture control, leaf loss, mold prevention, heating, ventilation, and dry-forage storage"
          }
        ],

        notes: [
          "Alfalfa plannerData is specific to Medicago sativa grown as perennial forage.",
          "The record treats fresh cut-and-carry forage, rotational living forage, and dried leafy forage as separate use paths.",
          "Fresh leafy growth is more practical for backyard poultry than coarse mature stems.",
          "The record does not treat Alfalfa as an energy grain or complete poultry ration.",
          "No exact sustainable chicken stocking density has been assigned.",
          "No exact flock feeding portion has been assigned.",
          "No medicinal claims are made.",
          "The crop should remain in testing until deep-soil, drought, protein-forage, dried-forage, rotational-grazing, and poor-drainage profiles are evaluated."
        ]
      }
    }
  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - MULBERRY
    //
    //
    //
    //
    //////////////////////////////////////////////

  "CROP-MULBERRY": {
    id: "CROP-MULBERRY",

    name: "Mulberry",
    scientificName:
      "Morus spp., including Morus rubra, Morus alba, Morus nigra, and selected hybrids",

    category:
      "Perennial Tree Forage, Fruit, and Seasonal Drop Crop",

    cropType:
      "Deciduous perennial tree or large shrub",

    seasonType:
      "Perennial with spring and summer growth",

    status: "Initial Research Complete",

    summary:
      "Mulberry trees can provide edible fruit, repeatedly harvestable leaves, shade, wildlife value, and a long-lived source of seasonal chicken enrichment. The leaves can be relatively protein-rich on a dry-matter basis, while the fruit supplies mostly water and carbohydrates. Species and cultivar selection are critical because fruiting, mature size, cold tolerance, invasiveness, and leaf composition vary substantially.",

    chickenUse: {
      edibleParts: [
        "Ripe fruit",
        "Fresh mature leaves",
        "Tender young leaves",
        "Dried leaves",
        "Leaf meal",
        "Small tender twigs attached to harvested foliage"
      ],

      primaryValue: [
        "Perennial leafy forage",
        "Moderate-to-high leaf protein",
        "Seasonal fruit enrichment",
        "Carotenoids and plant pigments",
        "Shade",
        "Repeated annual harvests",
        "Low-input production after establishment"
      ],

      feedingForms: [
        "Naturally fallen ripe fruit",
        "Hand-harvested ripe fruit",
        "Freshly cut leafy branches",
        "Chopped fresh leaves",
        "Dried and crumbled leaves",
        "Ground homemade leaf meal in limited amounts",
        "Managed access beneath a fruiting tree"
      ],

      bestFor: [
        "Adult chickens as supplemental fruit and forage",
        "Long-term homestead plantings",
        "Warm-temperate and temperate climates",
        "Owners wanting a perennial rather than annual crop",
        "Silvopasture or orchard-style chicken systems",
        "Providing summer shade and seasonal enrichment",
        "Cut-and-carry leaf forage"
      ],

      supplementOnly: true,

      preparationNotes:
        "Offer only ripe fruit and clean, sound leaves. Fresh leafy branches may be hung or placed where chickens can peck them without the branches becoming heavily soiled. Leaves intended for storage should be dried rapidly and completely before being crumbled or ground.",

      safetyNotes:
        "Use only correctly identified mulberry species and ripe fruit. Avoid moldy, fermented, spoiled, pesticide-contaminated, or roadside-harvested material. Unripe fruit and milky sap may cause irritation in people and should not be intentionally used as poultry feed. White mulberry may be invasive or restricted locally and can hybridize with native red mulberry, so confirm regional recommendations before planting."
    },

    nutrition: {
      basis:
        "Fruit and leaves are nutritionally different materials. Leaf values are usually expressed on a dry-matter basis, while fruit values are commonly reported fresh and contain substantial water. Composition varies by species, cultivar, season, maturity, pruning system, and leaf-to-stem ratio.",

      dryMatterPercent:
        "Fresh leaves and fruit contain substantial moisture; exact values remain cultivar- and harvest-dependent",

      crudeProteinPercent:
        "Mulberry leaves are often reported at approximately 15% to 25% crude protein on a dry-matter basis, with values near the high teens or low twenties common in feed references",

      fatPercent:
        "Generally low in leaves and fruit; exact values remain under verification",

      fiberPercent:
        "Moderate in leaves and higher when stems are included; generally lower and more digestible than many mature tree forages",

      calciumPercent:
        "Leaves may contain meaningful calcium, but exact values vary and do not make mulberry a complete layer ration",

      phosphorusPercent:
        "Present in leaves, though generally lower than calcium; exact poultry-relevant values remain under verification",

      notableNutrients: [
        "Leaf protein",
        "Carotenoids",
        "Calcium in leaves",
        "Potassium",
        "Magnesium",
        "Iron",
        "Vitamin C in fresh fruit",
        "Anthocyanins in dark-colored fruit",
        "Flavonoids and other plant compounds",
        "Readily available carbohydrates in ripe fruit"
      ],

      limitations: [
        "Fresh fruit is primarily water and sugar rather than concentrated feed",
        "Fresh leaf weight greatly overstates dry-matter feed contribution",
        "Leaf protein does not provide a complete poultry amino-acid balance",
        "Stem inclusion raises fiber and lowers usable nutrient density",
        "Nutrient composition differs among white, red, black, and hybrid mulberries",
        "Young leaves, mature leaves, dried leaves, leaf meal, and fruit are not nutritionally interchangeable",
        "Heavy fruit intake may dilute balanced feed and contribute excess sugar",
        "Leaf calcium does not eliminate the need for formulated layer feed and an appropriate calcium program",
        "Poultry-specific inclusion guidance for home-produced mulberry leaf meal remains limited"
      ]
    },

    growing: {
      sunlight:
        "Full sun is preferred for maximum fruit production, although many mulberries tolerate partial shade",

      soilTemperatureMinimumF: null,

      idealSoilTemperatureF: null,

      frostTolerance:
        "Moderate to High depending on species and cultivar",

      heatTolerance:
        "Moderate to High",

      droughtTolerance:
        "Moderate to High after establishment, although dependable moisture improves leaf and fruit production",

      soilPHMinimum:
        "Approximately 5.5",

      soilPHMaximum:
        "Approximately 7.5 or slightly higher depending on species and soil drainage",

      waterNeeds:
        "Moderate during establishment. Mature trees are often relatively drought tolerant, but irrigation during prolonged drought may improve leaf growth and fruit retention.",

      directSow:
        "Possible but not preferred for predictable fruit and growth characteristics",

      transplantRecommended:
        "Planting a named nursery cultivar or rooted cutting is generally more predictable than seed propagation",

      daysToFirstHarvestMinimum: null,
      daysToFirstHarvestMaximum: null,

      yearsToMeaningfulFruitMinimum:
        "Approximately 2 to 5 years for many vegetatively propagated cultivars under favorable conditions",

      yearsToMeaningfulFruitMaximum: null,

      plantSpacingInches: null,

      rowSpacingInches:
        "Approximately 10 to 30 feet or more between full-size trees, depending on species, cultivar, pruning system, and intended use",

      plantingDepthInches:
        "Plant nursery trees at approximately the same depth as the root flare or previous growing depth",

      successionPlanting: false,

      regrowthAfterHarvest:
        "Yes. Mulberries generally tolerate pruning, pollarding, or coppice-style leaf harvest when performed appropriately.",

      establishmentNotes:
        "Choose a well-drained location away from pavement, vehicles, septic systems, foundations, and areas where falling fruit would create a problem. Verify whether a cultivar is male, female, self-fruiting, fruitless, dwarf, sterile, or potentially invasive before purchase."
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Plant dormant nursery trees in early spring after the soil becomes workable. Select cold-hardy red mulberry, hardy hybrids, or cultivars proven locally.",
        harvestWindow:
          "Leaves during late spring and summer; fruit generally during summer depending on cultivar."
      },

      midwestNortheast: {
        plantingWindow:
          "Plant in early spring or during fall while the tree is dormant, allowing adequate establishment before severe heat or cold.",
        harvestWindow:
          "Leaves from late spring through summer and ripe fruit primarily during summer."
      },

      upperSouth: {
        plantingWindow:
          "Plant dormant trees from late fall through early spring when soil is workable and not frozen.",
        harvestWindow:
          "Leaves from spring through early fall, with fruit commonly ripening from late spring into summer."
      },

      deepSouth: {
        plantingWindow:
          "Plant during late fall, winter, or early spring to allow root establishment before severe summer heat.",
        harvestWindow:
          "Leaves across a long warm season, with fruit timing varying from spring into summer."
      },

      southwest: {
        plantingWindow:
          "Plant during dormancy or early spring where dependable irrigation is available. Protect young trees from intense heat and drying winds.",
        harvestWindow:
          "Leaves and fruit during the warm season, depending on elevation, cultivar, and irrigation."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant during dormancy from fall through early spring in well-drained soil. Select cultivars suited to local winter and summer temperatures.",
        harvestWindow:
          "Leaves from spring through summer and fruit during summer into early fall."
      },

      coastalWest: {
        plantingWindow:
          "Plant during fall through early spring. Mild areas may support a broad planting window if irrigation is available.",
        harvestWindow:
          "Leaves through much of the growing season, with fruit commonly ripening in late spring or summer."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: null,
      plantsPer50SquareFeet: null,
      plantsPer100SquareFeet: null,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      matureTreeSize:
        "Species and cultivars range from compact shrubs or dwarf trees to trees approximately 30 to 60 feet tall or larger",

      storageLife:
        "Fresh ripe fruit is highly perishable and usually stores only several days under refrigeration. Thoroughly dried leaves may store for several months.",

      storageMethod:
        "Use ripe fruit promptly, refrigerate briefly, freeze, or process without added ingredients. Dry leaves rapidly with airflow and store only when fully dry in a cool, dark, moisture-proof and pest-resistant container.",

      yieldNotes:
        "Plants-per-area values remain null because mulberries range from compact shrubs and dwarf cultivars to trees approximately 30 to 60 feet tall or larger. Their useful footprint also depends on whether they are managed as full-sized fruit trees, pollarded trees, coppiced stools, hedges, or repeatedly cut forage shrubs. A single plants-per-square-foot value would therefore be misleading. Future planning tools should model mulberry by mature canopy footprint, row or hedge spacing, pruning system, and years to establishment rather than by ordinary garden plant density. Fruit and leaf yields should also be treated separately."

    },

    economics: {
      seedCostEstimate:
        "Not usually the preferred establishment method",

      plantCostEstimate:
        "Moderate to High depending on cultivar, tree size, shipping, grafting, and nursery availability",

      equipmentCostEstimate:
        "Low after establishment, although irrigation, pruning tools, ladders, harvesting sheets, fencing, drying racks, and storage containers may add cost",

      irrigationCostLevel:
        "Low in humid climates after establishment; Moderate in dry climates",

      laborLevel:
        "Low to Moderate for naturally dropped fruit; Moderate to High for repeated leaf pruning, drying, grinding, and storage",

      potentialFeedSavings: null,

      economicNotes:
        "A mulberry tree may provide value for decades through fruit, leaves, shade, wildlife habitat, and reduced need to replant annual crops. The long establishment period, mature footprint, fruit mess, pruning labor, and uncertain poultry intake must be included when comparing it with annual feed crops."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for general tree growth, silkworm and livestock leaf use, leaf composition, and perennial biomass potential; moderate for processed mulberry leaf meal in experimental poultry diets; limited for free-choice backyard laying-hen intake, safe home inclusion levels, and yield per square foot",

      sources: [
        {
          title:
            "White Mulberry",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/",
          use:
            "Leaf composition, crude-protein range, fiber, minerals, leaf yield, digestibility, animal-feed applications, and variability with harvest stage"
        },

        {
          title:
            "Morus alba L.",
          organization:
            "Food and Agriculture Organization of the United Nations",
          url:
            "https://www.fao.org/",
          use:
            "Mulberry cultivation systems, fodder use, repeated leaf harvesting, climate adaptation, and perennial production"
        },

        {
          title:
            "Morus alba Plant Profile",
          organization:
            "USDA Natural Resources Conservation Service",
          url:
            "https://plants.usda.gov/plant-profile/MOAL",
          use:
            "United States distribution, introduced status, taxonomy, and regional occurrence"
        },

        {
          title:
            "White Mulberry — Invasive Species Information",
          organization:
            "United States Forest Service and Invasive Plant Resources",
          url:
            "https://www.invasive.org/weedcd/pdfs/wow/white-mulberry.pdf",
          use:
            "Invasiveness, naturalization, ecological concerns, and hybridization risk with native red mulberry"
        },

        {
          title:
            "Mulberry Leaf Meal in Poultry Nutrition",
          organization:
            "Peer-reviewed poultry-nutrition literature",
          url:
            "https://scholar.google.com/scholar?q=mulberry+leaf+meal+poultry+nutrition",
          use:
            "Experimental broiler and laying-hen studies involving processed mulberry leaf meal, performance, egg traits, pigmentation, and antioxidant measurements"
        },

        {
          title:
            "Mulberry Fruit Nutrient Data",
          organization:
            "USDA FoodData Central",
          url:
            "https://fdc.nal.usda.gov/",
          use:
            "Fresh mulberry moisture, carbohydrates, sugar, fiber, vitamin C, potassium, iron, and anthocyanin context"
        },

        {
          title:
            "Native Red Mulberry and White Mulberry Identification",
          organization:
            "University and state forestry-extension resources",
          url:
            "https://www.fs.usda.gov/",
          use:
            "Species identification, native red mulberry conservation, white-mulberry hybridization, and planting cautions"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Decide whether the public-facing guide should recommend native red mulberry, named hybrids, black mulberry, or white-mulberry fodder cultivars by region.",
        "Do not recommend invasive white mulberry without checking state and local invasive-plant guidance.",
        "Determine whether sterile or low-seed cultivars can provide useful leaf forage without ecological spread.",
        "Separate fruiting cultivars from fruitless male landscape trees.",
        "Research poultry-specific safety and intake of fresh leaves versus dried leaf meal.",
        "Find laying-hen trials that report exact inclusion rates, egg production, yolk color, feed conversion, and egg quality.",
        "Separate mulberry fruit nutrition from leaf and leaf-meal nutrition.",
        "Identify dry-matter leaf yield under backyard pollard, coppice, hedge, and full-tree systems.",
        "Determine optimal pruning frequency for repeated poultry-leaf harvest without weakening the tree.",
        "Research species and cultivar hardiness for northern, Southern, arid, and coastal climates.",
        "Measure fruit loss to wild birds and determine whether natural fruit drop is sufficient for practical chicken use.",
        "Research staining, fly attraction, fermentation, and sanitation concerns beneath fruiting trees.",
        "Compare the mature land footprint with annual crop yield over a 10-year period.",
        "Calculate scores only after other perennial tree and shrub crops have comparable evidence.",
        "Plant-density fields remain null because mulberry size and spacing vary substantially among full-sized trees, dwarf cultivars, hedges, pollards, and coppiced forage systems."

        ]
    },

    plannerData: {
      schemaVersion:
        "1.0.0",

      developmentStatus:
        "ready",

      identity: {
        plannerName:
          "Mulberry",

        shortLabel:
          "Mulberry",

        icon:
          "🌳",

        cropCategory:
          "perennial-tree-forage",

        primaryFeedCategory:
          "tree-forage-and-fruit",

        guideUrl:
          "growing-mulberry-for-chickens.html"
      },

      lifecycle: {
        growthCycle:
          "perennial",

        isAnnual: false,
        isBiennial: false,
        isPerennial: true,
        isTreeOrShrub: true,

        yearsToFirstUsefulHarvest: 1,

        yearsToFullProduction: 5,

        expectedUsefulLifeYears:
          null,

        regrowsAfterHarvest: true,

        permanentPlantingRequired: true,

        reversibleAfterOneSeason: false
      },

      climate: {
        suitableClimateTypes: [
          "cold-short-summer",
          "cool-moderate-summer",
          "temperate",
          "hot-humid",
          "hot-dry",
          "mild-winter",
          "high-elevation"
        ],

        preferredClimateTypes: [
          "temperate",
          "hot-humid",
          "mild-winter"
        ],

        challengingClimateTypes: [],

        minimumFrostFreeDays:
          null,

        preferredFrostFreeDays:
          null,

        minimumSoilTemperatureF:
          null,

        preferredSoilTemperatureF:
          null,

        daysToMaturityMinimum:
          null,

        daysToMaturityMaximum:
          null,

        dryDownBufferDays:
          null,

        heatToleranceScore: 4,

        droughtClimateToleranceScore: 4,

        humidityToleranceScore: 4,

        coolSummerToleranceScore: 4,

        frostSensitivityScore: 2,

        winterHardinessRequired: true,

        seasonExtensionBenefits: [
          "Dormant nursery trees can be planted during suitable fall, winter, or early-spring windows.",
          "Temporary irrigation improves establishment during the first growing seasons.",
          "Young trees may benefit from trunk guards and temporary protection from severe cold, rodents, deer, and poultry.",
          "Cultivar selection is more important than temporary season extension for long-term success."
        ],

        indoorSeedStartingBenefitScore: 1,

        directFacts: {
          seasonType:
            "deciduous-perennial-tree",

          frostSensitive:
            false,

          commonlyDirectSeeded:
            false,

          winterDormancyPossible:
            true,

          heatDormancyPossible:
            false,

          longLivedPerennial:
            true,

          cultivarAdaptationHighlyVariable:
            true,

          notes: [
            "Mulberries are deciduous perennial trees or large shrubs.",
            "Cold hardiness varies substantially among species, hybrids, and named cultivars.",
            "Native red Mulberry, White Mulberry, Black Mulberry, and hybrids should not be treated as identical.",
            "Established trees tolerate summer heat well in many regions.",
            "Young trees require more dependable moisture and protection than established trees.",
            "Dormant trees tolerate winter cold better than active new growth.",
            "Late spring frost can damage tender growth or flowers even when the tree survives.",
            "The planner does not use frost-free days or annual days-to-maturity because Mulberry is managed as a permanent woody crop.",
            "Local cultivar performance should be verified before planting."
          ]
        }
      },

      site: {
        absoluteMinimumSunHours: 4,

        productiveMinimumSunHours: 6,

        preferredSunHours: 8,

        shadeToleranceScore: 3,

        afternoonShadeBenefitInHeat: 2,

        windToleranceScore: 4,

        lodgingRiskScore: 1,

        reflectedHeatToleranceScore: 4,

        airflowRequirementScore: 3,

        frostPocketSensitivityScore: 3,

        treeRootCompetitionToleranceScore: 4,

        hardscapeConflictRiskScore: 5,

        structureConflictRiskScore: 5,

        utilityConflictRiskScore: 5,

        fruitDropMessRiskScore: 5,

        stainingRiskScore: 5,

        directFacts: {
          preferredLight:
            "full-sun",

          productiveSunGuidance:
            "Approximately 6 or more hours of direct sunlight, with full sun preferred for dependable fruiting, dense foliage, and strong annual growth.",

          windExposureConcern:
            true,

          growthHabit:
            "deciduous-tree-or-large-shrub",

          matureHeightFtMinimum: 10,

          matureHeightFtMaximum: 60,

          floweringPollinatorTraffic:
            false,

          fruitDropTrafficConcern:
            true,

          notes: [
            "Full sun supports the strongest fruit and leaf production.",
            "Partial shade may support survival and foliage but can reduce fruiting.",
            "Tree size varies from compact dwarf cultivars to trees exceeding 30 to 60 feet.",
            "Mulberry should be located away from foundations, roofs, septic systems, power lines, vehicles, patios, sidewalks, and other conflict areas.",
            "Dark fruit can stain pavement, furniture, vehicles, clothing, and poultry structures.",
            "Fallen fruit can attract flies, wasps, wildlife, and other animals.",
            "Branches and fruit may fall beyond the original planting footprint.",
            "Pruning, pollarding, coppicing, or dwarf cultivar selection can reduce—but not eliminate—space conflicts.",
            "The mature site should be evaluated before planting rather than after the tree becomes established."
          ]
        }
      },

      soil: {
        textureScores: {
          heavyClay: 3,
          clayLoam: 4,
          loam: 5,
          sandyLoam: 5,
          verySandy: 3,
          rocky: 2
        },

        drainageRequirementScore: 4,

        temporaryWetToleranceScore: 2,

        waterloggingSensitivityScore: 4,

        minimumSoilDepthIn:
          null,

        preferredSoilDepthIn: 36,

        compactionToleranceScore: 3,

        establishmentInSodDifficultyScore: 3,

        preferredPHMinimum: 5.5,

        preferredPHMaximum: 7.5,

        survivalPHMinimum:
          null,

        survivalPHMaximum:
          null,

        fertilityRequirementScore: 3,

        nitrogenRequirementScore: 3,

        phosphorusRequirementScore: 3,

        potassiumRequirementScore: 4,

        benefitsFromInoculation: false,

        inoculantType:
          null,

        saltToleranceScore:
          null,

        amendmentEffortScore: 3,

        directFacts: {
          preferredDrainage:
            "well-drained",

          preferredTextures: [
            "loam",
            "sandy loam",
            "well-drained clay loam"
          ],

          nitrogenFixingLegume:
            false,

          inoculationMayImproveNodulation:
            false,

          deepRooted:
            true,

          waterloggedSoilSuitable:
            false,

          notes: [
            "Mulberry is adaptable to several soil textures but generally performs best in deep, well-drained soil.",
            "Established trees may tolerate less-than-ideal soil better than many annual garden crops.",
            "Persistently saturated soil can cause root decline and poor establishment.",
            "Deep soil supports long-term root development and drought resilience.",
            "Compacted urban soil, shallow rock, hardpan, and construction debris can restrict growth.",
            "The stored pH range represents a broad productive planning range rather than an absolute survival range.",
            "Mulberry does not fix atmospheric nitrogen.",
            "Legume inoculant provides no benefit to Mulberry.",
            "Soil testing remains useful before planting a permanent tree."
          ]
        }
      },

      water: {
        overallWaterRequirementLevel:
          "moderate",

        germinationWaterNeedLevel:
          "not-applicable",

        establishmentWaterNeedLevel:
          "high",

        matureWaterNeedLevel:
          "low-moderate",

        floweringWaterNeedLevel:
          "moderate",

        harvestDevelopmentWaterNeedLevel:
          "moderate",

        droughtSurvivalScore: 4,

        droughtYieldRetentionScore: 3,

        criticalGrowthStages: [
          "transplant-establishment",
          "first-year-root-development",
          "spring-leaf-growth",
          "flowering",
          "fruit-development",
          "post-pruning-regrowth"
        ],

        criticalStageWaterImportanceScore: 4,

        overwateringSensitivityScore: 3,

        waterloggingSensitivityScore: 4,

        dripIrrigationBenefitScore: 5,

        mulchBenefitScore: 5,

        suitableForRainfallOnlyScore: 4,

        suitableForLimitedIrrigationScore: 4,

        containerDryingRiskScore: 5,

        establishmentYearsRequiringExtraWater: 2,

        directFacts: {
          establishmentMoistureImportant:
            true,

          matureTreesRelativelyDroughtTolerant:
            true,

          postPruningMoistureImportant:
            true,

          standingWaterSuitable:
            false,

          irrigationCanImproveFruitAndLeafProduction:
            true,

          notes: [
            "Young Mulberry trees need dependable moisture while roots establish.",
            "Established trees may survive moderate drought, but fruit retention and leaf growth can decline.",
            "Supplemental irrigation can improve regrowth after heavy pruning or leaf harvest.",
            "Mulch can conserve moisture and reduce competition, but mulch should be kept away from the trunk.",
            "Drip irrigation is preferable to chronic trunk wetting or saturated soil.",
            "Container trees dry rapidly and remain limited by root volume.",
            "Standing water and prolonged saturation remain undesirable."
          ]
        }
      },

      space: {
        minimumTrialAreaSqFt:
          null,

        minimumUsefulAreaSqFt:
          null,

        preferredProductionAreaSqFt:
          null,

        smallSpaceScore: 1,

        mediumSpaceScore: 3,

        largeSpaceScore: 5,

        layoutScores: {
          squareBlock: 3,
          wideRectangle: 4,
          longStrip: 4,
          irregular: 5,
          smallBeds: 1,
          openField: 5
        },

        spaceTypeScores: {
          inGround: 5,
          raisedBed: 1,
          container: 1,
          fenceLine: 3,
          buildingEdge: 1,
          unusedLawn: 5,
          openField: 5,
          orchard: 5,
          forageFrame: 1,
          rotationalPaddock: 5,
          greenhouse: 1,
          hedgerow: 5
        },

        minimumContainerGallons:
          null,

        containerUseLimitation:
          "Dwarf Mulberry cultivars may survive in very large containers for a time, but restricted roots, rapid drying, limited yield, and long-term maintenance make containers a poor chicken-feed production strategy.",

        minimumRaisedBedDepthIn:
          null,

        vineSpreadRequired: false,

        verticalSupportBenefitScore: 1,

        blockPlantingRequired: false,

        minimumBlockRows:
          null,

        continuousStandPreferred: false,

        heightCategory:
          "tree",

        matureWidthCategory:
          "large-canopy",

        overflowSpaceBenefitScore: 5,

        directFacts: {
          orchardSuitable:
            true,

          silvopastureSuitable:
            true,

          rotationalPaddockSuitable:
            true,

          hedgeOrPollardSuitable:
            true,

          coppiceManagementPossible:
            true,

          containerFeedProductionEfficient:
            false,

          notes: [
            "Mulberry requires more long-term space than annual feed crops.",
            "Full-sized fruit trees need substantial canopy and root clearance.",
            "Dwarf trees, hedges, pollards, and coppiced forage systems may reduce the footprint.",
            "Orchards, unused lawn areas, pasture edges, and silvopasture systems are strong uses.",
            "Mulberry is unsuitable for ordinary raised beds and most rental-property gardens.",
            "Naturally fallen fruit is most useful where chickens can safely access the area beneath the canopy.",
            "Individual plants-per-square-foot values are inappropriate because mature size varies dramatically.",
            "Minimum useful area remains null until tree form and management system are selected."
          ]
        }
      },

      flock: {
        suitableForAdultChickens: true,

        suitableForYoungChicks: false,

        flockPurposeScores: {
          eggs: 4,
          meat: 4,
          breeding: 4,
          petsEnrichment: 5,
          homestead: 5,
          mixed: 5
        },

        feedingMethodScores: {
          livingGrazing: 4,
          cutAndCarry: 5,
          wholeProduce: 5,
          wholeSeedHeads: 1,
          wholeGrain: 1,
          processedGrain: 1,
          heatTreated: 1,
          driedForage: 4,
          winterStorage: 3
        },

        directRunSuitabilityScore: 3,

        forageFrameSuitabilityScore: 1,

        rotationalPaddockSuitabilityScore: 5,

        confinedFlockValueScore: 5,

        pasturedFlockValueScore: 5,

        treatDilutionRiskScore: 4,

        highEnergySupplement: false,

        highFiberSupplement: true,

        concentratedFatSource: false,

        primaryFlockUses: [
          "Naturally fallen seasonal fruit",
          "Harvested fresh fruit",
          "Fresh cut-and-carry leafy branches",
          "Dried leafy forage",
          "Summer shade",
          "Orchard and silvopasture enrichment"
        ],

        unsuitablePrimaryUses: [
          "Complete-ration replacement",
          "High-energy grain production",
          "Primary young-chick feed",
          "Temporary one-season planting",
          "Small container feed production",
          "Unmanaged access to spoiled fallen fruit"
        ],

        directFacts: {
          edibleFeedParts: [
            "Ripe fruit",
            "Fresh leaves",
            "Tender young shoots",
            "Properly dried leaves"
          ],

          preferredBirdStage:
            "Established adult chickens",

          cropSurvivalWithDirectChickenAccess:
            "good-after-tree-establishment-with-trunk-and-root-zone-protection",

          directAccessTiming:
            "Protect young trees from scratching, bark damage, and root exposure. Established trees may support controlled flock access beneath the canopy.",

          nutritionalOrientation: [
            "fresh-fruit",
            "fresh-green",
            "protein-oriented-forage",
            "fiber",
            "carbohydrate",
            "enrichment",
            "shade"
          ],

          balancedFeedReplacement:
            false,

          notes: [
            "Mulberry fruit and leaves are nutritionally different feed materials.",
            "Ripe fruit provides water, sugar, carbohydrates, pigments, and enrichment.",
            "Leaves provide more protein and fiber than fruit on a dry-matter basis.",
            "Fresh fruit should be treated as a supplemental treat rather than concentrated feed.",
            "Tender leaves are generally more useful than coarse woody stems.",
            "Cut branches may be hung for pecking enrichment.",
            "Young tree trunks and roots require protection from scratching and pecking.",
            "Spoiled, moldy, fermented, contaminated, or unripe fruit should not be fed intentionally.",
            "Mulberry remains supplemental to complete poultry feed.",
            "Young chicks should continue receiving an age-appropriate complete starter ration."
          ]
        }
      },

      labor: {
        beginnerFriendlinessScore: 3,

        plantingEaseScore: 3,

        establishmentEaseScore: 3,

        routineMaintenanceEaseScore: 4,

        weedControlEaseScore: 4,

        wildlifeProtectionEaseScore: 2,

        harvestEaseScore: 4,

        freshFruitHarvestEaseScore: 5,

        freshForageProcessingEaseScore: 4,

        driedForageProcessingEaseScore: 2,

        pruningEaseScore: 3,

        dryingEaseScore: 2,

        storageMonitoringEaseScore: 3,

        perennialMaintenanceEaseScore: 4,

        physicalAccessibilityScore: 3,

        heavyLiftingRiskScore: 3,

        weeklyLaborLevel:
          "very-low",

        peakWorkloadLevel:
          "moderate-high",

        harvestFrequencyCategory:
          "seasonal-and-repeated",

        requiredPlantingTasks: [
          "plant-tree",
          "water-transplant",
          "protect-young-trunk"
        ],

        optionalPlantingTasks: [
          "install-irrigation",
          "install-tree-guard",
          "stake-tree",
          "mulch-root-zone"
        ],

        requiredMaintenanceTasks: [
          "inspect-tree-health",
          "manage-fruit-drop"
        ],

        optionalMaintenanceTasks: [
          "prune",
          "pollard",
          "coppice",
          "protect-from-wildlife",
          "remove-unwanted-seedlings"
        ],

        requiredHarvestTasks: [
          "pick-produce",
          "cut-leaves"
        ],

        usePathProcessingTasks: {
          naturallyFallenFruit: [],

          harvestedFreshFruit: [
            "pick-produce"
          ],

          freshCutAndCarryLeaves: [
            "cut-leaves"
          ],

          driedLeafyForage: [
            "cut-leaves",
            "dry",
            "clean-sort"
          ]
        },

        requiredStorageTasks: [
          "inspect-moisture",
          "inspect-mold",
          "inspect-insects"
        ],

        specializedEquipmentRequired: [],

        specializedEquipmentHelpful: [
          "tree-guard",
          "fencing",
          "hand-pruners",
          "loppers",
          "pruning-saw",
          "harvest-sheet",
          "basket",
          "drying-rack",
          "drying-screen",
          "fan",
          "food-safe-bucket",
          "moisture-meter",
          "drip-irrigation"
        ],

        suitableForLowTimeUsersScore: 4,

        suitableForSoloGrowersScore: 4,

        directFacts: {
          propagationMethodPreferred:
            "named-nursery-tree-or-rooted-cutting",

          directSeedingSuitable:
            false,

          specializedHarvestEquipmentRequiredForBackyardScale:
            false,

          majorLaborBottlenecks: [
            "Selecting an appropriate species, cultivar, and mature size",
            "Protecting young trunks and roots",
            "Watering during establishment",
            "Managing pruning height",
            "Collecting or cleaning fallen fruit",
            "Protecting fruit from wildlife",
            "Drying leafy forage without mold",
            "Preventing unwanted seedlings or invasive spread"
          ],

          notes: [
            "Planting a named cultivar is more predictable than growing from seed.",
            "Naturally fallen fruit requires almost no harvest labor but may create sanitation and staining problems.",
            "Hand-harvested fruit is highly perishable.",
            "Fresh leaf forage requires pruning or branch cutting.",
            "Dried leaf production creates substantial handling and drying labor.",
            "Tall full-sized trees may make fruit and leaf harvest difficult.",
            "Pollarding, coppicing, hedging, or dwarf cultivar selection can improve accessibility.",
            "Long-term placement decisions are more important than weekly maintenance."
          ]
        }
      },

      cost: {
        seedOrPlantCostLevel:
          "moderate",

        soilPreparationCostLevel:
          "moderate",

        irrigationCostLevel:
          "moderate",

        protectionCostLevel:
          "moderate",

        processingEquipmentCostLevel:
          "low-moderate",

        storageCostLevel:
          "low",

        annualRecurringCostLevel:
          "very-low",

        longTermValueScore: 5,

        lowestCostUsePath:
          "naturally-fallen-fresh-fruit",

        highestCostUsePath:
          "dried-mulberry-leaf-forage",

        likelyCostDrivers: [
          "Named nursery tree or rooted cultivar",
          "Shipping",
          "Tree guards",
          "Temporary fencing",
          "Irrigation during establishment",
          "Pruning tools",
          "Fruit collection sheets",
          "Drying racks, screens, or fans",
          "Removal if planted in the wrong location"
        ],

        costReductionOptions: [
          "Choose a locally adapted cultivar before purchase.",
          "Plant in a location that can accommodate the mature canopy.",
          "Use naturally fallen fruit rather than hand harvesting.",
          "Use fresh leafy branches rather than dried leaf meal.",
          "Maintain a low pollard or coppice system where appropriate.",
          "Protect young trees so establishment is not lost to poultry or wildlife."
        ],

        directFacts: {
          specializedPlantingEquipmentRequired:
            false,

          specializedBackyardHarvestEquipmentRequired:
            false,

          specializedProcessingEquipmentRequired:
            false,

          notes: [
            "The initial tree cost is higher than a packet of annual seed.",
            "A healthy tree may provide value for decades.",
            "Annual replanting is unnecessary once established.",
            "Incorrect placement can create substantial future removal or property-repair expense.",
            "Fresh fruit and leaves require little specialized equipment.",
            "Dried leaf production raises equipment and labor costs.",
            "Cost classifications are qualitative rather than current retail estimates."
          ]
        }
      },

      goals: {
        feedReductionScore: 4,

        energyProductionScore: 3,

        proteinOrientedScore: 4,

        freshGreensScore: 5,

        livingForageScore: 4,

        winterStorageScore: 3,

        enrichmentScore: 5,

        resilienceScore: 5,

        soilImprovementScore: 3,

        nitrogenFixationScore: 0,

        groundCoverScore: 1,

        erosionControlScore: 3,

        shadeScore: 5,

        privacyScreeningScore: 5,

        pollinatorSupportScore: 3,

        compostBiomassScore: 5,

        householdFoodScore: 5,

        seedSavingScore: 2,

        selfRelianceScore: 5,

        multipurposeValueScore: 5,

        visualAppealScore: 5,

        productionReliabilityScore: 4,

        fastestValueScore: 1,

        nonElectricStorageScore: 3,

        smallFlockValueScore: 5,

        largeFlockValueScore: 5,

        primaryGoalMatches: [
          "fresh-greens",
          "living-forage",
          "enrichment",
          "shade",
          "privacy-screening",
          "compost-biomass",
          "shared-household-food",
          "self-reliance",
          "use-unused-space",
          "edible-landscape"
        ],

        weakGoalMatches: [
          "fast-value",
          "short-season",
          "annual-reversibility",
          "container-production",
          "dry-grain",
          "nitrogen-fixation",
          "ground-cover"
        ],

        directFacts: {
          nitrogenFixingLegume:
            false,

          permanentTreeCrop:
            true,

          repeatedLeafHarvestPotential:
            true,

          seasonalFruitProduction:
            true,

          householdFoodPotential:
            true,

          shadePotential:
            true,

          privacyScreeningPotential:
            true,

          notes: [
            "Mulberry is among the strongest long-term multipurpose crops in the initial planner database.",
            "Fruit, leaves, shade, biomass, household food, and flock enrichment can come from one planting.",
            "The tree can produce for decades when properly located and managed.",
            "Leaf forage provides stronger protein-oriented value than fruit.",
            "Fruit provides seasonal carbohydrate-oriented enrichment.",
            "Mulberry is not a nitrogen-fixing crop.",
            "It is not a fast annual feed solution.",
            "Its mature footprint and permanent nature make it inappropriate for many small or temporary sites."
          ]
        }
      },

      risks: {
        wildlife: {
          wildBirds: 5,
          deer: 5,
          raccoons: 5,
          squirrels: 5,
          rabbits: 2,
          rodents: 3,
          groundhogs: 2
        },

        insectsRiskScore: 3,

        diseaseRiskScore: 3,

        lodgingRiskScore: 1,

        fieldMoldRiskScore: 3,

        dryingMoldRiskScore: 5,

        storageMoldRiskScore: 4,

        storedInsectRiskScore: 3,

        spoilageSpeedRiskScore: 5,

        invasivenessConcernRiskScore: 5,

        selfSeedingRiskScore: 5,

        fruitDropRiskScore: 5,

        cropFailureRiskScore: 3,

        stormDamageRiskScore: 3,

        shadingOtherCropsRiskScore: 5,

        overfeedingRiskScore: 4,

        treatedSeedRiskScore: 1,

        primaryRisks: [
          {
            id:
              "wrong-tree-location",

            severity:
              "very-high",

            affectedStages: [
              "planting",
              "mature-tree"
            ],

            mitigationOptions: [
              "Verify mature size before planting",
              "Select dwarf or compact cultivars where needed",
              "Avoid foundations and utilities",
              "Avoid pavement and vehicle areas",
              "Plan the permanent canopy footprint"
            ],

            note:
              "A long-lived tree planted in the wrong location may create structural, utility, shade, staining, and removal problems."
          },

          {
            id:
              "fruit-drop-mess-and-fermentation",

            severity:
              "very-high",

            affectedStages: [
              "fruit-ripening",
              "fruit-drop",
              "feeding"
            ],

            mitigationOptions: [
              "Locate the tree over soil or pasture",
              "Allow controlled flock cleanup",
              "Remove excessive spoiled fruit",
              "Avoid planting over pavement",
              "Maintain sanitation beneath the canopy"
            ],

            note:
              "Large quantities of fallen fruit may stain, ferment, attract insects, smell, and create slippery or unsanitary conditions."
          },

          {
            id:
              "wildlife-fruit-loss",

            severity:
              "very-high",

            affectedStages: [
              "fruit-development",
              "fruit-ripening",
              "fruit-drop"
            ],

            mitigationOptions: [
              "Accept wildlife sharing",
              "Use timely harvest",
              "Use temporary netting where practical",
              "Choose high-producing cultivars",
              "Allow chickens access during fruit drop"
            ],

            note:
              "Birds, squirrels, raccoons, deer, and other wildlife may consume substantial fruit."
          },

          {
            id:
              "young-tree-chicken-damage",

            severity:
              "high",

            affectedStages: [
              "planting",
              "first-year-establishment",
              "young-tree"
            ],

            mitigationOptions: [
              "Install a trunk guard",
              "Fence the root zone",
              "Exclude chickens",
              "Maintain mulch without exposing the trunk",
              "Prevent scratching around shallow new roots"
            ],

            note:
              "Chickens can expose roots, damage bark, and disturb young trees before establishment."
          },

          {
            id:
              "invasive-white-mulberry-spread",

            severity:
              "very-high",

            affectedStages: [
              "cultivar-selection",
              "fruiting",
              "seed-dispersal"
            ],

            mitigationOptions: [
              "Check state and local guidance",
              "Prefer suitable native or noninvasive cultivars",
              "Avoid invasive White Mulberry where restricted or discouraged",
              "Remove unwanted seedlings",
              "Protect native Red Mulberry populations"
            ],

            note:
              "White Mulberry may be invasive and may hybridize with native Red Mulberry."
          },

          {
            id:
              "unripe-fruit-or-sap-irritation",

            severity:
              "moderate",

            affectedStages: [
              "pruning",
              "fruit-development",
              "feeding"
            ],

            mitigationOptions: [
              "Use ripe fruit",
              "Avoid intentionally feeding unripe fruit",
              "Wash hands after pruning",
              "Keep sap away from eyes and sensitive skin"
            ],

            note:
              "Unripe fruit and milky sap may cause irritation and should not be intentionally used as poultry feed."
          },

          {
            id:
              "fresh-fruit-spoilage",

            severity:
              "high",

            affectedStages: [
              "harvest",
              "short-term-storage",
              "feeding"
            ],

            mitigationOptions: [
              "Feed promptly",
              "Refrigerate briefly",
              "Discard moldy or fermented fruit",
              "Avoid compact piles",
              "Maintain clean collection areas"
            ],

            note:
              "Ripe Mulberries are highly perishable."
          },

          {
            id:
              "dried-leaf-mold",

            severity:
              "very-high",

            affectedStages: [
              "harvest",
              "drying",
              "storage"
            ],

            mitigationOptions: [
              "Dry leaves thinly",
              "Use strong airflow",
              "Separate thick stems",
              "Do not seal damp leaves",
              "Inspect for musty odor, heating, or mold"
            ],

            note:
              "Leafy material may mold when drying is slow or enclosed storage begins too early."
          },

          {
            id:
              "balanced-feed-displacement",

            severity:
              "high",

            affectedStages: [
              "feeding"
            ],

            mitigationOptions: [
              "Continue complete poultry feed",
              "Limit heavy fruit intake",
              "Use leaves and fruit as supplements",
              "Monitor flock condition"
            ],

            note:
              "Large amounts of sugary fruit or fibrous leaves may displace balanced poultry feed."
          }
        ],

        directFacts: {
          fruitDropMessConcern:
            true,

          stainingConcern:
            true,

          wildlifeAttractionConcern:
            true,

          youngTreePoultryDamageConcern:
            true,

          invasiveSpeciesConcern:
            true,

          dryingMoldConcern:
            true,

          freshFruitSpoilageConcern:
            true,

          notes: [
            "Permanent-site selection is one of the most important Mulberry decisions.",
            "Wildlife loss does not necessarily eliminate flock value because large trees may produce heavily.",
            "White Mulberry should not be recommended without checking regional invasive-plant guidance.",
            "Dark-fruited cultivars can create severe staining.",
            "Fruitless male landscape cultivars provide leaves and shade but no fruit.",
            "Fresh fruit and leaves should be clean and free from unsuitable pesticide residues.",
            "Moldy, spoiled, fermented, contaminated, or questionable material should not be fed."
          ]
        }
      },

      seasonalRoles: {
        earlySpring: true,

        lateSpring: true,

        summer: true,

        lateSummer: true,

        fall: true,

        winterStorage: true,

        perennial: true,

        plantingWindows: [
          {
            id:
              "dormant-tree-planting",

            trigger:
              "dormant-season",

            offsetWeeksMinimum: 0,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "workable-and-not-waterlogged",

            method:
              "plant-nursery-tree",

            note:
              "Dormant fall, winter, or early-spring planting is preferred where regional weather allows root establishment."
          },

          {
            id:
              "spring-container-tree-planting",

            trigger:
              "after-severe-freeze-risk",

            offsetWeeksMinimum: 0,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "moist-and-workable",

            method:
              "plant-container-tree",

            note:
              "Container-grown trees can be planted in spring with dependable establishment watering."
          }
        ],

        harvestWindows: [
          {
            id:
              "naturally-fallen-fruit",

            trigger:
              "ripe-fruit-drop",

            usePathId:
              "naturally-fallen-fresh-fruit",

            note:
              "Allow chickens controlled access to sound ripe fruit while removing excessive spoiled material."
          },

          {
            id:
              "harvested-fresh-fruit",

            trigger:
              "fully-ripe-fruit",

            usePathId:
              "harvested-fresh-fruit",

            note:
              "Harvest fully ripe sound fruit and use promptly."
          },

          {
            id:
              "fresh-cut-and-carry-leaves",

            trigger:
              "healthy-leafy-growth",

            usePathId:
              "fresh-cut-and-carry-leaves",

            note:
              "Cut manageable leafy branches without removing so much canopy that the tree is weakened."
          },

          {
            id:
              "dried-leafy-forage",

            trigger:
              "healthy-leaves-with-suitable-drying-weather",

            usePathId:
              "dried-mulberry-leaf-forage",

            note:
              "Dry clean leaves rapidly with airflow and store only after they are fully dry."
          }
        ],

        cropSequenceRoles: [
          "Permanent orchard feed tree",
          "Silvopasture shade tree",
          "Seasonal fruit-drop crop",
          "Cut-and-carry leaf forage",
          "Dried leafy forage crop",
          "Household fruit tree",
          "Long-term biomass crop"
        ],

        seasonalLimitations: [
          "Fruit production requires establishment time",
          "Winter dormancy stops fresh leaf production",
          "Fruit harvest is highly seasonal",
          "Fresh fruit stores poorly",
          "Heavy pruning requires recovery time",
          "Young trees require protection"
        ],

        directFacts: {
          deciduousPerennialTree:
            true,

          dormantPlantingPossible:
            true,

          repeatedLeafHarvestPossible:
            true,

          seasonalFruitProduction:
            true,

          winterDormancyPossible:
            true,

          driedLeafStoragePossible:
            true,

          notes: [
            "Mulberry leaves emerge during spring and remain available through much of the warm season.",
            "Fruit timing varies by species, cultivar, and climate.",
            "Fruit may ripen over several weeks rather than all at once.",
            "Fresh leaf harvest can continue after fruiting when tree health and pruning management allow.",
            "Winter dormancy eliminates fresh leaf and fruit production.",
            "Dried leaves may extend forage availability into winter."
          ]
        }
      },

      usePaths: [
        {
          id:
            "naturally-fallen-fresh-fruit",

          label:
            "Naturally Fallen Fresh Mulberries",

          description:
            "Ripe Mulberries fall beneath an established tree where chickens consume sound fruit as seasonal orchard enrichment.",

          primaryFeedRole:
            "fresh-fruit-enrichment",

          harvestProducts: [
            "fresh-fruit",
            "fallen-fruit",
            "mulberries"
          ],

          suitableFeedingMethods: [
            "orchard-grazing",
            "rotational-paddock",
            "seasonal-enrichment",
            "whole-produce"
          ],

          requiredProcessingTasks: [],

          optionalProcessingTasks: [
            "clean-sort"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "fencing",
            "harvest-sheet"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "seasonal-drop",

          storageMethods: [
            "immediate-consumption"
          ],

          preferredStorageMethod:
            "not-applicable",

          storageDurationCategory:
            "immediate",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: false,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 4,

          rodentRiskScore: 4,

          storedInsectRiskScore: 1,

          harvestEaseScore: 5,

          preparationEaseScore: 5,

          beginnerSuitabilityScore: 4,

          householdFoodValueScore: 3,

          flockValueScore: 5,

          safetyWarnings: [
            "Allow only sound ripe fruit to remain available.",
            "Remove moldy, rotten, fermented, or contaminated fruit.",
            "Do not permit large spoiled piles to accumulate.",
            "Fruit remains supplemental to complete poultry feed.",
            "Protect young tree trunks and roots from chickens."
          ],

          incompatibleUserTraits: [
            "has-no-ground-access",
            "requires-immediate-first-year-production",
            "requires-annual-reversibility",
            "cannot-manage-fallen-fruit"
          ]
        },

        {
          id:
            "harvested-fresh-fruit",

          label:
            "Harvested Fresh Mulberries",

          description:
            "Fully ripe sound Mulberries are harvested and offered promptly as a measured seasonal fruit supplement.",

          primaryFeedRole:
            "fresh-fruit-enrichment",

          harvestProducts: [
            "fresh-fruit",
            "mulberries",
            "fresh-produce"
          ],

          suitableFeedingMethods: [
            "whole-produce",
            "fresh-supplement",
            "seasonal-enrichment"
          ],

          requiredProcessingTasks: [
            "pick-produce"
          ],

          optionalProcessingTasks: [
            "clean-sort",
            "portion"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "basket",
            "harvest-sheet"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "seasonal-frequent",

          storageMethods: [
            "short-term-fresh"
          ],

          preferredStorageMethod:
            "feed-promptly-or-refrigerate-briefly",

          storageDurationCategory:
            "very-short",

          nonElectricStorageSuitable: false,

          refrigerationSuitable: true,

          freezingSuitable: true,

          dryingRequired: false,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 4,

          rodentRiskScore: 2,

          storedInsectRiskScore: 1,

          harvestEaseScore: 4,

          preparationEaseScore: 5,

          beginnerSuitabilityScore: 4,

          householdFoodValueScore: 5,

          flockValueScore: 4,

          safetyWarnings: [
            "Use only fully ripe, sound fruit.",
            "Do not intentionally feed unripe fruit.",
            "Discard moldy, fermented, spoiled, or contaminated fruit.",
            "Fresh Mulberries are highly perishable.",
            "Offer as a supplement rather than a complete feed."
          ],

          incompatibleUserTraits: [
            "requires-long-term-room-temperature-storage",
            "has-no-time-for-frequent-seasonal-harvest",
            "wants-dry-grain-only"
          ]
        },

        {
          id:
            "fresh-cut-and-carry-leaves",

          label:
            "Fresh Cut-and-Carry Mulberry Leaves",

          description:
            "Clean leafy Mulberry branches are harvested from a managed tree, pollard, hedge, or coppice and offered promptly as fresh forage.",

          primaryFeedRole:
            "fresh-green-protein-oriented",

          harvestProducts: [
            "fresh-greens",
            "fresh-forage",
            "mulberry-leaves",
            "leafy-branches"
          ],

          suitableFeedingMethods: [
            "cut-and-carry",
            "fresh-supplement",
            "hanging-enrichment"
          ],

          requiredProcessingTasks: [
            "cut-leaves"
          ],

          optionalProcessingTasks: [
            "chop",
            "strip-leaves"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "hand-pruners",
            "loppers",
            "pruning-saw",
            "basket"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "repeated-seasonal",

          storageMethods: [
            "short-term-fresh"
          ],

          preferredStorageMethod:
            "feed-soon-after-cutting",

          storageDurationCategory:
            "very-short",

          nonElectricStorageSuitable: false,

          refrigerationSuitable: true,

          freezingSuitable: false,

          dryingRequired: false,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 2,

          rodentRiskScore: 1,

          storedInsectRiskScore: 1,

          harvestEaseScore: 4,

          preparationEaseScore: 4,

          beginnerSuitabilityScore: 4,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Harvest only correctly identified Mulberry leaves.",
            "Use clean healthy foliage from an untreated area.",
            "Avoid coarse woody branches that birds cannot use safely.",
            "Do not feed moldy, slimy, contaminated, or roadside foliage.",
            "Avoid compact piles of wet leaves.",
            "Fresh leaves remain supplemental to complete poultry feed."
          ],

          incompatibleUserTraits: [
            "requires-long-term-storage",
            "cannot-prune-or-harvest-branches",
            "has-no-permanent-tree-space",
            "wants-dry-grain-only"
          ]
        },

        {
          id:
            "dried-mulberry-leaf-forage",

          label:
            "Dried Mulberry Leaf Forage",

          description:
            "Clean Mulberry leaves are separated from coarse stems, dried thoroughly with protected airflow, and stored for measured supplemental feeding.",

          primaryFeedRole:
            "dried-protein-oriented-forage",

          harvestProducts: [
            "dried-forage",
            "dried-leaves",
            "mulberry-leaf-forage"
          ],

          suitableFeedingMethods: [
            "dried-forage",
            "measured-supplement",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "cut-leaves",
            "dry",
            "clean-sort"
          ],

          optionalProcessingTasks: [
            "strip-leaves",
            "crumble",
            "grind"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "hand-pruners",
            "loppers",
            "drying-rack",
            "drying-screen",
            "fan",
            "food-safe-bucket",
            "moisture-meter"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "repeated-seasonal",

          storageMethods: [
            "dried-forage"
          ],

          preferredStorageMethod:
            "dry-dark-moisture-proof-and-pest-resistant",

          storageDurationCategory:
            "medium-long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: true,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,

          rodentRiskScore: 3,

          storedInsectRiskScore: 3,

          harvestEaseScore: 3,

          preparationEaseScore: 2,

          beginnerSuitabilityScore: 2,

          householdFoodValueScore: 1,

          flockValueScore: 4,

          safetyWarnings: [
            "Dry leaves thoroughly before enclosed storage.",
            "Remove coarse woody material where practical.",
            "Do not seal leaves that remain flexible, cool-damp, or unevenly dried.",
            "Inspect stored leaves for mold, insects, rodents, heating, and musty odor.",
            "Discard moldy, dusty, contaminated, or questionable material.",
            "Dried leaf forage remains supplemental to complete poultry feed."
          ],

          incompatibleUserTraits: [
            "declines-drying",
            "has-no-protected-drying-area",
            "requires-minimal-processing",
            "has-no-dry-storage",
            "has-no-permanent-tree-space"
          ]
        }
      ],

      dataQuality: {
        overallConfidence: 0.77,

        verifiedFields: [
          "identity",
          "lifecycle",
          "climate.directFacts.seasonType",
          "climate.directFacts.longLivedPerennial",
          "site.directFacts.preferredLight",
          "site.directFacts.growthHabit",
          "soil.directFacts.nitrogenFixingLegume",
          "soil.directFacts.deepRooted",
          "water.directFacts.establishmentMoistureImportant",
          "water.directFacts.matureTreesRelativelyDroughtTolerant",
          "space.directFacts.orchardSuitable",
          "space.directFacts.silvopastureSuitable",
          "space.directFacts.coppiceManagementPossible",
          "flock.directFacts.edibleFeedParts",
          "flock.directFacts.nutritionalOrientation",
          "risks.directFacts.fruitDropMessConcern",
          "risks.directFacts.wildlifeAttractionConcern",
          "risks.directFacts.invasiveSpeciesConcern",
          "seasonalRoles.directFacts.deciduousPerennialTree",
          "seasonalRoles.directFacts.repeatedLeafHarvestPossible"
        ],

        derivedFields: [
          "climate",
          "site",
          "soil.textureScores",
          "water",
          "space.smallSpaceScore",
          "space.mediumSpaceScore",
          "space.largeSpaceScore",
          "space.layoutScores",
          "space.spaceTypeScores",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "labor",
          "cost",
          "goals",
          "risks.wildlife",
          "usePaths.naturally-fallen-fresh-fruit",
          "usePaths.harvested-fresh-fruit",
          "usePaths.fresh-cut-and-carry-leaves",
          "usePaths.dried-mulberry-leaf-forage"
        ],

        uncertainFields: [
          "lifecycle.expectedUsefulLifeYears",
          "climate.minimumFrostFreeDays",
          "climate.preferredFrostFreeDays",
          "climate.minimumSoilTemperatureF",
          "climate.preferredSoilTemperatureF",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "space.minimumContainerGallons",
          "space.minimumRaisedBedDepthIn",
          "flock.portionGuidance",
          "usePaths.naturally-fallen-fresh-fruit.productionPerTree",
          "usePaths.fresh-cut-and-carry-leaves.sustainablePruningFrequency",
          "usePaths.dried-mulberry-leaf-forage.exactStorageDuration"
        ],

        missingFields: [
          "lifecycle.expectedUsefulLifeYears",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "space.minimumContainerGallons",
          "flock.portionGuidance",
          "flock.usePathTesting"
        ],

        lastReviewed:
          "2026-07-15",

        primarySources: [
          {
            title:
              "White Mulberry",

            organization:
              "Feedipedia — INRAE, CIRAD, AFZ and FAO",

            sourceType:
              "international-feed-reference",

            use:
              "Leaf composition, protein, fiber, minerals, forage yield, digestibility, repeated harvest, and livestock-feed use"
          },

          {
            title:
              "Morus alba L.",

            organization:
              "Food and Agriculture Organization of the United Nations",

            sourceType:
              "international-crop-reference",

            use:
              "Cultivation, fodder systems, pruning, coppicing, climate adaptation, and perennial production"
          },

          {
            title:
              "Mulberry Plant Profiles",

            organization:
              "United States Department of Agriculture",

            sourceType:
              "government-plant-reference",

            use:
              "Taxonomy, distribution, introduced status, native Red Mulberry, and regional occurrence"
          },

          {
            title:
              "White Mulberry Invasive Species Information",

            organization:
              "United States Forest Service and state invasive-plant resources",

            sourceType:
              "government-invasive-species-reference",

            use:
              "Invasive spread, ecological concerns, naturalization, and hybridization with native Red Mulberry"
          },

          {
            title:
              "Mulberry Leaf Meal in Poultry Nutrition",

            organization:
              "Peer-reviewed poultry-nutrition literature",

            sourceType:
              "poultry-feed-research",

            use:
              "Experimental use of processed leaf meal, flock performance, pigmentation, egg traits, antioxidant effects, protein, and fiber limitations"
          },

          {
            title:
              "Mulberry Fruit Nutrient Data",

            organization:
              "USDA FoodData Central",

            sourceType:
              "government-food-composition-reference",

            use:
              "Fruit moisture, carbohydrates, sugar, fiber, vitamins, minerals, and pigment context"
          }
        ],

        notes: [
          "Mulberry plannerData covers Morus species and hybrids only at a broad planning level.",
          "Species, cultivar, mature size, fruit color, invasiveness, cold hardiness, and productivity must be verified locally.",
          "Fruit and leaf forage are separate products and should not be scored as nutritionally interchangeable.",
          "The four use paths are naturally fallen fruit, harvested fresh fruit, fresh cut-and-carry leaves, and dried leafy forage.",
          "Orchard and silvopasture use are treated as site-management systems rather than separate harvested products.",
          "No exact sustainable pruning rate has been assigned.",
          "No exact flock feeding portion has been assigned.",
          "No medicinal claims are made.",
          "The crop should remain in testing until permanent-space, orchard, long-establishment, fruit-drop, fresh-leaf, dried-leaf, rental-property, and wildlife-pressure profiles are evaluated."
        ]
      }
    }
  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - FIELD CORN
    //
    //
    //
    //
    //////////////////////////////////////////////

  "CROP-FIELD-CORN": {
    id: "CROP-FIELD-CORN",

    name: "Field Corn",
    scientificName: "Zea mays",

    category: "High-Energy Grain Crop",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Field corn, especially dent corn, is a familiar warm-season grain crop that can produce a storable, energy-dense feed supplement. Its mature kernels are rich in starch and highly useful as a poultry-feed ingredient, but homegrown corn is low in protein quality and calcium, requires dependable pollination and fertility, and must be dried and stored carefully to reduce mold and mycotoxin risk.",

    chickenUse: {
      edibleParts: [
        "Mature dried kernels",
        "Cracked or coarsely ground grain",
        "Whole dried ears offered as enrichment",
        "Sprouted kernels from sound untreated grain",
        "Limited amounts of fresh immature kernels"
      ],

      primaryValue: [
        "Carbohydrate energy",
        "Highly digestible starch",
        "Moderate oil contribution",
        "Dry grain storage",
        "Cold-weather supplementation",
        "Foraging and pecking enrichment"
      ],

      feedingForms: [
        "Whole dried kernels for adult birds",
        "Cracked corn",
        "Coarsely ground corn",
        "Whole dried ears",
        "Sprouted grain",
        "A measured ingredient in a properly balanced homemade ration"
      ],

      bestFor: [
        "Adult chickens as an energy-oriented supplement",
        "Growers with full sun and adequate garden space",
        "Warm-season feed gardens",
        "Owners wanting a familiar and widely available grain crop",
        "Dry winter storage",
        "Flocks receiving a nutritionally complete base ration"
      ],

      supplementOnly: true,

      preparationNotes:
        "Allow ears intended for grain to mature fully and dry on the plant as conditions permit. Harvest before prolonged wet weather, finish drying under cover with strong airflow when necessary, shell the ears if desired, and store only clean, sound grain. Crack or grind only small quantities at a time because damaged kernels expose more oil and deteriorate faster.",

      safetyNotes:
        "Field corn should not replace a balanced poultry ration by itself. It is high in energy but relatively low in crude protein, lysine, tryptophan, calcium, available phosphorus, vitamins, and trace minerals. Never feed moldy, musty, insect-damaged, heated, wet, or visibly discolored corn. Corn can carry aflatoxins, fumonisins, deoxynivalenol, zearalenone, ochratoxin, and other mycotoxins that may remain dangerous even when mold is not obvious. Grain from stressed, damaged, or questionable ears should be discarded or professionally tested rather than fed."
    },

    nutrition: {
      basis:
        "Approximate mature dry maize-grain values, primarily expressed on a dry-matter basis. Composition varies by hybrid, kernel type, growing environment, drying method, storage, and whether the grain is whole, cracked, ground, or processed.",

      crudeProteinPercent:
        "Approximately 8% to 10% of dry matter in typical field corn; Feedipedia reports an average near 9.4% for a large European dataset",

      fatPercent:
        "Approximately 4% of dry matter; Feedipedia reports an average ether-extract value near 4.3%",

      fiberPercent:
        "Low for a whole cereal grain; approximately 2% to 3% crude fiber on a dry-matter basis, with NDF commonly around 10% to 12%",

      calciumPercent:
        "Very low; approximately 0.05% of dry matter based on an average of 0.5 g/kg DM",

      phosphorusPercent:
        "Approximately 0.30% of dry matter based on an average of 3.0 g/kg DM, but much of the phosphorus is bound in phytate and is not readily available to poultry",

      notableNutrients: [
        "Approximately 65% or more starch",
        "High metabolizable-energy value for poultry",
        "Linoleic acid and other polyunsaturated fatty acids",
        "Carotene and cryptoxanthin in yellow corn",
        "Phosphorus",
        "Magnesium",
        "Potassium",
        "Small amounts of B vitamins",
        "Pigments that may contribute to yolk color when yellow corn is used"
      ],

      limitations: [
        "Low crude-protein concentration compared with protein-oriented feed ingredients",
        "Protein is deficient in lysine and tryptophan",
        "Very low calcium content",
        "Most phosphorus is associated with phytate and is not fully available to poultry",
        "Low vitamin and trace-mineral density relative to a complete ration",
        "Heavy supplementation can dilute protein, calcium, vitamins, and minerals supplied by balanced feed",
        "Whole grain, cracked corn, cornmeal, corn gluten meal, distillers grains, silage, and sweet corn are different feed materials",
        "Mycotoxin contamination can make otherwise valuable grain unsafe"
      ]
    },

    growing: {
      sunlight:
        "Full sun; generally at least 6 to 8 hours of direct sunlight daily",

      soilTemperatureMinimumF:
        "Approximately 50°F is commonly used as a minimum for field planting, but warmer soil improves emergence and reduces the chance of slow germination or seedling loss",

      idealSoilTemperatureF:
        "Approximately 60°F or warmer for dependable beginner-scale establishment",

      frostTolerance: "Very Low",

      heatTolerance:
        "Moderate to High when moisture is adequate; extreme heat during pollination can reduce kernel set",

      droughtTolerance:
        "Low to Moderate. Established plants can survive short dry periods, but drought near tasseling, silking, pollination, and grain filling can sharply reduce yield and increase grain-quality risk.",

      soilPHMinimum: 5.8,
      soilPHMaximum: 7.0,

      waterNeeds:
        "Moderate to High. Corn needs consistent moisture during rapid vegetative growth and is especially sensitive to water stress during tasseling, silking, pollination, and early grain filling. Avoid prolonged waterlogging.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: null,
      daysToFirstHarvestMaximum: null,

      daysToMaturityMinimum: 80,
      daysToMaturityMaximum: 120,

      plantSpacingInches:
        "Approximately 6 to 12 inches within rows for small garden blocks, depending on variety, soil fertility, irrigation, and intended population",

      rowSpacingInches:
        "Approximately 24 to 36 inches for hand-managed garden plots; closer commercial rows may be used with appropriate equipment and fertility",

      plantingDepthInches:
        "Approximately 1.5 to 2 inches in most conditions; shallower planting may be used in cool, moist soil and slightly deeper planting in warm, dry surface soil",

      successionPlanting:
        "Limited. Staggered plantings are possible where the growing season is long enough, but grain corn must have time to mature and dry before persistent fall frost and wet weather.",

      regrowthAfterHarvest: false
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Plant after severe frost danger has passed and soil is at least approximately 50°F, preferably warmer for beginners. Choose an early field-corn, flint-corn, or short-season dent variety with enough time to mature before fall frost.",
        harvestWindow:
          "Early fall through late fall, after kernels are mature and ears have dried as much as local weather allows. Finish drying under cover when necessary."
      },

      midwestNortheast: {
        plantingWindow:
          "Plant from mid- to late spring after soil reaches approximately 50°F and a favorable warming trend is expected. Plant in a compact block rather than one or two long isolated rows.",
        harvestWindow:
          "Fall, after physiological maturity and field drying. Harvest earlier if persistent rain, wildlife pressure, lodging, or ear disease threatens grain quality."
      },

      upperSouth: {
        plantingWindow:
          "Plant in spring after frost danger has substantially passed and soil has warmed. Early planting may help pollination occur before the most severe summer heat and drought.",
        harvestWindow:
          "Late summer through fall, depending on maturity group and planting date. Dry and inspect grain carefully in humid conditions."
      },

      deepSouth: {
        plantingWindow:
          "Plant from late winter through spring according to local extension guidance, after damaging frost risk has passed. Select varieties adapted to regional heat, humidity, insects, and disease pressure.",
        harvestWindow:
          "Summer into fall. Prompt harvest and controlled drying may be important because warm, humid conditions favor insects, molds, and grain deterioration."
      },

      southwest: {
        plantingWindow:
          "Plant after frost once soil is warm and dependable irrigation is available. Schedule pollination to avoid the most extreme heat where possible.",
        harvestWindow:
          "Late summer through fall, depending on elevation, planting date, and irrigation. Protect mature ears from wildlife and rapid weather changes."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant after frost in the warmest available location once soil has warmed. Use an early-maturing variety in cool-summer or short-season locations.",
        harvestWindow:
          "Early fall before prolonged cold rain. Grain may require substantial finishing time under dry, well-ventilated cover."
      },

      coastalWest: {
        plantingWindow:
          "Plant after frost when soil is warm. Warmer inland valleys are generally more dependable for grain maturity than cool, foggy coastal locations.",
        harvestWindow:
          "Late summer through fall, depending on local heat accumulation and variety maturity."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: 4,
      plantsPer50SquareFeet: 21,
      plantsPer100SquareFeet: 43,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Potentially many months when clean grain is dried to a safe moisture level and protected from heat, condensation, insects, rodents, and mold",

      storageMethod:
        "Dry ears or shelled kernels thoroughly with strong airflow. Store only clean, cool grain in a dry, food-safe, rodent-resistant container. Avoid sealing grain while it is still warm or damp. Inspect periodically for condensation, heating, insects, musty odor, caking, discoloration, or visible mold. Crack or grind only the amount that will be used promptly.",

      yieldNotes:
        "Plant-density estimates are calculated from midpoint garden spacing of approximately 10 inches between plants and 33 inches between rows, based on Extension guidance recommending approximately 8 to 12 inches between corn plants and 30 to 36 inches between rows. This produces practical estimates of approximately 4 plants per 10 square feet, 21 plants per 50 square feet, and 43 plants per 100 square feet. Corn should be planted in a compact block of at least four rows rather than one long row to improve wind pollination, so very small areas may not produce fully filled ears even when the calculated number of plants fits. Commercial corn yield figures should not be converted directly into backyard yield because small-plot production is strongly affected by pollination, block dimensions, hybrid choice, fertility, water, weeds, wildlife, earworms, disease, lodging, harvest loss, shelling efficiency, and final grain moisture."

    },

    economics: {
      seedCostEstimate:
        "Low to moderate. Open-pollinated field-corn seed may be inexpensive, while modern hybrid, organic, untreated, specialty, or short-season seed may cost more and may be sold in quantities larger than a backyard grower needs.",

      equipmentCostEstimate:
        "Low for hand planting on a very small plot, but optional costs include soil testing, fertilizer, irrigation, fencing, wildlife protection, drying racks or fans, shelling tools, moisture testing, and rodent-resistant storage containers.",

      irrigationCostLevel: "Moderate",

      laborLevel:
        "Moderate to High when planting, weeding, protecting ears, harvesting, drying, shelling, cleaning, inspecting, and storing are done by hand",

      potentialFeedSavings: null,

      economicNotes:
        "Field corn is inexpensive as a purchased commodity, so home production does not automatically save money. It is most likely to provide practical value when seed, land, fertility, and water are inexpensive; wildlife and storage losses are controlled; labor is considered recreational or educational; and the crop also provides stalks for compost, garden structure, shade, or seasonal interest. Any savings calculation must compare dry, usable grain with purchased feed rather than comparing fresh ear weight with bagged feed."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for grain composition, poultry energy value, amino-acid limitations, mineral limitations, mycotoxin hazards, and commercial production principles; moderate for home-garden cultivation; limited for backyard grain yield, labor-adjusted savings, and informal supplementation amounts for laying hens",

      sources: [
        {
          title: "Maize Grain",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/node/556",
          use:
            "Field-corn terminology, feed use, grain processing, starch, protein, fat, fiber, calcium, phosphorus, amino-acid limitations, poultry energy value, pigments, storage concerns, and mycotoxin hazards"
        },

        {
          title: "Corn in Poultry Diets",
          organization:
            "Small and Backyard Poultry Extension",
          url:
            "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/cereal-grains-for-poultry-diets/corn-in-poultry-diets/",
          use:
            "Corn as a poultry-feed grain, energy contribution, yellow-corn pigments, and the need to balance corn with protein, minerals, and vitamins"
        },

        {
          title: "Corn Planting",
          organization:
            "University of Minnesota Extension",
          url:
            "https://extension.umn.edu/corn-growing/corn-planting",
          use:
            "Soil temperature, planting date, planting depth, establishment, population, and field-corn management"
        },

        {
          title: "Corn Production Handbook",
          organization:
            "Kansas State University Research and Extension",
          url:
            "https://bookstore.ksre.ksu.edu/pubs/c560.pdf",
          use:
            "Corn growth, soil and fertility needs, water stress, pollination, maturity, harvest, and production risks"
        },

        {
          title: "Aflatoxin in Corn",
          organization:
            "Iowa State University Extension and Outreach",
          url:
            "https://crops.extension.iastate.edu/cropnews/aflatoxin",
          use:
            "Drought and insect stress, Aspergillus infection, grain sampling, testing, storage, and livestock-feed safety"
        },

        {
          title: "Mycotoxins in Corn",
          organization:
            "University and Cooperative Extension grain-quality resources",
          url:
            "https://www.extension.purdue.edu/extmedia/BP/BP-47.html",
          use:
            "Fumonisins, deoxynivalenol, zearalenone, aflatoxins, ear rots, grain inspection, testing, drying, and safe handling"
        },

        {
          title: "Grain Drying, Handling, and Storage",
          organization:
            "North Dakota State University Extension",
          url:
            "https://www.ndsu.edu/agriculture/ag-hub/ag-topics/crop-production/drying-storing-and-handling-grain",
          use:
            "Drying, cooling, aeration, moisture management, insect prevention, and stored-grain monitoring"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Keep this record specific to mature field corn grown for dry grain rather than sweet corn, popcorn, silage, corn gluten meal, distillers grains, or green forage.",
        "Verify a beginner-appropriate minimum block size and row arrangement for dependable pollination.",
        "Find credible small-plot grain yield data before filling plants-per-area or yield-per-area fields.",
        "Do not use national or state bushels-per-acre averages as direct backyard-garden yield estimates.",
        "Research open-pollinated versus hybrid field corn for backyard growers, including seed saving, uniformity, maturity, disease resistance, and yield.",
        "Identify short-season varieties suitable for northern gardens and disease-resistant varieties suited to humid Southern regions.",
        "Verify safe grain-moisture targets for ear storage and shelled-kernel storage under noncommercial conditions.",
        "Develop a clear home-scale decision tree for discard versus laboratory mycotoxin testing.",
        "Research whether intact dried ears or shelled grain are safer and more practical for small-flock storage.",
        "Determine whether whole kernels should be limited by bird age or size and when cracking improves practical consumption.",
        "Do not recommend a fixed dietary inclusion percentage until the complete ration, flock age, production status, and nutrient balance are known.",
        "Compare field corn with sorghum, millet, oats, wheat, and purchased scratch grain on energy, protein, labor, water, storage, and cost.",
        "Calculate scores only after multiple grain crops have comparable evidence and complete data.",
        "Plant-density estimates use midpoint spacing of approximately 10 inches between plants and 33 inches between rows; successful grain production also requires a compact block arrangement for dependable wind pollination."

         ]
    },

    plannerData: {
      schemaVersion:
        "1.0.0",

      developmentStatus:
        "ready",

      identity: {
        plannerName:
          "Field Corn",

        shortLabel:
          "Field Corn",

        icon:
          "🌽",

        cropCategory:
          "annual-grain",

        primaryFeedCategory:
          "high-energy-grain",

        guideUrl:
          "growing-field-corn-for-chickens.html"
      },

      lifecycle: {
        growthCycle:
          "annual",

        isAnnual: true,
        isBiennial: false,
        isPerennial: false,
        isTreeOrShrub: false,

        yearsToFirstUsefulHarvest: 0,

        yearsToFullProduction: 0,

        expectedUsefulLifeYears: 1,

        regrowsAfterHarvest: false,

        permanentPlantingRequired: false,

        reversibleAfterOneSeason: true
      },

      climate: {
        suitableClimateTypes: [
          "cool-moderate-summer",
          "temperate",
          "hot-humid",
          "hot-dry",
          "mild-winter"
        ],

        preferredClimateTypes: [
          "temperate",
          "hot-humid",
          "mild-winter"
        ],

        challengingClimateTypes: [
          "cold-short-summer",
          "high-elevation"
        ],

        minimumFrostFreeDays: 90,

        preferredFrostFreeDays: 120,

        minimumSoilTemperatureF: 50,

        preferredSoilTemperatureF: 60,

        daysToMaturityMinimum: 85,

        daysToMaturityMaximum: 130,

        dryDownBufferDays: 21,

        heatToleranceScore: 4,

        droughtClimateToleranceScore: 3,

        humidityToleranceScore: 4,

        coolSummerToleranceScore: 2,

        frostSensitivityScore: 5,

        winterHardinessRequired: false,

        seasonExtensionBenefits: [
          "Warm soil at planting improves emergence.",
          "Selecting an early-maturing variety can improve reliability in short-season regions.",
          "Starting transplants is possible on a tiny scale but is generally inefficient for a grain block.",
          "A longer frost-free period provides more time for kernels and ears to dry before harvest.",
          "Protected postharvest drying can reduce dependence on perfect field-drying weather."
        ],

        indoorSeedStartingBenefitScore: 1,

        directFacts: {
          seasonType:
            "warm-season-annual",

          frostSensitive: true,

          commonlyDirectSeeded: true,

          winterDormancyPossible: false,

          heatDormancyPossible: false,

          windPollinated: true,

          blockPollinationImportant: true,

          notes: [
            "Field Corn is a frost-sensitive warm-season annual.",
            "Seed is normally planted directly after soil warms.",
            "Corn relies on wind to move pollen from tassels to silks.",
            "Compact blocks generally pollinate more reliably than one or two long rows.",
            "The crop needs enough frost-free time for grain maturity plus field or protected drying.",
            "Early varieties can improve reliability in northern and high-elevation gardens.",
            "Heat is usually tolerated when water is available during critical growth stages.",
            "Drought during tasseling, silking, and kernel fill can sharply reduce yield."
          ]
        }
      },

      site: {
        absoluteMinimumSunHours: 6,

        productiveMinimumSunHours: 7,

        preferredSunHours: 9,

        shadeToleranceScore: 1,

        afternoonShadeBenefitInHeat: 1,

        windToleranceScore: 3,

        lodgingRiskScore: 4,

        reflectedHeatToleranceScore: 4,

        airflowRequirementScore: 4,

        frostPocketSensitivityScore: 5,

        treeRootCompetitionToleranceScore: 1,

        hardscapeConflictRiskScore: 2,

        structureConflictRiskScore: 3,

        utilityConflictRiskScore: 3,

        fruitDropMessRiskScore: 1,

        stainingRiskScore: 1,

        directFacts: {
          preferredLight:
            "full-sun",

          productiveSunGuidance:
            "At least 7 hours of direct sunlight, with approximately 8 to 10 hours preferred for dependable grain yield and strong stalk development.",

          windExposureConcern: true,

          growthHabit:
            "tall-upright-single-stalk",

          matureHeightFtMinimum: 5,

          matureHeightFtMaximum: 12,

          floweringPollinatorTraffic:
            false,

          notes: [
            "Field Corn performs poorly in meaningful shade.",
            "Tall stalks may lodge or break during severe wind and storms.",
            "The crop can shade shorter plants and nearby beds.",
            "A sunny open block supports both photosynthesis and wind pollination.",
            "Planting immediately beside trees can create strong root and light competition.",
            "Corn should not obstruct windows, paths, road visibility, utility access, or solar equipment.",
            "Airflow helps foliage and ears dry after rain, but exposed sites may increase lodging."
          ]
        }
      },

      soil: {
        textureScores: {
          heavyClay: 3,
          clayLoam: 5,
          loam: 5,
          sandyLoam: 4,
          verySandy: 2,
          rocky: 1
        },

        drainageRequirementScore: 4,

        temporaryWetToleranceScore: 2,

        waterloggingSensitivityScore: 4,

        minimumSoilDepthIn: 18,

        preferredSoilDepthIn: 30,

        compactionToleranceScore: 2,

        establishmentInSodDifficultyScore: 5,

        preferredPHMinimum: 5.8,

        preferredPHMaximum: 7.0,

        survivalPHMinimum: null,

        survivalPHMaximum: null,

        fertilityRequirementScore: 5,

        nitrogenRequirementScore: 5,

        phosphorusRequirementScore: 4,

        potassiumRequirementScore: 5,

        benefitsFromInoculation: false,

        inoculantType: null,

        saltToleranceScore: 2,

        amendmentEffortScore: 4,

        directFacts: {
          preferredDrainage:
            "well-drained-and-moisture-retentive",

          preferredTextures: [
            "loam",
            "clay loam",
            "fertile sandy loam"
          ],

          nitrogenFixingLegume: false,

          inoculationMayImproveNodulation:
            false,

          fibrousRooted: true,

          waterloggedSoilSuitable:
            false,

          notes: [
            "Field Corn is a relatively heavy feeder.",
            "Deep fertile soil supports tall plants and grain fill.",
            "Nitrogen availability strongly affects growth and yield.",
            "Phosphorus and potassium remain important for root growth, stalk strength, and grain production.",
            "Poor drainage and saturated soil can reduce root function and stand strength.",
            "Compaction and shallow rock restrict the root system.",
            "Very sandy soil may require more frequent irrigation and nutrient management.",
            "Corn does not fix nitrogen.",
            "Soil testing is preferable to applying fertilizer by guesswork."
          ]
        }
      },

      water: {
        overallWaterRequirementLevel:
          "moderate-high",

        germinationWaterNeedLevel:
          "moderate",

        establishmentWaterNeedLevel:
          "moderate",

        matureWaterNeedLevel:
          "moderate-high",

        floweringWaterNeedLevel:
          "very-high",

        harvestDevelopmentWaterNeedLevel:
          "high",

        droughtSurvivalScore: 3,

        droughtYieldRetentionScore: 2,

        criticalGrowthStages: [
          "germination",
          "rapid-vegetative-growth",
          "tasseling",
          "silking",
          "pollination",
          "kernel-fill"
        ],

        criticalStageWaterImportanceScore: 5,

        overwateringSensitivityScore: 3,

        waterloggingSensitivityScore: 4,

        dripIrrigationBenefitScore: 5,

        mulchBenefitScore: 4,

        suitableForRainfallOnlyScore: 3,

        suitableForLimitedIrrigationScore: 2,

        containerDryingRiskScore: 5,

        establishmentYearsRequiringExtraWater: 0,

        directFacts: {
          establishmentMoistureImportant:
            true,

          tasselingAndSilkingWaterCritical:
            true,

          kernelFillWaterImportant:
            true,

          standingWaterSuitable:
            false,

          irrigationCanProtectYield:
            true,

          notes: [
            "Corn needs dependable moisture during rapid growth.",
            "Water stress near tasseling and silking can cause incomplete pollination and poorly filled ears.",
            "Kernel fill also requires adequate moisture.",
            "Established plants may survive moderate drought while producing little usable grain.",
            "Drip or soaker irrigation can supply water without constantly wetting foliage.",
            "Mulch can reduce evaporation after soil warms.",
            "Prolonged saturated soil remains harmful.",
            "Field Corn is generally less reliable than Sorghum or Millet where irrigation is severely limited."
          ]
        }
      },

      space: {
        minimumTrialAreaSqFt: 64,

        minimumUsefulAreaSqFt: 100,

        preferredProductionAreaSqFt: 300,

        smallSpaceScore: 1,

        mediumSpaceScore: 4,

        largeSpaceScore: 5,

        layoutScores: {
          squareBlock: 5,
          wideRectangle: 5,
          longStrip: 2,
          irregular: 2,
          smallBeds: 2,
          openField: 5
        },

        spaceTypeScores: {
          inGround: 5,
          raisedBed: 2,
          container: 1,
          fenceLine: 1,
          buildingEdge: 2,
          unusedLawn: 4,
          openField: 5,
          orchard: 1,
          forageFrame: 1,
          rotationalPaddock: 2,
          greenhouse: 1,
          hedgerow: 1
        },

        minimumContainerGallons: null,

        containerUseLimitation:
          "Corn may produce decorative or limited ears in very large containers, but restricted roots, high water demand, poor block pollination, and low yield make containers inefficient for chicken-feed grain.",

        minimumRaisedBedDepthIn: 18,

        vineSpreadRequired: false,

        verticalSupportBenefitScore: 1,

        blockPlantingRequired: true,

        minimumBlockRows: 4,

        continuousStandPreferred: true,

        heightCategory:
          "very-tall",

        matureWidthCategory:
          "narrow-upright-block",

        overflowSpaceBenefitScore: 5,

        directFacts: {
          denseStandSuitable: true,

          compactBlockRequired:
            true,

          windPollinationImportant:
            true,

          containerFeedProductionEfficient:
            false,

          raisedBedFeedProductionEfficient:
            false,

          notes: [
            "Corn should generally be planted in a compact block rather than one isolated row.",
            "Four or more short rows are preferable to one long row for wind pollination.",
            "The crop requires more useful area than Kale, Cowpea, or container crops.",
            "A small trial block can demonstrate growth but may produce little grain for a flock.",
            "Open in-ground plots are the strongest fit.",
            "Tall stalks may shade nearby vegetables.",
            "The estimated area values are planning thresholds rather than guaranteed feed-production levels.",
            "Actual useful yield depends on spacing, population, fertility, pollination, water, variety, and wildlife losses."
          ]
        }
      },

      flock: {
        suitableForAdultChickens: true,

        suitableForYoungChicks: false,

        flockPurposeScores: {
          eggs: 4,
          meat: 4,
          breeding: 3,
          petsEnrichment: 4,
          homestead: 5,
          mixed: 5
        },

        feedingMethodScores: {
          livingGrazing: 1,
          cutAndCarry: 1,
          wholeProduce: 3,
          wholeSeedHeads: 5,
          wholeGrain: 5,
          processedGrain: 5,
          heatTreated: 2,
          driedForage: 1,
          winterStorage: 5
        },

        directRunSuitabilityScore: 1,

        forageFrameSuitabilityScore: 1,

        rotationalPaddockSuitabilityScore: 1,

        confinedFlockValueScore: 5,

        pasturedFlockValueScore: 3,

        treatDilutionRiskScore: 5,

        highEnergySupplement: true,

        highFiberSupplement: false,

        concentratedFatSource: false,

        primaryFlockUses: [
          "Whole dried ears for enrichment",
          "Shelled whole dry kernels",
          "Cracked or coarsely ground grain",
          "High-energy winter supplementation",
          "Shelf-stable homestead grain"
        ],

        unsuitablePrimaryUses: [
          "Complete-ration replacement",
          "Primary protein supplement",
          "Living forage",
          "Fresh leafy greens",
          "Primary young-chick feed",
          "Feeding moldy or inadequately dried grain"
        ],

        directFacts: {
          edibleFeedParts: [
            "Mature dry kernels",
            "Whole dried ears",
            "Properly cracked or ground dry grain"
          ],

          preferredBirdStage:
            "Adult chickens",

          cropSurvivalWithDirectChickenAccess:
            "poor",

          directAccessTiming:
            "Keep chickens out of the growing block until harvest because they may damage seedlings, roots, ears, and soil structure.",

          nutritionalOrientation: [
            "energy",
            "high-carbohydrate",
            "grain",
            "winter-storage",
            "enrichment"
          ],

          balancedFeedReplacement:
            false,

          notes: [
            "Field Corn is primarily an energy grain.",
            "It is relatively low in several amino acids and does not constitute a balanced poultry ration by itself.",
            "Whole dry kernels may be consumed by adult chickens when appropriately sized and accompanied by grit.",
            "Cracking or coarse grinding may improve access but increases surface area and storage risk.",
            "Whole dried ears provide pecking enrichment.",
            "Corn should be offered as a measured supplement rather than free-choice replacement for complete feed.",
            "Young chicks should continue receiving a complete age-appropriate ration.",
            "Moldy, musty, insect-damaged, heated, or questionable grain should not be fed."
          ]
        }
      },

      labor: {
        beginnerFriendlinessScore: 3,

        plantingEaseScore: 4,

        establishmentEaseScore: 3,

        routineMaintenanceEaseScore: 3,

        weedControlEaseScore: 3,

        wildlifeProtectionEaseScore: 2,

        harvestEaseScore: 3,

        grainProcessingEaseScore: 2,

        dryingEaseScore: 2,

        storageMonitoringEaseScore: 3,

        physicalAccessibilityScore: 3,

        heavyLiftingRiskScore: 3,

        weeklyLaborLevel:
          "moderate",

        peakWorkloadLevel:
          "high",

        harvestFrequencyCategory:
          "major",

        requiredPlantingTasks: [
          "prepare-seedbed",
          "plant-large-seed",
          "plant-compact-block"
        ],

        optionalPlantingTasks: [
          "install-irrigation",
          "apply-fertilizer",
          "install-wildlife-protection"
        ],

        requiredMaintenanceTasks: [
          "weed",
          "monitor-water",
          "monitor-pollination"
        ],

        optionalMaintenanceTasks: [
          "side-dress-nitrogen",
          "hill-soil",
          "protect-from-wildlife"
        ],

        requiredHarvestTasks: [
          "harvest-ears"
        ],

        usePathProcessingTasks: {
          wholeDriedEars: [
            "harvest-ears",
            "dry"
          ],

          shelledWholeGrain: [
            "harvest-ears",
            "dry",
            "shell-corn",
            "clean-sort"
          ],

          crackedOrGroundGrain: [
            "harvest-ears",
            "dry",
            "shell-corn",
            "clean-sort",
            "crack-grain"
          ]
        },

        requiredStorageTasks: [
          "inspect-moisture",
          "inspect-mold",
          "inspect-insects",
          "inspect-rodents"
        ],

        specializedEquipmentRequired: [],

        specializedEquipmentHelpful: [
          "fencing",
          "bird-netting",
          "corn-sheller",
          "grain-cracker",
          "grain-mill",
          "drying-rack",
          "fan",
          "moisture-meter",
          "metal-grain-can",
          "food-safe-bucket",
          "drip-irrigation"
        ],

        suitableForLowTimeUsersScore: 2,

        suitableForSoloGrowersScore: 3,

        directFacts: {
          seedSize:
            "large",

          directSeedingSuitable: true,

          specializedHarvestEquipmentRequiredForBackyardScale:
            false,

          majorLaborBottlenecks: [
            "Preparing enough block area",
            "Maintaining fertility",
            "Supplying water during tasseling and silking",
            "Protecting ears from wildlife",
            "Harvesting and handling bulky ears",
            "Drying grain safely",
            "Shelling kernels",
            "Cracking or grinding if desired",
            "Protecting stored grain from insects and rodents"
          ],

          notes: [
            "Planting individual kernels is straightforward.",
            "The primary difficulty is producing enough well-pollinated grain to justify the area.",
            "Harvest and processing occur in a concentrated seasonal workload.",
            "Whole-ear feeding requires less processing than shelled grain.",
            "A hand sheller can reduce labor at moderate backyard scale.",
            "Grinding equipment is optional unless the selected use path requires it.",
            "Storage management is essential because grain can mold or attract pests."
          ]
        }
      },

      cost: {
        seedOrPlantCostLevel:
          "low",

        soilPreparationCostLevel:
          "moderate",

        irrigationCostLevel:
          "moderate-high",

        protectionCostLevel:
          "moderate-high",

        processingEquipmentCostLevel:
          "moderate",

        storageCostLevel:
          "moderate",

        annualRecurringCostLevel:
          "moderate",

        longTermValueScore: 3,

        lowestCostUsePath:
          "whole-dried-field-corn-ears",

        highestCostUsePath:
          "cracked-or-ground-field-corn",

        likelyCostDrivers: [
          "Fertilizer or compost",
          "Irrigation",
          "Wildlife protection",
          "Drying equipment",
          "Corn sheller",
          "Grain cracker or mill",
          "Moisture meter",
          "Rodent-proof containers",
          "Annual seed and soil preparation"
        ],

        costReductionOptions: [
          "Feed whole dried ears rather than shelling every kernel.",
          "Use an adapted open-pollinated variety where seed saving is a goal.",
          "Use existing irrigation and fencing.",
          "Plant a trial block before committing a large area.",
          "Store whole dry kernels rather than grinding far in advance.",
          "Compare home production costs with purchased grain."
        ],

        directFacts: {
          specializedPlantingEquipmentRequired:
            false,

          specializedBackyardHarvestEquipmentRequired:
            false,

          specializedProcessingEquipmentRequired:
            false,

          notes: [
            "Field Corn seed is inexpensive, but the full production system may not be.",
            "Fertility, water, protection, drying, processing, and storage can exceed the seed cost.",
            "Corn must be replanted every year.",
            "Whole-ear use lowers processing expense.",
            "Purchased grain may cost less than home production where land or water is scarce.",
            "Cost classifications are qualitative rather than current retail-price estimates."
          ]
        }
      },

      goals: {
        feedReductionScore: 5,

        energyProductionScore: 5,

        proteinOrientedScore: 2,

        freshGreensScore: 1,

        livingForageScore: 1,

        winterStorageScore: 5,

        enrichmentScore: 5,

        resilienceScore: 3,

        soilImprovementScore: 2,

        nitrogenFixationScore: 0,

        groundCoverScore: 2,

        erosionControlScore: 2,

        shadeScore: 2,

        privacyScreeningScore: 4,

        pollinatorSupportScore: 1,

        compostBiomassScore: 5,

        householdFoodScore: 2,

        seedSavingScore: 5,

        selfRelianceScore: 5,

        multipurposeValueScore: 4,

        visualAppealScore: 3,

        productionReliabilityScore: 4,

        fastestValueScore: 2,

        nonElectricStorageScore: 5,

        smallFlockValueScore: 4,

        largeFlockValueScore: 5,

        primaryGoalMatches: [
          "reduce-feed-use",
          "high-energy",
          "winter-storage",
          "enrichment",
          "seed-saving",
          "self-reliance",
          "compost-biomass"
        ],

        weakGoalMatches: [
          "protein-oriented",
          "fresh-greens",
          "living-forage",
          "nitrogen-fixation",
          "pollinators",
          "container-production",
          "partial-shade"
        ],

        directFacts: {
          nitrogenFixingLegume: false,

          annualEnergyGrain: true,

          wholeEarEnrichmentPotential:
            true,

          longTermDryStoragePotential:
            true,

          seedSavingPotential:
            true,

          notes: [
            "Field Corn is among the strongest high-energy grain crops in the initial planner database.",
            "Whole dry kernels and ears can store for extended periods when moisture is controlled.",
            "The crop can contribute substantially to self-reliance where adequate land, fertility, water, labor, and storage are available.",
            "It is not a protein-oriented crop.",
            "It does not fix nitrogen.",
            "Stalks and leaves can contribute compost biomass after harvest.",
            "The large area and annual input requirements reduce its suitability for many small gardens."
          ]
        }
      },

      risks: {
        wildlife: {
          wildBirds: 5,
          deer: 5,
          raccoons: 5,
          squirrels: 5,
          rabbits: 2,
          rodents: 5,
          groundhogs: 4
        },

        insectsRiskScore: 5,

        diseaseRiskScore: 4,

        lodgingRiskScore: 4,

        fieldMoldRiskScore: 5,

        dryingMoldRiskScore: 5,

        storageMoldRiskScore: 5,

        storedInsectRiskScore: 5,

        spoilageSpeedRiskScore: 2,

        invasivenessConcernRiskScore: 1,

        selfSeedingRiskScore: 2,

        fruitDropRiskScore: 1,

        cropFailureRiskScore: 4,

        stormDamageRiskScore: 5,

        shadingOtherCropsRiskScore: 5,

        overfeedingRiskScore: 5,

        treatedSeedRiskScore: 5,

        primaryRisks: [
          {
            id:
              "poor-block-pollination",

            severity:
              "very-high",

            affectedStages: [
              "tasseling",
              "silking",
              "pollination",
              "kernel-development"
            ],

            mitigationOptions: [
              "Plant at least four short rows",
              "Use a compact block",
              "Plant one variety together",
              "Avoid highly staggered planting",
              "Hand-pollinate a tiny block if necessary"
            ],

            note:
              "Sparse or single-row planting can produce ears with many missing kernels."
          },

          {
            id:
              "water-stress-at-pollination",

            severity:
              "very-high",

            affectedStages: [
              "tasseling",
              "silking",
              "pollination",
              "kernel-fill"
            ],

            mitigationOptions: [
              "Irrigate during dry weather",
              "Mulch after soil warms",
              "Maintain soil organic matter",
              "Select an adapted maturity class",
              "Reduce plant population under severe water limits"
            ],

            note:
              "Drought at tasseling and silking can sharply reduce grain yield."
          },

          {
            id:
              "wildlife-ear-loss",

            severity:
              "very-high",

            affectedStages: [
              "milk-stage",
              "dough-stage",
              "grain-maturity"
            ],

            mitigationOptions: [
              "Use fencing",
              "Use electric fencing where appropriate",
              "Use netting or exclusion",
              "Harvest promptly",
              "Monitor frequently"
            ],

            note:
              "Raccoons, squirrels, deer, birds, and rodents may destroy ears before harvest."
          },

          {
            id:
              "field-and-storage-mold",

            severity:
              "very-high",

            affectedStages: [
              "ear-development",
              "field-dry-down",
              "postharvest-drying",
              "storage"
            ],

            mitigationOptions: [
              "Use adapted disease-resistant varieties",
              "Harvest damaged ears separately",
              "Dry promptly",
              "Measure moisture",
              "Store only sound dry grain",
              "Inspect regularly"
            ],

            note:
              "Mold and associated toxins can make grain unsafe even when damage is not dramatic."
          },

          {
            id:
              "incomplete-drying",

            severity:
              "very-high",

            affectedStages: [
              "harvest",
              "drying",
              "storage"
            ],

            mitigationOptions: [
              "Dry ears with airflow",
              "Shell only after adequate drying",
              "Use a moisture meter when possible",
              "Do not seal warm or damp grain",
              "Recheck stored grain"
            ],

            note:
              "Grain stored too wet may heat, mold, and spoil."
          },

          {
            id:
              "stored-grain-insects-and-rodents",

            severity:
              "very-high",

            affectedStages: [
              "storage"
            ],

            mitigationOptions: [
              "Use pest-resistant containers",
              "Clean storage areas",
              "Cool dry grain",
              "Inspect frequently",
              "Discard contaminated grain"
            ],

            note:
              "Dry Corn remains attractive to insects and rodents."
          },

          {
            id:
              "lodging-and-storm-damage",

            severity:
              "high",

            affectedStages: [
              "rapid-growth",
              "tasseling",
              "grain-fill",
              "maturity"
            ],

            mitigationOptions: [
              "Avoid excessive nitrogen",
              "Use adapted varieties",
              "Maintain potassium",
              "Avoid overly dense stands",
              "Harvest after maturity without unnecessary delay"
            ],

            note:
              "Tall plants and grain-filled ears can lodge during storms."
          },

          {
            id:
              "treated-seed",

            severity:
              "very-high",

            affectedStages: [
              "planting",
              "feeding"
            ],

            mitigationOptions: [
              "Use untreated seed where poultry could access it",
              "Keep treated seed labeled and secured",
              "Never feed planting seed"
            ],

            note:
              "Chemically treated seed must never be fed to chickens."
          },

          {
            id:
              "balanced-feed-displacement",

            severity:
              "very-high",

            affectedStages: [
              "feeding"
            ],

            mitigationOptions: [
              "Continue complete poultry feed",
              "Measure supplemental grain",
              "Avoid unrestricted scratch-grain feeding",
              "Monitor body condition and egg production"
            ],

            note:
              "Excess Corn can dilute protein, vitamins, minerals, and amino-acid balance."
          }
        ],

        directFacts: {
          pollinationConcern: true,

          droughtAtSilkingConcern: true,

          wildlifeEarLossConcern: true,

          mycotoxinConcern: true,

          storagePestConcern: true,

          lodgingConcern: true,

          notes: [
            "Field Corn combines significant production potential with substantial pollination, wildlife, drying, and storage risks.",
            "Sound appearance alone does not prove freedom from harmful mold toxins.",
            "Damaged, moldy, musty, heated, insect-contaminated, or questionable grain should not be fed.",
            "Whole grain should remain supplemental to balanced poultry feed.",
            "The crop is most suitable for growers prepared to manage an actual grain-production and storage system."
          ]
        }
      },

      seasonalRoles: {
        earlySpring: false,

        lateSpring: true,

        summer: true,

        lateSummer: true,

        fall: true,

        winterStorage: true,

        perennial: false,

        plantingWindows: [
          {
            id:
              "warm-soil-direct-seeding",

            trigger:
              "after-frost-and-soil-warming",

            offsetWeeksMinimum: 1,

            offsetWeeksMaximum: 4,

            soilCondition:
              "warm-moist-and-workable",

            method:
              "direct-seed-compact-block",

            note:
              "Plant after frost danger when soil temperature supports rapid emergence."
          }
        ],

        harvestWindows: [
          {
            id:
              "whole-dried-ears",

            trigger:
              "physiological-maturity-and-dry-down",

            usePathId:
              "whole-dried-field-corn-ears",

            note:
              "Harvest mature ears and continue drying under cover before storage or feeding."
          },

          {
            id:
              "shelled-whole-grain",

            trigger:
              "fully-dried-ears",

            usePathId:
              "shelled-whole-field-corn",

            note:
              "Shell only after ears and kernels are adequately dry."
          },

          {
            id:
              "cracked-or-ground-grain",

            trigger:
              "clean-dry-shelled-grain",

            usePathId:
              "cracked-or-ground-field-corn",

            note:
              "Process small quantities and protect the increased exposed surface area from moisture and rancidity."
          }
        ],

        cropSequenceRoles: [
          "Warm-season energy grain",
          "Winter-storage crop",
          "Whole-ear enrichment crop",
          "Annual self-reliance grain",
          "Postharvest compost-biomass crop"
        ],

        seasonalLimitations: [
          "Frost kills active plants",
          "Short seasons may not allow full grain maturity",
          "Pollination requires synchronized tassels and silks",
          "Wet autumn weather complicates dry-down",
          "Stored grain requires year-round monitoring"
        ],

        directFacts: {
          warmSeasonAnnual: true,

          directSeedingPreferred: true,

          compactBlockPollinationRequired:
            true,

          grainDryDownRequired: true,

          winterStoragePossible: true,

          notes: [
            "Field Corn is planted after soil warms.",
            "Vegetative growth accelerates during warm summer weather.",
            "Tasseling and silking must overlap for good pollination.",
            "Ears mature in late summer or fall depending on variety and planting date.",
            "Field drying may need to be completed under cover.",
            "Dry grain can provide winter value after the annual crop dies."
          ]
        }
      },

      usePaths: [
        {
          id:
            "whole-dried-field-corn-ears",

          label:
            "Whole Dried Field-Corn Ears",

          description:
            "Mature Field-Corn ears are harvested, dried thoroughly, inspected, and offered whole for adult-chicken pecking enrichment.",

          primaryFeedRole:
            "whole-ear-energy-enrichment",

          harvestProducts: [
            "dried-corn-ears",
            "whole-corn-ears",
            "whole-seed-heads",
            "stored-enrichment"
          ],

          suitableFeedingMethods: [
            "whole-seed-heads",
            "whole-produce",
            "pecking-enrichment",
            "winter-supplement"
          ],

          requiredProcessingTasks: [
            "harvest-ears",
            "dry"
          ],

          optionalProcessingTasks: [
            "remove-husks",
            "clean-sort"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "drying-rack",
            "fan",
            "moisture-meter",
            "rodent-proof-storage"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "single-seasonal",

          storageMethods: [
            "dry-whole-ears"
          ],

          preferredStorageMethod:
            "cool-dry-ventilated-and-rodent-protected",

          storageDurationCategory:
            "long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: true,

          curingRequired: false,

          shellingRequired: false,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,

          rodentRiskScore: 5,

          storedInsectRiskScore: 4,

          harvestEaseScore: 4,

          preparationEaseScore: 4,

          beginnerSuitabilityScore: 3,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Dry ears thoroughly before storage.",
            "Inspect cobs and kernels for mold, insects, rodent contamination, heating, and musty odor.",
            "Discard questionable ears.",
            "Whole ears are supplemental enrichment, not complete feed.",
            "Provide appropriate grit."
          ],

          incompatibleUserTraits: [
            "has-no-drying-capability",
            "has-no-rodent-protection",
            "requires-immediate-fresh-greens",
            "has-no-block-growing-space"
          ]
        },

        {
          id:
            "shelled-whole-field-corn",

          label:
            "Shelled Whole Field-Corn Grain",

          description:
            "Fully dried ears are shelled, cleaned, and stored as whole dry kernels for measured adult-chicken supplementation.",

          primaryFeedRole:
            "whole-energy-grain",

          harvestProducts: [
            "dry-grain",
            "corn-kernels",
            "whole-grain",
            "stored-grain"
          ],

          suitableFeedingMethods: [
            "whole-grain",
            "measured-supplement",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "harvest-ears",
            "dry",
            "shell-corn",
            "clean-sort"
          ],

          optionalProcessingTasks: [
            "winnow"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "corn-sheller",
            "fan",
            "moisture-meter",
            "metal-grain-can",
            "food-safe-bucket"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "single-seasonal",

          storageMethods: [
            "dry-whole-grain"
          ],

          preferredStorageMethod:
            "cool-dry-airtight-and-pest-resistant",

          storageDurationCategory:
            "long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: true,

          curingRequired: false,

          shellingRequired: true,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,

          rodentRiskScore: 5,

          storedInsectRiskScore: 5,

          harvestEaseScore: 3,

          preparationEaseScore: 2,

          beginnerSuitabilityScore: 2,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Shell only fully dried ears.",
            "Store only clean, sound, dry kernels.",
            "Inspect for mold, insects, rodents, moisture, and heating.",
            "Do not feed damaged or questionable grain.",
            "Whole Corn is supplemental to complete poultry feed.",
            "Provide appropriate grit."
          ],

          incompatibleUserTraits: [
            "declines-shelling",
            "has-no-drying-capability",
            "has-no-dry-storage",
            "has-no-rodent-protection",
            "requires-minimal-processing"
          ]
        },

        {
          id:
            "cracked-or-ground-field-corn",

          label:
            "Cracked or Coarsely Ground Field Corn",

          description:
            "Clean, fully dried, shelled Field Corn is cracked or coarsely ground shortly before feeding as a measured energy supplement.",

          primaryFeedRole:
            "processed-energy-grain",

          harvestProducts: [
            "cracked-grain",
            "ground-grain",
            "processed-corn",
            "dry-grain"
          ],

          suitableFeedingMethods: [
            "processed-grain",
            "measured-supplement",
            "ration-ingredient"
          ],

          requiredProcessingTasks: [
            "harvest-ears",
            "dry",
            "shell-corn",
            "clean-sort",
            "crack-grain"
          ],

          optionalProcessingTasks: [
            "winnow"
          ],

          requiredEquipment: [
            "grain-cracker"
          ],

          helpfulEquipment: [
            "corn-sheller",
            "grain-mill",
            "fan",
            "moisture-meter",
            "food-safe-bucket"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "process-in-small-batches",

          storageMethods: [
            "dry-whole-grain-before-processing",
            "short-term-processed-grain"
          ],

          preferredStorageMethod:
            "store-whole-and-process-small-batches",

          storageDurationCategory:
            "medium",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,

          freezingSuitable: false,

          dryingRequired: true,

          curingRequired: false,

          shellingRequired: true,

          threshingRequired: false,

          cookingRequired: false,

          grindingRequired: true,

          moistureSensitive: true,

          moldRiskScore: 5,

          rodentRiskScore: 5,

          storedInsectRiskScore: 4,

          harvestEaseScore: 2,

          preparationEaseScore: 1,

          beginnerSuitabilityScore: 2,

          householdFoodValueScore: 1,

          flockValueScore: 5,

          safetyWarnings: [
            "Process only sound dry grain.",
            "Grinding does not make moldy or contaminated grain safe.",
            "Store whole grain and process smaller batches where practical.",
            "Protect processed grain from moisture and pests.",
            "Use only as part of an appropriately balanced feeding program."
          ],

          incompatibleUserTraits: [
            "declines-shelling",
            "declines-grinding",
            "has-no-grain-cracker",
            "has-no-drying-capability",
            "requires-minimal-processing"
          ]
        }
      ],

      dataQuality: {
        overallConfidence: 0.82,

        verifiedFields: [
          "identity",
          "lifecycle",
          "climate.directFacts.seasonType",
          "climate.directFacts.windPollinated",
          "climate.directFacts.blockPollinationImportant",
          "site.directFacts.preferredLight",
          "soil.directFacts.nitrogenFixingLegume",
          "water.directFacts.tasselingAndSilkingWaterCritical",
          "space.directFacts.compactBlockRequired",
          "space.directFacts.windPollinationImportant",
          "flock.directFacts.edibleFeedParts",
          "flock.directFacts.nutritionalOrientation",
          "risks.directFacts.pollinationConcern",
          "risks.directFacts.mycotoxinConcern",
          "risks.directFacts.storagePestConcern",
          "seasonalRoles.directFacts.warmSeasonAnnual",
          "seasonalRoles.directFacts.grainDryDownRequired"
        ],

        derivedFields: [
          "climate",
          "site",
          "soil.textureScores",
          "water",
          "space",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "labor",
          "cost",
          "goals",
          "risks.wildlife",
          "usePaths.whole-dried-field-corn-ears",
          "usePaths.shelled-whole-field-corn",
          "usePaths.cracked-or-ground-field-corn"
        ],

        uncertainFields: [
          "climate.minimumFrostFreeDays",
          "climate.preferredFrostFreeDays",
          "climate.daysToMaturityMinimum",
          "climate.daysToMaturityMaximum",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "flock.portionGuidance",
          "usePaths.whole-dried-field-corn-ears.exactStorageDuration",
          "usePaths.shelled-whole-field-corn.exactStorageDuration"
        ],

        missingFields: [
          "flock.portionGuidance",
          "flock.usePathTesting"
        ],

        lastReviewed:
          "2026-07-15",

        primarySources: [
          {
            title:
              "Corn Production and Management",

            organization:
              "University Cooperative Extension crop-production resources",

            sourceType:
              "extension-grain-guide",

            use:
              "Planting temperature, population, fertility, pollination, irrigation, maturity, harvest, and grain production"
          },

          {
            title:
              "Corn Growth and Development",

            organization:
              "United States Department of Agriculture and land-grant universities",

            sourceType:
              "government-and-extension-reference",

            use:
              "Growth stages, tasseling, silking, kernel development, physiological maturity, and drought-sensitive stages"
          },

          {
            title:
              "Corn in Poultry Nutrition",

            organization:
              "Poultry-feed and animal-nutrition references",

            sourceType:
              "feed-nutrition-reference",

            use:
              "Energy value, protein limitations, amino-acid balance, whole and processed grain, and ration-dilution concerns"
          },

          {
            title:
              "Grain Drying, Handling, and Storage",

            organization:
              "University Cooperative Extension stored-grain resources",

            sourceType:
              "extension-storage-guide",

            use:
              "Moisture, drying, cooling, mold, mycotoxins, insect control, rodent protection, and storage monitoring"
          }
        ],

        notes: [
          "Field Corn plannerData is specific to Zea mays grown for mature dry grain rather than Sweet Corn harvested at the eating stage.",
          "The three use paths are whole dried ears, shelled whole grain, and cracked or coarsely ground grain.",
          "The crop is treated primarily as a high-energy supplement rather than a protein crop.",
          "Compact block planting is essential to its space scoring.",
          "No exact safe flock inclusion rate has been assigned.",
          "No medicinal claims are made.",
          "The crop should remain in testing until block-pollination, large-space grain, limited-water, whole-ear, shelling, processing, wildlife-loss, and humid-storage profiles are evaluated."
        ]
      }
    }
  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - SORGHUM
    //
    //
    //
    //
    //////////////////////////////////////////////

  "CROP-GRAIN-SORGHUM": {
    id: "CROP-GRAIN-SORGHUM",

    name: "Grain Sorghum (Milo)",
    scientificName: "Sorghum bicolor",

    category: "Drought-Tolerant Grain and Energy Crop",
    cropType: "Annual",
    seasonType: "Warm Season",

    status: "Initial Research Complete",

    summary:
      "Grain sorghum, commonly called milo, is a heat- and drought-tolerant cereal crop that produces small, storable seeds used as an energy ingredient in poultry and livestock feeds. It can be a practical alternative to corn in hot or water-limited regions, but varieties differ in tannin content, the grain is low in calcium and essential amino-acid balance, and mature seed must be dried and stored carefully.",

    chickenUse: {
      edibleParts: [
        "Mature dried grain",
        "Threshed whole seed",
        "Cracked or coarsely ground grain",
        "Whole mature seed heads offered as enrichment",
        "Sprouted grain from sound untreated seed"
      ],

      primaryValue: [
        "Carbohydrate energy",
        "Starch",
        "Moderate protein",
        "Dry grain storage",
        "Heat and drought resilience",
        "Foraging and pecking enrichment"
      ],

      feedingForms: [
        "Whole mature grain",
        "Cracked grain",
        "Coarsely ground grain",
        "Whole dried seed heads",
        "Sprouted grain",
        "A measured ingredient in a properly balanced poultry ration"
      ],

      bestFor: [
        "Adult chickens as an energy-oriented supplement",
        "Hot and drought-prone growing regions",
        "Warm-season feed gardens",
        "Growers seeking an alternative to field corn",
        "Dry winter storage",
        "Flocks receiving a nutritionally complete base ration"
      ],

      supplementOnly: true,

      preparationNotes:
        "Allow seed heads to mature fully and dry on the plant as weather permits. Cut the heads before excessive bird loss or prolonged wet weather, finish drying them under cover with strong airflow, and thresh the seed if desired. Clean and store only sound grain. Whole heads may be offered as enrichment, while cracking or coarse grinding may improve access and allow more even mixing with other ingredients.",

      safetyNotes:
        "Grain sorghum should not replace a balanced poultry ration by itself. It is primarily an energy grain and is low in calcium, available phosphorus, lysine, and other nutrients required by productive poultry. Select low-tannin or tannin-free grain varieties when the crop is intended for poultry feed because high-tannin grain can reduce palatability, protein digestion, and energy use. Do not feed moldy, musty, wet, insect-damaged, heated, sprouted-in-storage, or visibly deteriorated grain. Grain sorghum should not be confused with sorghum forage, sudangrass, sorghum-sudangrass hybrids, or stressed green sorghum plants, which may present prussic-acid or nitrate hazards."
    },

    nutrition: {
      basis:
        "Approximate mature grain-sorghum values expressed primarily on a dry-matter basis. Composition and poultry feeding value vary with variety, growing conditions, grain color, tannin concentration, test weight, processing method, and storage quality.",

      crudeProteinPercent:
        "Approximately 9% to 13% of dry matter, with values near 10% to 11% commonly reported for grain sorghum",

      fatPercent:
        "Approximately 3% to 4% of dry matter",

      fiberPercent:
        "Approximately 2% to 4% crude fiber on a dry-matter basis; fiber values vary with seed coat, analytical method, and processing",

      calciumPercent:
        "Very low; approximately 0.04% to 0.06% of dry matter in commonly reported feed tables",

      phosphorusPercent:
        "Approximately 0.30% to 0.35% of dry matter, but much of the phosphorus is associated with phytate and is not fully available to poultry",

      notableNutrients: [
        "Approximately 65% to 75% starch",
        "High carbohydrate-energy value",
        "Moderate crude protein",
        "Linoleic acid and other unsaturated fatty acids",
        "Phosphorus",
        "Magnesium",
        "Potassium",
        "Iron",
        "Zinc",
        "B vitamins",
        "Phenolic compounds in pigmented varieties"
      ],

      limitations: [
        "Low calcium content",
        "Protein is deficient in lysine and may also be limiting in threonine and other essential amino acids",
        "Most phosphorus is not fully available to poultry because it is associated with phytate",
        "Sorghum generally contains fewer yellow carotenoid pigments than yellow corn",
        "High-tannin varieties may reduce palatability, protein digestibility, and metabolizable-energy value",
        "Protein and starch digestibility vary among varieties",
        "Whole grain, ground grain, forage sorghum, sweet sorghum, sorghum silage, and sorghum byproducts have different nutritional values",
        "Heavy supplementation can dilute protein, calcium, vitamins, and minerals supplied by complete poultry feed",
        "Mold and mycotoxin contamination can make stored grain unsafe"
      ]
    },

    growing: {
      sunlight:
        "Full sun; generally at least 6 to 8 hours of direct sunlight daily",

      soilTemperatureMinimumF:
        "Approximately 60°F for dependable germination and establishment",

      idealSoilTemperatureF:
        "Approximately 65°F or warmer, with rapid germination generally occurring in warm soil",

      frostTolerance: "Very Low",

      heatTolerance: "High",

      droughtTolerance:
        "High compared with field corn and many other common grain crops, although prolonged drought during heading, flowering, pollination, and grain filling can reduce yield and grain quality",

      soilPHMinimum: 5.5,
      soilPHMaximum: 7.5,

      waterNeeds:
        "Low to moderate compared with field corn. Adequate moisture is important during germination, establishment, boot stage, flowering, pollination, and grain filling. Sorghum can pause growth and recover after some drought stress, but severe or prolonged stress still reduces production.",

      directSow: true,
      transplantRecommended: false,

      daysToFirstHarvestMinimum: null,
      daysToFirstHarvestMaximum: null,

      daysToMaturityMinimum: 90,
      daysToMaturityMaximum: 120,

      plantSpacingInches:
        "Usually planted densely rather than maintained as widely spaced individual garden plants; approximately 2 to 6 inches between plants may be appropriate in small hand-managed rows depending on variety, water availability, soil fertility, and row spacing",

      rowSpacingInches:
        "Approximately 20 to 30 inches for small hand-managed plots; narrower or wider rows may be used depending on rainfall, cultivation method, equipment, and intended plant population",

      plantingDepthInches:
        "Approximately 1 to 2 inches, with shallower planting in cool or moist soil and slightly deeper planting where surface soil is warm and dry",

      successionPlanting:
        "Limited. Additional plantings are possible only where sufficient warm, frost-free time remains for the selected variety to flower, fill grain, mature, and dry.",

      regrowthAfterHarvest:
        "Limited ratoon or tiller regrowth may occur in long, warm seasons, but a dependable second grain harvest should not be assumed in a beginner backyard system"
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Direct sow after frost danger has passed and soil has warmed to approximately 60°F or more. Select the earliest available grain-sorghum variety because cool nights and a short frost-free season may prevent dependable grain maturity.",
        harvestWindow:
          "Early fall before hard frost and prolonged cold rain. Mature seed heads may require additional drying under warm, well-ventilated cover."
      },

      midwestNortheast: {
        plantingWindow:
          "Plant in late spring after soil reaches approximately 60°F and warm weather is established. Earlier-maturing varieties are preferable in northern and northeastern areas.",
        harvestWindow:
          "Late summer through fall, after grain reaches maturity and dries sufficiently for harvest and storage."
      },

      upperSouth: {
        plantingWindow:
          "Plant from mid- to late spring after frost danger has passed and soil is consistently warm. Sorghum may be especially useful where summer heat or periodic drought makes corn less dependable.",
        harvestWindow:
          "Late summer through fall, depending on planting date and maturity group."
      },

      deepSouth: {
        plantingWindow:
          "Plant in spring after frost danger and after soil has warmed. Long growing seasons may permit a wider planting window, but flowering and grain filling should be timed to avoid the most severe drought, hurricane-season rain, or late-season disease pressure where possible.",
        harvestWindow:
          "Summer through fall. Prompt harvest and controlled drying may be necessary in humid climates."
      },

      southwest: {
        plantingWindow:
          "Plant after frost once soil reaches approximately 60°F or warmer. Grain sorghum is well suited to heat and limited rainfall, but irrigation during establishment and reproductive growth can improve yield.",
        harvestWindow:
          "Late summer through fall, depending on elevation, planting date, variety, and irrigation."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant after frost in the warmest available location once soil is approximately 60°F or warmer. Use an early variety in cool-summer or short-season areas.",
        harvestWindow:
          "Early fall before prolonged cool, wet weather. Grain may require additional drying after harvest."
      },

      coastalWest: {
        plantingWindow:
          "Plant when frost risk has passed and soil is consistently warm. Warmer inland valleys are generally more reliable for grain production than cool, foggy coastal locations.",
        harvestWindow:
          "Late summer through fall, depending on local heat accumulation and variety maturity."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet: 14,
      plantsPer50SquareFeet: 72,
      plantsPer100SquareFeet: 144,

      expectedYieldPerPlantMinimumLbs: null,
      expectedYieldPerPlantMaximumLbs: null,

      expectedYieldPer100SquareFeetMinimumLbs: null,
      expectedYieldPer100SquareFeetMaximumLbs: null,

      edibleYieldPercent: null,

      storageLife:
        "Potentially many months when mature grain is dried to a safe moisture level and protected from heat, condensation, insects, rodents, and mold",

      storageMethod:
        "Dry harvested seed heads thoroughly with strong airflow before threshing or storage. Clean shelled grain and store it in a cool, dry, dark location inside a sealed food-safe and rodent-resistant container. Avoid sealing grain while it is warm or damp. Inspect periodically for condensation, heating, insects, webbing, musty odor, discoloration, caking, or visible mold.",

      yieldNotes:
        "Plant-density estimates are calculated from midpoint spacing of approximately 4 inches between plants and 25 inches between rows, based on the practical spacing range used in this record. This produces estimated populations of approximately 14 plants per 10 square feet, 72 plants per 50 square feet, and 144 plants per 100 square feet. These values represent a manageable row-grown backyard planting rather than a maximum commercial population. Appropriate density varies with variety, rainfall, irrigation, soil fertility, row spacing, temperature, tillering, and expected drought stress. Commercial grain-sorghum yields should not be converted directly into backyard yield because small-plot production is also affected by weeds, birds, lodging, insects, disease, harvest timing, threshing efficiency, and final grain moisture."

    },

    economics: {
      seedCostEstimate:
        "Generally low to moderate, depending on whether seed is purchased as an agricultural hybrid, open-pollinated variety, food-grade grain, birdseed, organic seed, or a small garden packet",

      equipmentCostEstimate:
        "Low for direct sowing on a small plot. Optional expenses include soil testing, fertilizer, irrigation, bird netting, harvesting tools, drying screens or fans, threshing equipment, grain cleaning tools, moisture testing, and rodent-resistant storage containers.",

      irrigationCostLevel: "Low to Moderate",

      laborLevel:
        "Moderate to High when planting, weeding, protecting seed heads, harvesting, drying, threshing, cleaning, and storing are performed by hand",

      potentialFeedSavings: null,

      economicNotes:
        "Grain sorghum may have greater practical value than field corn in hot, dry regions because it can produce grain with less water and recover better from some drought stress. However, purchased grain may still cost less than home production when labor, bird protection, threshing, drying, cleaning, and storage are included. Economic value should be calculated from dry usable grain rather than whole seed-head weight."
    },

    scores: {
      easeOfGrowing: null,
      yieldPerSquareFoot: null,
      nutritionalUsefulness: null,
      proteinContribution: null,
      energyContribution: null,
      storageValue: null,
      smallSpaceSuitability: null,
      heatTolerance: null,
      coldTolerance: null,
      laborEfficiency: null,
      economicPotential: null,
      safetySimplicity: null
    },

    rankings: {
      practicalScore: null,
      nutritionalScore: null,
      bcpFeedScore: null
    },

    evidence: {
      evidenceStrength:
        "Strong for crop heat and drought adaptation, commercial production practices, grain composition, energy value, amino-acid limitations, tannin effects, and use in formulated poultry diets; moderate for home-garden cultivation; limited for backyard grain yield, hand-harvest economics, and informal supplementation amounts for laying hens",

      sources: [
        {
          title: "Sorghum Grain",
          organization:
            "Feedipedia — INRAE, CIRAD, AFZ and FAO",
          url:
            "https://www.feedipedia.org/",
          use:
            "Grain composition, starch, crude protein, fat, fiber, minerals, amino-acid limitations, tannins, poultry-feed use, processing, digestibility, and nutritional variability"
        },

        {
          title:
            "Sorghum in Poultry Diets",
          organization:
            "Small and Backyard Poultry Extension",
          url:
            "https://poultry.extension.org/",
          use:
            "Use of grain sorghum as a poultry energy ingredient, comparison with corn, tannin considerations, and the need for complete ration formulation"
        },

        {
          title:
            "Grain Sorghum Production Handbook",
          organization:
            "Kansas State University Research and Extension",
          url:
            "https://bookstore.ksre.ksu.edu/",
          use:
            "Planting temperature, planting depth, row spacing, plant population, water use, fertility, growth stages, maturity, harvest, insects, diseases, and storage"
        },

        {
          title:
            "Grain Sorghum Production",
          organization:
            "Oklahoma State University Extension",
          url:
            "https://extension.okstate.edu/",
          use:
            "Regional adaptation, planting dates, soil temperature, water requirements, drought response, fertility, weeds, insects, harvest, and grain management"
        },

        {
          title:
            "Grain Sorghum Production",
          organization:
            "Texas A&M AgriLife Extension",
          url:
            "https://agrilifeextension.tamu.edu/",
          use:
            "Heat and drought adaptation, variety selection, planting, water stress, plant population, grain maturity, harvest, and Southern production concerns"
        },

        {
          title:
            "Sorghum and Millet in Poultry Nutrition",
          organization:
            "Food and Agriculture Organization of the United Nations",
          url:
            "https://www.fao.org/",
          use:
            "Global sorghum-feed use, nutrient composition, tannin effects, grain processing, and comparison with other cereal grains"
        },

        {
          title:
            "Mycotoxins in Grain Sorghum",
          organization:
            "University and Cooperative Extension grain-quality resources",
          url:
            "https://www.ars.usda.gov/",
          use:
            "Grain molds, weather-related contamination, mycotoxin risk, harvest timing, drying, testing, and storage management"
        },

        {
          title:
            "Grain Drying, Handling, and Storage",
          organization:
            "North Dakota State University Extension",
          url:
            "https://www.ndsu.edu/agriculture/ag-hub/ag-topics/crop-production/drying-storing-and-handling-grain",
          use:
            "Drying, cooling, aeration, moisture control, insect prevention, and stored-grain monitoring"
        }
      ],

      lastReviewed: "2026-07-13",

      researchNotes: [
        "Keep this record specific to grain sorghum grown for mature seed rather than forage sorghum, sweet sorghum, broomcorn, sudangrass, sorghum-sudangrass hybrids, silage, or green chop.",
        "Identify low-tannin or tannin-free grain-sorghum varieties readily available to backyard growers.",
        "Do not assume that red, bronze, white, yellow, and brown grain types have identical tannin content or poultry-feed value.",
        "Verify crude-protein, fat, fiber, calcium, phosphorus, lysine, methionine, and metabolizable-energy values from a poultry-feed database.",
        "Find credible small-plot grain yield data before completing plants-per-area or yield-per-area fields.",
        "Do not convert state or national bushels-per-acre averages directly into backyard-garden yield.",
        "Research early-maturing varieties suited to northern gardens and humid-region varieties with improved grain-mold resistance.",
        "Determine practical backyard row spacing and plant spacing under irrigated and dryland conditions.",
        "Research bird-loss prevention because exposed sorghum heads may attract wild birds before harvest.",
        "Verify safe storage-moisture guidance for intact seed heads and threshed grain under noncommercial conditions.",
        "Determine whether whole mature sorghum grain is readily consumed by adult chickens or whether cracking improves practical intake.",
        "Do not apply commercial broiler or layer inclusion percentages directly to backyard supplementation without considering the complete ration.",
        "Compare sorghum directly with field corn and proso millet for energy value, drought tolerance, growing season, labor, storage, bird pressure, and cost.",
        "Research whether home-scale sprouting changes practical feeding value or introduces unacceptable mold and sanitation risks.",
        "Calculate scores only after multiple grain crops have comparable evidence and complete data.",
        "Plant-density estimates use midpoint spacing of approximately 4 inches between plants and 25 inches between rows; lower populations may be preferable under dry conditions, while irrigated or highly productive plots may support denser stands."

      ]
    },

    plannerData: {
      schemaVersion:
        "1.0.0",

      developmentStatus:
        "ready",

      identity: {
        plannerName:
          "Grain Sorghum (Milo)",

        shortLabel:
          "Grain Sorghum",

        icon:
          "🌾",

        cropCategory:
          "annual-grain",

        primaryFeedCategory:
          "drought-resilient-energy-grain",

        guideUrl:
          "growing-grain-sorghum-for-chickens.html"
      },

      lifecycle: {
        growthCycle:
          "annual",

        isAnnual: true,
        isBiennial: false,
        isPerennial: false,
        isTreeOrShrub: false,

        yearsToFirstUsefulHarvest: 0,

        yearsToFullProduction: 0,

        expectedUsefulLifeYears: 1,

        regrowsAfterHarvest: false,

        permanentPlantingRequired: false,

        reversibleAfterOneSeason: true
      },

      climate: {
        suitableClimateTypes: [
          "temperate",
          "hot-humid",
          "hot-dry",
          "mild-winter"
        ],

        preferredClimateTypes: [
          "hot-dry",
          "hot-humid",
          "mild-winter"
        ],

        challengingClimateTypes: [
          "cold-short-summer",
          "cool-moderate-summer",
          "high-elevation"
        ],

        minimumFrostFreeDays: 90,

        preferredFrostFreeDays: 120,

        minimumSoilTemperatureF: 60,

        preferredSoilTemperatureF: 65,

        daysToMaturityMinimum: 90,

        daysToMaturityMaximum: 120,

        dryDownBufferDays: 14,

        heatToleranceScore: 5,

        droughtClimateToleranceScore: 5,

        humidityToleranceScore: 3,

        coolSummerToleranceScore: 2,

        frostSensitivityScore: 5,

        winterHardinessRequired: false,

        seasonExtensionBenefits: [
          "Waiting for warm soil improves emergence and stand establishment.",
          "Early-maturing varieties improve reliability in shorter seasons.",
          "Protected postharvest drying can reduce losses during humid or wet autumn weather.",
          "Supplemental water during establishment and reproductive growth can improve yield even where Sorghum is grown primarily for drought resilience.",
          "Indoor transplant production is generally inefficient for a grain plot."
        ],

        indoorSeedStartingBenefitScore: 1,

        directFacts: {
          seasonType:
            "warm-season-annual",

          frostSensitive: true,

          commonlyDirectSeeded: true,

          winterDormancyPossible: false,

          heatDormancyPossible: false,

          windPollinated: true,

          blockPollinationImportant: false,

          droughtRecoveryPotential:
            true,

          notes: [
            "Grain Sorghum is a frost-sensitive warm-season annual.",
            "Seed is normally direct-sown after the soil becomes consistently warm.",
            "Sorghum generally tolerates heat and water stress better than Field Corn.",
            "Plants may slow growth during drought and resume growth when moisture returns.",
            "Drought survival does not guarantee acceptable grain yield.",
            "Water stress during boot stage, heading, flowering, pollination, and grain fill can still reduce production.",
            "Unlike Corn, Sorghum does not require a compact four-row block for dependable pollination.",
            "Cool nights and short seasons may delay maturity and dry-down.",
            "Humid conditions can increase grain-mold and postharvest-drying problems."
          ]
        }
      },

      site: {
        absoluteMinimumSunHours: 6,

        productiveMinimumSunHours: 7,

        preferredSunHours: 9,

        shadeToleranceScore: 1,

        afternoonShadeBenefitInHeat: 1,

        windToleranceScore: 4,

        lodgingRiskScore: 3,

        reflectedHeatToleranceScore: 5,

        airflowRequirementScore: 4,

        frostPocketSensitivityScore: 5,

        treeRootCompetitionToleranceScore: 1,

        hardscapeConflictRiskScore: 2,

        structureConflictRiskScore: 3,

        utilityConflictRiskScore: 3,

        fruitDropMessRiskScore: 1,

        stainingRiskScore: 1,

        directFacts: {
          preferredLight:
            "full-sun",

          productiveSunGuidance:
            "At least 7 hours of direct sunlight, with approximately 8 to 10 hours preferred for strong grain production and timely dry-down.",

          windExposureConcern: true,

          growthHabit:
            "tall-upright-tillering-grass",

          matureHeightFtMinimum: 3,

          matureHeightFtMaximum: 8,

          floweringPollinatorTraffic:
            false,

          notes: [
            "Grain Sorghum performs best in full sun.",
            "Meaningful shade reduces grain production and slows maturity.",
            "Plants are often shorter and more drought-resilient than Field Corn but may still lodge in storms.",
            "Open airflow helps seed heads dry after rain.",
            "Tall growth may shade nearby beds.",
            "The crop should not obstruct paths, road visibility, windows, utility access, or solar equipment.",
            "Tree roots and canopy shade create strong competition."
          ]
        }
      },

      soil: {
        textureScores: {
          heavyClay: 4,
          clayLoam: 5,
          loam: 5,
          sandyLoam: 5,
          verySandy: 3,
          rocky: 2
        },

        drainageRequirementScore: 4,

        temporaryWetToleranceScore: 2,

        waterloggingSensitivityScore: 4,

        minimumSoilDepthIn: 18,

        preferredSoilDepthIn: 30,

        compactionToleranceScore: 3,

        establishmentInSodDifficultyScore: 5,

        preferredPHMinimum: 5.5,

        preferredPHMaximum: 7.5,

        survivalPHMinimum: null,

        survivalPHMaximum: null,

        fertilityRequirementScore: 4,

        nitrogenRequirementScore: 4,

        phosphorusRequirementScore: 4,

        potassiumRequirementScore: 4,

        benefitsFromInoculation: false,

        inoculantType: null,

        saltToleranceScore: 3,

        amendmentEffortScore: 3,

        directFacts: {
          preferredDrainage:
            "well-drained",

          preferredTextures: [
            "loam",
            "clay loam",
            "sandy loam"
          ],

          nitrogenFixingLegume: false,

          inoculationMayImproveNodulation:
            false,

          fibrousRooted:
            true,

          waterloggedSoilSuitable:
            false,

          notes: [
            "Grain Sorghum tolerates a relatively broad range of productive soils.",
            "Well-drained loam, clay loam, and sandy loam are strong fits.",
            "The crop often performs better than Corn on drought-prone or moderately challenging ground.",
            "Very sandy soil may still require careful water and fertility management.",
            "Prolonged saturation restricts roots and increases disease risk.",
            "Nitrogen supports grain production, but excessive nitrogen can encourage lodging or delayed maturity.",
            "Phosphorus and potassium support roots, stalk strength, and grain development.",
            "Sorghum does not fix atmospheric nitrogen.",
            "Soil testing remains preferable to guessing at fertilizer needs."
          ]
        }
      },

      water: {
        overallWaterRequirementLevel:
          "low-moderate",

        germinationWaterNeedLevel:
          "moderate",

        establishmentWaterNeedLevel:
          "moderate",

        matureWaterNeedLevel:
          "low-moderate",

        floweringWaterNeedLevel:
          "high",

        harvestDevelopmentWaterNeedLevel:
          "moderate-high",

        droughtSurvivalScore: 5,

        droughtYieldRetentionScore: 5,

        criticalGrowthStages: [
          "germination",
          "seedling-establishment",
          "boot-stage",
          "heading",
          "flowering",
          "pollination",
          "grain-fill"
        ],

        criticalStageWaterImportanceScore: 5,

        overwateringSensitivityScore: 3,

        waterloggingSensitivityScore: 4,

        dripIrrigationBenefitScore: 4,

        mulchBenefitScore: 4,

        suitableForRainfallOnlyScore: 5,

        suitableForLimitedIrrigationScore: 5,

        containerDryingRiskScore: 5,

        establishmentYearsRequiringExtraWater: 0,

        directFacts: {
          establishmentMoistureImportant:
            true,

          droughtPauseAndRecoveryPossible:
            true,

          reproductiveStageWaterImportant:
            true,

          standingWaterSuitable:
            false,

          irrigationCanProtectYield:
            true,

          notes: [
            "Grain Sorghum generally requires less water than Field Corn.",
            "Its root system and drought response improve survival under limited moisture.",
            "Plants may temporarily slow growth during dry conditions.",
            "Adequate water during boot stage, flowering, pollination, and grain fill improves yield.",
            "Severe drought can still reduce seed-head size and grain quality.",
            "Supplemental irrigation may be especially valuable during establishment and reproductive growth.",
            "Mulch may reduce evaporation after the soil has warmed.",
            "Waterlogged soil remains harmful."
          ]
        }
      },

      space: {
        minimumTrialAreaSqFt: 40,

        minimumUsefulAreaSqFt: 75,

        preferredProductionAreaSqFt: 200,

        smallSpaceScore: 2,

        mediumSpaceScore: 5,

        largeSpaceScore: 5,

        layoutScores: {
          squareBlock: 5,
          wideRectangle: 5,
          longStrip: 4,
          irregular: 3,
          smallBeds: 3,
          openField: 5
        },

        spaceTypeScores: {
          inGround: 5,
          raisedBed: 3,
          container: 1,
          fenceLine: 3,
          buildingEdge: 2,
          unusedLawn: 4,
          openField: 5,
          orchard: 1,
          forageFrame: 1,
          rotationalPaddock: 2,
          greenhouse: 1,
          hedgerow: 3
        },

        minimumContainerGallons: null,

        containerUseLimitation:
          "Grain Sorghum can grow in large containers, but restricted roots, rapid drying, limited plant population, and low grain yield make containers inefficient for flock-feed production.",

        minimumRaisedBedDepthIn: 18,

        vineSpreadRequired: false,

        verticalSupportBenefitScore: 1,

        blockPlantingRequired: false,

        minimumBlockRows: null,

        continuousStandPreferred: true,

        heightCategory:
          "tall",

        matureWidthCategory:
          "narrow-upright-row-crop",

        overflowSpaceBenefitScore: 4,

        directFacts: {
          denseStandSuitable: true,

          compactBlockRequired: false,

          rowPlantingSuitable: true,

          containerFeedProductionEfficient:
            false,

          raisedBedFeedProductionEfficient:
            "limited",

          notes: [
            "Grain Sorghum can be planted in rows or blocks.",
            "It does not depend on a four-row block in the same way as Corn.",
            "A small trial plot is more practical than a similarly small Corn block.",
            "Medium and large open-ground plots provide the strongest feed-production value.",
            "Containers provide very little usable grain relative to watering and labor.",
            "Plant population should be reduced where moisture is severely limited.",
            "The estimated area thresholds are planning guides rather than guaranteed feed yields.",
            "Actual yield depends on variety, fertility, spacing, heat, moisture, bird losses, disease, harvest timing, and threshing efficiency."
          ]
        }
      },

      flock: {
        suitableForAdultChickens: true,

        suitableForYoungChicks: false,

        flockPurposeScores: {
          eggs: 4,
          meat: 4,
          breeding: 3,
          petsEnrichment: 5,
          homestead: 5,
          mixed: 5
        },

        feedingMethodScores: {
          livingGrazing: 1,
          cutAndCarry: 1,
          wholeProduce: 2,
          wholeSeedHeads: 5,
          wholeGrain: 5,
          processedGrain: 5,
          heatTreated: 2,
          driedForage: 1,
          winterStorage: 5
        },

        directRunSuitabilityScore: 1,

        forageFrameSuitabilityScore: 1,

        rotationalPaddockSuitabilityScore: 1,

        confinedFlockValueScore: 5,

        pasturedFlockValueScore: 3,

        treatDilutionRiskScore: 5,

        highEnergySupplement: true,

        highFiberSupplement: false,

        concentratedFatSource: false,

        primaryFlockUses: [
          "Whole dried seed heads for enrichment",
          "Threshed whole grain",
          "Cracked or coarsely ground grain",
          "High-energy supplementation",
          "Long-term dry storage",
          "Drought-resilient home grain production"
        ],

        unsuitablePrimaryUses: [
          "Complete-ration replacement",
          "Primary protein supplement",
          "Living forage",
          "Fresh green forage from growing plants",
          "Primary young-chick feed",
          "Feeding unidentified high-tannin grain",
          "Feeding moldy or inadequately dried grain"
        ],

        directFacts: {
          edibleFeedParts: [
            "Mature dry grain",
            "Whole dried grain heads",
            "Properly cracked or ground grain"
          ],

          preferredBirdStage:
            "Adult chickens",

          cropSurvivalWithDirectChickenAccess:
            "poor",

          directAccessTiming:
            "Keep chickens away from the growing plot until mature seed heads have been harvested.",

          nutritionalOrientation: [
            "energy",
            "grain",
            "starch",
            "winter-storage",
            "enrichment",
            "drought-resilient-feed"
          ],

          balancedFeedReplacement:
            false,

          lowTanninVarietyPreferred:
            true,

          notes: [
            "Grain Sorghum is primarily an energy grain.",
            "Its feeding role is broadly comparable with Corn, but nutritional composition and digestibility vary by variety.",
            "Low-tannin or tannin-free grain is preferred for poultry use.",
            "High-tannin grain may reduce palatability and nutrient use.",
            "Whole seed heads provide pecking enrichment.",
            "Whole dry grain may be eaten by adult chickens when appropriately sized and accompanied by grit.",
            "Cracking or grinding increases processing labor and storage exposure.",
            "Sorghum alone is low in calcium and does not provide a balanced amino-acid profile.",
            "It should supplement rather than replace complete poultry feed.",
            "Young chicks should continue receiving a complete age-appropriate ration."
          ]
        }
      },

      labor: {
        beginnerFriendlinessScore: 4,

        plantingEaseScore: 4,

        establishmentEaseScore: 4,

        routineMaintenanceEaseScore: 4,

        weedControlEaseScore: 3,

        wildlifeProtectionEaseScore: 2,

        harvestEaseScore: 4,

        grainProcessingEaseScore: 2,

        dryingEaseScore: 3,

        storageMonitoringEaseScore: 3,

        physicalAccessibilityScore: 4,

        heavyLiftingRiskScore: 2,

        weeklyLaborLevel:
          "low-moderate",

        peakWorkloadLevel:
          "high",

        harvestFrequencyCategory:
          "major",

        requiredPlantingTasks: [
          "prepare-seedbed",
          "plant-small-grain-seed"
        ],

        optionalPlantingTasks: [
          "install-irrigation",
          "apply-fertilizer",
          "install-bird-protection"
        ],

        requiredMaintenanceTasks: [
          "weed",
          "monitor-water",
          "monitor-seed-heads"
        ],

        optionalMaintenanceTasks: [
          "side-dress-nitrogen",
          "protect-from-wildlife"
        ],

        requiredHarvestTasks: [
          "cut-seed-heads"
        ],

        usePathProcessingTasks: {
          wholeDriedPanicles: [
            "cut-seed-heads",
            "dry"
          ],

          threshedWholeGrain: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort"
          ],

          crackedOrGroundGrain: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort",
            "crack-grain"
          ]
        },

        requiredStorageTasks: [
          "inspect-moisture",
          "inspect-mold",
          "inspect-insects",
          "inspect-rodents"
        ],

        specializedEquipmentRequired: [],

        specializedEquipmentHelpful: [
          "bird-netting",
          "fencing",
          "hand-pruners",
          "drying-rack",
          "drying-screen",
          "fan",
          "threshing-bag",
          "grain-cracker",
          "grain-mill",
          "moisture-meter",
          "metal-grain-can",
          "food-safe-bucket",
          "drip-irrigation"
        ],

        suitableForLowTimeUsersScore: 3,

        suitableForSoloGrowersScore: 4,

        directFacts: {
          seedSize:
            "small",

          directSeedingSuitable: true,

          specializedHarvestEquipmentRequiredForBackyardScale:
            false,

          majorLaborBottlenecks: [
            "Establishing a clean stand in warm soil",
            "Protecting mature heads from wild birds",
            "Harvesting before prolonged wet weather",
            "Drying seed heads completely",
            "Threshing grain",
            "Winnowing and cleaning seed",
            "Cracking or grinding if desired",
            "Protecting stored grain from insects and rodents"
          ],

          notes: [
            "Direct seeding is straightforward after soil warms.",
            "Sorghum does not require the compact pollination block needed by Corn.",
            "Whole-head feeding requires less processing than threshed grain.",
            "Threshing and winnowing create concentrated seasonal labor.",
            "A bag, tarp, screen, or simple hand tool may be adequate for a small plot.",
            "Grinding equipment is optional unless processed grain is specifically desired.",
            "Drying and storage management remain essential."
          ]
        }
      },

      cost: {
        seedOrPlantCostLevel:
          "low",

        soilPreparationCostLevel:
          "moderate",

        irrigationCostLevel:
          "low-moderate",

        protectionCostLevel:
          "moderate-high",

        processingEquipmentCostLevel:
          "moderate",

        storageCostLevel:
          "moderate",

        annualRecurringCostLevel:
          "moderate-low",

        longTermValueScore: 4,

        lowestCostUsePath:
          "whole-dried-grain-sorghum-heads",

        highestCostUsePath:
          "cracked-or-ground-grain-sorghum",

        likelyCostDrivers: [
          "Low-tannin seed",
          "Fertilizer or compost",
          "Irrigation during critical stages",
          "Bird netting",
          "Drying racks or fans",
          "Threshing and cleaning equipment",
          "Grain cracker or mill",
          "Moisture meter",
          "Rodent-proof storage"
        ],

        costReductionOptions: [
          "Feed whole dried heads instead of threshing all grain.",
          "Use an adapted open-pollinated low-tannin variety where seed saving is appropriate.",
          "Use existing bird protection and irrigation.",
          "Plant a trial plot before expanding.",
          "Store grain whole and process only small batches.",
          "Compare home-production costs with purchased grain."
        ],

        directFacts: {
          specializedPlantingEquipmentRequired:
            false,

          specializedBackyardHarvestEquipmentRequired:
            false,

          specializedProcessingEquipmentRequired:
            false,

          notes: [
            "Seed cost is generally modest.",
            "Bird protection, drying, threshing, storage, and labor may exceed seed cost.",
            "Lower irrigation requirements may improve economics relative to Corn in dry climates.",
            "The crop must be replanted annually.",
            "Whole-head feeding reduces processing expense.",
            "Purchased grain may remain less expensive where labor or storage is costly.",
            "Cost classifications are qualitative rather than current retail estimates."
          ]
        }
      },

      goals: {
        feedReductionScore: 5,

        energyProductionScore: 5,

        proteinOrientedScore: 2,

        freshGreensScore: 1,

        livingForageScore: 1,

        winterStorageScore: 5,

        enrichmentScore: 5,

        resilienceScore: 5,

        soilImprovementScore: 2,

        nitrogenFixationScore: 0,

        groundCoverScore: 2,

        erosionControlScore: 3,

        shadeScore: 2,

        privacyScreeningScore: 4,

        pollinatorSupportScore: 1,

        compostBiomassScore: 5,

        householdFoodScore: 1,

        seedSavingScore: 4,

        selfRelianceScore: 5,

        multipurposeValueScore: 4,

        visualAppealScore: 3,

        productionReliabilityScore: 5,

        fastestValueScore: 3,

        nonElectricStorageScore: 5,

        smallFlockValueScore: 5,

        largeFlockValueScore: 5,

        primaryGoalMatches: [
          "reduce-feed-use",
          "high-energy",
          "winter-storage",
          "enrichment",
          "resilience-feed",
          "limited-irrigation",
          "seed-saving",
          "self-reliance",
          "compost-biomass"
        ],

        weakGoalMatches: [
          "protein-oriented",
          "fresh-greens",
          "living-forage",
          "nitrogen-fixation",
          "pollinators",
          "container-production",
          "partial-shade"
        ],

        directFacts: {
          nitrogenFixingLegume: false,

          annualEnergyGrain: true,

          wholeHeadEnrichmentPotential:
            true,

          longTermDryStoragePotential:
            true,

          droughtResilientProduction:
            true,

          notes: [
            "Grain Sorghum is among the strongest heat- and drought-resilient grain crops in the initial planner.",
            "It can provide substantial energy-oriented grain with less water than Field Corn.",
            "Whole seed heads provide useful pecking enrichment.",
            "Dry grain can store for extended periods when moisture and pests are controlled.",
            "It does not fix nitrogen.",
            "It is not a fresh-green or protein-oriented crop.",
            "Its value depends heavily on selecting an appropriate low-tannin grain variety.",
            "The crop remains annual and requires yearly planting."
          ]
        }
      },

      risks: {
        wildlife: {
          wildBirds: 5,
          deer: 3,
          raccoons: 2,
          squirrels: 3,
          rabbits: 2,
          rodents: 5,
          groundhogs: 2
        },

        insectsRiskScore: 4,

        diseaseRiskScore: 4,

        lodgingRiskScore: 3,

        fieldMoldRiskScore: 5,

        dryingMoldRiskScore: 5,

        storageMoldRiskScore: 5,

        storedInsectRiskScore: 5,

        spoilageSpeedRiskScore: 2,

        invasivenessConcernRiskScore: 1,

        selfSeedingRiskScore: 2,

        fruitDropRiskScore: 1,

        cropFailureRiskScore: 3,

        stormDamageRiskScore: 3,

        shadingOtherCropsRiskScore: 4,

        overfeedingRiskScore: 5,

        treatedSeedRiskScore: 5,

        primaryRisks: [
          {
            id:
              "high-tannin-grain",

            severity:
              "very-high",

            affectedStages: [
              "variety-selection",
              "feeding"
            ],

            mitigationOptions: [
              "Select low-tannin or tannin-free grain varieties",
              "Buy seed intended for grain or feed use",
              "Verify cultivar information",
              "Do not assume grain color proves tannin level"
            ],

            note:
              "High-tannin grain may reduce palatability, protein digestion, and usable energy."
          },

          {
            id:
              "wild-bird-head-loss",

            severity:
              "very-high",

            affectedStages: [
              "soft-dough",
              "grain-fill",
              "maturity"
            ],

            mitigationOptions: [
              "Use bird netting",
              "Use exclusion or deterrence",
              "Harvest promptly",
              "Monitor heads frequently",
              "Choose a manageable plot size"
            ],

            note:
              "Exposed mature heads can attract substantial wild-bird feeding."
          },

          {
            id:
              "field-grain-mold",

            severity:
              "very-high",

            affectedStages: [
              "flowering",
              "grain-fill",
              "maturity",
              "field-dry-down"
            ],

            mitigationOptions: [
              "Use adapted disease-resistant varieties",
              "Avoid unnecessary harvest delay",
              "Separate damaged heads",
              "Promote airflow",
              "Finish drying under cover"
            ],

            note:
              "Wet or humid weather can increase grain-mold and toxin risk."
          },

          {
            id:
              "incomplete-drying",

            severity:
              "very-high",

            affectedStages: [
              "harvest",
              "drying",
              "storage"
            ],

            mitigationOptions: [
              "Dry heads thinly with airflow",
              "Thresh only after adequate drying",
              "Use a moisture meter where practical",
              "Do not seal warm or damp grain",
              "Reinspect stored grain"
            ],

            note:
              "Grain stored too wet may heat, mold, and spoil."
          },

          {
            id:
              "stored-grain-insects-and-rodents",

            severity:
              "very-high",

            affectedStages: [
              "storage"
            ],

            mitigationOptions: [
              "Use pest-resistant containers",
              "Clean storage areas",
              "Store only dry grain",
              "Inspect regularly",
              "Discard contaminated grain"
            ],

            note:
              "Sorghum grain remains highly attractive to insects and rodents."
          },

          {
            id:
              "drought-during-reproductive-growth",

            severity:
              "high",

            affectedStages: [
              "boot-stage",
              "heading",
              "flowering",
              "pollination",
              "grain-fill"
            ],

            mitigationOptions: [
              "Irrigate during critical stages",
              "Use adapted maturity classes",
              "Reduce plant density under dry conditions",
              "Maintain soil organic matter",
              "Control weeds"
            ],

            note:
              "Sorghum tolerates drought better than Corn, but severe reproductive-stage stress still reduces grain yield."
          },

          {
            id:
              "crop-type-confusion",

            severity:
              "very-high",

            affectedStages: [
              "seed-selection",
              "planting",
              "feeding"
            ],

            mitigationOptions: [
              "Use true grain Sorghum",
              "Do not substitute forage Sorghum or Sudangrass",
              "Keep seed labels",
              "Verify the intended crop type"
            ],

            note:
              "Grain Sorghum should not be confused with forage Sorghum, Sudangrass, or Sorghum-Sudangrass hybrids."
          },

          {
            id:
              "treated-seed",

            severity:
              "very-high",

            affectedStages: [
              "planting",
              "feeding"
            ],

            mitigationOptions: [
              "Use untreated seed where poultry could access it",
              "Keep treated planting seed secured",
              "Never feed planting seed"
            ],

            note:
              "Chemically treated seed must never be fed."
          },

          {
            id:
              "balanced-feed-displacement",

            severity:
              "very-high",

            affectedStages: [
              "feeding"
            ],

            mitigationOptions: [
              "Continue complete poultry feed",
              "Measure supplemental grain",
              "Avoid unrestricted scratch feeding",
              "Monitor flock condition and production"
            ],

            note:
              "Excess Sorghum can dilute protein, calcium, vitamins, minerals, and essential amino acids."
          }
        ],

        directFacts: {
          tanninConcern: true,

          wildBirdLossConcern: true,

          reproductiveDroughtConcern: true,

          grainMoldConcern: true,

          mycotoxinConcern: true,

          storagePestConcern: true,

          cropTypeConfusionConcern:
            true,

          notes: [
            "Low-tannin variety selection is essential for poultry-oriented recommendations.",
            "Wild birds may remove substantial grain before harvest.",
            "Sorghum is drought resilient but not drought proof.",
            "Sound appearance alone does not prove freedom from harmful mold toxins.",
            "Moldy, musty, heated, insect-damaged, contaminated, or questionable grain should not be fed.",
            "The planner record applies only to mature grain Sorghum."
          ]
        }
      },

      seasonalRoles: {
        earlySpring: false,

        lateSpring: true,

        summer: true,

        lateSummer: true,

        fall: true,

        winterStorage: true,

        perennial: false,

        plantingWindows: [
          {
            id:
              "warm-soil-direct-seeding",

            trigger:
              "after-frost-and-soil-warming",

            offsetWeeksMinimum: 1,

            offsetWeeksMaximum: 4,

            soilCondition:
              "warm-moist-and-workable",

            method:
              "direct-seed-grain-sorghum",

            note:
              "Plant after frost danger when soil is approximately 60°F or warmer."
          }
        ],

        harvestWindows: [
          {
            id:
              "whole-dried-grain-sorghum-heads",

            trigger:
              "physiological-maturity-and-dry-down",

            usePathId:
              "whole-dried-grain-sorghum-heads",

            note:
              "Cut mature heads before excessive bird loss or prolonged wet weather and finish drying under cover."
          },

          {
            id:
              "threshed-whole-grain-sorghum",

            trigger:
              "fully-dried-seed-heads",

            usePathId:
              "threshed-whole-grain-sorghum",

            note:
              "Thresh, winnow, and clean only after seed heads are adequately dry."
          },

          {
            id:
              "cracked-or-ground-grain-sorghum",

            trigger:
              "clean-dry-threshed-grain",

            usePathId:
              "cracked-or-ground-grain-sorghum",

            note:
              "Process small batches and protect processed grain from moisture and pests."
          }
        ],

        cropSequenceRoles: [
          "Warm-season drought-resilient grain",
          "Winter-storage crop",
          "Whole-head enrichment crop",
          "Annual self-reliance grain",
          "Postharvest compost-biomass crop"
        ],

        seasonalLimitations: [
          "Frost kills active plants",
          "Cool soil delays emergence",
          "Short seasons may prevent complete maturity",
          "Wild birds may consume heads before harvest",
          "Humid autumn weather complicates dry-down",
          "Stored grain requires year-round monitoring"
        ],

        directFacts: {
          warmSeasonAnnual: true,

          directSeedingPreferred: true,

          compactBlockPollinationRequired:
            false,

          grainDryDownRequired: true,

          winterStoragePossible: true,

          notes: [
            "Grain Sorghum should be planted only after the soil warms.",
            "The crop grows most rapidly during hot weather.",
            "Heading and flowering occur during summer.",
            "Maturity timing depends on variety, temperature, planting date, and moisture.",
            "Seed heads may need protected drying after harvest.",
            "Dry grain can provide value through winter."
          ]
        }
      },

      usePaths: [
        {
          id:
            "whole-dried-grain-sorghum-heads",

          label:
            "Whole Dried Grain-Sorghum Heads",

          description:
            "Mature low-tannin Grain-Sorghum heads are harvested, dried thoroughly, inspected, and offered whole for adult-chicken pecking enrichment.",

          primaryFeedRole:
            "whole-head-energy-enrichment",

          harvestProducts: [
            "dried-seed-heads",
            "whole-sorghum-heads",
            "sorghum-panicles",
            "stored-enrichment"
          ],

          suitableFeedingMethods: [
            "whole-seed-heads",
            "pecking-enrichment",
            "winter-supplement"
          ],

          requiredProcessingTasks: [
            "cut-seed-heads",
            "dry"
          ],

          optionalProcessingTasks: [
            "clean-sort"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "bird-netting",
            "drying-rack",
            "drying-screen",
            "fan",
            "moisture-meter",
            "rodent-proof-storage"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "single-seasonal",

          storageMethods: [
            "dry-whole-seed-heads"
          ],

          preferredStorageMethod:
            "cool-dry-ventilated-and-rodent-protected",

          storageDurationCategory:
            "long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,
          freezingSuitable: false,

          dryingRequired: true,
          curingRequired: false,
          shellingRequired: false,
          threshingRequired: false,
          cookingRequired: false,
          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,
          rodentRiskScore: 5,
          storedInsectRiskScore: 4,

          harvestEaseScore: 5,
          preparationEaseScore: 4,
          beginnerSuitabilityScore: 4,

          householdFoodValueScore: 1,
          flockValueScore: 5,

          safetyWarnings: [
            "Use low-tannin or tannin-free grain Sorghum.",
            "Dry heads thoroughly before storage.",
            "Inspect for mold, heating, insects, rodents, and musty odor.",
            "Discard damaged or questionable heads.",
            "Whole heads remain supplemental to complete poultry feed.",
            "Provide appropriate grit."
          ],

          incompatibleUserTraits: [
            "has-no-drying-capability",
            "has-no-rodent-protection",
            "requires-immediate-fresh-greens",
            "cannot-manage-wild-bird-pressure"
          ]
        },

        {
          id:
            "threshed-whole-grain-sorghum",

          label:
            "Threshed Whole Grain Sorghum",

          description:
            "Fully dried low-tannin Sorghum heads are threshed, winnowed, cleaned, and stored as whole grain for measured adult-chicken supplementation.",

          primaryFeedRole:
            "whole-energy-grain",

          harvestProducts: [
            "dry-grain",
            "sorghum-grain",
            "milo-grain",
            "whole-grain",
            "stored-grain"
          ],

          suitableFeedingMethods: [
            "whole-grain",
            "measured-supplement",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort"
          ],

          optionalProcessingTasks: [],

          requiredEquipment: [],

          helpfulEquipment: [
            "threshing-bag",
            "fan",
            "screens-trays",
            "moisture-meter",
            "metal-grain-can",
            "food-safe-bucket"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "single-seasonal",

          storageMethods: [
            "dry-whole-grain"
          ],

          preferredStorageMethod:
            "cool-dry-airtight-and-pest-resistant",

          storageDurationCategory:
            "long",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,
          freezingSuitable: false,

          dryingRequired: true,
          curingRequired: false,
          shellingRequired: false,
          threshingRequired: true,
          cookingRequired: false,
          grindingRequired: false,

          moistureSensitive: true,

          moldRiskScore: 5,
          rodentRiskScore: 5,
          storedInsectRiskScore: 5,

          harvestEaseScore: 3,
          preparationEaseScore: 2,
          beginnerSuitabilityScore: 3,

          householdFoodValueScore: 1,
          flockValueScore: 5,

          safetyWarnings: [
            "Use low-tannin or tannin-free grain.",
            "Thresh only fully dried heads.",
            "Store only clean, sound, dry grain.",
            "Inspect for mold, insects, rodents, condensation, and heating.",
            "Do not feed questionable grain.",
            "Provide appropriate grit.",
            "Whole grain remains supplemental to complete poultry feed."
          ],

          incompatibleUserTraits: [
            "declines-threshing",
            "has-no-drying-capability",
            "has-no-dry-storage",
            "has-no-rodent-protection",
            "requires-minimal-processing"
          ]
        },

        {
          id:
            "cracked-or-ground-grain-sorghum",

          label:
            "Cracked or Coarsely Ground Grain Sorghum",

          description:
            "Clean, fully dried, low-tannin Sorghum grain is cracked or coarsely ground shortly before feeding as a measured energy supplement.",

          primaryFeedRole:
            "processed-energy-grain",

          harvestProducts: [
            "cracked-grain",
            "ground-grain",
            "processed-sorghum",
            "dry-grain"
          ],

          suitableFeedingMethods: [
            "processed-grain",
            "measured-supplement",
            "ration-ingredient"
          ],

          requiredProcessingTasks: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort",
            "crack-grain"
          ],

          optionalProcessingTasks: [],

          requiredEquipment: [
            "grain-cracker"
          ],

          helpfulEquipment: [
            "grain-mill",
            "fan",
            "screens-trays",
            "moisture-meter",
            "food-safe-bucket"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "process-in-small-batches",

          storageMethods: [
            "dry-whole-grain-before-processing",
            "short-term-processed-grain"
          ],

          preferredStorageMethod:
            "store-whole-and-process-small-batches",

          storageDurationCategory:
            "medium",

          nonElectricStorageSuitable: true,

          refrigerationSuitable: false,
          freezingSuitable: false,

          dryingRequired: true,
          curingRequired: false,
          shellingRequired: false,
          threshingRequired: true,
          cookingRequired: false,
          grindingRequired: true,

          moistureSensitive: true,

          moldRiskScore: 5,
          rodentRiskScore: 5,
          storedInsectRiskScore: 4,

          harvestEaseScore: 2,
          preparationEaseScore: 1,
          beginnerSuitabilityScore: 2,

          householdFoodValueScore: 1,
          flockValueScore: 5,

          safetyWarnings: [
            "Use low-tannin or tannin-free grain.",
            "Process only sound, fully dried grain.",
            "Grinding does not make moldy or contaminated grain safe.",
            "Store whole grain and process small batches where practical.",
            "Protect processed grain from moisture and pests.",
            "Use only within an appropriately balanced feeding program."
          ],

          incompatibleUserTraits: [
            "declines-threshing",
            "declines-grinding",
            "has-no-grain-cracker",
            "has-no-drying-capability",
            "requires-minimal-processing"
          ]
        }
      ],

      dataQuality: {
        overallConfidence: 0.83,

        verifiedFields: [
          "identity",
          "lifecycle",
          "climate.directFacts.seasonType",
          "climate.directFacts.droughtRecoveryPotential",
          "site.directFacts.preferredLight",
          "soil.directFacts.nitrogenFixingLegume",
          "water.directFacts.droughtPauseAndRecoveryPossible",
          "space.directFacts.compactBlockRequired",
          "flock.directFacts.lowTanninVarietyPreferred",
          "flock.directFacts.nutritionalOrientation",
          "risks.directFacts.tanninConcern",
          "risks.directFacts.wildBirdLossConcern",
          "risks.directFacts.grainMoldConcern",
          "seasonalRoles.directFacts.warmSeasonAnnual",
          "seasonalRoles.directFacts.grainDryDownRequired"
        ],

        derivedFields: [
          "climate",
          "site",
          "soil.textureScores",
          "water",
          "space",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "labor",
          "cost",
          "goals",
          "risks.wildlife",
          "usePaths.whole-dried-grain-sorghum-heads",
          "usePaths.threshed-whole-grain-sorghum",
          "usePaths.cracked-or-ground-grain-sorghum"
        ],

        uncertainFields: [
          "climate.minimumFrostFreeDays",
          "climate.preferredFrostFreeDays",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "flock.portionGuidance",
          "usePaths.whole-dried-grain-sorghum-heads.exactStorageDuration",
          "usePaths.threshed-whole-grain-sorghum.exactStorageDuration"
        ],

        missingFields: [
          "flock.portionGuidance",
          "flock.usePathTesting"
        ],

        lastReviewed:
          "2026-07-15",

        primarySources: [
          {
            title:
              "Sorghum Grain",

            organization:
              "Feedipedia — INRAE, CIRAD, AFZ and FAO",

            sourceType:
              "international-feed-reference",

            use:
              "Grain composition, starch, protein, fat, minerals, tannins, poultry use, processing, and digestibility"
          },

          {
            title:
              "Grain Sorghum Production Handbook",

            organization:
              "Kansas State University Research and Extension",

            sourceType:
              "extension-grain-guide",

            use:
              "Planting, soil temperature, plant population, water use, fertility, maturity, harvest, pests, and storage"
          },

          {
            title:
              "Grain Sorghum Production",

            organization:
              "Oklahoma State University Extension",

            sourceType:
              "extension-grain-guide",

            use:
              "Drought response, regional adaptation, planting, fertility, insects, disease, harvest, and grain management"
          },

          {
            title:
              "Grain Sorghum Production",

            organization:
              "Texas A&M AgriLife Extension",

            sourceType:
              "extension-grain-guide",

            use:
              "Heat adaptation, water stress, Southern production, maturity, grain mold, and harvest"
          },

          {
            title:
              "Sorghum in Poultry Diets",

            organization:
              "Poultry Extension and animal-nutrition references",

            sourceType:
              "poultry-feed-reference",

            use:
              "Energy value, Corn comparison, tannin effects, nutrient limitations, and complete-ration context"
          },

          {
            title:
              "Grain Drying, Handling, and Storage",

            organization:
              "University Cooperative Extension stored-grain resources",

            sourceType:
              "extension-storage-guide",

            use:
              "Drying, moisture control, cooling, mold prevention, insects, rodents, and storage monitoring"
          }
        ],

        notes: [
          "Grain Sorghum plannerData applies only to Sorghum bicolor grown for mature dry grain.",
          "It must not be applied to forage Sorghum, Sweet Sorghum, Sudangrass, Sorghum-Sudangrass hybrids, silage, or green chop.",
          "The three use paths are whole dried heads, threshed whole grain, and cracked or coarsely ground grain.",
          "Low-tannin or tannin-free varieties are preferred for poultry use.",
          "The crop is treated primarily as an energy grain rather than a protein crop.",
          "No exact safe flock inclusion rate has been assigned.",
          "No medicinal claims are made.",
          "The crop should remain in testing until drought, limited-irrigation, whole-head, threshing, processing, bird-pressure, humid-storage, and Corn-comparison profiles are evaluated."
        ]
      }
    }
  },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - OATS
    //
    //
    //
    //
    //////////////////////////////////////////////


  "CROP-OATS": {
    id:
      "CROP-OATS",

    name:
      "Oats",

    scientificName:
      "Avena sativa",

    category:
      "Cool-Season Grain, Forage, and Cover Crop",

    cropType:
      "Annual",

    seasonType:
      "Cool Season",

    status:
      "Initial Research Complete",

    summary:
      "Oats are a cool-season annual cereal that can provide fresh vegetative forage, whole mature seed heads, or dry stored grain for adult chickens. They are easy to establish in suitable climates and also provide cover-crop, erosion-control, and soil-building value, but ordinary hulled oats are relatively high in fiber and lower in usable poultry energy than corn, millet, or grain sorghum.",

    chickenUse: {
      edibleParts: [
        "Young vegetative leaves and shoots",
        "Mature oat grain",
        "Whole mature seed heads",
        "Threshed whole grain",
        "Coarsely ground grain"
      ],

      primaryValue: [
        "Cool-season fresh forage",
        "Moderate carbohydrate energy",
        "Moderate protein",
        "Pecking and foraging enrichment",
        "Dry grain storage",
        "Seasonal ground cover"
      ],

      feedingForms: [
        "Protected living forage",
        "Cut-and-carry young greens",
        "Whole dried seed heads",
        "Threshed whole grain",
        "Coarsely ground grain",
        "A measured ingredient in a properly balanced poultry ration"
      ],

      bestFor: [
        "Adult chickens receiving a complete base ration",
        "Cool-season feed gardens",
        "Protected forage frames",
        "Rotational chicken areas",
        "Small-flock enrichment",
        "Dry winter grain storage",
        "Growers seeking a dual-purpose forage and grain crop"
      ],

      supplementOnly:
        true,

      preparationNotes:
        "For fresh forage, allow oats to establish before permitting controlled access and use the crop while growth remains leafy and vegetative. For grain, allow seed heads to mature, harvest promptly when grain is dry enough to handle safely, finish drying under cover with good airflow, and thresh, clean, or grind only when the chosen use path requires it.",

      safetyNotes:
        "Oats should supplement rather than replace an age-appropriate complete poultry ration. Ordinary hulled oats are relatively high in fiber, and large amounts may dilute dietary energy, amino acids, calcium, vitamins, and minerals. Do not feed chemically treated planting seed or grain that is moldy, musty, damp, heated, insect-damaged, rodent-contaminated, rancid, or otherwise questionable."
    },

    nutrition: {
      basis:
        "Approximate values for ordinary whole hulled oat grain. Composition varies with variety, hull percentage, climate, fertility, grain quality, and processing. Naked oats, oat groats, rolled oats, and oat hulls are nutritionally different products.",

      crudeProteinPercent:
        "Approximately 11% for ordinary whole hulled oats",

      fatPercent:
        "Approximately 4%",

      fiberPercent:
        "Approximately 10.5% crude fiber on average, with substantial variation caused largely by hull percentage",

      calciumPercent:
        "Approximately 0.10%",

      phosphorusPercent:
        "Approximately 0.25% total phosphorus; available phosphorus may be substantially lower",

      notableNutrients: [
        "Starch",
        "Moderate protein",
        "Unsaturated fat",
        "Linoleic acid",
        "Beta-glucans",
        "Phosphorus",
        "Manganese",
        "Magnesium"
      ],

      limitations: [
        "The hull raises fiber and reduces usable energy for poultry",
        "Poultry digest fiber less efficiently than many grazing livestock",
        "Beta-glucans may reduce nutrient availability and increase digestive viscosity",
        "Ordinary oats provide less usable energy than corn or grain sorghum",
        "Oats are low in calcium and do not provide a balanced layer ration",
        "Naked oats and oat groats should not be compared directly with ordinary whole hulled oats",
        "Grinding does not correct the grain's mineral or amino-acid imbalance",
        "Large amounts may displace nutritionally complete poultry feed"
      ]
    },

    growing: {
      sunlight:
        "Full sun is preferred; approximately 6 or more hours of direct sunlight supports useful forage and grain production",

      soilTemperatureMinimumF:
        null,

      idealSoilTemperatureF:
        "Cool, workable soil; oats are commonly planted very early in spring in northern regions or during fall in mild-winter regions",

      frostTolerance:
        "Moderate during vegetative growth, but winter hardiness varies significantly by variety and oats are generally less winter-hardy than rye or wheat",

      heatTolerance:
        "Low to Moderate",

      droughtTolerance:
        "Low to Moderate; oats generally perform best under cool conditions with dependable moisture",

      soilPHMinimum:
        5.5,

      soilPHMaximum:
        7.0,

      waterNeeds:
        "Moderate; dependable moisture supports germination, tillering, stem development, heading, and grain filling",

      directSow:
        true,

      transplantRecommended:
        false,

      daysToFirstHarvestMinimum:
        null,

      daysToFirstHarvestMaximum:
        null,

      daysToMaturityMinimum:
        null,

      daysToMaturityMaximum:
        null,

      plantSpacingInches:
        "Normally planted as a broadcast or drilled stand rather than as individually spaced plants",

      rowSpacingInches:
        "Drill, broadcast, and garden-row spacing vary by intended forage or grain use",

      plantingDepthInches:
        "Approximately 1 to 1.5 inches in moist soil",

      successionPlanting:
        false,

      regrowthAfterHarvest:
        true
    },

    regionalPlanting: {
      coldNorth: {
        plantingWindow:
          "Plant spring oats as soon as soil is workable and field conditions permit. Fall-planted ordinary oats frequently winter-kill unless a locally adapted winter-hardy variety and suitable conditions are available.",

        harvestWindow:
          "Young forage may be used during spring and early summer. Grain is generally harvested during summer after heads mature and grain dries."
      },

      midwestNortheast: {
        plantingWindow:
          "Plant spring oats early, commonly as soon as the seedbed can be prepared without causing compaction. Early planting helps the crop develop before summer heat.",

        harvestWindow:
          "Vegetative forage may be cut during spring. Mature grain is generally harvested during midsummer, depending on planting date and variety."
      },

      upperSouth: {
        plantingWindow:
          "Plant during fall at the locally recommended date for winter forage or spring grain. Variety winter hardiness is important because severe cold may damage or kill the stand.",

        harvestWindow:
          "Forage may be available during fall, winter warm periods, and spring. Grain generally matures during late spring or early summer."
      },

      deepSouth: {
        plantingWindow:
          "Plant during fall for winter and spring growth. Planting dates vary by latitude and intended forage or grain use, with forage generally planted earlier than grain.",

        harvestWindow:
          "Fresh forage may be available from fall through spring. Grain is generally harvested during late spring before prolonged heat and wet weather reduce quality."
      },

      southwest: {
        plantingWindow:
          "Plant during the coolest practical season where irrigation or dependable seasonal moisture is available. Avoid timing grain filling for extreme heat.",

        harvestWindow:
          "Harvest forage during cool vegetative growth or grain after spring maturity and adequate dry-down."
      },

      pacificNorthwest: {
        plantingWindow:
          "Plant spring oats early where winters are severe. In milder western areas, locally adapted fall planting may be possible.",

        harvestWindow:
          "Forage may be used during spring and early summer. Grain generally matures in summer."
      },

      coastalWest: {
        plantingWindow:
          "Plant during the cool rainy season in mild climates or during early spring in colder locations. Local disease pressure and harvest humidity should guide timing.",

        harvestWindow:
          "Use vegetative forage during the cool growing period and harvest mature grain before prolonged moisture damages seed quality."
      }
    },

    spaceAndYield: {
      plantsPer10SquareFeet:
        null,

      plantsPer50SquareFeet:
        null,

      plantsPer100SquareFeet:
        null,

      expectedYieldPerPlantMinimumLbs:
        null,

      expectedYieldPerPlantMaximumLbs:
        null,

      expectedYieldPer100SquareFeetMinimumLbs:
        null,

      expectedYieldPer100SquareFeetMaximumLbs:
        null,

      edibleYieldPercent:
        null,

      storageLife:
        "Potentially several months when mature grain is adequately dried, cooled, and protected from moisture, heat, insects, rodents, and rancidity",

      storageMethod:
        "Dry mature heads or threshed grain thoroughly with good airflow. Store only cool, sound grain in a dry, dark, food-safe and rodent-resistant container. Inspect periodically for condensation, heating, insects, webbing, rodent contamination, musty odor, caking, discoloration, or visible mold.",

      yieldNotes:
        "Oats are normally established by seeding rate as a continuous stand rather than as individual plants, so plants-per-area fields remain null. Commercial bushels-per-acre and forage-tonnage figures should not be converted directly into backyard yield promises. Small-plot output depends on variety, planting date, stand density, fertility, weeds, moisture, disease, lodging, bird pressure, harvest timing, threshing efficiency, hull percentage, and final grain moisture."
    },

    economics: {
      seedCostEstimate:
        "Usually low when purchased as suitable untreated agricultural seed, although named food-grade, winter-hardy, organic, or hull-less varieties may cost more",

      equipmentCostEstimate:
        "Low for a small forage planting. Grain production may add optional costs for wildlife protection, drying screens, fans, threshing, grinding, moisture testing, and rodent-resistant storage.",

      irrigationCostLevel:
        "Low to Moderate",

      laborLevel:
        "Low to Moderate for living forage; Moderate to High when grain is harvested, dried, threshed, cleaned, ground, and stored manually",

      potentialFeedSavings:
        null,

      economicNotes:
        "Oats may provide value through cool-season forage, enrichment, erosion control, nitrogen capture, organic matter, and stored grain. On very small plots, the labor required to harvest and process clean grain may exceed its direct market value, while protected forage or whole-head use may remain worthwhile."
    },

    scores: {
      easeOfGrowing:
        null,

      yieldPerSquareFoot:
        null,

      nutritionalUsefulness:
        null,

      proteinContribution:
        null,

      energyContribution:
        null,

      storageValue:
        null,

      smallSpaceSuitability:
        null,

      heatTolerance:
        null,

      coldTolerance:
        null,

      laborEfficiency:
        null,

      economicPotential:
        null,

      safetySimplicity:
        null
    },

    rankings: {
      practicalScore:
        null,

      nutritionalScore:
        null,

      bcpFeedScore:
        null
    },

    evidence: {
      evidenceStrength:
        "Strong for commercial grain and forage cultivation, general oat-grain composition, cool-season use, winter-hardiness limitations, and harvest moisture; moderate for general poultry-feed use; limited for backyard laying-hen supplementation rates and small-plot grain yield",

      sources: [
        {
          title:
            "Southern Small Grains Resource Management Handbook",

          organization:
            "University of Georgia Cooperative Extension",

          url:
            "https://extension.uga.edu/publications/detail.html?number=B1190&title=southern-small-grains-resource-management-handbook",

          use:
            "Oat adaptation, grain and forage uses, planting periods, winter hardiness, variety selection, disease, harvest, drying, and storage"
        },

        {
          title:
            "Planting Guide for Row Crops in Georgia",

          organization:
            "University of Georgia Cooperative Extension",

          url:
            "https://extension.uga.edu/publications/detail.html?number=C813",

          use:
            "Regional planting dates, seeding rate, harvest dates, and certified-seed guidance"
        },

        {
          title:
            "Organic Oat Production",

          organization:
            "University of Minnesota Extension",

          url:
            "https://extension.umn.edu/small-grains-crop-and-variety-selection/organic-oat-production",

          use:
            "Soil drainage, soil pH, fertility, field selection, and production management"
        },

        {
          title:
            "Oats in Poultry Diets",

          organization:
            "Small and Backyard Poultry Extension",

          url:
            "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/cereals-in-poultry-diets/oats-in-poultry-diets/",

          use:
            "Poultry nutrient values, hull variation, fiber, beta-glucans, energy limitations, fat, naked-oat distinctions, and ration context"
        },

        {
          title:
            "Cereals in Poultry Diets",

          organization:
            "Small and Backyard Poultry Extension",

          url:
            "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/cereals-in-poultry-diets/",

          use:
            "Cereal-grain structure, oat hull proportion, groat distinctions, fiber, protein, and energy context"
        },

        {
          title:
            "Georgia Forages: Grass Species",

          organization:
            "University of Georgia Cooperative Extension",

          url:
            "https://extension.uga.edu/publications/detail.html?number=B1351",

          use:
            "Winter forage use, seasonal production, grazing tolerance, spring forage growth, and winter-kill risk"
        }
      ],

      lastReviewed:
        "2026-07-16",

      researchNotes: [
        "Keep the record centered on Avena sativa grown for ordinary hulled grain or vegetative forage.",
        "Do not combine ordinary whole oats, naked oats, oat groats, rolled oats, and oat hulls as though they have identical poultry value.",
        "Do not apply commercial formulated-feed inclusion percentages directly to backyard supplementation.",
        "No exact safe percentage of a backyard flock's diet has been assigned.",
        "Research poultry-specific consumption of whole mature oat heads at backyard scale.",
        "Research whether adult laying hens consume ordinary whole oat grain readily enough to justify a whole-grain path without grinding.",
        "Research practical flock damage and recovery under protected forage-frame and rotational-access systems.",
        "Find credible small-plot grain-yield data before estimating yield per square foot.",
        "Do not convert commercial bushels-per-acre or forage-tonnage figures directly into backyard yield.",
        "Research oat varieties suitable for northern spring planting, southern winter planting, disease resistance, lodging resistance, and home grain use.",
        "Evaluate whether a separate future record is justified for naked or hull-less oats.",
        "Calculate general research-layer scores only after additional comparable crops are complete."
      ]
    },

    plannerData: {
      schemaVersion:
        "1.0.0",

      developmentStatus:
        "ready",

      identity: {
        plannerName:
          "Oats",

        shortLabel:
          "Oats",

        icon:
          "🌾",

        cropCategory:
          "grain",

        primaryFeedCategory:
          "energy",

        guideUrl:
          "growing-oats-for-chickens.html"
      },

      lifecycle: {
        growthCycle:
          "annual",

        isAnnual:
          true,

        isBiennial:
          false,

        isPerennial:
          false,

        isTreeOrShrub:
          false,

        yearsToFirstUsefulHarvest:
          0,

        yearsToFullProduction:
          0,

        expectedUsefulLifeYears:
          1,

        regrowsAfterHarvest:
          true,

        permanentPlantingRequired:
          false,

        reversibleAfterOneSeason:
          true
      },

      climate: {
        suitableClimateTypes: [
          "cold-short-summer",
          "cool-moderate-summer",
          "temperate",
          "hot-humid",
          "mild-winter",
          "high-elevation"
        ],

        preferredClimateTypes: [
          "cool-moderate-summer",
          "temperate",
          "mild-winter"
        ],

        challengingClimateTypes: [
          "hot-dry"
        ],

        minimumFrostFreeDays:
          null,

        preferredFrostFreeDays:
          null,

        minimumSoilTemperatureF:
          null,

        preferredSoilTemperatureF:
          null,

        daysToMaturityMinimum:
          null,

        daysToMaturityMaximum:
          null,

        dryDownBufferDays:
          null,

        heatToleranceScore:
          2,

        droughtClimateToleranceScore:
          2,

        humidityToleranceScore:
          4,

        coolSummerToleranceScore:
          5,

        frostSensitivityScore:
          3,

        winterHardinessRequired:
          true,

        seasonExtensionBenefits: [
          "Very early spring planting helps northern growers use cool soil and spring moisture before summer heat.",
          "Fall planting extends cool-season production in mild-winter regions.",
          "Selecting a locally adapted winter-hardy variety reduces winter-kill risk in fall-planted systems.",
          "Protected forage frames may extend flock access while preventing complete stand destruction."
        ],

        indoorSeedStartingBenefitScore:
          1,

        directFacts: {
          seasonType:
            "cool-season",

          springPlantingSuitable:
            true,

          fallPlantingSuitable:
            true,

          fallPlantingRegionDependent:
            true,

          winterHardinessHighlyVarietyDependent:
            true,

          generallyLessWinterHardyThanRyeOrWheat:
            true,

          severeColdCanCauseWinterKill:
            true,

          southernYieldLossTemperatureReferenceF:
            20,

          heatDuringGrainFillConcern:
            true,

          notes: [
            "Oats grow best during cool conditions.",
            "Northern grain production commonly relies on spring-planted oats.",
            "Southern grain and forage production commonly relies on fall planting.",
            "Ordinary oats are generally less winter-hardy than rye or wheat.",
            "Some oat varieties are substantially more winter-hardy than others.",
            "Plants that establish and tiller before severe cold may survive better than late weak seedlings.",
            "Winter-killed oats may retain cover-crop value but will not produce the intended grain harvest.",
            "High temperature during heading and grain filling can reduce crop performance."
          ]
        }
      },

      site: {
        absoluteMinimumSunHours:
          null,

        productiveMinimumSunHours:
          6,

        preferredSunHours:
          8,

        shadeToleranceScore:
          3,

        afternoonShadeBenefitInHeat:
          3,

        windToleranceScore:
          3,

        lodgingRiskScore:
          4,

        reflectedHeatToleranceScore:
          2,

        airflowRequirementScore:
          4,

        frostPocketSensitivityScore:
          3,

        treeRootCompetitionToleranceScore:
          2,

        hardscapeConflictRiskScore:
          1,

        structureConflictRiskScore:
          1,

        utilityConflictRiskScore:
          1,

        fruitDropMessRiskScore:
          1,

        stainingRiskScore:
          1,

        directFacts: {
          preferredLight:
            "full-sun",

          productiveSunGuidance:
            "Approximately 6 or more hours of direct sunlight, with stronger forage and grain production expected under longer full-sun exposure.",

          windExposureConcern:
            true,

          lodgingPossible:
            true,

          goodAirflowHelpful:
            true,

          notes: [
            "Full sun supports stronger tillering, forage growth, stem strength, and grain filling.",
            "Partial sun may still produce vegetative cover, but grain yield and stand strength may decline.",
            "Tall, lush, overfertilized, disease-weakened, or storm-exposed stands may lodge.",
            "Good airflow helps foliage and mature seed heads dry after rain or dew.",
            "Oats create fewer long-term structure, utility, and hardscape conflicts than tall grain crops or permanent perennials.",
            "Established tree roots can reduce water, nutrients, sunlight, and rooting space."
          ]
        }
      },

      soil: {
        textureScores: {
          heavyClay:
            2,

          clayLoam:
            4,

          loam:
            5,

          sandyLoam:
            4,

          verySandy:
            2,

          rocky:
            2
        },

        drainageRequirementScore:
          4,

        temporaryWetToleranceScore:
          3,

        waterloggingSensitivityScore:
          4,

        minimumSoilDepthIn:
          null,

        preferredSoilDepthIn:
          null,

        compactionToleranceScore:
          2,

        establishmentInSodDifficultyScore:
          3,

        preferredPHMinimum:
          5.5,

        preferredPHMaximum:
          7.0,

        survivalPHMinimum:
          null,

        survivalPHMaximum:
          null,

        fertilityRequirementScore:
          3,

        nitrogenRequirementScore:
          4,

        phosphorusRequirementScore:
          3,

        potassiumRequirementScore:
          3,

        benefitsFromInoculation:
          false,

        inoculantType:
          null,

        saltToleranceScore:
          null,

        amendmentEffortScore:
          3,

        directFacts: {
          preferredDrainage:
            "moderately-well-drained-to-well-drained",

          adaptableTextures: [
            "loam",
            "silt loam",
            "clay loam",
            "sandy loam"
          ],

          preferredTexture:
            "A productive, moderately well-drained to well-drained soil with adequate moisture-holding capacity.",

          waterloggedSoilSuitable:
            false,

          soilPHSourceRanges: [
            {
              sourceContext:
                "Minnesota oat production",

              minimum:
                5.5,

              maximum:
                7.0
            },

            {
              sourceContext:
                "Southern small-grain production",

              minimum:
                5.8,

              maximum:
                6.5
            }
          ],

          notes: [
            "Oats perform well on moderately well-drained to well-drained soils.",
            "Loam and clay-loam soils can supply dependable moisture when compaction and waterlogging are controlled.",
            "Sandy-loam soils may perform well but can require more dependable water and fertility.",
            "Very sandy soils raise drought and nutrient-leaching risk.",
            "Heavy clay receives a low score where slow drainage, crusting, or compaction restricts establishment.",
            "Oats may tolerate somewhat more soil acidity than some other cereal grains, but productive pH still matters.",
            "Oats do not fix nitrogen and do not require legume inoculation.",
            "Excess nitrogen may increase lush growth, lodging, and disease risk."
          ]
        }
      },

      water: {
        overallWaterRequirementLevel:
          "moderate",

        germinationWaterNeedLevel:
          "moderate",

        establishmentWaterNeedLevel:
          "moderate",

        matureWaterNeedLevel:
          "moderate",

        floweringWaterNeedLevel:
          "moderate",

        harvestDevelopmentWaterNeedLevel:
          "high",

        droughtSurvivalScore:
          2,

        droughtYieldRetentionScore:
          2,

        criticalGrowthStages: [
          "germination",
          "seedling-establishment",
          "tillering",
          "stem-elongation",
          "heading",
          "flowering",
          "grain-filling"
        ],

        criticalStageWaterImportanceScore:
          4,

        overwateringSensitivityScore:
          3,

        waterloggingSensitivityScore:
          4,

        dripIrrigationBenefitScore:
          3,

        mulchBenefitScore:
          2,

        suitableForRainfallOnlyScore:
          4,

        suitableForLimitedIrrigationScore:
          2,

        containerDryingRiskScore:
          4,

        establishmentYearsRequiringExtraWater:
          0,

        directFacts: {
          droughtTolerantAfterEstablishment:
            false,

          establishmentMoistureImportant:
            true,

          regularMoistureImprovesProduction:
            true,

          standingWaterSuitable:
            false,

          coolSeasonMoistureUse:
            true,

          grainFillMoistureImportant:
            true,

          notes: [
            "Oats generally perform best where cool-season rainfall or irrigation is dependable.",
            "Adequate moisture supports germination, tillering, canopy formation, heading, and grain filling.",
            "The crop is less drought-resilient than Proso Millet or Grain Sorghum.",
            "Water stress during heading and grain filling can reduce grain size and yield.",
            "Temporary cool wet conditions may be tolerated better than prolonged saturation.",
            "Standing water, poor aeration, and compacted wet soil can damage roots and reduce stand health.",
            "Rainfall-only production is practical in many suitable cool-season climates.",
            "Hot, dry regions may require irrigation and careful seasonal timing."
          ]
        }
      },

      space: {
        minimumTrialAreaSqFt:
          null,

        minimumUsefulAreaSqFt:
          null,

        preferredProductionAreaSqFt:
          null,

        smallSpaceScore:
          4,

        mediumSpaceScore:
          5,

        largeSpaceScore:
          5,

        layoutScores: {
          squareBlock:
            5,

          wideRectangle:
            5,

          longStrip:
            5,

          irregular:
            4,

          smallBeds:
            4,

          openField:
            5
        },

        spaceTypeScores: {
          inGround:
            5,

          raisedBed:
            4,

          container:
            2,

          fenceLine:
            3,

          buildingEdge:
            3,

          unusedLawn:
            5,

          openField:
            5,

          orchard:
            3,

          forageFrame:
            5,

          rotationalPaddock:
            5,

          greenhouse:
            2,

          hedgerow:
            2
        },

        minimumContainerGallons:
          null,

        containerUseLimitation:
          "Oats can grow in containers or trays, but container production is generally inefficient for meaningful mature grain harvest. Small containers are more appropriate for temporary green forage than for stored grain.",

        minimumRaisedBedDepthIn:
          null,

        vineSpreadRequired:
          false,

        verticalSupportBenefitScore:
          1,

        blockPlantingRequired:
          false,

        minimumBlockRows:
          null,

        continuousStandPreferred:
          true,

        heightCategory:
          "medium",

        matureWidthCategory:
          "narrow-upright",

        overflowSpaceBenefitScore:
          2,

        directFacts: {
          layoutFlexible:
            true,

          blockPollinationRequired:
            false,

          suitableForRowPlanting:
            true,

          suitableForBroadcastStand:
            true,

          suitableForCloselySpacedStands:
            true,

          suitableForSingleOrSmallGroupPlanting:
            false,

          continuousStandMostPractical:
            true,

          notes: [
            "Oats are normally planted as a drilled, broadcast, or closely spaced continuous stand.",
            "The crop does not require Corn-style block planting for pollination.",
            "Small beds can produce forage or whole heads for enrichment.",
            "Medium and large plots are more efficient for producing measurable loose grain.",
            "Unused lawn and open-field areas can support seasonal cover and grain production.",
            "Forage frames can protect young growth from complete flock destruction.",
            "Rotational paddocks may permit controlled grazing after establishment.",
            "Containers are inefficient for substantial grain production.",
            "Minimum useful area remains null until small-plot yield and flock-use relationships are tested."
          ]
        }
      },

      flock: {
        suitableForAdultChickens:
          true,

        suitableForYoungChicks:
          false,

        flockPurposeScores: {
          eggs:
            4,

          meat:
            3,

          breeding:
            3,

          petsEnrichment:
            5,

          homestead:
            5,

          mixed:
            5
        },

        feedingMethodScores: {
          livingGrazing:
            4,

          cutAndCarry:
            4,

          wholeProduce:
            1,

          wholeSeedHeads:
            5,

          wholeGrain:
            4,

          processedGrain:
            4,

          heatTreated:
            1,

          driedForage:
            2,

          winterStorage:
            4
        },

        directRunSuitabilityScore:
          2,

        forageFrameSuitabilityScore:
          5,

        rotationalPaddockSuitabilityScore:
          4,

        confinedFlockValueScore:
          5,

        pasturedFlockValueScore:
          5,

        treatDilutionRiskScore:
          4,

        highEnergySupplement:
          false,

        highFiberSupplement:
          true,

        concentratedFatSource:
          false,

        primaryFlockUses: [
          "Protected cool-season living forage",
          "Cut-and-carry young oat greens",
          "Whole dried seed heads for pecking enrichment",
          "Threshed whole grain",
          "Coarsely ground grain",
          "Stored cool-season grain",
          "Seasonal pasture diversity"
        ],

        unsuitablePrimaryUses: [
          "Complete-ration replacement",
          "Highest-energy grain production",
          "Primary protein production",
          "Unrestricted permanent-run planting",
          "Primary young-chick feed",
          "Feeding moldy or inadequately dried grain",
          "Assuming naked-oat nutrition applies to ordinary hulled oats"
        ],

        directFacts: {
          edibleFeedParts: [
            "Young vegetative leaves and shoots",
            "Mature whole grain",
            "Whole mature seed heads",
            "Coarsely ground mature grain"
          ],

          preferredBirdStage:
            "Adult chickens",

          cropSurvivalWithDirectChickenAccess:
            "poor-with-unrestricted-access",

          directAccessTiming:
            "Allow the stand to establish before controlled grazing, or keep chickens away until mature seed heads are harvested.",

          nutritionalOrientation: [
            "moderate-energy",
            "grain",
            "high-fiber",
            "fresh-green",
            "living-forage",
            "enrichment",
            "winter-storage"
          ],

          balancedFeedReplacement:
            false,

          ordinaryHulledOatsBaseline:
            true,

          nakedOatsNutritionallyDifferent:
            true,

          gritImportantForWholeGrain:
            true,

          notes: [
            "Young vegetative oats can provide fresh green forage and flock enrichment.",
            "Unrestricted chickens may uproot seedlings, overgraze leaves, scratch soil, and prevent grain formation.",
            "Protected forage frames or rotational access improve stand persistence.",
            "Whole mature seed heads encourage pecking and natural feed-seeking behavior.",
            "Loose grain is easier to measure but requires threshing and cleaning.",
            "Ordinary hulled oats contain more fiber and less usable energy than Corn or Grain Sorghum.",
            "Oats contain beta-glucans that may reduce nutrient availability.",
            "Coarse grinding may improve physical access but does not create a complete ration.",
            "Oats are low in calcium and should not displace complete layer feed.",
            "Young chicks should continue receiving an age-appropriate complete starter ration."
          ]
        }
      },

      labor: {
        beginnerFriendlinessScore:
          4,

        plantingEaseScore:
          4,

        establishmentEaseScore:
          4,

        routineMaintenanceEaseScore:
          4,

        weedControlEaseScore:
          3,

        wildlifeProtectionEaseScore:
          3,

        harvestEaseScore:
          3,

        wholeHeadProcessingEaseScore:
          4,

        looseSeedProcessingEaseScore:
          2,

        dryingEaseScore:
          3,

        storageMonitoringEaseScore:
          3,

        perennialMaintenanceEaseScore:
          5,

        physicalAccessibilityScore:
          4,

        heavyLiftingRiskScore:
          1,

        weeklyLaborLevel:
          "low",

        peakWorkloadLevel:
          "moderate",

        harvestFrequencyCategory:
          "mixed",

        requiredPlantingTasks: [
          "prepare-seedbed",
          "broadcast-small-seed"
        ],

        requiredMaintenanceTasks: [
          "hand-weed",
          "protect-from-wildlife"
        ],

        optionalMaintenanceTasks: [
          "cultivate",
          "mow-clip",
          "rotate-grazing"
        ],

        requiredHarvestTasks: [],

        usePathProcessingTasks: {
          freshYoungForage: [
            "cut-forage"
          ],

          wholeDriedSeedHeads: [
            "cut-seed-heads",
            "dry"
          ],

          looseDriedWholeGrain: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort"
          ],

          groundOatGrain: [
            "cut-seed-heads",
            "dry",
            "thresh",
            "winnow",
            "clean-sort",
            "grind"
          ]
        },

        requiredStorageTasks: [
          "inspect-moisture",
          "inspect-insects",
          "inspect-mold"
        ],

        specializedEquipmentRequired: [],

        specializedEquipmentHelpful: [
          "hoe",
          "rake",
          "hand-pruners",
          "fencing",
          "bird-netting",
          "forage-frame",
          "basket",
          "drying-rack",
          "drying-screen",
          "fan",
          "grain-thresher",
          "grain-mill",
          "feed-grinder",
          "moisture-meter",
          "food-safe-bucket",
          "food-safe-container",
          "metal-grain-can",
          "rodent-proof-room"
        ],

        suitableForLowTimeUsersScore:
          4,

        suitableForSoloGrowersScore:
          4,

        directFacts: {
          seedSize:
            "medium-small",

          directSeedingSuitable:
            true,

          indoorStartingPossible:
            false,

          specializedHarvestEquipmentRequiredForBackyardScale:
            false,

          majorLaborBottlenecks: [
            "Preparing an even seedbed",
            "Controlling weeds during establishment",
            "Preventing premature flock access",
            "Protecting maturing grain from birds",
            "Cutting and handling mature seed heads",
            "Drying heads and grain safely",
            "Threshing and winnowing loose grain",
            "Monitoring stored grain"
          ],

          notes: [
            "Oats are straightforward to direct-seed by broadcasting or drilling.",
            "A dense healthy stand can suppress some later weeds, but early competition remains important.",
            "Fresh-forage use requires less processing than grain use.",
            "Whole-head use avoids threshing and winnowing.",
            "Loose-grain production concentrates substantial hand labor around harvest.",
            "Grinding adds equipment and labor but is optional for many adult-flock uses.",
            "Commercial plantings use combines and grain-handling systems, but small backyard plots can be cut and processed manually."
          ]
        }
      },

      cost: {
        seedOrPlantCostLevel:
          "low",

        soilPreparationCostLevel:
          "low",

        irrigationCostLevel:
          "low",

        protectionCostLevel:
          "low",

        processingEquipmentCostLevel:
          "moderate",

        storageCostLevel:
          "low",

        annualRecurringCostLevel:
          "low",

        longTermValueScore:
          4,

        lowestCostUsePath:
          "fresh-young-oat-forage",

        highestCostUsePath:
          "ground-oat-grain",

        likelyCostDrivers: [
          "Seedbed preparation",
          "Fencing or forage-frame protection",
          "Bird netting",
          "Drying racks or screens",
          "Optional grain thresher",
          "Optional grain mill or feed grinder",
          "Moisture meter",
          "Rodent-resistant storage containers"
        ],

        costReductionOptions: [
          "Begin with a small protected forage or whole-head trial.",
          "Broadcast by hand on a prepared small plot.",
          "Use whole heads instead of threshing loose grain.",
          "Thresh and winnow manually at small scale.",
          "Use existing screens, fans, buckets, and metal containers.",
          "Choose a locally adapted variety to reduce winter-kill, disease, and lodging risk.",
          "Use the crop as both seasonal cover and flock forage."
        ],

        directFacts: {
          specializedPlantingEquipmentRequired:
            false,

          specializedBackyardHarvestEquipmentRequired:
            false,

          specializedProcessingEquipmentRequired:
            false,

          notes: [
            "Seed is generally inexpensive.",
            "Fresh-forage production can be accomplished with ordinary garden tools.",
            "Whole-head use minimizes equipment requirements.",
            "Loose-grain processing may justify a thresher, screens, or mill only at larger backyard scale.",
            "Rodent-resistant storage is important for dry grain.",
            "Cost classifications are qualitative rather than current retail estimates."
          ]
        }
      },

      goals: {
        feedReductionScore:
          3,

        energyProductionScore:
          3,

        proteinOrientedScore:
          2,

        freshGreensScore:
          4,

        livingForageScore:
          4,

        winterStorageScore:
          4,

        enrichmentScore:
          5,

        resilienceScore:
          3,

        soilImprovementScore:
          4,

        nitrogenFixationScore:
          0,

        groundCoverScore:
          5,

        erosionControlScore:
          5,

        shadeScore:
          1,

        privacyScreeningScore:
          1,

        pollinatorSupportScore:
          1,

        compostBiomassScore:
          4,

        householdFoodScore:
          4,

        seedSavingScore:
          4,

        selfRelianceScore:
          4,

        multipurposeValueScore:
          5,

        visualAppealScore:
          3,

        productionReliabilityScore:
          4,

        fastestValueScore:
          4,

        nonElectricStorageScore:
          4,

        smallFlockValueScore:
          5,

        largeFlockValueScore:
          4,

        primaryGoalMatches: [
          "fresh-greens",
          "living-forage",
          "cool-season-production",
          "winter-storage",
          "enrichment",
          "ground-cover",
          "erosion-control",
          "soil-improvement",
          "compost-biomass",
          "shared-household-food",
          "self-reliance",
          "seed-saving",
          "use-unused-space"
        ],

        weakGoalMatches: [
          "highest-energy",
          "primary-protein-production",
          "nitrogen-fixation",
          "pollinators",
          "shade",
          "privacy-screening",
          "permanent-ground-cover",
          "hot-season-production",
          "extreme-drought-resilience",
          "container-production"
        ],

        directFacts: {
          coolSeasonAnnual:
            true,

          dualForageAndGrainPotential:
            true,

          coverCropPotential:
            true,

          erosionControlPotential:
            true,

          nitrogenCapturePotential:
            true,

          greenManurePotential:
            true,

          humanFoodPotential:
            true,

          seedSavingPossible:
            true,

          notes: [
            "Oats add a cool-season production role that differs from the planner's warm-season grains.",
            "Young growth can provide fresh greens and living-forage value.",
            "Mature heads and grain provide enrichment and dry-storage value.",
            "Dense stands protect soil and reduce erosion.",
            "Oats can capture residual soil nitrogen but do not fix atmospheric nitrogen.",
            "Crop residue can contribute organic matter and compost biomass.",
            "Ordinary oats are not the planner's strongest high-energy grain.",
            "The crop offers strong multipurpose value where both flock use and soil cover matter."
          ]
        }
      },

      risks: {
        wildlife: {
          wildBirds:
            4,

          deer:
            4,

          raccoons:
            1,

          squirrels:
            2,

          rabbits:
            4,

          rodents:
            4,

          groundhogs:
            3
        },

        insectsRiskScore:
          3,

        diseaseRiskScore:
          4,

        lodgingRiskScore:
          4,

        fieldMoldRiskScore:
          4,

        dryingMoldRiskScore:
          4,

        storageMoldRiskScore:
          4,

        storedInsectRiskScore:
          4,

        spoilageSpeedRiskScore:
          2,

        invasivenessConcernRiskScore:
          1,

        selfSeedingRiskScore:
          2,

        fruitDropRiskScore:
          1,

        cropFailureRiskScore:
          3,

        stormDamageRiskScore:
          4,

        shadingOtherCropsRiskScore:
          2,

        overfeedingRiskScore:
          4,

        treatedSeedRiskScore:
          5,

        primaryRisks: [
          {
            id:
              "winter-kill",

            severity:
              "high",

            affectedStages: [
              "seedling-establishment",
              "tillering",
              "winter-dormancy"
            ],

            mitigationOptions: [
              "Choose a locally adapted winter-hardy variety",
              "Plant at the recommended regional date",
              "Establish the crop before severe cold",
              "Use spring oats where winter survival is unreliable",
              "Avoid poorly drained frost pockets"
            ],

            note:
              "Oats are generally less winter-hardy than rye or wheat, and variety, growth stage, soil, and weather strongly affect survival."
          },

          {
            id:
              "lodging",

            severity:
              "high",

            affectedStages: [
              "stem-elongation",
              "heading",
              "grain-filling",
              "maturity"
            ],

            mitigationOptions: [
              "Choose a variety with good straw strength",
              "Avoid excessive nitrogen",
              "Avoid excessive stand density",
              "Maintain balanced fertility",
              "Harvest promptly after maturity"
            ],

            note:
              "Tall or lush stands may lean or flatten under wind, rain, disease, or excessive fertility."
          },

          {
            id:
              "disease-and-rust",

            severity:
              "high",

            affectedStages: [
              "vegetative-growth",
              "stem-elongation",
              "heading",
              "grain-filling"
            ],

            mitigationOptions: [
              "Choose resistant adapted varieties",
              "Use suitable crop rotation",
              "Plant clean untreated seed intended for the chosen use",
              "Maintain airflow",
              "Avoid excessive nitrogen",
              "Monitor regional Extension alerts"
            ],

            note:
              "Crown rust, smuts, leaf diseases, and other pathogens can reduce forage, lodging resistance, grain yield, and grain quality."
          },

          {
            id:
              "wet-grain-and-field-weathering",

            severity:
              "high",

            affectedStages: [
              "maturity",
              "harvest",
              "drying"
            ],

            mitigationOptions: [
              "Harvest promptly near appropriate grain moisture",
              "Avoid prolonged exposure to rain and dew",
              "Finish drying under cover",
              "Provide strong airflow",
              "Discard visibly damaged or questionable grain"
            ],

            note:
              "Rain and dew after maturity can discolor grain and increase field-weathering, sprouting, and mold risk."
          },

          {
            id:
              "storage-mold-and-heating",

            severity:
              "high",

            affectedStages: [
              "drying",
              "storage"
            ],

            mitigationOptions: [
              "Dry grain adequately before sealing",
              "Cool grain before enclosed storage",
              "Use dry food-safe containers",
              "Inspect for condensation and heating",
              "Control insects and rodents",
              "Discard musty or moldy material"
            ],

            note:
              "Damp or warm oats may heat, mold, cake, or support insects during storage."
          },

          {
            id:
              "unrestricted-flock-damage",

            severity:
              "high",

            affectedStages: [
              "germination",
              "seedling-establishment",
              "vegetative-growth",
              "heading"
            ],

            mitigationOptions: [
              "Use a forage frame",
              "Use temporary fencing",
              "Rotate access",
              "Allow the stand to establish",
              "Protect grain plots until harvest"
            ],

            note:
              "Chickens can uproot seedlings, overgraze leaves, scratch the soil, and prevent mature grain production."
          },

          {
            id:
              "balanced-feed-displacement",

            severity:
              "high",

            affectedStages: [
              "feeding"
            ],

            mitigationOptions: [
              "Offer oats as a measured supplement",
              "Continue complete poultry feed",
              "Limit scratch-grain use",
              "Avoid assuming whole oats provide a balanced ration"
            ],

            note:
              "High-fiber oat grain can dilute usable energy, amino acids, calcium, vitamins, and minerals when overfed."
          },

          {
            id:
              "chemically-treated-seed",

            severity:
              "very-high",

            affectedStages: [
              "planting",
              "feeding"
            ],

            mitigationOptions: [
              "Use untreated seed where the crop or leftover seed may be fed",
              "Keep treated seed clearly separated",
              "Follow seed-label restrictions"
            ],

            note:
              "Chemically treated planting seed must not be fed to chickens."
          }
        ],

        directFacts: {
          winterKillPossible:
            true,

          lodgingPossible:
            true,

          crownRustConcern:
            true,

          looseSmutConcern:
            true,

          cerealLeafBeetlePreference:
            true,

          wetWeatherCanReduceGrainQuality:
            true,

          promptHarvestImportant:
            true,

          moistureControlImportantDuringStorage:
            true,

          notes: [
            "Winter survival varies strongly by variety, establishment, soil, temperature, and duration of cold.",
            "Oats may suffer substantial yield loss when southern winter temperatures fall below approximately 20°F.",
            "Disease resistance is an important variety-selection criterion.",
            "Cereal leaf beetle may strongly prefer oats among available small-grain hosts.",
            "Rain and dew after maturity may discolor grain and reduce quality.",
            "Wild birds, deer, rabbits, and rodents may consume forage or mature grain.",
            "Adequate drying and protected storage are essential.",
            "Questionable, musty, moldy, heated, rancid, or contaminated oats should not be fed."
          ]
        }
      },

      seasonalRoles: {
        earlySpring:
          true,

        lateSpring:
          true,

        summer:
          true,

        lateSummer:
          false,

        fall:
          true,

        winterStorage:
          true,

        perennial:
          false,

        plantingWindows: [
          {
            id:
              "early-spring-oats",

            trigger:
              "soil-workable",

            offsetWeeksMinimum:
              null,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "cool-moist-and-workable",

            method:
              "direct-seed",

            note:
              "Plant spring oats as early as practical without working soil while excessively wet."
          },

          {
            id:
              "fall-oats-mild-winter",

            trigger:
              "regional-fall-planting-window",

            offsetWeeksMinimum:
              null,

            offsetWeeksMaximum:
              null,

            soilCondition:
              "moist-and-workable",

            method:
              "direct-seed",

            note:
              "Use locally recommended fall dates and an adapted variety where winter survival is expected."
          }
        ],

        harvestWindows: [
          {
            id:
              "young-oat-forage",

            trigger:
              "established-vegetative-growth",

            usePathId:
              "fresh-young-oat-forage",

            note:
              "Use leafy vegetative growth before excessive stem and seed-head development reduces forage tenderness."
          },

          {
            id:
              "whole-dried-oat-heads",

            trigger:
              "mature-seed-heads",

            usePathId:
              "whole-dried-oat-seed-heads",

            note:
              "Cut mature heads and finish drying under protected, ventilated conditions."
          },

          {
            id:
              "loose-dried-oat-grain",

            trigger:
              "grain-mature-and-adequately-dry",

            usePathId:
              "loose-dried-whole-oat-grain",

            note:
              "Thresh and clean mature grain after the seed heads have reached a suitable dry condition."
          },

          {
            id:
              "ground-oat-grain",

            trigger:
              "clean-dry-grain-available",

            usePathId:
              "ground-oat-grain",

            note:
              "Grind only sound, adequately dried grain and use the processed grain before quality declines."
          }
        ],

        cropSequenceRoles: [
          "Early spring grain",
          "Fall-planted winter annual",
          "Cool-season living forage",
          "Protected forage-frame crop",
          "Seasonal rotational-paddock forage",
          "Cover crop",
          "Erosion-control crop",
          "Nitrogen catch crop",
          "Green-manure crop",
          "Dry winter-storage grain"
        ],

        seasonalLimitations: [
          "Ordinary oats may winter-kill in severe cold",
          "Winter hardiness varies substantially by variety",
          "Summer heat can reduce grain performance",
          "Forage quality declines as stems and seed heads mature",
          "Heavy grazing may prevent grain production",
          "Wet weather near maturity can damage grain quality",
          "Stored grain requires adequate drying"
        ],

        directFacts: {
          coolSeasonAnnual:
            true,

          springAndFallPlantingPossible:
            true,

          southernForagePlantingOftenEarlierThanGrainPlanting:
            true,

          forageQualityDeclinesWithMaturity:
            true,

          grainHarvestMoistureReferencePercent:
            13,

          notes: [
            "Spring oats allow northern growers to produce a cool-season crop without relying on winter survival.",
            "Fall oats provide winter and spring growth in suitable southern and mild-winter climates.",
            "Forage planting is often earlier than grain planting in the South.",
            "Vegetative forage use and mature grain production compete with one another when the same stand is heavily grazed.",
            "Grain should be harvested promptly after reaching suitable maturity and moisture.",
            "Stored whole grain extends the crop's usefulness beyond the growing season."
          ]
        }
      },

      usePaths: [
        {
          id:
            "fresh-young-oat-forage",

          label:
            "Fresh Young Oat Forage",

          description:
            "Established young vegetative oats used through protected living access, controlled rotational grazing, or cut-and-carry harvesting before the stand becomes mature and stemmy.",

          primaryFeedRole:
            "fresh-green-forage",

          harvestProducts: [
            "fresh-greens",
            "living-forage"
          ],

          suitableFeedingMethods: [
            "living-grazing",
            "cut-and-carry"
          ],

          requiredProcessingTasks: [],

          optionalProcessingTasks: [
            "chop"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "fencing",
            "forage-frame",
            "basket",
            "hand-pruners"
          ],

          harvestPattern:
            "continuous",

          harvestFrequencyCategory:
            "several-weekly",

          storageMethods: [
            "short-term-fresh"
          ],

          preferredStorageMethod:
            "immediate-feeding",

          storageDurationCategory:
            "immediate",

          nonElectricStorageSuitable:
            false,

          refrigerationSuitable:
            true,

          freezingSuitable:
            false,

          dryingRequired:
            false,

          curingRequired:
            false,

          shellingRequired:
            false,

          threshingRequired:
            false,

          cookingRequired:
            false,

          grindingRequired:
            false,

          moistureSensitive:
            true,

          moldRiskScore:
            2,

          rodentRiskScore:
            1,

          storedInsectRiskScore:
            1,

          harvestEaseScore:
            5,

          preparationEaseScore:
            5,

          beginnerSuitabilityScore:
            5,

          householdFoodValueScore:
            1,

          flockValueScore:
            5,

          safetyWarnings: [
            "Allow the crop to establish before permitting flock access.",
            "Avoid unrestricted grazing that uproots or destroys the stand.",
            "Use clean fresh growth rather than slimy, moldy, contaminated, or badly decayed forage.",
            "Do not treat fresh forage as a replacement for complete poultry feed.",
            "Do not use chemically treated seed where plants or leftover seed may be fed."
          ],

          incompatibleUserTraits: [
            "requires-long-term-storage",
            "wants-dry-grain-only",
            "has-no-way-to-protect-establishing-crop"
          ]
        },

        {
          id:
            "whole-dried-oat-seed-heads",

          label:
            "Whole Dried Oat Seed Heads",

          description:
            "Mature oat seed heads cut and dried under protected, ventilated conditions for later whole-head flock enrichment.",

          primaryFeedRole:
            "stored-enrichment",

          harvestProducts: [
            "dried-seed-heads"
          ],

          suitableFeedingMethods: [
            "whole-seed-heads",
            "winter-storage",
            "seasonal-enrichment"
          ],

          requiredProcessingTasks: [
            "dry"
          ],

          optionalProcessingTasks: [
            "clean-sort"
          ],

          requiredEquipment: [],

          helpfulEquipment: [
            "hand-pruners",
            "basket",
            "drying-rack",
            "drying-screen",
            "fan",
            "food-safe-container",
            "metal-grain-can"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "seasonal",

          storageMethods: [
            "dried-whole"
          ],

          preferredStorageMethod:
            "protected-shorter-term-dried-whole",

          storageDurationCategory:
            "medium",

          nonElectricStorageSuitable:
            true,

          refrigerationSuitable:
            false,

          freezingSuitable:
            false,

          dryingRequired:
            true,

          curingRequired:
            false,

          shellingRequired:
            false,

          threshingRequired:
            false,

          cookingRequired:
            false,

          grindingRequired:
            false,

          moistureSensitive:
            true,

          moldRiskScore:
            4,

          rodentRiskScore:
            4,

          storedInsectRiskScore:
            3,

          harvestEaseScore:
            3,

          preparationEaseScore:
            3,

          beginnerSuitabilityScore:
            4,

          householdFoodValueScore:
            2,

          flockValueScore:
            4,

          safetyWarnings: [
            "Dry heads thoroughly before enclosed storage.",
            "Do not seal heads while they remain warm or damp.",
            "Inspect stored heads for condensation, insects, rodents, heating, musty odor, and mold.",
            "Do not feed damaged, moldy, musty, rancid, or contaminated heads.",
            "Do not feed chemically treated planting seed."
          ],

          incompatibleUserTraits: [
            "declines-drying",
            "has-no-protected-drying-area",
            "has-no-dry-storage",
            "has-no-rodent-protected-storage"
          ]
        },

        {
          id:
            "loose-dried-whole-oat-grain",

          label:
            "Loose Dried Whole Oat Grain",

          description:
            "Mature oat grain threshed from adequately dried seed heads, winnowed, cleaned, and stored whole for measured supplemental feeding.",

          primaryFeedRole:
            "moderate-energy-grain",

          harvestProducts: [
            "dry-seeds"
          ],

          suitableFeedingMethods: [
            "whole-grain",
            "measured-supplement",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "dry",
            "thresh",
            "winnow",
            "clean-sort"
          ],

          optionalProcessingTasks: [],

          requiredEquipment: [],

          helpfulEquipment: [
            "drying-rack",
            "drying-screen",
            "fan",
            "grain-thresher",
            "moisture-meter",
            "food-safe-bucket",
            "food-safe-container",
            "metal-grain-can",
            "rodent-proof-room"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "seasonal",

          storageMethods: [
            "dried-shelled"
          ],

          preferredStorageMethod:
            "airtight-after-adequate-drying",

          storageDurationCategory:
            "long",

          nonElectricStorageSuitable:
            true,

          refrigerationSuitable:
            false,

          freezingSuitable:
            false,

          dryingRequired:
            true,

          curingRequired:
            false,

          shellingRequired:
            false,

          threshingRequired:
            true,

          cookingRequired:
            false,

          grindingRequired:
            false,

          moistureSensitive:
            true,

          moldRiskScore:
            4,

          rodentRiskScore:
            5,

          storedInsectRiskScore:
            4,

          harvestEaseScore:
            3,

          preparationEaseScore:
            2,

          beginnerSuitabilityScore:
            3,

          householdFoodValueScore:
            4,

          flockValueScore:
            4,

          safetyWarnings: [
            "Grain must be adequately dried and cooled before airtight storage.",
            "Provide suitable grit when adult chickens consume whole grain.",
            "Do not assume whole oats provide the energy or nutrient balance of complete poultry feed.",
            "Inspect regularly for moisture, heating, insects, rodents, rancidity, and mold.",
            "Discard musty, moldy, heated, rancid, sprouted-in-storage, or contaminated grain.",
            "Do not feed chemically treated planting seed."
          ],

          incompatibleUserTraits: [
            "declines-drying",
            "declines-threshing",
            "declines-winnowing",
            "requires-minimal-processing",
            "has-no-dry-storage",
            "has-no-rodent-protected-storage"
          ]
        },

        {
          id:
            "ground-oat-grain",

          label:
            "Ground or Coarsely Processed Oat Grain",

          description:
            "Sound mature oat grain dried, threshed, cleaned, and ground or coarsely processed for measured supplemental use or incorporation into a properly balanced ration.",

          primaryFeedRole:
            "processed-grain",

          harvestProducts: [
            "dry-seeds"
          ],

          suitableFeedingMethods: [
            "processed-grain",
            "measured-supplement"
          ],

          requiredProcessingTasks: [
            "dry",
            "thresh",
            "winnow",
            "clean-sort",
            "grind"
          ],

          optionalProcessingTasks: [],

          requiredEquipment: [
            "grain-mill"
          ],

          helpfulEquipment: [
            "drying-rack",
            "drying-screen",
            "fan",
            "grain-thresher",
            "feed-grinder",
            "moisture-meter",
            "food-safe-bucket",
            "food-safe-container",
            "metal-grain-can",
            "rodent-proof-room"
          ],

          harvestPattern:
            "major",

          harvestFrequencyCategory:
            "seasonal",

          storageMethods: [
            "dried-shelled"
          ],

          preferredStorageMethod:
            "shorter-term-airtight-after-grinding",

          storageDurationCategory:
            "medium",

          nonElectricStorageSuitable:
            true,

          refrigerationSuitable:
            false,

          freezingSuitable:
            true,

          dryingRequired:
            true,

          curingRequired:
            false,

          shellingRequired:
            false,

          threshingRequired:
            true,

          cookingRequired:
            false,

          grindingRequired:
            true,

          moistureSensitive:
            true,

          moldRiskScore:
            4,

          rodentRiskScore:
            5,

          storedInsectRiskScore:
            4,

          harvestEaseScore:
            3,

          preparationEaseScore:
            1,

          beginnerSuitabilityScore:
            2,

          householdFoodValueScore:
            4,

          flockValueScore:
            4,

          safetyWarnings: [
            "Process only sound, clean, adequately dried grain.",
            "Grinding exposes more grain surface to oxygen, moisture, contamination, and quality loss.",
            "Store processed oats for a shorter period than intact whole grain.",
            "Grinding does not make oats a complete poultry ration.",
            "Do not feed moldy, musty, heated, rancid, insect-damaged, or rodent-contaminated material.",
            "Do not feed chemically treated planting seed."
          ],

          incompatibleUserTraits: [
            "declines-drying",
            "declines-threshing",
            "declines-winnowing",
            "declines-grinding",
            "requires-minimal-processing",
            "owns-no-grinding-equipment",
            "will-not-purchase-required-equipment",
            "has-no-dry-storage",
            "has-no-rodent-protected-storage"
          ]
        }
      ],

      dataQuality: {
        overallConfidence:
          null,

        verifiedFields: [
          "identity",
          "lifecycle",
          "climate.directFacts.seasonType",
          "climate.directFacts.springPlantingSuitable",
          "climate.directFacts.fallPlantingSuitable",
          "climate.directFacts.winterHardinessHighlyVarietyDependent",
          "climate.directFacts.generallyLessWinterHardyThanRyeOrWheat",
          "climate.directFacts.severeColdCanCauseWinterKill",
          "climate.directFacts.southernYieldLossTemperatureReferenceF",
          "soil.preferredPHMinimum",
          "soil.preferredPHMaximum",
          "soil.directFacts.preferredDrainage",
          "soil.directFacts.soilPHSourceRanges",
          "water.directFacts.establishmentMoistureImportant",
          "water.directFacts.regularMoistureImprovesProduction",
          "space.directFacts.layoutFlexible",
          "space.directFacts.blockPollinationRequired",
          "space.directFacts.suitableForBroadcastStand",
          "space.directFacts.continuousStandMostPractical",
          "flock.directFacts.edibleFeedParts",
          "flock.directFacts.nutritionalOrientation",
          "flock.directFacts.balancedFeedReplacement",
          "flock.directFacts.ordinaryHulledOatsBaseline",
          "flock.directFacts.nakedOatsNutritionallyDifferent",
          "labor.directFacts.directSeedingSuitable",
          "goals.directFacts.coolSeasonAnnual",
          "goals.directFacts.dualForageAndGrainPotential",
          "goals.directFacts.coverCropPotential",
          "goals.directFacts.erosionControlPotential",
          "goals.directFacts.nitrogenCapturePotential",
          "goals.directFacts.greenManurePotential",
          "risks.directFacts.winterKillPossible",
          "risks.directFacts.lodgingPossible",
          "risks.directFacts.crownRustConcern",
          "risks.directFacts.looseSmutConcern",
          "risks.directFacts.cerealLeafBeetlePreference",
          "risks.directFacts.wetWeatherCanReduceGrainQuality",
          "risks.directFacts.promptHarvestImportant",
          "risks.directFacts.moistureControlImportantDuringStorage",
          "seasonalRoles.directFacts.coolSeasonAnnual",
          "seasonalRoles.directFacts.springAndFallPlantingPossible",
          "seasonalRoles.directFacts.forageQualityDeclinesWithMaturity",
          "seasonalRoles.directFacts.grainHarvestMoistureReferencePercent",
          "usePaths.fresh-young-oat-forage.harvestProducts",
          "usePaths.whole-dried-oat-seed-heads.harvestProducts",
          "usePaths.loose-dried-whole-oat-grain.harvestProducts",
          "usePaths.ground-oat-grain.harvestProducts"
        ],

        derivedFields: [
          "climate.suitableClimateTypes",
          "climate.preferredClimateTypes",
          "climate.challengingClimateTypes",
          "climate.heatToleranceScore",
          "climate.droughtClimateToleranceScore",
          "climate.humidityToleranceScore",
          "climate.coolSummerToleranceScore",
          "climate.frostSensitivityScore",
          "climate.indoorSeedStartingBenefitScore",
          "site",
          "soil.textureScores",
          "soil.drainageRequirementScore",
          "soil.temporaryWetToleranceScore",
          "soil.waterloggingSensitivityScore",
          "soil.compactionToleranceScore",
          "soil.establishmentInSodDifficultyScore",
          "soil.fertilityRequirementScore",
          "soil.nitrogenRequirementScore",
          "soil.phosphorusRequirementScore",
          "soil.potassiumRequirementScore",
          "water",
          "space",
          "flock.flockPurposeScores",
          "flock.feedingMethodScores",
          "flock.directRunSuitabilityScore",
          "flock.forageFrameSuitabilityScore",
          "flock.rotationalPaddockSuitabilityScore",
          "flock.confinedFlockValueScore",
          "flock.pasturedFlockValueScore",
          "flock.treatDilutionRiskScore",
          "labor",
          "cost",
          "goals",
          "risks.wildlife",
          "risks.insectsRiskScore",
          "risks.diseaseRiskScore",
          "risks.lodgingRiskScore",
          "risks.fieldMoldRiskScore",
          "risks.dryingMoldRiskScore",
          "risks.storageMoldRiskScore",
          "risks.storedInsectRiskScore",
          "seasonalRoles.plantingWindows",
          "seasonalRoles.harvestWindows",
          "usePaths.fresh-young-oat-forage.harvestEaseScore",
          "usePaths.fresh-young-oat-forage.preparationEaseScore",
          "usePaths.fresh-young-oat-forage.beginnerSuitabilityScore",
          "usePaths.whole-dried-oat-seed-heads.harvestEaseScore",
          "usePaths.whole-dried-oat-seed-heads.preparationEaseScore",
          "usePaths.whole-dried-oat-seed-heads.beginnerSuitabilityScore",
          "usePaths.loose-dried-whole-oat-grain.harvestEaseScore",
          "usePaths.loose-dried-whole-oat-grain.preparationEaseScore",
          "usePaths.loose-dried-whole-oat-grain.beginnerSuitabilityScore",
          "usePaths.ground-oat-grain.harvestEaseScore",
          "usePaths.ground-oat-grain.preparationEaseScore",
          "usePaths.ground-oat-grain.beginnerSuitabilityScore"
        ],

        uncertainFields: [
          "climate.minimumFrostFreeDays",
          "climate.preferredFrostFreeDays",
          "climate.minimumSoilTemperatureF",
          "climate.preferredSoilTemperatureF",
          "climate.daysToMaturityMinimum",
          "climate.daysToMaturityMaximum",
          "climate.dryDownBufferDays",
          "site.absoluteMinimumSunHours",
          "soil.minimumSoilDepthIn",
          "soil.preferredSoilDepthIn",
          "soil.survivalPHMinimum",
          "soil.survivalPHMaximum",
          "soil.saltToleranceScore",
          "space.minimumTrialAreaSqFt",
          "space.minimumUsefulAreaSqFt",
          "space.preferredProductionAreaSqFt",
          "space.minimumContainerGallons",
          "space.minimumRaisedBedDepthIn",
          "flock.portionGuidance",
          "usePaths.fresh-young-oat-forage.storageDurationCategory",
          "usePaths.whole-dried-oat-seed-heads.storageDurationCategory",
          "usePaths.loose-dried-whole-oat-grain.storageDurationCategory",
          "usePaths.ground-oat-grain.storageDurationCategory",
          "economics.potentialFeedSavings",
          "spaceAndYield.expectedYieldPer100SquareFeetMinimumLbs",
          "spaceAndYield.expectedYieldPer100SquareFeetMaximumLbs"
        ],

        missingFields: [],

        assumptions: [
          "Planner scoring represents ordinary hulled oats unless a field explicitly says otherwise.",
          "Fresh-forage scoring assumes controlled access after establishment rather than unrestricted permanent-run exposure.",
          "Whole-head feeding is treated as a practical enrichment path but has limited direct backyard poultry research.",
          "Adult chickens are assumed to have access to appropriate grit when consuming whole grain.",
          "The stored-grain paths assume adequate drying, cooling, pest control, and rodent protection.",
          "The ground-grain path uses the existing general grind task rather than introducing a crop-specific cracking task.",
          "Crop-category and feed-category values use the existing shared configuration enums.",
          "No exact safe dietary inclusion percentage is assigned."
        ],

        validationNotes: [
          "The crop remains in testing until schema validation, regression testing, and targeted oat profiles are complete.",
          "The public guide page must exist before developmentStatus changes to ready.",
          "Test living-forage, forage-frame, cool-season, winter-kill, whole-head, threshing, grinding, humid-storage, and limited-water scenarios.",
          "Confirm that the four use paths use only active task and equipment IDs.",
          "Confirm that no existing 23-profile expected leader changes unintentionally."
        ]
      },

      sources: {
        primarySources: [
          {
            title:
              "Southern Small Grains Resource Management Handbook",

            organization:
              "University of Georgia Cooperative Extension",

            sourceType:
              "extension-production-guide",

            use:
              "Oat adaptation, uses, planting, winter hardiness, forage, diseases, harvest moisture, drying, and storage"
          },

          {
            title:
              "Planting Guide for Row Crops in Georgia",

            organization:
              "University of Georgia Cooperative Extension",

            sourceType:
              "extension-planting-guide",

            use:
              "Regional planting dates, harvest dates, seeding rate, and certified-seed guidance"
          },

          {
            title:
              "Organic Oat Production",

            organization:
              "University of Minnesota Extension",

            sourceType:
              "extension-production-guide",

            use:
              "Soil drainage, pH, fertility, field selection, and crop management"
          },

          {
            title:
              "Oats in Poultry Diets",

            organization:
              "Small and Backyard Poultry Extension",

            sourceType:
              "poultry-feed-reference",

            use:
              "Nutrient composition, hull variation, fiber, beta-glucans, energy limitations, naked-oat distinction, and poultry-ration context"
          },

          {
            title:
              "Georgia Forages: Grass Species",

            organization:
              "University of Georgia Cooperative Extension",

            sourceType:
              "extension-forage-guide",

            use:
              "Cool-season forage growth, winter-kill risk, grazing tolerance, and spring production"
          }
        ],

        notes: [
          "Oats plannerData applies to Avena sativa grown for ordinary hulled grain or vegetative forage.",
          "It does not treat naked oats, groats, rolled oats, oat hulls, or commercial oat by-products as nutritionally identical.",
          "The four use paths are fresh young forage, whole dried seed heads, loose dried whole grain, and ground grain.",
          "Fresh forage is modeled as controlled access, forage-frame use, rotational grazing, or cut-and-carry harvest.",
          "The crop is treated as a moderate-energy, high-fiber grain rather than a concentrated high-energy crop.",
          "No exact safe flock inclusion rate has been assigned.",
          "No medicinal claims are made.",
          "The crop must remain in testing until targeted profiles and the public growing guide are complete."
        ]

      }
      }
    },

    ///////////////////////////////////////////////
    //
    //
    //
    //
    //  CROP - WHEAT
    //
    //
    //
    //
    //////////////////////////////////////////////

  "CROP-WHEAT": {
    "id": "CROP-WHEAT",
    "name": "Wheat",
    "scientificName": "Triticum aestivum",
    "category": "Cool-Season Grain, Forage, and Cover Crop",
    "cropType": "Annual",
    "seasonType": "Cool Season",
    "status": "Initial Research Complete",
    "summary": "Wheat is a cool-season annual cereal that can provide controlled young forage, whole mature seed heads, or dry stored grain for adult chickens. Mature wheat grain is a relatively low-fiber, energy-oriented cereal with more protein than corn, while winter wheat can also provide erosion control, nutrient scavenging, weed suppression, and seasonal ground cover. It remains a supplemental crop rather than a complete poultry ration.",

    "chickenUse": {
      "edibleParts": [
        "Young vegetative leaves and shoots",
        "Mature wheat kernels",
        "Whole mature seed heads",
        "Threshed whole grain",
        "Cracked or coarsely ground grain"
      ],

      "primaryValue": [
        "Cool-season fresh forage",
        "Concentrated carbohydrate energy",
        "Moderate protein",
        "Pecking and foraging enrichment",
        "Dry grain storage",
        "Seasonal ground cover"
      ],

      "feedingForms": [
        "Protected living forage",
        "Cut-and-carry young greens",
        "Whole dried seed heads",
        "Threshed whole grain",
        "Cracked or coarsely ground grain",
        "A measured ingredient in a properly balanced poultry ration"
      ],

      "bestFor": [
        "Adult chickens receiving a complete base ration",
        "Cool-season feed gardens",
        "Protected forage frames",
        "Rotational chicken areas",
        "Small-flock enrichment",
        "Dry winter grain storage",
        "Growers seeking a dual-purpose forage and grain crop"
      ],

      "supplementOnly": true,

      "preparationNotes": "For forage use, provide controlled access to young vegetative growth or harvest clean young leaves for cut-and-carry feeding. Where grain harvest is intended, stop grazing or cutting before stem jointing so the growing point and future grain yield are not damaged. Harvest mature heads after the kernels have filled, then dry thoroughly before storing whole heads or threshed grain. Whole grain may be fed as a measured supplement to adult chickens; cracking or coarse grinding can improve handling but is not required for every adult flock.",

      "safetyNotes": "Wheat must supplement rather than replace an age-appropriate complete poultry ration. Do not feed moldy, musty, sprouted, heat-damaged, ergot-contaminated, chemically treated, or otherwise questionable grain or forage. Keep planting seed treated with fungicides or insecticides completely separate from feed. Avoid unrestricted access to mature standing wheat if the crop is expected to produce grain."
    },

    "nutrition": {
      "basis": "Approximate values for dry hard and soft wheat grain used as poultry-feed ingredients. Composition varies by wheat class, cultivar, growing environment, test weight, damage, and analytical method. Fresh forage and wheat by-products are not nutritionally equivalent to whole grain.",

      "crudeProteinPercent": "Approximately 10.8% to 13.5% for soft and hard wheat grain",

      "fatPercent": "Approximately 1.7% to 1.9%",

      "fiberPercent": "Approximately 2.8% to 3.0%",

      "calciumPercent": "Approximately 0.05%",

      "phosphorusPercent": "Approximately 0.30% to 0.41% total phosphorus",

      "notableNutrients": [
        "Starch-based energy",
        "Moderate protein",
        "More lysine and tryptophan than corn",
        "Low crude fiber relative to ordinary hulled oats",
        "Phosphorus",
        "Gluten-forming proteins"
      ],

      "limitations": [
        "Wheat is an energy grain rather than a complete poultry feed",
        "Protein level and amino-acid balance vary among hard and soft wheat classes",
        "Calcium is very low for laying-hen requirements",
        "Most phosphorus is not fully available to poultry because much occurs as phytate",
        "Large supplemental amounts can dilute vitamins, minerals, calcium, and balanced amino acids from complete feed",
        "Fresh forage, whole grain, bran, middlings, screenings, and other wheat products must not be treated as nutritionally identical",
        "Damaged, moldy, sprouted, ergot-contaminated, or chemically treated wheat is unsuitable for flock use"
      ]
    },

    "growing": {
      "sunlight": "Full sun",

      "soilTemperatureMinimumF": null,

      "idealSoilTemperatureF": null,

      "frostTolerance": "Moderate to High for adapted winter-wheat varieties; variety- and growth-stage-dependent",

      "heatTolerance": "Low to Moderate during reproductive growth",

      "droughtTolerance": "Moderate after establishment, but moisture stress can reduce tillering, head development, and grain fill",

      "soilPHMinimum": 6.0,

      "soilPHMaximum": 7.0,

      "waterNeeds": "Moderate; dependable moisture is important for germination, establishment, tillering, stem elongation, heading, flowering, and grain filling, while saturated soil and poor drainage raise disease and root-loss risk",

      "directSow": true,

      "transplantRecommended": false,

      "daysToFirstHarvestMinimum": null,

      "daysToFirstHarvestMaximum": null,

      "daysToMaturityMinimum": null,

      "daysToMaturityMaximum": null,

      "plantSpacingInches": "Normally planted as a dense drilled or broadcast stand rather than individually spaced plants",

      "rowSpacingInches": "Approximately 6 to 7.5 inches for drilled production; backyard layouts may vary",

      "plantingDepthInches": "Approximately 0.75 to 1.5 inches; avoid planting deeper than about 1.5 to 2 inches",

      "successionPlanting": false,

      "regrowthAfterHarvest": false
    },

    "regionalPlanting": {
      "coldNorth": {
        "plantingWindow": "Plant locally adapted winter wheat in late summer or early fall early enough to establish before winter, or plant spring wheat as soon as soil is workable where winter wheat is unreliable. Use regional variety recommendations because winter hardiness and vernalization requirements vary.",

        "harvestWindow": "Late spring through summer, depending on winter versus spring type and local climate."
      },

      "midwestNortheast": {
        "plantingWindow": "Plant winter wheat during the locally recommended fall window, commonly after summer crops are removed. Spring wheat may be planted early in spring in regions where it is adapted.",

        "harvestWindow": "Late spring through midsummer, depending on wheat class, planting date, and latitude."
      },

      "upperSouth": {
        "plantingWindow": "Plant winter wheat in fall near the locally recommended grain-planting window. Earlier planting may increase fall forage but can also increase insect, disease, and grain-yield risks.",

        "harvestWindow": "Late spring to early summer."
      },

      "deepSouth": {
        "plantingWindow": "Plant adapted winter wheat during the regional fall window after temperatures moderate. Select varieties with appropriate vernalization, disease resistance, and maturity for the location.",

        "harvestWindow": "Spring to early summer."
      },

      "southwest": {
        "plantingWindow": "Plant adapted winter or spring wheat according to elevation, winter temperatures, irrigation availability, and local production guidance. Avoid placing grain fill in extreme heat where possible.",

        "harvestWindow": "Late spring through summer, depending on elevation and wheat type."
      },

      "pacificNorthwest": {
        "plantingWindow": "Plant locally adapted winter wheat in fall or spring wheat early in spring, depending on rainfall zone, winter hardiness, disease pressure, and local production system.",

        "harvestWindow": "Summer."
      },

      "coastalWest": {
        "plantingWindow": "Plant during the locally recommended cool-season window, often fall through winter in mild climates. Variety selection and disease management are important where winters are wet.",

        "harvestWindow": "Late spring through summer."
      }
    },

    "spaceAndYield": {
      "plantsPer10SquareFeet": null,

      "plantsPer50SquareFeet": null,

      "plantsPer100SquareFeet": null,

      "expectedYieldPerPlantMinimumLbs": null,

      "expectedYieldPerPlantMaximumLbs": null,

      "expectedYieldPer100SquareFeetMinimumLbs": null,

      "expectedYieldPer100SquareFeetMaximumLbs": null,

      "edibleYieldPercent": null,

      "storageLife": "Potentially many months when grain is clean, sound, adequately dried, cooled, protected from insects and rodents, and monitored under suitable storage conditions",

      "storageMethod": "Thresh and clean mature grain, dry it to a safe moisture level for the intended storage duration and climate, cool it before sealing, and store it in a dry rodent-resistant container. Inspect regularly for condensation, heating, insects, off odors, sprouting, and mold. Whole heads require more storage volume and careful drying.",

      "yieldNotes": "No backyard yield estimate is assigned. Commercial wheat yields depend on wheat class, cultivar, planting date, stand density, soil fertility, winter survival, rainfall or irrigation, weeds, insects, diseases, lodging, bird loss, harvest timing, and whether the crop is also grazed. Commercial seeding rates and field yields should not be converted directly into a guaranteed backyard yield per square foot."
    },

    "economics": {
      "seedCostEstimate": "Usually low to moderate, depending on certified seed, wheat class, variety, and quantity",

      "equipmentCostEstimate": "Low for a small hand-sown trial; optional costs include a seed drill or spreader, irrigation, fencing or forage frames, bird protection, sickle or shears, threshing screens, winnowing equipment, drying equipment, and grain-storage containers",

      "irrigationCostLevel": "Low to Moderate",

      "laborLevel": "Moderate",

      "potentialFeedSavings": "Not yet quantified. Economic value depends on usable grain or forage yield, land, labor, processing losses, storage losses, and the cost of purchased complete feed. Homegrown wheat should not be valued pound-for-pound as a replacement for complete ration.",

      "economicNotes": "Wheat can provide value beyond chicken feed through erosion control, nutrient scavenging, weed suppression, soil cover, straw, and possible household grain use. Small plantings may be most economical when used as protected forage or whole-head enrichment, because threshing, cleaning, drying, and storing loose grain add labor."
    },

    "scores": {
      "easeOfGrowing": null,

      "yieldPerSquareFoot": null,

      "nutritionalUsefulness": null,

      "proteinContribution": null,

      "energyContribution": null,

      "storageValue": null,

      "smallSpaceSuitability": null,

      "heatTolerance": null,

      "coldTolerance": null,

      "laborEfficiency": null,

      "economicPotential": null,

      "safetySimplicity": null
    },

    "rankings": {
      "practicalScore": null,

      "nutritionalScore": null,

      "bcpFeedScore": null
    },

        "evidence": {
      "evidenceStrength": "Strong for commercial cultivation, forage management, grain storage, and wheat use in poultry diets; limited for backyard-scale grain yield, flock-specific forage intake, and direct feed-savings estimates",
      "sources": [
        {
          "title": "Wheat in Poultry Diets",
          "organization": "Small and Backyard Poultry Extension",
          "url": "https://poultry.extension.org/articles/feeds-and-feeding-of-poultry/feed-ingredients-for-poultry/cereals-in-poultry-diets/wheat-in-poultry-diets/",
          "use": "Poultry-feed value, hard and soft wheat nutrient composition, energy comparison with corn, fiber, protein, amino acids, calcium, phosphorus, and wheat by-product distinctions"
        },
        {
          "title": "Planting Guide for Row Crops in Georgia",
          "organization": "University of Georgia Cooperative Extension",
          "url": "https://extension.uga.edu/publications/detail.html?number=C813",
          "use": "Wheat planting windows, seeding rate, row density, planting-depth limit, harvest period, and certified-seed guidance"
        },
        {
          "title": "Southern Small Grains Resource Management Handbook",
          "organization": "University of Georgia Cooperative Extension",
          "url": "https://extension.uga.edu/publications/detail.html?number=B1190",
          "use": "Southern wheat planting, forage-versus-grain timing, establishment, tillering, winter damage, disease, harvest, and storage management"
        },
        {
          "title": "Georgia Forages: Grass Species",
          "organization": "University of Georgia Cooperative Extension",
          "url": "https://extension.uga.edu/publications/detail.html?number=B1351",
          "use": "Wheat winter hardiness, forage timing, grazing and silage value, and removal before jointing when grain production is intended"
        },
        {
          "title": "Winter Wheat as a Cover Crop",
          "organization": "Penn State Extension",
          "url": "https://extension.psu.edu/winter-wheat-as-a-cover-crop",
          "use": "Winter hardiness, vernalization, erosion control, nutrient scavenging, organic matter, weed suppression, seeding depth, row spacing, and cover-crop management"
        },
        {
          "title": "Impact of Grazing on Wheat Grain Yield",
          "organization": "Oklahoma State University Extension",
          "url": "https://extension.okstate.edu/fact-sheets/impact-of-grazing-on-wheat-grain-yield",
          "use": "Effect of grazing and planting date on subsequent grain yield and importance of ending grazing by first hollow stem"
        },
        {
          "title": "Grain Harvest – Timely Info",
          "organization": "University of Georgia Cooperative Extension",
          "url": "https://site.extension.uga.edu/plowpoints/2022/05/grain-harvest-timely-info/",
          "use": "Wheat drying and safe long-term storage moisture guidance for Georgia conditions"
        }
      ],
      "lastReviewed": "2026-07-17",
      "researchNotes": [
        "Keep winter wheat and spring wheat planting logic distinct in future regional profiles.",
        "Do not treat wheat forage, whole grain, bran, middlings, screenings, or flour as nutritionally interchangeable.",
        "Do not assign a backyard grain yield until a defensible small-plot source or measured trials are available.",
        "Do not assign an exact flock inclusion percentage without formulation context and poultry-stage-specific guidance.",
        "Research backyard threshing and winnowing methods before recommending equipment.",
        "Research awned versus awnless varieties for whole-head flock use.",
        "Research local disease-resistant varieties before building state-level recommendations.",
        "Retain treated-seed, ergot, mold, sprouting, and storage-insect warnings in every public guide.",
        "Calculate comparative scores only after Wheat is tested against Oats, Barley, Rye, Triticale, Millet, Sorghum, and Corn under the same scoring rules."
      ]
    },

    "plannerData": {
      "schemaVersion": "1.0.0",
      "developmentStatus": "ready",

      "identity": {
        "plannerName": "Wheat",
        "shortLabel": "Wheat",
        "icon": "🌾",
        "cropCategory": "grain",
        "primaryFeedCategory": "energy",
        "guideUrl": "growing-wheat-for-chickens.html"
      },

      "lifecycle": {
        "growthCycle": "annual",
        "isAnnual": true,
        "isBiennial": false,
        "isPerennial": false,
        "isTreeOrShrub": false,
        "yearsToFirstUsefulHarvest": 0,
        "yearsToFullProduction": 0,
        "expectedUsefulLifeYears": 1,
        "regrowsAfterHarvest": false,
        "permanentPlantingRequired": false,
        "reversibleAfterOneSeason": true
      },

      "climate": {
        "suitableClimateTypes": [
          "cold-short-summer",
          "cool-moderate-summer",
          "temperate",
          "hot-humid",
          "hot-dry",
          "mild-winter",
          "high-elevation"
        ],

        "preferredClimateTypes": [
          "cool-moderate-summer",
          "temperate"
        ],

        "challengingClimateTypes": [
          "extreme-heat-during-grain-fill",
          "waterlogged-winter"
        ],

        "minimumFrostFreeDays": null,
        "preferredFrostFreeDays": null,
        "minimumSoilTemperatureF": null,
        "preferredSoilTemperatureF": null,
        "daysToMaturityMinimum": null,
        "daysToMaturityMaximum": null,
        "referenceDaysToPhysiologicalMaturity": null,
        "dryDownBufferDays": null,
        "heatToleranceScore": 3,
        "droughtClimateToleranceScore": 3,
        "humidityToleranceScore": 3,
        "coolSummerToleranceScore": 5,
        "frostSensitivityScore": 2,
        "winterHardinessRequired": true,

        "seasonExtensionBenefits": [
          "Locally adapted winter wheat can occupy the cool season and protect soil while warm-season beds are otherwise unused.",
          "Spring wheat can provide an alternative where winter wheat is unreliable or the fall planting window was missed.",
          "Earlier fall planting can increase forage production but may raise insect, disease, and later grain-yield risks.",
          "Variety selection is more dependable than relying on temporary frost protection."
        ],

        "indoorSeedStartingBenefitScore": 1,

        "directFacts": {
          "seasonType": "cool-season",
          "winterAndSpringTypesExist": true,
          "winterWheatRequiresVernalizationForNormalHeading": true,
          "winterHardinessVarietyDependent": true,
          "plantingSeasonVariesByWheatType": true,

          "notes": [
            "Triticum aestivum includes winter and spring growth habits that must not be assigned the same planting calendar.",
            "Winter wheat is planted in fall and resumes growth in spring after winter dormancy.",
            "Spring wheat is normally planted early in spring where it is adapted.",
            "Winter wheat planted in spring may grow vegetatively but may fail to produce normal seed heads because it lacks adequate vernalization.",
            "Heat during flowering and grain filling can reduce productive performance.",
            "Regional variety recommendations are essential because winter hardiness, maturity, disease resistance, and vernalization needs vary."
          ]
        }
      },

      "site": {
        "absoluteMinimumSunHours": null,
        "productiveMinimumSunHours": 6,
        "preferredSunHours": 8,
        "shadeToleranceScore": 2,
        "afternoonShadeBenefitInHeat": 2,
        "windToleranceScore": 3,
        "lodgingRiskScore": 3,
        "reflectedHeatToleranceScore": 2,
        "airflowRequirementScore": 4,
        "frostPocketSensitivityScore": 2,
        "treeRootCompetitionToleranceScore": 2,
        "hardscapeConflictRiskScore": 1,
        "structureConflictRiskScore": 1,
        "utilityConflictRiskScore": 1,
        "fruitDropMessRiskScore": 2,
        "stainingRiskScore": 1,

        "directFacts": {
          "preferredLight": "full-sun",
          "productiveSunGuidance": "Full sun is preferred for dense vegetative growth, tillering, head development, and grain filling.",
          "windExposureConcern": true,
          "lodgingPossible": true,

          "notes": [
            "Low light can reduce tillering, biomass, stand density, and grain production.",
            "Dense, tall, overfertilized, or storm-exposed stands may lodge.",
            "Good airflow helps foliage and heads dry after rain or dew.",
            "Avoid tree-root competition and locations that remain shaded or saturated through winter.",
            "The mature crop is not usually a major structural conflict, but dry heads and straw can shed material near paths."
          ]
        }
      },

      "soil": {
        "textureScores": {
          "heavyClay": 2,
          "clayLoam": 4,
          "loam": 5,
          "sandyLoam": 4,
          "verySandy": 2,
          "rocky": 2
        },

        "drainageRequirementScore": 5,
        "temporaryWetToleranceScore": 2,
        "waterloggingSensitivityScore": 4,
        "minimumSoilDepthIn": null,
        "preferredSoilDepthIn": null,
        "compactionToleranceScore": 2,
        "establishmentInSodDifficultyScore": 4,
        "preferredPHMinimum": 6.0,
        "preferredPHMaximum": 7.0,
        "survivalPHMinimum": null,
        "survivalPHMaximum": null,
        "fertilityRequirementScore": 4,
        "nitrogenRequirementScore": 4,
        "phosphorusRequirementScore": 3,
        "potassiumRequirementScore": 3,
        "benefitsFromInoculation": false,
        "inoculantType": null,
        "saltToleranceScore": null,
        "amendmentEffortScore": 3,

        "directFacts": {
          "preferredDrainage": "well-drained",

          "adaptableTextures": [
            "loam",
            "silt loam",
            "clay loam",
            "sandy loam"
          ],

          "preferredTexture": "A fertile, well-drained loam or silt loam with good seed-to-soil contact and adequate water-holding capacity.",
          "waterloggedSoilSuitable": false,
          "soilTestRecommended": true,
          "nitrogenFixing": false,

          "notes": [
            "Wheat performs poorly where prolonged saturation limits roots or increases disease.",
            "A firm, fine seedbed and good seed-to-soil contact support uniform emergence.",
            "Very sandy soil may require more dependable water and nutrient management.",
            "Dense clay, crusting, compaction, hardpan, and shallow rock can restrict establishment and rooting.",
            "Wheat does not fix nitrogen and fertility should be based on a soil test and production goal.",
            "The stored pH range is a productive target rather than a universal survival boundary."
          ]
        }
      },

      "water": {
        "overallWaterRequirementLevel": "moderate",
        "germinationWaterNeedLevel": "moderate",
        "establishmentWaterNeedLevel": "moderate",
        "matureWaterNeedLevel": "moderate",
        "floweringWaterNeedLevel": "high",
        "harvestDevelopmentWaterNeedLevel": "high",
        "droughtSurvivalScore": 3,
        "droughtYieldRetentionScore": 2,

        "criticalGrowthStages": [
          "germination",
          "seedling-establishment",
          "tillering",
          "stem-elongation",
          "heading",
          "flowering",
          "grain-filling"
        ],

        "criticalStageWaterImportanceScore": 5,
        "overwateringSensitivityScore": 3,
        "waterloggingSensitivityScore": 4,
        "dripIrrigationBenefitScore": 3,
        "mulchBenefitScore": 2,
        "suitableForRainfallOnlyScore": 4,
        "suitableForLimitedIrrigationScore": 3,
        "containerDryingRiskScore": 4,
        "establishmentYearsRequiringExtraWater": 0,

        "directFacts": {
          "establishmentMoistureImportant": true,
          "regularMoistureImprovesProduction": true,
          "standingWaterSuitable": false,
          "droughtCanReduceTilleringAndGrainFill": true,
          "lateRainCanDelayHarvestAndReduceQuality": true,

          "notes": [
            "Uniform moisture supports emergence and fall or spring establishment.",
            "Water stress during stem elongation, heading, flowering, and grain filling can reduce yield and kernel development.",
            "Wheat can survive moderate dry periods better than continuously saturated soil, but drought survival does not imply high grain yield.",
            "Wet foliage and heads can increase disease, sprouting, and harvest-quality risks.",
            "Irrigation needs are region-, soil-, rainfall-, and production-system-dependent; no universal seasonal water amount is stored."
          ]
        }
      },

      "space": {
        "minimumTrialAreaSqFt": null,
        "minimumUsefulAreaSqFt": null,
        "preferredProductionAreaSqFt": null,
        "smallSpaceScore": 3,
        "mediumSpaceScore": 5,
        "largeSpaceScore": 5,

        "layoutScores": {
          "squareBlock": 5,
          "wideRectangle": 5,
          "longStrip": 5,
          "irregular": 3,
          "smallBeds": 4,
          "openField": 5
        },

        "spaceTypeScores": {
          "inGround": 5,
          "raisedBed": 4,
          "container": 2,
          "fenceLine": 3,
          "buildingEdge": 3,
          "unusedLawn": 4,
          "openField": 5,
          "orchard": 2,
          "forageFrame": 5,
          "rotationalPaddock": 5,
          "greenhouse": 1,
          "hedgerow": 2
        },

        "minimumContainerGallons": null,

        "containerUseLimitation": "Wheat can be grown densely in containers for short-lived forage, but container grain production is generally inefficient because root volume, moisture, stand area, threshing effort, and total grain yield are limiting.",

        "minimumRaisedBedDepthIn": null,
        "vineSpreadRequired": false,
        "verticalSupportBenefitScore": 1,
        "blockPlantingRequired": false,
        "minimumBlockRows": null,
        "continuousStandPreferred": true,
        "heightCategory": "medium",
        "matureWidthCategory": "narrow-upright",
        "overflowSpaceBenefitScore": 1,

        "directFacts": {
          "layoutFlexible": true,
          "blockPollinationRequired": false,
          "suitableForRowPlanting": true,
          "suitableForCloselySpacedStands": true,
          "suitableForSingleOrSmallGroupPlanting": false,
          "denseStandPreferredForProduction": true,

          "commercialSeedingGuidance": {
            "georgiaGrainSeedingRateLbsPerAcreMinimum": 60,
            "georgiaGrainSeedingRateLbsPerAcreMaximum": 90,
            "georgiaIntensiveManagementLbsPerAcreMinimum": 120,
            "georgiaIntensiveManagementLbsPerAcreMaximum": 150,
            "drilledRowWidthInchesMinimum": 6,
            "drilledRowWidthInchesMaximum": 7.5,
            "backyardUseWarning": "Commercial field seeding rates are reference data and must not be converted directly into guaranteed backyard yield."
          },

          "notes": [
            "Wheat is normally grown as a dense stand rather than as individually spaced plants.",
            "Small beds can provide meaningful forage or enrichment, but loose-grain production becomes more efficient as area increases.",
            "Protected forage frames can keep chickens from uprooting or overgrazing the stand.",
            "A rectangular strip or block simplifies sowing, exclusion, cutting, and harvest.",
            "Wheat does not require a square pollination block like field corn.",
            "Single isolated plants provide little practical feed value."
          ]
        }
      },

      "flock": {
        "suitableForAdultChickens": true,
        "suitableForYoungChicks": false,

        "flockPurposeScores": {
          "eggs": 4,
          "meat": 4,
          "breeding": 3,
          "petsEnrichment": 4,
          "homestead": 5,
          "mixed": 5
        },

        "feedingMethodScores": {
          "livingGrazing": 4,
          "cutAndCarry": 4,
          "wholeProduce": 1,
          "wholeSeedHeads": 4,
          "wholeGrain": 5,
          "processedGrain": 5,
          "heatTreated": 1,
          "driedForage": 2,
          "winterStorage": 5
        },

        "directRunSuitabilityScore": 2,
        "forageFrameSuitabilityScore": 5,
        "rotationalPaddockSuitabilityScore": 5,
        "confinedFlockValueScore": 5,
        "pasturedFlockValueScore": 4,
        "treatDilutionRiskScore": 4,
        "highEnergySupplement": true,
        "highFiberSupplement": false,
                "highProteinSupplement": false,
        "scratchGrainValueScore": 5,
        "winterFeedValueScore": 5,
        "summerFeedValueScore": 2,
        "freeChoiceSuitable": false,
        "completeFeedReplacement": false,

        "directFacts": {
          "supplementOnly": true,
          "wholeGrainSuitableForAdultChickens": true,
          "crackedGrainSuitable": true,
          "freshForageSuitable": true,
          "seedHeadsSuitable": true,
          "requiresBalancedRation": true,
          "treatedSeedMustNeverBeFed": true,

          "notes": [
            "Wheat is best used as a measured supplement to a nutritionally complete poultry ration.",
            "Whole mature grain provides scratching enrichment and concentrated energy.",
            "Young vegetative forage may be offered in moderation.",
            "Whole seed heads provide behavioral enrichment while reducing waste.",
            "Do not allow unrestricted consumption of mature grain because nutritional balance can be diluted.",
            "Never feed moldy, sprouted, chemically treated, or ergot-contaminated grain."
          ]
        }
      },

      "labor": {
        "overallLaborRequirement": "moderate",

        "establishmentDifficultyScore": 2,
        "maintenanceDifficultyScore": 2,
        "harvestDifficultyScore": 3,
        "processingDifficultyScore": 4,
        "storageDifficultyScore": 3,

        "mechanizationBenefitScore": 4,

        "directFacts": {
          "easyToBroadcastSeed": true,
          "handHarvestPossible": true,
          "requiresThreshingForLooseGrain": true,
          "requiresDryingBeforeStorage": true,
          "forageHarvestSimplerThanGrainHarvest": true,

          "notes": [
            "Broadcast seeding or simple drilling is straightforward for small plots.",
            "Forage production requires substantially less labor than grain production.",
            "Threshing, winnowing, drying, and cleaning increase labor before storage.",
            "Whole seed heads may reduce processing requirements compared with loose grain.",
            "Stored grain should be inspected regularly for insects, moisture, and mold."
          ]
        }
      },

      "cost": {
        "seedCostScore": 2,
        "fertilityCostScore": 3,
        "waterCostScore": 2,
        "equipmentCostScore": 3,
        "processingCostScore": 4,
        "storageCostScore": 3,

        "directFacts": {
          "seedGenerallyAffordable": true,
          "majorCostsIncreaseWithGrainHarvest": true,
          "forageProductionLowestCost": true,

          "notes": [
            "Seed is generally inexpensive compared with many specialty forage crops.",
            "Grain production becomes more expensive when drying, threshing, cleaning, and storage equipment are added.",
            "Protected forage production can often be accomplished with minimal equipment.",
            "Bird protection may become necessary as heads mature."
          ]
        }
      },

      "goals": {
        "primaryGoals": [
          "Supplemental Feed",
          "Winter Forage",
          "Stored Grain",
          "Cover Crop",
          "Soil Protection",
          "Scratch Grain",
          "Crop Rotation"
        ],

        "secondaryGoals": [
          "Organic Matter",
          "Erosion Reduction",
          "Nutrient Scavenging",
          "Weed Suppression"
        ],

        "notRecommendedFor": [
          "Complete Feed Replacement",
          "Tiny Decorative Containers"
        ]
      },

      "risks": {
        "overallRiskScore": 3,

        "poultryRisks": [
          "Mold and mycotoxins",
          "Ergot contamination",
          "Chemically treated planting seed",
          "Diet dilution if overfed"
        ],

        "gardenRisks": [
          "Rust diseases",
          "Powdery mildew",
          "Lodging",
          "Bird damage near maturity"
        ],

        "humanSafetyConcerns": [
          "Dust during threshing",
          "Safe grain storage required"
        ],

        "directFacts": {
          "treatedSeedUnsafe": true,
          "moldUnsafe": true,
          "ergotUnsafe": true,
          "standingWaterIncreasesDisease": true,

          "notes": [
            "Storage quality is just as important as production quality.",
            "Never assume all harvested grain remains safe after storage.",
            "Monitor grain regularly for insects, heating, condensation, odors, and mold."
          ]
        }
      },

      "seasonalRoles": {
        "spring": [
          "Rapid vegetative growth",
          "Tillering",
          "Stem elongation"
        ],

        "summer": [
          "Heading",
          "Grain fill",
          "Harvest"
        ],

        "fall": [
          "Winter wheat planting",
          "Seedling establishment",
          "Root development"
        ],

        "winter": [
          "Dormancy",
          "Ground cover",
          "Soil protection"
        ]
      },

      "usePaths": {
        "livingForage": true,
        "cutAndCarry": true,
        "wholeSeedHeads": true,
        "wholeGrain": true,
        "crackedGrain": true,
        "storedGrain": true,
        "seedSaving": true,
        "coverCrop": true,
        "soilImprovement": true,
        "compostMaterial": true,
        "mulchMaterial": true
      },

      "dataQuality": {
        "overallConfidence": "High",

        "verifiedSections": [
          "Nutrition",
          "Growing",
          "Planting Windows",
          "Storage",
          "Cover Crop",
          "Forage",
          "Poultry Feeding",
          "Research Sources"
        ],

        "remainingUnknowns": [
          "Small backyard yield values",
          "Planner scoring calibration",
          "Maximum practical dietary inclusion for Backyard Chicken Planner calculations"
        ],

        "futureResearch": [
          "Backyard yield trials",
          "Hard versus soft wheat comparison",
          "Awned versus awnless performance",
          "Regional variety recommendations",
          "BCP scoring normalization"
        ]
      }

    }
  }

  };
