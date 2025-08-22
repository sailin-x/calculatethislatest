import { MortgageLifeInputs } from './validation';

export const quickValidateMortgageLife = (inputs: Partial<MortgageLifeInputs>): boolean => {
  // Check required fields
  if (!inputs.mortgageBalance || inputs.mortgageBalance <= 0) {
    return false;
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    return false;
  }

  if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) {
    return false;
  }

  if (!inputs.borrowerAge || inputs.borrowerAge <= 0) {
    return false;
  }

  // Check basic range validation
  if (inputs.mortgageBalance < 10000 || inputs.mortgageBalance > 5000000) {
    return false;
  }

  if (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000) {
    return false;
  }

  if (inputs.monthlyPayment < 100 || inputs.monthlyPayment > 50000) {
    return false;
  }

  if (inputs.borrowerAge < 18 || inputs.borrowerAge > 85) {
    return false;
  }

  // Check logical validation
  if (inputs.mortgageBalance > inputs.propertyValue) {
    return false;
  }

  if (inputs.monthlyPayment > inputs.mortgageBalance * 0.02) {
    return false;
  }

  // Check co-borrower age if provided
  if (inputs.coBorrowerAge && (inputs.coBorrowerAge < 18 || inputs.coBorrowerAge > 85)) {
    return false;
  }

  // Check age difference between borrowers
  if (inputs.borrowerAge && inputs.coBorrowerAge) {
    const ageDifference = Math.abs(inputs.borrowerAge - inputs.coBorrowerAge);
    if (ageDifference > 30) {
      return false;
    }
  }

  // Check dependents age if provided
  if (inputs.dependentsAge && (inputs.dependentsAge < 0 || inputs.dependentsAge > 25)) {
    return false;
  }

  if (inputs.dependents && inputs.dependentsAge && inputs.borrowerAge) {
    if (inputs.dependentsAge > inputs.borrowerAge) {
      return false;
    }
  }

  // Check other numeric fields
  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    return false;
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    return false;
  }

  if (inputs.annualIncome && (inputs.annualIncome < 0 || inputs.annualIncome > 10000000)) {
    return false;
  }

  if (inputs.otherDebts && (inputs.otherDebts < 0 || inputs.otherDebts > 5000000)) {
    return false;
  }

  if (inputs.savings && (inputs.savings < 0 || inputs.savings > 10000000)) {
    return false;
  }

  if (inputs.dependents && (inputs.dependents < 0 || inputs.dependents > 10)) {
    return false;
  }

  if (inputs.yearsToRetirement && (inputs.yearsToRetirement < 0 || inputs.yearsToRetirement > 50)) {
    return false;
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    return false;
  }

  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 15)) {
    return false;
  }

  if (inputs.lifeExpectancy && (inputs.lifeExpectancy < 50 || inputs.lifeExpectancy > 120)) {
    return false;
  }

  if (inputs.existingLifeInsurance && (inputs.existingLifeInsurance < 0 || inputs.existingLifeInsurance > 10000000)) {
    return false;
  }

  if (inputs.policyTerm && (inputs.policyTerm < 1 || inputs.policyTerm > 50)) {
    return false;
  }

  if (inputs.coverageAmount && (inputs.coverageAmount < 10000 || inputs.coverageAmount > 10000000)) {
    return false;
  }

  if (inputs.analysisPeriod && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    return false;
  }

  // Check retirement age logic
  if (inputs.yearsToRetirement && inputs.borrowerAge) {
    const retirementAge = inputs.borrowerAge + inputs.yearsToRetirement;
    if (retirementAge > 85) {
      return false;
    }
  }

  // Check policy term and age compatibility
  if (inputs.borrowerAge && inputs.policyTerm) {
    const endAge = inputs.borrowerAge + inputs.policyTerm;
    if (endAge > 85) {
      return false;
    }
  }

  // Check coverage amount relative to mortgage balance
  if (inputs.coverageAmount && inputs.mortgageBalance) {
    if (inputs.coverageAmount < inputs.mortgageBalance * 0.5) {
      return false;
    }
    if (inputs.coverageAmount > inputs.mortgageBalance * 5) {
      return false;
    }
  }

  // Check income and coverage relationship
  if (inputs.annualIncome && inputs.coverageAmount) {
    const recommendedCoverage = inputs.annualIncome * 10;
    if (inputs.coverageAmount < recommendedCoverage * 0.5) {
      return false;
    }
    if (inputs.coverageAmount > recommendedCoverage * 3) {
      return false;
    }
  }

  // Check debt-to-income ratio
  if (inputs.annualIncome && inputs.mortgageBalance && inputs.otherDebts) {
    const totalDebt = inputs.mortgageBalance + inputs.otherDebts;
    const debtToIncomeRatio = totalDebt / inputs.annualIncome;
    if (debtToIncomeRatio > 10) {
      return false;
    }
  }

  // Check savings adequacy
  if (inputs.annualIncome && inputs.savings) {
    const savingsRatio = inputs.savings / inputs.annualIncome;
    if (savingsRatio < 0.1) {
      return false;
    }
  }

  return true;
};