export interface PricePerSquareFootInputs {
  // Property details
  propertyPrice: number;
  totalSquareFootage: number;
  livingAreaSquareFootage: number;
  lotSizeSquareFootage: number;

  // Location details
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;

  // Property type
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family' | 'Commercial' | 'Land';

  // Market data
  averagePricePerSqFt: number; // Market average
  medianPricePerSqFt: number; // Market median
  pricePerSqFtRangeLow: number;
  pricePerSqFtRangeHigh: number;

  // Property features
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  yearBuilt: number;
  lotSizeAcres: number;

  // Condition and quality
  propertyCondition: 'Poor' | 'Fair' | 'Good' | 'Excellent' | 'New';
  kitchenQuality: 'Basic' | 'Standard' | 'Upgraded' | 'Luxury';
  bathroomQuality: 'Basic' | 'Standard' | 'Upgraded' | 'Luxury';

  // Market conditions
  marketTrend: 'Buyers' | 'Sellers' | 'Balanced';
  daysOnMarket: number;
  comparableSalesCount: number;

  // Financial details
  annualPropertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;

  // Analysis options
  includeLotSize: boolean;
  analysisType: 'Basic' | 'Detailed' | 'Comparative';
  comparisonProperties: Array<{
    address: string;
    price: number;
    squareFootage: number;
    saleDate: string;
    distance: number; // miles from subject property
  }>;
}

export interface PricePerSquareFootOutputs {
  // Basic calculations
  pricePerTotalSqFt: number;
  pricePerLivingSqFt: number;
  pricePerLotSqFt: number;

  // Market analysis
  marketComparison: 'Below Market' | 'At Market' | 'Above Market';
  marketAdjustment: number; // percentage difference from market average
  marketPercentile: number; // percentile ranking in market

  // Value analysis
  estimatedFairMarketValue: number;
  valueRangeLow: number;
  valueRangeHigh: number;

  // Comparative analysis
  averageComparablePricePerSqFt: number;
  comparableAdjustment: number; // percentage
  comparableScore: number; // 0-100 quality score

  // Property metrics
  pricePerBedroom: number;
  pricePerBathroom: number;
  pricePerGarageSpace: number;

  // Cost analysis
  annualCostPerSqFt: number;
  totalMonthlyCostPerSqFt: number;

  // Investment analysis
  rentalYieldPerSqFt: number; // if rental income provided
  capRatePerSqFt: number; // if NOI provided

  // Quality adjustments
  conditionAdjustment: number; // percentage
  qualityAdjustment: number; // percentage
  locationAdjustment: number; // percentage

  // Market timing
  marketTimingScore: number; // 0-100
  optimalSellingTime: string; // recommended time to sell

  // Risk assessment
  marketVolatility: 'Low' | 'Medium' | 'High';
  pricingRisk: 'Low' | 'Medium' | 'High';
  marketRisk: 'Low' | 'Medium' | 'High';

  // Recommendations
  pricingStrategy: 'Aggressive' | 'Competitive' | 'Conservative';
  marketingRecommendations: string[];
  negotiationTips: string[];

  // Future projections
  projectedValue1Year: number;
  projectedValue3Years: number;
  projectedValue5Years: number;
  annualAppreciationRate: number;

  // Neighborhood analysis
  neighborhoodAveragePricePerSqFt: number;
  neighborhoodMedianPricePerSqFt: number;
  neighborhoodPriceRange: {
    low: number;
    high: number;
  };

  // Property type analysis
  propertyTypeAveragePricePerSqFt: number;
  propertyTypeMedianPricePerSqFt: number;

  // Size analysis
  sizeCategory: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  sizeAdjustment: number; // percentage

  // Age analysis
  propertyAge: number;
  ageAdjustment: number; // percentage

  // Feature analysis
  bedroomAdjustment: number; // percentage per bedroom
  bathroomAdjustment: number; // percentage per bathroom
  garageAdjustment: number; // percentage per space

  // Seasonal analysis
  seasonalAdjustment: number; // percentage
  bestSellingMonth: string;

  // Economic indicators
  localEconomicHealth: 'Weak' | 'Moderate' | 'Strong';
  employmentRate: number;
  populationGrowth: number;

  // Investment potential
  investmentGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  rentalDemand: 'Low' | 'Medium' | 'High';
  appreciationPotential: 'Low' | 'Medium' | 'High';

  // Tax implications
  propertyTaxRate: number; // mills or percentage
  taxAssessmentRatio: number; // percentage of market value
  taxSavingsPotential: number;

  // Insurance costs
  insuranceCostPerSqFt: number;
  floodRisk: 'Low' | 'Medium' | 'High';

  // Maintenance costs
  estimatedMaintenancePerSqFt: number;
  annualMaintenanceCost: number;

  // Energy efficiency
  energyRating: 'A' | 'B' | 'C' | 'D' | 'F';
  energyCostPerSqFt: number;
  energySavingsPotential: number;

  // Environmental factors
  environmentalRisk: 'Low' | 'Medium' | 'High';
  naturalHazardRisk: 'Low' | 'Medium' | 'High';

  // Accessibility and amenities
  walkabilityScore: number; // 0-100
  amenityScore: number; // 0-100
  schoolDistrictRating: number; // 0-10

  // Transportation
  commuteTime: number; // minutes
  publicTransportAccess: 'Poor' | 'Fair' | 'Good' | 'Excellent';

  // Demographic analysis
  medianHouseholdIncome: number;
  averageAge: number;
  educationLevel: 'Low' | 'Medium' | 'High';

  // Market forecast
  shortTermOutlook: 'Declining' | 'Stable' | 'Growing';
  longTermOutlook: 'Declining' | 'Stable' | 'Growing';
  forecastConfidence: 'Low' | 'Medium' | 'High';
}