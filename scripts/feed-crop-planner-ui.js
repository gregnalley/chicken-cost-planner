"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Development User Interface

  UI Version: 2.0.0

  This file powers the private Feed Crop Planner development
  dashboard.

  It is designed for the Version 2 recommendation engine and
  does not depend on legacy engine test functions.

  Primary responsibilities:

  - Confirm that planner components loaded
  - Read the registered crop collection
  - Read configured sample profiles
  - Evaluate every profile through the shared engine
  - Cache internal and public evaluation results
  - Render registration, validation, rankings, and diagnostics
*/


(function initializeFeedCropPlannerUI(
  global
) {

  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};


  /*
    ============================================================
    1. UI CONSTANTS
    ============================================================
  */


  const UI_VERSION =
    "2.0.0";


  const UI_STATUS_CLASSES =
    Object.freeze({

      NEUTRAL:
        "foundation-status",

      SUCCESS:
        "foundation-status foundation-status-success",

      ERROR:
        "foundation-status foundation-status-error"

    });


  const ALLOWED_DEVELOPMENT_STATUSES =
    Object.freeze([
      "testing",
      "ready"
    ]);


  /*
    ============================================================
    2. SHARED UI STATE

    Every sample profile is evaluated only once during dashboard
    initialization. All dashboard sections reuse the cached
    results.
    ============================================================
  */


  const uiState = {

    initialized:
      false,

    initializing:
      false,

    initializedAt:
      null,

    engineHealth:
      null,

    registrationReport:
      null,

    crops:
      [],

    sampleProfiles:
      [],

    profileExpectations:
      {},

    profileRuns:
      [],

    profileRunById:
      new Map(),

    errors:
      [],

    warnings:
      []

  };


  /*
    ============================================================
    3. BASIC DOM HELPERS
    ============================================================
  */


  function getElement(
    id
  ) {

    if (
      typeof id !==
        "string" ||
      !id
    ) {
      return null;
    }

    return document.getElementById(
      id
    );

  }



  function setElementText(
    elementOrId,
    text
  ) {

    const element =
      typeof elementOrId ===
        "string"
        ? getElement(
            elementOrId
          )
        : elementOrId;

    if (
      !element
    ) {
      return;
    }

    element.textContent =
      text ===
        null ||
      text ===
        undefined
        ? ""
        : String(
            text
          );

  }



  function setElementHtml(
    elementOrId,
    html
  ) {

    const element =
      typeof elementOrId ===
        "string"
        ? getElement(
            elementOrId
          )
        : elementOrId;

    if (
      !element
    ) {
      return;
    }

    element.innerHTML =
      typeof html ===
        "string"
        ? html
        : "";

  }



  function setStatus(
    elementOrId,
    text,
    status =
      "neutral"
  ) {

    const element =
      typeof elementOrId ===
        "string"
        ? getElement(
            elementOrId
          )
        : elementOrId;

    if (
      !element
    ) {
      return;
    }

    setElementText(
      element,
      text
    );

    switch (
      status
    ) {

      case "success":

        element.className =
          UI_STATUS_CLASSES
            .SUCCESS;

        break;

      case "error":

        element.className =
          UI_STATUS_CLASSES
            .ERROR;

        break;

      default:

        element.className =
          UI_STATUS_CLASSES
            .NEUTRAL;

    }

  }



  /*
    ============================================================
    4. SAFE TEXT AND HTML HELPERS
    ============================================================
  */


  function normalizeText(
    value
  ) {

    if (
      value ===
        null ||
      value ===
        undefined
    ) {
      return "";
    }

    return String(
      value
    )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  }



  function escapeHtml(
    value
  ) {

    return normalizeText(
      value
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }



  function formatIdentifier(
    value
  ) {

    const normalized =
      normalizeText(
        value
      );

    if (
      !normalized
    ) {
      return "";
    }

    return normalized
      .replace(
        /[_-]+/g,
        " "
      )
      .replace(
        /\b\w/g,
        character =>
          character
            .toUpperCase()
      );

  }



  function formatScore(
    value,
    fallback =
      "N/A"
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return fallback;
    }

    return String(
      Math.round(
        value
      )
    );

  }



  function formatPercent(
    value,
    fallback =
      "N/A"
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return fallback;
    }

    return `${Math.round(
      value
    )}%`;

  }



  /*
    ============================================================
    5. ERROR NORMALIZATION
    ============================================================
  */


  function normalizeUiError(
    error,
    context =
      null
  ) {

    if (
      error &&
      typeof error ===
        "object"
    ) {

      return {

        context,

        name:
          normalizeText(
            error.name
          ) ||
          "Error",

        message:
          normalizeText(
            error.message
          ) ||
          "An unknown error occurred.",

        stack:
          typeof error.stack ===
            "string"
            ? error.stack
            : null,

        original:
          error

      };

    }

    return {

      context,

      name:
        "Error",

      message:
        normalizeText(
          error
        ) ||
        "An unknown error occurred.",

      stack:
        null,

      original:
        error

    };

  }



  function recordUiError(
    error,
    context =
      null
  ) {

    const normalized =
      normalizeUiError(
        error,
        context
      );

    uiState.errors.push(
      normalized
    );

    console.error(
      `[Feed Crop Planner UI${
        context
          ? `: ${context}`
          : ""
      }]`,
      error
    );

    return normalized;

  }



  function recordUiWarning(
    message,
    context =
      null
  ) {

    const warning = {

      context,

      message:
        normalizeText(
          message
        ) ||
        "Unknown warning."

    };

    uiState.warnings.push(
      warning
    );

    console.warn(
      `[Feed Crop Planner UI${
        context
          ? `: ${context}`
          : ""
      }]`,
      warning.message
    );

    return warning;

  }



  /*
    ============================================================
    6. NAMESPACE ACCESSORS
    ============================================================
  */


  function getEngine()
  {

    return namespace.engine &&
      typeof namespace.engine ===
        "object"
        ? namespace.engine
        : null;

  }



  function getDataAdapter()
  {

    return namespace.data &&
      typeof namespace.data ===
        "object"
        ? namespace.data
        : null;

  }



  function getPlannerConfig()
  {

    return namespace.config &&
      typeof namespace.config ===
        "object"
        ? namespace.config
        : null;

  }



  /*
    ============================================================
    7. ENGINE HEALTH
    ============================================================
  */


  function readEngineHealth()
  {

    const engine =
      getEngine();

    if (
      !engine
    ) {

      return {

        healthy:
          false,

        status:
          "missing",

        engineVersion:
          null,

        apiVersion:
          null,

        initialized:
          false,

        registeredFunctionCount:
          0,

        registeredFunctions:
          [],

        missingRequiredFunctions: [
          "engine"
        ],

        missingOptionalFunctions:
          [],

        capabilities:
          {}

      };

    }

    if (
      typeof engine
        .getEngineHealth ===
        "function"
    ) {

      try {

        return engine
          .getEngineHealth();

      } catch (
        error
      ) {

        recordUiError(
          error,
          "Reading engine health"
        );

      }

    }

    const requiredFunctions = [

      "evaluateAllCrops",

      "createPublicCollectionResult"

    ];

    const missingRequiredFunctions =
      requiredFunctions.filter(
        functionName =>
          typeof engine[
            functionName
          ] !==
            "function"
      );

    return {

      healthy:
        missingRequiredFunctions
          .length ===
          0,

      status:
        missingRequiredFunctions
          .length ===
          0
          ? "ready"
          : "incomplete",

      engineVersion:
        engine.version ||
        null,

      apiVersion:
        engine.apiVersion ||
        null,

      initialized:
        engine.initialized ===
          true,

      registeredFunctionCount:
        Object.keys(
          engine
        )
          .filter(
            key =>
              typeof engine[
                key
              ] ===
                "function"
          )
          .length,

      registeredFunctions:
        Object.keys(
          engine
        )
          .filter(
            key =>
              typeof engine[
                key
              ] ===
                "function"
          ),

      missingRequiredFunctions,

      missingOptionalFunctions:
        [],

      capabilities:
        engine.capabilities ||
        {}

    };

  }



  /*
    ============================================================
    8. CROP COLLECTION ACCESS
    ============================================================
  */


  function getRegisteredCrops()
  {

    const dataAdapter =
      getDataAdapter();

    if (
      dataAdapter &&
      typeof dataAdapter
        .getAllUniqueCrops ===
        "function"
    ) {

      try {

        const registeredCrops =
          dataAdapter
            .getAllUniqueCrops();

        if (
          Array.isArray(
            registeredCrops
          )
        ) {

          return registeredCrops
            .filter(
              crop =>
                crop &&
                typeof crop ===
                  "object"
            );

        }

      } catch (
        error
      ) {

        recordUiError(
          error,
          "Reading registered crops"
        );

      }

    }

    if (
      typeof global
        .BCP_FEED_CROPS !==
        "undefined"
    ) {

      const source =
        global.BCP_FEED_CROPS;

      if (
        Array.isArray(
          source
        )
      ) {

        return source.filter(
          crop =>
            crop &&
            typeof crop ===
              "object"
        );

      }

      if (
        source instanceof
          Map
      ) {

        return Array.from(
          source.values()
        )
          .filter(
            crop =>
              crop &&
              typeof crop ===
                "object"
          );

      }

      if (
        source &&
        typeof source ===
          "object"
      ) {

        return Object.values(
          source
        )
          .filter(
            crop =>
              crop &&
              typeof crop ===
                "object"
          );

      }

    }

    return [];

  }



  function getCropId(
    crop
  ) {

    if (
      !crop ||
      typeof crop !==
        "object"
    ) {
      return null;
    }

    return (
      crop.id ||
      crop.cropId ||
      crop.identity
        ?.id ||
      crop.plannerData
        ?.identity
        ?.id ||
      null
    );

  }



  function getCropName(
    crop
  ) {

    if (
      !crop ||
      typeof crop !==
        "object"
    ) {
      return "Unknown Crop";
    }

    return (
      crop.name ||
      crop.commonName ||
      crop.identity
        ?.commonName ||
      crop.plannerData
        ?.identity
        ?.commonName ||
      getCropId(
        crop
      ) ||
      "Unknown Crop"
    );

  }



  function getCropDevelopmentStatus(
    crop
  ) {

    return (
      crop?.plannerData
        ?.developmentStatus ||
      crop?.developmentStatus ||
      crop?.templateMetadata
        ?.developmentStatus ||
      crop?.plannerData
        ?.templateMetadata
        ?.developmentStatus ||
      null
    );

  }



  function isCropAllowedForTesting(
    crop
  ) {

    const status =
      getCropDevelopmentStatus(
        crop
      );

    if (
      !status
    ) {

      /*
        Version 2 records may rely on schema validity instead of
        the former developmentStatus field. Do not silently
        exclude those records from engine testing.
      */

      return true;

    }

    return ALLOWED_DEVELOPMENT_STATUSES
      .includes(
        status
      );

  }



  /*
    ============================================================
    9. SAMPLE PROFILE ACCESS
    ============================================================
  */


  function getSampleProfiles()
  {

    const config =
      getPlannerConfig();

    const profiles =
      config
        ?.testing
        ?.sampleUserProfiles;

    return Array.isArray(
      profiles
    )
      ? profiles.filter(
          profile =>
            profile &&
            typeof profile ===
              "object"
        )
      : [];

  }



  function getProfileExpectations()
  {

    const config =
      getPlannerConfig();

    const expectations =
      config
        ?.testing
        ?.profileMatrixExpectations;

    return expectations &&
      typeof expectations ===
        "object" &&
      !Array.isArray(
        expectations
      )
        ? expectations
        : {};

  }



  function getProfileId(
    profile,
    index =
      null
  ) {

    return (
      profile?.id ||
      (
        Number.isInteger(
          index
        )
          ? `sample-profile-${index + 1}`
          : null
      )
    );

  }



  function getProfileLabel(
    profile,
    index =
      null
  ) {

    return (
      profile?.label ||
      profile?.name ||
      (
        Number.isInteger(
          index
        )
          ? `Sample Profile ${index + 1}`
          : "Sample Profile"
      )
    );

  }



  function getProfileAnswers(
    profile
  ) {

    if (
      profile?.answers &&
      typeof profile.answers ===
        "object"
    ) {
      return profile.answers;
    }

    return {};

  }



  /*
    ============================================================
    10. EVALUATION RESULT ACCESSORS
    ============================================================
  */


  function getAllEvaluationsFromResult(
    collectionResult
  ) {

    if (
      !collectionResult ||
      typeof collectionResult !==
        "object"
    ) {
      return [];
    }

    if (
      Array.isArray(
        collectionResult
          .evaluations
      )
    ) {

      return collectionResult
        .evaluations;

    }

    const ranked =
      Array.isArray(
        collectionResult
          .rankedEvaluations
      )
        ? collectionResult
            .rankedEvaluations
        : [];

    const unranked =
      Array.isArray(
        collectionResult
          .unrankedEvaluations
      )
        ? collectionResult
            .unrankedEvaluations
        : [];

    return [
      ...ranked,
      ...unranked
    ];

  }



  function getRankedEvaluationsFromResult(
    collectionResult
  ) {

    if (
      !collectionResult ||
      typeof collectionResult !==
        "object"
    ) {
      return [];
    }

    if (
      Array.isArray(
        collectionResult
          .rankedEvaluations
      )
    ) {

      return collectionResult
        .rankedEvaluations;

    }

    return getAllEvaluationsFromResult(
      collectionResult
    )
      .filter(
        evaluation =>
          Number.isFinite(
            evaluation?.final
              ?.rank
          )
      )
      .slice()
      .sort(
        (
          first,
          second
        ) =>
          (
            first?.final
              ?.rank ??
            Number.POSITIVE_INFINITY
          ) -
          (
            second?.final
              ?.rank ??
            Number.POSITIVE_INFINITY
          )
      );

  }



  function getEvaluationCropId(
    evaluation
  ) {

    return (
      evaluation?.cropId ||
      evaluation?.crop?.id ||
      evaluation?.metadata
        ?.cropId ||
      evaluation?.pipeline
        ?.cropId ||
      evaluation?.explanation
        ?.metadata
        ?.cropIdentity
        ?.id ||
      null
    );

  }



  function getEvaluationCropName(
    evaluation
  ) {

    return (
      evaluation?.cropName ||
      evaluation?.crop?.name ||
      evaluation?.explanation
        ?.metadata
        ?.cropIdentity
        ?.commonName ||
      evaluation?.pipeline
        ?.cropName ||
      getEvaluationCropId(
        evaluation
      ) ||
      "Unknown Crop"
    );

  }



  function getEvaluationFinalScore(
    evaluation
  ) {

    const possibleValues = [

      evaluation?.final
        ?.score,

      evaluation?.final
        ?.suitabilityScore,

      evaluation?.score,

      evaluation?.finalScore

    ];

    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function getEvaluationRank(
    evaluation
  ) {

    return Number.isFinite(
      evaluation?.final
        ?.rank
    )
      ? evaluation.final.rank
      : null;

  }



  function getEvaluationBestUsePath(
    evaluation
  ) {

    return (
      evaluation?.usePaths
        ?.bestPath ||
      evaluation?.final
        ?.bestUsePath ||
      null
    );

  }



  function getEvaluationStatus(
    evaluation
  ) {

    return (
      evaluation?.final
        ?.recommendationStatus ||
      evaluation?.pipeline
        ?.status ||
      "unscored"
    );

  }



  /*
    ============================================================
    11. PROFILE ENGINE EXECUTION
    ============================================================
  */


  function evaluateSampleProfile(
    profile,
    index
  ) {

    const engine =
      getEngine();

    const profileId =
      getProfileId(
        profile,
        index
      );

    const profileLabel =
      getProfileLabel(
        profile,
        index
      );

    const answers =
      getProfileAnswers(
        profile
      );

    if (
      !engine ||
      typeof engine
        .evaluateAllCrops !==
        "function"
    ) {

      return {

        success:
          false,

        profileId,

        profileLabel,

        profile,

        answers,

        internalResult:
          null,

        publicResult:
          null,

        evaluations:
          [],

        rankedEvaluations:
          [],

        error:
          normalizeUiError(
            "The collection evaluation API is unavailable.",
            profileId
          )

      };

    }

    try {

      const internalResult =
        engine.evaluateAllCrops(
          uiState.crops,
          answers
        );

      const evaluations =
        getAllEvaluationsFromResult(
          internalResult
        );

      const rankedEvaluations =
        getRankedEvaluationsFromResult(
          internalResult
        );

      let publicResult =
        null;

      if (
        typeof engine
          .createPublicCollectionResult ===
          "function"
      ) {

        publicResult =
          engine
            .createPublicCollectionResult(
              internalResult,
              {
                includeDiagnostics:
                  true,

                includeInternalScores:
                  true,

                includeFailedResults:
                  true,

                includeRejectedResults:
                  true,

                includeUnrankedResults:
                  true,

                topRecommendationLimit:
                  5
              }
            );

      }

      return {

        success:
          Boolean(
            internalResult
          ),

        profileId,

        profileLabel,

        profile,

        answers,

        internalResult,

        publicResult,

        evaluations,

        rankedEvaluations,

        leader:
          rankedEvaluations[0] ||
          null,

        error:
          null

      };

    } catch (
      error
    ) {

      const normalizedError =
        recordUiError(
          error,
          `Evaluating ${profileLabel}`
        );

      return {

        success:
          false,

        profileId,

        profileLabel,

        profile,

        answers,

        internalResult:
          null,

        publicResult:
          null,

        evaluations:
          [],

        rankedEvaluations:
          [],

        leader:
          null,

        error:
          normalizedError

      };

    }

  }



  function evaluateAllSampleProfiles()
  {

    uiState.profileRuns =
      uiState.sampleProfiles
        .map(
          (
            profile,
            index
          ) =>
            evaluateSampleProfile(
              profile,
              index
            )
        );

    uiState.profileRunById =
      new Map(
        uiState.profileRuns
          .map(
            profileRun => [
              profileRun.profileId,
              profileRun
            ]
          )
      );

    return uiState.profileRuns;

  }



  /*
    ============================================================
    12. DASHBOARD FOUNDATION STATUS
    ============================================================
  */


  function createFoundationChecks()
  {

    const config =
      getPlannerConfig();

    const dataAdapter =
      getDataAdapter();

    const engine =
      getEngine();

    const health =
      uiState.engineHealth ||
      {};

    return [

      {
        id:
          "namespace",

        label:
          "Planner namespace created",

        passed:
          Boolean(
            namespace
          )
      },

      {
        id:
          "config",

        label:
          "Planner configuration loaded",

        passed:
          Boolean(
            config
          )
      },

      {
        id:
          "data-adapter",

        label:
          "Planner data adapter loaded",

        passed:
          Boolean(
            dataAdapter
          )
      },

      {
        id:
          "crop-registration",

        label:
          "Feed crop collection registered",

        passed:
          uiState.crops.length >
          0
      },

      {
        id:
          "engine",

        label:
          "Version 2 recommendation engine loaded",

        passed:
          Boolean(
            engine
          )
      },

      {
        id:
          "engine-health",

        label:
          "Recommendation engine health check passed",

        passed:
          health.healthy ===
          true
      },

      {
        id:
          "collection-api",

        label:
          "Collection evaluation API available",

        passed:
          typeof engine
            ?.evaluateAllCrops ===
          "function"
      },

      {
        id:
          "public-results",

        label:
          "Public result shaping API available",

        passed:
          typeof engine
            ?.createPublicCollectionResult ===
          "function"
      },

      {
        id:
          "sample-profiles",

        label:
          "Sample regression profiles loaded",

        passed:
          uiState.sampleProfiles
            .length >
          0
      }

    ];

  }



  function renderFoundationStatus()
  {

    const checks =
      createFoundationChecks();

    const ready =
      checks.every(
        check =>
          check.passed
      );

    setStatus(
      "planner-foundation-status",
      ready
        ? "Planner development foundation loaded successfully."
        : "Planner foundation has one or more problems.",
      ready
        ? "success"
        : "error"
    );

    setElementHtml(
      "planner-foundation-details",
      checks
        .map(
          check => `
            <li>
              ${
                check.passed
                  ? "✅"
                  : "❌"
              }
              ${escapeHtml(
                check.label
              )}
            </li>
          `
        )
        .join(
          ""
        )
    );

    const config =
      getPlannerConfig();

    setElementText(
      "planner-version",
      config
        ?.plannerVersion ||
      uiState.engineHealth
        ?.engineVersion ||
      "Unavailable"
    );

    setElementText(
      "planner-schema-version",
      config
        ?.cropSchemaVersion ||
      config
        ?.schemaVersion ||
      "Unavailable"
    );

  }



  /*
    ============================================================
    13. INITIALIZATION

    Functions called below are defined in the remaining UI parts.
    Function declarations are hoisted when the completed file is
    loaded.
    ============================================================
  */


  function initializeDevelopmentPage()
  {

    if (
      uiState.initializing ||
      uiState.initialized
    ) {

      return uiState;

    }

    uiState.initializing =
      true;

    try {

      uiState.engineHealth =
        readEngineHealth();

      uiState.crops =
        getRegisteredCrops();

      uiState.sampleProfiles =
        getSampleProfiles();

      uiState.profileExpectations =
        getProfileExpectations();

      const dataAdapter =
        getDataAdapter();

      if (
        dataAdapter &&
        typeof dataAdapter
          .getRegistrationReport ===
          "function"
      ) {

        try {

          uiState.registrationReport =
            dataAdapter
              .getRegistrationReport();

        } catch (
          error
        ) {

          recordUiError(
            error,
            "Reading crop registration report"
          );

        }

      }

      renderFoundationStatus();

      renderCropRegistrationReport();

      renderCropValidationReport();

      renderSampleProfileList();

      evaluateAllSampleProfiles();

      renderProfileMatrix();

      renderMultiCropSampleTests();

      renderSunflowerSampleTests();

      uiState.initialized =
        true;

      uiState.initializedAt =
        new Date()
          .toISOString();

    } catch (
      error
    ) {

      recordUiError(
        error,
        "Dashboard initialization"
      );

      setStatus(
        "planner-foundation-status",
        "The development dashboard could not finish initializing.",
        "error"
      );

    } finally {

      uiState.initializing =
        false;

    }

    return uiState;

  }

    /*
    ============================================================
    14. VERSION 2 CROP SCHEMA REQUIREMENTS

    Barley Version 2.0.0 is the canonical crop-record structure.

    These checks confirm that each crop contains the major
    sections needed by the recommendation engine. They do not
    attempt to prove that every research value is complete.
    Unknown research-backed values may correctly remain null.
    ============================================================
  */


  const REQUIRED_CROP_SECTIONS =
    Object.freeze([

      "identity",

      "lifecycle",

      "climate",

      "site",

      "soil",

      "water",

      "space",

      "flock",

      "labor",

      "cost",

      "goals",

      "risks",

      "seasonalRoles",

      "usePaths",

      "dataQuality",

      "templateMetadata"

    ]);


  const REQUIRED_RISK_FIELDS =
    Object.freeze([

      "wildlifePressureScore",

      "birdLossRiskScore",

      "deerBrowsingRiskScore",

      "rabbitBrowsingRiskScore",

      "stormDamageRiskScore",

      "shatteringRiskScore",

      "postHarvestLossRiskScore",

      "storagePestRiskScore",

      "rodentAttractionScore",

      "mechanicalHarvestSuitabilityScore",

      "mechanicalProcessingSuitabilityScore"

    ]);


  const REQUIRED_USE_PATH_FIELDS =
    Object.freeze([

      "id",

      "label",

      "description",

      "expectedProcessingTimeLevel",

      "estimatedProcessingMinutesPerPound",

      "expectedWasteLevel",

      "estimatedWastePercent",

      "storageEfficiencyScore",

      "processingEfficiencyScore",

      "feedMeasurementPrecisionScore",

      "preservationFlexibilityScore"

    ]);


  /*
    ============================================================
    15. CROP RECORD ACCESSORS
    ============================================================
  */


  function getCropPlannerRecord(
    crop
  ) {

    if (
      !crop ||
      typeof crop !==
        "object"
    ) {
      return null;
    }

    if (
      crop.plannerData &&
      typeof crop.plannerData ===
        "object"
    ) {

      return crop.plannerData;

    }

    /*
      Some Version 2 collections may store the canonical schema
      directly on the crop object.
    */

    return crop;

  }



  function getCropTemplateMetadata(
    crop
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    return record
      ?.templateMetadata &&
      typeof record
        .templateMetadata ===
        "object"
        ? record.templateMetadata
        : null;

  }



  function getCropSchemaVersion(
    crop
  ) {

    const metadata =
      getCropTemplateMetadata(
        crop
      );

    return (
      metadata
        ?.schemaVersion ||
      metadata
        ?.templateVersion ||
      metadata
        ?.version ||
      null
    );

  }



  function getCropUsePaths(
    crop
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    const usePaths =
      record?.usePaths;

    if (
      Array.isArray(
        usePaths
      )
    ) {

      return usePaths;

    }

    if (
      usePaths &&
      typeof usePaths ===
        "object"
    ) {

      return Object.values(
        usePaths
      )
        .filter(
          usePath =>
            usePath &&
            typeof usePath ===
              "object"
        );

    }

    return [];

  }



  function getCropSeasonalRoles(
    crop
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    const seasonalRoles =
      record?.seasonalRoles;

    if (
      Array.isArray(
        seasonalRoles
      )
    ) {

      return seasonalRoles;

    }

    if (
      seasonalRoles &&
      typeof seasonalRoles ===
        "object"
    ) {

      return Object.values(
        seasonalRoles
      );

    }

    return [];

  }



  /*
    ============================================================
    16. GENERIC VALIDATION HELPERS
    ============================================================
  */


  function isPlainObject(
    value
  ) {

    return Boolean(
      value &&
      typeof value ===
        "object" &&
      !Array.isArray(
        value
      )
    );

  }



  function hasOwnField(
    object,
    fieldName
  ) {

    return Boolean(
      object &&
      Object.prototype
        .hasOwnProperty
        .call(
          object,
          fieldName
        )
    );

  }



  function createCropValidationMessage(
    type,
    code,
    message,
    path =
      null
  ) {

    return {

      type,

      code,

      message:
        normalizeText(
          message
        ),

      path:
        normalizeText(
          path
        ) ||
        null

    };

  }



  function addCropValidationError(
    validation,
    code,
    message,
    path =
      null
  ) {

    validation.errors.push(
      createCropValidationMessage(
        "error",
        code,
        message,
        path
      )
    );

  }



  function addCropValidationWarning(
    validation,
    code,
    message,
    path =
      null
  ) {

    validation.warnings.push(
      createCropValidationMessage(
        "warning",
        code,
        message,
        path
      )
    );

  }



  /*
    ============================================================
    17. SECTION VALIDATION
    ============================================================
  */


  function validateRequiredCropSections(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    if (
      !record
    ) {

      addCropValidationError(
        validation,
        "MISSING_PLANNER_RECORD",
        "The crop does not contain a planner record.",
        "plannerData"
      );

      return;

    }

    REQUIRED_CROP_SECTIONS
      .forEach(
        sectionName => {

          if (
            !hasOwnField(
              record,
              sectionName
            )
          ) {

            addCropValidationError(
              validation,
              "MISSING_REQUIRED_SECTION",
              `Required section "${sectionName}" is missing.`,
              sectionName
            );

            return;

          }

          const sectionValue =
            record[
              sectionName
            ];

          if (
            sectionValue ===
              undefined
          ) {

            addCropValidationError(
              validation,
              "UNDEFINED_REQUIRED_SECTION",
              `Required section "${sectionName}" is undefined.`,
              sectionName
            );

          }

        }
      );

  }



  /*
    ============================================================
    18. IDENTITY VALIDATION
    ============================================================
  */


  function validateCropIdentity(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    const identity =
      record?.identity;

    if (
      !isPlainObject(
        identity
      )
    ) {

      addCropValidationError(
        validation,
        "INVALID_IDENTITY_SECTION",
        "The identity section must be an object.",
        "identity"
      );

      return;

    }

    const cropId =
      getCropId(
        crop
      );

    if (
      !normalizeText(
        cropId
      )
    ) {

      addCropValidationError(
        validation,
        "MISSING_CROP_ID",
        "The crop is missing a usable crop ID.",
        "identity.id"
      );

    }

    const cropName =
      getCropName(
        crop
      );

    if (
      !normalizeText(
        cropName
      ) ||
      cropName ===
        "Unknown Crop"
    ) {

      addCropValidationError(
        validation,
        "MISSING_CROP_NAME",
        "The crop is missing a usable common name.",
        "identity.commonName"
      );

    }

    if (
      identity.scientificName ===
        undefined
    ) {

      addCropValidationWarning(
        validation,
        "SCIENTIFIC_NAME_UNDEFINED",
        "Scientific name is undefined. Use null when it has not been verified.",
        "identity.scientificName"
      );

    }

  }



  /*
    ============================================================
    19. RISK VALIDATION
    ============================================================
  */


  function validateCropRisks(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    const risks =
      record?.risks;

    if (
      !isPlainObject(
        risks
      )
    ) {

      addCropValidationError(
        validation,
        "INVALID_RISKS_SECTION",
        "The risks section must be an object.",
        "risks"
      );

      return;

    }

    REQUIRED_RISK_FIELDS
      .forEach(
        fieldName => {

          if (
            !hasOwnField(
              risks,
              fieldName
            )
          ) {

            addCropValidationError(
              validation,
              "MISSING_REQUIRED_RISK_FIELD",
              `Required risk field "${fieldName}" is missing.`,
              `risks.${fieldName}`
            );

            return;

          }

          const value =
            risks[
              fieldName
            ];

          if (
            value !==
              null &&
            !Number.isFinite(
              value
            )
          ) {

            addCropValidationWarning(
              validation,
              "INVALID_RISK_SCORE",
              `Risk field "${fieldName}" should contain a finite number or null.`,
              `risks.${fieldName}`
            );

          }

        }
      );

  }



  /*
    ============================================================
    20. SEASONAL ROLE VALIDATION
    ============================================================
  */


    function validateCropSeasonalRoles(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    if (
      !hasOwnField(
        record,
        "seasonalRoles"
      )
    ) {

      return;

    }


    const seasonalRoles =
      record?.seasonalRoles;


    if (
      Array.isArray(
        seasonalRoles
      )
    ) {

      if (
        seasonalRoles.length ===
          0
      ) {

        addCropValidationWarning(
          validation,
          "EMPTY_SEASONAL_ROLES",
          "The crop contains no defined seasonal roles.",
          "seasonalRoles"
        );

        return;

      }


      seasonalRoles.forEach(
        (
          seasonalRole,
          index
        ) => {

          if (
            seasonalRole ===
              null ||
            seasonalRole ===
              undefined
          ) {

            addCropValidationWarning(
              validation,
              "EMPTY_SEASONAL_ROLE",
              `Seasonal role ${index + 1} is empty.`,
              `seasonalRoles[${index}]`
            );

            return;

          }


          if (
            typeof seasonalRole ===
              "object" &&
            !Array.isArray(
              seasonalRole
            ) &&
            !normalizeText(
              seasonalRole.id
            ) &&
            !normalizeText(
              seasonalRole.label
            )
          ) {

            addCropValidationWarning(
              validation,
              "UNIDENTIFIED_SEASONAL_ROLE",
              `Seasonal role ${index + 1} has no ID or label.`,
              `seasonalRoles[${index}]`
            );

          }

        }
      );

      return;

    }


    if (
      !isPlainObject(
        seasonalRoles
      )
    ) {

      addCropValidationError(
        validation,
        "INVALID_SEASONAL_ROLES",
        "The seasonalRoles section must be an object or array.",
        "seasonalRoles"
      );

      return;

    }


    const seasonNames = [

      "spring",

      "summer",

      "autumn",

      "winter"

    ];


    const populatedSeasons =
      seasonNames.filter(
        seasonName =>
          Array.isArray(
            seasonalRoles[
              seasonName
            ]
          ) &&
          seasonalRoles[
            seasonName
          ].length >
            0
      );


    if (
      populatedSeasons.length ===
        0
    ) {

      addCropValidationWarning(
        validation,
        "EMPTY_SEASONAL_ROLES",
        "The crop contains no populated seasonal-role arrays.",
        "seasonalRoles"
      );

    }


    seasonNames.forEach(
      seasonName => {

        if (
          !hasOwnField(
            seasonalRoles,
            seasonName
          )
        ) {

          addCropValidationWarning(
            validation,
            "MISSING_SEASONAL_ROLE_PERIOD",
            `The seasonalRoles section is missing "${seasonName}".`,
            `seasonalRoles.${seasonName}`
          );

          return;

        }


        const activities =
          seasonalRoles[
            seasonName
          ];


        if (
          !Array.isArray(
            activities
          )
        ) {

          addCropValidationWarning(
            validation,
            "INVALID_SEASONAL_ROLE_PERIOD",
            `The "${seasonName}" seasonal role must be an array.`,
            `seasonalRoles.${seasonName}`
          );

          return;

        }


        activities.forEach(
          (
            activity,
            index
          ) => {

            if (
              !normalizeText(
                activity
              )
            ) {

              addCropValidationWarning(
                validation,
                "EMPTY_SEASONAL_ACTIVITY",
                `The "${seasonName}" seasonal role contains an empty activity.`,
                `seasonalRoles.${seasonName}[${index}]`
              );

            }

          }
        );

      }
    );


    if (
      hasOwnField(
        seasonalRoles,
        "plannerSeasonScores"
      ) &&
      !isPlainObject(
        seasonalRoles
          .plannerSeasonScores
      )
    ) {

      addCropValidationWarning(
        validation,
        "INVALID_SEASONAL_SCORE_SECTION",
        "plannerSeasonScores should be an object.",
        "seasonalRoles.plannerSeasonScores"
      );

    }


    if (
      hasOwnField(
        seasonalRoles,
        "directFacts"
      ) &&
      !isPlainObject(
        seasonalRoles
          .directFacts
      )
    ) {

      addCropValidationWarning(
        validation,
        "INVALID_SEASONAL_DIRECT_FACTS",
        "Seasonal directFacts should be an object.",
        "seasonalRoles.directFacts"
      );

    }

  }



  /*
    ============================================================
    21. USE-PATH VALIDATION
    ============================================================
  */


  function validateCropUsePaths(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    if (
      !hasOwnField(
        record,
        "usePaths"
      )
    ) {

      return;

    }

    const usePaths =
      getCropUsePaths(
        crop
      );

    if (
      usePaths.length ===
        0
    ) {

      addCropValidationError(
        validation,
        "NO_USE_PATHS",
        "The crop does not contain any usable use-path records.",
        "usePaths"
      );

      return;

    }

    const knownUsePathIds =
      new Set();


    usePaths.forEach(
      (
        usePath,
        index
      ) => {

        const basePath =
          `usePaths[${index}]`;

        if (
          !isPlainObject(
            usePath
          )
        ) {

          addCropValidationError(
            validation,
            "INVALID_USE_PATH",
            `Use path ${index + 1} must be an object.`,
            basePath
          );

          return;

        }

        REQUIRED_USE_PATH_FIELDS
          .forEach(
            fieldName => {

              if (
                !hasOwnField(
                  usePath,
                  fieldName
                )
              ) {

                addCropValidationError(
                  validation,
                  "MISSING_USE_PATH_FIELD",
                  `Use path ${index + 1} is missing "${fieldName}".`,
                  `${basePath}.${fieldName}`
                );

              }

            }
          );


        const usePathId =
          normalizeText(
            usePath.id
          );

        if (
          usePathId
        ) {

          if (
            knownUsePathIds.has(
              usePathId
            )
          ) {

            addCropValidationError(
              validation,
              "DUPLICATE_USE_PATH_ID",
              `Use-path ID "${usePathId}" appears more than once.`,
              `${basePath}.id`
            );

          } else {

            knownUsePathIds.add(
              usePathId
            );

          }

        }


        [
          "estimatedProcessingMinutesPerPound",
          "estimatedWastePercent",
          "storageEfficiencyScore",
          "processingEfficiencyScore",
          "feedMeasurementPrecisionScore",
          "preservationFlexibilityScore"
        ]
          .forEach(
            fieldName => {

              const value =
                usePath[
                  fieldName
                ];

              if (
                value !==
                  null &&
                value !==
                  undefined &&
                !Number.isFinite(
                  value
                )
              ) {

                addCropValidationWarning(
                  validation,
                  "INVALID_USE_PATH_NUMBER",
                  `Use-path field "${fieldName}" should contain a finite number or null.`,
                  `${basePath}.${fieldName}`
                );

              }

            }
          );

      }
    );

  }



  /*
    ============================================================
    22. TEMPLATE METADATA VALIDATION
    ============================================================
  */


  function validateCropTemplateMetadata(
    crop,
    validation
  ) {

    const metadata =
      getCropTemplateMetadata(
        crop
      );

    if (
      !metadata
    ) {

      addCropValidationError(
        validation,
        "INVALID_TEMPLATE_METADATA",
        "The templateMetadata section must be an object.",
        "templateMetadata"
      );

      return;

    }

    const schemaVersion =
      getCropSchemaVersion(
        crop
      );

    if (
      !schemaVersion
    ) {

      addCropValidationWarning(
        validation,
        "MISSING_SCHEMA_VERSION",
        "No crop schema or template version was found.",
        "templateMetadata.schemaVersion"
      );

    }

    const developmentStatus =
      getCropDevelopmentStatus(
        crop
      );

    if (
      developmentStatus &&
      !ALLOWED_DEVELOPMENT_STATUSES
        .includes(
          developmentStatus
        )
    ) {

      addCropValidationWarning(
        validation,
        "CROP_NOT_ENABLED_FOR_TESTING",
        `Development status "${developmentStatus}" does not normally participate in recommendation testing.`,
        "templateMetadata.developmentStatus"
      );

    }

  }



  /*
    ============================================================
    23. UNDEFINED-VALUE INSPECTION

    Research values may be null. Undefined usually indicates an
    accidental omission or misspelled property.
    ============================================================
  */


  function findUndefinedValues(
    value,
    path,
    results,
    visited
  ) {

    if (
      value ===
        undefined
    ) {

      results.push(
        path ||
        "(root)"
      );

      return;

    }

    if (
      value ===
        null ||
      typeof value !==
        "object"
    ) {
      return;
    }

    if (
      visited.has(
        value
      )
    ) {
      return;
    }

    visited.add(
      value
    );


    if (
      Array.isArray(
        value
      )
    ) {

      value.forEach(
        (
          item,
          index
        ) => {

          findUndefinedValues(
            item,
            `${path}[${index}]`,
            results,
            visited
          );

        }
      );

      return;

    }


    Object.keys(
      value
    )
      .forEach(
        key => {

          const nextPath =
            path
              ? `${path}.${key}`
              : key;

          findUndefinedValues(
            value[
              key
            ],
            nextPath,
            results,
            visited
          );

        }
      );

  }



  function validateUndefinedCropValues(
    crop,
    validation
  ) {

    const record =
      getCropPlannerRecord(
        crop
      );

    if (
      !record
    ) {
      return;
    }

    const undefinedPaths =
      [];

    findUndefinedValues(
      record,
      "",
      undefinedPaths,
      new WeakSet()
    );

    undefinedPaths
      .slice(
        0,
        25
      )
      .forEach(
        path => {

          addCropValidationWarning(
            validation,
            "UNDEFINED_CROP_VALUE",
            `The value at "${path}" is undefined. Use null for unknown research values.`,
            path
          );

        }
      );

    if (
      undefinedPaths.length >
        25
    ) {

      addCropValidationWarning(
        validation,
        "ADDITIONAL_UNDEFINED_VALUES",
        `${undefinedPaths.length - 25} additional undefined values were not individually listed.`,
        null
      );

    }

  }



  /*
    ============================================================
    24. SINGLE-CROP VALIDATION
    ============================================================
  */


  function validateCropRecord(
    crop,
    index
  ) {

    const validation = {

      crop,

      sourceIndex:
        index,

      cropId:
        getCropId(
          crop
        ),

      cropName:
        getCropName(
          crop
        ),

      schemaVersion:
        getCropSchemaVersion(
          crop
        ),

      developmentStatus:
        getCropDevelopmentStatus(
          crop
        ),

      allowedForTesting:
        isCropAllowedForTesting(
          crop
        ),

      errors:
        [],

      warnings:
        [],

      valid:
        false,

      plannerReady:
        false

    };


    validateRequiredCropSections(
      crop,
      validation
    );

    validateCropIdentity(
      crop,
      validation
    );

    validateCropRisks(
      crop,
      validation
    );

    validateCropSeasonalRoles(
      crop,
      validation
    );

    validateCropUsePaths(
      crop,
      validation
    );

    validateCropTemplateMetadata(
      crop,
      validation
    );

    validateUndefinedCropValues(
      crop,
      validation
    );


    validation.valid =
      validation.errors
        .length ===
      0;

    validation.plannerReady =
      validation.valid &&
      validation.allowedForTesting;

    return validation;

  }



  function validateAllCropRecords()
  {

    return uiState.crops
      .map(
        (
          crop,
          index
        ) =>
          validateCropRecord(
            crop,
            index
          )
      );

  }



  /*
    ============================================================
    25. REGISTRATION REPORT NORMALIZATION
    ============================================================
  */


  function createFallbackRegistrationReport()
  {

    const cropIds =
      uiState.crops
        .map(
          getCropId
        )
        .filter(
          Boolean
        );

    const uniqueCropIds =
      Array.from(
        new Set(
          cropIds
        )
      );

    const expectedCropIds =
      getPlannerConfig()
        ?.crops
        ?.expectedCropIds;

    const normalizedExpectedIds =
      Array.isArray(
        expectedCropIds
      )
        ? expectedCropIds
        : [];


    return {

      registered:
        uiState.crops.length >
        0,

      totalRecordsReceived:
        uiState.crops.length,

      uniqueIdCount:
        uniqueCropIds.length,

      duplicateIdCount:
        cropIds.length -
        uniqueCropIds.length,

      expectedIdsFound:
        normalizedExpectedIds
          .filter(
            cropId =>
              uniqueCropIds
                .includes(
                  cropId
                )
          ),

      expectedIdsMissing:
        normalizedExpectedIds
          .filter(
            cropId =>
              !uniqueCropIds
                .includes(
                  cropId
                )
          ),

      unexpectedIds:
        uniqueCropIds
          .filter(
            cropId =>
              normalizedExpectedIds
                .length >
                0 &&
              !normalizedExpectedIds
                .includes(
                  cropId
                )
          ),

      warnings:
        []

    };

  }



function normalizeRegistrationReport(
  report
) {

  const fallback =
    createFallbackRegistrationReport();

  const reportHasUsableCropCount =
    report &&
    typeof report ===
      "object" &&
    Number.isInteger(
      report.totalRecordsReceived
    ) &&
    report.totalRecordsReceived >
      0;

  if (
    !reportHasUsableCropCount &&
    fallback.totalRecordsReceived >
      0
  ) {

    return fallback;

  }

  if (
    !report ||
    typeof report !==
      "object"
  ) {

    return fallback;

  }

  return {

    registered:
      report.registered ===
        true ||
      fallback.registered,

    totalRecordsReceived:
      Number.isInteger(
        report.totalRecordsReceived
      ) &&
      report.totalRecordsReceived >
        0
        ? report.totalRecordsReceived
        : fallback
            .totalRecordsReceived,

    uniqueIdCount:
      Number.isInteger(
        report.uniqueIdCount
      ) &&
      report.uniqueIdCount >
        0
        ? report.uniqueIdCount
        : fallback
            .uniqueIdCount,

    duplicateIdCount:
      Number.isInteger(
        report.duplicateIdCount
      )
        ? report.duplicateIdCount
        : fallback
            .duplicateIdCount,

    expectedIdsFound:
      Array.isArray(
        report.expectedIdsFound
      ) &&
      report.expectedIdsFound
        .length >
        0
        ? report.expectedIdsFound
        : fallback
            .expectedIdsFound,

    expectedIdsMissing:
      Array.isArray(
        report.expectedIdsMissing
      )
        ? report.expectedIdsMissing
        : fallback
            .expectedIdsMissing,

    unexpectedIds:
      Array.isArray(
        report.unexpectedIds
      )
        ? report.unexpectedIds
        : fallback
            .unexpectedIds,

    warnings:
      Array.isArray(
        report.warnings
      )
        ? report.warnings
        : fallback.warnings

  };

}



  /*
    ============================================================
    26. DASHBOARD SUMMARY COUNTS
    ============================================================
  */


  function renderDashboardCropCount()
  {

    const expectedCropCount =
      getPlannerConfig()
        ?.crops
        ?.expectedCropIds
        ?.length;

    const actualCropCount =
      uiState.crops.length;

    const text =
      Number.isInteger(
        expectedCropCount
      )
        ? `${actualCropCount} registered / ${expectedCropCount} planned crop records`
        : `${actualCropCount} registered crop records`;

    setElementText(
      "planner-summary-crop-count",
      text
    );

  }



  /*
    ============================================================
    27. REGISTRATION REPORT RENDERING
    ============================================================
  */


  function renderCropRegistrationReport()
  {

    const report =
      normalizeRegistrationReport(
        uiState.registrationReport
      );

    const registrationHealthy =
      report.registered &&
      report.duplicateIdCount ===
        0 &&
      report.expectedIdsMissing
        .length ===
        0;

    setStatus(
      "crop-registration-summary",
      report.registered
        ? `${report.uniqueIdCount} unique crop records are registered.`
        : "The crop database could not be registered.",
      registrationHealthy
        ? "success"
        : (
            report.registered
              ? "neutral"
              : "error"
          )
    );


    const warningMessages = [

      ...report.warnings.map(
        warning =>
          typeof warning ===
            "string"
            ? warning
            : warning?.message
      ),

      ...(
        report.duplicateIdCount >
          0
          ? [
              `${report.duplicateIdCount} duplicate crop ID record(s) were detected.`
            ]
          : []
      ),

      ...(
        report.expectedIdsMissing
          .length >
          0
          ? [
              `${report.expectedIdsMissing.length} expected crop ID(s) are missing.`
            ]
          : []
      ),

      ...(
        report.unexpectedIds
          .length >
          0
          ? [
              `${report.unexpectedIds.length} registered crop ID(s) are not in the expected list.`
            ]
          : []
      )

    ]
      .map(
        normalizeText
      )
      .filter(
        Boolean
      );


    const missingIdMarkup =
      report.expectedIdsMissing
        .length >
        0
        ? `
          <div class="test-card">
            <strong>Missing Expected IDs</strong>

            <ul>
              ${report.expectedIdsMissing
                .map(
                  cropId => `
                    <li>
                      <code>
                        ${escapeHtml(
                          cropId
                        )}
                      </code>
                    </li>
                  `
                )
                .join(
                  ""
                )}
            </ul>
          </div>
        `
        : "";


    const unexpectedIdMarkup =
      report.unexpectedIds
        .length >
        0
        ? `
          <div class="test-card">
            <strong>Unexpected Registered IDs</strong>

            <ul>
              ${report.unexpectedIds
                .map(
                  cropId => `
                    <li>
                      <code>
                        ${escapeHtml(
                          cropId
                        )}
                      </code>
                    </li>
                  `
                )
                .join(
                  ""
                )}
            </ul>
          </div>
        `
        : "";


    setElementHtml(
      "crop-registration-details",
      `
        <div class="test-card-grid">

          <div class="test-card">
            <strong>
              Records Received
            </strong>

            ${report.totalRecordsReceived}
          </div>

          <div class="test-card">
            <strong>
              Unique Crop IDs
            </strong>

            ${report.uniqueIdCount}
          </div>

          <div class="test-card">
            <strong>
              Expected IDs Found
            </strong>

            ${report.expectedIdsFound.length}
          </div>

          <div class="test-card">
            <strong>
              Expected IDs Missing
            </strong>

            ${report.expectedIdsMissing.length}
          </div>

          <div class="test-card">
            <strong>
              Duplicate IDs
            </strong>

            ${report.duplicateIdCount}
          </div>

          <div class="test-card">
            <strong>
              Unexpected IDs
            </strong>

            ${report.unexpectedIds.length}
          </div>

        </div>

        ${
          warningMessages.length >
            0
            ? `
              <h3>
                Registration Warnings
              </h3>

              <ul>
                ${warningMessages
                  .map(
                    warning => `
                      <li>
                        ${escapeHtml(
                          warning
                        )}
                      </li>
                    `
                  )
                  .join(
                    ""
                  )}
              </ul>
            `
            : `
              <p>
                No crop-registration warnings were found.
              </p>
            `
        }

        <div class="test-card-grid">
          ${missingIdMarkup}
          ${unexpectedIdMarkup}
        </div>
      `
    );


    renderDashboardCropCount();

  }



  /*
    ============================================================
    28. VALIDATION MESSAGE RENDERING
    ============================================================
  */


  function renderValidationMessageList(
    title,
    messages
  ) {

    if (
      !Array.isArray(
        messages
      ) ||
      messages.length ===
        0
    ) {
      return "";
    }

    return `
      <h4>
        ${escapeHtml(
          title
        )}
      </h4>

      <ul>
        ${messages
          .map(
            message => `
              <li>
                ${escapeHtml(
                  message.message
                )}

                ${
                  message.path
                    ? `
                      <br>

                      <small>
                        <code>
                          ${escapeHtml(
                            message.path
                          )}
                        </code>
                      </small>
                    `
                    : ""
                }
              </li>
            `
          )
          .join(
            ""
          )}
      </ul>
    `;

  }



  function renderSingleCropValidation(
    validation
  ) {

    const readinessLabel =
      validation.plannerReady
        ? "✅ Planner Ready"
        : (
            validation.valid
              ? "⚠ Structurally Valid, Not Enabled"
              : "❌ Not Ready"
          );

    const schemaLabel =
      validation.schemaVersion ||
      "Not declared";

    const developmentStatus =
      validation.developmentStatus ||
      "Not declared";

    return `
      <div
        class="test-card"
        style="margin-bottom:14px;"
      >

        <strong>
          ${escapeHtml(
            validation.cropName
          )}
        </strong>

        <p>
          Crop ID:
          <code>
            ${escapeHtml(
              validation.cropId ||
              "Missing"
            )}
          </code>
        </p>

        <p>
          Schema Version:
          <code>
            ${escapeHtml(
              schemaLabel
            )}
          </code>
        </p>

        <p>
          Development Status:
          <code>
            ${escapeHtml(
              developmentStatus
            )}
          </code>
        </p>

        <p>
          Planner Status:
          ${readinessLabel}
        </p>

        <p>
          Errors:
          <strong>
            ${validation.errors.length}
          </strong>

          &nbsp;|&nbsp;

          Warnings:
          <strong>
            ${validation.warnings.length}
          </strong>
        </p>

        ${renderValidationMessageList(
          "Errors",
          validation.errors
        )}

        ${renderValidationMessageList(
          "Warnings",
          validation.warnings
        )}

        ${
          validation.errors.length ===
            0 &&
          validation.warnings.length ===
            0
            ? `
              <p>
                No schema problems were found.
              </p>
            `
            : ""
        }

      </div>
    `;

  }



  /*
    ============================================================
    29. VALIDATION REPORT RENDERING
    ============================================================
  */


  function renderCropValidationReport()
  {

    const validations =
      validateAllCropRecords();

    const validCount =
      validations.filter(
        validation =>
          validation.valid
      )
        .length;

    const plannerReadyCount =
      validations.filter(
        validation =>
          validation.plannerReady
      )
        .length;

    const invalidCount =
      validations.length -
      validCount;

    const totalErrorCount =
      validations.reduce(
        (
          total,
          validation
        ) =>
          total +
          validation.errors.length,
        0
      );

    const totalWarningCount =
      validations.reduce(
        (
          total,
          validation
        ) =>
          total +
          validation.warnings.length,
        0
      );


    const allValid =
      validations.length >
        0 &&
      invalidCount ===
        0;


    setStatus(
      "crop-validation-summary",
      validations.length ===
        0
        ? "No registered crop records were available for validation."
        : `${plannerReadyCount} of ${validations.length} crops are planner-ready. ${totalErrorCount} errors and ${totalWarningCount} warnings were found.`,
      validations.length ===
        0
        ? "error"
        : (
            allValid
              ? "success"
              : "neutral"
          )
    );


    if (
      validations.length ===
        0
    ) {

      setElementHtml(
        "crop-validation-results",
        `
          <p>
            Crop validation could not run because no crop records
            were loaded.
          </p>
        `
      );

      return;

    }


    const sortedValidations =
      validations
        .slice()
        .sort(
          (
            first,
            second
          ) => {

            if (
              first.valid !==
              second.valid
            ) {

              return first.valid
                ? 1
                : -1;

            }

            if (
              first.warnings.length !==
              second.warnings.length
            ) {

              return second
                .warnings
                .length -
                first
                  .warnings
                  .length;

            }

            return first.cropName
              .localeCompare(
                second.cropName
              );

          }
        );


    setElementHtml(
      "crop-validation-results",
      `
        <div class="test-card-grid">

          <div class="test-card">
            <strong>
              Total Crops
            </strong>

            ${validations.length}
          </div>

          <div class="test-card">
            <strong>
              Structurally Valid
            </strong>

            ${validCount}
          </div>

          <div class="test-card">
            <strong>
              Planner Ready
            </strong>

            ${plannerReadyCount}
          </div>

          <div class="test-card">
            <strong>
              Invalid Records
            </strong>

            ${invalidCount}
          </div>

          <div class="test-card">
            <strong>
              Validation Errors
            </strong>

            ${totalErrorCount}
          </div>

          <div class="test-card">
            <strong>
              Validation Warnings
            </strong>

            ${totalWarningCount}
          </div>

        </div>

        <div style="margin-top:18px;">

          ${sortedValidations
            .map(
              renderSingleCropValidation
            )
            .join(
              ""
            )}

        </div>
      `
    );

  }

    /*
    ============================================================
    30. SAMPLE PROFILE LIST RENDERING
    ============================================================
  */


  function renderSampleProfileList()
  {

    const profiles =
      uiState.sampleProfiles;


    setStatus(
      "sample-profile-summary",
      profiles.length >
        0
        ? `${profiles.length} sample profiles are currently loaded.`
        : "No sample profiles were found.",
      profiles.length >
        0
        ? "success"
        : "error"
    );


    if (
      profiles.length ===
        0
    ) {

      setElementHtml(
        "sample-profile-list",
        `
          <p>
            No sample profiles are available in the planner
            configuration.
          </p>
        `
      );

      return;

    }


    setElementHtml(
      "sample-profile-list",
      `
        <ol>
          ${profiles
            .map(
              (
                profile,
                index
              ) => {

                const profileId =
                  getProfileId(
                    profile,
                    index
                  );

                const profileLabel =
                  getProfileLabel(
                    profile,
                    index
                  );

                return `
                  <li>
                    <strong>
                      ${escapeHtml(
                        profileLabel
                      )}
                    </strong>

                    <br>

                    <code>
                      ${escapeHtml(
                        profileId ||
                        "Missing profile ID"
                      )}
                    </code>
                  </li>
                `;

              }
            )
            .join(
              ""
            )}
        </ol>
      `
    );

  }



  /*
    ============================================================
    31. PROFILE VALUE FORMATTING
    ============================================================
  */


  function formatProfileValue(
    value
  ) {

    if (
      value ===
        null ||
      value ===
        undefined ||
      value ===
        ""
    ) {
      return "";
    }

    return String(
      value
    )
      .replace(
        /[_-]+/g,
        " "
      )
      .replace(
        /\b\w/g,
        character =>
          character
            .toUpperCase()
      );

  }



  function getSunlightSummary(
    hours
  ) {

    if (
      !Number.isFinite(
        hours
      )
    ) {
      return null;
    }

    if (
      hours >=
        8
    ) {

      return {
        icon:
          "☀️",

        label:
          "Full Sun"
      };

    }

    if (
      hours >=
        6
    ) {

      return {
        icon:
          "🌤️",

        label:
          "Good Sun"
      };

    }

    if (
      hours >=
        4
    ) {

      return {
        icon:
          "⛅",

        label:
          "Partial Sun"
      };

    }

    return {
      icon:
        "🌥️",

      label:
        "Low Sun"
    };

  }



  function getWaterSummary(
    waterReliability,
    conservationPriority
  ) {

    const limitedValues = [

      "frequently-limited",

      "occasionally-limited",

      "limited",

      "rainfall-only"

    ];


    const highConservationValues = [

      "high",

      "very-high",

      "top-priority"

    ];


    if (
      limitedValues.includes(
        waterReliability
      ) ||
      highConservationValues.includes(
        conservationPriority
      )
    ) {

      return {
        icon:
          "💧",

        label:
          "Limited Water"
      };

    }


    if (
      waterReliability ===
        "very-reliable" ||
      waterReliability ===
        "usually-reliable"
    ) {

      return {
        icon:
          "🚿",

        label:
          "Reliable Water"
      };

    }

    return null;

  }



  function getStorageSummary(
    harvestStorage
  ) {

    const storageDuration =
      harvestStorage
        ?.desiredStorageDuration;


    if (
      storageDuration ===
        "6-12-months" ||
      storageDuration ===
        "long-term"
    ) {

      return {
        icon:
          "🏺",

        label:
          "Long Storage"
      };

    }


    if (
      storageDuration ===
        "3-6-months" ||
      storageDuration ===
        "medium-term"
    ) {

      return {
        icon:
          "📦",

        label:
          "Seasonal Storage"
      };

    }


    if (
      storageDuration ===
        "immediate"
    ) {

      return {
        icon:
          "🥬",

        label:
          "Use Fresh"
      };

    }

    return null;

  }



  function getPrimaryHarvestSummary(
    desiredHarvestProducts
  ) {

    const products =
      Array.isArray(
        desiredHarvestProducts
      )
        ? desiredHarvestProducts
        : [];


    const productChecks = [

      {
        matches: [
          "dried-seed-heads",
          "fresh-seed-heads",
          "millet-panicles",
          "whole-millet-panicles"
        ],

        icon:
          "🌾",

        label:
          "Whole Seed Heads"
      },

      {
        matches: [
          "dry-seeds",
          "dry-grain",
          "stored-grain",
          "whole-grain",
          "corn-kernels",
          "millet-grain",
          "loose-millet-grain"
        ],

        icon:
          "🪣",

        label:
          "Dry Grain"
      },

      {
        matches: [
          "fresh-greens",
          "fresh-leaves",
          "fresh-forage",
          "alfalfa-foliage"
        ],

        icon:
          "🥬",

        label:
          "Fresh Greens"
      },

      {
        matches: [
          "living-forage",
          "pasture-forage"
        ],

        icon:
          "🌱",

        label:
          "Living Forage"
      },

      {
        matches: [
          "whole-storage-vegetables",
          "winter-storage-produce",
          "pumpkin-squash-flesh"
        ],

        icon:
          "🎃",

        label:
          "Storage Produce"
      },

      {
        matches: [
          "dry-legumes"
        ],

        icon:
          "🫘",

        label:
          "Dry Legumes"
      },

      {
        matches: [
          "fallen-fruit",
          "mulberries"
        ],

        icon:
          "🫐",

        label:
          "Fresh Fruit"
      },

      {
        matches: [
          "dried-forage",
          "dried-leaves",
          "alfalfa-forage"
        ],

        icon:
          "🌿",

        label:
          "Dried Forage"
      }

    ];


    return (
      productChecks.find(
        check =>
          check.matches.some(
            product =>
              products.includes(
                product
              )
          )
      ) ||
      null
    );

  }



  /*
    ============================================================
    32. PROFILE GOAL SUMMARY
    ============================================================
  */


  function getGoalSummaryItems(
    preferences
  ) {

    const priorities =
      Array.isArray(
        preferences?.goalPriorities
      )
        ? [
            ...preferences.goalPriorities
          ]
        : [];


    const goals =
      priorities.length >
        0
        ? priorities
            .sort(
              (
                first,
                second
              ) =>
                (
                  first.rank ??
                  Number.POSITIVE_INFINITY
                ) -
                (
                  second.rank ??
                  Number.POSITIVE_INFINITY
                )
            )
            .map(
              item =>
                item.goal
            )
            .filter(
              Boolean
            )
        : (
            Array.isArray(
              preferences
                ?.plannerGoals
            )
              ? preferences
                  .plannerGoals
              : []
          );


    const goalLabels = {

      enrichment: {
        icon:
          "🐔",

        label:
          "Enrichment"
      },

      pollinators: {
        icon:
          "🌼",

        label:
          "Pollinators"
      },

      "winter-storage": {
        icon:
          "❄️",

        label:
          "Winter Storage"
      },

      "high-energy": {
        icon:
          "⚡",

        label:
          "High Energy"
      },

      "protein-oriented": {
        icon:
          "🫘",

        label:
          "Protein"
      },

      "fresh-greens": {
        icon:
          "🥬",

        label:
          "Fresh Greens"
      },

      "living-forage": {
        icon:
          "🌱",

        label:
          "Living Forage"
      },

      "soil-improvement": {
        icon:
          "🌍",

        label:
          "Soil Improvement"
      },

      "nitrogen-fixation": {
        icon:
          "♻️",

        label:
          "Nitrogen Fixing"
      },

      "self-reliance": {
        icon:
          "🏡",

        label:
          "Self-Reliance"
      },

      "shared-household-food": {
        icon:
          "🍽️",

        label:
          "Shared Food"
      },

      "fast-value": {
        icon:
          "⏱️",

        label:
          "Fast Value"
      },

      "limited-irrigation": {
        icon:
          "💧",

        label:
          "Low Water"
      },

      "short-season": {
        icon:
          "📅",

        label:
          "Short Season"
      },

      "ground-cover": {
        icon:
          "🍀",

        label:
          "Ground Cover"
      },

      shade: {
        icon:
          "🌳",

        label:
          "Shade"
      },

      "edible-landscape": {
        icon:
          "🌿",

        label:
          "Edible Landscape"
      },

      "reduce-feed-use": {
        icon:
          "📉",

        label:
          "Reduce Feed Use"
      }

    };


    return goals
      .slice(
        0,
        3
      )
      .map(
        goal =>
          goalLabels[
            goal
          ] || {
            icon:
              "✓",

            label:
              formatProfileValue(
                goal
              )
          }
      );

  }



  /*
    ============================================================
    33. PROFILE SUMMARY BUILDING
    ============================================================
  */


  function buildProfileSummaryItems(
    profile
  ) {

    const answers =
      profile?.answers ||
      {};

    const items =
      [];


    const sunlight =
      getSunlightSummary(
        answers.site
          ?.directSunHoursExact
      );

    if (
      sunlight
    ) {

      items.push(
        sunlight
      );

    }


    const spaceTypes =
      Array.isArray(
        answers.space
          ?.availableSpaceTypes
      )
        ? answers.space
            .availableSpaceTypes
        : [];

    if (
      spaceTypes.length >
        0
    ) {

      items.push({
        icon:
          "🪴",

        label:
          formatProfileValue(
            spaceTypes[0]
          )
      });

    }


    const experience =
      answers.labor
        ?.gardeningExperience;

    if (
      experience
    ) {

      items.push({
        icon:
          "👤",

        label:
          formatProfileValue(
            experience
          )
      });

    }


    const harvest =
      getPrimaryHarvestSummary(
        answers.harvestStorage
          ?.desiredHarvestProducts
      );

    if (
      harvest
    ) {

      items.push(
        harvest
      );

    }


    const storage =
      getStorageSummary(
        answers.harvestStorage
      );

    if (
      storage
    ) {

      items.push(
        storage
      );

    }


    const water =
      getWaterSummary(
        answers.water
          ?.waterReliability,

        answers.water
          ?.waterConservationPriority
      );

    if (
      water
    ) {

      items.push(
        water
      );

    }


    items.push(
      ...getGoalSummaryItems(
        answers.preferences
      )
    );


    const uniqueItems =
      [];

    items.forEach(
      item => {

        if (
          !item ||
          !normalizeText(
            item.label
          )
        ) {
          return;
        }

        const alreadyExists =
          uniqueItems.some(
            existingItem =>
              existingItem.label ===
              item.label
          );

        if (
          !alreadyExists
        ) {

          uniqueItems.push(
            item
          );

        }

      }
    );

    return uniqueItems.slice(
      0,
      7
    );

  }



  function renderProfileSummary(
    profile
  ) {

    const items =
      buildProfileSummaryItems(
        profile
      );


    if (
      items.length ===
        0
    ) {

      return `
        <span class="profile-summary-empty">
          No structured summary available
        </span>
      `;

    }


    return `
      <ul class="profile-summary-list">
        ${items
          .map(
            item => `
              <li>
                <span
                  class="profile-summary-icon"
                  aria-hidden="true"
                >
                  ${escapeHtml(
                    item.icon
                  )}
                </span>

                <span>
                  ${escapeHtml(
                    item.label
                  )}
                </span>
              </li>
            `
          )
          .join(
            ""
          )}
      </ul>
    `;

  }



  /*
    ============================================================
    34. PUBLIC RESULT ACCESSORS
    ============================================================
  */


  function getPublicRecommendationsFromRun(
    profileRun
  ) {

    const recommendations =
      profileRun
        ?.publicResult
        ?.recommendations;

    return Array.isArray(
      recommendations
    )
      ? recommendations
      : [];

  }



  function getPublicUnrankedFromRun(
    profileRun
  ) {

    const unranked =
      profileRun
        ?.publicResult
        ?.unranked;

    return Array.isArray(
      unranked
    )
      ? unranked
      : [];

  }



  function getPublicCropId(
    publicResult
  ) {

    return (
      publicResult
        ?.crop
        ?.id ||
      publicResult
        ?.cropId ||
      null
    );

  }



  function getPublicCropName(
    publicResult
  ) {

    return (
      publicResult
        ?.crop
        ?.name ||
      publicResult
        ?.crop
        ?.commonName ||
      publicResult
        ?.cropName ||
      getPublicCropId(
        publicResult
      ) ||
      "Unknown Crop"
    );

  }



  function getPublicSuitabilityScore(
    publicResult
  ) {

    const possibleValues = [

      publicResult
        ?.scores
        ?.suitability,

      publicResult
        ?.score,

      publicResult
        ?.finalScore

    ];

    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function getPublicRank(
    publicResult
  ) {

    const rank =
      publicResult
        ?.rank
        ?.rank ??
      publicResult
        ?.rank;

    return Number.isFinite(
      rank
    )
      ? rank
      : null;

  }



    function getPublicStatusLabel(
    publicResult
  ) {

    const configuredLabel =
      normalizeText(
        publicResult
          ?.rank
          ?.statusLabel
      );


    if (
      configuredLabel &&
      configuredLabel !==
        "Unscored"
    ) {
      return configuredLabel;
    }


    const score =
      getPublicSuitabilityScore(
        publicResult
      );

    const rank =
      getPublicRank(
        publicResult
      );


    if (
      publicResult?.eligible ===
        true &&
      Number.isFinite(
        score
      ) &&
      Number.isFinite(
        rank
      )
    ) {

      return "Ranked";

    }


    return (
      formatIdentifier(
        getPublicStatus(
          publicResult
        )
      ) ||
      "Unscored"
    );

  }



  function getPublicStatusLabel(
    publicResult
  ) {

    return (
      publicResult
        ?.rank
        ?.statusLabel ||
      formatIdentifier(
        getPublicStatus(
          publicResult
        )
      ) ||
      "Unscored"
    );

  }



    function getPublicTierLabel(
    publicResult
  ) {

    const configuredLabel =
      normalizeText(
        publicResult
          ?.rank
          ?.tierLabel
      );


    if (
      configuredLabel &&
      configuredLabel !==
        "Unranked"
    ) {
      return configuredLabel;
    }


    const score =
      getPublicSuitabilityScore(
        publicResult
      );


    if (
      !Number.isFinite(
        score
      )
    ) {
      return "Unranked";
    }


    if (
      score >=
        85
    ) {
      return "Exceptional Match";
    }


    if (
      score >=
        75
    ) {
      return "Strong Match";
    }


    if (
      score >=
        65
    ) {
      return "Good Match";
    }


    if (
      score >=
        50
    ) {
      return "Conditional Match";
    }


    return "Low Priority";

  }



  function getPublicBestUsePath(
    publicResult
  ) {

    const bestUsePath =
      publicResult
        ?.bestUsePath ||
      publicResult
        ?.usePath
        ?.best ||
      null;


    if (
      !bestUsePath ||
      typeof bestUsePath !==
        "object"
    ) {
      return null;
    }

    if (
      !bestUsePath.id &&
      !bestUsePath.label
    ) {
      return null;
    }

    return bestUsePath;

  }



  function getPublicConfidenceScore(
    publicResult
  ) {

    const value =
      publicResult
        ?.scores
        ?.confidence;

    return Number.isFinite(
      value
    )
      ? value
      : null;

  }



  function getPublicRiskSafetyScore(
    publicResult
  ) {

    const value =
      publicResult
        ?.scores
        ?.riskSafety;

    return Number.isFinite(
      value
    )
      ? value
      : null;

  }



  /*
    ============================================================
    35. INTERNAL PHASE SCORE ACCESSORS
    ============================================================
  */


  function getEvaluationPhaseScore(
    evaluation,
    phaseName
  ) {

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {
      return null;
    }


    const phase =
      evaluation[
        phaseName
      ];

    if (
      Number.isFinite(
        phase?.score
      )
    ) {

      return phase.score;

    }


    if (
      Number.isFinite(
        phase?.finalScore
      )
    ) {

      return phase.finalScore;

    }


    if (
      Number.isFinite(
        phase?.weightedScore
      )
    ) {

      return phase.weightedScore;

    }


    return null;

  }



  function getEvaluationCategoryScores(
    evaluation
  ) {

    const categoryScores = {

      compatibility:
        getEvaluationPhaseScore(
          evaluation,
          "compatibility"
        ),

      goals:
        getEvaluationPhaseScore(
          evaluation,
          "goals"
        ),

      usePaths:
        getEvaluationPhaseScore(
          evaluation,
          "usePaths"
        ),

      riskSafety:
        getEvaluationPhaseScore(
          evaluation,
          "risks"
        ),

      confidence:
        getEvaluationPhaseScore(
          evaluation,
          "confidence"
        )

    };


    return Object.fromEntries(
      Object.entries(
        categoryScores
      )
        .filter(
          ([, value]) =>
            Number.isFinite(
              value
            )
        )
    );

  }



  function findInternalEvaluationForPublicResult(
    profileRun,
    publicResult
  ) {

    const cropId =
      getPublicCropId(
        publicResult
      );

    if (
      !cropId
    ) {
      return null;
    }


    return profileRun
      ?.evaluations
      ?.find(
        evaluation =>
          getEvaluationCropId(
            evaluation
          ) ===
          cropId
      ) ||
      null;

  }



  /*
    ============================================================
    36. RANKING FACTOR LABELS
    ============================================================
  */


  const RANKING_FACTOR_LABELS =
    Object.freeze({

      compatibility: {
        icon:
          "🌦️",

        label:
          "Compatibility"
      },

      goals: {
        icon:
          "🎯",

        label:
          "Goals"
      },

      usePaths: {
        icon:
          "🌾",

        label:
          "Use Path"
      },

      riskSafety: {
        icon:
          "🛡️",

        label:
          "Risk Safety"
      },

      confidence: {
        icon:
          "📊",

        label:
          "Confidence"
      }

    });



  function getRankingFactorDetails(
    profileRun,
    publicResult
  ) {

    const internalEvaluation =
      findInternalEvaluationForPublicResult(
        profileRun,
        publicResult
      );

    const categoryScores =
      getEvaluationCategoryScores(
        internalEvaluation
      );


    return Object.entries(
      categoryScores
    )
      .map(
        ([
          categoryId,
          score
        ]) => {

          const definition =
            RANKING_FACTOR_LABELS[
              categoryId
            ] || {
              icon:
                "✓",

              label:
                formatIdentifier(
                  categoryId
                )
            };


          return {

            id:
              categoryId,

            icon:
              definition.icon,

            label:
              definition.label,

            score:
              Math.round(
                score
              ),

            reason:
              ""
          };

        }
      )
      .sort(
        (
          first,
          second
        ) =>
          second.score -
          first.score
      );

  }



  function getRankingStrengths(
    profileRun,
    publicResult,
    maximumItems =
      3
  ) {

    return getRankingFactorDetails(
      profileRun,
      publicResult
    )
      .filter(
        item =>
          item.score >=
          70
      )
      .slice(
        0,
        maximumItems
      );

  }



  function renderRankingStrengths(
    profileRun,
    publicResult
  ) {

    const strengths =
      getRankingStrengths(
        profileRun,
        publicResult,
        3
      );


    if (
      strengths.length ===
        0
    ) {

      return `
        <span class="ranking-factor-empty">
          No strong scoring advantages
        </span>
      `;

    }


    return `
      <ul class="ranking-factor-list">
        ${strengths
          .map(
            strength => `
              <li>
                <span
                  class="ranking-factor-icon"
                  aria-hidden="true"
                >
                  ${escapeHtml(
                    strength.icon
                  )}
                </span>

                <span>
                  ${escapeHtml(
                    strength.label
                  )}
                </span>

                <span class="ranking-factor-score">
                  ${strength.score}
                </span>
              </li>
            `
          )
          .join(
            ""
          )}
      </ul>
    `;

  }



  /*
    ============================================================
    37. PUBLIC RECOMMENDATION ELIGIBILITY
    ============================================================
  */


  function isPublicRecommendationEligible(
    publicResult
  ) {

    if (
      !publicResult ||
      typeof publicResult !==
        "object"
    ) {
      return false;
    }


    if (
      publicResult.eligible ===
        false
    ) {
      return false;
    }


    const score =
      getPublicSuitabilityScore(
        publicResult
      );


    if (
      !Number.isFinite(
        score
      )
    ) {
      return false;
    }


    const rank =
      getPublicRank(
        publicResult
      );


    return Number.isFinite(
      rank
    );

  }



  function getEligiblePublicRecommendations(
    profileRun
  ) {

    return getPublicRecommendationsFromRun(
      profileRun
    )
      .filter(
        isPublicRecommendationEligible
      )
      .slice()
      .sort(
        (
          first,
          second
        ) => {

          const firstRank =
            getPublicRank(
              first
            );

          const secondRank =
            getPublicRank(
              second
            );


          if (
            Number.isFinite(
              firstRank
            ) &&
            Number.isFinite(
              secondRank
            ) &&
            firstRank !==
              secondRank
          ) {

            return firstRank -
              secondRank;

          }


          return (
            getPublicSuitabilityScore(
              second
            ) ??
            -Infinity
          ) -
          (
            getPublicSuitabilityScore(
              first
            ) ??
            -Infinity
          );

        }
      );

  }



  /*
    ============================================================
    38. TOP-THREE RANKING RENDERING
    ============================================================
  */


  function renderTopThreeRankings(
    profileRun
  ) {

    const topThree =
      getEligiblePublicRecommendations(
        profileRun
      )
        .slice(
          0,
          3
        );


    if (
      topThree.length ===
        0
    ) {

      return `
        <span class="ranking-factor-empty">
          No eligible rankings
        </span>
      `;

    }


    return `
      <ol class="top-ranking-list">
        ${topThree
          .map(
            publicResult => {

              const cropName =
                getPublicCropName(
                  publicResult
                );

              const score =
                getPublicSuitabilityScore(
                  publicResult
                );

              return `
                <li class="top-ranking-item">

                  <div class="top-ranking-heading">

                    <strong>
                      ${escapeHtml(
                        cropName
                      )}
                    </strong>

                    <span class="top-ranking-score">
                      ${formatPercent(
                        score
                      )}
                    </span>

                  </div>

                  ${renderRankingStrengths(
                    profileRun,
                    publicResult
                  )}

                </li>
              `;

            }
          )
          .join(
            ""
          )}
      </ol>
    `;

  }

    /*
    ============================================================
    39. PROFILE EXPECTATION ACCESSORS
    ============================================================
  */


  function getProfileExpectation(
    profileId
  ) {

    if (
      !profileId
    ) {
      return null;
    }

    const expectation =
      uiState
        .profileExpectations[
          profileId
        ];

    return expectation &&
      typeof expectation ===
        "object"
        ? expectation
        : null;

  }



  function getExpectedTopCropIds(
    expectation
  ) {

    const expectedIds =
      expectation
        ?.expectedTopCropIds;

    return Array.isArray(
      expectedIds
    )
      ? expectedIds.filter(
          Boolean
        )
      : [];

  }



  function getExpectedTopThreeCropIds(
    expectation
  ) {

    const expectedIds =
      expectation
        ?.expectedTopThreeCropIds;

    return Array.isArray(
      expectedIds
    )
      ? expectedIds.filter(
          Boolean
        )
      : [];

  }



  function getExpectationProfileNumber(
    expectation,
    fallbackIndex
  ) {

    if (
      Number.isInteger(
        expectation
          ?.profileNumber
      )
    ) {

      return expectation
        .profileNumber;

    }

    return Number.isInteger(
      fallbackIndex
    )
      ? fallbackIndex +
        1
      : "—";

  }



  /*
    ============================================================
    40. CROP NAME LOOKUP
    ============================================================
  */


  function createCropNameLookup()
  {

    const lookup =
      new Map();


    uiState.crops.forEach(
      crop => {

        const cropId =
          getCropId(
            crop
          );

        if (
          !cropId
        ) {
          return;
        }

        lookup.set(
          cropId,
          getCropName(
            crop
          )
        );

      }
    );


    uiState.profileRuns.forEach(
      profileRun => {

        getPublicRecommendationsFromRun(
          profileRun
        )
          .forEach(
            recommendation => {

              const cropId =
                getPublicCropId(
                  recommendation
                );

              if (
                !cropId
              ) {
                return;
              }

              lookup.set(
                cropId,
                getPublicCropName(
                  recommendation
                )
              );

            }
          );


        profileRun.evaluations
          .forEach(
            evaluation => {

              const cropId =
                getEvaluationCropId(
                  evaluation
                );

              if (
                !cropId
              ) {
                return;
              }

              lookup.set(
                cropId,
                getEvaluationCropName(
                  evaluation
                )
              );

            }
          );

      }
    );


    return lookup;

  }



  function getCropDisplayNameById(
    cropId,
    cropNameLookup
  ) {

    return (
      cropNameLookup.get(
        cropId
      ) ||
      formatIdentifier(
        cropId
      ) ||
      cropId ||
      "Unknown Crop"
    );

  }



  function renderExpectedCropNames(
    expectedCropIds,
    cropNameLookup
  ) {

    if (
      expectedCropIds.length ===
        0
    ) {

      return `
        <span class="profile-summary-empty">
          No expected leader configured
        </span>
      `;

    }

    return expectedCropIds
      .map(
        cropId =>
          escapeHtml(
            getCropDisplayNameById(
              cropId,
              cropNameLookup
            )
          )
      )
      .join(
        " or "
      );

  }



  /*
    ============================================================
    41. PROFILE RUN RESULT ACCESSORS
    ============================================================
  */


  function getProfileRunLeader(
    profileRun
  ) {

    return (
      getEligiblePublicRecommendations(
        profileRun
      )[0] ||
      null
    );

  }



  function getProfileRunTopThree(
    profileRun
  ) {

    return getEligiblePublicRecommendations(
      profileRun
    )
      .slice(
        0,
        3
      );

  }



  function getProfileRunTestedCropIds(
    profileRun
  ) {

    const ids =
      new Set();


    profileRun
      ?.evaluations
      ?.forEach(
        evaluation => {

          const cropId =
            getEvaluationCropId(
              evaluation
            );

          if (
            cropId
          ) {

            ids.add(
              cropId
            );

          }

        }
      );


    getPublicRecommendationsFromRun(
      profileRun
    )
      .forEach(
        recommendation => {

          const cropId =
            getPublicCropId(
              recommendation
            );

          if (
            cropId
          ) {

            ids.add(
              cropId
            );

          }

        }
      );


    return Array.from(
      ids
    );

  }



  /*
    ============================================================
    42. EXPECTATION COMPARISON
    ============================================================
  */


  function evaluateProfileExpectation(
    profileRun,
    expectation
  ) {

    if (
      !expectation
    ) {

      return {

        configured:
          false,

        status:
          "not-configured",

        statusLabel:
          "Not Configured",

        statusClass:
          "profile-matrix-na",

        leaderPasses:
          false,

        topThreePasses:
          false,

        actualLeaderId:
          null,

        actualTopThreeIds:
          [],

        testedExpectedTopThreeIds:
          [],

        missingExpectedTopThreeIds:
          []

      };

    }


    const expectedTopCropIds =
      getExpectedTopCropIds(
        expectation
      );

    const expectedTopThreeCropIds =
      getExpectedTopThreeCropIds(
        expectation
      );

    const actualLeader =
      getProfileRunLeader(
        profileRun
      );

    const actualTopThree =
      getProfileRunTopThree(
        profileRun
      );

    const actualLeaderId =
      actualLeader
        ? getPublicCropId(
            actualLeader
          )
        : null;

    const actualTopThreeIds =
      actualTopThree
        .map(
          getPublicCropId
        )
        .filter(
          Boolean
        );

    const testedCropIds =
      getProfileRunTestedCropIds(
        profileRun
      );

    const testedExpectedTopThreeIds =
      expectedTopThreeCropIds
        .filter(
          cropId =>
            testedCropIds.includes(
              cropId
            )
        );

    const missingExpectedTopThreeIds =
      expectedTopThreeCropIds
        .filter(
          cropId =>
            !testedCropIds.includes(
              cropId
            )
        );


    const leaderPasses =
      Boolean(
        actualLeaderId &&
        expectedTopCropIds.includes(
          actualLeaderId
        )
      );


    const topThreePasses =
      testedExpectedTopThreeIds
        .every(
          cropId =>
            actualTopThreeIds.includes(
              cropId
            )
        );


    if (
      !profileRun.success
    ) {

      return {

        configured:
          true,

        status:
          "error",

        statusLabel:
          "Error",

        statusClass:
          "profile-matrix-fail",

        leaderPasses,

        topThreePasses,

        actualLeaderId,

        actualTopThreeIds,

        testedExpectedTopThreeIds,

        missingExpectedTopThreeIds

      };

    }


    if (
      !actualLeader
    ) {

      return {

        configured:
          true,

        status:
          "unavailable",

        statusLabel:
          "Unavailable",

        statusClass:
          "profile-matrix-fail",

        leaderPasses:

          false,

        topThreePasses:
          false,

        actualLeaderId,

        actualTopThreeIds,

        testedExpectedTopThreeIds,

        missingExpectedTopThreeIds

      };

    }


    if (
      leaderPasses &&
      topThreePasses
    ) {

      return {

        configured:
          true,

        status:
          "pass",

        statusLabel:
          "Pass",

        statusClass:
          "profile-matrix-pass",

        leaderPasses,

        topThreePasses,

        actualLeaderId,

        actualTopThreeIds,

        testedExpectedTopThreeIds,

        missingExpectedTopThreeIds

      };

    }


    if (
      leaderPasses
    ) {

      return {

        configured:
          true,

        status:
          "leader-pass",

        statusLabel:
          "Leader Pass",

        statusClass:
          "profile-matrix-pass",

        leaderPasses,

        topThreePasses,

        actualLeaderId,

        actualTopThreeIds,

        testedExpectedTopThreeIds,

        missingExpectedTopThreeIds

      };

    }


    return {

      configured:
        true,

      status:
        "review",

      statusLabel:
        "Review",

      statusClass:
        "profile-matrix-review",

      leaderPasses,

      topThreePasses,

      actualLeaderId,

      actualTopThreeIds,

      testedExpectedTopThreeIds,

      missingExpectedTopThreeIds

    };

  }



  /*
    ============================================================
    43. ACTUAL LEADER RENDERING
    ============================================================
  */


  function renderActualLeader(
    profileRun
  ) {

    if (
      !profileRun.success
    ) {

      return `
        <span class="profile-summary-empty">
          Evaluation failed
        </span>
      `;

    }


    const leader =
      getProfileRunLeader(
        profileRun
      );


    if (
      !leader
    ) {

      return `
        <span class="profile-summary-empty">
          No eligible recommendation
        </span>
      `;

    }


    const bestUsePath =
      getPublicBestUsePath(
        leader
      );

    const confidenceScore =
      getPublicConfidenceScore(
        leader
      );


    return `
      <strong>
        ${escapeHtml(
          getPublicCropName(
            leader
          )
        )}
      </strong>

      <br>

      ${formatPercent(
        getPublicSuitabilityScore(
          leader
        )
      )}

      <br>

      ${escapeHtml(
        getPublicTierLabel(
          leader
        )
      )}

      ${
        bestUsePath
          ? `
            <br>

            <small>
              <strong>
                Use:
              </strong>

              ${escapeHtml(
                bestUsePath.label ||
                bestUsePath.id ||
                "Unavailable"
              )}
            </small>
          `
          : ""
      }

      ${
        Number.isFinite(
          confidenceScore
        )
          ? `
            <br>

            <small>
              <strong>
                Confidence:
              </strong>

              ${formatPercent(
                confidenceScore
              )}
            </small>
          `
          : ""
      }
    `;

  }



  /*
    ============================================================
    44. EXPECTATION DIAGNOSTIC SUMMARY
    ============================================================
  */


  function renderExpectationDiagnosticNote(
    comparison,
    cropNameLookup
  ) {

    const messages =
      [];


    if (
      comparison.status ===
        "not-configured"
    ) {

      messages.push(
        "No expected result is configured for this profile."
      );

    }


    if (
      comparison.status ===
        "error"
    ) {

      messages.push(
        "The recommendation engine did not complete this profile."
      );

    }


    if (
      comparison.configured &&
      !comparison.leaderPasses
    ) {

      messages.push(
        "The current leader is not one of the configured expected leaders."
      );

    }


    if (
      comparison.configured &&
      comparison.leaderPasses &&
      !comparison.topThreePasses
    ) {

      messages.push(
        "The expected leader passed, but the configured Top 3 set was not fully present."
      );

    }


    if (
      comparison
        .missingExpectedTopThreeIds
        .length >
        0
    ) {

      const missingNames =
        comparison
          .missingExpectedTopThreeIds
          .map(
            cropId =>
              getCropDisplayNameById(
                cropId,
                cropNameLookup
              )
          );

      messages.push(
        `Not tested in this run: ${missingNames.join(
          ", "
        )}.`
      );

    }


    if (
      messages.length ===
        0
    ) {

      messages.push(
        "The live result matches the configured expectation."
      );

    }


    return messages
      .map(
        message => `
          <p>
            ${escapeHtml(
              message
            )}
          </p>
        `
      )
      .join(
        ""
      );

  }



  /*
    ============================================================
    45. PROFILE ANALYSIS NAVIGATION
    ============================================================
  */


  function analyzeProfileResult(
    profileId
  ) {

    const comparisonSection =
      getElement(
        "multi-crop-comparison"
      );

    if (
      comparisonSection &&
      "open" in
        comparisonSection
    ) {

      comparisonSection.open =
        true;

    }


    const selectorId =
      global.CSS &&
      typeof global.CSS.escape ===
        "function"
        ? global.CSS.escape(
            profileId
          )
        : String(
            profileId
          )
            .replace(
              /"/g,
              '\\"'
            );


    const resultElement =
      document.querySelector(
        `[data-profile-result="${selectorId}"]`
      );


    if (
      !resultElement
    ) {

      recordUiWarning(
        `No detailed profile result was found for "${profileId}".`,
        "Profile analysis navigation"
      );

      return;

    }


    resultElement
      .classList
      .remove(
        "profile-analysis-highlight"
      );


    void resultElement
      .offsetWidth;


    resultElement
      .classList
      .add(
        "profile-analysis-highlight"
      );


    resultElement
      .scrollIntoView({

        behavior:
          "smooth",

        block:
          "start"

      });

  }



  function attachProfileMatrixInteractions(
    bodyElement
  ) {

    if (
      !bodyElement
    ) {
      return;
    }


    bodyElement
      .querySelectorAll(
        "[data-analyze-profile]"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            function () {

              const profileId =
                button.dataset
                  .analyzeProfile;

              if (
                profileId
              ) {

                analyzeProfileResult(
                  profileId
                );

              }

            }
          );

        }
      );

  }



  /*
    ============================================================
    46. PROFILE MATRIX ROW RENDERING
    ============================================================
  */


  function renderProfileMatrixRow(
    profileRun,
    index,
    cropNameLookup
  ) {

    const profile =
      profileRun.profile;

    const expectation =
      getProfileExpectation(
        profileRun.profileId
      );

    const comparison =
      evaluateProfileExpectation(
        profileRun,
        expectation
      );

    const expectedTopCropIds =
      getExpectedTopCropIds(
        expectation
      );

    const profileNumber =
      getExpectationProfileNumber(
        expectation,
        index
      );

    const errorMessage =
      profileRun.error
        ?.message ||
      "The profile evaluation did not complete.";


    return `
      <tr>

        <td>
          ${escapeHtml(
            profileNumber
          )}
        </td>

        <td>
          <strong>
            ${escapeHtml(
              profileRun.profileLabel
            )}
          </strong>

          <br>

          <code>
            ${escapeHtml(
              profileRun.profileId
            )}
          </code>
        </td>

        <td class="profile-purpose">
          ${renderProfileSummary(
            profile
          )}
        </td>

        <td class="profile-expected">
          ${renderExpectedCropNames(
            expectedTopCropIds,
            cropNameLookup
          )}
        </td>

        <td class="profile-actual">
          ${renderActualLeader(
            profileRun
          )}

          ${
            !profileRun.success
              ? `
                <br>

                <small>
                  ${escapeHtml(
                    errorMessage
                  )}
                </small>
              `
              : ""
          }
        </td>

        <td class="profile-top-three">
          ${renderTopThreeRankings(
            profileRun
          )}
        </td>

        <td class="${comparison.statusClass}">
          ${escapeHtml(
            comparison.statusLabel
          )}
        </td>

        <td class="profile-diagnostics">

          <button
            type="button"
            class="profile-analyze-button"
            data-analyze-profile="${escapeHtml(
              profileRun.profileId
            )}"
            aria-label="Analyze ${escapeHtml(
              profileRun.profileLabel
            )}"
          >
            Analyze
          </button>

          <div
            class="profile-matrix-diagnostic-note"
            hidden
          >
            ${renderExpectationDiagnosticNote(
              comparison,
              cropNameLookup
            )}
          </div>

        </td>

      </tr>
    `;

  }



  /*
    ============================================================
    47. PROFILE MATRIX SUMMARY COUNTS
    ============================================================
  */


  function summarizeProfileMatrix()
  {

    const summary = {

      totalRuns:
        uiState.profileRuns
          .length,

      successfulRuns:
        0,

      failedRuns:
        0,

      configured:
        0,

      notConfigured:
        0,

      pass:
        0,

      leaderPass:
        0,

      review:
        0,

      unavailable:
        0,

      error:
        0

    };


    uiState.profileRuns
      .forEach(
        profileRun => {

          if (
            profileRun.success
          ) {

            summary.successfulRuns +=
              1;

          } else {

            summary.failedRuns +=
              1;

          }


          const expectation =
            getProfileExpectation(
              profileRun.profileId
            );

          const comparison =
            evaluateProfileExpectation(
              profileRun,
              expectation
            );


          if (
            comparison.configured
          ) {

            summary.configured +=
              1;

          } else {

            summary.notConfigured +=
              1;

          }


          switch (
            comparison.status
          ) {

            case "pass":

              summary.pass +=
                1;

              break;

            case "leader-pass":

              summary.leaderPass +=
                1;

              break;

            case "review":

              summary.review +=
                1;

              break;

            case "unavailable":

              summary.unavailable +=
                1;

              break;

            case "error":

              summary.error +=
                1;

              break;

            default:

              break;

          }

        }
      );


    summary.passing =
      summary.pass +
      summary.leaderPass;

    summary.requiresAttention =
      summary.review +
      summary.unavailable +
      summary.error;


    return summary;

  }



  /*
    ============================================================
    48. PROFILE MATRIX RENDERING
    ============================================================
  */


  function renderProfileMatrix()
  {

    const summaryElement =
      getElement(
        "profile-matrix-summary"
      );

    const bodyElement =
      getElement(
        "profile-matrix-body"
      );


    if (
      !summaryElement ||
      !bodyElement
    ) {
      return;
    }


    if (
      uiState.profileRuns.length ===
        0
    ) {

      setStatus(
        summaryElement,
        "No profile evaluations were available.",
        "error"
      );

      setElementHtml(
        bodyElement,
        `
          <tr>
            <td colspan="8">
              The regression matrix could not run because no
              sample-profile evaluations were created.
            </td>
          </tr>
        `
      );

      return;

    }


    const cropNameLookup =
      createCropNameLookup();

    const rows =
      uiState.profileRuns
        .map(
          (
            profileRun,
            index
          ) =>
            renderProfileMatrixRow(
              profileRun,
              index,
              cropNameLookup
            )
        )
        .join(
          ""
        );


    setElementHtml(
      bodyElement,
      rows
    );


    attachProfileMatrixInteractions(
      bodyElement
    );


    const summary =
      summarizeProfileMatrix();


    const summaryText =
      `${summary.passing} of ${summary.configured} configured profile expectations currently have an approved leader. ` +
      `${summary.review} require ranking review. ` +
      `${summary.unavailable} produced no eligible recommendation. ` +
      `${summary.error} evaluation runs failed. ` +
      `${summary.notConfigured} have no matrix expectation.`;


    const status =
      summary.failedRuns >
        0 ||
      summary.error >
        0
        ? "error"
        : (
            summary.requiresAttention ===
              0 &&
            summary.notConfigured ===
              0
              ? "success"
              : "neutral"
          );


    setStatus(
      summaryElement,
      summaryText,
      status
    );

  }

   /*
    ============================================================
    49. EXPLANATION ACCESSORS
    ============================================================
  */


  function normalizeStringArray(
    value
  ) {

    if (
      !Array.isArray(
        value
      )
    ) {
      return [];
    }

    return value
      .map(
        normalizeText
      )
      .filter(
        Boolean
      );

  }



  function getEvaluationExplanation(
    evaluation
  ) {

    const explanation =
      evaluation
        ?.explanation;

    return explanation &&
      typeof explanation ===
        "object"
        ? explanation
        : null;

  }



  function getExplanationSummary(
    evaluation
  ) {

    const explanation =
      getEvaluationExplanation(
        evaluation
      );


    return (
      normalizeText(
        explanation
          ?.summary
      ) ||
      normalizeText(
        explanation
          ?.recommendationSummary
      ) ||
      normalizeText(
        explanation
          ?.headline
      ) ||
      normalizeText(
        evaluation
          ?.final
          ?.summary
      ) ||
      ""
    );

  }



  function getExplanationStrengths(
    evaluation
  ) {

    const explanation =
      getEvaluationExplanation(
        evaluation
      );


    const possibleCollections = [

      explanation
        ?.strengths,

      explanation
        ?.keyStrengths,

      explanation
        ?.positiveFactors,

      explanation
        ?.highlights,

      evaluation
        ?.final
        ?.strengths

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  function getExplanationLimitations(
    evaluation
  ) {

    const explanation =
      getEvaluationExplanation(
        evaluation
      );


    const possibleCollections = [

      explanation
        ?.limitations,

      explanation
        ?.keyLimitations,

      explanation
        ?.negativeFactors,

      explanation
        ?.cautions,

      explanation
        ?.warnings,

      evaluation
        ?.final
        ?.limitations

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  function getExplanationNextSteps(
    evaluation
  ) {

    const explanation =
      getEvaluationExplanation(
        evaluation
      );


    const possibleCollections = [

      explanation
        ?.nextSteps,

      explanation
        ?.recommendations,

      explanation
        ?.actions,

      explanation
        ?.managementNotes

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  /*
    ============================================================
    50. PHASE STATUS ACCESSORS
    ============================================================
  */


  function getEvaluationPhaseStatus(
    evaluation,
    phaseName
  ) {

    const phase =
      evaluation
        ?.[phaseName];


    return (
      phase
        ?.status ||
      phase
        ?.result ||
      phase
        ?.outcome ||
      null
    );

  }



  function getEligibilityStatus(
    evaluation
  ) {

    const eligibility =
      evaluation
        ?.eligibility;


    if (
      eligibility
        ?.eligible ===
        true
    ) {

      return {
        eligible:
          true,

        label:
          "Eligible"
      };

    }


    if (
      eligibility
        ?.eligible ===
        false
    ) {

      return {
        eligible:
          false,

        label:
          "Rejected"
      };

    }


    const status =
      getEvaluationPhaseStatus(
        evaluation,
        "eligibility"
      );


    if (
      [
        "eligible",
        "passed",
        "pass"
      ].includes(
        status
      )
    ) {

      return {
        eligible:
          true,

        label:
          formatIdentifier(
            status
          )
      };

    }


    if (
      [
        "rejected",
        "failed",
        "ineligible",
        "hard-failure"
      ].includes(
        status
      )
    ) {

      return {
        eligible:
          false,

        label:
          formatIdentifier(
            status
          )
      };

    }


    return {
      eligible:
        null,

      label:
        status
          ? formatIdentifier(
              status
            )
          : "Not Reported"
    };

  }



  function getEligibilityReasons(
    evaluation
  ) {

    const eligibility =
      evaluation
        ?.eligibility;


    const possibleCollections = [

      eligibility
        ?.reasons,

      eligibility
        ?.failures,

      eligibility
        ?.hardFailures,

      eligibility
        ?.limitations,

      eligibility
        ?.messages

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  /*
    ============================================================
    51. CONFIDENCE ACCESSORS
    ============================================================
  */


  function getInternalConfidenceScore(
    evaluation
  ) {

    const possibleValues = [

      evaluation
        ?.confidence
        ?.score,

      evaluation
        ?.confidence
        ?.confidenceScore,

      evaluation
        ?.final
        ?.confidenceScore

    ];


    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function getInternalConfidenceLabel(
    evaluation
  ) {

    return (
      evaluation
        ?.confidence
        ?.label ||
      evaluation
        ?.confidence
        ?.confidenceLabel ||
      evaluation
        ?.final
        ?.confidenceLabel ||
      (
        Number.isFinite(
          getInternalConfidenceScore(
            evaluation
          )
        )
          ? formatIdentifier(
              evaluation
                ?.confidence
                ?.band
            )
          : ""
      ) ||
      "Unavailable"
    );

  }



  function getConfidenceWarnings(
    evaluation
  ) {

    const confidence =
      evaluation
        ?.confidence;


    const possibleCollections = [

      confidence
        ?.warnings,

      confidence
        ?.limitations,

      confidence
        ?.missingDataNotes,

      confidence
        ?.dataGaps

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  /*
    ============================================================
    52. RISK ACCESSORS
    ============================================================
  */


  function getRiskSafetyScore(
    evaluation
  ) {

    const possibleValues = [

      evaluation
        ?.risks
        ?.score,

      evaluation
        ?.risks
        ?.safetyScore,

      evaluation
        ?.risks
        ?.riskSafetyScore,

      evaluation
        ?.final
        ?.riskSafetyScore

    ];


    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function getRiskPenalty(
    evaluation
  ) {

    const possibleValues = [

      evaluation
        ?.risks
        ?.penalty,

      evaluation
        ?.risks
        ?.totalPenalty,

      evaluation
        ?.final
        ?.riskPenalty

    ];


    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function getRiskWarnings(
    evaluation
  ) {

    const risks =
      evaluation
        ?.risks;


    const possibleCollections = [

      risks
        ?.warnings,

      risks
        ?.limitations,

      risks
        ?.riskFactors,

      risks
        ?.messages

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  /*
    ============================================================
    53. USE-PATH ACCESSORS
    ============================================================
  */


  function getEvaluationUsePathResults(
    evaluation
  ) {

    const usePaths =
      evaluation
        ?.usePaths;


    const possibleCollections = [

      usePaths
        ?.results,

      usePaths
        ?.evaluations,

      usePaths
        ?.paths,

      usePaths
        ?.rankedPaths,

      evaluation
        ?.usePathResults

    ];


    for (
      const collection of
        possibleCollections
    ) {

      if (
        Array.isArray(
          collection
        )
      ) {

        return collection;

      }

    }


    return [];

  }



  function getUsePathId(
    usePath
  ) {

    return (
      usePath
        ?.id ||
      usePath
        ?.usePathId ||
      usePath
        ?.pathId ||
      null
    );

  }



  function getUsePathLabel(
    usePath
  ) {

    return (
      usePath
        ?.label ||
      usePath
        ?.name ||
      formatIdentifier(
        getUsePathId(
          usePath
        )
      ) ||
      "Unnamed Use Path"
    );

  }



  function getUsePathScore(
    usePath
  ) {

    const possibleValues = [

      usePath
        ?.score,

      usePath
        ?.finalScore,

      usePath
        ?.suitabilityScore,

      usePath
        ?.weightedScore

    ];


    return possibleValues.find(
      Number.isFinite
    ) ??
      null;

  }



  function isUsePathEligible(
    usePath
  ) {

    if (
      usePath
        ?.eligible ===
        true
    ) {
      return true;
    }

    if (
      usePath
        ?.eligible ===
        false
    ) {
      return false;
    }


    if (
      usePath
        ?.hardFailure ===
        true
    ) {
      return false;
    }


    const status =
      usePath
        ?.status;


    if (
      [
        "eligible",
        "recommended",
        "passed",
        "pass"
      ].includes(
        status
      )
    ) {
      return true;
    }


    if (
      [
        "rejected",
        "failed",
        "ineligible",
        "hard-failure"
      ].includes(
        status
      )
    ) {
      return false;
    }


    return Number.isFinite(
      getUsePathScore(
        usePath
      )
    );

  }



  function getUsePathStrengths(
    usePath
  ) {

    const possibleCollections = [

      usePath
        ?.strengths,

      usePath
        ?.positiveFactors,

      usePath
        ?.advantages

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  function getUsePathLimitations(
    usePath
  ) {

    const possibleCollections = [

      usePath
        ?.limitations,

      usePath
        ?.warnings,

      usePath
        ?.negativeFactors,

      usePath
        ?.cautions

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  function getUsePathFailures(
    usePath
  ) {

    const possibleCollections = [

      usePath
        ?.hardFailures,

      usePath
        ?.failures,

      usePath
        ?.rejectionReasons

    ];


    for (
      const collection of
        possibleCollections
    ) {

      const normalized =
        normalizeStringArray(
          collection
        );

      if (
        normalized.length >
          0
      ) {

        return normalized;

      }

    }


    return [];

  }



  /*
    ============================================================
    54. GENERIC TEXT-LIST RENDERING
    ============================================================
  */


  function renderTextList(
    items,
    cssClass =
      ""
  ) {

    const normalized =
      normalizeStringArray(
        items
      );


    if (
      normalized.length ===
        0
    ) {
      return "";
    }


    return `
      <ul${cssClass
        ? ` class="${escapeHtml(
            cssClass
          )}"`
        : ""
      }>
        ${normalized
          .map(
            item => `
              <li>
                ${escapeHtml(
                  item
                )}
              </li>
            `
          )
          .join(
            ""
          )}
      </ul>
    `;

  }



  /*
    ============================================================
    55. SCORE CHIP RENDERING
    ============================================================
  */


  function renderEvaluationScoreChips(
    evaluation
  ) {

    const scoreDefinitions = [

      {
        id:
          "compatibility",

        label:
          "Compatibility",

        score:
          getEvaluationPhaseScore(
            evaluation,
            "compatibility"
          )
      },

      {
        id:
          "goals",

        label:
          "Goals",

        score:
          getEvaluationPhaseScore(
            evaluation,
            "goals"
          )
      },

      {
        id:
          "use-path",

        label:
          "Use Path",

        score:
          getEvaluationPhaseScore(
            evaluation,
            "usePaths"
          )
      },

      {
        id:
          "risk-safety",

        label:
          "Risk Safety",

        score:
          getRiskSafetyScore(
            evaluation
          )
      },

      {
        id:
          "confidence",

        label:
          "Confidence",

        score:
          getInternalConfidenceScore(
            evaluation
          )
      }

    ]
      .filter(
        definition =>
          Number.isFinite(
            definition.score
          )
      );


    if (
      scoreDefinitions.length ===
        0
    ) {

      return `
        <span class="ranking-factor-empty">
          No phase scores available
        </span>
      `;

    }


    return `
      <div class="test-score-row">
        ${scoreDefinitions
          .map(
            definition => `
              <span
                class="test-score-chip"
                data-score-category="${escapeHtml(
                  definition.id
                )}"
              >
                ${escapeHtml(
                  definition.label
                )}:
                ${formatScore(
                  definition.score
                )}
              </span>
            `
          )
          .join(
            ""
          )}
      </div>
    `;

  }



  /*
    ============================================================
    56. BEST USE-PATH RENDERING
    ============================================================
  */


  function renderBestUsePathSummary(
    evaluation,
    publicResult
  ) {

    const publicBestPath =
      getPublicBestUsePath(
        publicResult
      );

    const internalBestPath =
      getEvaluationBestUsePath(
        evaluation
      );

    const bestPath =
      publicBestPath ||
      internalBestPath;


    if (
      !bestPath
    ) {

      return `
        <p>
          <strong>
            Best Use Path:
          </strong>

          No eligible use path
        </p>
      `;

    }


    const pathLabel =
      bestPath.label ||
      bestPath.name ||
      formatIdentifier(
        bestPath.id ||
        bestPath.usePathId
      ) ||
      "Unnamed Use Path";

    const pathScore =
      getUsePathScore(
        bestPath
      );


    return `
      <p>
        <strong>
          Best Use Path:
        </strong>

        ${escapeHtml(
          pathLabel
        )}

        ${
          Number.isFinite(
            pathScore
          )
            ? `
              <span>
                (${formatPercent(
                  pathScore
                )})
              </span>
            `
            : ""
        }
      </p>

      ${
        normalizeText(
          bestPath.description
        )
          ? `
            <p>
              ${escapeHtml(
                bestPath.description
              )}
            </p>
          `
          : ""
      }
    `;

  }



  /*
    ============================================================
    57. USE-PATH CARD RENDERING
    ============================================================
  */


  function renderUsePathCard(
    usePath
  ) {

    const eligible =
      isUsePathEligible(
        usePath
      );

    const score =
      getUsePathScore(
        usePath
      );

    const strengths =
      getUsePathStrengths(
        usePath
      );

    const limitations =
      getUsePathLimitations(
        usePath
      );

    const failures =
      getUsePathFailures(
        usePath
      );


    return `
      <div class="use-path-test-card${
        eligible
          ? ""
          : " use-path-failure"
      }">

        <strong>
          ${escapeHtml(
            getUsePathLabel(
              usePath
            )
          )}
        </strong>

        <p>
          Score:
          ${
            Number.isFinite(
              score
            )
              ? formatPercent(
                  score
                )
              : "N/A"
          }
        </p>

        <p>
          Status:
          ${
            eligible
              ? "✅ Eligible"
              : "❌ Not Eligible"
          }
        </p>

        ${
          strengths.length >
            0
            ? `
              <p>
                <strong>
                  Strengths
                </strong>
              </p>

              ${renderTextList(
                strengths
              )}
            `
            : ""
        }

        ${
          limitations.length >
            0
            ? `
              <p>
                <strong>
                  Limitations
                </strong>
              </p>

              ${renderTextList(
                limitations
              )}
            `
            : ""
        }

        ${
          failures.length >
            0
            ? `
              <p>
                <strong>
                  Failures
                </strong>
              </p>

              ${renderTextList(
                failures
              )}
            `
            : ""
        }

      </div>
    `;

  }



  function renderUsePathDiagnostics(
    evaluation
  ) {

    const usePathResults =
      getEvaluationUsePathResults(
        evaluation
      );


    if (
      usePathResults.length ===
        0
    ) {

      return `
        <p>
          No individual use-path diagnostics were returned.
        </p>
      `;

    }


    const sortedPaths =
      usePathResults
        .slice()
        .sort(
          (
            first,
            second
          ) => {

            const firstEligible =
              isUsePathEligible(
                first
              );

            const secondEligible =
              isUsePathEligible(
                second
              );


            if (
              firstEligible !==
              secondEligible
            ) {

              return firstEligible
                ? -1
                : 1;

            }


            return (
              getUsePathScore(
                second
              ) ??
              -Infinity
            ) -
            (
              getUsePathScore(
                first
              ) ??
              -Infinity
            );

          }
        );


    return `
      <div class="use-path-diagnostic-grid">
        ${sortedPaths
          .map(
            renderUsePathCard
          )
          .join(
            ""
          )}
      </div>
    `;

  }



  /*
    ============================================================
    58. EXPLANATION RENDERING
    ============================================================
  */


  function renderEvaluationExplanation(
    evaluation
  ) {

    const summary =
      getExplanationSummary(
        evaluation
      );

    const strengths =
      getExplanationStrengths(
        evaluation
      );

    const limitations =
      getExplanationLimitations(
        evaluation
      );

    const nextSteps =
      getExplanationNextSteps(
        evaluation
      );


    if (
      !summary &&
      strengths.length ===
        0 &&
      limitations.length ===
        0 &&
      nextSteps.length ===
        0
    ) {

      return `
        <p>
          No recommendation explanation was returned.
        </p>
      `;

    }


    return `
      ${
        summary
          ? `
            <p>
              ${escapeHtml(
                summary
              )}
            </p>
          `
          : ""
      }

      ${
        strengths.length >
          0
          ? `
            <h5>
              Main Strengths
            </h5>

            ${renderTextList(
              strengths
            )}
          `
          : ""
      }

      ${
        limitations.length >
          0
          ? `
            <h5>
              Main Limitations
            </h5>

            ${renderTextList(
              limitations
            )}
          `
          : ""
      }

      ${
        nextSteps.length >
          0
          ? `
            <h5>
              Suggested Next Steps
            </h5>

            ${renderTextList(
              nextSteps
            )}
          `
          : ""
      }
    `;

  }



  /*
    ============================================================
    59. RISK AND CONFIDENCE RENDERING
    ============================================================
  */


  function renderRiskAndConfidenceSummary(
    evaluation,
    publicResult
  ) {

    const riskSafetyScore =
      getRiskSafetyScore(
        evaluation
      ) ??
      getPublicRiskSafetyScore(
        publicResult
      );

    const riskPenalty =
      getRiskPenalty(
        evaluation
      );

    const confidenceScore =
      getInternalConfidenceScore(
        evaluation
      ) ??
      getPublicConfidenceScore(
        publicResult
      );

    const confidenceLabel =
      getInternalConfidenceLabel(
        evaluation
      );

    const riskWarnings =
      getRiskWarnings(
        evaluation
      );

    const confidenceWarnings =
      getConfidenceWarnings(
        evaluation
      );


    return `
      <div class="test-card-grid">

        <div class="test-card">
          <strong>
            Risk Safety
          </strong>

          <p>
            ${
              Number.isFinite(
                riskSafetyScore
              )
                ? formatPercent(
                    riskSafetyScore
                  )
                : "Unavailable"
            }
          </p>

          ${
            Number.isFinite(
              riskPenalty
            )
              ? `
                <p>
                  Penalty:
                  ${formatScore(
                    riskPenalty
                  )}
                  points
                </p>
              `
              : ""
          }
        </div>

        <div class="test-card">
          <strong>
            Confidence
          </strong>

          <p>
            ${escapeHtml(
              confidenceLabel
            )}
          </p>

          <p>
            ${
              Number.isFinite(
                confidenceScore
              )
                ? formatPercent(
                    confidenceScore
                  )
                : "Unavailable"
            }
          </p>
        </div>

      </div>

      ${
        riskWarnings.length >
          0
          ? `
            <h5>
              Risk Warnings
            </h5>

            ${renderTextList(
              riskWarnings
            )}
          `
          : ""
      }

      ${
        confidenceWarnings.length >
          0
          ? `
            <h5>
              Confidence Warnings
            </h5>

            ${renderTextList(
              confidenceWarnings
            )}
          `
          : ""
      }
    `;

  }



  /*
    ============================================================
    60. SINGLE RECOMMENDATION CARD
    ============================================================
  */


  function renderDetailedRecommendationCard(
    profileRun,
    publicResult,
    index
  ) {

    const evaluation =
      findInternalEvaluationForPublicResult(
        profileRun,
        publicResult
      );

    const cropName =
      getPublicCropName(
        publicResult
      );

    const suitabilityScore =
      getPublicSuitabilityScore(
        publicResult
      );

    const rank =
      getPublicRank(
        publicResult
      ) ??
      index +
      1;

    const statusLabel =
      getPublicStatusLabel(
        publicResult
      );

    const tierLabel =
      getPublicTierLabel(
        publicResult
      );

    const eligibility =
      getEligibilityStatus(
        evaluation
      );

    const eligibilityReasons =
      getEligibilityReasons(
        evaluation
      );


    return `
      <article
        class="multi-crop-card"
        data-crop-result="${escapeHtml(
          getPublicCropId(
            publicResult
          ) ||
          ""
        )}"
      >

        <h4>
          #${escapeHtml(
            rank
          )}
          ${escapeHtml(
            cropName
          )}
        </h4>

        <p>
          <strong>
            Overall Score:
          </strong>

          ${formatPercent(
            suitabilityScore
          )}
        </p>

        <p>
          <strong>
            Status:
          </strong>

          ${escapeHtml(
            statusLabel
          )}
        </p>

        <p>
          <strong>
            Tier:
          </strong>

          ${escapeHtml(
            tierLabel
          )}
        </p>

        <p>
          <strong>
            Eligibility:
          </strong>

          ${
            eligibility.eligible ===
              true
              ? "✅"
              : (
                  eligibility.eligible ===
                    false
                    ? "❌"
                    : "⚠"
                )
          }

          ${escapeHtml(
            eligibility.label
          )}
        </p>

        ${
          evaluation
            ? renderEvaluationScoreChips(
                evaluation
              )
            : `
              <p>
                Internal scoring diagnostics were unavailable.
              </p>
            `
        }

        ${renderBestUsePathSummary(
          evaluation,
          publicResult
        )}

        <details>

          <summary>
            Explanation
          </summary>

          ${
            evaluation
              ? renderEvaluationExplanation(
                  evaluation
                )
              : `
                <p>
                  No internal explanation was available.
                </p>
              `
          }

        </details>

        <details>

          <summary>
            Risk and Confidence
          </summary>

          ${
            evaluation
              ? renderRiskAndConfidenceSummary(
                  evaluation,
                  publicResult
                )
              : `
                <p>
                  Risk and confidence diagnostics were unavailable.
                </p>
              `
          }

        </details>

        <details>

          <summary>
            Use-Path Diagnostics
          </summary>

          ${
            evaluation
              ? renderUsePathDiagnostics(
                  evaluation
                )
              : `
                <p>
                  Use-path diagnostics were unavailable.
                </p>
              `
          }

        </details>

        ${
          eligibilityReasons.length >
            0
            ? `
              <details>

                <summary>
                  Eligibility Notes
                </summary>

                ${renderTextList(
                  eligibilityReasons
                )}

              </details>
            `
            : ""
        }

      </article>
    `;

  }



  /*
    ============================================================
    61. UNRANKED AND REJECTED RESULT ACCESSORS
    ============================================================
  */


  function getUnrankedEvaluations(
    profileRun
  ) {

    const rankedIds =
      new Set(
        profileRun
          ?.rankedEvaluations
          ?.map(
            getEvaluationCropId
          )
          .filter(
            Boolean
          ) ||
        []
      );


    return profileRun
      ?.evaluations
      ?.filter(
        evaluation => {

          const cropId =
            getEvaluationCropId(
              evaluation
            );

          return (
            !cropId ||
            !rankedIds.has(
              cropId
            )
          );

        }
      ) ||
      [];

  }



  function getEvaluationDiagnosticReason(
    evaluation
  ) {

    const eligibilityReasons =
      getEligibilityReasons(
        evaluation
      );

    if (
      eligibilityReasons.length >
        0
    ) {

      return eligibilityReasons[0];

    }


    const limitations =
      getExplanationLimitations(
        evaluation
      );

    if (
      limitations.length >
        0
    ) {

      return limitations[0];

    }


    const status =
      getEvaluationStatus(
        evaluation
      );


    return status
      ? formatIdentifier(
          status
        )
      : "No diagnostic reason was returned.";

  }



  function renderUnrankedEvaluationCard(
    evaluation
  ) {

    const eligibility =
      getEligibilityStatus(
        evaluation
      );

    const finalScore =
      getEvaluationFinalScore(
        evaluation
      );

    const bestUsePath =
      getEvaluationBestUsePath(
        evaluation
      );


    return `
      <div class="test-card">

        <strong>
          ${escapeHtml(
            getEvaluationCropName(
              evaluation
            )
          )}
        </strong>

        <p>
          Crop ID:
          <code>
            ${escapeHtml(
              getEvaluationCropId(
                evaluation
              ) ||
              "Unavailable"
            )}
          </code>
        </p>

        <p>
          Status:
          ${escapeHtml(
            formatIdentifier(
              getEvaluationStatus(
                evaluation
              )
            ) ||
            "Unranked"
          )}
        </p>

        <p>
          Eligibility:
          ${escapeHtml(
            eligibility.label
          )}
        </p>

        <p>
          Score:
          ${
            Number.isFinite(
              finalScore
            )
              ? formatPercent(
                  finalScore
                )
              : "Unavailable"
          }
        </p>

        <p>
          Best Use Path:
          ${
            bestUsePath
              ? escapeHtml(
                  bestUsePath.label ||
                  bestUsePath.id ||
                  "Unnamed"
                )
              : "None"
          }
        </p>

        <p>
          <strong>
            Diagnostic:
          </strong>

          ${escapeHtml(
            getEvaluationDiagnosticReason(
              evaluation
            )
          )}
        </p>

      </div>
    `;

  }



  function renderUnrankedDiagnostics(
    profileRun
  ) {

    const unranked =
      getUnrankedEvaluations(
        profileRun
      );


    if (
      unranked.length ===
        0
    ) {

      return `
        <p>
          Every evaluated crop received a ranked result.
        </p>
      `;

    }


    return `
      <div class="test-card-grid">
        ${unranked
          .map(
            renderUnrankedEvaluationCard
          )
          .join(
            ""
          )}
      </div>
    `;

  }



  /*
    ============================================================
    62. PROFILE RESULT HEADER
    ============================================================
  */


  function renderProfileResultHeader(
    profileRun
  ) {

    const recommendations =
      getEligiblePublicRecommendations(
        profileRun
      );

    const totalEvaluations =
      profileRun
        ?.evaluations
        ?.length ||
      0;

    const unrankedCount =
      getUnrankedEvaluations(
        profileRun
      )
        .length;


    return `
      <div class="test-card-grid">

        <div class="test-card">
          <strong>
            Crops Evaluated
          </strong>

          ${totalEvaluations}
        </div>

        <div class="test-card">
          <strong>
            Eligible Rankings
          </strong>

          ${recommendations.length}
        </div>

        <div class="test-card">
          <strong>
            Unranked or Rejected
          </strong>

          ${unrankedCount}
        </div>

        <div class="test-card">
          <strong>
            Evaluation Status
          </strong>

          ${
            profileRun.success
              ? "Completed"
              : "Failed"
          }
        </div>

      </div>
    `;

  }



  /*
    ============================================================
    63. SINGLE PROFILE DETAIL RENDERING
    ============================================================
  */


  function renderDetailedProfileResult(
    profileRun
  ) {

    const recommendations =
      getEligiblePublicRecommendations(
        profileRun
      );


    if (
      !profileRun.success
    ) {

      return `
        <article
          class="multi-profile-result"
          data-profile-result="${escapeHtml(
            profileRun.profileId
          )}"
        >

          <h3>
            ${escapeHtml(
              profileRun.profileLabel
            )}
          </h3>

          <p class="foundation-status foundation-status-error">
            This profile evaluation failed.
          </p>

          <p>
            ${escapeHtml(
              profileRun.error
                ?.message ||
              "No error message was returned."
            )}
          </p>

        </article>
      `;

    }


    const recommendationCards =
      recommendations.length >
        0
        ? recommendations
            .map(
              (
                recommendation,
                index
              ) =>
                renderDetailedRecommendationCard(
                  profileRun,
                  recommendation,
                  index
                )
            )
            .join(
              ""
            )
        : `
            <p>
              No eligible recommendations were produced for this
              profile.
            </p>
          `;


    return `
      <article
        class="multi-profile-result"
        data-profile-result="${escapeHtml(
          profileRun.profileId
        )}"
      >

        <h3>
          ${escapeHtml(
            profileRun.profileLabel
          )}
        </h3>

        <p>
          <code>
            ${escapeHtml(
              profileRun.profileId
            )}
          </code>
        </p>

        <div class="profile-purpose">
          ${renderProfileSummary(
            profileRun.profile
          )}
        </div>

        ${renderProfileResultHeader(
          profileRun
        )}

        <h4>
          Ranked Recommendations
        </h4>

        <div class="multi-crop-ranking">
          ${recommendationCards}
        </div>

        <details>

          <summary>
            Unranked and Rejected Crop Diagnostics
          </summary>

          ${renderUnrankedDiagnostics(
            profileRun
          )}

        </details>

      </article>
    `;

  }



  /*
    ============================================================
    64. MULTI-CROP RESULTS RENDERING
    ============================================================
  */


  function renderMultiCropSampleTests()
  {

    const summaryElement =
      getElement(
        "multi-crop-test-summary"
      );

    const resultsElement =
      getElement(
        "multi-crop-test-results"
      );


    if (
      !summaryElement ||
      !resultsElement
    ) {
      return;
    }


    if (
      uiState.profileRuns.length ===
        0
    ) {

      setStatus(
        summaryElement,
        "No multi-crop evaluations were available.",
        "error"
      );

      setElementHtml(
        resultsElement,
        `
          <p>
            The sample-profile ranking tests could not run.
          </p>
        `
      );

      return;

    }


    const successfulRuns =
      uiState.profileRuns
        .filter(
          profileRun =>
            profileRun.success
        )
        .length;

    const failedRuns =
      uiState.profileRuns
        .length -
      successfulRuns;

    const totalRankedRecommendations =
      uiState.profileRuns
        .reduce(
          (
            total,
            profileRun
          ) =>
            total +
            getEligiblePublicRecommendations(
              profileRun
            )
              .length,
          0
        );


    setStatus(
      summaryElement,
      `${uiState.crops.length} crops were evaluated across ${uiState.profileRuns.length} sample profiles. ${successfulRuns} runs completed, ${failedRuns} failed, and ${totalRankedRecommendations} eligible ranked recommendations were produced.`,
      failedRuns ===
        0
        ? "success"
        : "error"
    );


    setElementHtml(
      resultsElement,
      uiState.profileRuns
        .map(
          renderDetailedProfileResult
        )
        .join(
          ""
        )
    );

  }
  
    /*
    ============================================================
    65. SUNFLOWER TEST CONSTANTS
    ============================================================
  */


  const SUNFLOWER_CROP_IDS =
    Object.freeze([

      "sunflower",

      "sunflowers",

      "common-sunflower"

    ]);


  /*
    ============================================================
    66. SUNFLOWER RESULT ACCESSORS
    ============================================================
  */


  function isSunflowerCropId(
    cropId
  ) {

    const normalizedId =
      normalizeText(
        cropId
      )
        .toLowerCase();


    return SUNFLOWER_CROP_IDS
      .includes(
        normalizedId
      ) ||
      normalizedId
        .includes(
          "sunflower"
        );

  }



  function findSunflowerEvaluation(
    profileRun
  ) {

    if (
      !profileRun ||
      !Array.isArray(
        profileRun.evaluations
      )
    ) {
      return null;
    }


    return profileRun
      .evaluations
      .find(
        evaluation =>
          isSunflowerCropId(
            getEvaluationCropId(
              evaluation
            )
          )
      ) ||
      null;

  }



  function findSunflowerPublicResult(
    profileRun
  ) {

    if (
      !profileRun
    ) {
      return null;
    }


    const recommendations =
      getPublicRecommendationsFromRun(
        profileRun
      );

    const unranked =
      getPublicUnrankedFromRun(
        profileRun
      );


    return [
      ...recommendations,
      ...unranked
    ]
      .find(
        result =>
          isSunflowerCropId(
            getPublicCropId(
              result
            )
          )
      ) ||
      null;

  }



  function getSunflowerRank(
    profileRun
  ) {

    const publicResult =
      findSunflowerPublicResult(
        profileRun
      );


    if (
      publicResult
    ) {

      return getPublicRank(
        publicResult
      );

    }


    const evaluation =
      findSunflowerEvaluation(
        profileRun
      );


    return getEvaluationRank(
      evaluation
    );

  }



  function getSunflowerScore(
    profileRun
  ) {

    const publicResult =
      findSunflowerPublicResult(
        profileRun
      );


    if (
      publicResult
    ) {

      return getPublicSuitabilityScore(
        publicResult
      );

    }


    const evaluation =
      findSunflowerEvaluation(
        profileRun
      );


    return getEvaluationFinalScore(
      evaluation
    );

  }



  function getSunflowerBestUsePath(
    profileRun
  ) {

    const publicResult =
      findSunflowerPublicResult(
        profileRun
      );

    const publicUsePath =
      getPublicBestUsePath(
        publicResult
      );


    if (
      publicUsePath
    ) {

      return publicUsePath;

    }


    const evaluation =
      findSunflowerEvaluation(
        profileRun
      );


    return getEvaluationBestUsePath(
      evaluation
    );

  }



  /*
    ============================================================
    67. SUNFLOWER TEST CLASSIFICATION
    ============================================================
  */


  function classifySunflowerProfileResult(
    profileRun
  ) {

    if (
      !profileRun.success
    ) {

      return {

        status:
          "error",

        label:
          "Evaluation Error",

        className:
          "profile-matrix-fail"

      };

    }


    const evaluation =
      findSunflowerEvaluation(
        profileRun
      );


    if (
      !evaluation
    ) {

      return {

        status:
          "missing",

        label:
          "Not Evaluated",

        className:
          "profile-matrix-fail"

      };

    }


    const eligibility =
      getEligibilityStatus(
        evaluation
      );

    const score =
      getSunflowerScore(
        profileRun
      );

    const rank =
      getSunflowerRank(
        profileRun
      );

    const bestUsePath =
      getSunflowerBestUsePath(
        profileRun
      );


    if (
      eligibility.eligible ===
        false
    ) {

      return {

        status:
          "rejected",

        label:
          "Rejected",

        className:
          "profile-matrix-review"

      };

    }


    if (
      !bestUsePath
    ) {

      return {

        status:
          "no-use-path",

        label:
          "No Eligible Use Path",

        className:
          "profile-matrix-review"

      };

    }


    if (
      Number.isFinite(
        rank
      ) &&
      rank <=
        3
    ) {

      return {

        status:
          "top-three",

        label:
          "Top 3",

        className:
          "profile-matrix-pass"

      };

    }


    if (
      Number.isFinite(
        score
      )
    ) {

      return {

        status:
          "ranked",

        label:
          "Ranked",

        className:
          "profile-matrix-na"

      };

    }


    return {

      status:
        "unavailable",

      label:
        "Unavailable",

      className:
        "profile-matrix-fail"

    };

  }



  /*
    ============================================================
    68. SUNFLOWER PROFILE CARD
    ============================================================
  */


  function renderSunflowerProfileCard(
    profileRun
  ) {

    const evaluation =
      findSunflowerEvaluation(
        profileRun
      );

    const publicResult =
      findSunflowerPublicResult(
        profileRun
      );

    const classification =
      classifySunflowerProfileResult(
        profileRun
      );

    const score =
      getSunflowerScore(
        profileRun
      );

    const rank =
      getSunflowerRank(
        profileRun
      );

    const bestUsePath =
      getSunflowerBestUsePath(
        profileRun
      );

    const eligibility =
      getEligibilityStatus(
        evaluation
      );

    const eligibilityReasons =
      getEligibilityReasons(
        evaluation
      );

    const explanationSummary =
      getExplanationSummary(
        evaluation
      );

    const riskWarnings =
      getRiskWarnings(
        evaluation
      );

    const confidenceWarnings =
      getConfidenceWarnings(
        evaluation
      );


    return `
      <article
        class="test-card sunflower-profile-test"
        data-sunflower-profile="${escapeHtml(
          profileRun.profileId
        )}"
      >

        <h4>
          ${escapeHtml(
            profileRun.profileLabel
          )}
        </h4>

        <p>
          <code>
            ${escapeHtml(
              profileRun.profileId
            )}
          </code>
        </p>

        <p>
          <strong>
            Sunflower Status:
          </strong>

          <span class="${escapeHtml(
            classification.className
          )}">
            ${escapeHtml(
              classification.label
            )}
          </span>
        </p>

        <p>
          <strong>
            Eligibility:
          </strong>

          ${escapeHtml(
            eligibility.label
          )}
        </p>

        <p>
          <strong>
            Rank:
          </strong>

          ${
            Number.isFinite(
              rank
            )
              ? `#${rank}`
              : "Unranked"
          }
        </p>

        <p>
          <strong>
            Final Score:
          </strong>

          ${
            Number.isFinite(
              score
            )
              ? formatPercent(
                  score
                )
              : "Unavailable"
          }
        </p>

        <p>
          <strong>
            Best Use Path:
          </strong>

          ${
            bestUsePath
              ? escapeHtml(
                  bestUsePath.label ||
                  bestUsePath.name ||
                  bestUsePath.id ||
                  "Unnamed Use Path"
                )
              : "None"
          }
        </p>

        ${
          evaluation
            ? renderEvaluationScoreChips(
                evaluation
              )
            : ""
        }

        ${
          explanationSummary
            ? `
              <p>
                <strong>
                  Explanation:
                </strong>

                ${escapeHtml(
                  explanationSummary
                )}
              </p>
            `
            : ""
        }

        ${
          eligibilityReasons.length >
            0
            ? `
              <details>

                <summary>
                  Eligibility Diagnostics
                </summary>

                ${renderTextList(
                  eligibilityReasons
                )}

              </details>
            `
            : ""
        }

        ${
          riskWarnings.length >
            0
            ? `
              <details>

                <summary>
                  Risk Diagnostics
                </summary>

                ${renderTextList(
                  riskWarnings
                )}

              </details>
            `
            : ""
        }

        ${
          confidenceWarnings.length >
            0
            ? `
              <details>

                <summary>
                  Confidence Diagnostics
                </summary>

                ${renderTextList(
                  confidenceWarnings
                )}

              </details>
            `
            : ""
        }

        ${
          evaluation
            ? `
              <details>

                <summary>
                  Sunflower Use-Path Results
                </summary>

                ${renderUsePathDiagnostics(
                  evaluation
                )}

              </details>
            `
            : ""
        }

      </article>
    `;

  }



  /*
    ============================================================
    69. SUNFLOWER TEST SUMMARY
    ============================================================
  */


  function summarizeSunflowerTests()
  {

    const summary = {

      totalProfiles:
        uiState.profileRuns
          .length,

      evaluated:
        0,

      topThree:
        0,

      ranked:
        0,

      rejected:
        0,

      noUsePath:
        0,

      missing:
        0,

      errors:
        0

    };


    uiState.profileRuns
      .forEach(
        profileRun => {

          const classification =
            classifySunflowerProfileResult(
              profileRun
            );


          switch (
            classification.status
          ) {

            case "top-three":

              summary.evaluated +=
                1;

              summary.topThree +=
                1;

              break;

            case "ranked":

              summary.evaluated +=
                1;

              summary.ranked +=
                1;

              break;

            case "rejected":

              summary.evaluated +=
                1;

              summary.rejected +=
                1;

              break;

            case "no-use-path":

              summary.evaluated +=
                1;

              summary.noUsePath +=
                1;

              break;

            case "error":

              summary.errors +=
                1;

              break;

            case "missing":

              summary.missing +=
                1;

              break;

            default:

              summary.evaluated +=
                1;

          }

        }
      );


    return summary;

  }



  /*
    ============================================================
    70. SUNFLOWER TEST RENDERING
    ============================================================
  */


  function renderSunflowerSampleTests()
  {

    const summaryElement =
      getElement(
        "sunflower-test-summary"
      );

    const resultsElement =
      getElement(
        "sunflower-test-results"
      );


    if (
      !summaryElement ||
      !resultsElement
    ) {
      return;
    }


    if (
      uiState.profileRuns.length ===
        0
    ) {

      setStatus(
        summaryElement,
        "No profile evaluations were available for Sunflower testing.",
        "error"
      );

      setElementHtml(
        resultsElement,
        `
          <p>
            Sunflower diagnostics could not run because no sample
            profiles were evaluated.
          </p>
        `
      );

      return;

    }


    const sunflowerExists =
      uiState.crops.some(
        crop =>
          isSunflowerCropId(
            getCropId(
              crop
            )
          )
      );


    if (
      !sunflowerExists
    ) {

      setStatus(
        summaryElement,
        "No registered Sunflower crop record was found.",
        "error"
      );

      setElementHtml(
        resultsElement,
        `
          <p>
            The Sunflower-specific test section requires a
            registered crop whose ID contains
            <code>sunflower</code>.
          </p>
        `
      );

      return;

    }


    const summary =
      summarizeSunflowerTests();


    const status =
      summary.errors >
        0 ||
      summary.missing >
        0
        ? "error"
        : "success";


    setStatus(
      summaryElement,
      `Sunflower was evaluated across ${summary.totalProfiles} profiles. It placed in the Top 3 for ${summary.topThree}, ranked below the Top 3 for ${summary.ranked}, was rejected for ${summary.rejected}, and had no eligible use path for ${summary.noUsePath}.`,
      status
    );


    setElementHtml(
      resultsElement,
      `
        <div class="test-card-grid">

          <div class="test-card">
            <strong>
              Profiles Tested
            </strong>

            ${summary.totalProfiles}
          </div>

          <div class="test-card">
            <strong>
              Top 3 Results
            </strong>

            ${summary.topThree}
          </div>

          <div class="test-card">
            <strong>
              Other Ranked Results
            </strong>

            ${summary.ranked}
          </div>

          <div class="test-card">
            <strong>
              Rejected Results
            </strong>

            ${summary.rejected}
          </div>

          <div class="test-card">
            <strong>
              No Use Path
            </strong>

            ${summary.noUsePath}
          </div>

          <div class="test-card">
            <strong>
              Missing or Failed
            </strong>

            ${summary.missing + summary.errors}
          </div>

        </div>

        <div
          class="test-card-grid"
          style="margin-top:18px;"
        >
          ${uiState.profileRuns
            .map(
              renderSunflowerProfileCard
            )
            .join(
              ""
            )}
        </div>
      `
    );

  }



  /*
    ============================================================
    71. DASHBOARD ERROR REPORT ACCESSORS
    ============================================================
  */


  function getDashboardErrorContainer()
  {

    return (
      getElement(
        "planner-ui-error-report"
      ) ||
      getElement(
        "planner-error-report"
      ) ||
      getElement(
        "dashboard-error-report"
      )
    );

  }



  function getDashboardWarningContainer()
  {

    return (
      getElement(
        "planner-ui-warning-report"
      ) ||
      getElement(
        "planner-warning-report"
      ) ||
      getElement(
        "dashboard-warning-report"
      )
    );

  }



  /*
    ============================================================
    72. DASHBOARD ERROR REPORT RENDERING
    ============================================================
  */


  function renderDashboardErrors()
  {

    const container =
      getDashboardErrorContainer();


    if (
      !container
    ) {
      return;
    }


    if (
      uiState.errors.length ===
        0
    ) {

      setElementHtml(
        container,
        `
          <p class="foundation-status foundation-status-success">
            No UI execution errors were recorded.
          </p>
        `
      );

      return;

    }


    setElementHtml(
      container,
      `
        <p class="foundation-status foundation-status-error">
          ${uiState.errors.length} UI execution error(s) were
          recorded.
        </p>

        <ol>
          ${uiState.errors
            .map(
              error => `
                <li>
                  <strong>
                    ${escapeHtml(
                      error.context ||
                      error.name ||
                      "UI Error"
                    )}
                  </strong>

                  <br>

                  ${escapeHtml(
                    error.message
                  )}
                </li>
              `
            )
            .join(
              ""
            )}
        </ol>
      `
    );

  }



  /*
    ============================================================
    73. DASHBOARD WARNING REPORT RENDERING
    ============================================================
  */


  function renderDashboardWarnings()
  {

    const container =
      getDashboardWarningContainer();


    if (
      !container
    ) {
      return;
    }


    if (
      uiState.warnings.length ===
        0
    ) {

      setElementHtml(
        container,
        `
          <p>
            No UI warnings were recorded.
          </p>
        `
      );

      return;

    }


    setElementHtml(
      container,
      `
        <p>
          ${uiState.warnings.length} UI warning(s) were recorded.
        </p>

        <ol>
          ${uiState.warnings
            .map(
              warning => `
                <li>
                  ${
                    warning.context
                      ? `
                        <strong>
                          ${escapeHtml(
                            warning.context
                          )}
                        </strong>

                        <br>
                      `
                      : ""
                  }

                  ${escapeHtml(
                    warning.message
                  )}
                </li>
              `
            )
            .join(
              ""
            )}
        </ol>
      `
    );

  }



  /*
    ============================================================
    74. COMPLETE DASHBOARD REFRESH
    ============================================================
  */


  function refreshDevelopmentPage()
  {

    uiState.initialized =
      false;

    uiState.initializing =
      false;

    uiState.initializedAt =
      null;

    uiState.engineHealth =
      null;

    uiState.registrationReport =
      null;

    uiState.crops =
      [];

    uiState.sampleProfiles =
      [];

    uiState.profileExpectations =
      {};

    uiState.profileRuns =
      [];

    uiState.profileRunById =
      new Map();

    uiState.errors =
      [];

    uiState.warnings =
      [];


    const result =
      initializeDevelopmentPage();


    renderDashboardErrors();

    renderDashboardWarnings();


    return result;

  }



  /*
    ============================================================
    75. UI HEALTH REPORT
    ============================================================
  */


  function getUiHealth()
  {

    const engineHealth =
      uiState.engineHealth ||
      readEngineHealth();


    return {

      healthy:
        uiState.initialized &&
        engineHealth.healthy ===
          true &&
        uiState.errors.length ===
          0,

      status:
        uiState.initializing
          ? "initializing"
          : (
              uiState.initialized
                ? (
                    uiState.errors.length ===
                      0
                      ? "ready"
                      : "ready-with-errors"
                  )
                : "not-initialized"
            ),

      uiVersion:
        UI_VERSION,

      engineVersion:
        engineHealth.engineVersion ||
        null,

      engineApiVersion:
        engineHealth.apiVersion ||
        null,

      initialized:
        uiState.initialized,

      initializedAt:
        uiState.initializedAt,

      registeredCropCount:
        uiState.crops.length,

      sampleProfileCount:
        uiState.sampleProfiles.length,

      completedProfileRunCount:
        uiState.profileRuns
          .filter(
            profileRun =>
              profileRun.success
          )
          .length,

      failedProfileRunCount:
        uiState.profileRuns
          .filter(
            profileRun =>
              !profileRun.success
          )
          .length,

      errorCount:
        uiState.errors.length,

      warningCount:
        uiState.warnings.length

    };

  }



  /*
    ============================================================
    76. PROFILE RESULT ACCESS API
    ============================================================
  */


  function getProfileRun(
    profileId
  ) {

    if (
      !profileId
    ) {
      return null;
    }


    return uiState
      .profileRunById
      .get(
        profileId
      ) ||
      null;

  }



  function getAllProfileRuns()
  {

    return uiState.profileRuns
      .slice();

  }



  function getUiStateSnapshot()
  {

    return {

      initialized:
        uiState.initialized,

      initializing:
        uiState.initializing,

      initializedAt:
        uiState.initializedAt,

      engineHealth:
        uiState.engineHealth,

      registrationReport:
        uiState.registrationReport,

      cropCount:
        uiState.crops.length,

      sampleProfileCount:
        uiState.sampleProfiles.length,

      profileRunCount:
        uiState.profileRuns.length,

      errors:
        uiState.errors.map(
          error => ({
            context:
              error.context,

            name:
              error.name,

            message:
              error.message
          })
        ),

      warnings:
        uiState.warnings.map(
          warning => ({
            context:
              warning.context,

            message:
              warning.message
          })
        )

    };

  }



  /*
    ============================================================
    77. PUBLIC UI API
    ============================================================
  */


  const publicUiApi =
    Object.freeze({

      version:
        UI_VERSION,

      initialize:
        initializeDevelopmentPage,

      initializeDevelopmentPage:
        initializeDevelopmentPage, 

      refresh:
        refreshDevelopmentPage,

      refreshDevelopmentPage:
        refreshDevelopmentPage,  

      getHealth:
        getUiHealth,

      getState:
        getUiStateSnapshot,

      getProfileRun,

      getAllProfileRuns,

      analyzeProfile:
        analyzeProfileResult,

      renderFoundationStatus,

      renderCropRegistrationReport,

      renderCropValidationReport,

      renderSampleProfileList,

      renderProfileMatrix,

      renderMultiCropSampleTests,

      renderSunflowerSampleTests,

      renderDashboardErrors,

      renderDashboardWarnings

    });



  namespace.ui =
    publicUiApi;


  namespace.feedCropPlannerUI =
    publicUiApi;


  namespace.initializeFeedCropPlannerUI =
    initializeDevelopmentPage;


  namespace.refreshFeedCropPlannerUI =
    refreshDevelopmentPage;


  namespace.getFeedCropPlannerUIHealth =
    getUiHealth;


  /*
    ============================================================
    78. AUTOMATIC PAGE INITIALIZATION
    ============================================================
  */


  function handleDocumentReady()
  {

    initializeDevelopmentPage();

    renderDashboardErrors();

    renderDashboardWarnings();

  }



  if (
    document.readyState ===
      "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      handleDocumentReady,
      {
        once:
          true
      }
    );

  } else {

    handleDocumentReady();

  }


})(window);