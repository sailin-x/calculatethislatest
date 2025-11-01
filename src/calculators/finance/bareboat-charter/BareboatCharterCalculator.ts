import { Calculator, CalculatorInput, CalculatorOutput, CalculatorExample } from '../../types/calculator';
import { calculateBareboatCharter, calculateTimeCharter, compareCharterOptions } from './formulas';
import { validateBareboatCharterInputs } from './validation';

export const BareboatCharterCalculator: Calculator = {
  id: 'BareboatCharterCalculator',
  name: 'Bareboat Charter vs. Time Charter Calculator',
  description: 'Compare the financial implications of bareboat charter vs. time charter arrangements for maritime vessels, including operating costs, revenue potential, and risk analysis.',
  category: 'finance',
  subcategory: 'maritime-finance',
  tags: ['maritime', 'charter', 'shipping', 'vessel', 'bareboat', 'time-charter', 'commercial'],
  
  inputs: [
    {
      id: 'vesselValue',
      label: 'Vessel Value ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 1000000000,
      step: 10000,
      tooltip: 'Current market value of the vessel',
      placeholder: '5000000'
    },
    {
      id: 'charterDuration',
      label: 'Charter Duration (months)',
      type: 'number',
      required: true,
      min: 1,
      max: 120,
      step: 1,
      tooltip: 'Duration of the charter agreement in months',
      placeholder: '24'
    },
    {
      id: 'bareboatRate',
      label: 'Bareboat Charter Rate ($/day)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 100000,
      step: 100,
      tooltip: 'Daily rate for bareboat charter',
      placeholder: '15000'
    },
    {
      id: 'timeCharterRate',
      label: 'Time Charter Rate ($/day)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 100000,
      step: 100,
      tooltip: 'Daily rate for time charter',
      placeholder: '25000'
    },
    {
      id: 'operatingCosts',
      label: 'Operating Costs ($/day)',
      type: 'currency',
      required: true,
      min: 100,
      max: 50000,
      step: 100,
      tooltip: 'Daily operating costs (crew, fuel, maintenance, etc.)',
      placeholder: '8000'
    },
    {
      id: 'insuranceCosts',
      label: 'Insurance Costs ($/day)',
      type: 'currency',
      required: true,
      min: 50,
      max: 10000,
      step: 50,
      tooltip: 'Daily insurance costs',
      placeholder: '500'
    },
    {
      id: 'maintenanceReserve',
      label: 'Maintenance Reserve ($/day)',
      type: 'currency',
      required: true,
      min: 0,
      max: 20000,
      step: 100,
      tooltip: 'Daily maintenance reserve fund',
      placeholder: '1000'
    },
    {
      id: 'utilizationRate',
      label: 'Vessel Utilization Rate (%)',
      type: 'percentage',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      tooltip: 'Percentage of time vessel is operational',
      placeholder: '85'
    },
    {
      id: 'fuelPrice',
      label: 'Fuel Price ($/ton)',
      type: 'currency',
      required: true,
      min: 100,
      max: 2000,
      step: 10,
      tooltip: 'Current fuel price per ton',
      placeholder: '600'
    },
    {
      id: 'fuelConsumption',
      label: 'Fuel Consumption (tons/day)',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      step: 0.1,
      tooltip: 'Daily fuel consumption in tons',
      placeholder: '25'
    },
    {
      id: 'crewCosts',
      label: 'Crew Costs ($/day)',
      type: 'currency',
      required: true,
      min: 500,
      max: 15000,
      step: 100,
      tooltip: 'Daily crew costs including wages and provisions',
      placeholder: '3000'
    },
    {
      id: 'portCharges',
      label: 'Port Charges ($/day)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      tooltip: 'Average daily port charges and fees',
      placeholder: '800'
    }
  ],

  outputs: [
    {
      id: 'bareboatRevenue',
      label: 'Bareboat Charter Revenue',
      type: 'currency',
      explanation: 'Total revenue from bareboat charter over the duration'
    },
    {
      id: 'bareboatProfit',
      label: 'Bareboat Charter Profit',
      type: 'currency',
      explanation: 'Net profit from bareboat charter after all costs'
    },
    {
      id: 'bareboatROI',
      label: 'Bareboat Charter ROI',
      type: 'percentage',
      explanation: 'Return on investment for bareboat charter'
    },
    {
      id: 'timeCharterRevenue',
      label: 'Time Charter Revenue',
      type: 'currency',
      explanation: 'Total revenue from time charter over the duration'
    },
    {
      id: 'timeCharterProfit',
      label: 'Time Charter Profit',
      type: 'currency',
      explanation: 'Net profit from time charter after all costs'
    },
    {
      id: 'timeCharterROI',
      label: 'Time Charter ROI',
      type: 'percentage',
      explanation: 'Return on investment for time charter'
    },
    {
      id: 'profitDifference',
      label: 'Profit Difference (Time - Bareboat)',
      type: 'currency',
      explanation: 'Difference in profit between time charter and bareboat charter'
    },
    {
      id: 'recommendation',
      label: 'Recommended Option',
      type: 'text',
      explanation: 'Recommended charter option based on financial analysis'
    },
    {
      id: 'breakEvenUtilization',
      label: 'Break-even Utilization Rate',
      type: 'percentage',
      explanation: 'Utilization rate needed for time charter to match bareboat profit'
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'text',
      explanation: 'Risk assessment for each charter option'
    }
  ],

  calculate: (inputs: Record<string, any>) => {
    // Validate inputs
    const validationResult = validateBareboatCharterInputs(inputs);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Calculate bareboat charter metrics
    const bareboatMetrics = calculateBareboatCharter(inputs);
    
    // Calculate time charter metrics
    const timeCharterMetrics = calculateTimeCharter(inputs);
    
    // Compare options
    const comparison = compareCharterOptions(bareboatMetrics, timeCharterMetrics, inputs);

    return {
      bareboatRevenue: bareboatMetrics.totalRevenue,
      bareboatProfit: bareboatMetrics.netProfit,
      bareboatROI: bareboatMetrics.roi,
      timeCharterRevenue: timeCharterMetrics.totalRevenue,
      timeCharterProfit: timeCharterMetrics.netProfit,
      timeCharterROI: timeCharterMetrics.roi,
      profitDifference: comparison.profitDifference,
      recommendation: comparison.recommendation,
      breakEvenUtilization: comparison.breakEvenUtilization,
      riskAnalysis: comparison.riskAnalysis
    };
  },

  formulas: [
    {
      name: 'Bareboat Charter Revenue',
      formula: 'Revenue = Bareboat Rate × Duration × Utilization Rate',
      description: 'Total revenue from bareboat charter arrangement'
    },
    {
      name: 'Bareboat Charter Costs',
      formula: 'Costs = (Operating + Insurance + Maintenance) × Duration × Utilization Rate',
      description: 'Total costs for bareboat charter'
    },
    {
      name: 'Time Charter Revenue',
      formula: 'Revenue = Time Charter Rate × Duration × Utilization Rate',
      description: 'Total revenue from time charter arrangement'
    },
    {
      name: 'Time Charter Costs',
      formula: 'Costs = (Fuel + Crew + Port Charges) × Duration × Utilization Rate',
      description: 'Total costs for time charter'
    },
    {
      name: 'ROI Calculation',
      formula: 'ROI = (Net Profit / Vessel Value) × 100',
      description: 'Return on investment percentage'
    }
  ],

  examples: [
    {
      name: 'Medium-sized Container Vessel',
      description: 'Analysis for a 2,500 TEU container vessel on 24-month charter',
      inputs: {
        vesselValue: 25000000,
        charterDuration: 24,
        bareboatRate: 12000,
        timeCharterRate: 22000,
        operatingCosts: 6000,
        insuranceCosts: 400,
        maintenanceReserve: 800,
        utilizationRate: 88,
        fuelPrice: 650,
        fuelConsumption: 18,
        crewCosts: 2500,
        portCharges: 600
      },
      expectedOutputs: {
        bareboatRevenue: 6969600,
        bareboatProfit: 4569600,
        bareboatROI: 18.3,
        timeCharterRevenue: 12777600,
        timeCharterProfit: 10377600,
        timeCharterROI: 41.5,
        recommendation: 'Time Charter',
        profitDifference: 5808000
      }
    },
    {
      name: 'Bulk Carrier Analysis',
      description: 'Comparison for a 60,000 DWT bulk carrier on 12-month charter',
      inputs: {
        vesselValue: 18000000,
        charterDuration: 12,
        bareboatRate: 8500,
        timeCharterRate: 15000,
        operatingCosts: 4500,
        insuranceCosts: 300,
        maintenanceReserve: 600,
        utilizationRate: 82,
        fuelPrice: 580,
        fuelConsumption: 22,
        crewCosts: 2000,
        portCharges: 500
      },
      expectedOutputs: {
        bareboatRevenue: 2509200,
        bareboatProfit: 1645200,
        bareboatROI: 9.1,
        timeCharterRevenue: 4428000,
        timeCharterProfit: 3568000,
        timeCharterROI: 19.8,
        recommendation: 'Time Charter',
        profitDifference: 1922800
      }
    },
    {
      name: 'Tanker Vessel Comparison',
      description: 'Analysis for a 50,000 DWT product tanker on 36-month charter',
      inputs: {
        vesselValue: 22000000,
        charterDuration: 36,
        bareboatRate: 10000,
        timeCharterRate: 18000,
        operatingCosts: 5500,
        insuranceCosts: 350,
        maintenanceReserve: 700,
        utilizationRate: 90,
        fuelPrice: 620,
        fuelConsumption: 20,
        crewCosts: 2200,
        portCharges: 550
      },
      expectedOutputs: {
        bareboatRevenue: 9720000,
        bareboatProfit: 6372000,
        bareboatROI: 29.0,
        timeCharterRevenue: 17496000,
        timeCharterProfit: 14196000,
        timeCharterROI: 64.5,
        recommendation: 'Time Charter',
        profitDifference: 7824000
      }
    }
  ],

  usageInstructions: [
    'Enter the current market value of the vessel',
    'Specify the charter duration in months',
    'Input the daily rates for both bareboat and time charter options',
    'Provide operating costs including crew, fuel, and maintenance',
    'Set the expected vessel utilization rate',
    'Include insurance and port charges',
    'Review the comparison results and recommendations',
    'Consider risk factors and market conditions in your decision'
  ]
};
