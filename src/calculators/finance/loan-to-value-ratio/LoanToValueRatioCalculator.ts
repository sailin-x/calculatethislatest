import { Calculator } from '../../../types/calculator';
import { calculateLoanToValueRatio, generateLoanToValueRatioAnalysis } from './formulas';
import { validateLoanToValueRatioInputs } from './validation';

export const LoanToValueRatioCalculator: Calculator = {
  id: 'loan-to-value-ratio-calculator',
  name: 'Loan-to-Value (LTV) Ratio Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate Loan-to-Value (LTV) ratio for real estate financing, determining maximum loan amount based on property value and lender requirements.',
  inputs: [
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the property', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Requested loan amount', placeholder: '400000', min: 1000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '100000', min: 0, max: 5000000 },
    { id: 'maxLtvRatio', name: 'Maximum LTV Ratio', type: 'number', unit: '%', required: false, description: 'Maximum LTV ratio allowed by lender', placeholder: '80', min: 50, max: 100 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial', 'Investment', 'Vacation Home', 'Manufactured Home', 'Land', 'Mixed-Use'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'Occupancy status', placeholder: 'Select occupancy type', options: ['Primary Residence', 'Secondary Home', 'Investment Property', 'Vacation Rental', 'Commercial Use'] },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Portfolio', 'Hard Money', 'Bridge Loan', 'Construction Loan', 'HELOC'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Borrower DTI ratio', placeholder: '35', min: 0, max: 100 },
    { id: 'loanPurpose', name: 'Loan Purpose', type: 'select', required: false, description: 'Purpose of the loan', placeholder: 'Select loan purpose', options: ['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction', 'Renovation', 'Investment', 'Bridge Financing'] },
    { id: 'propertyLocation', name: 'Property Location', type: 'select', required: false, description: 'Property location type', placeholder: 'Select location', options: ['Urban', 'Suburban', 'Rural', 'Downtown', 'Residential Area', 'Commercial District', 'Industrial Zone', 'Coastal', 'Mountain', 'Desert'] },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'lenderType', name: 'Lender Type', type: 'select', required: false, description: 'Type of lender', placeholder: 'Select lender type', options: ['Commercial Bank', 'Credit Union', 'Mortgage Banker', 'Mortgage Broker', 'Private Lender', 'Hard Money Lender', 'Government Agency', 'Regional Bank', 'National Bank', 'Online Lender'] },
    { id: 'appraisalType', name: 'Appraisal Type', type: 'select', required: false, description: 'Type of property appraisal', placeholder: 'Select appraisal type', options: ['Full Appraisal', 'Drive-By Appraisal', 'Desktop Appraisal', 'Automated Valuation Model (AVM)', 'Broker Price Opinion (BPO)', 'No Appraisal Required'] },
    { id: 'propertyAge', name: 'Property Age', type: 'number', unit: 'years', required: false, description: 'Age of the property in years', placeholder: '15', min: 0, max: 200 },
    { id: 'propertyCondition', name: 'Property Condition', type: 'select', required: false, description: 'Condition of the property', placeholder: 'Select property condition', options: ['Excellent', 'Good', 'Fair', 'Poor', 'Needs Renovation', 'New Construction'] },
    { id: 'zoningRestrictions', name: 'Zoning Restrictions', type: 'select', required: false, description: 'Zoning restrictions or issues', placeholder: 'Select zoning status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Non-Conforming Use', 'Pending Zoning Change'] },
    { id: 'environmentalIssues', name: 'Environmental Issues', type: 'select', required: false, description: 'Environmental issues present', placeholder: 'Select environmental status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Unknown', 'Remediation Required'] },
    { id: 'titleIssues', name: 'Title Issues', type: 'select', required: false, description: 'Title or legal issues', placeholder: 'Select title status', options: ['Clear Title', 'Minor Issues', 'Moderate Issues', 'Significant Issues', 'Clouded Title', 'Pending Resolution'] },
    { id: 'insuranceRequired', name: 'Insurance Required', type: 'select', required: false, description: 'Insurance requirements', placeholder: 'Select insurance status', options: ['Standard', 'Flood Insurance Required', 'Earthquake Insurance Required', 'Wind Insurance Required', 'Additional Coverage Required', 'No Insurance Required'] }
  ],
  outputs: [
    { id: 'ltvRatio', name: 'LTV Ratio', type: 'number', unit: '%', description: 'Calculated loan-to-value ratio' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum loan amount based on LTV ratio' },
    { id: 'requiredDownPayment', name: 'Required Down Payment', type: 'number', unit: 'USD', description: 'Required down payment amount' },
    { id: 'loanApprovalStatus', name: 'Loan Approval Status', type: 'string', description: 'Loan approval status based on LTV ratio' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Risk assessment based on LTV ratio and other factors' },
    { id: 'pmiRequired', name: 'PMI Required', type: 'boolean', description: 'Whether Private Mortgage Insurance is required' },
    { id: 'pmiCost', name: 'PMI Cost', type: 'number', unit: 'USD/month', description: 'Monthly PMI cost if required' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Overall risk assessment score (0-100)' },
    { id: 'approvalProbability', name: 'Approval Probability', type: 'number', unit: '%', description: 'Probability of loan approval' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Recommendation based on analysis' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key financial and risk metrics' },
    { id: 'loanToValueRatioAnalysis', name: 'LTV Ratio Analysis', type: 'string', description: 'Comprehensive LTV ratio analysis report' }
  ],
  calculate: (inputs) => {
    return calculateLoanToValueRatio(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateLoanToValueRatioAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'LTV Ratio Calculation',
      formula: 'LTV Ratio = (Loan Amount / Property Value) × 100',
      description: 'Calculates the loan-to-value ratio as a percentage'
    },
    {
      name: 'Maximum Loan Amount',
      formula: 'Maximum Loan Amount = Property Value × Maximum LTV Ratio',
      description: 'Determines the maximum loan amount based on lender LTV requirements'
    },
    {
      name: 'Required Down Payment',
      formula: 'Required Down Payment = Property Value - Maximum Loan Amount',
      description: 'Calculates the required down payment amount'
    },
    {
      name: 'PMI Calculation',
      formula: 'PMI Cost = Loan Amount × PMI Rate × (1/12)',
      description: 'Calculates monthly PMI cost when LTV ratio exceeds 80%'
    },
    {
      name: 'Risk Score Calculation',
      formula: 'Risk Score = Base Risk + LTV Risk + Property Risk + Market Risk + Borrower Risk',
      description: 'Comprehensive risk assessment scoring'
    },
    {
      name: 'Approval Probability',
      formula: 'Approval Probability = 100 - Risk Score + Credit Bonus + Down Payment Bonus',
      description: 'Loan approval probability assessment'
    }
  ],
  examples: [
    {
      name: 'Conventional Purchase',
      inputs: {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000,
        maxLtvRatio: 80,
        propertyType: 'Single Family',
        occupancyType: 'Primary Residence',
        loanType: 'Conventional',
        creditScore: 750,
        debtToIncomeRatio: 35,
        loanPurpose: 'Purchase',
        propertyLocation: 'Suburban',
        marketCondition: 'Stable',
        lenderType: 'Commercial Bank',
        appraisalType: 'Full Appraisal',
        propertyAge: 15,
        propertyCondition: 'Good',
        zoningRestrictions: 'None',
        environmentalIssues: 'None',
        titleIssues: 'Clear Title',
        insuranceRequired: 'Standard'
      },
      description: 'Standard conventional purchase with 20% down payment'
    },
    {
      name: 'FHA Loan',
      inputs: {
        propertyValue: 400000,
        loanAmount: 380000,
        downPayment: 20000,
        maxLtvRatio: 96.5,
        propertyType: 'Single Family',
        occupancyType: 'Primary Residence',
        loanType: 'FHA',
        creditScore: 680,
        debtToIncomeRatio: 43,
        loanPurpose: 'Purchase',
        propertyLocation: 'Suburban',
        marketCondition: 'Stable',
        lenderType: 'Mortgage Banker',
        appraisalType: 'Full Appraisal',
        propertyAge: 20,
        propertyCondition: 'Fair',
        zoningRestrictions: 'None',
        environmentalIssues: 'None',
        titleIssues: 'Clear Title',
        insuranceRequired: 'Standard'
      },
      description: 'FHA loan with 3.5% down payment and higher LTV ratio'
    },
    {
      name: 'Investment Property',
      inputs: {
        propertyValue: 600000,
        loanAmount: 450000,
        downPayment: 150000,
        maxLtvRatio: 75,
        propertyType: 'Multi-Family',
        occupancyType: 'Investment Property',
        loanType: 'Conventional',
        creditScore: 780,
        debtToIncomeRatio: 28,
        loanPurpose: 'Purchase',
        propertyLocation: 'Urban',
        marketCondition: 'Strong',
        lenderType: 'Commercial Bank',
        appraisalType: 'Full Appraisal',
        propertyAge: 25,
        propertyCondition: 'Good',
        zoningRestrictions: 'None',
        environmentalIssues: 'None',
        titleIssues: 'Clear Title',
        insuranceRequired: 'Standard'
      },
      description: 'Investment property with 25% down payment and stricter LTV requirements'
    }
  ]
};
