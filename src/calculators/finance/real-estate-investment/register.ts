import { CalculatorRegistration } from '../../types/calculator';
import { calculateRealEstateInvestment } from './formulas';
import { validateRealEstateInvestmentInputs } from './validation';
import { RealEstateInvestmentInputs } from './types';

const realEstateInvestmentCalculator: CalculatorRegistration = {
  id: 'real-estate-investment',
  name: 'Real Estate Investment Calculator',
  description: 'Comprehensive real estate investment analysis with cash flow, ROI, and market comparison',
  category: 'finance',
  tags: ['real-estate', 'investment', 'cash-flow', 'roi', 'property', 'rental', 'cap-rate', 'cash-on-cash'],
  
  inputs: {
    propertyType: {
      type: 'select',
      label: 'Property Type',
      required: true,
      options: [
        { value: 'single-family', label: 'Single Family Home' },
        { value: 'multi-family', label: 'Multi-Family' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'land', label: 'Land' },
        { value: 'mixed-use', label: 'Mixed Use' }
      ]
    },
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '300000'
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      required: true,
      min: 1000,
      max: 5000000,
      step: 1000,
      placeholder: '60000'
    },
    closingCosts: {
      type: 'number',
      label: 'Closing Costs',
      required: true,
      min: 0,
      max: 500000,
      step: 100,
      placeholder: '9000'
    },
    renovationCosts: {
      type: 'number',
      label: 'Renovation Costs',
      required: false,
      min: 0,
      max: 2000000,
      step: 1000,
      placeholder: '0'
    },
    loanType: {
      type: 'select',
      label: 'Loan Type',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'hard-money', label: 'Hard Money' },
        { value: 'cash', label: 'Cash' }
      ]
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.1,
      placeholder: '4.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (Years)',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    points: {
      type: 'number',
      label: 'Points',
      required: false,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '0'
    },
    monthlyRent: {
      type: 'number',
      label: 'Monthly Rent',
      required: true,
      min: 100,
      max: 100000,
      step: 50,
      placeholder: '2500'
    },
    otherIncome: {
      type: 'number',
      label: 'Other Monthly Income',
      required: false,
      min: 0,
      max: 50000,
      step: 10,
      placeholder: '0'
    },
    vacancyRate: {
      type: 'number',
      label: 'Vacancy Rate (%)',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    propertyTax: {
      type: 'number',
      label: 'Annual Property Tax',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3600'
    },
    insurance: {
      type: 'number',
      label: 'Annual Insurance',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '1200'
    },
    hoaFees: {
      type: 'number',
      label: 'Annual HOA Fees',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '0'
    },
    propertyManagement: {
      type: 'number',
      label: 'Annual Property Management',
      required: false,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '0'
    },
    maintenance: {
      type: 'number',
      label: 'Annual Maintenance',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '3000'
    },
    utilities: {
      type: 'number',
      label: 'Annual Utilities',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '0'
    },
    landscaping: {
      type: 'number',
      label: 'Annual Landscaping',
      required: false,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '0'
    },
    pestControl: {
      type: 'number',
      label: 'Annual Pest Control',
      required: false,
      min: 0,
      max: 3000,
      step: 25,
      placeholder: '0'
    },
    appreciationRate: {
      type: 'number',
      label: 'Annual Appreciation Rate (%)',
      required: true,
      min: -20,
      max: 30,
      step: 0.5,
      placeholder: '3'
    },
    rentGrowthRate: {
      type: 'number',
      label: 'Annual Rent Growth Rate (%)',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '2'
    },
    expenseGrowthRate: {
      type: 'number',
      label: 'Annual Expense Growth Rate (%)',
      required: true,
      min: -5,
      max: 15,
      step: 0.5,
      placeholder: '1.5'
    },
    holdingPeriod: {
      type: 'number',
      label: 'Holding Period (Years)',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10'
    },
    sellingCosts: {
      type: 'number',
      label: 'Selling Costs',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '18000'
    },
    location: {
      type: 'select',
      label: 'Location Grade',
      required: true,
      options: [
        { value: 'a', label: 'A Grade (Premium)' },
        { value: 'b', label: 'B Grade (Good)' },
        { value: 'c', label: 'C Grade (Average)' },
        { value: 'd', label: 'D Grade (Below Average)' }
      ]
    },
    marketCondition: {
      type: 'select',
      label: 'Market Condition',
      required: true,
      options: [
        { value: 'hot', label: 'Hot Market' },
        { value: 'stable', label: 'Stable Market' },
        { value: 'declining', label: 'Declining Market' },
        { value: 'recovering', label: 'Recovering Market' }
      ]
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (Years)',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15'
    },
    condition: {
      type: 'select',
      label: 'Property Condition',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ]
    },
    zoning: {
      type: 'select',
      label: 'Zoning',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed', label: 'Mixed' },
        { value: 'agricultural', label: 'Agricultural' }
      ]
    },
    taxRate: {
      type: 'number',
      label: 'Tax Rate (%)',
      required: false,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25'
    },
    depreciationRecapture: {
      type: 'boolean',
      label: 'Depreciation Recapture',
      required: false
    },
    section1031: {
      type: 'boolean',
      label: '1031 Exchange',
      required: false
    },
    shortTermRental: {
      type: 'boolean',
      label: 'Short-term Rental',
      required: false
    },
    airbnbPotential: {
      type: 'boolean',
      label: 'Airbnb Potential',
      required: false
    }
  },
  
  calculate: (inputs: RealEstateInvestmentInputs, allInputs?: Record<string, any>) => {
    return calculateRealEstateInvestment(inputs, allInputs);
  },
  
  validate: (inputs: RealEstateInvestmentInputs, allInputs?: Record<string, any>) => {
    return validateRealEstateInvestmentInputs(inputs, allInputs);
  },
  
  examples: [
    {
      name: 'Single Family Rental Property',
      inputs: {
        propertyType: 'single-family',
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        renovationCosts: 15000,
        loanType: 'conventional',
        interestRate: 4.5,
        loanTerm: 30,
        points: 1,
        monthlyRent: 2500,
        otherIncome: 200,
        vacancyRate: 5,
        propertyTax: 3600,
        insurance: 1200,
        hoaFees: 0,
        propertyManagement: 0,
        maintenance: 3000,
        utilities: 0,
        landscaping: 600,
        pestControl: 300,
        appreciationRate: 3,
        rentGrowthRate: 2,
        expenseGrowthRate: 1.5,
        holdingPeriod: 10,
        sellingCosts: 18000,
        location: 'b',
        marketCondition: 'stable',
        propertyAge: 15,
        condition: 'good',
        zoning: 'residential',
        taxRate: 25,
        depreciationRecapture: false,
        section1031: false,
        shortTermRental: false,
        airbnbPotential: false
      }
    },
    {
      name: 'Multi-Family Investment',
      inputs: {
        propertyType: 'multi-family',
        purchasePrice: 800000,
        downPayment: 160000,
        closingCosts: 24000,
        renovationCosts: 50000,
        loanType: 'conventional',
        interestRate: 4.75,
        loanTerm: 30,
        points: 1.5,
        monthlyRent: 8000,
        otherIncome: 500,
        vacancyRate: 3,
        propertyTax: 9600,
        insurance: 3200,
        hoaFees: 0,
        propertyManagement: 4800,
        maintenance: 8000,
        utilities: 2400,
        landscaping: 1200,
        pestControl: 600,
        appreciationRate: 4,
        rentGrowthRate: 3,
        expenseGrowthRate: 2,
        holdingPeriod: 15,
        sellingCosts: 48000,
        location: 'a',
        marketCondition: 'hot',
        propertyAge: 8,
        condition: 'excellent',
        zoning: 'residential',
        taxRate: 30,
        depreciationRecapture: true,
        section1031: true,
        shortTermRental: false,
        airbnbPotential: false
      }
    },
    {
      name: 'Commercial Property',
      inputs: {
        propertyType: 'commercial',
        purchasePrice: 1500000,
        downPayment: 300000,
        closingCosts: 45000,
        renovationCosts: 100000,
        loanType: 'conventional',
        interestRate: 5.25,
        loanTerm: 25,
        points: 2,
        monthlyRent: 15000,
        otherIncome: 1000,
        vacancyRate: 8,
        propertyTax: 18000,
        insurance: 6000,
        hoaFees: 0,
        propertyManagement: 9000,
        maintenance: 12000,
        utilities: 0,
        landscaping: 2400,
        pestControl: 1200,
        appreciationRate: 2.5,
        rentGrowthRate: 1.5,
        expenseGrowthRate: 1,
        holdingPeriod: 20,
        sellingCosts: 90000,
        location: 'b',
        marketCondition: 'stable',
        propertyAge: 25,
        condition: 'good',
        zoning: 'commercial',
        taxRate: 35,
        depreciationRecapture: true,
        section1031: true,
        shortTermRental: false,
        airbnbPotential: false
      }
    }
  ],
  
  relatedCalculators: [
    'mortgage-calculator',
    'cap-rate-calculator',
    'cash-flow-calculator',
    'brrrr-strategy-calculator',
    'fix-and-flip-calculator'
  ]
};

export default realEstateInvestmentCalculator;
