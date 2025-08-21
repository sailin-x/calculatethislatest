import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageLifeInputs extends CalculatorInputs {
  mortgageBalance: number;
  propertyValue: number;
  monthlyPayment: number;
  interestRate?: number;
  loanTerm?: number;
  borrowerAge: number;
  coBorrowerAge?: number;
  healthStatus?: string;
  smokingStatus?: string;
  occupation?: string;
  annualIncome?: number;
  otherDebts?: number;
  savings?: number;
  dependents?: number;
  dependentsAge?: number;
  yearsToRetirement?: number;
  inflationRate?: number;
  investmentReturn?: number;
  lifeExpectancy?: number;
  existingLifeInsurance?: number;
  policyType?: string;
  policyTerm?: number;
  coverageAmount?: number;
  premiumFrequency?: string;
  riders?: string[];
  underwritingClass?: string;
  familyHistory?: string;
  lifestyleFactors?: string[];
  analysisPeriod?: number;
}

export const validateMortgageLifeInputs = (inputs: Partial<MortgageLifeInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.mortgageBalance || inputs.mortgageBalance <= 0) {
    errors.push('Mortgage balance is required and must be greater than 0');
  }

  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value is required and must be greater than 0');
  }

  if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) {
    errors.push('Monthly payment is required and must be greater than 0');
  }

  if (!inputs.borrowerAge || inputs.borrowerAge <= 0) {
    errors.push('Borrower age is required and must be greater than 0');
  }

  // Range validation
  if (inputs.mortgageBalance && (inputs.mortgageBalance < 10000 || inputs.mortgageBalance > 5000000)) {
    errors.push('Mortgage balance must be between $10,000 and $5,000,000');
  }

  if (inputs.propertyValue && (inputs.propertyValue < 10000 || inputs.propertyValue > 10000000)) {
    errors.push('Property value must be between $10,000 and $10,000,000');
  }

  if (inputs.monthlyPayment && (inputs.monthlyPayment < 100 || inputs.monthlyPayment > 50000)) {
    errors.push('Monthly payment must be between $100 and $50,000');
  }

  if (inputs.interestRate && (inputs.interestRate < 0 || inputs.interestRate > 25)) {
    errors.push('Interest rate must be between 0% and 25%');
  }

  if (inputs.loanTerm && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.borrowerAge && (inputs.borrowerAge < 18 || inputs.borrowerAge > 85)) {
    errors.push('Borrower age must be between 18 and 85 years');
  }

  if (inputs.coBorrowerAge && (inputs.coBorrowerAge < 18 || inputs.coBorrowerAge > 85)) {
    errors.push('Co-borrower age must be between 18 and 85 years');
  }

  if (inputs.annualIncome && (inputs.annualIncome < 0 || inputs.annualIncome > 10000000)) {
    errors.push('Annual income must be between $0 and $10,000,000');
  }

  if (inputs.otherDebts && (inputs.otherDebts < 0 || inputs.otherDebts > 5000000)) {
    errors.push('Other debts must be between $0 and $5,000,000');
  }

  if (inputs.savings && (inputs.savings < 0 || inputs.savings > 10000000)) {
    errors.push('Savings must be between $0 and $10,000,000');
  }

  if (inputs.dependents && (inputs.dependents < 0 || inputs.dependents > 10)) {
    errors.push('Number of dependents must be between 0 and 10');
  }

  if (inputs.dependentsAge && (inputs.dependentsAge < 0 || inputs.dependentsAge > 25)) {
    errors.push('Dependents age must be between 0 and 25 years');
  }

  if (inputs.yearsToRetirement && (inputs.yearsToRetirement < 0 || inputs.yearsToRetirement > 50)) {
    errors.push('Years to retirement must be between 0 and 50 years');
  }

  if (inputs.inflationRate && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  if (inputs.investmentReturn && (inputs.investmentReturn < 0 || inputs.investmentReturn > 15)) {
    errors.push('Investment return must be between 0% and 15%');
  }

  if (inputs.lifeExpectancy && (inputs.lifeExpectancy < 50 || inputs.lifeExpectancy > 120)) {
    errors.push('Life expectancy must be between 50 and 120 years');
  }

  if (inputs.existingLifeInsurance && (inputs.existingLifeInsurance < 0 || inputs.existingLifeInsurance > 10000000)) {
    errors.push('Existing life insurance must be between $0 and $10,000,000');
  }

  if (inputs.policyTerm && (inputs.policyTerm < 1 || inputs.policyTerm > 50)) {
    errors.push('Policy term must be between 1 and 50 years');
  }

  if (inputs.coverageAmount && (inputs.coverageAmount < 10000 || inputs.coverageAmount > 10000000)) {
    errors.push('Coverage amount must be between $10,000 and $10,000,000');
  }

  if (inputs.analysisPeriod && (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50)) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  // Logical validation
  if (inputs.mortgageBalance && inputs.propertyValue && inputs.mortgageBalance > inputs.propertyValue) {
    errors.push('Mortgage balance cannot exceed property value');
  }

  if (inputs.monthlyPayment && inputs.mortgageBalance) {
    const estimatedMonthlyPayment = inputs.mortgageBalance * 0.01; // Rough estimate
    if (inputs.monthlyPayment > estimatedMonthlyPayment * 2) {
      errors.push('Monthly payment seems unusually high for the mortgage balance');
    }
  }

  if (inputs.borrowerAge && inputs.coBorrowerAge) {
    const ageDifference = Math.abs(inputs.borrowerAge - inputs.coBorrowerAge);
    if (ageDifference > 30) {
      errors.push('Age difference between borrowers seems unusually large');
    }
  }

  if (inputs.dependents && inputs.dependentsAge) {
    if (inputs.dependentsAge > inputs.borrowerAge) {
      errors.push('Dependents age cannot exceed borrower age');
    }
  }

  if (inputs.yearsToRetirement && inputs.borrowerAge) {
    const retirementAge = inputs.borrowerAge + inputs.yearsToRetirement;
    if (retirementAge > 85) {
      errors.push('Retirement age would exceed typical retirement age');
    }
  }

  // Policy type validation
  if (inputs.policyType) {
    const validPolicyTypes = [
      'Term Life', 'Whole Life', 'Universal Life', 'Variable Life', 
      'Mortgage Protection', 'Decreasing Term', 'Level Term', 'Return of Premium'
    ];
    if (!validPolicyTypes.includes(inputs.policyType)) {
      errors.push('Invalid policy type selected');
    }
  }

  // Premium frequency validation
  if (inputs.premiumFrequency) {
    const validFrequencies = ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually'];
    if (!validFrequencies.includes(inputs.premiumFrequency)) {
      errors.push('Invalid premium frequency selected');
    }
  }

  // Health status validation
  if (inputs.healthStatus) {
    const validHealthStatuses = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Prefer Not to Say'];
    if (!validHealthStatuses.includes(inputs.healthStatus)) {
      errors.push('Invalid health status selected');
    }
  }

  // Smoking status validation
  if (inputs.smokingStatus) {
    const validSmokingStatuses = ['Non-Smoker', 'Former Smoker', 'Occasional Smoker', 'Regular Smoker', 'Prefer Not to Say'];
    if (!validSmokingStatuses.includes(inputs.smokingStatus)) {
      errors.push('Invalid smoking status selected');
    }
  }

  // Occupation validation
  if (inputs.occupation) {
    const validOccupations = [
      'Professional', 'Office Worker', 'Skilled Labor', 'Unskilled Labor', 
      'Military', 'Student', 'Retired', 'Self-Employed', 'Other'
    ];
    if (!validOccupations.includes(inputs.occupation)) {
      errors.push('Invalid occupation selected');
    }
  }

  // Underwriting class validation
  if (inputs.underwritingClass) {
    const validClasses = ['Preferred Plus', 'Preferred', 'Standard Plus', 'Standard', 'Substandard', 'Unknown'];
    if (!validClasses.includes(inputs.underwritingClass)) {
      errors.push('Invalid underwriting class selected');
    }
  }

  // Family history validation
  if (inputs.familyHistory) {
    const validFamilyHistories = ['Low Risk', 'Moderate Risk', 'High Risk', 'Unknown'];
    if (!validFamilyHistories.includes(inputs.familyHistory)) {
      errors.push('Invalid family history risk level selected');
    }
  }

  // Riders validation
  if (inputs.riders && inputs.riders.length > 0) {
    const validRiders = [
      'Accidental Death', 'Disability Waiver', 'Critical Illness', 'Long-Term Care',
      'Child Rider', 'Spouse Rider', 'Guaranteed Insurability', 'Return of Premium'
    ];
    const invalidRiders = inputs.riders.filter(rider => !validRiders.includes(rider));
    if (invalidRiders.length > 0) {
      errors.push(`Invalid riders selected: ${invalidRiders.join(', ')}`);
    }
  }

  // Lifestyle factors validation
  if (inputs.lifestyleFactors && inputs.lifestyleFactors.length > 0) {
    const validFactors = [
      'Regular Exercise', 'Healthy Diet', 'Moderate Alcohol', 'Recreational Sports',
      'Travel', 'Hazardous Hobbies', 'Military Service', 'None'
    ];
    const invalidFactors = inputs.lifestyleFactors.filter(factor => !validFactors.includes(factor));
    if (invalidFactors.length > 0) {
      errors.push(`Invalid lifestyle factors selected: ${invalidFactors.join(', ')}`);
    }
  }

  // Age and policy term compatibility
  if (inputs.borrowerAge && inputs.policyTerm) {
    const endAge = inputs.borrowerAge + inputs.policyTerm;
    if (endAge > 85) {
      errors.push('Policy term would extend beyond typical maximum age for life insurance');
    }
  }

  // Coverage amount validation
  if (inputs.coverageAmount && inputs.mortgageBalance) {
    if (inputs.coverageAmount < inputs.mortgageBalance * 0.5) {
      errors.push('Coverage amount seems low relative to mortgage balance');
    }
    if (inputs.coverageAmount > inputs.mortgageBalance * 5) {
      errors.push('Coverage amount seems high relative to mortgage balance');
    }
  }

  // Income and coverage validation
  if (inputs.annualIncome && inputs.coverageAmount) {
    const recommendedCoverage = inputs.annualIncome * 10; // Rule of thumb
    if (inputs.coverageAmount < recommendedCoverage * 0.5) {
      errors.push('Coverage amount may be insufficient based on income');
    }
    if (inputs.coverageAmount > recommendedCoverage * 3) {
      errors.push('Coverage amount may be excessive based on income');
    }
  }

  // Debt-to-income validation
  if (inputs.annualIncome && inputs.mortgageBalance && inputs.otherDebts) {
    const totalDebt = inputs.mortgageBalance + inputs.otherDebts;
    const debtToIncomeRatio = totalDebt / inputs.annualIncome;
    if (debtToIncomeRatio > 10) {
      errors.push('Total debt-to-income ratio seems unusually high');
    }
  }

  // Savings adequacy validation
  if (inputs.annualIncome && inputs.savings) {
    const savingsRatio = inputs.savings / inputs.annualIncome;
    if (savingsRatio < 0.1) {
      errors.push('Savings may be insufficient relative to income');
    }
  }

  return { isValid: errors.length === 0, errors };
};