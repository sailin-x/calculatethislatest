import { LoanToCostInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateLoanToCostInputs(inputs: LoanToCostInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push('Loan amount must be greater than 0');
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 1) {
    errors.push('Interest rate must be between 0 and 1 (0% to 100%)');
  }

  if (!inputs.loanTerm || inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than 0');
  }

  if (!inputs.projectSize || inputs.projectSize <= 0) {
    errors.push('Project size must be greater than 0');
  }

  if (!inputs.projectAddress || inputs.projectAddress.trim() === '') {
    errors.push('Project address is required');
  }

  if (!inputs.projectDescription || inputs.projectDescription.trim() === '') {
    errors.push('Project description is required');
  }

  // Cost validations
  if (!inputs.landCost || inputs.landCost < 0) {
    errors.push('Land cost must be non-negative');
  }

  if (!inputs.constructionCost || inputs.constructionCost <= 0) {
    errors.push('Construction cost must be greater than 0');
  }

  if (!inputs.softCosts || inputs.softCosts < 0) {
    errors.push('Soft costs must be non-negative');
  }

  if (!inputs.contingencyCost || inputs.contingencyCost < 0) {
    errors.push('Contingency cost must be non-negative');
  }

  if (!inputs.totalProjectCost || inputs.totalProjectCost <= 0) {
    errors.push('Total project cost must be greater than 0');
  }

  // Construction cost breakdown validations
  if (inputs.siteWorkCost < 0) {
    errors.push('Site work cost must be non-negative');
  }

  if (inputs.foundationCost < 0) {
    errors.push('Foundation cost must be non-negative');
  }

  if (inputs.structuralCost < 0) {
    errors.push('Structural cost must be non-negative');
  }

  if (inputs.exteriorCost < 0) {
    errors.push('Exterior cost must be non-negative');
  }

  if (inputs.interiorCost < 0) {
    errors.push('Interior cost must be non-negative');
  }

  if (inputs.mechanicalCost < 0) {
    errors.push('Mechanical cost must be non-negative');
  }

  if (inputs.electricalCost < 0) {
    errors.push('Electrical cost must be non-negative');
  }

  if (inputs.plumbingCost < 0) {
    errors.push('Plumbing cost must be non-negative');
  }

  if (inputs.finishCost < 0) {
    errors.push('Finish cost must be non-negative');
  }

  // Soft cost breakdown validations
  if (inputs.architecturalFees < 0) {
    errors.push('Architectural fees must be non-negative');
  }

  if (inputs.engineeringFees < 0) {
    errors.push('Engineering fees must be non-negative');
  }

  if (inputs.permitFees < 0) {
    errors.push('Permit fees must be non-negative');
  }

  if (inputs.legalFees < 0) {
    errors.push('Legal fees must be non-negative');
  }

  if (inputs.insuranceCost < 0) {
    errors.push('Insurance cost must be non-negative');
  }

  if (inputs.appraisalFees < 0) {
    errors.push('Appraisal fees must be non-negative');
  }

  if (inputs.surveyFees < 0) {
    errors.push('Survey fees must be non-negative');
  }

  if (inputs.environmentalFees < 0) {
    errors.push('Environmental fees must be non-negative');
  }

  if (inputs.otherSoftCosts < 0) {
    errors.push('Other soft costs must be non-negative');
  }

  // Timeline validations
  if (!inputs.constructionStartDate || inputs.constructionStartDate.trim() === '') {
    errors.push('Construction start date is required');
  }

  if (!inputs.constructionEndDate || inputs.constructionEndDate.trim() === '') {
    errors.push('Construction end date is required');
  }

  if (!inputs.constructionDuration || inputs.constructionDuration <= 0) {
    errors.push('Construction duration must be greater than 0');
  }

  // Draw schedule validations
  if (!inputs.drawSchedule || inputs.drawSchedule.length === 0) {
    errors.push('Draw schedule is required');
  } else {
    let totalPercentage = 0;
    let totalAmount = 0;
    
    for (let i = 0; i < inputs.drawSchedule.length; i++) {
      const draw = inputs.drawSchedule[i];
      
      if (!draw.draw || draw.draw <= 0) {
        errors.push(`Draw ${i + 1}: Draw number must be greater than 0`);
      }
      
      if (!draw.percentage || draw.percentage <= 0 || draw.percentage > 1) {
        errors.push(`Draw ${i + 1}: Percentage must be between 0 and 1`);
      }
      
      if (!draw.amount || draw.amount <= 0) {
        errors.push(`Draw ${i + 1}: Amount must be greater than 0`);
      }
      
      if (!draw.date || draw.date.trim() === '') {
        errors.push(`Draw ${i + 1}: Date is required`);
      }
      
      totalPercentage += draw.percentage;
      totalAmount += draw.amount;
    }
    
    if (Math.abs(totalPercentage - 1.0) > 0.01) {
      errors.push('Draw schedule percentages must sum to 100%');
    }
    
    if (Math.abs(totalAmount - inputs.loanAmount) > 1) {
      errors.push('Draw schedule amounts must sum to loan amount');
    }
  }

  // Borrower validations
  if (!inputs.borrowerEquity || inputs.borrowerEquity < 0) {
    errors.push('Borrower equity must be non-negative');
  }

  if (!inputs.borrowerCreditScore || inputs.borrowerCreditScore < 300 || inputs.borrowerCreditScore > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (!inputs.borrowerNetWorth || inputs.borrowerNetWorth < 0) {
    errors.push('Borrower net worth must be non-negative');
  }

  if (!inputs.borrowerLiquidity || inputs.borrowerLiquidity < 0) {
    errors.push('Borrower liquidity must be non-negative');
  }

  // Market validations
  if (!inputs.marketLocation || inputs.marketLocation.trim() === '') {
    errors.push('Market location is required');
  }

  if (!inputs.marketGrowthRate || inputs.marketGrowthRate < -1 || inputs.marketGrowthRate > 1) {
    errors.push('Market growth rate must be between -100% and 100%');
  }

  // Exit strategy validations
  if (!inputs.expectedExitValue || inputs.expectedExitValue <= 0) {
    errors.push('Expected exit value must be greater than 0');
  }

  if (!inputs.expectedExitDate || inputs.expectedExitDate.trim() === '') {
    errors.push('Expected exit date is required');
  }

  if (!inputs.exitTimeline || inputs.exitTimeline <= 0) {
    errors.push('Exit timeline must be greater than 0');
  }

  // Analysis parameters validations
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0');
  }

  if (!inputs.inflationRate || inputs.inflationRate < -1 || inputs.inflationRate > 1) {
    errors.push('Inflation rate must be between -100% and 100%');
  }

  if (!inputs.constructionInflationRate || inputs.constructionInflationRate < -1 || inputs.constructionInflationRate > 1) {
    errors.push('Construction inflation rate must be between -100% and 100%');
  }

  if (!inputs.discountRate || inputs.discountRate < 0 || inputs.discountRate > 1) {
    errors.push('Discount rate must be between 0 and 1 (0% to 100%)');
  }

  // Enum validations
  const validLoanTypes = ['construction', 'bridge', 'permanent', 'mezzanine', 'hard_money'];
  if (!validLoanTypes.includes(inputs.loanType)) {
    errors.push(`Loan type must be one of: ${validLoanTypes.join(', ')}`);
  }

  const validPaymentTypes = ['interest_only', 'principal_interest', 'balloon', 'construction_draw'];
  if (!validPaymentTypes.includes(inputs.paymentType)) {
    errors.push(`Payment type must be one of: ${validPaymentTypes.join(', ')}`);
  }

  const validProjectTypes = ['residential', 'commercial', 'industrial', 'mixed_use', 'land_development'];
  if (!validProjectTypes.includes(inputs.projectType)) {
    errors.push(`Project type must be one of: ${validProjectTypes.join(', ')}`);
  }

  const validExperienceLevels = ['none', 'limited', 'moderate', 'extensive'];
  if (!validExperienceLevels.includes(inputs.borrowerExperience)) {
    errors.push(`Borrower experience must be one of: ${validExperienceLevels.join(', ')}`);
  }

  const validMarketConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validMarketConditions.includes(inputs.marketCondition)) {
    errors.push(`Market condition must be one of: ${validMarketConditions.join(', ')}`);
  }

  const validExitStrategies = ['sell', 'refinance', 'hold', 'lease'];
  if (!validExitStrategies.includes(inputs.exitStrategy)) {
    errors.push(`Exit strategy must be one of: ${validExitStrategies.join(', ')}`);
  }

  const validRiskLevels = ['low', 'medium', 'high'];
  if (!validRiskLevels.includes(inputs.constructionRisk)) {
    errors.push(`Construction risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.marketRisk)) {
    errors.push(`Market risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.borrowerRisk)) {
    errors.push(`Borrower risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  if (!validRiskLevels.includes(inputs.projectRisk)) {
    errors.push(`Project risk must be one of: ${validRiskLevels.join(', ')}`);
  }

  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(inputs.currency)) {
    errors.push(`Currency must be one of: ${validCurrencies.join(', ')}`);
  }

  const validDisplayFormats = ['percentage', 'decimal', 'currency'];
  if (!validDisplayFormats.includes(inputs.displayFormat)) {
    errors.push(`Display format must be one of: ${validDisplayFormats.join(', ')}`);
  }

  // Business logic validations
  const totalCost = inputs.landCost + inputs.constructionCost + inputs.softCosts + inputs.contingencyCost;
  if (Math.abs(totalCost - inputs.totalProjectCost) > 1) {
    errors.push('Total project cost must equal sum of land cost, construction cost, soft costs, and contingency cost');
  }

  if (inputs.loanAmount > inputs.totalProjectCost) {
    errors.push('Loan amount cannot exceed total project cost');
  }

  if (inputs.borrowerEquity + inputs.loanAmount < inputs.totalProjectCost) {
    errors.push('Borrower equity plus loan amount must equal or exceed total project cost');
  }

  if (inputs.expectedExitValue < inputs.totalProjectCost * 0.8) {
    warnings.push('Expected exit value is significantly below total project cost');
  }

  if (inputs.expectedExitValue > inputs.totalProjectCost * 2.0) {
    warnings.push('Expected exit value is significantly above total project cost');
  }

  // Date validations
  try {
    const startDate = new Date(inputs.constructionStartDate);
    const endDate = new Date(inputs.constructionEndDate);
    const exitDate = new Date(inputs.expectedExitDate);
    
    if (isNaN(startDate.getTime())) {
      errors.push('Construction start date must be a valid date');
    }
    
    if (isNaN(endDate.getTime())) {
      errors.push('Construction end date must be a valid date');
    }
    
    if (isNaN(exitDate.getTime())) {
      errors.push('Expected exit date must be a valid date');
    }
    
    if (startDate >= endDate) {
      errors.push('Construction start date must be before construction end date');
    }
    
    if (endDate >= exitDate) {
      errors.push('Construction end date must be before expected exit date');
    }
    
    const calculatedDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    if (Math.abs(calculatedDuration - inputs.constructionDuration) > 1) {
      warnings.push('Construction duration may not match date range');
    }
  } catch (error) {
    errors.push('Invalid date format provided');
  }

  // Draw schedule date validations
  if (inputs.drawSchedule && inputs.drawSchedule.length > 0) {
    try {
      const startDate = new Date(inputs.constructionStartDate);
      const endDate = new Date(inputs.constructionEndDate);
      
      for (let i = 0; i < inputs.drawSchedule.length; i++) {
        const drawDate = new Date(inputs.drawSchedule[i].date);
        
        if (isNaN(drawDate.getTime())) {
          errors.push(`Draw ${i + 1}: Date must be a valid date`);
        } else {
          if (drawDate < startDate) {
            errors.push(`Draw ${i + 1}: Date must be after construction start date`);
          }
          
          if (drawDate > endDate) {
            errors.push(`Draw ${i + 1}: Date must be before construction end date`);
          }
        }
      }
    } catch (error) {
      errors.push('Invalid date format in draw schedule');
    }
  }

  // Comparable projects validations
  if (inputs.comparableProjects && inputs.comparableProjects.length > 0) {
    for (let i = 0; i < inputs.comparableProjects.length; i++) {
      const project = inputs.comparableProjects[i];
      
      if (!project.project || project.project.trim() === '') {
        errors.push(`Comparable project ${i + 1}: Project name is required`);
      }
      
      if (!project.cost || project.cost <= 0) {
        errors.push(`Comparable project ${i + 1}: Cost must be greater than 0`);
      }
      
      if (!project.completionDate || project.completionDate.trim() === '') {
        errors.push(`Comparable project ${i + 1}: Completion date is required`);
      }
      
      if (!project.performance || project.performance.trim() === '') {
        errors.push(`Comparable project ${i + 1}: Performance is required`);
      }
      
      try {
        const completionDate = new Date(project.completionDate);
        if (isNaN(completionDate.getTime())) {
          errors.push(`Comparable project ${i + 1}: Completion date must be a valid date`);
        }
      } catch (error) {
        errors.push(`Comparable project ${i + 1}: Invalid completion date format`);
      }
    }
  }

  // Risk assessment validations
  if (inputs.additionalCollateral < 0) {
    errors.push('Additional collateral must be non-negative');
  }

  // Analysis period validation
  if (inputs.analysisPeriod > 60) {
    warnings.push('Analysis period longer than 5 years may have reduced accuracy');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}