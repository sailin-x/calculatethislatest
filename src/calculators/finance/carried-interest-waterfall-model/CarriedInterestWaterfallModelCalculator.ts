import { Calculator } from '../../../types/calculator';
import { CarriedInterestWaterfallModelInputs, CarriedInterestWaterfallModelOutputs } from './types';
import { calculateCarriedInterestWaterfallModel } from './formulas';
import { validateCarriedInterestWaterfallModelInputs } from './validation';

export const CarriedInterestWaterfallModelCalculator: Calculator & {
  calculate: (inputs: CarriedInterestWaterfallModelInputs) => CarriedInterestWaterfallModelOutputs;
  generateReport: (inputs: CarriedInterestWaterfallModelInputs, outputs: CarriedInterestWaterfallModelOutputs) => string;
} = {
  id: 'carried-interest-waterfall-model',
  title: 'Carried Interest Waterfall Model Calculator',
  name: 'Carried Interest Waterfall Model Calculator',
  category: 'finance',
  subcategory: 'private-equity',
  description: 'Calculate carried interest distributions using waterfall model with preferred returns, catch-up provisions, and clawback calculations.',
  usageInstructions: [
    'Enter fund parameters and carried interest terms',
    'Specify hurdle rate and catch-up provisions',
    'Review waterfall distribution tiers',
    'Analyze GP and LP profit splits',
    'Generate comprehensive carried interest report'
  ],

  inputs: [
    {
      id: 'totalCapital',
      label: 'Total Capital ($)',
      type: 'currency' as const,
      required: true,
      min: 1000000,
      max: 10000000000,
      tooltip: 'Total committed capital for the fund'
    },
    {
      id: 'managementFee',
      label: 'Management Fee (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Annual management fee percentage'
    },
    {
      id: 'carriedInterest',
      label: 'Carried Interest (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      tooltip: 'GP profit share percentage'
    },
    {
      id: 'hurdleRate',
      label: 'Hurdle Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 30,
      step: 0.01,
      tooltip: 'Minimum return threshold for carried interest'
    },
    {
      id: 'catchUpPercentage',
      label: 'Catch-Up Percentage (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 100,
      step: 0.01,
      tooltip: 'GP catch-up share after hurdle is met'
    },
    {
      id: 'investmentPeriod',
      label: 'Investment Period (years)',
      type: 'number' as const,
      required: true,
      min: 1,
      max: 20,
      tooltip: 'Length of investment period'
    },
    {
      id: 'totalReturn',
      label: 'Total Return ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 10000000000,
      tooltip: 'Total fund return at end of period'
    },
    {
      id: 'preferredReturn',
      label: 'Preferred Return (%)',
      type: 'percentage' as const,
      required: true,
      min: 0,
      max: 30,
      step: 0.01,
      tooltip: 'LP preferred annual return'
    },
    {
      id: 'distributionWaterfall',
      label: 'Distribution Waterfall',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'american', label: 'American Waterfall' },
        { value: 'european', label: 'European Waterfall' }
      ],
      tooltip: 'Type of distribution waterfall structure'
    },
    {
      id: 'clawbackProvision',
      label: 'Clawback Provision',
      type: 'boolean' as const,
      required: false,
      tooltip: 'Whether clawback provisions are included'
    },
    {
      id: 'gpCommitment',
      label: 'GP Commitment ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 10000000000,
      tooltip: 'General partner capital commitment'
    },
    {
      id: 'lpCommitment',
      label: 'LP Commitment ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 10000000000,
      tooltip: 'Limited partner capital commitment'
    }
  ],

  outputs: [
    {
      id: 'managementFeesPaid',
      label: 'Management Fees Paid',
      type: 'currency' as const,
      explanation: 'Total management fees paid to GP'
    },
    {
      id: 'preferredReturnPaid',
      label: 'Preferred Return Paid',
      type: 'currency' as const,
      explanation: 'Total preferred return paid to LPs'
    },
    {
      id: 'carriedInterestEarned',
      label: 'Carried Interest Earned',
      type: 'currency' as const,
      explanation: 'Total carried interest earned by GP'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return (IRR)',
      type: 'percentage' as const,
      explanation: 'Fund internal rate of return'
    },
    {
      id: 'multipleOfInvestedCapital',
      label: 'Multiple of Invested Capital',
      type: 'number' as const,
      explanation: 'Total return as multiple of invested capital'
    },
    {
      id: 'netToGp',
      label: 'Net to GP',
      type: 'currency' as const,
      explanation: 'Net amount received by GP after fees'
    },
    {
      id: 'clawbackAmount',
      label: 'Clawback Amount',
      type: 'currency' as const,
      explanation: 'Amount subject to clawback provisions'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [],

  calculate(inputs: CarriedInterestWaterfallModelInputs): CarriedInterestWaterfallModelOutputs {
    const validation = validateCarriedInterestWaterfallModelInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    return calculateCarriedInterestWaterfallModel(inputs);
  },

  generateReport: (inputs: CarriedInterestWaterfallModelInputs, outputs: CarriedInterestWaterfallModelOutputs): string => {
    return `
# Carried Interest Waterfall Model Report

## Executive Summary
This report analyzes the carried interest distribution for a private equity fund using a ${inputs.distributionWaterfall} waterfall structure.

## Fund Parameters
- **Total Capital**: $${inputs.totalCapital.toLocaleString()}
- **Investment Period**: ${inputs.investmentPeriod} years
- **Management Fee**: ${(inputs.managementFee * 100).toFixed(2)}%
- **Carried Interest**: ${(inputs.carriedInterest * 100).toFixed(1)}%
- **Hurdle Rate**: ${(inputs.hurdleRate * 100).toFixed(1)}%
- **Preferred Return**: ${(inputs.preferredReturn * 100).toFixed(1)}%

## Distribution Waterfall Tiers
- **Tier 1 (Return of Capital)**: $${outputs.waterfallTiers.tier1.toLocaleString()}
- **Tier 2 (Preferred Return)**: $${outputs.waterfallTiers.tier2.toLocaleString()}
- **Tier 3 (Catch-up)**: $${outputs.waterfallTiers.tier3.toLocaleString()}
- **Tier 4 (Carried Interest Split)**: $${outputs.waterfallTiers.tier4.toLocaleString()}

## Financial Results
- **Total Return**: $${inputs.totalReturn.toLocaleString()}
- **Multiple of Invested Capital**: ${outputs.multipleOfInvestedCapital.toFixed(2)}x
- **IRR**: ${(outputs.irr * 100).toFixed(2)}%

## GP Compensation
- **Management Fees Paid**: $${outputs.managementFeesPaid.toLocaleString()}
- **Carried Interest Earned**: $${outputs.carriedInterestEarned.toLocaleString()}
- **Net to GP**: $${outputs.netToGp.toLocaleString()}

## LP Returns
- **Preferred Return Paid**: $${outputs.preferredReturnPaid.toLocaleString()}
- **LP Profit Share**: $${outputs.lpProfitShare.toLocaleString()}

## Distributions Summary
- **Total LP Distributions**: $${outputs.totalDistributions.lp.toLocaleString()}
- **Total GP Distributions**: $${outputs.totalDistributions.gp.toLocaleString()}

## Risk Provisions
${inputs.clawbackProvision ? `- **Clawback Amount**: $${outputs.clawbackAmount.toLocaleString()}` : '- No clawback provisions included'}

## Commitments
- **GP Commitment**: $${inputs.gpCommitment.toLocaleString()}
- **LP Commitment**: $${inputs.lpCommitment.toLocaleString()}

*This analysis is based on the specified waterfall structure and assumes all distributions occur at the end of the investment period. Actual distributions may vary based on specific fund terms and timing.*
    `.trim();
  }
};