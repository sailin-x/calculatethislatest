import { Calculator } from '../../types/calculator';

export const TermLifeInsuranceCalculator: Calculator = {
  id: 'TermLifeInsurance-calculator',
  name: 'Term Life Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate term life insurance premiums, coverage needs, and analyze different policy options based on personal and financial factors',
  inputs: [
    // Personal Information
    { id: 'age', name: 'Age', type: 'number', required: true, description: 'Your current age', placeholder: '35', min: 18, max: 85 },
    { id: 'gender', name: 'Gender', type: 'select', required: true, description: 'Your gender', options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ] },
    { id: 'filingStatus', name: 'Filing Status', type: 'select', required: false, description: 'Tobacco use status', options: [
      { value: 'non-smoker', label: 'Non-Smoker' },
      { value: 'smoker', label: 'Smoker' },
      { value: 'former-smoker', label: 'Former Smoker' }
    ] },
    { id: 'height', name: 'Height', type: 'number', unit: 'inches', required: false, description: 'Your height in inches', placeholder: '70', min: 48, max: 84 },
    { id: 'weight', name: 'Weight', type: 'number', unit: 'lbs', required: false, description: 'Your weight in pounds', placeholder: '160', min: 80, max: 400 },

    // Policy Details
    { id: 'coverageAmount', name: 'Coverage Amount', type: 'number', unit: 'USD', required: true, description: 'Desired death benefit amount', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'termLength', name: 'Term Length', type: 'number', unit: 'years', required: true, description: 'Policy term length', placeholder: '20', min: 1, max: 40 },
    { id: 'policyType', name: 'Policy Type', type: 'select', required: false, description: 'Type of term policy', options: [
      { value: 'level-term', label: 'Level Term' },
      { value: 'decreasing-term', label: 'Decreasing Term' },
      { value: 'increasing-term', label: 'Increasing Term' },
      { value: 'ReturnOfPremium', label: 'Return of Premium' }
    ] },
    { id: 'riders', name: 'Riders', type: 'select', required: false, description: 'Additional policy riders', options: [
      { value: 'none', label: 'None' },
      { value: 'WaiverOfPremium', label: 'Waiver of Premium' },
      { value: 'AcceleratedDeathBenefit', label: 'Accelerated Death Benefit' },
      { value: 'child-rider', label: 'Child Rider' },
      { value: 'spouse-rider', label: 'Spouse Rider' },
      { value: 'multiple', label: 'Multiple Riders' }
    ] },

    // Financial Information
    { id: 'annualIncome', name: 'Annual Income', type: 'number', unit: 'USD', required: false, description: 'Your annual income', placeholder: '75000', min: 0, max: 10000000 },
    { id: 'debts', name: 'Total Debts', type: 'number', unit: 'USD', required: false, description: 'Total outstanding debts', placeholder: '200000', min: 0, max: 10000000 },
    { id: 'savings', name: 'Savings & Investments', type: 'number', unit: 'USD', required: false, description: 'Current savings and investments', placeholder: '50000', min: 0, max: 10000000 },
    { id: 'existingLifeInsurance', name: 'Existing Life Insurance', type: 'number', unit: 'USD', required: false, description: 'Existing life insurance coverage', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'funeralExpenses', name: 'Funeral Expenses', type: 'number', unit: 'USD', required: false, description: 'Estimated funeral and final expenses', placeholder: '15000', min: 0, max: 100000 },

    // Family Information
    { id: 'dependents', name: 'Number of Dependents', type: 'number', required: false, description: 'Number of financial dependents', placeholder: '2', min: 0, max: 10 },
    { id: 'childrenAge', name: 'Youngest Child Age', type: 'number', unit: 'years', required: false, description: 'Age of youngest child', placeholder: '5', min: 0, max: 25 },
    { id: 'spouseIncome', name: 'Spouse Income', type: 'number', unit: 'USD', required: false, description: 'Spouse annual income', placeholder: '50000', min: 0, max: 10000000 },
    { id: 'collegeCosts', name: 'College Costs', type: 'number', unit: 'USD', required: false, description: 'Estimated college costs for children', placeholder: '100000', min: 0, max: 1000000 },

    // Health Information
    { id: 'healthRating', name: 'Health Rating', type: 'select', required: false, description: 'Overall health rating', options: [
      { value: 'preferred-plus', label: 'Preferred Plus' },
      { value: 'preferred', label: 'Preferred' },
      { value: 'standard-plus', label: 'Standard Plus' },
      { value: 'standard', label: 'Standard' },
      { value: 'substandard', label: 'Substandard' }
    ] },
    { id: 'medicalConditions', name: 'Medical Conditions', type: 'select', required: false, description: 'Pre-existing medical conditions', options: [
      { value: 'none', label: 'None' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'heart-disease', label: 'Heart Disease' },
      { value: 'cancer', label: 'Cancer' },
      { value: 'HighBloodPressure', label: 'High Blood Pressure' },
      { value: 'multiple', label: 'Multiple Conditions' }
    ] },
    { id: 'familyHistory', name: 'Family History', type: 'select', required: false, description: 'Family medical history', options: [
      { value: 'none', label: 'None' },
      { value: 'heart-disease', label: 'Heart Disease' },
      { value: 'cancer', label: 'Cancer' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'multiple', label: 'Multiple Conditions' }
    ] },
    { id: 'occupation', name: 'Occupation', type: 'select', required: false, description: 'Your occupation category', options: [
      { value: 'office', label: 'Office/Professional' },
      { value: 'manual-labor', label: 'Manual Labor' },
      { value: 'hazardous', label: 'Hazardous Occupation' },
      { value: 'military', label: 'Military' },
      { value: 'aviation', label: 'Aviation' }
    ] },
    { id: 'hobbies', name: 'Hobbies', type: 'select', required: false, description: 'High-risk hobbies', options: [
      { value: 'none', label: 'None' },
      { value: 'scuba-diving', label: 'Scuba Diving' },
      { value: 'skydiving', label: 'Skydiving' },
      { value: 'rock-climbing', label: 'Rock Climbing' },
      { value: 'racing', label: 'Racing' },
      { value: 'multiple', label: 'Multiple Hobbies' }
    ] },

    // Market Factors
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%', required: false, description: 'Expected annual investment return', placeholder: '7', min: 0, max: 20 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: false, description: 'Discount rate for present value calculations', placeholder: '5', min: 0, max: 15 },

    // Analysis Options
    { id: 'analysisType', name: 'Analysis Type', type: 'select', required: false, description: 'Type of analysis to perform', options: [
      { value: 'basic', label: 'Basic Premium Calculation' },
      { value: 'detailed', label: 'Detailed Analysis' },
      { value: 'comparison', label: 'Policy Comparison' },
      { value: 'needs-analysis', label: 'Needs Analysis' }
    ] },
    { id: 'comparisonTerms', name: 'Comparison Terms', type: 'select', required: false, description: 'Term lengths to compare', options: [
      { value: '102030', label: '10, 20, 30 Years' },
      { value: '15-25', label: '15, 25 Years' },
      { value: '20-30', label: '20, 30 Years' },
      { value: 'custom', label: 'Custom Terms' }
    ] }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual premium amount' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly premium amount' },
    { id: 'totalPremium', name: 'Total Premium', type: 'number', unit: 'USD', description: 'Total premiums paid over term' },
    { id: 'coverageNeeded', name: 'Coverage Needed', type: 'number', unit: 'USD', description: 'Recommended coverage amount' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Difference between needed and current coverage' },
    { id: 'premiumPerThousand', name: 'Premium per $1,000', type: 'number', unit: 'USD', description: 'Cost per $1,000 of coverage' },
    { id: 'costPerDay', name: 'Cost per Day', type: 'number', unit: 'USD', description: 'Daily cost of coverage' },
    { id: 'presentValue', name: 'Present Value', type: 'number', unit: 'USD', description: 'Present value of total premiums' },
    { id: 'futureValue', name: 'Future Value', type: 'number', unit: 'USD', description: 'Future value of premiums if invested' },
    { id: 'opportunityCost', name: 'Opportunity Cost', type: 'number', unit: 'USD', description: 'Opportunity cost of premiums' },
    { id: 'breakevenYears', name: 'Breakeven Years', type: 'number', unit: 'years', description: 'Years to breakeven on investment' },
    { id: 'affordabilityScore', name: 'Affordability Score', type: 'number', description: 'Premium affordability assessment (0-100)' },
    { id: 'adequacyScore', name: 'Adequacy Score', type: 'number', description: 'Coverage adequacy assessment (0-100)' },
    { id: 'valueScore', name: 'Value Score', type: 'number', description: 'Overall value assessment (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk assessment (0-100)' },
    { id: 'termComparison', name: 'Term Comparison', type: 'array', description: 'Comparison of different term lengths' },
    { id: 'policyComparison', name: 'Policy Comparison', type: 'array', description: 'Comparison of different policy types' },
    { id: 'needsBreakdown', name: 'Needs Breakdown', type: 'object', description: 'Breakdown of insurance needs' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Policy recommendations' },
    { id: 'keyFactors', name: 'Key Factors', type: 'string', description: 'Key factors affecting premium' },
    { id: 'risks', name: 'Risks', type: 'string', description: 'Primary risks to consider' },
    { id: 'termLifeInsuranceAnalysis', name: 'Term Life Insurance Analysis', type: 'string', description: 'Comprehensive term life insurance analysis report' }
  ],
  calculate: (inputs) => {
    const { calculateTermLifeInsurance } = require('./formulas');
    return calculateTermLifeInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    const { generateTermLifeInsuranceAnalysis } = require('./formulas');
    return generateTermLifeInsuranceAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
