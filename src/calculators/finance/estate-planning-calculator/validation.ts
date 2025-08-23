import { ValidationRuleFactory } from '../../utils/ValidationRuleFactory';
import { EstatePlanningInputs } from './types';

export const estatePlanningValidationRules = [
  // Required fields
  ValidationRuleFactory.createRule('estateInfo.totalAssets', 'Total assets is required', (value: any) => {
    return value !== null && value !== undefined && value !== '';
  }),
  
  ValidationRuleFactory.createRule('estateInfo.totalLiabilities', 'Total liabilities is required', (value: any) => {
    return value !== null && value !== undefined && value !== '';
  }),
  
  ValidationRuleFactory.createRule('estateInfo.estateOwner', 'Estate owner name is required', (value: any) => {
    return value && value.trim().length > 0;
  }),
  
  ValidationRuleFactory.createRule('estateInfo.age', 'Age is required', (value: any) => {
    return value !== null && value !== undefined && value !== '';
  }),
  
  // Numeric ranges
  ValidationRuleFactory.createRule('estateInfo.totalAssets', 'Total assets must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('estateInfo.totalLiabilities', 'Total liabilities must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('estateInfo.age', 'Age must be between 18 and 120', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 18 && numValue <= 120;
  }),
  
  // Asset validations
  ValidationRuleFactory.createRule('assets.liquidAssets.cash', 'Cash must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('assets.liquidAssets.stocks', 'Stocks value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('assets.realEstate.primaryResidence', 'Primary residence value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('assets.businessInterests.businessValue', 'Business value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('assets.retirementAccounts.traditionalIRA', 'Traditional IRA value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('assets.lifeInsurance.deathBenefit', 'Life insurance death benefit must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  // Liability validations
  ValidationRuleFactory.createRule('liabilities.mortgages', 'Mortgage amount must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('liabilities.creditCardDebt', 'Credit card debt must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  // Beneficiary validations
  ValidationRuleFactory.createRule('beneficiaries', 'At least one beneficiary is required', (value: any) => {
    return Array.isArray(value) && value.length > 0;
  }),
  
  ValidationRuleFactory.createRule('beneficiaries[].name', 'Beneficiary name is required', (value: any) => {
    return value && value.trim().length > 0;
  }),
  
  ValidationRuleFactory.createRule('beneficiaries[].percentage', 'Beneficiary percentage must be between 0 and 100', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  }),
  
  ValidationRuleFactory.createRule('beneficiaries[].age', 'Beneficiary age must be between 0 and 120', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 120;
  }),
  
  // Tax consideration validations
  ValidationRuleFactory.createRule('taxConsiderations.federalEstateTax.exemption', 'Federal estate tax exemption must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.federalEstateTax.rate', 'Federal estate tax rate must be between 0 and 100', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.stateEstateTax.exemption', 'State estate tax exemption must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.stateEstateTax.rate', 'State estate tax rate must be between 0 and 100', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.giftTax.annualExclusion', 'Annual gift tax exclusion must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.giftTax.lifetimeExemption', 'Lifetime gift tax exemption must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('taxConsiderations.giftTax.giftsMade', 'Gifts made must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  // Trust validations
  ValidationRuleFactory.createRule('trustInfo.trustValue', 'Trust value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('trustInfo.beneficiaries', 'Trust beneficiaries are required', (value: any) => {
    return Array.isArray(value) && value.length > 0;
  }),
  
  // Life insurance validations
  ValidationRuleFactory.createRule('lifeInsurancePlanning.insuranceNeeds.incomeReplacement', 'Income replacement needs must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('lifeInsurancePlanning.insuranceNeeds.debtPayoff', 'Debt payoff needs must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('lifeInsurancePlanning.insuranceNeeds.educationFunding', 'Education funding needs must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('lifeInsurancePlanning.insuranceNeeds.estateTaxFunding', 'Estate tax funding needs must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  // Business succession validations
  ValidationRuleFactory.createRule('businessSuccession.businessValue', 'Business value must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  ValidationRuleFactory.createRule('businessSuccession.keyEmployees', 'Key employees list is required', (value: any) => {
    return Array.isArray(value);
  }),
  
  // Estate administration validations
  ValidationRuleFactory.createRule('estateAdministration.executor', 'Executor name is required', (value: any) => {
    return value && value.trim().length > 0;
  }),
  
  ValidationRuleFactory.createRule('estateAdministration.estimatedCosts', 'Estimated administration costs must be a positive number', (value: any) => {
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }),
  
  // Cross-field validations
  ValidationRuleFactory.createRule('netEstateConsistency', 'Net estate should equal total assets minus total liabilities', (value: any, allInputs?: Record<string, any>) => {
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
    const netEstate = allInputs?.estateInfo?.netEstate;
    
    if (!totalAssets || !totalLiabilities || !netEstate) return true;
    
    const calculatedNetEstate = totalAssets - totalLiabilities;
    const tolerance = Math.abs(calculatedNetEstate) * 0.01; // 1% tolerance
    return Math.abs(netEstate - calculatedNetEstate) <= tolerance;
  }),
  
  ValidationRuleFactory.createRule('beneficiaryPercentageSum', 'Total beneficiary percentages should equal 100%', (value: any, allInputs?: Record<string, any>) => {
    const beneficiaries = allInputs?.beneficiaries;
    if (!beneficiaries || !Array.isArray(beneficiaries)) return true;
    
    const totalPercentage = beneficiaries.reduce((sum, beneficiary) => sum + (beneficiary.percentage || 0), 0);
    return Math.abs(totalPercentage - 100) <= 1; // 1% tolerance
  }),
  
  ValidationRuleFactory.createRule('giftTaxConsistency', 'Gifts made should not exceed lifetime exemption', (value: any, allInputs?: Record<string, any>) => {
    const giftsMade = allInputs?.taxConsiderations?.giftTax?.giftsMade;
    const lifetimeExemption = allInputs?.taxConsiderations?.giftTax?.lifetimeExemption;
    
    if (!giftsMade || !lifetimeExemption) return true;
    
    return giftsMade <= lifetimeExemption * 1.1; // Allow 10% overage for planning
  }),
  
  ValidationRuleFactory.createRule('trustFundingConsistency', 'Trust value should be reasonable relative to total assets', (value: any, allInputs?: Record<string, any>) => {
    const trustValue = allInputs?.trustInfo?.trustValue;
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    
    if (!trustValue || !totalAssets) return true;
    
    const ratio = trustValue / totalAssets;
    return ratio >= 0 && ratio <= 1; // Trust value should not exceed total assets
  }),
  
  ValidationRuleFactory.createRule('insuranceNeedsConsistency', 'Insurance needs should be reasonable relative to estate size', (value: any, allInputs?: Record<string, any>) => {
    const insuranceNeeds = allInputs?.lifeInsurancePlanning?.insuranceNeeds;
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    
    if (!insuranceNeeds || !totalAssets) return true;
    
    const totalNeeds = 
      (insuranceNeeds.incomeReplacement || 0) +
      (insuranceNeeds.debtPayoff || 0) +
      (insuranceNeeds.educationFunding || 0) +
      (insuranceNeeds.estateTaxFunding || 0) +
      (insuranceNeeds.businessContinuation || 0);
    
    const ratio = totalNeeds / totalAssets;
    return ratio >= 0 && ratio <= 5; // Insurance needs should not exceed 5x total assets
  }),
  
  ValidationRuleFactory.createRule('businessValueConsistency', 'Business value should be reasonable relative to total assets', (value: any, allInputs?: Record<string, any>) => {
    const businessValue = allInputs?.businessSuccession?.businessValue;
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    
    if (!businessValue || !totalAssets) return true;
    
    const ratio = businessValue / totalAssets;
    return ratio >= 0 && ratio <= 1; // Business value should not exceed total assets
  }),
  
  ValidationRuleFactory.createRule('liabilityConsistency', 'Total liabilities should not exceed total assets', (value: any, allInputs?: Record<string, any>) => {
    const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    
    if (!totalLiabilities || !totalAssets) return true;
    
    return totalLiabilities <= totalAssets * 1.1; // Allow 10% overage for planning
  }),
  
  ValidationRuleFactory.createRule('ageConsistency', 'Estate owner age should be reasonable for estate planning', (value: any, allInputs?: Record<string, any>) => {
    const age = allInputs?.estateInfo?.age;
    const healthStatus = allInputs?.estateInfo?.healthStatus;
    
    if (!age) return true;
    
    // Younger individuals with poor health might need more urgent planning
    if (age < 30 && healthStatus === 'poor') return true;
    if (age > 100) return false; // Unrealistic age
    
    return true;
  }),
  
  ValidationRuleFactory.createRule('estateSizeConsistency', 'Estate size should be reasonable for the individual', (value: any, allInputs?: Record<string, any>) => {
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    const age = allInputs?.estateInfo?.age;
    
    if (!totalAssets || !age) return true;
    
    // Very large estates for young individuals might need verification
    if (age < 25 && totalAssets > 10000000) return false;
    if (age < 30 && totalAssets > 50000000) return false;
    
    return true;
  }),
  
  ValidationRuleFactory.createRule('documentConsistency', 'Estate documents should be consistent with estate size', (value: any, allInputs?: Record<string, any>) => {
    const totalAssets = allInputs?.estateInfo?.totalAssets;
    const estateDocuments = allInputs?.estateDocuments;
    
    if (!totalAssets || !estateDocuments) return true;
    
    // Large estates should have comprehensive planning
    if (totalAssets > 5000000 && !estateDocuments.will) return false;
    if (totalAssets > 10000000 && !estateDocuments.trust) return false;
    
    return true;
  }),
  
  ValidationRuleFactory.createRule('specialSituationsConsistency', 'Special situations should have appropriate planning', (value: any, allInputs?: Record<string, any>) => {
    const specialSituations = allInputs?.specialSituations;
    const estateDocuments = allInputs?.estateDocuments;
    
    if (!specialSituations || !estateDocuments) return true;
    
    // Special needs beneficiaries should have trust planning
    if (specialSituations.specialNeedsBeneficiary && !estateDocuments.trust) return false;
    
    // Minor children should have guardianship planning
    if (specialSituations.minorChildren && !estateDocuments.will) return false;
    
    return true;
  })
];

export function validateEstatePlanningInputs(inputs: EstatePlanningInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const rule of estatePlanningValidationRules) {
    try {
      const isValid = rule.validate(inputs);
      if (!isValid) {
        errors.push(rule.message);
      }
    } catch (error) {
      errors.push(`Validation error for ${rule.field}: ${error}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
