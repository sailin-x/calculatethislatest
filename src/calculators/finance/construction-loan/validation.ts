import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateConstructionLoanInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'projectType', 'loanAmount', 'interestRate', 'loanTerm', 'constructionPeriod',
    'projectCost', 'landCost', 'constructionCost', 'softCosts', 'contingency',
    'equityContribution', 'drawSchedule', 'interestReserve', 'originationFee',
    'appraisalFee', 'legalFee', 'titleFee', 'inspectionFee', 'loanToCost',
    'loanToValue', 'completionValue', 'exitStrategy', 'constructionStartDate', 'completionDate'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Extract values for validation
  const loanAmount = inputs.loanAmount as number;
  const interestRate = inputs.interestRate as number;
  const loanTerm = inputs.loanTerm as number;
  const constructionPeriod = inputs.constructionPeriod as number;
  const projectCost = inputs.projectCost as number;
  const landCost = inputs.landCost as number;
  const constructionCost = inputs.constructionCost as number;
  const softCosts = inputs.softCosts as number;
  const contingency = inputs.contingency as number;
  const equityContribution = inputs.equityContribution as number;
  const interestReserve = inputs.interestReserve as number;
  const originationFee = inputs.originationFee as number;
  const appraisalFee = inputs.appraisalFee as number;
  const legalFee = inputs.legalFee as number;
  const titleFee = inputs.titleFee as number;
  const inspectionFee = inputs.inspectionFee as number;
  const loanToCost = inputs.loanToCost as number;
  const loanToValue = inputs.loanToValue as number;
  const completionValue = inputs.completionValue as number;
  const projectType = inputs.projectType as string;
  const drawSchedule = inputs.drawSchedule as string;
  const exitStrategy = inputs.exitStrategy as string;
  const constructionStartDate = inputs.constructionStartDate as string;
  const completionDate = inputs.completionDate as string;

  // Validate loan amount
  if (loanAmount < 100000) {
    errors.push('Loan amount must be at least $100,000');
  }
  if (loanAmount > 100000000) {
    errors.push('Loan amount cannot exceed $100,000,000');
  }

  // Validate interest rate
  if (interestRate < 1) {
    errors.push('Interest rate must be at least 1%');
  }
  if (interestRate > 25) {
    errors.push('Interest rate cannot exceed 25%');
  }

  // Validate loan term
  if (loanTerm < 6) {
    errors.push('Loan term must be at least 6 months');
  }
  if (loanTerm > 36) {
    errors.push('Loan term cannot exceed 36 months');
  }

  // Validate construction period
  if (constructionPeriod < 3) {
    errors.push('Construction period must be at least 3 months');
  }
  if (constructionPeriod > 24) {
    errors.push('Construction period cannot exceed 24 months');
  }

  // Validate construction period vs loan term
  if (constructionPeriod > loanTerm) {
    errors.push('Construction period cannot exceed loan term');
  }

  // Validate project cost
  if (projectCost < 100000) {
    errors.push('Project cost must be at least $100,000');
  }
  if (projectCost > 200000000) {
    errors.push('Project cost cannot exceed $200,000,000');
  }

  // Validate land cost
  if (landCost < 0) {
    errors.push('Land cost cannot be negative');
  }
  if (landCost > 100000000) {
    errors.push('Land cost cannot exceed $100,000,000');
  }

  // Validate construction cost
  if (constructionCost < 50000) {
    errors.push('Construction cost must be at least $50,000');
  }
  if (constructionCost > 150000000) {
    errors.push('Construction cost cannot exceed $150,000,000');
  }

  // Validate soft costs
  if (softCosts < 0) {
    errors.push('Soft costs cannot be negative');
  }
  if (softCosts > 50000000) {
    errors.push('Soft costs cannot exceed $50,000,000');
  }

  // Validate contingency
  if (contingency < 0) {
    errors.push('Contingency cannot be negative');
  }
  if (contingency > 20000000) {
    errors.push('Contingency cannot exceed $20,000,000');
  }

  // Validate equity contribution
  if (equityContribution < 0) {
    errors.push('Equity contribution cannot be negative');
  }
  if (equityContribution > 100000000) {
    errors.push('Equity contribution cannot exceed $100,000,000');
  }

  // Validate interest reserve
  if (interestReserve < 0) {
    errors.push('Interest reserve cannot be negative');
  }
  if (interestReserve > 10000000) {
    errors.push('Interest reserve cannot exceed $10,000,000');
  }

  // Validate origination fee
  if (originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  }
  if (originationFee > 5) {
    errors.push('Origination fee cannot exceed 5%');
  }

  // Validate appraisal fee
  if (appraisalFee < 0) {
    errors.push('Appraisal fee cannot be negative');
  }
  if (appraisalFee > 10000) {
    errors.push('Appraisal fee cannot exceed $10,000');
  }

  // Validate legal fee
  if (legalFee < 0) {
    errors.push('Legal fee cannot be negative');
  }
  if (legalFee > 25000) {
    errors.push('Legal fee cannot exceed $25,000');
  }

  // Validate title fee
  if (titleFee < 0) {
    errors.push('Title fee cannot be negative');
  }
  if (titleFee > 15000) {
    errors.push('Title fee cannot exceed $15,000');
  }

  // Validate inspection fee
  if (inspectionFee < 0) {
    errors.push('Inspection fee cannot be negative');
  }
  if (inspectionFee > 20000) {
    errors.push('Inspection fee cannot exceed $20,000');
  }

  // Validate LoanToCost ratio
  if (loanToCost < 50) {
    errors.push('LoanToCost ratio must be at least 50%');
  }
  if (loanToCost > 90) {
    errors.push('LoanToCost ratio cannot exceed 90%');
  }

  // Validate LoanToValue ratio
  if (loanToValue < 50) {
    errors.push('LoanToValue ratio must be at least 50%');
  }
  if (loanToValue > 85) {
    errors.push('LoanToValue ratio cannot exceed 85%');
  }

  // Validate completion value
  if (completionValue < 100000) {
    errors.push('Completion value must be at least $100,000');
  }
  if (completionValue > 300000000) {
    errors.push('Completion value cannot exceed $300,000,000');
  }

  // Validate project type
  const validProjectTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'land-development', 'renovation'];
  if (!validProjectTypes.includes(projectType)) {
    errors.push('Please select a valid project type');
  }

  // Validate draw schedule
  const validDrawSchedules = ['monthly', 'bi-monthly', 'quarterly', 'milestone'];
  if (!validDrawSchedules.includes(drawSchedule)) {
    errors.push('Please select a valid draw schedule');
  }

  // Validate exit strategy
  const validExitStrategies = ['sale', 'refinance', 'hold', 'lease'];
  if (!validExitStrategies.includes(exitStrategy)) {
    errors.push('Please select a valid exit strategy');
  }

  // Validate dates
  const startDate = new Date(constructionStartDate);
  const endDate = new Date(completionDate);
  const currentDate = new Date();

  if (isNaN(startDate.getTime())) {
    errors.push('Invalid construction start date');
  }
  if (isNaN(endDate.getTime())) {
    errors.push('Invalid completion date');
  }
  if (startDate >= endDate) {
    errors.push('Completion date must be after construction start date');
  }

  // Logical validation
  const calculatedProjectCost = landCost + constructionCost + softCosts + contingency;
  if (Math.abs(calculatedProjectCost - projectCost) > 1000) {
    errors.push('Project cost should equal sum of land cost, construction cost, soft costs, and contingency');
  }

  if (loanAmount > projectCost) {
    errors.push('Loan amount cannot exceed total project cost');
  }

  if (equityContribution > projectCost) {
    errors.push('Equity contribution cannot exceed total project cost');
  }

  if (loanAmount + equityContribution < projectCost) {
    errors.push('Loan amount plus equity contribution must cover total project cost');
  }

  if (completionValue <= projectCost) {
    errors.push('Completion value should be greater than project cost for profitable development');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateConstructionLoanInput(field: string, value: any): string | null {
  switch (field) {
    case 'loanAmount':
      if (value === undefined || value === null || value === '') {
        return 'Loan amount is required';
      }
      const loanAmount = Number(value);
      if (isNaN(loanAmount)) {
        return 'Loan amount must be a valid number';
      }
      if (loanAmount < 100000) {
        return 'Loan amount must be at least $100,000';
      }
      if (loanAmount > 100000000) {
        return 'Loan amount cannot exceed $100,000,000';
      }
      break;

    case 'interestRate':
      if (value === undefined || value === null || value === '') {
        return 'Interest rate is required';
      }
      const interestRate = Number(value);
      if (isNaN(interestRate)) {
        return 'Interest rate must be a valid number';
      }
      if (interestRate < 1) {
        return 'Interest rate must be at least 1%';
      }
      if (interestRate > 25) {
        return 'Interest rate cannot exceed 25%';
      }
      break;

    case 'constructionPeriod':
      if (value === undefined || value === null || value === '') {
        return 'Construction period is required';
      }
      const constructionPeriod = Number(value);
      if (isNaN(constructionPeriod)) {
        return 'Construction period must be a valid number';
      }
      if (constructionPeriod < 3) {
        return 'Construction period must be at least 3 months';
      }
      if (constructionPeriod > 24) {
        return 'Construction period cannot exceed 24 months';
      }
      break;

    case 'projectCost':
      if (value === undefined || value === null || value === '') {
        return 'Project cost is required';
      }
      const projectCost = Number(value);
      if (isNaN(projectCost)) {
        return 'Project cost must be a valid number';
      }
      if (projectCost < 100000) {
        return 'Project cost must be at least $100,000';
      }
      if (projectCost > 200000000) {
        return 'Project cost cannot exceed $200,000,000';
      }
      break;

    case 'completionValue':
      if (value === undefined || value === null || value === '') {
        return 'Completion value is required';
      }
      const completionValue = Number(value);
      if (isNaN(completionValue)) {
        return 'Completion value must be a valid number';
      }
      if (completionValue < 100000) {
        return 'Completion value must be at least $100,000';
      }
      if (completionValue > 300000000) {
        return 'Completion value cannot exceed $300,000,000';
      }
      break;

    case 'projectType':
      if (!value) {
        return 'Project type is required';
      }
      const validProjectTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'land-development', 'renovation'];
      if (!validProjectTypes.includes(value)) {
        return 'Please select a valid project type';
      }
      break;

    case 'drawSchedule':
      if (!value) {
        return 'Draw schedule is required';
      }
      const validDrawSchedules = ['monthly', 'bi-monthly', 'quarterly', 'milestone'];
      if (!validDrawSchedules.includes(value)) {
        return 'Please select a valid draw schedule';
      }
      break;

    case 'exitStrategy':
      if (!value) {
        return 'Exit strategy is required';
      }
      const validExitStrategies = ['sale', 'refinance', 'hold', 'lease'];
      if (!validExitStrategies.includes(value)) {
        return 'Please select a valid exit strategy';
      }
      break;
  }

  return null;
}
