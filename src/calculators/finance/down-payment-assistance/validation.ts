import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateDownPaymentAssistanceInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'homePrice', 'downPaymentPercentage', 'annualIncome', 'householdSize',
    'creditScore', 'location', 'propertyType', 'occupancyType', 'firstTimeBuyer',
    'veteranStatus', 'ruralArea', 'targetArea', 'existingDebt', 'savingsAmount',
    'loanType', 'interestRate', 'loanTerm'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate home price
  const homePrice = Number(inputs.homePrice);
  if (isNaN(homePrice) || homePrice < 50000 || homePrice > 10000000) {
    errors.push('Home price must be between $50,000 and $10,000,000');
  }

  // Validate down payment percentage
  const downPaymentPercentage = Number(inputs.downPaymentPercentage);
  if (isNaN(downPaymentPercentage) || downPaymentPercentage < 0 || downPaymentPercentage > 50) {
    errors.push('Down payment percentage must be between 0% and 50%');
  }

  // Validate annual income
  const annualIncome = Number(inputs.annualIncome);
  if (isNaN(annualIncome) || annualIncome < 10000 || annualIncome > 500000) {
    errors.push('Annual income must be between $10,000 and $500,000');
  }

  // Validate household size
  const householdSize = Number(inputs.householdSize);
  if (isNaN(householdSize) || householdSize < 1 || householdSize > 10) {
    errors.push('Household size must be between 1 and 10 people');
  }

  // Validate credit score
  const creditScore = Number(inputs.creditScore);
  if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) {
    errors.push('Credit score must be between 300 and 850');
  }

  // Validate location
  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
    'VA', 'WA', 'WV', 'WI', 'WY', 'DC', 'PR', 'VI'
  ];
  if (!validStates.includes(inputs.location)) {
    errors.push('Invalid location/state selected');
  }

  // Validate property type
  const validPropertyTypes = ['single-family', 'condo', 'townhouse', 'manufactured', 'multi-family'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type selected');
  }

  // Validate occupancy type
  const validOccupancyTypes = ['primary', 'secondary', 'investment'];
  if (!validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type selected');
  }

  // Validate first time buyer
  if (!['yes', 'no'].includes(inputs.firstTimeBuyer)) {
    errors.push('First-time buyer must be yes or no');
  }

  // Validate veteran status
  const validVeteranStatuses = ['veteran', 'active-duty', 'reserves', 'spouse', 'none'];
  if (!validVeteranStatuses.includes(inputs.veteranStatus)) {
    errors.push('Invalid veteran status selected');
  }

  // Validate rural area
  if (!['yes', 'no'].includes(inputs.ruralArea)) {
    errors.push('Rural area must be yes or no');
  }

  // Validate target area
  if (!['yes', 'no'].includes(inputs.targetArea)) {
    errors.push('Target area must be yes or no');
  }

  // Validate existing debt
  const existingDebt = Number(inputs.existingDebt);
  if (isNaN(existingDebt) || existingDebt < 0 || existingDebt > 10000) {
    errors.push('Existing monthly debt must be between $0 and $10,000');
  }

  // Validate savings amount
  const savingsAmount = Number(inputs.savingsAmount);
  if (isNaN(savingsAmount) || savingsAmount < 0 || savingsAmount > 1000000) {
    errors.push('Available savings must be between $0 and $1,000,000');
  }

  // Validate loan type
  const validLoanTypes = ['conventional', 'fha', 'va', 'usda', 'any'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.push('Invalid loan type selected');
  }

  // Validate interest rate
  const interestRate = Number(inputs.interestRate);
  if (isNaN(interestRate) || interestRate < 1 || interestRate > 20) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  // Validate loan term
  const loanTerm = Number(inputs.loanTerm);
  if (isNaN(loanTerm) || loanTerm < 10 || loanTerm > 50) {
    errors.push('Loan term must be between 10 and 50 years');
  }

  // Logical consistency checks
  if (homePrice && downPaymentPercentage && savingsAmount) {
    const downPaymentRequired = homePrice * (downPaymentPercentage / 100);
    if (savingsAmount > downPaymentRequired * 2) {
      errors.push('Available savings significantly exceeds required down payment - consider adjusting');
    }
  }

  if (annualIncome && existingDebt) {
    const monthlyIncome = annualIncome / 12;
    if (existingDebt > monthlyIncome * 0.8) {
      errors.push('Existing debt is very high relative to income - may affect loan approval');
    }
  }

  if (creditScore && inputs.loanType) {
    if (creditScore < 580 && inputs.loanType === 'fha') {
      errors.push('FHA loans typically require a minimum credit score of 580');
    }
    if (creditScore < 620 && inputs.loanType === 'conventional') {
      errors.push('Conventional loans typically require a minimum credit score of 620');
    }
  }

  if (inputs.veteranStatus && inputs.loanType) {
    if (inputs.veteranStatus !== 'none' && inputs.loanType !== 'va' && inputs.loanType !== 'any') {
      errors.push('Consider VA loan option for veterans - typically offers better terms');
    }
    if (inputs.veteranStatus === 'none' && inputs.loanType === 'va') {
      errors.push('VA loans are only available to eligible veterans and service members');
    }
  }

  if (inputs.ruralArea && inputs.loanType) {
    if (inputs.ruralArea === 'yes' && inputs.loanType !== 'usda' && inputs.loanType !== 'any') {
      errors.push('Consider USDA loan option for rural properties - may offer better terms');
    }
    if (inputs.ruralArea === 'no' && inputs.loanType === 'usda') {
      errors.push('USDA loans are only available for rural properties');
    }
  }

  if (inputs.occupancyType && inputs.loanType) {
    if (inputs.occupancyType === 'investment' && (inputs.loanType === 'fha' || inputs.loanType === 'va' || inputs.loanType === 'usda')) {
      errors.push('FHA, VA, and USDA loans are typically not available for investment properties');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateDownPaymentAssistanceInput(field: string, value: any): string | null {
  switch (field) {
    case 'homePrice':
      const homePrice = Number(value);
      if (isNaN(homePrice)) return 'Home price must be a number';
      if (homePrice < 50000) return 'Home price must be at least $50,000';
      if (homePrice > 10000000) return 'Home price cannot exceed $10,000,000';
      break;

    case 'downPaymentPercentage':
      const downPaymentPercentage = Number(value);
      if (isNaN(downPaymentPercentage)) return 'Down payment percentage must be a number';
      if (downPaymentPercentage < 0) return 'Down payment percentage cannot be negative';
      if (downPaymentPercentage > 50) return 'Down payment percentage cannot exceed 50%';
      break;

    case 'annualIncome':
      const annualIncome = Number(value);
      if (isNaN(annualIncome)) return 'Annual income must be a number';
      if (annualIncome < 10000) return 'Annual income must be at least $10,000';
      if (annualIncome > 500000) return 'Annual income cannot exceed $500,000';
      break;

    case 'householdSize':
      const householdSize = Number(value);
      if (isNaN(householdSize)) return 'Household size must be a number';
      if (householdSize < 1) return 'Household size must be at least 1';
      if (householdSize > 10) return 'Household size cannot exceed 10';
      break;

    case 'creditScore':
      const creditScore = Number(value);
      if (isNaN(creditScore)) return 'Credit score must be a number';
      if (creditScore < 300) return 'Credit score must be at least 300';
      if (creditScore > 850) return 'Credit score cannot exceed 850';
      break;

    case 'existingDebt':
      const existingDebt = Number(value);
      if (isNaN(existingDebt)) return 'Existing debt must be a number';
      if (existingDebt < 0) return 'Existing debt cannot be negative';
      if (existingDebt > 10000) return 'Existing debt cannot exceed $10,000';
      break;

    case 'savingsAmount':
      const savingsAmount = Number(value);
      if (isNaN(savingsAmount)) return 'Savings amount must be a number';
      if (savingsAmount < 0) return 'Savings amount cannot be negative';
      if (savingsAmount > 1000000) return 'Savings amount cannot exceed $1,000,000';
      break;

    case 'interestRate':
      const interestRate = Number(value);
      if (isNaN(interestRate)) return 'Interest rate must be a number';
      if (interestRate < 1) return 'Interest rate must be at least 1%';
      if (interestRate > 20) return 'Interest rate cannot exceed 20%';
      break;

    case 'loanTerm':
      const loanTerm = Number(value);
      if (isNaN(loanTerm)) return 'Loan term must be a number';
      if (loanTerm < 10) return 'Loan term must be at least 10 years';
      if (loanTerm > 50) return 'Loan term cannot exceed 50 years';
      break;
  }

  return null;
}
