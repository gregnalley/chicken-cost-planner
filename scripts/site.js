"use strict";

/*
  Backyard Chicken Planner
  Shared Site Script Loader

  Loads shared data and component scripts from the
  website root, regardless of which folder contains
  the current HTML page.
*/

(function initializeSiteScriptLoader(global) {

  // Returns the correct website root for GitHub Pages or a custom domain.
  function getSiteRootPath() {
    const hostname =
      global.location.hostname;

    const pathParts =
      global.location.pathname
        .split("/")
        .filter(Boolean);

    /*
      GitHub project sites use a repository folder:

      gregnalley.github.io/chicken-cost-planner/

      On GitHub Pages, the first URL folder is therefore
      the project root.
    */
    if (
      hostname.endsWith(
        "github.io"
      ) &&
      pathParts.length > 0
    ) {
      return `/${pathParts[0]}/`;
    }

    /*
      Custom domains and most local development servers
      use the normal website root.
    */
    return "/";
  }

  // Converts a project-relative file path into a complete site URL.
  function buildSiteScriptUrl(
    relativePath
  ) {
    const cleanPath =
      String(relativePath)
        .replace(/^\/+/, "");

    return (
      getSiteRootPath() +
      cleanPath
    );
  }

  // Loads one JavaScript file and reports whether it succeeded.
  function loadScript(
    relativePath
  ) {
    return new Promise(
      function loadScriptPromise(
        resolve,
        reject
      ) {
        const script =
          document.createElement(
            "script"
          );

        const scriptUrl =
          buildSiteScriptUrl(
            relativePath
          );

        script.src =
          scriptUrl;

        script.onload =
          function handleScriptLoad() {
            resolve(scriptUrl);
          };

        script.onerror =
          function handleScriptError() {
            reject(
              new Error(
                "Failed to load script: " +
                scriptUrl
              )
            );
          };

        document.head.appendChild(
          script
        );
      }
    );
  }

  // Runs shared component functions after all supporting scripts load.
  function initializeSharedComponents() {
    if (
      typeof global.loadNavigation ===
      "function"
    ) {
      global.loadNavigation();
    }

    if (
      typeof global.loadFooter ===
      "function"
    ) {
      global.loadFooter();
    }

    if (
      typeof global
        .loadHealthDisclaimer ===
      "function"
    ) {
      global.loadHealthDisclaimer();
    }

    if (
      typeof global
        .renderCollections ===
      "function"
    ) {
      global.renderCollections();
    }

    if (
      typeof global
        .renderProductCards ===
      "function"
    ) {
      global.renderProductCards();
    }
  }

  // Loads shared data files before loading the scripts that use them.
  async function loadSiteScripts() {
    try {
      await loadScript(
        "assets/data/products.js"
      );

      await loadScript(
        "assets/data/collections.js"
      );

      await loadScript(
        "assets/data/messages.js"
      );

      await loadScript(
        "scripts/load-components.js"
      );

      await loadScript(
        "scripts/product-loader.js"
      );

      await loadScript(
        "scripts/collection-loader.js"
      );

      await loadScript(
        "scripts/message-loader.js"
      );

      await loadScript(
        "scripts/calculator-effects.js"
      );

      await loadScript(
        "scripts/tracking.js"
      );

      initializeSharedComponents();

    } catch (error) {
      console.error(
        "Site script loading error:",
        error
      );
    }
  }

  loadSiteScripts();

})(window);