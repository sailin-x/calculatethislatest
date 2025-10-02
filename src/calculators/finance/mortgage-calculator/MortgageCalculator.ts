import { Calculator } from '../../types/calculator';
import { MortgageInputs, MortgageResults } from './types';
import { calculateMortgage, validateMortgageInputs } from './formulas';
import { getMortgageValidationRules } from './validation';

export const comprehensiveMortgageCalculator: Calculator = {
  id: 'comprehensive-mortgage-calculator',
  title: 'Comprehensive Mortgage Calculator',
  category: 'finance',
  subcategory: 'Real Estate',
  description: 'Comprehensive mortgage calculator with amortization schedules, tax analysis, prepayment options, and investment analysis for home buyers and real estate investors.',
  usageInstructions: [
    'Enter loan amount, interest rate, and term details',
    'Specify property value and down payment information',
    'Include closing costs, taxes, and insurance estimates',
    'Review payment breakdown and amortization schedule',
    'Analyze tax benefits and prepayment scenarios',
    'Compare different rate and term options'
  ],

  inputs: [
    // Personal Information
    {
      id: 'annualSalary',
      label: 'Annual Salary',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Your gross annual income for affordability calculations',
      defaultValue: 75000,
      min: 10000,
      max: 10000000,
      step: 1000
    },

    // Loan Details
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'The total amount you want to borrow',
      defaultValue: 300000,
      min: 10000,
      max: 10000000,
      step: 1000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6.5',
      tooltip: 'Annual interest rate for the loan',
      defaultValue: 6.5,
      min: 0,
      max: 20,
      step: 0.125
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Length of the loan in years',
      defaultValue: 30,
      min: 1,
      max: 50,
      step: 1
    },
    {
      id: 'loanTermMonths',
      label: 'Additional Months',
      type: 'number',
      required: false,
      placeholder: '0',
      tooltip: 'Additional months beyond the years',
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1
    },

    // Property Information
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '400000',
      tooltip: 'Current market value of the property',
      defaultValue: 400000,
      min: 10000,
      max: 50000000,
      step: 1000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: false,
      placeholder: '80000',
      tooltip: 'Amount paid upfront (20% recommended)',
      defaultValue: 80000,
      min: 0,
      max: 50000000,
      step: 1000
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Percentage of property value paid as down payment',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 0.5
    },

    // Additional Costs
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: false,
      placeholder: '6000',
      tooltip: 'One-time costs to close the loan',
      defaultValue: 6000,
      min: 0,
      max: 100000,
      step: 100
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '4800',
      tooltip: 'Annual property tax amount',
      defaultValue: 4800,
      min: 0,
      max: 50000,
      step: 100
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200,
      min: 0,
      max: 10000,
      step: 50
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '0.5',
      tooltip: 'Private Mortgage Insurance rate (if LTV > 80%)',
      defaultValue: 0.5,
      min: 0,
      max: 5,
      step: 0.1
    },

    // Payment Schedule
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Bi-weekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      defaultValue: 'monthly',
      tooltip: 'How often you make payments'
    },

    // Extra Payments
    {
      id: 'extraPayment',
      label: 'Extra Payment Amount',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Additional amount paid each period',
      defaultValue: 200,
      min: 0,
      max: 50000,
      step: 50
    },
    {
      id: 'extraPaymentFrequency',
      label: 'Extra Payment Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        { value: 'one_time', label: 'One-time' }
      ],
      defaultValue: 'monthly',
      tooltip: 'How often extra payments are made'
    },

    // Loan Type
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Rate' },
        { value: 'adjustable', label: 'Adjustable Rate (ARM)' },
        { value: 'interest_only', label: 'Interest Only' },
        { value: 'balloon', label: 'Balloon Payment' }
      ],
      defaultValue: 'fixed',
      tooltip: 'Type of mortgage loan'
    },

    // Adjustable Rate Details
    {
      id: 'adjustmentPeriod',
      label: 'Adjustment Period (Months)',
      type: 'number',
      required: false,
      placeholder: '60',
      tooltip: 'How often the rate adjusts (for ARM loans)',
      defaultValue: 60,
      min: 1,
      max: 120,
      step: 12
    },

    // Tax Considerations
    {
      id: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal tax rate for tax benefit calculations',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'deductibleInterest',
      label: 'Interest is Tax Deductible',
      type: 'boolean',
      required: false,
      tooltip: 'Whether mortgage interest is tax deductible',
      defaultValue: true
    },

    // Advanced Options
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'propertyAppreciation',
      label: 'Annual Property Appreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual property value increase',
      defaultValue: 3,
      min: -10,
      max: 20,
      step: 0.5
    },
    {
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: false,
      placeholder: '1',
      tooltip: 'Points paid to lower interest rate',
      defaultValue: 1,
      min: 0,
      max: 5,
      step: 0.5
    },
    {
      id: 'originationFees',
      label: 'Origination Fees',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Loan origination fees',
      defaultValue: 2000,
      min: 0,
      max: 10000,
      step: 100
    },

    // Comparison Options - These will be handled in the UI
    // {
    //   id: 'compareRates',
    //   label: 'Compare Interest Rates',
    //   type: 'text',
    //   required: false,
    //   placeholder: '6.0, 6.25, 6.5',
    //   tooltip: 'Comma-separated rates to compare (e.g., 6.0, 6.25, 6.5)'
    // },
    // {
    //   id: 'compareTerms',
    //   label: 'Compare Loan Terms',
    //   type: 'text',
    //   required: false,
    //   placeholder: '15, 20, 30',
    //   tooltip: 'Comma-separated terms in years to compare (e.g., 15, 20, 30)'
    // },

    // Analysis Options
    {
      id: 'prepaymentAnalysis',
      label: 'Include Prepayment Analysis',
      type: 'boolean',
      required: false,
      tooltip: 'Analyze impact of extra payments',
      defaultValue: true
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Years to analyze in projections',
      defaultValue: 30,
      min: 1,
      max: 50,
      step: 1
    }
  ],

  outputs: [
    // Basic Payment Information
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Total monthly payment including principal, interest, taxes, and insurance'
    },
    {
      id: 'totalPayments',
      label: 'Total of All Payments',
      type: 'currency',
      explanation: 'Total amount paid over the life of the loan'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalCost',
      label: 'Total Cost of Loan',
      type: 'currency',
      explanation: 'Total cost including principal, interest, and closing costs'
    },

    // Payment Breakdown
    {
      id: 'principalPayment',
      label: 'Principal Payment',
      type: 'currency',
      explanation: 'Portion of monthly payment that goes toward principal'
    },
    {
      id: 'interestPayment',
      label: 'Interest Payment',
      type: 'currency',
      explanation: 'Portion of monthly payment that goes toward interest'
    },
    {
      id: 'taxPayment',
      label: 'Monthly Taxes',
      type: 'currency',
      explanation: 'Monthly property tax payment'
    },
    {
      id: 'insurancePayment',
      label: 'Monthly Insurance',
      type: 'currency',
      explanation: 'Monthly homeowners insurance payment'
    },
    {
      id: 'pmiPayment',
      label: 'Monthly PMI',
      type: 'currency',
      explanation: 'Monthly Private Mortgage Insurance payment'
    },

    // Loan Summary
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Percentage of property value financed by the loan'
    },
    {
      id: 'affordabilityScore',
      label: 'Affordability Rating',
      type: 'text',
      explanation: 'How affordable this loan is based on your income'
    },

    // Amortization Details
    {
      id: 'totalMonths',
      label: 'Total Payment Periods',
      type: 'number',
      explanation: 'Total number of payment periods for the loan'
    },
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'text',
      explanation: 'Date when the loan will be fully paid off'
    },
    {
      id: 'averageMonthlyPayment',
      label: 'Average Monthly Payment',
      type: 'currency',
      explanation: 'Average payment amount over the life of the loan'
    },

    // Interest Analysis
    {
      id: 'totalInterestPercentage',
      label: 'Interest as % of Loan Amount',
      type: 'percentage',
      explanation: 'Total interest paid as a percentage of the original loan amount'
    },
    {
      id: 'interestToPrincipalRatio',
      label: 'Interest to Principal Ratio',
      type: 'number',
      explanation: 'Ratio of interest paid to principal reduction'
    },
    {
      id: 'effectiveInterestRate',
      label: 'Effective Interest Rate (%)',
      type: 'percentage',
      explanation: 'Effective annual interest rate including fees'
    },

    // Equity Building
    {
      id: 'equityAfter5Years',
      label: 'Equity After 5 Years',
      type: 'currency',
      explanation: 'Home equity accumulated after 5 years'
    },
    {
      id: 'equityAfter10Years',
      label: 'Equity After 10 Years',
      type: 'currency',
      explanation: 'Home equity accumulated after 10 years'
    },
    {
      id: 'equityAtPayoff',
      label: 'Equity at Payoff',
      type: 'currency',
      explanation: 'Total home equity when loan is paid off'
    },

    // Tax Benefits
    {
      id: 'deductibleInterest',
      label: 'Annual Deductible Interest',
      type: 'currency',
      explanation: 'Annual mortgage interest that may be tax deductible'
    },
    {
      id: 'taxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from mortgage interest deduction'
    },
    {
      id: 'afterTaxMonthlyPayment',
      label: 'After-Tax Monthly Payment',
      type: 'currency',
      explanation: 'Monthly payment after accounting for tax benefits'
    },

    // Prepayment Analysis
    {
      id: 'prepaymentSavings',
      label: 'Prepayment Interest Savings',
      type: 'currency',
      explanation: 'Total interest saved through extra payments'
    },
    {
      id: 'timeSaved',
      label: 'Time Saved (Months)',
      type: 'number',
      explanation: 'Number of months saved through extra payments'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point (Months)',
      type: 'number',
      explanation: 'Months until extra payments break even'
    },

    // Scenario Comparisons
    {
      id: 'rateComparison',
      label: 'Interest Rate Comparison',
      type: 'text',
      explanation: 'Comparison of payments at different interest rates'
    },
    {
      id: 'termComparison',
      label: 'Loan Term Comparison',
      type: 'text',
      explanation: 'Comparison of payments for different loan terms'
    },

    // Cash Flow Analysis
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return (%)',
      type: 'percentage',
      explanation: 'Annual return on cash invested in the property'
    },
    {
      id: 'returnOnInvestment',
      label: 'Return on Investment (%)',
      type: 'percentage',
      explanation: 'Total ROI including property appreciation'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      explanation: 'Annual income after operating expenses'
    },

    // Risk Analysis
    {
      id: 'interestRateRisk',
      label: 'Interest Rate Risk',
      type: 'text',
      explanation: 'Assessment of interest rate risk for this loan'
    },
    {
      id: 'prepaymentRisk',
      label: 'Prepayment Risk',
      type: 'text',
      explanation: 'Assessment of prepayment penalties or restrictions'
    },
    {
      id: 'defaultRisk',
      label: 'Default Risk',
      type: 'text',
      explanation: 'Assessment of default risk based on loan parameters'
    },

    // Recommendations
    {
      id: 'optimalStrategy',
      label: 'Optimal Payment Strategy',
      type: 'text',
      explanation: 'Recommended approach for paying down the loan'
    },
    {
      id: 'refinanceRecommendation',
      label: 'Refinance Recommendation',
      type: 'text',
      explanation: 'Whether refinancing may be beneficial'
    },
    {
      id: 'paymentOptimization',
      label: 'Payment Optimization Tips',
      type: 'text',
      explanation: 'Tips for optimizing loan payments and costs'
    },

    // Future Projections
    {
      id: 'balanceAfter5Years',
      label: 'Remaining Balance After 5 Years',
      type: 'currency',
      explanation: 'Loan balance remaining after 5 years of payments'
    },
    {
      id: 'balanceAfter10Years',
      label: 'Remaining Balance After 10 Years',
      type: 'currency',
      explanation: 'Loan balance remaining after 10 years of payments'
    },
    {
      id: 'remainingTermAfter5Years',
      label: 'Remaining Term After 5 Years',
      type: 'number',
      explanation: 'Years remaining on loan after 5 years of payments'
    },

    // Affordability Metrics
    {
      id: 'frontEndRatio',
      label: 'Front-End Debt-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Housing expenses as percentage of gross income'
    },
    {
      id: 'backEndRatio',
      label: 'Back-End Debt-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Total debt payments as percentage of gross income'
    },
    {
      id: 'housingExpenseRatio',
      label: 'Housing Expense Ratio (%)',
      type: 'percentage',
      explanation: 'Housing costs as percentage of take-home pay'
    },

    // Investment Analysis
    {
      id: 'propertyValueProjection',
      label: 'Projected Property Value',
      type: 'currency',
      explanation: 'Estimated property value at loan payoff'
    },
    {
      id: 'netWorthImpact',
      label: 'Net Worth Impact',
      type: 'currency',
      explanation: 'Impact on net worth from homeownership'
    },
    {
      id: 'wealthBuildingEfficiency',
      label: 'Wealth Building Efficiency (%)',
      type: 'percentage',
      explanation: 'Efficiency of wealth building through homeownership'
    },

    // Break-Even Analysis
    {
      id: 'breakEvenTime',
      label: 'Break-Even Time (Months)',
      type: 'number',
      explanation: 'Months until homeownership costs break even with renting'
    },
    {
      id: 'breakEvenCost',
      label: 'Break-Even Cost',
      type: 'currency',
      explanation: 'Total cost to reach break-even point'
    },
    {
      id: 'profitabilityTimeline',
      label: 'Profitability Timeline',
      type: 'text',
      explanation: 'When the investment becomes profitable'
    }
  ],

  formulas: [],

  validationRules: getMortgageValidationRules(),

  examples: [
    {
      title: 'First-Time Homebuyer',
      description: '30-year fixed mortgage for a first-time buyer',
      inputs: {
        annualSalary: 75000,
        loanAmount: 300000,
        interestRate: 6.5,
        loanTermYears: 30,
        propertyValue: 400000,
        downPayment: 80000,
        closingCosts: 6000,
        propertyTaxes: 4800,
        homeownersInsurance: 1200,
        paymentFrequency: 'monthly',
        loanType: 'fixed',
        taxRate: 25,
        deductibleInterest: true
      },
      expectedOutputs: {
        monthlyPayment: 1913,
        totalPayments: 688680,
        totalInterest: 388680,
        loanToValueRatio: 80,
        equityAfter5Years: 32000
      }
    },
    {
      title: 'Investment Property',
      description: '15-year investment property with extra payments',
      inputs: {
        annualSalary: 95000,
        loanAmount: 250000,
        interestRate: 5.75,
        loanTermYears: 15,
        propertyValue: 350000,
        downPayment: 87500,
        closingCosts: 5000,
        propertyTaxes: 4200,
        homeownersInsurance: 1400,
        paymentFrequency: 'monthly',
        extraPayment: 500,
        extraPaymentFrequency: 'monthly',
        loanType: 'fixed',
        taxRate: 28,
        deductibleInterest: true,
        propertyAppreciation: 4
      },
      expectedOutputs: {
        monthlyPayment: 2185,
        totalPayments: 393300,
        totalInterest: 143300,
        loanToValueRatio: 75,
        prepaymentSavings: 25000
      }
    },
    {
      title: 'ARM Loan Analysis',
      description: '5/1 ARM loan with adjustment caps',
      inputs: {
        annualSalary: 85000,
        loanAmount: 275000,
        interestRate: 5.25,
        loanTermYears: 30,
        propertyValue: 375000,
        downPayment: 93750,
        closingCosts: 5500,
        propertyTaxes: 4500,
        homeownersInsurance: 1500,
        paymentFrequency: 'monthly',
        loanType: 'adjustable',
        adjustmentPeriod: 60,
        taxRate: 24,
        deductibleInterest: true
      },
      expectedOutputs: {
        monthlyPayment: 1510,
        totalPayments: 543600,
        totalInterest: 268600,
        loanToValueRatio: 80,
        interestRateRisk: 'Medium - ARM loans carry interest rate risk'
      }
    }
  ]
};