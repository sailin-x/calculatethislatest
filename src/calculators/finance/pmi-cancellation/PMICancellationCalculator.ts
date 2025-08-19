import { Calculator } from '../../types/Calculator';
import { calculatePMICancellation } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const pmiCancellationCalculator: Calculator = {
  id: 'pmi-cancellation',
  title: 'PMI Cancellation Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate when you can cancel Private Mortgage Insurance (PMI) and estimate the savings from cancellation.',
  usageInstructions: 'Enter your mortgage details to determine when PMI can be cancelled and calculate potential savings.',
  inputs: [
    {
      id: 'originalLoanAmount',
      label: 'Original Loan Amount',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Original mortgage loan amount',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'currentBalance',
      label: 'Current Loan Balance',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Current outstanding loan balance',
      placeholder: '280000',
      defaultValue: 280000
    },
    {
      id: 'originalHomeValue',
      label: 'Original Home Value',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Home value at time of purchase',
      placeholder: '375000',
      defaultValue: 375000
    },
    {
      id: 'currentHomeValue',
      label: 'Current Home Value',
      type: 'number',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current estimated home value',
      placeholder: '400000',
      defaultValue: 400000
    },
    {
      id: 'downPayment',
      label: 'Original Down Payment',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Down payment made at purchase',
      placeholder: '75000',
      defaultValue: 75000
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      tooltip: 'Original loan term in years',
      placeholder: '30',
      defaultValue: 30
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Annual interest rate',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number',
      required: true,
      min: 100,
      max: 50000,
      step: 10,
      tooltip: 'Current monthly mortgage payment including PMI',
      placeholder: '1520',
      defaultValue: 1520
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 2,
      step: 0.01,
      tooltip: 'Annual PMI rate as percentage of loan amount',
      placeholder: '0.5',
      defaultValue: 0.5
    },
    {
      id: 'loanStartDate',
      label: 'Loan Start Date',
      type: 'date',
      required: true,
      tooltip: 'Date when the loan originated',
      placeholder: '2020-01-15',
      defaultValue: '2020-01-15'
    },
    {
      id: 'paymentHistory',
      label: 'Payment History',
      type: 'select',
      required: true,
      options: [
        { value: 'perfect', label: 'Perfect (No late payments)' },
        { value: 'good', label: 'Good (1-2 late payments)' },
        { value: 'fair', label: 'Fair (3-5 late payments)' },
        { value: 'poor', label: 'Poor (6+ late payments)' }
      ],
      tooltip: 'Your payment history on this loan',
      defaultValue: 'perfect'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      tooltip: 'Type of mortgage loan',
      defaultValue: 'conventional'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      tooltip: 'Type of property',
      defaultValue: 'primary'
    },
    {
      id: 'appreciationRate',
      label: 'Annual Appreciation Rate (%)',
      type: 'number',
      required: false,
      min: -10,
      max: 20,
      step: 0.1,
      tooltip: 'Expected annual home value appreciation rate',
      placeholder: '3.0',
      defaultValue: 3.0
    },
    {
      id: 'additionalPayments',
      label: 'Additional Monthly Payments',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 10,
      tooltip: 'Additional principal payments made monthly',
      placeholder: '100',
      defaultValue: 100
    },
    {
      id: 'lumpSumPayment',
      label: 'Lump Sum Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'One-time lump sum payment to reduce principal',
      placeholder: '0',
      defaultValue: 0
    }
  ],
  outputs: [
    {
      id: 'currentLTV',
      label: 'Current Loan-to-Value Ratio (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Current loan balance as percentage of home value'
    },
    {
      id: 'originalLTV',
      label: 'Original Loan-to-Value Ratio (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Original loan amount as percentage of original home value'
    },
    {
      id: 'pmiCancellationDate',
      label: 'PMI Cancellation Date',
      type: 'date',
      format: 'date',
      explanation: 'Estimated date when PMI can be cancelled'
    },
    {
      id: 'monthsToCancellation',
      label: 'Months to PMI Cancellation',
      type: 'number',
      format: 'integer',
      explanation: 'Number of months until PMI can be cancelled'
    },
    {
      id: 'currentPMI',
      label: 'Current Monthly PMI',
      type: 'currency',
      format: 'USD',
      explanation: 'Current monthly PMI payment'
    },
    {
      id: 'annualPMISavings',
      label: 'Annual PMI Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Annual savings after PMI cancellation'
    },
    {
      id: 'totalPMISavings',
      label: 'Total PMI Savings',
      type: 'currency',
      format: 'USD',
      explanation: 'Total savings from PMI cancellation to loan end'
    },
    {
      id: 'newMonthlyPayment',
      label: 'New Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly payment after PMI cancellation'
    },
    {
      id: 'equityGain',
      label: 'Equity Gain',
      type: 'currency',
      format: 'USD',
      explanation: 'Increase in home equity from original purchase'
    },
    {
      id: 'equityPercentage',
      label: 'Equity Percentage (%)',
      type: 'percentage',
      format: 'percent',
      explanation: 'Current equity as percentage of home value'
    },
    {
      id: 'cancellationMethod',
      label: 'Cancellation Method',
      type: 'text',
      format: 'text',
      explanation: 'Method used to determine PMI cancellation eligibility'
    },
    {
      id: 'requirements',
      label: 'Cancellation Requirements',
      type: 'text',
      format: 'markdown',
      explanation: 'Requirements that must be met for PMI cancellation'
    },
    {
      id: 'analysis',
      label: 'PMI Cancellation Analysis',
      type: 'text',
      format: 'markdown',
      explanation: 'Detailed analysis of PMI cancellation options and savings'
    }
  ],
  formulas: [
    {
      id: 'pmi-cancellation-calculation',
      name: 'PMI Cancellation Calculation',
      description: 'Calculate PMI cancellation eligibility and savings',
      calculate: calculatePMICancellation
    }
  ],
  validationRules: [
    {
      id: 'required-fields',
      name: 'Required Fields',
      description: 'Ensure all required fields are provided',
      validate: validatePMICancellationInputs
    }
  ],
  examples: [
    {
      title: 'Standard PMI Cancellation',
      description: 'Typical scenario for PMI cancellation on conventional loan',
      inputs: {
        originalLoanAmount: 400000, // Higher loan amount to accommodate higher balance
        currentBalance: 365000, // Balance below original loan amount but high enough for LTV > 80%
        originalHomeValue: 450000, // Higher home value to accommodate higher loan amount
        currentHomeValue: 450000, // Higher current home value
        downPayment: 50000, // Down payment
        loanTerm: 30,
        interestRate: 4.5,
        monthlyPayment: 2026,
        pmiRate: 0.5,
        loanStartDate: '2020-01-15',
        paymentHistory: 'perfect',
        loanType: 'conventional',
        propertyType: 'primary',
        appreciationRate: 3.0,
        additionalPayments: 100,
        lumpSumPayment: 0
      },
      expectedOutputs: {
        currentLTV: 81.1, // 365000 / 450000 * 100
        originalLTV: 88.9, // 400000 / 450000 * 100
        pmiCancellationDate: '2025-06-15',
        monthsToCancellation: 18,
        currentPMI: 152.08, // (365000 * 0.5%) / 12
        annualPMISavings: 1825, // 152.08 * 12
        totalPMISavings: 27375, // 1825 * 15 (approximate)
        newMonthlyPayment: 1873.92, // 2026 - 152.08
        equityGain: 100000, // 450000 - 400000 + 50000
        equityPercentage: 18.9, // (450000 - 365000) / 450000 * 100
        cancellationMethod: 'Automatic (80% LTV)',
        requirements: 'Loan-to-value ratio must be 80% or less',
        analysis: 'PMI can be cancelled in 18 months with significant savings'
      }
    },
    {
      title: 'FHA Loan with MIP',
      description: 'FHA loan scenario with different cancellation rules',
      inputs: {
        originalLoanAmount: 250000,
        currentBalance: 240000,
        originalHomeValue: 300000,
        currentHomeValue: 350000,
        downPayment: 50000,
        loanTerm: 30,
        interestRate: 3.5,
        monthlyPayment: 1123,
        pmiRate: 0.85,
        loanStartDate: '2019-06-01',
        paymentHistory: 'good',
        loanType: 'fha',
        propertyType: 'primary',
        appreciationRate: 2.5,
        additionalPayments: 50,
        lumpSumPayment: 0
      },
      expectedOutputs: {
        currentLTV: 68.6,
        originalLTV: 83.3, // 250000 / 300000 * 100
        pmiCancellationDate: '2034-06-01',
        monthsToCancellation: 120,
        currentPMI: 170.00,
        annualPMISavings: 2040,
        totalPMISavings: 40800,
        newMonthlyPayment: 953.00,
        equityGain: 100000, // 350000 - 300000 + 50000
        equityPercentage: 31.4,
        cancellationMethod: 'FHA 11-year rule',
        requirements: 'FHA loans require 11 years of payments and 78% LTV',
        analysis: 'FHA MIP cancellation requires longer timeline but offers substantial savings'
      }
    },
    {
      title: 'Early Cancellation with Lump Sum',
      description: 'Scenario with additional payments to accelerate PMI cancellation',
      inputs: {
        originalLoanAmount: 400000,
        currentBalance: 350000,
        originalHomeValue: 480000,
        currentHomeValue: 520000,
        downPayment: 80000,
        loanTerm: 30,
        interestRate: 4.0,
        monthlyPayment: 1910,
        pmiRate: 0.6,
        loanStartDate: '2021-03-01',
        paymentHistory: 'perfect',
        loanType: 'conventional',
        propertyType: 'primary',
        appreciationRate: 4.0,
        additionalPayments: 200,
        lumpSumPayment: 25000
      },
      expectedOutputs: {
        currentLTV: 67.3,
        originalLTV: 83.3, // 400000 / 480000 * 100
        pmiCancellationDate: '2024-09-01',
        monthsToCancellation: 6,
        currentPMI: 175.00,
        annualPMISavings: 2100,
        totalPMISavings: 31500,
        newMonthlyPayment: 1735.00,
        equityGain: 120000, // 520000 - 480000 + 80000
        equityPercentage: 32.7,
        cancellationMethod: 'Accelerated (Additional payments)',
        requirements: 'Loan-to-value ratio must be 80% or less',
        analysis: 'Additional payments will accelerate PMI cancellation by 12 months'
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};