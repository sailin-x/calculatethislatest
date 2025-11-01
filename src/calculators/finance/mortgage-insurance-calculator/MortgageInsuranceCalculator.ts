import { Calculator } from '../../../types/calculator';
import { MortgageInsuranceInputs, MortgageInsuranceOutputs } from './types';
import { calculateMortgageInsurance } from './formulas';
import { validateMortgageInsuranceInputs, validateMortgageInsuranceBusinessRules } from './validation';

export const MortgageInsuranceCalculator: Calculator = {
  id: 'MortgageInsuranceCalculator',
  title: 'Mortgage Insurance Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate private mortgage insurance (PMI), mortgage insurance premium (MIP), and homeowners insurance costs with risk assessment and coverage analysis.',
  usageInstructions: [
    'Enter loan and property details',
    'Specify insurance type and coverage amounts',
    'Input borrower credit and financial information',
    'Review insurance requirements and costs',
    'Analyze risk assessment and coverage adequacy'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Down payment amount'
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
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'FICO credit score'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'insuranceType',
      label: 'Insurance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'pmi', label: 'PMI Only' },
        { value: 'mi', label: 'MI Only' },
        { value: 'both', label: 'PMI + MI' }
      ],
      tooltip: 'Type of mortgage insurance to calculate'
    },
    {
      id: 'propertyState',
      label: 'Property State',
      type: 'text',
      required: true,
      tooltip: 'State where the property is located'
    },
    {
      id: 'propertyCounty',
      label: 'Property County',
      type: 'text',
      required: true,
      tooltip: 'County where the property is located'
    },
    {
      id: 'propertyZipCode',
      label: 'Property ZIP Code',
      type: 'text',
      required: true,
      tooltip: 'ZIP code of the property'
    },
    {
      id: 'borrowerAge',
      label: 'Borrower Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Age of the primary borrower'
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: false,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      tooltip: 'Marital status of the borrower'
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      tooltip: 'Employment status of the borrower'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly gross income'
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debts ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly debt obligations'
    },
    {
      id: 'bankruptcyHistory',
      label: 'Bankruptcy History',
      type: 'boolean',
      required: false,
      tooltip: 'Has the borrower filed for bankruptcy?'
    },
    {
      id: 'foreclosureHistory',
      label: 'Foreclosure History',
      type: 'boolean',
      required: false,
      tooltip: 'Has the borrower experienced foreclosure?'
    },
    {
      id: 'latePayments',
      label: 'Late Payments (Last 2 Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 12,
      tooltip: 'Number of late payments in the last 2 years'
    },
    {
      id: 'insuranceCoverage.dwelling',
      label: 'Dwelling Coverage ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Homeowners insurance dwelling coverage'
    },
    {
      id: 'insuranceCoverage.personalProperty',
      label: 'Personal Property Coverage ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Homeowners insurance personal property coverage'
    },
    {
      id: 'insuranceCoverage.liability',
      label: 'Liability Coverage ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Homeowners insurance liability coverage'
    },
    {
      id: 'insuranceCoverage.medicalPayments',
      label: 'Medical Payments Coverage ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Homeowners insurance medical payments coverage'
    },
    {
      id: 'deductible',
      label: 'Deductible ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      tooltip: 'Insurance deductible amount'
    },
    {
      id: 'floodZone',
      label: 'Flood Zone',
      type: 'select',
      required: false,
      options: [
        { value: 'A', label: 'A - High Risk' },
        { value: 'B', label: 'B - Moderate Risk' },
        { value: 'C', label: 'C - Low Risk' },
        { value: 'D', label: 'D - Possible Flooding' },
        { value: 'V', label: 'V - Coastal High Risk' },
        { value: 'X', label: 'X - Low to Moderate Risk' }
      ],
      tooltip: 'Flood zone designation'
    },
    {
      id: 'windstormCoverage',
      label: 'Windstorm Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Include windstorm coverage?'
    },
    {
      id: 'earthquakeCoverage',
      label: 'Earthquake Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Include earthquake coverage?'
    },
    {
      id: 'moldCoverage',
      label: 'Mold Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Include mold coverage?'
    },
    {
      id: 'identityTheftCoverage',
      label: 'Identity Theft Coverage',
      type: 'boolean',
      required: false,
      tooltip: 'Include identity theft coverage?'
    }
  ],

  outputs: [
    {
      id: 'pmiRequired',
      label: 'PMI Required',
      type: 'text',
      explanation: 'Whether private mortgage insurance is required'
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'percentage',
      explanation: 'Annual PMI rate'
    },
    {
      id: 'pmiMonthly',
      label: 'PMI Monthly ($)',
      type: 'currency',
      explanation: 'Monthly PMI payment'
    },
    {
      id: 'pmiTotal',
      label: 'PMI Total ($)',
      type: 'currency',
      explanation: 'Total PMI cost over loan term'
    },
    {
      id: 'miRequired',
      label: 'MI Required',
      type: 'text',
      explanation: 'Whether mortgage insurance is required'
    },
    {
      id: 'miRate',
      label: 'MI Rate (%)',
      type: 'percentage',
      explanation: 'Annual MI rate'
    },
    {
      id: 'miMonthly',
      label: 'MI Monthly ($)',
      type: 'currency',
      explanation: 'Monthly MI payment'
    },
    {
      id: 'miTotal',
      label: 'MI Total ($)',
      type: 'currency',
      explanation: 'Total MI cost over loan term'
    },
    {
      id: 'totalInsuranceMonthly',
      label: 'Total Insurance Monthly ($)',
      type: 'currency',
      explanation: 'Total monthly insurance cost'
    },
    {
      id: 'totalInsuranceAnnual',
      label: 'Total Insurance Annual ($)',
      type: 'currency',
      explanation: 'Total annual insurance cost'
    },
    {
      id: 'insuranceBreakdown',
      label: 'Insurance Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of all insurance costs'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment and recommendations'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'text',
      explanation: 'Comparison of different insurance scenarios'
    },
    {
      id: 'coverageAnalysis',
      label: 'Coverage Analysis',
      type: 'text',
      explanation: 'Analysis of insurance coverage adequacy'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conventional Loan with PMI',
      description: 'Conventional loan requiring PMI with average credit score',
      inputs: {
        loanAmount: 300000,
        propertyValue: 400000,
        downPayment: 100000,
        loanType: 'conventional',
        creditScore: 720,
        loanTerm: 30,
        insuranceType: 'pmi',
        propertyState: 'CA',
        propertyCounty: 'Los Angeles',
        propertyZipCode: '90210',
        borrowerAge: 35,
        monthlyIncome: 8000,
        monthlyDebts: 1200,
        latePayments: 0,
        bankruptcyHistory: false,
        foreclosureHistory: false,
        insuranceCoverage: {
          dwelling: 400000,
          personalProperty: 80000,
          liability: 300000,
          medicalPayments: 5000
        },
        deductible: 1000,
        floodZone: 'X'
      },
      expectedOutputs: {
        pmiRequired: true,
        pmiRate: 0.42,
        pmiMonthly: 105,
        pmiTotal: 37800,
        totalInsuranceMonthly: 455,
        totalInsuranceAnnual: 5460
      }
    },
    {
      title: 'FHA Loan with MIP',
      description: 'FHA loan with mortgage insurance premium',
      inputs: {
        loanAmount: 180000,
        propertyValue: 200000,
        downPayment: 20000,
        loanType: 'fha',
        creditScore: 650,
        loanTerm: 30,
        insuranceType: 'mi',
        propertyState: 'TX',
        propertyCounty: 'Harris',
        propertyZipCode: '77001',
        borrowerAge: 28,
        monthlyIncome: 4500,
        monthlyDebts: 800,
        latePayments: 1,
        bankruptcyHistory: false,
        foreclosureHistory: false,
        insuranceCoverage: {
          dwelling: 200000,
          personalProperty: 40000,
          liability: 200000,
          medicalPayments: 2000
        },
        deductible: 1500,
        floodZone: 'A',
        windstormCoverage: true
      },
      expectedOutputs: {
        miRequired: true,
        miRate: 0.80,
        miMonthly: 120,
        miTotal: 43200,
        totalInsuranceMonthly: 420,
        totalInsuranceAnnual: 5040
      }
    }
  ]
};