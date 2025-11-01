import { Calculator } from '../../types/calculator';
import { SponsorshipRoiCalculatorInputs, SponsorshipRoiCalculatorOutputs } from './types';
import {
  // Import calculation functions from formulas.ts
  calculateResult,
  calculateSecondaryResult,
  // Add other formula imports as needed
} from './formulas';
import { validateSponsorshipRoiCalculatorInputs, validateSponsorshipRoiCalculatorBusinessRules } from './validation';

export const SponsorshipRoiCalculator: Calculator = {
  id: 'SponsorshipRoiCalculator-calculator',
  title: 'Sponsorship ROI Calculator Calculator',
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
        "id": "investment",
        "label": "Initial Investment ($)",
        "type": "currency",
        "required": true,
        "min": 0,
        "tooltip": "Amount invested initially"
    },
    {
        "id": "revenue",
        "label": "Revenue ($)",
        "type": "currency",
        "required": true,
        "min": 0,
        "tooltip": "Total revenue generated"
    },
    {
        "id": "costs",
        "label": "Costs ($)",
        "type": "currency",
        "required": true,
        "min": 0,
        "tooltip": "Total costs incurred"
    }
],

  outputs: [
    {
        "id": "netProfit",
        "label": "Net Profit",
        "type": "currency",
        "explanation": "Revenue minus costs"
    },
    {
        "id": "roi",
        "label": "ROI (%)",
        "type": "percentage",
        "explanation": "Return on investment percentage"
    }
],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
        "title": "Business Investment",
        "description": "ROI calculation for business investment",
        "inputs": {
            "investment": 50000,
            "revenue": 80000,
            "costs": 30000
        },
        "expectedOutputs": {
            "netProfit": 50000,
            "roi": 100
        }
    }
]
};