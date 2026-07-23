"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Recommendation Engine

  Version: 2.0.0

  This engine evaluates every registered crop using the
  Version 2 recommendation pipeline.

  Evaluation Pipeline

  Phase 1
      Eligibility

  Phase 2
      Compatibility

          Climate
          Site
          Soil
          Water
          Space
          Flock
          Labor
          Harvest & Storage

  Phase 3
      Goal Alignment

  Phase 4
      Use Path Evaluation

  Phase 5
      Contextual Risk

  Phase 6
      Confidence & Final Ranking

  Public API compatibility with the existing planner
  has intentionally been preserved wherever practical.
*/

(function initializeFeedCropPlannerEngine(global) {

  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};



  /*
    ============================================================
    ENGINE VERSION
    ============================================================
  */

  const ENGINE_VERSION =
    "2.0.0";



  /*
    ============================================================
    SHORTCUTS
    ============================================================
  */

  const config =
    namespace.config || {};

  const data =
    namespace.data || {};



  /*
    ============================================================
    ENGINE CONFIGURATION
    ============================================================
  */

  const scoring =
    config.scoring || {};

  const engineConfig =
    scoring.engine || {};



  /*
    ============================================================
    GENERAL HELPERS
    ============================================================
  */


  function clamp(
    value,
    minimum,
    maximum
  ) {

    if (!Number.isFinite(value)) {
      return minimum;
    }

    return Math.min(
      maximum,
      Math.max(
        minimum,
        value
      )
    );

  }



  function roundScore(
    value
  ) {

    return Math.round(
      clamp(
        value,
        0,
        100
      )
    );

  }



  function averageKnownValues(
    values
  ) {

    const usableValues =
      values.filter(
        Number.isFinite
      );

    if (
      usableValues.length === 0
    ) {
      return null;
    }

    return (
      usableValues.reduce(
        (
          total,
          value
        ) =>
          total + value,
        0
      ) /
      usableValues.length
    );

  }



  function convertFivePointScore(
    value
  ) {

    const conversionTable =
      engineConfig
        ?.fivePointScoreConversion;

    if (
      !conversionTable
    ) {
      return null;
    }

    return conversionTable[
      value
    ] ?? null;

  }



  function scoreFromBoolean(
    value
  ) {

    if (
      value === true
    ) {
      return 100;
    }

    if (
      value === false
    ) {
      return 0;
    }

    return null;

  }



  function scoreDifference(
    actual,
    preferred
  ) {

    if (
      !Number.isFinite(actual) ||
      !Number.isFinite(preferred)
    ) {
      return null;
    }

    const difference =
      Math.abs(
        actual -
        preferred
      );

    return clamp(
      100 -
      difference * 20,
      0,
      100
    );

  }



  /*
    ============================================================
    DIAGNOSTIC HELPERS
    ============================================================
  */


  function createEvidenceObject() {

    return {

      score:
        null,

      matchedFactors:
        [],

      missedFactors:
        [],

      warnings:
        [],

      evidenceCoverage:
        0

    };

  }



  function createEligibilityObject() {

    return {

      passed:
        true,

      hardFailures:
        [],

      warnings:
        []

    };

  }



  function createConfidenceObject() {

    return {

      score:
        0,

      label:
        null,

      basedOn: {

        cropCoverage:
          0,

        questionnaireCoverage:
          0,

        rankingSeparation:
          0,

        assumptions:
          0

      }

    };

  }



  /*
    ============================================================
    MASTER EVALUATION OBJECT

    Every crop evaluated by the engine begins with this
    structure.

    Each phase progressively fills in additional data.

    Nothing in the engine should create ad-hoc objects.
    ============================================================
  */


  function createCropEvaluation(
    crop
  ) {

    return {

      cropId:
        crop.id,

      cropName:
        crop.name,

      plannerData:
        crop.plannerData ||

        {},

      eligible:
        true,

      eligibility:
        createEligibilityObject(),

      compatibility: {

        climate:
          createEvidenceObject(),

        site:
          createEvidenceObject(),

        soil:
          createEvidenceObject(),

        water:
          createEvidenceObject(),

        space:
          createEvidenceObject(),

        flock:
          createEvidenceObject(),

        labor:
          createEvidenceObject(),

        harvestStorage:
          createEvidenceObject()

      },

      goals: {

        score:
          null,

        matchedGoals:
          [],

        weakGoals:
          [],

        priorityMultiplier:
          1

      },

      usePaths: {

        bestPath:
          null,

        highestScore:
          0,

        evaluated:
          []

      },

      risks: {

        wildlife:
          0,

        storm:
          0,

        harvestLoss:
          0,

        storage:
          0,

        totalAdjustment:
          0

      },

      confidence:
        createConfidenceObject(),

      final: {

        compatibilityScore:
          0,

        goalScore:
          0,

        usePathScore:
          0,

        riskAdjustment:
          0,

        finalScore:
          0,

        recommendationTier:
          null,

        recommendationReasons:
          []

      }

    };

  }

    /*
    ============================================================
    PHASE 1
    ELIGIBILITY
    ============================================================

    Eligibility determines whether a crop should continue
    through the recommendation pipeline.

    Eligibility does NOT assign points.

    It only determines whether a crop is suitable enough
    to evaluate further.

  */



  function failEligibility(
    evaluation,
    reason
  ) {

    evaluation.eligible = false;

    evaluation.eligibility.passed = false;

    evaluation.eligibility.hardFailures.push(
      reason
    );

  }



  function addEligibilityWarning(
    evaluation,
    warning
  ) {

    evaluation.eligibility.warnings.push(
      warning
    );

  }



  /*
    ============================================================
    BASIC DATA VALIDATION
    ============================================================
  */


    function validatePlannerData(
    crop,
    evaluation
  ) {

    const plannerData =
      crop.plannerData;

    if (!plannerData) {

      failEligibility(
        evaluation,
        "Planner data missing."
      );

      return;

    }

    const allowedStatuses =
      config.enums
        ?.plannerDataStatuses ||
      [];

    if (
      allowedStatuses.length > 0 &&
      !allowedStatuses.includes(
        plannerData.developmentStatus
      )
    ) {

      failEligibility(
        evaluation,
        "Crop planner development status is invalid."
      );

      return;

    }

    if (
      plannerData.developmentStatus !==
      "ready"
    ) {

      failEligibility(
        evaluation,
        "Crop is not ready for recommendation scoring."
      );

    }

  }



  /*
    ============================================================
    LIFECYCLE ELIGIBILITY
    ============================================================
  */


  function evaluateLifecycleEligibility(
    crop,
    answers,
    evaluation
  ) {

    const lifecycle =
      crop.plannerData?.lifecycle;

    if (!lifecycle) {

      addEligibilityWarning(
        evaluation,
        "Lifecycle data unavailable."
      );

      return;

    }

    const restrictions =
      answers.space
        ?.plantBehaviorRestrictions ||
      [];

    const temporarySiteRequested =
      restrictions.includes(
        "no-permanent-planting"
      ) ||
      restrictions.includes(
        "annual-only"
      ) ||
      restrictions.includes(
        "must-be-removable"
      );

    if (
      temporarySiteRequested &&
      lifecycle.permanentPlantingRequired ===
        true
    ) {

      failEligibility(
        evaluation,
        "Permanent planting conflicts with the selected site restrictions."
      );

      return;

    }

    const selectedGoals =
      answers.preferences
        ?.plannerGoals ||
      [];

    if (
      selectedGoals.includes(
        "fast-value"
      ) &&
      Number.isFinite(
        lifecycle.yearsToFirstUsefulHarvest
      ) &&
      lifecycle.yearsToFirstUsefulHarvest >
        1
    ) {

      addEligibilityWarning(
        evaluation,
        "This crop may require more than one year before its first useful harvest."
      );

    }

  }



  /*
    ============================================================
    SPACE ELIGIBILITY
    ============================================================
  */


  function evaluateSpaceEligibility(
    crop,
    answers,
    evaluation
  ) {

    const space =
      crop.plannerData?.space;

    if (!space) {

      addEligibilityWarning(
        evaluation,
        "Space data unavailable."
      );

      return;

    }

    const availableSpaceTypes =
      answers.space
        ?.availableSpaceTypes ||
      [];

    if (
      availableSpaceTypes.length === 0
    ) {
      return;
    }

    const knownScores =
      availableSpaceTypes
        .map(
          spaceType =>
            space.spaceTypeScores?.[
              spaceType
            ]
        )
        .filter(
          Number.isFinite
        );

    if (
      knownScores.length > 0 &&
      knownScores.every(
        score =>
          score === 0
      )
    ) {

      failEligibility(
        evaluation,
        "None of the available growing-space types are compatible with this crop."
      );

    }

  }



  /*
    ============================================================
    CLIMATE ELIGIBILITY
    ============================================================
  */


  function evaluateClimateEligibility(
    crop,
    answers,
    evaluation
  ) {

    const climate =
      crop.plannerData?.climate;

    if (!climate) {

      addEligibilityWarning(
        evaluation,
        "Climate data unavailable."
      );

      return;

    }

    const climateType =
      answers.climate?.climateType;

    if (!climateType) {
      return;
    }

    if (

      Array.isArray(
        climate.challengingClimateTypes
      ) &&

      climate
        .challengingClimateTypes
        .includes(
          climateType
        )

    ) {

      addEligibilityWarning(
        evaluation,
        "Climate presents significant challenges."
      );

    }

  }



  /*
    ============================================================
    USE PATH ELIGIBILITY
    ============================================================
  */


  function evaluateUsePathEligibility(
    crop,
    answers,
    evaluation
  ) {

    const planner =
      crop.plannerData;

    if (
      !planner?.usePaths
    ) {

      failEligibility(
        evaluation,
        "No planner use paths."
      );

      return;

    }

    if (

      !Array.isArray(
        planner.usePaths
      ) ||

      planner.usePaths.length === 0

    ) {

      failEligibility(
        evaluation,
        "No eligible use paths."
      );

    }

  }



  /*
    ============================================================
    MASTER ELIGIBILITY
    ============================================================
  */


  function evaluateEligibility(
    crop,
    answers,
    evaluation
  ) {

    validatePlannerData(
      crop,
      evaluation
    );

    if (!evaluation.eligible) {
      return;
    }

    evaluateLifecycleEligibility(
      crop,
      answers,
      evaluation
    );

    if (!evaluation.eligible) {
      return;
    }

    evaluateSpaceEligibility(
      crop,
      answers,
      evaluation
    );

    if (!evaluation.eligible) {
      return;
    }

    evaluateClimateEligibility(
      crop,
      answers,
      evaluation
    );

    if (!evaluation.eligible) {
      return;
    }

    evaluateUsePathEligibility(
      crop,
      answers,
      evaluation
    );

  }

  /*
    ============================================================
    PHASE 2
    COMPATIBILITY

    Compatibility evaluates how well the crop fits the
    visitor's actual growing conditions.

    Every compatibility category returns:

    - score
    - matched factors
    - missed factors
    - warnings
    - evidence coverage

    Missing crop data does not automatically lower the score.
    It lowers evidence coverage.
    ============================================================
  */



  /*
    ============================================================
    COMPATIBILITY FACTOR HELPERS
    ============================================================
  */


  function createCompatibilityFactor(
    id,
    value,
    weight,
    message,
    matched
  ) {

    return {

      id,

      value:
        Number.isFinite(value)
          ? clamp(
              value,
              0,
              100
            )
          : null,

      weight:
        Number.isFinite(weight)
          ? Math.max(
              0,
              weight
            )
          : 0,

      message:
        message || null,

      matched:
        matched === true

    };

  }



  function getKnownCompatibilityFactors(
    factors
  ) {

    if (!Array.isArray(factors)) {
      return [];
    }

    return factors.filter(
      factor =>
        factor &&
        Number.isFinite(
          factor.value
        ) &&
        Number.isFinite(
          factor.weight
        ) &&
        factor.weight > 0
    );

  }



  function calculateEvidenceCoverage(
    factors
  ) {

    if (
      !Array.isArray(factors) ||
      factors.length === 0
    ) {
      return 0;
    }

    const possibleWeight =
      factors.reduce(
        (
          total,
          factor
        ) =>
          total +
          (
            Number.isFinite(
              factor?.weight
            )
              ? Math.max(
                  0,
                  factor.weight
                )
              : 0
          ),
        0
      );

    if (possibleWeight <= 0) {
      return 0;
    }

    const knownWeight =
      getKnownCompatibilityFactors(
        factors
      ).reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    return clamp(
      knownWeight /
        possibleWeight,
      0,
      1
    );

  }



  function calculateWeightedFactorScore(
    factors
  ) {

    const knownFactors =
      getKnownCompatibilityFactors(
        factors
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    const totalWeight =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    if (totalWeight <= 0) {
      return null;
    }

    return knownFactors.reduce(
      (
        total,
        factor
      ) =>
        total +
        (
          factor.value *
          (
            factor.weight /
            totalWeight
          )
        ),
      0
    );

  }



  function finalizeEvidenceObject(
    evidence,
    factors
  ) {

    const score =
      calculateWeightedFactorScore(
        factors
      );

    evidence.score =
      Number.isFinite(score)
        ? roundScore(score)
        : null;

    evidence.evidenceCoverage =
      calculateEvidenceCoverage(
        factors
      );

    factors.forEach(
      factor => {

        if (
          !factor ||
          !factor.message ||
          !Number.isFinite(
            factor.value
          )
        ) {
          return;
        }

        if (
          factor.matched ||
          factor.value >= 70
        ) {

          evidence
            .matchedFactors
            .push(
              factor.message
            );

          return;
        }

        if (
          factor.value < 50
        ) {

          evidence
            .missedFactors
            .push(
              factor.message
            );

          return;
        }

        evidence.warnings.push(
          factor.message
        );

      }
    );

    return evidence;

  }



  /*
    ============================================================
    QUESTIONNAIRE VALUE HELPERS
    ============================================================
  */


  function convertFrostFreeSeasonRangeToDays(
    range
  ) {

    const dayMap = {

      "under-90":
        75,

      "90-119":
        105,

      "120-149":
        135,

      "150-179":
        165,

      "180-209":
        195,

      "210-plus":
        225

    };

    return dayMap[
      range
    ] ?? null;

  }



  function getClimateTypeScore(
    climate,
    climateType
  ) {

    if (
      !climate ||
      !climateType
    ) {
      return null;
    }

    if (
      Array.isArray(
        climate.preferredClimateTypes
      ) &&
      climate
        .preferredClimateTypes
        .includes(
          climateType
        )
    ) {
      return 100;
    }

    if (
      Array.isArray(
        climate.suitableClimateTypes
      ) &&
      climate
        .suitableClimateTypes
        .includes(
          climateType
        )
    ) {
      return 82;
    }

    if (
      Array.isArray(
        climate.challengingClimateTypes
      ) &&
      climate
        .challengingClimateTypes
        .includes(
          climateType
        )
    ) {
      return 35;
    }

    return null;

  }



  function getSeasonLengthScore(
    climate,
    frostFreeDays
  ) {

    if (
      !climate ||
      !Number.isFinite(
        frostFreeDays
      )
    ) {
      return null;
    }

    const minimumDays =
      climate.minimumFrostFreeDays;

    const preferredDays =
      climate.preferredFrostFreeDays;

    const maturityMinimum =
      climate.daysToMaturityMinimum;

    const maturityMaximum =
      climate.daysToMaturityMaximum;

    const dryDownBuffer =
      Number.isFinite(
        climate.dryDownBufferDays
      )
        ? climate.dryDownBufferDays
        : 0;

    if (
      Number.isFinite(
        minimumDays
      )
    ) {

      if (
        frostFreeDays <
        minimumDays
      ) {

        const shortage =
          minimumDays -
          frostFreeDays;

        return clamp(
          55 -
          shortage * 1.5,
          0,
          55
        );

      }

      if (
        Number.isFinite(
          preferredDays
        ) &&
        frostFreeDays >=
          preferredDays
      ) {
        return 100;
      }

      return 82;

    }

    if (
      Number.isFinite(
        maturityMaximum
      )
    ) {

      const requiredDays =
        maturityMaximum +
        dryDownBuffer;

      if (
        frostFreeDays <
        requiredDays
      ) {

        const shortage =
          requiredDays -
          frostFreeDays;

        return clamp(
          60 -
          shortage * 1.25,
          0,
          60
        );

      }

      return 95;

    }

    if (
      Number.isFinite(
        maturityMinimum
      )
    ) {

      if (
        frostFreeDays <
        maturityMinimum
      ) {

        const shortage =
          maturityMinimum -
          frostFreeDays;

        return clamp(
          60 -
          shortage * 1.25,
          0,
          60
        );

      }

      return 88;

    }

    return null;

  }



  function getClimateStressTraitScore(
    climate,
    climateType
  ) {

    if (
      !climate ||
      !climateType
    ) {
      return null;
    }

    const traitScores = [];

    if (
      climateType ===
        "hot-dry" ||
      climateType ===
        "extreme-heat"
    ) {

      traitScores.push(
        convertFivePointScore(
          climate.heatToleranceScore
        )
      );

      traitScores.push(
        convertFivePointScore(
          climate
            .droughtClimateToleranceScore
        )
      );

    }

    if (
      climateType ===
        "hot-humid"
    ) {

      traitScores.push(
        convertFivePointScore(
          climate.heatToleranceScore
        )
      );

      traitScores.push(
        convertFivePointScore(
          climate.humidityToleranceScore
        )
      );

    }

    if (
      climateType ===
        "cold-short-summer" ||
      climateType ===
        "cool-moderate-summer" ||
      climateType ===
        "high-elevation"
    ) {

      traitScores.push(
        convertFivePointScore(
          climate
            .coolSummerToleranceScore
        )
      );

      /*
        A high frost-sensitivity score means greater
        sensitivity and therefore a poorer cold-climate fit.
      */

      const frostSensitivity =
        convertFivePointScore(
          climate.frostSensitivityScore
        );

      if (
        Number.isFinite(
          frostSensitivity
        )
      ) {

        traitScores.push(
          100 -
          frostSensitivity
        );

      }

    }

    return averageKnownValues(
      traitScores
    );

  }



  /*
    ============================================================
    CLIMATE COMPATIBILITY
    ============================================================
  */


  function scoreClimateCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .climate;

    const climate =
      crop.plannerData
        ?.climate;

    if (!climate) {

      evidence.warnings.push(
        "Crop climate data is unavailable."
      );

      return evidence;

    }

    const climateType =
      answers.climate
        ?.climateType;

    const frostFreeRange =
      answers.climate
        ?.frostFreeSeasonRange;

    const frostFreeDays =
      convertFrostFreeSeasonRangeToDays(
        frostFreeRange
      );

    const selectedGoals =
      answers.preferences
        ?.plannerGoals ||
      [];

    const shortSeasonIsPriority =
      selectedGoals.includes(
        "short-season-production"
      ) ||
      selectedGoals.includes(
        "fast-value"
      );

    const broadClimateWeight =
      shortSeasonIsPriority
        ? 0.50
        : 0.65;

    const seasonLengthWeight =
      shortSeasonIsPriority
        ? 0.35
        : 0.20;

    const stressTraitWeight =
      0.15;

    const climateTypeScore =
      getClimateTypeScore(
        climate,
        climateType
      );

    const seasonLengthScore =
      getSeasonLengthScore(
        climate,
        frostFreeDays
      );

    const stressTraitScore =
      getClimateStressTraitScore(
        climate,
        climateType
      );

    const factors = [

      createCompatibilityFactor(
        "climate-type",
        climateTypeScore,
        broadClimateWeight,
        Number.isFinite(
          climateTypeScore
        )
          ? (
              climateTypeScore >= 70
                ? "The crop is adapted to the selected climate type."
                : "The selected climate presents meaningful challenges for this crop."
            )
          : null,
        climateTypeScore >= 70
      ),

      createCompatibilityFactor(
        "season-length",
        seasonLengthScore,
        seasonLengthWeight,
        Number.isFinite(
          seasonLengthScore
        )
          ? (
              seasonLengthScore >= 70
                ? "The available frost-free season appears adequate."
                : "The available frost-free season may be too short for dependable production."
            )
          : null,
        seasonLengthScore >= 70
      ),

      createCompatibilityFactor(
        "climate-stress-traits",
        stressTraitScore,
        stressTraitWeight,
        Number.isFinite(
          stressTraitScore
        )
          ? (
              stressTraitScore >= 70
                ? "The crop's stress tolerances fit the selected climate."
                : "Heat, humidity, drought, or cold sensitivity may limit performance."
            )
          : null,
        stressTraitScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    if (
      climateType ===
        "hot-humid" &&
      climate.humidityToleranceScore <=
        2
    ) {

      evidence.warnings.push(
        "High humidity may increase disease, lodging, drying, or harvest-quality risk."
      );

    }

    if (
      climateType ===
        "extreme-heat" &&
      climate.heatToleranceScore <=
        2
    ) {

      evidence.warnings.push(
        "Extreme heat may prevent dependable production."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    SUNLIGHT SCORING
    ============================================================
  */


  function getSunlightCompatibilityScore(
    site,
    directSunHours
  ) {

    if (
      !site ||
      !Number.isFinite(
        directSunHours
      )
    ) {
      return null;
    }

    const absoluteMinimum =
      site.absoluteMinimumSunHours;

    const productiveMinimum =
      site.productiveMinimumSunHours;

    const preferred =
      site.preferredSunHours;

    if (
      Number.isFinite(
        absoluteMinimum
      ) &&
      directSunHours <
        absoluteMinimum
    ) {

      const shortage =
        absoluteMinimum -
        directSunHours;

      return clamp(
        30 -
        shortage * 15,
        0,
        30
      );

    }

    if (
      Number.isFinite(
        productiveMinimum
      ) &&
      directSunHours <
        productiveMinimum
    ) {

      const shortage =
        productiveMinimum -
        directSunHours;

      return clamp(
        65 -
        shortage * 12,
        20,
        65
      );

    }

    if (
      Number.isFinite(
        preferred
      ) &&
      directSunHours >=
        preferred
    ) {
      return 100;
    }

    if (
      Number.isFinite(
        productiveMinimum
      ) &&
      directSunHours >=
        productiveMinimum
    ) {

      if (
        Number.isFinite(
          preferred
        ) &&
        preferred >
          productiveMinimum
      ) {

        const progress =
          (
            directSunHours -
            productiveMinimum
          ) /
          (
            preferred -
            productiveMinimum
          );

        return clamp(
          78 +
          progress * 22,
          78,
          100
        );

      }

      return 88;

    }

    const shadeTolerance =
      convertFivePointScore(
        site.shadeToleranceScore
      );

    return shadeTolerance;

  }



  /*
    ============================================================
    WIND SCORING
    ============================================================
  */


  function getWindCompatibilityScore(
    site,
    windExposure
  ) {

    if (
      !site ||
      !windExposure
    ) {
      return null;
    }

    const windTolerance =
      convertFivePointScore(
        site.windToleranceScore
      );

    const lodgingRisk =
      convertFivePointScore(
        site.lodgingRiskScore
      );

    if (
      windExposure ===
        "low"
    ) {

      return averageKnownValues([
        90,
        windTolerance
      ]);

    }

    if (
      windExposure ===
        "moderate"
    ) {

      const lodgingSuitability =
        Number.isFinite(
          lodgingRisk
        )
          ? 100 -
            lodgingRisk * 0.35
          : null;

      return averageKnownValues([
        windTolerance,
        lodgingSuitability
      ]);

    }

    if (
      windExposure ===
        "high"
    ) {

      const lodgingSuitability =
        Number.isFinite(
          lodgingRisk
        )
          ? 100 -
            lodgingRisk
          : null;

      return averageKnownValues([
        windTolerance,
        lodgingSuitability
      ]);

    }

    if (
      windExposure ===
        "sheltered"
    ) {

      const airflowRequirement =
        convertFivePointScore(
          site.airflowRequirementScore
        );

      if (
        Number.isFinite(
          airflowRequirement
        )
      ) {

        return clamp(
          100 -
          airflowRequirement * 0.45,
          40,
          100
        );

      }

      return 85;

    }

    return null;

  }



  /*
    ============================================================
    SITE COMPATIBILITY
    ============================================================
  */


  function scoreSiteCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .site;

    const site =
      crop.plannerData
        ?.site;

    if (!site) {

      evidence.warnings.push(
        "Crop site data is unavailable."
      );

      return evidence;

    }

    const directSunHours =
      answers.site
        ?.directSunHoursExact;

    const windExposure =
      answers.site
        ?.windExposure;

    const sunlightScore =
      getSunlightCompatibilityScore(
        site,
        directSunHours
      );

    const windScore =
      getWindCompatibilityScore(
        site,
        windExposure
      );

    const factors = [

      createCompatibilityFactor(
        "sunlight",
        sunlightScore,
        0.70,
        Number.isFinite(
          sunlightScore
        )
          ? (
              sunlightScore >= 70
                ? "The available sunlight supports useful crop production."
                : "The site may not provide enough direct sunlight for dependable production."
            )
          : null,
        sunlightScore >= 70
      ),

      createCompatibilityFactor(
        "wind",
        windScore,
        0.30,
        Number.isFinite(
          windScore
        )
          ? (
              windScore >= 70
                ? "The crop is reasonably compatible with the selected wind exposure."
                : "Wind exposure, lodging risk, or restricted airflow may reduce performance."
            )
          : null,
        windScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    if (
      windExposure ===
        "high" &&
      site.lodgingRiskScore >=
        4
    ) {

      evidence.warnings.push(
        "Strong wind may cause lodging or stem damage."
      );

    }

    if (
      windExposure ===
        "sheltered" &&
      site.airflowRequirementScore >=
        4
    ) {

      evidence.warnings.push(
        "The crop benefits from airflow and may experience greater disease or drying problems in a sheltered location."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    PARTIAL COMPATIBILITY ORCHESTRATOR

    Soil, water, space, flock, labor, and harvest/storage
    will be added in the following parts.
    ============================================================
  */


  function evaluateCompatibility(
    crop,
    answers,
    evaluation
  ) {

    scoreClimateCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSiteCompatibility(
      crop,
      answers,
      evaluation
    );

    return evaluation.compatibility;

  }

    /*
    ============================================================
    SOIL TEXTURE HELPERS
    ============================================================
  */


  function getSoilTexturePlannerKey(
    soilTexture
  ) {

    const textureKeyMap = {

      "heavy-clay":
        "heavyClay",

      "clay-loam":
        "clayLoam",

      "loam":
        "loam",

      "sandy-loam":
        "sandyLoam",

      "very-sandy":
        "verySandy",

      "rocky":
        "rocky"

    };

    return textureKeyMap[
      soilTexture
    ] || null;

  }



  function getSoilTextureCompatibilityScore(
    soil,
    answers
  ) {

    if (!soil) {
      return null;
    }

    const soilTexture =
      answers.soil
        ?.soilTexture;

    const growingMedium =
      answers.soil
        ?.primaryGrowingMedium;

    /*
      Commercial and raised-bed mixes do not correspond
      directly to one native-soil texture.

      They receive a neutral-positive score rather than
      pretending they are always perfect.
    */

    if (
      soilTexture ===
        "commercial-mix" ||
      soilTexture ===
        "raised-bed-mix" ||
      growingMedium ===
        "commercial-mix" ||
      growingMedium ===
        "raised-bed-mix"
    ) {
      return 82;
    }

    const textureKey =
      getSoilTexturePlannerKey(
        soilTexture
      );

    if (!textureKey) {
      return null;
    }

    return convertFivePointScore(
      soil.textureScores?.[
        textureKey
      ]
    );

  }



  /*
    ============================================================
    SOIL DRAINAGE HELPERS
    ============================================================
  */


  function getDrainageCompatibilityScore(
    soil,
    drainage
  ) {

    if (
      !soil ||
      !drainage
    ) {
      return null;
    }

    const drainageRequirement =
      convertFivePointScore(
        soil.drainageRequirementScore
      );

    const temporaryWetTolerance =
      convertFivePointScore(
        soil.temporaryWetToleranceScore
      );

    const waterloggingSensitivity =
      convertFivePointScore(
        soil.waterloggingSensitivityScore
      );

    if (
      drainage ===
        "well-drained"
    ) {

      return averageKnownValues([
        100,
        drainageRequirement
      ]);

    }

    if (
      drainage ===
        "very-fast"
    ) {

      /*
        Very rapid drainage protects against saturation,
        but it may create moisture-retention problems.

        This remains favorable, but it is not automatically
        equivalent to ideal well-drained soil.
      */

      return averageKnownValues([
        78,
        drainageRequirement
      ]);

    }

    if (
      drainage ===
        "moist"
    ) {

      const wetTolerance =
        averageKnownValues([
          temporaryWetTolerance,

          Number.isFinite(
            waterloggingSensitivity
          )
            ? 100 -
              waterloggingSensitivity *
                0.45
            : null
        ]);

      return averageKnownValues([
        70,
        wetTolerance
      ]);

    }

    if (
      drainage ===
        "slow"
    ) {

      const slowDrainageTolerance =
        averageKnownValues([

          temporaryWetTolerance,

          Number.isFinite(
            waterloggingSensitivity
          )
            ? 100 -
              waterloggingSensitivity
            : null

        ]);

      return averageKnownValues([
        42,
        slowDrainageTolerance
      ]);

    }

    if (
      drainage ===
        "waterlogged"
    ) {

      const waterloggedTolerance =
        averageKnownValues([

          temporaryWetTolerance,

          Number.isFinite(
            waterloggingSensitivity
          )
            ? 100 -
              waterloggingSensitivity
            : null

        ]);

      return averageKnownValues([
        12,
        waterloggedTolerance
      ]);

    }

    if (
      drainage ===
        "standing-water"
    ) {

      const directSuitability =
        soil.directFacts
          ?.waterloggedSoilSuitable;

      if (
        directSuitability === true
      ) {
        return 75;
      }

      if (
        directSuitability === false
      ) {
        return 0;
      }

      return averageKnownValues([

        5,

        temporaryWetTolerance,

        Number.isFinite(
          waterloggingSensitivity
        )
          ? 100 -
            waterloggingSensitivity
          : null

      ]);

    }

    return null;

  }



  /*
    ============================================================
    SOIL DEPTH HELPERS
    ============================================================
  */


  function convertSoilDepthCategoryToInches(
    soilDepthCategory
  ) {

    const depthMap = {

      "very-shallow":
        4,

      "shallow":
        8,

      "moderate":
        16,

      "deep":
        30,

      "very-deep":
        48

    };

    return depthMap[
      soilDepthCategory
    ] ?? null;

  }



  function getSoilDepthCompatibilityScore(
    soil,
    soilDepthCategory
  ) {

    if (
      !soil ||
      !soilDepthCategory
    ) {
      return null;
    }

    const availableDepth =
      convertSoilDepthCategoryToInches(
        soilDepthCategory
      );

    if (
      !Number.isFinite(
        availableDepth
      )
    ) {
      return null;
    }

    const minimumDepth =
      soil.minimumSoilDepthIn;

    const preferredDepth =
      soil.preferredSoilDepthIn;

    if (
      Number.isFinite(
        minimumDepth
      ) &&
      availableDepth <
        minimumDepth
    ) {

      const shortage =
        minimumDepth -
        availableDepth;

      return clamp(
        55 -
        shortage * 3,
        0,
        55
      );

    }

    if (
      Number.isFinite(
        preferredDepth
      ) &&
      availableDepth >=
        preferredDepth
    ) {
      return 100;
    }

    if (
      Number.isFinite(
        minimumDepth
      ) &&
      availableDepth >=
        minimumDepth
    ) {

      if (
        Number.isFinite(
          preferredDepth
        ) &&
        preferredDepth >
          minimumDepth
      ) {

        const progress =
          (
            availableDepth -
            minimumDepth
          ) /
          (
            preferredDepth -
            minimumDepth
          );

        return clamp(
          72 +
          progress * 28,
          72,
          100
        );

      }

      return 85;

    }

    /*
      If the crop record does not contain defensible
      depth thresholds, do not invent a score.
    */

    return null;

  }



  /*
    ============================================================
    SOIL PH HELPERS
    ============================================================
  */


  function convertSoilPHCategoryToValue(
    soilPHCategory
  ) {

    const pHMap = {

      "strongly-acidic":
        4.8,

      "acidic":
        5.5,

      "slightly-acidic":
        6.2,

      "near-neutral":
        6.8,

      "slightly-alkaline":
        7.5,

      "alkaline":
        8.2

    };

    return pHMap[
      soilPHCategory
    ] ?? null;

  }



  function getSoilPHCompatibilityScore(
    soil,
    soilPHCategory
  ) {

    if (
      !soil ||
      !soilPHCategory
    ) {
      return null;
    }

    const estimatedPH =
      convertSoilPHCategoryToValue(
        soilPHCategory
      );

    if (
      !Number.isFinite(
        estimatedPH
      )
    ) {
      return null;
    }

    const preferredMinimum =
      soil.preferredPHMinimum;

    const preferredMaximum =
      soil.preferredPHMaximum;

    const survivalMinimum =
      soil.survivalPHMinimum;

    const survivalMaximum =
      soil.survivalPHMaximum;

    if (
      Number.isFinite(
        preferredMinimum
      ) &&
      Number.isFinite(
        preferredMaximum
      ) &&
      estimatedPH >=
        preferredMinimum &&
      estimatedPH <=
        preferredMaximum
    ) {
      return 100;
    }

    if (
      Number.isFinite(
        survivalMinimum
      ) &&
      estimatedPH <
        survivalMinimum
    ) {

      const difference =
        survivalMinimum -
        estimatedPH;

      return clamp(
        40 -
        difference * 25,
        0,
        40
      );

    }

    if (
      Number.isFinite(
        survivalMaximum
      ) &&
      estimatedPH >
        survivalMaximum
    ) {

      const difference =
        estimatedPH -
        survivalMaximum;

      return clamp(
        40 -
        difference * 25,
        0,
        40
      );

    }

    if (
      Number.isFinite(
        preferredMinimum
      ) &&
      estimatedPH <
        preferredMinimum
    ) {

      const difference =
        preferredMinimum -
        estimatedPH;

      return clamp(
        82 -
        difference * 20,
        35,
        82
      );

    }

    if (
      Number.isFinite(
        preferredMaximum
      ) &&
      estimatedPH >
        preferredMaximum
    ) {

      const difference =
        estimatedPH -
        preferredMaximum;

      return clamp(
        82 -
        difference * 20,
        35,
        82
      );

    }

    return null;

  }



  /*
    ============================================================
    SOIL COMPACTION HELPERS
    ============================================================
  */


  function getSoilCompactionCompatibilityScore(
    soil,
    answers
  ) {

    if (!soil) {
      return null;
    }

    const soilTexture =
      answers.soil
        ?.soilTexture;

    const growingMedium =
      answers.soil
        ?.primaryGrowingMedium;

    const compactionTolerance =
      convertFivePointScore(
        soil.compactionToleranceScore
      );

    if (
      !Number.isFinite(
        compactionTolerance
      )
    ) {
      return null;
    }

    if (
      growingMedium ===
        "raised-bed-mix" ||
      growingMedium ===
        "commercial-mix"
    ) {

      return averageKnownValues([
        95,
        compactionTolerance
      ]);

    }

    if (
      soilTexture ===
        "heavy-clay"
    ) {

      return averageKnownValues([
        35,
        compactionTolerance
      ]);

    }

    if (
      soilTexture ===
        "clay-loam"
    ) {

      return averageKnownValues([
        65,
        compactionTolerance
      ]);

    }

    if (
      soilTexture ===
        "rocky"
    ) {

      return averageKnownValues([
        50,
        compactionTolerance
      ]);

    }

    return averageKnownValues([
      85,
      compactionTolerance
    ]);

  }



  /*
    ============================================================
    SOIL COMPATIBILITY
    ============================================================
  */


  function scoreSoilCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .soil;

    const soil =
      crop.plannerData
        ?.soil;

    if (!soil) {

      evidence.warnings.push(
        "Crop soil data is unavailable."
      );

      return evidence;

    }

    const soilTexture =
      answers.soil
        ?.soilTexture;

    const soilDrainage =
      answers.soil
        ?.soilDrainage;

    const soilDepthCategory =
      answers.soil
        ?.soilDepthCategory;

    const soilPHCategory =
      answers.soil
        ?.soilPHCategory;

    const textureScore =
      getSoilTextureCompatibilityScore(
        soil,
        answers
      );

    const drainageScore =
      getDrainageCompatibilityScore(
        soil,
        soilDrainage
      );

    const depthScore =
      getSoilDepthCompatibilityScore(
        soil,
        soilDepthCategory
      );

    const pHScore =
      getSoilPHCompatibilityScore(
        soil,
        soilPHCategory
      );

    const compactionScore =
      getSoilCompactionCompatibilityScore(
        soil,
        answers
      );

    const factors = [

      createCompatibilityFactor(
        "soil-texture",
        textureScore,
        0.27,
        Number.isFinite(
          textureScore
        )
          ? (
              textureScore >= 70
                ? "The selected soil texture is compatible with this crop."
                : "The selected soil texture may restrict establishment, rooting, or production."
            )
          : null,
        textureScore >= 70
      ),

      createCompatibilityFactor(
        "soil-drainage",
        drainageScore,
        0.38,
        Number.isFinite(
          drainageScore
        )
          ? (
              drainageScore >= 70
                ? "The selected drainage condition supports healthy crop growth."
                : "The selected drainage condition may create root-health or establishment problems."
            )
          : null,
        drainageScore >= 70
      ),

      createCompatibilityFactor(
        "soil-depth",
        depthScore,
        0.14,
        Number.isFinite(
          depthScore
        )
          ? (
              depthScore >= 70
                ? "The available soil depth appears adequate."
                : "The available soil may be too shallow for dependable crop development."
            )
          : null,
        depthScore >= 70
      ),

      createCompatibilityFactor(
        "soil-ph",
        pHScore,
        0.11,
        Number.isFinite(
          pHScore
        )
          ? (
              pHScore >= 70
                ? "The estimated soil pH falls within or near the crop's useful range."
                : "The estimated soil pH may require amendment or local soil-test guidance."
            )
          : null,
        pHScore >= 70
      ),

      createCompatibilityFactor(
        "soil-compaction",
        compactionScore,
        0.10,
        Number.isFinite(
          compactionScore
        )
          ? (
              compactionScore >= 70
                ? "The growing medium should permit reasonable root development."
                : "Compaction or restrictive soil structure may reduce establishment and root growth."
            )
          : null,
        compactionScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    if (
      [
        "waterlogged",
        "standing-water"
      ].includes(
        soilDrainage
      ) &&
      soil.waterloggingSensitivityScore >=
        4
    ) {

      evidence.warnings.push(
        "This crop is highly sensitive to saturated or waterlogged soil."
      );

    }

    if (
      soilDrainage ===
        "very-fast" &&
      [
        "very-sandy",
        "sandy-loam"
      ].includes(
        soilTexture
      )
    ) {

      evidence.warnings.push(
        "Rapid drainage may increase irrigation demand and nutrient-leaching risk."
      );

    }

    if (
      soilTexture ===
        "heavy-clay" &&
      soil.compactionToleranceScore <=
        2
    ) {

      evidence.warnings.push(
        "Dense clay or compacted soil may restrict emergence and root development."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    WATER QUESTIONNAIRE HELPERS
    ============================================================
  */


  function getWaterReliabilityBaseScore(
    waterReliability
  ) {

    const reliabilityScoreMap = {

      "very-reliable":
        100,

      "usually-reliable":
        88,

      "occasionally-limited":
        70,

      "frequently-limited":
        48,

      "emergency-only":
        28,

      "rainfall-only":
        50,

      "unknown":
        null

    };

    return reliabilityScoreMap[
      waterReliability
    ] ?? null;

  }



  function getWateringFrequencyBaseScore(
    wateringFrequency
  ) {

    const frequencyScoreMap = {

      "daily":
        100,

      "every-2-3-days":
        96,

      "twice-weekly":
        90,

      "weekly":
        76,

      "as-needed":
        74,

      "drought-only":
        54,

      "establishment-only":
        58,

      "rainfall-dependent":
        48

    };

    return frequencyScoreMap[
      wateringFrequency
    ] ?? null;

  }



  function getCriticalWaterAvailabilityScore(
    availability
  ) {

    const criticalAvailabilityMap = {

      "reliable":
        100,

      "mostly-reliable":
        86,

      "occasional":
        70,

      "unreliable":
        48,

      "emergency":
        35,

      "none":
        15,

      "needs-guidance":
        55

    };

    return criticalAvailabilityMap[
      availability
    ] ?? null;

  }



  function getWaterConservationDemandScore(
    priority
  ) {

    const conservationMap = {

      "low":
        100,

      "moderate":
        82,

      "high":
        62,

      "top-priority":
        42

    };

    return conservationMap[
      priority
    ] ?? null;

  }



  /*
    ============================================================
    WATER-LIMITATION DETECTION
    ============================================================
  */


  function hasLimitedWaterConditions(
    answers
  ) {

    const reliability =
      answers.water
        ?.waterReliability;

    const frequency =
      answers.water
        ?.wateringFrequencyPreference;

    const conservationPriority =
      answers.water
        ?.waterConservationPriority;

    return (

      [
        "occasionally-limited",
        "frequently-limited",
        "emergency-only",
        "rainfall-only"
      ].includes(
        reliability
      ) ||

      [
        "weekly",
        "drought-only",
        "establishment-only",
        "rainfall-dependent"
      ].includes(
        frequency
      ) ||

      [
        "high",
        "top-priority"
      ].includes(
        conservationPriority
      )

    );

  }



  function hasDependableWaterConditions(
    answers
  ) {

    const reliability =
      answers.water
        ?.waterReliability;

    const frequency =
      answers.water
        ?.wateringFrequencyPreference;

    return (

      [
        "very-reliable",
        "usually-reliable"
      ].includes(
        reliability
      ) &&

      [
        "daily",
        "every-2-3-days",
        "twice-weekly",
        "as-needed"
      ].includes(
        frequency
      )

    );

  }



  /*
    ============================================================
    WATER CAPABILITY SCORING
    ============================================================
  */


  function getGeneralWaterCapabilityScore(
    answers
  ) {

    const reliabilityScore =
      getWaterReliabilityBaseScore(
        answers.water
          ?.waterReliability
      );

    const frequencyScore =
      getWateringFrequencyBaseScore(
        answers.water
          ?.wateringFrequencyPreference
      );

    const conservationScore =
      getWaterConservationDemandScore(
        answers.water
          ?.waterConservationPriority
      );

    return calculateWeightedFactorScore([

      createCompatibilityFactor(
        "water-reliability-capability",
        reliabilityScore,
        0.50,
        null,
        false
      ),

      createCompatibilityFactor(
        "watering-frequency-capability",
        frequencyScore,
        0.30,
        null,
        false
      ),

      createCompatibilityFactor(
        "water-conservation-capability",
        conservationScore,
        0.20,
        null,
        false
      )

    ]);

  }



  /*
    ============================================================
    CROP-SPECIFIC WATER SUITABILITY
    ============================================================
  */


  function getCropWaterLimitationScore(
    water,
    answers
  ) {

    if (!water) {
      return null;
    }

    const reliability =
      answers.water
        ?.waterReliability;

    const limitedIrrigationScore =
      convertFivePointScore(
        water
          .suitableForLimitedIrrigationScore
      );

    const rainfallOnlyScore =
      convertFivePointScore(
        water
          .suitableForRainfallOnlyScore
      );

    const droughtSurvivalScore =
      convertFivePointScore(
        water.droughtSurvivalScore
      );

    const droughtYieldRetentionScore =
      convertFivePointScore(
        water
          .droughtYieldRetentionScore
      );

    if (
      reliability ===
        "rainfall-only"
    ) {

      return averageKnownValues([

        rainfallOnlyScore,

        droughtSurvivalScore,

        droughtYieldRetentionScore

      ]);

    }

    if (
      hasLimitedWaterConditions(
        answers
      )
    ) {

      return averageKnownValues([

        limitedIrrigationScore,

        droughtSurvivalScore,

        droughtYieldRetentionScore

      ]);

    }

    if (
      hasDependableWaterConditions(
        answers
      )
    ) {

      /*
        When water is dependable, drought tolerance should
        not unfairly penalize a crop.

        The crop-specific factor therefore receives a
        neutral-positive result.
      */

      return 90;

    }

    return averageKnownValues([

      limitedIrrigationScore,

      rainfallOnlyScore,

      droughtYieldRetentionScore

    ]);

  }



  /*
    ============================================================
    CRITICAL-STAGE WATER SCORING
    ============================================================
  */


  function getCriticalStageWaterScore(
    water,
    answers
  ) {

    if (!water) {
      return null;
    }

    const availability =
      answers.water
        ?.criticalStageWaterAvailability;

    if (!availability) {
      return null;
    }

    const availabilityScore =
      getCriticalWaterAvailabilityScore(
        availability
      );

    if (
      !Number.isFinite(
        availabilityScore
      )
    ) {
      return null;
    }

    const importanceScore =
      convertFivePointScore(
        water
          .criticalStageWaterImportanceScore
      );

    if (
      !Number.isFinite(
        importanceScore
      )
    ) {
      return availabilityScore;
    }

    /*
      High critical-stage importance makes unreliable
      critical-stage water more consequential.

      Low importance keeps the score closer to neutral.
    */

    const importanceFraction =
      importanceScore /
      100;

    return clamp(

      80 +
      (
        availabilityScore -
        80
      ) *
      importanceFraction,

      0,
      100

    );

  }



  /*
    ============================================================
    OVERWATERING AND SATURATION SCORING
    ============================================================
  */


  function getExcessWaterCompatibilityScore(
    water,
    answers
  ) {

    if (!water) {
      return null;
    }

    const drainage =
      answers.soil
        ?.soilDrainage;

    const reliability =
      answers.water
        ?.waterReliability;

    const frequency =
      answers.water
        ?.wateringFrequencyPreference;

    const overwateringSensitivity =
      convertFivePointScore(
        water
          .overwateringSensitivityScore
      );

    const waterloggingSensitivity =
      convertFivePointScore(
        water
          .waterloggingSensitivityScore
      );

    if (
      [
        "waterlogged",
        "standing-water"
      ].includes(
        drainage
      )
    ) {

      return averageKnownValues([

        10,

        Number.isFinite(
          waterloggingSensitivity
        )
          ? 100 -
            waterloggingSensitivity
          : null

      ]);

    }

    if (
      drainage ===
        "slow"
    ) {

      return averageKnownValues([

        45,

        Number.isFinite(
          waterloggingSensitivity
        )
          ? 100 -
            waterloggingSensitivity *
              0.75
          : null

      ]);

    }

    if (
      frequency ===
        "daily" &&
      reliability ===
        "very-reliable"
    ) {

      return averageKnownValues([

        78,

        Number.isFinite(
          overwateringSensitivity
        )
          ? 100 -
            overwateringSensitivity *
              0.45
          : null

      ]);

    }

    if (
      drainage ===
        "well-drained" ||
      drainage ===
        "very-fast"
    ) {
      return 95;
    }

    return averageKnownValues([

      82,

      Number.isFinite(
        overwateringSensitivity
      )
        ? 100 -
          overwateringSensitivity *
            0.20
        : null

    ]);

  }



  /*
    ============================================================
    CONTAINER DRYING RISK
    ============================================================
  */


  function getContainerWaterCompatibilityScore(
    water,
    answers
  ) {

    if (!water) {
      return null;
    }

    const availableSpaceTypes =
      answers.space
        ?.availableSpaceTypes ||
      [];

    const containerOnly =
      availableSpaceTypes.length >
        0 &&
      availableSpaceTypes.every(
        spaceType =>
          spaceType ===
            "container" ||
          spaceType ===
            "containers"
      );

    if (!containerOnly) {
      return null;
    }

    const containerDryingRisk =
      convertFivePointScore(
        water
          .containerDryingRiskScore
      );

    if (
      !Number.isFinite(
        containerDryingRisk
      )
    ) {
      return null;
    }

    const wateringCapability =
      getGeneralWaterCapabilityScore(
        answers
      );

    return averageKnownValues([

      Number.isFinite(
        containerDryingRisk
      )
        ? 100 -
          containerDryingRisk
        : null,

      wateringCapability

    ]);

  }



  /*
    ============================================================
    WATER COMPATIBILITY
    ============================================================
  */


  function scoreWaterCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .water;

    const water =
      crop.plannerData
        ?.water;

    if (!water) {

      evidence.warnings.push(
        "Crop water data is unavailable."
      );

      return evidence;

    }

    const generalCapabilityScore =
      getGeneralWaterCapabilityScore(
        answers
      );

    const cropLimitationScore =
      getCropWaterLimitationScore(
        water,
        answers
      );

    const criticalStageScore =
      getCriticalStageWaterScore(
        water,
        answers
      );

    const excessWaterScore =
      getExcessWaterCompatibilityScore(
        water,
        answers
      );

    const containerWaterScore =
      getContainerWaterCompatibilityScore(
        water,
        answers
      );

    const limitedConditions =
      hasLimitedWaterConditions(
        answers
      );

    const cropLimitationWeight =
      limitedConditions
        ? 0.34
        : 0.18;

    const generalCapabilityWeight =
      limitedConditions
        ? 0.24
        : 0.36;

    const criticalStageWeight =
      0.22;

    const excessWaterWeight =
      0.20;

    const containerWaterWeight =
      Number.isFinite(
        containerWaterScore
      )
        ? 0.12
        : 0;

    const factors = [

      createCompatibilityFactor(
        "general-water-capability",
        generalCapabilityScore,
        generalCapabilityWeight,
        Number.isFinite(
          generalCapabilityScore
        )
          ? (
              generalCapabilityScore >= 70
                ? "The available watering system can support this crop."
                : "The available watering system may not fully meet crop demand."
            )
          : null,
        generalCapabilityScore >= 70
      ),

      createCompatibilityFactor(
        "limited-water-suitability",
        cropLimitationScore,
        cropLimitationWeight,
        Number.isFinite(
          cropLimitationScore
        )
          ? (
              cropLimitationScore >= 70
                ? "The crop has useful resilience under the selected water conditions."
                : "Limited irrigation or rainfall dependence may reduce dependable production."
            )
          : null,
        cropLimitationScore >= 70
      ),

      createCompatibilityFactor(
        "critical-stage-water",
        criticalStageScore,
        criticalStageWeight,
        Number.isFinite(
          criticalStageScore
        )
          ? (
              criticalStageScore >= 70
                ? "Water should be available during the crop's most sensitive growth stages."
                : "Unreliable water during critical growth stages may reduce yield or harvest quality."
            )
          : null,
        criticalStageScore >= 70
      ),

      createCompatibilityFactor(
        "excess-water-risk",
        excessWaterScore,
        excessWaterWeight,
        Number.isFinite(
          excessWaterScore
        )
          ? (
              excessWaterScore >= 70
                ? "Drainage and watering frequency should avoid damaging saturation."
                : "Overwatering, slow drainage, or saturation may damage this crop."
            )
          : null,
        excessWaterScore >= 70
      ),

      createCompatibilityFactor(
        "container-drying-risk",
        containerWaterScore,
        containerWaterWeight,
        Number.isFinite(
          containerWaterScore
        )
          ? (
              containerWaterScore >= 70
                ? "The available watering capacity can reasonably manage container drying."
                : "Container production may dry too quickly for the selected watering schedule."
            )
          : null,
        containerWaterScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    const reliability =
      answers.water
        ?.waterReliability;

    const criticalAvailability =
      answers.water
        ?.criticalStageWaterAvailability;

    const drainage =
      answers.soil
        ?.soilDrainage;

    if (
      reliability ===
        "rainfall-only" &&
      water.suitableForRainfallOnlyScore <=
        2
    ) {

      evidence.warnings.push(
        "Rainfall-only production may be unreliable for this crop."
      );

    }

    if (
      [
        "frequently-limited",
        "emergency-only"
      ].includes(
        reliability
      ) &&
      water
        .suitableForLimitedIrrigationScore <=
        2
    ) {

      evidence.warnings.push(
        "The crop has limited tolerance for restricted irrigation."
      );

    }

    if (
      [
        "unreliable",
        "emergency",
        "none"
      ].includes(
        criticalAvailability
      ) &&
      water
        .criticalStageWaterImportanceScore >=
        4
    ) {

      evidence.warnings.push(
        "Water shortages during critical growth stages may sharply reduce production."
      );

    }

    if (
      [
        "waterlogged",
        "standing-water"
      ].includes(
        drainage
      ) &&
      water.waterloggingSensitivityScore >=
        4
    ) {

      evidence.warnings.push(
        "The selected site may remain too wet for healthy root development."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    UPDATED COMPATIBILITY ORCHESTRATOR

    This replaces the temporary evaluateCompatibility()
    function from Part 3.
    ============================================================
  */


  function evaluateCompatibility(
    crop,
    answers,
    evaluation
  ) {

    scoreClimateCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSiteCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSoilCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreWaterCompatibility(
      crop,
      answers,
      evaluation
    );

    return evaluation.compatibility;

  }

    /*
    ============================================================
    SPACE TYPE HELPERS
    ============================================================
  */


  function normalizeSpaceType(
    spaceType
  ) {

    const normalizationMap = {

      "container":
        "containers",

      "containers":
        "containers",

      "raised-beds":
        "raised-bed",

      "raised-bed":
        "raised-bed",

      "garden-bed":
        "in-ground",

      "in-ground":
        "in-ground",

      "field":
        "open-field",

      "open-field":
        "open-field",

      "fenceline":
        "fence-line",

      "fence-line":
        "fence-line",

      "unused-lawn":
        "unused-lawn",

      "forage-frame":
        "forage-frame",

      "orchard":
        "orchard",

      "woodland-edge":
        "woodland-edge"

    };

    return normalizationMap[
      spaceType
    ] || spaceType;

  }



  function getSpaceTypeScoreKeys(
    spaceType
  ) {

    const normalizedType =
      normalizeSpaceType(
        spaceType
      );

    const keyMap = {

      "containers": [
        "containers",
        "container",
        "containerGrowing",
        "containerSuitability"
      ],

      "raised-bed": [
        "raisedBed",
        "raisedBeds",
        "raised-bed"
      ],

      "in-ground": [
        "inGround",
        "gardenBed",
        "in-ground"
      ],

      "open-field": [
        "openField",
        "field",
        "open-field"
      ],

      "fence-line": [
        "fenceLine",
        "fence-line"
      ],

      "unused-lawn": [
        "unusedLawn",
        "unused-lawn"
      ],

      "forage-frame": [
        "forageFrame",
        "forage-frame"
      ],

      "orchard": [
        "orchard"
      ],

      "woodland-edge": [
        "woodlandEdge",
        "woodland-edge"
      ]

    };

    return keyMap[
      normalizedType
    ] || [
      normalizedType
    ];

  }



  function findSpaceTypeScore(
    space,
    spaceType
  ) {

    if (
      !space ||
      !spaceType
    ) {
      return null;
    }

    const scoreCollections = [

      space.spaceTypeScores,

      space.suitableSpaceTypeScores,

      space.growingSpaceScores,

      space.layoutTypeScores

    ].filter(
      collection =>
        collection &&
        typeof collection ===
          "object"
    );

    const possibleKeys =
      getSpaceTypeScoreKeys(
        spaceType
      );

    for (
      const collection
      of scoreCollections
    ) {

      for (
        const key
        of possibleKeys
      ) {

        const value =
          collection[
            key
          ];

        if (
          Number.isFinite(
            value
          )
        ) {

          return convertFivePointScore(
            value
          );

        }

      }

    }

    return null;

  }



  function getBestAvailableSpaceTypeScore(
    space,
    availableSpaceTypes
  ) {

    if (
      !space ||
      !Array.isArray(
        availableSpaceTypes
      ) ||
      availableSpaceTypes.length === 0
    ) {
      return null;
    }

    const scores =
      availableSpaceTypes
        .map(
          spaceType =>
            findSpaceTypeScore(
              space,
              spaceType
            )
        )
        .filter(
          Number.isFinite
        );

    if (
      scores.length === 0
    ) {
      return null;
    }

    return Math.max(
      ...scores
    );

  }



  /*
    ============================================================
    AVAILABLE AREA SCORING
    ============================================================
  */


  function getAreaScaleCategory(
    totalAreaSqFt
  ) {

    if (
      !Number.isFinite(
        totalAreaSqFt
      )
    ) {
      return null;
    }

    if (
      totalAreaSqFt <= 25
    ) {
      return "very-small";
    }

    if (
      totalAreaSqFt <= 75
    ) {
      return "small";
    }

    if (
      totalAreaSqFt <= 250
    ) {
      return "medium";
    }

    if (
      totalAreaSqFt <= 750
    ) {
      return "large";
    }

    return "very-large";

  }



  function getAreaSuitabilityScore(
    space,
    totalAreaSqFt
  ) {

    if (
      !space ||
      !Number.isFinite(
        totalAreaSqFt
      )
    ) {
      return null;
    }

    const minimumUsefulArea =
      space.minimumUsefulAreaSqFt ??
      space.minimumPracticalAreaSqFt ??
      null;

    const preferredArea =
      space.preferredAreaSqFt ??
      space.preferredProductionAreaSqFt ??
      null;

    if (
      Number.isFinite(
        minimumUsefulArea
      ) &&
      totalAreaSqFt <
        minimumUsefulArea
    ) {

      const proportion =
        totalAreaSqFt /
        minimumUsefulArea;

      return clamp(
        proportion * 60,
        0,
        60
      );

    }

    if (
      Number.isFinite(
        preferredArea
      ) &&
      totalAreaSqFt >=
        preferredArea
    ) {
      return 100;
    }

    if (
      Number.isFinite(
        minimumUsefulArea
      ) &&
      Number.isFinite(
        preferredArea
      ) &&
      preferredArea >
        minimumUsefulArea
    ) {

      const progress =
        (
          totalAreaSqFt -
          minimumUsefulArea
        ) /
        (
          preferredArea -
          minimumUsefulArea
        );

      return clamp(
        72 +
        progress * 28,
        72,
        100
      );

    }

    const areaCategory =
      getAreaScaleCategory(
        totalAreaSqFt
      );

    const smallSpaceScore =
      convertFivePointScore(
        space.smallSpaceSuitabilityScore
      );

    const largePlotScore =
      convertFivePointScore(
        space.largePlotSuitabilityScore
      );

    const spaceEfficiencyScore =
      convertFivePointScore(
        space.spaceEfficiencyScore
      );

    if (
      areaCategory ===
        "very-small" ||
      areaCategory ===
        "small"
    ) {

      return averageKnownValues([

        smallSpaceScore,

        spaceEfficiencyScore

      ]);

    }

    if (
      areaCategory ===
        "large" ||
      areaCategory ===
        "very-large"
    ) {

      return averageKnownValues([

        largePlotScore,

        spaceEfficiencyScore

      ]);

    }

    return averageKnownValues([

      smallSpaceScore,

      largePlotScore,

      spaceEfficiencyScore

    ]);

  }



  /*
    ============================================================
    LAYOUT SHAPE SCORING
    ============================================================
  */


  function getLayoutShapeCompatibilityScore(
    space,
    layoutShape
  ) {

    if (
      !space ||
      !layoutShape
    ) {
      return null;
    }

    const preferredLayout =
      space.directFacts
        ?.bestProductionLayout;

    const supportRequired =
      space.supportStructureRequired ===
        true;

    const vineSpreadRequired =
      space.vineSpreadRequired ===
        true;

    if (
      vineSpreadRequired
    ) {

      const vineLayoutScores = {

        "small-beds":
          35,

        "wide-rectangle":
          85,

        "long-strip":
          72,

        "long-row":
          72,

        "open-block":
          95,

        "irregular":
          65

      };

      return vineLayoutScores[
        layoutShape
      ] ?? 65;

    }

    if (
      supportRequired
    ) {

      const supportLayoutScores = {

        "small-beds":
          72,

        "wide-rectangle":
          88,

        "long-strip":
          95,

        "long-row":
          95,

        "open-block":
          82,

        "irregular":
          60

      };

      return supportLayoutScores[
        layoutShape
      ] ?? 70;

    }

    if (
      preferredLayout ===
        "rows-or-blocks"
    ) {

      const rowBlockScores = {

        "small-beds":
          62,

        "wide-rectangle":
          92,

        "long-strip":
          88,

        "long-row":
          95,

        "open-block":
          95,

        "irregular":
          58

      };

      return rowBlockScores[
        layoutShape
      ] ?? 72;

    }

    if (
      preferredLayout ===
        "hedgerow" ||
      preferredLayout ===
        "linear-border"
    ) {

      const linearScores = {

        "small-beds":
          48,

        "wide-rectangle":
          75,

        "long-strip":
          100,

        "long-row":
          100,

        "open-block":
          65,

        "irregular":
          70

      };

      return linearScores[
        layoutShape
      ] ?? 70;

    }

    return 82;

  }



  /*
    ============================================================
    OVERFLOW AND PLANT-BEHAVIOR SCORING
    ============================================================
  */


  function getPlantBehaviorCompatibilityScore(
    space,
    answers
  ) {

    if (!space) {
      return null;
    }

    const restrictions =
      answers.space
        ?.plantBehaviorRestrictions ||
      [];

    const overflowOptions =
      answers.space
        ?.overflowOptions ||
      [];

    const factorScores = [];

    if (
      restrictions.includes(
        "no-vines-outside-bed"
      )
    ) {

      factorScores.push(
        space.vineSpreadRequired ===
          true
          ? 15
          : 100
      );

    }

    if (
      restrictions.includes(
        "must-remain-small"
      )
    ) {

      const maximumHeight =
        space.matureHeightFtMaximum;

      if (
        Number.isFinite(
          maximumHeight
        )
      ) {

        if (
          maximumHeight <= 3
        ) {
          factorScores.push(
            100
          );
        } else if (
          maximumHeight <= 6
        ) {
          factorScores.push(
            65
          );
        } else {
          factorScores.push(
            25
          );
        }

      }

      if (
        space.vineSpreadRequired ===
          true
      ) {
        factorScores.push(
          20
        );
      }

    }

    if (
      restrictions.includes(
        "no-self-seeding"
      )
    ) {

      factorScores.push(
        space.selfSeedingRisk ===
          true
          ? 35
          : 100
      );

    }

    if (
      restrictions.includes(
        "no-underground-spread"
      )
    ) {

      factorScores.push(
        space.undergroundSpreadRisk ===
          true
          ? 10
          : 100
      );

    }

    if (
      restrictions.includes(
        "no-support-structures"
      )
    ) {

      factorScores.push(
        space.supportStructureRequired ===
          true
          ? 20
          : 100
      );

    }

    if (
      space.vineSpreadRequired ===
        true
    ) {

      const hasUsefulOverflow =
        overflowOptions.some(
          option =>
            [
              "lawn",
              "unused-lawn",
              "fence-line",
              "open-ground",
              "pathway",
              "trellis"
            ].includes(
              option
            )
        );

      factorScores.push(
        hasUsefulOverflow
          ? 95
          : 45
      );

    }

    if (
      factorScores.length === 0
    ) {
      return 90;
    }

    return averageKnownValues(
      factorScores
    );

  }



  /*
    ============================================================
    CONTAINER-SPECIFIC SPACE SCORING
    ============================================================
  */


  function getContainerSpaceCompatibilityScore(
    space,
    answers
  ) {

    if (!space) {
      return null;
    }

    const availableSpaceTypes =
      answers.space
        ?.availableSpaceTypes ||
      [];

    const normalizedTypes =
      availableSpaceTypes.map(
        normalizeSpaceType
      );

    const containerOnly =
      normalizedTypes.length >
        0 &&
      normalizedTypes.every(
        spaceType =>
          spaceType ===
            "containers"
      );

    if (!containerOnly) {
      return null;
    }

    const containerCount =
      answers.space
        ?.containerCount;

    const containerScore =
      findSpaceTypeScore(
        space,
        "containers"
      );

    const supportRequired =
      space.supportStructureRequired ===
        true;

    const maximumHeight =
      space.matureHeightFtMaximum;

    const factorScores = [
      containerScore
    ];

    if (
      Number.isFinite(
        containerCount
      )
    ) {

      if (
        containerCount >= 8
      ) {
        factorScores.push(
          90
        );
      } else if (
        containerCount >= 4
      ) {
        factorScores.push(
          72
        );
      } else {
        factorScores.push(
          52
        );
      }

    }

    if (
      Number.isFinite(
        maximumHeight
      ) &&
      maximumHeight > 8
    ) {
      factorScores.push(
        30
      );
    }

    if (
      supportRequired
    ) {
      factorScores.push(
        60
      );
    }

    return averageKnownValues(
      factorScores
    );

  }



  /*
    ============================================================
    SPACE COMPATIBILITY
    ============================================================
  */


  function scoreSpaceCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .space;

    const space =
      crop.plannerData
        ?.space;

    if (!space) {

      evidence.warnings.push(
        "Crop space data is unavailable."
      );

      return evidence;

    }

    const totalAreaSqFt =
      answers.space
        ?.totalGrowingAreaSqFt;

    const availableSpaceTypes =
      answers.space
        ?.availableSpaceTypes ||
      [];

    const layoutShape =
      answers.space
        ?.largestAreaShape;

    const spaceTypeScore =
      getBestAvailableSpaceTypeScore(
        space,
        availableSpaceTypes
      );

    const areaScore =
      getAreaSuitabilityScore(
        space,
        totalAreaSqFt
      );

    const layoutScore =
      getLayoutShapeCompatibilityScore(
        space,
        layoutShape
      );

    const plantBehaviorScore =
      getPlantBehaviorCompatibilityScore(
        space,
        answers
      );

    const containerScore =
      getContainerSpaceCompatibilityScore(
        space,
        answers
      );

    const factors = [

      createCompatibilityFactor(
        "space-type",
        spaceTypeScore,
        0.27,
        Number.isFinite(
          spaceTypeScore
        )
          ? (
              spaceTypeScore >= 70
                ? "At least one available growing-space type is compatible with this crop."
                : "The available growing-space types are not well suited to this crop."
            )
          : null,
        spaceTypeScore >= 70
      ),

      createCompatibilityFactor(
        "available-area",
        areaScore,
        0.31,
        Number.isFinite(
          areaScore
        )
          ? (
              areaScore >= 70
                ? "The available growing area can support useful production."
                : "The available growing area may be too limited for practical production."
            )
          : null,
        areaScore >= 70
      ),

      createCompatibilityFactor(
        "layout-shape",
        layoutScore,
        0.14,
        Number.isFinite(
          layoutScore
        )
          ? (
              layoutScore >= 70
                ? "The available plot shape works with the crop's normal growth habit."
                : "The available plot shape may make planting, support, or harvesting inefficient."
            )
          : null,
        layoutScore >= 70
      ),

      createCompatibilityFactor(
        "plant-behavior",
        plantBehaviorScore,
        0.28,
        Number.isFinite(
          plantBehaviorScore
        )
          ? (
              plantBehaviorScore >= 70
                ? "The crop's mature size and growth behavior fit the selected restrictions."
                : "The crop's spread, height, support needs, or persistence conflict with the selected restrictions."
            )
          : null,
        plantBehaviorScore >= 70
      ),

      createCompatibilityFactor(
        "container-practicality",
        containerScore,
        Number.isFinite(
          containerScore
        )
          ? 0.14
          : 0,
        Number.isFinite(
          containerScore
        )
          ? (
              containerScore >= 70
                ? "Container production appears reasonably practical."
                : "Container-only production may provide limited yield or create management problems."
            )
          : null,
        containerScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    const restrictions =
      answers.space
        ?.plantBehaviorRestrictions ||
      [];

    if (
      restrictions.includes(
        "no-vines-outside-bed"
      ) &&
      space.vineSpreadRequired ===
        true
    ) {

      evidence.warnings.push(
        "This crop normally requires more spreading room than the selected bed restriction allows."
      );

    }

    if (
      restrictions.includes(
        "no-underground-spread"
      ) &&
      space.undergroundSpreadRisk ===
        true
    ) {

      evidence.warnings.push(
        "The crop may spread through persistent underground structures."
      );

    }

    if (
      restrictions.includes(
        "no-self-seeding"
      ) &&
      space.selfSeedingRisk ===
        true
    ) {

      evidence.warnings.push(
        "Volunteer seedlings may appear in later seasons."
      );

    }

    if (
      restrictions.includes(
        "no-support-structures"
      ) &&
      space.supportStructureRequired ===
        true
    ) {

      evidence.warnings.push(
        "The crop normally benefits from or requires a support structure."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    FLOCK SIZE HELPERS
    ============================================================
  */


  function getFlockSizeCategory(
    flockSize
  ) {

    if (
      !Number.isFinite(
        flockSize
      )
    ) {
      return null;
    }

    if (
      flockSize <= 4
    ) {
      return "very-small";
    }

    if (
      flockSize <= 10
    ) {
      return "small";
    }

    if (
      flockSize <= 20
    ) {
      return "medium";
    }

    if (
      flockSize <= 40
    ) {
      return "large";
    }

    return "very-large";

  }



  function getFlockSizeCompatibilityScore(
    flock,
    flockSize
  ) {

    if (
      !flock ||
      !Number.isFinite(
        flockSize
      )
    ) {
      return null;
    }

    const minimumRecommended =
      flock.minimumRecommendedFlockSize;

    const maximumPractical =
      flock.maximumPracticalFlockSize;

    if (
      Number.isFinite(
        minimumRecommended
      ) &&
      flockSize <
        minimumRecommended
    ) {

      return clamp(
        (
          flockSize /
          minimumRecommended
        ) *
        65,
        0,
        65
      );

    }

    if (
      Number.isFinite(
        maximumPractical
      ) &&
      flockSize >
        maximumPractical
    ) {

      const excessRatio =
        flockSize /
        maximumPractical;

      return clamp(
        100 -
        (
          excessRatio -
          1
        ) *
        45,
        25,
        100
      );

    }

    const category =
      getFlockSizeCategory(
        flockSize
      );

    const suitableCategories =
      flock.suitableFlockSizes;

    if (
      Array.isArray(
        suitableCategories
      ) &&
      suitableCategories.includes(
        category
      )
    ) {
      return 100;
    }

    const smallFlockScore =
      convertFivePointScore(
        flock.smallFlockSuitabilityScore
      );

    const largeFlockScore =
      convertFivePointScore(
        flock.largeFlockSuitabilityScore
      );

    if (
      category ===
        "very-small" ||
      category ===
        "small"
    ) {
      return smallFlockScore;
    }

    if (
      category ===
        "large" ||
      category ===
        "very-large"
    ) {
      return largeFlockScore;
    }

    return averageKnownValues([
      smallFlockScore,
      largeFlockScore
    ]);

  }



  /*
    ============================================================
    FLOCK PURPOSE HELPERS
    ============================================================
  */


  function getFlockPurposeCompatibilityScore(
    flock,
    primaryPurpose
  ) {

    if (
      !flock ||
      !primaryPurpose
    ) {
      return null;
    }

    const purposeFieldMap = {

      "eggs": [
        "layingFlockSuitabilityScore",
        "adultHenSuitabilityScore"
      ],

      "meat": [
        "broilerSuitabilityScore",
        "suitableForAdultMeatBirds"
      ],

      "breeding": [
        "breedingFlockSuitabilityScore",
        "suitableForBreedingFlocks"
      ],

      "mixed": [
        "adultHenSuitabilityScore",
        "broilerSuitabilityScore",
        "suitableForMixedAdultFlocks"
      ],

      "homestead": [
        "adultHenSuitabilityScore",
        "layingFlockSuitabilityScore",
        "broilerSuitabilityScore",
        "suitableForMixedAdultFlocks"
      ],

      "pets-enrichment": [
        "confinementEnrichmentScore",
        "directFeedingSimplicityScore"
      ]

    };

    const fields =
      purposeFieldMap[
        primaryPurpose
      ];

    if (!fields) {
      return null;
    }

    const scores =
      fields.map(
        field => {

          const value =
            flock[
              field
            ];

          if (
            typeof value ===
              "boolean"
          ) {
            return scoreFromBoolean(
              value
            );
          }

          return convertFivePointScore(
            value
          );

        }
      );

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    FORAGE ACCESS HELPERS
    ============================================================
  */


  function getForageAccessCompatibilityScore(
    flock,
    forageAccess
  ) {

    if (
      !flock ||
      !forageAccess
    ) {
      return null;
    }

    const freeRangeScore =
      convertFivePointScore(
        flock.freeRangeCompatibilityScore
      );

    const confinementScore =
      convertFivePointScore(
        flock.confinementEnrichmentScore
      );

    const cutAndCarryScore =
      convertFivePointScore(
        flock.cutAndCarrySuitabilityScore
      );

    const controlledGrazingScore =
      convertFivePointScore(
        flock
          .controlledGrazingSuitabilityScore
      );

    if (
      forageAccess ===
        "none"
    ) {

      return averageKnownValues([
        confinementScore,
        cutAndCarryScore
      ]);

    }

    if (
      forageAccess ===
        "protected-forage-frame"
    ) {

      return averageKnownValues([
        controlledGrazingScore,
        confinementScore,
        cutAndCarryScore
      ]);

    }

    if (
      [
        "limited",
        "limited-weekly",
        "occasional"
      ].includes(
        forageAccess
      )
    ) {

      return averageKnownValues([
        cutAndCarryScore,
        controlledGrazingScore,
        freeRangeScore
      ]);

    }

    if (
      [
        "rotational-paddock",
        "daily-limited",
        "free-range"
      ].includes(
        forageAccess
      )
    ) {

      return averageKnownValues([
        freeRangeScore,
        controlledGrazingScore
      ]);

    }

    return averageKnownValues([
      freeRangeScore,
      confinementScore,
      cutAndCarryScore
    ]);

  }



  /*
    ============================================================
    FEEDING COMPLEXITY HELPERS
    ============================================================
  */


  function getFeedingManagementScore(
    flock,
    answers
  ) {

    if (!flock) {
      return null;
    }

    const primaryPurpose =
      answers.flock
        ?.primaryFlockPurpose;

    const enrichmentFocused =
      primaryPurpose ===
        "pets-enrichment";

    const directFeedingScore =
      convertFivePointScore(
        flock.directFeedingSimplicityScore
      );

    const consumptionEfficiency =
      convertFivePointScore(
        flock
          .flockConsumptionEfficiencyScore
      );

    const rationNeed =
      convertFivePointScore(
        flock.rationFormulationNeedScore
      );

    const measurementRequired =
      flock.measuredSupplementRequired ===
        true ||
      flock.carefulMeasurementRequired ===
        true;

    const formulationKnowledgeRequired =
      flock
        .rationFormulationKnowledgeRequired ===
        true ||
      flock.processingKnowledgeRequired ===
        true;

    const scores = [
      directFeedingScore,
      consumptionEfficiency
    ];

    if (
      Number.isFinite(
        rationNeed
      )
    ) {

      scores.push(
        100 -
        rationNeed
      );

    }

    if (
      measurementRequired
    ) {

      scores.push(
        enrichmentFocused
          ? 62
          : 55
      );

    }

    if (
      formulationKnowledgeRequired
    ) {
      scores.push(
        45
      );
    }

    if (
      flock.freeChoiceFeedingSuitable ===
        true
    ) {
      scores.push(
        95
      );
    }

    if (
      flock.directFacts
        ?.suitableForUnrestrictedAccess ===
        false
    ) {
      scores.push(
        55
      );
    }

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    FLOCK COMPATIBILITY
    ============================================================
  */


  function scoreFlockCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .flock;

    const flock =
      crop.plannerData
        ?.flock;

    if (!flock) {

      evidence.warnings.push(
        "Crop flock-use data is unavailable."
      );

      return evidence;

    }

    const flockSize =
      answers.flock
        ?.flockSize;

    const primaryPurpose =
      answers.flock
        ?.primaryFlockPurpose;

    const forageAccess =
      answers.flock
        ?.forageAccess;

    const flockSizeScore =
      getFlockSizeCompatibilityScore(
        flock,
        flockSize
      );

    const purposeScore =
      getFlockPurposeCompatibilityScore(
        flock,
        primaryPurpose
      );

    const forageAccessScore =
      getForageAccessCompatibilityScore(
        flock,
        forageAccess
      );

    const feedingManagementScore =
      getFeedingManagementScore(
        flock,
        answers
      );

    const factors = [

      createCompatibilityFactor(
        "flock-size",
        flockSizeScore,
        0.28,
        Number.isFinite(
          flockSizeScore
        )
          ? (
              flockSizeScore >= 70
                ? "The crop can provide practical value at the selected flock size."
                : "The crop may not scale efficiently for the selected flock size."
            )
          : null,
        flockSizeScore >= 70
      ),

      createCompatibilityFactor(
        "flock-purpose",
        purposeScore,
        0.27,
        Number.isFinite(
          purposeScore
        )
          ? (
              purposeScore >= 70
                ? "The crop's poultry use fits the flock's primary purpose."
                : "The crop is not especially well aligned with the flock's primary purpose."
            )
          : null,
        purposeScore >= 70
      ),

      createCompatibilityFactor(
        "forage-access",
        forageAccessScore,
        0.22,
        Number.isFinite(
          forageAccessScore
        )
          ? (
              forageAccessScore >= 70
                ? "The crop can be delivered effectively through the selected forage-access system."
                : "The selected forage-access system may not suit this crop's preferred feeding method."
            )
          : null,
        forageAccessScore >= 70
      ),

      createCompatibilityFactor(
        "feeding-management",
        feedingManagementScore,
        0.23,
        Number.isFinite(
          feedingManagementScore
        )
          ? (
              feedingManagementScore >= 70
                ? "The crop can be incorporated into flock management without excessive feeding complexity."
                : "The crop may require careful measurement, processing, or ration-management knowledge."
            )
          : null,
        feedingManagementScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    if (
      flock.completeFeedReplacementSuitable ===
        false ||
      flock.directFacts
        ?.completeRationReplacement ===
        false
    ) {

      evidence.warnings.push(
        "This crop should be treated as a supplement rather than a replacement for complete poultry feed."
      );

    }

    if (
      flock.measuredSupplementRequired ===
        true
    ) {

      evidence.warnings.push(
        "Measured feeding is recommended."
      );

    }

    if (
      flock
        .rationFormulationKnowledgeRequired ===
        true ||
      flock.rationFormulationNeedScore >=
        4
    ) {

      evidence.warnings.push(
        "Balanced-ration knowledge may be needed for safe and effective use."
      );

    }

    if (
      flock.gradualIntroductionRequired ===
        true
    ) {

      evidence.warnings.push(
        "Introduce the crop gradually and observe flock intake and waste."
      );

    }

    if (
      forageAccess ===
        "none" &&
      flock.cutAndCarrySuitabilityScore <=
        2 &&
      flock.confinementEnrichmentScore <=
        2
    ) {

      evidence.warnings.push(
        "This crop may provide limited practical value where chickens have no direct forage access."
      );

    }

    return evidence;

  }


  /*
    ============================================================
    LABOR EXPERIENCE HELPERS
    ============================================================
  */


  function getGardeningExperienceScore(
    experience
  ) {

    const experienceScoreMap = {

      "none":
        45,

      "beginner":
        68,

      "intermediate":
        84,

      "experienced":
        96,

      "advanced":
        100

    };

    return experienceScoreMap[
      experience
    ] ?? null;

  }



  function getWeeklyTimeCapacityScore(
    weeklyCropTime
  ) {

    const weeklyTimeScoreMap = {

      "under-30-min":
        38,

      "30-60-min":
        58,

      "1-2-hours":
        78,

      "3-5-hours":
        94,

      "6-10-hours":
        100,

      "over-10-hours":
        100,

      "seasonal":
        82

    };

    return weeklyTimeScoreMap[
      weeklyCropTime
    ] ?? null;

  }



  /*
    ============================================================
    CROP LABOR-DEMAND HELPERS
    ============================================================
  */


  function convertLaborLevelToDemand(
    laborLevel
  ) {

    const laborDemandMap = {

      "very-low":
        15,

      "low":
        28,

      "low-to-moderate":
        40,

      "moderate":
        55,

      "moderate-to-high":
        72,

      "high":
        85,

      "very-high":
        96

    };

    return laborDemandMap[
      laborLevel
    ] ?? null;

  }



  function getCropGeneralLaborDemand(
    labor
  ) {

    if (!labor) {
      return null;
    }

    const demandScores = [

      convertLaborLevelToDemand(
        labor.weeklyLaborLevel
      ),

      convertLaborLevelToDemand(
        labor.peakWorkloadLevel
      ),

      convertLaborLevelToDemand(
        labor.establishmentLaborLevel
      ),

      convertLaborLevelToDemand(
        labor.maintenanceLaborLevel
      ),

      convertLaborLevelToDemand(
        labor.harvestLaborLevel
      ),

      convertLaborLevelToDemand(
        labor.processingLaborLevel
      )

    ];

    const fivePointDemandFields = [

      labor.establishmentLaborScore,

      labor.maintenanceLaborScore,

      labor.harvestLaborScore,

      labor.processingLaborScore,

      labor.physicalDemandScore,

      labor.skillRequirementScore,

      labor.equipmentDependencyScore

    ];

    fivePointDemandFields.forEach(
      value => {

        const converted =
          convertFivePointScore(
            value
          );

        if (
          Number.isFinite(
            converted
          )
        ) {
          demandScores.push(
            converted
          );
        }

      }
    );

    return averageKnownValues(
      demandScores
    );

  }



  function getLaborCapacityFitScore(
    labor,
    answers
  ) {

    if (!labor) {
      return null;
    }

    const experience =
      answers.labor
        ?.gardeningExperience;

    const weeklyCropTime =
      answers.labor
        ?.weeklyCropTime;

    const experienceCapacity =
      getGardeningExperienceScore(
        experience
      );

    const timeCapacity =
      getWeeklyTimeCapacityScore(
        weeklyCropTime
      );

    const userCapacity =
      calculateWeightedFactorScore([

        createCompatibilityFactor(
          "experience-capacity",
          experienceCapacity,
          0.42,
          null,
          false
        ),

        createCompatibilityFactor(
          "time-capacity",
          timeCapacity,
          0.58,
          null,
          false
        )

      ]);

    const cropDemand =
      getCropGeneralLaborDemand(
        labor
      );

    if (
      !Number.isFinite(
        userCapacity
      )
    ) {
      return null;
    }

    if (
      !Number.isFinite(
        cropDemand
      )
    ) {
      return userCapacity;
    }

    const capacityMargin =
      userCapacity -
      cropDemand;

    if (
      capacityMargin >= 25
    ) {
      return 100;
    }

    if (
      capacityMargin >= 10
    ) {
      return 92;
    }

    if (
      capacityMargin >= 0
    ) {
      return 80;
    }

    if (
      capacityMargin >= -15
    ) {

      return clamp(
        80 +
        capacityMargin * 2,
        50,
        80
      );

    }

    return clamp(
      50 +
      (
        capacityMargin +
        15
      ) *
      1.5,
      0,
      50
    );

  }



  /*
    ============================================================
    BEGINNER-FRIENDLINESS HELPERS
    ============================================================
  */


  function getBeginnerCompatibilityScore(
    labor,
    answers
  ) {

    if (!labor) {
      return null;
    }

    const experience =
      answers.labor
        ?.gardeningExperience;

    const beginnerPriority =
      answers.preferences
        ?.beginnerFriendlinessPriority;

    const beginnerFriendliness =
      convertFivePointScore(
        labor.beginnerFriendlinessScore
      );

    const physicalAccessibility =
      convertFivePointScore(
        labor.physicalAccessibilityScore
      );

    const soloGrowerSuitability =
      convertFivePointScore(
        labor.suitableForSoloGrowersScore
      );

    const skillRequirement =
      convertFivePointScore(
        labor.skillRequirementScore
      );

    const scores = [

      beginnerFriendliness,

      physicalAccessibility,

      soloGrowerSuitability,

      Number.isFinite(
        skillRequirement
      )
        ? 100 -
          skillRequirement
        : null

    ];

    let cropSuitability =
      averageKnownValues(
        scores
      );

    if (
      !Number.isFinite(
        cropSuitability
      )
    ) {
      return null;
    }

    const beginnerUser =
      experience ===
        "none" ||
      experience ===
        "beginner";

    const priorityIsHigh =
      [
        "essential",
        "high"
      ].includes(
        beginnerPriority
      );

    if (
      beginnerUser &&
      priorityIsHigh
    ) {
      return cropSuitability;
    }

    if (beginnerUser) {

      return averageKnownValues([
        cropSuitability,
        72
      ]);

    }

    if (
      priorityIsHigh
    ) {

      return averageKnownValues([
        cropSuitability,
        82
      ]);

    }

    /*
      Advanced users should not be penalized merely because
      a crop has low beginner friendliness.
    */

    return averageKnownValues([
      cropSuitability,
      94
    ]);

  }



  /*
    ============================================================
    LOW-TIME USER HELPERS
    ============================================================
  */


  function getLowTimeCompatibilityScore(
    labor,
    answers
  ) {

    if (!labor) {
      return null;
    }

    const weeklyCropTime =
      answers.labor
        ?.weeklyCropTime;

    const lowTimeSuitability =
      convertFivePointScore(
        labor.suitableForLowTimeUsersScore
      );

    const perennialMaintenanceEase =
      convertFivePointScore(
        labor.perennialMaintenanceEaseScore
      );

    const harvestEase =
      convertFivePointScore(
        labor.harvestEaseScore
      );

    const lowTimeUser =
      [
        "under-30-min",
        "30-60-min"
      ].includes(
        weeklyCropTime
      );

    if (lowTimeUser) {

      return averageKnownValues([

        lowTimeSuitability,

        perennialMaintenanceEase,

        harvestEase

      ]);

    }

    if (
      weeklyCropTime ===
        "1-2-hours"
    ) {

      return averageKnownValues([

        lowTimeSuitability,

        perennialMaintenanceEase,

        harvestEase,

        82

      ]);

    }

    return averageKnownValues([

      lowTimeSuitability,

      perennialMaintenanceEase,

      harvestEase,

      95

    ]);

  }



  /*
    ============================================================
    TASK NORMALIZATION

    The questionnaire often uses broad task IDs such as
    "dry", "remove-seed", or "clean-sort".

    Crop use paths may use more specific task IDs such as
    "dry-grain-heads", "thresh", or "inspect-moisture".

    These helpers compare task families without requiring
    every questionnaire answer to list every crop-specific
    wording.
    ============================================================
  */


  function getProcessingTaskFamily(
    task
  ) {

    if (!task) {
      return null;
    }

    const normalizedTask =
      String(task)
        .toLowerCase();

    const familyPatterns = [

      {
        family:
          "harvest",

        patterns: [
          "harvest",
          "cut",
          "pick",
          "dig",
          "gather",
          "remove-head",
          "remove-cob"
        ]
      },

      {
        family:
          "dry",

        patterns: [
          "dry",
          "dehydrate",
          "cure",
          "inspect-moisture"
        ]
      },

      {
        family:
          "thresh",

        patterns: [
          "thresh",
          "remove-seed",
          "shell",
          "dehull",
          "de-awn"
        ]
      },

      {
        family:
          "clean-sort",

        patterns: [
          "clean",
          "sort",
          "screen",
          "winnow",
          "inspect"
        ]
      },

      {
        family:
          "chop",

        patterns: [
          "chop",
          "slice",
          "cut-leaves",
          "cut-forage"
        ]
      },

      {
        family:
          "grind",

        patterns: [
          "grind",
          "mill",
          "crack"
        ]
      },

      {
        family:
          "cook",

        patterns: [
          "cook",
          "boil",
          "heat-treat"
        ]
      },

      {
        family:
          "measure",

        patterns: [
          "measure",
          "weigh",
          "portion"
        ]
      },

      {
        family:
          "mix",

        patterns: [
          "mix",
          "blend",
          "formulate"
        ]
      },

      {
        family:
          "wash",

        patterns: [
          "wash",
          "rinse",
          "sanitize"
        ]
      },

      {
        family:
          "manage-crop",

        patterns: [
          "establish",
          "plant",
          "manage-growth",
          "terminate",
          "mow",
          "incorporate",
          "control-access"
        ]
      }

    ];

    const match =
      familyPatterns.find(
        entry =>
          entry.patterns.some(
            pattern =>
              normalizedTask.includes(
                pattern
              )
          )
      );

    return match
      ? match.family
      : normalizedTask;

  }



  function userAcceptsProcessingTask(
    requiredTask,
    acceptedTasks
  ) {

    if (
      !requiredTask ||
      !Array.isArray(
        acceptedTasks
      )
    ) {
      return false;
    }

    if (
      acceptedTasks.includes(
        requiredTask
      )
    ) {
      return true;
    }

    const requiredFamily =
      getProcessingTaskFamily(
        requiredTask
      );

    return acceptedTasks.some(
      acceptedTask =>
        getProcessingTaskFamily(
          acceptedTask
        ) ===
          requiredFamily
    );

  }



  function getUsePathTaskAcceptanceScore(
    usePath,
    answers
  ) {

    if (!usePath) {
      return null;
    }

    const requiredTasks =
      Array.isArray(
        usePath.requiredProcessingTasks
      )
        ? usePath.requiredProcessingTasks
        : [];

    if (
      requiredTasks.length === 0
    ) {
      return 100;
    }

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    /*
      Basic inspection, simple harvesting, and portioning
      are treated as normal crop-handling work rather than
      specialized processing refusals.
    */

    const ordinaryTaskFamilies =
      new Set([
        "harvest",
        "clean-sort",
        "measure",
        "manage-crop"
      ]);

    let acceptedCount = 0;

    requiredTasks.forEach(
      task => {

        const taskFamily =
          getProcessingTaskFamily(
            task
          );

        if (
          ordinaryTaskFamilies.has(
            taskFamily
          ) ||
          userAcceptsProcessingTask(
            task,
            acceptedTasks
          )
        ) {
          acceptedCount += 1;
        }

      }
    );

    return (
      acceptedCount /
      requiredTasks.length
    ) *
      100;

  }



  function getBestUsePathTaskAcceptanceScore(
    crop,
    answers
  ) {

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    if (
      !Array.isArray(
        usePaths
      ) ||
      usePaths.length === 0
    ) {
      return null;
    }

    const scores =
      usePaths
        .map(
          usePath =>
            getUsePathTaskAcceptanceScore(
              usePath,
              answers
            )
        )
        .filter(
          Number.isFinite
        );

    if (
      scores.length === 0
    ) {
      return null;
    }

    return Math.max(
      ...scores
    );

  }



  /*
    ============================================================
    EQUIPMENT COMPATIBILITY
    ============================================================
  */


  function userHasOrWillAcquireEquipment(
    equipmentId,
    answers
  ) {

    const ownedEquipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const purchaseWillingness =
      answers.labor
        ?.equipmentPurchaseWillingness ||
      [];

    return (
      ownedEquipment.includes(
        equipmentId
      ) ||
      purchaseWillingness.includes(
        equipmentId
      )
    );

  }



  function getUsePathEquipmentScore(
    usePath,
    answers
  ) {

    if (!usePath) {
      return null;
    }

    const requiredEquipment =
      Array.isArray(
        usePath.requiredEquipment
      )
        ? usePath.requiredEquipment
        : [];

    if (
      requiredEquipment.length === 0
    ) {
      return 100;
    }

    const availableCount =
      requiredEquipment.filter(
        equipmentId =>
          userHasOrWillAcquireEquipment(
            equipmentId,
            answers
          )
      ).length;

    return (
      availableCount /
      requiredEquipment.length
    ) *
      100;

  }



  function getBestUsePathEquipmentScore(
    crop,
    answers
  ) {

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    if (
      !Array.isArray(
        usePaths
      ) ||
      usePaths.length === 0
    ) {
      return null;
    }

    const scores =
      usePaths
        .map(
          usePath =>
            getUsePathEquipmentScore(
              usePath,
              answers
            )
        )
        .filter(
          Number.isFinite
        );

    if (
      scores.length === 0
    ) {
      return null;
    }

    return Math.max(
      ...scores
    );

  }



  /*
    ============================================================
    LABOR COMPATIBILITY
    ============================================================
  */


  function scoreLaborCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .labor;

    const labor =
      crop.plannerData
        ?.labor;

    if (!labor) {

      evidence.warnings.push(
        "Crop labor data is unavailable."
      );

      return evidence;

    }

    const capacityFitScore =
      getLaborCapacityFitScore(
        labor,
        answers
      );

    const beginnerScore =
      getBeginnerCompatibilityScore(
        labor,
        answers
      );

    const lowTimeScore =
      getLowTimeCompatibilityScore(
        labor,
        answers
      );

    const taskAcceptanceScore =
      getBestUsePathTaskAcceptanceScore(
        crop,
        answers
      );

    const equipmentScore =
      getBestUsePathEquipmentScore(
        crop,
        answers
      );

    const factors = [

      createCompatibilityFactor(
        "labor-capacity",
        capacityFitScore,
        0.31,
        Number.isFinite(
          capacityFitScore
        )
          ? (
              capacityFitScore >= 70
                ? "The visitor's experience and available time are compatible with the crop's general workload."
                : "The crop may require more time or skill than the visitor selected."
            )
          : null,
        capacityFitScore >= 70
      ),

      createCompatibilityFactor(
        "beginner-fit",
        beginnerScore,
        0.18,
        Number.isFinite(
          beginnerScore
        )
          ? (
              beginnerScore >= 70
                ? "The crop's learning requirements fit the selected experience level."
                : "The crop may be difficult for a beginner or for someone prioritizing simplicity."
            )
          : null,
        beginnerScore >= 70
      ),

      createCompatibilityFactor(
        "low-time-fit",
        lowTimeScore,
        0.17,
        Number.isFinite(
          lowTimeScore
        )
          ? (
              lowTimeScore >= 70
                ? "The crop can fit within the selected recurring time commitment."
                : "The crop may create more recurring or peak-season labor than the visitor wants."
            )
          : null,
        lowTimeScore >= 70
      ),

      createCompatibilityFactor(
        "processing-task-fit",
        taskAcceptanceScore,
        0.22,
        Number.isFinite(
          taskAcceptanceScore
        )
          ? (
              taskAcceptanceScore >= 70
                ? "At least one crop use path fits the processing tasks the visitor accepts."
                : "Most practical crop uses require processing tasks the visitor did not select."
            )
          : null,
        taskAcceptanceScore >= 70
      ),

      createCompatibilityFactor(
        "equipment-fit",
        equipmentScore,
        0.12,
        Number.isFinite(
          equipmentScore
        )
          ? (
              equipmentScore >= 70
                ? "At least one crop use path can be completed with available or acceptable equipment."
                : "Useful crop processing may require equipment the visitor does not own or plan to obtain."
            )
          : null,
        equipmentScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    const weeklyCropTime =
      answers.labor
        ?.weeklyCropTime;

    if (
      [
        "under-30-min",
        "30-60-min"
      ].includes(
        weeklyCropTime
      ) &&
      labor.peakWorkloadLevel ===
        "high"
    ) {

      evidence.warnings.push(
        "Although routine maintenance may be manageable, harvest may create a concentrated high-workload period."
      );

    }

    if (
      answers.labor
        ?.gardeningExperience ===
          "beginner" &&
      labor.beginnerFriendlinessScore <=
        2
    ) {

      evidence.warnings.push(
        "This crop may require techniques that are difficult for a first-time grower."
      );

    }

    if (
      Number.isFinite(
        taskAcceptanceScore
      ) &&
      taskAcceptanceScore <
        50
    ) {

      evidence.warnings.push(
        "The visitor declined many of the processing tasks required by this crop's available use paths."
      );

    }

    if (
      Number.isFinite(
        equipmentScore
      ) &&
      equipmentScore <
        50
    ) {

      evidence.warnings.push(
        "Required processing equipment may be unavailable."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    HARVEST PRODUCT MATCHING
    ============================================================
  */


  function getHarvestProductFamily(
    productId
  ) {

    if (!productId) {
      return null;
    }

    const normalized =
      String(productId)
        .toLowerCase();

    const productFamilies = [

      {
        family:
          "fresh-greens",

        patterns: [
          "fresh-green",
          "fresh-leaf",
          "fresh-leaves",
          "young-leaf",
          "young-shoot",
          "green-forage",
          "fresh-forage",
          "fresh-cereal-forage"
        ]
      },

      {
        family:
          "living-forage",

        patterns: [
          "living-forage",
          "pasture",
          "grazing",
          "forage-frame"
        ]
      },

      {
        family:
          "dry-grain",

        patterns: [
          "dry-seed",
          "dry-grain",
          "whole-grain",
          "stored-grain",
          "kernel",
          "cereal-grain",
          "barley-grain",
          "corn-grain",
          "millet-grain"
        ]
      },

      {
        family:
          "seed-heads",

        patterns: [
          "seed-head",
          "grain-head",
          "panicle",
          "whole-head"
        ]
      },

      {
        family:
          "fresh-produce",

        patterns: [
          "fresh-vegetable",
          "fresh-fruit",
          "fallen-fruit",
          "fresh-produce"
        ]
      },

      {
        family:
          "storage-produce",

        patterns: [
          "storage-vegetable",
          "winter-storage",
          "storage-produce",
          "tuber",
          "pumpkin",
          "squash"
        ]
      },

      {
        family:
          "dried-forage",

        patterns: [
          "dried-forage",
          "dried-leaf",
          "dried-leaves",
          "hay"
        ]
      },

      {
        family:
          "processed-feed",

        patterns: [
          "ground",
          "meal",
          "ration-ingredient",
          "processed-grain"
        ]
      },

      {
        family:
          "biomass",

        patterns: [
          "biomass",
          "mulch",
          "compost",
          "bedding",
          "straw",
          "cover-crop"
        ]
      },

      {
        family:
          "enrichment",

        patterns: [
          "enrichment",
          "foraging"
        ]
      }

    ];

    const match =
      productFamilies.find(
        entry =>
          entry.patterns.some(
            pattern =>
              normalized.includes(
                pattern
              )
          )
      );

    return match
      ? match.family
      : normalized;

  }



  function harvestProductMatches(
    desiredProduct,
    usePathProduct
  ) {

    if (
      desiredProduct ===
        usePathProduct
    ) {
      return true;
    }

    return (
      getHarvestProductFamily(
        desiredProduct
      ) ===
      getHarvestProductFamily(
        usePathProduct
      )
    );

  }



  function getUsePathProductMatchScore(
    usePath,
    answers
  ) {

    const desiredProducts =
      answers.harvestStorage
        ?.desiredHarvestProducts ||
      [];

    if (
      desiredProducts.length === 0
    ) {
      return null;
    }

    const harvestProducts =
      Array.isArray(
        usePath?.harvestProducts
      )
        ? usePath.harvestProducts
        : [];

    if (
      harvestProducts.length === 0
    ) {
      return 0;
    }

    const matchedDesiredProducts =
      desiredProducts.filter(
        desiredProduct =>
          harvestProducts.some(
            usePathProduct =>
              harvestProductMatches(
                desiredProduct,
                usePathProduct
              )
          )
      );

    return (
      matchedDesiredProducts.length /
      desiredProducts.length
    ) *
      100;

  }



  /*
    ============================================================
    HARVEST-PATTERN MATCHING
    ============================================================
  */


  function normalizeHarvestPattern(
    harvestPattern
  ) {

    if (!harvestPattern) {
      return null;
    }

    const normalized =
      String(harvestPattern)
        .toLowerCase();

    if (
      normalized.includes(
        "continuous"
      ) ||
      normalized.includes(
        "repeated"
      ) ||
      normalized.includes(
        "repeatable"
      )
    ) {
      return "continuous";
    }

    if (
      normalized.includes(
        "minor"
      )
    ) {
      return "minor";
    }

    if (
      normalized.includes(
        "batch"
      ) ||
      normalized.includes(
        "as-needed"
      )
    ) {
      return "batch";
    }

    if (
      normalized.includes(
        "major"
      ) ||
      normalized.includes(
        "single-seasonal"
      ) ||
      normalized.includes(
        "once-per-season"
      )
    ) {
      return "major";
    }

    if (
      normalized.includes(
        "cleanup"
      )
    ) {
      return "cleanup";
    }

    return normalized;
  }



  function getUsePathHarvestPatternScore(
    usePath,
    answers
  ) {

    const preferredPattern =
      normalizeHarvestPattern(
        answers.harvestStorage
          ?.harvestPatternPreference
      );

    if (!preferredPattern) {
      return null;
    }

    const pathPatterns = [

      normalizeHarvestPattern(
        usePath?.harvestPattern
      ),

      normalizeHarvestPattern(
        usePath?.harvestFrequencyCategory
      )

    ].filter(
      Boolean
    );

    if (
      pathPatterns.length === 0
    ) {
      return null;
    }

    if (
      pathPatterns.includes(
        preferredPattern
      )
    ) {
      return 100;
    }

    const compatibilityMap = {

      "continuous": {
        minor:
          78,

        batch:
          55,

        major:
          20,

        cleanup:
          35
      },

      "minor": {
        continuous:
          88,

        batch:
          72,

        major:
          48,

        cleanup:
          55
      },

      "batch": {
        continuous:
          70,

        minor:
          76,

        major:
          82,

        cleanup:
          58
      },

      "major": {
        continuous:
          42,

        minor:
          58,

        batch:
          88,

        cleanup:
          45
      },

      "cleanup": {
        continuous:
          55,

        minor:
          72,

        batch:
          65,

        major:
          52
      }

    };

    const compatibleScores =
      pathPatterns
        .map(
          pathPattern =>
            compatibilityMap[
              preferredPattern
            ]?.[
              pathPattern
            ]
        )
        .filter(
          Number.isFinite
        );

    if (
      compatibleScores.length === 0
    ) {
      return 50;
    }

    return Math.max(
      ...compatibleScores
    );

  }



  /*
    ============================================================
    STORAGE-DURATION MATCHING
    ============================================================
  */


  function convertStorageDurationToMonths(
    storageDuration
  ) {

    const durationMap = {

      "immediate":
        0,

      "very-short":
        0.25,

      "short":
        1,

      "short-term":
        1,

      "1-3-months":
        2,

      "short-to-moderate":
        3,

      "moderate":
        4,

      "3-6-months":
        4.5,

      "medium-term":
        4.5,

      "moderate-to-long":
        7,

      "6-12-months":
        9,

      "long":
        10,

      "long-term":
        12,

      "seasonal-to-long":
        8

    };

    if (
      durationMap[
        storageDuration
      ] !== undefined
    ) {
      return durationMap[
        storageDuration
      ];
    }

    const normalized =
      String(
        storageDuration || ""
      ).toLowerCase();

    if (
      normalized.includes(
        "immediate"
      )
    ) {
      return 0;
    }

    if (
      normalized.includes(
        "very-short"
      )
    ) {
      return 0.25;
    }

    if (
      normalized.includes(
        "short-to-moderate"
      )
    ) {
      return 3;
    }

    if (
      normalized.includes(
        "moderate-to-long"
      )
    ) {
      return 7;
    }

    if (
      normalized.includes(
        "short"
      )
    ) {
      return 1;
    }

    if (
      normalized.includes(
        "moderate"
      )
    ) {
      return 4;
    }

    if (
      normalized.includes(
        "long"
      )
    ) {
      return 10;
    }

    return null;

  }



  function getUsePathStorageDurationScore(
    usePath,
    answers
  ) {

    const desiredDuration =
      answers.harvestStorage
        ?.desiredStorageDuration;

    if (!desiredDuration) {
      return null;
    }

    const desiredMonths =
      convertStorageDurationToMonths(
        desiredDuration
      );

    const availableMonths =
      convertStorageDurationToMonths(
        usePath?.storageDurationCategory
      );

    if (
      !Number.isFinite(
        desiredMonths
      ) ||
      !Number.isFinite(
        availableMonths
      )
    ) {
      return null;
    }

    if (
      desiredMonths === 0
    ) {

      if (
        availableMonths <= 0.5
      ) {
        return 100;
      }

      if (
        availableMonths <= 3
      ) {
        return 72;
      }

      return 45;

    }

    if (
      availableMonths >=
        desiredMonths
    ) {
      return 100;
    }

    const proportion =
      availableMonths /
      desiredMonths;

    return clamp(
      proportion * 100,
      15,
      100
    );

  }



  /*
    ============================================================
    MINIMAL-PREPARATION MATCHING
    ============================================================
  */


  function getPreparationPriorityDemand(
    preparationPriority
  ) {

    const priorityMap = {

      "top":
        100,

      "high":
        85,

      "moderate":
        65,

      "low":
        35,

      "none":
        0

    };

    return priorityMap[
      preparationPriority
    ] ?? null;

  }



  function getUsePathPreparationScore(
    usePath,
    answers
  ) {

    const priorityDemand =
      getPreparationPriorityDemand(
        answers.harvestStorage
          ?.minimalPreparationPriority
      );

    const preparationEase =
      convertFivePointScore(
        usePath?.preparationEaseScore
      );

    const processingEfficiency =
      convertFivePointScore(
        usePath
          ?.processingEfficiencyScore
      );

    const harvestEase =
      convertFivePointScore(
        usePath?.harvestEaseScore
      );

    const pathEase =
      averageKnownValues([

        preparationEase,

        processingEfficiency,

        harvestEase

      ]);

    if (
      !Number.isFinite(
        pathEase
      )
    ) {
      return null;
    }

    if (
      !Number.isFinite(
        priorityDemand
      ) ||
      priorityDemand === 0
    ) {
      return 90;
    }

    const priorityFraction =
      priorityDemand /
      100;

    return clamp(
      90 +
      (
        pathEase -
        90
      ) *
      priorityFraction,
      0,
      100
    );

  }



  /*
    ============================================================
    DRYING CAPABILITY
    ============================================================
  */


  function getDryingCapabilityLevel(
    dryingCapability
  ) {

    const levelMap = {

      "none":
        0,

      "very-small":
        1,

      "small-racks":
        2,

      "small-covered":
        2,

      "large-covered":
        3,

      "protected-large":
        4,

      "grain-moisture-skilled":
        5

    };

    return levelMap[
      dryingCapability
    ] ?? null;

  }



  function getUsePathDryingScore(
    usePath,
    answers
  ) {

    if (
      usePath?.dryingRequired !==
        true
    ) {
      return 100;
    }

    const dryingCapability =
      answers.labor
        ?.dryingCapability;

    const capabilityLevel =
      getDryingCapabilityLevel(
        dryingCapability
      );

    if (
      !Number.isFinite(
        capabilityLevel
      )
    ) {
      return null;
    }

    if (
      capabilityLevel === 0
    ) {
      return 0;
    }

    const dryingFacilities =
      answers.labor
        ?.dryingFacilities ||
      [];

    let score =
      capabilityLevel * 18;

    if (
      dryingFacilities.some(
        facility =>
          [
            "covered-rack",
            "screens-trays",
            "drying-screen",
            "drying-rack"
          ].includes(
            facility
          )
      )
    ) {
      score += 10;
    }

    if (
      dryingFacilities.includes(
        "fans"
      )
    ) {
      score += 8;
    }

    if (
      dryingFacilities.includes(
        "barn-shed"
      ) ||
      dryingFacilities.includes(
        "climate-controlled"
      )
    ) {
      score += 8;
    }

    return clamp(
      score,
      0,
      100
    );

  }



  /*
    ============================================================
    STORAGE ENVIRONMENT
    ============================================================
  */


  function getUsePathStorageEnvironmentScore(
    usePath,
    answers
  ) {

    if (!usePath) {
      return null;
    }

    const desiredDuration =
      answers.harvestStorage
        ?.desiredStorageDuration;

    const desiredMonths =
      convertStorageDurationToMonths(
        desiredDuration
      );

    const storageHumidity =
      answers.harvestStorage
        ?.storageHumidity;

    const dryStorageLocations =
      answers.harvestStorage
        ?.dryStorageLocations ||
      [];

    const dryContainer =
      answers.harvestStorage
        ?.dryCropContainerType;

    const rodentProtection =
      answers.harvestStorage
        ?.rodentProtection;

    const storageRequired =
      Number.isFinite(
        desiredMonths
      ) &&
      desiredMonths > 0;

    if (!storageRequired) {
      return 95;
    }

    const scores = [];

    if (
      usePath.moistureSensitive ===
        true
    ) {

      const humidityScores = {

        "consistently-dry":
          100,

        "usually-dry":
          84,

        "seasonally-humid":
          62,

        "often-humid":
          35,

        "unknown":
          55

      };

      scores.push(
        humidityScores[
          storageHumidity
        ] ?? null
      );

    } else {
      scores.push(
        88
      );
    }

    if (
      dryStorageLocations.length >
        0
    ) {

      const protectedLocation =
        dryStorageLocations.some(
          location =>
            [
              "climate-controlled",
              "indoor-pantry",
              "indoor-storage",
              "barn-shed",
              "protected-room",
              "dry-basement"
            ].includes(
              location
            )
        );

      scores.push(
        protectedLocation
          ? 92
          : 62
      );

    } else {

      scores.push(
        usePath.storageDurationCategory ===
          "immediate"
          ? 90
          : 35
      );

    }

    if (
      [
        "airtight-food-safe",
        "sealed-food-safe",
        "metal-grain-can",
        "food-safe-bucket"
      ].includes(
        dryContainer
      )
    ) {
      scores.push(
        100
      );
    } else if (
      dryContainer
    ) {
      scores.push(
        68
      );
    }

    const rodentRisk =
      convertFivePointScore(
        usePath.rodentRiskScore
      );

    if (
      Number.isFinite(
        rodentRisk
      )
    ) {

      const protectionScores = {

        "rodent-proof-containers":
          100,

        "rodent-proof-room":
          100,

        "protected-room":
          82,

        "basic-containers":
          58,

        "none":
          20

      };

      const protectionScore =
        protectionScores[
          rodentProtection
        ] ?? 50;

      const riskFraction =
        rodentRisk /
        100;

      scores.push(
        clamp(
          85 +
          (
            protectionScore -
            85
          ) *
          riskFraction,
          0,
          100
        )
      );

    }

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    USE-PATH HARVEST/STORAGE SUMMARY

    This does not replace the detailed Phase 4 use-path
    evaluator.

    It measures whether the crop has at least one broadly
    practical harvest and storage pathway for the visitor.
    ============================================================
  */


  function scoreUsePathHarvestStorageFit(
    usePath,
    answers
  ) {

    if (!usePath) {
      return null;
    }

    const productScore =
      getUsePathProductMatchScore(
        usePath,
        answers
      );

    const patternScore =
      getUsePathHarvestPatternScore(
        usePath,
        answers
      );

    const durationScore =
      getUsePathStorageDurationScore(
        usePath,
        answers
      );

    const preparationScore =
      getUsePathPreparationScore(
        usePath,
        answers
      );

    const dryingScore =
      getUsePathDryingScore(
        usePath,
        answers
      );

    const environmentScore =
      getUsePathStorageEnvironmentScore(
        usePath,
        answers
      );

    const storageEfficiency =
      convertFivePointScore(
        usePath.storageEfficiencyScore
      );

    const preservationFlexibility =
      convertFivePointScore(
        usePath
          .preservationFlexibilityScore
      );

    return calculateWeightedFactorScore([

      createCompatibilityFactor(
        "harvest-product-match",
        productScore,
        0.26,
        null,
        false
      ),

      createCompatibilityFactor(
        "harvest-pattern-match",
        patternScore,
        0.13,
        null,
        false
      ),

      createCompatibilityFactor(
        "storage-duration-match",
        durationScore,
        0.15,
        null,
        false
      ),

      createCompatibilityFactor(
        "preparation-fit",
        preparationScore,
        0.14,
        null,
        false
      ),

      createCompatibilityFactor(
        "drying-capability",
        dryingScore,
        0.13,
        null,
        false
      ),

      createCompatibilityFactor(
        "storage-environment",
        environmentScore,
        0.11,
        null,
        false
      ),

      createCompatibilityFactor(
        "storage-efficiency",
        storageEfficiency,
        0.04,
        null,
        false
      ),

      createCompatibilityFactor(
        "preservation-flexibility",
        preservationFlexibility,
        0.04,
        null,
        false
      )

    ]);

  }



  function getBestHarvestStorageUsePath(
    crop,
    answers
  ) {

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    if (
      !Array.isArray(
        usePaths
      ) ||
      usePaths.length === 0
    ) {
      return null;
    }

    const scoredPaths =
      usePaths
        .map(
          usePath => {

            return {

              usePath,

              score:
                scoreUsePathHarvestStorageFit(
                  usePath,
                  answers
                )

            };

          }
        )
        .filter(
          result =>
            Number.isFinite(
              result.score
            )
        )
        .sort(
          (
            first,
            second
          ) =>
            second.score -
            first.score
        );

    return scoredPaths[0] ||
      null;

  }



  /*
    ============================================================
    HARVEST AND STORAGE COMPATIBILITY
    ============================================================
  */


  function scoreHarvestStorageCompatibility(
    crop,
    answers,
    evaluation
  ) {

    const evidence =
      evaluation
        .compatibility
        .harvestStorage;

    const usePaths =
      crop.plannerData
        ?.usePaths;

    if (
      !Array.isArray(
        usePaths
      ) ||
      usePaths.length === 0
    ) {

      evidence.warnings.push(
        "No crop use paths are available for harvest and storage evaluation."
      );

      return evidence;

    }

    const bestResult =
      getBestHarvestStorageUsePath(
        crop,
        answers
      );

    if (!bestResult) {

      evidence.warnings.push(
        "No use path contained enough harvest or storage information to evaluate."
      );

      return evidence;

    }

    const bestPath =
      bestResult.usePath;

    const productScore =
      getUsePathProductMatchScore(
        bestPath,
        answers
      );

    const patternScore =
      getUsePathHarvestPatternScore(
        bestPath,
        answers
      );

    const durationScore =
      getUsePathStorageDurationScore(
        bestPath,
        answers
      );

    const preparationScore =
      getUsePathPreparationScore(
        bestPath,
        answers
      );

    const dryingScore =
      getUsePathDryingScore(
        bestPath,
        answers
      );

    const environmentScore =
      getUsePathStorageEnvironmentScore(
        bestPath,
        answers
      );

    const factors = [

      createCompatibilityFactor(
        "harvest-product",
        productScore,
        0.28,
        Number.isFinite(
          productScore
        )
          ? (
              productScore >= 70
                ? "The crop can provide at least one of the requested harvest products."
                : "The crop's practical harvest products do not closely match the visitor's request."
            )
          : null,
        productScore >= 70
      ),

      createCompatibilityFactor(
        "harvest-pattern",
        patternScore,
        0.14,
        Number.isFinite(
          patternScore
        )
          ? (
              patternScore >= 70
                ? "The crop's harvest timing fits the preferred harvest pattern."
                : "The crop's harvest timing differs from the preferred pattern."
            )
          : null,
        patternScore >= 70
      ),

      createCompatibilityFactor(
        "storage-duration",
        durationScore,
        0.15,
        Number.isFinite(
          durationScore
        )
          ? (
              durationScore >= 70
                ? "The crop can meet the requested storage duration."
                : "The crop may not remain usable for the requested storage period."
            )
          : null,
        durationScore >= 70
      ),

      createCompatibilityFactor(
        "minimal-preparation",
        preparationScore,
        0.14,
        Number.isFinite(
          preparationScore
        )
          ? (
              preparationScore >= 70
                ? "The crop's preparation demands fit the visitor's preference."
                : "The crop may require more preparation than the visitor wants."
            )
          : null,
        preparationScore >= 70
      ),

      createCompatibilityFactor(
        "drying-capability",
        dryingScore,
        0.14,
        Number.isFinite(
          dryingScore
        )
          ? (
              dryingScore >= 70
                ? "The visitor has adequate drying capability for the strongest matching use path."
                : "The matching use path may require drying capacity the visitor does not have."
            )
          : null,
        dryingScore >= 70
      ),

      createCompatibilityFactor(
        "storage-environment",
        environmentScore,
        0.15,
        Number.isFinite(
          environmentScore
        )
          ? (
              environmentScore >= 70
                ? "The available storage environment can reasonably protect the harvested product."
                : "Humidity, containers, rodents, or storage location may threaten the harvested product."
            )
          : null,
        environmentScore >= 70
      )

    ];

    finalizeEvidenceObject(
      evidence,
      factors
    );

    evidence.bestPreliminaryUsePathId =
      bestPath.id || null;

    evidence.bestPreliminaryUsePathLabel =
      bestPath.label || null;

    evidence.bestPreliminaryUsePathScore =
      roundScore(
        bestResult.score
      );

    if (
      bestPath.dryingRequired ===
        true &&
      answers.labor
        ?.dryingCapability ===
          "none"
    ) {

      evidence.warnings.push(
        "The best matching harvest product requires drying, but the visitor selected no drying capability."
      );

    }

    if (
      bestPath.moistureSensitive ===
        true &&
      answers.harvestStorage
        ?.storageHumidity ===
          "often-humid"
    ) {

      evidence.warnings.push(
        "Humid storage conditions may increase heating, mold, spoilage, or quality loss."
      );

    }

    if (
      bestPath.rodentRiskScore >=
        4 &&
      answers.harvestStorage
        ?.rodentProtection ===
          "none"
    ) {

      evidence.warnings.push(
        "The harvested product has substantial rodent risk, but no rodent protection was selected."
      );

    }

    if (
      bestPath.moldRiskScore >=
        4 &&
      bestPath.dryingRequired ===
        true
    ) {

      evidence.warnings.push(
        "Careful drying and repeated storage inspection will be important for this use path."
      );

    }

    if (
      bestPath.storedInsectRiskScore >=
        4
    ) {

      evidence.warnings.push(
        "Longer storage may require monitoring or control for stored-product insects."
      );

    }

    return evidence;

  }



  /*
    ============================================================
    UPDATED COMPATIBILITY ORCHESTRATOR

    This replaces evaluateCompatibility() from Part 5.
    ============================================================
  */


  /*
    ============================================================
    COMPATIBILITY CATEGORY WEIGHTS

    These defaults are used only when the centralized engine
    configuration does not provide category weights.
    ============================================================
  */


  function getCompatibilityCategoryWeights() {

    const configuredWeights =
      config.scoring
        ?.engine
        ?.compatibilityCategoryWeights;

    if (
      configuredWeights &&
      typeof configuredWeights ===
        "object"
    ) {
      return configuredWeights;
    }

    return {

      climate:
        0.14,

      site:
        0.08,

      soil:
        0.13,

      water:
        0.13,

      space:
        0.15,

      flock:
        0.10,

      labor:
        0.13,

      harvestStorage:
        0.14

    };

  }



  /*
    ============================================================
    COMPATIBILITY CATEGORY SUMMARY
    ============================================================
  */


  function getCompatibilityCategoryLabel(
    categoryId
  ) {

    const labelMap = {

      climate:
        "Climate",

      site:
        "Site",

      soil:
        "Soil",

      water:
        "Water",

      space:
        "Space",

      flock:
        "Flock",

      labor:
        "Labor",

      harvestStorage:
        "Harvest and Storage"

    };

    return labelMap[
      categoryId
    ] || categoryId;

  }



  function createCompatibilityCategoryResult(
    categoryId,
    evidence,
    weight
  ) {

    const score =
      Number.isFinite(
        evidence?.score
      )
        ? clamp(
            evidence.score,
            0,
            100
          )
        : null;

    const evidenceCoverage =
      Number.isFinite(
        evidence?.evidenceCoverage
      )
        ? clamp(
            evidence.evidenceCoverage,
            0,
            1
          )
        : 0;

    return {

      id:
        categoryId,

      label:
        getCompatibilityCategoryLabel(
          categoryId
        ),

      score,

      weight:
        Number.isFinite(
          weight
        )
          ? Math.max(
              0,
              weight
            )
          : 0,

      evidenceCoverage,

      matchedFactors:
        Array.isArray(
          evidence?.matchedFactors
        )
          ? [
              ...evidence.matchedFactors
            ]
          : [],

      missedFactors:
        Array.isArray(
          evidence?.missedFactors
        )
          ? [
              ...evidence.missedFactors
            ]
          : [],

      warnings:
        Array.isArray(
          evidence?.warnings
        )
          ? [
              ...evidence.warnings
            ]
          : []

    };

  }



  function calculateCompatibilityScore(
    categoryResults
  ) {

    const knownResults =
      categoryResults.filter(
        result =>
          Number.isFinite(
            result.score
          ) &&
          result.weight > 0
      );

    if (
      knownResults.length === 0
    ) {
      return null;
    }

    const totalKnownWeight =
      knownResults.reduce(
        (
          total,
          result
        ) =>
          total +
          result.weight,
        0
      );

    if (
      totalKnownWeight <= 0
    ) {
      return null;
    }

    const weightedScore =
      knownResults.reduce(
        (
          total,
          result
        ) =>
          total +
          (
            result.score *
            (
              result.weight /
              totalKnownWeight
            )
          ),
        0
      );

    return roundScore(
      weightedScore
    );

  }



  function calculateCompatibilityCoverage(
    categoryResults
  ) {

    const weightedCategories =
      categoryResults.filter(
        result =>
          result.weight > 0
      );

    if (
      weightedCategories.length === 0
    ) {
      return 0;
    }

    const totalWeight =
      weightedCategories.reduce(
        (
          total,
          result
        ) =>
          total +
          result.weight,
        0
      );

    if (
      totalWeight <= 0
    ) {
      return 0;
    }

    const coveredWeight =
      weightedCategories.reduce(
        (
          total,
          result
        ) =>
          total +
          (
            result.weight *
            result.evidenceCoverage
          ),
        0
      );

    return clamp(
      coveredWeight /
        totalWeight,
      0,
      1
    );

  }



  function getSortedKnownCompatibilityCategories(
    categoryResults
  ) {

    return categoryResults
      .filter(
        result =>
          Number.isFinite(
            result.score
          )
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



  function getStrongCompatibilityCategories(
    categoryResults
  ) {

    return getSortedKnownCompatibilityCategories(
      categoryResults
    )
      .filter(
        result =>
          result.score >= 75
      )
      .slice(
        0,
        3
      )
      .map(
        result => ({

          id:
            result.id,

          label:
            result.label,

          score:
            result.score

        })
      );

  }



  function getWeakCompatibilityCategories(
    categoryResults
  ) {

    return getSortedKnownCompatibilityCategories(
      categoryResults
    )
      .filter(
        result =>
          result.score < 60
      )
      .reverse()
      .slice(
        0,
        3
      )
      .map(
        result => ({

          id:
            result.id,

          label:
            result.label,

          score:
            result.score

        })
      );

  }



  function finalizeCompatibility(
    evaluation
  ) {

    const compatibility =
      evaluation.compatibility;

    const categoryWeights =
      getCompatibilityCategoryWeights();

    const categoryIds = [

      "climate",

      "site",

      "soil",

      "water",

      "space",

      "flock",

      "labor",

      "harvestStorage"

    ];

    const categoryResults =
      categoryIds.map(
        categoryId =>
          createCompatibilityCategoryResult(
            categoryId,
            compatibility[
              categoryId
            ],
            categoryWeights[
              categoryId
            ]
          )
      );

    compatibility.categoryResults =
      categoryResults;

    compatibility.score =
      calculateCompatibilityScore(
        categoryResults
      );

    compatibility.evidenceCoverage =
      calculateCompatibilityCoverage(
        categoryResults
      );

    compatibility.strongestCategories =
      getStrongCompatibilityCategories(
        categoryResults
      );

    compatibility.weakestCategories =
      getWeakCompatibilityCategories(
        categoryResults
      );

    compatibility.matchedFactors =
      categoryResults.flatMap(
        result =>
          result.matchedFactors.map(
            message => ({

              categoryId:
                result.id,

              categoryLabel:
                result.label,

              message

            })
          )
      );

    compatibility.missedFactors =
      categoryResults.flatMap(
        result =>
          result.missedFactors.map(
            message => ({

              categoryId:
                result.id,

              categoryLabel:
                result.label,

              message

            })
          )
      );

    compatibility.warnings =
      categoryResults.flatMap(
        result =>
          result.warnings.map(
            message => ({

              categoryId:
                result.id,

              categoryLabel:
                result.label,

              message

            })
          )
      );

    return compatibility;

  }



  /*
    ============================================================
    PHASE 3
    GOAL ALIGNMENT

    Goal alignment evaluates what the visitor wants the crop
    to accomplish.

    Compatibility asks:

      "Can this crop work here?"

    Goal alignment asks:

      "Does this crop provide the value the visitor wants?"
    ============================================================
  */



  /*
    ============================================================
    GOAL OBJECT INITIALIZATION
    ============================================================
  */


  function ensureGoalEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.goals ||
      typeof evaluation.goals !==
        "object"
    ) {

      evaluation.goals = {};

    }

    const goals =
      evaluation.goals;

    goals.score =
      Number.isFinite(
        goals.score
      )
        ? goals.score
        : null;

    goals.evidenceCoverage =
      Number.isFinite(
        goals.evidenceCoverage
      )
        ? goals.evidenceCoverage
        : 0;

    goals.selectedGoals =
      Array.isArray(
        goals.selectedGoals
      )
        ? goals.selectedGoals
        : [];

    goals.goalResults =
      Array.isArray(
        goals.goalResults
      )
        ? goals.goalResults
        : [];

    goals.matchedGoals =
      Array.isArray(
        goals.matchedGoals
      )
        ? goals.matchedGoals
        : [];

    goals.partialGoals =
      Array.isArray(
        goals.partialGoals
      )
        ? goals.partialGoals
        : [];

    goals.weakGoals =
      Array.isArray(
        goals.weakGoals
      )
        ? goals.weakGoals
        : [];

    goals.warnings =
      Array.isArray(
        goals.warnings
      )
        ? goals.warnings
        : [];

    return goals;

  }



  /*
    ============================================================
    GOAL LABELS
    ============================================================
  */


  function getPlannerGoalLabel(
    goalId
  ) {

    const labelMap = {

      "reduce-feed-cost":
        "Reduce Purchased Feed Cost",

      "high-yield":
        "High Production",

      "fast-value":
        "Fastest Useful Value",

      "short-season-production":
        "Short-Season Production",

      "low-labor":
        "Low Labor",

      "low-water":
        "Low Water Demand",

      "long-storage":
        "Long-Term Storage",

      "minimal-processing":
        "Minimal Processing",

      "fresh-greens":
        "Fresh Greens",

      "living-forage":
        "Living Forage",

      "forage-enrichment":
        "Forage and Enrichment",

      "protein":
        "Protein Supplement",

      "energy":
        "Energy Supplement",

      "minerals":
        "Mineral and Micronutrient Support",

      "winter-feed":
        "Winter Feed Value",

      "perennial":
        "Perennial Production",

      "soil-improvement":
        "Soil Improvement",

      "cover-crop":
        "Cover Crop Value",

      "pollinator-support":
        "Pollinator Support",

      "wildlife-resistant":
        "Lower Wildlife Pressure",

      "beginner-friendly":
        "Beginner Friendly",

      "small-space":
        "Small-Space Production",

      "large-flock":
        "Large-Flock Production",

      "storage-feed":
        "Stored Feed Production",

      "resilience":
        "Resilient Production"

    };

    return labelMap[
      goalId
    ] || goalId;

  }



  /*
    ============================================================
    GOAL PRIORITY NORMALIZATION

    The questionnaire may store priorities as:

    - an ordered array of goal IDs;
    - an array of objects;
    - an object keyed by goal ID;
    - or selected goals without separate rankings.

    This helper supports all of those forms.
    ============================================================
  */


  function getGoalPriorityWeightByRank(
    rank
  ) {

    const configuredRankWeights =
      config.scoring
        ?.engine
        ?.goalPriorityRankWeights;

    if (
      Array.isArray(
        configuredRankWeights
      ) &&
      Number.isFinite(
        configuredRankWeights[
          rank
        ]
      )
    ) {

      return Math.max(
        0,
        configuredRankWeights[
          rank
        ]
      );

    }

    const defaultWeights = [

      1.00,

      0.84,

      0.70,

      0.58,

      0.48,

      0.40,

      0.34,

      0.30

    ];

    return defaultWeights[
      rank
    ] ?? 0.26;

  }



  function convertPriorityValueToWeight(
    priorityValue
  ) {

    if (
      Number.isFinite(
        priorityValue
      )
    ) {

      if (
        priorityValue >= 0 &&
        priorityValue <= 1
      ) {
        return priorityValue;
      }

      if (
        priorityValue >= 1 &&
        priorityValue <= 5
      ) {

        return clamp(
          priorityValue /
            5,
          0,
          1
        );

      }

      if (
        priorityValue > 5 &&
        priorityValue <= 100
      ) {

        return clamp(
          priorityValue /
            100,
          0,
          1
        );

      }

    }

    const priorityMap = {

      "essential":
        1.00,

      "highest":
        1.00,

      "very-high":
        0.95,

      "high":
        0.85,

      "important":
        0.80,

      "medium":
        0.65,

      "moderate":
        0.65,

      "normal":
        0.55,

      "low":
        0.38,

      "optional":
        0.25,

      "not-important":
        0.10

    };

    return priorityMap[
      priorityValue
    ] ?? null;

  }



  function normalizeGoalPriorities(
    answers
  ) {

    const selectedGoals =
      Array.isArray(
        answers.preferences
          ?.plannerGoals
      )
        ? answers.preferences
            .plannerGoals
        : [];

    const rawPriorities =
      answers.preferences
        ?.goalPriorities;

    const priorityMap =
      new Map();

    if (
      Array.isArray(
        rawPriorities
      )
    ) {

      rawPriorities.forEach(
        (
          item,
          index
        ) => {

          if (
            typeof item ===
              "string"
          ) {

            priorityMap.set(
              item,
              getGoalPriorityWeightByRank(
                index
              )
            );

            return;

          }

          if (
            item &&
            typeof item ===
              "object"
          ) {

            const goalId =
              item.goalId ??
              item.id ??
              item.value ??
              null;

            if (!goalId) {
              return;
            }

            const explicitWeight =
              convertPriorityValueToWeight(
                item.weight ??
                item.priority ??
                item.importance
              );

            const rank =
              Number.isFinite(
                item.rank
              )
                ? Math.max(
                    0,
                    item.rank -
                    1
                  )
                : index;

            priorityMap.set(
              goalId,
              Number.isFinite(
                explicitWeight
              )
                ? explicitWeight
                : getGoalPriorityWeightByRank(
                    rank
                  )
            );

          }

        }
      );

    } else if (
      rawPriorities &&
      typeof rawPriorities ===
        "object"
    ) {

      Object.entries(
        rawPriorities
      ).forEach(
        (
          [
            goalId,
            priorityValue
          ]
        ) => {

          const weight =
            convertPriorityValueToWeight(
              priorityValue
            );

          if (
            Number.isFinite(
              weight
            )
          ) {

            priorityMap.set(
              goalId,
              weight
            );

          }

        }
      );

    }

    selectedGoals.forEach(
      (
        goalId,
        index
      ) => {

        if (
          !priorityMap.has(
            goalId
          )
        ) {

          priorityMap.set(
            goalId,
            getGoalPriorityWeightByRank(
              index
            )
          );

        }

      }
    );

    return selectedGoals.map(
      goalId => ({

        id:
          goalId,

        label:
          getPlannerGoalLabel(
            goalId
          ),

        weight:
          priorityMap.get(
            goalId
          ) ?? 0.50

      })
    );

  }



  /*
    ============================================================
    CROP VALUE HELPERS
    ============================================================
  */


  function getFirstKnownNumericValue(
    values
  ) {

    for (
      const value
      of values
    ) {

      if (
        Number.isFinite(
          value
        )
      ) {
        return value;
      }

    }

    return null;

  }



  function getConvertedFivePointValue(
    values
  ) {

    for (
      const value
      of values
    ) {

      const converted =
        convertFivePointScore(
          value
        );

      if (
        Number.isFinite(
          converted
        )
      ) {
        return converted;
      }

    }

    return null;

  }



  function invertKnownScore(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return null;
    }

    return clamp(
      100 -
      score,
      0,
      100
    );

  }



  /*
    ============================================================
    DIRECT GOAL SCORE LOOKUP
    ============================================================
  */


  function getDirectGoalScore(
    crop,
    goalId
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    if (!goals) {
      return null;
    }

    const possibleCollections = [

      goals.goalScores,

      goals.plannerGoalScores,

      goals.scores,

      goals.goalAlignmentScores

    ].filter(
      collection =>
        collection &&
        typeof collection ===
          "object"
    );

    const camelCaseGoalId =
      goalId.replace(
        /-([a-z])/g,
        (
          match,
          character
        ) =>
          character.toUpperCase()
      );

    const possibleKeys = [

      goalId,

      camelCaseGoalId,

      `${camelCaseGoalId}Score`,

      `${goalId}Score`

    ];

    for (
      const collection
      of possibleCollections
    ) {

      for (
        const key
        of possibleKeys
      ) {

        const value =
          collection[
            key
          ];

        if (
          Number.isFinite(
            value
          )
        ) {

          return convertFivePointScore(
            value
          );

        }

      }

    }

    for (
      const key
      of possibleKeys
    ) {

      const value =
        goals[
          key
        ];

      if (
        Number.isFinite(
          value
        )
      ) {

        return convertFivePointScore(
          value
        );

      }

    }

    return null;

  }



  /*
    ============================================================
    DERIVED ECONOMIC AND PRODUCTION GOALS
    ============================================================
  */


  function getFeedCostReductionGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const space =
      crop.plannerData
        ?.space;

    const flock =
      crop.plannerData
        ?.flock;

    const cost =
      crop.plannerData
        ?.cost;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.feedCostReductionScore,

        goals
          ?.purchasedFeedDisplacementScore,

        cost
          ?.feedCostReductionPotentialScore,

        cost
          ?.economicValueScore

      ]),

      getConvertedFivePointValue([

        space
          ?.spaceEfficiencyScore,

        goals
          ?.yieldEfficiencyScore

      ]),

      getConvertedFivePointValue([

        flock
          ?.flockConsumptionEfficiencyScore

      ])

    ]);

  }



  function getHighYieldGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const space =
      crop.plannerData
        ?.space;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals?.yieldScore,

        goals
          ?.highYieldSuitabilityScore,

        goals
          ?.productionPotentialScore,

        goals
          ?.biomassProductionScore

      ]),

      getConvertedFivePointValue([

        space
          ?.spaceEfficiencyScore,

        space
          ?.largePlotSuitabilityScore

      ])

    ]);

  }



  function getFastValueGoalScore(
    crop
  ) {

    const lifecycle =
      crop.plannerData
        ?.lifecycle;

    const goals =
      crop.plannerData
        ?.goals;

    const directScore =
      getConvertedFivePointValue([

        goals
          ?.fastValueScore,

        goals
          ?.rapidProductionScore,

        lifecycle
          ?.fastValueSuitabilityScore

      ]);

    const yearsToHarvest =
      getFirstKnownNumericValue([

        lifecycle
          ?.yearsToFirstUsefulHarvest,

        lifecycle
          ?.yearsToFirstHarvest

      ]);

    const daysToHarvest =
      getFirstKnownNumericValue([

        lifecycle
          ?.daysToFirstUsefulHarvest,

        lifecycle
          ?.daysToHarvestMinimum,

        lifecycle
          ?.daysToMaturityMinimum

      ]);

    const timingScores = [
      directScore
    ];

    if (
      Number.isFinite(
        yearsToHarvest
      )
    ) {

      if (
        yearsToHarvest <= 0
      ) {
        timingScores.push(
          100
        );
      } else if (
        yearsToHarvest <= 1
      ) {
        timingScores.push(
          78
        );
      } else if (
        yearsToHarvest <= 2
      ) {
        timingScores.push(
          48
        );
      } else {
        timingScores.push(
          20
        );
      }

    }

    if (
      Number.isFinite(
        daysToHarvest
      )
    ) {

      if (
        daysToHarvest <= 45
      ) {
        timingScores.push(
          100
        );
      } else if (
        daysToHarvest <= 75
      ) {
        timingScores.push(
          88
        );
      } else if (
        daysToHarvest <= 110
      ) {
        timingScores.push(
          72
        );
      } else if (
        daysToHarvest <= 150
      ) {
        timingScores.push(
          55
        );
      } else {
        timingScores.push(
          35
        );
      }

    }

    return averageKnownValues(
      timingScores
    );

  }



  function getShortSeasonGoalScore(
    crop
  ) {

    const climate =
      crop.plannerData
        ?.climate;

    const lifecycle =
      crop.plannerData
        ?.lifecycle;

    const goals =
      crop.plannerData
        ?.goals;

    const directScore =
      getConvertedFivePointValue([

        goals
          ?.shortSeasonSuitabilityScore,

        climate
          ?.shortSeasonSuitabilityScore,

        lifecycle
          ?.shortSeasonSuitabilityScore

      ]);

    const minimumDays =
      getFirstKnownNumericValue([

        climate
          ?.minimumFrostFreeDays,

        climate
          ?.daysToMaturityMinimum,

        lifecycle
          ?.daysToMaturityMinimum

      ]);

    const scores = [
      directScore
    ];

    if (
      Number.isFinite(
        minimumDays
      )
    ) {

      if (
        minimumDays <= 75
      ) {
        scores.push(
          100
        );
      } else if (
        minimumDays <= 100
      ) {
        scores.push(
          85
        );
      } else if (
        minimumDays <= 130
      ) {
        scores.push(
          68
        );
      } else if (
        minimumDays <= 160
      ) {
        scores.push(
          48
        );
      } else {
        scores.push(
          28
        );
      }

    }

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    DERIVED RESOURCE AND MANAGEMENT GOALS
    ============================================================
  */


  function getLowLaborGoalScore(
    crop
  ) {

    const labor =
      crop.plannerData
        ?.labor;

    const goals =
      crop.plannerData
        ?.goals;

    const laborDemand =
      getCropGeneralLaborDemand(
        labor
      );

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.lowLaborSuitabilityScore,

        labor
          ?.suitableForLowTimeUsersScore,

        labor
          ?.perennialMaintenanceEaseScore

      ]),

      invertKnownScore(
        laborDemand
      )

    ]);

  }



  function getLowWaterGoalScore(
    crop
  ) {

    const water =
      crop.plannerData
        ?.water;

    const goals =
      crop.plannerData
        ?.goals;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.lowWaterSuitabilityScore,

        water
          ?.suitableForLimitedIrrigationScore,

        water
          ?.suitableForRainfallOnlyScore

      ]),

      getConvertedFivePointValue([

        water
          ?.droughtSurvivalScore,

        water
          ?.droughtYieldRetentionScore

      ])

    ]);

  }



  function getLongStorageGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    const directScore =
      getConvertedFivePointValue([

        goals
          ?.longStorageSuitabilityScore,

        goals
          ?.storedFeedSuitabilityScore

      ]);

    const usePathScores =
      usePaths
        .map(
          usePath =>
            averageKnownValues([

              convertFivePointScore(
                usePath
                  .storageEfficiencyScore
              ),

              convertFivePointScore(
                usePath
                  .preservationFlexibilityScore
              ),

              (() => {

                const months =
                  convertStorageDurationToMonths(
                    usePath
                      .storageDurationCategory
                  );

                if (
                  !Number.isFinite(
                    months
                  )
                ) {
                  return null;
                }

                if (
                  months >= 10
                ) {
                  return 100;
                }

                if (
                  months >= 6
                ) {
                  return 85;
                }

                if (
                  months >= 3
                ) {
                  return 65;
                }

                if (
                  months >= 1
                ) {
                  return 42;
                }

                return 15;

              })()

            ])
        )
        .filter(
          Number.isFinite
        );

    return averageKnownValues([

      directScore,

      usePathScores.length > 0
        ? Math.max(
            ...usePathScores
          )
        : null

    ]);

  }



  function getMinimalProcessingGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    const pathScores =
      usePaths
        .map(
          usePath => {

            const requiredTasks =
              Array.isArray(
                usePath
                  .requiredProcessingTasks
              )
                ? usePath
                    .requiredProcessingTasks
                : [];

            const taskCountScore =

              requiredTasks.length === 0
                ? 100
                : requiredTasks.length === 1
                  ? 88
                  : requiredTasks.length === 2
                    ? 72
                    : requiredTasks.length === 3
                      ? 55
                      : 35;

            return averageKnownValues([

              taskCountScore,

              convertFivePointScore(
                usePath
                  .preparationEaseScore
              ),

              convertFivePointScore(
                usePath
                  .processingEfficiencyScore
              ),

              convertFivePointScore(
                usePath
                  .harvestEaseScore
              )

            ]);

          }
        )
        .filter(
          Number.isFinite
        );

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.minimalProcessingSuitabilityScore,

        goals
          ?.directFeedingSuitabilityScore

      ]),

      pathScores.length > 0
        ? Math.max(
            ...pathScores
          )
        : null

    ]);

  }



  /*
    ============================================================
    DERIVED FEED-ROLE GOALS
    ============================================================
  */


  function getNutritionalRoleScore(
    crop,
    roleId
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const flock =
      crop.plannerData
        ?.flock;

    const roleCollections = [

      goals
        ?.nutritionalRoleScores,

      goals
        ?.feedRoleScores,

      goals
        ?.nutritionScores,

      flock
        ?.nutritionalRoleScores

    ].filter(
      collection =>
        collection &&
        typeof collection ===
          "object"
    );

    const camelRole =
      roleId.replace(
        /-([a-z])/g,
        (
          match,
          character
        ) =>
          character.toUpperCase()
      );

    const possibleKeys = [

      roleId,

      camelRole,

      `${camelRole}Score`

    ];

    for (
      const collection
      of roleCollections
    ) {

      for (
        const key
        of possibleKeys
      ) {

        const value =
          collection[
            key
          ];

        if (
          Number.isFinite(
            value
          )
        ) {

          return convertFivePointScore(
            value
          );

        }

      }

    }

    return getConvertedFivePointValue([

      goals?.[
        `${camelRole}Score`
      ],

      flock?.[
        `${camelRole}SuitabilityScore`
      ]

    ]);

  }



  function getFreshGreensGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    const hasFreshGreenPath =
      usePaths.some(
        usePath =>
          (
            usePath.harvestProducts ||
            []
          ).some(
            product =>
              getHarvestProductFamily(
                product
              ) ===
                "fresh-greens"
          )
      );

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.freshGreensSuitabilityScore,

        goals
          ?.freshForageSuitabilityScore

      ]),

      hasFreshGreenPath
        ? 100
        : null

    ]);

  }



  function getLivingForageGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const flock =
      crop.plannerData
        ?.flock;

    const usePaths =
      crop.plannerData
        ?.usePaths ||
      [];

    const hasLivingForagePath =
      usePaths.some(
        usePath =>
          (
            usePath.harvestProducts ||
            []
          ).some(
            product =>
              getHarvestProductFamily(
                product
              ) ===
                "living-forage"
          )
      );

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.livingForageSuitabilityScore,

        goals
          ?.forageEnrichmentScore,

        flock
          ?.freeRangeCompatibilityScore,

        flock
          ?.controlledGrazingSuitabilityScore

      ]),

      hasLivingForagePath
        ? 100
        : null

    ]);

  }



  function getForageEnrichmentGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const flock =
      crop.plannerData
        ?.flock;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.forageEnrichmentScore,

        goals
          ?.enrichmentValueScore,

        flock
          ?.confinementEnrichmentScore,

        flock
          ?.cutAndCarrySuitabilityScore,

        flock
          ?.controlledGrazingSuitabilityScore

      ]),

      getLivingForageGoalScore(
        crop
      ),

      getFreshGreensGoalScore(
        crop
      )

    ]);

  }



  function getWinterFeedGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.winterFeedSuitabilityScore,

        goals
          ?.offSeasonFeedValueScore,

        goals
          ?.storedFeedSuitabilityScore

      ]),

      getLongStorageGoalScore(
        crop
      )

    ]);

  }



  /*
    ============================================================
    DERIVED SYSTEM AND SITE GOALS
    ============================================================
  */


  function getPerennialGoalScore(
    crop
  ) {

    const lifecycle =
      crop.plannerData
        ?.lifecycle;

    const goals =
      crop.plannerData
        ?.goals;

    const lifecycleType =
      lifecycle?.type ??
      lifecycle?.lifecycleType ??
      null;

    let lifecycleScore = null;

    if (
      [
        "perennial",
        "woody-perennial",
        "long-lived-perennial"
      ].includes(
        lifecycleType
      )
    ) {
      lifecycleScore = 100;
    } else if (
      [
        "biennial",
        "short-lived-perennial"
      ].includes(
        lifecycleType
      )
    ) {
      lifecycleScore = 65;
    } else if (
      lifecycleType ===
        "annual"
    ) {
      lifecycleScore = 15;
    }

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.perennialProductionScore,

        lifecycle
          ?.perennialValueScore

      ]),

      lifecycleScore

    ]);

  }



  function getSoilImprovementGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const lifecycle =
      crop.plannerData
        ?.lifecycle;

    return getConvertedFivePointValue([

      goals
        ?.soilImprovementScore,

      goals
        ?.soilBuildingScore,

      goals
        ?.nitrogenFixationValueScore,

      goals
        ?.organicMatterContributionScore,

      lifecycle
        ?.soilBuildingValueScore

    ]);

  }



  function getCoverCropGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    return getConvertedFivePointValue([

      goals
        ?.coverCropSuitabilityScore,

      goals
        ?.groundCoverValueScore,

      goals
        ?.erosionControlScore

    ]);

  }



  function getPollinatorGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    return getConvertedFivePointValue([

      goals
        ?.pollinatorSupportScore,

      goals
        ?.beneficialInsectValueScore,

      goals
        ?.floweringEcologicalValueScore

    ]);

  }



  function getWildlifeResistanceGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const risks =
      crop.plannerData
        ?.risks;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.wildlifeResistanceScore,

        goals
          ?.lowWildlifePressureScore

      ]),

      invertKnownScore(
        convertFivePointScore(
          risks
            ?.wildlifePressureScore
        )
      ),

      invertKnownScore(
        convertFivePointScore(
          risks
            ?.deerBrowsingRiskScore
        )
      ),

      invertKnownScore(
        convertFivePointScore(
          risks
            ?.rabbitBrowsingRiskScore
        )
      ),

      invertKnownScore(
        convertFivePointScore(
          risks
            ?.birdLossRiskScore
        )
      )

    ]);

  }



  function getBeginnerFriendlyGoalScore(
    crop
  ) {

    const labor =
      crop.plannerData
        ?.labor;

    const goals =
      crop.plannerData
        ?.goals;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.beginnerFriendlinessScore,

        labor
          ?.beginnerFriendlinessScore,

        labor
          ?.suitableForSoloGrowersScore

      ]),

      invertKnownScore(
        convertFivePointScore(
          labor
            ?.skillRequirementScore
        )
      )

    ]);

  }



  function getSmallSpaceGoalScore(
    crop
  ) {

    const space =
      crop.plannerData
        ?.space;

    const goals =
      crop.plannerData
        ?.goals;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.smallSpaceSuitabilityScore,

        space
          ?.smallSpaceSuitabilityScore,

        space
          ?.spaceEfficiencyScore

      ]),

      findSpaceTypeScore(
        space,
        "containers"
      ),

      findSpaceTypeScore(
        space,
        "raised-bed"
      )

    ]);

  }



  function getLargeFlockGoalScore(
    crop
  ) {

    const flock =
      crop.plannerData
        ?.flock;

    const goals =
      crop.plannerData
        ?.goals;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.largeFlockSuitabilityScore,

        flock
          ?.largeFlockSuitabilityScore,

        flock
          ?.flockConsumptionEfficiencyScore

      ]),

      getHighYieldGoalScore(
        crop
      )

    ]);

  }



  function getResilienceGoalScore(
    crop
  ) {

    const goals =
      crop.plannerData
        ?.goals;

    const climate =
      crop.plannerData
        ?.climate;

    const water =
      crop.plannerData
        ?.water;

    const risks =
      crop.plannerData
        ?.risks;

    return averageKnownValues([

      getConvertedFivePointValue([

        goals
          ?.resilienceScore,

        goals
          ?.climateResilienceScore

      ]),

      getConvertedFivePointValue([

        climate
          ?.heatToleranceScore,

        climate
          ?.humidityToleranceScore,

        climate
          ?.droughtClimateToleranceScore,

        climate
          ?.coolSummerToleranceScore,

        water
          ?.droughtSurvivalScore,

        water
          ?.droughtYieldRetentionScore

      ]),

      invertKnownScore(
        convertFivePointScore(
          risks
            ?.stormDamageRiskScore
        )
      )

    ]);

  }



  /*
    ============================================================
    MASTER GOAL SCORE ROUTER
    ============================================================
  */


  function getCropGoalScore(
    crop,
    goalId
  ) {

    const directScore =
      getDirectGoalScore(
        crop,
        goalId
      );

    if (
      Number.isFinite(
        directScore
      )
    ) {
      return directScore;
    }

    const goalScorers = {

      "reduce-feed-cost":
        getFeedCostReductionGoalScore,

      "high-yield":
        getHighYieldGoalScore,

      "fast-value":
        getFastValueGoalScore,

      "short-season-production":
        getShortSeasonGoalScore,

      "low-labor":
        getLowLaborGoalScore,

      "low-water":
        getLowWaterGoalScore,

      "long-storage":
        getLongStorageGoalScore,

      "storage-feed":
        getLongStorageGoalScore,

      "minimal-processing":
        getMinimalProcessingGoalScore,

      "fresh-greens":
        getFreshGreensGoalScore,

      "living-forage":
        getLivingForageGoalScore,

      "forage-enrichment":
        getForageEnrichmentGoalScore,

      "protein":
        cropRecord =>
          getNutritionalRoleScore(
            cropRecord,
            "protein"
          ),

      "energy":
        cropRecord =>
          getNutritionalRoleScore(
            cropRecord,
            "energy"
          ),

      "minerals":
        cropRecord =>
          getNutritionalRoleScore(
            cropRecord,
            "minerals"
          ),

      "winter-feed":
        getWinterFeedGoalScore,

      "perennial":
        getPerennialGoalScore,

      "soil-improvement":
        getSoilImprovementGoalScore,

      "cover-crop":
        getCoverCropGoalScore,

      "pollinator-support":
        getPollinatorGoalScore,

      "wildlife-resistant":
        getWildlifeResistanceGoalScore,

      "beginner-friendly":
        getBeginnerFriendlyGoalScore,

      "small-space":
        getSmallSpaceGoalScore,

      "large-flock":
        getLargeFlockGoalScore,

      "resilience":
        getResilienceGoalScore

    };

    const scorer =
      goalScorers[
        goalId
      ];

    if (!scorer) {
      return null;
    }

    return scorer(
      crop
    );

  }



  /*
    ============================================================
    INDIVIDUAL GOAL RESULT
    ============================================================
  */


  function createGoalResult(
    crop,
    goalDefinition
  ) {

    const score =
      getCropGoalScore(
        crop,
        goalDefinition.id
      );

    let status =
      "unknown";

    if (
      Number.isFinite(
        score
      )
    ) {

      if (
        score >= 75
      ) {
        status =
          "strong";
      } else if (
        score >= 55
      ) {
        status =
          "partial";
      } else {
        status =
          "weak";
      }

    }

    return {

      id:
        goalDefinition.id,

      label:
        goalDefinition.label,

      weight:
        goalDefinition.weight,

      score:
        Number.isFinite(
          score
        )
          ? roundScore(
              score
            )
          : null,

      status,

      weightedContribution:
        Number.isFinite(
          score
        )
          ? score *
            goalDefinition.weight
          : null

    };

  }



  /*
    ============================================================
    PREFERRED NUTRITIONAL ROLE

    This is evaluated separately because the questionnaire may
    ask for one nutritional role even when that role is not
    included in plannerGoals.
    ============================================================
  */


  function normalizePreferredNutritionalRoles(
    answers
  ) {

    const rawValue =
      answers.preferences
        ?.preferredNutritionalRole;

    if (
      Array.isArray(
        rawValue
      )
    ) {
      return rawValue;
    }

    if (
      typeof rawValue ===
        "string" &&
      rawValue.length > 0
    ) {
      return [
        rawValue
      ];
    }

    return [];

  }



  function createNutritionalRoleResults(
    crop,
    answers
  ) {

    const preferredRoles =
      normalizePreferredNutritionalRoles(
        answers
      );

    return preferredRoles.map(
      roleId => {

        const score =
          getNutritionalRoleScore(
            crop,
            roleId
          );

        return {

          id:
            roleId,

          label:
            getPlannerGoalLabel(
              roleId
            ),

          score:
            Number.isFinite(
              score
            )
              ? roundScore(
                  score
                )
              : null,

          status:
            !Number.isFinite(
              score
            )
              ? "unknown"
              : score >= 75
                ? "strong"
                : score >= 55
                  ? "partial"
                  : "weak"

        };

      }
    );

  }



  /*
    ============================================================
    GOAL SCORE CALCULATION
    ============================================================
  */


  function calculateGoalAlignmentScore(
    goalResults,
    nutritionalRoleResults
  ) {

    const knownGoalResults =
      goalResults.filter(
        result =>
          Number.isFinite(
            result.score
          ) &&
          result.weight > 0
      );

    const weightedGoalScore =
      calculateWeightedFactorScore(
        knownGoalResults.map(
          result =>
            createCompatibilityFactor(
              result.id,
              result.score,
              result.weight,
              null,
              false
            )
        )
      );

    const knownRoleScores =
      nutritionalRoleResults
        .map(
          result =>
            result.score
        )
        .filter(
          Number.isFinite
        );

    const nutritionalRoleScore =
      knownRoleScores.length > 0
        ? averageKnownValues(
            knownRoleScores
          )
        : null;

    if (
      Number.isFinite(
        weightedGoalScore
      ) &&
      Number.isFinite(
        nutritionalRoleScore
      )
    ) {

      return roundScore(
        weightedGoalScore *
          0.85 +
        nutritionalRoleScore *
          0.15
      );

    }

    if (
      Number.isFinite(
        weightedGoalScore
      )
    ) {
      return roundScore(
        weightedGoalScore
      );
    }

    if (
      Number.isFinite(
        nutritionalRoleScore
      )
    ) {
      return roundScore(
        nutritionalRoleScore
      );
    }

    return null;

  }



  function calculateGoalEvidenceCoverage(
    goalResults,
    nutritionalRoleResults
  ) {

    const totalGoalWeight =
      goalResults.reduce(
        (
          total,
          result
        ) =>
          total +
          result.weight,
        0
      );

    const knownGoalWeight =
      goalResults.reduce(
        (
          total,
          result
        ) =>
          total +
          (
            Number.isFinite(
              result.score
            )
              ? result.weight
              : 0
          ),
        0
      );

    const goalCoverage =
      totalGoalWeight > 0
        ? knownGoalWeight /
          totalGoalWeight
        : null;

    const roleCoverage =
      nutritionalRoleResults.length >
        0
        ? (
            nutritionalRoleResults.filter(
              result =>
                Number.isFinite(
                  result.score
                )
            ).length /
            nutritionalRoleResults.length
          )
        : null;

    return averageKnownValues([

      Number.isFinite(
        goalCoverage
      )
        ? goalCoverage
        : null,

      Number.isFinite(
        roleCoverage
      )
        ? roleCoverage
        : null

    ]) ?? 0;

  }



  /*
    ============================================================
    GOAL ALIGNMENT ORCHESTRATOR
    ============================================================
  */


  function evaluateGoalAlignment(
    crop,
    answers,
    evaluation
  ) {

    const goals =
      ensureGoalEvaluationObject(
        evaluation
      );

    const selectedGoals =
      normalizeGoalPriorities(
        answers
      );

    const goalResults =
      selectedGoals.map(
        goalDefinition =>
          createGoalResult(
            crop,
            goalDefinition
          )
      );

    const nutritionalRoleResults =
      createNutritionalRoleResults(
        crop,
        answers
      );

    goals.selectedGoals =
      selectedGoals;

    goals.goalResults =
      goalResults;

    goals.nutritionalRoleResults =
      nutritionalRoleResults;

    goals.score =
      calculateGoalAlignmentScore(
        goalResults,
        nutritionalRoleResults
      );

    goals.evidenceCoverage =
      calculateGoalEvidenceCoverage(
        goalResults,
        nutritionalRoleResults
      );

    goals.matchedGoals =
      goalResults.filter(
        result =>
          result.status ===
            "strong"
      );

    goals.partialGoals =
      goalResults.filter(
        result =>
          result.status ===
            "partial"
      );

    goals.weakGoals =
      goalResults.filter(
        result =>
          result.status ===
            "weak"
      );

    const unknownGoals =
      goalResults.filter(
        result =>
          result.status ===
            "unknown"
      );

    if (
      selectedGoals.length === 0 &&
      nutritionalRoleResults.length ===
        0
    ) {

      goals.warnings.push(
        "No planner goals or nutritional roles were selected."
      );

    }

    if (
      unknownGoals.length > 0
    ) {

      goals.warnings.push(
        "Some selected goals could not be scored because the crop record lacks sufficient goal data."
      );

    }

    if (
      goals.weakGoals.some(
        result =>
          result.weight >= 0.84
      )
    ) {

      goals.warnings.push(
        "The crop is weak for at least one of the visitor's highest-priority goals."
      );

    }

    return goals;

  }



  /*
    ============================================================
    UPDATED COMPATIBILITY ORCHESTRATOR

    Delete the evaluateCompatibility() function from Part 6
    and use this version.
    ============================================================
  */


  function evaluateCompatibility(
    crop,
    answers,
    evaluation
  ) {

    scoreClimateCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSiteCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSoilCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreWaterCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreSpaceCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreFlockCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreLaborCompatibility(
      crop,
      answers,
      evaluation
    );

    scoreHarvestStorageCompatibility(
      crop,
      answers,
      evaluation
    );

    finalizeCompatibility(
      evaluation
    );

    return evaluation.compatibility;

  }

    /*
    ============================================================
    PHASE 4
    DETAILED USE PATH EVALUATION

    Compatibility previously asked whether the crop has at
    least one broadly practical harvest and storage pathway.

    This phase evaluates every individual use path and chooses
    the strongest final pathway for this visitor.
    ============================================================
  */


  /*
    ============================================================
    USE PATH EVALUATION OBJECT
    ============================================================
  */


  function ensureUsePathEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.usePaths ||
      typeof evaluation.usePaths !==
        "object"
    ) {

      evaluation.usePaths = {};

    }

    const usePaths =
      evaluation.usePaths;

    usePaths.score =
      Number.isFinite(
        usePaths.score
      )
        ? usePaths.score
        : null;

    usePaths.evidenceCoverage =
      Number.isFinite(
        usePaths.evidenceCoverage
      )
        ? usePaths.evidenceCoverage
        : 0;

    usePaths.pathResults =
      Array.isArray(
        usePaths.pathResults
      )
        ? usePaths.pathResults
        : [];

    usePaths.eligiblePaths =
      Array.isArray(
        usePaths.eligiblePaths
      )
        ? usePaths.eligiblePaths
        : [];

    usePaths.rejectedPaths =
      Array.isArray(
        usePaths.rejectedPaths
      )
        ? usePaths.rejectedPaths
        : [];

    usePaths.bestPath =
      usePaths.bestPath &&
      typeof usePaths.bestPath ===
        "object"
        ? usePaths.bestPath
        : null;

    usePaths.alternativePaths =
      Array.isArray(
        usePaths.alternativePaths
      )
        ? usePaths.alternativePaths
        : [];

    usePaths.warnings =
      Array.isArray(
        usePaths.warnings
      )
        ? usePaths.warnings
        : [];

    return usePaths;

  }



  /*
    ============================================================
    USE PATH STATUS HELPERS
    ============================================================
  */


  function getUsePathStatus(
    score,
    eligible
  ) {

    if (!eligible) {
      return "rejected";
    }

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 82
    ) {
      return "excellent";
    }

    if (
      score >= 70
    ) {
      return "strong";
    }

    if (
      score >= 55
    ) {
      return "workable";
    }

    if (
      score >= 40
    ) {
      return "difficult";
    }

    return "poor";

  }



  function getUsePathLabel(
    usePath
  ) {

    return (
      usePath?.label ||
      usePath?.name ||
      usePath?.id ||
      "Unnamed Use Path"
    );

  }



  /*
    ============================================================
    USE PATH HARD-FAILURE OBJECT
    ============================================================
  */


  function createUsePathEligibilityResult() {

    return {

      eligible:
        true,

      hardFailures:
        [],

      warnings:
        []

    };

  }



  function rejectUsePath(
    eligibility,
    code,
    message
  ) {

    eligibility.eligible =
      false;

    eligibility.hardFailures.push({

      code,

      message

    });

  }



  function warnUsePath(
    eligibility,
    code,
    message
  ) {

    eligibility.warnings.push({

      code,

      message

    });

  }



  /*
    ============================================================
    DESIRED PRODUCT REQUIREMENT

    A product mismatch is normally a scoring penalty rather
    than an automatic rejection.

    It becomes a hard failure only when:

    - the visitor selected one or more required products;
    - the use path provides none of those product families;
    - and the questionnaire indicates that product matching is
      mandatory.
    ============================================================
  */


  function isHarvestProductMatchRequired(
    answers
  ) {

    return (

      answers.harvestStorage
        ?.harvestProductRequirement ===
          "required" ||

      answers.harvestStorage
        ?.desiredProductsRequired ===
          true ||

      answers.preferences
        ?.strictGoalMatching ===
          true

    );

  }



  function evaluateUsePathProductEligibility(
    usePath,
    answers,
    eligibility
  ) {

    const desiredProducts =
      answers.harvestStorage
        ?.desiredHarvestProducts ||
      [];

    if (
      desiredProducts.length === 0
    ) {
      return;
    }

    const productScore =
      getUsePathProductMatchScore(
        usePath,
        answers
      );

    if (
      Number.isFinite(
        productScore
      ) &&
      productScore > 0
    ) {
      return;
    }

    if (
      isHarvestProductMatchRequired(
        answers
      )
    ) {

      rejectUsePath(
        eligibility,
        "required-product-mismatch",
        "This use path does not provide any of the visitor's required harvest products."
      );

      return;

    }

    warnUsePath(
      eligibility,
      "preferred-product-mismatch",
      "This use path does not closely match the requested harvest products."
    );

  }



  /*
    ============================================================
    PROCESSING TASK ELIGIBILITY

    Specialized processing refusals may reject a use path.

    Ordinary harvesting, inspection, sorting, measuring, and
    routine crop management do not create hard failures.
    ============================================================
  */


  function getUnacceptedRequiredTasks(
    usePath,
    answers
  ) {

    const requiredTasks =
      Array.isArray(
        usePath
          ?.requiredProcessingTasks
      )
        ? usePath
            .requiredProcessingTasks
        : [];

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    const ordinaryTaskFamilies =
      new Set([

        "harvest",

        "clean-sort",

        "measure",

        "manage-crop"

      ]);

    return requiredTasks.filter(
      task => {

        const taskFamily =
          getProcessingTaskFamily(
            task
          );

        if (
          ordinaryTaskFamilies.has(
            taskFamily
          )
        ) {
          return false;
        }

        return !userAcceptsProcessingTask(
          task,
          acceptedTasks
        );

      }
    );

  }



  function evaluateUsePathTaskEligibility(
    usePath,
    answers,
    eligibility
  ) {

    const unacceptedTasks =
      getUnacceptedRequiredTasks(
        usePath,
        answers
      );

    if (
      unacceptedTasks.length === 0
    ) {
      return;
    }

    rejectUsePath(
      eligibility,
      "required-processing-refused",
      `The visitor did not accept the required processing task${
        unacceptedTasks.length === 1
          ? ""
          : "s"
      }: ${
        unacceptedTasks.join(
          ", "
        )
      }.`
    );

  }



  /*
    ============================================================
    EQUIPMENT ELIGIBILITY

    Equipment creates a hard failure only when the crop record
    marks it as required rather than optional or recommended.
    ============================================================
  */


  function getUnavailableRequiredEquipment(
    usePath,
    answers
  ) {

    const requiredEquipment =
      Array.isArray(
        usePath?.requiredEquipment
      )
        ? usePath.requiredEquipment
        : [];

    return requiredEquipment.filter(
      equipmentId =>
        !userHasOrWillAcquireEquipment(
          equipmentId,
          answers
        )
    );

  }



  function isUsePathEquipmentStrictlyRequired(
    usePath
  ) {

    if (
      usePath
        ?.equipmentRequirementLevel ===
          "required"
    ) {
      return true;
    }

    if (
      usePath
        ?.specializedEquipmentRequired ===
          true
    ) {
      return true;
    }

    if (
      usePath
        ?.requiredEquipmentIsMandatory ===
          true
    ) {
      return true;
    }

    return false;

  }



  function evaluateUsePathEquipmentEligibility(
    usePath,
    answers,
    eligibility
  ) {

    const unavailableEquipment =
      getUnavailableRequiredEquipment(
        usePath,
        answers
      );

    if (
      unavailableEquipment.length === 0
    ) {
      return;
    }

    if (
      isUsePathEquipmentStrictlyRequired(
        usePath
      )
    ) {

      rejectUsePath(
        eligibility,
        "required-equipment-unavailable",
        `Required equipment is unavailable: ${
          unavailableEquipment.join(
            ", "
          )
        }.`
      );

      return;

    }

    warnUsePath(
      eligibility,
      "recommended-equipment-unavailable",
      `This use path may be slower or less efficient without: ${
        unavailableEquipment.join(
          ", "
        )
      }.`
    );

  }



  /*
    ============================================================
    DRYING ELIGIBILITY
    ============================================================
  */


  function evaluateUsePathDryingEligibility(
    usePath,
    answers,
    eligibility
  ) {

    if (
      usePath?.dryingRequired !==
        true
    ) {
      return;
    }

    const dryingCapability =
      answers.labor
        ?.dryingCapability;

    if (
      dryingCapability ===
        "none"
    ) {

      rejectUsePath(
        eligibility,
        "drying-unavailable",
        "This use path requires drying, but the visitor selected no drying capability."
      );

      return;

    }

    const dryingScore =
      getUsePathDryingScore(
        usePath,
        answers
      );

    if (
      Number.isFinite(
        dryingScore
      ) &&
      dryingScore < 40
    ) {

      warnUsePath(
        eligibility,
        "drying-capacity-limited",
        "The available drying setup may be too limited for dependable processing."
      );

    }

  }



  /*
    ============================================================
    STORAGE ELIGIBILITY

    Storage mismatch is rejected only when storage is central
    to the visitor's request and the path cannot safely provide
    the requested duration.
    ============================================================
  */


  function visitorRequiresStoredProduct(
    answers
  ) {

    const desiredMonths =
      convertStorageDurationToMonths(
        answers.harvestStorage
          ?.desiredStorageDuration
      );

    if (
      Number.isFinite(
        desiredMonths
      ) &&
      desiredMonths >= 1
    ) {
      return true;
    }

    const selectedGoals =
      answers.preferences
        ?.plannerGoals ||
      [];

    return (

      selectedGoals.includes(
        "long-storage"
      ) ||

      selectedGoals.includes(
        "storage-feed"
      ) ||

      selectedGoals.includes(
        "winter-feed"
      )

    );

  }



  function evaluateUsePathStorageEligibility(
    usePath,
    answers,
    eligibility
  ) {

    if (
      !visitorRequiresStoredProduct(
        answers
      )
    ) {
      return;
    }

    const durationScore =
      getUsePathStorageDurationScore(
        usePath,
        answers
      );

    if (
      Number.isFinite(
        durationScore
      ) &&
      durationScore < 25
    ) {

      rejectUsePath(
        eligibility,
        "storage-duration-insufficient",
        "This use path cannot provide the requested storage duration."
      );

      return;

    }

    const environmentScore =
      getUsePathStorageEnvironmentScore(
        usePath,
        answers
      );

    if (
      Number.isFinite(
        environmentScore
      ) &&
      environmentScore < 30
    ) {

      rejectUsePath(
        eligibility,
        "unsafe-storage-environment",
        "The selected storage conditions are not adequate for this use path."
      );

      return;

    }

    if (
      Number.isFinite(
        environmentScore
      ) &&
      environmentScore < 55
    ) {

      warnUsePath(
        eligibility,
        "storage-environment-risk",
        "The available storage environment may increase spoilage or pest losses."
      );

    }

  }



  /*
    ============================================================
    FEEDING SAFETY ELIGIBILITY
    ============================================================
  */


  function evaluateUsePathFeedingSafety(
    crop,
    usePath,
    answers,
    eligibility
  ) {

    const flock =
      crop.plannerData
        ?.flock;

    if (
      usePath?.safeForDirectFeeding ===
        false &&
      usePath?.processingRequired !==
        true &&
      (
        !Array.isArray(
          usePath.requiredProcessingTasks
        ) ||
        usePath.requiredProcessingTasks
          .length === 0
      )
    ) {

      rejectUsePath(
        eligibility,
        "unsafe-feeding-path",
        "The crop record does not identify a safe preparation method for this use path."
      );

    }

    if (
      usePath?.cookingRequired ===
        true
    ) {

      const acceptedTasks =
        answers.labor
          ?.acceptedProcessingTasks ||
      [];

      if (
        !userAcceptsProcessingTask(
          "cook",
          acceptedTasks
        )
      ) {

        rejectUsePath(
          eligibility,
          "required-cooking-refused",
          "This use path requires cooking or heat treatment, which the visitor did not accept."
        );

      }

    }

    if (
      usePath?.measuredFeedingRequired ===
        true ||
      flock
        ?.measuredSupplementRequired ===
          true
    ) {

      warnUsePath(
        eligibility,
        "measured-feeding-required",
        "This use path should be measured rather than offered without limits."
      );

    }

    if (
      usePath?.completeFeedReplacement ===
        false ||
      flock
        ?.completeFeedReplacementSuitable ===
          false
    ) {

      warnUsePath(
        eligibility,
        "supplement-only",
        "This use path is supplemental and should not replace a complete poultry ration."
      );

    }

  }



  /*
    ============================================================
    USE PATH ELIGIBILITY ORCHESTRATOR
    ============================================================
  */


  function evaluateUsePathEligibility(
    crop,
    usePath,
    answers
  ) {

    const eligibility =
      createUsePathEligibilityResult();

    if (
      usePath?.enabled ===
        false ||
      usePath?.plannerEligible ===
        false
    ) {

      rejectUsePath(
        eligibility,
        "path-disabled",
        "This use path is not enabled for planner recommendations."
      );

      return eligibility;

    }

    evaluateUsePathProductEligibility(
      usePath,
      answers,
      eligibility
    );

    evaluateUsePathTaskEligibility(
      usePath,
      answers,
      eligibility
    );

    evaluateUsePathEquipmentEligibility(
      usePath,
      answers,
      eligibility
    );

    evaluateUsePathDryingEligibility(
      usePath,
      answers,
      eligibility
    );

    evaluateUsePathStorageEligibility(
      usePath,
      answers,
      eligibility
    );

    evaluateUsePathFeedingSafety(
      crop,
      usePath,
      answers,
      eligibility
    );

    return eligibility;

  }



  /*
    ============================================================
    USE PATH GOAL MATCHING
    ============================================================
  */


  function usePathProvidesProductFamily(
    usePath,
    productFamily
  ) {

    const products =
      Array.isArray(
        usePath?.harvestProducts
      )
        ? usePath.harvestProducts
        : [];

    return products.some(
      product =>
        getHarvestProductFamily(
          product
        ) ===
          productFamily
    );

  }



  function getUsePathGoalScore(
    crop,
    usePath,
    goalId
  ) {

    const directGoalScores =
      usePath?.goalScores;

    if (
      directGoalScores &&
      typeof directGoalScores ===
        "object"
    ) {

      const directScore =
        directGoalScores[
          goalId
        ];

      if (
        Number.isFinite(
          directScore
        )
      ) {

        return convertFivePointScore(
          directScore
        );

      }

    }

    const preparationEase =
      convertFivePointScore(
        usePath?.preparationEaseScore
      );

    const processingEfficiency =
      convertFivePointScore(
        usePath
          ?.processingEfficiencyScore
      );

    const storageEfficiency =
      convertFivePointScore(
        usePath
          ?.storageEfficiencyScore
      );

    const preservationFlexibility =
      convertFivePointScore(
        usePath
          ?.preservationFlexibilityScore
      );

    const harvestEase =
      convertFivePointScore(
        usePath?.harvestEaseScore
      );

    const expectedWaste =
      convertFivePointScore(
        usePath?.expectedWasteLevel
      );

    const taskScore =
      getUsePathTaskAcceptanceScore(
        usePath,
        {
          labor: {
            acceptedProcessingTasks:
              Array.isArray(
                usePath
                  ?.requiredProcessingTasks
              )
                ? usePath
                    .requiredProcessingTasks
                : []
          }
        }
      );

    const goalScorers = {

      "reduce-feed-cost":
        () =>
          averageKnownValues([

            convertFivePointScore(
              usePath
                ?.feedCostReductionScore
            ),

            convertFivePointScore(
              usePath
                ?.feedDisplacementPotentialScore
            ),

            convertFivePointScore(
              usePath
                ?.flockConsumptionEfficiencyScore
            ),

            invertKnownScore(
              expectedWaste
            )

          ]),

      "high-yield":
        () =>
          getConvertedFivePointValue([

            usePath
              ?.yieldPotentialScore,

            usePath
              ?.harvestVolumeScore,

            usePath
              ?.productionEfficiencyScore

          ]),

      "fast-value":
        () =>
          getConvertedFivePointValue([

            usePath
              ?.fastValueScore,

            usePath
              ?.harvestSpeedScore

          ]),

      "low-labor":
        () =>
          averageKnownValues([

            harvestEase,

            preparationEase,

            processingEfficiency

          ]),

      "minimal-processing":
        () =>
          averageKnownValues([

            preparationEase,

            processingEfficiency,

            taskScore

          ]),

      "long-storage":
        () =>
          averageKnownValues([

            storageEfficiency,

            preservationFlexibility,

            (() => {

              const months =
                convertStorageDurationToMonths(
                  usePath
                    ?.storageDurationCategory
                );

              if (
                !Number.isFinite(
                  months
                )
              ) {
                return null;
              }

              return clamp(
                months /
                  10 *
                  100,
                0,
                100
              );

            })()

          ]),

      "storage-feed":
        () =>
          averageKnownValues([

            storageEfficiency,

            preservationFlexibility,

            convertFivePointScore(
              usePath
                ?.storedFeedValueScore
            )

          ]),

      "winter-feed":
        () =>
          averageKnownValues([

            storageEfficiency,

            preservationFlexibility,

            convertFivePointScore(
              usePath
                ?.winterFeedValueScore
            )

          ]),

      "fresh-greens":
        () =>
          usePathProvidesProductFamily(
            usePath,
            "fresh-greens"
          )
            ? 100
            : 0,

      "living-forage":
        () =>
          usePathProvidesProductFamily(
            usePath,
            "living-forage"
          )
            ? 100
            : 0,

      "forage-enrichment":
        () =>
          averageKnownValues([

            usePathProvidesProductFamily(
              usePath,
              "living-forage"
            )
              ? 100
              : null,

            usePathProvidesProductFamily(
              usePath,
              "fresh-greens"
            )
              ? 90
              : null,

            convertFivePointScore(
              usePath
                ?.enrichmentValueScore
            )

          ]),

      "protein":
        () =>
          getConvertedFivePointValue([

            usePath
              ?.proteinValueScore,

            usePath
              ?.proteinSupplementSuitabilityScore

          ]),

      "energy":
        () =>
          getConvertedFivePointValue([

            usePath
              ?.energyValueScore,

            usePath
              ?.energySupplementSuitabilityScore

          ]),

      "minerals":
        () =>
          getConvertedFivePointValue([

            usePath
              ?.mineralValueScore,

            usePath
              ?.micronutrientValueScore

          ])

    };

    const scorer =
      goalScorers[
        goalId
      ];

    if (!scorer) {

      return getCropGoalScore(
        crop,
        goalId
      );

    }

    const pathScore =
      scorer();

    if (
      Number.isFinite(
        pathScore
      )
    ) {
      return pathScore;
    }

    return getCropGoalScore(
      crop,
      goalId
    );

  }



  function getUsePathGoalAlignmentScore(
    crop,
    usePath,
    answers
  ) {

    const selectedGoals =
      normalizeGoalPriorities(
        answers
      );

    if (
      selectedGoals.length === 0
    ) {
      return null;
    }

    const factors =
      selectedGoals.map(
        goal => {

          return createCompatibilityFactor(

            goal.id,

            getUsePathGoalScore(
              crop,
              usePath,
              goal.id
            ),

            goal.weight,

            null,

            false

          );

        }
      );

    return calculateWeightedFactorScore(
      factors
    );

  }



  /*
    ============================================================
    NUTRITIONAL ROLE MATCHING
    ============================================================
  */


  function getUsePathNutritionalRoleScore(
    crop,
    usePath,
    answers
  ) {

    const preferredRoles =
      normalizePreferredNutritionalRoles(
        answers
      );

    if (
      preferredRoles.length === 0
    ) {
      return null;
    }

    const scores =
      preferredRoles.map(
        roleId => {

          const pathScore =
            getUsePathGoalScore(
              crop,
              usePath,
              roleId
            );

          if (
            Number.isFinite(
              pathScore
            )
          ) {
            return pathScore;
          }

          return getNutritionalRoleScore(
            crop,
            roleId
          );

        }
      );

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    PROCESSING TIME SCORE
    ============================================================
  */


  function convertProcessingTimeLevelToScore(
    processingTimeLevel
  ) {

    const scoreMap = {

      "very-low":
        100,

      "low":
        88,

      "low-to-moderate":
        76,

      "moderate":
        62,

      "moderate-to-high":
        46,

      "high":
        28,

      "very-high":
        12

    };

    return scoreMap[
      processingTimeLevel
    ] ?? null;

  }



  function getUsePathProcessingTimeScore(
    usePath,
    answers
  ) {

    const levelScore =
      convertProcessingTimeLevelToScore(
        usePath
          ?.expectedProcessingTimeLevel
      );

    const minutesPerPound =
      usePath
        ?.estimatedProcessingMinutesPerPound;

    let measuredTimeScore =
      null;

    if (
      Number.isFinite(
        minutesPerPound
      )
    ) {

      if (
        minutesPerPound <= 2
      ) {
        measuredTimeScore = 100;
      } else if (
        minutesPerPound <= 5
      ) {
        measuredTimeScore = 88;
      } else if (
        minutesPerPound <= 10
      ) {
        measuredTimeScore = 72;
      } else if (
        minutesPerPound <= 20
      ) {
        measuredTimeScore = 52;
      } else if (
        minutesPerPound <= 35
      ) {
        measuredTimeScore = 32;
      } else {
        measuredTimeScore = 15;
      }

    }

    const weeklyTimeCapacity =
      getWeeklyTimeCapacityScore(
        answers.labor
          ?.weeklyCropTime
      );

    const pathTimeEase =
      averageKnownValues([

        levelScore,

        measuredTimeScore

      ]);

    if (
      !Number.isFinite(
        pathTimeEase
      )
    ) {
      return null;
    }

    if (
      !Number.isFinite(
        weeklyTimeCapacity
      )
    ) {
      return pathTimeEase;
    }

    return averageKnownValues([

      pathTimeEase,

      weeklyTimeCapacity

    ]);

  }



  /*
    ============================================================
    WASTE AND YIELD RETENTION SCORE
    ============================================================
  */


  function getUsePathWasteScore(
    usePath
  ) {

    const estimatedWastePercent =
      usePath
        ?.estimatedWastePercent;

    let percentScore =
      null;

    if (
      Number.isFinite(
        estimatedWastePercent
      )
    ) {

      percentScore =
        clamp(
          100 -
          estimatedWastePercent *
            2,
          0,
          100
        );

    }

    const expectedWasteLevel =
      convertProcessingTimeLevelToScore(
        usePath?.expectedWasteLevel
      );

    return averageKnownValues([

      percentScore,

      expectedWasteLevel

    ]);

  }



  /*
    ============================================================
    FEEDING PRACTICALITY SCORE
    ============================================================
  */


  function getUsePathFeedingPracticalityScore(
    crop,
    usePath,
    answers
  ) {

    const flock =
      crop.plannerData
        ?.flock;

    const scores = [

      convertFivePointScore(
        usePath
          ?.feedingSimplicityScore
      ),

      convertFivePointScore(
        usePath
          ?.directFeedingSimplicityScore
      ),

      convertFivePointScore(
        usePath
          ?.flockConsumptionEfficiencyScore
      ),

      convertFivePointScore(
        usePath
          ?.feedMeasurementPrecisionScore
      ),

      convertFivePointScore(
        flock
          ?.directFeedingSimplicityScore
      ),

      convertFivePointScore(
        flock
          ?.flockConsumptionEfficiencyScore
      )

    ];

    if (
      usePath?.measuredFeedingRequired ===
        true
    ) {

      const ownedEquipment =
        answers.labor
          ?.ownedEquipment ||
      [];

      const hasScale =
        ownedEquipment.includes(
          "feed-scale"
        ) ||
        ownedEquipment.includes(
          "kitchen-scale"
        ) ||
        ownedEquipment.includes(
          "scale"
        );

      scores.push(
        hasScale
          ? 85
          : 58
      );

    }

    if (
      usePath?.freeChoiceSuitable ===
        true
    ) {
      scores.push(
        100
      );
    }

    if (
      usePath?.freeChoiceSuitable ===
        false
    ) {
      scores.push(
        65
      );
    }

    if (
      usePath?.gradualIntroductionRequired ===
        true
    ) {
      scores.push(
        72
      );
    }

    return averageKnownValues(
      scores
    );

  }



  /*
    ============================================================
    STORAGE SAFETY SCORE
    ============================================================
  */


  function getUsePathStorageSafetyScore(
    usePath,
    answers
  ) {

    const environmentScore =
      getUsePathStorageEnvironmentScore(
        usePath,
        answers
      );

    const moldRisk =
      convertFivePointScore(
        usePath?.moldRiskScore
      );

    const rodentRisk =
      convertFivePointScore(
        usePath?.rodentRiskScore
      );

    const insectRisk =
      convertFivePointScore(
        usePath
          ?.storedInsectRiskScore
      );

    const postHarvestLossRisk =
      convertFivePointScore(
        usePath
          ?.postHarvestLossRiskScore
      );

    const storageRiskScore =
      averageKnownValues([

        invertKnownScore(
          moldRisk
        ),

        invertKnownScore(
          rodentRisk
        ),

        invertKnownScore(
          insectRisk
        ),

        invertKnownScore(
          postHarvestLossRisk
        )

      ]);

    return averageKnownValues([

      environmentScore,

      storageRiskScore,

      convertFivePointScore(
        usePath
          ?.storageEfficiencyScore
      )

    ]);

  }



  /*
    ============================================================
    PATH-SPECIFIC RISK SCORE

    Higher returned values are better.
    ============================================================
  */


  function getUsePathRiskResilienceScore(
    usePath
  ) {

    const riskFields = [

      usePath?.moldRiskScore,

      usePath?.rodentRiskScore,

      usePath
        ?.storedInsectRiskScore,

      usePath
        ?.postHarvestLossRiskScore,

      usePath?.spoilageRiskScore,

      usePath
        ?.processingFailureRiskScore

    ];

    const invertedScores =
      riskFields
        .map(
          value =>
            invertKnownScore(
              convertFivePointScore(
                value
              )
            )
        );

    return averageKnownValues(
      invertedScores
    );

  }



  /*
    ============================================================
    USE PATH SCORE WEIGHTS
    ============================================================
  */


  function getUsePathScoreWeights() {

    const configuredWeights =
      config.scoring
        ?.engine
        ?.usePathWeights;

    if (
      configuredWeights &&
      typeof configuredWeights ===
        "object"
    ) {
      return configuredWeights;
    }

    return {

      productMatch:
        0.16,

      goalAlignment:
        0.15,

      nutritionalRole:
        0.07,

      taskFit:
        0.10,

      equipmentFit:
        0.07,

      processingTime:
        0.08,

      harvestPattern:
        0.05,

      storageDuration:
        0.07,

      dryingFit:
        0.06,

      storageSafety:
        0.07,

      feedingPracticality:
        0.07,

      wasteEfficiency:
        0.03,

      pathRisk:
        0.02

    };

  }



  /*
    ============================================================
    USE PATH FACTOR CREATION
    ============================================================
  */


  function createUsePathFactor(
    id,
    label,
    score,
    weight,
    positiveMessage,
    concernMessage
  ) {

    return {

      id,

      label,

      score:
        Number.isFinite(
          score
        )
          ? clamp(
              score,
              0,
              100
            )
          : null,

      weight:
        Number.isFinite(
          weight
        )
          ? Math.max(
              weight,
              0
            )
          : 0,

      positiveMessage:
        positiveMessage || null,

      concernMessage:
        concernMessage || null

    };

  }



  function calculateUsePathFactorScore(
    factors
  ) {

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.score
          ) &&
          factor.weight > 0
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    const totalWeight =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    if (
      totalWeight <= 0
    ) {
      return null;
    }

    return roundScore(
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.score *
          (
            factor.weight /
            totalWeight
          ),
        0
      )
    );

  }



  function calculateUsePathFactorCoverage(
    factors
  ) {

    const weightedFactors =
      factors.filter(
        factor =>
          factor.weight > 0
      );

    if (
      weightedFactors.length === 0
    ) {
      return 0;
    }

    const totalWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    const knownWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          (
            Number.isFinite(
              factor.score
            )
              ? factor.weight
              : 0
          ),
        0
      );

    if (
      totalWeight <= 0
    ) {
      return 0;
    }

    return clamp(
      knownWeight /
        totalWeight,
      0,
      1
    );

  }



  /*
    ============================================================
    INDIVIDUAL USE PATH EVALUATION
    ============================================================
  */


  function evaluateSingleUsePath(
    crop,
    usePath,
    answers
  ) {

    const eligibility =
      evaluateUsePathEligibility(
        crop,
        usePath,
        answers
      );

    const weights =
      getUsePathScoreWeights();

    const productMatchScore =
      getUsePathProductMatchScore(
        usePath,
        answers
      );

    const goalAlignmentScore =
      getUsePathGoalAlignmentScore(
        crop,
        usePath,
        answers
      );

    const nutritionalRoleScore =
      getUsePathNutritionalRoleScore(
        crop,
        usePath,
        answers
      );

    const taskFitScore =
      getUsePathTaskAcceptanceScore(
        usePath,
        answers
      );

    const equipmentFitScore =
      getUsePathEquipmentScore(
        usePath,
        answers
      );

    const processingTimeScore =
      getUsePathProcessingTimeScore(
        usePath,
        answers
      );

    const harvestPatternScore =
      getUsePathHarvestPatternScore(
        usePath,
        answers
      );

    const storageDurationScore =
      getUsePathStorageDurationScore(
        usePath,
        answers
      );

    const dryingFitScore =
      getUsePathDryingScore(
        usePath,
        answers
      );

    const storageSafetyScore =
      getUsePathStorageSafetyScore(
        usePath,
        answers
      );

    const feedingPracticalityScore =
      getUsePathFeedingPracticalityScore(
        crop,
        usePath,
        answers
      );

    const wasteEfficiencyScore =
      getUsePathWasteScore(
        usePath
      );

    const pathRiskScore =
      getUsePathRiskResilienceScore(
        usePath
      );

    const factors = [

      createUsePathFactor(
        "product-match",
        "Harvest Product Match",
        productMatchScore,
        weights.productMatch,
        "This path provides the type of harvest product the visitor requested.",
        "This path does not closely match the requested harvest product."
      ),

      createUsePathFactor(
        "goal-alignment",
        "Goal Alignment",
        goalAlignmentScore,
        weights.goalAlignment,
        "This path supports the visitor's selected goals.",
        "This path is weak for one or more selected goals."
      ),

      createUsePathFactor(
        "nutritional-role",
        "Nutritional Role",
        nutritionalRoleScore,
        weights.nutritionalRole,
        "This path fits the preferred nutritional role.",
        "This path is not a strong match for the preferred nutritional role."
      ),

      createUsePathFactor(
        "task-fit",
        "Processing Task Fit",
        taskFitScore,
        weights.taskFit,
        "The required tasks fit the visitor's accepted workload.",
        "The path requires processing tasks the visitor did not select."
      ),

      createUsePathFactor(
        "equipment-fit",
        "Equipment Fit",
        equipmentFitScore,
        weights.equipmentFit,
        "The necessary equipment is available or acceptable.",
        "The path may require unavailable equipment."
      ),

      createUsePathFactor(
        "processing-time",
        "Processing Time",
        processingTimeScore,
        weights.processingTime,
        "Processing time fits the visitor's available labor.",
        "Processing may take more time than the visitor wants."
      ),

      createUsePathFactor(
        "harvest-pattern",
        "Harvest Pattern",
        harvestPatternScore,
        weights.harvestPattern,
        "The harvest pattern fits the visitor's preference.",
        "The harvest pattern differs from the visitor's preference."
      ),

      createUsePathFactor(
        "storage-duration",
        "Storage Duration",
        storageDurationScore,
        weights.storageDuration,
        "The path can meet the desired storage duration.",
        "The path may not store for the desired length of time."
      ),

      createUsePathFactor(
        "drying-fit",
        "Drying Capability",
        dryingFitScore,
        weights.dryingFit,
        "The visitor has adequate drying capability.",
        "The path may require more drying capacity than is available."
      ),

      createUsePathFactor(
        "storage-safety",
        "Storage Safety",
        storageSafetyScore,
        weights.storageSafety,
        "The path can be stored with manageable spoilage and pest risk.",
        "Storage conditions may create spoilage or pest risk."
      ),

      createUsePathFactor(
        "feeding-practicality",
        "Feeding Practicality",
        feedingPracticalityScore,
        weights.feedingPracticality,
        "The harvested product can be fed with reasonable simplicity.",
        "The harvested product may require careful feeding management."
      ),

      createUsePathFactor(
        "waste-efficiency",
        "Waste Efficiency",
        wasteEfficiencyScore,
        weights.wasteEfficiency,
        "The path should retain a useful share of the harvested material.",
        "Processing or feeding losses may reduce practical value."
      ),

      createUsePathFactor(
        "path-risk",
        "Path Risk",
        pathRiskScore,
        weights.pathRisk,
        "The path has manageable post-harvest risks.",
        "The path has meaningful processing or storage risks."
      )

    ];

    const rawScore =
      calculateUsePathFactorScore(
        factors
      );

    const evidenceCoverage =
      calculateUsePathFactorCoverage(
        factors
      );

    /*
      A rejected path retains its diagnostic score, but it is
      not allowed to compete for final selection.
    */

    const finalScore =
      eligibility.eligible
        ? rawScore
        : null;

    const strengths =
      factors
        .filter(
          factor =>
            Number.isFinite(
              factor.score
            ) &&
            factor.score >= 75 &&
            factor.positiveMessage
        )
        .sort(
          (
            first,
            second
          ) =>
            second.score -
            first.score
        )
        .slice(
          0,
          5
        )
        .map(
          factor => ({

            id:
              factor.id,

            label:
              factor.label,

            score:
              roundScore(
                factor.score
              ),

            message:
              factor.positiveMessage

          })
        );

    const concerns =
      factors
        .filter(
          factor =>
            Number.isFinite(
              factor.score
            ) &&
            factor.score < 60 &&
            factor.concernMessage
        )
        .sort(
          (
            first,
            second
          ) =>
            first.score -
            second.score
        )
        .slice(
          0,
          5
        )
        .map(
          factor => ({

            id:
              factor.id,

            label:
              factor.label,

            score:
              roundScore(
                factor.score
              ),

            message:
              factor.concernMessage

          })
        );

    return {

      id:
        usePath.id || null,

      label:
        getUsePathLabel(
          usePath
        ),

      eligible:
        eligibility.eligible,

      status:
        getUsePathStatus(
          finalScore,
          eligibility.eligible
        ),

      score:
        Number.isFinite(
          finalScore
        )
          ? roundScore(
              finalScore
            )
          : null,

      diagnosticScore:
        Number.isFinite(
          rawScore
        )
          ? roundScore(
              rawScore
            )
          : null,

      evidenceCoverage:
        roundScore(
          evidenceCoverage *
          100
        ) /
        100,

      factors,

      strengths,

      concerns,

      hardFailures:
        eligibility.hardFailures,

      warnings:
        eligibility.warnings,

      usePath

    };

  }



  /*
    ============================================================
    USE PATH SORTING

    Score is primary.

    Evidence coverage breaks close ties so a high score built
    from very little information does not automatically outrank
    a similarly scored, well-documented path.
    ============================================================
  */


  function compareUsePathResults(
    first,
    second
  ) {

    const firstScore =
      Number.isFinite(
        first.score
      )
        ? first.score
        : -1;

    const secondScore =
      Number.isFinite(
        second.score
      )
        ? second.score
        : -1;

    const scoreDifference =
      secondScore -
      firstScore;

    if (
      Math.abs(
        scoreDifference
      ) >= 2
    ) {
      return scoreDifference;
    }

    const coverageDifference =
      (
        second.evidenceCoverage ||
        0
      ) -
      (
        first.evidenceCoverage ||
        0
      );

    if (
      Math.abs(
        coverageDifference
      ) >= 0.05
    ) {
      return coverageDifference;
    }

    return String(
      first.label
    ).localeCompare(
      String(
        second.label
      )
    );

  }



  /*
    ============================================================
    USE PATH SUMMARY SCORE

    The strongest path drives most of the crop-level use-path
    score.

    A strong second path provides a small flexibility bonus.
    ============================================================
  */


  function calculateOverallUsePathScore(
    eligiblePaths
  ) {

    if (
      eligiblePaths.length === 0
    ) {
      return null;
    }

    const bestPath =
      eligiblePaths[0];

    if (
      !Number.isFinite(
        bestPath.score
      )
    ) {
      return null;
    }

    const secondPath =
      eligiblePaths[1];

    if (
      !secondPath ||
      !Number.isFinite(
        secondPath.score
      )
    ) {
      return bestPath.score;
    }

    return roundScore(
      bestPath.score *
        0.88 +
      secondPath.score *
        0.12
    );

  }



  function calculateOverallUsePathCoverage(
    eligiblePaths
  ) {

    if (
      eligiblePaths.length === 0
    ) {
      return 0;
    }

    const pathsToUse =
      eligiblePaths.slice(
        0,
        3
      );

    return averageKnownValues(
      pathsToUse.map(
        path =>
          path.evidenceCoverage
      )
    ) ?? 0;

  }



  /*
    ============================================================
    USE PATH ORCHESTRATOR
    ============================================================
  */


  function evaluateUsePaths(
    crop,
    answers,
    evaluation
  ) {

    const usePathEvaluation =
      ensureUsePathEvaluationObject(
        evaluation
      );

    const cropUsePaths =
      crop.plannerData
        ?.usePaths;

    usePathEvaluation.pathResults =
      [];

    usePathEvaluation.eligiblePaths =
      [];

    usePathEvaluation.rejectedPaths =
      [];

    usePathEvaluation.bestPath =
      null;

    usePathEvaluation.alternativePaths =
      [];

    usePathEvaluation.warnings =
      [];

    if (
      !Array.isArray(
        cropUsePaths
      ) ||
      cropUsePaths.length === 0
    ) {

      usePathEvaluation.score =
        null;

      usePathEvaluation.evidenceCoverage =
        0;

      usePathEvaluation.warnings.push(
        "The crop record does not contain any use paths."
      );

      return usePathEvaluation;

    }

    const pathResults =
      cropUsePaths.map(
        usePath =>
          evaluateSingleUsePath(
            crop,
            usePath,
            answers
          )
      );

    const eligiblePaths =
      pathResults
        .filter(
          path =>
            path.eligible &&
            Number.isFinite(
              path.score
            )
        )
        .sort(
          compareUsePathResults
        );

    const rejectedPaths =
      pathResults
        .filter(
          path =>
            !path.eligible
        );

    usePathEvaluation.pathResults =
      pathResults;

    usePathEvaluation.eligiblePaths =
      eligiblePaths;

    usePathEvaluation.rejectedPaths =
      rejectedPaths;

    usePathEvaluation.bestPath =
      eligiblePaths[0] ||
      null;

    usePathEvaluation.alternativePaths =
      eligiblePaths.slice(
        1,
        4
      );

    usePathEvaluation.score =
      calculateOverallUsePathScore(
        eligiblePaths
      );

    usePathEvaluation.evidenceCoverage =
      calculateOverallUsePathCoverage(
        eligiblePaths
      );

    if (
      eligiblePaths.length === 0
    ) {

      usePathEvaluation.warnings.push(
        "No eligible use path remains after processing, equipment, drying, storage, and feeding requirements were evaluated."
      );

    }

    if (
      eligiblePaths.length === 1
    ) {

      usePathEvaluation.warnings.push(
        "Only one use path is practical under the selected conditions."
      );

    }

    if (
      usePathEvaluation.bestPath &&
      usePathEvaluation.bestPath
        .score < 55
    ) {

      usePathEvaluation.warnings.push(
        "The strongest remaining use path is difficult or weak under the selected conditions."
      );

    }

    if (
      usePathEvaluation.bestPath &&
      usePathEvaluation.bestPath
        .evidenceCoverage < 0.60
    ) {

      usePathEvaluation.warnings.push(
        "The selected use path has limited supporting data, so its ranking should be treated cautiously."
      );

    }

    return usePathEvaluation;

  }

    /*
    ============================================================
    PHASE 5
    RISK ADJUSTMENT

    This phase evaluates practical risks that may reduce the
    reliability or usable value of a crop recommendation.

    A high risk score is good:

      100 = low practical risk
        0 = severe unmanaged risk

    The risk phase does not normally reject a crop.

    Eligibility and use-path hard failures are responsible for
    true impossibilities. Risk instead applies proportional
    penalties and produces mitigation guidance.
    ============================================================
  */


  /*
    ============================================================
    RISK EVALUATION OBJECT
    ============================================================
  */


  function ensureRiskEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.risks ||
      typeof evaluation.risks !==
        "object"
    ) {

      evaluation.risks = {};

    }

    const risks =
      evaluation.risks;

    risks.score =
      Number.isFinite(
        risks.score
      )
        ? risks.score
        : null;

    risks.rawRiskScore =
      Number.isFinite(
        risks.rawRiskScore
      )
        ? risks.rawRiskScore
        : null;

    risks.adjustment =
      Number.isFinite(
        risks.adjustment
      )
        ? risks.adjustment
        : 0;

    risks.evidenceCoverage =
      Number.isFinite(
        risks.evidenceCoverage
      )
        ? risks.evidenceCoverage
        : 0;

    risks.categoryResults =
      Array.isArray(
        risks.categoryResults
      )
        ? risks.categoryResults
        : [];

    risks.primaryRisks =
      Array.isArray(
        risks.primaryRisks
      )
        ? risks.primaryRisks
        : [];

    risks.moderateRisks =
      Array.isArray(
        risks.moderateRisks
      )
        ? risks.moderateRisks
        : [];

    risks.managedRisks =
      Array.isArray(
        risks.managedRisks
      )
        ? risks.managedRisks
        : [];

    risks.mitigations =
      Array.isArray(
        risks.mitigations
      )
        ? risks.mitigations
        : [];

    risks.warnings =
      Array.isArray(
        risks.warnings
      )
        ? risks.warnings
        : [];

    return risks;

  }



  /*
    ============================================================
    GENERAL RISK HELPERS
    ============================================================
  */


  function convertRiskScoreToSafetyScore(
    riskScore
  ) {

    const convertedRisk =
      convertFivePointScore(
        riskScore
      );

    if (
      !Number.isFinite(
        convertedRisk
      )
    ) {
      return null;
    }

    return clamp(
      100 -
      convertedRisk,
      0,
      100
    );

  }



  function convertRiskLevelToSafetyScore(
    riskLevel
  ) {

    const scoreMap = {

      "none":
        100,

      "very-low":
        95,

      "low":
        85,

      "low-to-moderate":
        74,

      "moderate":
        62,

      "moderate-to-high":
        47,

      "high":
        30,

      "very-high":
        12,

      "severe":
        5

    };

    return scoreMap[
      riskLevel
    ] ?? null;

  }



  function getFirstKnownRiskSafetyScore(
    values
  ) {

    for (
      const value
      of values
    ) {

      const converted =
        typeof value ===
          "string"
          ? convertRiskLevelToSafetyScore(
              value
            )
          : convertRiskScoreToSafetyScore(
              value
            );

      if (
        Number.isFinite(
          converted
        )
      ) {
        return converted;
      }

    }

    return null;

  }



  function createRiskFactor(
    id,
    label,
    safetyScore,
    weight,
    mitigationCapacity,
    explanation,
    mitigation
  ) {

    const normalizedSafetyScore =
      Number.isFinite(
        safetyScore
      )
        ? clamp(
            safetyScore,
            0,
            100
          )
        : null;

    const normalizedMitigationCapacity =
      Number.isFinite(
        mitigationCapacity
      )
        ? clamp(
            mitigationCapacity,
            0,
            100
          )
        : null;

    let adjustedSafetyScore =
      normalizedSafetyScore;

    /*
      Mitigation may recover part of the gap between the
      unmitigated safety score and 100.

      It cannot erase the underlying biological risk.
    */

    if (
      Number.isFinite(
        normalizedSafetyScore
      ) &&
      Number.isFinite(
        normalizedMitigationCapacity
      )
    ) {

      const recoverableGap =
        100 -
        normalizedSafetyScore;

      adjustedSafetyScore =
        normalizedSafetyScore +
        recoverableGap *
        (
          normalizedMitigationCapacity /
          100
        ) *
        0.55;

    }

    return {

      id,

      label,

      rawSafetyScore:
        Number.isFinite(
          normalizedSafetyScore
        )
          ? roundScore(
              normalizedSafetyScore
            )
          : null,

      mitigationCapacity:
        Number.isFinite(
          normalizedMitigationCapacity
        )
          ? roundScore(
              normalizedMitigationCapacity
            )
          : null,

      adjustedSafetyScore:
        Number.isFinite(
          adjustedSafetyScore
        )
          ? roundScore(
              adjustedSafetyScore
            )
          : null,

      weight:
        Number.isFinite(
          weight
        )
          ? Math.max(
              0,
              weight
            )
          : 0,

      explanation:
        explanation || null,

      mitigation:
        mitigation || null

    };

  }



  function calculateRiskFactorScore(
    factors
  ) {

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.adjustedSafetyScore
          ) &&
          factor.weight > 0
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    const totalKnownWeight =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    if (
      totalKnownWeight <= 0
    ) {
      return null;
    }

    return roundScore(
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.adjustedSafetyScore *
          (
            factor.weight /
            totalKnownWeight
          ),
        0
      )
    );

  }



  function calculateRawRiskFactorScore(
    factors
  ) {

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.rawSafetyScore
          ) &&
          factor.weight > 0
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    const totalKnownWeight =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    if (
      totalKnownWeight <= 0
    ) {
      return null;
    }

    return roundScore(
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.rawSafetyScore *
          (
            factor.weight /
            totalKnownWeight
          ),
        0
      )
    );

  }



  function calculateRiskFactorCoverage(
    factors
  ) {

    const weightedFactors =
      factors.filter(
        factor =>
          factor.weight > 0
      );

    if (
      weightedFactors.length === 0
    ) {
      return 0;
    }

    const totalWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    const knownWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          (
            Number.isFinite(
              factor.rawSafetyScore
            )
              ? factor.weight
              : 0
          ),
        0
      );

    if (
      totalWeight <= 0
    ) {
      return 0;
    }

    return clamp(
      knownWeight /
        totalWeight,
      0,
      1
    );

  }



  /*
    ============================================================
    USER WILDLIFE PRESSURE HELPERS
    ============================================================
  */


  function getUserWildlifePressureLevel(
    answers
  ) {

    const pressure =
      answers.preferences
        ?.wildlifePestPressure;

    const pressureMap = {

      "none":
        0,

      "very-low":
        10,

      "low":
        25,

      "moderate":
        50,

      "high":
        75,

      "very-high":
        95,

      "severe":
        100

    };

    if (
      Number.isFinite(
        pressure
      )
    ) {

      if (
        pressure >= 0 &&
        pressure <= 5
      ) {
        return clamp(
          pressure /
            5 *
            100,
          0,
          100
        );
      }

      return clamp(
        pressure,
        0,
        100
      );

    }

    return pressureMap[
      pressure
    ] ?? null;

  }



  function getSelectedWildlifeProblems(
    answers
  ) {

    const possibleValues = [

      answers.preferences
        ?.wildlifePestTypes,

      answers.preferences
        ?.wildlifeProblems,

      answers.site
        ?.wildlifePressureTypes,

      answers.site
        ?.knownWildlifePressure

    ];

    const combinedValues = [];

    possibleValues.forEach(
      value => {

        if (
          Array.isArray(
            value
          )
        ) {

          combinedValues.push(
            ...value
          );

        } else if (
          typeof value ===
            "string"
        ) {

          combinedValues.push(
            value
          );

        }

      }
    );

    return [
      ...new Set(
        combinedValues
      )
    ];

  }



  /*
    ============================================================
    WILDLIFE MITIGATION CAPACITY
    ============================================================
  */


  function getWildlifeMitigationCapacity(
    answers
  ) {

    const ownedEquipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const spaceTypes =
      answers.space
        ?.availableSpaceTypes ||
      [];

    const protectionSelections = [

      answers.site
        ?.wildlifeProtection,

      answers.preferences
        ?.wildlifeProtection,

      answers.space
        ?.cropProtectionMethods

    ];

    const protectionMethods =
      protectionSelections.flatMap(
        value =>
          Array.isArray(
            value
          )
            ? value
            : typeof value ===
                "string"
              ? [
                  value
                ]
              : []
      );

    let score = 20;

    const strongProtectionTerms = [

      "fenced",

      "fencing",

      "electric-fence",

      "deer-fence",

      "hardware-cloth",

      "bird-netting",

      "netting",

      "covered-frame",

      "protected-forage-frame",

      "row-cover",

      "crop-cage"

    ];

    const moderateProtectionTerms = [

      "repellent",

      "scare-device",

      "motion-sprinkler",

      "guard-dog",

      "temporary-fence"

    ];

    if (
      protectionMethods.some(
        method =>
          strongProtectionTerms.includes(
            method
          )
      )
    ) {
      score += 55;
    }

    if (
      protectionMethods.some(
        method =>
          moderateProtectionTerms.includes(
            method
          )
      )
    ) {
      score += 25;
    }

    if (
      ownedEquipment.some(
        item =>
          strongProtectionTerms.includes(
            item
          )
      )
    ) {
      score += 20;
    }

    if (
      spaceTypes.some(
        spaceType =>
          [
            "forage-frame",
            "protected-forage-frame",
            "greenhouse"
          ].includes(
            normalizeSpaceType(
              spaceType
            )
          )
      )
    ) {
      score += 25;
    }

    return clamp(
      score,
      0,
      100
    );

  }



  /*
    ============================================================
    WILDLIFE RISK
    ============================================================
  */


  function getWildlifeRiskSafetyScore(
    crop,
    answers
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    if (!risks) {
      return null;
    }

    const selectedWildlife =
      getSelectedWildlifeProblems(
        answers
      );

    const cropRiskScores = [];

    const generalRisk =
      convertRiskScoreToSafetyScore(
        risks.wildlifePressureScore
      );

    if (
      Number.isFinite(
        generalRisk
      )
    ) {
      cropRiskScores.push(
        generalRisk
      );
    }

    const wildlifeFieldMap = {

      deer:
        risks.deerBrowsingRiskScore,

      rabbits:
        risks.rabbitBrowsingRiskScore,

      rabbit:
        risks.rabbitBrowsingRiskScore,

      birds:
        risks.birdLossRiskScore,

      bird:
        risks.birdLossRiskScore,

      rodents:
        risks.rodentAttractionScore,

      rodent:
        risks.rodentAttractionScore,

      raccoons:
        risks.raccoonDamageRiskScore,

      raccoon:
        risks.raccoonDamageRiskScore,

      squirrels:
        risks.squirrelDamageRiskScore,

      squirrel:
        risks.squirrelDamageRiskScore

    };

    selectedWildlife.forEach(
      wildlifeId => {

        const value =
          wildlifeFieldMap[
            wildlifeId
          ];

        const safetyScore =
          convertRiskScoreToSafetyScore(
            value
          );

        if (
          Number.isFinite(
            safetyScore
          )
        ) {
          cropRiskScores.push(
            safetyScore
          );
        }

      }
    );

    if (
      cropRiskScores.length === 0
    ) {
      return null;
    }

    const cropSafety =
      averageKnownValues(
        cropRiskScores
      );

    const userPressure =
      getUserWildlifePressureLevel(
        answers
      );

    if (
      !Number.isFinite(
        userPressure
      )
    ) {
      return cropSafety;
    }

    /*
      High local wildlife pressure increases the effect of
      crop attractiveness and browsing vulnerability.
    */

    const vulnerability =
      100 -
      cropSafety;

    const adjustedVulnerability =
      vulnerability *
      (
        0.55 +
        userPressure /
          100 *
          0.75
      );

    return clamp(
      100 -
      adjustedVulnerability,
      0,
      100
    );

  }



  /*
    ============================================================
    WEATHER AND STORM RISK
    ============================================================
  */


  function getWeatherRiskSafetyScore(
    crop,
    answers
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const climate =
      crop.plannerData
        ?.climate;

    const site =
      crop.plannerData
        ?.site;

    const safetyScores = [

      convertRiskScoreToSafetyScore(
        risks
          ?.stormDamageRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.lodgingRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.windDamageRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.hailDamageRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.frostDamageRiskScore
      )

    ];

    const windExposure =
      answers.site
        ?.windExposure;

    const lodgingRisk =
      convertRiskScoreToSafetyScore(
        site?.lodgingRiskScore ??
        risks?.lodgingRiskScore
      );

    if (
      [
        "high",
        "very-high",
        "exposed"
      ].includes(
        windExposure
      ) &&
      Number.isFinite(
        lodgingRisk
      )
    ) {

      safetyScores.push(
        clamp(
          lodgingRisk -
          20,
          0,
          100
        )
      );

    }

    const climateType =
      answers.climate
        ?.climateType;

    if (
      [
        "hot-humid",
        "humid-subtropical",
        "tropical"
      ].includes(
        climateType
      )
    ) {

      safetyScores.push(
        convertFivePointScore(
          climate
            ?.humidityToleranceScore
        )
      );

    }

    if (
      [
        "hot-dry",
        "arid",
        "semi-arid"
      ].includes(
        climateType
      )
    ) {

      safetyScores.push(
        convertFivePointScore(
          climate
            ?.heatToleranceScore
        )
      );

    }

    return averageKnownValues(
      safetyScores
    );

  }



  function getWeatherMitigationCapacity(
    crop,
    answers
  ) {

    const site =
      crop.plannerData
        ?.site;

    const supportRequired =
      crop.plannerData
        ?.space
        ?.supportStructureRequired ===
          true;

    const ownedEquipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    let score = 35;

    if (
      ownedEquipment.some(
        item =>
          [
            "stakes",
            "trellis",
            "plant-support",
            "row-cover",
            "windbreak",
            "shade-cloth"
          ].includes(
            item
          )
      )
    ) {
      score += 30;
    }

    if (
      acceptedTasks.some(
        task =>
          [
            "stake",
            "trellis",
            "support-plants",
            "install-row-cover"
          ].includes(
            task
          )
      )
    ) {
      score += 20;
    }

    if (
      answers.site
        ?.windExposure ===
          "sheltered"
    ) {
      score += 20;
    }

    if (
      supportRequired &&
      ownedEquipment.includes(
        "trellis"
      )
    ) {
      score += 15;
    }

    if (
      site
        ?.supportStructureRequired ===
          false
    ) {
      score += 5;
    }

    return clamp(
      score,
      0,
      100
    );

  }



  /*
    ============================================================
    HARVEST TIMING AND SHATTERING RISK
    ============================================================
  */


  function getHarvestLossRiskSafetyScore(
    crop
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const bestPath =
      crop.plannerData
        ?.usePaths;

    const cropRiskScores = [

      convertRiskScoreToSafetyScore(
        risks
          ?.shatteringRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.postHarvestLossRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.birdLossRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.harvestTimingSensitivityScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.overmaturityLossRiskScore
      )

    ];

    if (
      Array.isArray(
        bestPath
      )
    ) {

      bestPath.forEach(
        usePath => {

          cropRiskScores.push(

            convertRiskScoreToSafetyScore(
              usePath
                ?.postHarvestLossRiskScore
            ),

            convertRiskScoreToSafetyScore(
              usePath
                ?.shatteringRiskScore
            )

          );

        }
      );

    }

    return averageKnownValues(
      cropRiskScores
    );

  }



  function getHarvestMitigationCapacity(
    answers
  ) {

    const weeklyTime =
      getWeeklyTimeCapacityScore(
        answers.labor
          ?.weeklyCropTime
      );

    const experience =
      getGardeningExperienceScore(
        answers.labor
          ?.gardeningExperience
      );

    const harvestPattern =
      answers.harvestStorage
        ?.harvestPatternPreference;

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    const taskReadiness =
      acceptedTasks.some(
        task =>
          [
            "harvest",
            "inspect",
            "clean-sort",
            "dry"
          ].includes(
            getProcessingTaskFamily(
              task
            )
          )
      )
        ? 90
        : 60;

    const timingReadiness =
      [
        "continuous",
        "minor",
        "batch"
      ].includes(
        normalizeHarvestPattern(
          harvestPattern
        )
      )
        ? 82
        : 65;

    return averageKnownValues([

      weeklyTime,

      experience,

      taskReadiness,

      timingReadiness

    ]);

  }



  /*
    ============================================================
    STORAGE PEST RISK
    ============================================================
  */


  function getStoragePestRiskSafetyScore(
    crop,
    evaluation
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const bestPath =
      evaluation.usePaths
        ?.bestPath
        ?.usePath;

    return averageKnownValues([

      convertRiskScoreToSafetyScore(
        risks
          ?.storagePestRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.rodentAttractionScore
      ),

      convertRiskScoreToSafetyScore(
        bestPath
          ?.rodentRiskScore
      ),

      convertRiskScoreToSafetyScore(
        bestPath
          ?.storedInsectRiskScore
      )

    ]);

  }



  function getStoragePestMitigationCapacity(
    answers
  ) {

    const rodentProtection =
      answers.harvestStorage
        ?.rodentProtection;

    const containerType =
      answers.harvestStorage
        ?.dryCropContainerType;

    const locations =
      answers.harvestStorage
        ?.dryStorageLocations ||
      [];

    const rodentProtectionScores = {

      "rodent-proof-containers":
        100,

      "rodent-proof-room":
        100,

      "protected-room":
        82,

      "basic-containers":
        58,

      "none":
        15

    };

    const containerScores = {

      "airtight-food-safe":
        100,

      "sealed-food-safe":
        100,

      "metal-grain-can":
        100,

      "food-safe-bucket":
        92,

      "lidded-bin":
        72,

      "woven-sack":
        38,

      "open-container":
        15

    };

    const locationScore =
      locations.some(
        location =>
          [
            "climate-controlled",
            "indoor-pantry",
            "protected-room",
            "rodent-proof-room"
          ].includes(
            location
          )
      )
        ? 95
        : locations.some(
            location =>
              [
                "barn-shed",
                "dry-basement",
                "garage"
              ].includes(
                location
              )
          )
          ? 72
          : locations.length > 0
            ? 48
            : 25;

    return averageKnownValues([

      rodentProtectionScores[
        rodentProtection
      ] ?? null,

      containerScores[
        containerType
      ] ?? null,

      locationScore

    ]);

  }



  /*
    ============================================================
    MOLD AND MOISTURE RISK
    ============================================================
  */


  function getMoldMoistureRiskSafetyScore(
    crop,
    evaluation
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const bestPath =
      evaluation.usePaths
        ?.bestPath
        ?.usePath;

    return averageKnownValues([

      convertRiskScoreToSafetyScore(
        risks
          ?.moldRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.postHarvestMoistureRiskScore
      ),

      convertRiskScoreToSafetyScore(
        bestPath
          ?.moldRiskScore
      ),

      convertRiskScoreToSafetyScore(
        bestPath
          ?.spoilageRiskScore
      ),

      convertRiskScoreToSafetyScore(
        bestPath
          ?.postHarvestLossRiskScore
      )

    ]);

  }



  function getMoistureMitigationCapacity(
    answers,
    evaluation
  ) {

    const bestPath =
      evaluation.usePaths
        ?.bestPath
        ?.usePath;

    const dryingScore =
      bestPath
        ? getUsePathDryingScore(
            bestPath,
            answers
          )
        : null;

    const storageHumidity =
      answers.harvestStorage
        ?.storageHumidity;

    const humidityScores = {

      "consistently-dry":
        100,

      "usually-dry":
        82,

      "seasonally-humid":
        58,

      "often-humid":
        28,

      "unknown":
        45

    };

    const containerType =
      answers.harvestStorage
        ?.dryCropContainerType;

    const containerScores = {

      "airtight-food-safe":
        100,

      "sealed-food-safe":
        100,

      "metal-grain-can":
        92,

      "food-safe-bucket":
        90,

      "lidded-bin":
        68,

      "woven-sack":
        40,

      "open-container":
        18

    };

    return averageKnownValues([

      dryingScore,

      humidityScores[
        storageHumidity
      ] ?? null,

      containerScores[
        containerType
      ] ?? null

    ]);

  }



  /*
    ============================================================
    MECHANICAL HARVEST AND PROCESSING RISK

    Low mechanical suitability does not necessarily make a crop
    unsuitable for a backyard grower.

    The penalty increases only when the visitor expects larger
    production, reduced labor, or equipment-assisted handling.
    ============================================================
  */


  function userValuesMechanicalEfficiency(
    answers
  ) {

    const goals =
      answers.preferences
        ?.plannerGoals ||
      [];

    const totalArea =
      answers.space
        ?.totalGrowingAreaSqFt;

    const flockSize =
      answers.flock
        ?.flockSize;

    return (

      goals.includes(
        "low-labor"
      ) ||

      goals.includes(
        "high-yield"
      ) ||

      (
        Number.isFinite(
          totalArea
        ) &&
        totalArea >= 500
      ) ||

      (
        Number.isFinite(
          flockSize
        ) &&
        flockSize >= 30
      )

    );

  }



  function getMechanicalHandlingSafetyScore(
    crop,
    answers
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    if (!risks) {
      return null;
    }

    if (
      !userValuesMechanicalEfficiency(
        answers
      )
    ) {

      /*
        Mechanical suitability receives little importance for
        small hand-managed plantings.
      */

      return averageKnownValues([

        convertFivePointScore(
          risks
            .mechanicalHarvestSuitabilityScore
        ),

        convertFivePointScore(
          risks
            .mechanicalProcessingSuitabilityScore
        ),

        85

      ]);

    }

    return averageKnownValues([

      convertFivePointScore(
        risks
          .mechanicalHarvestSuitabilityScore
      ),

      convertFivePointScore(
        risks
          .mechanicalProcessingSuitabilityScore
      )

    ]);

  }



  function getMechanicalMitigationCapacity(
    answers
  ) {

    const ownedEquipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const purchaseWillingness =
      answers.labor
        ?.equipmentPurchaseWillingness ||
      [];

    const usefulEquipment = [

      "grain-thresher",

      "sheller",

      "seed-cleaner",

      "grain-mill",

      "chipper-shredder",

      "mechanical-harvester",

      "tractor",

      "tiller",

      "mower",

      "grain-cracker"

    ];

    const ownedCount =
      ownedEquipment.filter(
        equipment =>
          usefulEquipment.includes(
            equipment
          )
      ).length;

    const willingCount =
      purchaseWillingness.filter(
        equipment =>
          usefulEquipment.includes(
            equipment
          )
      ).length;

    return clamp(
      30 +
      ownedCount * 18 +
      willingCount * 8,
      0,
      100
    );

  }



  /*
    ============================================================
    ESTABLISHMENT FAILURE RISK
    ============================================================
  */


  function getEstablishmentRiskSafetyScore(
    crop
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const lifecycle =
      crop.plannerData
        ?.lifecycle;

    const labor =
      crop.plannerData
        ?.labor;

    return averageKnownValues([

      convertRiskScoreToSafetyScore(
        risks
          ?.establishmentFailureRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.seedlingLossRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.poorStandRiskScore
      ),

      convertFivePointScore(
        lifecycle
          ?.establishmentReliabilityScore
      ),

      convertFivePointScore(
        labor
          ?.beginnerFriendlinessScore
      )

    ]);

  }



  function getEstablishmentMitigationCapacity(
    answers
  ) {

    const experience =
      getGardeningExperienceScore(
        answers.labor
          ?.gardeningExperience
      );

    const wateringReliability =
      getWaterReliabilityBaseScore(
        answers.water
          ?.waterReliability
      );

    const equipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const hasEstablishmentEquipment =
      equipment.some(
        item =>
          [
            "seed-starting-trays",
            "grow-lights",
            "irrigation",
            "drip-irrigation",
            "row-cover",
            "tiller",
            "broadfork"
          ].includes(
            item
          )
      )
        ? 90
        : 58;

    return averageKnownValues([

      experience,

      wateringReliability,

      hasEstablishmentEquipment

    ]);

  }



  /*
    ============================================================
    INVASIVENESS AND PERSISTENCE RISK
    ============================================================
  */


  function getPersistenceRiskSafetyScore(
    crop,
    answers
  ) {

    const risks =
      crop.plannerData
        ?.risks;

    const space =
      crop.plannerData
        ?.space;

    const restrictions =
      answers.space
        ?.plantBehaviorRestrictions ||
      [];

    const safetyScores = [

      convertRiskScoreToSafetyScore(
        risks
          ?.invasivenessRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.selfSeedingRiskScore
      ),

      convertRiskScoreToSafetyScore(
        risks
          ?.undergroundSpreadRiskScore
      )

    ];

    if (
      space?.selfSeedingRisk ===
        true
    ) {

      safetyScores.push(
        restrictions.includes(
          "no-self-seeding"
        )
          ? 15
          : 55
      );

    }

    if (
      space
        ?.undergroundSpreadRisk ===
          true
    ) {

      safetyScores.push(
        restrictions.includes(
          "no-underground-spread"
        )
          ? 5
          : 45
      );

    }

    return averageKnownValues(
      safetyScores
    );

  }



  function getPersistenceMitigationCapacity(
    answers
  ) {

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    const overflowOptions =
      answers.space
        ?.overflowOptions ||
      [];

    const containmentAccepted =
      acceptedTasks.some(
        task =>
          [
            "deadhead",
            "remove-volunteers",
            "root-barrier",
            "contain-spread",
            "mow",
            "terminate"
          ].includes(
            task
          )
      );

    const hasOverflow =
      overflowOptions.length > 0;

    return averageKnownValues([

      containmentAccepted
        ? 90
        : 42,

      hasOverflow
        ? 75
        : 50

    ]);

  }



  /*
    ============================================================
    FLOCK-USE RISK
    ============================================================
  */


  function getFlockUseRiskSafetyScore(
    crop,
    evaluation
  ) {

    const flock =
      crop.plannerData
        ?.flock;

    const bestPath =
      evaluation.usePaths
        ?.bestPath
        ?.usePath;

    const safetyScores = [];

    if (
      flock
        ?.measuredSupplementRequired ===
          true
    ) {
      safetyScores.push(
        62
      );
    } else if (
      flock
        ?.freeChoiceFeedingSuitable ===
          true
    ) {
      safetyScores.push(
        95
      );
    }

    if (
      flock
        ?.rationFormulationKnowledgeRequired ===
          true
    ) {
      safetyScores.push(
        48
      );
    }

    if (
      flock
        ?.gradualIntroductionRequired ===
          true
    ) {
      safetyScores.push(
        70
      );
    }

    if (
      bestPath
        ?.measuredFeedingRequired ===
          true
    ) {
      safetyScores.push(
        60
      );
    }

    if (
      bestPath
        ?.cookingRequired ===
          true
    ) {
      safetyScores.push(
        58
      );
    }

    if (
      bestPath
        ?.antiNutritionalRiskScore !==
          undefined
    ) {

      safetyScores.push(
        convertRiskScoreToSafetyScore(
          bestPath
            .antiNutritionalRiskScore
        )
      );

    }

    if (
      bestPath
        ?.toxicityRiskScore !==
          undefined
    ) {

      safetyScores.push(
        convertRiskScoreToSafetyScore(
          bestPath
            .toxicityRiskScore
        )
      );

    }

    return averageKnownValues(
      safetyScores
    );

  }



  function getFlockUseMitigationCapacity(
    answers
  ) {

    const equipment =
      answers.labor
        ?.ownedEquipment ||
      [];

    const acceptedTasks =
      answers.labor
        ?.acceptedProcessingTasks ||
      [];

    const hasMeasurementEquipment =
      equipment.some(
        item =>
          [
            "feed-scale",
            "kitchen-scale",
            "scale",
            "measuring-cup"
          ].includes(
            item
          )
      );

    const acceptsCarefulPreparation =
      acceptedTasks.some(
        task =>
          [
            "measure",
            "mix",
            "cook",
            "grind"
          ].includes(
            getProcessingTaskFamily(
              task
            )
          )
      );

    return averageKnownValues([

      hasMeasurementEquipment
        ? 95
        : 60,

      acceptsCarefulPreparation
        ? 90
        : 55

    ]);

  }



  /*
    ============================================================
    RISK CATEGORY WEIGHTS
    ============================================================
  */


  function getRiskCategoryWeights() {

    const configuredWeights =
      config.scoring
        ?.engine
        ?.riskCategoryWeights;

    if (
      configuredWeights &&
      typeof configuredWeights ===
        "object"
    ) {
      return configuredWeights;
    }

    return {

      wildlife:
        0.15,

      weather:
        0.10,

      harvestLoss:
        0.10,

      storagePests:
        0.10,

      moldMoisture:
        0.13,

      mechanicalHandling:
        0.06,

      establishment:
        0.10,

      persistence:
        0.08,

      flockUse:
        0.10,

      bestUsePathRisk:
        0.08

    };

  }



  /*
    ============================================================
    BEST USE-PATH RISK

    Part 8 already scores path risk. This category uses the
    selected path's result rather than rescoring every storage
    and processing field a second time.
    ============================================================
  */


  function getBestUsePathRiskSafetyScore(
    evaluation
  ) {

    const bestPath =
      evaluation.usePaths
        ?.bestPath;

    if (!bestPath) {
      return null;
    }

    const riskFactor =
      bestPath.factors
        ?.find(
          factor =>
            factor.id ===
              "path-risk"
        );

    if (
      Number.isFinite(
        riskFactor?.score
      )
    ) {
      return riskFactor.score;
    }

    return getUsePathRiskResilienceScore(
      bestPath.usePath
    );

  }



  function getBestUsePathMitigationCapacity(
    evaluation
  ) {

    const bestPath =
      evaluation.usePaths
        ?.bestPath;

    if (!bestPath) {
      return null;
    }

    const taskFactor =
      bestPath.factors
        ?.find(
          factor =>
            factor.id ===
              "task-fit"
        );

    const equipmentFactor =
      bestPath.factors
        ?.find(
          factor =>
            factor.id ===
              "equipment-fit"
        );

    const dryingFactor =
      bestPath.factors
        ?.find(
          factor =>
            factor.id ===
              "drying-fit"
        );

    const storageFactor =
      bestPath.factors
        ?.find(
          factor =>
            factor.id ===
              "storage-safety"
        );

    return averageKnownValues([

      taskFactor?.score,

      equipmentFactor?.score,

      dryingFactor?.score,

      storageFactor?.score

    ]);

  }



  /*
    ============================================================
    RISK FACTOR LABELS AND MITIGATIONS
    ============================================================
  */


  function getRiskCategoryLabel(
    riskId
  ) {

    const labelMap = {

      wildlife:
        "Wildlife Pressure",

      weather:
        "Weather and Storm Damage",

      harvestLoss:
        "Harvest and Field Loss",

      storagePests:
        "Storage Pests",

      moldMoisture:
        "Mold and Moisture",

      mechanicalHandling:
        "Harvest and Processing Efficiency",

      establishment:
        "Establishment Reliability",

      persistence:
        "Spread and Persistence",

      flockUse:
        "Flock-Use Management",

      bestUsePathRisk:
        "Selected Use-Path Risk"

    };

    return labelMap[
      riskId
    ] || riskId;

  }



  function getRiskExplanation(
    riskId,
    safetyScore
  ) {

    if (
      !Number.isFinite(
        safetyScore
      )
    ) {
      return null;
    }

    const severity =
      safetyScore >= 80
        ? "low"
        : safetyScore >= 65
          ? "manageable"
          : safetyScore >= 45
            ? "meaningful"
            : "high";

    const explanationMap = {

      wildlife:
        `Wildlife-related crop loss risk is ${severity} under the selected conditions.`,

      weather:
        `Weather, wind, lodging, or storm-damage risk is ${severity}.`,

      harvestLoss:
        `The risk of losing usable yield before or during harvest is ${severity}.`,

      storagePests:
        `The risk from rodents or stored-product insects is ${severity}.`,

      moldMoisture:
        `The risk of mold, heating, or moisture-related spoilage is ${severity}.`,

      mechanicalHandling:
        `The difficulty of efficiently harvesting or processing the crop is ${severity}.`,

      establishment:
        `The risk of weak establishment or stand failure is ${severity}.`,

      persistence:
        `The risk of unwanted self-seeding, spreading, or persistence is ${severity}.`,

      flockUse:
        `The feeding-management risk for this crop is ${severity}.`,

      bestUsePathRisk:
        `The selected use path has ${severity} processing and storage risk.`

    };

    return explanationMap[
      riskId
    ] || null;

  }



  function getRiskMitigationText(
    riskId
  ) {

    const mitigationMap = {

      wildlife:
        "Use fencing, netting, protected forage frames, crop cages, or timely harvesting where wildlife pressure is significant.",

      weather:
        "Use sheltered placement, staking, support, windbreaks, timely harvest, and weather monitoring where appropriate.",

      harvestLoss:
        "Inspect the crop frequently near maturity and harvest promptly before shattering, lodging, wildlife loss, or weather damage increases.",

      storagePests:
        "Store harvested material in sealed food-safe or metal containers and inspect regularly for rodents and stored-product insects.",

      moldMoisture:
        "Dry thoroughly before enclosed storage, maintain airflow, use moisture-safe containers, and inspect repeatedly for heating or mold.",

      mechanicalHandling:
        "Keep planting scale realistic for hand harvest, or obtain appropriate shelling, threshing, chopping, or milling equipment.",

      establishment:
        "Prepare the seedbed carefully, plant at the correct depth and temperature, maintain moisture during establishment, and replant thin areas promptly.",

      persistence:
        "Use barriers, deadhead before seed drop, remove volunteers, contain spreading roots, or plant only where long-term persistence is acceptable.",

      flockUse:
        "Introduce gradually, measure supplemental feeding, follow required preparation steps, and continue providing a complete balanced poultry ration.",

      bestUsePathRisk:
        "Follow the selected use path's processing, drying, storage, inspection, and feeding instructions carefully."

    };

    return mitigationMap[
      riskId
    ] || null;

  }



  /*
    ============================================================
    BUILD RISK FACTORS
    ============================================================
  */


  function createCropRiskFactors(
    crop,
    answers,
    evaluation
  ) {

    const weights =
      getRiskCategoryWeights();

    const wildlifeSafety =
      getWildlifeRiskSafetyScore(
        crop,
        answers
      );

    const weatherSafety =
      getWeatherRiskSafetyScore(
        crop,
        answers
      );

    const harvestLossSafety =
      getHarvestLossRiskSafetyScore(
        crop
      );

    const storagePestSafety =
      getStoragePestRiskSafetyScore(
        crop,
        evaluation
      );

    const moldSafety =
      getMoldMoistureRiskSafetyScore(
        crop,
        evaluation
      );

    const mechanicalSafety =
      getMechanicalHandlingSafetyScore(
        crop,
        answers
      );

    const establishmentSafety =
      getEstablishmentRiskSafetyScore(
        crop
      );

    const persistenceSafety =
      getPersistenceRiskSafetyScore(
        crop,
        answers
      );

    const flockUseSafety =
      getFlockUseRiskSafetyScore(
        crop,
        evaluation
      );

    const usePathSafety =
      getBestUsePathRiskSafetyScore(
        evaluation
      );

    return [

      createRiskFactor(
        "wildlife",
        getRiskCategoryLabel(
          "wildlife"
        ),
        wildlifeSafety,
        weights.wildlife,
        getWildlifeMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "wildlife",
          wildlifeSafety
        ),
        getRiskMitigationText(
          "wildlife"
        )
      ),

      createRiskFactor(
        "weather",
        getRiskCategoryLabel(
          "weather"
        ),
        weatherSafety,
        weights.weather,
        getWeatherMitigationCapacity(
          crop,
          answers
        ),
        getRiskExplanation(
          "weather",
          weatherSafety
        ),
        getRiskMitigationText(
          "weather"
        )
      ),

      createRiskFactor(
        "harvestLoss",
        getRiskCategoryLabel(
          "harvestLoss"
        ),
        harvestLossSafety,
        weights.harvestLoss,
        getHarvestMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "harvestLoss",
          harvestLossSafety
        ),
        getRiskMitigationText(
          "harvestLoss"
        )
      ),

      createRiskFactor(
        "storagePests",
        getRiskCategoryLabel(
          "storagePests"
        ),
        storagePestSafety,
        weights.storagePests,
        getStoragePestMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "storagePests",
          storagePestSafety
        ),
        getRiskMitigationText(
          "storagePests"
        )
      ),

      createRiskFactor(
        "moldMoisture",
        getRiskCategoryLabel(
          "moldMoisture"
        ),
        moldSafety,
        weights.moldMoisture,
        getMoistureMitigationCapacity(
          answers,
          evaluation
        ),
        getRiskExplanation(
          "moldMoisture",
          moldSafety
        ),
        getRiskMitigationText(
          "moldMoisture"
        )
      ),

      createRiskFactor(
        "mechanicalHandling",
        getRiskCategoryLabel(
          "mechanicalHandling"
        ),
        mechanicalSafety,
        weights.mechanicalHandling,
        getMechanicalMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "mechanicalHandling",
          mechanicalSafety
        ),
        getRiskMitigationText(
          "mechanicalHandling"
        )
      ),

      createRiskFactor(
        "establishment",
        getRiskCategoryLabel(
          "establishment"
        ),
        establishmentSafety,
        weights.establishment,
        getEstablishmentMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "establishment",
          establishmentSafety
        ),
        getRiskMitigationText(
          "establishment"
        )
      ),

      createRiskFactor(
        "persistence",
        getRiskCategoryLabel(
          "persistence"
        ),
        persistenceSafety,
        weights.persistence,
        getPersistenceMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "persistence",
          persistenceSafety
        ),
        getRiskMitigationText(
          "persistence"
        )
      ),

      createRiskFactor(
        "flockUse",
        getRiskCategoryLabel(
          "flockUse"
        ),
        flockUseSafety,
        weights.flockUse,
        getFlockUseMitigationCapacity(
          answers
        ),
        getRiskExplanation(
          "flockUse",
          flockUseSafety
        ),
        getRiskMitigationText(
          "flockUse"
        )
      ),

      createRiskFactor(
        "bestUsePathRisk",
        getRiskCategoryLabel(
          "bestUsePathRisk"
        ),
        usePathSafety,
        weights.bestUsePathRisk,
        getBestUsePathMitigationCapacity(
          evaluation
        ),
        getRiskExplanation(
          "bestUsePathRisk",
          usePathSafety
        ),
        getRiskMitigationText(
          "bestUsePathRisk"
        )
      )

    ];

  }



  /*
    ============================================================
    RISK ADJUSTMENT CALCULATION

    The adjustment is applied later during final scoring.

    The result ranges approximately from:

       0 points for low risk
      -2 points for manageable risk
      -6 points for meaningful risk
     -12 points for severe risk

    Low evidence coverage limits the size of the penalty because
    missing risk information must not be treated as confirmed
    danger.
    ============================================================
  */


  function calculateRiskAdjustment(
    safetyScore,
    evidenceCoverage
  ) {

    if (
      !Number.isFinite(
        safetyScore
      )
    ) {
      return 0;
    }

    let penalty = 0;

    if (
      safetyScore >= 85
    ) {
      penalty = 0;
    } else if (
      safetyScore >= 75
    ) {
      penalty = -1;
    } else if (
      safetyScore >= 65
    ) {
      penalty = -2.5;
    } else if (
      safetyScore >= 55
    ) {
      penalty = -4.5;
    } else if (
      safetyScore >= 45
    ) {
      penalty = -7;
    } else if (
      safetyScore >= 30
    ) {
      penalty = -9.5;
    } else {
      penalty = -12;
    }

    const coverageMultiplier =
      clamp(
        0.35 +
        (
          evidenceCoverage || 0
        ) *
        0.65,
        0.35,
        1
      );

    return Math.round(
      penalty *
      coverageMultiplier *
      10
    ) /
      10;

  }



  /*
    ============================================================
    RISK RESULT CLASSIFICATION
    ============================================================
  */


  function classifyRiskFactors(
    factors
  ) {

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.adjustedSafetyScore
          )
      );

    return {

      primaryRisks:
        knownFactors
          .filter(
            factor =>
              factor
                .adjustedSafetyScore <
              50
          )
          .sort(
            (
              first,
              second
            ) =>
              first
                .adjustedSafetyScore -
              second
                .adjustedSafetyScore
          ),

      moderateRisks:
        knownFactors
          .filter(
            factor =>
              factor
                .adjustedSafetyScore >=
                50 &&
              factor
                .adjustedSafetyScore <
                70
          )
          .sort(
            (
              first,
              second
            ) =>
              first
                .adjustedSafetyScore -
              second
                .adjustedSafetyScore
          ),

      managedRisks:
        knownFactors
          .filter(
            factor =>
              factor
                .rawSafetyScore <
                70 &&
              factor
                .adjustedSafetyScore >=
                70
          )
          .sort(
            (
              first,
              second
            ) =>
              second
                .adjustedSafetyScore -
              first
                .adjustedSafetyScore
          )

    };

  }



  function createRiskMitigationList(
    factors
  ) {

    return factors
      .filter(
        factor =>
          Number.isFinite(
            factor.adjustedSafetyScore
          ) &&
          factor.adjustedSafetyScore <
            72 &&
          factor.mitigation
      )
      .sort(
        (
          first,
          second
        ) =>
          first
            .adjustedSafetyScore -
          second
            .adjustedSafetyScore
      )
      .slice(
        0,
        6
      )
      .map(
        factor => ({

          id:
            factor.id,

          label:
            factor.label,

          score:
            factor
              .adjustedSafetyScore,

          mitigation:
            factor.mitigation

        })
      );

  }



  /*
    ============================================================
    RISK ORCHESTRATOR
    ============================================================
  */


  function evaluateRisks(
    crop,
    answers,
    evaluation
  ) {

    const risks =
      ensureRiskEvaluationObject(
        evaluation
      );

    risks.categoryResults =
      [];

    risks.primaryRisks =
      [];

    risks.moderateRisks =
      [];

    risks.managedRisks =
      [];

    risks.mitigations =
      [];

    risks.warnings =
      [];

    const factors =
      createCropRiskFactors(
        crop,
        answers,
        evaluation
      );

    const rawRiskScore =
      calculateRawRiskFactorScore(
        factors
      );

    const adjustedRiskScore =
      calculateRiskFactorScore(
        factors
      );

    const evidenceCoverage =
      calculateRiskFactorCoverage(
        factors
      );

    const classifications =
      classifyRiskFactors(
        factors
      );

    risks.categoryResults =
      factors;

    risks.rawRiskScore =
      rawRiskScore;

    risks.score =
      adjustedRiskScore;

    risks.evidenceCoverage =
      Math.round(
        evidenceCoverage *
        100
      ) /
        100;

    risks.adjustment =
      calculateRiskAdjustment(
        adjustedRiskScore,
        evidenceCoverage
      );

    risks.primaryRisks =
      classifications
        .primaryRisks;

    risks.moderateRisks =
      classifications
        .moderateRisks;

    risks.managedRisks =
      classifications
        .managedRisks;

    risks.mitigations =
      createRiskMitigationList(
        factors
      );

    if (
      risks.primaryRisks.length >
        0
    ) {

      risks.warnings.push(
        "This crop has at least one high practical risk under the selected conditions."
      );

    }

    if (
      risks.primaryRisks.length >=
        3
    ) {

      risks.warnings.push(
        "Several independent risks may reduce the crop's reliability or usable yield."
      );

    }

    if (
      risks.evidenceCoverage <
        0.50
    ) {

      risks.warnings.push(
        "Risk confidence is limited because the crop record lacks several risk measurements."
      );

    }

    if (
      risks.score !== null &&
      risks.score < 45
    ) {

      risks.warnings.push(
        "The combined unmanaged and partially managed risk level is high."
      );

    }

    if (
      risks.managedRisks.length >
        0
    ) {

      risks.warnings.push(
        "Some underlying risks appear manageable because the visitor selected suitable equipment, facilities, or practices."
      );

    }

    if (
      !evaluation.usePaths
        ?.bestPath
    ) {

      risks.warnings.push(
        "Use-path-specific risk could not be evaluated because no eligible use path was selected."
      );

    }

    return risks;

  }

    /*
    ============================================================
    PHASE 6
    CONFIDENCE AND EVIDENCE QUALITY

    Confidence measures how strongly the engine can trust the
    recommendation it has calculated.

    Confidence is separate from crop suitability.

    A crop may have:

      High score + high confidence
      High score + limited confidence
      Moderate score + high confidence
      Moderate score + limited confidence

    Higher confidence means:

      - the crop record is complete;
      - important values are known;
      - visitor-specific evidence was available;
      - the scoring phases generally agree;
      - use-path selection is well supported;
      - sources and verification quality are strong;
      - few conclusions depend entirely on inference.

    Confidence does not directly make an unsuitable crop
    suitable. It describes certainty, not desirability.
    ============================================================
  */


  /*
    ============================================================
    CONFIDENCE OBJECT
    ============================================================
  */


  function ensureConfidenceEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.confidence ||
      typeof evaluation.confidence !==
        "object"
    ) {

      evaluation.confidence = {};

    }

    const confidence =
      evaluation.confidence;

    confidence.score =
      Number.isFinite(
        confidence.score
      )
        ? confidence.score
        : null;

    confidence.level =
      typeof confidence.level ===
        "string"
        ? confidence.level
        : "unknown";

    confidence.evidenceCoverage =
      Number.isFinite(
        confidence.evidenceCoverage
      )
        ? confidence.evidenceCoverage
        : 0;

    confidence.recordCompleteness =
      Number.isFinite(
        confidence.recordCompleteness
      )
        ? confidence.recordCompleteness
        : 0;

    confidence.phaseAgreement =
      Number.isFinite(
        confidence.phaseAgreement
      )
        ? confidence.phaseAgreement
        : null;

    confidence.sourceQuality =
      Number.isFinite(
        confidence.sourceQuality
      )
        ? confidence.sourceQuality
        : null;

    confidence.directEvidenceScore =
      Number.isFinite(
        confidence.directEvidenceScore
      )
        ? confidence.directEvidenceScore
        : null;

    confidence.unknownValueRate =
      Number.isFinite(
        confidence.unknownValueRate
      )
        ? confidence.unknownValueRate
        : null;

    confidence.factorResults =
      Array.isArray(
        confidence.factorResults
      )
        ? confidence.factorResults
        : [];

    confidence.strengths =
      Array.isArray(
        confidence.strengths
      )
        ? confidence.strengths
        : [];

    confidence.uncertainties =
      Array.isArray(
        confidence.uncertainties
      )
        ? confidence.uncertainties
        : [];

    confidence.warnings =
      Array.isArray(
        confidence.warnings
      )
        ? confidence.warnings
        : [];

    confidence.missingSections =
      Array.isArray(
        confidence.missingSections
      )
        ? confidence.missingSections
        : [];

    confidence.phaseScores =
      confidence.phaseScores &&
      typeof confidence.phaseScores ===
        "object"
        ? confidence.phaseScores
        : {};

    return confidence;

  }



  /*
    ============================================================
    GENERAL OBJECT INSPECTION HELPERS
    ============================================================
  */


  function isPlainObject(
    value
  ) {

    return (

      value !== null &&

      typeof value ===
        "object" &&

      !Array.isArray(
        value
      )

    );

  }



  function isKnownDataValue(
    value
  ) {

    if (
      value === null ||
      value === undefined
    ) {
      return false;
    }

    if (
      typeof value ===
        "number"
    ) {
      return Number.isFinite(
        value
      );
    }

    if (
      typeof value ===
        "string"
    ) {

      return (
        value.trim().length >
        0
      );

    }

    if (
      typeof value ===
        "boolean"
    ) {
      return true;
    }

    if (
      Array.isArray(
        value
      )
    ) {

      return value.length > 0;

    }

    if (
      isPlainObject(
        value
      )
    ) {

      return Object.keys(
        value
      ).length > 0;

    }

    return false;

  }



  function inspectObjectDataCoverage(
    value,
    options = {}
  ) {

    const excludedKeys =
      new Set(
        options.excludedKeys || [
          "citations",
          "sources",
          "notes",
          "comments",
          "description",
          "label"
        ]
      );

    const result = {

      totalFields:
        0,

      knownFields:
        0,

      unknownFields:
        0

    };

    function inspectValue(
      currentValue,
      currentKey,
      depth
    ) {

      if (
        depth >
        (
          options.maximumDepth ??
          10
        )
      ) {
        return;
      }

      if (
        excludedKeys.has(
          currentKey
        )
      ) {
        return;
      }

      if (
        Array.isArray(
          currentValue
        )
      ) {

        /*
          An array is counted as one field.

          Its child objects are also inspected because arrays
          such as usePaths contain important planner evidence.
        */

        result.totalFields +=
          1;

        if (
          currentValue.length >
          0
        ) {
          result.knownFields +=
            1;
        } else {
          result.unknownFields +=
            1;
        }

        currentValue.forEach(
          item => {

            if (
              isPlainObject(
                item
              )
            ) {

              Object.entries(
                item
              ).forEach(
                (
                  [
                    key,
                    childValue
                  ]
                ) => {

                  inspectValue(
                    childValue,
                    key,
                    depth + 1
                  );

                }
              );

            }

          }
        );

        return;

      }

      if (
        isPlainObject(
          currentValue
        )
      ) {

        Object.entries(
          currentValue
        ).forEach(
          (
            [
              key,
              childValue
            ]
          ) => {

            inspectValue(
              childValue,
              key,
              depth + 1
            );

          }
        );

        return;

      }

      result.totalFields +=
        1;

      if (
        isKnownDataValue(
          currentValue
        )
      ) {
        result.knownFields +=
          1;
      } else {
        result.unknownFields +=
          1;
      }

    }

    if (
      isPlainObject(
        value
      )
    ) {

      Object.entries(
        value
      ).forEach(
        (
          [
            key,
            childValue
          ]
        ) => {

          inspectValue(
            childValue,
            key,
            0
          );

        }
      );

    }

    return result;

  }



  /*
    ============================================================
    CROP SECTION ACCESS

    Barley Version 2.0.0 stores planner sections consistently,
    but these fallbacks allow the engine to inspect records
    that may still expose sections at the crop root.
    ============================================================
  */


  function getCropPlannerSection(
    crop,
    sectionId
  ) {

    return (

      crop.plannerData?.[
        sectionId
      ] ??

      crop[
        sectionId
      ] ??

      null

    );

  }



  function getCropPlannerUsePaths(
    crop
  ) {

    const usePaths =
      getCropPlannerSection(
        crop,
        "usePaths"
      );

    return Array.isArray(
      usePaths
    )
      ? usePaths
      : [];

  }



  /*
    ============================================================
    REQUIRED PLANNER SECTIONS
    ============================================================
  */


  function getRequiredConfidenceSections() {

    return [

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

    ];

  }



  function inspectRequiredSectionPresence(
    crop
  ) {

    const requiredSections =
      getRequiredConfidenceSections();

    const sectionResults =
      requiredSections.map(
        sectionId => {

          const section =
            getCropPlannerSection(
              crop,
              sectionId
            );

          let present = false;

          if (
            Array.isArray(
              section
            )
          ) {

            present =
              section.length > 0;

          } else if (
            isPlainObject(
              section
            )
          ) {

            present =
              Object.keys(
                section
              ).length > 0;

          } else {

            present =
              isKnownDataValue(
                section
              );

          }

          return {

            id:
              sectionId,

            present

          };

        }
      );

    const presentCount =
      sectionResults.filter(
        section =>
          section.present
      ).length;

    return {

      requiredCount:
        requiredSections.length,

      presentCount,

      score:
        requiredSections.length >
          0
          ? (
              presentCount /
              requiredSections.length
            ) *
            100
          : 0,

      missingSections:
        sectionResults
          .filter(
            section =>
              !section.present
          )
          .map(
            section =>
              section.id
          ),

      sectionResults

    };

  }



  /*
    ============================================================
    RECORD COMPLETENESS

    Section presence measures structural completeness.

    Field coverage measures how much of the stored planner data
    contains actual known values rather than nulls.
    ============================================================
  */


  function calculateCropRecordCompleteness(
    crop
  ) {

    const sectionInspection =
      inspectRequiredSectionPresence(
        crop
      );

    const plannerData =
      crop.plannerData &&
      typeof crop.plannerData ===
        "object"
        ? crop.plannerData
        : crop;

    const fieldInspection =
      inspectObjectDataCoverage(
        plannerData,
        {
          maximumDepth:
            12
        }
      );

    const fieldCoverage =
      fieldInspection.totalFields >
        0
        ? (
            fieldInspection.knownFields /
            fieldInspection.totalFields
          ) *
          100
        : 0;

    const completenessScore =
      sectionInspection.score *
        0.42 +
      fieldCoverage *
        0.58;

    return {

      score:
        roundScore(
          completenessScore
        ),

      sectionScore:
        roundScore(
          sectionInspection.score
        ),

      fieldCoverage:
        roundScore(
          fieldCoverage
        ),

      missingSections:
        sectionInspection
          .missingSections,

      totalFields:
        fieldInspection
          .totalFields,

      knownFields:
        fieldInspection
          .knownFields,

      unknownFields:
        fieldInspection
          .unknownFields,

      unknownValueRate:
        fieldInspection.totalFields >
          0
          ? clamp(
              fieldInspection
                .unknownFields /
              fieldInspection
                .totalFields,
              0,
              1
            )
          : 1

    };

  }



  /*
    ============================================================
    CRITICAL FIELD COMPLETENESS

    Some fields matter more than ordinary descriptive fields.

    Unknown critical values reduce confidence more strongly than
    unknown optional or explanatory fields.
    ============================================================
  */


  function getCriticalConfidenceFieldPaths() {

    return [

      [
        "climate",
        "preferredClimateTypes"
      ],

      [
        "climate",
        "minimumFrostFreeDays"
      ],

      [
        "site",
        "minimumDirectSunHours"
      ],

      [
        "soil",
        "drainageRequirement"
      ],

      [
        "soil",
        "minimumSoilDepthInches"
      ],

      [
        "water",
        "droughtSurvivalScore"
      ],

      [
        "space",
        "minimumUsefulAreaSqFt"
      ],

      [
        "space",
        "spaceEfficiencyScore"
      ],

      [
        "flock",
        "flockConsumptionEfficiencyScore"
      ],

      [
        "labor",
        "generalLaborDemandLevel"
      ],

      [
        "risks",
        "wildlifePressureScore"
      ],

      [
        "risks",
        "birdLossRiskScore"
      ],

      [
        "risks",
        "deerBrowsingRiskScore"
      ],

      [
        "risks",
        "rabbitBrowsingRiskScore"
      ],

      [
        "risks",
        "stormDamageRiskScore"
      ],

      [
        "risks",
        "shatteringRiskScore"
      ],

      [
        "risks",
        "postHarvestLossRiskScore"
      ],

      [
        "risks",
        "storagePestRiskScore"
      ],

      [
        "risks",
        "rodentAttractionScore"
      ],

      [
        "risks",
        "mechanicalHarvestSuitabilityScore"
      ],

      [
        "risks",
        "mechanicalProcessingSuitabilityScore"
      ]

    ];

  }



  function getNestedObjectValue(
    object,
    path
  ) {

    let currentValue =
      object;

    for (
      const key
      of path
    ) {

      if (
        currentValue === null ||
        currentValue ===
          undefined
      ) {
        return undefined;
      }

      currentValue =
        currentValue[
          key
        ];

    }

    return currentValue;

  }



  function inspectCriticalFieldCoverage(
    crop
  ) {

    const paths =
      getCriticalConfidenceFieldPaths();

    const results =
      paths.map(
        path => {

          const section =
            getCropPlannerSection(
              crop,
              path[0]
            );

          const value =
            getNestedObjectValue(
              section,
              path.slice(
                1
              )
            );

          return {

            path:
              path.join(
                "."
              ),

            known:
              isKnownDataValue(
                value
              ),

            value

          };

        }
      );

    const knownCount =
      results.filter(
        result =>
          result.known
      ).length;

    return {

      score:
        results.length > 0
          ? roundScore(
              knownCount /
              results.length *
              100
            )
          : 0,

      knownCount,

      totalCount:
        results.length,

      missingFields:
        results
          .filter(
            result =>
              !result.known
          )
          .map(
            result =>
              result.path
          ),

      results

    };

  }



  /*
    ============================================================
    PHASE EVIDENCE COVERAGE
    ============================================================
  */


  function getPhaseEvidenceCoverage(
    evaluation
  ) {

    const compatibilityCoverage =
      Number.isFinite(
        evaluation.compatibility
          ?.evidenceCoverage
      )
        ? evaluation.compatibility
            .evidenceCoverage
        : null;

    const goalCoverage =
      Number.isFinite(
        evaluation.goals
          ?.evidenceCoverage
      )
        ? evaluation.goals
            .evidenceCoverage
        : null;

    const usePathCoverage =
      Number.isFinite(
        evaluation.usePaths
          ?.evidenceCoverage
      )
        ? evaluation.usePaths
            .evidenceCoverage
        : null;

    const riskCoverage =
      Number.isFinite(
        evaluation.risks
          ?.evidenceCoverage
      )
        ? evaluation.risks
            .evidenceCoverage
        : null;

    const coverageValues = [

      compatibilityCoverage,

      goalCoverage,

      usePathCoverage,

      riskCoverage

    ].filter(
      Number.isFinite
    );

    const averageCoverage =
      coverageValues.length > 0
        ? averageKnownValues(
            coverageValues
          )
        : 0;

    return {

      score:
        roundScore(
          averageCoverage *
          100
        ),

      compatibility:
        compatibilityCoverage,

      goals:
        goalCoverage,

      usePaths:
        usePathCoverage,

      risks:
        riskCoverage,

      knownPhaseCount:
        coverageValues.length

    };

  }



  /*
    ============================================================
    PHASE SCORE AGREEMENT

    Agreement is based on the spread among:

      compatibility score
      goal score
      use-path score
      risk safety score

    Closely grouped scores increase confidence.

    Wide disagreement does not necessarily make a crop bad.
    It means the final conclusion requires more caution.
    ============================================================
  */


  function calculateMean(
    values
  ) {

    const knownValues =
      values.filter(
        Number.isFinite
      );

    if (
      knownValues.length === 0
    ) {
      return null;
    }

    return (
      knownValues.reduce(
        (
          total,
          value
        ) =>
          total +
          value,
        0
      ) /
      knownValues.length
    );

  }



  function calculateStandardDeviation(
    values
  ) {

    const knownValues =
      values.filter(
        Number.isFinite
      );

    if (
      knownValues.length <
      2
    ) {
      return null;
    }

    const mean =
      calculateMean(
        knownValues
      );

    const variance =
      knownValues.reduce(
        (
          total,
          value
        ) =>
          total +
          Math.pow(
            value -
            mean,
            2
          ),
        0
      ) /
      knownValues.length;

    return Math.sqrt(
      variance
    );

  }



  function calculatePhaseAgreement(
    evaluation
  ) {

    const phaseScores = {

      compatibility:
        Number.isFinite(
          evaluation.compatibility
            ?.score
        )
          ? evaluation.compatibility
              .score
          : null,

      goals:
        Number.isFinite(
          evaluation.goals
            ?.score
        )
          ? evaluation.goals
              .score
          : null,

      usePaths:
        Number.isFinite(
          evaluation.usePaths
            ?.score
        )
          ? evaluation.usePaths
              .score
          : null,

      risks:
        Number.isFinite(
          evaluation.risks
            ?.score
        )
          ? evaluation.risks
              .score
          : null

    };

    const knownScores =
      Object.values(
        phaseScores
      ).filter(
        Number.isFinite
      );

    if (
      knownScores.length === 0
    ) {

      return {

        score:
          null,

        standardDeviation:
          null,

        range:
          null,

        knownPhaseCount:
          0,

        phaseScores

      };

    }

    if (
      knownScores.length === 1
    ) {

      return {

        score:
          45,

        standardDeviation:
          null,

        range:
          0,

        knownPhaseCount:
          1,

        phaseScores

      };

    }

    const standardDeviation =
      calculateStandardDeviation(
        knownScores
      );

    const range =
      Math.max(
        ...knownScores
      ) -
      Math.min(
        ...knownScores
      );

    /*
      Standard deviation drives most of the agreement score.

      The range adds protection against one phase being very far
      from the others.
    */

    const deviationScore =
      Number.isFinite(
        standardDeviation
      )
        ? clamp(
            100 -
            standardDeviation *
              4.2,
            0,
            100
          )
        : 45;

    const rangeScore =
      clamp(
        100 -
        range *
          1.65,
        0,
        100
      );

    const phaseCountScore =
      knownScores.length === 4
        ? 100
        : knownScores.length === 3
          ? 85
          : 65;

    return {

      score:
        roundScore(
          deviationScore *
            0.62 +
          rangeScore *
            0.23 +
          phaseCountScore *
            0.15
        ),

      standardDeviation:
        Number.isFinite(
          standardDeviation
        )
          ? Math.round(
              standardDeviation *
              100
            ) /
              100
          : null,

      range:
        roundScore(
          range
        ),

      knownPhaseCount:
        knownScores.length,

      phaseScores

    };

  }



  /*
    ============================================================
    SOURCE AND VERIFICATION QUALITY
    ============================================================
  */


  function convertSourceQualityLevelToScore(
    qualityLevel
  ) {

    const scoreMap = {

      "excellent":
        100,

      "very-high":
        95,

      "high":
        88,

      "good":
        80,

      "moderate":
        68,

      "mixed":
        58,

      "limited":
        42,

      "low":
        30,

      "unverified":
        15,

      "unknown":
        35

    };

    return scoreMap[
      qualityLevel
    ] ?? null;

  }



  function convertVerificationStatusToScore(
    status
  ) {

    const scoreMap = {

      "verified":
        100,

      "fully-verified":
        100,

      "reviewed":
        92,

      "research-complete":
        92,

      "ready":
        90,

      "partially-verified":
        72,

      "provisional":
        58,

      "needs-review":
        45,

      "draft":
        35,

      "incomplete":
        25,

      "unverified":
        15

    };

    return scoreMap[
      status
    ] ?? null;

  }



  function countKnownSources(
    dataQuality
  ) {

    const possibleSourceCollections = [

      dataQuality?.sources,

      dataQuality?.citations,

      dataQuality?.sourceList,

      dataQuality
        ?.researchSources,

      dataQuality
        ?.extensionSources,

      dataQuality
        ?.primarySources

    ];

    const normalizedSources = [];

    possibleSourceCollections.forEach(
      collection => {

        if (
          Array.isArray(
            collection
          )
        ) {

          normalizedSources.push(
            ...collection
          );

        } else if (
          typeof collection ===
            "string" &&
          collection.trim()
            .length > 0
        ) {

          normalizedSources.push(
            collection
          );

        }

      }
    );

    return normalizedSources.length;

  }



  function getSourceCountScore(
    sourceCount
  ) {

    if (
      !Number.isFinite(
        sourceCount
      )
    ) {
      return null;
    }

    if (
      sourceCount >= 8
    ) {
      return 100;
    }

    if (
      sourceCount >= 6
    ) {
      return 92;
    }

    if (
      sourceCount >= 4
    ) {
      return 82;
    }

    if (
      sourceCount >= 3
    ) {
      return 72;
    }

    if (
      sourceCount >= 2
    ) {
      return 60;
    }

    if (
      sourceCount === 1
    ) {
      return 42;
    }

    return 20;

  }



  function calculateSourceQualityScore(
    crop
  ) {

    const dataQuality =
      getCropPlannerSection(
        crop,
        "dataQuality"
      ) || {};

    const templateMetadata =
      getCropPlannerSection(
        crop,
        "templateMetadata"
      ) || {};

    const sourceCount =
      countKnownSources(
        dataQuality
      );

    const explicitQualityScore =
      getConvertedFivePointValue([

        dataQuality
          ?.sourceQualityScore,

        dataQuality
          ?.researchQualityScore,

        dataQuality
          ?.evidenceQualityScore,

        dataQuality
          ?.confidenceScore

      ]);

    const qualityLevelScore =
      convertSourceQualityLevelToScore(

        dataQuality
          ?.sourceQualityLevel ??

        dataQuality
          ?.researchQualityLevel ??

        dataQuality
          ?.evidenceQualityLevel

      );

    const verificationScore =
      convertVerificationStatusToScore(

        dataQuality
          ?.verificationStatus ??

        dataQuality
          ?.reviewStatus ??

        templateMetadata
          ?.developmentStatus ??

        crop.plannerData
          ?.developmentStatus

      );

    const reviewedBooleanScore =
      dataQuality
        ?.reviewed ===
          true
        ? 95
        : dataQuality
            ?.reviewed ===
              false
          ? 35
          : null;

    const citationsCompleteScore =
      dataQuality
        ?.citationsComplete ===
          true
        ? 100
        : dataQuality
            ?.citationsComplete ===
              false
          ? 45
          : null;

    const calculatedScore =
      averageKnownValues([

        explicitQualityScore,

        qualityLevelScore,

        verificationScore,

        reviewedBooleanScore,

        citationsCompleteScore,

        getSourceCountScore(
          sourceCount
        )

      ]);

    return {

      score:
        Number.isFinite(
          calculatedScore
        )
          ? roundScore(
              calculatedScore
            )
          : null,

      sourceCount,

      verificationScore,

      explicitQualityScore,

      qualityLevelScore,

      reviewedBooleanScore,

      citationsCompleteScore

    };

  }



  /*
    ============================================================
    DIRECT VERSUS DERIVED EVIDENCE

    Direct evidence is data explicitly stored in the crop
    record for the requested decision.

    Derived evidence is a reasonable conclusion calculated from
    related crop fields.

    Derived evidence is useful, but direct evidence provides
    greater confidence.
    ============================================================
  */


  function hasDirectGoalScore(
    crop,
    goalId
  ) {

    const goals =
      getCropPlannerSection(
        crop,
        "goals"
      );

    if (!goals) {
      return false;
    }

    const camelCaseGoalId =
      goalId.replace(
        /-([a-z])/g,
        (
          match,
          character
        ) =>
          character.toUpperCase()
      );

    const possibleKeys = [

      goalId,

      camelCaseGoalId,

      `${camelCaseGoalId}Score`,

      `${goalId}Score`

    ];

    const collections = [

      goals,

      goals.goalScores,

      goals.plannerGoalScores,

      goals.scores,

      goals.goalAlignmentScores

    ].filter(
      isPlainObject
    );

    return collections.some(
      collection =>
        possibleKeys.some(
          key =>
            Number.isFinite(
              collection[
                key
              ]
            )
        )
    );

  }



  function calculateGoalDirectEvidenceScore(
    crop,
    answers
  ) {

    const selectedGoals =
      Array.isArray(
        answers.preferences
          ?.plannerGoals
      )
        ? answers.preferences
            .plannerGoals
        : [];

    if (
      selectedGoals.length === 0
    ) {
      return null;
    }

    const directGoalCount =
      selectedGoals.filter(
        goalId =>
          hasDirectGoalScore(
            crop,
            goalId
          )
      ).length;

    return roundScore(
      directGoalCount /
      selectedGoals.length *
      100
    );

  }



  function calculateUsePathDirectEvidenceScore(
    evaluation
  ) {

    const bestPath =
      evaluation.usePaths
        ?.bestPath;

    if (!bestPath) {
      return null;
    }

    const factors =
      Array.isArray(
        bestPath.factors
      )
        ? bestPath.factors
        : [];

    if (
      factors.length === 0
    ) {
      return null;
    }

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.score
          )
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    /*
      These factors normally rely directly on stored use-path
      fields or explicit questionnaire selections.
    */

    const directFactorIds =
      new Set([

        "product-match",

        "task-fit",

        "equipment-fit",

        "processing-time",

        "harvest-pattern",

        "storage-duration",

        "drying-fit",

        "storage-safety",

        "feeding-practicality",

        "waste-efficiency",

        "path-risk"

      ]);

    const knownDirectCount =
      knownFactors.filter(
        factor =>
          directFactorIds.has(
            factor.id
          )
      ).length;

    return roundScore(
      knownDirectCount /
      knownFactors.length *
      100
    );

  }



  function calculateCompatibilityDirectEvidenceScore(
    evaluation
  ) {

    const categoryResults =
      evaluation.compatibility
        ?.categoryResults;

    if (
      !Array.isArray(
        categoryResults
      ) ||
      categoryResults.length ===
        0
    ) {
      return null;
    }

    const knownCategories =
      categoryResults.filter(
        category =>
          Number.isFinite(
            category.score
          )
      );

    if (
      knownCategories.length === 0
    ) {
      return null;
    }

    const directCoverage =
      averageKnownValues(
        knownCategories.map(
          category =>
            Number.isFinite(
              category
                .evidenceCoverage
            )
              ? category
                  .evidenceCoverage *
                100
              : null
        )
      );

    return Number.isFinite(
      directCoverage
    )
      ? roundScore(
          directCoverage
        )
      : null;

  }



  function calculateRiskDirectEvidenceScore(
    evaluation
  ) {

    const categories =
      evaluation.risks
        ?.categoryResults;

    if (
      !Array.isArray(
        categories
      ) ||
      categories.length ===
        0
    ) {
      return null;
    }

    const weightedCategories =
      categories.filter(
        category =>
          category.weight > 0
      );

    if (
      weightedCategories.length ===
        0
    ) {
      return null;
    }

    const knownWeight =
      weightedCategories.reduce(
        (
          total,
          category
        ) =>
          total +
          (
            Number.isFinite(
              category
                .rawSafetyScore
            )
              ? category.weight
              : 0
          ),
        0
      );

    const totalWeight =
      weightedCategories.reduce(
        (
          total,
          category
        ) =>
          total +
          category.weight,
        0
      );

    if (
      totalWeight <= 0
    ) {
      return null;
    }

    return roundScore(
      knownWeight /
      totalWeight *
      100
    );

  }



  function calculateDirectEvidenceScore(
    crop,
    answers,
    evaluation
  ) {

    const compatibilityScore =
      calculateCompatibilityDirectEvidenceScore(
        evaluation
      );

    const goalScore =
      calculateGoalDirectEvidenceScore(
        crop,
        answers
      );

    const usePathScore =
      calculateUsePathDirectEvidenceScore(
        evaluation
      );

    const riskScore =
      calculateRiskDirectEvidenceScore(
        evaluation
      );

    const combinedScore =
      averageKnownValues([

        compatibilityScore,

        goalScore,

        usePathScore,

        riskScore

      ]);

    return {

      score:
        Number.isFinite(
          combinedScore
        )
          ? roundScore(
              combinedScore
            )
          : null,

      compatibility:
        compatibilityScore,

      goals:
        goalScore,

      usePaths:
        usePathScore,

      risks:
        riskScore

    };

  }



  /*
    ============================================================
    USE-PATH CONFIDENCE

    Confidence increases when:

      - an eligible best path exists;
      - its evidence coverage is strong;
      - it has a clear lead;
      - more than one practical path remains.

    A close tie is not necessarily bad, but it means the exact
    best-path selection is less certain.
    ============================================================
  */


  function calculateUsePathSelectionConfidence(
    evaluation
  ) {

    const eligiblePaths =
      evaluation.usePaths
        ?.eligiblePaths;

    const bestPath =
      evaluation.usePaths
        ?.bestPath;

    if (
      !Array.isArray(
        eligiblePaths
      ) ||
      eligiblePaths.length ===
        0 ||
      !bestPath
    ) {

      return {

        score:
          10,

        eligiblePathCount:
          0,

        scoreMargin:
          null,

        bestPathCoverage:
          0

      };

    }

    const bestPathCoverage =
      Number.isFinite(
        bestPath.evidenceCoverage
      )
        ? bestPath
            .evidenceCoverage *
          100
        : 0;

    const secondPath =
      eligiblePaths[1];

    const scoreMargin =
      secondPath &&
      Number.isFinite(
        bestPath.score
      ) &&
      Number.isFinite(
        secondPath.score
      )
        ? bestPath.score -
          secondPath.score
        : null;

    let marginScore = 80;

    if (
      Number.isFinite(
        scoreMargin
      )
    ) {

      if (
        scoreMargin >= 15
      ) {
        marginScore = 100;
      } else if (
        scoreMargin >= 10
      ) {
        marginScore = 92;
      } else if (
        scoreMargin >= 6
      ) {
        marginScore = 84;
      } else if (
        scoreMargin >= 3
      ) {
        marginScore = 72;
      } else if (
        scoreMargin >= 1
      ) {
        marginScore = 60;
      } else {
        marginScore = 52;
      }

    }

    const pathBreadthScore =
      eligiblePaths.length >= 4
        ? 100
        : eligiblePaths.length === 3
          ? 92
          : eligiblePaths.length === 2
            ? 82
            : 64;

    const bestPathScoreQuality =
      Number.isFinite(
        bestPath.score
      )
        ? clamp(
            bestPath.score,
            0,
            100
          )
        : 35;

    return {

      score:
        roundScore(
          bestPathCoverage *
            0.42 +
          marginScore *
            0.23 +
          pathBreadthScore *
            0.20 +
          bestPathScoreQuality *
            0.15
        ),

      eligiblePathCount:
        eligiblePaths.length,

      scoreMargin:
        Number.isFinite(
          scoreMargin
        )
          ? roundScore(
              scoreMargin
            )
          : null,

      bestPathCoverage:
        roundScore(
          bestPathCoverage
        )

    };

  }



  /*
    ============================================================
    ELIGIBILITY STABILITY

    Confidence falls when eligibility barely survives several
    warnings or when only limited eligibility evidence exists.
    ============================================================
  */


  function calculateEligibilityConfidence(
    evaluation
  ) {

    const eligibility =
      evaluation.eligibility;

    if (!eligibility) {
      return null;
    }

    if (
      eligibility.eligible ===
        false
    ) {

      /*
        A clearly rejected crop may still have high confidence
        in the rejection when several hard failures are known.
      */

      const failureCount =
        Array.isArray(
          eligibility.hardFailures
        )
          ? eligibility
              .hardFailures
              .length
          : 0;

      return failureCount >= 2
        ? 90
        : 75;

    }

    const hardFailureCount =
      Array.isArray(
        eligibility.hardFailures
      )
        ? eligibility
            .hardFailures
            .length
        : 0;

    const warningCount =
      Array.isArray(
        eligibility.warnings
      )
        ? eligibility
            .warnings
            .length
        : 0;

    let score = 92;

    score -=
      hardFailureCount *
      25;

    score -=
      Math.min(
        warningCount,
        5
      ) *
      5;

    return clamp(
      score,
      30,
      100
    );

  }



  /*
    ============================================================
    CONFIDENCE FACTOR WEIGHTS
    ============================================================
  */


  function getConfidenceFactorWeights() {

    const configuredWeights =
      config.scoring
        ?.engine
        ?.confidenceWeights;

    if (
      configuredWeights &&
      typeof configuredWeights ===
        "object"
    ) {
      return configuredWeights;
    }

    return {

      recordCompleteness:
        0.18,

      criticalFieldCoverage:
        0.15,

      phaseEvidenceCoverage:
        0.18,

      phaseAgreement:
        0.14,

      sourceQuality:
        0.12,

      directEvidence:
        0.10,

      usePathSelection:
        0.08,

      eligibilityStability:
        0.05

    };

  }



  function createConfidenceFactor(
    id,
    label,
    score,
    weight,
    strengthMessage,
    uncertaintyMessage
  ) {

    return {

      id,

      label,

      score:
        Number.isFinite(
          score
        )
          ? clamp(
              score,
              0,
              100
            )
          : null,

      weight:
        Number.isFinite(
          weight
        )
          ? Math.max(
              0,
              weight
            )
          : 0,

      strengthMessage:
        strengthMessage || null,

      uncertaintyMessage:
        uncertaintyMessage || null

    };

  }



  function calculateWeightedConfidenceScore(
    factors
  ) {

    const knownFactors =
      factors.filter(
        factor =>
          Number.isFinite(
            factor.score
          ) &&
          factor.weight > 0
      );

    if (
      knownFactors.length === 0
    ) {
      return null;
    }

    const knownWeight =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    if (
      knownWeight <= 0
    ) {
      return null;
    }

    const weightedScore =
      knownFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.score *
          (
            factor.weight /
            knownWeight
          ),
        0
      );

    return roundScore(
      weightedScore
    );

  }



  function calculateConfidenceFactorCoverage(
    factors
  ) {

    const weightedFactors =
      factors.filter(
        factor =>
          factor.weight > 0
      );

    if (
      weightedFactors.length === 0
    ) {
      return 0;
    }

    const totalWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          factor.weight,
        0
      );

    const knownWeight =
      weightedFactors.reduce(
        (
          total,
          factor
        ) =>
          total +
          (
            Number.isFinite(
              factor.score
            )
              ? factor.weight
              : 0
          ),
        0
      );

    return totalWeight > 0
      ? clamp(
          knownWeight /
          totalWeight,
          0,
          1
        )
      : 0;

  }



  /*
    ============================================================
    CONFIDENCE LEVEL
    ============================================================
  */


  function getConfidenceLevel(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 90
    ) {
      return "very-high";
    }

    if (
      score >= 80
    ) {
      return "high";
    }

    if (
      score >= 68
    ) {
      return "moderate";
    }

    if (
      score >= 55
    ) {
      return "limited";
    }

    if (
      score >= 40
    ) {
      return "low";
    }

    return "very-low";

  }



  function getConfidenceLevelLabel(
    level
  ) {

    const labelMap = {

      "very-high":
        "Very High Confidence",

      "high":
        "High Confidence",

      "moderate":
        "Moderate Confidence",

      "limited":
        "Limited Confidence",

      "low":
        "Low Confidence",

      "very-low":
        "Very Low Confidence",

      "unknown":
        "Unknown Confidence"

    };

    return labelMap[
      level
    ] || level;

  }



  /*
    ============================================================
    CONFIDENCE STRENGTHS AND UNCERTAINTIES
    ============================================================
  */


  function createConfidenceStrengths(
    factors
  ) {

    return factors
      .filter(
        factor =>
          Number.isFinite(
            factor.score
          ) &&
          factor.score >= 78 &&
          factor.strengthMessage
      )
      .sort(
        (
          first,
          second
        ) =>
          second.score -
          first.score
      )
      .slice(
        0,
        6
      )
      .map(
        factor => ({

          id:
            factor.id,

          label:
            factor.label,

          score:
            roundScore(
              factor.score
            ),

          message:
            factor
              .strengthMessage

        })
      );

  }



  function createConfidenceUncertainties(
    factors
  ) {

    return factors
      .filter(
        factor =>
          Number.isFinite(
            factor.score
          ) &&
          factor.score < 68 &&
          factor.uncertaintyMessage
      )
      .sort(
        (
          first,
          second
        ) =>
          first.score -
          second.score
      )
      .slice(
        0,
        8
      )
      .map(
        factor => ({

          id:
            factor.id,

          label:
            factor.label,

          score:
            roundScore(
              factor.score
            ),

          message:
            factor
              .uncertaintyMessage

        })
      );

  }



  function appendMissingFieldUncertainties(
    uncertainties,
    criticalCoverage
  ) {

    const missingFields =
      criticalCoverage
        .missingFields || [];

    missingFields
      .slice(
        0,
        5
      )
      .forEach(
        fieldPath => {

          uncertainties.push({

            id:
              `missing-${fieldPath}`,

            label:
              "Missing Critical Crop Data",

            score:
              0,

            message:
              `The crop record does not currently provide a verified value for ${fieldPath}.`

          });

        }
      );

    if (
      missingFields.length > 5
    ) {

      uncertainties.push({

        id:
          "additional-missing-critical-fields",

        label:
          "Additional Missing Crop Data",

        score:
          0,

        message:
          `${
            missingFields.length -
            5
          } additional critical crop fields are currently unknown.`

      });

    }

  }



  /*
    ============================================================
    CONFIDENCE WARNINGS
    ============================================================
  */


  function createConfidenceWarnings(
    confidence,
    recordCompleteness,
    criticalCoverage,
    phaseEvidence,
    phaseAgreement,
    sourceQuality,
    directEvidence,
    usePathConfidence
  ) {

    const warnings = [];

    if (
      recordCompleteness.score <
        60
    ) {

      warnings.push(
        "The crop record is substantially incomplete, so the recommendation should be treated as provisional."
      );

    }

    if (
      criticalCoverage.score <
        60
    ) {

      warnings.push(
        "Several fields that strongly affect recommendation reliability are unknown."
      );

    }

    if (
      phaseEvidence.score <
        55
    ) {

      warnings.push(
        "The recommendation uses limited visitor-specific evidence."
      );

    }

    if (
      Number.isFinite(
        phaseAgreement.score
      ) &&
      phaseAgreement.score <
        55
    ) {

      warnings.push(
        "Compatibility, goals, use-path practicality, and risk do not agree closely."
      );

    }

    if (
      Number.isFinite(
        sourceQuality.score
      ) &&
      sourceQuality.score <
        55
    ) {

      warnings.push(
        "The crop record has limited source or verification support."
      );

    }

    if (
      Number.isFinite(
        directEvidence.score
      ) &&
      directEvidence.score <
        55
    ) {

      warnings.push(
        "A significant share of the recommendation depends on derived rather than direct crop evidence."
      );

    }

    if (
      usePathConfidence
        .eligiblePathCount ===
        0
    ) {

      warnings.push(
        "No eligible use path supports the recommendation."
      );

    }

    if (
      usePathConfidence
        .eligiblePathCount ===
        1
    ) {

      warnings.push(
        "Only one practical use path remains, which reduces flexibility."
      );

    }

    if (
      Number.isFinite(
        usePathConfidence
          .scoreMargin
      ) &&
      usePathConfidence
        .scoreMargin <
        2
    ) {

      warnings.push(
        "The two strongest use paths are nearly tied, so the exact best-path selection is uncertain."
      );

    }

    if (
      confidence.score !==
        null &&
      confidence.score < 55
    ) {

      warnings.push(
        "Overall recommendation confidence is low."
      );

    }

    return warnings;

  }



  /*
    ============================================================
    CONFIDENCE ORCHESTRATOR
    ============================================================
  */


  function evaluateConfidence(
    crop,
    answers,
    evaluation
  ) {

    const confidence =
      ensureConfidenceEvaluationObject(
        evaluation
      );

    confidence.factorResults =
      [];

    confidence.strengths =
      [];

    confidence.uncertainties =
      [];

    confidence.warnings =
      [];

    confidence.missingSections =
      [];

    const recordCompleteness =
      calculateCropRecordCompleteness(
        crop
      );

    const criticalCoverage =
      inspectCriticalFieldCoverage(
        crop
      );

    const phaseEvidence =
      getPhaseEvidenceCoverage(
        evaluation
      );

    const phaseAgreement =
      calculatePhaseAgreement(
        evaluation
      );

    const sourceQuality =
      calculateSourceQualityScore(
        crop
      );

    const directEvidence =
      calculateDirectEvidenceScore(
        crop,
        answers,
        evaluation
      );

    const usePathConfidence =
      calculateUsePathSelectionConfidence(
        evaluation
      );

    const eligibilityConfidence =
      calculateEligibilityConfidence(
        evaluation
      );

    const weights =
      getConfidenceFactorWeights();

    const factors = [

      createConfidenceFactor(
        "record-completeness",
        "Crop Record Completeness",
        recordCompleteness.score,
        weights.recordCompleteness,
        "The crop record contains strong overall data coverage.",
        "The crop record contains a meaningful number of unknown or incomplete fields."
      ),

      createConfidenceFactor(
        "critical-field-coverage",
        "Critical Field Coverage",
        criticalCoverage.score,
        weights.criticalFieldCoverage,
        "Most critical recommendation fields are known.",
        "Important recommendation fields are missing or unverified."
      ),

      createConfidenceFactor(
        "phase-evidence",
        "Visitor-Specific Evidence Coverage",
        phaseEvidence.score,
        weights.phaseEvidenceCoverage,
        "The recommendation is supported by strong visitor-specific evidence across the scoring phases.",
        "Several scoring phases had limited evidence for this visitor."
      ),

      createConfidenceFactor(
        "phase-agreement",
        "Scoring Phase Agreement",
        phaseAgreement.score,
        weights.phaseAgreement,
        "Compatibility, goal alignment, use-path practicality, and risk generally agree.",
        "The major scoring phases produce conflicting conclusions."
      ),

      createConfidenceFactor(
        "source-quality",
        "Research and Verification Quality",
        sourceQuality.score,
        weights.sourceQuality,
        "The crop record has strong research and verification support.",
        "Source or verification quality is limited."
      ),

      createConfidenceFactor(
        "direct-evidence",
        "Direct Evidence",
        directEvidence.score,
        weights.directEvidence,
        "A large share of the recommendation is supported by direct crop values.",
        "The engine relied substantially on derived values rather than direct measurements."
      ),

      createConfidenceFactor(
        "use-path-selection",
        "Use-Path Selection Confidence",
        usePathConfidence.score,
        weights.usePathSelection,
        "The selected use path is supported by strong evidence and practical alternatives.",
        "The best use path has limited evidence, little flexibility, or an uncertain lead."
      ),

      createConfidenceFactor(
        "eligibility-stability",
        "Eligibility Stability",
        eligibilityConfidence,
        weights.eligibilityStability,
        "The crop's eligibility result is clear and stable.",
        "Eligibility contains warnings or limited supporting evidence."
      )

    ];

    const confidenceScore =
      calculateWeightedConfidenceScore(
        factors
      );

    const confidenceCoverage =
      calculateConfidenceFactorCoverage(
        factors
      );

    confidence.score =
      confidenceScore;

    confidence.level =
      getConfidenceLevel(
        confidenceScore
      );

    confidence.levelLabel =
      getConfidenceLevelLabel(
        confidence.level
      );

    confidence.evidenceCoverage =
      Math.round(
        confidenceCoverage *
        100
      ) /
        100;

    confidence.recordCompleteness =
      recordCompleteness.score;

    confidence.sectionCompleteness =
      recordCompleteness
        .sectionScore;

    confidence.fieldCoverage =
      recordCompleteness
        .fieldCoverage;

    confidence.criticalFieldCoverage =
      criticalCoverage.score;

    confidence.phaseEvidenceCoverage =
      phaseEvidence.score;

    confidence.phaseAgreement =
      phaseAgreement.score;

    confidence.sourceQuality =
      sourceQuality.score;

    confidence.directEvidenceScore =
      directEvidence.score;

    confidence.usePathSelectionConfidence =
      usePathConfidence.score;

    confidence.eligibilityConfidence =
      eligibilityConfidence;

    confidence.unknownValueRate =
      Math.round(
        recordCompleteness
          .unknownValueRate *
        100
      ) /
        100;

    confidence.missingSections =
      recordCompleteness
        .missingSections;

    confidence.missingCriticalFields =
      criticalCoverage
        .missingFields;

    confidence.phaseScores =
      phaseAgreement
        .phaseScores;

    confidence.phaseScoreRange =
      phaseAgreement.range;

    confidence.phaseStandardDeviation =
      phaseAgreement
        .standardDeviation;

    confidence.sourceCount =
      sourceQuality
        .sourceCount;

    confidence.directEvidenceBreakdown =
      directEvidence;

    confidence.usePathConfidenceDetails =
      usePathConfidence;

    confidence.recordCoverageDetails =
      recordCompleteness;

    confidence.criticalCoverageDetails =
      criticalCoverage;

    confidence.phaseEvidenceDetails =
      phaseEvidence;

    confidence.sourceQualityDetails =
      sourceQuality;

    confidence.factorResults =
      factors;

    confidence.strengths =
      createConfidenceStrengths(
        factors
      );

    confidence.uncertainties =
      createConfidenceUncertainties(
        factors
      );

    appendMissingFieldUncertainties(
      confidence.uncertainties,
      criticalCoverage
    );

    confidence.warnings =
      createConfidenceWarnings(
        confidence,
        recordCompleteness,
        criticalCoverage,
        phaseEvidence,
        phaseAgreement,
        sourceQuality,
        directEvidence,
        usePathConfidence
      );

    return confidence;

  }

    /*
    ============================================================
    PHASE 7
    FINAL SCORING AND RANKING

    This phase combines:

      - compatibility;
      - goal alignment;
      - use-path practicality;
      - risk adjustment;
      - confidence-aware ranking;
      - eligibility status.

    The final suitability score remains separate from the
    confidence score.

    The engine produces:

      suitabilityScore
        The crop's practical fit for this visitor.

      rankingScore
        A confidence-aware value used to order crops that have
        similar suitability.

      confidenceScore
        How strongly the engine trusts the result.

    Confidence is not allowed to transform a weak crop into a
    strong crop. It is used only as a restrained ranking and
    stability modifier.
    ============================================================
  */


  /*
    ============================================================
    FINAL EVALUATION OBJECT
    ============================================================
  */


  function ensureFinalEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.final ||
      typeof evaluation.final !==
        "object"
    ) {

      evaluation.final = {};

    }

    const final =
      evaluation.final;

    final.score =
      Number.isFinite(
        final.score
      )
        ? final.score
        : null;

    final.baseScore =
      Number.isFinite(
        final.baseScore
      )
        ? final.baseScore
        : null;

    final.rankingScore =
      Number.isFinite(
        final.rankingScore
      )
        ? final.rankingScore
        : null;

    final.riskAdjustment =
      Number.isFinite(
        final.riskAdjustment
      )
        ? final.riskAdjustment
        : 0;

    final.confidenceAdjustment =
      Number.isFinite(
        final.confidenceAdjustment
      )
        ? final.confidenceAdjustment
        : 0;

    final.eligibilityAdjustment =
      Number.isFinite(
        final.eligibilityAdjustment
      )
        ? final.eligibilityAdjustment
        : 0;

    final.scoreBand =
      typeof final.scoreBand ===
        "string"
        ? final.scoreBand
        : "unknown";

    final.scoreBandLabel =
      typeof final.scoreBandLabel ===
        "string"
        ? final.scoreBandLabel
        : "Unknown";

    final.recommendationStatus =
      typeof final.recommendationStatus ===
        "string"
        ? final.recommendationStatus
        : "unscored";

    final.rankingTier =
      typeof final.rankingTier ===
        "string"
        ? final.rankingTier
        : "unranked";

    final.rank =
      Number.isFinite(
        final.rank
      )
        ? final.rank
        : null;

    final.tieGroup =
      Number.isFinite(
        final.tieGroup
      )
        ? final.tieGroup
        : null;

    final.scoreComponents =
      final.scoreComponents &&
      typeof final.scoreComponents ===
        "object"
        ? final.scoreComponents
        : {};

    final.stability =
      final.stability &&
      typeof final.stability ===
        "object"
        ? final.stability
        : {};

    final.warnings =
      Array.isArray(
        final.warnings
      )
        ? final.warnings
        : [];

    final.flags =
      Array.isArray(
        final.flags
      )
        ? final.flags
        : [];

    return final;

  }



  /*
    ============================================================
    FINAL SCORE WEIGHTS
    ============================================================
  */


  function getFinalScoreWeights() {

    const configuredWeights =
      config.scoring
        ?.engine
        ?.finalScoreWeights;

    if (
      configuredWeights &&
      typeof configuredWeights ===
        "object"
    ) {
      return configuredWeights;
    }

    return {

      compatibility:
        0.43,

      goals:
        0.29,

      usePaths:
        0.28

    };

  }



  /*
    ============================================================
    SCORE COMPONENT OBJECT
    ============================================================
  */


  function createFinalScoreComponent(
    id,
    label,
    score,
    weight,
    evidenceCoverage
  ) {

    return {

      id,

      label,

      score:
        Number.isFinite(
          score
        )
          ? clamp(
              score,
              0,
              100
            )
          : null,

      weight:
        Number.isFinite(
          weight
        )
          ? Math.max(
              0,
              weight
            )
          : 0,

      evidenceCoverage:
        Number.isFinite(
          evidenceCoverage
        )
          ? clamp(
              evidenceCoverage,
              0,
              1
            )
          : null,

      weightedContribution:
        null,

      normalizedWeight:
        null

    };

  }



  function getFinalScoreComponents(
    evaluation
  ) {

    const weights =
      getFinalScoreWeights();

    return [

      createFinalScoreComponent(
        "compatibility",
        "Growing Compatibility",
        evaluation.compatibility
          ?.score,
        weights.compatibility,
        evaluation.compatibility
          ?.evidenceCoverage
      ),

      createFinalScoreComponent(
        "goals",
        "Goal Alignment",
        evaluation.goals
          ?.score,
        weights.goals,
        evaluation.goals
          ?.evidenceCoverage
      ),

      createFinalScoreComponent(
        "usePaths",
        "Use-Path Practicality",
        evaluation.usePaths
          ?.score,
        weights.usePaths,
        evaluation.usePaths
          ?.evidenceCoverage
      )

    ];

  }



  /*
    ============================================================
    BASE SUITABILITY SCORE

    Unknown phases are not treated as zero.

    Known phase weights are renormalized so that a missing phase
    does not automatically destroy the score.

    Missing evidence is handled through confidence rather than
    through an artificial zero.
    ============================================================
  */


  function calculateFinalBaseScore(
    components
  ) {

    const knownComponents =
      components.filter(
        component =>
          Number.isFinite(
            component.score
          ) &&
          component.weight > 0
      );

    if (
      knownComponents.length === 0
    ) {
      return null;
    }

    const knownWeight =
      knownComponents.reduce(
        (
          total,
          component
        ) =>
          total +
          component.weight,
        0
      );

    if (
      knownWeight <= 0
    ) {
      return null;
    }

    knownComponents.forEach(
      component => {

        component.normalizedWeight =
          component.weight /
          knownWeight;

        component.weightedContribution =
          component.score *
          component.normalizedWeight;

      }
    );

    return roundScore(
      knownComponents.reduce(
        (
          total,
          component
        ) =>
          total +
          component.weightedContribution,
        0
      )
    );

  }



  /*
    ============================================================
    ELIGIBILITY STATUS
    ============================================================
  */


  function isCropEligible(
    evaluation
  ) {

    return (
      evaluation.eligibility
        ?.eligible !==
          false
    );

  }



  function getEligibilityHardFailureCount(
    evaluation
  ) {

    const hardFailures =
      evaluation.eligibility
        ?.hardFailures;

    return Array.isArray(
      hardFailures
    )
      ? hardFailures.length
      : 0;

  }



  function getEligibilityWarningCount(
    evaluation
  ) {

    const warnings =
      evaluation.eligibility
        ?.warnings;

    return Array.isArray(
      warnings
    )
      ? warnings.length
      : 0;

  }



  /*
    ============================================================
    ELIGIBILITY ADJUSTMENT

    A hard-ineligible crop does not compete with eligible crops.

    Its diagnostic suitability score may still be retained so
    developers can see whether the crop was otherwise strong.

    Eligible crops receive only small caution penalties for
    unresolved eligibility warnings.
    ============================================================
  */


  function calculateEligibilityAdjustment(
    evaluation
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return 0;
    }

    const warningCount =
      getEligibilityWarningCount(
        evaluation
      );

    if (
      warningCount <= 0
    ) {
      return 0;
    }

    return -Math.min(
      warningCount * 0.7,
      3.5
    );

  }



  /*
    ============================================================
    RISK ADJUSTMENT ACCESS
    ============================================================
  */


  function getFinalRiskAdjustment(
    evaluation
  ) {

    const adjustment =
      evaluation.risks
        ?.adjustment;

    if (
      !Number.isFinite(
        adjustment
      )
    ) {
      return 0;
    }

    return clamp(
      adjustment,
      -12,
      0
    );

  }



  /*
    ============================================================
    FINAL SUITABILITY SCORE

    Suitability includes:

      base score
      risk adjustment
      limited eligibility-warning adjustment

    Confidence is not included in this score.
    ============================================================
  */


  function calculateFinalSuitabilityScore(
    baseScore,
    riskAdjustment,
    eligibilityAdjustment
  ) {

    if (
      !Number.isFinite(
        baseScore
      )
    ) {
      return null;
    }

    return roundScore(
      clamp(
        baseScore +
        (
          Number.isFinite(
            riskAdjustment
          )
            ? riskAdjustment
            : 0
        ) +
        (
          Number.isFinite(
            eligibilityAdjustment
          )
            ? eligibilityAdjustment
            : 0
        ),
        0,
        100
      )
    );

  }



  /*
    ============================================================
    CONFIDENCE-AWARE RANKING ADJUSTMENT

    Confidence affects ranking only within a narrow range.

    It may:

      reward well-supported results slightly;
      reduce weakly supported results slightly;
      help break close suitability ties.

    It may not:

      add more than 2.5 points;
      subtract more than 4 points;
      override hard eligibility;
      rescue a fundamentally weak crop.
    ============================================================
  */


  function calculateConfidenceRankingAdjustment(
    evaluation
  ) {

    const confidenceScore =
      evaluation.confidence
        ?.score;

    if (
      !Number.isFinite(
        confidenceScore
      )
    ) {
      return -2;
    }

    if (
      confidenceScore >= 92
    ) {
      return 2.5;
    }

    if (
      confidenceScore >= 85
    ) {
      return 1.8;
    }

    if (
      confidenceScore >= 78
    ) {
      return 1.0;
    }

    if (
      confidenceScore >= 68
    ) {
      return 0.3;
    }

    if (
      confidenceScore >= 58
    ) {
      return -0.8;
    }

    if (
      confidenceScore >= 48
    ) {
      return -1.8;
    }

    if (
      confidenceScore >= 38
    ) {
      return -2.8;
    }

    return -4;

  }



  /*
    ============================================================
    HIGH-CONFIDENCE REJECTION HANDLING

    A crop rejected for a clear hard failure should remain
    excluded even when its diagnostic score is high.

    The confidence score may indicate that the rejection itself
    is reliable.
    ============================================================
  */


  function calculateRejectedCropRankingScore(
    evaluation
  ) {

    const hardFailureCount =
      getEligibilityHardFailureCount(
        evaluation
      );

    const confidenceScore =
      evaluation.confidence
        ?.score;

    const confidenceTerm =
      Number.isFinite(
        confidenceScore
      )
        ? confidenceScore /
          100
        : 0.5;

    /*
      Rejected crops are placed below all eligible crops.

      The small internal variation keeps rejected results
      deterministic for diagnostic reports.
    */

    return roundScore(
      clamp(
        8 -
        hardFailureCount *
          1.5 +
        confidenceTerm,
        0,
        9
      )
    );

  }



  /*
    ============================================================
    RANKING SCORE

    Eligible crops generally occupy the range 10–102.5.

    Rejected crops remain below 10.
    ============================================================
  */


  function calculateFinalRankingScore(
    evaluation,
    suitabilityScore,
    confidenceAdjustment
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {

      return calculateRejectedCropRankingScore(
        evaluation
      );

    }

    if (
      !Number.isFinite(
        suitabilityScore
      )
    ) {
      return null;
    }

    return roundScore(
      clamp(
        suitabilityScore +
        confidenceAdjustment,
        0,
        102.5
      )
    );

  }



  /*
    ============================================================
    SCORE BANDS
    ============================================================
  */


  function getFinalScoreBand(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 90
    ) {
      return "exceptional";
    }

    if (
      score >= 82
    ) {
      return "excellent";
    }

    if (
      score >= 74
    ) {
      return "very-good";
    }

    if (
      score >= 65
    ) {
      return "good";
    }

    if (
      score >= 55
    ) {
      return "workable";
    }

    if (
      score >= 45
    ) {
      return "marginal";
    }

    if (
      score >= 32
    ) {
      return "weak";
    }

    return "poor";

  }



  function getFinalScoreBandLabel(
    scoreBand
  ) {

    const labelMap = {

      exceptional:
        "Exceptional Fit",

      excellent:
        "Excellent Fit",

      "very-good":
        "Very Good Fit",

      good:
        "Good Fit",

      workable:
        "Workable Fit",

      marginal:
        "Marginal Fit",

      weak:
        "Weak Fit",

      poor:
        "Poor Fit",

      unknown:
        "Unknown Fit"

    };

    return labelMap[
      scoreBand
    ] || scoreBand;

  }



  /*
    ============================================================
    RECOMMENDATION STATUS
    ============================================================
  */


  function getRecommendationStatus(
    evaluation,
    suitabilityScore
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return "rejected";
    }

    if (
      !evaluation.usePaths
        ?.bestPath
    ) {
      return "no-practical-use-path";
    }

    if (
      !Number.isFinite(
        suitabilityScore
      )
    ) {
      return "insufficient-data";
    }

    if (
      suitabilityScore >= 82
    ) {
      return "top-recommendation";
    }

    if (
      suitabilityScore >= 70
    ) {
      return "strong-recommendation";
    }

    if (
      suitabilityScore >= 58
    ) {
      return "conditional-recommendation";
    }

    if (
      suitabilityScore >= 45
    ) {
      return "low-priority";
    }

    return "not-recommended";

  }



  function getRecommendationStatusLabel(
    status
  ) {

    const labelMap = {

      "top-recommendation":
        "Top Recommendation",

      "strong-recommendation":
        "Strong Recommendation",

      "conditional-recommendation":
        "Conditional Recommendation",

      "low-priority":
        "Low-Priority Option",

      "not-recommended":
        "Not Recommended",

      rejected:
        "Ineligible",

      "no-practical-use-path":
        "No Practical Use Path",

      "insufficient-data":
        "Insufficient Data",

      unscored:
        "Not Yet Scored"

    };

    return labelMap[
      status
    ] || status;

  }



  /*
    ============================================================
    RANKING TIERS

    Ranking tiers are broader than score bands.

    They support UI grouping and recommendation displays.
    ============================================================
  */


  function getRankingTier(
    evaluation,
    suitabilityScore,
    confidenceScore
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return "excluded";
    }

    if (
      !evaluation.usePaths
        ?.bestPath
    ) {
      return "unsupported";
    }

    if (
      !Number.isFinite(
        suitabilityScore
      )
    ) {
      return "unscored";
    }

    const confidence =
      Number.isFinite(
        confidenceScore
      )
        ? confidenceScore
        : 0;

    if (
      suitabilityScore >= 84 &&
      confidence >= 68
    ) {
      return "tier-1";
    }

    if (
      suitabilityScore >= 72
    ) {
      return "tier-2";
    }

    if (
      suitabilityScore >= 58
    ) {
      return "tier-3";
    }

    if (
      suitabilityScore >= 44
    ) {
      return "tier-4";
    }

    return "tier-5";

  }



  function getRankingTierLabel(
    rankingTier
  ) {

    const labelMap = {

      "tier-1":
        "Primary Recommendations",

      "tier-2":
        "Strong Alternatives",

      "tier-3":
        "Conditional Options",

      "tier-4":
        "Low-Priority Options",

      "tier-5":
        "Poor Matches",

      excluded:
        "Ineligible Crops",

      unsupported:
        "No Practical Use Path",

      unscored:
        "Unscored Crops",

      unranked:
        "Unranked"

    };

    return labelMap[
      rankingTier
    ] || rankingTier;

  }



  /*
    ============================================================
    FINAL FLAGS
    ============================================================
  */


  function createFinalFlags(
    evaluation,
    suitabilityScore
  ) {

    const flags = [];

    if (
      !isCropEligible(
        evaluation
      )
    ) {

      flags.push(
        "hard-ineligible"
      );

    }

    if (
      !evaluation.usePaths
        ?.bestPath
    ) {

      flags.push(
        "no-eligible-use-path"
      );

    }

    if (
      Number.isFinite(
        evaluation.confidence
          ?.score
      ) &&
      evaluation.confidence
        .score < 55
    ) {

      flags.push(
        "low-confidence"
      );

    }

    if (
      Number.isFinite(
        evaluation.confidence
          ?.score
      ) &&
      evaluation.confidence
        .score >= 85
    ) {

      flags.push(
        "high-confidence"
      );

    }

    if (
      Number.isFinite(
        evaluation.risks
          ?.score
      ) &&
      evaluation.risks
        .score < 50
    ) {

      flags.push(
        "high-risk"
      );

    }

    if (
      evaluation.risks
        ?.primaryRisks
        ?.length >= 3
    ) {

      flags.push(
        "multiple-primary-risks"
      );

    }

    if (
      evaluation.goals
        ?.weakGoals
        ?.some(
          goal =>
            goal.weight >=
              0.84
        )
    ) {

      flags.push(
        "weak-top-priority-goal"
      );

    }

    if (
      evaluation.usePaths
        ?.eligiblePaths
        ?.length === 1
    ) {

      flags.push(
        "single-use-path"
      );

    }

    if (
      evaluation.usePaths
        ?.eligiblePaths
        ?.length >= 3
    ) {

      flags.push(
        "use-path-flexibility"
      );

    }

    if (
      Number.isFinite(
        suitabilityScore
      ) &&
      suitabilityScore >= 82 &&
      Number.isFinite(
        evaluation.confidence
          ?.score
      ) &&
      evaluation.confidence
        .score < 60
    ) {

      flags.push(
        "high-score-limited-confidence"
      );

    }

    if (
      Number.isFinite(
        suitabilityScore
      ) &&
      suitabilityScore < 55 &&
      Number.isFinite(
        evaluation.confidence
          ?.score
      ) &&
      evaluation.confidence
        .score >= 80
    ) {

      flags.push(
        "confident-poor-fit"
      );

    }

    return flags;

  }



  /*
    ============================================================
    FINAL WARNINGS
    ============================================================
  */


  function createFinalWarnings(
    evaluation,
    suitabilityScore
  ) {

    const warnings = [];

    if (
      !isCropEligible(
        evaluation
      )
    ) {

      warnings.push(
        "This crop failed at least one hard eligibility requirement and is excluded from normal recommendation ranking."
      );

    }

    if (
      isCropEligible(
        evaluation
      ) &&
      !evaluation.usePaths
        ?.bestPath
    ) {

      warnings.push(
        "The crop may be growable, but no practical harvest, processing, storage, and feeding pathway remains."
      );

    }

    if (
      Number.isFinite(
        suitabilityScore
      ) &&
      suitabilityScore >= 75 &&
      evaluation.confidence
        ?.score < 55
    ) {

      warnings.push(
        "The crop has a strong calculated fit, but recommendation confidence is limited."
      );

    }

    if (
      Number.isFinite(
        suitabilityScore
      ) &&
      suitabilityScore < 55 &&
      evaluation.confidence
        ?.score >= 80
    ) {

      warnings.push(
        "The engine has strong evidence that this crop is a weak fit for the selected conditions."
      );

    }

    if (
      evaluation.risks
        ?.adjustment <= -7
    ) {

      warnings.push(
        "Practical risks substantially reduce the crop's final suitability."
      );

    }

    if (
      evaluation.goals
        ?.weakGoals
        ?.some(
          goal =>
            goal.weight >=
              0.84
        )
    ) {

      warnings.push(
        "The crop is weak for at least one of the visitor's highest-priority goals."
      );

    }

    if (
      evaluation.compatibility
        ?.weakestCategories
        ?.some(
          category =>
            category.score < 45
        )
    ) {

      warnings.push(
        "At least one major growing-compatibility category is a poor match."
      );

    }

    if (
      evaluation.usePaths
        ?.bestPath &&
      evaluation.usePaths
        .bestPath.score < 55
    ) {

      warnings.push(
        "The selected use path is only marginally practical."
      );

    }

    return warnings;

  }



  /*
    ============================================================
    PRELIMINARY RANK STABILITY

    This assesses the internal stability of one crop's score
    before the crop is compared with other records.

    Cross-crop margin stability is added later by the collection
    ranking functions.
    ============================================================
  */


  function calculateInternalRankingStability(
    evaluation,
    final
  ) {

    const confidenceScore =
      evaluation.confidence
        ?.score;

    const phaseAgreement =
      evaluation.confidence
        ?.phaseAgreement;

    const evidenceCoverage =
      evaluation.confidence
        ?.evidenceCoverage;

    const usePathMargin =
      evaluation.confidence
        ?.usePathConfidenceDetails
        ?.scoreMargin;

    const confidenceTerm =
      Number.isFinite(
        confidenceScore
      )
        ? confidenceScore
        : 35;

    const agreementTerm =
      Number.isFinite(
        phaseAgreement
      )
        ? phaseAgreement
        : 35;

    const coverageTerm =
      Number.isFinite(
        evidenceCoverage
      )
        ? evidenceCoverage *
          100
        : 35;

    let pathMarginTerm = 65;

    if (
      Number.isFinite(
        usePathMargin
      )
    ) {

      if (
        usePathMargin >= 10
      ) {
        pathMarginTerm = 100;
      } else if (
        usePathMargin >= 6
      ) {
        pathMarginTerm = 88;
      } else if (
        usePathMargin >= 3
      ) {
        pathMarginTerm = 74;
      } else if (
        usePathMargin >= 1
      ) {
        pathMarginTerm = 60;
      } else {
        pathMarginTerm = 48;
      }

    }

    let score =
      confidenceTerm *
        0.38 +
      agreementTerm *
        0.27 +
      coverageTerm *
        0.20 +
      pathMarginTerm *
        0.15;

    if (
      final.flags.includes(
        "high-score-limited-confidence"
      )
    ) {
      score -= 12;
    }

    if (
      final.flags.includes(
        "no-eligible-use-path"
      )
    ) {
      score -= 25;
    }

    if (
      final.flags.includes(
        "hard-ineligible"
      )
    ) {
      score =
        Math.max(
          score,
          70
        );
    }

    score =
      clamp(
        score,
        0,
        100
      );

    return {

      score:
        roundScore(
          score
        ),

      level:
        getRankingStabilityLevel(
          score
        ),

      levelLabel:
        getRankingStabilityLabel(
          getRankingStabilityLevel(
            score
          )
        ),

      internalScore:
        roundScore(
          score
        ),

      collectionMarginScore:
        null,

      nearestCompetitorMargin:
        null,

      rankMovementRisk:
        null

    };

  }



  function getRankingStabilityLevel(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 88
    ) {
      return "very-stable";
    }

    if (
      score >= 76
    ) {
      return "stable";
    }

    if (
      score >= 62
    ) {
      return "moderate";
    }

    if (
      score >= 48
    ) {
      return "sensitive";
    }

    return "unstable";

  }



  function getRankingStabilityLabel(
    level
  ) {

    const labelMap = {

      "very-stable":
        "Very Stable Ranking",

      stable:
        "Stable Ranking",

      moderate:
        "Moderately Stable Ranking",

      sensitive:
        "Ranking Sensitive to Missing Data",

      unstable:
        "Unstable Ranking",

      unknown:
        "Unknown Ranking Stability"

    };

    return labelMap[
      level
    ] || level;

  }



  /*
    ============================================================
    FINAL SCORE ORCHESTRATOR
    ============================================================
  */


  function evaluateFinalScore(
    crop,
    answers,
    evaluation
  ) {

    const final =
      ensureFinalEvaluationObject(
        evaluation
      );

    final.warnings =
      [];

    final.flags =
      [];

    const components =
      getFinalScoreComponents(
        evaluation
      );

    const baseScore =
      calculateFinalBaseScore(
        components
      );

    const riskAdjustment =
      getFinalRiskAdjustment(
        evaluation
      );

    const eligibilityAdjustment =
      calculateEligibilityAdjustment(
        evaluation
      );

    const suitabilityScore =
      calculateFinalSuitabilityScore(
        baseScore,
        riskAdjustment,
        eligibilityAdjustment
      );

    const confidenceAdjustment =
      calculateConfidenceRankingAdjustment(
        evaluation
      );

    const rankingScore =
      calculateFinalRankingScore(
        evaluation,
        suitabilityScore,
        confidenceAdjustment
      );

    const scoreBand =
      getFinalScoreBand(
        suitabilityScore
      );

    const recommendationStatus =
      getRecommendationStatus(
        evaluation,
        suitabilityScore
      );

    const confidenceScore =
      evaluation.confidence
        ?.score;

    const rankingTier =
      getRankingTier(
        evaluation,
        suitabilityScore,
        confidenceScore
      );

    final.baseScore =
      baseScore;

    final.score =
      suitabilityScore;

    final.suitabilityScore =
      suitabilityScore;

    final.rankingScore =
      rankingScore;

    final.riskAdjustment =
      riskAdjustment;

    final.confidenceAdjustment =
      confidenceAdjustment;

    final.eligibilityAdjustment =
      eligibilityAdjustment;

    final.scoreBand =
      scoreBand;

    final.scoreBandLabel =
      getFinalScoreBandLabel(
        scoreBand
      );

    final.recommendationStatus =
      recommendationStatus;

    final.recommendationStatusLabel =
      getRecommendationStatusLabel(
        recommendationStatus
      );

    final.rankingTier =
      rankingTier;

    final.rankingTierLabel =
      getRankingTierLabel(
        rankingTier
      );

    final.scoreComponents =
      components.reduce(
        (
          result,
          component
        ) => {

          result[
            component.id
          ] = component;

          return result;

        },
        {}
      );

    final.flags =
      createFinalFlags(
        evaluation,
        suitabilityScore
      );

    final.warnings =
      createFinalWarnings(
        evaluation,
        suitabilityScore
      );

    final.stability =
      calculateInternalRankingStability(
        evaluation,
        final
      );

    final.bestUsePathId =
      evaluation.usePaths
        ?.bestPath
        ?.id ??
      null;

    final.bestUsePathLabel =
      evaluation.usePaths
        ?.bestPath
        ?.label ??
      null;

    final.confidenceScore =
      Number.isFinite(
        confidenceScore
      )
        ? confidenceScore
        : null;

    final.confidenceLevel =
      evaluation.confidence
        ?.level ??
      "unknown";

    final.riskScore =
      evaluation.risks
        ?.score ??
      null;

    final.eligible =
      isCropEligible(
        evaluation
      );

    return final;

  }



  /*
    ============================================================
    CROP IDENTITY HELPERS FOR RANKING
    ============================================================
  */


  function getEvaluationCropId(
    evaluation
  ) {

    return (

      evaluation.cropId ??

      evaluation.identity
        ?.id ??

      evaluation.crop
        ?.id ??

      evaluation.crop
        ?.identity
        ?.id ??

      null

    );

  }



  function getEvaluationCropLabel(
    evaluation
  ) {

    return (

      evaluation.cropLabel ??

      evaluation.cropName ??

      evaluation.identity
        ?.commonName ??

      evaluation.identity
        ?.name ??

      evaluation.crop
        ?.label ??

      evaluation.crop
        ?.name ??

      getEvaluationCropId(
        evaluation
      ) ??

      "Unnamed Crop"

    );

  }



  /*
    ============================================================
    RANKING COMPARATOR

    Ordering rules:

      1. eligible crops before rejected crops;
      2. crops with practical use paths before unsupported crops;
      3. ranking score;
      4. suitability score;
      5. confidence;
      6. risk safety;
      7. evidence coverage;
      8. crop label for deterministic ordering.
    ============================================================
  */


  function compareCropEvaluations(
    first,
    second
  ) {

    const firstEligible =
      isCropEligible(
        first
      );

    const secondEligible =
      isCropEligible(
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

    const firstHasPath =
      Boolean(
        first.usePaths
          ?.bestPath
      );

    const secondHasPath =
      Boolean(
        second.usePaths
          ?.bestPath
      );

    if (
      firstHasPath !==
      secondHasPath
    ) {
      return firstHasPath
        ? -1
        : 1;
    }

    const firstRankingScore =
      Number.isFinite(
        first.final
          ?.rankingScore
      )
        ? first.final
            .rankingScore
        : -Infinity;

    const secondRankingScore =
      Number.isFinite(
        second.final
          ?.rankingScore
      )
        ? second.final
            .rankingScore
        : -Infinity;

    const rankingDifference =
      secondRankingScore -
      firstRankingScore;

    if (
      Math.abs(
        rankingDifference
      ) >= 0.05
    ) {
      return rankingDifference;
    }

    const firstSuitability =
      Number.isFinite(
        first.final
          ?.score
      )
        ? first.final.score
        : -Infinity;

    const secondSuitability =
      Number.isFinite(
        second.final
          ?.score
      )
        ? second.final.score
        : -Infinity;

    const suitabilityDifference =
      secondSuitability -
      firstSuitability;

    if (
      Math.abs(
        suitabilityDifference
      ) >= 0.05
    ) {
      return suitabilityDifference;
    }

    const firstConfidence =
      Number.isFinite(
        first.confidence
          ?.score
      )
        ? first.confidence
            .score
        : -Infinity;

    const secondConfidence =
      Number.isFinite(
        second.confidence
          ?.score
      )
        ? second.confidence
            .score
        : -Infinity;

    const confidenceDifference =
      secondConfidence -
      firstConfidence;

    if (
      Math.abs(
        confidenceDifference
      ) >= 0.05
    ) {
      return confidenceDifference;
    }

    const firstRisk =
      Number.isFinite(
        first.risks?.score
      )
        ? first.risks.score
        : -Infinity;

    const secondRisk =
      Number.isFinite(
        second.risks?.score
      )
        ? second.risks.score
        : -Infinity;

    const riskDifference =
      secondRisk -
      firstRisk;

    if (
      Math.abs(
        riskDifference
      ) >= 0.05
    ) {
      return riskDifference;
    }

    const firstCoverage =
      Number.isFinite(
        first.confidence
          ?.evidenceCoverage
      )
        ? first.confidence
            .evidenceCoverage
        : -Infinity;

    const secondCoverage =
      Number.isFinite(
        second.confidence
          ?.evidenceCoverage
      )
        ? second.confidence
            .evidenceCoverage
        : -Infinity;

    const coverageDifference =
      secondCoverage -
      firstCoverage;

    if (
      Math.abs(
        coverageDifference
      ) >= 0.001
    ) {
      return coverageDifference;
    }

    return String(
      getEvaluationCropLabel(
        first
      )
    ).localeCompare(
      String(
        getEvaluationCropLabel(
          second
        )
      )
    );

  }



  /*
    ============================================================
    TIE GROUPS

    Crops are placed in the same tie group when their ranking
    scores are effectively equal.

    Rank numbers use competition ranking:

      1
      2
      2
      4
    ============================================================
  */


  function areEvaluationsEffectivelyTied(
    first,
    second
  ) {

    const firstScore =
      first.final
        ?.rankingScore;

    const secondScore =
      second.final
        ?.rankingScore;

    if (
      !Number.isFinite(
        firstScore
      ) ||
      !Number.isFinite(
        secondScore
      )
    ) {
      return false;
    }

    const rankingDifference =
      Math.abs(
        firstScore -
        secondScore
      );

    const suitabilityDifference =
      Math.abs(
        (
          first.final
            ?.score ??
          0
        ) -
        (
          second.final
            ?.score ??
          0
        )
      );

    return (
      rankingDifference < 0.35 &&
      suitabilityDifference < 0.75
    );

  }



  function assignRanksAndTieGroups(
    sortedEvaluations
  ) {

    let currentRank = 1;
    let currentTieGroup = 1;

    sortedEvaluations.forEach(
      (
        evaluation,
        index
      ) => {

        if (
          index === 0
        ) {

          evaluation.final.rank =
            1;

          evaluation.final.tieGroup =
            currentTieGroup;

          return;

        }

        const previousEvaluation =
          sortedEvaluations[
            index - 1
          ];

        if (
          areEvaluationsEffectivelyTied(
            previousEvaluation,
            evaluation
          )
        ) {

          evaluation.final.rank =
            previousEvaluation
              .final.rank;

          evaluation.final.tieGroup =
            previousEvaluation
              .final.tieGroup;

          return;

        }

        currentRank =
          index + 1;

        currentTieGroup +=
          1;

        evaluation.final.rank =
          currentRank;

        evaluation.final.tieGroup =
          currentTieGroup;

      }
    );

    return sortedEvaluations;

  }



  /*
    ============================================================
    COLLECTION MARGIN STABILITY

    After sorting, ranking stability is refined using the score
    distance from neighboring crops.

    A large margin indicates that small data changes are unlikely
    to change the crop's position.

    A very small margin indicates that minor scoring changes
    could reorder nearby crops.
    ============================================================
  */


  function getNearestCompetitorMargin(
    sortedEvaluations,
    index
  ) {

    const currentEvaluation =
      sortedEvaluations[
        index
      ];

    const currentScore =
      currentEvaluation.final
        ?.rankingScore;

    if (
      !Number.isFinite(
        currentScore
      )
    ) {
      return null;
    }

    const margins = [];

    const previousEvaluation =
      sortedEvaluations[
        index - 1
      ];

    const nextEvaluation =
      sortedEvaluations[
        index + 1
      ];

    if (
      previousEvaluation &&
      Number.isFinite(
        previousEvaluation
          .final
          ?.rankingScore
      )
    ) {

      margins.push(
        Math.abs(
          previousEvaluation
            .final
            .rankingScore -
          currentScore
        )
      );

    }

    if (
      nextEvaluation &&
      Number.isFinite(
        nextEvaluation
          .final
          ?.rankingScore
      )
    ) {

      margins.push(
        Math.abs(
          currentScore -
          nextEvaluation
            .final
            .rankingScore
        )
      );

    }

    if (
      margins.length === 0
    ) {
      return null;
    }

    return Math.min(
      ...margins
    );

  }



  function convertRankingMarginToStabilityScore(
    margin
  ) {

    if (
      !Number.isFinite(
        margin
      )
    ) {
      return 75;
    }

    if (
      margin >= 12
    ) {
      return 100;
    }

    if (
      margin >= 8
    ) {
      return 94;
    }

    if (
      margin >= 5
    ) {
      return 86;
    }

    if (
      margin >= 3
    ) {
      return 76;
    }

    if (
      margin >= 1.5
    ) {
      return 65;
    }

    if (
      margin >= 0.75
    ) {
      return 55;
    }

    if (
      margin >= 0.35
    ) {
      return 45;
    }

    return 35;

  }



  function getRankMovementRisk(
    stabilityScore
  ) {

    if (
      !Number.isFinite(
        stabilityScore
      )
    ) {
      return "unknown";
    }

    if (
      stabilityScore >= 85
    ) {
      return "low";
    }

    if (
      stabilityScore >= 68
    ) {
      return "moderate";
    }

    if (
      stabilityScore >= 52
    ) {
      return "elevated";
    }

    return "high";

  }



  function refineCollectionRankingStability(
    sortedEvaluations
  ) {

    sortedEvaluations.forEach(
      (
        evaluation,
        index
      ) => {

        const final =
          ensureFinalEvaluationObject(
            evaluation
          );

        const internalScore =
          Number.isFinite(
            final.stability
              ?.internalScore
          )
            ? final.stability
                .internalScore
            : 50;

        const nearestMargin =
          getNearestCompetitorMargin(
            sortedEvaluations,
            index
          );

        const marginScore =
          convertRankingMarginToStabilityScore(
            nearestMargin
          );

        const combinedScore =
          roundScore(
            internalScore *
              0.68 +
            marginScore *
              0.32
          );

        const stabilityLevel =
          getRankingStabilityLevel(
            combinedScore
          );

        final.stability = {

          ...final.stability,

          score:
            combinedScore,

          level:
            stabilityLevel,

          levelLabel:
            getRankingStabilityLabel(
              stabilityLevel
            ),

          collectionMarginScore:
            marginScore,

          nearestCompetitorMargin:
            Number.isFinite(
              nearestMargin
            )
              ? roundScore(
                  nearestMargin
                )
              : null,

          rankMovementRisk:
            getRankMovementRisk(
              combinedScore
            )

        };

      }
    );

    return sortedEvaluations;

  }



  /*
    ============================================================
    COLLECTION RANKING SUMMARY
    ============================================================
  */


  function createRankingSummary(
    sortedEvaluations
  ) {

    const eligibleEvaluations =
      sortedEvaluations.filter(
        evaluation =>
          isCropEligible(
            evaluation
          )
      );

    const rejectedEvaluations =
      sortedEvaluations.filter(
        evaluation =>
          !isCropEligible(
            evaluation
          )
      );

    const practicalEvaluations =
      eligibleEvaluations.filter(
        evaluation =>
          Boolean(
            evaluation.usePaths
              ?.bestPath
          )
      );

    const unsupportedEvaluations =
      eligibleEvaluations.filter(
        evaluation =>
          !evaluation.usePaths
            ?.bestPath
      );

    const topRecommendations =
      practicalEvaluations.filter(
        evaluation =>
          evaluation.final
            ?.recommendationStatus ===
              "top-recommendation"
      );

    const strongRecommendations =
      practicalEvaluations.filter(
        evaluation =>
          evaluation.final
            ?.recommendationStatus ===
              "strong-recommendation"
      );

    const conditionalRecommendations =
      practicalEvaluations.filter(
        evaluation =>
          evaluation.final
            ?.recommendationStatus ===
              "conditional-recommendation"
      );

    return {

      totalCropCount:
        sortedEvaluations.length,

      eligibleCropCount:
        eligibleEvaluations.length,

      practicalCropCount:
        practicalEvaluations.length,

      unsupportedCropCount:
        unsupportedEvaluations.length,

      rejectedCropCount:
        rejectedEvaluations.length,

      topRecommendationCount:
        topRecommendations.length,

      strongRecommendationCount:
        strongRecommendations.length,

      conditionalRecommendationCount:
        conditionalRecommendations.length,

      highestRankedCrop:
        practicalEvaluations[0] ||
        null,

      highestSuitabilityScore:
        practicalEvaluations.length >
          0
          ? practicalEvaluations[0]
              .final
              ?.score ??
            null
          : null,

      highestRankingScore:
        practicalEvaluations.length >
          0
          ? practicalEvaluations[0]
              .final
              ?.rankingScore ??
            null
          : null

    };

  }



  /*
    ============================================================
    COLLECTION RANKING ORCHESTRATOR

    Every crop must already have completed:

      eligibility
      compatibility
      goals
      usePaths
      risks
      confidence
      final score

    before this function is called.
    ============================================================
  */


  function rankCropEvaluations(
    evaluations
  ) {

    if (
      !Array.isArray(
        evaluations
      )
    ) {

      return {

        evaluations:
          [],

        summary:
          createRankingSummary(
            []
          )

      };

    }

    const sortableEvaluations =
      evaluations.filter(
        evaluation =>
          evaluation &&
          typeof evaluation ===
            "object"
      );

    sortableEvaluations.sort(
      compareCropEvaluations
    );

    assignRanksAndTieGroups(
      sortableEvaluations
    );

    refineCollectionRankingStability(
      sortableEvaluations
    );

    return {

      evaluations:
        sortableEvaluations,

      summary:
        createRankingSummary(
          sortableEvaluations
        )

    };

  }

    /*
    ============================================================
    PHASE 8
    RECOMMENDATION EXPLANATION

    PART 12A
    EXPLANATION FRAMEWORK AND MESSAGE BUILDERS

    This section creates the reusable structures and utilities
    used to translate engine calculations into clear,
    visitor-facing explanations.

    Later sections will use these helpers to generate:

      - recommendation reasons;
      - compatibility highlights;
      - goal explanations;
      - use-path explanations;
      - risk considerations;
      - mitigation guidance;
      - confidence narratives;
      - rejected-crop explanations;
      - short recommendation cards;
      - detailed recommendation reports.

    Explanation generation must never invent a reason that is
    not supported by the crop record, questionnaire answers, or
    completed evaluation results.
    ============================================================
  */


  /*
    ============================================================
    EXPLANATION OBJECT
    ============================================================
  */


  function ensureExplanationEvaluationObject(
    evaluation
  ) {

    if (
      !evaluation.explanation ||
      typeof evaluation.explanation !==
        "object"
    ) {

      evaluation.explanation = {};

    }

    const explanation =
      evaluation.explanation;

    explanation.headline =
      typeof explanation.headline ===
        "string"
        ? explanation.headline
        : null;

    explanation.summary =
      typeof explanation.summary ===
        "string"
        ? explanation.summary
        : null;

    explanation.shortSummary =
      typeof explanation.shortSummary ===
        "string"
        ? explanation.shortSummary
        : null;

    explanation.detailedSummary =
      typeof explanation.detailedSummary ===
        "string"
        ? explanation.detailedSummary
        : null;

    explanation.whyRecommended =
      Array.isArray(
        explanation.whyRecommended
      )
        ? explanation.whyRecommended
        : [];

    explanation.compatibilityHighlights =
      Array.isArray(
        explanation.compatibilityHighlights
      )
        ? explanation.compatibilityHighlights
        : [];

    explanation.goalMatches =
      Array.isArray(
        explanation.goalMatches
      )
        ? explanation.goalMatches
        : [];

    explanation.usePathReasons =
      Array.isArray(
        explanation.usePathReasons
      )
        ? explanation.usePathReasons
        : [];

    explanation.considerations =
      Array.isArray(
        explanation.considerations
      )
        ? explanation.considerations
        : [];

    explanation.riskMitigations =
      Array.isArray(
        explanation.riskMitigations
      )
        ? explanation.riskMitigations
        : [];

    explanation.confidenceReasons =
      Array.isArray(
        explanation.confidenceReasons
      )
        ? explanation.confidenceReasons
        : [];

    explanation.uncertainties =
      Array.isArray(
        explanation.uncertainties
      )
        ? explanation.uncertainties
        : [];

    explanation.rejectedReasons =
      Array.isArray(
        explanation.rejectedReasons
      )
        ? explanation.rejectedReasons
        : [];

    explanation.warnings =
      Array.isArray(
        explanation.warnings
      )
        ? explanation.warnings
        : [];

    explanation.card =
      explanation.card &&
      typeof explanation.card ===
        "object"
        ? explanation.card
        : {};

    explanation.details =
      explanation.details &&
      typeof explanation.details ===
        "object"
        ? explanation.details
        : {};

    explanation.metadata =
      explanation.metadata &&
      typeof explanation.metadata ===
        "object"
        ? explanation.metadata
        : {};

    return explanation;

  }



  /*
    ============================================================
    EXPLANATION MESSAGE TYPES
    ============================================================
  */


  const EXPLANATION_MESSAGE_TYPES =
    Object.freeze({

      STRENGTH:
        "strength",

      MATCH:
        "match",

      BENEFIT:
        "benefit",

      USE_PATH:
        "use-path",

      CONSIDERATION:
        "consideration",

      RISK:
        "risk",

      MITIGATION:
        "mitigation",

      CONFIDENCE:
        "confidence",

      UNCERTAINTY:
        "uncertainty",

      REJECTION:
        "rejection",

      WARNING:
        "warning",

      INFORMATION:
        "information"

    });



  const EXPLANATION_SEVERITY_LEVELS =
    Object.freeze({

      POSITIVE:
        "positive",

      NEUTRAL:
        "neutral",

      NOTICE:
        "notice",

      MODERATE:
        "moderate",

      HIGH:
        "high",

      CRITICAL:
        "critical"

    });



  const EXPLANATION_EVIDENCE_TYPES =
    Object.freeze({

      DIRECT:
        "direct",

      DERIVED:
        "derived",

      MIXED:
        "mixed",

      STRUCTURAL:
        "structural",

      UNKNOWN:
        "unknown"

    });



  /*
    ============================================================
    GENERAL TEXT HELPERS
    ============================================================
  */


  function normalizeExplanationText(
    value
  ) {

    if (
      typeof value !==
        "string"
    ) {
      return null;
    }

    const normalized =
      value
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    return normalized.length >
      0
      ? normalized
      : null;

  }



  function removeEndingPunctuation(
    value
  ) {

    const normalized =
      normalizeExplanationText(
        value
      );

    if (!normalized) {
      return null;
    }

    return normalized.replace(
      /[.!?;:,]+$/,
      ""
    );

  }



  function ensureEndingPeriod(
    value
  ) {

    const normalized =
      normalizeExplanationText(
        value
      );

    if (!normalized) {
      return null;
    }

    if (
      /[.!?]$/.test(
        normalized
      )
    ) {
      return normalized;
    }

    return `${normalized}.`;

  }



  function capitalizeFirstLetter(
    value
  ) {

    const normalized =
      normalizeExplanationText(
        value
      );

    if (!normalized) {
      return null;
    }

    return (
      normalized
        .charAt(
          0
        )
        .toUpperCase() +
      normalized.slice(
        1
      )
    );

  }



  function lowercaseFirstLetter(
    value
  ) {

    const normalized =
      normalizeExplanationText(
        value
      );

    if (!normalized) {
      return null;
    }

    return (
      normalized
        .charAt(
          0
        )
        .toLowerCase() +
      normalized.slice(
        1
      )
    );

  }



  function convertIdentifierToWords(
    identifier
  ) {

    if (
      typeof identifier !==
        "string"
    ) {
      return null;
    }

    const words =
      identifier
        .replace(
          /([a-z0-9])([A-Z])/g,
          "$1 $2"
        )
        .replace(
          /[-_]+/g,
          " "
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    if (!words) {
      return null;
    }

    return words
      .split(
        " "
      )
      .map(
        word =>
          word.length > 0
            ? word
                .charAt(
                  0
                )
                .toUpperCase() +
              word
                .slice(
                  1
                )
                .toLowerCase()
            : word
      )
      .join(
        " "
      );

  }



  function formatNumberForExplanation(
    value,
    maximumDecimals = 1
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    return value.toLocaleString(
      "en-US",
      {
        maximumFractionDigits:
          maximumDecimals
      }
    );

  }



  function formatPercentForExplanation(
    value,
    options = {}
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    const assumesRatio =
      options.assumesRatio ===
        true;

    const percentage =
      assumesRatio
        ? value * 100
        : value;

    const decimals =
      Number.isFinite(
        options.maximumDecimals
      )
        ? options.maximumDecimals
        : 0;

    return `${formatNumberForExplanation(
      percentage,
      decimals
    )}%`;

  }



  function formatSquareFeetForExplanation(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    return `${formatNumberForExplanation(
      value,
      0
    )} square feet`;

  }



  function formatDaysForExplanation(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    const roundedDays =
      Math.round(
        value
      );

    return `${roundedDays} ${
      roundedDays === 1
        ? "day"
        : "days"
    }`;

  }



  function formatMonthsForExplanation(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    const roundedMonths =
      Math.round(
        value
      );

    return `${roundedMonths} ${
      roundedMonths === 1
        ? "month"
        : "months"
    }`;

  }



  /*
    ============================================================
    NATURAL LANGUAGE LISTS
    ============================================================
  */


  function joinNaturalLanguageList(
    values,
    options = {}
  ) {

    const normalizedValues =
      values
        .map(
          value =>
            normalizeExplanationText(
              value
            )
        )
        .filter(
          Boolean
        );

    const uniqueValues =
      [
        ...new Set(
          normalizedValues
        )
      ];

    if (
      uniqueValues.length === 0
    ) {
      return "";
    }

    if (
      uniqueValues.length === 1
    ) {
      return uniqueValues[0];
    }

    const conjunction =
      options.conjunction ||
      "and";

    if (
      uniqueValues.length === 2
    ) {

      return `${uniqueValues[0]} ${conjunction} ${uniqueValues[1]}`;

    }

    const leadingItems =
      uniqueValues
        .slice(
          0,
          -1
        )
        .join(
          ", "
        );

    const finalItem =
      uniqueValues[
        uniqueValues.length -
        1
      ];

    return `${leadingItems}, ${conjunction} ${finalItem}`;

  }



  function joinSentenceFragments(
    fragments
  ) {

    return fragments
      .map(
        fragment =>
          removeEndingPunctuation(
            fragment
          )
      )
      .filter(
        Boolean
      )
      .join(
        "; "
      );

  }



  /*
    ============================================================
    EXPLANATION MESSAGE OBJECT
    ============================================================
  */


  function createExplanationMessage(
    options = {}
  ) {

    const text =
      ensureEndingPeriod(
        options.text
      );

    if (!text) {
      return null;
    }

    return {

      id:
        options.id ||
        null,

      type:
        options.type ||
        EXPLANATION_MESSAGE_TYPES
          .INFORMATION,

      category:
        options.category ||
        null,

      title:
        normalizeExplanationText(
          options.title
        ),

      text,

      shortText:
        ensureEndingPeriod(
          options.shortText ||
          options.text
        ),

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NEUTRAL,

      score:
        Number.isFinite(
          options.score
        )
          ? roundScore(
              options.score
            )
          : null,

      weight:
        Number.isFinite(
          options.weight
        )
          ? options.weight
          : null,

      priority:
        Number.isFinite(
          options.priority
        )
          ? options.priority
          : 50,

      evidenceType:
        options.evidenceType ||
        EXPLANATION_EVIDENCE_TYPES
          .UNKNOWN,

      evidenceCoverage:
        Number.isFinite(
          options.evidenceCoverage
        )
          ? clamp(
              options.evidenceCoverage,
              0,
              1
            )
          : null,

      sourcePath:
        normalizeExplanationText(
          options.sourcePath
        ),

      sourceValue:
        options.sourceValue ??
        null,

      relatedGoalId:
        options.relatedGoalId ||
        null,

      relatedUsePathId:
        options.relatedUsePathId ||
        null,

      relatedRiskId:
        options.relatedRiskId ||
        null,

      relatedCompatibilityId:
        options.relatedCompatibilityId ||
        null,

      visitorValue:
        options.visitorValue ??
        null,

      cropValue:
        options.cropValue ??
        null,

      diagnosticOnly:
        options.diagnosticOnly ===
          true,

      display:
        options.display !==
          false,

      metadata:
        options.metadata &&
        typeof options.metadata ===
          "object"
          ? {
              ...options.metadata
            }
          : {}

    };

  }



  /*
    ============================================================
    MESSAGE VALIDATION
    ============================================================
  */


  function isValidExplanationMessage(
    message
  ) {

    return Boolean(

      message &&

      typeof message ===
        "object" &&

      typeof message.text ===
        "string" &&

      message.text.trim()
        .length > 0

    );

  }



  function filterValidExplanationMessages(
    messages
  ) {

    if (
      !Array.isArray(
        messages
      )
    ) {
      return [];
    }

    return messages.filter(
      isValidExplanationMessage
    );

  }



  /*
    ============================================================
    MESSAGE IDENTITY AND DEDUPLICATION
    ============================================================
  */


  function normalizeMessageForComparison(
    value
  ) {

    const normalized =
      normalizeExplanationText(
        value
      );

    if (!normalized) {
      return "";
    }

    return normalized
      .toLowerCase()
      .replace(
        /[^a-z0-9\s]/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  }



  function getExplanationMessageIdentity(
    message
  ) {

    if (
      !message ||
      typeof message !==
        "object"
    ) {
      return "";
    }

    if (
      typeof message.id ===
        "string" &&
      message.id.trim()
        .length > 0
    ) {

      return `id:${message.id}`;

    }

    return `text:${normalizeMessageForComparison(
      message.text
    )}`;

  }



  function deduplicateExplanationMessages(
    messages
  ) {

    const seenIdentities =
      new Set();

    const deduplicated = [];

    filterValidExplanationMessages(
      messages
    ).forEach(
      message => {

        const identity =
          getExplanationMessageIdentity(
            message
          );

        if (
          !identity ||
          seenIdentities.has(
            identity
          )
        ) {
          return;
        }

        seenIdentities.add(
          identity
        );

        deduplicated.push(
          message
        );

      }
    );

    return deduplicated;

  }



  /*
    ============================================================
    SIMILAR MESSAGE DEDUPLICATION

    This catches messages that are not textually identical but
    communicate nearly the same conclusion.
    ============================================================
  */


  function tokenizeExplanationText(
    value
  ) {

    const normalized =
      normalizeMessageForComparison(
        value
      );

    if (!normalized) {
      return [];
    }

    const stopWords =
      new Set([

        "a",

        "an",

        "and",

        "are",

        "as",

        "at",

        "be",

        "because",

        "by",

        "crop",

        "for",

        "from",

        "has",

        "have",

        "in",

        "is",

        "it",

        "of",

        "on",

        "or",

        "that",

        "the",

        "this",

        "to",

        "under",

        "with",

        "your"

      ]);

    return normalized
      .split(
        " "
      )
      .filter(
        token =>
          token.length > 2 &&
          !stopWords.has(
            token
          )
      );

  }



  function calculateMessageSimilarity(
    firstText,
    secondText
  ) {

    const firstTokens =
      new Set(
        tokenizeExplanationText(
          firstText
        )
      );

    const secondTokens =
      new Set(
        tokenizeExplanationText(
          secondText
        )
      );

    if (
      firstTokens.size === 0 ||
      secondTokens.size === 0
    ) {
      return 0;
    }

    let intersectionCount =
      0;

    firstTokens.forEach(
      token => {

        if (
          secondTokens.has(
            token
          )
        ) {
          intersectionCount +=
            1;
        }

      }
    );

    const unionCount =
      new Set([
        ...firstTokens,
        ...secondTokens
      ]).size;

    return unionCount > 0
      ? intersectionCount /
        unionCount
      : 0;

  }



  function removeSimilarExplanationMessages(
    messages,
    similarityThreshold = 0.72
  ) {

    const sortedMessages =
      sortExplanationMessages(
        messages
      );

    const retainedMessages = [];

    sortedMessages.forEach(
      message => {

        const isSimilar =
          retainedMessages.some(
            retainedMessage => {

              if (
                message.category &&
                retainedMessage.category &&
                message.category !==
                  retainedMessage.category
              ) {
                return false;
              }

              return (
                calculateMessageSimilarity(
                  message.text,
                  retainedMessage.text
                ) >=
                similarityThreshold
              );

            }
          );

        if (!isSimilar) {

          retainedMessages.push(
            message
          );

        }

      }
    );

    return retainedMessages;

  }



  /*
    ============================================================
    MESSAGE SORTING
    ============================================================
  */


  function getExplanationSeverityRank(
    severity
  ) {

    const severityRanks = {

      critical:
        6,

      high:
        5,

      moderate:
        4,

      notice:
        3,

      positive:
        2,

      neutral:
        1

    };

    return severityRanks[
      severity
    ] || 0;

  }



  function sortExplanationMessages(
    messages
  ) {

    return filterValidExplanationMessages(
      messages
    )
      .slice()
      .sort(
        (
          first,
          second
        ) => {

          const priorityDifference =
            (
              second.priority ??
              50
            ) -
            (
              first.priority ??
              50
            );

          if (
            priorityDifference !==
            0
          ) {
            return priorityDifference;
          }

          const severityDifference =
            getExplanationSeverityRank(
              second.severity
            ) -
            getExplanationSeverityRank(
              first.severity
            );

          if (
            severityDifference !==
            0
          ) {
            return severityDifference;
          }

          const scoreDifference =
            (
              Number.isFinite(
                second.score
              )
                ? second.score
                : -Infinity
            ) -
            (
              Number.isFinite(
                first.score
              )
                ? first.score
                : -Infinity
            );

          if (
            Math.abs(
              scoreDifference
            ) >= 0.01
          ) {
            return scoreDifference;
          }

          return String(
            first.text
          ).localeCompare(
            String(
              second.text
            )
          );

        }
      );

  }



  function prepareExplanationMessages(
    messages,
    options = {}
  ) {

    let preparedMessages =
      deduplicateExplanationMessages(
        messages
      );

    if (
      options.removeSimilar !==
        false
    ) {

      preparedMessages =
        removeSimilarExplanationMessages(
          preparedMessages,
          options.similarityThreshold ??
            0.72
        );

    }

    preparedMessages =
      sortExplanationMessages(
        preparedMessages
      );

    if (
      Number.isFinite(
        options.limit
      )
    ) {

      preparedMessages =
        preparedMessages.slice(
          0,
          Math.max(
            0,
            options.limit
          )
        );

    }

    return preparedMessages;

  }



  /*
    ============================================================
    MESSAGE TEXT EXTRACTION
    ============================================================
  */


  function getExplanationMessageTexts(
    messages,
    options = {}
  ) {

    const useShortText =
      options.useShortText ===
        true;

    return prepareExplanationMessages(
      messages,
      options
    ).map(
      message =>
        useShortText
          ? message.shortText ||
            message.text
          : message.text
    );

  }



  /*
    ============================================================
    SCORE DESCRIPTION HELPERS
    ============================================================
  */


  function getGeneralScoreDescriptor(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 92
    ) {
      return "exceptional";
    }

    if (
      score >= 84
    ) {
      return "excellent";
    }

    if (
      score >= 76
    ) {
      return "very strong";
    }

    if (
      score >= 68
    ) {
      return "strong";
    }

    if (
      score >= 58
    ) {
      return "moderate";
    }

    if (
      score >= 48
    ) {
      return "limited";
    }

    if (
      score >= 35
    ) {
      return "weak";
    }

    return "very weak";

  }



  function getPositiveScoreDescriptor(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return null;
    }

    if (
      score >= 92
    ) {
      return "exceptionally well";
    }

    if (
      score >= 84
    ) {
      return "extremely well";
    }

    if (
      score >= 76
    ) {
      return "very well";
    }

    if (
      score >= 68
    ) {
      return "well";
    }

    if (
      score >= 58
    ) {
      return "reasonably well";
    }

    return null;

  }



  function getConcernScoreDescriptor(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return null;
    }

    if (
      score < 30
    ) {
      return "a severe concern";
    }

    if (
      score < 42
    ) {
      return "a major concern";
    }

    if (
      score < 55
    ) {
      return "a meaningful concern";
    }

    if (
      score < 68
    ) {
      return "a moderate concern";
    }

    if (
      score < 78
    ) {
      return "a minor consideration";
    }

    return null;

  }



  function getSafetyScoreDescriptor(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return "unknown";
    }

    if (
      score >= 85
    ) {
      return "low risk";
    }

    if (
      score >= 70
    ) {
      return "generally manageable";
    }

    if (
      score >= 55
    ) {
      return "meaningful";
    }

    if (
      score >= 40
    ) {
      return "high";
    }

    return "severe";
  }



  function getEvidenceCoverageDescriptor(
    coverage
  ) {

    if (
      !Number.isFinite(
        coverage
      )
    ) {
      return "unknown";
    }

    const normalizedCoverage =
      coverage <= 1
        ? coverage * 100
        : coverage;

    if (
      normalizedCoverage >= 90
    ) {
      return "excellent";
    }

    if (
      normalizedCoverage >= 80
    ) {
      return "strong";
    }

    if (
      normalizedCoverage >= 68
    ) {
      return "good";
    }

    if (
      normalizedCoverage >= 55
    ) {
      return "moderate";
    }

    if (
      normalizedCoverage >= 40
    ) {
      return "limited";
    }

    return "very limited";
  }



  /*
    ============================================================
    MESSAGE PRIORITY HELPERS
    ============================================================
  */


  function getPositiveMessagePriority(
    score,
    weight = 1
  ) {

    const normalizedScore =
      Number.isFinite(
        score
      )
        ? clamp(
            score,
            0,
            100
          )
        : 50;

    const normalizedWeight =
      Number.isFinite(
        weight
      )
        ? clamp(
            weight,
            0,
            2
          )
        : 1;

    return roundScore(
      normalizedScore *
        0.72 +
      normalizedWeight *
        14
    );

  }



  function getConcernMessagePriority(
    score,
    weight = 1
  ) {

    const normalizedScore =
      Number.isFinite(
        score
      )
        ? clamp(
            score,
            0,
            100
          )
        : 50;

    const normalizedWeight =
      Number.isFinite(
        weight
      )
        ? clamp(
            weight,
            0,
            2
          )
        : 1;

    return roundScore(
      (
        100 -
        normalizedScore
      ) *
        0.78 +
      normalizedWeight *
        14
    );

  }



  function getRiskMessagePriority(
    safetyScore,
    riskWeight = 1
  ) {

    return getConcernMessagePriority(
      safetyScore,
      riskWeight
    );

  }



  /*
    ============================================================
    MESSAGE SEVERITY HELPERS
    ============================================================
  */


  function getPositiveSeverity(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .NEUTRAL;
    }

    if (
      score >= 68
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .POSITIVE;
    }

    return EXPLANATION_SEVERITY_LEVELS
      .NEUTRAL;

  }



  function getConcernSeverity(
    score
  ) {

    if (
      !Number.isFinite(
        score
      )
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .NOTICE;
    }

    if (
      score < 30
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .CRITICAL;
    }

    if (
      score < 45
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .HIGH;
    }

    if (
      score < 60
    ) {
      return EXPLANATION_SEVERITY_LEVELS
        .MODERATE;
    }

    return EXPLANATION_SEVERITY_LEVELS
      .NOTICE;

  }



  /*
    ============================================================
    CROP IDENTITY HELPERS
    ============================================================
  */


  function getExplanationCropIdentity(
    crop,
    evaluation
  ) {

    const identity =
      getCropPlannerSection(
        crop,
        "identity"
      ) || {};

    const cropId =

      evaluation?.cropId ??

      identity.id ??

      crop.id ??

      null;

    const commonName =

      identity.commonName ??

      identity.name ??

      crop.label ??

      crop.name ??

      cropId ??

      "This crop";

    const displayName =
      normalizeExplanationText(
        commonName
      ) ||
      "This crop";

    const scientificName =
      normalizeExplanationText(

        identity.scientificName ??

        identity.botanicalName

      );

    const cropType =
      normalizeExplanationText(

        identity.cropType ??

        identity.primaryType ??

        identity.category

      );

    return {

      id:
        cropId,

      name:
        displayName,

      commonName:
        displayName,

      scientificName,

      cropType

    };

  }



  function getCropReferenceName(
    crop,
    evaluation,
    options = {}
  ) {

    const identity =
      getExplanationCropIdentity(
        crop,
        evaluation
      );

    if (
      options.lowercase ===
        true
    ) {

      return lowercaseFirstLetter(
        identity.name
      );

    }

    return identity.name;

  }



  /*
    ============================================================
    VISITOR ANSWER LABEL HELPERS

    These helpers translate questionnaire IDs into readable
    visitor-facing labels.

    Specific label maps may later be replaced or supplemented by
    questionnaire configuration labels.
    ============================================================
  */


  function getReadableAnswerLabel(
    value
  ) {

    if (
      typeof value !==
        "string"
    ) {
      return null;
    }

    const labelMap = {

      "hot-humid":
        "hot, humid climate",

      "humid-subtropical":
        "humid subtropical climate",

      "hot-dry":
        "hot, dry climate",

      "semi-arid":
        "semi-arid climate",

      "cool-summer":
        "cool-summer climate",

      "cold-winter":
        "cold-winter climate",

      "temperate":
        "temperate climate",

      "full-sun":
        "full sun",

      "partial-sun":
        "partial sun",

      "partial-shade":
        "partial shade",

      "well-drained":
        "well-drained soil",

      "moderately-drained":
        "moderately drained soil",

      "poorly-drained":
        "poorly drained soil",

      "very-reliable":
        "very reliable water access",

      "reliable":
        "reliable water access",

      "somewhat-reliable":
        "somewhat reliable water access",

      "unreliable":
        "unreliable water access",

      "rainfall-only":
        "rainfall-only growing",

      "small-flock":
        "small flock",

      "medium-flock":
        "medium flock",

      "large-flock":
        "large flock",

      "backyard-bed":
        "backyard garden bed",

      "raised-bed":
        "raised bed",

      "container":
        "container",

      "containers":
        "containers",

      "field-plot":
        "field plot",

      "orchard-edge":
        "orchard edge",

      "fence-line":
        "fence line",

      "forage-frame":
        "forage frame",

      "protected-forage-frame":
        "protected forage frame",

      "greenhouse":
        "greenhouse",

      "reduce-feed-costs":
        "reducing feed costs",

      "feed-cost-reduction":
        "reducing feed costs",

      "high-yield":
        "high yield",

      "fast-value":
        "fast results",

      "short-season":
        "short-season production",

      "low-labor":
        "low labor",

      "low-water":
        "low water use",

      "long-storage":
        "long-term storage",

      "minimal-processing":
        "minimal processing",

      "fresh-greens":
        "fresh greens",

      "living-forage":
        "living forage",

      "forage-enrichment":
        "forage enrichment",

      "winter-feed":
        "winter feed",

      "perennial":
        "perennial production",

      "soil-improvement":
        "soil improvement",

      "cover-crop":
        "cover cropping",

      "pollinator-support":
        "pollinator support",

      "wildlife-resistance":
        "wildlife resistance",

      "beginner-friendly":
        "beginner-friendly growing",

      "small-space":
        "small-space production",

      "large-flock":
        "supporting a large flock",

      "resilience":
        "crop resilience",

      "continuous":
        "continuous harvest",

      "batch":
        "batch harvest",

      "single":
        "single main harvest",

      "minor":
        "small repeated harvests",

      "no-storage":
        "immediate use",

      "short-storage":
        "short-term storage",

      "medium-storage":
        "medium-term storage",

      "long-storage":
        "long-term storage",

      "very-low":
        "very low",

      "low":
        "low",

      "moderate":
        "moderate",

      "high":
        "high",

      "very-high":
        "very high",

      "none":
        "none"

    };

    return (
      labelMap[
        value
      ] ||
      convertIdentifierToWords(
        value
      )
    );

  }



  function getReadableAnswerLabels(
    values
  ) {

    if (
      !Array.isArray(
        values
      )
    ) {
      return [];
    }

    return values
      .map(
        getReadableAnswerLabel
      )
      .filter(
        Boolean
      );

  }



  /*
    ============================================================
    SCORE-BAND LANGUAGE
    ============================================================
  */


  function getRecommendationStrengthPhrase(
    final
  ) {

    const status =
      final?.recommendationStatus;

    const phraseMap = {

      "top-recommendation":
        "one of the strongest crop matches for your plan",

      "strong-recommendation":
        "a strong crop match for your plan",

      "conditional-recommendation":
        "a potentially useful crop when its limitations are managed",

      "low-priority":
        "a lower-priority option for your plan",

      "not-recommended":
        "a poor overall match for your plan",

      rejected:
        "not eligible under your selected requirements",

      "no-practical-use-path":
        "growable in some circumstances but lacking a practical use path",

      "insufficient-data":
        "not fully scorable with the available crop data"

    };

    return (
      phraseMap[
        status
      ] ||
      "a crop evaluated for your plan"
    );

  }



  function getRankingPositionPhrase(
    evaluation
  ) {

    const rank =
      evaluation.final
        ?.rank;

    if (
      !Number.isFinite(
        rank
      )
    ) {
      return null;
    }

    if (
      rank === 1
    ) {
      return "the highest-ranked crop";
    }

    if (
      rank === 2
    ) {
      return "the second-highest-ranked crop";
    }

    if (
      rank === 3
    ) {
      return "the third-highest-ranked crop";
    }

    return `the number ${rank} ranked crop`;
  }



  /*
    ============================================================
    HEADLINE BUILDERS
    ============================================================
  */


  function createRecommendationHeadline(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const status =
      evaluation.final
        ?.recommendationStatus;

    const headlineMap = {

      "top-recommendation":
        `${cropName} Is a Top Recommendation`,

      "strong-recommendation":
        `${cropName} Is a Strong Recommendation`,

      "conditional-recommendation":
        `${cropName} Is a Conditional Recommendation`,

      "low-priority":
        `${cropName} Is a Lower-Priority Option`,

      "not-recommended":
        `${cropName} Is Not Recommended for This Plan`,

      rejected:
        `${cropName} Does Not Meet the Required Conditions`,

      "no-practical-use-path":
        `${cropName} Has No Practical Use Path for This Plan`,

      "insufficient-data":
        `${cropName} Has Insufficient Recommendation Data`

    };

    return (
      headlineMap[
        status
      ] ||
      `${cropName} Recommendation`
    );

  }



  function createRecommendationSubheadline(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const final =
      evaluation.final;

    const score =
      final?.score;

    const scoreBand =
      final?.scoreBandLabel;

    const confidenceLabel =
      evaluation.confidence
        ?.levelLabel;

    if (
      !Number.isFinite(
        score
      )
    ) {

      return `${cropName} could not be assigned a complete suitability score.`;

    }

    const parts = [

      `${scoreBand || "Evaluated Fit"} with a suitability score of ${formatNumberForExplanation(
        score,
        1
      )}`

    ];

    if (
      confidenceLabel
    ) {

      parts.push(
        confidenceLabel
      );

    }

    return ensureEndingPeriod(
      parts.join(
        " and "
      )
    );

  }



  /*
    ============================================================
    SHORT SUMMARY BUILDERS
    ============================================================
  */


  function createBasicRecommendationSummary(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const final =
      evaluation.final;

    const strengthPhrase =
      getRecommendationStrengthPhrase(
        final
      );

    const bestPathLabel =
      final?.bestUsePathLabel;

    const confidenceLabel =
      evaluation.confidence
        ?.levelLabel;

    const sentenceParts = [

      `${cropName} is ${strengthPhrase}`

    ];

    if (
      bestPathLabel &&
      isCropEligible(
        evaluation
      )
    ) {

      sentenceParts.push(
        `with ${bestPathLabel} as its strongest practical use path`
      );

    }

    let summary =
      sentenceParts.join(
        ", "
      );

    if (
      confidenceLabel
    ) {

      summary +=
        `, supported by ${confidenceLabel.toLowerCase()}`;

    }

    return ensureEndingPeriod(
      summary
    );

  }



  function createCompactRecommendationSummary(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const final =
      evaluation.final;

    const score =
      final?.score;

    const statusLabel =
      final
        ?.recommendationStatusLabel;

    const bestPathLabel =
      final?.bestUsePathLabel;

    const components = [];

    if (
      statusLabel
    ) {

      components.push(
        statusLabel
      );

    }

    if (
      Number.isFinite(
        score
      )
    ) {

      components.push(
        `${formatNumberForExplanation(
          score,
          1
        )} suitability`
      );

    }

    if (
      bestPathLabel
    ) {

      components.push(
        bestPathLabel
      );

    }

    return `${cropName}: ${components.join(
      " · "
    )}`;
  }



  /*
    ============================================================
    EXPLANATION SECTION OBJECT
    ============================================================
  */


  function createExplanationSection(
    options = {}
  ) {

    const messages =
      prepareExplanationMessages(
        options.messages || [],
        {
          limit:
            options.limit,

          removeSimilar:
            options.removeSimilar !==
              false,

          similarityThreshold:
            options
              .similarityThreshold
        }
      );

    return {

      id:
        options.id ||
        null,

      title:
        normalizeExplanationText(
          options.title
        ),

      subtitle:
        normalizeExplanationText(
          options.subtitle
        ),

      messages,

      textItems:
        messages.map(
          message =>
            message.text
        ),

      count:
        messages.length,

      emptyMessage:
        normalizeExplanationText(
          options.emptyMessage
        ),

      display:
        messages.length > 0 ||
        options.displayWhenEmpty ===
          true

    };

  }



  /*
    ============================================================
    EXPLANATION COLLECTION HELPERS
    ============================================================
  */


  function addExplanationMessage(
    targetArray,
    message
  ) {

    if (
      !Array.isArray(
        targetArray
      ) ||
      !isValidExplanationMessage(
        message
      )
    ) {
      return false;
    }

    targetArray.push(
      message
    );

    return true;

  }



  function addExplanationMessages(
    targetArray,
    messages
  ) {

    if (
      !Array.isArray(
        targetArray
      ) ||
      !Array.isArray(
        messages
      )
    ) {
      return 0;
    }

    let addedCount = 0;

    messages.forEach(
      message => {

        if (
          addExplanationMessage(
            targetArray,
            message
          )
        ) {
          addedCount +=
            1;
        }

      }
    );

    return addedCount;

  }



  function resetExplanationCollections(
    explanation
  ) {

    explanation.whyRecommended =
      [];

    explanation.compatibilityHighlights =
      [];

    explanation.goalMatches =
      [];

    explanation.usePathReasons =
      [];

    explanation.considerations =
      [];

    explanation.riskMitigations =
      [];

    explanation.confidenceReasons =
      [];

    explanation.uncertainties =
      [];

    explanation.rejectedReasons =
      [];

    explanation.warnings =
      [];

    explanation.card = {};

    explanation.details = {};

    explanation.metadata = {};

    return explanation;

  }



  /*
    ============================================================
    EVALUATION ACCESS HELPERS
    ============================================================
  */


  function getCompatibilityCategoryResult(
    evaluation,
    categoryId
  ) {

    const categoryResults =
      evaluation.compatibility
        ?.categoryResults;

    if (
      !Array.isArray(
        categoryResults
      )
    ) {
      return null;
    }

    return categoryResults.find(
      category =>
        category.id ===
          categoryId
    ) || null;

  }



  function getGoalEvaluationResult(
    evaluation,
    goalId
  ) {

    const possibleCollections = [

      evaluation.goals
        ?.goalResults,

      evaluation.goals
        ?.results,

      evaluation.goals
        ?.selectedGoals,

      evaluation.goals
        ?.evaluatedGoals

    ];

    for (
      const collection
      of possibleCollections
    ) {

      if (
        !Array.isArray(
          collection
        )
      ) {
        continue;
      }

      const match =
        collection.find(
          result =>
            (
              result.id ??
              result.goalId
            ) ===
              goalId
        );

      if (match) {
        return match;
      }

    }

    return null;

  }



  function getBestUsePathEvaluation(
    evaluation
  ) {

    return (
      evaluation.usePaths
        ?.bestPath ||
      null
    );

  }



  function getUsePathFactorResult(
    usePathEvaluation,
    factorId
  ) {

    if (
      !usePathEvaluation ||
      !Array.isArray(
        usePathEvaluation.factors
      )
    ) {
      return null;
    }

    return (
      usePathEvaluation.factors.find(
        factor =>
          factor.id ===
            factorId
      ) ||
      null
    );

  }



  function getRiskCategoryResult(
    evaluation,
    riskId
  ) {

    const categoryResults =
      evaluation.risks
        ?.categoryResults;

    if (
      !Array.isArray(
        categoryResults
      )
    ) {
      return null;
    }

    return (
      categoryResults.find(
        category =>
          category.id ===
            riskId
      ) ||
      null
    );

  }



  function getConfidenceFactorResult(
    evaluation,
    factorId
  ) {

    const factorResults =
      evaluation.confidence
        ?.factorResults;

    if (
      !Array.isArray(
        factorResults
      )
    ) {
      return null;
    }

    return (
      factorResults.find(
        factor =>
          factor.id ===
            factorId
      ) ||
      null
    );

  }



  /*
    ============================================================
    STRONGEST AND WEAKEST RESULT HELPERS
    ============================================================
  */


  function getKnownScoredItems(
    items,
    scoreProperty = "score"
  ) {

    if (
      !Array.isArray(
        items
      )
    ) {
      return [];
    }

    return items.filter(
      item =>
        item &&
        Number.isFinite(
          item[
            scoreProperty
          ]
        )
    );

  }



  function getHighestScoredItems(
    items,
    options = {}
  ) {

    const scoreProperty =
      options.scoreProperty ||
      "score";

    const minimumScore =
      Number.isFinite(
        options.minimumScore
      )
        ? options.minimumScore
        : -Infinity;

    const limit =
      Number.isFinite(
        options.limit
      )
        ? Math.max(
            0,
            options.limit
          )
        : Infinity;

    return getKnownScoredItems(
      items,
      scoreProperty
    )
      .filter(
        item =>
          item[
            scoreProperty
          ] >=
          minimumScore
      )
      .sort(
        (
          first,
          second
        ) =>
          second[
            scoreProperty
          ] -
          first[
            scoreProperty
          ]
      )
      .slice(
        0,
        limit
      );

  }



  function getLowestScoredItems(
    items,
    options = {}
  ) {

    const scoreProperty =
      options.scoreProperty ||
      "score";

    const maximumScore =
      Number.isFinite(
        options.maximumScore
      )
        ? options.maximumScore
        : Infinity;

    const limit =
      Number.isFinite(
        options.limit
      )
        ? Math.max(
            0,
            options.limit
          )
        : Infinity;

    return getKnownScoredItems(
      items,
      scoreProperty
    )
      .filter(
        item =>
          item[
            scoreProperty
          ] <=
          maximumScore
      )
      .sort(
        (
          first,
          second
        ) =>
          first[
            scoreProperty
          ] -
          second[
            scoreProperty
          ]
      )
      .slice(
        0,
        limit
      );

  }



  /*
    ============================================================
    MESSAGE-BUILDING TEMPLATES
    ============================================================
  */


  function buildMatchMessage(
    options = {}
  ) {

    const subject =
      normalizeExplanationText(
        options.subject
      );

    const visitorCondition =
      normalizeExplanationText(
        options.visitorCondition
      );

    const cropCondition =
      normalizeExplanationText(
        options.cropCondition
      );

    if (
      !subject ||
      !visitorCondition
    ) {
      return null;
    }

    let text =
      `${subject} matches ${visitorCondition}`;

    if (
      cropCondition
    ) {

      text +=
        ` because the crop ${cropCondition}`;

    }

    return createExplanationMessage({

      ...options,

      text,

      type:
        options.type ||
        EXPLANATION_MESSAGE_TYPES
          .MATCH,

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE

    });

  }



  function buildSupportsGoalMessage(
    options = {}
  ) {

    const cropName =
      normalizeExplanationText(
        options.cropName
      ) ||
      "This crop";

    const goalLabel =
      normalizeExplanationText(
        options.goalLabel
      );

    const supportReason =
      normalizeExplanationText(
        options.supportReason
      );

    if (!goalLabel) {
      return null;
    }

    let text =
      `${cropName} supports your goal of ${goalLabel}`;

    if (
      supportReason
    ) {

      text +=
        ` because ${supportReason}`;

    }

    return createExplanationMessage({

      ...options,

      text,

      type:
        EXPLANATION_MESSAGE_TYPES
          .BENEFIT,

      category:
        options.category ||
        "goals",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE

    });

  }



  function buildUsePathSelectionMessage(
    options = {}
  ) {

    const pathLabel =
      normalizeExplanationText(
        options.pathLabel
      );

    const reason =
      normalizeExplanationText(
        options.reason
      );

    if (!pathLabel) {
      return null;
    }

    let text =
      `${pathLabel} is the strongest practical use path`;

    if (
      reason
    ) {

      text +=
        ` because ${reason}`;

    }

    return createExplanationMessage({

      ...options,

      text,

      type:
        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

      category:
        options.category ||
        "use-path",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE

    });

  }



  function buildConsiderationMessage(
    options = {}
  ) {

    const subject =
      normalizeExplanationText(
        options.subject
      );

    const concern =
      normalizeExplanationText(
        options.concern
      );

    if (
      !subject &&
      !concern
    ) {
      return null;
    }

    const text =
      subject && concern
        ? `${subject}: ${concern}`
        : subject ||
          concern;

    return createExplanationMessage({

      ...options,

      text,

      type:
        options.type ||
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE

    });

  }



  function buildRiskMessage(
    options = {}
  ) {

    const riskLabel =
      normalizeExplanationText(
        options.riskLabel
      );

    const riskDescription =
      normalizeExplanationText(
        options.riskDescription
      );

    if (
      !riskLabel &&
      !riskDescription
    ) {
      return null;
    }

    const text =
      riskLabel &&
      riskDescription
        ? `${riskLabel} is ${riskDescription}`
        : riskLabel ||
          riskDescription;

    return createExplanationMessage({

      ...options,

      text,

      type:
        EXPLANATION_MESSAGE_TYPES
          .RISK,

      category:
        options.category ||
        "risk",

      severity:
        options.severity ||
        getConcernSeverity(
          options.score
        )

    });

  }



  function buildMitigationMessage(
    options = {}
  ) {

    const action =
      normalizeExplanationText(
        options.action
      );

    const purpose =
      normalizeExplanationText(
        options.purpose
      );

    if (!action) {
      return null;
    }

    let text =
      action;

    if (
      purpose
    ) {

      text +=
        ` to ${purpose}`;

    }

    return createExplanationMessage({

      ...options,

      text,

      type:
        EXPLANATION_MESSAGE_TYPES
          .MITIGATION,

      category:
        options.category ||
        "mitigation",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE

    });

  }



  function buildConfidenceMessage(
    options = {}
  ) {

    const reason =
      normalizeExplanationText(
        options.reason
      );

    if (!reason) {
      return null;
    }

    return createExplanationMessage({

      ...options,

      text:
        reason,

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONFIDENCE,

      category:
        options.category ||
        "confidence",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE

    });

  }



  function buildUncertaintyMessage(
    options = {}
  ) {

    const uncertainty =
      normalizeExplanationText(
        options.uncertainty
      );

    if (!uncertainty) {
      return null;
    }

    return createExplanationMessage({

      ...options,

      text:
        uncertainty,

      type:
        EXPLANATION_MESSAGE_TYPES
          .UNCERTAINTY,

      category:
        options.category ||
        "uncertainty",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE

    });

  }



  function buildRejectionMessage(
    options = {}
  ) {

    const reason =
      normalizeExplanationText(
        options.reason
      );

    if (!reason) {
      return null;
    }

    return createExplanationMessage({

      ...options,

      text:
        reason,

      type:
        EXPLANATION_MESSAGE_TYPES
          .REJECTION,

      category:
        options.category ||
        "eligibility",

      severity:
        options.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .CRITICAL

    });

  }



  /*
    ============================================================
    STANDARD CARD OBJECT
    ============================================================
  */


  function createRecommendationCardObject(
    crop,
    evaluation,
    explanation
  ) {

    const identity =
      getExplanationCropIdentity(
        crop,
        evaluation
      );

    const final =
      evaluation.final ||
      {};

    const confidence =
      evaluation.confidence ||
      {};

    const bestPath =
      getBestUsePathEvaluation(
        evaluation
      );

    return {

      cropId:
        identity.id,

      cropName:
        identity.name,

      scientificName:
        identity.scientificName,

      headline:
        explanation.headline,

      shortSummary:
        explanation.shortSummary,

      rank:
        final.rank ??
        null,

      tieGroup:
        final.tieGroup ??
        null,

      suitabilityScore:
        final.score ??
        null,

      rankingScore:
        final.rankingScore ??
        null,

      scoreBand:
        final.scoreBand ??
        "unknown",

      scoreBandLabel:
        final.scoreBandLabel ??
        "Unknown Fit",

      recommendationStatus:
        final.recommendationStatus ??
        "unscored",

      recommendationStatusLabel:
        final
          .recommendationStatusLabel ??
        "Not Yet Scored",

      rankingTier:
        final.rankingTier ??
        "unranked",

      rankingTierLabel:
        final.rankingTierLabel ??
        "Unranked",

      confidenceScore:
        confidence.score ??
        null,

      confidenceLevel:
        confidence.level ??
        "unknown",

      confidenceLabel:
        confidence.levelLabel ??
        "Unknown Confidence",

      eligible:
        final.eligible !==
          false,

      bestUsePathId:
        bestPath?.id ??
        null,

      bestUsePathLabel:
        bestPath?.label ??
        null,

      primaryReasons:
        getExplanationMessageTexts(
          explanation.whyRecommended,
          {
            limit:
              3,

            useShortText:
              true
          }
        ),

      primaryConsiderations:
        getExplanationMessageTexts(
          explanation.considerations,
          {
            limit:
              3,

            useShortText:
              true
          }
        ),

      rejectedReasons:
        getExplanationMessageTexts(
          explanation.rejectedReasons,
          {
            limit:
              3,

            useShortText:
              true
          }
        ),

      flags:
        Array.isArray(
          final.flags
        )
          ? [
              ...final.flags
            ]
          : []

    };

  }



  /*
    ============================================================
    STANDARD DETAIL OBJECT
    ============================================================
  */


  function createRecommendationDetailObject(
    crop,
    evaluation,
    explanation
  ) {

    const identity =
      getExplanationCropIdentity(
        crop,
        evaluation
      );

    return {

      cropId:
        identity.id,

      cropName:
        identity.name,

      scientificName:
        identity.scientificName,

      headline:
        explanation.headline,

      subheadline:
        explanation.subheadline,

      summary:
        explanation.summary,

      detailedSummary:
        explanation.detailedSummary,

      sections: {

        whyRecommended:
          createExplanationSection({

            id:
              "why-recommended",

            title:
              "Why This Crop Was Recommended",

            messages:
              explanation.whyRecommended,

            limit:
              8,

            emptyMessage:
              "No strong recommendation reasons were available."

          }),

        compatibility:
          createExplanationSection({

            id:
              "compatibility",

            title:
              "Growing Compatibility",

            messages:
              explanation
                .compatibilityHighlights,

            limit:
              8,

            emptyMessage:
              "No compatibility highlights were available."

          }),

        goals:
          createExplanationSection({

            id:
              "goals",

            title:
              "How It Supports Your Goals",

            messages:
              explanation.goalMatches,

            limit:
              8,

            emptyMessage:
              "No strong goal matches were identified."

          }),

        usePath:
          createExplanationSection({

            id:
              "use-path",

            title:
              "Best Harvest and Feeding Use",

            messages:
              explanation.usePathReasons,

            limit:
              8,

            emptyMessage:
              "No practical use-path explanation was available."

          }),

        considerations:
          createExplanationSection({

            id:
              "considerations",

            title:
              "Important Considerations",

            messages:
              explanation.considerations,

            limit:
              10,

            emptyMessage:
              "No major considerations were identified."

          }),

        mitigations:
          createExplanationSection({

            id:
              "risk-mitigation",

            title:
              "Ways to Manage the Risks",

            messages:
              explanation.riskMitigations,

            limit:
              8,

            emptyMessage:
              "No special mitigation steps were identified."

          }),

        confidence:
          createExplanationSection({

            id:
              "confidence",

            title:
              "Recommendation Confidence",

            messages:
              explanation.confidenceReasons,

            limit:
              8,

            emptyMessage:
              "No confidence explanation was available."

          }),

        uncertainty:
          createExplanationSection({

            id:
              "uncertainty",

            title:
              "Remaining Uncertainty",

            messages:
              explanation.uncertainties,

            limit:
              8,

            emptyMessage:
              "No major uncertainty was identified."

          }),

        rejection:
          createExplanationSection({

            id:
              "rejection",

            title:
              "Why This Crop Was Excluded",

            messages:
              explanation.rejectedReasons,

            limit:
              10,

            emptyMessage:
              "The crop was not rejected."

          })

      }

    };

  }



  /*
    ============================================================
    EXPLANATION METADATA
    ============================================================
  */


  function createExplanationMetadata(
    crop,
    evaluation,
    explanation
  ) {

    const messageCollections = [

      explanation.whyRecommended,

      explanation.compatibilityHighlights,

      explanation.goalMatches,

      explanation.usePathReasons,

      explanation.considerations,

      explanation.riskMitigations,

      explanation.confidenceReasons,

      explanation.uncertainties,

      explanation.rejectedReasons,

      explanation.warnings

    ];

    const allMessages =
      messageCollections.flatMap(
        collection =>
          Array.isArray(
            collection
          )
            ? collection
            : []
      );

    const validMessages =
      filterValidExplanationMessages(
        allMessages
      );

    const evidenceCounts =
      validMessages.reduce(
        (
          counts,
          message
        ) => {

          const evidenceType =
            message.evidenceType ||
            EXPLANATION_EVIDENCE_TYPES
              .UNKNOWN;

          counts[
            evidenceType
          ] =
            (
              counts[
                evidenceType
              ] ||
              0
            ) +
            1;

          return counts;

        },
        {}
      );

    return {

      engineVersion:
        typeof ENGINE_VERSION ===
          "string"
          ? ENGINE_VERSION
          : null,

      explanationPhase:
        "12A-framework",

      generated:
        true,

      cropId:
        getExplanationCropIdentity(
          crop,
          evaluation
        ).id,

      messageCount:
        validMessages.length,

      displayedMessageCount:
        validMessages.filter(
          message =>
            message.display !==
              false
        ).length,

      diagnosticMessageCount:
        validMessages.filter(
          message =>
            message.diagnosticOnly ===
              true
        ).length,

      evidenceCounts,

      hasRecommendationReasons:
        explanation
          .whyRecommended
          .length >
        0,

      hasCompatibilityHighlights:
        explanation
          .compatibilityHighlights
          .length >
        0,

      hasGoalMatches:
        explanation
          .goalMatches
          .length >
        0,

      hasUsePathReasons:
        explanation
          .usePathReasons
          .length >
        0,

      hasConsiderations:
        explanation
          .considerations
          .length >
        0,

      hasMitigations:
        explanation
          .riskMitigations
          .length >
        0,

      hasConfidenceReasons:
        explanation
          .confidenceReasons
          .length >
        0,

      hasRejectedReasons:
        explanation
          .rejectedReasons
          .length >
        0

    };

  }



  /*
    ============================================================
    PREPARE EXPLANATION COLLECTIONS

    Parts 12B–12D will add raw explanation messages.

    This helper performs final sorting, similarity removal, and
    per-section limits.
    ============================================================
  */


  function prepareExplanationCollections(
    explanation
  ) {

    explanation.whyRecommended =
      prepareExplanationMessages(
        explanation.whyRecommended,
        {
          limit:
            8
        }
      );

    explanation.compatibilityHighlights =
      prepareExplanationMessages(
        explanation
          .compatibilityHighlights,
        {
          limit:
            10
        }
      );

    explanation.goalMatches =
      prepareExplanationMessages(
        explanation.goalMatches,
        {
          limit:
            10
        }
      );

    explanation.usePathReasons =
      prepareExplanationMessages(
        explanation.usePathReasons,
        {
          limit:
            10
        }
      );

    explanation.considerations =
      prepareExplanationMessages(
        explanation.considerations,
        {
          limit:
            12
        }
      );

    explanation.riskMitigations =
      prepareExplanationMessages(
        explanation.riskMitigations,
        {
          limit:
            10
        }
      );

    explanation.confidenceReasons =
      prepareExplanationMessages(
        explanation.confidenceReasons,
        {
          limit:
            10
        }
      );

    explanation.uncertainties =
      prepareExplanationMessages(
        explanation.uncertainties,
        {
          limit:
            10
        }
      );

    explanation.rejectedReasons =
      prepareExplanationMessages(
        explanation.rejectedReasons,
        {
          limit:
            12,

          similarityThreshold:
            0.66
        }
      );

    explanation.warnings =
      prepareExplanationMessages(
        explanation.warnings,
        {
          limit:
            12
        }
      );

    return explanation;

  }



  /*
    ============================================================
    PART 12A INITIALIZER

    This does not yet create the complete explanation.

    Parts 12B–12D will call the message builders above, populate
    the explanation collections, and then finalize the card and
    detail objects.
    ============================================================
  */


  function initializeRecommendationExplanation(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    resetExplanationCollections(
      explanation
    );

    explanation.headline =
      createRecommendationHeadline(
        crop,
        evaluation
      );

    explanation.subheadline =
      createRecommendationSubheadline(
        crop,
        evaluation
      );

    explanation.summary =
      createBasicRecommendationSummary(
        crop,
        evaluation
      );

    explanation.shortSummary =
      createCompactRecommendationSummary(
        crop,
        evaluation
      );

    explanation.detailedSummary =
      null;

    explanation.metadata = {

      initialized:
        true,

      answersAvailable:
        Boolean(
          answers &&
          typeof answers ===
            "object"
        ),

      finalScoreAvailable:
        Number.isFinite(
          evaluation.final
            ?.score
        ),

      confidenceAvailable:
        Number.isFinite(
          evaluation.confidence
            ?.score
        ),

      bestUsePathAvailable:
        Boolean(
          evaluation.usePaths
            ?.bestPath
        )

    };

    return explanation;

  }



  /*
    ============================================================
    PART 12A FINALIZATION HELPER

    Parts 12B–12D will call this after all explanation messages
    have been generated.
    ============================================================
  */


  function finalizeRecommendationExplanationFramework(
    crop,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    prepareExplanationCollections(
      explanation
    );

    explanation.card =
      createRecommendationCardObject(
        crop,
        evaluation,
        explanation
      );

    explanation.details =
      createRecommendationDetailObject(
        crop,
        evaluation,
        explanation
      );

    explanation.metadata = {

      ...explanation.metadata,

      ...createExplanationMetadata(
        crop,
        evaluation,
        explanation
      ),

      finalized:
        true

    };

    return explanation;

  }

    /*
    ============================================================
    PHASE 8
    RECOMMENDATION EXPLANATION

    PART 12B
    PRIMARY RECOMMENDATION REASONS

    This section generates the highest-level reasons explaining
    why a crop ranked where it did.

    These messages summarize the completed evaluation rather
    than repeating every detailed factor.

    More specific compatibility, goal, use-path, risk, and
    confidence explanations are created in Parts 12C and 12D.
    ============================================================
  */


  /*
    ============================================================
    FINAL RESULT ACCESS HELPERS
    ============================================================
  */


  function getFinalSuitabilityScore(
    evaluation
  ) {

    const possibleValues = [

      evaluation.final
        ?.suitabilityScore,

      evaluation.final
        ?.score

    ];

    return possibleValues.find(
      Number.isFinite
    ) ?? null;

  }



  function getFinalRankingScore(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.final
        ?.rankingScore
    )
      ? evaluation.final
          .rankingScore
      : null;

  }



  function getFinalRecommendationStatus(
    evaluation
  ) {

    return (

      evaluation.final
        ?.recommendationStatus ??

      "unscored"

    );

  }



  function getFinalRecommendationStatusLabel(
    evaluation
  ) {

    return (

      evaluation.final
        ?.recommendationStatusLabel ??

      getRecommendationStatusLabel(
        getFinalRecommendationStatus(
          evaluation
        )
      )

    );

  }



  function getFinalScoreBandLabel(
    evaluation
  ) {

    return (

      evaluation.final
        ?.scoreBandLabel ??

      getFinalScoreBandLabel(
        getFinalScoreBand(
          getFinalSuitabilityScore(
            evaluation
          )
        )
      )

    );

  }



  function getFinalRank(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.final
        ?.rank
    )
      ? evaluation.final.rank
      : null;

  }



  function getFinalRankingTier(
    evaluation
  ) {

    return (

      evaluation.final
        ?.rankingTier ??

      "unranked"

    );

  }



  /*
    ============================================================
    EVALUATION SCORE ACCESS HELPERS
    ============================================================
  */


  function getCompatibilityScoreForExplanation(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.compatibility
        ?.score
    )
      ? evaluation.compatibility
          .score
      : null;

  }



  function getGoalScoreForExplanation(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.goals
        ?.score
    )
      ? evaluation.goals.score
      : null;

  }



  function getUsePathScoreForExplanation(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.usePaths
        ?.score
    )
      ? evaluation.usePaths
          .score
      : null;

  }



  function getRiskSafetyScoreForExplanation(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.risks
        ?.score
    )
      ? evaluation.risks.score
      : null;

  }



  function getConfidenceScoreForExplanation(
    evaluation
  ) {

    return Number.isFinite(
      evaluation.confidence
        ?.score
    )
      ? evaluation.confidence
          .score
      : null;

  }



  /*
    ============================================================
    OVERALL STRENGTH HELPERS
    ============================================================
  */


  function getOverallRecommendationStrengthScore(
    evaluation
  ) {

    const suitabilityScore =
      getFinalSuitabilityScore(
        evaluation
      );

    const compatibilityScore =
      getCompatibilityScoreForExplanation(
        evaluation
      );

    const goalScore =
      getGoalScoreForExplanation(
        evaluation
      );

    const usePathScore =
      getUsePathScoreForExplanation(
        evaluation
      );

    const values = [

      suitabilityScore,

      compatibilityScore,

      goalScore,

      usePathScore

    ].filter(
      Number.isFinite
    );

    return values.length > 0
      ? roundScore(
          averageKnownValues(
            values
          )
        )
      : null;

  }



  function countStrongPrimaryPhases(
    evaluation,
    threshold = 72
  ) {

    const phaseScores = [

      getCompatibilityScoreForExplanation(
        evaluation
      ),

      getGoalScoreForExplanation(
        evaluation
      ),

      getUsePathScoreForExplanation(
        evaluation
      )

    ];

    return phaseScores.filter(
      score =>
        Number.isFinite(
          score
        ) &&
        score >= threshold
    ).length;

  }



  function countWeakPrimaryPhases(
    evaluation,
    threshold = 55
  ) {

    const phaseScores = [

      getCompatibilityScoreForExplanation(
        evaluation
      ),

      getGoalScoreForExplanation(
        evaluation
      ),

      getUsePathScoreForExplanation(
        evaluation
      )

    ];

    return phaseScores.filter(
      score =>
        Number.isFinite(
          score
        ) &&
        score < threshold
    ).length;

  }



  function hasBalancedStrongPerformance(
    evaluation
  ) {

    const scores = [

      getCompatibilityScoreForExplanation(
        evaluation
      ),

      getGoalScoreForExplanation(
        evaluation
      ),

      getUsePathScoreForExplanation(
        evaluation
      )

    ].filter(
      Number.isFinite
    );

    if (
      scores.length < 3
    ) {
      return false;
    }

    return scores.every(
      score =>
        score >= 70
    );

  }



  function hasExceptionalBalancedPerformance(
    evaluation
  ) {

    const scores = [

      getCompatibilityScoreForExplanation(
        evaluation
      ),

      getGoalScoreForExplanation(
        evaluation
      ),

      getUsePathScoreForExplanation(
        evaluation
      )

    ].filter(
      Number.isFinite
    );

    if (
      scores.length < 3
    ) {
      return false;
    }

    return scores.every(
      score =>
        score >= 82
    );

  }



  /*
    ============================================================
    RANK LANGUAGE HELPERS
    ============================================================
  */


  function getOrdinalNumberLabel(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    const integerValue =
      Math.round(
        value
      );

    const lastTwoDigits =
      integerValue % 100;

    if (
      lastTwoDigits >= 11 &&
      lastTwoDigits <= 13
    ) {

      return `${integerValue}th`;

    }

    const lastDigit =
      integerValue % 10;

    if (
      lastDigit === 1
    ) {
      return `${integerValue}st`;
    }

    if (
      lastDigit === 2
    ) {
      return `${integerValue}nd`;
    }

    if (
      lastDigit === 3
    ) {
      return `${integerValue}rd`;
    }

    return `${integerValue}th`;

  }



  function getRankReasonText(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const rank =
      getFinalRank(
        evaluation
      );

    if (
      !Number.isFinite(
        rank
      )
    ) {
      return null;
    }

    if (
      rank === 1
    ) {

      return `${cropName} received the highest overall ranking among the evaluated crops`;

    }

    if (
      rank <= 3
    ) {

      return `${cropName} ranked ${getOrdinalNumberLabel(
        rank
      )} among the evaluated crops`;

    }

    if (
      rank <= 5
    ) {

      return `${cropName} placed within the five highest-ranked crops`;

    }

    return null;

  }



  /*
    ============================================================
    RECOMMENDATION STATUS REASON
    ============================================================
  */


  function createRecommendationStatusReason(
    crop,
    evaluation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    const suitabilityScore =
      getFinalSuitabilityScore(
        evaluation
      );

    const scoreBandLabel =
      getFinalScoreBandLabel(
        evaluation
      );

    const scoreText =
      Number.isFinite(
        suitabilityScore
      )
        ? formatNumberForExplanation(
            suitabilityScore,
            1
          )
        : null;

    let text = null;
    let severity =
      EXPLANATION_SEVERITY_LEVELS
        .NEUTRAL;
    let priority = 85;

    switch (status) {

      case "top-recommendation":

        text =
          `${cropName} earned a ${scoreBandLabel.toLowerCase()} suitability score${
            scoreText
              ? ` of ${scoreText}`
              : ""
          }, placing it among the strongest overall matches for your plan`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE;

        priority = 100;

        break;

      case "strong-recommendation":

        text =
          `${cropName} earned a strong overall suitability result${
            scoreText
              ? ` of ${scoreText}`
              : ""
          } and performs well across the most important parts of your plan`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE;

        priority = 96;

        break;

      case "conditional-recommendation":

        text =
          `${cropName} has a useful overall fit${
            scoreText
              ? ` with a suitability score of ${scoreText}`
              : ""
          }, but its value depends on managing the identified limitations`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .NOTICE;

        priority = 92;

        break;

      case "low-priority":

        text =
          `${cropName} offers some useful qualities, but its overall fit is weaker than the higher-ranked alternatives`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .NOTICE;

        priority = 88;

        break;

      case "not-recommended":

        text =
          `${cropName} does not provide enough combined compatibility, goal value, and practical feeding utility to justify a normal recommendation`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .HIGH;

        priority = 96;

        break;

      case "rejected":

        text =
          `${cropName} was excluded because it failed at least one required eligibility condition`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .CRITICAL;

        priority = 110;

        break;

      case "no-practical-use-path":

        text =
          `${cropName} may be growable under the selected conditions, but no safe and practical harvest-to-feeding pathway remains`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .HIGH;

        priority = 105;

        break;

      case "insufficient-data":

        text =
          `${cropName} could not be fully recommended because the crop record does not contain enough scorable evidence`;

        severity =
          EXPLANATION_SEVERITY_LEVELS
            .MODERATE;

        priority = 100;

        break;

      default:

        return null;

    }

    return createExplanationMessage({

      id:
        "overall-recommendation-status",

      type:
        status ===
          "rejected"
          ? EXPLANATION_MESSAGE_TYPES
              .REJECTION
          : status ===
              "not-recommended" ||
            status ===
              "no-practical-use-path"
            ? EXPLANATION_MESSAGE_TYPES
                .CONSIDERATION
            : EXPLANATION_MESSAGE_TYPES
                .STRENGTH,

      category:
        "overall",

      title:
        getFinalRecommendationStatusLabel(
          evaluation
        ),

      text,

      shortText:
        text,

      severity,

      score:
        suitabilityScore,

      priority,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.final.recommendationStatus",

      sourceValue:
        status

    });

  }



  /*
    ============================================================
    RANKING REASON
    ============================================================
  */


  function createRankingPositionReason(
    crop,
    evaluation
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return null;
    }

    const rankText =
      getRankReasonText(
        crop,
        evaluation
      );

    if (!rankText) {
      return null;
    }

    const rankingScore =
      getFinalRankingScore(
        evaluation
      );

    const rank =
      getFinalRank(
        evaluation
      );

    return createExplanationMessage({

      id:
        "ranking-position",

      type:
        EXPLANATION_MESSAGE_TYPES
          .STRENGTH,

      category:
        "ranking",

      title:
        "Overall Ranking",

      text:
        `${rankText} after compatibility, goal alignment, use-path practicality, risk, and confidence were considered together`,

      shortText:
        `${rankText}`,

      severity:
        rank <= 3
          ? EXPLANATION_SEVERITY_LEVELS
              .POSITIVE
          : EXPLANATION_SEVERITY_LEVELS
              .NEUTRAL,

      score:
        rankingScore,

      priority:
        rank === 1
          ? 98
          : rank <= 3
            ? 92
            : 76,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.final.rank",

      sourceValue:
        rank,

      metadata: {

        rankingScore,

        tieGroup:
          evaluation.final
            ?.tieGroup ??
          null

      }

    });

  }



  /*
    ============================================================
    BALANCED PERFORMANCE REASON
    ============================================================
  */


  function createBalancedPerformanceReason(
    crop,
    evaluation
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const compatibilityScore =
      getCompatibilityScoreForExplanation(
        evaluation
      );

    const goalScore =
      getGoalScoreForExplanation(
        evaluation
      );

    const usePathScore =
      getUsePathScoreForExplanation(
        evaluation
      );

    if (
      hasExceptionalBalancedPerformance(
        evaluation
      )
    ) {

      return createExplanationMessage({

        id:
          "exceptional-balanced-performance",

        type:
          EXPLANATION_MESSAGE_TYPES
            .STRENGTH,

        category:
          "overall",

        title:
          "Exceptional Overall Balance",

        text:
          `${cropName} performs exceptionally well across growing compatibility, selected goals, and practical use-path value rather than depending on only one strong category`,

        shortText:
          `${cropName} is exceptionally strong across all three primary scoring areas`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          averageKnownValues([

            compatibilityScore,

            goalScore,

            usePathScore

          ]),

        priority:
          97,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        sourcePath:
          "evaluation.compatibility|evaluation.goals|evaluation.usePaths",

        metadata: {

          compatibilityScore,

          goalScore,

          usePathScore

        }

      });

    }

    if (
      hasBalancedStrongPerformance(
        evaluation
      )
    ) {

      return createExplanationMessage({

        id:
          "strong-balanced-performance",

        type:
          EXPLANATION_MESSAGE_TYPES
            .STRENGTH,

        category:
          "overall",

        title:
          "Strong Overall Balance",

        text:
          `${cropName} shows strong, balanced performance across growing compatibility, visitor goals, and practical feeding use`,

        shortText:
          `${cropName} is strong across all primary scoring areas`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          averageKnownValues([

            compatibilityScore,

            goalScore,

            usePathScore

          ]),

        priority:
          91,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        sourcePath:
          "evaluation.compatibility|evaluation.goals|evaluation.usePaths",

        metadata: {

          compatibilityScore,

          goalScore,

          usePathScore

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    COMPATIBILITY SUMMARY REASON
    ============================================================
  */


  function createCompatibilitySummaryReason(
    crop,
    evaluation
  ) {

    const compatibilityScore =
      getCompatibilityScoreForExplanation(
        evaluation
      );

    if (
      !Number.isFinite(
        compatibilityScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const descriptor =
      getPositiveScoreDescriptor(
        compatibilityScore
      );

    if (
      descriptor &&
      compatibilityScore >= 68
    ) {

      const strongestCategories =
        Array.isArray(
          evaluation.compatibility
            ?.strongestCategories
        )
          ? evaluation.compatibility
              .strongestCategories
          : [];

      const categoryLabels =
        strongestCategories
          .slice(
            0,
            3
          )
          .map(
            category =>
              category.label ||
              convertIdentifierToWords(
                category.id
              )
          )
          .filter(
            Boolean
          );

      let text =
        `${cropName} matches your growing conditions ${descriptor}`;

      if (
        categoryLabels.length > 0
      ) {

        text +=
          `, especially in ${joinNaturalLanguageList(
            categoryLabels.map(
              label =>
                label.toLowerCase()
            )
          )}`;

      }

      return createExplanationMessage({

        id:
          "compatibility-summary-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "compatibility",

        title:
          "Growing Compatibility",

        text,

        shortText:
          `${cropName} is a ${getGeneralScoreDescriptor(
            compatibilityScore
          )} match for your growing conditions`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          compatibilityScore,

        priority:
          getPositiveMessagePriority(
            compatibilityScore,
            1.25
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.compatibility
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.compatibility.score",

        sourceValue:
          compatibilityScore,

        metadata: {

          strongestCategories:
            categoryLabels

        }

      });

    }

    if (
      compatibilityScore < 55
    ) {

      return createExplanationMessage({

        id:
          "compatibility-summary-concern",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "compatibility",

        title:
          "Growing Compatibility Limitation",

        text:
          `${cropName} has a weak overall match with one or more important growing conditions in your plan`,

        shortText:
          `${cropName} has limited growing compatibility`,

        severity:
          getConcernSeverity(
            compatibilityScore
          ),

        score:
          compatibilityScore,

        priority:
          getConcernMessagePriority(
            compatibilityScore,
            1.2
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.compatibility
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.compatibility.score",

        sourceValue:
          compatibilityScore

      });

    }

    return null;

  }



  /*
    ============================================================
    GOAL ALIGNMENT SUMMARY REASON
    ============================================================
  */


  function getStrongGoalResultLabels(
    evaluation,
    limit = 3
  ) {

    const possibleCollections = [

      evaluation.goals
        ?.strongGoals,

      evaluation.goals
        ?.goalResults,

      evaluation.goals
        ?.results,

      evaluation.goals
        ?.selectedGoals

    ];

    let goalResults = [];

    for (
      const collection
      of possibleCollections
    ) {

      if (
        Array.isArray(
          collection
        ) &&
        collection.length > 0
      ) {

        goalResults =
          collection;

        break;

      }

    }

    return goalResults
      .filter(
        goal => {

          const score =
            goal.score ??
            goal.alignmentScore;

          return (
            Number.isFinite(
              score
            ) &&
            score >= 72
          );

        }
      )
      .sort(
        (
          first,
          second
        ) => {

          const firstPriority =
            first.weight ??
            first.priority ??
            1;

          const secondPriority =
            second.weight ??
            second.priority ??
            1;

          const weightDifference =
            secondPriority -
            firstPriority;

          if (
            weightDifference !== 0
          ) {
            return weightDifference;
          }

          return (
            (
              second.score ??
              second.alignmentScore ??
              0
            ) -
            (
              first.score ??
              first.alignmentScore ??
              0
            )
          );

        }
      )
      .slice(
        0,
        limit
      )
      .map(
        goal =>
          goal.label ||
          getPlannerGoalLabel?.(
            goal.id ??
            goal.goalId
          ) ||
          getReadableAnswerLabel(
            goal.id ??
            goal.goalId
          )
      )
      .filter(
        Boolean
      );

  }



  function createGoalAlignmentSummaryReason(
    crop,
    evaluation
  ) {

    const goalScore =
      getGoalScoreForExplanation(
        evaluation
      );

    if (
      !Number.isFinite(
        goalScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      goalScore >= 68
    ) {

      const strongGoalLabels =
        getStrongGoalResultLabels(
          evaluation,
          3
        );

      let text =
        `${cropName} aligns ${getPositiveScoreDescriptor(
          goalScore
        ) || "well"} with the priorities you selected`;

      if (
        strongGoalLabels.length > 0
      ) {

        text +=
          `, including ${joinNaturalLanguageList(
            strongGoalLabels.map(
              label =>
                label.toLowerCase()
            )
          )}`;

      }

      return createExplanationMessage({

        id:
          "goal-alignment-summary-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .BENEFIT,

        category:
          "goals",

        title:
          "Goal Alignment",

        text,

        shortText:
          `${cropName} strongly supports your selected goals`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          goalScore,

        priority:
          getPositiveMessagePriority(
            goalScore,
            1.3
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.goals
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.goals.score",

        sourceValue:
          goalScore,

        metadata: {

          strongGoalLabels

        }

      });

    }

    if (
      goalScore < 55
    ) {

      return createExplanationMessage({

        id:
          "goal-alignment-summary-concern",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "goals",

        title:
          "Limited Goal Alignment",

        text:
          `${cropName} provides limited support for the priorities you selected`,

        shortText:
          `${cropName} is weak for your selected goals`,

        severity:
          getConcernSeverity(
            goalScore
          ),

        score:
          goalScore,

        priority:
          getConcernMessagePriority(
            goalScore,
            1.3
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.goals
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.goals.score",

        sourceValue:
          goalScore

      });

    }

    return null;

  }



  /*
    ============================================================
    USE-PATH SUMMARY REASON
    ============================================================
  */


  function getBestUsePathStrengthLabels(
    bestPath,
    limit = 3
  ) {

    if (!bestPath) {
      return [];
    }

    const strengths =
      Array.isArray(
        bestPath.strengths
      )
        ? bestPath.strengths
        : [];

    const strengthLabels =
      strengths
        .map(
          strength => {

            if (
              typeof strength ===
                "string"
            ) {
              return strength;
            }

            return (
              strength.label ??
              strength.title ??
              strength.text ??
              null
            );

          }
        )
        .filter(
          Boolean
        );

    if (
      strengthLabels.length >
        0
    ) {

      return strengthLabels.slice(
        0,
        limit
      );

    }

    const factors =
      Array.isArray(
        bestPath.factors
      )
        ? bestPath.factors
        : [];

    return factors
      .filter(
        factor =>
          Number.isFinite(
            factor.score
          ) &&
          factor.score >= 75
      )
      .sort(
        (
          first,
          second
        ) =>
          second.score -
          first.score
      )
      .slice(
        0,
        limit
      )
      .map(
        factor =>
          factor.label ||
          convertIdentifierToWords(
            factor.id
          )
      )
      .filter(
        Boolean
      );

  }



  function createUsePathSummaryReason(
    crop,
    evaluation
  ) {

    const bestPath =
      getBestUsePathEvaluation(
        evaluation
      );

    if (!bestPath) {

      if (
        isCropEligible(
          evaluation
        )
      ) {

        return createExplanationMessage({

          id:
            "no-practical-use-path-summary",

          type:
            EXPLANATION_MESSAGE_TYPES
              .CONSIDERATION,

          category:
            "use-path",

          title:
            "No Practical Use Path",

          text:
            "No harvest, processing, storage, and feeding pathway remained practical under your selected requirements",

          shortText:
            "No practical use path remained",

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .HIGH,

          score:
            0,

          priority:
            108,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.usePaths.bestPath",

          sourceValue:
            null

        });

      }

      return null;

    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const pathScore =
      Number.isFinite(
        bestPath.score
      )
        ? bestPath.score
        : getUsePathScoreForExplanation(
            evaluation
          );

    const strengthLabels =
      getBestUsePathStrengthLabels(
        bestPath,
        3
      );

    let text =
      `${bestPath.label} was selected as the strongest practical use path for ${cropName}`;

    if (
      strengthLabels.length > 0
    ) {

      text +=
        ` because of its ${joinNaturalLanguageList(
          strengthLabels.map(
            label =>
              lowercaseFirstLetter(
                removeEndingPunctuation(
                  label
                )
              )
          )
        )}`;

    } else if (
      Number.isFinite(
        pathScore
      ) &&
      pathScore >= 70
    ) {

      text +=
        " because it provides a strong balance of processing effort, storage practicality, feeding value, and waste control";

    }

    return createExplanationMessage({

      id:
        "best-use-path-summary",

      type:
        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

      category:
        "use-path",

      title:
        "Best Practical Use",

      text,

      shortText:
        `${bestPath.label} is the strongest practical use path`,

      severity:
        Number.isFinite(
          pathScore
        ) &&
        pathScore >= 68
          ? EXPLANATION_SEVERITY_LEVELS
              .POSITIVE
          : EXPLANATION_SEVERITY_LEVELS
              .NOTICE,

      score:
        pathScore,

      priority:
        Number.isFinite(
          pathScore
        )
          ? getPositiveMessagePriority(
              pathScore,
              1.25
            )
          : 78,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .MIXED,

      evidenceCoverage:
        bestPath.evidenceCoverage,

      sourcePath:
        "evaluation.usePaths.bestPath",

      sourceValue:
        bestPath.id,

      relatedUsePathId:
        bestPath.id,

      metadata: {

        pathLabel:
          bestPath.label,

        strengthLabels,

        eligiblePathCount:
          evaluation.usePaths
            ?.eligiblePaths
            ?.length ??
          null

      }

    });

  }



  /*
    ============================================================
    RISK BALANCE SUMMARY REASON
    ============================================================
  */


  function createRiskBalanceSummaryReason(
    crop,
    evaluation
  ) {

    const riskScore =
      getRiskSafetyScoreForExplanation(
        evaluation
      );

    if (
      !Number.isFinite(
        riskScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const riskAdjustment =
      evaluation.risks
        ?.adjustment;

    const primaryRiskCount =
      Array.isArray(
        evaluation.risks
          ?.primaryRisks
      )
        ? evaluation.risks
            .primaryRisks
            .length
        : 0;

    if (
      riskScore >= 78 &&
      (
        !Number.isFinite(
          riskAdjustment
        ) ||
        riskAdjustment > -4
      )
    ) {

      return createExplanationMessage({

        id:
          "manageable-overall-risk",

        type:
          EXPLANATION_MESSAGE_TYPES
            .STRENGTH,

        category:
          "risk",

        title:
          "Manageable Overall Risk",

        text:
          `${cropName} retains most of its practical value after wildlife, weather, harvest, storage, establishment, and flock-use risks are considered`,

        shortText:
          `${cropName} has a generally manageable overall risk profile`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          riskScore,

        priority:
          getPositiveMessagePriority(
            riskScore,
            0.9
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.risks
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.risks.score",

        sourceValue:
          riskScore,

        metadata: {

          riskAdjustment,

          primaryRiskCount

        }

      });

    }

    if (
      riskScore < 55 ||
      (
        Number.isFinite(
          riskAdjustment
        ) &&
        riskAdjustment <= -7
      )
    ) {

      return createExplanationMessage({

        id:
          "meaningful-overall-risk",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "risk",

        title:
          "Meaningful Risk Burden",

        text:
          `${cropName} loses meaningful practical value after its major growing, harvest, storage, or feeding risks are considered`,

        shortText:
          `${cropName} carries a meaningful overall risk burden`,

        severity:
          getConcernSeverity(
            riskScore
          ),

        score:
          riskScore,

        priority:
          getRiskMessagePriority(
            riskScore,
            1.2
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          evaluation.risks
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.risks.score",

        sourceValue:
          riskScore,

        metadata: {

          riskAdjustment,

          primaryRiskCount

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    CONFIDENCE SUMMARY REASON
    ============================================================
  */


  function createConfidenceSummaryReason(
    crop,
    evaluation
  ) {

    const confidenceScore =
      getConfidenceScoreForExplanation(
        evaluation
      );

    if (
      !Number.isFinite(
        confidenceScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const confidenceLabel =
      evaluation.confidence
        ?.levelLabel ||
      getConfidenceLevelLabel(
        getConfidenceLevel(
          confidenceScore
        )
      );

    if (
      confidenceScore >= 78
    ) {

      const strengthMessages =
        Array.isArray(
          evaluation.confidence
            ?.strengths
        )
          ? evaluation.confidence
              .strengths
          : [];

      const reasonLabels =
        strengthMessages
          .slice(
            0,
            3
          )
          .map(
            strength =>
              strength.label ||
              strength.message
          )
          .filter(
            Boolean
          );

      let text =
        `The ${cropName} recommendation is supported by ${confidenceLabel.toLowerCase()}`;

      if (
        reasonLabels.length > 0
      ) {

        text +=
          `, including ${joinNaturalLanguageList(
            reasonLabels.map(
              label =>
                lowercaseFirstLetter(
                  removeEndingPunctuation(
                    label
                  )
                )
            )
          )}`;

      }

      return createExplanationMessage({

        id:
          "confidence-summary-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONFIDENCE,

        category:
          "confidence",

        title:
          confidenceLabel,

        text,

        shortText:
          `${confidenceLabel} supports this recommendation`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          confidenceScore,

        priority:
          getPositiveMessagePriority(
            confidenceScore,
            0.85
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          evaluation.confidence
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.confidence.score",

        sourceValue:
          confidenceScore,

        metadata: {

          reasonLabels

        }

      });

    }

    if (
      confidenceScore < 60
    ) {

      return createExplanationMessage({

        id:
          "confidence-summary-limitation",

        type:
          EXPLANATION_MESSAGE_TYPES
            .UNCERTAINTY,

        category:
          "confidence",

        title:
          confidenceLabel,

        text:
          `The calculated result for ${cropName} should be treated cautiously because recommendation confidence is limited`,

        shortText:
          `Recommendation confidence is limited`,

        severity:
          getConcernSeverity(
            confidenceScore
          ),

        score:
          confidenceScore,

        priority:
          getConcernMessagePriority(
            confidenceScore,
            1
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          evaluation.confidence
            ?.evidenceCoverage,

        sourcePath:
          "evaluation.confidence.score",

        sourceValue:
          confidenceScore

      });

    }

    return null;

  }



  /*
    ============================================================
    STRONGEST COMPONENT REASON
    ============================================================
  */


  function getPrimaryScoreComponentsForExplanation(
    evaluation
  ) {

    return [

      {

        id:
          "compatibility",

        label:
          "growing compatibility",

        score:
          getCompatibilityScoreForExplanation(
            evaluation
          )

      },

      {

        id:
          "goals",

        label:
          "goal alignment",

        score:
          getGoalScoreForExplanation(
            evaluation
          )

      },

      {

        id:
          "use-path",

        label:
          "use-path practicality",

        score:
          getUsePathScoreForExplanation(
            evaluation
          )

      }

    ].filter(
      component =>
        Number.isFinite(
          component.score
        )
    );

  }



  function createStrongestComponentReason(
    crop,
    evaluation
  ) {

    if (
      !isCropEligible(
        evaluation
      )
    ) {
      return null;
    }

    const components =
      getPrimaryScoreComponentsForExplanation(
        evaluation
      );

    if (
      components.length === 0
    ) {
      return null;
    }

    const sortedComponents =
      components
        .slice()
        .sort(
          (
            first,
            second
          ) =>
            second.score -
            first.score
        );

    const strongestComponent =
      sortedComponents[0];

    if (
      strongestComponent.score <
        72
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    let text = null;

    switch (
      strongestComponent.id
    ) {

      case "compatibility":

        text =
          `${cropName}'s strongest overall advantage is how well it matches your climate, site, soil, water, space, flock, labor, and storage conditions`;

        break;

      case "goals":

        text =
          `${cropName}'s strongest overall advantage is how well it supports the priorities you selected for the planner`;

        break;

      case "use-path":

        text =
          `${cropName}'s strongest overall advantage is the practicality of converting the harvested crop into a useful flock supplement`;

        break;

      default:

        return null;

    }

    return createExplanationMessage({

      id:
        `strongest-primary-component-${strongestComponent.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .STRENGTH,

      category:
        strongestComponent.id,

      title:
        "Strongest Overall Advantage",

      text,

      shortText:
        `${convertIdentifierToWords(
          strongestComponent.id
        )} is the crop's strongest scoring area`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE,

      score:
        strongestComponent.score,

      priority:
        getPositiveMessagePriority(
          strongestComponent.score,
          1.1
        ),

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .MIXED,

      sourcePath:
        `evaluation.${strongestComponent.id}.score`,

      sourceValue:
        strongestComponent.score,

      metadata: {

        componentId:
          strongestComponent.id,

        componentLabel:
          strongestComponent.label

      }

    });

  }



  /*
    ============================================================
    LIMITING COMPONENT REASON
    ============================================================
  */


  function createLimitingComponentReason(
    crop,
    evaluation
  ) {

    const components =
      getPrimaryScoreComponentsForExplanation(
        evaluation
      );

    if (
      components.length === 0
    ) {
      return null;
    }

    const sortedComponents =
      components
        .slice()
        .sort(
          (
            first,
            second
          ) =>
            first.score -
            second.score
        );

    const weakestComponent =
      sortedComponents[0];

    if (
      weakestComponent.score >=
        58
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    let concernText = null;

    switch (
      weakestComponent.id
    ) {

      case "compatibility":

        concernText =
          `${cropName}'s final result is limited by weak compatibility with one or more of your growing or management conditions`;

        break;

      case "goals":

        concernText =
          `${cropName}'s final result is limited because it does not strongly support several of your selected priorities`;

        break;

      case "use-path":

        concernText =
          `${cropName}'s final result is limited by the difficulty of harvesting, processing, storing, or feeding the crop efficiently`;

        break;

      default:

        return null;

    }

    return createExplanationMessage({

      id:
        `limiting-primary-component-${weakestComponent.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        weakestComponent.id,

      title:
        "Primary Limiting Factor",

      text:
        concernText,

      shortText:
        `${convertIdentifierToWords(
          weakestComponent.id
        )} is the main limiting factor`,

      severity:
        getConcernSeverity(
          weakestComponent.score
        ),

      score:
        weakestComponent.score,

      priority:
        getConcernMessagePriority(
          weakestComponent.score,
          1.25
        ),

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .MIXED,

      sourcePath:
        `evaluation.${weakestComponent.id}.score`,

      sourceValue:
        weakestComponent.score,

      metadata: {

        componentId:
          weakestComponent.id,

        componentLabel:
          weakestComponent.label

      }

    });

  }



  /*
    ============================================================
    FLEXIBLE USE-PATH REASON
    ============================================================
  */


  function createUsePathFlexibilityReason(
    crop,
    evaluation
  ) {

    const eligiblePaths =
      evaluation.usePaths
        ?.eligiblePaths;

    if (
      !Array.isArray(
        eligiblePaths
      ) ||
      eligiblePaths.length < 2
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const pathLabels =
      eligiblePaths
        .slice(
          0,
          4
        )
        .map(
          path =>
            path.label
        )
        .filter(
          Boolean
        );

    let text =
      `${cropName} provides more than one practical harvest and feeding option`;

    if (
      pathLabels.length >= 2
    ) {

      text +=
        `, including ${joinNaturalLanguageList(
          pathLabels
        )}`;

    }

    return createExplanationMessage({

      id:
        "use-path-flexibility",

      type:
        EXPLANATION_MESSAGE_TYPES
          .BENEFIT,

      category:
        "use-path",

      title:
        "Use-Path Flexibility",

      text,

      shortText:
        `${cropName} provides ${eligiblePaths.length} eligible use paths`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE,

      score:
        eligiblePaths.length >= 4
          ? 92
          : eligiblePaths.length === 3
            ? 84
            : 74,

      priority:
        eligiblePaths.length >= 4
          ? 88
          : eligiblePaths.length === 3
            ? 82
            : 76,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        "evaluation.usePaths.eligiblePaths",

      sourceValue:
        eligiblePaths.length,

      metadata: {

        pathIds:
          eligiblePaths.map(
            path =>
              path.id
          ),

        pathLabels

      }

    });

  }



  /*
    ============================================================
    SINGLE USE-PATH LIMITATION
    ============================================================
  */


  function createSingleUsePathReason(
    crop,
    evaluation
  ) {

    const eligiblePaths =
      evaluation.usePaths
        ?.eligiblePaths;

    if (
      !Array.isArray(
        eligiblePaths
      ) ||
      eligiblePaths.length !==
        1
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const onlyPath =
      eligiblePaths[0];

    return createExplanationMessage({

      id:
        "single-use-path-limitation",

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        "use-path",

      title:
        "Limited Use-Path Flexibility",

      text:
        `${cropName} has only one practical use path under your selected processing, equipment, drying, storage, and feeding requirements`,

      shortText:
        `${onlyPath.label || "One use path"} is the only practical option`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        Number.isFinite(
          onlyPath.score
        )
          ? onlyPath.score
          : null,

      priority:
        72,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        "evaluation.usePaths.eligiblePaths",

      sourceValue:
        1,

      relatedUsePathId:
        onlyPath.id,

      metadata: {

        onlyPathId:
          onlyPath.id,

        onlyPathLabel:
          onlyPath.label

      }

    });

  }



  /*
    ============================================================
    RANKING STABILITY REASON
    ============================================================
  */


  function createRankingStabilityReason(
    crop,
    evaluation
  ) {

    const stability =
      evaluation.final
        ?.stability;

    const stabilityScore =
      stability?.score;

    if (
      !Number.isFinite(
        stabilityScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      stabilityScore >= 76
    ) {

      return createExplanationMessage({

        id:
          "stable-ranking",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONFIDENCE,

        category:
          "ranking",

        title:
          stability.levelLabel ||
          "Stable Ranking",

        text:
          `${cropName}'s ranking is relatively stable because its supporting evidence is consistent and its position is not overly dependent on a single uncertain factor`,

        shortText:
          `${cropName}'s ranking is stable`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          stabilityScore,

        priority:
          68,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        sourcePath:
          "evaluation.final.stability.score",

        sourceValue:
          stabilityScore,

        metadata: {

          nearestCompetitorMargin:
            stability
              .nearestCompetitorMargin ??
            null,

          rankMovementRisk:
            stability
              .rankMovementRisk ??
            null

        }

      });

    }

    if (
      stabilityScore < 55
    ) {

      return createExplanationMessage({

        id:
          "sensitive-ranking",

        type:
          EXPLANATION_MESSAGE_TYPES
            .UNCERTAINTY,

        category:
          "ranking",

        title:
          stability.levelLabel ||
          "Ranking Sensitivity",

        text:
          `${cropName}'s exact ranking could change as missing data is verified or as small score differences between nearby crops are resolved`,

        shortText:
          `${cropName}'s exact rank is sensitive to additional evidence`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .NOTICE,

        score:
          stabilityScore,

        priority:
          getConcernMessagePriority(
            stabilityScore,
            0.8
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        sourcePath:
          "evaluation.final.stability.score",

        sourceValue:
          stabilityScore,

        metadata: {

          nearestCompetitorMargin:
            stability
              .nearestCompetitorMargin ??
            null,

          rankMovementRisk:
            stability
              .rankMovementRisk ??
            null

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    HIGH SCORE WITH LIMITED CONFIDENCE
    ============================================================
  */


  function createHighScoreLimitedConfidenceReason(
    crop,
    evaluation
  ) {

    const flags =
      evaluation.final
        ?.flags;

    if (
      !Array.isArray(
        flags
      ) ||
      !flags.includes(
        "high-score-limited-confidence"
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const suitabilityScore =
      getFinalSuitabilityScore(
        evaluation
      );

    const confidenceScore =
      getConfidenceScoreForExplanation(
        evaluation
      );

    return createExplanationMessage({

      id:
        "high-score-limited-confidence",

      type:
        EXPLANATION_MESSAGE_TYPES
          .UNCERTAINTY,

      category:
        "confidence",

      title:
        "Strong Score, Limited Certainty",

      text:
        `${cropName} has a strong calculated suitability score, but the result is supported by less evidence than the score alone may suggest`,

      shortText:
        `${cropName} scores well but has limited recommendation confidence`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .MODERATE,

      score:
        confidenceScore,

      priority:
        94,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.final.flags",

      sourceValue:
        "high-score-limited-confidence",

      metadata: {

        suitabilityScore,

        confidenceScore

      }

    });

  }



  /*
    ============================================================
    CONFIDENT POOR FIT
    ============================================================
  */


  function createConfidentPoorFitReason(
    crop,
    evaluation
  ) {

    const flags =
      evaluation.final
        ?.flags;

    if (
      !Array.isArray(
        flags
      ) ||
      !flags.includes(
        "confident-poor-fit"
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    return createExplanationMessage({

      id:
        "confident-poor-fit",

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        "overall",

      title:
        "Well-Supported Poor Fit",

      text:
        `The engine has strong evidence that ${cropName} is a weak overall match for the selected plan`,

      shortText:
        `${cropName} is a confidently identified poor fit`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .HIGH,

      score:
        getFinalSuitabilityScore(
          evaluation
        ),

      priority:
        100,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.final.flags",

      sourceValue:
        "confident-poor-fit"

    });

  }



  /*
    ============================================================
    RISK-ADJUSTED VALUE REASON
    ============================================================
  */


  function createRiskAdjustedValueReason(
    crop,
    evaluation
  ) {

    const baseScore =
      evaluation.final
        ?.baseScore;

    const finalScore =
      getFinalSuitabilityScore(
        evaluation
      );

    const riskAdjustment =
      evaluation.final
        ?.riskAdjustment;

    if (
      !Number.isFinite(
        baseScore
      ) ||
      !Number.isFinite(
        finalScore
      ) ||
      !Number.isFinite(
        riskAdjustment
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      riskAdjustment >= -3
    ) {

      return createExplanationMessage({

        id:
          "limited-risk-reduction",

        type:
          EXPLANATION_MESSAGE_TYPES
            .STRENGTH,

        category:
          "risk",

        title:
          "Strong Risk-Adjusted Value",

        text:
          `${cropName} retains nearly all of its base suitability after practical risks are applied`,

        shortText:
          `${cropName} retains strong value after risk adjustment`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          finalScore,

        priority:
          70,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        sourcePath:
          "evaluation.final.riskAdjustment",

        sourceValue:
          riskAdjustment,

        metadata: {

          baseScore,

          finalScore,

          riskAdjustment

        }

      });

    }

    if (
      riskAdjustment <= -7
    ) {

      return createExplanationMessage({

        id:
          "substantial-risk-reduction",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "risk",

        title:
          "Substantial Risk Adjustment",

        text:
          `${cropName}'s base suitability is reduced substantially after practical growing, harvest, storage, and feeding risks are applied`,

        shortText:
          `Risk reduces ${cropName}'s final suitability substantially`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .HIGH,

        score:
          finalScore,

        priority:
          91,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        sourcePath:
          "evaluation.final.riskAdjustment",

        sourceValue:
          riskAdjustment,

        metadata: {

          baseScore,

          finalScore,

          riskAdjustment

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    PRIMARY REASON SELECTION

    This prepares candidate reasons and keeps the strongest,
    most useful messages.

    Rejected and unsupported crops intentionally receive fewer
    positive reasons.
    ============================================================
  */


  function createPrimaryRecommendationReasonCandidates(
    crop,
    evaluation
  ) {

    const candidates = [

      createRecommendationStatusReason(
        crop,
        evaluation
      ),

      createRankingPositionReason(
        crop,
        evaluation
      ),

      createBalancedPerformanceReason(
        crop,
        evaluation
      ),

      createCompatibilitySummaryReason(
        crop,
        evaluation
      ),

      createGoalAlignmentSummaryReason(
        crop,
        evaluation
      ),

      createUsePathSummaryReason(
        crop,
        evaluation
      ),

      createRiskBalanceSummaryReason(
        crop,
        evaluation
      ),

      createConfidenceSummaryReason(
        crop,
        evaluation
      ),

      createStrongestComponentReason(
        crop,
        evaluation
      ),

      createLimitingComponentReason(
        crop,
        evaluation
      ),

      createUsePathFlexibilityReason(
        crop,
        evaluation
      ),

      createSingleUsePathReason(
        crop,
        evaluation
      ),

      createRankingStabilityReason(
        crop,
        evaluation
      ),

      createHighScoreLimitedConfidenceReason(
        crop,
        evaluation
      ),

      createConfidentPoorFitReason(
        crop,
        evaluation
      ),

      createRiskAdjustedValueReason(
        crop,
        evaluation
      )

    ].filter(
      isValidExplanationMessage
    );

    return candidates;

  }



  function separatePrimaryRecommendationCandidates(
    candidates
  ) {

    const positiveTypes =
      new Set([

        EXPLANATION_MESSAGE_TYPES
          .STRENGTH,

        EXPLANATION_MESSAGE_TYPES
          .MATCH,

        EXPLANATION_MESSAGE_TYPES
          .BENEFIT,

        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

        EXPLANATION_MESSAGE_TYPES
          .CONFIDENCE

      ]);

    const positive = [];
    const cautionary = [];
    const rejection = [];

    candidates.forEach(
      message => {

        if (
          message.type ===
            EXPLANATION_MESSAGE_TYPES
              .REJECTION
        ) {

          rejection.push(
            message
          );

          return;

        }

        if (
          positiveTypes.has(
            message.type
          ) &&
          (
            message.severity ===
              EXPLANATION_SEVERITY_LEVELS
                .POSITIVE ||
            message.severity ===
              EXPLANATION_SEVERITY_LEVELS
                .NEUTRAL
          )
        ) {

          positive.push(
            message
          );

          return;

        }

        cautionary.push(
          message
        );

      }
    );

    return {

      positive,

      cautionary,

      rejection

    };

  }



  /*
    ============================================================
    PRIMARY WHY-RECOMMENDED COLLECTION

    Positive recommendation messages populate whyRecommended.

    Cautionary messages are also copied into considerations.

    Rejection messages are copied into rejectedReasons.
    ============================================================
  */


  function generatePrimaryRecommendationReasons(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const candidates =
      createPrimaryRecommendationReasonCandidates(
        crop,
        evaluation
      );

    const groupedCandidates =
      separatePrimaryRecommendationCandidates(
        candidates
      );

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    let whyRecommended = [];

    if (
      status ===
        "rejected" ||
      status ===
        "no-practical-use-path" ||
      status ===
        "not-recommended"
    ) {

      /*
        Keep only objective summary messages for crops that are
        excluded or not recommended.
      */

      whyRecommended =
        groupedCandidates
          .positive
          .filter(
            message =>
              message.id ===
                "ranking-position" ||
              message.id ===
                "compatibility-summary-strength" ||
              message.id ===
                "goal-alignment-summary-strength"
          )
          .slice(
            0,
            2
          );

    } else {

      whyRecommended =
        prepareExplanationMessages(
          groupedCandidates.positive,
          {
            limit:
              7,

            similarityThreshold:
              0.68
          }
        );

    }

    addExplanationMessages(
      explanation.whyRecommended,
      whyRecommended
    );

    addExplanationMessages(
      explanation.considerations,
      groupedCandidates.cautionary
    );

    addExplanationMessages(
      explanation.rejectedReasons,
      groupedCandidates.rejection
    );

    explanation.metadata = {

      ...explanation.metadata,

      part12BGenerated:
        true,

      primaryReasonCandidateCount:
        candidates.length,

      primaryPositiveReasonCount:
        whyRecommended.length,

      primaryCautionCount:
        groupedCandidates
          .cautionary
          .length,

      primaryRejectionCount:
        groupedCandidates
          .rejection
          .length,

      overallStrengthScore:
        getOverallRecommendationStrengthScore(
          evaluation
        ),

      strongPrimaryPhaseCount:
        countStrongPrimaryPhases(
          evaluation
        ),

      weakPrimaryPhaseCount:
        countWeakPrimaryPhases(
          evaluation
        )

    };

    return explanation;

  }



  /*
    ============================================================
    PRIMARY SUMMARY SENTENCE HELPERS
    ============================================================
  */


  function getTopPrimaryReasonMessages(
    explanation,
    limit = 3
  ) {

    return prepareExplanationMessages(
      explanation.whyRecommended,
      {
        limit,

        similarityThreshold:
          0.66
      }
    );

  }



  function createPrimaryReasonSummaryClause(
    explanation
  ) {

    const messages =
      getTopPrimaryReasonMessages(
        explanation,
        3
      );

    if (
      messages.length === 0
    ) {
      return null;
    }

    const fragments =
      messages.map(
        message =>
          lowercaseFirstLetter(
            removeEndingPunctuation(
              message.shortText ||
              message.text
            )
          )
      )
      .filter(
        Boolean
      );

    if (
      fragments.length === 0
    ) {
      return null;
    }

    return joinNaturalLanguageList(
      fragments
    );

  }



  function createPart12BShortNarrative(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    const reasonClause =
      createPrimaryReasonSummaryClause(
        explanation
      );

    if (
      status ===
        "rejected"
    ) {

      return ensureEndingPeriod(
        `${cropName} is not eligible for this plan because it failed one or more required conditions`
      );

    }

    if (
      status ===
        "no-practical-use-path"
    ) {

      return ensureEndingPeriod(
        `${cropName} does not have a practical harvest-to-feeding use path under your selected requirements`
      );

    }

    if (
      status ===
        "not-recommended"
    ) {

      return ensureEndingPeriod(
        `${cropName} is not recommended because its combined compatibility, goal value, and practical use are too limited`
      );

    }

    if (
      reasonClause
    ) {

      return ensureEndingPeriod(
        `${cropName} is recommended because ${reasonClause}`
      );

    }

    return createBasicRecommendationSummary(
      crop,
      evaluation
    );

  }



  /*
    ============================================================
    PART 12B ORCHESTRATOR

    Call after:

      initializeRecommendationExplanation()

    Parts 12C and 12D will add further explanation collections
    before the final framework finalizer is called.
    ============================================================
  */


  function evaluatePrimaryRecommendationExplanation(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    generatePrimaryRecommendationReasons(
      crop,
      answers,
      evaluation
    );

    explanation.summary =
      createPart12BShortNarrative(
        crop,
        evaluation,
        explanation
      );

    explanation.metadata = {

      ...explanation.metadata,

      part12BComplete:
        true

    };

    return explanation;

  }

    /*
    ============================================================
    PHASE 8
    RECOMMENDATION EXPLANATION

    PART 12C
    COMPATIBILITY, GOAL, AND USE-PATH EXPLANATIONS

    This section creates detailed visitor-facing explanations
    for:

      - climate compatibility;
      - site compatibility;
      - soil compatibility;
      - water compatibility;
      - space compatibility;
      - flock compatibility;
      - labor compatibility;
      - harvest and storage compatibility;
      - selected planner goals;
      - nutritional roles;
      - best use-path selection;
      - use-path strengths;
      - processing requirements;
      - equipment requirements;
      - drying and storage requirements;
      - alternate eligible use paths.

    Part 12D will add:

      - detailed risk explanations;
      - mitigations;
      - confidence narratives;
      - uncertainties;
      - exact rejection reasons;
      - final detailed summaries.
    ============================================================
  */


  /*
    ============================================================
    COMPATIBILITY CATEGORY LABELS
    ============================================================
  */


  function getCompatibilityExplanationLabel(
    categoryId
  ) {

    const labelMap = {

      climate:
        "Climate",

      site:
        "Sunlight and Site",

      soil:
        "Soil",

      water:
        "Water",

      space:
        "Available Growing Space",

      flock:
        "Flock Fit",

      labor:
        "Labor and Experience",

      harvestStorage:
        "Harvest and Storage",

      "harvest-storage":
        "Harvest and Storage"

    };

    return (
      labelMap[
        categoryId
      ] ||
      convertIdentifierToWords(
        categoryId
      ) ||
      "Compatibility"
    );

  }



  function getCompatibilityExplanationSubject(
    categoryId
  ) {

    const subjectMap = {

      climate:
        "Your climate and growing season",

      site:
        "Your sunlight and site conditions",

      soil:
        "Your soil conditions",

      water:
        "Your available water and irrigation habits",

      space:
        "Your available growing space",

      flock:
        "Your flock size and feeding system",

      labor:
        "Your available labor, experience, and equipment",

      harvestStorage:
        "Your harvest, drying, and storage setup",

      "harvest-storage":
        "Your harvest, drying, and storage setup"

    };

    return (
      subjectMap[
        categoryId
      ] ||
      `Your ${lowercaseFirstLetter(
        getCompatibilityExplanationLabel(
          categoryId
        )
      )}`
    );

  }



  /*
    ============================================================
    COMPATIBILITY RESULT NORMALIZATION
    ============================================================
  */


  function getCompatibilityCategoryResultsForExplanation(
    evaluation
  ) {

    const categoryResults =
      evaluation.compatibility
        ?.categoryResults;

    if (
      Array.isArray(
        categoryResults
      )
    ) {

      return categoryResults.filter(
        result =>
          result &&
          typeof result ===
            "object"
      );

    }

    if (
      categoryResults &&
      typeof categoryResults ===
        "object"
    ) {

      return Object.entries(
        categoryResults
      ).map(
        (
          [
            categoryId,
            result
          ]
        ) => {

          if (
            result &&
            typeof result ===
              "object"
          ) {

            return {

              id:
                result.id ||
                categoryId,

              ...result

            };

          }

          return {

            id:
              categoryId,

            score:
              Number.isFinite(
                result
              )
                ? result
                : null

          };

        }
      );

    }

    return [];

  }



  function getCompatibilityFactorResults(
    categoryResult
  ) {

    if (
      !categoryResult ||
      typeof categoryResult !==
        "object"
    ) {
      return [];
    }

    const possibleCollections = [

      categoryResult.factors,

      categoryResult.factorResults,

      categoryResult.results,

      categoryResult.details,

      categoryResult.evidence
        ?.factors

    ];

    for (
      const collection
      of possibleCollections
    ) {

      if (
        Array.isArray(
          collection
        )
      ) {

        return collection.filter(
          factor =>
            factor &&
            typeof factor ===
              "object"
        );

      }

      if (
        collection &&
        typeof collection ===
          "object"
      ) {

        return Object.entries(
          collection
        ).map(
          (
            [
              factorId,
              factor
            ]
          ) => {

            if (
              factor &&
              typeof factor ===
                "object"
            ) {

              return {

                id:
                  factor.id ||
                  factorId,

                ...factor

              };

            }

            return {

              id:
                factorId,

              score:
                Number.isFinite(
                  factor
                )
                  ? factor
                  : null

            };

          }
        );

      }

    }

    return [];

  }



  function getCompatibilityFactorLabel(
    factor
  ) {

    return (

      factor?.label ??

      factor?.title ??

      convertIdentifierToWords(
        factor?.id
      ) ??

      "Compatibility factor"

    );

  }



  function getCompatibilityFactorScore(
    factor
  ) {

    const possibleScores = [

      factor?.score,

      factor?.compatibilityScore,

      factor?.suitabilityScore,

      factor?.adjustedScore,

      factor?.value

    ];

    return possibleScores.find(
      Number.isFinite
    ) ?? null;

  }



  function getCompatibilityFactorEvidenceCoverage(
    factor,
    categoryResult
  ) {

    const possibleValues = [

      factor?.evidenceCoverage,

      factor?.coverage,

      categoryResult
        ?.evidenceCoverage

    ];

    return possibleValues.find(
      Number.isFinite
    ) ?? null;

  }



  function getCompatibilityFactorVisitorValue(
    factor
  ) {

    return (

      factor?.visitorValue ??

      factor?.userValue ??

      factor?.answerValue ??

      factor?.metadata
        ?.visitorValue ??

      factor?.metadata
        ?.userValue ??

      null

    );

  }



  function getCompatibilityFactorCropValue(
    factor
  ) {

    return (

      factor?.cropValue ??

      factor?.requirementValue ??

      factor?.preferredValue ??

      factor?.metadata
        ?.cropValue ??

      factor?.metadata
        ?.requirementValue ??

      null

    );

  }



  function getCompatibilityFactorExplanation(
    factor
  ) {

    return normalizeExplanationText(

      factor?.explanation ??

      factor?.reason ??

      factor?.message ??

      factor?.strengthMessage ??

      factor?.concernMessage ??

      factor?.metadata
        ?.explanation

    );

  }



  /*
    ============================================================
    EXPLANATION VALUE FORMATTING
    ============================================================
  */


  function formatExplanationValue(
    value,
    options = {}
  ) {

    if (
      value === null ||
      value === undefined
    ) {
      return null;
    }

    if (
      Number.isFinite(
        value
      )
    ) {

      if (
        options.unit ===
          "days"
      ) {

        return formatDaysForExplanation(
          value
        );

      }

      if (
        options.unit ===
          "months"
      ) {

        return formatMonthsForExplanation(
          value
        );

      }

      if (
        options.unit ===
          "square-feet"
      ) {

        return formatSquareFeetForExplanation(
          value
        );

      }

      if (
        options.unit ===
          "hours"
      ) {

        return `${formatNumberForExplanation(
          value,
          1
        )} ${
          value === 1
            ? "hour"
            : "hours"
        }`;

      }

      if (
        options.unit ===
          "inches"
      ) {

        return `${formatNumberForExplanation(
          value,
          1
        )} ${
          value === 1
            ? "inch"
            : "inches"
        }`;

      }

      if (
        options.unit ===
          "percent"
      ) {

        return formatPercentForExplanation(
          value
        );

      }

      return formatNumberForExplanation(
        value,
        options.maximumDecimals ??
          1
      );

    }

    if (
      typeof value ===
        "boolean"
    ) {

      return value
        ? "yes"
        : "no";

    }

    if (
      Array.isArray(
        value
      )
    ) {

      return joinNaturalLanguageList(
        value
          .map(
            item =>
              typeof item ===
                "string"
                ? getReadableAnswerLabel(
                    item
                  )
                : String(
                    item
                  )
          )
          .filter(
            Boolean
          )
      );

    }

    if (
      typeof value ===
        "string"
    ) {

      return (
        getReadableAnswerLabel(
          value
        ) ||
        value
      );

    }

    return null;

  }



  function inferExplanationValueUnit(
    factorId
  ) {

    const normalizedId =
      String(
        factorId || ""
      ).toLowerCase();

    if (
      normalizedId.includes(
        "day"
      ) ||
      normalizedId.includes(
        "season-length"
      ) ||
      normalizedId.includes(
        "maturity"
      )
    ) {
      return "days";
    }

    if (
      normalizedId.includes(
        "month"
      ) ||
      normalizedId.includes(
        "storage-duration"
      )
    ) {
      return "months";
    }

    if (
      normalizedId.includes(
        "area"
      ) ||
      normalizedId.includes(
        "square-feet"
      )
    ) {
      return "square-feet";
    }

    if (
      normalizedId.includes(
        "sun"
      ) &&
      normalizedId.includes(
        "hour"
      )
    ) {
      return "hours";
    }

    if (
      normalizedId.includes(
        "depth"
      )
    ) {
      return "inches";
    }

    if (
      normalizedId.includes(
        "percent"
      ) ||
      normalizedId.includes(
        "waste"
      )
    ) {
      return "percent";
    }

    return null;

  }



  /*
    ============================================================
    GENERIC COMPATIBILITY FACTOR MESSAGE
    ============================================================
  */


  function createCompatibilityFactorMessage(
    crop,
    evaluation,
    categoryResult,
    factor
  ) {

    const factorScore =
      getCompatibilityFactorScore(
        factor
      );

    if (
      !Number.isFinite(
        factorScore
      )
    ) {
      return null;
    }

    const categoryId =
      categoryResult.id ||
      "compatibility";

    const categoryLabel =
      getCompatibilityExplanationLabel(
        categoryId
      );

    const factorLabel =
      getCompatibilityFactorLabel(
        factor
      );

    const visitorValue =
      getCompatibilityFactorVisitorValue(
        factor
      );

    const cropValue =
      getCompatibilityFactorCropValue(
        factor
      );

    const explanationText =
      getCompatibilityFactorExplanation(
        factor
      );

    const unit =
      inferExplanationValueUnit(
        factor.id
      );

    const formattedVisitorValue =
      formatExplanationValue(
        visitorValue,
        {
          unit
        }
      );

    const formattedCropValue =
      formatExplanationValue(
        cropValue,
        {
          unit
        }
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const evidenceCoverage =
      getCompatibilityFactorEvidenceCoverage(
        factor,
        categoryResult
      );

    if (
      factorScore >= 68
    ) {

      let text = null;

      if (
        explanationText
      ) {

        text =
          explanationText;

      } else if (
        formattedVisitorValue &&
        formattedCropValue
      ) {

        text =
          `${factorLabel} is a strong match because your value of ${formattedVisitorValue} fits the crop's preferred or acceptable value of ${formattedCropValue}`;

      } else if (
        formattedVisitorValue
      ) {

        text =
          `${factorLabel} is a strong match for your selected condition of ${formattedVisitorValue}`;

      } else {

        text =
          `${cropName} scores ${getPositiveScoreDescriptor(
            factorScore
          ) || "well"} for ${factorLabel.toLowerCase()}`;

      }

      return createExplanationMessage({

        id:
          `compatibility-${categoryId}-${factor.id || normalizeMessageForComparison(
            factorLabel
          )}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          categoryId,

        title:
          factorLabel,

        text,

        shortText:
          `${factorLabel} is a strong match`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getPositiveMessagePriority(
            factorScore,
            factor.weight ??
              1
          ),

        evidenceType:
          visitorValue !==
            null &&
          cropValue !==
            null
            ? EXPLANATION_EVIDENCE_TYPES
                .DIRECT
            : EXPLANATION_EVIDENCE_TYPES
                .DERIVED,

        evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.compatibility.${categoryId}.${factor.id || "factor"}`,

        sourceValue:
          factorScore,

        relatedCompatibilityId:
          categoryId,

        visitorValue,

        cropValue,

        metadata: {

          categoryLabel,

          factorId:
            factor.id ||
            null,

          factorLabel

        }

      });

    }

    if (
      factorScore < 58
    ) {

      let text = null;

      if (
        factor.concernMessage
      ) {

        text =
          factor.concernMessage;

      } else if (
        explanationText
      ) {

        text =
          explanationText;

      } else if (
        formattedVisitorValue &&
        formattedCropValue
      ) {

        text =
          `${factorLabel} is a limitation because your value of ${formattedVisitorValue} does not closely match the crop's preferred or required value of ${formattedCropValue}`;

      } else if (
        formattedVisitorValue
      ) {

        text =
          `${factorLabel} is a limitation under your selected condition of ${formattedVisitorValue}`;

      } else {

        text =
          `${cropName} has limited compatibility for ${factorLabel.toLowerCase()}`;

      }

      return createExplanationMessage({

        id:
          `compatibility-concern-${categoryId}-${factor.id || normalizeMessageForComparison(
            factorLabel
          )}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          categoryId,

        title:
          factorLabel,

        text,

        shortText:
          `${factorLabel} is a compatibility concern`,

        severity:
          getConcernSeverity(
            factorScore
          ),

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getConcernMessagePriority(
            factorScore,
            factor.weight ??
              1
          ),

        evidenceType:
          visitorValue !==
            null &&
          cropValue !==
            null
            ? EXPLANATION_EVIDENCE_TYPES
                .DIRECT
            : EXPLANATION_EVIDENCE_TYPES
                .DERIVED,

        evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.compatibility.${categoryId}.${factor.id || "factor"}`,

        sourceValue:
          factorScore,

        relatedCompatibilityId:
          categoryId,

        visitorValue,

        cropValue,

        metadata: {

          categoryLabel,

          factorId:
            factor.id ||
            null,

          factorLabel

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    COMPATIBILITY CATEGORY SUMMARY MESSAGES
    ============================================================
  */


  function createCompatibilityCategorySummaryMessage(
    crop,
    evaluation,
    categoryResult
  ) {

    const categoryScore =
      Number.isFinite(
        categoryResult.score
      )
        ? categoryResult.score
        : null;

    if (
      !Number.isFinite(
        categoryScore
      )
    ) {
      return null;
    }

    const categoryId =
      categoryResult.id ||
      "compatibility";

    const categoryLabel =
      getCompatibilityExplanationLabel(
        categoryId
      );

    const subject =
      getCompatibilityExplanationSubject(
        categoryId
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      categoryScore >= 76
    ) {

      return createExplanationMessage({

        id:
          `compatibility-category-${categoryId}-strength`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          categoryId,

        title:
          categoryLabel,

        text:
          `${subject} match ${cropName}'s requirements very well`,

        shortText:
          `${categoryLabel} is a strong match`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          categoryScore,

        weight:
          categoryResult.weight,

        priority:
          getPositiveMessagePriority(
            categoryScore,
            categoryResult.weight ??
              1
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          categoryResult
            .evidenceCoverage,

        sourcePath:
          `evaluation.compatibility.categoryResults.${categoryId}`,

        sourceValue:
          categoryScore,

        relatedCompatibilityId:
          categoryId

      });

    }

    if (
      categoryScore < 55
    ) {

      return createExplanationMessage({

        id:
          `compatibility-category-${categoryId}-concern`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          categoryId,

        title:
          `${categoryLabel} Concern`,

        text:
          `${subject} do not closely match ${cropName}'s preferred growing or management conditions`,

        shortText:
          `${categoryLabel} is a limiting factor`,

        severity:
          getConcernSeverity(
            categoryScore
          ),

        score:
          categoryScore,

        weight:
          categoryResult.weight,

        priority:
          getConcernMessagePriority(
            categoryScore,
            categoryResult.weight ??
              1
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          categoryResult
            .evidenceCoverage,

        sourcePath:
          `evaluation.compatibility.categoryResults.${categoryId}`,

        sourceValue:
          categoryScore,

        relatedCompatibilityId:
          categoryId

      });

    }

    return null;

  }



  /*
    ============================================================
    DIRECT QUESTIONNAIRE COMPATIBILITY MESSAGES
    ============================================================
  */


  function createSeasonLengthDirectMessage(
    crop,
    answers,
    evaluation
  ) {

    const climate =
      getCropPlannerSection(
        crop,
        "climate"
      ) || {};

    const visitorSeasonDays =
      convertFrostFreeSeasonRangeToDays(
        answers.climate
          ?.frostFreeSeasonRange
      );

    const minimumDays =
      getFirstFiniteValue?.([

        climate.minimumFrostFreeDays,

        climate.minimumSeasonLengthDays,

        climate.minimumGrowingSeasonDays,

        climate.daysToMaturityMaximum,

        climate.maximumDaysToMaturity

      ]) ?? [

        climate.minimumFrostFreeDays,

        climate.minimumSeasonLengthDays,

        climate.minimumGrowingSeasonDays,

        climate.daysToMaturityMaximum,

        climate.maximumDaysToMaturity

      ].find(
        Number.isFinite
      ) ?? null;

    if (
      !Number.isFinite(
        visitorSeasonDays
      ) ||
      !Number.isFinite(
        minimumDays
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const margin =
      visitorSeasonDays -
      minimumDays;

    if (
      margin >= 21
    ) {

      return createExplanationMessage({

        id:
          "direct-season-length-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "climate",

        title:
          "Growing Season Length",

        text:
          `Your estimated frost-free season of about ${formatDaysForExplanation(
            visitorSeasonDays
          )} comfortably exceeds ${cropName}'s approximate minimum requirement of ${formatDaysForExplanation(
            minimumDays
          )}`,

        shortText:
          "Your growing season comfortably exceeds the crop's requirement",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          clamp(
            75 +
            margin / 3,
            75,
            100
          ),

        priority:
          91,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.climate.frostFreeSeasonRange|crop.climate.minimumFrostFreeDays",

        visitorValue:
          visitorSeasonDays,

        cropValue:
          minimumDays,

        relatedCompatibilityId:
          "climate",

        metadata: {

          seasonMarginDays:
            margin

        }

      });

    }

    if (
      margin >= 0
    ) {

      return createExplanationMessage({

        id:
          "direct-season-length-narrow",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "climate",

        title:
          "Narrow Growing-Season Margin",

        text:
          `Your estimated frost-free season appears long enough for ${cropName}, but the margin above its approximate requirement is only ${formatDaysForExplanation(
            margin
          )}`,

        shortText:
          "The growing-season margin is narrow",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .NOTICE,

        score:
          58,

        priority:
          75,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.climate.frostFreeSeasonRange|crop.climate.minimumFrostFreeDays",

        visitorValue:
          visitorSeasonDays,

        cropValue:
          minimumDays,

        relatedCompatibilityId:
          "climate",

        metadata: {

          seasonMarginDays:
            margin

        }

      });

    }

    return createExplanationMessage({

      id:
        "direct-season-length-concern",

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        "climate",

      title:
        "Growing Season Too Short",

      text:
        `Your estimated frost-free season of about ${formatDaysForExplanation(
          visitorSeasonDays
        )} is shorter than ${cropName}'s approximate requirement of ${formatDaysForExplanation(
          minimumDays
        )}`,

      shortText:
        "Your growing season may be too short",

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .HIGH,

      score:
        clamp(
          45 +
          margin,
          10,
          45
        ),

      priority:
        98,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        "answers.climate.frostFreeSeasonRange|crop.climate.minimumFrostFreeDays",

      visitorValue:
        visitorSeasonDays,

      cropValue:
        minimumDays,

      relatedCompatibilityId:
        "climate",

      metadata: {

        seasonMarginDays:
          margin

      }

    });

  }



  function createSunlightDirectMessage(
    crop,
    answers,
    evaluation
  ) {

    const directSunHours =
      answers.site
        ?.directSunHoursExact;

    if (
      !Number.isFinite(
        directSunHours
      )
    ) {
      return null;
    }

    const site =
      getCropPlannerSection(
        crop,
        "site"
      ) || {};

    const minimumHours = [

      site.minimumDirectSunHours,

      site.minimumSunHours,

      site.minimumFullSunHours

    ].find(
      Number.isFinite
    );

    const preferredHours = [

      site.preferredDirectSunHours,

      site.preferredSunHours,

      site.optimalSunHours

    ].find(
      Number.isFinite
    );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      Number.isFinite(
        preferredHours
      ) &&
      directSunHours >=
        preferredHours
    ) {

      return createExplanationMessage({

        id:
          "direct-sunlight-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "site",

        title:
          "Direct Sunlight",

        text:
          `Your site receives about ${formatNumberForExplanation(
            directSunHours,
            1
          )} hours of direct sunlight, meeting or exceeding ${cropName}'s preferred sunlight level`,

        shortText:
          "Your sunlight meets the crop's preferred level",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          90,

        priority:
          87,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.site.directSunHoursExact|crop.site.preferredDirectSunHours",

        visitorValue:
          directSunHours,

        cropValue:
          preferredHours,

        relatedCompatibilityId:
          "site"

      });

    }

    if (
      Number.isFinite(
        minimumHours
      ) &&
      directSunHours >=
        minimumHours
    ) {

      return createExplanationMessage({

        id:
          "direct-sunlight-acceptable",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "site",

        title:
          "Direct Sunlight",

        text:
          `Your site receives enough direct sunlight to meet ${cropName}'s minimum requirement, although greater sunlight may improve performance`,

        shortText:
          "Your sunlight meets the minimum requirement",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          72,

        priority:
          72,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.site.directSunHoursExact|crop.site.minimumDirectSunHours",

        visitorValue:
          directSunHours,

        cropValue:
          minimumHours,

        relatedCompatibilityId:
          "site"

      });

    }

    if (
      Number.isFinite(
        minimumHours
      ) &&
      directSunHours <
        minimumHours
    ) {

      return createExplanationMessage({

        id:
          "direct-sunlight-concern",

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "site",

        title:
          "Insufficient Direct Sunlight",

        text:
          `Your site provides about ${formatNumberForExplanation(
            directSunHours,
            1
          )} hours of direct sunlight, below ${cropName}'s approximate minimum requirement of ${formatNumberForExplanation(
            minimumHours,
            1
          )} hours`,

        shortText:
          "Available sunlight is below the crop's minimum requirement",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .HIGH,

        score:
          35,

        priority:
          96,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.site.directSunHoursExact|crop.site.minimumDirectSunHours",

        visitorValue:
          directSunHours,

        cropValue:
          minimumHours,

        relatedCompatibilityId:
          "site"

      });

    }

    return null;

  }



  function createSpaceAreaDirectMessage(
    crop,
    answers,
    evaluation
  ) {

    const availableArea =
      answers.space
        ?.totalGrowingAreaSqFt;

    if (
      !Number.isFinite(
        availableArea
      )
    ) {
      return null;
    }

    const space =
      getCropPlannerSection(
        crop,
        "space"
      ) || {};

    const minimumUsefulArea = [

      space.minimumUsefulAreaSqFt,

      space.minimumPracticalAreaSqFt,

      space.minimumAreaSqFt

    ].find(
      Number.isFinite
    );

    if (
      !Number.isFinite(
        minimumUsefulArea
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      availableArea >=
        minimumUsefulArea * 2
    ) {

      return createExplanationMessage({

        id:
          "direct-space-area-strength",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "space",

        title:
          "Available Growing Area",

        text:
          `Your available growing area of about ${formatSquareFeetForExplanation(
            availableArea
          )} comfortably exceeds ${cropName}'s approximate minimum useful area of ${formatSquareFeetForExplanation(
            minimumUsefulArea
          )}`,

        shortText:
          "Your growing area comfortably exceeds the crop's useful minimum",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          92,

        priority:
          86,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.space.totalGrowingAreaSqFt|crop.space.minimumUsefulAreaSqFt",

        visitorValue:
          availableArea,

        cropValue:
          minimumUsefulArea,

        relatedCompatibilityId:
          "space"

      });

    }

    if (
      availableArea >=
        minimumUsefulArea
    ) {

      return createExplanationMessage({

        id:
          "direct-space-area-acceptable",

        type:
          EXPLANATION_MESSAGE_TYPES
            .MATCH,

        category:
          "space",

        title:
          "Available Growing Area",

        text:
          `Your available growing area meets ${cropName}'s approximate minimum useful area, but the amount of harvest may be limited`,

        shortText:
          "Your growing area meets the crop's minimum useful area",

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          70,

        priority:
          72,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .DIRECT,

        sourcePath:
          "answers.space.totalGrowingAreaSqFt|crop.space.minimumUsefulAreaSqFt",

        visitorValue:
          availableArea,

        cropValue:
          minimumUsefulArea,

        relatedCompatibilityId:
          "space"

      });

    }

    return createExplanationMessage({

      id:
        "direct-space-area-concern",

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        "space",

      title:
        "Limited Growing Area",

      text:
        `Your available growing area of about ${formatSquareFeetForExplanation(
          availableArea
        )} is below ${cropName}'s approximate minimum useful area of ${formatSquareFeetForExplanation(
          minimumUsefulArea
        )}`,

      shortText:
        "Available growing area is below the crop's useful minimum",

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .HIGH,

      score:
        38,

      priority:
        95,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        "answers.space.totalGrowingAreaSqFt|crop.space.minimumUsefulAreaSqFt",

      visitorValue:
        availableArea,

      cropValue:
        minimumUsefulArea,

      relatedCompatibilityId:
        "space"

    });

  }



  /*
    ============================================================
    COMPATIBILITY MESSAGE GENERATOR
    ============================================================
  */


  function generateDetailedCompatibilityMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const categoryResults =
      getCompatibilityCategoryResultsForExplanation(
        evaluation
      );

    const highlightCandidates = [];
    const considerationCandidates = [];

    categoryResults.forEach(
      categoryResult => {

        const summaryMessage =
          createCompatibilityCategorySummaryMessage(
            crop,
            evaluation,
            categoryResult
          );

        if (
          summaryMessage
        ) {

          if (
            summaryMessage.type ===
              EXPLANATION_MESSAGE_TYPES
                .CONSIDERATION
          ) {

            considerationCandidates.push(
              summaryMessage
            );

          } else {

            highlightCandidates.push(
              summaryMessage
            );

          }

        }

        const factors =
          getCompatibilityFactorResults(
            categoryResult
          );

        factors.forEach(
          factor => {

            const factorMessage =
              createCompatibilityFactorMessage(
                crop,
                evaluation,
                categoryResult,
                factor
              );

            if (!factorMessage) {
              return;
            }

            if (
              factorMessage.type ===
                EXPLANATION_MESSAGE_TYPES
                  .CONSIDERATION
            ) {

              considerationCandidates.push(
                factorMessage
              );

            } else {

              highlightCandidates.push(
                factorMessage
              );

            }

          }
        );

      }
    );

    const directMessages = [

      createSeasonLengthDirectMessage(
        crop,
        answers,
        evaluation
      ),

      createSunlightDirectMessage(
        crop,
        answers,
        evaluation
      ),

      createSpaceAreaDirectMessage(
        crop,
        answers,
        evaluation
      )

    ].filter(
      isValidExplanationMessage
    );

    directMessages.forEach(
      message => {

        if (
          message.type ===
            EXPLANATION_MESSAGE_TYPES
              .CONSIDERATION
        ) {

          considerationCandidates.push(
            message
          );

        } else {

          highlightCandidates.push(
            message
          );

        }

      }
    );

    addExplanationMessages(
      explanation.compatibilityHighlights,
      prepareExplanationMessages(
        highlightCandidates,
        {
          limit:
            12,

          similarityThreshold:
            0.67
        }
      )
    );

    addExplanationMessages(
      explanation.considerations,
      prepareExplanationMessages(
        considerationCandidates,
        {
          limit:
            10,

          similarityThreshold:
            0.67
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      compatibilityExplanationCount:
        highlightCandidates.length,

      compatibilityConcernCount:
        considerationCandidates.length

    };

    return explanation;

  }



  /*
    ============================================================
    GOAL RESULT NORMALIZATION
    ============================================================
  */


  function getSelectedPlannerGoalIds(
    answers
  ) {

    const selectedGoals =
      answers.preferences
        ?.plannerGoals;

    return Array.isArray(
      selectedGoals
    )
      ? selectedGoals.filter(
          goalId =>
            typeof goalId ===
              "string"
        )
      : [];

  }



  function getGoalResultsForExplanation(
    evaluation
  ) {

    const possibleCollections = [

      evaluation.goals
        ?.goalResults,

      evaluation.goals
        ?.results,

      evaluation.goals
        ?.selectedGoals,

      evaluation.goals
        ?.evaluatedGoals,

      evaluation.goals
        ?.strongGoals,

      evaluation.goals
        ?.weakGoals

    ];

    const combinedResults = [];

    possibleCollections.forEach(
      collection => {

        if (
          !Array.isArray(
            collection
          )
        ) {
          return;
        }

        collection.forEach(
          result => {

            if (
              !result ||
              typeof result !==
                "object"
            ) {
              return;
            }

            const goalId =
              result.id ??
              result.goalId;

            if (!goalId) {
              return;
            }

            const existingIndex =
              combinedResults.findIndex(
                existing =>
                  (
                    existing.id ??
                    existing.goalId
                  ) ===
                    goalId
              );

            if (
              existingIndex >= 0
            ) {

              combinedResults[
                existingIndex
              ] = {

                ...combinedResults[
                  existingIndex
                ],

                ...result

              };

            } else {

              combinedResults.push(
                result
              );

            }

          }
        );

      }
    );

    return combinedResults;

  }



  function getGoalResultId(
    goalResult
  ) {

    return (
      goalResult?.id ??
      goalResult?.goalId ??
      null
    );

  }



  function getGoalResultScore(
    goalResult
  ) {

    const possibleValues = [

      goalResult?.score,

      goalResult?.alignmentScore,

      goalResult?.goalScore,

      goalResult?.weightedScore,

      goalResult?.value

    ];

    return possibleValues.find(
      Number.isFinite
    ) ?? null;

  }



  function getGoalResultWeight(
    goalResult
  ) {

    const possibleValues = [

      goalResult?.weight,

      goalResult?.priorityWeight,

      goalResult?.normalizedWeight,

      goalResult?.importance

    ];

    return possibleValues.find(
      Number.isFinite
    ) ?? 1;

  }



  function getGoalResultLabel(
    goalResult
  ) {

    const goalId =
      getGoalResultId(
        goalResult
      );

    return (

      goalResult?.label ??

      goalResult?.title ??

      getReadableAnswerLabel(
        goalId
      ) ??

      convertIdentifierToWords(
        goalId
      ) ??

      "Selected goal"

    );

  }



  function getGoalResultExplanation(
    goalResult
  ) {

    return normalizeExplanationText(

      goalResult?.explanation ??

      goalResult?.reason ??

      goalResult?.message ??

      goalResult?.supportReason ??

      goalResult?.metadata
        ?.explanation

    );

  }



  /*
    ============================================================
    GOAL MESSAGE BUILDERS
    ============================================================
  */


  function createDetailedGoalMessage(
    crop,
    evaluation,
    goalResult
  ) {

    const goalId =
      getGoalResultId(
        goalResult
      );

    const goalScore =
      getGoalResultScore(
        goalResult
      );

    if (
      !goalId ||
      !Number.isFinite(
        goalScore
      )
    ) {
      return null;
    }

    const goalLabel =
      getGoalResultLabel(
        goalResult
      );

    const goalWeight =
      getGoalResultWeight(
        goalResult
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const explicitExplanation =
      getGoalResultExplanation(
        goalResult
      );

    if (
      goalScore >= 68
    ) {

      let supportReason =
        explicitExplanation;

      if (
        !supportReason
      ) {

        const reasonMap = {

          "reduce-feed-costs":
            "it can provide a meaningful homegrown supplement when grown and processed efficiently",

          "feed-cost-reduction":
            "it can provide a meaningful homegrown supplement when grown and processed efficiently",

          "high-yield":
            "its expected usable production is strong relative to the space and management required",

          "fast-value":
            "it can begin providing useful harvest value relatively quickly",

          "short-season":
            "its maturity schedule fits shorter production windows",

          "low-labor":
            "its normal growing and harvest demands are compatible with lower-labor management",

          "low-water":
            "it has favorable water-use and drought-management characteristics",

          "long-storage":
            "the selected harvest product can be preserved for extended feeding use",

          "minimal-processing":
            "at least one practical use path requires relatively little preparation",

          "fresh-greens":
            "it can provide fresh plant material suitable for controlled flock supplementation",

          "living-forage":
            "it can remain available as a living crop or managed grazing resource",

          "forage-enrichment":
            "it can add variety, activity, and plant-based enrichment to the flock's environment",

          "winter-feed":
            "its harvest can be stored or preserved for use outside the main growing season",

          perennial:
            "it can return or remain productive across multiple seasons",

          "soil-improvement":
            "its growth habit or residue can support soil condition and organic matter",

          "cover-crop":
            "it can provide useful ground coverage and seasonal soil protection",

          "pollinator-support":
            "its flowering period can support beneficial insects and pollinators",

          "wildlife-resistance":
            "its overall wildlife-loss risk is relatively manageable",

          "beginner-friendly":
            "its establishment and management demands are suitable for less experienced growers",

          "small-space":
            "it can provide useful value without requiring a large dedicated plot",

          "large-flock":
            "its production potential can contribute meaningful volume for a larger flock",

          resilience:
            "it maintains useful performance across multiple environmental or management stresses"

        };

        supportReason =
          reasonMap[
            goalId
          ] ||
          "its crop characteristics align well with this selected priority";

      }

      return buildSupportsGoalMessage({

        id:
          `goal-match-${goalId}`,

        cropName,

        goalLabel:
          goalLabel.toLowerCase(),

        supportReason,

        score:
          goalScore,

        weight:
          goalWeight,

        priority:
          getPositiveMessagePriority(
            goalScore,
            goalWeight
          ),

        evidenceType:
          goalResult.directEvidence ===
            true
            ? EXPLANATION_EVIDENCE_TYPES
                .DIRECT
            : EXPLANATION_EVIDENCE_TYPES
                .DERIVED,

        evidenceCoverage:
          goalResult
            .evidenceCoverage,

        sourcePath:
          goalResult.sourcePath ||
          `evaluation.goals.${goalId}`,

        sourceValue:
          goalScore,

        relatedGoalId:
          goalId,

        metadata: {

          goalWeight,

          goalLabel

        }

      });

    }

    if (
      goalScore < 55
    ) {

      let text =
        explicitExplanation;

      if (!text) {

        text =
          `${cropName} provides limited support for your goal of ${goalLabel.toLowerCase()}`;

      }

      return createExplanationMessage({

        id:
          `goal-concern-${goalId}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "goals",

        title:
          goalLabel,

        text,

        shortText:
          `${goalLabel} is a weak match`,

        severity:
          getConcernSeverity(
            goalScore
          ),

        score:
          goalScore,

        weight:
          goalWeight,

        priority:
          getConcernMessagePriority(
            goalScore,
            goalWeight
          ),

        evidenceType:
          goalResult.directEvidence ===
            true
            ? EXPLANATION_EVIDENCE_TYPES
                .DIRECT
            : EXPLANATION_EVIDENCE_TYPES
                .DERIVED,

        evidenceCoverage:
          goalResult
            .evidenceCoverage,

        sourcePath:
          goalResult.sourcePath ||
          `evaluation.goals.${goalId}`,

        sourceValue:
          goalScore,

        relatedGoalId:
          goalId,

        metadata: {

          goalWeight,

          goalLabel

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    GOAL FALLBACK SCORING

    This creates goal results when the goal phase stored only the
    overall score and the selected questionnaire goal IDs.
    ============================================================
  */


  function createFallbackGoalResults(
    crop,
    answers,
    evaluation
  ) {

    const selectedGoalIds =
      getSelectedPlannerGoalIds(
        answers
      );

    return selectedGoalIds.map(
      goalId => {

        const score =
          getCropGoalScore(
            crop,
            goalId,
            answers,
            evaluation
          );

        return {

          id:
            goalId,

          label:
            getReadableAnswerLabel(
              goalId
            ),

          score:
            Number.isFinite(
              score
            )
              ? score
              : null,

          weight:
            1,

          directEvidence:
            hasDirectGoalScore(
              crop,
              goalId
            )

        };

      }
    );

  }



  function mergeGoalResultCollections(
    primaryResults,
    fallbackResults
  ) {

    const merged = [];

    fallbackResults.forEach(
      result => {

        merged.push({
          ...result
        });

      }
    );

    primaryResults.forEach(
      result => {

        const goalId =
          getGoalResultId(
            result
          );

        const existingIndex =
          merged.findIndex(
            existing =>
              getGoalResultId(
                existing
              ) ===
                goalId
          );

        if (
          existingIndex >= 0
        ) {

          merged[
            existingIndex
          ] = {

            ...merged[
              existingIndex
            ],

            ...result

          };

        } else {

          merged.push({
            ...result
          });

        }

      }
    );

    return merged;

  }



  /*
    ============================================================
    NUTRITIONAL ROLE EXPLANATIONS
    ============================================================
  */


  function getNutritionalRoleResultsForExplanation(
    evaluation
  ) {

    const possibleCollections = [

      evaluation.goals
        ?.nutritionalRoleResults,

      evaluation.goals
        ?.nutritionalRoles,

      evaluation.goals
        ?.nutritionResults

    ];

    for (
      const collection
      of possibleCollections
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



  function createNutritionalRoleMessage(
    crop,
    evaluation,
    roleResult
  ) {

    const roleId =
      roleResult.id ??
      roleResult.roleId;

    const roleScore = [

      roleResult.score,

      roleResult.alignmentScore,

      roleResult.value

    ].find(
      Number.isFinite
    );

    if (
      !roleId ||
      !Number.isFinite(
        roleScore
      ) ||
      roleScore < 68
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const roleLabel =

      roleResult.label ??

      getReadableAnswerLabel(
        roleId
      ) ??

      convertIdentifierToWords(
        roleId
      );

    return createExplanationMessage({

      id:
        `nutritional-role-${roleId}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .BENEFIT,

      category:
        "nutrition",

      title:
        roleLabel,

      text:
        `${cropName} provides strong value as a ${lowercaseFirstLetter(
          roleLabel
        )} supplement when fed through the recommended use path`,

      shortText:
        `${roleLabel} is a strong nutritional role`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .POSITIVE,

      score:
        roleScore,

      weight:
        roleResult.weight,

      priority:
        getPositiveMessagePriority(
          roleScore,
          roleResult.weight ??
            0.8
        ),

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DERIVED,

      evidenceCoverage:
        roleResult
          .evidenceCoverage,

      sourcePath:
        roleResult.sourcePath ||
        `evaluation.goals.nutritionalRoles.${roleId}`,

      sourceValue:
        roleScore,

      relatedGoalId:
        roleId

    });

  }



  /*
    ============================================================
    GOAL MESSAGE GENERATOR
    ============================================================
  */


  function generateDetailedGoalMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const storedGoalResults =
      getGoalResultsForExplanation(
        evaluation
      );

    const fallbackGoalResults =
      createFallbackGoalResults(
        crop,
        answers,
        evaluation
      );

    const goalResults =
      mergeGoalResultCollections(
        storedGoalResults,
        fallbackGoalResults
      );

    const goalMatchCandidates = [];
    const goalConcernCandidates = [];

    goalResults.forEach(
      goalResult => {

        const message =
          createDetailedGoalMessage(
            crop,
            evaluation,
            goalResult
          );

        if (!message) {
          return;
        }

        if (
          message.type ===
            EXPLANATION_MESSAGE_TYPES
              .CONSIDERATION
        ) {

          goalConcernCandidates.push(
            message
          );

        } else {

          goalMatchCandidates.push(
            message
          );

        }

      }
    );

    const nutritionalMessages =
      getNutritionalRoleResultsForExplanation(
        evaluation
      )
        .map(
          roleResult =>
            createNutritionalRoleMessage(
              crop,
              evaluation,
              roleResult
            )
        )
        .filter(
          isValidExplanationMessage
        );

    goalMatchCandidates.push(
      ...nutritionalMessages
    );

    addExplanationMessages(
      explanation.goalMatches,
      prepareExplanationMessages(
        goalMatchCandidates,
        {
          limit:
            12,

          similarityThreshold:
            0.65
        }
      )
    );

    addExplanationMessages(
      explanation.considerations,
      prepareExplanationMessages(
        goalConcernCandidates,
        {
          limit:
            8,

          similarityThreshold:
            0.65
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      selectedGoalCount:
        getSelectedPlannerGoalIds(
          answers
        ).length,

      goalExplanationCount:
        goalMatchCandidates.length,

      goalConcernCount:
        goalConcernCandidates.length,

      nutritionalRoleExplanationCount:
        nutritionalMessages.length

    };

    return explanation;

  }



  /*
    ============================================================
    USE-PATH FACTOR LABELS
    ============================================================
  */


  function getUsePathFactorExplanationLabel(
    factorId,
    fallbackLabel
  ) {

    const labelMap = {

      "product-match":
        "Desired Harvest Product",

      "goal-alignment":
        "Goal Alignment",

      "nutritional-role":
        "Nutritional Value",

      "task-fit":
        "Accepted Processing Tasks",

      "equipment-fit":
        "Available Equipment",

      "processing-time":
        "Processing Time",

      "harvest-pattern":
        "Harvest Pattern",

      "storage-duration":
        "Storage Duration",

      "drying-fit":
        "Drying Capability",

      "storage-safety":
        "Storage Safety",

      "feeding-practicality":
        "Feeding Practicality",

      "waste-efficiency":
        "Waste Efficiency",

      "path-risk":
        "Use-Path Risk",

      "preparation-demand":
        "Preparation Demand",

      "measurement-precision":
        "Feed Measurement Precision",

      "preservation-flexibility":
        "Preservation Flexibility"

    };

    return (

      labelMap[
        factorId
      ] ||

      fallbackLabel ||

      convertIdentifierToWords(
        factorId
      ) ||

      "Use-path factor"

    );

  }



  function getUsePathFactorExplanationReason(
    factor
  ) {

    return normalizeExplanationText(

      factor.explanation ??

      factor.reason ??

      factor.message ??

      factor.strengthMessage ??

      factor.concernMessage ??

      factor.metadata
        ?.explanation

    );

  }



  /*
    ============================================================
    USE-PATH FACTOR MESSAGES
    ============================================================
  */


  function createUsePathFactorExplanationMessage(
    crop,
    evaluation,
    bestPath,
    factor
  ) {

    const factorScore =
      Number.isFinite(
        factor.score
      )
        ? factor.score
        : null;

    if (
      !Number.isFinite(
        factorScore
      )
    ) {
      return null;
    }

    const factorId =
      factor.id ||
      "factor";

    const factorLabel =
      getUsePathFactorExplanationLabel(
        factorId,
        factor.label
      );

    const explicitReason =
      getUsePathFactorExplanationReason(
        factor
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      factorScore >= 68
    ) {

      let text =
        explicitReason;

      if (!text) {

        const strengthTextMap = {

          "product-match":
            `${bestPath.label} provides one of the harvest products you selected`,

          "goal-alignment":
            `${bestPath.label} strongly supports the priorities you selected`,

          "nutritional-role":
            `${bestPath.label} preserves a useful nutritional role for flock supplementation`,

          "task-fit":
            `The processing tasks required by ${bestPath.label} fit the tasks you are willing to perform`,

          "equipment-fit":
            `The equipment required for ${bestPath.label} is already available or can be obtained within your stated preferences`,

          "processing-time":
            `${bestPath.label} has a manageable processing-time requirement`,

          "harvest-pattern":
            `${bestPath.label} fits your preferred harvest pattern`,

          "storage-duration":
            `${bestPath.label} can support your desired storage period`,

          "drying-fit":
            `Your drying capability is suitable for ${bestPath.label}`,

          "storage-safety":
            `${bestPath.label} can be stored safely with your available storage setup`,

          "feeding-practicality":
            `${bestPath.label} is practical to measure and provide as a controlled flock supplement`,

          "waste-efficiency":
            `${bestPath.label} is expected to retain a high share of the harvested crop with limited processing waste`,

          "path-risk":
            `The major risks associated with ${bestPath.label} are generally manageable`,

          "preparation-demand":
            `${bestPath.label} has a manageable preparation requirement`,

          "measurement-precision":
            `${bestPath.label} allows reasonably precise feed measurement`,

          "preservation-flexibility":
            `${bestPath.label} provides useful preservation flexibility`

        };

        text =
          strengthTextMap[
            factorId
          ] ||
          `${factorLabel} is a strong feature of ${bestPath.label}`;

      }

      return createExplanationMessage({

        id:
          `use-path-factor-${bestPath.id}-${factorId}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .USE_PATH,

        category:
          "use-path",

        title:
          factorLabel,

        text,

        shortText:
          `${factorLabel} strongly supports ${bestPath.label}`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getPositiveMessagePriority(
            factorScore,
            factor.weight ??
              1
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          factor.evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.usePaths.bestPath.factors.${factorId}`,

        sourceValue:
          factorScore,

        relatedUsePathId:
          bestPath.id,

        metadata: {

          cropName,

          factorId,

          factorLabel

        }

      });

    }

    if (
      factorScore < 58
    ) {

      let text =
        explicitReason;

      if (!text) {

        const concernTextMap = {

          "product-match":
            `${bestPath.label} does not closely match all of the harvest products you selected`,

          "goal-alignment":
            `${bestPath.label} provides limited support for some selected goals`,

          "nutritional-role":
            `${bestPath.label} has limited value for the desired nutritional role`,

          "task-fit":
            `${bestPath.label} requires processing tasks that may not match your stated preferences`,

          "equipment-fit":
            `${bestPath.label} may require equipment you do not currently own or plan to obtain`,

          "processing-time":
            `${bestPath.label} has a meaningful processing-time requirement`,

          "harvest-pattern":
            `${bestPath.label} does not closely match your preferred harvest pattern`,

          "storage-duration":
            `${bestPath.label} may not reliably support your desired storage period`,

          "drying-fit":
            `${bestPath.label} may exceed your available drying capability`,

          "storage-safety":
            `${bestPath.label} requires more careful storage control than your current setup may provide`,

          "feeding-practicality":
            `${bestPath.label} may be difficult to measure, prepare, or feed consistently`,

          "waste-efficiency":
            `${bestPath.label} may produce meaningful processing or feeding waste`,

          "path-risk":
            `${bestPath.label} carries meaningful harvest, storage, or feeding risks`,

          "preparation-demand":
            `${bestPath.label} requires substantial preparation before feeding`,

          "measurement-precision":
            `${bestPath.label} may be difficult to measure precisely as a supplement`,

          "preservation-flexibility":
            `${bestPath.label} provides limited preservation flexibility`

        };

        text =
          concernTextMap[
            factorId
          ] ||
          `${factorLabel} is a limitation of ${bestPath.label}`;

      }

      return createExplanationMessage({

        id:
          `use-path-factor-concern-${bestPath.id}-${factorId}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .CONSIDERATION,

        category:
          "use-path",

        title:
          factorLabel,

        text,

        shortText:
          `${factorLabel} is a use-path concern`,

        severity:
          getConcernSeverity(
            factorScore
          ),

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getConcernMessagePriority(
            factorScore,
            factor.weight ??
              1
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage:
          factor.evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.usePaths.bestPath.factors.${factorId}`,

        sourceValue:
          factorScore,

        relatedUsePathId:
          bestPath.id,

        metadata: {

          cropName,

          factorId,

          factorLabel

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    BEST USE-PATH OVERVIEW
    ============================================================
  */


  function createBestUsePathOverviewMessage(
    crop,
    evaluation,
    bestPath
  ) {

    if (!bestPath) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const pathScore =
      Number.isFinite(
        bestPath.score
      )
        ? bestPath.score
        : null;

    const evidenceCoverage =
      Number.isFinite(
        bestPath.evidenceCoverage
      )
        ? bestPath.evidenceCoverage
        : null;

    return createExplanationMessage({

      id:
        `best-use-path-overview-${bestPath.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

      category:
        "use-path",

      title:
        bestPath.label,

      text:
        `${bestPath.label} is the best overall way to convert harvested ${cropName} into a useful flock supplement under your selected labor, equipment, drying, storage, and feeding requirements`,

      shortText:
        `${bestPath.label} is the best harvest-to-feeding option`,

      severity:
        Number.isFinite(
          pathScore
        ) &&
        pathScore >= 68
          ? EXPLANATION_SEVERITY_LEVELS
              .POSITIVE
          : EXPLANATION_SEVERITY_LEVELS
              .NOTICE,

      score:
        pathScore,

      priority:
        100,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .MIXED,

      evidenceCoverage,

      sourcePath:
        "evaluation.usePaths.bestPath",

      sourceValue:
        bestPath.id,

      relatedUsePathId:
        bestPath.id

    });

  }



  /*
    ============================================================
    USE-PATH PROCESSING SUMMARY
    ============================================================
  */


  function getUsePathRequiredTasks(
    bestPath
  ) {

    const usePath =
      bestPath.usePath ||
      {};

    const possibleCollections = [

      usePath.requiredProcessingTasks,

      usePath.processingTasks,

      usePath.requiredTasks,

      bestPath.requiredProcessingTasks

    ];

    for (
      const collection
      of possibleCollections
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



  function getUsePathRequiredEquipment(
    bestPath
  ) {

    const usePath =
      bestPath.usePath ||
      {};

    const possibleCollections = [

      usePath.requiredEquipment,

      usePath.equipmentRequirements,

      bestPath.requiredEquipment

    ];

    for (
      const collection
      of possibleCollections
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



  function createUsePathProcessingSummaryMessage(
    evaluation,
    bestPath
  ) {

    const requiredTasks =
      getUsePathRequiredTasks(
        bestPath
      );

    if (
      requiredTasks.length === 0
    ) {
      return null;
    }

    const readableTasks =
      getReadableAnswerLabels(
        requiredTasks
      );

    return createExplanationMessage({

      id:
        `use-path-processing-summary-${bestPath.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

      category:
        "use-path",

      title:
        "Required Processing",

      text:
        `${bestPath.label} requires ${joinNaturalLanguageList(
          readableTasks.map(
            task =>
              task.toLowerCase()
          )
        )}`,

      shortText:
        `Required processing: ${joinNaturalLanguageList(
          readableTasks
        )}`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        getUsePathFactorResult(
          bestPath,
          "task-fit"
        )?.score ??
        null,

      priority:
        70,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        `crop.usePaths.${bestPath.id}.requiredProcessingTasks`,

      sourceValue:
        requiredTasks,

      relatedUsePathId:
        bestPath.id

    });

  }



  function createUsePathEquipmentSummaryMessage(
    bestPath
  ) {

    const requiredEquipment =
      getUsePathRequiredEquipment(
        bestPath
      );

    if (
      requiredEquipment.length ===
        0
    ) {
      return null;
    }

    const readableEquipment =
      getReadableAnswerLabels(
        requiredEquipment
      );

    return createExplanationMessage({

      id:
        `use-path-equipment-summary-${bestPath.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .USE_PATH,

      category:
        "use-path",

      title:
        "Equipment Requirements",

      text:
        `${bestPath.label} may require ${joinNaturalLanguageList(
          readableEquipment.map(
            equipment =>
              equipment.toLowerCase()
          )
        )}`,

      shortText:
        `Equipment: ${joinNaturalLanguageList(
          readableEquipment
        )}`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        getUsePathFactorResult(
          bestPath,
          "equipment-fit"
        )?.score ??
        null,

      priority:
        67,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        `crop.usePaths.${bestPath.id}.requiredEquipment`,

      sourceValue:
        requiredEquipment,

      relatedUsePathId:
        bestPath.id

    });

  }



  /*
    ============================================================
    ALTERNATIVE USE-PATH MESSAGES
    ============================================================
  */


  function createAlternativeUsePathMessage(
    bestPath,
    alternativePath,
    index
  ) {

    if (
      !alternativePath ||
      !alternativePath.id
    ) {
      return null;
    }

    const scoreDifference =
      Number.isFinite(
        bestPath.score
      ) &&
      Number.isFinite(
        alternativePath.score
      )
        ? bestPath.score -
          alternativePath.score
        : null;

    let text =
      `${alternativePath.label} is also an eligible use path`;

    if (
      Number.isFinite(
        alternativePath.score
      )
    ) {

      text +=
        ` with a practicality score of ${formatNumberForExplanation(
          alternativePath.score,
          1
        )}`;

    }

    if (
      Number.isFinite(
        scoreDifference
      ) &&
      scoreDifference <= 5
    ) {

      text +=
        ` and is a close alternative to ${bestPath.label}`;

    }

    return createExplanationMessage({

      id:
        `alternative-use-path-${alternativePath.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .INFORMATION,

      category:
        "use-path",

      title:
        "Alternative Use Path",

      text,

      shortText:
        `${alternativePath.label} is an eligible alternative`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NEUTRAL,

      score:
        alternativePath.score,

      priority:
        61 -
        index,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .MIXED,

      evidenceCoverage:
        alternativePath
          .evidenceCoverage,

      sourcePath:
        "evaluation.usePaths.alternativePaths",

      sourceValue:
        alternativePath.id,

      relatedUsePathId:
        alternativePath.id,

      metadata: {

        scoreDifference

      }

    });

  }



  /*
    ============================================================
    REJECTED USE-PATH CONSIDERATIONS
    ============================================================
  */


  function createRejectedUsePathMessage(
    rejectedPath
  ) {

    if (
      !rejectedPath ||
      typeof rejectedPath !==
        "object"
    ) {
      return null;
    }

    const hardFailures =
      Array.isArray(
        rejectedPath.hardFailures
      )
        ? rejectedPath.hardFailures
        : [];

    if (
      hardFailures.length === 0
    ) {
      return null;
    }

    const failureTexts =
      hardFailures
        .slice(
          0,
          3
        )
        .map(
          failure => {

            if (
              typeof failure ===
                "string"
            ) {
              return removeEndingPunctuation(
                failure
              );
            }

            return removeEndingPunctuation(

              failure.text ??

              failure.message ??

              failure.reason ??

              failure.label

            );

          }
        )
        .filter(
          Boolean
        );

    if (
      failureTexts.length === 0
    ) {
      return null;
    }

    return createExplanationMessage({

      id:
        `rejected-use-path-${rejectedPath.id}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .CONSIDERATION,

      category:
        "use-path",

      title:
        `${rejectedPath.label || "Use Path"} Was Excluded`,

      text:
        `${rejectedPath.label || "This use path"} was excluded because ${joinNaturalLanguageList(
          failureTexts.map(
            text =>
              lowercaseFirstLetter(
                text
              )
          )
        )}`,

      shortText:
        `${rejectedPath.label || "Use path"} was excluded`,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        rejectedPath
          .diagnosticScore ??
        rejectedPath.score ??
        null,

      priority:
        58,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        "evaluation.usePaths.rejectedPaths",

      sourceValue:
        rejectedPath.id,

      relatedUsePathId:
        rejectedPath.id

    });

  }



  /*
    ============================================================
    USE-PATH MESSAGE GENERATOR
    ============================================================
  */


  function generateDetailedUsePathMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const bestPath =
      getBestUsePathEvaluation(
        evaluation
      );

    if (!bestPath) {

      explanation.metadata = {

        ...explanation.metadata,

        usePathExplanationCount:
          0,

        bestUsePathAvailable:
          false

      };

      return explanation;

    }

    const pathMessages = [];
    const pathConsiderations = [];

    const overviewMessage =
      createBestUsePathOverviewMessage(
        crop,
        evaluation,
        bestPath
      );

    if (overviewMessage) {

      pathMessages.push(
        overviewMessage
      );

    }

    const factors =
      Array.isArray(
        bestPath.factors
      )
        ? bestPath.factors
        : [];

    factors.forEach(
      factor => {

        const message =
          createUsePathFactorExplanationMessage(
            crop,
            evaluation,
            bestPath,
            factor
          );

        if (!message) {
          return;
        }

        if (
          message.type ===
            EXPLANATION_MESSAGE_TYPES
              .CONSIDERATION
        ) {

          pathConsiderations.push(
            message
          );

        } else {

          pathMessages.push(
            message
          );

        }

      }
    );

    const processingMessage =
      createUsePathProcessingSummaryMessage(
        evaluation,
        bestPath
      );

    if (processingMessage) {

      pathMessages.push(
        processingMessage
      );

    }

    const equipmentMessage =
      createUsePathEquipmentSummaryMessage(
        bestPath
      );

    if (equipmentMessage) {

      pathMessages.push(
        equipmentMessage
      );

    }

    const alternativePaths =
      Array.isArray(
        evaluation.usePaths
          ?.alternativePaths
      )
        ? evaluation.usePaths
            .alternativePaths
        : [];

    alternativePaths
      .slice(
        0,
        3
      )
      .forEach(
        (
          alternativePath,
          index
        ) => {

          const alternativeMessage =
            createAlternativeUsePathMessage(
              bestPath,
              alternativePath,
              index
            );

          if (
            alternativeMessage
          ) {

            pathMessages.push(
              alternativeMessage
            );

          }

        }
      );

    const rejectedPaths =
      Array.isArray(
        evaluation.usePaths
          ?.rejectedPaths
      )
        ? evaluation.usePaths
            .rejectedPaths
        : [];

    rejectedPaths
      .slice(
        0,
        4
      )
      .forEach(
        rejectedPath => {

          const rejectedMessage =
            createRejectedUsePathMessage(
              rejectedPath
            );

          if (
            rejectedMessage
          ) {

            pathConsiderations.push(
              rejectedMessage
            );

          }

        }
      );

    addExplanationMessages(
      explanation.usePathReasons,
      prepareExplanationMessages(
        pathMessages,
        {
          limit:
            12,

          similarityThreshold:
            0.64
        }
      )
    );

    addExplanationMessages(
      explanation.considerations,
      prepareExplanationMessages(
        pathConsiderations,
        {
          limit:
            8,

          similarityThreshold:
            0.64
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      bestUsePathAvailable:
        true,

      bestUsePathId:
        bestPath.id,

      bestUsePathLabel:
        bestPath.label,

      usePathExplanationCount:
        pathMessages.length,

      usePathConcernCount:
        pathConsiderations.length,

      alternativeUsePathCount:
        alternativePaths.length,

      rejectedUsePathCount:
        rejectedPaths.length

    };

    return explanation;

  }



  /*
    ============================================================
    PART 12C DETAILED SUMMARY

    This is an interim summary.

    Part 12D will replace or expand it after risk, confidence,
    uncertainty, and rejection explanations are generated.
    ============================================================
  */


  function createPart12CDetailedSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    const bestPath =
      getBestUsePathEvaluation(
        evaluation
      );

    const compatibilityMessages =
      getExplanationMessageTexts(
        explanation
          .compatibilityHighlights,
        {
          limit:
            2,

          useShortText:
            true
        }
      );

    const goalMessages =
      getExplanationMessageTexts(
        explanation.goalMatches,
        {
          limit:
            2,

          useShortText:
            true
        }
      );

    if (
      status ===
        "rejected"
    ) {

      return ensureEndingPeriod(
        `${cropName} was excluded from normal ranking because it failed one or more required eligibility conditions`
      );

    }

    if (
      status ===
        "no-practical-use-path"
    ) {

      return ensureEndingPeriod(
        `${cropName} may have some growing value, but no practical harvest, processing, storage, and feeding pathway remained under your selected requirements`
      );

    }

    const clauses = [];

    if (
      compatibilityMessages.length >
        0
    ) {

      clauses.push(
        lowercaseFirstLetter(
          removeEndingPunctuation(
            compatibilityMessages[0]
          )
        )
      );

    }

    if (
      goalMessages.length >
        0
    ) {

      clauses.push(
        lowercaseFirstLetter(
          removeEndingPunctuation(
            goalMessages[0]
          )
        )
      );

    }

    if (
      bestPath
    ) {

      clauses.push(
        `${bestPath.label} is the strongest practical harvest-to-feeding use`
      );

    }

    if (
      clauses.length === 0
    ) {

      return createBasicRecommendationSummary(
        crop,
        evaluation
      );

    }

    return ensureEndingPeriod(
      `${cropName} ${
        status ===
          "top-recommendation" ||
        status ===
          "strong-recommendation"
          ? "is recommended because"
          : "was evaluated based on how"
      } ${joinNaturalLanguageList(
        clauses
      )}`
    );

  }



  /*
    ============================================================
    PART 12C ORCHESTRATOR

    Call after:

      initializeRecommendationExplanation()
      evaluatePrimaryRecommendationExplanation()

    Part 12D must run after this function.
    ============================================================
  */


  function evaluateDetailedFitExplanation(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    generateDetailedCompatibilityMessages(
      crop,
      answers,
      evaluation
    );

    generateDetailedGoalMessages(
      crop,
      answers,
      evaluation
    );

    generateDetailedUsePathMessages(
      crop,
      answers,
      evaluation
    );

    explanation.detailedSummary =
      createPart12CDetailedSummary(
        crop,
        evaluation,
        explanation
      );

    explanation.metadata = {

      ...explanation.metadata,

      part12CComplete:
        true

    };

    return explanation;

  }

    /*
    ============================================================
    PHASE 8
    RECOMMENDATION EXPLANATION

    PART 12D
    RISKS, CONFIDENCE, REJECTIONS, AND FINALIZATION

    This section creates:

      - detailed risk explanations;
      - risk-mitigation guidance;
      - confidence explanations;
      - uncertainty explanations;
      - exact eligibility rejection reasons;
      - final warnings;
      - final detailed recommendation narratives;
      - the complete explanation orchestrator.

    This section completes Phase 8.
    ============================================================
  */


  /*
    ============================================================
    GENERAL NORMALIZATION HELPERS
    ============================================================
  */


  function normalizeExplanationItemCollection(
    collection
  ) {

    if (
      Array.isArray(
        collection
      )
    ) {

      return collection.filter(
        item =>
          item !==
            null &&
          item !==
            undefined
      );

    }

    if (
      collection &&
      typeof collection ===
        "object"
    ) {

      return Object.entries(
        collection
      ).map(
        (
          [
            itemId,
            item
          ]
        ) => {

          if (
            item &&
            typeof item ===
              "object"
          ) {

            return {

              id:
                item.id ||
                itemId,

              ...item

            };

          }

          return {

            id:
              itemId,

            value:
              item

          };

        }
      );

    }

    return [];

  }



  function getExplanationItemText(
    item
  ) {

    if (
      typeof item ===
        "string"
    ) {

      return normalizeExplanationText(
        item
      );

    }

    if (
      !item ||
      typeof item !==
        "object"
    ) {
      return null;
    }

    return normalizeExplanationText(

      item.text ??

      item.message ??

      item.reason ??

      item.explanation ??

      item.description ??

      item.label ??

      item.title

    );

  }



  function getExplanationItemLabel(
    item,
    fallbackId
  ) {

    if (
      typeof item ===
        "string"
    ) {

      return (
        convertIdentifierToWords(
          fallbackId
        ) ||
        "Item"
      );

    }

    return (

      item?.label ??

      item?.title ??

      convertIdentifierToWords(
        item?.id ??
        fallbackId
      ) ??

      "Item"

    );

  }



  function getFirstFiniteExplanationValue(
    values
  ) {

    if (
      !Array.isArray(
        values
      )
    ) {
      return null;
    }

    return values.find(
      Number.isFinite
    ) ?? null;

  }



  function convertPossibleCoverageToRatio(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    if (
      value > 1
    ) {

      return clamp(
        value / 100,
        0,
        1
      );

    }

    return clamp(
      value,
      0,
      1
    );

  }



  /*
    ============================================================
    RISK CATEGORY NORMALIZATION
    ============================================================
  */


  function getRiskCategoryResultsForExplanation(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.risks
        ?.categoryResults
    ).filter(
      result =>
        result &&
        typeof result ===
          "object"
    );

  }



  function getRiskResultId(
    riskResult
  ) {

    return (

      riskResult?.id ??

      riskResult?.riskId ??

      riskResult?.categoryId ??

      null

    );

  }



  function getRiskResultLabel(
    riskResult
  ) {

    const riskId =
      getRiskResultId(
        riskResult
      );

    return (

      riskResult?.label ??

      riskResult?.title ??

      (
        typeof getRiskCategoryLabel ===
          "function"
          ? getRiskCategoryLabel(
              riskId
            )
          : null
      ) ??

      convertIdentifierToWords(
        riskId
      ) ??

      "Risk"

    );

  }



  function getRiskSafetyScore(
    riskResult
  ) {

    return getFirstFiniteExplanationValue([

      riskResult?.score,

      riskResult?.safetyScore,

      riskResult?.adjustedSafetyScore,

      riskResult?.managedSafetyScore,

      riskResult?.value

    ]);

  }



  function getRiskRawSafetyScore(
    riskResult
  ) {

    return getFirstFiniteExplanationValue([

      riskResult?.rawScore,

      riskResult?.rawSafetyScore,

      riskResult?.unmanagedSafetyScore,

      riskResult?.baseSafetyScore

    ]);

  }



  function getRiskWeightForExplanation(
    riskResult
  ) {

    return getFirstFiniteExplanationValue([

      riskResult?.weight,

      riskResult?.riskWeight,

      riskResult?.normalizedWeight,

      riskResult?.importance

    ]) ?? 1;

  }



  function getRiskMitigationCapacityScore(
    riskResult
  ) {

    return getFirstFiniteExplanationValue([

      riskResult?.mitigationCapacity,

      riskResult?.mitigationScore,

      riskResult?.managementCapacity,

      riskResult?.managedRecoveryScore,

      riskResult?.metadata
        ?.mitigationCapacity

    ]);

  }



  function getRiskEvidenceCoverageForExplanation(
    riskResult,
    evaluation
  ) {

    return convertPossibleCoverageToRatio(
      getFirstFiniteExplanationValue([

        riskResult?.evidenceCoverage,

        riskResult?.coverage,

        evaluation.risks
          ?.evidenceCoverage

      ])
    );

  }



  function getRiskResultExplanation(
    riskResult
  ) {

    return normalizeExplanationText(

      riskResult?.explanation ??

      riskResult?.reason ??

      riskResult?.message ??

      riskResult?.riskExplanation ??

      riskResult?.metadata
        ?.explanation

    );

  }



  function getRiskResultMitigations(
    riskResult
  ) {

    const possibleCollections = [

      riskResult?.mitigations,

      riskResult?.mitigationSteps,

      riskResult?.managementSteps,

      riskResult?.recommendedActions,

      riskResult?.metadata
        ?.mitigations

    ];

    for (
      const collection
      of possibleCollections
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



  /*
    ============================================================
    RISK LABEL AND MESSAGE HELPERS
    ============================================================
  */


  function getRiskExplanationSubject(
    riskId
  ) {

    const subjectMap = {

      wildlife:
        "Wildlife pressure",

      weather:
        "Weather exposure",

      "harvest-loss":
        "Harvest and post-harvest loss",

      harvestLoss:
        "Harvest and post-harvest loss",

      "storage-pests":
        "Storage pests and rodents",

      storagePests:
        "Storage pests and rodents",

      "mold-moisture":
        "Mold and moisture",

      moldMoisture:
        "Mold and moisture",

      mechanical:
        "Mechanical handling",

      establishment:
        "Crop establishment",

      persistence:
        "Long-term persistence and spread",

      "flock-use":
        "Flock-use safety and management",

      flockUse:
        "Flock-use safety and management",

      "use-path":
        "Selected use-path risk",

      usePath:
        "Selected use-path risk"

    };

    return (
      subjectMap[
        riskId
      ] ||
      getRiskResultLabel({
        id:
          riskId
      })
    );

  }



  function getRiskConcernPhrase(
    safetyScore
  ) {

    if (
      !Number.isFinite(
        safetyScore
      )
    ) {
      return "requires review";
    }

    if (
      safetyScore < 30
    ) {
      return "is a severe concern";
    }

    if (
      safetyScore < 42
    ) {
      return "is a major concern";
    }

    if (
      safetyScore < 55
    ) {
      return "is a meaningful concern";
    }

    if (
      safetyScore < 68
    ) {
      return "requires active management";
    }

    return "is generally manageable";
  }



  function getRiskPositivePhrase(
    safetyScore
  ) {

    if (
      !Number.isFinite(
        safetyScore
      )
    ) {
      return null;
    }

    if (
      safetyScore >= 90
    ) {
      return "presents very little expected difficulty";
    }

    if (
      safetyScore >= 82
    ) {
      return "has a low expected risk";
    }

    if (
      safetyScore >= 74
    ) {
      return "appears manageable with normal care";
    }

    if (
      safetyScore >= 68
    ) {
      return "is manageable with appropriate planning";
    }

    return null;
  }



  /*
    ============================================================
    DETAILED RISK MESSAGE
    ============================================================
  */


  function createDetailedRiskMessage(
    crop,
    evaluation,
    riskResult
  ) {

    const riskId =
      getRiskResultId(
        riskResult
      );

    const safetyScore =
      getRiskSafetyScore(
        riskResult
      );

    if (
      !riskId ||
      !Number.isFinite(
        safetyScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const riskLabel =
      getRiskResultLabel(
        riskResult
      );

    const subject =
      getRiskExplanationSubject(
        riskId
      );

    const explicitExplanation =
      getRiskResultExplanation(
        riskResult
      );

    const riskWeight =
      getRiskWeightForExplanation(
        riskResult
      );

    const evidenceCoverage =
      getRiskEvidenceCoverageForExplanation(
        riskResult,
        evaluation
      );

    if (
      safetyScore < 68
    ) {

      let text =
        explicitExplanation;

      if (!text) {

        text =
          `${subject} ${getRiskConcernPhrase(
            safetyScore
          )} for ${cropName}`;

      }

      return createExplanationMessage({

        id:
          `risk-concern-${riskId}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .RISK,

        category:
          "risk",

        title:
          riskLabel,

        text,

        shortText:
          `${riskLabel} ${getRiskConcernPhrase(
            safetyScore
          )}`,

        severity:
          getConcernSeverity(
            safetyScore
          ),

        score:
          safetyScore,

        weight:
          riskWeight,

        priority:
          getRiskMessagePriority(
            safetyScore,
            riskWeight
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage,

        sourcePath:
          riskResult.sourcePath ||
          `evaluation.risks.categoryResults.${riskId}`,

        sourceValue:
          safetyScore,

        relatedRiskId:
          riskId,

        metadata: {

          rawSafetyScore:
            getRiskRawSafetyScore(
              riskResult
            ),

          mitigationCapacity:
            getRiskMitigationCapacityScore(
              riskResult
            ),

          riskLabel

        }

      });

    }

    if (
      safetyScore >= 74
    ) {

      const positivePhrase =
        getRiskPositivePhrase(
          safetyScore
        );

      let text =
        explicitExplanation;

      if (!text) {

        text =
          `${subject} ${positivePhrase} for ${cropName}`;

      }

      return createExplanationMessage({

        id:
          `risk-managed-${riskId}`,

        type:
          EXPLANATION_MESSAGE_TYPES
            .STRENGTH,

        category:
          "risk",

        title:
          `${riskLabel} Is Manageable`,

        text,

        shortText:
          `${riskLabel} is generally manageable`,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .POSITIVE,

        score:
          safetyScore,

        weight:
          riskWeight,

        priority:
          getPositiveMessagePriority(
            safetyScore,
            riskWeight *
              0.65
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .MIXED,

        evidenceCoverage,

        sourcePath:
          riskResult.sourcePath ||
          `evaluation.risks.categoryResults.${riskId}`,

        sourceValue:
          safetyScore,

        relatedRiskId:
          riskId,

        metadata: {

          rawSafetyScore:
            getRiskRawSafetyScore(
              riskResult
            ),

          mitigationCapacity:
            getRiskMitigationCapacityScore(
              riskResult
            ),

          riskLabel

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    MITIGATION TEXT NORMALIZATION
    ============================================================
  */


  function normalizeMitigationItem(
    mitigation,
    fallbackRiskId,
    index
  ) {

    if (
      typeof mitigation ===
        "string"
    ) {

      const text =
        normalizeExplanationText(
          mitigation
        );

      return text
        ? {
            id:
              `${fallbackRiskId || "risk"}-mitigation-${index + 1}`,

            text,

            riskId:
              fallbackRiskId,

            priority:
              null,

            sourcePath:
              null
          }
        : null;

    }

    if (
      !mitigation ||
      typeof mitigation !==
        "object"
    ) {
      return null;
    }

    const text =
      normalizeExplanationText(

        mitigation.text ??

        mitigation.action ??

        mitigation.message ??

        mitigation.description ??

        mitigation.label

      );

    if (!text) {
      return null;
    }

    return {

      id:
        mitigation.id ||
        `${fallbackRiskId || "risk"}-mitigation-${index + 1}`,

      text,

      riskId:
        mitigation.riskId ||
        mitigation.relatedRiskId ||
        fallbackRiskId ||
        null,

      priority:
        Number.isFinite(
          mitigation.priority
        )
          ? mitigation.priority
          : null,

      score:
        Number.isFinite(
          mitigation.score
        )
          ? mitigation.score
          : null,

      sourcePath:
        mitigation.sourcePath ||
        null,

      purpose:
        normalizeExplanationText(
          mitigation.purpose
        ),

      metadata:
        mitigation.metadata &&
        typeof mitigation.metadata ===
          "object"
          ? {
              ...mitigation.metadata
            }
          : {}

    };

  }



  function createRiskMitigationMessage(
    mitigation,
    riskResult,
    index
  ) {

    const riskId =
      mitigation.riskId ||
      getRiskResultId(
        riskResult
      ) ||
      "general-risk";

    const riskLabel =
      riskResult
        ? getRiskResultLabel(
            riskResult
          )
        : getRiskExplanationSubject(
            riskId
          );

    const safetyScore =
      riskResult
        ? getRiskSafetyScore(
            riskResult
          )
        : mitigation.score;

    return buildMitigationMessage({

      id:
        `mitigation-${mitigation.id}`,

      action:
        mitigation.text,

      purpose:
        mitigation.purpose,

      title:
        riskLabel,

      score:
        Number.isFinite(
          safetyScore
        )
          ? safetyScore
          : null,

      priority:
        Number.isFinite(
          mitigation.priority
        )
          ? mitigation.priority
          : Number.isFinite(
              safetyScore
            )
            ? getRiskMessagePriority(
                safetyScore,
                0.75
              )
            : 62 -
              index,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      sourcePath:
        mitigation.sourcePath ||
        `evaluation.risks.mitigations.${mitigation.id}`,

      sourceValue:
        mitigation.text,

      relatedRiskId:
        riskId,

      metadata: {

        riskLabel,

        ...mitigation.metadata

      }

    });

  }



  /*
    ============================================================
    GLOBAL RISK COLLECTION HELPERS
    ============================================================
  */


  function getGlobalRiskMitigations(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.risks
        ?.mitigations
    );

  }



  function getPrimaryRiskItems(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.risks
        ?.primaryRisks
    );

  }



  function getModerateRiskItems(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.risks
        ?.moderateRisks
    );

  }



  function getManagedRiskItems(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.risks
        ?.managedRisks
    );

  }



  function findRiskResultById(
    riskResults,
    riskId
  ) {

    if (
      !riskId
    ) {
      return null;
    }

    return riskResults.find(
      result =>
        getRiskResultId(
          result
        ) ===
          riskId
    ) || null;

  }



  /*
    ============================================================
    PRIMARY RISK FALLBACK MESSAGE
    ============================================================
  */


  function createPrimaryRiskFallbackMessage(
    riskItem,
    index
  ) {

    const riskId =

      riskItem?.id ??

      riskItem?.riskId ??

      `primary-risk-${index + 1}`;

    const text =
      getExplanationItemText(
        riskItem
      );

    if (!text) {
      return null;
    }

    const score =
      getFirstFiniteExplanationValue([

        riskItem?.score,

        riskItem?.safetyScore

      ]);

    return createExplanationMessage({

      id:
        `primary-risk-fallback-${riskId}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .RISK,

      category:
        "risk",

      title:
        getExplanationItemLabel(
          riskItem,
          riskId
        ),

      text,

      shortText:
        text,

      severity:
        Number.isFinite(
          score
        )
          ? getConcernSeverity(
              score
            )
          : EXPLANATION_SEVERITY_LEVELS
              .HIGH,

      score,

      priority:
        Number.isFinite(
          score
        )
          ? getRiskMessagePriority(
              score,
              1
            )
          : 88 -
            index,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DERIVED,

      sourcePath:
        "evaluation.risks.primaryRisks",

      sourceValue:
        riskId,

      relatedRiskId:
        riskId

    });

  }



  /*
    ============================================================
    RISK EXPLANATION GENERATOR
    ============================================================
  */


  function generateDetailedRiskMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const riskResults =
      getRiskCategoryResultsForExplanation(
        evaluation
      );

    const concernCandidates = [];
    const managedCandidates = [];
    const mitigationCandidates = [];

    riskResults.forEach(
      riskResult => {

        const riskMessage =
          createDetailedRiskMessage(
            crop,
            evaluation,
            riskResult
          );

        if (
          riskMessage
        ) {

          if (
            riskMessage.type ===
              EXPLANATION_MESSAGE_TYPES
                .RISK
          ) {

            concernCandidates.push(
              riskMessage
            );

          } else {

            managedCandidates.push(
              riskMessage
            );

          }

        }

        getRiskResultMitigations(
          riskResult
        )
          .map(
            (
              mitigation,
              index
            ) =>
              normalizeMitigationItem(
                mitigation,
                getRiskResultId(
                  riskResult
                ),
                index
              )
          )
          .filter(
            Boolean
          )
          .forEach(
            (
              mitigation,
              index
            ) => {

              const mitigationMessage =
                createRiskMitigationMessage(
                  mitigation,
                  riskResult,
                  index
                );

              if (
                mitigationMessage
              ) {

                mitigationCandidates.push(
                  mitigationMessage
                );

              }

            }
          );

      }
    );

    /*
      Add primary-risk messages when the structured category
      results did not already create the same explanation.
    */

    getPrimaryRiskItems(
      evaluation
    ).forEach(
      (
        riskItem,
        index
      ) => {

        const riskId =

          riskItem?.id ??

          riskItem?.riskId;

        const existingRisk =
          findRiskResultById(
            riskResults,
            riskId
          );

        if (
          existingRisk
        ) {
          return;
        }

        const fallbackMessage =
          createPrimaryRiskFallbackMessage(
            riskItem,
            index
          );

        if (
          fallbackMessage
        ) {

          concernCandidates.push(
            fallbackMessage
          );

        }

      }
    );

    /*
      Add globally prepared mitigation strings from Part 9.
    */

    getGlobalRiskMitigations(
      evaluation
    )
      .map(
        (
          mitigation,
          index
        ) =>
          normalizeMitigationItem(
            mitigation,
            mitigation?.riskId ||
            mitigation
              ?.relatedRiskId ||
            "general-risk",
            index
          )
      )
      .filter(
        Boolean
      )
      .forEach(
        (
          mitigation,
          index
        ) => {

          const riskResult =
            findRiskResultById(
              riskResults,
              mitigation.riskId
            );

          const mitigationMessage =
            createRiskMitigationMessage(
              mitigation,
              riskResult,
              index
            );

          if (
            mitigationMessage
          ) {

            mitigationCandidates.push(
              mitigationMessage
            );

          }

        }
      );

    addExplanationMessages(
      explanation.considerations,
      prepareExplanationMessages(
        concernCandidates,
        {
          limit:
            12,

          similarityThreshold:
            0.62
        }
      )
    );

    /*
      Managed risk messages can support whyRecommended, but only
      the strongest few are added.
    */

    addExplanationMessages(
      explanation.whyRecommended,
      prepareExplanationMessages(
        managedCandidates,
        {
          limit:
            3,

          similarityThreshold:
            0.64
        }
      )
    );

    addExplanationMessages(
      explanation.riskMitigations,
      prepareExplanationMessages(
        mitigationCandidates,
        {
          limit:
            12,

          similarityThreshold:
            0.58
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      riskCategoryExplanationCount:
        riskResults.length,

      primaryRiskExplanationCount:
        concernCandidates.length,

      managedRiskExplanationCount:
        managedCandidates.length,

      riskMitigationExplanationCount:
        mitigationCandidates.length,

      primaryRiskCount:
        getPrimaryRiskItems(
          evaluation
        ).length,

      moderateRiskCount:
        getModerateRiskItems(
          evaluation
        ).length,

      managedRiskCount:
        getManagedRiskItems(
          evaluation
        ).length

    };

    return explanation;

  }



  /*
    ============================================================
    CONFIDENCE FACTOR NORMALIZATION
    ============================================================
  */


  function getConfidenceFactorResultsForExplanation(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.confidence
        ?.factorResults
    ).filter(
      factor =>
        factor &&
        typeof factor ===
          "object"
    );

  }



  function getConfidenceFactorId(
    factor
  ) {

    return (

      factor?.id ??

      factor?.factorId ??

      null

    );

  }



  function getConfidenceFactorScoreForExplanation(
    factor
  ) {

    return getFirstFiniteExplanationValue([

      factor?.score,

      factor?.confidenceScore,

      factor?.value

    ]);

  }



  function getConfidenceFactorLabelForExplanation(
    factor
  ) {

    const factorId =
      getConfidenceFactorId(
        factor
      );

    const labelMap = {

      recordCompleteness:
        "Crop Record Completeness",

      "record-completeness":
        "Crop Record Completeness",

      sectionCompleteness:
        "Required Section Coverage",

      "section-completeness":
        "Required Section Coverage",

      criticalFieldCoverage:
        "Critical Field Coverage",

      "critical-field-coverage":
        "Critical Field Coverage",

      phaseEvidenceCoverage:
        "Evaluation Evidence Coverage",

      "phase-evidence-coverage":
        "Evaluation Evidence Coverage",

      phaseAgreement:
        "Scoring Agreement",

      "phase-agreement":
        "Scoring Agreement",

      sourceQuality:
        "Research Source Quality",

      "source-quality":
        "Research Source Quality",

      directEvidence:
        "Direct Evidence",

      "direct-evidence":
        "Direct Evidence",

      usePathSelection:
        "Use-Path Selection Confidence",

      "use-path-selection":
        "Use-Path Selection Confidence",

      eligibility:
        "Eligibility Confidence",

      eligibilityConfidence:
        "Eligibility Confidence",

      "eligibility-confidence":
        "Eligibility Confidence"

    };

    return (

      factor?.label ??

      factor?.title ??

      labelMap[
        factorId
      ] ??

      convertIdentifierToWords(
        factorId
      ) ??

      "Confidence Factor"

    );

  }



  function getConfidenceFactorExplanationText(
    factor
  ) {

    return normalizeExplanationText(

      factor?.explanation ??

      factor?.reason ??

      factor?.message ??

      factor?.metadata
        ?.explanation

    );

  }



  /*
    ============================================================
    CONFIDENCE FACTOR MESSAGE
    ============================================================
  */


  function createConfidenceFactorMessage(
    crop,
    evaluation,
    factor
  ) {

    const factorId =
      getConfidenceFactorId(
        factor
      );

    const factorScore =
      getConfidenceFactorScoreForExplanation(
        factor
      );

    if (
      !factorId ||
      !Number.isFinite(
        factorScore
      )
    ) {
      return null;
    }

    const factorLabel =
      getConfidenceFactorLabelForExplanation(
        factor
      );

    const explicitText =
      getConfidenceFactorExplanationText(
        factor
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    if (
      factorScore >= 72
    ) {

      let text =
        explicitText;

      if (!text) {

        const strengthMap = {

          recordCompleteness:
            `${cropName}'s planner record is substantially complete`,

          "record-completeness":
            `${cropName}'s planner record is substantially complete`,

          sectionCompleteness:
            `${cropName}'s required planner sections are well covered`,

          "section-completeness":
            `${cropName}'s required planner sections are well covered`,

          criticalFieldCoverage:
            `${cropName}'s most important recommendation fields are well populated`,

          "critical-field-coverage":
            `${cropName}'s most important recommendation fields are well populated`,

          phaseEvidenceCoverage:
            "The major scoring phases are supported by good evidence coverage",

          "phase-evidence-coverage":
            "The major scoring phases are supported by good evidence coverage",

          phaseAgreement:
            "Compatibility, goals, use paths, and risks reach broadly consistent conclusions",

          "phase-agreement":
            "Compatibility, goals, use paths, and risks reach broadly consistent conclusions",

          sourceQuality:
            `${cropName}'s record is supported by credible research sources and verification`,

          "source-quality":
            `${cropName}'s record is supported by credible research sources and verification`,

          directEvidence:
            "A substantial share of the recommendation is based on direct crop-record evidence",

          "direct-evidence":
            "A substantial share of the recommendation is based on direct crop-record evidence",

          usePathSelection:
            "The selected best use path is supported by a clear scoring advantage or strong factor evidence",

          "use-path-selection":
            "The selected best use path is supported by a clear scoring advantage or strong factor evidence",

          eligibility:
            "The eligibility decision is supported by clear questionnaire and crop-record evidence",

          eligibilityConfidence:
            "The eligibility decision is supported by clear questionnaire and crop-record evidence",

          "eligibility-confidence":
            "The eligibility decision is supported by clear questionnaire and crop-record evidence"

        };

        text =
          strengthMap[
            factorId
          ] ||
          `${factorLabel} strongly supports the reliability of this recommendation`;

      }

      return buildConfidenceMessage({

        id:
          `confidence-factor-strength-${factorId}`,

        title:
          factorLabel,

        reason:
          text,

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getPositiveMessagePriority(
            factorScore,
            factor.weight ??
              0.85
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          factor.evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.confidence.factorResults.${factorId}`,

        sourceValue:
          factorScore,

        metadata: {

          factorId,

          factorLabel

        }

      });

    }

    if (
      factorScore < 58
    ) {

      let text =
        explicitText;

      if (!text) {

        const concernMap = {

          recordCompleteness:
            `${cropName}'s planner record contains substantial missing or unknown data`,

          "record-completeness":
            `${cropName}'s planner record contains substantial missing or unknown data`,

          sectionCompleteness:
            `${cropName}'s planner record is missing one or more required sections`,

          "section-completeness":
            `${cropName}'s planner record is missing one or more required sections`,

          criticalFieldCoverage:
            "Several fields that strongly influence recommendations remain unknown",

          "critical-field-coverage":
            "Several fields that strongly influence recommendations remain unknown",

          phaseEvidenceCoverage:
            "One or more major scoring phases have limited evidence coverage",

          "phase-evidence-coverage":
            "One or more major scoring phases have limited evidence coverage",

          phaseAgreement:
            "The major scoring phases do not reach a strongly consistent conclusion",

          "phase-agreement":
            "The major scoring phases do not reach a strongly consistent conclusion",

          sourceQuality:
            "The crop record has limited source or verification support",

          "source-quality":
            "The crop record has limited source or verification support",

          directEvidence:
            "A substantial share of the recommendation depends on derived rather than direct evidence",

          "direct-evidence":
            "A substantial share of the recommendation depends on derived rather than direct evidence",

          usePathSelection:
            "The best use path has only a narrow advantage over competing paths or limited supporting evidence",

          "use-path-selection":
            "The best use path has only a narrow advantage over competing paths or limited supporting evidence",

          eligibility:
            "The eligibility conclusion depends on incomplete or uncertain evidence",

          eligibilityConfidence:
            "The eligibility conclusion depends on incomplete or uncertain evidence",

          "eligibility-confidence":
            "The eligibility conclusion depends on incomplete or uncertain evidence"

        };

        text =
          concernMap[
            factorId
          ] ||
          `${factorLabel} limits the certainty of this recommendation`;

      }

      return buildUncertaintyMessage({

        id:
          `confidence-factor-uncertainty-${factorId}`,

        title:
          factorLabel,

        uncertainty:
          text,

        score:
          factorScore,

        weight:
          factor.weight,

        priority:
          getConcernMessagePriority(
            factorScore,
            factor.weight ??
              0.9
          ),

        severity:
          getConcernSeverity(
            factorScore
          ),

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          factor.evidenceCoverage,

        sourcePath:
          factor.sourcePath ||
          `evaluation.confidence.factorResults.${factorId}`,

        sourceValue:
          factorScore,

        metadata: {

          factorId,

          factorLabel

        }

      });

    }

    return null;

  }



  /*
    ============================================================
    STORED CONFIDENCE ITEM MESSAGE
    ============================================================
  */


  function createStoredConfidenceItemMessage(
    item,
    type,
    index
  ) {

    const text =
      getExplanationItemText(
        item
      );

    if (!text) {
      return null;
    }

    const itemId =

      item?.id ??

      `${type}-${index + 1}`;

    const score =
      getFirstFiniteExplanationValue([

        item?.score,

        item?.confidenceScore

      ]);

    if (
      type ===
        "strength"
    ) {

      return buildConfidenceMessage({

        id:
          `stored-confidence-strength-${itemId}`,

        title:
          getExplanationItemLabel(
            item,
            itemId
          ),

        reason:
          text,

        score,

        priority:
          Number.isFinite(
            item?.priority
          )
            ? item.priority
            : Number.isFinite(
                score
              )
              ? getPositiveMessagePriority(
                  score,
                  0.75
                )
              : 65 -
                index,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        sourcePath:
          "evaluation.confidence.strengths",

        sourceValue:
          itemId

      });

    }

    return buildUncertaintyMessage({

      id:
        `stored-confidence-uncertainty-${itemId}`,

      title:
        getExplanationItemLabel(
          item,
          itemId
        ),

      uncertainty:
        text,

      score,

      priority:
        Number.isFinite(
          item?.priority
        )
          ? item.priority
          : Number.isFinite(
              score
            )
            ? getConcernMessagePriority(
                score,
                0.75
              )
            : 68 -
              index,

      severity:
        Number.isFinite(
          score
        )
          ? getConcernSeverity(
              score
            )
          : EXPLANATION_SEVERITY_LEVELS
              .NOTICE,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        type ===
          "warning"
          ? "evaluation.confidence.warnings"
          : "evaluation.confidence.uncertainties",

      sourceValue:
        itemId

    });

  }



  /*
    ============================================================
    OVERALL CONFIDENCE NARRATIVE
    ============================================================
  */


  function createOverallConfidenceNarrativeMessage(
    crop,
    evaluation
  ) {

    const confidenceScore =
      evaluation.confidence
        ?.score;

    if (
      !Number.isFinite(
        confidenceScore
      )
    ) {
      return null;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const levelLabel =

      evaluation.confidence
        ?.levelLabel ??

      getConfidenceLevelLabel(
        getConfidenceLevel(
          confidenceScore
        )
      );

    const evidenceCoverage =
      evaluation.confidence
        ?.evidenceCoverage;

    const coverageDescriptor =
      getEvidenceCoverageDescriptor(
        evidenceCoverage
      );

    if (
      confidenceScore >= 78
    ) {

      return buildConfidenceMessage({

        id:
          "overall-confidence-narrative",

        title:
          levelLabel,

        reason:
          `The ${cropName} result has ${levelLabel.toLowerCase()} because the crop record has ${coverageDescriptor} evidence coverage and the major scoring phases reach a reasonably consistent conclusion`,

        score:
          confidenceScore,

        priority:
          100,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          convertPossibleCoverageToRatio(
            evidenceCoverage
          ),

        sourcePath:
          "evaluation.confidence.score",

        sourceValue:
          confidenceScore

      });

    }

    if (
      confidenceScore >= 58
    ) {

      return buildConfidenceMessage({

        id:
          "overall-confidence-narrative",

        title:
          levelLabel,

        reason:
          `The ${cropName} result has ${levelLabel.toLowerCase()}; enough evidence is available for a useful recommendation, but some uncertainty remains`,

        score:
          confidenceScore,

        priority:
          96,

        severity:
          EXPLANATION_SEVERITY_LEVELS
            .NOTICE,

        evidenceType:
          EXPLANATION_EVIDENCE_TYPES
            .STRUCTURAL,

        evidenceCoverage:
          convertPossibleCoverageToRatio(
            evidenceCoverage
          ),

        sourcePath:
          "evaluation.confidence.score",

        sourceValue:
          confidenceScore

      });

    }

    return buildUncertaintyMessage({

      id:
        "overall-confidence-limitation",

      title:
        levelLabel,

      uncertainty:
        `The ${cropName} result has ${levelLabel.toLowerCase()} and should be interpreted cautiously until additional crop-record evidence is verified`,

      score:
        confidenceScore,

      priority:
        105,

      severity:
        getConcernSeverity(
          confidenceScore
        ),

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      evidenceCoverage:
        convertPossibleCoverageToRatio(
          evidenceCoverage
        ),

      sourcePath:
        "evaluation.confidence.score",

      sourceValue:
        confidenceScore

    });

  }



  /*
    ============================================================
    MISSING SECTION AND FIELD EXPLANATIONS
    ============================================================
  */


  function createMissingSectionUncertaintyMessage(
    sectionId,
    index
  ) {

    const sectionLabel =
      convertIdentifierToWords(
        sectionId
      ) ||
      "Required Section";

    return buildUncertaintyMessage({

      id:
        `missing-section-${sectionId}`,

      title:
        "Missing Crop Data",

      uncertainty:
        `${sectionLabel} data is missing from the crop's planner record`,

      priority:
        85 -
        index,

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .MODERATE,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.confidence.missingSections",

      sourceValue:
        sectionId

    });

  }



  function createMissingFieldUncertaintyMessage(
    fieldPath,
    index
  ) {

    const finalSegment =
      typeof fieldPath ===
        "string"
        ? fieldPath
            .split(
              "."
            )
            .filter(
              Boolean
            )
            .pop()
        : null;

    const fieldLabel =
      convertIdentifierToWords(
        finalSegment
      ) ||
      "A critical recommendation field";

    return buildUncertaintyMessage({

      id:
        `missing-critical-field-${normalizeMessageForComparison(
          String(
            fieldPath
          )
        ).replace(
          /\s+/g,
          "-"
        )}`,

      title:
        "Unknown Critical Field",

      uncertainty:
        `${fieldLabel} remains unknown in the crop record, reducing recommendation certainty`,

      priority:
        78 -
        Math.min(
          index,
          12
        ),

      severity:
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        "evaluation.confidence.missingCriticalFields",

      sourceValue:
        fieldPath

    });

  }



  /*
    ============================================================
    CONFIDENCE EXPLANATION GENERATOR
    ============================================================
  */


  function generateConfidenceExplanationMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const confidenceCandidates = [];
    const uncertaintyCandidates = [];

    const overallMessage =
      createOverallConfidenceNarrativeMessage(
        crop,
        evaluation
      );

    if (
      overallMessage
    ) {

      if (
        overallMessage.type ===
          EXPLANATION_MESSAGE_TYPES
            .UNCERTAINTY
      ) {

        uncertaintyCandidates.push(
          overallMessage
        );

      } else {

        confidenceCandidates.push(
          overallMessage
        );

      }

    }

    getConfidenceFactorResultsForExplanation(
      evaluation
    ).forEach(
      factor => {

        const message =
          createConfidenceFactorMessage(
            crop,
            evaluation,
            factor
          );

        if (!message) {
          return;
        }

        if (
          message.type ===
            EXPLANATION_MESSAGE_TYPES
              .UNCERTAINTY
        ) {

          uncertaintyCandidates.push(
            message
          );

        } else {

          confidenceCandidates.push(
            message
          );

        }

      }
    );

    normalizeExplanationItemCollection(
      evaluation.confidence
        ?.strengths
    ).forEach(
      (
        strength,
        index
      ) => {

        const message =
          createStoredConfidenceItemMessage(
            strength,
            "strength",
            index
          );

        if (
          message
        ) {

          confidenceCandidates.push(
            message
          );

        }

      }
    );

    normalizeExplanationItemCollection(
      evaluation.confidence
        ?.uncertainties
    ).forEach(
      (
        uncertainty,
        index
      ) => {

        const message =
          createStoredConfidenceItemMessage(
            uncertainty,
            "uncertainty",
            index
          );

        if (
          message
        ) {

          uncertaintyCandidates.push(
            message
          );

        }

      }
    );

    normalizeExplanationItemCollection(
      evaluation.confidence
        ?.warnings
    ).forEach(
      (
        warning,
        index
      ) => {

        const message =
          createStoredConfidenceItemMessage(
            warning,
            "warning",
            index
          );

        if (
          message
        ) {

          uncertaintyCandidates.push(
            message
          );

        }

      }
    );

    const missingSections =
      Array.isArray(
        evaluation.confidence
          ?.missingSections
      )
        ? evaluation.confidence
            .missingSections
        : [];

    missingSections.forEach(
      (
        sectionId,
        index
      ) => {

        const message =
          createMissingSectionUncertaintyMessage(
            sectionId,
            index
          );

        if (
          message
        ) {

          uncertaintyCandidates.push(
            message
          );

        }

      }
    );

    const missingCriticalFields =
      Array.isArray(
        evaluation.confidence
          ?.missingCriticalFields
      )
        ? evaluation.confidence
            .missingCriticalFields
        : [];

    missingCriticalFields
      .slice(
        0,
        12
      )
      .forEach(
        (
          fieldPath,
          index
        ) => {

          const message =
            createMissingFieldUncertaintyMessage(
              fieldPath,
              index
            );

          if (
            message
          ) {

            uncertaintyCandidates.push(
              message
            );

          }

        }
      );

    addExplanationMessages(
      explanation.confidenceReasons,
      prepareExplanationMessages(
        confidenceCandidates,
        {
          limit:
            10,

          similarityThreshold:
            0.62
        }
      )
    );

    addExplanationMessages(
      explanation.uncertainties,
      prepareExplanationMessages(
        uncertaintyCandidates,
        {
          limit:
            12,

          similarityThreshold:
            0.58
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      confidenceExplanationCount:
        confidenceCandidates.length,

      uncertaintyExplanationCount:
        uncertaintyCandidates.length,

      missingSectionCount:
        missingSections.length,

      missingCriticalFieldCount:
        missingCriticalFields.length

    };

    return explanation;

  }



  /*
    ============================================================
    ELIGIBILITY FAILURE NORMALIZATION
    ============================================================
  */


  function getEligibilityHardFailures(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.eligibility
        ?.hardFailures
    );

  }



  function getEligibilityWarnings(
    evaluation
  ) {

    return normalizeExplanationItemCollection(
      evaluation.eligibility
        ?.warnings
    );

  }



  function getEligibilityFailureId(
    failure,
    index
  ) {

    return (

      failure?.id ??

      failure?.ruleId ??

      failure?.category ??

      `failure-${index + 1}`

    );

  }



  function getEligibilityFailureText(
    crop,
    evaluation,
    failure,
    index
  ) {

    const explicitText =
      getExplanationItemText(
        failure
      );

    if (
      explicitText
    ) {
      return explicitText;
    }

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const failureId =
      getEligibilityFailureId(
        failure,
        index
      );

    const reasonMap = {

      invalidCrop:
        `${cropName} does not contain a valid planner record`,

      "invalid-crop":
        `${cropName} does not contain a valid planner record`,

      developmentStatus:
        `${cropName} is not marked ready for public planner recommendations`,

      "development-status":
        `${cropName} is not marked ready for public planner recommendations`,

      lifecycle:
        `${cropName}'s lifecycle conflicts with a required visitor preference`,

      climate:
        `${cropName} does not meet a required climate or growing-season condition`,

      seasonLength:
        `${cropName} cannot reliably mature within the selected frost-free season`,

      "season-length":
        `${cropName} cannot reliably mature within the selected frost-free season`,

      space:
        `${cropName} does not fit the visitor's available growing-space requirements`,

      plantBehavior:
        `${cropName}'s growth behavior conflicts with a selected plant restriction`,

      "plant-behavior":
        `${cropName}'s growth behavior conflicts with a selected plant restriction`,

      usePath:
        `${cropName} has no enabled use path that satisfies the required feeding plan`,

      "use-path":
        `${cropName} has no enabled use path that satisfies the required feeding plan`,

      processing:
        `${cropName} requires a processing step the visitor is not willing to perform`,

      equipment:
        `${cropName} requires mandatory equipment that is unavailable`,

      drying:
        `${cropName} requires drying capability that is unavailable`,

      storage:
        `${cropName} requires a storage condition that is unavailable`,

      cooking:
        `${cropName} requires cooking or heat treatment that the visitor is not willing to perform`,

      safety:
        `${cropName} cannot be used safely through the remaining eligible feeding pathways`

    };

    return (
      reasonMap[
        failureId
      ] ||
      `${cropName} failed the required ${lowercaseFirstLetter(
        convertIdentifierToWords(
          failureId
        ) ||
        "eligibility"
      )} condition`
    );

  }



  function createEligibilityFailureMessage(
    crop,
    evaluation,
    failure,
    index
  ) {

    const failureId =
      getEligibilityFailureId(
        failure,
        index
      );

    const text =
      getEligibilityFailureText(
        crop,
        evaluation,
        failure,
        index
      );

    return buildRejectionMessage({

      id:
        `eligibility-rejection-${failureId}-${index + 1}`,

      title:
        getExplanationItemLabel(
          failure,
          failureId
        ),

      reason:
        text,

      priority:
        Number.isFinite(
          failure?.priority
        )
          ? failure.priority
          : 110 -
            index,

      severity:
        failure?.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .CRITICAL,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      evidenceCoverage:
        convertPossibleCoverageToRatio(
          failure?.evidenceCoverage
        ),

      sourcePath:
        failure?.sourcePath ||
        "evaluation.eligibility.hardFailures",

      sourceValue:
        failureId,

      metadata: {

        failureId,

        visitorValue:
          failure?.visitorValue ??
          null,

        cropValue:
          failure?.cropValue ??
          null

      }

    });

  }



  /*
    ============================================================
    ELIGIBILITY WARNING MESSAGE
    ============================================================
  */


  function createEligibilityWarningMessage(
    crop,
    evaluation,
    warning,
    index
  ) {

    const warningId =

      warning?.id ??

      warning?.ruleId ??

      warning?.category ??

      `warning-${index + 1}`;

    const explicitText =
      getExplanationItemText(
        warning
      );

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const text =
      explicitText ||
      `${cropName} has an unresolved eligibility caution related to ${lowercaseFirstLetter(
        convertIdentifierToWords(
          warningId
        ) ||
        "the selected plan"
      )}`;

    return createExplanationMessage({

      id:
        `eligibility-warning-${warningId}-${index + 1}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .WARNING,

      category:
        "eligibility",

      title:
        getExplanationItemLabel(
          warning,
          warningId
        ),

      text,

      shortText:
        text,

      severity:
        warning?.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        Number.isFinite(
          warning?.score
        )
          ? warning.score
          : null,

      priority:
        Number.isFinite(
          warning?.priority
        )
          ? warning.priority
          : 76 -
            index,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .DIRECT,

      evidenceCoverage:
        convertPossibleCoverageToRatio(
          warning?.evidenceCoverage
        ),

      sourcePath:
        warning?.sourcePath ||
        "evaluation.eligibility.warnings",

      sourceValue:
        warningId

    });

  }



  /*
    ============================================================
    REJECTED USE-PATH HARD FAILURE MESSAGES
    ============================================================
  */


  function createRejectedUsePathFailureMessages(
    evaluation
  ) {

    const rejectedPaths =
      Array.isArray(
        evaluation.usePaths
          ?.rejectedPaths
      )
        ? evaluation.usePaths
            .rejectedPaths
        : [];

    const messages = [];

    rejectedPaths.forEach(
      rejectedPath => {

        const failures =
          normalizeExplanationItemCollection(
            rejectedPath
              ?.hardFailures
          );

        failures.forEach(
          (
            failure,
            index
          ) => {

            const text =
              getExplanationItemText(
                failure
              );

            if (!text) {
              return;
            }

            messages.push(
              buildRejectionMessage({

                id:
                  `use-path-rejection-${rejectedPath.id}-${index + 1}`,

                title:
                  `${rejectedPath.label || "Use Path"} Excluded`,

                reason:
                  `${rejectedPath.label || "This use path"} was excluded because ${lowercaseFirstLetter(
                    removeEndingPunctuation(
                      text
                    )
                  )}`,

                priority:
                  88 -
                  index,

                severity:
                  EXPLANATION_SEVERITY_LEVELS
                    .HIGH,

                evidenceType:
                  EXPLANATION_EVIDENCE_TYPES
                    .DIRECT,

                sourcePath:
                  "evaluation.usePaths.rejectedPaths.hardFailures",

                sourceValue:
                  rejectedPath.id,

                relatedUsePathId:
                  rejectedPath.id

              })
            );

          }
        );

      }
    );

    return messages.filter(
      isValidExplanationMessage
    );

  }



  /*
    ============================================================
    REJECTION EXPLANATION GENERATOR
    ============================================================
  */


  function generateEligibilityAndRejectionMessages(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const rejectionCandidates = [];
    const warningCandidates = [];

    getEligibilityHardFailures(
      evaluation
    ).forEach(
      (
        failure,
        index
      ) => {

        const message =
          createEligibilityFailureMessage(
            crop,
            evaluation,
            failure,
            index
          );

        if (
          message
        ) {

          rejectionCandidates.push(
            message
          );

        }

      }
    );

    getEligibilityWarnings(
      evaluation
    ).forEach(
      (
        warning,
        index
      ) => {

        const message =
          createEligibilityWarningMessage(
            crop,
            evaluation,
            warning,
            index
          );

        if (
          message
        ) {

          warningCandidates.push(
            message
          );

        }

      }
    );

    /*
      When no practical use path remains, path hard failures are
      promoted into the rejection section.
    */

    if (
      !evaluation.usePaths
        ?.bestPath
    ) {

      rejectionCandidates.push(
        ...createRejectedUsePathFailureMessages(
          evaluation
        )
      );

    }

    /*
      Ensure a rejected crop always has at least one rejection
      explanation, even if an upstream failure object was empty.
    */

    if (
      !isCropEligible(
        evaluation
      ) &&
      rejectionCandidates.length ===
        0
    ) {

      const cropName =
        getCropReferenceName(
          crop,
          evaluation
        );

      rejectionCandidates.push(
        buildRejectionMessage({

          id:
            "generic-hard-eligibility-rejection",

          title:
            "Required Condition Failed",

          reason:
            `${cropName} failed at least one required eligibility condition and cannot be included in normal recommendation ranking`,

          priority:
            115,

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .CRITICAL,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.eligibility.eligible",

          sourceValue:
            false

        })
      );

    }

    addExplanationMessages(
      explanation.rejectedReasons,
      prepareExplanationMessages(
        rejectionCandidates,
        {
          limit:
            14,

          similarityThreshold:
            0.55
        }
      )
    );

    addExplanationMessages(
      explanation.warnings,
      prepareExplanationMessages(
        warningCandidates,
        {
          limit:
            10,

          similarityThreshold:
            0.60
        }
      )
    );

    /*
      Eligibility warnings also appear as considerations.
    */

    addExplanationMessages(
      explanation.considerations,
      warningCandidates
    );

    explanation.metadata = {

      ...explanation.metadata,

      eligibilityRejectionCount:
        rejectionCandidates.length,

      eligibilityWarningCount:
        warningCandidates.length

    };

    return explanation;

  }



  /*
    ============================================================
    FINAL ENGINE WARNING NORMALIZATION
    ============================================================
  */


  function createStoredEngineWarningMessage(
    warning,
    sourceId,
    index
  ) {

    const text =
      getExplanationItemText(
        warning
      );

    if (!text) {
      return null;
    }

    const warningId =

      warning?.id ??

      `${sourceId}-${index + 1}`;

    return createExplanationMessage({

      id:
        `engine-warning-${sourceId}-${warningId}`,

      type:
        EXPLANATION_MESSAGE_TYPES
          .WARNING,

      category:
        sourceId,

      title:
        getExplanationItemLabel(
          warning,
          warningId
        ),

      text,

      shortText:
        text,

      severity:
        warning?.severity ||
        EXPLANATION_SEVERITY_LEVELS
          .NOTICE,

      score:
        getFirstFiniteExplanationValue([

          warning?.score,

          warning?.safetyScore

        ]),

      priority:
        Number.isFinite(
          warning?.priority
        )
          ? warning.priority
          : 64 -
            index,

      evidenceType:
        EXPLANATION_EVIDENCE_TYPES
          .STRUCTURAL,

      sourcePath:
        `evaluation.${sourceId}.warnings`,

      sourceValue:
        warningId

    });

  }



  function generateStoredEngineWarnings(
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    const sourceCollections = [

      {
        id:
          "compatibility",

        collection:
          evaluation.compatibility
            ?.warnings
      },

      {
        id:
          "goals",

        collection:
          evaluation.goals
            ?.warnings
      },

      {
        id:
          "usePaths",

        collection:
          evaluation.usePaths
            ?.warnings
      },

      {
        id:
          "risks",

        collection:
          evaluation.risks
            ?.warnings
      },

      {
        id:
          "confidence",

        collection:
          evaluation.confidence
            ?.warnings
      },

      {
        id:
          "final",

        collection:
          evaluation.final
            ?.warnings
      }

    ];

    const warningMessages = [];

    sourceCollections.forEach(
      source => {

        normalizeExplanationItemCollection(
          source.collection
        ).forEach(
          (
            warning,
            index
          ) => {

            const message =
              createStoredEngineWarningMessage(
                warning,
                source.id,
                index
              );

            if (
              message
            ) {

              warningMessages.push(
                message
              );

            }

          }
        );

      }
    );

    addExplanationMessages(
      explanation.warnings,
      prepareExplanationMessages(
        warningMessages,
        {
          limit:
            14,

          similarityThreshold:
            0.58
        }
      )
    );

    explanation.metadata = {

      ...explanation.metadata,

      storedEngineWarningCount:
        warningMessages.length

    };

    return explanation;

  }



  /*
    ============================================================
    FINAL SUMMARY SUPPORT HELPERS
    ============================================================
  */


  function getBestExplanationMessageText(
    messages,
    options = {}
  ) {

    const prepared =
      prepareExplanationMessages(
        messages,
        {
          limit:
            1,

          similarityThreshold:
            options
              .similarityThreshold ??
            0.65
        }
      );

    if (
      prepared.length === 0
    ) {
      return null;
    }

    return options.useShortText ===
      true
      ? prepared[0]
          .shortText ||
        prepared[0].text
      : prepared[0].text;

  }



  function getTopExplanationFragments(
    messages,
    limit = 2
  ) {

    return prepareExplanationMessages(
      messages,
      {
        limit,

        similarityThreshold:
          0.62
      }
    )
      .map(
        message =>
          lowercaseFirstLetter(
            removeEndingPunctuation(
              message.shortText ||
              message.text
            )
          )
      )
      .filter(
        Boolean
      );

  }



  function getPrimaryConsiderationFragments(
    explanation,
    limit = 2
  ) {

    return getTopExplanationFragments(
      explanation.considerations,
      limit
    );

  }



  function getPrimaryMitigationFragments(
    explanation,
    limit = 2
  ) {

    return getTopExplanationFragments(
      explanation.riskMitigations,
      limit
    );

  }



  /*
    ============================================================
    FINAL DETAILED SUMMARY — ELIGIBLE CROP
    ============================================================
  */


  function createEligibleCropDetailedSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const final =
      evaluation.final ||
      {};

    const score =
      final.score;

    const scoreBandLabel =
      final.scoreBandLabel ||
      "Evaluated Fit";

    const statusLabel =
      final.recommendationStatusLabel ||
      "Evaluated Crop";

    const rank =
      final.rank;

    const bestPath =
      getBestUsePathEvaluation(
        evaluation
      );

    const confidenceLabel =

      evaluation.confidence
        ?.levelLabel ??

      "Unknown Confidence";

    const compatibilityFragments =
      getTopExplanationFragments(
        explanation
          .compatibilityHighlights,
        2
      );

    const goalFragments =
      getTopExplanationFragments(
        explanation.goalMatches,
        2
      );

    const considerationFragments =
      getPrimaryConsiderationFragments(
        explanation,
        2
      );

    const mitigationFragments =
      getPrimaryMitigationFragments(
        explanation,
        2
      );

    const sentences = [];

    let openingSentence =
      `${cropName} is classified as ${statusLabel.toLowerCase()}`;

    if (
      Number.isFinite(
        score
      )
    ) {

      openingSentence +=
        ` with a ${scoreBandLabel.toLowerCase()} suitability score of ${formatNumberForExplanation(
          score,
          1
        )}`;

    }

    if (
      Number.isFinite(
        rank
      )
    ) {

      openingSentence +=
        ` and ranks ${getOrdinalNumberLabel(
          rank
        )} among the evaluated crops`;

    }

    sentences.push(
      ensureEndingPeriod(
        openingSentence
      )
    );

    const strengthFragments = [

      ...compatibilityFragments,

      ...goalFragments

    ].slice(
      0,
      3
    );

    if (
      strengthFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `Its strongest advantages are that ${joinNaturalLanguageList(
            strengthFragments
          )}`
        )
      );

    }

    if (
      bestPath
    ) {

      sentences.push(
        ensureEndingPeriod(
          `${bestPath.label} is the strongest practical use path because it best fits the selected harvest, processing, equipment, drying, storage, and feeding requirements`
        )
      );

    }

    if (
      considerationFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `The main considerations are that ${joinNaturalLanguageList(
            considerationFragments
          )}`
        )
      );

    }

    if (
      mitigationFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `The most useful management steps are to ${joinNaturalLanguageList(
            mitigationFragments.map(
              fragment =>
                fragment.replace(
                  /^(to\s+)/i,
                  ""
                )
            )
          )}`
        )
      );

    }

    sentences.push(
      ensureEndingPeriod(
        `The recommendation carries ${confidenceLabel.toLowerCase()}`
      )
    );

    return sentences
      .filter(
        Boolean
      )
      .join(
        " "
      );

  }



  /*
    ============================================================
    FINAL DETAILED SUMMARY — REJECTED CROP
    ============================================================
  */


  function createRejectedCropDetailedSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const rejectionFragments =
      getTopExplanationFragments(
        explanation.rejectedReasons,
        4
      );

    const diagnosticStrengths =
      getTopExplanationFragments(
        explanation.whyRecommended,
        2
      );

    const sentences = [];

    sentences.push(
      ensureEndingPeriod(
        `${cropName} is excluded from normal recommendation ranking because it failed one or more required eligibility conditions`
      )
    );

    if (
      rejectionFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `The specific reasons are that ${joinNaturalLanguageList(
            rejectionFragments
          )}`
        )
      );

    }

    if (
      diagnosticStrengths.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `Although ${joinNaturalLanguageList(
            diagnosticStrengths
          )}, those strengths do not override the failed requirement`
        )
      );

    }

    return sentences
      .filter(
        Boolean
      )
      .join(
        " "
      );

  }



  /*
    ============================================================
    FINAL DETAILED SUMMARY — NO USE PATH
    ============================================================
  */


  function createNoUsePathDetailedSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const rejectionFragments =
      getTopExplanationFragments(
        explanation.rejectedReasons,
        4
      );

    const compatibilityFragments =
      getTopExplanationFragments(
        explanation
          .compatibilityHighlights,
        2
      );

    const sentences = [];

    sentences.push(
      ensureEndingPeriod(
        `${cropName} may be growable under at least some of the selected conditions, but no safe and practical harvest-to-feeding pathway remains`
      )
    );

    if (
      rejectionFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `The available use paths were excluded because ${joinNaturalLanguageList(
            rejectionFragments
          )}`
        )
      );

    }

    if (
      compatibilityFragments.length >
        0
    ) {

      sentences.push(
        ensureEndingPeriod(
          `The crop still shows some growing strengths, including that ${joinNaturalLanguageList(
            compatibilityFragments
          )}, but those strengths cannot produce a usable recommendation without an eligible feeding path`
        )
      );

    }

    return sentences
      .filter(
        Boolean
      )
      .join(
        " "
      );

  }



  /*
    ============================================================
    FINAL DETAILED SUMMARY — INSUFFICIENT DATA
    ============================================================
  */


  function createInsufficientDataDetailedSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const uncertaintyFragments =
      getTopExplanationFragments(
        explanation.uncertainties,
        4
      );

    let summary =
      `${cropName} cannot yet receive a fully reliable recommendation because the available crop record does not provide enough verified evidence`;

    if (
      uncertaintyFragments.length >
        0
    ) {

      summary +=
        `. The main data limitations are that ${joinNaturalLanguageList(
          uncertaintyFragments
        )}`;

    }

    return ensureEndingPeriod(
      summary
    );

  }



  /*
    ============================================================
    FINAL DETAILED SUMMARY ROUTER
    ============================================================
  */


  function createFinalDetailedRecommendationSummary(
    crop,
    evaluation,
    explanation
  ) {

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    if (
      status ===
        "rejected"
    ) {

      return createRejectedCropDetailedSummary(
        crop,
        evaluation,
        explanation
      );

    }

    if (
      status ===
        "no-practical-use-path"
    ) {

      return createNoUsePathDetailedSummary(
        crop,
        evaluation,
        explanation
      );

    }

    if (
      status ===
        "insufficient-data"
    ) {

      return createInsufficientDataDetailedSummary(
        crop,
        evaluation,
        explanation
      );

    }

    return createEligibleCropDetailedSummary(
      crop,
      evaluation,
      explanation
    );

  }



  /*
    ============================================================
    FINAL SHORT SUMMARY
    ============================================================
  */


  function createFinalShortRecommendationSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const final =
      evaluation.final ||
      {};

    const status =
      final.recommendationStatus;

    if (
      status ===
        "rejected"
    ) {

      const rejectionText =
        getBestExplanationMessageText(
          explanation.rejectedReasons,
          {
            useShortText:
              true
          }
        );

      return ensureEndingPeriod(
        rejectionText
          ? `${cropName} is ineligible: ${lowercaseFirstLetter(
              removeEndingPunctuation(
                rejectionText
              )
            )}`
          : `${cropName} is ineligible because it failed a required condition`
      );

    }

    if (
      status ===
        "no-practical-use-path"
    ) {

      return ensureEndingPeriod(
        `${cropName} has no practical harvest-to-feeding use path under the selected requirements`
      );

    }

    if (
      status ===
        "insufficient-data"
    ) {

      return ensureEndingPeriod(
        `${cropName} has insufficient verified data for a reliable recommendation`
      );

    }

    const scoreText =
      Number.isFinite(
        final.score
      )
        ? `${formatNumberForExplanation(
            final.score,
            1
          )} suitability`
        : null;

    const bestPathLabel =
      final.bestUsePathLabel;

    const parts = [

      final
        .recommendationStatusLabel,

      scoreText,

      bestPathLabel

    ].filter(
      Boolean
    );

    return ensureEndingPeriod(
      `${cropName}: ${parts.join(
        " · "
      )}`
    );

  }



  /*
    ============================================================
    FINAL SUMMARY
    ============================================================
  */


  function createFinalRecommendationSummary(
    crop,
    evaluation,
    explanation
  ) {

    const cropName =
      getCropReferenceName(
        crop,
        evaluation
      );

    const status =
      getFinalRecommendationStatus(
        evaluation
      );

    if (
      status ===
        "rejected"
    ) {

      const reason =
        getBestExplanationMessageText(
          explanation.rejectedReasons,
          {
            useShortText:
              true
          }
        );

      return ensureEndingPeriod(
        reason
          ? `${cropName} is excluded because ${lowercaseFirstLetter(
              removeEndingPunctuation(
                reason
              )
            )}`
          : `${cropName} is excluded because it failed a required eligibility condition`
      );

    }

    if (
      status ===
        "no-practical-use-path"
    ) {

      return ensureEndingPeriod(
        `${cropName} is not recommended because no practical harvest, processing, storage, and feeding pathway remains`
      );

    }

    if (
      status ===
        "insufficient-data"
    ) {

      return ensureEndingPeriod(
        `${cropName} cannot yet receive a reliable recommendation because important crop-record evidence is missing`
      );

    }

    const primaryReasons =
      getTopExplanationFragments(
        explanation.whyRecommended,
        3
      );

    if (
      primaryReasons.length >
        0
    ) {

      return ensureEndingPeriod(
        `${cropName} is ${
          status ===
            "not-recommended"
            ? "not recommended"
            : "recommended"
        } because ${joinNaturalLanguageList(
          primaryReasons
        )}`
      );

    }

    return createBasicRecommendationSummary(
      crop,
      evaluation
    );

  }



  /*
    ============================================================
    EXPLANATION QUALITY CHECKS
    ============================================================
  */


  function getAllExplanationMessages(
    explanation
  ) {

    const collections = [

      explanation.whyRecommended,

      explanation.compatibilityHighlights,

      explanation.goalMatches,

      explanation.usePathReasons,

      explanation.considerations,

      explanation.riskMitigations,

      explanation.confidenceReasons,

      explanation.uncertainties,

      explanation.rejectedReasons,

      explanation.warnings

    ];

    return collections.flatMap(
      collection =>
        Array.isArray(
          collection
        )
          ? collection
          : []
    );

  }



  function countExplanationMessagesByEvidenceType(
    explanation
  ) {

    return getAllExplanationMessages(
      explanation
    ).reduce(
      (
        counts,
        message
      ) => {

        const evidenceType =
          message.evidenceType ||
          EXPLANATION_EVIDENCE_TYPES
            .UNKNOWN;

        counts[
          evidenceType
        ] =
          (
            counts[
              evidenceType
            ] ||
            0
          ) +
          1;

        return counts;

      },
      {}
    );

  }



  function calculateExplanationEvidenceCoverage(
    explanation
  ) {

    const messages =
      getAllExplanationMessages(
        explanation
      ).filter(
        isValidExplanationMessage
      );

    const knownCoverages =
      messages
        .map(
          message =>
            convertPossibleCoverageToRatio(
              message.evidenceCoverage
            )
        )
        .filter(
          Number.isFinite
        );

    if (
      knownCoverages.length ===
        0
    ) {

      return null;

    }

    return roundScore(
      averageKnownValues(
        knownCoverages
      ) *
      100
    );

  }



  function createExplanationQualityWarnings(
    evaluation,
    explanation
  ) {

    const warnings = [];

    if (
      isCropEligible(
        evaluation
      ) &&
      explanation
        .whyRecommended
        .length ===
          0
    ) {

      warnings.push(
        createExplanationMessage({

          id:
            "missing-positive-recommendation-reasons",

          type:
            EXPLANATION_MESSAGE_TYPES
              .WARNING,

          category:
            "explanation",

          title:
            "Missing Recommendation Reasons",

          text:
            "The crop is eligible, but no positive recommendation reasons were generated",

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .MODERATE,

          priority:
            95,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.explanation.whyRecommended",

          sourceValue:
            0,

          diagnosticOnly:
            true

        })
      );

    }

    if (
      !isCropEligible(
        evaluation
      ) &&
      explanation
        .rejectedReasons
        .length ===
          0
    ) {

      warnings.push(
        createExplanationMessage({

          id:
            "missing-rejection-reasons",

          type:
            EXPLANATION_MESSAGE_TYPES
              .WARNING,

          category:
            "explanation",

          title:
            "Missing Rejection Reasons",

          text:
            "The crop is ineligible, but no specific rejection reason was generated",

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .HIGH,

          priority:
            110,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.explanation.rejectedReasons",

          sourceValue:
            0,

          diagnosticOnly:
            true

        })
      );

    }

    if (
      evaluation.usePaths
        ?.bestPath &&
      explanation
        .usePathReasons
        .length ===
          0
    ) {

      warnings.push(
        createExplanationMessage({

          id:
            "missing-use-path-explanation",

          type:
            EXPLANATION_MESSAGE_TYPES
              .WARNING,

          category:
            "explanation",

          title:
            "Missing Use-Path Explanation",

          text:
            "A best use path was selected, but no use-path explanation was generated",

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .MODERATE,

          priority:
            90,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.explanation.usePathReasons",

          sourceValue:
            0,

          diagnosticOnly:
            true

        })
      );

    }

    if (
      Number.isFinite(
        evaluation.confidence
          ?.score
      ) &&
      explanation
        .confidenceReasons
        .length ===
          0 &&
      explanation
        .uncertainties
        .length ===
          0
    ) {

      warnings.push(
        createExplanationMessage({

          id:
            "missing-confidence-explanation",

          type:
            EXPLANATION_MESSAGE_TYPES
              .WARNING,

          category:
            "explanation",

          title:
            "Missing Confidence Explanation",

          text:
            "A confidence score was calculated, but no confidence narrative was generated",

          severity:
            EXPLANATION_SEVERITY_LEVELS
              .NOTICE,

          priority:
            82,

          evidenceType:
            EXPLANATION_EVIDENCE_TYPES
              .STRUCTURAL,

          sourcePath:
            "evaluation.explanation.confidenceReasons",

          sourceValue:
            0,

          diagnosticOnly:
            true

        })
      );

    }

    return warnings.filter(
      isValidExplanationMessage
    );

  }



  /*
    ============================================================
    FINAL PART 12D PREPARATION
    ============================================================
  */


  function prepareFinalExplanationNarratives(
    crop,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    /*
      Prepare collections before building summaries so that the
      summaries use the same message order as the UI.
    */

    prepareExplanationCollections(
      explanation
    );

    explanation.summary =
      createFinalRecommendationSummary(
        crop,
        evaluation,
        explanation
      );

    explanation.shortSummary =
      createFinalShortRecommendationSummary(
        crop,
        evaluation,
        explanation
      );

    explanation.detailedSummary =
      createFinalDetailedRecommendationSummary(
        crop,
        evaluation,
        explanation
      );

    return explanation;

  }



  /*
    ============================================================
    PART 12D EVALUATOR
    ============================================================
  */


  function evaluateRiskConfidenceAndRejectionExplanation(
    crop,
    answers,
    evaluation
  ) {

    const explanation =
      ensureExplanationEvaluationObject(
        evaluation
      );

    generateDetailedRiskMessages(
      crop,
      answers,
      evaluation
    );

    generateConfidenceExplanationMessages(
      crop,
      answers,
      evaluation
    );

    generateEligibilityAndRejectionMessages(
      crop,
      answers,
      evaluation
    );

    generateStoredEngineWarnings(
      evaluation
    );

    addExplanationMessages(
      explanation.warnings,
      createExplanationQualityWarnings(
        evaluation,
        explanation
      )
    );

    prepareFinalExplanationNarratives(
      crop,
      evaluation
    );

    explanation.metadata = {

      ...explanation.metadata,

      part12DComplete:
        true,

      explanationEvidenceCoverage:
        calculateExplanationEvidenceCoverage(
          explanation
        ),

      explanationEvidenceCounts:
        countExplanationMessagesByEvidenceType(
          explanation
        )

    };

    return explanation;

  }



  /*
    ============================================================
    COMPLETE EXPLANATION ORCHESTRATOR

    This runs all four Part 12 sections in the correct order.

    Required completed phases:

      eligibility
      compatibility
      goals
      usePaths
      risks
      confidence
      final

    This function may be called only after the crop's final score
    has been created.
    ============================================================
  */


  function evaluateRecommendationExplanation(
    crop,
    answers,
    evaluation
  ) {

    if (
      !crop ||
      typeof crop !==
        "object"
    ) {

      throw new TypeError(
        "evaluateRecommendationExplanation requires a valid crop record."
      );

    }

    if (
      !answers ||
      typeof answers !==
        "object"
    ) {

      throw new TypeError(
        "evaluateRecommendationExplanation requires a valid questionnaire answer object."
      );

    }

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {

      throw new TypeError(
        "evaluateRecommendationExplanation requires a valid crop evaluation object."
      );

    }

    /*
      Part 12A
    */

    initializeRecommendationExplanation(
      crop,
      answers,
      evaluation
    );

    /*
      Part 12B
    */

    evaluatePrimaryRecommendationExplanation(
      crop,
      answers,
      evaluation
    );

    /*
      Part 12C
    */

    evaluateDetailedFitExplanation(
      crop,
      answers,
      evaluation
    );

    /*
      Part 12D
    */

    evaluateRiskConfidenceAndRejectionExplanation(
      crop,
      answers,
      evaluation
    );

    /*
      Part 12A final framework builder
    */

    finalizeRecommendationExplanationFramework(
      crop,
      evaluation
    );

    evaluation.explanation.metadata = {

      ...evaluation.explanation
        .metadata,

      explanationPhase:
        "12-complete",

      allExplanationPartsComplete:
        true

    };

    return evaluation.explanation;

  }



  /*
    ============================================================
    EXPLANATION REBUILD HELPER

    Useful after collection ranking has assigned:

      rank
      tieGroup
      nearest competitor margin
      collection stability

    Calling this function again safely resets and rebuilds the
    explanation with the final ranking information.
    ============================================================
  */


  function rebuildRecommendationExplanation(
    crop,
    answers,
    evaluation
  ) {

    return evaluateRecommendationExplanation(
      crop,
      answers,
      evaluation
    );

  }



  /*
    ============================================================
    COLLECTION EXPLANATION REBUILD

    After rankCropEvaluations() completes, this helper rebuilds
    every crop explanation so rank and cross-crop stability are
    reflected in visitor-facing messages.

    cropLookup may be:

      - an object keyed by crop ID;
      - a Map keyed by crop ID;
      - an array of crop records.
    ============================================================
  */


  function findCropForEvaluation(
    cropLookup,
    evaluation
  ) {

    const cropId =
      getEvaluationCropId(
        evaluation
      );

    if (
      !cropId
    ) {
      return null;
    }

    if (
      cropLookup instanceof
        Map
    ) {

      return (
        cropLookup.get(
          cropId
        ) ||
        null
      );

    }

    if (
      Array.isArray(
        cropLookup
      )
    ) {

      return (
        cropLookup.find(
          crop => {

            const identity =
              getCropPlannerSection(
                crop,
                "identity"
              ) || {};

            return (
              crop.id ===
                cropId ||
              identity.id ===
                cropId
            );

          }
        ) ||
        null
      );

    }

    if (
      cropLookup &&
      typeof cropLookup ===
        "object"
    ) {

      return (
        cropLookup[
          cropId
        ] ||
        null
      );

    }

    return null;

  }



  function rebuildRankedCropExplanations(
    cropLookup,
    answers,
    evaluations
  ) {

    if (
      !Array.isArray(
        evaluations
      )
    ) {
      return [];
    }

    return evaluations.map(
      evaluation => {

        const crop =
          findCropForEvaluation(
            cropLookup,
            evaluation
          );

        if (
          !crop
        ) {

          const explanation =
            ensureExplanationEvaluationObject(
              evaluation
            );

          explanation.warnings.push(
            createExplanationMessage({

              id:
                "crop-record-not-found-for-explanation",

              type:
                EXPLANATION_MESSAGE_TYPES
                  .WARNING,

              category:
                "explanation",

              title:
                "Crop Record Not Found",

              text:
                "The crop record could not be located while rebuilding the final ranked explanation",

              severity:
                EXPLANATION_SEVERITY_LEVELS
                  .HIGH,

              priority:
                110,

              evidenceType:
                EXPLANATION_EVIDENCE_TYPES
                  .STRUCTURAL,

              sourcePath:
                "rebuildRankedCropExplanations.cropLookup",

              sourceValue:
                getEvaluationCropId(
                  evaluation
                ),

              diagnosticOnly:
                true

            })
          );

          return evaluation;

        }

        rebuildRecommendationExplanation(
          crop,
          answers,
          evaluation
        );

        return evaluation;

      }
    );

  }

    /*
    ============================================================
    PART 13
    FINAL ENGINE INTEGRATION

    PART 13A
    CORE SINGLE-CROP EVALUATION PIPELINE

    This section connects all completed engine phases into one
    deterministic single-crop evaluation process.

    The collection-ranking layer is added in Part 13B.

    Main public function introduced here:

      evaluateCrop(
        crop,
        answers,
        options
      )

    The returned object is the complete internal crop evaluation.
    ============================================================
  */


  /*
    ============================================================
    ENGINE PIPELINE CONSTANTS
    ============================================================
  */


  const ENGINE_PIPELINE_VERSION =
    "2.0.0";


  const ENGINE_PHASE_IDS =
    Object.freeze({

      INITIALIZATION:
        "initialization",

      ELIGIBILITY:
        "eligibility",

      COMPATIBILITY:
        "compatibility",

      GOALS:
        "goals",

      USE_PATHS:
        "usePaths",

      RISKS:
        "risks",

      CONFIDENCE:
        "confidence",

      FINAL:
        "final",

      EXPLANATION:
        "explanation"

    });


  const ENGINE_PHASE_ORDER =
    Object.freeze([

      ENGINE_PHASE_IDS
        .INITIALIZATION,

      ENGINE_PHASE_IDS
        .ELIGIBILITY,

      ENGINE_PHASE_IDS
        .COMPATIBILITY,

      ENGINE_PHASE_IDS
        .GOALS,

      ENGINE_PHASE_IDS
        .USE_PATHS,

      ENGINE_PHASE_IDS
        .RISKS,

      ENGINE_PHASE_IDS
        .CONFIDENCE,

      ENGINE_PHASE_IDS
        .FINAL,

      ENGINE_PHASE_IDS
        .EXPLANATION

    ]);


  const ENGINE_EVALUATION_STATUSES =
    Object.freeze({

      PENDING:
        "pending",

      RUNNING:
        "running",

      COMPLETE:
        "complete",

      COMPLETE_WITH_WARNINGS:
        "complete-with-warnings",

      FAILED:
        "failed"

    });


  const ENGINE_PHASE_STATUSES =
    Object.freeze({

      PENDING:
        "pending",

      RUNNING:
        "running",

      COMPLETE:
        "complete",

      SKIPPED:
        "skipped",

      FAILED:
        "failed"

    });



  /*
    ============================================================
    DEFAULT SINGLE-CROP OPTIONS
    ============================================================
  */


  const DEFAULT_CROP_EVALUATION_OPTIONS =
    Object.freeze({

      /*
        When true, the engine evaluates compatibility, goals,
        risks, and confidence even when hard eligibility fails.

        This preserves diagnostic information explaining why a
        rejected crop may still have certain strengths.
      */

      evaluateRejectedCrops:
        true,

      /*
        When true, use-path evaluation is attempted for rejected
        crops. Hard eligibility failures still prevent a normal
        recommendation.
      */

      evaluateRejectedUsePaths:
        true,

      /*
        Generate an initial explanation before collection rank is
        assigned. Part 13B will rebuild this explanation after
        cross-crop ranking.
      */

      generateExplanation:
        true,

      /*
        When true, unexpected phase errors are stored inside the
        evaluation rather than immediately stopping execution.

        Fatal input errors still throw unless suppressFatalErrors
        is also true.
      */

      isolatePhaseErrors:
        true,

      /*
        When true, invalid crop or questionnaire input returns a
        failed evaluation rather than throwing.
      */

      suppressFatalErrors:
        false,

      /*
        Include detailed phase timing information.
      */

      includeTiming:
        true,

      /*
        Include diagnostic metadata intended for HQ testing.
      */

      includeDiagnostics:
        true,

      /*
        Optional caller-supplied context.
      */

      context:
        null

    });



  function normalizeCropEvaluationOptions(
    options
  ) {

    const suppliedOptions =
      options &&
      typeof options ===
        "object"
        ? options
        : {};

    return {

      ...DEFAULT_CROP_EVALUATION_OPTIONS,

      ...suppliedOptions,

      evaluateRejectedCrops:
        suppliedOptions
          .evaluateRejectedCrops !==
            undefined
          ? suppliedOptions
              .evaluateRejectedCrops ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .evaluateRejectedCrops,

      evaluateRejectedUsePaths:
        suppliedOptions
          .evaluateRejectedUsePaths !==
            undefined
          ? suppliedOptions
              .evaluateRejectedUsePaths ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .evaluateRejectedUsePaths,

      generateExplanation:
        suppliedOptions
          .generateExplanation !==
            undefined
          ? suppliedOptions
              .generateExplanation ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .generateExplanation,

      isolatePhaseErrors:
        suppliedOptions
          .isolatePhaseErrors !==
            undefined
          ? suppliedOptions
              .isolatePhaseErrors ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .isolatePhaseErrors,

      suppressFatalErrors:
        suppliedOptions
          .suppressFatalErrors !==
            undefined
          ? suppliedOptions
              .suppressFatalErrors ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .suppressFatalErrors,

      includeTiming:
        suppliedOptions
          .includeTiming !==
            undefined
          ? suppliedOptions
              .includeTiming ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .includeTiming,

      includeDiagnostics:
        suppliedOptions
          .includeDiagnostics !==
            undefined
          ? suppliedOptions
              .includeDiagnostics ===
                true
          : DEFAULT_CROP_EVALUATION_OPTIONS
              .includeDiagnostics

    };

  }



  /*
    ============================================================
    HIGH-RESOLUTION TIMER HELPERS
    ============================================================
  */


  function getEngineTimestamp()
  {

    if (
      typeof performance !==
        "undefined" &&
      performance &&
      typeof performance.now ===
        "function"
    ) {

      return performance.now();

    }

    return Date.now();

  }



  function calculateElapsedMilliseconds(
    startTime,
    endTime
  ) {

    if (
      !Number.isFinite(
        startTime
      ) ||
      !Number.isFinite(
        endTime
      )
    ) {
      return null;
    }

    return Math.max(
      0,
      endTime -
      startTime
    );

  }



  function roundMilliseconds(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    return Math.round(
      value *
      1000
    ) / 1000;

  }



  /*
    ============================================================
    ERROR NORMALIZATION
    ============================================================
  */


  function normalizeEngineError(
    error,
    options = {}
  ) {

    const normalizedError =
      error instanceof
        Error
        ? error
        : new Error(
            typeof error ===
              "string"
              ? error
              : "Unknown engine error."
          );

    return {

      phase:
        options.phase ||
        null,

      code:
        options.code ||
        normalizedError.code ||
        "ENGINE_ERROR",

      name:
        normalizedError.name ||
        "Error",

      message:
        normalizedError.message ||
        "Unknown engine error.",

      stack:
        typeof normalizedError
          .stack ===
            "string"
          ? normalizedError.stack
          : null,

      fatal:
        options.fatal ===
          true,

      recoverable:
        options.recoverable !==
          false,

      cropId:
        options.cropId ||
        null,

      timestamp:
        new Date()
          .toISOString(),

      metadata:
        options.metadata &&
        typeof options.metadata ===
          "object"
          ? {
              ...options.metadata
            }
          : {}

    };

  }



  function createEngineInputError(
    message,
    code
  ) {

    const error =
      new TypeError(
        message
      );

    error.code =
      code ||
      "INVALID_ENGINE_INPUT";

    return error;

  }



  /*
    ============================================================
    INPUT VALIDATION
    ============================================================
  */


  function validateCropEvaluationInput(
    crop,
    answers
  ) {

    const errors = [];

    if (
      !crop ||
      typeof crop !==
        "object" ||
      Array.isArray(
        crop
      )
    ) {

      errors.push(
        createEngineInputError(
          "evaluateCrop requires a valid crop record object.",
          "INVALID_CROP_RECORD"
        )
      );

    }

    if (
      !answers ||
      typeof answers !==
        "object" ||
      Array.isArray(
        answers
      )
    ) {

      errors.push(
        createEngineInputError(
          "evaluateCrop requires a valid questionnaire answer object.",
          "INVALID_QUESTIONNAIRE_ANSWERS"
        )
      );

    }

    return {

      valid:
        errors.length ===
          0,

      errors

    };

  }



  /*
    ============================================================
    CROP IDENTITY RESOLUTION
    ============================================================
  */


  function resolveCropEvaluationIdentity(
    crop
  ) {

    const identity =
      crop &&
      typeof crop ===
        "object"
        ? (
            getCropPlannerSection(
              crop,
              "identity"
            ) ||
            {}
          )
        : {};

    const cropId =

      identity.id ??

      crop?.id ??

      crop?.cropId ??

      null;

    const cropName =

      identity.commonName ??

      identity.name ??

      crop?.label ??

      crop?.name ??

      cropId ??

      "Unknown Crop";

    return {

      cropId,

      cropName,

      scientificName:

        identity.scientificName ??

        identity.botanicalName ??

        null,

      developmentStatus:

        crop?.plannerData
          ?.developmentStatus ??

        crop?.developmentStatus ??

        identity.developmentStatus ??

        null

    };

  }



  /*
    ============================================================
    PIPELINE METADATA OBJECT
    ============================================================
  */


  function createPipelinePhaseMetadata(
    phaseId
  ) {

    return {

      id:
        phaseId,

      status:
        ENGINE_PHASE_STATUSES
          .PENDING,

      startedAt:
        null,

      completedAt:
        null,

      durationMs:
        null,

      skippedReason:
        null,

      warningCount:
        0,

      errorCount:
        0,

      errors:
        [],

      metadata:
        {}

    };

  }



  function createPipelineMetadata(
    crop,
    options
  ) {

    const identity =
      resolveCropEvaluationIdentity(
        crop
      );

    const phases = {};

    ENGINE_PHASE_ORDER.forEach(
      phaseId => {

        phases[
          phaseId
        ] =
          createPipelinePhaseMetadata(
            phaseId
          );

      }
    );

    return {

      pipelineVersion:
        ENGINE_PIPELINE_VERSION,

      engineVersion:
        typeof ENGINE_VERSION ===
          "string"
          ? ENGINE_VERSION
          : ENGINE_PIPELINE_VERSION,

      status:
        ENGINE_EVALUATION_STATUSES
          .PENDING,

      cropId:
        identity.cropId,

      cropName:
        identity.cropName,

      startedAt:
        null,

      completedAt:
        null,

      durationMs:
        null,

      phaseOrder:
        [
          ...ENGINE_PHASE_ORDER
        ],

      phases,

      completedPhases:
        [],

      skippedPhases:
        [],

      failedPhases:
        [],

      warningCount:
        0,

      errorCount:
        0,

      errors:
        [],

      options: {

        evaluateRejectedCrops:
          options
            .evaluateRejectedCrops,

        evaluateRejectedUsePaths:
          options
            .evaluateRejectedUsePaths,

        generateExplanation:
          options
            .generateExplanation,

        isolatePhaseErrors:
          options
            .isolatePhaseErrors,

        includeTiming:
          options
            .includeTiming,

        includeDiagnostics:
          options
            .includeDiagnostics

      },

      context:
        options.context ??
        null

    };

  }



  /*
    ============================================================
    EVALUATION PIPELINE INITIALIZATION
    ============================================================
  */


  function ensureEvaluationPipelineObjects(
    evaluation,
    crop,
    options
  ) {

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {

      throw new TypeError(
        "A valid evaluation object is required."
      );

    }

    evaluation.pipeline =
      createPipelineMetadata(
        crop,
        options
      );

    evaluation.errors =
      Array.isArray(
        evaluation.errors
      )
        ? evaluation.errors
        : [];

    evaluation.warnings =
      Array.isArray(
        evaluation.warnings
      )
        ? evaluation.warnings
        : [];

    evaluation.metadata =
      evaluation.metadata &&
      typeof evaluation.metadata ===
        "object"
        ? evaluation.metadata
        : {};

    evaluation.metadata = {

      ...evaluation.metadata,

      pipelineVersion:
        ENGINE_PIPELINE_VERSION,

      engineVersion:
        typeof ENGINE_VERSION ===
          "string"
          ? ENGINE_VERSION
          : ENGINE_PIPELINE_VERSION,

      evaluationStatus:
        ENGINE_EVALUATION_STATUSES
          .PENDING,

      collectionRankAssigned:
        false,

      explanationBuiltBeforeRanking:
        false,

      explanationRebuiltAfterRanking:
        false

    };

    return evaluation;

  }



  /*
    ============================================================
    FAILED EVALUATION FALLBACK
    ============================================================
  */


  function createFailedCropEvaluation(
    crop,
    answers,
    error,
    options
  ) {

    const identity =
      resolveCropEvaluationIdentity(
        crop
      );

    let evaluation;

    try {

      evaluation =
        createCropEvaluation(
          crop,
          answers
        );

    } catch (
      initializationError
    ) {

      evaluation = {

        cropId:
          identity.cropId,

        cropName:
          identity.cropName,

        crop,

        eligibility:
          createEligibilityObject(),

        compatibility:
          createEvidenceObject(),

        goals:
          createEvidenceObject(),

        usePaths: {

          score:
            null,

          evidenceCoverage:
            null,

          bestPath:
            null,

          alternativePaths:
            [],

          eligiblePaths:
            [],

          rejectedPaths:
            [],

          warnings:
            []

        },

        risks: {

          score:
            null,

          rawRiskScore:
            null,

          adjustment:
            0,

          evidenceCoverage:
            null,

          categoryResults:
            [],

          primaryRisks:
            [],

          moderateRisks:
            [],

          managedRisks:
            [],

          mitigations:
            [],

          warnings:
            []

        },

        confidence:
          createConfidenceObject(),

        final: {},

        explanation: {},

        errors:
          [],

        warnings:
          [],

        metadata:
          {}

      };

    }

    ensureEvaluationPipelineObjects(
      evaluation,
      crop,
      options
    );

    const normalizedError =
      normalizeEngineError(
        error,
        {
          phase:
            ENGINE_PHASE_IDS
              .INITIALIZATION,

          code:
            error?.code ||
            "CROP_EVALUATION_INITIALIZATION_FAILED",

          fatal:
            true,

          recoverable:
            false,

          cropId:
            identity.cropId
        }
      );

    evaluation.errors.push(
      normalizedError
    );

    evaluation.pipeline.errors.push(
      normalizedError
    );

    evaluation.pipeline.errorCount =
      1;

    evaluation.pipeline.status =
      ENGINE_EVALUATION_STATUSES
        .FAILED;

    evaluation.metadata.evaluationStatus =
      ENGINE_EVALUATION_STATUSES
        .FAILED;

    evaluation.metadata.fatalError =
      true;

    evaluation.metadata.failureCode =
      normalizedError.code;

    evaluation.metadata.failureMessage =
      normalizedError.message;

    evaluation.final = {

      ...evaluation.final,

      baseScore:
        null,

      score:
        null,

      suitabilityScore:
        null,

      rankingScore:
        -Infinity,

      recommendationStatus:
        "insufficient-data",

      recommendationStatusLabel:
        "Evaluation Failed",

      rankingTier:
        "unranked",

      rankingTierLabel:
        "Unranked",

      rank:
        null,

      tieGroup:
        null,

      eligible:
        false,

      flags: [

        ...(
          Array.isArray(
            evaluation.final
              ?.flags
          )
            ? evaluation.final
                .flags
            : []
        ),

        "evaluation-failed"

      ],

      warnings: [

        ...(
          Array.isArray(
            evaluation.final
              ?.warnings
          )
            ? evaluation.final
                .warnings
            : []
        ),

        normalizedError.message

      ]

    };

    return evaluation;

  }



  /*
    ============================================================
    PHASE STATUS HELPERS
    ============================================================
  */


  function getPipelinePhaseMetadata(
    evaluation,
    phaseId
  ) {

    return (
      evaluation.pipeline
        ?.phases
        ?.[
          phaseId
        ] ||
      null
    );

  }



  function startEvaluationPhase(
    evaluation,
    phaseId
  ) {

    const phase =
      getPipelinePhaseMetadata(
        evaluation,
        phaseId
      );

    if (!phase) {
      return null;
    }

    phase.status =
      ENGINE_PHASE_STATUSES
        .RUNNING;

    phase.startedAt =
      getEngineTimestamp();

    phase.completedAt =
      null;

    phase.durationMs =
      null;

    phase.skippedReason =
      null;

    return phase;

  }



  function completeEvaluationPhase(
    evaluation,
    phaseId,
    metadata = {}
  ) {

    const phase =
      getPipelinePhaseMetadata(
        evaluation,
        phaseId
      );

    if (!phase) {
      return;
    }

    phase.completedAt =
      getEngineTimestamp();

    phase.durationMs =
      roundMilliseconds(
        calculateElapsedMilliseconds(
          phase.startedAt,
          phase.completedAt
        )
      );

    phase.status =
      ENGINE_PHASE_STATUSES
        .COMPLETE;

    phase.metadata = {

      ...phase.metadata,

      ...metadata

    };

    if (
      !evaluation.pipeline
        .completedPhases
        .includes(
          phaseId
        )
    ) {

      evaluation.pipeline
        .completedPhases
        .push(
          phaseId
        );

    }

  }



  function skipEvaluationPhase(
    evaluation,
    phaseId,
    reason,
    metadata = {}
  ) {

    const phase =
      getPipelinePhaseMetadata(
        evaluation,
        phaseId
      );

    if (!phase) {
      return;
    }

    phase.status =
      ENGINE_PHASE_STATUSES
        .SKIPPED;

    phase.startedAt =
      phase.startedAt ??
      getEngineTimestamp();

    phase.completedAt =
      getEngineTimestamp();

    phase.durationMs =
      roundMilliseconds(
        calculateElapsedMilliseconds(
          phase.startedAt,
          phase.completedAt
        )
      );

    phase.skippedReason =
      normalizeExplanationText(
        reason
      ) ||
      "Phase skipped.";

    phase.metadata = {

      ...phase.metadata,

      ...metadata

    };

    if (
      !evaluation.pipeline
        .skippedPhases
        .includes(
          phaseId
        )
    ) {

      evaluation.pipeline
        .skippedPhases
        .push(
          phaseId
        );

    }

  }



  function failEvaluationPhase(
    evaluation,
    phaseId,
    error,
    options = {}
  ) {

    const phase =
      getPipelinePhaseMetadata(
        evaluation,
        phaseId
      );

    const normalizedError =
      normalizeEngineError(
        error,
        {
          phase:
            phaseId,

          code:
            options.code ||
            error?.code ||
            "ENGINE_PHASE_FAILED",

          fatal:
            options.fatal ===
              true,

          recoverable:
            options.recoverable !==
              false,

          cropId:
            evaluation.cropId ||
            evaluation.pipeline
              ?.cropId ||
            null,

          metadata:
            options.metadata
        }
      );

    if (phase) {

      phase.completedAt =
        getEngineTimestamp();

      phase.durationMs =
        roundMilliseconds(
          calculateElapsedMilliseconds(
            phase.startedAt,
            phase.completedAt
          )
        );

      phase.status =
        ENGINE_PHASE_STATUSES
          .FAILED;

      phase.errorCount +=
        1;

      phase.errors.push(
        normalizedError
      );

    }

    evaluation.errors.push(
      normalizedError
    );

    evaluation.pipeline.errors.push(
      normalizedError
    );

    evaluation.pipeline.errorCount +=
      1;

    if (
      !evaluation.pipeline
        .failedPhases
        .includes(
          phaseId
        )
    ) {

      evaluation.pipeline
        .failedPhases
        .push(
          phaseId
        );

    }

    return normalizedError;

  }



  /*
    ============================================================
    PHASE WARNING HELPERS
    ============================================================
  */


  function normalizePhaseWarning(
    warning,
    phaseId
  ) {

    if (
      typeof warning ===
        "string"
    ) {

      return {

        phase:
          phaseId,

        code:
          "ENGINE_PHASE_WARNING",

        message:
          warning,

        severity:
          "notice",

        timestamp:
          new Date()
            .toISOString(),

        metadata:
          {}

      };

    }

    if (
      warning &&
      typeof warning ===
        "object"
    ) {

      return {

        phase:
          warning.phase ||
          phaseId,

        code:
          warning.code ||
          warning.id ||
          "ENGINE_PHASE_WARNING",

        message:
          warning.message ||
          warning.text ||
          warning.reason ||
          warning.label ||
          "Engine phase warning.",

        severity:
          warning.severity ||
          "notice",

        timestamp:
          warning.timestamp ||
          new Date()
            .toISOString(),

        metadata:
          warning.metadata &&
          typeof warning.metadata ===
            "object"
            ? {
                ...warning.metadata
              }
            : {}

      };

    }

    return null;

  }



  function registerPhaseWarnings(
    evaluation,
    phaseId,
    warnings
  ) {

    if (
      !Array.isArray(
        warnings
      ) ||
      warnings.length ===
        0
    ) {
      return 0;
    }

    const phase =
      getPipelinePhaseMetadata(
        evaluation,
        phaseId
      );

    let addedCount = 0;

    warnings.forEach(
      warning => {

        const normalizedWarning =
          normalizePhaseWarning(
            warning,
            phaseId
          );

        if (!normalizedWarning) {
          return;
        }

        evaluation.warnings.push(
          normalizedWarning
        );

        evaluation.pipeline
          .warningCount +=
          1;

        if (phase) {

          phase.warningCount +=
            1;

        }

        addedCount +=
          1;

      }
    );

    return addedCount;

  }



  function getPhaseOutputWarnings(
    phaseId,
    evaluation
  ) {

    const outputMap = {

      eligibility:
        evaluation.eligibility
          ?.warnings,

      compatibility:
        evaluation.compatibility
          ?.warnings,

      goals:
        evaluation.goals
          ?.warnings,

      usePaths:
        evaluation.usePaths
          ?.warnings,

      risks:
        evaluation.risks
          ?.warnings,

      confidence:
        evaluation.confidence
          ?.warnings,

      final:
        evaluation.final
          ?.warnings,

      explanation:
        evaluation.explanation
          ?.warnings

    };

    const warnings =
      outputMap[
        phaseId
      ];

    return Array.isArray(
      warnings
    )
      ? warnings
      : [];

  }



  /*
    ============================================================
    GENERIC PHASE RUNNER
    ============================================================
  */


  function runCropEvaluationPhase(
    evaluation,
    phaseId,
    phaseFunction,
    options = {}
  ) {

    if (
      typeof phaseFunction !==
        "function"
    ) {

      const missingFunctionError =
        new TypeError(
          `No function was supplied for engine phase "${phaseId}".`
        );

      failEvaluationPhase(
        evaluation,
        phaseId,
        missingFunctionError,
        {
          code:
            "MISSING_PHASE_FUNCTION",

          fatal:
            options.fatal ===
              true,

          recoverable:
            options.recoverable !==
              false
        }
      );

      if (
        options.throwOnError ===
          true
      ) {

        throw missingFunctionError;

      }

      return {

        successful:
          false,

        result:
          null,

        error:
          missingFunctionError

      };

    }

    startEvaluationPhase(
      evaluation,
      phaseId
    );

    try {

      const result =
        phaseFunction();

      const warnings =
        getPhaseOutputWarnings(
          phaseId,
          evaluation
        );

      registerPhaseWarnings(
        evaluation,
        phaseId,
        warnings
      );

      completeEvaluationPhase(
        evaluation,
        phaseId,
        {
          outputAvailable:
            result !==
              undefined,

          warningCount:
            warnings.length,

          ...(
            options.metadata &&
            typeof options.metadata ===
              "object"
              ? options.metadata
              : {}
          )
        }
      );

      return {

        successful:
          true,

        result,

        error:
          null

      };

    } catch (
      error
    ) {

      const normalizedError =
        failEvaluationPhase(
          evaluation,
          phaseId,
          error,
          {
            code:
              options.errorCode ||
              "ENGINE_PHASE_EXECUTION_FAILED",

            fatal:
              options.fatal ===
                true,

            recoverable:
              options.recoverable !==
                false,

            metadata:
              options.errorMetadata
          }
        );

      if (
        options.throwOnError ===
          true
      ) {

        throw error;

      }

      return {

        successful:
          false,

        result:
          null,

        error:
          normalizedError

      };

    }

  }



  /*
    ============================================================
    ELIGIBILITY STATE HELPERS
    ============================================================
  */


  function getCropEligibilityState(
    evaluation
  ) {

    const eligibility =
      evaluation.eligibility ||
      {};

    const hardFailures =
      Array.isArray(
        eligibility.hardFailures
      )
        ? eligibility.hardFailures
        : [];

    const eligible =

      eligibility.eligible ===
        true ||

      (
        eligibility.eligible !==
          false &&
        hardFailures.length ===
          0
      );

    return {

      eligible,

      hardFailureCount:
        hardFailures.length,

      warningCount:
        Array.isArray(
          eligibility.warnings
        )
          ? eligibility
              .warnings
              .length
          : 0,

      hardFailures,

      warnings:
        Array.isArray(
          eligibility.warnings
        )
          ? eligibility.warnings
          : []

    };

  }



  function shouldEvaluateDiagnosticPhases(
    evaluation,
    options
  ) {

    const eligibilityState =
      getCropEligibilityState(
        evaluation
      );

    return (
      eligibilityState.eligible ||
      options.evaluateRejectedCrops
    );

  }



  function shouldEvaluateUsePathPhase(
    evaluation,
    options
  ) {

    const eligibilityState =
      getCropEligibilityState(
        evaluation
      );

    return (
      eligibilityState.eligible ||
      options.evaluateRejectedUsePaths
    );

  }



  /*
    ============================================================
    PHASE FALLBACK OBJECTS

    These preserve a predictable evaluation shape when a phase
    fails or is intentionally skipped.
    ============================================================
  */


  function ensureCompatibilityFallback(
    evaluation
  ) {

    evaluation.compatibility =
      evaluation.compatibility &&
      typeof evaluation.compatibility ===
        "object"
        ? evaluation.compatibility
        : createEvidenceObject();

    evaluation.compatibility.score =
      Number.isFinite(
        evaluation.compatibility
          .score
      )
        ? evaluation.compatibility
            .score
        : null;

    evaluation.compatibility
      .evidenceCoverage =
        Number.isFinite(
          evaluation.compatibility
            .evidenceCoverage
        )
          ? evaluation.compatibility
              .evidenceCoverage
          : null;

    evaluation.compatibility
      .categoryResults =
        Array.isArray(
          evaluation.compatibility
            .categoryResults
        )
          ? evaluation.compatibility
              .categoryResults
          : [];

    evaluation.compatibility.warnings =
      Array.isArray(
        evaluation.compatibility
          .warnings
      )
        ? evaluation.compatibility
            .warnings
        : [];

  }



  function ensureGoalFallback(
    evaluation
  ) {

    evaluation.goals =
      evaluation.goals &&
      typeof evaluation.goals ===
        "object"
        ? evaluation.goals
        : createEvidenceObject();

    evaluation.goals.score =
      Number.isFinite(
        evaluation.goals
          .score
      )
        ? evaluation.goals.score
        : null;

    evaluation.goals
      .evidenceCoverage =
        Number.isFinite(
          evaluation.goals
            .evidenceCoverage
        )
          ? evaluation.goals
              .evidenceCoverage
          : null;

    evaluation.goals.goalResults =
      Array.isArray(
        evaluation.goals
          .goalResults
      )
        ? evaluation.goals
            .goalResults
        : [];

    evaluation.goals.warnings =
      Array.isArray(
        evaluation.goals
          .warnings
      )
        ? evaluation.goals
            .warnings
        : [];

  }



  function ensureUsePathFallback(
    evaluation
  ) {

    evaluation.usePaths =
      evaluation.usePaths &&
      typeof evaluation.usePaths ===
        "object"
        ? evaluation.usePaths
        : {};

    evaluation.usePaths = {

      score:
        Number.isFinite(
          evaluation.usePaths
            .score
        )
          ? evaluation.usePaths
              .score
          : null,

      evidenceCoverage:
        Number.isFinite(
          evaluation.usePaths
            .evidenceCoverage
        )
          ? evaluation.usePaths
              .evidenceCoverage
          : null,

      bestPath:
        evaluation.usePaths
          .bestPath ||
        null,

      alternativePaths:
        Array.isArray(
          evaluation.usePaths
            .alternativePaths
        )
          ? evaluation.usePaths
              .alternativePaths
          : [],

      eligiblePaths:
        Array.isArray(
          evaluation.usePaths
            .eligiblePaths
        )
          ? evaluation.usePaths
              .eligiblePaths
          : [],

      rejectedPaths:
        Array.isArray(
          evaluation.usePaths
            .rejectedPaths
        )
          ? evaluation.usePaths
              .rejectedPaths
          : [],

      warnings:
        Array.isArray(
          evaluation.usePaths
            .warnings
        )
          ? evaluation.usePaths
              .warnings
          : []

    };

  }



  function ensureRiskFallback(
    evaluation
  ) {

    evaluation.risks =
      evaluation.risks &&
      typeof evaluation.risks ===
        "object"
        ? evaluation.risks
        : {};

    evaluation.risks = {

      ...evaluation.risks,

      score:
        Number.isFinite(
          evaluation.risks
            .score
        )
          ? evaluation.risks
              .score
          : null,

      rawRiskScore:
        Number.isFinite(
          evaluation.risks
            .rawRiskScore
        )
          ? evaluation.risks
              .rawRiskScore
          : null,

      adjustment:
        Number.isFinite(
          evaluation.risks
            .adjustment
        )
          ? evaluation.risks
              .adjustment
          : 0,

      evidenceCoverage:
        Number.isFinite(
          evaluation.risks
            .evidenceCoverage
        )
          ? evaluation.risks
              .evidenceCoverage
          : null,

      categoryResults:
        Array.isArray(
          evaluation.risks
            .categoryResults
        )
          ? evaluation.risks
              .categoryResults
          : [],

      primaryRisks:
        Array.isArray(
          evaluation.risks
            .primaryRisks
        )
          ? evaluation.risks
              .primaryRisks
          : [],

      moderateRisks:
        Array.isArray(
          evaluation.risks
            .moderateRisks
        )
          ? evaluation.risks
              .moderateRisks
          : [],

      managedRisks:
        Array.isArray(
          evaluation.risks
            .managedRisks
        )
          ? evaluation.risks
              .managedRisks
          : [],

      mitigations:
        Array.isArray(
          evaluation.risks
            .mitigations
        )
          ? evaluation.risks
              .mitigations
          : [],

      warnings:
        Array.isArray(
          evaluation.risks
            .warnings
        )
          ? evaluation.risks
              .warnings
          : []

    };

  }



  function ensureConfidenceFallback(
    evaluation
  ) {

    evaluation.confidence =
      evaluation.confidence &&
      typeof evaluation.confidence ===
        "object"
        ? evaluation.confidence
        : createConfidenceObject();

    evaluation.confidence.score =
      Number.isFinite(
        evaluation.confidence
          .score
      )
        ? evaluation.confidence
            .score
        : null;

    evaluation.confidence.level =
      evaluation.confidence.level ||
      "unknown";

    evaluation.confidence.levelLabel =
      evaluation.confidence
        .levelLabel ||
      "Unknown Confidence";

    evaluation.confidence.factorResults =
      Array.isArray(
        evaluation.confidence
          .factorResults
      )
        ? evaluation.confidence
            .factorResults
        : [];

    evaluation.confidence.strengths =
      Array.isArray(
        evaluation.confidence
          .strengths
      )
        ? evaluation.confidence
            .strengths
        : [];

    evaluation.confidence.uncertainties =
      Array.isArray(
        evaluation.confidence
          .uncertainties
      )
        ? evaluation.confidence
            .uncertainties
        : [];

    evaluation.confidence.warnings =
      Array.isArray(
        evaluation.confidence
          .warnings
      )
        ? evaluation.confidence
            .warnings
        : [];

  }



  function ensureFinalFallback(
    evaluation
  ) {

    evaluation.final =
      evaluation.final &&
      typeof evaluation.final ===
        "object"
        ? evaluation.final
        : {};

    const eligibilityState =
      getCropEligibilityState(
        evaluation
      );

    const hasBestPath =
      Boolean(
        evaluation.usePaths
          ?.bestPath
      );

    let fallbackStatus =
      "insufficient-data";

    if (
      !eligibilityState.eligible
    ) {

      fallbackStatus =
        "rejected";

    } else if (
      !hasBestPath
    ) {

      fallbackStatus =
        "no-practical-use-path";

    }

    evaluation.final = {

      baseScore:
        Number.isFinite(
          evaluation.final
            .baseScore
        )
          ? evaluation.final
              .baseScore
          : null,

      score:
        Number.isFinite(
          evaluation.final
            .score
        )
          ? evaluation.final.score
          : null,

      suitabilityScore:
        Number.isFinite(
          evaluation.final
            .suitabilityScore
        )
          ? evaluation.final
              .suitabilityScore
          : null,

      rankingScore:
        Number.isFinite(
          evaluation.final
            .rankingScore
        )
          ? evaluation.final
              .rankingScore
          : (
              eligibilityState
                .eligible
                ? null
                : -Infinity
            ),

      riskAdjustment:
        Number.isFinite(
          evaluation.final
            .riskAdjustment
        )
          ? evaluation.final
              .riskAdjustment
          : (
              evaluation.risks
                ?.adjustment ??
              0
            ),

      eligibilityAdjustment:
        Number.isFinite(
          evaluation.final
            .eligibilityAdjustment
        )
          ? evaluation.final
              .eligibilityAdjustment
          : 0,

      confidenceAdjustment:
        Number.isFinite(
          evaluation.final
            .confidenceAdjustment
        )
          ? evaluation.final
              .confidenceAdjustment
          : 0,

      scoreComponents:
        evaluation.final
          .scoreComponents &&
        typeof evaluation.final
          .scoreComponents ===
            "object"
          ? evaluation.final
              .scoreComponents
          : {},

      scoreBand:
        evaluation.final
          .scoreBand ||
        "unknown",

      scoreBandLabel:
        evaluation.final
          .scoreBandLabel ||
        "Unknown Fit",

      recommendationStatus:
        evaluation.final
          .recommendationStatus ||
        fallbackStatus,

      recommendationStatusLabel:
        evaluation.final
          .recommendationStatusLabel ||
        (
          fallbackStatus ===
            "rejected"
            ? "Rejected"
            : fallbackStatus ===
                "no-practical-use-path"
              ? "No Practical Use Path"
              : "Insufficient Data"
        ),

      rankingTier:
        evaluation.final
          .rankingTier ||
        "unranked",

      rankingTierLabel:
        evaluation.final
          .rankingTierLabel ||
        "Unranked",

      rank:
        Number.isFinite(
          evaluation.final
            .rank
        )
          ? evaluation.final.rank
          : null,

      tieGroup:
        evaluation.final
          .tieGroup ??
        null,

      confidenceScore:
        Number.isFinite(
          evaluation.final
            .confidenceScore
        )
          ? evaluation.final
              .confidenceScore
          : (
              evaluation.confidence
                ?.score ??
              null
            ),

      confidenceLevel:
        evaluation.final
          .confidenceLevel ||
        evaluation.confidence
          ?.level ||
        "unknown",

      riskScore:
        Number.isFinite(
          evaluation.final
            .riskScore
        )
          ? evaluation.final
              .riskScore
          : (
              evaluation.risks
                ?.score ??
              null
            ),

      bestUsePathId:
        evaluation.final
          .bestUsePathId ||
        evaluation.usePaths
          ?.bestPath
          ?.id ||
        null,

      bestUsePathLabel:
        evaluation.final
          .bestUsePathLabel ||
        evaluation.usePaths
          ?.bestPath
          ?.label ||
        null,

      eligible:
        evaluation.final
          .eligible !==
            undefined
          ? evaluation.final
              .eligible ===
                true
          : eligibilityState
              .eligible,

      stability:
        evaluation.final
          .stability &&
        typeof evaluation.final
          .stability ===
            "object"
          ? evaluation.final
              .stability
          : {},

      flags:
        Array.isArray(
          evaluation.final
            .flags
        )
          ? evaluation.final
              .flags
          : [],

      warnings:
        Array.isArray(
          evaluation.final
            .warnings
        )
          ? evaluation.final
              .warnings
          : []

    };

  }



  /*
    ============================================================
    PHASE OUTPUT SUMMARIES
    ============================================================
  */


  function createEligibilityPhaseSummary(
    evaluation
  ) {

    const state =
      getCropEligibilityState(
        evaluation
      );

    return {

      eligible:
        state.eligible,

      hardFailureCount:
        state.hardFailureCount,

      warningCount:
        state.warningCount

    };

  }



  function createCompatibilityPhaseSummary(
    evaluation
  ) {

    return {

      score:
        evaluation.compatibility
          ?.score ??
        null,

      evidenceCoverage:
        evaluation.compatibility
          ?.evidenceCoverage ??
        null,

      categoryCount:
        Array.isArray(
          evaluation.compatibility
            ?.categoryResults
        )
          ? evaluation.compatibility
              .categoryResults
              .length
          : 0

    };

  }



  function createGoalPhaseSummary(
    evaluation
  ) {

    return {

      score:
        evaluation.goals
          ?.score ??
        null,

      evidenceCoverage:
        evaluation.goals
          ?.evidenceCoverage ??
        null,

      evaluatedGoalCount:
        Array.isArray(
          evaluation.goals
            ?.goalResults
        )
          ? evaluation.goals
              .goalResults
              .length
          : 0

    };

  }



  function createUsePathPhaseSummary(
    evaluation
  ) {

    return {

      score:
        evaluation.usePaths
          ?.score ??
        null,

      evidenceCoverage:
        evaluation.usePaths
          ?.evidenceCoverage ??
        null,

      bestPathId:
        evaluation.usePaths
          ?.bestPath
          ?.id ??
        null,

      eligiblePathCount:
        Array.isArray(
          evaluation.usePaths
            ?.eligiblePaths
        )
          ? evaluation.usePaths
              .eligiblePaths
              .length
          : 0,

      rejectedPathCount:
        Array.isArray(
          evaluation.usePaths
            ?.rejectedPaths
        )
          ? evaluation.usePaths
              .rejectedPaths
              .length
          : 0

    };

  }



  function createRiskPhaseSummary(
    evaluation
  ) {

    return {

      safetyScore:
        evaluation.risks
          ?.score ??
        null,

      rawSafetyScore:
        evaluation.risks
          ?.rawRiskScore ??
        null,

      adjustment:
        evaluation.risks
          ?.adjustment ??
        0,

      evidenceCoverage:
        evaluation.risks
          ?.evidenceCoverage ??
        null,

      primaryRiskCount:
        Array.isArray(
          evaluation.risks
            ?.primaryRisks
        )
          ? evaluation.risks
              .primaryRisks
              .length
          : 0

    };

  }



  function createConfidencePhaseSummary(
    evaluation
  ) {

    return {

      score:
        evaluation.confidence
          ?.score ??
        null,

      level:
        evaluation.confidence
          ?.level ??
        "unknown",

      evidenceCoverage:
        evaluation.confidence
          ?.evidenceCoverage ??
        null,

      uncertaintyCount:
        Array.isArray(
          evaluation.confidence
            ?.uncertainties
        )
          ? evaluation.confidence
              .uncertainties
              .length
          : 0

    };

  }



  function createFinalPhaseSummary(
    evaluation
  ) {

    return {

      baseScore:
        evaluation.final
          ?.baseScore ??
        null,

      suitabilityScore:
        evaluation.final
          ?.score ??
        null,

      rankingScore:
        evaluation.final
          ?.rankingScore ??
        null,

      recommendationStatus:
        evaluation.final
          ?.recommendationStatus ??
        "unscored",

      eligible:
        evaluation.final
          ?.eligible ===
            true,

      bestUsePathId:
        evaluation.final
          ?.bestUsePathId ??
        null

    };

  }



  function createExplanationPhaseSummary(
    evaluation
  ) {

    const explanation =
      evaluation.explanation ||
      {};

    return {

      generated:
        Boolean(
          explanation.metadata
            ?.generated ||
          explanation.metadata
            ?.allExplanationPartsComplete
        ),

      recommendationReasonCount:
        Array.isArray(
          explanation
            .whyRecommended
        )
          ? explanation
              .whyRecommended
              .length
          : 0,

      considerationCount:
        Array.isArray(
          explanation
            .considerations
        )
          ? explanation
              .considerations
              .length
          : 0,

      rejectionReasonCount:
        Array.isArray(
          explanation
            .rejectedReasons
        )
          ? explanation
              .rejectedReasons
              .length
          : 0,

      warningCount:
        Array.isArray(
          explanation
            .warnings
        )
          ? explanation
              .warnings
              .length
          : 0

    };

  }



  /*
    ============================================================
    PIPELINE FINALIZATION
    ============================================================
  */


  function calculatePipelineWarningCount(
    evaluation
  ) {

    return Array.isArray(
      evaluation.warnings
    )
      ? evaluation.warnings.length
      : 0;

  }



  function calculatePipelineErrorCount(
    evaluation
  ) {

    return Array.isArray(
      evaluation.errors
    )
      ? evaluation.errors.length
      : 0;

  }



  function determinePipelineCompletionStatus(
    evaluation
  ) {

    const errorCount =
      calculatePipelineErrorCount(
        evaluation
      );

    const warningCount =
      calculatePipelineWarningCount(
        evaluation
      );

    const fatalError =
      evaluation.errors
        ?.some(
          error =>
            error.fatal ===
              true
        ) ===
      true;

    if (
      fatalError
    ) {

      return ENGINE_EVALUATION_STATUSES
        .FAILED;

    }

    if (
      errorCount > 0 ||
      warningCount > 0
    ) {

      return ENGINE_EVALUATION_STATUSES
        .COMPLETE_WITH_WARNINGS;

    }

    return ENGINE_EVALUATION_STATUSES
      .COMPLETE;

  }



  function finalizeCropEvaluationPipeline(
    evaluation,
    pipelineStartTime,
    options
  ) {

    const pipelineEndTime =
      getEngineTimestamp();

    const status =
      determinePipelineCompletionStatus(
        evaluation
      );

    evaluation.pipeline.completedAt =
      pipelineEndTime;

    evaluation.pipeline.durationMs =
      options.includeTiming
        ? roundMilliseconds(
            calculateElapsedMilliseconds(
              pipelineStartTime,
              pipelineEndTime
            )
          )
        : null;

    evaluation.pipeline.status =
      status;

    evaluation.pipeline.warningCount =
      calculatePipelineWarningCount(
        evaluation
      );

    evaluation.pipeline.errorCount =
      calculatePipelineErrorCount(
        evaluation
      );

    evaluation.metadata = {

      ...evaluation.metadata,

      evaluationStatus:
        status,

      evaluationComplete:
        status !==
          ENGINE_EVALUATION_STATUSES
            .FAILED,

      evaluationFailed:
        status ===
          ENGINE_EVALUATION_STATUSES
            .FAILED,

      completedPhaseCount:
        evaluation.pipeline
          .completedPhases
          .length,

      skippedPhaseCount:
        evaluation.pipeline
          .skippedPhases
          .length,

      failedPhaseCount:
        evaluation.pipeline
          .failedPhases
          .length,

      warningCount:
        evaluation.pipeline
          .warningCount,

      errorCount:
        evaluation.pipeline
          .errorCount,

      durationMs:
        evaluation.pipeline
          .durationMs,

      initialSuitabilityScore:
        evaluation.final
          ?.score ??
        null,

      initialRankingScore:
        evaluation.final
          ?.rankingScore ??
        null,

      collectionRankAssigned:
        Number.isFinite(
          evaluation.final
            ?.rank
        ),

      explanationBuiltBeforeRanking:
        Boolean(
          evaluation.explanation
            ?.metadata
            ?.allExplanationPartsComplete
        ),

      pipelineCompletedAt:
        new Date()
          .toISOString()

    };

    return evaluation;

  }



  /*
    ============================================================
    SINGLE-CROP PIPELINE

    This is the internal implementation used by evaluateCrop().
    ============================================================
  */


  function runSingleCropEvaluationPipeline(
    crop,
    answers,
    options
  ) {

    const pipelineStartTime =
      getEngineTimestamp();

    let evaluation =
      createCropEvaluation(
        crop,
        answers
      );

    ensureEvaluationPipelineObjects(
      evaluation,
      crop,
      options
    );

    evaluation.pipeline.status =
      ENGINE_EVALUATION_STATUSES
        .RUNNING;

    evaluation.pipeline.startedAt =
      pipelineStartTime;

    evaluation.metadata.evaluationStatus =
      ENGINE_EVALUATION_STATUSES
        .RUNNING;


    /*
      ----------------------------------------------------------
      PHASE 1
      INITIALIZATION
      ----------------------------------------------------------
    */

    startEvaluationPhase(
      evaluation,
      ENGINE_PHASE_IDS
        .INITIALIZATION
    );

    const identity =
      resolveCropEvaluationIdentity(
        crop
      );

    evaluation.cropId =
      evaluation.cropId ||
      identity.cropId;

    evaluation.cropName =
      evaluation.cropName ||
      identity.cropName;

    evaluation.metadata = {

      ...evaluation.metadata,

      cropId:
        evaluation.cropId,

      cropName:
        evaluation.cropName,

      scientificName:
        identity.scientificName,

      developmentStatus:
        identity.developmentStatus

    };

    completeEvaluationPhase(
      evaluation,
      ENGINE_PHASE_IDS
        .INITIALIZATION,
      {
        cropId:
          evaluation.cropId,

        cropName:
          evaluation.cropName,

        developmentStatus:
          identity.developmentStatus
      }
    );


    /*
      ----------------------------------------------------------
      PHASE 2
      ELIGIBILITY
      ----------------------------------------------------------
    */

    const eligibilityResult =
      runCropEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .ELIGIBILITY,
        () =>
          evaluateEligibility(
            crop,
            answers,
            evaluation
          ),
        {
          throwOnError:
            !options
              .isolatePhaseErrors,

          fatal:
            false,

          recoverable:
            true,

          errorCode:
            "ELIGIBILITY_EVALUATION_FAILED"
        }
      );

    if (
      !eligibilityResult
        .successful
    ) {

      evaluation.eligibility =
        evaluation.eligibility &&
        typeof evaluation
          .eligibility ===
            "object"
          ? evaluation.eligibility
          : createEligibilityObject();

      evaluation.eligibility
        .eligible =
          false;

      evaluation.eligibility
        .hardFailures =
          Array.isArray(
            evaluation.eligibility
              .hardFailures
          )
            ? evaluation.eligibility
                .hardFailures
            : [];

      evaluation.eligibility
        .hardFailures
        .push({

          id:
            "eligibility-phase-failed",

          label:
            "Eligibility Evaluation Failed",

          message:
            "The crop could not be verified as eligible because the eligibility phase encountered an error.",

          severity:
            "critical"

        });

    }

    const eligibilityState =
      getCropEligibilityState(
        evaluation
      );

    const eligibilityPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .ELIGIBILITY
      );

    if (eligibilityPhase) {

      eligibilityPhase.metadata = {

        ...eligibilityPhase
          .metadata,

        ...createEligibilityPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASES 3–6
      DIAGNOSTIC SCORING

      These phases normally run for all valid crop records.

      When evaluateRejectedCrops is false, a crop with hard
      eligibility failures skips compatibility, goals, and risk.
      ----------------------------------------------------------
    */

    const evaluateDiagnostics =
      shouldEvaluateDiagnosticPhases(
        evaluation,
        options
      );


    /*
      ----------------------------------------------------------
      PHASE 3
      COMPATIBILITY
      ----------------------------------------------------------
    */

    if (
      evaluateDiagnostics
    ) {

      const compatibilityResult =
        runCropEvaluationPhase(
          evaluation,
          ENGINE_PHASE_IDS
            .COMPATIBILITY,
          () =>
            evaluateCompatibility(
              crop,
              answers,
              evaluation
            ),
          {
            throwOnError:
              !options
                .isolatePhaseErrors,

            fatal:
              false,

            recoverable:
              true,

            errorCode:
              "COMPATIBILITY_EVALUATION_FAILED"
          }
        );

      if (
        !compatibilityResult
          .successful
      ) {

        ensureCompatibilityFallback(
          evaluation
        );

      }

    } else {

      ensureCompatibilityFallback(
        evaluation
      );

      skipEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .COMPATIBILITY,
        "Compatibility diagnostics were disabled for rejected crops.",
        {
          rejectedCrop:
            true
        }
      );

    }

    const compatibilityPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .COMPATIBILITY
      );

    if (
      compatibilityPhase
    ) {

      compatibilityPhase.metadata = {

        ...compatibilityPhase
          .metadata,

        ...createCompatibilityPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 4
      GOAL ALIGNMENT
      ----------------------------------------------------------
    */

    if (
      evaluateDiagnostics
    ) {

      const goalResult =
        runCropEvaluationPhase(
          evaluation,
          ENGINE_PHASE_IDS
            .GOALS,
          () =>
            evaluateGoalAlignment(
              crop,
              answers,
              evaluation
            ),
          {
            throwOnError:
              !options
                .isolatePhaseErrors,

            fatal:
              false,

            recoverable:
              true,

            errorCode:
              "GOAL_ALIGNMENT_EVALUATION_FAILED"
          }
        );

      if (
        !goalResult
          .successful
      ) {

        ensureGoalFallback(
          evaluation
        );

      }

    } else {

      ensureGoalFallback(
        evaluation
      );

      skipEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .GOALS,
        "Goal diagnostics were disabled for rejected crops.",
        {
          rejectedCrop:
            true
        }
      );

    }

    const goalPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .GOALS
      );

    if (
      goalPhase
    ) {

      goalPhase.metadata = {

        ...goalPhase
          .metadata,

        ...createGoalPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 5
      USE-PATH EVALUATION
      ----------------------------------------------------------
    */

    const evaluateUsePaths =
      shouldEvaluateUsePathPhase(
        evaluation,
        options
      );

    if (
      evaluateUsePaths
    ) {

      const usePathResult =
        runCropEvaluationPhase(
          evaluation,
          ENGINE_PHASE_IDS
            .USE_PATHS,
          () =>
            evaluateUsePaths(
              crop,
              answers,
              evaluation
            ),
          {
            throwOnError:
              !options
                .isolatePhaseErrors,

            fatal:
              false,

            recoverable:
              true,

            errorCode:
              "USE_PATH_EVALUATION_FAILED"
          }
        );

      if (
        !usePathResult
          .successful
      ) {

        ensureUsePathFallback(
          evaluation
        );

      }

    } else {

      ensureUsePathFallback(
        evaluation
      );

      skipEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .USE_PATHS,
        "Use-path diagnostics were disabled for rejected crops.",
        {
          rejectedCrop:
            true
        }
      );

    }

    const usePathPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .USE_PATHS
      );

    if (
      usePathPhase
    ) {

      usePathPhase.metadata = {

        ...usePathPhase
          .metadata,

        ...createUsePathPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 6
      RISK EVALUATION
      ----------------------------------------------------------
    */

    if (
      evaluateDiagnostics
    ) {

      const riskResult =
        runCropEvaluationPhase(
          evaluation,
          ENGINE_PHASE_IDS
            .RISKS,
          () =>
            evaluateRisks(
              crop,
              answers,
              evaluation
            ),
          {
            throwOnError:
              !options
                .isolatePhaseErrors,

            fatal:
              false,

            recoverable:
              true,

            errorCode:
              "RISK_EVALUATION_FAILED"
          }
        );

      if (
        !riskResult
          .successful
      ) {

        ensureRiskFallback(
          evaluation
        );

      }

    } else {

      ensureRiskFallback(
        evaluation
      );

      skipEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .RISKS,
        "Risk diagnostics were disabled for rejected crops.",
        {
          rejectedCrop:
            true
        }
      );

    }

    const riskPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .RISKS
      );

    if (
      riskPhase
    ) {

      riskPhase.metadata = {

        ...riskPhase
          .metadata,

        ...createRiskPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 7
      CONFIDENCE

      Confidence runs even when another diagnostic phase failed.
      Missing phase evidence should lower confidence rather than
      prevent a confidence result.
      ----------------------------------------------------------
    */

    const confidenceResult =
      runCropEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .CONFIDENCE,
        () =>
          evaluateConfidence(
            crop,
            answers,
            evaluation
          ),
        {
          throwOnError:
            !options
              .isolatePhaseErrors,

          fatal:
            false,

          recoverable:
            true,

          errorCode:
            "CONFIDENCE_EVALUATION_FAILED"
        }
      );

    if (
      !confidenceResult
        .successful
    ) {

      ensureConfidenceFallback(
        evaluation
      );

    }

    const confidencePhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .CONFIDENCE
      );

    if (
      confidencePhase
    ) {

      confidencePhase.metadata = {

        ...confidencePhase
          .metadata,

        ...createConfidencePhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 8
      FINAL SUITABILITY SCORE

      This phase creates the pre-ranking final score.

      Part 13B will assign collection rank, tie groups, and
      cross-crop stability.
      ----------------------------------------------------------
    */

    const finalResult =
      runCropEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .FINAL,
        () =>
          evaluateFinalScore(
            crop,
            answers,
            evaluation
          ),
        {
          throwOnError:
            !options
              .isolatePhaseErrors,

          fatal:
            false,

          recoverable:
            true,

          errorCode:
            "FINAL_SCORE_EVALUATION_FAILED"
        }
      );

    if (
      !finalResult
        .successful
    ) {

      ensureFinalFallback(
        evaluation
      );

    }

    const finalPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .FINAL
      );

    if (
      finalPhase
    ) {

      finalPhase.metadata = {

        ...finalPhase
          .metadata,

        ...createFinalPhaseSummary(
          evaluation
        )

      };

    }


    /*
      ----------------------------------------------------------
      PHASE 9
      INITIAL EXPLANATION

      This explanation does not yet know the crop's final rank.
      Part 13B will rebuild it after rankCropEvaluations().
      ----------------------------------------------------------
    */

    if (
      options.generateExplanation
    ) {

      const explanationResult =
        runCropEvaluationPhase(
          evaluation,
          ENGINE_PHASE_IDS
            .EXPLANATION,
          () =>
            evaluateRecommendationExplanation(
              crop,
              answers,
              evaluation
            ),
          {
            throwOnError:
              !options
                .isolatePhaseErrors,

            fatal:
              false,

            recoverable:
              true,

            errorCode:
              "RECOMMENDATION_EXPLANATION_FAILED"
          }
        );

      if (
        explanationResult
          .successful
      ) {

        evaluation.metadata
          .explanationBuiltBeforeRanking =
            true;

      } else {

        ensureExplanationEvaluationObject(
          evaluation
        );

      }

    } else {

      ensureExplanationEvaluationObject(
        evaluation
      );

      skipEvaluationPhase(
        evaluation,
        ENGINE_PHASE_IDS
          .EXPLANATION,
        "Initial explanation generation was disabled.",
        {
          generateExplanation:
            false
        }
      );

    }

    const explanationPhase =
      getPipelinePhaseMetadata(
        evaluation,
        ENGINE_PHASE_IDS
          .EXPLANATION
      );

    if (
      explanationPhase
    ) {

      explanationPhase.metadata = {

        ...explanationPhase
          .metadata,

        ...createExplanationPhaseSummary(
          evaluation
        )

      };

    }


    return finalizeCropEvaluationPipeline(
      evaluation,
      pipelineStartTime,
      options
    );

  }



  /*
    ============================================================
    PUBLIC SINGLE-CROP EVALUATOR

    This is the main public single-crop API.

    It validates input, runs the complete pipeline, and returns
    a stable evaluation object.

    Collection rank remains null until Part 13B runs.
    ============================================================
  */


  function evaluateCrop(
    crop,
    answers,
    options = {}
  ) {

    const normalizedOptions =
      normalizeCropEvaluationOptions(
        options
      );

    const validation =
      validateCropEvaluationInput(
        crop,
        answers
      );

    if (
      !validation.valid
    ) {

      const primaryError =
        validation.errors[0];

      if (
        !normalizedOptions
          .suppressFatalErrors
      ) {

        throw primaryError;

      }

      return createFailedCropEvaluation(
        crop,
        answers,
        primaryError,
        normalizedOptions
      );

    }

    try {

      return runSingleCropEvaluationPipeline(
        crop,
        answers,
        normalizedOptions
      );

    } catch (
      error
    ) {

      if (
        !normalizedOptions
          .suppressFatalErrors
      ) {

        throw error;

      }

      return createFailedCropEvaluation(
        crop,
        answers,
        error,
        normalizedOptions
      );

    }

  }



  /*
    ============================================================
    SINGLE-CROP SAFE EVALUATOR

    This helper always returns an evaluation and never allows a
    crop-level error to escape.

    Part 13B will use it so one damaged crop record cannot stop
    the full collection evaluation.
    ============================================================
  */


  function evaluateCropSafely(
    crop,
    answers,
    options = {}
  ) {

    return evaluateCrop(
      crop,
      answers,
      {
        ...options,

        isolatePhaseErrors:
          true,

        suppressFatalErrors:
          true
      }
    );

  }



  /*
    ============================================================
    SINGLE-CROP STRICT EVALUATOR

    Intended for HQ testing.

    Any unexpected phase failure is thrown immediately.
    ============================================================
  */


  function evaluateCropStrictly(
    crop,
    answers,
    options = {}
  ) {

    return evaluateCrop(
      crop,
      answers,
      {
        ...options,

        isolatePhaseErrors:
          false,

        suppressFatalErrors:
          false
      }
    );

  }



  /*
    ============================================================
    SINGLE-CROP EVALUATION STATUS HELPERS
    ============================================================
  */


  function isCropEvaluationComplete(
    evaluation
  ) {

    return Boolean(

      evaluation &&

      typeof evaluation ===
        "object" &&

      (
        evaluation.pipeline
          ?.status ===
            ENGINE_EVALUATION_STATUSES
              .COMPLETE ||

        evaluation.pipeline
          ?.status ===
            ENGINE_EVALUATION_STATUSES
              .COMPLETE_WITH_WARNINGS
      )

    );

  }



  function isCropEvaluationFailed(
    evaluation
  ) {

    return Boolean(

      evaluation &&

      typeof evaluation ===
        "object" &&

      evaluation.pipeline
        ?.status ===
          ENGINE_EVALUATION_STATUSES
            .FAILED

    );

  }



  function hasCropEvaluationWarnings(
    evaluation
  ) {

    return Boolean(

      evaluation &&

      typeof evaluation ===
        "object" &&

      (
        evaluation.pipeline
          ?.warningCount >
            0 ||

        evaluation.pipeline
          ?.errorCount >
            0
      )

    );

  }



  function getCropEvaluationStatus(
    evaluation
  ) {

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {

      return ENGINE_EVALUATION_STATUSES
        .FAILED;

    }

    return (
      evaluation.pipeline
        ?.status ||
      evaluation.metadata
        ?.evaluationStatus ||
      ENGINE_EVALUATION_STATUSES
        .PENDING
    );

  }



  /*
    ============================================================
    SINGLE-CROP PIPELINE SUMMARY

    This provides a compact diagnostic snapshot without exposing
    every internal object.
    ============================================================
  */


  function createSingleCropPipelineSummary(
    evaluation
  ) {

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {
      return null;
    }

    return {

      cropId:
        evaluation.cropId ||
        evaluation.pipeline
          ?.cropId ||
        null,

      cropName:
        evaluation.cropName ||
        evaluation.pipeline
          ?.cropName ||
        null,

      status:
        getCropEvaluationStatus(
          evaluation
        ),

      eligible:
        getCropEligibilityState(
          evaluation
        ).eligible,

      compatibilityScore:
        evaluation.compatibility
          ?.score ??
        null,

      goalScore:
        evaluation.goals
          ?.score ??
        null,

      usePathScore:
        evaluation.usePaths
          ?.score ??
        null,

      riskSafetyScore:
        evaluation.risks
          ?.score ??
        null,

      confidenceScore:
        evaluation.confidence
          ?.score ??
        null,

      suitabilityScore:
        evaluation.final
          ?.score ??
        null,

      rankingScore:
        evaluation.final
          ?.rankingScore ??
        null,

      recommendationStatus:
        evaluation.final
          ?.recommendationStatus ??
        "unscored",

      bestUsePathId:
        evaluation.usePaths
          ?.bestPath
          ?.id ??
        null,

      rank:
        evaluation.final
          ?.rank ??
        null,

      warningCount:
        evaluation.pipeline
          ?.warningCount ??
        0,

      errorCount:
        evaluation.pipeline
          ?.errorCount ??
        0,

      completedPhases:
        Array.isArray(
          evaluation.pipeline
            ?.completedPhases
        )
          ? [
              ...evaluation.pipeline
                .completedPhases
            ]
          : [],

      skippedPhases:
        Array.isArray(
          evaluation.pipeline
            ?.skippedPhases
        )
          ? [
              ...evaluation.pipeline
                .skippedPhases
            ]
          : [],

      failedPhases:
        Array.isArray(
          evaluation.pipeline
            ?.failedPhases
        )
          ? [
              ...evaluation.pipeline
                .failedPhases
            ]
          : [],

      durationMs:
        evaluation.pipeline
          ?.durationMs ??
        null

    };

  }

    /*
    ============================================================
    PART 13
    FINAL ENGINE INTEGRATION

    PART 13B
    FULL COLLECTION EVALUATION AND RANKING PIPELINE

    This section evaluates an entire crop collection, isolates
    crop-level errors, ranks all completed evaluations, and
    rebuilds recommendation explanations after final ranks have
    been assigned.

    Main public function introduced here:

      evaluateAllCrops(
        crops,
        answers,
        options
      )
    ============================================================
  */


  /*
    ============================================================
    COLLECTION PIPELINE CONSTANTS
    ============================================================
  */


  const COLLECTION_PIPELINE_VERSION =
    "2.0.0";


  const COLLECTION_EVALUATION_STATUSES =
    Object.freeze({

      PENDING:
        "pending",

      RUNNING:
        "running",

      COMPLETE:
        "complete",

      COMPLETE_WITH_WARNINGS:
        "complete-with-warnings",

      FAILED:
        "failed"

    });


  const COLLECTION_INPUT_TYPES =
    Object.freeze({

      ARRAY:
        "array",

      OBJECT:
        "object",

      MAP:
        "map",

      UNKNOWN:
        "unknown"

    });



  /*
    ============================================================
    DEFAULT COLLECTION OPTIONS
    ============================================================
  */


  const DEFAULT_COLLECTION_EVALUATION_OPTIONS =
    Object.freeze({

      /*
        Options forwarded to each single-crop evaluation.
      */

      cropOptions:
        Object.freeze({

          evaluateRejectedCrops:
            true,

          evaluateRejectedUsePaths:
            true,

          generateExplanation:
            true,

          isolatePhaseErrors:
            true,

          suppressFatalErrors:
            true,

          includeTiming:
            true,

          includeDiagnostics:
            true

        }),

      /*
        Rank the completed crop evaluations.
      */

      rankEvaluations:
        true,

      /*
        Rebuild recommendation explanations after ranking so each
        explanation can include final rank and tie information.
      */

      rebuildExplanationsAfterRanking:
        true,

      /*
        Preserve failed crop evaluations in the returned result.
      */

      includeFailedEvaluations:
        true,

      /*
        Preserve crops that cannot be normalized into valid crop
        records as failed evaluation objects.
      */

      includeInvalidCropRecords:
        true,

      /*
        When true, duplicate crop IDs are retained and diagnosed.
        When false, only the first record with an ID is evaluated.
      */

      allowDuplicateCropIds:
        false,

      /*
        Collection processing is deterministic and sequential by
        default. This preserves predictable ranking and debugging.
      */

      deterministicOrder:
        true,

      /*
        Include collection-level timing.
      */

      includeTiming:
        true,

      /*
        Include detailed collection diagnostics.
      */

      includeDiagnostics:
        true,

      /*
        Optional caller-supplied collection context.
      */

      context:
        null

    });



  function normalizeCollectionEvaluationOptions(
    options
  ) {

    const suppliedOptions =
      options &&
      typeof options ===
        "object"
        ? options
        : {};

    const suppliedCropOptions =
      suppliedOptions.cropOptions &&
      typeof suppliedOptions.cropOptions ===
        "object"
        ? suppliedOptions.cropOptions
        : {};

    return {

      ...DEFAULT_COLLECTION_EVALUATION_OPTIONS,

      ...suppliedOptions,

      cropOptions:
        normalizeCropEvaluationOptions({

          ...DEFAULT_COLLECTION_EVALUATION_OPTIONS
            .cropOptions,

          ...suppliedCropOptions,

          /*
            Collection processing should never allow one damaged
            crop to stop the remaining collection.
          */

          isolatePhaseErrors:
            true,

          suppressFatalErrors:
            true

        }),

      rankEvaluations:
        suppliedOptions
          .rankEvaluations !==
            undefined
          ? suppliedOptions
              .rankEvaluations ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .rankEvaluations,

      rebuildExplanationsAfterRanking:
        suppliedOptions
          .rebuildExplanationsAfterRanking !==
            undefined
          ? suppliedOptions
              .rebuildExplanationsAfterRanking ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .rebuildExplanationsAfterRanking,

      includeFailedEvaluations:
        suppliedOptions
          .includeFailedEvaluations !==
            undefined
          ? suppliedOptions
              .includeFailedEvaluations ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .includeFailedEvaluations,

      includeInvalidCropRecords:
        suppliedOptions
          .includeInvalidCropRecords !==
            undefined
          ? suppliedOptions
              .includeInvalidCropRecords ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .includeInvalidCropRecords,

      allowDuplicateCropIds:
        suppliedOptions
          .allowDuplicateCropIds !==
            undefined
          ? suppliedOptions
              .allowDuplicateCropIds ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .allowDuplicateCropIds,

      deterministicOrder:
        suppliedOptions
          .deterministicOrder !==
            undefined
          ? suppliedOptions
              .deterministicOrder ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .deterministicOrder,

      includeTiming:
        suppliedOptions
          .includeTiming !==
            undefined
          ? suppliedOptions
              .includeTiming ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .includeTiming,

      includeDiagnostics:
        suppliedOptions
          .includeDiagnostics !==
            undefined
          ? suppliedOptions
              .includeDiagnostics ===
                true
          : DEFAULT_COLLECTION_EVALUATION_OPTIONS
              .includeDiagnostics

    };

  }



  /*
    ============================================================
    COLLECTION INPUT DETECTION
    ============================================================
  */


  function getCropCollectionInputType(
    crops
  ) {

    if (
      Array.isArray(
        crops
      )
    ) {

      return COLLECTION_INPUT_TYPES
        .ARRAY;

    }

    if (
      crops instanceof
        Map
    ) {

      return COLLECTION_INPUT_TYPES
        .MAP;

    }

    if (
      crops &&
      typeof crops ===
        "object"
    ) {

      return COLLECTION_INPUT_TYPES
        .OBJECT;

    }

    return COLLECTION_INPUT_TYPES
      .UNKNOWN;

  }



  function validateCropCollectionInput(
    crops,
    answers
  ) {

    const errors = [];

    const collectionType =
      getCropCollectionInputType(
        crops
      );

    if (
      collectionType ===
        COLLECTION_INPUT_TYPES
          .UNKNOWN
    ) {

      errors.push(
        createEngineInputError(
          "evaluateAllCrops requires an array, object, or Map of crop records.",
          "INVALID_CROP_COLLECTION"
        )
      );

    }

    if (
      !answers ||
      typeof answers !==
        "object" ||
      Array.isArray(
        answers
      )
    ) {

      errors.push(
        createEngineInputError(
          "evaluateAllCrops requires a valid questionnaire answer object.",
          "INVALID_COLLECTION_QUESTIONNAIRE_ANSWERS"
        )
      );

    }

    return {

      valid:
        errors.length ===
          0,

      errors,

      collectionType

    };

  }



  /*
    ============================================================
    CROP COLLECTION NORMALIZATION
    ============================================================
  */


  function createNormalizedCropEntry(
    crop,
    sourceKey,
    sourceIndex,
    sourceType
  ) {

    const identity =
      resolveCropEvaluationIdentity(
        crop
      );

    return {

      crop,

      cropId:
        identity.cropId,

      cropName:
        identity.cropName,

      sourceKey:
        sourceKey ??
        null,

      sourceIndex:
        Number.isFinite(
          sourceIndex
        )
          ? sourceIndex
          : null,

      sourceType,

      validRecord:
        Boolean(
          crop &&
          typeof crop ===
            "object" &&
          !Array.isArray(
            crop
          )
        ),

      duplicate:
        false,

      duplicateOfIndex:
        null,

      normalizationWarnings:
        []

    };

  }



  function normalizeCropCollection(
    crops
  ) {

    const collectionType =
      getCropCollectionInputType(
        crops
      );

    const entries = [];

    if (
      collectionType ===
        COLLECTION_INPUT_TYPES
          .ARRAY
    ) {

      crops.forEach(
        (
          crop,
          index
        ) => {

          entries.push(
            createNormalizedCropEntry(
              crop,
              index,
              index,
              collectionType
            )
          );

        }
      );

    } else if (
      collectionType ===
        COLLECTION_INPUT_TYPES
          .MAP
    ) {

      let index = 0;

      crops.forEach(
        (
          crop,
          key
        ) => {

          entries.push(
            createNormalizedCropEntry(
              crop,
              key,
              index,
              collectionType
            )
          );

          index += 1;

        }
      );

    } else if (
      collectionType ===
        COLLECTION_INPUT_TYPES
          .OBJECT
    ) {

      Object.entries(
        crops
      ).forEach(
        (
          [
            key,
            crop
          ],
          index
        ) => {

          const entry =
            createNormalizedCropEntry(
              crop,
              key,
              index,
              collectionType
            );

          /*
            Use the collection key as a fallback crop ID when the
            record itself does not expose an identity ID.
          */

          if (
            !entry.cropId &&
            typeof key ===
              "string"
          ) {

            entry.cropId =
              key;

            entry.normalizationWarnings.push({

              code:
                "CROP_ID_FROM_COLLECTION_KEY",

              message:
                `Crop record "${key}" did not expose an identity ID, so the collection key was used.`

            });

          }

          entries.push(
            entry
          );

        }
      );

    }

    return {

      collectionType,

      entries,

      inputCount:
        entries.length

    };

  }



  /*
    ============================================================
    DETERMINISTIC CROP ORDERING
    ============================================================
  */


  function compareNormalizedCropEntries(
    first,
    second
  ) {

    const firstIndex =
      Number.isFinite(
        first.sourceIndex
      )
        ? first.sourceIndex
        : Number.MAX_SAFE_INTEGER;

    const secondIndex =
      Number.isFinite(
        second.sourceIndex
      )
        ? second.sourceIndex
        : Number.MAX_SAFE_INTEGER;

    if (
      firstIndex !==
        secondIndex
    ) {

      return firstIndex -
        secondIndex;

    }

    const firstId =
      String(
        first.cropId ||
        ""
      );

    const secondId =
      String(
        second.cropId ||
        ""
      );

    const idComparison =
      firstId.localeCompare(
        secondId,
        undefined,
        {
          numeric:
            true,

          sensitivity:
            "base"
        }
      );

    if (
      idComparison !==
        0
    ) {

      return idComparison;

    }

    return String(
      first.cropName ||
      ""
    ).localeCompare(
      String(
        second.cropName ||
        ""
      ),
      undefined,
      {
        numeric:
          true,

        sensitivity:
          "base"
      }
    );

  }



  function orderNormalizedCropEntries(
    entries,
    deterministicOrder
  ) {

    if (
      !Array.isArray(
        entries
      )
    ) {
      return [];
    }

    if (
      deterministicOrder !==
        true
    ) {

      return [
        ...entries
      ];

    }

    return entries
      .slice()
      .sort(
        compareNormalizedCropEntries
      );

  }



  /*
    ============================================================
    DUPLICATE CROP ID DETECTION
    ============================================================
  */


  function markDuplicateCropEntries(
    entries
  ) {

    const firstIndexById =
      new Map();

    entries.forEach(
      (
        entry,
        index
      ) => {

        if (
          !entry.cropId
        ) {
          return;
        }

        if (
          firstIndexById.has(
            entry.cropId
          )
        ) {

          entry.duplicate =
            true;

          entry.duplicateOfIndex =
            firstIndexById.get(
              entry.cropId
            );

          entry.normalizationWarnings.push({

            code:
              "DUPLICATE_CROP_ID",

            message:
              `Duplicate crop ID "${entry.cropId}" was found in the collection.`

          });

          return;

        }

        firstIndexById.set(
          entry.cropId,
          index
        );

      }
    );

    return entries;

  }



  /*
    ============================================================
    COLLECTION LOOKUP CREATION
    ============================================================
  */


  function createCropLookupFromEntries(
    entries,
    options = {}
  ) {

    const lookup = {};

    entries.forEach(
      entry => {

        if (
          !entry.cropId ||
          !entry.validRecord
        ) {
          return;
        }

        if (
          lookup[
            entry.cropId
          ] &&
          options.keepFirst !==
            false
        ) {
          return;
        }

        lookup[
          entry.cropId
        ] =
          entry.crop;

      }
    );

    return lookup;

  }



  function createCropEntryLookup(
    entries
  ) {

    const lookup =
      new Map();

    entries.forEach(
      entry => {

        if (
          !entry.cropId
        ) {
          return;
        }

        if (
          !lookup.has(
            entry.cropId
          )
        ) {

          lookup.set(
            entry.cropId,
            entry
          );

        }

      }
    );

    return lookup;

  }



  /*
    ============================================================
    COLLECTION PIPELINE METADATA
    ============================================================
  */


  function createCollectionPipelineMetadata(
    normalizedCollection,
    options
  ) {

    return {

      pipelineVersion:
        COLLECTION_PIPELINE_VERSION,

      engineVersion:
        typeof ENGINE_VERSION ===
          "string"
          ? ENGINE_VERSION
          : ENGINE_PIPELINE_VERSION,

      status:
        COLLECTION_EVALUATION_STATUSES
          .PENDING,

      inputType:
        normalizedCollection
          .collectionType,

      inputCount:
        normalizedCollection
          .inputCount,

      startedAt:
        null,

      completedAt:
        null,

      durationMs:
        null,

      evaluatedCount:
        0,

      rankedCount:
        0,

      eligibleCount:
        0,

      rejectedCount:
        0,

      failedCount:
        0,

      warningCount:
        0,

      duplicateCount:
        0,

      invalidRecordCount:
        0,

      explanationRebuildCount:
        0,

      rankApplied:
        false,

      explanationsRebuilt:
        false,

      errors:
        [],

      warnings:
        [],

      cropSummaries:
        [],

      options: {

        rankEvaluations:
          options.rankEvaluations,

        rebuildExplanationsAfterRanking:
          options
            .rebuildExplanationsAfterRanking,

        includeFailedEvaluations:
          options
            .includeFailedEvaluations,

        includeInvalidCropRecords:
          options
            .includeInvalidCropRecords,

        allowDuplicateCropIds:
          options.allowDuplicateCropIds,

        deterministicOrder:
          options.deterministicOrder,

        includeTiming:
          options.includeTiming,

        includeDiagnostics:
          options.includeDiagnostics

      },

      context:
        options.context ??
        null

    };

  }



  /*
    ============================================================
    COLLECTION WARNING AND ERROR REGISTRATION
    ============================================================
  */


  function registerCollectionWarning(
    pipeline,
    warning,
    metadata = {}
  ) {

    const normalizedWarning = {

      code:
        warning?.code ||
        "COLLECTION_WARNING",

      message:
        warning?.message ||
        warning?.text ||
        String(
          warning ||
          "Collection warning."
        ),

      severity:
        warning?.severity ||
        "notice",

      cropId:
        warning?.cropId ||
        metadata.cropId ||
        null,

      sourceIndex:
        Number.isFinite(
          warning?.sourceIndex
        )
          ? warning.sourceIndex
          : (
              Number.isFinite(
                metadata.sourceIndex
              )
                ? metadata.sourceIndex
                : null
            ),

      timestamp:
        new Date()
          .toISOString(),

      metadata: {

        ...(
          warning?.metadata &&
          typeof warning.metadata ===
            "object"
            ? warning.metadata
            : {}
        ),

        ...metadata

      }

    };

    pipeline.warnings.push(
      normalizedWarning
    );

    pipeline.warningCount +=
      1;

    return normalizedWarning;

  }



  function registerCollectionError(
    pipeline,
    error,
    metadata = {}
  ) {

    const normalizedError =
      normalizeEngineError(
        error,
        {
          phase:
            "collection",

          code:
            metadata.code ||
            error?.code ||
            "COLLECTION_EVALUATION_ERROR",

          fatal:
            metadata.fatal ===
              true,

          recoverable:
            metadata.recoverable !==
              false,

          cropId:
            metadata.cropId ||
            null,

          metadata
        }
      );

    pipeline.errors.push(
      normalizedError
    );

    return normalizedError;

  }



  /*
    ============================================================
    INVALID RECORD EVALUATION
    ============================================================
  */


  function createInvalidCollectionCropEvaluation(
    entry,
    answers,
    options
  ) {

    const invalidError =
      createEngineInputError(
        `The crop record at collection position ${
          Number.isFinite(
            entry.sourceIndex
          )
            ? entry.sourceIndex
            : "unknown"
        } is not a valid object.`,
        "INVALID_COLLECTION_CROP_RECORD"
      );

    const failedEvaluation =
      createFailedCropEvaluation(
        entry.crop,
        answers,
        invalidError,
        options.cropOptions
      );

    failedEvaluation.cropId =
      entry.cropId ||
      `invalid-crop-${entry.sourceIndex ?? "unknown"}`;

    failedEvaluation.cropName =
      entry.cropName ||
      "Invalid Crop Record";

    failedEvaluation.metadata = {

      ...failedEvaluation.metadata,

      collectionSourceIndex:
        entry.sourceIndex,

      collectionSourceKey:
        entry.sourceKey,

      invalidCollectionRecord:
        true

    };

    failedEvaluation.final = {

      ...failedEvaluation.final,

      recommendationStatus:
        "insufficient-data",

      recommendationStatusLabel:
        "Invalid Crop Record",

      eligible:
        false,

      rankingScore:
        -Infinity,

      flags: [

        ...(
          Array.isArray(
            failedEvaluation.final
              ?.flags
          )
            ? failedEvaluation.final
                .flags
            : []
        ),

        "invalid-crop-record"

      ]

    };

    return failedEvaluation;

  }



  /*
    ============================================================
    DUPLICATE RECORD EVALUATION
    ============================================================
  */


  function createDuplicateCropEvaluation(
    entry,
    answers,
    options
  ) {

    const duplicateError =
      createEngineInputError(
        `Duplicate crop ID "${entry.cropId}" was skipped because duplicate crop IDs are not allowed.`,
        "DUPLICATE_CROP_ID"
      );

    const failedEvaluation =
      createFailedCropEvaluation(
        entry.crop,
        answers,
        duplicateError,
        options.cropOptions
      );

    failedEvaluation.cropId =
      entry.cropId;

    failedEvaluation.cropName =
      entry.cropName;

    failedEvaluation.metadata = {

      ...failedEvaluation.metadata,

      collectionSourceIndex:
        entry.sourceIndex,

      collectionSourceKey:
        entry.sourceKey,

      duplicateCropRecord:
        true,

      duplicateOfIndex:
        entry.duplicateOfIndex

    };

    failedEvaluation.final = {

      ...failedEvaluation.final,

      recommendationStatus:
        "insufficient-data",

      recommendationStatusLabel:
        "Duplicate Crop Record",

      eligible:
        false,

      rankingScore:
        -Infinity,

      flags: [

        ...(
          Array.isArray(
            failedEvaluation.final
              ?.flags
          )
            ? failedEvaluation.final
                .flags
            : []
        ),

        "duplicate-crop-id"

      ]

    };

    return failedEvaluation;

  }



  /*
    ============================================================
    COLLECTION ENTRY EVALUATION
    ============================================================
  */


  function evaluateNormalizedCropEntry(
    entry,
    answers,
    options
  ) {

    if (
      !entry.validRecord
    ) {

      return options
        .includeInvalidCropRecords
        ? createInvalidCollectionCropEvaluation(
            entry,
            answers,
            options
          )
        : null;

    }

    if (
      entry.duplicate &&
      !options.allowDuplicateCropIds
    ) {

      return options
        .includeFailedEvaluations
        ? createDuplicateCropEvaluation(
            entry,
            answers,
            options
          )
        : null;

    }

    const evaluation =
      evaluateCropSafely(
        entry.crop,
        answers,
        {

          ...options.cropOptions,

          context: {

            ...(
              options.cropOptions
                ?.context &&
              typeof options.cropOptions
                .context ===
                  "object"
                ? options.cropOptions
                    .context
                : {}
            ),

            collectionSourceIndex:
              entry.sourceIndex,

            collectionSourceKey:
              entry.sourceKey

          }

        }
      );

    evaluation.metadata = {

      ...evaluation.metadata,

      collectionSourceIndex:
        entry.sourceIndex,

      collectionSourceKey:
        entry.sourceKey,

      collectionInputType:
        entry.sourceType,

      duplicateCropRecord:
        entry.duplicate,

      duplicateOfIndex:
        entry.duplicateOfIndex

    };

    if (
      entry.normalizationWarnings
        .length >
      0
    ) {

      entry.normalizationWarnings
        .forEach(
          warning => {

            evaluation.warnings.push({

              phase:
                "collection-normalization",

              code:
                warning.code,

              message:
                warning.message,

              severity:
                "notice",

              timestamp:
                new Date()
                  .toISOString(),

              metadata: {

                sourceIndex:
                  entry.sourceIndex,

                sourceKey:
                  entry.sourceKey

              }

            });

          }
        );

      if (
        evaluation.pipeline
      ) {

        evaluation.pipeline
          .warningCount =
            evaluation.warnings
              .length;

      }

    }

    return evaluation;

  }



  /*
    ============================================================
    RANKABLE EVALUATION FILTER
    ============================================================
  */


  function isEvaluationRankable(
    evaluation
  ) {

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {
      return false;
    }

    if (
      isCropEvaluationFailed(
        evaluation
      )
    ) {
      return false;
    }

    if (
      evaluation.metadata
        ?.invalidCollectionRecord ===
          true ||
      evaluation.metadata
        ?.duplicateCropRecord ===
          true
    ) {
      return false;
    }

    if (
      !evaluation.final ||
      typeof evaluation.final !==
        "object"
    ) {
      return false;
    }

    if (
      evaluation.final
        .recommendationStatus ===
          "insufficient-data" &&
      !Number.isFinite(
        evaluation.final
          .rankingScore
      )
    ) {
      return false;
    }

    return true;

  }



  function separateRankableEvaluations(
    evaluations
  ) {

    const rankable = [];
    const unrankable = [];

    evaluations.forEach(
      evaluation => {

        if (
          isEvaluationRankable(
            evaluation
          )
        ) {

          rankable.push(
            evaluation
          );

        } else {

          unrankable.push(
            evaluation
          );

        }

      }
    );

    return {

      rankable,

      unrankable

    };

  }



  /*
    ============================================================
    UNRANKED EVALUATION FINALIZATION
    ============================================================
  */


  function markEvaluationUnranked(
    evaluation,
    reason
  ) {

    ensureFinalFallback(
      evaluation
    );

    evaluation.final.rank =
      null;

    evaluation.final.tieGroup =
      null;

    evaluation.final.rankingTier =
      evaluation.final
        .rankingTier ||
      "unranked";

    evaluation.final.rankingTierLabel =
      evaluation.final
        .rankingTierLabel ||
      "Unranked";

    evaluation.metadata = {

      ...evaluation.metadata,

      collectionRankAssigned:
        false,

      unrankedReason:
        reason ||
        "Evaluation was not eligible for collection ranking."

    };

    return evaluation;

  }



  /*
    ============================================================
    RANKING RESULT NORMALIZATION
    ============================================================
  */


  function normalizeRankedEvaluationResult(
    rankingResult,
    originalEvaluations
  ) {

    if (
      Array.isArray(
        rankingResult
      )
    ) {

      return {

        evaluations:
          rankingResult,

        summary:
          createRankingSummary(
            rankingResult
          )

      };

    }

    if (
      rankingResult &&
      typeof rankingResult ===
        "object" &&
      Array.isArray(
        rankingResult
          .evaluations
      )
    ) {

      return {

        evaluations:
          rankingResult
            .evaluations,

        summary:
          rankingResult.summary ||
          createRankingSummary(
            rankingResult
              .evaluations
          )

      };

    }

    return {

      evaluations:
        originalEvaluations,

      summary:
        createRankingSummary(
          originalEvaluations
        )

    };

  }



  /*
    ============================================================
    APPLY RANKING METADATA
    ============================================================
  */


  function applyCollectionRankingMetadata(
    evaluations
  ) {

    evaluations.forEach(
      evaluation => {

        const rank =
          evaluation.final
            ?.rank;

        evaluation.metadata = {

          ...evaluation.metadata,

          collectionRankAssigned:
            Number.isFinite(
              rank
            ),

          collectionRank:
            Number.isFinite(
              rank
            )
              ? rank
              : null,

          tieGroup:
            evaluation.final
              ?.tieGroup ??
            null,

          rankingTier:
            evaluation.final
              ?.rankingTier ??
            "unranked",

          collectionRankingScore:
            evaluation.final
              ?.rankingScore ??
            null

        };

      }
    );

    return evaluations;

  }



  /*
    ============================================================
    POST-RANKING EXPLANATION REBUILD
    ============================================================
  */


  function rebuildCollectionExplanations(
    cropLookup,
    answers,
    evaluations,
    options
  ) {

    if (
      options
        .rebuildExplanationsAfterRanking !==
          true
    ) {

      return {

        evaluations,

        rebuiltCount:
          0,

        failedCount:
          0,

        warnings:
          []

      };

    }

    const warnings = [];
    let rebuiltCount = 0;
    let failedCount = 0;

    evaluations.forEach(
      evaluation => {

        if (
          !evaluation ||
          typeof evaluation !==
            "object"
        ) {
          return;
        }

        const cropId =
          getEvaluationCropId(
            evaluation
          );

        const crop =
          cropId
            ? cropLookup[
                cropId
              ]
            : null;

        if (
          !crop
        ) {

          warnings.push({

            code:
              "EXPLANATION_REBUILD_CROP_NOT_FOUND",

            message:
              `The crop record for "${
                cropId ||
                "unknown"
              }" could not be found while rebuilding ranked explanations.`,

            cropId:
              cropId ||
              null

          });

          failedCount +=
            1;

          return;

        }

        try {

          rebuildRecommendationExplanation(
            crop,
            answers,
            evaluation
          );

          evaluation.metadata = {

            ...evaluation.metadata,

            explanationRebuiltAfterRanking:
              true,

            explanationRebuildFailed:
              false

          };

          rebuiltCount +=
            1;

        } catch (
          error
        ) {

          const normalizedError =
            normalizeEngineError(
              error,
              {
                phase:
                  ENGINE_PHASE_IDS
                    .EXPLANATION,

                code:
                  "POST_RANKING_EXPLANATION_REBUILD_FAILED",

                fatal:
                  false,

                recoverable:
                  true,

                cropId
              }
            );

          evaluation.errors =
            Array.isArray(
              evaluation.errors
            )
              ? evaluation.errors
              : [];

          evaluation.errors.push(
            normalizedError
          );

          evaluation.metadata = {

            ...evaluation.metadata,

            explanationRebuiltAfterRanking:
              false,

            explanationRebuildFailed:
              true

          };

          warnings.push({

            code:
              normalizedError.code,

            message:
              normalizedError.message,

            cropId

          });

          failedCount +=
            1;

        }

      }
    );

    return {

      evaluations,

      rebuiltCount,

      failedCount,

      warnings

    };

  }



  /*
    ============================================================
    COLLECTION COUNTS
    ============================================================
  */


  function countEligibleEvaluations(
    evaluations
  ) {

    return evaluations.filter(
      evaluation =>
        getCropEligibilityState(
          evaluation
        ).eligible
    ).length;

  }



  function countRejectedEvaluations(
    evaluations
  ) {

    return evaluations.filter(
      evaluation =>
        !getCropEligibilityState(
          evaluation
        ).eligible
    ).length;

  }



  function countFailedEvaluations(
    evaluations
  ) {

    return evaluations.filter(
      isCropEvaluationFailed
    ).length;

  }



  function countEvaluationWarnings(
    evaluations
  ) {

    return evaluations.reduce(
      (
        total,
        evaluation
      ) =>
        total +
        (
          evaluation.pipeline
            ?.warningCount ??
          evaluation.warnings
            ?.length ??
          0
        ),
      0
    );

  }



  function countRankedEvaluations(
    evaluations
  ) {

    return evaluations.filter(
      evaluation =>
        Number.isFinite(
          evaluation.final
            ?.rank
        )
    ).length;

  }



  /*
    ============================================================
    COLLECTION STATUS
    ============================================================
  */


  function determineCollectionEvaluationStatus(
    pipeline
  ) {

    const hasFatalError =
      pipeline.errors.some(
        error =>
          error.fatal ===
            true
      );

    if (
      hasFatalError
    ) {

      return COLLECTION_EVALUATION_STATUSES
        .FAILED;

    }

    if (
      pipeline.failedCount > 0 ||
      pipeline.warningCount > 0 ||
      pipeline.errors.length > 0
    ) {

      return COLLECTION_EVALUATION_STATUSES
        .COMPLETE_WITH_WARNINGS;

    }

    return COLLECTION_EVALUATION_STATUSES
      .COMPLETE;

  }



  /*
    ============================================================
    COLLECTION PIPELINE FINALIZATION
    ============================================================
  */


  function finalizeCollectionPipeline(
    result,
    startTime,
    options
  ) {

    const endTime =
      getEngineTimestamp();

    const evaluations =
      Array.isArray(
        result.evaluations
      )
        ? result.evaluations
        : [];

    result.pipeline.completedAt =
      endTime;

    result.pipeline.durationMs =
      options.includeTiming
        ? roundMilliseconds(
            calculateElapsedMilliseconds(
              startTime,
              endTime
            )
          )
        : null;

    result.pipeline.evaluatedCount =
      evaluations.length;

    result.pipeline.rankedCount =
      countRankedEvaluations(
        evaluations
      );

    result.pipeline.eligibleCount =
      countEligibleEvaluations(
        evaluations
      );

    result.pipeline.rejectedCount =
      countRejectedEvaluations(
        evaluations
      );

    result.pipeline.failedCount =
      countFailedEvaluations(
        evaluations
      );

    result.pipeline.warningCount =
      result.pipeline
        .warnings
        .length +
      countEvaluationWarnings(
        evaluations
      );

    result.pipeline.status =
      determineCollectionEvaluationStatus(
        result.pipeline
      );

    result.metadata = {

      ...result.metadata,

      collectionPipelineVersion:
        COLLECTION_PIPELINE_VERSION,

      evaluationCount:
        evaluations.length,

      rankedCount:
        result.pipeline
          .rankedCount,

      eligibleCount:
        result.pipeline
          .eligibleCount,

      rejectedCount:
        result.pipeline
          .rejectedCount,

      failedCount:
        result.pipeline
          .failedCount,

      warningCount:
        result.pipeline
          .warningCount,

      durationMs:
        result.pipeline
          .durationMs,

      rankApplied:
        result.pipeline
          .rankApplied,

      explanationsRebuilt:
        result.pipeline
          .explanationsRebuilt,

      completedAt:
        new Date()
          .toISOString()

    };

    return result;

  }



  /*
    ============================================================
    FAILED COLLECTION RESULT
    ============================================================
  */


  function createFailedCollectionResult(
    crops,
    answers,
    error,
    options
  ) {

    const normalizedCollection =
      normalizeCropCollection(
        crops
      );

    const pipeline =
      createCollectionPipelineMetadata(
        normalizedCollection,
        options
      );

    const normalizedError =
      registerCollectionError(
        pipeline,
        error,
        {
          code:
            error?.code ||
            "COLLECTION_INITIALIZATION_FAILED",

          fatal:
            true,

          recoverable:
            false
        }
      );

    pipeline.status =
      COLLECTION_EVALUATION_STATUSES
        .FAILED;

    return {

      evaluations:
        [],

      rankedEvaluations:
        [],

      unrankedEvaluations:
        [],

      rankingSummary:
        null,

      cropLookup:
        {},

      pipeline,

      errors: [
        normalizedError
      ],

      warnings:
        [],

      metadata: {

        collectionPipelineVersion:
          COLLECTION_PIPELINE_VERSION,

        evaluationCount:
          0,

        failed:
          true,

        failureCode:
          normalizedError.code,

        failureMessage:
          normalizedError.message

      }

    };

  }



  /*
    ============================================================
    INTERNAL FULL COLLECTION PIPELINE
    ============================================================
  */


  function runCollectionEvaluationPipeline(
    crops,
    answers,
    options
  ) {

    const startTime =
      getEngineTimestamp();

    const normalizedCollection =
      normalizeCropCollection(
        crops
      );

    const orderedEntries =
      orderNormalizedCropEntries(
        normalizedCollection
          .entries,
        options
          .deterministicOrder
      );

    markDuplicateCropEntries(
      orderedEntries
    );

    const pipeline =
      createCollectionPipelineMetadata(
        {
          ...normalizedCollection,

          entries:
            orderedEntries
        },
        options
      );

    pipeline.status =
      COLLECTION_EVALUATION_STATUSES
        .RUNNING;

    pipeline.startedAt =
      startTime;

    pipeline.duplicateCount =
      orderedEntries.filter(
        entry =>
          entry.duplicate
      ).length;

    pipeline.invalidRecordCount =
      orderedEntries.filter(
        entry =>
          !entry.validRecord
      ).length;

    orderedEntries.forEach(
      entry => {

        entry.normalizationWarnings
          .forEach(
            warning => {

              registerCollectionWarning(
                pipeline,
                warning,
                {
                  cropId:
                    entry.cropId,

                  sourceIndex:
                    entry.sourceIndex,

                  sourceKey:
                    entry.sourceKey
                }
              );

            }
          );

      }
    );

    const evaluations = [];

    orderedEntries.forEach(
      entry => {

        try {

          const evaluation =
            evaluateNormalizedCropEntry(
              entry,
              answers,
              options
            );

          if (
            evaluation
          ) {

            evaluations.push(
              evaluation
            );

            pipeline.cropSummaries.push(
              createSingleCropPipelineSummary(
                evaluation
              )
            );

          }

        } catch (
          error
        ) {

          registerCollectionError(
            pipeline,
            error,
            {
              code:
                "COLLECTION_CROP_PROCESSING_FAILED",

              fatal:
                false,

              recoverable:
                true,

              cropId:
                entry.cropId,

              sourceIndex:
                entry.sourceIndex,

              sourceKey:
                entry.sourceKey
            }
          );

          if (
            options
              .includeFailedEvaluations
          ) {

            const failedEvaluation =
              createFailedCropEvaluation(
                entry.crop,
                answers,
                error,
                options.cropOptions
              );

            failedEvaluation.metadata = {

              ...failedEvaluation.metadata,

              collectionSourceIndex:
                entry.sourceIndex,

              collectionSourceKey:
                entry.sourceKey

            };

            evaluations.push(
              failedEvaluation
            );

            pipeline.cropSummaries.push(
              createSingleCropPipelineSummary(
                failedEvaluation
              )
            );

          }

        }

      }
    );

    const separated =
      separateRankableEvaluations(
        evaluations
      );

    let rankedEvaluations =
      separated.rankable;

    let rankingSummary =
      null;

    if (
      options.rankEvaluations &&
      rankedEvaluations.length >
        0
    ) {

      try {

        const rankingResult =
          normalizeRankedEvaluationResult(
            rankCropEvaluations(
              rankedEvaluations
            ),
            rankedEvaluations
          );

        rankedEvaluations =
          rankingResult
            .evaluations;

        rankingSummary =
          rankingResult.summary;

        applyCollectionRankingMetadata(
          rankedEvaluations
        );

        pipeline.rankApplied =
          true;

      } catch (
        error
      ) {

        registerCollectionError(
          pipeline,
          error,
          {
            code:
              "COLLECTION_RANKING_FAILED",

            fatal:
              false,

            recoverable:
              true
          }
        );

        rankedEvaluations.forEach(
          evaluation => {

            markEvaluationUnranked(
              evaluation,
              "Collection ranking failed."
            );

          }
        );

        rankingSummary =
          createRankingSummary(
            rankedEvaluations
          );

      }

    } else {

      rankedEvaluations.forEach(
        evaluation => {

          markEvaluationUnranked(
            evaluation,
            options.rankEvaluations
              ? "No rankable evaluations were available."
              : "Collection ranking was disabled."
          );

        }
      );

      rankingSummary =
        createRankingSummary(
          rankedEvaluations
        );

    }

    separated.unrankable.forEach(
      evaluation => {

        markEvaluationUnranked(
          evaluation,
          evaluation.metadata
            ?.invalidCollectionRecord
            ? "Invalid crop records cannot be ranked."
            : evaluation.metadata
                ?.duplicateCropRecord
              ? "Duplicate crop records cannot be ranked."
              : isCropEvaluationFailed(
                  evaluation
                )
                ? "Failed crop evaluations cannot be ranked."
                : "The evaluation did not contain a valid ranking result."
        );

      }
    );

    const cropLookup =
      createCropLookupFromEntries(
        orderedEntries,
        {
          keepFirst:
            true
        }
      );

    const explanationRebuild =
      rebuildCollectionExplanations(
        cropLookup,
        answers,
        rankedEvaluations,
        options
      );

    explanationRebuild
      .warnings
      .forEach(
        warning => {

          registerCollectionWarning(
            pipeline,
            warning,
            {
              phase:
                "post-ranking-explanation"
            }
          );

        }
      );

    pipeline.explanationRebuildCount =
      explanationRebuild
        .rebuiltCount;

    pipeline.explanationsRebuilt =
      explanationRebuild
        .rebuiltCount >
        0;

    const rankedSet =
      new Set(
        rankedEvaluations
      );

    const finalEvaluations =
      evaluations.map(
        evaluation =>
          rankedSet.has(
            evaluation
          )
            ? evaluation
            : evaluation
      );

    /*
      Keep the primary evaluations array in ranking order for
      ranked crops, followed by unranked/failed diagnostics.

      The original source order remains available through
      metadata.collectionSourceIndex.
    */

    const orderedFinalEvaluations = [

      ...rankedEvaluations,

      ...separated.unrankable

    ];

    const result = {

      evaluations:
        orderedFinalEvaluations,

      rankedEvaluations,

      unrankedEvaluations:
        separated.unrankable,

      sourceOrderEvaluations:
        finalEvaluations,

      rankingSummary,

      cropLookup,

      cropEntryLookup:
        createCropEntryLookup(
          orderedEntries
        ),

      pipeline,

      errors:
        pipeline.errors,

      warnings:
        pipeline.warnings,

      metadata: {

        collectionPipelineVersion:
          COLLECTION_PIPELINE_VERSION,

        inputType:
          normalizedCollection
            .collectionType,

        inputCount:
          normalizedCollection
            .inputCount,

        deterministicOrder:
          options
            .deterministicOrder,

        rankRequested:
          options
            .rankEvaluations,

        explanationRebuildRequested:
          options
            .rebuildExplanationsAfterRanking

      }

    };

    return finalizeCollectionPipeline(
      result,
      startTime,
      options
    );

  }



  /*
    ============================================================
    PUBLIC FULL COLLECTION EVALUATOR
    ============================================================
  */


  function evaluateAllCrops(
    crops,
    answers,
    options = {}
  ) {

    const normalizedOptions =
      normalizeCollectionEvaluationOptions(
        options
      );

    const validation =
      validateCropCollectionInput(
        crops,
        answers
      );

    if (
      !validation.valid
    ) {

      const primaryError =
        validation.errors[0];

      return createFailedCollectionResult(
        crops,
        answers,
        primaryError,
        normalizedOptions
      );

    }

    try {

      return runCollectionEvaluationPipeline(
        crops,
        answers,
        normalizedOptions
      );

    } catch (
      error
    ) {

      return createFailedCollectionResult(
        crops,
        answers,
        error,
        normalizedOptions
      );

    }

  }



  /*
    ============================================================
    STRICT COLLECTION EVALUATOR

    Intended for HQ testing.

    This validates the collection before running, but crop-level
    processing still uses safe evaluations so the complete error
    picture can be inspected.
    ============================================================
  */


  function evaluateAllCropsStrictly(
    crops,
    answers,
    options = {}
  ) {

    const validation =
      validateCropCollectionInput(
        crops,
        answers
      );

    if (
      !validation.valid
    ) {

      throw validation.errors[0];

    }

    const result =
      runCollectionEvaluationPipeline(
        crops,
        answers,
        normalizeCollectionEvaluationOptions({

          ...options,

          cropOptions: {

            ...(
              options.cropOptions &&
              typeof options.cropOptions ===
                "object"
                ? options.cropOptions
                : {}
            ),

            isolatePhaseErrors:
              true,

            suppressFatalErrors:
              true

          }

        })
      );

    if (
      result.pipeline
        .errors
        .some(
          error =>
            error.fatal ===
              true
        )
    ) {

      const firstFatalError =
        result.pipeline
          .errors
          .find(
            error =>
              error.fatal ===
                true
          );

      const strictError =
        new Error(
          firstFatalError.message
        );

      strictError.code =
        firstFatalError.code;

      throw strictError;

    }

    return result;

  }



  /*
    ============================================================
    COLLECTION RESULT STATUS HELPERS
    ============================================================
  */


  function isCollectionEvaluationComplete(
    result
  ) {

    return Boolean(

      result &&

      typeof result ===
        "object" &&

      (
        result.pipeline
          ?.status ===
            COLLECTION_EVALUATION_STATUSES
              .COMPLETE ||

        result.pipeline
          ?.status ===
            COLLECTION_EVALUATION_STATUSES
              .COMPLETE_WITH_WARNINGS
      )

    );

  }



  function isCollectionEvaluationFailed(
    result
  ) {

    return Boolean(

      result &&

      typeof result ===
        "object" &&

      result.pipeline
        ?.status ===
          COLLECTION_EVALUATION_STATUSES
            .FAILED

    );

  }



  function hasCollectionEvaluationWarnings(
    result
  ) {

    return Boolean(

      result &&

      typeof result ===
        "object" &&

      (
        result.pipeline
          ?.warningCount >
            0 ||

        result.pipeline
          ?.failedCount >
            0 ||

        result.pipeline
          ?.errors
          ?.length >
            0
      )

    );

  }



  function getCollectionEvaluationStatus(
    result
  ) {

    if (
      !result ||
      typeof result !==
        "object"
    ) {

      return COLLECTION_EVALUATION_STATUSES
        .FAILED;

    }

    return (
      result.pipeline
        ?.status ||
      COLLECTION_EVALUATION_STATUSES
        .PENDING
    );

  }



  /*
    ============================================================
    COLLECTION SUMMARY
    ============================================================
  */


  function createCollectionPipelineSummary(
    result
  ) {

    if (
      !result ||
      typeof result !==
        "object"
    ) {
      return null;
    }

    const pipeline =
      result.pipeline ||
      {};

    return {

      status:
        getCollectionEvaluationStatus(
          result
        ),

      inputType:
        pipeline.inputType ||
        null,

      inputCount:
        pipeline.inputCount ??
        0,

      evaluatedCount:
        pipeline.evaluatedCount ??
        0,

      rankedCount:
        pipeline.rankedCount ??
        0,

      eligibleCount:
        pipeline.eligibleCount ??
        0,

      rejectedCount:
        pipeline.rejectedCount ??
        0,

      failedCount:
        pipeline.failedCount ??
        0,

      duplicateCount:
        pipeline.duplicateCount ??
        0,

      invalidRecordCount:
        pipeline.invalidRecordCount ??
        0,

      warningCount:
        pipeline.warningCount ??
        0,

      errorCount:
        Array.isArray(
          pipeline.errors
        )
          ? pipeline.errors
              .length
          : 0,

      rankApplied:
        pipeline.rankApplied ===
          true,

      explanationsRebuilt:
        pipeline
          .explanationsRebuilt ===
          true,

      explanationRebuildCount:
        pipeline
          .explanationRebuildCount ??
        0,

      durationMs:
        pipeline.durationMs ??
        null,

      rankingSummary:
        result.rankingSummary ||
        null

    };

  }



  /*
    ============================================================
    COLLECTION RESULT ACCESS HELPERS
    ============================================================
  */


  function getRankedCropEvaluations(
    result
  ) {

    return Array.isArray(
      result
        ?.rankedEvaluations
    )
      ? result
          .rankedEvaluations
      : [];

  }



  function getUnrankedCropEvaluations(
    result
  ) {

    return Array.isArray(
      result
        ?.unrankedEvaluations
    )
      ? result
          .unrankedEvaluations
      : [];

  }



  function getAllCropEvaluations(
    result
  ) {

    return Array.isArray(
      result
        ?.evaluations
    )
      ? result.evaluations
      : [];

  }



  function findCropEvaluationById(
    result,
    cropId
  ) {

    if (
      !cropId
    ) {
      return null;
    }

    return (
      getAllCropEvaluations(
        result
      ).find(
        evaluation =>
          getEvaluationCropId(
            evaluation
          ) ===
            cropId
      ) ||
      null
    );

  }



  function getTopRankedCropEvaluations(
    result,
    limit = 5
  ) {

    const normalizedLimit =
      Number.isFinite(
        limit
      )
        ? Math.max(
            0,
            Math.floor(
              limit
            )
          )
        : 5;

    return getRankedCropEvaluations(
      result
    ).slice(
      0,
      normalizedLimit
    );

  }

    /*
    ============================================================
    PART 13
    FINAL ENGINE INTEGRATION

    PART 13C
    PUBLIC RESULT SHAPING, FILTERS, STATISTICS, AND DIAGNOSTICS

    This section converts internal crop evaluations into stable,
    visitor-safe result objects.

    Internal evaluation details remain available to HQ tools,
    while public pages receive a controlled result structure.

    Main functions introduced here:

      createPublicCropResult()
      createPublicRecommendationCard()
      createPublicRecommendationDetail()
      createPublicCollectionResult()
      createPlannerResultStatistics()
      filterCropEvaluations()
      groupCropEvaluationsByRecommendation()
    ============================================================
  */


  /*
    ============================================================
    PUBLIC RESULT VERSION
    ============================================================
  */


  const PUBLIC_RESULT_VERSION =
    "2.0.0";


  const PUBLIC_RESULT_TYPES =
    Object.freeze({

      CARD:
        "card",

      DETAIL:
        "detail",

      DIAGNOSTIC:
        "diagnostic",

      COLLECTION:
        "collection"

    });


  const PUBLIC_RECOMMENDATION_GROUPS =
    Object.freeze({

      TOP:
        "top",

      STRONG:
        "strong",

      CONDITIONAL:
        "conditional",

      LOW_PRIORITY:
        "low-priority",

      NOT_RECOMMENDED:
        "not-recommended",

      REJECTED:
        "rejected",

      UNRANKED:
        "unranked",

      FAILED:
        "failed"

    });



  /*
    ============================================================
    DEFAULT PUBLIC RESULT OPTIONS
    ============================================================
  */


  const DEFAULT_PUBLIC_RESULT_OPTIONS =
    Object.freeze({

      includeDiagnostics:
        false,

      includeInternalScores:
        false,

      includeWarnings:
        true,

      includeUncertainties:
        true,

      includeRejectedReasons:
        true,

      includeAlternativeUsePaths:
        true,

      includeRiskMitigations:
        true,

      includeConfidenceReasons:
        true,

      includeSourceOrder:
        false,

      includeFailedResults:
        false,

      includeRejectedResults:
        true,

      includeUnrankedResults:
        true,

      maximumReasons:
        5,

      maximumConsiderations:
        5,

      maximumWarnings:
        5,

      maximumUncertainties:
        5,

      maximumMitigations:
        6,

      maximumAlternativeUsePaths:
        3,

      topRecommendationLimit:
        5

    });



  function normalizePublicResultOptions(
    options
  ) {

    const suppliedOptions =
      options &&
      typeof options ===
        "object"
        ? options
        : {};

    return {

      ...DEFAULT_PUBLIC_RESULT_OPTIONS,

      ...suppliedOptions,

      includeDiagnostics:
        suppliedOptions
          .includeDiagnostics ===
            true,

      includeInternalScores:
        suppliedOptions
          .includeInternalScores ===
            true,

      includeWarnings:
        suppliedOptions
          .includeWarnings !==
            false,

      includeUncertainties:
        suppliedOptions
          .includeUncertainties !==
            false,

      includeRejectedReasons:
        suppliedOptions
          .includeRejectedReasons !==
            false,

      includeAlternativeUsePaths:
        suppliedOptions
          .includeAlternativeUsePaths !==
            false,

      includeRiskMitigations:
        suppliedOptions
          .includeRiskMitigations !==
            false,

      includeConfidenceReasons:
        suppliedOptions
          .includeConfidenceReasons !==
            false,

      includeSourceOrder:
        suppliedOptions
          .includeSourceOrder ===
            true,

      includeFailedResults:
        suppliedOptions
          .includeFailedResults ===
            true,

      includeRejectedResults:
        suppliedOptions
          .includeRejectedResults !==
            false,

      includeUnrankedResults:
        suppliedOptions
          .includeUnrankedResults !==
            false,

      maximumReasons:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumReasons,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumReasons
        ),

      maximumConsiderations:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumConsiderations,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumConsiderations
        ),

      maximumWarnings:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumWarnings,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumWarnings
        ),

      maximumUncertainties:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumUncertainties,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumUncertainties
        ),

      maximumMitigations:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumMitigations,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumMitigations
        ),

      maximumAlternativeUsePaths:
        normalizePublicResultLimit(
          suppliedOptions
            .maximumAlternativeUsePaths,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .maximumAlternativeUsePaths
        ),

      topRecommendationLimit:
        normalizePublicResultLimit(
          suppliedOptions
            .topRecommendationLimit,
          DEFAULT_PUBLIC_RESULT_OPTIONS
            .topRecommendationLimit
        )

    };

  }



  function normalizePublicResultLimit(
    value,
    fallback
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {

      return fallback;

    }

    return Math.max(
      0,
      Math.floor(
        value
      )
    );

  }



  /*
    ============================================================
    PUBLIC TEXT SANITIZATION

    Explanation text is already generated by the engine, but the
    public shaping layer guarantees plain strings and prevents
    accidental exposure of internal objects.
    ============================================================
  */


  function sanitizePublicText(
    value
  ) {

    if (
      typeof value !==
        "string"
    ) {
      return null;
    }

    const normalized =
      value
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    return normalized ||
      null;

  }



  function sanitizePublicStringArray(
    values,
    limit = Infinity
  ) {

    if (
      !Array.isArray(
        values
      )
    ) {
      return [];
    }

    return values
      .map(
        sanitizePublicText
      )
      .filter(
        Boolean
      )
      .slice(
        0,
        limit
      );

  }



  function createPublicMessageObject(
    message
  ) {

    if (
      !message
    ) {
      return null;
    }

    if (
      typeof message ===
        "string"
    ) {

      const text =
        sanitizePublicText(
          message
        );

      return text
        ? {
            id:
              null,

            title:
              null,

            text,

            shortText:
              text,

            type:
              null,

            category:
              null,

            severity:
              null
          }
        : null;

    }

    if (
      typeof message !==
        "object"
    ) {
      return null;
    }

    const text =
      sanitizePublicText(
        message.text
      );

    const shortText =
      sanitizePublicText(
        message.shortText
      ) ||
      text;

    if (
      !text &&
      !shortText
    ) {
      return null;
    }

    return {

      id:
        typeof message.id ===
          "string"
          ? message.id
          : null,

      title:
        sanitizePublicText(
          message.title
        ),

      text:
        text ||
        shortText,

      shortText:
        shortText ||
        text,

      type:
        typeof message.type ===
          "string"
          ? message.type
          : null,

      category:
        typeof message.category ===
          "string"
          ? message.category
          : null,

      severity:
        typeof message.severity ===
          "string"
          ? message.severity
          : null

    };

  }



  function createPublicMessageCollection(
    messages,
    limit = Infinity
  ) {

    if (
      !Array.isArray(
        messages
      )
    ) {
      return [];
    }

    return messages
      .map(
        createPublicMessageObject
      )
      .filter(
        Boolean
      )
      .slice(
        0,
        limit
      );

  }



  /*
    ============================================================
    PUBLIC SCORE HELPERS
    ============================================================
  */


  function normalizePublicScore(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    return roundScore(
      clamp(
        value,
        0,
        100
      )
    );

  }



  function normalizePublicAdjustment(
    value
  ) {

    if (
      !Number.isFinite(
        value
      )
    ) {
      return null;
    }

    return Math.round(
      value *
      100
    ) / 100;

  }



  function createPublicScoreSummary(
    evaluation,
    options
  ) {

    const final =
      evaluation.final ||
      {};

    const scoreSummary = {

      suitability:
        normalizePublicScore(
          final.score ??
          final.suitabilityScore
        ),

      confidence:
        normalizePublicScore(
          evaluation.confidence
            ?.score ??
          final.confidenceScore
        ),

      riskSafety:
        normalizePublicScore(
          evaluation.risks
            ?.score ??
          final.riskScore
        ),

      scoreBand:
        final.scoreBand ||
        null,

      scoreBandLabel:
        final.scoreBandLabel ||
        null,

      confidenceLevel:
        evaluation.confidence
          ?.level ||
        final.confidenceLevel ||
        "unknown",

      confidenceLabel:
        evaluation.confidence
          ?.levelLabel ||
        null

    };

    if (
      options.includeInternalScores
    ) {

      scoreSummary.compatibility =
        normalizePublicScore(
          evaluation.compatibility
            ?.score
        );

      scoreSummary.goals =
        normalizePublicScore(
          evaluation.goals
            ?.score
        );

      scoreSummary.usePath =
        normalizePublicScore(
          evaluation.usePaths
            ?.score
        );

      scoreSummary.baseScore =
        normalizePublicScore(
          final.baseScore
        );

      scoreSummary.rankingScore =
        Number.isFinite(
          final.rankingScore
        )
          ? Math.round(
              final.rankingScore *
              100
            ) / 100
          : null;

      scoreSummary.riskAdjustment =
        normalizePublicAdjustment(
          final.riskAdjustment
        );

      scoreSummary.confidenceAdjustment =
        normalizePublicAdjustment(
          final.confidenceAdjustment
        );

      scoreSummary.eligibilityAdjustment =
        normalizePublicAdjustment(
          final.eligibilityAdjustment
        );

    }

    return scoreSummary;

  }



  /*
    ============================================================
    PUBLIC CROP IDENTITY
    ============================================================
  */


  function createPublicCropIdentity(
    evaluation
  ) {

    const cropIdentity =
      evaluation.explanation
        ?.metadata
        ?.cropIdentity ||
      {};

    return {

      id:
        getEvaluationCropId(
          evaluation
        ),

      name:
        evaluation.cropName ||
        cropIdentity.commonName ||
        evaluation.pipeline
          ?.cropName ||
        "Unknown Crop",

      commonName:
        cropIdentity.commonName ||
        evaluation.cropName ||
        null,

      scientificName:
        cropIdentity.scientificName ||
        evaluation.metadata
          ?.scientificName ||
        null,

      category:
        cropIdentity.category ||
        null,

      lifecycle:
        cropIdentity.lifecycle ||
        null

    };

  }



  /*
    ============================================================
    PUBLIC ELIGIBILITY
    ============================================================
  */


  function createPublicEligibilitySummary(
    evaluation,
    options
  ) {

    const state =
      getCropEligibilityState(
        evaluation
      );

    const result = {

      eligible:
        state.eligible,

      status:
        evaluation.eligibility
          ?.status ||
        (
          state.eligible
            ? "eligible"
            : "rejected"
        ),

      hardFailureCount:
        state.hardFailureCount,

      warningCount:
        state.warningCount

    };

    if (
      options.includeRejectedReasons
    ) {

      result.reasons =
        createPublicMessageCollection(
          evaluation.explanation
            ?.rejectedReasons,
          options.maximumReasons
        );

    }

    return result;

  }



  /*
    ============================================================
    PUBLIC USE-PATH SHAPING
    ============================================================
  */


  function createPublicUsePathFactor(
    factor
  ) {

    if (
      !factor ||
      typeof factor !==
        "object"
    ) {
      return null;
    }

    return {

      id:
        factor.id ||
        null,

      label:
        factor.label ||
        convertIdentifierToWords(
          factor.id
        ) ||
        null,

      score:
        normalizePublicScore(
          factor.score
        ),

      evidenceCoverage:
        normalizePublicScore(
          Number.isFinite(
            factor.evidenceCoverage
          )
            ? factor.evidenceCoverage <=
                1
              ? factor.evidenceCoverage *
                100
              : factor.evidenceCoverage
            : null
        )

    };

  }



  function createPublicUsePath(
    path,
    options = {}
  ) {

    if (
      !path ||
      typeof path !==
        "object"
    ) {
      return null;
    }

    const result = {

      id:
        path.id ||
        null,

      label:
        path.label ||
        convertIdentifierToWords(
          path.id
        ) ||
        "Use Path",

      eligible:
        path.eligible !==
          false,

      status:
        path.status ||
        null,

      score:
        normalizePublicScore(
          path.score
        ),

      evidenceCoverage:
        normalizePublicScore(
          Number.isFinite(
            path.evidenceCoverage
          )
            ? path.evidenceCoverage <=
                1
              ? path.evidenceCoverage *
                100
              : path.evidenceCoverage
            : null
        ),

      strengths:
        sanitizePublicStringArray(
          path.strengths
            ?.map(
              item =>
                typeof item ===
                  "string"
                  ? item
                  : item?.text ||
                    item?.label ||
                    item?.title
            ),
          5
        ),

      concerns:
        sanitizePublicStringArray(
          path.concerns
            ?.map(
              item =>
                typeof item ===
                  "string"
                  ? item
                  : item?.text ||
                    item?.label ||
                    item?.title
            ),
          5
        )

    };

    if (
      options.includeFactors ===
        true
    ) {

      result.factors =
        Array.isArray(
          path.factors
        )
          ? path.factors
              .map(
                createPublicUsePathFactor
              )
              .filter(
                Boolean
              )
          : [];

    }

    return result;

  }



  function createPublicUsePathSummary(
    evaluation,
    options
  ) {

    const usePaths =
      evaluation.usePaths ||
      {};

    const bestPath =
      createPublicUsePath(
        usePaths.bestPath,
        {
          includeFactors:
            options.includeInternalScores
        }
      );

    const result = {

      available:
        Boolean(
          bestPath
        ),

      best:
        bestPath,

      eligiblePathCount:
        Array.isArray(
          usePaths.eligiblePaths
        )
          ? usePaths
              .eligiblePaths
              .length
          : 0,

      rejectedPathCount:
        Array.isArray(
          usePaths.rejectedPaths
        )
          ? usePaths
              .rejectedPaths
              .length
          : 0

    };

    if (
      options.includeAlternativeUsePaths
    ) {

      result.alternatives =
        Array.isArray(
          usePaths.alternativePaths
        )
          ? usePaths
              .alternativePaths
              .slice(
                0,
                options
                  .maximumAlternativeUsePaths
              )
              .map(
                path =>
                  createPublicUsePath(
                    path,
                    {
                      includeFactors:
                        false
                    }
                  )
              )
              .filter(
                Boolean
              )
          : [];

    }

    return result;

  }



  /*
    ============================================================
    PUBLIC EXPLANATION SHAPING
    ============================================================
  */


  function createPublicExplanationSummary(
    evaluation,
    options
  ) {

    const explanation =
      evaluation.explanation ||
      {};

    const result = {

      headline:
        sanitizePublicText(
          explanation.headline
        ),

      subheadline:
        sanitizePublicText(
          explanation.subheadline
        ),

      summary:
        sanitizePublicText(
          explanation.summary
        ),

      shortSummary:
        sanitizePublicText(
          explanation.shortSummary
        ),

      detailedSummary:
        sanitizePublicText(
          explanation.detailedSummary
        ),

      whyRecommended:
        createPublicMessageCollection(
          explanation.whyRecommended,
          options.maximumReasons
        ),

      compatibilityHighlights:
        createPublicMessageCollection(
          explanation
            .compatibilityHighlights,
          options.maximumReasons
        ),

      goalMatches:
        createPublicMessageCollection(
          explanation.goalMatches,
          options.maximumReasons
        ),

      usePathReasons:
        createPublicMessageCollection(
          explanation.usePathReasons,
          options.maximumReasons
        ),

      considerations:
        createPublicMessageCollection(
          explanation.considerations,
          options
            .maximumConsiderations
        )

    };

    if (
      options.includeRiskMitigations
    ) {

      result.riskMitigations =
        createPublicMessageCollection(
          explanation.riskMitigations,
          options.maximumMitigations
        );

    }

    if (
      options.includeConfidenceReasons
    ) {

      result.confidenceReasons =
        createPublicMessageCollection(
          explanation.confidenceReasons,
          options.maximumReasons
        );

    }

    if (
      options.includeUncertainties
    ) {

      result.uncertainties =
        createPublicMessageCollection(
          explanation.uncertainties,
          options.maximumUncertainties
        );

    }

    if (
      options.includeRejectedReasons
    ) {

      result.rejectedReasons =
        createPublicMessageCollection(
          explanation.rejectedReasons,
          options.maximumReasons
        );

    }

    if (
      options.includeWarnings
    ) {

      result.warnings =
        createPublicMessageCollection(
          explanation.warnings,
          options.maximumWarnings
        );

    }

    return result;

  }



  /*
    ============================================================
    PUBLIC RANKING SUMMARY
    ============================================================
  */


  function createPublicRankingSummary(
    evaluation
  ) {

    const final =
      evaluation.final ||
      {};

    return {

      rank:
        Number.isFinite(
          final.rank
        )
          ? final.rank
          : null,

      tieGroup:
        final.tieGroup ??
        null,

      tier:
        final.rankingTier ||
        "unranked",

      tierLabel:
        final.rankingTierLabel ||
        "Unranked",

      status:
        final.recommendationStatus ||
        "unscored",

      statusLabel:
        final.recommendationStatusLabel ||
        "Unscored",

      stable:
        Number.isFinite(
          final.stability
            ?.score
        )
          ? final.stability
              .score >= 70
          : null,

      stabilityScore:
        normalizePublicScore(
          final.stability
            ?.score
        ),

      nearestCompetitorMargin:
        Number.isFinite(
          final.stability
            ?.nearestCompetitorMargin
        )
          ? Math.round(
              final.stability
                .nearestCompetitorMargin *
              100
            ) / 100
          : null

    };

  }



  /*
    ============================================================
    RECOMMENDATION GROUP RESOLUTION
    ============================================================
  */


  function getPublicRecommendationGroup(
    evaluation
  ) {

    if (
      isCropEvaluationFailed(
        evaluation
      )
    ) {

      return PUBLIC_RECOMMENDATION_GROUPS
        .FAILED;

    }

    const status =
      evaluation.final
        ?.recommendationStatus;

    switch (
      status
    ) {

      case "top-recommendation":

        return PUBLIC_RECOMMENDATION_GROUPS
          .TOP;

      case "strong-recommendation":

        return PUBLIC_RECOMMENDATION_GROUPS
          .STRONG;

      case "conditional-recommendation":

        return PUBLIC_RECOMMENDATION_GROUPS
          .CONDITIONAL;

      case "low-priority":

        return PUBLIC_RECOMMENDATION_GROUPS
          .LOW_PRIORITY;

      case "not-recommended":

        return PUBLIC_RECOMMENDATION_GROUPS
          .NOT_RECOMMENDED;

      case "rejected":

      case "no-practical-use-path":

        return PUBLIC_RECOMMENDATION_GROUPS
          .REJECTED;

      default:

        return Number.isFinite(
          evaluation.final
            ?.rank
        )
          ? PUBLIC_RECOMMENDATION_GROUPS
              .LOW_PRIORITY
          : PUBLIC_RECOMMENDATION_GROUPS
              .UNRANKED;

    }

  }



  /*
    ============================================================
    PUBLIC RECOMMENDATION CARD
    ============================================================
  */


  function createPublicRecommendationCard(
    evaluation,
    options = {}
  ) {

    const normalizedOptions =
      normalizePublicResultOptions(
        options
      );

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {
      return null;
    }

    const identity =
      createPublicCropIdentity(
        evaluation
      );

    const explanation =
      evaluation.explanation ||
      {};

    const final =
      evaluation.final ||
      {};

    return {

      resultVersion:
        PUBLIC_RESULT_VERSION,

      resultType:
        PUBLIC_RESULT_TYPES
          .CARD,

      crop:
        identity,

      group:
        getPublicRecommendationGroup(
          evaluation
        ),

      rank:
        createPublicRankingSummary(
          evaluation
        ),

      scores:
        createPublicScoreSummary(
          evaluation,
          normalizedOptions
        ),

      eligible:
        getCropEligibilityState(
          evaluation
        ).eligible,

      bestUsePath: {

        id:
          final.bestUsePathId ||
          evaluation.usePaths
            ?.bestPath
            ?.id ||
          null,

        label:
          final.bestUsePathLabel ||
          evaluation.usePaths
            ?.bestPath
            ?.label ||
          null

      },

      headline:
        sanitizePublicText(
          explanation.headline
        ) ||
        final.recommendationStatusLabel ||
        identity.name,

      summary:
        sanitizePublicText(
          explanation.shortSummary
        ) ||
        sanitizePublicText(
          explanation.summary
        ),

      primaryReasons:
        createPublicMessageCollection(
          explanation.whyRecommended,
          normalizedOptions
            .maximumReasons
        ),

      primaryConsiderations:
        createPublicMessageCollection(
          explanation.considerations,
          normalizedOptions
            .maximumConsiderations
        ),

      flags:
        Array.isArray(
          final.flags
        )
          ? final.flags.filter(
              flag =>
                typeof flag ===
                  "string"
            )
          : []

    };

  }



  /*
    ============================================================
    PUBLIC RECOMMENDATION DETAIL
    ============================================================
  */


  function createPublicRecommendationDetail(
    evaluation,
    options = {}
  ) {

    const normalizedOptions =
      normalizePublicResultOptions(
        options
      );

    if (
      !evaluation ||
      typeof evaluation !==
        "object"
    ) {
      return null;
    }

    const result = {

      resultVersion:
        PUBLIC_RESULT_VERSION,

      resultType:
        PUBLIC_RESULT_TYPES
          .DETAIL,

      crop:
        createPublicCropIdentity(
          evaluation
        ),

      group:
        getPublicRecommendationGroup(
          evaluation
        ),

      rank:
        createPublicRankingSummary(
          evaluation
        ),

      scores:
        createPublicScoreSummary(
          evaluation,
          normalizedOptions
        ),

      eligibility:
        createPublicEligibilitySummary(
          evaluation,
          normalizedOptions
        ),

      usePath:
        createPublicUsePathSummary(
          evaluation,
          normalizedOptions
        ),

      explanation:
        createPublicExplanationSummary(
          evaluation,
          normalizedOptions
        ),

      flags:
        Array.isArray(
          evaluation.final
            ?.flags
        )
          ? [
              ...evaluation.final
                .flags
            ]
          : []

    };

    if (
      normalizedOptions
        .includeDiagnostics
    ) {

      result.diagnostics =
        createPublicCropDiagnostic(
          evaluation
        );

    }

    return result;

  }



  /*
    ============================================================
    GENERAL PUBLIC CROP RESULT
    ============================================================
  */


  function createPublicCropResult(
    evaluation,
    options = {}
  ) {

    const normalizedOptions =
      normalizePublicResultOptions(
        options
      );

    const resultType =
      options.resultType ||
      PUBLIC_RESULT_TYPES
        .DETAIL;

    if (
      resultType ===
        PUBLIC_RESULT_TYPES
          .CARD
    ) {

      return createPublicRecommendationCard(
        evaluation,
        normalizedOptions
      );

    }

    return createPublicRecommendationDetail(
      evaluation,
      normalizedOptions
    );

  }



  /*
    ============================================================
    CROP DIAGNOSTIC SHAPING
    ============================================================
  */


  function createPublicPhaseDiagnostic(
    phase
  ) {

    if (
      !phase ||
      typeof phase !==
        "object"
    ) {
      return null;
    }

    return {

      id:
        phase.id ||
        null,

      status:
        phase.status ||
        null,

      durationMs:
        Number.isFinite(
          phase.durationMs
        )
          ? phase.durationMs
          : null,

      warningCount:
        phase.warningCount ??
        0,

      errorCount:
        phase.errorCount ??
        0,

      skippedReason:
        sanitizePublicText(
          phase.skippedReason
        ),

      metadata:
        phase.metadata &&
        typeof phase.metadata ===
          "object"
          ? {
              ...phase.metadata
            }
          : {}

    };

  }



  function createPublicCropDiagnostic(
    evaluation
  ) {

    const pipeline =
      evaluation.pipeline ||
      {};

    const phases =
      pipeline.phases &&
      typeof pipeline.phases ===
        "object"
        ? Object.values(
            pipeline.phases
          )
            .map(
              createPublicPhaseDiagnostic
            )
            .filter(
              Boolean
            )
        : [];

    return {

      resultVersion:
        PUBLIC_RESULT_VERSION,

      resultType:
        PUBLIC_RESULT_TYPES
          .DIAGNOSTIC,

      cropId:
        getEvaluationCropId(
          evaluation
        ),

      status:
        getCropEvaluationStatus(
          evaluation
        ),

      durationMs:
        pipeline.durationMs ??
        null,

      warningCount:
        pipeline.warningCount ??
        0,

      errorCount:
        pipeline.errorCount ??
        0,

      completedPhases:
        Array.isArray(
          pipeline.completedPhases
        )
          ? [
              ...pipeline.completedPhases
            ]
          : [],

      skippedPhases:
        Array.isArray(
          pipeline.skippedPhases
        )
          ? [
              ...pipeline.skippedPhases
            ]
          : [],

      failedPhases:
        Array.isArray(
          pipeline.failedPhases
        )
          ? [
              ...pipeline.failedPhases
            ]
          : [],

      phases,

      errors:
        Array.isArray(
          evaluation.errors
        )
          ? evaluation.errors.map(
              error => ({
                phase:
                  error.phase ||
                  null,

                code:
                  error.code ||
                  null,

                message:
                  error.message ||
                  null,

                fatal:
                  error.fatal ===
                    true,

                recoverable:
                  error.recoverable !==
                    false
              })
            )
          : [],

      warnings:
        Array.isArray(
          evaluation.warnings
        )
          ? evaluation.warnings.map(
              warning => ({
                phase:
                  warning.phase ||
                  null,

                code:
                  warning.code ||
                  null,

                message:
                  warning.message ||
                  null,

                severity:
                  warning.severity ||
                  null
              })
            )
          : [],

      metadata: {

        collectionSourceIndex:
          evaluation.metadata
            ?.collectionSourceIndex ??
          null,

        collectionSourceKey:
          evaluation.metadata
            ?.collectionSourceKey ??
          null,

        explanationBuiltBeforeRanking:
          evaluation.metadata
            ?.explanationBuiltBeforeRanking ===
            true,

        explanationRebuiltAfterRanking:
          evaluation.metadata
            ?.explanationRebuiltAfterRanking ===
            true,

        collectionRankAssigned:
          evaluation.metadata
            ?.collectionRankAssigned ===
            true

      }

    };

  }



  /*
    ============================================================
    EVALUATION FILTER NORMALIZATION
    ============================================================
  */


  const DEFAULT_EVALUATION_FILTERS =
    Object.freeze({

      eligibleOnly:
        false,

      rankedOnly:
        false,

      excludeFailed:
        true,

      includeStatuses:
        null,

      excludeStatuses:
        null,

      includeGroups:
        null,

      excludeGroups:
        null,

      minimumSuitabilityScore:
        null,

      maximumSuitabilityScore:
        null,

      minimumConfidenceScore:
        null,

      maximumConfidenceScore:
        null,

      minimumRiskSafetyScore:
        null,

      maximumRiskSafetyScore:
        null,

      requiredGoalIds:
        null,

      requiredUsePathIds:
        null,

      searchText:
        null

    });



  function normalizeStringSet(
    values
  ) {

    if (
      typeof values ===
        "string"
    ) {

      return new Set([
        values
      ]);

    }

    if (
      !Array.isArray(
        values
      )
    ) {
      return null;
    }

    return new Set(
      values.filter(
        value =>
          typeof value ===
            "string"
      )
    );

  }



  function normalizeEvaluationFilters(
    filters
  ) {

    const supplied =
      filters &&
      typeof filters ===
        "object"
        ? filters
        : {};

    return {

      ...DEFAULT_EVALUATION_FILTERS,

      ...supplied,

      eligibleOnly:
        supplied.eligibleOnly ===
          true,

      rankedOnly:
        supplied.rankedOnly ===
          true,

      excludeFailed:
        supplied.excludeFailed !==
          false,

      includeStatuses:
        normalizeStringSet(
          supplied.includeStatuses
        ),

      excludeStatuses:
        normalizeStringSet(
          supplied.excludeStatuses
        ),

      includeGroups:
        normalizeStringSet(
          supplied.includeGroups
        ),

      excludeGroups:
        normalizeStringSet(
          supplied.excludeGroups
        ),

      requiredGoalIds:
        normalizeStringSet(
          supplied.requiredGoalIds
        ),

      requiredUsePathIds:
        normalizeStringSet(
          supplied.requiredUsePathIds
        ),

      searchText:
        typeof supplied.searchText ===
          "string"
          ? supplied.searchText
              .trim()
              .toLowerCase()
          : null

    };

  }



  /*
    ============================================================
    EVALUATION FILTER HELPERS
    ============================================================
  */


  function evaluationSupportsGoalId(
    evaluation,
    goalId
  ) {

    const goalResults =
      getGoalResultsForExplanation(
        evaluation
      );

    return goalResults.some(
      result => {

        const resultId =
          getGoalResultId(
            result
          );

        const resultScore =
          getGoalResultScore(
            result
          );

        return (
          resultId ===
            goalId &&
          Number.isFinite(
            resultScore
          ) &&
          resultScore >= 68
        );

      }
    );

  }



  function evaluationSupportsUsePathId(
    evaluation,
    usePathId
  ) {

    const eligiblePaths =
      evaluation.usePaths
        ?.eligiblePaths;

    if (
      !Array.isArray(
        eligiblePaths
      )
    ) {
      return false;
    }

    return eligiblePaths.some(
      path =>
        path?.id ===
          usePathId
    );

  }



  function evaluationMatchesSearchText(
    evaluation,
    searchText
  ) {

    if (
      !searchText
    ) {
      return true;
    }

    const identity =
      createPublicCropIdentity(
        evaluation
      );

    const searchableValues = [

      identity.id,

      identity.name,

      identity.commonName,

      identity.scientificName,

      identity.category,

      identity.lifecycle,

      evaluation.final
        ?.recommendationStatusLabel,

      evaluation.usePaths
        ?.bestPath
        ?.label

    ]
      .filter(
        value =>
          typeof value ===
            "string"
      )
      .join(
        " "
      )
      .toLowerCase();

    return searchableValues
      .includes(
        searchText
      );

  }



  function evaluationPassesScoreRange(
    value,
    minimum,
    maximum
  ) {

    if (
      Number.isFinite(
        minimum
      ) &&
      (
        !Number.isFinite(
          value
        ) ||
        value < minimum
      )
    ) {
      return false;
    }

    if (
      Number.isFinite(
        maximum
      ) &&
      (
        !Number.isFinite(
          value
        ) ||
        value > maximum
      )
    ) {
      return false;
    }

    return true;

  }



  /*
    ============================================================
    FILTER CROP EVALUATIONS
    ============================================================
  */


  function filterCropEvaluations(
    evaluations,
    filters = {}
  ) {

    if (
      !Array.isArray(
        evaluations
      )
    ) {
      return [];
    }

    const normalized =
      normalizeEvaluationFilters(
        filters
      );

    return evaluations.filter(
      evaluation => {

        if (
          !evaluation ||
          typeof evaluation !==
            "object"
        ) {
          return false;
        }

        if (
          normalized.excludeFailed &&
          isCropEvaluationFailed(
            evaluation
          )
        ) {
          return false;
        }

        const eligibility =
          getCropEligibilityState(
            evaluation
          );

        if (
          normalized.eligibleOnly &&
          !eligibility.eligible
        ) {
          return false;
        }

        if (
          normalized.rankedOnly &&
          !Number.isFinite(
            evaluation.final
              ?.rank
          )
        ) {
          return false;
        }

        const status =
          evaluation.final
            ?.recommendationStatus ||
          "unscored";

        if (
          normalized.includeStatuses &&
          !normalized.includeStatuses
            .has(
              status
            )
        ) {
          return false;
        }

        if (
          normalized.excludeStatuses &&
          normalized.excludeStatuses
            .has(
              status
            )
        ) {
          return false;
        }

        const group =
          getPublicRecommendationGroup(
            evaluation
          );

        if (
          normalized.includeGroups &&
          !normalized.includeGroups
            .has(
              group
            )
        ) {
          return false;
        }

        if (
          normalized.excludeGroups &&
          normalized.excludeGroups
            .has(
              group
            )
        ) {
          return false;
        }

        const suitabilityScore =
          evaluation.final
            ?.score ??
          evaluation.final
            ?.suitabilityScore;

        if (
          !evaluationPassesScoreRange(
            suitabilityScore,
            normalized
              .minimumSuitabilityScore,
            normalized
              .maximumSuitabilityScore
          )
        ) {
          return false;
        }

        const confidenceScore =
          evaluation.confidence
            ?.score;

        if (
          !evaluationPassesScoreRange(
            confidenceScore,
            normalized
              .minimumConfidenceScore,
            normalized
              .maximumConfidenceScore
          )
        ) {
          return false;
        }

        const riskSafetyScore =
          evaluation.risks
            ?.score;

        if (
          !evaluationPassesScoreRange(
            riskSafetyScore,
            normalized
              .minimumRiskSafetyScore,
            normalized
              .maximumRiskSafetyScore
          )
        ) {
          return false;
        }

        if (
          normalized.requiredGoalIds
        ) {

          const allGoalsSupported =
            Array.from(
              normalized.requiredGoalIds
            ).every(
              goalId =>
                evaluationSupportsGoalId(
                  evaluation,
                  goalId
                )
            );

          if (
            !allGoalsSupported
          ) {
            return false;
          }

        }

        if (
          normalized.requiredUsePathIds
        ) {

          const allUsePathsSupported =
            Array.from(
              normalized
                .requiredUsePathIds
            ).every(
              usePathId =>
                evaluationSupportsUsePathId(
                  evaluation,
                  usePathId
                )
            );

          if (
            !allUsePathsSupported
          ) {
            return false;
          }

        }

        if (
          !evaluationMatchesSearchText(
            evaluation,
            normalized.searchText
          )
        ) {
          return false;
        }

        return true;

      }
    );

  }



  /*
    ============================================================
    GROUP EVALUATIONS BY RECOMMENDATION
    ============================================================
  */


  function createEmptyRecommendationGroups()
  {

    return {

      top:
        [],

      strong:
        [],

      conditional:
        [],

      lowPriority:
        [],

      notRecommended:
        [],

      rejected:
        [],

      unranked:
        [],

      failed:
        []

    };

  }



  function groupCropEvaluationsByRecommendation(
    evaluations
  ) {

    const groups =
      createEmptyRecommendationGroups();

    if (
      !Array.isArray(
        evaluations
      )
    ) {
      return groups;
    }

    evaluations.forEach(
      evaluation => {

        const group =
          getPublicRecommendationGroup(
            evaluation
          );

        switch (
          group
        ) {

          case PUBLIC_RECOMMENDATION_GROUPS
            .TOP:

            groups.top.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .STRONG:

            groups.strong.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .CONDITIONAL:

            groups.conditional.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .LOW_PRIORITY:

            groups.lowPriority.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .NOT_RECOMMENDED:

            groups.notRecommended.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .REJECTED:

            groups.rejected.push(
              evaluation
            );

            break;

          case PUBLIC_RECOMMENDATION_GROUPS
            .FAILED:

            groups.failed.push(
              evaluation
            );

            break;

          default:

            groups.unranked.push(
              evaluation
            );

        }

      }
    );

    return groups;

  }



  /*
    ============================================================
    PUBLIC GROUP SHAPING
    ============================================================
  */


  function shapeRecommendationGroup(
    evaluations,
    options
  ) {

    return evaluations
      .map(
        evaluation =>
          createPublicRecommendationCard(
            evaluation,
            options
          )
      )
      .filter(
        Boolean
      );

  }



  function createPublicRecommendationGroups(
    evaluations,
    options
  ) {

    const groups =
      groupCropEvaluationsByRecommendation(
        evaluations
      );

    return {

      top:
        shapeRecommendationGroup(
          groups.top,
          options
        ),

      strong:
        shapeRecommendationGroup(
          groups.strong,
          options
        ),

      conditional:
        shapeRecommendationGroup(
          groups.conditional,
          options
        ),

      lowPriority:
        shapeRecommendationGroup(
          groups.lowPriority,
          options
        ),

      notRecommended:
        shapeRecommendationGroup(
          groups.notRecommended,
          options
        ),

      rejected:
        shapeRecommendationGroup(
          groups.rejected,
          options
        ),

      unranked:
        shapeRecommendationGroup(
          groups.unranked,
          options
        ),

      failed:
        shapeRecommendationGroup(
          groups.failed,
          options
        )

    };

  }



  /*
    ============================================================
    SCORE DISTRIBUTION
    ============================================================
  */


  const SCORE_DISTRIBUTION_BANDS =
    Object.freeze([

      {
        id:
          "90-100",

        label:
          "90–100",

        minimum:
          90,

        maximum:
          100
      },

      {
        id:
          "80-89",

        label:
          "80–89",

        minimum:
          80,

        maximum:
          89.999
      },

      {
        id:
          "70-79",

        label:
          "70–79",

        minimum:
          70,

        maximum:
          79.999
      },

      {
        id:
          "60-69",

        label:
          "60–69",

        minimum:
          60,

        maximum:
          69.999
      },

      {
        id:
          "50-59",

        label:
          "50–59",

        minimum:
          50,

        maximum:
          59.999
      },

      {
        id:
          "below-50",

        label:
          "Below 50",

        minimum:
          -Infinity,

        maximum:
          49.999
      },

      {
        id:
          "unscored",

        label:
          "Unscored",

        minimum:
          null,

        maximum:
          null
      }

    ]);



  function createScoreDistribution(
    evaluations,
    scoreAccessor
  ) {

    const distribution =
      SCORE_DISTRIBUTION_BANDS.map(
        band => ({

          id:
            band.id,

          label:
            band.label,

          count:
            0,

          cropIds:
            []

        })
      );

    if (
      !Array.isArray(
        evaluations
      )
    ) {
      return distribution;
    }

    evaluations.forEach(
      evaluation => {

        const score =
          typeof scoreAccessor ===
            "function"
            ? scoreAccessor(
                evaluation
              )
            : null;

        let matchingBand;

        if (
          !Number.isFinite(
            score
          )
        ) {

          matchingBand =
            distribution.find(
              band =>
                band.id ===
                  "unscored"
            );

        } else {

          const bandDefinition =
            SCORE_DISTRIBUTION_BANDS
              .find(
                band =>
                  band.minimum !==
                    null &&
                  score >=
                    band.minimum &&
                  score <=
                    band.maximum
              );

          matchingBand =
            distribution.find(
              band =>
                band.id ===
                  bandDefinition
                    ?.id
            );

        }

        if (
          matchingBand
        ) {

          matchingBand.count +=
            1;

          const cropId =
            getEvaluationCropId(
              evaluation
            );

          if (
            cropId
          ) {

            matchingBand.cropIds.push(
              cropId
            );

          }

        }

      }
    );

    return distribution;

  }



  /*
    ============================================================
    NUMERIC STATISTICS
    ============================================================
  */


  function calculateNumericStatistics(
    values
  ) {

    const knownValues =
      Array.isArray(
        values
      )
        ? values.filter(
            Number.isFinite
          )
        : [];

    if (
      knownValues.length ===
        0
    ) {

      return {

        count:
          0,

        minimum:
          null,

        maximum:
          null,

        average:
          null,

        median:
          null,

        standardDeviation:
          null

      };

    }

    const sortedValues =
      knownValues
        .slice()
        .sort(
          (
            first,
            second
          ) =>
            first -
            second
        );

    const average =
      averageKnownValues(
        sortedValues
      );

    const midpoint =
      Math.floor(
        sortedValues.length /
        2
      );

    const median =
      sortedValues.length %
        2 ===
        0
        ? (
            sortedValues[
              midpoint -
              1
            ] +
            sortedValues[
              midpoint
            ]
          ) / 2
        : sortedValues[
            midpoint
          ];

    const variance =
      sortedValues.reduce(
        (
          total,
          value
        ) =>
          total +
          Math.pow(
            value -
            average,
            2
          ),
        0
      ) /
      sortedValues.length;

    return {

      count:
        sortedValues.length,

      minimum:
        roundScore(
          sortedValues[0]
        ),

      maximum:
        roundScore(
          sortedValues[
            sortedValues.length -
            1
          ]
        ),

      average:
        roundScore(
          average
        ),

      median:
        roundScore(
          median
        ),

      standardDeviation:
        roundScore(
          Math.sqrt(
            variance
          )
        )

    };

  }



  /*
    ============================================================
    STATUS COUNTS
    ============================================================
  */


  function countEvaluationsByStatus(
    evaluations
  ) {

    const counts = {};

    evaluations.forEach(
      evaluation => {

        const status =
          evaluation.final
            ?.recommendationStatus ||
          "unscored";

        counts[
          status
        ] =
          (
            counts[
              status
            ] ||
            0
          ) +
          1;

      }
    );

    return counts;

  }



  function countEvaluationsByConfidenceLevel(
    evaluations
  ) {

    const counts = {};

    evaluations.forEach(
      evaluation => {

        const level =
          evaluation.confidence
            ?.level ||
          "unknown";

        counts[
          level
        ] =
          (
            counts[
              level
            ] ||
            0
          ) +
          1;

      }
    );

    return counts;

  }



  function countBestUsePaths(
    evaluations
  ) {

    const counts = {};

    evaluations.forEach(
      evaluation => {

        const pathId =
          evaluation.usePaths
            ?.bestPath
            ?.id;

        if (
          !pathId
        ) {
          return;
        }

        counts[
          pathId
        ] =
          (
            counts[
              pathId
            ] ||
            0
          ) +
          1;

      }
    );

    return counts;

  }



  /*
    ============================================================
    PLANNER RESULT STATISTICS
    ============================================================
  */


  function createPlannerResultStatistics(
    evaluations
  ) {

    const safeEvaluations =
      Array.isArray(
        evaluations
      )
        ? evaluations.filter(
            evaluation =>
              evaluation &&
              typeof evaluation ===
                "object"
          )
        : [];

    const rankedEvaluations =
      safeEvaluations.filter(
        evaluation =>
          Number.isFinite(
            evaluation.final
              ?.rank
          )
      );

    const eligibleEvaluations =
      safeEvaluations.filter(
        evaluation =>
          getCropEligibilityState(
            evaluation
          ).eligible
      );

    const rejectedEvaluations =
      safeEvaluations.filter(
        evaluation =>
          !getCropEligibilityState(
            evaluation
          ).eligible
      );

    const failedEvaluations =
      safeEvaluations.filter(
        isCropEvaluationFailed
      );

    const suitabilityValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.final
            ?.score ??
          evaluation.final
            ?.suitabilityScore
      );

    const compatibilityValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.compatibility
            ?.score
      );

    const goalValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.goals
            ?.score
      );

    const usePathValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.usePaths
            ?.score
      );

    const riskValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.risks
            ?.score
      );

    const confidenceValues =
      safeEvaluations.map(
        evaluation =>
          evaluation.confidence
            ?.score
      );

    return {

      totalCount:
        safeEvaluations.length,

      rankedCount:
        rankedEvaluations.length,

      eligibleCount:
        eligibleEvaluations.length,

      rejectedCount:
        rejectedEvaluations.length,

      failedCount:
        failedEvaluations.length,

      unrankedCount:
        safeEvaluations.length -
        rankedEvaluations.length,

      recommendationStatusCounts:
        countEvaluationsByStatus(
          safeEvaluations
        ),

      confidenceLevelCounts:
        countEvaluationsByConfidenceLevel(
          safeEvaluations
        ),

      bestUsePathCounts:
        countBestUsePaths(
          safeEvaluations
        ),

      scores: {

        suitability:
          calculateNumericStatistics(
            suitabilityValues
          ),

        compatibility:
          calculateNumericStatistics(
            compatibilityValues
          ),

        goals:
          calculateNumericStatistics(
            goalValues
          ),

        usePaths:
          calculateNumericStatistics(
            usePathValues
          ),

        riskSafety:
          calculateNumericStatistics(
            riskValues
          ),

        confidence:
          calculateNumericStatistics(
            confidenceValues
          )

      },

      distributions: {

        suitability:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.final
                ?.score ??
              evaluation.final
                ?.suitabilityScore
          ),

        compatibility:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.compatibility
                ?.score
          ),

        goals:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.goals
                ?.score
          ),

        usePaths:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.usePaths
                ?.score
          ),

        riskSafety:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.risks
                ?.score
          ),

        confidence:
          createScoreDistribution(
            safeEvaluations,
            evaluation =>
              evaluation.confidence
                ?.score
          )

      }

    };

  }



  /*
    ============================================================
    TOP RECOMMENDATION HELPERS
    ============================================================
  */


  function getTopPublicRecommendations(
    evaluations,
    limit = 5,
    options = {}
  ) {

    const normalizedLimit =
      normalizePublicResultLimit(
        limit,
        5
      );

    return filterCropEvaluations(
      evaluations,
      {
        rankedOnly:
          true,

        excludeFailed:
          true,

        excludeStatuses: [

          "rejected",

          "no-practical-use-path",

          "not-recommended",

          "insufficient-data"

        ]

      }
    )
      .slice(
        0,
        normalizedLimit
      )
      .map(
        evaluation =>
          createPublicRecommendationCard(
            evaluation,
            options
          )
      )
      .filter(
        Boolean
      );

  }



  function getBestCropForGoal(
    evaluations,
    goalId
  ) {

    if (
      !goalId
    ) {
      return null;
    }

    const matching =
      evaluations
        .filter(
          evaluation =>
            evaluationSupportsGoalId(
              evaluation,
              goalId
            )
        )
        .slice()
        .sort(
          compareCropEvaluations
        );

    return matching[0] ||
      null;

  }



  function getBestCropForUsePath(
    evaluations,
    usePathId
  ) {

    if (
      !usePathId
    ) {
      return null;
    }

    const matching =
      evaluations
        .filter(
          evaluation =>
            evaluationSupportsUsePathId(
              evaluation,
              usePathId
            )
        )
        .slice()
        .sort(
          compareCropEvaluations
        );

    return matching[0] ||
      null;

  }



  /*
    ============================================================
    COLLECTION DIAGNOSTICS
    ============================================================
  */


  function createCollectionDiagnosticSummary(
    result
  ) {

    if (
      !result ||
      typeof result !==
        "object"
    ) {
      return null;
    }

    const evaluations =
      getAllCropEvaluations(
        result
      );

    const failedEvaluations =
      evaluations.filter(
        isCropEvaluationFailed
      );

    const warningEvaluations =
      evaluations.filter(
        hasCropEvaluationWarnings
      );

    const phaseFailureCounts = {};

    evaluations.forEach(
      evaluation => {

        const failedPhases =
          evaluation.pipeline
            ?.failedPhases;

        if (
          !Array.isArray(
            failedPhases
          )
        ) {
          return;
        }

        failedPhases.forEach(
          phaseId => {

            phaseFailureCounts[
              phaseId
            ] =
              (
                phaseFailureCounts[
                  phaseId
                ] ||
                0
              ) +
              1;

          }
        );

      }
    );

    return {

      status:
        getCollectionEvaluationStatus(
          result
        ),

      collection:
        createCollectionPipelineSummary(
          result
        ),

      failedCropIds:
        failedEvaluations
          .map(
            evaluation =>
              getEvaluationCropId(
                evaluation
              )
          )
          .filter(
            Boolean
          ),

      warningCropIds:
        warningEvaluations
          .map(
            evaluation =>
              getEvaluationCropId(
                evaluation
              )
          )
          .filter(
            Boolean
          ),

      phaseFailureCounts,

      collectionErrors:
        Array.isArray(
          result.errors
        )
          ? result.errors.map(
              error => ({
                code:
                  error.code ||
                  null,

                message:
                  error.message ||
                  null,

                fatal:
                  error.fatal ===
                    true
              })
            )
          : [],

      collectionWarnings:
        Array.isArray(
          result.warnings
        )
          ? result.warnings.map(
              warning => ({
                code:
                  warning.code ||
                  null,

                message:
                  warning.message ||
                  null,

                cropId:
                  warning.cropId ||
                  null
              })
            )
          : []

    };

  }



  /*
    ============================================================
    PUBLIC COLLECTION RESULT FILTERING
    ============================================================
  */


  function shouldIncludeEvaluationInPublicResult(
    evaluation,
    options
  ) {

    if (
      isCropEvaluationFailed(
        evaluation
      ) &&
      !options.includeFailedResults
    ) {
      return false;
    }

    const group =
      getPublicRecommendationGroup(
        evaluation
      );

    if (
      group ===
        PUBLIC_RECOMMENDATION_GROUPS
          .REJECTED &&
      !options.includeRejectedResults
    ) {
      return false;
    }

    if (
      group ===
        PUBLIC_RECOMMENDATION_GROUPS
          .UNRANKED &&
      !options.includeUnrankedResults
    ) {
      return false;
    }

    return true;

  }



  /*
    ============================================================
    PUBLIC COLLECTION RESULT
    ============================================================
  */


  function createPublicCollectionResult(
    collectionResult,
    options = {}
  ) {

    const normalizedOptions =
      normalizePublicResultOptions(
        options
      );

    if (
      !collectionResult ||
      typeof collectionResult !==
        "object"
    ) {

      return {

        resultVersion:
          PUBLIC_RESULT_VERSION,

        resultType:
          PUBLIC_RESULT_TYPES
            .COLLECTION,

        status:
          "failed",

        recommendations:
          [],

        groups:
          createEmptyRecommendationGroups(),

        statistics:
          createPlannerResultStatistics(
            []
          ),

        errors: [
          {
            code:
              "INVALID_COLLECTION_RESULT",

            message:
              "A valid collection evaluation result was not provided."
          }
        ]

      };

    }

    const allEvaluations =
      getAllCropEvaluations(
        collectionResult
      );

    const includedEvaluations =
      allEvaluations.filter(
        evaluation =>
          shouldIncludeEvaluationInPublicResult(
            evaluation,
            normalizedOptions
          )
      );

    const rankedEvaluations =
      includedEvaluations.filter(
        evaluation =>
          Number.isFinite(
            evaluation.final
              ?.rank
          )
      );

    const unrankedEvaluations =
      includedEvaluations.filter(
        evaluation =>
          !Number.isFinite(
            evaluation.final
              ?.rank
          )
      );

    const recommendationCards =
      rankedEvaluations.map(
        evaluation =>
          createPublicRecommendationCard(
            evaluation,
            normalizedOptions
          )
      )
      .filter(
        Boolean
      );

    const unrankedCards =
      unrankedEvaluations.map(
        evaluation =>
          createPublicRecommendationCard(
            evaluation,
            normalizedOptions
          )
      )
      .filter(
        Boolean
      );

    const publicResult = {

      resultVersion:
        PUBLIC_RESULT_VERSION,

      resultType:
        PUBLIC_RESULT_TYPES
          .COLLECTION,

      status:
        getCollectionEvaluationStatus(
          collectionResult
        ),

      summary:
        createCollectionPipelineSummary(
          collectionResult
        ),

      recommendations:
        recommendationCards,

      unranked:
        unrankedCards,

      topRecommendations:
        getTopPublicRecommendations(
          rankedEvaluations,
          normalizedOptions
            .topRecommendationLimit,
          normalizedOptions
        ),

      groups:
        createPublicRecommendationGroups(
          includedEvaluations,
          normalizedOptions
        ),

      statistics:
        createPlannerResultStatistics(
          includedEvaluations
        ),

      rankingSummary:
        collectionResult.rankingSummary ||
        null,

      warnings:
        normalizedOptions
          .includeWarnings
          ? (
              Array.isArray(
                collectionResult
                  .warnings
              )
                ? collectionResult
                    .warnings
                    .slice(
                      0,
                      normalizedOptions
                        .maximumWarnings
                    )
                    .map(
                      warning => ({
                        code:
                          warning.code ||
                          null,

                        message:
                          sanitizePublicText(
                            warning.message
                          ),

                        cropId:
                          warning.cropId ||
                          null,

                        severity:
                          warning.severity ||
                          null
                      })
                    )
                : []
            )
          : [],

      errors:
        Array.isArray(
          collectionResult.errors
        )
          ? collectionResult.errors.map(
              error => ({
                code:
                  error.code ||
                  null,

                message:
                  sanitizePublicText(
                    error.message
                  ),

                fatal:
                  error.fatal ===
                    true
              })
            )
          : [],

      metadata: {

        generatedAt:
          new Date()
            .toISOString(),

        collectionPipelineVersion:
          collectionResult.metadata
            ?.collectionPipelineVersion ||
          COLLECTION_PIPELINE_VERSION,

        engineVersion:
          collectionResult.pipeline
            ?.engineVersion ||
          ENGINE_PIPELINE_VERSION,

        rankApplied:
          collectionResult.pipeline
            ?.rankApplied ===
            true,

        explanationsRebuilt:
          collectionResult.pipeline
            ?.explanationsRebuilt ===
            true

      }

    };

    if (
      normalizedOptions
        .includeSourceOrder
    ) {

      publicResult.sourceOrder =
        Array.isArray(
          collectionResult
            .sourceOrderEvaluations
        )
          ? collectionResult
              .sourceOrderEvaluations
              .filter(
                evaluation =>
                  shouldIncludeEvaluationInPublicResult(
                    evaluation,
                    normalizedOptions
                  )
              )
              .map(
                evaluation =>
                  createPublicRecommendationCard(
                    evaluation,
                    normalizedOptions
                  )
              )
              .filter(
                Boolean
              )
          : [];

    }

    if (
      normalizedOptions
        .includeDiagnostics
    ) {

      publicResult.diagnostics =
        createCollectionDiagnosticSummary(
          collectionResult
        );

    }

    return publicResult;

  }



  /*
    ============================================================
    PUBLIC RESULT LOOKUP
    ============================================================
  */


  function findPublicCropResultById(
    publicCollectionResult,
    cropId
  ) {

    if (
      !publicCollectionResult ||
      !cropId
    ) {
      return null;
    }

    const possibleCollections = [

      publicCollectionResult
        .recommendations,

      publicCollectionResult
        .unranked,

      publicCollectionResult
        .sourceOrder

    ];

    for (
      const collection
      of possibleCollections
    ) {

      if (
        !Array.isArray(
          collection
        )
      ) {
        continue;
      }

      const match =
        collection.find(
          result =>
            result.crop
              ?.id ===
              cropId
        );

      if (
        match
      ) {
        return match;
      }

    }

    return null;

  }



  /*
    ============================================================
    DETAILED RESULT LOOKUP FROM INTERNAL COLLECTION
    ============================================================
  */


  function createPublicCropDetailById(
    collectionResult,
    cropId,
    options = {}
  ) {

    const evaluation =
      findCropEvaluationById(
        collectionResult,
        cropId
      );

    if (
      !evaluation
    ) {
      return null;
    }

    return createPublicRecommendationDetail(
      evaluation,
      options
    );

  }



  /*
    ============================================================
    PUBLIC RESULT VALIDATION
    ============================================================
  */


  function validatePublicCropResult(
    result
  ) {

    const errors = [];

    if (
      !result ||
      typeof result !==
        "object"
    ) {

      errors.push(
        "Public crop result is not an object."
      );

      return {

        valid:
          false,

        errors

      };

    }

    if (
      !result.crop ||
      typeof result.crop !==
        "object"
    ) {

      errors.push(
        "Public crop result is missing crop identity."
      );

    }

    if (
      !result.crop
        ?.id
    ) {

      errors.push(
        "Public crop result is missing crop ID."
      );

    }

    if (
      !result.rank ||
      typeof result.rank !==
        "object"
    ) {

      errors.push(
        "Public crop result is missing ranking information."
      );

    }

    if (
      !result.scores ||
      typeof result.scores !==
        "object"
    ) {

      errors.push(
        "Public crop result is missing score information."
      );

    }

    return {

      valid:
        errors.length ===
          0,

      errors

    };

  }



  function validatePublicCollectionResult(
    result
  ) {

    const errors = [];

    if (
      !result ||
      typeof result !==
        "object"
    ) {

      errors.push(
        "Public collection result is not an object."
      );

      return {

        valid:
          false,

        errors

      };

    }

    if (
      !Array.isArray(
        result.recommendations
      )
    ) {

      errors.push(
        "Public collection result is missing recommendations."
      );

    }

    if (
      !result.statistics ||
      typeof result.statistics !==
        "object"
    ) {

      errors.push(
        "Public collection result is missing statistics."
      );

    }

    if (
      result.resultVersion !==
        PUBLIC_RESULT_VERSION
    ) {

      errors.push(
        `Public result version does not match ${PUBLIC_RESULT_VERSION}.`
      );

    }

    return {

      valid:
        errors.length ===
          0,

      errors

    };

  }

   /*
    ============================================================
    PART 13
    FINAL ENGINE INTEGRATION

    PART 13D
    PUBLIC API REGISTRATION, HEALTH CHECKS, AND MODULE CLOSURE

    This final section:

    - Creates the public engine API
    - Registers available engine functions
    - Preserves useful compatibility aliases
    - Exposes engine metadata and capabilities
    - Provides initialization and health checks
    - Closes the engine IIFE
    ============================================================
  */


  /*
    ============================================================
    FINAL API VERSION
    ============================================================
  */


  const FINAL_ENGINE_API_VERSION =
    "2.0.0";



  /*
    ============================================================
    VERSION RESOLUTION
    ============================================================
  */


  function resolveRegisteredEngineVersion()
  {

    if (
      typeof ENGINE_VERSION ===
        "string"
    ) {

      return ENGINE_VERSION;

    }

    if (
      typeof ENGINE_PIPELINE_VERSION ===
        "string"
    ) {

      return ENGINE_PIPELINE_VERSION;

    }

    return FINAL_ENGINE_API_VERSION;

  }



  /*
    ============================================================
    CONDITIONAL API REGISTRATION

    Optional functions are added only when they exist. This keeps
    one missing nonessential helper from preventing the complete
    engine file from loading.
    ============================================================
  */


  function registerEngineApiFunction(
    api,
    name,
    candidate
  ) {

    if (
      !api ||
      typeof api !==
        "object"
    ) {
      return false;
    }

    if (
      typeof name !==
        "string" ||
      !name
    ) {
      return false;
    }

    if (
      typeof candidate !==
        "function"
    ) {
      return false;
    }

    api[
      name
    ] =
      candidate;

    return true;

  }



  /*
    ============================================================
    PUBLIC ENGINE API OBJECT
    ============================================================
  */


  const engineApi = {

    version:
      resolveRegisteredEngineVersion(),

    apiVersion:
      FINAL_ENGINE_API_VERSION,

    publicResultVersion:
      typeof PUBLIC_RESULT_VERSION ===
        "string"
        ? PUBLIC_RESULT_VERSION
        : null,

    collectionPipelineVersion:
      typeof COLLECTION_PIPELINE_VERSION ===
        "string"
        ? COLLECTION_PIPELINE_VERSION
        : null,

    initialized:
      false,

    initializedAt:
      null,

    metadata: {

      name:
        "Backyard Chicken Planner Feed Crop Recommendation Engine",

      description:
        "Evaluates, scores, ranks, and explains feed-crop recommendations from questionnaire answers.",

      architecture:
        "phase-based recommendation pipeline",

      schemaVersion:
        "2.0.0",

      apiVersion:
        FINAL_ENGINE_API_VERSION

    },

    capabilities: {

      singleCropEvaluation:
        false,

      collectionEvaluation:
        false,

      eligibilityEvaluation:
        false,

      compatibilityEvaluation:
        false,

      goalEvaluation:
        false,

      usePathEvaluation:
        false,

      riskEvaluation:
        false,

      confidenceEvaluation:
        false,

      finalScoring:
        false,

      ranking:
        false,

      explanationGeneration:
        false,

      publicResultShaping:
        false,

      filtering:
        false,

      statistics:
        false,

      diagnostics:
        false

    }

  };



  /*
    ============================================================
    SINGLE-CROP PIPELINE EXPORTS
    ============================================================
  */


  if (
    typeof evaluateCrop ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateCrop",
      evaluateCrop
    );

    engineApi.capabilities
      .singleCropEvaluation =
        true;

  }


  if (
    typeof evaluateCropSafely ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateCropSafely",
      evaluateCropSafely
    );

  }


  if (
    typeof evaluateCropStrictly ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateCropStrictly",
      evaluateCropStrictly
    );

  }


  if (
    typeof runSingleCropEvaluationPipeline ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "runSingleCropEvaluationPipeline",
      runSingleCropEvaluationPipeline
    );

  }


  if (
    typeof createSingleCropPipelineSummary ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createSingleCropPipelineSummary",
      createSingleCropPipelineSummary
    );

  }


  if (
    typeof getCropEvaluationStatus ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getCropEvaluationStatus",
      getCropEvaluationStatus
    );

  }


  if (
    typeof isCropEvaluationComplete ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "isCropEvaluationComplete",
      isCropEvaluationComplete
    );

  }


  if (
    typeof isCropEvaluationFailed ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "isCropEvaluationFailed",
      isCropEvaluationFailed
    );

  }


  if (
    typeof hasCropEvaluationWarnings ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "hasCropEvaluationWarnings",
      hasCropEvaluationWarnings
    );

  }



  /*
    ============================================================
    COLLECTION PIPELINE EXPORTS
    ============================================================
  */


  if (
    typeof evaluateAllCrops ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateAllCrops",
      evaluateAllCrops
    );

    engineApi.capabilities
      .collectionEvaluation =
        true;

  }


  if (
    typeof evaluateAllCropsStrictly ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateAllCropsStrictly",
      evaluateAllCropsStrictly
    );

  }


  if (
    typeof runCollectionEvaluationPipeline ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "runCollectionEvaluationPipeline",
      runCollectionEvaluationPipeline
    );

  }


  if (
    typeof createCollectionPipelineSummary ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createCollectionPipelineSummary",
      createCollectionPipelineSummary
    );

  }


  if (
    typeof getCollectionEvaluationStatus ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getCollectionEvaluationStatus",
      getCollectionEvaluationStatus
    );

  }


  if (
    typeof isCollectionEvaluationComplete ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "isCollectionEvaluationComplete",
      isCollectionEvaluationComplete
    );

  }


  if (
    typeof isCollectionEvaluationFailed ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "isCollectionEvaluationFailed",
      isCollectionEvaluationFailed
    );

  }


  if (
    typeof hasCollectionEvaluationWarnings ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "hasCollectionEvaluationWarnings",
      hasCollectionEvaluationWarnings
    );

  }


  if (
    typeof getRankedCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getRankedCropEvaluations",
      getRankedCropEvaluations
    );

  }


  if (
    typeof getUnrankedCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getUnrankedCropEvaluations",
      getUnrankedCropEvaluations
    );

  }


  if (
    typeof getAllCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getAllCropEvaluations",
      getAllCropEvaluations
    );

  }


  if (
    typeof findCropEvaluationById ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "findCropEvaluationById",
      findCropEvaluationById
    );

  }


  if (
    typeof getTopRankedCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getTopRankedCropEvaluations",
      getTopRankedCropEvaluations
    );

  }



  /*
    ============================================================
    PHASE CAPABILITY REGISTRATION
    ============================================================
  */


  if (
    typeof evaluateEligibility ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateEligibility",
      evaluateEligibility
    );

    engineApi.capabilities
      .eligibilityEvaluation =
        true;

  }


  if (
    typeof evaluateCompatibility ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateCompatibility",
      evaluateCompatibility
    );

    engineApi.capabilities
      .compatibilityEvaluation =
        true;

  }


  if (
    typeof evaluateGoals ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateGoals",
      evaluateGoals
    );

    engineApi.capabilities
      .goalEvaluation =
        true;

  }


  if (
    typeof evaluateGoalAlignment ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateGoalAlignment",
      evaluateGoalAlignment
    );

    engineApi.capabilities
      .goalEvaluation =
        true;

  }


  if (
    typeof evaluateUsePaths ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateUsePaths",
      evaluateUsePaths
    );

    engineApi.capabilities
      .usePathEvaluation =
        true;

  }


  if (
    typeof evaluateRisks ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateRisks",
      evaluateRisks
    );

    engineApi.capabilities
      .riskEvaluation =
        true;

  }


  if (
    typeof evaluateRiskProfile ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateRiskProfile",
      evaluateRiskProfile
    );

    engineApi.capabilities
      .riskEvaluation =
        true;

  }


  if (
    typeof evaluateConfidence ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "evaluateConfidence",
      evaluateConfidence
    );

    engineApi.capabilities
      .confidenceEvaluation =
        true;

  }


  if (
    typeof calculateFinalScore ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "calculateFinalScore",
      calculateFinalScore
    );

    engineApi.capabilities
      .finalScoring =
        true;

  }


  if (
    typeof createFinalCropScore ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createFinalCropScore",
      createFinalCropScore
    );

    engineApi.capabilities
      .finalScoring =
        true;

  }



  /*
    ============================================================
    RANKING EXPORTS
    ============================================================
  */


  if (
    typeof rankCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "rankCropEvaluations",
      rankCropEvaluations
    );

    engineApi.capabilities
      .ranking =
        true;

  }


  if (
    typeof compareCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "compareCropEvaluations",
      compareCropEvaluations
    );

  }


  if (
    typeof createRankingSummary ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createRankingSummary",
      createRankingSummary
    );

  }



  /*
    ============================================================
    EXPLANATION EXPORTS
    ============================================================
  */


  if (
    typeof createRecommendationExplanation ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createRecommendationExplanation",
      createRecommendationExplanation
    );

    engineApi.capabilities
      .explanationGeneration =
        true;

  }


  if (
    typeof buildRecommendationExplanation ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "buildRecommendationExplanation",
      buildRecommendationExplanation
    );

    engineApi.capabilities
      .explanationGeneration =
        true;

  }


  if (
    typeof rebuildRecommendationExplanation ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "rebuildRecommendationExplanation",
      rebuildRecommendationExplanation
    );

    engineApi.capabilities
      .explanationGeneration =
        true;

  }



  /*
    ============================================================
    PUBLIC RESULT EXPORTS
    ============================================================
  */


  if (
    typeof createPublicCropResult ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicCropResult",
      createPublicCropResult
    );

    engineApi.capabilities
      .publicResultShaping =
        true;

  }


  if (
    typeof createPublicRecommendationCard ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicRecommendationCard",
      createPublicRecommendationCard
    );

    engineApi.capabilities
      .publicResultShaping =
        true;

  }


  if (
    typeof createPublicRecommendationDetail ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicRecommendationDetail",
      createPublicRecommendationDetail
    );

    engineApi.capabilities
      .publicResultShaping =
        true;

  }


  if (
    typeof createPublicCollectionResult ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicCollectionResult",
      createPublicCollectionResult
    );

    engineApi.capabilities
      .publicResultShaping =
        true;

  }


  if (
    typeof createPublicCropDetailById ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicCropDetailById",
      createPublicCropDetailById
    );

  }


  if (
    typeof findPublicCropResultById ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "findPublicCropResultById",
      findPublicCropResultById
    );

  }


  if (
    typeof validatePublicCropResult ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "validatePublicCropResult",
      validatePublicCropResult
    );

  }


  if (
    typeof validatePublicCollectionResult ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "validatePublicCollectionResult",
      validatePublicCollectionResult
    );

  }



  /*
    ============================================================
    FILTERING AND GROUPING EXPORTS
    ============================================================
  */


  if (
    typeof filterCropEvaluations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "filterCropEvaluations",
      filterCropEvaluations
    );

    engineApi.capabilities
      .filtering =
        true;

  }


  if (
    typeof groupCropEvaluationsByRecommendation ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "groupCropEvaluationsByRecommendation",
      groupCropEvaluationsByRecommendation
    );

    engineApi.capabilities
      .filtering =
        true;

  }


  if (
    typeof getTopPublicRecommendations ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getTopPublicRecommendations",
      getTopPublicRecommendations
    );

  }


  if (
    typeof getBestCropForGoal ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getBestCropForGoal",
      getBestCropForGoal
    );

  }


  if (
    typeof getBestCropForUsePath ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "getBestCropForUsePath",
      getBestCropForUsePath
    );

  }



  /*
    ============================================================
    STATISTICS AND DIAGNOSTIC EXPORTS
    ============================================================
  */


  if (
    typeof createPlannerResultStatistics ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPlannerResultStatistics",
      createPlannerResultStatistics
    );

    engineApi.capabilities
      .statistics =
        true;

  }


  if (
    typeof createScoreDistribution ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createScoreDistribution",
      createScoreDistribution
    );

  }


  if (
    typeof calculateNumericStatistics ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "calculateNumericStatistics",
      calculateNumericStatistics
    );

  }


  if (
    typeof createPublicCropDiagnostic ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createPublicCropDiagnostic",
      createPublicCropDiagnostic
    );

    engineApi.capabilities
      .diagnostics =
        true;

  }


  if (
    typeof createCollectionDiagnosticSummary ===
      "function"
  ) {

    registerEngineApiFunction(
      engineApi,
      "createCollectionDiagnosticSummary",
      createCollectionDiagnosticSummary
    );

    engineApi.capabilities
      .diagnostics =
        true;

  }



  /*
    ============================================================
    ENGINE HEALTH CHECK
    ============================================================
  */


  function getEngineHealth()
  {

    const requiredFunctions = [

      "evaluateCrop",

      "evaluateCropSafely",

      "evaluateAllCrops",

      "rankCropEvaluations",

      "createPublicRecommendationCard",

      "createPublicRecommendationDetail",

      "createPublicCollectionResult"

    ];


    const optionalFunctions = [

      "evaluateCropStrictly",

      "evaluateAllCropsStrictly",

      "filterCropEvaluations",

      "createPlannerResultStatistics",

      "createCollectionDiagnosticSummary",

      "validatePublicCropResult",

      "validatePublicCollectionResult"

    ];


    const missingRequiredFunctions =
      requiredFunctions.filter(
        functionName =>
          typeof engineApi[
            functionName
          ] !==
            "function"
      );


    const missingOptionalFunctions =
      optionalFunctions.filter(
        functionName =>
          typeof engineApi[
            functionName
          ] !==
            "function"
      );


    const registeredFunctionNames =
      Object.keys(
        engineApi
      ).filter(
        key =>
          typeof engineApi[
            key
          ] ===
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
          ? (
              missingOptionalFunctions
                .length ===
                0
                ? "ready"
                : "ready-with-optional-gaps"
            )
          : "incomplete",

      engineVersion:
        engineApi.version,

      apiVersion:
        engineApi.apiVersion,

      initialized:
        engineApi.initialized,

      initializedAt:
        engineApi.initializedAt,

      registeredFunctionCount:
        registeredFunctionNames
          .length,

      registeredFunctions:
        registeredFunctionNames,

      missingRequiredFunctions,

      missingOptionalFunctions,

      capabilities: {

        ...engineApi.capabilities

      }

    };

  }


  registerEngineApiFunction(
    engineApi,
    "getEngineHealth",
    getEngineHealth
  );



  /*
    ============================================================
    ENGINE CAPABILITY CHECK
    ============================================================
  */


  function hasEngineCapability(
    capabilityName
  ) {

    if (
      typeof capabilityName !==
        "string" ||
      !capabilityName
    ) {
      return false;
    }

    return engineApi
      .capabilities[
        capabilityName
      ] ===
      true;

  }


  registerEngineApiFunction(
    engineApi,
    "hasEngineCapability",
    hasEngineCapability
  );



  /*
    ============================================================
    ENGINE INITIALIZATION
    ============================================================
  */


  function initializeEngine()
  {

    if (
      engineApi.initialized
    ) {

      return getEngineHealth();

    }

    engineApi.initialized =
      true;

    engineApi.initializedAt =
      new Date()
        .toISOString();

    return getEngineHealth();

  }


  registerEngineApiFunction(
    engineApi,
    "initialize",
    initializeEngine
  );



  /*
    ============================================================
    DEBUG SNAPSHOT

    This deliberately exposes only registration and capability
    information. It does not expose questionnaire answers or
    mutate evaluation results.
    ============================================================
  */


  function createEngineDebugSnapshot()
  {

    return {

      health:
        getEngineHealth(),

      metadata: {

        ...engineApi.metadata

      },

      capabilities: {

        ...engineApi.capabilities

      },

      publicConstants: {

        engineApiVersion:
          FINAL_ENGINE_API_VERSION,

        publicResultVersion:
          typeof PUBLIC_RESULT_VERSION ===
            "string"
            ? PUBLIC_RESULT_VERSION
            : null,

        collectionPipelineVersion:
          typeof COLLECTION_PIPELINE_VERSION ===
            "string"
            ? COLLECTION_PIPELINE_VERSION
            : null

      }

    };

  }


  registerEngineApiFunction(
    engineApi,
    "createEngineDebugSnapshot",
    createEngineDebugSnapshot
  );



  /*
    ============================================================
    REGISTER API ON SHARED NAMESPACE
    ============================================================
  */


  namespace.engine =
    engineApi;


  namespace.feedCropEngine =
    engineApi;



  /*
    ============================================================
    COMPATIBILITY ALIASES

    These aliases allow existing planner files to call the most
    important functions directly from BCPFeedCropPlanner while
    the preferred API remains:

      BCPFeedCropPlanner.engine
    ============================================================
  */


  if (
    typeof engineApi.evaluateCrop ===
      "function"
  ) {

    namespace.evaluateCrop =
      engineApi.evaluateCrop;

  }


  if (
    typeof engineApi.evaluateCropSafely ===
      "function"
  ) {

    namespace.evaluateCropSafely =
      engineApi.evaluateCropSafely;

  }


  if (
    typeof engineApi.evaluateAllCrops ===
      "function"
  ) {

    namespace.evaluateAllCrops =
      engineApi.evaluateAllCrops;

  }


  if (
    typeof engineApi.rankCropEvaluations ===
      "function"
  ) {

    namespace.rankCropEvaluations =
      engineApi.rankCropEvaluations;

  }


  if (
    typeof engineApi.createPublicCollectionResult ===
      "function"
  ) {

    namespace.createPublicCollectionResult =
      engineApi.createPublicCollectionResult;

  }


  if (
    typeof engineApi.createPublicRecommendationCard ===
      "function"
  ) {

    namespace.createPublicRecommendationCard =
      engineApi.createPublicRecommendationCard;

  }


  if (
    typeof engineApi.createPublicRecommendationDetail ===
      "function"
  ) {

    namespace.createPublicRecommendationDetail =
      engineApi.createPublicRecommendationDetail;

  }


  namespace.getEngineHealth =
    getEngineHealth;


  namespace.engineVersion =
    engineApi.version;


  namespace.engineApiVersion =
    engineApi.apiVersion;



  /*
    ============================================================
    INITIALIZE ENGINE
    ============================================================
  */


  initializeEngine();



  /*
    ============================================================
    FINAL MODULE CLOSURE
    ============================================================
  */


})(
  typeof window !==
    "undefined"
    ? window
    : globalThis
); 



