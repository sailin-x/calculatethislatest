import { Calculator } from '../../../types/calculator';
import { PmiCancellationInputs, PmiCancellationOutputs } from './types';
import { calculatePmiCancellation } from './formulas';
import { validatePmiCancellationInputs, validatePmiCancellationBusinessRules } from './validation';

export const PmiCancellationCalculator: Calculator = {
  id: 'PmiCancellationCalculator',
  title: 'PMI Cancellation Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Analyze when and how to cancel private mortgage insurance (PMI), including automatic cancellation eligibility, lender cancellation options, break-even analysis, and cost-benefit comparisons.',
  usageInstructions: [
    'Enter current loan and property details',
    'Specify PMI payment information',
    'Input cancellation thresholds and costs',
    'Review recommendations and scenarios'
  ],

  inputs: [
    {
      id: 'originalLoanAmount',
      label: 'Original Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'The original amount borrowed'
    },
    {
      id: 'currentLoanBalance',
      label: 'Current Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current outstanding loan balance'
    },
    {
      id: 'originalLoanDate',
      label: 'Original Loan Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the loan was originated'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Current interest rate on the loan'
    },
    {
      id: 'originalPropertyValue',
      label: 'Original Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Property value at loan origination'
    },
    {
      id: 'currentPropertyValue',
      label: 'Current Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text',
      required: false,
      tooltip: 'Full property address for reference'
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      defaultValue: 0.5,
      tooltip: 'Annual PMI rate'
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
      id: 'monthlyPmiPayment',
      label: 'Monthly PMI Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current monthly PMI payment'
    },
    {
      id: 'currentEquity',
      label: 'Current Equity ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current equity in the property'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Current LTV ratio'
    },
    {
      id: 'monthsSinceOrigination',
      label: 'Months Since Origination',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Months since loan was originated'
    },
    {
      id: 'yearsSinceOrigination',
      label: 'Years Since Origination',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Years since loan was originated'
    },
    {
      id: 'automaticCancellationLtv',
      label: 'Automatic Cancellation LTV (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 78,
      tooltip: 'LTV threshold for automatic cancellation (typically 78% or 80%)'
    },
    {
      id: 'lenderCancellationLtv',
      label: 'Lender Cancellation LTV (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 75,
      tooltip: 'LTV threshold for lender cancellation (typically 75% or 77%)'
    },
    {
      id: 'appraisalFee',
      label: 'Appraisal Fee ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 400,
      tooltip: 'Cost of appraisal for cancellation'
    },
    {
      id: 'titleSearchFee',
      label: 'Title Search Fee ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 100,
      tooltip: 'Cost of title search'
    },
    {
      id: 'otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: 0,
      tooltip: 'Additional cancellation fees'
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 25,
      tooltip: 'Your marginal income tax rate'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 5,
      tooltip: 'State income tax rate'
    },
    {
      id: 'expectedPropertyAppreciation',
      label: 'Expected Annual Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 30,
      defaultValue: 3,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'expectedPayoffDate',
      label: 'Expected Payoff Date',
      type: 'date',
      required: false,
      tooltip: 'Expected date loan will be paid off'
    },
    {
      id: 'originalLoanTerm',
      label: 'Original Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Original term of the loan'
    },
    {
      id: 'remainingTerm',
      label: 'Remaining Term (Years)',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Years remaining on the loan'
    }
  ],

  outputs: [
    {
      id: 'currentLtvRatio',
      label: 'Current LTV Ratio (%)',
      type: 'percentage',
      explanation: 'Current loan-to-value ratio'
    },
    {
      id: 'equityPercentage',
      label: 'Equity Percentage (%)',
      type: 'percentage',
      explanation: 'Current equity as percentage of property value'
    },
    {
      id: 'monthsToAutomaticCancellation',
      label: 'Months to Automatic Cancellation',
      type: 'number',
      explanation: 'Months until automatic PMI cancellation eligibility'
    },
    {
      id: 'monthsToLenderCancellation',
      label: 'Months to Lender Cancellation',
      type: 'number',
      explanation: 'Months until lender PMI cancellation eligibility'
    },
    {
      id: 'monthlyPmiSavings',
      label: 'Monthly PMI Savings ($)',
      type: 'currency',
      explanation: 'Monthly savings from PMI cancellation'
    },
    {
      id: 'annualPmiSavings',
      label: 'Annual PMI Savings ($)',
      type: 'currency',
      explanation: 'Annual savings from PMI cancellation'
    },
    {
      id: 'totalPmiSavings',
      label: 'Total PMI Savings ($)',
      type: 'currency',
      explanation: 'Total savings over remaining loan term'
    },
    {
      id: 'lifetimePmiSavings',
      label: 'Lifetime PMI Savings ($)',
      type: 'currency',
      explanation: 'Total PMI paid over original loan term'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to recover cancellation costs'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to recover cancellation costs'
    },
    {
      id: 'totalCancellationCost',
      label: 'Total Cancellation Cost ($)',
      type: 'currency',
      explanation: 'Total cost to cancel PMI'
    },
    {
      id: 'netSavings',
      label: 'Net Savings ($)',
      type: 'currency',
      explanation: 'Net financial benefit from cancellation'
    },
    {
      id: 'taxSavingsFromCancellation',
      label: 'Tax Savings from Cancellation ($)',
      type: 'currency',
      explanation: 'Tax savings from PMI cancellation'
    },
    {
      id: 'afterTaxMonthlySavings',
      label: 'After-Tax Monthly Savings ($)',
      type: 'currency',
      explanation: 'Monthly savings after taxes'
    },
    {
      id: 'afterTaxAnnualSavings',
      label: 'After-Tax Annual Savings ($)',
      type: 'currency',
      explanation: 'Annual savings after taxes'
    },
    {
      id: 'projectedLtvAtAutomaticCancellation',
      label: 'Projected LTV at Auto Cancellation (%)',
      type: 'percentage',
      explanation: 'Projected LTV when automatic cancellation is reached'
    },
    {
      id: 'projectedLtvAtLenderCancellation',
      label: 'Projected LTV at Lender Cancellation (%)',
      type: 'percentage',
      explanation: 'Projected LTV when lender cancellation is reached'
    },
    {
      id: 'projectedEquityAtAutomaticCancellation',
      label: 'Projected Equity at Auto Cancellation ($)',
      type: 'currency',
      explanation: 'Projected equity when automatic cancellation is reached'
    },
    {
      id: 'projectedEquityAtLenderCancellation',
      label: 'Projected Equity at Lender Cancellation ($)',
      type: 'currency',
      explanation: 'Projected equity when lender cancellation is reached'
    },
    {
      id: 'costBenefitRatio',
      label: 'Cost-Benefit Ratio',
      type: 'number',
      explanation: 'Ratio of savings to costs'
    },
    {
      id: 'returnOnCancellationInvestment',
      label: 'Return on Cancellation Investment (%)',
      type: 'percentage',
      explanation: 'Return on investment for cancellation costs'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (Months)',
      type: 'number',
      explanation: 'Time to recover cancellation investment'
    },
    {
      id: 'recommendedAction',
      label: 'Recommended Action',
      type: 'text',
      explanation: 'Recommended course of action'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level',
      type: 'text',
      explanation: 'Confidence in the recommendation'
    },
    {
      id: 'rationale',
      label: 'Rationale',
      type: 'text',
      explanation: 'Reasoning behind the recommendation'
    },
    {
      id: 'automaticCancellationScenario',
      label: 'Automatic Cancellation Scenario',
      type: 'text',
      explanation: 'Analysis of waiting for automatic cancellation'
    },
    {
      id: 'lenderCancellationScenario',
      label: 'Lender Cancellation Scenario',
      type: 'text',
      explanation: 'Analysis of requesting lender cancellation'
    },
    {
      id: 'immediateCancellationScenario',
      label: 'Immediate Cancellation Scenario',
      type: 'text',
      explanation: 'Analysis of canceling PMI immediately'
    },
    {
      id: 'risksOfCancellation',
      label: 'Risks of Cancellation',
      type: 'text',
      explanation: 'Potential risks of canceling PMI'
    },
    {
      id: 'benefitsOfCancellation',
      label: 'Benefits of Cancellation',
      type: 'text',
      explanation: 'Benefits of canceling PMI'
    },
    {
      id: 'opportunityCostOfWaiting',
      label: 'Opportunity Cost of Waiting ($)',
      type: 'currency',
      explanation: 'Cost of waiting for natural cancellation'
    },
    {
      id: 'requiredDocuments',
      label: 'Required Documents',
      type: 'text',
      explanation: 'Documents needed for cancellation'
    },
    {
      id: 'estimatedProcessingTime',
      label: 'Estimated Processing Time (Days)',
      type: 'number',
      explanation: 'Expected time for cancellation processing'
    },
    {
      id: 'successRate',
      label: 'Success Rate (%)',
      type: 'percentage',
      explanation: 'Likelihood of successful cancellation'
    },
    {
      id: 'refinanceOption',
      label: 'Refinance Option Analysis',
      type: 'text',
      explanation: 'Analysis of refinancing as alternative'
    },
    {
      id: 'loanModificationOption',
      label: 'Loan Modification Option',
      type: 'text',
      explanation: 'Analysis of loan modification as alternative'
    },
    {
      id: 'monthlyCashFlowImprovement',
      label: 'Monthly Cash Flow Improvement ($)',
      type: 'currency',
      explanation: 'Improvement in monthly cash flow'
    },
    {
      id: 'annualCashFlowImprovement',
      label: 'Annual Cash Flow Improvement ($)',
      type: 'currency',
      explanation: 'Improvement in annual cash flow'
    },
    {
      id: 'totalCashFlowImprovement',
      label: 'Total Cash Flow Improvement ($)',
      type: 'currency',
      explanation: 'Total improvement over loan term'
    },
    {
      id: 'equityBuildRate',
      label: 'Monthly Equity Build Rate ($)',
      type: 'currency',
      explanation: 'Monthly equity accumulation'
    },
    {
      id: 'loanPaydownRate',
      label: 'Monthly Loan Paydown Rate ($)',
      type: 'currency',
      explanation: 'Monthly principal reduction'
    },
    {
      id: 'remainingPrincipal',
      label: 'Remaining Principal ($)',
      type: 'currency',
      explanation: 'Current remaining loan balance'
    },
    {
      id: 'currentMarketValue',
      label: 'Current Market Value ($)',
      type: 'currency',
      explanation: 'Current property market value'
    },
    {
      id: 'marketTrend',
      label: 'Market Trend',
      type: 'text',
      explanation: 'Current market trend assessment'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility',
      type: 'text',
      explanation: 'Assessment of market volatility'
    },
    {
      id: 'federalProtections',
      label: 'Federal Protections',
      type: 'text',
      explanation: 'Federal consumer protections'
    },
    {
      id: 'stateSpecificRequirements',
      label: 'State-Specific Requirements',
      type: 'text',
      explanation: 'State-specific PMI requirements'
    },
    {
      id: 'lenderSpecificPolicies',
      label: 'Lender-Specific Policies',
      type: 'text',
      explanation: 'Lender-specific cancellation policies'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard Conventional Loan PMI Cancellation',
      description: 'Analysis for a conventional loan with PMI eligible for automatic cancellation',
      inputs: {
        originalLoanAmount: 300000,
        currentLoanBalance: 250000,
        originalLoanDate: '2020-01-15',
        interestRate: 4.5,
        originalPropertyValue: 375000,
        currentPropertyValue: 400000,
        pmiRate: 0.5,
        monthlyPmiPayment: 125,
        loanToValueRatio: 62.5,
        monthsSinceOrigination: 48,
        yearsSinceOrigination: 4,
        automaticCancellationLtv: 78,
        lenderCancellationLtv: 75,
        appraisalFee: 400,
        titleSearchFee: 100,
        otherFees: 50,
        marginalTaxRate: 25,
        stateTaxRate: 5,
        expectedPropertyAppreciation: 3,
        originalLoanTerm: 30,
        remainingTerm: 26
      },
      expectedOutputs: {
        currentLtvRatio: 62.5,
        monthsToAutomaticCancellation: 0,
        monthlyPmiSavings: 125,
        totalCancellationCost: 550,
        breakEvenMonths: 5,
        recommendedAction: 'Cancel Now'
      }
    },
    {
      title: 'High LTV Loan Awaiting Natural Cancellation',
      description: 'Analysis for a loan still building equity toward cancellation threshold',
      inputs: {
        originalLoanAmount: 360000,
        currentLoanBalance: 340000,
        originalLoanDate: '2022-03-01',
        interestRate: 6.0,
        originalPropertyValue: 400000,
        currentPropertyValue: 380000,
        pmiRate: 0.8,
        monthlyPmiPayment: 240,
        loanToValueRatio: 89.5,
        monthsSinceOrigination: 24,
        yearsSinceOrigination: 2,
        automaticCancellationLtv: 78,
        lenderCancellationLtv: 75,
        appraisalFee: 450,
        titleSearchFee: 125,
        otherFees: 75,
        marginalTaxRate: 30,
        stateTaxRate: 6,
        expectedPropertyAppreciation: 2,
        originalLoanTerm: 30,
        remainingTerm: 28
      },
      expectedOutputs: {
        currentLtvRatio: 89.5,
        monthsToAutomaticCancellation: 18,
        monthlyPmiSavings: 240,
        totalCancellationCost: 650,
        breakEvenMonths: 3,
        recommendedAction: 'Request Lender Cancellation'
      }
    }
  ]
};