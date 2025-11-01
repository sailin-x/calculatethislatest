import { Calculator } from '../../types/calculator';
import { calculateAccretionDilution, generateAccretionDilutionAnalysis } from './formulas';
import { validateAccretionDilutionInputs } from './validation';

export const AccretionDilutionCalculator: Calculator = {
  id: 'AccretionDilutionCalculator',
  name: 'Accretion/Dilution (M&A) Model Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Professional M&A analysis tool for calculating earnings per share accretion/dilution, transaction modeling, synergy analysis, and comprehensive deal evaluation for mergers and acquisitions.',
  
  longDescription: `
    The Accretion/Dilution M&A Model Calculator is an industry-standard tool used by investment bankers, corporate development teams, and M&A professionals to analyze the financial impact of mergers and acquisitions. This comprehensive model evaluates whether a transaction will be accretive (positive) or dilutive (negative) to the acquirer's earnings per share and provides detailed analysis of deal structure, financing options, synergies, and value creation opportunities.

    **Key Features:**
    • **EPS Impact Analysis**: Calculate precise earnings per share accretion/dilution
    • **Transaction Modeling**: Model various deal structures and financing options
    • **Synergy Valuation**: Quantify revenue and cost synergies with NPV analysis
    • **Pro Forma Financials**: Generate combined entity financial projections
    • **Sensitivity Analysis**: Test key assumptions and scenario modeling
    • **Valuation Methods**: Multiple valuation approaches and fairness analysis
    • **Integration Planning**: Timeline and resource requirement analysis
    • **Risk Assessment**: Comprehensive risk evaluation and mitigation strategies

    **Use Cases:**
    • Investment banking deal analysis and pitch books
    • Corporate development transaction evaluation
    • Private equity acquisition modeling
    • Strategic planning and M&A decision-making
    • Board presentation materials and deal approval
    • Due diligence financial analysis
    • Post-merger integration planning
  `,

  inputs: [
    // Target Company Information
    { id: 'targetRevenue', name: 'Target Revenue', type: 'number', unit: 'USD', required: true, description: 'Target company annual revenue', placeholder: '500000000', min: 1000000, max: 1000000000000 },
    { id: 'targetEBITDA', name: 'Target EBITDA', type: 'number', unit: 'USD', required: true, description: 'Target company EBITDA', placeholder: '100000000', min: 0, max: 500000000000 },
    { id: 'targetNetIncome', name: 'Target Net Income', type: 'number', unit: 'USD', required: true, description: 'Target company net income', placeholder: '50000000', min: -100000000000, max: 500000000000 },
    { id: 'targetSharesOutstanding', name: 'Target Shares Outstanding', type: 'number', unit: 'shares', required: true, description: 'Target company shares outstanding', placeholder: '50000000', min: 1000, max: 50000000000 },
    { id: 'targetSharePrice', name: 'Target Share Price', type: 'number', unit: 'USD', required: true, description: 'Current target company share price', placeholder: '45.00', min: 0.01, max: 10000 },
    { id: 'targetDebt', name: 'Target Total Debt', type: 'number', unit: 'USD', required: true, description: 'Target company total debt', placeholder: '200000000', min: 0, max: 1000000000000 },
    { id: 'targetCash', name: 'Target Cash', type: 'number', unit: 'USD', required: true, description: 'Target company cash and equivalents', placeholder: '50000000', min: 0, max: 500000000000 },
    
    // Acquirer Company Information
    { id: 'acquirerRevenue', name: 'Acquirer Revenue', type: 'number', unit: 'USD', required: true, description: 'Acquiring company annual revenue', placeholder: '2000000000', min: 1000000, max: 1000000000000 },
    { id: 'acquirerEBITDA', name: 'Acquirer EBITDA', type: 'number', unit: 'USD', required: true, description: 'Acquiring company EBITDA', placeholder: '400000000', min: 0, max: 500000000000 },
    { id: 'acquirerNetIncome', name: 'Acquirer Net Income', type: 'number', unit: 'USD', required: true, description: 'Acquiring company net income', placeholder: '200000000', min: -100000000000, max: 500000000000 },
    { id: 'acquirerSharesOutstanding', name: 'Acquirer Shares Outstanding', type: 'number', unit: 'shares', required: true, description: 'Acquiring company shares outstanding', placeholder: '100000000', min: 1000, max: 50000000000 },
    { id: 'acquirerSharePrice', name: 'Acquirer Share Price', type: 'number', unit: 'USD', required: true, description: 'Current acquiring company share price', placeholder: '80.00', min: 0.01, max: 10000 },
    { id: 'acquirerDebt', name: 'Acquirer Total Debt', type: 'number', unit: 'USD', required: true, description: 'Acquiring company total debt', placeholder: '800000000', min: 0, max: 1000000000000 },
    { id: 'acquirerCash', name: 'Acquirer Cash', type: 'number', unit: 'USD', required: true, description: 'Acquiring company cash and equivalents', placeholder: '300000000', min: 0, max: 500000000000 },
    
    // Deal Structure
    { id: 'purchasePrice', name: 'Purchase Price', type: 'number', unit: 'USD', required: true, description: 'Total purchase price for target company', placeholder: '2750000000', min: 1000000, max: 1000000000000 },
    { id: 'cashPortion', name: 'Cash Portion', type: 'number', unit: '%', required: true, description: 'Percentage of purchase price paid in cash', placeholder: '60', min: 0, max: 100 },
    { id: 'stockPortion', name: 'Stock Portion', type: 'number', unit: '%', required: true, description: 'Percentage of purchase price paid in stock', placeholder: '40', min: 0, max: 100 },
    { id: 'debtFinancing', name: 'New Debt Financing', type: 'number', unit: 'USD', required: true, description: 'Amount of new debt raised for transaction', placeholder: '1000000000', min: 0, max: 100000000000 },
    
    // Transaction Details
    { id: 'transactionCosts', name: 'Transaction Costs', type: 'number', unit: 'USD', required: true, description: 'Investment banking, legal, and other transaction fees', placeholder: '50000000', min: 0, max: 10000000000 },
    { id: 'integrationCosts', name: 'Integration Costs', type: 'number', unit: 'USD', required: true, description: 'One-time integration and restructuring costs', placeholder: '100000000', min: 0, max: 50000000000 },
    { id: 'synergiesRevenue', name: 'Annual Revenue Synergies', type: 'number', unit: 'USD', required: true, description: 'Expected annual revenue synergies', placeholder: '75000000', min: 0, max: 10000000000 },
    { id: 'synergiesCost', name: 'Annual Cost Synergies', type: 'number', unit: 'USD', required: true, description: 'Expected annual cost synergies', placeholder: '125000000', min: 0, max: 10000000000 },
    { id: 'synergyRampPeriod', name: 'Synergy Ramp Period', type: 'number', unit: 'years', required: true, description: 'Years to fully realize synergies', placeholder: '3', min: 1, max: 10 },
    
    // Financing Terms
    { id: 'debtInterestRate', name: 'Debt Interest Rate', type: 'number', unit: '%', required: true, description: 'Interest rate on new debt financing', placeholder: '5.5', min: 0, max: 25 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: true, description: 'Combined corporate tax rate', placeholder: '25', min: 0, max: 50 },
    
    // Analysis Parameters
    { id: 'analysisYears', name: 'Analysis Period', type: 'number', unit: 'years', required: true, description: 'Number of years for analysis', placeholder: '5', min: 3, max: 10 },
    { id: 'discountRate', name: 'Discount Rate', type: 'number', unit: '%', required: true, description: 'Discount rate for NPV calculations', placeholder: '10', min: 5, max: 20 },
    { id: 'terminalGrowthRate', name: 'Terminal Growth Rate', type: 'number', unit: '%', required: true, description: 'Long-term growth rate assumption', placeholder: '3', min: 0, max: 10 },
    
    // Premium Analysis
    { id: 'controlPremium', name: 'Control Premium', type: 'number', unit: '%', required: true, description: 'Control premium over market price', placeholder: '25', min: 0, max: 100 },
    { id: 'marketMultiple', name: 'Market EV/EBITDA Multiple', type: 'number', unit: 'x', required: true, description: 'Industry EV/EBITDA multiple', placeholder: '12', min: 1, max: 50 },
    
    // Integration Assumptions
    { id: 'revenueAttrition', name: 'Revenue Attrition', type: 'number', unit: '%', required: false, description: 'Expected revenue loss during integration', placeholder: '5', min: 0, max: 50 },
    { id: 'costInflation', name: 'Cost Inflation', type: 'number', unit: '%', required: false, description: 'Annual cost inflation rate', placeholder: '3', min: 0, max: 15 },
    
    // Deal Type and Method
    { id: 'dealType', name: 'Deal Type', type: 'select', required: true, description: 'Type of M&A transaction', placeholder: 'Select deal type', options: ['merger', 'acquisition', 'tender-offer', 'management-buyout'] },
    { id: 'paymentMethod', name: 'Payment Method', type: 'select', required: true, description: 'Primary payment method', placeholder: 'Select payment method', options: ['cash', 'stock', 'mixed'] },
    
    // Industry and Risk Factors
    { id: 'industryGrowthRate', name: 'Industry Growth Rate', type: 'number', unit: '%', required: false, description: 'Expected industry growth rate', placeholder: '5', min: -10, max: 25 },
    { id: 'executionRisk', name: 'Execution Risk', type: 'number', unit: '%', required: false, description: 'Probability of successful integration (0-100)', placeholder: '85', min: 0, max: 100 },
    
    // Advanced Parameters
    { id: 'sensitivityRange', name: 'Sensitivity Range', type: 'number', unit: '%', required: false, description: 'Range for sensitivity analysis (+/-)', placeholder: '20', min: 5, max: 50 },
    { id: 'regulatoryApprovalTime', name: 'Regulatory Approval Time', type: 'number', unit: 'months', required: false, description: 'Expected time for regulatory approvals', placeholder: '12', min: 1, max: 36 },
    { id: 'breakupFee', name: 'Breakup Fee', type: 'number', unit: 'USD', required: false, description: 'Breakup fee if deal fails', placeholder: '100000000', min: 0, max: 10000000000 }
  ],

  outputs: [
    // Pre-Transaction Metrics
    { id: 'targetEnterpriseValue', name: 'Target Enterprise Value', type: 'number', unit: 'USD', description: 'Target company enterprise value' },
    { id: 'acquirerEnterpriseValue', name: 'Acquirer Enterprise Value', type: 'number', unit: 'USD', description: 'Acquiring company enterprise value' },
    { id: 'targetEVEBITDA', name: 'Target EV/EBITDA', type: 'number', unit: 'x', description: 'Target company EV/EBITDA multiple' },
    { id: 'acquirerEVEBITDA', name: 'Acquirer EV/EBITDA', type: 'number', unit: 'x', description: 'Acquiring company EV/EBITDA multiple' },
    
    // Transaction Metrics
    { id: 'totalTransactionValue', name: 'Total Transaction Value', type: 'number', unit: 'USD', description: 'Total value of the transaction' },
    { id: 'premiumPaid', name: 'Premium Paid', type: 'number', unit: 'USD', description: 'Premium paid over market value' },
    { id: 'premiumPercentage', name: 'Premium Percentage', type: 'number', unit: '%', description: 'Premium as percentage of market value' },
    { id: 'exchangeRatio', name: 'Exchange Ratio', type: 'number', unit: 'ratio', description: 'Exchange ratio for stock portion' },
    { id: 'newSharesIssued', name: 'New Shares Issued', type: 'number', unit: 'shares', description: 'New shares issued by acquirer' },
    
    // Pro Forma Metrics
    { id: 'proFormaRevenue', name: 'Pro Forma Revenue', type: 'number', unit: 'USD', description: 'Combined company revenue' },
    { id: 'proFormaEBITDA', name: 'Pro Forma EBITDA', type: 'number', unit: 'USD', description: 'Combined company EBITDA' },
    { id: 'proFormaNetIncome', name: 'Pro Forma Net Income', type: 'number', unit: 'USD', description: 'Combined company net income' },
    { id: 'proFormaEPS', name: 'Pro Forma EPS', type: 'number', unit: 'USD', description: 'Combined company earnings per share' },
    
    // Accretion/Dilution Analysis
    { id: 'epsAccretionDilution', name: 'EPS Accretion/Dilution', type: 'number', unit: '%', description: 'Percentage change in EPS from transaction' },
    { id: 'epsBreakevenPrice', name: 'EPS Breakeven Price', type: 'number', unit: 'USD', description: 'Target price where EPS impact is neutral' },
    
    // Synergy Analysis
    { id: 'totalSynergies', name: 'Total Annual Synergies', type: 'number', unit: 'USD', description: 'Total annual synergies at full realization' },
    { id: 'netPresentValueSynergies', name: 'NPV of Synergies', type: 'number', unit: 'USD', description: 'Net present value of synergies' },
    { id: 'synergyMultiple', name: 'Synergy Multiple', type: 'number', unit: 'x', description: 'Synergies relative to premium paid' },
    
    // Returns Analysis
    { id: 'internalRateOfReturn', name: 'Internal Rate of Return', type: 'number', unit: '%', description: 'IRR of the transaction' },
    { id: 'returnOnInvestment', name: 'Return on Investment', type: 'number', unit: '%', description: 'ROI of the transaction' },
    { id: 'paybackPeriod', name: 'Payback Period', type: 'number', unit: 'years', description: 'Years to recover investment' },
    
    // Financing Impact
    { id: 'proFormaLeverage', name: 'Pro Forma Leverage', type: 'number', unit: 'x', description: 'Combined company debt/EBITDA ratio' },
    { id: 'interestCoverageRatio', name: 'Interest Coverage Ratio', type: 'number', unit: 'x', description: 'EBITDA/Interest expense ratio' },
    
    // Valuation Metrics
    { id: 'impliedEVEBITDA', name: 'Implied EV/EBITDA', type: 'number', unit: 'x', description: 'Implied valuation multiple paid' },
    { id: 'fairValueEstimate', name: 'Fair Value Estimate', type: 'number', unit: 'USD', description: 'Estimated fair value per share' },
    
    // Risk and Scenario Analysis
    { id: 'baseScenarioEPS', name: 'Base Case EPS Impact', type: 'number', unit: '%', description: 'EPS impact in base case scenario' },
    { id: 'optimisticScenarioEPS', name: 'Optimistic EPS Impact', type: 'number', unit: '%', description: 'EPS impact in optimistic scenario' },
    { id: 'pessimisticScenarioEPS', name: 'Pessimistic EPS Impact', type: 'number', unit: '%', description: 'EPS impact in pessimistic scenario' },
    
    // Integration Metrics
    { id: 'integrationComplexity', name: 'Integration Complexity Score', type: 'number', unit: 'score', description: 'Integration complexity rating (1-10)' },
    { id: 'recommendationRating', name: 'Recommendation', type: 'string', description: 'Investment recommendation rating' },
    
    // Comprehensive Analysis
    { id: 'accretionDilutionAnalysis', name: 'M&A Analysis Report', type: 'string', description: 'Comprehensive accretion/dilution analysis and recommendations' }
  ],

  calculate: (inputs) => {
    return calculateAccretionDilution(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAccretionDilutionAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Enterprise Value',
      formula: 'EV = Market Cap + Total Debt - Cash',
      description: 'Enterprise value calculation for both target and acquirer'
    },
    {
      name: 'Purchase Price Premium',
      formula: 'Premium = (Purchase Price - Market Value) / Market Value × 100',
      description: 'Premium paid over current market value'
    },
    {
      name: 'Exchange Ratio',
      formula: 'Exchange Ratio = (Purchase Price per Share) / (Acquirer Share Price)',
      description: 'Exchange ratio for stock-based transactions'
    },
    {
      name: 'Pro Forma EPS',
      formula: 'Pro Forma EPS = (Combined Net Income) / (Combined Shares Outstanding)',
      description: 'Earnings per share of combined entity'
    },
    {
      name: 'EPS Accretion/Dilution',
      formula: 'Accretion/Dilution = (Pro Forma EPS - Standalone EPS) / Standalone EPS × 100',
      description: 'Percentage change in EPS from the transaction'
    },
    {
      name: 'Synergy NPV',
      formula: 'NPV = Σ(Annual Synergies × Ramp Factor) / (1 + Discount Rate)^t',
      description: 'Net present value of expected synergies'
    },
    {
      name: 'Pro Forma Leverage',
      formula: 'Leverage = Total Debt / Pro Forma EBITDA',
      description: 'Combined entity DebtToEbitda ratio'
    },
    {
      name: 'Transaction IRR',
      formula: 'IRR where NPV of Cash Flows = 0',
      description: 'Internal rate of return of the M&A transaction'
    }
  ],

  examples: [
    {
      name: 'Technology Acquisition',
      description: 'Large tech company acquiring smaller competitor',
      inputs: {
        targetRevenue: 500000000,
        targetEBITDA: 100000000,
        targetNetIncome: 50000000,
        purchasePrice: 2750000000,
        cashPortion: 60,
        stockPortion: 40,
        synergiesRevenue: 75000000,
        synergiesCost: 125000000
      }
    },
    {
      name: 'Industrial Consolidation',
      description: 'Manufacturing company consolidation play',
      inputs: {
        targetRevenue: 800000000,
        targetEBITDA: 120000000,
        targetNetIncome: 60000000,
        purchasePrice: 1800000000,
        cashPortion: 80,
        stockPortion: 20,
        synergiesRevenue: 40000000,
        synergiesCost: 80000000
      }
    }
  ],

  tags: ['M&A', 'Investment Banking', 'Corporate Finance', 'Valuation', 'EPS Analysis', 'Synergies', 'Deal Modeling'],
  
  category_info: {
    name: 'M&A & Investment Analysis',
    description: 'Professional tools for mergers, acquisitions, and investment analysis'
  }
};
