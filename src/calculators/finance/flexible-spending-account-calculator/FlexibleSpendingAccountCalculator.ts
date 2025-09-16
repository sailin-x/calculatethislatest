import { Calculator, Formula } from '../../../types/calculator';
import { calculateFlexibleSpendingAccount, validateFlexibleSpendingAccountInputs } from './formulas';
import { getFlexibleSpendingAccountValidationRules } from './validation';

/**
 * Flexible spending account formula implementation
 */
const flexibleSpendingAccountFormula: Formula = {
  id: 'flexible-spending-account',
  name: 'Flexible Spending Account Analysis',
  description: 'Comprehensive FSA analysis including tax savings, expense tracking, and contribution optimization',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateFlexibleSpendingAccount(inputs as any);
    return {
      outputs: result,
      explanation: 'Flexible spending account analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Flexible Spending Account Calculator
 */
export const flexibleSpendingAccountCalculator: Calculator = {
  id: 'flexible-spending-account-calculator',
  title: 'Flexible Spending Account Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive Flexible Spending Account (FSA) analysis including tax savings calculations, expense tracking, contribution optimization, and personalized recommendations for health, dependent care, and commuter benefits.',

  usageInstructions: [
    'Select your FSA account type (Health, Dependent Care, Parking, or Transit)',
    'Enter your expected annual expenses and contribution details',
    'Provide your tax information for accurate savings calculations',
    'Review tax savings, utilization rates, and optimization recommendations'
  ],

  inputs: [
    {
      id: 'accountType',
      label: 'FSA Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'health', label: 'Health FSA' },
        { value: 'dependent', label: 'Dependent Care FSA' },
        { value: 'parking', label: 'Parking FSA' },
        { value: 'transit', label: 'Transit FSA' }
      ],
      tooltip: 'Type of flexible spending account',
      defaultValue: 'health'
    },
    {
      id: 'annualContributionLimit',
      label: 'Annual Contribution Limit',
      type: 'currency',
      required: true,
      placeholder: '3050',
      tooltip: 'Maximum amount you can contribute annually',
      defaultValue: 3050,
      min: 0,
      max: 10000
    },
    {
      id: 'currentBalance',
      label: 'Current Account Balance',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Current amount in your FSA account',
      defaultValue: 500,
      min: 0,
      max: 10000
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'bi-weekly', label: 'Bi-weekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      tooltip: 'How often contributions are made',
      defaultValue: 'monthly'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: false,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married-joint', label: 'Married Filing Jointly' },
        { value: 'married-separate', label: 'Married Filing Separately' },
        { value: 'head-household', label: 'Head of Household' }
      ],
      tooltip: 'Your tax filing status',
      defaultValue: 'single'
    },
    {
      id: 'numberOfDependents',
      label: 'Number of Dependents',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Number of dependents claimed on taxes',
      defaultValue: 2,
      min: 0,
      max: 10
    },
    {
      id: 'hasSpouse',
      label: 'Have a Spouse',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have a spouse',
      defaultValue: false
    },
    {
      id: 'spouseHasCoverage',
      label: 'Spouse Has Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Check if your spouse has health coverage',
      defaultValue: false
    },
    {
      id: 'hasHealthInsurance',
      label: 'Have Health Insurance',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have health insurance',
      defaultValue: true
    },
    {
      id: 'insuranceType',
      label: 'Insurance Type',
      type: 'select',
      required: false,
      options: [
        { value: 'individual', label: 'Individual' },
        { value: 'family', label: 'Family' },
        { value: 'none', label: 'None' }
      ],
      tooltip: 'Type of health insurance coverage',
      defaultValue: 'family'
    },
    {
      id: 'expectedMedicalExpenses',
      label: 'Expected Medical Expenses',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Expected out-of-pocket medical expenses',
      defaultValue: 2000,
      min: 0,
      max: 50000
    },
    {
      id: 'preventiveCareExpenses',
      label: 'Preventive Care Expenses',
      type: 'currency',
      required: false,
      placeholder: '300',
      tooltip: 'Expected preventive care costs',
      defaultValue: 300,
      min: 0,
      max: 10000
    },
    {
      id: 'prescriptionExpenses',
      label: 'Prescription Expenses',
      type: 'currency',
      required: false,
      placeholder: '400',
      tooltip: 'Expected prescription medication costs',
      defaultValue: 400,
      min: 0,
      max: 10000
    },
    {
      id: 'dentalExpenses',
      label: 'Dental Expenses',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Expected dental care costs',
      defaultValue: 500,
      min: 0,
      max: 5000
    },
    {
      id: 'visionExpenses',
      label: 'Vision Expenses',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Expected vision care costs',
      defaultValue: 200,
      min: 0,
      max: 2000
    },
    {
      id: 'childcareExpenses',
      label: 'Childcare Expenses',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Expected childcare costs',
      defaultValue: 8000,
      min: 0,
      max: 30000
    },
    {
      id: 'eldercareExpenses',
      label: 'Eldercare Expenses',
      type: 'currency',
      required: false,
      placeholder: '6000',
      tooltip: 'Expected eldercare costs',
      defaultValue: 6000,
      min: 0,
      max: 30000
    },
    {
      id: 'childcareProvider',
      label: 'Childcare Provider Type',
      type: 'select',
      required: false,
      options: [
        { value: 'licensed', label: 'Licensed Provider' },
        { value: 'unlicensed', label: 'Unlicensed Provider' },
        { value: 'relative', label: 'Relative' }
      ],
      tooltip: 'Type of childcare provider',
      defaultValue: 'licensed'
    },
    {
      id: 'monthlyParkingCost',
      label: 'Monthly Parking Cost',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly parking expenses',
      defaultValue: 200,
      min: 0,
      max: 280
    },
    {
      id: 'monthlyTransitCost',
      label: 'Monthly Transit Cost',
      type: 'currency',
      required: false,
      placeholder: '150',
      tooltip: 'Monthly transit expenses',
      defaultValue: 150,
      min: 0,
      max: 315
    },
    {
      id: 'workDaysPerMonth',
      label: 'Work Days Per Month',
      type: 'number',
      required: false,
      placeholder: '22',
      tooltip: 'Number of days worked per month',
      defaultValue: 22,
      min: 1,
      max: 31
    },
    {
      id: 'distanceToWork',
      label: 'Distance to Work (Miles)',
      type: 'number',
      required: false,
      placeholder: '15',
      tooltip: 'One-way distance to work',
      defaultValue: 15,
      min: 0,
      max: 500
    },
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal federal tax rate',
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
      tooltip: 'Your state income tax rate',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 1
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      placeholder: '0',
      tooltip: 'Percentage of contributions matched by employer',
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 10
    },
    {
      id: 'carryoverAllowed',
      label: 'Carryover Allowed',
      type: 'boolean',
      required: false,
      tooltip: 'Check if your plan allows carryover',
      defaultValue: false
    },
    {
      id: 'maxCarryoverAmount',
      label: 'Maximum Carryover Amount',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Maximum amount that can be carried over',
      defaultValue: 500,
      min: 0,
      max: 500
    },
    {
      id: 'usedToDate',
      label: 'Amount Used to Date',
      type: 'currency',
      required: false,
      placeholder: '300',
      tooltip: 'Amount already spent from FSA',
      defaultValue: 300,
      min: 0,
      max: 10000
    },
    {
      id: 'projectedUsage',
      label: 'Projected Annual Usage',
      type: 'currency',
      required: false,
      placeholder: '2500',
      tooltip: 'Expected total spending for the year',
      defaultValue: 2500,
      min: 0,
      max: 10000
    }
  ],

  outputs: [
    {
      id: 'recommendedContribution',
      label: 'Recommended Contribution',
      type: 'currency',
      explanation: 'Optimal annual contribution based on your expenses'
    },
    {
      id: 'maximumContribution',
      label: 'Maximum Contribution',
      type: 'currency',
      explanation: 'Maximum allowed contribution for your FSA type'
    },
    {
      id: 'taxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from pre-tax contributions'
    },
    {
      id: 'netCost',
      label: 'Net Cost',
      type: 'currency',
      explanation: 'After-tax cost of expenses'
    },
    {
      id: 'totalExpectedExpenses',
      label: 'Total Expected Expenses',
      type: 'currency',
      explanation: 'Sum of all expected eligible expenses'
    },
    {
      id: 'coveredExpenses',
      label: 'Covered Expenses',
      type: 'currency',
      explanation: 'Expenses covered by FSA contributions'
    },
    {
      id: 'uncoveredExpenses',
      label: 'Uncovered Expenses',
      type: 'currency',
      explanation: 'Expenses not covered by FSA'
    },
    {
      id: 'utilizationRate',
      label: 'Utilization Rate (%)',
      type: 'percentage',
      explanation: 'Percentage of contribution expected to be used'
    },
    {
      id: 'annualSavings',
      label: 'Annual Savings',
      type: 'currency',
      explanation: 'Total savings from FSA participation'
    },
    {
      id: 'lifetimeSavings',
      label: 'Lifetime Savings',
      type: 'currency',
      explanation: 'Projected savings over 10-year career'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'currency',
      explanation: 'Minimum expenses needed to break even'
    },
    {
      id: 'underContributionRisk',
      label: 'Under-Contribution Risk',
      type: 'currency',
      explanation: 'Potential loss from contributing too little'
    },
    {
      id: 'overContributionRisk',
      label: 'Over-Contribution Risk',
      type: 'currency',
      explanation: 'Potential loss from contributing too much'
    },
    {
      id: 'forfeitureRisk',
      label: 'Forfeiture Risk',
      type: 'currency',
      explanation: 'Amount at risk of being forfeited'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      explanation: 'Monthly contribution amount'
    },
    {
      id: 'federalTaxSavings',
      label: 'Federal Tax Savings',
      type: 'currency',
      explanation: 'Savings from federal taxes'
    },
    {
      id: 'stateTaxSavings',
      label: 'State Tax Savings',
      type: 'currency',
      explanation: 'Savings from state taxes'
    },
    {
      id: 'totalTaxAdvantage',
      label: 'Total Tax Advantage',
      type: 'currency',
      explanation: 'Combined federal and state tax savings'
    },
    {
      id: 'employerContribution',
      label: 'Employer Contribution',
      type: 'currency',
      explanation: 'Employer matching contribution'
    },
    {
      id: 'employeeSavings',
      label: 'Employee Savings',
      type: 'currency',
      explanation: 'Total savings for employee'
    },
    {
      id: 'optimalContribution',
      label: 'Optimal Contribution',
      type: 'currency',
      explanation: 'Best contribution amount for your situation'
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'text',
      explanation: 'Overall risk assessment'
    },
    {
      id: 'strategyRecommendations',
      label: 'Strategy Recommendations',
      type: 'text',
      explanation: 'Personalized recommendations'
    },
    {
      id: 'alternativeOptions',
      label: 'Alternative Options',
      type: 'text',
      explanation: 'Other savings or benefit options'
    },
    {
      id: 'complianceScore',
      label: 'Compliance Score',
      type: 'number',
      explanation: 'How well your plan complies with regulations'
    }
  ],

  formulas: [flexibleSpendingAccountFormula],

  validationRules: getFlexibleSpendingAccountValidationRules(),

  examples: [
    {
      title: 'Health FSA for Family',
      description: 'Family with moderate medical expenses seeking tax savings',
      inputs: {
        accountType: 'health',
        annualContributionLimit: 3050,
        currentBalance: 500,
        contributionFrequency: 'monthly',
        filingStatus: 'married-joint',
        numberOfDependents: 2,
        hasSpouse: true,
        spouseHasCoverage: true,
        hasHealthInsurance: true,
        insuranceType: 'family',
        expectedMedicalExpenses: 2000,
        preventiveCareExpenses: 300,
        prescriptionExpenses: 400,
        dentalExpenses: 500,
        visionExpenses: 200,
        marginalTaxRate: 25,
        stateTaxRate: 5,
        employerMatch: 0,
        carryoverAllowed: false,
        maxCarryoverAmount: 500,
        usedToDate: 300,
        projectedUsage: 2500
      },
      expectedOutputs: {
        recommendedContribution: 2650,
        maximumContribution: 3050,
        taxSavings: 825,
        netCost: 1825,
        totalExpectedExpenses: 3400,
        coveredExpenses: 2650,
        uncoveredExpenses: 750,
        utilizationRate: 85,
        annualSavings: 825,
        lifetimeSavings: 8250,
        breakEvenPoint: 2650,
        underContributionRisk: 750,
        overContributionRisk: 0,
        forfeitureRisk: 0,
        monthlyContribution: 221,
        federalTaxSavings: 663,
        stateTaxSavings: 133,
        totalTaxAdvantage: 795,
        employerContribution: 0,
        employeeSavings: 825,
        optimalContribution: 2650,
        riskLevel: 'medium',
        strategyRecommendations: 'Good utilization rate, consider carryover option if available',
        alternativeOptions: 'HSA if eligible, traditional savings account',
        complianceScore: 85
      }
    }
  ]
};