export interface CommodityInputs {
  currentPrice: number;
  quantity: number;
  purchasePrice: number;
  commodityType: 'gold' | 'silver' | 'oil' | 'copper' | 'corn' | 'wheat' | 'soybeans' | 'coffee' | 'sugar' | 'cotton' | 'other';
  leverageRatio?: number;
  marginRequirement?: number;
  contractSize?: number;
  transactionCosts?: number;
  storageCosts?: number;
  insuranceCosts?: number;
  holdingPeriod?: number;
  marketVolatility?: number;
  currencyExchangeRate?: number;
  taxRate?: number;
}

export interface CommodityOutputs {
  currentValue: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercentage: number;
  totalCosts: number;
  netGainLoss: number;
  netGainLossPercentage: number;
  marginUsed: number;
  marginAvailable: number;
  leverageRatio: number;
  breakEvenPrice: number;
  riskRewardRatio: number;
  volatilityAdjustedReturn: number;
  afterTaxGainLoss: number;
  roi: number;
  annualizedReturn: number;
}