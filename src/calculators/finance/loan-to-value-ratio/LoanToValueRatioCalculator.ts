import { Calculator } from '../../../types/calculator';
import { calculateLoanToValueRatio, generateLoanToValueRatioAnalysis } from './formulas';
import { validateLoanToValueRatioInputs } from './validation';

export const LoanToValueRatioCalculator: Calculator = {
  id: 'loan-to-value-ratio-calculator',
  name: 'Loan-to-Value (LTV) Ratio Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate Loan-to-Value (LTV) ratio for real estate financing, determining the percentage of property value that can be borrowed and assessing lending risk.',
  inputs: [
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the property', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Amount of the loan being requested', placeholder: '400000', min: 1000, max: 10000000 },
    { id: 'downPayment', name: 'Down Payment', type: 'number', unit: 'USD', required: false, description: 'Down payment amount', placeholder: '100000', min: 0, max: 5000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property being financed', placeholder: 'Select property type', options: ['Single Family Home', 'Multi-Family', 'Condo', 'Townhouse', 'Commercial Property', 'Investment Property', 'Vacation Home', 'Land', 'Mixed-Use', 'Industrial'] },
    { id: 'loanType', name: 'Loan Type', type: 'select', required: false, description: 'Type of mortgage loan', placeholder: 'Select loan type', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'ARM', 'Interest-Only', 'Balloon', 'Hard Money', 'Commercial'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property will be occupied', placeholder: 'Select occupancy type', options: ['Primary Residence', 'Secondary Home', 'Investment Property', 'Commercial Use'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Borrower debt-to-income ratio', placeholder: '36', min: 0, max: 100 },
    { id: 'reserves', name: 'Reserves', type: 'number', unit: 'months', required: false, description: 'Number of months of reserves', placeholder: '6', min: 0, max: 60 },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Property location type', placeholder: 'Select location', options: ['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'] },
    { id: 'propertyAge', name: 'Property Age', type: 'number', unit: 'years', required: false, description: 'Age of the property in years', placeholder: '15', min: 0, max: 200 },
    { id: 'propertyCondition', name: 'Property Condition', type: 'select', required: false, description: 'Condition of the property', placeholder: 'Select property condition', options: ['Excellent', 'Good', 'Fair', 'Poor', 'Needs Renovation'] },
    { id: 'appraisalType', name: 'Appraisal Type', type: 'select', required: false, description: 'Type of property appraisal', placeholder: 'Select appraisal type', options: ['Full Appraisal', 'Drive-By Appraisal', 'Desktop Appraisal', 'Broker Price Opinion', 'Automated Valuation Model'] },
    { id: 'lenderType', name: 'Lender Type', type: 'select', required: false, description: 'Type of lender', placeholder: 'Select lender type', options: ['Commercial Bank', 'Credit Union', 'Mortgage Bank', 'Private Lender', 'Hard Money Lender', 'Government Agency', 'Regional Bank', 'National Bank', 'Online Lender'] },
    { id: 'loanPurpose', name: 'Loan Purpose', type: 'select', required: false, description: 'Purpose of the loan', placeholder: 'Select loan purpose', options: ['Purchase', 'Refinance', 'Cash-Out Refinance', 'Construction', 'Bridge Loan', 'Investment'] },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%', required: false, description: 'Annual interest rate', placeholder: '6.5', min: 0, max: 25 },
    { id: 'points', name: 'Points', type: 'number', required: false, description: 'Discount points paid', placeholder: '0', min: 0, max: 10 },
    { id: 'closingCosts', name: 'Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Estimated closing costs', placeholder: '8000', min: 0, max: 50000 }
  ],
  outputs: [
    { id: 'ltvRatio', name: 'LTV Ratio', type: 'number', unit: '%', description: 'Loan-to-Value ratio percentage' },
    { id: 'equityAmount', name: 'Equity Amount', type: 'number', unit: 'USD', description: 'Amount of equity in the property' },
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', description: 'Percentage of equity in the property' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Risk level assessment based on LTV ratio' },
    { id: 'pmiRequired', name: 'PMI Required', type: 'boolean', description: 'Whether Private Mortgage Insurance is required' },
    { id: 'pmiCost', name: 'PMI Cost', type: 'number', unit: 'USD/year', description: 'Estimated annual PMI cost if required' },
    { id: 'maxLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum loan amount based on LTV limits' },
    { id: 'lendingScore', name: 'Lending Score', type: 'number', description: 'Overall lending risk score (0-100)' },
    { id: 'approvalProbability', name: 'Approval Probability', type: 'number', unit: '%', description: 'Probability of loan approval' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Recommendations for improving loan terms' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key financial metrics and ratios' },
    { id: 'ltvAnalysis', name: 'LTV Analysis', type: 'string', description: 'Comprehensive LTV ratio analysis report' }
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
      name: 'Equity Amount',
      formula: 'Equity Amount = Property Value - Loan Amount',
      description: 'Calculates the equity amount in the property'
    },
    {
      name: 'Equity Percentage',
      formula: 'Equity Percentage = (Equity Amount / Property Value) × 100',
      description: 'Calculates the equity percentage in the property'
    },
    {
      name: 'Down Payment Calculation',
      formula: 'Down Payment = Property Value - Loan Amount',
      description: 'Calculates the required down payment'
    },
    {
      name: 'PMI Requirement',
      formula: 'PMI Required = LTV Ratio > 80% (for conventional loans)',
      description: 'Determines if Private Mortgage Insurance is required'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Base Risk + LTV Risk + Property Risk + Market Risk + Borrower Risk',
      description: 'Comprehensive risk assessment scoring'
    }
  ],
  examples: [
    {
      name: 'Conventional Home Purchase',
      inputs: {
        propertyValue: 500000,
        loanAmount: 400000,
        downPayment: 100000,
        propertyType: 'Single Family Home',
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        debtToIncomeRatio: 36,
        reserves: 6,
        marketCondition: 'Stable',
        location: 'Suburban',
        propertyAge: 15,
        propertyCondition: 'Good',
        appraisalType: 'Full Appraisal',
        lenderType: 'Commercial Bank',
        loanPurpose: 'Purchase',
        loanTerm: 30,
        interestRate: 6.5,
        points: 0,
        closingCosts: 8000
      },
      outputs: {
        ltvRatio: 80,
        equityAmount: 100000,
        equityPercentage: 20,
        riskAssessment: 'Moderate',
        pmiRequired: false,
        pmiCost: 0,
        maxLoanAmount: 400000,
        lendingScore: 75,
        approvalProbability: 85,
        recommendations: 'Good LTV ratio. Consider additional down payment to avoid PMI if needed.',
        keyMetrics: {
          ltvRatio: 80,
          equityPercentage: 20,
          debtToIncomeRatio: 36,
          creditScore: 750
        },
        ltvAnalysis: 'The 80% LTV ratio is within conventional lending standards. No PMI required. Strong approval probability with good credit and stable market conditions.'
      }
    },
    {
      name: 'FHA Loan with Low Down Payment',
      inputs: {
        propertyValue: 300000,
        loanAmount: 285000,
        downPayment: 15000,
        propertyType: 'Single Family Home',
        loanType: 'FHA',
        occupancyType: 'Primary Residence',
        creditScore: 680,
        debtToIncomeRatio: 43,
        reserves: 3,
        marketCondition: 'Stable',
        location: 'Suburban',
        propertyAge: 10,
        propertyCondition: 'Good',
        appraisalType: 'Full Appraisal',
        lenderType: 'Mortgage Bank',
        loanPurpose: 'Purchase',
        loanTerm: 30,
        interestRate: 6.8,
        points: 0,
        closingCosts: 6000
      },
      outputs: {
        ltvRatio: 95,
        equityAmount: 15000,
        equityPercentage: 5,
        riskAssessment: 'Higher Risk',
        pmiRequired: true,
        pmiCost: 2850,
        maxLoanAmount: 285000,
        lendingScore: 60,
        approvalProbability: 70,
        recommendations: 'High LTV ratio. Consider larger down payment to reduce PMI costs and improve terms.',
        keyMetrics: {
          ltvRatio: 95,
          equityPercentage: 5,
          debtToIncomeRatio: 43,
          creditScore: 680
        },
        ltvAnalysis: 'The 95% LTV ratio is at the FHA maximum. PMI will be required for the life of the loan. Moderate approval probability due to high LTV and moderate credit score.'
      }
    },
    {
      name: 'Investment Property Refinance',
      inputs: {
        propertyValue: 750000,
        loanAmount: 525000,
        downPayment: 0,
        propertyType: 'Multi-Family',
        loanType: 'Conventional',
        occupancyType: 'Investment Property',
        creditScore: 780,
        debtToIncomeRatio: 28,
        reserves: 12,
        marketCondition: 'Strong',
        location: 'Urban',
        propertyAge: 8,
        propertyCondition: 'Excellent',
        appraisalType: 'Full Appraisal',
        lenderType: 'Commercial Bank',
        loanPurpose: 'Refinance',
        loanTerm: 30,
        interestRate: 7.2,
        points: 1,
        closingCosts: 12000
      },
      outputs: {
        ltvRatio: 70,
        equityAmount: 225000,
        equityPercentage: 30,
        riskAssessment: 'Low Risk',
        pmiRequired: false,
        pmiCost: 0,
        maxLoanAmount: 525000,
        lendingScore: 85,
        approvalProbability: 95,
        recommendations: 'Excellent LTV ratio for investment property. Strong equity position provides flexibility.',
        keyMetrics: {
          ltvRatio: 70,
          equityPercentage: 30,
          debtToIncomeRatio: 28,
          creditScore: 780
        },
        ltvAnalysis: 'The 70% LTV ratio is excellent for an investment property. Strong equity position, excellent credit, and strong market conditions create a very favorable lending scenario.'
      }
    }
  ]
};