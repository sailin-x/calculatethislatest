import { Calculator } from '../../../types/calculator';
import { CapitalStructureOptimizationInputs, CapitalStructureOptimizationOutputs } from './types';
import { calculateCapitalStructureOptimization } from './formulas';
import { validateCapitalStructureOptimizationInputs } from './validation';

export const CapitalStructureOptimizationCalculator: Calculator & {
  calculate: (inputs: CapitalStructureOptimizationInputs) => CapitalStructureOptimizationOutputs;
  generateReport: (inputs: CapitalStructureOptimizationInputs, outputs: CapitalStructureOptimizationOutputs) => string;
} = {
  id: 'capital-structure-optimization',
  title: 'Capital Structure Optimization Calculator',
  name: 'Capital Structure Optimization Calculator',
  category: 'finance',
  subcategory: 'corporate-finance',
  description: 'Optimize capital structure using WACC minimization and trade-off theory to find the ideal debt-equity mix.',
  usageInstructions: [
    'Enter company financial information and market data',
    'Specify current and target capital structure ratios',
    'Review optimal debt ratio and WACC calculations',
    'Analyze sensitivity to different capital structures',
    'Generate comprehensive capital structure report'
  ],

  inputs: [
    {
      id: 'totalAssets',
      label: 'Total Assets ($)',
      type: 'currency' as const,
      required: true,
      min: 100000,
      max: 100000000000,
      tooltip: 'Total assets of the company'
    },
    {
      id: 'totalDebt',
      label: 'Total Debt ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 100000000000,
      tooltip: 'Total outstanding debt'
    },
    {
      id: 'totalEquity',
      label: 'Total Equity ($)',
      type: 'currency' as const,
      required: true,
      min: 1,
      max: 100000000000,
      tooltip: 'Total shareholder equity'
    },
    {
      id: 'costOfDebt',
      label: 'Cost of Debt (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Annual cost of debt financing'
    },
    {
      id: 'costOfEquity',
      label: 'Cost of Equity (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Required return on equity'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Corporate tax rate'
    },
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Risk-free rate (e.g., 10-year Treasury yield)'
    },
    {
      id: 'marketRiskPremium',
      label: 'Market Risk Premium (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Expected market return minus risk-free rate'
    },
    {
      id: 'beta',
      label: 'Beta',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Systematic risk measure'
    },
    {
      id: 'targetDebtRatio',
      label: 'Target Debt Ratio (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Desired debt-to-total capital ratio'
    },
    {
      id: 'currentDebtRatio',
      label: 'Current Debt Ratio (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current debt-to-total capital ratio'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number' as const,
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Time horizon for analysis'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'growthRate',
      label: 'Growth Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual growth rate'
    },
    {
      id: 'companyType',
      label: 'Company Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'public', label: 'Public Company' },
        { value: 'private', label: 'Private Company' },
        { value: 'startup', label: 'Startup' },
        { value: 'mature', label: 'Mature Company' }
      ],
      tooltip: 'Type of company for analysis context'
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'text' as const,
      required: true,
      tooltip: 'Industry sector'
    },
    {
      id: 'creditRating',
      label: 'Credit Rating',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'AAA', label: 'AAA' },
        { value: 'AA', label: 'AA' },
        { value: 'A', label: 'A' },
        { value: 'BBB', label: 'BBB' },
        { value: 'BB', label: 'BB' },
        { value: 'B', label: 'B' },
        { value: 'CCC', label: 'CCC' },
        { value: 'CC', label: 'CC' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' }
      ],
      tooltip: 'Current credit rating'
    }
  ],

  outputs: [
    {
      id: 'optimalDebtRatio',
      label: 'Optimal Debt Ratio',
      type: 'percentage' as const,
      explanation: 'Debt ratio that minimizes WACC'
    },
    {
      id: 'weightedAverageCostOfCapital',
      label: 'Weighted Average Cost of Capital (WACC)',
      type: 'percentage' as const,
      explanation: 'Current WACC based on capital structure'
    },
    {
      id: 'costOfEquity',
      label: 'Cost of Equity',
      type: 'percentage' as const,
      explanation: 'Calculated cost of equity using CAPM'
    },
    {
      id: 'costOfDebtAfterTax',
      label: 'Cost of Debt (After Tax)',
      type: 'percentage' as const,
      explanation: 'Cost of debt after tax shield benefit'
    },
    {
      id: 'enterpriseValue',
      label: 'Enterprise Value',
      type: 'currency' as const,
      explanation: 'Total value of the business'
    },
    {
      id: 'equityValue',
      label: 'Equity Value',
      type: 'currency' as const,
      explanation: 'Value of equity portion'
    },
    {
      id: 'debtValue',
      label: 'Debt Value',
      type: 'currency' as const,
      explanation: 'Value of debt portion'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [],

  calculate(inputs: CapitalStructureOptimizationInputs): CapitalStructureOptimizationOutputs {
    const validation = validateCapitalStructureOptimizationInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    return calculateCapitalStructureOptimization(inputs);
  },

  generateReport: (inputs: CapitalStructureOptimizationInputs, outputs: CapitalStructureOptimizationOutputs): string => {
    return `
# Capital Structure Optimization Report

## Executive Summary
This report analyzes the optimal capital structure for ${inputs.companyType} company in the ${inputs.industry} industry with a ${inputs.creditRating} credit rating.

## Key Findings
- **Optimal Debt Ratio**: ${(outputs.optimalDebtRatio * 100).toFixed(1)}%
- **Current WACC**: ${(outputs.weightedAverageCostOfCapital * 100).toFixed(2)}%
- **Cost of Equity**: ${(outputs.costOfEquity * 100).toFixed(2)}%
- **Cost of Debt (After Tax)**: ${(outputs.costOfDebtAfterTax * 100).toFixed(2)}%

## Capital Structure Analysis
- **Total Assets**: $${inputs.totalAssets.toLocaleString()}
- **Total Debt**: $${inputs.totalDebt.toLocaleString()}
- **Total Equity**: $${inputs.totalEquity.toLocaleString()}
- **Current Debt Ratio**: ${(inputs.currentDebtRatio * 100).toFixed(1)}%
- **Target Debt Ratio**: ${(inputs.targetDebtRatio * 100).toFixed(1)}%

## Valuation Metrics
- **Enterprise Value**: $${outputs.enterpriseValue.toLocaleString()}
- **Equity Value**: $${outputs.equityValue.toLocaleString()}
- **Debt Value**: $${outputs.debtValue.toLocaleString()}

## Market Assumptions
- **Risk-Free Rate**: ${(inputs.riskFreeRate * 100).toFixed(2)}%
- **Market Risk Premium**: ${(inputs.marketRiskPremium * 100).toFixed(2)}%
- **Beta**: ${inputs.beta.toFixed(2)}
- **Tax Rate**: ${(inputs.taxRate * 100).toFixed(1)}%

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Analysis Parameters
- **Analysis Period**: ${inputs.analysisPeriod} years
- **Inflation Rate**: ${(inputs.inflationRate * 100).toFixed(2)}%
- **Growth Rate**: ${(inputs.growthRate * 100).toFixed(2)}%

*This analysis is based on the trade-off theory of capital structure and DCF valuation. Actual optimal capital structure may vary based on specific company circumstances and market conditions.*
    `.trim();
  }
};