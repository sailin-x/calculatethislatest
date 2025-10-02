import { Calculator } from '../../types/calculator';
import { HotelFeasibilityADRCalculatorInputs, HotelFeasibilityADRCalculatorOutputs } from './types';
import { calculateHotelFeasibilityADR } from './formulas';
import { validateHotelFeasibilityADRInputs } from './validation';

export const HotelFeasibilityADRCalculator: Calculator & {
  calculate: (inputs: HotelFeasibilityADRCalculatorInputs) => HotelFeasibilityADRCalculatorOutputs;
  generateReport: (inputs: HotelFeasibilityADRCalculatorInputs, outputs: HotelFeasibilityADRCalculatorOutputs) => string;
} = {
  id: 'hotel-feasibility-adr',
  title: 'Hotel Feasibility ADR Calculator',
  category: 'finance',
  subcategory: 'hospitality',
  description: 'Analyze hotel investment feasibility based on Average Daily Rate (ADR) projections.',
  usageInstructions: [
    'Enter property details and location information',
    'Specify construction and operating costs',
    'Input expected ADR and occupancy rates',
    'Review financial projections and feasibility analysis',
    'Generate comprehensive investment report'
  ],

  inputs: [
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text',
      required: true,
      tooltip: 'Full address of the hotel property'
    },
    {
      id: 'hotelBrand',
      label: 'Hotel Brand',
      type: 'text',
      required: true,
      tooltip: 'Hotel brand or independent status'
    },
    {
      id: 'marketLocation',
      label: 'Market Location',
      type: 'text',
      required: true,
      tooltip: 'City and region of the hotel location'
    },
    {
      id: 'numberOfRooms',
      label: 'Number of Rooms',
      type: 'number',
      required: true,
      min: 10,
      max: 2000,
      tooltip: 'Total number of guest rooms'
    },
    {
      id: 'constructionCostPerRoom',
      label: 'Construction Cost per Room ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 1000000,
      tooltip: 'Construction cost per room including FF&E'
    },
    {
      id: 'landCost',
      label: 'Land Cost ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000000,
      tooltip: 'Cost of the land acquisition'
    },
    {
      id: 'operatingCostsPerRoom',
      label: 'Annual Operating Costs per Room ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 500000,
      tooltip: 'Annual operating costs per room'
    },
    {
      id: 'expectedADR',
      label: 'Expected ADR ($)',
      type: 'currency',
      required: true,
      min: 50,
      max: 1000,
      tooltip: 'Expected Average Daily Rate'
    },
    {
      id: 'expectedOccupancyRate',
      label: 'Expected Occupancy Rate (%)',
      type: 'percentage',
      required: true,
      min: 30,
      max: 95,
      tooltip: 'Expected annual occupancy rate'
    },
    {
      id: 'financingRate',
      label: 'Financing Rate (%)',
      type: 'percentage',
      required: true,
      min: 3,
      max: 15,
      tooltip: 'Interest rate for financing'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      required: true,
      min: 50,
      max: 90,
      tooltip: 'Percentage of project financed'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 30,
      tooltip: 'Period for financial analysis'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 5,
      max: 20,
      tooltip: 'Discount rate for NPV calculations'
    }
  ],

  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total capital investment required'
    },
    {
      id: 'annualRevenue',
      label: 'Annual Revenue',
      type: 'currency',
      explanation: 'Projected annual revenue'
    },
    {
      id: 'annualOperatingCosts',
      label: 'Annual Operating Costs',
      type: 'currency',
      explanation: 'Annual operating expenses'
    },
    {
      id: 'annualNetIncome',
      label: 'Annual Net Income',
      type: 'currency',
      explanation: 'Annual net operating income'
    },
    {
      id: 'npv',
      label: 'Net Present Value (NPV)',
      type: 'currency',
      explanation: 'Net present value of the investment'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return (IRR) (%)',
      type: 'percentage',
      explanation: 'Internal rate of return'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period (years)',
      type: 'number',
      explanation: 'Time to recover initial investment'
    },
    {
      id: 'profitabilityIndex',
      label: 'Profitability Index',
      type: 'number',
      explanation: 'Benefit-cost ratio'
    },
    {
      id: 'feasibilityScore',
      label: 'Feasibility Score (0-100)',
      type: 'number',
      explanation: 'Overall feasibility score'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Investment recommendation based on analysis'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [],

  calculate: (inputs: HotelFeasibilityADRCalculatorInputs): HotelFeasibilityADRCalculatorOutputs => {
    // Add validation if needed
    return calculateHotelFeasibilityADR(inputs);
  },

  generateReport: (inputs: HotelFeasibilityADRCalculatorInputs, outputs: HotelFeasibilityADRCalculatorOutputs): string => {
    return `
# Hotel Feasibility ADR Analysis Report

## Executive Summary
This report analyzes the financial feasibility of a hotel investment based on Average Daily Rate (ADR) projections.

## Property Information
- **Location**: ${inputs.marketLocation}
- **Address**: ${inputs.propertyAddress}
- **Brand**: ${inputs.hotelBrand}
- **Rooms**: ${inputs.numberOfRooms}

## Investment Summary
- **Total Investment**: $${outputs.totalInvestment.toLocaleString()}
- **Construction Cost per Room**: $${inputs.constructionCostPerRoom.toLocaleString()}
- **Land Cost**: $${inputs.landCost.toLocaleString()}

## Revenue Projections
- **Expected ADR**: $${inputs.expectedADR}
- **Expected Occupancy**: ${inputs.expectedOccupancyRate}%
- **Annual Revenue**: $${outputs.annualRevenue.toLocaleString()}

## Financial Analysis
- **Annual Operating Costs**: $${outputs.annualOperatingCosts.toLocaleString()}
- **Annual Net Income**: $${outputs.annualNetIncome.toLocaleString()}
- **NPV**: $${outputs.npv.toLocaleString()}
- **IRR**: ${outputs.irr}%
- **Payback Period**: ${outputs.paybackPeriod} years
- **Profitability Index**: ${outputs.profitabilityIndex}

## Feasibility Assessment
- **Feasibility Score**: ${outputs.feasibilityScore}/100
- **Recommendation**: ${outputs.recommendation}

## Key Assumptions
- **Analysis Period**: ${inputs.analysisPeriod} years
- **Discount Rate**: ${inputs.discountRate}%
- **Inflation Rate**: ${inputs.inflationRate}%

*This analysis is for informational purposes only and should not replace professional financial advice.*
    `.trim();
  }
};
