import { Calculator } from '../../../types/calculator';
import { calculateMortgagePayoff, generateMortgagePayoffAnalysis } from './formulas';
import { validateMortgagePayoffInputs } from './validation';

export const MortgagePayoffCalculator: Calculator = {
  id: 'mortgage-payoff-calculator',
  name: 'Mortgage Payoff Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage payoff strategies, timelines, and savings from accelerated payments, refinancing, and lump sum payments.',
  inputs: [
    { id: 'loanAmount', name: 'Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Current mortgage loan balance', placeholder: '250000', min: 10000, max: 5000000 },
    { id: 'interestRate', name: 'Interest Rate', type: 'number', unit: '%/year', required: true, description: 'Current mortgage interest rate', placeholder: '4.5', min: 0, max: 25 },
    { id: 'loanTerm', name: 'Loan Term', type: 'number', unit: 'years', required: true, description: 'Original loan term in years', placeholder: '30', min: 1, max: 50 },
    { id: 'remainingTerm', name: 'Remaining Term', type: 'number', unit: 'years', required: false, description: 'Remaining loan term in years', placeholder: '25', min: 1, max: 50 },
    { id: 'monthlyPayment', name: 'Monthly Payment', type: 'number', unit: 'USD', required: false, description: 'Current monthly mortgage payment', placeholder: '1267', min: 100, max: 50000 },
    { id: 'additionalPayment', name: 'Additional Payment', type: 'number', unit: 'USD/month', required: false, description: 'Additional monthly principal payment', placeholder: '200', min: 0, max: 10000 },
    { id: 'lumpSumPayment', name: 'Lump Sum Payment', type: 'number', unit: 'USD', required: false, description: 'One-time lump sum payment', placeholder: '10000', min: 0, max: 1000000 },
    { id: 'lumpSumDate', name: 'Lump Sum Date', type: 'date', required: false, description: 'Date for lump sum payment', placeholder: '2024-01-01' },
    { id: 'biweeklyPayment', name: 'Biweekly Payment', type: 'boolean', required: false, description: 'Switch to biweekly payments', placeholder: 'false' },
    { id: 'refinanceOption', name: 'Refinance Option', type: 'select', required: false, description: 'Consider refinancing to accelerate payoff', placeholder: 'Select refinance option', options: ['No Refinance', 'Lower Rate', 'Shorter Term', 'Both'] },
    { id: 'refinanceRate', name: 'Refinance Rate', type: 'number', unit: '%/year', required: false, description: 'New refinance interest rate', placeholder: '3.5', min: 0, max: 25 },
    { id: 'refinanceTerm', name: 'Refinance Term', type: 'number', unit: 'years', required: false, description: 'New refinance loan term', placeholder: '15', min: 1, max: 50 },
    { id: 'refinanceClosingCosts', name: 'Refinance Closing Costs', type: 'number', unit: 'USD', required: false, description: 'Refinance closing costs', placeholder: '5000', min: 0, max: 50000 },
    { id: 'investmentReturn', name: 'Investment Return', type: 'number', unit: '%/year', required: false, description: 'Expected investment return rate', placeholder: '7', min: 0, max: 15 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Marginal tax rate for interest deduction', placeholder: '25', min: 0, max: 50 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%/year', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: 0, max: 10 },
    { id: 'extraPaymentFrequency', name: 'Extra Payment Frequency', type: 'select', required: false, description: 'Frequency of extra payments', placeholder: 'Select frequency', options: ['Monthly', 'Quarterly', 'Annually', 'One-time'] },
    { id: 'paymentIncrease', name: 'Payment Increase', type: 'number', unit: '%', required: false, description: 'Percentage increase in monthly payment', placeholder: '10', min: 0, max: 100 },
    { id: 'payoffGoal', name: 'Payoff Goal', type: 'number', unit: 'years', required: false, description: 'Target payoff timeline in years', placeholder: '15', min: 1, max: 50 },
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: false, description: 'Analysis time period', placeholder: '10', min: 1, max: 50 },
    { id: 'scenarioComparison', name: 'Scenario Comparison', type: 'boolean', required: false, description: 'Compare multiple payoff scenarios', placeholder: 'true' },
    { id: 'includeTaxBenefits', name: 'Include Tax Benefits', type: 'boolean', required: false, description: 'Include mortgage interest tax deduction', placeholder: 'true' },
    { id: 'includeOpportunityCost', name: 'Include Opportunity Cost', type: 'boolean', required: false, description: 'Include investment opportunity cost', placeholder: 'true' },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: false, description: 'Current property value', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'propertyAppreciation', name: 'Property Appreciation', type: 'number', unit: '%/year', required: false, description: 'Expected annual property appreciation', placeholder: '3', min: -10, max: 20 }
  ],
  outputs: [
    { id: 'currentPayoffDate', name: 'Current Payoff Date', type: 'date', description: 'Payoff date with current payments' },
    { id: 'acceleratedPayoffDate', name: 'Accelerated Payoff Date', type: 'date', description: 'Payoff date with accelerated payments' },
    { id: 'yearsSaved', name: 'Years Saved', type: 'number', unit: 'years', description: 'Years saved with accelerated payoff' },
    { id: 'interestSaved', name: 'Interest Saved', type: 'number', unit: 'USD', description: 'Total interest saved with accelerated payoff' },
    { id: 'totalSavings', name: 'Total Savings', type: 'number', unit: 'USD', description: 'Total savings including opportunity cost' },
    { id: 'monthlyPaymentRequired', name: 'Monthly Payment Required', type: 'number', unit: 'USD', description: 'Monthly payment needed for target payoff' },
    { id: 'payoffAnalysis', name: 'Payoff Analysis', type: 'object', description: 'Detailed payoff analysis and comparisons' },
    { id: 'scenarioComparison', name: 'Scenario Comparison', type: 'object', description: 'Comparison of different payoff strategies' },
    { id: 'costBenefitAnalysis', name: 'Cost-Benefit Analysis', type: 'object', description: 'Cost-benefit analysis of payoff strategies' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Payoff strategy recommendations' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key payoff metrics and analysis' },
    { id: 'mortgagePayoffAnalysis', name: 'Mortgage Payoff Analysis', type: 'string', description: 'Comprehensive mortgage payoff analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMortgagePayoff(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgagePayoffAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Calculates monthly payment where P=payment, L=loan amount, c=monthly rate, n=total payments'
    },
    {
      name: 'Remaining Balance',
      formula: 'B = L[(1 + c)^n - (1 + c)^p]/[(1 + c)^n - 1]',
      description: 'Calculates remaining balance where B=balance, L=loan amount, c=monthly rate, n=total payments, p=payments made'
    },
    {
      name: 'Payoff Time with Extra Payments',
      formula: 'T = ln[(P + E)/(P + E - L*c)]/ln(1 + c)',
      description: 'Calculates payoff time where T=time, P=payment, E=extra payment, L=loan amount, c=monthly rate'
    },
    {
      name: 'Interest Saved',
      formula: 'Interest Saved = Total Interest (Original) - Total Interest (Accelerated)',
      description: 'Calculates total interest savings from accelerated payments'
    },
    {
      name: 'Opportunity Cost',
      formula: 'Opportunity Cost = Extra Payments × (1 + r)^t - Extra Payments',
      description: 'Calculates opportunity cost where r=investment return, t=time period'
    },
    {
      name: 'Tax Benefit',
      formula: 'Tax Benefit = Interest Paid × Tax Rate',
      description: 'Calculates tax benefit from mortgage interest deduction'
    },
    {
      name: 'Net Savings',
      formula: 'Net Savings = Interest Saved - Opportunity Cost + Tax Benefit',
      description: 'Calculates net savings including all factors'
    },
    {
      name: 'Required Payment for Target Payoff',
      formula: 'Required Payment = L[c(1 + c)^(t*12)]/[(1 + c)^(t*12) - 1]',
      description: 'Calculates payment needed for target payoff time t'
    }
  ]
};