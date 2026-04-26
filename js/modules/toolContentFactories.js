import { t } from "./langController.js";

const TOOL_CONTENT_FACTORIES = {
  punnett: generatePunnettToolContent,
  "dna-translator": generateDNATranslatorContent,
  "biomolecule-mass": generateBiomoleculeMassContent,
  "cell-simulator": generateCellSimulatorContent,
};

export function getBioToolContent(toolType) {
  return TOOL_CONTENT_FACTORIES[toolType]?.() ?? "";
}

function generatePunnettToolContent() {
  return `
    <div class="bio-tool-wrapper">
        <style>
            .bio-tool-wrapper { display: flex; flex-direction: column; gap: 24px; padding: 24px; color: #1e293b; }
            .tool-header-info { text-align: center; margin-bottom: 8px; }
            .tool-header-info h2 { margin: 0; color: #059669; font-size: 1.5rem; }
            .tool-header-info p { margin: 4px 0 0; color: #64748b; font-size: 0.95rem; }
            .punnett-mode-toggle { display: flex; gap: 0; background: #f1f5f9; border-radius: 14px; padding: 4px; max-width: 340px; margin: 0 auto 8px; }
            .mode-btn { flex: 1; padding: 10px 16px; border: none; border-radius: 11px; background: transparent; font-weight: 700; font-size: 0.85rem; color: #64748b; cursor: pointer; transition: all 0.25s ease; }
            .mode-btn.active { background: white; color: #059669; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            .tool-inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
            .input-group { display: flex; flex-direction: column; gap: 8px; }
            .input-group label { font-weight: 600; color: #334155; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
            .input-group input { padding: 12px 16px; border-radius: 12px; border: 2px solid #e2e8f0; font-family: inherit; font-size: 1.1rem; transition: all 0.2s; }
            .input-group input:focus { border-color: #10b981; outline: none; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
            .punnett-grid-container { display: grid; gap: 12px; margin: 20px auto; width: 100%; transition: all 0.3s ease; }
            .punnett-grid-container.mono { grid-template-columns: 40px 1fr; grid-template-rows: 40px 1fr; max-width: 360px; }
            .punnett-grid-container.di { grid-template-columns: 44px 1fr; grid-template-rows: 44px 1fr; max-width: 520px; }
            .punnett-grid { grid-column: 2; grid-row: 2; display: grid; gap: 6px; transition: all 0.3s ease; }
            .punnett-grid.mono { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .punnett-grid.di { grid-template-columns: repeat(4, 1fr); gap: 5px; }
            .punnett-cell { aspect-ratio: 1; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 700; color: #1e293b; transition: all 0.25s ease; animation: cellPop 0.3s ease-out backwards; }
            .punnett-grid.mono .punnett-cell { font-size: 1.3rem; }
            .punnett-grid.di .punnett-cell { font-size: 0.8rem; border-radius: 10px; }
            .punnett-cell.dominant { background: #ecfdf5; border-color: #10b981; color: #065f46; }
            .punnett-cell.t1-dom { background: #eff6ff; border-color: #3b82f6; color: #1e3a8a; }
            .punnett-cell.t2-dom { background: #fefce8; border-color: #eab308; color: #713f12; }
            .punnett-cell.recessive { background: #fef2f2; border-color: #fca5a5; color: #991b1b; }
            .punnett-cell span.ratio { font-size: 0.6rem; font-weight: 500; color: #94a3b8; margin-top: 2px; }
            @keyframes cellPop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            .punnett-label-top { grid-column: 2; grid-row: 1; display: flex; justify-content: space-around; align-items: center; font-weight: 700; color: #10b981; font-size: 1rem; }
            .punnett-label-left { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; justify-content: space-around; align-items: center; font-weight: 700; color: #10b981; font-size: 1rem; }
            .results-stats { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
            .results-stats h3 { margin: 0 0 16px; font-size: 1.1rem; color: #334155; }
            .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .stat-card { padding: 12px; background: #f8fafc; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; }
            .stat-card .label { font-weight: 600; color: #64748b; font-size: 0.9rem; }
            .stat-card .value { font-weight: 800; color: #059669; font-size: 1rem; }
            .pheno-bar { display: flex; border-radius: 10px; overflow: hidden; height: 28px; margin-top: 16px; }
            .pheno-bar-segment { display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white; transition: width 0.5s ease; }
        </style>
        
        <div class="tool-header-info">
            <h2>Punnett Square Calculator</h2>
            <p id="punnett-subtitle">Predict phenotypic and genotypic ratios.</p>
        </div>

        <div class="punnett-mode-toggle">
            <button class="mode-btn active" data-mode="mono">Monohybrid (1 trait)</button>
            <button class="mode-btn" data-mode="di">Dihybrid (2 traits)</button>
        </div>

        <div class="tool-inputs-grid">
            <div class="input-group">
                <label>Parent 1 Genotype</label>
                <input type="text" id="punnett-p1" value="Aa" maxlength="4" placeholder="e.g. Aa or AaBb">
            </div>
            <div class="input-group">
                <label>Parent 2 Genotype</label>
                <input type="text" id="punnett-p2" value="Aa" maxlength="4" placeholder="e.g. Aa or AaBb">
            </div>
        </div>

        <div class="punnett-grid-container mono">
            <div class="punnett-label-top" id="punnett-top-alleles"><span>A</span><span>a</span></div>
            <div class="punnett-label-left" id="punnett-left-alleles"><span>A</span><span>a</span></div>
            <div class="punnett-grid mono" id="punnett-main-grid">
                <div class="punnett-cell dominant">AA<span class="ratio">25%</span></div>
                <div class="punnett-cell dominant">Aa<span class="ratio">25%</span></div>
                <div class="punnett-cell dominant">Aa<span class="ratio">25%</span></div>
                <div class="punnett-cell">aa<span class="ratio">25%</span></div>
            </div>
        </div>

        <div class="results-stats">
            <h3>Genetic Analysis</h3>
            <div class="stat-grid" id="punnett-stats-grid">
                <div class="stat-card"><span class="label">Genotypic Ratio</span><span class="value" id="genotypic-ratio">1:2:1</span></div>
                <div class="stat-card"><span class="label">Phenotypic Ratio</span><span class="value" id="phenotypic-ratio">3:1</span></div>
            </div>
            <div class="pheno-bar" id="pheno-bar"></div>
        </div>
    </div>
  `;
}

function generateDNATranslatorContent() {
  return `
    <div class="bio-tool-wrapper">
        <style>
            .sequence-input-area {
                background: white;
                padding: 24px;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.05);
                border: 1px solid #e2e8f0;
            }
            .sequence-input-area label {
                display: block;
                margin-bottom: 12px;
                font-weight: 700;
                color: #1e293b;
                font-size: 0.95rem;
            }
            .sequence-textarea {
                width: 100%;
                height: 120px;
                padding: 16px;
                border-radius: 14px;
                border: 2px solid #e2e8f0;
                font-family: 'SF Mono', monospace;
                font-size: 1.1rem;
                resize: none;
                transition: all 0.2s;
                letter-spacing: 0.1em;
                text-transform: uppercase;
            }
            .sequence-textarea:focus {
                border-color: #3b82f6;
                outline: none;
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
            }
            .translation-flow {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .flow-step {
                background: #f8fafc;
                padding: 16px;
                border-radius: 16px;
                border: 1px solid #f1f5f9;
                position: relative;
            }
            .flow-step.dna { border-left: 6px solid #3b82f6; }
            .flow-step.rna { border-left: 6px solid #fbbf24; }
            .flow-step.protein { border-left: 6px solid #ef4444; }
            
            .step-header {
                font-size: 0.75rem;
                font-weight: 800;
                color: #64748b;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            .step-content {
                font-family: 'SF Mono', monospace;
                font-size: 0.95rem;
                word-break: break-all;
                line-height: 1.6;
                color: #1e293b;
            }
            .codon-marker {
                display: inline-block;
                padding: 2px 4px;
                border-radius: 4px;
                margin: 0 1px;
                background: rgba(0,0,0,0.03);
            }
        </style>
        
        <div class="tool-header-info">
            <h2>DNA-to-Protein Translator</h2>
            <p>Convert DNA sequences into mRNA and translate them into amino acid chains.</p>
        </div>

        <div class="sequence-input-area">
            <label>Input DNA Sequence (5' → 3')</label>
            <textarea id="dna-input" class="sequence-textarea" placeholder="ATG..."></textarea>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
                <button class="balancer-btn bio-sample-btn" data-seq="ATGGCCATTGTAATGGCCGCT">Sample DNA</button>
                <button class="balancer-btn bio-clear-btn" id="dna-clear">Clear</button>
            </div>
        </div>

        <div class="translation-flow">
            <div class="flow-step dna">
                <div class="step-header">Coding DNA (5' → 3')</div>
                <div class="step-content" id="dna-display">---</div>
            </div>
            <div class="flow-arrow" style="text-align: center; color: #cbd5e1;">↓</div>
            <div class="flow-step rna">
                <div class="step-header">mRNA Transcript</div>
                <div class="step-content" id="rna-display">---</div>
            </div>
            <div class="flow-arrow" style="text-align: center; color: #cbd5e1;">↓</div>
            <div class="flow-step protein">
                <div class="step-header">Protein Sequence</div>
                <div class="step-content" id="protein-display">---</div>
            </div>
        </div>
    </div>
  `;
}

function generateBiomoleculeMassContent() {
  return `
    <div class="bio-tool-wrapper">
        <style>
            .mass-tool-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
            }
            .mass-input-box {
                background: white;
                padding: 24px;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.05);
            }
            .select-molecule-type {
                display: flex;
                gap: 12px;
                margin-bottom: 20px;
            }
            .type-btn {
                flex: 1;
                padding: 12px;
                border-radius: 12px;
                border: 2px solid #e2e8f0;
                background: white;
                cursor: pointer;
                font-weight: 700;
                color: #64748b;
                transition: all 0.2s;
            }
            .type-btn.active {
                border-color: #8b5cf6;
                color: #8b5cf6;
                background: #f5f3ff;
            }
            .result-display-large {
                text-align: center;
                padding: 32px;
                background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
                border-radius: 20px;
                border: 1px solid #ddd6fe;
            }
            .mass-value {
                font-size: 3.5rem;
                font-weight: 800;
                color: #5b21b6;
                line-height: 1;
            }
            .mass-unit {
                font-size: 1.2rem;
                font-weight: 600;
                color: #7c3aed;
                margin-top: 8px;
                display: block;
            }
            .composition-breakdown {
                margin-top: 20px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .comp-item {
                background: white;
                padding: 12px;
                border-radius: 12px;
                text-align: center;
                border: 1px solid #f1f5f9;
            }
            .comp-label { font-size: 0.75rem; color: #94a3b8; display: block; }
            .comp-val { font-weight: 700; color: #1e293b; font-size: 1.1rem; }
        </style>

        <div class="tool-header-info">
            <h2>Biomolecule Mass Calculator</h2>
            <p>Calculate molecular weight for peptides, DNA, or RNA sequences.</p>
        </div>

        <div class="mass-input-box">
            <div class="select-molecule-type">
                <button class="type-btn active" data-type="protein">Protein</button>
                <button class="type-btn" data-type="dna">DNA</button>
                <button class="type-btn" data-type="rna">RNA</button>
            </div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.85rem; color: #475569;">Sequence</label>
            <textarea id="mass-sequence-input" class="sequence-textarea" style="height: 100px;" placeholder="Enter sequence..."></textarea>
        </div>

        <div class="result-display-large">
            <span class="mass-value" id="mass-result-val">0.00</span>
            <span class="mass-unit">Daltons (Da) / g/mol</span>
        </div>

        <div class="composition-breakdown" id="composition-grid">
            <div class="comp-item">
                <span class="comp-label">Length</span>
                <span class="comp-val" id="mol-length">0</span>
            </div>
            <div class="comp-item">
                <span class="comp-label">Charge @ pH 7</span>
                <span class="comp-val" id="mol-charge">0.0</span>
            </div>
            <div class="comp-item">
                <span class="comp-label">Isoelectric Pt</span>
                <span class="comp-val" id="mol-pi">--</span>
            </div>
        </div>
    </div>
  `;
}

function generateCellSimulatorContent() {
  return `
    <div class="bio-tool-wrapper">
        <style>
            .cell-sim-container {
                background: radial-gradient(circle at center, #f0fdf4 0%, #dcfce7 100%);
                border-radius: 24px;
                aspect-ratio: 16/9;
                position: relative;
                overflow: hidden;
                border: 2px solid #86efac;
                box-shadow: inset 0 0 60px rgba(0,0,0,0.05);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .cell-membrane {
                width: 60%;
                height: 70%;
                background: rgba(255, 255, 255, 0.4);
                border: 4px solid #10b981;
                border-radius: 40% 60% 70% 30% / 50% 40% 60% 50%;
                position: relative;
                animation: fluidWobble 10s infinite ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(4px);
            }
            .nucleus {
                width: 30%;
                height: 35%;
                background: #6366f1;
                border-radius: 50%;
                border: 2px solid #4338ca;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            }
            .nucleolus {
                width: 40%;
                height: 40%;
                background: #312e81;
                border-radius: 50%;
            }
            .organelle {
                position: absolute;
                background: #fbbf24;
                border-radius: 10px;
                padding: 4px 8px;
                font-size: 0.6rem;
                font-weight: 800;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .organelle:hover { transform: scale(1.1); z-index: 10; }
            
            @keyframes fluidWobble {
                0%, 100% { border-radius: 40% 60% 70% 30% / 50% 40% 60% 50%; }
                33% { border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%; }
                66% { border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%; }
            }
            
            .sim-controls {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 12px;
                margin-top: 20px;
            }
            .control-btn {
                padding: 10px;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
                background: white;
                cursor: pointer;
                font-size: 0.8rem;
                font-weight: 600;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            .control-btn i { font-size: 1.2rem; }
            .control-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        </style>

        <div class="tool-header-info">
            <h2>Interactive Cell Simulator</h2>
            <p>Explore the inner workings of a eukaryotic cell and its organelles.</p>
        </div>

        <div class="cell-sim-container">
            <div class="cell-membrane">
                <div class="nucleus">
                    <div class="nucleolus"></div>
                </div>
                <!-- Random Organelles -->
                <div class="organelle" style="top: 20%; left: 10%; background: #ef4444;">Mito</div>
                <div class="organelle" style="bottom: 25%; right: 15%; background: #10b981;">ER</div>
                <div class="organelle" style="top: 15%; right: 20%; background: #f59e0b;">Golgi</div>
                <div class="organelle" style="bottom: 10%; left: 20%; background: #3b82f6;">Lys</div>
            </div>
        </div>

        <div class="sim-controls">
            <button class="control-btn">
                <span>Microtubules</span>
                <span style="font-size: 0.6rem; color: #94a3b8;">Show/Hide</span>
            </button>
            <button class="control-btn">
                <span>Metabolism</span>
                <span style="font-size: 0.6rem; color: #94a3b8;">ATP Flow</span>
            </button>
            <button class="control-btn">
                <span>Division</span>
                <span style="font-size: 0.6rem; color: #94a3b8;">Mitosis</span>
            </button>
            <button class="control-btn">
                <span>Signal</span>
                <span style="font-size: 0.6rem; color: #94a3b8;">Trigger</span>
            </button>
        </div>
    </div>
  `;
}
