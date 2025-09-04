import { Formula, CalculationResult } from '../../../types/calculator';

export const pricePerSquareFootFormulas: Formula[] = [
  {
    id: 'basic-psf-calculation',
    name: 'Basic Price Per Square Foot',
    description: 'Calculate the basic price per square foot of the property',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, totalSquareFootage = 0 } = inputs;
      
      const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      
      return {
        outputs: {
          pricePerSquareFoot: Math.round(pricePerSquareFoot * 100) / 100
        },
        explanation: `Price per square foot: $${pricePerSquareFoot.toFixed(2)}`,
        intermediateSteps: {
          propertyPrice,
          totalSquareFootage
        }
      };
    }
  },
  {
    id: 'price-per-room-calculation',
    name: 'Price Per Room Analysis',
    description: 'Calculate price per bedroom and bathroom',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, bedrooms = 0, bathrooms = 0 } = inputs;
      
      const pricePerBedroom = bedrooms > 0 ? propertyPrice / bedrooms : 0;
      const pricePerBathroom = bathrooms > 0 ? propertyPrice / bathrooms : 0;
      
      return {
        outputs: {
          pricePerBedroom: Math.round(pricePerBedroom),
          pricePerBathroom: Math.round(pricePerBathroom)
        },
        explanation: `Price per bedroom: $${pricePerBedroom.toLocaleString()}, Price per bathroom: $${pricePerBathroom.toLocaleString()}`,
        intermediateSteps: {
          propertyPrice,
          bedrooms,
          bathrooms
        }
      };
    }
  },
  {
    id: 'lot-and-building-analysis',
    name: 'Lot and Building Price Analysis',
    description: 'Separate lot value from building value for PSF analysis',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, totalSquareFootage = 0, lotSize = 0 } = inputs;
      
      const lotPricePerSquareFoot = lotSize > 0 ? propertyPrice / lotSize : 0;
      const buildingPricePerSquareFoot = totalSquareFootage > 0 ? (propertyPrice - (lotSize * 10)) / totalSquareFootage : 0; // Assume $10/sqft for lot
      
      return {
        outputs: {
          lotPricePerSquareFoot: Math.round(lotPricePerSquareFoot * 100) / 100,
          buildingPricePerSquareFoot: Math.round(buildingPricePerSquareFoot * 100) / 100
        },
        explanation: `Lot PSF: $${lotPricePerSquareFoot.toFixed(2)}, Building PSF: $${buildingPricePerSquareFoot.toFixed(2)}`,
        intermediateSteps: {
          propertyPrice,
          totalSquareFootage,
          lotSize,
          assumedLotValue: lotSize * 10
        }
      };
    }
  },
  {
    id: 'market-comparison-analysis',
    name: 'Market Comparison Analysis',
    description: 'Compare property PSF to market average',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, totalSquareFootage = 0, marketAveragePSF = 0 } = inputs;
      
      const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      const marketComparison = marketAveragePSF > 0 ? ((pricePerSquareFoot - marketAveragePSF) / marketAveragePSF) * 100 : 0;
      
      return {
        outputs: {
          pricePerSquareFoot: Math.round(pricePerSquareFoot * 100) / 100,
          marketComparison: Math.round(marketComparison * 100) / 100
        },
        explanation: `Market comparison: ${marketComparison > 0 ? '+' : ''}${marketComparison.toFixed(1)}% vs. market average`,
        intermediateSteps: {
          propertyPrice,
          totalSquareFootage,
          marketAveragePSF
        }
      };
    }
  },
  {
    id: 'comparables-analysis',
    name: 'Comparable Properties Analysis',
    description: 'Analyze how the property compares to similar properties',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, totalSquareFootage = 0, comparablePSF1 = 0, comparablePSF2 = 0, comparablePSF3 = 0 } = inputs;
      
      const propertyPSF = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      const comparablesAnalysis = generateComparablesAnalysis(
        propertyPSF,
        comparablePSF1,
        comparablePSF2,
        comparablePSF3
      );
      
      return {
        outputs: {
          comparablesAnalysis
        },
        explanation: 'Comparables analysis completed',
        intermediateSteps: {
          propertyPSF,
          comparablePSF1,
          comparablePSF2,
          comparablePSF3
        }
      };
    }
  },
  {
    id: 'value-assessment',
    name: 'Property Value Assessment',
    description: 'Overall assessment of property value based on PSF analysis',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        propertyPrice = 0,
        totalSquareFootage = 0,
        marketAveragePSF = 0,
        locationFactor = 'good',
        conditionRating = 'good',
        propertyType = 'single-family'
      } = inputs;
      
      const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      const valueAssessment = generateValueAssessment(
        pricePerSquareFoot,
        marketAveragePSF,
        locationFactor,
        conditionRating,
        propertyType
      );
      
      return {
        outputs: {
          valueAssessment
        },
        explanation: 'Value assessment completed',
        intermediateSteps: {
          pricePerSquareFoot,
          marketAveragePSF,
          locationFactor,
          conditionRating,
          propertyType
        }
      };
    }
  },
  {
    id: 'future-projection',
    name: 'Future Price Projection',
    description: 'Project future property value based on inflation and market trends',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { propertyPrice = 0, inflationRate = 2.5, projectionYears = 5 } = inputs;
      
      const futureProjection = propertyPrice * Math.pow(1 + inflationRate / 100, projectionYears);
      
      return {
        outputs: {
          futureProjection: Math.round(futureProjection)
        },
        explanation: `Projected value in ${projectionYears} years: $${futureProjection.toLocaleString()}`,
        intermediateSteps: {
          propertyPrice,
          inflationRate,
          projectionYears,
          growthFactor: Math.pow(1 + inflationRate / 100, projectionYears)
        }
      };
    }
  },
  {
    id: 'investment-analysis',
    name: 'Investment Analysis',
    description: 'Analyze the property as an investment opportunity',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        propertyPrice = 0,
        totalSquareFootage = 0,
        marketAveragePSF = 0,
        locationFactor = 'good',
        conditionRating = 'good',
        yearBuilt = 0
      } = inputs;
      
      const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      const investmentAnalysis = generateInvestmentAnalysis(
        pricePerSquareFoot,
        marketAveragePSF,
        locationFactor,
        conditionRating,
        yearBuilt
      );
      
      return {
        outputs: {
          investmentAnalysis
        },
        explanation: 'Investment analysis completed',
        intermediateSteps: {
          pricePerSquareFoot,
          marketAveragePSF,
          locationFactor,
          conditionRating,
          yearBuilt
        }
      };
    }
  },
  {
    id: 'recommendations-and-risks',
    name: 'Recommendations and Risk Analysis',
    description: 'Generate actionable recommendations and identify risk factors',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        propertyPrice = 0,
        totalSquareFootage = 0,
        marketAveragePSF = 0,
        locationFactor = 'good',
        conditionRating = 'good',
        yearBuilt = 0
      } = inputs;
      
      const pricePerSquareFoot = totalSquareFootage > 0 ? propertyPrice / totalSquareFootage : 0;
      const marketComparison = marketAveragePSF > 0 ? ((pricePerSquareFoot - marketAveragePSF) / marketAveragePSF) * 100 : 0;
      
      const recommendations = generateRecommendations(
        pricePerSquareFoot,
        marketAveragePSF,
        marketComparison,
        locationFactor,
        conditionRating
      );
      
      const riskFactors = generateRiskFactors(
        pricePerSquareFoot,
        marketAveragePSF,
        marketComparison,
        conditionRating,
        yearBuilt
      );
      
      return {
        outputs: {
          recommendations,
          riskFactors
        },
        explanation: 'Recommendations and risk analysis completed',
        intermediateSteps: {
          pricePerSquareFoot,
          marketAveragePSF,
          marketComparison,
          locationFactor,
          conditionRating,
          yearBuilt
        }
      };
    }
  }
];

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