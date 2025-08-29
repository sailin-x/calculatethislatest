import { Calculator } from '../../types';
import { HOAFeeInputs, HOAFeeOutputs } from './types';
import { calculateHOAFee } from './formulas';
import { validateHOAFeeInputs } from './validation';

export const HOAFeeCalculator: Calculator<HOAFeeInputs, HOAFeeOutputs> = {
  id: 'hoa-fee',
  name: 'HOA Fee Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate HOA fees, costs, and financial health for homeowners associations',
  longDescription: `A comprehensive HOA fee calculator that analyzes homeowners association costs, financial health, and value for property owners. This calculator evaluates monthly fees, special assessments, reserve funds, operating expenses, and amenities to provide accurate cost analysis. It includes financial health assessment, market comparisons, budget analysis, and long-term projections to help property owners understand the true cost and value of HOA membership.`,
  
  inputs: {
    // Property Information
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Property address',
      required: true,
      placeholder: '123 Main St, Unit 4B, City, State 12345'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
      required: true,
      options: [
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'single-family', label: 'Single Family' },
        { value: 'co-op', label: 'Co-op' },
        { value: 'pud', label: 'PUD' }
      ],
      placeholder: 'condo'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Square footage of the property',
      required: true,
      min: 500,
      max: 10000,
      step: 100,
      placeholder: '1200'
    },
    unitNumber: {
      type: 'text',
      label: 'Unit Number',
      description: 'Unit or apartment number',
      required: true,
      placeholder: '4B'
    },
    buildingNumber: {
      type: 'text',
      label: 'Building Number',
      description: 'Building number if applicable',
      required: true,
      placeholder: 'Building A'
    },
    
    // HOA Information
    hoaName: {
      type: 'text',
      label: 'HOA Name',
      description: 'Name of the homeowners association',
      required: true,
      placeholder: 'Sunset Gardens HOA'
    },
    hoaType: {
      type: 'select',
      label: 'HOA Type',
      description: 'Type of homeowners association',
      required: true,
      options: [
        { value: 'condo_association', label: 'Condo Association' },
        { value: 'homeowners_association', label: 'Homeowners Association' },
        { value: 'coop_board', label: 'Co-op Board' },
        { value: 'master_association', label: 'Master Association' }
      ],
      placeholder: 'condo_association'
    },
    totalUnits: {
      type: 'number',
      label: 'Total Units',
      description: 'Total number of units in the association',
      required: true,
      min: 2,
      max: 1000,
      step: 1,
      placeholder: '50'
    },
    totalBuildings: {
      type: 'number',
      label: 'Total Buildings',
      description: 'Total number of buildings',
      required: true,
      min: 1,
      max: 100,
      step: 1,
      placeholder: '4'
    },
    associationAge: {
      type: 'number',
      label: 'Association Age (years)',
      description: 'Age of the association in years',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15'
    },
    
    // Fee Structure
    monthlyFee: {
      type: 'number',
      label: 'Monthly HOA Fee ($)',
      description: 'Monthly HOA assessment',
      required: true,
      min: 0,
      max: 5000,
      step: 10,
      placeholder: '350'
    },
    quarterlyFee: {
      type: 'number',
      label: 'Quarterly Fee ($)',
      description: 'Additional quarterly fees',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '0'
    },
    annualFee: {
      type: 'number',
      label: 'Annual Fee ($)',
      description: 'Additional annual fees',
      required: true,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '0'
    },
    specialAssessment: {
      type: 'number',
      label: 'Special Assessment ($)',
      description: 'Current or recent special assessment',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '0'
    },
    transferFee: {
      type: 'number',
      label: 'Transfer Fee ($)',
      description: 'Fee when selling the property',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '500'
    },
    lateFee: {
      type: 'number',
      label: 'Late Fee ($)',
      description: 'Late payment fee',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '25'
    },
    otherFees: {
      type: 'number',
      label: 'Other Fees ($)',
      description: 'Other miscellaneous fees',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '0'
    },
    
    // Budget Information
    totalAnnualBudget: {
      type: 'number',
      label: 'Total Annual Budget ($)',
      description: 'Total annual HOA budget',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '250000'
    },
    reserveFund: {
      type: 'number',
      label: 'Reserve Fund ($)',
      description: 'Current reserve fund balance',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '500000'
    },
    operatingExpenses: {
      type: 'number',
      label: 'Operating Expenses ($)',
      description: 'Annual operating expenses',
      required: true,
      min: 10000,
      max: 5000000,
      step: 1000,
      placeholder: '180000'
    },
    insuranceCosts: {
      type: 'number',
      label: 'Insurance Costs ($)',
      description: 'Annual insurance costs',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '25000'
    },
    maintenanceCosts: {
      type: 'number',
      label: 'Maintenance Costs ($)',
      description: 'Annual maintenance costs',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '45000'
    },
    utilityCosts: {
      type: 'number',
      label: 'Utility Costs ($)',
      description: 'Annual utility costs',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '30000'
    },
    managementFees: {
      type: 'number',
      label: 'Management Fees ($)',
      description: 'Annual management company fees',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '15000'
    },
    legalFees: {
      type: 'number',
      label: 'Legal Fees ($)',
      description: 'Annual legal fees',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000'
    },
    accountingFees: {
      type: 'number',
      label: 'Accounting Fees ($)',
      description: 'Annual accounting fees',
      required: true,
      min: 0,
      max: 50000,
      step: 500,
      placeholder: '3000'
    },
    otherExpenses: {
      type: 'number',
      label: 'Other Expenses ($)',
      description: 'Other annual expenses',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '7000'
    },
    
    // Insurance Coverage
    masterInsurance: {
      type: 'boolean',
      label: 'Master Insurance',
      description: 'HOA provides master insurance policy',
      required: true,
      placeholder: true
    },
    insuranceDeductible: {
      type: 'number',
      label: 'Insurance Deductible ($)',
      description: 'Master insurance deductible',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000'
    },
    coverageAmount: {
      type: 'number',
      label: 'Coverage Amount ($)',
      description: 'Master insurance coverage amount',
      required: true,
      min: 0,
      max: 100000000,
      step: 100000,
      placeholder: '10000000'
    },
    personalLiabilityCoverage: {
      type: 'number',
      label: 'Personal Liability Coverage ($)',
      description: 'Personal liability coverage amount',
      required: true,
      min: 0,
      max: 1000000,
      step: 10000,
      placeholder: '100000'
    },
    
    // Maintenance and Repairs
    maintenanceSchedule: {
      type: 'select',
      label: 'Maintenance Schedule',
      description: 'Frequency of maintenance',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'annual', label: 'Annual' }
      ],
      placeholder: 'quarterly'
    },
    lastMajorRenovation: {
      type: 'number',
      label: 'Last Major Renovation (years ago)',
      description: 'Years since last major renovation',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '8'
    },
    
    // Financial Health
    reserveStudy: {
      type: 'boolean',
      label: 'Reserve Study',
      description: 'HOA has conducted reserve study',
      required: true,
      placeholder: true
    },
    reserveStudyDate: {
      type: 'text',
      label: 'Reserve Study Date',
      description: 'Date of last reserve study',
      required: true,
      placeholder: '2023-01-15'
    },
    reserveFundingLevel: {
      type: 'number',
      label: 'Reserve Funding Level (%)',
      description: 'Current reserve funding percentage',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '85'
    },
    reserveFundingTarget: {
      type: 'number',
      label: 'Reserve Funding Target (%)',
      description: 'Target reserve funding percentage',
      required: true,
      min: 50,
      max: 150,
      step: 5,
      placeholder: '100'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Market location for comparisons',
      required: true,
      placeholder: 'Downtown Area'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for financial analysis',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '5'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected annual inflation rate',
      required: true,
      min: -5,
      max: 15,
      step: 0.5,
      placeholder: '2.5'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'currency'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Include charts in the analysis report',
      required: true,
      placeholder: true
    }
  },
  
  outputs: {
    totalMonthlyCost: {
      type: 'number',
      label: 'Total Monthly Cost',
      description: 'Total monthly HOA costs'
    },
    totalAnnualCost: {
      type: 'number',
      label: 'Total Annual Cost',
      description: 'Total annual HOA costs'
    },
    costPerSquareFoot: {
      type: 'number',
      label: 'Cost per Square Foot',
      description: 'HOA cost per square foot annually'
    },
    costPerUnit: {
      type: 'number',
      label: 'Cost per Unit',
      description: 'Average cost per unit'
    },
    budgetPerUnit: {
      type: 'number',
      label: 'Budget per Unit',
      description: 'Annual budget allocation per unit'
    },
    reserveHealth: {
      type: 'number',
      label: 'Reserve Health',
      description: 'Reserve fund health score (1-10)'
    },
    marketComparison: {
      type: 'number',
      label: 'Market Comparison',
      description: 'Comparison to market average'
    },
    hoaRating: {
      type: 'string',
      label: 'HOA Rating',
      description: 'Overall HOA financial health rating'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive HOA analysis'
    }
  },
  
  calculate: (inputs: HOAFeeInputs): HOAFeeOutputs => {
    const validation = validateHOAFeeInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHOAFee(inputs);
  },
  
  generateReport: (inputs: HOAFeeInputs, outputs: HOAFeeOutputs): string => {
    const { analysis } = outputs;
    
    return `
# HOA Fee Analysis Report

## Executive Summary
- **HOA Rating**: ${analysis.hoaRating}
- **Financial Health**: ${analysis.financialHealth}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Total Monthly Cost**: $${outputs.totalMonthlyCost.toLocaleString()}
- **Total Annual Cost**: $${outputs.totalAnnualCost.toLocaleString()}
- **Cost per Square Foot**: $${outputs.costPerSquareFoot.toFixed(2)}
- **Cost per Unit**: $${outputs.costPerUnit.toLocaleString()}
- **Budget per Unit**: $${outputs.budgetPerUnit.toLocaleString()}
- **Reserve Health**: ${outputs.reserveHealth}/10
- **Market Comparison**: ${outputs.marketComparison.toFixed(1)}%
- **HOA Rating**: ${outputs.hoaRating}

## Analysis
${analysis.feeSummary}

## Financial Health
${analysis.financialSummary}

## Recommendations
${analysis.valueRecommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Total Monthly Cost': 'Monthly Fee + (Quarterly Fee / 3) + (Annual Fee / 12) + (Special Assessment / 12)',
    'Total Annual Cost': 'Monthly Cost × 12 + Transfer Fee + Other Fees',
    'Cost per Square Foot': 'Total Annual Cost / Property Size',
    'Cost per Unit': 'Total Annual Budget / Total Units',
    'Budget per Unit': 'Total Annual Budget / Total Units',
    'Reserve Health': 'Weighted assessment of reserve funding, age, and financial stability',
    'Market Comparison': 'Comparison to similar properties in the market',
    'HOA Rating': 'Overall assessment of financial health and value'
  },
  
  examples: [
    {
      name: 'Standard Condo HOA',
      inputs: {
        propertyAddress: '123 Main St, Unit 4B, City, State 12345',
        propertyType: 'condo',
        propertySize: 1200,
        unitNumber: '4B',
        buildingNumber: 'Building A',
        hoaName: 'Sunset Gardens HOA',
        hoaType: 'condo_association',
        totalUnits: 50,
        totalBuildings: 4,
        associationAge: 15,
        monthlyFee: 350,
        quarterlyFee: 0,
        annualFee: 0,
        specialAssessment: 0,
        transferFee: 500,
        lateFee: 25,
        otherFees: 0,
        totalAnnualBudget: 250000,
        reserveFund: 500000,
        operatingExpenses: 180000,
        insuranceCosts: 25000,
        maintenanceCosts: 45000,
        utilityCosts: 30000,
        managementFees: 15000,
        legalFees: 5000,
        accountingFees: 3000,
        otherExpenses: 7000,
        masterInsurance: true,
        insuranceDeductible: 5000,
        coverageAmount: 10000000,
        personalLiabilityCoverage: 100000,
        maintenanceSchedule: 'quarterly',
        lastMajorRenovation: 8,
        reserveStudy: true,
        reserveStudyDate: '2023-01-15',
        reserveFundingLevel: 85,
        reserveFundingTarget: 100,
        marketLocation: 'Downtown Area',
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'HOA fees',
    'homeowners association',
    'condo fees',
    'property management',
    'reserve funds',
    'maintenance costs',
    'community fees',
    'property ownership',
    'association costs',
    'financial health'
  ],
  
  category_info: {
    name: 'Real Estate Finance',
    description: 'Financial calculators for real estate investment and financing',
    icon: '🏠'
  }
};
