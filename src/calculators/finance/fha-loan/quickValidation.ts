import { CalculatorInputs } from '../../../types/calculator';

export function validateHomePrice(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Home price must be a number' };
  }
  if (numValue < 50000) {
    return { isValid: false, message: 'Home price must be at least $50,000' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'Home price cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Down payment must be a number' };
  }
  if (numValue < 1000) {
    return { isValid: false, message: 'Down payment must be at least $1,000' };
  }
  if (numValue > 5000000) {
    return { isValid: false, message: 'Down payment cannot exceed $5,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  if (numValue > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a number' };
  }
  if (numValue < 15) {
    return { isValid: false, message: 'Loan term must be at least 15 years' };
  }
  if (numValue > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateAnnualIncome(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual income must be a number' };
  }
  if (numValue < 10000) {
    return { isValid: false, message: 'Annual income must be at least $10,000' };
  }
  if (numValue > 1000000) {
    return { isValid: false, message: 'Annual income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateMonthlyDebt(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Monthly debt must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Monthly debt cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Monthly debt cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateCreditScore(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Credit score must be a number' };
  }
  if (numValue < 500) {
    return { isValid: false, message: 'Credit score must be at least 500' };
  }
  if (numValue > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  if (numValue < 580) {
    return { isValid: true, message: 'Warning: Credit score below 580 may not qualify for FHA loan' };
  }
  return { isValid: true };
}

export function validatePropertyType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['single-family', 'duplex', 'triplex', 'fourplex', 'condo', 'townhouse', 'manufactured'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid property type' };
  }
  return { isValid: true };
}

export function validateOccupancyType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['primary-residence', 'secondary-home', 'investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid occupancy type' };
  }
  return { isValid: true };
}

export function validateState(value: any): { isValid: boolean; message?: string } {
  const validStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  if (!validStates.includes(value)) {
    return { isValid: false, message: 'Please select a valid state' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property taxes must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Property taxes cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateHomeInsurance(value: any): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Home insurance must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Home insurance cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Home insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateLoanType(value: any): { isValid: boolean; message?: string } {
  const validTypes = ['standard', 'streamline-refinance', '203k-rehab', 'energy-efficient', 'reverse-mortgage'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid loan type' };
  }
  return { isValid: true };
}

export function validateHOAFees(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'HOA fees must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'HOA fees cannot be negative' };
  }
  if (numValue > 2000) {
    return { isValid: false, message: 'HOA fees cannot exceed $2,000' };
  }
  return { isValid: true };
}

export function validateFloodInsurance(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Flood insurance must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Flood insurance cannot be negative' };
  }
  if (numValue > 10000) {
    return { isValid: false, message: 'Flood insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateVeteranStatus(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validStatuses = ['none', 'veteran', 'active-duty', 'reserve', 'national-guard'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, message: 'Please select a valid veteran status' };
  }
  return { isValid: true };
}

export function validateFirstTimeBuyer(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validValues = ['yes', 'no', 'unknown'];
  if (!validValues.includes(value)) {
    return { isValid: false, message: 'Please select a valid option' };
  }
  return { isValid: true };
}

export function validateIncomeType(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validTypes = ['w2-employment', 'self-employed', 'retirement', 'disability', 'social-security', 'other'];
  if (!validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid income type' };
  }
  return { isValid: true };
}

export function validateEmploymentLength(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Employment length must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Employment length cannot be negative' };
  }
  if (numValue > 50) {
    return { isValid: false, message: 'Employment length cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateReserves(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Cash reserves must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Cash reserves cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, message: 'Cash reserves cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateGiftFunds(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Gift funds must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Gift funds cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Gift funds cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateSellerConcessions(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Seller concessions must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Seller concessions cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Seller concessions cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateClosingCosts(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Closing costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Closing costs cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validatePrepaidItems(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Prepaid items must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Prepaid items cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Prepaid items cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateRateLock(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validPeriods = ['15', '30', '45', '60', '90'];
  if (!validPeriods.includes(value)) {
    return { isValid: false, message: 'Please select a valid rate lock period' };
  }
  return { isValid: true };
}

export function validatePoints(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Discount points must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Discount points cannot be negative' };
  }
  if (numValue > 10) {
    return { isValid: false, message: 'Discount points cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateLenderCredits(value: any): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Lender credits must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Lender credits cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Lender credits cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateAllFHALoanInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  const requiredFields = [
    'homePrice', 'downPayment', 'interestRate', 'loanTerm', 'annualIncome',
    'monthlyDebt', 'creditScore', 'propertyType', 'occupancyType', 'state',
    'propertyTaxes', 'homeInsurance', 'loanType'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  });

  // Individual field validation
  if (inputs.homePrice !== undefined) {
    const result = validateHomePrice(inputs.homePrice);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.downPayment !== undefined) {
    const result = validateDownPayment(inputs.downPayment);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.interestRate !== undefined) {
    const result = validateInterestRate(inputs.interestRate);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanTerm !== undefined) {
    const result = validateLoanTerm(inputs.loanTerm);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualIncome !== undefined) {
    const result = validateAnnualIncome(inputs.annualIncome);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.monthlyDebt !== undefined) {
    const result = validateMonthlyDebt(inputs.monthlyDebt);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.creditScore !== undefined) {
    const result = validateCreditScore(inputs.creditScore);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyType !== undefined) {
    const result = validatePropertyType(inputs.propertyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.occupancyType !== undefined) {
    const result = validateOccupancyType(inputs.occupancyType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.state !== undefined) {
    const result = validateState(inputs.state);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.propertyTaxes !== undefined) {
    const result = validatePropertyTaxes(inputs.propertyTaxes);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.homeInsurance !== undefined) {
    const result = validateHomeInsurance(inputs.homeInsurance);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanType !== undefined) {
    const result = validateLoanType(inputs.loanType);
    if (!result.isValid) errors.push(result.message!);
  }

  // Optional fields validation
  if (inputs.hoaFees !== undefined) {
    const result = validateHOAFees(inputs.hoaFees);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.floodInsurance !== undefined) {
    const result = validateFloodInsurance(inputs.floodInsurance);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.veteranStatus !== undefined) {
    const result = validateVeteranStatus(inputs.veteranStatus);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.firstTimeBuyer !== undefined) {
    const result = validateFirstTimeBuyer(inputs.firstTimeBuyer);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.incomeType !== undefined) {
    const result = validateIncomeType(inputs.incomeType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.employmentLength !== undefined) {
    const result = validateEmploymentLength(inputs.employmentLength);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.reserves !== undefined) {
    const result = validateReserves(inputs.reserves);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.giftFunds !== undefined) {
    const result = validateGiftFunds(inputs.giftFunds);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.sellerConcessions !== undefined) {
    const result = validateSellerConcessions(inputs.sellerConcessions);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.closingCosts !== undefined) {
    const result = validateClosingCosts(inputs.closingCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.prepaidItems !== undefined) {
    const result = validatePrepaidItems(inputs.prepaidItems);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.rateLock !== undefined) {
    const result = validateRateLock(inputs.rateLock);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.points !== undefined) {
    const result = validatePoints(inputs.points);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.lenderCredits !== undefined) {
    const result = validateLenderCredits(inputs.lenderCredits);
    if (!result.isValid) errors.push(result.message!);
  }

  // Cross-field validation
  if (inputs.homePrice && inputs.downPayment) {
    const homePrice = Number(inputs.homePrice);
    const downPayment = Number(inputs.downPayment);
    if (downPayment > homePrice) {
      errors.push('Down payment cannot exceed home price');
    } else {
      const downPaymentPercentage = (downPayment / homePrice) * 100;
      if (downPaymentPercentage < 3.5) {
        errors.push('FHA loans require minimum 3.5% down payment');
      }
    }
  }

  if (inputs.annualIncome && inputs.monthlyDebt) {
    const annualIncome = Number(inputs.annualIncome);
    const monthlyDebt = Number(inputs.monthlyDebt);
    const monthlyIncome = annualIncome / 12;
    const debtRatio = (monthlyDebt / monthlyIncome) * 100;
    if (debtRatio > 50) {
      errors.push('Monthly debt ratio is very high - may not qualify');
    }
  }

  if (inputs.occupancyType === 'investment' && inputs.loanType === 'standard') {
    errors.push('FHA loans are not available for investment properties');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
