export const bioData = {
  "1": {
    "id": 1,
    "row": 1,
    "column": 2,
    "symbol": "Nuc",
    "name": "Nucleus",
    "type": "Organelle",
    "category": "Nuclear",
    "level1_basic": {
      "function": "Genetic Control Center",
      "location": "Center of Eukaryotic Cells",
      "description": "The nucleus serves as the repository of genetic information and as the cell's control center.",
      "summary": "Protects DNA and coordinates cell activities like growth and reproduction."
    },
    "level2_molecular": {
      "composition": "DNA, RNA, Proteins",
      "size": "5-10 µm",
      "components": [
        "Nuclear Envelope",
        "Nucleolus",
        "Chromatin",
        "Nuclear Pores"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#4f46e5",
        "secondaryColor": "#818cf8",
        "shape": "pored-sphere",
        "complexity": 0.8
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1831",
        "discoveredBy": "Robert Brown"
      },
      "commonUses": [
        "Genetics Research",
        "Gene Therapy"
      ]
    }
  },
  "2": {
    "id": 2,
    "row": 2,
    "column": 1,
    "symbol": "Mit",
    "name": "Mitochondria",
    "type": "Organelle",
    "category": "Energy",
    "level1_basic": {
      "function": "Powerhouse of the Cell",
      "location": "Cytoplasm",
      "description": "Organelles that generate most of the chemical energy needed to power the cell's biochemical reactions.",
      "summary": "Generates ATP through cellular respiration."
    },
    "level2_molecular": {
      "composition": "Double Membrane, Mitochondrial DNA",
      "size": "0.5-1.0 µm",
      "components": [
        "Outer Membrane",
        "Inner Membrane (Cristae)",
        "Matrix",
        "Intermembrane Space"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#ef4444",
        "secondaryColor": "#f87171",
        "shape": "folded-bean",
        "complexity": 0.7
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1857",
        "discoveredBy": "Albert von Kölliker"
      },
      "commonUses": [
        "Metabolic Studies",
        "Evolutionary Biology (mtDNA)"
      ]
    }
  },
  "3": {
    "id": 3,
    "row": 2,
    "column": 3,
    "symbol": "Chl",
    "name": "Chloroplast",
    "type": "Organelle",
    "category": "Energy",
    "level1_basic": {
      "function": "Solar Energy Converter",
      "location": "Plant Cells",
      "description": "Conducts photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight.",
      "summary": "Converts light energy into stable chemical energy (glucose)."
    },
    "level2_molecular": {
      "composition": "Chlorophyll, Thylakoids",
      "size": "5-10 µm",
      "components": [
        "Stroma",
        "Granum",
        "Thylakoid Membrane"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#10b981",
        "secondaryColor": "#34d399",
        "shape": "disc-stack",
        "complexity": 0.6
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1837",
        "discoveredBy": "Hugo von Mohl"
      },
      "commonUses": [
        "Biofuel Research",
        "Agricultural Engineering"
      ]
    }
  },
  "4": {
    "id": 4,
    "row": 3,
    "column": 1,
    "symbol": "Rib",
    "name": "Ribosome",
    "type": "Organelle",
    "category": "Synthesis",
    "level1_basic": {
      "function": "Protein Factory",
      "location": "Cytoplasm / Rough ER",
      "description": "The site of protein synthesis in the cell.",
      "summary": "Assembles amino acids into proteins following mRNA instructions."
    },
    "level2_molecular": {
      "composition": "rRNA, Proteins",
      "size": "20-30 nm",
      "components": [
        "Large Subunit",
        "Small Subunit"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#f59e0b",
        "secondaryColor": "#fbbf24",
        "shape": "dual-sphere",
        "complexity": 0.4
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1955",
        "discoveredBy": "George Palade"
      },
      "commonUses": [
        "Antibiotic Development",
        "Proteomics"
      ]
    }
  },
  "5": {
    "id": 5,
    "row": 3,
    "column": 3,
    "symbol": "Gol",
    "name": "Golgi Apparatus",
    "type": "Organelle",
    "category": "Processing",
    "level1_basic": {
      "function": "Packaging Center",
      "location": "Near Nucleus",
      "description": "Modifies, sorts, and packages proteins for secretion.",
      "summary": "Acts like a post office for the cell's molecules."
    },
    "level2_molecular": {
      "composition": "Cisternae, Vesicles",
      "size": "Varies",
      "components": [
        "Cis Face",
        "Trans Face",
        "Cisternae"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#8b5cf6",
        "secondaryColor": "#a78bfa",
        "shape": "stacked-layers",
        "complexity": 0.9
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1897",
        "discoveredBy": "Camillo Golgi"
      },
      "commonUses": [
        "Secretory Pathway Studies"
      ]
    }
  },
  "6": {
    "id": 6,
    "row": 3,
    "column": 2,
    "symbol": "DNA",
    "name": "DNA",
    "type": "Biomolecule",
    "category": "Information",
    "level1_basic": {
      "function": "Blueprint of Life",
      "location": "Nucleus",
      "description": "A molecule that carries the genetic instructions used in the growth, development, functioning, and reproduction of all known organisms.",
      "summary": "Double helix carrying the code for all life."
    },
    "level2_molecular": {
      "composition": "Deoxyribose, Nitrogenous Bases (A, T, C, G), Phosphate",
      "size": "2 nm width",
      "components": [
        "Nucleotides",
        "Base Pairs",
        "Sugar-Phosphate Backbone"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#0ea5e9",
        "secondaryColor": "#38bdf8",
        "shape": "double-helix",
        "complexity": 1.0
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1953 (structure)",
        "discoveredBy": "Watson, Crick, Franklin, Wilkins"
      },
      "commonUses": [
        "Forensics",
        "Genealogy",
        "Medicine"
      ]
    }
  },
  "7": {
    "id": 7,
    "row": 4,
    "column": 1,
    "symbol": "RER",
    "name": "Rough ER",
    "type": "Organelle",
    "category": "Synthesis",
    "level1_basic": {
      "function": "Protein Synthesis & Transport",
      "location": "Adjacent to Nucleus",
      "description": "Studded with ribosomes, it synthesizes and modifies proteins destined for secretion or membrane insertion.",
      "summary": "The 'industrial export' center of the cell."
    },
    "level2_molecular": {
      "composition": "Phospholipid Bilayer, Ribosomes",
      "size": "Varies",
      "components": [
        "Cisternae",
        "Ribosomes",
        "Lumen"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#6366f1",
        "secondaryColor": "#a5b4fc",
        "shape": "studded-layers",
        "complexity": 0.85
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1945",
        "discoveredBy": "Keith Porter"
      },
      "commonUses": [
        "Protein Folding Research",
        "Study of Secretory Diseases"
      ]
    }
  },
  "8": {
    "id": 8,
    "row": 4,
    "column": 2,
    "symbol": "SER",
    "name": "Smooth ER",
    "type": "Organelle",
    "category": "Synthesis",
    "level1_basic": {
      "function": "Lipid Synthesis & Detox",
      "location": "Cytoplasm",
      "description": "Lacks ribosomes; involved in lipid synthesis, carbohydrate metabolism, and detoxification of drugs and poisons.",
      "summary": "The cell's pharmacy and refinery."
    },
    "level2_molecular": {
      "composition": "Phospholipid Bilayer",
      "size": "Varies",
      "components": [
        "Tubules",
        "Lumen"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#8b5cf6",
        "secondaryColor": "#c4b5fd",
        "shape": "smooth-tubes",
        "complexity": 0.75
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1945 (as part of ER)",
        "discoveredBy": "Keith Porter"
      },
      "commonUses": [
        "Pharmacology Labs",
        "Metabolic Engineering"
      ]
    }
  },
  "9": {
    "id": 9,
    "row": 4,
    "column": 3,
    "symbol": "Lys",
    "name": "Lysosome",
    "type": "Organelle",
    "category": "Waste Management",
    "level1_basic": {
      "function": "Intracellular Digestion",
      "location": "Cytoplasm",
      "description": "Spherical sacs containing digestive enzymes that break down waste materials and cellular debris.",
      "summary": "The cell's recycling and waste disposal unit."
    },
    "level2_molecular": {
      "composition": "Hydrolases, Acidic Membrane",
      "size": "0.1-1.2 µm",
      "components": [
        "Acid Hydrolases",
        "Transporter Membrane"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#f87171",
        "secondaryColor": "#fca5a5",
        "shape": "enzyme-sac",
        "complexity": 0.5
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1955",
        "discoveredBy": "Christian de Duve"
      },
      "commonUses": [
        "Autophagy Research",
        "Study of Lysosomal Storage Diseases"
      ]
    }
  },
  "10": {
    "id": 10,
    "row": 5,
    "column": 1,
    "symbol": "Vac",
    "name": "Vacuole",
    "type": "Organelle",
    "category": "Storage",
    "level1_basic": {
      "function": "Storage & Pressure",
      "location": "Cytoplasm",
      "description": "Large vesicles used for storage of water, nutrients, and waste. In plants, the central vacuole maintains turgor pressure.",
      "summary": "Water tower and warehouse of the cell."
    },
    "level2_molecular": {
      "composition": "Cell Sap, Tonoplast",
      "size": "Varies (Large in plants)",
      "components": [
        "Tonoplast Membrane",
        "Cell Sap"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#38bdf8",
        "secondaryColor": "#e0f2fe",
        "shape": "fluid-sac",
        "complexity": 0.3
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1776 (Spallanzani)",
        "discoveredBy": "Lazzaro Spallanzani"
      },
      "commonUses": [
        "Plant Physiology",
        "Osmoregulation Studies"
      ]
    }
  },
  "11": {
    "id": 11,
    "row": 5,
    "column": 2,
    "symbol": "PM",
    "name": "Plasma Membrane",
    "type": "Boundary",
    "category": "Protection",
    "level1_basic": {
      "function": "Selective Permeability",
      "location": "Outer Cell Boundary",
      "description": "A phospholipid bilayer with embedded proteins that regulates the entry and exit of substances.",
      "summary": "The gatekeeper of the cell."
    },
    "level2_molecular": {
      "composition": "Phospholipids, Proteins, Cholesterol",
      "size": "7-10 nm thick",
      "components": [
        "Hydrophilic Heads",
        "Hydrophobic Tails",
        "Transmembrane Proteins"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#fbbf24",
        "secondaryColor": "#fef3c7",
        "shape": "fluid-mosaic",
        "complexity": 0.95
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1972 (Mosaic Model)",
        "discoveredBy": "Singer and Nicolson"
      },
      "commonUses": [
        "Drug Delivery",
        "Transport Mechanisms"
      ]
    }
  },
  "12": {
    "id": 12,
    "row": 5,
    "column": 3,
    "symbol": "Cys",
    "name": "Cytoskeleton",
    "type": "Structure",
    "category": "Movement",
    "level1_basic": {
      "function": "Structural Support",
      "location": "Throughout Cytoplasm",
      "description": "A network of protein fibers that helps the cell maintain its shape and move organelles.",
      "summary": "The highway and framework of the cell."
    },
    "level2_molecular": {
      "composition": "Actin, Tubulin",
      "size": "Varies (7-25 nm fibers)",
      "components": [
        "Microtubules",
        "Microfilaments",
        "Intermediate Filaments"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#9ca3af",
        "secondaryColor": "#e5e7eb",
        "shape": "network-fibers",
        "complexity": 0.9
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1903",
        "discoveredBy": "Nikolai Koltsov"
      },
      "commonUses": [
        "Cell Motility Research",
        "Cancer Therapy (Microtubule inhibitors)"
      ]
    }
  },
  "13": {
    "id": 13,
    "row": 6,
    "column": 1,
    "symbol": "Cyt",
    "name": "Cytoplasm",
    "type": "Environment",
    "category": "General",
    "level1_basic": {
      "function": "Cellular Medium",
      "location": "Inside Plasma Membrane",
      "description": "The jelly-like fluid that fills the cell and contains all the organelles.",
      "summary": "The substance where life's reactions happen."
    },
    "level2_molecular": {
      "composition": "Water, Salts, Proteins",
      "size": "N/A",
      "components": [
        "Cytosol",
        "Inclusions"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#ecfdf5",
        "secondaryColor": "#d1fae5",
        "shape": "fluid-volume",
        "complexity": 0.2
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1674 (Leeuwenhoek)",
        "discoveredBy": "Antonie van Leeuwenhoek"
      },
      "commonUses": [
        "Intracellular Signaling",
        "Metabolism Studies"
      ]
    }
  },
  "14": {
    "id": 14,
    "row": 6,
    "column": 2,
    "symbol": "CW",
    "name": "Cell Wall",
    "type": "Boundary",
    "category": "Protection",
    "level1_basic": {
      "function": "Rigid Support",
      "location": "Outside Plant Membranes",
      "description": "A rigid outer layer in plant cells, fungi, and bacteria that provides protection and structural support.",
      "summary": "The external armor and skeleton."
    },
    "level2_molecular": {
      "composition": "Cellulose, Hemicellulose, Pectin",
      "size": "0.1-10 µm thick",
      "components": [
        "Primary Wall",
        "Middle Lamella",
        "Secondary Wall"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#065f46",
        "secondaryColor": "#064e3b",
        "shape": "geometric-lattice",
        "complexity": 0.6
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1665",
        "discoveredBy": "Robert Hooke"
      },
      "commonUses": [
        "Paper & Textiles",
        "Bio-materials Research"
      ]
    }
  },
  "15": {
    "id": 15,
    "row": 6,
    "column": 3,
    "symbol": "No",
    "name": "Nucleolus",
    "type": "Sub-Organelle",
    "category": "Nuclear",
    "level1_basic": {
      "function": "Ribosome Assembly",
      "location": "Inside Nucleus",
      "description": "The dense region within the nucleus where ribosomal RNA is synthesized and integrated with proteins.",
      "summary": "The factory for building the factories (ribosomes)."
    },
    "level2_molecular": {
      "composition": "rRNA, Protein, DNA",
      "size": "1-2 µm",
      "components": [
        "Fibrillar Center",
        "Granular Component"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#312e81",
        "secondaryColor": "#4338ca",
        "shape": "dense-bundle",
        "complexity": 0.7
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1774",
        "discoveredBy": "Felice Fontana"
      },
      "commonUses": [
        "Cancer Diagnostics",
        "Cell Growth Regulation"
      ]
    }
  },
  "16": {
    "id": 16,
    "row": 1,
    "column": 1,
    "symbol": "Cen",
    "name": "Centrioles",
    "type": "Structure",
    "category": "Division",
    "level1_basic": {
      "function": "Cell Division Organizer",
      "location": "Near Nucleus",
      "description": "Paired barrel-shaped organelles that help organize microtubules during cell division.",
      "summary": "The anchors for chromosomes during mitosis."
    },
    "level2_molecular": {
      "composition": "Tubulin",
      "size": "0.2 x 0.5 µm",
      "components": [
        "Microtubule Triplets",
        "Centrosome"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#6d28d9",
        "secondaryColor": "#c4b5fd",
        "shape": "pinwheel-tube",
        "complexity": 0.8
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1888",
        "discoveredBy": "Theodor Boveri"
      },
      "commonUses": [
        "Mitosis Visualization",
        "Infertility Research"
      ]
    }
  },
  "17": {
    "id": 17,
    "row": 1,
    "column": 3,
    "symbol": "RNA",
    "name": "RNA",
    "type": "Biomolecule",
    "category": "Information",
    "level1_basic": {
      "function": "Genetic Messenger",
      "location": "Nucleus / Cytoplasm",
      "description": "A single-stranded molecule that carries genetic information from DNA to ribosomes or acts as a functional molecule.",
      "summary": "The temporary copy and translator of DNA."
    },
    "level2_molecular": {
      "composition": "Ribose, Nitrogenous Bases (A, U, C, G), Phosphate",
      "size": "Varies",
      "components": [
        "mRNA",
        "tRNA",
        "rRNA"
      ]
    },
    "level3_properties": {
      "render": {
        "color": "#06b6d4",
        "secondaryColor": "#67e8f9",
        "shape": "single-strand",
        "complexity": 0.9
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1954 (Role found)",
        "discoveredBy": "Severo Ochoa"
      },
      "commonUses": [
        "RNA Vaccines",
        "Gene Expression Studies"
      ]
    }
  }
};
