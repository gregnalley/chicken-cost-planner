"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Data Adapter

  Purpose:
  - Creates a controlled bridge between feed-crops.js
    and the recommendation engine.
  - Prevents the engine from depending directly on the
    raw crop database structure.
  - Provides crop registration, lookup, and basic
    collection diagnostics.

  Work Session 1 Improvement:
  - The live crop database is not registered yet.
  - No crop records are changed.
  - No plannerData fields are required yet.
*/

(function initializeFeedCropPlannerDataAdapter(global) {

  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner || {};

  let rawCropRecords = [];

  let cropRecordsById = new Map();

  let registrationReport = createEmptyRegistrationReport();

  function createEmptyRegistrationReport() {
    return {
      registered: false,

      totalRecordsReceived: 0,
      validIdCount: 0,
      uniqueIdCount: 0,

      duplicateIds: [],
      missingIdIndexes: [],

      expectedIdsFound: [],
      expectedIdsMissing: [],
      unexpectedIds: [],

      errors: [],
      warnings: []
    };
  }

  function isNonEmptyString(value) {
    return (
      typeof value === "string" &&
      value.trim().length > 0
    );
  }

  function getExpectedCropIds() {
    const expectedIds =
      namespace.config?.crops?.expectedCropIds;

    return Array.isArray(expectedIds)
      ? [...expectedIds]
      : [];
  }

  function extractCropId(cropRecord) {
    if (
      !cropRecord ||
      typeof cropRecord !== "object"
    ) {
      return null;
    }

    /*
      The adapter currently expects the primary crop ID
      to be stored as cropRecord.id.

      If the existing database uses another field, we will
      update only this adapter rather than the engine.
    */
    return isNonEmptyString(cropRecord.id)
      ? cropRecord.id.trim()
      : null;
  }

  function registerCropCollection(cropCollection) {
    rawCropRecords = [];
    cropRecordsById = new Map();
    registrationReport =
      createEmptyRegistrationReport();

    if (!Array.isArray(cropCollection)) {
      registrationReport.errors.push(
        "The crop collection must be an array."
      );

      return getRegistrationReport();
    }

    registrationReport.totalRecordsReceived =
      cropCollection.length;

    const duplicateIds = new Set();

    cropCollection.forEach(
      (cropRecord, index) => {

        const cropId =
          extractCropId(cropRecord);

        if (!cropId) {
          registrationReport
            .missingIdIndexes
            .push(index);

          registrationReport.warnings.push(
            `Crop record at index ${index} does not have a valid ID.`
          );

          return;
        }

        registrationReport.validIdCount += 1;

        if (cropRecordsById.has(cropId)) {
          duplicateIds.add(cropId);

          registrationReport.warnings.push(
            `Duplicate crop ID found: ${cropId}`
          );

          return;
        }

        cropRecordsById.set(
          cropId,
          cropRecord
        );
      }
    );

    rawCropRecords = [...cropCollection];

    registrationReport.duplicateIds =
      [...duplicateIds];

    registrationReport.uniqueIdCount =
      cropRecordsById.size;

    const expectedIds =
      getExpectedCropIds();

    const expectedIdSet =
      new Set(expectedIds);

    registrationReport.expectedIdsFound =
      expectedIds.filter(
        cropId => cropRecordsById.has(cropId)
      );

    registrationReport.expectedIdsMissing =
      expectedIds.filter(
        cropId => !cropRecordsById.has(cropId)
      );

    registrationReport.unexpectedIds =
      [...cropRecordsById.keys()]
        .filter(
          cropId => !expectedIdSet.has(cropId)
        );

    if (
      registrationReport.expectedIdsMissing.length > 0
    ) {
      registrationReport.warnings.push(
        `${registrationReport.expectedIdsMissing.length} expected crop ID(s) were not found.`
      );
    }

    if (
      registrationReport.unexpectedIds.length > 0
    ) {
      registrationReport.warnings.push(
        `${registrationReport.unexpectedIds.length} unexpected crop ID(s) were found.`
      );
    }

    registrationReport.registered =
      registrationReport.errors.length === 0;

    return getRegistrationReport();
  }

  function clearCropCollection() {
    rawCropRecords = [];
    cropRecordsById = new Map();
    registrationReport =
      createEmptyRegistrationReport();

    return getRegistrationReport();
  }

  function isCropCollectionRegistered() {
    return registrationReport.registered;
  }

  function getAllRawCrops() {
    return [...rawCropRecords];
  }

  function getAllUniqueCrops() {
    return [...cropRecordsById.values()];
  }

  function getCropById(cropId) {
    if (!isNonEmptyString(cropId)) {
      return null;
    }

    return (
      cropRecordsById.get(cropId.trim()) ||
      null
    );
  }

  function hasCrop(cropId) {
    return getCropById(cropId) !== null;
  }

  function getCropIds() {
    return [...cropRecordsById.keys()];
  }

  function getRegistrationReport() {
    return {
      ...registrationReport,

      duplicateIds: [
        ...registrationReport.duplicateIds
      ],

      missingIdIndexes: [
        ...registrationReport.missingIdIndexes
      ],

      expectedIdsFound: [
        ...registrationReport.expectedIdsFound
      ],

      expectedIdsMissing: [
        ...registrationReport.expectedIdsMissing
      ],

      unexpectedIds: [
        ...registrationReport.unexpectedIds
      ],

      errors: [
        ...registrationReport.errors
      ],

      warnings: [
        ...registrationReport.warnings
      ]
    };
  }

  /*
    The engine should use this adapter API rather than
    reading the raw feed-crop global variable directly.
  */
  namespace.data = Object.freeze({
    registerCropCollection,
    clearCropCollection,

    isCropCollectionRegistered,

    getAllRawCrops,
    getAllUniqueCrops,

    getCropById,
    hasCrop,
    getCropIds,

    getRegistrationReport,

    extractCropId
  });

})(window);