import { RealEstateWaterfallModelInputs, RealEstateWaterfallModelResults } from './types';

/**
 * Calculate real estate waterfall model distributions
 */
export function calculateRealEstateWaterfallModel(inputs: RealEstateWaterfallModelInputs): RealEstateWaterfallModelResults {
  const {
    totalProjectCost,
    sponsorEquity,
    investorEquity,
    loanAmount,
    preferredReturn,
    sponsorProfitSplit,
    investorProfitSplit,
    totalCashFlow,
    totalAppreciation,
    totalPrincipalPaydown,
    holdingPeriodYears,
    waterfallType,
    promoteStructure,
    irrTarget
  } = inputs;

  // Calculate total equity and ownership percentages
  const totalEquity = sponsorEquity + investorEquity;
  const sponsorOwnershipPercentage = totalEquity > 0 ? (sponsorEquity / totalEquity) * 100 : 0;
  const investorOwnershipPercentage = totalEquity > 0 ? (investorEquity / totalEquity) * 100 : 0;

  // Calculate total distributions (cash flow + appreciation + principal paydown)
  const totalDistributions = totalCashFlow + totalAppreciation + totalPrincipalPaydown;

  // Calculate preferred return
  const investorPreferredReturn = investorEquity * (preferredReturn / 100) * holdingPeriodYears;
  const sponsorPreferredReturn = sponsorEquity * (preferredReturn / 100) * holdingPeriodYears;

  // Calculate remaining profit after preferred return
  const totalPreferredReturn = investorPreferredReturn + sponsorPreferredReturn;
  const remainingProfit = Math.max(0, totalDistributions - totalPreferredReturn);

  // Calculate profit split distributions
  let investorProfitSplitAmount = 0;
  let sponsorProfitSplitAmount = 0;
  let sponsorPromote = 0;

  if (remainingProfit > 0) {
    if (promoteStructure === 'catch_up') {
      // Catch-up structure: sponsor gets double share until they catch up to investor
      const totalProfitSplit = sponsorProfitSplit + investorProfitSplit;
      const investorBaseShare = remainingProfit * (investorProfitSplit / totalProfitSplit);
      const sponsorBaseShare = remainingProfit * (sponsorProfitSplit / totalProfitSplit);

      // Sponsor catch-up amount (difference between their share and investor's share)
      const catchUpAmount = Math.min(investorBaseShare - sponsorBaseShare, remainingProfit - investorBaseShare - sponsorBaseShare);

      if (catchUpAmount > 0) {
        investorProfitSplitAmount = investorBaseShare;
        sponsorProfitSplitAmount = sponsorBaseShare + catchUpAmount;
        sponsorPromote = catchUpAmount;
      } else {
        investorProfitSplitAmount = remainingProfit * (investorProfitSplit / totalProfitSplit);
        sponsorProfitSplitAmount = remainingProfit * (sponsorProfitSplit / totalProfitSplit);
      }
    } else {
      // Straight split
      const totalProfitSplit = sponsorProfitSplit + investorProfitSplit;
      investorProfitSplitAmount = remainingProfit * (investorProfitSplit / totalProfitSplit);
      sponsorProfitSplitAmount = remainingProfit * (sponsorProfitSplit / totalProfitSplit);
    }
  }

  // Calculate total distributions for each party
  const sponsorDistributions = sponsorPreferredReturn + sponsorProfitSplitAmount + sponsorPromote;
  const investorDistributions = investorPreferredReturn + investorProfitSplitAmount;

  // Calculate total profits
  const totalSponsorProfit = sponsorDistributions - sponsorEquity;
  const totalInvestorProfit = investorDistributions - investorEquity;

  // Calculate IRRs (simplified approximation)
  const sponsorIRR = calculateSimpleIRR(sponsorEquity, sponsorDistributions, holdingPeriodYears);
  const investorIRR = calculateSimpleIRR(investorEquity, investorDistributions, holdingPeriodYears);

  // Calculate equity multiple
  const equityMultiple = totalEquity > 0 ? totalDistributions / totalEquity : 0;

  // Generate waterfall tiers
  const waterfallTiers = generateWaterfallTiers(
    totalDistributions,
    investorPreferredReturn,
    sponsorPreferredReturn,
    investorProfitSplitAmount,
    sponsorProfitSplitAmount,
    sponsorPromote,
    waterfallType
  );

  return {
    totalEquity,
    sponsorOwnershipPercentage,
    investorOwnershipPercentage,
    totalDistributions,
    sponsorDistributions,
    investorDistributions,
    sponsorPromote,
    investorPreferredReturn,
    sponsorPreferredReturn,
    totalSponsorProfit,
    totalInvestorProfit,
    sponsorIRR,
    investorIRR,
    equityMultiple,
    waterfallTiers
  };
}

/**
 * Calculate simple IRR approximation
 */
function calculateSimpleIRR(initialInvestment: number, totalReturn: number, years: number): number {
  if (initialInvestment <= 0 || years <= 0) return 0;

  const multiple = totalReturn / initialInvestment;
  if (multiple <= 1) return 0;

  // Simple IRR approximation using compound growth formula
  const irr = Math.pow(multiple, 1 / years) - 1;
  return Math.round(irr * 10000) / 100; // Return as percentage with 2 decimal places
}

/**
 * Generate waterfall distribution tiers
 */
function generateWaterfallTiers(
  totalDistributions: number,
  investorPreferredReturn: number,
  sponsorPreferredReturn: number,
  investorProfitSplit: number,
  sponsorProfitSplit: number,
  sponsorPromote: number,
  waterfallType: string
): Array<{
  tier: number;
  description: string;
  threshold: number;
  distribution: number;
  recipient: string;
}> {
  const tiers = [];

  // Tier 1: Preferred Return
  tiers.push({
    tier: 1,
    description: 'Preferred Return Distribution',
    threshold: investorPreferredReturn + sponsorPreferredReturn,
    distribution: investorPreferredReturn + sponsorPreferredReturn,
    recipient: 'Investors & Sponsor'
  });

  // Tier 2: Profit Split
  if (investorProfitSplit + sponsorProfitSplit > 0) {
    tiers.push({
      tier: 2,
      description: 'Profit Split Distribution',
      threshold: investorPreferredReturn + sponsorPreferredReturn + investorProfitSplit + sponsorProfitSplit,
      distribution: investorProfitSplit + sponsorProfitSplit,
      recipient: 'Investors & Sponsor'
    });
  }

  // Tier 3: Sponsor Promote (if applicable)
  if (sponsorPromote > 0) {
    tiers.push({
      tier: 3,
      description: 'Sponsor Promote/Catch-up',
      threshold: totalDistributions,
      distribution: sponsorPromote,
      recipient: 'Sponsor'
    });
  }

  return tiers;
}

/**
 * Validate waterfall model inputs
 */
export function validateWaterfallModelInputs(inputs: RealEstateWaterfallModelInputs): string[] {
  const errors: string[] = [];

  if (inputs.totalProjectCost <= 0) {
    errors.push('Total project cost must be greater than 0');
  }

  if (inputs.sponsorEquity < 0) {
    errors.push('Sponsor equity cannot be negative');
  }

  if (inputs.investorEquity < 0) {
    errors.push('Investor equity cannot be negative');
  }

  if (inputs.sponsorEquity + inputs.investorEquity <= 0) {
    errors.push('Total equity must be greater than 0');
  }

  if (inputs.preferredReturn < 0 || inputs.preferredReturn > 20) {
    errors.push('Preferred return must be between 0% and 20%');
  }

  if (inputs.sponsorProfitSplit < 0 || inputs.sponsorProfitSplit > 100) {
    errors.push('Sponsor profit split must be between 0% and 100%');
  }

  if (inputs.investorProfitSplit < 0 || inputs.investorProfitSplit > 100) {
    errors.push('Investor profit split must be between 0% and 100%');
  }

  if (inputs.sponsorProfitSplit + inputs.investorProfitSplit !== 100) {
    errors.push('Profit splits must total 100%');
  }

  if (inputs.holdingPeriodYears <= 0 || inputs.holdingPeriodYears > 30) {
    errors.push('Holding period must be between 1 and 30 years');
  }

  return errors;
}