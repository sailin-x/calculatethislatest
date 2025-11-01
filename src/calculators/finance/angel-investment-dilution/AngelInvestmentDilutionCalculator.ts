import { Calculator } from '../../types/calculator';
import { calculateAngelInvestmentDilution, generateAngelInvestmentDilutionAnalysis } from './formulas';
import { validateAngelInvestmentDilutionInputs } from './validation';

export const AngelInvestmentDilutionCalculator: Calculator = {
  id: 'AngelInvestmentDilution-calculator',
  name: 'Angel Investment Dilution Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Professional startup investment analysis tool for calculating ownership dilution, convertible security conversion, anti-dilution protection, and comprehensive angel investment returns with exit scenario modeling.',
  
  longDescription: `
    The Angel Investment Dilution Calculator is a comprehensive startup investment analysis tool designed for angel investors, venture capitalists, and startup founders to analyze investment terms, ownership dilution, and potential returns. This professional calculator provides detailed analysis of convertible securities, anti-dilution protection, future funding rounds, and exit scenarios.

    **Key Features:**
    • **Ownership Dilution Analysis**: Calculate pre and post-investment ownership percentages
    • **Convertible Security Modeling**: Analyze SAFEs, convertible notes, and preferred stock
    • **Anti-Dilution Protection**: Model full ratchet and weighted average anti-dilution
    • **Future Round Impact**: Project dilution from subsequent funding rounds
    • **Exit Scenario Modeling**: Analyze returns under different exit scenarios
    • **Risk-Adjusted Returns**: Calculate IRR, MOIC, and risk-adjusted metrics
    • **Sensitivity Analysis**: Test investment returns under various scenarios
    • **Monte Carlo Simulation**: Advanced probabilistic modeling
    • **Term Sheet Analysis**: Evaluate investment terms and conditions
    • **Due Diligence Support**: Comprehensive investment checklist

    **Use Cases:**
    • Angel investment due diligence and analysis
    • Startup fundraising and term sheet negotiation
    • Convertible security structuring and analysis
    • Portfolio company monitoring and reporting
    • Investment committee presentations and decision-making
    • Exit planning and scenario analysis
    • Risk management and portfolio optimization
    • Legal and compliance assessment
  `,

  inputs: [
    // Company Information
    { id: 'companyName', name: 'Company Name', type: 'text', required: true, description: 'Name of the startup company', placeholder: 'TechStartup Inc.', maxLength: 100 },
    { id: 'currentValuation', name: 'Pre-Money Valuation', type: 'number', unit: 'USD', required: true, description: 'Company valuation before investment', placeholder: '5000000', min: 100000, max: 1000000000 },
    { id: 'totalSharesOutstanding', name: 'Total Shares Outstanding', type: 'number', unit: 'shares', required: true, description: 'Current shares outstanding', placeholder: '10000000', min: 1000, max: 1000000000 },
    
    // Investment Details
    { id: 'investmentAmount', name: 'Investment Amount', type: 'number', unit: 'USD', required: true, description: 'Amount being invested', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'investmentType', name: 'Investment Type', type: 'select', required: true, description: 'Type of investment instrument', placeholder: 'Select investment type', options: ['equity', 'convertible_note', 'safe', 'preferred_stock'] },
    { id: 'conversionPrice', name: 'Conversion Price', type: 'number', unit: 'USD', required: false, description: 'Price per share for conversion (convertible notes/Safes)', placeholder: '5.00', min: 0.01, max: 1000 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: false, description: 'Discount rate for conversion (convertible notes/Safes)', placeholder: '20', min: 0, max: 50 },
    { id: 'cap', name: 'Valuation Cap', type: 'number', unit: 'USD', required: false, description: 'Valuation cap for Safes', placeholder: '10000000', min: 100000, max: 1000000000 },
    
    // Investment Terms
    { id: 'antiDilutionProtection', name: 'Anti-Dilution Protection', type: 'boolean', required: true, description: 'Whether anti-dilution protection is included', placeholder: 'true' },
    { id: 'antiDilutionType', name: 'Anti-Dilution Type', type: 'select', required: false, description: 'Type of anti-dilution protection', placeholder: 'Select type', options: ['full_ratchet', 'weighted_average', 'broad_based', 'narrow_based'] },
    { id: 'participationRights', name: 'Participation Rights', type: 'boolean', required: true, description: 'Whether participation rights are included', placeholder: 'false' },
    { id: 'liquidationPreference', name: 'Liquidation Preference', type: 'number', unit: 'x', required: true, description: 'Liquidation preference multiple', placeholder: '1.0', min: 1, max: 10 },
    { id: 'dividendRate', name: 'Dividend Rate', type: 'number', unit: '%', required: false, description: 'Annual dividend rate', placeholder: '8.0', min: 0, max: 20 },
    
    // Employee Stock Options
    { id: 'optionPoolSize', name: 'Option Pool Size', type: 'number', unit: 'shares', required: true, description: 'Number of options reserved', placeholder: '2000000', min: 0, max: 100000000 },
    { id: 'optionPoolPercentage', name: 'Option Pool Percentage', type: 'number', unit: '%', required: true, description: 'Percentage of total shares for options', placeholder: '15.0', min: 0, max: 50 },
    { id: 'vestingSchedule', name: 'Vesting Schedule', type: 'select', required: true, description: 'Vesting schedule for options', placeholder: 'Select schedule', options: ['standard', 'accelerated', 'custom'] },
    { id: 'vestingPeriod', name: 'Vesting Period', type: 'number', unit: 'months', required: true, description: 'Total vesting period in months', placeholder: '48', min: 12, max: 120 },
    { id: 'cliffPeriod', name: 'Cliff Period', type: 'number', unit: 'months', required: true, description: 'Cliff period in months', placeholder: '12', min: 0, max: 48 },
    
    // Analysis Parameters
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: true, description: 'Number of years to analyze', placeholder: '5', min: 1, max: 20 },
    { id: 'requiredRateOfReturn', name: 'Required Rate of Return', type: 'number', unit: '%', required: true, description: 'Required rate of return for analysis', placeholder: '25.0', min: 5, max: 100 },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'boolean', required: false, description: 'Include sensitivity analysis', placeholder: 'true' },
    { id: 'monteCarloSimulation', name: 'Monte Carlo Simulation', type: 'boolean', required: false, description: 'Include Monte Carlo simulation', placeholder: 'false' },
    { id: 'numberOfSimulations', name: 'Number of Simulations', type: 'number', unit: 'simulations', required: false, description: 'Number of Monte Carlo simulations', placeholder: '10000', min: 1000, max: 100000 },
    
    // Market Conditions
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select conditions', options: ['bull', 'bear', 'neutral'] },
    
    // Legal and Compliance
    { id: 'regulatoryCompliance', name: 'Regulatory Compliance', type: 'boolean', required: false, description: 'Whether regulatory compliance is confirmed', placeholder: 'true' },
    { id: 'securitiesLawCompliance', name: 'Securities Law Compliance', type: 'boolean', required: false, description: 'Whether securities law compliance is confirmed', placeholder: 'true' },
    
    // Reporting Preferences
    { id: 'currency', name: 'Currency', type: 'select', required: false, description: 'Display currency', placeholder: 'Select currency', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] },
    { id: 'displayFormat', name: 'Display Format', type: 'select', required: false, description: 'Number display format', placeholder: 'Select format', options: ['percentage', 'decimal', 'basis-points'] },
    { id: 'includeCharts', name: 'Include Charts', type: 'boolean', required: false, description: 'Include visual charts in analysis', placeholder: 'true' }
  ],

  outputs: [
    // Pre-Investment Metrics
    { id: 'preMoneyValuation', name: 'Pre-Money Valuation', type: 'number', unit: 'USD', description: 'Company valuation before investment' },
    { id: 'preMoneyShares', name: 'Pre-Money Shares', type: 'number', unit: 'shares', description: 'Shares outstanding before investment' },
    
    // Investment Impact
    { id: 'postMoneyValuation', name: 'Post-Money Valuation', type: 'number', unit: 'USD', description: 'Company valuation after investment' },
    { id: 'newSharesIssued', name: 'New Shares Issued', type: 'number', unit: 'shares', description: 'New shares issued for investment' },
    { id: 'effectivePricePerShare', name: 'Effective Price Per Share', type: 'number', unit: 'USD', description: 'Effective price per share' },
    
    // Convertible Security Analysis
    { id: 'conversionShares', name: 'Conversion Shares', type: 'number', unit: 'shares', description: 'Shares received upon conversion' },
    { id: 'conversionPrice', name: 'Conversion Price', type: 'number', unit: 'USD', description: 'Effective conversion price' },
    { id: 'effectiveDiscount', name: 'Effective Discount', type: 'number', unit: '%', description: 'Effective discount rate' },
    
    // Anti-Dilution Impact
    { id: 'antiDilutionAdjustment', name: 'Anti-Dilution Adjustment', type: 'number', unit: 'shares', description: 'Additional shares from anti-dilution' },
    { id: 'adjustedConversionPrice', name: 'Adjusted Conversion Price', type: 'number', unit: 'USD', description: 'Adjusted conversion price' },
    { id: 'adjustedShares', name: 'Adjusted Shares', type: 'number', unit: 'shares', description: 'Total shares after anti-dilution' },
    
    // Exit Analysis
    { id: 'expectedReturn', name: 'Expected Return', type: 'number', unit: 'USD', description: 'Expected return on investment' },
    { id: 'expectedIRR', name: 'Expected IRR', type: 'number', unit: '%', description: 'Expected internal rate of return' },
    { id: 'expectedMOIC', name: 'Expected MOIC', type: 'number', unit: 'x', description: 'Expected multiple on invested capital' },
    { id: 'riskAdjustedReturn', name: 'Risk-Adjusted Return', type: 'number', unit: '%', description: 'Risk-adjusted return' },
    
    // Investment Rating
    { id: 'investmentRating', name: 'Investment Rating', type: 'string', description: 'Overall investment rating' },
    { id: 'riskRating', name: 'Risk Rating', type: 'string', description: 'Overall risk rating' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    
    // Comprehensive Analysis
    { id: 'angelInvestmentDilutionAnalysis', name: 'Angel Investment Dilution Analysis Report', type: 'string', description: 'Comprehensive investment analysis with recommendations' }
  ],

  calculate: (inputs) => {
    return calculateAngelInvestmentDilution(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAngelInvestmentDilutionAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Post-Money Valuation',
      formula: 'Post-Money = Pre-Money + Investment Amount',
      description: 'Company valuation after investment'
    },
    {
      name: 'Price Per Share',
      formula: 'Price = Pre-Money Valuation / Pre-Money Shares',
      description: 'Price per share before investment'
    },
    {
      name: 'New Shares Issued',
      formula: 'New Shares = Investment Amount / Price Per Share',
      description: 'Shares issued for investment'
    },
    {
      name: 'Ownership Percentage',
      formula: 'Ownership = (Shares Owned / Total Shares) × 100%',
      description: 'Percentage ownership in company'
    },
    {
      name: 'Convertible Note Conversion',
      formula: 'Conversion Shares = Investment Amount / (Conversion Price × (1 - Discount))',
      description: 'Shares received upon conversion'
    },
    {
      name: 'SAFE Conversion',
      formula: 'Conversion Shares = Investment Amount / (Cap / Pre-Money Shares)',
      description: 'Shares received upon SAFE conversion'
    },
    {
      name: 'Anti-Dilution Adjustment',
      formula: 'Adjustment = Original Shares × (Original Price / New Price - 1)',
      description: 'Additional shares from anti-dilution protection'
    },
    {
      name: 'IRR Calculation',
      formula: 'IRR = (Exit Value / Investment Amount)^(1/Years) - 1',
      description: 'Internal rate of return'
    },
    {
      name: 'MOIC Calculation',
      formula: 'MOIC = Exit Value / Investment Amount',
      description: 'Multiple on invested capital'
    }
  ],

  examples: [
    {
      name: 'Series A Equity Investment',
      description: 'Standard Series A equity investment with anti-dilution protection',
      inputs: {
        companyName: 'TechStartup Inc.',
        currentValuation: 5000000,
        totalSharesOutstanding: 10000000,
        investmentAmount: 500000,
        investmentType: 'equity',
        antiDilutionProtection: true,
        antiDilutionType: 'weighted_average',
        participationRights: false,
        liquidationPreference: 1.0,
        optionPoolSize: 2000000,
        optionPoolPercentage: 15.0,
        vestingSchedule: 'standard',
        vestingPeriod: 48,
        cliffPeriod: 12,
        analysisPeriod: 5,
        requiredRateOfReturn: 25.0
      }
    },
    {
      name: 'SAFE Investment',
      description: 'SAFE investment with valuation cap and discount',
      inputs: {
        companyName: 'EarlyStage Startup',
        currentValuation: 2000000,
        totalSharesOutstanding: 8000000,
        investmentAmount: 250000,
        investmentType: 'safe',
        cap: 5000000,
        discountRate: 20,
        antiDilutionProtection: false,
        participationRights: false,
        liquidationPreference: 1.0,
        optionPoolSize: 1500000,
        optionPoolPercentage: 15.0,
        vestingSchedule: 'standard',
        vestingPeriod: 48,
        cliffPeriod: 12,
        analysisPeriod: 5,
        requiredRateOfReturn: 30.0
      }
    }
  ],

  tags: ['Startup Investment', 'Angel Investment', 'Venture Capital', 'Dilution Analysis', 'Convertible Securities', 'SAFE', 'Anti-Dilution', 'Exit Analysis', 'Due Diligence'],
  
  category_info: {
    name: 'Startup Investment',
    description: 'Professional tools for startup investment analysis, due diligence, and portfolio management'
  }
};
