import { Calculator } from '../../../types/calculator';
import { calculateEscrowAnalysis, generateEscrowAnalysisReport } from './formulas';
import { validateEscrowAnalysisInputs } from './validation';

export const EscrowAnalysisCalculator: Calculator = {
  id: 'escrow-analysis-calculator',
  name: 'Escrow Analysis Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Analyze escrow accounts, calculate required balances, identify shortages/surpluses, and project future payments for property taxes and insurance.',
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the property',
      placeholder: '350000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Original mortgage loan amount',
      placeholder: '280000',
      min: 10000,
      max: 10000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual mortgage interest rate',
      placeholder: '6.5',
      min: 1,
      max: 20
    },
    {
      id: 'loanTerm',
      name: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Mortgage loan term in years',
      placeholder: '30',
      min: 10,
      max: 50
    },
    {
      id: 'monthlyPayment',
      name: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current monthly mortgage payment (P&I only)',
      placeholder: '1770',
      min: 100,
      max: 50000
    },
    {
      id: 'currentEscrowBalance',
      name: 'Current Escrow Balance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current balance in escrow account',
      placeholder: '2500',
      min: 0,
      max: 100000
    },
    {
      id: 'annualPropertyTax',
      name: 'Annual Property Tax',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual property tax amount',
      placeholder: '4200',
      min: 0,
      max: 100000
    },
    {
      id: 'propertyTaxPaymentFrequency',
      name: 'Property Tax Payment Frequency',
      type: 'select',
      required: true,
      description: 'How often property taxes are paid',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ]
    },
    {
      id: 'annualHomeInsurance',
      name: 'Annual Home Insurance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual homeowners insurance premium',
      placeholder: '1200',
      min: 0,
      max: 50000
    },
    {
      id: 'insurancePaymentFrequency',
      name: 'Insurance Payment Frequency',
      type: 'select',
      required: true,
      description: 'How often insurance is paid',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ]
    },
    {
      id: 'annualPMI',
      name: 'Annual PMI (if applicable)',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual Private Mortgage Insurance premium',
      placeholder: '0',
      min: 0,
      max: 10000
    },
    {
      id: 'pmiPaymentFrequency',
      name: 'PMI Payment Frequency',
      type: 'select',
      required: false,
      description: 'How often PMI is paid',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ]
    },
    {
      id: 'annualFloodInsurance',
      name: 'Annual Flood Insurance (if applicable)',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual flood insurance premium',
      placeholder: '0',
      min: 0,
      max: 10000
    },
    {
      id: 'floodInsurancePaymentFrequency',
      name: 'Flood Insurance Payment Frequency',
      type: 'select',
      required: false,
      description: 'How often flood insurance is paid',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ]
    },
    {
      id: 'escrowCushion',
      name: 'Escrow Cushion',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Required cushion amount (typically 2 months of escrow payments)',
      placeholder: '900',
      min: 0,
      max: 10000
    },
    {
      id: 'taxAssessmentIncrease',
      name: 'Expected Tax Assessment Increase',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual increase in property tax assessment',
      placeholder: '3',
      min: 0,
      max: 20
    },
    {
      id: 'insuranceRateIncrease',
      name: 'Expected Insurance Rate Increase',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual increase in insurance rates',
      placeholder: '5',
      min: 0,
      max: 30
    },
    {
      id: 'analysisPeriod',
      name: 'Analysis Period',
      type: 'number',
      unit: 'months',
      required: true,
      description: 'Number of months to analyze',
      placeholder: '12',
      min: 1,
      max: 60
    },
    {
      id: 'paymentHistory',
      name: 'Payment History',
      type: 'select',
      required: true,
      description: 'Payment history status',
      options: [
        { value: 'current', label: 'Current' },
        { value: 'late-30', label: '30 Days Late' },
        { value: 'late-60', label: '60 Days Late' },
        { value: 'late-90', label: '90+ Days Late' }
      ]
    },
    {
      id: 'escrowAccountType',
      name: 'Escrow Account Type',
      type: 'select',
      required: true,
      description: 'Type of escrow account',
      options: [
        { value: 'required', label: 'Required by Lender' },
        { value: 'voluntary', label: 'Voluntary' },
        { value: 'waived', label: 'Escrow Waived' }
      ]
    }
  ],
  outputs: [
    {
      id: 'monthlyEscrowPayment',
      name: 'Monthly Escrow Payment',
      type: 'number',
      unit: 'USD',
      description: 'Required monthly escrow payment'
    },
    {
      id: 'totalMonthlyPayment',
      name: 'Total Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Total monthly payment including P&I and escrow'
    },
    {
      id: 'requiredEscrowBalance',
      name: 'Required Escrow Balance',
      type: 'number',
      unit: 'USD',
      description: 'Minimum required escrow balance'
    },
    {
      id: 'escrowShortage',
      name: 'Escrow Shortage',
      type: 'number',
      unit: 'USD',
      description: 'Amount short in escrow account (negative if surplus)'
    },
    {
      id: 'escrowSurplus',
      name: 'Escrow Surplus',
      type: 'number',
      unit: 'USD',
      description: 'Amount over required balance (negative if shortage)'
    },
    {
      id: 'shortagePayment',
      name: 'Shortage Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly payment to cover shortage'
    },
    {
      id: 'surplusRefund',
      name: 'Surplus Refund',
      type: 'number',
      unit: 'USD',
      description: 'Amount available for refund'
    },
    {
      id: 'nextEscrowAnalysis',
      name: 'Next Escrow Analysis Date',
      type: 'string',
      description: 'Date of next scheduled escrow analysis'
    },
    {
      id: 'projectedPayments',
      name: 'Projected Payments',
      type: 'string',
      description: 'Projected escrow payments for analysis period'
    },
    {
      id: 'escrowAccountStatus',
      name: 'Escrow Account Status',
      type: 'string',
      description: 'Current status of escrow account'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Recommendations for escrow management'
    },
    {
      id: 'costBreakdown',
      name: 'Cost Breakdown',
      type: 'string',
      description: 'Detailed breakdown of escrow costs'
    },
    {
      id: 'futureProjections',
      name: 'Future Projections',
      type: 'string',
      description: 'Projected escrow costs over time'
    },
    {
      id: 'escrowAnalysisReport',
      name: 'Escrow Analysis Report',
      type: 'string',
      description: 'Comprehensive escrow analysis report'
    }
  ],
  calculate: (inputs) => {
    return calculateEscrowAnalysis(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateEscrowAnalysisReport(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Escrow Payment',
      formula: 'Monthly Escrow = (Annual Property Tax + Annual Insurance + Annual PMI + Annual Flood Insurance) ÷ 12',
      description: 'Calculate required monthly escrow payment'
    },
    {
      name: 'Total Monthly Payment',
      formula: 'Total Payment = Monthly P&I + Monthly Escrow',
      description: 'Calculate total monthly mortgage payment'
    },
    {
      name: 'Required Escrow Balance',
      formula: 'Required Balance = (2 × Monthly Escrow) + Escrow Cushion',
      description: 'Calculate minimum required escrow balance'
    },
    {
      name: 'Escrow Shortage/Surplus',
      formula: 'Shortage = Required Balance - Current Balance\nSurplus = Current Balance - Required Balance',
      description: 'Calculate escrow shortage or surplus'
    },
    {
      name: 'Shortage Payment',
      formula: 'Shortage Payment = Escrow Shortage ÷ 12',
      description: 'Calculate monthly payment to cover shortage'
    },
    {
      name: 'Projected Future Costs',
      formula: 'Future Tax = Current Tax × (1 + Tax Increase Rate)^Years\nFuture Insurance = Current Insurance × (1 + Insurance Increase Rate)^Years',
      description: 'Project future escrow costs based on expected increases'
    }
  ],
  examples: [
    {
      name: 'Standard Escrow Account',
      inputs: {
        propertyValue: 350000,
        loanAmount: 280000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyPayment: 1770,
        currentEscrowBalance: 2500,
        annualPropertyTax: 4200,
        propertyTaxPaymentFrequency: 'semi-annually',
        annualHomeInsurance: 1200,
        insurancePaymentFrequency: 'annually',
        annualPMI: 0,
        escrowCushion: 900,
        taxAssessmentIncrease: 3,
        insuranceRateIncrease: 5,
        analysisPeriod: 12,
        paymentHistory: 'current',
        escrowAccountType: 'required'
      },
      description: 'Standard escrow account with property taxes and insurance'
    },
    {
      name: 'Escrow with PMI',
      inputs: {
        propertyValue: 300000,
        loanAmount: 285000,
        interestRate: 7.0,
        loanTerm: 30,
        monthlyPayment: 1895,
        currentEscrowBalance: 1800,
        annualPropertyTax: 3600,
        propertyTaxPaymentFrequency: 'quarterly',
        annualHomeInsurance: 1100,
        insurancePaymentFrequency: 'annually',
        annualPMI: 1200,
        pmiPaymentFrequency: 'monthly',
        annualFloodInsurance: 0,
        escrowCushion: 850,
        taxAssessmentIncrease: 2.5,
        insuranceRateIncrease: 4,
        analysisPeriod: 12,
        paymentHistory: 'current',
        escrowAccountType: 'required'
      },
      description: 'Escrow account including PMI payments'
    },
    {
      name: 'Escrow Shortage Scenario',
      inputs: {
        propertyValue: 400000,
        loanAmount: 320000,
        interestRate: 6.0,
        loanTerm: 30,
        monthlyPayment: 1919,
        currentEscrowBalance: 1200,
        annualPropertyTax: 4800,
        propertyTaxPaymentFrequency: 'semi-annually',
        annualHomeInsurance: 1400,
        insurancePaymentFrequency: 'annually',
        annualPMI: 0,
        escrowCushion: 1000,
        taxAssessmentIncrease: 4,
        insuranceRateIncrease: 6,
        analysisPeriod: 12,
        paymentHistory: 'current',
        escrowAccountType: 'required'
      },
      description: 'Escrow account with insufficient balance'
    }
  ]
};
