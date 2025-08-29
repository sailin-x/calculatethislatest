import { FixAndFlipInputs } from './types';

export function validateFixAndFlipInputs(inputs: FixAndFlipInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Property Information Validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }
  if (inputs.propertyAddress && inputs.propertyAddress.length > 200) {
    errors.push('Property address must be 200 characters or less');
  }

  if (inputs.propertySize <= 0) {
    errors.push('Property size must be greater than zero');
  }
  if (inputs.propertySize > 100000) {
    errors.push('Property size over 100,000 sq ft seems unrealistic');
  }

  if (inputs.lotSize <= 0) {
    errors.push('Lot size must be greater than zero');
  }
  if (inputs.lotSize > 1000000) {
    errors.push('Lot size over 1,000,000 sq ft seems unrealistic');
  }

  if (inputs.bedrooms < 0) {
    errors.push('Number of bedrooms cannot be negative');
  }
  if (inputs.bedrooms > 20) {
    errors.push('Number of bedrooms over 20 seems unrealistic');
  }

  if (inputs.bathrooms < 0) {
    errors.push('Number of bathrooms cannot be negative');
  }
  if (inputs.bathrooms > 20) {
    errors.push('Number of bathrooms over 20 seems unrealistic');
  }

  if (inputs.yearBuilt < 1800 || inputs.yearBuilt > 2030) {
    errors.push('Year built must be between 1800 and 2030');
  }

  // Purchase Information Validation
  if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than zero');
  }
  if (inputs.purchasePrice > 10000000) {
    errors.push('Purchase price over $10 million seems high for fix and flip');
  }

  if (!inputs.purchaseDate) {
    errors.push('Purchase date is required');
  }

  if (inputs.closingCosts < 0) {
    errors.push('Closing costs cannot be negative');
  }
  if (inputs.closingCosts > 500000) {
    errors.push('Closing costs over $500,000 seem excessive');
  }

  if (inputs.inspectionCosts !== undefined && inputs.inspectionCosts < 0) {
    errors.push('Inspection costs cannot be negative');
  }
  if (inputs.inspectionCosts !== undefined && inputs.inspectionCosts > 10000) {
    errors.push('Inspection costs over $10,000 seem excessive');
  }

  if (inputs.titleInsurance !== undefined && inputs.titleInsurance < 0) {
    errors.push('Title insurance cost cannot be negative');
  }
  if (inputs.titleInsurance !== undefined && inputs.titleInsurance > 10000) {
    errors.push('Title insurance cost over $10,000 seems excessive');
  }

  if (inputs.transferTaxes !== undefined && inputs.transferTaxes < 0) {
    errors.push('Transfer taxes cannot be negative');
  }
  if (inputs.transferTaxes !== undefined && inputs.transferTaxes > 50000) {
    errors.push('Transfer taxes over $50,000 seem excessive');
  }

  if (inputs.attorneyFees !== undefined && inputs.attorneyFees < 0) {
    errors.push('Attorney fees cannot be negative');
  }
  if (inputs.attorneyFees !== undefined && inputs.attorneyFees > 10000) {
    errors.push('Attorney fees over $10,000 seem excessive');
  }

  if (inputs.otherPurchaseCosts !== undefined && inputs.otherPurchaseCosts < 0) {
    errors.push('Other purchase costs cannot be negative');
  }
  if (inputs.otherPurchaseCosts !== undefined && inputs.otherPurchaseCosts > 50000) {
    errors.push('Other purchase costs over $50,000 seem excessive');
  }

  // Financing Information Validation
  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }
  if (inputs.downPayment > 5000000) {
    errors.push('Down payment over $5 million seems excessive');
  }

  if (inputs.loanAmount < 0) {
    errors.push('Loan amount cannot be negative');
  }
  if (inputs.loanAmount > 10000000) {
    errors.push('Loan amount over $10 million seems excessive');
  }

  if (inputs.interestRate < 0) {
    errors.push('Interest rate cannot be negative');
  }
  if (inputs.interestRate > 25) {
    errors.push('Interest rate over 25% seems excessive');
  }

  if (inputs.loanTerm <= 0) {
    errors.push('Loan term must be greater than zero');
  }
  if (inputs.loanTerm > 360) {
    errors.push('Loan term over 360 months (30 years) seems excessive for fix and flip');
  }

  if (inputs.originationFee !== undefined && inputs.originationFee < 0) {
    errors.push('Origination fee cannot be negative');
  }
  if (inputs.originationFee !== undefined && inputs.originationFee > 100000) {
    errors.push('Origination fee over $100,000 seems excessive');
  }

  if (inputs.points !== undefined && inputs.points < 0) {
    errors.push('Points cannot be negative');
  }
  if (inputs.points !== undefined && inputs.points > 10) {
    errors.push('Points over 10 seem excessive');
  }

  if (inputs.monthlyPayment !== undefined && inputs.monthlyPayment < 0) {
    errors.push('Monthly payment cannot be negative');
  }
  if (inputs.monthlyPayment !== undefined && inputs.monthlyPayment > 100000) {
    errors.push('Monthly payment over $100,000 seems excessive');
  }

  // Renovation Information Validation
  if (inputs.renovationBudget < 0) {
    errors.push('Renovation budget cannot be negative');
  }
  if (inputs.renovationBudget > 1000000) {
    errors.push('Renovation budget over $1 million seems excessive');
  }

  if (inputs.renovationTimeline <= 0) {
    errors.push('Renovation timeline must be greater than zero');
  }
  if (inputs.renovationTimeline > 24) {
    errors.push('Renovation timeline over 24 months seems excessive');
  }

  // Renovation Details Validation
  if (inputs.structuralWorkCost !== undefined && inputs.structuralWorkCost < 0) {
    errors.push('Structural work cost cannot be negative');
  }
  if (inputs.structuralWorkCost !== undefined && inputs.structuralWorkCost > 500000) {
    errors.push('Structural work cost over $500,000 seems excessive');
  }

  if (inputs.electricalWorkCost !== undefined && inputs.electricalWorkCost < 0) {
    errors.push('Electrical work cost cannot be negative');
  }
  if (inputs.electricalWorkCost !== undefined && inputs.electricalWorkCost > 100000) {
    errors.push('Electrical work cost over $100,000 seems excessive');
  }

  if (inputs.plumbingWorkCost !== undefined && inputs.plumbingWorkCost < 0) {
    errors.push('Plumbing work cost cannot be negative');
  }
  if (inputs.plumbingWorkCost !== undefined && inputs.plumbingWorkCost > 100000) {
    errors.push('Plumbing work cost over $100,000 seems excessive');
  }

  if (inputs.hvacWorkCost !== undefined && inputs.hvacWorkCost < 0) {
    errors.push('HVAC work cost cannot be negative');
  }
  if (inputs.hvacWorkCost !== undefined && inputs.hvacWorkCost > 50000) {
    errors.push('HVAC work cost over $50,000 seems excessive');
  }

  if (inputs.roofingWorkCost !== undefined && inputs.roofingWorkCost < 0) {
    errors.push('Roofing work cost cannot be negative');
  }
  if (inputs.roofingWorkCost !== undefined && inputs.roofingWorkCost > 100000) {
    errors.push('Roofing work cost over $100,000 seems excessive');
  }

  if (inputs.kitchenRemodelCost !== undefined && inputs.kitchenRemodelCost < 0) {
    errors.push('Kitchen remodel cost cannot be negative');
  }
  if (inputs.kitchenRemodelCost !== undefined && inputs.kitchenRemodelCost > 200000) {
    errors.push('Kitchen remodel cost over $200,000 seems excessive');
  }

  if (inputs.bathroomRemodelCost !== undefined && inputs.bathroomRemodelCost < 0) {
    errors.push('Bathroom remodel cost cannot be negative');
  }
  if (inputs.bathroomRemodelCost !== undefined && inputs.bathroomRemodelCost > 100000) {
    errors.push('Bathroom remodel cost over $100,000 seems excessive');
  }

  if (inputs.flooringWorkCost !== undefined && inputs.flooringWorkCost < 0) {
    errors.push('Flooring work cost cannot be negative');
  }
  if (inputs.flooringWorkCost !== undefined && inputs.flooringWorkCost > 50000) {
    errors.push('Flooring work cost over $50,000 seems excessive');
  }

  if (inputs.paintingWorkCost !== undefined && inputs.paintingWorkCost < 0) {
    errors.push('Painting work cost cannot be negative');
  }
  if (inputs.paintingWorkCost !== undefined && inputs.paintingWorkCost > 30000) {
    errors.push('Painting work cost over $30,000 seems excessive');
  }

  if (inputs.landscapingWorkCost !== undefined && inputs.landscapingWorkCost < 0) {
    errors.push('Landscaping work cost cannot be negative');
  }
  if (inputs.landscapingWorkCost !== undefined && inputs.landscapingWorkCost > 50000) {
    errors.push('Landscaping work cost over $50,000 seems excessive');
  }

  if (inputs.permitsAndFees !== undefined && inputs.permitsAndFees < 0) {
    errors.push('Permits and fees cannot be negative');
  }
  if (inputs.permitsAndFees !== undefined && inputs.permitsAndFees > 20000) {
    errors.push('Permits and fees over $20,000 seem excessive');
  }

  if (inputs.contingencyBudget !== undefined && inputs.contingencyBudget < 0) {
    errors.push('Contingency budget cannot be negative');
  }
  if (inputs.contingencyBudget !== undefined && inputs.contingencyBudget > 100000) {
    errors.push('Contingency budget over $100,000 seems excessive');
  }

  // Holding Costs Validation
  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }
  if (inputs.propertyTaxes > 10000) {
    errors.push('Property taxes over $10,000 per month seem excessive');
  }

  if (inputs.insurance < 0) {
    errors.push('Insurance cannot be negative');
  }
  if (inputs.insurance > 5000) {
    errors.push('Insurance over $5,000 per month seems excessive');
  }

  if (inputs.utilities !== undefined && inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  }
  if (inputs.utilities !== undefined && inputs.utilities > 2000) {
    errors.push('Utilities over $2,000 per month seem excessive');
  }

  if (inputs.hoaFees !== undefined && inputs.hoaFees < 0) {
    errors.push('HOA fees cannot be negative');
  }
  if (inputs.hoaFees !== undefined && inputs.hoaFees > 2000) {
    errors.push('HOA fees over $2,000 per month seem excessive');
  }

  if (inputs.propertyManagement !== undefined && inputs.propertyManagement < 0) {
    errors.push('Property management cost cannot be negative');
  }
  if (inputs.propertyManagement !== undefined && inputs.propertyManagement > 5000) {
    errors.push('Property management cost over $5,000 per month seems excessive');
  }

  if (inputs.maintenance !== undefined && inputs.maintenance < 0) {
    errors.push('Maintenance cost cannot be negative');
  }
  if (inputs.maintenance !== undefined && inputs.maintenance > 2000) {
    errors.push('Maintenance cost over $2,000 per month seems excessive');
  }

  if (inputs.otherHoldingCosts !== undefined && inputs.otherHoldingCosts < 0) {
    errors.push('Other holding costs cannot be negative');
  }
  if (inputs.otherHoldingCosts !== undefined && inputs.otherHoldingCosts > 2000) {
    errors.push('Other holding costs over $2,000 per month seem excessive');
  }

  // Market Information Validation
  if (inputs.averageDaysOnMarket !== undefined && inputs.averageDaysOnMarket <= 0) {
    errors.push('Average days on market must be greater than zero');
  }
  if (inputs.averageDaysOnMarket !== undefined && inputs.averageDaysOnMarket > 365) {
    errors.push('Average days on market over 365 days seems excessive');
  }

  if (inputs.marketAbsorptionRate !== undefined && inputs.marketAbsorptionRate <= 0) {
    errors.push('Market absorption rate must be greater than zero');
  }
  if (inputs.marketAbsorptionRate !== undefined && inputs.marketAbsorptionRate > 24) {
    errors.push('Market absorption rate over 24 months seems excessive');
  }

  // Exit Strategy Validation
  if (inputs.targetSalePrice <= 0) {
    errors.push('Target sale price must be greater than zero');
  }
  if (inputs.targetSalePrice > 10000000) {
    errors.push('Target sale price over $10 million seems high for fix and flip');
  }

  if (!inputs.targetSaleDate) {
    errors.push('Target sale date is required');
  }

  if (inputs.realtorCommission !== undefined && inputs.realtorCommission < 0) {
    errors.push('Realtor commission cannot be negative');
  }
  if (inputs.realtorCommission !== undefined && inputs.realtorCommission > 15) {
    errors.push('Realtor commission over 15% seems excessive');
  }

  if (inputs.closingCostsSeller !== undefined && inputs.closingCostsSeller < 0) {
    errors.push('Seller closing costs cannot be negative');
  }
  if (inputs.closingCostsSeller !== undefined && inputs.closingCostsSeller > 100000) {
    errors.push('Seller closing costs over $100,000 seem excessive');
  }

  if (inputs.stagingCosts !== undefined && inputs.stagingCosts < 0) {
    errors.push('Staging costs cannot be negative');
  }
  if (inputs.stagingCosts !== undefined && inputs.stagingCosts > 50000) {
    errors.push('Staging costs over $50,000 seem excessive');
  }

  if (inputs.marketingCosts !== undefined && inputs.marketingCosts < 0) {
    errors.push('Marketing costs cannot be negative');
  }
  if (inputs.marketingCosts !== undefined && inputs.marketingCosts > 20000) {
    errors.push('Marketing costs over $20,000 seem excessive');
  }

  // Timeline Validation
  if (inputs.acquisitionTimeline !== undefined && inputs.acquisitionTimeline <= 0) {
    errors.push('Acquisition timeline must be greater than zero');
  }
  if (inputs.acquisitionTimeline !== undefined && inputs.acquisitionTimeline > 365) {
    errors.push('Acquisition timeline over 365 days seems excessive');
  }

  if (inputs.renovationTimeline !== undefined && inputs.renovationTimeline <= 0) {
    errors.push('Renovation timeline must be greater than zero');
  }
  if (inputs.renovationTimeline !== undefined && inputs.renovationTimeline > 730) {
    errors.push('Renovation timeline over 730 days seems excessive');
  }

  if (inputs.marketingTimeline !== undefined && inputs.marketingTimeline <= 0) {
    errors.push('Marketing timeline must be greater than zero');
  }
  if (inputs.marketingTimeline !== undefined && inputs.marketingTimeline > 365) {
    errors.push('Marketing timeline over 365 days seems excessive');
  }

  if (inputs.totalProjectTimeline !== undefined && inputs.totalProjectTimeline <= 0) {
    errors.push('Total project timeline must be greater than zero');
  }
  if (inputs.totalProjectTimeline !== undefined && inputs.totalProjectTimeline > 1095) {
    errors.push('Total project timeline over 1095 days (3 years) seems excessive');
  }

  // Analysis Parameters Validation
  if (inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than zero');
  }
  if (inputs.analysisPeriod > 60) {
    errors.push('Analysis period over 60 months seems excessive');
  }

  if (inputs.discountRate < 0) {
    errors.push('Discount rate cannot be negative');
  }
  if (inputs.discountRate > 50) {
    errors.push('Discount rate over 50% seems excessive');
  }

  if (inputs.taxRate !== undefined && inputs.taxRate < 0) {
    errors.push('Tax rate cannot be negative');
  }
  if (inputs.taxRate !== undefined && inputs.taxRate > 50) {
    errors.push('Tax rate over 50% seems excessive');
  }

  if (inputs.inflationRate !== undefined && inputs.inflationRate < -10) {
    errors.push('Inflation rate below -10% seems unrealistic');
  }
  if (inputs.inflationRate !== undefined && inputs.inflationRate > 20) {
    errors.push('Inflation rate over 20% seems excessive');
  }

  if (inputs.appreciationRate !== undefined && inputs.appreciationRate < -20) {
    errors.push('Appreciation rate below -20% seems unrealistic');
  }
  if (inputs.appreciationRate !== undefined && inputs.appreciationRate > 20) {
    errors.push('Appreciation rate over 20% seems excessive');
  }

  // Business Logic Validation
  if (inputs.downPayment + inputs.loanAmount !== inputs.purchasePrice) {
    errors.push('Down payment plus loan amount should equal purchase price');
  }

  if (inputs.targetSalePrice <= inputs.purchasePrice) {
    errors.push('Target sale price should be greater than purchase price for profitable flip');
  }

  const totalRenovationCosts = (inputs.structuralWorkCost || 0) + 
    (inputs.electricalWorkCost || 0) + (inputs.plumbingWorkCost || 0) + 
    (inputs.hvacWorkCost || 0) + (inputs.roofingWorkCost || 0) + 
    (inputs.kitchenRemodelCost || 0) + (inputs.bathroomRemodelCost || 0) + 
    (inputs.flooringWorkCost || 0) + (inputs.paintingWorkCost || 0) + 
    (inputs.landscapingWorkCost || 0) + (inputs.permitsAndFees || 0) + 
    (inputs.contingencyBudget || 0);

  if (totalRenovationCosts > inputs.renovationBudget * 1.2) {
    errors.push('Total renovation costs exceed renovation budget by more than 20%');
  }

  const totalTimeline = (inputs.acquisitionTimeline || 30) + 
    (inputs.renovationTimeline || inputs.renovationTimeline * 30) + 
    (inputs.marketingTimeline || 45);

  if (totalTimeline > 1095) {
    errors.push('Total project timeline over 3 years suggests this may not be a fix and flip project');
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
