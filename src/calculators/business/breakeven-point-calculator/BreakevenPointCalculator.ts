import { Calculator } from '../../../types/calculator';
import { breakevenPointCalculatorFormula } from './formulas';
import { BreakevenPointCalculatorInputs, BreakevenPointCalculatorResults } from './types';
import * as quickValidation from './quickValidation';

export const breakevenPointCalculator: Calculator = {
  id: 'breakeven-point-calculator',
  title: 'Breakeven Point Calculator',
  description: 'Comprehensive breakeven analysis with sensitivity analysis, scenario planning, and risk assessment for business decision making',
  category: 'Business Operations & Finance Hub',
  subcategory: 'Financial Analysis',
  tags: ['breakeven', 'profitability', 'cost analysis', 'business planning', 'financial modeling'],
  
  inputs: {
    productName: {
      type: 'string',
      label: 'Product Name',
      description: 'Name of the product or service being analyzed',
      required: true,
      validation: quickValidation.validateProductName
    },
    productDescription: {
      type: 'string',
      label: 'Product Description',
      description: 'Brief description of the product or service',
      required: true,
      validation: quickValidation.validateProductDescription
    },
    sellingPrice: {
      type: 'number',
      label: 'Selling Price per Unit',
      description: 'Price at which the product is sold to customers',
      required: true,
      unit: 'currency',
      validation: quickValidation.validateSellingPrice
    },
    variableCostPerUnit: {
      type: 'number',
      label: 'Variable Cost per Unit',
      description: 'Cost that varies directly with production volume',
      required: true,
      unit: 'currency',
      validation: quickValidation.validateVariableCostPerUnit
    },
    fixedCosts: {
      type: 'number',
      label: 'Total Fixed Costs',
      description: 'Costs that remain constant regardless of production volume',
      required: true,
      unit: 'currency',
      validation: quickValidation.validateFixedCosts
    },
    targetProfit: {
      type: 'number',
      label: 'Target Profit',
      description: 'Desired profit level for the analysis',
      required: false,
      default: 0,
      unit: 'currency',
      validation: quickValidation.validateTargetProfit
    },
    costStructure: {
      type: 'object',
      label: 'Cost Structure Breakdown',
      description: 'Detailed breakdown of all costs',
      required: true,
      validation: quickValidation.validateCostStructure,
      properties: {
        directMaterials: {
          type: 'number',
          label: 'Direct Materials Cost per Unit',
          description: 'Cost of raw materials per unit',
          unit: 'currency'
        },
        directLabor: {
          type: 'number',
          label: 'Direct Labor Cost per Unit',
          description: 'Cost of direct labor per unit',
          unit: 'currency'
        },
        variableOverhead: {
          type: 'number',
          label: 'Variable Overhead per Unit',
          description: 'Variable overhead costs per unit',
          unit: 'currency'
        },
        fixedOverhead: {
          type: 'number',
          label: 'Fixed Overhead',
          description: 'Fixed overhead costs',
          unit: 'currency'
        },
        sellingExpenses: {
          type: 'number',
          label: 'Selling Expenses',
          description: 'Marketing and sales costs',
          unit: 'currency'
        },
        administrativeExpenses: {
          type: 'number',
          label: 'Administrative Expenses',
          description: 'General and administrative costs',
          unit: 'currency'
        },
        depreciation: {
          type: 'number',
          label: 'Depreciation',
          description: 'Depreciation expense',
          unit: 'currency'
        },
        interest: {
          type: 'number',
          label: 'Interest Expense',
          description: 'Interest on debt',
          unit: 'currency'
        },
        taxes: {
          type: 'number',
          label: 'Taxes',
          description: 'Tax expenses',
          unit: 'currency'
        }
      }
    },
    revenueAnalysis: {
      type: 'object',
      label: 'Revenue Analysis',
      description: 'Revenue projections and analysis',
      required: true,
      validation: quickValidation.validateRevenueAnalysis,
      properties: {
        expectedSalesVolume: {
          type: 'number',
          label: 'Expected Sales Volume',
          description: 'Expected number of units to be sold',
          unit: 'units'
        },
        growthRate: {
          type: 'number',
          label: 'Revenue Growth Rate',
          description: 'Expected annual revenue growth rate',
          unit: 'percentage'
        }
      }
    },
    productionAnalysis: {
      type: 'object',
      label: 'Production Analysis',
      description: 'Production capacity and efficiency analysis',
      required: true,
      validation: quickValidation.validateProductionAnalysis,
      properties: {
        productionCapacity: {
          type: 'number',
          label: 'Production Capacity',
          description: 'Maximum production capacity',
          unit: 'units'
        },
        utilizationRate: {
          type: 'number',
          label: 'Capacity Utilization Rate',
          description: 'Percentage of capacity being utilized',
          unit: 'percentage'
        },
        efficiencyRate: {
          type: 'number',
          label: 'Production Efficiency Rate',
          description: 'Production efficiency percentage',
          unit: 'percentage'
        }
      }
    },
    marketAnalysis: {
      type: 'object',
      label: 'Market Analysis',
      description: 'Market size and competitive analysis',
      required: true,
      validation: quickValidation.validateMarketAnalysis,
      properties: {
        marketSize: {
          type: 'number',
          label: 'Market Size',
          description: 'Total addressable market size',
          unit: 'currency'
        },
        marketShare: {
          type: 'number',
          label: 'Target Market Share',
          description: 'Target market share percentage',
          unit: 'percentage'
        },
        competitionLevel: {
          type: 'number',
          label: 'Competition Level',
          description: 'Level of competition (1-10 scale)',
          min: 1,
          max: 10
        }
      }
    },
    financialParameters: {
      type: 'object',
      label: 'Financial Parameters',
      description: 'Financial assumptions and parameters',
      required: true,
      validation: quickValidation.validateFinancialParameters,
      properties: {
        discountRate: {
          type: 'number',
          label: 'Discount Rate',
          description: 'Discount rate for present value calculations',
          unit: 'percentage'
        },
        taxRate: {
          type: 'number',
          label: 'Tax Rate',
          description: 'Effective tax rate',
          unit: 'percentage'
        },
        inflationRate: {
          type: 'number',
          label: 'Inflation Rate',
          description: 'Expected inflation rate',
          unit: 'percentage'
        },
        currency: {
          type: 'string',
          label: 'Currency',
          description: 'Currency for financial calculations',
          validation: quickValidation.validateCurrency
        }
      }
    },
    analysisOptions: {
      type: 'object',
      label: 'Analysis Options',
      description: 'Options for different types of analysis',
      required: true,
      validation: quickValidation.validateAnalysisOptions,
      properties: {
        includeSensitivityAnalysis: {
          type: 'boolean',
          label: 'Include Sensitivity Analysis',
          description: 'Perform sensitivity analysis on key variables',
          default: true
        },
        includeScenarioAnalysis: {
          type: 'boolean',
          label: 'Include Scenario Analysis',
          description: 'Perform scenario analysis with different assumptions',
          default: true
        },
        includeRiskAssessment: {
          type: 'boolean',
          label: 'Include Risk Assessment',
          description: 'Assess business and financial risks',
          default: true
        },
        includeCashFlowAnalysis: {
          type: 'boolean',
          label: 'Include Cash Flow Analysis',
          description: 'Analyze cash flow implications',
          default: true
        },
        includeROIAnalysis: {
          type: 'boolean',
          label: 'Include ROI Analysis',
          description: 'Calculate return on investment metrics',
          default: true
        },
        includeMonteCarloSimulation: {
          type: 'boolean',
          label: 'Include Monte Carlo Simulation',
          description: 'Perform Monte Carlo simulation for risk analysis',
          default: false
        }
      }
    },
    simulationParameters: {
      type: 'object',
      label: 'Simulation Parameters',
      description: 'Parameters for Monte Carlo simulation and scenario analysis',
      required: true,
      validation: quickValidation.validateSimulationParameters,
      properties: {
        monteCarloSamples: {
          type: 'number',
          label: 'Monte Carlo Samples',
          description: 'Number of simulation samples',
          default: 10000,
          min: 1000,
          max: 100000
        },
        confidenceLevel: {
          type: 'number',
          label: 'Confidence Level',
          description: 'Confidence level for statistical analysis',
          default: 0.95,
          min: 0.8,
          max: 0.99
        },
        scenarios: {
          type: 'array',
          label: 'Analysis Scenarios',
          description: 'Different scenarios to analyze',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                label: 'Scenario Name',
                description: 'Name of the scenario'
              },
              probability: {
                type: 'number',
                label: 'Probability',
                description: 'Probability of this scenario occurring',
                min: 0,
                max: 1
              },
              sellingPriceVariation: {
                type: 'number',
                label: 'Selling Price Variation',
                description: 'Variation in selling price',
                unit: 'percentage'
              },
              costVariation: {
                type: 'number',
                label: 'Cost Variation',
                description: 'Variation in costs',
                unit: 'percentage'
              },
              volumeVariation: {
                type: 'number',
                label: 'Volume Variation',
                description: 'Variation in sales volume',
                unit: 'percentage'
              }
            }
          }
        }
      }
    }
  },
  
  outputs: {
    basicBreakeven: {
      type: 'object',
      label: 'Basic Breakeven Analysis',
      description: 'Core breakeven point calculations'
    },
    costAnalysis: {
      type: 'object',
      label: 'Cost Analysis',
      description: 'Detailed cost structure analysis'
    },
    revenueAnalysis: {
      type: 'object',
      label: 'Revenue Analysis',
      description: 'Revenue projections and efficiency metrics'
    },
    profitabilityAnalysis: {
      type: 'object',
      label: 'Profitability Analysis',
      description: 'Profit margins and profitability metrics'
    },
    sensitivityAnalysis: {
      type: 'object',
      label: 'Sensitivity Analysis',
      description: 'Impact of changes in key variables'
    },
    scenarioAnalysis: {
      type: 'object',
      label: 'Scenario Analysis',
      description: 'Analysis of different business scenarios'
    },
    riskAssessment: {
      type: 'object',
      label: 'Risk Assessment',
      description: 'Business and financial risk analysis'
    },
    cashFlowAnalysis: {
      type: 'object',
      label: 'Cash Flow Analysis',
      description: 'Cash flow projections and metrics'
    },
    roiAnalysis: {
      type: 'object',
      label: 'ROI Analysis',
      description: 'Return on investment calculations'
    },
    strategicInsights: {
      type: 'object',
      label: 'Strategic Insights',
      description: 'Key insights and recommendations'
    },
    monteCarloResults: {
      type: 'object',
      label: 'Monte Carlo Simulation Results',
      description: 'Statistical analysis results'
    },
    summary: {
      type: 'object',
      label: 'Executive Summary',
      description: 'Summary of key findings and recommendations'
    }
  },
  
  calculate: breakevenPointCalculatorFormula.calculate,
  
  examples: [
    {
      name: 'Software Product Launch',
      inputs: {
        productName: 'Cloud Management Platform',
        productDescription: 'Enterprise cloud infrastructure management solution',
        sellingPrice: 500,
        variableCostPerUnit: 50,
        fixedCosts: 500000,
        targetProfit: 100000,
        costStructure: {
          directMaterials: 20,
          directLabor: 15,
          variableOverhead: 15,
          fixedOverhead: 200000,
          sellingExpenses: 150000,
          administrativeExpenses: 100000,
          depreciation: 25000,
          interest: 15000,
          taxes: 10000
        },
        revenueAnalysis: {
          expectedSalesVolume: 2000,
          growthRate: 25
        },
        productionAnalysis: {
          productionCapacity: 3000,
          utilizationRate: 75,
          efficiencyRate: 85
        },
        marketAnalysis: {
          marketSize: 10000000,
          marketShare: 5,
          competitionLevel: 7
        },
        financialParameters: {
          discountRate: 12,
          taxRate: 25,
          inflationRate: 2.5,
          currency: 'USD'
        },
        analysisOptions: {
          includeSensitivityAnalysis: true,
          includeScenarioAnalysis: true,
          includeRiskAssessment: true,
          includeCashFlowAnalysis: true,
          includeROIAnalysis: true,
          includeMonteCarloSimulation: true
        },
        simulationParameters: {
          monteCarloSamples: 10000,
          confidenceLevel: 0.95,
          scenarios: [
            {
              name: 'Optimistic',
              probability: 0.3,
              sellingPriceVariation: 10,
              costVariation: -5,
              volumeVariation: 20
            },
            {
              name: 'Most Likely',
              probability: 0.5,
              sellingPriceVariation: 0,
              costVariation: 0,
              volumeVariation: 0
            },
            {
              name: 'Pessimistic',
              probability: 0.2,
              sellingPriceVariation: -10,
              costVariation: 10,
              volumeVariation: -20
            }
          ]
        }
      }
    }
  ],
  
  usageInstructions: [
    'Enter the basic product information including name and description',
    'Specify the selling price and variable cost per unit',
    'Input total fixed costs for the business',
    'Set optional target profit if desired',
    'Provide detailed cost structure breakdown',
    'Enter revenue projections and market analysis',
    'Configure analysis options based on your needs',
    'Set up simulation parameters for advanced analysis',
    'Review the comprehensive results and insights'
  ],
  
  tips: [
    'Ensure variable costs are truly variable with production volume',
    'Include all relevant fixed costs in your analysis',
    'Use realistic market assumptions for better accuracy',
    'Consider multiple scenarios for comprehensive planning',
    'Monitor key variables regularly and update analysis',
    'Use sensitivity analysis to identify critical factors',
    'Consider seasonal variations in your projections',
    'Include contingency planning in your breakeven analysis'
  ],
  
  relatedCalculators: [
    'profit-margin-calculator',
    'cost-volume-profit-calculator',
    'contribution-margin-calculator',
    'pricing-strategy-calculator',
    'business-planning-calculator'
  ]
};
