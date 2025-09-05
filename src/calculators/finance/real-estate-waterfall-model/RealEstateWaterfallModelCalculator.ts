import { Calculator } from '../../types';
import { RealEstateWaterfallModelInputs, RealEstateWaterfallModelOutputs } from './types';
import { calculateRealEstateWaterfallModel } from './formulas';
import { validateRealEstateWaterfallModelInputs } from './validation';

export const realEstateWaterfallModelCalculator: Calculator<RealEstateWaterfallModelInputs, RealEstateWaterfallModelOutputs> = {
  id: 'real-estate-waterfall-model',
  name: 'Real Estate Waterfall Model Calculator',
  description: 'Calculate real estate investment waterfall structures, returns, and compliance requirements',
  category: 'finance',
  tags: ['real estate', 'waterfall', 'investment', 'syndication', 'returns', 'compliance'],
  inputs: {
    totalInvestment: {
      label: 'Total Investment',
      type: 'number',
      required: true,
      description: 'Total amount of capital to be invested in the project',
      placeholder: '10000000',
      min: 0,
      max: 1000000000
    },
    sponsorEquity: {
      label: 'Sponsor Equity',
      type: 'number',
      required: true,
      description: 'Amount of equity contributed by the sponsor/general partner',
      placeholder: '1000000',
      min: 0,
      max: 1000000000
    },
    investorEquity: {
      label: 'Investor Equity',
      type: 'number',
      required: true,
      description: 'Amount of equity contributed by investors/limited partners',
      placeholder: '4000000',
      min: 0,
      max: 1000000000
    },
    preferredReturn: {
      label: 'Preferred Return (%)',
      type: 'number',
      required: true,
      description: 'Preferred return rate for investors before profit sharing',
      placeholder: '8',
      min: 0,
      max: 20,
      step: 0.1
    },
    catchUpPercentage: {
      label: 'Catch-Up Percentage (%)',
      type: 'number',
      required: true,
      description: 'Percentage of profits that go to sponsor during catch-up phase',
      placeholder: '10',
      min: 0,
      max: 50,
      step: 0.1
    },
    promotePercentage: {
      label: 'Promote Percentage (%)',
      type: 'number',
      required: true,
      description: 'Percentage of profits that go to sponsor after preferred return and catch-up',
      placeholder: '20',
      min: 0,
      max: 50,
      step: 0.1
    },
    waterfallStructure: {
      label: 'Waterfall Structure',
      type: 'select',
      required: true,
      description: 'Type of waterfall structure to use',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'complex', label: 'Complex' },
        { value: 'custom', label: 'Custom' }
      ],
      placeholder: 'simple'
    },
    holdPeriod: {
      label: 'Hold Period (years)',
      type: 'number',
      required: true,
      description: 'Expected hold period for the investment',
      placeholder: '5',
      min: 1,
      max: 30
    },
    annualCashFlow: {
      label: 'Annual Cash Flow',
      type: 'number',
      required: true,
      description: 'Expected annual cash flow from the property',
      placeholder: '500000',
      min: 0,
      max: 10000000
    },
    exitValue: {
      label: 'Exit Value',
      type: 'number',
      required: true,
      description: 'Expected property value at exit/sale',
      placeholder: '15000000',
      min: 0,
      max: 1000000000
    },
    managementFees: {
      label: 'Management Fees',
      type: 'number',
      required: true,
      description: 'Annual management fees paid to sponsor',
      placeholder: '100000',
      min: 0,
      max: 1000000
    },
    acquisitionFees: {
      label: 'Acquisition Fees',
      type: 'number',
      required: true,
      description: 'One-time fees paid for acquiring the property',
      placeholder: '200000',
      min: 0,
      max: 1000000
    },
    dispositionFees: {
      label: 'Disposition Fees',
      type: 'number',
      required: true,
      description: 'One-time fees paid for selling the property',
      placeholder: '150000',
      min: 0,
      max: 1000000
    },
    operatingExpenses: {
      label: 'Operating Expenses',
      type: 'number',
      required: true,
      description: 'Annual operating expenses for the property',
      placeholder: '200000',
      min: 0,
      max: 5000000
    },
    debtService: {
      label: 'Debt Service',
      type: 'number',
      required: true,
      description: 'Annual debt service payments',
      placeholder: '300000',
      min: 0,
      max: 10000000
    },
    propertyValue: {
      label: 'Property Value',
      type: 'number',
      required: true,
      description: 'Current market value of the property',
      placeholder: '12000000',
      min: 0,
      max: 1000000000
    },
    loanAmount: {
      label: 'Loan Amount',
      type: 'number',
      required: true,
      description: 'Amount of debt financing',
      placeholder: '5000000',
      min: 0,
      max: 1000000000
    },
    interestRate: {
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      description: 'Interest rate on the loan',
      placeholder: '4.5',
      min: 0,
      max: 20,
      step: 0.1
    },
    loanTerm: {
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      description: 'Term of the loan in years',
      placeholder: '30',
      min: 1,
      max: 30
    },
    interestOnlyPeriod: {
      label: 'Interest-Only Period (years)',
      type: 'number',
      required: true,
      description: 'Number of years with interest-only payments',
      placeholder: '5',
      min: 0,
      max: 30
    },
    depreciation: {
      label: 'Depreciation',
      type: 'number',
      required: true,
      description: 'Annual depreciation expense for tax purposes',
      placeholder: '400000',
      min: 0,
      max: 1000000
    },
    taxBenefits: {
      label: 'Tax Benefits',
      type: 'number',
      required: true,
      description: 'Additional tax benefits beyond depreciation',
      placeholder: '50000',
      min: 0,
      max: 1000000
    },
    investorCount: {
      label: 'Investor Count',
      type: 'number',
      required: true,
      description: 'Number of investors in the syndication',
      placeholder: '50',
      min: 1,
      max: 1000
    },
    minimumInvestment: {
      label: 'Minimum Investment',
      type: 'number',
      required: true,
      description: 'Minimum investment amount per investor',
      placeholder: '50000',
      min: 0,
      max: 1000000
    },
    maximumInvestment: {
      label: 'Maximum Investment',
      type: 'number',
      required: true,
      description: 'Maximum investment amount per investor',
      placeholder: '500000',
      min: 0,
      max: 10000000
    },
    investorType: {
      label: 'Investor Type',
      type: 'select',
      required: true,
      description: 'Type of investors in the syndication',
      options: [
        { value: 'accredited', label: 'Accredited' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'retail', label: 'Retail' }
      ],
      placeholder: 'accredited'
    },
    stateRegulations: {
      label: 'State Regulations',
      type: 'multiselect',
      required: false,
      description: 'States where the offering will be made',
      options: [
        { value: 'CA', label: 'California' },
        { value: 'NY', label: 'New York' },
        { value: 'TX', label: 'Texas' },
        { value: 'FL', label: 'Florida' },
        { value: 'IL', label: 'Illinois' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'OH', label: 'Ohio' },
        { value: 'GA', label: 'Georgia' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'MI', label: 'Michigan' }
      ],
      placeholder: 'Select states'
    },
    secCompliance: {
      label: 'SEC Compliance',
      type: 'boolean',
      required: true,
      description: 'Whether the offering complies with SEC regulations',
      placeholder: 'false'
    },
    offeringDocument: {
      label: 'Offering Document',
      type: 'boolean',
      required: true,
      description: 'Whether a formal offering document is prepared',
      placeholder: 'false'
    },
    dueDiligence: {
      label: 'Due Diligence',
      type: 'boolean',
      required: true,
      description: 'Whether due diligence has been completed',
      placeholder: 'false'
    }
  },
  outputs: {
    capitalStructure: {
      label: 'Capital Structure',
      type: 'object',
      description: 'Breakdown of the capital structure including equity and debt'
    },
    feeStructure: {
      label: 'Fee Structure',
      type: 'object',
      description: 'Breakdown of all fees associated with the investment'
    },
    waterfallAnalysis: {
      label: 'Waterfall Analysis',
      type: 'object',
      description: 'Analysis of the waterfall structure and profit sharing'
    },
    cashFlowProjection: {
      label: 'Cash Flow Projection',
      type: 'object',
      description: 'Projected cash flows over the hold period'
    },
    returnProjections: {
      label: 'Return Projections',
      type: 'object',
      description: 'Expected returns including IRR and multiples'
    },
    taxAnalysis: {
      label: 'Tax Analysis',
      type: 'object',
      description: 'Tax benefits and after-tax returns'
    },
    investorAnalysis: {
      label: 'Investor Analysis',
      type: 'object',
      description: 'Analysis of investor structure and requirements'
    },
    complianceAnalysis: {
      label: 'Compliance Analysis',
      type: 'object',
      description: 'Regulatory compliance requirements and costs'
    },
    riskAssessment: {
      label: 'Risk Assessment',
      type: 'object',
      description: 'Assessment of various risk factors'
    },
    summary: {
      label: 'Summary',
      type: 'object',
      description: 'Overall summary of the waterfall model'
    }
  },
  calculate: (inputs: RealEstateWaterfallModelInputs): RealEstateWaterfallModelOutputs => {
    const errors = validateRealEstateWaterfallModelInputs(inputs);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateWaterfallModel(inputs);
  }
};