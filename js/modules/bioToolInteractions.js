import {
  calculatePunnettSquare,
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
 * Punnett Square Interaction Logic
 */
function attachPunnettListeners() {
  const p1Input = document.getElementById("punnett-p1");
  const p2Input = document.getElementById("punnett-p2");
  const gridContainer = document.getElementById("punnett-main-grid");
  const topAllelesCont = document.getElementById("punnett-top-alleles");
  const leftAllelesCont = document.getElementById("punnett-left-alleles");
  const genoRatioVal = document.getElementById("genotypic-ratio");
  const phenoRatioVal = document.getElementById("phenotypic-ratio");

  if (!p1Input || !p2Input) return;

  const update = () => {
    const p1 = p1Input.value;
    const p2 = p2Input.value;
    const result = calculatePunnettSquare(p1, p2);

    if (!result) return;

    // Update Top/Left Labels
    topAllelesCont.innerHTML = result.p1.map(a => `<span>${a}</span>`).join("");
    leftAllelesCont.innerHTML = result.p2.map(a => `<span>${a}</span>`).join("");

    // Update Grid
    gridContainer.innerHTML = result.grid.flat().map(geno => {
        const isDominant = geno.split("").some(a => a === a.toUpperCase());
        return `<div class="punnett-cell ${isDominant ? 'dominant' : ''}">${geno}<span class="ratio">25%</span></div>`;
    }).join("");

    // Update Ratios
    const genos = result.stats.map(s => `${s.genotype} (${s.percentage}%)`).join(", ");
    genoRatioVal.textContent = genos;

    const dom = result.stats.filter(s => s.phenotype === "Dominant").reduce((a, b) => a + b.percentage, 0);
    const rec = 100 - dom;
    phenoRatioVal.textContent = `Dominant: ${dom}% | Recessive: ${rec}%`;
  };

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
