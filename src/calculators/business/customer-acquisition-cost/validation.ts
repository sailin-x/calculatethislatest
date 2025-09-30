import { CustomerAcquisitionCostInputs } from './types';

export function validateCustomerAcquisitionCostInputs(inputs: CustomerAcquisitionCostInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Total Marketing Spend Validation
  if (!inputs.totalMarketingSpend || inputs.totalMarketingSpend < 0) {
    errors.push({ field: 'totalMarketingSpend', message: 'Total marketing spend must be 0 or greater' });
  }

  // Number of New Customers Validation
  if (!inputs.numberOfNewCustomers || inputs.numberOfNewCustomers < 0) {
    errors.push({ field: 'numberOfNewCustomers', message: 'Number of new customers must be 0 or greater' });
  }

  // Customer Lifetime Value Validation
  if (inputs.customerLifetimeValue && inputs.customerLifetimeValue < 0) {
    errors.push({ field: 'customerLifetimeValue', message: 'Customer lifetime value cannot be negative' });
  }

  // Conversion Rate Validation
  if (inputs.conversionRate && (inputs.conversionRate < 0 || inputs.conversionRate > 100)) {
    errors.push({ field: 'conversionRate', message: 'Conversion rate must be between 0% and 100%' });
  }

  // Average Order Value Validation
  if (inputs.averageOrderValue && inputs.averageOrderValue < 0) {
    errors.push({ field: 'averageOrderValue', message: 'Average order value cannot be negative' });
  }

  // Cost Per Lead Validation - removed as it's not in types

  return errors;
}

export function validateCustomerAcquisitionCostBusinessRules(inputs: CustomerAcquisitionCostInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // High CAC to LTV ratio warning
  if (inputs.customerLifetimeValue && inputs.totalMarketingSpend && inputs.numberOfNewCustomers) {
    const cac = inputs.totalMarketingSpend / inputs.numberOfNewCustomers;
    const cacToLtvRatio = (cac / inputs.customerLifetimeValue) * 100;

    if (cacToLtvRatio > 50) {
      warnings.push({ field: 'totalMarketingSpend', message: 'CAC to LTV ratio is very high (>50%). Consider optimizing acquisition strategy.' });
    } else if (cacToLtvRatio > 30) {
      warnings.push({ field: 'totalMarketingSpend', message: 'CAC to LTV ratio is high (>30%). Monitor closely.' });
    }
  }

  // Low conversion rate warning
  if (inputs.conversionRate && inputs.conversionRate < 1) {
    warnings.push({ field: 'conversionRate', message: 'Conversion rate is very low (<1%). Consider improving lead quality or sales process.' });
  }

  // High cost per lead warning - removed as costPerLead not in types

  // Zero customers warning
  if (inputs.totalMarketingSpend > 0 && inputs.numberOfNewCustomers === 0) {
    warnings.push({ field: 'numberOfNewCustomers', message: 'Marketing spend is positive but no customers acquired. Review campaign effectiveness.' });
  }

  return warnings;
}