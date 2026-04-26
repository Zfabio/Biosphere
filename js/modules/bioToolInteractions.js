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
 * DNA Translator with Animated Codon-by-Codon Translation
 */
function attachDNAListeners() {
  const dnaInput = document.getElementById("dna-input");
  const dnaDisplay = document.getElementById("dna-display");
  const rnaDisplay = document.getElementById("rna-display");
  const proteinDisplay = document.getElementById("protein-display");
  const clearBtn = document.getElementById("dna-clear");
  const sampleBtns = document.querySelectorAll(".bio-sample-btn");
  const animateBtn = document.getElementById("dna-animate-btn");
  const instantBtn = document.getElementById("dna-instant-btn");
  const statusEl = document.getElementById("dna-anim-status");

  if (!dnaInput) return;

  let animTimer = null;

  const NUC_CLASS = { A: 'nuc-A', T: 'nuc-T', G: 'nuc-G', C: 'nuc-C', U: 'nuc-U' };

  function colorNucs(seq, type) {
    return seq.split('').map(n => `<span class="nuc ${NUC_CLASS[n] || ''}">${n}</span>`).join('');
  }

  function colorCodons(rna) {
    const codons = rna.match(/.{1,3}/g) || [];
    return codons.map((c, i) =>
      `<span class="codon-group" data-idx="${i}">${c.split('').map(n => `<span class="nuc ${NUC_CLASS[n] || ''}">${n}</span>`).join('')}</span>`
    ).join('');
  }

  const CODON_TABLE = {
    'UUU':'Phe','UUC':'Phe','UUA':'Leu','UUG':'Leu','UCU':'Ser','UCC':'Ser','UCA':'Ser','UCG':'Ser',
    'UAU':'Tyr','UAC':'Tyr','UAA':'STOP','UAG':'STOP','UGU':'Cys','UGC':'Cys','UGA':'STOP','UGG':'Trp',
    'CUU':'Leu','CUC':'Leu','CUA':'Leu','CUG':'Leu','CCU':'Pro','CCC':'Pro','CCA':'Pro','CCG':'Pro',
    'CAU':'His','CAC':'His','CAA':'Gln','CAG':'Gln','CGU':'Arg','CGC':'Arg','CGA':'Arg','CGG':'Arg',
    'AUU':'Ile','AUC':'Ile','AUA':'Ile','AUG':'Met','ACU':'Thr','ACC':'Thr','ACA':'Thr','ACG':'Thr',
    'AAU':'Asn','AAC':'Asn','AAA':'Lys','AAG':'Lys','AGU':'Ser','AGC':'Ser','AGA':'Arg','AGG':'Arg',
    'GUU':'Val','GUC':'Val','GUA':'Val','GUG':'Val','GCU':'Ala','GCC':'Ala','GCA':'Ala','GCG':'Ala',
    'GAU':'Asp','GAC':'Asp','GAA':'Glu','GAG':'Glu','GGU':'Gly','GGC':'Gly','GGA':'Gly','GGG':'Gly',
  };

  function instantUpdate() {
    if (animTimer) { clearInterval(animTimer); animTimer = null; }
    const seq = dnaInput.value.toUpperCase().replace(/[^ATCG]/g, '');
    const rna = seq.replace(/T/g, 'U');
    dnaDisplay.innerHTML = colorNucs(seq) || '---';
    rnaDisplay.innerHTML = colorCodons(rna) || '---';

    const codons = rna.match(/.{1,3}/g) || [];
    const chain = [];
    for (const c of codons) {
      if (c.length < 3) continue;
      const aa = CODON_TABLE[c];
      if (!aa) continue;
      if (aa === 'STOP') { chain.push(`<span class="amino-pill stop">STOP</span>`); break; }
      const cls = aa === 'Met' ? 'met' : 'normal';
      chain.push(`<span class="amino-pill ${cls}">${aa}</span>`);
    }
    proteinDisplay.innerHTML = chain.join('') || '---';
    if (statusEl) statusEl.textContent = '';
  }

  function animateTranslation() {
    if (animTimer) { clearInterval(animTimer); animTimer = null; }
    const seq = dnaInput.value.toUpperCase().replace(/[^ATCG]/g, '');
    const rna = seq.replace(/T/g, 'U');
    dnaDisplay.innerHTML = colorNucs(seq) || '---';
    rnaDisplay.innerHTML = colorCodons(rna) || '---';
    proteinDisplay.innerHTML = '';

    const codons = rna.match(/.{1,3}/g) || [];
    let idx = 0;

    if (statusEl) statusEl.textContent = 'Translating...';

    animTimer = setInterval(() => {
      if (idx >= codons.length || codons[idx].length < 3) {
        clearInterval(animTimer);
        animTimer = null;
        if (statusEl) statusEl.textContent = 'Translation complete ✓';
        return;
      }

      // Highlight active codon
      const groups = rnaDisplay.querySelectorAll('.codon-group');
      groups.forEach(g => g.classList.remove('active'));
      if (groups[idx]) groups[idx].classList.add('active');

      const aa = CODON_TABLE[codons[idx]];
      if (aa === 'STOP') {
        proteinDisplay.innerHTML += `<span class="amino-pill stop" style="animation-delay: 0ms">STOP</span>`;
        clearInterval(animTimer);
        animTimer = null;
        if (statusEl) statusEl.textContent = 'Stop codon reached ■';
        return;
      }
      const cls = aa === 'Met' ? 'met' : 'normal';
      proteinDisplay.innerHTML += `<span class="amino-pill ${cls}" style="animation-delay: 0ms">${aa || '?'}</span>`;
      idx++;
    }, 400);
  }

  if (animateBtn) animateBtn.addEventListener("click", animateTranslation);
  if (instantBtn) instantBtn.addEventListener("click", instantUpdate);

  dnaInput.addEventListener("input", instantUpdate);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      dnaInput.value = "";
      instantUpdate();
    });
  }

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dnaInput.value = btn.dataset.seq;
      instantUpdate();
    });
  });

  instantUpdate();
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
 * Cell Simulator with Environment Sliders
 */
function attachCellSimListeners() {
  const tempSlider = document.getElementById("sim-temp");
  const phSlider = document.getElementById("sim-ph");
  const atpSlider = document.getElementById("sim-atp");
  const tempVal = document.getElementById("temp-val");
  const phVal = document.getElementById("ph-val");
  const atpVal = document.getElementById("atp-val");
  const viewport = document.getElementById("cell-sim-viewport");
  const membrane = document.getElementById("cell-membrane");
  const statusBadge = document.getElementById("cell-status");
  const infoBar = document.getElementById("sim-info-bar");

  const organelles = {
    mito: document.getElementById("org-mito"),
    er: document.getElementById("org-er"),
    golgi: document.getElementById("org-golgi"),
    lyso: document.getElementById("org-lyso"),
    ribo: document.getElementById("org-ribo"),
  };

  if (!tempSlider || !phSlider || !atpSlider) return;

  function evaluateCell() {
    const temp = parseFloat(tempSlider.value);
    const ph = parseFloat(phSlider.value);
    const atp = parseFloat(atpSlider.value);

    tempVal.textContent = Math.round(temp);
    phVal.textContent = ph.toFixed(1);
    atpVal.textContent = Math.round(atp);

    // Calculate stress score (0 = perfect, higher = worse)
    let stress = 0;
    const tempDeviation = Math.abs(temp - 37);
    const phDeviation = Math.abs(ph - 7.4);

    stress += tempDeviation > 20 ? 3 : tempDeviation > 10 ? 2 : tempDeviation > 5 ? 1 : 0;
    stress += phDeviation > 4 ? 3 : phDeviation > 2 ? 2 : phDeviation > 1 ? 1 : 0;
    stress += atp < 10 ? 3 : atp < 30 ? 2 : atp < 50 ? 1 : 0;

    // Determine cell state
    const isDead = stress >= 7 || temp > 80 || temp < 5 || ph < 1 || ph > 13;
    const isStressed = stress >= 3;

    // Apply visual states
    viewport.className = 'cell-sim-container' + (isDead ? ' dead' : isStressed ? ' stressed' : '');
    membrane.className = 'cell-membrane' + (isDead ? ' dead' : isStressed ? ' stressed' : '');

    if (isDead) {
      statusBadge.textContent = 'CELL DEATH';
      statusBadge.className = 'cell-status-badge critical';
    } else if (isStressed) {
      statusBadge.textContent = 'STRESSED';
      statusBadge.className = 'cell-status-badge stressed';
    } else {
      statusBadge.textContent = 'HEALTHY';
      statusBadge.className = 'cell-status-badge healthy';
    }

    // Organelle responses
    Object.values(organelles).forEach(org => {
      if (!org) return;
      org.classList.remove('pulsing', 'degraded');
    });

    if (isDead) {
      Object.values(organelles).forEach(org => org && org.classList.add('degraded'));
    } else {
      // Mitochondria pulse with high ATP
      if (atp > 60 && !isStressed && organelles.mito) organelles.mito.classList.add('pulsing');
      // Low ATP degrades ER and Golgi
      if (atp < 20) {
        if (organelles.er) organelles.er.classList.add('degraded');
        if (organelles.golgi) organelles.golgi.classList.add('degraded');
      }
      // Extreme pH degrades lysosomes
      if (phDeviation > 3 && organelles.lyso) organelles.lyso.classList.add('degraded');
      // High temp denatures ribosomes
      if (temp > 60 && organelles.ribo) organelles.ribo.classList.add('degraded');
    }

    // Info chips
    const proteinStatus = temp > 55 ? 'Denatured ⚠️' : temp > 42 ? 'Unstable' : 'Stable ✓';
    const membraneStatus = ph < 2 || ph > 12 ? 'Lysed ⚠️' : isStressed ? 'Permeable' : 'Intact ✓';
    const metabStatus = atp < 10 ? 'Shutdown ⚠️' : atp < 40 ? 'Reduced' : 'Active ✓';

    if (infoBar) {
      infoBar.innerHTML = `
        <span class="sim-info-chip">Proteins: ${proteinStatus}</span>
        <span class="sim-info-chip">Membrane: ${membraneStatus}</span>
        <span class="sim-info-chip">Metabolism: ${metabStatus}</span>
      `;
    }
  }

  tempSlider.addEventListener("input", evaluateCell);
  phSlider.addEventListener("input", evaluateCell);
  atpSlider.addEventListener("input", evaluateCell);
  evaluateCell();
}
