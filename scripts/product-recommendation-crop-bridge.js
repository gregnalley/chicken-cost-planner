"use strict";


(function initializeProductCropBridge(
  global
){


  const namespace =
    global.BCPProductCropBridge =
      global.BCPProductCropBridge ||
      {};


  const VERSION =
    "1.1.0";


  const CROP_PLANNER_PAGE_TYPES =
    Object.freeze([

      "feed-crop-guide",

      "growing-guide"

    ]);



  function normalizeArray(
    value
  ){

    return Array.isArray(value)
      ? value
      : [];

  }



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



  function getRecommendedFor(
    product
  ){

    const data =
      getRecommendationData(
        product
      );


    return data.recommendedFor || {};

  }



  function getProductCrops(
    product
  ){

    const data =
      getRecommendationData(
        product
      );


    const recommendedFor =
      getRecommendedFor(
        product
      );


    return [

      ...normalizeArray(
        data.applicableCrops
      ),

      ...normalizeArray(
        recommendedFor.crops
      )

    ];

  }



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



  function hasCropPlannerPageType(
    product
  ){

    const recommendedFor =
      getRecommendedFor(
        product
      );


    const pageTypes =
      normalizeArray(
        recommendedFor.pageTypes
      );


    return pageTypes.some(function(pageType){

      return CROP_PLANNER_PAGE_TYPES.includes(
        pageType
      );

    });

  }



  function isEligibleCropPlannerProduct(
    product,
    cropProfile
  ){

    if(
      !product
      ||
      !product.recommendationData
    ){

      return false;

    }


    if(
      product.recommendationData.enabled ===
      false
    ){

      return false;

    }


    /*
      Exact crop-specific products always qualify.
    */

    if(
      hasExactCropMatch(
        product,
        cropProfile
      )
    ){

      return true;

    }


    /*
      General crop-planner tools qualify only when
      their page metadata explicitly identifies them
      as Feed Crop Guide or Growing Guide products.

      This prevents unrelated products such as:
      - chicken feeders
      - nesting boxes
      - automatic coop doors
      - brooders
      - first-aid supplies

      from entering the Feed Crop Planner pool merely
      because they were marked universal or assigned
      to multiple planners.
    */

    if(
      hasCropPlannerPageType(
        product
      )
    ){

      return true;

    }


    return false;

  }



  function getCropProductProfile(
    cropData
  ){

    return {

      context:
        "crop-planner",


      applicableCrops:

        cropData &&
        cropData.cropId

          ?

          [
            cropData.cropId
          ]

          :

          [],


      cropStages:

        cropData &&
        cropData.stage

          ?

          [
            cropData.stage
          ]

          :

          [],


      useCases:

        cropData &&
        Array.isArray(
          cropData.useCases
        )

          ?

          cropData.useCases

          :

          [],


      buyerStage:
        "homestead",


      userType:
        "backyard-flock-owner",


      problems:
        []

    };

  }



  function filterCropPlannerProducts(
    products,
    cropProfile
  ){

    if(
      !Array.isArray(products)
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



  function rankCropProducts(
    products,
    cropProfile
  ){

    if(
      !Array.isArray(products)
      ||
      !cropProfile
      ||
      !global.BCPProductRecommendation
    ){

      return [];

    }


    return products
      .map(function(product){

        const scored =
          global.BCPProductRecommendation
            .scoreProduct(
              product,
              cropProfile
            );


        return {

          product:
            product,

          productId:
            scored.productId,

          title:
            scored.title,

          score:
            scored.score,

          reasons:
            scored.reasons

        };

      })
      .sort(function(a,b){

        return b.score - a.score;

      });

  }



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
      typeof limit === "number"
    ){

      return rankedProducts.slice(
        0,
        limit
      );

    }


    return rankedProducts;

  }



  namespace.VERSION =
    VERSION;


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


  namespace.hasCropPlannerPageType =
    hasCropPlannerPageType;


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