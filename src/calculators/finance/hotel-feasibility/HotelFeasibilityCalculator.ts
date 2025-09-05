import { Calculator } from '../../types';
import { HotelFeasibilityInputs, HotelFeasibilityOutputs } from './types';
import { calculateHotelFeasibility } from './formulas';
import { validateHotelFeasibilityInputs } from './validation';

export const HotelFeasibilityCalculator: Calculator<HotelFeasibilityInputs, HotelFeasibilityOutputs> = {
  id: 'hotel-feasibility',
  name: 'Hotel Feasibility & ADR Calculator',
  category: 'finance',
  subcategory: 'real_estate',
  description: 'Analyze hotel investment feasibility, ADR projections, and financial performance',
  longDescription: `A comprehensive hotel feasibility calculator that analyzes investment potential, market positioning, and financial performance for hotel properties. This calculator evaluates market conditions, competitive landscape, revenue projections, operating costs, and investment returns to determine the feasibility of hotel investments. It includes detailed financial modeling, risk assessment, and strategic recommendations for hotel development and acquisition projects.`,
  
  inputs: {
    // Property Information
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Hotel Blvd, City, State 12345'
    },
    city: {
      type: 'text',
      label: 'City',
      description: 'City where property is located',
      required: true,
      placeholder: 'Miami'
    },
    state: {
      type: 'text',
      label: 'State',
      description: 'State where property is located',
      required: true,
      placeholder: 'FL'
    },
    zipCode: {
      type: 'text',
      label: 'ZIP Code',
      description: 'ZIP code of the property',
      required: true,
      placeholder: '33101'
    },
    totalRooms: {
      type: 'number',
      label: 'Total Rooms',
      description: 'Total number of guest rooms',
      required: true,
      min: 1,
      max: 1000,
      step: 1,
      placeholder: '150'
    },
    roomTypes: {
      type: 'object',
      label: 'Room Types',
      description: 'Breakdown of room types',
      required: true,
      properties: {
        standard: {
          type: 'number',
          label: 'Standard Rooms',
          min: 0,
          step: 1
        },
        deluxe: {
          type: 'number',
          label: 'Deluxe Rooms',
          min: 0,
          step: 1
        },
        suite: {
          type: 'number',
          label: 'Suites',
          min: 0,
          step: 1
        },
        presidential: {
          type: 'number',
          label: 'Presidential Suites',
          min: 0,
          step: 1
        }
      }
    },
    totalSquareFootage: {
      type: 'number',
      label: 'Total Square Footage',
      description: 'Total square footage of the property',
      required: true,
      min: 1000,
      max: 1000000,
      step: 100,
      placeholder: '150000'
    },
    landArea: {
      type: 'number',
      label: 'Land Area (acres)',
      description: 'Total land area in acres',
      required: true,
      min: 0.1,
      max: 1000,
      step: 0.1,
      placeholder: '5.0'
    },
    buildingAge: {
      type: 'number',
      label: 'Building Age (years)',
      description: 'Age of the building in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15'
    },
    lastRenovationYear: {
      type: 'number',
      label: 'Last Renovation Year',
      description: 'Year of last major renovation',
      required: true,
      min: 1900,
      max: 2030,
      step: 1,
      placeholder: '2020'
    },
    
    // Market Information
    marketType: {
      type: 'select',
      label: 'Market Type',
      description: 'Primary market type',
      required: true,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'airport', label: 'Airport' },
        { value: 'resort', label: 'Resort' },
        { value: 'business', label: 'Business' },
        { value: 'leisure', label: 'Leisure' },
        { value: 'mixed', label: 'Mixed' }
      ],
      placeholder: 'urban'
    },
    competitionLevel: {
      type: 'select',
      label: 'Competition Level',
      description: 'Level of competition in the market',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'moderate'
    },
    marketDemand: {
      type: 'select',
      label: 'Market Demand',
      description: 'Overall market demand level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'high'
    },
    seasonality: {
      type: 'select',
      label: 'Seasonality',
      description: 'Level of seasonal variation',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'extreme', label: 'Extreme' }
      ],
      placeholder: 'moderate'
    },
    averageMarketADR: {
      type: 'number',
      label: 'Average Market ADR ($)',
      description: 'Average daily rate in the market',
      required: true,
      min: 50,
      max: 2000,
      step: 10,
      placeholder: '150'
    },
    averageMarketOccupancy: {
      type: 'number',
      label: 'Average Market Occupancy (%)',
      description: 'Average occupancy rate in the market',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '70'
    },
    
    // Financial Projections
    projectedADR: {
      type: 'object',
      label: 'Projected ADR by Room Type',
      description: 'Projected average daily rates',
      required: true,
      properties: {
        standard: {
          type: 'number',
          label: 'Standard Room ADR ($)',
          min: 0,
          step: 5
        },
        deluxe: {
          type: 'number',
          label: 'Deluxe Room ADR ($)',
          min: 0,
          step: 5
        },
        suite: {
          type: 'number',
          label: 'Suite ADR ($)',
          min: 0,
          step: 5
        },
        presidential: {
          type: 'number',
          label: 'Presidential Suite ADR ($)',
          min: 0,
          step: 10
        }
      }
    },
    projectedOccupancy: {
      type: 'number',
      label: 'Projected Occupancy (%)',
      description: 'Projected occupancy rate',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '75'
    },
    averageLengthOfStay: {
      type: 'number',
      label: 'Average Length of Stay (days)',
      description: 'Average guest length of stay',
      required: true,
      min: 1,
      max: 365,
      step: 0.1,
      placeholder: '2.5'
    },
    revenuePerAvailableRoom: {
      type: 'number',
      label: 'Revenue Per Available Room ($)',
      description: 'Projected RevPAR',
      required: true,
      min: 0,
      max: 1000,
      step: 1,
      placeholder: '112'
    },
    
    // Capital Investment
    acquisitionCost: {
      type: 'number',
      label: 'Acquisition Cost ($)',
      description: 'Total acquisition cost',
      required: true,
      min: 100000,
      max: 1000000000,
      step: 10000,
      placeholder: '15000000'
    },
    renovationCost: {
      type: 'number',
      label: 'Renovation Cost ($)',
      description: 'Estimated renovation costs',
      required: true,
      min: 0,
      max: 50000000,
      step: 10000,
      placeholder: '2000000'
    },
    furnitureFixturesEquipment: {
      type: 'number',
      label: 'Furniture, Fixtures & Equipment ($)',
      description: 'FF&E costs',
      required: true,
      min: 0,
      max: 20000000,
      step: 10000,
      placeholder: '1000000'
    },
    workingCapital: {
      type: 'number',
      label: 'Working Capital ($)',
      description: 'Working capital requirements',
      required: true,
      min: 0,
      max: 5000000,
      step: 10000,
      placeholder: '500000'
    },
    totalInvestment: {
      type: 'number',
      label: 'Total Investment ($)',
      description: 'Total investment amount',
      required: true,
      min: 100000,
      max: 1000000000,
      step: 10000,
      placeholder: '18500000'
    },
    
    // Financing
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Total loan amount',
      required: true,
      min: 0,
      max: 1000000000,
      step: 10000,
      placeholder: '12000000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Loan term in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '25'
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Down payment amount',
      required: true,
      min: 0,
      max: 1000000000,
      step: 10000,
      placeholder: '3000000'
    },
    equityContribution: {
      type: 'number',
      label: 'Equity Contribution ($)',
      description: 'Total equity contribution',
      required: true,
      min: 0,
      max: 1000000000,
      step: 10000,
      placeholder: '6500000'
    },
    
    // Revenue Streams
    roomRevenue: {
      type: 'number',
      label: 'Room Revenue ($)',
      description: 'Annual room revenue',
      required: true,
      min: 0,
      max: 100000000,
      step: 10000,
      placeholder: '6000000'
    },
    foodBeverageRevenue: {
      type: 'number',
      label: 'Food & Beverage Revenue ($)',
      description: 'Annual F&B revenue',
      required: true,
      min: 0,
      max: 50000000,
      step: 10000,
      placeholder: '1200000'
    },
    meetingSpaceRevenue: {
      type: 'number',
      label: 'Meeting Space Revenue ($)',
      description: 'Annual meeting space revenue',
      required: true,
      min: 0,
      max: 20000000,
      step: 10000,
      placeholder: '300000'
    },
    otherRevenue: {
      type: 'number',
      label: 'Other Revenue ($)',
      description: 'Other revenue streams',
      required: true,
      min: 0,
      max: 10000000,
      step: 10000,
      placeholder: '100000'
    },
    
    // Market Analysis
    targetMarket: {
      type: 'array',
      label: 'Target Market',
      description: 'Primary target markets',
      required: true,
      items: {
        type: 'text'
      },
      placeholder: ['Business travelers', 'Leisure guests', 'Groups']
    },
    competitiveAdvantages: {
      type: 'array',
      label: 'Competitive Advantages',
      description: 'Key competitive advantages',
      required: true,
      items: {
        type: 'text'
      },
      placeholder: ['Prime location', 'Modern amenities', 'Excellent service']
    },
    marketChallenges: {
      type: 'array',
      label: 'Market Challenges',
      description: 'Key market challenges',
      required: true,
      items: {
        type: 'text'
      },
      placeholder: ['Seasonal demand', 'Competition', 'Economic factors']
    },
    growthPotential: {
      type: 'select',
      label: 'Growth Potential',
      description: 'Market growth potential',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'high'
    },
    
    // Risk Factors
    marketRisk: {
      type: 'select',
      label: 'Market Risk',
      description: 'Market-related risk level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'moderate'
    },
    operationalRisk: {
      type: 'select',
      label: 'Operational Risk',
      description: 'Operational risk level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'moderate'
    },
    financialRisk: {
      type: 'select',
      label: 'Financial Risk',
      description: 'Financial risk level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'moderate'
    },
    regulatoryRisk: {
      type: 'select',
      label: 'Regulatory Risk',
      description: 'Regulatory risk level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'low'
    }
  },
  
  calculate: calculateHotelFeasibility,
  validate: validateHotelFeasibilityInputs
};
