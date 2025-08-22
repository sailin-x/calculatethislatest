import { Calculator } from '../../../types/calculator';
import { calculateOpportunityZoneInvestmentROI, generateOpportunityZoneInvestmentROIAnalysis } from './formulas';
import { validateOpportunityZoneInvestmentROIInputs } from './validation';
import { quickValidateOpportunityZoneInvestmentROI } from './quickValidation';
import { OpportunityZoneInvestmentROIInputs } from './validation';

export const OpportunityZoneInvestmentROICalculator: Calculator = {
  id: 'opportunity-zone-investment-roi',
  name: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  description: 'Calculate ROI and tax benefits for Opportunity Zone investments, including capital gains deferral and elimination.',
  tags: ['real estate', 'investment', 'tax benefits', 'opportunity zones', 'capital gains', 'ROI', 'tax deferral'],
  inputs: [
    {
      id: 'initialInvestment',
      name: 'Initial Investment',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total amount invested in the Opportunity Zone',
      placeholder: '500000'
    },
    {
      id: 'capitalGainsAmount',
      name: 'Capital Gains Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Amount of capital gains being reinvested',
      placeholder: '300000'
    },
    {
      id: 'investmentPeriod',
      name: 'Investment Period',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Length of time the investment will be held',
      placeholder: '10',
      default: 10
    },
    {
      id: 'annualReturn',
      name: 'Annual Return Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Expected annual return on the investment',
      placeholder: '8.5'
    },
    {
      id: 'taxRate',
      name: 'Tax Rate',
      type: 'number',
      unit: 'percentage',
      required: true,
      description: 'Investor\'s marginal tax rate',
      placeholder: '23.8',
      default: 23.8
    },
    {
      id: 'stateTaxRate',
      name: 'State Tax Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'State tax rate (if applicable)',
      placeholder: '5.0'
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Current or projected property value',
      placeholder: '800000'
    },
    {
      id: 'annualIncome',
      name: 'Annual Income',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual rental or business income',
      placeholder: '60000'
    },
    {
      id: 'operatingExpenses',
      name: 'Operating Expenses',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual operating expenses',
      placeholder: '20000'
    },
    {
      id: 'depreciation',
      name: 'Depreciation',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual depreciation expense',
      placeholder: '15000'
    },
    {
      id: 'deferralPeriod',
      name: 'Deferral Period',
      type: 'number',
      unit: 'years',
      required: false,
      description: 'Years to defer capital gains tax',
      placeholder: '7',
      default: 7
    },
    {
      id: 'basisStepUp',
      name: 'Basis Step-Up Percentage',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Percentage basis step-up after holding period',
      placeholder: '15',
      default: 15
    },
    {
      id: 'exitStrategy',
      name: 'Exit Strategy',
      type: 'select',
      required: false,
      description: 'Planned exit strategy for the investment',
      options: [
        { value: 'sale', label: 'Property Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'exchange', label: '1031 Exchange' },
        { value: 'hold', label: 'Long-term Hold' }
      ],
      default: 'sale'
    },
    {
      id: 'exitValue',
      name: 'Exit Value',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Projected value at exit',
      placeholder: '1200000'
    },
    {
      id: 'exitCosts',
      name: 'Exit Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Costs associated with exit (commissions, fees)',
      placeholder: '50000'
    },
    {
      id: 'inflationRate',
      name: 'Inflation Rate',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      default: 2.5
    },
    {
      id: 'alternativeInvestmentReturn',
      name: 'Alternative Investment Return',
      type: 'number',
      unit: 'percentage',
      required: false,
      description: 'Return rate for alternative investment',
      placeholder: '6.0',
      default: 6.0
    },
    {
      id: 'managementFees',
      name: 'Management Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual management or fund fees',
      placeholder: '5000'
    },
    {
      id: 'legalFees',
      name: 'Legal Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Legal and compliance fees',
      placeholder: '3000'
    },
    {
      id: 'accountingFees',
      name: 'Accounting Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Accounting and tax preparation fees',
      placeholder: '2000'
    },
    {
      id: 'includeStateTaxes',
      name: 'Include State Taxes',
      type: 'boolean',
      required: false,
      description: 'Include state tax calculations',
      default: true
    },
    {
      id: 'includeInflation',
      name: 'Include Inflation',
      type: 'boolean',
      required: false,
      description: 'Include inflation in calculations',
      default: true
    },
    {
      id: 'includeAlternativeComparison',
      name: 'Include Alternative Comparison',
      type: 'boolean',
      required: false,
      description: 'Compare with alternative investment',
      default: true
    },
    {
      id: 'includeDetailedBreakdown',
      name: 'Include Detailed Breakdown',
      type: 'boolean',
      required: false,
      description: 'Provide detailed tax and return breakdown',
      default: true
    }
  ],
  outputs: [
    {
      id: 'totalROI',
      name: 'Total ROI',
      type: 'number',
      unit: 'percentage',
      description: 'Total return on investment including tax benefits'
    },
    {
      id: 'annualizedROI',
      name: 'Annualized ROI',
      type: 'number',
      unit: 'percentage',
      description: 'Annualized return on investment'
    },
    {
      id: 'totalReturn',
      name: 'Total Return',
      type: 'number',
      unit: 'USD',
      description: 'Total dollar return including tax benefits'
    },
    {
      id: 'taxBenefits',
      name: 'Tax Benefits',
      type: 'object',
      description: 'Detailed breakdown of tax benefits'
    },
    {
      id: 'deferredTaxSavings',
      name: 'Deferred Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Tax savings from deferral'
    },
    {
      id: 'eliminatedTaxSavings',
      name: 'Eliminated Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Tax savings from elimination'
    },
    {
      id: 'basisStepUpSavings',
      name: 'Basis Step-Up Savings',
      type: 'number',
      unit: 'USD',
      description: 'Tax savings from basis step-up'
    },
    {
      id: 'investmentGrowth',
      name: 'Investment Growth',
      type: 'object',
      description: 'Projected investment value over time'
    },
    {
      id: 'cashFlowAnalysis',
      name: 'Cash Flow Analysis',
      type: 'object',
      description: 'Annual cash flow projections'
    },
    {
      id: 'exitAnalysis',
      name: 'Exit Analysis',
      type: 'object',
      description: 'Analysis of exit scenarios'
    },
    {
      id: 'comparisonAnalysis',
      name: 'Comparison Analysis',
      type: 'object',
      description: 'Comparison with alternative investments'
    },
    {
      id: 'riskAssessment',
      name: 'Risk Assessment',
      type: 'object',
      description: 'Assessment of investment risks'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'array',
      description: 'Investment recommendations'
    },
    {
      id: 'complianceChecklist',
      name: 'Compliance Checklist',
      type: 'array',
      description: 'Opportunity Zone compliance requirements'
    },
    {
      id: 'timelineAnalysis',
      name: 'Timeline Analysis',
      type: 'object',
      description: 'Key dates and milestones'
    }
  ],
  calculate: (inputs: OpportunityZoneInvestmentROIInputs) => {
    return calculateOpportunityZoneInvestmentROI(inputs);
  },
  validate: validateOpportunityZoneInvestmentROIInputs,
  quickValidate: quickValidateOpportunityZoneInvestmentROI,
  generateAnalysis: (inputs: OpportunityZoneInvestmentROIInputs, outputs: any) => {
    return generateOpportunityZoneInvestmentROIAnalysis(inputs, outputs);
  }
};