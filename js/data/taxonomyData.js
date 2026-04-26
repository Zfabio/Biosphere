export const taxonomyData = {
  "kingdom_animalia": {
    "id": 1001,
    "name": "Animal Kingdom",
    "scientificName": "Animalia",
    "category": "Eukaryote",
    "symbol": "Ani",
    "type": "Kingdom",
    "level1_basic": {
      "description": "Multicellular, eukaryotic organisms that are heterotrophic, meaning they obtain nutrients by consuming other organisms.",
      "keyFeatures": ["Multicellular", "Motility", "Heterotrophy"],
      "examples": ["Mammals", "Birds", "Reptiles", "Insects"]
    },
    "level2_biological": {
      "reproduction": "Primarily sexual",
      "digestion": "Internal",
      "cellStructure": "Lacks cell walls",
      "specializedTissues": true
    },
    "level3_visual": {
      "image": "images/taxa-animalia.png",
      "color": "#fb923c",
      "icon": "paw"
    }
  },
  "kingdom_plantae": {
    "id": 1002,
    "name": "Plant Kingdom",
    "scientificName": "Plantae",
    "category": "Eukaryote",
    "symbol": "Pla",
    "type": "Kingdom",
    "level1_basic": {
      "description": "Multicellular eukaryotes that are primarily autotrophic, using photosynthesis to produce energy from sunlight.",
      "keyFeatures": ["Photosynthesis", "Cell Walls", "Sessile"],
      "examples": ["Trees", "Flowers", "Ferns", "Mosses"]
    },
    "level2_biological": {
      "reproduction": "Sexual and Asexual",
      "digestion": "External (Absorption/Synthesis)",
      "cellStructure": "Contains Cellulose & Chlorophyll",
      "specializedTissues": true
    },
    "level3_visual": {
      "image": "images/taxa-plantae.png",
      "color": "#4ade80",
      "icon": "leaf"
    }
  },
  "kingdom_fungi": {
    "id": 1003,
    "name": "Fungi Kingdom",
    "scientificName": "Fungi",
    "category": "Eukaryote",
    "symbol": "Fun",
    "type": "Kingdom",
    "level1_basic": {
      "description": "Eukaryotic organisms that include microorganisms such as yeasts and molds, as well as the more familiar mushrooms.",
      "keyFeatures": ["Chitin Cell Walls", "Spore Reproduction", "Decomposers"],
      "examples": ["Mushrooms", "Yeasts", "Molds"]
    },
    "level2_biological": {
      "reproduction": "Spores (Sexual/Asexual)",
      "digestion": "External (Absorption/Exoenzymes)",
      "cellStructure": "Contains Chitin",
      "specializedTissues": false
    },
    "level3_visual": {
      "image": "images/taxa-fungi.png",
      "color": "#f87171",
      "icon": "mushroom"
    }
  }
};
