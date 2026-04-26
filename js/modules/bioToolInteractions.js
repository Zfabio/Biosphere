import {
  calculatePunnettSquare,
  calculateDihybridSquare,
  translateNucleicAcid,
  calculateBioMass,
} from "./biologyTools.js";
import { t } from "./langController.js";

const TOOL_LISTENER_MAP = {
  punnett: attachPunnettListeners,
  "dna-translator": attachDNAListeners,
  "biomolecule-mass": attachBiomoleculeListeners,
  "cell-simulator": attachCellSimListeners,
};

export function attachToolEventListeners(toolType) {
  TOOL_LISTENER_MAP[toolType]?.();
}

/**
 * Punnett Square Interaction Logic (Mono + Dihybrid)
 */
function attachPunnettListeners() {
  const p1Input = document.getElementById("punnett-p1");
  const p2Input = document.getElementById("punnett-p2");
  const gridContainer = document.getElementById("punnett-main-grid");
  const gridWrapper = document.querySelector(".punnett-grid-container");
  const topAllelesCont = document.getElementById("punnett-top-alleles");
  const leftAllelesCont = document.getElementById("punnett-left-alleles");
  const genoRatioVal = document.getElementById("genotypic-ratio");
  const phenoRatioVal = document.getElementById("phenotypic-ratio");
  const phenoBar = document.getElementById("pheno-bar");
  const modeBtns = document.querySelectorAll(".mode-btn");

  if (!p1Input || !p2Input) return;

  let currentMode = "mono";

  // Mode toggle
  modeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;

      // Update placeholders and defaults
      if (currentMode === "di") {
        p1Input.value = "AaBb";
        p2Input.value = "AaBb";
        p1Input.maxLength = 4;
        p2Input.maxLength = 4;
        gridWrapper.classList.remove("mono");
        gridWrapper.classList.add("di");
        gridContainer.classList.remove("mono");
        gridContainer.classList.add("di");
      } else {
        p1Input.value = "Aa";
        p2Input.value = "Aa";
        p1Input.maxLength = 2;
        p2Input.maxLength = 2;
        gridWrapper.classList.remove("di");
        gridWrapper.classList.add("mono");
        gridContainer.classList.remove("di");
        gridContainer.classList.add("mono");
      }
      update();
    });
  });

  const PHENO_COLORS = {
    "Both Dominant": "#10b981",
    "Trait 1 Dom": "#3b82f6",
    "Trait 2 Dom": "#eab308",
    "Both Recessive": "#ef4444",
    "Dominant": "#10b981",
    "Recessive": "#ef4444",
  };

  const update = () => {
    const p1 = p1Input.value;
    const p2 = p2Input.value;

    if (currentMode === "di") {
      updateDihybrid(p1, p2);
    } else {
      updateMonohybrid(p1, p2);
    }
  };

  function updateMonohybrid(p1, p2) {
    const result = calculatePunnettSquare(p1, p2);
    if (!result) return;

    topAllelesCont.innerHTML = result.p1.map(a => `<span>${a}</span>`).join("");
    leftAllelesCont.innerHTML = result.p2.map(a => `<span>${a}</span>`).join("");

    gridContainer.innerHTML = result.grid.flat().map((geno, i) => {
      const isDominant = geno.split("").some(a => a === a.toUpperCase());
      return `<div class="punnett-cell ${isDominant ? 'dominant' : ''}" style="animation-delay: ${i * 50}ms">${geno}<span class="ratio">25%</span></div>`;
    }).join("");

    const genos = result.stats.map(s => `${s.genotype} (${s.percentage}%)`).join(", ");
    genoRatioVal.textContent = genos;

    const dom = result.stats.filter(s => s.phenotype === "Dominant").reduce((a, b) => a + b.percentage, 0);
    const rec = 100 - dom;
    phenoRatioVal.textContent = `Dominant: ${dom}% | Recessive: ${rec}%`;

    if (phenoBar) {
      phenoBar.innerHTML = `
        <div class="pheno-bar-segment" style="width: ${dom}%; background: ${PHENO_COLORS.Dominant};">${dom}%</div>
        <div class="pheno-bar-segment" style="width: ${rec}%; background: ${PHENO_COLORS.Recessive};">${rec}%</div>
      `;
    }
  }

  function updateDihybrid(p1, p2) {
    const result = calculateDihybridSquare(p1, p2);
    if (!result) return;

    topAllelesCont.innerHTML = result.gametes1.map(g => `<span style="font-size: 0.75rem">${g}</span>`).join("");
    leftAllelesCont.innerHTML = result.gametes2.map(g => `<span style="font-size: 0.75rem">${g}</span>`).join("");

    const cellClass = (geno) => {
      const t1Dom = geno[0] === geno[0].toUpperCase();
      const t2Dom = geno[2] === geno[2].toUpperCase();
      if (t1Dom && t2Dom) return "dominant";
      if (t1Dom) return "t1-dom";
      if (t2Dom) return "t2-dom";
      return "recessive";
    };

    gridContainer.innerHTML = result.grid.flat().map((geno, i) => {
      return `<div class="punnett-cell ${cellClass(geno)}" style="animation-delay: ${i * 30}ms">${geno}<span class="ratio">${(100/16).toFixed(1)}%</span></div>`;
    }).join("");

    // Genotypic ratio
    const genoRatios = result.stats.map(s => `${s.genotype}: ${s.count}`).join(", ");
    genoRatioVal.textContent = genoRatios;

    // Phenotypic ratio
    const phenoRatios = result.phenoStats.map(s => `${s.phenotype}: ${s.count}`).join(" | ");
    phenoRatioVal.textContent = phenoRatios;

    if (phenoBar) {
      phenoBar.innerHTML = result.phenoStats.map(s => {
        const pct = ((s.count / 16) * 100).toFixed(0);
        return `<div class="pheno-bar-segment" style="width: ${pct}%; background: ${PHENO_COLORS[s.phenotype] || '#94a3b8'};">${pct}%</div>`;
      }).join("");
    }
  }

  p1Input.addEventListener("input", update);
  p2Input.addEventListener("input", update);
  update();
}

/**
 * DNA Translator Interaction Logic
 */
function attachDNAListeners() {
  const dnaInput = document.getElementById("dna-input");
  const dnaDisplay = document.getElementById("dna-display");
  const rnaDisplay = document.getElementById("rna-display");
  const proteinDisplay = document.getElementById("protein-display");
  const clearBtn = document.getElementById("dna-clear");
  const sampleBtns = document.querySelectorAll(".bio-sample-btn");

  if (!dnaInput) return;

  const update = () => {
    const seq = dnaInput.value;
    const result = translateNucleicAcid(seq);

    dnaDisplay.textContent = result.dna || "---";
    rnaDisplay.textContent = result.rna || "---";
    proteinDisplay.textContent = result.protein || "---";
  };

  dnaInput.addEventListener("input", update);
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      dnaInput.value = "";
      update();
    });
  }

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dnaInput.value = btn.dataset.seq;
      update();
    });
  });

  update();
}

/**
 * Biomolecule Mass Interaction Logic
 */
function attachBiomoleculeListeners() {
  const seqInput = document.getElementById("mass-sequence-input");
  const typeBtns = document.querySelectorAll(".type-btn");
  const massVal = document.getElementById("mass-result-val");
  const lengthVal = document.getElementById("mol-length");
  
  let currentType = "protein";

  if (!seqInput) return;

  const update = () => {
    const result = calculateBioMass(seqInput.value, currentType);
    massVal.textContent = result.total;
    lengthVal.textContent = result.count;
  };

  seqInput.addEventListener("input", update);

  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      typeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.dataset.type;
      update();
    });
  });

  update();
}

/**
 * Cell Simulator Placeholder Interaction
 */
function attachCellSimListeners() {
  const organelles = document.querySelectorAll(".organelle");
  organelles.forEach(org => {
    org.addEventListener("click", () => {
      org.style.transform = "scale(1.5)";
      setTimeout(() => org.style.transform = "", 500);
      // Future: Show info about the organelle
    });
  });
}
