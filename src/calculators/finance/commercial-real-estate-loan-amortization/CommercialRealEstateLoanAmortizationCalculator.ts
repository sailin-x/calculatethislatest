import { Calculator } from '../../types/calculator';
import { calculateAmortization, generateAmortizationAnalysis } from './formulas';
import { validateAmortizationInputs } from './validation';

export const CommercialRealEstateLoanAmortizationCalculator: Calculator = {
  id: 'commercial-real-estate-loan-amortization-calculator',
  name: 'Commercial Real Estate Loan Amortization Calculator',
  category: 'finance',
  subcategory: 'business',
  description: 'Calculate commercial real estate loan amortization schedules, payment breakdowns, and interest analysis for commercial properties.',
  
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of commercial property',
      options: [
        { value: 'office', label: 'Office Building' },
        { value: 'retail', label: 'Retail Store' },
        { value: 'warehouse', label: 'Warehouse/Industrial' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'hotel', label: 'Hotel/Motel' },
        { value: 'medical', label: 'Medical Office' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'apartment', label: 'Apartment Building' },
        { value: 'self-storage', label: 'Self-Storage Facility' }
      ]
    },
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total loan amount',
      placeholder: '2000000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Annual interest rate',
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
      description: 'Loan term in years',
      placeholder: '25',
      min: 5,
      max: 30
    },
    {
      id: 'paymentFrequency',
      name: 'Payment Frequency',
      type: 'select',
      required: true,
      description: 'How often payments are made',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Bi-weekly' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ]
    },
    {
      id: 'startDate',
      name: 'Loan Start Date',
      type: 'string',
      required: true,
      description: 'Date when loan payments begin',
      placeholder: '2024-01-01'
    },
    {
      id: 'balloonPayment',
      name: 'Balloon Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Balloon payment at end of term (0 for fully amortized)',
      placeholder: '0',
      min: 0,
      max: 100000000
    },
    {
      id: 'prepaymentPenalty',
      name: 'Prepayment Penalty',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Prepayment penalty percentage',
      placeholder: '0',
      min: 0,
      max: 10
    },
    {
      id: 'originationFee',
      name: 'Origination Fee',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Loan origination fee',
      placeholder: '10000',
      min: 0,
      max: 100000
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total closing costs',
      placeholder: '25000',
      min: 0,
      max: 500000
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current property value',
      placeholder: '2500000',
      min: 100000,
      max: 100000000
    },
    {
      id: 'loanToValue',
      name: 'Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Loan amount as percentage of property value',
      placeholder: '80',
      min: 10,
      max: 95
    },
    {
      id: 'debtServiceCoverage',
      name: 'Debt Service Coverage Ratio',
      type: 'number',
      required: true,
      description: 'Required debt service coverage ratio',
      placeholder: '1.25',
      min: 1.0,
      max: 3.0
    },
    {
      id: 'annualNOI',
      name: 'Annual Net Operating Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Annual net operating income',
      placeholder: '200000',
      min: 0,
      max: 10000000
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Effective tax rate',
      placeholder: '25.0',
      min: 0,
      max: 50
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10
    },
    {
      id: 'appreciationRate',
      name: 'Property Appreciation Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Expected annual property appreciation rate',
      placeholder: '3.0',
      min: -10,
      max: 15
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Monthly loan payment'
    },
    {
      id: 'totalPayments',
      name: 'Total Payments',
      type: 'number',
      unit: 'USD',
      description: 'Total payments over loan term'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest',
      type: 'number',
      unit: 'USD',
      description: 'Total interest paid over loan term'
    },
    {
      id: 'totalPrincipal',
      name: 'Total Principal',
      type: 'number',
      unit: 'USD',
      description: 'Total principal paid over loan term'
    },
    {
      id: 'amortizationSchedule',
      name: 'Amortization Schedule',
      type: 'string',
      description: 'Detailed payment schedule'
    },
    {
      id: 'interestToPrincipalRatio',
      name: 'Interest to Principal Ratio',
      type: 'number',
      description: 'Ratio of total interest to total principal'
    },
    {
      id: 'effectiveInterestRate',
      name: 'Effective Interest Rate',
      type: 'number',
      unit: '%',
      description: 'Effective annual interest rate including fees'
    },
    {
      id: 'debtServiceCoverageRatio',
      name: 'Actual Debt Service Coverage',
      type: 'number',
      description: 'Actual debt service coverage ratio'
    },
    {
      id: 'loanToValueRatio',
      name: 'Actual Loan-to-Value',
      type: 'number',
      unit: '%',
      description: 'Actual loan-to-value ratio'
    },
    {
      id: 'breakEvenPoint',
      name: 'Break-Even Point',
      type: 'number',
      unit: 'years',
      description: 'Years to break even on interest vs principal'
    },
    {
      id: 'prepaymentAnalysis',
      name: 'Prepayment Analysis',
      type: 'string',
      description: 'Analysis of prepayment options and penalties'
    },
    {
      id: 'refinancingAnalysis',
      name: 'Refinancing Analysis',
      type: 'string',
      description: 'Analysis of refinancing opportunities'
    },
    {
      id: 'taxBenefits',
      name: 'Annual Tax Benefits',
      type: 'number',
      unit: 'USD',
      description: 'Annual tax benefits from interest deduction'
    },
    {
      id: 'totalCost',
      name: 'Total Loan Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total cost including fees and interest'
    },
    {
      id: 'monthlyBreakdown',
      name: 'Monthly Payment Breakdown',
      type: 'string',
      description: 'Breakdown of monthly payment components'
    },
    {
      id: 'loanSummary',
      name: 'Loan Summary',
      type: 'string',
      description: 'Overall loan performance summary'
    }
  ],

  calculate: (inputs) => {
    const validation = validateAmortizationInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculateAmortization(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAmortizationAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Monthly Payment',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = payment, L = loan amount, c = monthly interest rate, n = total payments'
    },
    {
      name: 'Interest Payment',
      formula: 'Interest = Remaining Balance × Monthly Interest Rate',
      description: 'Calculates interest portion of each payment'
    },
    {
      name: 'Principal Payment',
      formula: 'Principal = Total Payment - Interest Payment',
      description: 'Calculates principal portion of each payment'
    },
    {
      name: 'Remaining Balance',
      formula: 'Remaining Balance = Previous Balance - Principal Payment',
      description: 'Calculates remaining loan balance after each payment'
    },
    {
      name: 'Debt Service Coverage',
      formula: 'DSCR = Net Operating Income / Annual Debt Service',
      description: 'Measures ability to cover debt payments'
    }
  ],

  examples: [
    {
      name: 'Office Building Loan Amortization',
      description: 'A $2.5M office building with 25-year amortization',
      inputs: {
        propertyType: 'office',
        loanAmount: 2000000,
        interestRate: 6.5,
        loanTerm: 25,
        paymentFrequency: 'monthly',
        startDate: '2024-01-01',
        balloonPayment: 0,
        prepaymentPenalty: 0,
        originationFee: 15000,
        closingCosts: 25000,
        propertyValue: 2500000,
        loanToValue: 80,
        debtServiceCoverage: 1.25,
        annualNOI: 200000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.0
      },
      expectedOutputs: {
        monthlyPayment: 13500,
        totalPayments: 4050000,
        totalInterest: 2050000,
        totalPrincipal: 2000000,
        amortizationSchedule: '300 payments with decreasing interest and increasing principal',
        interestToPrincipalRatio: 1.025,
        effectiveInterestRate: 6.8,
        debtServiceCoverageRatio: 1.23,
        loanToValueRatio: 80.0,
        breakEvenPoint: 12.5,
        prepaymentAnalysis: 'No prepayment penalty - flexible prepayment options',
        refinancingAnalysis: 'Consider refinancing if rates drop below 5.5%',
        taxBenefits: 51250,
        totalCost: 4080000,
        monthlyBreakdown: 'Principal: $6,667, Interest: $6,833',
        loanSummary: 'Standard commercial loan with good terms and flexibility'
      }
    },
    {
      name: 'Apartment Building Loan Amortization',
      description: 'A $3.5M apartment building with balloon payment',
      inputs: {
        propertyType: 'apartment',
        loanAmount: 2800000,
        interestRate: 5.75,
        loanTerm: 20,
        paymentFrequency: 'monthly',
        startDate: '2024-01-01',
        balloonPayment: 1000000,
        prepaymentPenalty: 2.0,
        originationFee: 20000,
        closingCosts: 35000,
        propertyValue: 3500000,
        loanToValue: 80,
        debtServiceCoverage: 1.35,
        annualNOI: 280000,
        taxRate: 25.0,
        inflationRate: 2.5,
        appreciationRate: 3.5
      },
      expectedOutputs: {
        monthlyPayment: 19750,
        totalPayments: 5740000,
        totalInterest: 1940000,
        totalPrincipal: 1800000,
        amortizationSchedule: '240 payments with balloon payment at end',
        interestToPrincipalRatio: 1.078,
        effectiveInterestRate: 6.1,
        debtServiceCoverageRatio: 1.18,
        loanToValueRatio: 80.0,
        breakEvenPoint: 11.2,
        prepaymentAnalysis: '2% prepayment penalty - consider timing of prepayments',
        refinancingAnalysis: 'Balloon payment requires refinancing or sale in 20 years',
        taxBenefits: 48500,
        totalCost: 5770000,
        monthlyBreakdown: 'Principal: $7,500, Interest: $12,250',
        loanSummary: 'Balloon loan with higher monthly payments but lower total interest'
      }
    }
  ]
};
