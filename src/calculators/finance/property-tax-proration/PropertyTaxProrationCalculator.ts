import { Calculator } from '../../types/Calculator';
import { calculatePropertyTaxProration } from './formulas';
import { validatePropertyTaxProrationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const propertyTaxProrationCalculator: Calculator = {
  id: 'property-tax-proration',
  title: 'Property Tax Proration Calculator',
  category: 'finance',
  subcategory: 'tax',
  description: 'Calculate prorated property taxes for real estate transactions, including buyer and seller responsibilities',
  usageInstructions: 'Enter property tax details and closing date to calculate prorated taxes for both buyer and seller.',
  inputs: [
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      required: true,
      min: 100,
      max: 100000,
      step: 100,
      tooltip: 'Total annual property tax amount',
      placeholder: '5000',
      defaultValue: 5000
    },
    {
      id: 'closingDate',
      label: 'Closing Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the property transaction closes',
      placeholder: '2024-06-15',
      defaultValue: '2024-06-15'
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      required: true,
      min: 2020,
      max: 2030,
      step: 1,
      tooltip: 'Tax year for the property taxes',
      placeholder: '2024',
      defaultValue: 2024
    },
    {
      id: 'taxPaymentSchedule',
      label: 'Tax Payment Schedule',
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
      id: 'prorationMethod',
      label: 'Proration Method',
      type: 'select',
      required: true,
      options: [
        { value: '365_day', label: '365-Day Year' },
        { value: '360_day', label: '360-Day Year (Banker\'s Year)' },
        { value: 'actual_days', label: 'Actual Days in Month' }
      ],
      tooltip: 'Method used for calculating daily tax amounts',
      defaultValue: '365_day'
    },
    {
      id: 'sellerPaidTaxes',
      label: 'Seller Paid Taxes',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Amount of taxes already paid by seller for the current year',
      placeholder: '0',
      defaultValue: 0
    },
    {
      id: 'taxPaymentDates',
      label: 'Tax Payment Dates',
      type: 'text',
      required: false,
      tooltip: 'Comma-separated list of tax payment due dates (e.g., "2024-04-15, 2024-10-15")',
      placeholder: '2024-04-15, 2024-10-15',
      defaultValue: ''
    },
    {
      id: 'assessmentDate',
      label: 'Assessment Date',
      type: 'date',
      required: false,
      tooltip: 'Date when property was assessed for tax purposes',
      placeholder: '2024-01-01',
      defaultValue: '2024-01-01'
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: false,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Assessed property value for tax calculations',
      placeholder: '500000',
      defaultValue: 500000
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0.1,
      max: 10,
      step: 0.01,
      tooltip: 'Property tax rate as a percentage',
      placeholder: '1.0',
      defaultValue: 1.0
    },
    {
      id: 'exemptions',
      label: 'Tax Exemptions',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Total amount of tax exemptions applied',
      placeholder: '0',
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
      id: 'escrowAccount',
      label: 'Escrow Account',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      tooltip: 'Whether taxes will be paid through escrow account',
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
      tooltip: 'Penalty for late tax payment',
      placeholder: '5',
      defaultValue: 5
    },
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'basic', label: 'Basic Proration' },
        { value: 'detailed', label: 'Detailed Proration' },
        { value: 'escrow', label: 'Escrow Analysis' }
      ],
      tooltip: 'Type of proration calculation to perform',
      defaultValue: 'basic'
    }
  ],
  outputs: [
    {
      id: 'sellerCredit',
      label: 'Seller Credit',
      type: 'currency',
      format: 'USD',
      explanation: 'Amount seller should be credited for prepaid taxes'
    },
    {
      id: 'buyerDebit',
      label: 'Buyer Debit',
      type: 'currency',
      format: 'USD',
      explanation: 'Amount buyer should be debited for taxes owed'
    },
    {
      id: 'sellerDays',
      label: 'Seller Days',
      type: 'number',
      format: 'number',
      explanation: 'Number of days seller owned the property'
    },
    {
      id: 'buyerDays',
      label: 'Buyer Days',
      type: 'number',
      format: 'number',
      explanation: 'Number of days buyer will own the property'
    },
    {
      id: 'dailyTaxRate',
      label: 'Daily Tax Rate',
      type: 'currency',
      format: 'USD',
      explanation: 'Daily property tax amount'
    },
    {
      id: 'sellerTaxObligation',
      label: 'Seller Tax Obligation',
      type: 'currency',
      format: 'USD',
      explanation: 'Total tax obligation for seller\'s ownership period'
    },
    {
      id: 'buyerTaxObligation',
      label: 'Buyer Tax Obligation',
      type: 'currency',
      format: 'USD',
      explanation: 'Total tax obligation for buyer\'s ownership period'
    },
    {
      id: 'netProration',
      label: 'Net Proration',
      type: 'currency',
      format: 'USD',
      explanation: 'Net amount to be adjusted at closing'
    },
    {
      id: 'nextTaxPayment',
      label: 'Next Tax Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Next tax payment amount due'
    },
    {
      id: 'nextPaymentDate',
      label: 'Next Payment Date',
      type: 'text',
      format: 'text',
      explanation: 'Date of next tax payment due'
    },
    {
      id: 'escrowMonthlyPayment',
      label: 'Monthly Escrow Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly escrow payment for taxes'
    },
    {
      id: 'prorationSummary',
      label: 'Proration Summary',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed summary of the proration calculation'
    }
  ],
  formulas: [
    {
      id: 'property-tax-proration-calculation',
      name: 'Property Tax Proration Calculation',
      description: 'Calculate prorated property taxes for real estate transactions',
      calculate: calculatePropertyTaxProration
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validatePropertyTaxProrationInputs
    }
  ],
  examples: [
    {
      title: 'Standard Annual Tax Proration',
      description: 'Typical annual property tax proration for a mid-year closing',
      inputs: {
        annualPropertyTax: 6000,
        closingDate: '2024-06-15',
        taxYear: 2024,
        taxPaymentSchedule: 'annual',
        prorationMethod: '365_day',
        sellerPaidTaxes: 0,
        taxPaymentDates: '2024-04-15',
        assessmentDate: '2024-01-01',
        propertyValue: 500000,
        taxRate: 1.2,
        exemptions: 0,
        specialAssessments: 0,
        escrowAccount: 'yes',
        latePaymentPenalty: 5,
        calculationType: 'basic'
      },
      expectedOutputs: {
        sellerCredit: 2465.75,
        buyerDebit: 2465.75,
        sellerDays: 166,
        buyerDays: 199,
        dailyTaxRate: 16.44,
        sellerTaxObligation: 2729.04,
        buyerTaxObligation: 3270.96,
        netProration: 2465.75,
        nextTaxPayment: 6000,
        nextPaymentDate: '2025-04-15',
        escrowMonthlyPayment: 500,
        prorationSummary: '**Proration Summary:**\n- Seller owned property for 166 days\n- Buyer will own property for 199 days\n- Daily tax rate: $16.44\n- Seller credit: $2,465.75\n- Buyer debit: $2,465.75'
      }
    },
    {
      title: 'Semi-Annual Tax with Seller Payment',
      description: 'Semi-annual taxes with seller having already paid first installment',
      inputs: {
        annualPropertyTax: 4800,
        closingDate: '2024-08-01',
        taxYear: 2024,
        taxPaymentSchedule: 'semi_annual',
        prorationMethod: '365_day',
        sellerPaidTaxes: 2400,
        taxPaymentDates: '2024-04-15, 2024-10-15',
        assessmentDate: '2024-01-01',
        propertyValue: 400000,
        taxRate: 1.2,
        exemptions: 50000,
        specialAssessments: 200,
        escrowAccount: 'no',
        latePaymentPenalty: 5,
        calculationType: 'detailed'
      },
      expectedOutputs: {
        sellerCredit: 3156.16,
        buyerDebit: 3156.16,
        sellerDays: 214,
        buyerDays: 151,
        dailyTaxRate: 13.15,
        sellerTaxObligation: 2814.10,
        buyerTaxObligation: 1985.90,
        netProration: 3156.16,
        nextTaxPayment: 2400,
        nextPaymentDate: '2024-10-15',
        escrowMonthlyPayment: 0,
        prorationSummary: '**Proration Summary:**\n- Seller owned property for 214 days\n- Buyer will own property for 151 days\n- Daily tax rate: $13.15\n- Seller credit: $3,156.16\n- Buyer debit: $3,156.16\n- Seller already paid $2,400'
      }
    },
    {
      title: 'Quarterly Tax Escrow Analysis',
      description: 'Quarterly taxes with escrow account analysis',
      inputs: {
        annualPropertyTax: 3600,
        closingDate: '2024-09-30',
        taxYear: 2024,
        taxPaymentSchedule: 'quarterly',
        prorationMethod: 'actual_days',
        sellerPaidTaxes: 900,
        taxPaymentDates: '2024-03-31, 2024-06-30, 2024-09-30, 2024-12-31',
        assessmentDate: '2024-01-01',
        propertyValue: 300000,
        taxRate: 1.2,
        exemptions: 25000,
        specialAssessments: 0,
        escrowAccount: 'yes',
        latePaymentPenalty: 5,
        calculationType: 'escrow'
      },
      expectedOutputs: {
        sellerCredit: 2700,
        buyerDebit: 2700,
        sellerDays: 273,
        buyerDays: 92,
        dailyTaxRate: 9.86,
        sellerTaxObligation: 2691.78,
        buyerTaxObligation: 908.22,
        netProration: 2700,
        nextTaxPayment: 900,
        nextPaymentDate: '2024-12-31',
        escrowMonthlyPayment: 300,
        prorationSummary: '**Proration Summary:**\n- Seller owned property for 273 days\n- Buyer will own property for 92 days\n- Daily tax rate: $9.86\n- Seller credit: $2,700\n- Buyer debit: $2,700\n- Monthly escrow payment: $300'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};