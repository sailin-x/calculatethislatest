import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateReplacementCost, calculateInsuranceCoverage, generateCostBreakdown } from './formulas';
import { validateBuildingReplacementCostInputs } from './validation';

export const BuildingReplacementCostCalculator: Calculator = {
  id: 'BuildingReplacementCost-calculator',
  name: 'Building Replacement Cost Calculator',
  description: 'Calculate the cost to rebuild a building from scratch, including materials, labor, and overhead costs for insurance and construction planning purposes.',
  category: 'finance',
  subcategory: 'construction',
  tags: ['construction', 'replacement-cost', 'insurance', 'building', 'cost-estimation', 'real-estate'],
  
  inputs: [
    {
      id: 'buildingType',
      label: 'Building Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'multi-family', label: 'Multi-Family Building' },
        { value: 'commercial', label: 'Commercial Building' },
        { value: 'industrial', label: 'Industrial Building' },
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Building' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'apartment', label: 'Apartment Building' }
      ],
      tooltip: 'Type of building being evaluated',
      placeholder: 'single-family'
    },
    {
      id: 'constructionQuality',
      label: 'Construction Quality',
      type: 'select',
      required: true,
      options: [
        { value: 'economy', label: 'Economy' },
        { value: 'standard', label: 'Standard' },
        { value: 'custom', label: 'Custom' },
        { value: 'luxury', label: 'Luxury' },
        { value: 'premium', label: 'Premium' }
      ],
      tooltip: 'Quality level of construction materials and finishes',
      placeholder: 'standard'
    },
    {
      id: 'totalSquareFootage',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      min: 100,
      max: 1000000,
      step: 100,
      tooltip: 'Total square footage of the building',
      placeholder: '2500'
    },
    {
      id: 'numberOfStories',
      label: 'Number of Stories',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      tooltip: 'Number of stories in the building',
      placeholder: '2'
    },
    {
      id: 'yearBuilt',
      label: 'Year Built',
      type: 'number',
      required: true,
      min: 1900,
      max: 2030,
      step: 1,
      tooltip: 'Year the building was constructed',
      placeholder: '2010'
    },
    {
      id: 'location',
      label: 'Location (State/Region)',
      type: 'select',
      required: true,
      options: [
        { value: 'northeast', label: 'Northeast (High Cost)' },
        { value: 'west-coast', label: 'West Coast (High Cost)' },
        { value: 'midwest', label: 'Midwest (Medium Cost)' },
        { value: 'south', label: 'South (Medium Cost)' },
        { value: 'southwest', label: 'Southwest (Medium Cost)' },
        { value: 'mountain', label: 'Mountain States (Medium Cost)' },
        { value: 'rural', label: 'Rural Areas (Lower Cost)' }
      ],
      tooltip: 'Geographic location affecting construction costs',
      placeholder: 'midwest'
    },
    {
      id: 'foundationType',
      label: 'Foundation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'slab', label: 'Slab Foundation' },
        { value: 'crawlspace', label: 'Crawlspace Foundation' },
        { value: 'basement', label: 'Basement Foundation' },
        { value: 'pier-beam', label: 'Pier & Beam Foundation' }
      ],
      tooltip: 'Type of foundation structure',
      placeholder: 'basement'
    },
    {
      id: 'roofType',
      label: 'Roof Type',
      type: 'select',
      required: true,
      options: [
        { value: 'asphalt-shingle', label: 'Asphalt Shingle' },
        { value: 'metal', label: 'Metal Roof' },
        { value: 'tile', label: 'Tile Roof' },
        { value: 'slate', label: 'Slate Roof' },
        { value: 'flat', label: 'Flat Roof' }
      ],
      tooltip: 'Type of roofing material',
      placeholder: 'asphalt-shingle'
    },
    {
      id: 'exteriorMaterial',
      label: 'Exterior Material',
      type: 'select',
      required: true,
      options: [
        { value: 'vinyl-siding', label: 'Vinyl Siding' },
        { value: 'brick', label: 'Brick' },
        { value: 'stone', label: 'Stone' },
        { value: 'stucco', label: 'Stucco' },
        { value: 'wood-siding', label: 'Wood Siding' },
        { value: 'fiber-cement', label: 'Fiber Cement' }
      ],
      tooltip: 'Primary exterior wall material',
      placeholder: 'vinyl-siding'
    },
    {
      id: 'heatingSystem',
      label: 'Heating System',
      type: 'select',
      required: true,
      options: [
        { value: 'forced-air', label: 'Forced Air' },
        { value: 'heat-pump', label: 'Heat Pump' },
        { value: 'radiant', label: 'Radiant Heat' },
        { value: 'boiler', label: 'Boiler System' },
        { value: 'baseboard', label: 'Baseboard Heat' }
      ],
      tooltip: 'Type of heating system',
      placeholder: 'forced-air'
    },
    {
      id: 'coolingSystem',
      label: 'Cooling System',
      type: 'select',
      required: true,
      options: [
        { value: 'central-ac', label: 'Central Air Conditioning' },
        { value: 'heat-pump', label: 'Heat Pump (Cooling)' },
        { value: 'window-units', label: 'Window Units' },
        { value: 'mini-split', label: 'Mini-Split System' },
        { value: 'none', label: 'No Cooling' }
      ],
      tooltip: 'Type of cooling system',
      placeholder: 'central-ac'
    },
    {
      id: 'kitchenQuality',
      label: 'Kitchen Quality',
      type: 'select',
      required: false,
      options: [
        { value: 'basic', label: 'Basic' },
        { value: 'standard', label: 'Standard' },
        { value: 'upgraded', label: 'Upgraded' },
        { value: 'luxury', label: 'Luxury' }
      ],
      tooltip: 'Quality level of kitchen finishes and appliances',
      placeholder: 'standard'
    },
    {
      id: 'bathroomCount',
      label: 'Number of Bathrooms',
      type: 'number',
      required: false,
      min: 1,
      max: 20,
      step: 0.5,
      tooltip: 'Number of bathrooms in the building',
      placeholder: '3'
    },
    {
      id: 'bedroomCount',
      label: 'Number of Bedrooms',
      type: 'number',
      required: false,
      min: 1,
      max: 20,
      step: 1,
      tooltip: 'Number of bedrooms in the building',
      placeholder: '4'
    },
    {
      id: 'garageSpaces',
      label: 'Garage Spaces',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 1,
      tooltip: 'Number of garage parking spaces',
      placeholder: '2'
    },
    {
      id: 'specialFeatures',
      label: 'Special Features',
      type: 'multiselect',
      required: false,
      options: [
        { value: 'fireplace', label: 'Fireplace' },
        { value: 'pool', label: 'Swimming Pool' },
        { value: 'deck', label: 'Deck/Patio' },
        { value: 'elevator', label: 'Elevator' },
        { value: 'security-system', label: 'Security System' },
        { value: 'smart-home', label: 'Smart Home Features' },
        { value: 'solar-panels', label: 'Solar Panels' },
        { value: 'finished-basement', label: 'Finished Basement' },
        { value: 'custom-cabinets', label: 'Custom Cabinets' },
        { value: 'granite-countertops', label: 'Granite Countertops' }
      ],
      tooltip: 'Additional features that affect replacement cost',
      placeholder: 'fireplace,deck'
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: 'Expected annual construction cost inflation',
      placeholder: '3.0'
    },
    {
      id: 'demolitionCost',
      label: 'Demolition Cost ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Cost to demolish existing structure (if applicable)',
      placeholder: '15000'
    },
    {
      id: 'sitePreparation',
      label: 'Site Preparation Cost ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 500000,
      step: 1000,
      tooltip: 'Cost for site preparation and utilities',
      placeholder: '25000'
    }
  ],

  outputs: [
    {
      id: 'baseReplacementCost',
      label: 'Base Replacement Cost',
      type: 'currency',
      explanation: 'Basic cost to rebuild the structure'
    },
    {
      id: 'totalReplacementCost',
      label: 'Total Replacement Cost',
      type: 'currency',
      explanation: 'Total cost including all features and site work'
    },
    {
      id: 'costPerSquareFoot',
      label: 'Cost per Square Foot',
      type: 'currency',
      explanation: 'Replacement cost per square foot'
    },
    {
      id: 'insuranceCoverage',
      label: 'Recommended Insurance Coverage',
      type: 'currency',
      explanation: 'Suggested insurance coverage amount'
    },
    {
      id: 'materialsCost',
      label: 'Materials Cost',
      type: 'currency',
      explanation: 'Estimated cost of construction materials'
    },
    {
      id: 'laborCost',
      label: 'Labor Cost',
      type: 'currency',
      explanation: 'Estimated cost of construction labor'
    },
    {
      id: 'overheadCost',
      label: 'Overhead & Profit',
      type: 'currency',
      explanation: 'Contractor overhead and profit margin'
    },
    {
      id: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of construction costs'
    },
    {
      id: 'inflationAdjustment',
      label: 'Inflation Adjustment',
      type: 'currency',
      explanation: 'Additional cost due to inflation since year built'
    },
    {
      id: 'regionalAdjustment',
      label: 'Regional Cost Factor',
      type: 'percentage',
      explanation: 'Cost adjustment factor for geographic location'
    },
    {
      id: 'qualityMultiplier',
      label: 'Quality Multiplier',
      type: 'percentage',
      explanation: 'Cost multiplier based on construction quality'
    },
    {
      id: 'replacementTimeframe',
      label: 'Estimated Replacement Time',
      type: 'text',
      explanation: 'Estimated time to complete replacement'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateBuildingReplacementCostInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate replacement cost
    const replacementCost = calculateReplacementCost(inputs);
    
    // Calculate insurance coverage
    const insuranceCoverage = calculateInsuranceCoverage(replacementCost);
    
    // Generate cost breakdown
    const costBreakdown = generateCostBreakdown(inputs, replacementCost);

    return {
      baseReplacementCost: replacementCost.baseCost,
      totalReplacementCost: replacementCost.totalCost,
      costPerSquareFoot: replacementCost.costPerSqFt,
      insuranceCoverage: insuranceCoverage.recommendedCoverage,
      materialsCost: replacementCost.materialsCost,
      laborCost: replacementCost.laborCost,
      overheadCost: replacementCost.overheadCost,
      costBreakdown: costBreakdown.summary,
      inflationAdjustment: replacementCost.inflationAdjustment,
      regionalAdjustment: replacementCost.regionalFactor,
      qualityMultiplier: replacementCost.qualityMultiplier,
      replacementTimeframe: replacementCost.timeframe
    };
  },

  formulas: [
    {
      name: 'Base Replacement Cost',
      formula: 'Base Cost = Square Footage × Base Rate × Quality Multiplier × Regional Factor',
      description: 'Basic calculation for replacement cost'
    },
    {
      name: 'Cost per Square Foot',
      formula: 'Cost per Sq Ft = Total Replacement Cost ÷ Square Footage',
      description: 'Average cost per square foot of construction'
    },
    {
      name: 'Insurance Coverage',
      formula: 'Insurance Coverage = Total Replacement Cost × 1.1',
      description: 'Recommended coverage with 10% buffer for contingencies'
    },
    {
      name: 'Inflation Adjustment',
      formula: 'Inflation = Base Cost × (1 + Annual Rate)^Years Since Built',
      description: 'Adjustment for construction cost inflation over time'
    },
    {
      name: 'Quality Multiplier',
      formula: 'Quality Multiplier = Base Rate × Quality Factor',
      description: 'Cost multiplier based on construction quality level'
    }
  ],

  examples: [
    {
      name: 'Standard Single Family Home',
      description: 'Typical 2,500 sq ft single family home with standard construction',
      inputs: {
        buildingType: 'single-family',
        constructionQuality: 'standard',
        totalSquareFootage: 2500,
        numberOfStories: 2,
        yearBuilt: 2010,
        location: 'midwest',
        foundationType: 'basement',
        roofType: 'asphalt-shingle',
        exteriorMaterial: 'vinyl-siding',
        heatingSystem: 'forced-air',
        coolingSystem: 'central-ac',
        kitchenQuality: 'standard',
        bathroomCount: 3,
        bedroomCount: 4,
        garageSpaces: 2,
        specialFeatures: ['fireplace', 'deck'],
        inflationRate: 3.0,
        demolitionCost: 15000,
        sitePreparation: 25000
      },
      expectedOutputs: {
        baseReplacementCost: 375000,
        totalReplacementCost: 415000,
        costPerSquareFoot: 166,
        insuranceCoverage: 456500,
        materialsCost: 187500,
        laborCost: 150000,
        overheadCost: 37500
      }
    },
    {
      name: 'Luxury Custom Home',
      description: 'High-end 4,000 sq ft custom home with premium finishes',
      inputs: {
        buildingType: 'single-family',
        constructionQuality: 'luxury',
        totalSquareFootage: 4000,
        numberOfStories: 2,
        yearBuilt: 2020,
        location: 'west-coast',
        foundationType: 'basement',
        roofType: 'tile',
        exteriorMaterial: 'stone',
        heatingSystem: 'radiant',
        coolingSystem: 'central-ac',
        kitchenQuality: 'luxury',
        bathroomCount: 5,
        bedroomCount: 5,
        garageSpaces: 3,
        specialFeatures: ['fireplace', 'pool', 'smart-home', 'granite-countertops'],
        inflationRate: 3.5,
        demolitionCost: 25000,
        sitePreparation: 50000
      },
      expectedOutputs: {
        baseReplacementCost: 1200000,
        totalReplacementCost: 1275000,
        costPerSquareFoot: 318.75,
        insuranceCoverage: 1402500,
        materialsCost: 600000,
        laborCost: 480000,
        overheadCost: 120000
      }
    },
    {
      name: 'Commercial Office Building',
      description: 'Modern 10,000 sq ft office building with standard commercial construction',
      inputs: {
        buildingType: 'office',
        constructionQuality: 'standard',
        totalSquareFootage: 10000,
        numberOfStories: 2,
        yearBuilt: 2015,
        location: 'northeast',
        foundationType: 'slab',
        roofType: 'flat',
        exteriorMaterial: 'brick',
        heatingSystem: 'forced-air',
        coolingSystem: 'central-ac',
        kitchenQuality: 'basic',
        bathroomCount: 8,
        bedroomCount: 0,
        garageSpaces: 0,
        specialFeatures: ['elevator', 'security-system'],
        inflationRate: 3.0,
        demolitionCost: 50000,
        sitePreparation: 75000
      },
      expectedOutputs: {
        baseReplacementCost: 1800000,
        totalReplacementCost: 1925000,
        costPerSquareFoot: 192.5,
        insuranceCoverage: 2117500,
        materialsCost: 900000,
        laborCost: 720000,
        overheadCost: 180000
      }
    }
  ],

  usageInstructions: [
    'Select the building type and construction quality level',
    'Enter the total square footage and number of stories',
    'Specify the year built and geographic location',
    'Choose foundation, roof, and exterior materials',
    'Select heating and cooling systems',
    'Add kitchen quality and room counts',
    'Include any special features or amenities',
    'Set inflation rate and additional costs if applicable',
    'Review the total replacement cost and insurance recommendations',
    'Use the cost breakdown for detailed analysis',
    'Consider regional factors and quality multipliers in your assessment'
  ]
};
