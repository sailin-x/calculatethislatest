import { Calculator } from '../../types/calculator';
import { CostOfDebtInputs, CostOfDebtOutputs } from './types';
import { calculateCostOfDebtMetrics } from './formulas';
import { validateCostOfDebtInputs, validateCostOfDebtBusinessRules } from './validation';

export const CostOfDebtCalculator: Calculator = {
  id: 'CostOfDebtCalculator',
  title: 'Cost of Debt Calculator',
  category: 'finance',
  subcategory: 'Capital Structure & Valuation',
  description: 'Comprehensive cost of debt analysis calculator with bond yields, loan rates, credit spreads, tax shields, and weighted average cost calculations for optimal capital structure decisions.',
  usageInstructions: [
    'Enter bond details and market pricing information',
    'Input bank loan and credit facility terms',
    'Specify preferred stock dividend information',
    'Provide company financial ratios and credit rating',
    'Select calculation method and weighting approach',
    'Review weighted average cost and tax shield benefits',
    'Analyze debt capacity and regulatory compliance'
  ],

  inputs: [
    {
      id: 'bondFaceValue',
      label: 'Bond Face Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Par value of outstanding bonds'
    },
    {
      id: 'bondCouponRate',
      label: 'Bond Coupon Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.125,
      tooltip: 'Annual coupon rate on bonds'
    },
    {
      id: 'bondMarketPrice',
      label: 'Bond Market Price ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current market price of bonds'
    },
    {
      id: 'bondYearsToMaturity',
      label: 'Bond Years to Maturity',
      type: 'number',
      required: false,
      min: 0.1,
      max: 100,
      step: 0.1,
      tooltip: 'Time remaining until bond maturity'
    },
    {
      id: 'bondCouponFrequency',
      label: 'Bond Coupon Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 1, label: 'Annual' },
        { value: 2, label: 'Semi-Annual' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' }
      ],
      defaultValue: 2,
      tooltip: 'Number of coupon payments per year'
    },
    {
      id: 'bankLoanAmount',
      label: 'Bank Loan Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Outstanding bank loan principal'
    },
    {
      id: 'bankLoanInterestRate',
      label: 'Bank Loan Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.01,
      tooltip: 'Annual interest rate on bank loans'
    },
    {
      id: 'bankLoanTerm',
      label: 'Bank Loan Term (Years)',
      type: 'number',
      required: false,
      min: 0.1,
      max: 30,
      step: 0.1,
      tooltip: 'Remaining term of bank loans'
    },
    {
      id: 'bankLoanFees',
      label: 'Bank Loan Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual or one-time fees on bank loans'
    },
    {
      id: 'creditFacilityLimit',
      label: 'Credit Facility Limit ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total credit facility limit'
    },
    {
      id: 'creditFacilityRate',
      label: 'Credit Facility Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      step: 0.01,
      tooltip: 'Interest rate on utilized portion of credit facility'
    },
    {
      id: 'creditFacilityCommitmentFee',
      label: 'Credit Facility Commitment Fee (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.01,
      tooltip: 'Annual fee on unused portion of credit facility'
    },
    {
      id: 'creditFacilityUtilization',
      label: 'Credit Facility Utilization (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Percentage of credit facility currently utilized'
    },
    {
      id: 'preferredStockDividend',
      label: 'Preferred Stock Dividend ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual dividend per share on preferred stock'
    },
    {
      id: 'preferredStockPrice',
      label: 'Preferred Stock Price ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current market price of preferred stock'
    },
    {
      id: 'preferredStockParValue',
      label: 'Preferred Stock Par Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Par value of outstanding preferred stock'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      defaultValue: 30,
      tooltip: 'Applicable corporate tax rate'
    },
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage',
      required: false,
      min: -0.1,
      max: 20,
      defaultValue: 4.5,
      step: 0.01,
      tooltip: 'Return on risk-free investment (e.g., Treasury bonds)'
    },
    {
      id: 'creditRating',
      label: 'Credit Rating',
      type: 'select',
      required: true,
      options: [
        { value: 'AAA', label: 'AAA' },
        { value: 'AA', label: 'AA' },
        { value: 'A', label: 'A' },
        { value: 'BBB', label: 'BBB' },
        { value: 'BB', label: 'BB' },
        { value: 'B', label: 'B' },
        { value: 'CCC', label: 'CCC' },
        { value: 'CC', label: 'CC' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' }
      ],
      defaultValue: 'BBB',
      tooltip: 'Company credit rating assigned by rating agencies'
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'select',
      required: true,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'financials', label: 'Financials' },
        { value: 'consumer_discretionary', label: 'Consumer Discretionary' },
        { value: 'consumer_staples', label: 'Consumer Staples' },
        { value: 'energy', label: 'Energy' },
        { value: 'industrials', label: 'Industrials' },
        { value: 'materials', label: 'Materials' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'real_estate', label: 'Real Estate' }
      ],
      defaultValue: 'industrials',
      tooltip: 'Primary industry classification'
    },
    {
      id: 'totalDebt',
      label: 'Total Debt ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total outstanding debt on balance sheet'
    },
    {
      id: 'totalAssets',
      label: 'Total Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total assets on balance sheet'
    },
    {
      id: 'ebitda',
      label: 'EBITDA ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Earnings before interest, taxes, depreciation, and amortization'
    },
    {
      id: 'interestExpense',
      label: 'Interest Expense ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual interest expense'
    },
    {
      id: 'debtToEquityRatio',
      label: 'Debt-to-Equity Ratio',
      type: 'number',
      required: false,
      min: 0,
      step: 0.01,
      tooltip: 'Total debt divided by total equity'
    },
    {
      id: 'debtToEbitdaRatio',
      label: 'Debt-to-EBITDA Ratio',
      type: 'number',
      required: false,
      min: 0,
      step: 0.01,
      tooltip: 'Total debt divided by EBITDA'
    },
    {
      id: 'calculationMethod',
      label: 'Calculation Method',
      type: 'select',
      required: true,
      options: [
        { value: 'bond_yield', label: 'Bond Yield Approach' },
        { value: 'loan_rate', label: 'Loan Rate Approach' },
        { value: 'credit_spread', label: 'Credit Spread Approach' },
        { value: 'synthetic_rating', label: 'Synthetic Rating Approach' },
        { value: 'weighted_average', label: 'Weighted Average Approach' }
      ],
      defaultValue: 'weighted_average',
      tooltip: 'Method for calculating cost of debt'
    },
    {
      id: 'weightingMethod',
      label: 'Weighting Method',
      type: 'select',
      required: true,
      options: [
        { value: 'book_value', label: 'Book Value Weighting' },
        { value: 'market_value', label: 'Market Value Weighting' },
        { value: 'equal_weight', label: 'Equal Weighting' }
      ],
      defaultValue: 'book_value',
      tooltip: 'Method for weighting different debt components'
    }
  ],

  outputs: [
    {
      id: 'weightedAverageCostOfDebt',
      label: 'Weighted Average Cost of Debt',
      type: 'percentage',
      explanation: 'Overall cost of debt weighted by debt component sizes'
    },
    {
      id: 'afterTaxWeightedAverageCostOfDebt',
      label: 'After-Tax WACC Component',
      type: 'percentage',
      explanation: 'Cost of debt after tax shield benefits'
    },
    {
      id: 'marginalCostOfDebt',
      label: 'Marginal Cost of Debt',
      type: 'percentage',
      explanation: 'Cost of next dollar of debt financing'
    },
    {
      id: 'creditSpread',
      label: 'Credit Spread',
      type: 'percentage',
      explanation: 'Additional yield over risk-free rate for credit risk'
    },
    {
      id: 'taxShieldValue',
      label: 'Tax Shield Value ($)',
      type: 'currency',
      explanation: 'Annual tax savings from interest expense deductibility'
    },
    {
      id: 'taxShieldPercentage',
      label: 'Tax Shield Percentage',
      type: 'percentage',
      explanation: 'Tax shield as percentage of interest expense'
    },
    {
      id: 'debtCapacityUtilization',
      label: 'Debt Capacity Utilization',
      type: 'percentage',
      explanation: 'Current leverage relative to optimal capacity'
    },
    {
      id: 'industryAverageCostOfDebt',
      label: 'Industry Average Cost of Debt',
      type: 'percentage',
      explanation: 'Average cost of debt for the industry'
    },
    {
      id: 'breakEvenLeverageRatio',
      label: 'Break-Even Leverage Ratio',
      type: 'number',
      explanation: 'Leverage ratio where cost of debt equals cost of equity'
    },
    {
      id: 'breakEvenInterestCoverage',
      label: 'Break-Even Interest Coverage',
      type: 'number',
      explanation: 'Interest coverage ratio for break-even analysis'
    },
    {
      id: 'baseCaseCostOfDebt',
      label: 'Base Case Cost of Debt',
      type: 'percentage',
      explanation: 'Cost of debt under current market conditions'
    },
    {
      id: 'optimisticCaseCostOfDebt',
      label: 'Optimistic Case Cost of Debt',
      type: 'percentage',
      explanation: 'Cost of debt under favorable market conditions'
    },
    {
      id: 'pessimisticCaseCostOfDebt',
      label: 'Pessimistic Case Cost of Debt',
      type: 'percentage',
      explanation: 'Cost of debt under adverse market conditions'
    },
    {
      id: 'debtToEquityCompliance',
      label: 'Debt-to-Equity Compliance',
      type: 'boolean',
      explanation: 'Whether current leverage meets regulatory requirements'
    },
    {
      id: 'interestCoverageCompliance',
      label: 'Interest Coverage Compliance',
      type: 'boolean',
      explanation: 'Whether interest coverage meets lender requirements'
    },
    {
      id: 'projectedCostOfDebt1yr',
      label: 'Projected Cost of Debt (1 Year)',
      type: 'percentage',
      explanation: 'Expected cost of debt in one year'
    },
    {
      id: 'projectedCostOfDebt3yr',
      label: 'Projected Cost of Debt (3 Years)',
      type: 'percentage',
      explanation: 'Expected cost of debt in three years'
    },
    {
      id: 'projectedCostOfDebt5yr',
      label: 'Projected Cost of Debt (5 Years)',
      type: 'percentage',
      explanation: 'Expected cost of debt in five years'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Investment Grade Corporate Bond Analysis',
      description: 'Cost of debt calculation for a BBB-rated industrial company with mixed debt structure',
      inputs: {
        bondFaceValue: 500000,
        bondCouponRate: 5.25,
        bondMarketPrice: 1020,
        bondYearsToMaturity: 8,
        bondCouponFrequency: 2,
        bankLoanAmount: 300000,
        bankLoanInterestRate: 4.75,
        bankLoanTerm: 5,
        bankLoanFees: 15000,
        creditFacilityLimit: 200000,
        creditFacilityRate: 4.5,
        creditFacilityCommitmentFee: 0.5,
        creditFacilityUtilization: 60,
        preferredStockDividend: 2.5,
        preferredStockPrice: 25,
        preferredStockParValue: 100000,
        taxRate: 25,
        riskFreeRate: 4.0,
        creditRating: 'BBB',
        industry: 'industrials',
        totalDebt: 1200000,
        totalAssets: 5000000,
        ebitda: 800000,
        interestExpense: 55000,
        debtToEquityRatio: 1.2,
        debtToEbitdaRatio: 1.5,
        calculationMethod: 'weighted_average',
        weightingMethod: 'book_value'
      },
      expectedOutputs: {
        weightedAverageCostOfDebt: 5.1,
        afterTaxWeightedAverageCostOfDebt: 3.8,
        marginalCostOfDebt: 5.3,
        creditSpread: 1.1,
        taxShieldValue: 13750,
        taxShieldPercentage: 25,
        debtCapacityUtilization: 75,
        industryAverageCostOfDebt: 4.9,
        breakEvenLeverageRatio: 0.67,
        breakEvenInterestCoverage: 14.5,
        baseCaseCostOfDebt: 5.1,
        optimisticCaseCostOfDebt: 4.6,
        pessimisticCaseCostOfDebt: 6.2,
        debtToEquityCompliance: true,
        interestCoverageCompliance: true,
        projectedCostOfDebt1yr: 5.2,
        projectedCostOfDebt3yr: 5.5,
        projectedCostOfDebt5yr: 6.0
      }
    },
    {
      title: 'High-Yield Debt Structure',
      description: 'Cost of debt for a BB-rated energy company with significant bank financing',
      inputs: {
        bondFaceValue: 200000,
        bondCouponRate: 8.5,
        bondMarketPrice: 950,
        bondYearsToMaturity: 7,
        bondCouponFrequency: 2,
        bankLoanAmount: 800000,
        bankLoanInterestRate: 7.25,
        bankLoanTerm: 4,
        bankLoanFees: 40000,
        creditFacilityLimit: 150000,
        creditFacilityRate: 6.75,
        creditFacilityCommitmentFee: 0.75,
        creditFacilityUtilization: 80,
        taxRate: 21,
        riskFreeRate: 4.0,
        creditRating: 'BB',
        industry: 'energy',
        totalDebt: 1200000,
        ebitda: 450000,
        interestExpense: 85000,
        debtToEquityRatio: 2.8,
        debtToEbitdaRatio: 2.7,
        calculationMethod: 'credit_spread',
        weightingMethod: 'book_value'
      },
      expectedOutputs: {
        weightedAverageCostOfDebt: 7.8,
        afterTaxWeightedAverageCostOfDebt: 6.2,
        marginalCostOfDebt: 8.2,
        creditSpread: 3.8,
        taxShieldValue: 17850,
        taxShieldPercentage: 21,
        debtCapacityUtilization: 85,
        industryAverageCostOfDebt: 6.2,
        breakEvenLeverageRatio: 0.45,
        breakEvenInterestCoverage: 5.3,
        baseCaseCostOfDebt: 7.8,
        optimisticCaseCostOfDebt: 7.0,
        pessimisticCaseCostOfDebt: 9.5,
        debtToEquityCompliance: false,
        interestCoverageCompliance: false,
        projectedCostOfDebt1yr: 8.0,
        projectedCostOfDebt3yr: 8.8,
        projectedCostOfDebt5yr: 9.8
      }
    },
    {
      title: 'Utility Company Debt Analysis',
      description: 'Stable cost of debt for an A-rated utility with long-term bond financing',
      inputs: {
        bondFaceValue: 1500000,
        bondCouponRate: 4.0,
        bondMarketPrice: 1050,
        bondYearsToMaturity: 25,
        bondCouponFrequency: 2,
        bankLoanAmount: 100000,
        bankLoanInterestRate: 3.75,
        bankLoanTerm: 10,
        bankLoanFees: 5000,
        taxRate: 28,
        riskFreeRate: 4.0,
        creditRating: 'A',
        industry: 'utilities',
        totalDebt: 1700000,
        totalAssets: 8000000,
        ebitda: 1200000,
        interestExpense: 65000,
        debtToEquityRatio: 1.1,
        debtToEbitdaRatio: 1.4,
        calculationMethod: 'bond_yield',
        weightingMethod: 'market_value'
      },
      expectedOutputs: {
        weightedAverageCostOfDebt: 4.2,
        afterTaxWeightedAverageCostOfDebt: 3.0,
        marginalCostOfDebt: 4.1,
        creditSpread: 0.2,
        taxShieldValue: 18200,
        taxShieldPercentage: 28,
        debtCapacityUtilization: 65,
        industryAverageCostOfDebt: 4.1,
        breakEvenLeverageRatio: 0.75,
        breakEvenInterestCoverage: 18.5,
        baseCaseCostOfDebt: 4.2,
        optimisticCaseCostOfDebt: 3.8,
        pessimisticCaseCostOfDebt: 5.0,
        debtToEquityCompliance: true,
        interestCoverageCompliance: true,
        projectedCostOfDebt1yr: 4.3,
        projectedCostOfDebt3yr: 4.6,
        projectedCostOfDebt5yr: 5.0
      }
    }
  ]
};