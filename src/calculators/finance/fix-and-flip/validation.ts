import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFixAndFlipInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'purchasePrice', 'downPayment', 'interestRate', 'loanTerm', 'renovationBudget',
    'renovationTime', 'afterRepairValue', 'sellingCosts', 'holdingCosts',
    'propertyType', 'propertyCondition', 'marketType', 'location'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate purchase price
  const purchasePrice = Number(inputs.purchasePrice);
  if (isNaN(purchasePrice) || purchasePrice < 10000 || purchasePrice > 10000000) {
    errors.push('Purchase price must be between $10,000 and $10,000,000');
  }

  // Validate down payment
  const downPayment = Number(inputs.downPayment);
  if (isNaN(downPayment) || downPayment < 1000 || downPayment > 5000000) {
    errors.push('Down payment must be between $1,000 and $5,000,000');
  }

  // Validate interest rate
  const interestRate = Number(inputs.interestRate);
  if (isNaN(interestRate) || interestRate < 1 || interestRate > 25) {
    errors.push('Interest rate must be between 1% and 25%');
  }

  // Validate loan term
  const loanTerm = Number(inputs.loanTerm);
  if (isNaN(loanTerm) || loanTerm < 3 || loanTerm > 36) {
    errors.push('Loan term must be between 3 and 36 months');
  }

  // Validate renovation budget
  const renovationBudget = Number(inputs.renovationBudget);
  if (isNaN(renovationBudget) || renovationBudget < 0 || renovationBudget > 1000000) {
    errors.push('Renovation budget must be between $0 and $1,000,000');
  }

  // Validate renovation time
  const renovationTime = Number(inputs.renovationTime);
  if (isNaN(renovationTime) || renovationTime < 1 || renovationTime > 24) {
    errors.push('Renovation time must be between 1 and 24 months');
  }

  // Validate after repair value
  const afterRepairValue = Number(inputs.afterRepairValue);
  if (isNaN(afterRepairValue) || afterRepairValue < 10000 || afterRepairValue > 10000000) {
    errors.push('After repair value must be between $10,000 and $10,000,000');
  }

  // Validate selling costs
  const sellingCosts = Number(inputs.sellingCosts);
  if (isNaN(sellingCosts) || sellingCosts < 0 || sellingCosts > 500000) {
    errors.push('Selling costs must be between $0 and $500,000');
  }

  // Validate holding costs
  const holdingCosts = Number(inputs.holdingCosts);
  if (isNaN(holdingCosts) || holdingCosts < 0 || holdingCosts > 10000) {
    errors.push('Monthly holding costs must be between $0 and $10,000');
  }

  // Validate property type
  const validPropertyTypes = ['single-family', 'duplex', 'townhouse', 'condo', 'multi-family', 'commercial'];
  if (!validPropertyTypes.includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  // Validate property condition
  const validPropertyConditions = ['excellent', 'good', 'fair', 'poor', 'needs-major-repairs'];
  if (!validPropertyConditions.includes(inputs.propertyCondition)) {
    errors.push('Invalid property condition');
  }

  // Validate market type
  const validMarketTypes = ['hot', 'stable', 'slow', 'declining'];
  if (!validMarketTypes.includes(inputs.marketType)) {
    errors.push('Invalid market type');
  }

  // Validate location
  if (!inputs.location || inputs.location.trim().length === 0) {
    errors.push('Location is required');
  }

  // Validate optional fields if provided
  if (inputs.squareFootage !== undefined && inputs.squareFootage !== null) {
    const squareFootage = Number(inputs.squareFootage);
    if (isNaN(squareFootage) || squareFootage < 100 || squareFootage > 10000) {
      errors.push('Square footage must be between 100 and 10,000 sq ft');
    }
  }

  if (inputs.bedrooms !== undefined && inputs.bedrooms !== null) {
    const bedrooms = Number(inputs.bedrooms);
    if (isNaN(bedrooms) || bedrooms < 0 || bedrooms > 10) {
      errors.push('Number of bedrooms must be between 0 and 10');
    }
  }

  if (inputs.bathrooms !== undefined && inputs.bathrooms !== null) {
    const bathrooms = Number(inputs.bathrooms);
    if (isNaN(bathrooms) || bathrooms < 0 || bathrooms > 10) {
      errors.push('Number of bathrooms must be between 0 and 10');
    }
  }

  if (inputs.lotSize !== undefined && inputs.lotSize !== null) {
    const lotSize = Number(inputs.lotSize);
    if (isNaN(lotSize) || lotSize < 0.01 || lotSize > 100) {
      errors.push('Lot size must be between 0.01 and 100 acres');
    }
  }

  if (inputs.yearBuilt !== undefined && inputs.yearBuilt !== null) {
    const yearBuilt = Number(inputs.yearBuilt);
    if (isNaN(yearBuilt) || yearBuilt < 1800 || yearBuilt > 2024) {
      errors.push('Year built must be between 1800 and 2024');
    }
  }

  if (inputs.purchaseClosingCosts !== undefined && inputs.purchaseClosingCosts !== null) {
    const purchaseClosingCosts = Number(inputs.purchaseClosingCosts);
    if (isNaN(purchaseClosingCosts) || purchaseClosingCosts < 0 || purchaseClosingCosts > 100000) {
      errors.push('Purchase closing costs must be between $0 and $100,000');
    }
  }

  if (inputs.inspectionCosts !== undefined && inputs.inspectionCosts !== null) {
    const inspectionCosts = Number(inputs.inspectionCosts);
    if (isNaN(inspectionCosts) || inspectionCosts < 0 || inspectionCosts > 5000) {
      errors.push('Inspection costs must be between $0 and $5,000');
    }
  }

  if (inputs.permitCosts !== undefined && inputs.permitCosts !== null) {
    const permitCosts = Number(inputs.permitCosts);
    if (isNaN(permitCosts) || permitCosts < 0 || permitCosts > 50000) {
      errors.push('Permit costs must be between $0 and $50,000');
    }
  }

  if (inputs.insuranceCosts !== undefined && inputs.insuranceCosts !== null) {
    const insuranceCosts = Number(inputs.insuranceCosts);
    if (isNaN(insuranceCosts) || insuranceCosts < 0 || insuranceCosts > 10000) {
      errors.push('Insurance costs must be between $0 and $10,000');
    }
  }

  if (inputs.utilityCosts !== undefined && inputs.utilityCosts !== null) {
    const utilityCosts = Number(inputs.utilityCosts);
    if (isNaN(utilityCosts) || utilityCosts < 0 || utilityCosts > 5000) {
      errors.push('Utility costs must be between $0 and $5,000');
    }
  }

  if (inputs.propertyTaxes !== undefined && inputs.propertyTaxes !== null) {
    const propertyTaxes = Number(inputs.propertyTaxes);
    if (isNaN(propertyTaxes) || propertyTaxes < 0 || propertyTaxes > 50000) {
      errors.push('Property taxes must be between $0 and $50,000');
    }
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees !== null) {
    const hoaFees = Number(inputs.hoaFees);
    if (isNaN(hoaFees) || hoaFees < 0 || hoaFees > 2000) {
      errors.push('HOA fees must be between $0 and $2,000');
    }
  }

  if (inputs.contingencyBudget !== undefined && inputs.contingencyBudget !== null) {
    const contingencyBudget = Number(inputs.contingencyBudget);
    if (isNaN(contingencyBudget) || contingencyBudget < 0 || contingencyBudget > 100000) {
      errors.push('Contingency budget must be between $0 and $100,000');
    }
  }

  if (inputs.marketingCosts !== undefined && inputs.marketingCosts !== null) {
    const marketingCosts = Number(inputs.marketingCosts);
    if (isNaN(marketingCosts) || marketingCosts < 0 || marketingCosts > 50000) {
      errors.push('Marketing costs must be between $0 and $50,000');
    }
  }

  if (inputs.carryingCosts !== undefined && inputs.carryingCosts !== null) {
    const carryingCosts = Number(inputs.carryingCosts);
    if (isNaN(carryingCosts) || carryingCosts < 0 || carryingCosts > 100000) {
      errors.push('Carrying costs must be between $0 and $100,000');
    }
  }

  if (inputs.exitStrategy) {
    const validExitStrategies = ['sell', 'rent', 'refinance', 'wholesale'];
    if (!validExitStrategies.includes(inputs.exitStrategy)) {
      errors.push('Invalid exit strategy');
    }
  }

  if (inputs.targetROI !== undefined && inputs.targetROI !== null) {
    const targetROI = Number(inputs.targetROI);
    if (isNaN(targetROI) || targetROI < 5 || targetROI > 100) {
      errors.push('Target ROI must be between 5% and 100%');
    }
  }

  if (inputs.riskTolerance) {
    const validRiskTolerances = ['conservative', 'moderate', 'aggressive'];
    if (!validRiskTolerances.includes(inputs.riskTolerance)) {
      errors.push('Invalid risk tolerance');
    }
  }

  if (inputs.experienceLevel) {
    const validExperienceLevels = ['beginner', 'intermediate', 'expert'];
    if (!validExperienceLevels.includes(inputs.experienceLevel)) {
      errors.push('Invalid experience level');
    }
  }

  if (inputs.teamSize !== undefined && inputs.teamSize !== null) {
    const teamSize = Number(inputs.teamSize);
    if (isNaN(teamSize) || teamSize < 1 || teamSize > 20) {
      errors.push('Team size must be between 1 and 20');
    }
  }

  if (inputs.contractorCosts !== undefined && inputs.contractorCosts !== null) {
    const contractorCosts = Number(inputs.contractorCosts);
    if (isNaN(contractorCosts) || contractorCosts < 0 || contractorCosts > 500000) {
      errors.push('Contractor costs must be between $0 and $500,000');
    }
  }

  if (inputs.materialCosts !== undefined && inputs.materialCosts !== null) {
    const materialCosts = Number(inputs.materialCosts);
    if (isNaN(materialCosts) || materialCosts < 0 || materialCosts > 500000) {
      errors.push('Material costs must be between $0 and $500,000');
    }
  }

  if (inputs.designCosts !== undefined && inputs.designCosts !== null) {
    const designCosts = Number(inputs.designCosts);
    if (isNaN(designCosts) || designCosts < 0 || designCosts > 50000) {
      errors.push('Design costs must be between $0 and $50,000');
    }
  }

  if (inputs.landscapingCosts !== undefined && inputs.landscapingCosts !== null) {
    const landscapingCosts = Number(inputs.landscapingCosts);
    if (isNaN(landscapingCosts) || landscapingCosts < 0 || landscapingCosts > 100000) {
      errors.push('Landscaping costs must be between $0 and $100,000');
    }
  }

  if (inputs.applianceCosts !== undefined && inputs.applianceCosts !== null) {
    const applianceCosts = Number(inputs.applianceCosts);
    if (isNaN(applianceCosts) || applianceCosts < 0 || applianceCosts > 50000) {
      errors.push('Appliance costs must be between $0 and $50,000');
    }
  }

  if (inputs.furnitureCosts !== undefined && inputs.furnitureCosts !== null) {
    const furnitureCosts = Number(inputs.furnitureCosts);
    if (isNaN(furnitureCosts) || furnitureCosts < 0 || furnitureCosts > 50000) {
      errors.push('Furniture costs must be between $0 and $50,000');
    }
  }

  if (inputs.storageCosts !== undefined && inputs.storageCosts !== null) {
    const storageCosts = Number(inputs.storageCosts);
    if (isNaN(storageCosts) || storageCosts < 0 || storageCosts > 10000) {
      errors.push('Storage costs must be between $0 and $10,000');
    }
  }

  if (inputs.cleanupCosts !== undefined && inputs.cleanupCosts !== null) {
    const cleanupCosts = Number(inputs.cleanupCosts);
    if (isNaN(cleanupCosts) || cleanupCosts < 0 || cleanupCosts > 20000) {
      errors.push('Cleanup costs must be between $0 and $20,000');
    }
  }

  if (inputs.legalCosts !== undefined && inputs.legalCosts !== null) {
    const legalCosts = Number(inputs.legalCosts);
    if (isNaN(legalCosts) || legalCosts < 0 || legalCosts > 25000) {
      errors.push('Legal costs must be between $0 and $25,000');
    }
  }

  if (inputs.titleCosts !== undefined && inputs.titleCosts !== null) {
    const titleCosts = Number(inputs.titleCosts);
    if (isNaN(titleCosts) || titleCosts < 0 || titleCosts > 10000) {
      errors.push('Title costs must be between $0 and $10,000');
    }
  }

  if (inputs.escrowCosts !== undefined && inputs.escrowCosts !== null) {
    const escrowCosts = Number(inputs.escrowCosts);
    if (isNaN(escrowCosts) || escrowCosts < 0 || escrowCosts > 10000) {
      errors.push('Escrow costs must be between $0 and $10,000');
    }
  }

  if (inputs.surveyCosts !== undefined && inputs.surveyCosts !== null) {
    const surveyCosts = Number(inputs.surveyCosts);
    if (isNaN(surveyCosts) || surveyCosts < 0 || surveyCosts > 5000) {
      errors.push('Survey costs must be between $0 and $5,000');
    }
  }

  if (inputs.appraisalCosts !== undefined && inputs.appraisalCosts !== null) {
    const appraisalCosts = Number(inputs.appraisalCosts);
    if (isNaN(appraisalCosts) || appraisalCosts < 0 || appraisalCosts > 1000) {
      errors.push('Appraisal costs must be between $0 and $1,000');
    }
  }

  if (inputs.homeWarranty !== undefined && inputs.homeWarranty !== null) {
    const homeWarranty = Number(inputs.homeWarranty);
    if (isNaN(homeWarranty) || homeWarranty < 0 || homeWarranty > 1000) {
      errors.push('Home warranty must be between $0 and $1,000');
    }
  }

  if (inputs.homeInspection !== undefined && inputs.homeInspection !== null) {
    const homeInspection = Number(inputs.homeInspection);
    if (isNaN(homeInspection) || homeInspection < 0 || homeInspection > 1000) {
      errors.push('Home inspection must be between $0 and $1,000');
    }
  }

  if (inputs.creditRepair !== undefined && inputs.creditRepair !== null) {
    const creditRepair = Number(inputs.creditRepair);
    if (isNaN(creditRepair) || creditRepair < 0 || creditRepair > 5000) {
      errors.push('Credit repair must be between $0 and $5,000');
    }
  }

  if (inputs.buyerIncentives !== undefined && inputs.buyerIncentives !== null) {
    const buyerIncentives = Number(inputs.buyerIncentives);
    if (isNaN(buyerIncentives) || buyerIncentives < 0 || buyerIncentives > 50000) {
      errors.push('Buyer incentives must be between $0 and $50,000');
    }
  }

  if (inputs.priceReduction !== undefined && inputs.priceReduction !== null) {
    const priceReduction = Number(inputs.priceReduction);
    if (isNaN(priceReduction) || priceReduction < 0 || priceReduction > 100000) {
      errors.push('Price reduction must be between $0 and $100,000');
    }
  }

  if (inputs.timeOnMarket !== undefined && inputs.timeOnMarket !== null) {
    const timeOnMarket = Number(inputs.timeOnMarket);
    if (isNaN(timeOnMarket) || timeOnMarket < 1 || timeOnMarket > 365) {
      errors.push('Time on market must be between 1 and 365 days');
    }
  }

  if (inputs.marketAppreciation !== undefined && inputs.marketAppreciation !== null) {
    const marketAppreciation = Number(inputs.marketAppreciation);
    if (isNaN(marketAppreciation) || marketAppreciation < -20 || marketAppreciation > 20) {
      errors.push('Market appreciation must be between -20% and 20%');
    }
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate !== null) {
    const inflationRate = Number(inputs.inflationRate);
    if (isNaN(inflationRate) || inflationRate < 0 || inflationRate > 15) {
      errors.push('Inflation rate must be between 0% and 15%');
    }
  }

  if (inputs.opportunityCost !== undefined && inputs.opportunityCost !== null) {
    const opportunityCost = Number(inputs.opportunityCost);
    if (isNaN(opportunityCost) || opportunityCost < 0 || opportunityCost > 25) {
      errors.push('Opportunity cost must be between 0% and 25%');
    }
  }

  // Logical consistency checks
  if (purchasePrice && downPayment) {
    if (downPayment > purchasePrice) {
      errors.push('Down payment cannot exceed purchase price');
    }
    const downPaymentPercentage = (downPayment / purchasePrice) * 100;
    if (downPaymentPercentage < 10) {
      errors.push('Down payment should be at least 10% of purchase price');
    }
    if (downPaymentPercentage > 80) {
      errors.push('Down payment percentage is very high - verify accuracy');
    }
  }

  if (purchasePrice && afterRepairValue) {
    if (afterRepairValue <= purchasePrice) {
      errors.push('After repair value should be higher than purchase price');
    }
    const valueIncrease = ((afterRepairValue - purchasePrice) / purchasePrice) * 100;
    if (valueIncrease < 10) {
      errors.push('Value increase seems low for a fix and flip project');
    }
    if (valueIncrease > 200) {
      errors.push('Value increase seems very high - verify ARV estimate');
    }
  }

  if (renovationBudget && purchasePrice) {
    const renovationPercentage = (renovationBudget / purchasePrice) * 100;
    if (renovationPercentage > 50) {
      errors.push('Renovation budget is very high relative to purchase price');
    }
  }

  if (renovationTime > 12) {
    errors.push('Renovation time over 12 months increases holding cost risk');
  }

  if (inputs.marketType === 'declining' && inputs.propertyCondition === 'needs-major-repairs') {
    errors.push('High risk combination: declining market with major repairs needed');
  }

  if (inputs.experienceLevel === 'beginner' && renovationBudget > 100000) {
    errors.push('Large renovation budget for beginner - consider starting smaller');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateFixAndFlipInput(field: string, value: any): string | null {
  switch (field) {
    case 'purchasePrice':
      const purchasePrice = Number(value);
      if (isNaN(purchasePrice)) return 'Purchase price must be a number';
      if (purchasePrice < 10000) return 'Purchase price must be at least $10,000';
      if (purchasePrice > 10000000) return 'Purchase price cannot exceed $10,000,000';
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
      if (interestRate > 25) return 'Interest rate cannot exceed 25%';
      break;

    case 'loanTerm':
      const loanTerm = Number(value);
      if (isNaN(loanTerm)) return 'Loan term must be a number';
      if (loanTerm < 3) return 'Loan term must be at least 3 months';
      if (loanTerm > 36) return 'Loan term cannot exceed 36 months';
      break;

    case 'renovationBudget':
      const renovationBudget = Number(value);
      if (isNaN(renovationBudget)) return 'Renovation budget must be a number';
      if (renovationBudget < 0) return 'Renovation budget cannot be negative';
      if (renovationBudget > 1000000) return 'Renovation budget cannot exceed $1,000,000';
      break;

    case 'renovationTime':
      const renovationTime = Number(value);
      if (isNaN(renovationTime)) return 'Renovation time must be a number';
      if (renovationTime < 1) return 'Renovation time must be at least 1 month';
      if (renovationTime > 24) return 'Renovation time cannot exceed 24 months';
      break;

    case 'afterRepairValue':
      const afterRepairValue = Number(value);
      if (isNaN(afterRepairValue)) return 'After repair value must be a number';
      if (afterRepairValue < 10000) return 'After repair value must be at least $10,000';
      if (afterRepairValue > 10000000) return 'After repair value cannot exceed $10,000,000';
      break;

    case 'sellingCosts':
      const sellingCosts = Number(value);
      if (isNaN(sellingCosts)) return 'Selling costs must be a number';
      if (sellingCosts < 0) return 'Selling costs cannot be negative';
      if (sellingCosts > 500000) return 'Selling costs cannot exceed $500,000';
      break;

    case 'holdingCosts':
      const holdingCosts = Number(value);
      if (isNaN(holdingCosts)) return 'Monthly holding costs must be a number';
      if (holdingCosts < 0) return 'Monthly holding costs cannot be negative';
      if (holdingCosts > 10000) return 'Monthly holding costs cannot exceed $10,000';
      break;

    case 'squareFootage':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const squareFootage = Number(value);
      if (isNaN(squareFootage)) return 'Square footage must be a number';
      if (squareFootage < 100) return 'Square footage must be at least 100 sq ft';
      if (squareFootage > 10000) return 'Square footage cannot exceed 10,000 sq ft';
      break;

    case 'bedrooms':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const bedrooms = Number(value);
      if (isNaN(bedrooms)) return 'Number of bedrooms must be a number';
      if (bedrooms < 0) return 'Number of bedrooms cannot be negative';
      if (bedrooms > 10) return 'Number of bedrooms cannot exceed 10';
      break;

    case 'bathrooms':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const bathrooms = Number(value);
      if (isNaN(bathrooms)) return 'Number of bathrooms must be a number';
      if (bathrooms < 0) return 'Number of bathrooms cannot be negative';
      if (bathrooms > 10) return 'Number of bathrooms cannot exceed 10';
      break;

    case 'lotSize':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const lotSize = Number(value);
      if (isNaN(lotSize)) return 'Lot size must be a number';
      if (lotSize < 0.01) return 'Lot size must be at least 0.01 acres';
      if (lotSize > 100) return 'Lot size cannot exceed 100 acres';
      break;

    case 'yearBuilt':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const yearBuilt = Number(value);
      if (isNaN(yearBuilt)) return 'Year built must be a number';
      if (yearBuilt < 1800) return 'Year built must be at least 1800';
      if (yearBuilt > 2024) return 'Year built cannot exceed 2024';
      break;

    case 'purchaseClosingCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const purchaseClosingCosts = Number(value);
      if (isNaN(purchaseClosingCosts)) return 'Purchase closing costs must be a number';
      if (purchaseClosingCosts < 0) return 'Purchase closing costs cannot be negative';
      if (purchaseClosingCosts > 100000) return 'Purchase closing costs cannot exceed $100,000';
      break;

    case 'inspectionCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const inspectionCosts = Number(value);
      if (isNaN(inspectionCosts)) return 'Inspection costs must be a number';
      if (inspectionCosts < 0) return 'Inspection costs cannot be negative';
      if (inspectionCosts > 5000) return 'Inspection costs cannot exceed $5,000';
      break;

    case 'permitCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const permitCosts = Number(value);
      if (isNaN(permitCosts)) return 'Permit costs must be a number';
      if (permitCosts < 0) return 'Permit costs cannot be negative';
      if (permitCosts > 50000) return 'Permit costs cannot exceed $50,000';
      break;

    case 'insuranceCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const insuranceCosts = Number(value);
      if (isNaN(insuranceCosts)) return 'Insurance costs must be a number';
      if (insuranceCosts < 0) return 'Insurance costs cannot be negative';
      if (insuranceCosts > 10000) return 'Insurance costs cannot exceed $10,000';
      break;

    case 'utilityCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const utilityCosts = Number(value);
      if (isNaN(utilityCosts)) return 'Utility costs must be a number';
      if (utilityCosts < 0) return 'Utility costs cannot be negative';
      if (utilityCosts > 5000) return 'Utility costs cannot exceed $5,000';
      break;

    case 'propertyTaxes':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const propertyTaxes = Number(value);
      if (isNaN(propertyTaxes)) return 'Property taxes must be a number';
      if (propertyTaxes < 0) return 'Property taxes cannot be negative';
      if (propertyTaxes > 50000) return 'Property taxes cannot exceed $50,000';
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

    case 'contingencyBudget':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const contingencyBudget = Number(value);
      if (isNaN(contingencyBudget)) return 'Contingency budget must be a number';
      if (contingencyBudget < 0) return 'Contingency budget cannot be negative';
      if (contingencyBudget > 100000) return 'Contingency budget cannot exceed $100,000';
      break;

    case 'marketingCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const marketingCosts = Number(value);
      if (isNaN(marketingCosts)) return 'Marketing costs must be a number';
      if (marketingCosts < 0) return 'Marketing costs cannot be negative';
      if (marketingCosts > 50000) return 'Marketing costs cannot exceed $50,000';
      break;

    case 'carryingCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const carryingCosts = Number(value);
      if (isNaN(carryingCosts)) return 'Carrying costs must be a number';
      if (carryingCosts < 0) return 'Carrying costs cannot be negative';
      if (carryingCosts > 100000) return 'Carrying costs cannot exceed $100,000';
      break;

    case 'targetROI':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const targetROI = Number(value);
      if (isNaN(targetROI)) return 'Target ROI must be a number';
      if (targetROI < 5) return 'Target ROI must be at least 5%';
      if (targetROI > 100) return 'Target ROI cannot exceed 100%';
      break;

    case 'teamSize':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const teamSize = Number(value);
      if (isNaN(teamSize)) return 'Team size must be a number';
      if (teamSize < 1) return 'Team size must be at least 1';
      if (teamSize > 20) return 'Team size cannot exceed 20';
      break;

    case 'contractorCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const contractorCosts = Number(value);
      if (isNaN(contractorCosts)) return 'Contractor costs must be a number';
      if (contractorCosts < 0) return 'Contractor costs cannot be negative';
      if (contractorCosts > 500000) return 'Contractor costs cannot exceed $500,000';
      break;

    case 'materialCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const materialCosts = Number(value);
      if (isNaN(materialCosts)) return 'Material costs must be a number';
      if (materialCosts < 0) return 'Material costs cannot be negative';
      if (materialCosts > 500000) return 'Material costs cannot exceed $500,000';
      break;

    case 'designCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const designCosts = Number(value);
      if (isNaN(designCosts)) return 'Design costs must be a number';
      if (designCosts < 0) return 'Design costs cannot be negative';
      if (designCosts > 50000) return 'Design costs cannot exceed $50,000';
      break;

    case 'landscapingCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const landscapingCosts = Number(value);
      if (isNaN(landscapingCosts)) return 'Landscaping costs must be a number';
      if (landscapingCosts < 0) return 'Landscaping costs cannot be negative';
      if (landscapingCosts > 100000) return 'Landscaping costs cannot exceed $100,000';
      break;

    case 'applianceCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const applianceCosts = Number(value);
      if (isNaN(applianceCosts)) return 'Appliance costs must be a number';
      if (applianceCosts < 0) return 'Appliance costs cannot be negative';
      if (applianceCosts > 50000) return 'Appliance costs cannot exceed $50,000';
      break;

    case 'furnitureCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const furnitureCosts = Number(value);
      if (isNaN(furnitureCosts)) return 'Furniture costs must be a number';
      if (furnitureCosts < 0) return 'Furniture costs cannot be negative';
      if (furnitureCosts > 50000) return 'Furniture costs cannot exceed $50,000';
      break;

    case 'storageCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const storageCosts = Number(value);
      if (isNaN(storageCosts)) return 'Storage costs must be a number';
      if (storageCosts < 0) return 'Storage costs cannot be negative';
      if (storageCosts > 10000) return 'Storage costs cannot exceed $10,000';
      break;

    case 'cleanupCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const cleanupCosts = Number(value);
      if (isNaN(cleanupCosts)) return 'Cleanup costs must be a number';
      if (cleanupCosts < 0) return 'Cleanup costs cannot be negative';
      if (cleanupCosts > 20000) return 'Cleanup costs cannot exceed $20,000';
      break;

    case 'legalCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const legalCosts = Number(value);
      if (isNaN(legalCosts)) return 'Legal costs must be a number';
      if (legalCosts < 0) return 'Legal costs cannot be negative';
      if (legalCosts > 25000) return 'Legal costs cannot exceed $25,000';
      break;

    case 'titleCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const titleCosts = Number(value);
      if (isNaN(titleCosts)) return 'Title costs must be a number';
      if (titleCosts < 0) return 'Title costs cannot be negative';
      if (titleCosts > 10000) return 'Title costs cannot exceed $10,000';
      break;

    case 'escrowCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const escrowCosts = Number(value);
      if (isNaN(escrowCosts)) return 'Escrow costs must be a number';
      if (escrowCosts < 0) return 'Escrow costs cannot be negative';
      if (escrowCosts > 10000) return 'Escrow costs cannot exceed $10,000';
      break;

    case 'surveyCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const surveyCosts = Number(value);
      if (isNaN(surveyCosts)) return 'Survey costs must be a number';
      if (surveyCosts < 0) return 'Survey costs cannot be negative';
      if (surveyCosts > 5000) return 'Survey costs cannot exceed $5,000';
      break;

    case 'appraisalCosts':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const appraisalCosts = Number(value);
      if (isNaN(appraisalCosts)) return 'Appraisal costs must be a number';
      if (appraisalCosts < 0) return 'Appraisal costs cannot be negative';
      if (appraisalCosts > 1000) return 'Appraisal costs cannot exceed $1,000';
      break;

    case 'homeWarranty':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const homeWarranty = Number(value);
      if (isNaN(homeWarranty)) return 'Home warranty must be a number';
      if (homeWarranty < 0) return 'Home warranty cannot be negative';
      if (homeWarranty > 1000) return 'Home warranty cannot exceed $1,000';
      break;

    case 'homeInspection':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const homeInspection = Number(value);
      if (isNaN(homeInspection)) return 'Home inspection must be a number';
      if (homeInspection < 0) return 'Home inspection cannot be negative';
      if (homeInspection > 1000) return 'Home inspection cannot exceed $1,000';
      break;

    case 'creditRepair':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const creditRepair = Number(value);
      if (isNaN(creditRepair)) return 'Credit repair must be a number';
      if (creditRepair < 0) return 'Credit repair cannot be negative';
      if (creditRepair > 5000) return 'Credit repair cannot exceed $5,000';
      break;

    case 'buyerIncentives':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const buyerIncentives = Number(value);
      if (isNaN(buyerIncentives)) return 'Buyer incentives must be a number';
      if (buyerIncentives < 0) return 'Buyer incentives cannot be negative';
      if (buyerIncentives > 50000) return 'Buyer incentives cannot exceed $50,000';
      break;

    case 'priceReduction':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const priceReduction = Number(value);
      if (isNaN(priceReduction)) return 'Price reduction must be a number';
      if (priceReduction < 0) return 'Price reduction cannot be negative';
      if (priceReduction > 100000) return 'Price reduction cannot exceed $100,000';
      break;

    case 'timeOnMarket':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const timeOnMarket = Number(value);
      if (isNaN(timeOnMarket)) return 'Time on market must be a number';
      if (timeOnMarket < 1) return 'Time on market must be at least 1 day';
      if (timeOnMarket > 365) return 'Time on market cannot exceed 365 days';
      break;

    case 'marketAppreciation':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const marketAppreciation = Number(value);
      if (isNaN(marketAppreciation)) return 'Market appreciation must be a number';
      if (marketAppreciation < -20) return 'Market appreciation must be at least -20%';
      if (marketAppreciation > 20) return 'Market appreciation cannot exceed 20%';
      break;

    case 'inflationRate':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const inflationRate = Number(value);
      if (isNaN(inflationRate)) return 'Inflation rate must be a number';
      if (inflationRate < 0) return 'Inflation rate cannot be negative';
      if (inflationRate > 15) return 'Inflation rate cannot exceed 15%';
      break;

    case 'opportunityCost':
      if (value === '' || value === null || value === undefined) {
        return null; // Optional field
      }
      const opportunityCost = Number(value);
      if (isNaN(opportunityCost)) return 'Opportunity cost must be a number';
      if (opportunityCost < 0) return 'Opportunity cost cannot be negative';
      if (opportunityCost > 25) return 'Opportunity cost cannot exceed 25%';
      break;
  }

  return null;
}
