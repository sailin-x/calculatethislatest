import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTenantImprovementAllowanceCalculatorCalculator } from './registerTenantImprovementAllowanceCalculatorCalculator';

export function registerregisterTenantImprovementAllowanceCalculatorCalculator(): void {
  calculatorRegistry.register(new registerTenantImprovementAllowanceCalculatorCalculator());
}
