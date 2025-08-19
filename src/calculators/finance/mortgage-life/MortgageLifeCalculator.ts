import { Calculator } from '../../../types/calculator';

export const mortgageLifeCalculator: Calculator = {
  id: 'mortgage-life',
  title: 'Mortgage Life Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage life insurance needs and costs to protect your family from mortgage debt in case of death.',
  usageInstructions: 'Enter your mortgage details and personal information to calculate the appropriate amount of mortgage life insurance coverage needed.',
  inputs: [
    {
      id: 'mortgageBalance',
      label: 'Current Mortgage Balance',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current outstanding balance on your mortgage',
      placeholder: '250000',
      defaultValue: 250000
    },
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current market value of your property',
      placeholder: '350000',
      defaultValue: 350000
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Mortgage Payment',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 100,
      tooltip: 'Your current monthly mortgage payment (PITI)',
      placeholder: '1500',
      defaultValue: 1500
    },
    {
      id: 'age',
      label: 'Your Age',
      type: 'number',
      required: true,
      min: 18,
      max: 85,
      step: 1,
      tooltip: 'Your current age',
      placeholder: '35',
      defaultValue: 35
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
        { value: 'poor', label: 'Poor' }
      ],
      tooltip: 'Your current health status',
      defaultValue: 'good'
    },
    {
      id: 'smoker',
      label: 'Smoker Status',
      type: 'select',
      required: true,
      options: [
        { value: 'non-smoker', label: 'Non-Smoker' },
        { value: 'smoker', label: 'Smoker' },
        { value: 'former-smoker', label: 'Former Smoker (quit > 2 years)' }
      ],
      tooltip: 'Your smoking status',
      defaultValue: 'non-smoker'
    },
    {
      id: 'occupation',
      label: 'Occupation Risk Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk (Office/Professional)' },
        { value: 'medium', label: 'Medium Risk (Sales/Service)' },
        { value: 'high', label: 'High Risk (Construction/Military)' }
      ],
      tooltip: 'Risk level associated with your occupation',
      defaultValue: 'low'
    },
    {
      id: 'familyIncome',
      label: 'Annual Family Income',
      type: 'number',
      required: true,
      min: 10000,
      max: 2000000,
      step: 1000,
      tooltip: 'Total annual household income',
      placeholder: '75000',
      defaultValue: 75000
    },
    {
      id: 'dependents',
      label: 'Number of Dependents',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 1,
      tooltip: 'Number of people who depend on your income',
      placeholder: '2',
      defaultValue: 2
    },
    {
      id: 'existingLifeInsurance',
      label: 'Existing Life Insurance Coverage',
      type: 'number',
      required: false,
      min: 0,
      max: 10000000,
      step: 10000,
      tooltip: 'Amount of existing life insurance coverage',
      placeholder: '100000',
      defaultValue: 100000
    },
    {
      id: 'otherDebts',
      label: 'Other Outstanding Debts',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Total other outstanding debts (credit cards, car loans, etc.)',
      placeholder: '25000',
      defaultValue: 25000
    },
    {
      id: 'funeralExpenses',
      label: 'Estimated Funeral Expenses',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Estimated funeral and final expenses',
      placeholder: '15000',
      defaultValue: 15000
    },
    {
      id: 'coverageType',
      label: 'Coverage Type',
      type: 'select',
      required: true,
      options: [
        { value: 'decreasing', label: 'Decreasing Term (Mortgage Balance)' },
        { value: 'level', label: 'Level Term (Fixed Amount)' },
        { value: 'family', label: 'Family Income Protection' }
      ],
      tooltip: 'Type of mortgage life insurance coverage',
      defaultValue: 'decreasing'
    },
    {
      id: 'termLength',
      label: 'Term Length (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '10', label: '10 Years' },
        { value: '15', label: '15 Years' },
        { value: '20', label: '20 Years' },
        { value: '25', label: '25 Years' },
        { value: '30', label: '30 Years' }
      ],
      tooltip: 'Length of the insurance term',
      defaultValue: '20'
    }
  ],
  outputs: [
    {
      id: 'recommendedCoverage',
      label: 'Recommended Coverage Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Recommended amount of mortgage life insurance coverage'
    },
    {
      id: 'monthlyPremium',
      label: 'Estimated Monthly Premium',
      type: 'currency',
      format: 'USD',
      explanation: 'Estimated monthly premium for the recommended coverage'
    },
    {
      id: 'annualPremium',
      label: 'Estimated Annual Premium',
      type: 'currency',
      format: 'USD',
      explanation: 'Estimated annual premium for the recommended coverage'
    },
    {
      id: 'totalCost',
      label: 'Total Cost Over Term',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost of premiums over the entire term'
    },
    {
      id: 'coverageBreakdown',
      label: 'Coverage Breakdown',
      type: 'table',
      format: 'JSON',
      explanation: 'Year-by-year breakdown of coverage and premiums'
    },
    {
      id: 'affordabilityAnalysis',
      label: 'Affordability Analysis',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Percentage of income that would go toward insurance premiums'
    },
    {
      id: 'coverageGap',
      label: 'Coverage Gap',
      type: 'currency',
      format: 'USD',
      explanation: 'Additional coverage needed beyond existing life insurance'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'text',
      explanation: 'Personalized recommendations for mortgage life insurance'
    }
  ],
  formulas: [
    {
      id: 'mortgage-life',
      name: 'Mortgage Life Insurance Calculation',
      description: 'Calculate recommended mortgage life insurance coverage and costs',
      calculate: (inputs) => {
        const { calculateMortgageLifeInsurance } = require('./formulas');
        return calculateMortgageLifeInsurance(inputs);
      }
    },
    {
      id: 'coverage-needs',
      name: 'Coverage Needs Analysis',
      description: 'Analyze total life insurance needs including mortgage protection',
      calculate: (inputs) => {
        const { analyzeCoverageNeeds } = require('./formulas');
        return analyzeCoverageNeeds(inputs);
      }
    },
    {
      id: 'premium-calculation',
      name: 'Premium Calculation',
      description: 'Calculate insurance premiums based on risk factors',
      calculate: (inputs) => {
        const { calculatePremiums } = require('./formulas');
        return calculatePremiums(inputs);
      }
    }
  ],
  validationRules: [
    {
      id: 'mortgage-balance-positive',
      name: 'Mortgage Balance Must Be Positive',
      description: 'Mortgage balance must be greater than zero',
      validate: (inputs) => {
        const { validateMortgageLifeInputs } = require('./validation');
        return validateMortgageLifeInputs(inputs);
      }
    }
  ],
  examples: [
    {
      title: 'Young Family with Mortgage',
      description: 'A 35-year-old with a family and $250,000 mortgage balance',
      inputs: {
        mortgageBalance: 250000,
        propertyValue: 350000,
        monthlyPayment: 1500,
        age: 35,
        healthStatus: 'good',
        smoker: 'non-smoker',
        occupation: 'low',
        familyIncome: 75000,
        dependents: 2,
        existingLifeInsurance: 100000,
        otherDebts: 25000,
        funeralExpenses: 15000,
        coverageType: 'decreasing',
        termLength: '20'
      },
      expectedOutputs: {
        recommendedCoverage: 250000,
        monthlyPremium: 25.00,
        annualPremium: 300.00,
        totalCost: 6000.00,
        affordabilityAnalysis: 0.4,
        coverageGap: 150000
      }
    },
    {
      title: 'Single Homeowner',
      description: 'A 45-year-old single homeowner with no dependents',
      inputs: {
        mortgageBalance: 180000,
        propertyValue: 250000,
        monthlyPayment: 1200,
        age: 45,
        healthStatus: 'excellent',
        smoker: 'non-smoker',
        occupation: 'low',
        familyIncome: 60000,
        dependents: 0,
        existingLifeInsurance: 50000,
        otherDebts: 15000,
        funeralExpenses: 12000,
        coverageType: 'level',
        termLength: '15'
      },
      expectedOutputs: {
        recommendedCoverage: 180000,
        monthlyPremium: 35.00,
        annualPremium: 420.00,
        totalCost: 6300.00,
        affordabilityAnalysis: 0.7,
        coverageGap: 130000
      }
    },
    {
      title: 'High-Risk Occupation',
      description: 'A 40-year-old construction worker with family',
      inputs: {
        mortgageBalance: 300000,
        propertyValue: 400000,
        monthlyPayment: 1800,
        age: 40,
        healthStatus: 'good',
        smoker: 'former-smoker',
        occupation: 'high',
        familyIncome: 85000,
        dependents: 3,
        existingLifeInsurance: 150000,
        otherDebts: 30000,
        funeralExpenses: 15000,
        coverageType: 'family',
        termLength: '25'
      },
      expectedOutputs: {
        recommendedCoverage: 300000,
        monthlyPremium: 75.00,
        annualPremium: 900.00,
        totalCost: 22500.00,
        affordabilityAnalysis: 1.1,
        coverageGap: 150000
      }
    }
  ]
};