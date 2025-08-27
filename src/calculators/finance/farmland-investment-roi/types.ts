export interface FarmlandInvestmentROIInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  acres: number;
  cropType: 'corn' | 'soybeans' | 'wheat' | 'cotton' | 'rice' | 'mixed' | 'custom';
  yieldPerAcre: number;
  cropPrice: number;
  operatingExpenses: {
    seed: number;
    fertilizer: number;
    pesticides: number;
    fuel: number;
    labor: number;
    equipment: number;
    insurance: number;
    propertyTax: number;
    otherExpenses: number;
  };
  governmentSubsidies: number;
  landAppreciationRate: number;
  inflationRate: number;
  taxRate: number;
  holdingPeriod: number;
  exitStrategy: 'sell' | 'lease' | 'develop' | 'inherit';
}

export interface FarmlandROIMetrics {
  totalInvestment: number;
  annualRevenue: number;
  annualExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  cashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalReturn: number;
  irr: number;
  paybackPeriod: number;
  breakEvenYield: number;
  landValueAppreciation: number;
  totalProfit: number;
  roi: number;
}

export interface FarmlandAnalysis {
  investmentGrade: string;
  riskAssessment: string;
  marketOutlook: string;
  recommendations: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface FarmlandInvestmentROIOutputs extends FarmlandROIMetrics {
  analysis: FarmlandAnalysis;
}
