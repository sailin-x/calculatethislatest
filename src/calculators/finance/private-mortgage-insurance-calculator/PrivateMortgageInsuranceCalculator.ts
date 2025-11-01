import { Calculator } from '../../../types/calculator';
import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs } from './types';
import { calculatePrivateMortgageInsurance } from './formulas';
import { validatePrivateMortgageInsuranceInputs, validatePrivateMortgageInsuranceBusinessRules } from './validation';

export const PrivateMortgageInsuranceCalculator: Calculator = {
  id: 'PrivateMortgageInsuranceCalculator',
  title: 'Private Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate and analyze private mortgage insurance (PMI) costs, cancellation options, tax implications, and refinancing alternatives for FHA, conventional, VA, and USDA loans.',
  usageInstructions: [
    'Enter loan details and borrower information',
    'Select loan type and PMI parameters',
    'Input market conditions and tax information',
    'Review PMI costs, cancellation dates, and recommendations'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount'
    },
    {
      id: 'downPaymentAmount',
      label: 'Down Payment Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Down payment amount'
    },
    {
      id: 'downPaymentPercentage',
      label: 'Down Payment Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Down payment as percentage of property value'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current loan balance as percentage of property value'
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
        { value: 'USDA', label: 'USDA' },
        { value: 'Portfolio', label: 'Portfolio' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current appraised value of the property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Single Family', label: 'Single Family' },
        { value: 'Condo', label: 'Condo' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Multi-Family', label: 'Multi-Family' }
      ],
      tooltip: 'Type of property'
    },
    {
      id: 'propertyLocation',
      label: 'Property Location',
      type: 'select',
      required: false,
      options: [
        { value: 'Urban', label: 'Urban' },
        { value: 'Suburban', label: 'Suburban' },
        { value: 'Rural', label: 'Rural' }
      ],
      defaultValue: 'Suburban',
      tooltip: 'Location type of the property'
    },
    {
      id: 'propertyState',
      label: 'Property State',
      type: 'text',
      required: false,
      tooltip: 'State where property is located'
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'FICO credit score'
    },
    {
      id: 'borrowerIncome',
      label: 'Annual Borrower Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual gross income'
    },
    {
      id: 'borrowerDebtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Current debt obligations as percentage of income'
    },
    {
      id: 'numberOfUnits',
      label: 'Number of Units',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      defaultValue: 1,
      tooltip: 'Number of residential units in property'
    },
    {
      id: 'pmiType',
      label: 'PMI Type',
      type: 'select',
      required: false,
      options: [
        { value: 'Borrower Paid', label: 'Borrower Paid' },
        { value: 'Lender Paid', label: 'Lender Paid' },
        { value: 'Split', label: 'Split' }
      ],
      defaultValue: 'Borrower Paid',
      tooltip: 'Who pays the PMI premium'
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Annual PMI rate'
    },
    {
      id: 'pmiTerm',
      label: 'PMI Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Expected duration of PMI payments'
    },
    {
      id: 'upfrontMip',
      label: 'FHA Upfront MIP (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'FHA upfront mortgage insurance premium'
    },
    {
      id: 'marketRate',
      label: 'Current Market Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.125,
      tooltip: 'Current market interest rate'
    },
    {
      id: 'marketTrend',
      label: 'Market Trend',
      type: 'select',
      required: false,
      options: [
        { value: 'Stable', label: 'Stable' },
        { value: 'Increasing', label: 'Increasing' },
        { value: 'Decreasing', label: 'Decreasing' }
      ],
      defaultValue: 'Stable',
      tooltip: 'Current market trend'
    },
    {
      id: 'includeCancellationAnalysis',
      label: 'Include Cancellation Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include PMI cancellation analysis'
    },
    {
      id: 'includeTaxAnalysis',
      label: 'Include Tax Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include tax implications analysis'
    },
    {
      id: 'includeRefinanceAnalysis',
      label: 'Include Refinance Analysis',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether to include refinance alternatives analysis'
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Federal marginal tax rate'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      tooltip: 'State income tax rate'
    },
    {
      id: 'refinanceInterestRate',
      label: 'Refinance Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.125,
      tooltip: 'Interest rate for refinance option'
    },
    {
      id: 'refinanceClosingCosts',
      label: 'Refinance Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Estimated closing costs for refinance'
    },
    {
      id: 'refinanceTerm',
      label: 'Refinance Term (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      tooltip: 'Term for refinance loan'
    },
    {
      id: 'loanOriginationDate',
      label: 'Loan Origination Date',
      type: 'date',
      required: true,
      tooltip: 'Date the loan was originated'
    },
    {
      id: 'analysisDate',
      label: 'Analysis Date',
      type: 'date',
      required: true,
      tooltip: 'Date of this analysis'
    },
    {
      id: 'expectedPayoffDate',
      label: 'Expected Payoff Date',
      type: 'date',
      required: false,
      tooltip: 'Expected date loan will be paid off'
    }
  ],

  outputs: [
    {
      id: 'monthlyPmiPayment',
      label: 'Monthly PMI Payment ($)',
      type: 'currency',
      explanation: 'Monthly private mortgage insurance payment'
    },
    {
      id: 'annualPmiPayment',
      label: 'Annual PMI Payment ($)',
      type: 'currency',
      explanation: 'Annual private mortgage insurance payment'
    },
    {
      id: 'totalPmiCost',
      label: 'Total PMI Cost ($)',
      type: 'currency',
      explanation: 'Total cost of PMI over the term'
    },
    {
      id: 'pmiCostAsPercentageOfLoan',
      label: 'PMI Cost as % of Loan',
      type: 'percentage',
      explanation: 'PMI cost as percentage of total loan amount'
    },
    {
      id: 'upfrontMipAmount',
      label: 'FHA Upfront MIP Amount ($)',
      type: 'currency',
      explanation: 'FHA upfront mortgage insurance premium amount'
    },
    {
      id: 'monthlyMipPayment',
      label: 'Monthly FHA MIP Payment ($)',
      type: 'currency',
      explanation: 'Monthly FHA mortgage insurance payment'
    },
    {
      id: 'totalMipCost',
      label: 'Total FHA MIP Cost ($)',
      type: 'currency',
      explanation: 'Total FHA mortgage insurance cost'
    },
    {
      id: 'automaticCancellationDate',
      label: 'Automatic Cancellation Date',
      type: 'text',
      explanation: 'Date when PMI can be automatically canceled (78% LTV)'
    },
    {
      id: 'lenderCancellationDate',
      label: 'Lender Cancellation Date',
      type: 'text',
      explanation: 'Date when lender can cancel PMI (75% LTV)'
    },
    {
      id: 'monthsToAutomaticCancellation',
      label: 'Months to Auto Cancellation',
      type: 'number',
      explanation: 'Months until automatic PMI cancellation'
    },
    {
      id: 'monthsToLenderCancellation',
      label: 'Months to Lender Cancellation',
      type: 'number',
      explanation: 'Months until lender PMI cancellation'
    },
    {
      id: 'cancellationSavings',
      label: 'Cancellation Savings ($)',
      type: 'currency',
      explanation: 'Estimated savings from PMI cancellation'
    },
    {
      id: 'breakEvenPeriodMonths',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to break even on cancellation costs'
    },
    {
      id: 'breakEvenPeriodYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to break even on cancellation costs'
    },
    {
      id: 'breakEvenLoanBalance',
      label: 'Break-Even Loan Balance ($)',
      type: 'currency',
      explanation: 'Loan balance at break-even point'
    },
    {
      id: 'taxDeductiblePmi',
      label: 'Tax Deductible PMI ($)',
      type: 'currency',
      explanation: 'PMI amount that may be tax deductible'
    },
    {
      id: 'afterTaxMonthlyPmi',
      label: 'After-Tax Monthly PMI ($)',
      type: 'currency',
      explanation: 'Monthly PMI payment after tax deduction'
    },
    {
      id: 'afterTaxAnnualPmi',
      label: 'After-Tax Annual PMI ($)',
      type: 'currency',
      explanation: 'Annual PMI payment after tax deduction'
    },
    {
      id: 'taxSavingsFromPmi',
      label: 'Tax Savings from PMI ($)',
      type: 'currency',
      explanation: 'Tax savings from PMI deduction'
    },
    {
      id: 'refinanceSavings',
      label: 'Refinance Savings ($)',
      type: 'currency',
      explanation: 'Potential savings from refinancing'
    },
    {
      id: 'refinancePaybackPeriod',
      label: 'Refinance Payback Period (Months)',
      type: 'number',
      explanation: 'Months to recover refinance costs'
    },
    {
      id: 'refinanceNetBenefit',
      label: 'Refinance Net Benefit ($)',
      type: 'currency',
      explanation: 'Net financial benefit of refinancing'
    },
    {
      id: 'defaultRiskScore',
      label: 'Default Risk Score (0-100)',
      type: 'number',
      explanation: 'Risk score for loan default'
    },
    {
      id: 'prepaymentRiskScore',
      label: 'Prepayment Risk Score (0-100)',
      type: 'number',
      explanation: 'Risk score for loan prepayment'
    },
    {
      id: 'overallRiskAssessment',
      label: 'Overall Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment for the loan'
    },
    {
      id: 'monthlyPaymentDifference',
      label: 'Monthly Payment Difference ($)',
      type: 'currency',
      explanation: 'Difference between PMI and non-PMI payments'
    },
    {
      id: 'totalCostDifference',
      label: 'Total Cost Difference ($)',
      type: 'currency',
      explanation: 'Total cost difference with and without PMI'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point (Months)',
      type: 'number',
      explanation: 'Months to break even between loan types'
    },
    {
      id: 'currentMarketPmiRate',
      label: 'Current Market PMI Rate (%)',
      type: 'percentage',
      explanation: 'Current market PMI rate for similar loans'
    },
    {
      id: 'rateComparisonToMarket',
      label: 'Rate vs Market (%)',
      type: 'percentage',
      explanation: 'Comparison of rate to market average'
    },
    {
      id: 'rateCompetitiveness',
      label: 'Rate Competitiveness',
      type: 'text',
      explanation: 'How competitive the PMI rate is'
    },
    {
      id: 'cashFlowImpactMonthly',
      label: 'Monthly Cash Flow Impact ($)',
      type: 'currency',
      explanation: 'Monthly impact on cash flow'
    },
    {
      id: 'cashFlowImpactAnnual',
      label: 'Annual Cash Flow Impact ($)',
      type: 'currency',
      explanation: 'Annual impact on cash flow'
    },
    {
      id: 'affordabilityRatio',
      label: 'Affordability Ratio (%)',
      type: 'percentage',
      explanation: 'PMI payment as percentage of income'
    },
    {
      id: 'roi',
      label: 'PMI ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment for PMI protection'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (Years)',
      type: 'number',
      explanation: 'Years to recover PMI costs through protection'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value ($)',
      type: 'currency',
      explanation: 'Net present value of PMI investment'
    },
    {
      id: 'fhaMipRefundEligibility',
      label: 'FHA MIP Refund Eligible',
      type: 'text',
      explanation: 'Eligibility for FHA MIP refund'
    },
    {
      id: 'fhaMipRefundAmount',
      label: 'FHA MIP Refund Amount ($)',
      type: 'currency',
      explanation: 'Amount of FHA MIP refund'
    },
    {
      id: 'fhaMipRefundDate',
      label: 'FHA MIP Refund Date',
      type: 'text',
      explanation: 'Date when FHA MIP refund is available'
    },
    {
      id: 'totalSavings',
      label: 'Total Savings ($)',
      type: 'currency',
      explanation: 'Total potential savings from optimal strategy'
    },
    {
      id: 'optimalCancellationDate',
      label: 'Optimal Cancellation Date',
      type: 'text',
      explanation: 'Best date to cancel PMI'
    },
    {
      id: 'totalCost',
      label: 'Total Cost ($)',
      type: 'currency',
      explanation: 'Total cost in worst case scenario'
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'text',
      explanation: 'Key risk factors to consider'
    },
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Recommended approach for PMI'
    },
    {
      id: 'actionItems',
      label: 'Action Items',
      type: 'text',
      explanation: 'Recommended actions to take'
    },
    {
      id: 'timeline',
      label: 'Timeline',
      type: 'text',
      explanation: 'Timeline for recommended actions'
    },
    {
      id: 'equityBuildRate',
      label: 'Annual Equity Build Rate ($)',
      type: 'currency',
      explanation: 'Annual rate of equity accumulation'
    },
    {
      id: 'timeTo80Ltv',
      label: 'Time to 80% LTV (Months)',
      type: 'number',
      explanation: 'Months to reach 80% loan-to-value ratio'
    },
    {
      id: 'timeTo78Ltv',
      label: 'Time to 78% LTV (Months)',
      type: 'number',
      explanation: 'Months to reach 78% loan-to-value ratio'
    },
    {
      id: 'lenderPmiRequirements',
      label: 'Lender PMI Requirements',
      type: 'text',
      explanation: 'Lender requirements for PMI'
    },
    {
      id: 'lenderCancellationPolicy',
      label: 'Lender Cancellation Policy',
      type: 'text',
      explanation: 'Lender policy for PMI cancellation'
    },
    {
      id: 'statePmiLaws',
      label: 'State PMI Laws',
      type: 'text',
      explanation: 'State-specific PMI regulations'
    },
    {
      id: 'stateCancellationRequirements',
      label: 'State Cancellation Requirements',
      type: 'text',
      explanation: 'State requirements for PMI cancellation'
    },
    {
      id: 'pmiFacts',
      label: 'PMI Facts',
      type: 'text',
      explanation: 'Important facts about PMI'
    },
    {
      id: 'cancellationTips',
      label: 'Cancellation Tips',
      type: 'text',
      explanation: 'Tips for canceling PMI'
    },
    {
      id: 'lenderNegotiationTips',
      label: 'Lender Negotiation Tips',
      type: 'text',
      explanation: 'Tips for negotiating with lender'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conventional Loan PMI Analysis',
      description: 'Analysis of PMI for a conventional loan with 20% down payment',
      inputs: {
        loanAmount: 320000,
        downPaymentAmount: 80000,
        downPaymentPercentage: 20,
        loanToValueRatio: 80,
        loanType: 'Conventional',
        propertyValue: 400000,
        propertyType: 'Single Family',
        propertyLocation: 'Suburban',
        propertyState: 'CA',
        borrowerCreditScore: 750,
        borrowerIncome: 120000,
        borrowerDebtToIncomeRatio: 35,
        numberOfUnits: 1,
        pmiType: 'Borrower Paid',
        pmiRate: 0.55,
        pmiTerm: 30,
        upfrontMip: 0,
        marketRate: 6.5,
        marketTrend: 'Stable',
        includeCancellationAnalysis: true,
        includeTaxAnalysis: true,
        includeRefinanceAnalysis: false,
        marginalTaxRate: 24,
        stateTaxRate: 9.3,
        loanOriginationDate: '2023-01-15',
        analysisDate: '2024-01-15'
      },
      expectedOutputs: {
        monthlyPmiPayment: 147,
        annualPmiPayment: 1764,
        totalPmiCost: 52920,
        automaticCancellationDate: '2028-01-15',
        lenderCancellationDate: '2027-01-15',
        recommendedStrategy: 'Cancel When Eligible'
      }
    },
    {
      title: 'FHA Loan MIP Analysis',
      description: 'Analysis of FHA mortgage insurance premium for first-time homebuyer',
      inputs: {
        loanAmount: 360000,
        downPaymentAmount: 18000,
        downPaymentPercentage: 3.5,
        loanToValueRatio: 96.5,
        loanType: 'FHA',
        propertyValue: 375000,
        propertyType: 'Single Family',
        propertyLocation: 'Urban',
        propertyState: 'TX',
        borrowerCreditScore: 680,
        borrowerIncome: 85000,
        borrowerDebtToIncomeRatio: 38,
        numberOfUnits: 1,
        pmiType: 'Borrower Paid',
        pmiRate: 0.80,
        pmiTerm: 30,
        upfrontMip: 1.75,
        marketRate: 6.75,
        marketTrend: 'Stable',
        includeCancellationAnalysis: true,
        includeTaxAnalysis: true,
        includeRefinanceAnalysis: false,
        marginalTaxRate: 22,
        stateTaxRate: 0,
        loanOriginationDate: '2023-06-01',
        analysisDate: '2024-01-15'
      },
      expectedOutputs: {
        upfrontMipAmount: 6300,
        monthlyMipPayment: 240,
        totalMipCost: 96300,
        automaticCancellationDate: '2029-06-01',
        lenderCancellationDate: '2028-06-01',
        recommendedStrategy: 'Keep PMI'
      }
    }
  ]
};