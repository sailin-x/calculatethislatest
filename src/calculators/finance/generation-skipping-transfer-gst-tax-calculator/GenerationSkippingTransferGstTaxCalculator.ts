import { Calculator } from '../../types/calculator';
import { GenerationSkippingTransferGstTaxCalculatorInputs, GenerationSkippingTransferGstTaxCalculatorOutputs } from './types';
import {
  calculateGstTaxDue,
  calculateAfterTaxTransferAmount,
  calculateTaxSavingsFromExemption,
  calculateEffectiveTaxRate,
  calculateRemainingGstExemption,
  generateGstTaxAnalysis
} from './formulas';
import { validateGenerationSkippingTransferGstTaxCalculatorInputs } from './validation';

export const GenerationSkippingTransferGstTaxCalculator: Calculator = {
  id: 'generation-skipping-transfer-gst-tax-calculator',
  title: 'Generation-Skipping Transfer (GST) Tax Calculator',
  category: 'finance',
  subcategory: 'Tax Planning',
  description: 'Calculate GST tax liability on transfers to grandchildren and remote descendants, including exemption utilization and tax planning strategies.',
  usageInstructions: [
    'Enter the transfer amount to the skip person',
    'Specify relationship to donor (grandchild, great-grandchild, etc.)',
    'Input GST exemption already used in prior transfers',
    'Set applicable GST tax rate (default 40%)',
    'Review tax calculations and planning recommendations'
  ],

  inputs: [
    {
      id: 'transferAmount',
      label: 'Transfer Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount being transferred to the skip person'
    },
    {
      id: 'relationship',
      label: 'Relationship to Donor',
      type: 'select',
      required: true,
      options: [
        { value: 'grandchild', label: 'Grandchild' },
        { value: 'great-grandchild', label: 'Great-Grandchild' },
        { value: 'great-great-grandchild', label: 'Great-Great-Grandchild' },
        { value: 'other-descendant', label: 'Other Descendant' }
      ],
      tooltip: 'Relationship of recipient to the donor'
    },
    {
      id: 'gstExemptionUsed',
      label: 'GST Exemption Already Used ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Portion of GST exemption used in prior transfers'
    },
    {
      id: 'gstTaxRate',
      label: 'GST Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      defaultValue: 40,
      tooltip: 'Applicable GST tax rate (currently 40%)'
    },
    {
      id: 'isDirectSkip',
      label: 'Direct Skip Transfer',
      type: 'boolean',
      required: false,
      tooltip: 'Whether this is a direct transfer (immediately taxable)'
    },
    {
      id: 'isTrustDistribution',
      label: 'Trust Distribution',
      type: 'boolean',
      required: false,
      tooltip: 'Whether this transfer is from a trust'
    }
  ],

  outputs: [
    {
      id: 'gstTaxDue',
      label: 'GST Tax Due',
      type: 'currency',
      explanation: 'Total GST tax liability on the transfer'
    },
    {
      id: 'remainingGstExemption',
      label: 'Remaining GST Exemption',
      type: 'currency',
      explanation: 'GST exemption remaining after this transfer'
    },
    {
      id: 'afterTaxTransferAmount',
      label: 'After-Tax Transfer Amount',
      type: 'currency',
      explanation: 'Net amount received by beneficiary after GST tax'
    },
    {
      id: 'taxSavingsFromExemption',
      label: 'Tax Savings from Exemption',
      type: 'currency',
      explanation: 'Tax savings achieved by using GST exemption'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective GST Tax Rate',
      type: 'percentage',
      explanation: 'Effective tax rate after exemption allocation'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Tax-Free Grandchild Transfer',
      description: 'Transfer within GST exemption limits to grandchild',
      inputs: {
        transferAmount: 5000000,
        relationship: 'grandchild',
        gstExemptionUsed: 0,
        gstTaxRate: 40,
        isDirectSkip: false,
        isTrustDistribution: false
      },
      expectedOutputs: {
        gstTaxDue: 0,
        remainingGstExemption: 8610000,
        afterTaxTransferAmount: 5000000,
        taxSavingsFromExemption: 2000000,
        effectiveTaxRate: 0
      }
    },
    {
      title: 'Partial Exemption Transfer',
      description: 'Transfer exceeding available exemption',
      inputs: {
        transferAmount: 15000000,
        relationship: 'grandchild',
        gstExemptionUsed: 3000000,
        gstTaxRate: 40,
        isDirectSkip: false,
        isTrustDistribution: false
      },
      expectedOutputs: {
        gstTaxDue: 680000,
        remainingGstExemption: 0,
        afterTaxTransferAmount: 14320000,
        taxSavingsFromExemption: 5440000,
        effectiveTaxRate: 4.53
      }
    },
    {
      title: 'Direct Skip Transfer',
      description: 'Direct transfer that is immediately taxable',
      inputs: {
        transferAmount: 2000000,
        relationship: 'grandchild',
        gstExemptionUsed: 13610000,
        gstTaxRate: 40,
        isDirectSkip: true,
        isTrustDistribution: false
      },
      expectedOutputs: {
        gstTaxDue: 800000,
        remainingGstExemption: 0,
        afterTaxTransferAmount: 1200000,
        taxSavingsFromExemption: 0,
        effectiveTaxRate: 40
      }
    }
  ]
};