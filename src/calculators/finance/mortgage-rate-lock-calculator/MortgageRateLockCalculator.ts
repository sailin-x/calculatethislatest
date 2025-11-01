import { Calculator } from '../../../types/calculator';
import { MortgageRateLockInputs, MortgageRateLockOutputs } from './types';
import { calculateMortgageRateLock } from './formulas';
import { validateMortgageRateLockInputs, validateMortgageRateLockBusinessRules } from './validation';

export const MortgageRateLockCalculator: Calculator = {
  id: 'MortgageRateLockCalculator',
  title: 'Mortgage Rate Lock Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Analyze mortgage rate lock options, calculate break-even points, assess risk, and compare alternative lock periods to optimize timing and cost.',
  usageInstructions: [
    'Enter loan details and current lock information',
    'Input market conditions and historical data',
    'Review risk assessment and break-even analysis',
    'Compare alternative lock scenarios and recommendations'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total mortgage loan amount'
    },
    {
      id: 'lockedInterestRate',
      label: 'Locked Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Interest rate locked with lender'
    },
    {
      id: 'currentMarketRate',
      label: 'Current Market Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current market interest rate'
    },
    {
      id: 'lockPeriod',
      label: 'Lock Period (Days)',
      type: 'number',
      required: true,
      min: 1,
      max: 180,
      tooltip: 'Number of days rate is locked'
    },
    {
      id: 'lockExpirationDate',
      label: 'Lock Expiration Date',
      type: 'date',
      required: true,
      tooltip: 'Date when rate lock expires'
    },
    {
      id: 'estimatedClosingDate',
      label: 'Estimated Closing Date',
      type: 'date',
      required: true,
      tooltip: 'Expected loan closing date'
    },
    {
      id: 'rateLockCost',
      label: 'Rate Lock Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cost to lock the interest rate'
    },
    {
      id: 'lenderCredit',
      label: 'Lender Credit ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Credits provided by lender'
    },
    {
      id: 'floatDownOption',
      label: 'Float Down Option Available',
      type: 'boolean',
      required: false,
      tooltip: 'Can rate float down if market rates decrease?'
    },
    {
      id: 'floatDownRate',
      label: 'Float Down Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Rate to which loan can float down'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility',
      type: 'select',
      required: true,
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
      ],
      tooltip: 'Current market volatility level'
    },
    {
      id: 'expectedRateMovement',
      label: 'Expected Rate Movement (Basis Points)',
      type: 'number',
      required: true,
      min: -500,
      max: 500,
      tooltip: 'Expected change in rates (positive = increase)'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 50,
      tooltip: 'Confidence in rate movement prediction'
    },
    {
      id: 'alternativeRateLockPeriods',
      label: 'Alternative Lock Periods (Days)',
      type: 'text',
      required: false,
      tooltip: 'Alternative lock periods to compare (comma-separated)'
    },
    {
      id: 'rateAdjustmentCaps.initial',
      label: 'Initial Adjustment Cap (Basis Points)',
      type: 'number',
      required: false,
      min: 0,
      max: 500,
      defaultValue: 200,
      tooltip: 'Maximum initial rate adjustment'
    },
    {
      id: 'rateAdjustmentCaps.periodic',
      label: 'Periodic Adjustment Cap (Basis Points)',
      type: 'number',
      required: false,
      min: 0,
      max: 200,
      defaultValue: 200,
      tooltip: 'Maximum periodic rate adjustment'
    },
    {
      id: 'rateAdjustmentCaps.lifetime',
      label: 'Lifetime Cap (Basis Points)',
      type: 'number',
      required: false,
      min: 0,
      max: 600,
      defaultValue: 500,
      tooltip: 'Maximum lifetime rate adjustment'
    },
    {
      id: 'historicalRateData.averageMovement',
      label: 'Historical Average Movement (Basis Points/Day)',
      type: 'number',
      required: false,
      min: -200,
      max: 200,
      defaultValue: 0,
      tooltip: 'Average daily rate movement from historical data'
    },
    {
      id: 'historicalRateData.volatilityIndex',
      label: 'Volatility Index (0-100)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 50,
      tooltip: 'Market volatility index'
    },
    {
      id: 'historicalRateData.trendDirection',
      label: 'Rate Trend Direction',
      type: 'select',
      required: false,
      options: [
        { value: 'Rising', label: 'Rising' },
        { value: 'Falling', label: 'Falling' },
        { value: 'Stable', label: 'Stable' }
      ],
      defaultValue: 'Stable',
      tooltip: 'General direction of rate trends'
    }
  ],

  outputs: [
    {
      id: 'lockStatus',
      label: 'Lock Status',
      type: 'text',
      explanation: 'Current status of the rate lock'
    },
    {
      id: 'daysRemaining',
      label: 'Days Remaining',
      type: 'number',
      explanation: 'Days until rate lock expires'
    },
    {
      id: 'rateLockValue',
      label: 'Rate Lock Value',
      type: 'currency',
      explanation: 'Current value of the rate lock protection'
    },
    {
      id: 'potentialSavings',
      label: 'Potential Savings',
      type: 'currency',
      explanation: 'Potential savings if rates move as expected'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of various risk factors'
    },
    {
      id: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'text',
      explanation: 'Analysis of when lock pays for itself'
    },
    {
      id: 'alternativeScenarios',
      label: 'Alternative Scenarios',
      type: 'text',
      explanation: 'Comparison of different lock options'
    },
    {
      id: 'marketAnalysis',
      label: 'Market Analysis',
      type: 'text',
      explanation: 'Current market conditions and trends'
    },
    {
      id: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'text',
      explanation: 'Detailed cost-benefit breakdown'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations based on analysis'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Impact analysis for different rate scenarios'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '60-Day Lock with Rising Rates',
      description: 'Analysis of a 60-day rate lock with expected rate increases',
      inputs: {
        loanAmount: 400000,
        lockedInterestRate: 6.75,
        currentMarketRate: 6.5,
        lockPeriod: 60,
        lockExpirationDate: '2024-12-15',
        estimatedClosingDate: '2024-11-15',
        rateLockCost: 1200,
        lenderCredit: 300,
        floatDownOption: true,
        floatDownRate: 6.25,
        marketVolatility: 'Medium',
        expectedRateMovement: 50,
        confidenceLevel: 70,
        alternativeRateLockPeriods: [30, 45, 90],
        rateAdjustmentCaps: {
          initial: 200,
          periodic: 200,
          lifetime: 500
        },
        historicalRateData: {
          averageMovement: 2,
          volatilityIndex: 45,
          trendDirection: 'Rising'
        }
      },
      expectedOutputs: {
        lockStatus: 'Active',
        daysRemaining: 45,
        rateLockValue: 8500,
        potentialSavings: 12000,
        riskAssessment: 'Medium overall risk with moderate rate increase risk'
      }
    },
    {
      title: '30-Day Lock with Stable Market',
      description: 'Short-term lock analysis in a stable market environment',
      inputs: {
        loanAmount: 300000,
        lockedInterestRate: 6.25,
        currentMarketRate: 6.25,
        lockPeriod: 30,
        lockExpirationDate: '2024-11-30',
        estimatedClosingDate: '2024-11-15',
        rateLockCost: 600,
        lenderCredit: 150,
        floatDownOption: false,
        marketVolatility: 'Low',
        expectedRateMovement: 0,
        confidenceLevel: 80,
        alternativeRateLockPeriods: [15, 45, 60],
        rateAdjustmentCaps: {
          initial: 200,
          periodic: 200,
          lifetime: 500
        },
        historicalRateData: {
          averageMovement: 0,
          volatilityIndex: 25,
          trendDirection: 'Stable'
        }
      },
      expectedOutputs: {
        lockStatus: 'Active',
        daysRemaining: 30,
        rateLockValue: 0,
        potentialSavings: 0,
        riskAssessment: 'Low overall risk in stable market'
      }
    }
  ]
};