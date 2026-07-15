const BCP_FEED_CROPS = {

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
    }

},

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

      developmentStatus: "skeleton",

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

      climate: {},

      site: {},

      soil: {},

      water: {},

      space: {},

      flock: {},

      labor: {},

      cost: {},

      goals: {},

      risks: {},

      seasonalRoles: {},

      usePaths: [
        {
          id: "whole-dried-seed-head",

          label:
            "Whole Dried Sunflower Seed Head",

          description:
            "A temporary prototype use path representing mature sunflower heads dried and offered whole for flock enrichment and supplemental seed consumption.",

          primaryFeedRole:
            "energy-enrichment",

          harvestProducts: [
            "dried-seed-heads"
          ],

          suitableFeedingMethods: [
            "whole-seed-heads",
            "winter-storage"
          ],

          requiredProcessingTasks: [
            "dry"
          ],

          optionalProcessingTasks: [],

          requiredEquipment: [],

          helpfulEquipment: [
            "drying-rack",
            "drying-screen",
            "bird-netting",
            "food-safe-bucket"
          ],

          storageMethods: [
            "dried-whole"
          ],

          preferredStorageMethod:
            "dried-whole",

          storageDurationCategory: null,

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

          moldRiskScore: null,
          rodentRiskScore: null,
          storedInsectRiskScore: null,

          preparationEaseScore: null,
          beginnerSuitabilityScore: null,

          householdFoodValueScore: null,
          flockValueScore: null,

          safetyWarnings: [
            "Do not store sunflower heads until they are adequately dry.",
            "Do not feed moldy, musty, heated, or otherwise questionable seed heads.",
            "Do not feed seed intended for planting if it has been chemically treated."
          ],

          incompatibleUserTraits: []
        }
      ],

      dataQuality: {
        overallConfidence: null,

        verifiedFields: [
          "identity",
          "lifecycle"
        ],

        derivedFields: [],

        uncertainFields: [
          "usePaths.whole-dried-seed-head"
        ],

        missingFields: [
          "climate",
          "site",
          "soil",
          "water",
          "space",
          "flock",
          "labor",
          "cost",
          "goals",
          "risks",
          "seasonalRoles"
        ],

        lastReviewed:
          "2026-07-14",

        primarySources: [],

        notes: [
          "Planner skeleton created before detailed planner-specific research.",
          "The whole-dried-seed-head use path is a structural prototype and is not yet fully scored.",
          "Do not change developmentStatus to ready until every required section and use path has been researched, validated, and tested."
        ]
       }
      }
    },

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
    }
  },

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
    }
  },

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
    }
  },


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
    }
  },

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
    }
  },

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
    }
  },

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
    }
  },

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
    }
}
  };
