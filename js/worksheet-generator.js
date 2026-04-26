// ============================================
// Worksheet Generator - Fixed Version
// ============================================

// Biology Templates Database
const biologyTemplates = {
    genetics: [
        { q: "Cross Bb x Bb: What is the probability of a recessive offspring (bb)?", a: "25%" },
        { q: "Cross BB x bb: What is the genotype of all F1 offspring?", a: "Bb" },
        { q: "Cross Bb x bb: What is the percentage of heterozygous offspring?", a: "50%" },
        { q: "If 'B' is brown eyes and 'b' is blue eyes, what is the phenotype of 'Bb'?", a: "Brown" },
        { q: "How many squares are in a standard monohybrid Punnett square?", a: "4" }
    ],
    cellBiology: [
        { q: "Which organelle is the 'powerhouse' that produces ATP?", a: "Mitochondria" },
        { q: "Which organelle performs photosynthesis in plant cells?", a: "Chloroplast" },
        { q: "Which part of the cell controls all activities and contains DNA?", a: "Nucleus" },
        { q: "Which organelle is responsible for synthesizing proteins?", a: "Ribosome" },
        { q: "What is the jelly-like substance that fills the cell?", a: "Cytoplasm" },
        { q: "Which organelle packages and distributes proteins?", a: "Golgi Apparatus" }
    ],
    molecular: [
        { q: "In DNA base pairing, Adenine (A) always pairs with...", a: "Thymine" },
        { q: "Which nitrogenous base is found in RNA but NOT in DNA?", a: "Uracil" },
        { q: "What is the process of copying DNA into mRNA called?", a: "Transcription" },
        { q: "A sequence of 3 nucleotides that codes for an amino acid is a...", a: "Codon" },
        { q: "What is the sugar found in the backbone of DNA?", a: "Deoxyribose" }
    ]
};

// Worksheet state
let currentWorksheet = null;
let currentViewMode = 'student';
let worksheetDate = '';
let userAnswers = {};

const WORKSHEET_PHRASE_MAP = {
    'Please select at least one topic': {
        'zh-Hant': '請至少選擇一個主題',
        fr: 'Veuillez selectionner au moins un sujet',
        ru: 'Пожалуйста, выберите хотя бы одну тему',
        fa: 'لطفا حداقل یک موضوع را انتخاب کنید',
        ur: 'براہ کرم کم از کم ایک موضوع منتخب کریں',
        tl: 'Pumili ng kahit isang paksa'
    },
    'Answer Key': {
        'zh-Hant': '答案',
        fr: 'Corrige',
        ru: 'Ответы',
        fa: 'پاسخنامه',
        ur: 'جوابات',
        tl: 'Susi ng Sagot'
    },
    'Online Practice': {
        'zh-Hant': '線上練習',
        fr: 'Exercice en ligne',
        ru: 'Онлайн-практика',
        fa: 'تمرین آنلاین',
        ur: 'آن لائن مشق',
        tl: 'Online na Pagsasanay'
    },
    'Biology Concept Review': {
        'zh-Hant': '生物概念複習',
        fr: 'Revision des concepts de biologie',
        ru: 'Обзор биологических концепций',
        fa: 'مرور مفاهیم زیست‌شناسی',
        ur: 'حیاتیات کے تصور کا جائزہ',
        tl: 'Pagsusuri ng Konsepto sa Biyolohiya'
    },
    'Fill in the answers and click Check.': {
        'zh-Hant': '填入答案後點擊檢查。',
        fr: 'Remplissez les reponses puis cliquez sur Verifier.',
        ru: 'Введите ответы и нажмите Проверить.',
        fa: 'پاسخ‌ها را وارد کرده و روی بررسی کلیک کنید.',
        ur: 'جوابات درج کریں اور چیک پر کلک کریں۔',
        tl: 'Ilagay ang mga sagot at i-click ang Suriin.'
    },
    'Answer the questions in the spaces provided.': {
        'zh-Hant': '在提供的空格內回答問題。',
        fr: 'Repondez aux questions dans les espaces prevus.',
        ru: 'Ответьте на вопросы в отведенных местах.',
        fa: 'به سوالات در فضاهای مشخص شده پاسخ دهید.',
        ur: 'فراہم کردہ جگہوں پر سوالات کے جواب دیں۔',
        tl: 'Sagutin ang mga tanong sa mga puwang na ibinigay.'
    },
    Easy: {
        'zh-Hant': '簡單',
        fr: 'Facile',
        ru: 'Легко',
        fa: 'آسان',
        ur: 'آسان',
        tl: 'Madali'
    },
    Medium: {
        'zh-Hant': '中等',
        fr: 'Moyen',
        ru: 'Средне',
        fa: 'متوسط',
        ur: 'درمیانہ',
        tl: 'Katamtaman'
    },
    Hard: {
        'zh-Hant': '困難',
        fr: 'Difficile',
        ru: 'Сложно',
        fa: 'سخت',
        ur: 'مشکل',
        tl: 'Mahirap'
    },
    Genetics: {
        'zh-Hant': '遺傳學',
        fr: 'Genetique',
        ru: 'Генетика',
        fa: 'ژنتیک',
        ur: 'جینیات',
        tl: 'Genetics'
    },
    'Cell Bio': {
        'zh-Hant': '細胞生物學',
        fr: 'Biologie cellulaire',
        ru: 'Клеточная биология',
        fa: 'زیست‌شناسی سلولی',
        ur: 'سیل بائیو',
        tl: 'Cell Bio'
    },
    Molecular: {
        'zh-Hant': '分子生物學',
        fr: 'Moleculaire',
        ru: 'Молекулярная биология',
        fa: 'مولکولی',
        ur: 'مالیکولر',
        tl: 'Molekyul'
    },
    questions: {
        'zh-Hant': '題',
        fr: 'questions',
        ru: 'вопросов',
        fa: 'پرسش',
        ur: 'سوالات',
        tl: 'tanong'
    },
    Name: {
        'zh-Hant': '姓名',
        fr: 'Nom',
        ru: 'Имя',
        fa: 'نام',
        ur: 'نام',
        tl: 'Pangalan'
    },
    Date: {
        'zh-Hant': '日期',
        fr: 'Date',
        ru: 'Дата',
        fa: 'تاریخ',
        ur: 'تاریخ',
        tl: 'Petsa'
    },
    Score: {
        'zh-Hant': '得分',
        fr: 'Score',
        ru: 'Оценка',
        fa: 'امتیاز',
        ur: 'اسکور',
        tl: 'Iskor'
    },
    Check: {
        'zh-Hant': '檢查',
        fr: 'Verifier',
        ru: 'Проверить',
        fa: 'بررسی',
        ur: 'چیک',
        tl: 'Suriin'
    },
    'Generated by biosphere': {
        'zh-Hant': '由 biosphere 生成',
        fr: 'Genere par biosphere',
        ru: 'Сгенерировано в biosphere',
        fa: 'تولید شده توسط biosphere',
        ur: 'biosphere کی جانب سے تیار کردہ',
        tl: 'Nabuo ng biosphere'
    }
};

// Translation helper
function tr(en, zh) {
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    if (lang.startsWith('zh')) return zh;
    const translated = WORKSHEET_PHRASE_MAP[en]?.[lang] || WORKSHEET_PHRASE_MAP[en]?.[lang.split('-')[0]];
    return translated || en;
}

// Initialize Worksheet Generator
function initWorksheetGenerator() {
    // Button group handlers
    document.querySelectorAll('.worksheet-controls .button-group').forEach(group => {
        group.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // Preview tab handlers
    document.querySelectorAll('.preview-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentViewMode = tab.dataset.mode;
            if (currentWorksheet) {
                renderWorksheet(currentWorksheet, currentViewMode);
            }
        });
    });

    // Generate button
    const generateBtn = document.getElementById('generate-worksheet-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateWorksheet);
    }

    // Fill date button
    const fillDateBtn = document.getElementById('fill-date-btn');
    if (fillDateBtn) {
        fillDateBtn.addEventListener('click', fillTodayDate);
    }

    // PDF Export button
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportToPDF);
    }
}

// Fill today's date (Toggle)
function fillTodayDate() {
    if (!currentWorksheet) return;

    if (currentWorksheet.date) {
        // If date exists, clear it (Toggle OFF)
        currentWorksheet.date = '';
        worksheetDate = '';
    } else {
        // If date is empty, fill it (Toggle ON)
        const today = new Date();
        const lang = (document.documentElement.lang || 'en').toLowerCase();

        if (lang.startsWith('zh')) {
            worksheetDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        } else {
            worksheetDate = today.toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' });
        }
        currentWorksheet.date = worksheetDate;
    }

    renderWorksheet(currentWorksheet, currentViewMode);
}

// Generate worksheet
function generateWorksheet() {
    const typesGroup = document.getElementById('biological-topics-group');
    const selectedTypes = [];
    typesGroup?.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        selectedTypes.push(cb.value);
    });

    const countGroup = document.getElementById('question-count-group');
    const count = parseInt(countGroup?.querySelector('.option-btn.active')?.dataset?.value || 10);

    const difficultyGroup = document.getElementById('difficulty-group');
    const difficultyBtn = difficultyGroup?.querySelector('.option-btn.active');
    const difficulty = difficultyBtn ? difficultyBtn.dataset.value : 'medium';

    if (selectedTypes.length === 0) {
        alert(tr('Please select at least one topic', '請至少選擇一個主題'));
        return;
    }

    // 1. Gather all candidates
    let allCandidates = [];
    selectedTypes.forEach(type => {
        if (biologyTemplates[type]) {
            biologyTemplates[type].forEach(q => {
                allCandidates.push({
                    ...q,
                    type
                });
            });
        }
    });

    // 2. Selection Logic
    shuffleArray(allCandidates);
    let finalQuestions = allCandidates.slice(0, count);

    // If still need more, allow duplicates if necessary
    while (finalQuestions.length < count && allCandidates.length > 0) {
        finalQuestions.push(allCandidates[Math.floor(Math.random() * allCandidates.length)]);
    }

    const worksheetId = generateWorksheetId();
    worksheetDate = '';

    currentWorksheet = {
        id: worksheetId,
        date: worksheetDate,
        questions: finalQuestions,
        types: selectedTypes,
        difficulty: difficulty,
        totalCount: count
    };

    userAnswers = {};

    const exportBtn = document.getElementById('export-pdf-btn');
    const fillDateBtn = document.getElementById('fill-date-btn');
    if (exportBtn) exportBtn.disabled = false;
    if (fillDateBtn) fillDateBtn.disabled = false;

    renderWorksheet(currentWorksheet, currentViewMode);
}

// Render worksheet
function renderWorksheet(worksheet, mode) {
    const container = document.getElementById('worksheet-preview-content');
    if (!container) return;

    const isAnswerKey = mode === 'answer';
    const isPractice = mode === 'practice';

    let title;
    if (isAnswerKey) {
        title = tr('Answer Key', '答案');
    } else if (isPractice) {
        title = tr('Online Practice', '線上練習');
    } else {
        title = tr('Biology Concept Review', '生物概念複習');
    }

    const instructions = isPractice
        ? tr('Fill in the answers and click Check.', '填入答案後點擊檢查。')
        : tr('Answer the questions in the spaces provided.', '在提供的空格內回答問題。');

    const diffLabel = {
        'easy': tr('Easy', '簡單'),
        'medium': tr('Medium', '中等'),
        'hard': tr('Hard', '困難')
    }[worksheet.difficulty] || worksheet.difficulty;

    const typesLabel = worksheet.types.map(t => {
        const map = {
            'genetics': tr('Genetics', '遺傳學'),
            'cellBiology': tr('Cell Bio', '細胞生物學'),
            'molecular': tr('Molecular', '分子生物學')
        };
        return map[t] || t;
    }).join(', ');

    const summaryHtml = `
        <div class="preview-summary-bar">
            <span>${worksheet.questions.length} ${tr('questions', '題')}</span>
            <span style="opacity:0.6;">•</span>
            <span>${diffLabel}</span>
            <span style="opacity:0.6;">•</span>
            <span style="font-size: 0.75rem; opacity: 0.9;">${typesLabel}</span>
        </div>
    `;

    let html = `
        <div class="worksheet-paper ${isAnswerKey ? 'answer-key' : ''} ${isPractice ? 'practice-mode' : ''}">
            ${summaryHtml}
            <div class="worksheet-header">
                <div class="header-top">
                    <h1>${title}</h1>
                    <span class="worksheet-id-badge">#${worksheet.id}</span>
                </div>
                ${!isPractice ? `
                <div class="header-fields">
                    <div class="field-group">
                        <span class="field-label">${tr('Name', '姓名')}:</span>
                        <span class="field-line"></span>
                    </div>
                    <div class="field-group">
                        <span class="field-label">${tr('Date', '日期')}:</span>
                        ${worksheet.date ? `<span class="field-value">${worksheet.date}</span>` : `<span class="field-line"></span>`}
                    </div>
                    <div class="field-group">
                        <span class="field-label">${tr('Score', '得分')}:</span>
                        <span class="field-line short"></span>
                        <span class="score-total">/${worksheet.questions.length}</span>
                    </div>
                </div>
                ` : ''}
                <p class="instructions">${instructions}</p>
            </div>
            <div class="questions-list">
    `;

    worksheet.questions.forEach((q, index) => {
        const resultClass = (isPractice && userAnswers[index] !== undefined)
            ? (checkSingleAnswer(index) ? 'correct' : 'incorrect')
            : '';
        
        html += `
            <div class="bio-question-row ${resultClass}" data-question="${index}">
                <div class="bio-q-header">
                    <span class="q-num">${index + 1}.</span>
                    <span class="bio-q-text">${q.q}</span>
                </div>
                <div class="bio-answer-area">
                    ${isPractice ? `
                        <input type="text" class="bio-input" data-question="${index}" 
                            value="${userAnswers[index] || ''}" placeholder="Type your answer...">
                        ${userAnswers[index] !== undefined ? `
                            <span class="result-icon">${checkSingleAnswer(index) ? '✓' : '✗'}</span>
                        ` : ''}
                    ` : (isAnswerKey ? `<span class="bio-answer-key-text"><strong>${tr('Answer', '答案')}:</strong> ${q.a}</span>` : `<div class="bio-answer-line"></div>`)}
                </div>
            </div>
        `;
    });

    html += `</div>`;

    if (isPractice) {
        const correctCount = Object.keys(userAnswers).length > 0
            ? worksheet.questions.filter((_, i) => checkSingleAnswer(i)).length
            : 0;

        html += `
            <div class="practice-actions">
                <button class="check-btn" id="check-answers-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${tr('Check', '檢查')}
                </button>
                <div class="score-display">
                    <span class="score-value ${correctCount === worksheet.questions.length ? 'perfect' : ''}">${correctCount}/${worksheet.questions.length}</span>
                </div>
            </div>
        `;
    }

    html += `
            <div class="worksheet-footer">
                <span>${tr('Generated by BioSphere', '由 BioSphere 生成')}</span>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Event listeners
    if (isPractice) {
        container.querySelectorAll('.bio-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = parseInt(e.target.dataset.question);
                userAnswers[idx] = e.target.value;
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const idx = parseInt(e.target.dataset.question);
                    userAnswers[idx] = e.target.value;
                    const next = container.querySelector(`.bio-input[data-question="${idx + 1}"]`);
                    if (next) next.focus();
                    else document.getElementById('check-answers-btn').click();
                }
            });
        });

        document.getElementById('check-answers-btn')?.addEventListener('click', () => {
            renderWorksheet(worksheet, 'practice');
        });
    }
}

function checkSingleAnswer(index) {
    if (!currentWorksheet || userAnswers[index] === undefined) return false;
    const q = currentWorksheet.questions[index];
    const userA = (userAnswers[index] || '').trim().toLowerCase();
    const correctA = q.a.toLowerCase();
    return userA === correctA;
}

function formatQuestionForPDF(q, showAnswer) {
    let html = `<div class="q-text">${q.q}</div>`;
    if (showAnswer) {
        html += `<div class="a-text"><strong>Answer:</strong> ${q.a}</div>`;
    } else {
        html += `<div class="a-line"></div>`;
    }
    return html;
}

function formatFormula(formula) {
    return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

function generateWorksheetId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ==========================================
// Custom PDF Exporter
// ==========================================
function exportToPDF() {
    if (!currentWorksheet) return;

    const lang = document.documentElement.lang || 'en';
    const title = tr('Biology Concept Review', '生物概念複習');
    const keyTitle = tr('Answer Key', '答案');
    
    let worksheetHtml = '';
    currentWorksheet.questions.forEach((q, i) => {
        worksheetHtml += `
            <div class="question-row">
                <span class="q-num">${i + 1}.</span>
                <div class="bio-q">
                    <div class="q-text">${q.q}</div>
                    <div class="q-line"></div>
                </div>
            </div>
        `;
    });

    let answerKeyHtml = '';
    currentWorksheet.questions.forEach((q, i) => {
        answerKeyHtml += `
            <div class="question-row">
                <span class="q-num">${i + 1}.</span>
                <div class="bio-q">
                    <div class="q-text">${q.q}</div>
                    <div class="q-ans"><strong>Answer:</strong> ${q.a}</div>
                </div>
            </div>
        `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BioSphere Printout</title>
    <style>
        @page { size: A4; margin: 0; }
        body { 
            margin: 0; 
            padding: 20mm; 
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #111;
        }
        .header { margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; }
        .title { font-size: 24pt; font-weight: 800; margin-bottom: 10px; }
        .fields { display: flex; justify-content: space-between; font-size: 11pt; margin-top: 15px; }
        .field { flex: 1; border-bottom: 1px solid #111; margin-right: 20px; height: 1.5em; display: flex; align-items: baseline; }
        .field-label { font-weight: 600; margin-right: 10px; }
        
        .questions { display: flex; flex-direction: column; gap: 20px; margin-top: 30px; }
        .question-row { display: flex; align-items: flex-start; page-break-inside: avoid; }
        .q-num { width: 30px; font-weight: 700; font-size: 12pt; }
        .bio-q { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .q-text { font-size: 12pt; line-height: 1.4; }
        .q-line { border-bottom: 1px solid #777; width: 100%; margin-top: 15px; height: 1.2em; }
        .q-ans { color: #111; font-size: 11pt; margin-top: 5px; }

        .footer { margin-top: 40px; text-align: center; font-size: 9pt; color: #666; border-top: 1px solid #eee; padding-top: 10px; }
        .page-break { page-break-before: always; }
        .ans-key-header { margin-top: 30px; margin-bottom: 20px; font-size: 18pt; font-weight: 800; border-bottom: 1px solid #333; padding-bottom: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${title}</div>
        <div class="fields">
            <div class="field"><span class="field-label">Name:</span></div>
            <div class="field"><span class="field-label">Date:</span><span>${currentWorksheet.date || ''}</span></div>
            <div class="field" style="max-width: 150px;"><span class="field-label">Score:</span></div>
        </div>
    </div>

    <div class="questions">
        ${worksheetHtml}
    </div>

    <div class="footer">Generated by BioSphere</div>

    <div class="page-break"></div>

    <div class="ans-key-header">${keyTitle} - #${currentWorksheet.id}</div>
    <div class="questions">
        ${answerKeyHtml}
    </div>
    
    <div class="footer">Generated by BioSphere</div>

    <script>
        window.onload = () => { setTimeout(() => { window.print(); }, 500); }
    </script>
</body>
</html>
    `);
    printWindow.document.close();
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Difficulty
    document.querySelectorAll('#difficulty-group .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#difficulty-group .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Count
    document.querySelectorAll('#question-count-group .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#question-count-group .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Generate
    document.getElementById('generate-worksheet-btn')?.addEventListener('click', generateWorksheet);

    // Date
    document.getElementById('fill-date-btn')?.addEventListener('click', () => {
        const d = new Date();
        worksheetDate = d.toLocaleDateString();
        if (currentWorksheet) {
            currentWorksheet.date = worksheetDate;
            renderWorksheet(currentWorksheet, currentViewMode);
        }
    });

    // Export
    document.getElementById('export-pdf-btn')?.addEventListener('click', exportToPDF);

    // Tabs
    document.querySelectorAll('.preview-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentViewMode = tab.dataset.mode;
            if (currentWorksheet) renderWorksheet(currentWorksheet, currentViewMode);
        });
    });
});
