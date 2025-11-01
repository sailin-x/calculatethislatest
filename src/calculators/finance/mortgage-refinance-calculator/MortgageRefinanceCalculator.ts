import { Calculator } from '../../../types/calculator';
import { MortgageRefinanceInputs, MortgageRefinanceOutputs } from './types';
import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs, validateMortgageRefinanceBusinessRules } from './validation';

export const MortgageRefinanceCalculator: Calculator = {
  id: 'MortgageRefinanceCalculator',
  title: 'Mortgage Refinance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Analyze mortgage refinance options with break-even analysis, cash flow projections, and comprehensive cost-benefit evaluation for rate-and-term or cash-out refinances.',
  usageInstructions: [
    'Enter current loan details and new refinance terms',
    'Input all closing costs and fees',
    'Specify expected stay duration and market conditions',
    'Review break-even analysis and recommendations'
  ],

  inputs: [
    {
      id: 'currentLoanAmount',
      label: 'Current Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Original loan amount'
    },
    {
      id: 'currentInterestRate',
      label: 'Current Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current loan interest rate'
    },
    {
      id: 'currentLoanTerm',
      label: 'Current Remaining Term (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      tooltip: 'Months remaining on current loan'
    },
    {
      id: 'currentMonthlyPayment',
      label: 'Current Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current monthly mortgage payment'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of property'
    },
    {
      id: 'newInterestRate',
      label: 'New Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'New loan interest rate'
    },
    {
      id: 'newLoanTerm',
      label: 'New Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'New loan term in years'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total closing costs for refinance'
    },
    {
      id: 'cashOutAmount',
      label: 'Cash Out Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Amount of cash to take out'
    },
    {
      id: 'currentLoanBalance',
      label: 'Current Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Remaining balance on current loan'
    },
    {
      id: 'timeToRefinance',
      label: 'Time to Complete Refinance (Months)',
      type: 'number',
      required: false,
      min: 0,
      max: 12,
      defaultValue: 2,
      tooltip: 'Months until refinance closes'
    },
    {
      id: 'expectedStayDuration',
      label: 'Expected Stay Duration (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      tooltip: 'How long you plan to stay in the home'
    },
    {
      id: 'currentPropertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'currentHomeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'currentPMI',
      label: 'Current Monthly PMI ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Current private mortgage insurance'
    },
    {
      id: 'newPMI',
      label: 'New Monthly PMI ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'New private mortgage insurance'
    },
    {
      id: 'discountPoints',
      label: 'Discount Points ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Points paid to lower interest rate'
    },
    {
      id: 'lenderCredits',
      label: 'Lender Credits ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Credits provided by lender'
    },
    {
      id: 'appraisalFee',
      label: 'Appraisal Fee ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Cost of property appraisal'
    },
    {
      id: 'titleInsurance',
      label: 'Title Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Title insurance premium'
    },
    {
      id: 'otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Miscellaneous closing fees'
    },
    {
      id: 'marketConditions',
      label: 'Market Conditions',
      type: 'select',
      required: true,
      options: [
        { value: 'Stable', label: 'Stable' },
        { value: 'Rising', label: 'Rising Rates' },
        { value: 'Falling', label: 'Falling Rates' }
      ],
      tooltip: 'Current interest rate market conditions'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Your current credit score'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Conventional', label: 'Conventional' },
        { value: 'FHA', label: 'FHA' },
        { value: 'VA', label: 'VA' },
        { value: 'USDA', label: 'USDA' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'refinanceType',
      label: 'Refinance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Rate-and-Term', label: 'Rate-and-Term' },
        { value: 'Cash-Out', label: 'Cash-Out' },
        { value: 'Cash-In', label: 'Cash-In' }
      ],
      tooltip: 'Type of refinance'
    },
    {
      id: 'prepaymentPenalty',
      label: 'Prepayment Penalty ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Penalty for paying off loan early'
    },
    {
      id: 'currentLoanOriginationDate',
      label: 'Current Loan Origination Date',
      type: 'date',
      required: true,
      tooltip: 'Date current loan was originated'
    }
  ],

  outputs: [
    {
      id: 'newMonthlyPayment',
      label: 'New Monthly Payment',
      type: 'currency',
      explanation: 'New monthly mortgage payment after refinance'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Savings',
      type: 'currency',
      explanation: 'Monthly payment reduction'
    },
    {
      id: 'totalRefinanceCosts',
      label: 'Total Refinance Costs',
      type: 'currency',
      explanation: 'All costs associated with refinancing'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to recover refinance costs'
    },
    {
      id: 'totalSavingsOverTime',
      label: 'Total Savings Over Time',
      type: 'currency',
      explanation: 'Net savings over expected stay duration'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of refinance decision'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Rate of return on refinance investment'
    },
    {
      id: 'cashToClose',
      label: 'Cash to Close',
      type: 'currency',
      explanation: 'Cash required at closing'
    },
    {
      id: 'newLoanAmount',
      label: 'New Loan Amount',
      type: 'currency',
      explanation: 'New loan principal amount'
    },
    {
      id: 'newTotalPayments',
      label: 'New Total Payments',
      type: 'currency',
      explanation: 'Total of all payments over new loan term'
    },
    {
      id: 'totalInterestSavings',
      label: 'Total Interest Savings',
      type: 'currency',
      explanation: 'Interest savings over loan term'
    },
    {
      id: 'equityPosition',
      label: 'Equity Position',
      type: 'currency',
      explanation: 'Home equity after refinance'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'New loan amount as percentage of property value'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Monthly debts as percentage of income'
    },
    {
      id: 'affordabilityAnalysis',
      label: 'Affordability Analysis',
      type: 'text',
      explanation: 'Assessment of payment affordability'
    },
    {
      id: 'costBenefitAnalysis',
      label: 'Cost-Benefit Analysis',
      type: 'text',
      explanation: 'Detailed cost-benefit breakdown'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of refinance risks'
    },
    {
      id: 'scenarioAnalysis',
      label: 'Scenario Analysis',
      type: 'text',
      explanation: 'Conservative, expected, and optimistic scenarios'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations based on analysis'
    },
    {
      id: 'comparisonMetrics',
      label: 'Comparison Metrics',
      type: 'text',
      explanation: 'Side-by-side comparison of current vs new loan'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Rate-and-Term Refinance',
      description: 'Refinancing from 4.5% to 3.25% interest rate',
      inputs: {
        currentLoanAmount: 300000,
        currentInterestRate: 4.5,
        currentLoanTerm: 240,
        currentMonthlyPayment: 1520,
        propertyValue: 400000,
        newInterestRate: 3.25,
        newLoanTerm: 30,
        closingCosts: 3500,
        cashOutAmount: 0,
        currentLoanBalance: 285000,
        timeToRefinance: 2,
        expectedStayDuration: 120,
        currentPropertyTaxes: 4800,
        currentHomeownersInsurance: 1200,
        currentPMI: 0,
        newPMI: 0,
        discountPoints: 0,
        lenderCredits: 500,
        appraisalFee: 500,
        titleInsurance: 800,
        otherFees: 800,
        marketConditions: 'Stable',
        creditScore: 750,
        loanType: 'Conventional',
        refinanceType: 'Rate-and-Term',
        prepaymentPenalty: 0,
        currentLoanOriginationDate: '2020-01-15'
      },
      expectedOutputs: {
        newMonthlyPayment: 1230,
        monthlySavings: 290,
        totalRefinanceCosts: 4100,
        breakEvenPeriod: 14,
        totalSavingsOverTime: 31300,
        shouldRefinance: true
      }
    },
    {
      title: 'Cash-Out Refinance',
      description: 'Refinancing with 20% cash out for home improvements',
      inputs: {
        currentLoanAmount: 250000,
        currentInterestRate: 5.0,
        currentLoanTerm: 180,
        currentMonthlyPayment: 1340,
        propertyValue: 350000,
        newInterestRate: 4.75,
        newLoanTerm: 30,
        closingCosts: 4200,
        cashOutAmount: 50000,
        currentLoanBalance: 235000,
        timeToRefinance: 3,
        expectedStayDuration: 84,
        currentPropertyTaxes: 4200,
        currentHomeownersInsurance: 1400,
        currentPMI: 0,
        newPMI: 0,
        discountPoints: 1000,
        lenderCredits: 0,
        appraisalFee: 600,
        titleInsurance: 900,
        otherFees: 700,
        marketConditions: 'Rising',
        creditScore: 720,
        loanType: 'Conventional',
        refinanceType: 'Cash-Out',
        prepaymentPenalty: 2000,
        currentLoanOriginationDate: '2019-06-01'
      },
      expectedOutputs: {
        newMonthlyPayment: 1580,
        monthlySavings: -240,
        totalRefinanceCosts: 7200,
        breakEvenPeriod: 30,
        totalSavingsOverTime: -1200,
        shouldRefinance: false
      }
    }
  ]
};