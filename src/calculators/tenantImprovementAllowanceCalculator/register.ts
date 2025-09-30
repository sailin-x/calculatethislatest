import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tenantImprovementAllowanceCalculatorCalculator } from './tenantImprovementAllowanceCalculatorCalculator';

export function registertenantImprovementAllowanceCalculatorCalculator(): void {
  calculatorRegistry.register(new tenantImprovementAllowanceCalculatorCalculator());
}
