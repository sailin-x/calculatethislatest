import { Calculator } from '../../types/calculator';
import { calculateAngelInvestment, generateAngelInvestmentAnalysis } from './formulas';
import { validateAngelInvestmentInputs } from './validation';

export const AngelInvestmentCalculator: Calculator = {
  id: 'AngelInvestmentCalculator',
  name: 'Angel Investment Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Professional angel investment analysis tool for comprehensive startup evaluation, due diligence, and investment decision-making with market analysis and risk assessment.',
  
  longDescription: `
    The Angel Investment Calculator is a comprehensive startup investment analysis tool designed for angel investors to evaluate early-stage companies, conduct thorough due diligence, and make informed investment decisions. This professional calculator provides detailed analysis of market opportunities, team capabilities, financial projections, and risk factors.

    **Key Features:**
    • **Comprehensive Due Diligence**: Financial, legal, technical, and market analysis
    • **Market Analysis**: TAM/SAM/SOM analysis with competitive positioning
    • **Team Assessment**: Founder experience, team capabilities, and execution track record
    • **Financial Modeling**: Revenue projections, burn rate analysis, and valuation modeling
    • **Risk Assessment**: Multi-factor risk analysis with mitigation strategies
    • **Exit Scenario Modeling**: Multiple exit scenarios with probability-weighted returns
    • **Sensitivity Analysis**: Impact of key variables on investment returns
    • **Portfolio Considerations**: Diversification impact and strategic fit analysis
    • **Investment Thesis Validation**: Systematic evaluation of investment rationale
    • **Performance Benchmarking**: Industry comparisons and performance metrics

    **Use Cases:**
    • Angel investment due diligence and analysis
    • Startup evaluation and screening
    • Investment committee presentations
    • Portfolio management and diversification
    • Risk assessment and mitigation planning
    • Exit strategy development and planning
    • Investment thesis development and validation
    • Market opportunity assessment
  `,

  inputs: [
    // Investment Details
    { id: 'investmentAmount', name: 'Investment Amount', type: 'number', unit: 'USD', required: true, description: 'Amount being invested', placeholder: '100000', min: 1000, max: 10000000 },
    { id: 'investmentType', name: 'Investment Type', type: 'select', required: true, description: 'Type of investment instrument', placeholder: 'Select investment type', options: ['equity', 'convertible_note', 'safe', 'preferred_stock', 'debt'] },
    { id: 'investmentStage', name: 'Investment Stage', type: 'select', required: true, description: 'Stage of investment', placeholder: 'Select stage', options: ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth'] },
    
    // Company Information
    { id: 'companyName', name: 'Company Name', type: 'text', required: true, description: 'Name of the startup company', placeholder: 'TechStartup Inc.', maxLength: 100 },
    { id: 'industry', name: 'Industry', type: 'text', required: true, description: 'Primary industry', placeholder: 'Technology', maxLength: 50 },
    { id: 'sector', name: 'Sector', type: 'text', required: true, description: 'Business sector', placeholder: 'SaaS', maxLength: 50 },
    { id: 'companyStage', name: 'Company Stage', type: 'select', required: true, description: 'Current stage of company development', placeholder: 'Select stage', options: ['idea', 'mvp', 'early_traction', 'product_market_fit', 'scaling', 'mature'] },
    { id: 'foundingYear', name: 'Founding Year', type: 'number', required: true, description: 'Year company was founded', placeholder: '2020', min: 1990, max: 2030 },
    { id: 'teamSize', name: 'Team Size', type: 'number', required: true, description: 'Number of employees', placeholder: '10', min: 1, max: 1000 },
    
    // Financial Metrics
    { id: 'currentRevenue', name: 'Current Revenue', type: 'number', unit: 'USD', required: true, description: 'Annual recurring revenue', placeholder: '500000', min: 0, max: 100000000 },
    { id: 'revenueGrowthRate', name: 'Revenue Growth Rate', type: 'number', unit: '%', required: true, description: 'Monthly revenue growth rate', placeholder: '15', min: -50, max: 200 },
    { id: 'burnRate', name: 'Burn Rate', type: 'number', unit: 'USD/month', required: true, description: 'Monthly burn rate', placeholder: '50000', min: 0, max: 10000000 },
    { id: 'runway', name: 'Runway', type: 'number', unit: 'months', required: true, description: 'Months of runway remaining', placeholder: '12', min: 0, max: 60 },
    { id: 'customerCount', name: 'Customer Count', type: 'number', required: true, description: 'Number of customers', placeholder: '1000', min: 0, max: 1000000 },
    { id: 'averageRevenuePerUser', name: 'Average Revenue Per User', type: 'number', unit: 'USD', required: true, description: 'ARPU', placeholder: '50', min: 0, max: 10000 },
    
    // Valuation Information
    { id: 'preMoneyValuation', name: 'Pre-Money Valuation', type: 'number', unit: 'USD', required: true, description: 'Company valuation before investment', placeholder: '2000000', min: 100000, max: 1000000000 },
    { id: 'postMoneyValuation', name: 'Post-Money Valuation', type: 'number', unit: 'USD', required: false, description: 'Company valuation after investment', placeholder: '2100000', min: 100000, max: 1000000000 },
    { id: 'valuationMethod', name: 'Valuation Method', type: 'select', required: true, description: 'Method used for valuation', placeholder: 'Select method', options: ['revenue_multiple', 'comparable_companies', 'discounted_cash_flow', 'asset_based', 'market_size'] },
    { id: 'revenueMultiple', name: 'Revenue Multiple', type: 'number', unit: 'x', required: false, description: 'Revenue multiple used for valuation', placeholder: '10', min: 1, max: 100 },
    
    // Investment Terms
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', required: false, description: 'Percentage of equity received', placeholder: '5', min: 0, max: 100 },
    { id: 'boardSeat', name: 'Board Seat', type: 'boolean', required: false, description: 'Whether board seat is included', placeholder: 'false' },
    { id: 'votingRights', name: 'Voting Rights', type: 'boolean', required: false, description: 'Whether voting rights are included', placeholder: 'true' },
    { id: 'informationRights', name: 'Information Rights', type: 'boolean', required: false, description: 'Whether information rights are included', placeholder: 'true' },
    
    // Market Analysis
    { id: 'totalAddressableMarket', name: 'Total Addressable Market', type: 'number', unit: 'USD', required: true, description: 'TAM size', placeholder: '10000000000', min: 1000000, max: 1000000000000 },
    { id: 'serviceableAddressableMarket', name: 'Serviceable Addressable Market', type: 'number', unit: 'USD', required: true, description: 'SAM size', placeholder: '1000000000', min: 100000, max: 100000000000 },
    { id: 'serviceableObtainableMarket', name: 'Serviceable Obtainable Market', type: 'number', unit: 'USD', required: true, description: 'SOM size', placeholder: '100000000', min: 10000, max: 10000000000 },
    { id: 'marketGrowthRate', name: 'Market Growth Rate', type: 'number', unit: '%', required: true, description: 'Annual market growth rate', placeholder: '8', min: -20, max: 50 },
    
    // Team Assessment
    { id: 'founderExperience', name: 'Founder Experience', type: 'number', unit: 'years', required: true, description: 'Years of relevant founder experience', placeholder: '8', min: 0, max: 50 },
    { id: 'technicalTeam', name: 'Technical Team', type: 'boolean', required: true, description: 'Whether technical team is in place', placeholder: 'true' },
    { id: 'salesTeam', name: 'Sales Team', type: 'boolean', required: false, description: 'Whether sales team is in place', placeholder: 'false' },
    { id: 'marketingTeam', name: 'Marketing Team', type: 'boolean', required: false, description: 'Whether marketing team is in place', placeholder: 'false' },
    { id: 'advisoryBoard', name: 'Advisory Board', type: 'boolean', required: false, description: 'Whether advisory board is in place', placeholder: 'true' },
    
    // Product/Service
    { id: 'productType', name: 'Product Type', type: 'select', required: true, description: 'Type of product or service', placeholder: 'Select type', options: ['saas', 'marketplace', 'ecommerce', 'mobile_app', 'hardware', 'biotech', 'fintech', 'other'] },
    { id: 'productStage', name: 'Product Stage', type: 'select', required: true, description: 'Current stage of product development', placeholder: 'Select stage', options: ['concept', 'development', 'beta', 'launched', 'scaling', 'mature'] },
    { id: 'intellectualProperty', name: 'Intellectual Property', type: 'boolean', required: false, description: 'Whether company has IP protection', placeholder: 'true' },
    { id: 'patents', name: 'Patents', type: 'number', required: false, description: 'Number of patents', placeholder: '2', min: 0, max: 1000 },
    { id: 'trademarks', name: 'Trademarks', type: 'number', required: false, description: 'Number of trademarks', placeholder: '1', min: 0, max: 100 },
    
    // Traction Metrics
    { id: 'customerAcquisitionCost', name: 'Customer Acquisition Cost', type: 'number', unit: 'USD', required: true, description: 'CAC', placeholder: '100', min: 0, max: 10000 },
    { id: 'customerLifetimeValue', name: 'Customer Lifetime Value', type: 'number', unit: 'USD', required: true, description: 'LTV', placeholder: '500', min: 0, max: 100000 },
    { id: 'churnRate', name: 'Churn Rate', type: 'number', unit: '%', required: true, description: 'Monthly churn rate', placeholder: '5', min: 0, max: 50 },
    
    // Risk Assessment
    { id: 'marketConditions', name: 'Market Conditions', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select conditions', options: ['bull', 'bear', 'neutral'] },
    { id: 'sectorTrends', name: 'Sector Trends', type: 'select', required: false, description: 'Sector growth trends', placeholder: 'Select trends', options: ['growing', 'stable', 'declining'] },
    { id: 'regulatoryEnvironment', name: 'Regulatory Environment', type: 'select', required: false, description: 'Regulatory environment', placeholder: 'Select environment', options: ['favorable', 'neutral', 'unfavorable'] },
    
    // Investment Thesis
    { id: 'investmentThesis', name: 'Investment Thesis', type: 'text', required: true, description: 'Investment thesis and rationale', placeholder: 'Strong team, large market opportunity, proven traction', maxLength: 500 },
    { id: 'expectedReturn', name: 'Expected Return', type: 'number', unit: '%', required: true, description: 'Expected IRR', placeholder: '25', min: 5, max: 100 },
    { id: 'expectedTimeline', name: 'Expected Timeline', type: 'number', unit: 'years', required: true, description: 'Years to exit', placeholder: '5', min: 1, max: 20 },
    
    // Due Diligence
    { id: 'financialDueDiligence', name: 'Financial Due Diligence', type: 'boolean', required: false, description: 'Whether financial DD is complete', placeholder: 'false' },
    { id: 'legalDueDiligence', name: 'Legal Due Diligence', type: 'boolean', required: false, description: 'Whether legal DD is complete', placeholder: 'false' },
    { id: 'technicalDueDiligence', name: 'Technical Due Diligence', type: 'boolean', required: false, description: 'Whether technical DD is complete', placeholder: 'false' },
    { id: 'marketDueDiligence', name: 'Market Due Diligence', type: 'boolean', required: false, description: 'Whether market DD is complete', placeholder: 'false' },
    
    // Portfolio Considerations
    { id: 'portfolioFit', name: 'Portfolio Fit', type: 'select', required: false, description: 'How investment fits portfolio', placeholder: 'Select fit', options: ['strategic', 'financial', 'both'] },
    { id: 'sectorDiversification', name: 'Sector Diversification', type: 'boolean', required: false, description: 'Whether investment provides sector diversification', placeholder: 'true' },
    { id: 'stageDiversification', name: 'Stage Diversification', type: 'boolean', required: false, description: 'Whether investment provides stage diversification', placeholder: 'true' },
    
    // Analysis Parameters
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: true, description: 'Number of years to analyze', placeholder: '5', min: 1, max: 20 },
    { id: 'discountRate', name: 'Required Rate of Return', type: 'number', unit: '%', required: true, description: 'Required rate of return for analysis', placeholder: '25.0', min: 5, max: 100 },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'boolean', required: false, description: 'Include sensitivity analysis', placeholder: 'true' },
    { id: 'monteCarloSimulation', name: 'Monte Carlo Simulation', type: 'boolean', required: false, description: 'Include Monte Carlo simulation', placeholder: 'false' },
    
    // Reporting Preferences
    { id: 'currency', name: 'Currency', type: 'select', required: false, description: 'Display currency', placeholder: 'Select currency', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] },
    { id: 'displayFormat', name: 'Display Format', type: 'select', required: false, description: 'Number display format', placeholder: 'Select format', options: ['percentage', 'decimal', 'basis-points'] },
    { id: 'includeCharts', name: 'Include Charts', type: 'boolean', required: false, description: 'Include visual charts in analysis', placeholder: 'true' }
  ],

  outputs: [
    // Investment Analysis
    { id: 'investmentAmount', name: 'Investment Amount', type: 'number', unit: 'USD', description: 'Amount being invested' },
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', description: 'Percentage of equity received' },
    { id: 'effectivePricePerShare', name: 'Effective Price Per Share', type: 'number', unit: 'USD', description: 'Effective price per share' },
    
    // Valuation Analysis
    { id: 'preMoneyValuation', name: 'Pre-Money Valuation', type: 'number', unit: 'USD', description: 'Company valuation before investment' },
    { id: 'postMoneyValuation', name: 'Post-Money Valuation', type: 'number', unit: 'USD', description: 'Company valuation after investment' },
    { id: 'valuationMultiple', name: 'Valuation Multiple', type: 'number', unit: 'x', description: 'Valuation multiple' },
    
    // Financial Metrics
    { id: 'revenueMultiple', name: 'Revenue Multiple', type: 'number', unit: 'x', description: 'Revenue multiple' },
    { id: 'ltvToCacRatio', name: 'LTV to CAC Ratio', type: 'number', unit: 'ratio', description: 'Customer lifetime value to acquisition cost ratio' },
    { id: 'runway', name: 'Runway', type: 'number', unit: 'months', description: 'Months of runway remaining' },
    
    // Market Analysis
    { id: 'marketPenetration', name: 'Market Penetration', type: 'number', unit: '%', description: 'Percentage of SAM captured' },
    { id: 'competitivePosition', name: 'Competitive Position', type: 'number', unit: 'score', description: 'Competitive position score (1-10)' },
    
    // Risk Metrics
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Overall risk score (1-10)' },
    { id: 'probabilityOfSuccess', name: 'Probability of Success', type: 'number', unit: '%', description: 'Probability of successful exit' },
    
    // Return Analysis
    { id: 'expectedIRR', name: 'Expected IRR', type: 'number', unit: '%', description: 'Expected internal rate of return' },
    { id: 'expectedMOIC', name: 'Expected MOIC', type: 'number', unit: 'x', description: 'Expected multiple on invested capital' },
    { id: 'expectedReturn', name: 'Expected Return', type: 'number', unit: 'USD', description: 'Expected return on investment' },
    
    // Investment Rating
    { id: 'investmentRating', name: 'Investment Rating', type: 'string', description: 'Overall investment rating' },
    { id: 'riskRating', name: 'Risk Rating', type: 'string', description: 'Overall risk rating' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Investment recommendation' },
    
    // Comprehensive Analysis
    { id: 'angelInvestmentAnalysis', name: 'Angel Investment Analysis Report', type: 'string', description: 'Comprehensive investment analysis with recommendations' }
  ],

  calculate: (inputs) => {
    return calculateAngelInvestment(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateAngelInvestmentAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Post-Money Valuation',
      formula: 'Post-Money = Pre-Money + Investment Amount',
      description: 'Company valuation after investment'
    },
    {
      name: 'Equity Percentage',
      formula: 'Equity % = Investment Amount / Post-Money Valuation',
      description: 'Percentage of equity received'
    },
    {
      name: 'LTV to CAC Ratio',
      formula: 'LTV/CAC = Customer Lifetime Value / Customer Acquisition Cost',
      description: 'Customer value to acquisition cost ratio'
    },
    {
      name: 'Market Penetration',
      formula: 'Penetration = Current Revenue / Serviceable Addressable Market',
      description: 'Percentage of SAM captured'
    },
    {
      name: 'Runway',
      formula: 'Runway = Cash Balance / Monthly Burn Rate',
      description: 'Months of runway remaining'
    },
    {
      name: 'Expected IRR',
      formula: 'IRR = (Exit Value / Investment Amount)^(1/Years) - 1',
      description: 'Internal rate of return'
    },
    {
      name: 'Expected MOIC',
      formula: 'MOIC = Exit Value / Investment Amount',
      description: 'Multiple on invested capital'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Σ(Risk Factor × Weight)',
      description: 'Weighted risk assessment'
    },
    {
      name: 'Valuation Multiple',
      formula: 'Multiple = Post-Money Valuation / Annual Revenue',
      description: 'Revenue multiple'
    }
  ],

  examples: [
    {
      name: 'SaaS Startup Investment',
      description: 'Early-stage SaaS company with strong traction and experienced team',
      inputs: {
        investmentAmount: 100000,
        investmentType: 'equity',
        investmentStage: 'seed',
        companyName: 'CloudTech Solutions',
        industry: 'Technology',
        sector: 'SaaS',
        companyStage: 'early_traction',
        foundingYear: 2021,
        teamSize: 8,
        currentRevenue: 500000,
        revenueGrowthRate: 15,
        burnRate: 50000,
        runway: 12,
        customerCount: 1000,
        averageRevenuePerUser: 50,
        preMoneyValuation: 2000000,
        valuationMethod: 'revenue_multiple',
        revenueMultiple: 10,
        totalAddressableMarket: 10000000000,
        serviceableAddressableMarket: 1000000000,
        serviceableObtainableMarket: 100000000,
        marketGrowthRate: 8,
        founderExperience: 8,
        technicalTeam: true,
        productType: 'saas',
        productStage: 'launched',
        customerAcquisitionCost: 100,
        customerLifetimeValue: 500,
        churnRate: 5,
        investmentThesis: 'Strong team, large market opportunity, proven traction',
        expectedReturn: 25,
        expectedTimeline: 5,
        analysisPeriod: 5,
        discountRate: 25.0
      }
    },
    {
      name: 'Fintech Startup Investment',
      description: 'Fintech startup with regulatory compliance and strong market position',
      inputs: {
        investmentAmount: 250000,
        investmentType: 'convertible_note',
        investmentStage: 'series_a',
        companyName: 'PayFlow Inc.',
        industry: 'Financial Services',
        sector: 'Fintech',
        companyStage: 'product_market_fit',
        foundingYear: 2020,
        teamSize: 15,
        currentRevenue: 1200000,
        revenueGrowthRate: 20,
        burnRate: 80000,
        runway: 18,
        customerCount: 5000,
        averageRevenuePerUser: 25,
        preMoneyValuation: 8000000,
        valuationMethod: 'revenue_multiple',
        revenueMultiple: 8,
        totalAddressableMarket: 50000000000,
        serviceableAddressableMarket: 5000000000,
        serviceableObtainableMarket: 500000000,
        marketGrowthRate: 12,
        founderExperience: 12,
        technicalTeam: true,
        salesTeam: true,
        productType: 'fintech',
        productStage: 'scaling',
        customerAcquisitionCost: 150,
        customerLifetimeValue: 800,
        churnRate: 3,
        investmentThesis: 'Experienced team, regulatory compliance, strong market position',
        expectedReturn: 30,
        expectedTimeline: 4,
        analysisPeriod: 5,
        discountRate: 25.0
      }
    }
  ],

  tags: ['Angel Investment', 'Startup Investment', 'Due Diligence', 'Venture Capital', 'Investment Analysis', 'Risk Assessment', 'Market Analysis', 'Financial Modeling'],
  
  category_info: {
    name: 'Angel Investment',
    description: 'Professional tools for angel investment analysis, due diligence, and portfolio management'
  }
};
