export const taxonomyData = {
  // --- KINGDOM ANIMALIA ---
  "ani_whale": {
    "id": 1101,
    "name": "Blue Whale",
    "scientificName": "Balaenoptera musculus",
    "category": "Mammalia",
    "symbol": "Bw",
    "type": "Animal",
    "level1_basic": {
      "habitat": "Ocean",
      "location": "Global",
      "description": "The largest animal ever known to have existed. A carnivorous marine mammal belonging to the baleen whale suborder.",
      "summary": "Largest marine mammal, filter feeder."
    },
    "level2_biological": {
      "composition": "Vertebrate, Mammal",
      "size": "24–30 meters",
      "components": ["Baleen plates", "Blowhole", "Dorsal fin"]
    },
    "level3_properties": {
      "render": {
        "color": "#3b82f6",
        "secondaryColor": "#1d4ed8",
        "shape": "Fusiform",
        "complexity": 0.85
      }
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1758",
        "discoveredBy": "Carl Linnaeus"
      },
      "commonUses": ["Ecosystem stabilizer", "Nutrient cycling"]
    },
    "image": "images/taxa-whale.png"
  },
  "ani_tiger": {
    "id": 1102,
    "name": "Bengal Tiger",
    "scientificName": "Panthera tigris tigris",
    "category": "Mammalia",
    "symbol": "Bt",
    "type": "Animal",
    "level1_basic": {
      "habitat": "Jungle / Grasslands",
      "location": "Asia",
      "description": "A top predator and the largest living cat species. Characterized by dark vertical stripes on orange-brown fur.",
      "summary": "Apex predator, solitary hunter."
    },
    "level2_biological": {
      "composition": "Vertebrate, Feline",
      "size": "2.7–3.1 meters",
      "components": ["Retractable claws", "Canine teeth", "Striped fur"]
    },
    "level4_history_stse": {
      "history": {
        "discoveryYear": "1758",
        "discoveredBy": "Carl Linnaeus"
      },
      "commonUses": ["Keystone species", "Cultural icon"]
    },
    "image": "images/taxa-animalia.png"
  },
  "ani_falcon": {
    "id": 1103,
    "name": "Peregrine Falcon",
    "scientificName": "Falco peregrinus",
    "category": "Aves",
    "symbol": "Pf",
    "type": "Animal",
    "level1_basic": {
      "habitat": "Cliffs / Skyscrapers",
      "location": "Global",
      "description": "The fastest member of the animal kingdom, capable of reaching speeds over 320 km/h (200 mph) during its characteristic hunting stoop.",
      "summary": "Fastest bird, raptor."
    },
    "level2_biological": {
      "composition": "Vertebrate, Bird",
      "size": "Wingspan 74–120 cm",
      "components": ["Pointed wings", "Hooked beak", "Talon feet"]
    },
    "image": "images/taxa-falcon.png"
  },

  // --- KINGDOM PLANTAE ---
  "pla_oak": {
    "id": 1201,
    "name": "White Oak",
    "scientificName": "Quercus alba",
    "category": "Pinopsida",
    "symbol": "Wo",
    "type": "Plant",
    "level1_basic": {
      "habitat": "Forests",
      "location": "North America",
      "description": "A large, long-lived hardwood tree known for its strength and durability. Produces acorns as seeds.",
      "summary": "Hardwood tree, acorn producer."
    },
    "level2_biological": {
      "composition": "Angiosperm, Woody",
      "size": "20–30 meters",
      "components": ["Acorns", "Lobed leaves", "Deep roots"]
    },
    "image": "images/taxa-plantae.png"
  },

  // --- KINGDOM FUNGI ---
  "fun_amanita": {
    "id": 1301,
    "name": "Fly Agaric",
    "scientificName": "Amanita muscaria",
    "category": "Agaricomycetes",
    "symbol": "Am",
    "type": "Fungi",
    "level1_basic": {
      "habitat": "Coniferous Forests",
      "location": "Northern Hemisphere",
      "description": "An iconic mushroom characterized by its bright red cap with white spots. It is poisonous and psychoactive.",
      "summary": "Iconic toadstool, mycorrhizal."
    },
    "level2_biological": {
      "composition": "Basidiomycete",
      "size": "Cap 8–20 cm",
      "components": ["Red cap", "White gills", "Volva/Stalk"]
    },
    "image": "images/taxa-fungi.png"
  },

  // --- KINGDOM MONERA (BACTERIA) ---
  "bac_ecoli": {
    "id": 1401,
    "name": "E. coli",
    "scientificName": "Escherichia coli",
    "category": "Proteobacteria",
    "symbol": "Ec",
    "type": "Bacteria",
    "level1_basic": {
      "habitat": "Intestines / Soil",
      "location": "Global",
      "description": "A Gram-negative, rod-shaped bacterium. While most strains are harmless, some can cause severe food poisoning.",
      "summary": "Model organism, gut bacteria."
    },
    "level2_biological": {
      "composition": "Prokaryotic",
      "size": "1.0–2.0 μm",
      "components": ["Flagella", "Pili", "Plasmid DNA"]
    },
    "image": "images/taxa-bacteria.png" // Path placeholder
  },

  // --- KINGDOM PROTISTA ---
  "pro_amoeba": {
    "id": 1501,
    "name": "Amoeba",
    "scientificName": "Amoeba proteus",
    "category": "Tubulinea",
    "symbol": "Ap",
    "type": "Protist",
    "level1_basic": {
      "habitat": "Freshwater",
      "location": "Global",
      "description": "A single-celled eukaryotic organism that moves and feeds by extending temporary projections called pseudopodia.",
      "summary": "Single-cell eukaryote, shapeshifter."
    },
    "level2_biological": {
      "composition": "Eukaryotic, Amoeboid",
      "size": "200–600 μm",
      "components": ["Pseudopods", "Contractile vacuole", "Nucleus"]
    },
    "image": "images/taxa-protist.png" // Path placeholder
  },
  "ani_elephant": {
    "id": 1104,
    "name": "African Elephant",
    "scientificName": "Loxodonta africana",
    "category": "Mammalia",
    "symbol": "Ae",
    "type": "Animal",
    "level1_basic": {
      "habitat": "Savanna / Forests",
      "location": "Africa",
      "description": "The largest land animal on Earth. Known for its cognitive ability, complex social structures, and distinctive trunk.",
      "summary": "Largest land mammal, highly social."
    },
    "level2_biological": {
      "composition": "Vertebrate, Mammal",
      "size": "3.2–4.0 meters (Height)",
      "components": ["Trunk", "Tusks", "Large ears"]
    },
    "image": "images/taxa-elephant.png"
  },
  "bac_cyano": {
    "id": 1402,
    "name": "Cyanobacteria",
    "scientificName": "Cyanobacteria",
    "category": "Bacteria",
    "symbol": "Cy",
    "type": "Monera",
    "level1_basic": {
      "habitat": "Aquatic environments",
      "location": "Global",
      "description": "Photosynthetic bacteria that produce oxygen as a byproduct. Played a major role in the oxygenation of Earth's atmosphere.",
      "summary": "Oxygen-producing bacteria."
    },
    "level2_biological": {
      "composition": "Prokaryotic, Photosynthetic",
      "size": "0.5–60 μm",
      "components": ["Thylakoids", "Phycobilisomes", "Peptidoglycan"]
    },
    "image": "images/taxa-bacteria.png"
  },
  "pla_sequoia": {
    "id": 1202,
    "name": "Giant Sequoia",
    "scientificName": "Sequoiadendron giganteum",
    "category": "Pinopsida",
    "symbol": "Gs",
    "type": "Plantae",
    "level1_basic": {
      "habitat": "Mountain Slopes",
      "location": "California, USA",
      "description": "One of the most massive tree species on Earth. Known for its thick, fire-resistant reddish-brown bark.",
      "summary": "Massive coniferous tree."
    },
    "level2_biological": {
      "composition": "Gymnosperm, Woody",
      "size": "50–85 meters",
      "components": ["Thick bark", "Seed cones", "Scale-like leaves"]
    },
    "image": "images/taxa-plantae.png"
  }
};
