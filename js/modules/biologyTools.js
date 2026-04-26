/**
 * Biology Tools - Consolidated logic for biological calculations
 */

import { t } from "./langController.js";

// Average molecular weight of amino acids (g/mol)
export const AMINO_ACIDS = {
    'A': 71.07, 'R': 156.18, 'N': 114.10, 'D': 115.08, 'C': 103.13,
    'E': 129.11, 'Q': 128.12, 'G': 57.05, 'H': 137.13, 'I': 113.15,
    'L': 113.15, 'K': 128.17, 'M': 131.19, 'F': 147.17, 'P': 97.11,
    'S': 87.07, 'T': 101.10, 'W': 186.20, 'Y': 163.17, 'V': 99.13
};

// Nucleotides (g/mol)
export const NUCLEOTIDES = {
    'dA': 313.2, 'dT': 304.2, 'dC': 289.2, 'dG': 329.2, // DNA
    'A': 329.2, 'U': 306.2, 'C': 305.2, 'G': 345.2     // RNA
};

// Genetic Codon Table
export const CODON_TABLE = {
    'UUU': 'Phe', 'UUC': 'Phe', 'UUA': 'Leu', 'UUG': 'Leu',
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',
    'UAU': 'Tyr', 'UAC': 'Tyr', 'UAA': 'STOP', 'UAG': 'STOP',
    'UGU': 'Cys', 'UGC': 'Cys', 'UGA': 'STOP', 'UGG': 'Trp',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',
    'CAU': 'His', 'CAC': 'His', 'CAA': 'Gln', 'CAG': 'Gln',
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile', 'AUG': 'Met',
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',
    'AAU': 'Asn', 'AAC': 'Asn', 'AAA': 'Lys', 'AAG': 'Lys',
    'AGU': 'Ser', 'AGC': 'Ser', 'AGA': 'Arg', 'AGG': 'Arg',
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',
    'GAU': 'Asp', 'GAC': 'Asp', 'GAA': 'Glu', 'GAG': 'Glu',
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
};

/**
 * Calculates the molecular weight of proteins or nucleic acids
 */
export function calculateBioMass(sequence, type = 'protein') {
    if (!sequence) return { total: "0.00", count: 0, breakdown: [] };
    
    const seq = sequence.toUpperCase().replace(/[^A-Z]/g, '');
    let total = 0;
    const components = {};
    const dataMap = type === 'protein' ? AMINO_ACIDS : NUCLEOTIDES;
    
    for (const char of seq) {
        let mass = dataMap[char];
        // Handle DNA specific symbols if needed
        if (type === 'dna' && !mass) mass = dataMap['d' + char];
        
        if (mass) {
            total += mass;
            components[char] = (components[char] || 0) + 1;
        }
    }
    
    // Add H2O for peptide bond ends if protein
    if (type === 'protein' && total > 0) total += 18.015;
    
    return {
        total: total.toFixed(2),
        count: seq.length,
        breakdown: Object.entries(components).map(([symbol, count]) => ({
            symbol,
            count,
            mass: (count * (dataMap[symbol] || dataMap['d'+symbol])).toFixed(2)
        }))
    };
}

/**
 * Punnett Square logic
 */
export function calculatePunnettSquare(parent1Alleles, parent2Alleles) {
    if (!parent1Alleles || !parent2Alleles) return null;
    
    // Clean inputs to only letters
    const p1 = parent1Alleles.replace(/[^A-Za-z]/g, '').split('').slice(0, 2);
    const p2 = parent2Alleles.replace(/[^A-Za-z]/g, '').split('').slice(0, 2);
    
    if (p1.length < 2 || p2.length < 2) return null;

    const grid = [];
    for (let i = 0; i < 2; i++) {
        const row = [];
        for (let j = 0; j < 2; j++) {
            const genotype = [p1[j], p2[i]].sort((a, b) => {
                const aIsCap = a === a.toUpperCase();
                const bIsCap = b === b.toUpperCase();
                if (aIsCap && !bIsCap) return -1;
                if (!aIsCap && bIsCap) return 1;
                return a.localeCompare(b);
            }).join("");
            row.push(genotype);
        }
        grid.push(row);
    }
    
    const counts = {};
    grid.flat().forEach(g => counts[g] = (counts[g] || 0) + 1);
    
    const stats = Object.entries(counts).map(([genotype, count]) => ({
        genotype,
        count,
        percentage: (count / 4) * 100,
        phenotype: genotype.split("").some(a => a === a.toUpperCase()) ? "Dominant" : "Recessive"
    }));

    return { grid, stats, p1, p2 };
}

/**
 * Dihybrid Punnett Square logic (2 traits, 4x4 grid)
 * Input: parent genotypes like "AaBb"
 */
export function calculateDihybridSquare(parent1, parent2) {
    if (!parent1 || !parent2) return null;

    const p1 = parent1.replace(/[^A-Za-z]/g, '');
    const p2 = parent2.replace(/[^A-Za-z]/g, '');

    if (p1.length < 4 || p2.length < 4) return null;

    // Extract allele pairs: AaBb -> [A,a] and [B,b]
    const p1Trait1 = [p1[0], p1[1]];
    const p1Trait2 = [p1[2], p1[3]];
    const p2Trait1 = [p2[0], p2[1]];
    const p2Trait2 = [p2[2], p2[3]];

    // Generate gametes via independent assortment
    function makeGametes(t1, t2) {
        return [
            t1[0] + t2[0],
            t1[0] + t2[1],
            t1[1] + t2[0],
            t1[1] + t2[1],
        ];
    }

    const gametes1 = makeGametes(p1Trait1, p1Trait2);
    const gametes2 = makeGametes(p2Trait1, p2Trait2);

    // Sort a genotype so dominant alleles come first per trait
    function sortGenotype(a1, a2, b1, b2) {
        const sortPair = (x, y) => {
            if (x === x.toUpperCase() && y !== y.toUpperCase()) return x + y;
            if (y === y.toUpperCase() && x !== x.toUpperCase()) return y + x;
            return x + y;
        };
        return sortPair(a1, a2) + sortPair(b1, b2);
    }

    // Build 4x4 grid
    const grid = [];
    for (let i = 0; i < 4; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
            const g1 = gametes1[j]; // columns
            const g2 = gametes2[i]; // rows
            const geno = sortGenotype(g1[0], g2[0], g1[1], g2[1]);
            row.push(geno);
        }
        grid.push(row);
    }

    // Count genotypes
    const flat = grid.flat();
    const counts = {};
    flat.forEach(g => counts[g] = (counts[g] || 0) + 1);

    // Calculate phenotype
    function getPhenotype(geno) {
        const t1Dom = geno[0] === geno[0].toUpperCase();
        const t2Dom = geno[2] === geno[2].toUpperCase();
        if (t1Dom && t2Dom) return "Both Dominant";
        if (t1Dom && !t2Dom) return "Trait 1 Dom";
        if (!t1Dom && t2Dom) return "Trait 2 Dom";
        return "Both Recessive";
    }

    const phenoCounts = {};
    flat.forEach(g => {
        const p = getPhenotype(g);
        phenoCounts[p] = (phenoCounts[p] || 0) + 1;
    });

    const stats = Object.entries(counts).map(([genotype, count]) => ({
        genotype,
        count,
        percentage: ((count / 16) * 100).toFixed(1),
        phenotype: getPhenotype(genotype)
    }));

    const phenoStats = Object.entries(phenoCounts).map(([phenotype, count]) => ({
        phenotype,
        count,
        ratio: count
    }));

    return { grid, stats, phenoStats, gametes1, gametes2 };
}

/**
 * DNA/RNA Translation
 */
export function translateNucleicAcid(sequence) {
    if (!sequence) return { rna: "", protein: "" };
    
    const dna = sequence.toUpperCase().replace(/[^ATCG]/g, '');
    const rna = dna.replace(/T/g, 'U');
    
    const codons = rna.match(/.{1,3}/g) || [];
    const protein = codons.map(c => {
        if (c.length < 3) return "";
        return CODON_TABLE[c] || '?';
    }).filter(p => p !== "").join('-');
    
    return { rna, protein, dna };
}
