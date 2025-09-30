import { Calculator } from '../../../../types/calculator';
import { request_for_proposal_rfp_scoring_calculatorInputs, request_for_proposal_rfp_scoring_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const request_for_proposal_rfp_scoring_calculatorCalculator: Calculator = {
  id: 'request-for-proposal-rfp-scoring-calculator',
  title: 'Request for Proposal (RFP) Scoring Calculator Calculator',
  category: 'businessmarketingoperations',
  subcategory: 'businessoperationsfinancehub',
  description: 'Calculate Request for Proposal (RFP) Scoring Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Request for Proposal (RFP) Scoring Calculator parameters',
    'Review calculation results',
    'Consider professional consultation for large amounts'
  ],

  inputs: [
    {
      id: 'amount',
      label: 'Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Primary amount for calculation'
    },
    {
      id: 'rate',
      label: 'Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 5,
      tooltip: 'Applicable rate percentage'
    },
    {
      id: 'time',
      label: 'Time Period',
      type: 'number',
      required: false,
      min: 1,
      max: 100,
      defaultValue: 1,
      tooltip: 'Time period for calculation'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result ($)',
      type: 'currency',
      explanation: 'Calculated result based on inputs'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'Standard Calculation',
      description: 'Basic Request for Proposal (RFP) Scoring Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
