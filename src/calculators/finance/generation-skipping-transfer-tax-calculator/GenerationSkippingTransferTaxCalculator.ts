import { Calculator } from '../../../types/calculator';
import { calculateGSTTax } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const generationSkippingTransferTaxCalculator: Calculator = {
  id: 'generation-skipping-transfer-tax-calculator',
  title: 'Generation-Skipping Transfer (GST) Tax Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate generation-skipping transfer tax liability, optimize GST exemption usage, and plan tax-efficient multi-generational wealth transfers with comprehensive GST tax analysis.',

  usageInstructions: [
    'Enter the transfer amount and GST tax details',
    'Specify GST exemption amounts and usage',
    'Select transfer type and number of skip generations',
    'Review tax calculations and optimization strategies'
  ],

  inputs: [
    {
      id: 'transferAmount',
      label: 'Transfer Amount',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Total amount being transferred to skip generation',
      defaultValue: 1000000,
      min: 0,
      max: 100000000
    },
    {
      id: 'gstTaxRate',
      label: 'GST Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Federal GST tax rate (currently 40%)',
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'gstExemptionUsed',
      label: 'GST Exemption Used',
      type: 'currency',
      required: true,
      placeholder: '0',
      tooltip: 'Amount of GST exemption already used',
      defaultValue: 0,
      min: 0,
      max: 15000000
    },
    {
      id: 'gstExemptionLimit',
      label: 'GST Exemption Limit',
      type: 'currency',
      required: true,
      placeholder: '13800000',
      tooltip: 'Total GST exemption limit (2024: $13.8M)',
      defaultValue: 13800000,
      min: 0,
      max: 20000000
    },
    {
      id: 'numberOfSkipGenerations',
      label: 'Number of Skip Generations',
      type: 'number',
      required: true,
      placeholder: '1',
      tooltip: 'Number of generations being skipped',
      defaultValue: 1,
      min: 1,
      max: 10
    },
    {
      id: 'isDirectSkip',
      label: 'Direct Skip Transfer',
      type: 'boolean',
      required: false,
      tooltip: 'Is this a direct generation-skipping transfer?',
      defaultValue: true
    },
    {
      id: 'isTrustDistribution',
      label: 'Trust Distribution',
      type: 'boolean',
      required: false,
      tooltip: 'Is this transfer through a trust?',
      defaultValue: false
    },
    {
      id: 'includeStateTax',
      label: 'Include State Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Include state-level GST tax calculations',
      defaultValue: false
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'State GST tax rate',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate for projections',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'planningHorizon',
      label: 'Planning Horizon (Years)',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Years to project transfer growth',
      defaultValue: 30,
      min: 1,
      max: 100
    }
  ],

  outputs: [
    {
      id: 'taxableGSTAmount',
      label: 'Taxable GST Amount',
      type: 'currency',
      explanation: 'Amount subject to GST tax after exemption'
    },
    {
      id: 'gstTaxLiability',
      label: 'GST Tax Liability',
      type: 'currency',
      explanation: 'Total GST tax owed'
    },
    {
      id: 'effectiveGSTTaxRate',
      label: 'Effective GST Tax Rate',
      type: 'percentage',
      explanation: 'Overall GST tax rate on the transfer'
    },
    {
      id: 'remainingGSTExemption',
      label: 'Remaining GST Exemption',
      type: 'currency',
      explanation: 'Unused portion of GST exemption'
    },
    {
      id: 'totalGSTTaxSavings',
      label: 'Total GST Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from GST exemption usage'
    },
    {
      id: 'projectedFutureValue',
      label: 'Projected Future Value',
      type: 'currency',
      explanation: 'Future value of transfer after growth'
    },
    {
      id: 'optimalTransferStrategy',
      label: 'Optimal Transfer Strategy',
      type: 'text',
      explanation: 'Recommended GST transfer strategy'
    },
    {
      id: 'stateTaxLiability',
      label: 'State Tax Liability',
      type: 'currency',
      explanation: 'State-level GST tax liability'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability',
      type: 'currency',
      explanation: 'Combined federal and state GST tax'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('transferAmount', 'Transfer amount is required'),
    ValidationRuleFactory.required('gstTaxRate', 'GST tax rate is required'),
    ValidationRuleFactory.required('gstExemptionLimit', 'GST exemption limit is required'),
    ValidationRuleFactory.required('numberOfSkipGenerations', 'Number of skip generations is required'),
    ValidationRuleFactory.range('transferAmount', 0, 100000000, 'Transfer amount must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('gstTaxRate', 0, 100, 'GST tax rate must be between 0% and 100%'),
    ValidationRuleFactory.range('gstExemptionUsed', 0, 20000000, 'GST exemption used must be between $0 and $20,000,000'),
    ValidationRuleFactory.range('gstExemptionLimit', 0, 20000000, 'GST exemption limit must be between $0 and $20,000,000'),
    ValidationRuleFactory.range('numberOfSkipGenerations', 1, 10, 'Number of skip generations must be between 1 and 10'),
    ValidationRuleFactory.businessRule(
      'gstExemptionUsed',
      (gstExemptionUsed, allInputs) => {
        if (!allInputs?.gstExemptionLimit) return true;
        return gstExemptionUsed <= allInputs.gstExemptionLimit;
      },
      'GST exemption used cannot exceed GST exemption limit'
    ),
    ValidationRuleFactory.businessRule(
      'planningHorizon',
      (planningHorizon) => {
        if (planningHorizon === undefined || planningHorizon === null) return true;
        return planningHorizon >= 0 && planningHorizon <= 100;
      },
      'Planning horizon must be between 0 and 100 years'
    ),
    ValidationRuleFactory.businessRule(
      'inflationRate',
      (inflationRate) => {
        if (inflationRate === undefined || inflationRate === null) return true;
        return inflationRate >= -10 && inflationRate <= 25;
      },
      'Inflation rate must be between -10% and 25%'
    )
  ],

  examples: [
    {
      title: 'Basic GST Transfer',
      description: 'Simple generation-skipping transfer using GST exemption',
      inputs: {
        transferAmount: 2000000,
        gstTaxRate: 40,
        gstExemptionUsed: 0,
        gstExemptionLimit: 13800000,
        numberOfSkipGenerations: 1,
        isDirectSkip: true,
        isTrustDistribution: false,
        includeStateTax: false,
        stateTaxRate: 5,
        inflationRate: 2.5,
        planningHorizon: 30
      },
      expectedOutputs: {
        taxableGSTAmount: 620000,
        gstTaxLiability: 248000,
        effectiveGSTTaxRate: 12.4,
        remainingGSTExemption: 11800000,
        totalGSTTaxSavings: 752000,
        projectedFutureValue: 5520000,
        optimalTransferStrategy: 'Direct generation-skipping transfer',
        stateTaxLiability: 0,
        totalTaxLiability: 248000
      }
    },
    {
      title: 'Trust-Based GST Transfer',
      description: 'GST transfer through a trust structure',
      inputs: {
        transferAmount: 5000000,
        gstTaxRate: 40,
        gstExemptionUsed: 2000000,
        gstExemptionLimit: 13800000,
        numberOfSkipGenerations: 2,
        isDirectSkip: false,
        isTrustDistribution: true,
        includeStateTax: true,
        stateTaxRate: 5,
        inflationRate: 2.5,
        planningHorizon: 40
      },
      expectedOutputs: {
        taxableGSTAmount: 3620000,
        gstTaxLiability: 1448000,
        effectiveGSTTaxRate: 28.96,
        remainingGSTExemption: 11800000,
        totalGSTTaxSavings: 1104000,
        projectedFutureValue: 16500000,
        optimalTransferStrategy: 'Trust-based generation-skipping transfer',
        stateTaxLiability: 72400,
        totalTaxLiability: 1520400
      }
    }
  ]
};