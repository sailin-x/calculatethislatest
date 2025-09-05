import { PropertyTaxInputs, PropertyTaxOutputs } from './types';

export function calculatePropertyTax(inputs: PropertyTaxInputs): PropertyTaxOutputs {
  const {
    propertyValue,
    taxRate,
    exemptions = 0,
    assessmentRatio = 1.0,
    homesteadExemption = 0,
    seniorExemption = 0,
    disabilityExemption = 0,
    veteranExemption = 0,
    localTaxes = 0,
    specialAssessments = 0
  } = inputs;

  // Calculate assessed value
  const assessedValue = propertyValue * assessmentRatio;

  // Calculate total exemptions
  const totalExemptions = exemptions + homesteadExemption + seniorExemption + 
                         disabilityExemption + veteranExemption;

  // Calculate taxable value (assessed value minus exemptions)
  const taxableValue = Math.max(0, assessedValue - totalExemptions);

  // Calculate base property tax
  const baseTax = taxableValue * (taxRate / 100);

  // Calculate total annual property tax
  const annualPropertyTax = baseTax + localTaxes + specialAssessments;

  // Calculate monthly property tax
  const monthlyPropertyTax = annualPropertyTax / 12;

  // Calculate effective tax rate (actual tax paid as percentage of property value)
  const effectiveTaxRate = (annualPropertyTax / propertyValue) * 100;

  // Calculate tax savings from exemptions
  const taxSavings = totalExemptions * (taxRate / 100);

  return {
    assessedValue,
    taxableValue,
    annualPropertyTax,
    monthlyPropertyTax,
    effectiveTaxRate,
    totalExemptions,
    taxSavings,
    breakdown: {
      baseTax,
      localTaxes,
      specialAssessments,
      totalTax: annualPropertyTax
    }
  };
}

export function calculatePropertyTaxWithEscrow(
  annualPropertyTax: number,
  insuranceAmount: number = 0,
  hoaFees: number = 0
): number {
  return (annualPropertyTax + insuranceAmount + hoaFees) / 12;
}

export function calculatePropertyTaxDeduction(
  annualPropertyTax: number,
  mortgageInterest: number = 0,
  standardDeduction: number = 12950
): number {
  const itemizedDeduction = annualPropertyTax + mortgageInterest;
  return Math.max(standardDeduction, itemizedDeduction);
}

export function calculatePropertyTaxComparison(
  currentTax: number,
  newTax: number
): { difference: number; percentageChange: number } {
  const difference = newTax - currentTax;
  const percentageChange = currentTax > 0 ? (difference / currentTax) * 100 : 0;
  
  return {
    difference,
    percentageChange
  };
}