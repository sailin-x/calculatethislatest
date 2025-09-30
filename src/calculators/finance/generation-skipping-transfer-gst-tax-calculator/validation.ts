import { GenerationSkippingTransferGstTaxCalculatorInputs } from './types';

export function validateGenerationSkippingTransferGstTaxCalculatorInputs(inputs: GenerationSkippingTransferGstTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Transfer Amount Validation
  if (!inputs.transferAmount || inputs.transferAmount <= 0) {
    errors.push({ field: 'transferAmount', message: 'Transfer amount must be greater than 0' });
  }
  if (inputs.transferAmount && inputs.transferAmount > 100000000) {
    errors.push({ field: 'transferAmount', message: 'Transfer amount cannot exceed $100,000,000' });
  }

  // GST Exemption Used Validation
  if (inputs.gstExemptionUsed < 0) {
    errors.push({ field: 'gstExemptionUsed', message: 'GST exemption used cannot be negative' });
  }
  if (inputs.gstExemptionUsed > 13610000) {
    errors.push({ field: 'gstExemptionUsed', message: 'GST exemption used cannot exceed the current exemption limit' });
  }

  // GST Tax Rate Validation
  if (!inputs.gstTaxRate || inputs.gstTaxRate <= 0) {
    errors.push({ field: 'gstTaxRate', message: 'GST tax rate must be greater than 0' });
  }
  if (inputs.gstTaxRate > 100) {
    errors.push({ field: 'gstTaxRate', message: 'GST tax rate cannot exceed 100%' });
  }

  return errors;
}

export function validateGenerationSkippingTransferGstTaxCalculatorBusinessRules(inputs: GenerationSkippingTransferGstTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Large transfer warnings
  if (inputs.transferAmount > 13610000) {
    warnings.push({ field: 'transferAmount', message: 'Transfer exceeds GST exemption - will be subject to GST tax' });
  }

  // Exemption utilization warnings
  const remainingExemption = 13610000 - inputs.gstExemptionUsed;
  if (remainingExemption < inputs.transferAmount && remainingExemption > 0) {
    warnings.push({ field: 'gstExemptionUsed', message: 'Partial exemption available - portion of transfer will be taxable' });
  }

  // Direct skip warnings
  if (inputs.isDirectSkip) {
    warnings.push({ field: 'isDirectSkip', message: 'Direct skip transfers are immediately taxable - consider trust structures' });
  }

  // Trust distribution warnings
  if (inputs.isTrustDistribution) {
    warnings.push({ field: 'isTrustDistribution', message: 'Trust distributions may trigger GST tax depending on trust structure' });
  }

  // Relationship-based warnings
  if (inputs.relationship === 'other-descendant') {
    warnings.push({ field: 'relationship', message: 'Verify that recipient qualifies as a skip person under GST rules' });
  }

  return warnings;
}