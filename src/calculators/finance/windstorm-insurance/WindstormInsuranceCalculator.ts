import { Calculator } from '../../../types/calculator';

export const WindstormInsuranceCalculator: Calculator = {
  id: 'windstorm-insurance',
  title: 'Windstorm Insurance Calculator',
  category: 'finance',
  description: 'Calculate windstorm insurance premiums, coverage limits, and risk assessments for properties in hurricane-prone areas',
  usageInstructions: [
    'Enter your property details including location, construction type, and value',
    'Specify coverage limits and deductibles',
    'Select windstorm protection features and mitigation measures',
    'Review premium calculations and risk assessments',
    'Compare different coverage options and deductibles'
  ],
  inputs: {
    propertyValue: {
      type: 'number',
      unit: 'USD',
      description: 'Total property value',
      placeholder: '500000',
      validation: {
        required: true,
        min: 10000,
        max: 10000000
      }
    },
    propertyType: {
      type: 'select',
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'multi-family', label: 'Multi-Family Building' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'rental', label: 'Rental Property' }
      ],
      description: 'Type of property',
      placeholder: 'Select property type',
      validation: {
        required: true
      }
    },
    constructionType: {
      type: 'select',
      options: [
        { value: 'frame', label: 'Wood Frame' },
        { value: 'masonry', label: 'Masonry' },
        { value: 'concrete', label: 'Concrete Block' },
        { value: 'steel', label: 'Steel Frame' },
        { value: 'mixed', label: 'Mixed Construction' }
      ],
      description: 'Primary construction material',
      placeholder: 'Select construction type',
      validation: {
        required: true
      }
    },
    roofType: {
      type: 'select',
      options: [
        { value: 'asphalt', label: 'Asphalt Shingles' },
        { value: 'metal', label: 'Metal Roof' },
        { value: 'tile', label: 'Clay/Concrete Tile' },
        { value: 'slate', label: 'Slate Roof' },
        { value: 'flat', label: 'Flat Roof' }
      ],
      description: 'Roof type and material',
      placeholder: 'Select roof type',
      validation: {
        required: true
      }
    },
    roofAge: {
      type: 'number',
      unit: 'years',
      description: 'Age of roof in years',
      placeholder: '10',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    location: {
      type: 'select',
      options: [
        { value: 'florida', label: 'Florida' },
        { value: 'texas', label: 'Texas' },
        { value: 'louisiana', label: 'Louisiana' },
        { value: 'mississippi', label: 'Mississippi' },
        { value: 'alabama', label: 'Alabama' },
        { value: 'georgia', label: 'Georgia' },
        { value: 'south-carolina', label: 'South Carolina' },
        { value: 'north-carolina', label: 'North Carolina' },
        { value: 'virginia', label: 'Virginia' },
        { value: 'other-coastal', label: 'Other Coastal State' },
        { value: 'inland', label: 'Inland State' }
      ],
      description: 'Property location state',
      placeholder: 'Select state',
      validation: {
        required: true
      }
    },
    distanceFromCoast: {
      type: 'number',
      unit: 'miles',
      description: 'Distance from coastline',
      placeholder: '5',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    elevation: {
      type: 'number',
      unit: 'feet',
      description: 'Property elevation above sea level',
      placeholder: '15',
      validation: {
        required: true,
        min: 0,
        max: 1000
      }
    },
    windZone: {
      type: 'select',
      options: [
        { value: 'zone1', label: 'Zone 1 (Lowest Risk)' },
        { value: 'zone2', label: 'Zone 2 (Low Risk)' },
        { value: 'zone3', label: 'Zone 3 (Moderate Risk)' },
        { value: 'zone4', label: 'Zone 4 (High Risk)' },
        { value: 'zone5', label: 'Zone 5 (Highest Risk)' }
      ],
      description: 'Wind zone classification',
      placeholder: 'Select wind zone',
      validation: {
        required: true
      }
    },
    coverageLimit: {
      type: 'number',
      unit: 'USD',
      description: 'Desired coverage limit',
      placeholder: '500000',
      validation: {
        required: true,
        min: 50000,
        max: 10000000
      }
    },
    deductible: {
      type: 'number',
      unit: 'USD',
      description: 'Windstorm deductible amount',
      placeholder: '5000',
      validation: {
        required: true,
        min: 1000,
        max: 100000
      }
    },
    deductibleType: {
      type: 'select',
      options: [
        { value: 'percentage', label: 'Percentage of Coverage' },
        { value: 'fixed', label: 'Fixed Dollar Amount' }
      ],
      description: 'Type of deductible',
      placeholder: 'Select deductible type',
      validation: {
        required: true
      }
    },
    windMitigationFeatures: {
      type: 'select',
      options: [
        { value: 'none', label: 'No Mitigation Features' },
        { value: 'basic', label: 'Basic Wind Protection' },
        { value: 'enhanced', label: 'Enhanced Wind Protection' },
        { value: 'premium', label: 'Premium Wind Protection' }
      ],
      description: 'Wind mitigation features installed',
      placeholder: 'Select mitigation level',
      validation: {
        required: true
      }
    },
    hurricaneShutters: {
      type: 'boolean',
      description: 'Hurricane shutters installed',
      placeholder: 'Select yes or no',
      validation: {
        required: true
      }
    },
    impactResistantWindows: {
      type: 'boolean',
      description: 'Impact-resistant windows installed',
      placeholder: 'Select yes or no',
      validation: {
        required: true
      }
    },
    roofReinforcement: {
      type: 'boolean',
      description: 'Roof reinforcement/clips installed',
      placeholder: 'Select yes or no',
      validation: {
        required: true
      }
    },
    garageDoorReinforcement: {
      type: 'boolean',
      description: 'Garage door reinforcement installed',
      placeholder: 'Select yes or no',
      validation: {
        required: true
      }
    },
    claimsHistory: {
      type: 'number',
      unit: 'claims',
      description: 'Number of windstorm claims in past 5 years',
      placeholder: '0',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    creditScore: {
      type: 'number',
      description: 'Insurance credit score (300-850)',
      placeholder: '750',
      validation: {
        required: true,
        min: 300,
        max: 850
      }
    },
    policyTerm: {
      type: 'number',
      unit: 'years',
      description: 'Policy term length',
      placeholder: '1',
      validation: {
        required: true,
        min: 1,
        max: 5
      }
    }
  },
  outputs: {
    basePremium: {
      type: 'number',
      unit: 'USD',
      description: 'Base windstorm insurance premium'
    },
    riskFactor: {
      type: 'number',
      description: 'Risk factor multiplier'
    },
    mitigationDiscount: {
      type: 'number',
      unit: 'USD',
      description: 'Discount for wind mitigation features'
    },
    locationSurcharge: {
      type: 'number',
      unit: 'USD',
      description: 'Location-based surcharge'
    },
    claimsSurcharge: {
      type: 'number',
      unit: 'USD',
      description: 'Surcharge for claims history'
    },
    creditDiscount: {
      type: 'number',
      unit: 'USD',
      description: 'Discount for good credit score'
    },
    totalPremium: {
      type: 'number',
      unit: 'USD',
      description: 'Total annual premium'
    },
    monthlyPremium: {
      type: 'number',
      unit: 'USD',
      description: 'Monthly premium payment'
    },
    deductibleAmount: {
      type: 'number',
      unit: 'USD',
      description: 'Actual deductible amount'
    },
    coverageRatio: {
      type: 'number',
      description: 'Coverage to property value ratio'
    },
    riskLevel: {
      type: 'string',
      description: 'Overall risk assessment level'
    },
    recommendedCoverage: {
      type: 'number',
      unit: 'USD',
      description: 'Recommended coverage limit'
    },
    savingsWithMitigation: {
      type: 'number',
      unit: 'USD',
      description: 'Annual savings with mitigation features'
    },
    breakEvenYears: {
      type: 'number',
      unit: 'years',
      description: 'Years to break even on mitigation costs'
    },
    hurricaneCategoryCoverage: {
      type: 'string',
      description: 'Maximum hurricane category covered'
    },
    windSpeedCoverage: {
      type: 'number',
      unit: 'mph',
      description: 'Maximum wind speed covered'
    },
    floodExclusion: {
      type: 'boolean',
      description: 'Flood damage excluded from coverage'
    },
    stormSurgeExclusion: {
      type: 'boolean',
      description: 'Storm surge damage excluded from coverage'
    }
  },
  calculate: function(inputs) {
    // Import calculation function
    const { calculateWindstormInsurance } = require('./formulas');
    return calculateWindstormInsurance(inputs);
  },
  generateReport: function(inputs, outputs) {
    // Import report generation function
    const { generateWindstormInsuranceAnalysis } = require('./formulas');
    return generateWindstormInsuranceAnalysis(inputs, outputs);
  },
  validationRules: [],
  examples: [
    {
      title: 'Florida Coastal Home',
      description: 'Single-family home in Florida with wind mitigation features',
      inputs: {
        propertyValue: 450000,
        propertyType: 'single-family',
        constructionType: 'concrete',
        roofType: 'metal',
        roofAge: 8,
        location: 'florida',
        distanceFromCoast: 2,
        elevation: 12,
        windZone: 'zone4',
        coverageLimit: 450000,
        deductible: 5000,
        deductibleType: 'fixed',
        windMitigationFeatures: 'enhanced',
        hurricaneShutters: true,
        impactResistantWindows: true,
        roofReinforcement: true,
        garageDoorReinforcement: true,
        claimsHistory: 0,
        creditScore: 780,
        policyTerm: 1
      }
    },
    {
      title: 'Texas Gulf Coast Property',
      description: 'Commercial property in Texas with basic wind protection',
      inputs: {
        propertyValue: 1200000,
        propertyType: 'commercial',
        constructionType: 'steel',
        roofType: 'flat',
        roofAge: 15,
        location: 'texas',
        distanceFromCoast: 1,
        elevation: 8,
        windZone: 'zone5',
        coverageLimit: 1200000,
        deductible: 25000,
        deductibleType: 'percentage',
        windMitigationFeatures: 'basic',
        hurricaneShutters: false,
        impactResistantWindows: false,
        roofReinforcement: false,
        garageDoorReinforcement: false,
        claimsHistory: 1,
        creditScore: 720,
        policyTerm: 1
      }
    }
  ]
};
