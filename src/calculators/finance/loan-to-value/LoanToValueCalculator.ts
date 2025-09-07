import { Calculator } from '../../../types/calculator';
import { LoanToValueInputs, LoanToValueOutputs } from './types';

export const LoanToValueCalculator: Calculator = {
  id: 'loan-to-value-calculator',
  title: 'Loan-to-Value (LTV) Ratio Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate loan-to-value ratios, assess lending risk, and analyze equity positions for mortgage and real estate loans',
  usageInstructions: [
    'Enter the loan amount and property value',
    'Select the loan type and input additional property details',
    'Review the LTV ratio and risk assessment',
    'Consider the PMI requirements and equity analysis'
  ],
  inputs: [
    // Loan Information
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', required: true, placeholder: '300000', tooltip: 'Total loan amount' },
    { id: 'propertyValue', label: 'Property Value', type: 'currency', required: true, placeholder: '400000', tooltip: 'Current appraised value of the property' },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', required: false, placeholder: '80000', tooltip: 'Down payment amount' },
    { id: 'appraisalValue', label: 'Appraisal Value', type: 'currency', required: false, placeholder: '400000', tooltip: 'Professional appraisal value' },
    { id: 'marketValue', label: 'Market Value', type: 'currency', required: false, placeholder: '410000', tooltip: 'Estimated market value' },
    { id: 'assessedValue', label: 'Assessed Value', type: 'currency', required: false, placeholder: '380000', tooltip: 'Tax assessed value' },
    { id: 'purchasePrice', label: 'Purchase Price', type: 'currency', required: false, placeholder: '395000', tooltip: 'Original purchase price' },

    // Loan Details
    { id: 'loanType', label: 'Loan Type', type: 'select', required: false, options: [
      { value: 'conventional', label: 'Conventional' },
      { value: 'fha', label: 'FHA' },
      { value: 'va', label: 'VA' },
      { value: 'usda', label: 'USDA' },
      { value: 'jumbo', label: 'Jumbo' },
      { value: 'hard_money', label: 'Hard Money' },
      { value: 'private', label: 'Private' }
    ], tooltip: 'Type of loan' },
    { id: 'interestRate', label: 'Interest Rate (%)', type: 'percentage', required: false, placeholder: '6.5', tooltip: 'Annual interest rate' },
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', required: false, placeholder: '30', tooltip: 'Loan term in years' },

    // Property Information
    { id: 'propertyType', label: 'Property Type', type: 'select', required: false, options: [
      { value: 'single_family', label: 'Single Family' },
      { value: 'multi_family', label: 'Multi Family' },
      { value: 'condo', label: 'Condo' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'land', label: 'Land' },
      { value: 'mixed_use', label: 'Mixed Use' }
    ], tooltip: 'Type of property' },

    // Risk Assessment
    { id: 'marketRisk', label: 'Market Risk', type: 'select', required: false, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ], tooltip: 'Market risk level' },
    { id: 'propertyRisk', label: 'Property Risk', type: 'select', required: false, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ], tooltip: 'Property risk level' },

    // Analysis Options
    { id: 'analysisPeriod', label: 'Analysis Period (Years)', type: 'number', required: false, placeholder: '5', tooltip: 'Period for analysis' },
    { id: 'inflationRate', label: 'Inflation Rate (%)', type: 'percentage', required: false, placeholder: '2.5', tooltip: 'Expected inflation rate' },
    { id: 'propertyAppreciationRate', label: 'Property Appreciation Rate (%)', type: 'percentage', required: false, placeholder: '3', tooltip: 'Expected property appreciation' },
    { id: 'discountRate', label: 'Discount Rate (%)', type: 'percentage', required: false, placeholder: '8', tooltip: 'Discount rate for analysis' }
  ],
  outputs: [
    { id: 'loanToValueRatio', label: 'LTV Ratio', type: 'percentage', explanation: 'Loan-to-value ratio percentage' },
    { id: 'combinedLtvRatio', label: 'Combined LTV', type: 'percentage', explanation: 'Combined loan-to-value ratio' },
    { id: 'effectiveLtvRatio', label: 'Effective LTV', type: 'percentage', explanation: 'Effective loan-to-value ratio' },
    { id: 'equityPosition', label: 'Equity Position', type: 'currency', explanation: 'Current equity in property' },
    { id: 'equityPercentage', label: 'Equity Percentage', type: 'percentage', explanation: 'Equity as percentage of property value' },
    { id: 'riskScore', label: 'Risk Score', type: 'number', explanation: 'Overall risk assessment (0-100)' },
    { id: 'pmiRequired', label: 'PMI Required', type: 'text', explanation: 'Whether PMI is required' },
    { id: 'pmiCost', label: 'PMI Cost', type: 'currency', explanation: 'Annual PMI cost' },
    { id: 'marketPosition', label: 'Market Position', type: 'text', explanation: 'Property market position analysis' },
    { id: 'recommendation', label: 'Recommendation', type: 'text', explanation: 'Lending recommendation' },
    { id: 'ltvRating', label: 'LTV Rating', type: 'text', explanation: 'LTV ratio rating' },
    { id: 'riskRating', label: 'Risk Rating', type: 'text', explanation: 'Overall risk rating' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};