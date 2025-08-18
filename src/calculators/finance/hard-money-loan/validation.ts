import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateHardMoneyLoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.loanAmount) {
    errors.push('Loan amount is required');
  }
  if (!inputs.propertyValue) {
    errors.push('Property value is required');
  }
  if (!inputs.interestRate) {
    errors.push('Interest rate is required');
  }
  if (!inputs.loanTerm) {
    errors.push('Loan term is required');
  }
  if (!inputs.points) {
    errors.push('Points are required');
  }
  if (!inputs.propertyType) {
    errors.push('Property type is required');
  }
  if (!inputs.loanPurpose) {
    errors.push('Loan purpose is required');
  }
  if (!inputs.propertyCondition) {
    errors.push('Property condition is required');
  }
  if (!inputs.location) {
    errors.push('Location is required');
  }
  if (!inputs.marketType) {
    errors.push('Market type is required');
  }
  if (!inputs.exitStrategy) {
    errors.push('Exit strategy is required');
  }

  // Data type validation
  if (inputs.loanAmount && typeof inputs.loanAmount !== 'number') {
    errors.push('Loan amount must be a number');
  }
  if (inputs.propertyValue && typeof inputs.propertyValue !== 'number') {
    errors.push('Property value must be a number');
  }
  if (inputs.interestRate && typeof inputs.interestRate !== 'number') {
    errors.push('Interest rate must be a number');
  }
  if (inputs.loanTerm && typeof inputs.loanTerm !== 'number') {
    errors.push('Loan term must be a number');
  }
  if (inputs.points && typeof inputs.points !== 'number') {
    errors.push('Points must be a number');
  }
  if (inputs.downPayment && typeof inputs.downPayment !== 'number') {
    errors.push('Down payment must be a number');
  }
  if (inputs.closingCosts && typeof inputs.closingCosts !== 'number') {
    errors.push('Closing costs must be a number');
  }
  if (inputs.renovationBudget && typeof inputs.renovationBudget !== 'number') {
    errors.push('Renovation budget must be a number');
  }
  if (inputs.afterRepairValue && typeof inputs.afterRepairValue !== 'number') {
    errors.push('After repair value must be a number');
  }
  if (inputs.monthlyExpenses && typeof inputs.monthlyExpenses !== 'number') {
    errors.push('Monthly expenses must be a number');
  }
  if (inputs.timeline && typeof inputs.timeline !== 'number') {
    errors.push('Timeline must be a number');
  }
  if (inputs.borrowerCredit && typeof inputs.borrowerCredit !== 'number') {
    errors.push('Borrower credit score must be a number');
  }
  if (inputs.prepaymentPenalty && typeof inputs.prepaymentPenalty !== 'number') {
    errors.push('Prepayment penalty must be a number');
  }
  if (inputs.lateFees && typeof inputs.lateFees !== 'number') {
    errors.push('Late fees must be a number');
  }
  if (inputs.extensionFees && typeof inputs.extensionFees !== 'number') {
    errors.push('Extension fees must be a number');
  }
  if (inputs.appraisalFees && typeof inputs.appraisalFees !== 'number') {
    errors.push('Appraisal fees must be a number');
  }
  if (inputs.titleFees && typeof inputs.titleFees !== 'number') {
    errors.push('Title fees must be a number');
  }
  if (inputs.escrowFees && typeof inputs.escrowFees !== 'number') {
    errors.push('Escrow fees must be a number');
  }
  if (inputs.inspectionFees && typeof inputs.inspectionFees !== 'number') {
    errors.push('Inspection fees must be a number');
  }
  if (inputs.processingFees && typeof inputs.processingFees !== 'number') {
    errors.push('Processing fees must be a number');
  }
  if (inputs.wireFees && typeof inputs.wireFees !== 'number') {
    errors.push('Wire fees must be a number');
  }
  if (inputs.taxRate && typeof inputs.taxRate !== 'number') {
    errors.push('Tax rate must be a number');
  }
  if (inputs.inflationRate && typeof inputs.inflationRate !== 'number') {
    errors.push('Inflation rate must be a number');
  }

  // Range validation
  if (inputs.loanAmount && (inputs.loanAmount < 10000 || inputs.loanAmount > 10000000)) {
    errors.push('Loan amount must be between $10,000 and $10,000,000');
  }
  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }
  if (inputs.interestRate && (inputs.interestRate < 5 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 5% and 25%');
  }
  if (inputs.loanTerm && (inputs.loanTerm < 3 || inputs.loanTerm > 36)) {
    errors.push('Loan term must be between 3 and 36 months');
  }
  if (inputs.points && (inputs.points < 0 || inputs.points > 10)) {
    errors.push('Points must be between 0 and 10');
  }
  if (inputs.downPayment && (inputs.downPayment < 0 || inputs.downPayment > 1000000)) {
    errors.push('Down payment must be between $0 and $1,000,000');
  }
  if (inputs.closingCosts && (inputs.closingCosts < 0 || inputs.closingCosts > 100000)) {
    errors.push('Closing costs must be between $0 and $100,000');
  }
  if (inputs.renovationBudget && (inputs.renovationBudget < 0 || inputs.renovationBudget > 1000000)) {
    errors.push('Renovation budget must be between $0 and $1,000,000');
  }
  if (inputs.afterRepairValue && (inputs.afterRepairValue < 10000 || inputs.afterRepairValue > 10000000)) {
    errors.push('After repair value must be between $10,000 and $10,000,000');
  }
  if (inputs.monthlyExpenses && (inputs.monthlyExpenses < 0 || inputs.monthlyExpenses > 100000)) {
    errors.push('Monthly expenses must be between $0 and $100,000');
  }
  if (inputs.timeline && (inputs.timeline < 1 || inputs.timeline > 36)) {
    errors.push('Timeline must be between 1 and 36 months');
  }
  if (inputs.borrowerCredit && (inputs.borrowerCredit < 300 || inputs.borrowerCredit > 850)) {
    errors.push('Borrower credit score must be between 300 and 850');
  }
  if (inputs.prepaymentPenalty && (inputs.prepaymentPenalty < 0 || inputs.prepaymentPenalty > 10)) {
    errors.push('Prepayment penalty must be between 0% and 10%');
  }
  if (inputs.lateFees && (inputs.lateFees < 0 || inputs.lateFees > 1000)) {
    errors.push('Late fees must be between $0 and $1,000');
  }
  if (inputs.extensionFees && (inputs.extensionFees < 0 || inputs.extensionFees > 5000)) {
    errors.push('Extension fees must be between $0 and $5,000');
  }
  if (inputs.appraisalFees && (inputs.appraisalFees < 0 || inputs.appraisalFees > 5000)) {
    errors.push('Appraisal fees must be between $0 and $5,000');
  }
  if (inputs.titleFees && (inputs.titleFees < 0 || inputs.titleFees > 10000)) {
    errors.push('Title fees must be between $0 and $10,000');
  }
  if (inputs.escrowFees && (inputs.escrowFees < 0 || inputs.escrowFees > 5000)) {
    errors.push('Escrow fees must be between $0 and $5,000');
  }
  if (inputs.inspectionFees && (inputs.inspectionFees < 0 || inputs.inspectionFees > 2000)) {
    errors.push('Inspection fees must be between $0 and $2,000');
  }
  if (inputs.processingFees && (inputs.processingFees < 0 || inputs.processingFees > 10000)) {
    errors.push('Processing fees must be between $0 and $10,000');
  }
  if (inputs.wireFees && (inputs.wireFees < 0 || inputs.wireFees > 500)) {
    errors.push('Wire fees must be between $0 and $500');
  }
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }
  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  // Logical relationship validation
  if (inputs.loanAmount && inputs.propertyValue && inputs.loanAmount > inputs.propertyValue) {
    errors.push('Loan amount cannot exceed property value');
  }
  if (inputs.afterRepairValue && inputs.propertyValue && inputs.afterRepairValue < inputs.propertyValue) {
    errors.push('After repair value should typically be higher than current property value');
  }
  if (inputs.timeline && inputs.loanTerm && inputs.timeline > inputs.loanTerm) {
    errors.push('Project timeline should not exceed loan term');
  }
  if (inputs.downPayment && inputs.propertyValue && inputs.downPayment > inputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  // Enum validation
  const validPropertyTypes = ['single-family', 'multi-family', 'commercial', 'land', 'mixed-use', 'industrial'];
  if (inputs.propertyType && !validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  const validLoanPurposes = ['purchase', 'refinance', 'fix-and-flip', 'construction', 'bridge', 'cash-out'];
  if (inputs.loanPurpose && !validLoanPurposes.includes(inputs.loanPurpose)) {
    errors.push('Invalid loan purpose');
  }

  const validPropertyConditions = ['excellent', 'good', 'fair', 'poor', 'needs-repair'];
  if (inputs.propertyCondition && !validPropertyConditions.includes(inputs.propertyCondition)) {
    errors.push('Invalid property condition');
  }

  const validLocations = ['urban', 'suburban', 'rural'];
  if (inputs.location && !validLocations.includes(inputs.location)) {
    errors.push('Invalid location');
  }

  const validMarketTypes = ['hot', 'stable', 'declining'];
  if (inputs.marketType && !validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type');
  }

  const validExitStrategies = ['sell', 'refinance', 'hold', 'flip'];
  if (inputs.exitStrategy && !validExitStrategies.includes(inputs.exitStrategy)) {
    errors.push('Invalid exit strategy');
  }

  const validExperienceLevels = ['beginner', 'intermediate', 'experienced', 'professional'];
  if (inputs.experienceLevel && !validExperienceLevels.includes(inputs.experienceLevel)) {
    errors.push('Invalid experience level');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateHardMoneyLoanInput(field: string, value: any): string | null {
  switch (field) {
    case 'loanAmount':
      if (!value) return 'Loan amount is required';
      if (typeof value !== 'number') return 'Loan amount must be a number';
      if (value < 10000 || value > 10000000) return 'Loan amount must be between $10,000 and $10,000,000';
      return null;

    case 'propertyValue':
      if (!value) return 'Property value is required';
      if (typeof value !== 'number') return 'Property value must be a number';
      if (value < 10000 || value > 10000000) return 'Property value must be between $10,000 and $10,000,000';
      return null;

    case 'interestRate':
      if (!value) return 'Interest rate is required';
      if (typeof value !== 'number') return 'Interest rate must be a number';
      if (value < 5 || value > 25) return 'Interest rate must be between 5% and 25%';
      return null;

    case 'loanTerm':
      if (!value) return 'Loan term is required';
      if (typeof value !== 'number') return 'Loan term must be a number';
      if (value < 3 || value > 36) return 'Loan term must be between 3 and 36 months';
      return null;

    case 'points':
      if (!value) return 'Points are required';
      if (typeof value !== 'number') return 'Points must be a number';
      if (value < 0 || value > 10) return 'Points must be between 0 and 10';
      return null;

    case 'downPayment':
      if (value && typeof value !== 'number') return 'Down payment must be a number';
      if (value && (value < 0 || value > 1000000)) return 'Down payment must be between $0 and $1,000,000';
      return null;

    case 'closingCosts':
      if (value && typeof value !== 'number') return 'Closing costs must be a number';
      if (value && (value < 0 || value > 100000)) return 'Closing costs must be between $0 and $100,000';
      return null;

    case 'renovationBudget':
      if (value && typeof value !== 'number') return 'Renovation budget must be a number';
      if (value && (value < 0 || value > 1000000)) return 'Renovation budget must be between $0 and $1,000,000';
      return null;

    case 'afterRepairValue':
      if (value && typeof value !== 'number') return 'After repair value must be a number';
      if (value && (value < 10000 || value > 10000000)) return 'After repair value must be between $10,000 and $10,000,000';
      return null;

    case 'monthlyExpenses':
      if (value && typeof value !== 'number') return 'Monthly expenses must be a number';
      if (value && (value < 0 || value > 100000)) return 'Monthly expenses must be between $0 and $100,000';
      return null;

    case 'timeline':
      if (value && typeof value !== 'number') return 'Timeline must be a number';
      if (value && (value < 1 || value > 36)) return 'Timeline must be between 1 and 36 months';
      return null;

    case 'borrowerCredit':
      if (value && typeof value !== 'number') return 'Borrower credit score must be a number';
      if (value && (value < 300 || value > 850)) return 'Borrower credit score must be between 300 and 850';
      return null;

    case 'prepaymentPenalty':
      if (value && typeof value !== 'number') return 'Prepayment penalty must be a number';
      if (value && (value < 0 || value > 10)) return 'Prepayment penalty must be between 0% and 10%';
      return null;

    case 'lateFees':
      if (value && typeof value !== 'number') return 'Late fees must be a number';
      if (value && (value < 0 || value > 1000)) return 'Late fees must be between $0 and $1,000';
      return null;

    case 'extensionFees':
      if (value && typeof value !== 'number') return 'Extension fees must be a number';
      if (value && (value < 0 || value > 5000)) return 'Extension fees must be between $0 and $5,000';
      return null;

    case 'appraisalFees':
      if (value && typeof value !== 'number') return 'Appraisal fees must be a number';
      if (value && (value < 0 || value > 5000)) return 'Appraisal fees must be between $0 and $5,000';
      return null;

    case 'titleFees':
      if (value && typeof value !== 'number') return 'Title fees must be a number';
      if (value && (value < 0 || value > 10000)) return 'Title fees must be between $0 and $10,000';
      return null;

    case 'escrowFees':
      if (value && typeof value !== 'number') return 'Escrow fees must be a number';
      if (value && (value < 0 || value > 5000)) return 'Escrow fees must be between $0 and $5,000';
      return null;

    case 'inspectionFees':
      if (value && typeof value !== 'number') return 'Inspection fees must be a number';
      if (value && (value < 0 || value > 2000)) return 'Inspection fees must be between $0 and $2,000';
      return null;

    case 'processingFees':
      if (value && typeof value !== 'number') return 'Processing fees must be a number';
      if (value && (value < 0 || value > 10000)) return 'Processing fees must be between $0 and $10,000';
      return null;

    case 'wireFees':
      if (value && typeof value !== 'number') return 'Wire fees must be a number';
      if (value && (value < 0 || value > 500)) return 'Wire fees must be between $0 and $500';
      return null;

    case 'taxRate':
      if (value && typeof value !== 'number') return 'Tax rate must be a number';
      if (value && (value < 0 || value > 50)) return 'Tax rate must be between 0% and 50%';
      return null;

    case 'inflationRate':
      if (value && typeof value !== 'number') return 'Inflation rate must be a number';
      if (value && (value < 0 || value > 10)) return 'Inflation rate must be between 0% and 10%';
      return null;

    case 'propertyType':
      if (!value) return 'Property type is required';
      const validPropertyTypes = ['single-family', 'multi-family', 'commercial', 'land', 'mixed-use', 'industrial'];
      if (!validPropertyTypes.includes(value)) return 'Invalid property type';
      return null;

    case 'loanPurpose':
      if (!value) return 'Loan purpose is required';
      const validLoanPurposes = ['purchase', 'refinance', 'fix-and-flip', 'construction', 'bridge', 'cash-out'];
      if (!validLoanPurposes.includes(value)) return 'Invalid loan purpose';
      return null;

    case 'propertyCondition':
      if (!value) return 'Property condition is required';
      const validPropertyConditions = ['excellent', 'good', 'fair', 'poor', 'needs-repair'];
      if (!validPropertyConditions.includes(value)) return 'Invalid property condition';
      return null;

    case 'location':
      if (!value) return 'Location is required';
      const validLocations = ['urban', 'suburban', 'rural'];
      if (!validLocations.includes(value)) return 'Invalid location';
      return null;

    case 'marketType':
      if (!value) return 'Market type is required';
      const validMarketTypes = ['hot', 'stable', 'declining'];
      if (!validMarketTypes.includes(value)) return 'Invalid market type';
      return null;

    case 'exitStrategy':
      if (!value) return 'Exit strategy is required';
      const validExitStrategies = ['sell', 'refinance', 'hold', 'flip'];
      if (!validExitStrategies.includes(value)) return 'Invalid exit strategy';
      return null;

    case 'experienceLevel':
      if (value) {
        const validExperienceLevels = ['beginner', 'intermediate', 'experienced', 'professional'];
        if (!validExperienceLevels.includes(value)) return 'Invalid experience level';
      }
      return null;

    default:
      return null;
  }
}
