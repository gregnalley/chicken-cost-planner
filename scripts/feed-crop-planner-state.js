"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Questionnaire State Management

  State Version: 1.0.0

  Responsibilities:
  - Create the canonical questionnaire answer object
  - Read and write nested answer paths
  - Evaluate conditional question visibility
  - Clear answers for questions that become hidden
  - Validate individual questions and sections
  - Save and restore questionnaire progress with sessionStorage

  Load this file after:
  - scripts/feed-crop-planner-questionnaire.js
*/

(function initializeFeedCropQuestionnaireState(global) {
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner || {};

  const questionnaire =
    namespace.questionnaire;

  if (
    !questionnaire ||
    !questionnaire.config ||
    typeof questionnaire.getQuestionnaireSections !== "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire configuration must load before the state module."
    );
  }

  const STATE_VERSION =
    "1.0.0";

  const ANSWER_GROUPS =
    Object.freeze([
      "climate",
      "flock",
      "space",
      "site",
      "soil",
      "water",
      "labor",
      "harvestStorage",
      "preferences"
    ]);

  const questionTypes =
    questionnaire.questionTypes;

  const visibilityOperators =
    questionnaire.visibilityOperators;

  const questionnaireConfig =
    questionnaire.config;

  const stateStorageKey =
    questionnaireConfig.stateStorageKey;

  function createEmptyAnswers() {
    return {
      climate: {},
      flock: {},
      space: {},
      site: {},
      soil: {},
      water: {},
      labor: {},
      harvestStorage: {},
      preferences: {}
    };
  }

  function createInitialState() {
    const firstSection =
      questionnaire.getQuestionnaireSections()[0] ||
      null;

    return {
      stateVersion:
        STATE_VERSION,

      questionnaireVersion:
        questionnaire.version,

      currentSectionId:
        firstSection
          ? firstSection.id
          : null,

      answers:
        createEmptyAnswers(),

      completedSectionIds: [],

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()
    };
  }

  function isPlainObject(value) {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    );
  }

  function cloneValue(value) {
    if (
      value === undefined ||
      value === null ||
      typeof value !== "object"
    ) {
      return value;
    }

    return JSON.parse(
      JSON.stringify(value)
    );
  }

  function normalizePath(answerPath) {
    if (
      typeof answerPath !== "string" ||
      answerPath.trim() === ""
    ) {
      return [];
    }

    return answerPath
      .split(".")
      .map(part => part.trim())
      .filter(Boolean);
  }

  function getValueAtPath(source, answerPath) {
    const pathParts =
      normalizePath(answerPath);

    if (pathParts.length === 0) {
      return undefined;
    }

    let currentValue =
      source;

    for (const pathPart of pathParts) {
      if (
        currentValue === null ||
        currentValue === undefined ||
        typeof currentValue !== "object"
      ) {
        return undefined;
      }

      currentValue =
        currentValue[pathPart];
    }

    return currentValue;
  }

  function setValueAtPath(target, answerPath, value) {
    const pathParts =
      normalizePath(answerPath);

    if (pathParts.length === 0) {
      throw new Error(
        "A valid answerPath is required."
      );
    }

    let currentTarget =
      target;

    pathParts.forEach(
      (pathPart, index) => {
        const isFinalPart =
          index === pathParts.length - 1;

        if (isFinalPart) {
          currentTarget[pathPart] =
            cloneValue(value);

          return;
        }

        if (!isPlainObject(currentTarget[pathPart])) {
          currentTarget[pathPart] = {};
        }

        currentTarget =
          currentTarget[pathPart];
      }
    );

    return target;
  }

  function deleteValueAtPath(target, answerPath) {
    const pathParts =
      normalizePath(answerPath);

    if (pathParts.length === 0) {
      return false;
    }

    let currentTarget =
      target;

    for (
      let index = 0;
      index < pathParts.length - 1;
      index += 1
    ) {
      const pathPart =
        pathParts[index];

      if (!isPlainObject(currentTarget[pathPart])) {
        return false;
      }

      currentTarget =
        currentTarget[pathPart];
    }

    const finalPart =
      pathParts[pathParts.length - 1];

    if (
      !Object.prototype.hasOwnProperty.call(
        currentTarget,
        finalPart
      )
    ) {
      return false;
    }

    delete currentTarget[finalPart];

    return true;
  }

  function ensureCanonicalAnswerGroups(answers) {
    const normalizedAnswers =
      isPlainObject(answers)
        ? answers
        : {};

    ANSWER_GROUPS.forEach(groupName => {
      if (!isPlainObject(normalizedAnswers[groupName])) {
        normalizedAnswers[groupName] = {};
      }
    });

    return normalizedAnswers;
  }

  function getAllQuestions() {
    return questionnaire
      .getQuestionnaireSections()
      .flatMap(section => section.questions || []);
  }

  function getQuestion(questionId) {
    if (typeof questionId !== "string") {
      return null;
    }

    return (
      getAllQuestions().find(
        question => question.id === questionId
      ) ||
      null
    );
  }

  function getQuestionByAnswerPath(answerPath) {
    if (typeof answerPath !== "string") {
      return null;
    }

    return (
      getAllQuestions().find(
        question =>
          question.answerPath === answerPath
      ) ||
      null
    );
  }

  function getComparableValue(
    rawValue,
    compareMode
  ) {
    if (compareMode === "length") {
      if (
        Array.isArray(rawValue) ||
        typeof rawValue === "string"
      ) {
        return rawValue.length;
      }

      return 0;
    }

    return rawValue;
  }

  function evaluateVisibilityRule(
    visibility,
    answers
  ) {
    if (!visibility) {
      return true;
    }

    const sourceValue =
      getValueAtPath(
        answers,
        visibility.answerPath
      );

    const comparableValue =
      getComparableValue(
        sourceValue,
        visibility.compare
      );

    switch (visibility.operator) {
      case visibilityOperators.EQUALS:
        return comparableValue === visibility.value;

      case visibilityOperators.NOT_EQUALS:
        return comparableValue !== visibility.value;

      case visibilityOperators.INCLUDES:
        return (
          Array.isArray(sourceValue) &&
          sourceValue.includes(visibility.value)
        );

      case visibilityOperators.NOT_INCLUDES:
        return (
          !Array.isArray(sourceValue) ||
          !sourceValue.includes(visibility.value)
        );

      case visibilityOperators.GREATER_THAN:
        return comparableValue > visibility.value;

      case visibilityOperators.GREATER_THAN_OR_EQUAL:
        return comparableValue >= visibility.value;

      default:
        return false;
    }
  }

  function isQuestionVisible(question, answers) {
    if (!question) {
      return false;
    }

    return evaluateVisibilityRule(
      question.visibility,
      answers
    );
  }

  function getHiddenQuestionResetValue(question) {
    if (!question) {
      return undefined;
    }

    if (
      question.type === questionTypes.MULTIPLE_CHOICE ||
      question.type === questionTypes.RANKING
    ) {
      return [];
    }

    return undefined;
  }

  function clearQuestionAnswer(
    answers,
    question
  ) {
    const resetValue =
      getHiddenQuestionResetValue(question);

    if (resetValue !== undefined) {
      setValueAtPath(
        answers,
        question.answerPath,
        resetValue
      );

      return;
    }

    deleteValueAtPath(
      answers,
      question.answerPath
    );
  }

  function pruneInvalidGoalPriorities(answers) {
    const selectedGoals =
      getValueAtPath(
        answers,
        "preferences.plannerGoals"
      );

    const currentPriorities =
      getValueAtPath(
        answers,
        "preferences.goalPriorities"
      );

    if (!Array.isArray(selectedGoals)) {
      setValueAtPath(
        answers,
        "preferences.goalPriorities",
        []
      );

      return;
    }

    if (!Array.isArray(currentPriorities)) {
      return;
    }

    const retainedPriorities =
      currentPriorities
        .filter(priority => (
          isPlainObject(priority) &&
          selectedGoals.includes(priority.goal)
        ))
        .sort(
          (first, second) =>
            Number(first.rank) - Number(second.rank)
        )
        .slice(0, 3)
        .map((priority, index) => ({
          goal:
            priority.goal,

          rank:
            index + 1
        }));

    setValueAtPath(
      answers,
      "preferences.goalPriorities",
      retainedPriorities
    );
  }

  function clearHiddenAnswers(answers) {
    const normalizedAnswers =
      ensureCanonicalAnswerGroups(answers);

    getAllQuestions().forEach(question => {
      if (
        !isQuestionVisible(
          question,
          normalizedAnswers
        )
      ) {
        clearQuestionAnswer(
          normalizedAnswers,
          question
        );
      }
    });

    pruneInvalidGoalPriorities(
      normalizedAnswers
    );

    return normalizedAnswers;
  }

  function normalizeState(rawState) {
    const initialState =
      createInitialState();

    if (!isPlainObject(rawState)) {
      return initialState;
    }

    const normalizedState = {
      stateVersion:
        STATE_VERSION,

      questionnaireVersion:
        questionnaire.version,

      currentSectionId:
        typeof rawState.currentSectionId === "string"
          ? rawState.currentSectionId
          : initialState.currentSectionId,

      answers:
        clearHiddenAnswers(
          ensureCanonicalAnswerGroups(
            isPlainObject(rawState.answers)
              ? cloneValue(rawState.answers)
              : createEmptyAnswers()
          )
        ),

      completedSectionIds:
        Array.isArray(rawState.completedSectionIds)
          ? [
              ...new Set(
                rawState.completedSectionIds.filter(
                  sectionId =>
                    typeof sectionId === "string"
                )
              )
            ]
          : [],

      createdAt:
        typeof rawState.createdAt === "string"
          ? rawState.createdAt
          : initialState.createdAt,

      updatedAt:
        typeof rawState.updatedAt === "string"
          ? rawState.updatedAt
          : initialState.updatedAt
    };

    const validSectionIds =
      new Set(
        questionnaire
          .getQuestionnaireSections()
          .map(section => section.id)
      );

    if (
      !validSectionIds.has(
        normalizedState.currentSectionId
      )
    ) {
      normalizedState.currentSectionId =
        initialState.currentSectionId;
    }

    normalizedState.completedSectionIds =
      normalizedState.completedSectionIds.filter(
        sectionId => validSectionIds.has(sectionId)
      );

    return normalizedState;
  }

  function canUseSessionStorage() {
    try {
      if (!global.sessionStorage) {
        return false;
      }

      const testKey =
        `${stateStorageKey}-availability-test`;

      global.sessionStorage.setItem(
        testKey,
        "1"
      );

      global.sessionStorage.removeItem(
        testKey
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  function saveState(state) {
    const normalizedState =
      normalizeState(state);

    normalizedState.updatedAt =
      new Date().toISOString();

    if (!canUseSessionStorage()) {
      return {
        saved:
          false,

        state:
          normalizedState,

        reason:
          "session-storage-unavailable"
      };
    }

    try {
      global.sessionStorage.setItem(
        stateStorageKey,
        JSON.stringify(normalizedState)
      );

      return {
        saved:
          true,

        state:
          normalizedState,

        reason:
          null
      };
    } catch (error) {
      return {
        saved:
          false,

        state:
          normalizedState,

        reason:
          "session-storage-write-failed",

        error
      };
    }
  }

  function loadState() {
    if (!canUseSessionStorage()) {
      return {
        loaded:
          false,

        state:
          createInitialState(),

        reason:
          "session-storage-unavailable"
      };
    }

    const storedValue =
      global.sessionStorage.getItem(
        stateStorageKey
      );

    if (!storedValue) {
      return {
        loaded:
          false,

        state:
          createInitialState(),

        reason:
          "no-saved-state"
      };
    }

    try {
      const parsedState =
        JSON.parse(storedValue);

      if (
        parsedState.questionnaireVersion !==
        questionnaire.version
      ) {
        return {
          loaded:
            false,

          state:
            createInitialState(),

          reason:
            "questionnaire-version-mismatch"
        };
      }

      return {
        loaded:
          true,

        state:
          normalizeState(parsedState),

        reason:
          null
      };
    } catch (error) {
      return {
        loaded:
          false,

        state:
          createInitialState(),

        reason:
          "saved-state-invalid",

        error
      };
    }
  }

  function clearSavedState() {
    if (!canUseSessionStorage()) {
      return false;
    }

    global.sessionStorage.removeItem(
      stateStorageKey
    );

    return true;
  }

  function updateAnswer(
    state,
    answerPath,
    value,
    options = {}
  ) {
    const workingState =
      normalizeState(state);

    const question =
      getQuestionByAnswerPath(answerPath);

    if (!question) {
      throw new Error(
        `Unknown questionnaire answer path: ${answerPath}`
      );
    }

    setValueAtPath(
      workingState.answers,
      answerPath,
      value
    );

    clearHiddenAnswers(
      workingState.answers
    );

    workingState.updatedAt =
      new Date().toISOString();

    if (options.save !== false) {
      return saveState(workingState).state;
    }

    return workingState;
  }

  function setCurrentSection(
    state,
    sectionId,
    options = {}
  ) {
    const section =
      questionnaire.getQuestionnaireSection(
        sectionId
      );

    if (!section) {
      throw new Error(
        `Unknown questionnaire section: ${sectionId}`
      );
    }

    const workingState =
      normalizeState(state);

    workingState.currentSectionId =
      sectionId;

    workingState.updatedAt =
      new Date().toISOString();

    if (options.save !== false) {
      return saveState(workingState).state;
    }

    return workingState;
  }

  function hasAnswer(value) {
    if (
      value === undefined ||
      value === null
    ) {
      return false;
    }

    if (
      typeof value === "string" &&
      value.trim() === ""
    ) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }

  function getAllowedOptionValues(question) {
    if (!Array.isArray(question.options)) {
      return [];
    }

    return question.options.map(
      option => option.value
    );
  }

  function validateNumberQuestion(
    question,
    value
  ) {
    const validation =
      question.validation || {};

    const numericValue =
      typeof value === "number"
        ? value
        : Number(value);

    if (!Number.isFinite(numericValue)) {
      return "Enter a valid number.";
    }

    if (
      validation.integerOnly &&
      !Number.isInteger(numericValue)
    ) {
      return (
        validation.integerMessage ||
        "Enter a whole number."
      );
    }

    if (
      typeof validation.minimum === "number" &&
      numericValue < validation.minimum
    ) {
      return (
        validation.minimumMessage ||
        `Enter a value of at least ${validation.minimum}.`
      );
    }

    if (
      typeof validation.maximum === "number" &&
      numericValue > validation.maximum
    ) {
      return (
        validation.maximumMessage ||
        `Enter a value no greater than ${validation.maximum}.`
      );
    }

    return null;
  }

  function validateChoiceQuestion(
    question,
    value
  ) {
    const allowedValues =
      getAllowedOptionValues(question);

    if (
      allowedValues.length > 0 &&
      !allowedValues.includes(value)
    ) {
      return "Choose one of the available options.";
    }

    return null;
  }

  function validateMultipleChoiceQuestion(
    question,
    value
  ) {
    if (!Array.isArray(value)) {
      return "Select one or more available options.";
    }

    const allowedValues =
      getAllowedOptionValues(question);

    const hasUnknownValue =
      value.some(
        selectedValue =>
          !allowedValues.includes(selectedValue)
      );

    if (hasUnknownValue) {
      return "One or more selected options are not valid.";
    }

    const minimumSelections =
      question.validation &&
      question.validation.minimumSelections;

    if (
      typeof minimumSelections === "number" &&
      value.length < minimumSelections
    ) {
      return (
        question.validation.requiredMessage ||
        `Choose at least ${minimumSelections} options.`
      );
    }

    return null;
  }

  function validateRankingQuestion(
    question,
    value,
    answers
  ) {
    if (!Array.isArray(value)) {
      return "Complete the required ranking.";
    }

    const ranking =
      question.ranking || {};

    const valueProperty =
      ranking.valueProperty || "value";

    const rankProperty =
      ranking.rankProperty || "rank";

    const requiredCount =
      ranking.requiredRankCount ||
      (
        question.validation &&
        question.validation.exactRankCount
      ) ||
      0;

    if (
      requiredCount > 0 &&
      value.length !== requiredCount
    ) {
      return (
        question.validation &&
        question.validation.requiredMessage
      ) ||
      `Rank exactly ${requiredCount} options.`;
    }

    const rankedValues = [];
    const rankedNumbers = [];

    for (const rankingItem of value) {
      if (!isPlainObject(rankingItem)) {
        return "Each ranked item must contain a value and rank.";
      }

      rankedValues.push(
        rankingItem[valueProperty]
      );

      rankedNumbers.push(
        rankingItem[rankProperty]
      );
    }

    if (
      new Set(rankedValues).size !==
      rankedValues.length
    ) {
      return (
        question.validation &&
        question.validation.uniqueValuesMessage
      ) ||
      "Each ranked option must be different.";
    }

    if (
      new Set(rankedNumbers).size !==
      rankedNumbers.length
    ) {
      return (
        question.validation &&
        question.validation.uniqueRanksMessage
      ) ||
      "Each rank may be used only once.";
    }

    const expectedRanks =
      Array.from(
        {
          length:
            requiredCount
        },
        (_, index) =>
          (ranking.firstRank || 1) + index
      );

    const sortedRanks =
      [...rankedNumbers]
        .map(Number)
        .sort((first, second) => first - second);

    if (
      requiredCount > 0 &&
      expectedRanks.some(
        (expectedRank, index) =>
          sortedRanks[index] !== expectedRank
      )
    ) {
      return `Ranks must run from ${expectedRanks[0]} through ${expectedRanks[expectedRanks.length - 1]}.`;
    }

    if (question.sourceAnswerPath) {
      const sourceValues =
        getValueAtPath(
          answers,
          question.sourceAnswerPath
        );

      if (!Array.isArray(sourceValues)) {
        return "Select the source goals before ranking them.";
      }

      const containsUnselectedValue =
        rankedValues.some(
          rankedValue =>
            !sourceValues.includes(rankedValue)
        );

      if (containsUnselectedValue) {
        return "Rank only goals selected in the previous question.";
      }
    }

    return null;
  }

  function validateQuestion(
    question,
    answers
  ) {
    if (!question) {
      return {
        valid:
          false,

        visible:
          false,

        questionId:
          null,

        answerPath:
          null,

        message:
          "Question definition is unavailable."
      };
    }

    const visible =
      isQuestionVisible(
        question,
        answers
      );

    if (!visible) {
      return {
        valid:
          true,

        visible:
          false,

        questionId:
          question.id,

        answerPath:
          question.answerPath,

        message:
          null
      };
    }

    const value =
      getValueAtPath(
        answers,
        question.answerPath
      );

    const answered =
      hasAnswer(value);

    if (
      question.required &&
      !answered
    ) {
      return {
        valid:
          false,

        visible:
          true,

        questionId:
          question.id,

        answerPath:
          question.answerPath,

        message:
          (
            question.validation &&
            question.validation.requiredMessage
          ) ||
          "This question is required."
      };
    }

    if (!answered) {
      return {
        valid:
          true,

        visible:
          true,

        questionId:
          question.id,

        answerPath:
          question.answerPath,

        message:
          null
      };
    }

    let message =
      null;

    switch (question.type) {
      case questionTypes.NUMBER:
        message =
          validateNumberQuestion(
            question,
            value
          );
        break;

      case questionTypes.SINGLE_CHOICE:
      case questionTypes.BOOLEAN:
        message =
          validateChoiceQuestion(
            question,
            value
          );
        break;

      case questionTypes.MULTIPLE_CHOICE:
        message =
          validateMultipleChoiceQuestion(
            question,
            value
          );
        break;

      case questionTypes.RANKING:
        message =
          validateRankingQuestion(
            question,
            value,
            answers
          );
        break;

      case questionTypes.INFORMATION:
        message =
          null;
        break;

      default:
        message =
          "This question uses an unsupported question type.";
    }

    return {
      valid:
        message === null,

      visible:
        true,

      questionId:
        question.id,

      answerPath:
        question.answerPath,

      message
    };
  }

  function validateSection(
    sectionId,
    stateOrAnswers
  ) {
    const section =
      questionnaire.getQuestionnaireSection(
        sectionId
      );

    if (!section) {
      return {
        valid:
          false,

        sectionId,

        errors: [
          {
            questionId:
              null,

            answerPath:
              null,

            message:
              "Questionnaire section was not found."
          }
        ],

        results: []
      };
    }

    const answers =
      stateOrAnswers &&
      isPlainObject(stateOrAnswers.answers)
        ? stateOrAnswers.answers
        : stateOrAnswers;

    const normalizedAnswers =
      ensureCanonicalAnswerGroups(
        isPlainObject(answers)
          ? answers
          : createEmptyAnswers()
      );

    const results =
      section.questions.map(
        question =>
          validateQuestion(
            question,
            normalizedAnswers
          )
      );

    const errors =
      results
        .filter(result => !result.valid)
        .map(result => ({
          questionId:
            result.questionId,

          answerPath:
            result.answerPath,

          message:
            result.message
        }));

    return {
      valid:
        errors.length === 0,

      sectionId:
        section.id,

      errors,

      results
    };
  }

  function validateAll(stateOrAnswers) {
    const sectionResults =
      questionnaire
        .getQuestionnaireSections()
        .map(section =>
          validateSection(
            section.id,
            stateOrAnswers
          )
        );

    const errors =
      sectionResults.flatMap(
        sectionResult =>
          sectionResult.errors.map(error => ({
            sectionId:
              sectionResult.sectionId,

            ...error
          }))
      );

    return {
      valid:
        errors.length === 0,

      errors,

      sections:
        sectionResults
    };
  }

  function markSectionCompleted(
    state,
    sectionId,
    options = {}
  ) {
    const validationResult =
      validateSection(
        sectionId,
        state
      );

    if (!validationResult.valid) {
      return {
        completed:
          false,

        state:
          normalizeState(state),

        validation:
          validationResult
      };
    }

    const workingState =
      normalizeState(state);

    workingState.completedSectionIds =
      [
        ...new Set([
          ...workingState.completedSectionIds,
          sectionId
        ])
      ];

    workingState.updatedAt =
      new Date().toISOString();

    const finalState =
      options.save === false
        ? workingState
        : saveState(workingState).state;

    return {
      completed:
        true,

      state:
        finalState,

      validation:
        validationResult
    };
  }

  function unmarkSectionCompleted(
    state,
    sectionId,
    options = {}
  ) {
    const workingState =
      normalizeState(state);

    workingState.completedSectionIds =
      workingState.completedSectionIds.filter(
        completedSectionId =>
          completedSectionId !== sectionId
      );

    workingState.updatedAt =
      new Date().toISOString();

    if (options.save !== false) {
      return saveState(workingState).state;
    }

    return workingState;
  }

  function getProgress(stateOrAnswers) {
    const validation =
      validateAll(stateOrAnswers);

    const sections =
      questionnaire.getQuestionnaireSections();

    const completedSections =
      validation.sections.filter(
        sectionResult => sectionResult.valid
      ).length;

    const visibleQuestions =
      validation.sections.flatMap(
        sectionResult =>
          sectionResult.results.filter(
            result => result.visible
          )
      );

    const validVisibleQuestions =
      visibleQuestions.filter(
        result => result.valid
      ).length;

    return {
      sectionCount:
        sections.length,

      completedSectionCount:
        completedSections,

      sectionPercent:
        sections.length > 0
          ? Math.round(
              (completedSections / sections.length) *
              100
            )
          : 0,

      visibleQuestionCount:
        visibleQuestions.length,

      validVisibleQuestionCount:
        validVisibleQuestions,

      questionPercent:
        visibleQuestions.length > 0
          ? Math.round(
              (validVisibleQuestions /
                visibleQuestions.length) *
              100
            )
          : 0
    };
  }

  namespace.questionnaireState =
    Object.freeze({
      version:
        STATE_VERSION,

      answerGroups:
        ANSWER_GROUPS,

      stateStorageKey,

      createEmptyAnswers,

      createInitialState,

      normalizeState,

      getValueAtPath,

      setValueAtPath,

      deleteValueAtPath,

      getAllQuestions,

      getQuestion,

      getQuestionByAnswerPath,

      evaluateVisibilityRule,

      isQuestionVisible,

      clearHiddenAnswers,

      updateAnswer,

      setCurrentSection,

      validateQuestion,

      validateSection,

      validateAll,

      markSectionCompleted,

      unmarkSectionCompleted,

      getProgress,

      canUseSessionStorage,

      saveState,

      loadState,

      clearSavedState
    });

})(window);