"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Public Questionnaire Controller

  Public UI Version: 1.0.0

  Responsibilities:
  - Initialize the public questionnaire
  - Restore saved questionnaire progress
  - Connect rendered controls to questionnaire state
  - Validate sections before forward navigation
  - Control previous and next navigation
  - Display the review screen
  - Allow visitors to edit sections from review
  - Store validated answers for the results page
  - Redirect to the results page

  This file does not:
  - Define questionnaire questions
  - Score crops
  - Modify the recommendation engine
  - Render final crop recommendations

  Load this file after:
  - scripts/feed-crop-planner-questionnaire.js
  - scripts/feed-crop-planner-state.js
  - scripts/feed-crop-planner-renderer.js
*/

(function initializeFeedCropPlannerPublicUI(
  global
) {
  const namespace =
    global.BCPFeedCropPlanner =
      global.BCPFeedCropPlanner ||
      {};

  const questionnaire =
    namespace.questionnaire;

  const stateManager =
    namespace.questionnaireState;

  const renderer =
    namespace.questionnaireRenderer;

  if (
    !questionnaire ||
    typeof questionnaire.getQuestionnaireSections !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire configuration must load before the public UI."
    );
  }

  if (
    !stateManager ||
    typeof stateManager.loadState !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire state module must load before the public UI."
    );
  }

  if (
    !renderer ||
    typeof renderer.renderSectionInto !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire renderer must load before the public UI."
    );
  }

  const PUBLIC_UI_VERSION =
    "1.0.0";

  const RESULT_PAYLOAD_VERSION =
    "1.0.0";

  const DEFAULT_RESULTS_URL =
    "feed-crop-planner-results.html";

  let questionnaireState =
    null;

  let currentMode =
    "questionnaire";

  let currentErrors =
    [];

  let initialized =
    false;

  const elements = {
    root:
      null,

    progress:
      null,

    questionnaire:
      null,

    review:
      null,

    status:
      null,

    backButton:
      null,

    nextButton:
      null,

    submitButton:
      null,

    resetButton:
      null
  };

  /*
    ==================================================
    Basic lookup helpers
    ==================================================
  */

  function getSections() {
    return questionnaire
      .getQuestionnaireSections();
  }

  function getCurrentSection() {
    if (
      !questionnaireState ||
      !questionnaireState.currentSectionId
    ) {
      return null;
    }

    return questionnaire
      .getQuestionnaireSection(
        questionnaireState.currentSectionId
      );
  }

  function getSectionIndex(
    sectionId
  ) {
    return getSections().findIndex(
      section =>
        section.id === sectionId
    );
  }

  function getSectionForQuestion(
    questionId
  ) {
    return (
      getSections().find(
        section =>
          Array.isArray(section.questions) &&
          section.questions.some(
            question =>
              question.id === questionId
          )
      ) ||
      null
    );
  }

  function getSectionForAnswerPath(
    answerPath
  ) {
    return (
      getSections().find(
        section =>
          Array.isArray(section.questions) &&
          section.questions.some(
            question =>
              question.answerPath ===
              answerPath
          )
      ) ||
      null
    );
  }

  function getPreviousSection(
    sectionId
  ) {
    const sections =
      getSections();

    const currentIndex =
      getSectionIndex(sectionId);

    if (currentIndex <= 0) {
      return null;
    }

    return sections[
      currentIndex - 1
    ];
  }

  function getNextSection(
    sectionId
  ) {
    const sections =
      getSections();

    const currentIndex =
      getSectionIndex(sectionId);

    if (
      currentIndex < 0 ||
      currentIndex >=
        sections.length - 1
    ) {
      return null;
    }

    return sections[
      currentIndex + 1
    ];
  }

  function isLastSection(
    sectionId
  ) {
    const sections =
      getSections();

    return (
      sections.length > 0 &&
      sections[
        sections.length - 1
      ].id === sectionId
    );
  }

  /*
    ==================================================
    DOM lookup and initialization
    ==================================================
  */

  function collectElements() {
    elements.root =
      document.getElementById(
        "feed-crop-planner-app"
      );

    elements.progress =
      document.getElementById(
        "feed-crop-progress"
      );

    elements.questionnaire =
      document.getElementById(
        "feed-crop-questionnaire"
      );

    elements.review =
      document.getElementById(
        "feed-crop-review"
      );

    elements.status =
      document.getElementById(
        "feed-crop-status"
      );

    elements.backButton =
      document.getElementById(
        "feed-crop-back-button"
      );

    elements.nextButton =
      document.getElementById(
        "feed-crop-next-button"
      );

    elements.submitButton =
      document.getElementById(
        "feed-crop-submit-button"
      );

    elements.resetButton =
      document.getElementById(
        "feed-crop-reset-button"
      );
  }

  function getMissingRequiredElementIds() {
    const requiredElements = [
      [
        "feed-crop-planner-app",
        elements.root
      ],

      [
        "feed-crop-progress",
        elements.progress
      ],

      [
        "feed-crop-questionnaire",
        elements.questionnaire
      ],

      [
        "feed-crop-review",
        elements.review
      ],

      [
        "feed-crop-back-button",
        elements.backButton
      ],

      [
        "feed-crop-next-button",
        elements.nextButton
      ],

      [
        "feed-crop-submit-button",
        elements.submitButton
      ]
    ];

    return requiredElements
      .filter(
        ([, element]) =>
          !element
      )
      .map(
        ([elementId]) =>
          elementId
      );
  }

  function initializePublicQuestionnaire() {
    if (initialized) {
      return {
        initialized:
          true,

        state:
          questionnaireState
      };
    }

    collectElements();

    const missingElementIds =
      getMissingRequiredElementIds();

    if (
      missingElementIds.length > 0
    ) {
      const message =
        [
          "Feed Crop Planner public UI could not initialize.",
          "Missing required elements:",
          missingElementIds.join(", ")
        ].join(" ");

      console.error(message);

      return {
        initialized:
          false,

        state:
          null,

        reason:
          "missing-page-elements",

        missingElementIds
      };
    }

    const loadResult =
      stateManager.loadState();

    questionnaireState =
      loadResult.state;

    currentMode =
      "questionnaire";

    currentErrors =
      [];

    bindEvents();

    renderCurrentView();

    if (loadResult.loaded) {
      setStatusMessage(
        "Your saved questionnaire progress was restored.",
        "success"
      );
    } else {
      clearStatusMessage();
    }

    initialized =
      true;

    return {
      initialized:
        true,

      state:
        questionnaireState,

      restored:
        loadResult.loaded,

      reason:
        loadResult.reason
    };
  }

  /*
    ==================================================
    Status messaging
    ==================================================
  */

  function setStatusMessage(
    message,
    statusType = "information"
  ) {
    if (!elements.status) {
      return;
    }

    elements.status.textContent =
      message || "";

    elements.status.className =
      [
        "feed-crop-status",
        `feed-crop-status-${statusType}`
      ].join(" ");

    elements.status.hidden =
      !message;
  }

  function clearStatusMessage() {
    if (!elements.status) {
      return;
    }

    elements.status.textContent =
      "";

    elements.status.className =
      "feed-crop-status";

    elements.status.hidden =
      true;
  }

  /*
    ==================================================
    Rendering
    ==================================================
  */

  function renderCurrentView() {
    if (
      currentMode === "review"
    ) {
      renderReviewMode();

      return;
    }

    renderQuestionnaireMode();
  }

  function renderQuestionnaireMode() {
    const section =
      getCurrentSection();

    if (!section) {
      setStatusMessage(
        "The requested questionnaire section could not be loaded.",
        "error"
      );

      return;
    }

    elements.questionnaire.hidden =
      false;

    elements.review.hidden =
      true;

    renderer.renderProgressInto(
      elements.progress,
      questionnaireState,
      {
        currentSectionId:
          section.id
      }
    );

    renderer.renderSectionInto(
      elements.questionnaire,
      section,
      questionnaireState,
      {
        errors:
          currentErrors
      }
    );

    refreshRankingAvailability();

    updateNavigationButtons();

    updatePageSectionMarker(
      section
    );
  }

  function renderReviewMode() {
    elements.questionnaire.hidden =
      true;

    elements.review.hidden =
      false;

    renderer.renderProgressInto(
      elements.progress,
      questionnaireState,
      {
        currentSectionId:
          questionnaireState.currentSectionId
      }
    );

    renderer.renderReviewInto(
      elements.review,
      questionnaireState,
      {
        title:
          "Review Your Feed Crop Plan",

        description:
          "Check your answers before the planner scores the available crops."
      }
    );

    updateNavigationButtons();

    if (elements.root) {
      elements.root.dataset.view =
        "review";
    }
  }

  function updatePageSectionMarker(
    section
  ) {
    if (!elements.root) {
      return;
    }

    elements.root.dataset.view =
      "questionnaire";

    elements.root.dataset.sectionId =
      section.id;

    elements.root.dataset.sectionStep =
      String(
        section.stepNumber
      );
  }

  /*
    ==================================================
    Navigation button display
    ==================================================
  */

  function updateNavigationButtons() {
    if (
      currentMode === "review"
    ) {
      elements.backButton.hidden =
        false;

      elements.backButton.textContent =
        "Back to Questions";

      elements.nextButton.hidden =
        true;

      elements.submitButton.hidden =
        false;

      elements.submitButton.textContent =
        "See My Crop Recommendations";

      return;
    }

    const section =
      getCurrentSection();

    if (!section) {
      return;
    }

    const previousSection =
      getPreviousSection(
        section.id
      );

    const nextSection =
      getNextSection(
        section.id
      );

    elements.backButton.hidden =
      !previousSection;

    elements.backButton.textContent =
      "Previous";

    elements.nextButton.hidden =
      false;

    elements.submitButton.hidden =
      true;

    if (nextSection) {
      elements.nextButton.textContent =
        `Next: ${
          nextSection.shortTitle ||
          nextSection.title
        }`;
    } else {
      elements.nextButton.textContent =
        "Review Answers";
    }
  }

  /*
    ==================================================
    Event binding
    ==================================================
  */

  function bindEvents() {
    elements.questionnaire.addEventListener(
      "change",
      handleQuestionnaireChange
    );

    elements.questionnaire.addEventListener(
      "input",
      handleQuestionnaireInput
    );

    elements.review.addEventListener(
      "click",
      handleReviewClick
    );

    elements.backButton.addEventListener(
      "click",
      handleBackButton
    );

    elements.nextButton.addEventListener(
      "click",
      handleNextButton
    );

    elements.submitButton.addEventListener(
      "click",
      handleSubmitButton
    );

    if (elements.resetButton) {
      elements.resetButton.addEventListener(
        "click",
        handleResetButton
      );
    }
  }

  /*
    ==================================================
    Input handling
    ==================================================
  */

  function handleQuestionnaireInput(
    event
  ) {
    const input =
      event.target.closest(
        '[data-answer-input="true"]'
      );

    if (!input) {
      return;
    }

    if (
      input.type === "number"
    ) {
      clearQuestionErrorByElement(
        input
      );
    }
  }

  function handleQuestionnaireChange(
    event
  ) {
    const input =
      event.target.closest(
        '[data-answer-input="true"]'
      );

    if (!input) {
      return;
    }

    const questionElement =
      input.closest(
        "[data-question-id]"
      );

    if (!questionElement) {
      return;
    }

    const questionId =
      questionElement.dataset.questionId;

    const question =
      stateManager.getQuestion(
        questionId
      );

    if (!question) {
      setStatusMessage(
        "The changed questionnaire field could not be identified.",
        "error"
      );

      return;
    }

    let value =
      renderer.readQuestionValue(
        question,
        questionElement
      );

    if (
      question.type ===
      questionnaire.questionTypes.RANKING
    ) {
      value =
        normalizeRankingSelection(
          question,
          value,
          input
        );
    }

    updateQuestionAnswer(
      question,
      value
    );
  }

  function updateQuestionAnswer(
    question,
    value
  ) {
    const section =
      getSectionForQuestion(
        question.id
      );

    questionnaireState =
      stateManager.updateAnswer(
        questionnaireState,
        question.answerPath,
        value,
        {
          save:
            false
        }
      );

    if (section) {
      questionnaireState =
        invalidateCompletedSectionsFrom(
          questionnaireState,
          section.id
        );
    }

    const saveResult =
      stateManager.saveState(
        questionnaireState
      );

    questionnaireState =
      saveResult.state;

    currentErrors =
      currentErrors.filter(
        error =>
          error.questionId !==
            question.id &&
          error.answerPath !==
            question.answerPath
      );

    clearStatusMessage();

    renderQuestionnaireMode();

    renderer.refreshChoiceCardStates(
      elements.questionnaire
    );
  }

  function clearQuestionErrorByElement(
    input
  ) {
    const questionElement =
      input.closest(
        "[data-question-id]"
      );

    if (!questionElement) {
      return;
    }

    const questionId =
      questionElement.dataset.questionId;

    if (!questionId) {
      return;
    }

    currentErrors =
      currentErrors.filter(
        error =>
          error.questionId !==
          questionId
      );

    questionElement.classList.remove(
      "has-error"
    );

    const errorElement =
      questionElement.querySelector(
        ".feed-crop-question-error"
      );

    if (errorElement) {
      errorElement.textContent =
        "";

      errorElement.classList.remove(
        "is-visible"
      );
    }
  }

  /*
    ==================================================
    Ranking behavior
    ==================================================
  */

  function normalizeRankingSelection(
    question,
    rankingValue,
    changedInput
  ) {
    if (!Array.isArray(rankingValue)) {
      return [];
    }

    const ranking =
      question.ranking ||
      {};

    const valueProperty =
      ranking.valueProperty ||
      "value";

    const rankProperty =
      ranking.rankProperty ||
      "rank";

    const changedRank =
      Number(
        changedInput.dataset.rank
      );

    const changedItem =
      rankingValue.find(
        item =>
          Number(
            item[rankProperty]
          ) === changedRank
      );

    if (!changedItem) {
      return rankingValue;
    }

    const changedValue =
      changedItem[valueProperty];

    return rankingValue.filter(
      item => {
        if (
          Number(
            item[rankProperty]
          ) === changedRank
        ) {
          return true;
        }

        return (
          item[valueProperty] !==
          changedValue
        );
      }
    );
  }

  function refreshRankingAvailability() {
    elements.questionnaire
      .querySelectorAll(
        '[data-ranking-control="true"]'
      )
      .forEach(
        rankingControl => {
          const selects =
            Array.from(
              rankingControl.querySelectorAll(
                'select[data-ranking-input="true"]'
              )
            );

          const selectedValues =
            selects
              .map(select => select.value)
              .filter(Boolean);

          selects.forEach(select => {
            Array.from(
              select.options
            ).forEach(option => {
              if (
                option.value === ""
              ) {
                option.disabled =
                  false;

                return;
              }

              option.disabled =
                selectedValues.includes(
                  option.value
                ) &&
                option.value !==
                  select.value;
            });
          });
        }
      );
  }

  /*
    ==================================================
    Completed-section invalidation
    ==================================================
  */

  function invalidateCompletedSectionsFrom(
    state,
    sectionId
  ) {
    const sectionIndex =
      getSectionIndex(sectionId);

    if (sectionIndex < 0) {
      return state;
    }

    const invalidatedSectionIds =
      new Set(
        getSections()
          .slice(sectionIndex)
          .map(section => section.id)
      );

    return {
      ...state,

      completedSectionIds:
        state.completedSectionIds.filter(
          completedSectionId =>
            !invalidatedSectionIds.has(
              completedSectionId
            )
        ),

      updatedAt:
        new Date().toISOString()
    };
  }

  /*
    ==================================================
    Forward navigation
    ==================================================
  */

  function handleNextButton() {
    const section =
      getCurrentSection();

    if (!section) {
      return;
    }

    const validation =
      stateManager.validateSection(
        section.id,
        questionnaireState
      );

    if (!validation.valid) {
      currentErrors =
        validation.errors;

      renderQuestionnaireMode();

      renderer.focusFirstQuestionError(
        elements.questionnaire
      );

      setStatusMessage(
        "Please correct the highlighted answers before continuing.",
        "error"
      );

      return;
    }

    const completionResult =
      stateManager.markSectionCompleted(
        questionnaireState,
        section.id,
        {
          save:
            false
        }
      );

    questionnaireState =
      completionResult.state;

    currentErrors =
      [];

    if (
      isLastSection(
        section.id
      )
    ) {
      const savedResult =
        stateManager.saveState(
          questionnaireState
        );

      questionnaireState =
        savedResult.state;

      enterReviewMode();

      return;
    }

    const nextSection =
      getNextSection(
        section.id
      );

    if (!nextSection) {
      return;
    }

    questionnaireState =
      stateManager.setCurrentSection(
        questionnaireState,
        nextSection.id,
        {
          save:
            false
        }
      );

    const saveResult =
      stateManager.saveState(
        questionnaireState
      );

    questionnaireState =
      saveResult.state;

    clearStatusMessage();

    renderQuestionnaireMode();

    scrollToPlannerTop();
  }

  /*
    ==================================================
    Backward navigation
    ==================================================
  */

  function handleBackButton() {
    if (
      currentMode === "review"
    ) {
      exitReviewMode();

      return;
    }

    const section =
      getCurrentSection();

    if (!section) {
      return;
    }

    const previousSection =
      getPreviousSection(
        section.id
      );

    if (!previousSection) {
      return;
    }

    questionnaireState =
      stateManager.setCurrentSection(
        questionnaireState,
        previousSection.id,
        {
          save:
            false
        }
      );

    const saveResult =
      stateManager.saveState(
        questionnaireState
      );

    questionnaireState =
      saveResult.state;

    currentErrors =
      [];

    clearStatusMessage();

    renderQuestionnaireMode();

    scrollToPlannerTop();
  }

  /*
    ==================================================
    Review mode
    ==================================================
  */

  function enterReviewMode() {
    const validation =
      stateManager.validateAll(
        questionnaireState
      );

    if (!validation.valid) {
      navigateToFirstValidationError(
        validation
      );

      return;
    }

    currentMode =
      "review";

    currentErrors =
      [];

    clearStatusMessage();

    renderReviewMode();

    scrollToPlannerTop();
  }

  function exitReviewMode() {
    currentMode =
      "questionnaire";

    currentErrors =
      [];

    clearStatusMessage();

    renderQuestionnaireMode();

    scrollToPlannerTop();
  }

  function handleReviewClick(
    event
  ) {
    const editButton =
      event.target.closest(
        "[data-review-edit-section]"
      );

    if (!editButton) {
      return;
    }

    const sectionId =
      editButton.dataset.reviewEditSection;

    const section =
      questionnaire
        .getQuestionnaireSection(
          sectionId
        );

    if (!section) {
      return;
    }

    questionnaireState =
      stateManager.setCurrentSection(
        questionnaireState,
        section.id,
        {
          save:
            false
        }
      );

    const saveResult =
      stateManager.saveState(
        questionnaireState
      );

    questionnaireState =
      saveResult.state;

    currentMode =
      "questionnaire";

    currentErrors =
      [];

    renderQuestionnaireMode();

    scrollToPlannerTop();
  }

  function navigateToFirstValidationError(
    validation
  ) {
    if (
      !validation ||
      !Array.isArray(
        validation.errors
      ) ||
      validation.errors.length === 0
    ) {
      return;
    }

    const firstError =
      validation.errors[0];

    const section =
      questionnaire
        .getQuestionnaireSection(
          firstError.sectionId
        );

    if (!section) {
      return;
    }

    questionnaireState =
      stateManager.setCurrentSection(
        questionnaireState,
        section.id,
        {
          save:
            false
        }
      );

    questionnaireState =
      stateManager.saveState(
        questionnaireState
      ).state;

    currentMode =
      "questionnaire";

    currentErrors =
      validation.errors
        .filter(
          error =>
            error.sectionId ===
            section.id
        )
        .map(error => ({
          questionId:
            error.questionId,

          answerPath:
            error.answerPath,

          message:
            error.message
        }));

    renderQuestionnaireMode();

    renderer.focusFirstQuestionError(
      elements.questionnaire
    );

    setStatusMessage(
      "One or more answers need attention before recommendations can be created.",
      "error"
    );

    scrollToPlannerTop();
  }

  /*
    ==================================================
    Final submission and result storage
    ==================================================
  */

  function handleSubmitButton() {
    const validation =
      stateManager.validateAll(
        questionnaireState
      );

    if (!validation.valid) {
      navigateToFirstValidationError(
        validation
      );

      return;
    }

    const answerPayload =
      createResultPayload();

    const saveResult =
      saveResultPayload(
        answerPayload
      );

    if (!saveResult.saved) {
      setStatusMessage(
        "Your answers could not be prepared for the results page because browser session storage is unavailable.",
        "error"
      );

      return;
    }

    stateManager.saveState(
      questionnaireState
    );

    const resultsUrl =
      getResultsPageUrl();

    global.location.href =
      resultsUrl;
  }

  function createResultPayload() {
    return {
      resultPayloadVersion:
        RESULT_PAYLOAD_VERSION,

      questionnaireVersion:
        questionnaire.version,

      createdAt:
        new Date().toISOString(),

      answers:
        JSON.parse(
          JSON.stringify(
            questionnaireState.answers
          )
        )
    };
  }

  function saveResultPayload(
    resultPayload
  ) {
    if (
      !stateManager.canUseSessionStorage()
    ) {
      return {
        saved:
          false,

        reason:
          "session-storage-unavailable"
      };
    }

    try {
      global.sessionStorage.setItem(
        questionnaire.config
          .resultStorageKey,

        JSON.stringify(
          resultPayload
        )
      );

      return {
        saved:
          true,

        reason:
          null
      };
    } catch (error) {
      return {
        saved:
          false,

        reason:
          "result-storage-failed",

        error
      };
    }
  }

  function getResultsPageUrl() {
    if (
      elements.root &&
      elements.root.dataset.resultsUrl
    ) {
      return elements.root
        .dataset.resultsUrl;
    }

    return DEFAULT_RESULTS_URL;
  }

  /*
    ==================================================
    Reset behavior
    ==================================================
  */

  function handleResetButton() {
    const shouldReset =
      global.confirm(
        "Start over and erase all answers from this questionnaire session?"
      );

    if (!shouldReset) {
      return;
    }

    resetQuestionnaire();
  }

  function resetQuestionnaire() {
    stateManager.clearSavedState();

    if (
      stateManager.canUseSessionStorage()
    ) {
      global.sessionStorage.removeItem(
        questionnaire.config
          .resultStorageKey
      );
    }

    questionnaireState =
      stateManager.createInitialState();

    questionnaireState =
      stateManager.saveState(
        questionnaireState
      ).state;

    currentMode =
      "questionnaire";

    currentErrors =
      [];

    renderQuestionnaireMode();

    setStatusMessage(
      "The questionnaire was reset.",
      "success"
    );

    scrollToPlannerTop();

    return questionnaireState;
  }

  /*
    ==================================================
    Scrolling helpers
    ==================================================
  */

  function scrollToPlannerTop() {
    if (!elements.root) {
      return;
    }

    const reducedMotion =
      global.matchMedia &&
      global.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    elements.root.scrollIntoView({
      behavior:
        reducedMotion
          ? "auto"
          : "smooth",

      block:
        "start"
    });
  }

  /*
    ==================================================
    Public state access

    These functions are useful during development and
    for future integration tests.
    ==================================================
  */

  function getCurrentState() {
    if (!questionnaireState) {
      return null;
    }

    return JSON.parse(
      JSON.stringify(
        questionnaireState
      )
    );
  }

  function getCurrentMode() {
    return currentMode;
  }

  function goToSection(
    sectionId
  ) {
    const section =
      questionnaire
        .getQuestionnaireSection(
          sectionId
        );

    if (!section) {
      throw new Error(
        `Unknown questionnaire section: ${sectionId}`
      );
    }

    questionnaireState =
      stateManager.setCurrentSection(
        questionnaireState,
        section.id,
        {
          save:
            false
        }
      );

    questionnaireState =
      stateManager.saveState(
        questionnaireState
      ).state;

    currentMode =
      "questionnaire";

    currentErrors =
      [];

    renderQuestionnaireMode();

    scrollToPlannerTop();

    return getCurrentState();
  }

  /*
    ==================================================
    Namespace export
    ==================================================
  */

  namespace.publicQuestionnaireUI =
    Object.freeze({
      version:
        PUBLIC_UI_VERSION,

      initialize:
        initializePublicQuestionnaire,

      getCurrentState,

      getCurrentMode,

      goToSection,

      enterReviewMode,

      exitReviewMode,

      resetQuestionnaire,

      createResultPayload
    });

  /*
    Automatically initialize after the page DOM loads.

    A page can disable automatic initialization by
    setting this attribute on the root element:

    data-auto-initialize="false"
  */

  document.addEventListener(
    "DOMContentLoaded",
    function handleDOMContentLoaded() {
      const rootElement =
        document.getElementById(
          "feed-crop-planner-app"
        );

      if (!rootElement) {
        return;
      }

      if (
        rootElement.dataset
          .autoInitialize === "false"
      ) {
        return;
      }

      initializePublicQuestionnaire();
    }
  );

})(window);