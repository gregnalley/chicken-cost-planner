"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Public Questionnaire

  Questionnaire Version: 1.0.0

  This file is the shared source of truth for:
  - Public questionnaire sections
  - Visitor-facing question labels
  - Engine-compatible answer IDs
  - Required-field validation
  - Conditional question visibility
  - Review-screen labels

  Important:
  The value stored for every answer must match
  the value expected by the shared planner engine.
*/

(function initializeFeedCropQuestionnaire(
  global
) {
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};

  const QUESTIONNAIRE_VERSION =
    "1.0.0";

  const QUESTION_TYPES =
    Object.freeze({
      NUMBER:
        "number",

      SINGLE_CHOICE:
        "single-choice",

      MULTIPLE_CHOICE:
        "multiple-choice",

      BOOLEAN:
        "boolean",

      RANKING:
        "ranking",

      INFORMATION:
        "information"
    });

    const VISIBILITY_OPERATORS =
  Object.freeze({
    EQUALS:
      "equals",

    NOT_EQUALS:
      "not-equals",

    INCLUDES:
      "includes",

    NOT_INCLUDES:
      "not-includes",

    GREATER_THAN:
      "greater-than",

    GREATER_THAN_OR_EQUAL:
      "greater-than-or-equal"
  });

  const PROCESSING_TASK_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "cut-leaves",

      label:
        "Cut or harvest leaves",

      shortLabel:
        "Cut leaves",

      description:
        "Cut leafy greens, forage, or branches for flock use."
    }),

    Object.freeze({
      value:
        "pick-produce",

      label:
        "Pick vegetables, pods, or fruit",

      shortLabel:
        "Pick produce",

      description:
        "Regularly harvest fresh vegetables, pods, berries, or other produce."
    }),

    Object.freeze({
      value:
        "cut-seed-heads",

      label:
        "Cut seed heads or grain panicles",

      shortLabel:
        "Cut seed heads",

      description:
        "Cut mature seed heads, grain heads, or panicles from the plants."
    }),

    Object.freeze({
      value:
        "harvest-ears",

      label:
        "Harvest corn ears",

      shortLabel:
        "Harvest ears",

      description:
        "Harvest mature ears of field corn by hand."
    }),

    Object.freeze({
      value:
        "harvest-heavy-fruit",

      label:
        "Harvest and move heavy fruit",

      shortLabel:
        "Move heavy fruit",

      description:
        "Lift and move pumpkins, winter squash, or other heavy produce."
    }),

    Object.freeze({
      value:
        "chop",

      label:
        "Chop or break up the harvest",

      shortLabel:
        "Chop",

      description:
        "Cut produce, greens, stalks, or other harvests into flock-sized portions."
    }),

    Object.freeze({
      value:
        "dry",

      label:
        "Dry the harvest",

      shortLabel:
        "Dry",

      description:
        "Air-dry or mechanically dry seeds, grain, forage, leaves, or produce."
    }),

    Object.freeze({
      value:
        "cure",

      label:
        "Cure storage vegetables",

      shortLabel:
        "Cure produce",

      description:
        "Cure pumpkins, winter squash, or similar produce before storage."
    }),

    Object.freeze({
      value:
        "shell-beans",

      label:
        "Shell dry beans or cowpeas",

      shortLabel:
        "Shell beans",

      description:
        "Remove mature dry legumes from their pods."
    }),

    Object.freeze({
      value:
        "shell-corn",

      label:
        "Shell corn",

      shortLabel:
        "Shell corn",

      description:
        "Remove dried corn kernels from the cob."
    }),

    Object.freeze({
      value:
        "thresh",

      label:
        "Thresh grain or seed",

      shortLabel:
        "Thresh",

      description:
        "Separate grain or seed from mature heads, panicles, or plant material."
    }),

    Object.freeze({
      value:
        "winnow",

      label:
        "Winnow grain or seed",

      shortLabel:
        "Winnow",

      description:
        "Separate lightweight chaff from harvested grain or seed."
    }),

    Object.freeze({
      value:
        "clean-sort",

      label:
        "Clean and sort the harvest",

      shortLabel:
        "Clean and sort",

      description:
        "Remove damaged material, debris, insects, or unsuitable portions."
    }),

    Object.freeze({
      value:
        "remove-seed",

      label:
        "Remove seed from heads or fruit",

      shortLabel:
        "Remove seed",

      description:
        "Manually separate usable seed from seed heads, fruit, or other plant material."
    }),

    Object.freeze({
      value:
        "cook",

      label:
        "Cook before feeding",

      shortLabel:
        "Cook",

      description:
        "Cook a harvested product when raw feeding would be unsuitable."
    }),

    Object.freeze({
      value:
        "crack-grain",

      label:
        "Crack or coarsely process grain",

      shortLabel:
        "Crack grain",

      description:
        "Break whole grain into smaller pieces using suitable equipment."
    })
  ]);

const DRYING_FACILITY_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "covered-rack",

      label:
        "Covered outdoor drying rack",

      shortLabel:
        "Covered rack",

      description:
        "A protected rack with airflow and shelter from direct rain."
    }),

    Object.freeze({
      value:
        "barn-shed",

      label:
        "Barn, shed, or covered outbuilding",

      shortLabel:
        "Barn or shed",

      description:
        "A covered structure that can be used for protected drying."
    }),

    Object.freeze({
      value:
        "fans",

      label:
        "Electric fans",

      shortLabel:
        "Fans",

      description:
        "Fans are available to improve airflow around the harvest."
    }),

    Object.freeze({
      value:
        "screens-trays",

      label:
        "Drying screens or trays",

      shortLabel:
        "Screens or trays",

      description:
        "Mesh screens, trays, or similar surfaces allow airflow around the harvest."
    }),

    Object.freeze({
      value:
        "rodent-proof",

      label:
        "Rodent-protected drying area",

      shortLabel:
        "Rodent-protected",

      description:
        "The drying harvest can be protected from mice, rats, and other rodents."
    })
  ]);

const EQUIPMENT_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "cart",

      label:
        "Garden cart or wheelbarrow",

      shortLabel:
        "Cart"
    }),

    Object.freeze({
      value:
        "hand-pruners",

      label:
        "Hand pruners",

      shortLabel:
        "Hand pruners"
    }),

    Object.freeze({
      value:
        "loppers",

      label:
        "Loppers",

      shortLabel:
        "Loppers"
    }),

    Object.freeze({
      value:
        "pruning-saw",

      label:
        "Pruning saw",

      shortLabel:
        "Pruning saw"
    }),

    Object.freeze({
      value:
        "sickle",

      label:
        "Sickle or forage-cutting tool",

      shortLabel:
        "Sickle"
    }),

    Object.freeze({
      value:
        "basket",

      label:
        "Harvest basket",

      shortLabel:
        "Basket"
    }),

    Object.freeze({
      value:
        "harvest-sheet",

      label:
        "Harvest sheet or collection tarp",

      shortLabel:
        "Harvest sheet"
    }),

    Object.freeze({
      value:
        "tarps",

      label:
        "General-purpose tarps",

      shortLabel:
        "Tarps"
    }),

    Object.freeze({
      value:
        "buckets",

      label:
        "General-purpose buckets",

      shortLabel:
        "Buckets"
    }),

    Object.freeze({
      value:
        "fencing",

      label:
        "Permanent fencing",

      shortLabel:
        "Fencing"
    }),

    Object.freeze({
      value:
        "temporary-fencing",

      label:
        "Temporary or portable fencing",

      shortLabel:
        "Temporary fencing"
    }),

    Object.freeze({
      value:
        "bird-netting",

      label:
        "Bird netting",

      shortLabel:
        "Bird netting"
    }),

    Object.freeze({
      value:
        "forage-frame",

      label:
        "Protected forage frame",

      shortLabel:
        "Forage frame"
    }),

    Object.freeze({
      value:
        "tree-guard",

      label:
        "Tree guard or trunk protection",

      shortLabel:
        "Tree guard"
    }),

    Object.freeze({
      value:
        "drip-irrigation",

      label:
        "Drip irrigation",

      shortLabel:
        "Drip irrigation"
    }),

    Object.freeze({
      value:
        "drying-rack",

      label:
        "Drying rack",

      shortLabel:
        "Drying rack"
    }),

    Object.freeze({
      value:
        "drying-screen",

      label:
        "Drying screen",

      shortLabel:
        "Drying screen"
    }),

    Object.freeze({
      value:
        "fan",

      label:
        "Electric fan",

      shortLabel:
        "Fan"
    }),

    Object.freeze({
      value:
        "corn-sheller",

      label:
        "Corn sheller",

      shortLabel:
        "Corn sheller"
    }),

    Object.freeze({
      value:
        "grain-cracker",

      label:
        "Grain cracker",

      shortLabel:
        "Grain cracker"
    }),

    Object.freeze({
      value:
        "grain-screen",

      label:
        "Grain-cleaning screen",

      shortLabel:
        "Grain screen"
    }),

    Object.freeze({
      value:
        "threshing-bag",

      label:
        "Threshing bag or enclosed threshing setup",

      shortLabel:
        "Threshing bag"
    }),

    Object.freeze({
      value:
        "moisture-meter",

      label:
        "Grain moisture meter",

      shortLabel:
        "Moisture meter"
    }),

    Object.freeze({
      value:
        "food-safe-bucket",

      label:
        "Food-safe bucket",

      shortLabel:
        "Food-safe bucket"
    }),

    Object.freeze({
      value:
        "metal-grain-can",

      label:
        "Metal grain-storage can",

      shortLabel:
        "Metal grain can"
    }),

    Object.freeze({
      value:
        "cool-storage",

      label:
        "Cool produce-storage area",

      shortLabel:
        "Cool storage"
    })
  ]);

  const HARVEST_PRODUCT_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "fresh-greens",

      label:
        "Fresh leafy greens",

      shortLabel:
        "Fresh greens",

      description:
        "Fresh green plant material harvested and offered directly to the flock."
    }),

    Object.freeze({
      value:
        "fresh-leaves",

      label:
        "Fresh leaves",

      shortLabel:
        "Fresh leaves",

      description:
        "Individual leaves or leafy cuttings harvested for immediate use."
    }),

    Object.freeze({
      value:
        "fresh-forage",

      label:
        "Fresh cut forage",

      shortLabel:
        "Fresh forage",

      description:
        "Fresh forage cut from the growing area and carried to the flock."
    }),

    Object.freeze({
      value:
        "living-forage",

      label:
        "Living forage",

      shortLabel:
        "Living forage",

      description:
        "Plants the flock can graze directly or reach through a protected forage system."
    }),

    Object.freeze({
      value:
        "pasture-forage",

      label:
        "Pasture or paddock forage",

      shortLabel:
        "Pasture forage",

      description:
        "Forage intended for a pasture, orchard floor, or rotational paddock."
    }),

    Object.freeze({
      value:
        "fresh-produce",

      label:
        "Fresh produce",

      shortLabel:
        "Fresh produce",

      description:
        "Fresh vegetables, pods, or fruit intended for prompt use."
    }),

    Object.freeze({
      value:
        "fresh-vegetables",

      label:
        "Fresh vegetables",

      shortLabel:
        "Fresh vegetables",

      description:
        "Vegetables harvested and offered fresh to the flock."
    }),

    Object.freeze({
      value:
        "tender-pods",

      label:
        "Tender edible pods",

      shortLabel:
        "Tender pods",

      description:
        "Young, tender pods harvested before they mature into dry seed."
    }),

    Object.freeze({
      value:
        "fresh-seed-heads",

      label:
        "Fresh seed heads",

      shortLabel:
        "Fresh seed heads",

      description:
        "Freshly harvested seed heads offered whole for pecking and enrichment."
    }),

    Object.freeze({
      value:
        "dried-seed-heads",

      label:
        "Dried seed heads",

      shortLabel:
        "Dried seed heads",

      description:
        "Whole seed heads dried for later feeding or flock enrichment."
    }),

    Object.freeze({
      value:
        "dry-seeds",

      label:
        "Loose dry seeds",

      shortLabel:
        "Dry seeds",

      description:
        "Mature seeds removed, dried, and stored separately from the plant."
    }),

    Object.freeze({
      value:
        "dry-legumes",

      label:
        "Dry legumes",

      shortLabel:
        "Dry legumes",

      description:
        "Mature dry beans or cowpeas intended for storage and appropriate preparation."
    }),

    Object.freeze({
      value:
        "whole-storage-vegetables",

      label:
        "Whole storage vegetables",

      shortLabel:
        "Storage vegetables",

      description:
        "Whole vegetables stored intact for later flock use."
    }),

    Object.freeze({
      value:
        "winter-storage-produce",

      label:
        "Winter-storage produce",

      shortLabel:
        "Winter produce",

      description:
        "Produce selected specifically for use during fall or winter."
    }),

    Object.freeze({
      value:
        "pumpkin-squash-flesh",

      label:
        "Pumpkin or winter-squash flesh",

      shortLabel:
        "Squash flesh",

      description:
        "The edible flesh from pumpkins or winter squash."
    }),

    Object.freeze({
      value:
        "millet-panicles",

      label:
        "Whole millet panicles",

      shortLabel:
        "Millet panicles",

      description:
        "Mature millet panicles offered whole rather than threshed."
    }),

    Object.freeze({
      value:
        "whole-millet-panicles",

      label:
        "Whole stored millet panicles",

      shortLabel:
        "Stored millet panicles",

      description:
        "Whole millet panicles dried and retained for later flock use."
    }),

    Object.freeze({
      value:
        "millet-grain",

      label:
        "Millet grain",

      shortLabel:
        "Millet grain",

      description:
        "Mature millet grain harvested from the crop."
    }),

    Object.freeze({
      value:
        "loose-millet-grain",

      label:
        "Loose threshed millet grain",

      shortLabel:
        "Loose millet grain",

      description:
        "Millet grain removed from the panicles through threshing."
    }),

    Object.freeze({
      value:
        "alfalfa-foliage",

      label:
        "Alfalfa foliage",

      shortLabel:
        "Alfalfa foliage",

      description:
        "Leaves and tender alfalfa growth used as supplemental forage."
    }),

    Object.freeze({
      value:
        "alfalfa-forage",

      label:
        "Alfalfa forage",

      shortLabel:
        "Alfalfa forage",

      description:
        "Fresh or harvested alfalfa intended for forage use."
    }),

    Object.freeze({
      value:
        "dried-forage",

      label:
        "Dried forage",

      shortLabel:
        "Dried forage",

      description:
        "Forage dried for storage and later flock use."
    }),

    Object.freeze({
      value:
        "dried-leaves",

      label:
        "Dried leaves",

      shortLabel:
        "Dried leaves",

      description:
        "Leaves dried separately for later use."
    }),

    Object.freeze({
      value:
        "fallen-fruit",

      label:
        "Naturally fallen fruit",

      shortLabel:
        "Fallen fruit",

      description:
        "Fruit gathered after it naturally falls from a tree or shrub."
    }),

    Object.freeze({
      value:
        "mulberries",

      label:
        "Mulberries",

      shortLabel:
        "Mulberries",

      description:
        "Fresh mulberry fruit harvested or collected for the flock."
    }),

    Object.freeze({
      value:
        "mulberry-leaves",

      label:
        "Mulberry leaves",

      shortLabel:
        "Mulberry leaves",

      description:
        "Leaves harvested from a mulberry tree for supplemental use."
    }),

    Object.freeze({
      value:
        "leafy-branches",

      label:
        "Leafy branches",

      shortLabel:
        "Leafy branches",

      description:
        "Small leafy branches offered for browsing and enrichment."
    }),

    Object.freeze({
      value:
        "dried-corn-ears",

      label:
        "Dried corn ears",

      shortLabel:
        "Dried corn ears",

      description:
        "Whole mature corn ears dried before use or storage."
    }),

    Object.freeze({
      value:
        "whole-corn-ears",

      label:
        "Whole corn ears",

      shortLabel:
        "Whole corn ears",

      description:
        "Corn retained on the cob for flock feeding or enrichment."
    }),

    Object.freeze({
      value:
        "corn-kernels",

      label:
        "Shelled corn kernels",

      shortLabel:
        "Corn kernels",

      description:
        "Dry kernels removed from mature corn cobs."
    }),

    Object.freeze({
      value:
        "processed-corn",

      label:
        "Processed corn",

      shortLabel:
        "Processed corn",

      description:
        "Corn that has been shelled, cleaned, cracked, or otherwise prepared."
    }),

    Object.freeze({
      value:
        "whole-sorghum-heads",

      label:
        "Whole sorghum heads",

      shortLabel:
        "Sorghum heads",

      description:
        "Mature sorghum seed heads retained whole."
    }),

    Object.freeze({
      value:
        "sorghum-panicles",

      label:
        "Sorghum panicles",

      shortLabel:
        "Sorghum panicles",

      description:
        "Whole mature grain-sorghum panicles harvested from the plant."
    }),

    Object.freeze({
      value:
        "sorghum-grain",

      label:
        "Sorghum grain",

      shortLabel:
        "Sorghum grain",

      description:
        "Mature grain separated from grain-sorghum heads."
    }),

    Object.freeze({
      value:
        "milo-grain",

      label:
        "Milo grain",

      shortLabel:
        "Milo grain",

      description:
        "Mature grain from milo or grain-sorghum varieties."
    }),

    Object.freeze({
      value:
        "dry-grain",

      label:
        "Dry grain",

      shortLabel:
        "Dry grain",

      description:
        "Fully dried grain prepared for storage or later processing."
    }),

    Object.freeze({
      value:
        "whole-grain",

      label:
        "Whole grain",

      shortLabel:
        "Whole grain",

      description:
        "Grain retained whole rather than cracked or ground."
    }),

    Object.freeze({
      value:
        "stored-grain",

      label:
        "Stored grain",

      shortLabel:
        "Stored grain",

      description:
        "Dry grain intended specifically for medium- or long-term storage."
    }),

    Object.freeze({
      value:
        "cracked-grain",

      label:
        "Cracked grain",

      shortLabel:
        "Cracked grain",

      description:
        "Whole grain mechanically broken into smaller pieces."
    })
  ]);

  const PLANNER_GOAL_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "reduce-feed-use",

      label:
        "Reduce purchased feed use",

      shortLabel:
        "Reduce feed use",

      description:
        "Favor crops that can provide a meaningful amount of supplemental flock food."
    }),

    Object.freeze({
      value:
        "high-energy",

      label:
        "Produce an energy-rich supplement",

      shortLabel:
        "High energy",

      description:
        "Favor grains, seeds, or other harvests that provide concentrated supplemental energy."
    }),

    Object.freeze({
      value:
        "protein-oriented",

      label:
        "Produce a protein-oriented supplement",

      shortLabel:
        "Protein-oriented",

      description:
        "Favor crops with stronger protein-oriented supplemental value."
    }),

    Object.freeze({
      value:
        "fresh-greens",

      label:
        "Provide fresh greens",

      shortLabel:
        "Fresh greens",

      description:
        "Favor crops that provide leafy greens or fresh vegetative material."
    }),

    Object.freeze({
      value:
        "living-forage",

      label:
        "Create living forage",

      shortLabel:
        "Living forage",

      description:
        "Favor crops that chickens can graze directly or through a protected forage system."
    }),

    Object.freeze({
      value:
        "winter-storage",

      label:
        "Store harvests for winter",

      shortLabel:
        "Winter storage",

      description:
        "Favor crops that can be dried, cured, or otherwise stored for later use."
    }),

    Object.freeze({
      value:
        "fast-value",

      label:
        "Produce useful harvests quickly",

      shortLabel:
        "Fast value",

      description:
        "Favor crops that begin providing practical value relatively early."
    }),

    Object.freeze({
      value:
        "short-season",

      label:
        "Fit a short growing season",

      shortLabel:
        "Short season",

      description:
        "Favor crops that can mature or provide useful growth in a shorter frost-free season."
    }),

    Object.freeze({
      value:
        "cool-season-production",

      label:
        "Provide cool-season production",

      shortLabel:
        "Cool-season production",

      description:
        "Favor crops that perform well during spring, fall, or other cooler periods."
    }),

    Object.freeze({
      value:
        "limited-irrigation",

      label:
        "Perform with limited irrigation",

      shortLabel:
        "Limited irrigation",

      description:
        "Favor crops that can remain useful when supplemental water is limited."
    }),

    Object.freeze({
      value:
        "resilience-feed",

      label:
        "Build a resilient backup feed source",

      shortLabel:
        "Resilient feed",

      description:
        "Favor dependable crops that can contribute to household feed resilience."
    }),

    Object.freeze({
      value:
        "self-reliance",

      label:
        "Increase household self-reliance",

      shortLabel:
        "Self-reliance",

      description:
        "Favor crops that support a more self-sufficient flock and homestead system."
    }),

    Object.freeze({
      value:
        "shared-household-food",

      label:
        "Produce food for chickens and people",

      shortLabel:
        "Shared household food",

      description:
        "Favor crops that may be useful to both the household and the flock."
    }),

    Object.freeze({
      value:
        "enrichment",

      label:
        "Provide flock enrichment",

      shortLabel:
        "Enrichment",

      description:
        "Favor crops that encourage natural pecking, scratching, browsing, or exploration."
    }),

    Object.freeze({
      value:
        "pollinators",

      label:
        "Support pollinators",

      shortLabel:
        "Pollinators",

      description:
        "Favor flowering crops that can support bees and other beneficial pollinators."
    }),

    Object.freeze({
      value:
        "soil-improvement",

      label:
        "Improve the soil",

      shortLabel:
        "Soil improvement",

      description:
        "Favor crops that contribute organic matter, root activity, or other soil benefits."
    }),

    Object.freeze({
      value:
        "nitrogen-fixation",

      label:
        "Add nitrogen through legumes",

      shortLabel:
        "Nitrogen fixation",

      description:
        "Favor legume crops capable of biological nitrogen fixation when properly established."
    }),

    Object.freeze({
      value:
        "ground-cover",

      label:
        "Create ground cover",

      shortLabel:
        "Ground cover",

      description:
        "Favor crops that cover bare soil and help occupy open growing areas."
    }),

    Object.freeze({
      value:
        "erosion-control",

      label:
        "Help control erosion",

      shortLabel:
        "Erosion control",

      description:
        "Favor crops whose roots and ground coverage can help protect exposed soil."
    }),

    Object.freeze({
      value:
        "compost-biomass",

      label:
        "Produce compost or mulch biomass",

      shortLabel:
        "Compost biomass",

      description:
        "Favor crops that also produce useful plant material for composting or mulching."
    }),

    Object.freeze({
      value:
        "seed-saving",

      label:
        "Save seed for future planting",

      shortLabel:
        "Seed saving",

      description:
        "Favor crops with practical opportunities to retain mature seed for future seasons."
    }),

    Object.freeze({
      value:
        "use-unused-space",

      label:
        "Make productive use of unused space",

      shortLabel:
        "Use unused space",

      description:
        "Favor crops that can turn lawns, field edges, orchard floors, or other unused areas into productive space."
    }),

    Object.freeze({
      value:
        "edible-landscape",

      label:
        "Create an edible landscape",

      shortLabel:
        "Edible landscape",

      description:
        "Favor crops that can contribute to an attractive, multipurpose landscape."
    }),

    Object.freeze({
      value:
        "shade",

      label:
        "Provide shade",

      shortLabel:
        "Shade",

      description:
        "Favor larger perennial crops that may eventually provide useful shade."
    }),

    Object.freeze({
      value:
        "privacy-screening",

      label:
        "Provide privacy or screening",

      shortLabel:
        "Privacy screening",

      description:
        "Favor taller or permanent crops that can contribute to visual screening."
    })
  ]);

const WILDLIFE_PRESSURE_OPTIONS =
  Object.freeze([
    Object.freeze({
      value:
        "wild-birds",

      label:
        "Wild birds",

      shortLabel:
        "Wild birds",

      description:
        "Wild birds commonly eat exposed seeds, grain, fruit, or seedlings."
    }),

    Object.freeze({
      value:
        "rodents",

      label:
        "Mice, rats, or other rodents",

      shortLabel:
        "Rodents",

      description:
        "Rodents may damage crops or consume drying and stored harvests."
    }),

    Object.freeze({
      value:
        "squirrels",

      label:
        "Squirrels",

      shortLabel:
        "Squirrels",

      description:
        "Squirrels frequently reach fruit, seeds, grain, or storage areas."
    }),

    Object.freeze({
      value:
        "rabbits",

      label:
        "Rabbits",

      shortLabel:
        "Rabbits",

      description:
        "Rabbits commonly browse seedlings, greens, and low-growing crops."
    }),

    Object.freeze({
      value:
        "deer",

      label:
        "Deer",

      shortLabel:
        "Deer",

      description:
        "Deer regularly browse garden plants, forage stands, shrubs, or young trees."
    }),

    Object.freeze({
      value:
        "groundhogs",

      label:
        "Groundhogs",

      shortLabel:
        "Groundhogs",

      description:
        "Groundhogs or woodchucks may heavily browse vegetables and forage crops."
    }),

    Object.freeze({
      value:
        "raccoons",

      label:
        "Raccoons",

      shortLabel:
        "Raccoons",

      description:
        "Raccoons may damage crops such as corn and consume mature harvests."
    }),

    Object.freeze({
      value:
        "insects",

      label:
        "Heavy insect pressure",

      shortLabel:
        "Insects",

      description:
        "Insect pests frequently cause meaningful crop or stored-harvest losses."
    })
  ]);

  const QUESTIONNAIRE_SECTIONS =
    Object.freeze([
      Object.freeze({
        id:
          "flock",

        stepNumber:
          1,

        title:
          "Your Flock",

        shortTitle:
          "Flock",

        description:
          "Tell us about the chickens this crop plan is intended to support.",

        answerGroups:
  Object.freeze([
    "flock",
    "preferences"
  ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "flock-size",

    type:
      QUESTION_TYPES.NUMBER,

    answerPath:
      "flock.flockSize",

    label:
      "How many chickens are in your flock?",

    shortLabel:
      "Flock size",

    reviewLabel:
      "Number of chickens",

    helpText:
      "Enter the number of chickens this crop plan is intended to support. The planner uses flock size when evaluating how useful a crop may be for your household.",

    required:
      true,

    validation:
      Object.freeze({
        minimum:
          1,

        maximum:
          500,

        step:
          1,

        integerOnly:
          true,

        requiredMessage:
          "Enter the number of chickens in your flock.",

        minimumMessage:
          "Flock size must be at least 1.",

        maximumMessage:
          "For this version of the planner, enter a flock size of 500 or fewer.",

        integerMessage:
          "Flock size must be a whole number."
      }),

    input:
      Object.freeze({
        placeholder:
          "Example: 8",

        inputMode:
          "numeric",

        autocomplete:
          "off"
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "primary-flock-purpose",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "flock.primaryFlockPurpose",

    label:
      "What is the primary purpose of your flock?",

    shortLabel:
      "Flock purpose",

    reviewLabel:
      "Primary flock purpose",

    helpText:
      "Choose the answer that best describes why you keep chickens. This helps the planner balance practical feed production, household use, and flock enrichment.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "eggs",

          label:
            "Egg production",

          shortLabel:
            "Egg production",

          description:
            "My flock is kept mainly for laying eggs."
        }),

        Object.freeze({
          value:
            "homestead",

          label:
            "Homestead and self-sufficiency",

          shortLabel:
            "Homestead",

          description:
            "My flock is part of a broader food-production or self-reliance plan."
        }),

        Object.freeze({
          value:
            "mixed",

          label:
            "Mixed purposes",

          shortLabel:
            "Mixed purposes",

          description:
            "My flock serves several purposes, such as eggs, household food production, breeding, or general homestead use."
        }),

        Object.freeze({
          value:
            "pets-enrichment",

          label:
            "Pets and backyard enjoyment",

          shortLabel:
            "Pets and enjoyment",

          description:
            "My chickens are primarily pets, companions, or part of an enjoyable backyard hobby."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the primary purpose of your flock."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "forage-access",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "flock.forageAccess",

    label:
      "How will your chickens access growing crops or forage?",

    shortLabel:
      "Forage access",

    reviewLabel:
      "Chicken access to forage",

    helpText:
      "Choose the option that most closely describes how your chickens can reach living plants. Protected forage frames and rotational paddocks can support different crops than unrestricted or occasional access.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "none",

          label:
            "No direct access",

          shortLabel:
            "No direct access",

          description:
            "The chickens will not enter or graze the growing area. I will harvest the crop and carry it to them."
        }),

        Object.freeze({
          value:
            "limited",

          label:
            "Limited or supervised access",

          shortLabel:
            "Limited access",

          description:
            "The flock may receive brief, controlled, or supervised access to growing plants."
        }),

        Object.freeze({
          value:
            "limited-weekly",

          label:
            "Limited weekly access",

          shortLabel:
            "Limited weekly",

          description:
            "The flock can access the growing area on a limited weekly schedule."
        }),

        Object.freeze({
          value:
            "occasional",

          label:
            "Occasional access",

          shortLabel:
            "Occasional access",

          description:
            "The chickens may enter the growing area occasionally, but not as part of a regular rotation."
        }),

        Object.freeze({
          value:
            "protected-forage-frame",

          label:
            "Protected forage frame",

          shortLabel:
            "Forage frame",

          description:
            "The chickens can eat plant growth through a protective frame or screen without uprooting the crop."
        }),

        Object.freeze({
          value:
            "rotational-paddock",

          label:
            "Rotational paddock access",

          shortLabel:
            "Rotational paddock",

          description:
            "The flock is moved between paddocks or forage areas so plants receive recovery time."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how your chickens will access growing crops or forage."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "preferred-nutritional-role",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "preferences.preferredNutritionalRole",

    label:
      "What nutritional or practical role should the crop serve?",

    shortLabel:
      "Nutritional role",

    reviewLabel:
      "Preferred crop role",

    helpText:
      "This does not replace a complete formulated chicken feed. It tells the planner what kind of supplemental value you would most like the crop to provide.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "diversified",

          label:
            "Balanced supplemental value",

          shortLabel:
            "Balanced",

          description:
            "I want a broadly useful crop and do not want to favor one nutritional role too strongly."
        }),

        Object.freeze({
          value:
            "energy",

          label:
            "Energy-oriented supplement",

          shortLabel:
            "Energy",

          description:
            "I am most interested in calorie-dense grains, seeds, or other energy-oriented harvests."
        }),

        Object.freeze({
          value:
            "protein-oriented",

          label:
            "Protein-oriented supplement",

          shortLabel:
            "Protein-oriented",

          description:
            "I want the planner to favor crops with stronger protein-oriented supplemental value."
        }),

        Object.freeze({
          value:
            "fresh-green",

          label:
            "Fresh greens and forage",

          shortLabel:
            "Fresh greens",

          description:
            "I want leafy greens, fresh forage, or other vegetation that can be offered during the growing season."
        }),

        Object.freeze({
          value:
            "storage-produce",

          label:
            "Storage produce",

          shortLabel:
            "Storage produce",

          description:
            "I want vegetables or produce that can be harvested and stored for later flock use."
        }),

        Object.freeze({
          value:
            "enrichment",

          label:
            "Treats and flock enrichment",

          shortLabel:
            "Enrichment",

          description:
            "I want crops that encourage natural pecking, scratching, exploration, and behavioral enrichment."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the main supplemental role you want the crop to serve."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "desired-recommendation-format",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "preferences.desiredRecommendationFormat",

    label:
      "How many recommendations would you like to see?",

    shortLabel:
      "Recommendation format",

    reviewLabel:
      "Results format",

    helpText:
      "You can receive one focused recommendation or compare the three strongest eligible crops.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "single",

          label:
            "Show my single best match",

          shortLabel:
            "Single best match",

          description:
            "Give me one primary crop recommendation based on my answers."
        }),

        Object.freeze({
          value:
            "top-three",

          label:
            "Show my top three matches",

          shortLabel:
            "Top three matches",

          description:
            "Show the strongest recommendation plus two good alternatives for comparison."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how many crop recommendations you would like to see."
      }),

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "climate",

        stepNumber:
          2,

        title:
          "Climate and Growing Season",

        shortTitle:
          "Climate",

        description:
          "Describe the general climate and length of your growing season.",

        answerGroups:
         Object.freeze([
          "climate"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "climate-type",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "climate.climateType",

    label:
      "Which climate best describes your growing area?",

    shortLabel:
      "Climate type",

    reviewLabel:
      "General climate",

    helpText:
      "Choose the option that most closely describes your usual growing conditions. The planner uses this to compare crop tolerance for heat, humidity, cool summers, and short growing seasons.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "temperate",

          label:
            "Temperate with warm summers",

          shortLabel:
            "Temperate",

          description:
            "Four-season conditions with warm summers, regular rainfall, and moderate winter cold."
        }),

        Object.freeze({
          value:
            "hot-humid",

          label:
            "Hot and humid",

          shortLabel:
            "Hot and humid",

          description:
            "Long, hot summers with frequent humidity, rainfall, or disease pressure."
        }),

        Object.freeze({
          value:
            "hot-dry",

          label:
            "Hot and dry",

          shortLabel:
            "Hot and dry",

          description:
            "Hot summers with limited rainfall, low humidity, or frequent irrigation concerns."
        }),

        Object.freeze({
          value:
            "mild-winter",

          label:
            "Mild winter and long growing season",

          shortLabel:
            "Mild winter",

          description:
            "Winters are generally mild and the growing season is long, with only limited or brief freezing weather."
        }),

        Object.freeze({
          value:
            "cool-moderate-summer",

          label:
            "Cool or moderate summer",

          shortLabel:
            "Cool summer",

          description:
            "Summers are relatively cool or mild, with fewer periods of sustained high heat."
        }),

        Object.freeze({
          value:
            "continental",

          label:
            "Continental with cold winters",

          shortLabel:
            "Continental",

          description:
            "Cold winters, warm summers, and large seasonal temperature changes."
        }),

        Object.freeze({
          value:
            "cold-short-summer",

          label:
            "Cold climate with a short summer",

          shortLabel:
            "Cold, short summer",

          description:
            "A short growing season with late spring frosts, early fall frosts, or consistently cool summers."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the climate that best describes your growing area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "frost-free-season-range",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "climate.frostFreeSeasonRange",

    label:
      "About how long is your frost-free growing season?",

    shortLabel:
      "Frost-free season",

    reviewLabel:
      "Frost-free growing season",

    helpText:
      "The frost-free season is the approximate number of days between your average last spring frost and first fall frost. A close estimate is sufficient.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "60-89",

          label:
            "60 to 89 days",

          shortLabel:
            "60–89 days",

          description:
            "A very short growing season, usually found in colder northern, mountain, or high-elevation areas."
        }),

        Object.freeze({
          value:
            "90-119",

          label:
            "90 to 119 days",

          shortLabel:
            "90–119 days",

          description:
            "A short growing season that favors fast-maturing or cool-tolerant crops."
        }),

        Object.freeze({
          value:
            "120-149",

          label:
            "120 to 149 days",

          shortLabel:
            "120–149 days",

          description:
            "A moderately short season with enough time for many vegetables and faster feed crops."
        }),

        Object.freeze({
          value:
            "150-179",

          label:
            "150 to 179 days",

          shortLabel:
            "150–179 days",

          description:
            "A moderate growing season suitable for a broad range of annual crops."
        }),

        Object.freeze({
          value:
            "180-209",

          label:
            "180 to 209 days",

          shortLabel:
            "180–209 days",

          description:
            "A long growing season suitable for most warm-season feed crops."
        }),

        Object.freeze({
          value:
            "210-plus",

          label:
            "210 days or longer",

          shortLabel:
            "210+ days",

          description:
            "A very long growing season often associated with mild winters or southern climates."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the approximate length of your frost-free growing season."
      }),

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "space",

        stepNumber:
          3,

        title:
          "Growing Space",

        shortTitle:
          "Space",

        description:
          "Tell us how much growing space is available and how that space can be used.",

        answerGroups:
         Object.freeze([
           "space"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "total-growing-area",

    type:
      QUESTION_TYPES.NUMBER,

    answerPath:
      "space.totalGrowingAreaSqFt",

    label:
      "How many square feet can you use for feed crops?",

    shortLabel:
      "Growing area",

    reviewLabel:
      "Total growing area",

    helpText:
      "Enter the approximate combined area available for crops. Include garden beds, field plots, containers, unused lawn, forage areas, or other spaces you are willing to use.",

    required:
      true,

    validation:
      Object.freeze({
        minimum:
          1,

        maximum:
          1000000,

        step:
          1,

        integerOnly:
          true,

        requiredMessage:
          "Enter the approximate growing area available.",

        minimumMessage:
          "The available growing area must be at least 1 square foot.",

        maximumMessage:
          "Enter an area of 1,000,000 square feet or fewer.",

        integerMessage:
          "Enter the growing area as a whole number."
      }),

    input:
      Object.freeze({
        placeholder:
          "Example: 100",

        suffix:
          "sq. ft.",

        inputMode:
          "numeric",

        autocomplete:
          "off"
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "available-space-types",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "space.availableSpaceTypes",

    label:
      "Which types of growing space are available?",

    shortLabel:
      "Space types",

    reviewLabel:
      "Available growing spaces",

    helpText:
      "Select every type of space that you could realistically use for a feed crop.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "raised-bed",

          label:
            "Raised beds",

          shortLabel:
            "Raised beds",

          description:
            "Framed or elevated beds filled with garden soil or raised-bed mix."
        }),

        Object.freeze({
          value:
            "small-beds",

          label:
            "Small garden beds",

          shortLabel:
            "Small beds",

          description:
            "Small, separate planting areas that are not necessarily framed raised beds."
        }),

        Object.freeze({
          value:
            "in-ground",

          label:
            "In-ground garden",

          shortLabel:
            "In-ground",

          description:
            "A traditional garden plot planted directly into the ground."
        }),

        Object.freeze({
          value:
            "containers",

          label:
            "Containers or large pots",

          shortLabel:
            "Containers",

          description:
            "Pots, tubs, grow bags, barrels, or other movable containers."
        }),

        Object.freeze({
          value:
            "fence-line",

          label:
            "Fence line",

          shortLabel:
            "Fence line",

          description:
            "A narrow planting area beside an existing fence or property boundary."
        }),

        Object.freeze({
          value:
            "unused-lawn",

          label:
            "Unused lawn",

          shortLabel:
            "Unused lawn",

          description:
            "Grass or open yard space that could be converted temporarily or permanently."
        }),

        Object.freeze({
          value:
            "open-field",

          label:
            "Open field or large plot",

          shortLabel:
            "Open field",

          description:
            "A larger open area suitable for rows, blocks, grain crops, or forage stands."
        }),

        Object.freeze({
          value:
            "forage-frame",

          label:
            "Protected forage frame",

          shortLabel:
            "Forage frame",

          description:
            "A protected planting area that lets chickens eat growth through wire or screening."
        }),

        Object.freeze({
          value:
            "rotational-paddock",

          label:
            "Rotational paddock",

          shortLabel:
            "Rotational paddock",

          description:
            "A fenced forage area that can be rested between periods of flock access."
        }),

        Object.freeze({
          value:
            "orchard",

          label:
            "Orchard or established tree area",

          shortLabel:
            "Orchard",

          description:
            "Space beneath or between established fruit or nut trees."
        }),

        Object.freeze({
          value:
            "hedgerow",

          label:
            "Hedgerow or property edge",

          shortLabel:
            "Hedgerow",

          description:
            "A long edge, boundary, or planting strip suitable for shrubs or trees."
        })
      ]),

    validation:
      Object.freeze({
        minimumSelections:
          1,

        requiredMessage:
          "Choose at least one type of growing space."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "largest-area-shape",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "space.largestAreaShape",

    label:
      "What best describes the shape of your largest usable growing area?",

    shortLabel:
      "Area shape",

    reviewLabel:
      "Shape of largest area",

    helpText:
      "The shape of the available area can affect whether a crop fits better in a block, long row, narrow strip, or small bed.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "small-beds",

          label:
            "One or more small beds",

          shortLabel:
            "Small beds",

          description:
            "The space is divided into small beds, containers, or compact planting areas."
        }),

        Object.freeze({
          value:
            "long-strip",

          label:
            "Long, narrow strip",

          shortLabel:
            "Long strip",

          description:
            "The area is narrow but extends along a fence, path, building, or property edge."
        }),

        Object.freeze({
          value:
            "long-row",

          label:
            "One or more long rows",

          shortLabel:
            "Long rows",

          description:
            "The area is best suited to planting crops in distinct rows rather than a wide block."
        }),

        Object.freeze({
          value:
            "wide-rectangle",

          label:
            "Wide rectangular plot",

          shortLabel:
            "Wide rectangle",

          description:
            "The area is wide enough for multiple rows, blocks, or spreading crops."
        }),

        Object.freeze({
          value:
            "irregular",

          label:
            "Irregular or mixed shape",

          shortLabel:
            "Irregular",

          description:
            "The usable space consists of irregular edges, multiple connected areas, or mixed shapes."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the shape that best describes your largest growing area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "container-count",

    type:
      QUESTION_TYPES.NUMBER,

    answerPath:
      "space.containerCount",

    label:
      "How many containers can you use?",

    shortLabel:
      "Container count",

    reviewLabel:
      "Available containers",

    helpText:
      "Count the pots, tubs, grow bags, barrels, or similar containers that you can dedicate to feed crops.",

    required:
      true,

    validation:
      Object.freeze({
        minimum:
          1,

        maximum:
          1000,

        step:
          1,

        integerOnly:
          true,

        requiredMessage:
          "Enter the number of containers available.",

        minimumMessage:
          "Enter at least 1 container.",

        maximumMessage:
          "Enter 1,000 containers or fewer.",

        integerMessage:
          "The container count must be a whole number."
      }),

    input:
      Object.freeze({
        placeholder:
          "Example: 4",

        inputMode:
          "numeric",

        autocomplete:
          "off"
      }),

    visibility:
      Object.freeze({
        answerPath:
          "space.availableSpaceTypes",

        operator:
          VISIBILITY_OPERATORS.INCLUDES,

        value:
          "containers"
      })
  }),

  Object.freeze({
    id:
      "permanent-containers-allowed",

    type:
      QUESTION_TYPES.BOOLEAN,

    answerPath:
      "space.permanentContainersAllowed",

    label:
      "May the containers remain in place permanently?",

    shortLabel:
      "Permanent containers",

    reviewLabel:
      "Containers may remain permanently",

    helpText:
      "Choose no when the containers must remain movable, temporary, or removable because of rental, property, or household restrictions.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            true,

          label:
            "Yes",

          shortLabel:
            "Yes",

          description:
            "The containers may remain in place for multiple seasons."
        }),

        Object.freeze({
          value:
            false,

          label:
            "No",

          shortLabel:
            "No",

          description:
            "The containers must remain temporary or movable."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose whether the containers may remain in place permanently."
      }),

    visibility:
      Object.freeze({
        answerPath:
          "space.availableSpaceTypes",

        operator:
          VISIBILITY_OPERATORS.INCLUDES,

        value:
          "containers"
      })
  }),

  Object.freeze({
    id:
      "overflow-options",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "space.overflowOptions",

    label:
      "Where may crops spread beyond the main planting area?",

    shortLabel:
      "Overflow space",

    reviewLabel:
      "Available overflow areas",

    helpText:
      "Some crops need room for vines, spreading growth, or a larger permanent stand. Select every nearby area that may be used. Choose none when growth must remain inside the primary planting space.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No overflow area is available",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "unused-lawn",

          label:
            "Unused lawn",

          shortLabel:
            "Unused lawn",

          description:
            "Vines or spreading plants may extend into an unused lawn area."
        }),

        Object.freeze({
          value:
            "orchard-floor",

          label:
            "Orchard floor",

          shortLabel:
            "Orchard floor",

          description:
            "Plants may spread beneath or between established orchard trees."
        }),

        Object.freeze({
          value:
            "open-field",

          label:
            "Open field",

          shortLabel:
            "Open field",

          description:
            "Growth may extend into a larger open field or adjacent plot."
        })
      ]),

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "plant-behavior-restrictions",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "space.plantBehaviorRestrictions",

    label:
      "Are there any plant size or growth restrictions?",

    shortLabel:
      "Plant restrictions",

    reviewLabel:
      "Plant growth restrictions",

    helpText:
      "Select every restriction that applies. These answers help remove crops that would be impractical or incompatible with the property.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No special plant restrictions",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "must-remain-small",

          label:
            "Plants must remain compact",

          shortLabel:
            "Must remain small",

          description:
            "Large, sprawling, or space-dominating crops are not suitable."
        }),

        Object.freeze({
          value:
            "must-remain-low-growing",

          label:
            "Plants must remain low-growing",

          shortLabel:
            "Must remain low",

          description:
            "The crop must stay close to the ground and cannot become tall."
        }),

        Object.freeze({
          value:
            "no-vines-outside-bed",

          label:
            "Vines cannot leave the planting bed",

          shortLabel:
            "No vine overflow",

          description:
            "Vining crops must stay completely inside the assigned bed or container."
        }),

        Object.freeze({
          value:
            "no-block-planting",

          label:
            "No wide block planting",

          shortLabel:
            "No block planting",

          description:
            "The space cannot support several neighboring rows planted as a crop block."
        }),

        Object.freeze({
          value:
            "no-tall-screening",

          label:
            "No tall crops or screening",

          shortLabel:
            "No tall screening",

          description:
            "Tall crops cannot block views, sunlight, paths, windows, or neighboring property."
        }),

        Object.freeze({
          value:
            "no-trees",

          label:
            "No trees",

          shortLabel:
            "No trees",

          description:
            "Tree crops are not permitted or practical in the available area."
        }),

        Object.freeze({
          value:
            "no-permanent-plantings",

          label:
            "No permanent plantings",

          shortLabel:
            "No permanent plantings",

          description:
            "All crops must be removable and cannot remain as permanent perennial plantings."
        }),

        Object.freeze({
          value:
            "no-permanent-large-stand",

          label:
            "No large permanent crop stand",

          shortLabel:
            "No large permanent stand",

          description:
            "A small perennial planting may be possible, but a large permanent forage or crop stand is not."
        })
      ]),

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "block-planting-available",

    type:
      QUESTION_TYPES.BOOLEAN,

    answerPath:
      "space.blockPlantingAvailable",

    label:
      "Can you plant several neighboring rows as one crop block?",

    shortLabel:
      "Block planting",

    reviewLabel:
      "Block planting available",

    helpText:
      "A planting block is a group of adjacent rows rather than one isolated row. This is especially important for crops that depend on nearby plants for effective pollination.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            true,

          label:
            "Yes",

          shortLabel:
            "Yes",

          description:
            "I can plant multiple neighboring rows as a compact block."
        }),

        Object.freeze({
          value:
            false,

          label:
            "No",

          shortLabel:
            "No",

          description:
            "I am limited to isolated rows, narrow strips, containers, or scattered planting areas."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose whether block planting is available."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "available-block-rows",

    type:
      QUESTION_TYPES.NUMBER,

    answerPath:
      "space.availableBlockRows",

    label:
      "How many neighboring rows could the block contain?",

    shortLabel:
      "Block rows",

    reviewLabel:
      "Rows available in planting block",

    helpText:
      "Enter the approximate number of adjacent rows you could plant. A reasonable estimate is sufficient.",

    required:
      true,

    validation:
      Object.freeze({
        minimum:
          1,

        maximum:
          100,

        step:
          1,

        integerOnly:
          true,

        requiredMessage:
          "Enter the number of neighboring rows available.",

        minimumMessage:
          "Enter at least 1 row.",

        maximumMessage:
          "Enter 100 rows or fewer.",

        integerMessage:
          "The number of rows must be a whole number."
      }),

    input:
      Object.freeze({
        placeholder:
          "Example: 4",

        inputMode:
          "numeric",

        autocomplete:
          "off"
      }),

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "growing-conditions",

        stepNumber:
          4,

        title:
          "Sunlight, Soil, and Water",

        shortTitle:
          "Conditions",

        description:
          "Describe the growing conditions the crop will need to tolerate.",

        answerGroups:
         Object.freeze([
           "site",
           "soil",
           "water"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "direct-sun-hours",

    type:
      QUESTION_TYPES.NUMBER,

    answerPath:
      "site.directSunHoursExact",

    label:
      "How many hours of direct sunlight does the growing area receive?",

    shortLabel:
      "Direct sunlight",

    reviewLabel:
      "Daily direct sunlight",

    helpText:
      "Estimate the number of hours when direct sunlight reaches the growing area during the main growing season. Do not count bright shade as direct sunlight.",

    required:
      true,

    validation:
      Object.freeze({
        minimum:
          0,

        maximum:
          14,

        step:
          1,

        integerOnly:
          true,

        requiredMessage:
          "Enter the approximate hours of direct sunlight.",

        minimumMessage:
          "Direct sunlight cannot be less than 0 hours.",

        maximumMessage:
          "Enter 14 hours or fewer.",

        integerMessage:
          "Enter sunlight as a whole number of hours."
      }),

    input:
      Object.freeze({
        placeholder:
          "Example: 8",

        suffix:
          "hours",

        inputMode:
          "numeric",

        autocomplete:
          "off"
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "wind-exposure",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "site.windExposure",

    label:
      "How exposed is the growing area to wind?",

    shortLabel:
      "Wind exposure",

    reviewLabel:
      "Wind exposure",

    helpText:
      "Consider regular winds, storm exposure, open-field conditions, and whether buildings, trees, or fences shelter the area.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "low",

          label:
            "Low exposure",

          shortLabel:
            "Low",

          description:
            "The area is sheltered by buildings, fences, trees, or nearby vegetation."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate exposure",

          shortLabel:
            "Moderate",

          description:
            "The area receives normal breezes and occasional stronger wind."
        }),

        Object.freeze({
          value:
            "high",

          label:
            "High exposure",

          shortLabel:
            "High",

          description:
            "The area is open, frequently windy, or exposed to strong gusts."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the wind exposure of the growing area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "primary-growing-medium",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.primaryGrowingMedium",

    label:
      "What is the primary growing medium?",

    shortLabel:
      "Growing medium",

    reviewLabel:
      "Primary growing medium",

    helpText:
      "Choose the soil or planting mix that will support most of the crop.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "native-soil",

          label:
            "Native or existing soil",

          shortLabel:
            "Native soil",

          description:
            "The crop will grow mainly in the soil already present on the property."
        }),

        Object.freeze({
          value:
            "improved-garden",

          label:
            "Improved garden soil",

          shortLabel:
            "Improved garden",

          description:
            "The soil has been amended over time with compost, organic matter, fertilizer, or other improvements."
        }),

        Object.freeze({
          value:
            "raised-bed-mix",

          label:
            "Raised-bed mix",

          shortLabel:
            "Raised-bed mix",

          description:
            "The crop will grow in a prepared mix used in framed or elevated beds."
        }),

        Object.freeze({
          value:
            "commercial-mix",

          label:
            "Commercial container mix",

          shortLabel:
            "Commercial mix",

          description:
            "The crop will grow mainly in purchased potting soil or container-growing mix."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the primary growing medium."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "soil-texture",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.soilTexture",

    label:
      "What best describes the soil texture?",

    shortLabel:
      "Soil texture",

    reviewLabel:
      "Soil texture",

    helpText:
      "Choose the closest match. Texture affects drainage, moisture retention, root growth, and nutrient availability.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "very-sandy",

          label:
            "Very sandy",

          shortLabel:
            "Very sandy",

          description:
            "Loose, gritty soil with very little clay or organic matter."
        }),

        Object.freeze({
          value:
            "sandy",

          label:
            "Sandy",

          shortLabel:
            "Sandy",

          description:
            "Light soil that feels gritty and dries relatively quickly."
        }),

        Object.freeze({
          value:
            "sandy-loam",

          label:
            "Sandy loam",

          shortLabel:
            "Sandy loam",

          description:
            "A workable mixture that drains well but retains more moisture than sandy soil."
        }),

        Object.freeze({
          value:
            "loam",

          label:
            "Loam",

          shortLabel:
            "Loam",

          description:
            "A balanced soil with a useful mixture of sand, silt, clay, and organic matter."
        }),

        Object.freeze({
          value:
            "clay-loam",

          label:
            "Clay loam",

          shortLabel:
            "Clay loam",

          description:
            "A heavier but workable soil that retains moisture and nutrients."
        }),

        Object.freeze({
          value:
            "heavy-clay",

          label:
            "Heavy clay",

          shortLabel:
            "Heavy clay",

          description:
            "Dense soil that becomes sticky when wet and hard when dry."
        }),

        Object.freeze({
          value:
            "commercial-mix",

          label:
            "Commercial potting or container mix",

          shortLabel:
            "Commercial mix",

          description:
            "A manufactured planting mix rather than natural mineral soil."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the soil texture that most closely matches your growing area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "soil-drainage",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.soilDrainage",

    label:
      "How well does the soil drain after rain or watering?",

    shortLabel:
      "Soil drainage",

    reviewLabel:
      "Soil drainage",

    helpText:
      "Think about how quickly standing water disappears and how long the soil remains saturated after heavy rain.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "poor",

          label:
            "Poor drainage",

          shortLabel:
            "Poor",

          description:
            "Water may stand on the surface or the soil remains saturated for long periods."
        }),

        Object.freeze({
          value:
            "moderately-drained",

          label:
            "Moderately drained",

          shortLabel:
            "Moderate",

          description:
            "The soil drains, but it may remain wet for a while after heavy rain."
        }),

        Object.freeze({
          value:
            "well-drained",

          label:
            "Well-drained",

          shortLabel:
            "Well-drained",

          description:
            "Excess water drains reasonably well without the soil drying immediately."
        }),

        Object.freeze({
          value:
            "fast-draining",

          label:
            "Fast-draining",

          shortLabel:
            "Fast",

          description:
            "Water drains quickly and the soil may require more frequent watering."
        }),

        Object.freeze({
          value:
            "very-fast",

          label:
            "Very fast-draining",

          shortLabel:
            "Very fast",

          description:
            "Water passes through very quickly and the soil has little moisture-holding capacity."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the drainage condition of the soil."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "soil-depth",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.soilDepthCategory",

    label:
      "Do plants have access to shallow or deep soil?",

    shortLabel:
      "Soil depth",

    reviewLabel:
      "Usable soil depth",

    helpText:
      "This optional detail is useful for crops with deep roots. Leave it unanswered when you do not know the usable soil depth.",

    required:
      false,

    allowNoAnswer:
      true,

    noAnswerLabel:
      "I am not sure",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "shallow",

          label:
            "Shallow soil",

          shortLabel:
            "Shallow",

          description:
            "Roots are limited by containers, rock, compacted subsoil, hardpan, or a shallow bed."
        }),

        Object.freeze({
          value:
            "deep",

          label:
            "Deep soil",

          shortLabel:
            "Deep",

          description:
            "Roots can grow deeply without quickly encountering rock, hardpan, or another barrier."
        })
      ]),

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "soil-ph",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.soilPHCategory",

    label:
      "What is the general soil pH?",

    shortLabel:
      "Soil pH",

    reviewLabel:
      "General soil pH",

    helpText:
      "Choose the closest result from a soil test. Select unknown if the soil has not been tested.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "acidic",

          label:
            "Acidic",

          shortLabel:
            "Acidic",

          description:
            "The soil test indicates a pH below the near-neutral range."
        }),

        Object.freeze({
          value:
            "near-neutral",

          label:
            "Near neutral",

          shortLabel:
            "Near neutral",

          description:
            "The soil is approximately neutral or only mildly acidic or alkaline."
        }),

        Object.freeze({
          value:
            "unknown",

          label:
            "Unknown or not tested",

          shortLabel:
            "Unknown",

          description:
            "I do not have a dependable soil pH result."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the soil pH category or select unknown."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "soil-fertility",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "soil.fertilityLevel",

    label:
      "How fertile is the growing soil?",

    shortLabel:
      "Soil fertility",

    reviewLabel:
      "General soil fertility",

    helpText:
      "This optional detail describes the soil’s current ability to support vigorous crop growth. Leave it unanswered if you are uncertain.",

    required:
      false,

    allowNoAnswer:
      true,

    noAnswerLabel:
      "I am not sure",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "low",

          label:
            "Low fertility",

          shortLabel:
            "Low",

          description:
            "The soil is depleted, newly disturbed, very sandy, or generally produces weak growth without amendments."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate fertility",

          shortLabel:
            "Moderate",

          description:
            "The soil supports ordinary garden growth but may still benefit from compost or fertilizer."
        }),

        Object.freeze({
          value:
            "high",

          label:
            "High fertility",

          shortLabel:
            "High",

          description:
            "The soil is rich, productive, and capable of supporting nutrient-demanding crops."
        })
      ]),

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "water-reliability",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "water.waterReliability",

    label:
      "How reliable is water for the crop?",

    shortLabel:
      "Water reliability",

    reviewLabel:
      "Water availability",

    helpText:
      "Consider rainfall, wells, municipal water, irrigation restrictions, hose access, and seasonal shortages.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "very-reliable",

          label:
            "Very reliable",

          shortLabel:
            "Very reliable",

          description:
            "Dependable water is available whenever the crop reasonably needs it."
        }),

        Object.freeze({
          value:
            "usually-reliable",

          label:
            "Usually reliable",

          shortLabel:
            "Usually reliable",

          description:
            "Water is normally available, but occasional restrictions or interruptions may occur."
        }),

        Object.freeze({
          value:
            "occasionally-limited",

          label:
            "Occasionally limited",

          shortLabel:
            "Occasionally limited",

          description:
            "Water shortages or restrictions occur during some parts of the growing season."
        }),

        Object.freeze({
          value:
            "frequently-limited",

          label:
            "Frequently limited",

          shortLabel:
            "Frequently limited",

          description:
            "Water is often restricted, expensive, difficult to deliver, or unavailable."
        }),

        Object.freeze({
          value:
            "limited",

          label:
            "Generally limited",

          shortLabel:
            "Limited",

          description:
            "The crop must succeed with little supplemental water."
        }),

        Object.freeze({
          value:
            "rainfall-only",

          label:
            "Rainfall only",

          shortLabel:
            "Rainfall only",

          description:
            "No dependable supplemental irrigation is available."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how reliable water is for the growing area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "watering-frequency-preference",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "water.wateringFrequencyPreference",

    label:
      "How often are you willing or able to water?",

    shortLabel:
      "Watering frequency",

    reviewLabel:
      "Preferred watering frequency",

    helpText:
      "Choose the most frequent schedule you can realistically maintain during dry weather.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "every-2-3-days",

          label:
            "Every two to three days",

          shortLabel:
            "Every 2–3 days",

          description:
            "Frequent watering is practical when conditions require it."
        }),

        Object.freeze({
          value:
            "twice-weekly",

          label:
            "About twice per week",

          shortLabel:
            "Twice weekly",

          description:
            "I can normally water the crop approximately two times per week."
        }),

        Object.freeze({
          value:
            "weekly",

          label:
            "About once per week",

          shortLabel:
            "Weekly",

          description:
            "I prefer crops that generally manage with one planned watering per week."
        }),

        Object.freeze({
          value:
            "weekly-or-less",

          label:
            "Once per week or less",

          shortLabel:
            "Weekly or less",

          description:
            "Frequent watering is not practical, so the crop must tolerate longer dry periods."
        }),

        Object.freeze({
          value:
            "as-needed",

          label:
            "Only when clearly needed",

          shortLabel:
            "As needed",

          description:
            "I do not plan a regular watering schedule and will intervene only when necessary."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how often you are willing or able to water."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "water-conservation-priority",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "water.waterConservationPriority",

    label:
      "How important is conserving water?",

    shortLabel:
      "Water conservation",

    reviewLabel:
      "Water-conservation priority",

    helpText:
      "A higher priority tells the planner to favor crops that can provide useful harvests with less irrigation.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "low",

          label:
            "Low priority",

          shortLabel:
            "Low",

          description:
            "Water use is not a major limitation for this crop plan."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate priority",

          shortLabel:
            "Moderate",

          description:
            "I prefer reasonable water use, but it is not the deciding factor."
        }),

        Object.freeze({
          value:
            "high",

          label:
            "High priority",

          shortLabel:
            "High",

          description:
            "The crop should perform well without frequent or heavy irrigation."
        }),

        Object.freeze({
          value:
            "very-high",

          label:
            "Very high priority",

          shortLabel:
            "Very high",

          description:
            "Low irrigation demand is one of my most important requirements."
        }),

        Object.freeze({
          value:
            "top-priority",

          label:
            "Top priority",

          shortLabel:
            "Top priority",

          description:
            "The planner should strongly favor water-efficient and drought-resilient crops."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the importance of water conservation."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "critical-stage-water-availability",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "water.criticalStageWaterAvailability",

    label:
      "Can you provide water during critical growth stages?",

    shortLabel:
      "Critical-stage water",

    reviewLabel:
      "Water during critical growth stages",

    helpText:
      "Even drought-tolerant crops may need water while establishing, flowering, pollinating, filling grain, or developing fruit.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "very-reliable",

          label:
            "Yes, very reliably",

          shortLabel:
            "Very reliable",

          description:
            "I can provide water whenever an important growth stage requires it."
        }),

        Object.freeze({
          value:
            "reliable",

          label:
            "Usually reliable",

          shortLabel:
            "Reliable",

          description:
            "I can normally provide water during the crop’s most important stages."
        }),

        Object.freeze({
          value:
            "usually-reliable",

          label:
            "Usually, with some limitations",

          shortLabel:
            "Usually reliable",

          description:
            "Critical-stage water is generally available, but not guaranteed."
        }),

        Object.freeze({
          value:
            "occasional",

          label:
            "Only occasionally",

          shortLabel:
            "Occasional",

          description:
            "I may be able to water during some critical periods but not consistently."
        }),

        Object.freeze({
          value:
            "limited",

          label:
            "Limited availability",

          shortLabel:
            "Limited",

          description:
            "Only a small amount of supplemental water may be available at critical stages."
        }),

        Object.freeze({
          value:
            "unreliable",

          label:
            "Unreliable or unavailable",

          shortLabel:
            "Unreliable",

          description:
            "The crop may have to depend on rainfall even during its most sensitive stages."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how reliably water can be provided during critical growth stages."
      }),

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "labor",

        stepNumber:
          5,

        title:
          "Time, Tasks, and Equipment",

        shortTitle:
          "Labor",

        description:
          "Tell us how much time, processing work, and equipment you are willing to use.",

        answerGroups:
          Object.freeze([
            "labor"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "gardening-experience",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "labor.gardeningExperience",

    label:
      "How much gardening or crop-growing experience do you have?",

    shortLabel:
      "Experience",

    reviewLabel:
      "Gardening experience",

    helpText:
      "Choose the level that best reflects your comfort with planting, crop care, harvesting, and solving ordinary growing problems.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "beginner",

          label:
            "Beginner",

          shortLabel:
            "Beginner",

          description:
            "I have little experience or prefer crops with simple, forgiving care requirements."
        }),

        Object.freeze({
          value:
            "intermediate",

          label:
            "Intermediate",

          shortLabel:
            "Intermediate",

          description:
            "I have successfully grown several garden crops and can manage ordinary crop-care problems."
        }),

        Object.freeze({
          value:
            "experienced",

          label:
            "Experienced",

          shortLabel:
            "Experienced",

          description:
            "I am comfortable managing demanding crops, timing harvests, and completing more advanced processing."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose your level of gardening experience."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "weekly-crop-time",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "labor.weeklyCropTime",

    label:
      "How much time can you usually spend on these crops each week?",

    shortLabel:
      "Weekly time",

    reviewLabel:
      "Weekly crop-care time",

    helpText:
      "Include routine watering, weeding, inspection, harvesting, and ordinary crop maintenance. Seasonal processing work will be addressed separately.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "30-60-min",

          label:
            "30 to 60 minutes",

          shortLabel:
            "30–60 minutes",

          description:
            "I need a crop with very limited weekly maintenance."
        }),

        Object.freeze({
          value:
            "1-2-hours",

          label:
            "One to two hours",

          shortLabel:
            "1–2 hours",

          description:
            "I can provide a modest amount of routine crop care."
        }),

        Object.freeze({
          value:
            "2-4-hours",

          label:
            "Two to four hours",

          shortLabel:
            "2–4 hours",

          description:
            "I can manage regular maintenance and some additional seasonal work."
        }),

        Object.freeze({
          value:
            "3-5-hours",

          label:
            "Three to five hours",

          shortLabel:
            "3–5 hours",

          description:
            "I can support a more involved garden or feed-crop project."
        }),

        Object.freeze({
          value:
            "5-plus-hours",

          label:
            "More than five hours",

          shortLabel:
            "5+ hours",

          description:
            "I am willing to manage a substantial or labor-intensive crop project."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the amount of weekly time available for crop care."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "accepted-processing-tasks",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "labor.acceptedProcessingTasks",

    label:
      "Which harvesting and processing tasks are you willing to perform?",

    shortLabel:
      "Accepted tasks",

    reviewLabel:
      "Accepted harvesting and processing tasks",

    helpText:
      "Select every task you would realistically perform. The planner may make a crop or harvest path ineligible when a required task is not selected.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No harvesting or processing beyond direct flock access",

    options:
      PROCESSING_TASK_OPTIONS,

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "drying-capability",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "labor.dryingCapability",

    label:
      "What level of crop-drying capability do you have?",

    shortLabel:
      "Drying capability",

    reviewLabel:
      "Crop-drying capability",

    helpText:
      "Safe drying is important for stored grain, seeds, legumes, leaves, and forage. Choose the strongest setup you can reliably use.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "none",

          label:
            "No drying capability",

          shortLabel:
            "None",

          description:
            "I need crops that can be used fresh or do not require a drying step."
        }),

        Object.freeze({
          value:
            "small-racks",

          label:
            "Small racks or trays",

          shortLabel:
            "Small racks",

          description:
            "I can dry small household-sized batches on racks, trays, or screens."
        }),

        Object.freeze({
          value:
            "protected-air-drying",

          label:
            "Protected air-drying area",

          shortLabel:
            "Protected air drying",

          description:
            "I have a sheltered, ventilated place suitable for air-drying seed heads or modest grain harvests."
        }),

        Object.freeze({
          value:
            "large-covered",

          label:
            "Large covered drying area",

          shortLabel:
            "Large covered area",

          description:
            "I can dry larger harvests in a barn, shed, protected rack system, or similar covered space."
        }),

        Object.freeze({
          value:
            "grain-moisture-skilled",

          label:
            "Experienced grain-drying setup",

          shortLabel:
            "Grain-drying experience",

          description:
            "I can monitor grain moisture and safely prepare dry grain or seed for longer storage."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose your available crop-drying capability."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "drying-facilities",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "labor.dryingFacilities",

    label:
      "Which drying facilities are available?",

    shortLabel:
      "Drying facilities",

    reviewLabel:
      "Available drying facilities",

    helpText:
      "Select all facilities that can support the drying method you chose.",

    required:
      true,

    options:
      DRYING_FACILITY_OPTIONS,

    validation:
      Object.freeze({
        minimumSelections:
          1,

        requiredMessage:
          "Choose at least one available drying facility."
      }),

    visibility:
      Object.freeze({
        answerPath:
          "labor.dryingCapability",

        operator:
          VISIBILITY_OPERATORS.NOT_EQUALS,

        value:
          "none"
      })
  }),

  Object.freeze({
    id:
      "owned-equipment",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "labor.ownedEquipment",

    label:
      "Which useful equipment do you already own?",

    shortLabel:
      "Owned equipment",

    reviewLabel:
      "Equipment already owned",

    helpText:
      "Select equipment that is currently available and that you would be willing to use for this crop plan.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No specialized equipment",

    options:
      EQUIPMENT_OPTIONS,

    validation:
      null,

    visibility:
      null
  }),

  Object.freeze({
    id:
      "equipment-purchase-willingness",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "labor.equipmentPurchaseWillingness",

    label:
      "Which additional equipment would you be willing to obtain?",

    shortLabel:
      "Equipment willingness",

    reviewLabel:
      "Equipment visitor is willing to obtain",

    helpText:
      "Select only items you would realistically buy, build, borrow, or otherwise obtain. Leave the selection empty if you do not want recommendations that depend on additional equipment.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "I do not want to obtain additional equipment",

    options:
      EQUIPMENT_OPTIONS,

    validation:
      null,

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "harvest-storage",

        stepNumber:
          6,

        title:
          "Harvest and Storage",

        shortTitle:
          "Harvest",

        description:
          "Choose the types of harvests you want and how you expect to use or store them.",

        answerGroups:
          Object.freeze([
            "harvestStorage"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "desired-harvest-products",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "harvestStorage.desiredHarvestProducts",

    label:
      "Which types of harvest would you like to produce?",

    shortLabel:
      "Desired harvests",

    reviewLabel:
      "Desired harvest products",

    helpText:
      "Select every harvest form you would genuinely use. These choices are matched directly against each crop’s eligible harvest and feeding paths.",

    required:
      true,

    options:
      HARVEST_PRODUCT_OPTIONS,

    validation:
      Object.freeze({
        minimumSelections:
          1,

        requiredMessage:
          "Choose at least one type of harvest you would like to produce."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "harvest-pattern-preference",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.harvestPatternPreference",

    label:
      "What harvest pattern would you prefer?",

    shortLabel:
      "Harvest pattern",

    reviewLabel:
      "Preferred harvest pattern",

    helpText:
      "Choose whether you prefer a steady supply during the season, several separate harvests, one major harvest, or a mixture.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "continuous",

          label:
            "Continuous or repeated harvest",

          shortLabel:
            "Continuous",

          description:
            "I prefer a crop that can provide repeated harvests or ongoing forage."
        }),

        Object.freeze({
          value:
            "several",

          label:
            "Several harvests",

          shortLabel:
            "Several",

          description:
            "I prefer several distinct harvests spread across the growing season."
        }),

        Object.freeze({
          value:
            "major",

          label:
            "One major harvest period",

          shortLabel:
            "Major harvest",

          description:
            "I am comfortable harvesting most of the crop during one main harvest period."
        }),

        Object.freeze({
          value:
            "single-seasonal",

          label:
            "Single seasonal harvest",

          shortLabel:
            "Single seasonal",

          description:
            "I expect one primary harvest when the crop reaches full maturity."
        }),

        Object.freeze({
          value:
            "mixed",

          label:
            "Mixed harvest pattern",

          shortLabel:
            "Mixed",

          description:
            "I want a crop that may provide both repeated fresh use and a later seasonal harvest."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose your preferred harvest pattern."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "minimal-preparation-priority",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.minimalPreparationPriority",

    label:
      "How important is minimal harvest preparation?",

    shortLabel:
      "Minimal preparation",

    reviewLabel:
      "Minimal-preparation priority",

    helpText:
      "A higher priority favors harvests that can be fed fresh, offered whole, or used with very little drying, shelling, threshing, chopping, cooking, or other preparation.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "top",

          label:
            "Top priority",

          shortLabel:
            "Top priority",

          description:
            "I strongly prefer harvests that require almost no preparation."
        }),

        Object.freeze({
          value:
            "high",

          label:
            "High priority",

          shortLabel:
            "High",

          description:
            "Simple use is very important, although a small amount of preparation is acceptable."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate priority",

          shortLabel:
            "Moderate",

          description:
            "I prefer simpler harvests but will accept a reasonable amount of processing."
        }),

        Object.freeze({
          value:
            "medium",

          label:
            "Medium priority",

          shortLabel:
            "Medium",

          description:
            "Some processing is acceptable and preparation effort is not a leading concern."
        }),

        Object.freeze({
          value:
            "low",

          label:
            "Low priority",

          shortLabel:
            "Low",

          description:
            "I am comfortable with substantial preparation when the crop provides other benefits."
        }),

        Object.freeze({
          value:
            "none",

          label:
            "Not a priority",

          shortLabel:
            "Not a priority",

          description:
            "Preparation effort should not reduce an otherwise suitable recommendation."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how important minimal preparation is to you."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "desired-storage-duration",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.desiredStorageDuration",

    label:
      "How long would you like the harvest to remain usable?",

    shortLabel:
      "Storage duration",

    reviewLabel:
      "Desired storage duration",

    helpText:
      "Choose immediate use when you do not plan to store the harvest. Longer durations require crops and harvest paths with suitable drying, curing, or protected-storage capabilities.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "immediate",

          label:
            "Immediate or fresh use",

          shortLabel:
            "Immediate",

          description:
            "The harvest will be used fresh or shortly after collection."
        }),

        Object.freeze({
          value:
            "medium-term",

          label:
            "Medium-term storage",

          shortLabel:
            "Medium term",

          description:
            "I want the harvest to remain usable beyond immediate fresh use, but not necessarily through an entire winter."
        }),

        Object.freeze({
          value:
            "3-6-months",

          label:
            "Three to six months",

          shortLabel:
            "3–6 months",

          description:
            "I want the harvest to remain usable for several months."
        }),

        Object.freeze({
          value:
            "6-12-months",

          label:
            "Six to twelve months",

          shortLabel:
            "6–12 months",

          description:
            "I want a properly prepared harvest that can remain usable through most or all of the year."
        }),

        Object.freeze({
          value:
            "long-term",

          label:
            "Long-term storage",

          shortLabel:
            "Long term",

          description:
            "Long storage life is a major objective and I accept the preparation and protection it requires."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how long you want the harvest to remain usable."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "dry-storage-locations",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "harvestStorage.dryStorageLocations",

    label:
      "Which storage locations are available?",

    shortLabel:
      "Storage locations",

    reviewLabel:
      "Available storage locations",

    helpText:
      "Select every location that could realistically hold a dried, cured, or stored harvest.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No storage location is available",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "indoor-pantry",

          label:
            "Indoor pantry or household storage",

          shortLabel:
            "Indoor pantry",

          description:
            "An indoor household area with relatively stable conditions."
        }),

        Object.freeze({
          value:
            "climate-controlled",

          label:
            "Climate-controlled indoor space",

          shortLabel:
            "Climate-controlled",

          description:
            "An indoor area with dependable temperature and humidity control."
        }),

        Object.freeze({
          value:
            "sealed-storage-room",

          label:
            "Sealed storage room",

          shortLabel:
            "Sealed room",

          description:
            "A dedicated enclosed room that can protect stored feed crops."
        }),

        Object.freeze({
          value:
            "garage",

          label:
            "Garage",

          shortLabel:
            "Garage",

          description:
            "An attached or detached garage used for dry storage."
        }),

        Object.freeze({
          value:
            "barn-shed",

          label:
            "Barn or farm shed",

          shortLabel:
            "Barn or shed",

          description:
            "A barn, agricultural shed, or covered outbuilding."
        }),

        Object.freeze({
          value:
            "shed",

          label:
            "Garden or storage shed",

          shortLabel:
            "Shed",

          description:
            "A smaller outdoor shed that can hold protected harvests."
        }),

        Object.freeze({
          value:
            "covered-porch",

          label:
            "Covered porch",

          shortLabel:
            "Covered porch",

          description:
            "A covered outdoor area protected from direct rainfall."
        }),

        Object.freeze({
          value:
            "cool-storage",

          label:
            "Cool produce-storage area",

          shortLabel:
            "Cool storage",

          description:
            "A cool room, cellar-like area, or other location suitable for cured produce."
        })
      ]),

    validation:
      null,

    visibility:
      Object.freeze({
        answerPath:
          "harvestStorage.desiredStorageDuration",

        operator:
          VISIBILITY_OPERATORS.NOT_EQUALS,

        value:
          "immediate"
      })
  }),

  Object.freeze({
    id:
      "storage-humidity",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.storageHumidity",

    label:
      "How humid is the likely storage area?",

    shortLabel:
      "Storage humidity",

    reviewLabel:
      "Storage-area humidity",

    helpText:
      "Humidity affects mold risk, safe grain storage, dried forage quality, and the storage life of cured produce.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "consistently-dry",

          label:
            "Consistently dry",

          shortLabel:
            "Consistently dry",

          description:
            "The storage area normally remains dry with little humidity or condensation."
        }),

        Object.freeze({
          value:
            "usually-dry",

          label:
            "Usually dry",

          shortLabel:
            "Usually dry",

          description:
            "The area is normally dry but may become humid during some weather."
        }),

        Object.freeze({
          value:
            "often-humid",

          label:
            "Often humid",

          shortLabel:
            "Often humid",

          description:
            "The area frequently experiences high humidity, damp air, or condensation."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the humidity condition that best describes your likely storage area."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "dry-crop-container-type",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.dryCropContainerType",

    label:
      "What type of protected container can you use for dry crops?",

    shortLabel:
      "Storage container",

    reviewLabel:
      "Dry-crop container type",

    helpText:
      "This question applies to dry seeds, legumes, and grain. Leave it unanswered when you are storing whole produce, using the crop immediately, or do not have a suitable container.",

    required:
      false,

    allowNoAnswer:
      true,

    noAnswerLabel:
      "No protected dry-crop container",

    options:
      Object.freeze([
        Object.freeze({
          value:
            "airtight-food-safe",

          label:
            "Airtight food-safe container",

          shortLabel:
            "Airtight food-safe",

          description:
            "A food-safe bucket, bin, or container that can be sealed against moisture and pests."
        }),

        Object.freeze({
          value:
            "metal-grain-can",

          label:
            "Metal grain-storage can",

          shortLabel:
            "Metal grain can",

          description:
            "A lidded metal container suitable for protecting dry grain from rodents."
        })
      ]),

    validation:
      null,

    visibility:
      Object.freeze({
        answerPath:
          "harvestStorage.desiredStorageDuration",

        operator:
          VISIBILITY_OPERATORS.NOT_EQUALS,

        value:
          "immediate"
      })
  }),

  Object.freeze({
    id:
      "rodent-protection",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "harvestStorage.rodentProtection",

    label:
      "How well can the stored harvest be protected from rodents?",

    shortLabel:
      "Rodent protection",

    reviewLabel:
      "Rodent protection",

    helpText:
      "Rodent protection is particularly important for grain, seed, legumes, dried forage, and other concentrated stored feed.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "none",

          label:
            "No dependable protection",

          shortLabel:
            "None",

          description:
            "Mice, rats, squirrels, or other animals may be able to reach the harvest."
        }),

        Object.freeze({
          value:
            "partial",

          label:
            "Partial protection",

          shortLabel:
            "Partial",

          description:
            "Some protection is available, but the storage setup is not fully rodent-proof."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate protection",

          shortLabel:
            "Moderate",

          description:
            "The storage setup provides useful protection but may still require regular inspection."
        }),

        Object.freeze({
          value:
            "strong",

          label:
            "Strong protection",

          shortLabel:
            "Strong",

          description:
            "The area and containers provide strong barriers against most rodent access."
        }),

        Object.freeze({
          value:
            "rodent-proof-containers",

          label:
            "Rodent-proof containers",

          shortLabel:
            "Rodent-proof containers",

          description:
            "The harvest can be kept in containers that rodents cannot readily chew through or enter."
        }),

        Object.freeze({
          value:
            "rodent-proof-room",

          label:
            "Rodent-proof storage room",

          shortLabel:
            "Rodent-proof room",

          description:
            "The entire storage area is enclosed and protected against rodent entry."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose the level of rodent protection available."
      }),

    visibility:
      null
  })
])
      }),

      Object.freeze({
        id:
          "preferences",

        stepNumber:
          7,

        title:
          "Goals and Final Priorities",

        shortTitle:
          "Priorities",

        description:
          "Rank the outcomes that matter most so the planner can choose the best overall fit.",

        answerGroups:
          Object.freeze([
            "preferences"
        ]),

        questions: Object.freeze([
  Object.freeze({
    id:
      "planner-goals",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "preferences.plannerGoals",

    label:
      "What would you like your feed-crop plan to accomplish?",

    shortLabel:
      "Planner goals",

    reviewLabel:
      "Selected planner goals",

    helpText:
      "Select every outcome that genuinely matters to you. You will rank your three most important goals next.",

    required:
      true,

    options:
      PLANNER_GOAL_OPTIONS,

    validation:
      Object.freeze({
        minimumSelections:
          3,

        requiredMessage:
          "Choose at least three goals so you can rank your top priorities."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "goal-priorities",

    type:
      QUESTION_TYPES.RANKING,

    answerPath:
      "preferences.goalPriorities",

    label:
      "Rank your three most important goals",

    shortLabel:
      "Goal priorities",

    reviewLabel:
      "Top three goal priorities",

    helpText:
      "Place your most important goal first, your second-most important goal second, and your third-most important goal third. Only goals selected in the previous question should appear here.",

    required:
      true,

    sourceAnswerPath:
      "preferences.plannerGoals",

    sourceOptions:
      PLANNER_GOAL_OPTIONS,

    ranking:
      Object.freeze({
        requiredRankCount:
          3,

        valueProperty:
          "goal",

        rankProperty:
          "rank",

        firstRank:
          1,

        uniqueValues:
          true,

        uniqueRanks:
          true
      }),

    validation:
      Object.freeze({
        exactRankCount:
          3,

        requiredMessage:
          "Rank exactly three goals.",

        uniqueValuesMessage:
          "Each ranked goal must be different.",

        uniqueRanksMessage:
          "Each priority rank may be used only once."
      }),

    visibility:
      Object.freeze({
        answerPath:
          "preferences.plannerGoals",

        operator:
          VISIBILITY_OPERATORS.GREATER_THAN_OR_EQUAL,

        value:
          3,

        compare:
          "length"
      })
  }),

  Object.freeze({
    id:
      "beginner-friendliness-priority",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "preferences.beginnerFriendlinessPriority",

    label:
      "How important is beginner friendliness?",

    shortLabel:
      "Beginner friendliness",

    reviewLabel:
      "Beginner-friendliness priority",

    helpText:
      "A higher priority favors forgiving crops with simpler establishment, care, harvesting, and processing requirements.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "essential",

          label:
            "Essential",

          shortLabel:
            "Essential",

          description:
            "I strongly need a simple and forgiving crop."
        }),

        Object.freeze({
          value:
            "high",

          label:
            "High priority",

          shortLabel:
            "High",

          description:
            "Ease of growing and use should have a strong influence on the recommendation."
        }),

        Object.freeze({
          value:
            "helpful",

          label:
            "Helpful",

          shortLabel:
            "Helpful",

          description:
            "Beginner friendliness is useful, but other advantages may matter more."
        }),

        Object.freeze({
          value:
            "moderate",

          label:
            "Moderate priority",

          shortLabel:
            "Moderate",

          description:
            "I can accept some difficulty when the crop is otherwise a good fit."
        }),

        Object.freeze({
          value:
            "low",

          label:
            "Low priority",

          shortLabel:
            "Low",

          description:
            "I am comfortable with crops that require more skill or attention."
        }),

        Object.freeze({
          value:
            "not-needed",

          label:
            "Not needed",

          shortLabel:
            "Not needed",

          description:
            "Do not favor a crop merely because it is beginner-friendly."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose how important beginner friendliness is to you."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "annual-perennial-preference",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "preferences.annualPerennialPreference",

    label:
      "Do you prefer annual or perennial crops?",

    shortLabel:
      "Crop lifecycle",

    reviewLabel:
      "Annual or perennial preference",

    helpText:
      "Annual crops are normally replanted each season. Perennial crops can remain in place and provide value over multiple years.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "annual-only",

          label:
            "Annual crops only",

          shortLabel:
            "Annual only",

          description:
            "The recommendation must complete its role without becoming a permanent planting."
        }),

        Object.freeze({
          value:
            "annual-preferred",

          label:
            "Annual crops preferred",

          shortLabel:
            "Annual preferred",

          description:
            "I generally prefer annual crops, but a perennial may still be considered."
        }),

        Object.freeze({
          value:
            "no-preference",

          label:
            "No preference",

          shortLabel:
            "No preference",

          description:
            "Annual and perennial crops may be considered equally."
        }),

        Object.freeze({
          value:
            "perennial-preferred",

          label:
            "Perennial crops preferred",

          shortLabel:
            "Perennial preferred",

          description:
            "I prefer an established crop that may provide value for several years."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose your annual or perennial crop preference."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "reversibility-requirement",

    type:
      QUESTION_TYPES.SINGLE_CHOICE,

    answerPath:
      "preferences.reversibilityRequirement",

    label:
      "Must the planting be easy to remove after one season?",

    shortLabel:
      "Planting permanence",

    reviewLabel:
      "Planting reversibility requirement",

    helpText:
      "This helps the planner distinguish temporary gardens from locations where permanent forage stands, shrubs, or trees are acceptable.",

    required:
      true,

    options:
      Object.freeze([
        Object.freeze({
          value:
            "one-season",

          label:
            "Yes, it must be removable after one season",

          shortLabel:
            "One season",

          description:
            "The planting must be temporary and should not require a lasting commitment."
        }),

        Object.freeze({
          value:
            "permanent-planting-allowed",

          label:
            "No, permanent plantings are allowed",

          shortLabel:
            "Permanent allowed",

          description:
            "Long-lived forage stands, shrubs, or trees may remain in place."
        })
      ]),

    validation:
      Object.freeze({
        requiredMessage:
          "Choose whether permanent plantings are allowed."
      }),

    visibility:
      null
  }),

  Object.freeze({
    id:
      "wildlife-pest-pressure",

    type:
      QUESTION_TYPES.MULTIPLE_CHOICE,

    answerPath:
      "preferences.wildlifePestPressure",

    label:
      "Which wildlife or pest pressures are common in your growing area?",

    shortLabel:
      "Wildlife pressure",

    reviewLabel:
      "Wildlife and pest pressure",

    helpText:
      "Select animals or pests that regularly cause meaningful garden, crop, drying, or storage losses.",

    required:
      false,

    allowEmptySelection:
      true,

    emptySelectionLabel:
      "No significant wildlife or pest pressure",

    options:
      WILDLIFE_PRESSURE_OPTIONS,

    validation:
      null,

    visibility:
      null
  })
])
      })
    ]);

  const QUESTIONNAIRE_CONFIG =
    Object.freeze({
      questionnaireVersion:
        QUESTIONNAIRE_VERSION,

      stateStorageKey:
        "bcp-feed-crop-planner-state-v1",

      resultStorageKey:
        "bcp-feed-crop-planner-result-v1",

      sectionCount:
        QUESTIONNAIRE_SECTIONS.length,

      sections:
        QUESTIONNAIRE_SECTIONS
    });

  function getQuestionnaireConfig() {
    return QUESTIONNAIRE_CONFIG;
  }

  function getQuestionnaireSections() {
    return [
      ...QUESTIONNAIRE_SECTIONS
    ];
  }

  function getQuestionnaireSection(
    sectionId
  ) {
    return (
      QUESTIONNAIRE_SECTIONS.find(
        section =>
          section.id === sectionId
      ) ||
      null
    );
  }

  namespace.questionnaire =
    Object.freeze({
      version:
        QUESTIONNAIRE_VERSION,

      questionTypes:
        QUESTION_TYPES,

      visibilityOperators:
        VISIBILITY_OPERATORS,

      config:
        QUESTIONNAIRE_CONFIG,

      getQuestionnaireConfig,

      getQuestionnaireSections,

      getQuestionnaireSection
    });

})(window);