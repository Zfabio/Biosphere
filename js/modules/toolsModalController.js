// Tools Modal Controller - Feature modal and biological tool card wiring
// =============================================================================

import { onLangChange, t } from "./langController.js";

function getToolHelpMarkup(toolType) {
  if (toolType === "punnett") {
    return `
      <h3>${t("toolModal.punnettHelpTitle") || "Punnett Square Help"}</h3>
      <p>${t("toolModal.punnettHelpIntro") || "Predict genetic outcomes using Punnett squares."}</p>
      <ul>
        <li>Enter parental genotypes (e.g., 'Aa' for monohybrid, 'AaBb' for dihybrid).</li>
        <li>Capital letters represent dominant alleles, lowercase represent recessive.</li>
        <li>Switch between Monohybrid and Dihybrid modes using the toggle.</li>
      </ul>
    `;
  }
  if (toolType === "dna-translator") {
    return `
      <h3>${t("toolModal.dnaHelpTitle") || "DNA Translator Help"}</h3>
      <p>Convert DNA sequences into mRNA and then into protein polypeptide chains.</p>
      <ul>
        <li>Enter a DNA sequence (A, T, C, G).</li>
        <li>Animation highlights each codon being translated.</li>
        <li>Stop codons automatically terminate the translation process.</li>
      </ul>
    `;
  }

  return `
    <h3>${t("toolModal.helpTitle")}</h3>
    <p>${t("toolModal.helpBody")}</p>
  `;
}

export function createToolsModalController(options = {}) {
  const { getToolContent, attachToolEventListeners } = options;

  let modalHandlersInitialized = false;
  const toolContentCache = new Map();
  let openRequestToken = 0;
  let activeToolType = null;

  function getModalElements() {
    return {
      modal: document.getElementById("feature-modal"),
      closeButton: document.getElementById("feature-modal-close"),
      helpButton: document.getElementById("feature-modal-help"),
      helpOverlay: document.getElementById("feature-help-overlay"),
      helpCloseButton: document.getElementById("feature-help-close"),
      helpContent: document.querySelector("#feature-help-overlay .help-content"),
      body: document.getElementById("feature-modal-body"),
    };
  }

  function setToolHelpContent(toolType) {
    const { helpContent } = getModalElements();
    if (!helpContent) return;
    helpContent.innerHTML = getToolHelpMarkup(toolType);
  }

  async function getCachedToolContent(toolType) {
    if (!toolType || typeof getToolContent !== "function") return "";
    if (!toolContentCache.has(toolType)) {
      const contentPromise = Promise.resolve(getToolContent(toolType))
        .then((content) => content || "")
        .catch((error) => {
          toolContentCache.delete(toolType);
          throw error;
        });

      toolContentCache.set(toolType, contentPromise);
    }

    return toolContentCache.get(toolType);
  }

  function closeToolModal() {
    const { modal, helpOverlay } = getModalElements();
    if (!modal) return;
    openRequestToken += 1;
    activeToolType = null;
    modal.classList.remove("active");
    document.body.classList.remove("hide-nav");
    if (helpOverlay) helpOverlay.style.display = "none";
  }

  function clearToolContentCache() {
    toolContentCache.clear();
  }

  function initFeatureModalHandlers() {
    if (modalHandlersInitialized) return;

    const {
      modal,
      closeButton,
      helpButton,
      helpOverlay,
      helpCloseButton,
    } = getModalElements();

    if (closeButton) {
      closeButton.addEventListener("click", closeToolModal);
    }

    // Help button (?) toggle
    if (helpButton && helpOverlay) {
      helpButton.addEventListener("click", () => {
        // Tutorials for bio tools could be added here later if needed
        helpOverlay.style.display = helpOverlay.style.display === "none" ? "flex" : "none";
      });
    }
    if (helpCloseButton && helpOverlay) {
      helpCloseButton.addEventListener("click", () => {
        helpOverlay.style.display = "none";
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (window._bioIsDragging) return;
        if (e.target === modal) closeToolModal();
      });
    }

    modalHandlersInitialized = true;
  }

  async function openToolModal(toolType) {
    const { modal, body, helpOverlay } = getModalElements();
    if (!modal || !body) {
      return;
    }

    activeToolType = toolType;
    modal.classList.add("active");
    document.body.classList.add("hide-nav");
    if (helpOverlay) helpOverlay.style.display = "none";
    setToolHelpContent(toolType);
    body.innerHTML = `<div class="tool-modal-loading">${t("toolModal.loading")}</div>`;

    const requestToken = ++openRequestToken;

    try {
      const content = await getCachedToolContent(toolType);
      if (!content || requestToken !== openRequestToken) return;

      body.innerHTML = content;

      if (typeof attachToolEventListeners === "function") {
        requestAnimationFrame(() => {
          attachToolEventListeners(toolType);
        });
      }
    } catch (error) {
      if (requestToken !== openRequestToken) return;

      body.innerHTML = `
        <div class="tool-modal-loading tool-modal-loading-error">
          <strong>${t("toolModal.errorTitle")}</strong>
          <span>${t("toolModal.errorMsg")}</span>
        </div>
      `;
      console.error("Tool modal load error:", error);
    }
  }

  function activateToolCard(card) {
    const toolType = card?.dataset.tool;
    if (!toolType) return;
    openToolModal(toolType);
  }

  function bindToolCard(card) {
    if (!card || card.dataset.toolBound === "true") return;

    const handleActivate = () => activateToolCard(card);

    card.addEventListener("click", handleActivate);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleActivate();
    });

    if (!card.hasAttribute("tabindex")) {
      card.tabIndex = 0;
    }
    card.setAttribute("role", "button");
    card.dataset.toolBound = "true";
  }

  function initBioToolCards() {
    const toolsGrid = document.querySelector(".bio-tools-grid");
    if (!toolsGrid) return;

    toolsGrid
      .querySelectorAll(".bio-tool-card[data-tool]")
      .forEach(bindToolCard);
  }

  function init() {
    initFeatureModalHandlers();
    initBioToolCards();
    onLangChange(() => {
      const { modal } = getModalElements();
      if (modal?.classList.contains("active") && activeToolType) {
        openToolModal(activeToolType);
      } else {
        setToolHelpContent(activeToolType);
      }
    });
  }

  return {
    init,
    initBioToolCards,
    openToolModal,
    closeToolModal,
    clearToolContentCache,
  };
}
