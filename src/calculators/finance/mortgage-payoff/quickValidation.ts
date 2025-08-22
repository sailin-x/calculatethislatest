import { MortgagePayoffInputs } from './validation';

export const quickValidateMortgagePayoff = (inputs: Partial<MortgagePayoffInputs>): boolean => {
  // Check required fields
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    return false;
  }

  if (!inputs.interestRate || inputs.interestRate <= 0) {
    return false;
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    return false;
  }

  // Check basic range validation
  if (inputs.loanAmount < 10000 || inputs.loanAmount > 5000000) {
    return false;
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 25) {
    return false;
  }

  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    return false;
  }

  // Check remaining term validation
  if (inputs.remainingTerm && (inputs.remainingTerm < 1 || inputs.remainingTerm > 50)) {
    return false;
  }

  if (inputs.remainingTerm && inputs.loanTerm && inputs.remainingTerm > inputs.loanTerm) {
    return false;
  }

  // Check monthly payment validation
  if (inputs.monthlyPayment && (inputs.monthlyPayment < 100 || inputs.monthlyPayment > 50000)) {
    return false;
  }

  // Check additional payment validation
  if (inputs.additionalPayment && (inputs.additionalPayment < 0 || inputs.additionalPayment > 10000)) {
    return false;
  }

  // Check lump sum payment validation
  if (inputs.lumpSumPayment && (inputs.lumpSumPayment < 0 || inputs.lumpSumPayment > 1000000)) {
    return false;
  }

  if (inputs.lumpSumPayment && inputs.loanAmount && inputs.lumpSumPayment > inputs.loanAmount) {
    return false;
  }

  // Check refinance validation
  if (inputs.refinanceRate && (inputs.refinanceRate < 0 || inputs.refinanceRate > 25)) {
    return false;
  }

  if (inputs.refinanceTerm && (inputs.refinanceTerm < 1 || inputs.refinanceTerm > 50)) {
    return false;
  }

  if (inputs.refinanceClosingCosts && (inputs.refinanceClosingCosts < 0 || inputs.refinanceClosingCosts > 50000)) {
    return false;
  }

  // Check investment return validation
  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 15)) {
    return false;
  }

  // Check tax rate validation
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    return false;
  }

  // Check inflation rate validation
  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    return false;
  }

  // Check payment increase validation
  if (inputs.paymentIncrease && (inputs.paymentIncrease < 0 || inputs.paymentIncrease > 100)) {
    return false;
  }

  // Check payoff goal validation
  if (inputs.payoffGoal && (inputs.payoffGoal < 1 || inputs.payoffGoal > 50)) {
    return false;
  }

  if (inputs.payoffGoal && inputs.remainingTerm && inputs.payoffGoal > inputs.remainingTerm) {
    return false;
  }

  // Check analysis period validation
  if (inputs.analysisPeriod && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    return false;
  }

  if (inputs.analysisPeriod && inputs.remainingTerm && inputs.analysisPeriod > inputs.remainingTerm) {
    return false;
  }

  // Check property value validation
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    return false;
  }

  if (inputs.propertyValue && inputs.loanAmount && inputs.propertyValue < inputs.loanAmount) {
    return false;
  }

  // Check property appreciation validation
  if (inputs.propertyAppreciation && (inputs.propertyAppreciation < -10 || inputs.propertyAppreciation > 20)) {
    return false;
  }

  // Check refinance logic validation
  if (inputs.refinanceOption && inputs.refinanceOption !== 'No Refinance') {
    if (inputs.refinanceOption === 'Lower Rate' && (!inputs.refinanceRate || inputs.refinanceRate >= inputs.interestRate)) {
      return false;
    }
    
    if (inputs.refinanceOption === 'Shorter Term' && (!inputs.refinanceTerm || inputs.refinanceTerm >= inputs.remainingTerm)) {
      return false;
    }
    
    if (inputs.refinanceOption === 'Both') {
      if (!inputs.refinanceRate || inputs.refinanceRate >= inputs.interestRate) {
        return false;
      }
      if (!inputs.refinanceTerm || inputs.refinanceTerm >= inputs.remainingTerm) {
        return false;
      }
    }
  }

  // Check refinance option validation
  if (inputs.refinanceOption) {
    const validOptions = ['No Refinance', 'Lower Rate', 'Shorter Term', 'Both'];
    if (!validOptions.includes(inputs.refinanceOption)) {
      return false;
    }
  }

  // Check extra payment frequency validation
  if (inputs.extraPaymentFrequency) {
    const validFrequencies = ['Monthly', 'Quarterly', 'Annually', 'One-time'];
    if (!validFrequencies.includes(inputs.extraPaymentFrequency)) {
      return false;
    }
  }

  // Check date validation
  if (inputs.lumpSumDate) {
    const lumpSumDate = new Date(inputs.lumpSumDate);
    const today = new Date();
    if (lumpSumDate < today) {
      return false;
    }
  }

  // Check monthly payment consistency
  if (inputs.monthlyPayment && inputs.loanAmount && inputs.interestRate && inputs.loanTerm) {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.loanTerm * 12;
    const calculatedPayment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const difference = Math.abs(inputs.monthlyPayment - calculatedPayment);
    if (difference > calculatedPayment * 0.1) {
      return false;
    }
  }

  // Check payment increase sustainability
  if (inputs.paymentIncrease && inputs.paymentIncrease > 50) {
    return false;
  }

  // Check opportunity cost requirements
  if (inputs.includeOpportunityCost && !inputs.investmentReturn) {
    return false;
  }

  // Check tax benefits requirements
  if (inputs.includeTaxBenefits && !inputs.taxRate) {
    return false;
  }

  // Check biweekly payment validation
  if (inputs.biweeklyPayment && inputs.monthlyPayment) {
    const biweeklyEquivalent = inputs.monthlyPayment * 12 / 26;
    if (biweeklyEquivalent > inputs.monthlyPayment * 0.6) {
      return false;
    }
  }

  // Check lump sum payment percentage
  if (inputs.lumpSumPayment && inputs.loanAmount) {
    const lumpSumPercentage = (inputs.lumpSumPayment / inputs.loanAmount) * 100;
    if (lumpSumPercentage > 50) {
      return false;
    }
  }

  // Check refinance closing costs percentage
  if (inputs.refinanceClosingCosts && inputs.loanAmount) {
    const closingCostPercentage = (inputs.refinanceClosingCosts / inputs.loanAmount) * 100;
    if (closingCostPercentage > 5) {
      return false;
    }
  }

  return true;
};