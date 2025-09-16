import { Calculator } from '../../../types/calculator';
import { calculateInheritanceTax } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const inheritanceTaxEstimator: Calculator = {
  id: 'inheritance-tax-estimator',
  title: 'Inheritance Tax Estimator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Estimate federal and state inheritance taxes, calculate estate deductions, and determine net estate value for beneficiaries with comprehensive estate planning analysis.',

  usageInstructions: [
    'Enter total estate value and asset breakdown',
    'Specify marital status and number of beneficiaries',
    'Select state of residence for state tax calculations',
    'Review tax estimates and estate planning recommendations'
  ],

  inputs: [
    {
      id: 'estateValue',
      label: 'Total Estate Value',
      type: 'currency',
      required: true,
      placeholder: '5000000',
      tooltip: 'Total value of the estate',
      defaultValue: 5000000,
      min: 0,
      max: 100000000
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'widowed', label: 'Widowed' },
        { value: 'divorced', label: 'Divorced' }
      ],
      tooltip: 'Marital status affects estate tax calculations',
      defaultValue: 'married'
    },
    {
      id: 'numberOfChildren',
      label: 'Number of Children',
      type: 'number',
      required: true,
      placeholder: '2',
      tooltip: 'Number of children who may inherit',
      defaultValue: 2,
      min: 0,
      max: 20
    },
    {
      id: 'stateOfResidence',
      label: 'State of Residence',
      type: 'select',
      required: true,
      options: [
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Alaska', label: 'Alaska' },
        { value: 'Arizona', label: 'Arizona' },
        { value: 'Arkansas', label: 'Arkansas' },
        { value: 'California', label: 'California' },
        { value: 'Colorado', label: 'Colorado' },
        { value: 'Connecticut', label: 'Connecticut' },
        { value: 'Delaware', label: 'Delaware' },
        { value: 'Florida', label: 'Florida' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Hawaii', label: 'Hawaii' },
        { value: 'Idaho', label: 'Idaho' },
        { value: 'Illinois', label: 'Illinois' },
        { value: 'Indiana', label: 'Indiana' },
        { value: 'Iowa', label: 'Iowa' },
        { value: 'Kansas', label: 'Kansas' },
        { value: 'Kentucky', label: 'Kentucky' },
        { value: 'Louisiana', label: 'Louisiana' },
        { value: 'Maine', label: 'Maine' },
        { value: 'Maryland', label: 'Maryland' },
        { value: 'Massachusetts', label: 'Massachusetts' },
        { value: 'Michigan', label: 'Michigan' },
        { value: 'Minnesota', label: 'Minnesota' },
        { value: 'Mississippi', label: 'Mississippi' },
        { value: 'Missouri', label: 'Missouri' },
        { value: 'Montana', label: 'Montana' },
        { value: 'Nebraska', label: 'Nebraska' },
        { value: 'Nevada', label: 'Nevada' },
        { value: 'New Hampshire', label: 'New Hampshire' },
        { value: 'New Jersey', label: 'New Jersey' },
        { value: 'New Mexico', label: 'New Mexico' },
        { value: 'New York', label: 'New York' },
        { value: 'North Carolina', label: 'North Carolina' },
        { value: 'North Dakota', label: 'North Dakota' },
        { value: 'Ohio', label: 'Ohio' },
        { value: 'Oklahoma', label: 'Oklahoma' },
        { value: 'Oregon', label: 'Oregon' },
        { value: 'Pennsylvania', label: 'Pennsylvania' },
        { value: 'Rhode Island', label: 'Rhode Island' },
        { value: 'South Carolina', label: 'South Carolina' },
        { value: 'South Dakota', label: 'South Dakota' },
        { value: 'Tennessee', label: 'Tennessee' },
        { value: 'Texas', label: 'Texas' },
        { value: 'Utah', label: 'Utah' },
        { value: 'Vermont', label: 'Vermont' },
        { value: 'Virginia', label: 'Virginia' },
        { value: 'Washington', label: 'Washington' },
        { value: 'West Virginia', label: 'West Virginia' },
        { value: 'Wisconsin', label: 'Wisconsin' },
        { value: 'Wyoming', label: 'Wyoming' }
      ],
      tooltip: 'State affects estate tax rates',
      defaultValue: 'California'
    },
    {
      id: 'hasWill',
      label: 'Has Will',
      type: 'boolean',
      required: false,
      tooltip: 'Whether the decedent has a valid will',
      defaultValue: true
    },
    {
      id: 'hasTrust',
      label: 'Has Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Whether estate planning trusts are in place',
      defaultValue: false
    },
    {
      id: 'charitableDonations',
      label: 'Charitable Donations',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Value of charitable bequests',
      defaultValue: 100000,
      min: 0,
      max: 10000000
    },
    {
      id: 'funeralExpenses',
      label: 'Funeral Expenses',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Funeral and burial expenses',
      defaultValue: 15000,
      min: 0,
      max: 100000
    },
    {
      id: 'medicalExpenses',
      label: 'Medical Expenses',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Unpaid medical expenses',
      defaultValue: 50000,
      min: 0,
      max: 1000000
    },
    {
      id: 'administrativeExpenses',
      label: 'Administrative Expenses',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Estate administration costs',
      defaultValue: 25000,
      min: 0,
      max: 500000
    },
    {
      id: 'debtsAndLiabilities',
      label: 'Debts and Liabilities',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Outstanding debts and liabilities',
      defaultValue: 50000,
      min: 0,
      max: 10000000
    },
    {
      id: 'lifeInsuranceProceeds',
      label: 'Life Insurance Proceeds',
      type: 'boolean',
      required: false,
      tooltip: 'Whether life insurance is included in estate',
      defaultValue: false
    },
    {
      id: 'retirementAccounts',
      label: 'Retirement Accounts',
      type: 'currency',
      required: false,
      placeholder: '500000',
      tooltip: 'Value of retirement accounts',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'realEstateValue',
      label: 'Real Estate Value',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Value of real estate holdings',
      defaultValue: 1000000,
      min: 0,
      max: 50000000
    },
    {
      id: 'businessInterests',
      label: 'Business Interests',
      type: 'currency',
      required: false,
      placeholder: '2000000',
      tooltip: 'Value of business ownership',
      defaultValue: 2000000,
      min: 0,
      max: 50000000
    },
    {
      id: 'personalProperty',
      label: 'Personal Property',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Value of personal property and belongings',
      defaultValue: 200000,
      min: 0,
      max: 10000000
    },
    {
      id: 'cashAndInvestments',
      label: 'Cash and Investments',
      type: 'currency',
      required: false,
      placeholder: '800000',
      tooltip: 'Value of cash and investment accounts',
      defaultValue: 800000,
      min: 0,
      max: 50000000
    }
  ],

  outputs: [
    {
      id: 'grossEstateValue',
      label: 'Gross Estate Value',
      type: 'currency',
      explanation: 'Total value of the estate before deductions'
    },
    {
      id: 'totalDeductions',
      label: 'Total Deductions',
      type: 'currency',
      explanation: 'Total allowable deductions from estate'
    },
    {
      id: 'taxableEstate',
      label: 'Taxable Estate',
      type: 'currency',
      explanation: 'Estate value subject to taxation'
    },
    {
      id: 'federalEstateTax',
      label: 'Federal Estate Tax',
      type: 'currency',
      explanation: 'Federal estate tax liability'
    },
    {
      id: 'stateEstateTax',
      label: 'State Estate Tax',
      type: 'currency',
      explanation: 'State estate tax liability'
    },
    {
      id: 'totalEstateTax',
      label: 'Total Estate Tax',
      type: 'currency',
      explanation: 'Combined federal and state estate tax'
    },
    {
      id: 'netEstateValue',
      label: 'Net Estate Value',
      type: 'currency',
      explanation: 'Estate value after taxes'
    },
    {
      id: 'executorFees',
      label: 'Executor Fees',
      type: 'currency',
      explanation: 'Fees paid to estate executor'
    },
    {
      id: 'attorneyFees',
      label: 'Attorney Fees',
      type: 'currency',
      explanation: 'Legal fees for estate administration'
    },
    {
      id: 'totalAdministrativeCosts',
      label: 'Total Administrative Costs',
      type: 'currency',
      explanation: 'Total costs of estate administration'
    },
    {
      id: 'finalDistribution',
      label: 'Final Distribution',
      type: 'currency',
      explanation: 'Final amount available for distribution to beneficiaries'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('estateValue', 'Estate value is required'),
    ValidationRuleFactory.required('maritalStatus', 'Marital status is required'),
    ValidationRuleFactory.required('numberOfChildren', 'Number of children is required'),
    ValidationRuleFactory.required('stateOfResidence', 'State of residence is required'),
    ValidationRuleFactory.range('estateValue', 0, 100000000, 'Estate value must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('numberOfChildren', 0, 20, 'Number of children must be between 0 and 20'),
    ValidationRuleFactory.range('charitableDonations', 0, 100000000, 'Charitable donations must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('funeralExpenses', 0, 100000, 'Funeral expenses must be between $0 and $100,000'),
    ValidationRuleFactory.range('medicalExpenses', 0, 1000000, 'Medical expenses must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('administrativeExpenses', 0, 500000, 'Administrative expenses must be between $0 and $500,000'),
    ValidationRuleFactory.range('debtsAndLiabilities', 0, 100000000, 'Debts and liabilities must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('retirementAccounts', 0, 100000000, 'Retirement accounts must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('realEstateValue', 0, 50000000, 'Real estate value must be between $0 and $50,000,000'),
    ValidationRuleFactory.range('businessInterests', 0, 50000000, 'Business interests must be between $0 and $50,000,000'),
    ValidationRuleFactory.range('personalProperty', 0, 10000000, 'Personal property must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('cashAndInvestments', 0, 50000000, 'Cash and investments must be between $0 and $50,000,000')
  ],

  examples: [
    {
      title: 'Married Couple Estate',
      description: 'Estate planning for a married couple with children',
      inputs: {
        estateValue: 8000000,
        maritalStatus: 'married',
        numberOfChildren: 2,
        stateOfResidence: 'California',
        hasWill: true,
        hasTrust: true,
        charitableDonations: 200000,
        funeralExpenses: 20000,
        medicalExpenses: 75000,
        administrativeExpenses: 35000,
        debtsAndLiabilities: 150000,
        lifeInsuranceProceeds: false,
        retirementAccounts: 1000000,
        realEstateValue: 2000000,
        businessInterests: 3000000,
        personalProperty: 300000,
        cashAndInvestments: 1000000
      },
      expectedOutputs: {
        grossEstateValue: 8000000,
        totalDeductions: 405000,
        taxableEstate: 7595000,
        federalEstateTax: 0,
        stateEstateTax: 0,
        totalEstateTax: 0,
        netEstateValue: 8000000,
        executorFees: 160000,
        attorneyFees: 120000,
        totalAdministrativeCosts: 315000,
        finalDistribution: 7685000
      }
    },
    {
      title: 'High-Value Estate',
      description: 'Large estate exceeding federal exemption',
      inputs: {
        estateValue: 25000000,
        maritalStatus: 'single',
        numberOfChildren: 3,
        stateOfResidence: 'New York',
        hasWill: true,
        hasTrust: false,
        charitableDonations: 500000,
        funeralExpenses: 25000,
        medicalExpenses: 100000,
        administrativeExpenses: 50000,
        debtsAndLiabilities: 200000,
        lifeInsuranceProceeds: true,
        retirementAccounts: 2000000,
        realEstateValue: 8000000,
        businessInterests: 10000000,
        personalProperty: 500000,
        cashAndInvestments: 3000000
      },
      expectedOutputs: {
        grossEstateValue: 25000000,
        totalDeductions: 875000,
        taxableEstate: 24125000,
        federalEstateTax: 2715000,
        stateEstateTax: 3860000,
        totalEstateTax: 6575000,
        netEstateValue: 18425000,
        executorFees: 500000,
        attorneyFees: 375000,
        totalAdministrativeCosts: 925000,
        finalDistribution: 17500000
      }
    }
  ]
};