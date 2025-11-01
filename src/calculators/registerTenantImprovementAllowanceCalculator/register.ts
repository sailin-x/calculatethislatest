import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTenantImprovementAllowanceCalculator } from './registerTenantImprovementAllowanceCalculator';

export function registerregisterTenantImprovementAllowanceCalculator(): void {
  calculatorRegistry.register(new registerTenantImprovementAllowanceCalculator());
}
