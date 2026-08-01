"use strict";

/*
  Backyard Chicken Planner
  Product Recommendation Engine

  Engine Version:
  1.0.0

  Purpose:
  - Read BCP_PRODUCTS
  - Evaluate products against user intent
  - Rank recommendations
  - Provide explanations

  This file contains:
  - Engine namespace
  - Configuration
  - Shared helper functions

*/


(function initializeProductRecommendationEngine(
  global
) {


  const namespace =
    global.BCPProductRecommendation =
      global.BCPProductRecommendation ||
      {};



  const ENGINE_VERSION =
    "1.0.0";



  const DEFAULT_LIMIT =
    5;



  const SCORE_VALUES =
    Object.freeze({


      buyerStageMatch:
        30,


      problemMatch:
        40,


      userMatch:
        20,


      contextMatch:
        25,


      primaryProductRole:
        10,


      supportingProductRole:
        5,


      consumableProductRole:
        5,


      priorityMultiplier:
        0.1


    });



  const PRODUCT_ROLES =
    Object.freeze({


      PRIMARY:
        "primary",


      SUPPORTING:
        "supporting",


      CONSUMABLE:
        "consumable",


      DIY:
        "diy-solution",


      EMERGENCY:
        "emergency",


      UPGRADE:
        "upgrade"


    });



  function getProducts(){

    if(
      !global.BCP_PRODUCTS
    ){

      return {};

    }


    return global.BCP_PRODUCTS;

  }



  function getProductList(){

    const products =
      getProducts();


    return Object
      .keys(products)
      .map(function(productId){

        return products[productId];

      })
      .filter(function(product){

        return Boolean(product);

      });

  }

  function getActiveProducts()
{

  return getProductList()

    .filter(function(product){


      if(
        !product
      ){

        return false;

      }


      if(
        product.recommendationData &&
        product.recommendationData.enabled === false
      ){

        return false;

      }


      return true;


    });

}



  function normalizeArray(
    value
  ){

    if(
      Array.isArray(value)
    ){

      return value;

    }


    return [];

  }



  function hasMatch(
    list,
    value
  ){

    return normalizeArray(list)
      .includes(value);

  }

  function getRecommendationData(
  product
){

  if(
    !product ||
    !product.recommendationData
  ){

    return {};

  }


  return product.recommendationData;

}

function scoreProduct(
  product,
  profile
){

  let score =
    0;


  const reasons =
    [];


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
    Buyer Stage Match
  */

  if(
    hasMatch(
      buyerIntent.buyerStages,
      userProfile.buyerStage
    )
  ){

    score +=
      SCORE_VALUES.buyerStageMatch;


    reasons.push(

      "Matches buyer stage: " +
      userProfile.buyerStage

    );

  }

  /*
  Problem Match
*/


const problems =
  normalizeArray(
    userProfile.problems
  );


const productProblems =
  normalizeArray(
    buyerIntent.commonProblems
  );


problems.forEach(function(problem){


  if(
    hasMatch(
      productProblems,
      problem
    )
  ){

    score +=
      SCORE_VALUES.problemMatch;


    reasons.push(

      "Solves problem: " +
      problem

    );

  }


});

/*
  User Type Match
*/


if(
  hasMatch(
    buyerIntent.idealUsers,
    userProfile.userType
  )
){

  score +=
    SCORE_VALUES.userMatch;


  reasons.push(

    "Matches user type: " +
    userProfile.userType

  );

}

/*
  Recommendation Context Match
*/


if(
  hasMatch(
    recommendationData.recommendationContexts,
    userProfile.context
  )
){

  score +=
    SCORE_VALUES.contextMatch;


  reasons.push(

    "Matches context: " +
    userProfile.context

  );

}

/*
  Product Role Match
*/


switch(
  recommendationData.productRole
){


  case PRODUCT_ROLES.PRIMARY:

    score +=
      SCORE_VALUES.primaryProductRole;


    reasons.push(
      "Primary recommendation"
    );

    break;



  case PRODUCT_ROLES.SUPPORTING:

    score +=
      SCORE_VALUES.supportingProductRole;


    reasons.push(
      "Supporting product"
    );

    break;



  case PRODUCT_ROLES.CONSUMABLE:

    score +=
      SCORE_VALUES.consumableProductRole;


    reasons.push(
      "Consumable product"
    );

    break;


}

const cropMatch =
  scoreCropMatch(
    product,
    profile
  );


score +=
  cropMatch.score;


reasons.push(
  ...cropMatch.reasons
);

/*
  Priority Adjustment
*/


if(
  typeof recommendationData.priority ===
  "number"
){

  score +=
    recommendationData.priority *
    SCORE_VALUES.priorityMultiplier;

}



  return {

    productId:
      product.id,


    title:
      product.title,


    score:
      score,


    reasons:
      reasons

  };

}

function scoreCropMatch(
  product,
  profile
){

  let score =
    0;


  const reasons =
    [];


  if(
    !product
    ||
    !profile
  ){

    return {

      score:
        score,

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

    Supports both:

    Legacy:
    recommendationData.applicableCrops
    recommendationData.cropStages
    recommendationData.useCases

    New:
    recommendationData.recommendedFor.crops
    recommendationData.recommendedFor.cropStages
    recommendationData.recommendedFor.useCases
    recommendationData.recommendedFor.planners
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
    Profile metadata
  */


  const userCrops =
    normalizeArray(
      profile.applicableCrops
    );


  const userStages =
    normalizeArray(
      profile.cropStages
    );


  const userUseCases =
    normalizeArray(
      profile.useCases
    );


  /*
    Exact crop match

    This must be the strongest match so
    crop-specific products outrank generic tools.
  */


  userCrops.forEach(function(crop){


    if(
      productCrops.includes(
        crop
      )
    ){

      score +=
        100;


      reasons.push(

        "Matches crop: " +
        crop

      );

    }


  });


  /*
    Feed Crop Planner match
  */


  if(
    productPlanners.includes(
      "feed-crop-planner"
    )
  ){

    score +=
      25;


    reasons.push(
      "Designed for the Feed Crop Planner"
    );

  }


  /*
    Crop stage match
  */


  userStages.forEach(function(stage){


    if(
      productStages.includes(
        stage
      )
    ){

      score +=
        20;


      reasons.push(

        "Matches crop stage: " +
        stage

      );

    }


  });


  /*
    Use-case match
  */


  userUseCases.forEach(function(useCase){


    if(
      productUseCases.includes(
        useCase
      )
    ){

      score +=
        30;


      reasons.push(

        "Matches use case: " +
        useCase

      );

    }


  });


  return {

    score:
      score,

    reasons:
      reasons

  };


}

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
    typeof limit === "number"
  ){

    return sortedProducts.slice(
      0,
      limit
    );

  }


  return sortedProducts;

}


  namespace.VERSION =
    ENGINE_VERSION;



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


  namespace.SCORE_VALUES =
    SCORE_VALUES;



  namespace.PRODUCT_ROLES =
    PRODUCT_ROLES;



})(window);