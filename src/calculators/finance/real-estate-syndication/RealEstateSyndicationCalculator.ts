import { Calculator } from '../../types';
import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs } from './types';
import { calculateRealEstateSyndication } from './formulas';
import { validateRealEstateSyndicationInputs, getValidationErrors } from './validation';

export const realEstateSyndicationCalculator: Calculator<RealEstateSyndicationInputs, RealEstateSyndicationOutputs> = {
  name: 'Real Estate Syndication Calculator',
  description: 'Calculate returns, fees, and risk metrics for real estate syndication investments',
  category: 'Finance',
  tags: ['real estate', 'syndication', 'investment', 'returns', 'fees', 'risk', 'waterfall'],
  inputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      placeholder: 'Enter total investment',
      required: true,
      description: 'Total amount to be invested in the project'
    },
    {
      id: 'sponsorEquity',
      label: 'Sponsor Equity',
      type: 'currency',
      placeholder: 'Enter sponsor equity',
      required: true,
      description: 'Amount of equity contributed by the sponsor'
    },
    {
      id: 'investorEquity',
      label: 'Investor Equity',
      type: 'currency',
      placeholder: 'Enter investor equity',
      required: true,
      description: 'Amount of equity contributed by investors'
    },
    {
      id: 'preferredReturn',
      label: 'Preferred Return (%)',
      type: 'percentage',
      placeholder: 'Enter preferred return',
      required: true,
      description: 'Preferred return rate for investors'
    },
    {
      id: 'promotePercentage',
      label: 'Promote Percentage (%)',
      type: 'percentage',
      placeholder: 'Enter promote percentage',
      required: true,
      description: 'Percentage of profits going to sponsor after preferred return'
    },
    {
      id: 'waterfallStructure',
      label: 'Waterfall Structure',
      type: 'select',
      placeholder: 'Select waterfall structure',
      required: true,
      description: 'Structure of the profit distribution waterfall',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'complex', label: 'Complex' },
        { value: 'custom', label: 'Custom' }
      ]
    },
    {
      id: 'holdPeriod',
      label: 'Hold Period (Years)',
      type: 'number',
      placeholder: 'Enter hold period',
      required: true,
      description: 'Expected hold period for the investment'
    },
    {
      id: 'expectedIRR',
      label: 'Expected IRR (%)',
      type: 'percentage',
      placeholder: 'Enter expected IRR',
      required: true,
      description: 'Expected internal rate of return'
    },
    {
      id: 'expectedMultiple',
      label: 'Expected Multiple',
      type: 'decimal',
      placeholder: 'Enter expected multiple',
      required: true,
      description: 'Expected multiple of original investment'
    },
    {
      id: 'managementFees',
      label: 'Management Fees',
      type: 'currency',
      placeholder: 'Enter management fees',
      required: true,
      description: 'Annual management fees'
    },
    {
      id: 'acquisitionFees',
      label: 'Acquisition Fees',
      type: 'currency',
      placeholder: 'Enter acquisition fees',
      required: true,
      description: 'Fees paid at acquisition'
    },
    {
      id: 'dispositionFees',
      label: 'Disposition Fees',
      type: 'currency',
      placeholder: 'Enter disposition fees',
      required: true,
      description: 'Fees paid at disposition'
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses',
      type: 'currency',
      placeholder: 'Enter operating expenses',
      required: true,
      description: 'Annual operating expenses'
    },
    {
      id: 'debtService',
      label: 'Debt Service',
      type: 'currency',
      placeholder: 'Enter debt service',
      required: true,
      description: 'Annual debt service payments'
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      placeholder: 'Enter property value',
      required: true,
      description: 'Current value of the property'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      placeholder: 'Enter exit value',
      required: true,
      description: 'Expected value at exit'
    },
    {
      id: 'depreciation',
      label: 'Depreciation',
      type: 'currency',
      placeholder: 'Enter depreciation',
      required: true,
      description: 'Annual depreciation amount'
    },
    {
      id: 'taxBenefits',
      label: 'Tax Benefits',
      type: 'currency',
      placeholder: 'Enter tax benefits',
      required: true,
      description: 'Annual tax benefits'
    },
    {
      id: 'investorCount',
      label: 'Investor Count',
      type: 'number',
      placeholder: 'Enter investor count',
      required: true,
      description: 'Number of investors'
    },
    {
      id: 'minimumInvestment',
      label: 'Minimum Investment',
      type: 'currency',
      placeholder: 'Enter minimum investment',
      required: true,
      description: 'Minimum investment amount per investor'
    },
    {
      id: 'maximumInvestment',
      label: 'Maximum Investment',
      type: 'currency',
      placeholder: 'Enter maximum investment',
      required: true,
      description: 'Maximum investment amount per investor'
    },
    {
      id: 'investorType',
      label: 'Investor Type',
      type: 'select',
      placeholder: 'Select investor type',
      required: true,
      description: 'Type of investors allowed',
      options: [
        { value: 'accredited', label: 'Accredited Only' },
        { value: 'non-accredited', label: 'Non-Accredited Only' },
        { value: 'both', label: 'Both' }
      ]
    },
    {
      id: 'stateRegulations',
      label: 'State Regulations',
      type: 'text',
      placeholder: 'Enter state regulations',
      required: false,
      description: 'States where the offering will be made'
    },
    {
      id: 'secCompliance',
      label: 'SEC Compliance',
      type: 'boolean',
      placeholder: 'Enable SEC compliance',
      required: true,
      description: 'Whether the offering complies with SEC regulations'
    },
    {
      id: 'offeringDocument',
      label: 'Offering Document',
      type: 'boolean',
      placeholder: 'Enable offering document',
      required: true,
      description: 'Whether an offering document is required'
    },
    {
      id: 'dueDiligence',
      label: 'Due Diligence',
      type: 'boolean',
      placeholder: 'Enable due diligence',
      required: true,
      description: 'Whether due diligence is required'
    }
  ],
  outputs: [
    {
      id: 'capitalStructure',
      label: 'Capital Structure',
      type: 'object',
      description: 'Breakdown of capital structure'
    },
    {
      id: 'feeStructure',
      label: 'Fee Structure',
      type: 'object',
      description: 'Breakdown of fees'
    },
    {
      id: 'waterfallAnalysis',
      label: 'Waterfall Analysis',
      type: 'object',
      description: 'Analysis of profit distribution waterfall'
    },
    {
      id: 'returnProjections',
      label: 'Return Projections',
      type: 'object',
      description: 'Projected returns and cash flow'
    },
    {
      id: 'taxAnalysis',
      label: 'Tax Analysis',
      type: 'object',
      description: 'Tax benefits and savings'
    },
    {
      id: 'investorAnalysis',
      label: 'Investor Analysis',
      type: 'object',
      description: 'Analysis of investor structure'
    },
    {
      id: 'complianceAnalysis',
      label: 'Compliance Analysis',
      type: 'object',
      description: 'Compliance requirements and costs'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'object',
      description: 'Assessment of various risks'
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      description: 'Overall summary of the syndication'
    }
  ],
  calculate: (inputs: RealEstateSyndicationInputs): RealEstateSyndicationOutputs => {
    const validation = validateRealEstateSyndicationInputs(inputs);
    const errors = getValidationErrors(inputs);
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return calculateRealEstateSyndication(inputs);
  },
  validate: validateRealEstateSyndicationInputs
};