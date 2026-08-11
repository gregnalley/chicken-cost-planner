"use strict";

/*
  Backyard Chicken Planner
  Shared Long-Form Guide Navigation

  Purpose:
  - Build a sticky guide navigation automatically
  - Read navigation sections directly from page markup
  - Highlight the section currently being viewed
  - Mark earlier sections as passed
  - Smooth-scroll to selected sections
  - Keep the system generic for crop guides and other long-form pages

  Page requirements:
  1. Outer guide wrapper:
     data-guide-name="Amaranth Guide"

  2. Sections that should appear in navigation:
     class="guide-nav-section"
     id="unique-section-id"
     data-guide-title="Short Navigation Title"
*/

(function initializeGuideNavigation() {

  const GUIDE_SELECTOR =
    ".growing-guide-page[data-guide-name]";

  const SECTION_SELECTOR =
    ".guide-nav-section[id]";

  const ACTIVE_OFFSET =
    175;


  function initialize() {

    const guidePage =
      document.querySelector(
        GUIDE_SELECTOR
      );

    if (!guidePage) {

      return;

    }


    const content =
      Array.from(
        guidePage.children
      ).find(function(child) {

        return child.classList &&
          child.classList.contains(
            "content"
          );

      });


    if (!content) {

      return;

    }


    const sections =
      Array.from(
        content.querySelectorAll(
          SECTION_SELECTOR
        )
      );


    if (!sections.length) {

      return;

    }


    const guideName =
      guidePage.dataset.guideName ||
      "Guide Contents";


    /*
      Build layout shell.

      This moves the existing .content element
      inside a wrapper beside the navigation.

      The footer remains outside the shell.
    */

    const layout =
      document.createElement(
        "div"
      );

    layout.className =
      "guide-navigation-layout";


    const sidebar =
      buildSidebar(
        guideName,
        sections
      );


    guidePage.insertBefore(
      layout,
      content
    );


    layout.appendChild(
      sidebar
    );

    layout.appendChild(
      content
    );


    guidePage.classList.add(
      "guide-navigation-enabled"
    );


    setupNavigationLinks(
      sidebar,
      sections
    );


    setupActiveSectionTracking(
      sidebar,
      sections
    );


    setupBackToTop(
      sidebar
    );

  }


  function buildSidebar(
    guideName,
    sections
  ) {

    const aside =
      document.createElement(
        "aside"
      );

    aside.className =
      "guide-navigation-sidebar";


    const nav =
      document.createElement(
        "nav"
      );

    nav.className =
      "guide-navigation";

    nav.setAttribute(
      "aria-label",
      guideName
    );


    const heading =
      document.createElement(
        "div"
      );

    heading.className =
      "guide-navigation-heading";


    const headingIcon =
      document.createElement(
        "span"
      );

    headingIcon.className =
      "guide-navigation-heading-icon";

    headingIcon.setAttribute(
      "aria-hidden",
      "true"
    );

    headingIcon.textContent =
      "📖";


    const headingText =
      document.createElement(
        "strong"
      );

    headingText.textContent =
      guideName;


    heading.appendChild(
      headingIcon
    );

    heading.appendChild(
      headingText
    );


    const list =
      document.createElement(
        "ul"
      );

    list.className =
      "guide-navigation-list";


    sections.forEach(
      function(section, index) {

        const item =
          document.createElement(
            "li"
          );

        item.className =
          "guide-navigation-item";


        const link =
          document.createElement(
            "a"
          );

        link.className =
          "guide-navigation-link";

        link.href =
          "#" + section.id;

        link.dataset.sectionId =
          section.id;

        link.dataset.sectionIndex =
          String(index);


        const indicator =
          document.createElement(
            "span"
          );

        indicator.className =
          "guide-navigation-indicator";

        indicator.setAttribute(
          "aria-hidden",
          "true"
        );

        indicator.textContent =
          "○";


        const label =
          document.createElement(
            "span"
          );

        label.className =
          "guide-navigation-label";

        label.textContent =
          getSectionTitle(
            section
          );


        link.appendChild(
          indicator
        );

        link.appendChild(
          label
        );

        item.appendChild(
          link
        );

        list.appendChild(
          item
        );

      }
    );


    const bottom =
      document.createElement(
        "div"
      );

    bottom.className =
      "guide-navigation-bottom";


    const topLink =
      document.createElement(
        "a"
      );

    topLink.className =
      "guide-navigation-top-link";

    topLink.href =
      "#";

    topLink.innerHTML =
      '<span aria-hidden="true">↑</span> Back to Top';


    bottom.appendChild(
      topLink
    );


    nav.appendChild(
      heading
    );

    nav.appendChild(
      list
    );

    nav.appendChild(
      bottom
    );

    aside.appendChild(
      nav
    );


    return aside;

  }


  function getSectionTitle(
    section
  ) {

    if (
      section.dataset.guideTitle
    ) {

      return section.dataset.guideTitle;

    }


    const heading =
      section.querySelector(
        "h2"
      );


    if (heading) {

      return heading.textContent
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    }


    return section.id
      .replace(
        /-/g,
        " "
      )
      .replace(
        /\b\w/g,
        function(character) {

          return character.toUpperCase();

        }
      );

  }


  function setupNavigationLinks(
    sidebar,
    sections
  ) {

    const links =
      sidebar.querySelectorAll(
        ".guide-navigation-link"
      );


    links.forEach(
      function(link) {

        link.addEventListener(
          "click",
          function(event) {

            const sectionId =
              link.dataset.sectionId;

            const target =
              document.getElementById(
                sectionId
              );


            if (!target) {

              return;

            }


            event.preventDefault();


            target.scrollIntoView({
              behavior:
                "smooth",

              block:
                "start"
            });


            if (
              window.history &&
              window.history.pushState
            ) {

              window.history.pushState(
                null,
                "",
                "#" + sectionId
              );

            }

          }
        );

      }
    );

  }


  function setupActiveSectionTracking(
    sidebar,
    sections
  ) {

    const links =
      Array.from(
        sidebar.querySelectorAll(
          ".guide-navigation-link"
        )
      );


    let activeIndex =
      -1;

    let ticking =
      false;


    function updateNavigationState() {

      ticking =
        false;


      const scrollPosition =
        window.scrollY +
        ACTIVE_OFFSET;


      let nextActiveIndex =
        0;


      sections.forEach(
        function(section, index) {

          const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;


          if (
            sectionTop <=
            scrollPosition
          ) {

            nextActiveIndex =
              index;

          }

        }
      );


      if (
        activeIndex ===
        nextActiveIndex
      ) {

        return;

      }


      activeIndex =
        nextActiveIndex;


      links.forEach(
        function(link, index) {

          const indicator =
            link.querySelector(
              ".guide-navigation-indicator"
            );


          link.classList.remove(
            "is-active",
            "is-past"
          );


          link.removeAttribute(
            "aria-current"
          );


          if (
            index <
            activeIndex
          ) {

            link.classList.add(
              "is-past"
            );


            if (indicator) {

              indicator.textContent =
                "✓";

            }

          }
          else if (
            index ===
            activeIndex
          ) {

            link.classList.add(
              "is-active"
            );

            link.setAttribute(
              "aria-current",
              "location"
            );


            if (indicator) {

              indicator.textContent =
                "▶";

            }


            keepActiveLinkVisible(
              link,
              sidebar
            );

          }
          else {

            if (indicator) {

              indicator.textContent =
                "○";

            }

          }

        }
      );

    }


    function requestUpdate() {

      if (ticking) {

        return;

      }


      ticking =
        true;


      window.requestAnimationFrame(
        updateNavigationState
      );

    }


    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive:
          true
      }
    );


    window.addEventListener(
      "resize",
      requestUpdate
    );


    updateNavigationState();

  }


  function keepActiveLinkVisible(
    link,
    sidebar
  ) {

    const nav =
      sidebar.querySelector(
        ".guide-navigation"
      );


    if (!nav) {

      return;

    }


    const linkRect =
      link.getBoundingClientRect();

    const navRect =
      nav.getBoundingClientRect();


    const upperLimit =
      navRect.top +
      70;

    const lowerLimit =
      navRect.bottom -
      55;


    if (
      linkRect.top <
      upperLimit
    ) {

      link.scrollIntoView({
        block:
          "nearest"
      });

    }
    else if (
      linkRect.bottom >
      lowerLimit
    ) {

      link.scrollIntoView({
        block:
          "nearest"
      });

    }

  }


  function setupBackToTop(
    sidebar
  ) {

    const topLink =
      sidebar.querySelector(
        ".guide-navigation-top-link"
      );


    if (!topLink) {

      return;

    }


    topLink.addEventListener(
      "click",
      function(event) {

        event.preventDefault();


        window.scrollTo({
          top:
            0,

          behavior:
            "smooth"
        });


        if (
          window.history &&
          window.history.replaceState
        ) {

          window.history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search
          );

        }

      }
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  }
  else {

    initialize();

  }

})();