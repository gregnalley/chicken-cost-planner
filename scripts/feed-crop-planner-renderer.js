"use strict";

/*
  Backyard Chicken Planner
  Feed Crop Planner Public Questionnaire Renderer

  Renderer Version: 1.0.0

  Responsibilities:
  - Render questionnaire sections
  - Render each supported question type
  - Render question-level validation messages
  - Render questionnaire progress
  - Render the review screen
  - Convert stored answer values into visitor-friendly text

  This file does not:
  - Save questionnaire state
  - Change answers
  - Control previous/next navigation
  - Run the recommendation engine
  - Redirect to the results page

  Load this file after:
  - scripts/feed-crop-planner-questionnaire.js
  - scripts/feed-crop-planner-state.js
*/

(function initializeFeedCropQuestionnaireRenderer(
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

  if (
    !questionnaire ||
    typeof questionnaire.getQuestionnaireSections !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire configuration must load before the renderer."
    );
  }

  if (
    !stateManager ||
    typeof stateManager.getValueAtPath !==
      "function"
  ) {
    throw new Error(
      "Feed Crop Planner questionnaire state module must load before the renderer."
    );
  }

  const RENDERER_VERSION =
    "1.0.0";

  const questionTypes =
    questionnaire.questionTypes;

  /*
    ==================================================
    Basic DOM helpers
    ==================================================
  */

  function createElement(
    tagName,
    options = {}
  ) {
    const element =
      document.createElement(tagName);

    if (options.className) {
      element.className =
        options.className;
    }

    if (
      options.text !== undefined &&
      options.text !== null
    ) {
      element.textContent =
        String(options.text);
    }

    if (options.attributes) {
      Object.entries(
        options.attributes
      ).forEach(
        ([
          attributeName,
          attributeValue
        ]) => {
          if (
            attributeValue === undefined ||
            attributeValue === null ||
            attributeValue === false
          ) {
            return;
          }

          if (attributeValue === true) {
            element.setAttribute(
              attributeName,
              ""
            );

            return;
          }

          element.setAttribute(
            attributeName,
            String(attributeValue)
          );
        }
      );
    }

    return element;
  }

  function clearElement(element) {
    if (!element) {
      return;
    }

    while (element.firstChild) {
      element.removeChild(
        element.firstChild
      );
    }
  }

  function appendChildren(
    parent,
    children
  ) {
    children
      .filter(Boolean)
      .forEach(child => {
        parent.appendChild(child);
      });

    return parent;
  }

  function makeDomSafeId(value) {
    return String(value)
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]+/g,
        "-"
      )
      .replace(
        /^[-_]+|[-_]+$/g,
        ""
      );
  }

  function getQuestionDomId(
    question
  ) {
    return (
      "feed-crop-question-" +
      makeDomSafeId(question.id)
    );
  }

  function getInputName(
    question
  ) {
    return (
      "feed-crop-answer-" +
      makeDomSafeId(question.id)
    );
  }

  function serializeOptionValue(
    value
  ) {
    return JSON.stringify(value);
  }

  function deserializeOptionValue(
    serializedValue
  ) {
    try {
      return JSON.parse(
        serializedValue
      );
    } catch (error) {
      return serializedValue;
    }
  }

  function valuesMatch(
    firstValue,
    secondValue
  ) {
    return (
      serializeOptionValue(
        firstValue
      ) ===
      serializeOptionValue(
        secondValue
      )
    );
  }

  /*
    ==================================================
    Questionnaire lookup helpers
    ==================================================
  */

  function getQuestionOptions(
    question
  ) {
    return Array.isArray(
      question.options
    )
      ? question.options
      : [];
  }

  function getQuestionOption(
    question,
    optionValue
  ) {
    return (
      getQuestionOptions(
        question
      ).find(
        option =>
          valuesMatch(
            option.value,
            optionValue
          )
      ) ||
      null
    );
  }

  function getSourceQuestionOptions(
    question
  ) {
    if (
      Array.isArray(
        question.sourceOptions
      )
    ) {
      return question.sourceOptions;
    }

    return [];
  }

  function getSourceOption(
    question,
    optionValue
  ) {
    return (
      getSourceQuestionOptions(
        question
      ).find(
        option =>
          valuesMatch(
            option.value,
            optionValue
          )
      ) ||
      null
    );
  }

  function getQuestionError(
    question,
    errors
  ) {
    if (!Array.isArray(errors)) {
      return null;
    }

    return (
      errors.find(error => (
        error &&
        (
          error.questionId ===
            question.id ||
          error.answerPath ===
            question.answerPath
        )
      )) ||
      null
    );
  }

  /*
    ==================================================
    Shared question structure
    ==================================================
  */

  function createQuestionHeader(
    question
  ) {
    const header =
      createElement(
        "div",
        {
          className:
            "feed-crop-question-header"
        }
      );

    const labelRow =
      createElement(
        "div",
        {
          className:
            "feed-crop-question-label-row"
        }
      );

    const label =
      createElement(
        "h3",
        {
          className:
            "feed-crop-question-label",

          text:
            question.label
        }
      );

    label.id =
      `${getQuestionDomId(question)}-label`;

    labelRow.appendChild(label);

    if (question.required) {
      const requiredMarker =
        createElement(
          "span",
          {
            className:
              "feed-crop-required-marker",

            text:
              "Required",

            attributes: {
              "aria-label":
                "Required question"
            }
          }
        );

      labelRow.appendChild(
        requiredMarker
      );
    } else {
      const optionalMarker =
        createElement(
          "span",
          {
            className:
              "feed-crop-optional-marker",

            text:
              "Optional"
          }
        );

      labelRow.appendChild(
        optionalMarker
      );
    }

    header.appendChild(
      labelRow
    );

    if (question.helpText) {
      const helpText =
        createElement(
          "p",
          {
            className:
              "feed-crop-question-help",

            text:
              question.helpText
          }
        );

      helpText.id =
        `${getQuestionDomId(question)}-help`;

      header.appendChild(
        helpText
      );
    }

    return header;
  }

  function createValidationMessage(
    question,
    error
  ) {
    const validationElement =
      createElement(
        "div",
        {
          className:
            error
              ? "feed-crop-question-error is-visible"
              : "feed-crop-question-error",

          attributes: {
            id:
              `${getQuestionDomId(question)}-error`,

            role:
              "alert",

            "aria-live":
              "polite"
          }
        }
      );

    if (error && error.message) {
      validationElement.textContent =
        error.message;
    }

    return validationElement;
  }

  function createQuestionWrapper(
    question,
    error
  ) {
    const wrapper =
      createElement(
        "section",
        {
          className:
            error
              ? "feed-crop-question-card has-error"
              : "feed-crop-question-card",

          attributes: {
            id:
              getQuestionDomId(
                question
              ),

            "data-question-id":
              question.id,

            "data-answer-path":
              question.answerPath,

            "data-question-type":
              question.type,

            "aria-labelledby":
              `${getQuestionDomId(question)}-label`
          }
        }
      );

    if (question.helpText) {
      wrapper.setAttribute(
        "aria-describedby",
        [
          `${getQuestionDomId(question)}-help`,
          `${getQuestionDomId(question)}-error`
        ].join(" ")
      );
    } else {
      wrapper.setAttribute(
        "aria-describedby",
        `${getQuestionDomId(question)}-error`
      );
    }

    return wrapper;
  }

  /*
    ==================================================
    Number question
    ==================================================
  */

  function renderNumberQuestion(
    question,
    value
  ) {
    const control =
      createElement(
        "div",
        {
          className:
            "feed-crop-number-control"
        }
      );

    const inputId =
      `${getQuestionDomId(question)}-input`;

    const input =
      createElement(
        "input",
        {
          className:
            "feed-crop-number-input",

          attributes: {
            id:
              inputId,

            name:
              getInputName(
                question
              ),

            type:
              "number",

            inputmode:
              (
                question.input &&
                question.input.inputMode
              ) ||
              "numeric",

            autocomplete:
              (
                question.input &&
                question.input.autocomplete
              ) ||
              "off",

            placeholder:
              question.input &&
              question.input.placeholder,

            min:
              question.validation &&
              question.validation.minimum,

            max:
              question.validation &&
              question.validation.maximum,

            step:
              (
                question.validation &&
                question.validation.step
              ) ||
              1,

            required:
              question.required,

            "data-answer-input":
              "true",

            "data-answer-path":
              question.answerPath,

            "aria-describedby":
              `${getQuestionDomId(question)}-error`
          }
        }
      );

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      input.value =
        String(value);
    }

    control.appendChild(input);

    if (
      question.input &&
      question.input.suffix
    ) {
      const suffix =
        createElement(
          "span",
          {
            className:
              "feed-crop-input-suffix",

            text:
              question.input.suffix
          }
        );

      control.appendChild(
        suffix
      );
    }

    return control;
  }

  /*
    ==================================================
    Single-choice and Boolean questions
    ==================================================
  */

  function renderChoiceOption(
    question,
    option,
    currentValue,
    index
  ) {
    const serializedValue =
      serializeOptionValue(
        option.value
      );

    const optionId =
      [
        getQuestionDomId(
          question
        ),
        "option",
        index
      ].join("-");

    const label =
      createElement(
        "label",
        {
          className:
            valuesMatch(
              currentValue,
              option.value
            )
              ? "feed-crop-choice-card is-selected"
              : "feed-crop-choice-card",

          attributes: {
            for:
              optionId,

            "data-choice-card":
              "true"
          }
        }
      );

    const input =
      createElement(
        "input",
        {
          className:
            "feed-crop-choice-input",

          attributes: {
            id:
              optionId,

            name:
              getInputName(
                question
              ),

            type:
              "radio",

            required:
              question.required,

            value:
              serializedValue,

            "data-answer-input":
              "true",

            "data-answer-path":
              question.answerPath,

            "data-option-value":
              serializedValue
          }
        }
      );

    input.checked =
      valuesMatch(
        currentValue,
        option.value
      );

    const content =
      createElement(
        "span",
        {
          className:
            "feed-crop-choice-content"
        }
      );

    const title =
      createElement(
        "span",
        {
          className:
            "feed-crop-choice-title",

          text:
            option.label
        }
      );

    content.appendChild(title);

    if (option.description) {
      const description =
        createElement(
          "span",
          {
            className:
              "feed-crop-choice-description",

            text:
              option.description
          }
        );

      content.appendChild(
        description
      );
    }

    appendChildren(
      label,
      [
        input,
        content
      ]
    );

    return label;
  }

  function renderSingleChoiceQuestion(
    question,
    value
  ) {
    const group =
      createElement(
        "div",
        {
          className:
            "feed-crop-choice-grid",

          attributes: {
            role:
              "radiogroup",

            "aria-labelledby":
              `${getQuestionDomId(question)}-label`
          }
        }
      );

    getQuestionOptions(
      question
    ).forEach(
      (option, index) => {
        group.appendChild(
          renderChoiceOption(
            question,
            option,
            value,
            index
          )
        );
      }
    );

    return group;
  }

  /*
    ==================================================
    Multiple-choice questions
    ==================================================
  */

  function renderMultipleChoiceOption(
    question,
    option,
    selectedValues,
    index
  ) {
    const serializedValue =
      serializeOptionValue(
        option.value
      );

    const optionId =
      [
        getQuestionDomId(
          question
        ),
        "option",
        index
      ].join("-");

    const isSelected =
      selectedValues.some(
        selectedValue =>
          valuesMatch(
            selectedValue,
            option.value
          )
      );

    const label =
      createElement(
        "label",
        {
          className:
            isSelected
              ? "feed-crop-choice-card feed-crop-checkbox-card is-selected"
              : "feed-crop-choice-card feed-crop-checkbox-card",

          attributes: {
            for:
              optionId,

            "data-choice-card":
              "true"
          }
        }
      );

    const input =
      createElement(
        "input",
        {
          className:
            "feed-crop-choice-input",

          attributes: {
            id:
              optionId,

            name:
              getInputName(
                question
              ),

            type:
              "checkbox",

            value:
              serializedValue,

            "data-answer-input":
              "true",

            "data-answer-path":
              question.answerPath,

            "data-option-value":
              serializedValue
          }
        }
      );

    input.checked =
      isSelected;

    const content =
      createElement(
        "span",
        {
          className:
            "feed-crop-choice-content"
        }
      );

    const title =
      createElement(
        "span",
        {
          className:
            "feed-crop-choice-title",

          text:
            option.label
        }
      );

    content.appendChild(title);

    if (option.description) {
      const description =
        createElement(
          "span",
          {
            className:
              "feed-crop-choice-description",

            text:
              option.description
          }
        );

      content.appendChild(
        description
      );
    }

    appendChildren(
      label,
      [
        input,
        content
      ]
    );

    return label;
  }

  function renderMultipleChoiceQuestion(
    question,
    value
  ) {
    const selectedValues =
      Array.isArray(value)
        ? value
        : [];

    const container =
      createElement(
        "div",
        {
          className:
            "feed-crop-choice-grid feed-crop-multiple-choice-grid",

          attributes: {
            role:
              "group",

            "aria-labelledby":
              `${getQuestionDomId(question)}-label`
          }
        }
      );

    getQuestionOptions(
      question
    ).forEach(
      (option, index) => {
        container.appendChild(
          renderMultipleChoiceOption(
            question,
            option,
            selectedValues,
            index
          )
        );
      }
    );

    if (
      question.allowEmptySelection &&
      question.emptySelectionLabel
    ) {
      const emptyNote =
        createElement(
          "p",
          {
            className:
              "feed-crop-empty-selection-note",

            text:
              question.emptySelectionLabel
          }
        );

      container.appendChild(
        emptyNote
      );
    }

    return container;
  }

  /*
    ==================================================
    Ranking question
    ==================================================
  */

  function getRankedValue(
    question,
    rankingValue,
    rankNumber
  ) {
    if (!Array.isArray(rankingValue)) {
      return undefined;
    }

    const rankProperty =
      (
        question.ranking &&
        question.ranking.rankProperty
      ) ||
      "rank";

    const valueProperty =
      (
        question.ranking &&
        question.ranking.valueProperty
      ) ||
      "value";

    const rankingItem =
      rankingValue.find(
        item =>
          item &&
          Number(
            item[rankProperty]
          ) === Number(rankNumber)
      );

    return rankingItem
      ? rankingItem[valueProperty]
      : undefined;
  }

  function getRankingSourceValues(
    question,
    answers
  ) {
    if (!question.sourceAnswerPath) {
      return [];
    }

    const sourceValue =
      stateManager.getValueAtPath(
        answers,
        question.sourceAnswerPath
      );

    return Array.isArray(sourceValue)
      ? sourceValue
      : [];
  }

  function renderRankingQuestion(
    question,
    value,
    answers
  ) {
    const ranking =
      question.ranking ||
      {};

    const requiredRankCount =
      ranking.requiredRankCount ||
      3;

    const firstRank =
      ranking.firstRank ||
      1;

    const selectedSourceValues =
      getRankingSourceValues(
        question,
        answers
      );

    const container =
      createElement(
        "div",
        {
          className:
            "feed-crop-ranking-control",

          attributes: {
            "data-ranking-control":
              "true",

            "data-answer-path":
              question.answerPath
          }
        }
      );

    for (
      let index = 0;
      index < requiredRankCount;
      index += 1
    ) {
      const rankNumber =
        firstRank + index;

      const row =
        createElement(
          "div",
          {
            className:
              "feed-crop-ranking-row",

            attributes: {
              "data-ranking-row":
                String(rankNumber)
            }
          }
        );

      const rankLabel =
        createElement(
          "label",
          {
            className:
              "feed-crop-ranking-label",

            text:
              getRankLabel(
                rankNumber
              ),

            attributes: {
              for:
                `${getQuestionDomId(question)}-rank-${rankNumber}`
            }
          }
        );

      const select =
        createElement(
          "select",
          {
            className:
              "feed-crop-ranking-select",

            attributes: {
              id:
                `${getQuestionDomId(question)}-rank-${rankNumber}`,

              name:
                `${getInputName(question)}-rank-${rankNumber}`,

              required:
                question.required,

              "data-answer-input":
                "true",

              "data-ranking-input":
                "true",

              "data-answer-path":
                question.answerPath,

              "data-rank":
                String(rankNumber)
            }
          }
        );

      const placeholderOption =
        createElement(
          "option",
          {
            text:
              "Choose a goal",

            attributes: {
              value:
                ""
            }
          }
        );

      select.appendChild(
        placeholderOption
      );

      const currentRankedValue =
        getRankedValue(
          question,
          value,
          rankNumber
        );

      selectedSourceValues.forEach(
        sourceValue => {
          const sourceOption =
            getSourceOption(
              question,
              sourceValue
            );

          const option =
            createElement(
              "option",
              {
                text:
                  sourceOption
                    ? sourceOption.label
                    : String(sourceValue),

                attributes: {
                  value:
                    serializeOptionValue(
                      sourceValue
                    ),

                  "data-option-value":
                    serializeOptionValue(
                      sourceValue
                    )
                }
              }
            );

          option.selected =
            valuesMatch(
              currentRankedValue,
              sourceValue
            );

          select.appendChild(option);
        }
      );

      appendChildren(
        row,
        [
          rankLabel,
          select
        ]
      );

      container.appendChild(row);
    }

    return container;
  }

  function getRankLabel(
    rankNumber
  ) {
    switch (Number(rankNumber)) {
      case 1:
        return "1st priority";

      case 2:
        return "2nd priority";

      case 3:
        return "3rd priority";

      default:
        return `${rankNumber}th priority`;
    }
  }

  /*
    ==================================================
    Information question
    ==================================================
  */

  function renderInformationQuestion(
    question
  ) {
    return createElement(
      "div",
      {
        className:
          "feed-crop-information-box",

        text:
          question.helpText ||
          question.label ||
          ""
      }
    );
  }

  /*
    ==================================================
    Public question renderer
    ==================================================
  */

  function renderQuestion(
    question,
    value,
    options = {}
  ) {
    if (!question) {
      return null;
    }

    const answers =
      options.answers ||
      {};

    const error =
      getQuestionError(
        question,
        options.errors
      );

    const wrapper =
      createQuestionWrapper(
        question,
        error
      );

    const header =
      createQuestionHeader(
        question
      );

    const controlContainer =
      createElement(
        "div",
        {
          className:
            "feed-crop-question-control"
        }
      );

    let control =
      null;

    switch (question.type) {
      case questionTypes.NUMBER:
        control =
          renderNumberQuestion(
            question,
            value
          );
        break;

      case questionTypes.SINGLE_CHOICE:
      case questionTypes.BOOLEAN:
        control =
          renderSingleChoiceQuestion(
            question,
            value
          );
        break;

      case questionTypes.MULTIPLE_CHOICE:
        control =
          renderMultipleChoiceQuestion(
            question,
            value
          );
        break;

      case questionTypes.RANKING:
        control =
          renderRankingQuestion(
            question,
            value,
            answers
          );
        break;

      case questionTypes.INFORMATION:
        control =
          renderInformationQuestion(
            question
          );
        break;

      default:
        control =
          createElement(
            "div",
            {
              className:
                "feed-crop-renderer-error",

              text:
                `Unsupported question type: ${question.type}`
            }
          );
    }

    if (control) {
      controlContainer.appendChild(
        control
      );
    }

    const validationMessage =
      createValidationMessage(
        question,
        error
      );

    appendChildren(
      wrapper,
      [
        header,
        controlContainer,
        validationMessage
      ]
    );

    return wrapper;
  }

  /*
    ==================================================
    Section renderer
    ==================================================
  */

  function createSectionHeader(
    section
  ) {
    const header =
      createElement(
        "header",
        {
          className:
            "feed-crop-section-header"
        }
      );

    const step =
      createElement(
        "span",
        {
          className:
            "feed-crop-section-step",

          text:
            `Step ${section.stepNumber}`
        }
      );

    const title =
      createElement(
        "h2",
        {
          className:
            "feed-crop-section-title",

          text:
            section.title
        }
      );

    const description =
      createElement(
        "p",
        {
          className:
            "feed-crop-section-description",

          text:
            section.description
        }
      );

    appendChildren(
      header,
      [
        step,
        title,
        description
      ]
    );

    return header;
  }

  function renderSection(
    section,
    state,
    options = {}
  ) {
    if (!section) {
      return null;
    }

    const answers =
      (
        state &&
        state.answers
      ) ||
      state ||
      {};

    const sectionElement =
      createElement(
        "div",
        {
          className:
            "feed-crop-questionnaire-section",

          attributes: {
            "data-section-id":
              section.id,

            "data-section-step":
              section.stepNumber
          }
        }
      );

    sectionElement.appendChild(
      createSectionHeader(
        section
      )
    );

    const questionsContainer =
      createElement(
        "div",
        {
          className:
            "feed-crop-section-questions"
        }
      );

    const visibleQuestions =
      (
        section.questions ||
        []
      ).filter(
        question =>
          stateManager.isQuestionVisible(
            question,
            answers
          )
      );

    visibleQuestions.forEach(
      question => {
        const value =
          stateManager.getValueAtPath(
            answers,
            question.answerPath
          );

        const questionElement =
          renderQuestion(
            question,
            value,
            {
              answers,

              errors:
                options.errors ||
                []
            }
          );

        if (questionElement) {
          questionsContainer.appendChild(
            questionElement
          );
        }
      }
    );

    sectionElement.appendChild(
      questionsContainer
    );

    return sectionElement;
  }

  function renderSectionInto(
    container,
    section,
    state,
    options = {}
  ) {
    if (!container) {
      throw new Error(
        "A valid section container is required."
      );
    }

    clearElement(container);

    const sectionElement =
      renderSection(
        section,
        state,
        options
      );

    if (sectionElement) {
      container.appendChild(
        sectionElement
      );
    }

    return sectionElement;
  }

  /*
    ==================================================
    Progress renderer
    ==================================================
  */

  function renderProgress(
    state,
    options = {}
  ) {
    const sections =
      questionnaire.getQuestionnaireSections();

    const currentSectionId =
      (
        options.currentSectionId ||
        (
          state &&
          state.currentSectionId
        )
      );

    const currentSectionIndex =
      sections.findIndex(
        section =>
          section.id ===
          currentSectionId
      );

    const currentStep =
      currentSectionIndex >= 0
        ? currentSectionIndex + 1
        : 1;

    const progressPercent =
      sections.length > 0
        ? Math.round(
            (
              currentStep /
              sections.length
            ) *
            100
          )
        : 0;

    const progress =
      createElement(
        "div",
        {
          className:
            "feed-crop-progress",

          attributes: {
            "data-current-step":
              currentStep,

            "data-total-steps":
              sections.length
          }
        }
      );

    const summary =
      createElement(
        "div",
        {
          className:
            "feed-crop-progress-summary"
        }
      );

    const stepText =
      createElement(
        "span",
        {
          className:
            "feed-crop-progress-step-text",

          text:
            `Step ${currentStep} of ${sections.length}`
        }
      );

    const percentText =
      createElement(
        "span",
        {
          className:
            "feed-crop-progress-percent",

          text:
            `${progressPercent}%`
        }
      );

    appendChildren(
      summary,
      [
        stepText,
        percentText
      ]
    );

    const track =
      createElement(
        "div",
        {
          className:
            "feed-crop-progress-track",

          attributes: {
            role:
              "progressbar",

            "aria-valuemin":
              "0",

            "aria-valuemax":
              "100",

            "aria-valuenow":
              progressPercent,

            "aria-label":
              "Questionnaire progress"
          }
        }
      );

    const fill =
      createElement(
        "div",
        {
          className:
            "feed-crop-progress-fill"
        }
      );

    fill.style.width =
      `${progressPercent}%`;

    track.appendChild(fill);

    const steps =
      createElement(
        "ol",
        {
          className:
            "feed-crop-progress-steps"
        }
      );

    sections.forEach(
      (section, index) => {
        const isCurrent =
          section.id ===
          currentSectionId;

        const isCompleted =
          state &&
          Array.isArray(
            state.completedSectionIds
          ) &&
          state.completedSectionIds.includes(
            section.id
          );

        const stepClassNames = [
          "feed-crop-progress-step"
        ];

        if (isCurrent) {
          stepClassNames.push(
            "is-current"
          );
        }

        if (isCompleted) {
          stepClassNames.push(
            "is-completed"
          );
        }

        const step =
          createElement(
            "li",
            {
              className:
                stepClassNames.join(" "),

              attributes: {
                "data-section-id":
                  section.id,

                "aria-current":
                  isCurrent
                    ? "step"
                    : null
              }
            }
          );

        const number =
          createElement(
            "span",
            {
              className:
                "feed-crop-progress-step-number",

              text:
                isCompleted
                  ? "✓"
                  : index + 1
            }
          );

        const label =
          createElement(
            "span",
            {
              className:
                "feed-crop-progress-step-label",

              text:
                section.shortTitle ||
                section.title
            }
          );

        appendChildren(
          step,
          [
            number,
            label
          ]
        );

        steps.appendChild(step);
      }
    );

    appendChildren(
      progress,
      [
        summary,
        track,
        steps
      ]
    );

    return progress;
  }

  function renderProgressInto(
    container,
    state,
    options = {}
  ) {
    if (!container) {
      throw new Error(
        "A valid progress container is required."
      );
    }

    clearElement(container);

    const progress =
      renderProgress(
        state,
        options
      );

    container.appendChild(
      progress
    );

    return progress;
  }

  /*
    ==================================================
    Display-value helpers
    ==================================================
  */

  function getSingleChoiceDisplayValue(
    question,
    value
  ) {
    const option =
      getQuestionOption(
        question,
        value
      );

    if (option) {
      return (
        option.shortLabel ||
        option.label
      );
    }

    if (
      value === true
    ) {
      return "Yes";
    }

    if (
      value === false
    ) {
      return "No";
    }

    return value !== undefined &&
      value !== null
      ? String(value)
      : "";
  }

  function getMultipleChoiceDisplayValue(
    question,
    values
  ) {
    if (
      !Array.isArray(values) ||
      values.length === 0
    ) {
      return (
        question.emptySelectionLabel ||
        "None selected"
      );
    }

    return values
      .map(value => {
        const option =
          getQuestionOption(
            question,
            value
          );

        return option
          ? (
              option.shortLabel ||
              option.label
            )
          : String(value);
      })
      .join(", ");
  }

  function getRankingDisplayValue(
    question,
    values
  ) {
    if (
      !Array.isArray(values) ||
      values.length === 0
    ) {
      return "Not ranked";
    }

    const valueProperty =
      (
        question.ranking &&
        question.ranking.valueProperty
      ) ||
      "value";

    const rankProperty =
      (
        question.ranking &&
        question.ranking.rankProperty
      ) ||
      "rank";

    return values
      .filter(Boolean)
      .sort(
        (first, second) =>
          Number(
            first[rankProperty]
          ) -
          Number(
            second[rankProperty]
          )
      )
      .map(item => {
        const option =
          getSourceOption(
            question,
            item[valueProperty]
          );

        const label =
          option
            ? (
                option.shortLabel ||
                option.label
              )
            : String(
                item[valueProperty]
              );

        return (
          `${item[rankProperty]}. ${label}`
        );
      })
      .join(" • ");
  }

  function getDisplayValue(
    question,
    value
  ) {
    if (!question) {
      return "";
    }

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      if (question.allowNoAnswer) {
        return (
          question.noAnswerLabel ||
          "Not provided"
        );
      }

      if (
        question.type ===
          questionTypes.MULTIPLE_CHOICE
      ) {
        return (
          question.emptySelectionLabel ||
          "None selected"
        );
      }

      return "Not provided";
    }

    switch (question.type) {
      case questionTypes.NUMBER:
        return (
          question.input &&
          question.input.suffix
        )
          ? `${value} ${question.input.suffix}`
          : String(value);

      case questionTypes.SINGLE_CHOICE:
      case questionTypes.BOOLEAN:
        return getSingleChoiceDisplayValue(
          question,
          value
        );

      case questionTypes.MULTIPLE_CHOICE:
        return getMultipleChoiceDisplayValue(
          question,
          value
        );

      case questionTypes.RANKING:
        return getRankingDisplayValue(
          question,
          value
        );

      case questionTypes.INFORMATION:
        return "";

      default:
        return String(value);
    }
  }

  /*
    ==================================================
    Review-screen renderer
    ==================================================
  */

  function renderReviewItem(
    question,
    value
  ) {
    const item =
      createElement(
        "div",
        {
          className:
            "feed-crop-review-item",

          attributes: {
            "data-question-id":
              question.id,

            "data-answer-path":
              question.answerPath
          }
        }
      );

    const label =
      createElement(
        "dt",
        {
          className:
            "feed-crop-review-label",

          text:
            question.reviewLabel ||
            question.shortLabel ||
            question.label
        }
      );

    const displayValue =
      createElement(
        "dd",
        {
          className:
            "feed-crop-review-value",

          text:
            getDisplayValue(
              question,
              value
            )
        }
      );

    appendChildren(
      item,
      [
        label,
        displayValue
      ]
    );

    return item;
  }

  function renderReviewSection(
    section,
    answers
  ) {
    const sectionElement =
      createElement(
        "section",
        {
          className:
            "feed-crop-review-section",

          attributes: {
            "data-review-section-id":
              section.id
          }
        }
      );

    const heading =
      createElement(
        "div",
        {
          className:
            "feed-crop-review-section-heading"
        }
      );

    const title =
      createElement(
        "h3",
        {
          className:
            "feed-crop-review-section-title",

          text:
            section.title
        }
      );

    const editButton =
      createElement(
        "button",
        {
          className:
            "feed-crop-review-edit-button",

          text:
            "Edit",

          attributes: {
            type:
              "button",

            "data-review-edit-section":
              section.id
          }
        }
      );

    appendChildren(
      heading,
      [
        title,
        editButton
      ]
    );

    const list =
      createElement(
        "dl",
        {
          className:
            "feed-crop-review-list"
        }
      );

    (
      section.questions ||
      []
    )
      .filter(question => (
        question.type !==
          questionTypes.INFORMATION &&
        stateManager.isQuestionVisible(
          question,
          answers
        )
      ))
      .forEach(question => {
        const value =
          stateManager.getValueAtPath(
            answers,
            question.answerPath
          );

        list.appendChild(
          renderReviewItem(
            question,
            value
          )
        );
      });

    appendChildren(
      sectionElement,
      [
        heading,
        list
      ]
    );

    return sectionElement;
  }

  function renderReview(
    state,
    options = {}
  ) {
    const answers =
      (
        state &&
        state.answers
      ) ||
      state ||
      {};

    const review =
      createElement(
        "div",
        {
          className:
            "feed-crop-review"
        }
      );

    if (
      options.includeHeader !== false
    ) {
      const header =
        createElement(
          "header",
          {
            className:
              "feed-crop-review-header"
          }
        );

      const kicker =
        createElement(
          "span",
          {
            className:
              "feed-crop-review-kicker",

            text:
              "Final review"
          }
        );

      const title =
        createElement(
          "h2",
          {
            className:
              "feed-crop-review-title",

            text:
              options.title ||
              "Review Your Answers"
          }
        );

      const description =
        createElement(
          "p",
          {
            className:
              "feed-crop-review-description",

            text:
              options.description ||
              "Check your answers before the planner scores the available feed crops."
          }
        );

      appendChildren(
        header,
        [
          kicker,
          title,
          description
        ]
      );

      review.appendChild(header);
    }

    questionnaire
      .getQuestionnaireSections()
      .forEach(section => {
        review.appendChild(
          renderReviewSection(
            section,
            answers
          )
        );
      });

    return review;
  }

  function renderReviewInto(
    container,
    state,
    options = {}
  ) {
    if (!container) {
      throw new Error(
        "A valid review container is required."
      );
    }

    clearElement(container);

    const review =
      renderReview(
        state,
        options
      );

    container.appendChild(review);

    return review;
  }

  /*
    ==================================================
    Input-reading helpers

    These functions only interpret rendered controls.
    They do not update or save questionnaire state.
    ==================================================
  */

  function readNumberControl(
    questionElement
  ) {
    const input =
      questionElement.querySelector(
        'input[type="number"][data-answer-input="true"]'
      );

    if (
      !input ||
      input.value.trim() === ""
    ) {
      return undefined;
    }

    const numericValue =
      Number(input.value);

    return Number.isFinite(
      numericValue
    )
      ? numericValue
      : input.value;
  }

  function readSingleChoiceControl(
    questionElement
  ) {
    const checkedInput =
      questionElement.querySelector(
        'input[type="radio"][data-answer-input="true"]:checked'
      );

    if (!checkedInput) {
      return undefined;
    }

    return deserializeOptionValue(
      checkedInput.dataset.optionValue ||
      checkedInput.value
    );
  }

  function readMultipleChoiceControl(
    questionElement
  ) {
    return Array.from(
      questionElement.querySelectorAll(
        'input[type="checkbox"][data-answer-input="true"]:checked'
      )
    ).map(input =>
      deserializeOptionValue(
        input.dataset.optionValue ||
        input.value
      )
    );
  }

  function readRankingControl(
    question,
    questionElement
  ) {
    const valueProperty =
      (
        question.ranking &&
        question.ranking.valueProperty
      ) ||
      "value";

    const rankProperty =
      (
        question.ranking &&
        question.ranking.rankProperty
      ) ||
      "rank";

    return Array.from(
      questionElement.querySelectorAll(
        'select[data-ranking-input="true"]'
      )
    )
      .filter(select =>
        select.value !== ""
      )
      .map(select => ({
        [valueProperty]:
          deserializeOptionValue(
            select.value
          ),

        [rankProperty]:
          Number(
            select.dataset.rank
          )
      }))
      .sort(
        (first, second) =>
          Number(
            first[rankProperty]
          ) -
          Number(
            second[rankProperty]
          )
      );
  }

  function readQuestionValue(
    question,
    questionElement
  ) {
    if (
      !question ||
      !questionElement
    ) {
      return undefined;
    }

    switch (question.type) {
      case questionTypes.NUMBER:
        return readNumberControl(
          questionElement
        );

      case questionTypes.SINGLE_CHOICE:
      case questionTypes.BOOLEAN:
        return readSingleChoiceControl(
          questionElement
        );

      case questionTypes.MULTIPLE_CHOICE:
        return readMultipleChoiceControl(
          questionElement
        );

      case questionTypes.RANKING:
        return readRankingControl(
          question,
          questionElement
        );

      case questionTypes.INFORMATION:
        return undefined;

      default:
        return undefined;
    }
  }

  /*
    ==================================================
    Visual selection helpers

    The public UI can call this after an input changes
    to refresh selected-card classes without rebuilding
    the entire section.
    ==================================================
  */

  function refreshChoiceCardStates(
    container
  ) {
    if (!container) {
      return;
    }

    container
      .querySelectorAll(
        "[data-choice-card]"
      )
      .forEach(card => {
        const input =
          card.querySelector(
            "input"
          );

        card.classList.toggle(
          "is-selected",
          Boolean(
            input &&
            input.checked
          )
        );
      });
  }

  function focusFirstQuestionError(
    container
  ) {
    if (!container) {
      return false;
    }

    const firstError =
      container.querySelector(
        ".feed-crop-question-card.has-error"
      );

    if (!firstError) {
      return false;
    }

    firstError.scrollIntoView({
      behavior:
        "smooth",

      block:
        "center"
    });

    const firstControl =
      firstError.querySelector(
        "input, select, button, textarea"
      );

    if (firstControl) {
      firstControl.focus({
        preventScroll:
          true
      });
    }

    return true;
  }

  /*
    ==================================================
    Namespace export
    ==================================================
  */

  namespace.questionnaireRenderer =
    Object.freeze({
      version:
        RENDERER_VERSION,

      createElement,

      clearElement,

      appendChildren,

      makeDomSafeId,

      serializeOptionValue,

      deserializeOptionValue,

      valuesMatch,

      getQuestionOption,

      getDisplayValue,

      renderQuestion,

      renderSection,

      renderSectionInto,

      renderProgress,

      renderProgressInto,

      renderReview,

      renderReviewSection,

      renderReviewInto,

      readQuestionValue,

      refreshChoiceCardStates,

      focusFirstQuestionError
    });

})(window);