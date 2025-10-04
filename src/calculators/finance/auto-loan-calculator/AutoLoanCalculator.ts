import { Calculator } from '../../../types/calculator';
import { AutoLoanCalculatorInputs, AutoLoanCalculatorOutputs } from './types';
import { calculateAutoLoanResults } from './formulas';
import { validateAutoLoanCalculatorInputs } from './validation';

export const AutoLoanCalculator: Calculator = {
  id: 'auto-loan-calculator',
  title: 'Auto Loan Calculator',
  category: 'finance',
  subcategory: 'Auto & Transportation',
  description: 'Comprehensive auto loan calculator with vehicle depreciation, trade-in analysis, fuel efficiency impact, and extended warranty considerations.',
  usageInstructions: [
    'Enter vehicle price and down payment details',
    'Provide loan terms and interest rate',
    'Input vehicle information for depreciation calculations',
    'Specify fuel efficiency and usage for cost analysis',
    'Include trade-in value and warranty costs',
    'Review comprehensive loan analysis and ownership costs'
  ],

  inputs: [
    {
      id: 'vehiclePrice',
      label: 'Vehicle Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'MSRP or negotiated price of the vehicle'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cash down payment amount'
    },
    {
      id: 'tradeInValue',
      label: 'Trade-in Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Value of vehicle being traded in'
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Length of the auto loan'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.125,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'vehicleYear',
      label: 'Vehicle Year',
      type: 'number',
      required: true,
      min: 1990,
      max: new Date().getFullYear() + 1,
      tooltip: 'Model year of the vehicle'
    },
    {
      id: 'vehicleMake',
      label: 'Vehicle Make',
      type: 'text',
      required: true,
      tooltip: 'Manufacturer of the vehicle'
    },
    {
      id: 'vehicleModel',
      label: 'Vehicle Model',
      type: 'text',
      required: true,
      tooltip: 'Model name of the vehicle'
    },
    {
      id: 'currentMileage',
      label: 'Current Mileage',
      type: 'number',
      required: false,
      min: 0,
      tooltip: 'Current odometer reading'
    },
    {
      id: 'fuelEfficiency',
      label: 'Fuel Efficiency (MPG)',
      type: 'number',
      required: true,
      min: 10,
      max: 150,
      tooltip: 'Miles per gallon rating'
    },
    {
      id: 'annualMileage',
      label: 'Annual Mileage',
      type: 'number',
      required: true,
      min: 1000,
      max: 50000,
      defaultValue: 12000,
      tooltip: 'Expected annual mileage driven'
    },
    {
      id: 'fuelPricePerGallon',
      label: 'Fuel Price per Gallon ($)',
      type: 'currency',
      required: true,
      min: 1,
      max: 10,
      step: 0.01,
      defaultValue: 3.50,
      tooltip: 'Current fuel price per gallon'
    },
    {
      id: 'extendedWarrantyCost',
      label: 'Extended Warranty Cost ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Cost of extended warranty coverage'
    },
    {
      id: 'extendedWarrantyYears',
      label: 'Extended Warranty Years',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      tooltip: 'Duration of extended warranty'
    },
    {
      id: 'salesTaxRate',
      label: 'Sales Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      defaultValue: 6,
      tooltip: 'State sales tax rate'
    },
    {
      id: 'otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Registration, documentation, and other fees'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      tooltip: 'Your credit score for interest rate validation'
    }
  ],

  outputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      explanation: 'Total amount financed after down payment and trade-in'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly loan payment including principal and interest'
    },
    {
      id: 'totalLoanPayments',
      label: 'Total Loan Payments',
      type: 'currency',
      explanation: 'Sum of all monthly payments over loan term'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      explanation: 'Total cost including vehicle, interest, taxes, and fees'
    },
    {
      id: 'effectiveInterestRate',
      label: 'Effective Interest Rate',
      type: 'percentage',
      explanation: 'Effective annual interest rate'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'number',
      explanation: 'Months to break even on the purchase vs. depreciation'
    },
    {
      id: 'totalOwnershipCost',
      label: 'Total Ownership Cost',
      type: 'currency',
      explanation: 'Total cost of ownership including depreciation, fuel, and maintenance'
    },
    {
      id: 'costPerMile',
      label: 'Cost Per Mile',
      type: 'currency',
      explanation: 'Total ownership cost divided by expected mileage'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'New Car Purchase with Trade-in',
      description: 'Calculate auto loan for a $35,000 vehicle with $5,000 down payment and $8,000 trade-in',
      inputs: {
        vehiclePrice: 35000,
        downPayment: 5000,
        tradeInValue: 8000,
        loanTermYears: 5,
        interestRate: 6.5,
        vehicleYear: 2024,
        vehicleMake: 'Toyota',
        vehicleModel: 'Camry',
        fuelEfficiency: 32,
        annualMileage: 12000,
        fuelPricePerGallon: 3.50,
        extendedWarrantyCost: 1500,
        extendedWarrantyYears: 5,
        salesTaxRate: 6,
        otherFees: 500,
        creditScore: 750
      },
      expectedOutputs: {
        loanAmount: 20700,
        monthlyPayment: 412,
        totalLoanPayments: 24720,
        totalInterestPaid: 4020,
        totalCost: 30720,
        effectiveInterestRate: 6.5,
        breakEvenPoint: 10,
        totalOwnershipCost: 32220,
        costPerMile: 0.54
      }
    },
    {
      title: 'Fuel-Efficient Hybrid Vehicle',
      description: 'Calculate loan for a $28,000 hybrid with excellent fuel efficiency',
      inputs: {
        vehiclePrice: 28000,
        downPayment: 4000,
        tradeInValue: 0,
        loanTermYears: 4,
        interestRate: 5.25,
        vehicleYear: 2024,
        vehicleMake: 'Honda',
        vehicleModel: 'Insight',
        fuelEfficiency: 55,
        annualMileage: 10000,
        fuelPricePerGallon: 3.50,
        extendedWarrantyCost: 1200,
        extendedWarrantyYears: 4,
        salesTaxRate: 7,
        otherFees: 300,
        creditScore: 780
      },
      expectedOutputs: {
        loanAmount: 21380,
        monthlyPayment: 495,
        totalLoanPayments: 23760,
        totalInterestPaid: 2380,
        totalCost: 27860,
        effectiveInterestRate: 5.25,
        breakEvenPoint: 10,
        totalOwnershipCost: 29060,
        costPerMile: 0.73
      }
    },
    {
      title: 'Luxury SUV with Extended Warranty',
      description: 'Calculate loan for a $55,000 luxury SUV with comprehensive warranty coverage',
      inputs: {
        vehiclePrice: 55000,
        downPayment: 11000,
        tradeInValue: 15000,
        loanTermYears: 6,
        interestRate: 7.75,
        vehicleYear: 2024,
        vehicleMake: 'BMW',
        vehicleModel: 'X5',
        fuelEfficiency: 22,
        annualMileage: 15000,
        fuelPricePerGallon: 3.50,
        extendedWarrantyCost: 3000,
        extendedWarrantyYears: 6,
        salesTaxRate: 8,
        otherFees: 800,
        creditScore: 720
      },
      expectedOutputs: {
        loanAmount: 37400,
        monthlyPayment: 628,
        totalLoanPayments: 45168,
        totalInterestPaid: 7768,
        totalCost: 55968,
        effectiveInterestRate: 7.75,
        breakEvenPoint: 18,
        totalOwnershipCost: 58968,
        costPerMile: 0.65
      }
    }
  ]
};
