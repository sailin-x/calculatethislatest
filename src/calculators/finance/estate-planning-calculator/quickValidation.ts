export function quickValidateTotalAssets(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Total assets is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Total assets must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Total assets cannot be negative' };
  }
  if (numValue > 1000000000) {
    return { isValid: false, message: 'Total assets seems too high' };
  }
  return { isValid: true };
}

export function quickValidateTotalLiabilities(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Total liabilities is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Total liabilities must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Total liabilities cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets * 1.1) {
    return { isValid: false, message: 'Total liabilities should not exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateNetEstate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Net estate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Net estate must be a valid number' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
  
  if (totalAssets && totalLiabilities) {
    const expectedNetEstate = totalAssets - totalLiabilities;
    const tolerance = Math.abs(expectedNetEstate) * 0.01; // 1% tolerance
    if (Math.abs(numValue - expectedNetEstate) > tolerance) {
      return { isValid: false, message: 'Net estate should equal total assets minus total liabilities' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateEstateOwner(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Estate owner name is required' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, message: 'Estate owner name must be at least 2 characters' };
  }
  if (value.trim().length > 100) {
    return { isValid: false, message: 'Estate owner name is too long' };
  }
  return { isValid: true };
}

export function quickValidateAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Age is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Age must be a valid number' };
  }
  if (numValue < 18) {
    return { isValid: false, message: 'Age must be at least 18' };
  }
  if (numValue > 120) {
    return { isValid: false, message: 'Age must be 120 or less' };
  }
  return { isValid: true };
}

export function quickValidateHealthStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStatuses = ['excellent', 'good', 'fair', 'poor'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, message: 'Health status must be excellent, good, fair, or poor' };
  }
  return { isValid: true };
}

export function quickValidateCash(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Cash must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Cash cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Cash cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateStocks(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Stocks value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Stocks value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Stocks value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidatePrimaryResidence(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Primary residence value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Primary residence value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Primary residence value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateBusinessValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Business value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Business value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Business value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateTraditionalIRA(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Traditional IRA value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Traditional IRA value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Traditional IRA value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateDeathBenefit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Death benefit must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Death benefit cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets * 10) {
    return { isValid: false, message: 'Death benefit seems too high relative to total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateMortgages(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Mortgage amount must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Mortgage amount cannot be negative' };
  }
  
  const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
  if (totalLiabilities && numValue > totalLiabilities) {
    return { isValid: false, message: 'Mortgage amount cannot exceed total liabilities' };
  }
  
  return { isValid: true };
}

export function quickValidateCreditCardDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Credit card debt must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Credit card debt cannot be negative' };
  }
  
  const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
  if (totalLiabilities && numValue > totalLiabilities) {
    return { isValid: false, message: 'Credit card debt cannot exceed total liabilities' };
  }
  
  return { isValid: true };
}

export function quickValidateBeneficiaryName(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Beneficiary name is required' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, message: 'Beneficiary name must be at least 2 characters' };
  }
  if (value.trim().length > 100) {
    return { isValid: false, message: 'Beneficiary name is too long' };
  }
  return { isValid: true };
}

export function quickValidateBeneficiaryPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Beneficiary percentage is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Beneficiary percentage must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Beneficiary percentage cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, message: 'Beneficiary percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function quickValidateBeneficiaryAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Beneficiary age is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Beneficiary age must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Beneficiary age cannot be negative' };
  }
  if (numValue > 120) {
    return { isValid: false, message: 'Beneficiary age must be 120 or less' };
  }
  return { isValid: true };
}

export function quickValidateFederalExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Federal estate tax exemption is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Federal estate tax exemption must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Federal estate tax exemption cannot be negative' };
  }
  if (numValue > 100000000) {
    return { isValid: false, message: 'Federal estate tax exemption seems too high' };
  }
  return { isValid: true };
}

export function quickValidateFederalRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Federal estate tax rate is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Federal estate tax rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Federal estate tax rate cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, message: 'Federal estate tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function quickValidateStateExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'State estate tax exemption must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'State estate tax exemption cannot be negative' };
  }
  if (numValue > 100000000) {
    return { isValid: false, message: 'State estate tax exemption seems too high' };
  }
  return { isValid: true };
}

export function quickValidateStateRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'State estate tax rate must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'State estate tax rate cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, message: 'State estate tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

export function quickValidateAnnualExclusion(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Annual gift tax exclusion is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual gift tax exclusion must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual gift tax exclusion cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Annual gift tax exclusion seems too high' };
  }
  return { isValid: true };
}

export function quickValidateLifetimeExemption(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Lifetime gift tax exemption is required' };
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Lifetime gift tax exemption must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Lifetime gift tax exemption cannot be negative' };
  }
  if (numValue > 100000000) {
    return { isValid: false, message: 'Lifetime gift tax exemption seems too high' };
  }
  return { isValid: true };
}

export function quickValidateGiftsMade(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Gifts made must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Gifts made cannot be negative' };
  }
  
  const lifetimeExemption = allInputs?.taxConsiderations?.giftTax?.lifetimeExemption;
  if (lifetimeExemption && numValue > lifetimeExemption * 1.1) {
    return { isValid: false, message: 'Gifts made should not exceed lifetime exemption' };
  }
  
  return { isValid: true };
}

export function quickValidateTrustValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Trust value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Trust value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Trust value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateIncomeReplacement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Income replacement needs must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Income replacement needs cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets * 3) {
    return { isValid: false, message: 'Income replacement needs seem too high relative to total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateDebtPayoff(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Debt payoff needs must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Debt payoff needs cannot be negative' };
  }
  
  const totalLiabilities = allInputs?.estateInfo?.totalLiabilities;
  if (totalLiabilities && numValue > totalLiabilities * 1.2) {
    return { isValid: false, message: 'Debt payoff needs seem too high relative to total liabilities' };
  }
  
  return { isValid: true };
}

export function quickValidateEducationFunding(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Education funding needs must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Education funding needs cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, message: 'Education funding needs seem too high' };
  }
  return { isValid: true };
}

export function quickValidateEstateTaxFunding(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Estate tax funding needs must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Estate tax funding needs cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets * 0.5) {
    return { isValid: false, message: 'Estate tax funding needs seem too high relative to total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateBusinessValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Business value must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Business value cannot be negative' };
  }
  
  const totalAssets = allInputs?.estateInfo?.totalAssets;
  if (totalAssets && numValue > totalAssets) {
    return { isValid: false, message: 'Business value cannot exceed total assets' };
  }
  
  return { isValid: true };
}

export function quickValidateExecutor(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Executor name is required' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, message: 'Executor name must be at least 2 characters' };
  }
  if (value.trim().length > 100) {
    return { isValid: false, message: 'Executor name is too long' };
  }
  return { isValid: true };
}

export function quickValidateEstimatedCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Estimated administration costs must be a valid number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Estimated administration costs cannot be negative' };
  }
  if (numValue > 1000000) {
    return { isValid: false, message: 'Estimated administration costs seem too high' };
  }
  return { isValid: true };
}
