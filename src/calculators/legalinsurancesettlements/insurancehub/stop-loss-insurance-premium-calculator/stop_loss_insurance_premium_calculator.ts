import { Calculator } from '../../../../types/calculator';
import { stop_loss_insurance_premium_calculatorInputs, stop_loss_insurance_premium_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const stop_loss_insurance_premium_calculatorCalculator: Calculator = {
  id: 'stop-loss-insurance-premium-calculator',
  title: 'Stop Loss Insurance Premium Calculator Calculator',
  category: 'legalinsurancesettlements',
  subcategory: 'insurancehub',
  description: 'Calculate Stop-Loss Insurance Premium Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Stop-Loss Insurance Premium Calculator parameters',
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
      description: 'Basic Stop-Loss Insurance Premium Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
