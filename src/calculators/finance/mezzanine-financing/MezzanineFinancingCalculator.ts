import { Calculator } from '../../types/calculator';
import { calculateMezzanineFinancing } from './formulas';
import { generateMezzanineFinancingAnalysis } from './formulas';

export const MezzanineFinancingCalculator: Calculator = {
  id: 'mezzanine-financing-calculator',
  name: 'Mezzanine Financing for Real Estate Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Analyze mezzanine financing options for real estate projects including cost of capital, risk assessment, and capital structure optimization.',
  inputs: {
    projectValue: {
      type: 'currency',
      value: 5000000,
      unit: 'USD',
      description: 'Total project value',
      placeholder: 'Enter total project value',
      validation: {
        required: true,
        min: 100000,
        max: 1000000000
      }
    },
    seniorLoanAmount: {
      type: 'currency',
      value: 3000000,
      unit: 'USD',
      description: 'Senior loan amount',
      placeholder: 'Enter senior loan amount',
      validation: {
        required: true,
        min: 0,
        max: 1000000000
      }
    },
    mezzanineLoanAmount: {
      type: 'currency',
      value: 1000000,
      unit: 'USD',
      description: 'Mezzanine loan amount',
      placeholder: 'Enter mezzanine loan amount',
      validation: {
        required: true,
        min: 0,
        max: 1000000000
      }
    },
    equityContribution: {
      type: 'currency',
      value: 1000000,
      unit: 'USD',
      description: 'Equity contribution',
      placeholder: 'Enter equity contribution',
      validation: {
        required: true,
        min: 0,
        max: 1000000000
      }
    },
    seniorLoanRate: {
      type: 'percentage',
      value: 5.5,
      unit: '%',
      description: 'Senior loan interest rate',
      placeholder: 'Enter senior loan rate',
      validation: {
        required: true,
        min: 0,
        max: 20
      }
    },
    mezzanineLoanRate: {
      type: 'percentage',
      value: 12.0,
      unit: '%',
      description: 'Mezzanine loan interest rate',
      placeholder: 'Enter mezzanine loan rate',
      validation: {
        required: true,
        min: 0,
        max: 30
      }
    },
    seniorLoanTerm: {
      type: 'number',
      value: 30,
      unit: 'years',
      description: 'Senior loan term',
      placeholder: 'Enter senior loan term',
      validation: {
        required: true,
        min: 1,
        max: 50
      }
    },
    mezzanineLoanTerm: {
      type: 'number',
      value: 5,
      unit: 'years',
      description: 'Mezzanine loan term',
      placeholder: 'Enter mezzanine loan term',
      validation: {
        required: true,
        min: 1,
        max: 20
      }
    },
    projectTimeline: {
      type: 'number',
      value: 24,
      unit: 'months',
      description: 'Project development timeline',
      placeholder: 'Enter project timeline',
      validation: {
        required: true,
        min: 6,
        max: 60
      }
    },
    expectedExitValue: {
      type: 'currency',
      value: 6500000,
      unit: 'USD',
      description: 'Expected exit value',
      placeholder: 'Enter expected exit value',
      validation: {
        required: true,
        min: 0,
        max: 1000000000
      }
    },
    exitTimeline: {
      type: 'number',
      value: 36,
      unit: 'months',
      description: 'Expected exit timeline',
      placeholder: 'Enter exit timeline',
      validation: {
        required: true,
        min: 12,
        max: 120
      }
    },
    mezzanineFees: {
      type: 'currency',
      value: 50000,
      unit: 'USD',
      description: 'Mezzanine loan fees',
      placeholder: 'Enter mezzanine fees',
      validation: {
        required: true,
        min: 0,
        max: 1000000
      }
    },
    mezzanineEquityKicker: {
      type: 'percentage',
      value: 15,
      unit: '%',
      description: 'Mezzanine equity kicker percentage',
      placeholder: 'Enter equity kicker percentage',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    operatingExpenses: {
      type: 'currency',
      value: 200000,
      unit: 'USD/year',
      description: 'Annual operating expenses',
      placeholder: 'Enter annual operating expenses',
      validation: {
        required: true,
        min: 0,
        max: 10000000
      }
    },
    vacancyRate: {
      type: 'percentage',
      value: 5,
      unit: '%',
      description: 'Expected vacancy rate',
      placeholder: 'Enter vacancy rate',
      validation: {
        required: true,
        min: 0,
        max: 50
      }
    },
    propertyTaxRate: {
      type: 'percentage',
      value: 1.2,
      unit: '%',
      description: 'Property tax rate',
      placeholder: 'Enter property tax rate',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    insuranceRate: {
      type: 'percentage',
      value: 0.5,
      unit: '%',
      description: 'Insurance rate',
      placeholder: 'Enter insurance rate',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    },
    managementFee: {
      type: 'percentage',
      value: 4,
      unit: '%',
      description: 'Property management fee',
      placeholder: 'Enter management fee',
      validation: {
        required: true,
        min: 0,
        max: 15
      }
    },
    mezzanineLTV: {
      type: 'percentage',
      value: 75,
      unit: '%',
      description: 'Mezzanine loan-to-value ratio',
      placeholder: 'Enter mezzanine LTV',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    seniorLTV: {
      type: 'percentage',
      value: 60,
      unit: '%',
      description: 'Senior loan-to-value ratio',
      placeholder: 'Enter senior LTV',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    mezzanineDSCR: {
      type: 'number',
      value: 1.25,
      unit: 'ratio',
      description: 'Mezzanine debt service coverage ratio',
      placeholder: 'Enter mezzanine DSCR',
      validation: {
        required: true,
        min: 1,
        max: 3
      }
    },
    seniorDSCR: {
      type: 'number',
      value: 1.35,
      unit: 'ratio',
      description: 'Senior debt service coverage ratio',
      placeholder: 'Enter senior DSCR',
      validation: {
        required: true,
        min: 1,
        max: 3
      }
    },
    mezzaninePrepaymentPenalty: {
      type: 'percentage',
      value: 3,
      unit: '%',
      description: 'Mezzanine prepayment penalty',
      placeholder: 'Enter prepayment penalty',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    mezzanineOriginationFee: {
      type: 'percentage',
      value: 2,
      unit: '%',
      description: 'Mezzanine origination fee',
      placeholder: 'Enter origination fee',
      validation: {
        required: true,
        min: 0,
        max: 10
      }
    },
    mezzanineExitFee: {
      type: 'percentage',
      value: 1,
      unit: '%',
      description: 'Mezzanine exit fee',
      placeholder: 'Enter exit fee',
      validation: {
        required: true,
        min: 0,
        max: 5
      }
    }
  },
  outputs: [
    {
      name: 'totalCapitalization',
      label: 'Total Capitalization',
      type: 'currency',
      unit: 'USD',
      description: 'Total project capitalization'
    },
    {
      name: 'seniorLTVRatio',
      label: 'Senior LTV Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Senior loan-to-value ratio'
    },
    {
      name: 'mezzanineLTVRatio',
      label: 'Mezzanine LTV Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Mezzanine loan-to-value ratio'
    },
    {
      name: 'totalLTVRatio',
      label: 'Total LTV Ratio',
      type: 'percentage',
      unit: '%',
      description: 'Combined loan-to-value ratio'
    },
    {
      name: 'equityPercentage',
      label: 'Equity Percentage',
      type: 'percentage',
      unit: '%',
      description: 'Equity percentage of total capitalization'
    },
    {
      name: 'weightedAverageCost',
      label: 'Weighted Average Cost of Capital',
      type: 'percentage',
      unit: '%',
      description: 'Weighted average cost of capital'
    },
    {
      name: 'seniorLoanPayment',
      label: 'Senior Loan Payment',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly senior loan payment'
    },
    {
      name: 'mezzanineLoanPayment',
      label: 'Mezzanine Loan Payment',
      type: 'currency',
      unit: 'USD/month',
      description: 'Monthly mezzanine loan payment'
    },
    {
      name: 'totalDebtService',
      label: 'Total Debt Service',
      type: 'currency',
      unit: 'USD/month',
      description: 'Total monthly debt service'
    },
    {
      name: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual net operating income'
    },
    {
      name: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      unit: 'ratio',
      description: 'Overall debt service coverage ratio'
    },
    {
      name: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return',
      type: 'percentage',
      unit: '%',
      description: 'Annual cash-on-cash return'
    },
    {
      name: 'internalRateOfReturn',
      label: 'Internal Rate of Return',
      type: 'percentage',
      unit: '%',
      description: 'Projected internal rate of return'
    },
    {
      name: 'equityMultiple',
      label: 'Equity Multiple',
      type: 'number',
      unit: 'x',
      description: 'Total equity multiple'
    },
    {
      name: 'mezzanineCost',
      label: 'Mezzanine Cost of Capital',
      type: 'percentage',
      unit: '%',
      description: 'Effective cost of mezzanine financing'
    },
    {
      name: 'seniorCost',
      label: 'Senior Cost of Capital',
      type: 'percentage',
      unit: '%',
      description: 'Effective cost of senior financing'
    },
    {
      name: 'mezzanineEquityValue',
      label: 'Mezzanine Equity Value',
      type: 'currency',
      unit: 'USD',
      description: 'Value of mezzanine equity kicker'
    },
    {
      name: 'totalMezzanineReturn',
      label: 'Total Mezzanine Return',
      type: 'percentage',
      unit: '%',
      description: 'Total return to mezzanine lender'
    },
    {
      name: 'breakEvenOccupancy',
      label: 'Break-Even Occupancy',
      type: 'percentage',
      unit: '%',
      description: 'Occupancy rate needed to break even'
    },
    {
      name: 'cashFlowAfterDebt',
      label: 'Cash Flow After Debt',
      type: 'currency',
      unit: 'USD/year',
      description: 'Annual cash flow after debt service'
    },
    {
      name: 'mezzanineRiskScore',
      label: 'Mezzanine Risk Score',
      type: 'number',
      unit: '/100',
      description: 'Risk assessment score for mezzanine financing'
    },
    {
      name: 'capitalStructureScore',
      label: 'Capital Structure Score',
      type: 'number',
      unit: '/100',
      description: 'Assessment of capital structure efficiency'
    },
    {
      name: 'mezzanineRecommendation',
      label: 'Mezzanine Recommendation',
      type: 'string',
      unit: '',
      description: 'Recommendation for mezzanine financing'
    },
    {
      name: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'string',
      unit: '',
      description: 'Sensitivity analysis results'
    },
    {
      name: 'refinanceAnalysis',
      label: 'Refinance Analysis',
      type: 'string',
      unit: '',
      description: 'Refinancing scenarios and timing'
    },
    {
      name: 'exitStrategyAnalysis',
      label: 'Exit Strategy Analysis',
      type: 'string',
      unit: '',
      description: 'Exit strategy recommendations'
    },
    {
      name: 'riskMitigation',
      label: 'Risk Mitigation Strategies',
      type: 'string',
      unit: '',
      description: 'Risk mitigation recommendations'
    },
    {
      name: 'mezzanineTerms',
      label: 'Mezzanine Terms Summary',
      type: 'string',
      unit: '',
      description: 'Summary of mezzanine financing terms'
    },
    {
      name: 'comparativeAnalysis',
      label: 'Comparative Analysis',
      type: 'string',
      unit: '',
      description: 'Comparison with alternative financing options'
    }
  ],
  calculate: calculateMezzanineFinancing,
  generateReport: generateMezzanineFinancingAnalysis
};
