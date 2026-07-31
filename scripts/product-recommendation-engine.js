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



  namespace.VERSION =
    ENGINE_VERSION;



  namespace.getProducts =
    getProducts;



  namespace.getProductList =
    getProductList;



  namespace.normalizeArray =
    normalizeArray;



  namespace.hasMatch =
    hasMatch;

  namespace.getRecommendationData =
    getRecommendationData;

  namespace.scoreProduct =
    scoreProduct; 


  namespace.SCORE_VALUES =
    SCORE_VALUES;



  namespace.PRODUCT_ROLES =
    PRODUCT_ROLES;



})(window);