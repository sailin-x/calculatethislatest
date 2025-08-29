import { Calculator } from '../../types';
import { HotelFeasibilityADRInputs, HotelFeasibilityADROutputs } from './types';
import { calculateHotelFeasibilityADR } from './formulas';
import { validateHotelFeasibilityADRInputs } from './validation';

export const HotelFeasibilityADRCalculator: Calculator<HotelFeasibilityADRInputs, HotelFeasibilityADROutputs> = {
  id: 'hotel-feasibility-adr',
  name: 'Hotel Feasibility & ADR Calculator',
  category: 'finance',
  subcategory: 'hospitality',
  description: 'Calculate hotel feasibility, average daily rate (ADR), and financial projections for hospitality investments',
  longDescription: `A comprehensive hotel feasibility and ADR calculator that analyzes the financial viability of hotel investments. This calculator evaluates market conditions, operating metrics, revenue projections, and financial performance to determine hotel investment feasibility. It includes ADR optimization, occupancy analysis, competitive positioning, and comprehensive financial modeling to help investors make informed hospitality investment decisions.`,
  
  inputs: {
    // Property Information
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Hotel property address',
      required: true,
      placeholder: '123 Hotel Blvd, City, State 12345'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total property square footage',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    numberOfRooms: {
      type: 'number',
      label: 'Number of Rooms',
      description: 'Total number of hotel rooms',
      required: true,
      min: 10,
      max: 1000,
      step: 1,
      placeholder: '100'
    },
    hotelClass: {
      type: 'select',
      label: 'Hotel Class',
      description: 'Hotel classification and market segment',
      required: true,
      options: [
        { value: 'budget', label: 'Budget' },
        { value: 'economy', label: 'Economy' },
        { value: 'midscale', label: 'Midscale' },
        { value: 'upscale', label: 'Upscale' },
        { value: 'luxury', label: 'Luxury' },
        { value: 'boutique', label: 'Boutique' }
      ],
      placeholder: 'midscale'
    },
    hotelBrand: {
      type: 'text',
      label: 'Hotel Brand',
      description: 'Hotel brand or franchise',
      required: true,
      placeholder: 'Marriott'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the hotel property',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15'
    },
    lastRenovation: {
      type: 'number',
      label: 'Last Renovation (years ago)',
      description: 'Years since last major renovation',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '5'
    },
    
    // Market Information
    marketLocation: {
      type: 'text',
      label: 'Market Location',
      description: 'Primary market location',
      required: true,
      placeholder: 'Downtown Business District'
    },
    marketType: {
      type: 'select',
      label: 'Market Type',
      description: 'Type of hotel market',
      required: true,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'airport', label: 'Airport' },
        { value: 'resort', label: 'Resort' },
        { value: 'business', label: 'Business' },
        { value: 'leisure', label: 'Leisure' }
      ],
      placeholder: 'urban'
    },
    marketDemand: {
      type: 'select',
      label: 'Market Demand',
      description: 'Level of market demand',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'high'
    },
    marketSupply: {
      type: 'select',
      label: 'Market Supply',
      description: 'Level of market supply',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'medium'
    },
    marketGrowthRate: {
      type: 'number',
      label: 'Market Growth Rate (%)',
      description: 'Expected annual market growth rate',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.5'
    },
    seasonalityFactor: {
      type: 'number',
      label: 'Seasonality Factor',
      description: 'Seasonal demand variation factor',
      required: true,
      min: 0.5,
      max: 2.0,
      step: 0.1,
      placeholder: '1.2'
    },
    
    // Financial Information
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price ($)',
      description: 'Hotel purchase price',
      required: true,
      min: 1000000,
      max: 100000000,
      step: 100000,
      placeholder: '15000000'
    },
    acquisitionCosts: {
      type: 'number',
      label: 'Acquisition Costs ($)',
      description: 'Additional acquisition costs',
      required: true,
      min: 0,
      max: 10000000,
      step: 10000,
      placeholder: '500000'
    },
    renovationCosts: {
      type: 'number',
      label: 'Renovation Costs ($)',
      description: 'Required renovation costs',
      required: true,
      min: 0,
      max: 20000000,
      step: 100000,
      placeholder: '2000000'
    },
    workingCapital: {
      type: 'number',
      label: 'Working Capital ($)',
      description: 'Required working capital',
      required: true,
      min: 0,
      max: 5000000,
      step: 10000,
      placeholder: '500000'
    },
    totalInvestment: {
      type: 'number',
      label: 'Total Investment ($)',
      description: 'Total investment required',
      required: true,
      min: 1000000,
      max: 100000000,
      step: 100000,
      placeholder: '18000000'
    },
    
    // Operating Information
    averageDailyRate: {
      type: 'number',
      label: 'Average Daily Rate ($)',
      description: 'Average daily room rate',
      required: true,
      min: 50,
      max: 2000,
      step: 10,
      placeholder: '150'
    },
    occupancyRate: {
      type: 'number',
      label: 'Occupancy Rate (%)',
      description: 'Expected occupancy rate',
      required: true,
      min: 20,
      max: 95,
      step: 1,
      placeholder: '75'
    },
    revenuePerAvailableRoom: {
      type: 'number',
      label: 'RevPAR ($)',
      description: 'Revenue per available room',
      required: true,
      min: 20,
      max: 1000,
      step: 5,
      placeholder: '112'
    },
    averageLengthOfStay: {
      type: 'number',
      label: 'Average Length of Stay (nights)',
      description: 'Average guest stay duration',
      required: true,
      min: 1,
      max: 30,
      step: 0.5,
      placeholder: '2.5'
    },
    operatingDaysPerYear: {
      type: 'number',
      label: 'Operating Days per Year',
      description: 'Number of operating days annually',
      required: true,
      min: 300,
      max: 365,
      step: 1,
      placeholder: '365'
    },
    
    // Revenue Streams
    roomRevenue: {
      type: 'number',
      label: 'Room Revenue ($)',
      description: 'Annual room revenue',
      required: true,
      min: 100000,
      max: 50000000,
      step: 10000,
      placeholder: '4000000'
    },
    foodAndBeverageRevenue: {
      type: 'number',
      label: 'Food & Beverage Revenue ($)',
      description: 'Annual F&B revenue',
      required: true,
      min: 0,
      max: 20000000,
      step: 10000,
      placeholder: '800000'
    },
    ancillaryRevenue: {
      type: 'number',
      label: 'Ancillary Revenue ($)',
      description: 'Additional revenue streams',
      required: true,
      min: 0,
      max: 10000000,
      step: 10000,
      placeholder: '200000'
    },
    otherRevenue: {
      type: 'number',
      label: 'Other Revenue ($)',
      description: 'Other revenue sources',
      required: true,
      min: 0,
      max: 5000000,
      step: 10000,
      placeholder: '100000'
    },
    totalRevenue: {
      type: 'number',
      label: 'Total Revenue ($)',
      description: 'Total annual revenue',
      required: true,
      min: 100000,
      max: 100000000,
      step: 10000,
      placeholder: '5100000'
    },
    
    // Operating Expenses
    laborCosts: {
      type: 'number',
      label: 'Labor Costs ($)',
      description: 'Annual labor costs',
      required: true,
      min: 50000,
      max: 20000000,
      step: 10000,
      placeholder: '1800000'
    },
    utilities: {
      type: 'number',
      label: 'Utilities ($)',
      description: 'Annual utility costs',
      required: true,
      min: 10000,
      max: 2000000,
      step: 1000,
      placeholder: '200000'
    },
    maintenance: {
      type: 'number',
      label: 'Maintenance ($)',
      description: 'Annual maintenance costs',
      required: true,
      min: 10000,
      max: 2000000,
      step: 1000,
      placeholder: '150000'
    },
    insurance: {
      type: 'number',
      label: 'Insurance ($)',
      description: 'Annual insurance costs',
      required: true,
      min: 5000,
      max: 500000,
      step: 1000,
      placeholder: '50000'
    },
    propertyTaxes: {
      type: 'number',
      label: 'Property Taxes ($)',
      description: 'Annual property taxes',
      required: true,
      min: 5000,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    managementFees: {
      type: 'number',
      label: 'Management Fees ($)',
      description: 'Annual management fees',
      required: true,
      min: 0,
      max: 2000000,
      step: 1000,
      placeholder: '200000'
    },
    marketing: {
      type: 'number',
      label: 'Marketing ($)',
      description: 'Annual marketing costs',
      required: true,
      min: 5000,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    administrative: {
      type: 'number',
      label: 'Administrative ($)',
      description: 'Annual administrative costs',
      required: true,
      min: 5000,
      max: 1000000,
      step: 1000,
      placeholder: '80000'
    },
    otherExpenses: {
      type: 'number',
      label: 'Other Expenses ($)',
      description: 'Other operating expenses',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000'
    },
    totalOperatingExpenses: {
      type: 'number',
      label: 'Total Operating Expenses ($)',
      description: 'Total annual operating expenses',
      required: true,
      min: 50000,
      max: 50000000,
      step: 10000,
      placeholder: '2630000'
    },
    
    // Staffing
    fullTimeEmployees: {
      type: 'number',
      label: 'Full-Time Employees',
      description: 'Number of full-time employees',
      required: true,
      min: 5,
      max: 500,
      step: 1,
      placeholder: '25'
    },
    partTimeEmployees: {
      type: 'number',
      label: 'Part-Time Employees',
      description: 'Number of part-time employees',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15'
    },
    averageWage: {
      type: 'number',
      label: 'Average Wage ($/hour)',
      description: 'Average hourly wage',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      placeholder: '18'
    },
    benefitsPercentage: {
      type: 'number',
      label: 'Benefits Percentage (%)',
      description: 'Benefits as percentage of wages',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      placeholder: '25'
    },
    
    // Demand Drivers
    businessTravel: {
      type: 'number',
      label: 'Business Travel (%)',
      description: 'Percentage of business travelers',
      required: true,
      min: 0,
      max: 100,
      step: 5,
      placeholder: '60'
    },
    leisureTravel: {
      type: 'number',
      label: 'Leisure Travel (%)',
      description: 'Percentage of leisure travelers',
      required: true,
      min: 0,
      max: 100,
      step: 5,
      placeholder: '30'
    },
    groupTravel: {
      type: 'number',
      label: 'Group Travel (%)',
      description: 'Percentage of group travelers',
      required: true,
      min: 0,
      max: 50,
      step: 5,
      placeholder: '10'
    },
    localAttractions: {
      type: 'number',
      label: 'Local Attractions Score',
      description: 'Local attractions and amenities score (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '7'
    },
    transportationAccess: {
      type: 'number',
      label: 'Transportation Access Score',
      description: 'Transportation accessibility score (1-10)',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '8'
    },
    
    // Risk Factors
    marketRisk: {
      type: 'select',
      label: 'Market Risk',
      description: 'Level of market risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    operationalRisk: {
      type: 'select',
      label: 'Operational Risk',
      description: 'Level of operational risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    financialRisk: {
      type: 'select',
      label: 'Financial Risk',
      description: 'Level of financial risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'medium'
    },
    regulatoryRisk: {
      type: 'select',
      label: 'Regulatory Risk',
      description: 'Level of regulatory risk',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'low'
    },
    
    // Financing
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Financing loan amount',
      required: true,
      min: 0,
      max: 100000000,
      step: 100000,
      placeholder: '12600000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Loan interest rate',
      required: true,
      min: 1,
      max: 15,
      step: 0.25,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Loan term in years',
      required: true,
      min: 5,
      max: 30,
      step: 1,
      placeholder: '25'
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Required down payment',
      required: true,
      min: 0,
      max: 100000000,
      step: 100000,
      placeholder: '5400000'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for financial analysis',
      required: true,
      min: 5,
      max: 20,
      step: 1,
      placeholder: '10'
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
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for NPV calculations',
      required: true,
      min: 5,
      max: 25,
      step: 0.5,
      placeholder: '12'
    },
    taxRate: {
      type: 'number',
      label: 'Tax Rate (%)',
      description: 'Applicable tax rate',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25'
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
    netOperatingIncome: {
      type: 'number',
      label: 'Net Operating Income',
      description: 'Annual net operating income'
    },
    cashFlow: {
      type: 'number',
      label: 'Cash Flow',
      description: 'Annual cash flow after debt service'
    },
    cashOnCashReturn: {
      type: 'number',
      label: 'Cash-on-Cash Return',
      description: 'Cash-on-cash return percentage'
    },
    internalRateOfReturn: {
      type: 'number',
      label: 'Internal Rate of Return',
      description: 'Projected IRR percentage'
    },
    averageDailyRate: {
      type: 'number',
      label: 'Average Daily Rate',
      description: 'Optimized average daily rate'
    },
    occupancyRate: {
      type: 'number',
      label: 'Occupancy Rate',
      description: 'Projected occupancy rate'
    },
    revenuePerAvailableRoom: {
      type: 'number',
      label: 'Revenue per Available Room',
      description: 'RevPAR metric'
    },
    feasibilityRating: {
      type: 'string',
      label: 'Feasibility Rating',
      description: 'Overall feasibility assessment'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive feasibility analysis'
    }
  },
  
  calculate: (inputs: HotelFeasibilityADRInputs): HotelFeasibilityADROutputs => {
    const validation = validateHotelFeasibilityADRInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHotelFeasibilityADR(inputs);
  },
  
  generateReport: (inputs: HotelFeasibilityADRInputs, outputs: HotelFeasibilityADROutputs): string => {
    const { analysis } = outputs;
    
    return `
# Hotel Feasibility & ADR Analysis Report

## Executive Summary
- **Feasibility Rating**: ${analysis.feasibilityRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Net Operating Income**: $${outputs.netOperatingIncome.toLocaleString()}
- **Cash Flow**: $${outputs.cashFlow.toLocaleString()}
- **Cash-on-Cash Return**: ${outputs.cashOnCashReturn.toFixed(2)}%
- **Internal Rate of Return**: ${outputs.internalRateOfReturn.toFixed(2)}%
- **Average Daily Rate**: $${outputs.averageDailyRate.toFixed(2)}
- **Occupancy Rate**: ${outputs.occupancyRate.toFixed(1)}%
- **Revenue per Available Room**: $${outputs.revenuePerAvailableRoom.toFixed(2)}
- **Feasibility Rating**: ${outputs.feasibilityRating}

## Analysis
${analysis.financialSummary}

## Market Assessment
${analysis.marketSummary}

## Recommendations
${analysis.investmentRecommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Net Operating Income': 'Total Revenue - Total Operating Expenses',
    'Cash Flow': 'NOI - Debt Service',
    'Cash-on-Cash Return': 'Cash Flow / Total Investment × 100',
    'Internal Rate of Return': 'Discounted cash flow analysis over analysis period',
    'Average Daily Rate': 'Optimized rate based on market conditions and demand',
    'Occupancy Rate': 'Projected occupancy based on market analysis',
    'Revenue per Available Room': 'ADR × Occupancy Rate',
    'Feasibility Rating': 'Weighted assessment of financial, market, and operational factors'
  },
  
  examples: [
    {
      name: 'Midscale Hotel Investment',
      inputs: {
        propertyAddress: '123 Hotel Blvd, Downtown, CA 90210',
        propertySize: 50000,
        numberOfRooms: 100,
        hotelClass: 'midscale',
        hotelBrand: 'Marriott',
        propertyAge: 15,
        lastRenovation: 5,
        marketLocation: 'Downtown Business District',
        marketType: 'urban',
        marketDemand: 'high',
        marketSupply: 'medium',
        marketGrowthRate: 3.5,
        seasonalityFactor: 1.2,
        purchasePrice: 15000000,
        acquisitionCosts: 500000,
        renovationCosts: 2000000,
        workingCapital: 500000,
        totalInvestment: 18000000,
        averageDailyRate: 150,
        occupancyRate: 75,
        revenuePerAvailableRoom: 112,
        averageLengthOfStay: 2.5,
        operatingDaysPerYear: 365,
        roomRevenue: 4000000,
        foodAndBeverageRevenue: 800000,
        ancillaryRevenue: 200000,
        otherRevenue: 100000,
        totalRevenue: 5100000,
        laborCosts: 1800000,
        utilities: 200000,
        maintenance: 150000,
        insurance: 50000,
        propertyTaxes: 100000,
        managementFees: 200000,
        marketing: 100000,
        administrative: 80000,
        otherExpenses: 50000,
        totalOperatingExpenses: 2630000,
        fullTimeEmployees: 25,
        partTimeEmployees: 15,
        averageWage: 18,
        benefitsPercentage: 25,
        businessTravel: 60,
        leisureTravel: 30,
        groupTravel: 10,
        localAttractions: 7,
        transportationAccess: 8,
        marketRisk: 'medium',
        operationalRisk: 'medium',
        financialRisk: 'medium',
        regulatoryRisk: 'low',
        loanAmount: 12600000,
        interestRate: 6.5,
        loanTerm: 25,
        downPayment: 5400000,
        analysisPeriod: 10,
        inflationRate: 2.5,
        discountRate: 12,
        taxRate: 25,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'hotel feasibility',
    'ADR',
    'hospitality',
    'hotel investment',
    'RevPAR',
    'occupancy',
    'hotel management',
    'tourism',
    'lodging',
    'hospitality finance'
  ],
  
  category_info: {
    name: 'Hospitality Finance',
    description: 'Financial calculators for hospitality and hotel investments',
    icon: '🏨'
  }
};
