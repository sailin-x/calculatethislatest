import { Calculator, Formula } from '../../types/calculator';
import { calculateRentersInsurance, validateRentersInsuranceInputs } from './formulas';
import { getRentersInsuranceValidationRules } from './validation';

/**
 * Renters insurance formula implementation
 */
const rentersInsuranceFormula: Formula = {
  id: 'renters-insurance',
  name: 'Renters Insurance',
  description: 'Calculate renters insurance costs and coverage analysis',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateRentersInsurance(inputs as any);
    return {
      outputs: result,
      explanation: 'Renters insurance analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading renters insurance calculator with comprehensive features
 */
export const rentersInsuranceCalculator: Calculator = {
  id: 'renters-insurance-calculator',
  title: 'Renters Insurance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive renters insurance cost analysis including coverage evaluation, premium calculations, and value assessment with industry-standard metrics.',

  usageInstructions: [
    'Enter your monthly rent and coverage period',
    'Specify personal property and liability coverage amounts',
    'Include insurance premium and deductible information',
    'Review comprehensive cost analysis and coverage evaluation'
  ],

  inputs: [
    {
      id: 'monthlyRent',
      label: 'Monthly Rent',
      type: 'currency',
      required: true,
      placeholder: '2000',
      tooltip: 'Your current monthly rent payment',
      defaultValue: 2000
    },
    {
      id: 'annualRentIncrease',
      label: 'Annual Rent Increase (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual rent increase',
      defaultValue: 3,
      min: -10,
      max: 20
    },
    {
      id: 'coverageYears',
      label: 'Coverage Period (Years)',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Number of years to analyze',
      defaultValue: 5,
      min: 1,
      max: 50
    },
    {
      id: 'personalPropertyValue',
      label: 'Personal Property Value',
      type: 'currency',
      required: false,
      placeholder: '30000',
      tooltip: 'Value of personal belongings to insure',
      defaultValue: 30000
    },
    {
      id: 'liabilityCoverage',
      label: 'Liability Coverage',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Liability coverage amount',
      defaultValue: 100000
    },
    {
      id: 'deductibleAmount',
      label: 'Deductible Amount',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Insurance deductible amount',
      defaultValue: 500
    },
    {
      id: 'insurancePremium',
      label: 'Annual Insurance Premium',
      type: 'currency',
      required: true,
      placeholder: '400',
      tooltip: 'Annual insurance premium cost',
      defaultValue: 400
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3,
      min: -5,
      max: 15
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Discount rate for present value calculations',
      defaultValue: 5,
      min: 0,
      max: 20
    },
    {
      id: 'replacementCostCoverage',
      label: 'Replacement Cost Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Whether policy includes replacement cost coverage',
      defaultValue: true
    },
    {
      id: 'additionalLivingExpenses',
      label: 'Additional Living Expenses (ALE)',
      type: 'boolean',
      required: false,
      tooltip: 'Whether policy includes additional living expenses coverage',
      defaultValue: false
    },
    {
      id: 'aleCoverageDays',
      label: 'ALE Coverage Days',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Number of days ALE coverage provides',
      defaultValue: 30,
      min: 0,
      max: 365
    },
    {
      id: 'aleDailyRate',
      label: 'ALE Daily Rate',
      type: 'currency',
      required: false,
      placeholder: '100',
      tooltip: 'Daily rate for additional living expenses',
      defaultValue: 100,
      min: 0,
      max: 500
    }
  ],

  outputs: [
    {
      id: 'totalInsuranceCost',
      label: 'Total Insurance Cost',
      type: 'currency',
      explanation: 'Total insurance premiums over coverage period'
    },
    {
      id: 'averageAnnualPremium',
      label: 'Average Annual Premium',
      type: 'currency',
      explanation: 'Average annual insurance cost'
    },
    {
      id: 'totalRentPaid',
      label: 'Total Rent Paid',
      type: 'currency',
      explanation: 'Total rent paid over coverage period'
    },
    {
      id: 'totalRentIncrease',
      label: 'Total Rent Increase',
      type: 'currency',
      explanation: 'Total increase in rent over coverage period'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value of Costs',
      type: 'currency',
      explanation: 'Present value of all insurance costs'
    },
    {
      id: 'insuranceCostPercentage',
      label: 'Insurance as % of Rent',
      type: 'percentage',
      explanation: 'Insurance cost as percentage of annual rent'
    },
    {
      id: 'monthlyInsuranceCost',
      label: 'Monthly Insurance Cost',
      type: 'currency',
      explanation: 'Average monthly insurance cost'
    },
    {
      id: 'annualInsuranceCost',
      label: 'Annual Insurance Cost',
      type: 'currency',
      explanation: 'Average annual insurance cost'
    },
    {
      id: 'totalLiabilityCoverage',
      label: 'Total Liability Coverage',
      type: 'currency',
      explanation: 'Total liability coverage amount'
    },
    {
      id: 'totalPersonalPropertyCoverage',
      label: 'Total Personal Property Coverage',
      type: 'currency',
      explanation: 'Total personal property coverage amount'
    },
    {
      id: 'aleCoverageAmount',
      label: 'ALE Coverage Amount',
      type: 'currency',
      explanation: 'Total additional living expenses coverage'
    },
    {
      id: 'costPerThousandCoverage',
      label: 'Cost per $1,000 Coverage',
      type: 'currency',
      explanation: 'Insurance cost per thousand dollars of coverage'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'number',
      explanation: 'Years needed for insurance to break even vs. risk'
    },
    {
      id: 'returnOnInsurance',
      label: 'Return on Insurance (%)',
      type: 'percentage',
      explanation: 'Return on insurance investment'
    }
  ],

  formulas: [rentersInsuranceFormula],

  validationRules: getRentersInsuranceValidationRules(),

  examples: [
    {
      title: 'Standard Renters Insurance',
      description: 'Analysis of typical renters insurance policy',
      inputs: {
        monthlyRent: 2000,
        annualRentIncrease: 3,
        coverageYears: 5,
        personalPropertyValue: 30000,
        liabilityCoverage: 100000,
        deductibleAmount: 500,
        insurancePremium: 400,
        inflationRate: 3,
        discountRate: 5,
        replacementCostCoverage: true,
        additionalLivingExpenses: false,
        aleCoverageDays: 0,
        aleDailyRate: 0
      },
      expectedOutputs: {
        totalInsuranceCost: 2120,
        averageAnnualPremium: 424,
        totalRentPaid: 126000,
        totalRentIncrease: 6300,
        netPresentValue: 1820,
        insuranceCostPercentage: 2.1,
        monthlyInsuranceCost: 35.3,
        annualInsuranceCost: 424,
        totalLiabilityCoverage: 100000,
        totalPersonalPropertyCoverage: 30000,
        aleCoverageAmount: 0,
        costPerThousandCoverage: 8.5,
        breakEvenPoint: 0.8,
        returnOnInsurance: 25.0
      }
    }
  ]
};