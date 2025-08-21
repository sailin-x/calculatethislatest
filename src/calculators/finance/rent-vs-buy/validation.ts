import { ValidationRuleFactory } from '../../../utils/validation/ValidationRuleFactory';
import { RentVsBuyInputs } from './formulas';

export function validateRentVsBuyInputs(inputs: RentVsBuyInputs): string[] {
  const errors: string[] = [];
  const ruleFactory = new ValidationRuleFactory();

  // Required field validations
  if (!inputs.homePrice) {
    errors.push('Home price is required');
  } else {
    ruleFactory
      .createRule('homePrice')
      .isNumber()
      .min(50000, 'Home price must be at least $50,000')
      .max(10000000, 'Home price cannot exceed $10,000,000')
      .validate(inputs.homePrice, errors);
  }

  if (!inputs.downPayment) {
    errors.push('Down payment is required');
  } else {
    ruleFactory
      .createRule('downPayment')
      .isNumber()
      .min(0, 'Down payment cannot be negative')
      .max(10000000, 'Down payment cannot exceed $10,000,000')
      .validate(inputs.downPayment, errors);
  }

  if (!inputs.monthlyRent) {
    errors.push('Monthly rent is required');
  } else {
    ruleFactory
      .createRule('monthlyRent')
      .isNumber()
      .min(100, 'Monthly rent must be at least $100')
      .max(50000, 'Monthly rent cannot exceed $50,000')
      .validate(inputs.monthlyRent, errors);
  }

  // Loan term validation
  if (inputs.loanTerm) {
    ruleFactory
      .createRule('loanTerm')
      .isNumber()
      .min(5, 'Loan term must be at least 5 years')
      .max(50, 'Loan term cannot exceed 50 years')
      .validate(inputs.loanTerm, errors);
  }

  // Interest rate validation
  if (inputs.interestRate) {
    ruleFactory
      .createRule('interestRate')
      .isNumber()
      .min(0.1, 'Interest rate must be at least 0.1%')
      .max(20, 'Interest rate cannot exceed 20%')
      .validate(inputs.interestRate, errors);
  }

  // Rent increase rate validation
  if (inputs.rentIncreaseRate) {
    ruleFactory
      .createRule('rentIncreaseRate')
      .isNumber()
      .min(-50, 'Rent increase rate cannot be less than -50%')
      .max(50, 'Rent increase rate cannot exceed 50%')
      .validate(inputs.rentIncreaseRate, errors);
  }

  // Property tax rate validation
  if (inputs.propertyTaxRate) {
    ruleFactory
      .createRule('propertyTaxRate')
      .isNumber()
      .min(0, 'Property tax rate cannot be negative')
      .max(10, 'Property tax rate cannot exceed 10%')
      .validate(inputs.propertyTaxRate, errors);
  }

  // Home insurance rate validation
  if (inputs.homeInsuranceRate) {
    ruleFactory
      .createRule('homeInsuranceRate')
      .isNumber()
      .min(0, 'Home insurance rate cannot be negative')
      .max(5, 'Home insurance rate cannot exceed 5%')
      .validate(inputs.homeInsuranceRate, errors);
  }

  // Maintenance rate validation
  if (inputs.maintenanceRate) {
    ruleFactory
      .createRule('maintenanceRate')
      .isNumber()
      .min(0, 'Maintenance rate cannot be negative')
      .max(10, 'Maintenance rate cannot exceed 10%')
      .validate(inputs.maintenanceRate, errors);
  }

  // HOA fees validation
  if (inputs.hoaFees) {
    ruleFactory
      .createRule('hoaFees')
      .isNumber()
      .min(0, 'HOA fees cannot be negative')
      .max(5000, 'HOA fees cannot exceed $5,000/month')
      .validate(inputs.hoaFees, errors);
  }

  // Closing costs validation
  if (inputs.closingCosts) {
    ruleFactory
      .createRule('closingCosts')
      .isNumber()
      .min(0, 'Closing costs cannot be negative')
      .max(100000, 'Closing costs cannot exceed $100,000')
      .validate(inputs.closingCosts, errors);
  }

  // Renter insurance validation
  if (inputs.renterInsurance) {
    ruleFactory
      .createRule('renterInsurance')
      .isNumber()
      .min(0, 'Renter insurance cannot be negative')
      .max(500, 'Renter insurance cannot exceed $500/month')
      .validate(inputs.renterInsurance, errors);
  }

  // Utilities validation
  if (inputs.utilities) {
    ruleFactory
      .createRule('utilities')
      .isNumber()
      .min(0, 'Utilities cannot be negative')
      .max(2000, 'Utilities cannot exceed $2,000/month')
      .validate(inputs.utilities, errors);
  }

  // Home appreciation rate validation
  if (inputs.homeAppreciationRate) {
    ruleFactory
      .createRule('homeAppreciationRate')
      .isNumber()
      .min(-50, 'Home appreciation rate cannot be less than -50%')
      .max(50, 'Home appreciation rate cannot exceed 50%')
      .validate(inputs.homeAppreciationRate, errors);
  }

  // Investment return rate validation
  if (inputs.investmentReturnRate) {
    ruleFactory
      .createRule('investmentReturnRate')
      .isNumber()
      .min(-50, 'Investment return rate cannot be less than -50%')
      .max(50, 'Investment return rate cannot exceed 50%')
      .validate(inputs.investmentReturnRate, errors);
  }

  // Tax deduction rate validation
  if (inputs.taxDeductionRate) {
    ruleFactory
      .createRule('taxDeductionRate')
      .isNumber()
      .min(0, 'Tax deduction rate cannot be negative')
      .max(50, 'Tax deduction rate cannot exceed 50%')
      .validate(inputs.taxDeductionRate, errors);
  }

  // Analysis period validation
  if (inputs.analysisPeriod) {
    ruleFactory
      .createRule('analysisPeriod')
      .isNumber()
      .min(1, 'Analysis period must be at least 1 year')
      .max(50, 'Analysis period cannot exceed 50 years')
      .validate(inputs.analysisPeriod, errors);
  }

  // Inflation rate validation
  if (inputs.inflationRate) {
    ruleFactory
      .createRule('inflationRate')
      .isNumber()
      .min(-50, 'Inflation rate cannot be less than -50%')
      .max(50, 'Inflation rate cannot exceed 50%')
      .validate(inputs.inflationRate, errors);
  }

  // Opportunity cost validation
  if (inputs.opportunityCost) {
    ruleFactory
      .createRule('opportunityCost')
      .isNumber()
      .min(0, 'Opportunity cost cannot be negative')
      .max(10000, 'Opportunity cost cannot exceed $10,000/month')
      .validate(inputs.opportunityCost, errors);
  }

  // Moving costs validation
  if (inputs.movingCosts) {
    ruleFactory
      .createRule('movingCosts')
      .isNumber()
      .min(0, 'Moving costs cannot be negative')
      .max(50000, 'Moving costs cannot exceed $50,000')
      .validate(inputs.movingCosts, errors);
  }

  // Renovation costs validation
  if (inputs.renovationCosts) {
    ruleFactory
      .createRule('renovationCosts')
      .isNumber()
      .min(0, 'Renovation costs cannot be negative')
      .max(500000, 'Renovation costs cannot exceed $500,000')
      .validate(inputs.renovationCosts, errors);
  }

  // Property management fees validation
  if (inputs.propertyManagementFees) {
    ruleFactory
      .createRule('propertyManagementFees')
      .isNumber()
      .min(0, 'Property management fees cannot be negative')
      .max(20, 'Property management fees cannot exceed 20%')
      .validate(inputs.propertyManagementFees, errors);
  }

  // Vacancy rate validation
  if (inputs.vacancyRate) {
    ruleFactory
      .createRule('vacancyRate')
      .isNumber()
      .min(0, 'Vacancy rate cannot be negative')
      .max(50, 'Vacancy rate cannot exceed 50%')
      .validate(inputs.vacancyRate, errors);
  }

  // Rental income validation
  if (inputs.rentalIncome) {
    ruleFactory
      .createRule('rentalIncome')
      .isNumber()
      .min(0, 'Rental income cannot be negative')
      .max(50000, 'Rental income cannot exceed $50,000/month')
      .validate(inputs.rentalIncome, errors);
  }

  // Credit score validation
  if (inputs.creditScore) {
    ruleFactory
      .createRule('creditScore')
      .isNumber()
      .min(300, 'Credit score must be at least 300')
      .max(850, 'Credit score cannot exceed 850')
      .validate(inputs.creditScore, errors);
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio) {
    ruleFactory
      .createRule('debtToIncomeRatio')
      .isNumber()
      .min(0, 'Debt-to-income ratio cannot be negative')
      .max(100, 'Debt-to-income ratio cannot exceed 100%')
      .validate(inputs.debtToIncomeRatio, errors);
  }

  // Emergency fund validation
  if (inputs.emergencyFund) {
    ruleFactory
      .createRule('emergencyFund')
      .isNumber()
      .min(0, 'Emergency fund cannot be negative')
      .max(1000000, 'Emergency fund cannot exceed $1,000,000')
      .validate(inputs.emergencyFund, errors);
  }

  // Job stability validation
  if (inputs.jobStability) {
    const validJobStability = ['very-stable', 'stable', 'moderate', 'unstable', 'very-unstable'];
    if (!validJobStability.includes(inputs.jobStability)) {
      errors.push('Invalid job stability selected');
    }
  }

  // Market conditions validation
  if (inputs.marketConditions) {
    const validMarketConditions = ['buyers-market', 'normal', 'sellers-market', 'hot-market'];
    if (!validMarketConditions.includes(inputs.marketConditions)) {
      errors.push('Invalid market conditions selected');
    }
  }

  // Location growth validation
  if (inputs.locationGrowth) {
    const validLocationGrowth = ['declining', 'slow', 'moderate', 'strong', 'explosive'];
    if (!validLocationGrowth.includes(inputs.locationGrowth)) {
      errors.push('Invalid location growth selected');
    }
  }

  // Business logic validations
  if (inputs.homePrice && inputs.downPayment) {
    if (inputs.downPayment > inputs.homePrice) {
      errors.push('Down payment cannot exceed home price');
    }

    const downPaymentPercentage = (inputs.downPayment / inputs.homePrice) * 100;
    if (downPaymentPercentage < 3) {
      errors.push('Down payment should be at least 3% of home price');
    }
  }

  if (inputs.homePrice && inputs.monthlyRent) {
    const rentToPriceRatio = (inputs.monthlyRent * 12) / inputs.homePrice;
    if (rentToPriceRatio > 0.15) {
      errors.push('Annual rent should not exceed 15% of home price');
    }
    if (rentToPriceRatio < 0.02) {
      errors.push('Annual rent should be at least 2% of home price');
    }
  }

  if (inputs.interestRate && inputs.loanTerm) {
    const monthlyPayment = calculateMonthlyPayment(inputs.homePrice || 0, inputs.downPayment || 0, inputs.interestRate, inputs.loanTerm);
    const annualPayment = monthlyPayment * 12;
    const annualIncome = inputs.monthlyRent ? inputs.monthlyRent * 12 * 3 : 0; // Estimate income as 3x annual rent
    
    if (annualPayment > annualIncome * 0.43) {
      errors.push('Monthly mortgage payment may exceed recommended debt-to-income ratio');
    }
  }

  if (inputs.analysisPeriod && inputs.loanTerm) {
    if (inputs.analysisPeriod > inputs.loanTerm) {
      errors.push('Analysis period should not exceed loan term');
    }
  }

  if (inputs.rentalIncome && inputs.monthlyRent) {
    if (inputs.rentalIncome < inputs.monthlyRent * 0.8) {
      errors.push('Rental income should be at least 80% of current rent');
    }
  }

  return errors;
}

function calculateMonthlyPayment(homePrice: number, downPayment: number, interestRate: number, loanTerm: number): number {
  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  if (monthlyInterestRate === 0) {
    return loanAmount / totalPayments;
  }

  return loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
}