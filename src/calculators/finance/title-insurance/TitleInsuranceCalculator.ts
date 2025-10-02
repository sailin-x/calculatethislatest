import { Calculator } from '../../types/calculator';

export const TitleInsuranceCalculator: Calculator = {
  id: 'title-insurance-calculator',
  name: 'Title Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate title insurance premiums, coverage costs, and analyze different title insurance options for real estate transactions',
  inputs: [
    // Property Details
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the property', placeholder: '400000', min: 0, max: 10000000 },
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: false, description: 'Purchase price (if different from property value)', placeholder: '400000', min: 0, max: 10000000 },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: false, description: 'Mortgage loan amount', placeholder: '320000', min: 0, max: 10000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', options: [
      { value: 'single-family', label: 'Single Family Home' },
      { value: 'condo', label: 'Condominium' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'multi-family', label: 'Multi-Family' },
      { value: 'commercial', label: 'Commercial Property' },
      { value: 'land', label: 'Vacant Land' }
    ] },
    { id: 'propertyAge', name: 'Property Age', type: 'number', unit: 'years', required: false, description: 'Age of the property in years', placeholder: '15', min: 0, max: 200 },

    // Transaction Details
    { id: 'transactionType', name: 'Transaction Type', type: 'select', required: true, description: 'Type of real estate transaction', options: [
      { value: 'purchase', label: 'Purchase' },
      { value: 'refinance', label: 'Refinance' },
      { value: 'construction', label: 'Construction Loan' },
      { value: 'equity-line', label: 'Home Equity Line' }
    ] },
    { id: 'buyerType', name: 'Buyer Type', type: 'select', required: false, description: 'Type of buyer', options: [
      { value: 'individual', label: 'Individual' },
      { value: 'married-couple', label: 'Married Couple' },
      { value: 'trust', label: 'Trust' },
      { value: 'llc', label: 'LLC' },
      { value: 'corporation', label: 'Corporation' },
      { value: 'partnership', label: 'Partnership' }
    ] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'Intended use of the property', options: [
      { value: 'primary-residence', label: 'Primary Residence' },
      { value: 'secondary-residence', label: 'Secondary Residence' },
      { value: 'investment', label: 'Investment Property' },
      { value: 'commercial', label: 'Commercial Use' }
    ] },

    // Coverage Options
    { id: 'coverageType', name: 'Coverage Type', type: 'select', required: true, description: 'Type of title insurance coverage', options: [
      { value: 'owners-policy', label: 'Owner\'s Policy' },
      { value: 'lenders-policy', label: 'Lender\'s Policy' },
      { value: 'both', label: 'Both Owner\'s and Lender\'s' }
    ] },
    { id: 'coverageAmount', name: 'Coverage Amount', type: 'number', unit: 'USD', required: false, description: 'Specific coverage amount (if different from property value)', placeholder: '400000', min: 0, max: 10000000 },
    { id: 'endorsements', name: 'Endorsements', type: 'select', required: false, description: 'Additional endorsements needed', options: [
      { value: 'none', label: 'None' },
      { value: 'survey', label: 'Survey Endorsement' },
      { value: 'access', label: 'Access Endorsement' },
      { value: 'zoning', label: 'Zoning Endorsement' },
      { value: 'condo', label: 'Condo Endorsement' },
      { value: 'multiple', label: 'Multiple Endorsements' }
    ] },
    { id: 'extendedCoverage', name: 'Extended Coverage', type: 'select', required: false, description: 'Extended coverage options', options: [
      { value: 'none', label: 'None' },
      { value: 'basic', label: 'Basic Extended' },
      { value: 'enhanced', label: 'Enhanced Extended' },
      { value: 'premium', label: 'Premium Extended' }
    ] },

    // Location and Market Factors
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where property is located', options: [
      { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' }, { value: 'ar', label: 'Arkansas' },
      { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' }, { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' },
      { value: 'fl', label: 'Florida' }, { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
      { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' }, { value: 'ks', label: 'Kansas' },
      { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' }, { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' },
      { value: 'ma', label: 'Massachusetts' }, { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
      { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' }, { value: 'nv', label: 'Nevada' },
      { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' }, { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' },
      { value: 'nc', label: 'North Carolina' }, { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
      { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' }, { value: 'sc', label: 'South Carolina' },
      { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' }, { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' },
      { value: 'vt', label: 'Vermont' }, { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
      { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
    ] },
    { id: 'county', name: 'County', type: 'string', required: false, description: 'County where property is located', placeholder: 'Los Angeles' },
    { id: 'marketType', name: 'Market Type', type: 'select', required: false, description: 'Type of real estate market', options: [
      { value: 'urban', label: 'Urban' },
      { value: 'suburban', label: 'Suburban' },
      { value: 'rural', label: 'Rural' },
      { value: 'resort', label: 'Resort/Vacation' }
    ] },

    // Title Search and Risk Factors
    { id: 'titleSearchDepth', name: 'Title Search Depth', type: 'select', required: false, description: 'Depth of title search required', options: [
      { value: 'standard', label: 'Standard (30-50 years)' },
      { value: 'extended', label: 'Extended (50-100 years)' },
      { value: 'comprehensive', label: 'Comprehensive (100+ years)' }
    ] },
    { id: 'knownIssues', name: 'Known Title Issues', type: 'select', required: false, description: 'Known title issues or defects', options: [
      { value: 'none', label: 'None Known' },
      { value: 'easements', label: 'Easements' },
      { value: 'liens', label: 'Liens' },
      { value: 'encroachments', label: 'Encroachments' },
      { value: 'boundary-disputes', label: 'Boundary Disputes' },
      { value: 'multiple', label: 'Multiple Issues' }
    ] },
    { id: 'previousClaims', name: 'Previous Claims', type: 'select', required: false, description: 'Previous title insurance claims on property', options: [
      { value: 'none', label: 'None' },
      { value: 'one', label: 'One Claim' },
      { value: 'multiple', label: 'Multiple Claims' }
    ] },
    { id: 'chainOfTitle', name: 'Chain of Title', type: 'select', required: false, description: 'Complexity of chain of title', options: [
      { value: 'simple', label: 'Simple' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'complex', label: 'Complex' },
      { value: 'very-complex', label: 'Very Complex' }
    ] },

    // Additional Services
    { id: 'surveyRequired', name: 'Survey Required', type: 'select', required: false, description: 'Whether a survey is required', options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'maybe', label: 'Maybe (TBD)' }
    ] },
    { id: 'abstractRequired', name: 'Abstract Required', type: 'select', required: false, description: 'Whether an abstract is required', options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'maybe', label: 'Maybe (TBD)' }
    ] },
    { id: 'escrowServices', name: 'Escrow Services', type: 'select', required: false, description: 'Escrow services needed', options: [
      { value: 'none', label: 'None' },
      { value: 'basic', label: 'Basic Escrow' },
      { value: 'full', label: 'Full Escrow' },
      { value: 'custom', label: 'Custom Escrow' }
    ] },

    // Financial Factors
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Total closing costs (excluding title insurance)', placeholder: '8000', min: 0, max: 100000 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: false, description: 'Discount rate for present value calculations', placeholder: '5', min: 0, max: 15 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },

    // Analysis Options
    { id: 'analysisType', name: 'Analysis Type', type: 'select', required: false, description: 'Type of analysis to perform', options: [
      { value: 'basic', label: 'Basic Premium Calculation' },
      { value: 'detailed', label: 'Detailed Analysis' },
      { value: 'comparison', label: 'Policy Comparison' },
      { value: 'risk-assessment', label: 'Risk Assessment' }
    ] }
  ],
  outputs: [
    { id: 'ownersPolicyPremium', name: 'Owner\'s Policy Premium', type: 'number', unit: 'USD', description: 'Premium for owner\'s title insurance policy' },
    { id: 'lendersPolicyPremium', name: 'Lender\'s Policy Premium', type: 'number', unit: 'USD', description: 'Premium for lender\'s title insurance policy' },
    { id: 'totalPremium', name: 'Total Premium', type: 'number', unit: 'USD', description: 'Total title insurance premium' },
    { id: 'endorsementCosts', name: 'Endorsement Costs', type: 'number', unit: 'USD', description: 'Additional costs for endorsements' },
    { id: 'searchFees', name: 'Title Search Fees', type: 'number', unit: 'USD', description: 'Title search and examination fees' },
    { id: 'settlementFees', name: 'Settlement Fees', type: 'number', unit: 'USD', description: 'Settlement and closing fees' },
    { id: 'totalCosts', name: 'Total Costs', type: 'number', unit: 'USD', description: 'Total title insurance and related costs' },
    { id: 'premiumPerThousand', name: 'Premium per $1,000', type: 'number', unit: 'USD', description: 'Cost per $1,000 of coverage' },
    { id: 'costPercentage', name: 'Cost Percentage', type: 'number', unit: '%', description: 'Title insurance cost as percentage of property value' },
    { id: 'presentValue', name: 'Present Value', type: 'number', unit: 'USD', description: 'Present value of title insurance costs' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Title risk assessment (0-100)' },
    { id: 'coverageScore', name: 'Coverage Score', type: 'number', description: 'Coverage adequacy assessment (0-100)' },
    { id: 'valueScore', name: 'Value Score', type: 'number', description: 'Overall value assessment (0-100)' },
    { id: 'policyComparison', name: 'Policy Comparison', type: 'array', description: 'Comparison of different policy options' },
    { id: 'riskBreakdown', name: 'Risk Breakdown', type: 'object', description: 'Breakdown of title risks' },
    { id: 'costBreakdown', name: 'Cost Breakdown', type: 'object', description: 'Detailed cost breakdown' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Policy and coverage recommendations' },
    { id: 'keyFactors', name: 'Key Factors', type: 'string', description: 'Key factors affecting premium' },
    { id: 'risks', name: 'Risks', type: 'string', description: 'Primary title risks to consider' },
    { id: 'titleInsuranceAnalysis', name: 'Title Insurance Analysis', type: 'string', description: 'Comprehensive title insurance analysis report' }
  ],
  calculate: (inputs) => {
    const { calculateTitleInsurance } = require('./formulas');
    return calculateTitleInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    const { generateTitleInsuranceAnalysis } = require('./formulas');
    return generateTitleInsuranceAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
