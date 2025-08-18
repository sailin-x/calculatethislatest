import { Calculator } from '../../types/calculator';
import { calculateCashOutRefinance, generateRefinanceAnalysis } from './formulas';
import { validateCashOutRefinanceInputs } from './validation';

export const CashOutRefinanceCalculator: Calculator = {
  id: 'cash-out-refinance-calculator',
  name: 'Cash-Out Refinance Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate cash-out refinance options, new loan terms, cash received, and payment comparisons.',
  
  inputs: [
    {
      id: 'currentHomeValue',
      name: 'Current Home Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of your home',
      placeholder: '450000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'currentLoanBalance',
      name: 'Current Loan Balance',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Remaining balance on your current mortgage',
      placeholder: '280000',
      min: 1000,
      max: 5000000
    },
    {
      id: 'currentInterestRate',
      name: 'Current Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Current mortgage interest rate',
      placeholder: '4.25',
      min: 1,
      max: 15
    },
    {
      id: 'currentMonthlyPayment',
      name: 'Current Monthly Payment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current monthly principal and interest payment',
      placeholder: '1375',
      min: 100,
      max: 50000
    },
    {
      id: 'currentLoanTerm',
      name: 'Current Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Remaining years on current mortgage',
      placeholder: '22',
      min: 1,
      max: 30
    },
    {
      id: 'newLoanAmount',
      name: 'New Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total new loan amount (including cash-out)',
      placeholder: '360000',
      min: 1000,
      max: 5000000
    },
    {
      id: 'newInterestRate',
      name: 'New Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'New mortgage interest rate',
      placeholder: '5.5',
      min: 1,
      max: 15
    },
    {
      id: 'newLoanTerm',
      name: 'New Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'New loan term in years',
      placeholder: '30',
      min: 5,
      max: 30
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Total closing costs for the refinance',
      placeholder: '8000',
      min: 0,
      max: 50000,
      default: 0
    },
    {
      id: 'cashOutAmount',
      name: 'Cash-Out Amount',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Amount of cash you want to receive',
      placeholder: '80000',
      min: 0,
      max: 2000000,
      default: 0
    },
    {
      id: 'propertyTax',
      name: 'Property Tax',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual property tax',
      placeholder: '5400',
      min: 0,
      max: 100000,
      default: 0
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'number',
      unit: 'USD/year',
      required: false,
      description: 'Annual homeowners insurance',
      placeholder: '1800',
      min: 0,
      max: 50000,
      default: 0
    },
    {
      id: 'pmi',
      name: 'PMI',
      type: 'number',
      unit: 'USD/month',
      required: false,
      description: 'Monthly PMI payment (if applicable)',
      placeholder: '0',
      min: 0,
      max: 1000,
      default: 0
    },
    {
      id: 'hoaFees',
      name: 'HOA Fees',
      type: 'number',
      unit: 'USD/month',
      required: false,
      description: 'Monthly HOA fees',
      placeholder: '0',
      min: 0,
      max: 2000,
      default: 0
    },
    {
      id: 'investmentReturn',
      name: 'Investment Return',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual return if cash is invested',
      placeholder: '7.0',
      min: 0,
      max: 20,
      default: 7.0
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Your marginal tax rate for interest deduction',
      placeholder: '22.0',
      min: 0,
      max: 50,
      default: 22.0
    }
  ],
  
  outputs: [
    {
      id: 'currentEquity',
      name: 'Current Equity',
      type: 'number',
      unit: 'USD',
      description: 'Current home equity (value minus loan balance)'
    },
    {
      id: 'newMonthlyPayment',
      name: 'New Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'New monthly principal and interest payment'
    },
    {
      id: 'paymentDifference',
      name: 'Payment Difference',
      type: 'number',
      unit: 'USD',
      description: 'Difference between new and current monthly payments'
    },
    {
      id: 'netCashReceived',
      name: 'Net Cash Received',
      type: 'number',
      unit: 'USD',
      description: 'Cash received after closing costs'
    },
    {
      id: 'newLoanToValue',
      name: 'New Loan-to-Value',
      type: 'number',
      unit: '%',
      description: 'New loan-to-value ratio'
    },
    {
      id: 'totalInterestPaid',
      name: 'Total Interest Paid',
      type: 'number',
      unit: 'USD',
      description: 'Total interest paid over the new loan term'
    },
    {
      id: 'breakEvenMonths',
      name: 'Break-Even Months',
      type: 'number',
      unit: 'months',
      description: 'Months to break even on closing costs'
    },
    {
      id: 'monthlySavings',
      name: 'Monthly Savings',
      type: 'number',
      unit: 'USD',
      description: 'Monthly payment savings (if any)'
    },
    {
      id: 'annualSavings',
      name: 'Annual Savings',
      type: 'number',
      unit: 'USD',
      description: 'Annual payment savings (if any)'
    },
    {
      id: 'investmentOpportunity',
      name: 'Investment Opportunity',
      type: 'number',
      unit: 'USD',
      description: 'Potential investment returns on cash-out amount'
    },
    {
      id: 'afterTaxCost',
      name: 'After-Tax Cost',
      type: 'number',
      unit: 'USD',
      description: 'Monthly payment after tax deduction'
    },
    {
      id: 'refinanceGrade',
      name: 'Refinance Grade',
      type: 'string',
      description: 'Assessment of refinance opportunity'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'string',
      description: 'Assessment of refinance risks'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Refinance recommendations and strategies'
    }
  ],
  
  calculate: (inputs: Record<string, any>): Record<string, any> => {
    // Validate inputs
    const validation = validateCashOutRefinanceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }
    
    // Calculate cash-out refinance metrics
    const refinanceMetrics = calculateCashOutRefinance(inputs);
    
    // Generate analysis
    const analysis = generateRefinanceAnalysis(inputs, refinanceMetrics);
    
    return {
      currentEquity: refinanceMetrics.currentEquity,
      newMonthlyPayment: refinanceMetrics.newMonthlyPayment,
      paymentDifference: refinanceMetrics.paymentDifference,
      netCashReceived: refinanceMetrics.netCashReceived,
      newLoanToValue: refinanceMetrics.newLoanToValue,
      totalInterestPaid: refinanceMetrics.totalInterestPaid,
      breakEvenMonths: refinanceMetrics.breakEvenMonths,
      monthlySavings: refinanceMetrics.monthlySavings,
      annualSavings: refinanceMetrics.annualSavings,
      investmentOpportunity: refinanceMetrics.investmentOpportunity,
      afterTaxCost: refinanceMetrics.afterTaxCost,
      refinanceGrade: analysis.refinanceGrade,
      riskAssessment: analysis.riskAssessment,
      recommendations: analysis.recommendations
    };
  },
  
  formulas: [
    {
      name: 'Current Equity',
      formula: 'Current Equity = Home Value - Current Loan Balance',
      description: 'Calculates your current home equity'
    },
    {
      name: 'New Loan-to-Value',
      formula: 'LTV = (New Loan Amount / Home Value) × 100',
      description: 'Calculates the new loan-to-value ratio'
    },
    {
      name: 'Net Cash Received',
      formula: 'Net Cash = Cash-Out Amount - Closing Costs',
      description: 'Calculates cash received after closing costs'
    },
    {
      name: 'Break-Even Analysis',
      formula: 'Break-Even = Closing Costs / Monthly Savings',
      description: 'Calculates months to recover closing costs'
    },
    {
      name: 'After-Tax Cost',
      formula: 'After-Tax = Monthly Payment × (1 - Tax Rate)',
      description: 'Calculates payment after tax deduction'
    }
  ],
  
  examples: [
    {
      name: 'Typical Cash-Out Refinance',
      description: 'A homeowner refinancing to access equity for home improvements',
      inputs: {
        currentHomeValue: 450000,
        currentLoanBalance: 280000,
        currentInterestRate: 4.25,
        currentMonthlyPayment: 1375,
        currentLoanTerm: 22,
        newLoanAmount: 360000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        closingCosts: 8000,
        cashOutAmount: 80000,
        propertyTax: 5400,
        insurance: 1800,
        pmi: 0,
        hoaFees: 0,
        investmentReturn: 7.0,
        taxRate: 22.0
      },
      expectedOutputs: {
        currentEquity: 170000,
        newMonthlyPayment: 2044,
        paymentDifference: 669,
        netCashReceived: 72000,
        newLoanToValue: 80.0,
        totalInterestPaid: 375840,
        breakEvenMonths: 12.0,
        monthlySavings: 0,
        annualSavings: 0,
        investmentOpportunity: 5040,
        afterTaxCost: 1594
      }
    },
    {
      name: 'Rate Reduction with Cash-Out',
      description: 'Refinancing to lower rate while accessing equity',
      inputs: {
        currentHomeValue: 600000,
        currentLoanBalance: 400000,
        currentInterestRate: 6.0,
        currentMonthlyPayment: 2400,
        currentLoanTerm: 25,
        newLoanAmount: 480000,
        newInterestRate: 5.0,
        newLoanTerm: 30,
        closingCosts: 10000,
        cashOutAmount: 80000,
        propertyTax: 7200,
        insurance: 2400,
        pmi: 0,
        hoaFees: 0,
        investmentReturn: 7.0,
        taxRate: 24.0
      },
      expectedOutputs: {
        currentEquity: 200000,
        newMonthlyPayment: 2577,
        paymentDifference: 177,
        netCashReceived: 70000,
        newLoanToValue: 80.0,
        totalInterestPaid: 447720,
        breakEvenMonths: 56.5,
        monthlySavings: 0,
        annualSavings: 0,
        investmentOpportunity: 4900,
        afterTaxCost: 1959
      }
    }
  ]
};
