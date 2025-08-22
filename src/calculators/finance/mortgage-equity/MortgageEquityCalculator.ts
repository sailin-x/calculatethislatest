import { Calculator } from '../../../types/calculator';
import { calculateMortgageEquity, generateMortgageEquityAnalysis } from './formulas';
import { validateMortgageEquityInputs } from './validation';

export const MortgageEquityCalculator: Calculator = {
  id: 'mortgage-equity-calculator',
  name: 'Mortgage Equity Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate home equity, equity percentage, available equity for borrowing, and analyze equity growth over time including HELOC and home equity loan options.',
  inputs: [
    { id: 'propertyValue', name: 'Current Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the property', placeholder: '400000', min: 10000, max: 10000000 },
    { id: 'originalPurchasePrice', name: 'Original Purchase Price', type: 'number', unit: 'USD', required: false, description: 'Original purchase price of the property', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'purchaseDate', name: 'Purchase Date', type: 'date', required: false, description: 'Date when property was purchased', placeholder: '2020-01-15' },
    { id: 'currentMortgageBalance', name: 'Current Mortgage Balance', type: 'number', unit: 'USD', required: true, description: 'Current outstanding mortgage balance', placeholder: '280000', min: 0, max: 10000000 },
    { id: 'originalLoanAmount', name: 'Original Loan Amount', type: 'number', unit: 'USD', required: false, description: 'Original mortgage loan amount', placeholder: '315000', min: 0, max: 10000000 },
    { id: 'loanStartDate', name: 'Loan Start Date', type: 'date', required: false, description: 'Date when mortgage loan started', placeholder: '2020-01-15' },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%/year', required: false, description: 'Current mortgage interest rate', placeholder: '4.5', min: 0, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: false, description: 'Original loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: false, description: 'Current monthly mortgage payment', placeholder: '1596', min: 0, max: 50000 },
    { id: 'propertyTaxAnnual', name: 'Annual Property Tax', type: 'number', unit: 'USD', required: false, description: 'Annual property tax amount', placeholder: '4800', min: 0, max: 100000 },
    { id: 'homeownersInsuranceAnnual', name: 'Annual Homeowners Insurance', type: 'number', unit: 'USD', required: false, description: 'Annual homeowners insurance premium', placeholder: '1200', min: 0, max: 20000 },
    { id: 'pmiAnnual', name: 'Annual PMI', type: 'number', unit: 'USD', required: false, description: 'Annual private mortgage insurance', placeholder: '0', min: 0, max: 10000 },
    { id: 'appreciationRate', name: 'Annual Appreciation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual property appreciation rate', placeholder: '3', min: -10, max: 20 },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market condition', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', placeholder: 'Select property type', options: ['Single Family', 'Townhouse', 'Condominium', 'Multi-Family', 'Manufactured Home', 'Land', 'Commercial', 'Investment Property'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Property location type', placeholder: 'Select location', options: ['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Coastal', 'Mountain', 'Desert'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'debtToIncomeRatio', name: 'Debt-to-Income Ratio', type: 'number', unit: '%', required: false, description: 'Current debt-to-income ratio', placeholder: '35', min: 0, max: 100 },
    { id: 'income', name: 'Annual Income', type: 'number', unit: 'USD', required: false, description: 'Annual household income', placeholder: '80000', min: 0, max: 10000000 },
    { id: 'existingHELOC', name: 'Existing HELOC Balance', type: 'number', unit: 'USD', required: false, description: 'Existing home equity line of credit balance', placeholder: '0', min: 0, max: 1000000 },
    { id: 'existingHomeEquityLoan', name: 'Existing Home Equity Loan Balance', type: 'number', unit: 'USD', required: false, description: 'Existing home equity loan balance', placeholder: '0', min: 0, max: 1000000 },
    { id: 'otherLiens', name: 'Other Liens', type: 'number', unit: 'USD', required: false, description: 'Other liens or encumbrances on the property', placeholder: '0', min: 0, max: 1000000 },
    { id: 'plannedImprovements', name: 'Planned Improvements Value', type: 'number', unit: 'USD', required: false, description: 'Value of planned home improvements', placeholder: '0', min: 0, max: 500000 },
    { id: 'timeHorizon', name: 'Time Horizon', type: 'number', unit: 'years', required: false, description: 'Planning time horizon for equity analysis', placeholder: '5', min: 1, max: 30 }
  ],
  outputs: [
    { id: 'totalEquity', name: 'Total Equity', type: 'number', unit: 'USD', description: 'Total home equity (property value minus all debt)' },
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', description: 'Equity as percentage of property value' },
    { id: 'availableEquity', name: 'Available Equity', type: 'number', unit: 'USD', description: 'Available equity for borrowing (typically 80-85% of total equity)' },
    { id: 'availableEquityPercentage', name: 'Available Equity Percentage', type: 'number', unit: '%', description: 'Available equity as percentage of property value' },
    { id: 'loanToValueRatio', name: 'Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Current LTV ratio' },
    { id: 'combinedLTVRatio', name: 'Combined Loan-to-Value Ratio', type: 'number', unit: '%', description: 'Combined LTV including all debt' },
    { id: 'equityGrowth', name: 'Equity Growth', type: 'object', description: 'Projected equity growth over time' },
    { id: 'helocOptions', name: 'HELOC Options', type: 'object', description: 'Home equity line of credit options' },
    { id: 'homeEquityLoanOptions', name: 'Home Equity Loan Options', type: 'object', description: 'Home equity loan options' },
    { id: 'cashOutRefinanceOptions', name: 'Cash-Out Refinance Options', type: 'object', description: 'Cash-out refinance options' },
    { id: 'equityUtilization', name: 'Equity Utilization', type: 'object', description: 'Analysis of equity utilization options' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'object', description: 'Risk assessment for equity utilization' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Recommendations for equity utilization' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key equity metrics and analysis' },
    { id: 'mortgageEquityAnalysis', name: 'Mortgage Equity Analysis', type: 'string', description: 'Comprehensive mortgage equity analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgageEquity(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgageEquityAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Equity',
      formula: 'Total Equity = Property Value - Current Mortgage Balance - Other Liens',
      description: 'Calculates total home equity'
    },
    {
      name: 'Equity Percentage',
      formula: 'Equity Percentage = (Total Equity / Property Value) × 100',
      description: 'Calculates equity as percentage of property value'
    },
    {
      name: 'Available Equity',
      formula: 'Available Equity = Total Equity × 0.85 (typical maximum)',
      description: 'Calculates available equity for borrowing'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Current Mortgage Balance / Property Value) × 100',
      description: 'Calculates current loan-to-value ratio'
    },
    {
      name: 'Combined LTV',
      formula: 'Combined LTV = ((Current Mortgage Balance + Other Debt) / Property Value) × 100',
      description: 'Calculates combined loan-to-value ratio'
    },
    {
      name: 'Equity Growth',
      formula: 'Future Equity = Current Equity + (Property Appreciation - Principal Reduction)',
      description: 'Projects equity growth over time'
    }
  ]
};