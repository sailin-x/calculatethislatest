import { CrowdfundingInputs } from './types';

export function validateCrowdfundingInputs(inputs: CrowdfundingInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Total Funding Goal Validation
  if (!inputs.totalFundingGoal || inputs.totalFundingGoal <= 0) {
    errors.push({ field: 'totalFundingGoal', message: 'Total funding goal must be greater than 0' });
  }
  if (inputs.totalFundingGoal && inputs.totalFundingGoal > 10000000) {
    errors.push({ field: 'totalFundingGoal', message: 'Total funding goal cannot exceed $10,000,000' });
  }

  // Minimum Investment Validation
  if (!inputs.minimumInvestment || inputs.minimumInvestment <= 0) {
    errors.push({ field: 'minimumInvestment', message: 'Minimum investment must be greater than 0' });
  }
  if (inputs.minimumInvestment && inputs.minimumInvestment > inputs.totalFundingGoal) {
    errors.push({ field: 'minimumInvestment', message: 'Minimum investment cannot exceed total funding goal' });
  }

  // Maximum Investment Validation
  if (inputs.maximumInvestment && inputs.maximumInvestment <= 0) {
    errors.push({ field: 'maximumInvestment', message: 'Maximum investment must be greater than 0' });
  }
  if (inputs.maximumInvestment && inputs.minimumInvestment && inputs.maximumInvestment < inputs.minimumInvestment) {
    errors.push({ field: 'maximumInvestment', message: 'Maximum investment cannot be less than minimum investment' });
  }

  // Current Funding Validation
  if (inputs.currentFunding < 0) {
    errors.push({ field: 'currentFunding', message: 'Current funding cannot be negative' });
  }
  if (inputs.currentFunding > inputs.totalFundingGoal) {
    errors.push({ field: 'currentFunding', message: 'Current funding cannot exceed total funding goal' });
  }

  // Number of Investors Validation
  if (inputs.numberOfInvestors < 0) {
    errors.push({ field: 'numberOfInvestors', message: 'Number of investors cannot be negative' });
  }

  // Valuation Validation
  if (!inputs.valuation || inputs.valuation <= 0) {
    errors.push({ field: 'valuation', message: 'Valuation must be greater than 0' });
  }

  // Equity Percentage Offered Validation
  if (!inputs.equityPercentageOffered || inputs.equityPercentageOffered <= 0) {
    errors.push({ field: 'equityPercentageOffered', message: 'Equity percentage offered must be greater than 0' });
  }
  if (inputs.equityPercentageOffered > 100) {
    errors.push({ field: 'equityPercentageOffered', message: 'Equity percentage offered cannot exceed 100%' });
  }

  // Fees Validation
  if (inputs.platformFees < 0) {
    errors.push({ field: 'platformFees', message: 'Platform fees cannot be negative' });
  }
  if (inputs.legalFees < 0) {
    errors.push({ field: 'legalFees', message: 'Legal fees cannot be negative' });
  }
  if (inputs.marketingFees < 0) {
    errors.push({ field: 'marketingFees', message: 'Marketing fees cannot be negative' });
  }

  // Campaign Duration Validation
  if (!inputs.campaignDuration || inputs.campaignDuration <= 0) {
    errors.push({ field: 'campaignDuration', message: 'Campaign duration must be greater than 0 days' });
  }
  if (inputs.campaignDuration > 365) {
    errors.push({ field: 'campaignDuration', message: 'Campaign duration cannot exceed 365 days' });
  }

  // Expected Return Validation
  if (inputs.expectedReturn < -100) {
    errors.push({ field: 'expectedReturn', message: 'Expected return cannot be less than -100%' });
  }
  if (inputs.expectedReturn > 1000) {
    errors.push({ field: 'expectedReturn', message: 'Expected return cannot exceed 1000%' });
  }

  return errors;
}

export function validateCrowdfundingBusinessRules(inputs: CrowdfundingInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Funding Goal Warnings
  if (inputs.totalFundingGoal < 10000) {
    warnings.push({ field: 'totalFundingGoal', message: 'Funding goals under $10,000 may be challenging to achieve' });
  }

  // Equity Percentage Warnings
  if (inputs.equityPercentageOffered > 50) {
    warnings.push({ field: 'equityPercentageOffered', message: 'Offering more than 50% equity may indicate high dilution risk' });
  } else if (inputs.equityPercentageOffered < 5) {
    warnings.push({ field: 'equityPercentageOffered', message: 'Offering less than 5% equity may not attract sufficient investment' });
  }

  // Minimum Investment Warnings
  if (inputs.minimumInvestment > 10000) {
    warnings.push({ field: 'minimumInvestment', message: 'High minimum investment may limit investor participation' });
  }

  // Campaign Duration Warnings
  if (inputs.campaignDuration < 30) {
    warnings.push({ field: 'campaignDuration', message: 'Campaigns shorter than 30 days may not reach full potential' });
  } else if (inputs.campaignDuration > 90) {
    warnings.push({ field: 'campaignDuration', message: 'Long campaigns may lose momentum over time' });
  }

  // Company Stage Warnings
  if (inputs.companyStage === 'pre-seed') {
    warnings.push({ field: 'companyStage', message: 'Pre-seed companies carry higher risk for investors' });
  }

  // Industry Risk Warnings
  if (inputs.industry === 'cryptocurrency' || inputs.industry === 'biotechnology') {
    warnings.push({ field: 'industry', message: 'High-risk industry may require additional investor education' });
  }

  // Accreditation Requirements
  if (inputs.investorAccreditationRequired) {
    warnings.push({ field: 'investorAccreditationRequired', message: 'Accreditation requirements limit the investor pool' });
  }

  // Current Funding Progress
  const progress = (inputs.currentFunding / inputs.totalFundingGoal) * 100;
  if (progress < 25 && inputs.campaignDuration < 30) {
    warnings.push({ field: 'currentFunding', message: 'Low funding progress early in campaign may indicate issues' });
  }

  return warnings;
}