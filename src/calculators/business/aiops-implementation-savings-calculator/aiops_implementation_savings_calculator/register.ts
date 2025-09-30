import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aiops_implementation_savings_calculatorCalculator } from './aiops_implementation_savings_calculatorCalculator';

export function registeraiops_implementation_savings_calculatorCalculator(): void {
  calculatorRegistry.register(new aiops_implementation_savings_calculatorCalculator());
}
