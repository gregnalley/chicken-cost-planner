"use strict";

/*
  Backyard Chicken Planner
  Shared Feed Crop Image Registry

  Version:
  1.0.0

  Purpose:
  - Stores the shared image collection for each feed crop
  - Provides direct lookup using the crop's permanent ID
  - Supports the What Can Chickens Eat page
  - Supports Feed Crop Planner recommendation results
  - Supports future crop comparison and detail pages

  Usage example:

  const cropImages =
    window.BCP_FEED_CROP_IMAGES[
      "CROP-COMFREY"
    ];

  const plantImage =
    cropImages.images[0];
*/

(function initializeFeedCropImages(
  global
) {

  const FEED_CROP_IMAGES =
    Object.freeze({

      "CROP-SUNFLOWER":
        Object.freeze({

          cropId:
            "CROP-SUNFLOWER",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/sunflower/sunflower-plant.webp",

                alt:
                  "Mature sunflower plants growing in a backyard garden.",

                caption:
                  "Sunflowers produce large seed heads that can provide energy-rich supplemental grain and natural enrichment for backyard chickens."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/sunflower/harvesting-sunflower.webp",

                alt:
                  "Harvesting mature sunflower seed heads.",

                caption:
                  "Sunflower heads can be harvested after the seeds mature and the backs of the heads begin drying."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/sunflower/chickens-eating-sunflower.webp",

                alt:
                  "Backyard chickens eating sunflower seeds from a mature seed head.",

                caption:
                  "Whole sunflower heads can provide both supplemental nutrition and extended pecking enrichment."
              })

            ])

        }),

      "CROP-COWPEA":
        Object.freeze({

          cropId:
            "CROP-COWPEA",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/cowpea/cowpea-plant.webp",

                alt:
                  "Cowpea plants growing in a backyard garden.",

                caption:
                  "Cowpeas are warm-season legumes that can produce edible leaves, pods, forage, and protein-rich mature peas."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/cowpea/harvest-cowpea.webp",

                alt:
                  "Harvesting mature cowpea pods.",

                caption:
                  "Cowpeas may be harvested as tender forage, immature pods, fresh peas, or fully mature dry peas."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/cowpea/chickens-eating-cowpeas.webp",

                alt:
                  "Backyard chickens eating cowpeas.",

                caption:
                  "Properly prepared cowpeas can contribute supplemental plant protein when complete poultry feed remains the nutritional foundation."
              })

            ])

        }),

      "CROP-PROSO-MILLET":
        Object.freeze({

          cropId:
            "CROP-PROSO-MILLET",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/proso-millet/proso-millet-plant.webp",

                alt:
                  "Proso millet plants growing in a small grain plot.",

                caption:
                  "Proso millet is a fast-growing warm-season grain crop that produces small seeds readily consumed by poultry."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/proso-millet/harvesting-proso-millet.webp",

                alt:
                  "Harvesting mature proso millet seed heads.",

                caption:
                  "Proso millet should be harvested after the grain matures and then dried thoroughly before enclosed storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/proso-millet/chickens-eating-proso-millet.webp",

                alt:
                  "Backyard chickens eating proso millet.",

                caption:
                  "Proso millet provides small energy-rich seeds that encourage natural scratching and foraging behavior."
              })

            ])

        }),

      "CROP-PUMPKIN-WINTER-SQUASH":
        Object.freeze({

          cropId:
            "CROP-PUMPKIN-WINTER-SQUASH",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/pumpkin/pumpkin-plant.webp",

                alt:
                  "Pumpkin vines and developing pumpkins growing in a garden.",

                caption:
                  "Pumpkins and winter squash produce edible flesh and seeds while also providing valuable household food and seasonal storage."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/pumpkin/harvesting-pumpkin.webp",

                alt:
                  "Harvesting a mature pumpkin from the garden.",

                caption:
                  "Mature pumpkins should be harvested with intact stems and cured appropriately before extended storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/pumpkin/chickens-eating-pumpkin.webp",

                alt:
                  "Backyard chickens eating an opened pumpkin.",

                caption:
                  "Opening or cutting the rind allows chickens to peck at the flesh and seeds as a seasonal supplement."
              })

            ])

        }),

      "CROP-KALE-COLLARDS":
        Object.freeze({

          cropId:
            "CROP-KALE-COLLARDS",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/kale-collards/kale-collards-plant.webp",

                alt:
                  "Healthy kale and collard green plants growing in a garden.",

                caption:
                  "Kale and collards are productive cool-season leafy crops that can supply repeated harvests of supplemental greens."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/kale-collards/harvesting-kale-collards.webp",

                alt:
                  "Harvesting fresh kale and collard green leaves.",

                caption:
                  "Outer leaves can be harvested repeatedly while the growing point remains intact for continued production."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/kale-collards/chickens-eating-kale-collards.webp",

                alt:
                  "Backyard chickens eating fresh kale and collard greens.",

                caption:
                  "Fresh leaves provide supplemental greens and pecking enrichment when offered alongside complete poultry feed."
              })

            ])

        }),

      "CROP-WHITE-CLOVER":
        Object.freeze({

          cropId:
            "CROP-WHITE-CLOVER",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/white-clover/white-clover-plant.webp",

                alt:
                  "White clover growing as a low groundcover.",

                caption:
                  "White clover is a low-growing perennial legume that can support grazing, pollinators, soil cover, and nitrogen fixation."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/white-clover/harvesting-white-clover.webp",

                alt:
                  "Harvesting fresh white clover forage.",

                caption:
                  "Clean white clover foliage may be cut for controlled feeding or managed as protected rotational forage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/white-clover/chickens-eating-white-clover.webp",

                alt:
                  "Backyard chickens grazing white clover.",

                caption:
                  "Established white clover can provide natural grazing enrichment where flock access is carefully managed."
              })

            ])

        }),

      "CROP-ALFALFA":
        Object.freeze({

          cropId:
            "CROP-ALFALFA",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/alfalfa/alfalfa-plant.webp",

                alt:
                  "A healthy stand of alfalfa growing in a garden or small field.",

                caption:
                  "Alfalfa is a nutrient-dense perennial legume capable of producing repeated harvests of leafy forage."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/alfalfa/harvesting-alfalfa.webp",

                alt:
                  "Harvesting alfalfa for fresh forage or hay.",

                caption:
                  "Alfalfa may be harvested several times during the growing season for fresh feeding, drying, or hay production."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/alfalfa/chickens-eating-alfalfa.webp",

                alt:
                  "Backyard chickens eating fresh alfalfa.",

                caption:
                  "Fresh alfalfa provides supplemental greens and enrichment but should not replace a nutritionally complete poultry ration."
              })

            ])

        }),

      "CROP-MULBERRY":
        Object.freeze({

          cropId:
            "CROP-MULBERRY",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/mulberry/mulberry-tree.webp",

                alt:
                  "A mature mulberry tree producing leafy growth and fruit.",

                caption:
                  "Mulberry trees can provide seasonal fruit, harvestable leaves, shade, and long-term perennial value."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/mulberry/harvesting-mulberries.webp",

                alt:
                  "Harvesting ripe mulberries from a tree.",

                caption:
                  "Ripe mulberries and clean sound leaves may both have supplemental uses for a backyard flock."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/mulberry/chickens-eating-mulberries.webp",

                alt:
                  "Backyard chickens eating ripe mulberries beneath a tree.",

                caption:
                  "Fallen ripe mulberries provide seasonal enrichment, although excessive fruit accumulation should be managed to prevent spoilage."
              })

            ])

        }),

      "CROP-FIELD-CORN":
        Object.freeze({

          cropId:
            "CROP-FIELD-CORN",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/field-corn/field-corn-plant.webp",

                alt:
                  "Field corn plants growing in a backyard grain plot.",

                caption:
                  "Field corn is a warm-season cereal crop grown for mature, dry, energy-rich kernels."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/field-corn/shelling-field-corn.webp",

                alt:
                  "Shelling dry field corn kernels from a mature ear.",

                caption:
                  "Properly dried ears can be shelled to produce clean grain for storage and later supplemental feeding."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/field-corn/chickens-eating-corn.webp",

                alt:
                  "Backyard chickens eating field corn.",

                caption:
                  "Field corn is an energy-dense grain that should remain a measured supplement rather than replacing complete poultry feed."
              })

            ])

        }),

      "CROP-GRAIN-SORGHUM":
        Object.freeze({

          cropId:
            "CROP-GRAIN-SORGHUM",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/grain-sorghum/grain-sorghum-plant.webp",

                alt:
                  "Grain sorghum growing in a backyard garden or small field.",

                caption:
                  "Grain sorghum is a heat- and drought-tolerant cereal crop that produces abundant seed heads."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/grain-sorghum/harvesting-grain-sorghum.webp",

                alt:
                  "Harvesting mature grain sorghum seed heads.",

                caption:
                  "Mature sorghum heads should be harvested and dried thoroughly before threshing or enclosed storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/grain-sorghum/chickens-eating-grain-sorghum.webp",

                alt:
                  "Backyard chickens eating grain sorghum.",

                caption:
                  "Grain sorghum supplies supplemental dietary energy and can be offered whole, cracked, or as intact dried heads."
              })

            ])

        }),

      "CROP-OATS":
        Object.freeze({

          cropId:
            "CROP-OATS",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/oats/oats-plant.webp",

                alt:
                  "A healthy stand of oats growing in a garden or grain plot.",

                caption:
                  "Oats are a cool-season cereal crop capable of producing grain, forage, and seasonal cover."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/oats/harvesting-oats.webp",

                alt:
                  "Harvesting mature oat seed heads.",

                caption:
                  "Oats should be harvested after the grain matures and dried thoroughly before storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/oats/chickens-eating-oats.webp",

                alt:
                  "Backyard chickens eating whole oats.",

                caption:
                  "Whole oats provide supplemental carbohydrates, fiber, and natural foraging enrichment."
              })

            ])

        }),

      "CROP-WHEAT":
        Object.freeze({

          cropId:
            "CROP-WHEAT",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/wheat/wheat-plant.webp",

                alt:
                  "A healthy stand of wheat growing in a backyard grain plot.",

                caption:
                  "Wheat is a cool-season cereal crop that produces an energy-rich grain suitable for measured supplemental use."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/wheat/harvesting-wheat.webp",

                alt:
                  "Harvesting mature wheat heads.",

                caption:
                  "Mature wheat should be harvested, threshed, cleaned, and dried adequately before storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/wheat/chickens-eating-wheat.webp",

                alt:
                  "Backyard chickens eating whole wheat grain.",

                caption:
                  "Whole wheat provides supplemental carbohydrates and pecking enrichment when offered in controlled quantities."
              })

            ])

        }),

      "CROP-JERUSALEM-ARTICHOKE":
        Object.freeze({

          cropId:
            "CROP-JERUSALEM-ARTICHOKE",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/jerusalem-artichoke/jerusalem-artichoke-plant.webp",

                alt:
                  "Tall Jerusalem artichoke plants growing in a garden.",

                caption:
                  "Jerusalem artichokes are tall perennial plants that produce edible underground tubers and return from surviving tubers each year."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/jerusalem-artichoke/harvesting-jerusalem-artichokes.webp",

                alt:
                  "Harvesting Jerusalem artichoke tubers from the soil.",

                caption:
                  "Tubers are commonly harvested after the tops die back and may remain in workable soil for short-term winter storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/jerusalem-artichoke/chickens-eating-jerusalem-artichokes.webp",

                alt:
                  "Backyard chickens eating chopped Jerusalem artichoke tubers.",

                caption:
                  "Clean tubers may be chopped or opened to make them easier for chickens to investigate and consume."
              })

            ])

        }),

      "CROP-AMARANTH":
        Object.freeze({

          cropId:
            "CROP-AMARANTH",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/amaranth/amaranth-plant.webp",

                alt:
                  "Mature amaranth plants growing in a backyard garden.",

                caption:
                  "Amaranth is a productive dual-purpose crop that can provide grain, leafy material, and ornamental garden value."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/amaranth/harvesting-amaranth.webp",

                alt:
                  "Harvesting mature amaranth seed heads.",

                caption:
                  "Amaranth seed heads can be harvested after maturity and dried before threshing, cleaning, and storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/amaranth/chickens-eating-amaranth.webp",

                alt:
                  "Backyard chickens eating amaranth grain and seed heads.",

                caption:
                  "Mature amaranth grain and dried seed heads can provide supplemental nutrition and pecking enrichment."
              })

            ])

        }),

      "CROP-BARLEY":
        Object.freeze({

          cropId:
            "CROP-BARLEY",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/barley/barley-plant.webp",

                alt:
                  "A healthy stand of barley growing in a garden or grain field.",

                caption:
                  "Barley is a cool-season cereal crop that can provide mature grain, young forage, and sprouting options."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/barley/harvesting-barley.webp",

                alt:
                  "Harvesting mature barley heads.",

                caption:
                  "Barley should be harvested after maturity and dried thoroughly before threshing or storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/barley/chickens-eating-barley.webp",

                alt:
                  "Backyard chickens eating whole barley grain.",

                caption:
                  "Barley can provide supplemental carbohydrates and enrichment, although its hull and fiber require conservative use."
              })

            ])

        }),

      "CROP-BUCKWHEAT":
        Object.freeze({

          cropId:
            "CROP-BUCKWHEAT",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/buckwheat/buckwheat-plant.webp",

                alt:
                  "Buckwheat growing and flowering in a backyard garden.",

                caption:
                  "Buckwheat is a fast-growing warm-season pseudocereal that produces grain while supporting pollinators."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/buckwheat/harvesting-buckwheat.webp",

                alt:
                  "Harvesting mature buckwheat plants for grain.",

                caption:
                  "Buckwheat is commonly harvested when most seeds are mature but before excessive shattering occurs."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/buckwheat/chickens-eating-buckwheat.webp",

                alt:
                  "Backyard chickens eating mature buckwheat grain.",

                caption:
                  "Mature buckwheat grain can provide supplemental energy and foraging enrichment when used conservatively."
              })

            ])

        }),

      "CROP-COMFREY":
        Object.freeze({

          cropId:
            "CROP-COMFREY",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/comfrey/comfrey-plant.webp",

                alt:
                  "Healthy comfrey plants growing in a backyard garden.",

                caption:
                  "Comfrey is a deep-rooted perennial capable of producing abundant leafy biomass through repeated seasonal harvests."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/comfrey/harvesting-comfrey.webp",

                alt:
                  "Harvesting mature comfrey leaves.",

                caption:
                  "Comfrey leaves can be harvested repeatedly for controlled supplemental use, compost, or mulch."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/comfrey/chickens-eating-comfrey.webp",

                alt:
                  "Backyard chickens eating freshly harvested comfrey leaves.",

                caption:
                  "Comfrey should be offered conservatively as a limited supplemental green rather than as unrestricted forage or complete feed."
              })

            ])

        }),

      "CROP-FIELD-PEAS":
        Object.freeze({

          cropId:
            "CROP-FIELD-PEAS",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/field-pea/field-pea-plant.webp",

                alt:
                  "Field pea plants growing in a backyard garden or small field.",

                caption:
                  "Field peas are cool-season legumes that produce protein-rich mature peas and provide soil-building nitrogen fixation."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/field-pea/harvesting-field-pea.webp",

                alt:
                  "Harvesting mature field pea pods.",

                caption:
                  "Dry field peas should be harvested after pod maturity and dried thoroughly before shelling and storage."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/field-pea/chickens-eating-field-peas.webp",

                alt:
                  "Backyard chickens eating field peas.",

                caption:
                  "Field peas can contribute supplemental plant protein but do not provide a complete poultry ration by themselves."
              })

            ])

        }),

      "CROP-SOYBEANS":
        Object.freeze({

          cropId:
            "CROP-SOYBEANS",

          images:
            Object.freeze([

              Object.freeze({
                type:
                  "plant",

                src:
                  "assets/images/feed-crops/soybean/soybean-plant.webp",

                alt:
                  "Healthy soybean plants growing in a backyard garden or small field.",

                caption:
                  "Soybeans are high-protein legumes that produce nutrient-rich mature beans and fix atmospheric nitrogen."
              }),

              Object.freeze({
                type:
                  "harvest",

                src:
                  "assets/images/feed-crops/soybean/harvesting-soybean.webp",

                alt:
                  "Harvesting mature soybean plants and pods.",

                caption:
                  "Mature soybean pods are harvested after drying, but the raw beans still require validated heat processing before poultry feeding."
              }),

              Object.freeze({
                type:
                  "chickens-eating",

                src:
                  "assets/images/feed-crops/soybean/chickens-eating-soybean.webp",

                alt:
                  "Backyard chickens eating properly heat-treated soybeans.",

                caption:
                  "Soybeans are a valuable protein ingredient only after appropriate heat treatment reduces naturally occurring antinutritional factors."
              })

            ])

        })

    });

    function getFeedCropImages(
    cropId
  ) {

    if(
      !cropId
    ) {

      return null;

    }

    return (
      FEED_CROP_IMAGES[
        cropId
      ] ||
      null
    );

  }

  global.BCP_FEED_CROP_IMAGES =
    FEED_CROP_IMAGES;

  global.BCPFeedCropImages =
    Object.freeze({

      getImages:
        getFeedCropImages

    });

})(
  window
);