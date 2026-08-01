"use strict";


/*
  Backyard Chicken Planner
  Product Recommendation Engine

  Engine Version:
  1.1.0

  Status:
  Stable

  Purpose:
  - Read the shared BCP_PRODUCTS catalog
  - Score products against recommendation profiles
  - Rank products by relevance
  - Explain why each product was recommended
  - Support planners, calculators, and test tools

  Supported recommendation factors:
  - Buyer stage
  - User type
  - Common problems
  - Recommendation context
  - Product role
  - Product priority
  - Planner
  - Crop
  - Crop stage
  - Use case

  Dependencies:
  - window.BCP_PRODUCTS
*/


(function initializeProductRecommendationEngine(
  global
){


  const namespace =
    global.BCPProductRecommendation =
      global.BCPProductRecommendation ||
      {};


  const ENGINE_VERSION =
    "1.1.0";


  const DEFAULT_LIMIT =
    5;



  /*
    Central scoring configuration.

    Recommendation behavior can be tuned here
    without changing the scoring functions.
  */

  const ENGINE_CONFIG =
    Object.freeze({


      scoring:
        Object.freeze({


          buyerStageMatch:
            10,


          problemMatch:
            40,


          userMatch:
            5,


          contextMatch:
            10,


          cropMatch:
            100,


          plannerMatch:
            25,


          cropStageMatch:
            20,


          useCaseMatch:
            30,


          primaryProductRole:
            25,


          supportingProductRole:
            10,


          consumableProductRole:
            10,


          upgradeProductRole:
            5,


          alternativeProductRole:
            3,


          companionProductRole:
            5,


          diagnosticProductRole:
            5,


          diyProductRole:
            3,


          emergencyProductRole:
            3,


          entryLevelProductRole:
            8,


          optionalProductRole:
            -20,


          priorityMultiplier:
            0.1


        })


    });



  /*
    Backward-compatibility alias.

    Keep this available until all existing files and
    test pages have been confirmed to use ENGINE_CONFIG.
  */

  const SCORE_VALUES =
    ENGINE_CONFIG.scoring;



  /*
    Product-role scoring and explanations.

    Adding a new role requires only one new entry here.
  */

  const PRODUCT_ROLE_CONFIG =
    Object.freeze({


      primary:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .primaryProductRole,

          reason:
            "Primary recommendation"

        }),


      supporting:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .supportingProductRole,

          reason:
            "Supporting product"

        }),


      consumable:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .consumableProductRole,

          reason:
            "Consumable product"

        }),


      upgrade:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .upgradeProductRole,

          reason:
            "Optional upgrade"

        }),


      alternative:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .alternativeProductRole,

          reason:
            "Alternative product"

        }),


      companion:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .companionProductRole,

          reason:
            "Companion product"

        }),


      diagnostic:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .diagnosticProductRole,

          reason:
            "Diagnostic product"

        }),


      "diy-solution":
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .diyProductRole,

          reason:
            "DIY solution"

        }),


      emergency:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .emergencyProductRole,

          reason:
            "Emergency product"

        }),


      "entry-level":
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .entryLevelProductRole,

          reason:
            "Entry-level product"

        }),


      optional:
        Object.freeze({

          score:
            ENGINE_CONFIG
              .scoring
              .optionalProductRole,

          reason:
            "Optional product"

        })


    });



  /*
    Return the shared product catalog.
  */

  function getProducts(){

    if(
      !global.BCP_PRODUCTS
    ){

      return {};

    }


    return global.BCP_PRODUCTS;

  }



  /*
    Convert the product catalog object into an array.
  */

  function getProductList(){

    const products =
      getProducts();


    return Object
      .keys(
        products
      )
      .map(function(productId){

        return products[productId];

      })
      .filter(function(product){

        return Boolean(
          product
        );

      });

  }



  /*
    Return products that are currently enabled.

    Products without recommendation metadata remain
    active so legacy catalog records can still load.
  */

  function getActiveProducts(){

    return getProductList()
      .filter(function(product){


        if(
          !product
        ){

          return false;

        }


        if(
          product.recommendationData
          &&
          product.recommendationData.enabled ===
            false
        ){

          return false;

        }


        return true;


      });

  }



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
    Determine whether an array contains a value.
  */

  function hasMatch(
    list,
    value
  ){

    return normalizeArray(
      list
    )
      .includes(
        value
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
    Score one product against a recommendation profile.

    Returns:
    {
      productId,
      title,
      score,
      scoreBreakdown,
      reasons
    }
  */

  function scoreProduct(
    product,
    profile
  ){

    let score =
      0;


    const reasons =
      [];


    const scoreBreakdown = {

      buyerStage:
        0,

      problems:
        0,

      userType:
        0,

      context:
        0,

      productRole:
        0,

      crop:
        0,

      planner:
        0,

      cropStage:
        0,

      useCase:
        0,

      priority:
        0

    };


    const recommendationData =
      getRecommendationData(
        product
      );


    const buyerIntent =
      recommendationData.buyerIntent ||
      {};


    const userProfile =
      profile || {};



    /*
      Buyer-stage match
    */

    if(
      hasMatch(
        buyerIntent.buyerStages,
        userProfile.buyerStage
      )
    ){

      const buyerStageScore =
        ENGINE_CONFIG
          .scoring
          .buyerStageMatch;


      score +=
        buyerStageScore;


      scoreBreakdown.buyerStage +=
        buyerStageScore;


      reasons.push(

        "Matches buyer stage: " +
        userProfile.buyerStage

      );

    }



    /*
      Common-problem matches
    */

    const profileProblems =
      normalizeArray(
        userProfile.problems
      );


    const productProblems =
      normalizeArray(
        buyerIntent.commonProblems
      );


    profileProblems.forEach(function(problem){


      if(
        hasMatch(
          productProblems,
          problem
        )
      ){

        const problemScore =
          ENGINE_CONFIG
            .scoring
            .problemMatch;


        score +=
          problemScore;


        scoreBreakdown.problems +=
          problemScore;


        reasons.push(

          "Solves problem: " +
          problem

        );

      }


    });



    /*
      User-type match
    */

    if(
      hasMatch(
        buyerIntent.idealUsers,
        userProfile.userType
      )
    ){

      const userTypeScore =
        ENGINE_CONFIG
          .scoring
          .userMatch;


      score +=
        userTypeScore;


      scoreBreakdown.userType +=
        userTypeScore;


      reasons.push(

        "Matches user type: " +
        userProfile.userType

      );

    }



    /*
      Recommendation-context match
    */

    if(
      hasMatch(
        recommendationData.recommendationContexts,
        userProfile.context
      )
    ){

      const contextScore =
        ENGINE_CONFIG
          .scoring
          .contextMatch;


      score +=
        contextScore;


      scoreBreakdown.context +=
        contextScore;


      reasons.push(

        "Matches context: " +
        userProfile.context

      );

    }



    /*
      Product-role adjustment
    */

    const roleConfig =
      PRODUCT_ROLE_CONFIG[
        recommendationData.productRole
      ];


    if(
      roleConfig
    ){

      score +=
        roleConfig.score;


      scoreBreakdown.productRole +=
        roleConfig.score;


      reasons.push(
        roleConfig.reason
      );

    }



    /*
      Crop-planner-specific scoring
    */

    const cropMatch =
      scoreCropMatch(
        product,
        userProfile
      );


    score +=
      cropMatch.score;


    reasons.push(
      ...cropMatch.reasons
    );


    scoreBreakdown.crop +=
      cropMatch.scoreBreakdown.crop;


    scoreBreakdown.planner +=
      cropMatch.scoreBreakdown.planner;


    scoreBreakdown.cropStage +=
      cropMatch.scoreBreakdown.cropStage;


    scoreBreakdown.useCase +=
      cropMatch.scoreBreakdown.useCase;



    /*
      Product-priority adjustment
    */

    if(
      typeof recommendationData.priority ===
        "number"
    ){

      const priorityScore =
        recommendationData.priority *
        ENGINE_CONFIG
          .scoring
          .priorityMultiplier;


      score +=
        priorityScore;


      scoreBreakdown.priority +=
        priorityScore;

    }



    return {

      productId:
        product.id,


      title:
        product.title,


      score:
        score,


      scoreBreakdown:
        scoreBreakdown,


      reasons:
        reasons

    };

  }

    /*
    Score crop-specific recommendation factors.

    Returns:
    {
      score,
      scoreBreakdown,
      reasons
    }
  */

  function scoreCropMatch(
    product,
    profile
  ){

    let score =
      0;


    const reasons =
      [];


    const scoreBreakdown = {

      crop:
        0,

      planner:
        0,

      cropStage:
        0,

      useCase:
        0

    };


    if(
      !product
      ||
      !profile
    ){

      return {

        score:
          score,

        scoreBreakdown:
          scoreBreakdown,

        reasons:
          reasons

      };

    }


    const recommendationData =
      getRecommendationData(
        product
      );


    const recommendedFor =
      recommendationData.recommendedFor ||
      {};


    /*
      Product metadata

      Supports both the legacy fields and the
      current recommendedFor structure.
    */

    const productCrops = [

      ...normalizeArray(
        recommendationData.applicableCrops
      ),

      ...normalizeArray(
        recommendedFor.crops
      )

    ];


    const productStages = [

      ...normalizeArray(
        recommendationData.cropStages
      ),

      ...normalizeArray(
        recommendedFor.cropStages
      )

    ];


    const productUseCases = [

      ...normalizeArray(
        recommendationData.useCases
      ),

      ...normalizeArray(
        recommendedFor.useCases
      )

    ];


    const productPlanners =
      normalizeArray(
        recommendedFor.planners
      );


    /*
      Recommendation-profile metadata
    */

    const profileCrops =
      normalizeArray(
        profile.applicableCrops
      );


    const profilePlanners =
      normalizeArray(
        profile.planners
      );


    const profileStages =
      normalizeArray(
        profile.cropStages
      );


    const profileUseCases =
      normalizeArray(
        profile.useCases
      );



    /*
      Exact crop matches

      Crop matching remains the strongest individual
      recommendation factor.
    */

    profileCrops.forEach(function(cropId){


      if(
        productCrops.includes(
          cropId
        )
      ){

        const cropScore =
          ENGINE_CONFIG
            .scoring
            .cropMatch;


        score +=
          cropScore;


        scoreBreakdown.crop +=
          cropScore;


        reasons.push(

          "Matches crop: " +
          cropId

        );

      }


    });



    /*
      Planner matches
    */

    profilePlanners.forEach(function(plannerId){


      if(
        productPlanners.includes(
          plannerId
        )
      ){

        const plannerScore =
          ENGINE_CONFIG
            .scoring
            .plannerMatch;


        score +=
          plannerScore;


        scoreBreakdown.planner +=
          plannerScore;


        reasons.push(

          "Matches planner: " +
          plannerId

        );

      }


    });



    /*
      Crop-stage matches
    */

    profileStages.forEach(function(stage){


      if(
        productStages.includes(
          stage
        )
      ){

        const cropStageScore =
          ENGINE_CONFIG
            .scoring
            .cropStageMatch;


        score +=
          cropStageScore;


        scoreBreakdown.cropStage +=
          cropStageScore;


        reasons.push(

          "Matches crop stage: " +
          stage

        );

      }


    });



    /*
      Use-case matches
    */

    profileUseCases.forEach(function(useCase){


      if(
        productUseCases.includes(
          useCase
        )
      ){

        const useCaseScore =
          ENGINE_CONFIG
            .scoring
            .useCaseMatch;


        score +=
          useCaseScore;


        scoreBreakdown.useCase +=
          useCaseScore;


        reasons.push(

          "Matches use case: " +
          useCase

        );

      }


    });



    return {

      score:
        score,

      scoreBreakdown:
        scoreBreakdown,

      reasons:
        reasons

    };

  }



  /*
    Score and rank all active products.

    Pass a numeric limit to restrict the result count.
  */

  function getRecommendations(
    profile,
    limit
  ){

    const products =
      getActiveProducts();


    const scoredProducts =
      products.map(function(product){

        return scoreProduct(
          product,
          profile
        );

      });


    const sortedProducts =
      scoredProducts.sort(function(a,b){

        return b.score - a.score;

      });


    if(
      typeof limit ===
        "number"
      &&
      limit >= 0
    ){

      return sortedProducts.slice(
        0,
        limit
      );

    }


    return sortedProducts;

  }

    /*
    Public API
  */

  namespace.VERSION =
    ENGINE_VERSION;


  namespace.DEFAULT_LIMIT =
    DEFAULT_LIMIT;


  namespace.ENGINE_CONFIG =
    ENGINE_CONFIG;


  namespace.SCORE_VALUES =
    SCORE_VALUES;


  namespace.PRODUCT_ROLE_CONFIG =
    PRODUCT_ROLE_CONFIG;


  namespace.getProducts =
    getProducts;


  namespace.getProductList =
    getProductList;


  namespace.getActiveProducts =
    getActiveProducts;


  namespace.normalizeArray =
    normalizeArray;


  namespace.hasMatch =
    hasMatch;


  namespace.getRecommendationData =
    getRecommendationData;


  namespace.scoreProduct =
    scoreProduct;


  namespace.scoreCropMatch =
    scoreCropMatch;


  namespace.getRecommendations =
    getRecommendations;


})(window);