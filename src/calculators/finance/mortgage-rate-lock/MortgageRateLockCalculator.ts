import { Calculator } from '../../types/calculator';

export const MortgageRateLockCalculator: Calculator = {
  id: 'MortgageRateLock-calculator',
  title: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate mortgage rate lock costs, benefits, and optimal timing for locking in your interest rate.',
  usageInstructions: [
    'Enter your loan details and current market rates',
    'Specify your rate lock period and costs',
    'Compare locked vs. floating rate scenarios',
    'Determine optimal timing for rate lock decisions'
  ],
  inputs: [
    // Loan Information
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', required: true, placeholder: '300000', tooltip: 'Total mortgage loan amount' },
    { id: 'currentRate', label: 'Current Rate (%)', type: 'percentage', required: true, placeholder: '6.5', tooltip: 'Your current mortgage interest rate' },
    { id: 'marketRate', label: 'Market Rate (%)', type: 'percentage', required: true, placeholder: '6.25', tooltip: 'Current market mortgage rate' },

    // Rate Lock Details
    { id: 'lockPeriod', label: 'Lock Period (Days)', type: 'number', required: true, placeholder: '60', tooltip: 'Number of days the rate is locked' },
    { id: 'lockCost', label: 'Lock Cost', type: 'currency', required: false, placeholder: '1500', tooltip: 'Cost to lock the rate' },
    { id: 'floatDownOption', label: 'Float Down Option', type: 'boolean', required: false, tooltip: 'Whether float down option is available' },

    // Market Conditions
    { id: 'expectedRateChange', label: 'Expected Rate Change (%)', type: 'percentage', required: false, placeholder: '0.25', tooltip: 'Expected change in rates during lock period' },
    { id: 'closingDays', label: 'Days to Closing', type: 'number', required: true, placeholder: '45', tooltip: 'Number of days until loan closes' },

    // Comparison Options
    { id: 'compareLockPeriod1', label: 'Compare Lock Period 1 (Days)', type: 'number', required: false, placeholder: '30', tooltip: 'Alternative lock period for comparison' },
    { id: 'compareLockPeriod2', label: 'Compare Lock Period 2 (Days)', type: 'number', required: false, placeholder: '90', tooltip: 'Second alternative lock period for comparison' },

    // Risk Assessment
    { id: 'rateVolatility', label: 'Rate Volatility (%)', type: 'percentage', required: false, placeholder: '0.5', tooltip: 'Expected rate volatility during lock period' }
  ],
  outputs: [
    { id: 'rateSavings', label: 'Rate Savings (%)', type: 'percentage', explanation: 'Potential savings from locking current market rate' },
    { id: 'monthlySavings', label: 'Monthly Payment Savings', type: 'currency', explanation: 'Monthly savings from lower locked rate' },
    { id: 'totalSavings', label: 'Total Savings Over Loan', type: 'currency', explanation: 'Total savings over remaining loan term' },
    { id: 'breakEvenDays', label: 'Break-Even Days', type: 'number', explanation: 'Days needed for lock cost to break even' },
    { id: 'lockRecommendation', label: 'Lock Recommendation', type: 'text', explanation: 'Recommendation to lock or float based on analysis' },
    { id: 'riskAssessment', label: 'Risk Assessment', type: 'text', explanation: 'Assessment of rate lock vs. floating risk' },
    { id: 'optimalTiming', label: 'Optimal Timing', type: 'text', explanation: 'Best time to lock based on market conditions' },
    { id: 'costBenefitRatio', label: 'Cost-Benefit Ratio', type: 'number', explanation: 'Ratio of potential savings to lock cost' },
    { id: 'compareSavings1', label: 'Savings with Period 1', type: 'currency', explanation: 'Savings with alternative lock period 1' },
    { id: 'compareSavings2', label: 'Savings with Period 2', type: 'currency', explanation: 'Savings with alternative lock period 2' },
    { id: 'probabilityAnalysis', label: 'Probability Analysis', type: 'text', explanation: 'Statistical analysis of rate lock success' }
  ],
  formulas: [],
  validationRules: [],
  examples: []
};