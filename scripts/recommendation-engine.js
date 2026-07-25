"use strict";

/*
  Backyard Chicken Planner
  Site-Wide Recommendation Engine

  Version: 1.0.0

  Purpose:
  - Read recommendationData from BCP_PRODUCTS
  - Match products to a page, planner, calculator, crop, tag, or audience
  - Sort matching products by priority
  - Return product IDs or full product records

  This file does not render HTML.
  Product rendering remains the responsibility of product-loader.js.
*/

(function initializeRecommendationEngine(global) {
  const ENGINE_VERSION = "1.0.0";

  function normalizeArray(value) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter(function (item) {
        return typeof item === "string";
      })
      .map(function (item) {
        return item.trim().toLowerCase();
      })
      .filter(function (item) {
        return item.length > 0;
      });
  }

  function normalizeSignals(
  value
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(function (signal) {
      return (
        signal &&
        typeof signal ===
          "object"
      );
    })
    .map(function (signal) {
      const type =
        typeof signal.type ===
          "string"
          ? signal.type
              .trim()
              .toLowerCase()
          : "";

      const signalValue =
        typeof signal.value ===
          "string"
          ? signal.value
              .trim()
              .toLowerCase()
          : "";

      const source =
        typeof signal.source ===
          "string"
          ? signal.source
              .trim()
              .toLowerCase()
          : "";

      const weight =
        Number(
          signal.weight
        );

      if (
        !type ||
        !signalValue ||
        !source ||
        !Number.isFinite(
          weight
        )
      ) {
        return null;
      }

      return {
        type:
          type,

        value:
          signalValue,

        weight:
          Math.max(
            0,
            Math.min(
              100,
              weight
            )
          ),

        source:
          source
      };
    })
    .filter(function (signal) {
      return signal !== null;
    });
}

  function hasAnyMatch(productValues, contextValues) {
    if (
      productValues.length === 0 ||
      contextValues.length === 0
    ) {
      return false;
    }

    return productValues.some(function (value) {
      return contextValues.includes(value);
    });
  }

  function getProductRecommendationData(product) {
    if (
      !product ||
      typeof product !== "object" ||
      !product.recommendationData ||
      typeof product.recommendationData !== "object"
    ) {
      return null;
    }

    const recommendationData =
      product.recommendationData;

    const recommendedFor =
      recommendationData.recommendedFor &&
      typeof recommendationData.recommendedFor === "object"
        ? recommendationData.recommendedFor
        : {};

    return {
      recommendedFor: {
        crops: normalizeArray(
          recommendedFor.crops
        ),

        planners: normalizeArray(
          recommendedFor.planners
        ),

        calculators: normalizeArray(
          recommendedFor.calculators
        ),

        pageTypes: normalizeArray(
          recommendedFor.pageTypes
        ),

        tags: normalizeArray(
          recommendedFor.tags
        ),

        audiences: normalizeArray(
          recommendedFor.audiences
        )
      },

      universal:
        recommendationData.universal === true,

      priority:
        Number.isFinite(
          recommendationData.priority
        )
          ? recommendationData.priority
          : 50,

      enabled:
        recommendationData.enabled === true
    };
  }

  function normalizeContext(context) {
    const safeContext =
      context &&
      typeof context === "object"
        ? context
        : {};

    return {
      crops: normalizeArray(
        safeContext.crops
      ),

      planners: normalizeArray(
        safeContext.planners
      ),

      calculators: normalizeArray(
        safeContext.calculators
      ),

      pageTypes: normalizeArray(
        safeContext.pageTypes
      ),

      tags: normalizeArray(
        safeContext.tags
      ),

      audiences: normalizeArray(
        safeContext.audiences
      ),

      signals: normalizeSignals(
        safeContext.signals
      )
    };
  }

  

  function productMatchesContext(
    recommendationData,
    context
  ) {
    if (
      !recommendationData ||
      recommendationData.enabled !== true
    ) {
      return false;
    }

    if (recommendationData.universal === true) {
      return true;
    }

    const recommendedFor =
      recommendationData.recommendedFor;

    return (
      hasAnyMatch(
        recommendedFor.crops,
        context.crops
      ) ||
      hasAnyMatch(
        recommendedFor.planners,
        context.planners
      ) ||
      hasAnyMatch(
        recommendedFor.calculators,
        context.calculators
      ) ||

       hasAnyMatch(
  recommendedFor.pageTypes,
  context.pageTypes
)
      
       ||
      hasAnyMatch(
        recommendedFor.tags,
        context.tags
      ) ||
      hasAnyMatch(
        recommendedFor.audiences,
        context.audiences
      )
    );
  }

  function calculateMatchScore(
  recommendationData,
  context
) {
  if (
    !recommendationData ||
    recommendationData.enabled !== true
  ) {
    return 0;
  }

  let score = 0;

  const recommendedFor =
    recommendationData.recommendedFor;

  if (
    hasAnyMatch(
      recommendedFor.crops,
      context.crops
    )
  ) {
    score += 100;
  }

  if (
    hasAnyMatch(
      recommendedFor.planners,
      context.planners
    )
  ) {
    score += 50;
  }

  if (
    hasAnyMatch(
      recommendedFor.calculators,
      context.calculators
    )
  ) {
    score += 40;
  }

  if (
    hasAnyMatch(
      recommendedFor.pageTypes,
      context.pageTypes
    )
  ) {
    score += 30;
  }

  if (
    hasAnyMatch(
      recommendedFor.tags,
      context.tags
    )
  ) {
    score += 20;
  }

  if (
    hasAnyMatch(
      recommendedFor.audiences,
      context.audiences
    )
  ) {
    score += 10;
  }

  return score;
}

  function calculateSignalScore(
  recommendationData,
  context
) {
  if (
    !recommendationData ||
    recommendationData.enabled !== true ||
    !Array.isArray(
      context.signals
    )
  ) {
    return 0;
  }

  const recommendedFor =
    recommendationData.recommendedFor;

  let signalScore = 0;

  context.signals.forEach(
    function (signal) {
      let productValues = [];

      switch (signal.type) {
        case "crop":
          productValues =
            recommendedFor.crops;
          break;

        case "planner":
          productValues =
            recommendedFor.planners;
          break;

        case "calculator":
          productValues =
            recommendedFor.calculators;
          break;

        case "page-type":
          productValues =
            recommendedFor.pageTypes;
          break;

        case "tag":
          productValues =
            recommendedFor.tags;
          break;

        case "audience":
          productValues =
            recommendedFor.audiences;
          break;

        default:
          return;
      }

      if (
        productValues.includes(
          signal.value
        )
      ) {
        signalScore +=
          signal.weight;
      }
    }
  );

  return signalScore;
}

  function getRecommendations(
    context,
    options
  ) {
    const productDatabase =
      global.BCP_PRODUCTS;

    if (
      !productDatabase ||
      typeof productDatabase !== "object"
    ) {
      console.warn(
        "BCP Recommendation Engine: BCP_PRODUCTS was not found."
      );

      return [];
    }

    const normalizedContext =
      normalizeContext(context);

    const safeOptions =
      options &&
      typeof options === "object"
        ? options
        : {};

    const limit =
      Number.isInteger(safeOptions.limit) &&
      safeOptions.limit > 0
        ? safeOptions.limit
        : null;

    const matches =
      Object.entries(productDatabase)
        .map(function (entry) {
          const productId = entry[0];
          const product = entry[1];

         const recommendationData =
  getProductRecommendationData(
    product
  );

const matchScore =
  calculateMatchScore(
    recommendationData,
    normalizedContext
  );

const signalScore =
  calculateSignalScore(
    recommendationData,
    normalizedContext
  );

const totalScore =
  matchScore +
  signalScore;

return {
  productId:
    productId,

  product:
    product,

  recommendationData:
    recommendationData,

  matchScore:
    matchScore,

  signalScore:
    signalScore,

  totalScore:
    totalScore
};    
   

        })
        .filter(function (item) {
          return productMatchesContext(
            item.recommendationData,
            normalizedContext
          );
        })
        
        .sort(function (
  first,
  second
) {
  if (
    second.totalScore !==
    first.totalScore
  ) {
    return (
      second.totalScore -
      first.totalScore
    );
  }

  return (
    second.recommendationData
      .priority -
    first.recommendationData
      .priority
  );
});

    if (limit !== null) {
      return matches.slice(0, limit);
    }

    return matches;
  }

  function getRecommendationIds(
    context,
    options
  ) {
    return getRecommendations(
      context,
      options
    ).map(function (item) {
      return item.productId;
    });
  }

  global.BCPRecommendationEngine =
    Object.freeze({
      version: ENGINE_VERSION,
      getRecommendations:
        getRecommendations,
      getRecommendationIds:
        getRecommendationIds
    });
})(window);