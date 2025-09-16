import { Calculator } from '../../../types/calculator';
import { calculateMortgageRefinance, validateMortgageRefinanceInputs } from './formulas';

export const MortgageRefinanceCalculator: Calculator = {
  id: 'mortgage-refinance-calculator',
  title: 'Mortgage Refinance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate mortgage refinance costs, savings, and break-even analysis to determine if refinancing makes financial sense.',
  usageInstructions: [
    'Enter your current mortgage details and new loan terms',
    'Include all refinance costs and fees',
    'Compare monthly payment savings and total costs',
    'Determine break-even point and long-term savings'
  ],
  inputs: [
    // Current Mortgage Information
    { id: 'currentLoanBalance', label: 'Current Loan Balance', type: 'currency', required: true, placeholder: '250000', tooltip: 'Remaining balance on your current mortgage' },
    { id: 'currentRate', label: 'Current Interest Rate (%)', type: 'percentage', required: true, placeholder: '6.5', tooltip: 'Your current mortgage interest rate' },
    { id: 'currentTermRemaining', label: 'Years Remaining on Current Loan', type: 'number', required: true, placeholder: '25', tooltip: 'Years left on your current mortgage' },

    // New Loan Information
    { id: 'newLoanAmount', label: 'New Loan Amount', type: 'currency', required: true, placeholder: '250000', tooltip: 'Amount of the new refinance loan' },
    { id: 'newRate', label: 'New Interest Rate (%)', type: 'percentage', required: true, placeholder: '5.5', tooltip: 'Interest rate on the new loan' },
    { id: 'newTerm', label: 'New Loan Term (Years)', type: 'number', required: true, placeholder: '30', tooltip: 'Term length of the new loan' },

    // Refinance Costs
    { id: 'closingCosts', label: 'Closing Costs', type: 'currency', required: false, placeholder: '5000', tooltip: 'Total closing costs for the refinance' },
    { id: 'appraisalFee', label: 'Appraisal Fee', type: 'currency', required: false, placeholder: '500', tooltip: 'Cost of the home appraisal' },
    { id: 'titleInsurance', label: 'Title Insurance', type: 'currency', required: false, placeholder: '1000', tooltip: 'Cost of title insurance' },
    { id: 'originationFee', label: 'Origination Fee', type: 'currency', required: false, placeholder: '2000', tooltip: 'Loan origination fee' },

    // Additional Options
    { id: 'cashOut', label: 'Cash Out Amount', type: 'currency', required: false, placeholder: '0', tooltip: 'Amount of cash you want to take out' },
    { id: 'points', label: 'Discount Points', type: 'number', required: false, placeholder: '0', tooltip: 'Number of discount points purchased' },
    { id: 'pointCost', label: 'Cost Per Point', type: 'currency', required: false, placeholder: '2500', tooltip: 'Cost per discount point' },

    // Analysis Options
    { id: 'homeValue', label: 'Current Home Value', type: 'currency', required: false, placeholder: '350000', tooltip: 'Current market value of your home' },
    { id: 'yearsToStay', label: 'Years You Plan to Stay', type: 'number', required: false, placeholder: '10', tooltip: 'How many years you plan to own the home' }
  ],
  outputs: [
    { id: 'currentMonthlyPayment', label: 'Current Monthly Payment', type: 'currency', explanation: 'Your current monthly mortgage payment' },
    { id: 'newMonthlyPayment', label: 'New Monthly Payment', type: 'currency', explanation: 'Monthly payment on the refinanced loan' },
    { id: 'monthlySavings', label: 'Monthly Savings', type: 'currency', explanation: 'Monthly savings from refinancing' },
    { id: 'totalRefinanceCosts', label: 'Total Refinance Costs', type: 'currency', explanation: 'All costs associated with refinancing' },
    { id: 'breakEvenMonths', label: 'Break-Even Period (Months)', type: 'number', explanation: 'Months needed to recover refinance costs' },
    { id: 'breakEvenYears', label: 'Break-Even Period (Years)', type: 'number', explanation: 'Years needed to recover refinance costs' },
    { id: 'totalSavings5Years', label: '5-Year Savings', type: 'currency', explanation: 'Total savings over 5 years' },
    { id: 'totalSavings10Years', label: '10-Year Savings', type: 'currency', explanation: 'Total savings over 10 years' },
    { id: 'totalSavingsRemaining', label: 'Total Savings Over Loan Term', type: 'currency', explanation: 'Total savings over remaining loan term' },
    { id: 'roiPercentage', label: 'ROI on Refinance (%)', type: 'percentage', explanation: 'Return on investment from refinancing' },
    { id: 'newLoanToValue', label: 'New Loan-to-Value Ratio (%)', type: 'percentage', explanation: 'LTV ratio after refinance' },
    { id: 'recommendation', label: 'Refinance Recommendation', type: 'text', explanation: 'Whether refinancing is recommended based on analysis' }
  ],
  formulas: [calculateMortgageRefinance as any],
  validationRules: [validateMortgageRefinanceInputs as any],
  examples: [
    {
      title: 'Rate Reduction Refinance',
      description: 'Refinancing to lower interest rate with minimal cash out',
      inputs: {
        currentLoanBalance: 250000,
        currentRate: 6.5,
        currentTermRemaining: 25,
        newLoanAmount: 250000,
        newRate: 5.5,
        newTerm: 25,
        closingCosts: 5000,
        originationFee: 2000,
        appraisalFee: 500,
        titleInsurance: 1000,
        cashOut: 0,
        points: 0,
        pointCost: 2500,
        homeValue: 350000,
        yearsToStay: 10
      },
      expectedOutputs: {
        currentMonthlyPayment: 1658,
        newMonthlyPayment: 1435,
        monthlySavings: 223,
        totalRefinanceCosts: 8500,
        breakEvenMonths: 38,
        breakEvenYears: 3.2,
        totalSavings5Years: 66900,
        totalSavings10Years: 144300,
        totalSavingsRemaining: 144300,
        roiPercentage: 1597,
        newLoanToValue: 71.4,
        recommendation: 'Consider carefully - longer break-even period'
      }
    }
  ]
};