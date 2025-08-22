import { MortgagePointsInputs } from './validation';

export const quickValidateMortgagePoints = (inputs: Partial<MortgagePointsInputs>): boolean => {
  // Check required fields
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    return false;
  }

  if (!inputs.originalRate || inputs.originalRate < 0 || inputs.originalRate > 25) {
    return false;
  }

  if (!inputs.reducedRate || inputs.reducedRate < 0 || inputs.reducedRate > 25) {
    return false;
  }

  if (!inputs.loanTerm || inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    return false;
  }

  // Check basic logical constraints
  if (inputs.loanAmount > 10000000) {
    return false;
  }

  if (inputs.reducedRate >= inputs.originalRate) {
    return false;
  }

  if (inputs.pointsCost !== undefined && inputs.pointsCost < 0) {
    return false;
  }

  if (inputs.pointsPercentage !== undefined && (inputs.pointsPercentage < 0 || inputs.pointsPercentage > 10)) {
    return false;
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts < 0) {
    return false;
  }

  if (inputs.propertyTax !== undefined && inputs.propertyTax < 0) {
    return false;
  }

  if (inputs.homeInsurance !== undefined && inputs.homeInsurance < 0) {
    return false;
  }

  if (inputs.pmi !== undefined && (inputs.pmi < 0 || inputs.pmi > 5)) {
    return false;
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    return false;
  }

  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    return false;
  }

  if (inputs.investmentReturn !== undefined && (inputs.investmentReturn < 0 || inputs.investmentReturn > 20)) {
    return false;
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    return false;
  }

  if (inputs.plannedOwnership !== undefined && (inputs.plannedOwnership < 1 || inputs.plannedOwnership > 50)) {
    return false;
  }

  if (inputs.analysisPeriod !== undefined && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    return false;
  }

  return true;
};