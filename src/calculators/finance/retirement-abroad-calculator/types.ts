export interface RetirementAbroadInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyRetirementIncome: number;
  targetCountry: 'portugal' | 'spain' | 'mexico' | 'panama' | 'thailand' | 'malaysia' | 'costa_rica' | 'ecuador' | 'uruguay' | 'chile';
  residencyType: 'temporary' | 'permanent' | 'citizenship';
  includeHealthcare: boolean;
  healthcareCost: number;
  housingCost: number;
  costOfLivingAdjustment: number;
  expectedReturn: number;
  inflationRate: number;
  currencyExchangeRate: number;
  taxRate: number;
}

export interface RetirementAbroadResults {
  totalRetirementSavings: number;
  annualRetirementCost: number;
  monthlyRetirementCost: number;
  yearsOfRetirement: number;
  savingsShortfall: number;
  healthcareCosts: number;
  housingCosts: number;
  totalAnnualExpenses: number;
  netMonthlyIncome: number;
  retirementReadiness: string;
}

export interface RetirementAbroadMetrics {
  costOfLivingIndex: number;
  healthcareQuality: 'low' | 'medium' | 'high';
  safetyIndex: 'low' | 'medium' | 'high';
  visaEase: 'difficult' | 'moderate' | 'easy';
  taxEfficiency: number;
  lifestyleQuality: 'basic' | 'comfortable' | 'luxury';
}