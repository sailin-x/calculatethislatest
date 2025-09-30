import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aiops-implementation-savings-calculatorCalculator } from './aiops-implementation-savings-calculatorCalculator';

export function registeraiops-implementation-savings-calculatorCalculator(): void {
  calculatorRegistry.register(new aiops-implementation-savings-calculatorCalculator());
}
