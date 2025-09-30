import { calculatorRegistry } from '../../data/calculatorRegistry';
import { executiveDeferredCompensationCalculatorCalculator } from './executiveDeferredCompensationCalculatorCalculator';

export function registerexecutiveDeferredCompensationCalculatorCalculator(): void {
  calculatorRegistry.register(new executiveDeferredCompensationCalculatorCalculator());
}
