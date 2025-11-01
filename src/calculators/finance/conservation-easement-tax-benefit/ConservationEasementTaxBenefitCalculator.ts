import { Calculator } from '../../types/calculator';
import { calculateTaxBenefits, generateTaxBenefitAnalysis } from './formulas';
import { validateTaxBenefitInputs } from './validation';

export const ConservationEasementTaxBenefitCalculator: Calculator = {
  id: 'ConservationEasementTax-benefit-calculator',
  name: 'Conservation Easement Tax Benefit Calculator',
  category: 'finance',
  subcategory: 'tax',
  description: 'Calculate tax benefits and deductions for conservation easements, including charitable contribution deductions and estate tax benefits.',
  
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of property being conserved',
      options: [
        { value: 'farmland', label: 'Farmland' },
        { value: 'forest', label: 'Forest/Woodland' },
        { value: 'wetland', label: 'Wetland' },
        { value: 'wildlife-habitat', label: 'Wildlife Habitat' },
        { value: 'scenic-view', label: 'Scenic View' },
        { value: 'historic', label: 'Historic Property' },
        { value: 'recreational', label: 'Recreational Land' },
        { value: 'open-space', label: 'Open Space' }
      ]
    },
    {
      id: 'propertyValue',
      name: 'Property Value Before Easement',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Fair market value of property before conservation easement',
      placeholder: '1000000',
      min: 10000,
      max: 100000000
    },
    {
      id: 'easementValue',
      name: 'Easement Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Value of the conservation easement (charitable contribution)',
      placeholder: '300000',
      min: 1000,
      max: 50000000
    },
    {
      id: 'propertyValueAfter',
      name: 'Property Value After Easement',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Fair market value of property after conservation easement',
      placeholder: '700000',
      min: 1000,
      max: 100000000
    },
    {
      id: 'acres',
      name: 'Property Acres',
      type: 'number',
      required: true,
      description: 'Total acres of the property',
      placeholder: '100',
      min: 1,
      max: 100000
    },
    {
      id: 'easementAcres',
      name: 'Easement Acres',
      type: 'number',
      required: true,
      description: 'Acres covered by the conservation easement',
      placeholder: '80',
      min: 1,
      max: 100000
    },
    {
      id: 'easementType',
      name: 'Easement Type',
      type: 'select',
      required: true,
      description: 'Type of conservation easement',
      options: [
        { value: 'perpetual', label: 'Perpetual' },
        { value: 'term', label: 'Term (30+ years)' },
        { value: 'partial', label: 'Partial Property' }
      ]
    },
    {
      id: 'easementHolder',
      name: 'Easement Holder',
      type: 'select',
      required: true,
      description: 'Organization holding the conservation easement',
      options: [
        { value: 'land-trust', label: 'Land Trust' },
        { value: 'government', label: 'Government Agency' },
        { value: 'nonprofit', label: 'Nonprofit Organization' },
        { value: 'tribal', label: 'Tribal Government' }
      ]
    },
    {
      id: 'donorType',
      name: 'Donor Type',
      type: 'select',
      required: true,
      description: 'Type of donor making the easement donation',
      options: [
        { value: 'individual', label: 'Individual' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'corporation', label: 'Corporation' },
        { value: 'llc', label: 'LLC' },
        { value: 'trust', label: 'Trust' },
        { value: 'estate', label: 'Estate' }
      ]
    },
    {
      id: 'taxYear',
      name: 'Tax Year',
      type: 'number',
      required: true,
      description: 'Tax year of the easement donation',
      placeholder: '2024',
      min: 2015,
      max: 2030
    },
    {
      id: 'adjustedGrossIncome',
      name: 'Adjusted Gross Income',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Donor\'s adjusted gross income for the tax year',
      placeholder: '200000',
      min: 0,
      max: 10000000
    },
    {
      id: 'marginalTaxRate',
      name: 'Marginal Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Donor\'s marginal federal income tax rate',
      placeholder: '37',
      min: 10,
      max: 50
    },
    {
      id: 'stateTaxRate',
      name: 'State Tax Rate',
      type: 'number',
      unit: '%',
      required: true,
      description: 'State income tax rate (if applicable)',
      placeholder: '5',
      min: 0,
      max: 15
    },
    {
      id: 'otherCharitableDeductions',
      name: 'Other Charitable Deductions',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Other charitable deductions for the tax year',
      placeholder: '10000',
      min: 0,
      max: 1000000
    },
    {
      id: 'appraisalCost',
      name: 'Appraisal Cost',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost of professional appraisal',
      placeholder: '5000',
      min: 0,
      max: 50000
    },
    {
      id: 'legalCost',
      name: 'Legal Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Legal and transaction costs',
      placeholder: '15000',
      min: 0,
      max: 100000
    },
    {
      id: 'surveyCost',
      name: 'Survey Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Survey and engineering costs',
      placeholder: '8000',
      min: 0,
      max: 50000
    },
    {
      id: 'easementDuration',
      name: 'Easement Duration',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Duration of easement in years (30+ for term easements)',
      placeholder: '30',
      min: 30,
      max: 100
    },
    {
      id: 'developmentRights',
      name: 'Development Rights Extinguished',
      type: 'multiselect',
      required: true,
      description: 'Development rights being extinguished',
      options: [
        { value: 'residential', label: 'Residential Development' },
        { value: 'commercial', label: 'Commercial Development' },
        { value: 'industrial', label: 'Industrial Development' },
        { value: 'subdivision', label: 'Subdivision Rights' },
        { value: 'mining', label: 'Mining Rights' },
        { value: 'logging', label: 'Logging Rights' },
        { value: 'agricultural', label: 'Agricultural Conversion' },
        { value: 'none', label: 'None (Open Space Only)' }
      ]
    },
    {
      id: 'publicAccess',
      name: 'Public Access',
      type: 'select',
      required: true,
      description: 'Level of public access provided',
      options: [
        { value: 'full', label: 'Full Public Access' },
        { value: 'limited', label: 'Limited Public Access' },
        { value: 'none', label: 'No Public Access' }
      ]
    },
    {
      id: 'conservationPurpose',
      name: 'Conservation Purpose',
      type: 'multiselect',
      required: true,
      description: 'Conservation purposes served',
      options: [
        { value: 'wildlife', label: 'Wildlife Habitat Protection' },
        { value: 'agricultural', label: 'Agricultural Preservation' },
        { value: 'scenic', label: 'Scenic Protection' },
        { value: 'historic', label: 'Historic Preservation' },
        { value: 'recreational', label: 'Recreational Access' },
        { value: 'open-space', label: 'Open Space Protection' },
        { value: 'watershed', label: 'Watershed Protection' },
        { value: 'forest', label: 'Forest Conservation' }
      ]
    }
  ],

  outputs: [
    {
      id: 'charitableDeduction',
      name: 'Charitable Deduction',
      type: 'number',
      unit: 'USD',
      description: 'Total charitable deduction amount'
    },
    {
      id: 'federalTaxSavings',
      name: 'Federal Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Federal income tax savings'
    },
    {
      id: 'stateTaxSavings',
      name: 'State Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'State income tax savings'
    },
    {
      id: 'totalTaxSavings',
      name: 'Total Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Combined federal and state tax savings'
    },
    {
      id: 'deductionLimit',
      name: 'Deduction Limit',
      type: 'number',
      unit: 'USD',
      description: 'Maximum deductible amount for the year'
    },
    {
      id: 'carryforwardAmount',
      name: 'Carryforward Amount',
      type: 'number',
      unit: 'USD',
      description: 'Amount carried forward to future years'
    },
    {
      id: 'carryforwardYears',
      name: 'Carryforward Years',
      type: 'number',
      unit: 'years',
      description: 'Number of years to fully utilize deduction'
    },
    {
      id: 'netBenefit',
      name: 'Net Tax Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Net benefit after transaction costs'
    },
    {
      id: 'benefitCostRatio',
      name: 'Benefit-Cost Ratio',
      type: 'number',
      description: 'Ratio of tax benefits to transaction costs'
    },
    {
      id: 'easementValuePerAcre',
      name: 'Easement Value per Acre',
      type: 'number',
      unit: 'USD/acre',
      description: 'Easement value divided by easement acres'
    },
    {
      id: 'propertyValueReduction',
      name: 'Property Value Reduction',
      type: 'number',
      unit: '%',
      description: 'Percentage reduction in property value'
    },
    {
      id: 'estateTaxBenefit',
      name: 'Estate Tax Benefit',
      type: 'number',
      unit: 'USD',
      description: 'Estimated estate tax benefit'
    },
    {
      id: 'annualTaxSavings',
      name: 'Annual Tax Savings',
      type: 'number',
      unit: 'USD',
      description: 'Average annual tax savings over carryforward period'
    },
    {
      id: 'transactionCosts',
      name: 'Total Transaction Costs',
      type: 'number',
      unit: 'USD',
      description: 'Total costs of completing the easement'
    },
    {
      id: 'easementAnalysis',
      name: 'Easement Analysis',
      type: 'string',
      description: 'Comprehensive analysis of the conservation easement'
    }
  ],

  calculate: (inputs) => {
    const validation = validateTaxBenefitInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculateTaxBenefits(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateTaxBenefitAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Charitable Deduction',
      formula: 'Charitable Deduction = Easement Value',
      description: 'The easement value equals the charitable deduction amount'
    },
    {
      name: 'Federal Tax Savings',
      formula: 'Federal Tax Savings = Charitable Deduction × Marginal Tax Rate',
      description: 'Federal tax savings based on marginal tax rate'
    },
    {
      name: 'Deduction Limit',
      formula: 'Deduction Limit = AGI × 50% (or 30% for certain property)',
      description: 'Annual deduction limit based on adjusted gross income'
    },
    {
      name: 'Carryforward',
      formula: 'Carryforward = Charitable Deduction - Deduction Limit',
      description: 'Excess deduction carried forward to future years'
    },
    {
      name: 'Net Benefit',
      formula: 'Net Benefit = Total Tax Savings - Transaction Costs',
      description: 'Net benefit after deducting transaction costs'
    }
  ],

  examples: [
    {
      name: 'Farmland Conservation Easement',
      description: 'A 200-acre farmland conservation easement with significant tax benefits',
      inputs: {
        propertyType: 'farmland',
        propertyValue: 2000000,
        easementValue: 600000,
        propertyValueAfter: 1400000,
        acres: 200,
        easementAcres: 200,
        easementType: 'perpetual',
        easementHolder: 'land-trust',
        donorType: 'individual',
        taxYear: 2024,
        adjustedGrossIncome: 500000,
        marginalTaxRate: 37,
        stateTaxRate: 5,
        otherCharitableDeductions: 20000,
        appraisalCost: 8000,
        legalCost: 25000,
        surveyCost: 12000,
        easementDuration: 99,
        developmentRights: ['residential', 'commercial', 'subdivision'],
        publicAccess: 'limited',
        conservationPurpose: ['agricultural', 'wildlife', 'open-space']
      },
      expectedOutputs: {
        charitableDeduction: 600000,
        federalTaxSavings: 222000,
        stateTaxSavings: 30000,
        totalTaxSavings: 252000,
        deductionLimit: 250000,
        carryforwardAmount: 350000,
        carryforwardYears: 2,
        netBenefit: 207000,
        benefitCostRatio: 5.5,
        easementValuePerAcre: 3000,
        propertyValueReduction: 30,
        estateTaxBenefit: 240000,
        annualTaxSavings: 84000,
        transactionCosts: 45000,
        easementAnalysis: 'Highly beneficial conservation easement with strong tax advantages'
      }
    },
    {
      name: 'Forest Conservation Easement',
      description: 'A 500-acre forest conservation easement with long-term benefits',
      inputs: {
        propertyType: 'forest',
        propertyValue: 1500000,
        easementValue: 450000,
        propertyValueAfter: 1050000,
        acres: 500,
        easementAcres: 500,
        easementType: 'perpetual',
        easementHolder: 'nonprofit',
        donorType: 'partnership',
        taxYear: 2024,
        adjustedGrossIncome: 300000,
        marginalTaxRate: 35,
        stateTaxRate: 6,
        otherCharitableDeductions: 15000,
        appraisalCost: 6000,
        legalCost: 20000,
        surveyCost: 10000,
        easementDuration: 99,
        developmentRights: ['residential', 'logging', 'mining'],
        publicAccess: 'none',
        conservationPurpose: ['forest', 'wildlife', 'watershed']
      },
      expectedOutputs: {
        charitableDeduction: 450000,
        federalTaxSavings: 157500,
        stateTaxSavings: 27000,
        totalTaxSavings: 184500,
        deductionLimit: 150000,
        carryforwardAmount: 300000,
        carryforwardYears: 2,
        netBenefit: 148500,
        benefitCostRatio: 4.1,
        easementValuePerAcre: 900,
        propertyValueReduction: 30,
        estateTaxBenefit: 180000,
        annualTaxSavings: 61500,
        transactionCosts: 36000,
        easementAnalysis: 'Excellent forest conservation easement with substantial tax benefits'
      }
    }
  ]
};
