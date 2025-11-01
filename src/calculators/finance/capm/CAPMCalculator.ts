import { Calculator } from '../../../types/calculator';
import { CAPMInputs, CAPMOutputs } from './types';
import { calculateCAPM } from './formulas';
import { validateCAPMInputs } from './validation';

export const CAPMCalculator: Calculator & {
  calculate: (inputs: CAPMInputs) => CAPMOutputs;
  generateReport: (inputs: CAPMInputs, outputs: CAPMOutputs) => string;
} = {
  id: 'capm',
  title: 'CAPM Calculator',
  name: 'CAPM Calculator',
  category: 'finance',
  subcategory: 'asset-pricing',
  description: 'Calculate expected return using Capital Asset Pricing Model (CAPM) with beta analysis and sensitivity testing.',
  usageInstructions: [
    'Enter risk-free rate and market risk premium',
    'Input company beta and optional leverage factors',
    'Review cost of equity and expected return calculations',
    'Analyze beta adjustments and sensitivity scenarios',
    'Generate comprehensive CAPM analysis report'
  ],

  inputs: [
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Return on risk-free investment (e.g., 10-year Treasury bond)'
    },
    {
      id: 'marketRiskPremium',
      label: 'Market Risk Premium (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Expected market return minus risk-free rate'
    },
    {
      id: 'beta',
      label: 'Beta (β)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Measure of systematic risk relative to market'
    },
    {
      id: 'companyName',
      label: 'Company Name',
      type: 'text' as const,
      required: false,
      tooltip: 'Name of the company for analysis'
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'text' as const,
      required: false,
      tooltip: 'Industry sector for context'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number' as const,
      required: false,
      min: 1,
      max: 50,
      tooltip: 'Time horizon for analysis'
    },
    {
      id: 'historicalBeta',
      label: 'Historical Beta',
      type: 'number' as const,
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Raw beta from historical data'
    },
    {
      id: 'adjustedBeta',
      label: 'Apply Beta Adjustment',
      type: 'boolean' as const,
      required: false,
      tooltip: 'Adjust beta towards 1.0 using Blume method'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage' as const,
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Corporate tax rate for leverage adjustments'
    },
    {
      id: 'debtRatio',
      label: 'Debt Ratio (%)',
      type: 'percentage' as const,
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Debt-to-total capital ratio'
    }
  ],

  outputs: [
    {
      id: 'costOfEquity',
      label: 'Cost of Equity',
      type: 'percentage' as const,
      explanation: 'Required return on equity using CAPM'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return',
      type: 'percentage' as const,
      explanation: 'Expected return based on CAPM formula'
    },
    {
      id: 'riskPremium',
      label: 'Risk Premium',
      type: 'percentage' as const,
      explanation: 'Additional return required for systematic risk'
    },
    {
      id: 'systematicRisk',
      label: 'Systematic Risk (Beta)',
      type: 'number' as const,
      explanation: 'Beta coefficient measuring market risk'
    },
    {
      id: 'totalRisk',
      label: 'Total Risk',
      type: 'number' as const,
      explanation: 'Combined systematic and unsystematic risk'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [],

  calculate(inputs: CAPMInputs): CAPMOutputs {
    const validation = validateCAPMInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    return calculateCAPM(inputs);
  },

  generateReport: (inputs: CAPMInputs, outputs: CAPMOutputs): string => {
    const companyInfo = inputs.companyName ? ` for ${inputs.companyName}` : '';
    const industryInfo = inputs.industry ? ` in the ${inputs.industry} industry` : '';

    return `
# CAPM Analysis Report${companyInfo}${industryInfo}

## Executive Summary
This report provides a comprehensive Capital Asset Pricing Model (CAPM) analysis to determine the expected return and cost of equity for the investment.

## Key Findings
- **Cost of Equity**: ${(outputs.costOfEquity * 100).toFixed(2)}%
- **Expected Return**: ${(outputs.expectedReturn * 100).toFixed(2)}%
- **Risk Premium**: ${(outputs.riskPremium * 100).toFixed(2)}%
- **Beta**: ${outputs.systematicRisk.toFixed(3)}
- **Total Risk**: ${outputs.totalRisk.toFixed(3)}

## CAPM Formula
**E(Ri) = Rf + βi × (E(Rm) - Rf)**

Where:
- E(Ri) = Expected return on asset i
- Rf = Risk-free rate = ${(inputs.riskFreeRate * 100).toFixed(2)}%
- βi = Beta = ${inputs.beta.toFixed(3)}
- E(Rm) - Rf = Market risk premium = ${(inputs.marketRiskPremium * 100).toFixed(2)}%

## Calculation Breakdown
- **Risk-Free Component**: ${(inputs.riskFreeRate * 100).toFixed(2)}%
- **Risk Premium Component**: ${(outputs.riskPremium * 100).toFixed(2)}%
- **Total Expected Return**: ${(outputs.expectedReturn * 100).toFixed(2)}%

## Beta Analysis
${inputs.adjustedBeta && inputs.historicalBeta ? `- **Historical Beta**: ${inputs.historicalBeta.toFixed(3)}
- **Adjusted Beta**: ${outputs.betaAnalysis.adjustedBeta.toFixed(3)}` : `- **Beta**: ${inputs.beta.toFixed(3)}`}

${inputs.debtRatio && inputs.taxRate ? `- **Unlevered Beta**: ${outputs.betaAnalysis.unleveredBeta.toFixed(3)}
- **Levered Beta**: ${outputs.betaAnalysis.leveredBeta.toFixed(3)}` : ''}

## Risk Assessment
- **Systematic Risk**: ${outputs.systematicRisk > 1 ? 'High' : outputs.systematicRisk < 1 ? 'Low' : 'Market'}
- **Risk Level**: ${outputs.systematicRisk > 1.5 ? 'Aggressive' : outputs.systematicRisk < 0.5 ? 'Defensive' : 'Moderate'}

## Recommendations
${outputs.recommendations.map(rec => `- ${rec}`).join('\n')}

## Market Assumptions
- **Risk-Free Rate**: ${(inputs.riskFreeRate * 100).toFixed(2)}%
- **Market Risk Premium**: ${(inputs.marketRiskPremium * 100).toFixed(2)}%
${inputs.analysisPeriod ? `- **Analysis Period**: ${inputs.analysisPeriod} years` : ''}

*CAPM provides an estimate of expected returns based on systematic risk. Actual returns may vary due to unsystematic risk and market conditions.*
    `.trim();
  }
};