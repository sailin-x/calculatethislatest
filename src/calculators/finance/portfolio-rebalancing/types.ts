export interface PortfolioRebalancingInputs {
  currentStocks: number;
  currentBonds: number;
  currentCash: number;
  targetStocks: number;
  targetBonds: number;
  targetCash: number;
  portfolioValue: number;
  rebalancingThreshold: number;
  transactionCost: number;
  taxRate: number;
}

export interface PortfolioRebalancingOutputs {
  stocksDeviation: number;
  bondsDeviation: number;
  cashDeviation: number;
  needsRebalancing: string;
  stocksTradeAmount: number;
  bondsTradeAmount: number;
  cashTradeAmount: number;
  totalTransactionCost: number;
  taxCost: number;
  netCost: number;
}