import { Calculator } from '../../types/calculator';
import { OffshoreWindFarmInstallationCostCalculatorInputs, OffshoreWindFarmInstallationCostCalculatorOutputs } from './types';
import {
  // Import calculation functions from formulas.ts
  calculateResult,
  calculateSecondaryResult,
  // Add other formula imports as needed
} from './formulas';
import { validateOffshoreWindFarmInstallationCostCalculatorInputs, validateOffshoreWindFarmInstallationCostCalculatorBusinessRules } from './validation';

export const OffshoreWindFarmInstallationCostCalculator: Calculator = {
  id: 'OffshoreWindFarm-InstallationCostCalculator-calculator',
  title: 'Offshore Wind Farm Installation Cost Calculator Calculator',
  category: 'business', // e.g., 'finance', 'math', 'health', 'business'
  subbusiness: 'Subbusiness Name',
  description: 'Brief description of what this calculator does and its purpose.',
  usageInstructions: [
    'Step 1: Enter the primary input values',
    'Step 2: Configure any optional parameters',
    'Step 3: Review the calculated results',
    'Step 4: Adjust inputs as needed for different scenarios'
  ],

  inputs: [
    {
        "id": "input1",
        "label": "Input 1",
        "type": "number",
        "required": true,
        "min": 0,
        "tooltip": "Primary input value"
    },
    {
        "id": "input2",
        "label": "Input 2",
        "type": "currency",
        "required": true,
        "min": 0,
        "tooltip": "Secondary input value"
    }
],

  outputs: [
    {
        "id": "result",
        "label": "Result",
        "type": "currency",
        "explanation": "Calculated result"
    }
],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
        "title": "Basic Example",
        "description": "Standard calculation example",
        "inputs": {
            "input1": 100,
            "input2": 50
        },
        "expectedOutputs": {
            "result": 150
        }
    }
]
};