import { Calculator, Formula } from '../../types/calculator';
import { calculateAPTValue, validateAPTValueInputs } from './formulas';
import { getAPTValueValidationRules } from './validation';

/**
 * APT value formula implementation
 */
const aptValueFormula: Formula = {
  id: 'apt-value',
  name: 'Asset Protection Trust Value',
  description: 'Calculate APT value, protection analysis, and financial projections',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateAPTValue(inputs as any);
    return {
      outputs: result,
      explanation: 'APT value analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Asset Protection Trust (APT) Value Calculator
 */
export const aptValueCalculator: Calculator = {
  id: 'asset-protection-trust-apt-value-calculator',
  title: 'Asset Protection Trust (APT) Value Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive APT analysis including trust value projections, asset protection assessment, tax implications, and risk-adjusted returns for estate planning and wealth preservation.',

  usageInstructions: [
    'Enter trust assets and contribution details',
    'Specify trust terms and investment parameters',
    'Review protection analysis and financial projections',
    'Consider tax implications and risk factors'
  ],

  inputs: [
    {
      id: 'trustAssets',
      label: 'Initial Trust Assets',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Initial assets to fund the trust',
      defaultValue: 500000
    },
    {
      id: 'annualContributions',
      label: 'Annual Contributions',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Annual contributions to the trust',
      defaultValue: 50000
    },
    {
      id: 'contributionYears',
      label: 'Contribution Years',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Number of years of contributions',
      defaultValue: 10,
      min: 0,
      max: 50
    },
    {
      id: 'trustDuration',
      label: 'Trust Duration (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Duration of the trust in years',
      defaultValue: 20,
      min: 1,
      max: 100
    },
    {
      id: 'distributionFrequency',
      label: 'Distribution Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often distributions are made',
      defaultValue: 'annual'
    },
    {
      id: 'trusteeFees',
      label: 'Annual Trustee Fees',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Annual fees for trustee services',
      defaultValue: 5000
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7.0',
      tooltip: 'Expected annual return on trust assets',
      defaultValue: 7.0,
      min: -10,
      max: 30,
      step: 0.1
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
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Applicable tax rate for trust income',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      placeholder: '2',
      tooltip: 'Number of trust beneficiaries',
      defaultValue: 2,
      min: 1,
      max: 50
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Years)',
      type: 'number',
      required: false,
      placeholder: '85',
      tooltip: 'Life expectancy for planning purposes',
      defaultValue: 85,
      min: 1,
      max: 120
    },
    {
      id: 'setupCosts',
      label: 'Setup Costs',
      type: 'currency',
      required: false,
      placeholder: '10000',
      tooltip: 'Initial setup costs for the trust',
      defaultValue: 10000
    },
    {
      id: 'annualLegalFees',
      label: 'Annual Legal Fees',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual legal and administrative fees',
      defaultValue: 2000
    },
    {
      id: 'stateOfFormation',
      label: 'State of Formation',
      type: 'select',
      required: true,
      options: [
        { value: 'alaska', label: 'Alaska' },
        { value: 'delaware', label: 'Delaware' },
        { value: 'south dakota', label: 'South Dakota' },
        { value: 'wyoming', label: 'Wyoming' },
        { value: 'new hampshire', label: 'New Hampshire' }
      ],
      tooltip: 'State where the trust is formed',
      defaultValue: 'delaware'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation',
      type: 'boolean',
      required: false,
      tooltip: 'Adjust calculations for inflation',
      defaultValue: true
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6.0',
      tooltip: 'Rate used to discount future values',
      defaultValue: 6.0,
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Period over which to analyze the trust',
      defaultValue: 20,
      min: 1,
      max: 100
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Risk tolerance for investment strategy',
      defaultValue: 'medium'
    }
  ],

  outputs: [
    {
      id: 'currentTrustValue',
      label: 'Current Trust Value',
      type: 'currency',
      explanation: 'Current value of trust assets'
    },
    {
      id: 'projectedTrustValue',
      label: 'Projected Trust Value',
      type: 'currency',
      explanation: 'Projected value at end of analysis period'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed to the trust'
    },
    {
      id: 'totalFees',
      label: 'Total Fees',
      type: 'currency',
      explanation: 'Total fees over the trust period'
    },
    {
      id: 'perBeneficiaryValue',
      label: 'Per Beneficiary Value',
      type: 'currency',
      explanation: 'Trust value per beneficiary'
    },
    {
      id: 'annualDistribution',
      label: 'Annual Distribution',
      type: 'currency',
      explanation: 'Annual distribution per beneficiary'
    },
    {
      id: 'totalDistributions',
      label: 'Total Distributions',
      type: 'currency',
      explanation: 'Total distributions over trust duration'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from trust structure'
    },
    {
      id: 'afterTaxValue',
      label: 'After-Tax Value',
      type: 'currency',
      explanation: 'Trust value after taxes'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Effective tax rate on trust income'
    },
    {
      id: 'assetProtectionLevel',
      label: 'Asset Protection Level',
      type: 'text',
      explanation: 'Level of asset protection provided'
    },
    {
      id: 'creditorProtectionScore',
      label: 'Creditor Protection Score',
      type: 'number',
      explanation: 'Score indicating creditor protection strength'
    },
    {
      id: 'spendthriftProtection',
      label: 'Spendthrift Protection',
      type: 'text',
      explanation: 'Whether spendthrift protection is included'
    },
    {
      id: 'totalSetupCosts',
      label: 'Total Setup Costs',
      type: 'currency',
      explanation: 'Total initial setup costs'
    },
    {
      id: 'annualOperatingCosts',
      label: 'Annual Operating Costs',
      type: 'currency',
      explanation: 'Annual operating costs'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to recover setup costs'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'IRR of the trust investment'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'NPV of trust cash flows'
    },
    {
      id: 'benefitCostRatio',
      label: 'Benefit-Cost Ratio',
      type: 'number',
      explanation: 'Ratio of benefits to costs'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendation based on analysis'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Assessment of trust risks'
    },
    {
      id: 'nextSteps',
      label: 'Next Steps',
      type: 'text',
      explanation: 'Recommended next steps'
    }
  ],

  formulas: [aptValueFormula],

  validationRules: getAPTValueValidationRules(),

  examples: [
    {
      title: 'High-Net-Worth Estate Protection',
      description: 'APT analysis for high-net-worth individual seeking asset protection',
      inputs: {
        trustAssets: 2000000,
        annualContributions: 100000,
        contributionYears: 10,
        trustDuration: 20,
        distributionFrequency: 'annual',
        trusteeFees: 15000,
        expectedReturn: 8.0,
        inflationRate: 3.0,
        taxRate: 30,
        numberOfBeneficiaries: 3,
        lifeExpectancy: 90,
        setupCosts: 25000,
        annualLegalFees: 5000,
        stateOfFormation: 'delaware',
        includeInflation: true,
        discountRate: 7.0,
        analysisPeriod: 20,
        riskTolerance: 'medium'
      },
      expectedOutputs: {
        currentTrustValue: 2000000,
        projectedTrustValue: 5800000,
        totalContributions: 3000000,
        totalFees: 400000,
        perBeneficiaryValue: 1933333,
        annualDistribution: 193333,
        totalDistributions: 3866667,
        taxSavings: 225000,
        afterTaxValue: 5575000,
        effectiveTaxRate: 30,
        assetProtectionLevel: 'Very High',
        creditorProtectionScore: 90,
        spendthriftProtection: 'Yes',
        totalSetupCosts: 25000,
        annualOperatingCosts: 20000,
        breakEvenPeriod: 1,
        internalRateOfReturn: 6.4,
        netPresentValue: 1200000,
        benefitCostRatio: 2.8,
        recommendation: 'Strong recommendation for APT establishment. The projected growth and protection benefits justify the setup costs and ongoing fees.',
        riskAssessment: 'Low to Moderate Risk - Long time horizon and reasonable return expectations provide good risk mitigation.',
        nextSteps: 'Consult with estate planning attorney specializing in asset protection, Review trust documents and ensure compliance with state laws, Verify chosen state provides adequate asset protection laws'
      }
    }
  ]
};