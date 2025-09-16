import { Calculator } from '../../../types/calculator';
import { calculateGenerationSkippingTransferTax } from './formulas';
import { getGstValidationRules } from './validation';

/**
 * Industry-leading Generation-Skipping Transfer (GST) Tax Calculator
 */
export const generationSkippingTransferGstTaxCalculator: Calculator = {
  id: 'generation-skipping-transfer-gst-tax-calculator',
  title: 'Generation-Skipping Transfer (GST) Tax Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive GST tax calculation for transfers to grandchildren and remote descendants with exemption optimization, planning strategies, and wealth transfer recommendations with industry-standard accuracy.',

  usageInstructions: [
    'Enter the transfer amount and GST tax details',
    'Specify exemption amounts and annual exclusions',
    'Select transfer type and planning parameters',
    'Review tax calculations and planning recommendations'
  ],

  inputs: [
    {
      id: 'transferAmount',
      label: 'Transfer Amount',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Total amount being transferred to skip beneficiaries',
      defaultValue: 1000000,
      min: 1000,
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
      id: 'annualExclusionAmount',
      label: 'Annual Exclusion Amount',
      type: 'currency',
      required: true,
      placeholder: '18000',
      tooltip: 'Annual gift tax exclusion per beneficiary',
      defaultValue: 18000,
      min: 0,
      max: 50000
    },
    {
      id: 'gstExemptionAmount',
      label: 'GST Exemption Amount',
      type: 'currency',
      required: true,
      placeholder: '13800000',
      tooltip: 'Total GST exemption available',
      defaultValue: 13800000,
      min: 0,
      max: 15000000
    },
    {
      id: 'gstExemptionUsed',
      label: 'GST Exemption Used',
      type: 'currency',
      required: true,
      placeholder: '0',
      tooltip: 'Portion of GST exemption already utilized',
      defaultValue: 0,
      min: 0,
      max: 15000000
    },
    {
      id: 'numberOfSkipBeneficiaries',
      label: 'Number of Skip Beneficiaries',
      type: 'number',
      required: true,
      placeholder: '2',
      tooltip: 'Number of grandchildren or remote descendants',
      defaultValue: 2,
      min: 1,
      max: 50
    },
    {
      id: 'transferType',
      label: 'Transfer Type',
      type: 'select',
      required: true,
      options: [
        { value: 'direct', label: 'Direct Transfer' },
        { value: 'trust', label: 'GST Trust' },
        { value: 'life-insurance', label: 'Life Insurance Trust' },
        { value: 'other', label: 'Other Structure' }
      ],
      tooltip: 'Type of transfer structure used',
      defaultValue: 'trust'
    },
    {
      id: 'includeStateGstTax',
      label: 'Include State GST Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include state GST tax calculations',
      defaultValue: false
    },
    {
      id: 'stateGstTaxRate',
      label: 'State GST Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '16',
      tooltip: 'State GST tax rate (if applicable)',
      defaultValue: 16,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'inflationAdjustment',
      label: 'Inflation Adjustment (%)',
      type: 'percentage',
      required: true,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate for projections',
      defaultValue: 2.5,
      min: -5,
      max: 10,
      step: 0.5
    },
    {
      id: 'planningHorizon',
      label: 'Planning Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Time horizon for wealth transfer planning',
      defaultValue: 30,
      min: 0,
      max: 100
    },
    {
      id: 'expectedGrowthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Expected annual growth rate of transferred assets',
      defaultValue: 6,
      min: -10,
      max: 20,
      step: 0.5
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '5',
      tooltip: 'Rate used to calculate present value of future tax liability',
      defaultValue: 5,
      min: 0,
      max: 15,
      step: 0.5
    }
  ],

  outputs: [
    {
      id: 'gstTaxableAmount',
      label: 'GST Taxable Amount',
      type: 'currency',
      explanation: 'Amount subject to GST tax after exemptions'
    },
    {
      id: 'gstTaxLiability',
      label: 'GST Tax Liability',
      type: 'currency',
      explanation: 'Total GST tax owed on the transfer'
    },
    {
      id: 'gstExemptionRemaining',
      label: 'GST Exemption Remaining',
      type: 'currency',
      explanation: 'Unused portion of GST exemption'
    },
    {
      id: 'gstTaxSavings',
      label: 'GST Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from GST exemption utilization'
    },
    {
      id: 'effectiveGstTaxRate',
      label: 'Effective GST Tax Rate',
      type: 'percentage',
      explanation: 'Overall tax rate on the transfer amount'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability',
      type: 'currency',
      explanation: 'Combined federal and state GST tax liability'
    },
    {
      id: 'afterTaxTransferValue',
      label: 'After-Tax Transfer Value',
      type: 'currency',
      explanation: 'Net amount received by beneficiaries after taxes'
    },
    {
      id: 'gstTaxPerBeneficiary',
      label: 'GST Tax Per Beneficiary',
      type: 'currency',
      explanation: 'Average GST tax per skip beneficiary'
    },
    {
      id: 'presentValueOfTaxLiability',
      label: 'Present Value of Tax Liability',
      type: 'currency',
      explanation: 'Current value of future GST tax payments'
    },
    {
      id: 'breakEvenAnalysis',
      label: 'Break-Even Analysis',
      type: 'currency',
      explanation: 'Transfer amount needed to fully utilize GST exemption'
    },
    {
      id: 'optimalTransferAmount',
      label: 'Optimal Transfer Amount',
      type: 'currency',
      explanation: 'Recommended transfer amount for tax efficiency'
    },
    {
      id: 'taxEfficiencyScore',
      label: 'Tax Efficiency Score',
      type: 'number',
      explanation: 'Overall tax efficiency rating (0-100)'
    },
    {
      id: 'planningRecommendations',
      label: 'Planning Recommendations',
      type: 'text',
      explanation: 'Strategic recommendations for GST tax planning'
    }
  ],

  formulas: [],

  validationRules: getGstValidationRules(),

  examples: [
    {
      title: 'High-Value GST Trust Transfer',
      description: 'Multi-million dollar transfer to grandchildren using GST trust',
      inputs: {
        transferAmount: 5000000,
        gstTaxRate: 40,
        annualExclusionAmount: 18000,
        gstExemptionAmount: 13800000,
        gstExemptionUsed: 2000000,
        numberOfSkipBeneficiaries: 3,
        transferType: 'trust',
        includeStateGstTax: true,
        stateGstTaxRate: 16,
        inflationAdjustment: 2.5,
        planningHorizon: 30,
        expectedGrowthRate: 7,
        discountRate: 5
      },
      expectedOutputs: {
        gstTaxableAmount: 3200000,
        gstTaxLiability: 1280000,
        gstExemptionRemaining: 11800000,
        gstTaxSavings: 1800000,
        effectiveGstTaxRate: 25.6,
        totalTaxLiability: 1280000,
        afterTaxTransferValue: 3720000,
        gstTaxPerBeneficiary: 426666.67,
        presentValueOfTaxLiability: 1280000,
        breakEvenAnalysis: 11800000,
        optimalTransferAmount: 12000000,
        taxEfficiencyScore: 74.4
      }
    }
  ]
};