export type Enterprise = {
  name: string
  detail: string
}

export type FarmModel = {
  code: "A1" | "A2"
  label: string
  subtitle: string
  plotSize: string
  orientation: string
  enterprises: Enterprise[]
  inputs: string[]
  labour: string
  typicalIncome: string
  successTip: string
}

export type Region = {
  id: 1 | 2 | 3 | 4 | 5
  roman: "I" | "II" | "III" | "IV" | "V"
  name: string
  tagline: string
  heroTitle: string
  description: string
  rainfall: string
  rainfallMin: number
  rainfallMax: number
  soil: string
  soilQuality: "VERY RICH" | "RICH" | "MODERATE" | "LOW" | "MARGINAL"
  provinces: string[]
  potential: string[]
  colorVar: string // css variable
  colorClass: string
  models: {
    A1: FarmModel
    A2: FarmModel
  }
}

export const regions: Region[] = [
  {
    id: 1,
    roman: "I",
    name: "The Eastern Highlands",
    tagline: "Zimbabwe's lush green crown",
    heroTitle: "Natural Region I",
    rainfall: ">1000 mm (rain possible all year)",
    rainfallMin: 1000,
    rainfallMax: 1400,
    soil: "Deep red loams",
    soilQuality: "VERY RICH",
    provinces: ["Manicaland", "Nyanga", "Mutare", "Chimanimani"],
    potential: [
      "Tea and coffee (premium export crops)",
      "Horticulture (potatoes, peas, tomatoes, fruits)",
      "Forestry (timber — pine, eucalyptus)",
      "Dairy and intensive beekeeping",
    ],
    description:
      "The wettest, coolest, and most fertile region in Zimbabwe — ideal for specialty and high-value crops.",
    colorVar: "#064e3b", // deep forest green
    colorClass: "bg-[#064e3b]",
    models: {
      A1: {
        code: "A1",
        label: "A1 Smallholder",
        subtitle: "Villagised resettlement · family farm",
        plotSize: "15 – 25 ha",
        orientation: "Subsistence + surplus to local markets",
        enterprises: [
          { name: "Irish potatoes", detail: "0.5 ha · 15–20 t/ha" },
          { name: "Tea / coffee out-grower", detail: "0.5 – 1 ha contract" },
          { name: "Horticulture", detail: "peas, tomatoes, leafy greens" },
          { name: "Fruit trees", detail: "bananas, avocado, apples" },
          { name: "Dairy cows", detail: "2 – 3 cross-breeds" },
          { name: "Beekeeping", detail: "10 – 20 hives" },
        ],
        inputs: [
          "Hand hoe · ox-drawn plough",
          "Knapsack sprayer",
          "Rainwater harvesting tanks",
        ],
        labour: "Family labour",
        typicalIncome: "USD 3,000 – 8,000 / year",
        successTip:
          "Join a horticulture out-grower scheme for guaranteed prices.",
      },
      A2: {
        code: "A2",
        label: "A2 Commercial",
        subtitle: "Medium-scale commercial resettlement",
        plotSize: "100 – 250 ha",
        orientation: "Export-led commercial production",
        enterprises: [
          { name: "Commercial tea / coffee", detail: "10 – 30 ha estate" },
          { name: "Timber plantation", detail: "pine & eucalyptus · 20+ ha" },
          { name: "Export horticulture", detail: "snow peas, fine beans, berries" },
          { name: "Commercial dairy", detail: "50 – 200 Friesian cows" },
          { name: "Seed potato multiplication", detail: "certified scheme" },
          { name: "Commercial apiary", detail: "100+ hives" },
        ],
        inputs: [
          "Tractors, sprayers, cold-chain",
          "Drip irrigation · greenhouses",
          "Cold storage & pack-house",
        ],
        labour: "15 – 60 permanent staff",
        typicalIncome: "USD 80,000 – 500,000 / year",
        successTip:
          "Secure GlobalG.A.P. certification to unlock EU export markets.",
      },
    },
  },
  {
    id: 2,
    roman: "II",
    name: "The Agricultural Heartland",
    tagline: "The breadbasket of Zimbabwe",
    heroTitle: "Agricultural Heartland",
    rainfall: "700 – 1050 mm (summer)",
    rainfallMin: 700,
    rainfallMax: 1050,
    soil: "Sandy loams",
    soilQuality: "RICH",
    provinces: [
      "Mashonaland West",
      "Mashonaland Central",
      "Mashonaland East",
      "Harare surrounds",
    ],
    potential: [
      "Maize (staple crop)",
      "Wheat (irrigation), soybeans, sugar beans",
      "Horticulture",
      "Poultry and dairy",
    ],
    description:
      "Reliable summer rainfall and rich sandy loams make this the engine of Zimbabwe's commercial agriculture.",
    colorVar: "#065f46", // rich meadow green
    colorClass: "bg-[#065f46]",
    models: {
      A1: {
        code: "A1",
        label: "A1 Smallholder",
        subtitle: "Villagised resettlement · family farm",
        plotSize: "25 – 50 ha",
        orientation: "Food security + cash crops",
        enterprises: [
          { name: "Maize", detail: "2 ha · 5 – 7 t/ha with fertiliser" },
          { name: "Tobacco (contract)", detail: "0.5 – 1 ha" },
          { name: "Soybeans / sugar beans", detail: "1 ha rotation" },
          { name: "Horticulture", detail: "0.5 ha kitchen & market garden" },
          { name: "Beef cattle", detail: "5 – 10 head" },
          { name: "Broilers", detail: "500 birds per batch" },
        ],
        inputs: [
          "Ox-drawn plough · 2-wheel tractor",
          "Command Agriculture / Pfumvudza inputs",
          "Poultry housing for 500 birds",
        ],
        labour: "Family + 1 – 2 seasonal workers",
        typicalIncome: "USD 5,000 – 15,000 / year",
        successTip:
          "Rotate maize with soy — soybeans fix nitrogen and fetch strong prices.",
      },
      A2: {
        code: "A2",
        label: "A2 Commercial",
        subtitle: "Medium to large commercial farm",
        plotSize: "200 – 400 ha",
        orientation: "Commercial grain, tobacco & livestock",
        enterprises: [
          { name: "Commercial maize", detail: "50 – 120 ha · 8 – 10 t/ha" },
          { name: "Tobacco", detail: "20 – 40 ha contract production" },
          { name: "Winter wheat (irrigated)", detail: "30 – 80 ha" },
          { name: "Soybeans", detail: "40 – 80 ha summer rotation" },
          { name: "Commercial poultry", detail: "layers 10k · broilers 20k/batch" },
          { name: "Dairy unit", detail: "100 – 300 cow herd" },
        ],
        inputs: [
          "Tractors, combine harvester, centre-pivot",
          "Tobacco curing barns",
          "Grain silos & feed mill",
        ],
        labour: "25 – 80 permanent staff",
        typicalIncome: "USD 150,000 – 1M+ / year",
        successTip:
          "Combine centre-pivot irrigation with wheat/maize double-cropping to maximise the asset.",
      },
    },
  },
  {
    id: 3,
    roman: "III",
    name: "The Transition Zone",
    tagline: "Mixed systems — cropping + livestock",
    heroTitle: "Transition Zone",
    rainfall: "500 – 700 mm (erratic, dry spells)",
    rainfallMin: 500,
    rainfallMax: 700,
    soil: "Clay loams",
    soilQuality: "MODERATE",
    provinces: ["Midlands", "Parts of Masvingo", "Parts of Manicaland"],
    potential: [
      "Maize (requires irrigation)",
      "Sorghum and pearl millet (drought-tolerant)",
      "Cotton, groundnuts, sunflower",
      "Extensive beef ranching",
    ],
    description:
      "A transitional belt where farmers balance crops with livestock to manage erratic rainfall.",
    colorVar: "#15803d", // olive green
    colorClass: "bg-[#15803d]",
    models: {
      A1: {
        code: "A1",
        label: "A1 Smallholder",
        subtitle: "Mixed crop-livestock family farm",
        plotSize: "60 – 80 ha",
        orientation: "Drought-smart food + cash crops",
        enterprises: [
          { name: "Maize (drought-tolerant hybrids)", detail: "1.5 ha Pfumvudza" },
          { name: "Sorghum / pearl millet", detail: "1 – 2 ha insurance crop" },
          { name: "Cotton", detail: "1 – 2 ha contract" },
          { name: "Groundnuts & sunflower", detail: "1 ha each" },
          { name: "Beef cattle", detail: "10 – 15 head on common grazing" },
          { name: "Goats", detail: "20 – 30 indigenous" },
        ],
        inputs: [
          "Conservation Agriculture basins",
          "Ox-drawn rippers",
          "Rainwater harvesting",
        ],
        labour: "Family labour",
        typicalIncome: "USD 2,500 – 7,000 / year",
        successTip:
          "Plant small grains alongside maize — if the rains fail, your family still eats.",
      },
      A2: {
        code: "A2",
        label: "A2 Commercial",
        subtitle: "Extensive ranch with cropping",
        plotSize: "300 – 500 ha",
        orientation: "Beef + drought-tolerant cash crops",
        enterprises: [
          { name: "Commercial beef herd", detail: "100 – 250 head" },
          { name: "Cotton", detail: "30 – 80 ha commercial" },
          { name: "Sunflower", detail: "40 – 100 ha" },
          { name: "Irrigated maize & wheat", detail: "20 – 50 ha where water permits" },
          { name: "Dairy on irrigated pasture", detail: "optional 30 – 80 cows" },
          { name: "Sorghum for brewing", detail: "contract production" },
        ],
        inputs: [
          "Tractors & ripper-planters",
          "Pivot or drag-line irrigation",
          "Paddock fencing, cattle handling",
        ],
        labour: "10 – 30 permanent staff",
        typicalIncome: "USD 60,000 – 300,000 / year",
        successTip:
          "Rotational grazing + sorghum contracts balance drought risk and cash flow.",
      },
    },
  },
  {
    id: 4,
    roman: "IV",
    name: "The Semi-Arid Belt",
    tagline: "Drought grains + cattle country",
    heroTitle: "Semi-Arid Belt",
    rainfall: "450 – 650 mm (frequent droughts)",
    rainfallMin: 450,
    rainfallMax: 650,
    soil: "Sandy, often shallow soils",
    soilQuality: "LOW",
    provinces: [
      "Matabeleland North",
      "Matabeleland South",
      "Parts of Masvingo",
      "Parts of Midlands",
    ],
    potential: [
      "Drought-tolerant small grains (sorghum, millet)",
      "Livestock — extensive cattle and goat production",
      "Groundnuts and cowpeas",
      "Agroforestry and indigenous fruits",
    ],
    description:
      "Unreliable rainfall means small grains and livestock dominate — resilience is the name of the game.",
    colorVar: "#a16207", // harvest gold
    colorClass: "bg-[#a16207]",
    models: {
      A1: {
        code: "A1",
        label: "A1 Smallholder",
        subtitle: "Villagised & Three Tier settlements",
        plotSize: "Villagised: 3.5ha + 40-70ha grazing",
        orientation: "Resilience & food security first",
        enterprises: [
          { name: "A1 Villagised", detail: "Sedentary: 0.5ha homestead, 3ha arable, 40-70ha communal grazing" },
          { name: "A1 Three Tier", detail: "In situ with legal grazing access only during drought years" },
          { name: "Sorghum & pearl millet", detail: "2 – 3 ha staple" },
          { name: "Finger millet (rapoko)", detail: "0.5 ha high-value" },
          { name: "Cowpeas & bambara", detail: "1 ha legumes" },
          { name: "Groundnuts", detail: "1 ha cash crop" },
          { name: "Indigenous cattle", detail: "10 – 15 head (Tuli, Mashona)" },
          { name: "Goats", detail: "30 – 50 head" },
        ],
        inputs: [
          "Donkey-drawn ripper",
          "Small grain thresher",
          "Stock-water boreholes (community)",
        ],
        labour: "Family labour",
        typicalIncome: "USD 1,500 – 4,500 / year",
        successTip:
          "Goats double in 3 years — build your herd as a living savings account.",
      },
      A2: {
        code: "A2",
        label: "A2 Commercial",
        subtitle: "Extensive beef ranch",
        plotSize: "700 – 1,500 ha",
        orientation: "Beef + strategic irrigation",
        enterprises: [
          { name: "Commercial beef herd", detail: "200 – 600 head" },
          { name: "Dryland sorghum / sunflower", detail: "50 – 150 ha" },
          { name: "Irrigated wheat & maize", detail: "where dam/borehole allows" },
          { name: "Game ranching", detail: "impala, kudu, eland" },
          { name: "Fodder production", detail: "velvet beans, lablab for dry-season feed" },
          { name: "Abattoir / butchery", detail: "vertical integration" },
        ],
        inputs: [
          "Paddocks & handling facilities",
          "Solar-powered boreholes",
          "Tractors, balers, feed mixers",
        ],
        labour: "8 – 25 permanent staff",
        typicalIncome: "USD 50,000 – 250,000 / year",
        successTip:
          "Holistic planned grazing restores veld and doubles stocking rates over 5 years.",
      },
    },
  },
  {
    id: 5,
    roman: "V",
    name: "The Dry Lowveld",
    tagline: "Game, irrigation schemes & extensive ranching",
    heroTitle: "Dry Lowveld",
    rainfall: "<450 mm (very low, erratic)",
    rainfallMin: 300,
    rainfallMax: 450,
    soil: "Shallow, sodic and sandy soils",
    soilQuality: "MARGINAL",
    provinces: [
      "Lowveld: Chiredzi, Triangle, Beitbridge",
      "Southern Matabeleland",
      "Zambezi Valley (parts)",
    ],
    potential: [
      "Sugar cane under large-scale irrigation (Chiredzi, Triangle)",
      "Wildlife ranching & eco-tourism conservancies",
      "Extensive cattle ranching",
      "Citrus & horticulture under irrigation",
    ],
    description:
      "The hottest, driest region — unsuited to rain-fed cropping, but home to Zimbabwe's great irrigation estates and wildlife economies.",
    colorVar: "#78350f", // earthy brown
    colorClass: "bg-[#78350f]",
    models: {
      A1: {
        code: "A1",
        label: "A1 Smallholder",
        subtitle: "Villagised & Three Tier settlements",
        plotSize: "Villagised: 3.5ha + 40-70ha grazing",
        orientation: "Irrigation plots + livestock + indigenous products",
        enterprises: [
          { name: "A1 Villagised", detail: "Sedentary: 0.5ha homestead, 3ha arable, 40-70ha communal grazing" },
          { name: "A1 Three Tier", detail: "In situ with legal grazing access only during drought years" },
          { name: "Sugar cane out-grower", detail: "1 ha in Chiredzi/Triangle schemes" },
          { name: "Drought grains (dryland)", detail: "sorghum, pearl millet" },
          { name: "Indigenous cattle", detail: "Tuli, Mashona breeds" },
          { name: "Meat goats", detail: "50 – 80 head" },
          { name: "Beekeeping", detail: "mopane honey — 20+ hives" },
          { name: "Indigenous products", detail: "baobab, marula, mopane worms" },
        ],
        inputs: [
          "Irrigation scheme membership",
          "Solar boreholes for stock",
          "Processing for wild-harvest products",
        ],
        labour: "Family labour",
        typicalIncome: "USD 2,000 – 6,000 / year",
        successTip:
          "Add value to wild products — dried mopane worms triple in price when packed for cities.",
      },
      A2: {
        code: "A2",
        label: "A2 Commercial",
        subtitle: "Estate / conservancy / irrigation",
        plotSize: "1,500 – 2,000 ha",
        orientation: "Irrigation estates or game conservancies",
        enterprises: [
          { name: "Sugar cane estate", detail: "Hippo Valley, Triangle models" },
          { name: "Citrus under irrigation", detail: "oranges, grapefruit for export" },
          { name: "Safari / game conservancy", detail: "Big Five hunting & photo tourism" },
          { name: "Commercial beef (indigenous)", detail: "400 – 1,000 head" },
          { name: "Horticulture under irrigation", detail: "chillies, paprika, tomatoes" },
          { name: "Agro-processing", detail: "juice, ethanol, hides" },
        ],
        inputs: [
          "Large-scale flood / drip irrigation",
          "Game fencing & lodges",
          "Pack-houses & cold storage",
        ],
        labour: "50 – 500 staff (seasonal peaks)",
        typicalIncome: "USD 250,000 – several million / year",
        successTip:
          "Pair conservancy tourism with cattle — eco-revenue funds herd expansion.",
      },
    },
  },
]

export const regionById = (id: number) => regions.find((r) => r.id === id)!
