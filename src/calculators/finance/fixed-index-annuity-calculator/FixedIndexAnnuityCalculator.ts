import { Calculator, Formula } from '../../types/calculator';
import { calculateFixedIndexAnnuity, validateFixedIndexAnnuityInputs } from './formulas';
import { getFixedIndexAnnuityValidationRules } from './validation';

/**
 * Fixed index annuity formula implementation
 */
const fixedIndexAnnuityFormula: Formula = {
  id: 'fixed-index-annuity',
  name: 'Fixed Index Annuity Analysis',
  description: 'Comprehensive fixed index annuity analysis including growth projections, fees, taxes, and payout options',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateFixedIndexAnnuity(inputs as any);
    return {
      outputs: result,
      explanation: 'Fixed index annuity analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Fixed Index Annuity Calculator
 */
export const fixedIndexAnnuityCalculator: Calculator = {
  id: 'fixed-index-annuity-calculator',
  title: 'Fixed Index Annuity Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive fixed index annuity analysis including market participation, guaranteed minimums, fee structures, tax implications, and personalized retirement income projections with industry-standard accuracy.',

  usageInstructions: [
    'Enter your initial investment and contribution details',
    'Select the index type and participation parameters',
    'Specify fees, taxes, and payout preferences',
    'Review growth projections and risk analysis',
    'Compare with alternative investment options'
  ],

  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Initial amount invested in the annuity',
      defaultValue: 100000,
      min: 1000,
      max: 10000000
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Monthly amount added to the annuity',
      defaultValue: 500,
      min: 0,
      max: 100000
    },
    {
      id: 'contributionPeriod',
      label: 'Contribution Period (Years)',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Years you plan to make contributions',
      defaultValue: 10,
      min: 0,
      max: 50
    },
    {
      id: 'indexType',
      label: 'Index Type',
      type: 'select',
      required: true,
      options: [
        { value: 's-p-500', label: 'S&P 500' },
        { value: 'dow-jones', label: 'Dow Jones' },
        { value: 'nasdaq', label: 'NASDAQ' },
        { value: 'custom', label: 'Custom Index' }
      ],
      tooltip: 'Market index the annuity is linked to',
      defaultValue: 's-p-500'
    },
    {
      id: 'participationRate',
      label: 'Participation Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '80',
      tooltip: 'Percentage of index gains credited to your account',
      defaultValue: 80,
      min: 10,
      max: 200,
      step: 5
    },
    {
      id: 'capRate',
      label: 'Cap Rate (%) - Optional',
      type: 'percentage',
      required: false,
      placeholder: '10',
      tooltip: 'Maximum annual return credited',
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1
    },
    {
      id: 'floorRate',
      label: 'Floor Rate (%) - Optional',
      type: 'percentage',
      required: false,
      placeholder: '0',
      tooltip: 'Minimum annual return (protects against losses)',
      defaultValue: 0,
      min: -10,
      max: 10,
      step: 0.5
    },
    {
      id: 'spreadRate',
      label: 'Spread Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '1.5',
      tooltip: 'Percentage deducted from index return',
      defaultValue: 1.5,
      min: 0,
      max: 5,
      step: 0.25
    },
    {
      id: 'annuityPeriod',
      label: 'Annuity Period (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Total length of the annuity contract',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '45',
      tooltip: 'Your current age',
      defaultValue: 45,
      min: 18,
      max: 80
    },
    {
      id: 'withdrawalAge',
      label: 'Withdrawal Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age when you plan to start withdrawals',
      defaultValue: 65,
      min: 50,
      max: 90
    },
    {
      id: 'annualFee',
      label: 'Annual Fee (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual management fee',
      defaultValue: 2.5,
      min: 0,
      max: 5,
      step: 0.25
    },
    {
      id: 'riderFees',
      label: 'Rider Fees',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Additional fees for optional riders',
      defaultValue: 500,
      min: 0,
      max: 10000
    },
    {
      id: 'payoutType',
      label: 'Payout Type',
      type: 'select',
      required: false,
      options: [
        { value: 'lifetime', label: 'Lifetime Income' },
        { value: 'period-certain', label: 'Period Certain' },
        { value: 'joint-life', label: 'Joint Life' },
        { value: 'single-life', label: 'Single Life' }
      ],
      tooltip: 'How payouts are structured',
      defaultValue: 'lifetime'
    },
    {
      id: 'payoutPeriod',
      label: 'Payout Period (Years)',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Years over which payments are made',
      defaultValue: 30,
      min: 1,
      max: 50
    },
    {
      id: 'payoutPercentage',
      label: 'Payout Percentage (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Annual payout as percentage of account value',
      defaultValue: 5,
      min: 1,
      max: 20,
      step: 0.5
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Your marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'State income tax rate',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 1
    },
    {
      id: 'taxDeferred',
      label: 'Tax-Deferred Growth',
      type: 'boolean',
      required: false,
      tooltip: 'Whether growth is tax-deferred',
      defaultValue: true
    },
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
      step: 0.5
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility (%)',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'Expected market volatility',
      defaultValue: 15,
      min: 5,
      max: 50,
      step: 5
    },
    {
      id: 'conservativeReturn',
      label: 'Conservative Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '4',
      tooltip: 'Expected return for conservative investments',
      defaultValue: 4,
      min: 0,
      max: 15,
      step: 1
    },
    {
      id: 'aggressiveReturn',
      label: 'Aggressive Return (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'Expected return for aggressive investments',
      defaultValue: 8,
      min: 5,
      max: 30,
      step: 1
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: false,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      tooltip: 'Used for life expectancy calculations',
      defaultValue: 'male'
    },
    {
      id: 'jointLifeExpectancy',
      label: 'Joint Life Expectancy (Years)',
      type: 'number',
      required: false,
      placeholder: '25',
      tooltip: 'Life expectancy for joint life payouts',
      defaultValue: 25,
      min: 1,
      max: 50
    }
  ],

  outputs: [
    {
      id: 'projectedValueAtWithdrawal',
      label: 'Projected Value at Withdrawal',
      type: 'currency',
      explanation: 'Estimated account value when you start withdrawals'
    },
    {
      id: 'projectedValueAfterFees',
      label: 'Value After Fees',
      type: 'currency',
      explanation: 'Account value after deducting all fees'
    },
    {
      id: 'projectedValueAfterTaxes',
      label: 'After-Tax Value',
      type: 'currency',
      explanation: 'Value after accounting for taxes'
    },
    {
      id: 'projectedValueAfterInflation',
      label: 'Inflation-Adjusted Value',
      type: 'currency',
      explanation: 'Value adjusted for inflation'
    },
    {
      id: 'monthlyPayout',
      label: 'Monthly Payout',
      type: 'currency',
      explanation: 'Estimated monthly income payment'
    },
    {
      id: 'annualPayout',
      label: 'Annual Payout',
      type: 'currency',
      explanation: 'Estimated annual income payment'
    },
    {
      id: 'totalPayouts',
      label: 'Total Payouts',
      type: 'currency',
      explanation: 'Total amount paid out over payout period'
    },
    {
      id: 'payoutPeriodYears',
      label: 'Payout Period (Years)',
      type: 'number',
      explanation: 'Number of years payments will be made'
    },
    {
      id: 'bestCaseValue',
      label: 'Best Case Scenario',
      type: 'currency',
      explanation: 'Value in best market conditions'
    },
    {
      id: 'worstCaseValue',
      label: 'Worst Case Scenario',
      type: 'currency',
      explanation: 'Value in worst market conditions'
    },
    {
      id: 'averageCaseValue',
      label: 'Average Case Scenario',
      type: 'currency',
      explanation: 'Value in average market conditions'
    },
    {
      id: 'riskAdjustedValue',
      label: 'Risk-Adjusted Value',
      type: 'currency',
      explanation: 'Value adjusted for risk factors'
    },
    {
      id: 'totalFeesPaid',
      label: 'Total Fees Paid',
      type: 'currency',
      explanation: 'Cumulative fees over the annuity period'
    },
    {
      id: 'feeImpactPercentage',
      label: 'Fee Impact (%)',
      type: 'percentage',
      explanation: 'Percentage of value consumed by fees'
    },
    {
      id: 'netReturnAfterFees',
      label: 'Net Return After Fees (%)',
      type: 'percentage',
      explanation: 'Return after accounting for all fees'
    },
    {
      id: 'taxLiability',
      label: 'Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on withdrawals'
    },
    {
      id: 'afterTaxIncome',
      label: 'After-Tax Income',
      type: 'currency',
      explanation: 'Income after taxes'
    },
    {
      id: 'taxEfficiency',
      label: 'Tax Efficiency (%)',
      type: 'percentage',
      explanation: 'How tax-efficient the annuity is'
    },
    {
      id: 'vsTraditionalSavings',
      label: 'vs Traditional Savings',
      type: 'currency',
      explanation: 'Comparison with traditional savings account'
    },
    {
      id: 'vsStocks',
      label: 'vs Stock Investments',
      type: 'currency',
      explanation: 'Comparison with stock investments'
    },
    {
      id: 'vsBonds',
      label: 'vs Bond Investments',
      type: 'currency',
      explanation: 'Comparison with bond investments'
    },
    {
      id: 'vsOtherAnnuities',
      label: 'vs Other Annuities',
      type: 'currency',
      explanation: 'Comparison with other annuity products'
    },
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Personalized strategy recommendations'
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'text',
      explanation: 'Overall risk assessment'
    },
    {
      id: 'suitabilityScore',
      label: 'Suitability Score',
      type: 'number',
      explanation: 'How suitable this annuity is for your situation'
    },
    {
      id: 'alternativeOptions',
      label: 'Alternative Options',
      type: 'text',
      explanation: 'Other investment options to consider'
    }
  ],

  formulas: [fixedIndexAnnuityFormula],

  validationRules: getFixedIndexAnnuityValidationRules(),

  examples: [
    {
      title: 'Conservative Retirement Strategy',
      description: 'Middle-aged professional seeking guaranteed income with market participation',
      inputs: {
        initialInvestment: 200000,
        monthlyContribution: 1000,
        contributionPeriod: 15,
        indexType: 's-p-500',
        participationRate: 70,
        capRate: 8,
        floorRate: 0,
        spreadRate: 1.25,
        annuityPeriod: 25,
        currentAge: 45,
        withdrawalAge: 70,
        annualFee: 2.0,
        riderFees: 300,
        payoutType: 'lifetime',
        payoutPeriod: 30,
        payoutPercentage: 5.5,
        taxBracket: 28,
        stateTaxRate: 6,
        taxDeferred: true,
        inflationRate: 3.0,
        marketVolatility: 18,
        conservativeReturn: 4,
        aggressiveReturn: 8,
        gender: 'male',
        jointLifeExpectancy: 25
      },
      expectedOutputs: {
        projectedValueAtWithdrawal: 850000,
        projectedValueAfterFees: 780000,
        projectedValueAfterTaxes: 650000,
        projectedValueAfterInflation: 480000,
        monthlyPayout: 2830,
        annualPayout: 34000,
        totalPayouts: 1020000,
        payoutPeriodYears: 30,
        bestCaseValue: 950000,
        worstCaseValue: 720000,
        averageCaseValue: 850000,
        riskAdjustedValue: 820000,
        totalFeesPaid: 70000,
        feeImpactPercentage: 8.2,
        netReturnAfterFees: 6.8,
        taxLiability: 130000,
        afterTaxIncome: 520000,
        taxEfficiency: 76.5,
        vsTraditionalSavings: 280000,
        vsStocks: -150000,
        vsBonds: 120000,
        vsOtherAnnuities: 50000,
        recommendedStrategy: 'Balanced approach suitable for retirement income with guaranteed minimums',
        riskLevel: 'medium',
        suitabilityScore: 78,
        alternativeOptions: 'Diversified investment portfolio, Target-date retirement funds'
      }
    }
  ]
};