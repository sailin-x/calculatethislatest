import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFHALoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'homePrice', 'downPayment', 'interestRate', 'loanTerm', 'annualIncome',
    'monthlyDebt', 'creditScore', 'propertyType', 'occupancyType', 'state',
    'propertyTaxes', 'homeInsurance', 'loanType'
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

  // Validate down payment
  const downPayment = Number(inputs.downPayment);
  if (isNaN(downPayment) || downPayment < 1000 || downPayment > 5000000) {
    errors.push('Down payment must be between $1,000 and $5,000,000');
  }

  // Validate interest rate
  const interestRate = Number(inputs.interestRate);
  if (isNaN(interestRate) || interestRate < 1 || interestRate > 20) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  // Validate loan term
  const loanTerm = Number(inputs.loanTerm);
  if (isNaN(loanTerm) || loanTerm < 15 || loanTerm > 30) {
    errors.push('Loan term must be between 15 and 30 years');
  }

  // Validate annual income
  const annualIncome = Number(inputs.annualIncome);
  if (isNaN(annualIncome) || annualIncome < 10000 || annualIncome > 1000000) {
    errors.push('Annual income must be between $10,000 and $1,000,000');
  }

  // Validate monthly debt
  const monthlyDebt = Number(inputs.monthlyDebt);
  if (isNaN(monthlyDebt) || monthlyDebt < 0 || monthlyDebt > 10000) {
    errors.push('Monthly debt must be between $0 and $10,000');
  }

  // Validate credit score
  const creditScore = Number(inputs.creditScore);
  if (isNaN(creditScore) || creditScore < 500 || creditScore > 850) {
    errors.push('Credit score must be between 500 and 850');
  }

  // Validate property type
  const validPropertyTypes = ['single-family', 'duplex', 'triplex', 'fourplex', 'condo', 'townhouse', 'manufactured'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Validate occupancy type
  const validOccupancyTypes = ['primary-residence', 'secondary-home', 'investment'];
  if (!validOccupancyTypes.includes(inputs.occupancyType)) {
    errors.push('Invalid occupancy type');
  }

  // Validate state
  const validStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  if (!validStates.includes(inputs.state)) {
    errors.push('Invalid state');
  }

  // Validate property taxes
  const propertyTaxes = Number(inputs.propertyTaxes);
  if (isNaN(propertyTaxes) || propertyTaxes < 0 || propertyTaxes > 100000) {
    errors.push('Property taxes must be between $0 and $100,000');
  }

  // Validate home insurance
  const homeInsurance = Number(inputs.homeInsurance);
  if (isNaN(homeInsurance) || homeInsurance < 0 || homeInsurance > 50000) {
    errors.push('Home insurance must be between $0 and $50,000');
  }

  // Validate loan type
  const validLoanTypes = ['standard', 'streamline-refinance', '203k-rehab', 'energy-efficient', 'reverse-mortgage'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.push('Invalid loan type');
  }

  // Validate optional fields if provided
  if (inputs.hoaFees !== undefined && inputs.hoaFees !== null) {
    const hoaFees = Number(inputs.hoaFees);
    if (isNaN(hoaFees) || hoaFees < 0 || hoaFees > 2000) {
      errors.push('HOA fees must be between $0 and $2,000');
    }
  }

  if (inputs.floodInsurance !== undefined && inputs.floodInsurance !== null) {
    const floodInsurance = Number(inputs.floodInsurance);
    if (isNaN(floodInsurance) || floodInsurance < 0 || floodInsurance > 10000) {
      errors.push('Flood insurance must be between $0 and $10,000');
    }
  }

  if (inputs.veteranStatus) {
    const validVeteranStatuses = ['none', 'veteran', 'active-duty', 'reserve', 'national-guard'];
    if (!validVeteranStatuses.includes(inputs.veteranStatus)) {
      errors.push('Invalid veteran status');
    }
  }

  if (inputs.firstTimeBuyer) {
    const validFirstTimeBuyer = ['yes', 'no', 'unknown'];
    if (!validFirstTimeBuyer.includes(inputs.firstTimeBuyer)) {
      errors.push('Invalid first-time buyer status');
    }
  }

  if (inputs.incomeType) {
    const validIncomeTypes = ['w2-employment', 'self-employed', 'retirement', 'disability', 'social-security', 'other'];
    if (!validIncomeTypes.includes(inputs.incomeType)) {
      errors.push('Invalid income type');
    }
  }

  if (inputs.employmentLength !== undefined && inputs.employmentLength !== null) {
    const employmentLength = Number(inputs.employmentLength);
    if (isNaN(employmentLength) || employmentLength < 0 || employmentLength > 50) {
      errors.push('Employment length must be between 0 and 50 years');
    }
  }

  if (inputs.reserves !== undefined && inputs.reserves !== null) {
    const reserves = Number(inputs.reserves);
    if (isNaN(reserves) || reserves < 0 || reserves > 1000000) {
      errors.push('Cash reserves must be between $0 and $1,000,000');
    }
  }

  if (inputs.giftFunds !== undefined && inputs.giftFunds !== null) {
    const giftFunds = Number(inputs.giftFunds);
    if (isNaN(giftFunds) || giftFunds < 0 || giftFunds > 100000) {
      errors.push('Gift funds must be between $0 and $100,000');
    }
  }

  if (inputs.sellerConcessions !== undefined && inputs.sellerConcessions !== null) {
    const sellerConcessions = Number(inputs.sellerConcessions);
    if (isNaN(sellerConcessions) || sellerConcessions < 0 || sellerConcessions > 100000) {
      errors.push('Seller concessions must be between $0 and $100,000');
    }
  }

  if (inputs.closingCosts !== undefined && inputs.closingCosts !== null) {
    const closingCosts = Number(inputs.closingCosts);
    if (isNaN(closingCosts) || closingCosts < 0 || closingCosts > 100000) {
      errors.push('Closing costs must be between $0 and $100,000');
    }
  }

  if (inputs.prepaidItems !== undefined && inputs.prepaidItems !== null) {
    const prepaidItems = Number(inputs.prepaidItems);
    if (isNaN(prepaidItems) || prepaidItems < 0 || prepaidItems > 50000) {
      errors.push('Prepaid items must be between $0 and $50,000');
    }
  }

  if (inputs.rateLock) {
    const validRateLocks = ['15', '30', '45', '60', '90'];
    if (!validRateLocks.includes(inputs.rateLock)) {
      errors.push('Invalid rate lock period');
    }
  }

  if (inputs.points !== undefined && inputs.points !== null) {
    const points = Number(inputs.points);
    if (isNaN(points) || points < 0 || points > 10) {
      errors.push('Discount points must be between 0 and 10');
    }
  }

  if (inputs.lenderCredits !== undefined && inputs.lenderCredits !== null) {
    const lenderCredits = Number(inputs.lenderCredits);
    if (isNaN(lenderCredits) || lenderCredits < 0 || lenderCredits > 50000) {
      errors.push('Lender credits must be between $0 and $50,000');
    }
  }

  // Logical consistency checks
  if (homePrice && downPayment) {
    if (downPayment > homePrice) {
      errors.push('Down payment cannot exceed home price');
    }
    const downPaymentPercentage = (downPayment / homePrice) * 100;
    if (downPaymentPercentage < 3.5) {
      errors.push('FHA loans require minimum 3.5% down payment');
    }
    if (downPaymentPercentage > 50) {
      errors.push('Down payment percentage is very high - verify accuracy');
    }
  }

  if (annualIncome && monthlyDebt) {
    const monthlyIncome = annualIncome / 12;
    const debtRatio = (monthlyDebt / monthlyIncome) * 100;
    if (debtRatio > 50) {
      errors.push('Monthly debt ratio is very high - may not qualify');
    }
  }

  if (creditScore < 580) {
    errors.push('Credit score below 580 may not qualify for FHA loan');
  }

  if (inputs.occupancyType === 'investment' && inputs.loanType === 'standard') {
    errors.push('FHA loans are not available for investment properties');
  }

  if (inputs.loanType === 'streamline-refinance' && downPayment > 0) {
    errors.push('Streamline refinance typically does not require additional down payment');
  }

  if (inputs.loanType === 'reverse-mortgage' && Number(inputs.annualIncome) > 0) {
    errors.push('Reverse mortgages are typically for borrowers with limited income');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateFHALoanInput(field: string, value: any): string | null {
  switch (field) {
    case 'homePrice':
      const homePrice = Number(value);
      if (isNaN(homePrice)) return 'Home price must be a number';
      if (homePrice < 50000) return 'Home price must be at least $50,000';
      if (homePrice > 10000000) return 'Home price cannot exceed $10,000,000';
      break;

    case 'downPayment':
      const downPayment = Number(value);
      if (isNaN(downPayment)) return 'Down payment must be a number';
      if (downPayment < 1000) return 'Down payment must be at least $1,000';
      if (downPayment > 5000000) return 'Down payment cannot exceed $5,000,000';
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
      if (loanTerm < 15) return 'Loan term must be at least 15 years';
      if (loanTerm > 30) return 'Loan term cannot exceed 30 years';
      break;

    case 'annualIncome':
      const annualIncome = Number(value);
      if (isNaN(annualIncome)) return 'Annual income must be a number';
      if (annualIncome < 10000) return 'Annual income must be at least $10,000';
      if (annualIncome > 1000000) return 'Annual income cannot exceed $1,000,000';
      break;

    case 'monthlyDebt':
      const monthlyDebt = Number(value);
      if (isNaN(monthlyDebt)) return 'Monthly debt must be a number';
      if (monthlyDebt < 0) return 'Monthly debt cannot be negative';
      if (monthlyDebt > 10000) return 'Monthly debt cannot exceed $10,000';
      break;

    case 'creditScore':
      const creditScore = Number(value);
      if (isNaN(creditScore)) return 'Credit score must be a number';
      if (creditScore < 500) return 'Credit score must be at least 500';
      if (creditScore > 850) return 'Credit score cannot exceed 850';
      break;

    case 'propertyTaxes':
      const propertyTaxes = Number(value);
      if (isNaN(propertyTaxes)) return 'Property taxes must be a number';
      if (propertyTaxes < 0) return 'Property taxes cannot be negative';
      if (propertyTaxes > 100000) return 'Property taxes cannot exceed $100,000';
      break;

    case 'homeInsurance':
      const homeInsurance = Number(value);
      if (isNaN(homeInsurance)) return 'Home insurance must be a number';
      if (homeInsurance < 0) return 'Home insurance cannot be negative';
      if (homeInsurance > 50000) return 'Home insurance cannot exceed $50,000';
      break;

    case 'hoaFees':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const hoaFees = Number(value);
      if (isNaN(hoaFees)) return 'HOA fees must be a number';
      if (hoaFees < 0) return 'HOA fees cannot be negative';
      if (hoaFees > 2000) return 'HOA fees cannot exceed $2,000';
      break;

    case 'floodInsurance':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const floodInsurance = Number(value);
      if (isNaN(floodInsurance)) return 'Flood insurance must be a number';
      if (floodInsurance < 0) return 'Flood insurance cannot be negative';
      if (floodInsurance > 10000) return 'Flood insurance cannot exceed $10,000';
      break;

    case 'employmentLength':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const employmentLength = Number(value);
      if (isNaN(employmentLength)) return 'Employment length must be a number';
      if (employmentLength < 0) return 'Employment length cannot be negative';
      if (employmentLength > 50) return 'Employment length cannot exceed 50 years';
      break;

    case 'reserves':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const reserves = Number(value);
      if (isNaN(reserves)) return 'Cash reserves must be a number';
      if (reserves < 0) return 'Cash reserves cannot be negative';
      if (reserves > 1000000) return 'Cash reserves cannot exceed $1,000,000';
      break;

    case 'giftFunds':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const giftFunds = Number(value);
      if (isNaN(giftFunds)) return 'Gift funds must be a number';
      if (giftFunds < 0) return 'Gift funds cannot be negative';
      if (giftFunds > 100000) return 'Gift funds cannot exceed $100,000';
      break;

    case 'sellerConcessions':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const sellerConcessions = Number(value);
      if (isNaN(sellerConcessions)) return 'Seller concessions must be a number';
      if (sellerConcessions < 0) return 'Seller concessions cannot be negative';
      if (sellerConcessions > 100000) return 'Seller concessions cannot exceed $100,000';
      break;

    case 'closingCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const closingCosts = Number(value);
      if (isNaN(closingCosts)) return 'Closing costs must be a number';
      if (closingCosts < 0) return 'Closing costs cannot be negative';
      if (closingCosts > 100000) return 'Closing costs cannot exceed $100,000';
      break;

    case 'prepaidItems':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const prepaidItems = Number(value);
      if (isNaN(prepaidItems)) return 'Prepaid items must be a number';
      if (prepaidItems < 0) return 'Prepaid items cannot be negative';
      if (prepaidItems > 50000) return 'Prepaid items cannot exceed $50,000';
      break;

    case 'points':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const points = Number(value);
      if (isNaN(points)) return 'Discount points must be a number';
      if (points < 0) return 'Discount points cannot be negative';
      if (points > 10) return 'Discount points cannot exceed 10';
      break;

    case 'lenderCredits':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const lenderCredits = Number(value);
      if (isNaN(lenderCredits)) return 'Lender credits must be a number';
      if (lenderCredits < 0) return 'Lender credits cannot be negative';
      if (lenderCredits > 50000) return 'Lender credits cannot exceed $50,000';
      break;
  }

  return null;
}
