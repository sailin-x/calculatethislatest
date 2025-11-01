import { distressed_debt_investing_roiCalculatorInputs, distressed_debt_investing_roiCalculatorOutputs, distressed_debt_investing_roiCalculatorMetrics, distressed_debt_investing_roiCalculatorAnalysis } from './types';

// Calculate total equity offered as percentage
export function calculateTotalEquityOffered(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.equityPercentageOffered;
}

// Calculate price per share based on valuation and equity offered
export function calculatePricePerShare(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  const totalEquityValue = inputs.valuation * (inputs.equityPercentageOffered / 100);
  return totalEquityValue / inputs.totalFundingGoal;
}

// Calculate number of shares offered
export function calculateSharesOffered(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  const pricePerShare = calculatePricePerShare(inputs);
  return pricePerShare > 0 ? inputs.totalFundingGoal / pricePerShare : 0;
}

// Calculate funding progress as percentage
export function calculateFundingProgress(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return (inputs.currentFunding / inputs.totalFundingGoal) * 100;
}

// Calculate remaining funding needed
export function calculateRemainingFundingNeeded(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return Math.max(0, inputs.totalFundingGoal - inputs.currentFunding);
}

// Calculate average investment per investor
export function calculateAverageInvestmentPerInvestor(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.numberOfInvestors > 0 ? inputs.currentFunding / inputs.numberOfInvestors : 0;
}

// Calculate total fees
export function calculateTotalFees(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.platformFees + inputs.legalFees + inputs.marketingFees;
}

// Calculate net proceeds after fees
export function calculateNetProceeds(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.currentFunding - calculateTotalFees(inputs);
}

// Calculate post-money valuation
export function calculatePostMoneyValuation(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.valuation + inputs.currentFunding;
}

// Calculate ownership dilution
export function calculateOwnershipDilution(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  const postMoneyValuation = calculatePostMoneyValuation(inputs);
  return postMoneyValuation > 0 ? (inputs.currentFunding / postMoneyValuation) * 100 : 0;
}

// Calculate break-even number of investors needed
export function calculateBreakEvenInvestors(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  const averageInvestment = calculateAverageInvestmentPerInvestor(inputs);
  return averageInvestment > 0 ? Math.ceil(inputs.totalFundingGoal / averageInvestment) : 0;
}

// Calculate projected ROI based on expected return
export function calculateProjectedROI(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return inputs.expectedReturn;
}

// Calculate risk-adjusted return
export function calculateRiskAdjustedReturn(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  const baseReturn = inputs.expectedReturn;
  const riskMultiplier = inputs.riskLevel === 'low' ? 0.8 : inputs.riskLevel === 'medium' ? 1.0 : 1.2;
  return baseReturn * riskMultiplier;
}

// Calculate success probability based on various factors
export function calculateSuccessProbability(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  let probability = 50; // Base probability

  // Adjust based on funding progress
  const progress = calculateFundingProgress(inputs);
  if (progress > 75) probability += 20;
  else if (progress > 50) probability += 10;
  else if (progress < 25) probability -= 15;

  // Adjust based on company stage
  if (inputs.companyStage === 'growth') probability += 15;
  else if (inputs.companyStage === 'early-stage') probability += 5;
  else if (inputs.companyStage === 'pre-seed') probability -= 10;

  // Adjust based on industry risk (simplified)
  if (inputs.industry === 'technology') probability += 5;
  else if (inputs.industry === 'healthcare') probability += 10;
  else if (inputs.industry === 'real estate') probability -= 5;

  // Adjust based on investor count
  if (inputs.numberOfInvestors > 100) probability += 15;
  else if (inputs.numberOfInvestors > 50) probability += 5;
  else if (inputs.numberOfInvestors < 10) probability -= 10;

  return Math.max(0, Math.min(100, probability));
}

// Main calculation function
export function calculateResult(inputs: distressed_debt_investing_roiCalculatorInputs): number {
  return calculateFundingProgress(inputs);
}

// Generate analysis based on inputs and metrics
export function generateAnalysis(inputs: distressed_debt_investing_roiCalculatorInputs, metrics: distressed_debt_investing_roiCalculatorMetrics): distressed_debt_investing_roiCalculatorAnalysis {
  const progress = calculateFundingProgress(inputs);
  const successProb = calculateSuccessProbability(inputs);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (inputs.riskLevel === 'low' || successProb > 70) riskLevel = 'Low';
  else if (inputs.riskLevel === 'high' || successProb < 40) riskLevel = 'High';

  let recommendation = '';
  if (progress > 80) {
    recommendation = 'Campaign is performing well. Consider extending duration if needed.';
  } else if (progress > 50) {
    recommendation = 'Campaign has moderate traction. Increase marketing efforts.';
  } else {
    recommendation = 'Campaign needs improvement. Review strategy and consider adjustments.';
  }

  if (inputs.investorAccreditationRequired) {
    recommendation += ' Note: Accredited investor requirements may limit participation.';
  }

  return { recommendation, riskLevel };
}