import { Calculator } from '../../../types/calculator';
import { calculateVineyardProfitability } from './formulas';
import { generateVineyardProfitabilityAnalysis } from './formulas';

export const VineyardProfitabilityCalculator: Calculator = {
  id: 'vineyard-profitability',
  name: 'Vineyard Profitability Calculator',
  category: 'finance',
  description: 'Analyze the profitability and financial performance of vineyard operations including grape production, wine making, and tourism revenue.',
  inputs: {
    // Land and Property
    vineyardSize: {
      type: 'number',
      unit: 'acres',
      label: 'Vineyard Size',
      description: 'Total acreage of the vineyard',
      placeholder: '50',
      defaultValue: 50,
      min: 1,
      max: 10000,
      step: 0.1,
      required: true
    },
    landCost: {
      type: 'number',
      unit: '$',
      label: 'Land Purchase Cost',
      description: 'Total cost to purchase the vineyard land',
      placeholder: '500000',
      defaultValue: 500000,
      min: 0,
      max: 100000000,
      step: 1000,
      required: true
    },
    landValue: {
      type: 'number',
      unit: '$',
      label: 'Current Land Value',
      description: 'Current market value of the vineyard land',
      placeholder: '750000',
      defaultValue: 750000,
      min: 0,
      max: 100000000,
      step: 1000,
      required: true
    },
    
    // Grape Production
    grapeVariety: {
      type: 'select',
      label: 'Primary Grape Variety',
      description: 'Main grape variety grown',
      placeholder: 'Select grape variety',
      defaultValue: 'cabernet-sauvignon',
      options: [
        { value: 'cabernet-sauvignon', label: 'Cabernet Sauvignon' },
        { value: 'chardonnay', label: 'Chardonnay' },
        { value: 'pinot-noir', label: 'Pinot Noir' },
        { value: 'merlot', label: 'Merlot' },
        { value: 'sauvignon-blanc', label: 'Sauvignon Blanc' },
        { value: 'syrah', label: 'Syrah' },
        { value: 'zinfandel', label: 'Zinfandel' },
        { value: 'pinot-grigio', label: 'Pinot Grigio' },
        { value: 'malbec', label: 'Malbec' },
        { value: 'mixed', label: 'Mixed Varieties' }
      ],
      required: true
    },
    yieldPerAcre: {
      type: 'number',
      unit: 'tons/acre',
      label: 'Grape Yield per Acre',
      description: 'Average grape yield per acre',
      placeholder: '3.5',
      defaultValue: 3.5,
      min: 0.5,
      max: 10,
      step: 0.1,
      required: true
    },
    grapePricePerTon: {
      type: 'number',
      unit: '$/ton',
      label: 'Grape Price per Ton',
      description: 'Average selling price per ton of grapes',
      placeholder: '2500',
      defaultValue: 2500,
      min: 500,
      max: 10000,
      step: 50,
      required: true
    },
    
    // Wine Production
    wineProduction: {
      type: 'select',
      label: 'Wine Production Model',
      description: 'Whether to produce wine or sell grapes',
      placeholder: 'Select production model',
      defaultValue: 'both',
      options: [
        { value: 'grapes-only', label: 'Sell Grapes Only' },
        { value: 'wine-only', label: 'Produce Wine Only' },
        { value: 'both', label: 'Both Grapes and Wine' }
      ],
      required: true
    },
    wineBottlesPerTon: {
      type: 'number',
      unit: 'bottles/ton',
      label: 'Wine Bottles per Ton',
      description: 'Number of wine bottles produced per ton of grapes',
      placeholder: '600',
      defaultValue: 600,
      min: 400,
      max: 800,
      step: 10,
      required: true
    },
    winePricePerBottle: {
      type: 'number',
      unit: '$/bottle',
      label: 'Wine Price per Bottle',
      description: 'Average selling price per bottle of wine',
      placeholder: '25',
      defaultValue: 25,
      min: 5,
      max: 200,
      step: 1,
      required: true
    },
    
    // Operating Costs
    laborCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Labor Cost per Acre',
      description: 'Annual labor costs per acre',
      placeholder: '1500',
      defaultValue: 1500,
      min: 500,
      max: 5000,
      step: 100,
      required: true
    },
    equipmentCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Equipment Cost per Acre',
      description: 'Annual equipment and machinery costs per acre',
      placeholder: '800',
      defaultValue: 800,
      min: 200,
      max: 3000,
      step: 50,
      required: true
    },
    irrigationCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Irrigation Cost per Acre',
      description: 'Annual irrigation and water costs per acre',
      placeholder: '300',
      defaultValue: 300,
      min: 100,
      max: 1000,
      step: 25,
      required: true
    },
    fertilizerCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Fertilizer Cost per Acre',
      description: 'Annual fertilizer and soil amendment costs per acre',
      placeholder: '200',
      defaultValue: 200,
      min: 50,
      max: 800,
      step: 25,
      required: true
    },
    pestControlCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Pest Control Cost per Acre',
      description: 'Annual pest control and disease management costs per acre',
      placeholder: '250',
      defaultValue: 250,
      min: 100,
      max: 600,
      step: 25,
      required: true
    },
    insuranceCostPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Insurance Cost per Acre',
      description: 'Annual insurance costs per acre',
      placeholder: '150',
      defaultValue: 150,
      min: 50,
      max: 500,
      step: 25,
      required: true
    },
    
    // Wine Production Costs
    winemakingCostPerBottle: {
      type: 'number',
      unit: '$/bottle',
      label: 'Winemaking Cost per Bottle',
      description: 'Cost to produce one bottle of wine (excluding grapes)',
      placeholder: '8',
      defaultValue: 8,
      min: 2,
      max: 30,
      step: 0.5,
      required: true
    },
    bottlingCostPerBottle: {
      type: 'number',
      unit: '$/bottle',
      label: 'Bottling Cost per Bottle',
      description: 'Cost to bottle and package one bottle of wine',
      placeholder: '2',
      defaultValue: 2,
      min: 0.5,
      max: 10,
      step: 0.1,
      required: true
    },
    
    // Tourism and Events
    tourismRevenue: {
      type: 'number',
      unit: '$',
      label: 'Annual Tourism Revenue',
      description: 'Annual revenue from wine tasting, tours, and events',
      placeholder: '50000',
      defaultValue: 50000,
      min: 0,
      max: 1000000,
      step: 1000,
      required: true
    },
    tourismCosts: {
      type: 'number',
      unit: '$',
      label: 'Annual Tourism Costs',
      description: 'Annual costs for tourism operations and events',
      placeholder: '15000',
      defaultValue: 15000,
      min: 0,
      max: 500000,
      step: 1000,
      required: true
    },
    
    // Financial Parameters
    discountRate: {
      type: 'number',
      unit: '%',
      label: 'Discount Rate',
      description: 'Annual discount rate for present value calculations',
      placeholder: '8',
      defaultValue: 8,
      min: 1,
      max: 20,
      step: 0.5,
      required: true
    },
    analysisPeriod: {
      type: 'number',
      unit: 'years',
      label: 'Analysis Period',
      description: 'Number of years for financial analysis',
      placeholder: '20',
      defaultValue: 20,
      min: 5,
      max: 50,
      step: 1,
      required: true
    },
    landAppreciationRate: {
      type: 'number',
      unit: '%',
      label: 'Land Appreciation Rate',
      description: 'Annual rate of land value appreciation',
      placeholder: '3',
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    grapePriceEscalation: {
      type: 'number',
      unit: '%',
      label: 'Grape Price Escalation',
      description: 'Annual rate of grape price increase',
      placeholder: '2',
      defaultValue: 2,
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    },
    winePriceEscalation: {
      type: 'number',
      unit: '%',
      label: 'Wine Price Escalation',
      description: 'Annual rate of wine price increase',
      placeholder: '3',
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 0.5,
      required: true
    },
    costEscalation: {
      type: 'number',
      unit: '%',
      label: 'Cost Escalation Rate',
      description: 'Annual rate of operating cost increase',
      placeholder: '2.5',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.5,
      required: true
    }
  },
  outputs: {
    // Production Metrics
    totalGrapeProduction: {
      type: 'number',
      unit: 'tons',
      label: 'Total Grape Production',
      description: 'Total annual grape production'
    },
    totalWineProduction: {
      type: 'number',
      unit: 'bottles',
      label: 'Total Wine Production',
      description: 'Total annual wine production in bottles'
    },
    
    // Revenue Streams
    grapeRevenue: {
      type: 'number',
      unit: '$',
      label: 'Grape Revenue',
      description: 'Annual revenue from grape sales'
    },
    wineRevenue: {
      type: 'number',
      unit: '$',
      label: 'Wine Revenue',
      description: 'Annual revenue from wine sales'
    },
    tourismNetRevenue: {
      type: 'number',
      unit: '$',
      label: 'Tourism Net Revenue',
      description: 'Net revenue from tourism after costs'
    },
    totalRevenue: {
      type: 'number',
      unit: '$',
      label: 'Total Annual Revenue',
      description: 'Total annual revenue from all sources'
    },
    
    // Cost Analysis
    totalOperatingCosts: {
      type: 'number',
      unit: '$',
      label: 'Total Operating Costs',
      description: 'Total annual operating costs'
    },
    winemakingCosts: {
      type: 'number',
      unit: '$',
      label: 'Winemaking Costs',
      description: 'Total annual winemaking costs'
    },
    totalCosts: {
      type: 'number',
      unit: '$',
      label: 'Total Annual Costs',
      description: 'Total annual costs including operations and winemaking'
    },
    
    // Profitability Metrics
    grossProfit: {
      type: 'number',
      unit: '$',
      label: 'Gross Profit',
      description: 'Annual gross profit (revenue - costs)'
    },
    grossProfitMargin: {
      type: 'number',
      unit: '%',
      label: 'Gross Profit Margin',
      description: 'Gross profit as percentage of revenue'
    },
    netOperatingIncome: {
      type: 'number',
      unit: '$',
      label: 'Net Operating Income',
      description: 'Annual net operating income'
    },
    cashOnCashReturn: {
      type: 'number',
      unit: '%',
      label: 'Cash-on-Cash Return',
      description: 'Annual return on invested capital'
    },
    
    // Per Acre Metrics
    revenuePerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Revenue per Acre',
      description: 'Annual revenue per acre'
    },
    profitPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Profit per Acre',
      description: 'Annual profit per acre'
    },
    costPerAcre: {
      type: 'number',
      unit: '$/acre',
      label: 'Cost per Acre',
      description: 'Annual cost per acre'
    },
    
    // Long-term Analysis
    netPresentValue: {
      type: 'number',
      unit: '$',
      label: 'Net Present Value',
      description: 'Net present value of the vineyard investment'
    },
    internalRateOfReturn: {
      type: 'number',
      unit: '%',
      label: 'Internal Rate of Return',
      description: 'Internal rate of return on the vineyard investment'
    },
    paybackPeriod: {
      type: 'number',
      unit: 'years',
      label: 'Payback Period',
      description: 'Time to recover initial investment'
    },
    breakEvenYield: {
      type: 'number',
      unit: 'tons/acre',
      label: 'Break-Even Yield',
      description: 'Minimum yield needed to break even'
    },
    breakEvenGrapePrice: {
      type: 'number',
      unit: '$/ton',
      label: 'Break-Even Grape Price',
      description: 'Minimum grape price needed to break even'
    },
    
    // Risk Analysis
    profitVariability: {
      type: 'number',
      unit: '%',
      label: 'Profit Variability',
      description: 'Standard deviation of annual profit as percentage of mean'
    },
    worstCaseScenario: {
      type: 'number',
      unit: '$',
      label: 'Worst Case Annual Profit',
      description: 'Estimated worst-case annual profit'
    },
    bestCaseScenario: {
      type: 'number',
      unit: '$',
      label: 'Best Case Annual Profit',
      description: 'Estimated best-case annual profit'
    },
    
    // Market Analysis
    marketCompetitiveness: {
      type: 'string',
      label: 'Market Competitiveness',
      description: 'Assessment of market position and competitiveness'
    },
    revenueDiversification: {
      type: 'string',
      label: 'Revenue Diversification',
      description: 'Assessment of revenue stream diversification'
    },
    riskAssessment: {
      type: 'string',
      label: 'Risk Assessment',
      description: 'Overall risk assessment of the vineyard operation'
    },
    investmentScore: {
      type: 'number',
      unit: '/100',
      label: 'Investment Score',
      description: 'Overall investment attractiveness score'
    },
    recommendation: {
      type: 'string',
      label: 'Recommendation',
      description: 'Investment recommendation and strategic advice'
    }
  },
  calculate: calculateVineyardProfitability,
  generateReport: generateVineyardProfitabilityAnalysis
};
