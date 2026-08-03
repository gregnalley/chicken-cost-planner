"use strict";


/*
  Backyard Chicken Planner
  Product Recommendation Crop Bridge

  Bridge Version:
  2.0.0

  Status:
  Development

  Purpose:
  - Translate Feed Crop Planner results into product profiles
  - Identify products eligible for crop recommendations
  - Reject disabled products and unusable affiliate links
  - Rank eligible products through the shared recommendation engine
  - Favor crop-specific products over broad shared products
  - Group recommendations for results-page rendering
  - Keep crop-planner-specific behavior outside the core engine

  Eligibility rules:
  - Products assigned directly to the selected crop qualify
  - Relevant universal products qualify when assigned to the
    Feed Crop Planner or crop-planner context
  - Disabled products do not qualify
  - Products with missing or placeholder URLs do not qualify

  Dependencies:
  - window.BCP_PRODUCTS
  - window.BCPProductRecommendation
*/


(function initializeProductCropBridge(
  global
){


  const namespace =
    global.BCPProductCropBridge =
      global.BCPProductCropBridge ||
      {};


  const VERSION =
    "2.0.0";



  /*
    Maximum products returned in each display group.

    These limits prevent the planner results page
    from becoming an oversized product catalog.
  */

  const DISPLAY_LIMITS =
    Object.freeze({

      primary:
        1,

      recommendedTools:
        2,

      helpfulAdditions:
        1,

      gardenEssentials:
        1

    });



  /*
    Crop-specificity adjustments.

    Exact crop-specific products receive the largest
    adjustment. Products shared by several crops receive
    a smaller adjustment. Broad products receive no
    specificity adjustment.
  */

  const SPECIFICITY_SCORES =
    Object.freeze({

      specific:
        20,

      shared:
        8,

      broad:
        0,

      none:
        0

    });



  /*
    Small adjustment applied when a product is listed
    in the primary product's recommendedTogether array.
  */

  const RECOMMENDED_TOGETHER_SCORE =
    8;

  const CROP_PLANNER_UNIVERSAL_CATEGORIES =
  Object.freeze([

    "garden-establishment",

    "small-space-gardening",

    "garden-tools",

    "garden-maintenance",

    "soil-health",

    "soil-fertility",

    "soil-improvement",

    "soil-testing",

    "planting",

    "planting-equipment",

    "irrigation",

    "watering",

    "harvesting",

    "harvest-tools",

    "processing",

    "storage",

    "composting",

    "homestead-tools"

  ]);

  /*
    Product roles that usually belong in the primary
    recommendation group.
  */

  const PRIMARY_PRODUCT_ROLES =
    Object.freeze([

      "primary"

    ]);



  /*
    Product roles that usually represent useful tools
    or direct supporting equipment.
  */

  const RECOMMENDED_TOOL_ROLES =
    Object.freeze([

      "supporting",

      "specialized",

      "diagnostic",

      "companion",

      "diy-solution"

    ]);



  /*
    Product roles that are generally optional,
    situational, or secondary.
  */

  const HELPFUL_ADDITION_ROLES =
    Object.freeze([

      "optional",

      "upgrade",

      "alternative",

      "entry-level"

    ]);



  /*
    Return an array or an empty array.
  */

  function normalizeArray(
    value
  ){

    return Array.isArray(
      value
    )

      ?

      value

      :

      [];

  }



  /*
    Return a string or an empty string.
  */

  function normalizeString(
    value
  ){

    return typeof value ===
      "string"

      ?

      value.trim()

      :

      "";

  }



  /*
    Return a unique array while preserving order.
  */

  function uniqueArray(
    values
  ){

    return Array.from(
      new Set(
        normalizeArray(
          values
        )
      )
    );

  }



  /*
    Return a product's recommendation metadata.
  */

  function getRecommendationData(
    product
  ){

    if(
      !product
      ||
      !product.recommendationData
    ){

      return {};

    }


    return product.recommendationData;

  }



  /*
    Return the standardized recommendedFor object.
  */

  function getRecommendedFor(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    return recommendationData.recommendedFor || {};

  }



  /*
    Return all crop IDs assigned to a product.

    Both legacy and current fields remain supported.
  */

  function getProductCrops(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    const recommendedFor =
      getRecommendedFor(
        product
      );


    return uniqueArray([

      ...normalizeArray(
        recommendationData.applicableCrops
      ),

      ...normalizeArray(
        recommendedFor.crops
      )

    ]);

  }



  /*
    Return all crop stages assigned to a product.
  */

  function getProductCropStages(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    const recommendedFor =
      getRecommendedFor(
        product
      );


    return uniqueArray([

      ...normalizeArray(
        recommendationData.cropStages
      ),

      ...normalizeArray(
        recommendedFor.cropStages
      )

    ]);

  }



  /*
    Return all use cases assigned to a product.
  */

  function getProductUseCases(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    const recommendedFor =
      getRecommendedFor(
        product
      );


    return uniqueArray([

      ...normalizeArray(
        recommendationData.useCases
      ),

      ...normalizeArray(
        recommendedFor.useCases
      )

    ]);

  }



  /*
    Return the product role.
  */

  function getProductRole(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    return normalizeString(
      recommendationData.productRole
    );

  }



  /*
    Return the recommendation tier.
  */

  function getRecommendationTier(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    return normalizeString(
      recommendationData.recommendationTier
    );

  }



  /*
    Determine whether a product has a usable URL.

    Empty URLs and placeholder URLs must not reach
    the public planner results page.
  */

  function hasUsableProductUrl(
    product
  ){

    if(
      !product
      ||
      typeof product.url !==
        "string"
    ){

      return false;

    }


    const url =
      product.url.trim();


    if(
      !url
    ){

      return false;

    }


    if(
      url.includes(
        "xxxxxxxx"
      )
    ){

      return false;

    }


    return true;

  }



  /*
    Determine whether the product is enabled.
  */

  function isProductEnabled(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    return recommendationData.enabled !==
      false;

  }



  /*
    Determine whether a product is assigned directly
    to any crop in the supplied profile.
  */

  function hasExactCropMatch(
    product,
    cropProfile
  ){

    const productCrops =
      getProductCrops(
        product
      );


    const profileCrops =
      normalizeArray(
        cropProfile &&
        cropProfile.applicableCrops
      );


    return profileCrops.some(function(cropId){

      return productCrops.includes(
        cropId
      );

    });

  }



  /*
    Determine whether the product explicitly supports
    the Feed Crop Planner.
  */

  function supportsFeedCropPlanner(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    const recommendedFor =
      getRecommendedFor(
        product
      );


    const planners =
      normalizeArray(
        recommendedFor.planners
      );


    const contexts =
      normalizeArray(
        recommendationData.recommendationContexts
      );


    const pageTypes =
      normalizeArray(
        recommendedFor.pageTypes
      );


    return (

      planners.includes(
        "feed-crop-planner"
      )

      ||

      contexts.includes(
        "feed-crop-planner"
      )

      ||

      contexts.includes(
        "crop-planner"
      )

      ||

      pageTypes.includes(
        "feed-crop-guide"
      )

    );

  }

  /*
  Determine whether a universal product belongs to
  a garden-related category appropriate for the
  Feed Crop Planner.
*/

function hasCropPlannerUniversalCategory(
  product
){

  const recommendationData =
    getRecommendationData(
      product
    );


  const universalCategories =
    normalizeArray(
      recommendationData.universalCategories
    );


  return universalCategories.some(function(category){

    return CROP_PLANNER_UNIVERSAL_CATEGORIES
      .includes(
        category
      );

  });

}

  /*
  Determine whether a product is a relevant universal
  product for the Feed Crop Planner.

  Universal products must:

  - Be marked universal
  - Explicitly support the Feed Crop Planner
  - Belong to a garden-related universal category
*/

function isUniversalCropPlannerProduct(
  product
){

  const recommendationData =
    getRecommendationData(
      product
    );


  return (

    recommendationData.universal ===
      true

    &&

    supportsFeedCropPlanner(
      product
    )

    &&

    hasCropPlannerUniversalCategory(
      product
    )

  );

}



  /*
    Determine whether a product belongs in the
    Feed Crop Planner recommendation pool.
  */

  function isEligibleCropPlannerProduct(
    product,
    cropProfile
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    if(
      !product
      ||
      !product.id
      ||
      Object.keys(
        recommendationData
      ).length === 0
    ){

      return false;

    }


    if(
      !isProductEnabled(
        product
      )
    ){

      return false;

    }


    if(
      !hasUsableProductUrl(
        product
      )
    ){

      return false;

    }


    if(
      hasExactCropMatch(
        product,
        cropProfile
      )
    ){

      return true;

    }


    if(
      isUniversalCropPlannerProduct(
        product
      )
    ){

      return true;

    }


    return false;

  }



  /*
    Determine how narrowly a product is assigned.

    specific:
      Assigned to one crop.

    shared:
      Assigned to two through five crops.

    broad:
      Assigned to more than five crops.

    none:
      No direct crop assignments.
  */

  function getCropSpecificity(
    product
  ){

    const crops =
      getProductCrops(
        product
      );


    if(
      crops.length ===
      1
    ){

      return "specific";

    }


    if(
      crops.length >=
        2
      &&
      crops.length <=
        5
    ){

      return "shared";

    }


    if(
      crops.length >
        5
    ){

      return "broad";

    }


    return "none";

  }



  /*
    Return the crop-specificity score adjustment.

    The adjustment is only applied when the product
    actually matches the selected crop.
  */

  function getCropSpecificityScore(
    product,
    cropProfile
  ){

    if(
      !hasExactCropMatch(
        product,
        cropProfile
      )
    ){

      return 0;

    }


    const specificity =
      getCropSpecificity(
        product
      );


    return SPECIFICITY_SCORES[
      specificity
    ] || 0;

  }



  /*
    Convert crop-result data into the recommendation
    profile expected by the shared engine.

    Extra planner fields are retained for filtering
    and future scoring even if the current engine does
    not yet use all of them.
  */

  function getCropProductProfile(
    cropData
  ){

    const source =
      cropData || {};


    const suppliedStages =
      normalizeArray(
        source.cropStages
      );


    const cropStages =

      suppliedStages.length >
        0

        ?

        suppliedStages

        :

        source.stage

          ?

          [
            source.stage
          ]

          :

          [];


    return {

      context:
        "crop-planner",


      planners: [

        "feed-crop-planner"

      ],


      applicableCrops:

        source.cropId

          ?

          [
            source.cropId
          ]

          :

          [],


      cropStages:
        uniqueArray(
          cropStages
        ),


      useCases:
        uniqueArray(
          source.useCases
        ),


      buyerStage:

        typeof source.buyerStage ===
          "string"

          ?

          source.buyerStage

          :

          "homestead",


      userType:

        typeof source.userType ===
          "string"

          ?

          source.userType

          :

          "backyard-flock-owner",


      problems:
        uniqueArray(
          source.problems
        ),


      experienceLevel:

        typeof source.experienceLevel ===
          "string"

          ?

          source.experienceLevel

          :

          "beginner",


      spaceLevel:

        typeof source.spaceLevel ===
          "string"

          ?

          source.spaceLevel

          :

          null,


      flockSize:

        typeof source.flockSize ===
          "string"

          ?

          source.flockSize

          :

          null,


      budgetLevel:

        typeof source.budgetLevel ===
          "string"

          ?

          source.budgetLevel

          :

          null,


      storageAvailable:
        source.storageAvailable ===
          true,


      irrigationAvailable:
        source.irrigationAvailable ===
          true,


      growingMethods:
        uniqueArray(
          source.growingMethods
        ),


      goals:
        uniqueArray(
          source.goals
        )

    };

  }



  /*
    Filter an array to products eligible for the
    supplied crop profile.
  */

  function filterCropPlannerProducts(
    products,
    cropProfile
  ){

    if(
      !Array.isArray(
        products
      )
      ||
      !cropProfile
    ){

      return [];

    }


    return products.filter(function(product){

      return isEligibleCropPlannerProduct(
        product,
        cropProfile
      );

    });

  }



  /*
    Return unique products by product ID.

    The first occurrence is retained.
  */

  function deduplicateProducts(
    products
  ){

    const seenProductIds =
      new Set();


    return normalizeArray(
      products
    )
      .filter(function(product){

        if(
          !product
          ||
          !product.id
          ||
          seenProductIds.has(
            product.id
          )
        ){

          return false;

        }


        seenProductIds.add(
          product.id
        );


        return true;

      });

  }



  /*
    Score and rank an eligible product collection
    through the shared recommendation engine.

    The shared engine calculates the base score.

    The bridge then adds:
    - Crop-specificity adjustment
    - Additional crop-planner explanations
  */

  function rankCropProducts(
    products,
    cropProfile
  ){

    if(
      !Array.isArray(
        products
      )
      ||
      !cropProfile
      ||
      !global.BCPProductRecommendation
    ){

      return [];

    }


    const uniqueProducts =
      deduplicateProducts(
        products
      );


    return uniqueProducts
      .map(function(product){

        const scoredProduct =
          global.BCPProductRecommendation
            .scoreProduct(
              product,
              cropProfile
            );


        const specificity =
          getCropSpecificity(
            product
          );


        const specificityScore =
          getCropSpecificityScore(
            product,
            cropProfile
          );


        const reasons =
          normalizeArray(
            scoredProduct.reasons
          )
            .slice();


        if(
          specificityScore >
            0
        ){

          reasons.push(

            specificity ===
              "specific"

              ?

              "Designed specifically for this crop"

              :

              "Shared tool matched to this crop"

          );

        }


        return {

          product:
            product,

          productId:
            scoredProduct.productId,

          title:
            scoredProduct.title,

          baseScore:
            scoredProduct.score,

          specificity:
            specificity,

          specificityScore:
            specificityScore,

          relationshipScore:
            0,

          score:
            scoredProduct.score +
            specificityScore,

          scoreBreakdown:
            scoredProduct.scoreBreakdown ||
            {},

          reasons:
            reasons

        };

      })
      .sort(function(a,b){

        return b.score -
          a.score;

      });

  }



  /*
    Return the highest-ranked primary product.

    Preference is given to:
    - Primary role
    - Core recommendation tier
    - Exact crop match
  */

  function selectPrimaryRecommendation(
    rankedProducts,
    cropProfile
  ){

    const candidates =
      normalizeArray(
        rankedProducts
      )
        .filter(function(item){

          const product =
            item.product;


          const role =
            getProductRole(
              product
            );


          const tier =
            getRecommendationTier(
              product
            );


          return (

            PRIMARY_PRODUCT_ROLES.includes(
              role
            )

            ||

            tier ===
              "core"

          );

        })
        .filter(function(item){

          return hasExactCropMatch(
            item.product,
            cropProfile
          );

        });


    return candidates.length >
      0

      ?

      candidates[0]

      :

      null;

  }



  /*
    Apply a modest recommendation-together adjustment
    based on the selected primary product.

    Related products are not forced into the results.
    Only products already eligible receive the boost.
  */

  function applyRecommendedTogetherBoost(
    rankedProducts,
    primaryRecommendation
  ){

    if(
      !primaryRecommendation
      ||
      !primaryRecommendation.product
    ){

      return normalizeArray(
        rankedProducts
      );

    }


    const recommendationData =
      getRecommendationData(
        primaryRecommendation.product
      );


    const recommendedTogether =
      normalizeArray(
        recommendationData.recommendedTogether
      );


    return normalizeArray(
      rankedProducts
    )
      .map(function(item){

        if(
          item.productId ===
            primaryRecommendation.productId
        ){

          return item;

        }


        if(
          !recommendedTogether.includes(
            item.productId
          )
        ){

          return item;

        }


        return {

          ...item,

          relationshipScore:
            RECOMMENDED_TOGETHER_SCORE,

          score:
            item.score +
            RECOMMENDED_TOGETHER_SCORE,

          reasons: [

            ...normalizeArray(
              item.reasons
            ),

            "Recommended with the primary crop product"

          ]

        };

      })
      .sort(function(a,b){

        return b.score -
          a.score;

      });

  }



  /*
    Return true when a product should appear in the
    garden-essentials group.
  */

  function isGardenEssential(
    product
  ){

    const recommendationData =
      getRecommendationData(
        product
      );


    return recommendationData.universal ===
      true;

  }



  /*
    Return true when a product should appear in the
    helpful-additions group.
  */

  function isHelpfulAddition(
  product
){

  const role =
    getProductRole(
      product
    );


  const tier =
    getRecommendationTier(
      product
    );


  /*
    Explicit situational products belong in the
    Helpful Additions group.
  */

  if(
    tier ===
      "situational"
  ){

    return true;

  }


  /*
    Core, recommended, and specialty tiers are handled
    by the Primary or Recommended Tools groups.

    This prevents an optional role from overriding a
    stronger recommendation tier.
  */

  if(
    tier ===
      "core"
    ||
    tier ===
      "recommended"
    ||
    tier ===
      "specialty"
  ){

    return false;

  }


  return HELPFUL_ADDITION_ROLES.includes(
    role
  );

}



  /*
    Return true when a product should appear in the
    recommended-tools group.
  */

  function isRecommendedTool(
  product
){

  const role =
    getProductRole(
      product
    );


  const tier =
    getRecommendationTier(
      product
    );


  /*
    Explicit recommendation tiers take precedence
    over broader product-role labels.
  */

  if(
    tier ===
      "recommended"
    ||
    tier ===
      "specialty"
  ){

    return true;

  }


  /*
    Situational products belong in Helpful Additions,
    even if their role would otherwise qualify them
    as a recommended tool.
  */

  if(
    tier ===
      "situational"
  ){

    return false;

  }


  return RECOMMENDED_TOOL_ROLES.includes(
    role
  );

}



  /*
    Group ranked recommendations for results-page use.

    Each product may appear in only one group.
  */

  function groupCropProductRecommendations(
    rankedProducts,
    cropProfile
  ){

    const ranked =
      normalizeArray(
        rankedProducts
      );


    const primaryRecommendation =
      selectPrimaryRecommendation(
        ranked,
        cropProfile
      );


    const primaryProductId =
      primaryRecommendation

        ?

        primaryRecommendation.productId

        :

        null;


    const recommendedTools =
      [];


    const helpfulAdditions =
      [];


    const gardenEssentials =
      [];


    ranked.forEach(function(item){

      if(
        item.productId ===
          primaryProductId
      ){

        return;

      }


      const product =
        item.product;


      if(
  isGardenEssential(
    product
  )
){

  gardenEssentials.push(
    item
  );


  return;

}


/*
  Check recommended tools before helpful additions.

  This allows a specialty or recommended tier to
  take precedence over a broader optional role.
*/

if(
  isRecommendedTool(
    product
  )
){

  recommendedTools.push(
    item
  );


  return;

}


if(
  isHelpfulAddition(
    product
  )
){

  helpfulAdditions.push(
    item
  );


  return;

}


      helpfulAdditions.push(
        item
      );

    });


    return {

      cropId:

        normalizeArray(
          cropProfile &&
          cropProfile.applicableCrops
        )[0] || null,


      primary:

        primaryRecommendation

          ?

          [
            primaryRecommendation
          ]

          :

          [],


      recommendedTools:
        recommendedTools.slice(
          0,
          DISPLAY_LIMITS.recommendedTools
        ),


      helpfulAdditions:
        helpfulAdditions.slice(
          0,
          DISPLAY_LIMITS.helpfulAdditions
        ),


      gardenEssentials:
        gardenEssentials.slice(
          0,
          DISPLAY_LIMITS.gardenEssentials
        ),


      allRanked:
        ranked

    };

  }



  /*
    Return ranked crop-product recommendations.

    This method preserves the Version 1 flat-array API.

    Pass a numeric limit to restrict the result count.
  */

  function getCropProductRecommendations(
    cropProfile,
    limit
  ){

    if(
      !cropProfile
      ||
      !global.BCPProductRecommendation
    ){

      return [];

    }


    const activeProducts =
      global.BCPProductRecommendation
        .getActiveProducts();


    const eligibleProducts =
      filterCropPlannerProducts(
        activeProducts,
        cropProfile
      );


    const initiallyRankedProducts =
      rankCropProducts(
        eligibleProducts,
        cropProfile
      );


    const primaryRecommendation =
      selectPrimaryRecommendation(
        initiallyRankedProducts,
        cropProfile
      );


    const rankedProducts =
      applyRecommendedTogetherBoost(
        initiallyRankedProducts,
        primaryRecommendation
      );


    if(
      typeof limit ===
        "number"
      &&
      limit >= 0
    ){

      return rankedProducts.slice(
        0,
        limit
      );

    }


    return rankedProducts;

  }



  /*
    Return recommendations grouped for results-page use.
  */

  function getGroupedCropProductRecommendations(
    cropProfile
  ){

    if(
      !cropProfile
    ){

      return {

        cropId:
          null,

        primary:
          [],

        recommendedTools:
          [],

        helpfulAdditions:
          [],

        gardenEssentials:
          [],

        allRanked:
          []

      };

    }


    const rankedProducts =
      getCropProductRecommendations(
        cropProfile
      );


    return groupCropProductRecommendations(
      rankedProducts,
      cropProfile
    );

  }



  /*
    Convenience method.

    Accept raw crop-result data, create the product
    profile, and return grouped recommendations.
  */

  function getRecommendationsForCropData(
    cropData
  ){

    const cropProfile =
      getCropProductProfile(
        cropData
      );


    return getGroupedCropProductRecommendations(
      cropProfile
    );

  }



  /*
    Public API
  */

  namespace.VERSION =
    VERSION;


  namespace.DISPLAY_LIMITS =
    DISPLAY_LIMITS;


  namespace.SPECIFICITY_SCORES =
    SPECIFICITY_SCORES;


  namespace.RECOMMENDED_TOGETHER_SCORE =
    RECOMMENDED_TOGETHER_SCORE;

  namespace.CROP_PLANNER_UNIVERSAL_CATEGORIES =
    CROP_PLANNER_UNIVERSAL_CATEGORIES;  


  namespace.PRIMARY_PRODUCT_ROLES =
    PRIMARY_PRODUCT_ROLES;


  namespace.RECOMMENDED_TOOL_ROLES =
    RECOMMENDED_TOOL_ROLES;


  namespace.HELPFUL_ADDITION_ROLES =
    HELPFUL_ADDITION_ROLES;


  namespace.normalizeArray =
    normalizeArray;


  namespace.normalizeString =
    normalizeString;


  namespace.uniqueArray =
    uniqueArray;


  namespace.getRecommendationData =
    getRecommendationData;


  namespace.getRecommendedFor =
    getRecommendedFor;


  namespace.getProductCrops =
    getProductCrops;


  namespace.getProductCropStages =
    getProductCropStages;


  namespace.getProductUseCases =
    getProductUseCases;


  namespace.getProductRole =
    getProductRole;


  namespace.getRecommendationTier =
    getRecommendationTier;


  namespace.hasUsableProductUrl =
    hasUsableProductUrl;


  namespace.isProductEnabled =
    isProductEnabled;


  namespace.hasExactCropMatch =
    hasExactCropMatch;


  namespace.supportsFeedCropPlanner =
    supportsFeedCropPlanner;

  namespace.hasCropPlannerUniversalCategory =
    hasCropPlannerUniversalCategory;


  namespace.isUniversalCropPlannerProduct =
    isUniversalCropPlannerProduct;


  namespace.isEligibleCropPlannerProduct =
    isEligibleCropPlannerProduct;


  namespace.getCropSpecificity =
    getCropSpecificity;


  namespace.getCropSpecificityScore =
    getCropSpecificityScore;


  namespace.getCropProductProfile =
    getCropProductProfile;


  namespace.filterCropPlannerProducts =
    filterCropPlannerProducts;


  namespace.deduplicateProducts =
    deduplicateProducts;


  namespace.rankCropProducts =
    rankCropProducts;


  namespace.selectPrimaryRecommendation =
    selectPrimaryRecommendation;


  namespace.applyRecommendedTogetherBoost =
    applyRecommendedTogetherBoost;


  namespace.isGardenEssential =
    isGardenEssential;


  namespace.isHelpfulAddition =
    isHelpfulAddition;


  namespace.isRecommendedTool =
    isRecommendedTool;


  namespace.groupCropProductRecommendations =
    groupCropProductRecommendations;


  namespace.getCropProductRecommendations =
    getCropProductRecommendations;


  namespace.getGroupedCropProductRecommendations =
    getGroupedCropProductRecommendations;


  namespace.getRecommendationsForCropData =
    getRecommendationsForCropData;


})(window);