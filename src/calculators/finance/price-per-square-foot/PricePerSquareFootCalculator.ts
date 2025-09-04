import { Calculator } from '../../../types/calculator';

export const pricePerSquareFootCalculator: Calculator = {
  id: 'price-per-square-foot',
  title: 'Price Per Square Foot Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate and analyze property prices per square foot for real estate valuation and comparison.',
  usageInstructions: [
    'Enter the property price and total square footage',
    'Input additional property details like bedrooms, bathrooms, and lot size',
    'Set property type and location factors',
    'Include market comparison data if available',
    'Review price per square foot analysis and market insights'
  ],
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Property Price',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'Total sale price or asking price of the property',
      placeholder: '450000'
    },
    {
      id: 'totalSquareFootage',
      label: 'Total Square Footage',
      type: 'number',
      required: true,
      min: 100,
      max: 10000,
      step: 10,
      tooltip: 'Total livable square footage of the property',
      placeholder: '2500'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'condo', label: 'Condominium' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Land/Lot' }
      ],
      defaultValue: 'single_family',
      tooltip: 'Type of property being analyzed',
      placeholder: 'single_family'
    },
    {
      id: 'bedrooms',
      label: 'Number of Bedrooms',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 1,
      tooltip: 'Number of bedrooms in the property',
      placeholder: '3'
    },
    {
      id: 'bathrooms',
      label: 'Number of Bathrooms',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.5,
      tooltip: 'Number of bathrooms in the property',
      placeholder: '2.5'
    },
    {
      id: 'lotSize',
      label: 'Lot Size (Square Feet)',
      type: 'number',
      required: false,
      min: 0,
      step: 100,
      tooltip: 'Total lot size in square feet',
      placeholder: '8000'
    },
    {
      id: 'yearBuilt',
      label: 'Year Built',
      type: 'number',
      required: false,
      min: 1800,
      max: 2030,
      step: 1,
      tooltip: 'Year the property was built',
      placeholder: '1995'
    },
    {
      id: 'locationFactor',
      label: 'Location Factor',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent (Prime location)' },
        { value: 'very-good', label: 'Very Good (Desirable area)' },
        { value: 'good', label: 'Good (Average area)' },
        { value: 'fair', label: 'Fair (Less desirable area)' },
        { value: 'poor', label: 'Poor (Undesirable area)' }
      ],
      defaultValue: 'good',
      tooltip: 'Relative desirability of the property location',
      placeholder: 'good'
    },
    {
      id: 'conditionRating',
      label: 'Property Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'excellent', label: 'Excellent (Like new)' },
        { value: 'very-good', label: 'Very Good (Minor updates needed)' },
        { value: 'good', label: 'Good (Some updates needed)' },
        { value: 'fair', label: 'Fair (Major updates needed)' },
        { value: 'poor', label: 'Poor (Extensive work needed)' }
      ],
      defaultValue: 'good',
      tooltip: 'Overall condition of the property',
      placeholder: 'good'
    },
    {
      id: 'marketAveragePSF',
      label: 'Market Average PSF',
      type: 'currency',
      required: false,
      min: 50,
      max: 2000,
      step: 10,
      tooltip: 'Average price per square foot in the local market',
      placeholder: '180'
    },
    {
      id: 'comparablePSF1',
      label: 'Comparable Property 1 PSF',
      type: 'currency',
      required: false,
      min: 50,
      max: 2000,
      step: 10,
      tooltip: 'Price per square foot of comparable property 1',
      placeholder: '175'
    },
    {
      id: 'comparablePSF2',
      label: 'Comparable Property 2 PSF',
      type: 'currency',
      required: false,
      min: 50,
      max: 2000,
      step: 10,
      tooltip: 'Price per square foot of comparable property 2',
      placeholder: '185'
    },
    {
      id: 'comparablePSF3',
      label: 'Comparable Property 3 PSF',
      type: 'currency',
      required: false,
      min: 50,
      max: 2000,
      step: 10,
      tooltip: 'Price per square foot of comparable property 3',
      placeholder: '190'
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate',
      type: 'percentage',
      required: false,
      min: 0,
      max: 15,
      step: 0.25,
      defaultValue: 2.5,
      tooltip: 'Expected annual inflation rate for future projections',
      placeholder: '2.5'
    },
    {
      id: 'projectionYears',
      label: 'Projection Years',
      type: 'number',
      required: false,
      min: 1,
      max: 20,
      step: 1,
      defaultValue: 5,
      tooltip: 'Number of years for future price projections',
      placeholder: '5'
    }
  ],
  outputs: [
    {
      id: 'pricePerSquareFoot',
      label: 'Price Per Square Foot',
      type: 'currency',
      explanation: 'Calculated price per square foot of the property'
    },
    {
      id: 'pricePerBedroom',
      label: 'Price Per Bedroom',
      type: 'currency',
      explanation: 'Price per bedroom (if bedrooms specified)'
    },
    {
      id: 'pricePerBathroom',
      label: 'Price Per Bathroom',
      type: 'currency',
      explanation: 'Price per bathroom (if bathrooms specified)'
    },
    {
      id: 'lotPricePerSquareFoot',
      label: 'Lot Price Per Square Foot',
      type: 'currency',
      explanation: 'Price per square foot of the lot (if lot size specified)'
    },
    {
      id: 'buildingPricePerSquareFoot',
      label: 'Building Price Per Square Foot',
      type: 'currency',
      explanation: 'Price per square foot of just the building (excluding lot)'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'percentage',
      explanation: 'How the property compares to market average (percentage)'
    },
    {
      id: 'comparablesAnalysis',
      label: 'Comparables Analysis',
      type: 'text',
      explanation: 'Analysis of how the property compares to similar properties'
    },
    {
      id: 'valueAssessment',
      label: 'Value Assessment',
      type: 'text',
      explanation: 'Overall assessment of property value based on PSF analysis'
    },
    {
      id: 'futureProjection',
      label: 'Future Price Projection',
      type: 'currency',
      explanation: 'Projected future price based on inflation and market trends'
    },
    {
      id: 'investmentAnalysis',
      label: 'Investment Analysis',
      type: 'text',
      explanation: 'Analysis of the property as an investment opportunity'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations based on the analysis'
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'text',
      explanation: 'Potential risk factors to consider'
    }
  ],
  formulas: [
    {
      id: 'price-per-square-foot-analysis',
      name: 'Price Per Square Foot Analysis',
      description: 'Comprehensive analysis of property pricing and market comparison',
      calculate: (inputs: Record<string, any>) => {
        // Extract and validate inputs
        const {
          propertyPrice = 0,
          totalSquareFootage = 0,
          propertyType = 'single-family',
          bedrooms = 0,
          bathrooms = 0,
          lotSize = 0,
          yearBuilt = 0,
          locationFactor = 'good',
          conditionRating = 'good',
          marketAveragePSF = 0,
          comparablePSF1 = 0,
          comparablePSF2 = 0,
          comparablePSF3 = 0,
          inflationRate = 2.5,
          projectionYears = 5
        } = inputs;

        // Calculate basic price per square foot
        const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
        
        // Calculate price per bedroom and bathroom
        const pricePerBedroom = bedrooms > 0 ? propertyPrice / bedrooms : 0;
        const pricePerBathroom = bathrooms > 0 ? propertyPrice / bathrooms : 0;
        
        // Calculate lot and building prices
        const lotPricePerSquareFoot = lotSize > 0 ? propertyPrice / lotSize : 0;
        const buildingPricePerSquareFoot = totalSquareFootage > 0 ? (propertyPrice - (lotSize * 10)) / totalSquareFootage : pricePerSquareFoot; // Assume $10/sqft for lot
        
        // Market comparison analysis
        const marketComparison = marketAveragePSF > 0 ? ((pricePerSquareFoot - marketAveragePSF) / marketAveragePSF) * 100 : 0;
        
        // Comparables analysis
        const comparablesAnalysis = generateComparablesAnalysis(
          pricePerSquareFoot,
          comparablePSF1,
          comparablePSF2,
          comparablePSF3
        );
        
        // Value assessment
        const valueAssessment = generateValueAssessment(
          pricePerSquareFoot,
          marketAveragePSF,
          locationFactor,
          conditionRating,
          propertyType
        );
        
        // Future projection
        const futureProjection = propertyPrice * Math.pow(1 + inflationRate / 100, projectionYears);
        
        // Investment analysis
        const investmentAnalysis = generateInvestmentAnalysis(
          pricePerSquareFoot,
          marketAveragePSF,
          locationFactor,
          conditionRating,
          yearBuilt
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          pricePerSquareFoot,
          marketAveragePSF,
          marketComparison,
          locationFactor,
          conditionRating
        );
        
        // Identify risk factors
        const riskFactors = generateRiskFactors(
          pricePerSquareFoot,
          marketAveragePSF,
          marketComparison,
          conditionRating,
          yearBuilt
        );

        return {
          outputs: {
            pricePerSquareFoot: Math.round(pricePerSquareFoot * 100) / 100,
            pricePerBedroom: Math.round(pricePerBedroom),
            pricePerBathroom: Math.round(pricePerBathroom),
            lotPricePerSquareFoot: Math.round(lotPricePerSquareFoot * 100) / 100,
            buildingPricePerSquareFoot: Math.round(buildingPricePerSquareFoot * 100) / 100,
            marketComparison: Math.round(marketComparison * 100) / 100,
            comparablesAnalysis,
            valueAssessment,
            futureProjection: Math.round(futureProjection),
            investmentAnalysis,
            recommendations,
            riskFactors
          },
          explanation: `Price per square foot: $${pricePerSquareFoot.toFixed(2)}. Market comparison: ${marketComparison > 0 ? '+' : ''}${marketComparison.toFixed(1)}% vs. market average.`,
          intermediateSteps: {
            propertyType,
            locationFactor,
            conditionRating,
            yearBuilt,
            inflationRate,
            projectionYears
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'propertyPrice',
      message: 'Property price is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'totalSquareFootage',
      message: 'Total square footage is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'propertyType',
      message: 'Property type is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'range',
      field: 'propertyPrice',
      message: 'Property price must be between $10,000 and $50,000,000',
      validator: (value: any) => value >= 10000 && value <= 50000000
    },
    {
      type: 'range',
      field: 'totalSquareFootage',
      message: 'Total square footage must be between 100 and 10,000 square feet',
      validator: (value: any) => value >= 100 && value <= 10000
    },
    {
      type: 'range',
      field: 'bedrooms',
      message: 'Number of bedrooms must be between 0 and 10',
      validator: (value: any) => value >= 0 && value <= 10
    },
    {
      type: 'range',
      field: 'bathrooms',
      message: 'Number of bathrooms must be between 0 and 10',
      validator: (value: any) => value >= 0 && value <= 10
    },
    {
      type: 'range',
      field: 'lotSize',
      message: 'Lot size must be between 0 and 100,000 square feet',
      validator: (value: any) => value >= 0 && value <= 100000
    },
    {
      type: 'range',
      field: 'yearBuilt',
      message: 'Year built must be between 1800 and 2030',
      validator: (value: any) => value >= 1800 && value <= 2030
    },
    {
      type: 'range',
      field: 'marketAveragePSF',
      message: 'Market average PSF must be between $50 and $2,000',
      validator: (value: any) => value >= 50 && value <= 2000
    },
    {
      type: 'range',
      field: 'inflationRate',
      message: 'Inflation rate must be between 0% and 15%',
      validator: (value: any) => value >= 0 && value <= 15
    },
    {
      type: 'range',
      field: 'projectionYears',
      message: 'Projection years must be between 1 and 20',
      validator: (value: any) => value >= 1 && value <= 20
    },
    {
      type: 'business',
      field: 'totalSquareFootage',
      message: 'Square footage should be reasonable for the property type',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyType = allInputs.propertyType || 'single-family';
        const bedrooms = allInputs.bedrooms || 0;
        
        if (propertyType === 'single-family' && bedrooms > 0) {
          const minSqFt = bedrooms * 200; // Minimum 200 sqft per bedroom
          const maxSqFt = bedrooms * 500; // Maximum 500 sqft per bedroom
          return value >= minSqFt && value <= maxSqFt;
        }
        
        return true;
      }
    },
    {
      type: 'business',
      field: 'propertyPrice',
      message: 'Property price should be reasonable for the square footage',
      validator: (value: any, allInputs: Record<string, any>) => {
        const totalSquareFootage = allInputs.totalSquareFootage || 0;
        if (totalSquareFootage === 0) return true;
        
        const pricePerSqFt = value / totalSquareFootage;
        return pricePerSqFt >= 50 && pricePerSqFt <= 2000; // Reasonable PSF range
      }
    }
  ],
  examples: [
    {
      title: 'Single Family Home Analysis',
      description: 'A typical single-family home with standard features',
      inputs: {
        propertyPrice: 450000,
        totalSquareFootage: 2500,
        propertyType: 'single_family',
        bedrooms: 3,
        bathrooms: 2.5,
        lotSize: 8000,
        yearBuilt: 1995,
        locationFactor: 'good',
        conditionRating: 'good',
        marketAveragePSF: 180,
        comparablePSF1: 175,
        comparablePSF2: 185,
        comparablePSF3: 190,
        inflationRate: 2.5,
        projectionYears: 5
      },
      expectedOutputs: {
        pricePerSquareFoot: 180.0,
        pricePerBedroom: 150000,
        pricePerBathroom: 180000,
        marketComparison: 0.0
      }
    },
    {
      title: 'Luxury Condo Analysis',
      description: 'A high-end condominium in a prime location',
      inputs: {
        propertyPrice: 1200000,
        totalSquareFootage: 1800,
        propertyType: 'condo',
        bedrooms: 2,
        bathrooms: 2,
        lotSize: 0,
        yearBuilt: 2010,
        locationFactor: 'excellent',
        conditionRating: 'excellent',
        marketAveragePSF: 400,
        comparablePSF1: 425,
        comparablePSF2: 410,
        comparablePSF3: 395,
        inflationRate: 3.0,
        projectionYears: 5
      },
      expectedOutputs: {
        pricePerSquareFoot: 666.67,
        pricePerBedroom: 600000,
        pricePerBathroom: 600000,
        marketComparison: 66.7
      }
    }
  ]
};

// Helper functions
function generateComparablesAnalysis(
  propertyPSF: number,
  comp1PSF: number,
  comp2PSF: number,
  comp3PSF: number
): string {
  const comparables = [comp1PSF, comp2PSF, comp3PSF].filter(psf => psf > 0);
  
  if (comparables.length === 0) {
    return 'No comparable properties provided for analysis.';
  }
  
  const avgComparablePSF = comparables.reduce((sum, psf) => sum + psf, 0) / comparables.length;
  const difference = ((propertyPSF - avgComparablePSF) / avgComparablePSF) * 100;
  
  if (Math.abs(difference) <= 5) {
    return `Property is priced competitively at ${difference > 0 ? '+' : ''}${difference.toFixed(1)}% vs. comparable properties.`;
  } else if (difference > 5) {
    return `Property is priced ${difference.toFixed(1)}% above comparable properties - may be overpriced.`;
  } else {
    return `Property is priced ${Math.abs(difference).toFixed(1)}% below comparable properties - may be a good value.`;
  }
}

function generateValueAssessment(
  propertyPSF: number,
  marketAveragePSF: number,
  locationFactor: string,
  conditionRating: string,
  propertyType: string
): string {
  const assessments = [];
  
  if (marketAveragePSF > 0) {
    if (propertyPSF <= marketAveragePSF * 0.9) {
      assessments.push('Property appears to be priced below market value');
    } else if (propertyPSF >= marketAveragePSF * 1.1) {
      assessments.push('Property appears to be priced above market value');
    } else {
      assessments.push('Property is priced within market range');
    }
  }
  
  if (locationFactor === 'excellent') {
    assessments.push('Prime location justifies premium pricing');
  } else if (locationFactor === 'poor') {
    assessments.push('Location may negatively impact value');
  }
  
  if (conditionRating === 'excellent') {
    assessments.push('Excellent condition supports higher pricing');
  } else if (conditionRating === 'poor') {
    assessments.push('Poor condition may require price adjustment');
  }
  
  if (propertyType === 'land') {
    assessments.push('Land value analysis focuses on development potential');
  }
  
  return assessments.join('. ');
}

function generateInvestmentAnalysis(
  propertyPSF: number,
  marketAveragePSF: number,
  locationFactor: string,
  conditionRating: string,
  yearBuilt: number
): string {
  const analysis = [];
  
  if (marketAveragePSF > 0 && propertyPSF < marketAveragePSF * 0.9) {
    analysis.push('Potential value investment opportunity');
  }
  
  if (locationFactor === 'excellent' || locationFactor === 'very-good') {
    analysis.push('Strong location fundamentals for long-term appreciation');
  }
  
  if (conditionRating === 'poor' || conditionRating === 'fair') {
    analysis.push('Renovation potential could increase value significantly');
  }
  
  if (yearBuilt > 0) {
    const age = new Date().getFullYear() - yearBuilt;
    if (age < 10) {
      analysis.push('Newer construction with minimal maintenance needs');
    } else if (age > 30) {
      analysis.push('Older property may require updates but offers character');
    }
  }
  
  return analysis.join('. ');
}

function generateRecommendations(
  propertyPSF: number,
  marketAveragePSF: number,
  marketComparison: number,
  locationFactor: string,
  conditionRating: string
): string {
  const recommendations = [];
  
  if (marketComparison > 10) {
    recommendations.push('Consider negotiating price down to align with market');
  } else if (marketComparison < -10) {
    recommendations.push('Property may be undervalued - good buying opportunity');
  }
  
  if (locationFactor === 'poor') {
    recommendations.push('Factor in location risks when making offer');
  }
  
  if (conditionRating === 'poor') {
    recommendations.push('Get thorough inspection and factor in renovation costs');
  }
  
  if (Math.abs(marketComparison) <= 5) {
    recommendations.push('Price appears fair for current market conditions');
  }
  
  return recommendations.join('. ');
}

function generateRiskFactors(
  propertyPSF: number,
  marketAveragePSF: number,
  marketComparison: number,
  conditionRating: string,
  yearBuilt: number
): string {
  const risks = [];
  
  if (marketComparison > 15) {
    risks.push('Significantly overpriced relative to market');
  }
  
  if (conditionRating === 'poor') {
    risks.push('Poor condition may require substantial investment');
  }
  
  if (yearBuilt > 0) {
    const age = new Date().getFullYear() - yearBuilt;
    if (age > 50) {
      risks.push('Older property may have structural or system issues');
    }
  }
  
  if (marketAveragePSF === 0) {
    risks.push('Limited market data available for comparison');
  }
  
  if (risks.length === 0) {
    risks.push('No significant risk factors identified');
  }
  
  return risks.join('. ');
}