"use strict";


/*
  Backyard Chicken Planner
  Product Recommendation Crop Bridge

  Bridge Version:
  1.2.0

  Status:
  Stable

  Purpose:
  - Translate Feed Crop Planner data into a product profile
  - Identify products eligible for crop recommendations
  - Rank eligible products through the shared recommendation engine
  - Keep crop-planner-specific filtering outside the core engine

  Eligibility rules:
  - Products assigned directly to the selected crop qualify
  - PRD-100 through PRD-119 qualify as general crop-planner products
  - Disabled products do not qualify

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
    "1.2.0";


  const GENERAL_PRODUCT_RANGE =
    Object.freeze({

      minimum:
        100,

      maximum:
        119

    });



  /*
    Return an array or an empty array.
  */

  function normalizeArray(
    value
  ){

    return Array.isArray(value)
      ? value
      : [];

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

    Both the legacy and current crop fields are
    supported during the catalog transition.
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


    return [

      ...normalizeArray(
        recommendationData.applicableCrops
      ),

      ...normalizeArray(
        recommendedFor.crops
      )

    ];

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
    Identify the intentional general crop-planner
    product group: PRD-100 through PRD-119.
  */

  function isGeneralCropPlannerProduct(
    product
  ){

    if(
      !product
      ||
      typeof product.id !==
        "string"
    ){

      return false;

    }


    const match =
      product.id.match(
        /^PRD-(\d+)$/
      );


    if(
      !match
    ){

      return false;

    }


    const productNumber =
      Number(
        match[1]
      );


    return (
      productNumber >=
        GENERAL_PRODUCT_RANGE.minimum
      &&
      productNumber <=
        GENERAL_PRODUCT_RANGE.maximum
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
      recommendationData.enabled ===
      false
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
      isGeneralCropPlannerProduct(
        product
      )
    ){

      return true;

    }


    return false;

  }



  /*
    Convert crop-result data into the standard
    recommendation profile expected by the engine.

    cropData shape:

    {
      cropId: "CROP-SUNFLOWER",
      stage: "planning",
      useCases: [...]
    }
  */

  function getCropProductProfile(
    cropData
  ){

    const source =
      cropData || {};


    return {

      context:
        "crop-planner",


      planners:[

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

        source.stage

          ?

          [
            source.stage
          ]

          :

          [],


      useCases:
        normalizeArray(
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
        normalizeArray(
          source.problems
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
    Score and rank an eligible product collection
    through the shared recommendation engine.
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


    return products
      .map(function(product){

        const scoredProduct =
          global.BCPProductRecommendation
            .scoreProduct(
              product,
              cropProfile
            );


        return {

          product:
            product,

          productId:
            scoredProduct.productId,

          title:
            scoredProduct.title,

          score:
            scoredProduct.score,

          reasons:
            scoredProduct.reasons

        };

      })
      .sort(function(a,b){

        return b.score - a.score;

      });

  }



  /*
    Return ranked crop-product recommendations.

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


    const rankedProducts =
      rankCropProducts(
        eligibleProducts,
        cropProfile
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
    Public API
  */

  namespace.VERSION =
    VERSION;


  namespace.GENERAL_PRODUCT_RANGE =
    GENERAL_PRODUCT_RANGE;


  namespace.normalizeArray =
    normalizeArray;


  namespace.getRecommendationData =
    getRecommendationData;


  namespace.getRecommendedFor =
    getRecommendedFor;


  namespace.getProductCrops =
    getProductCrops;


  namespace.hasExactCropMatch =
    hasExactCropMatch;


  namespace.isGeneralCropPlannerProduct =
    isGeneralCropPlannerProduct;


  namespace.isEligibleCropPlannerProduct =
    isEligibleCropPlannerProduct;


  namespace.getCropProductProfile =
    getCropProductProfile;


  namespace.filterCropPlannerProducts =
    filterCropPlannerProducts;


  namespace.rankCropProducts =
    rankCropProducts;


  namespace.getCropProductRecommendations =
    getCropProductRecommendations;


})(window);