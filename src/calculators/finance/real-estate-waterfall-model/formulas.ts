export interface RealEstateWaterfallModelInputs {
  totalEquity: number;
  investorEquity: number;
  sponsorEquity: number;
  totalCashFlow: number;
  preferredReturn: number;
  holdingPeriod: number;
  catchUpPercentage: number;
  promotePercentage: number;
  hurdleRate: number;
  waterfallType: string;
  clawbackProvision: string;
  clawbackPercentage: number;
  managementFee: number;
  acquisitionFee: number;
  dispositionFee: number;
  operatingExpenses: number;
  debtService: number;
  taxRate: number;
  inflationRate: number;
  exitValue: number;
  remainingDebt: number;
}

export interface RealEstateWaterfallModelOutputs {
  totalReturn: number;
  investorReturn: number;
  sponsorReturn: number;
  preferredReturnAmount: number;
  catchUpAmount: number;
  promoteAmount: number;
  investorProfit: number;
  sponsorProfit: number;
  investorIrr: number;
  sponsorIrr: number;
  equityMultiple: number;
  netPresentValue: number;
}

export function calculateRealEstateWaterfallModel(inputs: RealEstateWaterfallModelInputs): RealEstateWaterfallModelOutputs {
  // Calculate fees
  const managementFeeAmount = inputs.totalEquity * (inputs.managementFee / 100) * inputs.holdingPeriod;
  const acquisitionFeeAmount = inputs.totalEquity * (inputs.acquisitionFee / 100);
  const dispositionFeeAmount = inputs.exitValue * (inputs.dispositionFee / 100);
  const totalFees = managementFeeAmount + acquisitionFeeAmount + dispositionFeeAmount;

  // Calculate net cash flow after fees and expenses
  const netCashFlow = inputs.totalCashFlow - totalFees - inputs.operatingExpenses - inputs.debtService;

  // Calculate net proceeds from sale
  const netProceedsFromSale = inputs.exitValue - inputs.remainingDebt - dispositionFeeAmount;

  // Calculate total distributable proceeds
  const totalDistributableProceeds = netCashFlow + netProceedsFromSale;

  // Calculate waterfall distribution
  const waterfallResult = calculateWaterfallDistribution(
    inputs.totalEquity,
    inputs.investorEquity,
    inputs.sponsorEquity,
    inputs.preferredReturn,
    inputs.holdingPeriod,
    inputs.catchUpPercentage,
    inputs.promotePercentage,
    inputs.hurdleRate,
    totalDistributableProceeds,
    inputs.waterfallType,
    inputs.clawbackProvision,
    inputs.clawbackPercentage
  );

  // Calculate returns
  const totalReturn = (totalDistributableProceeds - inputs.totalEquity) / inputs.totalEquity;
  const investorReturn = (waterfallResult.investorProfit - inputs.investorEquity) / inputs.investorEquity;
  const sponsorReturn = (waterfallResult.sponsorProfit - inputs.sponsorEquity) / inputs.sponsorEquity;

  // Calculate IRR
  const investorIrr = calculateIRR(inputs.investorEquity, waterfallResult.investorProfit, inputs.holdingPeriod);
  const sponsorIrr = calculateIRR(inputs.sponsorEquity, waterfallResult.sponsorProfit, inputs.holdingPeriod);

  // Calculate equity multiple
  const equityMultiple = totalDistributableProceeds / inputs.totalEquity;

  // Calculate NPV
  const netPresentValue = calculateNPV(totalDistributableProceeds, inputs.totalEquity, inputs.holdingPeriod, inputs.inflationRate);

  return {
    totalReturn,
    investorReturn,
    sponsorReturn,
    preferredReturnAmount: waterfallResult.preferredReturnAmount,
    catchUpAmount: waterfallResult.catchUpAmount,
    promoteAmount: waterfallResult.promoteAmount,
    investorProfit: waterfallResult.investorProfit,
    sponsorProfit: waterfallResult.sponsorProfit,
    investorIrr,
    sponsorIrr,
    equityMultiple,
    netPresentValue
  };
}

function calculateWaterfallDistribution(
  totalEquity: number,
  investorEquity: number,
  sponsorEquity: number,
  preferredReturn: number,
  holdingPeriod: number,
  catchUpPercentage: number,
  promotePercentage: number,
  hurdleRate: number,
  totalDistributableProceeds: number,
  waterfallType: string,
  clawbackProvision: string,
  clawbackPercentage: number
): {
  preferredReturnAmount: number;
  catchUpAmount: number;
  promoteAmount: number;
  investorProfit: number;
  sponsorProfit: number;
} {
  // Calculate preferred return amount
  const preferredReturnAmount = investorEquity * (preferredReturn / 100) * holdingPeriod;

  // Calculate remaining proceeds after preferred return
  const remainingProceeds = totalDistributableProceeds - totalEquity - preferredReturnAmount;

  if (remainingProceeds <= 0) {
    // No excess profits, only return capital and preferred return
    const investorProfit = Math.min(totalDistributableProceeds, investorEquity + preferredReturnAmount);
    const sponsorProfit = Math.max(0, totalDistributableProceeds - investorProfit);

    return {
      preferredReturnAmount: Math.min(preferredReturnAmount, totalDistributableProceeds - totalEquity),
      catchUpAmount: 0,
      promoteAmount: 0,
      investorProfit,
      sponsorProfit
    };
  }

  // Calculate catch-up amount
  const catchUpAmount = remainingProceeds * (catchUpPercentage / 100);

  // Calculate remaining proceeds after catch-up
  const remainingAfterCatchUp = remainingProceeds - catchUpAmount;

  // Calculate promote amount
  const promoteAmount = remainingAfterCatchUp * (promotePercentage / 100);

  // Calculate final distributions
  let finalInvestorProfit = investorEquity + preferredReturnAmount + (remainingAfterCatchUp - promoteAmount);
  let finalSponsorProfit = sponsorEquity + catchUpAmount + promoteAmount;

  // Apply clawback if applicable
  if (clawbackProvision === 'yes' && clawbackPercentage > 0) {
    const clawbackAmount = promoteAmount * (clawbackPercentage / 100);
    finalSponsorProfit -= clawbackAmount;
    finalInvestorProfit += clawbackAmount;
  }

  return {
    preferredReturnAmount,
    catchUpAmount,
    promoteAmount: finalSponsorProfit - sponsorEquity - catchUpAmount,
    investorProfit: finalInvestorProfit,
    sponsorProfit: finalSponsorProfit
  };
}

function calculateIRR(initialInvestment: number, totalReturn: number, holdingPeriod: number): number {
  if (initialInvestment <= 0) return 0;
  
  // Simplified IRR calculation
  const totalReturnRatio = totalReturn / initialInvestment;
  const annualizedReturn = Math.pow(1 + totalReturnRatio, 1 / holdingPeriod) - 1;
  
  return Math.max(0, annualizedReturn);
}

function calculateNPV(totalProceeds: number, initialInvestment: number, holdingPeriod: number, inflationRate: number): number {
  const discountRate = inflationRate / 100;
  const presentValue = totalProceeds / Math.pow(1 + discountRate, holdingPeriod);
  
  return presentValue - initialInvestment;
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 365.25);
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24 * 30.44);
}

export function generateWaterfallAnalysis(inputs: RealEstateWaterfallModelInputs, outputs: RealEstateWaterfallModelOutputs): string {
  const analysis = [];
  
  analysis.push(`## Real Estate Waterfall Model Analysis`);
  analysis.push(``);
  analysis.push(`### Investment Overview`);
  analysis.push(`- **Total Equity**: $${inputs.totalEquity.toLocaleString()}`);
  analysis.push(`- **Investor Equity**: $${inputs.investorEquity.toLocaleString()} (${((inputs.investorEquity / inputs.totalEquity) * 100).toFixed(1)}%)`);
  analysis.push(`- **Sponsor Equity**: $${inputs.sponsorEquity.toLocaleString()} (${((inputs.sponsorEquity / inputs.totalEquity) * 100).toFixed(1)}%)`);
  analysis.push(`- **Holding Period**: ${inputs.holdingPeriod} years`);
  analysis.push(``);
  
  analysis.push(`### Waterfall Structure`);
  analysis.push(`- **Waterfall Type**: ${inputs.waterfallType.toUpperCase()}`);
  analysis.push(`- **Preferred Return**: ${inputs.preferredReturn}%`);
  analysis.push(`- **Catch-Up Percentage**: ${inputs.catchUpPercentage}%`);
  analysis.push(`- **Promote Percentage**: ${inputs.promotePercentage}%`);
  analysis.push(`- **Hurdle Rate**: ${inputs.hurdleRate}%`);
  analysis.push(`- **Clawback Provision**: ${inputs.clawbackProvision === 'yes' ? 'Yes' : 'No'}`);
  if (inputs.clawbackProvision === 'yes') {
    analysis.push(`- **Clawback Percentage**: ${inputs.clawbackPercentage}%`);
  }
  analysis.push(``);
  
  analysis.push(`### Distribution Analysis`);
  analysis.push(`- **Preferred Return Amount**: $${outputs.preferredReturnAmount.toLocaleString()}`);
  analysis.push(`- **Catch-Up Amount**: $${outputs.catchUpAmount.toLocaleString()}`);
  analysis.push(`- **Promote Amount**: $${outputs.promoteAmount.toLocaleString()}`);
  analysis.push(``);
  
  analysis.push(`### Returns Analysis`);
  analysis.push(`- **Total Return**: ${(outputs.totalReturn * 100).toFixed(2)}%`);
  analysis.push(`- **Investor Return**: ${(outputs.investorReturn * 100).toFixed(2)}%`);
  analysis.push(`- **Sponsor Return**: ${(outputs.sponsorReturn * 100).toFixed(2)}%`);
  analysis.push(`- **Investor IRR**: ${(outputs.investorIrr * 100).toFixed(2)}%`);
  analysis.push(`- **Sponsor IRR**: ${(outputs.sponsorIrr * 100).toFixed(2)}%`);
  analysis.push(`- **Equity Multiple**: ${outputs.equityMultiple.toFixed(2)}x`);
  analysis.push(``);
  
  analysis.push(`### Profit Distribution`);
  analysis.push(`- **Investor Profit**: $${outputs.investorProfit.toLocaleString()}`);
  analysis.push(`- **Sponsor Profit**: $${outputs.sponsorProfit.toLocaleString()}`);
  analysis.push(`- **Net Present Value**: $${outputs.netPresentValue.toLocaleString()}`);
  
  return analysis.join('\n');
}