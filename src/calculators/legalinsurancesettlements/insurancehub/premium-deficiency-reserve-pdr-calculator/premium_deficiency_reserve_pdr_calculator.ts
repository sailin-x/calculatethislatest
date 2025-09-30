import { Calculator } from '../../../../types/calculator';
import { premium_deficiency_reserve_pdr_calculatorInputs, premium_deficiency_reserve_pdr_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const premium_deficiency_reserve_pdr_calculatorCalculator: Calculator = {
  id: 'premium-deficiency-reserve-pdr-calculator',
  title: 'Premium Deficiency Reserve (PDR) Calculator Calculator',
  category: 'legalinsurancesettlements',
  subcategory: 'insurancehub',
  description: 'Calculate Premium Deficiency Reserve (PDR) Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Premium Deficiency Reserve (PDR) Calculator parameters',
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
      description: 'Basic Premium Deficiency Reserve (PDR) Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
