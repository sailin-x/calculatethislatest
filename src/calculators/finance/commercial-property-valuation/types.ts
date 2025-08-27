export interface CommercialPropertyValuationInputs {
  propertyType: 'office' | 'retail' | 'warehouse' | 'industrial' | 'multifamily' | 'hotel' | 'restaurant' | 'medical' | 'mixed-use';
  squareFootage: number;
  yearBuilt: number;
  location: string;
  currentIncome: number;
  operatingExpenses: number;
  vacancyRate: number;
  marketCapRate: number;
  comparableSales: Array<{
    price: number;
    squareFootage: number;
    capRate: number;
    yearBuilt: number;
  }>;
  marketTrends: {
    appreciationRate: number;
    rentGrowthRate: number;
    capRateTrend: number;
  };
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor';
  zoning: string;
  environmentalFactors: {
    floodRisk: boolean;
    earthquakeRisk: boolean;
    environmentalHazards: boolean;
  };
}

export interface ValuationMetrics {
  incomeApproach: number;
  salesComparisonApproach: number;
  costApproach: number;
  finalValuation: number;
  valuePerSquareFoot: number;
  capRate: number;
  noi: number;
  grossRentMultiplier: number;
  pricePerUnit: number;
  landValue: number;
  buildingValue: number;
  depreciation: number;
  marketAdjustments: number;
  finalAdjustment: number;
}

export interface ValuationAnalysis {
  valuationMethod: string;
  confidenceLevel: string;
  marketPosition: string;
  investmentGrade: string;
  recommendations: string;
  riskFactors: string[];
}

export interface CommercialPropertyValuationOutputs extends ValuationMetrics {
  analysis: ValuationAnalysis;
}
