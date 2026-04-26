import { taxonomyData } from "../data/taxonomyData.js";
import { openBioModal } from "./uiController.js";

let taxonomyGrid = null;
let taxonomyFilters = null;

export async function initTaxonomyAtlas() {
    taxonomyGrid = document.getElementById('taxonomy-grid');
    taxonomyFilters = document.getElementById('taxonomy-filters');

    if (!taxonomyGrid || !taxonomyFilters) return;

    // Filter logic
    taxonomyFilters.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            taxonomyFilters.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTaxonomyGrid(btn.dataset.filter);
        });
    });

    renderTaxonomyGrid('all');
}

export function renderTaxonomyGrid(filter = 'all') {
    if (!taxonomyGrid) return;
    taxonomyGrid.innerHTML = '';

    Object.keys(taxonomyData).forEach(key => {
        const entry = taxonomyData[key];
        
        // Apply filter
        if (filter !== 'all' && entry.type !== filter && entry.category !== filter) {
            // Check scientific name or common category too
            if (!entry.scientificName.includes(filter) && entry.type !== filter) {
                return;
            }
        }

        const card = document.createElement('div');
        card.className = 'taxonomy-card';
        card.innerHTML = `
            <div class="taxa-image-container">
                <img src="${entry.image || 'images/placeholder-taxa.png'}" alt="${entry.name}" loading="lazy">
                <div class="taxa-symbol">${entry.symbol}</div>
            </div>
            <div class="taxa-info">
                <div class="taxa-scientific">${entry.scientificName}</div>
                <h3 class="taxa-name">${entry.name}</h3>
                <div class="taxa-category">${entry.category}</div>
                <p class="taxa-desc">${entry.level1_basic.summary || ''}</p>
            </div>
        `;

        card.addEventListener('click', () => {
             openBioModal(entry);
        });

        taxonomyGrid.appendChild(card);
    });
}
