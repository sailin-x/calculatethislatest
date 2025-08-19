import { Calculator } from '../../types/Calculator';
import { calculatePropertyTax } from './formulas';
import { validatePropertyTaxInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const propertyTaxCalculator: Calculator = {
  id: 'property-tax',
  title: 'Property Tax Calculator',
  category: 'finance',
  subcategory: 'tax',
  description: 'Calculate property taxes, exemptions, and payment schedules for residential and commercial properties',
  usageInstructions: 'Enter property details, tax rates, and exemptions to calculate annual property taxes, monthly payments, and tax savings from exemptions.',
  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current assessed or market value of the property',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      id: 'assessedValue',
      label: 'Assessed Value',
      type: 'currency',
      required: false,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Tax-assessed value (if different from property value)',
      placeholder: '450000',
      defaultValue: 450000
    },
    {
      id: 'taxRate',
      label: 'Property Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 10,
      step: 0.01,
      tooltip: 'Annual property tax rate as a percentage',
      placeholder: '1.2',
      defaultValue: 1.2
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'agricultural', label: 'Agricultural' },
        { value: 'vacant_land', label: 'Vacant Land' }
      ],
      tooltip: 'Type of property for tax classification',
      defaultValue: 'residential'
    },
    {
      id: 'homesteadExemption',
      label: 'Homestead Exemption',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Homestead exemption amount (if applicable)',
      placeholder: '50000',
      defaultValue: 50000
    },
    {
      id: 'seniorExemption',
      label: 'Senior Citizen Exemption',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Senior citizen exemption amount (if applicable)',
      placeholder: '25000',
      defaultValue: 0
    },
    {
      id: 'veteranExemption',
      label: 'Veteran Exemption',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Veteran exemption amount (if applicable)',
      placeholder: '10000',
      defaultValue: 0
    },
    {
      id: 'disabilityExemption',
      label: 'Disability Exemption',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Disability exemption amount (if applicable)',
      placeholder: '15000',
      defaultValue: 0
    },
    {
      id: 'greenEnergyExemption',
      label: 'Green Energy Exemption',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Green energy/solar exemption amount (if applicable)',
      placeholder: '20000',
      defaultValue: 0
    },
    {
      id: 'assessmentRatio',
      label: 'Assessment Ratio (%)',
      type: 'percentage',
      required: false,
      min: 10,
      max: 100,
      step: 1,
      tooltip: 'Ratio of assessed value to market value (default: 100%)',
      placeholder: '100',
      defaultValue: 100
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often property taxes are paid',
      defaultValue: 'annual'
    },
    {
      id: 'escrowIncluded',
      label: 'Include in Escrow',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      tooltip: 'Whether property taxes are paid through escrow account',
      defaultValue: 'yes'
    },
    {
      id: 'latePaymentPenalty',
      label: 'Late Payment Penalty (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 25,
      step: 0.5,
      tooltip: 'Penalty for late payment (if applicable)',
      placeholder: '5',
      defaultValue: 5
    },
    {
      id: 'earlyPaymentDiscount',
      label: 'Early Payment Discount (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.5,
      tooltip: 'Discount for early payment (if applicable)',
      placeholder: '2',
      defaultValue: 0
    },
    {
      id: 'specialAssessments',
      label: 'Special Assessments',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Additional special assessments or fees',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      required: false,
      min: 2020,
      max: 2030,
      step: 1,
      tooltip: 'Tax year for calculations',
      placeholder: '2024',
      defaultValue: 2024
    }
  ],
  outputs: [
    {
      id: 'taxableValue',
      label: 'Taxable Value',
      type: 'currency',
      format: 'USD',
      explanation: 'Property value after all exemptions applied'
    },
    {
      id: 'annualTaxAmount',
      label: 'Annual Property Tax',
      type: 'currency',
      format: 'USD',
      explanation: 'Total annual property tax amount'
    },
    {
      id: 'monthlyTaxPayment',
      label: 'Monthly Tax Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly property tax payment amount'
    },
    {
      id: 'quarterlyTaxPayment',
      label: 'Quarterly Tax Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Quarterly property tax payment amount'
    },
    {
      id: 'semiAnnualTaxPayment',
      label: 'Semi-Annual Tax Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Semi-annual property tax payment amount'
    },
    {
      id: 'totalExemptions',
      label: 'Total Exemptions',
      type: 'currency',
      format: 'USD',
      explanation: 'Sum of all applicable exemptions'
    },
    {
      id: 'exemptionSavings',
      label: 'Tax Savings from Exemptions',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual tax savings due to exemptions'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Actual tax rate after exemptions'
    },
    {
      id: 'taxToValueRatio',
      label: 'Tax-to-Value Ratio',
      type: 'percentage',
      format: 'percent',
      explanation: 'Property tax as percentage of property value'
    },
    {
      id: 'latePaymentAmount',
      label: 'Late Payment Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Additional amount if payment is late'
    },
    {
      id: 'earlyPaymentSavings',
      label: 'Early Payment Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Savings from early payment discount'
    },
    {
      id: 'totalAnnualCost',
      label: 'Total Annual Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total annual cost including taxes and assessments'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed payment schedule based on frequency'
    }
  ],
  formulas: [
    {
      id: 'property-tax-calculation',
      name: 'Property Tax Calculation',
      description: 'Calculate property taxes with exemptions and payment schedules',
      calculate: calculatePropertyTax
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validatePropertyTaxInputs
    }
  ],
  examples: [
    {
      title: 'Standard Residential Property',
      description: 'Typical residential property with homestead exemption',
      inputs: {
        propertyValue: 500000,
        assessedValue: 450000,
        taxRate: 1.2,
        propertyType: 'residential',
        homesteadExemption: 50000,
        seniorExemption: 0,
        veteranExemption: 0,
        disabilityExemption: 0,
        greenEnergyExemption: 0,
        assessmentRatio: 100,
        paymentFrequency: 'annual',
        escrowIncluded: 'yes',
        latePaymentPenalty: 5,
        earlyPaymentDiscount: 0,
        specialAssessments: 0,
        taxYear: 2024
      },
      expectedOutputs: {
        taxableValue: 400000,
        annualTaxAmount: 4800,
        monthlyTaxPayment: 400,
        quarterlyTaxPayment: 1200,
        semiAnnualTaxPayment: 2400,
        totalExemptions: 50000,
        exemptionSavings: 600,
        effectiveTaxRate: 0.96,
        taxToValueRatio: 0.96,
        latePaymentAmount: 240,
        earlyPaymentSavings: 0,
        totalAnnualCost: 4800,
        paymentSchedule: 'Annual payment of $4,800 due by December 31st'
      }
    },
    {
      title: 'Senior Citizen with Multiple Exemptions',
      description: 'Senior citizen property with multiple exemptions',
      inputs: {
        propertyValue: 350000,
        assessedValue: 315000,
        taxRate: 1.5,
        propertyType: 'residential',
        homesteadExemption: 50000,
        seniorExemption: 25000,
        veteranExemption: 10000,
        disabilityExemption: 0,
        greenEnergyExemption: 0,
        assessmentRatio: 100,
        paymentFrequency: 'quarterly',
        escrowIncluded: 'no',
        latePaymentPenalty: 5,
        earlyPaymentDiscount: 2,
        specialAssessments: 500,
        taxYear: 2024
      },
      expectedOutputs: {
        taxableValue: 265000,
        annualTaxAmount: 3975,
        monthlyTaxPayment: 331.25,
        quarterlyTaxPayment: 993.75,
        semiAnnualTaxPayment: 1987.5,
        totalExemptions: 85000,
        exemptionSavings: 1275,
        effectiveTaxRate: 1.14,
        taxToValueRatio: 1.14,
        latePaymentAmount: 198.75,
        earlyPaymentSavings: 79.5,
        totalAnnualCost: 4475,
        paymentSchedule: 'Quarterly payments of $993.75 due March 31st, June 30th, September 30th, December 31st'
      }
    },
    {
      title: 'Commercial Property with Green Energy',
      description: 'Commercial property with green energy exemption',
      inputs: {
        propertyValue: 1200000,
        assessedValue: 1080000,
        taxRate: 2.1,
        propertyType: 'commercial',
        homesteadExemption: 0,
        seniorExemption: 0,
        veteranExemption: 0,
        disabilityExemption: 0,
        greenEnergyExemption: 100000,
        assessmentRatio: 100,
        paymentFrequency: 'semi_annual',
        escrowIncluded: 'no',
        latePaymentPenalty: 8,
        earlyPaymentDiscount: 0,
        specialAssessments: 2000,
        taxYear: 2024
      },
      expectedOutputs: {
        taxableValue: 980000,
        annualTaxAmount: 20580,
        monthlyTaxPayment: 1715,
        quarterlyTaxPayment: 5145,
        semiAnnualTaxPayment: 10290,
        totalExemptions: 100000,
        exemptionSavings: 2100,
        effectiveTaxRate: 1.72,
        taxToValueRatio: 1.72,
        latePaymentAmount: 1646.4,
        earlyPaymentSavings: 0,
        totalAnnualCost: 22580,
        paymentSchedule: 'Semi-annual payments of $10,290 due June 30th and December 31st'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};