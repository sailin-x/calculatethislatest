import { Calculator, Formula } from '../../types/calculator';
import { calculateExecutiveDeferredCompensation, validateExecutiveDeferredCompensationInputs } from './formulas';
import { getExecutiveDeferredCompensationValidationRules } from './validation';

/**
 * Executive deferred compensation formula implementation
 */
const executiveDeferredCompensationFormula: Formula = {
  id: 'executive-deferred-compensation',
  name: 'Executive Deferred Compensation Analysis',
  description: 'Comprehensive analysis of executive deferred compensation plans including tax implications, vesting, and risk assessment',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateExecutiveDeferredCompensation(inputs as any);
    return {
      outputs: result,
      explanation: 'Executive deferred compensation analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Executive Deferred Compensation Calculator
 */
export const executiveDeferredCompensationCalculator: Calculator = {
  id: 'executive-deferred-compensation-calculator',
  title: 'Executive Deferred Compensation Plan Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive analysis of executive deferred compensation plans including tax-deferred growth, vesting schedules, risk assessment, and personalized recommendations for maximizing retirement benefits.',

  usageInstructions: [
    'Enter your current compensation and deferral details',
    'Specify vesting schedule and investment expectations',
    'Review tax implications and risk assessments',
    'Consider the recommended strategies for optimization'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '45',
      tooltip: 'Your current age',
      defaultValue: 45,
      min: 18,
      max: 70
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age when you plan to retire',
      defaultValue: 65,
      min: 50,
      max: 75
    },
    {
      id: 'currentSalary',
      label: 'Current Annual Salary',
      type: 'currency',
      required: true,
      placeholder: '250000',
      tooltip: 'Your current annual base salary',
      defaultValue: 250000
    },
    {
      id: 'expectedSalaryGrowth',
      label: 'Expected Salary Growth (%)',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual salary increase',
      defaultValue: 3.0,
      min: -10,
      max: 20,
      step: 0.5
    },
    {
      id: 'annualDeferralAmount',
      label: 'Annual Deferral Amount',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Amount deferred annually from compensation',
      defaultValue: 50000
    },
    {
      id: 'deferralPercentage',
      label: 'Deferral Percentage (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Percentage of salary deferred',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'vestingPeriod',
      label: 'Vesting Period (Years)',
      type: 'number',
      required: false,
      placeholder: '3',
      tooltip: 'Years required for full vesting',
      defaultValue: 3,
      min: 0,
      max: 10
    },
    {
      id: 'cliffVesting',
      label: 'Cliff Vesting',
      type: 'boolean',
      required: false,
      tooltip: 'All vesting occurs at end of period',
      defaultValue: false
    },
    {
      id: 'expectedReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7.0',
      tooltip: 'Expected annual return on investments',
      defaultValue: 7.0,
      min: -10,
      max: 30,
      step: 0.5
    },
    {
      id: 'companyMatch',
      label: 'Company Match (%)',
      type: 'percentage',
      required: false,
      placeholder: '50',
      tooltip: 'Company matching contribution percentage',
      defaultValue: 50,
      min: 0,
      max: 200,
      step: 5
    },
    {
      id: 'companyMatchLimit',
      label: 'Company Match Limit',
      type: 'currency',
      required: false,
      placeholder: '10000',
      tooltip: 'Maximum annual company match',
      defaultValue: 10000
    },
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '35',
      tooltip: 'Your current marginal tax rate',
      defaultValue: 35,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'deferredTaxRate',
      label: 'Deferred Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Expected tax rate at distribution',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'Capital gains tax rate',
      defaultValue: 15,
      min: 0,
      max: 30,
      step: 1
    },
    {
      id: 'employerContribution',
      label: 'Employer Contribution',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Additional employer contribution',
      defaultValue: 25000
    },
    {
      id: 'vestingSchedule',
      label: 'Vesting Schedule',
      type: 'select',
      required: false,
      options: [
        { value: 'graded', label: 'Graded Vesting' },
        { value: 'cliff', label: 'Cliff Vesting' },
        { value: 'immediate', label: 'Immediate Vesting' }
      ],
      tooltip: 'Type of vesting schedule',
      defaultValue: 'graded'
    },
    {
      id: 'distributionOptions',
      label: 'Distribution Options',
      type: 'select',
      required: false,
      options: [
        { value: 'lump-sum', label: 'Lump Sum' },
        { value: 'annuity', label: 'Annuity' },
        { value: 'installments', label: 'Installments' }
      ],
      tooltip: 'Preferred distribution method',
      defaultValue: 'lump-sum'
    },
    {
      id: 'companyRisk',
      label: 'Company Risk Level',
      type: 'select',
      required: false,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Risk of company financial distress',
      defaultValue: 'medium'
    },
    {
      id: 'marketRisk',
      label: 'Market Risk Tolerance',
      type: 'select',
      required: false,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      tooltip: 'Your market risk tolerance',
      defaultValue: 'moderate'
    },
    {
      id: 'analysisYears',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Years to analyze',
      defaultValue: 20,
      min: 1,
      max: 50
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3.0,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'considerPortability',
      label: 'Consider Portability',
      type: 'boolean',
      required: false,
      tooltip: 'Consider portability options',
      defaultValue: true
    },
    {
      id: 'considerCreditShelter',
      label: 'Consider Credit Shelter',
      type: 'boolean',
      required: false,
      tooltip: 'Consider credit shelter strategies',
      defaultValue: true
    }
  ],

  outputs: [
    {
      id: 'currentAccountBalance',
      label: 'Current Account Balance',
      type: 'currency',
      explanation: 'Current value of deferred compensation account'
    },
    {
      id: 'vestedBalance',
      label: 'Vested Balance',
      type: 'currency',
      explanation: 'Portion of account that is vested'
    },
    {
      id: 'unvestedBalance',
      label: 'Unvested Balance',
      type: 'currency',
      explanation: 'Portion of account that is not yet vested'
    },
    {
      id: 'projectedValueAtRetirement',
      label: 'Projected Value at Retirement',
      type: 'currency',
      explanation: 'Projected account value at retirement age'
    },
    {
      id: 'projectedValueAfterTaxes',
      label: 'After-Tax Value',
      type: 'currency',
      explanation: 'Projected value after taxes'
    },
    {
      id: 'projectedValueAfterInflation',
      label: 'Inflation-Adjusted Value',
      type: 'currency',
      explanation: 'Value adjusted for inflation'
    },
    {
      id: 'annualDeferralSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from deferral'
    },
    {
      id: 'taxDeferredGrowth',
      label: 'Tax-Deferred Growth',
      type: 'currency',
      explanation: 'Additional growth from tax deferral'
    },
    {
      id: 'totalTaxSavings',
      label: 'Total Tax Savings',
      type: 'currency',
      explanation: 'Total tax savings over analysis period'
    },
    {
      id: 'riskAdjustedValue',
      label: 'Risk-Adjusted Value',
      type: 'currency',
      explanation: 'Value adjusted for risk factors'
    },
    {
      id: 'worstCaseScenario',
      label: 'Worst Case Scenario',
      type: 'currency',
      explanation: 'Value in worst case scenario'
    },
    {
      id: 'bestCaseScenario',
      label: 'Best Case Scenario',
      type: 'currency',
      explanation: 'Value in best case scenario'
    },
    {
      id: 'traditionalSavingsComparison',
      label: 'Traditional Savings Comparison',
      type: 'currency',
      explanation: 'Value if saved traditionally'
    },
    {
      id: 'netAdvantage',
      label: 'Net Advantage',
      type: 'currency',
      explanation: 'Advantage over traditional savings'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to break even with traditional savings'
    },
    {
      id: 'lumpSumValue',
      label: 'Lump Sum Distribution',
      type: 'currency',
      explanation: 'Value if taken as lump sum'
    },
    {
      id: 'annuityValue',
      label: 'Annuity Distribution',
      type: 'currency',
      explanation: 'Value if taken as annuity'
    },
    {
      id: 'installmentValue',
      label: 'Installment Distribution',
      type: 'currency',
      explanation: 'Value if taken as installments'
    },
    {
      id: 'deferredTaxLiability',
      label: 'Deferred Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on distribution'
    },
    {
      id: 'capitalGainsTax',
      label: 'Capital Gains Tax',
      type: 'currency',
      explanation: 'Capital gains tax liability'
    },
    {
      id: 'totalTaxEfficiency',
      label: 'Tax Efficiency (%)',
      type: 'percentage',
      explanation: 'Overall tax efficiency of the plan'
    },
    {
      id: 'recommendedDeferralAmount',
      label: 'Recommended Deferral Amount',
      type: 'currency',
      explanation: 'Recommended annual deferral amount'
    },
    {
      id: 'optimalVestingStrategy',
      label: 'Optimal Vesting Strategy',
      type: 'text',
      explanation: 'Recommended vesting strategy'
    },
    {
      id: 'riskMitigationStrategies',
      label: 'Risk Mitigation Strategies',
      type: 'text',
      explanation: 'Strategies to mitigate risks'
    }
  ],

  formulas: [executiveDeferredCompensationFormula],

  validationRules: getExecutiveDeferredCompensationValidationRules(),

  examples: [
    {
      title: 'Senior Executive Deferred Compensation Analysis',
      description: 'Comprehensive analysis for a senior executive considering deferred compensation',
      inputs: {
        currentAge: 45,
        retirementAge: 65,
        currentSalary: 300000,
        expectedSalaryGrowth: 3.0,
        annualDeferralAmount: 60000,
        deferralPercentage: 20,
        vestingPeriod: 3,
        cliffVesting: false,
        expectedReturn: 7.0,
        companyMatch: 50,
        companyMatchLimit: 15000,
        currentTaxRate: 37,
        deferredTaxRate: 28,
        capitalGainsTaxRate: 15,
        employerContribution: 30000,
        vestingSchedule: 'graded',
        distributionOptions: 'lump-sum',
        companyRisk: 'medium',
        marketRisk: 'moderate',
        analysisYears: 20,
        inflationRate: 3.0,
        considerPortability: true,
        considerCreditShelter: true
      },
      expectedOutputs: {
        currentAccountBalance: 60000,
        vestedBalance: 40000,
        unvestedBalance: 20000,
        projectedValueAtRetirement: 2500000,
        projectedValueAfterTaxes: 1800000,
        projectedValueAfterInflation: 1200000,
        annualDeferralSavings: 22200,
        taxDeferredGrowth: 450000,
        totalTaxSavings: 900000,
        riskAdjustedValue: 2125000,
        worstCaseScenario: 1750000,
        bestCaseScenario: 3750000,
        traditionalSavingsComparison: 1400000,
        netAdvantage: 400000,
        breakEvenYears: 8,
        lumpSumValue: 1800000,
        annuityValue: 150000,
        installmentValue: 150000,
        deferredTaxLiability: 700000,
        capitalGainsTax: 0,
        totalTaxEfficiency: 28.6,
        recommendedDeferralAmount: 66000,
        optimalVestingStrategy: 'Graded vesting with 3-year schedule is appropriate for your situation',
        riskMitigationStrategies: 'Maintain emergency fund outside deferred compensation plan, Review plan documents annually for changes'
      }
    }
  ]
};