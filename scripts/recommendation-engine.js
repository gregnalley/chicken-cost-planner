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
      ) ||
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

          return {
            productId: productId,
            product: product,
            recommendationData:
              recommendationData
          };
        })
        .filter(function (item) {
          return productMatchesContext(
            item.recommendationData,
            normalizedContext
          );
        })
        .sort(function (first, second) {
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