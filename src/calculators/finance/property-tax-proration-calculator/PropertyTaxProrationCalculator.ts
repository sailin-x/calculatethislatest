import { Calculator, Formula } from '../../../types/calculator';
import { calculatePropertyTax } from './formulas';
import { getPropertyTaxValidationRules } from './validation';

/**
 * Property tax proration formula implementation
 */
const propertyTaxFormula: Formula = {
  id: 'property-tax-proration',
  name: 'Property Tax Proration',
  description: 'Calculate property tax proration and related calculations',
  calculate: (inputs: Record<string, any>) => {
    const result = calculatePropertyTax(inputs);
    return {
      outputs: result,
      explanation: 'Property tax calculation completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading property tax proration calculator with comprehensive features
 */
export const propertyTaxProrationCalculator: Calculator = {
  id: 'property-tax-proration-calculator',
  title: 'Property Tax Proration Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate property tax proration for ownership changes, assess tax liability from assessed values, analyze appeal savings, and manage escrow accounts with industry-standard accuracy.',

  usageInstructions: [
    'Select the calculation type you need (Proration, From Assessed Value, Appeal Savings, etc.)',
    'Enter the required inputs for your selected calculation type',
    'Review the detailed breakdown and calculations',
    'Use the results for tax planning, escrow management, or property transactions'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'proration', label: 'Property Tax Proration' },
        { value: 'from_assessed_value', label: 'Tax from Assessed Value' },
        { value: 'appeal_savings', label: 'Tax Appeal Savings' },
        { value: 'escrow', label: 'Tax Escrow Analysis' },
        { value: 'assessment_change', label: 'Assessment Change Impact' },
        { value: 'tax_cap', label: 'Tax Cap Analysis' },
        { value: 'comprehensive', label: 'Comprehensive Analysis' }
      ],
      tooltip: 'Choose the type of property tax calculation you need',
      defaultValue: 'proration'
    },
    // Proration inputs
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      required: true,
      placeholder: '3000',
      tooltip: 'Total annual property tax amount',
      defaultValue: 3000
    },
    {
      id: 'salePrice',
      label: 'Sale Price',
      type: 'currency',
      required: true,
      placeholder: '250000',
      tooltip: 'Property sale price for proration calculations',
      defaultValue: 250000
    },
    {
      id: 'closingDate',
      label: 'Closing Date',
      type: 'date',
      required: true,
      tooltip: 'Date of property ownership transfer',
      defaultValue: '2024-06-15'
    },
    {
      id: 'taxYearStart',
      label: 'Tax Year Start',
      type: 'date',
      required: true,
      tooltip: 'Beginning date of the tax year',
      defaultValue: '2024-01-01'
    },
    {
      id: 'taxYearEnd',
      label: 'Tax Year End',
      type: 'date',
      required: true,
      tooltip: 'Ending date of the tax year',
      defaultValue: '2024-12-31'
    },
    {
      id: 'prorationMethod',
      label: 'Proration Method',
      type: 'select',
      required: true,
      options: [
        { value: '365_day', label: '365-Day Year' },
        { value: '366_day', label: '366-Day Year' },
        { value: 'actual_days', label: 'Actual Days' }
      ],
      tooltip: 'Method for calculating proration period',
      defaultValue: '365_day'
    },
    {
      id: 'sellerPaysTax',
      label: 'Seller Pays Tax',
      type: 'boolean',
      required: true,
      tooltip: 'Whether seller or buyer is responsible for property taxes',
      defaultValue: true
    },
    // Assessed value inputs
    {
      id: 'assessedValue',
      label: 'Assessed Value',
      type: 'currency',
      required: true,
      placeholder: '200000',
      tooltip: 'Property assessed value by tax authority',
      defaultValue: 200000
    },
    {
      id: 'millageRate',
      label: 'Millage Rate',
      type: 'number',
      required: true,
      placeholder: '25.0',
      tooltip: 'Property tax rate in mills (per $1000 of assessed value)',
      defaultValue: 25.0,
      step: 0.1
    },
    {
      id: 'exemptions',
      label: 'Tax Exemptions',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Total value of tax exemptions applied',
      defaultValue: 0
    },
    {
      id: 'specialAssessments',
      label: 'Special Assessments',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Additional special assessment taxes',
      defaultValue: 0
    },
    // Appeal savings inputs
    {
      id: 'currentAssessedValue',
      label: 'Current Assessed Value',
      type: 'currency',
      required: true,
      placeholder: '220000',
      tooltip: 'Current property assessed value',
      defaultValue: 220000
    },
    {
      id: 'appealedAssessedValue',
      label: 'Appealed Assessed Value',
      type: 'currency',
      required: true,
      placeholder: '200000',
      tooltip: 'Proposed assessed value after appeal',
      defaultValue: 200000
    },
    {
      id: 'appealCost',
      label: 'Appeal Cost',
      type: 'currency',
      required: false,
      placeholder: '1500',
      tooltip: 'Cost of filing the tax appeal',
      defaultValue: 1500
    },
    {
      id: 'successProbability',
      label: 'Success Probability (%)',
      type: 'percentage',
      required: false,
      placeholder: '70',
      tooltip: 'Probability of appeal success (0-100%)',
      defaultValue: 70
    },
    // Escrow inputs
    {
      id: 'escrowMonths',
      label: 'Escrow Months',
      type: 'number',
      required: true,
      placeholder: '12',
      tooltip: 'Number of months for escrow calculation',
      defaultValue: 12,
      min: 1,
      max: 24
    },
    {
      id: 'currentBalance',
      label: 'Current Escrow Balance',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Current amount in escrow account',
      defaultValue: 0
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Escrow Payment',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Current monthly escrow payment amount',
      defaultValue: 0
    },
    {
      id: 'cushionAmount',
      label: 'Escrow Cushion',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Additional cushion amount for escrow',
      defaultValue: 0
    },
    // Assessment change inputs
    {
      id: 'previousAssessedValue',
      label: 'Previous Assessed Value',
      type: 'currency',
      required: true,
      placeholder: '190000',
      tooltip: 'Previous year assessed value',
      defaultValue: 190000
    },
    {
      id: 'newAssessedValue',
      label: 'New Assessed Value',
      type: 'currency',
      required: true,
      placeholder: '210000',
      tooltip: 'Current year assessed value',
      defaultValue: 210000
    },
    {
      id: 'assessmentYear',
      label: 'Assessment Year',
      type: 'number',
      required: true,
      placeholder: '2024',
      tooltip: 'Tax assessment year',
      defaultValue: 2024
    },
    {
      id: 'homesteadExemption',
      label: 'Homestead Exemption',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Homestead exemption amount',
      defaultValue: 0
    },
    {
      id: 'portabilityAmount',
      label: 'Portability Amount',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Tax portability amount applied',
      defaultValue: 0
    },
    // Tax cap inputs
    {
      id: 'previousYearTax',
      label: 'Previous Year Tax',
      type: 'currency',
      required: true,
      placeholder: '2750',
      tooltip: 'Property tax amount from previous year',
      defaultValue: 2750
    },
    {
      id: 'taxCapPercentage',
      label: 'Tax Cap Percentage',
      type: 'percentage',
      required: true,
      placeholder: '10',
      tooltip: 'Maximum annual tax increase percentage',
      defaultValue: 10
    },
    {
      id: 'capType',
      label: 'Cap Type',
      type: 'select',
      required: true,
      options: [
        { value: 'hard_cap', label: 'Hard Cap (Strict Limit)' },
        { value: 'soft_cap', label: 'Soft Cap (Flexible)' },
        { value: 'no_cap', label: 'No Cap' }
      ],
      tooltip: 'Type of tax cap to apply',
      defaultValue: 'soft_cap'
    }
  ],

  outputs: [
    // Common outputs
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'text',
      explanation: 'Type of calculation performed'
    },
    // Proration outputs
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      explanation: 'Total annual property tax amount'
    },
    {
      id: 'daysOwnedBySeller',
      label: 'Days Owned by Seller',
      type: 'number',
      explanation: 'Number of days seller owned property during tax year'
    },
    {
      id: 'daysOwnedByBuyer',
      label: 'Days Owned by Buyer',
      type: 'number',
      explanation: 'Number of days buyer will own property during tax year'
    },
    {
      id: 'sellerTaxResponsibility',
      label: 'Seller Tax Responsibility',
      type: 'currency',
      explanation: 'Portion of property tax seller is responsible for'
    },
    {
      id: 'buyerTaxResponsibility',
      label: 'Buyer Tax Responsibility',
      type: 'currency',
      explanation: 'Portion of property tax buyer is responsible for'
    },
    // Assessed value outputs
    {
      id: 'assessedValue',
      label: 'Assessed Value',
      type: 'currency',
      explanation: 'Property assessed value'
    },
    {
      id: 'taxableValue',
      label: 'Taxable Value',
      type: 'currency',
      explanation: 'Value subject to taxation after exemptions'
    },
    {
      id: 'totalTaxAmount',
      label: 'Total Tax Amount',
      type: 'currency',
      explanation: 'Total property tax including special assessments'
    },
    // Appeal outputs
    {
      id: 'annualSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from successful appeal'
    },
    {
      id: 'netAnnualSavings',
      label: 'Net Annual Savings',
      type: 'currency',
      explanation: 'Annual savings after appeal costs'
    },
    {
      id: 'expectedValue',
      label: 'Expected Value',
      type: 'currency',
      explanation: 'Expected financial value of appeal'
    },
    // Escrow outputs
    {
      id: 'monthlyEscrowPayment',
      label: 'Monthly Escrow Payment',
      type: 'currency',
      explanation: 'Required monthly escrow payment'
    },
    {
      id: 'escrowShortage',
      label: 'Escrow Shortage',
      type: 'currency',
      explanation: 'Amount needed to bring escrow current'
    },
    {
      id: 'escrowSurplus',
      label: 'Escrow Surplus',
      type: 'currency',
      explanation: 'Excess amount in escrow account'
    },
    // Assessment change outputs
    {
      id: 'valueChange',
      label: 'Value Change',
      type: 'currency',
      explanation: 'Change in assessed value from previous year'
    },
    {
      id: 'taxChange',
      label: 'Tax Change',
      type: 'currency',
      explanation: 'Change in property tax amount'
    },
    // Tax cap outputs
    {
      id: 'calculatedTax',
      label: 'Calculated Tax',
      type: 'currency',
      explanation: 'Tax amount based on current assessment'
    },
    {
      id: 'cappedTax',
      label: 'Capped Tax Amount',
      type: 'currency',
      explanation: 'Tax amount after applying cap'
    },
    {
      id: 'capApplied',
      label: 'Cap Applied',
      type: 'text',
      explanation: 'Whether tax cap was applied'
    }
  ],

  formulas: [propertyTaxFormula],

  validationRules: getPropertyTaxValidationRules(),

  examples: [
    {
      title: 'Standard Property Tax Proration',
      description: 'Calculate tax proration for June 15th closing in a calendar year',
      inputs: {
        calculationType: 'proration',
        annualPropertyTax: 3600,
        salePrice: 300000,
        closingDate: '2024-06-15',
        taxYearStart: '2024-01-01',
        taxYearEnd: '2024-12-31',
        prorationMethod: '365_day',
        sellerPaysTax: true
      },
      expectedOutputs: {
        daysOwnedBySeller: 167,
        daysOwnedByBuyer: 199,
        sellerTaxResponsibility: 1655.89,
        buyerTaxResponsibility: 1944.11
      }
    },
    {
      title: 'Tax Appeal Savings Analysis',
      description: 'Evaluate potential savings from property tax appeal',
      inputs: {
        calculationType: 'appeal_savings',
        currentAssessedValue: 275000,
        appealedAssessedValue: 250000,
        millageRate: 22.5,
        appealCost: 2000,
        successProbability: 75
      },
      expectedOutputs: {
        annualSavings: 562.5,
        netAnnualSavings: 437.5,
        expectedValue: 327.19
      }
    },
    {
      title: 'Escrow Account Analysis',
      description: 'Check if escrow account has sufficient funds',
      inputs: {
        calculationType: 'escrow',
        annualPropertyTax: 4200,
        escrowMonths: 12,
        currentBalance: 3500,
        monthlyPayment: 350,
        cushionAmount: 200
      },
      expectedOutputs: {
        monthlyEscrowPayment: 383.33,
        escrowShortage: 0,
        escrowSurplus: 116.67
      }
    }
  ]
};