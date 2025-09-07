import { Calculator } from '../../../types/calculator';
import { EmergencyFundCalculatorInputs, EmergencyFundCalculatorOutputs } from './types';
import { calculateEmergencyFundCalculator } from './formulas';
import { validateEmergencyFundCalculatorInputs } from './validation';

export const EmergencyFundCalculator: Calculator = {
  id: 'emergency-fund-calculator',
  title: 'Emergency Fund Calculator',
  category: 'finance',
  subcategory: 'Personal Finance',
  description: 'Calculate optimal emergency fund size based on income, expenses, risk factors, and personal circumstances. Includes scenario analysis, risk assessment, and personalized savings strategies.',

  inputs: [
    // Personal Information
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 100000,
      step: 100,
      placeholder: '5000',
      tooltip: 'Your total monthly take-home income'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses ($)',
      type: 'currency',
      required: true,
      min: 500,
      max: 50000,
      step: 50,
      placeholder: '3500',
      tooltip: 'Total monthly living expenses'
    },
    {
      id: 'dependents',
      label: 'Number of Dependents',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '2',
      tooltip: 'Number of people who depend on your income'
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'salaried', label: 'Salaried Employee' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'contractor', label: 'Contractor/Freelancer' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'retired', label: 'Retired' }
      ],
      placeholder: 'salaried',
      tooltip: 'Your employment situation'
    },

    // Financial Information
    {
      id: 'currentSavings',
      label: 'Current Savings ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '10000',
      tooltip: 'Total current savings across all accounts'
    },
    {
      id: 'currentEmergencyFund',
      label: 'Current Emergency Fund ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 100,
      placeholder: '5000',
      tooltip: 'Amount specifically designated as emergency fund'
    },
    {
      id: 'monthlyDebtPayments',
      label: 'Monthly Debt Payments ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '800',
      tooltip: 'Monthly payments for all debts (loans, credit cards, etc.)'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '720',
      tooltip: 'Your current credit score'
    },

    // Risk Factors
    {
      id: 'jobStability',
      label: 'Job Stability',
      type: 'select',
      required: true,
      options: [
        { value: 'very_stable', label: 'Very Stable' },
        { value: 'stable', label: 'Stable' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'unstable', label: 'Unstable' },
        { value: 'very_unstable', label: 'Very Unstable' }
      ],
      placeholder: 'stable',
      tooltip: 'How stable is your current employment?'
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' },
        { value: 'critical', label: 'Critical' }
      ],
      placeholder: 'good',
      tooltip: 'Your current health status'
    },
    {
      id: 'locationRisk',
      label: 'Location Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'moderate', label: 'Moderate Risk' },
        { value: 'high', label: 'High Risk' },
        { value: 'very_high', label: 'Very High Risk' }
      ],
      placeholder: 'moderate',
      tooltip: 'Risk level of your location (natural disasters, etc.)'
    },
    {
      id: 'industryRisk',
      label: 'Industry Risk',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'moderate', label: 'Moderate Risk' },
        { value: 'high', label: 'High Risk' },
        { value: 'very_high', label: 'Very High Risk' }
      ],
      placeholder: 'moderate',
      tooltip: 'Risk level of your industry'
    },

    // Lifestyle Factors
    {
      id: 'housingType',
      label: 'Housing Type',
      type: 'select',
      required: true,
      options: [
        { value: 'owned', label: 'Owned (Paid Off)' },
        { value: 'rented', label: 'Rented' },
        { value: 'mortgaged', label: 'Mortgaged' },
        { value: 'family_home', label: 'Family Home' }
      ],
      placeholder: 'rented',
      tooltip: 'Your housing situation'
    },
    {
      id: 'transportationType',
      label: 'Transportation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'owned', label: 'Owned Vehicle' },
        { value: 'leased', label: 'Leased Vehicle' },
        { value: 'public', label: 'Public Transportation' },
        { value: 'multiple_vehicles', label: 'Multiple Vehicles' }
      ],
      placeholder: 'owned',
      tooltip: 'Your transportation situation'
    },
    {
      id: 'insuranceCoverage',
      label: 'Insurance Coverage',
      type: 'select',
      required: true,
      options: [
        { value: 'comprehensive', label: 'Comprehensive' },
        { value: 'basic', label: 'Basic' },
        { value: 'minimal', label: 'Minimal' },
        { value: 'none', label: 'None' }
      ],
      placeholder: 'comprehensive',
      tooltip: 'Level of insurance coverage'
    },


    // Time Factors
    {
      id: 'timeToFindNewJob',
      label: 'Time to Find New Job (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 24,
      step: 1,
      placeholder: '3',
      tooltip: 'Estimated time to find new employment'
    },
    {
      id: 'desiredCoveragePeriod',
      label: 'Desired Coverage Period (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 24,
      step: 1,
      placeholder: '6',
      tooltip: 'Desired months of expense coverage'
    },
    {
      id: 'inflationRate',
      label: 'Expected Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate'
    },

    // Investment Factors
    {
      id: 'emergencyFundInvestmentType',
      label: 'Emergency Fund Investment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'savings_account', label: 'Savings Account' },
        { value: 'money_market', label: 'Money Market Fund' },
        { value: 'cd', label: 'Certificate of Deposit' },
        { value: 'high_yield_savings', label: 'High-Yield Savings' }
      ],
      placeholder: 'high_yield_savings',
      tooltip: 'Where emergency fund will be invested'
    },
    {
      id: 'expectedReturnRate',
      label: 'Expected Return Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '1.5',
      tooltip: 'Expected annual return on emergency fund'
    },
    {
      id: 'liquidityNeeds',
      label: 'Liquidity Needs',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate Access' },
        { value: 'short_term', label: 'Short-term (3-6 months)' },
        { value: 'flexible', label: 'Flexible Access' }
      ],
      placeholder: 'immediate',
      tooltip: 'How quickly you need access to funds'
    },

    // Geographic Factors
    {
      id: 'costOfLivingIndex',
      label: 'Cost of Living Index',
      type: 'number',
      required: true,
      min: 50,
      max: 300,
      step: 1,
      placeholder: '100',
      tooltip: 'Local cost of living index (100 = average)'
    },
    {
      id: 'localUnemploymentRate',
      label: 'Local Unemployment Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '4.5',
      tooltip: 'Local unemployment rate'
    },

    // Analysis Parameters
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      placeholder: 'moderate',
      tooltip: 'Your risk tolerance level'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 120,
      step: 1,
      placeholder: '24',
      tooltip: 'Period for savings analysis'
    },

    // Currency
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations'
    }
  ],

  outputs: [
    { id: 'recommendedAmount', label: 'Recommended Emergency Fund', type: 'currency', explanation: 'Optimal emergency fund amount based on your situation' },
    { id: 'currentAmount', label: 'Current Emergency Fund', type: 'currency', explanation: 'Your current emergency fund amount' },
    { id: 'monthlySavingsTarget', label: 'Monthly Savings Target', type: 'currency', explanation: 'Monthly savings needed to reach goal' },
    { id: 'timeToGoal', label: 'Time to Goal (months)', type: 'number', explanation: 'Months needed to reach recommended amount' },
    { id: 'metrics', label: 'Detailed Metrics', type: 'text', explanation: 'Comprehensive emergency fund metrics' },
    { id: 'analysis', label: 'Personalized Analysis', type: 'text', explanation: 'Detailed analysis and recommendations' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Middle-Income Family Emergency Fund',
      description: 'Emergency fund calculation for a family of 4 with moderate risk',
      inputs: {
        monthlyIncome: 6000,
        monthlyExpenses: 4500,
        dependents: 2,
        employmentType: 'salaried',
        currentSavings: 15000,
        currentEmergencyFund: 8000,
        monthlyDebtPayments: 1200,
        creditScore: 720,
        jobStability: 'stable',
        healthStatus: 'good',
        locationRisk: 'moderate',
        industryRisk: 'moderate',
        housingType: 'mortgaged',
        transportationType: 'owned',
        insuranceCoverage: 'comprehensive',
        includeJobLoss: true,
        includeMedicalEmergency: true,
        includeHomeRepair: true,
        includeCarRepair: true,
        includeFamilyEmergency: true,
        timeToFindNewJob: 3,
        desiredCoveragePeriod: 6,
        inflationRate: 0.025,
        emergencyFundInvestmentType: 'high_yield_savings',
        expectedReturnRate: 0.015,
        liquidityNeeds: 'immediate',
        costOfLivingIndex: 110,
        stateOfResidence: 'California',
        localUnemploymentRate: 0.045,
        riskTolerance: 'moderate',
        analysisPeriod: 24,
        currency: 'USD'
      },
      expectedOutputs: {
        recommendedAmount: 27000,
        currentAmount: 8000,
        monthlySavingsTarget: 792,
        timeToGoal: 24,
        overallRiskLevel: 'Moderate',
        coverageStatus: 'Under-funded',
        metrics: 'Comprehensive metrics calculated',
        analysis: 'Detailed emergency fund analysis'
      }
    }
  ],

  usageInstructions: [
    'Enter your monthly income and expenses',
    'Specify your dependents and employment situation',
    'Provide current savings and emergency fund amounts',
    'Assess your risk factors (job stability, health, location)',
    'Select emergency scenarios to include',
    'Review recommended emergency fund amount',
    'Follow personalized savings strategy',
    'Monitor progress and adjust as needed'
  ]
};