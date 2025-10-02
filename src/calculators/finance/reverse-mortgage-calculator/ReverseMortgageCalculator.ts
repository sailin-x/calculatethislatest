import { Calculator, Formula } from '../../types/calculator';
import { calculateReverseMortgage, validateReverseMortgageInputs } from './formulas';
import { getReverseMortgageValidationRules } from './validation';

/**
 * Reverse mortgage formula implementation
 */
const reverseMortgageFormula: Formula = {
  id: 'reverse-mortgage',
  name: 'Reverse Mortgage',
  description: 'Calculate reverse mortgage loan amounts, payments, and financial impact',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateReverseMortgage(inputs as any);
    return {
      outputs: result,
      explanation: 'Reverse mortgage analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading reverse mortgage calculator with comprehensive features
 */
export const reverseMortgageCalculator: Calculator = {
  id: 'reverse-mortgage-calculator',
  title: 'Reverse Mortgage Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive reverse mortgage analysis including principal limits, payment options, fees, and long-term financial impact assessment with FHA HECM guidelines.',

  usageInstructions: [
    'Enter your home value and age information',
    'Specify current mortgage balance and payment plan preference',
    'Include all applicable fees and annual costs',
    'Review comprehensive analysis and risk assessment'
  ],

  inputs: [
    {
      id: 'homeValue',
      label: 'Home Value',
      type: 'currency',
      required: true,
      placeholder: '300000',
      tooltip: 'Current market value of your home',
      defaultValue: 300000
    },
    {
      id: 'borrowerAge',
      label: 'Borrower Age',
      type: 'number',
      required: true,
      placeholder: '70',
      tooltip: 'Age of the borrower (must be 62+)',
      defaultValue: 70,
      min: 62,
      max: 120
    },
    {
      id: 'youngestBorrowerAge',
      label: 'Youngest Borrower Age',
      type: 'number',
      required: true,
      placeholder: '70',
      tooltip: 'Age of the youngest borrower (must be 62+)',
      defaultValue: 70,
      min: 62,
      max: 120
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5.5',
      tooltip: 'Expected interest rate on the reverse mortgage',
      defaultValue: 5.5,
      min: 0,
      max: 15,
      step: 0.125
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual home value increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'counselingFee',
      label: 'Counseling Fee',
      type: 'currency',
      required: false,
      placeholder: '125',
      tooltip: 'HUD-approved counseling fee',
      defaultValue: 125
    },
    {
      id: 'originationFee',
      label: 'Origination Fee',
      type: 'currency',
      required: false,
      placeholder: '2500',
      tooltip: 'Loan origination fee (2% of home value, max $6,000)',
      defaultValue: 2500
    },
    {
      id: 'servicingFeeSetAside',
      label: 'Servicing Fee Set-Aside',
      type: 'currency',
      required: false,
      placeholder: '35',
      tooltip: 'Monthly servicing fee set-aside',
      defaultValue: 35
    },
    {
      id: 'mortgageInsurancePremium',
      label: 'Mortgage Insurance Premium',
      type: 'currency',
      required: false,
      placeholder: '1500',
      tooltip: 'Upfront mortgage insurance premium',
      defaultValue: 1500
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      placeholder: '3600',
      tooltip: 'Annual property tax amount',
      defaultValue: 3600
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'currency',
      required: false,
      placeholder: '1200',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 1200
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly homeowners association fees',
      defaultValue: 200
    },
    {
      id: 'maintenanceCost',
      label: 'Annual Maintenance',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual maintenance and repair costs',
      defaultValue: 3000
    },
    {
      id: 'repairSetAside',
      label: 'Repair Set-Aside',
      type: 'currency',
      required: false,
      placeholder: '2500',
      tooltip: 'Funds set aside for required repairs',
      defaultValue: 2500
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Expected remaining years of life',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'paymentPlan',
      label: 'Payment Plan',
      type: 'select',
      required: true,
      options: [
        { value: 'tenure', label: 'Tenure - Monthly payments for life' },
        { value: 'term', label: 'Term - Monthly payments for fixed period' },
        { value: 'line-of-credit', label: 'Line of Credit - Access as needed' }
      ],
      tooltip: 'Type of payment plan for the reverse mortgage',
      defaultValue: 'tenure'
    },
    {
      id: 'termYears',
      label: 'Term Years',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Number of years for term payment plan',
      defaultValue: 10,
      min: 1,
      max: 30
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Total monthly income from all sources',
      defaultValue: 3000
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'currency',
      required: false,
      placeholder: '2500',
      tooltip: 'Total monthly expenses',
      defaultValue: 2500
    },
    {
      id: 'existingMortgageBalance',
      label: 'Existing Mortgage Balance',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Remaining balance on current mortgage',
      defaultValue: 0
    }
  ],

  outputs: [
    {
      id: 'principalLimit',
      label: 'Principal Limit',
      type: 'currency',
      explanation: 'Maximum amount you can borrow based on FHA guidelines'
    },
    {
      id: 'netPrincipalLimit',
      label: 'Net Principal Limit',
      type: 'currency',
      explanation: 'Principal limit after fees and existing mortgage'
    },
    {
      id: 'availableLoanAmount',
      label: 'Available Loan Amount',
      type: 'currency',
      explanation: 'Actual amount available for use'
    },
    {
      id: 'monthlyLoanAdvance',
      label: 'Monthly Loan Advance',
      type: 'currency',
      explanation: 'Monthly payment amount from the reverse mortgage'
    },
    {
      id: 'totalLoanAdvances',
      label: 'Total Loan Advances',
      type: 'currency',
      explanation: 'Total amount received over the loan term'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest accumulated over loan term'
    },
    {
      id: 'totalFeesPaid',
      label: 'Total Fees Paid',
      type: 'currency',
      explanation: 'Total fees and costs over loan term'
    },
    {
      id: 'totalLoanBalance',
      label: 'Total Loan Balance',
      type: 'currency',
      explanation: 'Final loan balance including principal and interest'
    },
    {
      id: 'remainingEquity',
      label: 'Remaining Equity',
      type: 'currency',
      explanation: 'Equity remaining in the home after loan payoff'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Percentage of home value represented by loan balance'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years until loan balance exceeds home value'
    },
    {
      id: 'monthlyCashFlow',
      label: 'Monthly Cash Flow',
      type: 'currency',
      explanation: 'Net monthly cash flow including reverse mortgage payments'
    },
    {
      id: 'totalCashReceived',
      label: 'Total Cash Received',
      type: 'currency',
      explanation: 'Total cash received from reverse mortgage'
    },
    {
      id: 'netWorthImpact',
      label: 'Net Worth Impact',
      type: 'currency',
      explanation: 'Impact on net worth from reverse mortgage'
    },
    {
      id: 'sustainabilityYears',
      label: 'Sustainability (Years)',
      type: 'number',
      explanation: 'Years the loan advances can support negative cash flow'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment of the reverse mortgage'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Personalized recommendation based on analysis'
    }
  ],

  formulas: [reverseMortgageFormula],

  validationRules: getReverseMortgageValidationRules(),

  examples: [
    {
      title: 'Standard Reverse Mortgage',
      description: 'Analysis for a 70-year-old homeowner with a $300,000 home',
      inputs: {
        homeValue: 300000,
        borrowerAge: 70,
        youngestBorrowerAge: 70,
        interestRate: 5.5,
        expectedAppreciation: 3,
        counselingFee: 125,
        originationFee: 2500,
        servicingFeeSetAside: 35,
        mortgageInsurancePremium: 1500,
        propertyTaxes: 3600,
        homeownersInsurance: 1200,
        hoaFees: 200,
        maintenanceCost: 3000,
        repairSetAside: 2500,
        lifeExpectancy: 20,
        paymentPlan: 'tenure',
        termYears: 10,
        monthlyIncome: 3000,
        monthlyExpenses: 2500,
        existingMortgageBalance: 0
      },
      expectedOutputs: {
        principalLimit: 165000,
        netPrincipalLimit: 158840,
        availableLoanAmount: 158840,
        monthlyLoanAdvance: 1058,
        totalLoanAdvances: 253920,
        totalInterestPaid: 95120,
        totalFeesPaid: 80000,
        totalLoanBalance: 254040,
        remainingEquity: 45960,
        loanToValueRatio: 84.7,
        breakEvenYears: 25,
        monthlyCashFlow: 558,
        totalCashReceived: 253920,
        netWorthImpact: -45960,
        sustainabilityYears: 50,
        riskAssessment: 'Medium Risk: Moderate loan-to-value ratio',
        recommendation: 'Moderate option - consult with financial advisor for personalized advice'
      }
    }
  ]
};