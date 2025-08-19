import { Calculator } from '../../types/Calculator';
import { calculateMortgageVsRent } from './formulas';
import { validateMortgageVsRentInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgageVsRentCalculator: Calculator = {
  id: 'mortgage-vs-rent',
  title: 'Mortgage vs. Rent Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare the total costs of buying a home with a mortgage versus renting, including all associated expenses and long-term financial implications.',
  usageInstructions: 'Enter your current rent and potential home purchase details to see a comprehensive comparison of the total costs over time.',
  inputs: [
    {
      id: 'currentRent',
      label: 'Current Monthly Rent',
      type: 'number',
      required: true,
      min: 100,
      max: 10000,
      step: 50,
      tooltip: 'Your current monthly rent payment',
      placeholder: '2000',
      defaultValue: 2000
    },
    {
      id: 'rentIncreaseRate',
      label: 'Annual Rent Increase Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Expected annual percentage increase in rent',
      placeholder: '3.0',
      defaultValue: 3.0
    },
    {
      id: 'homePrice',
      label: 'Home Purchase Price',
      type: 'number',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000,
      tooltip: 'The price of the home you want to buy',
      placeholder: '400000',
      defaultValue: 400000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Amount of down payment for the home',
      placeholder: '80000',
      defaultValue: 80000
    },
    {
      id: 'interestRate',
      label: 'Mortgage Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Annual interest rate on the mortgage',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '30', label: '30 years' }
      ],
      tooltip: 'Length of the mortgage loan',
      defaultValue: '30'
    },
    {
      id: 'propertyTaxRate',
      label: 'Property Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Annual property tax rate as percentage of home value',
      placeholder: '1.2',
      defaultValue: 1.2
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'number',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      tooltip: 'Annual cost of homeowners insurance',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      tooltip: 'Private Mortgage Insurance rate (if down payment < 20%)',
      placeholder: '0.5',
      defaultValue: 0.5
    },
    {
      id: 'maintenanceCost',
      label: 'Annual Maintenance Cost',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Estimated annual maintenance and repair costs',
      placeholder: '2400',
      defaultValue: 2400
    },
    {
      id: 'utilities',
      label: 'Monthly Utilities (Renting)',
      type: 'number',
      required: true,
      min: 0,
      max: 2000,
      step: 10,
      tooltip: 'Monthly utility costs when renting',
      placeholder: '150',
      defaultValue: 150
    },
    {
      id: 'utilitiesHome',
      label: 'Monthly Utilities (Owning)',
      type: 'number',
      required: true,
      min: 0,
      max: 2000,
      step: 10,
      tooltip: 'Monthly utility costs when owning a home',
      placeholder: '200',
      defaultValue: 200
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'One-time closing costs for home purchase',
      placeholder: '8000',
      defaultValue: 8000
    },
    {
      id: 'homeAppreciation',
      label: 'Annual Home Appreciation (%)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      tooltip: 'Expected annual appreciation rate of the home value',
      placeholder: '3.0',
      defaultValue: 3.0
    },
    {
      id: 'investmentReturn',
      label: 'Investment Return Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Expected annual return on alternative investments',
      placeholder: '7.0',
      defaultValue: 7.0
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      tooltip: 'Number of years to compare costs',
      placeholder: '10',
      defaultValue: 10
    },
    {
      id: 'taxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      tooltip: 'Your marginal federal tax rate for tax deduction calculations',
      placeholder: '22',
      defaultValue: 22
    },
    {
      id: 'rentersInsurance',
      label: 'Monthly Renters Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 500,
      step: 5,
      tooltip: 'Monthly cost of renters insurance',
      placeholder: '20',
      defaultValue: 20
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      tooltip: 'Monthly homeowners association fees (if applicable)',
      placeholder: '0',
      defaultValue: 0
    }
  ],
  outputs: [
    {
      id: 'monthlyRentCost',
      label: 'Monthly Rent Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total monthly cost of renting including utilities and insurance'
    },
    {
      id: 'monthlyMortgageCost',
      label: 'Monthly Mortgage Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total monthly cost of homeownership including mortgage, taxes, insurance, and utilities'
    },
    {
      id: 'totalRentCost',
      label: 'Total Rent Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost of renting over the analysis period'
    },
    {
      id: 'totalMortgageCost',
      label: 'Total Mortgage Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total cost of homeownership over the analysis period'
    },
    {
      id: 'homeEquity',
      label: 'Home Equity',
      type: 'currency',
      format: 'USD',
      explanation: 'Estimated home equity at the end of the analysis period'
    },
    {
      id: 'opportunityCost',
      label: 'Opportunity Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Potential investment returns lost by using money for down payment and closing costs'
    },
    {
      id: 'netHomeCost',
      label: 'Net Home Cost',
      type: 'currency',
      format: 'USD',
      explanation: 'Total homeownership cost minus home equity'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      format: 'years',
      explanation: 'Number of years until homeownership becomes cheaper than renting'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      format: 'recommendation',
      explanation: 'Whether renting or buying is recommended based on the analysis'
    },
    {
      id: 'analysis',
      label: 'Detailed Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Comprehensive analysis of the rent vs. buy decision'
    }
  ],
  formulas: [
    {
      id: 'mortgage-vs-rent-analysis',
      name: 'Mortgage vs. Rent Analysis',
      description: 'Compare the total costs of renting versus buying a home',
      calculate: calculateMortgageVsRent
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validateMortgageVsRentInputs
    }
  ],
  examples: [
    {
      title: 'Standard Comparison',
      description: 'Comparing renting vs. buying a typical home with standard costs',
      inputs: {
        currentRent: 2000,
        rentIncreaseRate: 3.0,
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0,
        maintenanceCost: 2400,
        utilities: 150,
        utilitiesHome: 200,
        closingCosts: 8000,
        homeAppreciation: 3.0,
        investmentReturn: 7.0,
        analysisPeriod: 10,
        taxRate: 22,
        rentersInsurance: 20,
        hoaFees: 0
      },
      expectedOutputs: {
        monthlyRentCost: 2170,
        monthlyMortgageCost: 2800,
        totalRentCost: 280000,
        totalMortgageCost: 336000,
        homeEquity: 120000,
        opportunityCost: 45000,
        netHomeCost: 261000,
        breakEvenYears: 7,
        recommendation: 'Consider buying',
        analysis: 'Homeownership shows long-term benefits'
      }
    },
    {
      title: 'High-Cost Market',
      description: 'Analysis in a high-cost housing market with expensive homes',
      inputs: {
        currentRent: 3500,
        rentIncreaseRate: 2.5,
        homePrice: 800000,
        downPayment: 160000,
        interestRate: 4.0,
        loanTerm: '30',
        propertyTaxRate: 1.5,
        homeownersInsurance: 2400,
        pmiRate: 0,
        maintenanceCost: 4800,
        utilities: 200,
        utilitiesHome: 300,
        closingCosts: 16000,
        homeAppreciation: 2.5,
        investmentReturn: 8.0,
        analysisPeriod: 15,
        taxRate: 32,
        rentersInsurance: 30,
        hoaFees: 200
      },
      expectedOutputs: {
        monthlyRentCost: 3800,
        monthlyMortgageCost: 5200,
        totalRentCost: 720000,
        totalMortgageCost: 936000,
        homeEquity: 300000,
        opportunityCost: 120000,
        netHomeCost: 756000,
        breakEvenYears: 12,
        recommendation: 'Consider renting',
        analysis: 'High costs make renting more attractive'
      }
    },
    {
      title: 'Short-Term Analysis',
      description: 'Short-term comparison for someone planning to move soon',
      inputs: {
        currentRent: 1800,
        rentIncreaseRate: 4.0,
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 5.0,
        loanTerm: '30',
        propertyTaxRate: 1.0,
        homeownersInsurance: 900,
        pmiRate: 0,
        maintenanceCost: 1800,
        utilities: 120,
        utilitiesHome: 180,
        closingCosts: 6000,
        homeAppreciation: 2.0,
        investmentReturn: 6.0,
        analysisPeriod: 3,
        taxRate: 24,
        rentersInsurance: 15,
        hoaFees: 0
      },
      expectedOutputs: {
        monthlyRentCost: 1950,
        monthlyMortgageCost: 2200,
        totalRentCost: 72000,
        totalMortgageCost: 79200,
        homeEquity: 18000,
        opportunityCost: 15000,
        netHomeCost: 76200,
        breakEvenYears: 5,
        recommendation: 'Continue renting',
        analysis: 'Short-term ownership costs exceed benefits'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};