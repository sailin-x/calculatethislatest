import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tenantImprovementAllowanceCalculator } from './tenantImprovementAllowanceCalculator';

export function registertenantImprovementAllowanceCalculator(): void {
  calculatorRegistry.register(new tenantImprovementAllowanceCalculator());
}
