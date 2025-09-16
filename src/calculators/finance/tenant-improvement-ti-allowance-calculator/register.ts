import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { tenantImprovementAllowanceCalculator } from './TenantImprovementAllowanceCalculator';

/**
 * Register the Tenant Improvement Allowance Calculator
 */
export function registerTenantImprovementAllowanceCalculator(): void {
  calculatorRegistry.register(tenantImprovementAllowanceCalculator);
}