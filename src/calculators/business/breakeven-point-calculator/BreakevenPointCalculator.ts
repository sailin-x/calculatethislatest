import { Calculator } from '../../types/calculator';
import { BreakevenPointCalculatorInputs, BreakevenPointCalculatorOutputs } from './types';
import { calculateBreakevenPointResults } from './formulas';
import { validateBreakevenPointCalculatorInputs } from './validation';
import {
  quickValidateFixedCosts,
  quickValidateVariableCostPerUnit,
  quickValidateSellingPricePerUnit,
  quickValidateTargetProfit
} from './quickValidation';

export const BreakevenPointCalculator: Calculator = {
  id: 'breakeven-point-calculator',
  title: 'Breakeven Point Calculator',
  category: 'business',
  subcategory: 'Financial Analysis',
  description: 'Calculate the breakeven point where total revenue equals total costs',
  usageInstructions: [
    'Enter your fixed costs (rent, salaries, etc.)',
    'Specify variable cost per unit (cost to produce each item)',
    'Set selling price per unit',
    'Optionally enter target profit',
    'Review breakeven analysis and recommendations'
  ],

  inputs: [
    {
      id: 'fixedCosts',
      label: 'Fixed Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total fixed costs (rent, salaries, insurance, etc.)'
    },
    {
      id: 'variableCostPerUnit',
      label: 'Variable Cost per Unit ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cost to produce or acquire each unit'
    },
    {
      id: 'sellingPricePerUnit',
      label: 'Selling Price per Unit ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      tooltip: 'Price at which each unit is sold'
    },
    {
      id: 'targetProfit',
      label: 'Target Profit ($)',
      type: 'currency',
      required: false,
      tooltip: 'Optional: Desired profit amount (leave blank for basic breakeven)'
    }
  ],

  outputs: [
    {
      id: 'breakevenUnits',
      label: 'Breakeven Units',
      type: 'number',
      explanation: 'Number of units needed to break even'
    },
    {
      id: 'breakevenRevenue',
      label: 'Breakeven Revenue',
      type: 'currency',
      explanation: 'Revenue needed to cover all costs'
    },
    {
      id: 'contributionMargin',
      label: 'Contribution Margin per Unit',
      type: 'currency',
      explanation: 'Selling price minus variable cost per unit'
    },
    {
      id: 'contributionMarginRatio',
      label: 'Contribution Margin Ratio',
      type: 'percentage',
      explanation: 'Contribution margin as percentage of selling price'
    },
    {
      id: 'profitVolume',
      label: 'Profit Volume',
      type: 'currency',
      explanation: 'Estimated profit at current sales level'
    },
    {
      id: 'safetyMargin',
      label: 'Safety Margin',
      type: 'percentage',
      explanation: 'Percentage above breakeven point'
    }
  ],

  formulas: [
    {
      id: 'breakeven-analysis',
      name: 'Breakeven Analysis',
      description: 'Calculate breakeven point and profitability analysis',
      calculate: (inputs: Record<string, any>) => {
        const results = calculateBreakevenPointResults(inputs as BreakevenPointCalculatorInputs);
        return {
          outputs: {
            breakevenUnits: results.breakevenUnits,
            breakevenRevenue: results.breakevenRevenue,
            contributionMargin: results.contributionMargin,
            contributionMarginRatio: results.contributionMarginRatio,
            profitVolume: results.profitVolume,
            safetyMargin: results.safetyMargin,
            analysis: results.analysis
          },
          explanation: `Breakeven analysis shows ${results.breakevenUnits} units needed to break even with $${results.breakevenRevenue} revenue.`
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'fixedCosts',
      type: 'required',
      message: 'Fixed costs are required',
      validator: (value) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'variableCostPerUnit',
      type: 'required',
      message: 'Variable cost per unit is required',
      validator: (value) => value !== undefined && value !== null && value >= 0
    },
    {
      field: 'sellingPricePerUnit',
      type: 'required',
      message: 'Selling price per unit is required',
      validator: (value) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'variableCostPerUnit',
      type: 'business',
      message: 'Variable cost cannot exceed selling price',
      validator: (value, allInputs) => !allInputs?.sellingPricePerUnit || value < allInputs.sellingPricePerUnit
    }
  ],

  examples: [
    {
      title: 'Manufacturing Business Breakeven',
      description: 'Calculate breakeven for a manufacturing business with $50,000 fixed costs',
      inputs: {
        fixedCosts: 50000,
        variableCostPerUnit: 25,
        sellingPricePerUnit: 50,
        targetProfit: 0
      },
      expectedOutputs: {
        breakevenUnits: 1667,
        breakevenRevenue: 83350,
        contributionMargin: 25,
        contributionMarginRatio: 50,
        profitVolume: 0,
        safetyMargin: 0
      }
    },
    {
      title: 'Service Business with Target Profit',
      description: 'Calculate breakeven for a service business aiming for $20,000 profit',
      inputs: {
        fixedCosts: 30000,
        variableCostPerUnit: 15,
        sellingPricePerUnit: 75,
        targetProfit: 20000
      },
      expectedOutputs: {
        breakevenUnits: 667,
        breakevenRevenue: 50025,
        contributionMargin: 60,
        contributionMarginRatio: 80,
        profitVolume: 20000,
        safetyMargin: 0
      }
    }
  ]
};
