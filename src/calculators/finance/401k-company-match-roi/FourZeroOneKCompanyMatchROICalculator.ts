import { Calculator } from '../../../types/calculator';
import { calculate401kCompanyMatchROI } from './formulas';
import { generate401kCompanyMatchROIAnalysis } from './formulas';

export const FourZeroOneKCompanyMatchROICalculator: Calculator = {
  id: '401k-company-match-roi-calculator',
  name: '401(k) Company Match ROI Calculator',
  category: 'finance',
  subcategory: 'retirement',
  description: 'Calculate the return on investment and long-term value of employer 401(k) matching contributions.',
  inputs: {
    currentAge: {
      name: 'Current Age',
      type: 'number',
      unit: 'years',
      description: 'Your current age',
      placeholder: '30',
      min: 18,
      max: 80,
      step: 1,
      required: true
    },
    retirementAge: {
      name: 'Retirement Age',
      type: 'number',
      unit: 'years',
      description: 'Age when you plan to retire',
      placeholder: '65',
      min: 45,
      max: 85,
      step: 1,
      required: true
    },
    currentSalary: {
      name: 'Current Annual Salary',
      type: 'number',
      unit: '$',
      description: 'Your current annual salary before taxes',
      placeholder: '75000',
      min: 10000,
      max: 1000000,
      step: 1000,
      required: true
    },
    employeeContribution: {
      name: 'Employee Contribution %',
      type: 'number',
      unit: '%',
      description: 'Percentage of salary you contribute to 401(k)',
      placeholder: '6',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    employerMatch: {
      name: 'Employer Match %',
      type: 'number',
      unit: '%',
      description: 'Percentage of salary employer matches',
      placeholder: '3',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    employerMatchLimit: {
      name: 'Employer Match Limit %',
      type: 'number',
      unit: '%',
      description: 'Maximum percentage of salary employer will match',
      placeholder: '6',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    matchVestingSchedule: {
      name: 'Vesting Schedule',
      type: 'select',
      description: 'How quickly you become vested in employer match',
      options: [
        { value: 'immediate', label: 'Immediate (100% vested)' },
        { value: 'cliff-1', label: 'Cliff 1 year (0% to 100%)' },
        { value: 'cliff-3', label: 'Cliff 3 years (0% to 100%)' },
        { value: 'cliff-5', label: 'Cliff 5 years (0% to 100%)' },
        { value: 'graded-3', label: 'Graded 3 years (33% to 100%)' },
        { value: 'graded-5', label: 'Graded 5 years (20% to 100%)' },
        { value: 'graded-6', label: 'Graded 6 years (20% to 100%)' }
      ],
      required: true
    },
    yearsOfService: {
      name: 'Years of Service',
      type: 'number',
      unit: 'years',
      description: 'How long you have been with the company',
      placeholder: '2',
      min: 0,
      max: 50,
      step: 0.5,
      required: true
    },
    salaryGrowthRate: {
      name: 'Annual Salary Growth Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual increase in salary',
      placeholder: '3',
      min: 0,
      max: 20,
      step: 0.5,
      required: true
    },
    investmentReturn: {
      name: 'Expected Investment Return',
      type: 'number',
      unit: '%',
      description: 'Expected annual return on 401(k) investments',
      placeholder: '7',
      min: 1,
      max: 15,
      step: 0.5,
      required: true
    },
    inflationRate: {
      name: 'Expected Inflation Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      step: 0.1,
      required: true
    },
    taxRate: {
      name: 'Current Tax Rate',
      type: 'number',
      unit: '%',
      description: 'Your current marginal tax rate',
      placeholder: '22',
      min: 10,
      max: 50,
      step: 1,
      required: true
    },
    retirementTaxRate: {
      name: 'Expected Retirement Tax Rate',
      type: 'number',
      unit: '%',
      description: 'Expected tax rate in retirement',
      placeholder: '15',
      min: 10,
      max: 50,
      step: 1,
      required: true
    },
    alternativeInvestmentReturn: {
      name: 'Alternative Investment Return',
      type: 'number',
      unit: '%',
      description: 'Return if you invested match amount elsewhere',
      placeholder: '6',
      min: 1,
      max: 15,
      step: 0.5,
      required: true
    },
    planToStay: {
      name: 'Plan to Stay Until Vested',
      type: 'boolean',
      description: 'Whether you plan to stay until fully vested',
      required: true
    },
    companyStability: {
      name: 'Company Stability Rating',
      type: 'select',
      description: 'Perceived stability of your employer',
      options: [
        { value: 'very-stable', label: 'Very Stable (Large, established company)' },
        { value: 'stable', label: 'Stable (Established company)' },
        { value: 'moderate', label: 'Moderate (Growing company)' },
        { value: 'risky', label: 'Risky (Startup or volatile industry)' },
        { value: 'very-risky', label: 'Very Risky (Early-stage startup)' }
      ],
      required: true
    },
    jobSatisfaction: {
      name: 'Job Satisfaction Level',
      type: 'select',
      description: 'Your current job satisfaction',
      options: [
        { value: 'very-high', label: 'Very High (Love the job)' },
        { value: 'high', label: 'High (Generally satisfied)' },
        { value: 'moderate', label: 'Moderate (Neutral)' },
        { value: 'low', label: 'Low (Somewhat dissatisfied)' },
        { value: 'very-low', label: 'Very Low (Very dissatisfied)' }
      ],
      required: true
    },
    marketConditions: {
      name: 'Market Conditions',
      type: 'select',
      description: 'Current market conditions for job opportunities',
      options: [
        { value: 'excellent', label: 'Excellent (Many opportunities)' },
        { value: 'good', label: 'Good (Good opportunities)' },
        { value: 'moderate', label: 'Moderate (Some opportunities)' },
        { value: 'poor', label: 'Poor (Limited opportunities)' },
        { value: 'very-poor', label: 'Very Poor (Few opportunities)' }
      ],
      required: true
    }
  },
  outputs: [
    {
      id: 'annualEmployerMatch',
      name: 'Annual Employer Match',
      type: 'number',
      unit: '$',
      description: 'Current annual employer match amount'
    },
    {
      id: 'effectiveMatchRate',
      name: 'Effective Match Rate',
      type: 'number',
      unit: '%',
      description: 'Actual employer match rate based on your contribution'
    },
    {
      id: 'vestingPercentage',
      name: 'Current Vesting Percentage',
      type: 'number',
      unit: '%',
      description: 'Percentage of employer match you are currently vested in'
    },
    {
      id: 'vestedMatchAmount',
      name: 'Vested Match Amount',
      type: 'number',
      unit: '$',
      description: 'Amount of employer match you currently own'
    },
    {
      id: 'unvestedMatchAmount',
      name: 'Unvested Match Amount',
      type: 'number',
      unit: '$',
      description: 'Amount of employer match you would lose if you left now'
    },
    {
      id: 'yearsToFullVesting',
      name: 'Years to Full Vesting',
      type: 'number',
      unit: 'years',
      description: 'Years remaining until you are fully vested'
    },
    {
      id: 'totalProjectedMatch',
      name: 'Total Projected Match',
      type: 'number',
      unit: '$',
      description: 'Total employer match projected until retirement'
    },
    {
      id: 'totalVestedMatch',
      name: 'Total Vested Match',
      type: 'number',
      unit: '$',
      description: 'Total vested employer match projected until retirement'
    },
    {
      id: 'matchGrowthValue',
      name: 'Match Growth Value',
      type: 'number',
      unit: '$',
      description: 'Value of employer match with investment growth'
    },
    {
      id: 'taxSavings',
      name: 'Annual Tax Savings',
      type: 'number',
      unit: '$',
      description: 'Annual tax savings from employer match'
    },
    {
      id: 'totalTaxSavings',
      name: 'Total Tax Savings',
      type: 'number',
      unit: '$',
      description: 'Total tax savings over your career'
    },
    {
      id: 'matchROI',
      name: 'Match ROI',
      type: 'number',
      unit: '%',
      description: 'Return on investment of employer match'
    },
    {
      id: 'matchValueRatio',
      name: 'Match Value Ratio',
      type: 'number',
      unit: '%',
      description: 'Employer match as percentage of total compensation'
    },
    {
      id: 'alternativeValue',
      name: 'Alternative Investment Value',
      type: 'number',
      unit: '$',
      description: 'Value if you invested match amount elsewhere'
    },
    {
      id: 'opportunityCost',
      name: 'Opportunity Cost',
      type: 'number',
      unit: '$',
      description: 'Potential loss if you leave before vesting'
    },
    {
      id: 'stayRecommendation',
      name: 'Stay Recommendation',
      type: 'string',
      description: 'Recommendation on whether to stay until vested'
    },
    {
      id: 'vestingRisk',
      name: 'Vesting Risk Score',
      type: 'number',
      unit: '/100',
      description: 'Risk assessment of losing unvested match'
    },
    {
      id: 'matchQuality',
      name: 'Match Quality Score',
      type: 'number',
      unit: '/100',
      description: 'Assessment of employer match quality'
    },
    {
      id: 'retentionValue',
      name: 'Retention Value',
      type: 'number',
      unit: '$',
      description: 'Value of staying until fully vested'
    },
    {
      id: 'monthlyMatch',
      name: 'Monthly Match',
      type: 'number',
      unit: '$',
      description: 'Current monthly employer match amount'
    },
    {
      id: 'matchEfficiency',
      name: 'Match Efficiency',
      type: 'number',
      unit: '%',
      description: 'Percentage of maximum match you are receiving'
    },
    {
      id: 'compensationBoost',
      name: 'Compensation Boost',
      type: 'number',
      unit: '%',
      description: 'Effective salary increase from employer match'
    },
    {
      id: 'retirementImpact',
      name: 'Retirement Impact',
      type: 'number',
      unit: '$',
      description: 'Additional retirement income from employer match'
    },
    {
      id: 'breakEvenYears',
      name: 'Break-even Years',
      type: 'number',
      unit: 'years',
      description: 'Years to break even if you leave and lose match'
    }
  ],
  calculate: calculate401kCompanyMatchROI,
  generateReport: generate401kCompanyMatchROIAnalysis
};
