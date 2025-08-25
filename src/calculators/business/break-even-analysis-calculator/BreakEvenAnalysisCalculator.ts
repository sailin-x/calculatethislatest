import { Calculator } from '../../../types/calculator';
import { breakEvenAnalysisCalculatorFormula } from './formulas';
import { BreakEvenAnalysisCalculatorInputs, BreakEvenAnalysisCalculatorResults } from './types';

/**
 * Break-Even Analysis Calculator
 * Comprehensive business analysis tool for determining break-even points and profitability
 */
export const breakEvenAnalysisCalculator: Calculator = {
  id: 'break-even-analysis-calculator',
  title: 'Break-Even Analysis Calculator',
  description: 'Advanced break-even analysis for business planning, including cost analysis, profitability assessment, market analysis, sensitivity testing, and risk evaluation with Monte Carlo simulation.',
  category: 'Business',
  subcategory: 'Financial Analysis',
  tags: ['break-even', 'profitability', 'cost analysis', 'business planning', 'financial modeling', 'risk analysis', 'sensitivity analysis', 'monte carlo'],
  
  inputs: {
    sellingPrice: {
      label: 'Selling Price per Unit',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'The price at which you sell each unit of your product or service',
      placeholder: '100.00',
      min: 0.01,
      max: 1000000,
      step: 0.01
    },
    expectedSalesVolume: {
      label: 'Expected Sales Volume',
      type: 'number',
      unit: 'units',
      required: true,
      description: 'The number of units you expect to sell in the analysis period',
      placeholder: '1000',
      min: 1,
      max: 10000000,
      step: 1
    },
    salesGrowthRate: {
      label: 'Sales Growth Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Expected annual growth rate in sales volume',
      placeholder: '10',
      min: -50,
      max: 500,
      step: 0.1,
      default: 0
    },
    fixedCosts: {
      label: 'Fixed Costs',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total fixed costs that do not vary with production volume',
      placeholder: '50000',
      min: 0,
      max: 10000000,
      step: 100
    },
    variableCostsPerUnit: {
      label: 'Variable Costs per Unit',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Cost per unit that varies with production volume',
      placeholder: '60.00',
      min: 0,
      max: 100000,
      step: 0.01
    },
    totalVariableCosts: {
      label: 'Total Variable Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Total variable costs for the expected sales volume',
      placeholder: '60000',
      min: 0,
      max: 100000000,
      step: 100,
      default: 0
    },
    directLaborCosts: {
      label: 'Direct Labor Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Direct labor costs for production',
      placeholder: '20000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 0
    },
    directMaterialCosts: {
      label: 'Direct Material Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Direct material costs for production',
      placeholder: '25000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 0
    },
    overheadCosts: {
      label: 'Overhead Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Manufacturing overhead costs',
      placeholder: '15000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 0
    },
    marketingCosts: {
      label: 'Marketing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Marketing and advertising expenses',
      placeholder: '10000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 0
    },
    administrativeCosts: {
      label: 'Administrative Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Administrative and office expenses',
      placeholder: '8000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 0
    },
    productionCapacity: {
      label: 'Production Capacity',
      type: 'number',
      unit: 'units',
      required: false,
      description: 'Maximum production capacity per period',
      placeholder: '1500',
      min: 1,
      max: 10000000,
      step: 1,
      default: 1000
    },
    capacityUtilization: {
      label: 'Capacity Utilization',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Current capacity utilization percentage',
      placeholder: '80',
      min: 0,
      max: 100,
      step: 1,
      default: 80
    },
    unitsProduced: {
      label: 'Units Produced',
      type: 'number',
      unit: 'units',
      required: false,
      description: 'Actual units produced in the period',
      placeholder: '1000',
      min: 0,
      max: 10000000,
      step: 1,
      default: 1000
    },
    marketSize: {
      label: 'Market Size',
      type: 'number',
      unit: 'units',
      required: false,
      description: 'Total market size in units',
      placeholder: '10000',
      min: 1,
      max: 1000000000,
      step: 1,
      default: 10000
    },
    marketShare: {
      label: 'Market Share',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Your current market share percentage',
      placeholder: '10',
      min: 0,
      max: 100,
      step: 0.1,
      default: 10
    },
    competitorPricing: {
      label: 'Competitor Pricing',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Average competitor selling price',
      placeholder: '95.00',
      min: 0.01,
      max: 1000000,
      step: 0.01,
      default: 95
    },
    priceElasticity: {
      label: 'Price Elasticity',
      type: 'number',
      unit: '',
      required: false,
      description: 'Price elasticity of demand (negative value)',
      placeholder: '-2.0',
      min: -10,
      max: 10,
      step: 0.1,
      default: -2
    },
    targetProfit: {
      label: 'Target Profit',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Desired profit target',
      placeholder: '20000',
      min: 0,
      max: 10000000,
      step: 100,
      default: 20000
    },
    taxRate: {
      label: 'Tax Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Effective tax rate on profits',
      placeholder: '25',
      min: 0,
      max: 100,
      step: 0.1,
      default: 25
    },
    discountRate: {
      label: 'Discount Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Discount rate for time value of money',
      placeholder: '10',
      min: 0,
      max: 100,
      step: 0.1,
      default: 10
    },
    analysisPeriod: {
      label: 'Analysis Period',
      type: 'number',
      unit: 'months',
      required: false,
      description: 'Time period for analysis in months',
      placeholder: '12',
      min: 1,
      max: 120,
      step: 1,
      default: 12
    },
    seasonalityFactor: {
      label: 'Seasonality Factor',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Seasonal variation factor',
      placeholder: '15',
      min: -50,
      max: 50,
      step: 1,
      default: 15
    },
    includeSensitivityAnalysis: {
      label: 'Include Sensitivity Analysis',
      type: 'boolean',
      required: false,
      description: 'Perform sensitivity analysis on key variables',
      default: true
    },
    priceSensitivityRange: {
      label: 'Price Sensitivity Range',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Range for price sensitivity analysis',
      placeholder: '10',
      min: 0,
      max: 50,
      step: 1,
      default: 10
    },
    costSensitivityRange: {
      label: 'Cost Sensitivity Range',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Range for cost sensitivity analysis',
      placeholder: '10',
      min: 0,
      max: 50,
      step: 1,
      default: 10
    },
    volumeSensitivityRange: {
      label: 'Volume Sensitivity Range',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Range for volume sensitivity analysis',
      placeholder: '10',
      min: 0,
      max: 50,
      step: 1,
      default: 10
    },
    includeScenarioAnalysis: {
      label: 'Include Scenario Analysis',
      type: 'boolean',
      required: false,
      description: 'Perform optimistic and pessimistic scenario analysis',
      default: true
    },
    optimisticScenario: {
      label: 'Optimistic Scenario',
      type: 'object',
      required: false,
      description: 'Optimistic scenario parameters',
      default: {
        salesVolume: 1200,
        sellingPrice: 110,
        variableCosts: 55
      }
    },
    pessimisticScenario: {
      label: 'Pessimistic Scenario',
      type: 'object',
      required: false,
      description: 'Pessimistic scenario parameters',
      default: {
        salesVolume: 800,
        sellingPrice: 90,
        variableCosts: 65
      }
    },
    monteCarloSamples: {
      label: 'Monte Carlo Samples',
      type: 'number',
      unit: '',
      required: false,
      description: 'Number of Monte Carlo simulation samples',
      placeholder: '10000',
      min: 1000,
      max: 100000,
      step: 1000,
      default: 10000
    },
    confidenceLevel: {
      label: 'Confidence Level',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Confidence level for statistical analysis',
      placeholder: '95',
      min: 80,
      max: 99.9,
      step: 0.1,
      default: 95
    }
  },
  
  outputs: {
    basicAnalysis: {
      label: 'Basic Break-Even Analysis',
      type: 'object',
      description: 'Core break-even calculations including break-even point, safety margin, and contribution margin'
    },
    costAnalysis: {
      label: 'Cost Analysis',
      type: 'object',
      description: 'Detailed cost breakdown and structure analysis'
    },
    revenueAnalysis: {
      label: 'Revenue Analysis',
      type: 'object',
      description: 'Revenue projections and price-volume analysis'
    },
    profitabilityAnalysis: {
      label: 'Profitability Analysis',
      type: 'object',
      description: 'Profit calculations, margins, and target profit analysis'
    },
    productionAnalysis: {
      label: 'Production Analysis',
      type: 'object',
      description: 'Production efficiency and capacity utilization analysis'
    },
    marketAnalysis: {
      label: 'Market Analysis',
      type: 'object',
      description: 'Market position, competitive analysis, and growth potential'
    },
    sensitivityAnalysis: {
      label: 'Sensitivity Analysis',
      type: 'object',
      description: 'Impact of changes in price, cost, and volume on profitability'
    },
    scenarioAnalysis: {
      label: 'Scenario Analysis',
      type: 'object',
      description: 'Optimistic, base case, and pessimistic scenario outcomes'
    },
    timeAnalysis: {
      label: 'Time Analysis',
      type: 'object',
      description: 'Time to break-even, payback periods, and seasonal variations'
    },
    riskAnalysis: {
      label: 'Risk Analysis',
      type: 'object',
      description: 'Risk assessment, probability analysis, and key risk factors'
    },
    recommendations: {
      label: 'Strategic Recommendations',
      type: 'object',
      description: 'Actionable recommendations for pricing, cost optimization, and growth strategies'
    },
    summary: {
      label: 'Executive Summary',
      type: 'object',
      description: 'Key insights, metrics, and action items for decision making'
    },
    monteCarloResults: {
      label: 'Monte Carlo Simulation Results',
      type: 'object',
      description: 'Statistical analysis of profit distribution and risk assessment'
    }
  },
  
  calculate: breakEvenAnalysisCalculatorFormula.calculate,
  
  examples: [
    {
      name: 'Small Business Product Launch',
      description: 'A small business launching a new product with $100 selling price and $60 variable costs',
      inputs: {
        sellingPrice: 100,
        expectedSalesVolume: 1000,
        fixedCosts: 50000,
        variableCostsPerUnit: 60,
        targetProfit: 20000,
        taxRate: 25,
        marketSize: 10000,
        competitorPricing: 95,
        includeSensitivityAnalysis: true,
        includeScenarioAnalysis: true
      }
    },
    {
      name: 'Service Business Analysis',
      description: 'A consulting service with high fixed costs and low variable costs',
      inputs: {
        sellingPrice: 200,
        expectedSalesVolume: 500,
        fixedCosts: 100000,
        variableCostsPerUnit: 20,
        targetProfit: 50000,
        taxRate: 30,
        marketSize: 5000,
        competitorPricing: 180,
        includeSensitivityAnalysis: true,
        includeScenarioAnalysis: true
      }
    },
    {
      name: 'Manufacturing Company',
      description: 'A manufacturing company with complex cost structure and production constraints',
      inputs: {
        sellingPrice: 150,
        expectedSalesVolume: 2000,
        fixedCosts: 200000,
        variableCostsPerUnit: 80,
        directLaborCosts: 60000,
        directMaterialCosts: 80000,
        overheadCosts: 40000,
        marketingCosts: 20000,
        productionCapacity: 2500,
        capacityUtilization: 80,
        targetProfit: 100000,
        taxRate: 25,
        marketSize: 20000,
        competitorPricing: 140,
        includeSensitivityAnalysis: true,
        includeScenarioAnalysis: true
      }
    }
  ],
  
  usageInstructions: [
    'Enter your selling price per unit and expected sales volume',
    'Input your fixed costs (rent, salaries, utilities, etc.)',
    'Specify variable costs per unit (materials, direct labor, etc.)',
    'Add optional cost breakdowns for detailed analysis',
    'Include market information for competitive analysis',
    'Set target profit and tax rates for profitability analysis',
    'Enable sensitivity and scenario analysis for comprehensive evaluation',
    'Review the comprehensive results including risk assessment and recommendations'
  ],
  
  tips: [
    'Ensure variable costs per unit are less than selling price for profitability',
    'Include all relevant fixed costs for accurate break-even calculation',
    'Use sensitivity analysis to understand impact of price and cost changes',
    'Consider seasonal variations in your sales projections',
    'Review market position and competitive pricing for strategic insights',
    'Use Monte Carlo simulation for risk assessment and uncertainty analysis',
    'Focus on recommendations for actionable business improvements',
    'Regularly update analysis as market conditions and costs change'
  ],
  
  relatedCalculators: [
    'profit-margin-calculator',
    'cost-volume-profit-calculator',
    'business-valuation-calculator',
    'roi-calculator',
    'payback-period-calculator',
    'net-present-value-calculator',
    'internal-rate-of-return-calculator',
    'cash-flow-calculator'
  ]
};
