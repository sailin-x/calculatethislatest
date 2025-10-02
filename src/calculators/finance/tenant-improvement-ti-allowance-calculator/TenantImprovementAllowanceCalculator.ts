import { Calculator, Formula } from '../../types/calculator';
import { calculateTenantImprovementAllowance, validateTenantImprovementAllowanceInputs } from './formulas';
import { getTenantImprovementAllowanceValidationRules } from './validation';

/**
 * Tenant improvement allowance formula implementation
 */
const tenantImprovementAllowanceFormula: Formula = {
  id: 'tenant-improvement-allowance',
  name: 'Tenant Improvement Allowance',
  description: 'Calculate TI allowance costs, financing, and ROI analysis',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateTenantImprovementAllowance(inputs as any);
    return {
      outputs: result,
      explanation: 'Tenant improvement allowance analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading tenant improvement allowance calculator with comprehensive features
 */
export const tenantImprovementAllowanceCalculator: Calculator = {
  id: 'tenant-improvement-ti-allowance-calculator',
  title: 'Tenant Improvement (TI) Allowance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive tenant improvement allowance analysis including cost distribution, financing options, tax implications, and ROI calculations for commercial real estate investments.',

  usageInstructions: [
    'Enter lease terms and TI allowance amount',
    'Specify landlord contribution percentage',
    'Include construction costs and financing details',
    'Review comprehensive cost analysis and ROI metrics'
  ],

  inputs: [
    {
      id: 'leaseTermYears',
      label: 'Lease Term (Years)',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Length of the lease agreement in years',
      defaultValue: 5,
      min: 1,
      max: 50
    },
    {
      id: 'annualRent',
      label: 'Annual Rent',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Annual rental income from the lease',
      defaultValue: 50000
    },
    {
      id: 'tenantImprovementAllowance',
      label: 'TI Allowance Amount',
      type: 'currency',
      required: true,
      placeholder: '25000',
      tooltip: 'Total tenant improvement allowance budgeted',
      defaultValue: 25000
    },
    {
      id: 'landlordContributionPercentage',
      label: 'Landlord Contribution (%)',
      type: 'percentage',
      required: true,
      placeholder: '100',
      tooltip: 'Percentage of TI allowance paid by landlord',
      defaultValue: 100,
      min: 0,
      max: 100
    },
    {
      id: 'totalConstructionCost',
      label: 'Total Construction Cost',
      type: 'currency',
      required: true,
      placeholder: '30000',
      tooltip: 'Total cost of all tenant improvements',
      defaultValue: 30000
    },
    {
      id: 'constructionPeriodMonths',
      label: 'Construction Period (Months)',
      type: 'number',
      required: false,
      placeholder: '3',
      tooltip: 'Time required to complete tenant improvements',
      defaultValue: 3,
      min: 0,
      max: 60
    },
    {
      id: 'financingRate',
      label: 'Financing Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Interest rate for financing the TI allowance',
      defaultValue: 6.5,
      min: 0,
      max: 30,
      step: 0.125
    },
    {
      id: 'holdingPeriodYears',
      label: 'Holding Period (Years)',
      type: 'number',
      required: false,
      placeholder: '5',
      tooltip: 'Period over which to analyze the investment',
      defaultValue: 5,
      min: 0,
      max: 50
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'Rate used to discount future cash flows',
      defaultValue: 8,
      min: 0,
      max: 20
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '30',
      tooltip: 'Marginal tax rate for tax benefit calculations',
      defaultValue: 30,
      min: 0,
      max: 50
    },
    {
      id: 'depreciationYears',
      label: 'Depreciation Period (Years)',
      type: 'number',
      required: false,
      placeholder: '7',
      tooltip: 'Useful life for depreciation calculations',
      defaultValue: 7,
      min: 1,
      max: 50
    },
    {
      id: 'expectedAppreciation',
      label: 'Expected Appreciation (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual property value increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'includeFinancing',
      label: 'Include Financing Costs',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include financing costs in the analysis',
      defaultValue: true
    },
    {
      id: 'includeDepreciation',
      label: 'Include Depreciation Benefits',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include depreciation tax benefits',
      defaultValue: true
    },
    {
      id: 'includeTaxBenefits',
      label: 'Include Tax Benefits',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to include tax benefits in the analysis',
      defaultValue: true
    }
  ],

  outputs: [
    {
      id: 'landlordTotalCost',
      label: 'Landlord Total Cost',
      type: 'currency',
      explanation: 'Total amount the landlord will pay for tenant improvements'
    },
    {
      id: 'tenantTotalCost',
      label: 'Tenant Total Cost',
      type: 'currency',
      explanation: 'Total amount the tenant will pay for tenant improvements'
    },
    {
      id: 'totalProjectCost',
      label: 'Total Project Cost',
      type: 'currency',
      explanation: 'Total cost of all tenant improvement work'
    },
    {
      id: 'monthlyFinancingCost',
      label: 'Monthly Financing Cost',
      type: 'currency',
      explanation: 'Monthly cost of financing the landlord contribution'
    },
    {
      id: 'annualFinancingCost',
      label: 'Annual Financing Cost',
      type: 'currency',
      explanation: 'Annual cost of financing the landlord contribution'
    },
    {
      id: 'annualDepreciation',
      label: 'Annual Depreciation',
      type: 'currency',
      explanation: 'Annual depreciation expense for tax purposes'
    },
    {
      id: 'annualTaxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Annual tax savings from depreciation and financing costs'
    },
    {
      id: 'netAnnualCost',
      label: 'Net Annual Cost',
      type: 'currency',
      explanation: 'Net annual cost to landlord after tax benefits'
    },
    {
      id: 'npvOfCosts',
      label: 'NPV of Costs',
      type: 'currency',
      explanation: 'Net present value of all costs over the holding period'
    },
    {
      id: 'irrOfInvestment',
      label: 'IRR of Investment (%)',
      type: 'percentage',
      explanation: 'Internal rate of return on the TI allowance investment'
    },
    {
      id: 'paybackPeriodYears',
      label: 'Payback Period (Years)',
      type: 'number',
      explanation: 'Years required to recover the TI allowance investment'
    },
    {
      id: 'roiPercentage',
      label: 'ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment percentage'
    },
    {
      id: 'effectiveRentIncrease',
      label: 'Effective Rent Increase (%)',
      type: 'percentage',
      explanation: 'Effective increase in rent due to TI allowance'
    },
    {
      id: 'costPerSquareFoot',
      label: 'Cost per Sq Ft',
      type: 'currency',
      explanation: 'TI allowance cost per square foot of rentable space'
    },
    {
      id: 'allowanceUtilizationRate',
      label: 'Allowance Utilization (%)',
      type: 'percentage',
      explanation: 'Percentage of TI allowance actually used'
    },
    {
      id: 'breakEvenOccupancy',
      label: 'Break-Even Occupancy (%)',
      type: 'percentage',
      explanation: 'Occupancy rate needed to break even on TI costs'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'Analysis of how changes in key variables affect ROI'
    },
    {
      id: 'recommendation',
      label: 'Investment Recommendation',
      type: 'text',
      explanation: 'Recommendation based on the analysis'
    }
  ],

  formulas: [tenantImprovementAllowanceFormula],

  validationRules: getTenantImprovementAllowanceValidationRules(),

  examples: [
    {
      title: 'Office Space TI Allowance',
      description: 'Analysis of $25,000 TI allowance for 5-year office lease',
      inputs: {
        leaseTermYears: 5,
        annualRent: 50000,
        tenantImprovementAllowance: 25000,
        landlordContributionPercentage: 100,
        totalConstructionCost: 30000,
        constructionPeriodMonths: 3,
        financingRate: 6.5,
        holdingPeriodYears: 5,
        discountRate: 8,
        taxRate: 30,
        depreciationYears: 7,
        expectedAppreciation: 3,
        includeFinancing: true,
        includeDepreciation: true,
        includeTaxBenefits: true
      },
      expectedOutputs: {
        landlordTotalCost: 25000,
        tenantTotalCost: 0,
        totalProjectCost: 30000,
        monthlyFinancingCost: 450,
        annualFinancingCost: 5400,
        annualDepreciation: 3571,
        annualTaxSavings: 2697,
        netAnnualCost: 2703,
        npvOfCosts: 11500,
        irrOfInvestment: 12.5,
        paybackPeriodYears: 4.2,
        roiPercentage: 15.8,
        effectiveRentIncrease: 0.5,
        costPerSquareFoot: 25,
        allowanceUtilizationRate: 83.3,
        breakEvenOccupancy: 95,
        sensitivityAnalysis: 'Sensitivity Analysis:\n• 80% landlord contribution: 12.6% ROI\n• 120% landlord contribution: 18.9% ROI\n• 5.5% financing rate: 13.2% ROI\n• 7.5% financing rate: 17.8% ROI\n',
        recommendation: 'Good investment opportunity - solid returns with acceptable payback period'
      }
    }
  ]
};