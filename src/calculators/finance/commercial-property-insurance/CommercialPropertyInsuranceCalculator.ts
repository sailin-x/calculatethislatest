import { Calculator } from '../../types/calculator';
import { calculateInsuranceCosts, generateInsuranceAnalysis } from './formulas';
import { validateInsuranceInputs } from './validation';

export const CommercialPropertyInsuranceCalculator: Calculator = {
  id: 'CommercialPropertyInsurance-calculator',
  name: 'Commercial Property Insurance Calculator',
  category: 'finance',
  subcategory: 'business',
  description: 'Calculate commercial property insurance costs, coverage analysis, and risk assessment for commercial properties.',
  
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total replacement cost value of the commercial property',
      placeholder: '2500000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'buildingValue',
      name: 'Building Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Replacement cost of the building structure',
      placeholder: '1800000',
      min: 50000,
      max: 80000000
    },
    {
      id: 'contentsValue',
      name: 'Contents Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Value of business personal property and equipment',
      placeholder: '500000',
      min: 0,
      max: 20000000
    },
    {
      id: 'businessIncome',
      name: 'Business Income',
      type: 'number',
      unit: 'USD/year',
      required: true,
      description: 'Annual business income for business interruption coverage',
      placeholder: '1200000',
      min: 0,
      max: 100000000
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Store' },
        { value: 'warehouse', label: 'Warehouse/Industrial' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'mixed-use', label: 'Mixed-Use' }
      ]
    },
    {
      id: 'constructionType',
      name: 'Construction Type',
      type: 'select',
      required: true,
      description: 'Building construction classification',
      options: [
        { value: 'frame', label: 'Frame (Wood)' },
        { value: 'joisted-masonry', label: 'Joisted Masonry' },
        { value: 'non-combustible', label: 'Non-Combustible' },
        { value: 'MasonryNonCombustible', label: 'Masonry Non-Combustible' },
        { value: 'ModifiedFireResistive', label: 'Modified Fire Resistive' },
        { value: 'fire-resistive', label: 'Fire Resistive' }
      ]
    },
    {
      id: 'yearBuilt',
      name: 'Year Built',
      type: 'number',
      required: true,
      description: 'Year the building was constructed',
      placeholder: '1995',
      min: 1900,
      max: 2024
    },
    {
      id: 'squareFootage',
      name: 'Square Footage',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Total building square footage',
      placeholder: '15000',
      min: 1000,
      max: 1000000
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: true,
      description: 'Geographic location/risk zone',
      options: [
        { value: 'low-risk', label: 'Low Risk Area' },
        { value: 'medium-risk', label: 'Medium Risk Area' },
        { value: 'high-risk', label: 'High Risk Area' },
        { value: 'coastal', label: 'Coastal Area' },
        { value: 'earthquake', label: 'Earthquake Zone' },
        { value: 'flood', label: 'Flood Zone' },
        { value: 'wildfire', label: 'Wildfire Zone' }
      ]
    },
    {
      id: 'deductible',
      name: 'Deductible',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Insurance deductible amount',
      placeholder: '5000',
      min: 1000,
      max: 100000
    },
    {
      id: 'coverageLimits',
      name: 'Coverage Limits',
      type: 'select',
      required: true,
      description: 'Coverage limit options',
      options: [
        { value: '80-percent', label: '80% of Replacement Cost' },
        { value: '90-percent', label: '90% of Replacement Cost' },
        { value: '100-percent', label: '100% of Replacement Cost' },
        { value: 'agreed-value', label: 'Agreed Value' }
      ]
    },
    {
      id: 'additionalCoverages',
      name: 'Additional Coverages',
      type: 'multiselect',
      required: false,
      description: 'Additional coverage options',
      options: [
        { value: 'earthquake', label: 'Earthquake' },
        { value: 'flood', label: 'Flood' },
        { value: 'windstorm', label: 'Windstorm/Hurricane' },
        { value: 'terrorism', label: 'Terrorism' },
        { value: 'equipment-breakdown', label: 'Equipment Breakdown' },
        { value: 'cyber-liability', label: 'Cyber Liability' },
        { value: 'employment-practices', label: 'Employment Practices' },
        { value: 'directors-officers', label: 'Directors & Officers' }
      ]
    },
    {
      id: 'claimsHistory',
      name: 'Claims History',
      type: 'select',
      required: true,
      description: 'Number of claims in past 3 years',
      options: [
        { value: '0', label: '0 Claims' },
        { value: '1', label: '1 Claim' },
        { value: '2', label: '2 Claims' },
        { value: '3+', label: '3+ Claims' }
      ]
    },
    {
      id: 'safetyFeatures',
      name: 'Safety Features',
      type: 'multiselect',
      required: false,
      description: 'Safety and protection features',
      options: [
        { value: 'sprinkler-system', label: 'Sprinkler System' },
        { value: 'fire-alarm', label: 'Fire Alarm System' },
        { value: 'security-system', label: 'Security System' },
        { value: 'backup-generator', label: 'Backup Generator' },
        { value: 'storm-shutters', label: 'Storm Shutters' },
        { value: 'elevated-foundation', label: 'Elevated Foundation' }
      ]
    },
    {
      id: 'occupancy',
      name: 'Occupancy',
      type: 'select',
      required: true,
      description: 'Building occupancy status',
      options: [
        { value: 'owner-occupied', label: 'Owner Occupied' },
        { value: 'tenant-occupied', label: 'Tenant Occupied' },
        { value: 'vacant', label: 'Vacant' },
        { value: 'under-construction', label: 'Under Construction' }
      ]
    }
  ],

  outputs: [
    {
      id: 'annualPremium',
      name: 'Annual Premium',
      type: 'number',
      unit: 'USD',
      description: 'Total annual insurance premium'
    },
    {
      id: 'monthlyPremium',
      name: 'Monthly Premium',
      type: 'number',
      unit: 'USD',
      description: 'Monthly insurance premium payment'
    },
    {
      id: 'propertyCoverage',
      name: 'Property Coverage',
      type: 'number',
      unit: 'USD',
      description: 'Building and contents coverage limit'
    },
    {
      id: 'businessInterruption',
      name: 'Business Interruption',
      type: 'number',
      unit: 'USD',
      description: 'Business interruption coverage limit'
    },
    {
      id: 'liabilityCoverage',
      name: 'Liability Coverage',
      type: 'number',
      unit: 'USD',
      description: 'General liability coverage limit'
    },
    {
      id: 'premiumRate',
      name: 'Premium Rate',
      type: 'number',
      unit: '%',
      description: 'Premium as percentage of property value'
    },
    {
      id: 'costPerSqFt',
      name: 'Cost per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Annual premium cost per square foot'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'recommendedCoverage',
      name: 'Recommended Coverage',
      type: 'string',
      description: 'Recommended coverage adjustments'
    },
    {
      id: 'savingsOpportunities',
      name: 'Savings Opportunities',
      type: 'string',
      description: 'Potential premium savings recommendations'
    }
  ],

  calculate: (inputs) => {
    const validation = validateInsuranceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculateInsuranceCosts(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateInsuranceAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Base Premium Calculation',
      formula: 'Base Premium = Property Value × Base Rate × Location Factor × Construction Factor',
      description: 'Calculates the base insurance premium'
    },
    {
      name: 'Risk Factor Adjustment',
      formula: 'Risk Adjustment = Base Premium × (Claims Factor + Occupancy Factor + Safety Factor)',
      description: 'Adjusts premium based on risk factors'
    },
    {
      name: 'Coverage Limit Calculation',
      formula: 'Coverage Limit = Property Value × Coverage Percentage',
      description: 'Calculates actual coverage limit based on percentage'
    },
    {
      name: 'Business Interruption Coverage',
      formula: 'BI Coverage = Annual Business Income × (12-24 months)',
      description: 'Calculates business interruption coverage needs'
    },
    {
      name: 'Premium Rate',
      formula: 'Premium Rate = (Annual Premium / Property Value) × 100',
      description: 'Calculates premium as percentage of property value'
    }
  ],

  examples: [
    {
      name: 'Office Building Insurance',
      description: 'A modern office building with comprehensive coverage',
      inputs: {
        propertyValue: 2500000,
        buildingValue: 1800000,
        contentsValue: 500000,
        businessIncome: 1200000,
        propertyType: 'office',
        constructionType: 'fire-resistive',
        yearBuilt: 2010,
        squareFootage: 15000,
        location: 'medium-risk',
        deductible: 5000,
        coverageLimits: '100-percent',
        additionalCoverages: ['equipment-breakdown', 'cyber-liability'],
        claimsHistory: '0',
        safetyFeatures: ['sprinkler-system', 'fire-alarm', 'security-system'],
        occupancy: 'owner-occupied'
      },
      expectedOutputs: {
        annualPremium: 18750,
        monthlyPremium: 1562.5,
        propertyCoverage: 2500000,
        businessInterruption: 2400000,
        liabilityCoverage: 1000000,
        premiumRate: 0.75,
        costPerSqFt: 1.25,
        riskScore: 25,
        recommendedCoverage: 'Adequate coverage for current risk profile',
        savingsOpportunities: 'Consider increasing deductible to $10,000 for 15% savings'
      }
    },
    {
      name: 'Retail Store Insurance',
      description: 'A retail store in a high-risk area with basic coverage',
      inputs: {
        propertyValue: 800000,
        buildingValue: 600000,
        contentsValue: 200000,
        businessIncome: 600000,
        propertyType: 'retail',
        constructionType: 'joisted-masonry',
        yearBuilt: 1985,
        squareFootage: 5000,
        location: 'high-risk',
        deductible: 2500,
        coverageLimits: '90-percent',
        additionalCoverages: ['windstorm'],
        claimsHistory: '1',
        safetyFeatures: ['fire-alarm'],
        occupancy: 'tenant-occupied'
      },
      expectedOutputs: {
        annualPremium: 9600,
        monthlyPremium: 800,
        propertyCoverage: 720000,
        businessInterruption: 1200000,
        liabilityCoverage: 500000,
        premiumRate: 1.2,
        costPerSqFt: 1.92,
        riskScore: 65,
        recommendedCoverage: 'Consider adding sprinkler system for 20% premium reduction',
        savingsOpportunities: 'Install security system and upgrade fire protection for savings'
      }
    }
  ]
};
