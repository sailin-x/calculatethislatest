import { Calculator } from '../../../../types/calculator';
import { managed_security_service_provider_mssp_vs_in_house_soc_calculatorInputs, managed_security_service_provider_mssp_vs_in_house_soc_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const ManagedSecurityService-ProviderMsspVs-InHouseSoc-calculator: Calculator = {
  id: 'ManagedSecurityService-ProviderMsspVs-InHouseSoc-calculator',
  title: 'Managed Security Service Provider (MSSP) vs. In House SOC Calculator Calculator',
  category: 'businessmarketingoperations',
  subcategory: 'businessoperationsfinancehub',
  description: 'Calculate Managed Security Service Provider (MSSP) vs. In-House SOC Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Managed Security Service Provider (MSSP) vs. In-House SOC Calculator parameters',
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
      description: 'Basic Managed Security Service Provider (MSSP) vs. In-House SOC Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
