import { Calculator } from '../../types/calculator';
import { TermVsUniversalLifeCalculatorInputs, TermVsUniversalLifeCalculatorOutputs } from './types';
import {
  calculateSettlementAmount,
  calculateNetRecovery,
  calculateTotalCosts,
  generateAnalysis
} from './formulas';
import { validateTermVsUniversalLifeCalculatorInputs } from './validation';

export const TermVsUniversalLifeCalculator: Calculator = {
  id: 'TermVsUniversal-life-calculator',
  title: 'Term vs Universal Life Calculator',
  category: 'legal',
  subcategory: 'Settlement Analysis',
  description: 'Compare term vs universal life',
  usageInstructions: [
    'Enter the total claim amount',
    'Specify expected settlement percentage',
    'Input attorney fees and court costs',
    'Select jurisdiction for calculations',
    'Review settlement analysis and recommendations'
  ],

  inputs: [
    {
      id: 'claimAmount',
      label: 'Claim Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total amount being claimed'
    },
    {
      id: 'settlementPercentage',
      label: 'Settlement Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Expected settlement as percentage of claim'
    },
    {
      id: 'attorneyFees',
      label: 'Attorney Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Attorney fees as percentage of settlement'
    },
    {
      id: 'courtCosts',
      label: 'Court Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Additional court and filing costs'
    },
    {
      id: 'jurisdiction',
      label: 'Jurisdiction',
      type: 'select',
      required: true,
      options: [
        { value: 'federal', label: 'Federal Court' },
        { value: 'state', label: 'State Court' },
        { value: 'county', label: 'County Court' }
      ],
      tooltip: 'Court jurisdiction for the case'
    }
  ],

  outputs: [
    {
      id: 'settlementAmount',
      label: 'Settlement Amount',
      type: 'currency',
      explanation: 'Calculated settlement amount'
    },
    {
      id: 'netRecovery',
      label: 'Net Recovery',
      type: 'currency',
      explanation: 'Amount received after fees and costs'
    },
    {
      id: 'totalCosts',
      label: 'Total Costs',
      type: 'currency',
      explanation: 'Total attorney fees and court costs'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Personal Injury Settlement',
      description: 'Calculate settlement for $100,000 claim with 60% recovery and 30% attorney fees',
      inputs: {
        claimAmount: 100000,
        settlementPercentage: 60,
        attorneyFees: 30,
        courtCosts: 2500,
        jurisdiction: 'state'
      },
      expectedOutputs: {
        settlementAmount: 60000,
        netRecovery: 37500,
        totalCosts: 22500
      }
    },
    {
      title: 'Contract Dispute',
      description: 'Calculate settlement for $50,000 contract claim with 80% recovery',
      inputs: {
        claimAmount: 50000,
        settlementPercentage: 80,
        attorneyFees: 25,
        courtCosts: 1500,
        jurisdiction: 'federal'
      },
      expectedOutputs: {
        settlementAmount: 40000,
        netRecovery: 28500,
        totalCosts: 11500
      }
    }
  ]
};
