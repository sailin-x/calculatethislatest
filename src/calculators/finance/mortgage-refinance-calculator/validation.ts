import { MortgageRefinanceInputs } from './types';

export function validateMortgageRefinanceInputs(inputs: MortgageRefinanceInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current loan amount validation
  if (!inputs.currentLoanAmount || inputs.currentLoanAmount <= 0) {
    errors.push({ field: 'currentLoanAmount', message: 'Current loan amount must be greater than 0' });
  }
  if (inputs.currentLoanAmount && inputs.currentLoanAmount > 10000000) {
    errors.push({ field: 'currentLoanAmount', message: 'Current loan amount cannot exceed $10,000,000' });
  }

  // Interest rates validation
  if (inputs.currentInterestRate < 0) {
    errors.push({ field: 'currentInterestRate', message: 'Current interest rate cannot be negative' });
  }
  if (inputs.currentInterestRate > 30) {
    errors.push({ field: 'currentInterestRate', message: 'Current interest rate cannot exceed 30%' });
  }

  if (inputs.newInterestRate < 0) {
    errors.push({ field: 'newInterestRate', message: 'New interest rate cannot be negative' });
  }
  if (inputs.newInterestRate > 30) {
    errors.push({ field: 'newInterestRate', message: 'New interest rate cannot exceed 30%' });
  }

  // Loan terms validation
  if (!inputs.currentLoanTerm || inputs.currentLoanTerm <= 0) {
    errors.push({ field: 'currentLoanTerm', message: 'Current loan term must be greater than 0 months' });
  }
  if (inputs.currentLoanTerm && inputs.currentLoanTerm > 360) {
    errors.push({ field: 'currentLoanTerm', message: 'Current loan term cannot exceed 360 months' });
  }

  if (!inputs.newLoanTerm || inputs.newLoanTerm <= 0) {
    errors.push({ field: 'newLoanTerm', message: 'New loan term must be greater than 0 years' });
  }
  if (inputs.newLoanTerm && inputs.newLoanTerm > 50) {
    errors.push({ field: 'newLoanTerm', message: 'New loan term cannot exceed 50 years' });
  }

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Loan balance validation
  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push({ field: 'currentLoanBalance', message: 'Current loan balance must be greater than 0' });
  }
  if (inputs.currentLoanBalance && inputs.propertyValue && inputs.currentLoanBalance > inputs.propertyValue) {
    errors.push({ field: 'currentLoanBalance', message: 'Current loan balance cannot exceed property value' });
  }

  // Monthly payment validation
  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment <= 0) {
    errors.push({ field: 'currentMonthlyPayment', message: 'Current monthly payment must be greater than 0' });
  }

  // Cash out validation
  if (inputs.cashOutAmount < 0) {
    errors.push({ field: 'cashOutAmount', message: 'Cash out amount cannot be negative' });
  }

  // Time periods validation
  if (inputs.timeToRefinance < 0) {
    errors.push({ field: 'timeToRefinance', message: 'Time to refinance cannot be negative' });
  }

  if (!inputs.expectedStayDuration || inputs.expectedStayDuration <= 0) {
    errors.push({ field: 'expectedStayDuration', message: 'Expected stay duration must be greater than 0 months' });
  }

  // Costs validation
  if (inputs.closingCosts < 0) {
    errors.push({ field: 'closingCosts', message: 'Closing costs cannot be negative' });
  }

  if (inputs.discountPoints < 0) {
    errors.push({ field: 'discountPoints', message: 'Discount points cannot be negative' });
  }

  if (inputs.lenderCredits < 0) {
    errors.push({ field: 'lenderCredits', message: 'Lender credits cannot be negative' });
  }

  if (inputs.appraisalFee < 0) {
    errors.push({ field: 'appraisalFee', message: 'Appraisal fee cannot be negative' });
  }

  if (inputs.titleInsurance < 0) {
    errors.push({ field: 'titleInsurance', message: 'Title insurance cannot be negative' });
  }

  if (inputs.otherFees < 0) {
    errors.push({ field: 'otherFees', message: 'Other fees cannot be negative' });
  }

  // Insurance and taxes validation
  if (inputs.currentPropertyTaxes < 0) {
    errors.push({ field: 'currentPropertyTaxes', message: 'Property taxes cannot be negative' });
  }

  if (inputs.currentHomeownersInsurance < 0) {
    errors.push({ field: 'currentHomeownersInsurance', message: 'Homeowners insurance cannot be negative' });
  }

  if (inputs.currentPMI < 0) {
    errors.push({ field: 'currentPMI', message: 'Current PMI cannot be negative' });
  }

  if (inputs.newPMI < 0) {
    errors.push({ field: 'newPMI', message: 'New PMI cannot be negative' });
  }

  // Credit score validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore && inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Prepayment penalty validation
  if (inputs.prepaymentPenalty < 0) {
    errors.push({ field: 'prepaymentPenalty', message: 'Prepayment penalty cannot be negative' });
  }

  // Date validation
  if (!inputs.currentLoanOriginationDate) {
    errors.push({ field: 'currentLoanOriginationDate', message: 'Current loan origination date is required' });
  } else {
    const originationDate = new Date(inputs.currentLoanOriginationDate);
    const today = new Date();
    if (originationDate > today) {
      errors.push({ field: 'currentLoanOriginationDate', message: 'Origination date cannot be in the future' });
    }
  }

  return errors;
}

export function validateMortgageRefinanceBusinessRules(inputs: MortgageRefinanceInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Rate difference warnings
  const rateDifference = inputs.currentInterestRate - inputs.newInterestRate;
  if (rateDifference < 0.5) {
    warnings.push({ field: 'newInterestRate', message: 'Rate reduction is less than 0.5% - may not justify refinance costs' });
  } else if (rateDifference > 3) {
    warnings.push({ field: 'newInterestRate', message: 'Significant rate reduction - excellent refinance opportunity!' });
  }

  // Break-even analysis warnings
  const totalCosts = inputs.closingCosts + inputs.discountPoints + inputs.appraisalFee +
                    inputs.titleInsurance + inputs.otherFees - inputs.lenderCredits;
  const estimatedMonthlySavings = inputs.currentMonthlyPayment -
    (inputs.currentLoanBalance + inputs.cashOutAmount) *
    (inputs.newInterestRate / 100 / 12 * Math.pow(1 + inputs.newInterestRate / 100 / 12, inputs.newLoanTerm * 12)) /
    (Math.pow(1 + inputs.newInterestRate / 100 / 12, inputs.newLoanTerm * 12) - 1);

  const breakEvenMonths = estimatedMonthlySavings > 0 ? Math.ceil(totalCosts / estimatedMonthlySavings) : Infinity;

  if (breakEvenMonths > inputs.expectedStayDuration) {
    warnings.push({ field: 'expectedStayDuration', message: `Break-even period (${breakEvenMonths} months) exceeds expected stay duration` });
  }

  // Cash out warnings
  if (inputs.cashOutAmount > 0) {
    const newLTV = ((inputs.currentLoanBalance + inputs.cashOutAmount) / inputs.propertyValue) * 100;
    if (newLTV > 80) {
      warnings.push({ field: 'cashOutAmount', message: 'Cash-out amount may trigger PMI requirements' });
    }
    if (newLTV > 90) {
      warnings.push({ field: 'cashOutAmount', message: 'High LTV ratio may affect refinance approval' });
    }
  }

  // Credit score warnings
  if (inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 620 may result in higher rates or denial' });
  } else if (inputs.creditScore < 740) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 740 may limit the best available rates' });
  }

  // Prepayment penalty warnings
  if (inputs.prepaymentPenalty > 0) {
    const penaltyPercentage = (inputs.prepaymentPenalty / inputs.currentLoanBalance) * 100;
    if (penaltyPercentage > 2) {
      warnings.push({ field: 'prepaymentPenalty', message: 'High prepayment penalty may significantly reduce savings' });
    }
  }

  // Time to refinance warnings
  if (inputs.timeToRefinance > 60) {
    warnings.push({ field: 'timeToRefinance', message: 'Long time to refinance may result in rate changes' });
  }

  // Closing costs warnings
  if (totalCosts > inputs.currentLoanBalance * 0.03) {
    warnings.push({ field: 'closingCosts', message: 'Closing costs exceed 3% of loan balance - shop around' });
  }

  // Loan term change warnings
  if (inputs.newLoanTerm > inputs.currentLoanTerm / 12) {
    warnings.push({ field: 'newLoanTerm', message: 'Extending loan term will increase total interest paid' });
  }

  // Market condition warnings
  if (inputs.marketConditions === 'Rising') {
    warnings.push({ field: 'marketConditions', message: 'Rising rates - consider acting quickly to lock in current rates' });
  } else if (inputs.marketConditions === 'Falling') {
    warnings.push({ field: 'marketConditions', message: 'Falling rates - may be able to get even better terms by waiting' });
  }

  // Refinance type warnings
  if (inputs.refinanceType === 'Cash-Out' && inputs.cashOutAmount > inputs.propertyValue * 0.2) {
    warnings.push({ field: 'cashOutAmount', message: 'Large cash-out amount may affect loan approval and rates' });
  }

  // PMI warnings
  if (inputs.newPMI > inputs.currentPMI) {
    warnings.push({ field: 'newPMI', message: 'New PMI is higher than current PMI' });
  }

  return warnings;
}