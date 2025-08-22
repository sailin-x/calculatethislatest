import { Calculator } from '../../../types/calculator';
import { calculateMortgageRateLock, generateMortgageRateLockAnalysis } from './formulas';
import { validateMortgageRateLockInputs } from './validation';

export const MortgageRateLockCalculator: Calculator = {
  name: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  description: 'Calculate the costs and benefits of locking in a mortgage rate, including lock fees, extension costs, and break-even analysis.',
  
  inputs: [
    {
      name: 'currentRate',
      label: 'Current Market Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 0.01,
      placeholder: '4.5'
    },
    {
      name: 'lockRate',
      label: 'Lock Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 0.01,
      placeholder: '4.5'
    },
    {
      name: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '300000'
    },
    {
      name: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    {
      name: 'lockDuration',
      label: 'Lock Duration (days)',
      type: 'number',
      required: true,
      min: 1,
      max: 365,
      step: 1,
      placeholder: '30'
    },
    {
      name: 'lockFee',
      label: 'Lock Fee ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000,
      step: 10,
      placeholder: '500'
    },
    {
      name: 'extensionFee',
      label: 'Extension Fee per Day ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 1000,
      step: 1,
      placeholder: '25'
    },
    {
      name: 'expectedClosingDate',
      label: 'Expected Closing Date',
      type: 'date',
      required: true,
      placeholder: '2024-12-31'
    },
    {
      name: 'lockStartDate',
      label: 'Lock Start Date',
      type: 'date',
      required: true,
      placeholder: '2024-11-01'
    },
    {
      name: 'rateVolatility',
      label: 'Expected Rate Volatility (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: '0.5',
      description: 'Expected daily rate movement'
    },
    {
      name: 'marketTrend',
      label: 'Market Trend',
      type: 'select',
      required: false,
      options: [
        { value: 'rising', label: 'Rising Rates' },
        { value: 'falling', label: 'Falling Rates' },
        { value: 'stable', label: 'Stable Rates' },
        { value: 'volatile', label: 'Volatile/Uncertain' }
      ],
      placeholder: 'stable'
    },
    {
      name: 'lockType',
      label: 'Lock Type',
      type: 'select',
      required: true,
      options: [
        { value: 'float-down', label: 'Float-Down Lock' },
        { value: 'fixed', label: 'Fixed Lock' },
        { value: 'one-time-float', label: 'One-Time Float' },
        { value: 'extended', label: 'Extended Lock' }
      ],
      placeholder: 'fixed'
    },
    {
      name: 'floatDownThreshold',
      label: 'Float-Down Threshold (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      placeholder: '0.25',
      description: 'Rate must drop by this amount to trigger float-down'
    },
    {
      name: 'floatDownFee',
      label: 'Float-Down Fee ($)',
      type: 'number',
      required: false,
      min: 0,
      max: 5000,
      step: 10,
      placeholder: '250',
      description: 'Fee to exercise float-down option'
    },
    {
      name: 'breakLockPenalty',
      label: 'Break Lock Penalty ($)',
      type: 'number',
      required: true,
      min: 0,
      max: 10000,
      step: 10,
      placeholder: '1000',
      description: 'Penalty for breaking the rate lock'
    },
    {
      name: 'processingTime',
      label: 'Expected Processing Time (days)',
      type: 'number',
      required: true,
      min: 1,
      max: 90,
      step: 1,
      placeholder: '45',
      description: 'Time from application to closing'
    },
    {
      name: 'includeExtensionRisk',
      label: 'Include Extension Risk Analysis',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeMarketScenarios',
      label: 'Include Market Scenario Analysis',
      type: 'boolean',
      required: false,
      default: true
    },
    {
      name: 'includeBreakEvenAnalysis',
      label: 'Include Break-Even Analysis',
      type: 'boolean',
      required: false,
      default: true
    }
  ],

  outputs: [
    {
      name: 'lockDecision',
      label: 'Lock Decision',
      type: 'string',
      description: 'Recommended action based on analysis'
    },
    {
      name: 'monthlyPaymentDifference',
      label: 'Monthly Payment Difference ($)',
      type: 'number',
      description: 'Difference in monthly payment between current and lock rates'
    },
    {
      name: 'totalInterestDifference',
      label: 'Total Interest Difference ($)',
      type: 'number',
      description: 'Total interest savings/cost over loan term'
    },
    {
      name: 'breakEvenDays',
      label: 'Break-Even Days',
      type: 'number',
      description: 'Days until lock fee is recovered through savings'
    },
    {
      name: 'extensionRisk',
      label: 'Extension Risk',
      type: 'string',
      description: 'Risk level of needing an extension'
    },
    {
      name: 'extensionCost',
      label: 'Potential Extension Cost ($)',
      type: 'number',
      description: 'Estimated cost if extension is needed'
    },
    {
      name: 'lockValue',
      label: 'Lock Value ($)',
      type: 'number',
      description: 'Net value of locking the rate'
    },
    {
      name: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'string',
      description: 'Overall risk assessment of the lock decision'
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'array',
      description: 'Actionable recommendations'
    },
    {
      name: 'scenarioAnalysis',
      label: 'Scenario Analysis',
      type: 'object',
      description: 'Analysis under different market conditions'
    },
    {
      name: 'costBreakdown',
      label: 'Cost Breakdown',
      type: 'object',
      description: 'Detailed breakdown of all costs and savings'
    },
    {
      name: 'timelineAnalysis',
      label: 'Timeline Analysis',
      type: 'object',
      description: 'Analysis of timeline risks and opportunities'
    }
  ],

  calculate: calculateMortgageRateLock,
  validate: validateMortgageRateLockInputs,
  generateAnalysis: generateMortgageRateLockAnalysis
};